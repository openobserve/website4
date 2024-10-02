---
title: Prometheus Count Basics
seoTitle: Prometheus Count Basics
description: Learn how Prometheus counts unique label values using basic queries
  and methods like `count(count by (label) (metric))`.
img: /img/resources/prometheus-count-basics.png
alt: prometheus count
slug: prometheus-count-basics
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - prometheus count
---
<p><span style="font-weight: 400;">Counting metrics becomes one of the most fundamental tasks when working with Prometheus &mdash; especially when you need to grasp the distribution and occurrence of specific labels within your data.</span></p>

<p><span style="font-weight: 400;">Whether you're tracking user activity, monitoring system performance, or analyzing application behavior, understanding how Prometheus counts unique label values is essential. You can make data-driven decisions and optimize your infrastructure effectively with this knowledge.</span></p>

<p><span style="font-weight: 400;">In this guide, we'll break down the essentials of using Prometheus count functions. From basic queries that count unique label values to advanced techniques that handle intervals and non-zero metrics, we'll cover the tools and methods you need to master Prometheus counting.&nbsp;</span></p>

<p><span style="font-weight: 400;">While we delve into these topics, we'll also discuss how integrating Prometheus with OpenObserve can enhance your monitoring setup, especially for long-term storage and advanced visualization.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Basic Count Queries</span></h2>

<p><span style="font-weight: 400;">Counting metrics efficiently is key to understanding your data's structure when working with Prometheus. The most common use case involves counting unique label values associated with a particular metric.&nbsp;</span></p>

<p><span style="font-weight: 400;">This is where the Prometheus query language (PromQL) comes into play, enabling you to quantify occurrences based on label values.</span></p>

<p><span style="font-weight: 400;">Let&rsquo;s dive into a basic example.&nbsp;</span></p>

<p><span style="font-weight: 400;">Suppose you have a metric called </span><span style="font-weight: 400;">hello_info</span><span style="font-weight: 400;"> with labels &lsquo;</span><span style="font-weight: 400;">a&rsquo;</span><span style="font-weight: 400;"> and &lsquo;</span><span style="font-weight: 400;">b&rsquo;</span><span style="font-weight: 400;">.&nbsp;</span></p>

<p><span style="font-weight: 400;">You want to count the number of unique &lsquo;</span><span style="font-weight: 400;">a&rsquo;</span><span style="font-weight: 400;"> values across your data.&nbsp;</span></p>

<p><span style="font-weight: 400;">The Prometheus query for this would look like:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">count(count by (a) (hello_info))</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This query first groups the </span><span style="font-weight: 400;">hello_info</span><span style="font-weight: 400;"> metric by the &lsquo;</span><span style="font-weight: 400;">a&rsquo;</span><span style="font-weight: 400;"> label, and then counts the number of distinct &lsquo;</span><span style="font-weight: 400;">a&rsquo;</span><span style="font-weight: 400;"> values.&nbsp;</span></p>

<p><span style="font-weight: 400;">Think of it like an SQL </span><span style="font-weight: 400;">COUNT DISTINCT</span><span style="font-weight: 400;"> operation, but within the Prometheus environment.&nbsp;</span></p>

<p><span style="font-weight: 400;">It&rsquo;s an efficient way to get a quick snapshot of how many unique instances exist for a particular label.</span></p>

<p><span style="font-weight: 400;">In more complex scenarios, you might want to count unique combinations of labels.&nbsp;</span></p>

<p><span style="font-weight: 400;">For example, to count unique pairs of </span><span style="font-weight: 400;">a</span><span style="font-weight: 400;"> and </span><span style="font-weight: 400;">b</span><span style="font-weight: 400;">, you would modify the query to:</span></p>

<table>

<tbody>

<tr style="height: 35.375px;">

<td style="height: 35.375px;">

<p><span style="font-weight: 400;">count(count by (a, b) (hello_info))</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This query will count the number of unique </span><span style="font-weight: 400;">(a, b)</span><span style="font-weight: 400;"> pairs, giving you insight into the distribution and co-occurrence of these labels.</span></p>

<p><span style="font-weight: 400;">Any Prometheus user must understand and effectively use these basic count queries. It allows you to create more meaningful metrics and dashboards, particularly when integrated with visualization tools like OpenObserve, which can store and visualize this data over time.</span></p>

<p><span style="font-weight: 400;">Let's shift gears and dive into the intricacies of counting metrics over specified intervals to refine your ability to analyze data.</span></p>

<p><strong>Read more on </strong><a href="https://openobserve.ai/resources/prometheus-metric-types-exploration"><strong>Exploring Prometheus Metrics Types</strong></a><strong>.</strong></p>

<h2><span style="font-weight: 400;">Advanced Counting with Intervals</span></h2>

<p><span style="font-weight: 400;">Understanding how to count metrics over specific time intervals is crucial for in-depth analysis.&nbsp;</span></p>

<p><span style="font-weight: 400;">The </span><span style="font-weight: 400;">last_over_time()</span><span style="font-weight: 400;"> function is particularly useful for capturing the last value of a metric within a defined interval.&nbsp;</span></p>

<p><span style="font-weight: 400;">This function allows you to analyze how your metrics change over time, providing insights into trends and anomalies.</span></p>

<p><strong>Example: Custom Intervals with </strong><strong>last_over_time()</strong></p>

<p><span style="font-weight: 400;">To count the unique label values over a 1-day interval, you can use a query like this:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">count(last_over_time(your_metric\[1d]))</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This query counts the last recorded value of </span><span style="font-weight: 400;">your_metric</span><span style="font-weight: 400;"> within the past day.&nbsp;</span></p>

<p><span style="font-weight: 400;">Adjusting the interval allows you to tailor your analysis to specific periods, whether you're interested in daily, weekly, or even hourly metrics.</span></p>

<h3><span style="font-weight: 400;">Extending Prometheus with OpenObserve</span></h3>

<p><span style="font-weight: 400;">While Prometheus excels at real-time monitoring, it has limited capabilities for long-term storage and historical analysis. You can address this gap by running Prometheus in agent mode and combining it with OpenObserve.</span></p>

<p><span style="font-weight: 400;">By sending your metrics data to OpenObserve, you can store, visualize, and analyze your data over extended periods, enabling more comprehensive insights and trend analysis.</span></p>

<p><span style="font-weight: 400;">Running Prometheus in agent mode focuses its resources on scraping and forwarding metrics while unloading storage and querying to OpenObserve.&nbsp;</span></p>

<p><span style="font-weight: 400;">This approach preserves the performance of your Prometheus setup and enhances your ability to make data-driven decisions by utilizing historical data. Explore more on our</span><a href="https://openobserve.ai/"> <strong>website</strong></a><span style="font-weight: 400;"> or dive into our</span><a href="https://github.com/openobserve"> <strong>GitHub repository</strong></a><span style="font-weight: 400;"> for detailed insights and resources.</span></p>

<p><span style="font-weight: 400;">Next, we&rsquo;ll explore the techniques for counting distinct non-zero metrics to refine your data analysis even further.</span></p>

<p><strong>Read more on </strong><a href="https://openobserve.ai/resources/prometheus-vs-grafana"><strong>Prometheus vs. Grafana: In-Depth Comparison &amp; Differences</strong></a><strong>.&nbsp;</strong></p>

<h2><span style="font-weight: 400;">Counting Distinct Non-Zero Metrics</span></h2>

<p><span style="font-weight: 400;">It's often essential to identify and count distinct non-zero occurrences within your data using the Prometheus count functionality.&nbsp;</span></p>

<p><span style="font-weight: 400;">This approach is particularly beneficial for tracking metrics that appear infrequently or under specific conditions, such as error rates or sudden traffic spikes.</span></p>

<p><span style="font-weight: 400;">The </span><strong>delta()</strong><span style="font-weight: 400;"> function in Prometheus allows you to calculate the difference between the values of a metric over a specified time interval.&nbsp;</span></p>

<p><span style="font-weight: 400;">By combining </span><span style="font-weight: 400;">delta()</span><span style="font-weight: 400;"> with </span><span style="font-weight: 400;">count by (label)</span><span style="font-weight: 400;">, you can efficiently count distinct non-zero metrics:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">count by (label)(delta(your_metric\[interval]) &gt; 0) OR on() vector(0)</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This query calculates the change in </span><span style="font-weight: 400;">your_metric</span><span style="font-weight: 400;"> over the defined interval and then it counts the number of distinct label values where this change is greater than zero.</span></p>

<p><span style="font-weight: 400;">The </span><span style="font-weight: 400;">OR on() vector(0)</span><span style="font-weight: 400;"> ensures that even if no change occurs, the metric is still evaluated.</span></p>

<p><span style="font-weight: 400;">For instance, if you're monitoring error logs, this query helps you count how many distinct labels (like error types) have had non-zero occurrences within the interval.</span></p>

<h3><span style="font-weight: 400;">Enhancing Analysis with OpenObserve</span></h3>

<p><span style="font-weight: 400;">While the Prometheus count function effectively manages real-time metrics, you can significantly expand your analytical capabilities by integrating it with OpenObserve.</span></p>

<p><span style="font-weight: 400;">By running Prometheus in agent mode and sending data to OpenObserve, you can store long-term data, create custom dashboards, and perform in-depth historical analysis. This setup ensures that your monitoring infrastructure is not only real-time but also capable of deep insights over extended periods.</span></p>

<p><span style="font-weight: 400;">Next, we&rsquo;ll delve into how to count time series within Prometheus, expanding your toolkit for comprehensive metric analysis.</span></p>

<p><strong>Read more on </strong><a href="https://openobserve.ai/blog/send-metrics-using-kube-prometheus-stack-to-openobserve"><strong>Send Kubernetes Metrics Using Prometheus to OpenObserve</strong></a><strong>.&nbsp;</strong></p>

<h2><span style="font-weight: 400;">Counting Time Series</span></h2>

<p><span style="font-weight: 400;">Time series represent the unique sets of label-value combinations for each metric, and knowing how to count them can provide insights into the complexity and volume of your data.</span></p>

<p><strong>Determining the Number of Time Series Using Prometheus Metrics</strong></p>

<p><span style="font-weight: 400;">To determine the number of active time series in Prometheus, you can use specific metrics and queries.&nbsp;</span></p>

<p><span style="font-weight: 400;">A common approach is to query the </span><span style="font-weight: 400;">prometheus_tsdb_head_series</span><span style="font-weight: 400;"> metric, which indicates the number of time series currently in memory:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">prometheus_tsdb_head_series</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This simple query returns a count of all active time series within Prometheus's head block, giving you a snapshot of the data being actively monitored.</span></p>

<p><strong>Using </strong><strong>count({\_\_name\_\_=~'.+'})</strong></p>

<p><span style="font-weight: 400;">Another method to count time series involves the </span><span style="font-weight: 400;">count({\_\_name\_\_=~'.+'})</span><span style="font-weight: 400;"> query. This query counts all time series across all metrics, providing a comprehensive view of your dataset:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">count({\_\_name\_\_=~'.+'})</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This query is particularly useful when you want to get an overview of the total number of time series across all metrics in your system.</span></p>

<p><strong>Alternative Methods</strong></p>

<p><span style="font-weight: 400;">In addition to these queries, you can explore the storage path of Prometheus to analyze time series data directly from the disk.&nbsp;</span></p>

<p><span style="font-weight: 400;">However, this approach is more complex and typically used for in-depth troubleshooting.</span></p>

<p><span style="font-weight: 400;">Another option is to use the Prometheus UI, which provides a visual representation of time series data, including the ability to explore individual time series metrics and their labels.&nbsp;</span></p>

<p><span style="font-weight: 400;">While functional, the Prometheus UI can be limited in customization and depth of analysis.</span></p>

<h3><span style="font-weight: 400;">Enhancing Time Series Analysis with OpenObserve</span></h3>

<p><span style="font-weight: 400;">For more advanced time series analysis, integrating Prometheus with OpenObserve can significantly enhance your monitoring capabilities.&nbsp;</span></p>

<p><span style="font-weight: 400;">To start, Prometheus can be configured to run in agent mode, focusing on data collection and sending metrics to OpenObserve for long-term storage and visualization. This setup ensures that your time series data is preserved beyond Prometheus's short retention window, allowing for detailed historical analysis.</span></p>

<p><span style="font-weight: 400;">Here&rsquo;s a basic configuration example for setting up Prometheus to send data to OpenObserve:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; scrape_interval: </span><span style="font-weight: 400;">15</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">scrape_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - job_name: </span><span style="font-weight: 400;">'prometheus'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; static_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - targets: </span><span style="font-weight: 400;">\['localhost:9090']</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">remote_write:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - url: </span><span style="font-weight: 400;">"http://openobserve-instance/api/prom/push"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; basic_auth:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; username: </span><span style="font-weight: 400;">"YOUR_OPENOBSERVE_USERNAME"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; password: </span><span style="font-weight: 400;">"YOUR_OPENOBSERVE_PASSWORD"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; queue_config:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; capacity: </span><span style="font-weight: 400;">10000</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; max_shards: </span><span style="font-weight: 400;">200</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; min_shards: </span><span style="font-weight: 400;">1</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Setting Up OpenObserve for Prometheus Data</span></h3>

<ol>

<li style="font-weight: 400;"><strong>Prometheus Configuration</strong><span style="font-weight: 400;">:</span></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">In the </span><span style="font-weight: 400;">remote_write</span><span style="font-weight: 400;"> section of your Prometheus config, specify the URL where OpenObserve is running. This allows Prometheus to push its metrics to OpenObserve.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Use basic authentication to secure the data transmission.</span></li>

</ul>

<li style="font-weight: 400;"><strong>OpenObserve Setup</strong><span style="font-weight: 400;">:</span></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Ensure that OpenObserve is configured to accept Prometheus data. This typically involves setting up an appropriate endpoint that can receive the time series data being pushed by Prometheus.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Visualizing Data</strong><span style="font-weight: 400;">:</span></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Once data is flowing from Prometheus to OpenObserve, you can use OpenObserve&rsquo;s dashboards to create custom visualizations. OpenObserve provides built-in analytics that can be customized to your needs.</span></li>

</ul>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">query:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; range: </span><span style="font-weight: 400;">1</span><span style="font-weight: 400;">h</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; interval: </span><span style="font-weight: 400;">1</span><span style="font-weight: 400;">m</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; instant: </span><span style="font-weight: 400;">false</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This configuration allows you to handle and visualize time series data more effectively, giving you a comprehensive view of your system's performance over time.&nbsp;</span></p>

<p><span style="font-weight: 400;">OpenObserve&rsquo;s powerful visualization tools help you track metrics across different intervals, identify trends, and make informed decisions based on historical data.</span></p>

<p><span style="font-weight: 400;">Explore more on our</span><a href="https://openobserve.ai/"> <strong>website</strong></a><span style="font-weight: 400;"> or dive into our</span><a href="https://github.com/openobserve"> <strong>GitHub repository</strong></a><span style="font-weight: 400;"> for detailed insights and resources.</span></p>

<p><strong>Check the below 2 minute video to see how easy it is to build dashboards in OpenObserve.</strong></p>

<p><strong>Read more on </strong><a href="https://openobserve.ai/blog/openobserve-vs-grafana"><strong>OpenObserve Vs Grafana</strong></a><strong>.&nbsp;</strong></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">Understanding the basics of Prometheus count functions is crucial for anyone looking to gain insights from their metrics data.&nbsp;</span></p>

<p><span style="font-weight: 400;">You can significantly enhance your monitoring and observability efforts by mastering how to count unique label values, analyze distinct non-zero metrics, and manage time series.&nbsp;</span></p>

<p><span style="font-weight: 400;">You can further elevate your capabilities by integrating Prometheus with tools like OpenObserve, offering advanced visualization and long-term data storage that Prometheus alone cannot provide.</span></p>

<p><span style="font-weight: 400;">If you're ready to elevate your observability strategy, consider trying out OpenObserve, </span><a href="https://cloud.openobserve.ai"><strong>sign up</strong></a><span style="font-weight: 400;"> today to explore its full potential.</span></p>

<p><span style="font-weight: 400;">To learn more, visit our</span><a href="https://openobserve.ai/"> <strong>website</strong></a><span style="font-weight: 400;"> or check out our</span><a href="https://github.com/openobserve"> <strong>GitHub repository</strong></a><span style="font-weight: 400;"> to explore resources and become part of the community.</span></p>
