---
title: "How to Monitor Nginx in Real-Time: Step-by-Step Guide for Tracking Logs, Metrics, and Performance Insights"
seoTitle: "Nginx Log Monitoring with OpenObserve and Fluentbit: Real-Time Logs, and Performance Insights"
description: Learn how to monitor Nginx logs in real-time with this step-by-step guide, covering essential techniques for tracking logs, metrics, and performance insights. Discover best practices to optimize Nginx performance, troubleshoot issues faster, and ensure high availability by gaining actionable visibility into your web server’s health.
img: /img/blog/monitor-nginx-with-fluentbit-and-openobserve/Nginx.gif
alt: how-to-monitor-nginx-with-fluentbit-and-o2
slug: how-to-monitor-nginx-with-fluentbit-and-o2
authors: 
  - chaitanya
publishDate: 2024-11-11
tags:
  - nginx  
  - Real-time  
  - fluentbit  
  - openobserve
  - observability
  - monitoring
  - audit logs
---

In this hands-on guide, we’ll explore how to set up monitoring for NGINX using OpenObserve, capturing real-time metrics, logs, and performance insights. This is crucial for system administrators and developers looking to track NGINX performance, diagnose issues, and maintain the reliability of their applications.

What do we cover?

* The importance of NGINX monitoring.  
* How to configure NGINX for logging and metrics collection.  
* Setting up Fluent Bit to forward NGINX logs to OpenObserve.  
* Generating and viewing real-time logs in OpenObserve.

So let’s get going\!

## Why Monitor NGINX?

Monitoring NGINX is essential for understanding how your web server is performing and identifying issues before they impact users. Real-time monitoring provides crucial insights into various aspects of your server's operation. Let's explore the key metrics and their importance:

| Metric | Importance |
| :---- | :---- |
| Request Rate | Indicates server load and traffic patterns |
| Response Time | Measures server performance and user experience |
| Error Rate | Highlights potential issues or misconfigurations |
| Bandwidth Usage | Helps in capacity planning and optimization |
| Active Connections | Shows concurrent users and server capacity |

By tracking these metrics, you can:

1. **Optimize Performance:** Monitor page load times and response statuses to ensure optimal user experience.  
2. **Identify Bottlenecks:** Pinpoint potential issues in resource handling and request processing.  
3. **Analyze User Behavior:** Gain visibility into traffic patterns and user interactions through log analysis.  
4. **Enhance Reliability:** Catch and resolve errors early, minimizing downtime and service disruptions.  
5. **Plan for Growth:** Use bandwidth and connection data to make informed decisions about scaling your infrastructure.

Real-time monitoring of these key metrics allows you to maintain a high-performing, reliable NGINX server that can handle your application's demands efficiently.

### Prerequisites

* A MacBook with Homebrew installed.  
* Docker (for running OpenObserve).  
* Basic knowledge of NGINX and Fluent Bit.

*If you would like to explore Nginx observability with Vector and interested in applying VRL functions, you can always refer to this [blog](https://openobserve.ai/blog/nginx-log-management-from-data-collection-to-insightful-analysis).*

## Step 1: Install NGINX on Your MacBook

If NGINX is not already installed, use Homebrew to install it:

```
brew install nginx
```

Once installed, start NGINX using it by entering below command:

```
sudo nginx
```

You can verify that it’s running by accessing [http://localhost:8080](http://localhost:8080) in your browser.

![nginx home](/img/blog/monitor-nginx-with-fluentbit-and-openobserve/image5.png)

## Step 2: Configure NGINX for Logging

To capture detailed logs for monitoring, we’ll configure NGINX to log requests in JSON format.

1. ### Open the NGINX configuration file

```
# use vi or nano or anything you prefer to edit
sudo vi /opt/homebrew/etc/nginx/nginx.conf
```

2. ### Add the following log format under the http block

Below confirguration tell nginx to write logs in JSON format instead of it’s default format. Doing this makes log analysis a lot easy and you do not need to do anything more to parse the logs before analysis.

You should do this always whenever you setup nginx to make your life easier.

```
log_format json_combined escape=json '{"@timestamp":"$time_iso8601",'
'"remote_addr":"$remote_addr",'
'"request":"$request",'
'"status":"$status",'
'"body_bytes_sent":"$body_bytes_sent",'
'"http_referer":"$http_referer",'
'"http_user_agent":"$http_user_agent"}';

access_log /opt/homebrew/var/log/nginx/access.log json_combined;
```

3. ### Save and exit the file. Restart NGINX to apply the changes

```
sudo nginx -s reload
```

## Step 3: Install and Configure Fluent Bit

Let’s set up Fluent Bit to collect the NGINX logs and forward them to OpenObserve.

1. ### Install Fluent Bit using Homebrew

```
brew install fluent-bit
```

2. ### Create a Fluent Bit configuration file (nginx-fluent-bit.conf)

```
vi nginx-fluent-bit.conf#Add the following configuration to read the NGINX access log and send to o2[INPUT]
    Name tail
    Path /opt/homebrew/var/log/nginx/access.log
    Parser json
    Tag nginx-access
    DB /var/log/fluent-bit-nginx-access.db
    Mem_Buf_Limit 5MB
    Skip_Long_Lines On

[OUTPUT]
  Name http
  Match *
  URI /api/default/default/_json #/api/<org>/<stream>/_json
  Host localhost
  Port 5080
  tls Off
  Format json
  Json_date_key    _timestamp
  Json_date_format iso8601
  HTTP_User test@example.com
  HTTP_Passwd <your password>
  compress gzip
```

To obtain the fluent-bit configuration for ingestion, please go to Ingestion \-\> custom \-\> logs \-\> FluentBit

*The password shown in the image is a local test password.*  
![o2 fluentbit](/img/blog/monitor-nginx-with-fluentbit-and-openobserve/image1.png)

3. ### Now start the fluentbit with this configuration

```
fluent-bit -c nginx-fluent-bit.conf
```

![start fluentbit](/img/blog/monitor-nginx-with-fluentbit-and-openobserve/image2.png)

## Step 4: Generate NGINX Logs

To test your setup and generate some log data, you can create a script to send repeated requests to the NGINX server.

1. ### Create a load generation script

```
vi nginx-load.sh
```

2. ### Add the following content to simulate 1000 requests

```
#!/bin/bash
for i in {1..1000}
do
  curl -s http://localhost:8080 > /dev/null
  echo "Request $i sent."
  sleep 0.1
done
```

3. ### Make the script executable 

```
chmod +x nginx-load.sh
```

4. ### Run the script to generate logs

```
sh nginx-load.sh
```

As the script runs, you will generate log entries in the NGINX access log, which Fluent Bit will forward to OpenObserve.

![script runs](/img/blog/monitor-nginx-with-fluentbit-and-openobserve/image4.png)

## Step 5: Set Up OpenObserve

If you don’t have OpenObserve running, you can set it up quickly using the below script to auto start everything. The below script can automate end to end setup.

[https://github.com/openobserve/rum-demo/blob/main/openobserve-setup/setup\_openobserve.sh](https://github.com/openobserve/rum-demo/blob/main/openobserve-setup/setup_openobserve.sh)

*If you want to set up OpenObserve from scratch you can always visit [here](https://openobserve.ai/docs/quickstart/) for more detailed steps.*  
   
Make sure OpenObserve is accessible at [http://localhost:5080](http://localhost:5080)

![o2 dashboard](/img/blog/monitor-nginx-with-fluentbit-and-openobserve/image3.png)

## Step 6: Verify Logs in OpenObserve

Now that logs are being forwarded to OpenObserve, you can verify that the data is arriving and being ingested properly.

1. Log into your OpenObserve instance by navigating to [http://localhost:5080](http://localhost:5080)   
2. In the dashboard, search for logs with the tag nginx-access that you configured in Fluent Bit.

You should see log entries similar to the following:

```
{
  "_timestamp": 1729109276178847,
  "log": {
    "@timestamp": "2024-10-16T15:07:55-05:00",
    "remote_addr": "127.0.0.1",
    "request": "GET / HTTP/1.1",
    "status": "200",
    "body_bytes_sent": "615",
    "http_referer": "",
    "http_user_agent": "curl/8.7.1"
  }
}
```

![nginx logs](/img/blog/monitor-nginx-with-fluentbit-and-openobserve/image6.png)

## Unlocking Powerful NGINX Insights with OpenObserve

By integrating NGINX with OpenObserve, you've established a robust, real-time monitoring system that provides deep insights into your web server's performance. This setup allows you to track crucial metrics, analyze logs, and respond quickly to any issues that arise.

With the power of OpenObserve's customizable dashboards and alerting capabilities, you're now equipped to:

* Proactively identify and address performance bottlenecks  
* Enhance security by monitoring suspicious activity patterns  
* Optimize resource allocation based on traffic patterns  
* Improve user experience by minimizing downtime and errors

As you continue to work with this setup, consider exploring advanced features like anomaly detection and integrating additional data sources to create a comprehensive observability solution for your entire infrastructure.

Remember, effective monitoring is an ongoing process. Regularly review and refine your dashboards, alerts, and log analysis techniques to ensure you're always getting the most valuable insights from your NGINX monitoring setup with [OpenObserve](https://openobserve.ai/).