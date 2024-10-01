---
title: Getting Started with OpenTelemetry OTLP Exporters
seoTitle: Getting Started with OpenTelemetry OTLP Exporters
description: Start with OpenTelemetry OTLP Exporters; an overview, benefits of
  using them in telemetry, and their importance.
img: /img/resources/getting-started-with-opentelemetry-otlp-exporters.png
alt: otel exporters
slug: otel-exporters-introduction
authors:
  - openobserve-team
publishDate: 2024-10-01
tags:
  - otel exporters
  - OpenTelemetry
---
<p><span style="font-weight: 400;">If you're aiming to supercharge your telemetry setup, mastering OTLP exporters is essential.&nbsp;</span></p>

<p><span style="font-weight: 400;">OpenTelemetry Protocol (OTLP) exporters are pivotal in transmitting collected telemetry data&mdash;traces, metrics, and logs&mdash;from your applications to a backend observability platform. Whether you&rsquo;re using OTLP over HTTP or gRPC, these exporters ensure that your data is reliably sent for storage and analysis.</span></p>

<p><span style="font-weight: 400;">Integrating OTLP exporters into your telemetry setup offers numerous advantages:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Standardization:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTLP is an open standard, ensuring compatibility and interoperability across different tools and platforms, simplifying integration, and reducing vendor lock-in.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Flexibility:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTLP supports both HTTP and gRPC protocols, providing flexibility to choose the best transport mechanism based on your infrastructure needs.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Efficiency:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTLP is designed for efficient data transport, supporting features like compression and batching to optimize network usage and reduce overhead.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Enhanced Observability:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Using OTLP exporters allows you to send telemetry data to powerful observability platforms, enabling advanced visualization and alerting capabilities for real-time system performance monitoring.</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">In the next sections, we&rsquo;ll dive deeper into the OTLP protocol, explore its key characteristics, and guide you through setting up various OTLP exporters.&nbsp;</span></p>

<h2><span style="font-weight: 400;">OTLP Protocol</span></h2>

<p><span style="font-weight: 400;">The OpenTelemetry Protocol (OTLP) is the backbone of efficient telemetry data transmission, designed to standardize and optimize how traces, metrics, and logs are transported from your applications to observability backends.&nbsp;</span></p>

<p><strong>Key Characteristics</strong></p>

<p><strong>Open Standard:</strong><span style="font-weight: 400;"> Ensures compatibility with various tools and platforms.</span></p>

<p><strong>Versatility:</strong><span style="font-weight: 400;"> Supports traces, metrics, and logs in a unified format.</span></p>

<p><strong>Efficiency:</strong><span style="font-weight: 400;"> Optimized for high-performance data transmission.</span></p>

<p>&nbsp;</p>

<h3><span style="font-weight: 400;">Encoding, Transport, and Delivery Mechanisms</span></h3>

<p><span style="font-weight: 400;">OTLP is designed to handle large volumes of telemetry data with minimal overhead. Here's how it achieves this:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Encoding:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Uses Protocol Buffers (protobuf) for efficient serialization of telemetry data. This ensures compact and fast encoding and decoding, which is crucial for performance-sensitive applications.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Transport:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Supports both gRPC and HTTP protocols, allowing you to choose the best transport mechanism for your environment. gRPC is preferred for its performance and support for streaming, while HTTP is more widely supported and easier to debug.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Delivery:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Employs mechanisms like compression and batching to optimize data delivery, reducing the load on both the network and the backend systems.</span></li>

</ul>

</ol>

<h3><span style="font-weight: 400;">Request and Response Model</span></h3>

<p><span style="font-weight: 400;">OTLP operates on a straightforward request and response model:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Request:</strong><span style="font-weight: 400;"> The client sends a request containing telemetry data to the backend.</span></li>

<li style="font-weight: 400;"><strong>Response:</strong><span style="font-weight: 400;"> The backend processes the request and sends a response indicating success or failure.</span></li>

</ul>

<p><span style="font-weight: 400;">This model ensures reliable data transmission and provides feedback on the status of each data export operation.</span></p>

<h3><span style="font-weight: 400;">Implementation Over gRPC and HTTP</span></h3>

<p><span style="font-weight: 400;">OTLP can be implemented over gRPC and HTTP, each with its unique advantages:</span></p>

<ol>

<li style="font-weight: 400;"><strong>OTLP/gRPC:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Usage:</strong><span style="font-weight: 400;"> Ideal for high-performance, low-latency environments.</span></li>

<li style="font-weight: 400;"><strong>Transmission:</strong><span style="font-weight: 400;"> Uses unary requests to send telemetry data in a single request-response cycle.</span></li>

<li style="font-weight: 400;"><strong>Requests:</strong><span style="font-weight: 400;"> Supports different request types such as </span><span style="font-weight: 400;">ExportTraceServiceRequest</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">ExportMetricsServiceRequest</span><span style="font-weight: 400;">, and </span><span style="font-weight: 400;">ExportLogsServiceRequest</span><span style="font-weight: 400;">.</span></li>

<li style="font-weight: 400;"><strong>Continuous Flow:</strong><span style="font-weight: 400;"> Allows for a continuous sequence of requests and responses, making it suitable for real-time telemetry data transmission.</span></li>

</ul>

<li style="font-weight: 400;"><strong>OTLP/HTTP:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Usage:</strong><span style="font-weight: 400;"> Preferred for environments where HTTP is the standard protocol.</span></li>

<li style="font-weight: 400;"><strong>Payloads:</strong><span style="font-weight: 400;"> Uses protobuf payloads in binary or JSON format, transmitted via HTTP POST requests.</span></li>

<li style="font-weight: 400;"><strong>Fallback Mechanism:</strong><span style="font-weight: 400;"> Supports fallback from HTTP/2 to HTTP/1.1 to ensure compatibility with various network configurations.</span></li>

</ul>

</ol>

<h3><span style="font-weight: 400;">Example Configuration</span></h3>

<p><span style="font-weight: 400;">Here&rsquo;s a quick example of how you can set up OTLP over gRPC in your OpenTelemetry Collector configuration:</span></p>

<table>

<tbody>

<tr style="height: 230.25px;">

<td style="height: 230.25px;">

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; protocol: </span><span style="font-weight: 400;">grpc</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By understanding the key characteristics and implementation details of the OTLP protocol, you can optimize your telemetry data transmission and ensure that your observability setup is both robust and efficient.</span></p>

<p><span style="font-weight: 400;">In the next sections, we&rsquo;ll delve into the specifics of using OTLP over HTTP and gRPC, providing detailed configurations and examples to help you get started.&nbsp;</span></p>

<h2><span style="font-weight: 400;">OTLP/HTTP</span></h2>

<p><span style="font-weight: 400;">OpenTelemetry Protocol (OTLP) over HTTP provides a flexible and widely supported method for transmitting telemetry data.&nbsp;</span></p>

<h3><span style="font-weight: 400;">Usage of Protobuf Payloads in Binary or JSON Format</span></h3>

<p><span style="font-weight: 400;">OTLP/HTTP supports the transmission of telemetry data using Protocol Buffers (protobuf) payloads, which can be encoded in either binary or JSON format.</span></p>

<ul>

<li style="font-weight: 400;"><strong>Binary Format:</strong><span style="font-weight: 400;"> More efficient in terms of size and speed, ideal for high-performance applications.</span></li>

<li style="font-weight: 400;"><strong>JSON Format:</strong><span style="font-weight: 400;"> Easier to debug and human-readable, making it useful for development and testing environments.</span></li>

</ul>

<h3><span style="font-weight: 400;">HTTP POST Requests</span></h3>

<p><span style="font-weight: 400;">Telemetry data is sent via HTTP POST requests. Each request carries the encoded protobuf payload, ensuring that the data is delivered efficiently and securely.</span></p>

<p><strong>Example POST Request:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">POST</span> <span style="font-weight: 400;">/v1/traces</span><span style="font-weight: 400;"> HTTP/1.1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Host</span><span style="font-weight: 400;">: telemetry-backend.example.com</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Content-Type</span><span style="font-weight: 400;">: application/x-protobuf</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Content-Length</span><span style="font-weight: 400;">: 123</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">(</span><span style="font-weight: 400;">binary</span><span style="font-weight: 400;"> payload)</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Fallback Mechanism from HTTP/2 to HTTP/1.1</span></h3>

<p><span style="font-weight: 400;">OTLP/HTTP is designed to be robust and adaptable to various network conditions.&nbsp;</span></p>

<p><span style="font-weight: 400;">One of its key features is the fallback mechanism that allows it to switch from HTTP/2 to HTTP/1.1 if needed.&nbsp;</span></p>

<p><span style="font-weight: 400;">This ensures compatibility with a broader range of network infrastructures and avoids disruptions in data transmission.</span></p>

<h3><span style="font-weight: 400;">Setting Up OTLP/HTTP Exporter</span></h3>

<p><span style="font-weight: 400;">To configure the OTLP/HTTP exporter in your OpenTelemetry Collector, you need to specify the endpoint and any additional settings required for your environment.</span></p>

<p><strong>Example Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlphttp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4318"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; headers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; Authorization: </span><span style="font-weight: 400;">"Bearer your_api_token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; compression: </span><span style="font-weight: 400;">gzip</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; timeout: </span><span style="font-weight: 400;">10</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlphttp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlphttp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlphttp]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Benefits of Using OTLP/HTTP</span></h3>

<ol>

<li style="font-weight: 400;"><strong>Widespread Support:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">HTTP is universally supported, making it easier to integrate OTLP exporters with various network configurations and backends.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Flexibility:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Offers flexibility in payload encoding (binary or JSON), allowing you to choose the format that best suits your needs.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Compatibility:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The fallback mechanism ensures compatibility with different HTTP versions, enhancing the reliability of your telemetry data transmission.</span></li>

</ul>

</ol>

<h3><strong>Practical Use Case</strong></h3>

<p><span style="font-weight: 400;">Consider a scenario where you need to monitor a distributed application deployed across multiple environments.&nbsp;</span></p>

<p><span style="font-weight: 400;">Using OTLP/HTTP, you can easily configure your telemetry pipeline to send data from various sources to a centralized observability platform.</span></p>

<p><strong>Example Use Case Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlphttp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://observability.example.com/v1/metrics"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; headers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; Authorization: </span><span style="font-weight: 400;">"Bearer api_key"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; compression: </span><span style="font-weight: 400;">gzip</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlphttp]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By understanding and implementing OTLP/HTTP, you can ensure that your telemetry data is efficiently transmitted and compatible with a wide range of backends.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore OTLP/gRPC, detailing its setup and advantages, and providing configuration examples to help you implement it effectively.&nbsp;</span></p>

<h2><span style="font-weight: 400;">OTLP/gRPC</span></h2>

<p><span style="font-weight: 400;">OpenTelemetry Protocol (OTLP) over gRPC offers a high-performance, efficient way to transmit telemetry data.&nbsp;</span></p>

<p><span style="font-weight: 400;">This section covers how OTLP/gRPC works, its advantages, and how to set it up in your telemetry pipeline.</span></p>

<h3><span style="font-weight: 400;">Transmission of Telemetry Data with Unary Requests</span></h3>

<p><span style="font-weight: 400;">OTLP/gRPC uses unary requests to transmit telemetry data. This means that each request and response cycle involves a single request from the client and a single response from the server.&nbsp;</span></p>

<p><span style="font-weight: 400;">This method is highly efficient and ideal for real-time telemetry data transmission.</span></p>

<p><strong>Example Unary Request:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">service</span> <span style="font-weight: 400;">ExportService</span><span style="font-weight: 400;"> {</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">rpc</span><span style="font-weight: 400;"> Export (ExportTraceServiceRequest) </span><span style="font-weight: 400;">returns</span><span style="font-weight: 400;"> (ExportTraceServiceResponse);</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Types of Requests</span></h3>

<p><span style="font-weight: 400;">OTLP/gRPC supports various request types, each designed to handle different kinds of telemetry data:</span></p>

<ol>

<li style="font-weight: 400;"><strong>ExportTraceServiceRequest:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Used to export trace data.</span></li>

<li style="font-weight: 400;"><strong>Example:</strong> <span style="font-weight: 400;">ExportTraceServiceRequest</span><span style="font-weight: 400;"> includes trace spans.</span></li>

</ul>

<li style="font-weight: 400;"><strong>ExportMetricsServiceRequest:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Used to export metric data.</span></li>

<li style="font-weight: 400;"><strong>Example:</strong> <span style="font-weight: 400;">ExportMetricsServiceRequest</span><span style="font-weight: 400;"> includes metric points.</span></li>

</ul>

<li style="font-weight: 400;"><strong>ExportLogsServiceRequest:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Used to export log data.</span></li>

<li style="font-weight: 400;"><strong>Example:</strong> <span style="font-weight: 400;">ExportLogsServiceRequest</span><span style="font-weight: 400;"> includes log entries.</span></li>

</ul>

</ol>

<h3><span style="font-weight: 400;">Continuous Sequence of Requests and Responses</span></h3>

<p><span style="font-weight: 400;">OTLP/gRPC supports a continuous sequence of requests and responses, making it suitable for environments where telemetry data needs to be sent and processed in real-time.&nbsp;</span></p>

<p><span style="font-weight: 400;">This continuous flow ensures low-latency transmission and immediate feedback.</span></p>

<h3><span style="font-weight: 400;">Setting Up OTLP/gRPC Exporter</span></h3>

<p><span style="font-weight: 400;">To configure the OTLP/gRPC exporter in your OpenTelemetry Collector, you need to specify the endpoint and any additional settings required for your environment.</span></p>

<p><strong>Example Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; tls:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; insecure: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; compression: </span><span style="font-weight: 400;">gzip</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Benefits of Using OTLP/gRPC</span></h3>

<ol>

<li style="font-weight: 400;"><strong>High Performance:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">gRPC is designed for high performance, with low latency and efficient binary serialization (protobuf).</span></li>

</ul>

<li style="font-weight: 400;"><strong>Streaming Capabilities:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Supports continuous streaming of telemetry data, ensuring real-time monitoring and faster incident response.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Robustness:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Built-in support for retries, deadlines, and cancellation, making it a robust choice for reliable telemetry data transmission.</span></li>

</ul>

</ol>

<h3><span style="font-weight: 400;">Practical Use Case</span></h3>

<p><span style="font-weight: 400;">Imagine you have a high-traffic web application that requires real-time monitoring of user interactions, server performance, and error rates. Using OTLP/gRPC, you can efficiently stream this telemetry data to your observability backend, enabling immediate insights and quick troubleshooting.</span></p>

<p><strong>Example Use Case Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://observability.example.com:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; tls:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; insecure: </span><span style="font-weight: 400;">false</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; compression: </span><span style="font-weight: 400;">gzip</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By leveraging OTLP/gRPC, you can achieve high-performance telemetry data transmission, ensuring your observability setup is both robust and responsive.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll discuss how to set up a monitoring backend, providing step-by-step instructions for exporting traces, logs, and metrics.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Setting up A Monitoring Backend</span></h2>

<p><span style="font-weight: 400;">Setting up a monitoring backend is a crucial step in ensuring that your telemetry data is effectively collected, processed, and visualized.&nbsp;</span></p>

<h3><span style="font-weight: 400;">General Steps to Export Traces, Logs, and Metrics</span></h3>

<p><span style="font-weight: 400;">To get your monitoring backend up and running, follow these general steps:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Install and Configure the OpenTelemetry Collector:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Download and install the OpenTelemetry Collector appropriate for your environment.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Configure the collector to receive and export telemetry data.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Define Exporters:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Set up exporters in your </span><span style="font-weight: 400;">otel-config.yml</span><span style="font-weight: 400;"> to define where the telemetry data should be sent.</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">Example:</span><span style="font-weight: 400;"><br /><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; compression: </span><span style="font-weight: 400;">gzip</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Configure Pipelines:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Create pipelines for traces, metrics, and logs, specifying the receivers and exporters for each type of data.</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">Example:</span><span style="font-weight: 400;"><br /><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Start the Collector:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Run the OpenTelemetry Collector with your configuration file to start collecting and exporting telemetry data.</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">Command:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">otelcol --config=otel-config.yml</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Configuration Requirements and Prerequisites</span></h3>

<p><span style="font-weight: 400;">Before you begin, ensure you have the following prerequisites:</span></p>

<ol>

<li style="font-weight: 400;"><strong>OpenTelemetry Collector:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Download and install the latest version of the OpenTelemetry Collector from the official website.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Telemetry Sources:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Ensure your applications are instrumented to send telemetry data using OpenTelemetry SDKs.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Monitoring Backend:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Set up your chosen monitoring backend like OpenObserve, to receive and visualize the telemetry data.</span></li>

</ul>

</ol>

<h3><span style="font-weight: 400;">Best Practices</span></h3>

<ol>

<li style="font-weight: 400;"><strong>Monitor Resource Usage:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Ensure the OpenTelemetry Collector has adequate resources (CPU, memory) to handle the telemetry data volume.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Optimize Exporter Settings:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Adjust exporter settings like compression and batch sizes to optimize performance and reduce network overhead.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Regularly Review and Update Configurations:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Periodically review and update your configurations to accommodate changes in your infrastructure and monitoring requirements.</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">By setting up a robust monitoring backend and following these best practices, you can ensure that your telemetry data is effectively collected and visualized, providing you with valuable insights into your system&rsquo;s performance.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore specific configurations for popular monitoring backends, detailing the steps and settings required for each.&nbsp;</span></p>

<h2><strong>Setting Up OTLP Integration with OpenObserve</strong></h2>

<p><span style="font-weight: 400;">OpenObserve (O2) supports OTLP for ingesting logs, metrics, and traces, making it a robust solution for comprehensive observability.&nbsp;</span></p>

<p><span style="font-weight: 400;">This section will guide you through the configuration process for integrating OTLP with OpenObserve, ensuring you can leverage its powerful visualization and alerting capabilities.</span></p>

<h3><span style="font-weight: 400;">OTLP Integration Overview</span></h3>

<p><span style="font-weight: 400;">OpenObserve supports both OTLP HTTP and OTLP gRPC protocols. This flexibility allows you to choose the best method based on your specific requirements and infrastructure.</span></p>

<ul>

<li style="font-weight: 400;"><strong>OTLP HTTP:</strong><span style="font-weight: 400;"> Suitable for environments where HTTP is the standard protocol, supporting both binary and JSON protobuf encoding.</span></li>

<li style="font-weight: 400;"><strong>OTLP gRPC:</strong><span style="font-weight: 400;"> Ideal for high-performance, low-latency telemetry data transmission, supported in both single and distributed modes starting from specific versions.</span></li>

</ul>

<h3><span style="font-weight: 400;">Configuring OTLP Exporters for OpenObserve</span></h3>

<p><span style="font-weight: 400;">To set up OTLP exporters in your OpenTelemetry Collector to send data to OpenObserve, follow these steps:</span></p>

<h4><strong>Example Configuration for OTLP HTTP</strong></h4>

<ol>

<li style="font-weight: 400;"><strong>OpenTelemetry Collector Configuration:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Define the OTLP HTTP exporter in your </span><span style="font-weight: 400;">otel-config.yml</span><span style="font-weight: 400;"> file.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Ensure you include the appropriate endpoint and headers required for authentication.</span></li>

</ul>

</ol>

<table>

<tbody>

<tr style="height: 295.469px;">

<td style="height: 295.469px;">

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlphttp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://your-openobserve-instance/api/&lt;your-org&gt;/v1/logs"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; headers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; Authorization: </span><span style="font-weight: 400;">"Basic your_encoded_credentials"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; stream-name: </span><span style="font-weight: 400;">"your-stream"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlphttp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlphttp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlphttp]</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Starting the Collector:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Run the OpenTelemetry Collector with your configured YAML file to begin sending telemetry data to OpenObserve.</span></li>

</ul>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">otelcol --config=otel-config.yml</span></p>

</td>

</tr>

</tbody>

</table>

<h4><strong>Example Configuration for OTLP gRPC</strong></h4>

<ol>

<li style="font-weight: 400;"><strong>OpenTelemetry Collector Configuration:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Define the OTLP gRPC exporter in your </span><span style="font-weight: 400;">otel-config.yml</span><span style="font-weight: 400;"> file.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Specify the gRPC endpoint and ensure that any necessary security settings are configured.</span></li>

</ul>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://your-openobserve-instance:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; compression: </span><span style="font-weight: 400;">gzip</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Ensure that the endpoint specified (</span><span style="font-weight: 400;">http://localhost:4317</span><span style="font-weight: 400;">) matches the actual endpoint where OpenObserve is set to receive OTLP data.&nbsp;</span></p>

<p><span style="font-weight: 400;">The configuration might also require additional settings such as TLS configurations or authentication headers if your OpenObserve instance requires secure or authenticated communication.</span></p>

<p><span style="font-weight: 400;">For the most accurate setup, refer to the official OpenObserve documentation or the specific requirements provided by the OpenObserve deployment you are using. Adjust the configurations accordingly to match your actual environment and security requirements.</span></p>

<ol>

<li style="font-weight: 400;"><strong>Starting the Collector:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Run the OpenTelemetry Collector with your configuration to start the data transmission.</span></li>

</ul>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">otelcol --config=otel-config.yml</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Benefits of Using OpenObserve with OTLP</span></h3>

<p><span style="font-weight: 400;">Integrating OTLP with OpenObserve provides several advantages:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Comprehensive Observability:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Collect and visualize logs, metrics, and traces in a unified platform, gaining deeper insights into your application&rsquo;s performance.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Advanced Visualization and Alerting:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Use OpenObserve&rsquo;s powerful dashboarding and alerting features to monitor your systems in real-time and set up proactive alerts.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Scalability and Performance:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Leverage OpenObserve&rsquo;s efficient storage and processing capabilities to handle large volumes of telemetry data with ease.</span></li>

</ul>

</ol>

<p><strong>Next Steps</strong></p>

<p><span style="font-weight: 400;">By following the configurations provided above, you can integrate OTLP with OpenObserve and start benefiting from its comprehensive observability features.&nbsp;</span></p>

<p><span style="font-weight: 400;">For more detailed information, refer to the</span><a href="https://openobserve.ai/docs/"><span style="font-weight: 400;"> OpenObserve documentation</span></a><span style="font-weight: 400;"> and ensure your setup aligns with the latest updates and best practices.</span></p>

<p><span style="font-weight: 400;">For further assistance or to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;">.</span></p>

<h2><strong>Conclusion</strong></h2>

<p><span style="font-weight: 400;">Integrating OpenTelemetry OTLP Exporters with OpenObserve is a powerful way to enhance your telemetry setup. By following the detailed configurations for both OTLP HTTP and OTLP gRPC, you can seamlessly transmit traces, metrics, and logs to OpenObserve, unlocking comprehensive observability features such as advanced visualization and real-time alerting.&nbsp;</span></p>

<p><span style="font-weight: 400;">This integration not only standardizes your telemetry data transmission but also ensures you have robust tools to monitor and analyze your system's performance.</span></p>

<p><span style="font-weight: 400;">For more information and to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;">.&nbsp;</span></p>

<p>&nbsp;</p>
