---
title: "How Can You Store and Monitor Ansible Logs Effortlessly?"
seoTitle: "How Can You Store and Monitor Ansible Logs Effortlessly?"
description: Learn how to store and monitor Ansible logs effortlessly with this step-by-step guide. Discover best practices for Ansible log management, setup instructions, and tips for using Fluent Bit to centralize logs for real-time monitoring and troubleshooting.
img: /img/blog/how-to-monitor-ansible-logs/ansible_logs.gif
alt: how-can-you-store-and-monitor-ansible-logs
slug: how-can-you-store-and-monitor-ansible-logs
authors: 
  - chaitanya
publishDate: 2024-11-08
tags:
  - Ansible
  - Logging
  - FluentBit
  - Monitoring
  - Infrastructure
  - Observability
  - Troubleshooting
  - Auditing
  - Compliance
  - configuration management
---

Storing and monitoring Ansible logs is crucial for tracking deployments, debugging, and understanding automation outcomes. This guide provides step-by-step instructions to set up Ansible on Ubuntu, create a sample task for local execution, and use Fluent Bit to collect and send ansible logs to a centralized observability solution.

### Prerequisites

1. **Ubuntu Machine** (local or virtual)  
2. **User with sudo privileges**  
3. **Basic familiarity with Ansible and Fluent Bit**

### Step 1: Setting Up Ansible on Ubuntu

Start by installing Ansible. If it’s not already installed, follow these instructions:

1. Update the package list

```
sudo apt update
```

2. Install Ansible

```
sudo apt install ansible -y
```

3. Verify the Installation

```
ansible --version
```

This should output the Ansible version, confirming the installation.

### Step 2: Configuring a Local Ansible Task

Create a sample Ansible playbook to test local execution. This task will simply create a file and write some text into it.

1. Create a New Directory for Your Playbook

```
mkdir ~/ansible_logs_demo
cd ~/ansible_logs_demo
```

2. Create ansible.cfg to set the log file path

```
[defaults]
log_path = /tmp/ansible_log_demo.txt
```

3. Create the Playbook File

```
# i use vi, you can pick whatever you want
vi local_task.yml 
```

4. Add the Following Sample Task

```
---
- name: Ansible Local Task Demo
  hosts: localhost
  tasks:
    - name: Create a sample file
      ansible.builtin.file:
        path: /tmp/ansible_log_demo.txt
        state: touch

    - name: Write a message to the sample file
      ansible.builtin.copy:
        content: "This is a demo log entry from Ansible."
        dest: /tmp/ansible_log_demo.txt
```

5. Run the Playbook  
   1. Run the playbook to execute the task locally to create the log file.

```
ansible-playbook local_task.yml#verbose loggingansible-playbook local_task.yml -v
```

This will create and write to `/tmp/ansible_log_demo.txt`. Now that we have a task generating logs, let’s set up Fluent Bit to send these logs to our log monitoring solution.

### Step 3: Setting Up Fluent Bit for Log Collection

To capture and forward Ansible logs, we’ll use Fluent Bit, a lightweight log processor.

1. Install Fluent Bit, if you prefer to install in a different way, you can find the documentation [here](https://docs.fluentbit.io/manual/installation/linux/ubuntu).

```
curl https://raw.githubusercontent.com/fluent/fluent-bit/master/install.sh | sh
```

2. Configure Fluent Bit to Collect Ansible Logs  
   We’ll configure Fluent Bit to read from Ansible’s log output directory and send it to the observability tool.  
   Open Fluent Bit’s configuration file

```
sudo vi /etc/fluent-bit/fluent-bit.conf
```

3. Add the Following Configuration

```
[SERVICE]
    Flush         5
    Daemon        Off
    Log_Level     info

[INPUT]
    Name          tail
    Path          /tmp/ansible_log_demo.txt
    Tag           ansible.demo
    Refresh_Interval 5

[OUTPUT]
    Name http
    Match *
    URI /api/<O2_ORG_NAME>/<O2_STREAM_NAME>/_json
    Host <O2_HOST>
    Port 443
    tls On
    Format json
    Json_date_key    _timestamp
    Json_date_format iso8601
    HTTP_User <O2_USER>
    HTTP_Passwd <O2_PASSWORD>
    compress gzip
```

4. Start and enable Fluent Bit  
   1. After configuring Fluent Bit, start the service to begin collecting logs

```
sudo systemctl start fluent-bit
sudo systemctl enable fluent-bit
```

   Check Fluent Bit’s status to ensure it’s running smoothly

```
sudo systemctl status fluent-bit
```

5. Verify Log Ingestion  
   1. Trigger the Ansible task by appending the debug logs to the same file

```
ansible-playbook local_task.yml -vvv 
```

![ansible logs](/img/blog/how-to-monitor-ansible-logs/ansible_logs_o2.gif)

### Monitor and Improve Your Ansible Deployments

Efficiently managing and monitoring Ansible logs is essential for maintaining clear visibility into your automation processes. By setting up Ansible with Fluent Bit on Ubuntu, you now have a streamlined way to capture, process, and store Ansible logs in a centralized observability solution. This approach ensures you’re equipped to troubleshoot issues, optimize deployments, and enhance overall config management reliability.

With the steps in this guide, you’ve gained the skills to configure Ansible logs ingestion for real-time visibility and easy access to historical logs. As automation becomes more integral to infrastructure and configuration management, keeping track of Ansible logs can be pivotal for maintaining a well-documented and efficient operation.

[Take Control of Your Ansible Logs with OpenObserve](https://cloud.openobserve.ai)