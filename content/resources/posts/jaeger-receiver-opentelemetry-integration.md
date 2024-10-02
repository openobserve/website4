---
title: Getting Started with Jaeger and OpenTelemetry Documentation
seoTitle: Getting Started with Jaeger and OpenTelemetry Documentation
description: Get started with Jaeger receiver by enabling supported protocols
  and endpoints, and managing Elasticsearch backend configuration.
img: /img/resources/getting-started-with-jaeger-and-opentelemetry-documentation.png
alt: Jaeger Receiver
slug: Jaeger Receiver OpenTelemetry Integration
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - Jaeger Receiver
  - OpenTelemetry Integration
---
<p><span style="font-weight: 400;">Jaeger is a powerful distributed tracing system used to monitor and troubleshoot transactions in complex microservices environments. It tracks the path of requests as they flow through various services, helping you identify performance bottlenecks and understand request flows.</span></p>

<p><span style="font-weight: 400;">OpenTelemetry is a unified framework for collecting and transmitting telemetry data, including metrics, logs, and traces. By integrating Jaeger with OpenTelemetry, you can create a comprehensive observability solution that enhances your ability to monitor and analyze system performance.</span></p>

<h3><span style="font-weight: 400;">Why Integrate Jaeger with OpenTelemetry?</span></h3>

<p><span style="font-weight: 400;">Integrating Jaeger with OpenTelemetry allows you to leverage the strengths of both tools. OpenTelemetry collects and processes trace data, while Jaeger provides robust backend storage and visualization capabilities.&nbsp;</span></p>

<p><span style="font-weight: 400;">This integration ensures that you can effectively monitor distributed systems, quickly identify issues, and improve performance.</span></p>

<h3><span style="font-weight: 400;">Enhance with OpenObserve</span></h3>

<p><span style="font-weight: 400;">To take your observability to the next level, consider integrating OpenObserve. OpenObserve complements Jaeger and OpenTelemetry by providing advanced visualization tools, comprehensive dashboards, and real-time analytics for tracing data.&nbsp;</span></p>

<p><span style="font-weight: 400;">This combination ensures you have all the necessary tools to monitor, analyze, and optimize your distributed systems effectively.</span></p>

<p><span style="font-weight: 400;">Let's dive into the specifics of how to set up and configure the integration to maximize your observability capabilities.</span></p>

<h2><span style="font-weight: 400;">OpenTelemetry Integration with Jaeger</span></h2>

<p><span style="font-weight: 400;">Integrating Jaeger with OpenTelemetry Collector forms the backbone of a powerful observability setup.&nbsp;&nbsp;</span></p>

<p><span style="font-weight: 400;">We'll explore the components involved and the steps needed to ensure a smooth integration.</span></p>

<h3><span style="font-weight: 400;">Transition to a Robust Backend</span></h3>

<p><span style="font-weight: 400;">With the discontinuation of Jaeger's experimental functionalities, it's essential to transition to an OpenTelemetry Collector-based backend.</span></p>

<p><span style="font-weight: 400;">This shift not only ensures stability but also leverages the latest advancements in telemetry data collection and processing.</span></p>

<p><span style="font-weight: 400;">Why Transition?</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Enhanced Stability: The OpenTelemetry Collector offers a stable, production-ready environment.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Advanced Features: Benefit from the extensive features and continuous improvements in the OpenTelemetry ecosystem.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Unified Data Pipeline: Integrates seamlessly with other telemetry data sources, providing a holistic observability solution.</span></li>

</ul>

<h3><span style="font-weight: 400;">Jaeger OpenTelemetry Backend Components</span></h3>

<p><span style="font-weight: 400;">To facilitate this transition, Jaeger provides several backend components that work harmoniously with OpenTelemetry. Here&rsquo;s a look at the key components:</span></p>

<p><span style="font-weight: 400;">Available Docker Images:</span></p>

<p><span style="font-weight: 400;">Jaeger offers Docker images that simplify the deployment process. These images encapsulate the necessary components, making it easy to get started.</span></p>

<p><span style="font-weight: 400;">jaeger-opentelemetry-agent:</span></p>

<p><span style="font-weight: 400;">The Jaeger OpenTelemetry Agent acts as a collector that receives trace data from your applications. It processes this data and forwards it to the Jaeger OpenTelemetry Collector.</span></p>

<p><span style="font-weight: 400;">jaeger-opentelemetry-collector:</span></p>

<p><span style="font-weight: 400;">This component aggregates the trace data from multiple agents and processes it before storing it in the backend. It&rsquo;s designed to handle large volumes of trace data efficiently.</span></p>

<p><span style="font-weight: 400;">jaeger-opentelemetry-ingester:</span></p>

<p><span style="font-weight: 400;">The ingester component specifically handles the ingestion of trace data from the collector into your chosen storage backend.</span></p>

<p><span style="font-weight: 400;">All-in-One:</span></p>

<p><span style="font-weight: 400;">For testing and development, Jaeger provides an all-in-one Docker image that includes the agent, collector, and ingester in a single container. This setup is convenient for getting started quickly.</span></p>

<p><span style="font-weight: 400;">Example Docker Command:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">docker run --rm -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 jaegertracing/all-in-one:1.21</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Why These Components Matter</span></h3>

<p><span style="font-weight: 400;">Utilizing these components ensures that your observability setup is robust and scalable. Each component is designed to handle specific tasks within the data pipeline, ensuring that trace data is collected, processed, and stored efficiently.</span></p>

<p><span style="font-weight: 400;">Key Benefits:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Modular Architecture: Allows you to scale each component independently based on your needs.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Efficiency: Optimizes the flow of trace data from collection to storage.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Flexibility: Supports various deployment models, from development environments to production-scale systems.</span></li>

</ul>

<p><span style="font-weight: 400;">Integrating Jaeger with OpenTelemetry through these backend components ensures a seamless and efficient observability setup.&nbsp;</span></p>

<p><span style="font-weight: 400;">This integration not only enhances trace data collection and processing but also positions your system to leverage advanced features and continuous improvements from the OpenTelemetry community.</span></p>

<h2><span style="font-weight: 400;">Compatibility</span></h2>

<p><span style="font-weight: 400;">Integrating Jaeger with OpenTelemetry requires careful attention to compatibility details to ensure a smooth and efficient setup.&nbsp;&nbsp;</span></p>

<h3><span style="font-weight: 400;">Backward Compatibility with Jaeger Binaries</span></h3>

<p><span style="font-weight: 400;">When transitioning to an OpenTelemetry Collector-based backend, maintaining backward compatibility with existing Jaeger binaries is crucial. This ensures that your current setup continues to function without disruptions.</span></p>

<p><span style="font-weight: 400;">Why It Matters:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Smooth Transition: Avoids disruptions during the migration process.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Operational Continuity: Ensures existing monitoring and tracing setups remain functional.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Ease of Integration: Allows for incremental adoption of OpenTelemetry components.</span></li>

</ul>

<p><span style="font-weight: 400;">Implementation:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Use the </span><span style="font-weight: 400;">jaeger-opentelemetry-collector</span><span style="font-weight: 400;"> which is designed to be compatible with older Jaeger binaries.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Ensure that the collector can still ingest traces from Jaeger agents and client libraries without requiring changes to the existing setup.</span></li>

</ul>

<h3><span style="font-weight: 400;">OTLP Receiver Port (55680)</span></h3>

<p><span style="font-weight: 400;">The OpenTelemetry Protocol (OTLP) receiver port is a critical configuration for the OpenTelemetry Collector. By default, the collector listens on port 55680 for incoming OTLP trace data.</span></p>

<p><span style="font-weight: 400;">Key Points:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Default Port: 55680 is the standard port for OTLP receivers.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Configuration: Ensure your network configurations allow traffic through this port.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Security: Consider implementing security measures such as TLS to protect data transmitted over this port.</span></li>

</ul>

<p><span style="font-weight: 400;">Configuration Example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; protocols:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; grpc:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"0.0.0.0:55680"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Health Check Port (13133)</span></h3>

<p><span style="font-weight: 400;">To monitor the health and status of the OpenTelemetry Collector, the health check endpoint is exposed on port 13133. This allows you to verify that the collector is running correctly and receiving data.</span></p>

<p><span style="font-weight: 400;">Benefits:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Operational Insight: Provides real-time health status of the collector.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Troubleshooting: Helps in diagnosing issues by checking the collector&rsquo;s operational status.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Automation: Integrate health checks with automated monitoring systems for proactive alerts.</span></li>

</ul>

<p><span style="font-weight: 400;">Configuration Example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">extensions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; health_check:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"0.0.0.0:13133"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Metrics Exposure and Configuration Flags</span></h3>

<p><span style="font-weight: 400;">Exposing metrics and using configuration flags effectively can optimize the performance and monitoring of your OpenTelemetry setup. These settings provide insights into the collector&rsquo;s performance and help fine-tune the system.</span></p>

<p><span style="font-weight: 400;">Metrics Exposure:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Visibility: Expose metrics to monitor the collector&rsquo;s performance, resource usage, and data processing rates.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Integration: Integrate with monitoring tools like Prometheus to visualize and analyze these metrics.</span></li>

</ul>

<p><span style="font-weight: 400;">Configuration Flags:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Custom Settings: Use configuration flags to tailor the collector&rsquo;s behavior to your specific needs.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Optimization: Adjust settings such as batching, queue size, and retry policies to enhance performance.</span></li>

</ul>

<p><span style="font-weight: 400;">Configuration Example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">extensions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; zpages:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"0.0.0.0:55679"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; health_check:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"0.0.0.0:13133"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">\[logging]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Ensuring compatibility when integrating Jaeger with OpenTelemetry involves understanding and configuring key components such as backward compatibility, OTLP receiver ports, health check endpoints, and metrics exposure.&nbsp;</span></p>

<p><span style="font-weight: 400;">By paying attention to these details, you can achieve a seamless and efficient observability setup.</span></p>

<h2><span style="font-weight: 400;">Configuration</span></h2>

<p><span style="font-weight: 400;">Achieving optimal performance and comprehensive observability with Jaeger and OpenTelemetry requires meticulous configuration.&nbsp;&nbsp;</span></p>

<h3><span style="font-weight: 400;">Utilizing Jaeger Flags and OpenTelemetry Configuration</span></h3>

<p><span style="font-weight: 400;">Combining Jaeger flags with OpenTelemetry configuration settings allows for a customized and efficient setup. Jaeger flags offer quick adjustments for tracing behavior, while OpenTelemetry configurations provide a structured approach to defining your observability pipeline.</span></p>

<p><span style="font-weight: 400;">Key Points:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Jaeger Flags: Useful for quick, command-line based adjustments.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">OpenTelemetry Configuration: Offers a more detailed and comprehensive setup through configuration files.</span></li>

</ul>

<p><span style="font-weight: 400;">Example Jaeger Command:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">jaeger-collector \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; --es.server-urls=http://elasticsearch:9200 \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; --es.index-prefix=jaeger</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Example OpenTelemetry Configuration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; protocols:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; grpc:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; http:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; jaeger:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://jaeger-collector:14250"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; insecure: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">\[jaeger]</span><span style="font-weight: 400;"><br /><br /></span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">OpenTelemetry Configuration Precedence</span></h3>

<p><span style="font-weight: 400;">When both Jaeger flags and OpenTelemetry configurations are used, OpenTelemetry configurations take precedence. This allows for more granular control and consistency across different components.</span></p>

<p><span style="font-weight: 400;">Key Benefits:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Granularity: Provides detailed control over various settings.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Consistency: Ensures uniform configurations across different components.</span></li>

</ul>

<h3><span style="font-weight: 400;">Default Configuration Settings</span></h3>

<p><span style="font-weight: 400;">Understanding the default settings helps in identifying what changes might be necessary for your specific environment.</span></p>

<p><span style="font-weight: 400;">Defaults:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTLP Receiver Port: 55680</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Health Check Port: 13133</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Metrics Exposure: Enabled by default</span></li>

</ul>

<h3><span style="font-weight: 400;">Example Docker Command</span></h3>

<p><span style="font-weight: 400;">For quick deployment, using Docker commands to start your OpenTelemetry Collector with Jaeger configurations is highly efficient.</span></p>

<p><span style="font-weight: 400;">Example Command:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">docker run --rm \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; jaegertracing/all-in-one:1.21</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Configuration File Details</span></h3>

<p><span style="font-weight: 400;">Detailed configuration files provide the backbone for your observability setup. Here&rsquo;s a breakdown of what a comprehensive configuration file might include.</span></p>

<p><span style="font-weight: 400;">Configuration File Example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; protocols:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; grpc:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; http:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; jaeger:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://jaeger-collector:14250"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; insecure: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://your-openobserve-instance:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; compression: </span><span style="font-weight: 400;">gzip</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; timeout: </span><span style="font-weight: 400;">5</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[jaeger,</span> <span style="font-weight: 400;">otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Exporters Configuration</span></h3>

<p><span style="font-weight: 400;">Exporters define where the collected data is sent. Integrating OpenObserve as an exporter allows you to leverage its advanced analytics and visualization capabilities.</span></p>

<p><span style="font-weight: 400;">Example Exporter Configuration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://your-openobserve-instance:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; compression: </span><span style="font-weight: 400;">gzip</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Processors Configuration</span></h3>

<p><span style="font-weight: 400;">Processors handle the data between reception and export. Batching processors, for instance, group trace data before exporting to improve efficiency.</span></p>

<p><span style="font-weight: 400;">Example Processor Configuration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; timeout: </span><span style="font-weight: 400;">5</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; send_batch_size: </span><span style="font-weight: 400;">1024</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Service Pipelines Configuration</span></h3>

<p><span style="font-weight: 400;">Service pipelines define the flow of data through your observability setup, from receivers to processors to exporters.</span></p>

<p><span style="font-weight: 400;">Example Pipeline Configuration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[otlp]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[jaeger,</span> <span style="font-weight: 400;">otlp]</span><span style="font-weight: 400;"><br /><br /></span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By carefully configuring Jaeger flags and OpenTelemetry settings, you can create a robust and efficient observability setup. Integrating OpenObserve as an exporter enhances this setup with powerful visualization and real-time analytics, providing deeper insights into your trace data.</span></p>

<p><span style="font-weight: 400;">For more detailed information and to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;">.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Enabling Jaeger Receiver</span></h2>

<p><span style="font-weight: 400;">Setting up the Jaeger Receiver within OpenTelemetry involves configuring supported protocols, endpoints, and backend settings.&nbsp;&nbsp;</span></p>

<h3><span style="font-weight: 400;">Supported Protocols and Endpoints</span></h3>

<p><span style="font-weight: 400;">The Jaeger Receiver in OpenTelemetry supports multiple protocols and endpoints, ensuring compatibility with various tracing setups. Configuring these correctly is crucial for seamless data collection.</span></p>

<p><span style="font-weight: 400;">Supported Protocols:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">gRPC:</span><span style="font-weight: 400;"> A high-performance, open-source RPC framework.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">HTTP: Standard protocol for communication.</span></li>

</ul>

<p><span style="font-weight: 400;">Example Configuration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; jaeger:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; protocols:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; grpc:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"0.0.0.0:14250"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; thrift_http:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"0.0.0.0:14268/api/traces"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Elasticsearch Backend Configuration</span></h3>

<p><span style="font-weight: 400;">Using Elasticsearch as a backend for storing and querying trace data is a common setup. Configuring Elasticsearch with Jaeger allows you to store large volumes of trace data efficiently.</span></p>

<p><span style="font-weight: 400;">Configuration Steps:</span></p>

<p><span style="font-weight: 400;">Set Elasticsearch Server URLs:</span><span style="font-weight: 400;"><br /><br /></span></p>

<p><span style="font-weight: 400;">exporters:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">jaeger_elasticsearch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoints: </span><span style="font-weight: 400;">\["http://elasticsearch:9200"]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Index Prefix:</span></p>

<p><span style="font-weight: 400;">Customize the index prefix to organize your trace data effectively.</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; jaeger_elasticsearch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; index_prefix: </span><span style="font-weight: 400;">"jaeger"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Enhancing with OpenObserve</span></h3>

<p><span style="font-weight: 400;">While Elasticsearch is a robust backend, integrating OpenObserve can significantly enhance your visualization and analytics capabilities. OpenObserve provides advanced dashboards, real-time analytics, and a user-friendly interface for deeper insights into your trace data.</span></p>

<p><span style="font-weight: 400;">Example Integration with OpenObserve:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://your-openobserve-instance:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; compression: </span><span style="font-weight: 400;">gzip</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; traces:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[jaeger]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[jaeger_elasticsearch,</span> <span style="font-weight: 400;">otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Overriding CLI Flags with Configuration File</span></h3>

<p><span style="font-weight: 400;">For more manageable and consistent setups, override CLI flags with configuration files. This approach ensures that all configurations are documented and easily adjustable.</span></p>

<p><span style="font-weight: 400;">Steps to Override:</span></p>

<p><span style="font-weight: 400;">Create Configuration File:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Define all necessary settings in a </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;"> file.</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; jaeger:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; protocols:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; grpc:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"0.0.0.0:14250"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; jaeger_elasticsearch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoints: </span><span style="font-weight: 400;">\["http://elasticsearch:9200"]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; index_prefix: </span><span style="font-weight: 400;">"jaeger"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Run Collector with Configuration File:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">otelcol --config=config.yaml</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Enabling Attribute Processors and Health Check Extensions</span></h3>

<p><span style="font-weight: 400;">Attribute processors and health check extensions are vital for enriching trace data and ensuring the collector&rsquo;s operational health.</span></p>

<p><span style="font-weight: 400;">Attribute Processors:</span></p>

<p><span style="font-weight: 400;">Enhance trace data by adding, modifying, or removing attributes.</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; attributes:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - key: </span><span style="font-weight: 400;">"service.name"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; action: </span><span style="font-weight: 400;">"insert"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; value: </span><span style="font-weight: 400;">"my-service"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Health Check Extensions:</span></p>

<p><span style="font-weight: 400;">Monitor the health status of the OpenTelemetry Collector.</span><span style="font-weight: 400;"><br /><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">extensions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; health_check:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"0.0.0.0:13133"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Enabling the Jaeger Receiver involves configuring supported protocols and endpoints, setting up an Elasticsearch backend, and utilizing configuration files for consistency. Integrating OpenObserve as an exporter can further enhance your observability setup by providing advanced visualization and real-time analytics for your trace data.</span></p>

<p><span style="font-weight: 400;">For more detailed information and to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;">.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">Integrating Jaeger with OpenTelemetry creates a robust and efficient observability setup, essential for monitoring and troubleshooting distributed systems. By configuring the Jaeger Receiver, utilizing supported protocols and endpoints, and setting up an Elasticsearch backend, you can achieve comprehensive trace data collection and analysis. Enhancing your setup with OpenObserve further amplifies your capabilities, providing advanced visualization and real-time analytics to gain deeper insights into your system's performance.</span></p>

<p><span style="font-weight: 400;">Whether you are transitioning from existing Jaeger setups or starting fresh with OpenTelemetry, this guide offers a detailed, step-by-step approach to ensure a seamless integration. By leveraging the strengths of these powerful tools, you can maintain optimal performance, quickly identify issues, and keep your distributed systems running smoothly.</span></p>

<p><span style="font-weight: 400;">For more detailed information and to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;">. </span></p>
