---
title: 3 Observability pillars in One binary - ZincObserve
seoTitle: 3 Observability pillars in One binary - ZincObserve
description: "ZincObserve’ is an open source, cloud native observability platform that provides ~140x (YMMV. Could be higher or lower based on data entropy) lower storage costs compared to Elasticsearch. Use cases include real-life log data, significantly reduces operational costs, and improves ease of use. It can scale to petabytes of data, is highly performant, and allows you to sleep better at night 😴. If you are looking for an observability tool for logs, metrics, and traces, take a look at ZincObserve and how its approach towards observability could help you build better software and save money on observability costs."
img: img/homepage/hero1.png
alt: ZincObserve
slug: launching-zincobserve
author: prabhat
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

**ZincObserve** is an open source, cloud native observability platform that provides ~140x (YMMV. Could be higher or lower based on data entropy) lower storage costs compared to Elasticsearch. Use cases include real-life log data, significantly reduces operational costs, and improves ease of use. It can scale to petabytes of data, is highly performant, and allows you to sleep better at night 😴. If you are looking for an observability tool for logs, metrics, and traces, take a look at ZincObserve and how its approach towards observability could help you build better software and save money on observability costs.

We built **ZincObserve** with the following design principles and architecture in mind:

1. **Brute force for log search** as opposed to inverted index or bitfunnel
1. **Rust** as the programming language for its safety and performance
1. s3/minio/gcs/azure blob for observability data storage
1. Storage of data in **columnar format** to speed up analytics
1. Support **very high cardinality**
1. Use of SIMD instruction sets (AVX-512 and neon) for **vectorized processing** to speed up analytics
1. True **compute and storage decoupling** with stateless nodes
1. Core engine designed to offer **a complete observability solution** (logs, metrics, traces) from the ground up and not just some features as an afterthought retrofitting things

We will dig deeper into how we achieve massively higher efficiency compared to existing observability tools in a series of blogs. But now let’s take a look at why we even thought of building ZincObserve in the first place.

### Yet another log search engine!!! Why?

When I built [ZincSearch](https://github.com/zincsearch/zincsearch) back in 2021, I did not expect that it would go on to get more than 14k stars on GitHub in about a year and become one of the [fastest growing projects of 2022 on GitHub](https://runacap.com/ross-index/annual-2022/). ZincSearch is currently used by hundreds of organizations in production for log search and analysis despite its minimal feature set.

Why did these organizations choose ZincSearch? The vast majority of customers indicated the following pain points with their existing observability solutions:

1. Day 1 - Setup: Difficulty in getting started. This generally involves:
   1. Installing it in the user’s environment
   1. Upfront planning, such as number of shards, which fields to index, set mappings (Elasticsearch), as well as defining labels upfront (Loki)
   1. Configuring it to be usable by the users
   1. Some of the systems even require the user to have Kafka operating at large scale to avoid any data loss
1. Day 2 - Keeping it up and running: Difficulty in maintenance. We have all heard horror stories around Elasticsearch regarding:
   1. Provisioning
   1. Backups
   1. Upgrades
   1. Bringing the system back up upon failures
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

We built an open source observability platform “ZincObserve” that is:

1. Super easy to use
   1. Users can try it on a laptop in less than two minutes utilizing less than 100 MB RAM and notice the superior performance.
   1. Users can install it in a k8s cluster in under two minutes and get the system up and running.
   1. Users will love the full featured no-nonsense powerful GUI.
   1. Users can use their existing skills of SQL for advanced query if they wish to do so.
1. Low operational overheads
   1. All user data goes to S3 (or stays local, as specified by user), nothing to manage there.
   1. Scale horizontally or vertically per users’ needs, quickly.
   1. Metadata is in etcd, a highly available key-value store.
1. Low cost
   1. Use of S3 for data storage allows users to lower their cost of storage compared to Elasticsearch by a factor of ~140x, which is a major cost for logging systems.
1. High performance engine
   1. ZincObserve is built in Rust, leveraging its high performance.
   1. We use automatic and manual partitioning of data for better performance.
   1. We also use in-memory caching where we store the compressed data in memory and can store 1 TB of data in under 35 GB RAM (at ~30x compression, although you get much higher compression for real life logs).
1. Advanced features:

   1. Logs, Metrics, Traces, Dashboards, Alerts, Functions, and more.
   1. Multi-tenancy
   1. Embedded scripting
      1. Ingest functions - think of it like an AWS lambda function that you can run on every record to modify during ingestion. It allows for reduction, redaction, and enrichment of log data as it enters ZincObserve. Users could preprocess log records as they are entering the system. Users could build whatever function they can imagine.
      1. Query functions - think of it like a lambda function that can run on every log line during query after log records have already been ingested. E.g. if a user has a log record like “1.2.3.4 - POST prabhat@zinc https://zinc.dev”, you could parse it during query time and filter against it at query time. Users could build whatever function they can imagine.

1. Sleep better at night knowing your system will keep running even if the nodes crash through autohealing.

Below is the result of storage utilization when we ingested our kubernetes cluster logs in both ZincObserve and Elasticsearch for a couple of hours.

![](/img/blog/blog1.png)

### Trade Offs

We chose to do certain things differently that may affect how it will perform in your environment.

ZincObserve does not index data like Elasticsearch, but compresses it and stores it on S3. This results in extremely low storage cost and very lower computing power requirement during ingestion, but requires more compute power during search. ZincObserve should use lower compute power for analytics queries and be faster due to its columnar storage. We will be running benchmarks in due course to assert this.

Instead of using raft/paxos for cluster coordination, we chose to use etcd which allows much better scaling and cluster coordination. However this introduces etcd management. Etcd management is much easier due to its small footprint compared to full-fledged databases, but nevertheless, there is some work involved in taking backups and keeping it up and running. We plan to provide a hosted etcd that users can use to alleviate this in due course.

### Conclusion

There are over four dozen observability tools out there (probably a lot more), some of which are open source, some are closed source, and others are available only as SaaS. But we still see people struggling with these existing tools for one or more reasons (feature, cost, difficulty in management, and so on).

So we have decided to build ZincObserve to allow teams to do their job efficiently, solve problems effectively, and sleep well at night. To quote one of my mentors, Anand Babu Periasamy (CEO - MinIO), on entering the crowded market of observability -

> Why build another mouse trap when so many already exist? **Because the rodent problem still exists (and existing mouse traps are not solving the problem)**.

Check the [documentation](https://docs.zinc.dev/) to install ZincObserve in under two minutes or simply try the [Zinc cloud platform](https://observe.zinc.dev/).
