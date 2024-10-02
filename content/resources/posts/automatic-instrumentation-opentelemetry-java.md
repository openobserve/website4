---
title: OpenTelemetry Java Automatic Instrumentation
seoTitle: OpenTelemetry Java Automatic Instrumentation
description: Learn about automatic instrumentation with OpenTelemetry Java,
  compatibility across Java 8+ JVMs, and auto-detecting popular libraries.
img: /img/resources/opentelemetry-java-automatic-instrumentation.png
alt: Automatic Instrumentation
slug: automatic-instrumentation-opentelemetry-java
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - Automatic Instrumentation
  - java
---
<p><strong>Transform your application performance</strong><span style="font-weight: 400;"> with the ease of OpenTelemetry Java Automatic Instrumentation.</span></p>

<p><strong>OpenTelemetry Java Automatic Instrumentation</strong><span style="font-weight: 400;"> offers a streamlined approach to capturing telemetry data (metrics, traces, and logs) from Java applications.&nbsp;</span></p>

<p><span style="font-weight: 400;">By injecting bytecode into running applications, it automatically instruments popular libraries and frameworks without requiring extensive code changes. This significantly reduces the development effort and time needed to establish observability.</span></p>

<p><strong>Key benefits include:</strong></p>

<ul>

<li style="font-weight: 400;"><strong>Reduced development overhead:</strong><span style="font-weight: 400;"> No need to write custom instrumentation code.</span></li>

<li style="font-weight: 400;"><strong>Faster time to insights:</strong><span style="font-weight: 400;"> Quickly gain visibility into application performance and behavior.</span></li>

<li style="font-weight: 400;"><strong>Standardized telemetry:</strong><span style="font-weight: 400;"> Adheres to OpenTelemetry standards, ensuring compatibility with various observability tools like </span><strong>OpenObserve</strong><span style="font-weight: 400;">.</span></li>

<li style="font-weight: 400;"><strong>Improved troubleshooting:</strong><span style="font-weight: 400;"> Identify performance bottlenecks and root causes efficiently.</span></li>

</ul>

<p><span style="font-weight: 400;">By leveraging auto-instrumentation, organizations can accelerate their observability journey and make data-driven decisions to optimize application performance.</span></p>

<h3><span style="font-weight: 400;">Compatibility&nbsp;</span></h3>

<p><strong>OpenTelemetry Java Automatic Instrumentation</strong><span style="font-weight: 400;"> is designed to work seamlessly with </span><strong>Java 8 and later versions</strong><span style="font-weight: 400;">. This broad compatibility ensures that you can adopt auto-instrumentation regardless of your application's Java runtime environment.</span></p>

<p><span style="font-weight: 400;">By supporting a wide range of JVMs, OpenTelemetry promotes wider adoption and enables consistent telemetry collection across different application stacks.</span></p>

<h3><span style="font-weight: 400;">Capabilities</span></h3>

<p><strong>OpenTelemetry Java Automatic Instrumentation</strong><span style="font-weight: 400;"> excels at automatically detecting and instrumenting a wide range of popular Java libraries and frameworks. This includes:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Web frameworks:</strong><span style="font-weight: 400;"> Spring Boot, Tomcat, Jetty, etc.</span></li>

<li style="font-weight: 400;"><strong>Database drivers:</strong><span style="font-weight: 400;"> JDBC, MySQL, PostgreSQL, etc.</span></li>

<li style="font-weight: 400;"><strong>Messaging systems:</strong><span style="font-weight: 400;"> Kafka, RabbitMQ, etc.</span></li>

<li style="font-weight: 400;"><strong>HTTP clients:</strong><span style="font-weight: 400;"> Apache HttpClient, OkHttp, etc.</span></li>

<li style="font-weight: 400;"><strong>Other common libraries:</strong><span style="font-weight: 400;"> Logback, Hibernate, etc.</span></li>

</ul>

<p><span style="font-weight: 400;">By instrumenting these components, you gain valuable insights into their performance, dependencies, and error patterns. This information is crucial for identifying bottlenecks and ensuring application reliability.</span></p>

<p><span style="font-weight: 400;">In the following section you will learn about the requirements for auto-instrumentation.</span></p>

<h2><span style="font-weight: 400;">Requirements for Auto-Instrumentation</span></h2>

<p><span style="font-weight: 400;">Automatic instrumentation in OpenTelemetry for Java involves several key requirements and configurations essential for monitoring Java applications effectively. Here's a detailed discussion on the requirements for auto-instrumentation.</span></p>

<h3><span style="font-weight: 400;">Java Agent Requirement</span></h3>

<p><span style="font-weight: 400;">To enable auto-instrumentation, a Java agent is necessary for each monitored service instance. This agent is a JAR file that must be attached to any Java 8+ application. It dynamically modifies the application's bytecode to capture telemetry data from various libraries and frameworks without requiring changes to the application code itself.&nbsp;</span></p>

<p><span style="font-weight: 400;">This capability allows for the monitoring of inbound requests, outbound HTTP calls, database interactions, and more.</span></p>

<h3><span style="font-weight: 400;">Configuration Specifics</span></h3>

<p><span style="font-weight: 400;">Several configuration parameters are crucial for setting up the Java agent correctly:</span></p>

<ul>

<li style="font-weight: 400;"><strong>OTLP_HTTP_ENDPOINT</strong><span style="font-weight: 400;">: This specifies the endpoint to which the telemetry data will be sent. It is essential for the agent to communicate with the OpenTelemetry Collector or other backends.</span></li>

<li style="font-weight: 400;"><strong>SERVICE_NAME</strong><span style="font-weight: 400;">: This parameter identifies the service being monitored. It helps in organizing and filtering telemetry data based on the service.</span></li>

<li style="font-weight: 400;"><strong>APPLICATION_NAME</strong><span style="font-weight: 400;">: Similar to SERVICE_NAME, this parameter provides a human-readable name for the application, aiding in the identification of telemetry data associated with specific applications.</span></li>

</ul>

<p><span style="font-weight: 400;">These parameters can typically be set through environment variables or system properties, allowing for flexible configuration based on deployment needs.</span></p>

<h3><span style="font-weight: 400;">Agent Version Compatibility</span></h3>

<p><span style="font-weight: 400;">For optimal performance and compatibility, it is recommended to use the Java agent version 2.6.0. This version ensures that users benefit from the latest features, bug fixes, and improvements in the OpenTelemetry framework.&nbsp;</span></p>

<p><span style="font-weight: 400;">Using an outdated version may lead to incompatibilities or missing functionalities that could hinder effective monitoring and observability.</span></p>

<p><span style="font-weight: 400;">The next few sections deal with requisite steps for auto-instrumentation.</span></p>

<h2><span style="font-weight: 400;">Setting Up Auto-Instrumentation</span></h2>

<p><span style="font-weight: 400;">To set up auto-instrumentation for Java applications using OpenTelemetry, you need to follow these steps:</span></p>

<h3><span style="font-weight: 400;">1. Downloading the OpenTelemetry Java Agent</span></h3>

<ul>

<li style="font-weight: 400;"><a href="https://github.com/open-telemetry/opentelemetry-java-instrumentation"><span style="font-weight: 400;">Download the latest version of the OpenTelemetry Java agent</span></a><span style="font-weight: 400;">, which is recommended to be version 2.6.0 or higher.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The agent is typically distributed as a JAR file that can be attached to any Java 8+ application.</span></li>

</ul>

<h3><span style="font-weight: 400;">2. Distributing the Agent to Service Hosts or Containers</span></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Once you have downloaded the agent, you need to distribute it to the hosts or containers where your Java services are running.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">This can be done by copying the agent JAR file to a shared location accessible by all service instances or by including it in the Docker image or container deployment process.</span></li>

</ul>

<h3><span style="font-weight: 400;">3. Setting Proper Permissions for Agent Execution</span></h3>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Ensure that the Java process running your application has the necessary permissions to execute the OpenTelemetry Java agent.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">This typically involves setting the appropriate file permissions on the agent JAR file to allow read and execute access for the user or process running the Java application.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">In containerized environments, you may need to configure the container's security context or set the appropriate file permissions during the container build process.</span></li>

</ul>

<p><span style="font-weight: 400;">After completing these setup steps, you need to configure the Java agent by specifying the required parameters:</span></p>

<ul>

<li style="font-weight: 400;"><strong>OTLP_HTTP_ENDPOINT</strong><span style="font-weight: 400;">: Set this environment variable or system property to specify the endpoint where the telemetry data will be sent, such as the OpenTelemetry Collector or other backends.</span></li>

<li style="font-weight: 400;"><strong>SERVICE_NAME</strong><span style="font-weight: 400;">: Provide a unique identifier for the service being monitored. This helps in organizing and filtering telemetry data.</span></li>

<li style="font-weight: 400;"><strong>APPLICATION_NAME</strong><span style="font-weight: 400;">: Assign a human-readable name for the application to aid in identifying telemetry data.</span></li>

</ul>

<p><span style="font-weight: 400;">These configuration parameters can be set through environment variables or system properties, allowing for flexible deployment based on your specific needs.</span></p>

<p><span style="font-weight: 400;">By following these steps and configuring the necessary parameters, you can successfully set up auto-instrumentation for Java applications using the OpenTelemetry Java agent version 2.6.0 or higher</span></p>

<h2><span style="font-weight: 400;">Configuring Auto-Instrumentation</span></h2>

<p><span style="font-weight: 400;">Here is how to configure OpenTelemetry Java auto-instrumentation using environment variables and command line options:</span></p>

<h3><span style="font-weight: 400;">Using Environment Variables</span></h3>

<p><span style="font-weight: 400;">The recommended way to configure the OpenTelemetry Java agent is by setting environment variables that the JVM can access. The following environment variables can be used:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">JAVA_TOOL_OPTIONS="-javaagent:path/to/opentelemetry-javaagent.jar"</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTEL_TRACES_EXPORTER=otlp</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTEL_METRICS_EXPORTER=none</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTEL_LOGS_EXPORTER=none</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTEL_EXPORTER_OTLP_ENDPOINT=http://OTLP_HTTP_ENDPOINT</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTEL_SERVICE_NAME=SERVICE_NAME</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">OTEL_RESOURCE_ATTRIBUTES=application=APPLICATION_NAME</span></li>

</ul>

<h3><span style="font-weight: 400;">Example Environment Variable Configuration</span></h3>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">JAVA_TOOL_OPTIONS=</span><span style="font-weight: 400;">"-javaagent:/path/to/opentelemetry-javaagent.jar"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">OTEL_TRACES_EXPORTER=otlp</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">OTEL_METRICS_EXPORTER=none</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">OTEL_LOGS_EXPORTER=none</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">OTEL_SERVICE_NAME=my-service</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">OTEL_RESOURCE_ATTRIBUTES=application=my-app</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Command Line Setup</span></h3>

<p><span style="font-weight: 400;">Alternatively, you can append the configuration to the Java command line when starting your service:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">java -javaagent:/path/to/opentelemetry-javaagent</span><span style="font-weight: 400;">.jar</span><span style="font-weight: 400;"> \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.traces.exporter</span><span style="font-weight: 400;">=otlp \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.metrics.exporter</span><span style="font-weight: 400;">=</span><span style="font-weight: 400;">none</span><span style="font-weight: 400;"> \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.logs.exporter</span><span style="font-weight: 400;">=</span><span style="font-weight: 400;">none</span><span style="font-weight: 400;"> \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.exporter.otlp.endpoint</span><span style="font-weight: 400;">=http:</span><em><span style="font-weight: 400;">//otel-collector:4318 \</span></em><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.service.name</span><span style="font-weight: 400;">=my-service \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.resource.attributes</span><span style="font-weight: 400;">=application=my-app \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; ...</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Example Command Line Configuration</span></h3>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">java -javaagent:/opt/opentelemetry-javaagent</span><span style="font-weight: 400;">.jar</span><span style="font-weight: 400;"> \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.traces.exporter</span><span style="font-weight: 400;">=otlp \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.metrics.exporter</span><span style="font-weight: 400;">=</span><span style="font-weight: 400;">none</span><span style="font-weight: 400;"> \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.logs.exporter</span><span style="font-weight: 400;">=</span><span style="font-weight: 400;">none</span><span style="font-weight: 400;"> \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.exporter.otlp.endpoint</span><span style="font-weight: 400;">=http:</span><em><span style="font-weight: 400;">//otel-collector:4318 \</span></em><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.service.name</span><span style="font-weight: 400;">=shopping-cart \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -Dotel</span><span style="font-weight: 400;">.resource.attributes</span><span style="font-weight: 400;">=application=ecommerce \</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; -jar my-app.jar</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">The key configuration options are:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Path to the OpenTelemetry Java agent JAR file</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Setting </span><span style="font-weight: 400;">otlp</span><span style="font-weight: 400;"> as the traces exporter</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Disabling metrics and logs exporting</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Specifying the OTLP endpoint URL for the OpenTelemetry Collector</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Defining the service and application names as resource attributes</span></li>

</ul>

<h2><span style="font-weight: 400;">Using Auto-Instrumentation</span></h2>

<p><span style="font-weight: 400;">Here&rsquo;s a guide on deploying a Java application with OpenTelemetry, configuring a Docker image with environment variables, and running the Docker image.</span></p>

<h3><span style="font-weight: 400;">Steps to Deploy a Java Application with OpenTelemetry</span></h3>

<ol>

<li style="font-weight: 400;"><a href="https://opentelemetry.io/docs/zero-code/java/agent/"><strong>Download the OpenTelemetry Java Agent</strong></a><span style="font-weight: 400;">: Obtain the OpenTelemetry Java agent JAR file from the official OpenTelemetry releases.</span></li>

<li style="font-weight: 400;"><strong>Add the Java Agent to Your Application</strong><span style="font-weight: 400;">: Modify your Java application's startup command to include the Java agent. This can be done either through command line options or by setting environment variables.</span></li>

<li style="font-weight: 400;"><strong>Configure OpenTelemetry</strong><span style="font-weight: 400;">: Set the necessary configuration parameters, such as the service name, exporter settings, and resource attributes, using environment variables or JVM options.</span></li>

<li style="font-weight: 400;"><strong>Build Your Application</strong><span style="font-weight: 400;">: Package your Java application into a JAR or WAR file, ensuring that it is ready for deployment.</span></li>

<li style="font-weight: 400;"><strong>Deploy the Application</strong><span style="font-weight: 400;">: Deploy your application on your desired platform (e.g., cloud, on-premises server).</span></li>

</ol>

<h3><span style="font-weight: 400;">Configuring a Docker Image with Environment Variables</span></h3>

<p><span style="font-weight: 400;">To configure a Docker image for your Java application with OpenTelemetry, you can use the following Dockerfile example:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">FROM</span><span style="font-weight: 400;"> openjdk:</span><span style="font-weight: 400;">11</span><span style="font-weight: 400;">-jre</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><em><span style="font-weight: 400;"># Set the working directory</span></em><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">WORKDIR</span><span style="font-weight: 400;"> /app</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><em><span style="font-weight: 400;"># Copy the OpenTelemetry Java agent and your application JAR</span></em><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">COPY</span><span style="font-weight: 400;"> opentelemetry-javaagent.jar /app/</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">COPY</span><span style="font-weight: 400;"> my-app.jar /app/</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><em><span style="font-weight: 400;"># Set environment variables for OpenTelemetry</span></em><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">ENV</span><span style="font-weight: 400;"> JAVA_TOOL_OPTIONS=</span><span style="font-weight: 400;">"-javaagent:/app/opentelemetry-javaagent.jar"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">ENV</span><span style="font-weight: 400;"> OTEL_SERVICE_NAME=</span><span style="font-weight: 400;">"my-service"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">ENV</span><span style="font-weight: 400;"> OTEL_EXPORTER_OTLP_ENDPOINT=</span><span style="font-weight: 400;">"http://otel-collector:4318"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">ENV</span><span style="font-weight: 400;"> OTEL_RESOURCE_ATTRIBUTES=</span><span style="font-weight: 400;">"application=my-app"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><em><span style="font-weight: 400;"># Command to run the application</span></em><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">CMD</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">"java"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"-jar"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"my-app.jar"</span><span style="font-weight: 400;">]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">In this Dockerfile:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">The OpenTelemetry Java agent and the application JAR are copied into the image.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Environment variables are set to configure OpenTelemetry.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">The application is run with the specified Java command.</span></li>

</ul>

<h3><span style="font-weight: 400;">Running the Docker Image</span></h3>

<p><span style="font-weight: 400;">After building your Docker image, you can run it using the following command:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">bash</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">docker build -t my-java-</span><span style="font-weight: 400;">app</span><span style="font-weight: 400;"> .</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">docker </span><span style="font-weight: 400;">run</span><span style="font-weight: 400;"> -</span><span style="font-weight: 400;">d</span><span style="font-weight: 400;"> --name my-running-</span><span style="font-weight: 400;">app</span><span style="font-weight: 400;"> my-java-</span><span style="font-weight: 400;">app</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This command builds the Docker image with the tag </span><span style="font-weight: 400;">my-java-app</span><span style="font-weight: 400;"> and then runs it in detached mode. The application will start with OpenTelemetry auto-instrumentation enabled, sending telemetry data to the specified OTLP endpoint.</span></p>

<p><span style="font-weight: 400;">By following these steps, you can successfully deploy a Java application with OpenTelemetry, configure it within a Docker image, and run the application.</span></p>

<h2><span style="font-weight: 400;">Verifying Instrumentation</span></h2>

<p><span style="font-weight: 400;">When the OpenTelemetry Java agent is successfully integrated into your application, you can expect to see specific log outputs that indicate the agent is functioning correctly. Typical expected log messages include:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Agent Initialization: Logs that confirm the OpenTelemetry agent has started and initialized successfully.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Instrumentation Messages: Logs indicating that various libraries or frameworks (like HTTP clients, databases, etc.) have been instrumented. For example:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">\[INFO] OpenTelemetry Java Agent - Instrumentation </span><span style="font-weight: 400;">for</span><span style="font-weight: 400;"> [</span><span style="font-weight: 400;">Library</span> <span style="font-weight: 400;">Name</span><span style="font-weight: 400;">] initialized.</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Trace and Span Creation: Logs showing that traces and spans are being created as requests are processed. For example:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">[</span><span style="font-weight: 400;">TRACE</span><span style="font-weight: 400;">] </span><span style="font-weight: 400;">Creating</span><span style="font-weight: 400;"> span for \[operation name].</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Exporting Telemetry Data: Logs that confirm telemetry data (traces, metrics, etc.) are being exported to the configured endpoint. For example:</span></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">[</span><span style="font-weight: 400;">INFO</span><span style="font-weight: 400;">] </span><span style="font-weight: 400;">Exporting</span><span style="font-weight: 400;"> telemetry data to [</span><span style="font-weight: 400;">OTLP</span><span style="font-weight: 400;"> endpoint].</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Checking Metrics and Traces in Observability Tools</span></h3>

<p><span style="font-weight: 400;">To verify that your instrumentation is working as expected, you can check the metrics and traces in observability tools such as OpenObserve APM. Here&rsquo;s how to do it:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Access OpenObserve APM</strong><span style="font-weight: 400;">: Log into your </span><a href="https://openobserve.ai/resources/tag/apm"><span style="font-weight: 400;">OpenObserve APM</span></a><span style="font-weight: 400;"> dashboard.</span></li>

<li style="font-weight: 400;"><strong>Navigate to Traces</strong><span style="font-weight: 400;">: Look for a section labeled "Traces" or "Distributed Tracing." Here, you should see traces corresponding to requests made to your application.</span></li>

<li style="font-weight: 400;"><strong>Inspect Individual Traces</strong><span style="font-weight: 400;">: Click on individual traces to view detailed information about the spans, including execution time, errors, and service dependencies.</span></li>

<li style="font-weight: 400;"><strong>Check Metrics</strong><span style="font-weight: 400;">: Navigate to the "Metrics" section to view performance metrics such as response times, error rates, and throughput. You should see metrics that reflect the performance of your instrumented application.</span></li>

<li style="font-weight: 400;"><strong>Alerts and Dashboards</strong><span style="font-weight: 400;">: Set up alerts and dashboards to monitor the health of your application continuously. This will help you identify any issues related to instrumentation or performance.</span></li>

</ol>

<p><span style="font-weight: 400;">By following these steps, you can effectively verify that the OpenTelemetry Java agent is integrated correctly and that your application is sending telemetry data to your observability tools.</span></p>

<h2><span style="font-weight: 400;">Advanced Auto-Instrumentation Techniques</span></h2>

<p><span style="font-weight: 400;">Here are some advanced auto-instrumentation techniques using OpenTelemetry:</span></p>

<h3><span style="font-weight: 400;">Combining Auto-Instrumentation with Custom Instrumentation</span></h3>

<p><span style="font-weight: 400;">While auto-instrumentation covers many common libraries and frameworks, there may be cases where you need to add custom instrumentation for your specific application logic. OpenTelemetry supports a mix of auto-instrumentation and manual instrumentation.</span></p>

<p><span style="font-weight: 400;">To combine the two, you can:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Use auto-instrumentation for popular libraries like HTTP clients, databases, message queues, etc.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Add custom instrumentation around unique application code or components not covered by auto-instrumentation</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Use the OpenTelemetry API to manually create spans, add attributes, and record metrics</span></li>

</ul>

<p><span style="font-weight: 400;">This hybrid approach allows you to benefit from the out-of-the-box instrumentation while customizing the tracing for your specific needs.</span></p>

<h3><span style="font-weight: 400;">Creating Custom Spans for Specific Application Logic</span></h3>

<p><span style="font-weight: 400;">To create custom spans for application-specific logic, you can use the OpenTelemetry API directly in your code. Here's an example in Java:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">java</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">import io.opentelemetry.api.OpenTelemetry;</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">import io.opentelemetry.api.trace.Span;</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">import io.opentelemetry.api.trace.Tracer;</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Tracer tracer = OpenTelemetry.getGlobalTracer(</span><span style="font-weight: 400;">"my-service"</span><span style="font-weight: 400;">);</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Span span = tracer.spanBuilder(</span><span style="font-weight: 400;">"my-custom-span"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; .setSpanKind(Span.Kind.INTERNAL)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; .startSpan();</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">try</span><span style="font-weight: 400;"> (Scope scope = span.makeCurrent()) {</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><em><span style="font-weight: 400;">// Custom application logic here</span></em><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><em><span style="font-weight: 400;">// ...</span></em><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">} </span><span style="font-weight: 400;">finally</span><span style="font-weight: 400;"> {</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; span.end();</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">}</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This code creates a new span for a specific operation, allowing you to capture traces for custom code paths. You can set the span kind, add attributes, and record events as needed.</span></p>

<h3><span style="font-weight: 400;">Enriching Spans with Additional Attributes</span></h3>

<p><span style="font-weight: 400;">To add more context to your traces, you can enrich spans with additional attributes. This helps provide more insights into the request flow and aids in debugging and analysis.</span></p>

<p><span style="font-weight: 400;">Some examples of attributes you can add:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">User ID or username</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Tenant or organization ID</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Cache hits/misses</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Error codes or messages</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Latency of downstream calls</span></li>

</ul>

<p><span style="font-weight: 400;">Here's how to add attributes to a span in Java:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">java</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">span.setAttribute</span><span style="font-weight: 400;">(</span><span style="font-weight: 400;">"user.id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"123456"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">.setAttribute</span><span style="font-weight: 400;">(</span><span style="font-weight: 400;">"cache.hits"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">5</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">.setAttribute</span><span style="font-weight: 400;">(</span><span style="font-weight: 400;">"cache.misses"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">2</span><span style="font-weight: 400;">);</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By leveraging these advanced techniques, you can create a comprehensive observability solution that provides deep visibility into your application's performance and behavior.</span></p>

<h2><span style="font-weight: 400;">Learning More About OpenTelemetry</span></h2>

<p><span style="font-weight: 400;">OpenTelemetry is a vendor-neutral, open-source project that provides a standardized framework for collecting and exporting telemetry data such as traces, metrics, and logs from applications.&nbsp;</span></p>

<p><span style="font-weight: 400;">It is designed to support observability across various programming languages and platforms, enabling developers to gain insights into application performance and behavior.&nbsp;</span></p>

<p><span style="font-weight: 400;">OpenTelemetry aims to unify the way telemetry data is collected and processed, making it easier for organizations to implement observability without being locked into specific vendor solutions.</span></p>

<h3><span style="font-weight: 400;">Available Instrumentation for Different Languages</span></h3>

<p><span style="font-weight: 400;">OpenTelemetry supports a wide range of programming languages, providing auto-instrumentation libraries and SDKs for:</span></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Java: Instrumentation for popular frameworks like Spring, JAX-RS, and more.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">JavaScript: Support for Node.js and browser-based applications.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Python: Instrumentation for web frameworks like Flask and Django.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Go: Integration with various libraries and frameworks.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">C#: Support for .NET applications.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Ruby: Instrumentation for Ruby on Rails and other frameworks.</span></li>

</ul>

<p><span style="font-weight: 400;">Each language has its specific libraries and configurations, allowing developers to easily instrument their applications and collect telemetry data.</span></p>

<h3><span style="font-weight: 400;">OpenTelemetry Registry and Contribution Opportunities</span></h3>

<p><span style="font-weight: 400;">OpenTelemetry encourages community involvement and contributions. The OpenTelemetry registry serves as a central repository for instrumentation libraries, documentation, and examples. Developers can contribute by:</span></p>

<ul>

<li style="font-weight: 400;"><strong>Creating New Instrumentation</strong><span style="font-weight: 400;">: If a library or framework is not yet supported, developers can create new instrumentation modules.</span></li>

<li style="font-weight: 400;"><strong>Improving Documentation</strong><span style="font-weight: 400;">: Enhancing existing documentation or providing examples can help others in the community.</span></li>

<li style="font-weight: 400;"><strong>Reporting Issues</strong><span style="font-weight: 400;">: Users can report bugs or request features to improve the project.</span></li>

<li style="font-weight: 400;"><strong>Participating in Discussions</strong><span style="font-weight: 400;">: Engaging in community discussions on forums or GitHub can help shape the direction of the project.</span></li>

</ul>

<p><span style="font-weight: 400;">Contributing to OpenTelemetry not only helps improve the project but also fosters a collaborative environment where developers can share knowledge and best practices related to observability.</span></p>

<h2><span style="font-weight: 400;">Support and Resources</span></h2>

<h3><span style="font-weight: 400;">Signing Up for OpenObserve</span></h3>

<p><span style="font-weight: 400;">To get started with OpenObserve, you need to create an account on their platform. Here are the steps:</span></p>

<ol>

<li style="font-weight: 400;"><a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">Sign Up For Free</span></a></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Fill Out the Registration Form</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Verify Your Email</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Log In</span></li>

</ol>

<p><span style="font-weight: 400;">Once your account is activated, log in to the OpenObserve platform to start using the observability tools.</span></p>

<h2><span style="font-weight: 400;">Developer Resources and Guides (OpenObserve)</span></h2>

<p><span style="font-weight: 400;">OpenObserve provides comprehensive developer resources and guides to help users effectively utilize the platform. You can typically find these resources in the following sections:</span></p>

<ul>

<li style="font-weight: 400;"><a href="https://openobserve.ai/docs/"><span style="font-weight: 400;">Documentation</span></a><span style="font-weight: 400;">: Detailed guides on how to set up and configure OpenObserve, including installation instructions and usage examples.</span></li>

<li style="font-weight: 400;"><a href="https://openobserve.ai/docs/api_specs/"><span style="font-weight: 400;">API References</span></a><span style="font-weight: 400;">: Information on the APIs available for integration with OpenObserve, including endpoints and data formats.</span></li>

<li style="font-weight: 400;"><a href="https://www.youtube.com/watch?v=fZ-ErfMdF-o"><span style="font-weight: 400;">Tutorials</span></a><span style="font-weight: 400;">: Step-by-step tutorials that walk you through common use cases and advanced features.</span></li>

<li style="font-weight: 400;"><a href="https://discuss.openobserve.ai/t/openobserve-java-tracing-integration-and-troubleshooting/2K2718"><span style="font-weight: 400;">Community Forums</span></a><span style="font-weight: 400;">: Access to community discussions where you can ask questions and share knowledge with other users.</span></li>

</ul>

<p><span style="font-weight: 400;">By following these steps and utilizing the available resources, you can effectively set up and leverage OpenObserve for your observability needs.</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><strong>OpenTelemetry Java Automatic Instrumentation</strong><span style="font-weight: 400;"> provides a robust foundation for building comprehensive observability solutions.&nbsp;</span></p>

<p><span style="font-weight: 400;">By seamlessly integrating with popular Java libraries and frameworks, it simplifies the process of capturing and analyzing telemetry data.</span></p>

<p><strong>OpenObserve</strong><span style="font-weight: 400;"> complements this by offering a powerful platform to ingest, store, and analyze the collected telemetry data.&nbsp;</span></p>

<p><span style="font-weight: 400;">Its efficient storage, advanced querying capabilities, and intuitive visualizations empower teams to gain actionable insights and optimize application performance.</span></p>

<p><span style="font-weight: 400;">By combining OpenTelemetry's instrumentation with OpenObserve's analytics, you can effectively monitor, troubleshoot, and optimize Java applications.&nbsp;</span></p>

<p><a href="https://cloud.openobserve.ai"><span style="font-weight: 400;">Sign up Today For Free and See for yourself</span></a><span style="font-weight: 400;">.</span></p>
