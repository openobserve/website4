---
title: "Comprehensive Guide to AWS WAF: Logging, Monitoring, and Visualization"
seoTitle: "How to Monitor and Visualize AWS WAF Logs: Step-by-Step Guide"
description: Learn how to set up and monitor AWS WAF logs for enhanced security. This comprehensive guide covers AWS WAF configuration, waf logs, automated ingestion, dashboards, and best practices for visualization and insights.
img: /img/blog/aws-waf/waf_final.gif
alt: how-to-monitor-aws-waf-logs
slug: how-to-monitor-aws-waf-logs
authors: 
  - chaitanya
publishDate: 2024-12-01
tags:
  - AWS WAF
  - Bot control
  - AWS S3
  - AWS Lambda
  - AWS Data Firehose
  - API Gateway
  - Cloudfront
  - AWS ALB
---
 
AWS Web Application Firewall (WAF) is a powerful tool designed to protect web applications from common exploits and vulnerabilities. By analyzing HTTP/S traffic, AWS WAF helps you mitigate threats such as SQL injection, cross-site scripting (XSS), and more, ensuring robust security for your applications. Whether you're securing an API Gateway, Amazon CloudFront, or an Application Load Balancer, AWS WAF provides a customizable and scalable solution.

## Key Features of AWS WAF

* **API Gateway Protection**: Safeguard APIs from abusive traffic patterns and exploits.  
* **Bot Control**: Defend against automated threats using AWS WAF Bot Control.  
* **Flexible Rules**: Create custom rules for tailored protection.  
* **Real-Time Monitoring**: Analyze logs for insights into traffic patterns and threats.

For step-by-step instructions on setting up AWS WAF, refer to the [AWS WAF Getting Started Guide](https://docs.aws.amazon.com/waf/latest/developerguide/getting-started.html).

## Why Enable AWS WAF Logging?

Logging in AWS WAF provides visibility into allowed and blocked requests, helping you:

* **Analyze Traffic**: Understand patterns and identify potential attacks.  
* **Enhance Security**: Refine WAF rules based on detailed log data.  
* **Meet Compliance**: Retain logs for auditing and compliance requirements.

## Step-by-Step Guide to Configuring AWS WAF Logging

1. ### **Enable Logging in AWS WAF**:

   * Navigate to the AWS WAF console.  
   * Choose the web ACL for which you want to enable logging.  
   * Specify the S3 bucket to store logs.
   ![aws waf dashboard](/img/blog/aws-waf/log-enable.png)
   ![aws waf dashboard](/img/blog/aws-waf/create-s3.png)

2. ### **Deploy the CloudFormation Template**:

   * Use the CloudFormation template from our [repository](https://github.com/openobserve/cloudformation-templates/blob/main/aws_waf/cloudformation_waf.yaml).  
   * Upload the CloudFormation template to your AWS account.
   * Provide parameters such as:  
     * The HTTP endpoint name and [URL](https://openobserve.ai/blog/monitor-aws-lambda-logs-cloudwatch-kinesis-firehose#_21-retrieve-openobserve-kinesis-firehose-details).  
     * The access key for the HTTP endpoint.  
     * Names of the CloudTrail S3 bucket and backup bucket.

     ![aws waf dashboard](/img/blog/aws-waf/waf-cf-parameters.png)
     ![aws waf dashboard](/img/blog/aws-waf/waf-cf-confirmation.png)
   * Ensure the IAM roles, Lambda function, Kinesis Firehose, and S3 configurations are created successfully.
     ![aws waf dashboard](/img/blog/aws-waf/waf-stack-confirmation.png)
   * Cloudformation does not support enabling trigger on existing bucket so you will need to add the trigger manually as below.
     ![aws waf dashboard](/img/blog/aws-waf/waf-lambda-trigger.png)

## Visualizing AWS WAF Logs in OpenObserve
### Analyzing the logs
Go to your OpenObserve dashboard and verify the logs by searching your stream. 
![aws waf dashboard](/img/blog/aws-waf/waf-logs.png)

### Benefits of Dashboards

With OpenObserve, you can create custom dashboards to:

* **Track Threats**: Monitor blocked requests, bot challenges, and threat patterns.  
* **Analyze API Gateway Metrics**: Gain insights into API traffic and security.  
* **Optimize Rules**: Adjust WAF rules based on detailed analytics.

![aws waf dashboard](/img/blog/aws-waf/waf-dashboard.gif)

[You can download our AWS WAF dashboard to get started with basic charts.](https://github.com/openobserve/dashboards/tree/main/AWS_WAF)

### Example Dashboard Panels

1. **Top Blocked IPs**: Identify malicious sources.  
2. **Request Trends**: Visualize traffic spikes and anomalies.  
3. **Action Summary**: Breakdown of `allow`, `deny`, and `challenge` actions.  
4. **Bot Control Analysis**: Understand bot-related activity.

## Best Practices for AWS WAF Monitoring

* **Implement Custom Rules**: Tailor rules to your application needs.  
* **Use AWS Managed Rules**: Leverage pre-configured rule groups for common threats.  
* **Enable Bot Control**: Protect against automated attacks.  
* **Regularly Review Logs**: Stay proactive in identifying new attack patterns.

## Conclusion: Why Monitor AWS WAF Logs?
![aws waf dashboard](/img/blog/aws-waf/waf-o2.png)

The combination of AWS WAF logging and OpenObserve dashboards provides unparalleled insights into your web application’s security. From real-time monitoring to historical data analysis, these tools empower you to safeguard your infrastructure effectively. With intuitive dashboards, you can quickly identify malicious activity, optimize rules, and track API Gateway usage.

Detailed logs and visualizations ensure compliance and make troubleshooting seamless. Automated alerts and reports keep you informed about anomalies, while centralized monitoring offers a unified view of your application’s security posture. Together, AWS WAF and OpenObserve deliver a robust, scalable, and proactive solution to meet your web application security and monitoring needs.

#### Comparison Table: Ingesting AWS WAF Logs to OpenObserve vs. Without

| Feature | With OpenObserve | Without OpenObserve |
| ----- | ----- | ----- |
| Log Analysis | Interactive dashboards for deep insights | Limited to raw log files |
| Visualization | Real-time visual representation of traffic | Limited visualization |
| Threat Tracking | Identify patterns and malicious activity | Manual analysis required |
| Alerts | Custom alerts for anomalies or specific events | Limited alerting mechanism |
| Reports | Automated, scheduled reports with actionable insights | Requires manual reporting efforts |
| Centralized Monitoring | Single pane of glass for AWS WAF and other logs | Logs siloed, no unified view (imagine having org accounts) |
| Automation | Integrated alerts and workflows for quick responses | No automation capabilities |

Ready to get started with OpenObserve to ingest AWS WAF logs for detailed analysis? Visit our [cloud version](https://cloud.openobserve.ai/) to quickly setup your OpenObserve account. 