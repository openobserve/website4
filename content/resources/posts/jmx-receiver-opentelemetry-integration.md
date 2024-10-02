---
title: JMX Metrics Collection with OpenTelemetry Java Agent
seoTitle: JMX Metrics Collection with OpenTelemetry Java Agent
description: Explore simplified JMX metric collection and precise metric
  selection with the OpenTelemetry Java agent's JMX Receiver integration.
img: /img/resources/jmx-metrics-collection-with-opentelemetry-java-agent.png
alt: JMX Receiver
slug: JMX-Receiver-OpenTelemetry-Integration
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - JMX Receiver
  - OpenTelemetry Integration
---
<p><span style="font-weight: 400;">Struggling to monitor your Java applications? JMX (Java Management Extensions) offers a standardized approach to gather critical performance metrics and identify potential issues before they impact users.</span></p>

<p><a href="https://www.manageengine.com/products/applications_manager/jmx-monitoring.html"><span style="font-weight: 400;">Image Credit</span></a></p>

<p><span style="font-weight: 400;">JMX enables the management and monitoring of Java-based applications. It provides a standardized way to access and control various aspects of a running Java application.</span></p>

<h3><span style="font-weight: 400;">JMX as a Technology for Managing and Monitoring Java-based Applications</span></h3>

<p><span style="font-weight: 400;">JMX is a Java-based architecture that allows you to instrument, monitor, and manage applications, systems, and devices. It provides a set of APIs, tools, and services that enable you to access and control the internal state of a Java application, including its components, resources, and configurations.&nbsp;</span></p>

<h3><span style="font-weight: 400;">Benefits of Using JMX Metrics for Identifying Trends and Potential Issues</span></h3>

<p><span style="font-weight: 400;">By leveraging JMX metrics, you can gain valuable insights into the performance and behavior of your Java-based applications. JMX metrics provide a wealth of information, such as CPU usage, memory consumption, thread counts, and more. By monitoring these metrics, you can identify trends and potential issues before they escalate.</span></p>

<p><span style="font-weight: 400;">In the next section, you will learn about integration of JMX with </span><a href="https://openobserve.ai/docs/telemetry/#what-telemetry-data-is-being-collected"><span style="font-weight: 400;">OpenTelemetry</span></a><span style="font-weight: 400;">.</span></p>

<h2><span style="font-weight: 400;">Integration of JMX Metric Insight with OpenTelemetry Java Agent</span></h2>

<p><span style="font-weight: 400;">The integration of JMX Metric Insight with the OpenTelemetry Java Agent simplifies the collection of JMX metrics, making it easier to monitor and analyze the performance of Java-based applications.</span></p>

<h3><span style="font-weight: 400;">Simplification of JMX Metric Collection through the Integration</span></h3>

<p><span style="font-weight: 400;">By integrating JMX Metric Insight with the OpenTelemetry Java Agent, you can streamline the process of collecting JMX metrics. The agent automatically gathers relevant metrics from your Java application, eliminating the need for manual configuration and setup.&nbsp;</span></p>

<p><span style="font-weight: 400;">This integration reduces the complexity of monitoring your application's performance and allows you to focus on analyzing the collected data.</span></p>

<h3><span style="font-weight: 400;">Capabilities for Precise Metric Selection and Identification via YAML Configuration</span></h3>

<p><span style="font-weight: 400;">The integration offers the ability to precisely select and identify the metrics you want to collect through YAML configuration files. You can specify which JMX metrics to gather, ensuring that you only collect the data that is relevant to your monitoring needs.&nbsp;</span></p>

<p><span style="font-weight: 400;">This flexibility allows you to tailor the metric collection process to your specific requirements, reducing the amount of irrelevant data and improving the efficiency of your monitoring efforts.</span></p>

<h3><span style="font-weight: 400;">Predefined Configurations for Popular Application Servers and Frameworks</span></h3>

<p><span style="font-weight: 400;">The integration comes with predefined configurations for popular application servers and frameworks, such as ActiveMQ, Hadoop, Jetty, Kafka Broker, Tomcat, and WildFly.&nbsp;</span></p>

<p><span style="font-weight: 400;">These configurations provide a starting point for monitoring common Java-based applications, making it easier to get started with JMX metric collection. You can use these predefined configurations as a reference or as a basis for creating your own custom configurations.</span></p>

<h3><span style="font-weight: 400;">Custom Metric Definitions through YAML Files</span></h3>

<p><span style="font-weight: 400;">In addition to the predefined configurations, the integration allows you to define custom metrics through YAML files. This feature enables you to collect and monitor specific metrics that are unique to your application or organization.&nbsp;</span></p>

<p><span style="font-weight: 400;">By creating custom metric definitions, you can gain insights into aspects of your application that are not covered by the predefined configurations, allowing for a more comprehensive monitoring solution.</span></p>

<p><span style="font-weight: 400;">In the next section you will learn how to set up Kafka Broker Metrics.</span></p>

<h2><span style="font-weight: 400;">Setting Up and Observing Kafka Broker Metrics</span></h2>

<p><span style="font-weight: 400;">Monitoring the performance of a Kafka Broker is crucial for ensuring the reliability and efficiency of your Kafka-based applications. In this section, you'll learn how to set up Kafka on macOS, start the Zookeeper and Kafka Broker, attach the OpenTelemetry Java instrumentation agent, and observe the Kafka Broker metrics.</span></p>

<h3><span style="font-weight: 400;">Installation of Kafka on macOS using Homebrew</span></h3>

<p><span style="font-weight: 400;">To get started, you'll need to install Kafka on your macOS system. You can do this using the popular package manager, Homebrew. Open your terminal and run the following command to install Kafka:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">brew install kafka</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This will install the latest version of Kafka on your system, along with the necessary dependencies.</span></p>

<h3><span style="font-weight: 400;">Steps to Start Zookeeper and Kafka Broker</span></h3>

<p><span style="font-weight: 400;">After installing Kafka, you'll need to start the Zookeeper and Kafka Broker services. First, start the Zookeeper service by running the following command:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Next, start the Kafka Broker by running the following command:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">kafka-server-start /usr/local/etc/kafka/server.properties</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This will start the Kafka Broker and make it ready for use.</span></p>

<h3><span style="font-weight: 400;">Attaching OpenTelemetry Java Instrumentation Agent to Kafka Broker</span></h3>

<p><span style="font-weight: 400;">To observe the Kafka Broker metrics, you'll need to attach the OpenTelemetry Java instrumentation agent to the Kafka Broker process. You can do this by modifying the </span><span style="font-weight: 400;">kafka-server-start</span><span style="font-weight: 400;"> command to include the agent:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">KAFKA_OPTS="-javaagent:/path/to/opentelemetry-javaagent.jar" kafka-server-start /usr/local/etc/kafka/server.properties</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Replace </span><span style="font-weight: 400;">/path/to/opentelemetry-javaagent.jar</span><span style="font-weight: 400;"> with the actual path to the OpenTelemetry Java agent on your system.</span></p>

<h3><span style="font-weight: 400;">Creating a Kafka Topic and Testing Message Production and Consumption</span></h3>

<p><span style="font-weight: 400;">With the Kafka Broker running and the OpenTelemetry agent attached, you can now create a Kafka topic and test message production and consumption. Use the following commands to create a topic, produce messages, and consume messages:</span></p>

<table>

<tbody>

<tr>

<td>

<p><em><span style="font-weight: 400;">kafka</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">topics</span></em><span style="font-weight: 400;"> --</span><em><span style="font-weight: 400;">create</span></em><span style="font-weight: 400;"> --</span><em><span style="font-weight: 400;">topic</span></em> <em><span style="font-weight: 400;">my</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">topic</span></em><span style="font-weight: 400;"> --</span><em><span style="font-weight: 400;">bootstrap</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">server</span></em> <em><span style="font-weight: 400;">localhost:9092</span></em><span style="font-weight: 400;"><br /></span><em><span style="font-weight: 400;">kafka</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">console</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">producer</span></em><span style="font-weight: 400;"> --</span><em><span style="font-weight: 400;">topic</span></em> <em><span style="font-weight: 400;">my</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">topic</span></em><span style="font-weight: 400;"> --</span><em><span style="font-weight: 400;">bootstrap</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">server</span></em> <em><span style="font-weight: 400;">localhost:9092</span></em><span style="font-weight: 400;"><br /></span><em><span style="font-weight: 400;">kafka</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">console</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">consumer</span></em><span style="font-weight: 400;"> --</span><em><span style="font-weight: 400;">topic</span></em> <em><span style="font-weight: 400;">my</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">topic</span></em><span style="font-weight: 400;"> --</span><em><span style="font-weight: 400;">from</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">beginning</span></em><span style="font-weight: 400;"> --</span><em><span style="font-weight: 400;">bootstrap</span></em><span style="font-weight: 400;">-</span><em><span style="font-weight: 400;">server</span></em> <em><span style="font-weight: 400;">localhost:9092</span></em></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">These commands will create a new topic called "my-topic", allow you to produce messages to the topic, and consume messages from the topic.</span></p>

<p><span style="font-weight: 400;">By following these steps, you'll be able to set up Kafka on your macOS system, start the Zookeeper and Kafka Broker, attach the OpenTelemetry Java instrumentation agent, and observe the Kafka Broker metrics.</span></p>

<p><span style="font-weight: 400;">In the next section, you will learn how to export metrics to Prometheus.</span></p>

<h2><span style="font-weight: 400;">Exporting Metrics to Prometheus</span></h2>

<p><span style="font-weight: 400;">Exporting metrics to Prometheus is a common practice for monitoring and analyzing the performance of your applications and infrastructure. Prometheus is a powerful open-source monitoring and alerting system that collects metrics from various sources and stores them for later analysis.&nbsp;</span></p>

<p><span style="font-weight: 400;">In this section, you'll learn how to </span><a href="https://openobserve.ai/blog/send-metrics-using-kube-prometheus-stack-to-openobserve"><span style="font-weight: 400;">export metrics to Prometheus</span></a><span style="font-weight: 400;"> using supported exporters and view them on a Grafana dashboard.&nbsp;</span></p>

<h3><span style="font-weight: 400;">Exporting Metrics with Supported Exporters to Preferred Backends</span></h3>

<p><span style="font-weight: 400;">To export metrics to Prometheus, you'll need to use a supported exporter. Exporters are responsible for collecting metrics from various sources and exposing them in a format that Prometheus can understand.&nbsp;</span></p>

<p><span style="font-weight: 400;">There are many exporters available for different technologies, such as the Node Exporter for system metrics, the MySQL Exporter for MySQL databases, and the Kafka Exporter for Kafka brokers.</span></p>

<h3><span style="font-weight: 400;">Example of Direct Export to Prometheus and Viewing on Grafana Dashboard</span></h3>

<p><span style="font-weight: 400;">One way to export metrics to Prometheus is to use the direct export method. This involves configuring your application or service to expose metrics in the Prometheus format and configuring Prometheus to scrape those metrics. Once the metrics are collected by Prometheus, you can use a tool like Grafana to visualize them in a dashboard.</span></p>

<h3><span style="font-weight: 400;">Steps to Deploy Prometheus on Docker</span></h3>

<p><span style="font-weight: 400;">To get started with Prometheus, you can deploy it using Docker. First, create a directory for your Prometheus configuration files. Then, create a </span><span style="font-weight: 400;">docker-compose.yml</span><span style="font-weight: 400;"> file with the following content:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">yaml</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">version: '3'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">services:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; prometheus:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; image: prom/prometheus</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; volumes:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - ./prometheus:/etc/prometheus</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; command:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - '--config.file=/etc/prometheus/prometheus.yml'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; ports:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - 9090:9090</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This configuration will create a Prometheus container and mount the </span><span style="font-weight: 400;">prometheus</span><span style="font-weight: 400;"> directory from the current directory to the </span><span style="font-weight: 400;">/etc/prometheus</span><span style="font-weight: 400;"> directory inside the container.</span></p>

<h3><span style="font-weight: 400;">Creating a Minimal Configuration File for Prometheus</span></h3>

<p><span style="font-weight: 400;">To configure Prometheus, create a </span><span style="font-weight: 400;">prometheus.yml</span><span style="font-weight: 400;"> file in the </span><span style="font-weight: 400;">prometheus</span><span style="font-weight: 400;"> directory with the following content:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">yaml</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; scrape_interval: 15s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">scrape_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - job_name: 'prometheus'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; static_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - targets: \['localhost:9090']</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This minimal configuration tells Prometheus to scrape metrics from itself every 15 seconds.</span></p>

<h3><span style="font-weight: 400;">Visualization of Metrics in a Grafana Dashboard</span></h3>

<p><span style="font-weight: 400;">To visualize the metrics collected by Prometheus, you can use Grafana. First, deploy Grafana using Docker:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">docker run -d --name=grafana -p 3000:3000 grafana/grafana</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Then, open Grafana in your web browser at </span><span style="font-weight: 400;">http://localhost:3000</span><span style="font-weight: 400;"> and create a new dashboard. You can add panels to the dashboard to visualize the metrics collected by Prometheus.</span></p>

<p><span style="font-weight: 400;">By following these steps, you'll be able to export metrics to Prometheus and visualize them in a Grafana dashboard.</span></p>

<p><span style="font-weight: 400;">In the next section, you will learn how to apply JMX Metric Insights in you applications.</span></p>

<h2><span style="font-weight: 400;">Utilizing JMX Metric Insight in Live Applications</span></h2>

<p><span style="font-weight: 400;">JMX Metric Insight is a powerful tool for monitoring and analyzing the performance of live applications. In this section, we'll explore how to apply JMX Metric Insight in the context of the OpenTelemetry Astronomy shop, which uses a message queue service based on Kafka.</span></p>

<h3><span style="font-weight: 400;">Application of JMX Metric Insight in the OpenTelemetry Astronomy Shop</span></h3>

<p><span style="font-weight: 400;">The OpenTelemetry Astronomy shop is a real-world application that showcases the integration of various monitoring and observability tools, including JMX Metric Insight. By leveraging JMX Metric Insight, the Astronomy shop can collect and analyze a wide range of metrics from its Kafka-based message queue service.</span></p>

<p><span style="font-weight: 400;">The integration of JMX Metric Insight with the OpenTelemetry Java Agent allows the Astronomy shop to easily gather relevant metrics from the Kafka Broker. This includes metrics such as message throughput, consumer lag, and broker resource utilization.&nbsp;</span></p>

<p><span style="font-weight: 400;">By monitoring these metrics, the Astronomy shop can identify performance bottlenecks, optimize resource allocation, and ensure the overall health and reliability of the message queue service.</span></p>

<p><span style="font-weight: 400;">The JMX Metric Insight integration also provides the ability to define custom metrics, enabling the Astronomy shop to collect and monitor metrics that are specific to their application's needs. This flexibility ensures that the team can gain a comprehensive understanding of their system's performance and make informed decisions to improve the overall user experience.</span></p>

<p><span style="font-weight: 400;">By utilizing JMX Metric Insight in the live Astronomy shop application, the team can proactively address issues, optimize performance, and gain valuable insights into the behavior of their Kafka-based message queue service.</span></p>

<p><span style="font-weight: 400;">In the following section, you will learn about enhancements of the JMX Metric Insight Module.</span></p>

<h2><span style="font-weight: 400;">Further Capabilities of the JMX Metric Insight Module</span></h2>

<p><span style="font-weight: 400;">The JMX Metric Insight module offers a range of advanced capabilities that enable you to tailor the metric collection process to your specific requirements. One of the key features is the ability to define custom metrics using YAML configuration files. This flexibility allows you to gather unique insights into your application's performance and behavior.</span></p>

<h3><span style="font-weight: 400;">Custom Metric Definition with YAML for Unique Requirements</span></h3>

<p><span style="font-weight: 400;">The JMX Metric Insight module supports the creation of custom metrics through YAML configuration files. This means you can specify the exact metrics you want to collect, ensuring that you only gather the data that is relevant to your monitoring needs.&nbsp;</span></p>

<p><span style="font-weight: 400;">By defining custom metrics, you can gain insights into aspects of your application that may not be covered by the predefined configurations, providing a more comprehensive view of your system's performance.</span></p>

<h3><span style="font-weight: 400;">Example YAML Configuration for Kafka Broker Metrics</span></h3>

<p><span style="font-weight: 400;">To illustrate the power of custom metric definition, let's look at an example YAML configuration for collecting Kafka Broker metrics:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">yaml</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - name: kafka_broker_topic_partitions</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; type: gauge</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; description: Number of partitions for each topic</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; jmxPath: kafka.server:type=ReplicaManager,name=PartitionCount</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; jmxAttribute: Value</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; labels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - name: topic</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; jmxPath: kafka.server:type=ReplicaManager,name=PartitionCount</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; jmxAttribute: Key</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; jmxKeyField: 1</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This configuration defines a custom metric called </span><span style="font-weight: 400;">kafka_broker_topic_partitions</span><span style="font-weight: 400;"> that collects the number of partitions for each topic in the Kafka Broker. The </span><span style="font-weight: 400;">jmxPath</span><span style="font-weight: 400;"> and </span><span style="font-weight: 400;">jmxAttribute</span><span style="font-weight: 400;"> fields specify the JMX path and attribute to retrieve the metric value, while the </span><span style="font-weight: 400;">labels</span><span style="font-weight: 400;"> section defines the topic name as a label.</span></p>

<h3><span style="font-weight: 400;">Encouragement to Contribute to the Module's Enhancement</span></h3>

<p><span style="font-weight: 400;">The JMX Metric Insight module is an open-source project, and contributions from the community are highly encouraged. If you have ideas for new features, improvements, or bug fixes, consider contributing to the project. Your contributions can help enhance the module's capabilities and make it even more useful for the monitoring and observability community.</span></p>

<p><span style="font-weight: 400;">By leveraging the custom metric definition capabilities of the JMX Metric Insight module, you can gain deeper insights into your application's performance and behavior. Explore the module's documentation and consider contributing to its ongoing development to help shape the future of monitoring and observability tools.</span></p>

<p><span style="font-weight: 400;">In the final section of this article, you will briefly touch upon how OpenObserve can assist you in your journey of JMX Metrics Collection with OpenTelemetry.</span></p>

<h2><span style="font-weight: 400;">How Can OpenObserve Help?</span></h2>

<p><a href="https://openobserve.ai/blog/launching-openobserve"><span style="font-weight: 400;">OpenObserve</span></a><span style="font-weight: 400;">'s JMX Metric Insight module can help with JMX metrics collection when used in conjunction with the OpenTelemetry Java Agent. Here are the key ways it can assist:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Simplification of JMX metric collection</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Precise metric selection and identification</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Predefined configurations for popular frameworks</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Custom metric definitions</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Seamless integration with OpenTelemetry</span></li>

</ul>

<p><span style="font-weight: 400;">By leveraging the capabilities of OpenObserve, you can streamline JMX metrics collection and gain precise insights into your Java applications. </span><a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">Get in touch with the OpenObserve team now for a seamless experience</span></a><span style="font-weight: 400;">.</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">The article describes how JMX Metric Insight, a module within the OpenTelemetry Java Agent, simplifies the collection and analysis of JMX metrics for monitoring Java applications.</span></p>

<p><span style="font-weight: 400;">Key takeaways:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">JMX (Java Management Extensions) offers a standardized way to access and manage Java applications, providing valuable performance and health insights.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">OpenTelemetry Java Agent integrates JMX Metric Insight, streamlining JMX metric collection.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Benefits include simplified collection, precise metric selection through YAML configuration, and predefined configurations for popular applications.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Custom metrics can be defined for application-specific needs.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The article showcases using JMX Metric Insight to monitor Kafka Broker metrics in a sample application.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The JMX Metric Insight module is open-source and welcomes contributions for enhancements.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">OpenObserve offers a JMX Metric Insight module that simplifies collection and provides other benefits. </span></li>

</ul>
