---
title: Jidu's Journey to 100% Tracing Fidelity with OpenObserve. A Case Study
seoTitle: Jidu's Journey to 100% Tracing Fidelity with OpenObserve. A Case Study
description: Jidu acheived 100% tracing fidelity with OpenObserve by migrating from Elasticsearch to OpenObserve. Read this case study to learn how they did it.
img: /img/blog/jidu-logo1.jpeg
alt: OpenObserve
slug: jidu-journey-to-100-tracing-fidelity
authors: 
  - hengfei
  - domyway
publishDate: 2023-12-08
tags:
  - observability
  - opentelemetry
  - traces
  - otel-collector

---

## Introduction
​
**Jiyue** is a high intelligent car robot brand, committed to creating leading intelligent car robots, with advanced smart driving, smart cabin products and innovative digital services, creating benchmark-level intelligent technology travel experience for users. As the technology company behind it, **Jidu** understands the importance of comprehensive application tracking in maintaining optimal performance and identifying potential problems. The migration from Elasticsearch (ES) to OpenObserve has further enhanced the ability to comprehend the distributed systems in use.
​
## Challenges with Elasticsearch:
​
**Incomplete Tracing Picture:** Elasticsearch's limited scalability forced Jidu to restrict trace sampling to a mere 10%, causing most of the application behaviour to be hidden and possibly masking key issues.

**Resource performance bottlenecks:** Despite having large amount of dedicated resources (24 CPU cores, 96 GB RAM, and 12 TB storage), it was still difficult to process long-term queries and do statistical analysis, resulting in memory errors and timeouts.

**High Operational Costs:** The demanding resource consumption of Elasticsearch, especially 1 TB of data storage space per day resulted in huge costs.
​
## Seeking a Better Solution: The OpenObserve Advantage
​
Compared with the limitations of Elasticsearch, OpenObserve is an open-source observability platform that supports logs, metrics, distributed tracing and front end monitoring. It aims to provide excellent performance and resource optimization. In specific cases it's more than 10 times efficient than Elasticsearch.
​
## OpenObserve's Key Benefits
​
**Unveiling the Full Picture:** Deployed OpenObserve in shared Kubernetes clusters with high availability (HA) configuration. It gave the team, the ability to achieve 100% trace data sampling thus fully understanding application behavior accurately, identifying performance bottlenecks & potential errors.

**Unburdened Infrastructure:** OpenObserve's efficient architecture and high compression capabilities significantly reduced the resource consumption. The CPU utilization remained below 1 core across all nodes, and memory usage was minimal, exceeding 6 GB only on the querier. Furthermore, the daily storage requirement plummeted from 1 TB to a mere 0.3 TB inspite of 10x increase in ingested data, thanks to OpenObserve's highly efficient data compression.

**Reduced Costs:** The substantial reduction in resource consumption translated into significant cost savings, particularly in terms of storage. This allowed them to allocate resources more effectively and optimize their infrastructure spending.

**Enhanced Business Value:** The ability to analyze comprehensive trace data empowered the engineers to pinpoint and resolve issues rapidly, leading to improved application stability, enhanced operational efficiency, and ultimately, a more satisfied customer base.
​
## Beyond the Numbers: A Transformation Story
​
Jidu's journey from Elasticsearch to OpenObserve exemplifies the power of embracing modern technologies for achieving significant operational improvements. By leveraging OpenObserve's cutting-edge capabilities, the team successfully overcame the limitations of their previous tracing system and achieved the following:
​
- **100% Trace Fidelity:** Fully understanding application behavior enabled proactive identification and resolution potential issues.
- **Optimized Infrastructure:** Greatly reduced infrastructure burden freeing up resources for other key tasks.
- **Reduced Operational Costs:** Migrating to OpenObserve saved substantial cost and improved overall financial efficiency.
- **Improved Customer Experience:** By increasing application stability, optimizing performance, and maximizing reliability the team created engaging and enjoyable customer experience.​

## Conclusion

Jidu's success story serves as a compelling case study for organizations seeking to improve their application monitoring and troubleshooting capabilities. By embracing a modern distributed tracing platform like OpenObserve, companies can gain valuable insights into their systems, optimize resource utilization, and ultimately achieve greater success in their respective domains.
