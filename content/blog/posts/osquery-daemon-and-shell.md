---
title: "Exploring osquery Daemon and Shell on Linux for Logging and Observability"
seoTitle: "Exploring osquery Daemon and Shell on Linux for Logging and Observability"
description: Learn how to use osquery daemon and shell on Linux for logging and observability. Discover how osquery works, its configuration, and how to analyze logs for enhanced system monitoring and security.
img: /img/blog/osquery-daemon/osquery.gif
alt: osquery-daemon-and-shell
slug: osquery-daemon-and-shell
authors: 
  - chaitanya
publishDate: 2024-11-30
tags:
  - osquery
  - security
  - OpenTelemetry
  - Monitoring
  - Linux
  - Observability
  - Troubleshooting
  - Auditing
  - Compliance
  - ubuntu
---

Osquery is a powerful open-source tool that transforms your operating system into a high-performance relational database. By using SQL-like queries, administrators and security professionals can easily explore the system’s state, monitor activities, and collect valuable logs. This blog delves into setting up **osquery** on Linux, understanding its **daemon** and **shell**, and leveraging the OpenTelemetry (OTel) agent for log ingestion.

---
⚠️ Important Note ⚠️ 
Configuring OpenObserve is out of the scope of this blog but if you want to get started then you can visit [Quickstart](https://openobserve.ai/docs/quickstart/) documentation of O2.|
| :---- |

## What is osquery?

Osquery is a framework that allows users to query the system's data as if it were stored in a database. For instance, you can run queries on:

* Active processes  
* System configurations  
* User sessions  
* Network activity

Its dual functionality as a **daemon** and **shell** makes osquery versatile for both real-time exploration and continuous monitoring.

## osquery Daemon and Shell: How They Work

* **osquery Daemon (`osqueryd`)**:  
  This is the long-running service that executes scheduled queries and generates logs. It operates in the background to monitor activities and events such as process creation, file modifications, and user logins. Logs are stored locally or forwarded to a log management system.  
* **osquery Shell (`osqueryi`)**:  
  This is the interactive shell for manual querying. It’s ideal for ad-hoc investigations or testing SQL queries.

For instance, running the shell:

```
#Type below to run shell
osqueryi

#Copy paste below to list all processes
SELECT name, path, pid FROM processes WHERE name LIKE '%sshd%';

#Copy paste below to list all logged in users
SELECT * FROM logged_in_users;
```

![osquery](/img/blog/osquery-daemon/image2.png)
![osquery](/img/blog/osquery-daemon/image5.png)

## How osquery Works

Osquery uses a virtual table structure to represent system data. These tables fetch live system information, and queries are executed on them as SQL statements.

Following is a simple workflow:

1. **Schedule Queries**: Use `osquery.conf` to define what to monitor.  
2. **Execute Queries**: The daemon executes scheduled queries at specified intervals.  
3. **Generate Logs**: Results are stored as structured logs, which can be sent to observability platforms.  
4. **Analyze Data**: Query logs for insights into system health or suspicious activities.

## Why Use osquery?

* **Visibility**: Unified view of system data through SQL queries.  
* **Flexibility**: Schedule queries and execute them automatically.  
* **Security**: Detect malicious activities with query-based alerts.  
* **Interoperability**: Easily integrates with observability platforms using agents like Fluent Bit or OTel.

## Installing and Configuring osquery on Linux

### Install osquery

Run the following commands to install osquery on Ubuntu

```
sudo apt update && sudo apt upgrade -y
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 1484120AC4E9F8A1A577AEEE97A80C63C9D8B80B
sudo add-apt-repository 'deb [arch=amd64] https://pkg.osquery.io/deb deb main'
sudo apt update
sudo apt install osquery -y
```

### Verify Installation

Check the installation by running below command

```
osqueryi --version
```

### Configure osquery Daemon

The below file helps log all the events that are returned as results of the queries under `/var/log/osquery/`

```
sudo vi /etc/osquery/osquery.conf

#enter the below and save it

{
  "options": {
    "config_plugin": "filesystem",
    "logger_plugin": "filesystem",
    "logger_path": "/var/log/osquery/",
    "disable_logging": false,
    "events_expiry": 3600,
    "schedule_splay_percent": 10,
    "utc": true,
    "verbose": false,
    "worker_threads": 2,
    "enable_monitor": true
  },
  "schedule": {
    "system_info": {
      "query": "SELECT * FROM system_info;",
      "interval": 3600
    },
    "logged_in_users": {
      "query": "SELECT * FROM logged_in_users;",
      "interval": 600
    },
    "listening_ports": {
      "query": "SELECT * FROM listening_ports LEFT JOIN processes ON listening_ports.pid = processes.pid;",
      "interval": 300
    },
    "file_events": {
      "query": "SELECT * FROM file_events WHERE action IN ('CREATED', 'UPDATED', 'DELETED');",
      "interval": 60
    },
    "process_events": {
      "query": "SELECT * FROM process_events;",
      "interval": 60
    },
    "user_groups": {
      "query": "SELECT * FROM user_groups;",
      "interval": 3600
    },
    "failed_logins": {
      "query": "SELECT * FROM last WHERE type = 'failed-login';",
      "interval": 300
    },
    "suspicious_cron_jobs": {
      "query": "SELECT * FROM crontab WHERE command NOT LIKE '%trusted-command%';",
      "interval": 600
    },
    "kernel_modules": {
      "query": "SELECT * FROM kernel_modules;",
      "interval": 600
    },
    "disk_encryption": {
      "query": "SELECT * FROM disk_encryption WHERE encrypted = 0;",
      "interval": 3600
    },
    "network_connections": {
      "query": "SELECT * FROM socket_events WHERE remote_address IS NOT NULL;",
      "interval": 60
    }
  },
  "decorators": {
    "always": [
      "SELECT uuid AS host_uuid FROM system_info;",
      "SELECT hostname FROM system_info;"
    ]
  },
  "file_paths": {
    "etc": [
      "/etc/%%"
    ],
    "logs": [
      "/var/log/%%"
    ]
  },
  "events": {
    "enabled": true,
    "subscriber_blacklist": []
  },
  "packs": {
    "osquery-monitoring": {
      "queries": {
        "osquery_info": {
          "query": "SELECT * FROM osquery_info;",
          "interval": 600
        },
        "schedule_monitor": {
          "query": "SELECT * FROM osquery_schedule WHERE name NOT IN (SELECT DISTINCT name FROM schedule);",
          "interval": 3600
        }
      }
    }
  }
}
```

### Restart osquery Daemon

```
sudo systemctl restart osqueryd
sudo systemctl enable osqueryd
```

### Ingesting Logs with OpenTelemetry (OTel) Agent

Follow the instructions on setting up OTEL on linux on OpenObserve and use the below configuration to start the agent.  
![osquery](/img/blog/osquery-daemon/image3.png)

Replace O2\_ENDPOINT and O2\_TOKEN with the OpenObserve details respectively. 

```
receivers:
  filelog/std:
    include: [ /var/log/osquery/osqueryd.results.log ]
    start_at: beginning
  processors:
  resourcedetection/system:
    detectors: ["system"]
    system:
      hostname_sources: ["os"]
  memory_limiter:
    check_interval: 1s
    limit_percentage: 75
    spike_limit_percentage: 15
  batch:
    send_batch_size: 10000
    timeout: 10s

extensions:
  zpages: {}

exporters:
  otlphttp/openobserve:
    endpoint: <O2_ENDPOINT>
    headers:
      Authorization: "<O2_TOKEN>"
      stream-name: osquery

service:
  extensions: [zpages]
  pipelines:
    logs:
      receivers: [filelog/std]
      processors: [resourcedetection/system, memory_limiter, batch]
      exporters: [otlphttp/openobserve]
```

Restart otel-collector by running the below command and you will see the logs ingesting to OpenObserve dashboard.

```
systemctl restart otel-collector
```
![osquery](/img/blog/osquery-daemon/image4.png)  
Use the below VRL function to transform the ingested logs by associating with the osquery stream for more detailed analysis.   
![osquery](/img/blog/osquery-daemon/image1.png)

```
if exists(.body) {
   body_expanded, parse_err = parse_json(.body)
   if parse_err == null {
       ., merge_err = merge(., body_expanded)
       if merge_err == null {
           del(.body)
       }
   }
}
.
```

## Understanding osquery Logs

The osquery daemon generates two main log types:

1. **Result Logs**: Contain query results.  
2. **Event Logs**: Track system events such as process launches or file changes.

Logs are stored in `/var/log/osquery/` and can be analyzed locally or sent to a log management tool.

## Best practices around osquery

1. **Secure the Configuration**: Limit access to the osquery configuration and logs.  
2. **Test Queries**: Always test your queries in `osqueryi` before adding them to `osquery.conf`.  
3. **Monitor Performance**: Avoid heavy queries that might impact system performance.  
4. **Centralize Logs**: Use the OTel agent to centralize logs for better analysis and visualization.

## How OpenObserve Can Help

OpenObserve serves as a robust observability platform that complements osquery's capabilities by offering centralized log ingestion, analysis, and visualization. By integrating osquery with OpenObserve, you can:

* **Streamline Observability**: Collect and visualize osquery logs, such as result and event logs, in a single platform for comprehensive system monitoring.  
* **Enhance Security Insights**: Detect anomalies and malicious activities in real-time using custom dashboards and queries built from osquery logs.  
* **Improve Scalability**: OpenObserve's high-performance architecture ensures efficient handling of large-scale logs from multiple osquery agents across your infrastructure.  
* **Optimize Monitoring**: Leverage detailed metrics and analytics to identify system bottlenecks, unauthorized access, or policy violations effortlessly.  
* **Simplify Integration**: With OpenTelemetry (OTel) support, you can forward osquery logs seamlessly to OpenObserve using the OTel agent, ensuring compatibility and ease of use.

Ready to explore OpenObserve and its features? [Sign-up on our cloud](https://cloud.openobserve.ai/) to get your account and start ingesting the logs. 