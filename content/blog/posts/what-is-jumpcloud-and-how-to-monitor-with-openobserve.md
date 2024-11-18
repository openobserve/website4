---
title: "What is JumpCloud and How JumpCloud Directory Insights Help Customize Security Reports for Advanced Monitoring"
seoTitle: "What is JumpCloud and How JumpCloud Directory Insights Help Customize Security Reports for Advanced Monitoring"
description: Learn what JumpCloud is and how JumpCloud Directory Insights helps customize security reports. Discover how to forward JumpCloud logs to AWS S3 and use AWS Lambda to ingest them into OpenObserve for enhanced security observability.
img: /img/blog/what-is-jumpcloud/Jumpcloud.gif
alt: what-is-jumpcloud-and-how-to-monitor-with-openobserve
slug: what-is-jumpcloud-and-how-to-monitor-with-openobserve
authors: 
  - chaitanya
publishDate: 2024-11-18
tags:
  - JumpCloud
  - Directory Insights
  - AWS S3
  - AWS Lambda
  - Security
  - Audit Logs
  - SSO
  - Active Directory
---
 
JumpCloud provides a centralized platform for managing identities, devices, and access, crucial for organizations with distributed teams or remote workforces. A key feature, JumpCloud Insights, offers actionable data on user and system activities, essential for security monitoring and compliance. In this guide, we’ll cover forwarding JumpCloud Insights to AWS S3, using a Lambda function to ingest these logs directly into OpenObserve, and setting up visual dashboards for comprehensive security observability.

## Step1: Setting Up AWS S3 as the Log Forwarding Destination

First, set up AWS S3 as the destination for JumpCloud logs by following the instructions in the [JumpCloud AWS Serverless App Directory for Insights](https://jumpcloud.com/blog/aws-serverless-app-directory-insights). This process enables JumpCloud Insights data to be forwarded to an S3 bucket, acting as a raw data storage location before processing.

You can choose the ingestion time as needed. I opted for every minute since I prefer near-realtime. 

With this setup, JumpCloud will start sending data to your S3 bucket as logs are generated, allowing access to raw security and operational data from JumpCloud Insights.

## Step2: Creating an AWS Lambda Function for Ingestion to OpenObserve

To streamline log ingestion from S3 to OpenObserve, set up an AWS Lambda function that automatically transfers new log files into OpenObserve as they arrive in the S3 bucket.

### Prerequisites

Download the [src.zip](https://github.com/openobserve/cloudformation-templates/blob/main/jumpcloud/src.zip) from github that will be used in the next step.

### Step-by-Step Deployment

* Create Lambda function as shown in the image below  
  * ![lambda create](/img/blog/what-is-jumpcloud/image2.png)  
* Upload Your Lambda Function Code (src.zip)  
  * Go to function and click on Upload From and select your zip file that you downloaded from prerequisites step  
  * ![lambda create](/img/blog/what-is-jumpcloud/image4.png)    
* Configure environment variables  
  * Go to configuration and click on Environment Variables and then add BASIC\_AUTH\_USERNAME and BASIC\_AUTH\_PASSWORD  
  * ![lambda create](/img/blog/what-is-jumpcloud/image9.png)    
* Configure AWS InvokeFunction policy  
  * Go to configuration and click on **Permissions** and the go to **Resource-based policy statements** and click on add permissions and follow the below image  
  * ![lambda create](/img/blog/what-is-jumpcloud/image7.png)    
* Add an S3 Trigger  
  * Go to the bucket that was created in step1 and add an event trigger  
    * ![lambda create](/img/blog/what-is-jumpcloud/image10.png)    
    * ![lambda create](/img/blog/what-is-jumpcloud/image5.png)    
    * ![lambda create](/img/blog/what-is-jumpcloud/image1.png)  

This will now start sending the events to OpenObserve when there is any event in the bucket.

## Step3: Building Dashboards in OpenObserve

You can simply upload the [JumpCloud dashboard](https://github.com/openobserve/dashboards/tree/main/JumpCloud) that was designed by the OpenObserve team to get started quickly on security and other insights. 

![lambda create](/img/blog/what-is-jumpcloud/jc1.jpeg)  
![lambda create](/img/blog/what-is-jumpcloud/jc2.jpeg)  
![lambda create](/img/blog/what-is-jumpcloud/jc3.jpeg)  

## Enhance JumpCloud Insights with OpenObserve

Integrating JumpCloud Insights with OpenObserve using AWS S3 and Lambda enables advanced security observability. The comparison below highlights the enhanced capabilities gained by sending JumpCloud logs to OpenObserve

| Feature/Aspect | JumpCloud Insights Alone | JumpCloud Insights Ingested into OpenObserve |
| :---- | :---- | :---- |
| Data Storage | AWS S3 (raw data) | AWS S3 with live ingestion in OpenObserve |
| Real-time Analytics | Limited | Full real-time visualization |
| Customized Dashboards | None | Available in OpenObserve |
| Security Monitoring | Basic | Enhanced with detailed metrics and logs |
| Setup Complexity | Moderate | Moderate, with Lambda and template.yaml |
| Scalability | Depends on S3 limitations | Scalable via OpenObserve |

Ready to power your insights with OpenObserve? Get started [here](https://cloud.openobserve.ai/) 