---
title: Using HTTP Event Collector for Splunk Data
seoTitle: Using HTTP Event Collector for Splunk Data
description: Step-by-step process to configure and activate Splunk HEC Receiver
  for efficient data collection and management.
img: /img/resources/using-http-event-collector-for-splunk-data.png
alt: Splunk HEC Receiver
slug: splunk-hec-receiver-configuration
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - HTTP
  - Splunk Data
  - HEC
---
<p><span style="font-weight: 400;">Setting up a robust data collection and management system is essential for any modern enterprise, and the HTTP Event Collector (HEC) for Splunk is a powerful tool to achieve this.&nbsp;</span></p>

<h3><span style="font-weight: 400;">Why Choose Splunk HEC?</span></h3>

<p><span style="font-weight: 400;">Using the HTTP Event Collector for Splunk streamlines the process of gathering and managing data from various sources.&nbsp;</span></p>

<p><span style="font-weight: 400;">It allows you to send data directly to Splunk over HTTP or HTTPS, making it easy to integrate with your existing infrastructure.</span></p>

<p><strong>Benefits:</strong></p>

<ul>

<li style="font-weight: 400;"><strong>Real-Time Data Ingestion:</strong><span style="font-weight: 400;"> Captures data as it&rsquo;s generated, ensuring timely insights.</span></li>

<li style="font-weight: 400;"><strong>Scalable and Flexible:</strong><span style="font-weight: 400;"> Easily scales with your data needs and integrates with multiple sources.</span></li>

<li style="font-weight: 400;"><strong>Secure Data Transmission:</strong><span style="font-weight: 400;"> Supports HTTPS for secure data transfer, protecting your sensitive information.</span></li>

</ul>

<p><span style="font-weight: 400;">In this guide, we&rsquo;ll walk you through the process of configuring and activating the Splunk HEC Receiver, ensuring your data collection is efficient and effective.</span></p>

<h2><span style="font-weight: 400;">Getting Started</span></h2>

<p><span style="font-weight: 400;">Before diving into the configuration, let&rsquo;s outline the essential steps to get your Splunk HEC Receiver up and running.</span></p>

<h3><span style="font-weight: 400;">Step 1: Configuring the Splunk HEC</span></h3>

<p><span style="font-weight: 400;">First, you need to configure the Splunk HEC. This involves setting up an endpoint and generating an access token.</span></p>

<ol>

<li style="font-weight: 400;"><strong>Access Splunk Web:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Log in to your Splunk instance and navigate to Settings &gt; Data Inputs &gt; HTTP Event Collector.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Create a New Token:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Click on &ldquo;New Token,&rdquo; and follow the prompts to configure the new token. Give it a name, select the allowed indexes, and configure any other settings as needed.</span></li>

</ul>

<li style="font-weight: 400;"><strong>Save and Note the Token:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Save your new token and make sure to copy it. You will need this token to configure the OpenTelemetry Collector.</span></li>

</ul>

</ol>

<h3><span style="font-weight: 400;">Step 2: Deploying the Splunk Distribution of the OpenTelemetry Collector</span></h3>

<p><span style="font-weight: 400;">Deploy the Splunk Distribution of the OpenTelemetry Collector in your environment. This collector will handle data collection and forwarding to Splunk.</span></p>

<p><strong>Example Deployment Command:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">kubectl apply -f https://github.com/signalfx/splunk-otel-collector-deployments</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Step 3: Configuring the Splunk HEC in the Collector</span></h3>

<p><span style="font-weight: 400;">Next, configure the Splunk HEC in the OpenTelemetry Collector. Add the Splunk HEC configuration to your collector&rsquo;s configuration file.</span></p>

<p><strong>Example Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[splunk_hec]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">\[splunk_hec]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Step 4: Restarting the Collector</span></h3>

<p><span style="font-weight: 400;">After updating the configuration, restart the OpenTelemetry Collector to apply the changes. This ensures the new settings take effect and data starts flowing to your Splunk instance.</span></p>

<p><strong>Restart Command:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">kubectl rollout restart deployment/splunk-otel-collector</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Smooth Sailing Ahead: Your Data Pipeline is Ready</span></h3>

<p><span style="font-weight: 400;">By following these steps, you&rsquo;ve set the foundation for an efficient data collection system using the Splunk HEC Receiver.&nbsp;</span></p>

<p><span style="font-weight: 400;">This setup ensures that your data is ingested in real-time, securely transmitted, and ready for analysis in Splunk.</span></p>

<p><span style="font-weight: 400;">In the next sections, we&rsquo;ll dive deeper into sample configurations, detailed settings, and advanced features to help you fine-tune your setup.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Sample Configuration</span></h2>

<p><span style="font-weight: 400;">Configuring the Splunk HEC Receiver might seem daunting at first, but with the right setup, you can streamline your data collection and analysis processes efficiently.&nbsp;</span></p>

<p><span style="font-weight: 400;">Let&rsquo;s walk through a sample configuration that will get your Splunk HEC Receiver integrated with the OpenTelemetry Collector.&nbsp;</span></p>

<h3><span style="font-weight: 400;">Setting the Stage: Basic Configuration</span></h3>

<p><span style="font-weight: 400;">To begin, you need to define the basic settings for your Splunk HEC Receiver within the OpenTelemetry Collector configuration file.&nbsp;</span></p>

<p><span style="font-weight: 400;">This includes specifying the endpoint and the authentication token required for data transmission.</span></p>

<p><strong>Example Basic Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Adding It to the Collector Configuration File</span></h3>

<p><span style="font-weight: 400;">Next, you&rsquo;ll need to add this configuration to the OpenTelemetry Collector configuration file. This step integrates the Splunk HEC Receiver into your data pipeline, ensuring that telemetry data is correctly ingested and processed.</span></p>

<p><strong>Example Collector Configuration File:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[splunk_hec]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">\[splunk_hec]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Detailed Settings: Tailoring Your Configuration</span></h3>

<p><span style="font-weight: 400;">To ensure your configuration meets your specific requirements, you might need to tweak additional settings such as TLS, CORS, and field mappings. Below is an example of a more detailed configuration that includes these settings.</span></p>

<p><strong>Example Detailed Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; tls:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; insecure_skip_verify: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; cors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; allowed_origins: </span><span style="font-weight: 400;">\["https://your-app.com"]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; hec_metadata_to_otel_attrs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; source: </span><span style="font-weight: 400;">"source"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; sourcetype: </span><span style="font-weight: 400;">"sourcetype"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; index: </span><span style="font-weight: 400;">"index"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; tls:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; insecure_skip_verify: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[splunk_hec]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">splunk_hec]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Final Touch: Restarting the Collector</span></h3>

<p><span style="font-weight: 400;">After updating your configuration file, you need to restart the OpenTelemetry Collector to apply the new settings. This ensures that your configuration changes take effect and that data starts flowing to your Splunk instance.</span></p>

<p><strong>Restart Command:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">kubectl rollout restart deployment/splunk-otel-collector</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Why This Matters</span></h3>

<p><span style="font-weight: 400;">Setting up the Splunk HEC Receiver correctly is crucial for efficient data collection and management.&nbsp;</span></p>

<p><span style="font-weight: 400;">This configuration ensures that your data pipeline is robust, secure, and ready to handle large volumes of telemetry data. By following this sample configuration, you can streamline your observability efforts and gain deeper insights into your systems.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll dive into more advanced configurations, including detailed settings for endpoints, authentication methods, and optional features like TLS and field mappings.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Detailed Configuration</span></h2>

<p><span style="font-weight: 400;">Setting up the Splunk HTTP Event Collector (HEC) with OpenTelemetry is just the beginning.&nbsp;</span></p>

<p><span style="font-weight: 400;">To ensure optimal performance and security, you may need to dive into more detailed settings.&nbsp;</span></p>

<h3><span style="font-weight: 400;">Comprehensive Configuration: All the Details You Need</span></h3>

<p><span style="font-weight: 400;">A robust configuration for your Splunk HEC Receiver involves several key components. Here&rsquo;s a detailed example that includes all the settings you might need:</span></p>

<p><strong>Example Comprehensive Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; hec_metadata_to_otel_attrs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; source: </span><span style="font-weight: 400;">"source"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; sourcetype: </span><span style="font-weight: 400;">"sourcetype"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; index: </span><span style="font-weight: 400;">"index"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; tls:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; insecure_skip_verify: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; cors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; allowed_origins: </span><span style="font-weight: 400;">\["https://your-app.com"]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; tls:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; insecure_skip_verify: </span><span style="font-weight: 400;">true</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[splunk_hec]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">splunk_hec]</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Key Configuration Settings</span></h3>

<p><strong>Endpoint, Access Token, and Paths</strong></p>

<ul>

<li style="font-weight: 400;"><strong>Endpoint</strong><strong>:</strong><span style="font-weight: 400;"> The URL where your Splunk HEC instance is accessible. Ensure this is correctly set to avoid connectivity issues.</span></li>

<li style="font-weight: 400;"><strong>Token:</strong><span style="font-weight: 400;"> The authentication token generated in Splunk for secure data transmission.</span></li>

<li style="font-weight: 400;"><strong>Paths:</strong><span style="font-weight: 400;"> Specify the paths for log data and other telemetry data to ensure they are routed correctly within Splunk.</span></li>

</ul>

<p><strong>Example Settings:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /><br /></span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Optional TLS Settings: Ensuring Secure Data Transmission</span></h3>

<p><span style="font-weight: 400;">To secure your data in transit, you can configure TLS settings. This ensures that your telemetry data is encrypted and protected against interception.</span></p>

<p><strong>Example TLS Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">tls:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; insecure_skip_verify: </span><span style="font-weight: 400;">true</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">If you need more stringent security settings, replace </span><span style="font-weight: 400;">insecure_skip_verify</span><span style="font-weight: 400;"> with proper certificate configurations to verify your server&rsquo;s identity.</span></p>

<h3><span style="font-weight: 400;">Field Mappings: Adding Context to Your Data</span></h3>

<p><span style="font-weight: 400;">Field mappings allow you to enrich your telemetry data with additional context, making it more meaningful and easier to analyze. You can map metadata from the Splunk HEC events to OpenTelemetry attributes.</span></p>

<p><strong>Example Field Mappings:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">hec_metadata_to_otel_attrs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; source: </span><span style="font-weight: 400;">"source"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; sourcetype: </span><span style="font-weight: 400;">"sourcetype"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; index: </span><span style="font-weight: 400;">"index"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Integrating OpenObserve: Enhancing Your Observability</span></h3>

<p><span style="font-weight: 400;">While Splunk HEC provides powerful capabilities for data collection, integrating OpenObserve (O2) can take your observability to the next level. OpenObserve offers advanced visualization and alerting features, making it an excellent alternative or complement to Splunk for managing and analyzing telemetry data.</span></p>

<p><strong>Example Configuration with OpenObserve:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">exporters:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; otlp:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"http://your-openobserve-instance:4317"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; compression: </span><span style="font-weight: 400;">gzip</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">service:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; pipelines:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; logs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; receivers: </span><span style="font-weight: 400;">\[splunk_hec]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; processors: </span><span style="font-weight: 400;">\[batch]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; exporters: </span><span style="font-weight: 400;">[logging,</span> <span style="font-weight: 400;">splunk_hec,</span> <span style="font-weight: 400;">otlp]</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By carefully configuring your Splunk HEC Receiver and considering an integration with OpenObserve, you can build a robust, scalable, and secure observability solution.&nbsp;</span></p>

<p><span style="font-weight: 400;">This setup not only ensures efficient data collection and management but also provides powerful tools for real-time monitoring and alerting, giving you comprehensive insights into your systems.</span></p>

<p><span style="font-weight: 400;">For more detailed information and to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;">.&nbsp;</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll cover the various authorization methods available for the Splunk HEC Receiver, including basic authentication, bearer token authentication, OIDC, OAuth 2, and custom authentication implementations.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Securing Your Setup: Authorization Methods for Splunk HEC Receiver</span></h2>

<p><span style="font-weight: 400;">Ensuring secure access to your telemetry data is crucial for maintaining the integrity and confidentiality of your observability pipeline. The Splunk HEC Receiver supports multiple authentication methods to suit different security needs.&nbsp;</span></p>

<h3><span style="font-weight: 400;">Locking It Down: Authorization Methods</span></h3>

<ol>

<li><span style="font-weight: 400;"> Basic Authentication</span></li>

</ol>

<p><span style="font-weight: 400;">Basic authentication is the simplest form of securing your Splunk HEC Receiver. It involves using a username and password to authenticate access. While easy to implement, it is recommended to use this method over HTTPS to ensure credentials are not transmitted in plain text.</span></p>

<p><strong>Example Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; basic_auth:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; username: </span><span style="font-weight: 400;">"your-username"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; password: </span><span style="font-weight: 400;">"your-password"</span></p>

</td>

</tr>

</tbody>

</table>

<ol start="2">

<li><span style="font-weight: 400;"> Bearer Token Authentication</span></li>

</ol>

<p><span style="font-weight: 400;">Bearer token authentication uses a token to authenticate requests. This method is more secure than basic authentication and is ideal for environments where tokens can be managed and rotated regularly.</span></p>

<p><strong>Example Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-bearer-token"</span></p>

</td>

</tr>

</tbody>

</table>

<ol start="3">

<li><span style="font-weight: 400;"> OIDC Authentication</span></li>

</ol>

<p><span style="font-weight: 400;">OpenID Connect (OIDC) provides a modern and secure method for authentication by using tokens issued by an OIDC provider. This method is particularly useful in environments where single sign-on (SSO) and federated identity management are implemented.</span></p>

<p><strong>Example Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; oidc:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; issuer_url: </span><span style="font-weight: 400;">"https://your-oidc-provider"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; client_id: </span><span style="font-weight: 400;">"your-client-id"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; client_secret: </span><span style="font-weight: 400;">"your-client-secret"</span></p>

</td>

</tr>

</tbody>

</table>

<ol start="4">

<li><span style="font-weight: 400;"> OAuth 2 Client</span></li>

</ol>

<p><span style="font-weight: 400;">OAuth 2 is a robust and flexible authentication framework that allows secure delegated access. Implementing OAuth 2 client authentication ensures that access tokens are issued securely and can be scoped appropriately for different services.</span></p>

<p><strong>Example Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; oauth2:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; client_id: </span><span style="font-weight: 400;">"your-client-id"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; client_secret: </span><span style="font-weight: 400;">"your-client-secret"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; token_url: </span><span style="font-weight: 400;">"https://your-oauth2-provider/token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; scopes: </span><span style="font-weight: 400;">["read",</span> <span style="font-weight: 400;">"write"]</span></p>

</td>

</tr>

</tbody>

</table>

<ol start="5">

<li><span style="font-weight: 400;"> Custom Authentication</span></li>

</ol>

<p><span style="font-weight: 400;">For environments with unique security requirements, custom authentication methods can be implemented. This might involve integrating with proprietary authentication systems or using custom tokens.</span></p>

<p><strong>Example Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; custom_auth:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; header: </span><span style="font-weight: 400;">"X-Custom-Auth"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; value: </span><span style="font-weight: 400;">"your-custom-token"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By leveraging the various authentication methods available, you can tailor your security strategy to fit your specific needs.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Fine-Tuning Your Splunk HEC: Configuration Settings</span></h2>

<p><span style="font-weight: 400;">To get the most out of your Splunk HEC setup, you need to understand and configure various settings meticulously.&nbsp;&nbsp;</span></p>

<h3><span style="font-weight: 400;">Configuration Options for the Splunk HEC</span></h3>

<p><span style="font-weight: 400;">Configuring the Splunk HEC involves setting up several parameters that ensure secure, efficient, and accurate data collection and transmission.&nbsp;</span></p>

<p><span style="font-weight: 400;">Here&rsquo;s a breakdown of the essential configuration options:</span></p>

<p><strong>Basic Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">receivers:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; splunk_hec:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Detailed Settings for Endpoint, TLS, CORS, and Auth Fields</span></h3>

<p><span style="font-weight: 400;">Endpoint Configuration</span></p>

<p><span style="font-weight: 400;">The </span><span style="font-weight: 400;">endpoint</span><span style="font-weight: 400;"> setting specifies the URL where your Splunk HEC instance is accessible. This must be correctly set to ensure data is transmitted to the right destination.</span></p>

<p><strong>Example Endpoint Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">endpoint: </span><span style="font-weight: 400;">"https://your-splunk-instance:8088"</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">TLS Settings: Secure Your Data</span></p>

<p><span style="font-weight: 400;">TLS (Transport Layer Security) settings are crucial for securing data in transit. Properly configuring these settings ensures that your data is encrypted, maintaining its confidentiality and integrity.</span></p>

<p><strong>Example TLS Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">tls:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; insecure_skip_verify: </span><span style="font-weight: 400;">false</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; cert_file: </span><span style="font-weight: 400;">"/path/to/your/cert.pem"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; key_file: </span><span style="font-weight: 400;">"/path/to/your/key.pem"</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li style="font-weight: 400;"><strong>insecure_skip_verify:</strong><span style="font-weight: 400;"> Set to </span><span style="font-weight: 400;">false</span><span style="font-weight: 400;"> to ensure the server&rsquo;s certificate is verified.</span></li>

<li style="font-weight: 400;"><strong>cert_file &amp; key_file:</strong><span style="font-weight: 400;"> Specify the paths to your certificate and key files for secure connections.</span></li>

</ul>

<p><span style="font-weight: 400;">CORS Settings: Controlling Access</span></p>

<p><span style="font-weight: 400;">Cross-Origin Resource Sharing (CORS) settings control how your resources are shared across different origins. Configuring CORS is essential for security, especially when dealing with web applications.</span></p>

<p><strong>Example CORS Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">cors:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; allowed_origins: </span><span style="font-weight: 400;">\["https://your-app.com"]</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li style="font-weight: 400;"><strong>allowed_origins:</strong><span style="font-weight: 400;"> Specifies which origins are permitted to access the resources.</span></li>

</ul>

<p><span style="font-weight: 400;">Authentication Fields</span></p>

<p><span style="font-weight: 400;">Authentication settings ensure that only authorized users and applications can send data to your Splunk HEC Receiver. Various methods include basic authentication, bearer tokens, OIDC, OAuth 2, and custom authentication.</span></p>

<p><strong>Example Bearer Token Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">token: </span><span style="font-weight: 400;">"your-splunk-hec-token"</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Mapping Metadata: hec_metadata_to_otel_attrs</span></h3>

<p><span style="font-weight: 400;">Mapping metadata from Splunk HEC events to OpenTelemetry attributes enhances the data&rsquo;s context and usability.&nbsp;</span></p>

<p><span style="font-weight: 400;">This mapping allows you to enrich the collected telemetry data with additional information that can be critical for analysis and troubleshooting.</span></p>

<p><strong>Example Metadata Mapping Configuration:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">hec_metadata_to_otel_attrs:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; source: </span><span style="font-weight: 400;">"source"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; sourcetype: </span><span style="font-weight: 400;">"sourcetype"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; index: </span><span style="font-weight: 400;">"index"</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li style="font-weight: 400;"><strong>source:</strong><span style="font-weight: 400;"> Maps the source field from Splunk HEC to an OpenTelemetry attribute.</span></li>

<li style="font-weight: 400;"><strong>sourcetype:</strong><span style="font-weight: 400;"> Maps the sourcetype field to an OpenTelemetry attribute.</span></li>

<li style="font-weight: 400;"><strong>index:</strong><span style="font-weight: 400;"> Maps the index field to an OpenTelemetry attribute.</span></li>

</ul>

<p><span style="font-weight: 400;">By fine-tuning these configuration settings, you can ensure that your Splunk HEC Receiver operates securely and efficiently. Proper endpoint settings, robust TLS configurations, precise CORS controls, and flexible authentication methods collectively create a robust data collection setup.&nbsp;</span></p>

<p><span style="font-weight: 400;">Additionally, integrating metadata mapping enhances the richness of your telemetry data, making it more actionable.</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">Configuring and optimizing your Splunk HEC Receiver setup is crucial for efficient and secure data collection. By carefully adjusting the endpoint settings, TLS configurations, CORS controls, and authentication methods, you can build a robust and reliable observability pipeline.&nbsp;</span></p>

<p><span style="font-weight: 400;">Additionally, enriching your telemetry data with metadata mappings and integrating OpenObserve (O2) for advanced visualization and analysis further enhances your observability capabilities.</span></p>

<p><span style="font-weight: 400;">Following the guidelines provided in this guide ensures that your Splunk HEC Receiver operates securely, efficiently, and effectively, providing comprehensive insights into your systems. For more detailed information and to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;">.&nbsp;</span></p>
