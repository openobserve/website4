---
title: Prometheus Receiver - OpenTelemetry Collector Guide
seoTitle: Prometheus Receiver - OpenTelemetry Collector Guide
description: The blog post explains how to configure Prometheus Receiver with
  OpenTelemetry Collector to collect and monitor metrics.
img: /img/resources/prometheus-receiver-opentelemetry-collector-guide.png
alt: Prometheus Receiver
slug: prometheus-receiver-opentelemetry-guide
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - prometheus
  - opentelemetry
---
<p><span style="font-weight: 400;">If you're involved in monitoring and observability, you know how crucial it is to have a reliable setup for collecting and analyzing metrics.&nbsp;</span></p>

<p><span style="font-weight: 400;">This guide will walk you through the process of integrating Prometheus with the OpenTelemetry Collector, providing you with powerful tools to ensure your system's health and performance.</span></p>

<p><strong>An Overview of Prometheus&nbsp;</strong></p>

<p><span style="font-weight: 400;">Prometheus has become a cornerstone in the world of monitoring. Known for its robust metric collection capabilities, Prometheus helps you track the performance of your applications and infrastructure.&nbsp;</span></p>

<p><span style="font-weight: 400;">With its powerful querying language and flexible data model, Prometheus makes it easy to gain insights into your system's behavior.</span></p>

<p><strong>Introduction to OpenTelemetry&nbsp;</strong></p>

<p><span style="font-weight: 400;">OpenTelemetry is an open-source observability framework designed to provide a unified standard for collecting and exporting telemetry data (metrics, logs, and traces).&nbsp;</span></p>

<p><span style="font-weight: 400;">The OpenTelemetry Collector acts as a central processing hub, gathering data from various sources and exporting it to your preferred backend. This modularity and flexibility make the OpenTelemetry Collector an essential tool for modern observability.</span></p>

<p><span style="font-weight: 400;">In the following sections, we'll dive deep into the configuration and optimization of the Prometheus receiver within the OpenTelemetry Collector, ensuring you have a seamless and efficient monitoring setup.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Configuring OpenTelemetry Collector to Scrape Prometheus Metrics</span></h2>

<p><span style="font-weight: 400;">Setting up the OpenTelemetry Collector to scrape Prometheus metrics can seem daunting, but with the right guidance, it&rsquo;s straightforward and highly rewarding.&nbsp;</span></p>

<p><span style="font-weight: 400;">This section will walk you through the necessary steps, ensuring a seamless integration and efficient metrics collection process.</span></p>

<h3><span style="font-weight: 400;">How OpenTelemetry Collector Collects Data Through Receivers</span></h3>

<p><span style="font-weight: 400;">The OpenTelemetry Collector uses receivers to collect data from various sources, including Prometheus.&nbsp;</span></p>

<p><span style="font-weight: 400;">Think of receivers as the entry points where telemetry data flows into the collector.&nbsp;</span></p>

<p><span style="font-weight: 400;">The Prometheus receiver specifically handles metrics scraped from Prometheus targets, making it a crucial component for monitoring applications and infrastructure.</span></p>

<h3><span style="font-weight: 400;">Prometheus Text Format and Metric Grouping</span></h3>

<p><span style="font-weight: 400;">Prometheus metrics are exposed in a specific text format, grouping related metrics together.&nbsp;</span></p>

<p><span style="font-weight: 400;">This format is both human-readable and machine-parsable, facilitating easy collection and processing. The metrics include details like timestamps, labels, and values, providing comprehensive insights into system performance.</span></p>

<h3><span style="font-weight: 400;">Sample Configuration for Prometheus Receiver</span></h3>

<p><span style="font-weight: 400;">To configure the Prometheus receiver in the OpenTelemetry Collector, you'll need to create a configuration file. Here&rsquo;s a sample configuration to get you started:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; prometheus:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; config:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; scrape_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - job_name: </span><span style="font-weight: 400;">'otel-collector'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; scrape_interval: </span><span style="font-weight: 400;">10</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; static_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - targets: </span><span style="font-weight: 400;">\['localhost:9090']</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; logging:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; loglevel: </span><span style="font-weight: 400;">debug</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[prometheus]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><strong>Steps to Ensure Seamless Onboarding for Users Familiar with Prometheus Scrape Config</strong></h3>

<p><span style="font-weight: 400;">If you&rsquo;re already familiar with Prometheus scrape configurations, transitioning to the OpenTelemetry Collector will be smooth.&nbsp;</span></p>

<p><span style="font-weight: 400;">Here are some tips to ensure a seamless onboarding process:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Leverage Existing Knowledge:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Use your existing Prometheus scrape configurations as a reference. The syntax and structure are very similar, making it easy to adapt.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Focus on Core Configurations:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Start with core configurations like </span><span style="font-weight: 400;">job_name</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">scrape_interval</span><span style="font-weight: 400;">, and </span><span style="font-weight: 400;">static_configs</span><span style="font-weight: 400;">. These fundamental settings will get your metrics collection up and running quickly.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Utilize OpenObserve for Enhanced Visualization:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Enhance your monitoring setup by integrating OpenObserve (O2). OpenObserve can take the metrics collected by the OpenTelemetry Collector and provide powerful visualization and alerting capabilities.</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">Example integration:</span><span style="font-weight: 400;"><br /><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">openobserve:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; prometheus:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:9090"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; dashboards:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; - name: </span><span style="font-weight: 400;">Prometheus</span> <span style="font-weight: 400;">Metrics</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; panels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">CPU</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">node_cpu_seconds_total</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Memory</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">node_memory_MemAvailable_bytes</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; alerts:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; - name: </span><span style="font-weight: 400;">High</span> <span style="font-weight: 400;">CPU</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; condition: </span><span style="font-weight: 400;">node_cpu_seconds_total</span> <span style="font-weight: 400;">&gt; 80</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - notify: </span><span style="font-weight: 400;">email</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; to: </span><span style="font-weight: 400;">ops-team@example.com</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; message: </span><span style="font-weight: 400;">"High CPU usage detected."</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By following these steps and leveraging tools like OpenObserve, you can set up a robust and efficient monitoring system that leverages the strengths of both Prometheus and OpenTelemetry.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll take a deep dive into the Prometheus receiver, exploring its major components, workflow, and how it maps Prometheus metrics to OpenTelemetry metric prototypes.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Prometheus Receiver Deep Dive</span></h2>

<p><span style="font-weight: 400;">Now that we&rsquo;ve covered the basics of configuring the Prometheus receiver in the OpenTelemetry Collector, let&rsquo;s get into its components and workflow.&nbsp;</span></p>

<p><span style="font-weight: 400;">Understanding these elements will help you optimize your setup and make the most of your metrics collection.</span></p>

<h3><span style="font-weight: 400;">Major Components of Prometheus Scrape Package</span></h3>

<p><span style="font-weight: 400;">The Prometheus receiver consists of several key components that work together to scrape and process metrics:</span></p>

<ol>

<li style="font-weight: 400;"><strong>ScrapeManager:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Manages the lifecycle of all scrape configurations. It initiates scrapes based on the configured intervals and handles updates to scrape jobs.</span></li>

</ul>

<li style="font-weight: 400;"><strong>ScrapePool:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Represents a group of targets to be scraped according to the same configuration. It ensures each target is scraped and manages the scheduling.</span></li>

</ul>

<li style="font-weight: 400;"><strong>ScrapeLoop:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The core component that performs the actual scraping. It fetches metrics from targets, parses the data, and forwards it to the Prometheus receiver.</span></li>

</ul>

</ol>

<h3><span style="font-weight: 400;">Workflow of Prometheus ScrapeLoop</span></h3>

<p><span style="font-weight: 400;">The ScrapeLoop is where the magic happens. Here&rsquo;s a step-by-step overview of its workflow:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Initialization:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The ScrapeLoop initializes with the target&rsquo;s configuration details, setting up the necessary parameters for the scrape process.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Scraping Metrics:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">At each scrape interval, the ScrapeLoop sends an HTTP request to the target&rsquo;s metrics endpoint. It retrieves the metrics in Prometheus text format.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Parsing and Processing:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The ScrapeLoop parses the retrieved metrics, converting them into a structured format. It then processes the metrics, applying any necessary transformations or filters.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Forwarding to Receiver:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Finally, the processed metrics are forwarded to the Prometheus receiver within the OpenTelemetry Collector for further processing and export.</span></li>

</ul>

</ol>

<h3><span style="font-weight: 400;">Mapping of Prometheus Metrics to OpenTelemetry Metric Prototypes</span></h3>

<p><span style="font-weight: 400;">Prometheus and OpenTelemetry use different representations for metrics. Here&rsquo;s how to map Prometheus metrics to OpenTelemetry metric prototypes:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Counters:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Prometheus counters map directly to OpenTelemetry counters, representing a cumulative metric that only increases.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Gauges:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Gauges in Prometheus, which represent a single numerical value that can go up or down, map to OpenTelemetry gauges.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Histograms and Summaries:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Histograms and summaries in Prometheus are more complex, capturing distributions of values. These map to OpenTelemetry&rsquo;s histogram metrics, providing detailed insights into the distribution of metric values.</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">By understanding these mappings, you can ensure that your Prometheus metrics are accurately represented and processed within the OpenTelemetry framework.</span></p>

<h3><span style="font-weight: 400;">Leveraging OpenObserve for Enhanced Metrics Analysis</span></h3>

<p><span style="font-weight: 400;">To take your metrics analysis to the next level, integrate OpenObserve (O2) with your OpenTelemetry setup.&nbsp;</span></p>

<p><span style="font-weight: 400;">OpenObserve provides powerful dashboards and alerting capabilities, making it easier to visualize and act on the collected metrics.</span></p>

<p><span style="font-weight: 400;">Example integration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">openobserve:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; prometheus:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:9090"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; dashboards:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; - name: </span><span style="font-weight: 400;">Prometheus</span> <span style="font-weight: 400;">Metrics</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; panels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Scrape</span> <span style="font-weight: 400;">Performance</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">scrape_duration_seconds</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Metric</span> <span style="font-weight: 400;">Values</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">node_memory_MemAvailable_bytes</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; alerts:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; - name: </span><span style="font-weight: 400;">High</span> <span style="font-weight: 400;">Scrape</span> <span style="font-weight: 400;">Duration</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; condition: </span><span style="font-weight: 400;">scrape_duration_seconds</span> <span style="font-weight: 400;">&gt; 1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - notify: </span><span style="font-weight: 400;">email</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; to: </span><span style="font-weight: 400;">ops-team@example.com</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; message: </span><span style="font-weight: 400;">"Scrape duration is too high."</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By following these guidelines and leveraging tools like OpenObserve, you can optimize your Prometheus receiver setup and ensure efficient metrics collection and analysis.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore the different metric types supported by Prometheus and how they map to OpenTelemetry metrics.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Metric Types and Prometheus to OpenTelemetry Mapping</span></h2>

<p><span style="font-weight: 400;">Understanding how Prometheus metrics map to OpenTelemetry metrics is crucial for accurate data collection and analysis.&nbsp;</span></p>

<p><span style="font-weight: 400;">This section will walk you through the different types of Prometheus metrics and their corresponding representations in OpenTelemetry.</span></p>

<h3><span style="font-weight: 400;">Prometheus Metric Types and Their OpenTelemetry Mappings</span></h3>

<p><span style="font-weight: 400;">Prometheus supports various metric types, each serving a unique purpose. Here&rsquo;s a quick rundown of the primary types and how they map to OpenTelemetry:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Counter:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Prometheus:</strong><span style="font-weight: 400;"> A cumulative metric that only increases, used for counting occurrences (e.g., </span><span style="font-weight: 400;">http_requests_total</span><span style="font-weight: 400;">).</span></li>

<li style="font-weight: 400;"><strong>OpenTelemetry:</strong><span style="font-weight: 400;"> Maps directly to an OpenTelemetry counter.</span></li>

<li style="font-weight: 400;"><strong>Example Mapping:</strong><span style="font-weight: 400;">&nbsp;</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">http_requests_total -&gt; otel_counter_http_requests_total</span></p>

<ol>

<li style="font-weight: 400;"><strong>Gauge:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Prometheus:</strong><span style="font-weight: 400;"> Represents a single numerical value that can go up or down, useful for values like temperature or memory usage (e.g., </span><span style="font-weight: 400;">node_memory_Active_bytes</span><span style="font-weight: 400;">).</span></li>

<li style="font-weight: 400;"><strong>OpenTelemetry:</strong><span style="font-weight: 400;"> Maps to an OpenTelemetry gauge.</span></li>

<li style="font-weight: 400;"><strong>Example Mapping:</strong><span style="font-weight: 400;">&nbsp;</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">node_memory_Active_bytes -&gt; otel_gauge_node_memory_active_bytes</span></p>

<ol>

<li style="font-weight: 400;"><strong>Histogram:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Prometheus:</strong><span style="font-weight: 400;"> Samples observations and counts them in configurable buckets, useful for request durations or response sizes (e.g., </span><span style="font-weight: 400;">http_request_duration_seconds</span><span style="font-weight: 400;">).</span></li>

<li style="font-weight: 400;"><strong>OpenTelemetry:</strong><span style="font-weight: 400;"> Maps to an OpenTelemetry histogram.</span></li>

<li style="font-weight: 400;"><strong>Example Mapping:</strong><span style="font-weight: 400;">&nbsp;</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">http_request_duration_seconds -&gt; otel_histogram_http_request_duration_seconds</span></p>

<ol>

<li style="font-weight: 400;"><strong>Summary:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Prometheus:</strong><span style="font-weight: 400;"> Calculates configurable quantiles over a sliding time window, useful for measuring request latencies (e.g., </span><span style="font-weight: 400;">rpc_duration_seconds</span><span style="font-weight: 400;">).</span></li>

<li style="font-weight: 400;"><strong>OpenTelemetry:</strong><span style="font-weight: 400;"> Maps to an OpenTelemetry summary.</span></li>

<li style="font-weight: 400;"><strong>Example Mapping:</strong><span style="font-weight: 400;">&nbsp;</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">rpc_duration_seconds -&gt; otel_summary_rpc_duration_seconds</span></p>

<ol>

<li style="font-weight: 400;"><strong>Untyped:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Prometheus:</strong><span style="font-weight: 400;"> Behaves like a gauge when the metric type is not specified.</span></li>

<li style="font-weight: 400;"><strong>OpenTelemetry:</strong><span style="font-weight: 400;"> Typically avoided due to its ambiguous nature.</span></li>

<li style="font-weight: 400;"><strong>Example Mapping:</strong><span style="font-weight: 400;"> Uncommon in practice.</span></li>

</ul>

<li style="font-weight: 400;"><strong>GaugeHistogram, Info, StatSet:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Prometheus:</strong><span style="font-weight: 400;"> Less common types like GaugeHistogram (combines gauge and histogram characteristics), Info (encodes key-value information), and StatSet (set of statistics like min, max, and average).</span></li>

<li style="font-weight: 400;"><strong>OpenTelemetry:</strong><span style="font-weight: 400;"> These also map to corresponding OpenTelemetry metric types.</span></li>

<li style="font-weight: 400;"><strong>Example Mapping:</strong><span style="font-weight: 400;">&nbsp;</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">example_gauge_histogram -&gt; otel_gauge_histogram</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">build_info -&gt; otel_info</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">example_stat_set -&gt; otel_statset</span></p>

<h3><span style="font-weight: 400;">Leveraging OpenObserve for Enhanced Metrics Analysis</span></h3>

<p><span style="font-weight: 400;">Integrating OpenObserve (O2) with your OpenTelemetry setup can take your metrics analysis to the next level. OpenObserve provides powerful dashboards and alerting capabilities, making it easier to visualize and act on the collected metrics.</span></p>

<p><span style="font-weight: 400;">Example integration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">openobserve:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; prometheus:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:9090"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; dashboards:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; - name: </span><span style="font-weight: 400;">Prometheus</span> <span style="font-weight: 400;">Metrics</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; panels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Counter</span> <span style="font-weight: 400;">Metrics</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">otel_counter_http_requests_total</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Gauge</span> <span style="font-weight: 400;">Metrics</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">otel_gauge_node_memory_active_bytes</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Histogram</span> <span style="font-weight: 400;">Metrics</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">otel_histogram_http_request_duration_seconds</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; alerts:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; - name: </span><span style="font-weight: 400;">High</span> <span style="font-weight: 400;">Request</span> <span style="font-weight: 400;">Duration</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; condition: </span><span style="font-weight: 400;">otel_histogram_http_request_duration_seconds</span> <span style="font-weight: 400;">&gt; 1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - notify: </span><span style="font-weight: 400;">email</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; to: </span><span style="font-weight: 400;">ops-team@example.com</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; message: </span><span style="font-weight: 400;">"High request duration detected."</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By understanding these mappings and leveraging tools like OpenObserve, you can ensure that your Prometheus metrics are accurately captured and analyzed within the OpenTelemetry framework, providing deeper insights and more effective monitoring.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore the detailed structure of the Prometheus receiver configuration and how to customize the metrics collection process to suit your needs.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Prometheus Receiver Configuration and Customization</span></h2>

<p><span style="font-weight: 400;">Configuring and customizing the Prometheus receiver in the OpenTelemetry Collector allows you to tailor metrics collection to fit your specific needs.&nbsp;</span></p>

<p><span style="font-weight: 400;">This section will guide you through the configuration structure and offer tips for optimizing your setup.</span></p>

<h3><span style="font-weight: 400;">Detailed Structure of Prometheus Receiver Configuration</span></h3>

<p><span style="font-weight: 400;">The Prometheus receiver configuration is defined in a YAML file. Here&rsquo;s a breakdown of a typical configuration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; prometheus:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; config:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; scrape_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - job_name: </span><span style="font-weight: 400;">'otel-collector'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; scrape_interval: </span><span style="font-weight: 400;">10</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; static_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - targets: </span><span style="font-weight: 400;">\['localhost:9090']</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; logging:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; loglevel: </span><span style="font-weight: 400;">debug</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metrics:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[prometheus]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Customizing the Metrics Collection Process</span></h3>

<p><span style="font-weight: 400;">To customize your metrics collection process, consider the following adjustments:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Scrape Intervals:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Description:</strong><span style="font-weight: 400;"> The frequency at which metrics are scraped.</span></li>

<li style="font-weight: 400;"><strong>Customization:</strong><span style="font-weight: 400;"> Adjust the </span><span style="font-weight: 400;">scrape_interval</span><span style="font-weight: 400;"> based on the criticality of the metrics. For high-priority metrics, use shorter intervals.</span></li>

</ul>

</ol>

<p><strong>Example:</strong><span style="font-weight: 400;"><br /><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">scrape_interval: </span><span style="font-weight: 400;">5</span><span style="font-weight: 400;">s</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Job Names:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Description:</strong><span style="font-weight: 400;"> Identifies the scrape job.</span></li>

<li style="font-weight: 400;"><strong>Customization:</strong><span style="font-weight: 400;"> Use meaningful job names to easily identify different scrape targets.</span></li>

</ul>

</ol>

<p><strong>Example:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">job_name: </span><span style="font-weight: 400;">'high-priority-metrics'</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Static and Dynamic Configurations:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Description:</strong><span style="font-weight: 400;"> Define static or dynamically discovered scrape targets.</span></li>

<li style="font-weight: 400;"><strong>Customization:</strong><span style="font-weight: 400;"> Use </span><span style="font-weight: 400;">static_configs</span><span style="font-weight: 400;"> for fixed targets and </span><span style="font-weight: 400;">file_sd_configs</span><span style="font-weight: 400;"> or </span><span style="font-weight: 400;">kubernetes_sd_configs</span><span style="font-weight: 400;"> for dynamic environments.</span></li>

</ul>

</ol>

<p><strong>Example:</strong><strong><br /><br /></strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">static_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - targets: </span><span style="font-weight: 400;">['localhost:9091',</span> <span style="font-weight: 400;">'localhost:9092']</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Implementing Prometheus Storage.Appender with Metrics Sink</span></h3>

<p><span style="font-weight: 400;">To handle the metrics data effectively, you can implement the Prometheus </span><span style="font-weight: 400;">storage.Appender</span><span style="font-weight: 400;"> interface, which allows you to manage how metrics are stored and forwarded.</span></p>

<p><strong>Example Implementation:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">type</span><span style="font-weight: 400;"> MetricsSink </span><span style="font-weight: 400;">struct</span><span style="font-weight: 400;"> {</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metricsChannel </span><span style="font-weight: 400;">chan</span><span style="font-weight: 400;"> prometheus.Metric</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">func</span><span style="font-weight: 400;"> (ms *MetricsSink) </span><span style="font-weight: 400;">Append</span><span style="font-weight: 400;">(ref </span><span style="font-weight: 400;">uint64</span><span style="font-weight: 400;">, lset labels.Labels, t </span><span style="font-weight: 400;">int64</span><span style="font-weight: 400;">, v </span><span style="font-weight: 400;">float64</span><span style="font-weight: 400;">) (</span><span style="font-weight: 400;">uint64</span><span style="font-weight: 400;">, error) {</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metric := prometheus.NewMetricWithTimestamp(time.Unix(</span><span style="font-weight: 400;">0</span><span style="font-weight: 400;">, t*</span><span style="font-weight: 400;">int64</span><span style="font-weight: 400;">(time.Millisecond)), prometheus.NewDesc(</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; lset.String(),</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">"Collected metric"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">nil</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">nil</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; ), v)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; ms.metricsChannel &lt;- metric</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> ref, </span><span style="font-weight: 400;">nil</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">func</span><span style="font-weight: 400;"> (ms *MetricsSink) </span><span style="font-weight: 400;">Commit</span><span style="font-weight: 400;">() </span><span style="font-weight: 400;">error</span><span style="font-weight: 400;"> {</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span> <span style="font-weight: 400;">nil</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">func</span><span style="font-weight: 400;"> (ms *MetricsSink) </span><span style="font-weight: 400;">Rollback</span><span style="font-weight: 400;">() </span><span style="font-weight: 400;">error</span><span style="font-weight: 400;"> {</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span> <span style="font-weight: 400;">nil</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Tips for Optimizing Prometheus Receiver Performance</span></h3>

<ol>

<li style="font-weight: 400;"><strong>Filter Unnecessary Metrics:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Description:</strong><span style="font-weight: 400;"> Avoid collecting metrics that aren&rsquo;t useful to reduce load.</span></li>

<li style="font-weight: 400;"><strong>Customization:</strong><span style="font-weight: 400;"> Use the </span><span style="font-weight: 400;">metric_relabel_configs</span><span style="font-weight: 400;"> to filter out unnecessary metrics.</span></li>

</ul>

</ol>

<p><strong>Example:</strong><strong><br /><br /></strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">metric_relabel_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - source_labels: </span><span style="font-weight: 400;">\[\_\_name\_\_]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; regex: </span><span style="font-weight: 400;">'.*_unwanted_metric'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; action: </span><span style="font-weight: 400;">drop</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Aggregation and Batching:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Description:</strong><span style="font-weight: 400;"> Aggregate and batch metrics to optimize processing.</span></li>

<li style="font-weight: 400;"><strong>Customization:</strong><span style="font-weight: 400;"> Use the </span><span style="font-weight: 400;">batch</span><span style="font-weight: 400;"> processor to manage data flow efficiently.</span></li>

</ul>

</ol>

<p><strong>Example:</strong><span style="font-weight: 400;"><br /><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; timeout: </span><span style="font-weight: 400;">10</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; send_batch_size: </span><span style="font-weight: 400;">5000</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Resource Allocation:</strong></li>

<ul>

<li style="font-weight: 400;"><strong>Description:</strong><span style="font-weight: 400;"> Ensure the OpenTelemetry Collector has sufficient resources.</span></li>

<li style="font-weight: 400;"><strong>Customization:</strong><span style="font-weight: 400;"> Allocate more CPU and memory resources to handle high metric volumes.</span></li>

</ul>

</ol>

<h3><span style="font-weight: 400;">Leveraging OpenObserve for Enhanced Monitoring</span></h3>

<p><span style="font-weight: 400;">For enhanced monitoring and visualization, integrate OpenObserve (O2) with your OpenTelemetry setup. OpenObserve provides an intuitive interface for creating dashboards and setting up alerts, helping you make sense of your metrics data effectively.</span></p>

<p><strong>Example Integration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">openobserve:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; prometheus:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:9090"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; dashboards:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; - name: </span><span style="font-weight: 400;">Customized</span> <span style="font-weight: 400;">Prometheus</span> <span style="font-weight: 400;">Metrics</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; panels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">CPU</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">node_cpu_seconds_total</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Memory</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">node_memory_MemAvailable_bytes</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; alerts:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; - name: </span><span style="font-weight: 400;">High</span> <span style="font-weight: 400;">Memory</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; condition: </span><span style="font-weight: 400;">node_memory_MemAvailable_bytes</span> <span style="font-weight: 400;">&lt;</span> <span style="font-weight: 400;">1000000</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - notify: </span><span style="font-weight: 400;">email</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; to: </span><span style="font-weight: 400;">ops-team@example.com</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; message: </span><span style="font-weight: 400;">"Memory usage is critically low."</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By following these customization tips and leveraging OpenObserve, you can optimize your Prometheus receiver setup for efficient and effective metrics collection.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore best practices for monitoring and visualizing Prometheus metrics, ensuring you get the most out of your observability setup.</span></p>

<h2><span style="font-weight: 400;">Monitoring and Visualizing Prometheus Metrics</span></h2>

<p><span style="font-weight: 400;">Once you&rsquo;ve set up and customized your Prometheus receiver, the next step is to monitor and visualize the collected metrics effectively.&nbsp;</span></p>

<p><span style="font-weight: 400;">This section will guide you through setting up visualization tools, creating dashboards and alerts, and implementing best practices to ensure you get the most out of your metrics.</span></p>

<h3><span style="font-weight: 400;">Setting Up Visualization Tools for Prometheus Metrics</span></h3>

<p><span style="font-weight: 400;">Visualization is key to making sense of the data collected by Prometheus. Tools like OpenObserve (O2) provide powerful capabilities to help you monitor and analyze your metrics in real-time.</span></p>

<ol>

<li style="font-weight: 400;"><strong>Installing OpenObserve:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Follow the</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">installation guide</span></a><span style="font-weight: 400;"> to set up OpenObserve in your environment.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Connecting OpenObserve to OpenTelemetry:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Configure OpenObserve to receive metrics from the OpenTelemetry Collector.</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">Example configuration:</span><span style="font-weight: 400;"><br /><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">openobserve:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; prometheus:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:9090"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Creating Dashboards and Alerts Based on Collected Metrics</span></h3>

<p><span style="font-weight: 400;">Dashboards and alerts are essential for proactive monitoring. They provide a real-time view of your system&rsquo;s performance and notify you of any anomalies.</span></p>

<ol>

<li style="font-weight: 400;"><strong>Creating Dashboards:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Use OpenObserve to create custom dashboards that visualize key metrics.</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">Example dashboard configuration:</span><span style="font-weight: 400;"><br /><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">dashboards:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - name: </span><span style="font-weight: 400;">Prometheus</span> <span style="font-weight: 400;">Metrics</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; panels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">CPU</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">node_cpu_seconds_total</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Memory</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">node_memory_MemAvailable_bytes</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Request</span> <span style="font-weight: 400;">Rates</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">http_requests_total</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Setting Up Alerts:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Configure alerts to notify you of critical issues, ensuring you can respond quickly to any problems.</span></li>

</ul>

</ol>

<p><span style="font-weight: 400;">Example alert configuration:</span><span style="font-weight: 400;"><br /><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">alerts:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - name: </span><span style="font-weight: 400;">High</span> <span style="font-weight: 400;">CPU</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; condition: </span><span style="font-weight: 400;">node_cpu_seconds_total</span> <span style="font-weight: 400;">&gt; 80</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - notify: </span><span style="font-weight: 400;">email</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; to: </span><span style="font-weight: 400;">ops-team@example.com</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; message: </span><span style="font-weight: 400;">"High CPU usage detected."</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - name: </span><span style="font-weight: 400;">Low</span> <span style="font-weight: 400;">Memory</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; condition: </span><span style="font-weight: 400;">node_memory_MemAvailable_bytes</span> <span style="font-weight: 400;">&lt;</span> <span style="font-weight: 400;">1000000</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - notify: </span><span style="font-weight: 400;">slack</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; channel: </span><span style="font-weight: 400;">"#alerts"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; message: </span><span style="font-weight: 400;">"Memory usage is critically low."</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Leveraging OpenObserve for Enhanced Monitoring</span></h3>

<p><span style="font-weight: 400;">OpenObserve (O2) enhances your monitoring capabilities by providing a user-friendly interface for creating detailed dashboards and configuring alerts.&nbsp;</span></p>

<p><span style="font-weight: 400;">By integrating OpenObserve with your OpenTelemetry setup, you can achieve comprehensive observability for your systems.</span></p>

<p><span style="font-weight: 400;">Example Integration for Enhanced Monitoring:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">openobserve:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; prometheus:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:9090"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://localhost:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; dashboards:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; - name: </span><span style="font-weight: 400;">Enhanced</span> <span style="font-weight: 400;">Prometheus</span> <span style="font-weight: 400;">Metrics</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; panels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Detailed</span> <span style="font-weight: 400;">CPU</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">node_cpu_seconds_total</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Detailed</span> <span style="font-weight: 400;">Memory</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">node_memory_MemAvailable_bytes</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - title: </span><span style="font-weight: 400;">Detailed</span> <span style="font-weight: 400;">Request</span> <span style="font-weight: 400;">Rates</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; type: </span><span style="font-weight: 400;">graph</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; targets:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - expr: </span><span style="font-weight: 400;">http_requests_total</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; alerts:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; - name: </span><span style="font-weight: 400;">Critical</span> <span style="font-weight: 400;">CPU</span> <span style="font-weight: 400;">Usage</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; condition: </span><span style="font-weight: 400;">node_cpu_seconds_total</span> <span style="font-weight: 400;">&gt; 90</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - notify: </span><span style="font-weight: 400;">email</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; to: </span><span style="font-weight: 400;">ops-team@example.com</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; message: </span><span style="font-weight: 400;">"Critical CPU usage detected."</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; - name: </span><span style="font-weight: 400;">Critical</span> <span style="font-weight: 400;">Memory</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; condition: </span><span style="font-weight: 400;">node_memory_MemAvailable_bytes</span> <span style="font-weight: 400;">&lt;</span> <span style="font-weight: 400;">500000</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; actions:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; - notify: </span><span style="font-weight: 400;">slack</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; channel: </span><span style="font-weight: 400;">"#critical-alerts"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; message: </span><span style="font-weight: 400;">"Memory usage is critically low."</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By following these best practices and leveraging OpenObserve, you can ensure that your monitoring setup is both effective and efficient, providing you with the insights needed to maintain optimal system performance.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll dive into troubleshooting common issues with the Prometheus receiver, providing strategies to diagnose and resolve any problems that may arise.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">Integrating Prometheus with the OpenTelemetry Collector is a powerful way to streamline your metrics collection and enhance your observability setup.&nbsp;</span></p>

<p><span style="font-weight: 400;">By configuring the Prometheus receiver, customizing metrics collection, and leveraging tools like OpenObserve (O2) for visualization and alerting, you can ensure your systems are monitored effectively and efficiently.</span></p>

<p><span style="font-weight: 400;">We&rsquo;ve covered:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The basics of Prometheus and OpenTelemetry integration.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Detailed configurations and customization tips for the Prometheus receiver.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Best practices for monitoring and visualizing metrics.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Practical advice for troubleshooting common issues.</span></li>

</ul>

<p><span style="font-weight: 400;">By following these guidelines, you can optimize your metrics collection and gain deeper insights into your system&rsquo;s performance, helping you proactively manage and maintain your infrastructure.</span></p>

<p><span style="font-weight: 400;">For more information and to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;"> to start using OpenObserve today. </span></p>
