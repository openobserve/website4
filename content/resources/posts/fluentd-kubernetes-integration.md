---
title: "Fluentd and Kubernetes: How they work together"
seoTitle: "Fluentd and Kubernetes: How they work together"
description: The synergy between Fluentd and Kubernetes enables enhanced
  monitoring and efficient management of containerized workloads.
img: /img/resources/fluentd-image1.png
alt: fluentd
slug: fluentd-kubernetes-integration
authors:
  - openobserve-team
publishDate: 2024-07-18
tags:
  - fluentd
  - Kubernetes
  - containerized workloads
  - log management
  - data collection
---
<p>
Ever feel like your containerized apps are drowning you in logs? Struggling to manage and monitor them so your services run smoothly? You’re not alone. Kubernetes’ rapid deployment and scaling capabilities are amazing but bring new log management challenges. That’s where Fluentd comes in. Imagine a system where all your logs are collected, transformed, and analyzed for you, and you get clear visibility into your apps’ performance and behavior. That’s what happens when Fluentd and Kubernetes work together. Let’s dive in and see how this combo can change your logging and monitoring game.
</p>
<h2><strong>What is Fluentd</strong></h2>

<p>
Fluentd is an open-source data collector designed to unify and layer data collection and consumption for better use and understanding by transforming, filtering, and routing log data. It decouples your data sources from your backends, so you can handle log data. With its lightweight architecture and plugin-based design, Fluentd is flexible and extensible, so it’s the go-to tool for log management.
</p>
<h2><strong>What is Kubernetes</strong>


![What is Kubernetes](/img/resources/fluentd-image2.png "What is Kubernetes")


</h2>

<p>
Kubernetes is an open-source platform to automate the deployment, scaling, and operation of containerized applications. It abstracts the underlying infrastructure, so you can focus on building and managing your applications without worrying about the infrastructure. Kubernetes manages your containers, so they run reliably and scale as needed.
</p>
<p>
Now that we understand what Kubernetes does, let's see how it works with Fluentd to supercharge your logging.
</p>
<h2><strong>Fluentd and Kubernetes</strong></h2>

<p>
Fluentd and Kubernetes together enhance your log management capabilities for your containerized services, providing structured log data that can be used for better monitoring and troubleshooting. Fluentd collects logs from various parts of your Kubernetes cluster, transforms them into structured data, and routes them to your preferred storage or analysis backend. This combination gives you a complete logging solution that scales with your applications, so you have the insights to manage and optimize your services.
</p>
<h2><strong>How Fluentd Works with Kubernetes</strong></h2>

<p>

![How Fluentd Works with Kubernetes](/img/resources/fluentd-image3.jpg "How Fluentd Works with Kubernetes")

</p>
<h3><strong>Deployment Method: DaemonSet</strong></h3>

<p>
In Kubernetes, Fluentd is usually deployed as a DaemonSet. This ensures a Fluentd instance runs on every node in your cluster and collects logs from all the containers. This way you get complete log coverage and centralized management.
</p>
<h3><strong>What Fluentd does in Log Collection, Transformation, and Redirection</strong></h3>

<p>
Fluentd’s role in a Kubernetes environment is to collect logs from different sources, transform them into a structured format like JSON, and redirect them to different destinations. This could be a log analytics service, a storage system, or any other log processing tool. By structuring logs, Fluentd makes it easier to search, visualize, and analyze your application logs.
</p>
<h3><strong>Convert logs to structured JSON</strong></h3>

<p>
Fluentd can convert logs into structured JSON. Structured data is key for analysis and storage so you can get insights fast and make decisions about your application's performance and health.
</p>
<h3><strong>Key Advantages of Fluentd's Lightweight, Plugin-Oriented Architecture</strong></h3>

<p>
Fluentd’s architecture is designed to be lightweight and highly extensible. Its plugin system allows you to customize and extend its functionality easily. This is particularly advantageous in Kubernetes clusters, where resource efficiency and the ability to handle diverse logging needs are paramount.
</p>
<h2><strong>Setting up Fluentd in a Kubernetes Cluster</strong></h2>

<h3><strong>DaemonSet Deployment</strong></h3>

<p>
You deploy Fluentd as a DaemonSet. This ensures Fluentd runs on every node, collecting logs from all your pods. The fluent/fluentd-kubernetes-daemonset repository has the deployment files and container images to make this easy.
</p>
<h3><strong>Config Management with ConfigMaps and Tags</strong></h3>

<p>
ConfigMaps makes Fluentd configuration management easy. You define Fluentd’s configuration in ConfigMaps and manage log routing and other settings. Fluentd tags identify and manage logs, helping you route them based on various configurations, such as source and type.
</p>
<h3><strong>Using the tail Plugin</strong></h3>

<p>
The tail plugin is a popular choice for collecting logs from Kubernetes pods. It reads log files from containers and processes them for further transformation and routing. The tail plugin is highly configurable, offering options to handle log rotation, multiline log entries, and customizable log parsing to fit your logging needs.
</p>
<h3><strong>fluent/fluentd-kubernetes-daemonset</strong></h3>

<p>
For easy deployment, check out the fluent/fluentd-kubernetes-daemonset GitHub repository. It offers deployment files, container images, configuration templates, and guides to get Fluentd running in your Kubernetes cluster efficiently.
</p>
<h2><strong>Understanding Fluentd Plugins</strong></h2>

<h3><strong>Input and Output Plugins</strong></h3>

<p>
Fluentd is all about plugins. Input plugins collect data and output plugins send data. This modularity lets you build a logging pipeline that suits you.
</p>
<h3><strong>Collecting Logs from Various Sources</strong></h3>

<p>
Fluentd has many input plugins, including Tail, HTTP, and Syslog. These plugins let you collect logs from everywhere so you don’t miss anything.
</p>
<h3><strong>Sending Logs to 3rd Party Solutions</strong></h3>

<p>
Output plugins let Fluentd send logs to 3rd party solutions like Kafka, Elasticsearch, and many more. This lets you integrate Fluentd with your existing log management and analysis tools easily.
</p>
<h3><strong>Using Community Plugins</strong></h3>

<p>
The Fluentd community has built many plugins. Using these community plugins can add to your Fluentd setup and integrate with more systems.
</p>
<h2><strong>Optimizing Fluentd Performance in Kubernetes</strong></h2>

<h3><strong>Tips for Efficient Data Processing</strong></h3>

<p>
Don’t overcomplicate your config. Simplify your data processing pipelines to reduce CPU and memory usage.
</p>
<h3><strong>Use of Multi-Processing and Tuning Ruby GC Parameters</strong></h3>

<p>
Fluentd can be faster with multi-processing and Ruby’s GC tuning. This helps to manage CPU load and memory usage so Fluentd can run smoothly under heavy log traffic.
</p>
<h3><strong>Best Practices for Streamlined Fluentd Configuration</strong></h3>

<p>
Follow best practices for Fluentd config. Minimize complex filters and parsers, use good buffering, and review and optimize your config regularly.
</p>
<h2><strong>Advanced Fluentd Functions</strong></h2>

<h3><strong>Log Parsing with Regex</strong></h3>

<p>
Fluentd’s log parsing capabilities are powerful, enabling the extraction of meaningful information from complex log entries using tools like regex. For example, collecting logs from HAProxy ingress controllers and using regex for parsing can give you deep insights into your traffic and application behavior.
</p>
<h3><strong>Structuring Log Stream Pipelines</strong></h3>

<p>
Log manipulation is all about structuring your log stream pipelines. So that logs are processed and routed properly, so you can test outputs and refine your logging strategy.
</p>
<h3><strong>Integration with Monitoring Platforms</strong></h3>

<p>
Integrating Fluentd with monitoring platforms like LogicMonitor enhances your log analysis capabilities. This allows you to correlate log data with other metrics, providing a comprehensive view of your application’s health and performance.
</p>
<h2><strong>Community and Support</strong></h2>

<h3><strong>The Role of the Open-Source Community</strong></h3>

<p>
The open-source community plays a crucial role in supporting Fluentd. Contributions from developers worldwide help improve the tool, add new features, and fix bugs, ensuring Fluentd remains a robust and reliable logging solution.
</p>
<h3><strong>Resources for Troubleshooting and Optimizing Fluentd</strong></h3>

<p>
There are many resources for troubleshooting and optimization. Community forums, GitHub repositories, and official documentation are helpful for resolving issues and for your Fluentd deployment.
</p>
<h3><strong>Official Documentation and Community Forums</strong></h3>

<p>
Official documentation is the best place to learn about Fluentd features and configurations. Community forums are also good places to ask, share, and learn from other Fluentd users.
</p>
<p>
Here’s some additional resource:<a href="https://openobserve.ai/blog/how-to-send-kubernetes-logs-using-fluent-bit"> Harnessing the Power of FluentBit to Stream Kubernetes Logs to OpenObserve!</a>
</p>
<p>
With all these resources at your fingertips, you’re now fully equipped to make Fluentd and Kubernetes an integral part of your logging and monitoring strategy.
</p>
<h2><strong>Conclusion</strong></h2>

<p>
Fluentd with Kubernetes gives you a robust and scalable logging solution to monitor and manage your containerized applications. Fluentd’s flexibility and extensibility through its plugin ecosystem allow you to customize your logging infrastructure to your needs. Structured logging by Fluentd is particularly useful as it converts raw log data into a format that is easy to analyze and understand and gives you better operational insights and faster issue resolution.
</p>
<p>
<strong>Ready to take your observability to the next level? <a href="https://cloud.openobserve.ai/">OpenObserve </a>offers advanced monitoring and analytics tools, so you can achieve unparalleled observability and operational excellence in your containerized environments.</strong>
</p>
