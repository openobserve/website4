---
title: "AWS ALB Logs Monitoring: Complete Setup and Real-Time Insights"
seoTitle: "How to Monitor AWS ALB Logs: Setup, Ingestion, and Insights"
description: Learn how to monitor AWS ALB logs efficiently with OpenObserve. Step-by-step guide on setup, ingestion, parsing, and visualization for better security, performance, and compliance.
img: /img/blog/aws-alb/aws_elb_flow.gif
alt: how-to-monitor-aws-alb-logs
slug: how-to-monitor-aws-alb-logs
authors: 
  - chaitanya
publishDate: 2025-01-24
tags:
  - aws
  - alb
  - monitoring
  - openobserve
  - logs
  - dashboards
  - pipelines
  - lambda
  - s3
  - cloudformation
---

## What is AWS ALB?

AWS Application Load Balancer (ALB) is a fully managed service provided by Amazon Web Services (AWS) that automatically distributes incoming application traffic across multiple targets, such as EC2 instances, containers, and IP addresses. It operates at the application layer (Layer 7 of the OSI model) and provides advanced request routing capabilities based on HTTP/HTTPS headers, paths, and hostnames. ALB also supports WebSockets, gRPC, and enhanced security features, making it a preferred choice for modern applications.

Key features of AWS ALB:
- **Intelligent Traffic Routing**: Routes requests based on URL paths, headers, and cookies.
- **High Availability & Scalability**: Automatically scales based on incoming traffic.
- **Integrated Security Features**: Works with AWS WAF and supports TLS termination.
- **Access Logging & Monitoring**: Provides detailed access logs stored in S3 for auditing and analysis.
- **Support for Microservices & Containers**: Easily integrates with ECS, EKS, and Fargate for containerized applications.

## Why Monitor AWS ALB?

Monitoring AWS ALB logs is critical for several reasons:

1. **Traffic Analysis**
   - Gain insights into request patterns, sources, and geographic distribution.
   - Identify high-traffic endpoints and optimize performance accordingly.

2. **Security & Compliance**
   - Detect and prevent malicious activities, such as DDoS attacks and unauthorized access.
   - Meet compliance requirements by storing detailed logs for audits.

3. **Performance Optimization**
   - Identify latency and response time issues affecting end-user experience.
   - Detect and troubleshoot backend service failures.

4. **Cost Management**
   - Analyze request patterns to optimize ALB scaling and reduce unnecessary costs.
   - Identify inefficient load balancing that may lead to excessive AWS expenses.

## Prerequisites
Before you begin setting up AWS ALB log monitoring, ensure you have the following:

- Running AWS ALB: You must have an Application Load Balancer (ALB) already set up in your AWS environment.
- OpenObserve (Self-Hosted or Cloud): OpenObserve should be available for log ingestion, either as a self-hosted instance or via the [OpenObserve Cloud](https://cloud.openobserve.ai/).
- Required Access in AWS: Ensure you have the necessary AWS permissions, including:
  - Permissions to create and manage S3 buckets for log storage.
  - CloudFormation access to deploy the automation template.
  - IAM Role Management to assign permissions for log forwarding.
  - Access to AWS ALB Console to enable access logging.

## Steps to Configure AWS ALB to Ingest Logs to HTTP Endpoint in Under 5 Minutes

### 1. Downloading the CloudFormation Template
AWS provides an automated way to configure ALB log ingestion using a CloudFormation template. Download the pre-built template from:
[https://github.com/openobserve/cloudformation-templates/blob/main/aws_alb/alb.yaml](https://github.com/openobserve/cloudformation-templates/blob/main/aws_alb/alb.yaml)

### 2. Configuring CloudFormation with Parameters
1. Navigate to **AWS CloudFormation** in the AWS Management Console.
2. Click **Create Stack** → **With new resources (standard)**.

![aws alb](/img/blog/aws-alb/create_stack.png)

3. Upload the downloaded `alb.yaml` template.
4. Provide required parameters such as:
   - ALB name
   - Target bucket for storing logs
   - IAM role for S3 access
   - OpenObserve auth credentials
   - For **ELBAccountId**, you need to follow https://docs.aws.amazon.com/elasticloadbalancing/latest/application/enable-access-logging.html

![aws alb](/img/blog/aws-alb/stack_details.png)

5. Click **Next** and proceed with default settings unless customization is needed.
6. Click **Create Stack**.

### 3. Validating CloudFormation Deployment
- Once deployed, go to **CloudFormation Stacks** and ensure the status is `CREATE_COMPLETE`.

![aws alb](/img/blog/aws-alb/stack_created.png)

- Navigate to **S3** and verify that the created bucket exists.
- Check **Lambda function**.

### 4. Enabling Monitoring in AWS ALB
Once the S3 bucket is created via CloudFormation:
1. Go to **AWS ALB Console**.
2. Select the **Application Load Balancer**.
3. Click on **Edit load balancer attributes**.

![aws alb](/img/blog/aws-alb/edit_elb.png)

4. Under **Access Logs** and **Connection Logs**, enable logging and select the S3 bucket created and add the prefix that you provided during the CloudFormation steps.

![aws alb](/img/blog/aws-alb/enable_access_logs.png)

5. Save the configuration.

### 5. Verifying Logs in OpenObserve
Once logs are flowing to the S3 bucket, the lambda function will be invoked and start ingesting the logs to OpenObserve endpoint.

![aws alb](/img/blog/aws-alb/alb_logs.png)

### 6. Adding VRL Functions in OpenObserve to Parse Logs
By default ALB logs are unstructured and are ingested as below.

```
"http 2018-11-30T22:23:00.186641Z app/my-loadbalancer/50dc6c495c0c9188 192.168.131.39:2817 - 0.000 0.001 0.000 200 200 34 366 \"GET http://www.example.com:80/ HTTP/1.1\" \"curl/7.46.0\" - - arn:aws:elasticloadbalancing:us-east-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067 \"Root=1-58337364-23a8c76965a2ef7629b185e3\" \"-\" \"-\" 0 2018-11-30T22:22:48.364000Z \"forward\" \"-\" \"-\" \"-\" \"-\" \"-\" \"-\""
```

To enhance log analysis, add three VRL (Vector Remap Language) functions in OpenObserve for parsing:
1. **Parse logs using parse_aws_alb_log**

VRL supports [parse_aws_alb_log](https://vector.dev/docs/reference/vrl/functions/#parse_aws_alb_log) that helps transform the logs.
```
. = parse_aws_alb_log!(.log) 
 .
 ```
2. **Remove ports associated with IPs**
```
.client_host = split!(.client_host, ":")[0] 
 .
```
3. **Fetch Geo-location from IPs**
```
if exists(.client_host) && (is_ipv4(string!(.client_host)) || is_ipv6(string!(.client_host))) {
    .geo_city_data = get_enrichment_table_record!("maxmind_city", {"ip": string!(.client_host)})
    if exists(.geo_city_data) {
        .geo_city = .geo_city_data.city
        .geo_country = .geo_city_data.country
        .geo_latitude = .geo_city_data.latitude
        .geo_longitude = .geo_city_data.longitude
    }
    .geo_asn_data = get_enrichment_table_record!("maxmind_asn", {"ip": string!(.client_host)})

    if exists(.geo_asn_data) {
        .geo_asn = .geo_asn_data.asn
        .geo_org = .geo_asn_data.organization
    }
} 
 .
```

Finally create a pipeline that can transform your logs in real-time.

![aws alb](/img/blog/aws-alb/pipeline.gif)

### 7. Uploading Pre-Built Dashboard
To visualize ALB logs effectively:
- Download the pre-built ALB dashboard from:
  [https://github.com/openobserve/dashboards/tree/main/AWS_ALB](https://github.com/openobserve/dashboards/tree/main/AWS_ALB)
- Import it into OpenObserve’s **Dashboard** section.
- You must replace **alb_demo** inside the json file with the stream name that you have provided while configuring the HTTP endpoint in cloudformation deployment. 

![aws alb](/img/blog/aws-alb/alb_dashboard.gif)

## OpenObserve vs. Traditional ALB Log Monitoring
To understand the benefits of using OpenObserve for ALB log monitoring, let’s compare it with traditional methods:

| Feature | Without OpenObserve | With OpenObserve |
|---------|--------------------|-----------------|
| Log Storage | Logs stored in S3, requiring additional processing | Real-time log ingestion with query capabilities |
| Data Parsing | Requires custom scripts to parse logs | Prebuilt VRL functions simplify parsing |
| Visualization | Needs third-party tools (e.g., Kibana, Grafana) | Built-in dashboards for instant insights |
| Alerting | No built-in alerting; needs external setup | Real-time alerts on anomalies |

## Conclusion

Monitoring AWS ALB logs is crucial for security, performance optimization, and compliance. Traditional log monitoring methods often involve complex setups and additional tools for parsing and visualization. However, with OpenObserve, organizations can streamline log ingestion, parsing, and visualization in real time, reducing complexity and improving insights.

By leveraging CloudFormation templates, VRL functions, and pre-built dashboards, teams can efficiently monitor AWS ALB logs, ensuring high availability and proactive issue detection. Setting up AWS ALB log monitoring with OpenObserve takes just minutes but provides long-term benefits in operational efficiency, security, and cost optimization.

> #### Get Started with OpenObserve Today!
> Sign up for a free trial of OpenObserve on our [website](https://openobserve.ai/).
>Check out our [GitHub repository](https://github.com/openobserve) for self-hosting and contribution opportunities.