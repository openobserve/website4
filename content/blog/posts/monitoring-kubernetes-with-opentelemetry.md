---
title: Simplifying Kubernetes Monitoring with OpenTelemetry and OpenObserve
seoTitle: Simplifying Kubernetes Monitoring With Opentelemetry
description: Discover how Opentelemetry & OpenObserve simplifies Kubernetes monitoring. Enhance visibility, performance, and troubleshooting for your Kubernetes Enviornment.
img: /img/blog/kubernetes-monitoring/image4.png
alt: otel-kubernetes-blog
slug: monitoring-kubernetes-with-opentelemetry
authors: 
  - manas
publishDate: 2024-12-25
tags:
  - kubernetes
  - openobserve
  - metrics
  - logs
  - traces
  - opentelemetry
  - observability
  - performance
---
 
## Introduction

Kubernetes monitoring is fundamentally different from traditional monitoring approaches. In a conventional setup, the focus is often on the infrastructure level—ensuring that servers, databases, and network components are operational. However, Kubernetes abstracts much of this complexity, allowing developers to concentrate on the application level. Instead of merely checking if the application is alive, **Kubernetes monitoring** requires a comprehensive view of the entire ecosystem, including interactions between microservices, resource utilization, and overall application performance.

The dynamic nature of Kubernetes adds layers of complexity to monitoring efforts. Pods may come and go, services can scale up or down, and configurations can change frequently. This necessitates a new approach to monitoring that captures telemetry data across different layers of the Kubernetes stack. Enter **OpenTelemetry—an open-source observability framework that provides end-to-end visibility into Kubernetes environments**, enhancing our understanding of system performance, facilitating troubleshooting, and ensuring smooth application operation.

## Leveraging the OpenTelemetry Operator for Effective Monitoring

The **OpenTelemetry Operator** is a vital tool in the Kubernetes monitoring landscape. It collects telemetry data—logs, metrics, and traces—from your Kubernetes cluster by utilizing Kubernetes Custom Resource Definitions (CRDs). This operator configures the **OpenTelemetry Collector**, a versatile telemetry agent that processes and exports data to various backends, including Prometheus, Jaeger, and OpenObserve.


## OpenObserve: Your All-in-One Observability Solution

**OpenObserve** is a robust open-source observability platform designed to simplify the entire Kubernetes observability process. It encompasses all stages—collecting, processing, storing, visualizing, and analyzing telemetry data. With OpenObserve, developers can monitor and troubleshoot Kubernetes applications with minimal configuration and overhead, enabling rapid setup and deployment.

![image](/img/blog/kubernetes-monitoring/image5.png)

### Out-of-the-Box Functionality with OpenObserve Collector

A standout feature of OpenObserve is the **OpenObserve Collector**(A preconfigured otel-collector with best practices to capture all the signals), which provides out-of-the-box capabilities for gathering observability data within your Kubernetes cluster. When deployed, the collector offers a range of essential functions:

- **Metrics Collection**: Gathers metrics from your Kubernetes cluster, providing insights into performance and resource utilization.
- **Event Gathering**: Captures events occurring within the cluster, facilitating real-time monitoring and alerting.
- **Log Aggregation**: Collects logs from various sources, aiding troubleshooting and analysis.
- **Automatic Trace Capture**: Enables tracing without requiring manual instrumentation of applications, using OpenTelemetry's auto-instrumentation capabilities.

### Auto-Instrumentation for Capturing Traces

For various programming languages, you can leverage OpenTelemetry's auto-instrumentation by setting specific annotations in your pod or namespace configurations:

- **Java**: 
  ```yaml
  instrumentation.opentelemetry.io/inject-java: "openobserve-collector/openobserve-java"
  ```
- **.NET**: 
  ```yaml
  instrumentation.opentelemetry.io/inject-dotnet: "openobserve-collector/openobserve-dotnet"
  ```
- **NodeJS**: 
  ```yaml
  instrumentation.opentelemetry.io/inject-nodejs: "openobserve-collector/openobserve-nodejs"
  ```
- **Python**: 
  ```yaml
  instrumentation.opentelemetry.io/inject-python: "openobserve-collector/openobserve-python"
  ```
- **Go (Uses eBPF)**: 
  ```yaml
  instrumentation.opentelemetry.io/inject-go: "openobserve-collector/openobserve-go"
  instrumentation.opentelemetry.io/otel-go-auto-target-exe: "/path/to/container/executable"
  ```
You can find full example for auto-instrumentation [hotcommerce](https://github.com/openobserve/hotcommerce) repository.

In the following sections, we will guide you through the installation process step-by-step, ensuring that you have a fully functional monitoring setup in your Kubernetes environment. Let’s get started!

## Prerequisites

Ensure you have the following prerequisites before proceeding:

* Kubernetes cluster (e.g., Minikube, GKE, EKS)  
* Helm 3.x installed on your local machine  
* kubectl configured to communicate with your Kubernetes cluster  
* Internet connectivity to fetch required components

> You can find the below steps in the **Data sources** section as well once you log in to OpenOsberve

- ![image](/img/blog/kubernetes-monitoring/image9.png)

### Step 1: Install Cert-Manager

Cert-Manager is a tool to automate the management of TLS certificates within Kubernetes. We need it for securing communication between components:

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.1/cert-manager.yaml
```

Cert-Manager will handle the certificates and ensure secure connections between services.

### Step 2: Add the OpenObserve Helm Repository

Add the OpenObserve Helm repository to make the OpenObserve components available for installation

```bash
helm repo add openobserve https://charts.openobserve.ai
```

Helm makes it easy to deploy and manage OpenObserve components in your Kubernetes cluster.

### Step 3: Apply Prometheus Operator CRDs

The Prometheus Operator manages Kubernetes monitoring components like ServiceMonitors and PodMonitors. Apply these CustomResourceDefinitions (CRDs) to enable Kubernetes-native metrics collection:

```bash
kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_servicemonitors.yaml

kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/example/prometheus-operator-crd/monitoring.coreos.com_podmonitors.yaml
```

This step is essential for monitoring pods and services and pushing their metrics to OpenObserve.

### Step 4: Deploy the OpenTelemetry Operator

OpenTelemetry Operator is an open-source observability tool designed to collect, process, and export metrics and logs from Kubernetes:

```bash
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
```

The OpenTelemetry Operator will be responsible for collecting telemetry data (logs, metrics, and traces) from your Kubernetes cluster.

### Step 5: Create Namespace for OpenObserve Collector

To isolate the OpenObserve collector deployment, create a separate namespace

```bash
kubectl create ns openobserve-collector
```

This step helps organize resources and manage permissions more effectively.

### Step 6: Deploy OpenObserve Collector with Helm

Now, we will install the OpenObserve collector using Helm:

Copy the below command from the **Data Sources** section of OpenObserve once you login, that will provide you with prefilled `auth_token` .

```bash
helm --namespace openobserve-collector \
  install o2c openobserve/openobserve-collector \
  --set exporters."otlphttp/openobserve".endpoint=http://localhost:5080/api/default  \
  --set exporters."otlphttp/openobserve".headers.Authorization="Basic <auth_token>"  \
  --set exporters."otlphttp/openobserve_k8s_events".endpoint=http://localhost:5080/api/default  \
  --set exporters."otlphttp/openobserve_k8s_events".headers.Authorization="Basic <auth_token>"
```

This command configures the OpenObserve collector to use the **OTLP HTTP exporter** to send logs and Kubernetes events directly to the specified OpenObserve endpoint. Ensure the provided authorization token is secure and base64-encoded.

### Step 7: Verify the Setup

Once the installation is complete, check if the pods are running successfully:

```bash
kubectl get pods -n openobserve-collector
```

You should see OpenObserve Collector pods in the **Running** state. If not, inspect the logs to diagnose issues

```bash
kubectl logs -f <pod-name> -n openobserve-collector
```

## What Can You Monitor with OpenObserve Collector?

The OpenObserve (O2) Collector is your go-to tool for simplifying Kubernetes monitoring. It empowers you to keep an eye on critical aspects of your cluster, helping you ensure everything runs smoothly. Here’s what you can monitor:

| Monitoring Aspect           | Description                                                                                                                                               |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Resource Utilization**    | O2 tracks CPU, memory, and disk usage across nodes, pods, and containers. This means you can easily spot any resource bottlenecks and ensure efficient resource usage. No more guessing—get real-time insights to optimize performance and prevent overloads! |
| **Storage Insights**        | Storage health is key in Kubernetes. O2 monitors the status and capacity of your persistent volumes (PVs) and their claims (PVCs). It keeps tabs on read and write operations, ensuring your applications have the storage they need without any hiccups. |
| **Network Performance**     | O2 helps you monitor network traffic, including received and transmitted bandwidth. Understanding how data flows in and out of your pods and nodes is crucial for troubleshooting issues and maintaining smooth communication across your applications. |
| **Logging and Event Monitoring** | Logs and events are your best friends when it comes to troubleshooting. O2 captures container logs and Kubernetes events, giving you a clear view of what’s happening in your cluster. This makes it easier to diagnose problems and keep your applications running like a well-oiled machine. |


With the OpenObserve Collector, you’ll have all the insights you need to manage your Kubernetes environment effectively!

## Import Pre-Built Kubernetes Monitoring Dashboards and Get Started

Now, let’s talk about dashboards! Each pre-built dashboard offers a unified view of your Kubernetes metrics, making it super easy to monitor your cluster’s health. 

Here are a few dashboards you can check out:

- **Kubernetes Namespace (Pods) Dashboard**: Monitor the resource consumption of pods within specific namespaces.
- ![image](/img/blog/kubernetes-monitoring/image3.png)

- **Kubernetes Namespaces Dashboard**: Monitor resource allocation and usage across different namespaces.
- ![image](/img/blog/kubernetes-monitoring/image1.png)

- **Kubernetes Events Dashboard**: Display events occurring within your Kubernetes cluster along with their severity levels.
- ![image](/img/blog/kubernetes-monitoring/image7.png)

- **Kubernetes Node (Pods) Dashboard**: Monitor the performance and resource usage of          
pods running on each node.
- ![image](/img/blog/kubernetes-monitoring/image2.png)

- ![image](/img/blog/kubernetes-monitoring/image6.png)
*Logs*

- ![image](/img/blog/kubernetes-monitoring/image8.png)
*Traces*

These dashboards are designed to give you quick insights into your cluster’s performance. You can find them in our [community dashboards](https://github.com/openobserve/dashboards/tree/main/Kubernetes(openobserve-collector)) repository. Just **import them**, and you’ll be ready to dive into your Kubernetes monitoring setup!

Let’s simplify your observability stack and make Kubernetes monitoring a breeze!

## Conclusion

OpenObserve transforms the intricate process of gathering and analyzing telemetry data into a streamlined experience.

With its out-of-the-box capabilities, OpenObserve empowers developers to focus on what truly matters: building and optimizing applications. The comprehensive monitoring features—from resource utilization to logging and event tracking—provide invaluable insights, enabling teams to proactively address issues before they escalate.

While many open-source Kubernetes monitoring solutions can seem complex and daunting, OpenObserve stands out by reducing setup overhead and offering intuitive configurations that make observability accessible to all.

> Sign up for a free trial of [OpenObserve](https://auth1.openobserve.ai/ui/login/login?authRequestID=293082805590667592). Want to self-host or contribute? Check out our [GitHub repository](https://github.com/openobserve/openobserve) to explore self-hosting options and help grow the community.

Happy Monitoring! 🚀