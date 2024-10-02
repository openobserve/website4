---
title: Installing Kubelet Stats Receiver with OpenTelemetry
seoTitle: Installing Kubelet Stats Receiver with OpenTelemetry
description: Deploy and configure your Kubelet Stats Receiver with OpenTelemetry
  using this step-by-step guide.
img: /img/resources/installing-kubelet-stats-receiver-with-opentelemetry.png
alt: Kubelet Stats Receiver
slug: kubelet-stats-receiver-installation-guide
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - Kubelet
  - Stats Receiver
---
<p><span style="font-weight: 400;">Your Kubernetes cluster is a complex ecosystem teeming with data. To harness its full potential, you need powerful tools. The Kubelet Stats Receiver is a cornerstone of effective Kubernetes cluster monitoring.&nbsp;</span></p>

<p><span style="font-weight: 400;">The Kubelet Stats Receiver is a critical component within the OpenTelemetry Collector architecture for gathering metrics from Kubernetes nodes. It interacts directly with the Kubelet, a control plane agent that runs on each node.</span></p>

<p><strong>Key Functions:</strong></p>

<ul>

<li style="font-weight: 400;"><strong>Metric Collection:</strong><span style="font-weight: 400;"> Periodically fetches metrics such as CPU, memory, network, and disk utilization from the Kubelet.</span></li>

<li style="font-weight: 400;"><strong>Data Enrichment:</strong><span style="font-weight: 400;"> Adds context to collected metrics, including pod and container information.</span></li>

<li style="font-weight: 400;"><strong>Data Export:</strong><span style="font-weight: 400;"> Sends enriched metrics to the OpenTelemetry Collector for further processing and analysis.</span></li>

</ul>

<p><strong>Integration with OpenTelemetry:</strong></p>

<p><span style="font-weight: 400;">The Kubelet Stats Receiver is integrated with the OpenTelemetry Collector, which is responsible for receiving, processing, and exporting telemetry data. The collector can then forward the metrics to various backend systems for storage and visualization.</span></p>

<p><strong>Importance of Kubelet Stats Receiver:</strong></p>

<ul>

<li style="font-weight: 400;"><strong>Real-time monitoring:</strong><span style="font-weight: 400;"> Provides up-to-date insights into cluster health and resource utilization.</span></li>

<li style="font-weight: 400;"><strong>Capacity planning:</strong><span style="font-weight: 400;"> Helps in predicting future resource needs.</span></li>

<li style="font-weight: 400;"><strong>Performance optimization:</strong><span style="font-weight: 400;"> Identifies bottlenecks and optimization opportunities.</span></li>

<li style="font-weight: 400;"><strong>Anomaly detection:</strong><span style="font-weight: 400;"> Detects abnormal resource usage patterns.</span></li>

</ul>

<p><span style="font-weight: 400;">By effectively utilizing the Kubelet Stats Receiver, organizations can gain valuable insights into their Kubernetes clusters and make data-driven decisions. Let&rsquo;s get started by understanding the deployment and configuration of OpenTelemetry collector.</span></p>

<h2><span style="font-weight: 400;">Deployment and Configuration</span></h2>

<p><span style="font-weight: 400;">To install the Kubelet Stats Receiver with OpenTelemetry in OpenObserve, follow these steps:</span></p>

<h3><span style="font-weight: 400;">Deploying the OpenTelemetry Collector</span></h3>

<p><span style="font-weight: 400;">The OpenTelemetry Collector can be deployed in various ways, including as a Docker container, using Docker Compose, or on Kubernetes. The key steps are:</span></p>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Pull the OpenTelemetry Collector Docker image:</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">docker pull otel/opentelemetry-collector-contrib:</span><span style="font-weight: 400;">0.103.1</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Run the Collector container, mounting a custom configuration file:</span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">docker </span><span style="font-weight: 400;">run</span><span style="font-weight: 400;"> -v $(pwd)/</span><span style="font-weight: 400;">config</span><span style="font-weight: 400;">.yaml:/etc/otelcol-contrib/</span><span style="font-weight: 400;">config</span><span style="font-weight: 400;">.yaml otel/opentelemetry-collector-contrib:</span><span style="font-weight: 400;">0.103.1</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Configuring the OpenTelemetry Collector</span></h3>

<p><span style="font-weight: 400;">In the OpenTelemetry Collector configuration, add the following receiver and exporter to collect Kubelet metrics:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; kubeletstats:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; collection_interval:</span> <span style="font-weight: 400;">10</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint:</span> <span style="font-weight: 400;">0.0.0.0</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;">10250</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metric_groups:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - container</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - node</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - pod</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - volume</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; openobserve:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint:</span><span style="font-weight: 400;"> https:</span><em><span style="font-weight: 400;">//openobserve.example.com</span></em><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; api_key:</span><span style="font-weight: 400;"> your_api_key</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Replace https://openobserve.example.com with your OpenObserve cluster URL and your_api_key with a valid API key.</span></p>

<h3><span style="font-weight: 400;">Verifying the Installation</span></h3>

<p><span style="font-weight: 400;">After restarting the OpenTelemetry Collector, you should see Kubelet metrics in OpenObserve within a few minutes. You can verify this by running a query in the OpenObserve UI or using the API:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">sql</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">SELECT</span><span style="font-weight: 400;"> * </span><span style="font-weight: 400;">FROM</span><span style="font-weight: 400;"> metrics </span><span style="font-weight: 400;">WHERE</span><span style="font-weight: 400;"> metric_name </span><span style="font-weight: 400;">LIKE</span> <span style="font-weight: 400;">'kube%'</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This query will return all Kubelet-related metrics being collected by OpenTelemetry and sent to OpenObserve.</span></p>

<p><span style="font-weight: 400;">By following these steps, you can successfully install the Kubelet Stats Receiver with OpenTelemetry and start collecting Kubelet metrics in your OpenObserve observability platform. To know more about how to use OpenObserve, </span><a href="https://openobserve.ai/docs/"><span style="font-weight: 400;">check out the detailed documentation here</span></a><span style="font-weight: 400;">.</span></p>

<p><span style="font-weight: 400;">Now, let&rsquo;s understand the authentication and permissions required.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Authentication and Permissions</span></h2>

<p><span style="font-weight: 400;">Here are the key points about authentication and permissions for the Kubelet Stats Receiver with OpenTelemetry in OpenObserve:</span></p>

<h3><span style="font-weight: 400;">Service Account Authentication</span></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Use auth_type: "serviceAccount" in the receiver configuration</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Requires the default service account token to authenticate to the kubelet API</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The pod spec should set the node name using the downward API:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">env:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">- name:</span> <span style="font-weight: 400;">K8S_NODE_NAME</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; valueFrom:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; fieldRef:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; fieldPath:</span> <span style="font-weight: 400;">spec.nodeName</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Then reference the K8S_NODE_NAME environment variable in the endpoint field:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; kubeletstats:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; auth_type:</span> <span style="font-weight: 400;">"serviceAccount"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint:</span> <span style="font-weight: 400;">"${K8S_NODE_NAME}:10250"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">TLS Authentication</span></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Use auth_type: "tls" in the receiver configuration</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Requires setting ca_file, key_file, and cert_file fields</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Example configuration:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; kubeletstats:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; auth_type:</span> <span style="font-weight: 400;">"tls"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; ca_file:</span> <span style="font-weight: 400;">"/path/to/ca.crt"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; key_file:</span> <span style="font-weight: 400;">"/path/to/apiserver.key"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; cert_file:</span> <span style="font-weight: 400;">"/path/to/apiserver.crt"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint:</span> <span style="font-weight: 400;">"192.168.64.1:10250"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Required Permissions</span></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The Kubelet Stats Receiver needs get permissions on the nodes/stats resources</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">If using extra_metadata_labels or request/limit_utilization metrics, it also needs get permissions on nodes/proxy resources</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Example RBAC configuration:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">apiVersion: rbac.authorization.k8s.io/v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">kind: ClusterRole</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">metadat</span><span style="font-weight: 400;">a:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; name: otel-collector </span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">rule</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">- apiGroup</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">""</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; resource</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">"nodes/stats"</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">verb</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">"get"</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">- apiGroup</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">""</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; resource</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">"nodes/proxy"</span><span style="font-weight: 400;">] </span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">verb</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">"get"</span><span style="font-weight: 400;">]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By following these authentication and permission guidelines, you can successfully configure the Kubelet Stats Receiver to collect metrics from the kubelet API in your OpenObserve setup. Let&rsquo;s see a sample configuration file and parameters to go with it.</span></p>

<h2><span style="font-weight: 400;">Sample Configuration</span></h2>

<p><span style="font-weight: 400;">Here's a sample configuration for the Kubelet Stats Receiver with OpenTelemetry in OpenObserve:</span></p>

<h3><span style="font-weight: 400;">Example Configuration File</span></h3>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; kubeletstats:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; collection_interval:</span> <span style="font-weight: 400;">10</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint:</span> <span style="font-weight: 400;">"${K8S_NODE_NAME}:10250"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; auth_type:</span> <span style="font-weight: 400;">"serviceAccount"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metric_groups:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - container</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - node</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - pod</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - volume</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; extra_metadata_labels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - </span><span style="font-weight: 400;">"kubernetes.io/hostname"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - </span><span style="font-weight: 400;">"beta.kubernetes.io/instance-type"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; request_limit_utilization:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; enabled:</span><span style="font-weight: 400;"> true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; threshold:</span> <span style="font-weight: 400;">80</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; openobserve:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint:</span><span style="font-weight: 400;"> https:</span><em><span style="font-weight: 400;">//openobserve.example.com</span></em><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; api_key:</span><span style="font-weight: 400;"> your_api_key</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Configuration Parameters</span></h3>

<h4><span style="font-weight: 400;">Mandatory Parameters</span></h4>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">collection_interval: Interval at which to collect metrics (e.g., "10s")</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">endpoint: Kubelet API endpoint (e.g., "${K8S_NODE_NAME}:10250")</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">auth_type: Authentication type, either "serviceAccount" or "tls"</span></li>

</ul>

<h4><span style="font-weight: 400;">Optional Parameters</span></h4>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">metric_groups: Specify which metric groups to collect (container, node, pod, volume)</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">extra_metadata_labels: Additional labels to include in the metrics (e.g., "kubernetes.io/hostname")</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">request_limit_utilization:</span></li>

</ul>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">enabled: Enable request/limit utilization metrics</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">threshold: Threshold percentage for request/limit utilization (e.g., 80)</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">ca_file, key_file, cert_file: Required for "tls" auth_type</span></li>

</ul>

<p><span style="font-weight: 400;">In the OpenObserve exporter configuration:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">endpoint: OpenObserve cluster URL (e.g., https://openobserve.example.com)</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">api_key: Valid API key for authentication</span></li>

</ul>

<p><span style="font-weight: 400;">This sample configuration demonstrates the key parameters for the Kubelet Stats Receiver and OpenObserve exporter. Adjust the values based on your specific requirements and environment. In the next section, we will discuss a few advanced configuration options.</span></p>

<h2><span style="font-weight: 400;">Advanced Configuration Options</span></h2>

<p><span style="font-weight: 400;">Here are the key advanced configuration options for installing the Kubelet Stats Receiver with OpenTelemetry:</span></p>

<h3><span style="font-weight: 400;">Including/excluding specific metrics</span></h3>

<p><span style="font-weight: 400;">You can configure which metric groups to collect by setting the </span><span style="font-weight: 400;">metric_groups</span><span style="font-weight: 400;"> option in the receiver configuration. The available groups are:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">node: Node-level metrics</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">pod: Pod metrics</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">container: Container metrics</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">volume: Volume metrics</span></li>

</ul>

<p><span style="font-weight: 400;">For example, to collect only node and pod metrics:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; kubeletstats:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; metric_groups:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - </span><span style="font-weight: 400;">node</span> <span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - pod</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Adding additional metadata attributes</span></h3>

<p><span style="font-weight: 400;">You can add extra metadata labels to the collected metrics by setting the extra_metadata_labels option. This requires get permissions on the nodes/proxy resource in addition to nodes/stats.</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; kubeletstats:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; extra_metadata_labels:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - node_name</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - pod_name</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - container_name</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Configuring collection intervals and security settings</span></h3>

<p><span style="font-weight: 400;">The collection_interval option sets how often metrics are collected, defaulting to 10 seconds.</span></p>

<p><span style="font-weight: 400;">The auth_type option configures how the receiver authenticates to the kubelet API. The available options are:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">none: Use the read-only kubelet endpoint on port 10255 (no auth required)</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">tls: Use TLS auth with the specified ca_file, cert_file, and key_file</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">serviceAccount: Use the pod's service account token and CA cert</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">kubeConfig: Use the specified kubeConfig file to authenticate and proxy through the API server</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; kubeletstats:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; collection_interval:</span> <span style="font-weight: 400;">10</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; auth_type:</span> <span style="font-weight: 400;">serviceAccount</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint:</span> <span style="font-weight: 400;">"${env:K8S_NODE_NAME}:10250"</span> <span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; insecure_skip_verify:</span> <span style="font-weight: 400;">true</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">The insecure_skip_verify option disables TLS cert verification when set to true.</span></p>

<h3><span style="font-weight: 400;">Role-based access control</span></h3>

<p><span style="font-weight: 400;">The Kubelet Stats Receiver requires get permissions on the nodes/stats resource. If using extra_metadata_labels or request/limit utilization metrics, it also needs access to nodes/proxy.</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">Bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">apiVersion: rbac.authorization.k8s.io/v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">kind: ClusterRole</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">metadat</span><span style="font-weight: 400;">a:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; name: otel-collector </span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">rule</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">- apiGroup</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">""</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; resource</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">"nodes/stats"</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">verb</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">"get"</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">- apiGroup</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">""</span><span style="font-weight: 400;">] </span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; resource</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">"nodes/proxy"</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;">verb</span><span style="font-weight: 400;">s:</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">"get"</span><span style="font-weight: 400;">]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By leveraging these advanced configuration options, you can fine-tune the Kubelet Stats Receiver to collect the exact metrics you need, add relevant metadata, and optimize collection intervals and security settings to best fit your observability requirements when using OpenTelemetry.</span></p>

<h2><span style="font-weight: 400;">Monitoring and Metrics</span></h2>

<p><span style="font-weight: 400;">Here are the key points about the available metrics and resource attributes for the Kubelet Stats Receiver:</span></p>

<h3><span style="font-weight: 400;">Available metrics</span></h3>

<p><span style="font-weight: 400;">The Kubelet Stats Receiver collects the following metric groups from the kubelet API:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Node metrics: CPU, memory, filesystem, network, and volume metrics at the node level</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Pod metrics: CPU, memory, network, and volume metrics at the pod level</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Container metrics: CPU, memory, and filesystem metrics at the container level</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Volume metrics: Capacity, available, used, and inodes metrics for volumes</span></li>

</ul>

<h3><span style="font-weight: 400;">Resource attributes</span></h3>

<p><span style="font-weight: 400;">The receiver automatically adds the following resource attributes to the collected metrics:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">k8s.cluster.name: Name of the Kubernetes cluster</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">k8s.node.name: Name of the node</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">k8s.pod.name: Name of the pod</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">k8s.container.name: Name of the container</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">k8s.volume.name: Name of the volume</span></li>

</ul>

<p><span style="font-weight: 400;">You can also configure additional metadata labels to be added using the extra_metadata_labels option, such as:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">node_name</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">pod_name</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">container_name</span></li>

</ul>

<p><span style="font-weight: 400;">This allows enriching the metrics with more context about the origin of the data.</span></p>

<h3><span style="font-weight: 400;">Metric types</span></h3>

<p><span style="font-weight: 400;">The metrics collected are of the following types:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Counters: Monotonically increasing values, like CPU time</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Gauges: Values that can go up or down, like memory usage</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Histograms: Distributions of values, like latency</span></li>

</ul>

<p><span style="font-weight: 400;">This rich set of node, pod, container and volume metrics along with the associated resource attributes can help you gain deep visibility into the performance and health of your Kubernetes cluster using the Kubelet Stats Receiver.</span></p>

<h2><span style="font-weight: 400;">Troubleshooting and Support</span></h2>

<h3><span style="font-weight: 400;">Unable to get network stats in OpenShift 4</span></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">If you are running the OpenObserve Collector in OpenShift 4 and unable to get network stats, ensure you have the correct RBAC permissions set up.&nbsp;</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The Kubelet Stats Receiver needs &lsquo;get&rsquo; permissions on the nodes/stats resource. If using extra_metadata_labels or request/limit utilization metrics, it also needs access to nodes/proxy.</span></li>

</ul>

<h3><span style="font-weight: 400;">Metrics not showing up</span></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Check that the Kubelet Stats Receiver is properly configured in your OpenObserve Collector config.&nbsp;</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Ensure the kubeletstats receiver is included in the receivers section and the metrics pipeline.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Verify the auth_type is set correctly. If using tls, make sure the ca_file, cert_file, and key_file are specified. For serviceAccount, ensure the pod has the necessary permissions.</span></li>

</ul>

<h3><span style="font-weight: 400;">Incomplete metrics</span></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">By default, the Kubelet Stats Receiver collects node, pod and container metrics.&nbsp;</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">To collect volume metrics as well, set metric_groups to include volume.</span></li>

</ul>

<h3><span style="font-weight: 400;">Getting support</span></h3>

<p><span style="font-weight: 400;">For general questions and troubleshooting, you can reach out to the </span><a href="https://github.com/openobserve/openobserve"><span style="font-weight: 400;">OpenObserve community on Github</span></a><span style="font-weight: 400;">.</span></p>

<p><span style="font-weight: 400;">By following these troubleshooting steps and leveraging the OpenObserve community support, you should be able to resolve most issues encountered when using the Kubelet Stats Receiver.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Why OpenObserve is the Right Choice</span></h2>

<p><span style="font-weight: 400;">OpenObserve is the ideal choice for analyzing and visualizing the metrics collected by the Kubelet Stats Receiver. With its powerful querying capabilities, customizable dashboards, and alerting features, OpenObserve enables you to:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Quickly identify performance bottlenecks and anomalies</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Optimize resource utilization and plan for future capacity needs</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Correlate metrics across different layers of your stack</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Collaborate with your team and share insights</span></li>

</ul>

<h2><span style="font-weight: 400;">Sign up for OpenObserve Today</span></h2>

<p><span style="font-weight: 400;">To get started with OpenObserve, </span><a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">sign up for a free trial.</span></a><span style="font-weight: 400;"> Our team is dedicated to helping you achieve observability and gain actionable insights from your Kubernetes metrics.</span></p>

<p><span style="font-weight: 400;">Don't miss out on the benefits of comprehensive Kubernetes monitoring with OpenObserve. </span><a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">Sign up today and take your observability to the next level</span></a><span style="font-weight: 400;">!</span></p>
