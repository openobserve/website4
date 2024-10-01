---
title: Distributed Tracing with Istio and Microservices
seoTitle: Distributed Tracing with Istio and Microservices
description: Learn the essential steps to enable istio tracing in microservices
  and how Istio’s Envoy proxy generates and propagates tracing headers.
img: /img/resources/distributed-tracing-with-istio-and-microservices.png
alt: istio tracing
slug: istio-tracing-microservices
authors:
  - openobserve-team
publishDate: 2024-10-01
tags:
  - istio tracing
  - microservices
---
<p><span style="font-weight: 400;">Tracing issues in a microservices architecture can feel like finding a needle in a haystack. But with Istio tracing, tracking down performance bottlenecks and understanding service-to-service communication becomes much easier. Whether you're a developer, DevOps engineer, or engineering manager, distributed tracing is your key to gaining visibility into how your microservices interact&mdash;without the guesswork.</span></p>

<p><span style="font-weight: 400;">In this guide, we'll explore Istio tracing, how Istio&rsquo;s Envoy proxy generates and propagates tracing headers, and how you can configure and customise tracing for your microservices. By the end, you'll be equipped to implement tracing in your environment with confidence.</span></p>

<p><span style="font-weight: 400;">Ready to roll? Let&rsquo;s get into the nuts and bolts of how Istio tracing works and how you can set it up.</span></p>

<h2><span style="font-weight: 400;">Overview of Distributed Tracing with Istio</span></h2>

<p><span style="font-weight: 400;">In the world of microservices, figuring out what went wrong can feel like putting together a puzzle where the pieces are scattered across multiple services. That&rsquo;s where distributed tracing comes in. It provides you with a bird&rsquo;s-eye view of the entire request flow, allowing you to pinpoint bottlenecks, latency issues, and even failures.&nbsp;</span></p>

<p><span style="font-weight: 400;">If you're managing a microservices-based architecture, distributed tracing is essential for troubleshooting and performance optimisation.</span></p>

<h3><span style="font-weight: 400;">Istio&rsquo;s Role in Distributed Tracing</span></h3>

<p><span style="font-weight: 400;">So, where does Istio fit into all this?&nbsp;</span></p>

<p><span style="font-weight: 400;">Istio plays a critical role by injecting tracing headers into every service-to-service communication. Its Envoy proxy automatically captures trace data, meaning you don&rsquo;t have to manually instrument each service. Istio handles the heavy lifting, collecting the information you need to understand the performance of your entire service mesh. This data can then be forwarded to your chosen distributed tracing system, like Jaeger or Zipkin.</span></p>

<h3><span style="font-weight: 400;">TraceID and SpanID&nbsp;</span></h3>

<p><span style="font-weight: 400;">Let&rsquo;s break it down simply. Every request that travels through your microservices architecture generates a </span><strong>TraceID</strong><span style="font-weight: 400;">&mdash;a unique identifier that ties together all the individual service calls involved in handling that request.&nbsp;</span></p>

<p><span style="font-weight: 400;">Think of it as the overarching identifier for the entire transaction.&nbsp;</span></p>

<p><span style="font-weight: 400;">Each service call within that trace also gets its own </span><strong>SpanID</strong><span style="font-weight: 400;">, representing a single unit of work, such as querying a database or calling another service.</span></p>

<p><span style="font-weight: 400;">By connecting the dots between these TraceIDs and SpanIDs, Istio tracing gives you a clear picture of what&rsquo;s happening across your microservices. It&rsquo;s like having a detailed map of every stop a request makes as it travels through your architecture.</span></p>

<p><span style="font-weight: 400;">Now that you have the foundational knowledge of Istio tracing let's dive into how to set up tracing in Istio and start making sense of your distributed systems.</span></p>

<h2><span style="font-weight: 400;">Configuring Tracing in Istio</span></h2>

<p><span style="font-weight: 400;">Ready to get Istio tracing up and running?&nbsp;</span></p>

<p><span style="font-weight: 400;">The good news is that configuring tracing in Istio is straightforward, and you can start tracking requests across your microservices architecture in no time.&nbsp;</span></p>

<p><span style="font-weight: 400;">Let's walk through the essential steps to enable tracing in Istio and ensure you're capturing the data that matters most.</span></p>

<h3><span style="font-weight: 400;">Step 1: Enabling Tracing in Istio</span></h3>

<p><span style="font-weight: 400;">First, you'll need to enable tracing within Istio. By default, Istio&rsquo;s Envoy proxy supports tracing, but you must ensure it&rsquo;s properly configured.&nbsp;</span></p>

<p><span style="font-weight: 400;">Begin by setting the </span><span style="font-weight: 400;">values.pilot.traceSampling</span><span style="font-weight: 400;"> parameter in your Istio configuration to control the sampling rate. A 100% rate is ideal for testing but may not be practical in production due to data volume.&nbsp;</span></p>

<p><span style="font-weight: 400;">Most production environments go for a lower sampling rate, like 1-5%, to balance performance and visibility.</span></p>

<p><span style="font-weight: 400;">You can configure this via the IstioOperator configuration file or Helm charts. Here&rsquo;s a basic example of enabling tracing in your Istio configuration:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">apiVersion: </span><span style="font-weight: 400;">install.istio.io/v1alpha1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">kind: </span><span style="font-weight: 400;">IstioOperator</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">spec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; meshConfig:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; enableTracing: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; defaultConfig:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; tracing:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; sampling: </span><span style="font-weight: 400;">5.0</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Step 2: Envoy Proxy and Tracing Headers</span></h3>

<p><span style="font-weight: 400;">Once tracing is enabled, Istio&rsquo;s Envoy proxy takes care of generating and propagating tracing headers as requests pass through the service mesh. Envoy injects tracing headers like </span><span style="font-weight: 400;">x-request-id</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">x-b3-traceid</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">x-b3-spanid</span><span style="font-weight: 400;">, and </span><span style="font-weight: 400;">x-b3-sampled</span><span style="font-weight: 400;"> into each request.&nbsp;</span></p>

<p><span style="font-weight: 400;">These headers track the journey of each request across different services.</span></p>

<p><span style="font-weight: 400;">Envoy&rsquo;s automatic header propagation simplifies tracing by ensuring every service in the chain adds its own span to the trace, giving you a detailed breakdown of each step.&nbsp;</span></p>

<p><span style="font-weight: 400;">For developers looking for deeper analysis of logs and traces, tools like </span><strong>OpenObserve</strong><span style="font-weight: 400;"> can be a powerful complement. OpenObserve is designed to handle large-scale log ingestion and trace data, making it a cost-effective alternative to Datadog, Elasticsearch, or Splunk for monitoring your Istio traces in real time. </span><a href="https://cloud.openobserve.ai/"><strong>Sign up now</strong></a><span style="font-weight: 400;"> to get started!</span></p>

<h3><span style="font-weight: 400;">Step 3: Required Headers for Tracing</span></h3>

<p><span style="font-weight: 400;">To ensure full trace propagation, your services must properly handle the required tracing headers. Envoy automatically generates and propagates the following key headers:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">x-request-id</span><span style="font-weight: 400;">: A unique identifier for the request.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">x-b3-traceid</span><span style="font-weight: 400;">: The TraceID that links all spans in a single trace.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">x-b3-spanid</span><span style="font-weight: 400;">: A unique identifier for each span.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">x-b3-sampled</span><span style="font-weight: 400;">: Indicates if the trace is being sampled or not (useful for controlling data volume).</span></li>

</ul>

<p><span style="font-weight: 400;">Make sure that your services are passing these headers between them. If you&rsquo;re using a language that doesn&rsquo;t automatically propagate these headers, you may need to modify your application code to forward them.</span></p>

<p><span style="font-weight: 400;">With Istio tracing set up and the necessary headers in place, the next step is understanding how trace context is propagated between services to ensure seamless tracking across your microservices.</span></p>

<h2><span style="font-weight: 400;">Propagation of Trace Context</span></h2>

<p><span style="font-weight: 400;">Getting Istio tracing up and running is only the beginning. Ensuring that trace headers are properly propagated between your services is what guarantees complete visibility across your microservices. But this can be a common stumbling block for developers.&nbsp;</span></p>

<p><span style="font-weight: 400;">If the headers aren&rsquo;t passed correctly, your traces will have gaps, making it hard to diagnose issues or understand the flow of requests.</span></p>

<p><span style="font-weight: 400;">Let&rsquo;s break down what you need to know to get it right with practical tips to help you avoid common mistakes.</span></p>

<h3><span style="font-weight: 400;">Passing Tracing Headers Between Services</span></h3>

<p><span style="font-weight: 400;">Once Istio injects the initial trace headers, your services need to keep passing those headers along as they communicate. Without this, each service will generate its own trace, and you&rsquo;ll lose the complete picture of a request's journey through your system.</span></p>

<p><span style="font-weight: 400;">So, what exactly needs to happen?&nbsp;</span></p>

<p><span style="font-weight: 400;">Your services must pass along the following critical headers:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">x-request-id</span><span style="font-weight: 400;">: A unique identifier for each request, which helps tie all services into the same trace.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">x-b3-traceid</span><span style="font-weight: 400;">: The ID that binds all spans together for the same trace.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">x-b3-spanid</span><span style="font-weight: 400;">: A unique identifier for each individual span in the trace.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">x-b3-sampled</span><span style="font-weight: 400;">: Indicates whether this trace is being sampled (which can affect how much data is collected).</span></li>

</ul>

<h3><span style="font-weight: 400;">Implementing Header Propagation in Your Code</span></h3>

<p><span style="font-weight: 400;">Not all frameworks or languages automatically handle header propagation. You must ensure your code is set up to pass along these tracing headers. Here's how you can implement this:</span></p>

<p><strong>Check Your Framework&rsquo;s Default Behavior</strong><span style="font-weight: 400;">: Some popular frameworks like Spring Boot or Flask automatically forward tracing headers, but not all do. Be sure to verify your framework&rsquo;s behaviour regarding tracing.</span></p>

<p><strong>Modify Application Code</strong><span style="font-weight: 400;">: If your services aren&rsquo;t automatically forwarding the necessary headers, you&rsquo;ll need to add that functionality.&nbsp;</span></p>

<p><span style="font-weight: 400;">For example, in Python using Flask, you could manually extract and forward the headers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp;</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> requests</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">from</span><span style="font-weight: 400;"> flask </span><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> request</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">@app.route('/forward')</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">forward_request</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; headers = {</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">'x-request-id'</span><span style="font-weight: 400;">: request.headers.get(</span><span style="font-weight: 400;">'x-request-id'</span><span style="font-weight: 400;">),</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">'x-b3-traceid'</span><span style="font-weight: 400;">: request.headers.get(</span><span style="font-weight: 400;">'x-b3-traceid'</span><span style="font-weight: 400;">),</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">'x-b3-spanid'</span><span style="font-weight: 400;">: request.headers.get(</span><span style="font-weight: 400;">'x-b3-spanid'</span><span style="font-weight: 400;">),</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">'x-b3-sampled'</span><span style="font-weight: 400;">: request.headers.get(</span><span style="font-weight: 400;">'x-b3-sampled'</span><span style="font-weight: 400;">),</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; }</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; response = requests.get(</span><span style="font-weight: 400;">"http://downstream-service"</span><span style="font-weight: 400;">, headers=headers)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">return</span><span style="font-weight: 400;"> response.content</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Test the Propagation</strong><span style="font-weight: 400;">: Once implemented, test it to ensure that the tracing headers are correctly passed along. You can monitor this by checking your distributed tracing system (like OpenObserve) to confirm the headers are consistent across services.</span></p>

<h3><span style="font-weight: 400;">Avoiding Common Pitfalls</span></h3>

<p><span style="font-weight: 400;">A common mistake is forgetting to forward headers in every service. One missed service and the trace breaks. It&rsquo;s crucial to ensure that all services are aware of the tracing headers and forward them consistently. Another issue developers run into is modifying the headers incorrectly, which can disrupt the trace context.</span></p>

<p><span style="font-weight: 400;">Proper propagation of trace headers is the backbone of a solid Istio tracing setup. Now that you've ensured trace headers are being handled correctly, it&rsquo;s time to explore the different distributed tracing systems supported by Istio and how they can fit into your observability stack.</span></p>

<h2><span style="font-weight: 400;">Distributed Tracing Systems Supported by Istio</span></h2>

<p><span style="font-weight: 400;">When you&rsquo;ve got Istio tracing set up, the next step is choosing the right distributed tracing system to collect and visualise your trace data. Fortunately, Istio supports several powerful tools, each offering its own strengths depending on your needs.&nbsp;&nbsp;</span></p>

<h3><span style="font-weight: 400;">Jaeger&nbsp;</span></h3>

<p><span style="font-weight: 400;">Jaeger is one of the most popular distributed tracing systems and a natural fit for Istio tracing. Known for its rich feature set and scalability, Jaeger is widely adopted across industries.&nbsp;</span></p>

<p><span style="font-weight: 400;">To configure Istio with Jaeger, you must install Jaeger in your cluster and set up the </span><span style="font-weight: 400;">tracing.jaeger</span><span style="font-weight: 400;"> settings in Istio&rsquo;s configuration.</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">apiVersion: </span><span style="font-weight: 400;">install.istio.io/v1alpha1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">kind: </span><span style="font-weight: 400;">IstioOperator</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">spec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; values:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; proxy:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; tracer: </span><span style="font-weight: 400;">"jaeger"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Once configured, Jaeger will start collecting traces from Istio, allowing you to visualise them through Jaeger's UI.&nbsp;&nbsp;</span></p>

<h3><span style="font-weight: 400;">Zipkin&nbsp;</span></h3>

<p><span style="font-weight: 400;">Zipkin is another great option, especially if you&rsquo;re looking for something lightweight. While it&rsquo;s similar to Jaeger in terms of core functionality, Zipkin offers faster deployment and can be a bit easier to set up. To integrate Zipkin with Istio, you&rsquo;ll modify the IstioOperator configuration just as you did with Jaeger, but specify </span><span style="font-weight: 400;">tracer: "zipkin"</span><span style="font-weight: 400;">.</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">apiVersion: </span><span style="font-weight: 400;">install.istio.io/v1alpha1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">kind: </span><span style="font-weight: 400;">IstioOperator</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">spec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; values:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; proxy:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; tracer: </span><span style="font-weight: 400;">"zipkin"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Zipkin&rsquo;s flexibility and ease of use make it a good option if you&rsquo;re looking for a simple but effective tracing system.</span></p>

<h3><span style="font-weight: 400;">OpenTelemetry&nbsp;</span></h3>

<p><span style="font-weight: 400;">OpenTelemetry is quickly becoming the industry standard for observability, as it supports traces, metrics, and logs in one unified platform. If you're thinking about future-proofing your observability stack, Istio tracing with OpenTelemetry is a great investment.</span></p>

<p><span style="font-weight: 400;">To configure OpenTelemetry with Istio, you'll need to deploy the OpenTelemetry Collector in your cluster and configure Istio to send traces there:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">apiVersion: </span><span style="font-weight: 400;">install.istio.io/v1alpha1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">kind: </span><span style="font-weight: 400;">IstioOperator</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">spec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; values:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; proxy:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; tracer: </span><span style="font-weight: 400;">"opentelemetry"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This setup ensures that OpenTelemetry collects all the trace data from your services, with the added benefit of handling metrics and logs as well.</span></p>

<h3><span style="font-weight: 400;">Apache SkyWalking&nbsp;</span></h3>

<p><span style="font-weight: 400;">Apache SkyWalking is an open-source performance monitoring system that offers tracing, logging, and metrics collection&mdash;making it another great option for Istio users. SkyWalking is particularly well-suited for teams that want an all-in-one tool with minimal configuration.&nbsp;</span></p>

<p><span style="font-weight: 400;">To get SkyWalking working with Istio, you&rsquo;ll follow a similar setup, specifying </span><span style="font-weight: 400;">tracer: "skywalking"</span><span style="font-weight: 400;"> in your configuration.</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">apiVersion: </span><span style="font-weight: 400;">install.istio.io/v1alpha1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">kind: </span><span style="font-weight: 400;">IstioOperator</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">spec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; values:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; proxy:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; tracer: </span><span style="font-weight: 400;">"skywalking"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">SkyWalking's versatility makes it an attractive option for organisations looking for a single tool to monitor multiple aspects of their system.</span></p>

<h3><span style="font-weight: 400;">OpenObserve&nbsp;</span></h3>

<p><span style="font-weight: 400;">If you're looking for a unified observability platform but want to keep storage costs low, </span><strong>OpenObserve</strong><span style="font-weight: 400;"> might be your ideal choice. OpenObserve supports logs, traces, and metrics in one place, offering up to 140x lower storage costs compared to systems like Elasticsearch. This makes it a strong contender for teams using Istio who need comprehensive observability without the high price tag.</span></p>

<p><span style="font-weight: 400;">While not natively integrated with Istio, OpenObserve can easily collect trace data by setting it up as a logging and tracing backend using its powerful APIs. This allows you to centralise all your logs and traces for easier analysis and decision-making.</span></p>

<p><span style="font-weight: 400;">Head over to</span><a href="https://openobserve.com"> <span style="font-weight: 400;">OpenObserve&rsquo;s website</span></a><span style="font-weight: 400;"> to explore how to monitor your microservices with logs, metrics, and traces&mdash;all in one platform.</span></p>

<p><strong>Read more about </strong><a href="https://openobserve.ai/blog/launching-openobserve"><strong>Revolutionizing Observability - Unveiling OpenObserve, the High-Performance, Cloud-Native Platform</strong></a></p>

<p><span style="font-weight: 400;">Now that you have a solid understanding of the tracing systems supported by Istio, let's examine how to fine-tune your tracing with sampling strategies.</span></p>

<h3><span style="font-weight: 400;">Sampling Strategies</span></h3>

<p><span style="font-weight: 400;">When you're working with Istio tracing, one of the key decisions you'll make is how much trace data to collect. While capturing every trace might sound tempting, it can quickly overwhelm your system, consume resources, and drive up storage costs.&nbsp;</span></p>

<p><span style="font-weight: 400;">This is where trace sampling comes in, helping you balance between full visibility and system performance.</span></p>

<h3><span style="font-weight: 400;">What is Trace Sampling?</span></h3>

<p><span style="font-weight: 400;">In simple terms, trace sampling refers to the practice of capturing a subset of all possible traces. Instead of recording every single transaction passing through your microservices, you configure Istio to sample a certain percentage.&nbsp;</span></p>

<p><span style="font-weight: 400;">This allows you to control the amount of trace data generated, ensuring your system remains performant without losing critical insights.</span></p>

<h3><span style="font-weight: 400;">When to Use Low vs. High Sampling Rates</span></h3>

<p><span style="font-weight: 400;">Different scenarios call for different sampling rates, and understanding when to use a low or high rate can make all the difference in monitoring your system effectively.</span></p>

<ul>

<li style="font-weight: 400;"><strong>Low Sampling Rate (1-5%) for Performance Monitoring</strong><span style="font-weight: 400;">:&nbsp;</span></li>

</ul>

<p><span style="font-weight: 400;">If your primary goal is to monitor the overall health and performance of your microservices, a low sampling rate is usually sufficient. This helps reduce the data overhead while still providing enough traces to detect patterns, bottlenecks, or emerging issues.&nbsp;</span></p>

<p><span style="font-weight: 400;">For example, in a stable production environment where your services run smoothly, setting the sampling rate to 1% ensures you&rsquo;re not drowning in unnecessary data but can still keep tabs on performance.</span></p>

<ul>

<li style="font-weight: 400;"><strong>High Sampling Rate (50-100%) for Debugging</strong><span style="font-weight: 400;">:&nbsp;</span></li>

</ul>

<p><span style="font-weight: 400;">When you&rsquo;re troubleshooting or debugging a specific service, increasing the sampling rate can be a lifesaver. Capturing more traces gives you a deeper look into the interactions between services, making it easier to pinpoint the exact source of issues.&nbsp;</span></p>

<p><span style="font-weight: 400;">Imagine you&rsquo;re dealing with a sporadic latency problem in one of your core services; setting the sampling rate to 100% temporarily ensures you don&rsquo;t miss any data that could be critical in solving the problem.</span></p>

<h3><span style="font-weight: 400;">Setting and Modifying the Sampling Rate in Istio</span></h3>

<p><span style="font-weight: 400;">Configuring the sampling rate in Istio is straightforward. By default, Istio sets the sampling rate to 1%, but you can easily modify it based on your needs.&nbsp;</span></p>

<p><span style="font-weight: 400;">Here&rsquo;s how you can adjust the sampling rate using the IstioOperator configuration:</span></p>

<table>

<tbody>

<tr style="height: 126.719px;">

<td style="height: 126.719px;">

<p><span style="font-weight: 400;">apiVersion: </span><span style="font-weight: 400;">install.istio.io/v1alpha1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">kind: </span><span style="font-weight: 400;">IstioOperator</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">spec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; meshConfig:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; enableTracing: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; defaultConfig:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; tracing:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; sampling: </span><span style="font-weight: 400;">50.0</span><span style="font-weight: 400;">&nbsp; </span><span style="font-weight: 400;"># Set to 50% sampling rate</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this example, the sampling rate is set to 50%, meaning half of all requests will be traced. Adjust this based on whether you're monitoring the system for performance or debugging a specific issue.</span></p>

<h3><span style="font-weight: 400;">Best Practices for Sampling Configuration</span></h3>

<ul>

<li style="font-weight: 400;"><strong>Start with a Low Sampling Rate</strong><span style="font-weight: 400;">: In most production environments, starting with a 1-5% sampling rate will keep things manageable without overloading your system. This is often enough to monitor general trends and catch issues before they escalate.</span></li>

<li style="font-weight: 400;"><strong>Adjust Based on System Needs</strong><span style="font-weight: 400;">: During peak load times or when scaling up your microservices, it may be wise to reduce the sampling rate further to avoid unnecessary resource consumption. On the other hand, when rolling out new features or troubleshooting, temporarily increasing the rate can give you the detailed data you need.</span></li>

<li style="font-weight: 400;"><strong>Dynamic Sampling</strong><span style="font-weight: 400;">: Some advanced observability setups use dynamic sampling, adjusting the rate based on specific criteria like error rates or performance degradation. This approach lets you collect more traces when your system is under stress while reducing the load during normal operation.</span></li>

</ul>

<p><span style="font-weight: 400;">Sampling is the key to maintaining a balance between performance and trace visibility in Istio tracing. Now, let's move on to how to troubleshoot common tracing issues and avoid potential pitfalls.</span></p>

<h2><span style="font-weight: 400;">Troubleshooting Common Issues</span></h2>

<p><span style="font-weight: 400;">Even with Istio tracing set-up, things don&rsquo;t always run smoothly. Missing traces, misconfigured services, and mysterious gaps in your data can leave you scratching your head.&nbsp;</span></p>

<p><span style="font-weight: 400;">The good news?&nbsp;</span></p>

<p><span style="font-weight: 400;">Most of these issues are common, and there are clear ways to resolve them.&nbsp;</span></p>

<p><span style="font-weight: 400;">Let&rsquo;s dive into the most frequent pitfalls and how you can troubleshoot them efficiently.</span></p>

<h3><span style="font-weight: 400;">Missing Traces? Start Here</span></h3>

<p><span style="font-weight: 400;">One of the most frustrating issues you&rsquo;ll face is missing traces. You&rsquo;ve got everything configured, yet some requests just don&rsquo;t appear in your tracing system.&nbsp;</span></p>

<p><span style="font-weight: 400;">The first thing to check is whether your sampling rate is set too low. If it&rsquo;s set at 1%, for instance, you&rsquo;ll only capture a fraction of the traces, which can make it seem like traces are missing. Increasing the rate temporarily to 100% can help confirm whether this is the issue.</span></p>

<p><span style="font-weight: 400;">Next, ensure that the tracing headers are being properly propagated between your services. Use the following command to check if the headers are making their way across:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">kubectl logs &lt;pod-name&gt; -n &lt;namespace&gt; | grep </span><span style="font-weight: 400;">'x-b3-traceid'</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">If you don&rsquo;t see any trace IDs in the logs, it&rsquo;s likely that the headers aren&rsquo;t being passed along correctly.</span></p>

<h3><span style="font-weight: 400;">Double-Check Port Naming Conventions</span></h3>

<p><span style="font-weight: 400;">Istio requires strict adherence to port naming conventions, and this is a common source of problems. If your ports aren&rsquo;t named correctly, Istio might not inject the necessary sidecar proxies, and as a result, you won&rsquo;t capture traces for those services.&nbsp;</span></p>

<p><span style="font-weight: 400;">The solution?&nbsp;</span></p>

<p><span style="font-weight: 400;">Ensure that service ports are named with a protocol prefix like </span><span style="font-weight: 400;">http-</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">grpc-</span><span style="font-weight: 400;">, or </span><span style="font-weight: 400;">tcp-</span><span style="font-weight: 400;">.&nbsp;</span></p>

<p><span style="font-weight: 400;">For example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">ports:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; - name: </span><span style="font-weight: 400;">http-api</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; port: </span><span style="font-weight: 400;">8080</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; targetPort: </span><span style="font-weight: 400;">8080</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Incorrect naming here can break tracing across the entire service mesh, so it&rsquo;s worth double-checking.</span></p>

<h3><span style="font-weight: 400;">Validate Namespace Labeling</span></h3>

<p><span style="font-weight: 400;">Another common mistake is overlooking the need for correct namespace labeling. Istio&rsquo;s tracing features only work if the namespace has the appropriate labels.&nbsp;</span></p>

<p><span style="font-weight: 400;">To ensure the correct labels are applied, run:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">kubectl label namespace &lt;namespace&gt; istio-injection=enabled</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This command enables Istio&rsquo;s sidecar injection for the namespace, ensuring all services within it are properly instrumented for tracing.</span></p>

<h3><span style="font-weight: 400;">Configuration Pitfalls to Avoid</span></h3>

<ul>

<li style="font-weight: 400;"><strong>Misconfigured Mesh Policies</strong><span style="font-weight: 400;">: If you&rsquo;re running into issues with Istio&rsquo;s service mesh policies, such as mTLS settings, tracing can break due to miscommunication between services. Make sure the mesh policies are consistent and allow proper communication between services.</span></li>

<li style="font-weight: 400;"><strong>Third-Party Tracing Platform Misconfiguration</strong><span style="font-weight: 400;">: If you&rsquo;re using third-party tracing platforms like Jaeger or Zipkin, double-check that Istio is properly configured to send traces to those backends. Misconfigured endpoints or ports can result in traces not reaching the backend at all.</span></li>

</ul>

<p><span style="font-weight: 400;">To verify that traces are reaching your tracing system, you can run a port-forward command for Jaeger:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">kubectl port-forward svc/jaeger-query 16686:16686 -n istio-system</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">Then access Jaeger via </span><span style="font-weight: 400;">http://localhost:16686</span><span style="font-weight: 400;"> to confirm that the traces are flowing in.</span></p>

<h3><span style="font-weight: 400;">Debugging Commands to Validate Trace Context Propagation</span></h3>

<p><span style="font-weight: 400;">If traces aren&rsquo;t showing up in the backend, here&rsquo;s a quick way to validate if trace context is being propagated across services:</span></p>

<p><strong>Check for Sidecar Injection</strong><span style="font-weight: 400;">:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">kubectl get pods -n &lt;namespace&gt; -o=jsonpath=</span><span style="font-weight: 400;">"{.items\[*].metadata.annotations\['sidecar.istio.io/status']}"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This checks whether the sidecar proxies are correctly injected into your pods.</span></p>

<p><strong>Monitor Trace Flow</strong><span style="font-weight: 400;">:&nbsp;</span></p>

<p><span style="font-weight: 400;">If you're not seeing trace context propagate, inspect the logs of your services for the trace headers. Use the earlier </span><span style="font-weight: 400;">kubectl logs</span><span style="font-weight: 400;"> command to ensure that headers like </span><span style="font-weight: 400;">x-b3-traceid</span><span style="font-weight: 400;"> are present throughout the flow.</span></p>

<p><span style="font-weight: 400;">With these troubleshooting steps, you can easily resolve the most common Istio tracing issues.&nbsp;</span></p>

<p><strong>Read more about </strong><a href="https://openobserve.ai/blog/jidu-journey-to-100-tracing-fidelity"><strong>Jidu's Journey to 100% Tracing Fidelity with OpenObserve. A Case Study</strong></a></p>

<h2><span style="font-weight: 400;">Advanced Configuration and Customization</span></h2>

<p><span style="font-weight: 400;">Once you&rsquo;ve got Istio tracing up and running, you may find that out-of-the-box settings don&rsquo;t quite meet all your needs. Whether you're looking to customise trace behaviour, experiment with advanced propagation techniques, or explore new standards like W3C Trace Context, the good news is that Istio allows for significant flexibility.&nbsp;</span></p>

<p><span style="font-weight: 400;">Let&rsquo;s dive into some real-world customisation strategies to enhance your tracing setup.</span></p>

<p><span style="font-weight: 400;">Tailoring Tracing Configurations to Your Needs</span></p>

<p><span style="font-weight: 400;">While the default tracing configuration in Istio works well for most setups, you might want to fine-tune it for specific use cases.&nbsp;</span></p>

<p><span style="font-weight: 400;">For example, you can customise which requests get traced by using custom trace sampling rules or adjusting the headers being propagated.</span></p>

<p><span style="font-weight: 400;">One common customisation is adding </span><strong>custom headers</strong><span style="font-weight: 400;"> to enrich your traces.&nbsp;</span></p>

<p><span style="font-weight: 400;">For instance, you may want to add a user ID or a session ID to your trace data to better track specific user flows across your services. You can achieve this by modifying your application to include the additional headers when propagating trace information:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;"># Add custom headers in your application</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">headers = {</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"> &nbsp; </span><span style="font-weight: 400;">'x-request-id'</span><span style="font-weight: 400;">: request.headers.get(</span><span style="font-weight: 400;">'x-request-id'</span><span style="font-weight: 400;">),</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"> &nbsp; </span><span style="font-weight: 400;">'x-user-id'</span><span style="font-weight: 400;">: request.headers.get(</span><span style="font-weight: 400;">'x-user-id'</span><span style="font-weight: 400;">),&nbsp; </span><span style="font-weight: 400;"># Custom header for user ID tracking</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By adding these custom headers, you gain more granularity and can troubleshoot issues at the user or session level.</span></p>

<h3><span style="font-weight: 400;">Exploring Advanced Propagation Techniques</span></h3>

<p><span style="font-weight: 400;">Sometimes the basic trace propagation methods may not be enough, especially when dealing with complex microservices environments or external systems. One advanced technique is to implement trace context propagation across multiple service meshes or across services that don&rsquo;t natively support Istio. This can be useful when you need to integrate with third-party services or legacy systems.</span></p>

<p><span style="font-weight: 400;">In these cases, you may need to manually forward the trace headers or even transform them if the external system expects different formats. By writing custom middleware or hooks, you can ensure that trace context is preserved, even across different environments.</span></p>

<p><span style="font-weight: 400;">Another helpful technique is </span><strong>head-based sampling</strong><span style="font-weight: 400;">, which allows you to make sampling decisions based on the content of the request headers before it even enters your mesh.&nbsp;</span></p>

<p><span style="font-weight: 400;">This technique is particularly helpful when you want to prioritise tracing for certain types of requests, such as high-value transactions.</span></p>

<h3><span style="font-weight: 400;">Looking Forward: W3C Trace Context</span></h3>

<p><span style="font-weight: 400;">The future of tracing is being shaped by emerging standards like the </span><strong>W3C Trace Context</strong><span style="font-weight: 400;">, which aims to create a unified format for tracing headers across all platforms and tools. Adopting this standard ensures interoperability between various tracing systems and allows for easier integration with third-party services.</span></p>

<p><span style="font-weight: 400;">To start using W3C Trace Context in your Istio tracing setup, you can enable support by configuring your Envoy proxy to handle the new header format:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">apiVersion: </span><span style="font-weight: 400;">install.istio.io/v1alpha1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">kind: </span><span style="font-weight: 400;">IstioOperator</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">spec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; values:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; global:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; proxy:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; tracer: </span><span style="font-weight: 400;">"w3c-trace-context"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By enabling this feature, you ensure that your services are future-proofed and ready to integrate seamlessly with any observability tool that supports the W3C standard.</span></p>

<p><span style="font-weight: 400;">For developers looking to dive deeper into W3C Trace Context and other advanced tracing configurations, check out the official</span><a href="https://www.w3.org/TR/trace-context/"> <span style="font-weight: 400;">W3C Trace Context documentation</span></a><span style="font-weight: 400;">.</span></p>

<p><span style="font-weight: 400;">Advanced tracing configurations allow you to fine-tune your observability stack, making it more resilient, scalable, and adaptable to your specific use cases.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">By now, you've seen how powerful Istio tracing can be in monitoring and optimising your microservices architecture. Whether you're configuring basic traces, customising for advanced use cases, or exploring the future of tracing with W3C Trace Context, Istio provides the flexibility to adapt to your needs.</span></p>

<p><span style="font-weight: 400;">For those looking to streamline their observability further, consider using </span><strong>OpenObserve (O2)</strong><span style="font-weight: 400;">. With support for logs, metrics, and traces all in one platform, OpenObserve offers a cost-effective alternative to traditional tools like Elasticsearch and Datadog. It&rsquo;s easy to get started, and its simple setup can save you time and significantly reduce storage costs.</span></p>

<p><span style="font-weight: 400;">Ready to level up your monitoring?</span><a href="https://cloud.openobserve.ai/"> <span style="font-weight: 400;">Sign up here</span></a><span style="font-weight: 400;"> or explore more on</span><a href="https://openobserve.com"> <span style="font-weight: 400;">OpenObserve&rsquo;s website</span></a><span style="font-weight: 400;">. You can also check out the code and contribute via</span><a href="https://github.com/openobserve"> <span style="font-weight: 400;">GitHub</span></a><span style="font-weight: 400;">.</span></p>
