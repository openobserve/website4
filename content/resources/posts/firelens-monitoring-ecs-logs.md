---
title: Monitor Amazon ECS logs using AWS FireLens
seoTitle: Monitor Amazon ECS logs using AWS FireLens
description: FireLens is a log router for Amazon ECS that offers direct
  streaming to destinations like Amazon CloudWatch and simplifies log filtering.
img: /img/resources/firelens-image1.png
alt: firelens
slug: firelens-monitoring-ecs-logs
authors:
  - openobserve-team
publishDate: 2024-06-29
tags:
  - FireLens
  - AWS ECS
  - log routing
  - Amazon ECS
  - AWS Fargate
---
</p>
<h2>Introduction to AWS FireLens</h2>

<p>
Are you struggling to keep tabs on your Amazon ECS container logs? You're not alone. AWS FireLens offers a powerful solution for routing your ECS logs to various destinations, streamlining your monitoring and troubleshooting processes. 
</p>
<p>
This article dives into using FireLens to gain valuable insights into your containerized applications running on ECS. From understanding its core functionalities to configuration steps, we'll equip you to leverage FireLens and achieve comprehensive log management for your ECS deployments.
</p>
<p>
Let's dive into the world of FireLens, a log router for Amazon ECS and AWS Fargate.
</p>
<p>
FireLens is a log router that helps you collect, process, and route logs from your applications running on Amazon ECS and AWS Fargate. It's designed to simplify log management by providing a centralized way to collect and route logs from your applications to various destinations, such as CloudWatch Logs, Splunk, or ELK.
</p>
<p>
FireLens plays a crucial role in log routing and management by providing a centralized way to collect and route logs from your applications. It helps you:
</p>
<ul>

<li>Collect logs: FireLens collects logs from your applications running on ECS and Fargate.

<li>Process logs: FireLens can process logs using built-in filters and transformations.

<li>Route logs: FireLens routes logs to various destinations, such as OpenObserve, CloudWatch Logs, Splunk, or ELK.
</li>
</ul>
<p>
In summary, FireLens is a powerful tool for AWS log routing and management.
</p>
<p>
AWS FireLens provides an easy way to send ECS container logs to OpenObserve. 
</p>
<p>
<a href="https://openobserve.ai/contactus">Book a Free Demo with OpenObserve</a>
</p>
<h2>Benefits and Capabilities of FireLens</h2>

<p>

![Benefits and Capabilities of FireLens](/img/resources/firelens-image2.png "Benefits and Capabilities of FireLens")

</p>
<p>
Here are the benefits and capabilities of FireLens.
</p>
<h3>Simplified Interface</h3>

<p>
FireLens provides a simplified interface for log filtering, metadata addition, and routing, making it easy to manage and process logs.
</p>
<h3>Direct Streaming</h3>

<p>
FireLens allows for direct logs streaming to destinations like OpenObserve, Amazon CloudWatch, Amazon Elasticsearch Service, S3, and Kinesis Data Streams, ensuring efficient and reliable log management.
</p>
<h3>Flexibility</h3>

<p>
FireLens offers flexibility through ECS task definition parameters, allowing users to configure destinations and routing rules according to their specific needs.
</p>
<h3>Partnership Integrations</h3>

<p>
FireLens integrates with various partners to provide enhanced log management solutions, including AWS services like CloudWatch and Elasticsearch, as well as third-party tools like OpenObserve, Splunk and ELK.
</p>
<h2>FireLens Architecture </h2>

<p>
The FireLens architecture consists of the following components:
</p>
<ul>

<li>FireLens Agent: This is the core component that runs on the host where the logs are generated. It captures the logs and sends them to the FireLens configuration.
</li>
</ul>
<ul>

<li>FireLens Configuration: This is the configuration file that defines how the logs should be processed and forwarded. It includes settings for log processing, filtering, and forwarding.
</li>
</ul>
<ul>

<li>FireLens Processor: This component processes the logs according to the configuration. It can perform tasks such as log filtering, parsing, and transformation.
</li>
</ul>
<ul>

<li>FireLens Forwarder: This component forwards the processed logs to the specified destination, such as OpenObserve, Amazon S3, Amazon Elasticsearch, or Amazon CloudWatch Logs.
</li>
</ul>
<h2>Utilizing FireLens in Amazon ECS</h2>

<p>
The following points help you utilize Firelens in Amazon ECS.
</p>
<ul>

<li>Use with AWS Services or APN Destination: FireLens can be used with AWS services for enhanced log storage and analytics. It can also be used with APN (Amazon Partner Network) destinations for more advanced analytics and integration.
</li>
</ul>
<ul>

<li>Name Log Container and Start Order Dependency: This ensures that the log container is started before the application container, allowing for proper log capture and forwarding.
</li>
</ul>
<ul>

<li>IAM Roles and Permissions: This includes setting up roles for the FireLens agent and configuring permissions for access to the desired AWS services.
</li>
</ul>
<ul>

<li>Centralized Logging Solutions for Containers: FireLens can be used with OpenObserve, a popular open-source logging agent, to provide centralized logging solutions for containers, including Windows-based containers. This allows for efficient log collection, processing, and forwarding from containers to various destinations.
</li>
</ul>
<p>
AWS fireLens provides an easy way to send ECS container logs to OpenObserve. 
</p>
<p>
<a href="https://openobserve.ai/contactus">Book a Free Demo with OpenObserve</a>
</p>
<h2>Security and Networking Considerations</h2>

<p>

![Security and Networking Considerations](/img/resources/firelens-image3.png "Security and Networking Considerations")

</p>
<p>
Here are some key security and networking considerations for AWS FireLens:
</p>
<p>
Security Considerations
</p>
<ul>

<li><strong>Restricting Inbound Traffic</strong>: It is essential to restrict inbound traffic to FireLens on port 24224 to prevent unauthorized access. This can be achieved by configuring security groups to allow only necessary traffic to reach FireLens.

<li><strong>Security Group Configurations</strong>: The security group configurations for different ECS network modes are crucial for ensuring secure operations. For example, in the awsvpc mode, you need to configure the security group to allow traffic from the VPC to reach FireLens. In the bridge mode, you need to configure the security group to allow traffic from the bridge to reach FireLens.

<li><strong>Dependency Conditions in Task Definitions</strong>: Dependency conditions in task definitions can be used to ensure secure operations. For example, you can specify that a task should only start if a specific condition is met, such as the availability of a specific resource or the completion of a specific task.
</li>
</ul>
<p>
Networking Considerations
</p>
<ul>

<li><strong>Network Isolation</strong>: Ensure that FireLens is deployed in a network-isolated environment to prevent unauthorized access.

<li><strong>Network Segmentation</strong>: Use network segmentation to isolate FireLens from other components of your application and prevent unauthorized access.

<li><strong>Network Monitoring</strong>: Monitor network traffic to detect and respond to potential security threats.
</li>
</ul>
<h2>Configuring FireLens for Advanced Use Cases</h2>

<p>
Configuration Options 
</p>
<p>
FireLensConfiguration
</p>
<ul>

<li>Type: FireLensConfiguration (required)

<li>LogConfiguration:

<li>LogGroup (required): The name of the log group where logs will be sent.

<li>LogStream (optional): The name of the log stream where logs will be sent.

<li>Format (optional): The format of the logs. Supported formats include JSON, JSON Lines, and Text.
</li>
</ul>
<ul>

<li>CloudWatchLogs

<li>Enabled (optional): Whether CloudWatch logs are enabled. Default is true.
</li>
</ul>
<ul>

<li>CloudWatchMetrics

<li>Enabled (optional): Whether CloudWatch metrics are enabled. Default is true.

<li>Region (optional): The AWS region where logs will be sent. Default is the region of the task.
</li>
</ul>
<h3>Example Configurations for Routing Logs </h3>

<pre class="prettyprint">yaml
task_definition:
  container_definitions:
    - name: my-container
      image: my-image
      firelens_configuration:
        type: FireLensConfiguration
        options:
          log_configuration:
            log_group: my-log-group
            log_stream: my-log-stream
            format: JSON
          cloud_watch_logs:
            enabled: true
          cloud_watch_metrics:
            enabled: true
          region: us-west-2
          region: eu-west-1</pre>

<h2>Monitor ECS Logs with Integration Platforms</h2>

<p>
To monitor ECS logs with integration platforms, you can use AWS FireLens with platforms like OpenObserve. Here are the key steps:
</p>
<h3>Configure AWS FireLens</h3>

<ul>

<li>Set the awsfirelens log driver in your ECS task definition to use FireLens for log forwarding.

<li>Configure the logConfiguration in the task definition to send logs to Amazon CloudWatch.
</li>
</ul>
<h3>Forward logs to external platforms</h3>

<ul>

<li>Use a Lambda function to collect logs from CloudWatch and forward them to the desired monitoring platform, such as OpenObserve.

<li>The Lambda function acts as a bridge to send logs from CloudWatch to the external platform of your choice.
</li>
</ul>
<h3>Automate log routing</h3>

<ul>

<li>Configure the ECS task definition to use the awsfirelens log driver.

<li>Set the logConfiguration to send logs to CloudWatch.

<li>The Lambda function automatically collects logs from CloudWatch and forwards them to the external monitoring platform, providing an automated log routing solution.
</li>
</ul>
<p>
Watch this Video on Youtube: <a href="https://www.youtube.com/watch?v=LwM_oETkLAc">Monitor Performance of Amazon ECS Applications</a>
</p>
<p>
<a href="https://openobserve.ai/docs/howto/ingest_ecs_logs_using_firelens/">OpenObserve: Ingest logs from Amazon ECS using AWS Firelens</a>
</p>
<p>

![Ingest logs from Amazon ECS using AWS Firelens](/img/resources/firelens-image4.png "Ingest logs from Amazon ECS using AWS Firelens")

</p>
<p>
Image Credit: <a href="https://openobserve.ai/docs/howto/ingest_ecs_logs_using_firelens/">Open Observe</a>
</p>
<h2>Getting Started with FireLens</h2>

<p>
To get started with FireLens, the key steps are:
</p>
<ol>

<li>Identify the log locations for your container by updating the logLocations array in your analysis.json file and enabling dynamic logging.

<li>Configure the log deployment parameters in your deployment.json file, including setting enableFirelensLogging to true and specifying the desired log destinations (e.g. CloudWatch, Firehose, Kinesis) with the appropriate regex filters and stream names.
</li>
</ol>
<p>
Are you a Developer?
</p>
<p>
<a href="https://github.com/openobserve/openobserve">Join OpenObserve on Github</a>
</p>
<h3>Best Practices</h3>

<ul>

<li>Use custom log parsers with FireLens to structure your logs and enable more efficient querying at the destination.

<li>Leverage FireLens integrations with observability platforms like OpenObserve, Splunk and SignalFx to gain real-time visibility and alerting from your container logs.
</li>
</ul>
<p>
Examples for deploying FireLens
</p>
<p>
Here are some examples for deploying FireLens:
</p>
<h3>Routing Logs to Amazon Kinesis Data Firehose</h3>

<pre class="prettyprint">json
{
  "family": "firelens-example-firehose",
  "taskRoleArn": "arn:aws:iam::123456789012:role/ecs_task_iam_role",
  "containerDefinitions": [
    {
      "essential": true,
      "image": "906394416424.dkr.ecr.us-west-2.amazonaws.com/aws-for-fluent-bit:stable",
      "name": "log_router",
      "firelensConfiguration": {
        "type": "fluentbit",
        "options": {
          "enable-ecs-log-metadata": "true"
        }
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "firelens-container",
          "awslogs-region": "us-west-2",
          "awslogs-create-group": "true",
          "awslogs-stream-prefix": "firelens"
        }
      },
      "memoryReservation": 50
    },
    {
      "essential": true,
      "image": "httpd",
      "name": "app",
      "logConfiguration": {
        "logDriver": "awsfirelens",
        "options": {
          "Name": "firehose",
          "region": "us-west-2",
          "delivery_stream": "my-stream",
          "log-driver-buffer-limit": "2097152"
        }
      },
      "memoryReservation": 100
    }
  ]
}</pre>

<p>
This example defines a log router container using Fluent Bit to send logs to Amazon Kinesis Data Firehose. The application container uses the awsfirelens log driver to route its logs to Firehose. 
</p>
<p>
Are you a Developer?
</p>
<p>
<a href="https://github.com/openobserve/openobserve">Join OpenObserve on Github</a>
</p>
<h3>Routing Logs to Amazon CloudWatch Logs</h3>

<pre class="prettyprint">json
{
  "family": "firelens-example-cloudwatch",
  "taskRoleArn": "arn:aws:iam::123456789012:role/ecs_task_iam_role",
  "containerDefinitions": [
    {
      "essential": true,
      "image": "906394416424.dkr.ecr.us-west-2.amazonaws.com/aws-for-fluent-bit:stable",
      "name": "log_router",
      "firelensConfiguration": {
        "type": "fluentbit",
        "options": {
          "enable-ecs-log-metadata": "true"
        }
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "firelens-container",
          "awslogs-region": "us-west-2",
          "awslogs-create-group": "true",
          "awslogs-stream-prefix": "firelens"
        }
      },
      "memoryReservation": 50
    },
    {
      "essential": true,
      "image": "httpd",
      "name": "app",
      "logConfiguration": {
        "logDriver": "awsfirelens",
        "options": {
          "Name": "cloudwatch",
          "region": "us-west-2",
          "log_group_name": "firelens-cloudwatch",
          "log_stream_prefix": "firelens-"
        }
      },
      "memoryReservation": 100
    }
  ]
}</pre>

<p>
This example is similar to the previous one, but it routes logs from the application container to Amazon CloudWatch Logs instead of Firehose. 
</p>
<h3><a href="https://openobserve.ai/docs/howto/ingest_ecs_logs_using_firelens/#verify-result">Ingest logs from Amazon ECS using AWS firelens</a></h3>

<p>
To configure Firelens to send logs to OpenObserve, you need to modify your ECS task definition to add the fluentbit sidecar. Here is an example task definition:
</p>

<pre class="prettyprint">json
{
  "taskDefinition": {
    "family": "nginx_firelens_zo1",
    "taskRoleArn": null,
    "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
    "networkMode": "awsvpc",
    "containerDefinitions": [
      {
        "name": "nginx",
        "image": "nginx:latest",
        "essential": true,
        "firelensConfiguration": {
          "type": "fluentbit",
          "options": {
            "config-file-type": "file",
            "config-file-value": "/fluent-bit.conf",
            "enable-ecs-log-metadata": "false"
          }
        },
        "logConfiguration": {
          "logDriver": "awsfirelens",
          "options": {
            "Name": "http",
            "Match": "*",
            "Host": "openobserve.example.com",
            "Port": "8080",
            "URI": "/api/v1/logs",
            "Header": "X-Openobserve-Token:abc123"
          }
        }
      }
    ],
    "volumes": [],
    "placementConstraints": [],
    "requiresCompatibilities": [
      "FARGATE"
    ],
    "cpu": "256",
    "memory": "512"
  }
}</pre>

<p>
This configures the Firelens log driver and specifies the HTTP output plugin configuration for fluentbit to send logs to OpenObserve.
</p>
<p>
OpenObserve makes it easy to ingest logs from Amazon ECS containers using AWS Firelens. By modifying the ECS task definition to add a fluentbit sidecar and configure it to send logs to OpenObserve, you can easily view and analyze your container logs in OpenObserve.
</p>
<p>
Are you a Developer?
</p>
<p>
<a href="https://github.com/openobserve/openobserve">Join OpenObserve on Github</a>
</p>
<h2>Conclusion</h2>

<p>
The ever-growing volume of logs from your Amazon ECS containers can quickly become overwhelming. AWS FireLens and integration platforms like OpenObserve unlocks a world of streamlined log management, empowering you to gain valuable insights into your containerized applications.
</p>
<p>
Now, you are equipped with the basics of using AWS FireLens to Monitor Amazon ECS and integration platforms, transforming your ECS log management from a chaotic storm to a well-oiled machine, providing clear visibility into your containerized applications.
</p>
<p>
For more details: <a href="https://openobserve.ai/contactus">Contact Team OpenObserve</a>
</p>
<h3>Where OpenObserve Shines</h3>

<p>
OpenObserve steps in as a powerful backend solution, seamlessly integrating with FireLens to empower you with advanced log management capabilities:
</p>
<ul>

<li>Storage and Scalability: OpenObserve boasts a highly scalable architecture, efficiently storing and managing your container logs regardless of their volume.

<li>Advanced Analytics: OpenObserve goes beyond simple log storage. Leverage its powerful analytics tools to unearth patterns, identify trends, and diagnose issues within your containerized applications.

<li>Real-time Visibility: Gain instant insights into your container health with OpenObserve's real-time log visualization. Quickly pinpoint anomalies and identify potential problems before they escalate.

<li>Cost-Effectiveness: OpenObserve offers a cost-effective solution compared to traditional log management options, keeping your monitoring expenses under control.

<li>Incorporating OpenObserve with FireLens unlocks a comprehensive log management experience, providing a centralized platform for collecting, analyzing, and visualizing your ECS container logs. 
</li>
</ul>
<p>
This empowers you to make data-driven decisions, optimize your container performance, and ensure the smooth operation of your applications.
</p>
<p>
AWS Firelens provides an easy way to send ECS container logs to OpenObserve. We configured AWS firelens in a few steps to send logs to OpenObserve / OpenObserve Cloud. to easily view and analyze logs.
</p>
<p>
<a href="https://openobserve.ai/contactus">Book a Free Demo with OpenObserve</a>
</p>
<p>
<a href="https://openobserve.ai/about/">About Us | Open Source Observability Platform </a>
</p>
<p>
Are you a Developer?
</p>
<p>
<a href="https://github.com/openobserve/openobserve">Join OpenObserve on Github</a>
</p>
<p>
Additional Resources 
</p>
<p>
<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/deploy-container-insights-ECS-logs.html#:~:text=FireLens%20for%20Amazon%20ECS%20enables,Fluent%20Bit%20or%20Fluentd%20image.">Set up FireLens to send logs to CloudWatch Logs</a>
</p>
<p>
<a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html">Send Amazon ECS logs to an AWS service or AWS Partner</a>
</p>
<p>
<a href="https://openobserve.ai/docs/howto/ingest_ecs_logs_using_firelens/">Ingest logs from Amazon ECS using AWS firelens</a>
</p>
