---
title: Monitoring Zookeeper with OpenTelemetry Setup
seoTitle: Monitoring Zookeeper with OpenTelemetry Setup
description: Setup and configure a Zookeeper Receiver via OpenTelemetry
  Collector, and get critical monitoring metrics from your Zookeeper
  installations.
img: /img/resources/monitoring-zookeeper-with-opentelemetry-setup.png
alt: Zookeeper Receiver
slug: Zookeeper Receiver Monitoring
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - Zookeeper
  - OpenTelemetry
---
<p><span style="font-weight: 400;">ZooKeeper isn't just another tool; it's the conductor, the timekeeper, and the librarian for distributed applications. It maintains order, synchronizes actions, and ensures everyone has the right information at the right time.</span></p>

<p><span style="font-weight: 400;">Apache ZooKeeper is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services in distributed applications.&nbsp;</span></p>

<p><span style="font-weight: 400;">Given its crucial role in managing distributed systems, monitoring ZooKeeper effectively is essential. Proper monitoring helps detect issues early, maintain system health, and optimize resource usage.</span></p>

<h3><span style="font-weight: 400;">Benefits of Using OpenTelemetry</span></h3>

<p><span style="font-weight: 400;">OpenTelemetry is an open-source observability framework that provides a standardized way to collect, process, and export telemetry data, including metrics, logs, and traces. The benefits of using OpenTelemetry for monitoring ZooKeeper include:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Vendor-Neutral</strong><span style="font-weight: 400;">: OpenTelemetry supports multiple backends, allowing organizations to choose their preferred observability tools without being locked into a single vendor.</span></li>

<li style="font-weight: 400;"><strong>Unified Data Collection</strong><span style="font-weight: 400;">: It enables the collection of various telemetry data types, offering a holistic view of application performance and health.</span></li>

<li style="font-weight: 400;"><strong>Flexibility and Extensibility</strong><span style="font-weight: 400;">: OpenTelemetry can be easily extended to support custom metrics and traces, adapting to specific monitoring needs.</span></li>

<li style="font-weight: 400;"><strong>Community Support</strong><span style="font-weight: 400;">: As a widely adopted framework, OpenTelemetry benefits from a large community, ensuring ongoing development, support, and integration with other tools.</span></li>

</ul>

<h3><span style="font-weight: 400;">Tools and Technologies Involved in Monitoring</span></h3>

<p><span style="font-weight: 400;">To effectively monitor ZooKeeper using OpenTelemetry, several tools and technologies are involved:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Apache ZooKeeper</strong><span style="font-weight: 400;">: The core service being monitored, responsible for managing distributed applications.</span></li>

<li style="font-weight: 400;"><strong>OpenTelemetry Collector</strong><span style="font-weight: 400;">: A component that receives, processes, and exports telemetry data from ZooKeeper.</span></li>

<li style="font-weight: 400;"><strong>Prometheus</strong><span style="font-weight: 400;">: A monitoring system and time-series database that can scrape metrics from ZooKeeper and provide alerts.</span></li>

<li style="font-weight: 400;"><strong>OpenObserve</strong><span style="font-weight: 400;">: An observability platform that enables visualization and analysis of telemetry data, enhancing insights into system performance.</span></li>

</ul>

<h3><span style="font-weight: 400;">OpenObserve&rsquo;s Expertise &amp; Advantages in OpenTelemetry</span></h3>

<p><span style="font-weight: 400;">OpenObserve is a powerful observability platform that complements OpenTelemetry by providing advanced features for data visualization and analysis. Its advantages include:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Cost-Effective Storage</strong><span style="font-weight: 400;">: OpenObserve offers significant cost savings on storage compared to traditional solutions, making it an attractive option for managing large volumes of telemetry data.</span></li>

<li style="font-weight: 400;"><strong>User-Friendly Interface</strong><span style="font-weight: 400;">: The platform provides an intuitive interface for exploring and analyzing metrics, making it easier for teams to derive actionable insights.</span></li>

<li style="font-weight: 400;"><strong>Real-Time Analytics</strong><span style="font-weight: 400;">: OpenObserve supports real-time data processing, allowing users to monitor ZooKeeper performance and respond to issues as they arise.</span></li>

<li style="font-weight: 400;"><strong>Seamless Integration</strong><span style="font-weight: 400;">: OpenObserve integrates smoothly with OpenTelemetry, enabling users to leverage the strengths of both tools for comprehensive observability.</span></li>

</ul>

<p><span style="font-weight: 400;">Let&rsquo;s explore each step on monitoring Zookeeper with Open Telemetry in detail.</span></p>

<h2><span style="font-weight: 400;">Prerequisites</span></h2>

<p><span style="font-weight: 400;">Before setting up monitoring for ZooKeeper using OpenTelemetry, ensure that you meet the following prerequisites:</span></p>

<h3><span style="font-weight: 400;">ZooKeeper Version Compatibility</span></h3>

<p><span style="font-weight: 400;">The monitoring setup described in this guide requires ZooKeeper version 3.6.0 or later. Earlier versions may not provide the necessary metrics or compatibility with the Prometheus exporter. Ensure that your ZooKeeper deployment meets this version requirement.</span></p>

<h3><span style="font-weight: 400;">Pre-configuring the OpenTelemetry Collector</span></h3>

<p><span style="font-weight: 400;">The OpenTelemetry Collector is a crucial component in the monitoring setup, responsible for receiving, processing, and exporting telemetry data from ZooKeeper.&nbsp;</span></p>

<p><span style="font-weight: 400;">Before proceeding with the configuration, make sure you have the OpenTelemetry Collector installed and pre-configured to handle the necessary tasks.</span></p>

<p><span style="font-weight: 400;">The pre-configuration steps for the OpenTelemetry Collector include:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Installing the OpenTelemetry Collector</strong><span style="font-weight: 400;">: Follow the official installation guide for your operating system to set up the OpenTelemetry Collector.</span></li>

<li style="font-weight: 400;"><strong>Configuring the Collector</strong><span style="font-weight: 400;">: Create a configuration file (e.g., </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;">) that defines the receivers, processors, and exporters for your monitoring setup. This file will be used in subsequent steps to configure the ZooKeeper receiver and export metrics to the desired destination, such as OpenObserve or other observability platforms.</span></li>

<li style="font-weight: 400;"><strong>Ensuring the Collector is Running</strong><span style="font-weight: 400;">: Verify that the OpenTelemetry Collector is running and ready to receive data from ZooKeeper. You can start the Collector using the appropriate command for your operating system, as specified in the installation guide.</span></li>

</ol>

<p><span style="font-weight: 400;">By meeting these prerequisites, you'll have a solid foundation for setting up monitoring for ZooKeeper using OpenTelemetry and OpenObserve.&nbsp;</span></p>

<p><span style="font-weight: 400;">The next steps will guide you through configuring ZooKeeper to use the Prometheus exporter and setting up the ZooKeeper receiver in the OpenTelemetry Collector.</span></p>

<h2><span style="font-weight: 400;">Configuring ZooKeeper to Use Prometheus Exporter</span></h2>

<p><span style="font-weight: 400;">To enable monitoring of ZooKeeper using OpenTelemetry, you need to configure ZooKeeper to expose metrics in a format that can be scraped by the OpenTelemetry Collector. In this setup, we'll use the Prometheus exporter provided by ZooKeeper.</span></p>

<h2><span style="font-weight: 400;">Adding PrometheusMetricsProvider to </span><span style="font-weight: 400;">zoo.cfg</span></h2>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Open the </span><span style="font-weight: 400;">zoo.cfg</span><span style="font-weight: 400;"> configuration file for your ZooKeeper installation.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Add the following line to enable the Prometheus Metrics Provider:</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">metricsProvider.className=org</span><span style="font-weight: 400;">.apache.zookeeper.metrics.prometheus.PrometheusMetricsProvider</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Set the HTTP port for the Prometheus exporter (default is 7000):</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">metricsProvider.</span><span style="font-weight: 400;">httpPort</span><span style="font-weight: 400;">=7000</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Save the changes to the </span><span style="font-weight: 400;">zoo.cfg</span><span style="font-weight: 400;"> file.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Restart ZooKeeper for the changes to take effect.</span></li>

</ol>

<h3><span style="font-weight: 400;">Reference to Official ZooKeeper Documentation</span></h3>

<p><span style="font-weight: 400;">For detailed configuration steps and additional options, refer to the official ZooKeeper documentation on monitoring:</span></p>

<p><a href="https://zookeeper.apache.org/doc/r3.9.2/zookeeperMonitor.html"><span style="font-weight: 400;">ZooKeeper Monitoring</span></a></p>

<p><span style="font-weight: 400;">This documentation provides more information on enabling the Prometheus exporter, configuring the HTTP port, and understanding the available metrics.</span></p>

<p><span style="font-weight: 400;">By following these steps and enabling the PrometheusMetricsProvider in ZooKeeper, you'll ensure that the necessary metrics are exposed and ready to be scrapped by the OpenTelemetry Collector for monitoring and analysis in OpenObserve.</span></p>

<h2><span style="font-weight: 400;">Setting Up the ZooKeeper Receiver</span></h2>

<p><span style="font-weight: 400;">To effectively monitor ZooKeeper, you need to set up the ZooKeeper receiver in the OpenTelemetry Collector. This involves configuring the collector to scrape metrics from your ZooKeeper instances.</span></p>

<h3><span style="font-weight: 400;">Installation Locations of the Config File</span></h3>

<p><span style="font-weight: 400;">The configuration file for the OpenTelemetry Collector, typically named </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;">, is located in different directories depending on your operating system. Ensure you know the correct path to modify the configuration as needed:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Windows:Path of </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">C:\Program Files\OpenObserve OpenTelemetry Collector\config.yaml</span></li>

</ul>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Linux:Path of </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">/opt/OpenObserve-otel-collector/config.yaml</span></li>

</ul>

<p><span style="font-weight: 400;">Once you have located the configuration file, you will proceed to configure the ZooKeeper receiver in the OpenTelemetry Collector.&nbsp;</span></p>

<p><span style="font-weight: 400;">This involves specifying the necessary attributes and scrape targets to collect metrics from your ZooKeeper instances. The following sections will guide you through the receiver configuration process.</span></p>

<h2><span style="font-weight: 400;">Receiver Configuration</span></h2>

<p><span style="font-weight: 400;">In this section, we'll walk through the steps to configure the Prometheus receiver in the OpenTelemetry Collector configuration file. This receiver will be responsible for scraping metrics from your ZooKeeper instances.</span></p>

<h3><span style="font-weight: 400;">Steps to Configure the Prometheus Receiver</span></h3>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Open the OpenTelemetry Collector configuration file (e.g., </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;">) located in the appropriate directory based on your operating system.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Under the </span><span style="font-weight: 400;">receivers</span><span style="font-weight: 400;"> section, add the configuration for the Prometheus receiver:</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">prometheus</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">config</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">scrape_configs</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - </span><span style="font-weight: 400;">job_name</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">'zookeeper'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">static_configs</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - </span><span style="font-weight: 400;">targets</span><span style="font-weight: 400;">: [</span><span style="font-weight: 400;">'192.168.10.32:7000'</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">'192.168.10.33:7000'</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">'192.168.10.34:7000'</span><span style="font-weight: 400;">]</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Adjust the </span><span style="font-weight: 400;">targets</span><span style="font-weight: 400;"> attribute to include the correct IP addresses and ports of your ZooKeeper instances. Ensure that the port matches the one specified in the </span><span style="font-weight: 400;">zoo.cfg</span><span style="font-weight: 400;"> file when enabling the Prometheus exporter (default is 7000).</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Save the changes to the configuration file.</span></li>

</ol>

<h3><span style="font-weight: 400;">Attributes to Set for the Receiver</span></h3>

<p><span style="font-weight: 400;">The Prometheus receiver in the OpenTelemetry Collector supports various attributes to customize its behavior. Some key attributes include:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">config</span><span style="font-weight: 400;">: Specifies the Prometheus-specific configuration, such as </span><span style="font-weight: 400;">scrape_configs</span><span style="font-weight: 400;">.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">endpoint</span><span style="font-weight: 400;">: Sets the address on which the receiver should listen for Prometheus scrape requests.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">read_buffer_size</span><span style="font-weight: 400;">: Adjusts the read buffer size for the HTTP server.</span></li>

</ul>

<p><span style="font-weight: 400;">Refer to the OpenTelemetry Collector documentation for a complete list of available attributes and their descriptions.</span></p>

<h3><span style="font-weight: 400;">Example Configuration File</span></h3>

<p><span style="font-weight: 400;">Here's an example of a complete </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;"> file with the Prometheus receiver configured:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">prometheus</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">config</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">scrape_configs</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - </span><span style="font-weight: 400;">job_name</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">'zookeeper'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">static_configs</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - </span><span style="font-weight: 400;">targets</span><span style="font-weight: 400;">: [</span><span style="font-weight: 400;">'192.168.10.32:7000'</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">'192.168.10.33:7000'</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">'192.168.10.34:7000'</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">processors</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">batch</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">resourcedetection</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">otlp</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">endpoint</span><span style="font-weight: 400;">: api.openobserve.</span><span style="font-weight: 400;">ai</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;">4317</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">tls</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">insecure</span><span style="font-weight: 400;">: true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">pipelines</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">metrics</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">receivers</span><span style="font-weight: 400;">: \[prometheus]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">processors</span><span style="font-weight: 400;">: \[batch, resourcedetection]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">exporters</span><span style="font-weight: 400;">: \[otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This configuration sets up the Prometheus receiver to scrape metrics from the specified ZooKeeper instances, processes the metrics using the batch and resource detection processors, and exports the metrics to OpenObserve using the OTLP exporter.&nbsp;</span></p>

<p><span style="font-weight: 400;">The following section will guide you through the processor configuration process.</span></p>

<h2><span style="font-weight: 400;">Processor Configuration</span></h2>

<p><span style="font-weight: 400;">In this section, we will configure the processors in the OpenTelemetry Collector to enhance the handling of metrics collected from ZooKeeper. Two essential processors are the Resource Detection Processor and the Batch Processor.</span></p>

<h3><span style="font-weight: 400;">Resource Detection Processor: Distinguishing Metrics from Multiple Hosts</span></h3>

<p><span style="font-weight: 400;">The Resource Detection Processor is crucial for identifying and labeling metrics from different ZooKeeper instances. This processor helps ensure that metrics are tagged with the appropriate resource attributes, making it easier to distinguish between metrics originating from various hosts.</span></p>

<p><span style="font-weight: 400;">To configure the Resource Detection Processor, add the following to your </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;"> file under the </span><span style="font-weight: 400;">processors</span><span style="font-weight: 400;"> section:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; resourcedetection:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; detectors:</span><span style="font-weight: 400;"> \[system]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This configuration uses the </span><span style="font-weight: 400;">system</span><span style="font-weight: 400;"> detector, which automatically identifies and labels the host attributes such as hostname, IP address, and other relevant metadata.</span></p>

<h3><span style="font-weight: 400;">Batch Processor: Bundling Metrics from Multiple Receivers</span></h3>

<p><span style="font-weight: 400;">The Batch Processor is used to optimize the processing of metrics by bundling them together before exporting. This can improve performance and reduce the load on the destination by minimizing the number of outgoing requests.</span></p>

<p><span style="font-weight: 400;">To configure the Batch Processor, add the following to your </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;"> file:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; timeout:</span> <span style="font-weight: 400;">5</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; send_batch_size:</span> <span style="font-weight: 400;">100</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this configuration:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">timeout</span><span style="font-weight: 400;">: Specifies the maximum time to wait before sending a batch of metrics.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">send_batch_size</span><span style="font-weight: 400;">: Defines the maximum number of metrics to include in a single batch.</span></li>

</ul>

<h3><span style="font-weight: 400;">Documentation Links for More Detailed Configuration Steps</span></h3>

<p><span style="font-weight: 400;">For more detailed information on configuring processors in the OpenTelemetry Collector, refer to the official documentation:</span></p>

<ul>

<li style="font-weight: 400;"><a href="https://opentelemetry.io/docs/collector/configuration/#processors"><span style="font-weight: 400;">OpenTelemetry Collector - Processors</span></a></li>

<li style="font-weight: 400;"><a href="https://opentelemetry.io/docs/collector/configuration/#resourcedetectionprocessor"><span style="font-weight: 400;">Resource Detection Processor</span></a></li>

<li style="font-weight: 400;"><a href="https://opentelemetry.io/docs/collector/configuration/#batchprocessor"><span style="font-weight: 400;">Batch Processor</span></a></li>

</ul>

<p><span style="font-weight: 400;">These resources provide comprehensive guidance on the available options and best practices for configuring processors in the OpenTelemetry Collector.&nbsp;</span></p>

<p><span style="font-weight: 400;">&nbsp;The following section will guide you through the exporter configuration process.</span></p>

<h2><span style="font-weight: 400;">Exporter Configuration</span></h2>

<p><span style="font-weight: 400;">In this section, we will configure the OpenTelemetry Collector to export metrics to various destinations, including OpenObserve, using the OpenTelemetry Protocol (OTLP) exporter.</span></p>

<h3><span style="font-weight: 400;">Exporting Metrics to Destinations (e.g., OpenObserve) Using OTLP Exporter</span></h3>

<p><span style="font-weight: 400;">The OTLP exporter is a versatile component that allows the OpenTelemetry Collector to send telemetry data to multiple backends. Here&rsquo;s how to configure it for both OpenObserve:</span></p>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">OpenObserve Configuration:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">To export metrics to OpenObserve, add the following configuration under the </span><span style="font-weight: 400;">exporters</span><span style="font-weight: 400;"> section of your </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;"> file:</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp/</span><span style="font-weight: 400;">openobserve</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">endpoint</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">https</span><span style="font-weight: 400;">:</span><em><span style="font-weight: 400;">//api.openobserve.ai/api/&lt;your-org&gt;/v1/metrics</span></em><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">headers</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">Authorization</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">"Basic &lt;your_base64_encoded_credentials&gt;"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">stream-name</span><span style="font-weight: 400;">: </span><span style="font-weight: 400;">"default"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Replace </span><span style="font-weight: 400;">&lt;your-org&gt;</span><span style="font-weight: 400;"> with your organization name and </span><span style="font-weight: 400;">&lt;your_base64_encoded_credentials&gt;</span><span style="font-weight: 400;"> with the appropriate credentials for authentication.</span><span style="font-weight: 400;">Supported Destinations and Their Configurations</span></p>

<p><span style="font-weight: 400;">The OpenTelemetry Collector supports various destinations for exporting telemetry data. Here are some common configurations:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">OpenObserve:</span></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Protocol: OTLP HTTP or OTLP gRPC</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Endpoints:</span></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTLP HTTP: </span><span style="font-weight: 400;">https://api.openobserve.ai/api/&lt;your-org&gt;/v1/metrics</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTLP gRPC: </span><span style="font-weight: 400;">localhost:5081</span></li>

</ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Authentication: Basic Auth with encoded credentialsFor detailed configuration options and best practices, refer to the following documentation:</span></li>

</ul>

</ul>

<ul>

<li style="font-weight: 400;"><a href="https://openobserve.ai/docs/ingestion/logs/otlp/"><span style="font-weight: 400;">OpenObserve OTLP Ingestion Documentation</span></a></li>

</ul>

<p><span style="font-weight: 400;">By configuring the OTLP exporter correctly, you can ensure that your ZooKeeper metrics are sent to the desired observability platforms.</span></p>

<p><span style="font-weight: 400;">The following section will guide you through the process of setting up the pipeline.</span></p>

<h2><span style="font-weight: 400;">Setting up the Pipeline</span></h2>

<p><span style="font-weight: 400;">In this section, we will configure the OpenTelemetry Collector pipeline to include the ZooKeeper receiver, ensuring that the collected metrics are processed and exported correctly.</span></p>

<h3><span style="font-weight: 400;">Adding the Configured Receiver to the Pipeline</span></h3>

<p><span style="font-weight: 400;">To set up the pipeline, you need to specify the receivers, processors, and exporters in the </span><span style="font-weight: 400;">service</span><span style="font-weight: 400;"> section of your </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;"> file. Here&rsquo;s how to add the configured ZooKeeper receiver to the pipeline:</span></p>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Open the </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;"> file where you have defined the Prometheus receiver and processors.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Locate the </span><span style="font-weight: 400;">service</span><span style="font-weight: 400;"> section and ensure it includes the pipeline configuration. It should look similar to the following:</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers:</span><span style="font-weight: 400;"> \[prometheus]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors:</span><span style="font-weight: 400;"> \[batch, resourcedetection]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters:</span><span style="font-weight: 400;"> \[otlp/openobserve, otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this configuration:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><span style="font-weight: 400;">metrics</span><span style="font-weight: 400;"> pipeline is defined to include the </span><span style="font-weight: 400;">prometheus</span><span style="font-weight: 400;"> receiver.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><span style="font-weight: 400;">batch</span><span style="font-weight: 400;"> and </span><span style="font-weight: 400;">resourcedetection</span><span style="font-weight: 400;"> processors are applied to the collected metrics.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The metrics are exported to both OpenObserveusing the OTLP exporter.</span></li>

</ul>

<h3><span style="font-weight: 400;">Instructions for Enabling the ZooKeeper Receiver</span></h3>

<p><span style="font-weight: 400;">After configuring the pipeline, follow these steps to ensure the ZooKeeper receiver is enabled and functioning:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Save the Changes</strong><span style="font-weight: 400;">: After modifying the </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;"> file, save your changes.</span></li>

<li style="font-weight: 400;"><strong>Restart the OpenTelemetry Collector</strong><span style="font-weight: 400;">: To apply the new configuration, restart the OpenTelemetry Collector. You can do this using the appropriate command for your operating system, such as:</span></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Windows:</span></li>

</ul>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">net </span><span style="font-weight: 400;">stop</span> <span style="font-weight: 400;">"OpenObserve OpenTelemetry Collector"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">net </span><span style="font-weight: 400;">start</span> <span style="font-weight: 400;">"OpenObserve OpenTelemetry Collector"</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Linux:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sudo</span><span style="font-weight: 400;"> systemctl restart OpenObserve-otel-collector</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Verify the Receiver is Active</strong><span style="font-weight: 400;">: After restarting, check the logs of the OpenTelemetry Collector to confirm that the ZooKeeper receiver is active and successfully scraping metrics. Look for log entries indicating that the receiver is running and the scrape targets are being processed.</span></li>

<li style="font-weight: 400;"><strong>Monitor the Metrics</strong><span style="font-weight: 400;">: Once the receiver is enabled, you can navigate to your observability platform (OpenObserve) to verify that ZooKeeper metrics are being received and displayed correctly.</span></li>

</ol>

<p><span style="font-weight: 400;">By following these steps, you ensure that metrics are collected, processed, and exported to your chosen observability platforms.</span></p>

<p><span style="font-weight: 400;">The following section will guide you through the process of validating metrics.</span></p>

<h2><span style="font-weight: 400;">Validating Metrics</span></h2>

<p><span style="font-weight: 400;">After setting up the OpenTelemetry Collector to monitor ZooKeeper, it&rsquo;s essential to validate that the metrics are being collected and exported correctly. This section outlines how to check the metrics in OpenObserve and ensure everything is functioning as expected.</span></p>

<h3><span style="font-weight: 400;">Navigating to Metrics Details Page in OpenObserve Settings</span></h3>

<ol>

<li style="font-weight: 400;"><strong>Log in to OpenObserve</strong><span style="font-weight: 400;">: Access your OpenObserve instance by navigating to the web interface and logging in with your credentials.</span></li>

<li style="font-weight: 400;"><strong>Navigate to the Metrics Section</strong><span style="font-weight: 400;">: Once logged in, locate the metrics dashboard or metrics details page. This is typically found in the main menu under "Metrics" or "Observability."</span></li>

<li style="font-weight: 400;"><strong>Select the Relevant Workspace</strong><span style="font-weight: 400;">: If you have multiple workspaces, ensure you select the workspace where your ZooKeeper metrics are being sent.</span></li>

</ol>

<h3><span style="font-weight: 400;">Searching for Specific ZooKeeper Metric Names</span></h3>

<ol>

<li style="font-weight: 400;"><strong>Use the Search Functionality</strong><span style="font-weight: 400;">: In the metrics dashboard, utilize the search bar to filter for specific ZooKeeper metric names. Common metric names you might look for include:</span></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_requests</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_latency</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_connections</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_sessions</span></li>

</ul>

<li style="font-weight: 400;"><strong>Examine the Metrics</strong><span style="font-weight: 400;">: After entering the metric names, review the displayed metrics to ensure they are being populated with data. You should see time-series graphs or tables showing the metrics over time.</span></li>

<li style="font-weight: 400;"><strong>Check for Anomalies</strong><span style="font-weight: 400;">: Look for any unusual spikes or drops in the metrics, which could indicate issues with your ZooKeeper instances or the monitoring setup.</span></li>

</ol>

<h3><span style="font-weight: 400;">Viewing and Editing Receiver's Metadata File for Emitted Metrics</span></h3>

<ol>

<li style="font-weight: 400;"><strong>Locate the Metadata File</strong><span style="font-weight: 400;">: The OpenTelemetry Collector may generate a metadata file that contains information about the emitted metrics. This file is typically located in the collector's configuration directory or a specified output directory.</span></li>

<li style="font-weight: 400;"><strong>Open the Metadata File</strong><span style="font-weight: 400;">: Use a text editor to open the metadata file. This file should contain details about the metrics being emitted, including their names, types, and any associated labels.</span></li>

<li style="font-weight: 400;"><strong>Edit the Metadata (if necessary)</strong><span style="font-weight: 400;">: If you need to adjust the metadata for any reason (e.g., renaming metrics or adding labels), make the necessary changes in the metadata file. Ensure that any changes align with your monitoring and observability requirements.</span></li>

<li style="font-weight: 400;"><strong>Save Changes and Restart the Collector</strong><span style="font-weight: 400;">: After editing the metadata file, save your changes and restart the OpenTelemetry Collector to apply the updates.</span></li>

</ol>

<p><span style="font-weight: 400;">By following these steps, you can validate that your ZooKeeper metrics are being collected correctly.&nbsp;</span></p>

<p><span style="font-weight: 400;">The following section will guide you through the process of viewing and analyzing metrics.</span></p>

<h2><span style="font-weight: 400;">Viewing and Analyzing Metrics</span></h2>

<p><span style="font-weight: 400;">Once you have validated that metrics are being collected from ZooKeeper, the next step is to view and analyze these metrics effectively. This section will cover the list of metrics you can expect to see and how to create a dashboard using OpenObserve's features.</span></p>

<h3><span style="font-weight: 400;">List of Metrics Scraped by the ZooKeeper Receiver</span></h3>

<p><span style="font-weight: 400;">The ZooKeeper receiver collects a variety of metrics that provide insights into the performance and health of your ZooKeeper instances. Here are some common metrics you may encounter:</span></p>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_requests</span><span style="font-weight: 400;">: The total number of requests processed by the ZooKeeper server.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_latency</span><span style="font-weight: 400;">: The latency of requests, typically measured in milliseconds. This can help identify performance bottlenecks.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_connections</span><span style="font-weight: 400;">: The number of active connections to the ZooKeeper server.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_sessions</span><span style="font-weight: 400;">: The number of active sessions currently managed by the ZooKeeper instance.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_leader_election</span><span style="font-weight: 400;">: Metrics related to leader election processes, which can indicate stability within the cluster.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_data_size</span><span style="font-weight: 400;">: The size of the data being managed by ZooKeeper, providing insights into resource usage.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_watch_count</span><span style="font-weight: 400;">: The number of active watches set by clients, which can affect performance.</span></li>

</ol>

<p><span style="font-weight: 400;">These metrics can help you monitor the overall health of your ZooKeeper setup and identify any potential issues that may arise.</span></p>

<h3><span style="font-weight: 400;">Creating a Dashboard for the Metrics Using OpenObserve's Dashboard Features</span></h3>

<p><span style="font-weight: 400;">Creating a dashboard in OpenObserve allows you to visualize and analyze the metrics collected from ZooKeeper effectively. Follow these steps to set up a dashboard:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Access the Dashboard Feature</strong><span style="font-weight: 400;">: Log in to your OpenObserve instance and navigate to the dashboard section, usually found in the main menu.</span></li>

<li style="font-weight: 400;"><strong>Create a New Dashboard</strong><span style="font-weight: 400;">:Click on the option to create a new dashboard.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Add Metrics to the Dashboard:Use the search functionality to find the ZooKeeper metrics you want to include.</span></li>

<li style="font-weight: 400;"><strong>Customize the Dashboard Layout</strong><span style="font-weight: 400;">:Arrange the metrics on the dashboard according to your preferences. You can resize and move the visualizations to create a layout that best suits your monitoring needs.</span></li>

<li style="font-weight: 400;"><strong>Save the Dashboard</strong><span style="font-weight: 400;">: Once you have added and arranged the metrics, save the dashboard. You can now access it anytime to monitor the performance of your ZooKeeper instances.</span></li>

</ol>

<p><span style="font-weight: 400;">By following these steps, you can effectively view and analyze the metrics scraped by the ZooKeeper receiver in OpenObserve, enabling insights into the performance of your ZooKeeper setup.</span></p>

<p><span style="font-weight: 400;">The final section will guide you through alerting configuration.</span></p>

<h2><span style="font-weight: 400;">Alerting Configuration</span></h2>

<p><span style="font-weight: 400;">By configuring alerts based on specific metrics, you can proactively address issues before they escalate. This section outlines how to set up alerting rules for ZooKeeper metrics in OpenObserve.</span></p>

<h3><span style="font-weight: 400;">Effective Configuration of Alerts</span></h3>

<ol>

<li style="font-weight: 400;"><strong>Identify Key Metrics for Alerting</strong><span style="font-weight: 400;">: Determine which ZooKeeper metrics are critical for your application's performance and reliability. Common metrics to monitor include:</span></li>

</ol>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_requests</span><span style="font-weight: 400;">: Total number of requests processed.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_latency</span><span style="font-weight: 400;">: Average latency of requests.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_connections</span><span style="font-weight: 400;">: Number of active connections.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_sessions</span><span style="font-weight: 400;">: Number of active sessions.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">zookeeper_watch_count</span><span style="font-weight: 400;">: Number of active watches.</span></li>

</ul>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Define Alert Thresholds: Establish thresholds for each key metric that, when exceeded, will trigger alerts. For example:</span></li>

</ol>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Trigger an alert if average latency exceeds 100 milliseconds.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Alert if the number of active connections exceeds the maximum allowed (e.g., 60).</span></li>

</ul>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Set Alert Severity Levels: Classify alerts by severity (e.g., critical, warning) to prioritize responses. Critical alerts may require immediate action, while warnings can indicate potential issues that should be monitored.</span></li>

</ol>

<h3><span style="font-weight: 400;">Setting Alerting Rules for ZooKeeper Metrics in OpenObserve</span></h3>

<p><span style="font-weight: 400;">To configure alerting rules for ZooKeeper metrics in OpenObserve, follow these steps:</span></p>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Access the Alerting Configuration: Log in to your OpenObserve instance and navigate to the alerting configuration section.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Create New Alerting Rules:Click on the option to add a new alert rule.</span></li>

</ol>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Click on the option to add a new alert rule.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Specify the metric you want to monitor (e.g., </span><span style="font-weight: 400;">zookeeper_latency</span><span style="font-weight: 400;">).</span></li>

</ul>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Define the Alert Condition: Enter the condition for triggering the alert. For example, to alert on high latency:</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">alert:</span> <span style="font-weight: 400;">HighZooKeeperLatency</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">expr:</span> <span style="font-weight: 400;">zookeeper_latency</span> <span style="font-weight: 400;">&gt; 100</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">for:</span> <span style="font-weight: 400;">5</span><span style="font-weight: 400;">m</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">labels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; severity:</span> <span style="font-weight: 400;">warning</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">annotations:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; summary:</span> <span style="font-weight: 400;">"High latency detected for ZooKeeper instance </span><span style="font-weight: 400;">{{ $labels.instance }}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; description:</span> <span style="font-weight: 400;">"The average latency for ZooKeeper instance </span><span style="font-weight: 400;">{{ $labels.instance }}</span><span style="font-weight: 400;"> has exceeded 100ms."</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Set Notification Channels: Configure how you want to be notified when an alert is triggered. This could include email notifications, Slack messages, or integrations with incident management tools.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Save and Activate the Alerting Rules: After defining the rules, save your configurations and activate the alerts. Ensure that the alerting mechanism is functioning correctly by testing it with known conditions.</span></li>

</ol>

<h3><span style="font-weight: 400;">Example Alerting Rules</span></h3>

<p><span style="font-weight: 400;">Here are some example alerting rules you might consider implementing:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">- alert:</span> <span style="font-weight: 400;">ZooKeeperServerDown</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; expr:</span> <span style="font-weight: 400;">up</span> <span style="font-weight: 400;">==</span> <span style="font-weight: 400;">0</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; for:</span> <span style="font-weight: 400;">1</span><span style="font-weight: 400;">m</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; labels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; severity:</span> <span style="font-weight: 400;">critical</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; annotations:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; summary:</span> <span style="font-weight: 400;">"ZooKeeper server is down"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; description:</span> <span style="font-weight: 400;">"The ZooKeeper server at instance </span><span style="font-weight: 400;">{{ $labels.instance }}</span><span style="font-weight: 400;"> is not reachable."</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">- alert:</span> <span style="font-weight: 400;">TooManyConnections</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; expr:</span> <span style="font-weight: 400;">zookeeper_connections</span> <span style="font-weight: 400;">&gt; 60</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; for:</span> <span style="font-weight: 400;">1</span><span style="font-weight: 400;">m</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; labels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; severity:</span> <span style="font-weight: 400;">warning</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; annotations:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; summary:</span> <span style="font-weight: 400;">"Too many connections to ZooKeeper"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; description:</span> <span style="font-weight: 400;">"The number of active connections to ZooKeeper instance </span><span style="font-weight: 400;">{{ $labels.instance }}</span><span style="font-weight: 400;"> exceeds the limit."</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">- alert:</span> <span style="font-weight: 400;">HighZnodeCount</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; expr:</span> <span style="font-weight: 400;">znode_count</span> <span style="font-weight: 400;">&gt; 1000000</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; for:</span> <span style="font-weight: 400;">1</span><span style="font-weight: 400;">m</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; labels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; severity:</span> <span style="font-weight: 400;">warning</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; annotations:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; summary:</span> <span style="font-weight: 400;">"High znode count"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; description:</span> <span style="font-weight: 400;">"The znode count for ZooKeeper instance </span><span style="font-weight: 400;">{{ $labels.instance }}</span><span style="font-weight: 400;"> has exceeded 1,000,000."</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By effectively configuring alerts for your ZooKeeper metrics, you can ensure timely responses to potential issues.</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">In this guide, we have explored the benefits and steps involved in monitoring Apache ZooKeeper using OpenTelemetry and OpenObserve.&nbsp;</span></p>

<p><span style="font-weight: 400;">By leveraging these powerful tools, you can gain comprehensive insights into the health and performance of your ZooKeeper instances, ensuring the reliability and efficiency of your distributed applications.</span></p>

<p><span style="font-weight: 400;">Some key takeaways from this guide:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">OpenTelemetry provides a </span><strong>vendor-neutral and flexible way to collect and export telemetry data from ZooKeeper</strong><span style="font-weight: 400;">, while OpenObserve offers a cost-effective and user-friendly platform for visualizing and analyzing this data.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">By configuring the ZooKeeper receiver in the OpenTelemetry Collector and exporting metrics to OpenObserve, you can </span><strong>monitor critical metrics</strong><span style="font-weight: 400;"> such as request latency, connection counts, session timeouts, and more.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Setting up alerting rules in OpenObserve allows you to </span><strong>proactively detect and address issues before they impact</strong><span style="font-weight: 400;"> your applications, reducing downtime and ensuring optimal performance.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>combination of OpenTelemetry's data collection capabilities and OpenObserve's observability features</strong><span style="font-weight: 400;"> provides a powerful solution for monitoring ZooKeeper in a variety of environments, from on-premises to cloud-based deployments.</span></li>

</ul>

<p><span style="font-weight: 400;">To get started with monitoring your ZooKeeper instances using OpenTelemetry and OpenObserve, </span><a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">sign up for a free account with OpenObserve today</span></a><span style="font-weight: 400;">.&nbsp;</span></p>

<p><span style="font-weight: 400;">Don't wait until it's too late &ndash; take control of your ZooKeeper monitoring and ensure the reliability and performance of your applications with OpenTelemetry and OpenObserve.</span></p>
