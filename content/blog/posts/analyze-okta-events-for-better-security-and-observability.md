---
title: Analyze Okta events for better security and observability
seoTitle: Analyze Okta events for better security and observability
description: "Understanding how to send Okta logs to OpenObserve for better security and observability."
img: /img/blog/okta/okta_logo_black.png
alt: OpenObserve
slug: analyze-okta-events-for-better-security-and-observability
authors:
  - prabhat
publishDate: 2024-06-21
tags:
  - okta
  - logs
  - security
---

## Introduction

Okta is a popular identity and access management service that provides secure access to applications and APIs. It offers a wide range of features, including single sign-on, multi-factor authentication, and user provisioning. Okta generates logs for various events, such as user logins, password changes, and application access, which can be used for monitoring, auditing, and troubleshooting purposes.

We will collect Okta logs and send them to OpenObserve for analysis. OpenObserve is a cloud-native observability platform that helps you monitor, analyze, and troubleshoot your applications and infrastructure. By sending Okta logs to OpenObserve, you can gain insights into user activities, security events, and system performance, enabling you to make informed decisions and improve your security posture.

## Sending Okta Logs to OpenObserve using Amazon Eventbridge

Monitoring and analyzing logs is crucial for maintaining security, ensuring compliance, and troubleshooting issues. Okta, a leading identity and access management service, offers streaming logs that can be sent to various destinations for further analysis. This blog will guide you through the process of sending Okta logs to Amazon EventBridge, which will then send them to Kinesis Firehose, ultimately forwarding them to OpenObserve.

## Prerequisites

Before we start, ensure you have the following:

1. An Okta account with administrative privileges.
2. An AWS account with appropriate permissions to create and manage EventBridge, Kinesis Firehose, and other related services.
3. An OpenObserve instance or cloud account ready to receive logs.

## Step 1: Configure Kinesis Firehose

### 1.1 Create a Kinesis Firehose Delivery Stream

1. Open the AWS Management Console and navigate to **Kinesis Firehose**.
2. Click **Create delivery stream**.
3. Choose **Direct PUT or other sources** as the source and click **Next**.
4. Name your delivery stream (e.g., `OktaLogsFirehose`).
5. In the **Destination** section, select your desired destination. For this, we will use **HTTP**.
6. Configure the HTTP endpoint to forward logs to OpenObserve by getting values from OpenObserve ingestion page.
7. Click **Next**.

## Step 2: Configure Okta Streaming Logs

### 2.1 Enable System Log Streaming in Okta

1. Log in to your Okta admin console.
2. Navigate to **Reports > Log Streaming**.
3. Click on **Settings** (gear icon) in the top right corner.
4. In the **Log Streaming** section, click **Add Log Stream**.
5. Select **Amazon EventBridge** as the destination and click **Next**.

![Okta eventbridge configuration](/img/blog/okta/okta1.png)

### 2.2 Configure Amazon EventBridge in Okta

1. Name
1. AWS Event source name
1. Enter your AWS account ID and region.
1. Click **Create IAM Role**. This will take you to the AWS Management Console to create an IAM role with the necessary permissions.
1. Once the role is created, go back to the Okta admin console and click **Save**.

## Step 3: Set Up Amazon EventBridge

At this point you should have an entry in your Eventbridge that you must accept.

![Okta eventbridge configuration](/img/blog/okta/eventbridge1.png)

At this point you will have a custom event bus created in your AWS account.

![Okta eventbridge configuration](/img/blog/okta/okta_event_bus.png)

You can now create a rule to capture Okta events.

### 3.1 Create a Rule to Capture Okta Events

1. In the EventBridge console, click on **Rules** in the left navigation pane.
2. Click **Create rule**.
3. Enter a name for your rule (e.g., `CaptureOktaLogs`) and select your event bus.
4. In the **Define pattern** section, choose **Event source** and enter the source as `aws.partner/okta.com`.
5. Click **Next**.

If all the configurations are correct, you should start seeing logs in OpenObserve in a few minutes.

### 3.2 Set Up Amazon EventBridge to Forward Logs to Kinesis Firehose

1. In the EventBridge console, click on **Targets** in the left navigation pane.
2. Click **Create target**.
3. Select **Kinesis Firehose** as the target type.
4. Choose the Kinesis Firehose delivery stream you created earlier.
5. Click **Create**.

If all the configurations are correct, you should start seeing logs in OpenObserve in a few minutes.

## Conclusion

By following these steps, you have successfully set up a pipeline to send Okta logs to Amazon EventBridge, which then sends them to Kinesis Firehose, and finally forwards them to OpenObserve. This setup ensures that your logs are captured, processed, and available for analysis in a centralized location, helping you maintain security and compliance in your organization.

Feel free to adjust the configuration based on your specific requirements and use cases. Happy logging!
