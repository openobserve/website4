---
title: 'Monitoring CloudFront Access Logs with Kinesis Streams & Amazon Data Firehose: A Step-by-Step Guide'
seoTitle: 'Step-by-Step Guide: Monitoring CloudFront Logs with Kinesis & Firehose for Real-Time Visualization & Insights | OpenObserve'
description: Learn how to set up real-time monitoring for CloudFront access logs using AWS Kinesis Streams and Firehose. This guide walks you through configuring CloudFront logging, creating Lambda transformations, and visualizing data in OpenObserve for performance optimization, security monitoring, and actionable insights.
img: /img/blog/cloudfront-access-logs/00-blog-banner.png
alt: Cloud-themed banner with 'Monitoring CloudFront Access Logs with Kinesis Streams & Amazon Data Firehose' and OpenObserve logo.
slug: monitor-cloudfront-access-logs-kinesis-streams-amazon-data-firehose-guide
authors: 
  - nitya
publishDate: 2024-12-02
tags:
  - CloudFront Access Logs
  - AWS Kinesis Data Streams
  - AWS Kinesis Firehose
  - AWS Real-Time Log Processing
  - CDN Performance Optimization
  - AWS Security Monitoring
  - Cloud Logging and Visualization
  - AWS Infrastructure Monitoring
--- 

Monitoring CloudFront access logs is a critical practice for understanding user behavior, troubleshooting issues, and optimizing your content delivery network (CDN). These logs provide a wealth of information about every request made to your CloudFront distribution, including details like client IPs, HTTP methods, response times, and much more. But how do you efficiently collect, process, and analyze these logs in real time? That’s where Amazon Kinesis and OpenObserve come into play.

In this guide, we’ll walk through a detailed setup to stream CloudFront access logs using Amazon Kinesis Data Streams and Kinesis Data Firehose, ultimately ingesting the data into OpenObserve for advanced analysis and visualization.

## Why Monitor CloudFront Access Logs?

CloudFront access logs are a goldmine of information for:

* **Performance Optimization:** Identify slow-loading assets or high cache miss rates.  
* **Security Monitoring:** Detect suspicious activity like unauthorized access attempts or DDoS attacks.  
* **User Insights:** Analyze traffic patterns, popular content, and geographic distribution.

By setting up a real-time log pipeline with Amazon Kinesis and OpenObserve, you can process and analyze these logs efficiently, gaining actionable insights in seconds. Furthermore, integrating Cloudfront access logs into OpenObserve allows you to leverage advanced search capabilities, custom dashboards, and real-time alerts.

## Setting Up Real-Time CloudFront Log Monitoring

Here’s the high-level workflow we’ll follow:

1. Enable real-time logging in CloudFront and configure it to stream logs to Kinesis.  
2. Create a Kinesis Data Stream to receive logs from CloudFront.  
3. Create a Lambda function to transform CloudFront logs into a format suitable for analysis.  
4. Use Kinesis Data Firehose to deliver logs from Kinesis to OpenObserve.  
5. Analyze the data in OpenObserve using visual dashboards.  
   
![Diagram illustrating CloudFront logs streaming through Kinesis Data Streams and Firehose to OpenObserve for analysis.](/img/blog/cloudfront-access-logs/00-blog-banner.png) 

Let’s dive into the details.

## Step 1: Retrieve OpenObserve Details

Before setting up AWS services, retrieve the necessary information from OpenObserve for log ingestion.

1. Log in to OpenObserve:  
   * If you don’t have an account, follow the [OpenObserve Quickstart Guide](https://openobserve.ai/docs/user-guide/getting-started/) to set up a free Cloud or self-hosted account.  
2. Navigate to **Ingestion** → **Custom** → **Logs** → **Kinesis Firehose**.  
3. Copy the following details:  
   * **Endpoint URL:** This will be used as the destination in Kinesis Firehose.  
   * **Access Key:** Used for authentication when sending data to OpenObserve.

These details will be required later when configuring Kinesis Data Firehose.

![GIF showing the OpenObserve dashboard, highlighting steps to retrieve authentication details for Kinesis Firehose setup. ](/img/blog/cloudfront-access-logs/0-o2-get-auth-details.gif) 

## Step 2: Set Up a Kinesis Data Stream

The first step in AWS is creating a Kinesis Data Stream to receive real-time logs from CloudFront.

1. Go to the [Kinesis Console](https://console.aws.amazon.com/kinesis/home).  
2. Select **Kinesis Data Streams** and click **Create data stream**.  
3. Provide a name for your stream (e.g., CloudFrontLogsStream).  
4. Click Create data stream.

![Amazon Kinesis setup page showing options to create a new data stream for real-time data ingestion and processing. ](/img/blog/cloudfront-access-logs/2-kinesis-stream-setup.gif)

Your stream is now ready to receive log data from CloudFront.

## Step 3: Enable Real-Time Logging in CloudFront

With your Kinesis Data Stream ready, configure CloudFront to start sending real-time logs.

1. Navigate to [CloudFront](https://console.aws.amazon.com/cloudfront/home) in the AWS Management Console.  
2. Select your distribution from the list.  
3. In the left-hand menu, click on **Telemetry** → **Logs** → **Real-time distributions** → **Create configuration**.  
4. Fill out the configuration form:  
   * **Name:** Enter a descriptive name (e.g., RealTimeLoggingConfig).  
   * **Sampling Rate:** Set to 100% initially for full data collection.  
   * **Fields:** Select fields based on your use case (see table below for recommendations).  
   * **Endpoint:** Select your previously created Kinesis Data Stream (e.g., CloudFrontLogsStream).  
   * **IAM Role:** Choose **Create new service role**. Note down the name of this role (e.g., CloudFrontRealtimeLogConfigRole-\[unique-id\]).  
   * **Cache Behaviors:** Select Default Behavior (\*) unless you need logs for specific paths only.

5. Click **Create distribution**.

![AWS CloudFront setup page highlighting options to create a distribution for secure and fast content delivery. ](/img/blog/cloudfront-access-logs/3-cloudfront-distribution-setup.gif) 

### Key Fields to Include in Real-Time Logs

Selecting the right fields ensures that your logs capture meaningful data while avoiding unnecessary noise. Below is a table of recommended fields based on common use cases like performance monitoring, security analysis, and user behavior tracking:

| Field Name | Description | Use Case |
| :---- | :---- | :---- |
| timestamp | The date and time of the request in UTC format. | Essential for all use cases |
| c-ip | The IP address of the client making the request. | Security analysis |
| cs-method | The HTTP method used in the request (e.g., GET, POST). | Performance monitoring |
| cs-uri-stem | The URI path requested by the client (e.g., /index.html). | User behavior tracking |
| sc-status | The HTTP status code returned by CloudFront (e.g., 200, 404). | Performance/security analysis |
| x-edge-result-type | The result of processing the request (e.g., Hit, Miss, Error). | Cache performance analysis |
| x-edge-response-result-type | The final result after processing by CloudFront (e.g., Success, Error). | Troubleshooting errors |
| x-edge-location | The edge location that served the request (e.g., IAD50-C1). | Geographic analysis |
| cs-user-agent | The User-Agent header provided by the client (e.g., browser or device type). | Security/user behavior |
| cs-referer | The referring URL that led to this request (if available). | User behavior tracking |

You can start with essential fields like timestamp, c-ip, cs-method, cs-uri-stem, sc-status, and x-edge-result-type and add more fields later as needed, based on your specific requirements. For a full list of supported fields and their descriptions, refer to [AWS CloudFront Real-Time Logs Documentation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields).

## Step 4: Create a Lambda Function for Data Transformation

Now we'll [create a Lambda function](https://openobserve.ai/blog/monitor-aws-lambda-logs-cloudwatch-kinesis-firehose#step-1-create-an-aws-lambda-function) to transform the CloudFront logs into a format suitable for ingestion and analysis in OpenObserve:

1. Go to the [AWS Lambda Console](https://console.aws.amazon.com/lambda).  
2. Click **Create function**.  
3. Choose **Author from scratch**.  
4. Fill in the basic information:  
   1. **Function name:** CloudFrontLogTransformer  
   2. **Runtime:** Python 3.9  
   3. **Architecture:** x86\_64  
   4. **Permissions:** Create a new role with basic Lambda permissions  
5. Click **Create function**.

6. In the **Code** tab, click on the file lambda\_function.py and replace its content with the following code:

```py
import json
import base64
import gzip
import io
import logging

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def safe_convert_int(value, default=0):
   """Helper function to safely convert values to integers"""
   try:
       return int(value) if value and value != "-" else default
   except ValueError:
       return default

def safe_convert_float(value, default=0.0):
   """Helper function to safely convert values to floats"""
   try:
       return float(value) if value and value != "-" else default
   except ValueError:
       return default

def process_field(value):
   """Helper function to process field values, converting '-' to None"""
   return None if value == "-" else value

def lambda_handler(event, context):
   output = []
  
   for record in event['records']:
       try:
           # Decode base64-encoded data
           payload = base64.b64decode(record['data'])
          
           try:
               # Try direct string parsing first (more efficient)
               log_line = payload.decode('utf-8').strip()
           except UnicodeDecodeError:
               # Fallback to gzip if needed
               with io.BytesIO(payload) as compressed_stream:
                   with gzip.GzipFile(fileobj=compressed_stream, mode='rb') as gz:
                       log_line = gz.read().decode('utf-8').strip()
          
           # Skip header lines
           if log_line.startswith('#'):
               continue
              
           # Split into fields
           fields = log_line.split('\t')
          
           # Create transformed log with all fields
           transformed_log = {
               # Standard CloudFront Fields
               "@timestamp": fields[0],
               "client_ip": process_field(fields[1]),
               "status_code": safe_convert_int(fields[2]),
               "http_method": process_field(fields[3]),
               "uri_stem": process_field(fields[4]),
               "edge_location": process_field(fields[5]),
               "user_agent": process_field(fields[6]),
               "referer": process_field(fields[7]),
               "edge_response_result_type": process_field(fields[8]),
               "edge_result_type": process_field(fields[9]),
              
               # CMCD Fields (Common Media Client Data)
               "cmcd": {
                   "encoded_bitrate": safe_convert_int(fields[10]),
                   "buffer_length": safe_convert_float(fields[11]),
                   "buffer_starvation": process_field(fields[12]),
                   "content_id": process_field(fields[13]),
                   "object_duration": safe_convert_float(fields[14]),
                   "deadline": process_field(fields[15]),
                   "measured_throughput": safe_convert_int(fields[16]),
                   "next_object_request": process_field(fields[17]),
                   "next_range_request": process_field(fields[18]),
                   "object_type": process_field(fields[19]),
                   "playback_rate": safe_convert_float(fields[20]),
                   "requested_max_throughput": safe_convert_int(fields[21]),
                   "streaming_format": process_field(fields[22]),
                   "session_id": process_field(fields[23]),
                   "stream_type": process_field(fields[24]),
                   "startup": process_field(fields[25]),
                   "top_bitrate": safe_convert_int(fields[26]),
                   "version": process_field(fields[27])
               },
              
               # Edge and Request Fields
               "edge_mqcs": process_field(fields[28]),
               "sr_reason": process_field(fields[29]),
               "r_host": process_field(fields[30]),
               "x_host_header": process_field(fields[31]),
               "x_forwarded_for": process_field(fields[32]),
               "edge_request_id": process_field(fields[33]),
               "edge_detailed_result_type": process_field(fields[34]),
              
               # Timing and Performance Fields
               "time_to_first_byte": safe_convert_float(fields[35]),
               "time_taken": safe_convert_float(fields[36]),
              
               # SSL/TLS Fields
               "ssl_protocol": process_field(fields[37]),
               "ssl_cipher": process_field(fields[38]),
              
               # Content Range and Type Fields
               "range": {
                   "start": safe_convert_int(fields[39]),
                   "end": safe_convert_int(fields[40])
               },
               "content_type": process_field(fields[41]),
               "content_length": safe_convert_int(fields[42]),
              
               # Byte Transfer Fields
               "bytes_sent": safe_convert_int(fields[43]),
               "server_ip": process_field(fields[44]),
              
               # Distribution Fields
               "distribution": {
                   "id": process_field(fields[45]),
                   "dns_name": process_field(fields[46])
               },
              
               # Origin Fields
               "origin": {
                   "lbl": process_field(fields[47]),
                   "fbl": process_field(fields[48])
               },
              
               # Field Level Encryption Fields
               "fle": {
                   "status": process_field(fields[49]),
                   "encrypted_fields": process_field(fields[50])
               },
              
               # Request Details Fields
               "uri_query": process_field(fields[51]),
               "protocol_version": process_field(fields[52]),
               "protocol": process_field(fields[53]),
               "host": process_field(fields[54]),
               "headers_count": safe_convert_int(fields[55]),
               "headers": process_field(fields[56]),
               "header_names": process_field(fields[57]),
               "cookie": process_field(fields[58]),
               "bytes_received": safe_convert_int(fields[59]),
               "accept_encoding": process_field(fields[60]),
               "accept": process_field(fields[61]),
              
               # Cache and Client Fields
               "cache_behavior_path_pattern": process_field(fields[62]),
               "client": {
                   "port": safe_convert_int(fields[63]),
                   "ip_version": process_field(fields[64]),
                   "country": process_field(fields[65])
               },
               "asn": process_field(fields[66])
           }
          
           # Convert to JSON string and encode in base64
           json_str = json.dumps(transformed_log)
           encoded_data = base64.b64encode(json_str.encode('utf-8')).decode('utf-8')
          
           output_record = {
               'recordId': record['recordId'],
               'result': 'Ok',
               'data': encoded_data
           }
          
           logger.info(f"Processed record successfully: {json_str}")
           output.append(output_record)
          
       except Exception as e:
           logger.error(f"Error processing record: {str(e)}")
           logger.error(f"Raw record data: {record['data']}")
           output_record = {
               'recordId': record['recordId'],
               'result': 'ProcessingFailed',
               'data': record['data']
           }
           output.append(output_record)
  
   return {'records': output}
```

***Notes:***

* *The function automatically handles gzip compression and base64 encoding.*  
* *Failed records are marked as 'ProcessingFailed' but won't stop the pipeline.*  
* *You may consider adjusting memory and timeout settings if processing large volumes of logs.*

---

7. Click **Deploy** to save your changes.  
8. Adjust the **Configuration** settings based on the specifics of your pipeline. Here are the recommended settings for the setup covered in this guide:

![Configuration page for an AWS Lambda function designed to transform CloudFront logs for OpenObserve ingestion.](/img/blog/cloudfront-access-logs/4-lambda-configuration-settings.png)

These settings provide a good balance between:

* Performance (enough memory and CPU)  
* Cost efficiency (not over-provisioning)  
* Reliability (adequate timeout and storage)  
* Processing capability (handles large log batches)

Your Lambda function is now ready to transform CloudFront logs before they reach OpenObserve. The transformed data will support all of the visualizations we'll create in Step 6 below.

## Step 5: Configure Kinesis Data Firehose

To deliver logs from Kinesis into OpenObserve, set up a Kinesis Data Firehose delivery stream.

1. Navigate to the [Amazon Data Firehose Console](https://console.aws.amazon.com/firehose/home) and click on **Create Firehose stream**.  
2. Provide a name for your delivery stream (e.g., CloudFrontToOpenObserve).  
3. Under source settings:  
   * Select **Kinesis Data Stream** and specify the data stream we created earlier (e.g., CloudFrontLogsStream).  
4. For destination:  
   * Choose **HTTP Endpoint**.  
   * Enter your **OpenObserve endpoint URL** (retrieved in Step 1).  
   * Select “Use access key” under authentication type and paste the **access key from OpenObserve**.

***PRO TIP:** Modify the “default” in the endpoint URL to create your own stream name. For example:*

```
https://cloud.openobserve.ai/aws/your_org_name/custom_stream_name/_kinesis_firehose
```

5. Configure backup settings:  
   * Specify an **S3 bucket** for failed records.  
6. Adjust buffer size and interval settings as needed (default values work well for most use cases).  
7. Review all settings and click **Create delivery stream**.

![Amazon Data Firehose setup page showcasing options to create a delivery stream for transferring logs to an HTTP endpoint.](/img/blog/cloudfront-access-logs/5-firehose-setup.gif) 

Your Firehose stream is now ready to forward processed log data from Kinesis into OpenObserve. You can adjust the configuration settings as needed to accommodate your log volume:

![Detailed view of Firehose settings including buffer size, retry duration, and destination endpoint for data delivery.](/img/blog/cloudfront-access-logs/6-kinesis-firehose-settings.png) 

* Near real-time data delivery (45-second buffer interval ensures fresh data for analysis)  
* Cost-efficient processing (3 MiB buffer size allows for efficient data batching)  
* Reliable data transmission (300-second retry duration handles temporary endpoint failures)  
* System stability (balanced buffer sizes between transform (3 MiB) and destination (1 MiB) prevent bottlenecks)

Now that the Kinesis Firehose stream is set up, we are finally ready to visualize our data by building dashboards in OpenObserve\!

## Step 6: Analyze and Visualize Logs in OpenObserve

With logs flowing into OpenObserve, you can start analyzing them immediately.

1. Log in to OpenObserve and navigate to **Logs**.  
2. Select your configured stream (e.g., cloudfront\_firehose\_test) to view logs, run queries, and create custom dashboard visualizations:

![OpenObserve interface showing logs ingested into the system with navigation options for detailed analysis and visualization.](/img/blog/cloudfront-access-logs/8-view-logs-in-o2.gif) 

3. Navigate to Dashboards to create your own custom dashboard, or [import this JSON file for a pre-built dashboard](https://github.com/openobserve/dashboards/tree/1951ad96a69931cfc97fe54bffd1965038eb2424/AWS%20Cloudfront%20Access%20Logs) to visualize your Cloudfront logs:

![OpenObserve interface showing how to import a pre-built JSON dashboard for visualizing CloudFront logs.](/img/blog/cloudfront-access-logs/9-import-json-dashboard.gif)   

4. Once the dashboard has been imported, you can explore and further customize it, based on your requirements:

![Exploring dashboards in OpenObserve with visualizations of metrics and logs related to CloudFront performance.](/img/blog/cloudfront-access-logs/10-explore-dashboards-in-o2.gif)  

This dashboard contains various tabs to cover key aspects of the Cloudfront access log data, including performance, errors, content, security, and more. You can customize it based on your needs.

## Dashboard Customization Example

For instance, if you want to add a geographical map (e.g., total unique IP addresses by region, total visitors by country, etc), you will need to enrich the logs. You can do this by following these steps:

1. In OpenObserve, navigate to **Pipelines** → **Functions** and add a new function (e.g., cloudfront\_logs\_geoip):

```
# Enrich with GeoIP data
.geo_city = get_enrichment_table_record!("maxmind_city", {"ip": .client_ip})
.geo_asn = get_enrichment_table_record!("maxmind_asn", {"ip": .client_ip})

# Extract specific fields we want to use
.client_country = .geo_city.country_name
.client_city = .geo_city.city_name
.client_latitude = .geo_city.latitude
.client_longitude = .geo_city.longitude
.client_asn = .geo_asn.autonomous_system_number
.client_org = .geo_asn.autonomous_system_organization

.
```

2. Save the function and navigate to **Pipelines**. Put together the pipeline as shown below, save, and navigate back to Logs. You should now see the new fields you added within the relevant stream.

![OpenObserve dashboard showing geolocation enrichment of CloudFront logs with unique visitor data by country and city.](/img/blog/cloudfront-access-logs/16-geomap-enrichment.gif) 

The geomap panel is already included in the JSON file you imported earlier. However, you will need to setup a pipeline (as shown above) for the geographical data to display correctly.

![World map in OpenObserve visualizing CloudFront log data, highlighting visitor activity across regions with color-coded metrics.](/img/blog/cloudfront-access-logs/17-geomap-visualization.gif)

Similarly, you can enrich the logs with any other data you want to use for your visualizations. This is a powerful feature of OpenObserve that allows you to build highly customized dashboards for your use cases.

## Troubleshooting

If you run into any issues while configuring this log pipeline to OpenObserve, consider the following:

1. **IAM Roles:** Double-check your IAM roles to ensure each AWS service has adequate permissions to execute the intended actions.  
     
2. **OpenObserve Authentication:** Check the authentication details for your OpenObserve instance. Reset the token if needed.

3. **Stream Health Monitoring:** You can monitor the health of your Kinesis Stream and Amazon Data Firehose stream by check the **Monitoring** tab for each of them:

![Visualization of Firehose metrics in AWS, showing data records read, processing duration, and other key performance metrics.](/img/blog/cloudfront-access-logs/7-firehose-data-viz.gif) 

4. **Firehose Stream Error Logs:** For the Firehose stream, in particular, you can also monitor the destination and backup error logs to inspect and address issues in a timely manner. This is what a healthy Firehose stream would look like:

![Firehose stream details showing active status, destination HTTP endpoint, and zero error logs for a successful data flow.](/img/blog/cloudfront-access-logs/11-firehose-stream-healthy.png)  

In contrast, this is what a stream with destination error logs would look like: 
 
![Firehose stream details with active status, indicating four destination error logs and zero backup error logs.](/img/blog/cloudfront-access-logs/12-errors-in-firehose.png)   

In this situation, you can examine the destination error logs for further information:

![Destination error logs in the Firehose monitoring tab showing connection failures to the HTTP endpoint with timestamps and error codes.](/img/blog/cloudfront-access-logs/13-error-log-details.png) 

5. **S3 Bucket Failed Data Analysis:** You can also look through the S3 bucket (where you are storing failed records, as specified earlier) for a better understanding of any issues:

![Amazon S3 bucket showing folders for failed Firehose data, categorized into HTTP endpoint failures and processing failures.](/img/blog/cloudfront-access-logs/14-s3-failed-data.png) 

6. **Cloudfront Log Inspection:** If you want to inspect the Cloudfront logs directly, you can do so by accessing the S3 bucket containing them:

![Amazon S3 bucket view displaying stored CloudFront logs, each file listed with size, timestamp, and storage class.](/img/blog/cloudfront-access-logs/15-s3-cloudfront-logs-data.png)

7. **Stream Name Matching:** Ensure that the stream name specified in the dashboard JSON file (e.g., “cloudfront\_access\_logs”) matches the stream name noted in your Firehose stream: 

```
https://cloud.openobserve.ai/aws/yourname/custom_stream_name/_kinesis_firehose
```

Examining these details can be helpful in the event of any data transformation, visualization, or processing issues.

## Optimizing CloudFront Log Analysis & Visualization

Now that you have your CloudFront logs streaming into OpenObserve with a pre-built dashboard to help you get started, consider the following next steps:

1. Set up alerts for critical metrics  
2. Create custom dashboards for specific use cases  
3. Implement automated responses to specific events  
4. Integrate with other monitoring tools or AWS services like [AWS Lambda](https://openobserve.ai/blog/monitor-aws-lambda-logs-cloudwatch-kinesis-firehose), [Amazon EventBridge (Cloudwatch Events)](https://openobserve.ai/blog/monitor-aws-events-using-amazon-eventbridge-cloudwatch-events), and more\!

OpenObserve’s intuitive interface makes it easy to search, visualize, and act on log data—whether it’s troubleshooting issues or optimizing performance.

By following this guide, you've set up a robust, real-time monitoring solution for your CloudFront logs using AWS Kinesis, Data Firehose, Lambda, and OpenObserve. This setup provides valuable insights into your CDN's performance, security, and usage patterns, enabling you to make data-driven decisions for your infrastructure.

Have questions or need help? [Join our Slack community](https://short.openobserve.ai/community) or [reach out directly](https://openobserve.ai/contactus)—we look forward to chatting with you.