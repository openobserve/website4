---
title: Processing Real-Time Data with CloudWatch Logs Subscription Filters
seoTitle: Processing Real-Time Data with CloudWatch Logs Subscription Filters
description: Subscription Filters enable searching through logs for event data,
  which is then forwarded to a specified AWS resource.
img: /img/resources/cloudwatch-logs-subscription-filter-image-1.png
alt: cloudwatch logs subscription filter
slug: cloudwatch-logs-subscription-filter-real-time-data
authors:
  - openobserve-team
publishDate: 2024-07-17
tags:
  - cloudwatch logs subscription filter
  - real-time data processing
  - AWS resource forwarding
  - log event filtering
  - AWS Lambda
---
<h2>Introduction to CloudWatch Logs Subscription Filters</h2>

<p>
Subscription filters in CloudWatch Logs allow you to define a pattern to search for specific log events and forward them to a specified AWS resource in real-time. This enables you to access and process log data as it is generated rather than waiting for logs to accumulate.
</p>
<p>

![](/img/resources/cloudwatch-logs-subscription-filter-image2.png)

</p>
<p>
<a href="https://openobserve.ai/docs/howto/ingest_cloudwatch_logs/">Image Credit</a>
</p>
<h3>How Subscription Filters Work?</h3>

<p>
Subscription filters work by applying a filter pattern to log events. This pattern is used to match specific log data, such as log messages or event types. When a log event matches the filter pattern, it is forwarded to the specified AWS resource, such as Amazon Kinesis, Data Firehose, or AWS Lambda.
</p>
<h3>Benefits of Subscription Filters</h3>

<p>
Subscription filters provide several benefits, including:
</p>
<ul>

<li>Real-time Log Access: Subscription filters allow you to access log events as they are generated, enabling real-time monitoring and processing.

<li>Customized Log Processing: By defining a filter pattern, you can customize the log data that is forwarded to your AWS resource, ensuring that only relevant data is processed.

<li>Scalability: Subscription filters can handle large volumes of log data, making them suitable for high-traffic applications.
</li>
</ul>
<h3>Example Use Case</h3>

<p>
Suppose you have an e-commerce application that generates log events for every order placed. You can use a subscription filter to forward log events that contain specific keywords, such as "order placed" or "payment failed," to an AWS Lambda function for further processing.
</p>
<p>
Subscription filters in CloudWatch Logs provide a powerful way to access and process log data in real-time. By defining a filter pattern, you can customize the log data that is forwarded to your AWS resource, enabling you to monitor and process log events as they are generated.
</p>
<p>
In the next section, you will dive deeper into understanding subscription filters.
</p>
<h2>Understanding Subscription Filters</h2>

<p>
Subscription filters are essential for delivering a live feed of log events for analysis. They help you filter and forward log events to specific AWS resources, such as Amazon Kinesis, Data Firehose, or AWS Lambda.
</p>
<h3>Log Group-Level and Account-Level Filters</h3>

<p>
Subscription filters support both log group-level and account-level filters. Log group-level filters apply to a specific log group, while account-level filters apply to all log groups in your AWS account. Each filter type has specific limits and error-handling measures to ensure reliable data processing.
</p>
<h3>Log Event Encoding and Compression</h3>

<p>
Log events are Base64 encoded and compressed in gzip format. This ensures efficient data transmission and reduces storage requirements.
</p>
<h3>Limitations and Best Practices</h3>

<ul>

<li>Filter Limitations: Each log group can have up to two subscription filters associated with it.

<li>Best Practices: Use specific filter patterns to avoid overwhelming your AWS resources and ensure efficient data processing.
</li>
</ul>
<p>
Subscription filters are a powerful tool for analyzing log events in real-time. By understanding how they work and their limitations, you can effectively use them to deliver a live feed of log events for analysis.
</p>
<p>
In the next section, you will learn about supported destinations and configurations in Subscription filters in CloudWatch Logs.
</p>
<h2>Supported Destinations and Configurations</h2>

<h3>Supported Destinations</h3>

<p>
Subscription filters support three main destinations:
</p>
<ul>

<li>Kinesis Data Streams: For processing and analyzing log events in real-time.

<li>Kinesis Data Firehose: For delivering log events to data warehouses, data lakes, and analytics platforms.

<li>AWS Lambda: For triggering custom functions and processing log events.
</li>
</ul>
<h3>Cross-Account Sharing</h3>

<p>
Cross-account sharing is limited to Kinesis streams. This means you can share Kinesis streams across different AWS accounts, but not other subscription filter destinations.
</p>
<h3>Subscription Filter Configuration</h3>

<p>
To set up a subscription filter, you need to provide the following information:
</p>
<ul>

<li>Log Group Name: The name of the log group you want to filter.

<li>Filter Pattern: A pattern to match specific log events.

<li>Destination ARN: The ARN of the AWS resource you want to forward log events to.

<li>IAM Role ARN & Access Policy: The IAM role and access policy are required for the destination.

<li>Distribution Method: The method of distributing log events to the destination.
</li>
</ul>
<p>
Subscription filters provide flexibility in processing and analyzing log events by supporting various destinations and configurations. By understanding the supported destinations and configuration requirements, you can effectively use subscription filters to meet your log analysis needs.
</p>
<p>
In the next section, you will learn how to create and manage subscription filters.
</p>
<h2>Creating and Managing Subscription Filters</h2>

<h3>Getting Started</h3>

<p>
To create and manage subscription filters, follow these steps:
</p>
<ol>

<li>Create a Receiving Resource: First, create a receiving resource such as a Kinesis data stream, Kinesis data firehose, or AWS Lambda function.

<li>Define a Subscription Filter: Define a subscription filter for event delivery by specifying the log group, filter pattern, and destination ARN.
</li>
</ol>
<h3>Creating and Updating Subscription Filters</h3>

<p>
To create or update a subscription filter, use the put_subscription_filter command:
</p>

<pre class="prettyprint">bash
aws cloudwatch put-subscription-filter --log-group-name &lt;log-group-name> --filter-name &lt;filter-name> --filter-pattern &lt;filter-pattern> --destination-arn &lt;destination-arn></pre>

<h3>Listing and Deleting Subscription Filters</h3>

<p>
To list all subscription filters for a log group, use the get_paginator command:
</p>

<pre class="prettyprint">bash
aws cloudwatch get-paginator --log-group-name &lt;log-group-name> --paginator-name describe-subscription-filters</pre>

<p>
To delete a subscription filter, use the delete_subscription_filter command:
</p>

<pre class="prettyprint">bash
aws cloudwatch delete-subscription-filter --log-group-name &lt;log-group-name> --filter-name &lt;filter-name></pre>

<h3>Filter and Pattern Syntax</h3>

<p>
To search and filter log data effectively, use the filter and pattern syntax. For example:
</p>

<pre class="prettyprint">json
{
  "logGroup": "my-log-group",
  "filterPattern": "ERROR"
}</pre>

<p>
By following these steps and utilizing filter and pattern syntax, you can effectively manage subscription filters.
</p>
<p>
In the next section, you will learn about some of the best practices and considerations.
</p>
<h2>Best Practices and Considerations</h2>

<h3>Calculating Log Data Volume</h3>

<p>
When setting up subscription filters, it's important to calculate the expected log data volume. Ensure that the destination stream (e.g., Kinesis Data Stream) has enough shards to handle the incoming data and avoid throttling.
</p>
<h3>Mitigating Throttling</h3>

<p>
To mitigate throttling, specify a random distribution when creating a subscription filter. This helps distribute the log events across the available shards in the destination stream. Additionally, monitor the stream using CloudWatch metrics to identify and address any throttling issues.
</p>
<h3>IAM Roles and Permissions</h3>

<p>
Use IAM roles with specific permissions for CloudWatch Logs to interact with the destination services. This ensures that the subscription filter has the necessary access to forward log events to the specified resource.
</p>
<h3>Verifying Subscription Filter Setup</h3>

<p>
Verify the subscription filter setup using appropriate methods for each destination type:
</p>
<ul>

<li>Kinesis Data Streams: Consume the stream and validate the received log events.

<li>Kinesis Data Firehose: Check the delivery stream and the destination (e.g., S3 bucket) for the forwarded log events.

<li>AWS Lambda: Validate the function's execution and the processed log events.
</li>
</ul>
<p>
This ensures reliable log event delivery, efficient resource utilization, and proper security measures.
</p>
<p>
In the next section, you will understand error handling and metrics.
</p>
<h2>Error Handling and Metrics</h2>

<h3>Understanding Retry Policies</h3>

<p>
When errors occur in log data delivery, it's essential to understand the retry policies in place. This ensures that log events are not lost and that the delivery process is efficient.
</p>
<h3>Monitoring Log Forwarding Operations</h3>

<p>
Monitor log forwarding operations using CloudWatch metrics to ensure efficiency and identify any issues. This includes metrics such as:
</p>
<ul>

<li>Delivery Delay: The time it takes for log events to be delivered to the destination.

<li>Delivery Failure: The number of log events that fail to be delivered.

<li>Throttling: The rate at which log events are being delivered to the destination.
</li>
</ul>
<p>
Effective error handling and monitoring are crucial for ensuring reliable log data delivery. 
</p>
<p>
In the next section, you will learn about real-time processing and analysis.
</p>
<h2>Real-Time Processing and Analysis</h2>

<h3>Analyzing Real-Time Data</h3>

<p>
Real-time processing and analysis allow you to analyze data as it is generated, enabling you to make timely decisions and react to changes in your application. This includes analyzing real-time data for alerts and business logic directly within coding logs.
</p>
<h3>Enhancing Development Efficiency</h3>

<p>
Real-time processing and analysis also enhance development efficiency by managing alert mechanisms through code logs. This ensures that you are notified of any issues or errors in real-time, allowing you to address them promptly.
</p>
<h3>Examples of Real-Time Log Processing</h3>

<p>
Here are some examples of utilizing subscription filters for real-time log processing and insights:
</p>
<ul>

<li>Error Detection: Use subscription filters to detect errors in real-time and trigger alerts or notifications.

<li>Performance Monitoring: Monitor application performance in real-time by analyzing log data and identifying bottlenecks.

<li>Security Monitoring: Use subscription filters to monitor security-related log data and detect potential security threats.
</li>
</ul>
<p>
Real-time processing and analysis are essential for ensuring the efficiency and reliability of your application. By utilizing subscription filters and analyzing real-time data, you can identify issues and make timely decisions.
</p>
<p>
Real-time processing and analysis are crucial for gaining insights from your log data as it's generated. However, CloudWatch Logs alone doesn't offer advanced analytics capabilities.  OpenObserve provides a powerful platform specifically designed for analyzing and searching log data in real-time.  <a href="https://cloud.openobserve.ai">Get started with OpenObserve today and unlock the full potential of your CloudWatch Logs data</a>!
</p>
<p>
In the final section, you will see the impact of using subscription filters on pricing and their limits.
</p>
<h2>Pricing and Limits</h2>

<h3>Pricing</h3>

<p>
Implementing subscription filters in AWS CloudWatch Logs does not incur any additional costs. The charges you'll encounter are related to the data logging and ingestion into CloudWatch Logs, which are based on the volume of log data.
</p>
<h3>Limits</h3>

<p>
AWS CloudWatch Logs supports two types of subscription filters:
</p>
<ol>

<li>Account-level Filters: These filters apply to all log groups within your AWS account. There is a limit of 20 account-level filters per account.

<li>Log Group-level Filters: These filters apply to a specific log group. Each log group can have up to two log group-level filters associated with it.
</li>
</ol>
<p>
It's crucial to understand these limits when configuring your subscription filters to ensure efficient and effective log data processing.
</p>
<p>
Subscription filters in AWS CloudWatch Logs are a cost-effective way to process and analyze log data in real-time. While there are no additional charges for implementing subscription filters, it's important to be aware of the account-level and log group-level limits to ensure your configuration meets your requirements.
</p>
<p>
While CloudWatch Logs subscription filters are a cost-effective solution, they lack built-in functionalities for advanced log data analysis. OpenObserve goes beyond the limitations of CloudWatch Logs by offering a comprehensive suite of features for real-time log analytics.  <a href="https://cloud.openobserve.ai">Sign up for a free trial of OpenObserve and experience the power of in-depth log analysis.</a>
</p>
<h2>How Can OpenObserve Help</h2>

<p>
OpenObserve can help in processing real-time data with CloudWatch Logs subscription filters by providing a platform for analyzing and searching log data. Here are the steps to follow:
</p>
<p>
1. Get OpenObserve Cloud/OpenObserve Credentials:
</p>
<ul>

<li>Navigate to the OpenObserve dashboard.

<li>Click on "Ingestion" and then "Kinesis Firehose"

<li>Obtain the credentials needed for the next step.
</li>
</ul>
<p>
2. Configure Kinesis Firehose:
</p>
<ul>

<li>   Log in to the AWS Management Console.

<li>   Go to Kinesis Firehose.

<li>    Click "Create delivery stream".

<li>   Choose the source as "Direct PUT" and the destination as "HTTP Endpoint".

<li>   Give the stream a name and enter the HTTP endpoint URL from the previous step.
</li>
</ul>
<p>
3. Set up IAM Policy and Role for CloudWatch to Send Logs to Kinesis Firehose:
</p>
<ul>

<li>   Create an IAM role with the necessary permissions.

<li>   Associate the permissions policy with the role.
</li>
</ul>
<p>
4. Set up CloudWatch Subscription Filter to Send Logs to Kinesis Firehose:
</p>
<ul>

<li>   Navigate to the CloudWatch dashboard.

<li>   Select the log group you want to send to OpenObserve.

<li>   Click the "Actions" dropdown menu and select "Subscription filters > Create Kinesis Firehose Subscription Filter".

<li>   Choose the destination as the Kinesis Firehose stream and the IAM role created earlier.

<li>Click "Start streaming".
</li>
</ul>
<p>
5. Monitor and Analyze CloudWatch Logs in OpenObserve:
</p>
<ul>

<li>   Navigate to the OpenObserve UI.

<li>   Select the "cloudwatch" stream.

<li>   Use the query editor to search for logs as usual.

<li>   Build a new dashboard for your log data.

<li>   Set up alerts and notifications for potential issues in your AWS environment.
</li>
</ul>
<p>
By following these steps, you can use OpenObserve to analyze and search your real-time log data from CloudWatch Logs subscription filters.
</p>
<p>
Integrating OpenObserve with CloudWatch Logs is a breeze.  Get your OpenObserve credentials in just a few clicks and proceed to the next step!  <a href="https://cloud.openobserve.ai">Open an OpenObserve account today to unlock seamless CloudWatch Logs integration</a>
</p>
<h2>Conclusion</h2>

<p>
This guide explores CloudWatch Logs subscription filters, a powerful tool for analyzing log data in real-time. OpenObserve offers a platform for analyzing and searching log data delivered by CloudWatch Logs subscription filters. 
</p>
<p>
Subscription filters are a valuable tool for unlocking real-time insights from your CloudWatch Logs. By implementing them effectively and understanding their limitations, you can gain valuable insights into your applications and optimize their performance.
</p>
<p>
Build dashboards, set up alerts, and proactively monitor your AWS environment for potential issues.  <a href="https://cloud.openobserve.ai">Start your free OpenObserve trial and experience the power of real-time log data monitoring</a>!
</p>
<h2>Resources & Bibliography:</h2>

<ol>

<li><a href="https://openobserve.ai/docs/howto/ingest_cloudwatch_logs/">https://openobserve.ai/docs/howto/ingest_cloudwatch_logs/</a> 

<li><a href="https://www.linkedin.com/showcase/openobserve-for-enterprises/">https://www.linkedin.com/showcase/openobserve-for-enterprises/</a>

<li><a href="https://www.linkedin.com/posts/openobserve-for-enterprises_ingest-amazon-cloudwatch-logs-in-openobserve-activity-7172953994296745984-OHj9">https://www.linkedin.com/posts/openobserve-for-enterprises_ingest-amazon-cloudwatch-logs-in-openobserve-activity-7172953994296745984-OHj9</a>

<li><a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html</a>

<li><a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_OpenSearch_Stream.html</a>

<li><a href="https://openobserve.ai/docs/">OpenObserve Documentation</a>

<li><a href="https://github.com/openobserve">OpenObserve - GitHub</a>

<li><a href="https://www.youtube.com/@openobserve">OpenObserve - Youtube</a>

<li><a href="https://openobserve.ai/">We are OpenObserve</a>

<li><a href="https://medevel.com/openobserve/">OpenObserve Review: The Ultimate Open-Source Platform</a>
</li>
</ol>
