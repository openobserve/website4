---
title: "Monitoring Apache Cassandra with OpenTelemetry: Metrics, Logs, and Dashboards"
seoTitle: "How to Monitor Apache Cassandra Using OpenTelemetry for Metrics and Logs"
description: Learn how to monitor Apache Cassandra using OpenTelemetry for collecting metrics and logs. This step-by-step guide covers JMX-based metrics collection, log ingestion and OpenTelemetry configuration for complete observability.
img: /img/blog/monitor-cassandra/cassandra_flow.gif
alt: how-to-monitor-cassandra
slug: how-to-monitor-cassandra
authors: 
  - chaitanya
publishDate: 2025-01-12
tags:
  - cassandra
  - apache
  - monitoring
  - openobserve
  - logs
  - metrics
  - java
---

## What is Apache Cassandra?
Apache Cassandra is a highly scalable, distributed NoSQL database designed to handle vast amounts of data across multiple nodes with high availability and fault tolerance. It is widely used for real-time applications requiring low-latency read and write operations.

Cassandra’s architecture follows a peer-to-peer distributed model, eliminating single points of failure. It is ideal for applications that demand high throughput and scalability, such as IoT, AI, and large-scale web applications.

## Why Monitor Cassandra?
Monitoring Cassandra is crucial for ensuring optimal performance, identifying bottlenecks, and troubleshooting issues before they impact users. Key reasons for monitoring Cassandra include:

- **Performance Optimization**: Monitor query latencies, node status, and resource utilization.
- **Fault Detection**: Identify failing nodes or partitions before they affect availability.
- **Capacity Planning**: Track disk usage, memory consumption, and CPU load.
- **Security Auditing**: Monitor logs for unauthorized access attempts and security breaches.
- **Troubleshooting**: Capture logs and metrics to diagnose issues in real time.

## Configuring Metrics and Logs Collection
To effectively monitor Cassandra, we will set up OpenTelemetry (OTel) to collect both metrics and logs. OpenTelemetry’s JMX receiver helps gather JVM and Cassandra-specific metrics, while file-based log collection ensures log visibility.

### Pre-requisites:

- A system running Ubuntu.
- Apache Cassandra installed on Ubuntu. Follow the official [Cassandra documentation](https://cassandra.apache.org/doc/stable/cassandra/getting_started/installing.html) for installation steps.

### Download OpenTelemetry JMX Metrics JAR
To collect Cassandra metrics via JMX, download the OpenTelemetry JMX Metrics JAR:
```sh
wget https://github.com/open-telemetry/opentelemetry-java-contrib/releases/download/v1.32.0/opentelemetry-jmx-metrics.jar -O /opt/opentelemetry-java-contrib-jmx-metrics.jar
```

### OpenTelemetry Collector Configuration
Create or update the OpenTelemetry configuration file (`/etc/otel-collector-config.yaml`) with the following settings:

You can visit this blog to install [otel](https://openobserve.ai/blog/how-to-monitor-airflow-with-otel#step-2-install-opentelemetry-collector).

```yaml
receivers:
  jmx:
    jar_path: /opt/opentelemetry-java-contrib-jmx-metrics.jar
    endpoint: localhost:9000
    target_system: cassandra,jvm
    collection_interval: 60s
  filelog/std:
    include:
      - /var/log/cassandra/*.log
    start_at: beginning
  otlp:
    protocols:
      grpc:
      http:
processors:
  resourcedetection:
    detectors: ["system"]
    system:
      hostname_sources: ["os"]
  batch:
extensions:
  zpages: {}
exporters:
  otlphttp/openobserve:
    endpoint: https://example.com/api/default/  # add these configurations from O2 data source section
    headers:
      Authorization: "Basic gregrgregrtgrg=="  # add these configurations from O2 data source section
      stream-name: blog_cassandra
service:
  pipelines:
    metrics:
      receivers: [jmx]
      processors: [resourcedetection, batch]
      exporters: [otlphttp/openobserve]
    logs:
      receivers: [filelog/std, otlp]
      processors: [batch]
      exporters: [otlphttp/openobserve]
```

This configuration does the following:

- You can find auth details by following [these steps](https://openobserve.ai/blog/how-to-monitor-aerospike-database#installation-of-opentelemetry-collector-contrib)
- Captures logs from `/var/log/cassandra`.  
- Collects logs and metrics using the `otlp` receiver.  
- Sends data to OpenObserve with a custom **stream name** (`blog_cassandra`).  

### Configure JMX Remote Access in Cassandra
Modify the Cassandra environment file (`/etc/cassandra/cassandra-env.sh`) to enable JMX monitoring:

```sh
JVM_OPTS="$JVM_OPTS -Dcom.sun.management.jmxremote.port=9000"
JVM_OPTS="$JVM_OPTS -Dcom.sun.management.jmxremote.rmi.port=9000"
JVM_OPTS="$JVM_OPTS -Dcom.sun.management.jmxremote.authenticate=false"
JVM_OPTS="$JVM_OPTS -Dcom.sun.management.jmxremote.ssl=false"
```

### Restart Services
After making these changes, restart Cassandra and the OpenTelemetry Collector to apply the configurations:
```sh
systemctl restart cassandra
systemctl restart otel-collector
```

## Cassandra Dashboards
Now that you have configured everything, you can visualize collected logs and metrics, we can build these dashboards for the below:
- Node health and status
- Read/write latency
- Disk, CPU, and memory utilization
- Query performance trends
- Log error analysis

![cassandra](/img/blog/monitor-cassandra/cassandra_dashboards.gif)

## Conclusion
By integrating OpenTelemetry with Cassandra, you gain deep insights into system health, performance, and security. This guide covers everything from setting up JMX monitoring to log collection, ensuring your Cassandra clusters remain optimized and reliable. With the right monitoring strategy, you can proactively detect and resolve issues before they impact business operations.

Start monitoring your Cassandra clusters today and unlock the full potential of observability with OpenTelemetry and OpenObserve!

> #### Get Started with OpenObserve Today!
> Sign up for a free trial of OpenObserve on our [website](https://openobserve.ai/).
>Check out our [GitHub repository](https://github.com/openobserve) for self-hosting and contribution opportunities.