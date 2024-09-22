---
title: "Understanding OpenTelemetry Logging"
seoTitle: "Deep-Dive into OpenTelemetry Logs"
description: "This blog explores how OpenTelemetry streamlines log collection and management for modern applications. Learn how to integrate OpenTelemetry, auto-instrument logs, and optimize performance, while unifying logs, traces, and metrics for better observability."
img: \img\blog\understanding-otel-logs\image2.png.
alt: Otel-logs
slug: understanding-otel-logs
authors:
  - Manas
publishDate: 2024-09-23
tags:
  - logging
  - observability
  - opentelemetry
  - openobserve
---
## Introduction to OpenTelemetry

OpenTelemetry is an open-source observability framework designed to help developers collect and manage telemetry data at scale. Whether we're tracking logs, metrics, or traces, OpenTelemetry provides a unified approach to monitoring and understanding our applications' behavior.

In this blog, we’ll focus on OpenTelemetry logs — a critical part of the observability ecosystem that gives visibility into your application's operations. Let’s dive into how OpenTelemetry logs can enhance your system's reliability and troubleshooting.

## Why OpenTelemetry?

OpenTelemetry simplifies instrumentation by making it easy to integrate into any application, regardless of language or infrastructure. Instead of being tied to specific tools, it gives you the flexibility to use your observability backends of choice — making it incredibly versatile.

Initially born from a merger of OpenCensus and OpenTracing, OpenTelemetry is now maintained by the Cloud Native Computing Foundation (CNCF), ensuring its neutrality and community-driven evolution.

## Observability Pillars: Logs, Metrics, and Traces

OpenTelemetry covers three essential pillars of observability:
- **Logs**: Provide real-time insights into events and application behavior.
- **Metrics**: Help track performance indicators like response time and throughput.
- **Traces**: Follow requests across distributed systems, giving context to how services interact.

## The Importance of Logging in Modern Systems

Today’s microservices and distributed architectures need robust logging to help teams track down performance issues or unexpected behavior. However, common logging challenges arise, such as:

- **Lack of Context**: Logs often fail to capture the full state of the system when an event occurs.
- **Inconsistent Formats**: Logs from different services may be hard to analyze together.

OpenTelemetry logs aim to solve these challenges by providing a structured, standardized way to handle logs across all environments.

### Best Practices for Logging

Understanding log levels is key to effective monitoring. OpenTelemetry offers different log levels like `DEBUG`, `INFO`, `WARNING`, `ERROR`, and `CRITICAL` to classify log importance.

- **DEBUG**: Useful for development, but avoid using it extensively in production.
- **INFO**: Routine updates on app behavior.
- **ERROR**: Captures problems that need immediate attention.

> **Tip**: Always structure logs uniformly to ease

## Why OpenTelemetry Logs Stand Out?

### Limitations of Traditional Logging

Traditional logging approaches often fall short when it comes to correlating different telemetry signals. Most existing systems use separate tools for logs, metrics, and traces, making it difficult to get a holistic view of your application's health.

With OpenTelemetry, logs can be correlated with other telemetry signals like traces and spans, offering deeper insights. This context helps teams make smarter decisions based on actual user interactions with their system.

![observability-pipeline-without-otel](\img\blog\understanding-otel-logs\image1.png)

### What Does OpenTelemetry Logging Unlock?

- **Unified Data Collection**: Manage all logs, traces, and metrics through a single agent.
- **Pre-Processing**: Clean and prep your logs before sending them to the destination of your choice.
- **Consistent Metadata**: Correlate data across different telemetry types seamlessly, allowing for better diagnostics.

## Integration with Existing Logging Libraries

OpenTelemetry doesn’t ask you to ditch your existing setup. It seamlessly integrates with common logging libraries, ensuring that your system can evolve while still benefiting from your current logs.

![observability-pipeline-without-otel](\img\blog\understanding-otel-logs\image4.png)

## Collecting Log Data with OpenTelemetry

OpenTelemetry uses a **Log Data Model** that standardizes what should be included in a log. This model defines what constitutes a `LogRecord`, ensuring that logs are consistent across services and backends.

You can learn more about the data model [here](https://opentelemetry.io/docs/).

Existing log formats can be **unambiguously mapped** to the OpenTelemetry Log Data Model. The OpenTelemetry Collector can read such logs and translate them to the OpenTelemetry Log Data Model.

To emit LogRecords, OpenTelemetry exposes a Logs Bridge API. It is not recommended for application developers to make direct calls to this API. The API is made available to library authors so they can create log appenders, which act as a bridge between the OpenTelemetry Log Data Model and already available logging libraries. OpenTelemetry does not intend to provide a feature-rich logging library.

An **SDK Implementation** of the Bridge API defined by OpenTelemetry makes it possible to configure the processing and exporting of LogRecords.

As described earlier, OpenTelemetry provides extensions for a few widely used logging library languages to facilitate manual/auto instrumentation scenarios. The modifications will make it possible to transmit logs via the OTLP protocol to the backend or the Collector and enable the inclusion of the trace context in the logs.

Application-specific resource context (such as the process ID, programming language, logging library name and version, etc.) is automatically added to the output logs. For these logs, full correlation across all context dimensions will be accessible.


### How Various Log Sources Are Handled by OpenTelemetry

To minimize the number of changes needed to migrate to OpenTelemetry for logs, OpenTelemetry offers a variety of receivers and processors for gathering system and infrastructure logs, first-party, and third-party application logs via the **OpenTelemetry Collector** or already-existing agents like FluentBit.

![observability-pipeline-without-otel](\img\blog\understanding-otel-logs\image3.png)

There are two primary ways to collect logs in OpenTelemetry:

1. **File or Stdout Logs**: Read from existing logs written to files or standard output using receivers like the filelog receiver.

![observability-pipeline-without-otel](\img\blog\understanding-otel-logs\image6.png)

2. **Direct-to-Collector**: Modify your application’s logging library to send logs directly to the OpenTelemetry Collector. This method eliminates complexity related to file logs, including parsers, log tailing, and rotation. However, the simplicity of having logs in a local file is lost.

![observability-pipeline-without-otel](\img\blog\understanding-otel-logs\image8.png)

## The OpenTelemetry Collector

The OpenTelemetry Collector is a vendor-agnostic tool designed to collect, process, and export telemetry data. It acts as the central hub, gathering data from multiple sources and ensuring it reaches your chosen destination efficiently.

![observability-pipeline-without-otel](\img\blog\understanding-otel-logs\image5.png)

### Key Features Include:

- **Multi-Protocol Support**: Handles OTLP, Jaeger, and more.
- **Flexible Exporting**: Send logs to backends like OpenObserve or Splunk.
- **High Throughput**: Capable of handling large-scale log data with minimal latency.

Here’s an example of a `config.yaml` setup for sending logs:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:

exporters:
  logging:
    loglevel: debug

service:
  pipelines:
    logs:
      receivers: [otlp]
      exporters: [logging]
```

## Auto-Instrumenting Logs

Let’s take an example in Python using the FastAPI framework.

By using the **FastAPI Instrumentor**, you can automatically collect trace context for every request without changing your code:

```python
FastAPIInstrumentor.instrument_app(app)     
```
This integration allows automatic span creation for traces, making it easier to trace requests and correlate logs with the correct spans and traces.

This single line of code does a lot of work behind the scenes:
- Automatic Logging and Tracing
- It automatically creates spans for each request to our FastAPI routes.
- It adds context to these spans, including HTTP method, route, response status code, etc.
- It propagates context across your application, allowing us to correlate logs and traces.

Refer to [OpenTelemetry Docs](https://opentelemetry-python-contrib.readthedocs.io/en/latest/instrumentation/fastapi/fastapi.html) to learn more about OpenTelemetry instrumentation FastAPI.

## Avoiding Common Pitfalls

When integrating OpenObserve into your application, it's crucial to double-check your configuration settings to prevent potential issues. Misconfigured endpoints or incorrect authentication tokens can hinder the smooth execution of your application, just like any other automation script. For instance, if you're self-hosting OpenObserve locally, ensure that the endpoint is correctly set to port 5080 in your configuration.

**Troubleshooting in Action**

In my experience, I encountered a notable issue where the OpenTelemetry Collector failed to communicate with OpenObserve on my Windows machine. After thorough investigation, I traced the root cause to a misconfiguration in the network settings for port 5080, resulting in failed log transmissions.

![observability-pipeline-without-otel](\img\blog\understanding-otel-logs\image7.png)

To resolve this issue, I manually configured the network settings for port 5080 on my Windows machine, as illustrated in the reference image above.


## Best Practices for Performance Optimization

As our app scales, performance issues can crop up. To avoid bottlenecks:

- Optimize your Collector: Run it on a machine with adequate resources.
- Horizontal Scaling: Use Kubernetes or other orchestration tools to manage resource allocation dynamically.

For advanced performance tips, check out the [OpenTelemetry Discussions](https://github.com/open-telemetry/opentelemetry-specification/discussions).


## Conclusion and Next Steps

OpenTelemetry logs make collecting and managing observability data powerful and simple by fundamentally designing logging to be part of the process of collecting and correlating observability signals. For example, OpenTelemetry enables existing logging libraries to send data in the OpenTelemetry logging format almost instantly. It also supports a standard and extensible data model that can bring log data into context by correlating it with trace and metrics data.

To get started with OpenTelemetry logs, follow these next steps:

1. Review the OpenTelemetry documentation and familiarize yourself with the concepts and components.
2. Find a development environment where you can try out OpenTelemetry. This will help you understand the data flow and identify potential issues.
3. Join the OpenTelemetry community if you're interested in staying involved. Follow the discussions, attend virtual events, and keep up with the latest developments.
4. Contribute to the project if you're interested. Check out the project home page, file issues, submit pull requests, or discuss your ideas on the OpenTelemetry Discussions forum.
