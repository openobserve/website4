---
title: "How to Monitor Jenkins Pipelines with OpenTelemetry and OpenObserve"
seoTitle: "How to Monitor Jenkins Pipelines with OpenTelemetry and OpenObserve"
description: Learn how to monitor Jenkins pipelines effectively with this comprehensive guide on integrating OpenTelemetry and OpenObserve. Discover step-by-step instructions for capturing Jenkins logs, metrics, and traces to enhance CI/CD observability and optimize pipeline performance.
img: /img/blog/monitor-jenkins-with-otel-o2/image1.gif
alt: monitor-jenkins-with-opentelemetry-and-openobserve
slug: monitor-jenkins-with-opentelemetry-and-openobserve
authors: 
  - chaitanya
publishDate: 2024-11-10
tags:
  - Jenkins
  - Logging
  - OpenTelemetry
  - Monitoring
  - Infrastructure
  - Observability
  - Troubleshooting
  - Auditing
  - Compliance
  - CICD pipeline
---
 
Effective monitoring of Jenkins pipelines is crucial for maintaining reliable software delivery, identifying bottlenecks, and ensuring that each step in your CI/CD pipeline runs smoothly. OpenTelemetry and OpenObserve provide a powerful combination for tracking Jenkins logs, metrics, and traces in real-time. This guide will walk you through setting up Jenkins with OpenTelemetry to visualize key metrics and improve your pipeline observability using OpenObserve.
## Why Monitor Jenkins Pipelines?

Jenkins is a popular open source platform for automating software build, test, and deployment workflows, but out-of-the-box monitoring capabilities can be limited. By integrating OpenTelemetry into Jenkins, you can gain insights into each stage of your pipeline, identify performance bottlenecks, and troubleshoot issues with ease. OpenObserve offers a simple and scalable solution for viewing these metrics, logs, and traces.

### Prerequisites

* Jenkins installed on your system.  
* OpenObserve account for data ingestion and visualization.

### Step 1: Installing the OpenTelemetry Plugin in Jenkins

To start capturing Jenkins pipeline data, install the OpenTelemetry (OTel) plugin:

![otel plugin](/img/blog/monitor-jenkins-with-otel-o2/image13.png)

1. Navigate to **Jenkins Dashboard \> Manage Jenkins \> Manage Plugins**.  
2. Under **Available Plugins**, search for **OpenTelemetry**.  
3. Select and install the plugin, then restart Jenkins if prompted.

Once installed, the OpenTelemetry plugin enables capturing metrics, traces, and logs, which you’ll configure to send to OpenObserve.

### Step 2: Configuring OpenTelemetry with OpenObserve

Setting up the OTLP Endpoint in Jenkins

1. In **Manage Jenkins \> Configure System**, locate the **OpenTelemetry** section.  
   1. ![otel endpoint](/img/blog/monitor-jenkins-with-otel-o2/image4.png)  
2. Under **OTLP Endpoint**, enter your OpenObserve endpoint. For example:

```
https://<O2_HOST>/api/<O2_ORGNAME>
```

3. Select **Header Authentication** and enter your OpenObserve credentials.  
   1. ![header auth otel](/img/blog/monitor-jenkins-with-otel-o2/image2.png)  
   2. Ensure you add the entire token that is captured from OpenObserve in the Header Value.

```
Basic <token>
```

#### **Adding Configuration Properties**

In the **Advanced** settings of the OpenTelemetry configuration, add the following properties under **Configuration properties** to define your logging and tracing setup:

![otel advanced config](/img/blog/monitor-jenkins-with-otel-o2/image7.png)

```
otel.exporter.otlp.protocol=http/protobuf
otel.exporter.otlp.headers=organization=prometheus-demo,stream-name=default
otel.logs.exporter=otlp
```

You can also refer to the [documentation](https://opentelemetry.io/docs/specs/otel/protocol/exporter/) that can help you customize the SDK even further. 

#### **Configuring Observability Backend URLs**

![observability backend](/img/blog/monitor-jenkins-with-otel-o2/image10.jpeg)

1. Under **Visualization Backend** in OpenTelemetry settings, select **Custom Observability Backend**.  
2. For **Trace Visualization URL Template** and **Metrics Visualization URL Template**, add your OpenObserve URLs:  
   * Trace: `https://<O2_HOST>/traces`  
   * Metrics: `https://<O2_HOST>/metrics`

This setup allows Jenkins users to view pipeline logs and metrics by simply clicking a link in the Jenkins job panel, which redirects them to the relevant OpenObserve visualizations.

### **Step 3: Creating a Sample Jenkins Pipeline**

Create a pipeline to generate test data, logs, and metrics to ensure OpenObserve can capture and display your Jenkins pipeline data.

1. Go to **New Item** in Jenkins, name it “Test Pipeline,” and select **Pipeline**.  
   1. ![jenkins item](/img/blog/monitor-jenkins-with-otel-o2/image3.png)  
2. In the **Pipeline script** section, paste the following code  
   1. ![pipeline script](/img/blog/monitor-jenkins-with-otel-o2/image6.png)

```
pipeline {
    agent any

    stages {
        stage('Prepare') {
            steps {
                echo 'Preparing environment...'
                sleep 1
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the project...'
                sleep 2
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    int totalTests = 10
                    int failedTests = 2
                    echo "Total tests: ${totalTests}"
                    echo "Failed tests: ${failedTests}"
                    if (failedTests > 0) {
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying to staging...'
                sleep 1
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        unstable {
            echo 'Pipeline completed with some test failures.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
```

This pipeline includes stages for **Prepare**, **Build**, **Test**, and **Deploy**, generating different types of logs, metrics, and statuses. Run this pipeline to create activity that will be captured by OpenTelemetry and sent to OpenObserve.

### **Step 4: Importing Dashboards in OpenObserve**

To visualize Jenkins metrics efficiently, import a pre-configured dashboard JSON file for Jenkins monitoring. This JSON file, available for download [here](https://github.com/openobserve/dashboards/blob/main/Jenkins/jenkins.dashboard.json), includes panels for key metrics like pipeline duration, test results, and errors.

#### **How to Import the Dashboard**

![o2 dashboard](/img/blog/monitor-jenkins-with-otel-o2/image12.png)

1. Download the JSON file from the provided [link](https://github.com/openobserve/dashboards/blob/main/Jenkins/jenkins.dashboard.json).  
2. In OpenObserve, navigate to **Dashboards** and select **Import Dashboard**.  
3. Upload the JSON file and customize the panels as needed.

This dashboard offers a complete view of Jenkins pipeline activity, making it easy to monitor builds and troubleshoot issues.

![dashboard o2](/img/blog/monitor-jenkins-with-otel-o2/image5.png)
![dashboard o2](/img/blog/monitor-jenkins-with-otel-o2/image8.png)
![dashboard o2](/img/blog/monitor-jenkins-with-otel-o2/image9.png)
![dashboard o2](/img/blog/monitor-jenkins-with-otel-o2/image11.png)

### **Step 5: Viewing Pipelines with Custom Observability Backend in Jenkins**

![jenkins observability](/img/blog/monitor-jenkins-with-otel-o2/observability.gif)

With OpenObserve URLs configured as your **Custom Observability Backend** in Jenkins, you can easily view logs and metrics by simply clicking on the observability link provided in the job panel. This feature allows anyone monitoring the Jenkins job to quickly access logs and traces directly in OpenObserve without navigating away from the Jenkins interface.

### **Benefits of Monitoring Jenkins with OpenTelemetry and OpenObserve**

With the OpenTelemetry and OpenObserve integration, you gain several key benefits:

1. **Improved Troubleshooting**: Quickly identify and resolve issues within pipeline stages by analyzing logs, metrics, and traces.  
2. **Performance Optimization**: Track pipeline durations and other metrics to improve performance over time.  
3. **Real-time Observability**: Monitor your pipelines as they run, ensuring that every build meets performance and reliability standards.

### **Unlock Jenkins Observability with OpenObserve**

Setting up Jenkins with OpenTelemetry and OpenObserve gives you a powerful way to monitor your CI/CD pipelines in real-time, making it easier to detect issues and optimize performance. By following this guide, you’ll have a comprehensive observability solution for tracking your Jenkins pipelines, logs, and metrics.

For teams using Jenkins for large-scale builds and deployments, monitoring is essential. OpenTelemetry and OpenObserve together provide a scalable solution to ensure your pipelines are reliable, optimized, and transparent.

[Sign up for OpenObserve](https://cloud.openobserve.ai/) to track logs, metrics, and traces across your pipelines with ease.