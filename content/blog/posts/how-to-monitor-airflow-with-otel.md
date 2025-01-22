---
title: "How to Monitor Apache Airflow Logs and Metrics Using OpenTelemetry"
seoTitle: "Monitor Apache Airflow with OpenTelemetry: Logs, Metrics & Dashboards"
description: Learn how to monitor Apache Airflow logs, metrics, and traces using OpenTelemetry and OpenObserve. Set up Airflow logging, configure OpenTelemetry, and visualize insights with pre-built dashboards.
img: /img/blog/apache-airflow/airflow_flow.gif
alt: how-to-monitor-airflow-with-otel
slug: how-to-monitor-airflow-with-otel
authors: 
  - chaitanya
publishDate: 2025-01-22
tags:
  - apache
  - airflow
  - data
  - etl
  - opentelemetry
  - dags
  - openobserve
---

Apache Airflow is a powerful workflow automation tool used for orchestrating complex data pipelines. It enables users to define, schedule, and monitor workflows as directed acyclic graphs (DAGs). However, monitoring Airflow logs and metrics is crucial to ensure the reliability and performance of workflows.

In this guide, we will explore how to monitor Airflow logs and metrics using OpenTelemetry (OTel) and OpenObserve. We will configure Airflow to emit telemetry data, install the OpenTelemetry Collector, and visualize logs and metrics in OpenObserve.

## What is Apache Airflow and Why is it Used?

Apache Airflow is an open-source workflow automation tool that allows users to:
- Define workflows as code using Python.
- Schedule, monitor, and manage task execution.
- Automate ETL (Extract, Transform, Load) processes, machine learning pipelines, and data processing workflows.
- Integrate with a variety of services like AWS, GCP, databases, and messaging systems.

### Key Benefits of Airflow
- Extensible and modular architecture.  
- Task dependencies and retries are automatically managed.  
- Supports parallel execution and scaling.  
- Rich UI for monitoring and debugging workflows.  

![airflow](/img/blog/apache-airflow/airflow.gif)

## How to Monitor Airflow Logs and Metrics?

Monitoring Apache Airflow involves collecting:
- **Logs**: Capturing Airflow logs from different components such as the scheduler, workers, and DAG execution.
- **Metrics**: Gathering telemetry data such as task execution times, DAG runs, queue latencies, and resource utilization.

To achieve this, we configure Airflow to send logs and metrics to an OpenTelemetry (OTel) collector, which forwards them to OpenObserve for visualization.

## Step 1: Configure `airflow.cfg` for OpenTelemetry

Edit the `airflow.cfg` file to enable OpenTelemetry for Airflow metrics.

```ini
[metrics]
otel_on = True
otel_host = localhost
otel_port = 4318
```

This ensures that Airflow emits OpenTelemetry metrics to an OpenTelemetry Collector running on `localhost:4318`.

Restart Airflow services after making these changes:

```bash
airflow db migrate
airflow scheduler -D
airflow webserver -D
```

## Step 2: Install OpenTelemetry Collector

The OpenTelemetry Collector is responsible for receiving logs and metrics from Airflow and forwarding them to OpenObserve.

### Install OpenTelemetry Collector
```bash
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest/download/otelcol-linux-amd64
chmod +x otelcol-linux-amd64
sudo mv otelcol-linux-amd64 /usr/local/bin/otelcol
```

Verify the installation:
```bash
otelcol --version
```

## Step 3: Configure OpenTelemetry Collector for Airflow

Create an OpenTelemetry Collector configuration file `otel-config.yaml`:

```yaml
receivers:
  filelog/std:
    include:
      - /airflow/logs/*/*.log                # change the path
      - /airflow/logs/scheduler/*/*/*/*.log  # change the path
    start_at: beginning
  otlp:
    protocols:
      grpc:
      http:
processors:
  batch:

extensions:
  zpages: {}

exporters:
  otlphttp/openobserve:
    endpoint: https://example.com/api/default/ # add these configurations from O2 data source section
    headers:
      Authorization: "Basic cdcfefgqg=" # add these configurations from O2 data source section
      stream-name: blog_airflow # you can set this anything

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlphttp/openobserve]
    logs:
      receivers: [filelog/std, otlp]
      processors: [batch]
      exporters: [otlphttp/openobserve]
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlphttp/openobserve]
```

This configuration does the following:

- You can find auth details by following [these steps](https://openobserve.ai/blog/how-to-monitor-aerospike-database#installation-of-opentelemetry-collector-contrib)
- Captures logs from `/airflow/logs/` and `/airflow/logs/scheduler/`.  
- Collects logs, metrics, and traces using the `otlp` receiver.  
- Sends data to OpenObserve with a custom **stream name** (`blog_airflow`).  

Start the OpenTelemetry Collector with this configuration:

```bash
systemctl start otel-collector
```

To check if it's running:
```bash
systemctl status otel-collector
```

## Step 4: Logs Ingested from Airflow

Once the OpenTelemetry Collector is running, it starts ingesting logs from:
- DAG execution logs.
- Scheduler logs.
- Worker logs.
- Task execution logs.

To view logs in OpenObserve, navigate to the **logs section** and select blog_query:

![airflow](/img/blog/apache-airflow/logs.png)

## Step 5: Airflow Metrics Dashboards

Pre-built dashboards for Airflow are available at:
[OpenObserve Airflow Dashboards](https://github.com/openobserve/dashboards/tree/main/Airflow)

![airflow](/img/blog/apache-airflow/dashboard.gif)
These dashboards provide:
- DAG execution times.
- Task latency monitoring.
- Scheduler performance insights.
- Worker resource utilization.

To import a dashboard into OpenObserve:
1. Download the JSON file from the GitHub link.
2. Go to **OpenObserve > Dashboard > Import**.
3. Upload the JSON file and start visualizing your Airflow metrics.
![airflow](/img/blog/apache-airflow/import.gif)

## Conclusion

Monitoring Airflow logs and metrics is crucial for maintaining workflow health and debugging failures. By integrating OpenTelemetry and OpenObserve, you can:
- Collect **logs and metrics** from Airflow.  
- **Visualize Airflow performance** with dashboards.  
- Detect **issues in DAG execution** in real-time.  

This setup provides a **scalable observability solution** for Apache Airflow, ensuring efficient workflow automation and monitoring.

> #### Get Started with OpenObserve Today!
> Sign up for a free trial of OpenObserve on our [website](https://openobserve.ai/).
>Check out our [GitHub repository](https://github.com/openobserve) for self-hosting and contribution opportunities.