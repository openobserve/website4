---
title: Using Google Cloud Spanner for Metrics and Transactions
seoTitle: Using Google Cloud Spanner for Metrics and Transactions
description: Learn how OpenTelemetry Receiver integrates with Google Cloud
  Spanner for essential database metric monitoring and transactions.
img: /img/resources/using-google-cloud-spanner-for-metrics-and-transactions.png
alt: Google Cloud Spanner Receiver
slug: google-cloud-spanner-receiver-database-monitoring
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - Google Cloud Spanner
  - Database Monitoring
---
<p><span style="font-weight: 400;">Imagine managing a high-performance database like Cloud Spanner without the insights provided by a Google Cloud Spanner Receiver. Sure, the database would still function, but you'd be operating blind&mdash;unable to monitor key metrics like query performance, latency, or error rates. Without this crucial monitoring, you&rsquo;re essentially driving in the dark, unable to detect performance issues before they escalate into critical problems.</span></p>

<p><span style="font-weight: 400;">So in this guide, we'll explore how to leverage the Google Cloud Spanner Receiver to effectively monitor metrics and manage transactions, ensuring your database runs smoothly and efficiently.</span></p>

<h2><span style="font-weight: 400;">Overview of Using Google Cloud Spanner for Metrics and Transactions</span></h2>

<p><span style="font-weight: 400;">Google Cloud Spanner provides a wealth of metrics that can illuminate your database&rsquo;s performance, from transaction latencies to throughput and error rates. But a</span><span style="font-weight: 400;">ccessing these metrics is only half the battle. </span><span style="font-weight: 400;">To make informed decisions, you need a monitoring solution that not only collects this data but also makes it easy to analyze and act upon. </span><span style="font-weight: 400;">This is where OpenTelemetry comes into play, offering a seamless way for integrating with Cloud Spanner and bringing all your observability data into one, easy-to-navigate dashboard.</span></p>

<p><span style="font-weight: 400;">Now that we&rsquo;ve established the importance of monitoring, let&rsquo;s explore the specific metrics Google Cloud Spanner offers and how you can leverage them to keep your database running at peak performance.</span></p>

<p><span style="font-weight: 400;">Read more on </span><a href="https://openobserve.ai/resources/otel-use-cases"><span style="font-weight: 400;">How OpenTelemetry Works and Its Use Cases</span></a><span style="font-weight: 400;">.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Understanding Cloud Spanner Metrics</span></h2>

<p><span style="font-weight: 400;">To get the most out of Google Cloud Spanner, it&rsquo;s crucial to understand the metrics it offers.&nbsp;</span></p>

<p><span style="font-weight: 400;">These metrics are more than just numbers&mdash;they represent the pulse of your database, providing real-time insights into everything from transaction latencies to throughput and error rates.</span></p>

<p><span style="font-weight: 400;">By closely watching these indicators, you can quickly identify potential issues before they escalate into serious problems.</span></p>

<h3><span style="font-weight: 400;">What Metrics Matter?</span></h3>

<p><span style="font-weight: 400;">Google Cloud Spanner tracks a wide array of metrics, each serving a specific purpose in helping you maintain your database's health and performance.&nbsp;</span></p>

<p><span style="font-weight: 400;">Some of the key metrics include:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Transaction Latency:</strong><span style="font-weight: 400;"> This metric tells you how long it takes for a transaction to complete, giving you insights into your database's responsiveness. High latency could indicate performance bottlenecks that need immediate attention.</span></li>

<li style="font-weight: 400;"><strong>Throughput:</strong><span style="font-weight: 400;"> Understanding the number of transactions your database processes per second is essential for scaling your application effectively. Monitoring throughput helps ensure your database can handle increased loads without compromising performance.</span></li>

<li style="font-weight: 400;"><strong>Error Rates:</strong><span style="font-weight: 400;"> Spanner also tracks error rates, which can alert you to potential issues with transactions, queries, or connectivity. A spike in error rates could signal a deeper problem that needs investigation.</span></li>

</ul>

<h3><span style="font-weight: 400;">Using System Tables for Deep Insights</span></h3>

<p><span style="font-weight: 400;">One of Google Cloud Spanner's standout features is its use of system tables to expose these metrics. These tables provide a structured way to query and analyze performance data directly from your database.&nbsp;</span></p>

<p><span style="font-weight: 400;">Whether you&rsquo;re looking at total transaction counts or drilling down into the performance of specific queries, system tables offer a flexible and powerful tool for monitoring your database.</span></p>

<h3><span style="font-weight: 400;">Built-In Tables: Total and Top N</span></h3>

<p><span style="font-weight: 400;">Spanner also includes built-in tables that make it easy to get a snapshot of your database&rsquo;s performance.&nbsp;</span></p>

<p><span style="font-weight: 400;">The </span><strong>Total</strong><span style="font-weight: 400;"> tables provide an overview of aggregated metrics, while the </span><strong>Top N</strong><span style="font-weight: 400;"> tables help you identify the most resource-intensive queries or transactions. By focusing on these top consumers, you can optimize your database more effectively, ensuring that critical operations run smoothly.</span></p>

<p><span style="font-weight: 400;">By leveraging these metrics, you can keep your database running at peak performance, ready to handle your application's demands.&nbsp;</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore how OpenTelemetry can help you integrate these metrics into your broader observability strategy, providing a unified view of your system&rsquo;s health.</span></p>

<p><span style="font-weight: 400;">Read more about </span><a href="https://openobserve.ai/resources/otel-collector"><span style="font-weight: 400;">Getting Started with OpenTelemetry Collector</span></a><span style="font-weight: 400;">.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Using OpenTelemetry for Monitoring&nbsp;</span></h2>

<p><span style="font-weight: 400;">To get the most out of your Google Cloud Spanner setup, you need more than raw data&mdash;you need a robust system that can collect, analyze, and visualize this data in real time.&nbsp;</span></p>

<p><span style="font-weight: 400;">This is where OpenTelemetry offers a robust framework for gathering telemetry data across distributed systems.&nbsp;</span></p>

<h3><span style="font-weight: 400;">Introduction to OpenTelemetry</span></h3>

<p><span style="font-weight: 400;">OpenTelemetry is an open-source project that provides a set of APIs, libraries, and agents to collect distributed traces, metrics, and logs from applications. It&rsquo;s designed to offer a standardized way to gather telemetry data, making it easier to monitor and troubleshoot your applications, regardless of the platform or language you&rsquo;re using.</span></p>

<p><span style="font-weight: 400;">With OpenTelemetry, you can instrument your applications to automatically capture telemetry data as it flows through various components of your system. This data can then be exported to different backends for storage and analysis, giving you a comprehensive view of your system&rsquo;s health and performance.</span></p>

<h3><span style="font-weight: 400;">Integrating OpenTelemetry with Google Cloud Spanner</span></h3>

<p><span style="font-weight: 400;">When it comes to monitoring Google Cloud Spanner, integrating OpenTelemetry is a game-changer. By connecting OpenTelemetry with Cloud Spanner, you can capture essential metrics and traces that provide detailed insights into your database&rsquo;s operations. Whether you&rsquo;re tracking transaction latencies, error rates, or throughput, OpenTelemetry ensures having the data you need to keep your database running smoothly.</span></p>

<p><span style="font-weight: 400;">This integration allows you to centralize your observability data, making it easier to correlate database metrics with application-level traces. This unified view helps you to pinpoint performance issues faster and to understand how different components of your system interact with each other.</span></p>

<h3><span style="font-weight: 400;">OpenTelemetry Receiver for Spanner</span></h3>

<p><span style="font-weight: 400;">The OpenTelemetry Receiver for Spanner bridges Cloud Spanner and your monitoring backend. It collects metrics and traces from Spanner and forwards them to your chosen backend to analyze them. This receiver is highly customizable, allowing you to specify which metrics to collect, how often to collect them, and where to send the data.</span></p>

<p><span style="font-weight: 400;">By utilizing the OpenTelemetry Receiver, you can ensure that you&rsquo;re capturing all the critical data needed to monitor your Cloud Spanner database effectively. This data can then be used to populate dashboards, trigger alerts, and inform your optimization strategies.</span></p>

<h3><span style="font-weight: 400;">Enhance Your Monitoring with OpenObserve (O2)</span></h3>

<p><span style="font-weight: 400;">To take your monitoring capabilities even further, consider using OpenObserve (O2) as your backend for collecting and visualizing the data gathered by OpenTelemetry. O2 excels at storing and querying telemetry data, providing powerful visualization tools that make it easy to analyze metrics and traces in real-time.</span></p>

<p><span style="font-weight: 400;">With OpenObserve, you can set up customized dashboards that give you a clear view of your database&rsquo;s performance, helping you to spot trends, identify bottlenecks, and ensure that your Cloud Spanner setup is always operating at its best.</span></p>

<p><span style="font-weight: 400;">Ready to take your observability to the next level?</span><a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">&nbsp;</span></a></p>

<p><span style="font-weight: 400;">Explore more on our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> or contribute to our project on</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub</span></a><span style="font-weight: 400;"> to be part of the community.&nbsp;</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll dive into the configuration and setup required to integrate OpenTelemetry with Google Cloud Spanner, to make sure&nbsp; you have all the tools you need to monitor your database effectively.</span></p>

<h2><span style="font-weight: 400;">Configuration and Setup</span></h2>

<p><span style="font-weight: 400;">Here we&rsquo;ll talk about the prerequisites and configuration steps needed to integrate OpenTelemetry with Google Cloud Spanner, all while utilizing the power of OpenObserve (O2) for advanced data visualization and analysis.</span></p>

<h3><span style="font-weight: 400;">Prerequisites: Laying the Groundwork</span></h3>

<p><span style="font-weight: 400;">Before diving into the configuration, ensure you have the necessary components in place:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Google Cloud Spanner Instance:</strong><span style="font-weight: 400;"> Make sure your Cloud Spanner instance is up and running with the appropriate permissions set for monitoring.</span></li>

<li style="font-weight: 400;"><strong>OpenTelemetry Collector:</strong><span style="font-weight: 400;"> Install and configure the OpenTelemetry Collector, which will act as the intermediary between your Cloud Spanner metrics and the visualization tools.</span></li>

<li style="font-weight: 400;"><strong>Access to OpenObserve:</strong><span style="font-weight: 400;"> Ensure you have access to an OpenObserve (O2) instance, which will serve as the backend for storing, querying, and visualizing your telemetry data.</span></li>

</ol>

<p><span style="font-weight: 400;">With these prerequisites in place, you&rsquo;re ready to configure your setup.</span></p>

<h3><span style="font-weight: 400;">Configuring OpenTelemetry for Cloud Spanner</span></h3>

<p><span style="font-weight: 400;">The OpenTelemetry Collector is your central hub for collecting and processing telemetry data. To configure it for Google Cloud Spanner, you must define the necessary receivers, processors, and exporters.</span></p>

<ol>

<li style="font-weight: 400;"><strong>Receivers:</strong><span style="font-weight: 400;"> Start by configuring the Google Cloud Spanner receiver in your </span><span style="font-weight: 400;">config.yaml</span><span style="font-weight: 400;"> file. This receiver will pull the metrics and traces directly from your Cloud Spanner instance.</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; googlecloudspanner:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"spanner.googleapis.com"</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Processors:</strong><span style="font-weight: 400;"> Next, define any processors that will modify or enhance the telemetry data before it&rsquo;s exported. This could include batching or filtering operations to streamline the data flow.</span><span style="font-weight: 400;"><br /><br /></span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">processors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; batch:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; timeout: </span><span style="font-weight: 400;">5</span><span style="font-weight: 400;">s</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Exporters:</strong><span style="font-weight: 400;"> Finally, configure the exporter to send the processed telemetry data to OpenObserve (O2). O2&rsquo;s exporter configuration allows you to define the endpoint and any necessary authentication.</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; openobserve:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://your-openobserve-instance:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; tls:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; insecure: </span><span style="font-weight: 400;">true</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By setting up the OpenTelemetry Collector in this way, you ensure that all relevant Cloud Spanner metrics are efficiently gathered and forwarded to OpenObserve for analysis.</span></p>

<h3><span style="font-weight: 400;">Maximize Your Insights with OpenObserve</span></h3>

<p><span style="font-weight: 400;">Once your data is flowing into OpenObserve, it&rsquo;s time to take advantage of O2&rsquo;s powerful visualization tools. With OpenObserve, you can create custom dashboards that offer real-time insights into your Cloud Spanner performance. Whether you&rsquo;re tracking latency, throughput, or error rates, O2 makes it easy to drill down into the data, spot trends, and identify potential issues before they impact your system.</span></p>

<p><span style="font-weight: 400;">With your setup complete, you&rsquo;re now equipped to monitor and optimize your Google Cloud Spanner instance.&nbsp;</span></p>

<p><span style="font-weight: 400;">Read more on </span><a href="https://openobserve.ai/resources/observability-dashboards"><span style="font-weight: 400;">Unifying Observability and Troubleshooting: The Power of Observability Dashboards</span></a><span style="font-weight: 400;">.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Using Metrics for Database Performance Analysis</span></h2>

<p><span style="font-weight: 400;">Once you&rsquo;ve set up your monitoring system, the real value comes from how you use the data to optimize your Google Cloud Spanner instance. Metrics are&nbsp; insights into how your database is performing and where improvements can be made.&nbsp;&nbsp;</span></p>

<h3><span style="font-weight: 400;">Monitoring Latencies and Error Rates&nbsp;</span></h3>

<p><span style="font-weight: 400;">Latency and error rates are critical indicators of your database&rsquo;s health. High latencies can signal underlying issues such as inefficient queries, resource contention, or network delays, while elevated error rates might indicate problems with transaction processing or connectivity.</span></p>

<p><span style="font-weight: 400;">With OpenObserve, you can set up real-time dashboards that track these metrics as they happen. By visualizing latency trends, you can quickly spot when and where performance bottlenecks occur, allowing you to take corrective action before they impact your users.&nbsp;</span></p>

<p><span style="font-weight: 400;">Similarly, monitoring error rates helps you identify and resolve issues faster, ensuring that your Cloud Spanner instance remains stable and responsive.</span></p>

<h3><span style="font-weight: 400;">Throughput Analysis&nbsp;</span></h3>

<p><span style="font-weight: 400;">Throughput&mdash;the rate at which transactions are processed by your database&mdash;is another key metric that provides insight into your system&rsquo;s efficiency. By analyzing throughput data, you can determine whether your database is handling its workload effectively or if it&rsquo;s struggling under the pressure of increased demand.</span></p>

<p><span style="font-weight: 400;">OpenObserve&rsquo;s advanced analytics tools allow you to dive deep into throughput metrics, helping you to identify patterns and trends that may indicate the need for optimization. Whether it&rsquo;s adjusting resource allocation, fine-tuning queries, or scaling your infrastructure, understanding your database&rsquo;s throughput is necessary for maintaining peak performance.</span></p>

<h3><span style="font-weight: 400;">Diagnosing and Fixing Issues&nbsp;</span></h3>

<p><span style="font-weight: 400;">No system is perfect, and even the most well-optimized databases can experience issues. The key to maintaining a resilient Cloud Spanner instance is the ability to diagnose and fix problems as they arise. OpenObserve excels in this area, offering real-time insights that help you quickly pinpoint the root cause of performance issues.</span></p>

<p><span style="font-weight: 400;">By correlating latency, error rates, and throughput data, O2 enables you to see the full picture of your database&rsquo;s performance. This holistic view makes it easier to identify the source of problems, whether it&rsquo;s a specific query, a network issue, or a resource constraint. With O2&rsquo;s powerful visualization and analysis capabilities, you can move from problem identification to resolution faster than ever before.</span></p>

<p><span style="font-weight: 400;">Read more on </span><a href="https://openobserve.ai/resources/data-monitoring-tools-performance-solutions"><span style="font-weight: 400;">Database Performance Monitoring Solutions</span></a><span style="font-weight: 400;">.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">Monitoring and optimizing your Google Cloud Spanner instance doesn&rsquo;t have to be a daunting task. With the right tools and insights, you can ensure that your database performs at its best, even under the most demanding conditions.&nbsp;</span></p>

<p><span style="font-weight: 400;">By leveraging OpenTelemetry for data collection and integrating OpenObserve (O2) for advanced analytics and real-time monitoring, you gain the ability to quickly diagnose issues, optimize performance, and maintain a resilient, high-performing database.</span></p>

<p><strong>Ready to elevate your database monitoring?</strong></p>

<ul>

<li style="font-weight: 400;"><a href="https://cloud.openobserve.ai"><strong>Sign up for OpenObserve (O2) today</strong></a> <span style="font-weight: 400;">and start building custom dashboards that give you unparalleled insights into your Cloud Spanner metrics.</span></li>

</ul>

<p><span style="font-weight: 400;">Explore more on our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;"> or contribute to our project on</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub</span></a><span style="font-weight: 400;"> to be part of the community that&rsquo;s redefining observability.</span></p>
