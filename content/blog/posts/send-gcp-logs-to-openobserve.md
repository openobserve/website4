---
title: How to send GCP logs to OpenObserve
seoTitle: How to send GCP logs to OpenObserve
description: "Understanding how to send GCP logs to OpenObserve using pub sub and OpenObserve builtin support"
img: /img/blog/gcp/gcp.png
alt: OpenObserve
slug: send-gcp-logs-to-openobserve
authors: 
  - prabhat
publishDate: 2024-06-21
tags:
  - gcp
  - pubsub
  - logs
---

## Introduction

Managing and analyzing logs effectively is crucial for any organization running applications on Google Cloud Platform (GCP). One powerful way to handle GCP logs is by sending them to OpenObserve via Google Cloud Pub/Sub via Log Router Sink. This allows you to create real-time log processing workflows and integrate logs with various downstream systems. In this blog post, we will walk through the steps to set up a Log Router Sink to send GCP logs to Pub/Sub and create a subscription to the topic with a push endpoint.

```
Google cloud logs -> Log router sink -> Pub/Sub -> OpenObserve
```

## Prerequisites

Before we begin, ensure you have the following:

1. A GCP account with the necessary permissions.
2. A Pub/Sub topic created in your GCP project.
3. Basic knowledge of GCP Console and command-line tools.
4. An endpoint URL for OpenObserve.

## Step 1: Create a Pub/Sub Topic

First, we need a Pub/Sub topic to which the logs will be sent. You can create a Pub/Sub topic using the GCP Console or the `gcloud` command-line tool.

### Using GCP Console:

1. Navigate to the Pub/Sub section in the GCP Console.
2. Click on "Create Topic."
3. Provide a name for your topic and click "Create."

### Using gcloud Command-Line Tool:

```bash
gcloud pubsub topics create my-log-topic
```

## Step 2: Create a Subscription to the Topic

Next, we need to create a subscription to the Pub/Sub topic. This subscription will have a push endpoint that sends logs to OpenObserve.

### Using GCP Console:

1. Go to the Pub/Sub section in the GCP Console.
2. Click on the topic you created.
3. Select "Create Subscription."
4. Provide a name for your subscription.
5. In the "Delivery type" section, select "Push."
6. Enter the OpenObserve endpoint URL in the "Push endpoint" field. You can get this from OpenObserve ingestion page.
7. Click "Create."

Get OpenObserve GCP endpoint URL from the ingestion page. Here is a screenshot:

![OpenObserve Endpoint](/img/blog/gcp/gcp_ingestion.png)

Now create the subscription:
![Create Subscription](/img/blog/gcp/pubsub1.png)

### Using gcloud Command-Line Tool:

```bash
gcloud pubsub subscriptions create my-log-subscription \
  --topic=my-log-topic \
  --push-endpoint=https://api.openobserve.ai/gcp/myorg/mystream/_sub?API-Key=aBJhYkqhdEBvcub2JzZXJ2ZS5haTp0YUtKZEJRbVc1ZkNLSnFS
```

## Step 3: Set Up a Log Router Sink

A Log Router Sink will route logs from Cloud Logging to the Pub/Sub topic. To create a sink, follow these steps:

### Using GCP Console:

1. Go to the Logging section in the GCP Console.
2. Select "Logs Router" from the sidebar.
3. Click on "Create Sink."
4. Provide a name for your sink.
5. In the "Sink Destination" section, select "Cloud Pub/Sub" and choose the topic you created earlier.
6. In the "Sink Details" section, specify the logs you want to include in the sink by creating a filter. For example, to include all logs, use:
    ```
    logName: "projects/YOUR_PROJECT_ID/logs/"
    ```
7. Click "Create Sink."

### Using gcloud Command-Line Tool:

You can also create a sink using the `gcloud` tool:

```bash
gcloud logging sinks create my-log-sink \
  pubsub.googleapis.com/projects/YOUR_PROJECT_ID/topics/my-log-topic \
  --log-filter='logName: "projects/YOUR_PROJECT_ID/logs/"'
```

## Step 4: Grant Permissions to the Log Router

The Log Router needs permission to publish messages to the Pub/Sub topic. This involves granting the Pub/Sub Publisher role to the Log Router service account.

### Using GCP Console:

1. Go to the Pub/Sub section in the GCP Console.
2. Select the topic you created.
3. Click on the "Permissions" tab.
4. Click "Add" to add a new member.
5. In the "New members" field, add the Log Router service account. The format is:
    ```
    serviceAccount:cloud-logs@YOUR_PROJECT_ID.iam.gserviceaccount.com
    ```
6. In the "Role" dropdown, select "Pub/Sub Publisher."
7. Click "Save."

### Using gcloud Command-Line Tool:

```bash
gcloud pubsub topics add-iam-policy-binding my-log-topic \
  --member=serviceAccount:cloud-logs@YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/pubsub.publisher
```

## Step 5: Verify Log Delivery

If you have all set up correctly, logs from GCP should now be sent to the Pub/Sub topic and pushed to the OpenObserve. 

## Conclusion

By following these steps, you have successfully set up a Log Router Sink to send GCP logs to Pub/Sub and created a subscription with a push endpoint to OpenObserve. This integration allows you to create robust log processing pipelines and integrate with various other GCP services and third-party tools.

Happy logging!

---

Feel free to ask any questions or share your thoughts in the comments below. If you found this guide helpful, don’t forget to share it with your network!

