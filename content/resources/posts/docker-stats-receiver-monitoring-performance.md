---
title: Docker Metrics Collector Monitoring
seoTitle: Docker Metrics Collector Monitoring
description: Understand the role of Docker metrics in monitoring container
  performance and system health with Docker Stats Receiver.
img: /img/resources/docker-metrics-collector-monitoring.png
alt: Docker Stats Receiver
slug: docker-stats-receiver-monitoring-performance
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - Docker Metrics
  - stats receiver
---
<p><span style="font-weight: 400;">Monitoring Docker container metrics helps you with the performance and health of your containerized applications. Key reasons to monitor Docker metrics include:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Resource Optimization</strong><span style="font-weight: 400;">: Monitoring CPU, memory, network and disk usage helps allocate resources efficiently and scale containers as needed.</span></li>

<li style="font-weight: 400;"><strong>Performance Management</strong><span style="font-weight: 400;">: Analyzing resource utilization allows tuning application performance inside containers.</span></li>

<li style="font-weight: 400;"><strong>Troubleshooting</strong><span style="font-weight: 400;">: Docker metrics enable quick identification and resolution of issues, reducing downtime.</span></li>

<li style="font-weight: 400;"><strong>Cost Management</strong><span style="font-weight: 400;">: In cloud environments, efficient resource usage based on metrics can lead to significant cost savings.</span></li>

</ul>

<h3><span style="font-weight: 400;">How to Collect Docker Metrics</span></h3>

<p><span style="font-weight: 400;">There are several ways to collect Docker container metrics:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Docker Stats Command</strong><span style="font-weight: 400;">: The </span><span style="font-weight: 400;">docker stats</span><span style="font-weight: 400;"> command provides a live stream of a container's CPU, memory, network and block I/O metrics.</span></li>

<li style="font-weight: 400;"><strong>Prometheus Integration</strong><span style="font-weight: 400;">: Docker can be configured as a Prometheus monitoring target to collect metrics like CPU, memory, I/O and network usage.</span></li>

<li style="font-weight: 400;"><strong>OpenTelemetry Collector</strong><span style="font-weight: 400;">: The OpenTelemetry Collector can gather container-level metrics like CPU, memory, network stats and disk I/O from Docker using the Docker Stats receiver.</span></li>

</ul>

<h3><span style="font-weight: 400;">Analyzing Docker Metrics with OpenObserve</span></h3>

<p><span style="font-weight: 400;">OpenObserve is a platform that provides a unified view of metrics, logs and traces from Docker containers and other sources. Key capabilities include:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Aggregating metrics from multiple containers and hosts</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Visualizing metrics with dashboards and charts</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Analyzing historical trends to identify performance issues</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Setting alerts on key metrics to proactively detect problems</span></li>

</ul>

<p><span style="font-weight: 400;">By collecting and analyzing Docker metrics with OpenObserve, you can troubleshoot issues, and ensure the health and performance of your containerized applications.&nbsp;</span></p>

<p><a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">Sign up now to see how OpenObserve can support you in monitoring Docker container metrics</span></a><span style="font-weight: 400;">.</span></p>

<h2><span style="font-weight: 400;">Understanding Docker Metrics</span></h2>

<p><span style="font-weight: 400;">Here is a concise overview of key Docker metrics for monitoring container performance:</span></p>

<h3><span style="font-weight: 400;">Key Docker Metrics</span></h3>

<p><span style="font-weight: 400;">The most important Docker metrics to monitor are:</span></p>

<ul>

<li style="font-weight: 400;"><strong>CPU Usage</strong><span style="font-weight: 400;">: Percentage of host CPU used by the container</span></li>

<li style="font-weight: 400;"><strong>Memory Usage</strong><span style="font-weight: 400;">: Memory used by the container vs its limit</span></li>

<li style="font-weight: 400;"><strong>Block I/O</strong><span style="font-weight: 400;">: Bytes read/written to block devices</span></li>

<li style="font-weight: 400;"><strong>Network I/O</strong><span style="font-weight: 400;">: Bytes sent/received over the network interface</span></li>

<li style="font-weight: 400;"><strong>PIDs</strong><span style="font-weight: 400;">: Number of processes/threads created by the container</span></li>

</ul>

<p><span style="font-weight: 400;">You can collect these metrics using the </span><span style="font-weight: 400;">docker stats</span><span style="font-weight: 400;"> command, which provides a live stream of data. OpenObserve can aggregate and analyze these metrics from multiple containers to provide a unified view of the system.</span></p>

<h3><span style="font-weight: 400;">Memory Reporting on Linux</span></h3>

<p><span style="font-weight: 400;">On Linux, the memory limit represents the memory limit of the host machine, unless it is configured for the specific container. The memory usage limit is reported as "MEM USAGE/LIMIT" in the </span><span style="font-weight: 400;">docker stats</span><span style="font-weight: 400;"> output.</span></p>

<h3><span style="font-weight: 400;">Monitoring Process Creation</span></h3>

<p><span style="font-weight: 400;">The "PIDs" column in </span><span style="font-weight: 400;">docker stats</span><span style="font-weight: 400;"> output shows the number of processes or threads the container has created. Monitoring this metric can help detect containers that are creating too many processes, which may indicate a problem.</span></p>

<p><span style="font-weight: 400;">By collecting and analyzing these key Docker metrics, you can optimize resource usage, troubleshoot issues, and ensure the health and performance of your containerized applications.&nbsp;</span></p>

<p><a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">OpenObserve provides a powerful platform</span></a><span style="font-weight: 400;"> for aggregating, visualizing and analyzing these metrics from multiple sources.</span></p>

<h2><span style="font-weight: 400;">Configuring Docker for Metrics Reporting</span></h2>

<p><span style="font-weight: 400;">To configure Docker for metrics reporting, follow these steps:</span></p>

<h3><span style="font-weight: 400;">Steps to Configure the Docker Daemon for Metrics Exposure</span></h3>

<ol>

<li style="font-weight: 400;"><strong>Edit the Docker Daemon Configuration</strong><span style="font-weight: 400;">: Open or create the </span><span style="font-weight: 400;">/etc/docker/daemon.json</span><span style="font-weight: 400;"> file and add the following configuration to expose metrics:</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">json</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">{</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">"metrics-addr"</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">"127.0.0.1:9100"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">"experimental"</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This configuration sets the metrics address and enables experimental features, which are necessary for comprehensive metrics collection.</span></p>

<ol>

<li style="font-weight: 400;"><strong>Enable Remote Access</strong><span style="font-weight: 400;">: If you want to allow remote access to the metrics, ensure that the </span><span style="font-weight: 400;">metrics-addr</span><span style="font-weight: 400;"> is set to an appropriate IP address that allows access from your monitoring tools.</span></li>

<li style="font-weight: 400;"><strong>Use the Docker Stats Command</strong><span style="font-weight: 400;">: You can also use the </span><span style="font-weight: 400;">docker stats</span><span style="font-weight: 400;"> command to view real-time metrics for all running containers. This command provides basic metrics such as CPU and memory usage.</span></li>

</ol>

<h3><span style="font-weight: 400;">Enabling Experimental Features</span></h3>

<p><span style="font-weight: 400;">To enable experimental features, ensure that the </span><span style="font-weight: 400;">"experimental": true</span><span style="font-weight: 400;"> line is included in your </span><span style="font-weight: 400;">daemon.json</span><span style="font-weight: 400;"> file. This setting allows access to additional metrics and features that are not available in the stable release of Docker.</span></p>

<h3><span style="font-weight: 400;">Restarting the Docker Daemon</span></h3>

<p><span style="font-weight: 400;">After making changes to the </span><span style="font-weight: 400;">daemon.json</span><span style="font-weight: 400;"> file, restart the Docker daemon to apply the configuration changes. Use the following command:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sudo</span><span style="font-weight: 400;"> systemctl restart docker.service</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This command will restart the Docker service, applying the new configuration and enabling metrics reporting.</span></p>

<p><span style="font-weight: 400;">By following these steps, you can configure Docker to expose metrics effectively, enabling better monitoring and analysis of container performance.&nbsp;</span></p>

<p><span style="font-weight: 400;">For more details on configuring Docker for metrics collection, you can refer to </span><a href="https://openobserve.ai/docs/"><span style="font-weight: 400;">OpenObserve Documentation</span></a><span style="font-weight: 400;">.</span></p>

<h2><span style="font-weight: 400;">OpenTelemetry Collector Integration with Docker</span></h2>

<p><span style="font-weight: 400;">Here is an overview of integrating OpenTelemetry Collector with Docker for metrics collection:</span></p>

<h3><span style="font-weight: 400;">Role and Benefits of Using OpenTelemetry Collector for Docker Metrics</span></h3>

<p><span style="font-weight: 400;">The OpenTelemetry Collector plays a crucial role in collecting, processing, and exporting metrics from Docker containers. Key benefits include:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Unified Metrics Collection</strong><span style="font-weight: 400;">: It can gather metrics from multiple sources, including Docker stats and Prometheus, allowing for a consolidated view of container performance.</span></li>

<li style="font-weight: 400;"><strong>Flexibility</strong><span style="font-weight: 400;">: The Collector supports various output backends, enabling users to send metrics to different observability platforms.</span></li>

<li style="font-weight: 400;"><strong>Enhanced Observability</strong><span style="font-weight: 400;">: By integrating with OpenTelemetry, users can gain deeper insights into container performance, resource utilization, and application health.</span></li>

</ul>

<h3><span style="font-weight: 400;">Configuring Docker Stats and Prometheus Receiver for Metric Collection</span></h3>

<p><span style="font-weight: 400;">To configure the Docker stats and Prometheus receiver for metrics collection, follow these steps:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Configure Docker Daemon</strong><span style="font-weight: 400;">: Modify the </span><span style="font-weight: 400;">/etc/docker/daemon.json</span><span style="font-weight: 400;"> file to expose metrics:</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">json</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">{</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">"metrics-addr"</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">"127.0.0.1:9100"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">"experimental"</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This configuration enables the Docker daemon to expose metrics at the specified address.</span></p>

<ol>

<li style="font-weight: 400;"><strong>Set Up the OpenTelemetry Collector</strong><span style="font-weight: 400;">: In the Collector's YAML configuration file, add the Docker stats receiver:</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; docker_stats:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint:</span> <span style="font-weight: 400;">"http://localhost:9100"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Additionally, configure the Prometheus receiver to scrape metrics from the Docker endpoint:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; prometheus/</span><span style="font-weight: 400;">docker</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">config</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">scrape_configs</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - </span><span style="font-weight: 400;">job_name</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">"docker"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">static_configs</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - </span><span style="font-weight: 400;">targets</span><span style="font-weight: 400;">: [</span><span style="font-weight: 400;">"127.0.0.1:9323"</span><span style="font-weight: 400;">]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Adding Docker Metrics Receiver to OpenTelemetry Collector Pipelines</span></h3>

<p><span style="font-weight: 400;">After configuring the receivers, you need to add them to the Collector's pipelines to ensure metrics are processed and exported. This can be done by modifying the pipelines section in the Collector configuration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers:</span><span style="font-weight: 400;"> \[docker_stats, prometheus/docker]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters:</span><span style="font-weight: 400;"> \[your_exporter]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Replace </span><span style="font-weight: 400;">your_exporter</span><span style="font-weight: 400;"> with the desired metrics exporter (e.g., to send data to a cloud observability platform).</span></p>

<h3><span style="font-weight: 400;">Prerequisites for Docker Post-installation and Collector Configuration</span></h3>

<p><span style="font-weight: 400;">Before setting up the OpenTelemetry Collector, ensure the following prerequisites are met:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Docker Installation</strong><span style="font-weight: 400;">: Docker must be installed and running on a Linux machine.</span></li>

<li style="font-weight: 400;"><strong>Post-installation Steps</strong><span style="font-weight: 400;">: Complete Docker post-installation steps, including configuring Docker to run without root privileges if necessary.</span></li>

<li style="font-weight: 400;"><strong>Permissions</strong><span style="font-weight: 400;">: Ensure the Docker socket has the correct permissions for the Collector to access it:</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sudo chmod u+x /var/</span><span style="font-weight: 400;">run</span><span style="font-weight: 400;">/docker.sock</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Collector Configuration</strong><span style="font-weight: 400;">: Ensure the OpenTelemetry Collector is properly configured to export metrics to your chosen backend.</span></li>

</ol>

<p><span style="font-weight: 400;">By following these steps, you can effectively integrate OpenObserve's OpenTelemetry Collector with Docker for comprehensive metrics collection.</span></p>

<p><span style="font-weight: 400;">For more detailed instructions and troubleshooting, refer to the </span><a href="https://openobserve.ai/docs/"><span style="font-weight: 400;">OpenObserve documentation</span></a><span style="font-weight: 400;"> on integrating OpenTelemetry Collector with Docker.</span></p>

<h2><span style="font-weight: 400;">Visualization and Monitoring with Backend Systems</span></h2>

<p><span style="font-weight: 400;">Here is an overview of backend systems for Docker metrics visualization and monitoring:</span></p>

<h3><span style="font-weight: 400;">Metrics Backends for Docker</span></h3>

<p><span style="font-weight: 400;">There are several backend systems compatible with Docker metrics collection that provide visualization and monitoring capabilities:</span></p>

<ul>

<li style="font-weight: 400;"><strong>OpenObserve</strong><span style="font-weight: 400;">: An open-source observability platform that supports logs, metrics and traces. It is highly scalable and cost-effective compared to Elasticsearch.</span></li>

<li style="font-weight: 400;"><strong>Sumo Logic</strong><span style="font-weight: 400;">: Provides a unified logs and metrics app for monitoring Docker deployments. It collects metrics using the OpenTelemetry Collector's Docker receiver.</span></li>

<li style="font-weight: 400;"><strong>Uptrace</strong><span style="font-weight: 400;">: An open-source distributed tracing and metrics backend that can visualize Docker metrics collected via OpenTelemetry.</span></li>

</ul>

<h3><span style="font-weight: 400;">Key Features for Monitoring</span></h3>

<p><span style="font-weight: 400;">These backend systems typically offer the following features for Docker metrics monitoring:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Query Builder</strong><span style="font-weight: 400;">: Allows constructing complex queries to filter, aggregate and analyze metrics.</span></li>

<li style="font-weight: 400;"><strong>Dashboards</strong><span style="font-weight: 400;">: Pre-built and custom dashboards to visualize key Docker metrics like CPU, memory, I/O and network usage.</span></li>

<li style="font-weight: 400;"><strong>Alerting</strong><span style="font-weight: 400;">: Set alerts on metrics to proactively detect issues like resource saturation or anomalous behavior.</span></li>

<li style="font-weight: 400;"><strong>Integrations</strong><span style="font-weight: 400;">: Integrations with monitoring tools, notification systems, and cloud platforms.</span></li>

</ul>

<h3><span style="font-weight: 400;">Configuring OpenObserve for Docker Monitoring</span></h3>

<p><span style="font-weight: 400;">To configure OpenObserve for real-time Docker metrics monitoring:</span></p>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Configure the Docker daemon to expose metrics at an HTTP endpoint.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Set up the OpenTelemetry Collector to scrape metrics from the Docker endpoint using the Docker stats receiver.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Add the Docker metrics receiver to the Collector's pipelines to process and export the metrics to OpenObserve.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Ensure the Collector is properly configured to export metrics to OpenObserve.</span></li>

</ol>

<p><span style="font-weight: 400;">By integrating OpenObserve with Docker metrics collection, you can gain a unified view of container performance, set alerts, and troubleshoot issues.&nbsp;</span></p>

<p><span style="font-weight: 400;">OpenObserve's scalability and cost-effectiveness make it an attractive choice compared to other platforms.</span></p>

<p><a href="https://openobserve.ai/resources/tag/data-visualization"><span style="font-weight: 400;">Check Data Visualization with OpenObserve here</span></a><span style="font-weight: 400;">.</span></p>

<h2><span style="font-weight: 400;">Collector Configuration for Docker Metrics</span></h2>

<p><span style="font-weight: 400;">Here's a detailed overview of configuring the OpenTelemetry Collector for Docker metrics collection:</span></p>

<h3><span style="font-weight: 400;">Collector Setup Options</span></h3>

<p><span style="font-weight: 400;">When setting up the OpenTelemetry Collector for Docker metrics, you have two primary options:</span></p>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Using an Existing Collector:</span></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">If you already have an OpenTelemetry Collector running, you can extend its configuration to include Docker metrics collection. This approach saves time and resources, as you can leverage existing integrations and pipelines.</span></li>

</ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Setting Up a New Collector:</span></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">If you prefer a clean slate or need specific configurations that differ from your existing setup, you can deploy a new OpenTelemetry Collector instance. This option allows for tailored configurations that meet the unique requirements of your Docker environment.</span></li>

</ul>

</ol>

<h3><span style="font-weight: 400;">YAML Configuration for Docker Collection</span></h3>

<p><span style="font-weight: 400;">To configure the OpenTelemetry Collector for Docker metrics collection, you need to create or modify the YAML configuration file. Below is an example configuration that includes metric collection, log collection, and integration steps:</span></p>

<h3><span style="font-weight: 400;">Example YAML Configuration</span></h3>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; docker_stats:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint:</span> <span style="font-weight: 400;">"http://localhost:9100"</span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;"># Docker metrics endpoint</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; protocols:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; grpc:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; http:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; logging:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; loglevel:</span><span style="font-weight: 400;"> debug</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; prometheus:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint:</span> <span style="font-weight: 400;">"0.0.0.0:9090"</span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;"># Expose Prometheus metrics</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; openobserve:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint:</span> <span style="font-weight: 400;">"http://your-openobserve-instance/api/v1/metrics"</span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;"># Replace with your OpenObserve endpoint</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers:</span><span style="font-weight: 400;"> \[docker_stats, otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters:</span><span style="font-weight: 400;"> \[openobserve, logging]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers:</span><span style="font-weight: 400;"> \[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters:</span><span style="font-weight: 400;"> \[logging]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Key Points&nbsp;</span></h3>

<ul>

<li style="font-weight: 400;"><strong>Receivers</strong><span style="font-weight: 400;">: The </span><span style="font-weight: 400;">docker_stats</span><span style="font-weight: 400;"> receiver collects metrics from the Docker API, while the </span><span style="font-weight: 400;">otlp</span><span style="font-weight: 400;"> receiver allows for other telemetry data.</span></li>

<li style="font-weight: 400;"><strong>Exporters</strong><span style="font-weight: 400;">: Metrics are exported to OpenObserve and logged for debugging. You can replace the OpenObserve endpoint with your specific instance URL.</span></li>

<li style="font-weight: 400;"><strong>Pipelines</strong><span style="font-weight: 400;">: Define how data flows from receivers to exporters. In this case, metrics are processed and sent to OpenObserve.</span></li>

</ul>

<h3><span style="font-weight: 400;">Supported Docker API Versions and Platforms</span></h3>

<p><span style="font-weight: 400;">The OpenTelemetry Collector supports various Docker API versions and platforms for metrics collection:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Docker API Versions</strong><span style="font-weight: 400;">: The Collector is compatible with Docker API version 1.24 and later. It is advisable to use the latest stable version of Docker to ensure compatibility and access to the latest features.</span></li>

<li style="font-weight: 400;"><strong>Supported Platforms</strong><span style="font-weight: 400;">: The Collector can run on various operating systems, including:</span></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Linux: Most commonly used platform for Docker deployments.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Windows: Supported for Docker Desktop and Windows Server.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">macOS: Suitable for local development environments using Docker Desktop.</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">Whether you choose to extend an existing collector or set up a new one, the YAML configuration allows for flexibility and customization to meet your specific needs.&nbsp;</span></p>

<p><span style="font-weight: 400;">Make sure to use supported Docker API versions to ensure seamless integration and functionality.</span></p>

<h2><span style="font-weight: 400;">Analyzing Docker Metrics</span></h2>

<p><span style="font-weight: 400;">Here&rsquo;s a detailed analysis of Docker metrics, focusing on the </span><span style="font-weight: 400;">docker container stats</span><span style="font-weight: 400;"> command and its integration with cloud observability platforms like OpenObserve, along with comparisons to other platforms.</span></p>

<h3><span style="font-weight: 400;">Live Streaming of Container Resource Usage Statistics with </span><span style="font-weight: 400;">docker container stats</span></h3>

<p><span style="font-weight: 400;">The </span><span style="font-weight: 400;">docker stats</span><span style="font-weight: 400;"> command provides a live stream of resource usage statistics for running Docker containers. It displays key metrics such as:</span></p>

<ul>

<li style="font-weight: 400;"><strong>CPU Usage</strong><span style="font-weight: 400;">: Percentage of the total CPU being utilized by the container.</span></li>

<li style="font-weight: 400;"><strong>Memory Usage</strong><span style="font-weight: 400;">: Current memory usage compared to the memory limit set for the container.</span></li>

<li style="font-weight: 400;"><strong>Network I/O</strong><span style="font-weight: 400;">: Amount of data sent and received by the container.</span></li>

<li style="font-weight: 400;"><strong>Block I/O</strong><span style="font-weight: 400;">: Data read from and written to the container's filesystem.</span></li>

</ul>

<h3><span style="font-weight: 400;">Example Output</span></h3>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">$ docker stats redis1 redis2</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">CONTAINER &nbsp; &nbsp; CPU % &nbsp; &nbsp; MEM USAGE / LIMIT &nbsp; &nbsp; MEM % &nbsp; &nbsp; NET I/O&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BLOCK I/O</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">redis1&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">0.07</span><span style="font-weight: 400;">% &nbsp; &nbsp; </span><span style="font-weight: 400;">796</span><span style="font-weight: 400;"> KB / </span><span style="font-weight: 400;">64</span><span style="font-weight: 400;"> MB&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">1.21</span><span style="font-weight: 400;">% &nbsp; &nbsp; </span><span style="font-weight: 400;">788</span><span style="font-weight: 400;"> B / </span><span style="font-weight: 400;">648</span><span style="font-weight: 400;"> B&nbsp; &nbsp; </span><span style="font-weight: 400;">3.568</span><span style="font-weight: 400;"> MB / </span><span style="font-weight: 400;">512</span><span style="font-weight: 400;"> KB</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">redis2&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">0.07</span><span style="font-weight: 400;">% &nbsp; &nbsp; </span><span style="font-weight: 400;">2.746</span><span style="font-weight: 400;"> MB / </span><span style="font-weight: 400;">64</span><span style="font-weight: 400;"> MB&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">4.29</span><span style="font-weight: 400;">% &nbsp; &nbsp; </span><span style="font-weight: 400;">1.266</span><span style="font-weight: 400;"> KB / </span><span style="font-weight: 400;">648</span><span style="font-weight: 400;"> B </span><span style="font-weight: 400;">12.4</span><span style="font-weight: 400;"> MB / </span><span style="font-weight: 400;">0</span><span style="font-weight: 400;"> B</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This command is particularly useful for monitoring resource usage in real-time, allowing for quick assessments of container performance under various loads.</span></p>

<h3><span style="font-weight: 400;">Configuring Output Formats and Understanding Default Metrics Presented</span></h3>

<p><span style="font-weight: 400;">The </span><span style="font-weight: 400;">docker stats</span><span style="font-weight: 400;"> command outputs metrics in a tabular format by default. However, users can customize the output format using the </span><span style="font-weight: 400;">--format</span><span style="font-weight: 400;"> flag to generate JSON or other formats suitable for further processing. For instance:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">docker</span><span style="font-weight: 400;"> stats --format </span><span style="font-weight: 400;">"{{.Name}}: {{.CPUPerc}}"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Default Metrics&nbsp;</span></h3>

<ul>

<li style="font-weight: 400;"><strong>CPU %</strong><span style="font-weight: 400;">: Indicates the percentage of CPU used by the container.</span></li>

<li style="font-weight: 400;"><strong>MEM USAGE / LIMIT</strong><span style="font-weight: 400;">: Shows the current memory consumption against the limit.</span></li>

<li style="font-weight: 400;"><strong>MEM %</strong><span style="font-weight: 400;">: Percentage of memory used relative to the limit.</span></li>

<li style="font-weight: 400;"><strong>NET I/O</strong><span style="font-weight: 400;">: Displays the total bytes sent and received.</span></li>

<li style="font-weight: 400;"><strong>BLOCK I/O</strong><span style="font-weight: 400;">: Indicates the total bytes read and written to disk.</span></li>

</ul>

<p><span style="font-weight: 400;">These metrics provide a snapshot of container performance, which can be crucial for troubleshooting and optimizing resource allocation.</span></p>

<h3><span style="font-weight: 400;">Validating Metrics Reporting to Cloud Observability Platforms</span></h3>

<p><span style="font-weight: 400;">To ensure that Docker metrics are accurately reported to cloud observability platforms like OpenObserve, follow these steps:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Integration Setup</strong><span style="font-weight: 400;">: Configure the OpenTelemetry Collector to collect Docker metrics using the Docker stats receiver and export them to OpenObserve.</span></li>

<li style="font-weight: 400;"><strong>Testing the Integration</strong><span style="font-weight: 400;">: After configuring the collector, run the </span><span style="font-weight: 400;">docker stats</span><span style="font-weight: 400;"> command and verify that the metrics are reflected in OpenObserve. This can be done by checking the dashboards for real-time updates.</span></li>

<li style="font-weight: 400;"><strong>Alerting and Monitoring</strong><span style="font-weight: 400;">: Set up alerts in OpenObserve based on specific thresholds for CPU, memory, or I/O metrics to proactively manage container health.</span></li>

</ol>

<h3><span style="font-weight: 400;">Comparison with Other Platforms</span></h3>

<ul>

<li style="font-weight: 400;"><strong>Sumo Logic</strong><span style="font-weight: 400;">: Offers advanced analytics and alerting capabilities, but may require more complex setup and is typically more expensive than OpenObserve.</span></li>

<li style="font-weight: 400;"><strong>Uptrace</strong><span style="font-weight: 400;">: Focuses on distributed tracing and performance monitoring, providing a more holistic view of application performance, but might lack some specific Docker metrics compared to OpenObserve.</span></li>

<li style="font-weight: 400;"><strong>Datadog</strong><span style="font-weight: 400;">: Provides comprehensive monitoring solutions, including Docker metrics, but often at a higher cost and with a steeper learning curve compared to OpenObserve.</span></li>

</ul>

<p><a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">OpenObserve stands out due to its open-source nature</span></a><span style="font-weight: 400;">, cost-effectiveness, and ease of integration with Docker metrics, making it an attractive option if you are looking to implement observability without significant overhead.</span></p>

<p><span style="font-weight: 400;">By leveraging the </span><span style="font-weight: 400;">docker stats</span><span style="font-weight: 400;"> command alongside a robust observability platform like OpenObserve, you can gain valuable insights into container performance, enabling optimization of their Docker environments.</span></p>

<h2><span style="font-weight: 400;">Advanced Docker Monitoring and Custom Metrics</span></h2>

<p><span style="font-weight: 400;">Let;s discuss advanced Docker monitoring and custom metrics. Here we focus on customizing metrics collection, creating queries, and configuring dashboards, particularly using OpenObserve and comparing it with other platforms.</span></p>

<h3><span style="font-weight: 400;">Customizing Metrics Collection</span></h3>

<h3><span style="font-weight: 400;">1. Customizing Metrics Collection Intervals, Labels, and Excluded Images</span></h3>

<p><span style="font-weight: 400;">To customize metrics collection in Docker, you can adjust the configuration of the OpenTelemetry Collector or other monitoring tools. Key aspects include:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Collection Intervals</strong><span style="font-weight: 400;">: You can set specific intervals for how often metrics are collected. For example, in the OpenTelemetry Collector configuration, you can specify the </span><span style="font-weight: 400;">collection_interval</span><span style="font-weight: 400;"> parameter to control the frequency of data collection.</span></li>

<li style="font-weight: 400;"><strong>Labels</strong><span style="font-weight: 400;">: Adding custom labels to your metrics can provide more context. For instance, you can label metrics by application name, environment (production, staging), or specific container roles. This helps in filtering and querying metrics effectively.</span></li>

<li style="font-weight: 400;"><strong>Excluded Images</strong><span style="font-weight: 400;">: To optimize performance, you may want to exclude certain images from metrics collection. This can be done by configuring the collector to ignore specific container names or image IDs in the configuration file.</span></li>

</ul>

<h4><span style="font-weight: 400;">Example Configuration Snippet</span></h4>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; docker_stats:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; collection_interval:</span> <span style="font-weight: 400;">10</span><span style="font-weight: 400;">s&nbsp; </span><span style="font-weight: 400;"># Collect metrics every 10 seconds</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; excluded_images:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">"nginx:latest"</span><span style="font-weight: 400;">]&nbsp; </span><span style="font-weight: 400;"># Exclude specific images</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">2. Creating Custom Queries</span></h3>

<p><span style="font-weight: 400;">Custom queries allow you to analyze Docker logs and metrics effectively. Depending on the backend system you are using (like OpenObserve, Sumo Logic, or Uptrace), the query language may vary.</span></p>

<ul>

<li style="font-weight: 400;"><strong>OpenObserve</strong><span style="font-weight: 400;">: You can use its query builder to create custom queries that filter logs and metrics based on specific criteria, such as CPU usage over a threshold or memory usage patterns.</span></li>

<li style="font-weight: 400;"><strong>Example Query</strong><span style="font-weight: 400;">: To find containers using more than 80% of their allocated memory:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">sql</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">SELECT</span><span style="font-weight: 400;"> * </span><span style="font-weight: 400;">FROM</span><span style="font-weight: 400;"> docker_metrics </span><span style="font-weight: 400;">WHERE</span><span style="font-weight: 400;"> memory_usage &gt; </span><span style="font-weight: 400;">0.8</span><span style="font-weight: 400;"> * memory_limit</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">3. Sample Log and Metric Queries for Dashboard Configuration</span></h3>

<p><span style="font-weight: 400;">Creating dashboards with relevant queries is essential for effective monitoring. Below are sample queries for configuring dashboards in OpenObserve and other platforms:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">CPU Usage Query:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">sql</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">SELECT</span><span style="font-weight: 400;"> container_name, cpu_usage </span><span style="font-weight: 400;">FROM</span><span style="font-weight: 400;"> docker_metrics </span><span style="font-weight: 400;">WHERE</span><span style="font-weight: 400;"> cpu_usage &gt; </span><span style="font-weight: 400;">75</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Memory Usage Query:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">sql</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">SELECT</span><span style="font-weight: 400;"> container_name, memory_usage </span><span style="font-weight: 400;">FROM</span><span style="font-weight: 400;"> docker_metrics </span><span style="font-weight: 400;">WHERE</span><span style="font-weight: 400;"> memory_usage &gt; memory_limit * </span><span style="font-weight: 400;">0.8</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Log Query for Errors:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">sql</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">SELECT</span><span style="font-weight: 400;"> * </span><span style="font-weight: 400;">FROM</span><span style="font-weight: 400;"> docker_logs </span><span style="font-weight: 400;">WHERE</span> <span style="font-weight: 400;">level</span><span style="font-weight: 400;"> = </span><span style="font-weight: 400;">'error'</span> <span style="font-weight: 400;">AND</span> <span style="font-weight: 400;">timestamp</span><span style="font-weight: 400;"> &gt; </span><span style="font-weight: 400;">NOW</span><span style="font-weight: 400;">() - </span><span style="font-weight: 400;">INTERVAL</span> <span style="font-weight: 400;">'1 hour'</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">These queries can be directly used in dashboard widgets to visualize real-time data and trends.</span></p>

<h3><span style="font-weight: 400;">Comparing Backend Systems</span></h3>

<h3><span style="font-weight: 400;">Features Comparison</span></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">OpenObserve:</span></li>

<ul>

<li style="font-weight: 400;"><strong>Query Builder</strong><span style="font-weight: 400;">: Intuitive and flexible for creating custom queries.</span></li>

<li style="font-weight: 400;"><strong>Dashboards</strong><span style="font-weight: 400;">: Supports real-time visualization with customizable widgets.</span></li>

<li style="font-weight: 400;"><strong>Alert Monitoring</strong><span style="font-weight: 400;">: Set alerts based on custom thresholds for metrics.</span></li>

<li style="font-weight: 400;"><strong>Integrations</strong><span style="font-weight: 400;">: Easily integrates with OpenTelemetry and other observability tools.</span></li>

</ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Sumo Logic:</span></li>

<ul>

<li style="font-weight: 400;"><strong>Query Builder</strong><span style="font-weight: 400;">: Advanced querying capabilities but may require a steeper learning curve.</span></li>

<li style="font-weight: 400;"><strong>Dashboards</strong><span style="font-weight: 400;">: Offers robust dashboarding features with extensive customization.</span></li>

<li style="font-weight: 400;"><strong>Alert Monitoring</strong><span style="font-weight: 400;">: Strong alerting features with machine learning capabilities.</span></li>

<li style="font-weight: 400;"><strong>Integrations</strong><span style="font-weight: 400;">: Integrates well with various cloud services but can be costly.</span></li>

</ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Uptrace:</span></li>

<ul>

<li style="font-weight: 400;"><strong>Query Builder</strong><span style="font-weight: 400;">: Focuses on distributed tracing, which may limit log and metric queries.</span></li>

<li style="font-weight: 400;"><strong>Dashboards</strong><span style="font-weight: 400;">: Provides tracing and metrics visualization but is less comprehensive for logs.</span></li>

<li style="font-weight: 400;"><strong>Alert Monitoring</strong><span style="font-weight: 400;">: Basic alerting capabilities compared to Sumo Logic and OpenObserve.</span></li>

<li style="font-weight: 400;"><strong>Integrations</strong><span style="font-weight: 400;">: Good integration with OpenTelemetry but less extensive than others.</span></li>

</ul>

</ul>

<p><span style="font-weight: 400;">The ability to configure dashboards with custom queries further empowers teams to maintain optimal performance and quickly address issues in their containerized environments.</span></p>

<p><span style="font-weight: 400;">OpenObserve stands out as a flexible and cost-effective solution for visualizing and analyzing Docker metrics, especially when compared to other platforms like Sumo Logic and Uptrace.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Maintenance and Troubleshooting</span></h2>

<p><span style="font-weight: 400;">The following steps will help you with maintenance and troubleshooting.</span></p>

<h3><span style="font-weight: 400;">Regular Updates to Docker Version for Support and New Features</span></h3>

<p><span style="font-weight: 400;">Keeping your Docker installation up to date is crucial for several reasons:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Security</strong><span style="font-weight: 400;">: New releases often include security patches that protect against vulnerabilities.</span></li>

<li style="font-weight: 400;"><strong>Performance Improvements</strong><span style="font-weight: 400;">: Updates may enhance the performance of Docker and the underlying container runtime.</span></li>

<li style="font-weight: 400;"><strong>New Features</strong><span style="font-weight: 400;">: Each new version of Docker may introduce new features that can improve metrics collection, monitoring capabilities, and overall functionality.</span></li>

<li style="font-weight: 400;"><strong>Compatibility</strong><span style="font-weight: 400;">: Ensuring compatibility with other tools and platforms, such as OpenTelemetry and OpenObserve, often requires running the latest versions.</span></li>

</ul>

<p><span style="font-weight: 400;">To update Docker, use the following commands based on your operating system:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">For Ubuntu:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sudo apt-</span><span style="font-weight: 400;">get</span><span style="font-weight: 400;"> update</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sudo apt-</span><span style="font-weight: 400;">get</span><span style="font-weight: 400;"> install docker-ce</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">For CentOS:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sudo yum update</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sudo yum </span><span style="font-weight: 400;">install </span><span style="font-weight: 400;">docker-ce</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">For Windows and macOS: Use the Docker Desktop application to check for updates.</span></li>

</ul>

<h3><span style="font-weight: 400;">Troubleshooting Common Issues in Docker Metrics Collection and Reporting</span></h3>

<p><span style="font-weight: 400;">When collecting and reporting Docker metrics, you may encounter several common issues. Here are some troubleshooting steps:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Metrics Not Appearing: Check Configuration</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Inaccurate Metrics: Resource Limits</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Performance Issues: High CPU/Memory Usage</span></li>

</ul>

<h3><span style="font-weight: 400;">OpenObserve Support</span><span style="font-weight: 400;">:</span></h3>

<ul>

<li style="font-weight: 400;"><a href="https://github.com/openobserve"><strong>GitHub Repository</strong></a><span style="font-weight: 400;">: OpenObserve's source code is available on </span><a href="https://github.com/OpenObserve/OpenObserve"><span style="font-weight: 400;">GitHub</span></a><span style="font-weight: 400;">, where you can find documentation, report issues, and contribute to the project. The repository is a valuable resource for troubleshooting and understanding the platform's inner workings.</span></li>

<li style="font-weight: 400;"><a href="https://discuss.openobserve.ai/"><strong>Community Support</strong></a><span style="font-weight: 400;">: Engaging with the OpenObserve community via GitHub discussions or forums can provide quick insights and solutions to common problems.</span></li>

<li style="font-weight: 400;"><strong>Faster Team Support</strong><span style="font-weight: 400;">: For enterprise users or those needing immediate assistance, OpenObserve offers dedicated support options.&nbsp;</span></li>

</ul>

<p><span style="font-weight: 400;">Regularly updating Docker is essential for maintaining security and performance. Utilizing resources like the OpenObserve GitHub repository and engaging with the community can significantly enhance your ability to maintain and troubleshoot Docker metrics effectively.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Key Performance Dashboards</span></h2>

<h3><span style="font-weight: 400;">Overview and CPU Usage Dashboards</span></h3>

<p><span style="font-weight: 400;">The Overview and CPU Usage dashboards provide a high-level summary of your Docker environment and detailed metrics on CPU utilization. These dashboards typically include:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Total CPU Consumed</strong><span style="font-weight: 400;">: Aggregated CPU usage across all containers.</span></li>

<li style="font-weight: 400;"><strong>CPU Usage by Container</strong><span style="font-weight: 400;">: Individual container CPU usage over time.</span></li>

<li style="font-weight: 400;"><strong>Docker Events</strong><span style="font-weight: 400;">: Timeline of significant events like container starts, stops, and failures.</span></li>

</ul>

<h3><span style="font-weight: 400;">Memory and Network Usage Dashboards</span></h3>

<p><span style="font-weight: 400;">The Memory and Network Usage dashboards dive deeper into resource consumption, focusing on memory utilization and network traffic. Key metrics include:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Memory Usage</strong><span style="font-weight: 400;">: Total memory used by containers vs available memory.</span></li>

<li style="font-weight: 400;"><strong>Memory Usage by Container</strong><span style="font-weight: 400;">: Per-container memory usage over time.</span></li>

<li style="font-weight: 400;"><strong>Network Rx/Tx Bytes</strong><span style="font-weight: 400;">: Aggregated network traffic in and out of containers.</span></li>

<li style="font-weight: 400;"><strong>Network Usage by Container</strong><span style="font-weight: 400;">: Individual container network usage.</span></li>

</ul>

<h3><span style="font-weight: 400;">Preconfigured Dashboards for Insights</span></h3>

<p><span style="font-weight: 400;">Many observability platforms, such as OpenObserve, provide preconfigured dashboards tailored for Docker monitoring. These dashboards offer immediate insights into container state and resource usage, allowing you to quickly identify issues and optimize performance.</span></p>

<h2><span style="font-weight: 400;">Summary</span></h2>

<p><span style="font-weight: 400;">Effective Docker metrics collection and monitoring are</span><strong> essential for ensuring the optimal performance</strong><span style="font-weight: 400;"> and health of containerized applications.&nbsp;</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">By closely observing </span><strong>key metrics like CPU usage, memory consumption, network I/O, and block I/O</strong><span style="font-weight: 400;">, you can identify performance bottlenecks, troubleshoot issues proactively, and optimize resource allocation.&nbsp;</span></li>

<li style="font-weight: 400;"><strong>Tools like OpenObserve provide invaluable support</strong><span style="font-weight: 400;"> in aggregating, visualizing, and analyzing these metrics, enabling data-driven decision-making.&nbsp;</span></li>

</ul>

<p><span style="font-weight: 400;">By implementing robust monitoring practices and leveraging advanced analytics, businesses can significantly enhance the reliability and efficiency of their Docker environments.</span></p>

<p><span style="font-weight: 400;">To gain deeper insights into your Docker environment and harness the power of effective monitoring, </span><a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">Sign up for OpenObserve today</span></a><span style="font-weight: 400;">.</span></p>

<h2><span style="font-weight: 400;">Resources</span></h2>

<ul>

<li style="font-weight: 400;"><a href="https://docs.docker.com/config/daemon/prometheus/"><span style="font-weight: 400;">Collect Docker metrics with Prometheus</span></a></li>

<li style="font-weight: 400;"><a href="https://signoz.io/blog/opentelemetry-docker/"><span style="font-weight: 400;">Monitoring Docker Containers Using OpenTelemetry</span></a></li>

<li style="font-weight: 400;"><a href="https://docs.docker.com/config/containers/runmetrics/"><span style="font-weight: 400;">Runtime metrics</span></a></li>

<li style="font-weight: 400;"><a href="https://uptrace.dev/get/monitor/opentelemetry-docker.html"><span style="font-weight: 400;">OpenTelemetry Docker Monitoring</span></a></li>

<li style="font-weight: 400;"><a href="https://docs.docker.com/engine/"><span style="font-weight: 400;">Docker Engine overview</span></a></li>

<li style="font-weight: 400;"><a href="https://docs.docker.com/reference/cli/docker/container/stats/"><span style="font-weight: 400;">Docker container stats</span></a></li>

<li style="font-weight: 400;"><a href="https://opentelemetry.io/docs/collector/"><span style="font-weight: 400;">Collector</span></a></li>

<li style="font-weight: 400;"><a href="https://github.com/open-telemetry/opentelemetry-collector"><span style="font-weight: 400;">GitHub OTEL</span></a></li>

<li style="font-weight: 400;"><a href="https://prometheus.io/docs/introduction/overview/"><span style="font-weight: 400;">Prometheus</span></a></li>

<li style="font-weight: 400;"><a href="https://grafana.com/docs/"><span style="font-weight: 400;">Grafana Technical documentation</span></a></li>

<li style="font-weight: 400;"><a href="https://betterstack.com/dashboards/open-telemetry"><span style="font-weight: 400;">OpenTelemetry</span></a></li>

<li style="font-weight: 400;"><a href="https://docs.bmc.com/docs/bhd/241/bmc-helix-opentelemetry-dashboards-1309883904.html"><span style="font-weight: 400;">BMC Helix OpenTelemetry dashboards</span></a></li>

<li style="font-weight: 400;"><a href="https://signoz.io/blog/opentelemetry-visualization/"><span style="font-weight: 400;">Getting Started with OpenTelemetry Visualization</span></a></li>

<li style="font-weight: 400;"><a href="https://docs.datadoghq.com/integrations/docker/"><span style="font-weight: 400;">Datadog Docs</span></a></li>

<li style="font-weight: 400;"><a href="https://hub.docker.com/"><span style="font-weight: 400;">Docker Hub</span></a></li>

<li style="font-weight: 400;"><a href="https://www.elastic.co/what-is/observability"><span style="font-weight: 400;">What is Observability</span></a></li>

</ul>
