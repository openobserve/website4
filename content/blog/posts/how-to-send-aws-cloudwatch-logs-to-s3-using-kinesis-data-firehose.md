---
title: "Beginner’s Guide: How to Send AWS CloudWatch Logs to S3 via Kinesis Firehose"
seoTitle: How to Send AWS CloudWatch Logs to S3 using Kinesis Data Firehose
description: Learn how to send AWS CloudWatch logs to S3 using Kinesis Firehose in this beginner-friendly guide. Step-by-step instructions for seamless log streaming and storage
img: /img/blog/cwlogstos3/1.gif
alt: How to Send AWS CloudWatch Logs to S3 via Kinesis Data Firehose
slug: how-to-send-aws-cloudwatch-logs-to-s3-using-kinesis-data-firehose
authors: 
  - Sampath
publishDate: 2024-11-25
tags:
  - AWS CloudWatch Logs
  - Amazon Kinesis Firehose
  - Log Management
  - OpenObserve
  - AWS Kinesis Firehose
  - Firehose Delivery Stream
  - Real-Time Monitoring
  - Amazon S3
---
As businesses and applications scale in AWS, monitoring and log management become increasingly important. AWS CloudWatch Logs is a powerful service that collects and stores logs from various AWS resources and applications. However, there are situations where you may want to send your logs from AWS CloudWatch to an Amazon S3 bucket for long-term storage, data analytics, or compliance purposes.

In this guide, we will walk you through a simple and effective way to send your AWS CloudWatch Logs to an S3 bucket using Amazon Kinesis Data Firehose. 

### In This Blog, We Will Cover:
1. What Are AWS CloudWatch Logs?
2. What Is Amazon Kinesis Firehose?
3. Why Send CloudWatch Logs to S3 via Kinesis Firehose?
4. Step-by-Step Guide to Send CloudWatch Logs to S3 via Kinesis Firehose
5. Verifying Logs in the S3 Bucket
6. Conclusion

### Prerequisites:
- An AWS Account ready to create and manage resources

## What Are AWS CloudWatch Logs?
AWS CloudWatch Logs is a service that allows you to monitor, store, and access log files from your AWS resources and applications. It can collect logs from various AWS services such as EC2, Lambda, API Gateway, and more. CloudWatch Logs helps you troubleshoot issues, perform security analysis, and monitor your resources effectively. 

Cloudwatch Logs is good for basic log search and short-term retention. For better usability and control, you would want to move logs from Cloudwatch to other more capable services like OpenObserve or s3

## What Is Amazon Kinesis Firehose?
Amazon Kinesis Data Firehose is a fully managed service that automatically loads real-time data streams into AWS storage services like Amazon S3, Amazon Redshift, or Amazon Elasticsearch. With Firehose, you can easily capture log data and stream it to your desired destinations without writing complex code.

## Why Send CloudWatch Logs to S3 via Kinesis Firehose?
Sending CloudWatch logs to Amazon S3 offers several benefits:
- **Long-term Storage:** S3 provides durable, low-cost storage that can keep your logs indefinitely.
- **Easy Data Analysis:** You can analyze the logs using AWS analytics services like Amazon Athena, Redshift, Spark, Presto, or more external tools.
- **Compliance and Auditing:** S3’s strong access control features help ensure that logs are stored securely for auditing purposes.
- **Archiving & Backup:** Storing logs in S3 acts as an archive that can be used for backup purposes.

Using Amazon Kinesis Data Firehose allows you to automate the process of sending logs from CloudWatch to S3 in real-time, without needing to build a custom solution.

## Step-by-Step Guide to Send CloudWatch Logs to S3 via Kinesis Firehose

### Step 1: Sending Logs to CloudWatch Using Python
Before we dive into sending your CloudWatch logs to S3 via Kinesis Firehose, let’s start by sending logs to CloudWatch. This step will help you push sample logs to CloudWatch Log Groups, which will then be streamed to S3.

**Python Script to Send Logs to AWS CloudWatch:**
You can use a Python script to send logs to CloudWatch. Here's a simple Python script to get you started:
```
import boto3
import logging
import watchtower

# Replace with your AWS region
region_name = 'us-east-1' # Replace with your region name 

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
**How It Works:**
- **boto3:** The AWS SDK for Python, allowing you to interact with AWS services.
- **watchtower:** A library that integrates Python’s logging module with AWS CloudWatch.
- This script logs INFO, WARNING, and ERROR messages to the specified CloudWatch Log Group.

**Steps to Run the Python Script:**
1. **Install Required Libraries:** Run the following command to install the necessary libraries:
```
pip install boto3 watchtower
```
2. **Configure AWS Credentials:** Ensure your AWS credentials are set up. You can configure them using the AWS CLI or by setting the environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.
3. **Save the Script:** Save the script to a Python file, e.g., cloudwatch_logging.py.
4. **Run the Script:**
```
python cloudwatch_logging.py
```
![Screenshot showing the result of running the Python script for sending logs to AWS CloudWatch Log Group.](/img/blog/cwlogstos3/2.png)
Once you run this script, the log messages will be sent to your specified CloudWatch Log Group. This is an essential first step before streaming logs to S3 via Kinesis Firehose.
![CloudWatch Log Group displaying log messages after running the Python script.](/img/blog/cwlogstos3/3.jpg)
![AWS CloudWatch Log details showing successful log message entries.](/img/blog/cwlogstos3/4.jpg)

### Step 2: Creating a Kinesis Firehose Delivery Stream 
Next, create a Kinesis Data Firehose delivery stream to send logs to your S3 bucket.
1. Go to the **Kinesis section** in the AWS Management Console.
2. Click **Create delivery stream**
![AWS Management Console interface for creating a new Kinesis Data Firehose delivery stream](/img/blog/cwlogstos3/5.jpg)
3. Under Source, select **Direct Put**. This option allows CloudWatch Logs to send logs directly to Kinesis Firehose.
4. Under Destination, select **Amazon S3**.
![Kinesis Firehose configuration with 'Direct Put' as the source and 'Amazon S3' as the destination](/img/blog/cwlogstos3/6.jpg)
5. In the **Name** field, provide a name for your delivery stream (e.g., **CloudWatchLogsToS3**).
![Input field in AWS Management Console for naming the Kinesis Firehose delivery stream](/img/blog/cwlogstos3/7.jpg)
6. Under Destination settings, select the **S3 bucket** you created earlier. If you haven't created one yet, you can create a new bucket now and select it.
![Kinesis Firehose destination settings for selecting the target Amazon S3 bucket](/img/blog/cwlogstos3/8.jpg)
7. Kinesis Firehose has default batching settings where data is sent either every **300 seconds** or when the batch reaches **5 MB of data receipt**, whichever comes first. You can Configure buffering options as needed (e.g., Buffer interval and Buffer size).
![Kinesis Firehose buffering configuration options for data delivery](/img/blog/cwlogstos3/9.jpg)
8. Click **Create delivery stream** to finish the setup.
![Confirmation page in AWS Management Console showing the completed setup of the Kinesis delivery stream](/img/blog/cwlogstos3/10.jpg)
9. Once completed, you will see a Firehose stream named **CloudWatchLogsToS3** created.
![List of Kinesis Firehose delivery streams including CloudWatchLogsToS3 in AWS Management Console](/img/blog/cwlogstos3/11.jpg)

### Step 3: Creating a Subscription Filter to Send Logs to Kinesis Firehose
Now that everything is set up, you can configure your **CloudWatch Logs** to stream data to the **Kinesis Firehose delivery stream**.
1. Go to **CloudWatch > Log Groups**.
2. Select the log group from which you want to send logs to S3.
![CloudWatch Log Groups selection for Kinesis Firehose subscription](/img/blog/cwlogstos3/12.jpg)
3. Click **Actions > Create subscription filter > Create Amazon Data Firehose Subscription filter**.
![Creating a subscription filter in CloudWatch for Kinesis Firehose](/img/blog/cwlogstos3/13.jpg)
4. Under Choose destination, select **Current account** since we have previously created an Amazon Kinesis Data Firehose stream named **"CloudWatchLogsToS3"** in the same account. Then, select the **CloudWatchLogsToS3** stream.
![Selecting CloudWatchLogsToS3 Firehose stream in subscription filter setup](/img/blog/cwlogstos3/14.jpg)
5. Under **'Grant permission'**, we need to choose a role that allows CloudWatch Logs to send data to the Firehose stream we previously set up.
![Granting permissions for CloudWatch Logs to send data to Firehose](/img/blog/cwlogstos3/15.jpg)
6. To create **'CloudwatchLogsToFirehoseRole'**, go to IAM in the AWS Console, click **Roles**, and then **Create role** to set up permissions for CloudWatch Logs to send data to Firehose.
![Creating an IAM role for CloudWatch to Firehose integration](/img/blog/cwlogstos3/16.jpg)
7. Next, In the Select **trusted entity** section, choose **Custom trust policy**
![Selecting custom trust policy for CloudWatch IAM role](/img/blog/cwlogstos3/17.jpg)
8. Define the **Custom Trust Policy** to allow CloudWatch Logs to assume the role, you need to set the Principal as **logs.amazonaws.com**
![Defining trust policy for CloudWatch Logs role in IAM](/img/blog/cwlogstos3/18.jpg)
9. Once you've entered the trust policy, click Next: Permissions to proceed. Now, you'll need to attach the necessary permissions policies that allow CloudWatch Logs to interact with other AWS resources like **Kinesis Firehose**.
10. We need to grant the **firehose:PutRecord permission**, but for simplicity, I am attaching the **AmazonKinesisFirehoseFullAccess policy**.
![Attaching AmazonKinesisFirehoseFullAccess policy in IAM role setup](/img/blog/cwlogstos3/19.jpg)
11. Now, name the role and click **Create role** to complete the setup.
![Naming and creating IAM role for Firehose permissions](/img/blog/cwlogstos3/20.jpg)
12. In **Configure log format and filters**, select **Log format: Other** since our log is plain text. Name the subscription filter **'cloudwatch-to-s3'**
![Configuring subscription filter format and naming it cloudwatch-to-s3](/img/blog/cwlogstos3/21.jpg)
13. Under **Test pattern**, you can choose log data and test the pattern to preview the outcome
![Testing log pattern configuration for subscription filter in CloudWatch](/img/blog/cwlogstos3/22.jpg)
14. Once you're satisfied with the outcome, click **Start streaming** to begin the process
![Starting log streaming to Kinesis Firehose from CloudWatch](/img/blog/cwlogstos3/23.jpg)
15. you'll have successfully created the **subscription filter**
![Subscription filter creation confirmation in CloudWatch Logs](/img/blog/cwlogstos3/24.jpg)

## Verifying Logs in the S3 Bucket
After configuring everything, it’s important to confirm that your CloudWatch Logs are successfully delivered to your S3 bucket via Kinesis Firehose. Here's how you can check:
1. Go to the **S3 service** in AWS Management Console.
![Accessing S3 service in AWS Management Console](/img/blog/cwlogstos3/25.jpg)
2. Open the **bucket** and look for a folder that corresponds to your delivery stream (e.g., **AWSLogs** or the prefix you configured).
![S3 bucket folder structure showing AWSLogs delivery stream](/img/blog/cwlogstos3/26.jpg)
3. Inside this folder, you should see log files that have been delivered from CloudWatch via Firehose. These files are usually stored in **.gz format** and are organized by date and time.
4. Download a log file and open it to ensure that the log data from CloudWatch is present and in the expected format.
![Downloaded log file in .gz format for verification](/img/blog/cwlogstos3/27.jpg)
![Extracted CloudWatch log file content showing log data](/img/blog/cwlogstos3/28.jpg)

The successful ingestion of logs into the S3 bucket serves as confirmation that our setup is properly configured and operating as expected.

## Send logs to s3 using OpenObserve
You might wonder: **why send logs to S3 via OpenObserve?**

Sending logs to s3 allows for long term retention, however doing analysis on them requires a whole lot more work. 

If you could send data directly from Kinesis Firehose to OpenObserve which uses S3 as its primary store. All the data is stored in compressed parquet format in s3 and you can do analysis on it without doing any extra work
![Diagram illustrating log analysis using OpenObserve with S3 storage](/img/blog/cwlogstos3/29.gif)

If you're interested in sending AWS CloudWatch Logs to S3 using OpenObserve, here's a helpful guide to get you started: ["How to Send AWS CloudWatch Logs to Kinesis Firehose and Beyond".](https://openobserve.ai/blog/how-to-send-aws-cloudwatch-logs-to-kinesis-firehose/)

## Conclusion
By sending CloudWatch Logs to S3 via Kinesis Firehose, you can efficiently manage logs, ensuring they are securely stored for long-term access, compliance, and analysis. This simple integration automates the log streaming process, saving time and resources while helping you maintain a robust log management system.

Sending logs to s3 via OpenObserve provides much greater value and ease of use that you should follow which allows you to store logs for long term and analyze them directly from s3.
