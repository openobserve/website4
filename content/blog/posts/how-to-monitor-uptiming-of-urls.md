---
title: "Uptime Monitoring Made Easy: SSL and URL Checks with OpenTelemetry"
seoTitle: "uptime monitoring setup with opentelemetry for free"
description: Learn how to ensure reliable uptime monitoring with SSL and URL checks. Discover the importance of proactive monitoring, set up OpenTelemetry Collector's HTTP Check Receiver, use a custom Go program for SSL monitoring, and visualize data in OpenObserve dashboards for actionable insights.
img: /img/blog/uptime-monitoring/uptime_monitor_flow.gif
alt: how-to-monitor-uptiming-of-urls
slug: how-to-monitor-uptiming-of-urls
authors: 
  - chaitanya
publishDate: 2024-12-23
tags:
  - Uptime
  - SSL
  - Uptime Monitoring
  - SSL Check
  - Application Uptime
  - URL status
---

# How to Ensure Reliable Uptime Monitoring with SSL and URL Checks 

Whether you're running an e-commerce platform, a SaaS product, or an informational website, ensuring your services remain operational is critical. This is where uptime monitoring comes into play, and when paired with SSL checks, it becomes a comprehensive approach to maintaining a secure and reliable web presence.

## What is Uptime Monitoring?

Uptime monitoring involves tracking the availability and performance of your services, such as websites or APIs, to ensure they are operational for users. By regularly checking the status and response time of endpoints, it helps identify outages or performance degradation before users are affected. The key components of uptime monitoring include:

* **Service Availability:** Verifying if the service is up and running.  
* **Response Time:** Measuring how quickly the service responds.  
* **Downtime Tracking:** Monitoring periods when the service is unavailable.

## Why is Uptime Monitoring Important?

Downtime can have severe consequences for businesses:

1. **Revenue Loss:** Even a few minutes of downtime can lead to lost sales.  
2. **User Frustration:** Poor reliability erodes user trust and drives them to competitors.  
3. **Reputation Damage:** Downtime can tarnish your brand's image.  
4. **SLA Compliance:** Failure to meet uptime commitments in Service Level Agreements (SLAs) can lead to penalties.

Proactive monitoring minimizes these risks by providing early alerts and actionable insights to address issues promptly.

## Using OpenTelemetry Collector for Uptime Monitoring

The [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) is a versatile tool for collecting and processing observability data. The `httpcheckreceiver` in the Collector’s contrib repository simplifies uptime monitoring by performing HTTP checks for specified endpoints.

### Setting Up the HTTP Check Receiver

1. **Install the OpenTelemetry Collector Contrib:** Download and install the Collector 
```
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.116.1/otelcol-contrib_0.116.1_linux_amd64.deb.
```

2. **Configure the HTTP Check Receiver:** Create a configuration file (`/etc/otelcol-contrib/config.yaml`) with the following example:

```
receivers:
  httpcheck:
    targets:
      - endpoint: https://netflix.com
        method: GET
      - endpoint: https://expired.badssl.com
        method: GET
      - endpoint: https://self-signed.badssl.com
        method: GET
      - endpoint: https://untrusted-root.badssl.com
        method: GET
    collection_interval: 30s

exporters:
  otlphttp/openobserve:
    endpoint: OPENOBSERVE_ENDPOINT
    headers:
      Authorization: OPENOBSERVE_TOKEN
      stream-name: OPENOBSERVE_STREAM

service:
  pipelines:
    metrics:
      receivers: [httpcheck]
      exporters: [otlphttp/openobserve]
```
Make sure to replace *OPENOBSERVE_ENDPOINT*, *OPENOBSERVE_TOKEN* and *OPENOBSERVE_STREAM* with your platform's details that are found within OpenObserve data sources section and adjust `collection_interval: 30s` as needed.
![uptime dashboard](/img/blog/uptime-monitoring/data_source.jpeg)

3. **Restart the Collector:**

```
systemctl restart otelcol-contrib
```

This configuration will check the availability of all the added URLs and send metrics to OpenObserve.

4. **Verify the Metrics**

Make sure the streams are created and you are able to see them in the dashboard.

![uptime dashboard](/img/blog/uptime-monitoring/metrics.png)

## Building Dashboards in OpenObserve

With data ingested from the OpenTelemetry Collector and the Go program, you can create insightful dashboards in OpenObserve:

1. **Status Overview:** Display the uptime and SSL status of all monitored endpoints.  
2. **Response Time Trends:** Graph average and peak response times over time.  
3. **SSL Alerts:** Highlight certificates nearing expiry.

Additionally, you can download our pre built dashboards from [here](https://github.com/openobserve/dashboards/blob/main/Uptime_Monitor/Uptime_Monitoring_Dashboard.json).

![uptime dashboard](/img/blog/uptime-monitoring/uptime_go_dashboard.gif)

Example Panels:

* Table listing top 10 status codes.  
* Bar chart for downtime occurrences.  
* Table listing SSL expiry details.
* Status indicator such as 🔴🟢.

## Conclusion

Combining uptime monitoring with SSL checks ensures your services are not only available but also secure. By leveraging the OpenTelemetry Collector, you can create a robust monitoring system that integrates seamlessly with OpenObserve. Start implementing these tools today to proactively address issues and maintain a reliable web presence.

[Get started with our cloud version](https://cloud.openobserve.ai/) to monitor your applications and their SSL validity checks. 