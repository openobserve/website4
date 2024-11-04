---
title: "How to Generate and Ingest Terraform Logs for Observability and Analysis"
seoTitle: "How to Generate and Ingest Terraform Logs for Observability and Analysis"
description: Learn how to generate, configure, and ingest Terraform logs with Fluent Bit to OpenObserve. This step-by-step guide covers essential logging for auditing, troubleshooting, and optimizing your infrastructure, ensuring comprehensive visibility and compliance in your infrastructure-as-code deployments.
img: /img/blog/how-to-generate-terraform-logs/tf-o2.gif
alt: terraform-logs-management
slug: how-to-generate-and-ingest-terraform-logs
authors: 
  - chaitanya
publishDate: 2024-11-04
tags:
  - Terraform
  - Logging
  - FluentBit
  - Monitoring
  - Infrastructure
  - Observability
  - Troubleshooting
  - Auditing
  - Compliance
  - Infrastructure as code
---

IaC monitoring and observability play critical roles in managing and troubleshooting complex deployments. When using infrastructure-as-code tools like Terraform, maintaining visibility into deployment logs is essential for pinpointing issues quickly. This blog provides a step-by-step guide to configuring Terraform to generate logs, setting up Fluent Bit to ingest these logs, and then sending them to your preferred observability platform.

### Why Terraform Logs are Essential

Capturing Terraform logs is crucial for various operational and compliance needs, including:

* **Audits**: Maintain a clear record of all infrastructure changes for compliance and regulatory audits.  
* **Troubleshooting**: Quickly identify and resolve issues by tracing the detailed steps of each deployment.  
* **Monitoring**: Gain insights into the health and efficiency of infrastructure provisioning, helping detect issues early.  
* **Optimization**: Analyze log patterns to identify bottlenecks or inefficiencies in deployment processes.  
* **Security Compliance**: Ensure only authorized changes are made by tracking every action within your Terraform configuration.

### Prerequisites

* **Terraform**: Installed on your MacBook with working modules.  
* **OpenObserve**: Set up and accessible (assumed at `http://localhost:5080`).  
* **Fluent Bit**: Installed on your MacBook via Homebrew.  
* **Permissions**: Necessary access to modify and read Terraform log files.

### Step 1: Enabling Logging in Terraform

Terraform doesn’t create log files by default, so let’s start by configuring it to log information during executions.

**Set the Environment Variable for Logging**: To enable logging, add the following environment variable to your shell profile (e.g., `.bashrc`, `.zshrc`):

```
export TF_LOG=DEBUG
export TF_LOG_PATH="./tf.log"
```

Adjust the log path as needed. Setting `TF_LOG=DEBUG` captures detailed information, making it easier to troubleshoot issues.

**Test Log Generation**: Run a Terraform command to verify logs are generated in the specified file path:

```
terraform apply
```

Confirm that `tf.log` captures all activity. This log will be read by Fluent Bit for ingestion.

### Step 2: Configuring Fluent Bit for Log Ingestion

Fluent Bit is a lightweight log processor and forwarder, making it ideal for ingesting Terraform logs into an observability platform. Below is a Fluent Bit configuration tailored to Terraform logs.

**Install Fluent Bit**: If you haven’t installed Fluent Bit yet, you can do so with:

```
brew install fluent-bit
```

**Create the Fluent Bit Configuration File**: Save the following configuration in a file (e.g., `fluent-bit.conf`):

```
[INPUT]
    Name            tail
    Path           ./tf.log
    Tag             terraform
    Mem_Buf_Limit   5MB
    Skip_Long_Lines On
    Read_from_Head  On

[FILTER]
    Name            record_modifier
    Match           terraform
    Record          level DEBUG

[FILTER]
    Name            record_modifier
    Match           terraform
    Record          log_source terraform

[OUTPUT]
    Name            http
    Match           *
    URI             /api/default/terraform/_json
    Host            localhost
    Port            5080
    tls             Off
    Format          json
    Json_date_key   _timestamp
    Json_date_format iso8601
    HTTP_User       <openobserve_user>
    HTTP_Passwd     <openobserve_basic_password>
    compress        gzip
```

**Configuration Explanation**:

1. **\[INPUT\]** section:  
   * `Path` specifies the location of `tf.log`.  
   * `Tag` identifies log entries related to Terraform.  
   * `Read_from_Head` ensures Fluent Bit starts reading from the beginning of the file.  
2. **\[FILTER\]** sections:  
   * `record_modifier` adds fields, such as `level` and `log_source`, which help to categorize the log data.  
3. **\[OUTPUT\]** section:  
   * `URI` is the destination path on the observability platform.  
   * `HTTP_User` and `HTTP_Passwd` handle authentication.  
   * `Format` ensures the logs are structured in JSON.

### Step 3: Running Fluent Bit with the Configuration

Run Fluent Bit using the configuration file you just created to start forwarding Terraform logs to your observability platform.

```
fluent-bit -c /path/to/fluent-bit.conf
```

This command starts Fluent Bit with the specified configuration. You should see Terraform logs from `tf.log` being ingested in real-time. Logs are now forwarded, allowing you to analyze and search through them easily.

### Step 4: Validating the Log Ingestion in OpenObserve

![terraform logs](/img/blog/how-to-generate-terraform-logs/tf-sc.gif)

After setting up Fluent Bit to forward Terraform logs, you can validate the ingestion within OpenObserve to ensure the logs are being received and processed correctly.

1. **Access OpenObserve Dashboard**: Open OpenObserve in your browser by navigating to `http://localhost:5080` or the domain/IP address where OpenObserve is hosted.  
2. **Navigate to the Terraform Log Stream**:  
   * Click on “Logs” section.  
   * Select the stream you configured for Terraform logs, we named it as `terraform`.  
   * On the top right, click on `Run Query`.  
3. **Search for Recent Logs**:  
   * Set the time range to the past few minutes to ensure you're seeing recent logs.    
   * Use fields like `_timestamp`, `log_source`, and `level` to organize and verify the ingested data.  
4. **Verify Log Fields and Metadata**: Check if each log entry includes fields like `log_source: terraform` and `level: DEBUG` as set by the `record_modifier` filter in the Fluent Bit configuration. These fields help identify the source and type of logs in OpenObserve.  
5. **Inspect Sample Log Entries**: Open a few sample log entries to confirm that the data appears as expected. Each entry should contain relevant Terraform logs, timestamps, and any other contextual information from your log file.  
6. **Run Basic Queries**: Try running a query that filters based on common Terraform keywords (e.g., "apply," "plan," or "error") to check if the logs are being parsed accurately.  

### Step 5: Leveraging Terraform Logs for Insights

Now that Terraform logs are ingested, here are some ways to gain insights:

![terraform logs](/img/blog/how-to-generate-terraform-logs/runs.gif)

1. **Analyze Deployment Times**: By tracking timestamps, you can identify slow-running stages.  
2. **Detect Configuration Errors**: The `DEBUG` level logs will capture Terraform warnings and errors, making it easier to troubleshoot.  
3. **Monitor Infrastructure Drift**: With Terraform logs, you can analyze patterns that might indicate configuration drift in your infrastructure.

## Best Practices for Managing Terraform Logs

1. **Log Rotation**: Since Terraform logs can grow quickly, implement a log rotation strategy. This can prevent `tf.log` from becoming unmanageable.  
2. **Use Log Levels Strategically**: While `DEBUG` is useful for detailed insights, it can generate large volumes of logs. Set log levels to `INFO` or `ERROR` in production to reduce noise.  
3. **Automate the Ingestion**: Consider setting up Fluent Bit as a service to automatically start on system reboot, ensuring Terraform logs are always forwarded.

## Integrating CI/CD Pipelines to Route IaC Logs to OpenObserve

This setup can also be extended to your CI/CD pipelines, allowing Terraform logs generated during automated deployments to be routed directly to OpenObserve. By adding Fluent Bit to your CI/CD pipeline configuration, you can capture Infrastructure-as-Code (IaC) logs during each deployment run. This provides centralized, real-time visibility into every change and deployment action, making it easier to monitor, troubleshoot, and maintain your infrastructure, all within OpenObserve.

## Track and Troubleshoot Your Terraform Deployments

By integrating Terraform logs into an observability platform with Fluent Bit, you can streamline troubleshooting and enhance your monitoring capabilities. This setup provides continuous insight into your infrastructure provisioning, allowing you to identify issues, optimize deployments, and maintain reliable cloud environments. [Start today, and transform your approach to infrastructure monitoring](https://openobserve.ai/docs/quickstart/)\!