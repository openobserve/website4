---
title: Monitor and Receive Host Metrics with OpenTelemetry
seoTitle: Monitor and Receive Host Metrics with OpenTelemetry
description: "Explore OpenTelemetry's Host Metrics Receiver: Learn prerequisites
  for installation, configuration nuances, and metrics exporting guidelines."
img: /img/resources/host-metrics-receiver-image1.png
alt: Host Metrics Receiver
slug: host-metrics-receiver-opentelemetry
authors:
  - openobserve-team
publishDate: 2024-07-18
tags:
  - Host Metrics Receiver
  - OpenTelemetry
  - system monitoring
  - telemetry data collection
  - performance monitoring
---
<h2>Introduction to Host Metrics Monitoring with OpenTelemetry</h2>

<p>
Imagine peeking under the hood of your car's engine while it's running. That's what host metrics monitoring is like for your computer system!
</p>
<p>

![Introduction to Host Metrics Monitoring with OpenTelemetry](/img/resources/host-metrics-receiver-image2.png "Introduction to Host Metrics Monitoring with OpenTelemetry")

</p>
<p>
<a href="https://openobserve.ai/">Image Credit</a>
</p>
<p>
Host metrics monitoring is a crucial aspect of ensuring the health and performance of systems. OpenTelemetry is a powerful tool that provides a comprehensive framework for collecting and processing telemetry data, including host metrics. In this article, we will explore the capabilities of OpenTelemetry for host metrics monitoring, the importance of monitoring host metrics, and the role of the OpenTelemetry Collector in gathering telemetry data.
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>.
</p>
<h3>Overview of Host Metrics Monitoring Capabilities in OpenTelemetry</h3>

<p>
OpenTelemetry provides a robust set of features for collecting and processing host metrics. The OpenTelemetry Collector is an agent that gathers telemetry data from various sources, including hosts and sends it to a central location for analysis. The Collector supports multiple protocols and formats, making it a versatile tool for integrating with various systems.
</p>
<h3>Importance of Monitoring Host Metrics for System Health and Performance</h3>

<p>
Monitoring host metrics is essential for ensuring the health and performance of systems. Host metrics provide valuable insights into system resource utilization, disk space, memory usage, and network activity. By monitoring these metrics, system administrators can identify potential issues before they become critical and take proactive measures to prevent downtime.
</p>
<h3>Role of OpenTelemetry Collector as an Agent for Gathering Telemetry Data</h3>

<p>
The OpenTelemetry Collector plays a crucial role in gathering telemetry data from hosts. It acts as an agent that collects data from various sources, including hosts, and sends it to a central location for analysis. The Collector supports multiple protocols and formats, making it a versatile tool for integrating with various systems.
</p>
<p>
In the next section, you will learn the basics of starting with OpenTelemetry.
</p>
<h2>Getting Started with OpenTelemetry for Host Metrics</h2>

<p>
To start with OpenTelemetry for host metrics, you must install the OpenTelemetry Collector on your hosts. Here are the prerequisites for installing the Collector:
</p>
<ul>

<li>Operating System: The Collector supports various operating systems, including Linux and Windows.

<li>Network Connectivity: The Collector requires network connectivity to send telemetry data to a central location.

<li>Configuration File: The Collector requires a configuration file that specifies the metrics to collect and the destination for the data.
</li>
</ul>
<p>
In the next section, you will understand the steps required to deploy and configure the OpenTelemetry Collector.
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>.
</p>
<h2>Step-by-Step Guide for Deploying and Configuring OpenTelemetry Collector</h2>

<p>
Here is a step-by-step guide for deploying and configuring the OpenTelemetry Collector:
</p>
<h3>Install the Collector</h3>

<p>
To install the OpenTelemetry Collector, you can use your operating system's package manager or download the binary. The language used is bash.
</p>
<h4>Using Package Manager (For Linux and macOS)</h4>

<p>
Install using apt (Ubuntu-based systems):
</p>

<pre class="prettyprint">sudo apt-get install opentelemetry-collector</pre>

<h4>Install using yum (RHEL-based systems):</h4>

<pre class="prettyprint">sudo yum install opentelemetry-collector</pre>

<h4>Install using pip (Python-based systems):</h4>

<pre class="prettyprint">pip install opentelemetry-collector</pre>

<h3>Configure the Collector</h3>

<p>
To configure the Collector, create a configuration file that specifies the metrics to collect and the destination for the data.
</p>
<h4>Example Configuration File</h4>

<p>
Here is an example configuration file for the OpenTelemetry Collector:
</p>
<p>
yaml
</p>
<h4>Configuration file for OpenTelemetry Collector</h4>

<ul>

<li>Receiver configuration
</li>
</ul>
<p>
receivers:
</p>

<pre class="prettyprint">  - type: hostmetrics
    hostmetrics:
      # Metrics to collect
      metrics:
        - cpu
        - memory
        - disk
        - network</pre>

<ul>

<li>Exporter configuration
</li>
</ul>
<p>
exporters:
</p>

<pre class="prettyprint">  - type: console
    console:
      # Output format
      format: json</pre>

<ul>

<li>Collector configuration
</li>
</ul>
<p>
collector:
</p>
<p>
  # Service name
</p>

<pre class="prettyprint">  service_name: "mycollector"</pre>

<p>
  # Service version
</p>

<pre class="prettyprint">  service_version: "1.0.0"</pre>

<p>
Start the Collector
</p>
<p>
To start the Collector service, use the following command:
</p>
<h4>Using Service Manager (For Linux and macOS)</h4>

<ul>

<li>Start using systemd (Ubuntu-based systems):

<pre class="prettyprint">sudo systemctl start opentelemetry-collector</pre>

</li>
</ul>
<ul>

<li>Start using systemctl (RHEL-based systems):

<pre class="prettyprint">sudo systemctl start opentelemetry-collector</pre>

</li>
</ul>
<h3>Default Metrics Collected by the Host Metrics Receiver</h3>

<p>
The Host Metrics Receiver collects a range of default metrics, including:
</p>
<ul>

<li>CPU Utilization: The percentage of CPU utilization.

<li>Memory Usage: The amount of memory used by the system.

<li>Disk Space: The amount of free disk space available.

<li>Network Activity: The amount of network activity.
</li>
</ul>
<p>
In the next section you will learn about requirements and codes to configure host metrics receivers.
</p>
<h2>Configuring Host Metrics Receiver</h2>

<p>
Here are some configuration options for the Host Metrics Receiver:
</p>
<ul>

<li>Mounting the Host File System: You can mount the host file system to collect metrics from specific directories.

<li>Configuring Scrapers: You can configure scrapers to collect specific metrics, such as CPU utilization or memory usage.

<li>Collection Interval: You can specify the collection interval for the metrics.
</li>
</ul>
<p>
Example Configuration File
</p>
<p>
Here is an example configuration file that combines these options:
</p>
<p>
yaml
</p>
<p>
# Configuration file for OpenTelemetry Collector
</p>
<p>
# Receiver configuration
</p>

<pre class="prettyprint">receivers:
  - type: hostmetrics
    hostmetrics:
      # Mount the host file system
      mount:
        - path: /path/to/directory
          type: directory
      # Metrics to collect
      metrics:
        - cpu
        - memory
        - disk
        - network
      # Collection interval
      interval: 10s</pre>

<p>
Running the Collector
</p>
<p>
To run the Collector with this configuration, use the following command:
</p>
<p>
bash
</p>

<pre class="prettyprint">opentelemetry-collector --config /path/to/config.yaml</pre>

<p>
This command starts the Collector with the specified configuration file.
</p>
<p>
The next section deals with scraper configurations.
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<h2>Scraper Configurations</h2>

<p>
Here are some scraper configurations for the Host Metrics Receiver:
</p>
<ul>

<li>Disk Scraper: The Disk Scraper collects metrics related to disk space and usage.

<li>File System Scraper: The File System Scraper collects metrics related to file system usage and disk space.

<li>Network Scraper: The Network Scraper collects metrics related to network activity.

<li>Process Scraper: The Process Scraper collects metrics related to process usage and memory usage.
</li>
</ul>
<p>
Here is an example configuration that combines the Disk, File System, Network, and Process scrapers for the Host Metrics Receiver:
</p>

<pre class="prettyprint">yaml
receivers:
  hostmetrics:
    collection_interval: 10s
    scrapers:
      # Disk I/O metrics
      disk:
        include:
          devices: 
            - sda
            - sdb
        exclude:
          devices:
            - loop0
            - loop1
      # File System utilization metrics  
      filesystem:
        include_fs_types:
          match_type: strict
          fs_types:
            - ext4
            - xfs
        exclude_mount_points:
          match_type: regexp
          mount_points:
            - ^/snap/.*$
            - ^/var/lib/docker/.*$
      # Network interface I/O metrics & TCP connection metrics
      network:
        include:
          interfaces:
            - eth0
            - eth1
        exclude:
          interfaces:
            - lo
      # Per process CPU, Memory, and Disk I/O metrics
      processes:
        include:
          names:
            - ^node$
            - ^java$
        exclude:
          names:
            - ^kube-proxy$
            - ^fluentd$</pre>

<p>
This configuration:
</p>
<ul>

<li>Sets the collection interval to 10 seconds

<li>Includes disk metrics for devices sda and sdb, excluding loop0 and loop1

<li>Includes file system metrics for ext4 and xfs file systems, excluding mount points matching /snap/.\* and /var/lib/docker/.\*

<li>Includes network metrics for interfaces eth0 and eth1, excluding lo

<li>Includes process metrics for processes named node and java, excluding kube-proxy and fluentd

<li>The include and exclude options allow you to specify which devices, file systems, interfaces, and processes to collect metrics for. This provides flexibility to focus on the most relevant metrics for your environment.
</li>
</ul>
<p>
In the next section you will check some advanced configuration opens
</p>
<h2>Advanced Configuration</h2>

<p>
Here are some advanced configuration options for the Host Metrics Receiver:
</p>
<p>
Handling Unusual File Systems: You can configure the Collector to handle unusual file systems, such as network file systems.
</p>
<p>
Collecting Per-Process Metrics: You can configure the Collector to collect per-process metrics, such as CPU utilization and memory usage.
</p>
<p>
Resource Detection Processor: The Resource Detection Processor sets resource attributes for the metrics.
</p>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<h2>Example Configuration File</h2>

<p>
Here is an example configuration file that combines these advanced configuration options:
</p>

<pre class="prettyprint">yaml
receivers:
  hostmetrics:
    collection_interval: 10s
    scrapers:
      filesystem:
        include_fs_types:
          match_type: strict
          fs_types:
            - nfs
            - cifs
        exclude_mount_points:
          match_type: regexp
          mount_points:
            - ^/mnt/.*$
      processes:
        include:
          names:
            - ^node$
            - ^java$
        exclude:
          names:
            - ^kube-proxy$
            - ^fluentd$
        metrics:
          - cpu
          - memory
        resource_detection:
          - cpu:
              - name: cpu
              - value: 2
          - memory:
              - name: memory
              - value: 4</pre>

<p>
This configuration:
</p>
<ul>

<li>Handles unusual file systems like NFS and CIFS

<li>Collects per-process metrics for processes named node and java, excluding kube-proxy and fluentd

<li>Sets resource attributes for CPU and memory metrics
</li>
</ul>
<p>
The next section provides details on metrics and exporting.
</p>
<h2>Metrics Detail</h2>

<p>
Here are some details about the metrics collected by the Host Metrics Receiver:
</p>
<ul>

<li>CPU Metrics: The Collector collects CPU metrics, including CPU utilization and CPU usage.

<li>Memory Metrics: The Collector collects memory metrics, including memory usage and memory usage percentage.

<li>Disk Metrics: The Collector collects disk metrics, including disk space and disk usage.

<li>Network Metrics: The Collector collects network metrics, including network activity and network usage.
</li>
</ul>
<h3>Example Configuration File</h3>

<p>
Here is an example configuration file that combines these metrics and exporting options:
</p>

<pre class="prettyprint">yaml
receivers:
  hostmetrics:
    collection_interval: 10s
    scrapers:
      cpu:
        include:
          devices: 
            - cpu0
            - cpu1
        exclude:
          devices:
            - cpu2
            - cpu3
      memory:
        include:
          devices: 
            - mem0
            - mem1
        exclude:
          devices:
            - mem2
            - mem3
      disk:
        include:
          devices: 
            - disk0
            - disk1
        exclude:
          devices:
            - disk2
            - disk3
      network:
        include:
          interfaces: 
            - eth0
            - eth1
        exclude:
          interfaces:
            - lo
    exporters:
      - type: file
        file:
          path: /path/to/metrics.log
          format: json</pre>

<p>
This configuration:
</p>
<ul>

<li>Collects CPU metrics for devices cpu0 and cpu1, excluding cpu2 and cpu3

<li>Collects memory metrics for devices mem0 and mem1, excluding mem2 and mem3

<li>Collects disk metrics for devices disk0 and disk1, excluding disk2 and disk3

<li>Collects network metrics for interfaces eth0 and eth1, excluding lo

<li>Exports the collected metrics to a file at /path/to/metrics.log in JSON format
</li>
</ul>
<p>
The next section deals with some exporters that support the OpenTelemetry Collector.
</p>
<h2>Exporters for Collected Metrics</h2>

<p>
The Collector supports various exporters for sending the collected metrics to different destinations. Here are some exporters supported by the Collector:
</p>
<ul>

<li>OpenObserve is a popular open-source platform for all your OpenTelemetry data solutions

<li>Uptrace is a popular exporter for OpenTelemetry data.

<li>Google Cloud Operations is a cloud-based exporter for OpenTelemetry data.

<li>Splunk Observability Cloud is a cloud-based exporter for OpenTelemetry data.
</li>
</ul>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<p>
In the next section, you will learn about the steps you can take for troubleshooting issues.
</p>
<h2>Troubleshooting and Support</h2>

<p>
Here are some troubleshooting steps for common issues with the Host Metrics Receiver:
</p>
<p>
Common Issues
</p>
<h3>Network Connectivity Problems</h3>

<ul>

<li>Check the network connectivity between the Collector and the host system.

<li>Ensure that the Collector has the necessary permissions to access the host system.

<li>Verify that the Collector is configured to use the correct network interface.
</li>
</ul>
<h3>Configuration Errors</h3>

<ul>

<li>Review the Collector configuration file for any errors or inconsistencies.

<li>Ensure that the Collector is configured to collect the correct metrics and scrape the correct sources.

<li>Verify that the Collector is configured to use the correct pipeline and exporter.
</li>
</ul>
<h3>Documentation</h3>

<ul>

<li>Refer to the OpenTelemetry Collector documentation for detailed information on configuration and troubleshooting.

<li>Consult the OpenObserve Observability Cloud documentation for specific information on the Host Metrics Receiver.
</li>
</ul>
<p>
<a href="https://openobserve.ai/docs/ingestion/traces/opentelemetry/">OpenTelemetry - OpenObserve Documentation</a>
</p>
<h3>Community Support</h3>

<ul>

<li>Join the OpenTelemetry community for support and discussion.

<li>Post questions and issues on the OpenTelemetry GitHub page.
</li>
</ul>
<p>
<a href="https://github.com/openobserve/openobserve">OpenObserve - GitHub</a>
</p>
<p>
Troubleshooting Tools:
</p>
<ul>

<li>Use the Collector's built-in debugging tools to troubleshoot issues.

<li>Use the curl command to query the Collector for raw data and verify that metrics are being collected correctly.
</li>
</ul>
<p>
Support Bundles:
</p>
<ul>

<li>Use the support bundle script to capture and analyze the Collector's configuration and logs.

<li>Refer to the Observability Cloud documentation for information on creating and using support bundles.
</li>
</ul>
<p>
<a href="https://openobserve.ai/docs/ingestion/traces/opentelemetry/">OpenTelemetry - OpenObserve Documentation</a>
</p>
<p>
APM Integration:
</p>
<ul>

<li>Ensure that the Collector is configured to send metrics to the APM service.

<li>Verify that the Collector is configured to use the correct pipeline and exporter for APM integration.
</li>
</ul>
<p>
Example Configuration File
</p>
<p>
Here is an example configuration file that may help:
</p>

<pre class="prettyprint">yaml
receivers:
  hostmetrics:
    collection_interval: 10s
    scrapers:
      cpu:
        include:
          devices: 
            - cpu0
            - cpu1
        exclude:
          devices:
            - cpu2
            - cpu3
      memory:
        include:
          devices: 
            - mem0
            - mem1
        exclude:
          devices:
            - mem2
            - mem3
      disk:
        include:
          devices: 
            - disk0
            - disk1
        exclude:
          devices:
            - disk2
            - disk3
      network:
        include:
          interfaces: 
            - eth0
            - eth1
        exclude:
          interfaces:
            - lo
    processors:
      - type: resourcedetection
        detectors: [env, system]
      - type: batch
    exporters:
      - type: otlp
        endpoint: "http://localhost:55678"
    pipelines:
      - type: metrics
        receivers: [hostmetrics]
        processors: [resourcedetection, batch]
        exporters: [otlp]</pre>

<p>
This configuration:
</p>
<ul>

<li>Collects CPU, memory, disk, and network metrics from the host system.

<li>Uses the resourcedetection processor to detect and set resource attributes.

<li>Uses the batch processor to aggregate and transform metrics.

<li>Exports metrics to the OpenTelemetry protocol (OTLP) endpoint.

<li>Uses the metrics pipeline to process and export metrics.
</li>
</ul>
<h2>What are the benefits of using OpenObserve for host metrics monitoring</h2>

<p>
OpenObserve can help in monitoring and receiving host metrics with OpenTelemetry by providing a comprehensive platform for collecting, processing, and analyzing telemetry data from various sources. 
</p>
<p>
Here are some ways OpenObserve can assist:
</p>
<ul>

<li>Host Metrics Collection: OpenObserve can collect host metrics such as CPU, RAM, disk, and network metrics from the host system, providing valuable insights into the performance and health of the system.

<li>Resource Detection: OpenObserve can automatically detect and set resource attributes for telemetry data, such as application name, version, environment, host name, and more, helping to identify the source of the data.

<li>Data Processing: OpenObserve can process and transform telemetry data, aggregating, filtering, and enriching it as it flows through the system, making it easier to analyze and visualize.

<li>Exporting Metrics: OpenObserve can export metrics to various destinations, such as Google Cloud Operations, Splunk Observability Cloud, or other monitoring platforms, allowing for seamless integration with existing monitoring tools.

<li>Container Host Metrics: OpenObserve can collect metrics from containerized environments, such as Docker, by mounting the host filesystem and configuring the root_path in the OpenTelemetry Collector configuration.

<li>Security and Authentication: OpenObserve can handle authentication and authorization for accessing telemetry data, ensuring secure and controlled access to sensitive information.

<li>Support and Troubleshooting: OpenObserve provides extensive documentation, community support, and troubleshooting tools to help resolve any issues that may arise during the monitoring and receiving of host metrics.
</li>
</ul>
<p>
<a href="https://cloud.openobserve.ai">Get started for FREE with OpenObserve</a>
</p>
<ul>

<li>OpenObserve Website: 
<ul>
 
<li><a href="https://openobserve.ai/">OpenObserve</a>
</li> 
</ul>

<li>OpenObserve Article: 
<ul>
 
<li><a href="https://medevel.com/openobserve/">OpenObserve: The Ultimate Open-Source Platform for Log and ...</a>
</li> 
</ul>

<li>OpenObserve About Us: 
<ul>
 
<li><a href="https://openobserve.ai/about/">About Us | Open Source Observability Platform for Logs, Metrics, Traces ...</a>
</li> 
</ul>

<li>OpenObserve Documentation: 
<ul>
 
<li><a href="https://openobserve.ai/docs/">OpenObserve Documentation</a>
</li> 
</ul>

<li>OpenObserve GitHub Repository: 
<ul>
 
<li><a href="https://github.com/openobserve">OpenObserve - GitHub</a>
</li> 
</ul>
</li> 
</ul>
<h2>Conclusion</h2>

<p>
In conclusion, OpenTelemetry provides a comprehensive framework for collecting and processing host metrics. The OpenTelemetry Collector is a powerful tool that gathers telemetry data from various sources, including hosts, and sends it to a central location for analysis. By following the steps outlined in this article, you can effectively monitor and receive host metrics with OpenTelemetry.
</p>
<p>
Also, by leveraging OpenObserve, you can streamline your monitoring and receiving of host metrics with OpenTelemetry, gaining valuable insights into your system's performance and health.
</p>
<h2>Further Web Resources</h2>

<p>
<a href="https://observiq.com/blog/how-to-monitor-host-metrics-with-opentelemtry/">How to Monitor Host Metrics with OpenTelemetry</a>
</p>
<p>
<a href="https://openobserve.ai/docs/telemetry/">Telemetry - OpenObserve Documentation</a>
</p>
<p>
<a href="https://uptrace.dev/opentelemetry/collector-host-metrics.html">OpenTelemetry Host Metrics receiver</a>
</p>
<p>
<a href="https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md">Host Metrics Receiver</a>
</p>
<p>
<a href="https://opentelemetry.io/blog/2023/any-metric-receiver/">Receive any custom metric with the OpenTelemetry Collector</a>
</p>
<h2>YouTube Resources</h2>

<p>
<a href="https://www.youtube.com/watch?v=Txe4ji4EDUA">How to Get Started with OpenTelemetry</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=nFU-hcHyl2s">Getting Started with OpenTelemetry in .NET</a><br><a href="https://www.youtube.com/watch?v=fZ-ErfMdF-o">OpenObserve Introduction</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=MqQd4ZM6SRc">How to Create Custom metrics with OpenTelemetry</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=GAi_3Bgwa64">Configuring Your OpenTelemetry Collector</a>
</p>
