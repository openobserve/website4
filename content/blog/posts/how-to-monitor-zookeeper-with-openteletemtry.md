---
title: "End-to-End Guide: Configuring and Monitoring Zookeeper with OpenTelemetry Receiver"
seoTitle: "How to Configure and Monitor ZooKeeper with OpenTelemetry Receiver"
description: Learn how to set up and monitor ZooKeeper using the OpenTelemetry receiver in this comprehensive guide. Includes step-by-step instructions for installation, configuration, and metrics integration with OpenTelemetry for efficient ZooKeeper monitoring.
img: /img/blog/zookeeper-monitoring/zookeeper_flow.gif
alt: how-to-monitor-zookeeper-with-openteletemtry
slug: how-to-monitor-zookeeper-with-openteletemtry
authors: 
  - chaitanya
publishDate: 2024-12-24
tags:
  - apache
  - zookeeper
  - opentelemetry
  - openobserve
  - ubuntu
  - otel contrib
---

Apache Zookeeper is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and group services. Monitoring Zookeeper is critical to ensure its availability and performance. In this guide, we will install Zookeeper on Ubuntu, configure the OpenTelemetry (OTel) Contrib Receiver for Zookeeper metrics, and visualize the metrics in OpenObserve by creating meaningful dashboards.

## Why Monitor Zookeeper?

Monitoring Zookeeper is crucial for the following reasons:

* Ensure High Availability: Zookeeper plays a central role in distributed systems, and any downtime can disrupt dependent services.
* Track Performance Metrics: Monitoring CPU, memory, and connection metrics helps identify bottlenecks and optimize resource usage.
* Detect Anomalies: Observing trends and metrics enables early detection of issues like increased latency, excessive connections, or other failures.
* Audit Usage: Understanding the number of active clients and their interactions ensures proper resource allocation and usage.

### Prerequisites

* Ubuntu server (20.04 or later recommended)
* Basic understanding of Zookeeper

## Step 1: Installing Apache Zookeeper on Ubuntu

### Installation Steps

1. **Update the package index:**

```
sudo apt update && sudo apt upgrade -y
```

2. **Install Java:**

```
sudo apt install openjdk-11-jdk -y
```

3. Verify the Java installation:

```
java -version
```

4. **Download Zookeeper:**

```
wget https://dlcdn.apache.org/zookeeper/zookeeper-3.9.3/apache-zookeeper-3.9.3-bin.tar.gz
```

5. **Extract and move to the installation directory:**

```
tar -xvzf apache-zookeeper-3.9.3-bin.tar.gz
sudo mv apache-zookeeper-3.9.3-bin /usr/local/zookeeper
```

6. **Create a configuration file:** Navigate to the configuration directory and create `zoo.cfg`:

```
sudo touch /usr/local/zookeeper/conf/zoo.cfg
```

7. Add the following content:

```
tickTime=2000
dataDir=/opt/zookeeper/data
clientPort=2181
maxClientCnxns=60
4lw.commands.whitelist=mntr,ruok,conf,envi,stat
```

8. **Create the data directory:**

```
sudo mkdir -p /var/lib/zookeeper
```

9. **Start Zookeeper:**

```
/opt/zookeeper/bin/zkServer.sh start
```

10. **Verify it is running**:

```
/opt/zookeeper/bin/zkServer.sh status
```

## Step 2: Configuring OpenTelemetry Contrib Receiver for Zookeeper

### Installation Steps

1. **Install OpenTelemetry Collector:** Follow the official OpenTelemetry Collector installation guide:

```
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.116.1/otelcol-contrib_0.116.1_linux_amd64.deb
sudo dpkg -i otelcol-contrib_0.116.1_linux_amd64.deb
```

2. **Configure the Zookeeper Receiver:** Edit the Collector configuration file:

```
sudo vi /etc/otelcol-contrib/config.yaml
```

3. **Add the following configuration**:  
   
   Make sure to replace *OPENOBSERVE\_ENDPOINT, OPENOBSERVE\_TOKEN* and *OPENOBSERVE\_STREAM* with your platform's details that are found within OpenObserve data sources section.
  
   ![zookeeper dashboard](/img/blog/zookeeper-monitoring/data_source.jpeg)

```
receivers:
  zookeeper:
    endpoint: "localhost:2181"

exporters:
  otlphttp/openobserve:
    endpoint: OPENOBSERVE_ENDPOINT
    headers:
      Authorization: OPENOBSERVE_TOKEN
      stream-name: OPENOBSERVE_STREAM

service:
  pipelines:
    metrics:
      receivers: [zookeeper]
      exporters: [otlphttp/openobserve]
```

4. **Start the OpenTelemetry Collector:**

```
sudo systemctl start otelcol-contrib
```

5. **Check the service status:**

```
sudo systemctl status otelcol-contrib
```

6. **Verify the metrics in OpenObserve**

Go to OpenObserve dashboard -> metrics and search for zookeeper

![zookeeper dashboard](/img/blog/zookeeper-monitoring/zookeeper_metric_conf.png)

## Step 3: Building Dashboards in OpenObserve

### Steps to Create Dashboards

1. **Log in to OpenObserve:** Open your OpenObserve instance in a browser and log in.
2. **Create a new dashboard:** Navigate to the dashboards section and click "+ New Dashboard."  
3. To make it easy, we have a prebuilt zookeeper dashboard that should help you get started with the metrics monitoring which can be [found here](https://github.com/openobserve/dashboards).
![zookeeper dashboard](/img/blog/zookeeper-monitoring/zookeeper_dashboard.gif)

## Conclusion

By following this guide, you’ve successfully set up Apache Zookeeper on Ubuntu, configured the OpenTelemetry Contrib Receiver for metrics ingestion, and built insightful dashboards in OpenObserve. These steps provide a robust monitoring solution for your Zookeeper cluster, ensuring better observability and reliability.

For additional customizations, you can expand the dashboards to include latency, disk I/O, and other critical metrics using OpenTelemetry and [OpenObserve](https://openobserve.ai/).