---
title: Setup Fluent Bit on Ubuntu for Efficient Log Forwarding
seoTitle: Setup Fluent Bit on Ubuntu for Efficient Log Forwarding
description: Setup Fluent Bit on Ubuntu for Efficient Log Forwarding
img: img/blog/fluentbit/ubuntu-plus-fluentbit.webp
alt: OpenObserve
slug: setup-fluent-bit-on-ubuntu-for-efficient-log-forwarding
authors: 
  - prabhat
publishDate: 2023-07-24
tags:
  - fluent-bit
  - fluentbit
  - log forwarding
  - logs
  - openobserve
---

# How to setup fluentbit on Ubuntu

In this blog, we will look at how to setup fluentbit on Ubuntu. We will also look at how to configure fluentbit to forward logs to OpenObserve.

## What is fluentbit?

Fluent Bit is an open source and multi-platform Log Forwarder which allows you to collect data/logs from different sources, unify and send them to multiple destinations. It's fully compatible with Docker and Kubernetes environments as well as bare metal instances and virtual machines. It's able to collect logs from different sources such as Linux kernel logs, application logs, file logs, logs from the standard input, and more. Fluent Bit is the Fluentd's little brother, it's super light, and it's written in C language and recommended over Fluentd for most scenarios.


## Setup

Official instructions are available at https://docs.fluentbit.io/manual/installation/linux/ubuntu, but need little tweaking.

Let's follow the following steps to setup fluentbit on Ubuntu:


### 1. Setup Server GPG key

```shell
sudo sh -c 'curl https://packages.fluentbit.io/fluentbit.key | gpg --dearmor > /usr/share/keyrings/fluentbit-keyring.gpg'
```

### 2. Export your ubuntu release name:

On Ubuntu, you need to add our APT server entry to your sources lists, please add the following content at bottom of your /etc/apt/sources.list file - ensure to set CODENAME to your specific Ubuntu release name (e.g. jammy for Ubuntu 22.04.2):

Let's get the release name:

Run

```shell
lsb_release -a
```

Output:

```shell
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.2 LTS
Release:        22.04
Codename:       jammy
```

or 

```shell
cat /etc/os-release
```

Output:
```shell
ubuntu@ip-172-31-6-194:~$ cat /etc/os-release
PRETTY_NAME="Ubuntu 22.04.2 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.2 LTS (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=jammy
```

Let's export it into an environment variable:

```shell
export CODENAME="jammy"
```

### 3. Update your sources lists

```shell
echo "deb [signed-by=/usr/share/keyrings/fluentbit-keyring.gpg] https://packages.fluentbit.io/ubuntu/$CODENAME/ \
  $CODENAME main" | sudo tee /etc/apt/sources.list.d/fluentbit.list
```

Output:

```
deb [signed-by=/usr/share/keyrings/fluentbit-keyring.gpg] https://packages.fluentbit.io/ubuntu/jammy/ jammy main
```

### 4. Install Fluent Bit

```shell
sudo apt-get update
sudo apt-get install fluent-bit
```

### 5.  Instruct systemd to enable the service:

We will use systemd to start fluentbit service. Using systemd will allow fluentbit to start everytime the server starts

```shell
sudo systemctl start fluent-bit
```

Check the status:

```shell
systemctl status fluent-bit
```

It should show something like this:

```shell
ubuntu@ip-172-31-1-242:~$ systemctl status fluent-bit
● fluent-bit.service - Fluent Bit
     Loaded: loaded (/lib/systemd/system/fluent-bit.service; disabled; vendor preset: enabled)
     Active: active (running) since Tue 2023-07-25 00:19:53 UTC; 20s ago
       Docs: https://docs.fluentbit.io/manual/
   Main PID: 2755 (fluent-bit)
      Tasks: 4 (limit: 2307)
     Memory: 3.0M
        CPU: 33ms
     CGroup: /system.slice/fluent-bit.service
             └─2755 /opt/fluent-bit/bin/fluent-bit -c //etc/fluent-bit/fluent-bit.conf

```
Enter `q` to exit the status view.

The default configuration of fluent-bit is collecting metrics of CPU usage and sending the records to the standard output, you can see the outgoing data in your /var/log/syslog file.

### 6. Configure fluentbit to forward logs to OpenObserve

Default configuration file is located at:

/etc/fluent-bit/fluent-bit.conf

Let's open the file in vi:

```shell
sudo vi /etc/fluent-bit/fluent-bit.conf
```

Log are generally stored in /var/log directory. Let's add the following configuration to the file:

INPUT

```shell
[INPUT]
    Name              tail
    Path              /var/log/*.log
    Parser            docker
    Tag               logs.*
    Refresh_Interval  5
    Rotate_Wait       5
    Mem_Buf_Limit     5MB
    Skip_Long_Lines   On
```

OUTPUT: Let's copy the output section from OpenObserve UI. It should look something like this:

```shell
[OUTPUT]
    Name http
    Match *
    URI /api/justprabhat_organization_1010/default/_json
    Host api.openobserve.ai
    Port 443
    tls On
    Format json
    Json_date_key    _timestamp
    Json_date_format iso8601
    HTTP_User youremail@yourdomain.com
    HTTP_Passwd qatj1wfZ890Q5Sk123k1
    compress gzip
```

Restart the service:

```shell
sudo systemctl restart fluent-bit
```

Check the status of the service using the command:

```shell
systemctl status fluent-bit
```

If there are no errors, you should see something like this:

```shell
ubuntu@ip-172-31-1-242:~$ systemctl status fluent-bit
● fluent-bit.service - Fluent Bit
     Loaded: loaded (/lib/systemd/system/fluent-bit.service; disabled; vendor preset: enabled)
     Active: active (running) since Tue 2023-07-25 01:28:14 UTC; 38s ago
       Docs: https://docs.fluentbit.io/manual/
   Main PID: 2926 (fluent-bit)
      Tasks: 6 (limit: 2307)
     Memory: 6.0M
        CPU: 95ms
     CGroup: /system.slice/fluent-bit.service
             └─2926 /opt/fluent-bit/bin/fluent-bit -c //etc/fluent-bit/fluent-bit.conf
```

If there are any errors you can check them using the command:

```shell
journalctl -u fluent-bit.service
```

### 7. Check the logs in OpenObserve

Go to OpenObserve UI and check the logs. You should see the logs now.


## Conclusion

We learnt how to setup fluentbit on Ubuntu and how to configure it to forward logs to OpenObserve. We also learnt how to check the logs in OpenObserve.


