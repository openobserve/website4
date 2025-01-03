---
title: "Monitor Your MongoDB Metrics with OpenTelemetry and OpenObserve"
seoTitle: Monitor Your MongoDB Database Metrics
description: Discover how to effectively monitor MongoDB Metrics using the OpenTelemetry Collector. Enhance performance and reliability with our comprehensive guide.
img: /img/blog/mongodb/image3.png
alt: OpenObserve
slug: monitor-mongodb-metrics-otel
authors:  
  - manas
publishDate: 2025-01-03
tags:
  - database
  - opentelemetry 
  - monitoring
  - metrics
  - mongoDB 
---

Are you looking to enhance your MongoDB monitoring capabilities without the complexity of juggling multiple tools? In this blog post, we’ll guide you through the process of using OpenTelemetry and OpenObserve to effectively monitor your MongoDB metrics. By leveraging the MongoDB receiver of the OpenTelemetry Collector, you can collect metrics, build insightful dashboards, and generate alerts to ensure optimal performance.

## A Brief Overview of MongoDB

MongoDB is a popular NoSQL database known for its flexibility, scalability, and high performance. It stores data in a document-oriented format, which makes it ideal for handling unstructured data. With features like horizontal scaling through sharding and robust replication capabilities, MongoDB is widely used in modern applications that require high throughput and quick data access.

Whether you're building applications for real-time analytics, content management, or Internet of Things (IoT) solutions, monitoring MongoDB is crucial to ensure optimal performance and resource utilization.

## How Do We Monitor MongoDB Metrics?

To effectively monitor MongoDB, we will utilize the **OpenTelemetry Collector** with the MongoDB receiver. This setup allows us to collect metrics from MongoDB instances and push them to OpenObserve, enabling us to visualize performance data and respond proactively to issues.

## MongoDB Receiver

The MongoDB receiver fetches stats from a MongoDB instance using the Golang Mongo driver. Stats are collected via MongoDB's `dbStats` and `serverStatus` commands. The purpose of this receiver is to allow users to monitor metrics from standalone MongoDB clusters, including non-Atlas managed MongoDB servers.

Configuration:

- **hosts** (default: `[localhost:27017]`): List of host:port or Unix domain socket endpoints.
  - For standalone MongoDB deployments, this is the hostname and port of the `mongod` instance.
  - For replica sets, specify the hostnames and ports of the `mongod` instances in the replica set configuration. If the `replica_set` field is specified, nodes will be autodiscovered.
  - For a sharded MongoDB deployment, specify a list of the `mongos` hosts.
  
- **username**: If authentication is required, the user with `clusterMonitor` permissions can be provided here.
- **password**: If authentication is required, the password can be provided here.
- **collection_interval** (default: `1m`): The interval at which metrics are collected. This value must be a string readable by Golang's `time.ParseDuration`. Valid time units are ns, us (or µs), ms, s, m, h.
- **initial_delay** (default: `1s`): Defines how long this receiver waits before starting.
- **replica_set**: If the deployment of MongoDB is a replica set, this allows users to specify the replica set name for autodiscovery of other nodes.
- **timeout** (default: `1m`): The timeout for running commands against MongoDB.
- **tls**: Controls TLS settings. By default, insecure settings are rejected, and certificate verification is enabled.
- **direct_connection**: If true, the driver will not attempt to autodiscover other nodes and will connect directly to the specified host.


Here’s a sample configuration for the MongoDB receiver:

```yaml
receivers:
  mongodb:
    hosts:
      - endpoint: localhost:27017
    username: otel
    password: password123
    collection_interval: 60s
    initial_delay: 1s
    tls:
      insecure: true
      insecure_skip_verify: true

```
## Getting Started

### Prerequisites

Before diving into the setup, ensure you have the following:

1. **A Running MongoDB Instance**: Make sure you have MongoDB installed and running. If you’re running it locally, it should be accessible at `localhost:27017`. You can verify all the MongoDB components are running too, see screenshot below for reference.

> *Note: The MongoDB receiver supports versions 4.0 and above, including 5.0, 6.0, and 7.0*.

![image](/img/blog/mongodb/image8.png)

2. **Basic Understanding of OpenTelemetry**: Familiarity with OpenTelemetry concepts will help you navigate the setup.

3. **An Operational OpenObserve Instance**: Ensure you have OpenObserve installed and running to visualize your metrics.

### Step 2: Install the OpenTelemetry Collector

Next, we need to install the OpenTelemetry Collector. 

> *NOTE: The default Otel Collector doesn't have all the receivers, including the MongoDB one we are going to use to collect data from the DB. It has support for receivers like Kafka, Prometheus, Jaeger, etc. So, instead of using [opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector), we are going to use [opentelemetry-collector-contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib).*

1. Visit the [OpenTelemetry Collector Contrib Releases](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases) page.

2. Download the latest release for your machine. You can use the following command in your terminal to download the Otel-Collector for macOS, replacing `v0.115.1` with the latest version number:

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

![image](/img/blog/mongodb/image4.png)

### Step 3: Configure the OpenTelemetry Collector

Receivers in the OpenTelemetry Collector are responsible for collecting telemetry data from various sources. They act as the entry point for data into the collector, allowing it to gather metrics, logs, and traces from different systems. Each receiver is designed to handle specific types of data and protocols.



Next, you’ll need to create a configuration file named `config.yaml`. This file defines how the Collector will behave, including what data it will receive, how it will process that data, and where it will send it.

```yaml
receivers:
  mongodb:
    hosts:
      - endpoint: localhost:27017
    username: otel
    password: password123
    collection_interval: 60s
    initial_delay: 1s
    tls:
      insecure: true
      insecure_skip_verify: true
processors:
  batch:
    send_batch_size: 10000
    timeout: 10s

exporters:
  otlphttp/openobserve:
    endpoint: YOUR_API_ENDPOINT
    headers:
      Authorization: Basic YOUR_AUTH_TOKEN
      stream-name: default

service:
  pipelines:
    metrics:
      receivers: [mongodb]
      processors: [batch]
      exporters: [otlphttp/openobserve]
```

#### Breakdown of the Configuration:

- **Receivers:** The `MongoDB receiver` collects metrics from your MongoDB instance. Ensure the hosts, username, and password match your MongoDB configuration.
  
- **Processors**: The `batch` processors help manage and optimize data flow to exporters.

- **Exporters**: The `otlphttp/openobserve` exporter sends the collected telemetry data to OpenObserve. Replace `YOUR_API_ENDPOINT` and `YOUR_AUTH_TOKEN` with your actual OpenObserve API endpoint and authentication token, which you can find in your **Data Sources** -> **Custom** - > **Metrics** -> **Otel Collector**

![image](/img/blog/mongodb/image5.png)

### Step 4: Run the OpenTelemetry Collector

To run the OpenTelemetry Collector with the specified configuration, execute the following command in your terminal:

```bash
otelcol-contrib --config /path/to/your/config.yaml
```
*Replace `/path/to/your/config.yaml` with the actual path to your configuration file.*

You will get an output like the screenshot below:

![image](/img/blog/mongodb/image2.png)

### Step 5: Visualize Your Data in OpenObserve

Once your setup is complete, navigate to the OpenObserve dashboard. Click on the **Streams** button in the sidebar to view the collected data streams.

- ![image](/img/blog/mongodb/image6.png)


- ![image](/img/blog/mongodb/image7.png)

- ![image](/img/blog/mongodb/image1.png)

You can download the dashboards [here](https://github.com/openobserve/dashboards).


### Step 6: Troubleshooting Connection Issues

If you encounter connection issues during setup, consider the following:

1. **Check MongoDB Configuration**: Ensure that your MongoDB instance is configured correctly, especially regarding authentication settings. Verify that the correct username and password are being used.

2. **Network Settings**: Ensure that your network settings allow traffic on the MongoDB port (default is 27017). Check for any firewall rules that might be blocking the connection.

3. **TLS Configuration**: If you're using TLS for secure connections, make sure to specify the necessary TLS parameters in your configuration.

## Conclusion

Congratulations! You’ve successfully set up a MongoDB metrics monitoring system using OpenTelemetry and OpenObserve. This powerful combination allows you to gain valuable insights into your MongoDB performance, enabling you to make informed decisions to optimize your applications.

For a complete list of metrics collected by the MongoDB receiver, refer to the [OpenTelemetry MongoDB Receiver Documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mongodbreceiver).

> Sign up for a free account of [OpenObserve cloud](https://auth1.openobserve.ai/ui/login/login?authRequestID=293082805590667592)(200 GB free ingestion per month) Want to self-host or contribute? Check out our [GitHub repository](https://github.com/openobserve/openobserve) to explore self-hosting options and help grow the community.

Happy monitoring! 🚀