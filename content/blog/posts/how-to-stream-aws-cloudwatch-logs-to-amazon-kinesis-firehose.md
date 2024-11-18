---
title: Comprehensive Guide to Integrating AWS CloudWatch Logs with Amazon Kinesis Firehose
seoTitle: How to Stream AWS CloudWatch Logs to Amazon Kinesis Firehose
description: Learn how to integrate AWS CloudWatch Logs with Amazon Kinesis Firehose for seamless, real-time log streaming and management. This step-by-step guide covers the benefits, setup, and verification of logs in OpenObserve, ensuring efficient monitoring, troubleshooting, and improved AWS log management. Perfect for DevOps engineers looking to streamline their log management strategy in the cloud.
img: /img/blog/cloudwatch_logs/0.gif
alt: Analyze AWS cloudwatch logs by sending them to kinesis firehose and further
slug: how-to-stream-aws-cloudwatch-logs-to-amazon-kinesis-firehose

authors: 
  - Sampath
publishDate: 2024-11-18
tags:
  - AWS CloudWatch Logs
  - Amazon Kinesis Firehose
  - Log Management
  - OpenObserve
  - AWS Kinesis Firehose
  - Firehose Delivery Stream
  - Real-Time Monitoring
---
Managing logs efficiently is crucial for monitoring, diagnosing, and optimizing applications in the cloud. AWS CloudWatch Logs integration offers a powerful solution for centralized log collection and analysis. However, by streaming CloudWatch Logs to Kinesis Firehose, you can elevate your log management strategy to a new level, enabling scalable, real-time log streaming for enhanced processing and delivery. In this blog, we’ll walk you through the benefits and a step-by-step guide on how to set up the CloudWatch Logs to Firehose pipeline for improved AWS log management.

### In this blog, we will cover:
1. What Are AWS CloudWatch Logs?
2. What Is Amazon Kinesis Firehose?
3. Step-by-Step Guide to Setting Up CloudWatch Logs to Kinesis Firehose Pipeline
4. Verify Logs in OpenObserve
5. Create a Simple Dashboard in OpenObserve
6. Conclusion

### Prerequisites:
- An AWS Account ready to create and manage resources
- An OpenObserve cloud/self hosted account ready to receive logs. We will use OpenObserve cloud service in this blog.

## What Are AWS CloudWatch Logs?
AWS CloudWatch Logs is an AWS service that is the default destination for most of the AWS services. The seamless integration with other AWS services makes CloudWatch Logs a go-to tool for centralized log management in AWS environments. Cloudwatch Logs is good for basic log search and short-term retention. For better usability and control, you would want to move logs from Cloudwatch to other more capable services like OpenObserve or s3.

## What Is Amazon Kinesis Firehose?
Amazon Kinesis Firehose is a fully managed service designed to deliver real-time streaming data to various destinations, such as data lakes, analytics services, and custom HTTP endpoints. By integrating CloudWatch Logs with Firehose, you can stream logs seamlessly to tools like OpenObserve or other destinations, enabling real-time monitoring, analysis, and storage of log data.

## Step-by-Step Guide to Setting Up CloudWatch Logs to Kinesis Firehose Pipeline
### Step 1: Sending Logs to CloudWatch Using Python
To get started, you need to send logs to CloudWatch. Below is a Python script to push sample logs to CloudWatch log group.
```
import boto3
import logging
import watchtower

# Replace with your AWS region
region_name = 'us-east-1'

# Create a CloudWatch client if needed
cloudwatch_client = boto3.client('logs', region_name=region_name)

# Replace with your log group name
log_group = 'my-log-group'  

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add CloudWatch as a logging handler
logger.addHandler(
    watchtower.CloudWatchLogHandler(
        log_group=log_group,
        stream_name='my-log-stream',  # Replace with your log stream name
        use_queues=False  # Optional: helps with immediate log transmission
    )
)

# Log messages to CloudWatch
logger.info("This is an info log sent to CloudWatch.")
logger.warning("This is a warning log sent to CloudWatch.")
logger.error("This is an error log sent to CloudWatch.")
```
The above script sends Python log messages (INFO, WARNING, ERROR) to AWS CloudWatch by configuring the logging system with a CloudWatch log handler using boto3 and watchtower.

**Save the Python script:** Save the code to a Python file, e.g., cloudwatch_logging.py.

To run this code, make sure you have the required Python libraries installed and AWS credentials configured. Here's how you can do it:
### Install the required libraries:
```
pip install boto3 watchtower
```
**Ensure AWS credentials are set up:** Make sure your AWS credentials are configured using the AWS CLI or environment variables (**AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY**).
![aws_configure](/img/blog/cloudwatch_logs/2.jpg)

**Run the script:**
```
python cloudwatch_logging.py
```
![run_python_script](/img/blog/cloudwatch_logs/1.jpg)
This will execute the script and send the log messages to AWS CloudWatch.
![aws_cloudwatch_logs](/img/blog/cloudwatch_logs/3.jpg)
![aws_cloudwatch_log](/img/blog/cloudwatch_logs/4.jpg)

### Step 2: Creating a Kinesis Firehose Delivery Stream 
A Kinesis Firehose Delivery Stream is needed to stream real-time data from CloudWatch Logs to destinations like OpenObserve. It ensures reliable data delivery and backup.
Here's how to create one:

Go to the **Amazon Kinesis Console** and select **Create delivery stream** to begin the setup.
![aws_cloudwatch_log_console](/img/blog/cloudwatch_logs/5.jpg)
Select **Direct Put** as the **source** to receive data directly from CloudWatch Logs and **HTTP endpoint** as the **destination** to send data to your OpenObserve endpoint.
![aws_cloudwatch_log_source](/img/blog/cloudwatch_logs/6.jpg)

Provide a name for your **delivery stream** (e.g., cloudwatch-to-o2).
![aws_cloudwatch_log_stram](/img/blog/cloudwatch_logs/7.jpg)

Enter the **HTTP Endpoint URL** and select **Use access key** for authentication.
![aws_cloudwatch_log_HTTP](/img/blog/cloudwatch_logs/9.jpg)

You can find the **HTTP Endpoint URL** and **access key** for authentication in OpenObserve under **Ingestion > Custom > Logs > Kinesis Firehose**.
![OpenObserve](/img/blog/cloudwatch_logs/8.jpg)

In the **Backup settings**, choose Source record backup in Amazon S3 for either Failed data only or All data, and select an S3 bucket. You can browse and select an existing bucket or create a new one and select it.

I have created a bucket named **cwlogs-demo-bucket** for storing backup data.
![s3_bucket](/img/blog/cloudwatch_logs/10.jpg)

![s3_bucket_1](/img/blog/cloudwatch_logs/11.jpg)

**Configure Batching Options:** During the Firehose stream creation process, you'll see options related to data batching. Kinesis Firehose has default batching settings where data is sent either every **300 seconds** or when the batch reaches **5 MB of data receipt**, whichever comes first.
![Batching_Options](/img/blog/cloudwatch_logs/11-2.jpg)
This is an important aspect of how Firehose handles data delivery, so make sure to configure it properly based on your use case.

Click **Create Firehose stream** to finish the setup.
![Firehose_stream](/img/blog/cloudwatch_logs/12.jpg)

Once completed, you will see a Firehose stream named **cloudwatch-to-o2** created.
![Firehose_stream_done](/img/blog/cloudwatch_logs/13.jpg)

### Step 3: Creating a Subscription Filter to Send Logs to Kinesis Firehose
A subscription filter is needed to route logs from CloudWatch to Firehose. Here's how to create one:

Navigate to **CloudWatch** in the **AWS Management Console** and select the log group you want to stream; in our case, it's **"my-log-group"**.
![Firehose_stream_1](/img/blog/cloudwatch_logs/14.jpg)

Click on **Actions** and select **Create subscription filter**. In the Destination section, choose **Create Amazon Data Firehose Subscription filter**
![AWS_cloudwatch_Subscription_filter](/img/blog/cloudwatch_logs/15.jpg)

Under **Choose destination**, select **Current account** since we have previously created an Amazon Kinesis Data Firehose stream named **"cloudwatch-to-o2"** in the same account. Then, select the **cloudwatch-to-o2** stream.
![Subscription_filter](/img/blog/cloudwatch_logs/16.jpg)

Under **Grant permission**, we need to choose a role that allows CloudWatch Logs to send data to the Firehose stream we previously set up.
![Subscription_filter_1](/img/blog/cloudwatch_logs/21.jpg)

To create **CloudwatchLogsToFirehoseRole**, go to IAM in the AWS Console, click Roles, and then Create role to set up permissions for CloudWatch Logs to send data to Firehose.
![IAM](/img/blog/cloudwatch_logs/16-1.jpg)

Next, In the **Select trusted entity** section, choose **Custom trust policy**
![IAM_1](/img/blog/cloudwatch_logs/17.jpg)

Define the **Custom Trust Policy** to allow **CloudWatch Logs** to assume the role, you need to set the Principal as **logs.amazonaws.com**
![IAM_2](/img/blog/cloudwatch_logs/18.jpg)

Once you've entered the trust policy, click Next: Permissions to proceed. Now, you'll need to attach the necessary permissions policies that allow CloudWatch Logs to interact with other AWS resources like **Kinesis Firehose**.

We need to grant the **firehose:PutRecord permission**, but for simplicity, I am attaching the **AmazonKinesisFirehoseFullAccess** policy.
![IAM_3](/img/blog/cloudwatch_logs/19.jpg)

Now, name the role and click **Create role** to complete the setup.
![IAM_4](/img/blog/cloudwatch_logs/20.jpg)

In **Configure log format and filters**, select **Log format: Other** since our log is plain text. Name the subscription filter **cloudwatch-to-o2**
![IAM_5](/img/blog/cloudwatch_logs/22.jpg)

Under **Test pattern**, you can choose **log data** and test the pattern to preview the outcome
![IAM_6](/img/blog/cloudwatch_logs/23.jpg)

Once you're satisfied with the outcome, click **Start streaming** to begin the process
![IAM_7](/img/blog/cloudwatch_logs/24.jpg)

you'll have successfully created the subscription filter
![IAM_8](/img/blog/cloudwatch_logs/25.jpg)

## Verify Logs in OpenObserve
As we have set up the integration between AWS CloudWatch Logs and Kinesis Firehose, it’s time to check whether the logs are successfully flowing into OpenObserve.This step is crucial to ensure that your log data is being ingested and processed correctly.

From the OpenObserve home page, we can see that logs in one stream has been ingested
![o2](/img/blog/cloudwatch_logs/27.jpg)

You can also click on **Streams** to view a list of all available streams in OpenObserve.
![o2_1](/img/blog/cloudwatch_logs/26.jpg)

Now, let's go to the **Logs** section, select the **default** stream, and click on **Run query** to view the logs.
![o2_2](/img/blog/cloudwatch_logs/28.jpg)

Click on any record to see the details of that specific log
![o2_3](/img/blog/cloudwatch_logs/29.jpg)

## Create a Simple Dashboard in OpenObserve
Now that your logs are flowing into OpenObserve, it’s time to visualize the data and make it actionable. 
The dashboard shows log events over time, with bursts of activity around 12:45 and 12:55, and no logs in between.
![O2_dashboards](/img/blog/cloudwatch_logs/30.jpg)

## OpenObserve vs. AWS CloudWatch

| Feature                 | OpenObserve (O2)                                                   | AWS CloudWatch                                    |
|-------------------------|---------------------------------------------------------------------|----------------------------------------------------|
| **Deployment Flexibility** | Self-hosted on-prem, edge, or cloud for low-latency              | cloud-based, AWS-centric                 |
| **Customization & Control** | Full control and customization available                        | Limited customization, AWS-bound                   |
| **Cost Efficiency**     | Open-source, cost-effective, scalable                              | Costs scale quickly with data volume               |
| **Edge Support**        | Supports true edge deployments                                     | Limited to AWS-specific edge services              |
| **Open-Source Ecosystem** | Integrates with open-source tools (e.g., Prometheus)              | Constrained to AWS integrations                    |
| **Data Ownership**      | Full data control in self-hosted setups                            | Data stored in AWS, potential privacy concerns     |
| **UI & Querying Capabilities** | Much better UI and querying capabilities                    | Standard UI and querying capabilities             |


## Conclusion
Integrating AWS CloudWatch Logs with Kinesis Firehose and OpenObserve streamlines log management by centralizing log data, enabling real-time monitoring, and providing powerful log analysis. This setup ensures quick issue detection and efficient troubleshooting.
With OpenObserve, you can visualize trends, monitor performance, and scale as your log volume grows. It makes managing logs more efficient, improving overall application health and operational insights.
