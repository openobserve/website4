---
title: "Sending Pino Logs to OpenObserve: A Step-by-Step Guide"
seoTitle: "Sending Pino Logs to OpenObserve: A Step-by-Step Guide"
description: "Learn how to send Pino logs to OpenObserve using the @openobserve/pino-openobserve npm library. This comprehensive guide provides step-by-step instructions, including setting up the project, configuring OpenObserve integration, and observing logs in OpenObserve."
img: img/blog/pino-banner.png
alt: OpenObserve Pino Logs
slug: sending-pino-logs-to-openobserve
authors:
  - kirtan
publishDate: 2024-02-12
tags:
  - logging
  - observability
  - pino
  - openobserve
  - nodejs
---


## Introduction:

Logging is an essential part of any application, providing valuable insights into its behavior and performance. Pino is a popular logging library for Node.js applications, known for its high performance and low overhead. In this blog post, we will explore how to send Pino logs to OpenObserve, a powerful observability platform, using the newly released `@openobserve/pino-openobserve` npm library. Whether you are a beginner or an experienced developer, this step-by-step guide will help you get started with ease.

## Prerequisites:

Before we dive into the implementation, make sure you have the following prerequisites in place:

1. Node.js: Ensure that you have Node.js installed on your machine. You can download it from the official Node.js website (https://nodejs.org) and follow the installation instructions for your operating system.

2. Pino: Familiarize yourself with the Pino logging library. If you haven't used Pino before, it's a lightweight and fast logger for Node.js applications. You can learn more about Pino and its features in the official documentation (https://github.com/pinojs/pino).

3. OpenObserve Cloud or a self-hosted instance: Sign up for an account on OpenObserve (https://www.openobserve.ai) if you haven't already. OpenObserve is a comprehensive observability platform that helps you monitor and analyze your application's logs, metrics, and traces.

### Step 1: Setting up the Project
To begin, create a new Node.js project or use an existing one. Open your preferred text editor and create a file named `app.js`. Copy the sample code provided below into `app.js`:

```javascript
const express = require("express");
const app = express();
const port = 3005;
const pino = require("pino");
const pinoOpenObserve = require('@openobserve/pino-openobserve')

const logger = pino({
  level: "info"},
  new pinoOpenObserve({
    url: 'https://alpha1.dev.zinclabs.dev/',
    organization: 'YOUR_ORGANIZATION_NAME',
    auth: {
      username: "YOUR_USERNAME",
      password: "YOUR_PASSWORD",
    },
    streamName: "YOUR_STREAM_NAME",
    batchSize: 1,
    timeThreshold: 15 * 1000
  }),
);

app.use(express.json());

app.get("/hello", (req, res) => {
  logger.info({ log: `Hello World!`, type: "GET", url: "/hello" });
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

### Step 2: Installing Dependencies
In your project directory, open a terminal and run the following command to install the required dependencies:

```bash
npm install express pino @openobserve/pino-openobserve
```

This will install the Express framework, Pino logging library, and the `@openobserve/pino-openobserve` npm package.

### Step 3: Configuring OpenObserve Integration
To send your Pino logs to OpenObserve, you need to configure the `pinoOpenObserve` plugin. In the code snippet above, replace the following placeholder values with your actual information:

- `YOUR_ORGANIZATION_NAME`: Replace with your OpenObserve organization name.
- `YOUR_USERNAME`: Replace with your OpenObserve account username.
- `YOUR_PASSWORD`: Replace with your OpenObserve account password.
- `YOUR_STREAM_NAME`: Replace with the name of the stream where you want to send your logs.

Additionally, the `pinoOpenObserve` constructor has two optional parameters that you can customize:

- `batchSize`: The number of logs to batch together before sending to OpenObserve. For this example, we have set it to 1. The default value is 1000.
- `timeThreshold`: The time threshold (in milliseconds) that triggers sending logs to OpenObserve, even if the `batchSize` is not reached. For this example, we have set it to `15 * 1000` (15 seconds). The default value is `5 * 60 * 1000` (5 minutes).

For more detailed information about these parameters, refer to the official documentation of `@openobserve/pino-openobserve` at https://www.npmjs.com/package/@openobserve/pino-openobserve.

### Step 4: Logging with Pino and OpenObserve
Now that everything is set up, let's explore how to log with Pino and send those logs to OpenObserve. In the provided sample code, we have a simple Express route `/hello` that logs a message and sends a response.

```javascript
app.get("/hello", (req, res) => {
  logger.info({ log: `Hello World!`, type: "GET", url: "/hello" });
  res.send("Hello World");
});
```

In this example, `logger.info()` is used to log an informational message. You can use other log levels like `debug`, `warn`, or `error` based on the severity of the log. The log message is an object with key-value pairs representing the log data.

### Step 5: Running the Application
To start the application, run the following command in your terminal:

```bash
node app.js
```

You should see a message indicating that the example app is listening on the specified port. Now, when you access `http://localhost:3005/hello` in your browser, the server will log the message and send a "Hello World" response.

### Step 6: Observing Logs in OpenObserve
Once your application is running and generating logs, it's time to observe them in OpenObserve. Log in to your OpenObserve account and navigate to the stream you specified in the configuration (`YOUR_STREAM_NAME` in the sample code).

In OpenObserve, you can explore your logs, search for specific log entries, apply filters, and gain insights into your application's behavior. OpenObserve provides powerful visualization tools and integrations with other observability components, making it easier to monitor and troubleshoot your application.

## Conclusion
In this blog post, we learned how to send Pino logs to OpenObserve using the `@openobserve/pino-openobserve` npm library. By integrating Pino with OpenObserve, you can centralize your logs and gain valuable insights into your application's performance and behavior. Remember to configure the OpenObserve plugin with your specific details, including your OpenObserve organization name, username, password, and stream name. Additionally, you can customize optional parameters like `batchSize` and `timeThreshold` based on your requirements. For more detailed information about these parameters, refer to the official documentation of `@openobserve/pino-openobserve` at https://www.npmjs.com/package/@openobserve/pino-openobserve.

Happy logging and observing!