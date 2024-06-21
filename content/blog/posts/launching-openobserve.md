---
title: Revolutionizing Observability - Unveiling OpenObserve, the High-Performance, Cloud-Native Platform
seoTitle: Revolutionizing Observability - Unveiling OpenObserve, the High-Performance, Cloud-Native Platform
description: "OpenObserve is an open source, cloud native open source observability platform that provides ~140x (YMMV. Could be higher or lower based on data entropy) lower storage costs compared to Elasticsearch. Use cases include real-life log data, significantly reduces operational costs, and improves ease of use. It can scale to petabytes of data, is highly performant, and allows you to sleep better at night 😴. If you are looking for an observability tool for logs, metrics, and traces, take a look at OpenObserve and how its approach towards observability could help you build better software and save money on observability costs."
img: /img/homepage/herosection1.jpg
alt: OpenObserve
slug: launching-openobserve
authors: 
  - prabhat
publishDate: 2023-05-10
tags:
  - launch
  - cost
  - observability
  - logs
  - metrics
  - traces
---

### Introduction

**OpenObserve** is an open source, cloud native observability platform that provides ~140x (YMMV. Could be higher or lower based on data entropy) lower storage costs compared to Elasticsearch. Use cases include real-life log data, significantly reduces operational costs, and improves ease of use. It can scale to petabytes of data, is highly performant, and allows you to sleep better at night 😴. If you are looking for an observability tool for logs, metrics, and traces, take a look at OpenObserve and how its approach towards observability could help you build better software and save money on observability costs.

We built **OpenObserve** with the following design principles and architecture in mind:

1. **Fast and efficient log search:** We consider efficiency as ability to do maximum data searched/processed for minimum amount of money spent on compute, storage and anything else (minus human effort).
1. **Rust** as the programming language for its safety and performance
1. s3/minio/gcs/azure blob for observability data storage
1. Storage of data in **columnar format** to speed up analytics
1. Support **very high cardinality**
1. Use of SIMD instruction sets (AVX-512 and neon) for **vectorized processing** to speed up analytics
1. True **compute and storage decoupling** with stateless nodes
1. Core engine designed to offer **a complete observability solution** (logs, metrics, traces) from the ground up and not just some features as an afterthought retrofitting things

We will dig deeper into how we achieve massively higher efficiency compared to existing observability tools in a series of blogs. But now let’s take a look at why we even thought of building OpenObserve in the first place.

### Yet another log search engine!!! Why?

The vast majority of customers that we talked to indicated the following pain points with their existing observability solutions:

1. Day 1 - Setup: Difficulty in getting started. This generally involves:
   1. Installing it in the user’s environment
   1. Upfront planning, such as number of shards, which fields to index, set mappings (Elasticsearch), as well as defining labels upfront (Loki)
   1. Configuring it to be usable by the users
   1. Some of the systems even require the user to have Kafka operating at large scale to avoid any data loss
1. Day 2 - Keeping it up and running: Difficulty in maintenance. We have all heard horror stories around Elasticsearch regarding:
   1. Provisioning
   1. Backups
   1. Upgrades
   1. Bringing the system back up, upon failures
   1. Scaling number of nodes up and down as need arises
1. Features and Usability: Amazon CloudWatch has, for a long time, received logs by default from across the AWS services, but it has been so unusable that users set up logging using Elasticsearch on their own, or straight up use SaaS platforms like Datadog. When I first found Elasticsearch, I liked that the UX was vastly superior to CloudWatch. Datadog built an even better UI, and I loved using it. Point being, even if you have something as easily available as CloudWatch, it still has to be usable and should have the features to do its intended job efficiently, otherwise users will find alternatives.
1. Cost: Some of the players like Splunk and Datadog, while providing great software, can become prohibitively expensive. Take a look at this [reddit thread about Datadog’s pricing and costs](https://www.reddit.com/r/devops/comments/zz4naq/datadog_i_do_not_understand_the_pricing_model/). In general, cost breaks down into the following categories:
   1. Licensing
   1. Infrastructure costs: This comes in two forms:
      1. Compute: How many servers does the user need for search and analysis.
      1. Storage: How much storage is the user using for observability data (logs and traces data can quickly become huge). EBS volumes can become very expensive at large scale. (Planning for volumes and their lifecycle management is yet another headache.) This also puts constraints on the duration of data you can actually store, as the cost of data stored can exceed the perceived value it provides.
   1. Human resources: Generally relates to two kind of roles:
      1. DevOps/SRE/administration employees who need to spend time setting up and making sure that the system is up and running.
      1. Developers who are being told that they need to decide on how much observability data they can push and keep them manageable by keeping a tight watch on what they are logging. It is also the time spent to learn the vagaries of the platform like index mapping, query syntax, cardinality, etc. together with admins.
   1. For most SaaS platforms, the pricing is based on the amount of data that you throw at it.
1. Learning curve: As much as I enjoy learning things, I hate learning different ways of doing the same thing for different tools. I also dislike learning things that can possibly be avoided. All the logging engines seem to bring their own query language for advanced querying.
   1. Elasticsearch has a custom DSL that you need to learn. Lately, SQL is supported though.
   1. Grafana Loki has LogQL.
   1. Datadog has its own query language.
1. Performance: This was an area where fewer people complained considering they could just throw in a couple more servers if all other things are working fine. Nevertheless, this was a concern for many. Lower performance either results in degraded performance, elevated compute costs, or sometimes a simple inability to do the job at all when the query times out. Performance includes the following items:
   1. Ingestion: How fast can the user ingest
   1. Search: e.g. search for **error** in all of the log data
   1. Aggregations: e.g. give me totals for HTTP status codes from NGINX logs’

We also saw the limitations of SaaS platforms like Datadog, Loggly, Papertrail, Splunk, and Sumologic, which can be expensive and lack necessary features. In addition, many users prefer to keep their data private in their own data centers or AWS accounts. Our team took these challenges into account, and designed a system from the ground up that addresses each one.

Drawing on the experience of our team members and mine working with hundreds of AWS customers as an AWS Solutions Architect, we built a system that's both simple for beginners and sophisticated for advanced users.


Unlike existing systems built with outdated technologies, we're building a full observability platform using modern technologies that encompasses logs, metrics, and traces.

### Guiding principles

When we decided to finally build, we had the following principles that we wanted to uphold:

1. Day 1: Ease of getting started
   1. Users should be able to install (for the self-hosted option) or sign up (for SaaS platform) in less than two minutes.
   1. Users should be able to begin ingesting data in under two minutes and start observing the behavior of the applications without any major configuration.
1. Day 2: Keep it up and running
   1. Application should be stable and in case of issues, it should be able to heal itself automatically.
   1. Majority of the users should be able to start using the system efficiently with ZERO configuration.
   1. Scaling up/down should be as easy as changing the number of nodes in an autoscaling group (in AWS) or changing the number of replicas (in k8s).
   1. Majority of users should not need backups or should be able to do it without DBA level skills.
   1. Upgrades should be easy and smooth and account for differences in different versions, and not cause system downtime or data loss.
1. Features and Usability
   1. System should be highly usable from the get go - providing excellent ROI on the invested time. A great UI and API are important to achieve it.
   1. **Logs** themselves do not provide visibility into the application. Users need **metrics** and **traces** as well.
1. Cost
   1. Users should not have to mortgage houses or company assets in order to run the system either in a self-hosted option (with or without licensing cost) or for SaaS platform.
1. Learning curve
   1. A user who has never used the system should be able to set up and use the system efficiently for basic needs or should be able to use existing skills for advanced purposes.
1. Performance
   1. System should be highly performant for most of the use cases in the real world.
   1. Performance is generally a tradeoff. In situations of tradeoffs, it should be generally acceptable to the majority of the users with excellent tradeoff value in return.

Next step was to build the actual system which took us several months.

### So what am I getting?

We built an open source observability platform **OpenObserve** that is:

1. Super easy to use
   1. Users can try it on a laptop in less than two minutes utilizing less than 100 MB RAM and notice the superior performance.
   1. Users can install it in a k8s cluster in under two minutes and get the system up and running.
   1. Users will love the full featured no-nonsense powerful GUI.
   1. Users can use their existing skills of SQL for advanced query if they wish to do so.
1. Low operational overheads
   1. All user data goes to S3 (or stays local, as specified by user), nothing to manage there.
   1. Scale horizontally or vertically per users’ needs, quickly.
   1. Metadata is in sqlite/postgres/mysql. Proven external systems that are easy to manage.
1. Low cost
   1. Use of S3 for data storage allows users to lower their cost of storage compared to Elasticsearch by a factor of ~140x, which is a major cost for logging systems.
   1. Extremely low compute requirements during ingestion (~6x YMMV based on data and hardware).
1. High performance engine
   1. OpenObserve is built in Rust, leveraging its high performance.
   1. We use automatic and manual partitioning of data for better performance.
   1. We also use in-memory caching where we store the compressed data in memory and can store 1 TB of data in under 35 GB RAM (at ~30x compression, although you get much higher compression for real life logs).
1. Advanced features:

   1. Logs, Metrics, Traces, Dashboards, Alerts, Functions, and more.
   1. Multi-tenancy
   1. Embedded scripting
      1. Ingest functions - think of it like an AWS lambda function that you can run on every record to modify during ingestion. It allows for reduction, redaction, and enrichment of log data as it enters OpenObserve. Users could pre-process log records as they are entering the system. Users could build whatever function they can imagine.
      1. Query functions - think of it like a lambda function that can run on every log line during query after log records have already been ingested. E.g. if a user has a log record like “1.2.3.4 - POST prabhat@zinc https://openobserve.ai”, you could parse it during query time and filter against it at query time. Users could build whatever function they can imagine.

1. Sleep better at night knowing your system will keep running even if the nodes crash through autohealing.

Below is the result of storage utilization when we ingested our kubernetes cluster logs in both OpenObserve and Elasticsearch for a couple of hours.

![](/img/blog/blog1.png)


OpenObserve provides various indexing schemes - _partitioning, bloom filter, inverted index_ - to provide the best performance for different use cases while still being highly efficient. It's design is heavily influenced by big data systems like spark and cassandra (with some of it's own twists) with the ability to scale large amount of data at scale.

Due to it's design and the use of columnar storage, OpenObserve is much faster at ingestion, search and analytics queries compared to competitors while still providing a much lower compute and storage cost.

Instead of using raft/paxos for cluster coordination, NATS is used for cluster coordination that provides much easier management and better scaling.

### Conclusion

There are over four dozen observability tools out there (probably a lot more), some of which are open source, some are closed source, and others are available only as SaaS. But we still see people struggling with these existing tools for one or more reasons (feature, cost, difficulty in management, and so on).

So we have decided to build OpenObserve to allow teams to do their job efficiently, solve problems effectively, and sleep well at night. To quote one of my mentors, Anand Babu Periasamy (CEO - MinIO), on entering the crowded market of observability -

> Why build another mouse trap when so many already exist? **Because the rodent problem still exists (and existing mouse traps are not solving the problem)**.

Check the [documentation](https://openobserve.ai/docs) to install OpenObserve in under two minutes or simply try the [OpenObserve Cloud platform](https://cloud.openobserve.ai/).
