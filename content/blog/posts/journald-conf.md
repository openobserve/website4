---
title: Journald.conf configuration
seoTitle: Journald.conf configuration
description: "How to configure journald.conf to customize journald logging in Linux"
img: /img/blog/journald/journald_conf.webp
alt: Journald config
slug: journald-conf
authors: 
  - prabhat
publishDate: 2024-10-20
tags:
  - journald
  - configuration
  - linux
  - logs
---

### Introduction

Journald is a system service for collecting and storing log data, introduced in systemd, a Linux initialization and service manager. It provides a centralized logging mechanism, replacing traditional syslog. Journald's primary configuration file is journald.conf, which controls various aspects of log collection, storage, and management.

### Understanding Journald Configuration

The journald.conf file is typically located at **/etc/systemd/journald.conf** or in the **/etc/systemd/journald.conf.d/** directory for drop-in configurations. This file contains several sections and options that define how journald operates.

#### Sections in journald.conf

- \[Journal\]: This section contains settings related to the journal itself, such as storage, compression, and rotation.
- \[ForwardToSyslog\]: This section controls forwarding of messages to syslog.
- \[System\] and \[User\]: These sections configure system-wide and user-specific settings, respectively.

#### Key Options in journald.conf

**Storage Options**
- Storage=: Specifies how to store journal data. Possible values are:
    - volatile: Store data in memory only.
    - persistent: Store data on disk.
    - auto: Automatically determine storage based on directory existence.
- SystemMaxUse= and SystemKeepFree=: Control the maximum disk space used by system journals and the amount of free space to keep, respectively.
- RuntimeMaxUse= and RuntimeKeepFree=: Similar to the above but for runtime (volatile) journals.

**Compression and Sealing**
- Compress=: Enables or disables compression for journal files.
- Seal=: Controls whether to seal journal files, which can improve security but may impact performance.

**Forwarding and Output**

- ForwardToSyslog=: Enables or disables forwarding of messages to syslog.
- ForwardToKMsg=: Controls forwarding of messages to the kernel log buffer.
- ForwardToConsole=: Specifies whether to forward messages to the console.

**Rotation and Cleanup**

- SystemMaxFileSize= and RuntimeMaxFileSize=: Set the maximum size of individual journal files for system and runtime journals.
- MaxFileSec=: Controls the maximum time to store journal entries.
- MaxRetentionSec=: Specifies the maximum time to keep journal entries.

Example Configuration

```ini
[Journal]
Storage=persistent
SystemMaxUse=100M
SystemKeepFree=50M
Compress=yes
Seal=yes
ForwardToSyslog=yes
ForwardToKMsg=no
ForwardToConsole=no

[ForwardToSyslog]
yes

[system]
MaxFileSec=1month
MaxRetentionSec=2months
SystemMaxFileSize=20M
```

This example configuration sets persistent storage with a maximum system journal size of 100M, ensuring at least 50M of free space. It enables compression and sealing, forwards messages to syslog, and sets file size and retention limits.

#### Editing journald.conf

To modify journald.conf, follow these steps:

1. Open the configuration file with your preferred text editor, typically requiring superuser privileges:

```bash
sudo nano /etc/systemd/journald.conf
```

2.  Make the necessary changes to the options as described above.
3.  Save and close the file.
4.  To apply the changes, reload the systemd daemon and restart the journald service:
```bash
sudo systemctl daemon-reload
sudo systemctl restart systemd-journald
```

Verify that the changes are in effect by checking the journald status:
```bash
sudo systemctl status systemd-journald
```

## Best Practices


* Regularly review and adjust the storage and retention settings based on system requirements and disk space. Centralize your logging for easier management and analysis and reduce pressure on local disk space. Learn how to do that using our guide on [What is Journald and how to do centralize journald logging](what-is-journald-and-how-to-do-centralized-journald-logging).
* Consider enabling compression to reduce storage needs but be aware of potential performance impacts.
* Use **journalctl** commands to manage and inspect journals, such as **journalctl --disk-usage** to check disk usage.

## Conclusion

By understanding and configuring **journald.conf** appropriately, you can effectively manage log data collection and storage on your Linux system, ensuring optimal performance and compliance with logging requirements.

