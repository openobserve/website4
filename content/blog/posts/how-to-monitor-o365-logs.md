---
title: "Unveiling Microsoft 365 Insights: From Diagnostics to Actionable Observability"
seoTitle: "Monitoring Microsoft 365 Logs: AuditLogs, SignInLogs, RiskyUsers, and Critical Events"
description: Discover how to effectively monitor Microsoft 365 logs, including AuditLogs, SignInLogs, Non-Interactive User SignInLogs, RiskyUsers, UserRiskEvents, ProvisioningLogs, NetworkAccessTrafficLogs, and RiskyServicePrincipals. This guide explores setting up robust log monitoring to enhance security, track critical events, ensure compliance, and gain actionable insights into your Microsoft 365 environment.
img: /img/blog/office365/o365.gif
alt: how-to-monitor-o365-logs
slug: how-to-monitor-o365-logs
authors: 
  - chaitanya
publishDate: 2024-12-03
tags:
  - Azure
  - Microsoft
  - Microsoft Entra
  - Mircosoft Audit Logs
  - Mircosoft Signin Logs
  - Azure functions
  - Aure Eventhub
  - Microsoft GraphAPI
  - Microsoft Logs
---

Managing and analyzing logs from Microsoft 365 services like Graph APIs, audit logs, sign-ins, and managed identities is critical for ensuring security, compliance, and performance optimization. While Microsoft 365 provides rich telemetry, collecting, processing, and centralizing these logs for real-time observability can be challenging without a scalable pipeline.

This guide explains the necessity of structured log ingestion, how it empowers security and operational excellence, and provides a step-by-step setup for ingesting Microsoft 365 logs into OpenObserve via Azure Event Hub.

## Why Ingest Microsoft 365 Logs?

* **Centralized Observability**: Consolidate logs from diverse Microsoft 365 services for a unified view.  
* **Proactive Security Monitoring**: Identify anomalies like repeated failed sign-ins or suspicious API calls.  
* **Regulatory Compliance**: Ensure audit trails are complete and easily accessible for compliance audits.  
* **Operational Insights**: Optimize managed identities and Graph API usage to streamline operations.

## How This Helps

Ingesting Microsoft 365 logs into OpenObserve enables:

* **Advanced Dashboards**: Build real-time, customizable dashboards to monitor activity trends.  
* **Improved Security Posture**: Detect and respond to security incidents promptly.  
* **Simplified Compliance Auditing**: Easily query and analyze audit logs for regulatory requirements.  
* **Scalability**: Use Azure Event Hub for handling high log volumes efficiently.

## Prerequisites

Before starting, ensure you have:

1. An **active Azure subscription**.  
2. Familiarity with **Azure Functions**.  
3. Visual Studio Code installed with the Azure Functions extension. Refer to [this guide](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=node-v4%2Cpython-v2%2Cisolated-process%2Cquick-create&pivots=programming-language-javascript) for deployment steps.

## Step-by-Step Setup

### 1. Create an Azure Event Hub

1. #### **Create an Event Hub Namespace**:

   * Go to the Azure Portal and search for **Event Hubs**.  
   * Click **\+ Add** to create a new namespace.  
   * Provide details:  
     * **Resource Group**: Use an existing group or create a new one.  
     * **Namespace Name**: Choose a unique name (e.g., `m365-eventhub`).  
     * **Pricing Tier**: Select one based on your log volume.  
   * Click **Review \+ Create** and confirm to deploy.
   ![microsoft](/img/blog/office365/eventhub_ns.png)

2. #### **Add an Event Hub**:

   * After the namespace is created, navigate to it and click **\+ Event Hub**.  
   * Name the Event Hub (e.g., `o2`) and leave default settings for **Partition Count** and **Message Retention**.  
   * Save the Event Hub configuration.
   ![microsoft](/img/blog/office365/eventhub_create.png)

3. #### **Create a Shared Access Policy**:

   * Under the namespace, go to **Shared Access Policies**.  
   * Add a policy with **Manage** permission.  
   * Save the policy and note the **Connection String**.
   ![microsoft](/img/blog/office365/shared_access_policy.png)
   ![microsoft](/img/blog/office365/sap_connection.jpeg)

### 2. Enable Microsoft 365 Diagnostics Logging

1. Navigate to the **Microsoft 365 Entra Admin Center**. 
   ![microsoft](/img/blog/office365/entra_admin_center.png)  
2. In the Azure Portal, go to **Monitoring health \> Diagnostic Settings**. 
  ![microsoft](/img/blog/office365/monitoring_health.png) 
3. Configure a new diagnostic setting:  
   * Name the setting (e.g., `m365-diagnostics`).  
   * Select categories such as **AuditLogs** and **SignInLogs**.  
   * Choose **Stream to an Event Hub** as the destination.  
   * Provide the Event Hub namespace and connection string.
   ![microsoft](/img/blog/office365/diagnostic_setting.png)

### 3. Deploy Azure Functions to Process Logs

Azure Functions will forward logs from the Event Hub to OpenObserve.

To create an azure function, you will need to first create the Function App by searching for it in your azure portal and select a tier along with your runtime stack. 
![microsoft](/img/blog/office365/functionapp_tier.png)
![microsoft](/img/blog/office365/functionapp_create.png)

1. **Clone the Function Code**:  
   * [Clone the prebuilt function repository](https://github.com/openobserve/azure-function-openobserve/tree/feature/o365)  
2. **Configure the Function**:  
   * Open the code in **VS Code**.  
   * Update the configuration file (`local.settings.json`) with:  
     1. **Event Hub Connection String**: The value noted earlier.   
     2. In index.js within function(s) replace \<O2\_ENDPOINT\> with your OpenObserve endpoint.  
3. **Deploy the Function**:  
   * Use the Azure Functions extension in VS Code:  
     1. Click **Deploy to Function App**.  
     2. Select your Azure subscription and resource group.
     3. Make sure to add your OpenObserve auth details in the App's environment.
     ![microsoft](/img/blog/office365/func_env.png)
     ![microsoft](/img/blog/office365/user_pass_env.png)  
   * Follow the [deployment guide](https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=node-v4%2Cpython-v2%2Cisolated-process%2Cquick-create&pivots=programming-language-javascript) for detailed instructions.

### 4. Validate and Ingest Logs into OpenObserve

1. Ensure that the Azure Function is running and forwarding logs to OpenObserve. Your stream names will be whatever you set them in your [index.js](https://github.com/openobserve/azure-function-openobserve/blob/feature/o365/openobserve/index.js#L35). Make sure you repeat the same for other functions (index.js) too!
2. In OpenObserve, search for logs using queries tailored to your log categories.
    ![microsoft](/img/blog/office365/office_logs.gif)

### 5. Build Dashboards and Alerts in OpenObserve

1. **Dashboards**:  
   * Create panels to visualize key metrics like:  
     * Failed Sign-Ins  
     * Graph API call usage  
     * Audit log activity  
    ![microsoft](/img/blog/office365/microsoft_final_1.gif)
   * [You can download the pre-built dashboards from our repository](https://github.com/openobserve/dashboards/tree/main/Microsoft_O365).  
2. **Alerts**:  
   * Configure alerts for security anomalies or unusual activity spikes.  
   * Integrate alerts with email or messaging services for real-time notifications. Refer to [Email Alerts](https://openobserve.ai/blog/how-to-configure-email-alerts-in-openobserve) blog for more details. 
   * Sample html template for the alert could be as below.
   ![microsoft](/img/blog/office365/email.jpeg)
```
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .email-header {
            background-color: #0078d7;
            color: #fff;
            padding: 20px;
            text-align: center;
        }
        .email-content {
            padding: 20px;
        }
        .email-footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #666;
        }
        .highlight {
            font-weight: bold;
            color: #0078d7;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Non-US Login Alert</h1>
        </div>
        <div class="email-content">
            <p>Hello,</p>
            <p>A login activity has been detected outside the US. Here are the details:</p>
            <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">User Name</td>
                    <td style="padding: 8px; border: 1px solid #ddd;" class="highlight">{identity}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">User Principal Name</td>
                    <td style="padding: 8px; border: 1px solid #ddd;" class="highlight">{properties_userprincipalname}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Location</td>
                    <td style="padding: 8px; border: 1px solid #ddd;" class="highlight">{location}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">City</td>
                    <td style="padding: 8px; border: 1px solid #ddd;" class="highlight">{properties_location_city}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">State</td>
                    <td style="padding: 8px; border: 1px solid #ddd;" class="highlight">{properties_location_state}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">IP Address</td>
                    <td style="padding: 8px; border: 1px solid #ddd;" class="highlight">{calleripaddress}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">App Name</td>
                    <td style="padding: 8px; border: 1px solid #ddd;" class="highlight">{properties_appdisplayname}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Browser</td>
                    <td style="padding: 8px; border: 1px solid #ddd;" class="highlight">{properties_devicedetail_browser}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Operating System</td>
                    <td style="padding: 8px; border: 1px solid #ddd;" class="highlight">{properties_devicedetail_operatingsystem}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;">Time</td>
                    <td style="padding: 8px; border: 1px solid #ddd;" class="highlight">{properties_createddatetime}</td>
                </tr>
            </table>
            <p>If you suspect this is unauthorized access, please take immediate action to secure your account.</p>
            <p>Best regards,<br>Security Team</p>
        </div>
        <div class="email-footer">
            This is an automated message. Please do not reply.
        </div>
    </div>
</body>
</html>
   ```

## Unlocking the Full Potential of Microsoft 365 Logs
![microsoft](/img/blog/office365/microsoft_o2.gif)

| Feature | Using Azure Event Hub & OpenObserve | Without Centralized Ingestion |
| ----- | ----- | ----- |
| Centralized Monitoring | Unified view of all logs | Limited to native tools |
| Real-Time Alerts | Advanced alerting capabilities | Basic  |
| Scalability | High-throughput log processing | Limited by native limits |
| Customization | Fully customizable dashboards | Predefined views only |
| Regulatory Compliance | Complete audit logs at your fingertips | Fragmented data |

By leveraging Azure Event Hub and OpenObserve, you gain centralized, actionable insights into your Microsoft 365 environment. This pipeline ensures real-time monitoring, proactive security, and streamlined compliance, enabling you to make informed decisions with confidence. Ready to take your observability to the next level? [Dive into your logs and start building impactful dashboards today\!](https://openobserve.ai/)