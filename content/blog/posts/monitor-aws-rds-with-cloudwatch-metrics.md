---
title: "Comprehensive Guide to Monitoring AWS RDS via CloudWatch Metrics and OpenTelemetry"
seoTitle: "How to monitor AWS RDS with AWS Cloudwatch Metrics with Kinesis Firehose"
description: Learn how to monitor AWS RDS metrics efficiently using AWS CloudWatch and OpenTelemetry. This guide covers end-to-end steps, including creating a CloudWatch metric stream, setting up a Kinesis data stream, and ingesting RDS metrics via OpenTelemetry for centralized monitoring. Perfect for managing multiple AWS accounts and ensuring optimal database performance.
img: /img/blog/cloudwatch-metrics-aws-rds/cloudwatch_rds_metrics_final.gif
alt: monitor-aws-rds-with-cloudwatch-metrics
slug: monitor-aws-rds-with-cloudwatch-metrics
authors: 
  - chaitanya
publishDate: 2024-12-19
tags:
  - AWS
  - Cloudwatch
  - AWS RDS
  - Postgres
  - AWS RDS Metrics
  - Amazon Data Firehose
  - Kinesis
  - OpenTelemetry
  - Metrics
---
Monitoring AWS RDS metrics is critical for ensuring the reliability, performance, and scalability of your database systems, especially when managing multiple AWS accounts with multiple RDS instances. This guide walks you through the end-to-end process of using AWS CloudWatch and OpenTelemetry (Otel) 1.0 to collect, stream, and visualize RDS metrics efficiently.

## Why Monitor AWS RDS Metrics?

RDS metrics provide essential insights into your database health and performance, enabling you to:

* **Optimize Resource Utilization**: Monitor CPU, memory, and storage usage to prevent bottlenecks.  
* **Improve Query Performance**: Analyze read and write latencies to optimize database queries.  
* **Ensure Availability**: Track replication lag and connection counts to detect issues proactively.  
* **Centralize Observability**: Consolidate metrics from multiple AWS accounts into a single pane of glass for streamlined monitoring.

### Prerequisites

Before starting, ensure:

1. You have access to AWS CloudWatch.  
2. [Running OpenObserve Cluster](https://cloud.openobserve.ai/).  
3. Familiarity with AWS Kinesis is recommended.  

### Step 1: Configure Kinesis Data Stream

CloudWatch streams metrics via Kinesis, which acts as a transport mechanism. Follow these steps:

1. **Create a Kinesis Data Stream:**  
   * Navigate to **Kinesis \> Data Streams** in the AWS Management Console.  
   * Click **Create data stream** and name it appropriately (e.g., `RDSMetricsStream`).
   ![aws cloudwatch metrics](/img/blog/cloudwatch-metrics-aws-rds/kinesis_first.png)   

2. **Connect the Metric Stream to Kinesis:**  
   * In the metric stream configuration, select **Kinesis Data Stream** as the destination.  
   * Choose the stream you created.  
   ![aws cloudwatch metrics](/img/blog/cloudwatch-metrics-aws-rds/kinesis_second.png)

Refer to [this guide](https://openobserve.ai/docs/howto/ingest_cloudwatch_logs/) for detailed Kinesis configuration steps.

### Step 2: Create a Metric Stream

A metric stream in AWS CloudWatch allows you to stream selected metrics to a destination for analysis. Follow these steps:

1. **Log into the AWS Management Console.**  
2. Navigate to **CloudWatch \> Metric Streams**.  
3. Select **Custom setup with Firehose** 
![aws cloudwatch metrics](/img/blog/cloudwatch-metrics-aws-rds/rds_metrics_first.png)

### Step 3: Configure a Metric Stream

Select the metrics you want to stream:

1. Click on **Select Metrics.**  
2. Select **Include \> AWS/RDS**.  
3. Provide metric stream name
![aws cloudwatch metrics](/img/blog/cloudwatch-metrics-aws-rds/rds_metrics_second.png)

### Step 4: Verify the metrics in OpenObserve

Go to OpenObserve dashboard and select logs and search for the stream that you have created while providing HTTP endpoint in kinesis. 

Metrics are ingested as logs within OpenObserve in OpenTelemetry 1.0 format that will allow you to use SQL to create dashboards.

![aws cloudwatch metrics](/img/blog/cloudwatch-metrics-aws-rds/rds_metrics_logs.gif)


### Step 5: Import the Prebuilt RDS Monitoring Dashboard

To visualize the ingested metrics effectively, use the prebuilt RDS monitoring dashboard available in the [OpenObserve Dashboards repository](https://github.com/openobserve/dashboards/tree/main/AWS_Cloudwatch_RDS_Metrics):

1. **Download the RDS Monitoring Dashboard JSON:**  
   * Locate the JSON file for the RDS monitoring dashboard in the repository.  
2. **Import the Dashboard:**  
   * Navigate to your observability platform and import the JSON file.  
   * Verify that panels display metrics such as CPU usage, latency, throughput, and replication lag.
![aws cloudwatch metrics](/img/blog/cloudwatch-metrics-aws-rds/rds_metrics.gif)

### **Key Panels Included:**

* **CPU Utilization:** Monitor instance performance.  
* **Connection Trends:** Analyze active database connections.  
* **Disk Usage:** Track available and used storage.  
* **Query Performance:** Visualize latency and throughput.  
* **Error Analysis:** Identify and resolve database issues.

## **Conclusion**

| Feature/Aspect | With OpenObserve | Without OpenObserve |
| :---- | :---- | :---- |
| Centralized Monitoring | Multi-account and multi-region RDS instances can be monitored in a single dashboard. | Requires navigating through multiple AWS accounts and regions individually. |
| Custom Dashboards | Build tailored dashboards with real-time visualizations and alerts for RDS metrics. | Limited to pre-defined CloudWatch views with minimal customization options. |
| Unified Observability | Correlate RDS metrics with other system metrics in one platform. | No correlation between RDS metrics and other observability data sources. |
| Cost Efficiency | Optimize cost by ingesting only required metrics and storing them in OpenObserve. | Increased CloudWatch costs due to prolonged retention of all metrics. |
| Alerting and Automation | Set up advanced alerts and automated workflows based on RDS performance thresholds. | Limited alerting options with basic CloudWatch alarms. |
| Retention and Analysis | Long-term storage of metrics with advanced querying for historical analysis. | Metrics retention limited to CloudWatch retention policies (up to 15 months). |

By following these steps, you can set up an end-to-end monitoring solution for AWS RDS metrics using CloudWatch and OpenTelemetry. This approach ensures:

* **Proactive Database Monitoring:** Detect and resolve issues before they impact users.  
* **Centralized Observability:** Gain a unified view of RDS instances across accounts.  
* **Scalable Insights:** Monitor growing workloads efficiently.

Ready to optimize your database performance and simplify your observability workflows? [Visit our website](https://openobserve.ai/) to learn more details about how the platform works. 