---
title: 'Monitoring AWS Cognito Logs with OpenObserve: From Raw Data to Real Insights'
seoTitle: 'Monitoring AWS Cognito Logs With Amazon Data Firehose, Eventbridge, and Lambda | OpenObserve'
description: 'Monitor AWS Cognito authentication events in real-time using OpenObserve. Learn to capture, enrich, and visualize raw logs for actionable security insights, user experience optimization, and streamlined compliance.'
img: /img/blog/aws-cognito-logs/0-aws-cognito-logs-cover.png
alt: 'Cover image for the blog post titled Monitoring AWS Cognito Logs with OpenObserve: From Raw Data to Real Insights, showcasing a technology-inspired graphic with data flow and connectivity icons.'
slug: monitor-aws-cognito-logs-firehose-eventbridge-lambda
authors: 
  - nitya
publishDate: 2025-01-18
tags:
  - AWS Cognito
  - Authentication Logs
  - Amazon EventBridge
  - AWS Lambda
  - Amazon Data Firehose
---

Ever wonder what's happening behind the scenes of your user authentication system? If you're using AWS Cognito, you're sitting on a goldmine of security insights – but only if you know how to tap into it.

Authentication logs might not sound exciting at first glance, but they tell fascinating stories about your application. Every failed login could be a user who needs help, every unusual pattern might reveal an emerging security threat, and every successful authentication adds to the tale of how users interact with your system.

In this guide, we'll explore how to capture these stories from AWS Cognito logs and transform them into meaningful insights. Whether you're investigating security incidents, optimizing user experience, or maintaining compliance, you'll learn how to build a monitoring system that helps you understand what's really happening in your authentication system.

## Architecture Overview

To effectively monitor AWS Cognito authentication events, our architecture leverages AWS EventBridge for enhanced event routing and processing. In this system:

1. AWS Cognito generates authentication events for every user interaction  
2. EventBridge captures and routes these events efficiently  
3. AWS Data Firehose (also known as Kinesis Firehose) ensures reliable data delivery and transformation  
4. Lambda transforms the raw data and enriches it with additional context  
5. OpenObserve provides visualization and alerting capabilities

Here's how the components interact:

![Architecture diagram displaying the flow of AWS Cognito authentication events through EventBridge, Kinesis Firehose, Lambda, and into OpenObserve for notifications and dashboard visualization.](/img/blog/aws-cognito-logs/00-component-diagram.png)

Here's how these components together together for effective authentication monitoring:

1. When users interact with Cognito (login, signup, password reset, etc.), Cognito generates detailed event logs.  
2. EventBridge automatically captures these events and routes them to Kinesis Firehose based on configured rules.  
3. Before delivering to OpenObserve, Firehose can use Lambda to transform and enrich the data.  
4. Finally, the processed data arrives in OpenObserve, ready for analysis and visualization.

## Understanding Cognito Authentication Events

Every time a user interacts with your authentication system, Cognito generates an event. These events contain crucial information about the authentication attempt, security context, and potential risks.

Here's an example of a typical authentication event:

```
{
    "eventType": "SignIn",
    "userPoolId": "us-east-1_xxxxx",
    "timestamp": "2024-03-15T10:30:45.123Z",
    "userIdentifier": "user@example.com",
    "sourceIp": "192.168.1.1",
    "eventResponse": "Success",
    "riskLevel": "LOW",
    "authenticationDetails": {
        "authMethod": "USER_PASSWORD_AUTH",
        "mfaType": "SMS"
    }
}
```

Let's break down the key fields:

1. **eventType:** Indicates the type of authentication action (SignIn, SignUp, ForgotPassword, etc.)  
2. **userIdentifier:** Helps track individual user patterns  
3. **sourceIp:** Enables geographic and security analysis  
4. **riskLevel:** Cognito's assessment of the authentication risk  
5. **authenticationDetails:** Contains information about how the user authenticated

Understanding these fields is crucial because they'll form the basis of our monitoring insights.

## Building an Authentication Monitoring System

### Part 1: Setting Up Test Environment

Before diving into monitoring, we need a working authentication system to monitor. We'll create a simple local testing environment that's easy to set up and verify.

#### A. Creating the Test Page

1. First, create a new directory for our project:

```
mkdir auth-monitoring-demo
cd auth-monitoring-demo
```

2. Create an *index.html* file with this content:

```
<!DOCTYPE html>
<html>
<head>
    <title>Auth Monitoring Demo</title>
    <script src="https://cdn.jsdelivr.net/npm/amazon-cognito-identity-js/dist/amazon-cognito-identity.min.js"></script>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .auth-container {
            border: 1px solid #ddd;
            padding: 30px;
            border-radius: 8px;
            margin-top: 20px;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .button { 
            padding: 12px 24px; 
            margin: 5px; 
            cursor: pointer;
            background-color: #0066cc;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            transition: background-color 0.2s;
        }
        .button:hover {
            background-color: #0052a3;
        }
        #status { 
            margin: 20px 0; 
            padding: 15px; 
            border-radius: 4px; 
            font-size: 16px;
            text-align: center;
        }
        .success { 
            background-color: #dff0d8; 
            color: #3c763d;
            border: 1px solid #d6e9c6;
        }
        .error { 
            background-color: #f2dede; 
            color: #a94442;
            border: 1px solid #ebccd1;
        }
        .info-box {
            background-color: #e8f4f8;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .config-info {
            font-family: monospace;
            background-color: #f5f5f5;
            padding: 15px;
            margin: 10px 0;
            border-radius: 4px;
            white-space: pre-wrap;
            border: 1px solid #ddd;
        }
        .auth-buttons {
            text-align: center;
            margin-top: 20px;
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <h1>Auth Monitoring Demo</h1>
    
    <div class="auth-container">
        <div class="info-box">
            <h2>AWS Cognito Authentication</h2>
            <p>Use the buttons below to test authentication flows. All authentication events will be captured for monitoring.</p>
            <div id="configSection" class="config-info hidden">
                <strong>Current Configuration:</strong>
                <pre id="configInfo"></pre>
            </div>
        </div>

        <div id="status">Not authenticated</div>
        
        <div class="auth-buttons">
            <button class="button" onclick="initiateSignIn()">Sign In with Cognito</button>
            <button class="button" onclick="signOut()">Sign Out</button>
        </div>
    </div>

    <script>
        // Function to parse full Cognito URL into domain
        function parseCognitoDomain(fullUrl) {
            const urlWithoutProtocol = fullUrl.replace(/^https?:\/\//, '');
            return urlWithoutProtocol.replace(/\/$/, '');
        }

        // Replace these values with your Cognito configuration
        const config = {
            userPoolId: 'YOUR_USER_POOL_ID',
            region: 'YOUR_REGION',
            clientId: 'YOUR_CLIENT_ID',
            cognitoDomain: parseCognitoDomain('YOUR_COGNITO_DOMAIN.auth.YOUR_REGION.amazoncognito.com')
        };

        function updateConfigDisplay(show) {
            const configSection = document.getElementById('configSection');
            if (show) {
                configSection.classList.remove('hidden');
                document.getElementById('configInfo').textContent = 
                    `User Pool ID: ${config.userPoolId}\n` +
                    `Region: ${config.region}\n` +
                    `Domain: ${config.cognitoDomain}`;
            } else {
                configSection.classList.add('hidden');
            }
        }

        // Handle the OAuth callback
        function handleCallback() {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const error = urlParams.get('error');
            
            if (code) {
                document.getElementById('status').innerHTML = 'Authentication successful!';
                document.getElementById('status').className = 'success';
                localStorage.setItem('authCode', code);
                updateConfigDisplay(true);
            } else if (error) {
                document.getElementById('status').innerHTML = 'Authentication failed!';
                document.getElementById('status').className = 'error';
                updateConfigDisplay(false);
            }
        }

        // Initiate sign-in using Cognito Hosted UI
        function initiateSignIn() {
            const redirectUri = window.location.origin;
            const cognitoUrl = `https://${config.cognitoDomain}/login?` +
                `client_id=${config.clientId}&` +
                `response_type=code&` +
                `scope=email+openid+profile&` +
                `redirect_uri=${encodeURIComponent(redirectUri)}`;
            
            window.location.href = cognitoUrl;
        }

        // Sign out
        function signOut() {
            const redirectUri = window.location.origin;
            const cognitoUrl = `https://${config.cognitoDomain}/logout?` +
                `client_id=${config.clientId}&` +
                `logout_uri=${encodeURIComponent(redirectUri)}`;
            
            localStorage.removeItem('authCode');
            updateConfigDisplay(false);
            window.location.href = cognitoUrl;
        }

        // Check authentication status on page load
        function checkAuthStatus() {
            const authCode = localStorage.getItem('authCode');
            if (authCode) {
                document.getElementById('status').innerHTML = 'Authentication successful!';
                document.getElementById('status').className = 'success';
                updateConfigDisplay(true);
            } else {
                updateConfigDisplay(false);
            }
        }

        // Initialize page
        checkAuthStatus();
        handleCallback();
    </script>
</body>
</html>
```

#### B. Set Up Your Local Server

With Python 3 installed, you can start a local server easily. In your terminal:

```
# Navigate to your project directory
cd auth-monitoring-demo

# Start the server
python -m http.server 8000
```

You should see output indicating the server is running. Keep this terminal window open while testing.

![GIF demonstrating the setup of a local HTTP server using the command python -m http.server 8000 in a Mac terminal, showcasing the terminal output and setup process.](/img/blog/aws-cognito-logs/1-run-python-command-localhost.gif)

Now, if you navigate to [http://localhost:8000/](http://localhost:8000/) on a browser, you will be able to see the authentication monitoring demo page. We will use this to simulate Cognito activity:

![Screenshot of the authentication monitoring demo page, showing buttons for signing in and signing out with AWS Cognito, along with an initial 'Not authenticated' status message.](/img/blog/aws-cognito-logs/2-auth-monitoring-demo-page.png)

### Part 2: Setting Up Amazon Cognito

Next, let's set up the authentication service by configuring Amazon Cognito:

#### A. Create User Pool

1. Navigate to the [Cognito Console](https://us-east-2.console.aws.amazon.com/cognito/v2/home?region=us-east-2)  
2. Click the "Create user pool" button  
3. Configure sign-in experience:  
   1. Application type: Select "Traditional web application"  
   2. Application name: auth-monitoring-demo  
4. Under "Configure sign-in options":  
   1. Check "Email" and "Username"  
   2. Under required attributes, select "email"  
5. For the return URL, enter "http://localhost:8000"  
6. Click "Create"

Once configured, your Cognito user pool will look like this:  
![Screenshot of the AWS Cognito console showing the details of a user pool, including the user pool name, ID, ARN, and settings for login configuration and branding.](/img/blog/aws-cognito-logs/3-cognito-user-pool.png)


#### B. Configure App Client Settings

1. In your User Pool dashboard:  
   1. Click **Applications** → **App clients** on the left-hand side menu  
   2. Find your automatically created app client under "App clients"  
   3. Click on the app client name (usually matches your user pool name)  
2. Under "Login pages" tab:  
   1. Click "Edit"  
   2. Under "Allowed callback URLs" add:  
      *http://localhost:8000*  
   3. Under "Allowed sign-out URLs" add:  
      *http://localhost:8000*  
   4. Under "OAuth grant types", select:  
      1. Authorization code grant  
      2. Implicit grant  
   5. Under "OpenID Connect scopes", select:  
      1. OpenID  
      2. Email  
      3. Profile  
   6. Click "Save changes"

![GIF demonstrating the process of configuring login pages in the AWS Cognito console, including setting allowed callback URLs and OAuth grant types for the app client.](/img/blog/aws-cognito-logs/4-login-pages-config.gif)


#### C. Collect Configuration Details

From your app client page, collect:

* **Client ID** (from App Client page)  
* **Cognito domain** (from *Branding* → *Domain*)  
* **User Pool ID** (from user pool overview page)  
* **Region** (from your AWS console)

Update your index.html config section:

```
const config = {
    userPoolId: 'us-east-2_xxxxxx',    // From User Pool Overview
    region: 'your-region',               // Your AWS region
    clientId: 'your-client-id',  // From App Client page
    cognitoDomain: 'your-prefix.auth.your-region.amazoncognito.com'  // From Domain page
};
```

#### E. Testing Your Setup

1. Start your local server:

```
python -m http.server 8000
```

2. Open your browser to [http://localhost:8000](http://localhost:8000)   
3. Click "Sign In with Cognito" \- you should see:  
   1. Redirect to Cognito hosted UI  
   2. Options to sign up or sign in  
   3. After authentication, redirect back to your local page  
4. Test these flows:  
   1. Create new account  
   2. Sign in with existing account  
   3. Sign out

If you see the success message after signing in, your authentication setup is working correctly\! You can now use this set-up to test various authentication scenarios like: correct login details, incorrect password, forgot password, create an account, etc.

![GIF showing the workflow of signing in with AWS Cognito, redirecting to the Cognito Hosted UI, and returning to the local demo application page after successful authentication.](/img/blog/aws-cognito-logs/5-login-to-auth-page.gif)

### Part 3: Building a Flexible Authentication Monitoring Pipeline

While AWS Cognito's [Plus plan](https://docs.aws.amazon.com/cognito/latest/developerguide/feature-plans-features-plus.html) offers built-in monitoring features, we can build a more flexible and cost-effective solution using AWS's event-driven architecture. This approach gives us complete control over our authentication monitoring, custom alerting capabilities, and the ability to adapt as our needs evolve. The Essentials plan is more than sufficient for our monitoring pipeline, which uses:

* EventBridge to capture Cognito authentication events  
* Kinesis Firehose for reliable delivery to OpenObserve  
* Lambda for data transformation

#### **A. Create IAM Role for AWS Services**

**Note:**   While this guide uses broad AWS-managed policies for simplicity, it's considered best practice to: 
- Create separate roles for each service (Lambda, Firehose, EventBridge) 
- Use least-privilege permissions with custom policies 
- Explicitly define required actions and resources 
- Avoid using \*FullAccess policies in production environments*

For the purposes of this demo, we'll use a simplified approach with a single role:

1. Go to [IAM Console](https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-2#/home)  
2. Click "Roles" → "Create role"  
3. Configure:  
   1. Choose "Custom trust policy" and use:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": [
                    "lambda.amazonaws.com",
                    "firehose.amazonaws.com",
                    "events.amazonaws.com"
                ]
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
```

   2. Attach these policies:  
      1. AmazonKinesisFirehoseFullAccess  
      2. AmazonEventBridgeFullAccess  
      3. AmazonS3FullAccess (for backup / failed data)  
      4. CloudWatchFullAccess (for logging)  
      5. AWSLambda\_FullAccess  
   3. **Name:** cognito-monitoring-role-demo

This single role will be used for Lambda, Firehose, and EventBridge to keep the demo straightforward.

![Screenshot of the AWS IAM console detailing the 'cognito-monitoring-role-demo' role with attached managed policies for EventBridge, Firehose, S3, Lambda, and CloudWatch access.](/img/blog/aws-cognito-logs/6-iam-role.png)

#### **B. Create the Transformer Lambda Function**

Navigate to the [AWS Lambda Console](https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/discover) and create a new Lambda function,   
**cognitoAuthLogProcessor**, to transform Cognito events into a format that's easy to analyze in OpenObserve:

```py
import json
import base64
import gzip
from datetime import datetime

def transform_record(record_data):
    """Transform the record into OpenObserve format"""
    try:
        # Parse the event data
        if isinstance(record_data, str):
            record_data = json.loads(record_data)
            
        print(f"Processing record data: {json.dumps(record_data, indent=2)}")
        
        # Extract detail from the correct location
        detail = record_data.get('detail', {})
        if isinstance(detail, str):
            try:
                detail = json.loads(detail)
            except:
                print(f"Could not parse detail as JSON: {detail}")
                detail = {}

        # Extract additional event data
        additional_event_data = {}
        if isinstance(detail, dict) and 'additionalEventData' in detail:
            try:
                if isinstance(detail['additionalEventData'], str):
                    additional_event_data = json.loads(detail['additionalEventData'])
                else:
                    additional_event_data = detail['additionalEventData']
            except Exception as e:
                print(f"Error parsing additionalEventData: {e}")

        # Create event structure matching OpenObserve format
        transformed = {
            "_timestamp": int(datetime.utcnow().timestamp() * 1000000),
            "timestamp": datetime.utcnow().isoformat(),
            "stream": "cognito_events",
            "data_time": record_data.get('time', datetime.utcnow().isoformat()),
            "data_source": record_data.get('source', 'aws.cognito-idp'),
            "data_account": record_data.get('account', ''),
            "data_region": record_data.get('region', ''),
            "data_detail_eventname": detail.get('eventName', ''),
            "data_detail_eventsource": detail.get('eventSource', ''),
            "data_detail_sourceipaddress": detail.get('sourceIPAddress', ''),
            "data_detail_eventtime": detail.get('eventTime', ''),
            "data_detail_eventtype": detail.get('eventType', ''),
            "data_detail_awsregion": detail.get('awsRegion', ''),
            "data_detail_useridentity": json.dumps(detail.get('userIdentity', {})),
            "data_detail_additionaleventdata": json.dumps(additional_event_data),
            "metadata_source": "cognito",
            "metadata_type": "auth_event"
        }
        
        print(f"Transformed record: {json.dumps(transformed, indent=2)}")
        return transformed
    except Exception as e:
        print(f"Error transforming record: {str(e)}")
        print(f"Original record_data: {json.dumps(record_data, indent=2)}")
        return None

def lambda_handler(event, context):
    print(f"Received event: {json.dumps(event, indent=2)}")
    output_records = []
    
    for record in event['records']:
        try:
            # Decode the incoming data
            data = base64.b64decode(record['data'])
            print(f"Decoded base64 data: {data}")
            
            # Handle potential GZIP compression
            try:
                data = gzip.decompress(data)
                print(f"Decompressed data: {data}")
            except:
                print("Data was not gzipped")
            
            # Ensure data is string
            if isinstance(data, bytes):
                data = data.decode('utf-8')
            
            # Parse and transform the data
            parsed_data = json.loads(data)
            print(f"Parsed data: {json.dumps(parsed_data, indent=2)}")
            
            transformed_data = transform_record(parsed_data)
            
            if transformed_data:
                # Convert to newline-delimited JSON as expected by OpenObserve
                output_data = json.dumps(transformed_data) + "\n"
                output_record = {
                    'recordId': record['recordId'],
                    'result': 'Ok',
                    'data': base64.b64encode(output_data.encode('utf-8')).decode('utf-8')
                }
                print(f"Successfully transformed record: {json.dumps(output_record)}")
            else:
                print(f"Transform returned None for record ID: {record['recordId']}")
                output_record = {
                    'recordId': record['recordId'],
                    'result': 'ProcessingFailed',
                    'data': record['data']
                }
                
        except Exception as e:
            print(f"Error processing record: {str(e)}")
            print(f"Failed record: {json.dumps(record)}")
            output_record = {
                'recordId': record['recordId'],
                'result': 'ProcessingFailed',
                'data': record['data']
            }
            
        output_records.append(output_record)
    
    result = {'records': output_records}
    print(f"Final output: {json.dumps(result, indent=2)}")
    return result
```

Set the Lambda timeout to 1 minute (or more as needed), and set the memory to 128 MB (increase if needed). Deploy the Lambda function.

Here's what the Lambda function will look like once created:

![GIF showcasing the Lambda function setup process for transforming AWS Cognito event logs, including the configuration of triggers, code view, and deployment settings.](/img/blog/aws-cognito-logs/7-lambda-function.gif)

Next, we will configure Firehose to use this Lambda function for record transformation.

#### **C. Set Up OpenObserve and Kinesis Firehose**

First, retrieve the necessary information from OpenObserve by following these steps:

1. Log in to OpenObserve:  
   * If you don't have an account, follow the [OpenObserve Quickstart Guide](https://openobserve.ai/docs/user-guide/getting-started/) to set up a free Cloud or self-hosted account.  
2. Navigate to **Ingestion** → **Custom** → **Logs** → **Kinesis Firehose**.  
3. Copy the following details:  
   * **Endpoint URL:** This is used as the destination in Kinesis Firehose.  
   * **Access Key:** Used for authentication when sending data to OpenObserve.

![GIF demonstrating the OpenObserve dashboard, highlighting steps to retrieve authentication details for integrating with AWS Kinesis Firehose.](/img/blog/aws-cognito-logs/8-o2-auth-info.gif)

Next, navigate to [Amazon Data Firehose](https://us-east-2.console.aws.amazon.com/firehose/home?region=us-east-2#/home) in the AWS Console:

1. Click "Create Firehose stream"  
2. Configure stream:  
   1. **Name:** cognito-logs-to-openobserve  
   2. **Source:** Direct PUT  
   3. **Stream:** cognito-auth-events  
   4. **Destination:** HTTP endpoint  
   5. **Endpoint URL:** OpenObserve endpoint  
      1. https://api.openobserve.ai/aws/YOUR-ORG-ID/**CUSTOM-STREAM-NAME**/\_kinesis\_firehose  
   6. **Content encoding:** GZIP  
   7. **Authentication:** Select "Use access key"  
   8. **Access key:** From OpenObserve  
   9. **Transform records:** Select "Turn on data transformation" and specify the Lambda function created above (cognitoAuthLogProcessor)  
   10. **Buffer size:** 1 MB  
   11. **Buffer interval:** 60 seconds  
   12. **S3 backup:** Create a bucket and enable for failed records  
   13. **IAM:** Use the role created in Step A above (cognito-monitoring-role-demo)

Once configured, the Firehose stream will look like this:  
![GIF showing the setup process for an Amazon Data Firehose stream named 'cognito-logs-to-openobserve,' detailing configuration steps such as enabling Lambda transformation, setting the destination as an HTTP endpoint, and defining buffer size and interval.](/img/blog/aws-cognito-logs/9-firehose-setup.gif)

#### **D. Set Up EventBridge Rule**

1. Go to [Amazon EventBridge](https://us-east-2.console.aws.amazon.com/events/home?region=us-east-2#/)  
2. Click "Create rule"  
3. Configure:  
   1. **Name:** cognito-auth-events  
   2. **Description:** Capture Cognito authentication events  
   3. **Event pattern:** Custom pattern  
4. Use this event pattern:  
   

```
{
  "source": ["aws.cognito-idp"]
}
```

5. Set target:  
   1. **Target type:** AWS service  
   2. **Select target:** Firehose stream  
   3. **Stream:** cognito-logs-to-openobserve  
   4. **Configure input:** Matched event  
   5. **Role:** cognito-monitoring-role-demo (existing role created above)

Here's what the Eventbridge rule will look like after set-up:

![GIF demonstrating the creation of an EventBridge rule named 'cognito-auth-events,' showcasing the configuration of event patterns to capture AWS Cognito authentication events and setting the target as the Firehose stream.](/img/blog/aws-cognito-logs/10-eventbridge-rule.gif)  

#### **E. Test the Pipeline**

Generate some authentication events:

1. Sign in to your application  
2. Try an incorrect password  
3. Create a new account

You should soon be able to see logs flowing into OpenObserve.

### Part 4: Building a Cognito Log Monitoring Dashboard

With logs flowing into OpenObserve, you can start analyzing them immediately. To get started:

1. Log in to [OpenObserve](https://cloud.openobserve.ai/web/) and navigate to **Logs**.  
2. Select your configured stream (e.g., cognito\_logs in this case) to view logs, run queries, and create custom dashboard visualizations:

![GIF showcasing logs flowing into OpenObserve after being ingested and processed, highlighting key statistics and analytics capabilities.](/img/blog/aws-cognito-logs/11-logs-in-o2.gif) 

Now that our authentication events are flowing into OpenObserve, let's create a comprehensive monitoring dashboard. This dashboard will help you visualize authentication patterns, detect security issues, and track user engagement.

3. Navigate to **Dashboards** to create your own custom dashboard, or [import a JSON file for a pre-built dashboard](https://github.com/openobserve/dashboards) to visualize your AWS Cognito logs:

![GIF showcasing the OpenObserve dashboard, highlighting navigation through logs, metrics, and alerts. The interface displays the total number of streams, data ingested, and active alerts, providing an overview of the monitoring setup.](/img/blog/aws-cognito-logs/12-dashboard-preview.gif)

4. Once the dashboard has been imported, you can explore and further customize it, based on your requirements. For instance, you can add additional tabs or panels for further visualization.  
5. Within OpenObserve, you can also create Alerts to remain up-to-date on key events related to your AWS Cognito authentication system. You can easily set up customized alerts sent to destinations of your choice, or create reusable alert templates.

![GIF showcasing the OpenObserve alerts interface, displaying scheduled and real-time alerts configured for monitoring AWS Cognito authentication events.](/img/blog/aws-cognito-logs/13-o2-alerts.gif)

## Transform AWS Cognito Logs into Actionable Insights

By following this guide, you've successfully set up a robust monitoring system for AWS Cognito authentication events using OpenObserve. This setup not only enhances your ability to track user interactions and detect security threats but also empowers you to optimize user experiences and maintain compliance with ease.

With your logs now streaming into OpenObserve, you can take advantage of its powerful visualization and alerting capabilities. Here are some recommended next steps to maximize the value of your monitoring system:

1. **Set Up Alerts:** Configure alerts for critical authentication events to stay informed about potential security threats or user experience issues.  
2. **Customize Dashboards:** Tailor your dashboards to focus on specific metrics or user behaviors that are most relevant to your organization.  
3. **Integrate with Other Tools:** Consider integrating OpenObserve with other AWS services or monitoring tools to create a more comprehensive observability solution.

OpenObserve's intuitive interface makes it easy to search, visualize, and act on your log data, whether you're troubleshooting issues or optimizing performance. By leveraging this guide, you've built a flexible, real-time monitoring solution that provides valuable insights into your authentication system's performance and security.

If you have any questions or need help, feel free to [join our Slack community](https://short.openobserve.ai/community) or [reach out directly](https://openobserve.ai/contactus). We're here to help you make the most of your monitoring setup\!