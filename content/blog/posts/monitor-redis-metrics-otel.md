---
title: "Monitor Your Redis Metrics with Opentelemetry and OpenObserve"
seoTitle:  Monitor Your Redis Metrics with OpenTelemetry 
description: Discover how to effectively monitor Redis Metrics using the OpenTelemetry Collector. Enhance performance and reliability with our comprehensive guide.
img: /img/blog/redis/image3.png
alt: OpenObserve
slug: monitor-redis-metrics-otel
authors:  
  - manas
publishDate: 2024-12-19
tags:
  - database
  - opentelemetry 
  - monitoring
  - metrics
  - redis
---

Are you looking to enhance your Redis database monitoring without the hassle of managing multiple tools? In this blog post, we’ll walk you through the process of using **OpenTelemetry** and **OpenObserve** to effectively monitor your **Redis Metrics**. By leveraging the Redis receiver of the OpenTelemetry Collector, you can easily scrape metrics and gain valuable insights into your database's health and performance

## What is Redis?

Redis is a powerful in-memory data structure store, often used as a **database, cache, and message broker**. It excels in performance, resilience, scalability, and durability, making it a staple in modern distributed IT infrastructures. Redis supports various data structures, including strings, hashes, lists, sets, and more, allowing developers to build applications with diverse data handling needs. 

Whether you are building for the cloud or on-premise, Redis is widely utilized for:

- **Caching**: Speeding up data retrieval to reduce latency.
- **Session Management**: Storing user sessions for quick access.
- **Real-Time Data Streaming**: Handling data in real-time for applications like chat systems and gaming.

## How Does the Redis Receiver Work?

The **Redis receiver** in the OpenTelemetry Collector is designed to retrieve performance metrics from a Redis instance by using the Redis `INFO` command. This command returns a wealth of information and statistics about the Redis server, which the receiver extracts and converts into OpenTelemetry metrics.

### Sample Configuration

Here’s a sample configuration for the Redis receiver:

```yaml
receivers:
  redis:
    endpoint: "localhost:6379"
    collection_interval: 10s
    password: ${env:REDIS_PASSWORD}
```

In this configuration:

- **endpoint**: Specifies the Redis server's hostname and port.
- **collection_interval**: Defines how often the receiver queries Redis for metrics.
- **password**: Optionally provides a password for authentication.

## Redis Metrics

The Redis receiver collects various metrics that provide insights into the performance and health of your Redis instance. These metrics can be broadly categorized into memory metrics and operational metrics.

### 1. Memory Metrics from the Redis INFO Command

The `INFO` command in Redis provides detailed statistics about memory usage, which are critical for detecting issues and optimizing throughput. Key memory-related metrics include:

- **mem_allocator**: The memory allocator chosen while compiling the Redis core.
- **used_memory**: Total memory allocated by Redis.
- **used_memory_startup**: Memory used at startup.
- **used_memory_peak**: Peak memory usage since startup.
- **total_system_memory**: Total memory available to the Redis host.
- **used_memory_lua**: Memory used by the Lua engine.
- **mem_clients_slaves**: Memory used by replica clients.
- **mem_clients_normal**: Memory used by normal clients.

These metrics help you understand how Redis is utilizing memory resources and can indicate potential performance issues.

### 2. Metrics Collected by the Redis Receiver

The Redis receiver extracts various operational metrics from the `INFO` command output, The following metrics are emitted by default. Each of them can be disabled by applying the following configuration:

```yaml
metrics:
  <metric_name>:
    enabled: false
```

- **redis.clients.blocked**: Number of clients pending on a blocking call.
- **redis.clients.connected**: Number of active client connections.
- **redis.commands.processed**: Total number of commands processed by the server.
- **redis.uptime**: Number of seconds since the Redis server started.
- **redis.memory.used**: Total number of bytes allocated by Redis.

These metrics provide insights into the operational efficiency of your Redis instance, allowing you to monitor performance trends and detect anomalies. Find the complete list of default metrics [here](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/redisreceiver/documentation.md).

## Getting Started

### Prerequisites

Before we dive into the tutorial, ensure you have the following:

- **A running Redis instance**: Make sure your Redis server is up and accessible.
- **Basic understanding of OpenTelemetry**: Familiarity with OpenTelemetry concepts will help you navigate the setup.
- **An operational OpenObserve instance**: Ensure you have OpenObserve installed and running to visualize your metrics.

With these prerequisites in place, you’re ready to start monitoring your Redis performance!

### Step 1: Prepare Your Redis Environment

Make sure your Redis server is up and running. If you are running it locally, it should be accessible at `localhost:6379`. 

To enhance security, consider setting up a password for your Redis instance. You can do this by modifying the `redis.conf` file, Add the following line. The location of this file can vary, but it is typically found in the Redis data directory. :

```
requirepass yourpassword
```

Replace `yourpassword` with a strong password of your choice. After making this change, restart your Redis server for the new configuration to take effect.

![image](/img/blog/redis/image2.png)

### Step 2: Install the OpenTelemetry Collector

Next, we need to install the OpenTelemetry Collector. 

> *NOTE: The default Otel Collector doesn't have all the receivers, including the Redis one we are going to use to collect metrics from the DB. It has support for receivers like Kafka, Prometheus, Jaeger, etc. So, instead of using [opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector), we are going to use [opentelemetry-collector-contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib).*

1. Visit the [OpenTelemetry Collector Contrib Releases](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases) page.

2. Download the latest release for your machine. You can use the following command in your terminal, replacing `v0.115.1` with the latest version number:

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
![image](/img/blog/redis/image6.png)

### Step 3: Configure the OpenTelemetry Collector

Receivers in the OpenTelemetry Collector are responsible for collecting telemetry data from various sources. They act as the entry point for data into the collector, allowing it to gather metrics, logs, and traces from different systems. Each receiver is designed to handle specific types of data and protocols.

Next, you’ll need to create a configuration file named `config.yaml`. This file defines how the Collector will behave, including what data it will receive, how it will process that data, and where it will send it.


```yaml
receivers:
  redis:
    endpoint: "localhost:6379"
    collection_interval: 10s
    password: ${env:REDIS_PASSWORD}

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
      receivers: [redis]
      processors: [batch]
      exporters: [otlphttp/openobserve]

```

#### Breakdown of the Configuration:

- **Receivers**: The `redis` receiver collects metrics from your Redis instance. Ensure the endpoint and password match your Redis configuration.
  
- **Processors**: The `batch` processors help manage and optimize data flow to exporters.

- **Exporters**: The `otlphttp/openobserve` exporter sends the collected telemetry data to OpenObserve. Replace YOUR_API_ENDPOINT and YOUR_AUTH_TOKEN with your actual OpenObserve API endpoint and authentication token, which you can find in your **Data Sources** -> **Custom** - > **Metrics** -> **Otel Collector**

![image](/img/blog/redis/image7.png)


### Step 4: Run the OpenTelemetry Collector

To run the OpenTelemetry Collector with the specified configuration, execute the following command in your terminal:

```bash
otelcol-contrib --config /path/to/your/config.yaml
```
*Replace `/path/to/your/config.yaml` with the actual path to your configuration file.*

You will get a Output similar to this Screenshot

![image](/img/blog/redis/image1.png)

### Step 5: Visualize Your Data in OpenObserve

Once your setup is complete, navigate to the OpenObserve dashboard. Click on the "Streams" button in the sidebar to view the collected data streams.

- ![image](/img/blog/redis/image4.png)

- ![image](/img/blog/redis/image5.png)

#### Monitoring Redis instance with Openobserve dashboards

To create a new dashboard, click on the **Dashboard** button and select **New Dashboard**. Give it an appropriate name and description.

![image](/img/blog/redis/image8.png)

You can download the dashboards [here](https://github.com/openobserve/dashboards).


### Step 6: Troubleshooting Connection Issues

If you encounter connection issues while setting up your Redis monitoring, follow these steps:

1. **Check Redis Configuration**: Ensure that your Redis instance is configured correctly, especially regarding authentication settings. Verify that the correct password (if required) is being used.

2. **TLS Configuration**: If you're using TLS for secure connections, make sure to specify the necessary TLS parameters in your configuration. Here’s an example configuration snippet:

```yaml
  tls:
     insecure: false
     ca_file: /path/to/ca.crt
     cert_file: /path/to/client.crt
     key_file: /path/to/client.key
```

3. **Firewall and Network Settings**: Ensure that your network settings allow traffic on the Redis port (default is 6379). Check for any firewall rules that might be blocking the connection.

### Conclusion

Congratulations! You’ve successfully set up a redis metrics monitoring system using OpenTelemetry and OpenObserve. This powerful combination allows you to gain valuable insights into your Redis performance, enabling you to make informed decisions to optimize your applications.

Happy monitoring! 🚀

> Sign up for a free trial of [OpenObserve](https://auth1.openobserve.ai/ui/login/login?authRequestID=293082805590667592). Want to self-host or contribute? Check out our [GitHub repository](https://github.com/openobserve/openobserve) to explore self-hosting options and help grow the community.


