---
title: What is Journald and how to do centralize journald logging
seoTitle: What is Journald and how to do centralize journald logging
description: "What is Journald, what is it's log file location, how to do log rotation for it. Also learn how OpenObserve uses otel-collector to provide centralized logging for Journald."
img: /img/blog/journald/journald_hero.webp
alt: Journald Hero image
slug: what-is-journald-and-how-to-do-centralize-journald-logging
authors: 
  - prabhat
publishDate: 2024-10-20
tags:
  - journald
  - centralized logging
  - linux
  - logs
  - observability
---

### Introduction

System administrators and developers rely heavily on logging to monitor, troubleshoot and analyze system events. Among the various logging tools available, journald stands out for its efficiency and reliability. This article delves into what journald is, its centralized logging capabilities, log rotation and log location, providing a comprehensive overview of this powerful logging system.

### What is Journald?

Before understanding Journald let's understand a little bit about systemd. Systemd is a system and service manager for Linux operating systems. It provides a standardized way to manage services, [runlevels](https://en.wikipedia.org/wiki/Runlevel), and system resources. Systemd replaces traditional init systems like SysV init and Upstart. If you want to create a service in Linux, you would use systemd to manage it. e.g. Apache, MySQL, Nginx etc. These services can be started on every reboot, stopped, restarted, etc.

Journald, also known as systemd-journald, is a logging service developed by the systemd project and is part of the systemd suite. It collects and stores log messages from various sources, including:
1. Systemd services
2. Kernel messages
3. System logs (e.g., /var/log/messages)
4. Application logs (e.g., Apache, MySQL)

Unlike traditional logging systems that store logs in plain text files, journald stores logs in a binary format, offering several advantages:
- Efficient Storage: Binary format allows for more compact storage, reducing disk space usage.
- Faster Querying: Indexed binary logs enable quicker search and filtering.
- Structured Logging: Supports structured log messages for easier parsing and analysis.

### How to see Journald logs

To view journald logs, use the **journalctl** command. Here are some common usage examples:

Show logs since last boot
- journalctl -b

Show logs from previous boot
- journalctl -b -1

Show logs from a specific boot
- journalctl -b **boot_id**

Replace **boot_id** with the boot ID you want to view logs for.

Show logs for a specific service (Filtering Logs)
- journalctl -u **service_name**

Replace **service_name** with the name of the service you want to view logs for (e.g., nginx, mysql).

All the services that are managed by systemd can be found in the /etc/systemd/system directory. The service name is the name of the service file without the .service extension.

Show logs for a specific user
- journalctl -u **user_name**

Replace **user_name** with the username you want to view logs for.

Show logs with a specific priority
- journalctl -p **priority**

Replace **priority** with one of the following:
- emerg (0)
- alert (1)
- crit (2)
- err (3)
- warning (4)
- notice (5)
- info (6)
- debug (7)


### Journald log location

By default, journald stores its logs in the **/var/log/journal/** directory. However, the exact location can vary depending on the Linux distribution and configuration.

Here are some common locations where journald logs can be found:
- /var/log/journal/ (default)
- /var/log/messages (on some systems, journald logs are written to this file)
- /run/log/journal/ (on systems with a volatile /run filesystem)

The logs are stored in binary format and are split into multiple files. Journald rotates them automatically based on the log rotation settings.

### Journald log rotation

Journald rotates logs based on:

- Size: When the log file reaches a maximum size (default: 100MB).
- Time: At regular intervals (default: weekly).
- Boot: After each system reboot.

You can adjust log rotation settings in /etc/systemd/journald.conf:

Key Options
1. SystemMaxUse=: Maximum disk space for system logs (e.g., 100M).
2. SystemKeepFree=: Minimum free disk space for system logs (e.g., 50M).
3. RuntimeMaxUse=: Maximum disk space for runtime logs (e.g., 100M).
4. RuntimeKeepFree=: Minimum free disk space for runtime logs (e.g., 50M).
5. SystemMaxFileSize=: Maximum size for individual system log files (e.g., 20M).
6. RuntimeMaxFileSize=: Maximum size for individual runtime log files (e.g., 20M).


### Implementing Centralized Logging

In order to setup centralized logging with journald, you need to forward logs from each server to a central log server. Here is how you can achieve this using OpenObserve:

from the ingstion page, you can select Linux and copy the command to install the agent on your server. Once the agent is installed, it will start sending journald logs to OpenObserve. You can do it on each server for which you want to centralize logs. Ideally you would do it using a configuration management tool like Ansible, Puppet or AWS systems manager

![OpenObserve Linux instructions screenshot](/img/blog/journald/journald.webp)

After the agent is installed on the servers, you can start seeing logs in OpenObserve in the journald stream. You can then create dashboards, alerts, reports and more to monitor your servers.

![OpenObserve Jounald logs screenshot](/img/blog/journald/journald_logs.webp)

### Conclusion

Journald is a powerful logging system that offers efficient storage, fast querying, and structured logging capabilities. By understanding how journald works, its log location, log rotation, and centralized logging capabilities, you can leverage this system to monitor and analyze system events effectively. Implementing centralized logging with journald and OpenObserve can help you gain deeper insights into your system, enabling you to troubleshoot issues, monitor performance, and ensure system reliability.
