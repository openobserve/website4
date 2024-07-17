---
title: Monitoring for Azure Kubernetes Service Cluster
seoTitle: Monitoring for Azure Kubernetes Service Cluster
description: AKS monitoring ensures smooth operation and performance of AKS
  clusters, using tools like Azure Monitor and Container Insights.
img: /img/resources/aks-monitoring-image1.png
alt: aks monitoring
slug: aks-monitoring-azure-service
authors:
  - openobserve-team
publishDate: 2024-07-18
tags:
  - aks monitoring
  - Azure Kubernetes Service
  - AKS cluster performance
  - Azure Monitor
  - Container Insights
---
<h2>Introduction to AKS Monitoring</h2>

<p>
Running containerized applications on Azure Kubernetes Service (AKS) offers agility and scalability, but ensuring their smooth operation requires vigilance. Here's where AKS monitoring comes in – a comprehensive approach to overseeing your AKS clusters.
</p>
<p>

![Introduction to AKS Monitoring](/img/resources/aks-monitoring-image2.png "Introduction to AKS Monitoring")

</p>
<p>
<a href="https://learn.microsoft.com/en-us/azure/aks/monitor-aks">Image Credit</a>
</p>
<p>
AKS monitoring is the process of collecting, analyzing, and acting on telemetry data from Azure Kubernetes Service (AKS) clusters to ensure their performance, security, and reliability.
</p>
<p>
The process typically includes vulnerability scanning, performance monitoring, and troubleshooting to identify and address potential issues before they impact applications.
</p>
<h3>Importance of AKS Cluster Monitoring </h3>

<ul>

<li>Performance Insights: Monitoring helps gain visibility into the performance of AKS clusters, including resource utilization, node performance, and pod health, enabling identification and addressing of performance bottlenecks.

<li>Resource Optimization: Monitoring helps identify underutilized resources and optimize node scaling, reducing costs and improving resource efficiency.

<li>Troubleshooting: Monitoring provides detailed logs and metrics, making it easier to troubleshoot issues, diagnose errors, and ensure the overall health of applications running on AKS.

<li>Security and Compliance: Monitoring helps detect and respond to security threats and compliance violations by providing insights into activities and changes within AKS clusters.
</li>
</ul>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<h3>Overview of Tools and Services Used for AKS Monitoring</h3>

<ul>

<li>Azure Monitor: Azure Monitor is a comprehensive monitoring solution that provides insights into the performance, health, and activity of AKS clusters. It includes features like metric data collection, log analysis, and alerting.

<li>Container Insights: Container Insights is a monitoring solution for AKS clusters that provides detailed insights into container performance, resource utilization, and other metrics.

<li>Azure Log Analytics: Azure Log Analytics is a log analysis service that helps monitor and troubleshoot AKS clusters by providing detailed logs and metrics.
</li>
</ul>
<p>
AKS monitoring is crucial for ensuring the smooth operation and performance of AKS clusters. It involves collecting, analyzing, and acting on telemetry data from AKS clusters to identify and address potential issues. Azure Monitor, Container Insights, and Azure Log Analytics are key tools and services used for AKS monitoring.
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<p>
In the following section, you will learn how to set up monitoring for AKS.
</p>
<h2>Setting Up Monitoring for AKS</h2>

<p>
Monitoring is a crucial aspect of managing and maintaining your Azure Kubernetes Service (AKS) clusters. Azure provides robust monitoring capabilities through Azure Monitor and Azure Log Analytics, allowing you to gain insights into the performance, health, and activity of your AKS clusters. In this section, we will explore the essential steps for setting up monitoring for AKS clusters.
</p>
<p>
<a href="https://github.com/openobserve">Join OpenObserve - GitHub</a>
</p>
<h3>Types of Supported Clusters</h3>

<p>
Azure Monitor supports two types of clusters:
</p>
<ul>

<li>AKS Clusters: These are the standard AKS clusters that are managed by Azure.

<li>Arc-enabled Kubernetes Clusters: These are clusters that are managed by Azure Arc, which provides a managed service for Kubernetes clusters.
</li>
</ul>
<h3>Prerequisites for Enabling Monitoring</h3>

<p>
Before enabling monitoring for your AKS clusters, you need to ensure that you have the necessary permissions and workspaces set up.
</p>
<ul>

<li>Permissions: You need to have at least Contributor access to the cluster for onboarding.

<li>Required Workspaces: You need to have a Log Analytics workspace set up for storing monitoring data.
</li>
</ul>
<h3>Steps to Enable Prometheus Metrics Scraping and Grafana for Visualizations</h3>

<p>
To enable Prometheus metrics scraping and Grafana for visualizations, follow these steps:
</p>
<ul>

<li>Enable Prometheus Metrics Scraping: Use the Azure CLI command 
<p>

```
az aks enable-addons --addon monitoring --name &lt;cluster-name> --resource-group &lt;cluster-resource-group-name> 
```

</p>
</li>
</ul>
<ul>

<li>Enable Grafana: Use the Azure CLI command 
<p>

```
az aks enable-addons --addon monitoring --name &lt;cluster-name> --resource-group &lt;cluster-resource-group-name> --grafana-resource-id &lt;grafana-workspace-name-resource-id> 
```

</p>
</li>
</ul>
<h3>Full Monitoring through the Azure Portal</h3>

<p>
To enable full monitoring through the Azure portal for new and existing AKS clusters, follow these steps:
</p>
<ul>

<li>New Clusters: Use the Azure portal to create a new AKS cluster and enable monitoring during the creation process.

<li>Existing Clusters: Use the Azure portal to enable monitoring for an existing AKS cluster by navigating to the cluster's "Monitoring" section and selecting "Enable Monitoring".
</li>
</ul>
<p>
<a href="https://github.com/openobserve">Join OpenObserve - GitHub</a>
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<h3>Monitoring Approaches for Windows vs. Linux Clusters</h3>

<p>
The monitoring approach for Windows and Linux clusters differs in the following ways:
</p>

<table>
  <tr>
   <td><strong>Metric</strong>
   </td>
   <td><strong>Windows Clusters</strong>
   </td>
   <td><strong>Linux Clusters</strong>
   </td>
  </tr>
  <tr>
   <td>Node Performance
   </td>
   <td>Use win_node_performance metric to monitor node CPU usage, memory usage, and disk usage
   </td>
   <td>Use node_performance metric to monitor node CPU usage, memory usage, and disk usage
   </td>
  </tr>
  <tr>
   <td>Pod Performance
   </td>
   <td>Use win_pod_performance metric to monitor pod CPU usage, memory usage, and network traffic
   </td>
   <td>Use pod_performance metric to monitor pod CPU usage, memory usage, and network traffic
   </td>
  </tr>
  <tr>
   <td>Application Performance
   </td>
   <td>Use win_app_performance metric to monitor application CPU usage, memory usage, and network traffic
   </td>
   <td>Use app_performance metric to monitor application CPU usage, memory usage, and network traffic
   </td>
  </tr>
  <tr>
   <td>Cluster Health
   </td>
   <td>Use win_cluster_health metric to monitor cluster health, including node and pod status
   </td>
   <td>Use cluster_health metric to monitor cluster health, including node and pod status
   </td>
  </tr>
  <tr>
   <td>Security
   </td>
   <td>Use win_security metric to monitor security events, including authentication and authorization
   </td>
   <td>Use security metric to monitor security events, including authentication and authorization
   </td>
  </tr>
  <tr>
   <td>Network Traffic
   </td>
   <td>Use win_network_traffic metric to monitor network traffic, including ingress and egress traffic
   </td>
   <td>Use network_traffic metric to monitor network traffic, including ingress and egress traffic
   </td>
  </tr>
  <tr>
   <td>Storage
   </td>
   <td>Use win_storage metric to monitor storage usage, including disk usage and file system usage
   </td>
   <td>Use storage metric to monitor storage usage, including disk usage and file system usage
   </td>
  </tr>
  <tr>
   <td>System Events
   </td>
   <td>Use win_system_events metric to monitor system events, including system logs and system metrics
   </td>
   <td>Use system_events metric to monitor system events, including system logs and system metrics
   </td>
  </tr>
</table>

<p>
By following the steps outlined in this section, you can enable full monitoring for your AKS clusters and gain valuable insights into their performance’s health.
</p>
<p>
In the next section, you will learn about key monitoring data and metrics.
</p>
<h2>Key Monitoring Data and Metrics</h2>

<p>
Monitoring data and understanding metrics play a crucial role in managing and optimizing Azure Kubernetes Service (AKS) clusters. Here are some key aspects to consider:
</p>
<p>
<a href="https://github.com/openobserve">Join OpenObserve - GitHub</a>
</p>
<h3>Role of Monitoring Data </h3>

<ul>

<li>Monitoring data provides insights into the performance, health, and utilization of AKS clusters.

<li>Monitoring data enables proactive issue detection and facilitates troubleshooting efforts.
</li>
</ul>
<h3>Utilization of Default Platform Metrics</h3>

<ul>

<li>AKS provides default platform metrics through Azure Monitor, which cover node performance, pod performance, and cluster health.
</li>
</ul>
<h3>Understanding Key Metrics </h3>

<ul>

<li>The Kubernetes control plane consists of several critical components, including the API server, scheduler, and controller manager.

<li>Metrics such as API server request latency, scheduler pending pods, and controller manager workqueue depth provide insights into control plane operations.
</li>
</ul>
<h3>Importance of Logs</h3>

<ul>

<li>Logs provide valuable information for troubleshooting and auditing purposes in AKS.

<li>Control plane logs contain information related to the Kubernetes control plane components, such as the API server and scheduler.

<li>Data plane logs contain information related to the applications running on the AKS cluster, such as container logs and application-specific logs.

<li>Analyzing both control plane and data plane logs helps identify issues and gain a comprehensive understanding of the cluster's behavior.
</li>
</ul>
<p>
Monitoring data and metrics are essential for managing and optimizing AKS clusters. This section enables proactive issue detection and effective troubleshooting.
</p>
<p>
In the following section we will deep dive into tools and integration required for monitoring.
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<h2>Tools and Integration for Enhanced Monitoring</h2>

<h3>OpenObserve for AKS Monitoring</h3>

<p>
OpenObserve is an innovative open-source observability platform designed to streamline the monitoring of logs, metrics, and traces. Here are some key features and benefits of using OpenObserve for AKS monitoring:
</p>
<p>

![OpenObserve for AKS Monitoring](/img/resources/aks-monitoring-image3.png "OpenObserve for AKS Monitoring")

</p>
<p>
<a href="https://openobserve.ai/blog/openobserve-on-azure-aks">Image Credit</a>
</p>
<h3>OpenObserve Features</h3>

<ul>

<li>Logs: OpenObserve provides an advanced embedded GUI for fast log searching with features like top 10, search around, SQL for query, and custom VRL functions.

<li>Metrics: OpenObserve offers long-term storage for Prometheus metrics in S3 with support for SQL and PromQL.

<li>Traces: OpenObserve provides distributed tracing with OpenTelemetry, allowing users to identify performance problems within a microservice or across a distributed architecture with precision.

<li>Alerts: OpenObserve offers scheduled and real-time alerts that allow users to promptly address critical issues and dispatch alerts to multiple platforms using templates.

<li>Dashboards: OpenObserve provides dashboards that present real-time data from logs, metrics, and traces in a visually appealing and efficient manner.
</li>
</ul>
<h3>OpenObserve Benefits</h3>

<ul>

<li>Easier: OpenObserve is designed to be easy to use and deploy, with a simple installation process and a user-friendly interface.

<li>Lower Storage Cost: OpenObserve provides storage functionality support in local Disk, S3, MinIO, GCS, Azure Blob, resulting in 140x lower storage cost compared to other solutions.

<li>Scale: OpenObserve is highly scalable and can handle large volumes of data without performance degradation.

<li>Setup Time: OpenObserve can be set up quickly, with a single deployment option available for single-node deployment.
</li>
</ul>
<h3>OpenObserve Integration with AKS</h3>

<ul>

<li>Ingestion: OpenObserve can ingest logs and metrics from AKS clusters using various plugins, including fluentd, fluentbit, and Prometheus.

<li>Querying: OpenObserve provides a powerful query engine that allows users to query logs and metrics using SQL and PromQL.

<li>Visualization: OpenObserve provides dashboards that can be used to visualize logs, metrics, and traces from AKS clusters.
</li>
</ul>
<p>
OpenObserve is a powerful tool for monitoring AKS clusters, providing comprehensive visibility into logs, metrics, and traces. Its ease of use, scalability, and lower storage cost make it an attractive option for organizations looking to streamline their monitoring capabilities.
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<p>
<a href="https://github.com/openobserve">Join OpenObserve - GitHub</a>
</p>
<p>
In the next section, you will learn about advanced monitoring techniques.
</p>
<h2>Advanced Monitoring Techniques</h2>

<p>
Advanced monitoring techniques are essential for ensuring the performance of Azure Kubernetes Service (AKS) clusters. Here are some advanced monitoring techniques for AKS:
</p>
<ul>

<li>Cluster Performance: Monitor cluster performance using metrics such as CPU usage, memory usage, and disk usage to identify bottlenecks and optimize resource allocation.

<li>Network Traffic: Monitor network traffic using metrics such as packet loss, latency, and throughput to identify network issues and optimize network configuration.

<li>Resource Utilization: Monitor resource utilization using metrics such as CPU usage, memory usage, and disk usage to identify resource bottlenecks and optimize resource allocation.

<li>Alert Rules: Create and manage alert rules to receive prompt notifications of issues in your AKS cluster.

<li>Alert Conditions: Define alert conditions based on specific metrics, such as CPU usage, memory usage, or disk usage.

<li>Alert Actions: Define alert actions, such as sending notifications to a Slack channel or triggering a script to resolve the issue.

<li>Network Observability: Enable network observability to gain detailed insights into cluster networking.

<li>Network Metrics: Collect network metrics, such as packet loss, latency, and throughput, to identify network issues and optimize network configuration.

<li>Network Visualization: Visualize network metrics using tools such as OpenObserve, Grafana or Kibana to gain a better understanding of network behavior.
</li>
</ul>
<p>
By using the above techniques, you can gain detailed insights into your AKS cluster and ensure prompt notifications of issues.
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<p>
In the next section, you will see the best practices used in AKS Monitoring.
</p>
<h2>Best Practices for AKS Monitoring</h2>

<p>
Here are some key best practices for monitoring Azure Kubernetes Service (AKS):
</p>
<ul>

<li>Enable Prometheus metrics for your cluster to gain insights into performance and health.

<li>Enable Container Insights to collect logs and performance data from your cluster.

<li>Create diagnostic settings to collect control plane logs for AKS clusters.

<li>Enable recommended Prometheus alerts to proactively notify you of issues.

<li>Ensure the availability of the Log Analytics workspace supporting Container Insights.

<li>Monitor all layers of your Kubernetes environment, including network, cluster, and application layers.

<li>Use Azure Arc-enabled Kubernetes to monitor clusters running in other clouds.

<li>Use Azure managed services for cloud native tools like Prometheus and Grafana.

<li>Integrate AKS clusters into your existing monitoring tools.

<li>Use Azure Policy to enable data collection for enabling Prometheus metrics, Container Insights, and diagnostic settings.
</li>
</ul>
<p>
These best practices provide a comprehensive approach to monitoring AKS clusters, ensuring the performance your Kubernetes environment.
</p>
<p>
<a href="https://github.com/openobserve">Join OpenObserve - GitHub</a>
</p>
<h2>Troubleshooting and Optimizing AKS Monitoring</h2>

<p>
Troubleshooting and optimizing AKS monitoring involves identifying and addressing common issues, optimizing monitoring configurations for better performance and lower costs, and leveraging resources and next steps for further enhancing AKS cluster monitoring.
</p>
<h3>Troubleshooting Common Issues in AKS Monitoring Setups</h3>

<ul>

<li>Check Cluster Configuration: Ensure that the AKS cluster is properly configured for monitoring. Verify that the necessary components, such as Azure Monitor and Azure Log Analytics, are enabled and configured correctly.

<li>Review Monitoring Data: Analyze monitoring data to identify potential issues. Use tools like Azure Monitor and Azure Log Analytics to review metrics, logs, and events, and identify patterns or anomalies that may indicate problems.

<li>Check Network Connectivity: Verify that network connectivity is stable and functioning correctly. Ensure that the AKS cluster can communicate with Azure Monitor and Azure Log Analytics without any issues.

<li>Check Resource Utilization: Monitor resource utilization to identify potential bottlenecks. Use tools like Azure Monitor and Azure Log Analytics to track CPU usage, memory usage, and disk usage, and identify areas where resources can be optimized.

<li>Check for Misconfigured Alerts: Review alert configurations to ensure that they are set up correctly. Verify that alerts are triggered by the correct conditions and that notifications are sent to the correct recipients.
</li>
</ul>
<h3>Optimizing Monitoring Configurations</h3>

<ul>

<li>Use Azure Monitor to collect and analyze metrics, logs, and events from your AKS cluster. This can help you identify performance issues and optimize resource utilization.

<li>Use Azure Log Analytics to collect and analyze logs from your AKS cluster. This can help you identify security threats and troubleshoot issues.

<li>Use OpenObserve: Use OpeObserve to monitor logs, metrics, and traces.

<li>Use Prometheus to collect and analyze metrics from your AKS cluster. 

<li>Use Grafana to visualize monitoring data from your AKS cluster. 
</li>
</ul>
<p>
By following these strategies and using the right tools, you can ensure that your AKS cluster is properly monitored and optimized for performance and security.
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<h2>Conclusion</h2>

<p>
AKS monitoring is critical for maintaining healthy and performant AKS clusters. By collecting and analyzing data on resource utilization, node performance, and pod health, it proactively identifies and addresses potential issues before they impact applications. 
</p>
<p>
This includes vulnerability scanning, performance monitoring, and troubleshooting. Additionally, monitoring helps optimize resource allocation, simplify troubleshooting, and enhance security compliance.
</p>
<p>
OpenObserve is an open-source observability platform that simplifies AKS monitoring of logs, metrics, and traces. It offers a user-friendly interface, significantly lower storage costs, and superior scalability compared to other solutions. 
</p>
<p>
OpenObserve integrates seamlessly with AKS for data ingestion, advanced querying of logs and metrics, and effective data visualization through intuitive dashboards. With OpenObserve, you gain comprehensive visibility into your AKS clusters while keeping costs and complexity down.
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
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
<p>
Resources & Bibliography
</p>
<p>
<a href="https://openobserve.ai/blog/openobserve-on-azure-aks">https://openobserve.ai/blog/openobserve-on-azure-aks</a> 
</p>
<p>
<a href="https://www.kubecost.com/kubernetes-monitoring/aks-monitoring/">https://www.kubecost.com/kubernetes-monitoring/aks-monitoring/</a>
</p>
<p>
<a href="https://blog.nashtechglobal.com/monitoring-for-azure-kubernetes-service/">https://blog.nashtechglobal.com/monitoring-for-azure-kubernetes-service/</a>
</p>
<p>
<a href="https://learn.microsoft.com/en-us/azure/aks/monitor-aks">https://learn.microsoft.com/en-us/azure/aks/monitor-aks</a>
</p>
<p>
<a href="https://intercept.cloud/en-gb/knowledge-base/blogs/aks-monitoring-and-management">https://intercept.cloud/en-gb/knowledge-base/blogs/aks-monitoring-and-management</a>
</p>
<p>
YouTube Reference Videos
</p>
<p>
<a href="https://www.youtube.com/watch?v=HUn5rfd4KCY">Monitoring Azure Kubernetes Service (AKS) with Azure Monitor</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=c4nTKMU6fBU">Azure Kubernetes Services (AKS) Overview</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=RUoejLILgyA">How to Create AKS Cluster in Azure</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=o5qkgsyfRao">Introduction To Azure Kubernetes Service (AKS)</a>
</p>
