---
title: "Getting Started with Jaeger Tracing: A Guide"
seoTitle: "Getting Started with Jaeger Tracing: A Guide"
description: "Get started with Jaeger tracing: understand its role in
  distributed systems and explore the Jaeger UI for better monitoring."
img: /img/resources/jaeger-ui-image1.png
alt: jaeger ui
slug: jaeger-ui-guide
authors:
  - openobserve-team
publishDate: 2024-06-29
tags:
  - Jaeger UI
  - distributed tracing
  - system monitoring
  - performance optimization
  - OpenTelemetry
---
</p>
<h2>Introduction to Jaeger Tracing</h2>

<p>
Want to ditch the guesswork and pinpoint performance issues in your distributed systems? Dive into Jaeger, an open-source tracing tool that sheds light on how requests flow across your services.
</p>
<p>
Jaeger is an open-source, end-to-end distributed tracing system designed to monitor and troubleshoot complex distributed systems. It provides you with a comprehensive view of their application’s performance by tracing requests across multiple services. Jaeger uses the OpenTelemetry API to instrument code and collect trace data, and it provides a web interface for visualizing trace data, allowing you to quickly identify performance bottlenecks and other issues.
</p>
<p>

![Introduction to Jaeger Tracing](/img/resources/jaeger-ui-image2.png "Introduction to Jaeger Tracing")

</p>
<p>
<a href="https://www.jaegertracing.io/docs/1.32/architecture/">Jaeger Architecture</a>
</p>
<h3>Jaeger’s Role in Monitoring and Troubleshooting</h3>

<p>
Jaeger improves monitoring and troubleshooting by providing detailed information on the performance of distributed systems. Jaeger’s tracing capabilities allow developers to see the flow of requests and data as they traverse a distributed system, making it easier to identify issues and optimize system performance.
</p>
<h3>Role of Tracing in Understanding Application Behavior</h3>

<p>
Tracing plays a crucial role in understanding application behavior by providing a detailed view of how requests flow through a system. Tracing helps developers identify performance bottlenecks, troubleshoot errors, and optimize system performance. It also helps in root cause analysis, which is essential for identifying the source of a problem and making necessary changes to improve system performance.
</p>
<p>
In the next section, we will focus on understanding the significance of instrumentation.
</p>
<p>
<a href="https://github.com/topics/jaeger">Jaeger on Github: OpenObserve</a>
</p>
<p>
<a href="https://openobserve.ai/about/">About Us | Open Source Observability Platform</a>
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<h2>Importance of Instrumentation</h2>

<p>
Application instrumentation is the process of adding observability code to an application to generate, collect, and export telemetry data. This data includes logs, metrics, and traces, which help developers understand the performance and behavior of their application. 
</p>
<p>
Instrumentation is necessary because it allows developers to monitor and troubleshoot issues in their application, identify performance bottlenecks, and optimize system performance.
</p>
<h3>Use OpenTelemetry for Instrumentation</h3>

<p>
OpenTelemetry is a widely used and well-maintained framework for application instrumentation. It provides a vendor-agnostic implementation for generating, collecting, and exporting telemetry data. 
</p>
<p>
OpenTelemetry supports various programming languages and can be used with various backends, including Jaeger. It is recommended to use OpenTelemetry for instrumentation because it provides a comprehensive solution for telemetry data collection and analysis.
</p>
<h3>Historic support for Jaeger SDKs</h3>

<p>
Jaeger is a distributed tracing system that provides a comprehensive view of application performance. It supports various programming languages and can be used with various backends, including OpenTelemetry. Jaeger SDKs are available for several programming languages, including Java, Python, and Go. Historic support for Jaeger SDKs ensures that developers can use Jaeger with their existing applications and integrate it with other tools and services.
</p>
<p>
Now that you are familiar with Jaeger tracing, let’s dive into the technicality of getting started with jaeger.
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<p>
<a href="https://github.com/topics/jaeger">Jaeger on Github: OpenObserve</a>
</p>
<h2>Getting Started with Jaeger</h2>

<p>
The Jaeger All-in-One executable is designed for quick local testing and includes the Jaeger UI, collector, query, and agent, with an in-memory storage component. It can be run using the following command:
</p>

<pre class="prettyprint">docker run --rm --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.57</pre>

<h3>Steps to Start Jaeger Using Docker</h3>

<p>
To start Jaeger using Docker, follow these steps:
</p>
<ol>

<li>Pull the Jaeger All-in-One image:

<pre class="prettyprint">docker pull jaegertracing/all-in-one:1.57</pre>



<li>Run the container:

<pre class="prettyprint">docker run --rm --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.57</pre>

</li>
</ol>
<h3>Jaeger User Interface</h3>

<p>
To access the Jaeger UI, navigate to http://localhost:16686 in your web browser. The UI provides a comprehensive view of the tracing data, including:
</p>
<ul>

<li>Service Map: A visual representation of the services and their interactions.

<li>Tracing: A detailed view of individual traces, including the request and response data.

<li>Span: A detailed view of individual spans, including the request and response data.

<li>Query: A search interface for querying tracing data.
</li>
</ul>
<h3>Ports Exposed by the Jaeger Docker Container</h3>

<p>
The Jaeger Docker container exposes the following ports:
</p>
<ul>

<li>6831: UDP port for sending tracing data.

<li>6832: UDP port for sending tracing data.

<li>5778: HTTP port for the Jaeger UI.

<li>16686: HTTP port for the Jaeger UI.

<li>4317: HTTP port for the Jaeger UI.

<li>4318: HTTP port for the Jaeger UI.

<li>14250: HTTP port for the Jaeger UI.

<li>14268: HTTP port for the Jaeger UI.

<li>9411: HTTP port for the Jaeger UI.
</li>
</ul>
<p>
These ports are used to communicate between the Jaeger components and access the Jaeger UI.
</p>
<p>
<a href="https://github.com/topics/jaeger">Jaeger on Github: OpenObserve</a>
</p>
<p>
Now, in next section, we will cover the details of SPM with Jaeger.
</p>
<h2>Service Performance Monitoring (SPM) with Jaeger</h2>

<p>
Service Performance Monitoring (SPM) is a feature in Jaeger that provides service-level and operation-level aggregation of key metrics like request rates, error rates, and durations (latencies). It helps identify interesting traces (e.g. high QPS, slow or erroneous requests) without needing to know the service or operation names up-front.
</p>
<h3>How does SPM work?</h3>

<p>
SPM works by aggregating span data from Jaeger to produce RED (Request, Error, Duration) metrics. The OpenTelemetry Collector's Span Metrics Processor is used to generate these metrics from the incoming traces.
</p>
<h3>Key features of SPM</h3>

<ul>

<li>Service-level and operation-level aggregation of request rates, error rates, and latencies (P95, P75, P50)

<li>"Impact" metric computed as the product of latency and request rate to highlight high-impact operations

<li>Pre-populated Trace search with relevant service, operation and lookback period for interesting traces
</li>
</ul>
<h3>Accessing SPM in Jaeger</h3>

<ul>

<li>The SPM feature can be accessed from the "Monitor" tab in the Jaeger UI. It requires Jaeger 1.57 or later.
</li>
</ul>
<h3>Limitations</h3>

<ul>

<li>SPM is still an experimental feature and may have further changes in the future

<li>Requires OpenTelemetry Collector 0.63.1 or later with the Span Metrics Processor enabled
</li>
</ul>
<p>
By providing aggregated RED metrics and highlighting high-impact traces, SPM makes it easier to monitor service performance and identify issues in complex distributed systems using Jaeger.
</p>
<p>
In the next section, you will learn the steps and codes required to set up Jaeger with Kubernetes.
</p>
<p>
<a href="https://github.com/topics/jaeger">Jaeger on Github: OpenObserve</a>
</p>
<h2>Setting Up Jaeger on Kubernetes</h2>

<p>
The Jaeger Kubernetes Operator is an implementation of a Kubernetes Operator that simplifies deploying and managing Jaeger, a distributed tracing system. It provides a set of APIs and tools to manage Jaeger instances and their components, such as the collector, query, and agent.
</p>
<h3>Installing the Jaeger Operator on Kubernetes</h3>

<p>
To install the Jaeger Operator on Kubernetes, follow these steps:
</p>
<ul>

<li>Create a Namespace: Create a namespace for the Jaeger Operator, such as observability.

<li>Install the Jaeger Operator using the following command:

<pre class="prettyprint">bash
kubectl create namespace observability
kubectl create -f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/main/deploy/crds/jaegertracing.io_jaegers_crd.yaml</pre>

</li>
</ul>
<ul>

<li>Create a Jaeger instance using the following command:
<

<pre class="prettyprint">bash
kubectl apply -n observability -f - &lt;&lt;EOF
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: simplest
EOF</pre>

</ul><h3>Installing the Jaeger Operator on OKD/OpenShift</h3>

<p>
To install the Jaeger Operator on OKD/OpenShift, follow these steps:
</p>
<ul>

<li>Create a Project: Create a project for the Jaeger Operator, such as observability.

<li>Install the Jaeger Operator using the following command:

<pre class="prettyprint">bash
oc login -u &lt;privileged user>
oc new-project observability
oc create -f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/main/deploy/crds/jaegertracing.io_jaegers_crd.yaml -n observability</pre>

</li>
</ul>
<ul>

<li>Create a Jaeger instance using the following command:

<pre class="prettyprint">bash
oc create -n observability -f - &lt;&lt;EOF
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: simplest
EOF</pre>

</li>
</ul>
<p>
The Jaeger Kubernetes Operator provides a simple and scalable way to deploy and manage Jaeger, a distributed tracing system. It simplifies the deployment and management of Jaeger instances and provides a set of APIs and tools to monitor and troubleshoot Jaeger instances.
</p>
<p>
<a href="https://github.com/topics/jaeger">Jaeger on Github: OpenObserve</a>
</p>
<p>
In the next section, you will learn briefly about HotROD, a demo application.
</p>
<h2>Using the Sample App: HotROD</h2>

<p>
HotROD is a demo application that consists of several microservices and illustrates the use of the OpenTracing API. It provides features like:
</p>
<ul>

<li>HotROD's architecture can be discovered by viewing the data-driven dependency diagram, which shows the relationships between the different microservices that make up the application.

<li>HotROD allows you to view request timelines and errors, which can help you understand how the application works and identify performance bottlenecks and troubleshoot issues.

<li>HotROD demonstrates the use of baggage propagation, which allows you to pass arbitrary key-value pairs to all downstream requests.

<li>HotROD can be run using Docker, Docker Compose, or by building from source or binary. The instructions for running HotROD are available in the README file of the Jaeger repository.
</li>
</ul>
<p>
By using HotROD, you can learn how to use the OpenTracing API to instrument your application and gain insights into its performance and behavior.
</p>
<p>
Moving on, now you will learn how to migrate from ZIpkin to Jaeger.
</p>
<h2>Migrating from Zipkin to Jaeger</h2>

<p>
Here is a technical overview of Jaeger's compatibility with Zipkin:
</p>
<h3>Compatibility of Jaeger with Zipkin</h3>

<p>
Jaeger supports Zipkin compatibility in the following ways:
</p>
<ul>

<li>Jaeger tracers for Java and Go support the B3 propagation format, which allows joining traces with other Zipkin (B3) instrumented services.

<li>Jaeger accepts Zipkin spans in Thrift format over HTTP. The default endpoint is http://localhost:14268/api/traces?format=zipkin.thrift.

<li>Zipkin's default span submission endpoint is http://localhost:9411/api/v1/spans with Content-Type of thrift or json, and optional gzip encoding.
</li>
</ul>
<h3>Zipkin-compatible API in Jaeger</h3>

<p>
To enable the Zipkin-compatible API in Jaeger, you can use the following configuration:
</p>

<pre class="prettyprint">yaml
receivers:
  zipkin:
    endpoint: 0.0.0.0:9411
    format: proto</pre>

<p>
This configures the Zipkin receiver to listen on 0.0.0.0:9411 and accept spans in Protobuf format.
</p>
<h3>References to files for migration</h3>

<ul>

<li>Jaeger's Thrift IDL file: <a href="https://github.com/jaegertracing/jaeger/blob/master/thrift-gen/jaeger/jaeger.thrift">https://github.com/jaegertracing/jaeger/blob/master/thrift-gen/jaeger/jaeger.thrift</a> 

<li>Zipkin's Thrift IDL file: <a href="https://github.com/openzipkin/zipkin-api/blob/master/thrift/zipkinCore.thrift">https://github.com/openzipkin/zipkin-api/blob/master/thrift/zipkinCore.thrift</a> 

<li>Zipkin's Proto IDL file: <a href="https://github.com/openzipkin/zipkin-api/blob/master/proto3/zipkin.proto">https://github.com/openzipkin/zipkin-api/blob/master/proto3/zipkin.proto</a> 
</li>
</ul>
<p>
These IDL files can be used as references when migrating from Zipkin to Jaeger or when integrating Jaeger with Zipkin-instrumented services.
</p>
<p>
By supporting Zipkin's B3 propagation format and providing a Zipkin-compatible API, Jaeger makes it easier to migrate from Zipkin and join traces across different instrumentation systems.
</p>
<p>
<a href="https://openobserve.ai/about/">About Us | Open Source Observability Platform</a>
</p>
<h3>Conclusion</h3>

<p>
This guide provides a comprehensive introduction to Jaeger, a distributed tracing system for monitoring and troubleshooting complex applications. It covers key concepts like Jaeger's role in performance analysis, instrumentation using OpenTelemetry, and getting started with Jaeger using Docker. The guide also explores advanced topics like Service Performance Monitoring (SPM) and deploying Jaeger on Kubernetes. Finally, it details compatibility with Zipkin and resources for migration.
</p>
<p>
In essence, this guide empowers developers to leverage Jaeger's tracing capabilities to gain deep insights into application behavior and optimize performance within distributed systems.
</p>
<h2>Why OpenObserve is the Right Choice!</h2>

<p>
OpenObserve is the right choice for several reasons:
</p>
<ul>

<li>Vendor-Neutral Instrumentation: OpenObserve provides vendor-neutral instrumentation using OpenTelemetry, which allows you to use the same instrumentation across different backends, including Jaeger.

<li>Easy Integration: OpenObserve integrates seamlessly with Jaeger, allowing you to use the same instrumentation and tracing data across both platforms.

<li>Advanced Features: OpenObserve provides advanced features like distributed context propagation, distributed transaction monitoring, root cause analysis, and service dependency analysis, which are essential for monitoring and troubleshooting microservices-based distributed systems.

<li>Scalability: OpenObserve is designed to scale with your business needs, providing high scalability and no single points of failure.

<li>Backwards Compatibility: OpenObserve supports backwards compatibility with Zipkin, allowing you to switch from Zipkin to Jaeger without rewriting your instrumentation code.
</li>
</ul>
<p>
Overall, OpenObserve provides a comprehensive solution for monitoring and troubleshooting microservices-based distributed systems, making it the right choice for your needs.
</p>
<p>
<a href="https://openobserve.ai/contactus">Get started for FREE with OpenObserve</a>
</p>
<p>
<a href="https://openobserve.ai/about/">About Us | Open Source Observability Platform</a>
</p>
<p>
References
</p>
<p>
<a href="https://www.jaegertracing.io/docs/1.6/getting-started/">Getting started — Jaeger documentation</a>
</p>
<p>
<a href="https://www.sentinelone.com/blog/jaeger-tracing-tutorial/">Jaeger Tracing Tutorial: Get Going From Scratch</a>
</p>
<p>
<a href="https://www.aspecto.io/blog/jaeger-tracing-the-ultimate-guide/">Jaeger Tracing: The Ultimate Guide</a>
</p>
<p>
<a href="https://github.com/topics/jaeger">https://github.com/topics/jaeger</a>
</p>
<p>
<a href="https://github.com/jaegertracing/jaeger">https://github.com/jaegertracing/jaeger</a>
</p>
<p>
<a href="https://github.com/jaegertracing/jaeger-client-go">https://github.com/jaegertracing/jaeger-client-go</a> 
</p>
<p>
<a href="https://www.jaegertracing.io/">https://www.jaegertracing.io/</a> 
</p>
<p>
YouTube Videos
</p>
<p>
<a href="https://www.youtube.com/watch?v=7tuQO8qBRHo">Jaeger Tracing Quick Example Implementation</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=aMZoUIG-mgY">Getting Started with Jaeger - Joe Elliott</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=_fQeanJKnh8">Jaeger Tracing - Overview | Why & How |</a>
</p>
<p>
<a href="https://www.youtube.com/watch?v=_fBZGmEoqvI">OpenObserve Quickstart</a>
</p>
