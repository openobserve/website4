---
title: Connect with Otel-Collector Redis Receiver - Cloud Documentation
seoTitle: Connect with Otel-Collector Redis Receiver - Cloud Documentation
description: "The blog discusses otel-collector redis receiver's deployment,
  configuration, and metrics, such as memory used and commands processed for
  enhanced monitoring. "
img: /img/resources/otel-collector-redis-receiver-image1.png
alt: otel collector redis receiver
slug: otel-collector-redis-receiver-cloud-integration
authors:
  - openobserve-team
publishDate: 2024-06-29
tags:
  - otel collector redis receiver
  - Redis monitoring
  - cloud integration
  - telemetry data
  - OpenTelemetry metrics
---
<h2>Introduction</h2>

<p>
Are you looking to streamline your Cloud Monitoring? Your guide to connecting with the otel collector redis receiver is here. 
</p>
<h3><strong>What is Redis? </strong></h3>

<p>
Redis is an open-source, in-memory data store and messaging system designed for high-performance and high-availability applications. Through Redis, publishers send messages to channels, and subscribers receive messages from these channels.
</p>
<p>

![What is Redis?](/img/resources/otel-collector-redis-receiver-image2.png "What is Redis?")

</p>
<p>
<a href="https://www.datadoghq.com/dashboards/redis-dashboard/">Image Credit</a>
</p>
<p>
Check out on Youtube: <a href="https://www.youtube.com/watch?v=64VG179N4no&list=PLS1QulWo1RIYZZxQdap7Sd0ARKFI-XVsd">Redis Tutorial for Beginners</a>
</p>
<h3><strong>What is a Otel Collector Redis Receiver?</strong></h3>

<p>
The otel collector redis receiver is a component that subscribes to Redis channels and receives messages published to those channels. It is typically used in applications where multiple publishers send messages to a common channel, and multiple subscribers need to receive them.
</p>
<p>

![What is a Otel Collector Redis Receiver?](/img/resources/otel-collector-redis-receiver-image3.png "What is a Otel Collector Redis Receiver?")

</p>
<p>
<a href="https://help.sumologic.com/docs/integrations/databases/opentelemetry/redis-opentelemetry/">Image Credit</a>
</p>
<h3><strong>General Features</strong></h3>

<ul>

<li>The otel collector redis receiver captures Performance Metrics, Memory Metrics, and Activity Metrics from Redis instances. 

<li>The otel collector redis receiver collects these metrics by leveraging the INFO command in the Redis command-line interface.

<li>Further, the otel collector redis receiver is compatible with Kubernetes and Linux environments by supporting various Kubernetes distributions and Linux versions. 

<li>This ensures that Redis Enterprise Software can be deployed and managed effectively in these environments.

<li>Finally, the otel collector redis receiver supports Redis versions 2.8 and higher, providing enhanced performance, reliability, and security for Redis instances.
</li>
</ul>
<p>
In summary, the otel collector redis receiver is a component that subscribes to Redis channels and receives messages published to those channels. It is typically used when you need to monitor and analyze Redis performance.
</p>
<p>
<a href="https://www.youtube.com/@Redisinc">Check out Redis on Youtube</a>
</p>
<h2><strong>Metrics Captured</strong></h2>

<p>
The otel collector redis receiver helps with the following metrics by collecting data from Redis instances. Then, it converts it into OpenTelemetry metrics and sends it to the following consumer at a configurable interval.
</p>
<h3><strong>Memory Used</strong></h3>

<ul>

<li>The otel collector redis receiver monitors memory usage metrics like memory_used to track the amount of memory Redis allocates for data storage. 

<li>This metric is crucial for understanding memory consumption patterns and preventing issues like out-of-memory errors.
</li>
</ul>
<h3><strong>Commands Processed Per Second</strong></h3>

<ul>

<li>The otel collector redis receiver captures this metric to assess the system's responsiveness and optimize command processing.

<li>Monitoring the rate of commands processed per second provides insights into the workload and performance of the Redis instance.
</li>
</ul>
<h3><strong>Number of Connected Clients and Followers</strong></h3>

<ul>

<li>The otel collector redis receiver provides visibility into client connections, enabling administrators to manage client load and ensure smooth operation under varying client demands.

<li>Tracking the number of connected clients and followers helps understand the system's usage and capacity. 
</li>
</ul>
<h3><strong>Number of Blocked Clients</strong></h3>

<ul>

<li>The otel collector redis receiver captures this metric to troubleshoot client connection problems and optimize system responsiveness.

<li>Monitoring the number of blocked clients indicates potential performance issues or contention in the system. 
</li>
</ul>
<h3><strong>Number of Keys Stored per Database</strong></h3>

<ul>

<li>The otel collector redis receiver tracks this metric to manage data distribution effectively and ensure efficient key-value storage across databases.

<li>Measuring the number of keys stored per database offers insights into data distribution and storage patterns within Redis. 
</li>
</ul>
<h3><strong>Uptime</strong></h3>

<ul>

<li>The otel collector redis receiver monitors uptime to assess system stability and track performance trends.

<li>Uptime reflects the duration the Redis instance has been running without interruptions. 
</li>
</ul>
<h3><strong>Changes Since Last Save</strong></h3>

<ul>

<li>The otel collector redis receiver captures this metric to monitor data integrity by identifying changes that need to be persisted.

<li>Tracking changes since the last save provides data modifications and persistence status visibility. 
</li>
</ul>
<h3><strong>Replication Delay per Follower</strong></h3>

<ul>

<li>The otel collector redis receiver measures this metric to identify replication lag and ensure data consistency and availability across follower instances.

<li>Monitoring replication delay per follower helps assess data synchronization and consistency across replicas. 
</li>
</ul>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<h3><strong>Common Issues Faced When Capturing Metrics with Otel Collector Redis Receiver</strong></h3>

<p>
The following issues should be considered while capturing metrics with otel collector redis receiver.
</p>
<ul>

<li>Data Inconsistencies

<li>Missing Metrics

<li>Incorrect Metric Units

<li>Inadequate Configuration

<li>Redis Instance Configuration
</li>
</ul>
<p>
By capturing these metrics, you can optimize Redis configuration and ensure high availability and performance under varying workloads.
</p>
<p>
Next, you need to configure the otel collector redis receiver to send metrics to an observability tool like OpenObserve to gain deeper insights into Redis performance and identify areas for improvement.
</p>
<p>
OpenObserve allows you to export the collected Redis metrics to various backends, such as Google Cloud Ops.
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<p>
Are you a Developer?
</p>
<p>
<a href="https://github.com/openobserve/openobserve">Join OpenObserve on Github</a>
</p>
<p>
Check This Video on YouTube: <a href="https://www.youtube.com/watch?v=R4Y0TBrEAak">Integrating Redis and Python</a>
</p>
<h2><strong>Deployment</strong></h2>

<p>
The combination of Kubernetes and Linux provides a robust infrastructure for deploying, managing, and scaling the otel collector redis receiver. This ensures efficient monitoring and capturing of metrics from Redis instances.
</p>
<p>
Here are the steps to deploy the integration of otel collector redis receiver on Kubernetes and Linux:
</p>
<h3><strong>Kubernetes Deployment</strong></h3>

<ul>

<li>Create a new namespace in your Kubernetes cluster for the Redis Enterprise cluster (REC).

<li>Download the operator bundle containing the required images.

<li>Apply the operator bundle in the REC namespace to deploy the Redis Enterprise operator.

<li>Verify the operator is running by checking the deployment status.

<li>Create a Redis Enterprise cluster (REC) using the deployed operator.
</li>
</ul>
<h3><strong>Linux Deployment</strong></h3>

<ul>

<li>Install the OpenTelemetry Collector using the following command:
</li>
</ul>
<p>
            bash
</p>
<p>
            npm install --save @opentelemetry/opentelemetry-collector
</p>
<ul>

<li>Configure the OpenTelemetry Collector to collect Redis metrics by setting up the otel collector redis receiver and specifying the Redis server details.

<li>Configure the otel collector redis receiver in the OpenTelemetry Collector configuration file, specifying the Redis instance endpoint, username, password, and other optional settings like collection interval and TLS.

<li>Include the otel collector redis receiver in the metrics pipeline of the service section in the OpenTelemetry Collector configuration file.

<li>Start the OpenTelemetry Collector to begin collecting Redis metrics and sending them to the following consumer.
</li>
</ul>
<p>
By following these steps, you can deploy the integration of otel collector redis receiver on both Kubernetes and Linux environments to monitor Redis performance and collect valuable metrics for analysis and optimization.
</p>
<p>
The deployment of the otel collector redis receiver ensures that it is running and ready to collect metrics from Redis instances.
</p>
<p>
The otel collector redis receiver requires specific configuration settings to function correctly.
</p>
<p>
OpenObserve provides a simple installation process for the OpenTelemetry Collector, which includes the otel collector redis receiver. 
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<h3><strong>Configuration of the Otel Collector Redis Receiver</strong></h3>

<p>
The otel collector redis receiver's configuration involves specifying settings to retrieve Redis INFO data, build metrics, and send them to the next consumer. 
</p>
<p>
The otel collector redis receiver configuration can be customized based on specific requirements and environment setups.
</p>
<p>
OpenObserve provides a sample configuration for the otel collector redis receiver in the config.yaml file. You can customize this configuration to match your Redis instance settings.
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve </a>
</p>
<h2>Configuration Guidelines</h2>

<h3><strong>Include the Smart Agent receiver in the configuration file</strong></h3>

<p>
To include the otel collector redis receiver in the configuration file, specify the receiver in the receivers section of the configuration file. Here is an example:
</p>

<pre class="prettyprint">yaml
receivers:
  redis:
    endpoint: "localhost:16379"
    collection_interval: 10s
    password: ${env:REDIS_PASSWORD}</pre>

<h3><strong>Add the monitor type to the Collector configuration</strong></h3>

<p>
To add the otel collector redis receiver to the Collector configuration, you need to specify the monitor type in the monitors section of the configuration file. Here is an example:
</p>

<pre class="prettyprint">yaml
monitors:
  - type: redis
    endpoint: "localhost:6379"
    collection_interval: 10s
    password: ${env:REDIS_PASSWORD}</pre>

<h3><strong>Common Configuration Settings for Monitors</strong></h3>

<p>
Here are some common configuration settings for monitors:
</p>
<ul>

<li>Endpoint: The hostname and port of the Redis instance are separated by a colon. For example, localhost:6379.

<li>Collection Interval: The duration between runs of the receiver. For example, 10s.

<li>Password: The password used to access the Redis instance must match the password specified in the requirepass server configuration option. No default value.

<li>Transport: Defines the network to use for connecting to the server: tcp or unix. tcp by default.

<li>TLS Settings: If TLS is required, you can specify the CA file, cert file, and key file. For example:

<pre class="prettyprint">yaml
tls:
  insecure: true
  ca_file: /path/to/ca.crt
  cert_file: /path/to/cert.crt
  key_file: /path/to/key.key</pre>

</li>
</ul>
<p>
In summary
</p>
<ul>

<li>The otel collector redis receiver can be included in the configuration file by specifying the receiver in the receivers section. 

<li>The monitor type can be added to the Collector configuration by specifying the monitor type in the monitors section. 

<li>Common configuration settings include the endpoint, collection interval, password, transport, and TLS settings. 

<li>Additional configuration options include resource detection, exporters, and pipelines.
</li>
</ul>
<p>
The configuration guidelines provided are essential for ensuring the efficient and secure operation of the otel collector redis receiver.
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<h2>Example Configuration</h2>

<h3><strong>Configuration Snippet for the Redis Monitor</strong></h3>

<p>
Here's an example configuration snippet for the Redis monitor:
</p>

<pre class="prettyprint">yaml
receivers:
  redis:
    endpoint: "localhost:6379"
    collection_interval: 10s
    password: ${env:REDIS_PASSWORD}
    tls:
      insecure: true</pre>

<p>
In this example:
</p>
<ul>

<li>The receivers section specifies the otel collector redis receiver.

<li>The endpoint is set to "localhost:6379", the default Redis port on the local machine.

<li>The collection_interval is set to 10s, meaning the receiver will collect metrics every 10 seconds.

<li>The password is set using an environment variable ${env:REDIS_PASSWORD}.

<li>This allows the password to be stored securely outside the configuration file.

<li>The tls section is set to insecure: true, which disables TLS verification for the Redis connection. 

<li>In a production environment, you should use proper TLS certificates.
</li>
</ul>
<p>
This configuration snippet assumes that Redis is running on the local machine and is not password-protected. In a real-world scenario, you would need to adjust the endpoint and password settings to match your Redis instance configuration.
</p>
<h3><strong>Configuration Snippet for the Redis Monitor in the Collector Configuration</strong></h3>

<pre class="prettyprint">yaml
monitors:
  - type: redis
    endpoint: "localhost:6379"
    collection_interval: 10s
    password: ${env:REDIS_PASSWORD}
    tls:
      insecure: true</pre>

<p>
This configuration snippet is similar to the previous one but is placed in the monitors section of the Collector configuration file. The type is set to redis to specify the Redis monitor.
</p>
<p>
The rest of the configuration settings are the same as in the previous example.
</p>
<p>
This configuration snippet assumes that the Redis monitor is being used in the context of the OpenTelemetry Collector, which is a common way to deploy and configure the otel collector redis receiver.
</p>
<p>
Adjust the configuration settings to match your specific Redis instance and environment requirements.
</p>
<h2>Configuration Settings for Redis Integration</h2>

<p>
Configuration options refer to specific settings that can be adjusted to customize a system's or application's behavior or functionality. 
</p>
<h3><strong>Explanation of Configuration Options</strong></h3>

<p>
Here is a brief description of Configuration options:
</p>
<ul>

<li><strong>Host</strong>: The hostname or IP address of the Redis instance.

<li><strong>Port</strong>: The port number that Redis listens on (default: 6379).

<li><strong>PythonBinary</strong>: The path to the Python binary used for executing the otel collector redis receiver.

<li><strong>Name</strong>: The name of the otel collector redis receiver.

<li><strong>Auth</strong>: The password used to authenticate with the Redis instance.

<li><strong>SendListLengths</strong>: A configuration object that controls the sending of list lengths.

<li><strong>Verbose</strong>: A flag to enable verbose logging.
</li>
</ul>
<h3><strong>Details on 'sendListLengths' Configuration Object</strong></h3>

<p>
Here is a brief description of 'sendListLengths' Configuration Object
</p>
<ul>

<li><strong>SendListLengths</strong>: A configuration object that controls the sending of list lengths.

<li><strong>Enabled</strong>: A flag to enable or disable sending list lengths.

<li><strong>Interval</strong>: The interval at which list lengths are sent (in seconds).
</li>
</ul>
<p>
These configuration settings are used to integrate Redis with the otel collector redis receiver, allowing for the collection and processing of Redis metrics.
</p>
<h2>Monitoring List Lengths</h2>

<p>
Monitoring list lengths is essential for ensuring the reliability and scalability of Redis-based applications.
</p>
<h3><strong>How do you Specify the Key and Database Index for List Length Monitoring?</strong></h3>

<p>
To monitor the length of Redis list keys, you need to specify the key pattern and database index in the configuration using the following syntax:
</p>

<pre class="prettyprint">yaml
sendListLengths:
  - databaseIndex: $db_index
    keypattern: "$key_name"</pre>

<p>
Here's how to configure it:
</p>
<ul>

<li>Specify the database index where the list keys reside using the databaseIndex parameter. Replace $db_index with the actual database index number.

<li>Specify the key pattern to match the list keys you want to monitor using the keyPattern parameter. You can use a glob-style pattern with a single wildcard \\*. Surround the pattern with double quotes (") to ensure the \\* is interpreted correctly.
</li>
</ul>
<p>
For example, to monitor list keys in database index 0 that match the pattern queue_*, the configuration would be:
</p>

<pre class="prettyprint">yaml
sendListLengths:
  - databaseIndex: 0
    keyPattern: "queue_*"</pre>

<p>
This configuration will monitor the length of all Redis list keys in database 0 that start with queue_.
</p>
<p>
By configuring the database index and key pattern, you can effectively monitor the length of specific Redis list keys and gain insights into your Redis-based applications.
</p>
<h2>Available Metrics</h2>

<p>
These metrics are collected by the otel collector redis receiver integration.
</p>
<h3><strong>Gauge Metrics</strong></h3>

<ul>

<li>CPU

<ul><li>workload.googleapis.com/redis.cpu.time (cumulative, double, gce_instance)


</ul><li>Memory

<ul><li>workload.googleapis.com/redis.memory.fragmentation_ratio (gauge, double, gce_instance)
</li>
</ul>
</li>
</ul>
<ul>

<li>Connections

<ul><li>workload.googleapis.com/redis.clients.blocked (gauge, int64, gce_instance)

<li>workload.googleapis.com/redis.clients.connected (gauge, int64, gce_instance)

<li>workload.googleapis.com/redis.clients.max_input_buffer (gauge, int64, gce_instance)

<li>workload.googleapis.com/redis.clients.max_output_buffer (gauge, int64, gce_instance)
</li>
</ul>
</ul><h3><strong>Cumulative Metrics</strong></h3>

<ul>

<li>Commands

<ul><li>workload.googleapis.com/redis.commands.processed (cumulative, int64, gce_instance)


</ul><li>Connections

<ul><li>workload.googleapis.com/redis.connections.received (cumulative, int64, gce_instance)

<li>workload.googleapis.com/redis.connections.rejected (cumulative, int64, gce_instance)


</ul><li>Keys

<ul><li>workload.googleapis.com/redis.keys.evicted (cumulative, int64, gce_instance)

<li>workload.googleapis.com/redis.keys.expired (cumulative, int64, gce_instance)

<li>workload.googleapis.com/redis.keyspace.hits (cumulative, int64, gce_instance)

<li>workload.googleapis.com/redis.keyspace.misses (cumulative, int64, gce_instance)
</li>
</ul>
</li>
</ul>
</li>
</ul>
<ul>

<li>Replication

<ul><li>workload.googleapis.com/redis.latest_fork (cumulative, int64, gce_instance)
</li>
</ul>
</ul><h3><strong>Other Metrics</strong></h3>

<ul>

<li><strong>Redis INFO</strong>

<ul><li>workload.googleapis.com/redis.master_link_health_status (boolean, gce_instance)
</li>
</ul>
<p>
</ul>OpenObserve allows you to export the collected Redis metrics to various backends.
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<h2>Enhancing Monitoring Capabilities</h2>

<h3><strong>How to Add Additional Metrics?</strong></h3>

<p>
To add additional metrics to the otel collector redis receiver configuration, you can modify the metrics section of the configuration file. Here's an example of how to add a new metric:
</p>

<pre class="prettyprint">yaml
receivers:
  redis:
    endpoint: "localhost:6379"
    collection_interval: 60s
    metrics:
      - name: "redis.memory.fragmentation_ratio"
        description: "Ratio between used_memory_rss and used_memory"
        type: gauge
        unit: ratio
        value: memory.fragmentation_ratio</pre>

<p>
In the above example:
</p>
<ul>

<li>The metrics section is added under the otel collector redis receiver configuration.

<li>Each metric is defined as an object with the following fields:

<li>name: The name of the metric.

<li>description: A brief description of the metric.

<li>type: The type of the metric (e.g., gauge, counter).

<li>unit: The unit of measurement for the metric.

<li>value: The Redis command or property that provides the metric value.
</li>
</ul>
<p>
You can add multiple metrics by adding more objects to the metrics list.
</p>
<h3><strong>Notes on Metric Types and Categories</strong></h3>

<p>
The otel collector redis receiver supports the following metric types:
</p>
<ul>

<li>Gauge: Represents a single numerical value that can arbitrarily go up and down. Examples: redis.memory.used, redis.clients.connected.

<li>Counter: Represents a monotonically increasing numerical value. Examples: redis.commands.processed, redis.connections.received.
</li>
</ul>
<p>
The metrics can be categorized into the following groups:
</p>
<ul>

<li><strong>CPU</strong>: Metrics related to CPU usage, such as redis.cpu.time.

<li><strong>Memory</strong>: Metrics related to memory usage, such as redis.memory.used, redis.memory.fragmentation_ratio.

<li><strong>Clients</strong>: Metrics related to client connections, such as redis.clients.connected, redis.clients.blocked.

<li><strong>Keys</strong>: Metrics related to key management, such as redis.keys.expired, redis.keys.evicted.

<li><strong>Connections</strong>: Metrics related to incoming connections, such as redis.connections.received, redis.connections.rejected.

<li><strong>Commands</strong>: Metrics related to command processing, such as redis.commands.processed.
</li>
</ul>
<p>
By adding more metrics to the configuration and categorizing them appropriately, you can enhance the monitoring capabilities of the otel collector redis receiver and gain deeper insights into your Redis instances.
</p>
<p>
OpenObserve allows you to monitor Redis metrics in real-time, providing instant visibility into performance and usage. 
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<h2>Troubleshooting</h2>

<p>
Here are some guidelines for troubleshooting Redis command performance issues:
</p>
<h3><strong>Identify Slow Commands</strong></h3>

<ul>

<li>Use the SLOWLOG command to identify slow commands that are taking a long time to execute.

<li>Lower the slowlog-log-slower-than threshold using CONFIG SET to capture more slow commands.

<li>Avoid using KEYS commands, which scan the entire keyspace and can be slow.

<li>Be aware of MGET commands, which can impact the true operations per second (ops/s) rate.
</li>
</ul>
<h3><strong>Optimize Slow Commands</strong></h3>

<ul>

<li>If EVALSHA commands are slow, consider using EVAL instead.

<li>For HGETALL and HMGET commands, use HGET and HMSET for individual fields instead.

<li>Avoid SCAN commands, as they can be slow for large datasets.
</li>
</ul>
<h3><strong>Monitor Performance Metrics</strong></h3>

<ul>

<li>Track latency, the time between a client request and server response, as it's the most direct way to detect performance issues.

<li>Monitor instantaneous_ops_per_sec, the total number of commands processed per second, to identify throughput issues.

<li>Calculate the cache hit rate using keyspace_hits / (keyspace_hits + keyspace_misses) to ensure the cache is being used effectively.
</li>
</ul>
<h3><strong>Optimize Memory Usage</strong></h3>

<ul>

<li>Use the MEMORY STATS command to get memory usage statistics and identify potential issues.

<li>Run MEMORY DOCTOR to get suggestions for resolving memory consumption problems.

<li>Scale up to a larger cache size with more CPU cores if memory usage is high.

<li>Avoid memory fragmentation by storing data with consistent sizes.
</li>
</ul>
<h3><strong>Scale Redis</strong></h3>

<ul>

<li>Scale out by adding more shards to distribute load across multiple Redis processes.

<li>Scale up to a larger cache size with more CPU cores to handle higher loads.

<li>Avoid rapid changes in the number of client connections to prevent spikes.
</li>
</ul>
<p>
By following these guidelines and using the provided Redis commands, you can effectively troubleshoot and optimize Redis command performance issues in your application.
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<h2>Support and Resources </h2>

<p>
Here are the links and tutorials for connecting with otel collector redis receiver in cloud documentation:
</p>
<p>
<a href="https://redis.io/docs/latest/operate/rc/rc-quickstart/">Redis Cloud Quick Start</a>
</p>
<p>
<a href="https://openobserve.com/docs/redis-receiver">otel collector redis receiver | OpenObserve documentation</a>
</p>
<p>
<a href="https://openobserve.ai/about/">About Us | Open Source Observability Platform</a>
</p>
<p>
<a href="https://docs.splunk.com/observability/en/gdi/opentelemetry/components/redis-receiver.html">otel collector redis receiver — Splunk Observability Cloud documentation</a>
</p>
<p>
<a href="https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/third-party/redis">Redis | Google Cloud Observability</a>
</p>
<p>
<a href="https://grafana.com/docs/grafana-cloud/monitor-infrastructure/integrations/integration-reference/integration-redis-enterprise/">Redis Enterprise integration | Grafana Cloud documentation</a>
</p>
<p>
<a href="https://docs.splunk.com/observability/en/gdi/opentelemetry/components/redis-receiver.html#configuration-settings">otel collector redis receiver configuration | Splunk Observability Cloud documentation</a>
</p>
<p>
<a href="https://docs.splunk.com/observability/en/gdi/opentelemetry/components/redis-receiver.html#metrics">Redis metrics | Splunk Observability Cloud documentation</a>
</p>
<p>
<a href="https://docs.splunk.com/observability/en/gdi/opentelemetry/components/redis-receiver.html#troubleshooting">Redis troubleshooting | Splunk Observability Cloud documentation</a>
</p>
<p>
These resources provide detailed information on setting up and configuring the otel collector redis receiver for various cloud platforms like Open Observe, Google Cloud Observability, and Grafana Cloud.
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<p>
<a href="https://openobserve.ai/contactus">Contact OpenObserve Team for a free Demo</a>
</p>
<p>
<a href="https://openobserve.ai/about/">About Us | Open Source Observability Platform for Logs, Metrics, Traces ...</a>
</p>
