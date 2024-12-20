---
title: "How to monitor AWS RDS Logs and events with AWS Cloudwatch and Kinesis Data Firehose"
seoTitle: "How to ingest and monitor AWS RDS Logs and events with AWS Cloudwatch and Kinesis Data Firehose"
description: Learn how to set up AWS RDS log ingestion for detailed monitoring and observability. Compare centralized log analysis with OpenObserve vs. traditional methods for optimizing performance, enhancing security, and scaling database insights effectively.
img: /img/blog/cloudwatch-rds-logs/rds_logs_main.gif
alt: monitor-aws-rds-cloudwatch-logs
slug: monitor-aws-rds-cloudwatch-logs
authors: 
  - chaitanya
publishDate: 2024-12-19
tags:
  - AWS
  - Cloudwatch
  - AWS RDS
  - Postgres
  - AWS RDS Logs
  - Amazon Data Firehose
  - Kinesis
  - Monitoring
---
Effective monitoring of AWS RDS logs is vital to ensuring the reliability, performance, and scalability of your database systems, especially when managing multiple AWS accounts and RDS instances. This guide provides a step-by-step walkthrough for ingesting, analyzing, and visualizing AWS RDS logs to enhance your database monitoring strategy.

## Why Monitor AWS RDS Logs?

RDS logs offer invaluable insights into your database's health, performance, and behavior. By leveraging these logs, you can:

* **Optimize Query Performance:** Analyze slow query logs to fine-tune database performance and reduce latencies.  
* **Enhance Security Monitoring:** Track access logs and detect potential unauthorized activities.  
* **Diagnose Issues Efficiently:** Investigate error logs to quickly identify and resolve database errors.  
* **Ensure Scalability:** Monitor log-based metrics to predict and prepare for workload spikes.  
* **Centralize Log Analysis:** Consolidate logs from multiple AWS accounts into a unified platform for seamless observability.

### Prerequisites

Before starting, ensure:

1. You have access to AWS RDS.  
2. [Running OpenObserve Cluster](https://cloud.openobserve.ai/).  
3. Familiarity with AWS Kinesis is recommended.

### Step 1: Configure Kinesis Data Stream

CloudWatch streams metrics via Kinesis, which acts as a transport mechanism. Follow these steps:

1. **Create a Kinesis Data Stream:**  
   * Navigate to **Kinesis \> Data Streams** in the AWS Management Console.  
   * Click **Create data stream** and name it appropriately (e.g., `RDSlogStream`).  
   * Set the number of shards based on the expected metric volume.  
2. **Choose OpenObserve as destination:**  
   * In the destination configuration, select provide the url of OpenObserve HTTP endpoint. 
   ![aws rds logs](/img/blog/cloudwatch-rds-logs/kinesis_first.png)
   ![aws rds logs](/img/blog/cloudwatch-rds-logs/kinesis_second.png)

Refer to [this guide](https://openobserve.ai/docs/howto/ingest_cloudwatch_logs/) for detailed Kinesis configuration steps.

### Step 2: Modify RDS Instance to Enable Logs

* Navigate to the **Amazon RDS** service in the AWS Management Console.  
* Select the RDS instance you want to monitor.  
![aws rds logs](/img/blog/cloudwatch-rds-logs/rds_first.png)
* Click **Modify** and ensure the following logs are enabled under the **Log Exports** section:  
  * **PostgreSQL Logs**  
  * **Upgrade Logs**
![aws rds logs](/img/blog/cloudwatch-rds-logs/rds_second.png)  
* Enable the **Apply Immediately** option to make changes effective without a scheduled maintenance window.
![aws rds logs](/img/blog/cloudwatch-rds-logs/rds_third.png)

### Step 3: Verify Log Group in CloudWatch

* After enabling log exports, verify that the RDS logs are being sent to the associated **CloudWatch Log Group**.  
* Navigate to **CloudWatch \> Log Groups** and search for the log group corresponding to your RDS instance.
![aws rds logs](/img/blog/cloudwatch-rds-logs/rds_four.png)

### Step 4: Subscribe CloudWatch Log Group to Kinesis Streams

* Go to the **CloudWatch Log Group** for your RDS instance.  
* Create a subscription filter to send log events to an **Amazon Kinesis Data Stream**:  
  * Click **Actions \> Create Subscription Filter**.  
  * Select **Kinesis Stream** as the destination and choose your target stream.  
  * Refer to **Step1** for the details of the kinesis.
  ![aws rds logs](/img/blog/cloudwatch-rds-logs/rds_six.png)
  ![aws rds logs](/img/blog/cloudwatch-rds-logs/rds_seven.png) 

### Step 5: Verify Logs in OpenObserve

* Visit OpenObserve dashboard and go to logs to query the ingested data from AWS RDS
![aws rds logs](/img/blog/cloudwatch-rds-logs/rds_five.png)

## **Conclusion**

| Feature/Aspect | With OpenObserve | Without OpenObserve |
| :---- | :---- | :---- |
| Centralized Monitoring | Logs from multiple AWS accounts consolidated in one view | Logs scattered across individual AWS accounts |
| Proactive Issue Detection | Automated alerts on log anomalies and errors | Manual inspection required to detect issues options. |
| Detailed Query Insights | Analyze slow query logs for performance optimization | Limited to basic metrics without granular details |
| Advanced Security Auditing | Access logs analyzed for unauthorized activities | Minimal visibility into security-related events |

By following these steps, you can set up an end-to-end monitoring solution for AWS RDS logs using CloudWatch and OpenObserve. This approach ensures:

* **Proactive Database Monitoring**  
* **Enhanced Security and Performance**  
* **Centralized Observability**  
* **Scalable Analysis**

Ready to optimize your database performance and simplify your observability workflows? [Visit our website](https://openobserve.ai/) to learn more details about how the platform works.