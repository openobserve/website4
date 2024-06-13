---
title: Nginx OpenTelemetry Collector Documentation
seoTitle: Nginx OpenTelemetry Collector Documentation
description: Explore how integrating NGINX Receiver with OpenTelemetry Collector
  offers enhanced observability solutions.
img: /img/resources/nginx-receiver.png
alt: Nginx Receiver
slug: nginx-receiver-integration
authors:
  - openobserve-team
publishDate: 2024-06-13
tags:
  - Nginx OpenTelemetry integration
  - Nginx Receiver OpenTelemetry
  - Nginx monitoring with OpenTelemetry
  - OpenTelemetry Collector Nginx setup
  - integrating Nginx with OpenTelemetry
  - Nginx observability with OpenTelemetry
  - Nginx metrics collection
  - Nginx logs with OpenTelemetry
  - OpenTelemetry Nginx Receiver setup
---


<h2><strong>Introduction</strong></h2>





<p>

Wouldn’t it be nice if you had an accurate, real-time overview of your Nginx server? Something that would let you see all the requests, follow all the transactions, and collect all the metrics without breaking a sweat? Well, OpenTelemetry Collector documentation can help you set up monitoring for your Nginx server!

</p>

<p>

NGINX + OpenTelemetry provides an observability solution that makes this job a piece of cake, so let’s talk a little bit about NGINX and OpenTelemetry Collector, and how you can use these technologies to monitor and observe your web applications.

</p>

<h3><strong>Overview of NGINX and its Significance</strong></h3>





<p>

NGINX is an essential and widely-used web server, proxy, and load balancer in today’s web. Its performance, scalability, and simplicity make it an ideal choice for most web administrators and developers out there. Whether you're running a small website or managing a complex microservices architecture, NGINX offers the necessary tools to serve any kind of content with high performance and scalability. And, you can use the OpenTelemetry NGINX receiver to monitor its behavior.

</p>

<h3><strong>OpenTelemetry’s Role in Observability</strong></h3>





<p>

OpenTelemetry is an open-source project that provides standard APIs, SDKs, and tools for observability. It collects and generates telemetry data (metrics, logs, and traces) (which can help you monitor application performance and health), and export them to various monitoring solutions. When you use OpenTelemetry to monitor NGINX, and especially when using NGINX Receiver, you can see all this data in one place and keep an eye on your web apps.

</p>

<h3><strong>Importance of Integrating NGINX with OpenTelemetry Collector</strong></h3>





<p>

NGINX OpenTelemetry Collector enables you to monitor and observe your web server more effectively. The collector receives, processes, and sends the data from NGINX to the chosen observability platform. Using it, you can get better and smarter insights about the server, such as overall performance, traffic, error rate, and much more.

</p>

<h2><strong>Prerequisites for Integration</strong></h2>





<h3><strong>Requirements for Configuring the OpenTelemetry Collector with NGINX</strong></h3>





<p>

Before starting with the integration, make sure you have the following:

</p>

<ul>



<li>An NGINX server that is up and running



<li>Basic experience with NGINX config files



<li>An OpenTelemetry Collector instance that is up and running



<li>Docker (optional, for Docker Compose)

</li>

</ul>

<h3><strong>Ensuring NGINX is Built with Necessary Modules for Metrics Collection</strong></h3>





<p>

In order to enable metrics collection in NGINX, it should be built with vital modules like  stub_status and other necessary modules depending on the data to be collected. This module ensures the extraction of real-time statistics that are crucial for comprehensive monitoring.

</p>

<h2><strong>Setting Up NGINX for Metrics and Logs Collection</strong></h2>

![Setting Up NGINX for Metrics and Logs Collection](/img/resources/setting-up-nginx-for-metrics-and-logs-collection.png "Setting Up NGINX for Metrics and Logs Collection")

1. Confirm that the  stub_status module is enabled in your NGINX build:

```
nginx -V 2>&1 | grep -o with-http_stub_status_module
```

<p>

If the output includes with-http_stub_status_module , the module is enabled.

</p>

<p>

Got it? Great! Now, let's configure NGINX to start aggregating its metrics via the HTTP protocol.

</p>

<p>

2. Configure the NGINX configuration file (typically located at /etc/nginx/nginx.conf or /etc/nginx/nginx.conf) to include the stub_status module. Add the following block to the server section:

</p>

```
location /nginx_status {
    stub_status;
    allow 127.0.0.1;  # Allow access only from localhost
    deny all;  # Deny all other accesses
}

```



<p>

Check out our guide for more details on<a href="https://openobserve.ai/docs/operator-guide/nginx_proxy/"> setting up NGINX proxy</a>

</p>

<p>

Now let’s move on and configure NGINX to its metrics via the HTTP protocol.

</p>

<h3><strong>Creating and Configuring an Endpoint for Server Statistics</strong></h3>





<p>

This configuration will create an endpoint (/nginx_status) which can serve as real-time statistics about NGINX performance.

</p>

<h3><strong>Instructions for Enabling and Accessing the NGINX Status Page for Metrics</strong></h3>





<p>

To access the status page, visit 'http:<em>//your-server-ip/nginx_status</em>' in your browser. You will see a page with various metrics like active connections, accepted connections, and handled requests.

</p>

<h2><strong>Installing and Configuring the OpenTelemetry Collector</strong></h2>





<h3><strong>Step-by-Step Guide on Downloading and Setting Up the OpenTelemetry Collector</strong></h3>





<ol>



<li>Get the latest OpenTelemetry Collector installation package from the official GitHub repository or from your package manager.



<li>Follow the installation instructions to complete the collector installation.

</li>

</ol>

<h3><strong>Configuring the Collector for Receiving Metrics and Logs from NGINX</strong></h3>





<p>

Now it's time to create a configuration file (e.g., otel-collector-config.yaml) with the necessary settings so that you can receive and process NGINX metrics via the NGINX Receiver.

</p>

<h3><strong>Pipeline Configuration for Processing and Exporting Telemetry Data</strong></h3>





<p>

Specify the pipeline configuration in the YAML file to process and export the data.

</p>

<h4><strong>Examples of YAML Configurations for Integrating NGINX with the Collector</strong></h4>





<p>

Ensure within the scrape configurations, targets match your NGINX status endpoint.

</p>

<p>

Here’s an example configuration using the NGINX Receiver:

</p>

```
receivers:
  nginx:
    endpoint: "http://localhost:80/nginx_status"

exporters:
  logging:
    logLevel: debug

service:
  pipelines:
    metrics:
      receivers: [nginx]
      exporters: [logging]
```

<h2><strong>Integrating NGINX with the OpenTelemetry Collector</strong></h2>





<h4><strong>Adding NGINX as a Receiver in the Collector’s Configuration</strong></h4>





<p>

Add NGINX as a receiver in your otel-collector-config.yaml file. This will instruct the collector on how to retrieve the metrics from the NGINX Receiver.

</p>

<h3><strong>Setting Collection Intervals for Metrics</strong></h3>





<p>

Define the collection interval in the configuration to control the frequency metrics collected by the NGINX Receiver.

</p>

<h3><strong>Example Configuration with Docker Compose for Easy Setup</strong></h3>





<p>

For Docker environments, the configuration will look something like this 

```
docker-compose.yaml:
```

</p>

```
version: '3.7'
services:
  otel-collector:
    image: otel/opentelemetry-collector
    command: ["--config", "/etc/otel-collector-config.yaml"]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    ports:
      - "55680:55680"


```

<h2><strong>Validating Metrics and Logs Collection</strong></h2>





<h3><strong>Steps to Ensure Metrics Are Being Correctly Reported to the Collector</strong></h3>





<p>

Inspect the logs of the OpenTelemetry Collector to make sure that metrics are being received and processed correctly by the NGINX Receiver.

</p>

<h3><strong>Methods for Validating Logs and Metrics in the Configured Backend or Dashboard</strong></h3>





<p>

Don’t forget to verify the metrics and logs by simply viewing them in the configured backend or dashboard. Make sure that the data is the same as the expected output from NGINX.

</p>

<h2><strong>Monitoring and Visualization</strong></h2>





<h3><strong>Configuring Dashboards for Visualizing NGINX Metrics</strong></h3>





<p>

You can use tools to create dashboards that can visualize NGINX metrics, which will provide real-time insights into server performance.

</p>

<h3><strong>Using Tools like SigNoz for Monitoring and Setting Up Alerts</strong></h3>





<p>

SigNoz can be configured to monitor NGINX metrics and also set up alerts for specific conditions, this can help you stay proactive in managing your web services.

</p>

<h3><strong>Creating a Comprehensive Dashboard View with the Collected Metrics</strong></h3>





<p>

You can also combine various metrics into a single dashboard view, just so that you can get a holistic understanding of your NGINX performance and health.

</p>

<p>

And speaking of dashboards, let’s push the boundaries a bit further with some advanced configurations and troubleshooting!

</p>

<h2><strong>Advanced Configuration and Troubleshooting</strong></h2>





<h3><strong>Expanding Observability by Integrating Additional Web Services</strong></h3>





<p>

Here’s another thing, you can extend the observability setup by just integrating other web services and configuring forwarding to backend services in order to get a better comprehensive monitoring solution.

</p>

<h3><strong>Troubleshooting Common Issues in Metrics Collection and Exportation</strong></h3>





<p>

You can address common issues such as misconfigured endpoints, inadequate access permissions, and performance bottlenecks. Check the configuration files and logs to troubleshoot issues with the NGINX Receiver. Ensure that all endpoints and modules are correctly set up and that there are no network issues blocking data collection.

</p>

<h3><strong>Debugging the Collector and NGINX Module Integration</strong></h3>





<p>

Review collector and NGINX logs for errors, and check configurations against best practices. Use debug mode in OpenTelemetry Collector and NGINX logs to detect and fix problems with integrating the NGINX Receiver.

</p>

<h2><strong>Conclusion and Further Steps</strong></h2>





<p>

As we conclude, here are some more things that you should know. By integrating NGINX with OpenTelemetry Collector via the NGINX Receiver, you ensure better observability of your applications. This allows for deeper monitoring which translates directly into better optimization and maintenance of your web server. The NGINX Receiver automates the process of collecting traces for better debugging and monitoring, giving you a complete picture of your web server’s performance.

</p>

<p>

You can also consider scaling this implementation across services and applications for <a href="https://openobserve.ai/">full-stack observability</a>. Consider the NGINX Receiver as an example when planning the integration of other receivers among the OpenTelemetry components.

</p>

<p>

<strong>Easily integrate, visualize, and be alert on your NGINX metrics and much more! Try OpenObserve for advanced <a href="https://openobserve.ai/">observability solutions</a>. </strong>

</p>

<h3><strong>Here are some references and Links to check out to learn more:</strong></h3>





<p>

<a href="https://nginx.org/en/docs/">NGINX Official Documentation</a>

</p>

<p>

<a href="https://openobserve.ai/docs/ingestion/traces/opentelemetry/">OpenTelemetry Collector Documentation</a>

</p>

<p>

<a href="https://signoz.io/docs/introduction/">SigNoz Documentation</a>

</p>

<p>

And that’s it! You are now collecting NGINX telemetry data with the OpenTelemetry Collector and the NGINX Receiver.

</p>
