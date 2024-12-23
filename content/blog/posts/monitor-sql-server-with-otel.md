---
title: "Monitor Your SQL Server Performance with OpenTelemetry and OpenObserve"
seoTitle: Monitor Your SQL Server Performance with OpenTelemetry 
description:  Boost SQL Server performance with OpenTelemetry! Discover top monitoring techniques for seamless database management and enhanced efficiency today
img: /img/blog/sqlserver/title.png
alt: OpenObserve
slug: monitor-sql-server-with-otel
authors:  
  - manas
publishDate: 2024-12-23
tags:
  - database
  - opentelemetry 
  - monitoring
  - metrics
  - sqlserver
---

Are you ready to take your SQL Server monitoring to the next level? In this blog, we’ll explore how to leverage OpenTelemetry and OpenObserve to effectively monitor your **Microsoft SQL Server instance**. By utilizing the **SQL Server receiver** of the OpenTelemetry Collector, you can seamlessly scrape metrics and gain insights into the performance and health of your database.

## Introduction to SQL Server

Microsoft SQL Server is a robust relational database management system that supports a wide range of data storage and retrieval needs. Known for its reliability, scalability, and security features, SQL Server is widely used in enterprise environments. Whether you’re managing transactional data, analytics, or reporting, monitoring your SQL Server instance is crucial for maintaining optimal performance.

To get started, check out our detailed YouTube tutorial that covers:

- Configuring the **SQL Server receiver** in the OpenTelemetry Collector
- Capturing metrics via **Windows Performance Counters or direct SQL queries**
- Setting up the OpenTelemetry Collector as a Windows service
- Importing and using pre-built **SQL Server dashboards** in OpenObserve
- Monitoring **key SQL Server metrics**, including batch requests, user connections, pages, locks, and transaction logs

<iframe width="560" height="315" src="https://www.youtube.com/embed/kjUvXQdL798?si=guA2AK3COvYJolIr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## How Does the SQL Server Receiver Work?

The SQL Server receiver in the OpenTelemetry Collector retrieves performance metrics by either utilizing **Windows Performance Counters** or **by directly connecting to the SQL Server instance** and executing queries. This flexibility allows you to monitor your database effectively, regardless of your deployment environment.

**Tip:** If you're using Windows, ensure that the SQL Server instance is configured to allow remote connections for the OpenTelemetry Collector to access it.

## Key Metrics to Monitor

When implementing SQL Server monitoring, consider focusing on the following key metrics:

- **Cache Hit Ratio**: Indicates how efficiently SQL Server is handling requests from memory. A lower ratio may suggest the need for increased memory allocation.
- **Transaction Write Rate**: Provides insights into the rate of transactions occurring in the database, highlighting potential bottlenecks.
- **User Connections**: Monitors the number of active user connections to the database.
- **Page Split Rates**: Tracks the frequency of page splits, which can negatively impact performance in clustered environments.
- **Lock Wait Rates**: Identifies blocking and deadlocking issues, crucial for maintaining transaction performance.
- **Log File Size and Growth**: Helps prevent space issues and provides insights into transaction volume.

## Getting Started

### Prerequisites

Before we begin, ensure you have:

- A running **SQL Server instance**: Make sure your SQL Server is accessible.
- Basic understanding of OpenTelemetry: Familiarity will aid in setup.
- An operational **OpenObserve instance**: Required for visualizing metrics.

**Important Note:** Ensure that your SQL Server instance is configured to allow the necessary permissions for the user account you will use for monitoring.

### Step 1: Prepare Your SQL Server Environment

Ensure your SQL Server instance is running and accessible. If you're using a named instance, you’ll need to specify the instance name in your configuration. 

**Tip:** Use SQL Server Management Studio (SSMS) to verify that your SQL Server instance is running and to check the connection settings.


### Step 2: Install the OpenTelemetry Collector

Next, we need to install the OpenTelemetry Collector. 
> *NOTE: The default Otel Collector doesn't have all the receivers, including the SQL receiver one we are going to use to collect data from the DB. It has support for receivers like Kafka, Prometheus, Jaeger, etc. So, instead of using [opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector), we are going to use [opentelemetry-collector-contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib).*

1. Visit the [OpenTelemetry Collector Contrib Releases](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases) page.

2. Download the latest release for your machine. You can use the following command in your terminal, replacing `X.Y.Z` with the latest version number:

```bash
curl --proto '=https' --tlsv1.2 -fOL https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.115.1/otelcol-contrib_0.115.1_darwin_arm64.tar.gz
```

3. Unzip the downloaded file:

```bash
tar -xvf otelcol-contrib_0.115.1_darwin_arm64.tar.gz
```

4. Move the binary to a directory in your PATH (e.g., /usr/local/bin):
```bash
sudo mv otelcol-contrib /usr/local/bin/
```
5. After installation, check the status of the OpenTelemetry Collector:

```bash
otelcol-contrib --version
```
![image](/img/blog/sqlserver/image6.png)

### Step 3: Configure the OpenTelemetry Collector

Receivers in the OpenTelemetry Collector are responsible for collecting telemetry data from various sources. They act as the entry point for data into the collector, allowing it to gather metrics, logs, and traces from different systems. Each receiver is designed to handle specific types of data and protocols.


Next, you’ll need to create a configuration file named `config.yaml`. This file defines how the Collector will behave, including what data it will receive, how it will process that data, and where it will send it.


```yaml
receivers:
  sqlserver:
        collection_interval: 10s
        resource_attributes:
          sqlserver.computer.name:
            enabled: true
          sqlserver.instance.name:
            enabled: true
  sqlserver/1:
        collection_interval: 5s
        username: otel
        password: securepassword
        server: 0.0.0.0
        port: 1433

processors:
  batch:
    send_batch_size: 10000
    send_batch_max_size: 11000
    timeout: 10s

exporters:
  otlphttp/openobserve:
    endpoint: http://localhost:5080/api/default
    headers:
      Authorization: Basic YOUR_AUTH_TOKEN
      stream-name: default

service:
  pipelines:
    metrics:
      receivers: [sqlserver/1]
      processors: [batch]
      exporters: [otlphttp/openobserve]

```

#### Breakdown of the Configuration:

- **Receivers:** The SQL Server receiver collects metrics from your SQL Server instance. Ensure the username, password, server, and port match your SQL Server configuration.
  
- **Processors**: The `batch` processors help manage and optimize data flow to exporters.

- **Exporters**: The `otlphttp/openobserve` exporter sends the collected telemetry data to OpenObserve. Replace YOUR_API_ENDPOINT and YOUR_AUTH_TOKEN with your actual OpenObserve API endpoint and authentication token, which you can find in your **Data Sources** -> **Custom** - > **Metrics** -> **Otel Collector**

![image](/img/blog/sqlserver/image7.png)

### Step 4: Run the OpenTelemetry Collector

To run the OpenTelemetry Collector with the specified configuration, execute the following command in your terminal:

```bash
otelcol-contrib --config /path/to/your/config.yaml
```
*Replace `/path/to/your/config.yaml` with the actual path to your configuration file.*

You will get a Output similar to this Screenshot

![image](/img/blog/sqlserver/image1.png)


### Step 5: Monitoring with Openobserve Dashboard

Once your setup is complete, navigate to the OpenObserve dashboard. Click on the "Streams" button in the sidebar to view the collected data streams.

![image](/img/blog/sqlserver/dashboard.png)

You can download the JSON for this SQL Server monitoring dashboard from [here](https://github.com/openobserve/dashboards). After downloading, import this dashboard into your O2 instance, and you'll have it up and running within 2 minutes. For detailed steps on importing a dashboard in Openobserve, refer to this [Dashboard blog](https://openobserve.ai/blog/monitoring-dashboards-with-openobserve#prebuilt-dashboards-for-openobserve).



## Step 6: Troubleshooting Connection Issues

If you encounter connection issues during setup, consider the following:

- **Check SQL Server Configuration:** Ensure the MySQL instance is configured correctly and that the user has the necessary privileges.
- **Firewall and Network Settings:** Verify that your network settings allow traffic on the SQL Server port (default is 1433).

## Conclusion

Congratulations! You’ve successfully set up a SQL Server metrics monitoring system using OpenTelemetry and OpenObserve. This powerful combination allows you to gain valuable insights into your SQL Server performance, enabling you to make informed decisions to optimize your applications.

Happy monitoring! 🚀

For more information and detailed documentation, check out the [OpenTelemetry SQL Server Receiver Documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/sqlserverreceiver) and the [OpenObserve Documentation](https://openobserve.com/docs).
