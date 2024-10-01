---
title: "Understanding JSON Logging: A Guide with Best Practices and Examples"
seoTitle: "Understanding JSON Logging: A Guide with Best Practices and Examples"
description: Explore JSON logging, a structured, searchable log format that
  offers machine and human readability, and fosters true observability.
img: /img/resources/understanding-json-logging.png
alt: json logging
slug: json-logging-guide-examples
authors:
  - openobserve-team
publishDate: 2024-10-01
tags:
  - json
  - logging
---
<p><span style="font-weight: 400;">Logs are a key source of insight into application performance, debugging, and system health. However, traditional log formats often lack structure and searchability, making it difficult to extract meaningful data when needed.&nbsp;</span></p>

<p><span style="font-weight: 400;">JSON logging solves this by providing a structured, machine-parsable, and human-readable log format that not only improves the way logs are stored and analyzed but also fosters greater observability.</span></p>

<p><span style="font-weight: 400;">JSON (JavaScript Object Notation) has become the go-to format for structured data due to its simplicity and language-agnostic nature. When applied to logging, it provides a way to format logs into key-value pairs, making them easier to query, filter, and analyze.&nbsp;</span></p>

<p><span style="font-weight: 400;">As cloud-native environments, microservices, and distributed systems grow in complexity, JSON logging offers developers and operations teams the ability to maintain control over their logs, ensuring that they can quickly find and act upon critical data points.</span></p>

<p><span style="font-weight: 400;">In this guide, we will explore the core principles of </span><strong>JSON logging</strong><span style="font-weight: 400;">, its benefits, drawbacks, best practices, and examples.&nbsp;</span></p>

<p><span style="font-weight: 400;">By the end, you&rsquo;ll have a clear understanding of why structured logs are essential for modern applications and how they can be implemented to improve system visibility and performance.</span></p>

<h2><span style="font-weight: 400;">What is JSON?</span></h2>

<p><span style="font-weight: 400;">JSON, short for JavaScript Object Notation, is a lightweight data interchange format originally derived from JavaScript but now widely used across various programming languages.&nbsp;</span></p>

<p><span style="font-weight: 400;">Designed by Douglas Crockford, JSON has grown into the most common format for structuring and exchanging data due to its simplicity and flexibility.&nbsp;</span></p>

<p><span style="font-weight: 400;">It represents data as key-value pairs, offering an easy-to-read format while maintaining structure, making it a popular choice for developers working on applications requiring real-time communication.</span></p>

<h3><span style="font-weight: 400;">Human Readability and Machine Parsability</span></h3>

<p><span style="font-weight: 400;">One of the key advantages of JSON is its dual capability: it is both human-readable and machine-parsable. Its clean and intuitive syntax (e.g., keys and values wrapped in curly braces) makes it easy for humans to interpret, while its structured format allows machines to quickly parse, process, and transform the data.&nbsp;</span></p>

<p><span style="font-weight: 400;">This makes JSON logging particularly valuable, as logs can be easily understood by engineers while also being ingested by systems for automated processing.</span></p>

<h3><span style="font-weight: 400;">Language-Agnosticism</span></h3>

<p><span style="font-weight: 400;">Unlike some formats that are tied to specific languages or environments, JSON is entirely language-agnostic. Whether you're working with Python, Java, C#, or JavaScript, JSON fits seamlessly into your workflows.</span></p>

<p><span style="font-weight: 400;">&nbsp;This universal compatibility makes JSON ideal for use in cloud-native and distributed systems, where components written in different languages may need to communicate efficiently.</span></p>

<h3><span style="font-weight: 400;">Advantages Over Other Formats (e.g., XML)</span></h3>

<p><span style="font-weight: 400;">When compared to XML, another widely used data format, JSON shines due to its simplicity and reduced verbosity. JSON logs are typically shorter and more readable than XML-based logs, which require opening and closing tags for every entry.&nbsp;</span></p>

<p><span style="font-weight: 400;">JSON&rsquo;s minimalistic approach eliminates unnecessary clutter, resulting in faster parsing, less bandwidth consumption, and reduced storage needs, all while maintaining the flexibility needed for structured data representation.</span></p>

<p><span style="font-weight: 400;">Next, let&rsquo;s dive deeper into how JSON logging compares to traditional log formats and the unique benefits it brings.</span></p>

<p><strong>Read more on </strong><a href="https://openobserve.ai/resources/elastic-storage-solutions-cloud"><strong>Elastic Storage Solutions in the Cloud</strong></a></p>

<h2><span style="font-weight: 400;">What is JSON Logging?</span></h2>

<p><span style="font-weight: 400;">JSON logging refers to the practice of writing logs in the structured JSON (JavaScript Object Notation) format.&nbsp;</span></p>

<p><span style="font-weight: 400;">Unlike traditional logging methods, which often produce plain text logs, JSON logging organizes log data into key-value pairs. This format not only makes logs more readable for humans but also easier for machines to parse and process.&nbsp;</span></p>

<p><span style="font-weight: 400;">As a result, JSON logging is a popular choice for modern applications, particularly those requiring real-time analysis and observability.</span></p>

<h3><span style="font-weight: 400;">Example Comparison: Traditional Log Entry vs. JSON Log Entry</span></h3>

<p><span style="font-weight: 400;">To understand the difference, let's compare a traditional log entry with a JSON log entry:</span></p>

<p><strong>Traditional Log</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[INFO] </span><span style="font-weight: 400;">2024-09-25</span> <span style="font-weight: 400;">15</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;">34</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;">56</span><span style="font-weight: 400;"> - User Liam accessed the dashboard</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">While this log contains useful information, it's unstructured, making it harder to search, parse, or filter in an automated system.</span></p>

<p><strong>JSON Log</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">{</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "level": </span><span style="font-weight: 400;">"info"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "timestamp": </span><span style="font-weight: 400;">"2024-09-25T15:34:56Z"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "message": </span><span style="font-weight: 400;">"User accessed the dashboard"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "user": </span><span style="font-weight: 400;">"Liam"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "action": </span><span style="font-weight: 400;">"access_dashboard"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Here, each piece of information is stored as a key-value pair. Not only is it human-readable, but it&rsquo;s also easy for a machine to index, search, and analyze.</span></p>

<h3><span style="font-weight: 400;">Structure of JSON Documents (Key-Value Pairs)</span></h3>

<p><span style="font-weight: 400;">At its core, JSON logging revolves around a simple structure of key-value pairs. Each log entry is essentially a JSON object that contains a set of keys (like "level," "timestamp," and "message") and their corresponding values.&nbsp;</span></p>

<p><span style="font-weight: 400;">This structure allows you to add as much context as needed, without losing the ability to search, filter, or parse the logs.</span></p>

<p><span style="font-weight: 400;">Next, let's explore the benefits and drawbacks that JSON logging brings to your system.</span></p>

<h2><span style="font-weight: 400;">Benefits and Drawbacks of JSON Logging</span></h2>

<p><strong>Benefits:&nbsp;</strong></p>

<p><strong>1. Human and Machine Readability</strong></p>

<p><span style="font-weight: 400;">One of the standout advantages of JSON logging is its dual-purpose format, allowing both humans and machines to easily parse and understand the data.&nbsp;</span></p>

<p><span style="font-weight: 400;">The key-value structure of JSON logs organizes information clearly, making it simple to extract and analyze log details without the need for complex parsing mechanisms. This readability enhances collaboration between teams, particularly in incident response scenarios where quick data interpretation is crucial.</span></p>

<p><strong>2. Resilient to Changes in Log Schema</strong></p>

<p><span style="font-weight: 400;">JSON logs are highly adaptable. When your application or infrastructure evolves and new fields are added to your logs, JSON's flexible schema allows you to integrate these changes without breaking existing log processing pipelines.&nbsp;</span></p>

<p><span style="font-weight: 400;">This resilience ensures your logging system remains future-proof and continues to support observability needs without requiring constant rework.</span></p>

<p><strong>3. Facilitates True Observability</strong></p>

<p><span style="font-weight: 400;">JSON logging goes beyond basic error tracking by helping you achieve true observability. With structured logs, you can monitor not only errors but also metrics and traces. This holistic view is essential for maintaining system health.&nbsp;</span></p>

<p><span style="font-weight: 400;">OpenObserve plays a key role here, offering a unified platform that ingests and processes JSON logs alongside metrics and traces.&nbsp;</span></p>

<p><span style="font-weight: 400;">Its scalability ensures that, even as your data grows, you can still maintain visibility into every aspect of your system, enhancing your ability to respond to potential issues in real time.</span></p>

<p><strong>4. Simplified Extraction and Analysis of Log Data</strong></p>

<p><span style="font-weight: 400;">JSON logs simplify the extraction and querying of data due to their structured format. Key-value pairs allow for easy filtering, aggregation, and analysis.&nbsp;</span></p>

<p><span style="font-weight: 400;">Tools like OpenObserve further streamline this process by efficiently storing large volumes of JSON logs and offering high-performance queries.&nbsp;</span></p>

<p><span style="font-weight: 400;">With the right tool, JSON logs become a powerful resource for both short-term troubleshooting and long-term performance analysis.</span></p>

<p><strong>Read more on </strong><a href="https://openobserve.ai/blog/launching-openobserve"><strong>Revolutionizing Observability - Unveiling OpenObserve, the High-Performance, Cloud-Native Platform</strong></a></p>

<p><strong>Drawbacks&nbsp;</strong></p>

<p><strong>1.&nbsp;&nbsp;</strong><strong>Visual Density of Raw JSON Logs</strong></p>

<p><span style="font-weight: 400;">Despite its structure, JSON logs can be visually dense, especially when viewed in their raw form. A single log entry might span multiple lines, making it hard to scan manually.&nbsp;</span></p>

<p><span style="font-weight: 400;">OpenObserve provides a solution to this problem by offering visual dashboards that present data in a more digestible format. This makes it easier to interpret the information quickly, mitigating one of the key challenges of working with raw JSON logs.</span></p>

<p><strong>Read more </strong><a href="https://openobserve.ai/resources/observability-dashboards"><strong>Unifying Observability and Troubleshooting: The Power of Observability Dashboards</strong></a></p>

<p><strong>2. Increased Storage Requirements</strong></p>

<p><span style="font-weight: 400;">JSON logs generally consume more space compared to traditional plain-text logs due to their detailed structure. This can result in higher storage costs, especially for large-scale systems generating significant volumes of logs.&nbsp;</span></p>

<p><span style="font-weight: 400;">However, OpenObserve optimizes storage for JSON logs, providing efficient indexing and compression to help mitigate the impact on storage.</span></p>

<p><strong>3. Processing Overhead</strong></p>

<p><span style="font-weight: 400;">With greater structure comes additional processing requirements. JSON logs require more computational resources to parse, analyze, and store, potentially impacting performance.&nbsp;</span></p>

<p><span style="font-weight: 400;">However, modern observability tools like OpenObserve are designed to handle the additional overhead, offering performance optimizations to reduce processing delays and ensure the timely delivery of insights.&nbsp;</span></p>

<p><span style="font-weight: 400;">For further insights into how OpenObserve can transform your observability strategy, visit our</span><a href="https://openobserve.com"> <strong>website</strong></a><span style="font-weight: 400;">.</span></p>

<p><span style="font-weight: 400;">Next, we&rsquo;ll look at best practices to ensure you're getting the most out of your JSON logging strategy, maintaining efficiency and maximizing visibility.</span></p>

<h2><span style="font-weight: 400;">Best Practices for JSON Logging</span></h2>

<ol>

<li><strong> Maintain a Uniform Logging Schema</strong><strong><br /></strong><span style="font-weight: 400;">Consistency is key when it comes to logging. Ensure that your JSON logs follow a uniform schema across different services or components.&nbsp;</span></li>

</ol>

<p><span style="font-weight: 400;">This allows easier querying and processing, as logs are structured in predictable ways. Stick to a clear schema from the start to avoid confusion when analyzing logs later.</span></p>

<ol start="2">

<li><strong> Specify Units in Numerical Field Names</strong><strong><br /></strong><span style="font-weight: 400;">Whenever numerical data is logged, such as time or memory usage, make sure to specify the units in the field names (e.g., </span><span style="font-weight: 400;">response_time_ms</span><span style="font-weight: 400;"> or </span><span style="font-weight: 400;">memory_usage_kb</span><span style="font-weight: 400;">).&nbsp;</span></li>

</ol>

<p><span style="font-weight: 400;">This practice eliminates ambiguity, enabling faster interpretation and consistent understanding among teams.</span></p>

<ol start="3">

<li><strong> Format Exception Stack Traces as JSON</strong><strong><br /></strong><span style="font-weight: 400;">Stack traces are often a critical part of log data, especially when debugging errors. Ensure that stack traces are formatted as JSON to maintain structure and readability.&nbsp;</span></li>

</ol>

<p><span style="font-weight: 400;">This formatting helps with downstream log analysis and error tracking since the trace can be parsed and analyzed like any other JSON data.</span></p>

<ol start="4">

<li><strong> Enrich Logs with Contextual Information</strong><strong><br /></strong><span style="font-weight: 400;">Logs should provide not just the event details, but also the context. For example, include details like user IDs, session IDs, or request sources to offer more insight.&nbsp;</span></li>

</ol>

<p><span style="font-weight: 400;">OpenObserve plays a crucial role here, allowing you to aggregate and enrich logs with valuable contextual information in real-time. With the platform&rsquo;s ability to store and correlate various metrics and traces alongside logs, it makes troubleshooting and root-cause analysis faster and more efficient.</span></p>

<p><a href="https://cloud.openobserve.ai/"><strong>Sign up for OpenObserve today</strong></a><span style="font-weight: 400;"> to unlock seamless real-time log aggregation and enriched contextual insights for faster and more efficient troubleshooting.</span></p>

<p>&nbsp;</p>

<ol start="5">

<li><strong> Write Logs at the Beginning of Development</strong><strong><br /></strong><span style="font-weight: 400;">Incorporate logging early in your development cycle. By doing so, your team will better understand how the system behaves from the outset.&nbsp;</span></li>

</ol>

<p><span style="font-weight: 400;">It also avoids the headaches of retrofitting logging to catch up with application changes, ensuring that observability is baked in from day one.</span></p>

<ol start="6">

<li><strong> Avoid Too Many Fields to Prevent Noise</strong><strong><br /></strong><span style="font-weight: 400;">While it&rsquo;s tempting to log every possible detail, too many fields can clutter logs, creating unnecessary noise. Focus on logging only the most relevant data points to ensure logs are manageable and easier to process.&nbsp;</span></li>

</ol>

<p><span style="font-weight: 400;">Strike a balance between completeness and clarity, ensuring that logs offer meaningful insights without overwhelming teams with irrelevant data.</span></p>

<p><span style="font-weight: 400;">By following these best practices, you'll maintain a streamlined, effective JSON logging approach that enhances visibility and observability without causing unnecessary overhead.&nbsp;</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore specific examples of JSON logs to further illustrate these best practices.</span></p>

<p><strong>Read more about </strong><a href="https://openobserve.ai/resources/observability-stack-understanding"><strong>Understanding the Observability Stack</strong></a></p>

<h2><span style="font-weight: 400;">Examples of JSON Logs</span></h2>

<p><span style="font-weight: 400;">To understand the real-world application of JSON logging, let&rsquo;s look at a few practical examples that showcase the versatility of this format.</span></p>

<h3><span style="font-weight: 400;">1. Informational Message with User Data</span></h3>

<p><span style="font-weight: 400;">An informational message in JSON format might track key details of user activity within your application. This example demonstrates how structured logs provide both human-readable and machine-parsable data:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">{</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "level": </span><span style="font-weight: 400;">"info"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "timestamp": </span><span style="font-weight: 400;">"2023-09-10T12:34:56Z"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "message": </span><span style="font-weight: 400;">"User logged in successfully"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "user_id": </span><span style="font-weight: 400;">"abc123"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "username": </span><span style="font-weight: 400;">"johndoe"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "ip_address": </span><span style="font-weight: 400;">"192.168.0.1"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "login_time": </span><span style="font-weight: 400;">"12:34:56Z"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This log captures essential information about a user login event, which can be easily queried or analyzed using </span><strong>OpenObserve&rsquo;s real-time log analysis features</strong><span style="font-weight: 400;">. OpenObserve allows teams to filter user-specific logs quickly, helping track patterns and monitor system activity effectively.</span></p>

<h3><span style="font-weight: 400;">2. Error Message with Detailed Information</span></h3>

<p><span style="font-weight: 400;">Errors are often the most critical logs to capture, and JSON logging enables you to include rich details for fast debugging:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">{</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "level": </span><span style="font-weight: 400;">"error"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "timestamp": </span><span style="font-weight: 400;">"2023-09-10T12:45:32Z"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "message": </span><span style="font-weight: 400;">"Failed to process payment"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "error_code": </span><span style="font-weight: 400;">"PAYMENT-FAILED-503"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "user_id": </span><span style="font-weight: 400;">"abc123"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "payment_method": </span><span style="font-weight: 400;">"credit_card"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "stack_trace": [</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">"PaymentService.java:56"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">"MainController.java:87"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; ]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this example, </span><strong>OpenObserve&rsquo;s visualization tools</strong><span style="font-weight: 400;"> can track error logs in real time, ensuring immediate action is taken when crucial events such as payment failures occur. Its scalability allows for capturing large amounts of error logs while maintaining performance.</span></p>

<h3><span style="font-weight: 400;">3. Warning Message with Memory Data</span></h3>

<p><span style="font-weight: 400;">Warnings help teams monitor potential issues before they become critical:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">{</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "level": </span><span style="font-weight: 400;">"warning"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "timestamp": </span><span style="font-weight: 400;">"2023-09-10T13:10:15Z"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "message": </span><span style="font-weight: 400;">"Memory usage exceeded 85%"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "memory_used_mb": </span><span style="font-weight: 400;">9200</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "memory_limit_mb": </span><span style="font-weight: 400;">10240</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "node_id": </span><span style="font-weight: 400;">"node-12"</span><span style="font-weight: 400;">,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; "application": </span><span style="font-weight: 400;">"backend-service"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By integrating with </span><strong>OpenObserve</strong><span style="font-weight: 400;">, you can track performance-related warnings like high memory usage. This setup provides immediate insights into potential bottlenecks, allowing teams to react proactively before the issue escalates.</span></p>

<p><span style="font-weight: 400;">Each of these examples highlights how </span><strong>JSON logging</strong><span style="font-weight: 400;"> improves log clarity and enables better observability across systems. Combined with OpenObserve&rsquo;s capabilities, this approach transforms raw logs into actionable data, driving better decision-making.</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">In conclusion, adopting JSON logging as part of your observability strategy provides immense value in creating structured, machine-readable logs that simplify both data extraction and system analysis. By ensuring that logs are easily searchable, human-readable, and scalable, you&rsquo;re building a more resilient and observable system.</span></p>

<p><span style="font-weight: 400;">OpenObserve takes this a step further by offering seamless real-time log analysis, visualization, and centralized storage, ensuring you get the most out of your JSON logs. With its ability to scale and integrate with various telemetry sources, OpenObserve supports your team&rsquo;s efforts to maintain robust observability across distributed environments.</span></p>

<p><span style="font-weight: 400;">Don&rsquo;t miss out on enhancing your observability stack!&nbsp;</span></p>

<p><a href="https://cloud.openobserve.ai/"><strong>Sign up for OpenObserve today</strong></a><span style="font-weight: 400;"> to explore its full capabilities or visit the </span><a href="https://openobserve.com"><strong>website </strong></a><span style="font-weight: 400;">for more information.&nbsp;</span></p>

<p><span style="font-weight: 400;">For developers, you can also explore the project on </span><a href="https://github.com/openobserve"><strong>GitHub </strong></a><span style="font-weight: 400;">and start contributing.</span></p>
