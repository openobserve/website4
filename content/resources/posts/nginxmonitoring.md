---
title: Real-Time Monitoring for NGINX
seoTitle: Real-Time Monitoring for NGINX
description: Discover the power of real-time Nginx monitoring with NGINX Plus,
  streamline configurations, manage upstream servers, and optimize traffic
  analysis.
img: /img/resources/nginx-monitoring-image1.png
alt: Nginx Monitoring
slug: nginxmonitoring
authors:
  - openobserve-team
publishDate: 2024-06-29
tags:
  - nginx monitoring
  - real time monitoring
  - nginx plus monitoring
  - nginx dashboard
  - nginx api
  - nginx metrics
  - http monitoring
  - tcp monitoring
  - upstream monitoring
  - cache monitoring
  - worker monitoring
  - monitoring best practices
  - nginx plus security
  - swagger ui
---
</p>
<h1><strong>Mastering Nginx Monitoring: A Comprehensive Guide to Real-Time Performance Optimization</strong></h1>

<p>
Ah, the digital age – where we want everything fast: fast food, fast cars, and especially, fast websites. And in the marathon to keep our websites zippy, NGINX acts like the premium sports drink, quenching our thirst for speed. But what about making sure this digital sports drink isn't running out? Enter the fascinating world of real-time NGINX monitoring – it's like having a high-tech hydration check for your web infrastructure. <br><br>As a powerful web server and reverse proxy, NGINX plays a crucial role in delivering seamless user experiences. However, managing and monitoring NGINX can be challenging, especially as your application scales. That's where real-time monitoring comes in.
</p>
<h2><strong>Introduction to Real-Time Monitoring for NGINX</strong></h2>

<p>
Real-time monitoring is essential for maintaining the health and performance of your NGINX web servers. By continuously collecting and analyzing metrics in real-time, you can proactively identify and resolve issues before they impact your users. Real-time monitoring enables you to:
</p>
<ul>

<li>Detect and diagnose performance bottlenecks

<li>Identify potential security threats

<li>Optimize resource utilization

<li>Ensure high availability and reliability of your web applications
</li>
</ul>
<p>
NGINX Plus, the commercial version of NGINX, offers advanced monitoring capabilities out of the box. It provides a comprehensive set of tools and features specifically designed to streamline the monitoring process and give you deep visibility into your NGINX server's performance.
</p>
<p>
With NGINX Plus, you gain access to an interactive dashboard, a powerful REST API, and extensive metrics that provide valuable insights into your web infrastructure. By leveraging these monitoring capabilities, you can proactively manage your NGINX servers, ensure optimal performance, and deliver exceptional user experiences.
</p>
<h2><strong>Getting Started with NGINX Plus Monitoring</strong></h2>

<h3><strong>Prerequisites:</strong></h3>

<p>
Before embarking on your real-time monitoring journey with NGINX Plus, ensure you have the following prerequisites in place:
</p>
<ul>

<li>NGINX Plus R14 or later installed on your system.

<li>Access to the NGINX Plus configuration files.

<li>Familiarity with NGINX configuration directives.

<li>Enabling Shared Memory Zones for Data Collection
</li>
</ul>
<p>
To unlock the full potential of real-time monitoring, you need to enable shared memory zones in your NGINX Plus configuration. NGINX Plus uses shared memory zones to collect and store valuable metrics related to your servers, upstreams, and caches. Here's how to enable them:
</p>
<p>
1. Open your NGINX Plus configuration file (e.g., /etc/nginx/nginx.conf) using a text editor.
</p>
<p>
2. For each HTTP and TCP server block you want to monitor, add the status_zone directive. This directive specifies the name of the shared memory zone for storing server-related metrics.
</p>

<pre class="prettyprint">server {
  listen 80;
  server_name example.com;
  status_zone server_zone;
  ...
}

  ...
}</pre>

<p>
3. To monitor upstream server groups, add the zone directive to each upstream block. This directive defines the shared memory zone for storing upstream-related metrics.
</p>

<pre class="prettyprint">upstream backend {
  zone backend_zone 64k;
  server backend1.example.com;
  server backend2.example.com;
}</pre>

<p>
4. If you have a cache setup, ensure that you have defined a shared memory zone for caching using the keys_zone parameter in the proxy_cache_path, fastcgi_cache_path, scgi_cache_path, or uwsgi_cache_path directive.
</p>
<p>
proxy_cache_path /path/to/cache keys_zone=cache_zone:10m;
</p>
<p>
5. Save the configuration file after making the necessary changes.<br>
</p>
<h2><strong>Configuring NGINX Plus for Monitoring<br></strong></h2>

<p>
To harness the full monitoring capabilities of NGINX Plus, you need to configure the NGINX Plus API and enable the interactive dashboard. Follow these steps to set up monitoring:
</p>
<p>
1. Open your NGINX Plus configuration file.
</p>
<p>
2. In the http context, add a new server block dedicated to the API and dashboard.
</p>

<pre class="prettyprint">http {
  server {
    listen 8080;
    server_name example.com;
    
    location /api {
      api write=on;
      allow 127.0.0.1;
      deny all;
    }
    
    location = /dashboard.html {
      root /usr/share/nginx/html;
    }
  }</pre>

<p>
  
</p>
<ul>

<li>The api directive enables the NGINX Plus API, and write=on allows write access to the API.

<li>The allow and deny directives restrict access to the API endpoint. Adjust these directives based on your security requirements.

<li>The location = /dashboard.html block specifies the location of the interactive dashboard file.
</li>
</ul>
<p>
3. To secure the API endpoint, you can configure HTTP basic authentication by adding the following directives within the /api location block:
</p>

<pre class="prettyprint">auth_basic "NGINX Plus API";
auth_basic_user_file /path/to/auth/file;</pre>

<p>
Replace /path/to/auth/file with the path to the file containing the username and password for authentication.
</p>
<p>
4. Save the configuration file.
</p>
<p>
5. Test the NGINX Plus configuration for any syntax errors by running the following command:
</p>

<pre class="prettyprint">nginx -t</pre>

<p>
6. If the configuration test is successful, restart NGINX Plus to apply the changes:
</p>

<pre class="prettyprint">nginx -s reload</pre>

<h2><strong>Utilizing the Interactive Dashboard</strong></h2>

<p>

![Utilizing the Interactive Dashboard](/img/resources/nginx-monitoring-image2.png "Utilizing the Interactive Dashboard")

</p>
<p>
One of the standout features of NGINX Plus is its interactive dashboard, which provides a user-friendly interface for monitoring your server's performance. The dashboard offers a wealth of information organized into various tabs, each focusing on specific aspects of your NGINX Plus setup.
</p>
<p>
To access the interactive dashboard, you need to simply open a web browser and navigate to the URL where the dashboard configuration took place (e.g., http://example.com/dashboard.html). 
</p>
<p>
If the system prompts you, you should enter the username and password for authentication.
</p>
<p>
Let's explore the key tabs and metrics available in the dashboard:
</p>
<ul>

<li>HTTP and TCP/UDP Zones: This tab provides detailed performance statistics for your server locations, allowing you to monitor request rates, response codes, and bandwidth usage. It also includes information on request limiting, helping you identify and mitigate potential security threats.<br>

<li>HTTP and TCP/UDP Upstreams: Here, you can access valuable insights into the performance of your upstream server groups. Monitor the health and responsiveness of individual servers, track request distribution, and identify any bottlenecks or overloaded servers.<br>

<li>Caches: If you have caching configured, this tab offers a comprehensive overview of your cache performance. Monitor cache hit ratios, storage utilization, and eviction rates to optimize your caching strategy and improve overall performance.<br>

<li>Shared Zones, Clusters, and Resolvers: Gain visibility into the memory usage of shared zones, monitor the synchronization status across NGINX clusters, and track the performance of your DNS resolvers. This information helps you ensure the smooth operation of your distributed infrastructure.<br>

<li>Workers: Get a detailed breakdown of worker process metrics, including per-worker connection statistics, request processing times, and SSL handshake performance. This tab helps you identify any worker-related issues and optimize resource allocation.
</li>
</ul>
<h2><strong>Customizing the Dashboard for Effective Monitoring</strong></h2>

<p>
To tailor the NGINX Plus dashboard to your specific monitoring needs, consider the following tips:
</p>
<ol>

<li>Prioritize the metrics that are most relevant to your application and infrastructure. Focus on the key performance indicators (KPIs) that directly impact your users' experience.<br>

<li>Create custom dashboards by combining metrics from different tabs to get a holistic view of your system's performance. Use the dashboard's drag-and-drop functionality to arrange the metrics in a way that makes sense for your monitoring workflow.<br>

<li>Set up alerts and thresholds based on your performance goals and service level agreements (SLAs). Configure notifications to be triggered when critical metrics exceed predefined limits, enabling you to proactively address potential issues.<br>

<li>Regularly review and analyze the data presented in the dashboard. Look for trends, patterns, and anomalies that may indicate underlying problems or opportunities for optimization.
</li>
</ol>
<h2><strong>Managing Upstream Servers from the Dashboard</strong></h2>

<p>
NGINX Plus allows you to manage upstream servers directly from the interactive dashboard. You can add, remove, or modify upstream servers on the fly without the need to modify the configuration file. Here's how:
</p>
<ol>

<li>Navigate to the "HTTP Upstreams" or "TCP/UDP Upstreams" tab in the dashboard.

<li>Locate the upstream server group you want to manage.

<li>Click on the "Edit" button next to the upstream server group.

<li>In the edit mode, you can: 
<ol>
 
<li>Add a new server by providing its hostname or IP address and port.
 
<li>Remove an existing server by clicking the "Remove" button next to it.
 
<li>Modify the parameters of an existing server, such as weight, maximum connections, and fail timeout.
</li> 
</ol>

<li>Click "Save" to apply the changes.
</li>
</ol>
<p>
Managing upstream servers from the dashboard provides flexibility and allows you to quickly adapt to changing traffic patterns or server availability without the need for a configuration reload.
</p>
<p>
By leveraging the interactive dashboard and its customization options, you can gain valuable insights into your NGINX Plus server's performance, identify potential issues, e.
</p>
<h2><strong>Leveraging the NGINX Plus REST API</strong></h2>

<p>
In addition to the interactive dashboard, NGINX Plus provides a powerful REST API that allows you to programmatically retrieve metrics, manage upstream servers, and perform advanced monitoring tasks. 
</p>
<p>
The API offers flexibility and automation capabilities, enabling you to integrate NGINX Plus monitoring into your existing toolchain.
</p>
<p>
To leverage the NGINX Plus REST API, you can use tools like <code>curl</code> or any HTTP client library. Here are a few examples of common API requests:
</p>
<p>
1. Retrieve server metrics:
</p>

<pre class="prettyprint">curl -s 'http://example.com/api/9/nginx'</pre>

<p>
This command retrieves general information about the NGINX Plus server, including version, build, and uptime.
</p>
<p>
2, Retrieve upstream group metrics:
</p>

<pre class="prettyprint">curl -s 'http://example.com/api/9/http/upstreams'</pre>

<p>
Use this command to fetch metrics related to your configured upstream server groups, such as the number of active connections, request rates, and response codes.
</p>
<p>
3. Reset cache metrics:
</p>

<pre class="prettyprint">curl -X POST -s 'http://example.com/api/9/http/caches/cache_zone/reset'</pre>

<p>
If you need to reset the metrics for a specific cache zone, use this API request to clear the counters and start fresh.
</p>
<p>
These are just a few examples of the extensive capabilities of the NGINX Plus REST API. Exploring the API documentation and experimenting with different endpoints unlock a wealth of monitoring and management possibilities.
</p>
<h2><strong>Advanced Data Collection Techniques</strong></h2>

<p>
While the interactive dashboard and REST API provide a solid foundation for monitoring NGINX Plus, you can take your data collection to the next level by employing advanced techniques. Consider the following few strategies:
</p>
<ol>

<li><strong>Granular Status Zones</strong>: Use the <code>status_zone</code> directive in specific server and location blocks to collect metrics at a more granular level. 
<p>

```
For example, you can define separate status zones for different API endpoints or static file locations, allowing you to analyze performance metrics specific to those areas.
```

</p>
<ul>

</ul><li><strong>Upstream Server Monitoring</strong>: Dive deeper into upstream server monitoring by enabling health checks and configuring the <code>zone</code> directive for each upstream group. 
<p>

```
This allows you to track the health status, response times, and error rates of individual upstream servers, helping you identify and troubleshoot issues more effectively.
```

</p>


</ul><li><strong>Custom Logging</strong>: Customize your NGINX Plus access logs to include additional metrics and variables relevant to your monitoring needs. 
<p>

```
By capturing specific data points, such as request duration, client IP, or custom headers, you can gain valuable insights into user behavior and application performance.
```

</p>


</ul><li><strong>Third-Party Integrations</strong>: Extend the capabilities of NGINX Plus monitoring by integrating with third-party tools and platforms. 
<p>

```
For example, you can export metrics to popular monitoring solutions like Prometheus, Grafana, or ELK stack, leveraging their powerful visualization and alerting features.
```

</p>
</li>
</ol>
</li>
</ol>
</li>
</ol>
</li>
</ol>
<p>
Combining these advanced data collection techniques with the built-in monitoring features of NGINX Plus lets you create a comprehensive and tailored monitoring solution meeting the unique requirements of your web infrastructure.
</p>
<h2><strong>Integrating OpenAPI and Swagger UI for Enhanced Monitoring</strong></h2>

<p>
OpenAPI and Swagger UI are powerful tools that can enhance your monitoring experience with NGINX Plus. OpenAPI is a specification for describing RESTful APIs, while Swagger UI is an interactive documentation tool that allows you to explore and test APIs.
</p>
<h3><strong>Setting up Swagger UI for NGINX Monitoring</strong></h3>

<p>
To set up Swagger UI for NGINX monitoring, follow these steps:
</p>
<ol>

<li>Download the Swagger UI package from the official website (<a href="https://swagger.io/tools/swagger-ui/">https://swagger.io/tools/swagger-ui/</a>).

<li>Extract the package and copy the contents of the <code>dist</code> directory to a location accessible by NGINX Plus (e.g., <code>/usr/share/nginx/html/swagger-ui/</code>).

<li>Create an OpenAPI specification file (e.g., <code>nginx-api.yaml</code>) that describes the NGINX Plus API endpoints and their parameters. You can use the NGINX Plus API documentation as a reference to create this file.

<li>Update your NGINX Plus configuration to serve the Swagger UI and the OpenAPI specification file:

<pre class="prettyprint">server {
  ...
  
  location /swagger-ui/ {
    alias /usr/share/nginx/html/swagger-ui/;
  }
  
  location /nginx-api.yaml {
    alias /path/to/your/nginx-api.yaml;
  }
  
  ...
}</pre>

</li>
</ol>
<p>
5. Restart NGINX Plus to apply the configuration changes.<br>
</p>
<h3><strong>Operational Benefits of Using Swagger UI with NGINX Plus</strong></h3>

<p>
Using Swagger UI with NGINX Plus provides several operational benefits:
</p>
<ol>

<li><strong>API Exploration</strong>: Swagger UI allows you to interactively explore the NGINX Plus API endpoints, view request and response formats, and understand the available parameters and their usage.

<li><strong>API Testing</strong>: You can use Swagger UI to send test requests to the NGINX Plus API endpoints directly from the browser. This enables you to quickly validate API functionality and troubleshoot issues.

<li><strong>Documentation</strong>: Swagger UI automatically generates interactive documentation based on the OpenAPI specification file. This documentation serves as a valuable reference for developers and administrators working with the NGINX Plus API.

<li><strong>Collaboration</strong>: Swagger UI promotes collaboration among team members by providing a shared interface for exploring and testing the API. It facilitates knowledge sharing and ensures consistent usage of the API across different teams.
</li>
</ol>
<h3><strong>Security Practices for Disabling Swagger UI</strong></h3>

<p>
While Swagger UI is a valuable tool for development and testing, it is recommended to disable it in production environments to reduce the attack surface. To disable Swagger UI, you can:
</p>
<ol>

<li>Remove the Swagger UI-related configuration from your NGINX Plus configuration file.

<li>Restrict access to the Swagger UI and OpenAPI specification file by applying appropriate access controls, such as IP-based restrictions or authentication mechanisms.

<li>Regularly review and update the OpenAPI specification file to ensure it accurately reflects the current state of your NGINX Plus API.
</li>
</ol>
<p>
By integrating OpenAPI and Swagger UI with NGINX Plus, you can enhance the monitoring and management capabilities of your web infrastructure while maintaining security best practices.
</p>
<h2><strong>Best Practices for Real-Time Monitoring with NGINX</strong></h2>

<p>

![Best Practices for Real-Time Monitoring with NGINX](/img/resources/nginx-monitoring-image3.png "Best Practices for Real-Time Monitoring with NGINX")

</p>
<p>
To ensure the effectiveness and reliability of your real-time monitoring setup, consider the following best practices:
</p>
<ol>

<li><strong>Regular Updates</strong>: Keep your NGINX Plus installation up to date with the latest version to benefit from new monitoring features, performance enhancements, and security fixes. Stay informed about release notes and upgrade accordingly.

<li><strong>Security and Access Control</strong>: Implement robust security measures to protect your monitoring endpoints and sensitive data. Use strong authentication mechanisms, such as HTTP basic authentication or SSL/TLS encryption, to prevent unauthorized access. Restrict access to the NGINX Plus API and dashboard to trusted IP ranges or networks.

<li><strong>Performance Tuning</strong>: Regularly review and optimize your NGINX Plus configuration to ensure optimal performance. Fine-tune directive values, such as <code>worker_processes</code>, <code>worker_connections</code>, and buffer sizes, based on your server's resource utilization and traffic patterns. Continuously monitor and adjust these settings as your application evolves.

<li><strong>Alerts and Notifications</strong>: Set up alerts and notifications based on predefined thresholds and critical metrics. Utilize the NGINX Plus API or integrate with external monitoring tools to trigger alerts when key performance indicators (KPIs) deviate from expected values. This allows you to proactively address potential issues before they escalate.

<li><strong>Capacity Planning</strong>: Use the insights gained from real-time monitoring to inform your capacity planning decisions. Analyze historical data, identify usage patterns, and anticipate future growth to ensure your infrastructure can handle increased traffic and user demand. Proactively scale your resources to maintain optimal performance and availability.
</li>
</ol>
<p>
Following these best practices and continuously refining your monitoring strategy helps you maximize the benefits of real-time monitoring with NGINX Plus and ensure the long-term success of your web applications.
</p>
<h2><strong>Integration with OpenObserve</strong></h2>

<p>
To take your NGINX Plus monitoring to the next level, consider integrating with OpenObserve - a powerful observability platform designed to streamline monitoring, troubleshooting, and optimization. OpenObserve seamlessly integrates with NGINX Plus, providing an enhanced monitoring experience with advanced features and insights.
</p>
<p>
Here's how you can integrate OpenObserve with your NGINX Plus setup:
</p>
<ol>

<li>Sign up for an OpenObserve account at<a href="https://openobserve.ai"> https://openobserve.ai</a>.

<li>Install the OpenObserve agent on your NGINX Plus server by following the provided installation instructions.

<li>Configure the OpenObserve agent to collect metrics from your NGINX Plus server by specifying the necessary endpoints and authentication details.

<li>Access the OpenObserve dashboard to visualize and analyze thecollected metrics, set up alerts, and create custom dashboards tailored to your specific monitoring requirements.
</li>
</ol>
<p>
OpenObserve extends the capabilities of NGINX Plus monitoring by providing:
</p>
<ul>

<li><strong>Advanced Analytics</strong>: Gain deeper insights into your NGINX Plus performance with machine learning-powered anomaly detection, identifying potential issues before they impact your users.

<li><strong>Real-Time Notifications</strong>: Stay informed about critical events and performance deviations with real-time notifications delivered through various channels, such as email, Slack, or PagerDuty.

<li><strong>Customizable Dashboards</strong>: Create personalized dashboards that align with your monitoring goals, combining metrics from NGINX Plus with data from other systems and applications for a holistic view of your infrastructure.

<li><strong>Integrations and Ecosystem</strong>: Leverage OpenObserve's extensive integration ecosystem to connect NGINX Plus monitoring with your existing tools, such as log management systems, APM solutions, and incident management platforms.
</li>
</ul>
<p>
By integrating OpenObserve with NGINX Plus, you can unlock a new level of visibility, insights, and control over your web infrastructure, empowering you to deliver exceptional user experiences and maintain optimal performance.
</p>
<h2>
    <strong>Troubleshooting Common Monitoring Challenges</strong></h2>

<p>
Even with a robust monitoring setup, you may encounter challenges along the way. Here are a few common issues and their troubleshooting steps:
</p>
<ol>

<li><strong>Data Accuracy and Latency</strong>: Noticing discrepancies in the collected metrics or experiencing latency in data updates should prompt you to verify that your shared memory zones are properly configured. 
<p>

```
Ensure that the <code>status_zone</code> and <code>zone</code> directives are correctly placed in your NGINX Plus configuration. Adjust the data collection intervals to align with your monitoring requirements.
```

</p>


</ul><li><strong>Configuration Errors</strong>: If you encounter issues with your monitoring setup, double-check your NGINX Plus configuration for any syntax errors or misconfigurations. 
<p>

```
Use the NGINX Plus configuration tester (<code>nginx -t</code>) to validate your configuration before reloading. Verify that the necessary directives, such as <code>api</code> and <code>status_zone</code>, are correctly defined.
```

</p>


</ul><li><strong>Connectivity Issues</strong>: If you experience connectivity problems between your monitoring tools and the NGINX Plus API or dashboard, investigate network-related issues. 
<p>

```
Ensure that the monitoring endpoints are accessible from the relevant systems and that firewall rules allow the necessary traffic. Verify that the authentication credentials are correctly configured.
```

</p>


</ul><li><strong>Performance Impact</strong>: Monitoring activities can introduce additional overhead to your NGINX Plus server. If you notice performance degradation or increased resource consumption, review your monitoring configuration and optimize it accordingly. 
<p>

```
Consider adjusting the frequency of data collection, enabling caching for frequently accessed metrics, or offloading monitoring tasks to dedicated servers.
```

</p>


</ul><li><strong>Ensuring Continuous Monitoring During High Traffic</strong>: To maintain reliable monitoring even during periods of high traffic, consider the following strategies: 
<ul>
 
<li>Implement load balancing for your monitoring infrastructure to distribute the monitoring workload across multiple servers.
 
<li>Optimize your monitoring configuration to minimize the impact on server performance. Adjust the frequency of data collection and consider using sampling techniques to reduce the monitoring overhead.
 
<li>Leverage caching mechanisms to store frequently accessed metrics and reduce the load on the monitoring system.
 
<li>Set up dedicated monitoring instances or separate monitoring infrastructure to isolate monitoring tasks from production traffic.
</li> 
</ul>
</li> 
</ol>
</li> 
</ol>
</li> 
</ol>
</li> 
</ol>
</li> 
</ol>
<p>
Approaching monitoring challenges systematically is essential when troubleshooting. Start by isolating the problem, reviewing logs, and gathering relevant information. Consulting the NGINX Plus documentation, community forums, or seeking assistance from NGINX support channels can provide further guidance and solutions.
</p>
<h2><strong>Conclusion</strong></h2>

<p>
Real-time monitoring is a game-changer for optimizing the performance and reliability of your NGINX Plus-powered web infrastructure. By leveraging the powerful monitoring capabilities, interactive dashboards, and REST API provided by NGINX Plus, you gain deep visibility into your server's behavior, enabling you to proactively identify and resolve issues.
</p>
<p>
By implementing real-time monitoring with NGINX Plus and following the guidance provided in this article, you can unlock the full potential of your web infrastructure, ensuring optimal performance, scalability, and user satisfaction.
</p>
<p>
Take the first step towards revolutionizing your NGINX Plus monitoring approach by signing up for a free trial of<a href="https://openobserve.ai"> OpenObserve</a> and experiencing the benefits firsthand. With OpenObserve's seamless integration and advanced features, you can streamline your monitoring efforts, gain actionable insights, and drive continuous improvement.
</p>
<p>
Don't wait until performance issues impact your users. Embrace real-time monitoring with NGINX Plus today and embark on a journey of optimized web infrastructure management. Stay proactive, stay informed, and deliver exceptional digital experiences with confidence.
</p>
