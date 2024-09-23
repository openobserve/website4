---
title: "Zipkin Receiver: Simplifying Distributed Tracing"
seoTitle: "Zipkin Receiver: Simplifying Distributed Tracing"
description: Receives spans from Zipkin (V1 and V2). Include the Zipkin receiver
  in the receiver definitions.
img: /img/resources/zipkin-receiver.png
alt: Zipkin Receiver
slug: zipkin-receiver-configuration
authors:
  - OpenObserve Team
publishDate: 2024-09-13
tags:
  - Zipkin Receiver
  - Distributed Tracing
  - Zipkin V1
  - Zipkin V2
  - Zipkin Configuration
  - Receiver Definitions
  - Span Receiver
  - Observability Tools
  - Application Monitoring
  - OpenTelemetry
---
<p><span style="font-weight: 400;">The </span><strong>Zipkin Receiver</strong><span style="font-weight: 400;"> is a crucial component in distributed tracing systems, designed to efficiently ingest trace data from applications using Zipkin. By enabling the collection and processing of trace data, the Zipkin Receiver helps developers monitor, troubleshoot, and optimize the performance of distributed systems.&nbsp;</span></p>

<p><span style="font-weight: 400;">Whether you're tracking microservices or analyzing complex workflows, Zipkin Receiver plays a key role in visualizing and understanding how requests flow through your system. Its integration with popular observability platforms allows for real-time insights and improved system diagnostics, making it indispensable for achieving end-to-end observability.</span></p>

<p><span style="font-weight: 400;">Now that we have a clear understanding of what the Zipkin Receiver is, let's explore how it functions within distributed tracing systems, its common use cases, and how various platforms implement it effectively.</span></p>

<h2><span style="font-weight: 400;">Understanding the Role of a Zipkin Receiver: Key Functions and Use Cases</span></h2>

<p><span style="font-weight: 400;">A Zipkin receiver is a component that collects and processes trace data in the Zipkin format. It's often part of a larger distributed tracing system, acting as a gateway for incoming trace information.</span></p>

<div style="text-align: center;">

<img src="https://zipkin.io/public/img/dependency-graph.png" alt="Description of image" width="500" height="300">

</div>

<p><a href="https://zipkin.io/"><span style="font-weight: 400;">Image Credit</span></a></p>

<h3><strong>How it Works:</strong></h3>

<ol>

<li style="font-weight: 400;"><strong>Receives Trace Data:</strong><span style="font-weight: 400;"> It accepts trace data in Zipkin v1 or v2 format, typically through HTTP or Kafka.</span></li>

<li style="font-weight: 400;"><strong>Translation:</strong><span style="font-weight: 400;"> Converts the received Zipkin data into a format compatible with the underlying system (e.g., OpenTelemetry format).</span></li>

<li style="font-weight: 400;"><strong>Forwarding:</strong><span style="font-weight: 400;"> Sends the processed trace data to other components for storage, analysis, or visualization.</span></li>

</ol>

<h3><strong>Common Use Cases:</strong></h3>

<ul>

<li style="font-weight: 400;"><strong>Collecting traces from Zipkin-instrumented applications:</strong><span style="font-weight: 400;"> Integrating with existing systems that generate Zipkin data.</span></li>

<li style="font-weight: 400;"><strong>Acting as a bridge between Zipkin and other tracing systems:</strong><span style="font-weight: 400;"> Combining data from different sources for unified analysis.</span></li>

<li style="font-weight: 400;"><strong>Offloading trace data processing:</strong><span style="font-weight: 400;"> Distributing the workload of handling trace data.</span></li>

</ul>

<h3><strong>Popular Implementations:</strong></h3>

<ul>

<li style="font-weight: 400;"><strong>OpenObserve: </strong><span style="font-weight: 400;">Combine it with a Zipkin-compatible receiver like Jaeger and a Zipkin-to-OpenTelemetry converter.</span></li>

<li style="font-weight: 400;"><strong>Apache SkyWalking:</strong><span style="font-weight: 400;"> Includes a Zipkin receiver to process Zipkin traces alongside its native trace data.</span></li>

<li style="font-weight: 400;"><strong>Splunk Observability Cloud:</strong><span style="font-weight: 400;"> Offers a Zipkin receiver as part of its OpenTelemetry Collector.</span></li>

<li style="font-weight: 400;"><strong>AWS Distro for OpenTelemetry (ADOT):</strong><span style="font-weight: 400;"> Provides a Zipkin receiver for collecting and processing Zipkin data.</span></li>

</ul>

<h3><strong>Key Points:</strong></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Supports Zipkin v1 and v2 formats.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Can be configured to handle different input and output formats.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Often used in conjunction with other components like processors and exporters.</span></li>

</ul>

<h2><span style="font-weight: 400;">Getting Started</span></h2>

<p><span style="font-weight: 400;">To effectively set up and utilize a Zipkin receiver for distributed tracing, follow these detailed steps, including example configurations for various implementations.</span></p>

<h3><span style="font-weight: 400;">Steps to Use a Zipkin Receiver</span></h3>

<h4><span style="font-weight: 400;">1. Choose a Zipkin Receiver Implementation</span></h4>

<p><span style="font-weight: 400;">There are several options available for implementing a Zipkin receiver:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">OpenObserve: Combine it with a Zipkin-compatible receiver like Jaeger and a Zipkin-to-OpenTelemetry converter.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Apache SkyWalking: Provides a Zipkin receiver as part of its observability platform, supporting both Zipkin v1 and v2 formats.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Splunk Observability Cloud: Includes a Zipkin receiver as part of its OpenTelemetry Collector, which can gather spans from Zipkin versions 1 and 2.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">AWS Distro for OpenTelemetry (ADOT): Offers a Zipkin receiver for collecting and processing Zipkin data.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Custom Implementation: For specific requirements, you can build a custom Zipkin receiver.</span></li>

</ul>

<h4><span style="font-weight: 400;">2. Install and Configure the Receiver</span></h4>

<p><span style="font-weight: 400;">Follow the installation and configuration instructions specific to your chosen implementation. This typically involves:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Downloading and installing dependencies: Ensure all necessary libraries and tools are in place.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Configuring the receiver's endpoint: Set the host and port for receiving Zipkin data.&nbsp;</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Specifying the format of incoming Zipkin data: Choose between v1 or v2 formats.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Configuring output options: Determine where to send the processed trace data.</span></li>

</ul>

<h4><span style="font-weight: 400;">3. Configure Zipkin-Instrumented Applications</span></h4>

<p><span style="font-weight: 400;">Ensure your applications are instrumented to send trace data in Zipkin format to the receiver's endpoint. This involves:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Adding Zipkin libraries to your application.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Configuring these libraries to send spans to the specified receiver.</span></li>

</ul>

<h4><span style="font-weight: 400;">4. Start the Receiver</span></h4>

<p><span style="font-weight: 400;">After configuration, start the Zipkin receiver service. This could involve running a command or starting a service depending on the implementation.</span></p>

<h4><span style="font-weight: 400;">5. Verify Data Reception</span></h4>

<p><span style="font-weight: 400;">Monitor the receiver to ensure it is receiving trace data. This can be done by:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Checking logs for incoming data.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Using built-in monitoring tools provided by the receiver.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Visualizing traces using the Zipkin UI, typically accessible at </span><span style="font-weight: 400;">http://localhost:9411/zipkin</span><span style="font-weight: 400;">.</span></li>

</ul>

<h3><span style="font-weight: 400;">Additional Considerations</span></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Error Handling: Implement mechanisms to deal with invalid or malformed trace data.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Data Storage: Decide where to store processed trace data, such as in a time-series database or search engine.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Security: Consider security measures to protect sensitive data within trace data.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Performance: Optimize the receiver for performance, especially when handling high volumes of trace data.</span></li>

</ul>

<h3><span style="font-weight: 400;">Best Practices</span></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Use a reliable and scalable Zipkin receiver implementation.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Properly configure the receiver to match your environment and requirements.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Thoroughly test the receiver to ensure functionality.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Continuously monitor the receiver's performance and adjust configurations as necessary.</span></li>

</ul>

<p><span style="font-weight: 400;">By following these steps and considering the additional factors, you can effectively set up and utilize a Zipkin receiver for your distributed tracing needs. In the following section, you will learn about advanced configuration.</span></p>

<h2><span style="font-weight: 400;">Advanced Configuration for Zipkin Receiver</span></h2>

<p><span style="font-weight: 400;">A Zipkin receiver is a crucial component in distributed tracing, enabling the collection and processing of trace data from various services. To maximize its functionality and adaptability, several advanced configuration options are available. Let&rsquo;s explore these options in detail:</span></p>

<h3><span style="font-weight: 400;">1. Utilizes Several Helper Files for Added Capabilities</span></h3>

<p><span style="font-weight: 400;">Zipkin receivers can leverage external configuration files or libraries to enhance their features and flexibility. These helper files may include:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Custom Data Processors</strong><span style="font-weight: 400;">: These are scripts or modules designed to transform or enrich incoming trace data before it is stored or analyzed. This can involve adding metadata, filtering out unnecessary information, or altering the structure of the data for better compatibility with downstream systems.</span></li>

<li style="font-weight: 400;"><strong>Error Handling Mechanisms</strong><span style="font-weight: 400;">: Robust error handling is essential for maintaining the integrity of trace data. Configuration options may include defining fallback procedures, logging errors, and notifying system administrators of issues.</span></li>

<li style="font-weight: 400;"><strong>Metrics and Logging Configurations</strong><span style="font-weight: 400;">: Monitoring the performance of the receiver is vital for troubleshooting and optimization. Configurable metrics can track throughput, error rates, and latency, while logging configurations can capture detailed operational logs for analysis.</span></li>

<li style="font-weight: 400;"><strong>Integration with Other Systems</strong><span style="font-weight: 400;">: Advanced configurations can facilitate connections with external components such as storage solutions (databases, cloud storage), analytics platforms, or alerting systems, enabling a more cohesive observability strategy.</span></li>

</ul>

<p><span style="font-weight: 400;">By modularizing these functionalities, you can customize the receiver's behavior without altering the core codebase, making it easier to maintain and upgrade.</span></p>

<h3><span style="font-weight: 400;">2. Supports gRPC Settings Including CORS</span></h3>

<p><span style="font-weight: 400;">Many Zipkin receivers now support gRPC as a communication protocol for receiving trace data, which offers several advanced configuration options:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Specify gRPC Server Settings</strong><span style="font-weight: 400;">: You can configure essential parameters such as the server's port, host, and the maximum number of concurrent connections. This flexibility allows for better resource management and performance tuning.</span></li>

<li style="font-weight: 400;"><strong>Configure CORS (Cross-Origin Resource Sharing)</strong><span style="font-weight: 400;">: Enabling CORS is crucial for allowing cross-origin requests to access the receiver's API. This is particularly important in web applications where the frontend may need to interact with the receiver from a different domain.</span></li>

<li style="font-weight: 400;"><strong>Implement Authentication and Authorization</strong><span style="font-weight: 400;">: Security is a top priority, and advanced configurations can include mechanisms for authenticating requests and authorizing access to the receiver. This helps protect sensitive trace data from unauthorized access.</span></li>

</ul>

<h3><span style="font-weight: 400;">3. Incorporates TLS and mTLS Settings</span></h3>

<p><span style="font-weight: 400;">Security configurations are vital when handling sensitive trace data. Advanced settings for TLS (Transport Layer Security) and mTLS (Mutual TLS) include:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Enabling TLS</strong><span style="font-weight: 400;">: This ensures that data transmitted between the sender and receiver is encrypted, safeguarding it from eavesdropping and tampering.</span></li>

<li style="font-weight: 400;"><strong>Configuring mTLS</strong><span style="font-weight: 400;">: By requiring both the client and server to authenticate each other, mTLS adds an additional layer of security, ensuring that only trusted entities can communicate with the receiver.</span></li>

<li style="font-weight: 400;"><strong>Customizing Certificate and Key Management</strong><span style="font-weight: 400;">: Fine-grained control over encryption and authentication can be achieved by customizing how certificates and keys are managed, including specifying paths, formats, and rotation policies.</span></li>

</ul>

<h3><span style="font-weight: 400;">4. Offers Queuing, Retry, and Timeout Settings</span></h3>

<p><span style="font-weight: 400;">To handle varying load conditions and ensure data reliability, Zipkin receivers often provide:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Queuing Mechanisms</strong><span style="font-weight: 400;">: These allow incoming trace data to be buffered temporarily, preventing overload during peak traffic and improving overall performance.</span></li>

<li style="font-weight: 400;"><strong>Retry Policies</strong><span style="font-weight: 400;">: Configurable retry mechanisms can automatically resend failed requests, increasing the likelihood of successful data delivery and minimizing data loss.</span></li>

<li style="font-weight: 400;"><strong>Timeout Settings</strong><span style="font-weight: 400;">: Defining maximum waiting times for responses helps prevent indefinite blocking, ensuring that the receiver remains responsive even under heavy load.</span></li>

</ul>

<p><span style="font-weight: 400;">By carefully tuning these parameters, you can optimize the receiver's behavior to meet specific operational requirements.</span></p>

<h3><span style="font-weight: 400;">Additional Considerations</span></h3>

<p><span style="font-weight: 400;">Beyond the core configurations, there are several additional factors to consider for a robust Zipkin receiver setup:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Load Balancing</strong><span style="font-weight: 400;">: Implementing load balancing strategies can distribute incoming traffic across multiple receiver instances, enhancing high availability and scalability.</span></li>

<li style="font-weight: 400;"><strong>Monitoring and Alerting</strong><span style="font-weight: 400;">: Establishing a robust monitoring framework is critical to track receiver performance. Setting up alerts for critical issues ensures timely responses to potential problems.</span></li>

<li style="font-weight: 400;"><strong>Data Retention</strong><span style="font-weight: 400;">: Determine the appropriate retention policy for trace data based on your organizational needs and storage capabilities. This helps manage storage costs and compliance requirements.</span></li>

<li style="font-weight: 400;"><strong>Performance Optimization</strong><span style="font-weight: 400;">: Fine-tuning configuration settings to maximize throughput and minimize latency can significantly enhance the overall efficiency of the Zipkin receiver.</span></li>

</ul>

<p><span style="font-weight: 400;">By understanding and effectively utilizing these advanced configuration options, you can build a robust and efficient Zipkin receiver tailored to your specific use case, ultimately improving your distributed tracing capabilities and observability strategy.</span></p>

<h2><span style="font-weight: 400;">Documentation</span></h2>

<h3><strong>Package zipkinreceiver</strong></h3>

<p><span style="font-weight: 400;">The zipkinreceiver package is specifically designed to handle incoming Zipkin trace data. This implies that it's optimized for processing and storing traces in the Zipkin format. It likely provides functions and structures to:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Parse incoming Zipkin spans.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Validate the structure of received data.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Extract relevant information from spans (e.g., trace ID, span ID, parent ID, timestamps, annotations, binary annotations).</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Store or forward the processed trace data to a backend system.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Handle potential errors or exceptions during the process.</span></li>

</ul>

<h3><strong>Functions and Types</strong></h3>

<ol>

<li><strong> NewFactory():</strong></li>

</ol>

<p><span style="font-weight: 400;">This function is typically used to create a new instance of a Zipkin receiver factory. A factory pattern is often employed to encapsulate the creation of receiver objects, allowing for flexible configuration and customization.</span></p>

<p><span style="font-weight: 400;">The NewFactory() function might accept configuration parameters to specify the receiver's behavior, such as:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Listening address</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Data format (Zipkin v1 or v2)</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Storage backend</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Error handling strategy</span></li>

</ul>

<ol start="2">

<li><strong> type Config:</strong></li>

</ol>

<p><span style="font-weight: 400;">The Config struct represents the configuration settings for a Zipkin receiver. It typically includes fields for:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Listener address (host and port)</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Data format (Zipkin v1 or v2)</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Storage backend configuration (e.g., database connection string)</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Buffer size (for queuing incoming spans)</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Sampling rate (for reducing data volume)</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Error handling options (e.g., retry policy, logging)</span></li>

</ul>

<ol start="3">

<li><strong> func (cfg *Config) Validate() error:</strong></li>

</ol>

<p><span style="font-weight: 400;">This method is essential for ensuring the correctness and consistency of the receiver configuration. It performs validation checks on the Config struct to detect any invalid or missing values. Errors returned by this function can help prevent runtime issues and provide informative error messages to users.</span></p>

<h3><strong>Additional Considerations</strong></h3>

<ul>

<li style="font-weight: 400;"><strong>Performance:</strong><span style="font-weight: 400;"> The zipkinreceiver package should be optimized for handling high volumes of trace data efficiently. This might involve using asynchronous processing, batching, and efficient data structures.</span></li>

<li style="font-weight: 400;"><strong>Error Handling:</strong><span style="font-weight: 400;"> Robust error handling is crucial to prevent data loss and maintain system reliability. The package should provide mechanisms for handling network errors, parsing errors, storage failures, and other exceptions.</span></li>

<li style="font-weight: 400;"><strong>Extensibility:</strong><span style="font-weight: 400;"> The package might offer extension points for custom data processing, storage, and output formats to accommodate diverse use cases.</span></li>

<li style="font-weight: 400;"><strong>Testing:</strong><span style="font-weight: 400;"> Comprehensive unit and integration tests are essential to ensure the correctness and reliability of the receiver.</span></li>

</ul>

<p><span style="font-weight: 400;">By understanding these core components and their functionalities, developers can effectively use the zipkinreceiver package to build reliable and efficient distributed tracing systems.</span></p>

<h2><span style="font-weight: 400;">Use OpenObserve with the Zipkin receiver:</span></h2>

<h3><span style="font-weight: 400;">Configure the Zipkin Receiver in OpenObserve</span></h3>

<p><span style="font-weight: 400;">To enable the Zipkin receiver in OpenObserve, you need to add the following configuration to your OpenObserve collector configuration file:</span></p>

<p><span style="color: #00ff00;">text </span></p>

<p><span style="color: #00ff00;">receivers: </span></p>

<p><span style="color: #00ff00;">zipkin: </span></p>

<p><span style="color: #00ff00;">endpoint: 0.0.0.0:9411 </span></p>

<p><span style="color: #00ff00;">format: proto</span></p>

<p><span style="font-weight: 400;">This configures the Zipkin receiver to listen on 0.0.0.0:9411 and accept spans in Protobuf format.</span></p>

<h3><span style="font-weight: 400;">Send Zipkin Spans to OpenObserve</span></h3>

<p><span style="font-weight: 400;">To send Zipkin spans to OpenObserve, you can use the default Zipkin span submission endpoint:</span></p>

<p><span style="color: #00ff00;">text </span></p>

<p><span style="color: #00ff00;">http://localhost:9411/api/v2/spans</span></p><p><span style="font-weight: 400;">The Content-Type should be application/json, and you can optionally use gzip encoding.</span></p>

<p><span style="font-weight: 400;">Alternatively, if you have configured the Zipkin receiver to accept Protobuf format, you would send spans to:</span></p>

<p><span style="color: #00ff00;">text&nbsp;</span></p>

<p><span style="color: #00ff00;"><a href="http://localhost:9411/api/v2/spans?">http://localhost:9411/api/v2/spans?</a></span><span style="color: #00ff00;">format=proto&nbsp;</span></p>

<h3><span style="font-weight: 400;">Visualize Traces in OpenObserve</span></h3>

<p><span style="font-weight: 400;">Once you have sent Zipkin spans to OpenObserve, you can visualize the traces in the OpenObserve UI. OpenObserve provides advanced features for analyzing trace data, such as:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Distributed context propagation</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Distributed transaction monitoring</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Root cause analysis</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Service dependency analysis</span></li>

</ul>

<h3><span style="font-weight: 400;">Migrate from Zipkin to OpenObserve</span></h3>

<p><span style="font-weight: 400;">If you are migrating from Zipkin to OpenObserve, you can leverage Jaeger's compatibility with Zipkin. Jaeger supports Zipkin's B3 propagation format, allowing you to join traces with other Zipkin-instrumented services.</span></p>

<p><span style="font-weight: 400;">Additionally, Jaeger accepts Zipkin spans in Thrift format over HTTP, with the default endpoint being:</span></p>

<p><span style="color: #00ff00;">text&nbsp;</span></p>

<p><span style="color: #00ff00;"><a href="http://localhost:14268/api/traces?">http://localhost:14268/api/traces?</a></span><span style="color: #00ff00;">format=zipkin.thrift</span></p>

<p><span style="font-weight: 400;">By supporting Zipkin's B3 propagation format and providing a Zipkin-compatible API, Jaeger makes it easier to migrate from Zipkin and join traces across different instrumentation systems.</span></p>

<p><span style="font-weight: 400;">In summary, to use OpenObserve with the Zipkin receiver, you need to configure the receiver in OpenObserve, send Zipkin spans to the appropriate endpoint, and visualize the traces in the OpenObserve UI. OpenObserve's compatibility with Jaeger also simplifies the migration process from Zipkin.</span></p>

<h2><strong>Conclusion</strong></h2>

<p><span style="font-weight: 400;">By effectively utilizing a Zipkin receiver, you can seamlessly integrate your distributed tracing system with the broader observability landscape. OpenObserve, with its powerful capabilities and compatibility with Zipkin, offers a compelling solution for comprehensive trace analysis and optimization.</span></p>

<p><strong>Ready to unlock the full potential of your trace data?</strong> <a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">Sign up for OpenObserve today and experience the difference</span></a><span style="font-weight: 400;">. With OpenObserve, you can effortlessly collect, process, and visualize Zipkin traces, gaining valuable insights into your application's performance and behavior.</span></p>

<p><strong>Start your journey towards enhanced observability with OpenObserve!</strong></p>

<h3><strong>Additional Considerations</strong></h3>

<ul>

<li style="font-weight: 400;"><strong>Security:</strong><span style="font-weight: 400;"> Implement robust security measures to protect sensitive data within trace data.</span></li>

<li style="font-weight: 400;"><strong>Performance:</strong><span style="font-weight: 400;"> Optimize the receiver for performance, especially when handling high volumes of trace data.</span></li>

<li style="font-weight: 400;"><strong>Data Retention:</strong><span style="font-weight: 400;"> Determine an appropriate data retention policy based on your organizational needs and storage capabilities.</span></li>

<li style="font-weight: 400;"><strong>Monitoring:</strong><span style="font-weight: 400;"> Continuously monitor the receiver's performance and adjust configurations as necessary.</span></li>

</ul>

<p><span style="font-weight: 400;">By following these guidelines and leveraging the power of OpenObserve, you can effectively harness the value of your Zipkin data and drive improvements in your application's performance and reliability.</span></p>

<p><span style="font-weight: 400;">Resources</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Getting Started with the Jaeger and Zipkin Receivers. </span><a href="https://aws-otel.github.io/docs/components/jaeger-zipkin-receiver/"><span style="font-weight: 400;"><br>https://aws-otel.github.io/docs/components/jaeger-zipkin-receiver/</span></a><span style="font-weight: 400;">&nbsp;&nbsp;</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Configuring OpenTelemetry Collector to Export Zipkin traces. </span><a href="https://stackoverflow.com/questions/66569690/configuring-opentelemetry-collector-to-export-zipkin-traces"><span style="font-weight: 400;"><br>https://stackoverflow.com/questions/66569690/configuring-opentelemetry-collector-to-export-zipkin-traces</span></a><span style="font-weight: 400;">&nbsp;</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Understanding the Basics of Distributed Tracing. </span><a href="https://openobserve.ai/resources/distributed-tracing-basics-understanding/"><span style="font-weight: 400;"><br>https://openobserve.ai/resources/distributed-tracing-basics-understanding/</span></a><span style="font-weight: 400;">&nbsp;&nbsp;</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Getting Started with Jaeger Tracing </span><a href="https://openobserve.ai/resources/jaeger-ui-guide/"><span style="font-weight: 400;"><br>https://openobserve.ai/resources/jaeger-ui-guide/</span></a><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Getting Started with Open Source Tracing: Jaeger vs. Zipkin. </span><a href="https://openobserve.ai/resources/zipkin-vs-jaeger-open-source-tracing/"><span style="font-weight: 400;"><br>https://openobserve.ai/resources/zipkin-vs-jaeger-open-source-tracing/</span></a><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;</span></li>

<li style="font-weight: 400;"><em><span style="font-weight: 400;">Understanding the Basics of Distributed Tracing</span></em><span style="font-weight: 400;">. </span><a href="https://openobserve.ai/resources/distributed-tracing-basics-understanding/"><span style="font-weight: 400;"><br>https://openobserve.ai/resources/distributed-tracing-basics-understanding/</span></a></li>

<li style="font-weight: 400;"><em><span style="font-weight: 400;">Getting Started with OpenTelemetry Collector</span></em><span style="font-weight: 400;">. </span><a href="https://openobserve.ai/resources/otel-collector/"><span style="font-weight: 400;"><br>https://openobserve.ai/resources/otel-collector/</span></a></li>

<li style="font-weight: 400;"><em><span style="font-weight: 400;">Getting Started with Jaeger Tracing: A Guide</span></em><span style="font-weight: 400;">. </span><a href="https://openobserve.ai/resources/jaeger-ui-guide/"><span style="font-weight: 400;"><br>https://openobserve.ai/resources/jaeger-ui-guide/</span></a></li>

<li style="font-weight: 400;"><em><span style="font-weight: 400;">Nginx OpenTelemetry Collector Documentation</span></em><span style="font-weight: 400;">. </span><a href="https://openobserve.ai/resources/nginx-receiver-integration/"><span style="font-weight: 400;"><br>https://openobserve.ai/resources/nginx-receiver-integration/</span></a></li>

</ul>

<p><em><span style="font-weight: 400;">OpenTelemetry filelog receiver + OpenObserve: Any logs </span></em><a href="https://www.youtube.com/watch?v=Jqocv1UYn6Y"><span style="font-weight: 400;"><br>https://www.youtube.com/watch?v=Jqocv1UYn6Y</span></a></p>
