---
title: A Complete Guide on How to Stream and Analyze AWS CloudWatch Logs Using Amazon Kinesis Firehose
seoTitle: How to send AWS CloudWatch Logs to Kinesis Firehose and Beyond
description: Learn how to send AWS CloudWatch Logs to Amazon Kinesis Firehose with this step-by-step guide. Discover real-time log streaming, analysis techniques, and integration best practices to optimize cloud monitoring and performance.
img: /img/blog/cw-logs-o2/0.gif
alt: How to send AWS CloudWatch Logs to Kinesis Firehose
slug: how-to-send-aws-cloudwatch-logs-to-kinesis-firehose

authors: 
  - Sampath
publishDate: 2024-11-25
tags:
  - AWS CloudWatch Logs
  - Amazon Kinesis Firehose
  - Log Management
  - OpenObserve
  - AWS Kinesis Firehose
  - Firehose Delivery Stream
  - Real-Time Monitoring
---
AWS CloudWatch Logs are essential for monitoring your cloud infrastructure, but streaming and analyzing them efficiently can be a challenge. Amazon Kinesis Firehose simplifies the process by allowing you to easily stream CloudWatch logs to various destinations for deeper analysis.
In this guide, we'll walk you through how to run a Python script to send dummy logs to AWS CloudWatch, stream them to Amazon Kinesis Firehose using a subscription filter, and then send the logs to OpenObserve with S3 as storage for enhanced log management and actionable insights.

**In this blog, we will cover:**
1. What are AWS CloudWatch Logs?
2. What is Amazon Kinesis Firehose?
3. What is Amazon S3?
4. What is OpenObserve?
5. How to install and configure OpenObserve
6. Step-by-Step Guide to Setting Up CloudWatch Logs to Kinesis Firehose Pipeline
7. Verify Logs in OpenObserve
8. Create a Simple Dashboard in OpenObserve
9. Conclusion

### Prerequisites:
- An AWS Account ready to create and manage resources
- A domain name (o2.com) for requesting a TLS certificate in AWS ACM.
- An OpenObserve cloud/self hosted account ready to receive logs. We will use OpenObserve self hosted with S3 as its storage in this blog.

## What Are AWS CloudWatch Logs?
AWS CloudWatch Logs is a service that collects and stores logs from AWS resources and applications. It serves as the default destination for logs from many AWS services, helping you monitor, search, and analyze log data to gain insights, troubleshoot issues and maintain visibility into your AWS environment.

## What is Amazon Kinesis Firehose?
Amazon Kinesis Firehose is a fully managed service designed to deliver real-time streaming data to various destinations, such as data lakes, analytics services, and custom HTTP endpoints. By integrating CloudWatch Logs with Firehose, you can stream logs seamlessly to tools like OpenObserve or other destinations, enabling real-time monitoring, analysis, and storage of log data.

## What is Amazon S3?
Amazon S3 (Simple Storage Service) is an object storage service that provides highly scalable, durable, and low-latency storage for data, such as backups, archives, and application data. It is designed to store and retrieve any amount of data from anywhere on the web.

## What is OpenObserve?
OpenObserve is an open-source full stack observability platform designed to capture, store, and analyze logs, metrics, and traces for monitoring and troubleshooting applications and infrastructure in real-time. It helps teams improve performance, reliability, and troubleshooting efficiency by providing centralized observability data.

## How to install and configure OpenObserve
In this section, we will install and configure OpenObserve (O2) to use S3 as its storage backend. Follow these steps:
### Step 1: Create an S3 Bucket
Create an S3 bucket in AWS where OpenObserve will store its logs. Here are the basic steps to create an S3 bucket:
1. Go to the **S3 Console** in AWS Management Console and click **Create bucket**.
![AWS S3 Console-Landing Page to Start Bucket Creation](/img/blog/cw-logs-o2/1.jpg)
2. Provide a unique name for your bucket 
![AWS S3 Console - Step to Provide a Unique Bucket Name](/img/blog/cw-logs-o2/2.jpg)
3. You can go with default options and click **Create bucket**.
![AWS S3 Console - Default Configuration Options for Bucket Creation](/img/blog/cw-logs-o2/3.jpg)
4. Once the bucket is created, you should see it listed in your **S3 dashboard**.
![AWS S3 Console - S3 Dashboard Showing the Newly Created Bucket](/img/blog/cw-logs-o2/4.jpg)

### Step 2: Launch an Instance
An EC2 instance is required to host OpenObserve for its installation and configuration. To launch an EC2 instance, follow these steps:
1. Go to the **EC2 Console** in AWS Management Console and click **Launch Instance**. 
![AWS EC2 Console - Launch Instance Option](/img/blog/cw-logs-o2/5.jpg)
2. Name the instance **O2**
![AWS EC2 Console - Instance Naming Page](/img/blog/cw-logs-o2/6.jpg)
3. Select an AMI – Under **Quick Start**, choose **Ubuntu**.
![AWS EC2 Console - AMI Selection Page - Ubuntu](/img/blog/cw-logs-o2/7.jpg)
4. Select an instance type – Choose **t2.micro** (sufficient for this demo).
![AWS EC2 Console - Instance Type Selection - t2.micro](/img/blog/cw-logs-o2/8.jpg)
5. Select an existing key pair or create a new one for SSH access.
![AWS EC2 Console - Key Pair Selection for SSH Access](/img/blog/cw-logs-o2/9.jpg)
6. Edit Network settings to open the **port 5080** from **anywhere (0.0.0.0/0)** to allow access to **OpenObserve's UI**.
![AWS EC2 Console - Network Settings for Port 5080 Access](/img/blog/cw-logs-o2/10.jpg)
7. Click **Launch Instance**.
![AWS EC2 Console - Launch Instance Button](/img/blog/cw-logs-o2/11.jpg)
Once the instance is launched, you should see it listed in your **EC2 dashboard**.
![AWS EC2 Console - EC2 Dashboard Showing Launched Instance](/img/blog/cw-logs-o2/12.jpg)

### Step 3: Connect to the EC2 Instance and Run the Command
Once your EC2 instance is running, you can connect to it via SSH and execute the command to install and configure OpenObserve. Here are the steps:

1. Open your terminal and use the following SSH command to connect to the EC2 instance:
```
ssh -i <your-key-pair.pem> ubuntu@<your-ec2-public-ip>
```
Replace **<your-key-pair.pem>** with your SSH key file and **<your-ec2-public-ip>** with the public IP address of your EC2 instance.

2. Once connected to the EC2 instance, run the following command to configure **OpenObserve with S3 as storage**:
```
ZO_ROOT_USER_EMAIL="root@example.com" \
ZO_ROOT_USER_PASSWORD="Complexpass#123" \
ZO_LOCAL_MODE_STORAGE="s3" \
ZO_S3_ACCESS_KEY="AWS Access Key ID" \ 
ZO_S3_SECRET_KEY="Secret Access Key" \
ZO_S3_REGION_NAME="ap-south-1" \
ZO_S3_BUCKET_NAME="myo2bucket" \
ZO_S3_PROVIDER="aws" \
./openobserve
```
This will start the OpenObserve instance with S3 as the storage backend, using your specified AWS credentials.

**Note:** If you do not wish to expose your AWS Access Key ID and Secret Access Key, it's recommended to attach an IAM role to your EC2 instance with the necessary permissions (e.g., **AmazonS3FullAccess** or an **admin** role). This will allow OpenObserve to access S3 securely without hard-coding credentials.
![AWS IAM Role for EC2 Instance - Attach Permissions for S3 Access](/img/blog/cw-logs-o2/13.jpg)

### Step 4: Check the OpenObserve Dashboard UI
After running the OpenObserve command, you need to verify that the OpenObserve UI is accessible. Follow these steps:
1. Open your web browser.
2. Navigate to **http://<your-ec2-public-ip>:5080**, replacing **<your-ec2-public-ip>** with the public IP address of your EC2 instance.
3. Log in using the root user credentials you set in the command:
- **Email: root@example.com**
- **Password: Complexpass#123**
4. Once logged in, you should see the OpenObserve dashboard, indicating that the setup was successful.
![OpenObserve Login Page - Enter Root User Credentials](/img/blog/cw-logs-o2/14.jpg)
![OpenObserve Dashboard UI - Successfully Logged In](/img/blog/cw-logs-o2/15.jpg)

### Step 5: Check the Setup 
You can test the setup by sending test log data to OpenObserve using a curl command. Follow these steps:
1. Log in to the OpenObserve Dashboard UI.
2. Navigate to **Data Sources** in the menu.
3. Select **Custom > Logs > curl** to find the pre-generated curl command.
![OpenObserve Data Sources Menu - Selecting Custom Logs](/img/blog/cw-logs-o2/16.jpg)
4. Copy the displayed curl command and run it in your terminal.
![OpenObserve Dashboard UI - Copying Curl Command for Log Ingestion](/img/blog/cw-logs-o2/17.jpg)
5. Return to the OpenObserve Dashboard UI and verify that the log appears under the **Logs section**.
![OpenObserve Dashboard UI - Logs Section Showing Ingested Log](/img/blog/cw-logs-o2/18.jpg)
6. Check the S3 Bucket by navigating to your S3 bucket in the AWS Management Console. Open the bucket you created (e.g., **myo2bucket**), and you should see the logs stored as objects inside the bucket.
![AWS S3 Console - Viewing Logs Stored in the Bucket](/img/blog/cw-logs-o2/19.jpg)

This confirms that OpenObserve is successfully ingesting logs and storing them in the S3 bucket, which it uses as its storage.

## Secure Your Application Load Balancer (ALB) endpoint with ACM HTTPS Certificates

As we plan to send log data to OpenObserve using a Kinesis Firehose stream with the **Direct PUT method**, we need to provide a secure **HTTPS endpoint** for OpenObserve. Firehose only accepts HTTPS endpoints.

Since our OpenObserve instance is currently running on HTTP, we need to secure it to meet this requirement. To achieve this, we will set up an Application Load Balancer (ALB) in front of OpenObserve and assign it a certificate using AWS Certificate Manager (ACM).

This section will guide you through:
1. Request a TLS certificate using AWS ACM.
2. Configuring an ALB to enable HTTPS connections and forwarding requests to the OpenObserve instance.

### Step 1:  Request a Certificate in ACM
To secure your ALB with HTTPS, you need to request a TLS certificate in AWS ACM. Follow these steps:
1. Open the AWS Certificate Manager in the AWS Management Console.
![AWS Certificate Manager (ACM) - Requesting TLS Certificate for ALB](/img/blog/cw-logs-o2/20.jpg)
2. Click **Request a certificate** and choose Request a **public certificate**.
![AWS ACM - Request a Public Certificate Option](/img/blog/cw-logs-o2/21.jpg)
3. Enter your domain name (e.g., **o2.com**), keep the default settings, and click **Request to proceed**.
![AWS ACM - Enter Domain Name for Certificate Request](/img/blog/cw-logs-o2/22.jpg)
4. ACM will provide a **CNAME record**. Add this record to your domain's DNS settings in the AWS Hosted Zone to validate domain ownership.
![AWS ACM - CNAME Record for Domain Validation](/img/blog/cw-logs-o2/23.jpg)
![AWS ACM - Adding CNAME Record to DNS](/img/blog/cw-logs-o2/24.jpg)
5. Once the validation is complete, ACM will issue the TLS certificate, ready to be attached to your ALB.
![AWS ACM - TLS Certificate Issued and Ready for ALB](/img/blog/cw-logs-o2/24-1.jpg)

### Step 2: Setup an Application Load Balancer (ALB) to Forward Traffic to OpenObserve Using Self-Signed Certificates.
To securely forward HTTPS traffic to OpenObserve, we need to set up an Application Load Balancer (ALB) using a self-signed certificate. This will enable OpenObserve to receive data over HTTPS from Kinesis Firehose.

Follow these steps to setup and configure the ALB:
1. Go to the **EC2 Dashboard** in the AWS Management Console. Under the **Load Balancing** section, click on **Load balancers**.
![AWS EC2 Console - Creating Application Load Balancer (ALB)](/img/blog/cw-logs-o2/25.jpg)
2. choose **Application Load Balancer** and click on **create**
![AWS EC2 Console - Select Application Load Balancer for Creation](/img/blog/cw-logs-o2/26.jpg)
3. Configure Load Balancer Settings
- **Name:** Provide a name for your ALB (e.g., O2-ALB).
- **Scheme:** Choose internet-facing to allow external access.
- **IP address type:** Select ipv4.
- **Listeners:** Ensure HTTPS is selected for the listener.
![AWS EC2 Console - ALB Configuration Settings](/img/blog/cw-logs-o2/27.jpg)
4. Create a Target group with name **“o2”** to route traffic to your OpenObserve EC2 instance
5. Choose the Target group **o2**.
![AWS EC2 Console - Choose Target Group for ALB](/img/blog/cw-logs-o2/28.jpg)
6. Import the self signed certificate from ACM
![AWS EC2 Console - Import Self-Signed Certificate for ALB](/img/blog/cw-logs-o2/29.jpg)
7. Now click on **Create load balancer**
![AWS EC2 Console - Create Application Load Balancer (ALB)](/img/blog/cw-logs-o2/30.jpg)
8. The Application Load Balancer (ALB) has been successfully created and is now in an active state, ready to route secure HTTPS traffic to your OpenObserve instance.
![AWS EC2 Console - ALB Created and Active](/img/blog/cw-logs-o2/31.jpg)
9. You can verify the setup by accessing the OpenObserve dashboard directly using the DNS name of the ALB in your browser. Alternatively, you can create an A record in your AWS Route 53 hosted zone to route traffic from your domain (e.g., o2.com) to the ALB for seamless access.
10. If you face an issue accessing the OpenObserve dashboard using your domain, make sure to open required ports in the security group of ALB (everywhere) to access from your browser. 
![AWS EC2 Console - OpenObserve ALB Access Verification](/img/blog/cw-logs-o2/32.jpg)
![AWS EC2 Console - ALB Security Group Settings for OpenObserve Access](/img/blog/cw-logs-o2/32-2.jpg)

## Step-by-Step Guide to Setting Up AWS CloudWatch Logs to Kinesis Firehose Pipeline
### Step 1: Sending Logs to CloudWatch Using Python
To get started, you need to send logs to CloudWatch. Below is a Python script to push sample logs to CloudWatch log group.
```
import boto3
import logging
import watchtower

# Replace with your AWS region
region_name = 'ap-south-1'

# Create a CloudWatch client if needed
cloudwatch_client = boto3.client('logs', region_name=region_name)

# Replace with your log group name
log_group = 'my-log-group'  

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add CloudWatch as a logging handler
logger.addHandler(
    watchtower.CloudWatchLogHandler(
        log_group=log_group,
        stream_name='my-log-stream',  # Replace with your log stream name
        use_queues=False  # Optional: helps with immediate log transmission
    )
)

# Log messages to CloudWatch
logger.info("This is an info log sent to CloudWatch.")
logger.warning("This is a warning log sent to CloudWatch.")
logger.error("This is an error log sent to CloudWatch.")
```
The above script sends Python log messages **(INFO, WARNING, ERROR)** to AWS CloudWatch by configuring the logging system with a CloudWatch log handler using boto3 and watchtower.

**Save the Python script:** Save the code to a Python file, e.g., cloudwatch_logging.py.

To run this code, make sure you have the required Python libraries installed and AWS credentials configured. Here's how you can do it:
**Install the required libraries:**
```
pip install boto3 watchtower
```
**Ensure AWS credentials are set up:** Make sure your AWS credentials are configured using the AWS CLI or environment variables (**AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY**).
![AWS CloudWatch Logs - Python Script for Sending Logs to CloudWatch](/img/blog/cw-logs-o2/33.jpg)
**Run the script:**
```
python cloudwatch_logging.py
```
![AWS CloudWatch Logs - Running Python Script to Send Logs](/img/blog/cw-logs-o2/34.jpg)
This will execute the script and send the log messages to AWS CloudWatch.
![AWS CloudWatch Logs - Successfully Sending Logs](/img/blog/cw-logs-o2/35.jpg)
![AWS CloudWatch Logs - Viewing Log Data](/img/blog/cw-logs-o2/36.jpg)

### Step 2: Creating a Kinesis Firehose Delivery Stream 
A Kinesis Firehose Delivery Stream is needed to stream real-time data from CloudWatch Logs to destinations like OpenObserve. It ensures reliable data delivery and backup.
Here's how to create one:
1. Go to the **Amazon Kinesis Console** and select **Create delivery stream** to begin the setup.
![AWS Kinesis Console - Creating Kinesis Firehose Delivery Stream](/img/blog/cw-logs-o2/37.jpg)
2. Select **Direct Put** as the source to receive data directly from **CloudWatch Logs** and **HTTP endpoint** as the destination to send data to your **OpenObserve endpoint**.
![AWS Kinesis Console - Configure Firehose Source and Destination](/img/blog/cw-logs-o2/38.jpg)
3. Provide a name for your delivery stream (e.g., **cloudwatch-to-o2**).
![AWS Kinesis Console - Name the Kinesis Firehose Delivery Stream](/img/blog/cw-logs-o2/39.jpg)
4. Enter the **HTTP Endpoint URL** and select **Use access key** for authentication.
![AWS Kinesis Console - Input HTTP Endpoint URL for Firehose](/img/blog/cw-logs-o2/40.jpg)
5. You can find the **HTTP Endpoint URL** and **access key** for authentication in OpenObserve under **Ingestion > Custom > Logs > Kinesis Firehose**.
![AWS Kinesis Console - Input Firehose Authentication Access Key](/img/blog/cw-logs-o2/41.jpg)
6. In the **Backup settings**, choose **Source record backup** in **Amazon S3** for either **Failed data only** or **All data**, and select an **S3 bucket**. You can browse and select an existing bucket or create a new one and select it.
7. I have created a bucket named **cwlogs-demo-bucket** for storing backup data.
![AWS Kinesis Console - Backup Data Settings for Firehose](/img/blog/cw-logs-o2/42.jpg)
![AWS Kinesis Console - Configure Batching Options for Firehose](/img/blog/cw-logs-o2/43.jpg)
8. **Configure Batching Options:** During the Firehose stream creation process, you'll see options related to data batching. Kinesis Firehose has default batching settings where data is sent either every **300 seconds** or when the batch reaches **5 MB** of data receipt, whichever comes first.
![AWS Kinesis Console - Completing Firehose Stream Setup](/img/blog/cw-logs-o2/44.jpg)
9. This is an important aspect of how Firehose handles data delivery, so make sure to configure it properly based on your use case.
10. Click **Create Firehose stream** to finish the setup.
![AWS Kinesis Console - Finalizing Kinesis Firehose Stream](/img/blog/cw-logs-o2/45.jpg)
Once completed, you will see a Firehose stream named **cloudwatch-to-o2** created.
![AWS Kinesis Console - Successfully Created Kinesis Firehose Stream](/img/blog/cw-logs-o2/46.jpg)

### Step 3: AWS Kinesis Firehose Subscription Filter Setup
To stream logs from AWS CloudWatch to Amazon Kinesis Firehose efficiently, you need to set up a subscription filter. A subscription filter allows you to define which logs are streamed and how they are delivered to the Kinesis Firehose delivery stream. Here's a detailed guide to setting up an AWS Kinesis Firehose subscription filter:
1. Navigate to **CloudWatch** in the AWS Management Console and select the **log group** you want to stream; in our case, it's **"my-log-group"**.
![AWS CloudWatch - Select Log Group for Streaming to Firehose](/img/blog/cw-logs-o2/47.jpg)
2. Click on **Actions** and select **Create subscription filter**. In the Destination section, choose **Create Amazon Data Firehose Subscription filter** 
![AWS CloudWatch - Create Subscription Filter Option](/img/blog/cw-logs-o2/48.jpg)
3. Under **Choose destination**, select **Current account** since we have previously created an Amazon Kinesis Data Firehose stream named **"cloudwatch-to-o2"** in the same account. Then, select the **cloudwatch-to-o2** stream.
![AWS CloudWatch - Choose Firehose Stream as Destination](/img/blog/cw-logs-o2/49.jpg)
4. Under **Grant permission**, we need to choose a role that allows CloudWatch Logs to send data to the Firehose stream we previously set up.
![AWS CloudWatch - Grant Permissions to Firehose Stream](/img/blog/cw-logs-o2/50.jpg)
5. To create **'CloudwatchLogsToFirehoseRole'**, go to **IAM** in the AWS Console, click **Roles**, and then Create role to set up permissions for CloudWatch Logs to send data to Firehose.
![AWS IAM - Creating 'CloudwatchLogsToFirehoseRole' for Permissions](/img/blog/cw-logs-o2/51.jpg)
6. Next, In the Select **trusted entity** section, choose **Custom trust policy**
![AWS IAM - Select Custom Trust Policy for Role](/img/blog/cw-logs-o2/52.jpg)
7. Define the **Custom Trust Policy** to allow **CloudWatch Logs** to assume the role, you need to set the Principal as **logs.amazonaws.com**
![AWS IAM - Define Custom Trust Policy for CloudWatch Logs Role](/img/blog/cw-logs-o2/53.jpg)
8. Once you've entered the trust policy, click Next: Permissions to proceed. Now, you'll need to attach the necessary permissions policies that allow CloudWatch Logs to interact with other AWS resources like Kinesis Firehose.
9. We need to grant the firehose:PutRecord permission, but for simplicity, I am attaching the AmazonKinesisFirehoseFullAccess policy.
![AWS IAM - Attach Permissions to Firehose Role](/img/blog/cw-logs-o2/54.jpg)
10. Now, name the role and click **Create role** to complete the setup.
![AWS IAM - Create the Role for Firehose Access](/img/blog/cw-logs-o2/55.jpg)
11. In **Configure log format and filters**, select **Log format: Other** since our log is plain text. Name the subscription filter **'cloudwatch-to-o2'**
![AWS CloudWatch - Configure Log Format and Filters for Subscription](/img/blog/cw-logs-o2/56.jpg)
12. Under **Test pattern**, you can choose log data and test the pattern to preview the outcome
![AWS CloudWatch - Test Log Pattern for Subscription Filter](/img/blog/cw-logs-o2/57.jpg)
13. Once you're satisfied with the outcome, click **Start streaming** to begin the process
![AWS CloudWatch - Start Streaming Logs to Firehose](/img/blog/cw-logs-o2/58.jpg)
14. you'll have successfully created the **subscription filter**.
![AWS CloudWatch - Successfully Created Subscription Filter](/img/blog/cw-logs-o2/59.jpg)

## Verify Logs in OpenObserve
As we have set up the integration between AWS CloudWatch Logs and Kinesis Firehose, it’s time to check whether the logs are successfully flowing into OpenObserve.This step is crucial to ensure that your log data is being ingested and processed correctly.

From the OpenObserve home page, we can see that logs in one stream has been ingested
![OpenObserve Dashboard - Ingested Log Stream Overview](/img/blog/cw-logs-o2/60.jpg)
Click on any record to see the details of that specific log
![OpenObserve Dashboard - Viewing Log Details](/img/blog/cw-logs-o2/61.jpg)

## Create a Simple Dashboard in OpenObserve
Now that your logs are flowing into OpenObserve, it’s time to visualize the data and make it actionable.

This dashboard visualizes log data streamed from CloudWatch to OpenObserve (CWtoO2). The histogram shows the number of log messages over the past 30 minutes, with timestamps on the X-axis and message count on the Y-axis. It helps monitor real-time log activity, detect spikes, and analyze trends for troubleshooting and performance insights.
![OpenObserve Dashboard](/img/blog/cw-logs-o2/62.jpg)

## OpenObserve vs. AWS CloudWatch

| Feature                 | OpenObserve (O2)                                                   | AWS CloudWatch                                    |
|-------------------------|---------------------------------------------------------------------|----------------------------------------------------|
| **Deployment Flexibility** | Self-hosted on-prem, edge, or cloud for low-latency              | cloud-based, AWS-centric                 |
| **Customization & Control** | Full control and customization available                        | Limited customization, AWS-bound                   |
| **Cost Efficiency**     | Open-source, cost-effective, scalable                              | Costs scale quickly with data volume               |
| **Edge Support**        | Supports true edge deployments                                     | Limited to AWS-specific edge services              |
| **Open-Source Ecosystem** | Integrates with open-source tools (e.g., Prometheus)              | Constrained to AWS integrations                    |
| **Data Ownership**      | Full data control in self-hosted setups                            | Data stored in AWS, potential privacy concerns     |
| **UI & Querying Capabilities** | Much better UI and querying capabilities                    | Standard UI and querying capabilities             |

## Conclusion
Integrating AWS CloudWatch Logs with Kinesis Firehose and OpenObserve streamlines log management by centralizing log data, enabling real-time monitoring, and providing powerful log analysis. This setup ensures quick issue detection and efficient troubleshooting.
With OpenObserve, you can visualize trends, monitor performance, and scale as your log volume grows. It makes managing logs more efficient, improving overall application health and operational insights.

