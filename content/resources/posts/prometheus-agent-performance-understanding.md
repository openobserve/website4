---
title: Understanding Prometheus Agent Mode and Its Performance
seoTitle: Understanding Prometheus Agent Mode and Its Performance
description: Learn about the Prometheus agent mode, a solution for efficient
  metric shipping at remote locations, with improved scalability and
  performance.
img: /img/resources/understanding-prometheus-agent-mode-and-its-performance.png
alt: prometheus agent
slug: prometheus-agent-performance-understanding
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - prometheus agent
  - Prometheus performance
---
<p><span style="font-weight: 400;">The Prometheus agent is a game-changer in efficient metric collection at remote locations. Traditional Prometheus setups work well in centralized environments, but they often fall short when dealing with the complexities of edge networks or dynamic clusters. This is where Prometheus agent mode steps in, offering a solution tailored for environments that demand low resource consumption and efficient data transfer.</span></p>

<p><span style="font-weight: 400;">In this blog, you will explore how the Prometheus agent optimizes metric shipping for remote locations and the key differences between the agent mode and the standard server mode.</span></p>

<h2><strong>Prometheus Agent Mode: Optimizing Metric Shipping for Remote Locations</strong></h2>

<p><span style="font-weight: 400;">Prometheus agent mode is designed to transform how you handle metric collection in resource-constrained environments like remote locations, edge clusters, and serverless infrastructures. Traditional Prometheus setups, which scrape, store, and serve metrics locally, often struggle with the overhead and storage needs in these challenging environments. Prometheus agent mode addresses these issues by offering a lightweight, efficient solution.</span></p>

<h3><span style="font-weight: 400;">Overview of Prometheus Agent Mode</span></h3>

<p><span style="font-weight: 400;">In agent mode, Prometheus strips down its full server functionality to focus solely on forwarding collected metrics to a remote location for storage and analysis. Instead of storing and querying metrics locally, the agent collects and ships them to a central system. This design is ideal for environments where local storage is limited or where reliable metric transfer across network boundaries is crucial.</span></p>

<h3><span style="font-weight: 400;">Optimizing Metric Shipping for Remote Locations</span></h3>

<p><span style="font-weight: 400;">Managing metrics in remote or edge locations often involves unstable network connections and limited resources. The Prometheus agent mode solves these challenges by minimizing resource usage and optimizing metric shipping. Traditional scrapers are ineffective in environments with inconsistent connectivity, but Prometheus agent mode streamlines the process, reducing overhead and ensuring your data reaches the central monitoring system efficiently and reliably.</span></p>

<p><span style="font-weight: 400;">By adopting Prometheus agent mode, you can optimize performance in remote environments while maintaining the accuracy and efficiency of your metric collection processes. This approach ensures that your metrics are always available for analysis, even in the most challenging conditions.</span></p>

<h3><span style="font-weight: 400;">Comparison with Standard Prometheus Server Mode</span></h3>

<table>

<tbody>

<tr>

<td>

<p><strong>Feature</strong></p>

</td>

<td>

<p><strong>Prometheus Server Mode</strong></p>

</td>

<td>

<p><strong>Prometheus Agent Mode</strong></p>

</td>

</tr>

<tr>

<td>

<p><strong>Storage</strong></p>

</td>

<td>

<p><span style="font-weight: 400;">Local time series storage</span></p>

</td>

<td>

<p><span style="font-weight: 400;">No local storage</span></p>

</td>

</tr>

<tr>

<td>

<p><strong>Quering</strong></p>

</td>

<td>

<p><span style="font-weight: 400;">Built-in querying capabilities</span></p>

</td>

<td>

<p><span style="font-weight: 400;">No querying capabilities</span></p>

</td>

</tr>

<tr>

<td>

<p><strong>Resource Use&nbsp;</strong></p>

</td>

<td>

<p><span style="font-weight: 400;">High resource usage for storage and queries</span></p>

</td>

<td>

<p><span style="font-weight: 400;">Low resource usage</span></p>

</td>

</tr>

<tr>

<td>

<p><strong>Best Use Case</strong></p>

</td>

<td>

<p><span style="font-weight: 400;">Centralized metric collection and querying</span></p>

</td>

<td>

<p><span style="font-weight: 400;">Efficient metric shipping at remote locations</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">While the full server mode is ideal for centralized deployments, the Prometheus agent mode excels in edge scenarios where the overhead of storage and querying is unnecessary. It&rsquo;s optimized for remote metric shipping, freeing your system to focus on collecting real-time data without bogging down your infrastructure.</span></p>

<p><span style="font-weight: 400;">Next, you'll explore why traditional push and pull models fail in resource-constrained environments and how the Prometheus agent improves resource efficiency, making it an essential solution for edge networks.</span></p>

<h2><strong>Why are Traditional Push and Pull Models Inefficient?</strong></h2>

<p><span style="font-weight: 400;">In traditional monitoring setups, push and pull models gather metrics from systems. While effective in centralized environments, these methods fall short when applied to more complex architectures like edge networks or serverless functions.</span></p>

<ol>

<li style="font-weight: 400;">

<h3><span style="font-weight: 400;">Issues With Scraping Across Network Boundaries</span></h3>

</li>

</ol>

<p><span style="font-weight: 400;">Pulling metrics from remote locations involves crossing multiple network boundaries, often leading to unreliable data collection. Network inconsistencies or high latency can cause gaps in metric collection, resulting in incomplete or delayed data.</span></p>

<ol>

<li style="font-weight: 400;">

<h3><span style="font-weight: 400;">Limitations of Pushing Metrics Directly From Applications</span></h3>

</li>

</ol>

<p><span style="font-weight: 400;">Pushing metrics from applications might seem like a good alternative, but it often adds complexity. Applications need to manage the additional task of exporting data, which increases resource usage and can create bottlenecks, especially in environments with limited computational capacity.</span></p>

<ol>

<li style="font-weight: 400;">

<h3><span style="font-weight: 400;">Serverless Functions and Short-lived Containers: Challenges</span></h3>

</li>

</ol>

<p><span style="font-weight: 400;">Traditional models struggle even more in environments running serverless functions or short-lived containers. These systems are ephemeral, making it difficult for Prometheus to scrape metrics before they disappear. This results in missed data, leaving blind spots in your monitoring system.</span></p>

<p><span style="font-weight: 400;">The Prometheus agent addresses these issues by providing a more efficient solution. It allows you to collect metrics in resource-constrained environments and transmit them reliably to a central server without the pitfalls of traditional methods.</span></p>

<h2><strong>3 Key Benefits of Using the Agent Mode</strong></h2>

<ul>

<li style="font-weight: 400;"><strong>Efficiency</strong><span style="font-weight: 400;">: The agent mode reduces resource usage by removing unnecessary features like local time series storage and querying, making it much lighter to run in constrained environments.</span></li>

<li style="font-weight: 400;"><strong>Scalability</strong><span style="font-weight: 400;">: By offloading storage and querying to a centralized location, the agent can focus entirely on collecting and forwarding metrics, enabling better horizontal scalability, especially in distributed systems.</span></li>

<li style="font-weight: 400;"><strong>Simplicity</strong><span style="font-weight: 400;">: Since it operates with a narrower focus, setting up and managing the </span><strong>Prometheus agent</strong><span style="font-weight: 400;"> is simpler compared to the full server, allowing for quick deployment in dynamic environments.</span></li>

</ul>

<p><span style="font-weight: 400;">In the next section, you'll explore how Prometheus agent enhances resource efficiency for remote locations and why it's crucial for edge networks.</span></p>

<h2><strong>Remote Write Efficiency of Prometheus Agent Mode</strong></h2>

<p><span style="font-weight: 400;">One of the standout features of the Prometheus agent mode is its ability to optimize resource usage by focusing solely on metric collection and forwarding, rather than handling storage and querying like the full server mode. This makes it ideal for environments with limited local resources, such as edge networks or remote locations.</span></p>

<h3><span style="font-weight: 400;">Optimizing Resource Usage with Agent Mode</span></h3>

<p><span style="font-weight: 400;">The Prometheus agent eliminates the need for local storage and query handling, drastically reducing the resource overhead. Limiting its scope to remote write tasks consumes less CPU, memory, and disk space compared to the full Prometheus server mode.&nbsp;</span></p>

<p><span style="font-weight: 400;">This allows the agent to function smoothly in resource-constrained environments, such as IoT devices, edge clusters, or remote locations with limited infrastructure.</span></p>

<h3><span style="font-weight: 400;">Advantages of Reduced Feature Overhead</span></h3>

<ul>

<li style="font-weight: 400;"><strong>Less Resource Intensive</strong><span style="font-weight: 400;">: Since the agent doesn&rsquo;t handle storage or queries, it requires fewer system resources, making it more suitable for lightweight deployments.</span></li>

<li style="font-weight: 400;"><strong>Improved Scalability</strong><span style="font-weight: 400;">: The agent can scale more effectively across multiple edge clusters by offloading storage and visualization tasks to a central system.</span></li>

<li style="font-weight: 400;"><strong>Simplicity</strong><span style="font-weight: 400;">: The agent mode's reduced complexity makes configuration and management more accessible, allowing teams to focus on collecting metrics without worrying about storage limitations.</span></li>

</ul>

<h3><span style="font-weight: 400;">Practical Implications for Remote Metric Collection</span></h3>

<p><span style="font-weight: 400;">When metrics are collected from remote locations or edge networks, efficient shipping of these metrics to a central location is crucial. The Prometheus agent uses the remote write protocol to send metrics directly to a remote storage system. This ensures that the data collected from various locations can be centrally stored and analyzed without burdening the local infrastructure.</span></p>

<h3><span style="font-weight: 400;">Introducing OpenObserve as a Remote Write Target</span></h3>

<p><span style="font-weight: 400;">For teams looking to scale their metric collection and offload storage tasks, </span><strong>OpenObserve</strong><span style="font-weight: 400;"> provides a powerful solution. This flexible and scalable platform can serve as a remote write target for metrics gathered by the Prometheus agent. With </span><strong>OpenObserve</strong><span style="font-weight: 400;">, you can offload heavy storage and visualization tasks while maintaining a lightweight Prometheus deployment at the edge.</span></p>

<p><span style="font-weight: 400;">Integrating this solution ensures long-term storage of metrics and advanced visualization options. Here&rsquo;s a simple configuration example for writing Prometheus metrics to </span><strong>OpenObserve</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; scrape_interval: </span><span style="font-weight: 400;">15</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">remote_write:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - url: </span><span style="font-weight: 400;">"https://openobserve-instance-url/v1/metrics"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; basic_auth:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; username: </span><span style="font-weight: 400;">"your-username"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; password: </span><span style="font-weight: 400;">"your-password"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This setup sends your collected metrics to </span><strong>OpenObserve</strong><span style="font-weight: 400;">, where they are stored and visualized. This provides a scalable, long-term solution for monitoring and analysis.</span></p>

<p><span style="font-weight: 400;">By offloading storage and visualization to </span><strong>OpenObserve</strong><span style="font-weight: 400;">, the Prometheus agent can remain focused on efficient metric collection, while still allowing you to maintain full visibility into your systems.</span></p>

<p><em><span style="font-weight: 400;">Sign up for </span></em><strong><em>OpenObserve</em></strong><em><span style="font-weight: 400;"> today and unlock the potential of streamlined metric shipping and storage for your Prometheus setup.</span></em><a href="https://openobserve.ai/"> <em><span style="font-weight: 400;">Sign up here</span></em></a><em><span style="font-weight: 400;">.</span></em></p>

<p><span style="font-weight: 400;">Are you now wondering how the Prometheus agent enhances horizontal scalability, especially in environments with fluctuating workloads? Read on!</span></p>

<p><strong>Read more on how to </strong><a href="https://openobserve.ai/blog/send-metrics-using-kube-prometheus-stack-to-openobserve"><strong>Send Kubernetes Metrics Using Prometheus to OpenObserve</strong></a></p>

<h2><strong>Horizontal Scalability with Agent Mode</strong></h2>

<p><span style="font-weight: 400;">When it comes to scaling metric ingestion, the Prometheus agent mode offers significant advantages over the traditional Prometheus server mode. Designed for remote locations and edge networks, it enables efficient, auto-scalable metric ingestion, ensuring that metrics from multiple clusters or edge nodes are collected seamlessly.</span></p>

<h3><span style="font-weight: 400;">Enabling Auto-Scalable Metric Ingestion</span></h3>

<p><span style="font-weight: 400;">In Prometheus agent mode, the focus is on scalability. The agent can efficiently scale across multiple edge clusters or environments by eliminating local storage and query handling. Auto-scaling in Prometheus agent mode allows you to adjust the number of agents based on workload dynamically. This is particularly useful in environments with fluctuating metrics, such as cloud-native applications or IoT devices.</span></p>

<p><span style="font-weight: 400;">Here&rsquo;s an example of how to configure auto-scaling with Prometheus agent mode using Kubernetes.</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">apiVersion: </span><span style="font-weight: 400;">apps/v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">kind: </span><span style="font-weight: 400;">Deployment</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">metadata:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; name: </span><span style="font-weight: 400;">prometheus-agent</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">spec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; replicas: </span><span style="font-weight: 400;">3</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; template:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; spec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; containers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - name: </span><span style="font-weight: 400;">prometheus-agent</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; image: </span><span style="font-weight: 400;">prom/prometheus:latest</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; args:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; -</span> <span style="font-weight: 400;">--config.file=/etc/prometheus/prometheus.yml</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; -</span> <span style="font-weight: 400;">--storage.tsdb.retention=15d</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; -</span> <span style="font-weight: 400;">--web.enable-lifecycle</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">---</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">apiVersion: </span><span style="font-weight: 400;">autoscaling/v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">kind: </span><span style="font-weight: 400;">HorizontalPodAutoscaler</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">metadata:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; name: </span><span style="font-weight: 400;">prometheus-agent-hpa</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">spec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; scaleTargetRef:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; apiVersion: </span><span style="font-weight: 400;">apps/v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; kind: </span><span style="font-weight: 400;">Deployment</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; name: </span><span style="font-weight: 400;">prometheus-agent</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; minReplicas: </span><span style="font-weight: 400;">1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; maxReplicas: </span><span style="font-weight: 400;">10</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; targetCPUUtilizationPercentage: </span><span style="font-weight: 400;">50</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This setup ensures that your Prometheus agent automatically scales based on the current load, enabling efficient metric ingestion.</span></p>

<h3><span style="font-weight: 400;">Advantages over Traditional Prometheus Server Mode</span></h3>

<p><span style="font-weight: 400;">Compared to the full server mode, the Prometheus agent mode is designed with edge deployments in mind. The traditional Prometheus server handles both metric collection and storage, which can quickly overwhelm local resources in edge networks. In contrast, the agent mode:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Uses fewer resources</strong><span style="font-weight: 400;">: With no local storage or query handling, the agent consumes less CPU, memory, and disk space.</span></li>

<li style="font-weight: 400;"><strong>Scales effortlessly</strong><span style="font-weight: 400;">: The agent's lightweight nature allows for better horizontal scalability, ideal for edge and IoT applications.</span></li>

</ul>

<h3><span style="font-weight: 400;">Case Studies Illustrating Scalability Improvements</span></h3>

<p><span style="font-weight: 400;">Several organizations have successfully implemented Prometheus agent mode in edge networks. For instance, a global logistics company deployed the Prometheus agent across its edge clusters to monitor thousands of IoT devices in real time. Utilizing the agent's lightweight design reduced the resource burden on local systems and improved metric collection speed, ultimately reducing downtime by 15%.</span></p>

<p><span style="font-weight: 400;">Another example comes from a cloud provider managing multiple edge clusters. They implemented auto-scaling in Prometheus agent mode to dynamically adjust the number of agents based on workload. This allowed them to scale from 5 to 50 agents without affecting system performance or increasing resource consumption.</span></p>

<h3><span style="font-weight: 400;">OpenObserve: Enhancing Scalability with Long-Term Storage</span></h3>

<p><span style="font-weight: 400;">One key component of scaling efficiently is offloading the storage of metrics to a dedicated system. This is where </span><strong>OpenObserve</strong><span style="font-weight: 400;"> shines. By integrating </span><strong>OpenObserve</strong><span style="font-weight: 400;"> as a remote write target, you can manage large datasets across multiple clusters while keeping the Prometheus agent lightweight and focused on metric collection.</span></p>

<p><span style="font-weight: 400;">Here&rsquo;s a configuration snippet to send metrics to </span><strong>OpenObserve</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; scrape_interval: </span><span style="font-weight: 400;">15</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">remote_write:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - url: </span><span style="font-weight: 400;">"https://openobserve-instance-url/v1/metrics"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; basic_auth:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; username: </span><span style="font-weight: 400;">"your-username"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; password: </span><span style="font-weight: 400;">"your-password"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Integrating with </span><strong>OpenObserve </strong><span style="font-weight: 400;">allows you to scale your metric collection system while maintaining long-term storage and visualization capabilities. This setup ensures efficient scaling without compromising on data visibility.</span></p>

<p><em><span style="font-weight: 400;">Start scaling your metrics with </span></em><strong><em>OpenObserve</em></strong><em><span style="font-weight: 400;"> today.</span></em><a href="https://cloud.openobserve.ai/"><em><span style="font-weight: 400;"> Explore more</span></em></a><em><span style="font-weight: 400;">.</span></em></p>

<h2><strong>How to Use Prometheus Agent Mode?</strong></h2>

<p><span style="font-weight: 400;">Let&rsquo;s walk through how to configure and enable the Prometheus agent, adjust its web UI, and set it up for real-time metric collection with </span><strong>OpenObserve</strong><span style="font-weight: 400;">.</span></p>

<ol>

<li style="font-weight: 400;">

<h3><span style="font-weight: 400;">Configuring and Enabling Agent Mode</span></h3>

</li>

</ol>

<p><span style="font-weight: 400;">To start with Prometheus agent mode, you&rsquo;ll need to modify your configuration to enable it. Here&rsquo;s how you can configure it for both edge networks and on-premise environments.</span></p>

<p><span style="font-weight: 400;">For an edge network, focus on lightweight data collection:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; scrape_interval: </span><span style="font-weight: 400;">15</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">scrape_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - job_name: </span><span style="font-weight: 400;">'edge-cluster'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; static_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - targets: </span><span style="font-weight: 400;">\['localhost:9100']</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">agent_mode: </span><span style="font-weight: 400;">true</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this example:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">scrape_interval</span><span style="font-weight: 400;">: Defines how often metrics are collected.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">scrape_configs</span><span style="font-weight: 400;">: Configures the specific jobs (in this case, metrics from an edge node).</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">agent_mode</span><span style="font-weight: 400;">: This option enables Prometheus to run in agent mode, stripping away local storage and query handling to prioritize metric collection.</span></li>

</ul>

<p><span style="font-weight: 400;">For on-premise environments, you can adjust the setup to scale across multiple services:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; scrape_interval: </span><span style="font-weight: 400;">10</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">scrape_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - job_name: </span><span style="font-weight: 400;">'on-premise'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; static_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - targets: </span><span style="font-weight: 400;">['node1:9100',</span> <span style="font-weight: 400;">'node2:9100']</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">agent_mode: </span><span style="font-weight: 400;">true</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;">

<h3><span style="font-weight: 400;">Adjusting the Web UI for Agent Operations</span></h3>

</li>

</ol>

<p><span style="font-weight: 400;">While in </span><strong>agent mode</strong><span style="font-weight: 400;">, you&rsquo;ll notice that some features of the Prometheus Web UI are disabled, such as the local query engine and time-series data visualization. However, you can still use the Web UI for checking configuration and health status. To access the Web UI, simply open the following in your browser:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">http://&lt;prometheus-agent-ip&gt;:9090</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">You'll be able to monitor your agents' status and see whether they're connected properly for remote write tasks.</span></p>

<ol>

<li style="font-weight: 400;">

<h3><span style="font-weight: 400;">Hands-on Tutorial: Setting Up Prometheus Agent Mode</span></h3>

</li>

</ol>

<p><span style="font-weight: 400;">Here&rsquo;s a step-by-step guide on configuring Prometheus agent mode for real-time metric collection and storage with </span><strong>OpenObserve</strong><span style="font-weight: 400;">.</span></p>

<h4><strong>Step 1: Configure Prometheus Agent Mode to Write Metrics to OpenObserve</strong></h4>

<p><span style="font-weight: 400;">Once the Prometheus agent is collecting metrics, the next step is to configure it to send the data to </span><strong>OpenObserve</strong><span style="font-weight: 400;"> for long-term storage and visualization. Here&rsquo;s a sample configuration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; scrape_interval: </span><span style="font-weight: 400;">15</span><span style="font-weight: 400;">s</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">scrape_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - job_name: </span><span style="font-weight: 400;">'edge-services'</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; static_configs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; - targets: </span><span style="font-weight: 400;">\['localhost:9100']</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">agent_mode: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">remote_write:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - url: </span><span style="font-weight: 400;">"https://openobserve-instance-url/v1/metrics"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; basic_auth:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; username: </span><span style="font-weight: 400;">"your-username"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; password: </span><span style="font-weight: 400;">"your-password"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this setup:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The </span><span style="font-weight: 400;">remote_write</span><span style="font-weight: 400;"> section ensures all metrics are sent to </span><strong>OpenObserve</strong><span style="font-weight: 400;"> for visualization and long-term analysis.</span></li>

<li style="font-weight: 400;"><strong>OpenObserve</strong><span style="font-weight: 400;"> provides a scalable solution for offloading storage and ensuring that your Prometheus agent remains lightweight.</span></li>

</ul>

<h4><strong>Step 2: Visualize Data in OpenObserve</strong></h4>

<p><span style="font-weight: 400;">Once the metrics flow to </span><strong>OpenObserve</strong><span style="font-weight: 400;">, you can use its powerful dashboard capabilities to visualize real-time metrics and trends. Dashboards can be easily configured to monitor system health, application performance, or specific metrics from edge clusters or on-premise servers.</span></p>

<p><strong>OpenObserve</strong><span style="font-weight: 400;"> supports real-time monitoring and allows teams to track long-term trends and optimize their infrastructure based on historical data.</span></p>

<p><a href="https://cloud.openobserve.ai/"><em><span style="font-weight: 400;">Sign up for </span></em><strong><em>OpenObserve</em></strong><em><span style="font-weight: 400;"> today</span></em></a><em><span style="font-weight: 400;"> to streamline your monitoring process.</span></em></p>

<h2><strong>Conclusion</strong></h2>

<p><span style="font-weight: 400;">Prometheus agent mode brings a powerful solution for environments requiring efficient metric shipping, especially in edge and remote locations. By optimizing resource usage, reducing overhead, and enabling auto-scalable metric ingestion, Prometheus agent mode proves essential for modern cloud and edge architectures.</span></p>

<p><span style="font-weight: 400;">Integrating Prometheus agent mode with </span><strong>OpenObserve</strong><span style="font-weight: 400;"> takes your monitoring capabilities to the next level. With </span><strong>OpenObserve</strong><span style="font-weight: 400;">, you can offload heavy metric storage and gain deep insights through real-time visualizations, allowing you to focus on scaling your infrastructure without worrying about performance bottlenecks.</span></p>

<p><span style="font-weight: 400;">Whether you&rsquo;re working in edge networks or multi-cloud environments, </span><strong>OpenObserve</strong><span style="font-weight: 400;"> ensures your monitoring is efficient, scalable, and easy to manage.</span></p>

<p><em><span style="font-weight: 400;">Ready to get started?</span></em><a href="https://cloud.openobserve.ai/"> <em><span style="font-weight: 400;">Sign up for OpenObserve</span></em></a><em><span style="font-weight: 400;">, or explore more at</span></em><a href="https://openobserve.com"> <em><span style="font-weight: 400;">OpenObserve's Website</span></em></a><em><span style="font-weight: 400;">. You can also dive into the code on</span></em><a href="https://github.com/openobserve"> <em><span style="font-weight: 400;">GitHub</span></em></a><em><span style="font-weight: 400;">.</span></em></p>
