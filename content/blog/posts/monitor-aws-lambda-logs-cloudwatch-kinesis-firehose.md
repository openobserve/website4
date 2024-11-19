---
title: 'How to Monitor AWS Lambda Logs Using CloudWatch & Kinesis Firehose'
seoTitle: 'Monitor AWS Lambda Logs Using CloudWatch & Kinesis Firehose | OpenObserve'
description: Learn how to monitor AWS Lambda logs using CloudWatch, Kinesis Firehose, and OpenObserve for performance tracking and error detection.
img: /img/blog/aws-lambda-logs/0-aws-lambda-logs-banner.png
alt: Banner with OpenObserve logo and the title 'How to Monitor AWS Lambda Logs Using CloudWatch & Kinesis Firehose' on a colorful abstract background.
slug: monitor-aws-lambda-logs-cloudwatch-kinesis-firehose
authors: 
  - nitya
publishDate: 2024-11-19
tags:
  - AWS Lambda Logs
  - AWS CloudWatch
  - AWS Kinesis Firehose
  - AWS Lambda Functions
  - AWS Performance Tracking
  - AWS Monitoring
---

Monitoring AWS Lambda logs is essential for tracking performance, detecting errors, and optimizing resource usage. In this guide, we’ll set up an AWS Lambda function that processes files, logs events, and ultimately sends those logs to OpenObserve via CloudWatch and Amazon Kinesis Data Firehose.

Why monitor AWS Lambda logs in the first place? Essentially, monitoring AWS Lambda logs helps you:

* **Track performance:** Monitor execution times, cold starts, and memory usage.  
* **Detect and resolve errors:** Capture error logs for troubleshooting.  
* **Optimize resource usage:** Monitor invocation counts and memory utilization to optimize costs.  
* **Ensure reliability:** Set up alerts for critical metrics like error rates and throttles.

So let’s get started!

## Step 1: Create an AWS Lambda Function

First, we will create a simple Lambda function that simulates a real-world scenario where files are uploaded and processed by Lambda, generating structured logs at different levels (INFO, WARNING, ERROR):

1. Log in to the [AWS Management Console](https://aws.amazon.com/console/).  
2. Navigate to the **Lambda Console**.  
3. Click Create function, select **Author from scratch**, and provide the following details:  
   * **Function name:** OpenObserveLambdaDemo  
   * **Runtime:** Python 3.9  
   * Leave other settings as default.  
4. Click **Create** function.  
5. Under the Code source, click on the file **lambda\_function.py** and replace its content with the following example code:  
   

```py
import json
import logging
import time
import random
import os

# Set up logging based on environment variable for log level (OPTIONAL)
log_level = os.getenv('LOG_LEVEL', 'INFO')
logger = logging.getLogger()
logger.setLevel(log_level)

# Simulate a file processing system with multiple log levels
def process_file(file_metadata):
    logger.info(f"Starting file processing for file: {file_metadata['file_name']}")
    
    # Simulate processing time
    time.sleep(random.uniform(0.5, 2))
    
    # Log different levels of messages based on file size
    file_size = file_metadata['file_size']
    
    if file_size > 1000:
        logger.warning(f"File {file_metadata['file_name']} is large ({file_size}MB). Processing might take longer.")
    
    if random.choice([True, False]):
        logger.error(f"Error occurred while processing file {file_metadata['file_name']}.")
        raise Exception(f"Failed to process file {file_metadata['file_name']}")
    
    logger.info(f"File {file_metadata['file_name']} processed successfully.")
    return {"status": "success", "message": f"File {file_metadata['file_name']} processed successfully."}

def lambda_handler(event, context):
    try:
        # Log incoming event
        logger.info(f"Received event: {json.dumps(event)}")
        
        # Extract file metadata from event
        file_metadata = event.get('file_metadata', {})
        
        # Call process_file function
        result = process_file(file_metadata)
        
        # Log success
        logger.info(f"Process result: {result}")
        
        return {
            'statusCode': 200,
            'body': json.dumps(result)
        }
    
    except Exception as e:
        logger.error(f"Error during execution: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({"error": str(e)})
        }
```

6. *(OPTIONAL)* If you want to allow dynamic log levels in your Lambda function based on different environments (e.g., development vs production), you can set up environment variables:  
   * In your Lambda function's configuration page, click on **Environment variables** →  **Edit**.  
   * Add an environment variable like this:

| Key | Value |
| :---- | :---- |
| LOG_LEVEL | INFO |

* This will allow you to control log verbosity dynamically without needing to redeploy your function.  
7. Click **Deploy** to save your changes.

![GIF demonstrating the setup process for an AWS Lambda function in the AWS Management Console, including code editing and deploying.][public/img/blog/aws-lambda-logs/1-lambda-function-setup.gif]  

### **Why Customize Logging?**

Although optional, customizing logging with environment variables like LOG\_LEVEL allows you to dynamically control log verbosity without redeploying your function. 

For example, in production environments, you may want fewer logs (INFO level), but during debugging or testing phases, you may want more detailed logs (DEBUG level). This flexibility is crucial for maintaining efficient observability while reducing unnecessary noise in production logs.

## Step 2: Set Up Amazon Kinesis Data Firehose

Now that our Lambda function is ready to go, let’s set up Kinesis Firehose to forward logs from CloudWatch to OpenObserve.

### **2.1 Retrieve OpenObserve Kinesis Firehose Details**

1. Log in to your OpenObserve account. If you don’t have an account, you can follow the [OpenObserve Quickstart Guide](https://openobserve.ai/docs/quickstart/) to quickly set up a free Cloud or Self-Hosted account.  
2. Once logged in to the OpenObserve dashboard, navigate to **Ingestion** → **Custom** → **Logs** → **Kinesis Firehose**.  
3. Copy your unique endpoint and access key (these will come in handy later\!):

![GIF showing the OpenObserve dashboard, highlighting steps to retrieve authentication details for Kinesis Firehose setup.](/img/blog/aws-lambda-logs/2-o2-get-auth-details.gif) 

### **2.2 Create a Kinesis Firehose Delivery Stream**

1. In the AWS Management Console, navigate to the [Kinesis Console](https://console.aws.amazon.com/kinesis).  
2. Click on **Create Firehose stream**.  
3. Provide the following details:  
   * **Delivery stream name:** OpenObserveFirehose  
   * Choose **Direct PUT** as the source.  
4. Under Destination, choose **HTTP endpoint**.

![GIF demonstrating the process of creating a new Firehose stream in the Amazon Data Firehose console, including configuration steps.](/img/blog/aws-lambda-logs/3-firehose-setup.gif) 

5. Provide the following details for OpenObserve (obtained above):  
   * **Endpoint URL**  
   * Select “Use access key” under **Authentication** type.  
     1. Paste the access key from OpenObserve into the "Access key" field.

![Screenshot of Amazon Kinesis Data Firehose destination settings, showing HTTP endpoint URL and authentication options.](/img/blog/aws-lambda-logs/4-firehose-destination-settings.png) 

### **2.3 Configure Backup Settings**

Backup settings are crucial in case something goes wrong with data delivery or processing:

1. Choose whether you want to back up all data or only failed data in Amazon S3.  
   * For this example, we’ll choose **Failed data** only, but feel free to back up all data if needed.  
2. Select an **existing S3 bucket** or create a new one (e.g., lambda-firehose-backup).

![GIF showing the process of selecting an Amazon S3 bucket for Kinesis Firehose backup settings in the AWS console.](/img/blog/aws-lambda-logs/5-firehose-select-s3-bucket.gif) 

### **2.4 Finalize Firehose Stream Setup**

1. Click on **Next**, configure buffer size and interval as needed (default values will suffice for this example), then click on **Next** again.  
2. Review all settings and click on **Create Firehose stream**.

## Step 3: Subscribe CloudWatch Logs to Kinesis Firehose 

Now that we have set up our delivery stream, we need to subscribe our Lambda function’s CloudWatch Logs group to this stream so that logs are forwarded from CloudWatch to OpenObserve via Kinesis Firehose.

### **3.1 Grant IAM Permissions for CloudWatch Logs**

To allow CloudWatch Logs to send data into your Kinesis Firehose stream, you must first create an IAM role with appropriate permissions using a custom trust policy.

1. Go to the [IAM Console](https://console.aws.amazon.com/iam/home) in AWS.  
2. Click on **Roles** → **Create Role**.  
3. Under "Trusted entity type," select **Custom trust policy**, then paste the following JSON trust policy:  
   

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "logs.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
```

This allows CloudWatch Logs (logs.amazonaws.com) to assume this role when sending data into Kinesis Firehose.

4. Click **Next** and select an existing policy, **AmazonKinesisFirehoseFullAccess**, in the “Add permissions” page.  
5. Click **Next**, add a role name, and click on **Create role**.

![GIF demonstrating the setup of an IAM role in the AWS console, including trust policy configuration and permission assignment.](/img/blog/aws-lambda-logs/6-iam-role-setup.gif) 

### **3.2 Create a Subscription Filter for CloudWatch Logs**

1. In the AWS Management Console, navigate to [CloudWatch Logs](https://console.aws.amazon.com/cloudwatch/home).  
2. Find your Lambda function’s log group (it should be named /aws/lambda/OpenObserveLambdaDemo).  
3. Click on your log group and then click on **Actions** → **Create subscription filter**.  
4. Select **Kinesis Data Firehose** as the destination.  
5. Choose your **delivery stream** (OpenObserveFirehose) from the dropdown list.  
6. For **filter pattern**, leave it blank unless you have specific pattern requirements (this will capture all logs).

![GIF showing the process of navigating the CloudWatch console to set up a log group and create a subscription filter.](/img/blog/aws-lambda-logs/7-cloudwatch-log-group-setup.gif) 

This ensures that all logs generated by your Lambda function are automatically forwarded from CloudWatch Logs to OpenObserve via Kinesis Firehose. 

As a result, we are now able to start seeing logs coming into OpenObserve:

![GIF showing the OpenObserve interface with logs being displayed, including navigation through streams and metrics.](/img/blog/aws-lambda-logs/8-view-log-in-o2.gif) 

Now, we will invoke the Lambda function using realistic test cases to simulate a high volume of logs being generated and sent to OpenObserve.

## Step 4: Invoke Lambda Function With Test Cases

First things first, to test that everything is working correctly, invoke your Lambda function with detailed test cases simulating real-world scenarios:

1. In the [Lambda Console](https://console.aws.amazon.com/lambda), click on your function (OpenObserveLambdaDemo).  
2. Click on the **Test** tab.  
3. Configure multiple test events simulating different real-world scenarios (see test case options below).  
4. Click **Save**, then click on each test event's corresponding button (**Test**) to invoke your Lambda function with these scenarios.

![GIF showing the AWS Lambda console with a function test setup, including navigating to the Test tab and running test events.](/img/blog/aws-lambda-logs/9-test-lambda-function.gif) 

### **Test Case 1: Normal File Processing**

* Name it something like **TestEvent_NormalProcess**.  
* Use this sample payload:

```
{
  "file_metadata": {
    "file_name": "document.pdf",
    "file_size": 500
  }
}
```

### **Test Case 2: Large File Warning Simulation**

* Name it something like **TestEvent_LargeFile**.  
* Use this sample payload:

```
{
  "file_metadata": {
    "file_name": "large_video.mp4",
    "file_size": 1500
  }
}
```

### **Test Case 3: File Processing Error Simulation**

* Name it something like **TestEvent_FileError**.  
* Use this sample payload:

```
{
  "file_metadata": {
    "file_name": "corrupt_file.txt",
    "file_size": null
  }
}
```

### **Additional Test Cases**

Optionally, you can also leverage a wide variety of test templates available within the AWS Lambda Console to test additional scenarios suitable for your specific Lambda function(s):

![public/img/blog/aws-lambda-logs/10-lambda-additional-tests.gif](/img/blog/aws-lambda-logs/10-lambda-additional-tests.gif)  

## Step 5: View AWS Lambda Log Data in OpenObserve

Once you've invoked your Lambda function a few times with different test cases, you should be able to see some meaningful logs within OpenObserve:

1. Navigate to your OpenObserve dashboard.  
2. Go to **Streams** → **Logs** or simply navigate to the **Logs** tab.  
3. Search for logs related to your service name (OpenObserveLambdaDemo) or filter by log level (e.g., level=error).

![GIF showing the OpenObserve dashboard with logs displayed, including filtering options and running queries for specific time ranges.](/img/blog/aws-lambda-logs/11-o2-dashboard-results.gif) 

You can now run queries on these logs or create custom visualizations and dashboards for further analysis and continuous monitoring. You have created a robust and scalable system to monitor logs for any of your Lambda functions\!

## Why Not Use Lambda Extensions?

Lambda Extensions offer another way to capture AWS Lambda logs with their own sets of pros and cons. We will cover those details in an upcoming blog post, along with the nuances of each approach.

By using Amazon Kinesis Data Firehose in this example, we have leveraged a scalable service that integrates seamlessly with CloudWatch Logs without modifying runtime behavior. However, there is a broader world of AWS Lambda monitoring to be explored, and we will dive deeper into an alternative approach using Lambda Extensions in a future article.

## Elevate Your AWS Lambda Log Monitoring Strategy 

Today, you have set up an efficient pipeline using Amazon Kinesis Data Firehose to forward AWS Lambda logs from CloudWatch into OpenObserve without needing any custom collectors or agents. You have also configured environment variables in your Lambda function for better observability with custom logs at various levels (INFO, WARNING, ERROR). Finally, you have transported log data to OpenObserve for real-time monitoring and continuous visualization of key log data.

As you can already see, this setup provides complete visibility into your serverless applications while minimizing complexity—enabling you to create an efficient and easily scalable observability workflow.

Want to learn more about optimizing the observability of your Lambda functions and serverless applications? [Get started with OpenObserve](https://openobserve.ai/docs/quickstart/) today, and explore the possibilities.