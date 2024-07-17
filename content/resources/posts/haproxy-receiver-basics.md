---
title: HAProxy Receiver Basics
seoTitle: HAProxy Receiver Basics
description: The blog provides an overview of HAProxy Receiver, its role as a
  traffic distributor, and its importance in high availability setups.
img: /img/resources/haproxy-receiver-image1.png
alt: HAProxy Receiver
slug: haproxy-receiver-basics
authors:
  - openobserve-team
publishDate: 2024-07-18
tags:
  - HAProxy Receiver
  - load balancing
  - HTTP traffic management
  - network traffic distribution
  - high availability
---
<p>
Have you ever wondered how big websites stay up during traffic spikes? HAProxy is free and open-source software that is a reliable, high-performance load balancer and proxy for TCP and HTTP applications. It’s compatible with many operating systems (Linux, FreeBSD, Solaris), so it’s a good choice for many server environments.
</p>
<p>
One of the main reasons HAProxy Receiver is so popular is that it can distribute incoming traffic across multiple backend servers. This means no single server gets overwhelmed with requests, downtime is prevented, and resources are used optimally. This is especially important in high-traffic environments where even a small hiccup can cause big problems.
</p>
<p>
Many high-traffic companies such as Airbnb, GitHub, and Reddit have reportedly used HAProxy at various points for managing service uptime.
</p>
<h2><strong>Load Balancing 101</strong></h2>

<p>

![Load Balancing 101](/img/resources/haproxy-receiver-image2.png "Load Balancing 101")

</p>
<p>
A load balancer acts as a traffic manager for your web servers, distributing incoming network traffic across multiple servers to ensure no single server is overwhelmed, thereby enhancing performance and reliability.
</p>
<p>
There are a few different types of load balancing:
</p>
<ol>

<li><strong>No Load Balancing (Direct Server Access):</strong> This is where all traffic is directed to a single server. While it's the simplest approach, it can lead to bottlenecks and single points of failure.

<li><strong>Layer 4 Load Balancing</strong>: Operating at the transport layer, Layer 4 load balancers route traffic based on IP addresses and TCP/UDP ports. They are efficient and generally faster but lack granular control over HTTP/HTTPS requests.

<li><strong>Layer 7 Load Balancing</strong>: This type of load balancing operates at the application layer, allowing for more sophisticated routing decisions based on content, such as URLs, cookies, or HTTP headers. While it offers more control, it can be more resource-intensive.
</li>
</ol>
<p>
HAProxy Receiver is versatile, providing both Layer 4 and Layer 7 load-balancing capabilities, making it a robust choice for managing web traffic. By distributing traffic efficiently, HAProxy helps prevent downtime and ensure that your web applications remain responsive under heavy loads.
</p>
<h2><strong>Configuring HAProxy Reciever</strong></h2>

<p>
Setting up HAProxy involves tweaking its configuration file (haproxy.cfg). Here’s a simple guide to get you started:
</p>
<p>
<strong>Listening IP Address and Port</strong>: This is where HAProxy receives incoming traffic. You define this in the frontend section of your haproxy.cfg file.<br>
</p>

<pre class="prettyprint">frontend myfrontend
  # Set the proxy mode to http (layer 7) or tcp (layer 4)
  mode http
   
  # Receive HTTP traffic on all IP addresses assigned to the server at port 80
  bind :80
   
  # Choose the default pool of backend servers
  default_backend web_servers</pre>

<p>
In this example, HAProxy is set to listen for HTTP traffic on port 80 and direct it to a default backend.
</p>
<p>
<strong>Defining a Backend Pool</strong>: These are the servers that handle the actual requests. You list them in the backend section.
</p>

<pre class="prettyprint">backend servers
    server server1 192.168.1.1:80 check
    server server2 192.168.1.2:80 check</pre>

<p>
Each server in the backend pool has a health check enabled, ensuring that HAProxy only sends traffic to healthy servers.
</p>
<p>
<strong>Configuring Frontends and Backends</strong>: The frontend receives requests, and the backend processes them. You can direct specific types of traffic to different backends based on the rules you set.
</p>

<pre class="prettyprint">frontend http-in
    bind *:80
    acl url_static path_beg /static
    use_backend static_servers if url_static
    default_backend servers</pre>

<p>
This configuration directs requests with the path beginning /static to a separate backend for static content.
</p>
<p>
<strong>Load Balancing Algorithms</strong>: HAProxy supports multiple traffic distribution algorithms, which help in optimizing server resource use and enhancing availability. Understanding these algorithms helps you select the right one for your specific needs. Here are some common load-balancing algorithms supported by HAProxy:
</p>
<p>
<strong>Round Robin</strong>:
</p>
<ul>

<li><strong>Description</strong>: Distributes requests evenly across all servers in the backend pool in a rotating fashion.

<li><strong>Use Case</strong>: Ideal for situations where all servers have roughly equal capacity, and there are no significant differences in the workload handled by each server.
</li>
</ul>
<p>
<strong>Leastconn</strong>:
</p>
<ul>

<li><strong>Description</strong>: Sends traffic to the server with the fewest active connections. This is particularly useful when the load on servers can vary significantly.

<li><strong>Use Case</strong>: Beneficial for applications where connections have varying durations, such as database servers or services with long-lived connections.
</li>
</ul>
<p>
<strong>Source</strong>:
</p>
<ul>

<li><strong>Description</strong>: It can route traffic based on the client’s IP address, which helps ensure that the same client is always directed to the same server. This technique is also called session persistence or sticky sessions.

<li><strong>Use Case</strong>: Useful for applications where maintaining session state on the same server is important, such as user login sessions in web applications.
</li>
</ul>
<p>
<strong>Example for setting an algorithm:</strong>
</p>

<pre class="prettyprint">backend servers
    balance roundrobin
    server server1 192.168.1.1:80 check
    server server2 192.168.1.2:80 check</pre>

<h2><strong>Advanced Configuration Techniques</strong></h2>

<p>

![Advanced Configuration Techniques](/img/resources/haproxy-receiver-image3.jpg "Advanced Configuration Techniques")

</p>
<p>
HAProxy receiver offers a variety of advanced configuration options to enhance traffic management control. These techniques can help you tailor your load-balancing setup to meet specific requirements and ensure optimal performance and reliability. Below are some key advanced configuration techniques you can use with HAProxy.
</p>
<h3><strong>Access Control Lists (ACLs)</strong></h3>

<p>
Access Control Lists (ACLs) allow you to define rules for routing traffic based on specific conditions. This enables more granular control over how requests are handled.
</p>
<p>
<strong>Example: Defining ACLs</strong>
</p>

<pre class="prettyprint">frontend http-in
    bind *:80
    acl url_blog path_beg /blog
    use_backend blog_server if url_blog
    default_backend servers</pre>

<p>
In this example, requests to the /blog path are directed to a specific backend (blog_server), while all other requests are sent to the default backend (servers).
</p>
<h3><strong>Handling Edge Cases</strong></h3>

<p>
Edge cases may require particular traffic management rules. You can use ACLs and other configuration options to address these scenarios.
</p>
<p>
<strong>Example: Handling Admin Traffic</strong>
</p>

<pre class="prettyprint">frontend http-in
    bind *:80
    acl url_admin path_beg /admin
    acl is_admin hdr_end(host) -i admin.mysite.com
    use_backend admin_servers if url_admin or is_admin</pre>

<p>
This configuration routes traffic to the /admin path or traffic directed to admin.mysite.com to a dedicated backend (admin_servers).
</p>
<h3><strong>Sticky Sessions</strong></h3>

<p>
Sticky sessions ensure that users are consistently routed to the same server during their session. This is crucial for applications that store session data locally.
</p>
<p>
<strong>Example: Configuring Sticky Sessions</strong>
</p>

<pre class="prettyprint">backend servers
    balance roundrobin
    cookie SERVERID insert indirect nocache
    server server1 192.168.1.1:80 check cookie s1
    server server2 192.168.1.2:80 check cookie s2</pre>

<p>
In this configuration, a cookie (SERVERID) is used to maintain session persistence, ensuring that each user is directed to the same server for the duration of their session.
</p>
<h3><strong>Health Checks</strong></h3>

<p>
Regular health checks ensure that HAProxy Receiver only routes traffic to healthy backend servers. This improves the reliability and availability of your services.
</p>
<p>
<strong>Example: Basic Health Checks</strong>
</p>

<pre class="prettyprint">backend servers
    server server1 192.168.1.1:80 check
    server server2 192.168.1.2:80 check</pre>

<p>
In this example, HAProxy performs basic health checks on the backend servers to ensure they are up and running.
</p>
<p>
Also check out this: <a href="https://openobserve.ai/blog/observability-platforms">Top 10 Observability tools for 2024</a>
</p>
<p>
Now that you know the basics, let’s look at some advanced configuration techniques to optimize your setup further.
</p>
<h2><strong>HAProxy High Availability</strong></h2>

<p>
To ensure your load balancing setup is robust, you should run multiple HAProxy receiver instances. When you do it this way, if one instance fails, others can take over, maintaining service availability. Here are some strategies for achieving high availability:
</p>
<p>
<strong>Redundancy</strong>: Deploy multiple HAProxy instances across different servers or locations. Tools like Keepalived can be used alongside HAProxy to manage Virtual Router Redundancy Protocol (VRRP), aiding in the failover process and ensuring high availability.
</p>

<pre class="prettyprint">vrrp_script chk_haproxy {
    script "pidof haproxy"
    interval 2
}

vrrp_instance VI_1 {
    interface eth0
    state MASTER
    virtual_router_id 51
    priority 101
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass yourpassword
    }
    virtual_ipaddress {
        192.168.1.100
    }
    track_script {
        chk_haproxy
    }
}</pre>

<ol>

<li>This Keepalived configuration sets up a virtual IP that fails over between HAProxy instances if one fails.

<li>It’s best to continuously monitor the health of your HAProxy instances and backend servers. You can configure HAProxy to send alerts if a server goes down or if there’s an unusual traffic pattern.
</li>
</ol>
<p>
Using these techniques, you can create a reliable and resilient load-balancing setup that can handle high traffic volumes without breaking a sweat.
</p>
<h2><strong>Conclusion</strong></h2>

<p>
This guide has covered the basics of setting up and configuring HAProxy receiver to manage web traffic efficiently. But there’s so much more to explore! HAProxy is a powerful tool with a wealth of advanced features and configurations that can help you optimize your infrastructure even further.
</p>
<p>
For instance, you can delve into:
</p>
<ul>

<li>SSL Termination and Offloading: Offload SSL to HAProxy and reduce the load on your backends and certificate management.

<li>Advanced Logging and Monitoring: Log everything and monitor traffic, performance, and problems in real-time.

<li>Rate Limiting and Throttling: Limit the number of requests to your servers from traffic spikes or abuse.

<li>Content Switching and Caching: Serve cached content or switch backends based on request content and reduce response time and resources.
</li>
</ul>
<p>
Experience the power of real-time observability! Get comprehensive monitoring, real-time alerts, easy integration, and scalability. Visit <a href="https://cloud.openobserve.ai/">OpenObserve </a>now to get started.
</p>
