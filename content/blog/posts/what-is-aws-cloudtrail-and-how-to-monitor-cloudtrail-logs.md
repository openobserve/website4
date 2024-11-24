---
title: "What is AWS CloudTrail? How to Monitor CloudTrail Logs and Data Events for Real-Time Insights"
seoTitle: "What is AWS CloudTrail? How to Monitor CloudTrail Logs and Data Events for Real-Time Insights"
description: Learn what AWS CloudTrail is and how to monitor CloudTrail logs and data events in real-time. Using a CloudFormation stack, deploy roles for Lambda functions, Kinesis Data Firehose, and policies to seamlessly send AWS CloudTrail logs, data events, and more to OpenObserve for analysis.
img: /img/blog/what-is-aws-cloudtrail/cloudtrail.gif
alt: what-is-aws-cloudtrail-and-how-to-monitor-cloudtrail-logs
slug: what-is-aws-cloudtrail-and-how-to-monitor-cloudtrail-logs
authors: 
  - chaitanya
publishDate: 2024-11-23
tags:
  - AWS Cloudtrail
  - AWS Lambda
  - Amazon Data Firehose
  - AWS S3
  - OpenObserve
  - Observability
  - Troubleshooting
  - Auditing
  - Compliance
  - Security
  - AWS Organizations
---

### What is AWS CloudTrail?

AWS CloudTrail is a vital service for auditing and monitoring your AWS account activity (individual or across all the organizations). It records API calls, data events, user activities, and resource changes, providing visibility into your AWS environment. This ensures compliance, security, and operational efficiency.

### Why is CloudTrail Important?

* **Audit Trail**: Helps maintain a record of all API calls made within your account, ensuring accountability.  
* **Security**: Identifies unauthorized access attempts or unusual behavior, bolstering your cloud security.  
* **Compliance**: Aids in adhering to regulatory requirements by maintaining detailed logs of actions in your account.  
* **Operational Insights**: Offers visibility into resource usage and access patterns for better management.

### How to Enable AWS CloudTrail?

Enabling CloudTrail in your AWS environment involves setting up trails to deliver logs to an S3 bucket for storage and further analysis.

1. **Log in to AWS Console**: Navigate to the CloudTrail service.  
2. **Create a Trail**:  
   * Click on **Trails** and then **Create trail**.  
   * Provide a name for your trail.

   ![aws dashboard](/img/blog/what-is-aws-cloudtrail/image10.png)

3. **S3 Bucket for Storage**:  
   * Select an existing S3 bucket or create a new one for storing CloudTrail logs.  
   * Configure permissions to allow CloudTrail to write logs to the bucket.  
   * It is recommended to select **Enable for all accounts in my organization** for a more centralized management.

   ![aws s3 storage](/img/blog/what-is-aws-cloudtrail/image7.png)

4. **Enable Log Events**:  
   * Choose to log management events, data events, or both.  
   * Optionally include read and write events for detailed insights.

   ![aws dashboard](/img/blog/what-is-aws-cloudtrail/image3.png)

5. **Save and Activate**: Once configured, activate the trail.  
   ![aws dashboard](/img/blog/what-is-aws-cloudtrail/image8.png)

Your logs will now be delivered to the specified S3 bucket, ready for further processing and analysis.

### Using a CloudFormation Template for Observability Pipeline

### [**You can download the cloudformation template from github by clicking this line.**](https://github.com/openobserve/cloudformation-templates/blob/main/aws_cloudtrail/cloudtrail_o2.yaml)

The CloudFormation template automates the setup by creating the following resources:

1. **IAM Roles**:  
   * An IAM role for Kinesis Firehose with permissions to access S3 buckets and send data to a specified HTTP endpoint.  
   * A Lambda execution role with permissions to process logs from S3 and send them to Kinesis Firehose.  
2. **Lambda Function**:  
   * Automatically triggered when CloudTrail logs are added to the S3 bucket.  
   * Processes and extracts individual records from the logs.  
   * Sends the processed records to a Kinesis Firehose delivery stream.  
3. **Kinesis Firehose**:  
   * A delivery stream configured to send CloudTrail logs to an HTTP endpoint (like OpenObserve) for analysis.  
   * Supports buffering, retries, and logging of delivery operations.  
   * Backs up any failed data to a secondary S3 bucket.  
4. **S3 Notification**:  
   * Configures the S3 bucket to notify the Lambda function whenever new logs are created.

### How to Use the Template

---
⚠️ Important Note ⚠️ 
The provided CloudFormation stack assumes that CloudTrail logs are already enabled in your AWS account. You will need to provide the name of the S3 bucket where CloudTrail logs are stored. Setting up and enabling CloudTrail as part of the CloudFormation stack is outside the scope of this blog. |
| :---- |

**Deploy the Template**:

* Upload the CloudFormation template to your AWS account.  
  ![aws dashboard](/img/blog/what-is-aws-cloudtrail/image9.png)  
* Provide parameters such as:  
  * The HTTP endpoint name and URL.  
  * The access key for the HTTP endpoint.  
  * Names of the CloudTrail S3 bucket and backup bucket.

  ![aws dashboard](/img/blog/what-is-aws-cloudtrail/image2.png)


**Verify the Deployment**:

* Ensure the IAM roles, Lambda function, Kinesis Firehose, and S3 configurations are created successfully.  
  ![aws dashboard](/img/blog/what-is-aws-cloudtrail/image4.png) 
  ![aws dashboard](/img/blog/what-is-aws-cloudtrail/image11.png)

**Enable trigger for Lambda**:

* Cloudformation does not support enabling trigger on existing bucket so you will need to add the trigger manually as below.  
  ![aws dashboard](/img/blog/what-is-aws-cloudtrail/image5.png)  
  ![aws dashboard](/img/blog/what-is-aws-cloudtrail/image1.png)

### Analyzing Logs in OpenObserve

Once the above steps are completed, logs are ingested into OpenObserve, you can visualize and analyze them using dashboards. You can download the dashboards [here](https://github.com/openobserve/dashboards/blob/main/AWS_CloudTrail/CloudTrail.dashboard.json).

![aws dashboard](/img/blog/what-is-aws-cloudtrail/image6.jpg)
![aws dashboard](/img/blog/what-is-aws-cloudtrail/cloudtrail_logs.gif)
![aws dashboard](/img/blog/what-is-aws-cloudtrail/cloudtrail_o2_dashboard.GIF)


#### Key Features of the Dashboards

1. **Log Analysis**:  
   * View detailed API activity logs with filters for event names, users, and resources.  
2. **Security Monitoring**:  
   * Track unusual activity patterns or unauthorized access attempts.  
3. **Compliance Reporting**:  
   * Generate reports for audits with specific event details.  
4. **Resource Insights**:  
   * Monitor resource creation, deletion, and usage trends.

#### Benefits of the Automated Setup

* **Efficiency**: Automates the log ingestion pipeline from CloudTrail to OpenObserve.  
* **Scalability**: Handles large volumes of logs seamlessly.  
* **Insights**: Provides a real-time view of your AWS environment.

### Achieve AWS Security Goals with OpenObserve

AWS CloudTrail is indispensable for monitoring and securing your AWS environment. By leveraging a CloudFormation template, you can automate the setup of an efficient log pipeline to tools like OpenObserve. This not only saves time but also provides a powerful way to analyze and visualize your AWS activities. With detailed dashboards and log analysis, you can ensure compliance, detect anomalies, and optimize your cloud operations. [Get started with OpenObserve](https://cloud.openobserve.ai/) and gain control of your AWS cloudtrail logs.