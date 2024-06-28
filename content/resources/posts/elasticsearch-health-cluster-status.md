---
title: Understanding Elasticsearch Cluster Health Status
seoTitle: Understanding Elasticsearch Cluster Health Status
description: "Elasticsearch cluster health is significant. It has 3 status
  colors: green, yellow, red, depicting shard allocation."
img: /img/resources/elasticsearch-health-image1.png
alt: elasticsearch health
slug: elasticsearch-health-cluster-status
authors:
  - openobserve-team
publishDate: 2024-06-29
tags:
  - Elasticsearch
  - cluster health
  - SaaS monitoring
  - performance metrics
  - user experience
---
<h2>Introduction</h2>

<p>
Is your Elasticsearch cluster a black box?  You write flawless code, but searches feel like a guessing game. Optimizing performance starts with understanding cluster health. 
</p>
<p>
Elasticsearch cluster health is a metric to monitor that provides insights into the overall status and performance of your cluster. The health status of an Elasticsearch cluster can be green, yellow, or red. 
</p>
<h3>Health Status Colors: Green, Yellow, and Red</h3>

<p>
Green Status: All primary and replica shards are allocated. This indicates that the cluster is ready for use.
</p>
<p>
Yellow Status: All primary shards are allocated, but few replica shards are not. This indicates that the cluster is partially functional.
</p>
<p>
Red Status: One or more primary shards are not allocated. This indicates that the cluster may experience significant issues.
</p>
<p>
Let’s understand the role of the command elasticsearc_cluster/health.
</p>
<h3>Role of the Elasticsearch _cluster/health </h3>

<p>
The _cluster/health endpoint is used to monitor the health status of an Elasticsearch cluster. This endpoint returns a simple status on the health of the cluster and is used to get the health status of specific data streams and indices.
</p>
<p>
Example:
</p>

<pre class="prettyprint">bash
GET /_cluster/health</pre>

<p>
This command returns the health status of the entire cluster. You can also specify a target data stream or index to get the health status of a specific part of the cluster.
</p>
<p>
Example:
</p>

<pre class="prettyprint">bash
GET /_cluster/health/my-index-000001</pre>

<p>
This command returns the health status of the my-index-000001 index.
</p>
<p>
Elasticsearch cluster health is a critical metric to monitor and understand the different health status colors. Now, let’s understand how to check cluster health withcURL.
</p>
<p>
<a href="https://openobserve.ai/about/">About Us | Open Source Observability Platform</a>
</p>
<h2>Checking Cluster Health with cURL</h2>

<p>
Here are the key points about using the _cluster/health endpoint to check Elasticsearch cluster health.
</p>
<p>
The _cluster/health endpoint provides an overview of the health status of an Elasticsearch cluster.
</p>
<p>
<a href="https://openobserve.ai/about/">About Us | Open Source Observability Platform</a>
</p>
<p>
<a href="https://www.reddit.com/r/rust/comments/14368uh/openobserve_open_source/?rdt=54729">OpenObserve: Open source Elasticsearch/Datadog/Splunk alternative in Rust for logs, metrics, traces. 140x lower storage cost</a>
</p>
<h3>Checking Overall Cluster Health</h3>

<p>
To check the overall health of the cluster, use the following cURL command:
</p>

<pre class="prettyprint">bash
curl -X GET "http://localhost:9200/_cluster/health?pretty"</pre>

<p>
This command will return a JSON object with the cluster health status and other metrics.
</p>
<h3>Checking Index Health</h3>

<p>
To check the health of a specific index, use the _cluster/health/{index} endpoint:
</p>

<pre class="prettyprint">bash
curl -X GET "http://localhost:9200/_cluster/health/my_index?pretty"</pre>

<p>
Replace {index} with the name of the index you want to check.
</p>
<h3>Checking Node Health</h3>

<p>
To check the health of individual nodes in the cluster, use the _cat/nodes endpoint:
</p>

<pre class="prettyprint">bash
curl -X GET "http://localhost:9200/_cat/nodes?v&h=name,role,heap.percent,cpu,load_1m,status"</pre>

<p>
This command will return a tabular output with information about each node, including its role, heap usage, CPU usage, and more. Now, let’s move on to interpreting the response.
</p>
<h3>Interpreting the Health Check Response</h3>

<p>
The JSON response from the _cluster/health endpoint contains the following key fields:
</p>
<p>
status: 
</p>
<ul>

<li>The overall health status of the cluster can be "green", "yellow", or "red".

<li>timed_out: Indicates whether the request timed out.

<li>number_of_nodes: The number of nodes in the cluster.

<li>number_of_data_nodes: The number of data nodes in the cluster.

<li>active_primary_shards: The number of active primary shards.

<li>active_shards: The total number of active shards (primary and replica).

<li>relocating_shards: The number of shards that are being moved from one node to another.

<li>initializing_shards: The number of shards that are being initialized.

<li>unassigned_shards: The number of shards that are not allocated to any node.
</li>
</ul>
<p>
By regularly checking the health of your Elasticsearch cluster using the _cluster/health endpoint, you can monitor its status, detect potential issues, and take corrective actions.
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<p>
<a href="https://github.com/openobserve/openobserve">OpenObserve serves as a replacement for Elasticsearch</a> for users who ingest data using APIs and perform searches. OpenObserve comes with its user interface, eliminating the need for separate installation.
</p>
<p>
Here are the results from pushing logs from production Kubernetes cluster to both Elasticsearch and OpenObserve using Fluent Bit.
</p>
<p>

![Interpreting the Health Check Response](/img/resources/elasticsearch-health-image2.png "Interpreting the Health Check Response")

</p>
<p>
Let’s move on to understanding advanced monitoring with cat health API.
</p>
<h2>Advanced Monitoring with the Cat Health API</h2>

<p>
Here are the key points about using the cat health API in Elasticsearch:
</p>
<p>
<a href="https://openobserve.ai/about/">About Us | Open Source Observability Platform</a>
</p>
<h3>Cat Health API</h3>

<p>
Purpose: The cat health API provides an overview of the health status of an Elasticsearch cluster.
</p>
<p>
Output format: It returns a human-readable text output with columns for various health metrics.
</p>
<p>
Intended use: The cat health API is designed for human consumption, such as in the Kibana console or command line.
</p>
<h3>Permissions Required</h3>

<p>
Cluster privileges: To use the cat health API, you need the monitor cluster privilege.
</p>
<p>
Index privileges: If you want to check the health of specific indices, you also need the monitor index privilege for those indices.
</p>
<p>
Examples of using the cat health API
</p>
<p>
Checking overall cluster health:
</p>

<pre class="prettyprint">bash
GET /_cat/health?v</pre>

<p>
This returns the overall health status of the cluster, along with metrics like the number of nodes, shards, and data streams.
</p>
<h3>Checking health of specific indices</h3>

<pre class="prettyprint">bash
GET /_cat/health/my-index-000001?v</pre>

<p>
Replace my-index-000001 with the name of the index you want to check.
</p>
<h3>Customizing output</h3>

<ul>

<li>Use the ?h= parameter to specify which columns to include, e.g., ?h=status,node.total,node.data,shards.

<li>Use the ?s= parameter to sort the output by specific columns, e.g., ?s=status:desc.

<li>Use the ?format= parameter to change the output format to JSON, YAML, or CBOR.
</li>
</ul>
<h3>Getting help</h3>

<ul>

<li>Use the ?help parameter to see the available columns for each cat API endpoint.
</li>
</ul>
<p>
By using the cat health API, you can quickly check the overall health of your Elasticsearch cluster and identify any issues that need attention. Now, you will be acquainted with the ways to diagnose and fix yellow and red status.
</p>
<p>
<a href="https://openobserve.ai/about/">About Us | Open Source Observability Platform</a>
</p>
<h2>Diagnosing and Fixing Yellow and Red Health Statuses</h2>

<p>
Here are the key points about diagnosing and fixing yellow and red health statuses in Elasticsearch:
</p>
<h3>Common Reasons for Yellow and Red Statuses</h3>

<ul>

<li>Unassigned Shards: Shards not allocated to any node. This can occur due to node failures, insufficient resources, or configuration issues.

<li>Initializing Shards: Shards currently being initialized, either during cluster startup or after a node failure.

<li>Relocating Shards: Shards being moved from one node to another, typically to balance the load across the cluster.

<li>Disk Space Issues: Lack of disk space on nodes can cause shards to become unassigned.

<li>Node Failures: Node failures can cause shards to become unassigned.
</li>
</ul>
<h3>Steps to Diagnose Cluster Issues</h3>

<ul>

<li>Check Cluster Health: Use the _cluster/health API to check the overall health status of the cluster.

<li>View Unassigned Shards: Use the _cat/shards API to view unassigned shards and their reasons for being unassigned.

<li>Check Node Allocation: Use the _cluster/allocation_explain API to check node allocation decisions and identify potential issues.

<li>Check Disk Space: Check disk space on nodes to ensure there is sufficient space for shards.
</li>
</ul>
<h3>Specific Fixes for Common Problems</h3>

<ul>

<li>Unassigned Shards:

<ul><li>Check node allocation decisions and ensure nodes have sufficient resources.

<li>Check disk space on nodes and ensure there is sufficient space for shards.
</li>
</ul>

<li>Initializing Shards:

<ul><li>Check cluster startup and ensure all nodes are properly initialized.

<li>Check node failures and ensure nodes are properly restarted.
</li>
</ul>

<li>Relocating Shards:

<ul><li>Check shard balancing and ensure shards are properly distributed across the cluster.

<li>Check node failures and ensure nodes are properly restarted.
</li>
</ul>

<li>Disk Space Issues:

<ul><li>Check disk space on nodes and ensure there is sufficient space for shards.

<li>Consider increasing disk space or using a different storage solution.
</li>
</ul>

<li>Node Failures:

<ul><li>Check node failures and ensure nodes are properly restarted.

<li>Consider using a different node or cluster configuration.
</li>
</ul>
<p></ul>
By following these steps, you can diagnose and fix common issues causing yellow and red health statuses in Elasticsearch. But, to ensure that issues are under control, you need to follow the best practices which is discussed in next section.
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<h2>Best Practices for Maintaining Cluster Health</h2>

<p>
Here are the best practices for maintaining cluster health:
</p>
<ul>

<li>Regularly check cluster health: Use the _cluster/health API to monitor the overall health of your Elasticsearch cluster.

<li>Monitor node-level metrics: Use the _nodes API to monitor node-level metrics such as CPU usage, memory usage, and disk I/O.

<li>Monitor index-level metrics: Use the _indices API to monitor index-level metrics such as document count, store size, and indexing rate.

<li>Ensure sufficient replicas: Ensure that you have sufficient replicas for your available nodes to maintain data redundancy and availability.

<li>Adjust replica settings: Adjust replica settings based on your specific use case and resource availability.

<li>Monitor disk space: Monitor disk space on nodes to ensure there is sufficient space for shards.

<li>Monitor memory usage: Monitor memory usage on nodes to ensure there is sufficient memory for shards.

<li>Adjust shard allocation: Adjust shard allocation settings based on disk space and memory availability.
</li>
</ul>
<p>
By following these best practices, you can ensure the health and performance of your Elasticsearch cluster. Let’s conclude the learnings from the article that gives a quick overview.
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<h2>Conclusion</h2>

<p>
Elasticsearch cluster health provides vital insights into your cluster's functionality. Use the _cluster/health endpoint to monitor its status (green, yellow, or red) and identify potential issues.
</p>
<ul>

<li>Green indicates optimal health (all shards allocated).

<li>Yellow suggests partial functionality (all primary shards allocated, but some replica shards missing).

<li>Red signifies critical issues (unallocated primary shards).
</li>
</ul>
<p>
Regular cluster health checks and understanding the reasons behind yellow/red statuses are crucial for maintaining a healthy cluster. Here is a brief summary to help you.
</p>
<p>
Key Tools for Monitoring and Troubleshooting:
</p>
<ul>

<li>_cluster/health API: Provides overall health status and metrics.

<li>_cat/health API: Offers a quick readable health overview.

<li>_cat/shards API: Lists unassigned shards and reasons for unassignment.

<li>_cluster/allocation_explain API: Analyzes node allocation decisions.
</li>
</ul>
<p>
Common Causes of Yellow/Red Statuses:
</p>
<ul>

<li>Unassigned Shards: Node failures, insufficient resources, or configuration issues.

<li>Initializing Shards: Shards being set up during startup or after node failures.

<li>Relocating Shards: Shards being moved for load balancing.

<li>Disk Space Issues: Lack of disk space on nodes.

<li>Node Failures: Nodes malfunctioning, causing shard unavailability.
</li>
</ul>
<p>
Resolving these issues involves:
</p>
<ul>

<li>Checking node allocation and disk space.

<li>Monitoring node startup and failures.

<li>Analyzing shard balancing and node restarts.

<li>Increasing disk space or using alternative storage solutions.
</li>
</ul>
<p>
Best Practices for Maintaining Cluster Health:
</p>
<ul>

<li>Regularly monitor cluster health using _cluster/health.

<li>Track node-level metrics (CPU, memory, disk I/O) with _nodes.

<li>Monitor index-level metrics (document count, size, indexing rate) with _indices.

<li>Ensure sufficient replicas for data redundancy and availability.

<li>Adjust replica settings based on needs and resource constraints.

<li>Monitor and adjust shard allocation based on disk space and memory usage.
</li>
</ul>
<p>
By following these practices, you can maintain a healthy and performant Elasticsearch cluster.
</p>
<p>
<a href="https://cloud.openobserve.ai/">Book a free demo on OpenObserve Today</a> 
</p>
<p>
References Articles:
</p>
<p>
<a href="https://stackoverflow.com/questions/27364670/how-to-check-elasticsearch-cluster-health">https://stackoverflow.com/questions/27364670/how-to-check-elasticsearch-cluster-health</a> 
</p>
<p>
<a href="https://opster.com/guides/elasticsearch/operations/elasticsearch-health-check/">https://opster.com/guides/elasticsearch/operations/elasticsearch-health-check/</a> 
</p>
<p>
<a href="https://www.elastic.co/guide/en/cloud/current/ec-monitoring.html">https://www.elastic.co/guide/en/cloud/current/ec-monitoring.html</a>
</p>
<p>
<a href="https://www.yireo.com/blog/2022-08-31-elasticsearch-cluster-is-yellow-which-is-ok">https://www.yireo.com/blog/2022-08-31-elasticsearch-cluster-is-yellow-which-is-ok</a>
</p>
<p>
Youtube Videos:<br><a href="https://www.youtube.com/watch?v=GH6hO2L4LR0">Elasticsearch basic concepts | cluster, shards, nodes | Elasticsearch tutorial for beginners</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=82gEv5mowJY">How to monitor health check of elasticsearch | Elasticsearch tutorial</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=upvaxy7zj60">What Is Elasticsearch | Elasticsearch Explained | Elasticsearch |</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=3ilTrM7tTWs">Top Elasticsearch Metrics You've Got to Monitor</a>
</p>
