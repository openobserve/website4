---
title: OpenTelemetry Kafka Metrics Monitoring
seoTitle: OpenTelemetry Kafka Metrics Monitoring
description: Learn how to configure Kafka to report metrics to the OpenTelemetry
  Collector in our in-depth guide for Kafka metrics receiver.
img: /img/resources/opentelemetry-kafka-metrics-monitoring.png
alt: Kafka Metrics Receiver
slug: kafka-metrics-receiver
authors:
  - OpenObserve-Team
publishDate: 2024-09-24
tags:
  - Kafka Metrics Receiver
  - OpenTelemetry
  - Kafka metrics
  - metrics monitoring
  - OpenTelemetry Collector
  - Kafka monitoring
  - real-time monitoring
  - performance monitoring
  - distributed systems monitoring
  - cloud-native monitoring
---
<h2><span style="font-weight: 400;">Introduction to OpenTelemetry Kafka Metrics Monitoring</span></h2>
<p><span style="font-weight: 400;">Welcome to our guide on OpenTelemetry Kafka Metrics Monitoring! If you manage Apache Kafka, monitoring its performance and health is crucial.&nbsp;</span></p>
<p><span style="font-weight: 400;">The OpenTelemetry Collector is an open-source tool for collecting, processing, and exporting telemetry data, including Kafka metrics. It provides detailed insights into your system&rsquo;s performance and reliability.</span></p>
<p><span style="font-weight: 400;">Monitoring Kafka with OpenTelemetry gives you real-time visibility into your Kafka cluster&rsquo;s performance, helping you preempt issues and maintain seamless operations.&nbsp;</span></p>
<p><span style="font-weight: 400;">In this guide, we&rsquo;ll cover the setup and configuration of Kafka metrics reporting to the OpenTelemetry Collector, collecting and processing metrics, and visualizing and managing Kafka metrics data. Let&rsquo;s get started!</span></p>
<p>&nbsp;</p>
<h2><span style="font-weight: 400;">Setup and Configuration</span></h2>
<p><span style="font-weight: 400;">Setting up Kafka to report metrics to the OpenTelemetry Collector is a straightforward process that can greatly enhance your ability to monitor and manage your Kafka clusters.&nbsp;</span></p>
<p><span style="font-weight: 400;">Let&rsquo;s get into the key steps and configurations needed to get started.</span></p>
<h3><span style="font-weight: 400;">Configuring Kafka to Report Metrics to the OpenTelemetry Collector</span></h3>
<p><span style="font-weight: 400;">First, you need to configure Kafka to send its metrics to the OpenTelemetry Collector.&nbsp;</span></p>
<p><span style="font-weight: 400;">This involves setting up the necessary configurations in your Kafka brokers and enabling metric collection.</span></p>
<ol>
<li style="font-weight: 400;"><strong>Modify Kafka Broker Configuration:</strong></li>
</ol>
<p><span style="font-weight: 400;">Open your </span><span style="font-weight: 400;">server.properties</span><span style="font-weight: 400;"> file.</span></p>
<p><span style="font-weight: 400;">Add the following configuration to enable JMX (Java Management Extensions), which is used to expose Kafka metrics:</span><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">jmx.port=</span><span style="font-weight: 400;">9999</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">jmx.host=localhost</span></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<ol>
<li style="font-weight: 400;"><strong>Install and Configure the OpenTelemetry Collector:</strong></li>
</ol>
<p><span style="font-weight: 400;">Download and install the OpenTelemetry Collector.</span></p>
<p><span style="font-weight: 400;">Configure the collector to receive Kafka metrics. Here&rsquo;s a sample configuration:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; kafka:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"localhost:9999"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; logging:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; loglevel: </span><span style="font-weight: 400;">debug</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">[kafka]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<h3><span style="font-weight: 400;">Key Configuration Settings for Kafka Metrics Receiver</span></h3>
<p><span style="font-weight: 400;">When setting up the Kafka metrics receiver, there are several key settings to consider:</span></p>
<ol>
<li style="font-weight: 400;"><strong>Endpoint Configuration:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Ensure the endpoint matches the JMX port configured in your Kafka broker. This allows the collector to pull metrics data.</span></li>
</ul>
<li style="font-weight: 400;"><strong>Processor Settings:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Use processors like </span><span style="font-weight: 400;">batch</span><span style="font-weight: 400;"> to optimize data processing and export. This can help manage the flow and reduce the load on the collector.</span></li>
</ul>
<li style="font-weight: 400;"><strong>Exporter Configuration:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Define exporters to send metrics data to your preferred backend systems, such as logging services or monitoring platforms.</span></li>
</ul>
</ol>
<p>&nbsp;</p>
<h3><span style="font-weight: 400;">Setting Required and Optional Parameters</span></h3>
<p><span style="font-weight: 400;">While configuring the Kafka metrics receiver, you&rsquo;ll encounter both required and optional parameters. Here&rsquo;s a quick overview:</span></p>
<ol>
<li style="font-weight: 400;"><strong>Required Parameters:</strong></li>
<ul>
<li style="font-weight: 400;"><strong>endpoint:</strong><span style="font-weight: 400;"> The JMX endpoint of your Kafka broker.</span></li>
<li style="font-weight: 400;"><strong>receiver:</strong><span style="font-weight: 400;"> Specify Kafka as the receiver type.</span></li>
</ul>
<li style="font-weight: 400;"><strong>Optional Parameters:</strong></li>
<ul>
<li style="font-weight: 400;"><strong>collection_interval:</strong><span style="font-weight: 400;"> Adjust the interval at which metrics are collected.</span></li>
<li style="font-weight: 400;"><strong>timeout:</strong><span style="font-weight: 400;"> Set a timeout period for data collection to handle slow responses.</span></li>
</ul>
</ol>
<p>&nbsp;</p>
<h3><span style="font-weight: 400;">Authentication and Security Configurations for Secure Metrics Collection</span></h3>
<p><span style="font-weight: 400;">Securing your metrics collection process is crucial to protect sensitive data. Here&rsquo;s how you can set up authentication and security:</span></p>
<ol>
<li style="font-weight: 400;"><strong>Enable SSL/TLS:</strong></li>
</ol>
<p><span style="font-weight: 400;">Configure SSL/TLS for encrypted communication between Kafka and the OpenTelemetry Collector.</span></p>
<p><span style="font-weight: 400;">Update your </span><span style="font-weight: 400;">server.properties</span><span style="font-weight: 400;"> with SSL settings:</span><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">ssl.keystore.location=/path/to/keystore</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">ssl.keystore.password=your-keystore-password</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">ssl.key.password=your-key-password</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">ssl.truststore.location=/path/to/truststore</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">ssl.truststore.password=your-truststore-password</span></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<ol>
<li style="font-weight: 400;"><strong>Configure Authentication:</strong></li>
</ol>
<p><span style="font-weight: 400;">Use Kerberos or plain text authentication to secure access.</span></p>
<p><span style="font-weight: 400;">Example for Kerberos:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">sasl.kerberos.service.name=kafka</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">sasl.jaas.config=com.sun.security.auth.module.Krb5LoginModule</span> <span style="font-weight: 400;">required</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">useKeyTab=true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">storeKey=true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">keyTab="/path/to/keytab"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">principal="kafka/your-host@YOUR.REALM";</span></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p><span style="font-weight: 400;">By following these steps, you&rsquo;ll have Kafka configured to report metrics to the OpenTelemetry Collector securely and efficiently.&nbsp;</span></p>
<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore how to integrate JMX metrics for detailed Kafka monitoring.&nbsp;</span></p>
<p>&nbsp;</p>
<h2><span style="font-weight: 400;">Kafka JMX Metrics Collection</span></h2>
<p><span style="font-weight: 400;">Integrating JMX (Java Management Extensions) metrics with the OpenTelemetry Collector provides a detailed view of your Kafka brokers and consumers.&nbsp;</span></p>
<p><span style="font-weight: 400;">This section will guide you through the process of configuring JMX metrics collection for comprehensive Kafka monitoring.</span></p>
<h3><span style="font-weight: 400;">Overview of Integrating JMX Metrics for Detailed Kafka Monitoring</span></h3>
<p><span style="font-weight: 400;">JMX metrics offer a granular look into the performance and health of your Kafka infrastructure.&nbsp;</span></p>
<p><span style="font-weight: 400;">By collecting these metrics, you can gain insights into various aspects such as CPU usage, memory consumption, and message throughput, allowing you to proactively manage and optimize your Kafka deployment.</span></p>
<p>&nbsp;</p>
<h3><span style="font-weight: 400;">Configuring JMX Metrics Collection for Kafka Brokers and Consumers</span></h3>
<p><span style="font-weight: 400;">To collect JMX metrics from Kafka, follow these steps:</span></p>
<ol>
<li style="font-weight: 400;"><strong>Enable JMX on Kafka Brokers:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Open the </span><span style="font-weight: 400;">server.properties</span><span style="font-weight: 400;"> file on each Kafka broker.</span></li>
</ul>
</ol>
<p><span style="font-weight: 400;">Add the following lines to enable JMX monitoring:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">jmx.port=9999</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">jmx.host=localhost</span></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Restart your Kafka brokers to apply the changes.</span></li>
</ul>
<p>&nbsp;</p>
<ol>
<li style="font-weight: 400;"><strong>Enable JMX on Kafka Consumers:</strong></li>
</ol>
<p><span style="font-weight: 400;">Configure your Kafka consumer applications to expose JMX metrics. This typically involves setting JVM options:</span><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">-Dcom.sun.management.jmxremote</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">-Dcom.sun.management.jmxremote.port=9998</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">-Dcom.sun.management.jmxremote.authenticate=false</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">-Dcom.sun.management.jmxremote.ssl=false</span></p>
</td>
</tr>
</tbody>
</table>
<p><br /><br /></p>
<h3><span style="font-weight: 400;">Specifying JMX Receiver Settings in the OpenTelemetry Collector</span></h3>
<p><span style="font-weight: 400;">Next, configure the OpenTelemetry Collector to receive JMX metrics from your Kafka brokers and consumers.&nbsp;</span></p>
<p><span style="font-weight: 400;">Here&rsquo;s a sample configuration:</span></p>
<p>&nbsp;</p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; jmx:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"localhost:9999"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; collection_interval: </span><span style="font-weight: 400;">60</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; target_system: </span><span style="font-weight: 400;">"kafka"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; jmx_metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - object_name: </span><span style="font-weight: 400;">"kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; attribute: </span><span style="font-weight: 400;">Count</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - object_name: </span><span style="font-weight: 400;">"kafka.server:type=KafkaRequestHandlerPool,name=RequestHandlerAvgIdlePercent"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; attribute: </span><span style="font-weight: 400;">MeanRate</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; logging:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; loglevel: </span><span style="font-weight: 400;">debug</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">[jmx]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>
</td>
</tr>
</tbody>
</table>
<p><br /><br /></p>
<h3><span style="font-weight: 400;">Practical Examples and Code Snippets</span></h3>
<p>&nbsp;</p>
<p><strong>Basic JMX Configuration for a Broker:</strong><strong><br /></strong><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; jmx:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"localhost:9999"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; target_system: </span><span style="font-weight: 400;">"kafka"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; jmx_metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - object_name: </span><span style="font-weight: 400;">"kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; attribute: </span><span style="font-weight: 400;">Count</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; logging:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; loglevel: </span><span style="font-weight: 400;">debug</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">[jmx]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p><strong>Extended JMX Configuration with Multiple Metrics:</strong><strong><br /></strong><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; jmx:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"localhost:9999"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; target_system: </span><span style="font-weight: 400;">"kafka"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; collection_interval: </span><span style="font-weight: 400;">60</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; jmx_metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - object_name: </span><span style="font-weight: 400;">"kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; attribute: </span><span style="font-weight: 400;">Count</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - object_name: </span><span style="font-weight: 400;">"kafka.server:type=KafkaRequestHandlerPool,name=RequestHandlerAvgIdlePercent"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; attribute: </span><span style="font-weight: 400;">MeanRate</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; logging:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; loglevel: </span><span style="font-weight: 400;">debug</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">[jmx]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p><span style="font-weight: 400;">By integrating JMX metrics into your monitoring setup, you gain valuable insights into the detailed performance characteristics of your Kafka brokers and consumers.&nbsp;</span></p>
<p><span style="font-weight: 400;">This allows for proactive management and optimization of your Kafka infrastructure.</span></p>
<p><span style="font-weight: 400;">In the next section, we&rsquo;ll cover the steps to enable Kafka metrics collection in the OpenTelemetry Collector and discuss how to aggregate, filter, and transform these metrics effectively.&nbsp;</span></p>
<p>&nbsp;</p>
<h2><span style="font-weight: 400;">Collecting and Processing Kafka Metrics</span></h2>
<p><span style="font-weight: 400;">After configuring Kafka and the OpenTelemetry Collector to report metrics, the next step is to collect and process these metrics effectively.&nbsp;</span></p>
<p><span style="font-weight: 400;">This section will guide you through enabling Kafka metrics collection in the OpenTelemetry Collector and optimizing the data through aggregation, filtering, and transformation.</span></p>
<h3><span style="font-weight: 400;">Steps to Enable Kafka Metrics Collection in OpenTelemetry Collector</span></h3>
<p><span style="font-weight: 400;">Enabling Kafka metrics collection in the OpenTelemetry Collector involves a few key steps. Here&rsquo;s a concise guide to get you started:</span></p>
<p>&nbsp;</p>
<p><strong>1. Configure the OpenTelemetry Collector:</strong></p>
<p><span style="font-weight: 400;">Ensure your </span><span style="font-weight: 400;">collector-config.yaml</span><span style="font-weight: 400;"> file is set up to include Kafka as a receiver. Here&rsquo;s a sample configuration:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; kafka:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"localhost:9999"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; logging:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; loglevel: </span><span style="font-weight: 400;">debug</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">[kafka]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p><strong>2. Start the OpenTelemetry Collector:</strong></p>
<p><span style="font-weight: 400;">Launch the OpenTelemetry Collector with your configuration file:</span><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">otel-collector --config=collector-config.yaml</span></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p><strong>3. Verify Metrics Collection:</strong></p>
<ol>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Check the logs to ensure the collector is receiving Kafka metrics. Look for messages indicating successful data collection and export.</span></li>
</ul>
</ol>
<p>&nbsp;</p>
<h3><span style="font-weight: 400;">Aggregating, Filtering, and Transforming Metrics Data for Kafka Clusters</span></h3>
<p><span style="font-weight: 400;">Once your metrics are being collected, you can optimize the data by aggregating, filtering, and transforming it to gain actionable insights.</span></p>
<ol>
<li style="font-weight: 400;"><strong>Aggregating Metrics:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Aggregation helps consolidate data points to provide a high-level view of your Kafka cluster&rsquo;s performance. Use the </span><span style="font-weight: 400;">batch</span><span style="font-weight: 400;"> processor in the OpenTelemetry Collector to aggregate metrics before exporting them.</span></li>
</ul>
<li style="font-weight: 400;"><strong>Filtering Metrics:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Filtering allows you to focus on the most critical metrics and reduce noise. Configure filters in the collector to include only the metrics relevant to your monitoring needs.</span></li>
</ul>
</ol>
<p><span style="font-weight: 400;">Example filter configuration:</span><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; filter:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; include:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; match_type: </span><span style="font-weight: 400;">strict</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; metric_names:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -</span> <span style="font-weight: 400;">"kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -</span> <span style="font-weight: 400;">"kafka.server:type=KafkaRequestHandlerPool,name=RequestHandlerAvgIdlePercent"</span></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p><strong>4. Transforming Metrics:</strong></p>
<ol>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Transformations enable you to manipulate and enrich your metrics data for better analysis. This can include renaming metrics, adjusting units, or adding additional context.</span></li>
</ul>
</ol>
<p><span style="font-weight: 400;">Example transformation configuration:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; transform:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; include:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; match_type: </span><span style="font-weight: 400;">strict</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; metric_names:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -</span> <span style="font-weight: 400;">"kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - action: </span><span style="font-weight: 400;">update</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; new_name: </span><span style="font-weight: 400;">"kafka.broker.topic.messages_per_second"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - action: </span><span style="font-weight: 400;">update</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; new_unit: </span><span style="font-weight: 400;">"messages/sec"</span></p>
</td>
</tr>
</tbody>
</table>
<p><br /><br /></p>
<h3><span style="font-weight: 400;">Understanding the Key Kafka Metrics Collected</span></h3>
<p><span style="font-weight: 400;">Knowing which metrics to monitor is crucial. Here are some key Kafka metrics that provide valuable insights:</span></p>
<ol>
<li style="font-weight: 400;"><strong>CPU Usage:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Monitor CPU utilization to ensure your Kafka brokers are not overburdened. High CPU usage can indicate the need for scaling or optimization.</span></li>
</ul>
<li style="font-weight: 400;"><strong>Disk Utilization:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Keep an eye on disk usage to prevent storage issues. Metrics such as disk write rate and available disk space help you manage your storage resources effectively.</span></li>
</ul>
<li style="font-weight: 400;"><strong>Message Rates:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Track the rate of incoming and outgoing messages. Metrics like </span><span style="font-weight: 400;">MessagesInPerSec</span><span style="font-weight: 400;"> and </span><span style="font-weight: 400;">MessagesOutPerSec</span><span style="font-weight: 400;"> indicate the throughput of your Kafka brokers, helping you ensure optimal performance.</span></li>
</ul>
</ol>
<p><span style="font-weight: 400;">By following these steps and configurations, you can effectively collect, aggregate, filter, and transform Kafka metrics using the OpenTelemetry Collector, providing you with valuable insights to maintain and optimize your Kafka infrastructure.</span></p>
<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore how to visualize and manage Kafka metrics data using various backend systems.</span></p>
<h2>&nbsp;</h2>
<h2><span style="font-weight: 400;">Visualizing and Managing Kafka Metrics Data</span></h2>
<p><span style="font-weight: 400;">Monitoring and visualizing Kafka metrics is essential for ensuring the health and performance of your Kafka clusters. Here&rsquo;s a streamlined approach to managing Kafka metrics using advanced tools and best practices:</span></p>
<h3>&nbsp;</h3>
<h3><span style="font-weight: 400;">Options for Backend Systems Compatible with OpenTelemetry</span></h3>
<p><span style="font-weight: 400;">OpenTelemetry is a powerful framework for observability, providing standardized data collection for metrics, traces, and logs. To visualize and manage Kafka metrics, you need a backend system that is compatible with OpenTelemetry.</span></p>
<p><span style="font-weight: 400;">A popular tool in the observability space, O2 (OpenObserve) supports OpenTelemetry and offers powerful features for metrics visualization and alert configurations.&nbsp;</span></p>
<p><span style="font-weight: 400;">OpenObserve allows you to monitor Kafka metrics effectively with real-time dashboards and custom alerts.</span></p>
<p>&nbsp;</p>
<h3><span style="font-weight: 400;">Using Cloud Observability Platforms for Dashboards and Alert Configurations</span></h3>
<p><span style="font-weight: 400;">Cloud observability platforms offer advanced features for creating dashboards and setting up alerts based on your Kafka metrics. Here&rsquo;s how to leverage these platforms:</span></p>
<p>&nbsp;</p>
<p><strong>1. Setting Up Dashboards:</strong></p>
<ol>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Use OpenObserve to create dashboards that display key Kafka metrics. Dashboards provide a real-time view of your system&rsquo;s performance, helping you quickly identify any issues.</span></li>
</ul>
</ol>
<p><strong>Example OpenObserve Dashboard Configuration:</strong><strong><br /></strong><span style="font-weight: 400;"><br /></span></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">dashboards:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - name: </span><span style="font-weight: 400;">Kafka</span> <span style="font-weight: 400;">Metrics</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; panels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Messages</span> <span style="font-weight: 400;">In</span> <span style="font-weight: 400;">Per</span> <span style="font-weight: 400;">Second</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">kafka_server_BrokerTopicMetrics_MessagesInPerSec</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">CPU</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">kafka_server_KafkaRequestHandlerPool_RequestHandlerAvgIdlePercent</span></p>
</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p><strong>2. Configuring Alerts:</strong></p>
<ol>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Alerts notify you of potential issues before they become critical. Set up alerts for key metrics like CPU usage, disk utilization, and message rates. Use thresholds to trigger alerts when metrics exceed normal ranges.</span></li>
</ul>
</ol>
<p><strong>Example OpenObserve Alert Configuration:</strong></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">alerts:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - name: </span><span style="font-weight: 400;">High</span> <span style="font-weight: 400;">CPU</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; condition: </span><span style="font-weight: 400;">kafka_server_KafkaRequestHandlerPool_RequestHandlerAvgIdlePercent</span> <span style="font-weight: 400;">&lt;</span> <span style="font-weight: 400;">20</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - notify: </span><span style="font-weight: 400;">email</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; to: </span><span style="font-weight: 400;">ops-team@example.com</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; message: </span><span style="font-weight: 400;">"Kafka broker CPU usage is critically high."</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - name: </span><span style="font-weight: 400;">High</span> <span style="font-weight: 400;">Message</span> <span style="font-weight: 400;">Rate</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; condition: </span><span style="font-weight: 400;">kafka_server_BrokerTopicMetrics_MessagesInPerSec</span> <span style="font-weight: 400;">&gt; 1000</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - notify: </span><span style="font-weight: 400;">slack</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; channel: </span><span style="font-weight: 400;">#kafka-alerts</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; message: </span><span style="font-weight: 400;">"Kafka message rate is abnormally high."</span></p>
</td>
</tr>
</tbody>
</table>
<h3>&nbsp;</h3>
<h3><span style="font-weight: 400;">Steps to Validate that Metrics Are Correctly Reporting</span></h3>
<p><span style="font-weight: 400;">Ensuring that your metrics are accurately reported is essential for reliable monitoring. Here are steps to validate your metrics:</span></p>
<ol>
<li style="font-weight: 400;"><strong>Check the OpenTelemetry Collector Logs:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Review the logs of the OpenTelemetry Collector to verify that it&rsquo;s receiving and exporting Kafka metrics without errors.</span></li>
</ul>
<li style="font-weight: 400;"><strong>Compare Metrics in Different Tools:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Cross-check metrics in different visualization tools to ensure consistency. Discrepancies might indicate configuration issues.</span></li>
</ul>
<li style="font-weight: 400;"><strong>Simulate Load and Monitor Response:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Generate load on your Kafka cluster and monitor how metrics are reported in real-time. This helps you validate the accuracy and timeliness of the metrics.</span></li>
</ul>
</ol>
<p><strong>Example Load Simulation Script:</strong></p>
<table>
<tbody>
<tr>
<td>
<p><span style="font-weight: 400;">kafka-producer-perf-test --topic test-topic --num-records 100000 --record-size 100 --throughput 1000 --producer-props bootstrap.servers=localhost:9092</span></p>
</td>
</tr>
</tbody>
</table>
<h3>&nbsp;</h3>
<h3><span style="font-weight: 400;">Using OpenObserve for Metrics Visualization</span></h3>
<p><span style="font-weight: 400;">OpenObserve (O2) offers a robust solution for visualizing Kafka metrics. It provides customizable dashboards and powerful alerting capabilities, making it easy to monitor your Kafka cluster&rsquo;s health and performance.</span></p>
<p><strong>Setting Up OpenObserve:</strong></p>
<ol>
<li style="font-weight: 400;"><strong>Install OpenObserve:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Follow the</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">installation guide</span></a><span style="font-weight: 400;"> to set up OpenObserve in your environment.</span></li>
</ul>
<li style="font-weight: 400;"><strong>Configure Data Sources:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Connect OpenObserve to your OpenTelemetry Collector to start receiving Kafka metrics.</span></li>
</ul>
<li style="font-weight: 400;"><strong>Create Dashboards and Alerts:</strong></li>
<ul>
<li style="font-weight: 400;"><span style="font-weight: 400;">Use the intuitive UI to create dashboards that visualize critical Kafka metrics. Set up alerts to notify you of any anomalies, ensuring you can respond quickly to potential issues.</span></li>
</ul>
</ol>
<p><span style="font-weight: 400;">By leveraging OpenObserve (O2), you can gain deep insights into your Kafka metrics, ensuring your system runs smoothly and efficiently.</span></p>
<p><span style="font-weight: 400;">For more information and to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;"> to start using OpenObserve today.</span></p>
<p><span style="font-weight: 400;">In the next section, we&rsquo;ll delve into advanced configuration and troubleshooting techniques to help you optimize your Kafka metrics monitoring setup.&nbsp;</span></p>
<h2>&nbsp;</h2>
<h2><span style="font-weight: 400;">Conclusion</span></h2>
<p><span style="font-weight: 400;">Monitoring Apache Kafka with OpenTelemetry and visualizing metrics using OpenObserve (O2) provides a comprehensive solution for maintaining the health, performance, and reliability of your Kafka clusters. By following the steps outlined in this guide, you can set up robust metrics collection, create insightful dashboards, and configure alerts to proactively manage your Kafka infrastructure.</span></p>
<p><span style="font-weight: 400;">For more information and to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;"> to start using OpenObserve today.&nbsp;</span></p>
<p>&nbsp;</p>
