---
title: 'Nginx Log Management: From Data Collection to Insightful Analysis'
seoTitle: Nginx Log Management with OpenObserve and Vector:From Data Collection to Analysis
description: This blog guides you through effective Nginx log management and analysis using OpenObserve and Vector, providing insights on enhancing observability and streamlining your logging process.
img: /img/blog/nginx_blog/1-flow-diagram.png 
alt: Nginx log management and analysis using OpenObserve and Vector
slug: nginx-log-management-from-data-collection-to-insightful-analysis
authors: 
  - Sampath
publishDate: 2024-10-29
tags:
  - nginx
  - openobserve
  - vector
  - observability
  - log management
  - vrl
---


In modern infrastructure, observability plays a crucial role in monitoring the health and performance of services. Nginx, as one of the most popular web servers, generates access logs that provide valuable insights into traffic, requests, and errors. By forwarding Nginx logs to a centralised observability platform like OpenObserve and using a log processing tool such as Vector, you can gain deeper insights into your web traffic and server performance.

### In this blog, we will cover:
- A brief overview of Nginx, Vector and OpenObserve
- Installing Nginx, Vector, and OpenObserve.
- How to send Nginx logs to OpenObserve using Vector.
- Applying VRL functions to Nginx logs
- Associating VRL Functions with Data Streams
- Dashboards in OpenObserve
- Conclusion.

### Prerequisites:
- A running Linux instance (for this demo, we will use Ubuntu).
- Admin access to install and configure Nginx and Vector.
- An OpenObserve instance or cloud account ready to receive logs.

## A Brief overview of Nginx, Vector, VRL and OpenObserve

**Nginx:** 

Nginx is a high-performance web server and reverse proxy server renowned for its ability to handle a large number of simultaneous connections efficiently. It is widely used for serving static content, load balancing, and as a reverse proxy for web applications. NGINX also features powerful capabilities for managing traffic, enhancing security, and providing SSL termination, making it a popular choice for modern web applications.

**Vector:**

Vector is an open-source data pipeline tool designed for building high-performance data ingestion and processing systems. It can collect, transform, and route data from various sources to multiple destinations. Vector excels in handling logs, metrics, and events, providing real-time visibility into system performance. Its lightweight architecture and extensible nature make it suitable for both edge and cloud environments.

**VRL (Vector Remap Language):**

VRL, or Vector Remap Language, is a powerful scripting language used to transform and
manipulate data as it flows through the pipeline. With VRL, users can easily define rules for
parsing, filtering, and enriching log and metric data, allowing for highly customizable data
processing. Its expressive syntax enables users to create complex transformations with
ease, making it a valuable tool for optimising data handling in Vector.

**OpenObserve:** 

OpenObserve is an observability tool that captures logs, metrics, and traces, providing comprehensive insights into system performance and behaviour. It helps users monitor and analyse their applications, enabling proactive troubleshooting and optimization. OpenObserve's intuitive interface and robust querying capabilities allow for efficient data exploration, making it a valuable solution for teams seeking to enhance their observability strategy.

## Installing Nginx, Vector, and OpenObserve

### Step 1: Install Nginx
First, we will install Nginx, which is a lightweight and highly scalable web server.
```
sudo apt update
sudo apt install nginx -y
```
Create a simple **index.html** page
```
echo "Hello World from Nginx" | sudo tee /var/www/html/index.html

```
Let us start and enable the Nginx service:
```
sudo systemctl start nginx 
sudo systemctl enable nginx
```
Ensure that the necessary ports are open to allow external access to the NGINX server. Depending on where your server is hosted.

In my case, since I’m using AWS, I updated the security group associated with my instance.I made sure to open **port 80** (HTTP) to allow inbound traffic from anywhere **(0.0.0.0/0)** so the NGINX server can be accessed publicly.

Verify Nginx is running by visiting **http://<your_server_ip>** in your browser. You should see the **"Hello World from Nginx"** page.

![nginx_home_page](/img/blog/nginx_blog/2-hello-world.jpg)

### Step 2: Generating Logs
To generate access logs, we need to simulate traffic to the NGINX server. You can open multiple browsers or different devices and visit the server's IP address multiple times to create some activity.

#### For example:
- Open Google Chrome and go to **http://<your_server_ip>**
- Open Firefox and go to the same address.
- If you have another device (e.g., a phone or tablet), access the server from there.

Each time you access the server, NGINX will generate logs in the **/var/log/nginx/access.log** file. 

You can view the logs by running:
```
tail -f /var/log/nginx/access.log
```
![nginx_logs](/img/blog/nginx_blog/3-tail-access-log.jpg)

### Step 3: Install Vector
Vector is a lightweight and highly performant observability data pipeline used to collect, transform, and route logs, metrics, and traces.
You can install Vector on a separate server or on the same one running NGINX. I’m installing it on the NGINX instance for simplicity.

To install Vector, run the following commands:

First, add the Vector repo:
```
bash -c "$(curl -L https://setup.vector.dev)"
```
Then you can install the vector package:
```
sudo apt-get install vector
```
Once Vector is installed, let’s check to make sure that it’s working correctly:
```
vector --version
```
![vector_version](/img/blog/nginx_blog/4-version.jpg)

### Step 4: Install OpenObserve
OpenObserve is a robust observability platform that collects and analyses logs, metrics, and traces in real-time. In this demo, we’ll proceed with a self-hosted installation of OpenObserve on a separate server.

Use the following command to download the latest version of OpenObserve for your platform:
```
curl -L https://raw.githubusercontent.com/openobserve/openobserve/main/download.sh | sh
```
Once downloaded run it using the below command:
```
ZO_ROOT_USER_EMAIL="root@example.com" ZO_ROOT_USER_PASSWORD="Complexpass#123" ./openobserve
```
Make sure that **port 5080** is open to allow external access to the server.
Now point your browser to **http://localhost:5080** and log in with the following credentials
- user email: root@example.com
- Password: Complexpass#123
![O2_login_page](/img/blog/nginx_blog/5-login.jpg)
![O2_Home_page](/img/blog/nginx_blog/6.jpg)

Here, you can start collecting and analysing logs, metrics, and traces in real-time. Explore the platform to gain insights into your system’s performance!

## Sending Nginx Logs to OpenObserve Using Vector

Now, let's configure Vector to access the NGINX access and error logs by creating a configuration file that will send these logs to OpenObserve.

### Step 1: Configure Vector

Create a new configuration file for Vector at **/etc/vector/vector.toml** with the following content:
```
[sources.nginx] 
type = "file" 
include = ["/var/log/nginx/access.log", "/var/log/nginx/error.log"]

[sinks.zinc]
type = "http"
inputs = ["nginx"]
uri = "http://3.109.1.66:5080/api/default/default/_json"
method = "post"
auth.strategy = "basic"
auth.user = "root@example.com"
auth.password = "grhlU2znTKtiDT0T"
compression = "gzip"
encoding.codec = "json"
encoding.timestamp_format = "rfc3339"
healthcheck.enabled = false

```
#### This configuration:
- Collects logs from Nginx’s access log and error logs 
- Sends the parsed logs to OpenObserve via HTTP.

You can get the sink configurations from OpenObserver under the Ingestion/ Custom/ Logs/ vector section. 
![vector_config](/img/blog/nginx_blog/7.jpg)

### Step 2: Run Vector with a Custom Config File
Once your done with the vector.toml file run the following command:
```
sudo vector --config /etc/vector/vector.toml
```
The above command will run Vector manually using the specified configuration file.
If everything is configured correctly, logs should start appearing in OpenObserve in real-time.

![O2_streams](/img/blog/nginx_blog/8-streams.jpg)

To query the logs in OpenObserve, navigate to the Logs section, select the desired stream and time range, and then click Run Query.

![O2_log_output](/img/blog/nginx_blog/9.jpg)
Select or click on any record to view the Source Details.
![O2_log_outputs](/img/blog/nginx_blog/10-log-output.jpg)

This log entry provides detailed information about an HTTP request made to the Nginx server, including the requester's IP address, the requested resource, the response status, and the user agent string. This information is valuable for monitoring and analysing web traffic.

## Applying VRL functions to Nginx logs
Once the Nginx logs are successfully ingested into OpenObserve via Vector, you can enhance the logs further using Vector Remap Language (VRL). This allows for custom transformations and enrichments to make your logs more insightful and actionable. 

We'll discuss how to apply VRL functions for enriching, redacting, and transforming data.

### Enriching Logs
Enriching refers to the process of enhancing raw log data by extracting additional information or structuring it in a way that makes it more useful for analysis. This often involves parsing fields from unstructured text into a structured format that includes relevant metadata.
```
.nginx = parse_nginx_log!(.message, "combined")
```
This line enriches the log entry by parsing the message field, which contains the raw log, into a structured format that can include fields such as the request method, status code, and response time. This structured data is easier to query and analyse in observability platforms.

![O2_log_enrichment](/img/blog/nginx_blog/11-enriches.jpg)
![log_enrichment](/img/blog/nginx_blog/12-enriches-ex.jpg)

### Redacting Sensitive Information
Redacting is the process of removing or obscuring sensitive information from log data to protect privacy and security. This is particularly important for fields that may contain personally identifiable information (PII) or other sensitive data that should not be exposed in logs.
```
.host = redact!(.host, filters: [r'\d+'], redactor: {"type": "text", "replacement": "***"})
```
This line redacts numeric values in the host field by replacing them with asterisks. 
By doing so, it prevents sensitive information about the host from being exposed in the logs, thereby enhancing data security.

![log_redacting](/img/blog/nginx_blog/13-redact.jpg)
![log_redacting_ex](/img/blog/nginx_blog/14-redact-ex.jpg)

### Transforming
Transforming encompasses a variety of operations that modify the structure or content of log data.This can include deleting unnecessary fields, renaming fields, or modifying data types. Transformations help to streamline log data, making it more relevant and easier to work with.
```
del(.message)
```
This line deletes the original message field from the log entry. By removing this unnecessary data, the log becomes cleaner and focuses on the most relevant fields for analysis, thereby improving readability and efficiency. 

![log_transforming](/img/blog/nginx_blog/15-del.jpg)
![log_transforming_ex](/img/blog/nginx_blog/16-del-ex.jpg)

## Associating VRL Functions with Data Streams
In OpenObserve, you can save VRL (Vector Remap Language) functions and apply them to data streams in real-time. This enables dynamic data transformation during log ingestion, eliminating the need to process data only at query time. 

Here's a step-by-step guide on saving and associating a VRL function for real-time log processing:
### Step 1: Saving the VRL Function
![vrl_function](/img/blog/nginx_blog/17-fx-1.jpg)

First, let’s create a function called "nginx_logs"
![vrl_function_1](/img/blog/nginx_blog/18-fx-2.jpg)

Go to the Pipelines section and click on the Functions tab. You should see "nginx_logs" listed, confirming that the function has been successfully saved. 
![vrl_function_2](/img/blog/nginx_blog/19-fx-3.jpg)

### Step 2: Associating the Function with a Data Stream

Go to the Stream Association section and link the saved "nginx_logs" function to your target data stream.
![vrl_function_3](/img/blog/nginx_blog/20-fx-4.jpg)
This setup will enable automatic data processing for all logs coming from the stream associated with your Nginx server.

![vrl_function_4](/img/blog/nginx_blog/21-fx-5.jpg)

### Step 3: Generate Logs for Testing

To test the setup, access your Nginx server by visiting **http://<your_server_ip>** multiple times. This will generate access logs that should now undergo real-time transformation as they are ingested into OpenObserve.
![vrl_function_5](/img/blog/nginx_blog/22-nginxoutput.jpg)

### Step 4: Querying and Verifying Real-Time Processing

Select one minute time range and run a query to view the logs.
![vrl_function_6](/img/blog/nginx_blog/23-real-time-logs.jpg)
You’ll notice that VRL functions are now being applied in real-time to the ingested logs.

![vrl_function_7](/img/blog/nginx_blog/24-output.jpg)

## Dashboards in OpenObserve
OpenObserve dashboards are powerful tools for visualising and analysing data from various sources, like logs, metrics, and traces. 

This dashboard shows peak message activity during specific times of the day, with the highest volume around midday, helping to identify periods of high user engagement.
![O2_dashboard](/img/blog/nginx_blog/25-dashboard.jpg)

## Conclusion
Integrating Nginx with Vector and OpenObserve enhances log management and analysis, offering insights into traffic and server performance to optimise applications. By enriching logs with custom VRL functions, this strategy improves visibility while safeguarding sensitive 

