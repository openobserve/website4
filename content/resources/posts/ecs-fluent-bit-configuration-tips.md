---
title: ECS Fluent Bit Configuration Tips and Tricks
seoTitle: ECS Fluent Bit Configuration Tips and Tricks
description: " Explore the utility of Fluent Bit with ECS and gain useful
  configuration tips including debugging, routing records and Lua scripting."
img: /img/resources/ecs-fluent-bit-configuration-tips-and-tricks.png
alt: ECS Fluent Bit Configuration Tips and Tricks
slug: ecs-fluent-bit-configuration-tips
authors:
  - openobserve-team
publishDate: 2024-09-18
---
<p><span style="font-weight: 400;">Fluent Bit has become a popular choice for log forwarding and processing due to its lightweight nature and high performance. When integrated with Amazon Elastic Container Service (ECS), Fluent Bit offers a robust solution for managing and processing logs in containerized environments. This blog aims to provide you with practical configuration tips to get the most out of Fluent Bit with ECS.</span></p>

<p><span style="font-weight: 400;">Fluent Bit is designed to handle log data efficiently, making it an ideal tool for environments where performance and resource efficiency are critical. By using Fluent Bit, you can ensure that your logs are processed and forwarded with minimal overhead, enabling you to maintain optimal application performance.</span></p>

<p><span style="font-weight: 400;">In this guide, we'll walk you through the basics of Fluent Bit configuration, debugging tips, advanced features like Lua scripting, and more. Whether you're just getting started or looking to optimize your existing setup, these insights will help you leverage Fluent Bit effectively within your ECS infrastructure.</span></p>

<h3><strong>Overview of the Popularity and Utility of Fluent Bit with ECS</strong></h3>

<p><span style="font-weight: 400;">Fluent Bit's popularity in the DevOps community is largely due to its ability to process logs from various sources and deliver them to multiple destinations with low latency and minimal resource consumption. When deployed alongside ECS, Fluent Bit can seamlessly integrate into your containerized environment, providing a scalable and efficient solution for log management.</span></p>

<h3><strong>Intentions to Share Useful Configuration Tips</strong></h3>

<p><span style="font-weight: 400;">The primary goal of this blog is to share practical configuration tips that can help you set up and optimize Fluent Bit within your ECS clusters. We'll cover essential configuration basics, advanced techniques, and troubleshooting strategies to ensure your log management system is both effective and efficient. By following these tips, you can enhance your log processing capabilities and maintain a high-performance ECS environment.</span></p>

<p><span style="font-weight: 400;">Next, we&rsquo;ll dive into the basics of Fluent Bit configuration, breaking down the structure of its configuration files and explaining the role of each section.</span></p>



<h2><span style="font-weight: 400;">Fluent Bit Configuration Basics</span></h2>

<p><span style="font-weight: 400;">Configuring Fluent Bit effectively is crucial for ensuring that it operates smoothly and efficiently within your ECS environment. This section will break down the structure of Fluent Bit&rsquo;s configuration files and highlight the essential components you need to know.</span></p>

<h3><span style="font-weight: 400;">Explanation of Configuration File Structure</span></h3>

<p><span style="font-weight: 400;">A Fluent Bit configuration file is organized into several sections, each serving a specific purpose. The primary sections include:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Service</strong><span style="font-weight: 400;">: This section defines global properties for Fluent Bit, such as log level, flush interval, and other general settings.</span></li>

<li style="font-weight: 400;"><strong>Input</strong><span style="font-weight: 400;">: Specifies the sources from which Fluent Bit collects logs. Each input plugin defines a particular type of log source, such as files, network streams, or system logs.</span></li>

<li style="font-weight: 400;"><strong>Output</strong><span style="font-weight: 400;">: Defines where Fluent Bit sends the processed logs. Output plugins can forward logs to various destinations like Elasticsearch, AWS S3, or OpenObserve for advanced log analytics.</span></li>

<li style="font-weight: 400;"><strong>Filter</strong><span style="font-weight: 400;">: Allows you to modify log records before they are sent to their destination. Filters can enrich, exclude, or transform log data as needed.</span></li>

</ol>

<h3><span style="font-weight: 400;">Importance of Parsers in Processing Input Records</span></h3>

<p><span style="font-weight: 400;">Parsers play a vital role in interpreting the raw log data collected by input plugins. They convert unstructured log entries into structured data that Fluent Bit can process and route efficiently. Parsers are defined in separate configuration files and are referenced within the input and filter sections.</span></p>

<p><span style="font-weight: 400;">Not all configuration sections are mandatory. At a minimum, you need an input and an output section to define where Fluent Bit collects logs and where it sends them. Filters and parsers, while optional, provide powerful capabilities for log processing and should be utilized to enhance the efficiency and clarity of your log data.</span></p>

<h4><strong>Example Configuration</strong></h4>

<p><span style="font-weight: 400;">Here is a basic example of a Fluent Bit configuration file:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[SERVICE]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Flush&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Daemon &nbsp; &nbsp; &nbsp; Off</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Log_Level&nbsp; &nbsp; </span><span style="font-weight: 400;">info</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">\[INPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name &nbsp; &nbsp; &nbsp; &nbsp; tail</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Path &nbsp; &nbsp; &nbsp; &nbsp; /</span><span style="font-weight: 400;">var</span><span style="font-weight: 400;">/</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;">/containers/*.</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Parser &nbsp; &nbsp; &nbsp; docker</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name &nbsp; &nbsp; &nbsp; &nbsp; grep</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Match</span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Regex&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">log</span><span style="font-weight: 400;"> ^ERROR</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">\[OUTPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name &nbsp; &nbsp; &nbsp; &nbsp; http</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Match</span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Host &nbsp; &nbsp; &nbsp; &nbsp; openobserve.example.com</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Port &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">8080</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; URI&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; /api/logs</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Format &nbsp; &nbsp; &nbsp; json_lines</span></p>

</td>

</tr>

</tbody>

</table>



<p><span style="font-weight: 400;">In this example:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Service</strong><span style="font-weight: 400;"> section sets general settings for Fluent Bit.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Input</strong><span style="font-weight: 400;"> section specifies that Fluent Bit should tail log files from a specified directory and use the Docker parser.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Filter</strong><span style="font-weight: 400;"> section applies a grep filter to only include logs containing the word "ERROR."</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Output</strong><span style="font-weight: 400;"> section configures Fluent Bit to send logs to OpenObserve for advanced log management and analysis.</span></li>

</ul>

<h3><strong>Enhancing Your Logging Setup with OpenObserve</strong></h3>

<p><span style="font-weight: 400;">OpenObserve seamlessly integrates with Fluent Bit, providing advanced analytics, visualization, and long-term storage for your logs. By sending your Fluent Bit logs to OpenObserve, you can gain deeper insights into your system's performance and streamline troubleshooting processes.</span></p>

<h4><span style="font-weight: 400;">Sign Up for OpenObserve</span></h4>

<p><span style="font-weight: 400;">Ready to enhance your logging setup? Sign up for a free trial of OpenObserve on our</span><a href="https://openobserve.ai/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">.</span></p>

<h4><span style="font-weight: 400;">Explore OpenObserve on GitHub</span></h4>

<p><span style="font-weight: 400;">Interested in setting it up yourself? Check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">.</span></p>

<h4><span style="font-weight: 400;">Book a Demo</span></h4>

<p><span style="font-weight: 400;">Want to see OpenObserve in action? Book a </span><a href="https://openobserve.ai/contactus/"><span style="font-weight: 400;">demo </span></a><span style="font-weight: 400;">to learn how OpenObserve can complement your Fluent Bit configuration.</span></p>

<p><span style="font-weight: 400;">Next, we&rsquo;ll look into debugging and troubleshooting Fluent Bit configurations to ensure smooth deployments and efficient log processing.</span></p>



<h2><span style="font-weight: 400;">Debugging and Troubleshooting Fluent Bit Configuration File</span></h2>

<p><span style="font-weight: 400;">Fluent Bit configuration can sometimes be tricky, especially during deployments and testing. This section will cover common challenges and practical tips for effective debugging and troubleshooting.</span></p>

<h3><span style="font-weight: 400;">Challenges Faced with Deployments and Testing Changes</span></h3>

<p><span style="font-weight: 400;">Deploying Fluent Bit configurations in a production environment can reveal unexpected issues. These challenges often include syntax errors, misconfigured plugins, or incorrect paths. Identifying and resolving these issues quickly is essential for maintaining smooth log processing.</span></p>

<h4><strong>Using the </strong><strong>dummy</strong><strong> Input for Quick Testing and Debugging</strong></h4>

<p><span style="font-weight: 400;">One of the best ways to test Fluent Bit configurations is by using the </span><span style="font-weight: 400;">dummy</span><span style="font-weight: 400;"> input plugin. This plugin generates dummy log records, allowing you to verify that your configuration is working correctly without relying on real log data. Here&rsquo;s a simple example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[INPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name &nbsp; </span><span style="font-weight: 400;">dummy</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Tag&nbsp; &nbsp; </span><span style="font-weight: 400;">dummy</span><span style="font-weight: 400;">.</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">[</span><span style="font-weight: 400;">OUTPUT</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name &nbsp; stdout</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match&nbsp; *</span></p>

</td>

</tr>

</tbody>

</table>



<p><span style="font-weight: 400;">In this setup:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Input</strong><span style="font-weight: 400;"> section uses the </span><span style="font-weight: 400;">dummy</span><span style="font-weight: 400;"> plugin to generate log records tagged as </span><span style="font-weight: 400;">dummy.log</span><span style="font-weight: 400;">.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Output</strong><span style="font-weight: 400;"> section sends these records to the standard output for quick inspection.</span></li>

</ul>

<h4><strong>Workaround Using </strong><strong>exec</strong><strong> Instead of </strong><strong>dummy</strong><strong> for More Complex Testing Scenarios</strong></h4>

<p><span style="font-weight: 400;">For more complex scenarios, you can use the </span><span style="font-weight: 400;">exec</span><span style="font-weight: 400;"> input plugin, which allows you to execute a script or command to generate log data. This method is particularly useful for simulating specific log patterns or testing complex filters and parsers. Here&rsquo;s an example configuration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[INPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Name</span><span style="font-weight: 400;"> &nbsp; </span><span style="font-weight: 400;">exec</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Tag&nbsp; &nbsp; </span><span style="font-weight: 400;">exec</span><span style="font-weight: 400;">.</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Command </span><span style="font-weight: 400;">echo</span> <span style="font-weight: 400;">'{"key": "value"}'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">\[OUTPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Name</span><span style="font-weight: 400;"> &nbsp; stdout</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match&nbsp; *</span></p>

</td>

</tr>

</tbody>

</table>



<p><span style="font-weight: 400;">In this setup:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Input</strong><span style="font-weight: 400;"> section uses the </span><span style="font-weight: 400;">exec</span><span style="font-weight: 400;"> plugin to run a command that generates log records.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Output</strong><span style="font-weight: 400;"> section sends these records to the standard output for verification.</span></li>

</ul>

<h3><strong>Integrate OpenObserve for Enhanced Troubleshooting</strong></h3>

<p><span style="font-weight: 400;">Using OpenObserve with Fluent Bit can significantly streamline your debugging process. OpenObserve provides powerful visualization and search capabilities, making it easier to identify and resolve issues in your log data.</span></p>

<p><span style="font-weight: 400;">Sign up for OpenObserve</span></p>

<p><span style="font-weight: 400;">Ready to enhance your troubleshooting setup? Sign up for a free trial of OpenObserve on our</span><a href="https://openobserve.ai/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">.</span></p>

<p><span style="font-weight: 400;">Explore OpenObserve on GitHub</span></p>

<p><span style="font-weight: 400;">Interested in setting it up yourself? Check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">.</span></p>

<p><span style="font-weight: 400;">Book a Demo</span></p>

<p><span style="font-weight: 400;">Want to see OpenObserve in action? Book a demo to learn how OpenObserve can complement your Fluent Bit configuration.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll dive into loading parsers and using them effectively in Fluent Bit to process and enrich your log data.</span></p>



<h2><span style="font-weight: 400;">Loading Parsers</span></h2>

<p><span style="font-weight: 400;">Parsers play a crucial role in processing and enriching the input records in Fluent Bit. They allow you to transform raw log data into a structured format, making it easier to analyze and manage. This section covers the basics of using parsers effectively.</span></p>

<h3><span style="font-weight: 400;">Placement of Parsers in a Separate File and Loading Them in the Service Section</span></h3>

<p><span style="font-weight: 400;">To keep your configuration organized, it's recommended to place your parsers in a separate file and load them in the service section of your main configuration file. Here&rsquo;s an example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[Service]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Parsers_File parsers.</span><span style="font-weight: 400;">conf</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">[</span><span style="font-weight: 400;">INPUT</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name &nbsp; tail</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Path &nbsp; /</span><span style="font-weight: 400;">var</span><span style="font-weight: 400;">/</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;">/</span><span style="font-weight: 400;">app</span><span style="font-weight: 400;">.</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Tag&nbsp; &nbsp; </span><span style="font-weight: 400;">app</span><span style="font-weight: 400;">.</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Parser json</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">\[OUTPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name &nbsp; stdout</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match&nbsp; *</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this setup:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Service</strong><span style="font-weight: 400;"> section specifies the file (</span><span style="font-weight: 400;">parsers.conf</span><span style="font-weight: 400;">) that contains the parser definitions.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Input</strong><span style="font-weight: 400;"> section uses the </span><span style="font-weight: 400;">tail</span><span style="font-weight: 400;"> plugin to read logs from a file and applies the </span><span style="font-weight: 400;">json</span><span style="font-weight: 400;"> parser.</span></li>

</ul>

<h3><span style="font-weight: 400;">Use of Parsers with Input and Filter Sections</span></h3>

<p><span style="font-weight: 400;">Parsers are essential for transforming and enriching the log data. By configuring parsers in both the input and filter sections, you can ensure that the logs are processed correctly and are in a structured format that is easier to analyze.</span></p>

<p><strong>Input Section</strong></p>

<p><span style="font-weight: 400;">Using a parser in the input section allows you to transform raw log data as it is being ingested. Here&rsquo;s an example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[INPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Name</span><span style="font-weight: 400;"> &nbsp; tail</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Path &nbsp; /var/</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;">/apache2/</span><span style="font-weight: 400;">access</span><span style="font-weight: 400;">.</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Tag&nbsp; &nbsp; apache.</span><span style="font-weight: 400;">access</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Parser apache2</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">\[OUTPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Name</span><span style="font-weight: 400;"> &nbsp; stdout</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match&nbsp; *</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this configuration:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Input</strong><span style="font-weight: 400;"> section uses the </span><span style="font-weight: 400;">tail</span><span style="font-weight: 400;"> plugin to read logs from the Apache access log file.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><span style="font-weight: 400;">Parser</span><span style="font-weight: 400;"> directive specifies the </span><span style="font-weight: 400;">apache2</span><span style="font-weight: 400;"> parser to format the log data appropriately.</span></li>

</ul>

<p><strong>Filter Section</strong></p>

<p><span style="font-weight: 400;">The filter section allows for additional data processing after the logs have been ingested. You can use parsers in the filter section to modify and enrich logs further. Here&rsquo;s an example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">[</span><span style="font-weight: 400;">INPUT</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name &nbsp; tail</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Path &nbsp; /</span><span style="font-weight: 400;">var</span><span style="font-weight: 400;">/</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;">/mysql/</span><span style="font-weight: 400;">error</span><span style="font-weight: 400;">.</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Tag&nbsp; &nbsp; mysql.</span><span style="font-weight: 400;">error</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name &nbsp; parser</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match&nbsp; mysql.</span><span style="font-weight: 400;">error</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Key_Name </span><span style="font-weight: 400;">log</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Parser mysql</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">\[OUTPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name &nbsp; stdout</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match&nbsp; *</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this setup:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Input</strong><span style="font-weight: 400;"> section reads logs from the MySQL error log file.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><strong>Filter</strong><span style="font-weight: 400;"> section uses the </span><span style="font-weight: 400;">parser</span><span style="font-weight: 400;"> filter to re-parse the log field named </span><span style="font-weight: 400;">log</span><span style="font-weight: 400;"> with the </span><span style="font-weight: 400;">mysql</span><span style="font-weight: 400;"> parser. This helps in extracting additional fields or transforming the data further before sending it to the output.</span></li>

</ul>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll delve into modifying records using the FILTER section in Fluent Bit, allowing you to add, overwrite, remove, or rename fields in your log data.</span></p>

<h2><span style="font-weight: 400;">Modify Records with FILTER</span></h2>

<p><span style="font-weight: 400;">Fluent Bit's </span><span style="font-weight: 400;">FILTER</span><span style="font-weight: 400;"> section provides powerful capabilities to modify log records. You can add, overwrite, remove, or rename fields, and even use environment variables and conditional actions to customize your log data.</span></p>

<h3><span style="font-weight: 400;">Basic Operations of the Modify Filter</span></h3>

<p><span style="font-weight: 400;">The </span><span style="font-weight: 400;">Modify</span><span style="font-weight: 400;"> filter allows you to make straightforward changes to your log records. Here are some common operations:</span></p>

<h4><span style="font-weight: 400;">Add a Field</span></h4>

<p><span style="font-weight: 400;">To add a new field to each log record:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; modify</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Add</span><span style="font-weight: 400;"> &nbsp; &nbsp; &nbsp; &nbsp; hostname&nbsp; myserver</span></p>

</td>

</tr>

</tbody>

</table>



<h4><span style="font-weight: 400;">Overwrite a Field</span></h4>

<p><span style="font-weight: 400;">To overwrite the value of an existing field:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; modify</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Match</span><span style="font-weight: 400;"> &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Set</span><span style="font-weight: 400;"> &nbsp; &nbsp; &nbsp; &nbsp; log_level&nbsp; info</span></p>

</td>

</tr>

</tbody>

</table>



<h4><span style="font-weight: 400;">Remove a Field</span></h4>

<p><span style="font-weight: 400;">To remove a specific field from the log records:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; modify</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Remove</span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; unwanted_field</span></p>

</td>

</tr>

</tbody>

</table>



<h4><span style="font-weight: 400;">Rename a Field</span></h4>

<p><span style="font-weight: 400;">To rename a field:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Name</span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; modify</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Rename</span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; old_field_name&nbsp; new_field_name</span></p>

</td>

</tr>

</tbody>

</table>



<h3><span style="font-weight: 400;">Using Environment Variables and Conditional Actions</span></h3>

<p><span style="font-weight: 400;">You can use environment variables within the </span><span style="font-weight: 400;">Modify</span><span style="font-weight: 400;"> filter to dynamically set field values. For example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; modify</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Add</span><span style="font-weight: 400;"> &nbsp; &nbsp; &nbsp; &nbsp; environment&nbsp; </span><span style="font-weight: 400;">${ENVIRONMENT}</span></p>

</td>

</tr>

</tbody>

</table>



<p><span style="font-weight: 400;">Additionally, conditional actions allow you to apply modifications only when certain conditions are met. For example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; modify</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Condition &nbsp; Key_value_equals&nbsp; log_level&nbsp; </span><span style="font-weight: 400;">error</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">Add</span><span style="font-weight: 400;"> &nbsp; &nbsp; &nbsp; &nbsp; alert&nbsp; </span><span style="font-weight: 400;">true</span></p>

</td>

</tr>

</tbody>

</table>



<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore routing and multiple outputs, discussing the importance of using the </span><span style="font-weight: 400;">Tag</span><span style="font-weight: 400;"> and </span><span style="font-weight: 400;">Match</span><span style="font-weight: 400;"> properties to direct log records to different destinations for further processing.</span></p>

<h2><span style="font-weight: 400;">Routing and Multiple Outputs</span></h2>

<p><span style="font-weight: 400;">Routing records effectively using the </span><span style="font-weight: 400;">Tag</span><span style="font-weight: 400;"> and </span><span style="font-weight: 400;">Match</span><span style="font-weight: 400;"> properties is crucial in Fluent Bit. These properties allow you to direct logs to different destinations based on your specific requirements. Configuring multiple outputs ensures that your log data is processed and stored efficiently, meeting various operational and analytical needs.</span></p>

<h3><span style="font-weight: 400;">Importance of Routing Records Using Tag and Match Properties</span></h3>

<p><span style="font-weight: 400;">The </span><span style="font-weight: 400;">Tag</span><span style="font-weight: 400;"> property helps label incoming records, which can be used to route them to appropriate destinations. The </span><span style="font-weight: 400;">Match</span><span style="font-weight: 400;"> property, on the other hand, specifies which records should be processed by a particular output based on their tags.</span></p>

<h4><span style="font-weight: 400;">Example of Tagging Logs</span></h4>

<p><span style="font-weight: 400;">Assigning a tag to incoming logs:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">[</span><span style="font-weight: 400;">INPUT</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; tail</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Path&nbsp; &nbsp; &nbsp; &nbsp; /</span><span style="font-weight: 400;">var</span><span style="font-weight: 400;">/</span><span style="font-weight: 400;">log</span><span style="font-weight: 400;">/</span><span style="font-weight: 400;">app</span><span style="font-weight: 400;">/*.log</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Tag &nbsp; &nbsp; &nbsp; &nbsp; app_logs</span></p>

</td>

</tr>

</tbody>

</table>



<p><strong>Example of Matching Tags to Outputs</strong></p>

<p><span style="font-weight: 400;">Routing logs based on their tags:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[OUTPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; es</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; app_logs</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Host&nbsp; &nbsp; &nbsp; &nbsp; es-host</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"> &nbsp; </span><span style="font-weight: 400;">&nbsp;Port </span><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9200</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Index &nbsp; &nbsp; &nbsp; app_index</span></p>

</td>

</tr>

</tbody>

</table>



<p><span style="font-weight: 400;">This configuration sends logs tagged as </span><span style="font-weight: 400;">app_logs</span><span style="font-weight: 400;"> to an Elasticsearch instance for indexing.</span></p>

<h3><span style="font-weight: 400;">Configuring Multiple Outputs for Different Data Processing</span></h3>

<p><span style="font-weight: 400;">Fluent Bit allows you to define multiple output destinations, enabling you to route logs to various services for diverse processing needs. For instance, you might want to send logs to both Elasticsearch for indexing and OpenObserve for advanced analytics.</span></p>

<h4><span style="font-weight: 400;">Example Configuration for Multiple Outputs</span></h4>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[OUTPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; es</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; app_logs</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Host&nbsp; &nbsp; &nbsp; &nbsp; es-host</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"> &nbsp; </span><span style="font-weight: 400;">&nbsp;Port </span><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9200</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Index &nbsp; &nbsp; &nbsp; app_index</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">\[OUTPUT]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; http</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; app_logs</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Host&nbsp; &nbsp; &nbsp; &nbsp; openobserve-host</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"> &nbsp; </span><span style="font-weight: 400;">&nbsp;Port </span><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;443</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; URI &nbsp; &nbsp; &nbsp; &nbsp; /api/logs</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; tls &nbsp; &nbsp; &nbsp; &nbsp; On</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; tls.verify&nbsp; Off</span></p>

</td>

</tr>

</tbody>

</table>

<p>&nbsp;</p>

<p><span style="font-weight: 400;">In this example, the logs are routed to both Elasticsearch and OpenObserve. This ensures that logs are available for search and indexing in Elasticsearch while leveraging OpenObserve for real-time analytics and visualization.</span></p>

<h3><span style="font-weight: 400;">Enhance Your Log Management with OpenObserve</span></h3>

<p><span style="font-weight: 400;">Integrating Fluent Bit with OpenObserve enhances your log management capabilities significantly. OpenObserve offers robust data visualization, real-time analytics, and comprehensive log aggregation, making it a powerful addition to your log processing pipeline.</span></p>

<p><span style="font-weight: 400;">Sign Up for OpenObserve</span></p>

<p><span style="font-weight: 400;">Ready to take your log management to the next level? Sign up for a free trial of OpenObserve on our</span><a href="https://openobserve.ai/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">.</span></p>

<p><span style="font-weight: 400;">Explore OpenObserve on GitHub</span></p>

<p><span style="font-weight: 400;">Interested in setting it up yourself? Check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">.</span></p>

<p><span style="font-weight: 400;">Book a Demo</span></p>

<p><span style="font-weight: 400;">Want to see OpenObserve in action? Book a demo to learn how OpenObserve can complement your Fluent Bit configuration.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll delve into using Nest and Lift operations for adjusting log content format, discussing their configurations and limitations.</span></p>

<h2><span style="font-weight: 400;">Nest and Lift</span></h2>

<p><span style="font-weight: 400;">Adjusting the format of your log content is essential for ensuring that your data is structured in a way that suits your processing needs. Fluent Bit provides powerful tools for this through the </span><span style="font-weight: 400;">Nest</span><span style="font-weight: 400;"> and </span><span style="font-weight: 400;">Lift</span><span style="font-weight: 400;"> filters. These operations allow you to restructure your log data, making it more manageable and easier to analyze.</span></p>

<h3><span style="font-weight: 400;">Configuration for Log Content Format Adjustment Using Nest and Lift Operations</span></h3>

<h4><span style="font-weight: 400;">Nest Operation</span></h4>

<p><span style="font-weight: 400;">The </span><span style="font-weight: 400;">Nest</span><span style="font-weight: 400;"> filter groups multiple log fields into a single field. This is useful when you want to consolidate related data into a nested structure.</span></p>

<p><strong>Example Configuration for Nest Operation</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">nest</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Operation &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">nest</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Wildcard&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; instance_*</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Nest_under&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; instance</span></p>

</td>

</tr>

</tbody>

</table>



<p><span style="font-weight: 400;">In this example, any fields that start with </span><span style="font-weight: 400;">instance_</span><span style="font-weight: 400;"> are nested under a single </span><span style="font-weight: 400;">instance</span><span style="font-weight: 400;"> field. This helps in organizing the data and reducing clutter.</span></p>

<h4><span style="font-weight: 400;">Lift Operation</span></h4>

<p><span style="font-weight: 400;">The </span><span style="font-weight: 400;">Lift</span><span style="font-weight: 400;"> filter, on the other hand, can be used to flatten nested structures, bringing specific fields to the top level of the log record.</span></p>

<p><strong>Example Configuration for Lift Operation</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; nest</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Operation &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; lift</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Nested_under &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">&nbsp;instance</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Add\_prefix&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; instance\_</span></p>

</td>

</tr>

</tbody>

</table>



<p><span style="font-weight: 400;">Here, fields nested under </span><span style="font-weight: 400;">instance</span><span style="font-weight: 400;"> are lifted to the top level with a prefix </span><span style="font-weight: 400;">instance_</span><span style="font-weight: 400;">. This is useful when you need to access nested data more directly.</span></p>

<h3><span style="font-weight: 400;">Limitations and Workarounds for Complex Nesting and Lifting Scenarios</span></h3>

<p><span style="font-weight: 400;">While </span><span style="font-weight: 400;">Nest</span><span style="font-weight: 400;"> and </span><span style="font-weight: 400;">Lift</span><span style="font-weight: 400;"> are powerful, they have limitations. Complex nesting scenarios might require more intricate configurations or multiple filtering steps.</span></p>

<p><strong>Workaround Example</strong></p>

<p><span style="font-weight: 400;">For more complex data restructuring, you might need to use multiple filters sequentially:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">nest</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Operation &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">nest</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Wildcard&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; app_*</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Nest_under&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; application</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">nest</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Operation &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; lift</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Nested_under&nbsp; &nbsp; &nbsp; &nbsp; application</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Add\_prefix&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; app\_</span></p>

</td>

</tr>

</tbody>

</table>



<p><span style="font-weight: 400;">In this setup, the first filter nests fields under </span><span style="font-weight: 400;">application</span><span style="font-weight: 400;">, and the second filter lifts them back to the top level with a specific prefix, allowing for more controlled data manipulation.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore the flexibility offered by embedded filters using Lua scripting, discussing their structure and integration into Fluent Bit configurations.</span></p>

<h2><span style="font-weight: 400;">Lua Scripting</span></h2>

<p><span style="font-weight: 400;">Fluent Bit's flexibility is significantly enhanced by its ability to integrate Lua scripting. Lua scripts allow you to perform custom transformations on your log data that go beyond the built-in filters, enabling highly tailored log processing.</span></p>

<h3><span style="font-weight: 400;">Flexibility Offered by Embedded Filters Using Lua Scripting</span></h3>

<p><span style="font-weight: 400;">Lua scripting in Fluent Bit provides a powerful way to manipulate log records. You can embed Lua scripts directly into your Fluent Bit configuration, allowing for dynamic and complex data transformations. This is particularly useful for custom parsing, enrichment, or filtering that standard Fluent Bit filters cannot handle.</span></p>

<h3><span style="font-weight: 400;">Structure of a Lua Script and Its Integration into Fluent Bit Configuration</span></h3>

<h4><span style="font-weight: 400;">Creating a Lua Script</span></h4>

<p><span style="font-weight: 400;">A Lua script for Fluent Bit typically defines a function that processes log records. Here's a simple example of a Lua script that adds a new field to each log record:</span></p>

<p><strong>Example Lua Script (add_field.lua)</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">function</span> <span style="font-weight: 400;">add_field</span><span style="font-weight: 400;">(tag, timestamp, record)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; record[</span><span style="font-weight: 400;">"new_field"</span><span style="font-weight: 400;">] = </span><span style="font-weight: 400;">"new_value"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span> <span style="font-weight: 400;">1</span><span style="font-weight: 400;">, timestamp, record</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">end</span></p>

</td>

</tr>

</tbody>

</table>



<h3><span style="font-weight: 400;">Integrating Lua Script into Fluent Bit Configuration</span></h3>

<p><span style="font-weight: 400;">To use this script in your Fluent Bit configuration, you need to load the Lua filter and specify the script file and function name.</span></p>

<p><strong>Example Configuration</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[FILTER]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Name&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; lua</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; Match &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; script&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; /</span><span style="font-weight: 400;">path</span><span style="font-weight: 400;">/to/add_field.lua</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; call&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; add_field</span></p>

</td>

</tr>

</tbody>

</table>



<p><span style="font-weight: 400;">In this configuration, the </span><span style="font-weight: 400;">lua</span><span style="font-weight: 400;"> filter loads the </span><span style="font-weight: 400;">add_field.lua</span><span style="font-weight: 400;"> script and calls the </span><span style="font-weight: 400;">add_field</span><span style="font-weight: 400;"> function for each log record.</span></p>

<h3><span style="font-weight: 400;">Advises on Keeping Lua Transformations Minimal to Avoid Performance Issues</span></h3>

<p><span style="font-weight: 400;">While Lua scripts offer powerful customization options, they can also introduce performance overhead if not used carefully. Here are some tips to optimize Lua script usage in Fluent Bit:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Minimize Complexity</strong><span style="font-weight: 400;">: Keep your Lua scripts as simple as possible. Complex logic can slow down processing.</span></li>

<li style="font-weight: 400;"><strong>Avoid Excessive Calls</strong><span style="font-weight: 400;">: Try to minimize the number of times a script is called. Combine multiple transformations into a single script if feasible.</span></li>

<li style="font-weight: 400;"><strong>Monitor Performance</strong><span style="font-weight: 400;">: Regularly monitor the performance of Fluent Bit when using Lua scripts to ensure they are not negatively impacting overall processing speed.</span></li>

</ul>



<h2><span style="font-weight: 400;">Final Thoughts</span></h2>

<p><span style="font-weight: 400;">Fluent Bit is an essential tool for efficient log processing and forwarding in modern IT environments. By leveraging its powerful features&mdash;such as flexible configuration, real-time data processing, and advanced filtering&mdash;you can ensure optimal log management and monitoring.</span></p>

<p><span style="font-weight: 400;">However, to truly maximize the value of your log data, integrating Fluent Bit with OpenObserve can take your observability to the next level. OpenObserve's capabilities in real-time data ingestion, advanced visualization, unified log aggregation, and comprehensive analytics provide a robust solution that complements Fluent Bit perfectly. This integration not only enhances your monitoring and troubleshooting efforts but also ensures you maintain high system performance and reliability.</span></p>

<p><span style="font-weight: 400;">Ready to enhance your log processing setup with OpenObserve? Sign up for a free trial on our</span><a href="https://openobserve.ai/"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, explore our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or book a </span><a href="https://openobserve.ai/contactus"><span style="font-weight: 400;">demo </span></a><span style="font-weight: 400;">to see OpenObserve in action. By combining Fluent Bit with OpenObserve, you can unlock deeper insights and achieve seamless, efficient log management.</span></p>
