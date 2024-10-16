---
title: Getting Started with Node.js in OpenTelemetry
seoTitle: Getting Started with Node.js in OpenTelemetry
description: OpenTelemetry, an effective observability framework for telemetry
  data in Node.js applications - tracing, metrics, and logs.
img: /img/resources/opentelemetry-javascript-image1.png
alt: opentelemetry javascript
slug: opentelemetry-javascript-nodejs-introduction
authors:
  - openobserve-team
publishDate: 2024-07-18
tags:
  - opentelemetry javascript
  - Node.js monitoring
  - application performance
  - OpenTelemetry SDK
  - telemetry data
---
<h2>Introduction to OpenTelemetry in Node.js</h2>

<p>
Imagine peering into the inner workings of your Node.js application, seeing exactly how it handles every request, and uncovering hidden performance bottlenecks. With OpenTelemetry, that kind of deep visibility is within reach.
</p>
<p>

![Introduction to OpenTelemetry in Node.js](/img/resources/opentelemetry-javascript-image2.png "Introduction to OpenTelemetry in Node.js")

</p>
<p>
<a href="https://openobserve.ai/docs/guide/ingestion/traces/nodejs/#setup-serviceapplication">Image Credit</a>
</p>
<h3>What is OpenTelemetry?</h3>

<p>
OpenTelemetry is an observability framework that helps developers collect and analyze data about their applications. It is particularly useful for Node.js applications, as it provides a set of APIs, SDKs, and tools to gather telemetry data, such as tracing, metrics, and logs.
</p>
<h3>Capabilities of OpenTelemetry</h3>

<p>
OpenTelemetry has several key capabilities that make it useful for Node.js developers:
</p>
<ul>

<li>Tracing: OpenTelemetry can trace the flow of requests through your application, providing detailed information about the performance of individual components and the overall application.

<li>Metrics: OpenTelemetry can collect and export metrics about your application, such as CPU usage, memory usage, and request rates.

<li>Logs: OpenTelemetry can integrate with your application's logging system to collect and export log data, making it easier to diagnose and troubleshoot issues.
</li>
</ul>
<p>
Telemetry data is essential for understanding the performance and behavior of your Node.js application. 
</p>
<p>
This can save you time and effort, as you don't have to build your custom observability solution from scratch.
</p>
<h3>Getting Started with OpenTelemetry in Node.js</h3>

<p>
To get started with OpenTelemetry in your Node.js application, you'll need to install the necessary packages and configure your application to use the OpenTelemetry SDK. There are plenty of resources available online to help you get started, including documentation, tutorials, and sample code.
</p>
<p>
These are discussed in more details in the article. In the next section you will learn about the prerequisites for using OpenTelemetry in Node.js.
</p>
<h2>Prerequisites for Using OpenTelemetry in Node.js</h2>

<p>
Before you can start using OpenTelemetry in your Node.js application, you need to ensure that you have the necessary tools and software installed. Here are the prerequisites to get started:
</p>
<h3>Node.js Installation</h3>

<p>
The first step is to ensure that you have Node.js installed on your system. OpenTelemetry supports Node.js versions that are actively maintained or in LTS (Long-Term Support) mode. This ensures you have access to the latest security patches and bug fixes.
</p>
<h3>TypeScript Installation </h3>

<p>
If your project uses TypeScript, you must ensure that it is installed on your system. TypeScript is a superset of JavaScript that adds optional static typing and other features to improve the development experience. While not required, using TypeScript can help you catch errors early and improve code maintainability.
</p>
<p>
By following these simple steps, you can ensure that you have the necessary tools to get started with OpenTelemetry. 
</p>
<p>
In the next section, you will learn how to set up your first OpenTelemetry project.
</p>
<h2>Setting Up Your First OpenTelemetry Project</h2>

<p>
In this section, you will walk through the process of setting up your first OpenTelemetry project in Node.js. You will start by creating a basic Node.js application using Express, and then we'll guide you through the steps to set up OpenTelemetry in your project.
</p>
<h3>Creating a Basic Node.js Application</h3>

<p>
Let's start by creating a simple Node.js application using Express. First, create a new directory for your project and navigate to it in your terminal. Then, run the following commands to set up your project:
</p>

<pre class="prettyprint">npm init -y
npm install express</pre>

<p>
This will create a new package.json file and install the Express dependency.
</p>
<p>
Next, create a new file called app.js and add the following code:
</p>

<pre class="prettyprint">javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, OpenTelemetry!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});</pre>

<p>
This code sets up a basic Express server that listens on port 3000 and responds with a "Hello, OpenTelemetry!" message when the root URL is accessed.
</p>
<p>
Gain Powerful Insights into Your Node.js Apps: <a href="https://cloud.openobserve.ai">Sign up for Free with OpenObserve</a> and start monitoring your Node.js applications with OpenTelemetry today!
</p>
<h3>Setting Up TypeScript </h3>

<p>
If your project uses TypeScript, you must set up the necessary configuration. Run the following commands to install TypeScript and initialize a tsconfig.json file:
</p>

<pre class="prettyprint">npm install --save-dev typescript
npx tsc --init</pre>

<p>
This will create a tsconfig.json file in your project directory, which you can customize to fit your project's needs.
</p>
<p>
Now that you have a basic Node.js application set up, you're ready to start integrating OpenTelemetry into your project. 
</p>
<p>
In the next section, we'll cover the steps to install and configure OpenTelemetry in your Node.js application.
</p>
<h2>Instrumentation with OpenTelemetry</h2>

<p>
This section will guide you through the process of installing the necessary packages and setting up automatic instrumentation in your Node.js application.
</p>
<h3>Installing the Node SDK and Auto-Instrumentation Package</h3>

<p>
To start instrumenting your Node.js application with OpenTelemetry, you'll need to install the OpenTelemetry Node SDK and the auto-instrumentation package. Run the following command in your terminal:
</p>

<pre class="prettyprint">bash
npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node</pre>

<h3>Setting Up Automatic Instrumentation</h3>

<p>
Once you have the packages installed, you can set up automatic instrumentation in your Node.js application. This involves configuring the auto-instrumentation package to capture telemetry data for your application.
</p>
<p>
To do this, create a new file called instrumentation.js and add the following code:
</p>

<pre class="prettyprint">javascript
const { registerInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

registerInstrumentations({
  instrumentations: [
    {
      name: 'express',
      version: '4.17.1',
    },
  ],
});</pre>

<p>
This code registers the Express instrumentation with OpenTelemetry, which will automatically capture telemetry data for your Express application.
</p>
<h3>Manual Instrumentation</h3>

<p>
In addition to automatic instrumentation, you can also use manual instrumentation to capture custom telemetry data. This involves creating custom instrumentation using OpenTelemetry APIs.
</p>
<p>
For example, let's say you want to capture telemetry data for a specific function in your application. You can create a custom instrumentation using the following code:
</p>

<pre class="prettyprint">javascript
const { Span } = require('@opentelemetry/api');

function myFunction() {
  const span = Span.start('my-function');
  try {
    // Your code here
  } finally {
    span.end();
  }
}</pre>

<p>
This code creates a new span for the myFunction function and captures telemetry data for the function's execution.
</p>
<p>
In the next section, you will learn how to configure exporters for telemetry data.
</p>
<h2>Collecting and Exporting Telemetry Data</h2>

<p>
Once telemetry data is collected, it is processed by OpenTelemetry to provide insights into the performance and behavior of your application. This processing includes filtering, aggregation, and transformation of the data.
</p>
<h3>Configuring Exporters</h3>

<p>
To send telemetry data to analysis tools, you need to configure exporters. Exporters are responsible for sending telemetry data to specific destinations, such as log files, databases, or cloud-based services.
</p>
<h3>Configuring Exporters for Analysis Tools</h3>

<p>
To configure exporters for analysis tools, you need to specify the destination and any required configuration options. For example, to send telemetry data to a log file, you would specify the log file path and any required log levels.
</p>
<p>
Conclusion
</p>
<p>
By following these steps, you can effectively collect and export telemetry data to gain insights into the performance and behavior of your application.
</p>
<p>
In the next section, you will learn about some advanced topics in Node.js applications.
</p>
<h2>Advanced Topics</h2>

<p>
In this section, we will explore advanced topics in OpenTelemetry, focusing on context management, custom context propagation, and sampling strategies.
</p>
<h3>Context Management in Node.js Applications</h3>

<p>
Context management is a crucial aspect of OpenTelemetry, as it helps to identify and manage the context of your application. In Node.js applications, context management is particularly important, as it allows you to track the flow of requests and responses across multiple services.
</p>
<p>
To manage context in your Node.js application, you can use the @opentelemetry/context package. This package provides a set of APIs for creating and managing context objects.
</p>
<p>
Here is an example of how you can use the @opentelemetry/context package to create a context object:
</p>

<pre class="prettyprint">javascript
const { Context } = require('@opentelemetry/context');

const context = new Context();

// Set the user ID on the context
context.set('user_id', '12345');

// Get the user ID from the context
const userId = context.get('user_id');</pre>

<h3>Implementing Custom Context Propagation</h3>

<p>
In addition to using the @opentelemetry/context package, you can also implement custom context propagation in your application. This involves creating a custom context propagation strategy that is tailored to your specific use case.
</p>
<p>
For example, you can create a custom context propagation strategy that propagates the user ID from the context to the request headers:
</p>

<pre class="prettyprint">javascript
const { Context } = require('@opentelemetry/context');

const context = new Context();

// Set the user ID on the context
context.set('user_id', '12345');

// Create a custom context propagation strategy
function propagateContext(context) {
  // Propagate the user ID from the context to the request headers
  const headers = {
    'X-User-Id': context.get('user_id'),
  };
  return headers;
}

// Use the custom context propagation strategy
const headers = propagateContext(context);</pre>

<h3>Sampling Strategies</h3>

<p>
Sampling strategies are used to reduce the volume of telemetry data by selectively capturing and sending telemetry data to the analysis tools. There are several sampling strategies available in OpenTelemetry, including:
</p>
<ul>

<li>Random Sampling: This strategy randomly selects a subset of telemetry data to capture and send to the analysis tools.

<li>Fixed Rate Sampling: This strategy captures and sends a fixed rate of telemetry data to the analysis tools.

<li>Exponential Sampling: This strategy captures and sends telemetry data at an exponential rate.
</li>
</ul>
<p>
Here is an example of how you can use the @opentelemetry/sampling package to implement a random sampling strategy:
</p>

<pre class="prettyprint">javascript
const { Sampling } = require('@opentelemetry/sampling');

// Create a random sampling strategy
const samplingStrategy = new Sampling({
  type: 'random',
  probability: 0.5,
});

// Use the sampling strategy to capture and send telemetry data
const telemetryData = samplingStrategy.sample(telemetryData);</pre>

<p>
By understanding these advanced topics, you can effectively manage and analyze telemetry data in your Node.js applications.
</p>
<p>
In the next section, you will learn about deploying and monitoring serverless applications.
</p>
<h2>Deploying and Monitoring Serverless Applications</h2>

<p>
Serverless applications have become increasingly popular due to their scalability, cost-efficiency, and ease of deployment. However, managing and monitoring serverless applications can be challenging due to their distributed nature.
</p>
<p>
In this section, we will explore the best practices for deploying and monitoring serverless applications using OpenTelemetry.
</p>
<h3>Instrumenting Serverless Functions with OpenTelemetry</h3>

<p>
To instrument serverless functions with OpenTelemetry, you need to follow these steps:
</p>
<h4>Install OpenTelemetry:</h4>

<pre class="prettyprint">
npm install @opentelemetry/sdk-node @opentelemetry/exporter-console</pre>

<h4>Create a Tracer:</h4>

<pre class="prettyprint">javascript
const { Tracer } = require('@opentelemetry/sdk-trace-node');
const tracer = new Tracer();</pre>

<h4>Create a Span:</h4>

<pre class="prettyprint">
const span = tracer.startSpan('my-function');</pre>

<h4>Add Attributes:</h4>

<pre class="prettyprint">span.setAttribute('user_id', '12345');</pre>

<h4>End the Span:</h4>

<pre class="prettyprint">span.end();</pre>

<h3>Monitoring Serverless Applications</h3>

<p>
Monitoring serverless applications involves tracking key performance indicators (KPIs) such as response time, error rates, and resource utilization. Here are some best practices for monitoring serverless applications:
</p>
<p>
Use CloudWatch:
</p>

<pre class="prettyprint">bash
aws cloudwatch put-metric-data --metric-name CPUUtilization --namespace AWS/EC2 --value 0.5</pre>

<p>
Use Prometheus:
</p>

<pre class="prettyprint">bash
prometheus --config.file=prometheus.yml</pre>

<p>
Use Grafana:
</p>

<pre class="prettyprint">bash
grafana --config.file=grafana.yml</pre>

<p>
In this section, we have covered the best practices for deploying and monitoring serverless applications using OpenTelemetry. 
</p>
<p>
In the next section, you will learn how OpenObserve can help you in getting started with Node.js in OpenTelemetry.
</p>
<h2>Using OpenObserve with Node.js</h2>

<p>
To use OpenObserve with Node.js, you need to follow these steps:
</p>
<h3>Install the OpenObserve SDK for Node.js using npm</h3>

<pre class="prettyprint">bash
npm install @openobserve/pino-openobserve</pre>

<h3>Create a Pino logger and configure it to send logs to OpenObserve</h3>

<pre class="prettyprint">javascript
const pino = require("pino");
const pinoOpenObserve = require('@openobserve/pino-openobserve');

const logger = pino({
  level: "info"
}, new pinoOpenObserve({
  url: 'https://alpha1.dev.zinclabs.dev/',
  organization: 'YOUR_ORGANIZATION_NAME',
  auth: {
    username: "YOUR_USERNAME",
    password: "YOUR_PASSWORD",
  },
  streamName: "YOUR_STREAM_NAME",
  batchSize: 1,
  timeThreshold: 15 * 1000
}));

app.use(express.json());
app.get("/hello", (req, res) => {
  logger.info({ log: `Hello World`, type: "GET", url: "/hello" });
  res.send("Hello World");
});</pre>

<h3>Send logs to OpenObserve using the Pino logger</h3>

<pre class="prettyprint">javascript
logger.info({ log: `Hello World`, type: "GET", url: "/hello" });</pre>

<h2>Setting Up OpenObserve</h2>

<p>
To set up OpenObserve, you need to follow these steps:
</p>
<ul>

<li>Sign Up: Go to the OpenObserve website and sign up for an account.

<li>Create a Project: Create a new project in OpenObserve and note down the project ID.

<li>Install the OpenObserve SDK: Install the OpenObserve SDK for your programming language (e.g., Node.js).

<li>Configure the SDK: Configure the SDK with your project ID and other required settings.
</li>
</ul>
<p>
Stop Guessing, Start Knowing: Eliminate Performance Bottlenecks in Your Node.js Applications with OpenTelemetry and OpenObserve. <a href="https://cloud.openobserve.ai">Sign up for Free Now!</a>
</p>
<p>
In the next section, you will learn how to troubleshoot implementation issues.
</p>
<h2>Troubleshooting and Feedback</h2>

<p>
As you work with OpenTelemetry, you may encounter various issues or have questions about the framework. In this article, we'll cover how to troubleshoot your OpenTelemetry implementation and provide feedback or get help from the community.
</p>
<h3>Troubleshooting OpenTelemetry</h3>

<p>
When you encounter issues with your OpenTelemetry implementation, the first step is to enable diagnostic logging. This will provide you with more detailed information about the inner workings of OpenTelemetry, which can help you identify and resolve the problem.
</p>
<p>
To enable diagnostic logging, you can use the following code:
</p>

<pre class="prettyprint">javascript
const { LogLevel, ConsoleLogger } = require('@opentelemetry/core');

const logger = new ConsoleLogger({
  level: LogLevel.DEBUG,
});

// Set the logger for the OpenTelemetry SDK
const { NodeSDK } = require('@opentelemetry/sdk-node');
const sdk = new NodeSDK({
  logger,
  // Other SDK configuration options
});

// Initialize the SDK
sdk.start();</pre>

<p>
This code creates a new ConsoleLogger instance with the LogLevel.DEBUG setting, which will output detailed logs to the console. You can then use these logs to identify and troubleshoot any issues with your OpenTelemetry implementation.
</p>
<h3>Providing Feedback and Getting Help</h3>

<p>
If you have questions, feedback, or need help with OpenTelemetry, there are several ways to get in touch with the community:
</p>
<ul>

<li>GitHub Discussions: The OpenTelemetry project has a dedicated GitHub Discussions page where you can ask questions, share ideas, and engage with the community. You can access the discussions at https://github.com/open-telemetry/opentelemetry-js/discussions.

<li>CNCF Slack: The OpenTelemetry project has an active community on the CNCF Slack workspace. You can join the workspace and participate in the #opentelemetry channel to get help and connect with other users. You can sign up for the CNCF Slack at https://slack.cncf.io/.

<li>OpenObserve Community: If you're using OpenObserve in addition to OpenTelemetry, you can also reach out to the OpenObserve community for support. You can find information about the OpenObserve community on the project's website at <a href="https://openobserve.ai/">https://openobserve.ai/</a>. 
</li>
</ul>
<p>
By leveraging these resources, you can ensure that you get the most out of your OpenTelemetry experience and contribute to the ongoing development of the project.
</p>
<h2>Conclusion</h2>

<p>
This article equips you with the basics of using OpenTelemetry to collect telemetry data from your Node.js applications. OpenObserve complements OpenTelemetry by providing Simplified Data Visualization and Robust Alerting.
</p>
<p>
By following these steps and leveraging OpenObserve, you can gain a comprehensive understanding of your Node.js application's performance and ensure a seamless user experience.
</p>
<p>
Gain Powerful Insights into Your Node.js Apps: <a href="https://cloud.openobserve.ai">Sign up for Free with OpenObserve</a> and start monitoring your Node.js applications with OpenTelemetry today!
</p>
<h2>Additional Resources & Bibliography</h2>

<ul>

<li>Check out the official OpenTelemetry Demo:<a href="https://github.com/open-telemetry/opentelemetry-demo"> https://github.com/open-telemetry/opentelemetry-demo</a>

<li>OpenTelemetry JavaScript API functionalities with the official reference guide:<a href="https://opentelemetry.io/docs/languages/js/getting-started/nodejs/"> https://opentelemetry.io/docs/languages/js/getting-started/nodejs/</a>

<li>Explore a wider range of OpenTelemetry examples and tutorials to solidify your understanding:<a href="https://github.com/open-telemetry/opentelemetry.io"> https://github.com/open-telemetry/opentelemetry.io</a>

<li>A comprehensive walkthrough of instrumenting your Node.js application with OpenTelemetry:<a href="https://opentelemetry.io/docs/languages/js/getting-started/"> https://opentelemetry.io/docs/languages/js/getting-started/</a>

<li><span style="text-decoration:underline;"> This video provides a good introduction to OpenTelemetry and walks you through instrumenting a Node.js application with tracing.</span>

<li>This video provides a good introduction to OpenTelemetry and walks you through instrumenting a Node.js application with tracing: <a href="https://www.youtube.com/watch?v=n-Ar0nnho3s">https://www.youtube.com/watch?v=n-Ar0nnho3s</a>

<li>This video focuses on using OpenTelemetry with the Express framework in Node.js:<a href="https://www.youtube.com/watch?v=DYHAmbi42ZU">https://www.youtube.com/watch?v=DYHAmbi42ZU</a><span style="text-decoration:underline;"> by DebugBear. </span>

<li><a href="https://openobserve.ai/docs/">OpenObserve Documentation</a>

<li><a href="https://medevel.com/openobserve/">OpenObserve: The Ultimate Open-Source Platform</a>

<li><a href="https://www.youtube.com/@openobserve">Watch OpenObserve Videos on YouTube</a>
</li>
</ul>
