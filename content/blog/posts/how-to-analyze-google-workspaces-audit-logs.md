---
title: How to analyze Google Workspaces audit logs
seoTitle: How to analyze Google Workspaces audit logs
description: "Understanding how to analyze Google Workspaces audit logs using Google Cloud Pub/Sub and OpenObserve."
img: /img/blog/google_workspace/google_workspace_logo.webp
alt: OpenObserve
slug: how-to-analyze-google-workspaces-audit-logs
authors: 
  - prabhat
publishDate: 2024-07-12
tags:
  - gcp
  - google workspaces
  - pubsub
  - logs
---

## Introduction

Analyzing security events from Google Workspaces is crucial for maintaining security and compliance. Google Workspaces provides audit logs that capture activities performed by users, administrators, and applications. By analyzing these logs, you can gain insights into user behavior, detect security incidents, and ensure compliance with organizational policies.

In this blog post, we will walk through the steps to set up Google Workspaces to forward audit logs to OpenObserve for analysis and visualization.

Workflow would be like this:

```
Google Workspaces audit logs -> Google cloud logs -> Log router -> Google Cloud Pub/Sub -> OpenObserve
```

To enable this workflow, we will need to enable sharing option in google workspaces. This will start sending logs to Google Cloud Logs. 


## Enable log sharing in Google Workspaces

1. Log in to your Google Workspaces admin console.
2. Navigate to **Account > Account Settings > Legal and Compliance > Sharing Options** and enable it.

![Google Workspaces sharing options](/img/blog/google_workspace/google_workspaces_logsharing.webp)


Once you enable log sharing, Google Workspaces will start sending audit logs to Google Cloud Logs.

Go to Log Explorer. Make sure that Organization is selected in the resource dropdown (One with the building icon). 

<img src="/img/blog/google_workspace/project_selector.webp" alt="Google Cloud Logs" width="600"/>


You should start seeing logs from Google Workspaces.

![Google Cloud Logs](/img/blog/google_workspace/gcp_logs.webp)

## Configuration

Next step is to create a log router sink to send these logs to Google Cloud Pub/Sub and then to OpenObserve.

You can follow the steps mentioned in [this blog post](/blog/send-gcp-logs-to-openobserve) to create a log router sink and send logs to OpenObserve.

## Analysis  and Visualization

Once you have logs in OpenObserve, you can create dashboards, alerts, and reports to monitor and analyze Google Workspaces audit logs. This is how logs will look in OpenObserve.

![Google Cloud Logs](/img/blog/google_workspace/google_workspaces_logsearch.webp)

You can create dashboard like this to monitor Google Workspaces audit logs and a whole lot more.

![Google Cloud Logs](/img/blog/google_workspace/google_workspaces_dashboard.webp)

## Conclusion

We learned how to enable log sharing in Google Workspaces, send audit logs to Google Cloud Logs, and then to OpenObserve for analysis and visualization. By analyzing Google Workspaces audit logs, you can gain insights into user activities, detect security incidents, and ensure compliance with organizational policies. OpenObserve provides a powerful platform to monitor, analyze, and visualize logs from Google Workspaces and other cloud services.



