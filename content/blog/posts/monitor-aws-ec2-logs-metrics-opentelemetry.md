---
title: 'Monitor AWS EC2 Logs and Metrics with OpenTelemetry'
seoTitle: 'Monitor AWS EC2 Logs and Metrics with OpenTelemetry | OpenObserve'
description: Learn how to monitor AWS EC2 logs and metrics using OpenTelemetry. Set up real-time and continuous monitoring for performance, security, and compliance.
img: /img/blog/ec2-logs-metrics/0-aws-ec2-blog-banner.png
alt: Banner illustrating AWS EC2 monitoring of Logs and Metrics with OpenTelemetry
slug: monitor-aws-ec2-logs-metrics-opentelemetry
authors: 
  - nitya
publishDate: 2024-11-16
tags:
  - AWS EC2 Logs
  - AWS EC2 Metrics
  - AWS EC2 Monitoring
  - OpenTelemetry
  - Dashboards
  - OpenObserve Collector
---

Let's face it: managing logs across [AWS EC2](https://aws.amazon.com/ec2/) instances can feel like trying to drink from a firehose. Traditional monitoring tools like [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/) are expensive, complex, and often leave you drowning in data. What if there was a straightforward and sustainable alternative to collect, analyze, and derive insights from your logs and metrics?

Enter [OpenTelemetry](https://opentelemetry.io/)—a powerful solution that will help you transform log and metrics monitoring from a headache to a superpower. OpenTelemetry isn't just another monitoring tool—it's an open-source observability framework that speaks the language of modern, cloud-native infrastructure. It allows you to monitor logs, metrics, and traces without worrying about vendor lock-in.

## Why EC2 Log and Metrics Monitoring Matters

Your EC2 instances are the heartbeat of your infrastructure. They run critical applications, serve customers, and generate mountains of data. But without proper monitoring, you're essentially driving blindfolded.

Effective log and metrics monitoring helps you:

* **Troubleshoot Like a Pro:** Quickly pinpoint application crashes or deployment issues.  
* **Optimize Performance:** Track resource usage and fine-tune configurations.  
* **Boost Security:** Detect suspicious activities before they become breaches.  
* **Stay Compliant:** Maintain rock-solid audit trails for regulatory requirements.

## Limitations of AWS CloudWatch

While AWS CloudWatch is the default monitoring solution for EC2 instances, it comes with limitations:

* **Limited Search Capabilities:** Searching through logs can be cumbersome and slow.  
* **No Built-in Memory Metrics:** By default, EC2 instances don’t report memory metrics because the [hypervisor](https://aws.amazon.com/what-is/hypervisor/#:~:text=A%20hypervisor%20is%20a%20software,individual%20virtual%20machines%20as%20required.) doesn’t have visibility into instance memory usage.  
* **Costly at Scale:** As your infrastructure grows, CloudWatch’s costs can increase significantly.

For these reasons, many developers and DevOps teams turn to more flexible solutions like OpenTelemetry.

## The OpenTelemetry Advantage

OpenTelemetry (OTel) is an open-source observability framework that allows you to collect logs, metrics, and traces without vendor lock-in. It provides:

* **Unified Monitoring:** Collect logs and metrics from various sources in one place.  
* **Granular Control:** Customize what data to collect and where to send it.  
* **Cloud Agnostic:** Works seamlessly across different cloud providers.

However, setting up OpenTelemetry from scratch can be complex. That’s where the OpenObserve Collector comes in.

## Why Use the OpenObserve Collector?

The OpenObserve Collector is a pre-configured version of the OpenTelemetry Collector optimized for capturing logs and metrics from your EC2 instances. It simplifies the setup process by providing:

* **Optimized Settings:** Pre-configured for quick data collection.  
* **Logs & Metrics Collection:** Captures both system logs and key metrics like CPU usage, memory utilization, disk I/O, and network traffic.  
* **Seamless Integration with OpenObserve:** Easily ingest data into OpenObserve for real-time analysis.

So, without further ado, we'll walk you through a hands-on demonstration of EC2 logs and metrics monitoring using Opentelemetry via the OpenObserve Collector. By the end of this article, you will know how to:

1. Install the OpenObserve Collector  
2. Configure an OpenTelemetry (OTel) Collector to capture system and application logs  
3. Seamlessly ingest logs and metrics from an AWS EC2 instance into OpenObserve  
4. Create powerful queries and dashboards for real-time infrastructure insights

Whether you're a DevOps engineer, system administrator, or developer looking to gain deeper visibility into your infrastructure, this guide will equip you with the practical skills to implement a modern, efficient monitoring solution. 

*Let’s get started!*

---

## Setting Up Your Log & Metrics Collection Pipeline

### **Step 1: Create an OpenObserve Account**

1. First, if you haven’t already, visit [OpenObserve](https://cloud.openobserve.ai/) and sign up for a free Cloud account.  
   * Alternatively, you can install a [self-hosted version](https://openobserve.ai/docs/quickstart/#self-hosted-installation) of OpenObserve.  
2. Log in to the Dashboard.

### **Step 2: Prepare Your AWS EC2 Instances**

1. Open your AWS EC2 Dashboard  
2. Click **Launch Instance**  
3. Add a tag like Key *"Name"* and Value *"O2LogMonitoringInstance"*
4. Select *Amazon Linux 2 AMI* 
5. Choose *t2.micro* (perfect for testing and allows you to leverage the [Free Tier](https://aws.amazon.com/free))  
6. Use default settings  
7. Save your key file (e.g., *o2otel.pem*) in a secure location  
8. Create a security group allowing SSH access (from anywhere, in this case)  
9. Click on **Launch Instance**

![Success page after launching an AWS EC2 instance ](/img/blog/ec2-logs-metrics/1-launch-instance.png) 

Now, you’re ready to connect to your EC2 instance:

10. After the instance has been launched, click on **Connect Instance** and select “SSH client” to retrieve instructions on how to connect to your instance from a terminal environment.   
11. Open an SSH Client, locate your private key file, and run the following commands:  
    

```
# Run command IF you want your key to not be publicly viewable
chmod 400 "o2otel.pem"

# Connect to your instance using its Public DNS
ssh -i /path/to/your-key.pem ec2-user@your-instance-public-dns
```

### **Step 3: Install & Configure OpenObserve Collector**

1. In the OpenObserve UI, navigate to **Data Sources** → **Linux** to grab your custom curl command to install OpenObserve Collector.   
     
   The authentication token included in the command contains your base64 encoded credentials, which is used to authenticate your collector with the OpenObserve API. This ensures that only authorized users can send data to your specific OpenObserve account.

![Retrieve curl command to load OpenObserve Collector](public/img/blog/ec2-logs-metrics/2-get-auth-token-linux.gif) 

Execute the command.

You should now be able to see log and metrics data in OpenObserve. We will simulate some data in the next section to add some stress to the system and see what happens\!

2. **(OPTIONAL)** The default configuration file (already taken care of by OpenObserve Collector) will suffice for this tutorial. However, if you want to customize it, you can easily do so by following the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/):

```
sudo nano /etc/otel-collector/config.yaml
```

The configuration file will look similar to this:

```
receivers:
  hostmetrics:
    collection_interval: 30s
    scrapers:
      cpu:
        metrics:
          system.cpu.time:
            enabled: true
      memory:
        metrics:
          system.memory.usage:
            enabled: true
          system.memory.utilization:
            enabled: true
      disk:
        metrics:
          system.disk.io:
            enabled: true
          system.disk.operations:
            enabled: true
      network:
        metrics:
          system.network.io:
            enabled: true
  
  filelog:
    include: ["/var/log/*.log"]
    start_at: beginning

processors:
  batch:
    timeout: 1s
    send_batch_size: 1024

exporters:
  otlphttp:
    endpoint: "https://cloud.openobserve.ai/api/default"
    headers:
      Authorization: "Basic <YOUR_AUTH_TOKEN>"
      stream-name: "default"

service:
  pipelines:
    metrics:
      receivers: [hostmetrics]
      processors: [batch]
      exporters: [otlphttp]
    logs:
      receivers: [filelog]
      processors: [batch]
      exporters: [otlphttp]
```

Some notes to keep in mind:

* **Authentication token:** Make sure *“\<YOUR\_AUTH\_TOKEN\>”* is replaced with your own authentication token from OpenObserve.   
* **Stream name:** You don’t need to include *“stream-name”* if you’re just using *"default"* – however, be sure to specify the *“stream-name”* if you’re using a specific stream.  
* **Filelog:** By default, the *filelog* receiver captures logs from */var/log/\*.log*. If you want to pull logs from additional locations (such as custom application logs), you can add another path by separating it with a comma:


```
filelog:
  include: ["/var/log/*.log", "/path/to/your/custom/app.log"]
```

3. **(OPTIONAL)** If you make any custom changes to the OTel Collector configuration file, you'll need to restart the OTel Collector for any changes to take effect:

```
sudo systemctl restart otel-collector
sudo systemctl enable otel-collector

# Verify status and check logs for any issues
sudo systemctl status otel-collector
sudo journalctl -u otel-collector -f
```

### **Step 4: Generate Test Data (Logs & Metrics)**

To ensure that all dashboard panels are populated with plenty of meaningful data, we will generate both logs and metrics using a single script.

1. Create a script that generates CPU load, memory pressure, disk I/O activity, network traffic, and logs:

First, create the script file:

```
nano generate_load.sh
```

Then, paste the following script into the file:

```
#!/bin/bash

echo "Starting comprehensive system load generation..."

# Install required tools if not already installed
sudo yum install -y stress-ng sysstat

# Function to generate system logs during load generation
generate_logs() {
    logger "System load test started"
    logger "CPU intensive operation running"
    logger "Memory allocation in progress"
    logger "Disk I/O operations started"
    logger "Network activity simulation running"
    logger -p user.warning "High CPU usage detected"
    logger -p user.error "Memory threshold exceeded"
}

# Generate CPU load (multiple cores)
stress-ng --cpu 2 --cpu-method all --timeout 60s &

# Generate memory load (256 MB)
stress-ng --vm 1 --vm-bytes 256M --timeout 60s &

# Generate disk I/O (write and read operations)
dd if=/dev/zero of=/tmp/testfile bs=1M count=1024 oflag=direct &
dd if=/tmp/testfile of=/dev/null bs=1M &

# Generate network I/O (simulate network traffic)
for i in {1..10}; do
    curl -s https://www.google.com > /dev/null &
    wget -q https://www.google.com -O /dev/null &
done

# Monitor system metrics during load generation (every 10 seconds)
echo "Monitoring system metrics for 60 seconds..."
for i in {1..6}; do
    echo "=== System stats at interval $i/6 ==="
    
    # CPU stats
    echo "CPU Usage:"
    top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1"%"}'
    
    # Memory stats
    echo "Memory Usage:"
    free -m
    
    # Disk stats
    echo "Disk Usage:"
    df -h
    
    # Generate logs at each interval to simulate activity in logs panel
    generate_logs
    
    sleep 10
done

# Cleanup temporary files created during disk I/O simulation
rm -f /tmp/testfile

echo "Load generation complete"
```

Finally, save and close the file.

2. Now, make the script executable and run it:

```
chmod +x generate_load.sh
./generate_load.sh
```

This script will generate enough activity to populate various dashboard panels in OpenObserve.

### **Step 5: Verify Data Collection in OpenObserve**

Navigate to the **Logs** section in OpenObserve to verify that log entries are being ingested correctly:

![Verification of log ingestion into OpenObserve ](/img/blog/ec2-logs-metrics/3-view-logs.gif) 

Now, navigate to **Streams,** where you can view **all** ingested data, including **Logs** and **Metrics** in this case:

![Verification of logs and metrics collection in Streams within OpenObserve](/img/blog/ec2-logs-metrics/4-see-metrics-o2.gif)

Now that you have some sample data to work with, let’s build dashboards to actually derive some insights from all this information.

### **Step 5: Import Pre-built Dashboards in OpenObserve**

Although you can create any number of customized dashboards and dashboard panels within OpenObserve, the *easiest* way to get started is to import pre-built dashboards from OpenObserve's repository:

1. Navigate to OpenObserve UI  
2. Go to **Dashboards** → **Import**  
3. Download or copy the [host metrics dashboard template](https://github.com/openobserve/dashboards/blob/main/hostmetrics/Host%20Metrics.dashboard.json) (JSON) from OpenObserve’s GitHub repository.  
4. Import the JSON file into OpenObserve:  
   
![Copy and paste JSON to import the pre-built dashboard to OpenObserve](/img/blog/ec2-logs-metrics/5-import-dashboard.gif) 

This will create a comprehensive dashboard with panels for CPU usage, memory usage, disk I/O, network traffic, and more:

![Comprehensive EC2 monitoring dashboard with multiple panels in OpenObserve](/img/blog/ec2-logs-metrics/6-see-dashboard-visuals.gif)

## Troubleshooting Common Issues

If you're not seeing logs or metrics in OpenObserve, or if you're encountering errors, here are some practical steps to help you resolve the issues.

### **1. Check Collector Logs for Errors**

The first step is to check the OpenTelemetry Collector logs for any errors that may have occurred during startup or operation:

```
sudo journalctl -u otel-collector -f | grep Error
```

This command will display any errors related to the collector. Look for issues such as misconfigurations, permission problems, or connectivity errors.

### **2. Verify Permissions on Log Files**

Ensure the OpenTelemetry Collector has sufficient permissions to read the necessary log files. The collector may encounter "permission denied" errors when trying to access specific system logs.

Check the permissions of the log files:

```
sudo ls -l /var/log/
```

If you see permission issues (e.g., *permission denied*), update the permissions of the specific log files:

```
# Adjust permissions for specific log files
sudo chmod 644 /var/log/cloud-init.log /var/log/cloud-init-output.log /var/log/tallylog
```

This will allow the collector to read these files and forward their contents to OpenObserve.

### **3. Restart the Collector After Changes**

Whenever you make changes to the configuration file or adjust file permissions, it's essential to restart the OpenTelemetry Collector to apply those changes:

```
sudo systemctl restart otel-collector
```

After restarting, verify that the collector is running without issues:

```
sudo systemctl status otel-collector
```

If everything looks good, check if data is flowing into OpenObserve by reviewing both logs and metrics in the UI, as shown above.

⚠️ *Be sure to shut down any EC2 instances you aren’t using (like the one we created in this example!) to avoid unnecessary charges.*

## Stay Ahead of AWS EC2 Monitoring

Congratulations! You have successfully set up a comprehensive monitoring solution for your AWS EC2 instance using OpenObserve. With real-time log ingestion and detailed metrics collection in place, you now have the tools to derive deep insights into your infrastructure's performance and security.

What’s next? Here are some best practices to consider to stay ahead:

* **Regularly Check Dashboards:** Ensure your dashboards are up-to-date and reflect real-time data.  
* **Set Up Alerts:** Configure alerts for critical thresholds (e.g., CPU usage > 80%) so you can proactively address issues.  
* **Explore Advanced Features:** Dive deeper into OpenObserve's capabilities by exploring advanced features like custom queries.

Ready to take your monitoring even further? Explore more features by following our [OpenObserve Quickstart Guide](https://openobserve.ai/docs/quickstart/), and reach out if you have any questions along the way!