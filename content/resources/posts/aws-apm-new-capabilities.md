---
title: New capabilities in AWS APM for elevated observability experience
seoTitle: New capabilities in AWS APM for elevated observability experience
description: Discover new capabilities in AWS APM for enhanced observability,
  such as automatic service discovery and SLO visibility.
img: /img/resources/aws-apm-image1.png
alt: aws apm
slug: aws-apm-new-capabilities
authors:
  - openobserve-team
publishDate: 2024-07-18
tags:
  - AWS APM
  - observability
  - service discovery
  - SLO visibility
  - AWS CloudWatch
---
<h2>Introduction</h2>

<p>
Ever spent hours chasing down performance issues in your application, frustrated by a lack of visibility? You're not alone.  AWS APM understands your pain. That's why they've introduced new features designed to streamline observability and elevate your development experience.  
</p>
<p>

![AWS APM](/img/resources/aws-apm-image2.png "AWS APM")

</p>
<p>
<a href="https://aws.amazon.com/blogs/mt/four-apm-features-to-elevate-your-observability-experience/">Image Credit</a>
</p>
<p>
These features simplify service discovery, provide deeper insights into application health, and ensure a positive user experience.  Let's dive into what these new capabilities can do for you.
</p>
<p>
Overview of Application Performance Monitoring (APM) 
</p>
<h3>Definition and Purpose</h3>

<p>
Application Performance Monitoring (APM) is the practice of tracking key application performance indicators to ensure system availability, improve system performance, and enhance the end-user experience. 
</p>
<p>
It involves monitoring and analyzing application metrics such as request volume, latency, faults, and errors to identify and resolve performance issues.
</p>
<h3>Core Features</h3>

<p>
APM typically includes features such as automatic discovery and mapping of application components, end-to-end observability, mobile and desktop application monitoring, root-cause and impact analysis, and integration with service management tools.
</p>
<h3>Evolution</h3>

<p>
APM has evolved to include more comprehensive capabilities such as distributed tracing, real-user monitoring, and synthetic monitoring to provide a more detailed understanding of application behavior and user experience.
</p>
<h2>New Capabilities in AWS APM for Enhanced Observability</h2>

<h3>Amazon CloudWatch Application Signals</h3>

<p>
This feature provides a pre-built, standardized dashboard for monitoring application performance against service level objectives (SLOs). It automatically instruments applications to collect standard metrics and correlates telemetry across metrics, traces, logs, real-user monitoring, and synthetic monitoring.
</p>
<h3>Benefits</h3>

<p>
AWS APM enables customers to speed up troubleshooting, reduce application downtime, and improve the user experience. It also provides a unified view of application performance.
</p>
<h3>Key Features</h3>

<p>
AWS APM includes features such as discovered services and top operations, service level objectives (SLOs), and integration with Synthetics Canaries and CloudWatch RUM.
</p>
<p>
The next section will teach you about discovered services and top operations.
</p>
<h2>Discovered Services and Top Operations</h2>

<p>
AWS APM's Application Signals feature enhances observability by automating the discovery of services and top operations.
</p>
<h3>Automatic Discovery of Services Across Instrumented Workloads</h3>

<p>
AWS APM's Application Signals feature automatically discovers services across instrumented workloads, providing a comprehensive view of the application architecture. This automated discovery helps in identifying performance issues and optimizing application performance.
</p>
<h3>Top Operations and Generation of Pre-built Dashboard Graphs:</h3>

<p>
The Application Signals feature summarizes top operations across discovered services, generating pre-built dashboard graphs that provide a quick overview of application performance. These graphs help in identifying performance bottlenecks and optimizing application performance.
</p>
<h3>Detailed Service Health Assessment with SLO Visibility</h3>

<p>
Application Signals' detailed service health assessment includes visibility into service level objectives (SLOs). This allows for monitoring application performance against agreed-upon SLOs, enabling proactive issue resolution and improved user experience.
</p>
<p>
These features help in optimizing application performance, improving user experience, and reducing downtime.
</p>
<p>
In the next section, you will learn how to understand how to correlate traces to diagnose anomalies in the application.
</p>
<h2>Viewing Correlated Traces to Diagnose Anomalies</h2>

<p>
AWS X-Ray provides a powerful toolset for diagnosing anomalies by offering easy access to correlated traces and integrating with other AWS services. It helps with the following:
</p>
<h3>Easy Access to Correlated Traces for SLOs</h3>

<p>
AWS X-Ray provides easy access to correlated traces for service level objectives (SLOs). The X-Ray console offers a visual representation of the trace map, which helps understand how requests flow through your application and how they are connected to various services and resources.
</p>
<h3>Correlating Real-World Impact with AWS X-Ray Traces </h3>

<p>
AWS X-Ray enables you to correlate real-world impact with traces for efficient troubleshooting. By integrating X-Ray with other AWS services, such as CloudWatch and Lambda, you can get a complete end-to-end view of your application. 
</p>
<p>
The above features help in identifying performance bottlenecks and pinpointing the root cause of issues, making it easier to resolve problems and optimize application performance.
</p>
<p>
In the next section, you will learn about SLO Dashboards and their features.
</p>
<h2>Service Level Objectives (SLO) Dashboard</h2>

<p>
AWS APM's Service Level Objectives (SLO) dashboard provides a comprehensive and centralized view of your application's SLOs. It offers the following advantages.
</p>
<h3>Single-Screen View of All SLOs and Their Budget Health</h3>

<ul>

<li>AWS APM's Service Level Objectives (SLO) dashboard provides a unified view of all the SLOs defined for your application services.

<li>This dashboard allows you to quickly assess the status of each SLO, including the current SLO value, error budget, and attainment level.

<li>The dashboard presents this information consolidated, enabling you to easily identify which SLOs are healthy or unhealthy.
</li>
</ul>
<h3>Prioritization of Operational Activities Based on SLO Status:</h3>

<ul>

<li>The SLO dashboard helps you prioritize your operational activities by highlighting the SLOs at risk of being met.

<li>By understanding the current status and trends of your SLOs, you can focus your efforts on the areas that require the most attention, ensuring that your critical business operations are performing as expected.

<li>The dashboard provides insights into the error budget remaining for each SLO, allowing you to address any potential issues before they impact your customers proactively
</li>
</ul>
<p>
The SLO Dashboard ensures that your critical services meet the agreed-upon service level objectives.
</p>
<p>
In the next section, you will understand how AWS integrates with CloudWatch Synthetics and RUM.
</p>
<h2>Integration with CloudWatch Synthetics and CloudWatch RUM</h2>

<h3>User and Application Interactions via Integrated Telemetry</h3>

<p>
AWS APM's integration with CloudWatch Synthetics and CloudWatch RUM provides a comprehensive view of application performance by combining backend metrics with frontend user experience data.
</p>
<ul>

<li>CloudWatch Synthetics allows you to set up synthetic monitoring to proactively check the availability and responsiveness of your web applications and APIs from multiple locations worldwide.

<li>CloudWatch RUM (Real User Monitoring) collects real-time data on how users interact with your web applications, including page load times, client-side errors, and user behavior.
</li>
</ul>
<p>
By integrating these observability tools, AWS APM gives you a unified view of your application's performance for a more complete understanding of application health and user satisfaction.
</p>
<h3>Simplified Cross-Tool Troubleshooting without Additional Setup</h3>

<p>
Integrating AWS APM, CloudWatch Synthetics, and CloudWatch RUM eliminates the need to switch between multiple tools when investigating performance issues.
</p>
<ul>

<li>When you enable the X-Ray active tracing integration on your Synthetics canaries and RUM app monitors, the relevant telemetry data is automatically surfaced within the AWS APM console, providing a seamless troubleshooting experience.

<li>This integrated view allows you to quickly identify the root cause of performance problems by correlating backend metrics, frontend user interactions and distributed tracing data in a single location, saving time and effort.
</li>
</ul>
<p>
In the next section, you will briefly learn about the advantages of using OpenTelemetry.
</p>
<h2>How OpenTelemetry Helps</h2>

<p>
OpenTelemetry is an open-source observability framework that complements the capabilities of AWS APM, CloudWatch Synthetics, and CloudWatch RUM. It provides a vendor-neutral way to collect and export telemetry data, making it easier to integrate with a variety of observability tools and platforms.
</p>
<p>
By using OpenTelemetry, you can:
</p>
<ul>

<li>Standardize the collection of metrics, traces, and logs across your entire application stack, regardless of the underlying technologies.

<li>Easily export data to multiple observability backends, including AWS APM, for a more comprehensive view of your application's performance.

<li>Leverage the extensive ecosystem of OpenTelemetry-compatible tools and libraries to extend the capabilities of your observability stack.
</li>
</ul>
<p>
The combination of AWS APM's integrated telemetry, CloudWatch Synthetics, and RUM, as well as the flexibility of OpenTelemetry, can provide a powerful and comprehensive observability solution for your applications.
</p>
<p>
OpenTelemetry offers a vendor-neutral approach to data collection, but managing and analyzing that data requires a robust platform.  OpenObserve scales to petabytes of data and provides advanced analytics capabilities.  Consolidate your observability data and gain deeper insights with OpenObserve. <a href="https://cloud.openobserve.ai">Get started with your free plan today!</a>
</p>
<p>
In the next section, you will learn about the benefits of using OpenObserve for APM.
</p>
<h2>What are the Key Benefits of Using OpenObserve for AWS APM</h2>

<p>

![What are the Key Benefits of Using OpenObserve for AWS APM](/img/resources/aws-apm-image3.png "What are the Key Benefits of Using OpenObserve for AWS APM")


<a href="https://openobserve.ai/">Image Credit</a>
</p>
<p>
The key benefits of using OpenObserve for AWS APM include:
</p>
<ol>

<li>Significant Cost Savings: OpenObserve offers 140x lower storage costs than Elasticsearch, making it a cost-effective solution for managing large volumes of data.

<li>Easy Setup and Use: OpenObserve is designed to be easy to set up and use. Its user-friendly interface allows users to start ingesting data and observing application behavior within minutes.

<li>High Performance: OpenObserve is built to handle massive data scales and provides high performance, making it suitable for real-time monitoring and analytics.

<li>Scalability: OpenObserve can scale to petabytes of data and is designed to handle high traffic and large volumes of data, ensuring it can keep up with the demands of modern applications.

<li>Comprehensive Observability: OpenObserve provides a comprehensive observability platform that includes log search, metrics, traces, and analytics, enabling users to gain a deeper understanding of their applications and infrastructure.

<li>Real-Time Alerts and Monitoring: OpenObserve offers real-time alerts and monitoring capabilities, allowing users to identify and address issues before they become critical quickly.

<li>Integration with AWS Services: OpenObserve integrates seamlessly with AWS services, including AWS CloudWatch and AWS X-Ray, making it an ideal choice for AWS-based applications.

<li>Advanced Analytics and Visualization: OpenObserve provides advanced analytics and visualization capabilities, including support for SQL and PromQL, allowing users to gain insights and make data-driven decisions.

<li>Robust Security and Compliance: OpenObserve provides robust security and compliance features, including fine-grained role-based access control (RBAC) and support for multiple storage options, ensuring data security and compliance.

<li>Continuous Improvement: OpenObserve is continuously updated and improved, ensuring that users can access the latest features and capabilities to support their observability needs.
</li>
</ol>
<p>
By leveraging these benefits, OpenObserve can significantly enhance the observability capabilities of AWS APM, providing a more comprehensive and cost-effective solution for monitoring and analyzing application performance.
</p>
<p>
<a href="https://www.youtube.com/watch?v=XFwogGAe_dE">Watch this OpenObserve 1-minute Introduction</a>
</p>
<h2>Conclusion</h2>

<p>
AWS APM has introduced powerful features to streamline observability and empower your development experience.
</p>
<p>
Here's a quick recap of the key highlights:
</p>
<ul>

<li>Automatic service discovery and pre-built dashboards with AWS APM's Application Signals simplify monitoring and troubleshooting.

<li>Gain deeper service health insights with SLO visibility for proactive issue resolution.

<li>Diagnose anomalies efficiently by correlating traces with AWS X-Ray.

<li>Prioritize operational activities based on SLO health with the Service Level Objectives dashboard.

<li>Unify user and application interactions through integration with CloudWatch Synthetics and RUM for a holistic view of performance.

<li>Simplify cross-tool troubleshooting with seamless integration between AWS APM, Synthetics, and RUM.

<li>Embrace these new capabilities to understand your application performance and user experience comprehensively.

<li>Consider leveraging OpenTelemetry for vendor-neutral data collection and broader observability tool integration.
</li>
</ul>
<p>
By adopting these advancements, you can ensure your applications' smooth operation and exceptional user experience.
</p>
<p>
OpenObserve integrates seamlessly with AWS services, including AWS CloudWatch and X-Ray.   Unlock the full potential of AWS APM with OpenObserve. <a href="https://cloud.openobserve.ai">Sign up for your free OpenObserve account today and see the difference!</a>
</p>
<h2>Further Resources & Bibliography</h2>

<ol>

<li><a href="https://aws.amazon.com/blogs/mt/four-apm-features-to-elevate-your-observability-experience/">https://aws.amazon.com/blogs/mt/four-apm-features-to-elevate-your-observability-experience/</a>

<li><a href="https://aws.amazon.com/cloudops/monitoring-and-observability/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&blog-posts-cards.sort-by=item.additionalFields.createdDate&blog-posts-cards.sort-order=desc">https://aws.amazon.com/cloudops/monitoring-and-observability/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&blog-posts-cards.sort-by=item.additionalFields.createdDate&blog-posts-cards.sort-order=desc</a>

<li><a href="https://docs.aws.amazon.com/xray/latest/devguide/aws-xray-interface-console.html">https://docs.aws.amazon.com/xray/latest/devguide/aws-xray-interface-console.html</a>

<li><a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html</a>

<li><a href="https://openobserve.ai/docs/storage/">https://openobserve.ai/docs/storage/</a>

<li><a href="https://openobserve.ai/docs/howto/ingest_ecs_logs_using_firelens/">https://openobserve.ai/docs/howto/ingest_ecs_logs_using_firelens/</a>

<li><a href="https://www.youtube.com/watch?v=E2gAm12Ldq0&list=PLhr1KZpdzukdpj-Dp7JWfNu-DbqBhgIlt">https://www.youtube.com/watch?v=E2gAm12Ldq0&list=PLhr1KZpdzukdpj-Dp7JWfNu-DbqBhgIlt</a>

<li><a href="https://www.youtube.com/watch?v=kjUvXQdL798">How to build dashboards in OpenObserve</a>

<li><a href="https://www.youtube.com/watch?v=3rHxOVgIY6A">OpenObserve 2 minute demo</a>

<li><a href="https://www.youtube.com/watch?v=aPZlj2fUcwo">How to import dashboards in OpenObserve</a>
</li>
</ol>
