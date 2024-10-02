---
title: Native Tracing and Log Receiver - Apache SkyWalking
seoTitle: Native Tracing and Log Receiver - Apache SkyWalking
description: SkyWalking Receiver accepts tracing and logging data, with common
  usage of gRPC or HTTPRestful for service.
img: /img/resources/native-tracing-and-log-receiver-apache-skywalking.png
alt: SkyWalking Receiver
slug: SkyWalking-Receiver-Native-Tracing
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - SkyWalking
  - Native Tracing
---
<p><span style="font-weight: 400;">SkyWalking Receiver plays a pivotal role by enabling robust tracing, logging, and metrics collection capabilities within Apache SkyWalking. However, to fully utilize its power, you need to understand how to configure and utilize the various SkyWalking Receivers effectively.</span></p>

<p><span style="font-weight: 400;">Whether you're dealing with native tracing, logs, or metrics, receivers are the backbone that connects your data sources to the SkyWalking backend, enabling seamless data collection and analysis.</span></p>

<p><span style="font-weight: 400;">In this guide, we&rsquo;ll explore the key receivers in SkyWalking and focus on how to configure them for optimal performance. You&rsquo;ll learn about the various receivers available, including those designed for tracing, logging, and metrics collection, and how to set them up to ensure your observability stack is as effective as possible.</span></p>

<p><span style="font-weight: 400;">Let&rsquo;s dive into the foundational concepts behind receivers in SkyWalking and why choosing the right one is essential for your system's performance.</span></p>

<h2><span style="font-weight: 400;">Choose Receiver</span></h2>

<p><span style="font-weight: 400;">The success of your observability setup hinges on selecting the right SkyWalking Receiver. This critical component facilitates the flow of data from your distributed systems to the SkyWalking backend.&nbsp;</span></p>

<p><span style="font-weight: 400;">The receiver is an entry point where your telemetry data, including traces, logs, and metrics, can be captured and processed.</span></p>

<h3><span style="font-weight: 400;">What Exactly Is a SkyWalking Receiver?</span></h3>

<p><span style="font-weight: 400;">At its core, a SkyWalking Receiver is a service that accepts and processes incoming data.&nbsp;</span></p>

<p><span style="font-weight: 400;">This data can come from various sources in different formats, and the receiver&rsquo;s job is to ensure that this data is correctly ingested into the SkyWalking backend for further analysis.&nbsp;</span></p>

<p><span style="font-weight: 400;">It acts as a bridge between your applications and the observability tools, ensuring that all the necessary data is available for monitoring and diagnostics.</span></p>

<h3><span style="font-weight: 400;">Common Communication Methods: gRPC and HTTPRestful</span></h3>

<p><span style="font-weight: 400;">SkyWalking Receivers typically communicate using gRPC or HTTPRestful services, depending on the nature of the data being ingested.&nbsp;</span></p>

<p><span style="font-weight: 400;">High-throughput scenarios often favor gRPC for its efficiency, making it ideal for large-scale environments where performance is a concern.</span></p>

<p><span style="font-weight: 400;">On the other hand, HTTPRestful provides flexibility and ease of integration, especially in systems where REST APIs are already in use.</span></p>

<h3><span style="font-weight: 400;">Listening and Pull Modes&nbsp;</span></h3>

<p><span style="font-weight: 400;">SkyWalking Receivers offer various listening and pull modes, allowing you to tailor the data collection process to suit your specific requirements.&nbsp;</span></p>

<h4><strong>Listening Mode</strong></h4>

<p><span style="font-weight: 400;">In the listening mode, various sources send incoming data to the SkyWalking Receiver, which acts as a server. This mode is advantageous when services or applications push data directly to the receiver.&nbsp;</span></p>

<p><span style="font-weight: 400;">For instance, in a microservices architecture, each service could be configured to send trace data to a central SkyWalking Receiver, which listens on designated ports. This method ensures real-time data collection and minimal latency, as the receiver immediately processes the incoming data.</span></p>

<h4><strong>Pull Mode</strong></h4>

<p><span style="font-weight: 400;">Pull mode, on the other hand, is where the SkyWalking Receiver actively requests data from external sources. This mode is advantageous in environments where data is stored in queues or databases and needs to be fetched periodically.&nbsp;</span></p>

<p><span style="font-weight: 400;">For example, a Kafka MQ setup can pull data from a message queue, enabling seamless integration with event-driven architectures. At regular intervals, the receiver polls the queue, collecting and processing all relevant data.&nbsp;&nbsp;</span></p>

<p><span style="font-weight: 400;">The true power of SkyWalking Receivers can lie in their ability to support either listening or pull modes, depending on the receiver type and configuration. This hybrid approach allows you to tailor the data collection process to your unique system architecture.&nbsp;</span></p>

<p><span style="font-weight: 400;">For instance, you might configure some services to push critical data directly to the receiver while simultaneously polling less time-sensitive data from a message queue. This flexibility ensures that you can configure a receiver that aligns perfectly with your observability needs, no matter your system&rsquo;s complexity.</span></p>

<p><span style="font-weight: 400;">Next, we&rsquo;ll get into the different types of SkyWalking Receivers and how each one caters to specific data sources and formats.&nbsp;&nbsp;</span></p>

<h2><span style="font-weight: 400;">Types of Receivers</span></h2>

<p><span style="font-weight: 400;">Choosing the right type of SkyWalking receiver is crucial for effectively capturing and processing telemetry data.&nbsp;</span></p>

<p><span style="font-weight: 400;">Each receiver handles specific types of data, ensuring that your observability stack is robust and comprehensive.</span></p>

<h3><span style="font-weight: 400;">Receiver-Trace&nbsp;</span></h3>

<p><span style="font-weight: 400;">The </span><strong>Receiver-Trace</strong><span style="font-weight: 400;"> is the go-to for collecting trace data in the SkyWalking format. It supports both gRPC and HTTPRestful services, hence capturing detailed traces from distributed systems.&nbsp;</span></p>

<p><span style="font-weight: 400;">This receiver is essential for tracking requests as they move through various services, helping to identify bottlenecks and optimize performance.</span></p>

<h3><span style="font-weight: 400;">Receiver-Log&nbsp;</span></h3>

<p><span style="font-weight: 400;">The </span><strong>Receiver-Log</strong><span style="font-weight: 400;"> is designed to accept logging data in multiple formats, including popular ones like Log4j and Logback. This flexibility ensures that no matter what logging framework your application uses, SkyWalking can seamlessly ingest and process the logs.&nbsp;</span></p>

<p><span style="font-weight: 400;">This receiver is vital for gaining insights into application behavior and detecting issues as they occur.</span></p>

<h3><span style="font-weight: 400;">Service-Mesh&nbsp;</span></h3>

<p><span style="font-weight: 400;">For environments utilizing a service mesh architecture, the </span><strong>Service-Mesh</strong><span style="font-weight: 400;"> receiver is indispensable. It accepts data from inbound mesh probes via gRPC services, ensuring full visibility into the communication between microservices.&nbsp;</span></p>

<p><span style="font-weight: 400;">This receiver is crucial for monitoring the health and performance of your service mesh.</span></p>

<h3><span style="font-weight: 400;">Receiver-JVM&nbsp;</span></h3>

<p><span style="font-weight: 400;">The </span><strong>Receiver-JVM</strong><span style="font-weight: 400;"> focuses on collecting metrics from Java Virtual Machines (JVMs) using gRPC services.&nbsp;</span></p>

<p><span style="font-weight: 400;">This receiver allows us to monitor key JVM metrics like memory usage, garbage collection, and thread activity, which are critical for maintaining the performance and stability of Java-based applications.</span></p>

<h3><span style="font-weight: 400;">Istio-Telemetry&nbsp;</span></h3>

<p><span style="font-weight: 400;">The </span><strong>Istio-Telemetry</strong><span style="font-weight: 400;"> receiver is tailored for environments running Istio, a popular service mesh solution.&nbsp;</span></p>

<p><span style="font-weight: 400;">It collects data from Istio's official bypass adapter via gRPC services, ensuring that all telemetry data from your Istio-managed services is accurately captured and analyzed.</span></p>

<h3><span style="font-weight: 400;">Envoy-Metric&nbsp;</span></h3>

<p><span style="font-weight: 400;">The </span><strong>Envoy-Metric</strong><span style="font-weight: 400;"> receiver is designed for environments using Envoy proxies.&nbsp;</span></p>

<p><span style="font-weight: 400;">It supports the collection of GAUGE type metrics via the OAL script, providing granular insights into the performance and behavior of your Envoy proxies.</span></p>

<h3><span style="font-weight: 400;">Receiver-Zipkin and Receiver-Jaeger&nbsp;</span></h3>

<p><span style="font-weight: 400;">For organizations already using Zipkin or Jaeger for tracing, SkyWalking offers the </span><strong>Receiver-Zipkin</strong><span style="font-weight: 400;"> and </span><strong>Receiver-Jaeger</strong><span style="font-weight: 400;">.&nbsp;</span></p>

<p><span style="font-weight: 400;">These receivers integrate your existing tracing data into SkyWalking, hence making most of its powerful analysis and visualization tools without disrupting the current setup.</span></p>

<p><span style="font-weight: 400;">Now that you're familiar with the different types of SkyWalking Receivers, let&rsquo;s dive deeper into the specifics of the Receiver-Trace in the next section</span></p>

<p><span style="font-weight: 400;">Read more on </span><a href="https://openobserve.ai/resources/zipkin-vs-jaeger-open-source-tracing"><strong>Getting Started with Open Source Tracing: Jaeger vs. Zipkin</strong></a><span style="font-weight: 400;">.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Receiver-Trace</span></h2>

<p><span style="font-weight: 400;">When working with </span><strong>SkyWalking Receiver-Trace</strong><span style="font-weight: 400;">, you&rsquo;re dealing with a powerful tool designed to collect and process tracing data via gRPC and HTTPRestful services.&nbsp;</span></p>

<p><span style="font-weight: 400;">Seamless integration and real-time data collection make these services crucial for monitoring and troubleshooting distributed systems.</span></p>

<h3><span style="font-weight: 400;">gRPC and HTTPRestful Services</span></h3>

<p><span style="font-weight: 400;">The </span><strong>SkyWalking Receiver-Trace</strong><span style="font-weight: 400;"> supports both gRPC and HTTPRestful services, offering flexibility in how to collect the tracing data. gRPC is commonly used for its efficiency and performance in high-throughput environments, while HTTPRestful services provide ease of use and broader compatibility.&nbsp;</span></p>

<p><span style="font-weight: 400;">Depending on the system&rsquo;s architecture, you can configure the SkyWalking Receiver to use either or both of these services.</span></p>

<h3><span style="font-weight: 400;">Sample Configuration Settings</span></h3>

<p><span style="font-weight: 400;">Let&rsquo;s consider a typical configuration scenario. Here&rsquo;s a basic setup to use:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receiver-trace:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; gRPC:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; host: </span><span style="font-weight: 400;">0.0.0.0</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; port: </span><span style="font-weight: 400;">11800</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; httpRestful:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; host: </span><span style="font-weight: 400;">0.0.0.0</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; port: </span><span style="font-weight: 400;">12800</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This configuration allows the SkyWalking Receiver-Trace to listen for gRPC connections on port 11800 and HTTPRestful connections on port 12800. These ports are customizable to fit the environment's needs.</span></p>

<h3><span style="font-weight: 400;">Advanced Configuration Options</span></h3>

<p><span style="font-weight: 400;">The true power of </span><strong>SkyWalking Receiver-Trace</strong><span style="font-weight: 400;"> lies in its advanced configuration options, which let us fine-tune the performance and reliability of your tracing setup. Key options include:</span></p>

<ul>

<li style="font-weight: 400;"><strong>bufferPath</strong><span style="font-weight: 400;">: Specifies the directory where the trace data is buffered before being processed.</span></li>

<li style="font-weight: 400;"><strong>bufferOffsetMaxFileSize</strong><span style="font-weight: 400;">: Controls the maximum file size for buffer offsets, allowing for better management of large data streams.</span></li>

<li style="font-weight: 400;"><strong>bufferDataMaxFileSize</strong><span style="font-weight: 400;">: Sets the maximum file size for buffered data, ensuring that your system doesn&rsquo;t get overwhelmed by too much data at once.</span></li>

<li style="font-weight: 400;"><strong>bufferFileCleanWhenRestart</strong><span style="font-weight: 400;">: Determines whether the buffer files are cleaned upon restart, which can help in avoiding data corruption.</span></li>

<li style="font-weight: 400;"><strong>sampleRate</strong><span style="font-weight: 400;">: This is crucial for controlling the amount of trace data collected. Setting the right sample rate can help balance between performance and data granularity.</span></li>

</ul>

<h3><span style="font-weight: 400;">Integrating OpenObserve for Enhanced Tracing</span></h3>

<p><span style="font-weight: 400;">While SkyWalking provides robust tracing capabilities, integrating </span><strong>OpenObserve (O2)</strong><span style="font-weight: 400;"> as a backend can take your observability to the next level. O2&rsquo;s advanced analytics and customizable dashboards allow you to visualize and analyze the tracing data collected by SkyWalking Receiver-Trace in greater detail.</span></p>

<p><span style="font-weight: 400;">This integration enables deeper insights into your application&rsquo;s performance, helping you identify and resolve issues faster.</span></p>

<p><span style="font-weight: 400;">By combining SkyWalking's efficient data collection with OpenObserve's powerful visualization tools, you create a comprehensive observability solution that&rsquo;s both effective and easy to use.&nbsp;</span></p>

<p><span style="font-weight: 400;">Next, let's explore how to configure and use the SkyWalking Receiver-Log to handle various logging formats.</span></p>

<p><span style="font-weight: 400;">Read more on </span><a href="https://openobserve.ai/resources/observability-metrics-three-pillars"><strong>Three Pillars of Observability: Working with Metrics, Logs, and Traces</strong></a><span style="font-weight: 400;">.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Receiver-Log</span></h2>

<p><span style="font-weight: 400;">When handling log data, the </span><strong>SkyWalking Receiver-Log</strong><span style="font-weight: 400;"> is your gateway to efficiently ingesting and processing logs from various sources.&nbsp;</span></p>

<p><span style="font-weight: 400;">Whether you're dealing with Log4j, Logback, or other logging formats, this receiver ensures that your log data is captured and ready for analysis.</span></p>

<h3><span style="font-weight: 400;">Supported Data Formats&nbsp;</span></h3>

<p><span style="font-weight: 400;">The </span><strong>SkyWalking Receiver-Log</strong><span style="font-weight: 400;"> is designed to support a wide range of log data formats, including popular ones like Log4j and Logback.&nbsp;</span></p>

<h4><strong>Log4j and Logback</strong></h4>

<p><span style="font-weight: 400;">SkyWalking Receiver-Log natively supports popular logging frameworks like </span><strong>Log4j</strong><span style="font-weight: 400;"> and </span><strong>Logback</strong><span style="font-weight: 400;">, which are widely used in Java applications. These frameworks are known for their robust logging capabilities, allowing developers to capture detailed information about application behavior, errors, and system performance.&nbsp;</span></p>

<p><span style="font-weight: 400;">By supporting integrations with these frameworks, SkyWalking can capture and analyze logs with minimal changes to your existing logging setup.</span></p>

<p><span style="font-weight: 400;">By accommodating various formats, SkyWalking enables you to maintain a unified logging strategy across your systems.</span></p>

<h3><span style="font-weight: 400;">Configuring the Service&nbsp;</span></h3>

<p><span style="font-weight: 400;">Setting up the </span><strong>SkyWalking Receiver-Log</strong><span style="font-weight: 400;"> involves configuring its services to align with your specific requirements.&nbsp;</span></p>

<p><span style="font-weight: 400;">A basic configuration might look like this:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receiver-log:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; gRPC:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; host: </span><span style="font-weight: 400;">0.0.0.0</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; port: </span><span style="font-weight: 400;">11800</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; httpRestful:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; host: </span><span style="font-weight: 400;">0.0.0.0</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; port: </span><span style="font-weight: 400;">12800</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This setup defines the gRPC and HTTPRestful services, allowing the logs to be received via these protocols.&nbsp;</span></p>

<p><span style="font-weight: 400;">We can customize the host and port settings to match the network architecture and security policies.</span></p>

<h3><span style="font-weight: 400;">Advanced Configuration Settings&nbsp;</span></h3>

<p><span style="font-weight: 400;">For those who need more control over their logging environment, the SkyWalking Receiver-Log offers several advanced configuration options:</span></p>

<ul>

<li style="font-weight: 400;"><strong>logPath</strong><span style="font-weight: 400;">: Specifies the directory where log files are stored before processing.</span></li>

<li style="font-weight: 400;"><strong>logFormat</strong><span style="font-weight: 400;">: Defines the format of incoming logs, ensuring they are parsed and indexed correctly.</span></li>

<li style="font-weight: 400;"><strong>logBufferSize</strong><span style="font-weight: 400;">: Controls the size of the buffer for log data, helping to manage memory usage and processing speed.</span></li>

</ul>

<p><span style="font-weight: 400;">These settings allow you to optimize the performance and reliability of your logging setup, ensuring that your logs are handled efficiently, even in high-volume environments.</span></p>

<h3><span style="font-weight: 400;">Enhancing Log Management with OpenObserve</span></h3>

<p><span style="font-weight: 400;">While SkyWalking provides a solid foundation for log collection, integrating </span><strong>OpenObserve (O2)</strong><span style="font-weight: 400;"> can elevate log management to the next level.&nbsp;</span></p>

<p><span style="font-weight: 400;">OpenObserve excels at ingesting and analyzing logs from multiple sources, offering powerful visualization tools that can turn your raw log data into actionable insights.&nbsp;</span></p>

<p><span style="font-weight: 400;">By integrating O2 with the SkyWalking Receiver-Log, you gain access to customizable dashboards and advanced analytics, making it easier to monitor and troubleshoot your applications.&nbsp;</span></p>

<p><span style="font-weight: 400;">With O2, you&rsquo;re not just collecting logs; you&rsquo;re transforming them into a vital resource for maintaining the health and performance of your systems. Explore more on our</span><a href="https://openobserve.ai/"> <strong>website</strong></a><span style="font-weight: 400;"> or dive into our</span><a href="https://github.com/openobserve"> <strong>GitHub repository</strong></a><span style="font-weight: 400;"> for detailed insights and resources.</span></p>

<p><span style="font-weight: 400;">Next, let&rsquo;s dive into the gRPC/HTTP Server Configuration, where we&rsquo;ll configure how the SkyWalking Receiver processes and serves data.</span></p>

<p><span style="font-weight: 400;">Read more on </span><a href="https://openobserve.ai/resources/open-source-logging-tools"><strong>Empower Your Enterprise With The Top Open-Source Logging Systems for 2024</strong></a><span style="font-weight: 400;">.&nbsp;</span></p>

<h2><span style="font-weight: 400;">gRPC/HTTP Server Configuration</span></h2>

<p><span style="font-weight: 400;">Configuring gRPC and HTTP services within the SkyWalking Receiver is pivotal for enabling smooth data ingestion and processing.&nbsp;</span></p>

<p><span style="font-weight: 400;">These services facilitate the communication between different components in a distributed system, ensuring that traces and logs are effectively captured and analyzed.</span></p>

<h3><span style="font-weight: 400;">Configuring IP and Port for Sharing-Server Module</span></h3>

<p><span style="font-weight: 400;">When setting up the sharing-server module, it&rsquo;s essential to configure the IP address and port to match your network architecture.&nbsp;</span></p>

<p><span style="font-weight: 400;">This customization helps in efficiently routing data to the right endpoints, optimizing the flow of telemetry data across your system.</span></p>

<h3><span style="font-weight: 400;">Default Sharing-Server Settings for REST and gRPC</span></h3>

<p><span style="font-weight: 400;">SkyWalking&rsquo;s default configurations for REST and gRPC services are designed to get you up and running quickly.&nbsp;</span></p>

<p><span style="font-weight: 400;">Fine-tune these settings to better suit your system's specific needs, allowing you greater control over data handling and ensuring your observability setup is both robust and efficient.</span></p>

<h3><span style="font-weight: 400;">Extending Capabilities with OpenObserve</span></h3>

<p><span style="font-weight: 400;">OpenObserve (O2) offers similar gRPC/HTTP configurations, making it a versatile choice for those looking to extend SkyWalking&rsquo;s capabilities.&nbsp;</span></p>

<p><span style="font-weight: 400;">By integrating O2, you can enhance your data ingestion process with advanced analytics and customizable dashboards, giving you deeper insights into your system's performance.&nbsp;</span></p>

<p><span style="font-weight: 400;">This integration not only amplifies your monitoring strategy but also ensures that your observability setup can scale with your growing needs.</span></p>

<p><span style="font-weight: 400;">Read more on </span><a href="https://openobserve.ai/resources/observability-dashboards"><strong>Unifying Observability and Troubleshooting: The Power of Observability Dashboards</strong></a><span style="font-weight: 400;">.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">As we conclude our deep dive into the SkyWalking Receiver, it&rsquo;s clear that understanding how to configure and utilize the various receivers within SkyWalking is key to maximizing the observability and performance of your distributed systems.&nbsp;&nbsp;</span></p>

<p><span style="font-weight: 400;">If you're looking to enhance your observability stack even further, consider integrating OpenObserve (O2). With its powerful analytics, customizable dashboards, and ability to handle diverse telemetry data, O2 can be an invaluable addition to your SkyWalking setup.&nbsp;</span></p>

<p><span style="font-weight: 400;">To explore OpenObserve and see how it can benefit your monitoring and observability efforts, </span><a href="https://cloud.openobserve.ai"><strong>sign up here</strong></a><span style="font-weight: 400;">.&nbsp;</span></p>

<p><span style="font-weight: 400;">For more information, visit our</span><a href="https://openobserve.ai/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> or check out our</span><a href="https://github.com/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">. Start optimizing your systems with the best tools at your disposal!</span></p>
