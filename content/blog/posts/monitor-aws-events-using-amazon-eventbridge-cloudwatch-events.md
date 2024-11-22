---
title: 'How to Monitor AWS Events Using Amazon EventBridge (CloudWatch Events)'
seoTitle: 'Monitor AWS EC2 Logs and Metrics with OpenTelemetry | OpenObserve'
description: Discover how to monitor AWS events using Amazon EventBridge and OpenObserve. Learn to set up a real-time event pipeline, simulate events, and create powerful visualizations for cloud environments.
img: /img/blog/cloudwatch-events-eventbridge/image9.png
alt: Isometric illustration showing cloud monitoring interface with OpenObserve logo and text "How to Monitor AWS Events with EventBridge"
slug: monitor-aws-events-using-amazon-eventbridge-cloudwatch-events
authors: 
  - nitya
publishDate: 2024-11-22
tags:
  - Amazon EventBridge
  - CloudWatch Events
  - AWS Event Monitoring
  - Event-Driven Architecture
  - AWS Monitoring
  - Kinesis Firehose
---

Cloud environments generate a constant stream of events, from EC2 instance state changes to S3 object uploads, partner application logs, and more. Monitoring and analyzing these events in real-time is critical for maintaining operational efficiency, ensuring security, and optimizing performance. [Amazon EventBridge](https://aws.amazon.com/eventbridge/)—the latest and greatest iteration of [Amazon CloudWatch Events](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cwe-now-eb.html)—offers a powerful event bus that captures these events and routes them to any designated target of your choice.

Amazon EventBridge truly simplifies event-driven architectures by offering:

* **Real-time Monitoring:** Capture state changes as they happen across AWS services.  
* **Centralized Handling:** Aggregate events from multiple AWS services or third-party SaaS applications into a single event bus.  
* **Scalability:** Automatically scales with your event volume.  
* **Advanced Filtering:** Apply rules to filter only the events you care about before routing them to targets like Kinesis Firehose.

Eventbridge is obviously great for *capturing* events. However, it lacks the advanced querying and visualization capabilities needed for deeper insights. That’s where integrating Eventbridge with OpenObserve comes in. In this guide, we’ll demonstrate how to:

* Simulate AWS service and partner application events using Python.  
* Configure Amazon EventBridge to capture these events.  
* Stream the events to OpenObserve via Kinesis Firehose.  
* Visualize and analyze the event data in OpenObserve.

![Architectural diagram showing data flow from AWS services through EventBridge and Kinesis Data Firehose to OpenObserve with connecting arrows and service icons](/img/blog/cloudwatch-events-eventbridge/image8.gif) 

By the end of this guide, you’ll have a fully functional pipeline that enables real-time monitoring of AWS events, whether they originate from AWS services or [Eventbridge partners](https://aws.amazon.com/eventbridge/integrations/).

## Step 1: Retrieve Your OpenObserve HTTP Endpoint & Access Key

Before setting up your Kinesis Firehose stream, you'll need your OpenObserve HTTP endpoint and access key.

1. Log in to your OpenObserve account. If you don’t have an account, you can follow the [OpenObserve Quickstart Guide](https://openobserve.ai/docs/quickstart/) to quickly set up a free Cloud or Self-Hosted account.  
2. Once logged in to the OpenObserve dashboard, navigate to **Ingestion** → **Custom** → **Logs** → **Kinesis Firehose**.  
3. Copy your unique endpoint and access key (these will come in handy later\!):

![GIF showing the OpenObserve dashboard, highlighting steps to retrieve authentication details for Kinesis Firehose setup.](/img/blog/cloudwatch-events-eventbridge/image3.gif) 

Now that you have these details ready, we can proceed with setting up the AWS pipeline.

## Step 2: Set Up IAM Role for Kinesis Firehose and EventBridge

For simplicity’s sake, we will create a single IAM role for both Kinesis Firehose and EventBridge privileges.

1. Go to the [IAM Console](https://console.aws.amazon.com/iam/).  
2. Click on Roles, then click **Create role**.  
3. Under "Trusted entity type," select **AWS service**.  
4. Choose **Kinesis** → **Kinesis Firehose** as the service that will use this role.  
5. Click Next, then attach the following policies:  
   * **AmazonKinesisFirehoseFullAccess**  
   * **AmazonEventBridgeFullAccess**  
   * **AmazonS3FullAccess** (for backup purposes)  
6. Click **Next**, then name the role (e.g., O2TestKinesisEventbridgeRole).  
7. Review the settings and click **Create role**.

![AWS IAM console screenshot showing IAM roles including EventBridge and Kinesis Firehose service roles with their trusted entities and activity timestamps](/img/blog/cloudwatch-events-eventbridge/image7.gif) 

This role will allow Kinesis Firehose to send data to OpenObserve and store failed records in S3 if needed.

## Step 3: Create a Kinesis Firehose Stream

Next, we’ll create a Kinesis Firehose delivery stream that will send event data directly into OpenObserve:

1. Navigate to the [Kinesis Console](https://console.aws.amazon.com/firehose/).  
2. Click on **Create Firehose stream**.  
3. Enter a name for your stream (e.g., O2FireHoseDeliveryStream).  
4. For source, select **Direct PUT** or other sources.  
5. For destination, choose **HTTP Endpoint**, then enter your previously retrieved OpenObserve endpoint URL.  
6. In the authentication section, paste your base64-encoded access key from Step 1\.  
7. Under **Backup settings**, choose an existing S3 bucket or create a new one (e.g., firehose-backup-bucket-demo) to store failed records.  
8. Click **Create delivery stream**.  
   
![Amazon Data Firehose interface showcasing real-time streaming delivery setup, including 'Create Firehose Stream' button and pricing details.](/img/blog/cloudwatch-events-eventbridge/image5.gif) 

This stream will help Eventbridge communicate with OpenObserve to ensure your event data is collected in the right place.

## Step 4: Configure EventBridge Rule

Now we'll set up an EventBridge rule to capture events and forward them to our Kinesis Firehose stream:

1. Navigate to the [EventBridge Console](https://console.aws.amazon.com/events/).  
2. Click **Create rule**.  
3. Enter a name for your rule (e.g., CaptureAllEventsRule).  
4. For the event pattern, use the following JSON to capture all events from our simulators:

```
{
"source": [{
"prefix": "com.mycompany."
}]
}
```

5. Select the target as **AWS Service** → **Firehose Stream** and choose the delivery stream we created earlier (e.g., O2FireHoseDeliveryStream).  
6. Select the IAM role we created earlier (e.g., O2TestKinesisEventbridgeRole).  
7. Click **Create**.

![Amazon EventBridge interface highlighting serverless event-driven applications, including 'Create Rule' option and developer resources menu.](/img/blog/cloudwatch-events-eventbridge/image2.gif) 

Using this same process, you can create any number of specific rules for monitoring events related to particular AWS services and [Eventbridge Partners](https://aws.amazon.com/eventbridge/integrations/). You can use a custom event pattern using the JSON editor, as demonstrated in this guide, or select a template provided by Eventbridge to create an event pattern for a wide variety of AWS services and Eventbridge partners:

![Amazon EventBridge 'Create Rule' interface at the 'Build event pattern' step, showing event source selection and sample event configuration for AWS service and Eventbridge partner integrations.](/img/blog/cloudwatch-events-eventbridge/image1.gif) 

## Step 5: Simulate Events Using Python

Now that we have set up our data pipeline using Kinesis Firehose and Eventbridge, we are ready to test it using some simulated data. This Python script will simulate both AWS service state changes and authentication events from an Eventbridge partner application.

1. First, let's set up our Python environment. We'll use a virtual environment to keep our dependencies isolated:

```
python -m venv eventbridge-env
source eventbridge-env/bin/activate 

# On Windows, use: eventbridge-env\Scripts\activate
```

2. Next, install dependencies (as needed) like the following:  
   

```
pip install boto3
```

3. Now create a new file called “simulate\_events.py”:

```py
import boto3
import json
import uuid
import random
from datetime import datetime, UTC
from time import sleep

# Replace with your AWS region
AWS_REGION = 'us-east-1'

# Initialize the EventBridge client with credentials
eventbridge_client = boto3.client(
   'events',
   region_name=AWS_REGION,
   aws_access_key_id='ADD_ACCESS_KEY_ID',
   aws_secret_access_key='ADD_SECRET_ACCESS_KEY'
)

# Function to generate a simulated EC2 state change event
def generate_ec2_state_event():
   states = ['pending', 'running', 'stopping', 'stopped', 'terminated']
   return {
       "version": "0",
       "id": str(uuid.uuid4()),
       "detail-type": "EC2 Instance State-change Notification",
       "source": "com.mycompany.ec2simulator",
       "account": "650251697662",
       "time": datetime.now(UTC).isoformat(),
       "region": AWS_REGION,
       "resources": [
           f"arn:aws:ec2:us-east-1:650251697662:instance/i-{uuid.uuid4().hex[:12]}"
       ],
       "detail": {
           "instance-id": f"i-{uuid.uuid4().hex[:12]}",
           "state": random.choice(states)
       }
   }

# Function to generate a simulated partner application event
def generate_partner_event():
   event_types = ['user.login', 'user.logout', 'user.failed_login', 'user.password_change']
   return {
       "version": "0",
       "id": str(uuid.uuid4()),
       "detail-type": "Authentication Activity",
       "source": "com.mycompany.authsimulator",
       "account": "650251697662",
       "time": datetime.now(UTC).isoformat(),
       "region": AWS_REGION,
       "resources": [],
       "detail": {
           "eventType": f"{random.choice(event_types)}-{uuid.uuid4().hex[:6]}",
           "userId": f"user-{uuid.uuid4().hex[:6]}",
           "ipAddress": f"192.168.{random.randint(1,255)}.{random.randint(1,255)}",
           "userAgent": f"Mozilla/5.0 ({uuid.uuid4().hex})"
       }
   }

# Function to send an event to EventBridge
def send_event(event):
   print(f"Sending event with source: {event['source']}")
   print(f"Full event: {json.dumps(event, indent=2)}")
   response = eventbridge_client.put_events(
       Entries=[
           {
               'Source': event['source'],
               'DetailType': event['detail-type'],
               'Detail': json.dumps(event['detail']),
               'EventBusName': 'default',
               'Time': datetime.now(UTC),
               'Resources': event['resources']
           }
       ]
   )
  
   # Enhanced error checking
   if response.get('FailedEntryCount', 0) > 0:
       print(f"Failed to send event: {response['Entries']}")
   else:
       print(f"Successfully sent event. Response: {json.dumps(response, indent=2)}")

# Function to send multiple events in bulk
def send_events_in_bulk(event_generator, count, delay=0.1):
   for _ in range(count):
       event = event_generator()
       send_event(event)
       sleep(delay)  # Add small delay to avoid throttling

# Main function to simulate sending multiple types of events
if __name__ == "__main__":
   # Generate 50 events of each type
   print("Generating EC2 events...")
   send_events_in_bulk(generate_ec2_state_event, 50)
  
   print("Generating Authentication events...")
   send_events_in_bulk(generate_partner_event, 50)
```

**Key aspects of this script:**

* Generates realistic EC2 state change notifications with random instance IDs and states  
* Simulates authentication events with randomized user IDs and IP addresses  
* Includes proper error handling and logging  
* Uses bulk sending capabilities to simulate high-volume scenarios

4. Finally, run the script:

![Python script execution for sending an event to Amazon EventBridge, displaying the code, console output, and successful event response details.](/img/blog/cloudwatch-events-eventbridge/image4.gif) 

## Step 6: Visualize Events in OpenObserve

Once events start flowing through your pipeline, you can create powerful visualizations in OpenObserve:

1. Log into your [OpenObserve dashboard](https://cloud.openobserve.ai/).  
2. Navigate to the **Logs** tab.

Your event data will now appear in real-time within OpenObserve. Here, you can analyze the data (real-time or historical) and create powerful visualizations for continuous monitoring of your AWS Service or Eventbridge Partner events.  

![OpenObserve dashboard displaying metrics for streams, query functions, and scheduled alerts, including ingested size and real-time alerts.](/img/blog/cloudwatch-events-eventbridge/image6.gif) 

## Troubleshooting Tips

If you're having trouble seeing your events in OpenObserve:

1. Check the Kinesis Firehose monitoring tab for delivery errors  
2. Verify EventBridge rule metrics to ensure events are being captured  
3. Confirm your OpenObserve credentials are correctly configured in Firehose  
4. Check the S3 backup bucket for failed deliveries

You can modify this pipeline as needed to monitor events from any AWS Service or Eventbridge Partner. For instance, you can easily [send Okta logs to OpenObserve](https://openobserve.ai/blog/send-okta-logs-to-openobserve) using the same architecture we leveraged in this guide. The combination of Kinesis Firehose, Eventbridge, and OpenObserve is quite powerful and can be seamlessly scaled.

## Keep a Close Eye on Your AWS Events

You now have a robust event monitoring pipeline that combines the power of EventBridge's event routing with OpenObserve's advanced analytics capabilities. This setup enables you to capture and analyze events in real-time, as well as create comprehensive dashboards for monitoring.

What’s next? You could add more event sources, implement custom event transformations, or set up automated responses to specific event patterns:

* Implementing custom event patterns for your specific use cases  
* Setting up alerts based on event thresholds  
* Creating custom visualizations for different stakeholders

The possibilities for extension are endless. Explore our other posts on [how OpenObserve can enhance your observability strategy](https://openobserve.ai/blog), and reach out if you have any questions\!