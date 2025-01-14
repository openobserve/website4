---
title: "AWS Network Firewall Explained: Setup and Log Analysis Made Easy"
seoTitle: AWS Network Firewall Setup and Log Analysis
description: Learn how to secure your AWS environment with AWS Network Firewall. This comprehensive guide covers setup, configuring rules, controlling traffic, and log analysis using OpenObserve for actionable insights.
img: /img/blog/aws_network_firewall/00.gif
alt: How to send AWS Network Firewall Logs to openobserve
slug: how-to-analyze-aws-network-firewall-logs

authors: 
  - Sampath
publishDate: 2025-01-14
tags:
  - AWS Network firewall log
  - Amazon Kinesis Firehose
  - Log Management
  - OpenObserve
  - AWS Kinesis Firehose
  - Firehose Delivery Stream
---
In today’s cloud world, securing your network infrastructure is not just a necessity—it's a priority. **AWS Network Firewall**, a fully managed service, offers powerful network protection for your Virtual Private Cloud (VPC). If you're looking for a beginner-friendly yet comprehensive guide, you're in the right place. This blog will help you understand AWS Network Firewall, its components, how it differs from other AWS security services, and how to set it up.

We’ll also walk you through a **step-by-step demo**, where we’ll configure the firewall, control traffic, and analyze logs using **OpenObserve** for actionable insights. By the end, you'll know how to protect your AWS workloads like a pro.

## What is AWS Network Security?

When you deploy workloads in the cloud, managing **network security on AWS** becomes critical. AWS offers several tools to control traffic, including **security groups**, **NACLs (Network Access Control Lists)**, and **firewalls**.

### Security Groups: Instance-Level Protection

Security groups are like virtual firewalls for your EC2 instances, controlling inbound and outbound traffic. They’re **stateful**, meaning if inbound traffic is allowed, the response traffic is automatically allowed.

### NACLs: Subnet-Level Security

NACLs work at the subnet level to allow or deny traffic. Unlike security groups, they are **stateless**, requiring rules for both inbound and outbound traffic.

While these tools are great for basic security, more sophisticated traffic filtering requires a solution like **AWS Network Firewall**.

## What is AWS Network Firewall?

AWS Network Firewall is a managed service that helps protect your Amazon VPCs by automatically scaling with your network traffic. It allows you to create custom firewall rules to control traffic, such as blocking harmful outbound requests. You can also import existing rules from open-source formats or AWS partners. Integrated with AWS Firewall Manager, it makes it easy to manage and apply firewall policies across multiple VPCs and accounts from a central location.

## Types of Firewall Rules

1. **Stateless Rules**: These rules evaluate each packet individually, without retaining any context of previous packets.  
2. **Stateful Rules**: These rules maintain context by tracking the state of connections, making it possible to apply more complex filtering logic.

## Use Cases of AWS Network Firewall

* **Inspect Inbound Internet Traffic**: Monitor and inspect inbound traffic using features like encrypted traffic inspection, stateful inspection, and protocol detection.  
* **Filter Outbound Traffic**: Prevent data loss, meet compliance requirements, and block malicious communications by filtering outbound traffic.  
* **Prevent Inbound Traffic Intrusion**: Protect against intrusions by inspecting active traffic with stateful inspection and protocol detection.  
* **Secure AWS Direct Connect and VPN Traffic**: Safeguard traffic between your on-premises environments and AWS using Direct Connect and VPN, supported by AWS Transit Gateway.

## Setting Up AWS Network Firewall 

In this section, we'll walk through the process of setting up a Virtual Private Cloud (VPC) with two subnets: one for the AWS Network Firewall and another for your application. We'll deploy the AWS Network Firewall in the firewall subnet and set up firewall rules to control traffic, including allowing SSH and controlling traffic based on domain names.

![Setting Up AWS Network Firewall](/img/blog/aws_network_firewall/01.jpg)

### Step 1: Creating a VPC with Two Subnets in AWS

1. Log in to AWS Console and Go to the **VPC** section.  
2. Click **Create VPC** and set a **CIDR block** like 10.0.0.0/16

![Creating a VPC with Two Subnets in AWS](/img/blog/aws_network_firewall/02.jpg)

3. Create two subnets: **Firewall Subnet** with CIDR block 10.0.1.0/24 and **Application Subnet** with CIDR block 10.0.2.0/24

![Creating Two Subnets in AWS](/img/blog/aws_network_firewall/03.jpg)

### Step 2: Create an Internet Gateway

1.  Create an Internet Gateway (IGW) and attach it to your VPC.

![Create an Internet Gateway](/img/blog/aws_network_firewall/04.jpg)

### Step 3: Deploy AWS Network Firewall in the Firewall Subnet

1. In the AWS Management Console, go to the **VPC** service and click on **Network Firewall** under the **Security** section.  
2. Create a **firewall** by selecting the **VPC** and **subnet**, naming it (e.g., **MyNetworkFirewall**), choosing "Subnet" as the deployment type, reviewing, and clicking "Create".

![Create a firewall](/img/blog/aws_network_firewall/05.jpg)

3. Create a firewall policy with **Stateful** rules (e.g., allow/deny traffic by domain)   
4. Attach the firewall policy by selecting your firewall, then choose the policy under **Firewall policy** and click **Associate**.

![Create a firewall policy](/img/blog/aws_network_firewall/06.jpg)

5. Created an "**allowdomain**" rule to permit access to google.com and a "**denywebsite**" rule to block access to sites such as gmail.com, linkedin.com etc...

![Create a firewall policy rule](/img/blog/aws_network_firewall/07.jpg)

6. Create and route the routable for IGW, Firewall and Application Subnet as shown in above diagram after setting up AWS Network Firewall.

### Step 4: Enable Firewall Logging

1. Go to **Logging Configuration** in the firewall.  
2. We can enable logging for **Alert**, **Flow**, and **TLS**.  
3. Choose a destination to **S3**, **CloudWatch log group**, or **Kinesis data firehose**.

![AWS Network Firewall log destination](/img/blog/aws_network_firewall/14.jpg)

4. For this demo we are going with **Kinesis data firehose**  
5. We need to create **Firehose streams** for this purpose. I have set up two streams: one for **alerts** and the other for **flow** logs, both configured to send logs to **OpenObserve**.  
                              

![Create a Firehose streams](/img/blog/aws_network_firewall/08.jpg)

6. To create a stream, select **Direct PUT** as the source and **HTTP Endpoint** as the destination.  
7. For the destination settings, such as the **HTTP Endpoint URL** and **Access Key** for authentication, you can obtain them from OpenObserve.  
8. Under **Data Sources**, select **Recommended**, and choose **AWS**. You will then see the **HTTP Endpoint** and **Access Keys**.

![Create a Firehose streams](/img/blog/aws_network_firewall/09.jpg)

9. Create and select an **S3 bucket** for the **Backup settings**, then click **Create Firehose stream** to complete the setup.

### Step 5: Launch an EC2 Instance in the Application Subnet

1. Go to **EC2 Dashboard** → **Launch Instance**.  
2. Select an appropriate AMI (e.g., Ubuntu or Amazon Linux 2).  
3. Choose instance type (`t2.micro` for demo purposes).  
4. Select the **my-demo-vpc** and **Application Subnet** and make sure to assign public IP to the instance.  
5. Attach a security group allowing SSH (`port 22`) and any required application ports.  
6. Launch the instance.

## Testing the AWS Network Firewall Setup

Since we have configured the firewall with a stateful rule to allow traffic only to the domain **google.com**, any attempt to access other domains from the EC2 instance launched in the **Application Subnet** will be blocked.

Additionally, we have enabled logging for AWS Network Firewall to send both **Flow Logs** and **Alert Logs** to **OpenObserve** for monitoring and analysis.

Now, let’s test the setup by using **`curl`** to access **google.com** and a few other domains. We should only be able to reach **google.com**, while requests to other domains will be blocked by AWS Network Firewall. When this happens, the firewall will drop the packets, and an **Alert Log** will be generated, which can be viewed in **OpenObserve**.

## Check Logs in OpenObserve

We are sending **Flow Logs** and **Alert Logs** as two separate streams to **OpenObserve** for better tracking and analysis.

![sending Flow Logs](/img/blog/aws_network_firewall/10.jpg)

In the **alert** stream, we can see the **Alert Logs** from AWS Network Firewall.

![sending alerts Logs](/img/blog/aws_network_firewall/12.jpg)

In the **flow** stream, we can see the **Flow Logs** from AWS Network Firewall.

![sending flow Logs](/img/blog/aws_network_firewall/11.jpg)

## Dashboards in OpenObserve 

The AWS Network Firewall dashboard provides essential insights into network security and traffic patterns through Alerts and flow logs. 

1. **Blocked Domains:** A bar chart visualizes access attempts to restricted sites, with LinkedIn leading at 16 attempts, followed by Amazon (8) and Gmail (6).  
2. **Protocol Usage:** A pie chart illustrates that TCP dominates traffic at 81.95%, while UDP accounts for 18.05%, indicating a strong reliance on TCP for network communications.  
3. **Source and Destination Ports:** Histograms display the source and destination ports involved in traffic flows. This data helps identify where traffic is originating and where it is being directed, providing insights into application behavior and potential vulnerabilities.

Overall, this dashboard is a vital tool for monitoring security incidents, analyzing traffic flows, and optimizing firewall configurations to enhance network security.

![AWS Network Firewall dashboard](/img/blog/aws_network_firewall/13.jpg)

## Conclusion
AWS Network Firewall offers advanced, managed security for your VPC with customizable rules to control traffic. By sending its logs to OpenObserve, you can easily analyze network activity, detect issues, and gain valuable insights for better security management and compliance, enhancing your overall network protection strategy.
