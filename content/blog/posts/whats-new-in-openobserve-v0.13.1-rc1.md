---
title: What's New in OpenObserve v0.13.1-rc1
seoTitle: new release details for OpenObserve v0.13.1-rc1
description: Discover the latest release of OpenObserve, version 0.13.1-rc1! Enjoy faster search speeds, advanced dashboard features, enhanced alerting with multiple time range and VRL support, and optimized performance. Experience next-level observability with these powerful updates and more in OpenObserve 0.13.1-rc1.
alt: OpenObserve
slug: whats-new-in-openobserve-v0.13.1-rc1
authors: 
  - manas
publishDate: 2024-11-01   
tags:
  - observability
  - openobserve
  - release
  - performance
---

We're excited to announce the latest release of OpenObserve, version **0.13.1-rc1**! This update brings significant enhancements, including faster search speeds, new dashboard features, improved alerts with multiple time range support and VRL, optimized performance, and many more exciting updates that elevate observability to the next level.


> Download [OpenObserve v0.13.1-rc1](https://github.com/openobserve/openobserve/tree/v0.13.1-rc1)

## Features in Tracing and Logging

OpenObserve v0.13.1-rc1 brings significant enhancements to unified tracing and logging, empowering seamless observability.

### Seamless Trace and Log Correlation

View logs directly from the traces screen with our intuitive "View Logs" button. This effortless correlation streamlines troubleshooting, allowing you to:

- Quickly identify log-trace relationships
- Analyze log data in context
- Enhance issue resolution efficiency

![image](/img/blog/release_v0.13.1-rc1/image4.png)

### Advanced Traces Sidebar

Unlock in-depth analysis with our revamped Traces Sidebar. Key features include:

- **Span-Links Tab**: Explore associated traces for comprehensive insights
- Simplified navigation for faster root cause analysis

![image](/img/blog/release_v0.13.1-rc1/image1.png)

### Efficient Logs and Traces Attributes Management

Optimize organization parameters with:

- `trace_id` and `span_id`: Streamline log and trace data management
- Enhanced filtering and search 

![image](/img/blog/release_v0.13.1-rc1/image7.png)

## Enhancements for OpenObserve Dashboards and Visualizations

OpenObserve v0.13.1-rc1 introduces significant enhancements, elevating dashboard customization, data visualization, and interactive exploration for developers.

### Revolutionized Table Panels

Introducing flexible configuration options:

- **Transpose**: Effortlessly pivot data for optimal visualization.
- **Dynamic Columns**: Automatically generate columns based on query results.

### Intelligent Time Management

Select relative time periods with our custom date-time picker. Compare data points across chosen time ranges with enhanced time shift functionality.

### Enhanced Data Visualization

Experience refined query metadata warning handling and optimized data management with time shift support.

### Advanced Chart Capabilities

Unlock improved label sizing, stacked chart rendering, and precise pie chart customization with new functions: **getLargestLabel**, **largestStackLabel**, and **getPieChartRadius**.

## Alerts and Destinations

OpenObserve v0.13.1-rc1 revolutionizes alert management, ensuring timely insights for proactive decision-making.

### Enhanced Alerting Capabilities

Define alerts with unparalleled flexibility using:

- **Multiple Time Range Support**: Set custom time ranges (e.g., 15-minute intervals) for alert rules to capture transient issues.
- **VRL Support**: Leverage Vector Remodeling Language for sophisticated alert logic, enabling conditional statements and data manipulation.  
  *Example*: Trigger alerts when CPU usage exceeds 80% for 5 consecutive minutes.

![custom alert screen](/img/blog/release_v0.13.1-rc1/image2.jpg)

### Streamlined Notification Management

Simplify alert destination setup with:

- **Email Button**: Effortless notification configuration via email.
- **Intuitive Interface**: Rapidly manage alert destinations, minimizing false positives and notification fatigue.

![image](/img/blog/release_v0.13.1-rc1/image6.png)

For advanced alert configurations and best practices, refer to our [Alerting Documentation](https://openobserve.ai/docs/user-guide/alerts/alerts/).

---

## User Experience Enhancements

OpenObserve v0.13.1-rc1 revolutionizes user experience for effortless workflows.

### Search Smarter

Revisit previous log searches instantly with **Log Search History**. Combine with **Short URL Sharing** for seamless team collaboration.

![image](/img/blog/release_v0.13.1-rc1/image5.png)

### Analyze with Flexibility

Effortlessly switch between **Raw JSON Data** views (unflattened and flattened) for tailored insights.

![image](/img/blog/release_v0.13.1-rc1/image8.png)
![image](/img/blog/release_v0.13.1-rc1/image3.png)

### Precision Time Control

Refine searches with **Second-Unit Search Time Range** for pinpoint accuracy.

---

## Turbocharged Performance

OpenObserve v0.13.1-rc1 supercharges search and query performance. Unleash efficient, high-speed data retrieval, empowering rapid troubleshooting and optimized system performance.

### Faster Search and Querying

Unlock high-speed data retrieval through:

- **Concurrent Multi-Threading**: Leader nodes leverage multiple threads.
- **Strategic Caching**: Follower nodes store frequently accessed data.
- **Data Efficiency**: Essential file IDs minimize data transfer.

*File list queries execute up to 5x faster.*

### Optimized Query Performance

Experience lightning-fast queries through:

- **Inverted Index Optimization**
- **Concurrent Querying and Smart Caching**
- **Enhanced Partition Query Performance** with precision filtering and null value support

### Intelligent Indexing

Prefix Partition Key Support and Inverted Index Optimization ensure:

- Reduced data usage (up to 70%)
- Enhanced indexing efficiency

*Turbocharged query execution, minimized storage requirements.*

---

## Learn More About OpenObserve v0.13.1-rc1

Dive deeper into OpenObserve v0.13.1-rc1's features and enhancements through our comprehensive [documentation](https://openobserve.ai/docs/), detailed [changelog](https://github.com/openobserve/openobserve/compare/v0.13.0...v0.13.1-rc1), and [What's New guide](https://github.com/openobserve/openobserve/releases/tag/v0.13.1-rc1). These resources provide an in-depth understanding of the latest updates.

## Join the [OpenObserve Community](https://zincobserve.slack.com/join/shared_invite/zt-11r96hv2b-UwxUILuSJ1duzl_6mhJwVg#/shared-invite/email)

Share insights, discuss best practices, and explore innovative integration methods within our [Slack Community!](https://zincobserve.slack.com/join/shared_invite/zt-11r96hv2b-UwxUILuSJ1duzl_6mhJwVg#/shared-invite/email)

## Upgrade to OpenObserve v0.13.1-rc1

Download OpenObserve v0.13.1-rc1 from the [releases](https://github.com/openobserve/openobserve/releases) page or refer to our [Getting Started](https://openobserve.ai/docs/getting-started/) guide for seamless transitions from earlier versions.

Sign up for a free trial of OpenObserve on our [website](https://openobserve.ai/). Want to self-host or contribute? Check out our [GitHub repository](https://github.com/openobserve/) to explore self-hosting options and help grow the community.

## Heartfelt Thanks to Our Community

We deeply appreciate your invaluable contributions, from code enhancements and insightful feedback to unwavering passion. Your dedication inspires OpenObserve's growth. Thank you!