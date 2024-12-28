---
title: "Effortlessly Visualize and Manage All Your AWS Metrics in One Place"
seoTitle: "How to Easily Visualize All Your AWS Metrics in One Dashboard"
description: Learn how to effortlessly bring together and visualize all your AWS metrics in one place. Step-by-step guide to creating unified dashboards for AWS monitoring.
img: /img/blog/cloudwatch-cloudformation/cloudwatch_kinesis_flow.gif
alt: how-to-monitor-all-aws-metrics-in-one-place
slug: how-to-monitor-all-aws-metrics-in-one-place
authors: 
  - chaitanya
publishDate: 2024-12-27
tags:
  - aws
  - cloudwatch
  - OpenTelemetry
  - Monitoring
  - Infrastructure
  - Observability
  - Troubleshooting
  - openobserve
  - rds
  - redis
  - kinesis
  - firehose
---

Monitoring your AWS metrics across multiple accounts and namespaces can be challenging. By consolidating all your metrics into one place, you can streamline your monitoring process and gain valuable insights into your infrastructure. In this blog, we’ll walk through an end-to-end setup using a CloudFormation template that:

* Captures CloudWatch metrics using Metric Streams.  
* Streams metrics to OpenObserve via Kinesis Firehose.  
* Provides a fallback mechanism via an S3 backup.

Let’s get started\!

## Prerequisites

Before proceeding, ensure you have:

1. AWS Access:  
   * Admin access to your AWS account.  
   * An S3 bucket ready for storing backups.  
2. OpenObserve:  
   * An endpoint configured to receive metrics via HTTP.  
   * Authentication tokens.
   ![o2 dashboard](/img/blog/cloudwatch-cloudformation/o2_endpoint_kinesis.png)  
3. CloudFormation Template: A YAML or JSON file ready for deployment (provided below).

## Step 1: Understand the Architecture

Here’s how the system works:

1. CloudWatch Metric Stream: Captures metrics across all namespaces (e.g., EC2, RDS, Lambda) and forwards them in near real-time to Kinesis Firehose.  
2. Kinesis Firehose Delivery Stream: delivers metrics to OpenObserve.  
3. S3 Backup: Stores metrics that fail to deliver for later analysis.  
4. IAM Roles: Grants secure permissions for each service to interact with the others.

This setup allows you to monitor metrics from multiple AWS accounts in a single location, streamlining the observability process.

## Step 2: Deploy the CloudFormation Template

You can find the cloudformation script from our [git repository](https://github.com/openobserve/cloudformation-templates/blob/main/aws_cloudwatch_metrics/CloudWatch_All_Metrics.yaml).

### Steps to Deploy

1. Save the template as `metrics-stream-setup.yaml`.  
2. Go to the AWS Management Console.  
3. Navigate to CloudFormation and click Create Stack.
![o2 dashboard](/img/blog/cloudwatch-cloudformation/search_cf.png)
![o2 dashboard](/img/blog/cloudwatch-cloudformation/create_cf_stack.png)    
4. Upload the YAML file and follow the on-screen steps.  
![o2 dashboard](/img/blog/cloudwatch-cloudformation/params_cf_stack.png)
![o2 dashboard](/img/blog/cloudwatch-cloudformation/ack_cf_stack.png)
5. Monitor the stack’s progress until it completes.
![o2 dashboard](/img/blog/cloudwatch-cloudformation/success_cf_stack.png)

## Step 3: Verify the Setup

1. CloudWatch Metric Stream:  
   * Go to the CloudWatch console and check the Metric Stream status.  
   * Ensure it is active.  
   ![o2 dashboard](/img/blog/cloudwatch-cloudformation/metrics_conf.png)
2. Kinesis Firehose:  
   * Verify the delivery stream is active.  
   * Test by pushing sample metrics to the stream. 
   ![o2 dashboard](/img/blog/cloudwatch-cloudformation/kinesis_conf.png)
3. S3 Backup:  
   * Check the specified bucket for failed deliveries (if any).  
4. OpenObserve:  
   * Log in and verify if metrics are being ingested.
   ![o2 dashboard](/img/blog/cloudwatch-cloudformation/o2_logs_console.png)
   ![o2 dashboard](/img/blog/cloudwatch-cloudformation/o2_sample_log.png)

## Step 4: Benefits of This Setup

| Without Centralized Monitoring | With Centralized Monitoring |
| ----- | ----- |
| Metrics are scattered across multiple accounts and services. | Metrics from all AWS accounts are consolidated in one place. |
| Difficult to gain a unified view of infrastructure health. | Single-pane-of-glass visibility for all metrics. |
| Manual effort required to aggregate data from different namespaces. | Automated collection of metrics across all namespaces (e.g., EC2, RDS, Lambda). |
| Troubleshooting is time-consuming and fragmented. | Streamlined troubleshooting with centralized data. |
| No backup mechanism for failed metric deliveries. | Reliable S3 backup for failed metrics. |

## Step 5: Troubleshooting

If metrics are not appearing:

* Check IAM permissions for both Metric Stream and Kinesis Firehose roles.  
* Verify the HTTP endpoint and authentication for OpenObserve.  
* Look for errors in the S3 backup bucket.

## Conclusion

By using this CloudFormation template and following these steps, you can easily centralize and streamline the monitoring of your AWS metrics. This setup ensures real-time observability across multiple AWS accounts and namespaces, providing a comprehensive view of your infrastructure. Simplify your AWS monitoring today\!

> #### Get Started with OpenObserve Today!
> Sign up for a free trial of OpenObserve on our [website](https://openobserve.ai/).
>Check out our [GitHub repository](https://github.com/openobserve) for self-hosting and contribution opportunities.