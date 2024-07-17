---
title: Monitoring Kubernetes Cluster using OpenTelemetry Components
seoTitle: Monitoring Kubernetes Cluster using OpenTelemetry Components
description: K8s Cluster Receiver is instrumental in aggregating cluster-level
  metrics and events for efficient Kubernetes monitoring.
img: /img/resources/k8s-cluster-receiver-image1.png
alt: K8s Cluster Receiver
slug: k8s-cluster-receiver-monitoring
authors:
  - openobserve-team
publishDate: 2024-07-18
tags:
  - K8s Cluster Receiver
  - OpenTelemetry
  - Kubernetes monitoring
  - telemetry data
  - cluster-level metrics
---
<h2><strong>Introduction to Kubernetes Monitoring with OpenTelemetry</strong></h2>

<p>
How do you keep an eye on an ever-growing digital landscape without losing sight of what matters? Kubernetes has changed the way we deploy and manage containerized applications and set a new bar for efficiency and scalability. But with great power comes great responsibility in the form of ‘monitoring’. As your clusters grow, monitoring everything on it can get overwhelming and hard to aggregate. That’s where the K8s Cluster Receiver comes in as a way to aggregate all the important cluster-level metrics and events. By using OpenTelemetry you can standardize your telemetry data collection and see the full picture of how your cluster is running in real-time for both efficiency and correctness.
</p>
<h2><strong>What is OpenTelemetry?</strong></h2>

<h3><strong>Definition and Goals</strong></h3>

<p>
OpenTelemetry is an open-source tool for producing and combining telemetry (metrics, logs, and traces) across diverse technologies and platforms, <a href="https://openobserve.ai/blog/launching-openobserve">making observability simple </a>to integrate and deploy.
</p>
<h3><strong>Components of OpenTelemetry</strong></h3>

<p>
OpenTelemetry has the following components:
</p>
<ul>

<li>APIs: Instrumentation interfaces

<li>SDKs: Telemetry data collectors

<li>Libraries: Instrumentation for specific languages

<li>Integrations: Built-in components for common libraries and frameworks
</li>
</ul>
<h3><strong>What is an OpenTelemetry Collector</strong></h3>

<p>
This component facilitates the exporting, processing, and aggregating of telemetry data and offers extreme flexibility and compatibility in different operational modes.
</p>
<p>
Now that you have a good grasp on what OpenTelemetry is and its components, let’s move on to getting it up and running in your Kubernetes cluster.
</p>
<h2><strong>Installing and Configuring OpenTelemetry to Monitor a Kubernetes Cluster</strong></h2>

<h3><strong>Requirements</strong></h3>

<p>
To install OpenTelemetry on a Kubernetes cluster, you should already have:
</p>
<ul>

<li>Kubernetes cluster running

<li>Kubectl (command-line tool for Kubernetes operations) configured for your cluster

<li>Helm (package manager for Kubernetes) installed
</li>
</ul>
<h3><strong>Installing and Configuring OpenTelemetry Collector</strong></h3>

<p>
The OpenTelemetry Collector can be installed with <a href="https://openobserve.ai/blog/grafana-helm-chart">Helm charts</a>. The following example simplifies the installation procedure:
</p>

<pre class="prettyprint">helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts helm install my-opentelemetry-collector open-telemetry/opentelemetry-collector</pre>

<h3><strong>Daemonset vs. Deployment Installations</strong></h3>

<ul>

<li>Daemonset: Runs a collector on each node in the cluster. This should be used if you want to collect data from each node in the cluster.

<li>Deployment: Runs a user-defined amount of collectors. This should be used if you want to aggregate data from the collectors on a cluster level.
</li>
</ul>
<p>
 Now that you know how to install the OpenTelemetry Collector, let's dive into some key components that will boost your Kubernetes monitoring.
</p>
<h2><strong>Main OpenTelemetry for Kubernetes Components</strong>


![Main OpenTelemetry for Kubernetes Components](/img/resources/k8s-cluster-receiver-image2.jpg "Main OpenTelemetry for Kubernetes Components")


<strong> </strong></h2>

<h3><strong>1. Kubernetes Attributes Processor</strong></h3>

<p>
The Kubernetes Attributes Processor adds Kubernetes-related metadata to the telemetry data, like pod name, pod namespace, pod labels, etc. This provides better context to the data collected for later analysis.
</p>
<h3><strong>2. Kubeletstats Receiver:</strong></h3>

<p>
The Kubeletstats Receiver can be thought of as a postman gathering useful stats from the Kubelet API server. The Kubelet is a component of every node in a Kubernetes cluster and it manages pods and containers. This receiver collects useful metrics regarding CPU utilization, memory usage, etc. directly from the Kubelet. In essence, the Kubeletstats receiver “delivers'' a health report for each of your cluster nodes so that you are aware of how each node is performing.
</p>
<h3><strong>3. Kubernetes Cluster Receiver</strong></h3>

<p>
The K8s Cluster Receiver is where cluster-level metrics and events are aggregated. It collects node status, pod conditions, and cluster events so you can see the overall health of the cluster. Use the K8s Cluster Receiver to get visibility into your cluster and fix issues before they turn into bigger problems.
</p>
<h3><strong>4. Kubernetes Objects Receiver</strong></h3>

<p>
This receiver collects Kubernetes objects from the API server so you can see the state and changes of Kubernetes resources like deployments, services, and configuration maps.
</p>
<h3><strong>5. Prometheus Receiver</strong></h3>

<p>
Prometheus Receiver supports the <a href="https://openobserve.ai/docs/ingestion/metrics/prometheus">Prometheus metrics</a> format so you can ingest metrics from applications already instrumented with Prometheus.
</p>
<h3><strong>6. Host Metrics Receiver</strong></h3>

<p>
This component scrapes machine-level metrics from nodes so you can see the full system view of resource usage and performance.
</p>
<h3><strong>7. Filelog Receiver</strong></h3>

<p>
Filelog Receiver efficiently tails and parses log files so you can monitor and analyze your application logs.
</p>
<p>
Ready to put it all together? Let's get those OpenTelemetry components deployed and configured.
</p>
<h2><strong>Deploying and Configuring OpenTelemetry Components</strong></h2>

<h3><strong>Deployment Guide</strong></h3>

<p>
Deploying the OpenTelemetry Collector involves setting up either Daemonset or Deployment instances based on your monitoring needs. Here’s an example configuration for deploying a Daemonset:
</p>

<pre class="prettyprint">apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: otel-collector
spec:
  selector:
    matchLabels:
      app: otel-collector
  template:
    metadata:
      labels:
        app: otel-collector
    spec:
      containers:
      - name: otel-collector
        image: otel/opentelemetry-collector:latest
        ports:
        - containerPort: 55680
          protocol: TCP
        volumeMounts:
        - mountPath: /etc/otel
          name: otel-config
      volumes:
      - name: otel-config
        configMap:
          name: otel-config</pre>

<h3><strong>Configuring Key Components</strong></h3>

<h4><strong>Kubernetes Attributes Processor:</strong></h4>

<pre class="prettyprint">processors:
  k8sattributes:
    auth_type: serviceAccount
</pre>

<p>
<strong>Kubeletstats Receiver:</strong>
</p>

<pre class="prettyprint">receivers:
  kubeletstats:
    endpoint: "https://${KUBELET_HOST}:10250"
    auth_type: "kubeConfig"
</pre>

<h3><strong>Best Practices for Kubernetes RBAC</strong></h3>

<p>
To collect data securely, configure Kubernetes Role-Based Access Control (RBAC) policies. Define roles and bindings that give OpenTelemetry components the required permissions without over-permission.
</p>

<pre class="prettyprint">apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: otel-collector-role
rules:
- apiGroups: [""]
  resources: ["nodes", "pods"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: otel-collector-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: otel-collector-role
subjects:
- kind: ServiceAccount
  name: otel-collector
  namespace: default</pre>

<h3><strong>Creating manifest files</strong></h3>

<p>
Manifests are required to deploy OpenTelemetry components in your cluster. Manifests define what you want your applications and resources to be. Here’s a manifest for the OpenTelemetry Collector as a Deployment:
</p>

<pre class="prettyprint">apiVersion: apps/v1
kind: Deployment
metadata:
  name: otel-collector
spec:
  replicas: 3
  selector:
    matchLabels:
      app: otel-collector
  template:
    metadata:
      labels:
        app: otel-collector
    spec:
      containers:
      - name: otel-collector
        image: otel/opentelemetry-collector:latest
        ports:
        - containerPort: 55680
          protocol: TCP
        volumeMounts:
        - mountPath: /etc/otel
          name: otel-config
      volumes:
      - name: otel-config
        configMap:
          name: otel-config</pre>

<p>
Great job getting everything set up! Now, let's turn to how you can monitor your cluster's performance and health in real time.
</p>
<h2><strong>Monitoring Cluster Performance and Health</strong>


![Monitoring Cluster Performance and Health](/img/resources/k8s-cluster-receiver-image3.jpg "Monitoring Cluster Performance and Health")


</h2>

<h3><strong>SigNoz Dashboard </strong></h3>

SigNoz has a very simple dashboard for visual monitoring and alerting. It integrates with OpenTelemetry to show real-time cluster performance, node conditions, pod phases, and container restarts.</h3>

<h3><strong>Collecting and analyzing metrics </strong></h3>

<h3>Collect metrics for node conditions, pod phases, and container restarts to gauge your cluster health. This data can be used to find patterns and predict problems.</h3>

<p>
Check out ‘<a href="https://openobserve.ai/blog/prometheus-apm">Using Prometheus APM Tools for Asset Performance Management</a>’ from OpenObserve for reference.
</p>
<h3><strong>How to Create Dashboards for Monitoring the Kubernetes Cluster?</strong></h3>

<p>
Dashboards are essential for monitoring Kubernetes clusters as they provide a human-readable way to interpret the metrics. With OpenTelemetry metrics, traces, and logs, setting up a dashboard is a guided process. Here’s how you can set up dashboards:
</p>
<ol>

<li>Scope: Start by deciding what metrics you need. Common metrics are CPU usage, memory usage, and I/O operations.

<li>Use Templates: You can use dashboard templates that can be customized as per your needs.

<li>Alerts: Make sure your dashboards show current metrics and also forecast potential issues using predictive analysis. Set up alerts for abnormal patterns or when thresholds are crossed.

<li>Regular Updates: As your cluster changes, so should your dashboards. Update your setups as per the changing needs and metrics of your Kubernetes cluster.
</li>
</ol>
<p>
By following these steps you can make sure your Kubernetes monitoring dashboard is complete and up-to-date which is essential for cluster health and performance.
</p>
<h2><strong>Advanced Monitoring Techniques</strong></h2>

<ol>

<li><strong>Enhancing Telemetry Data</strong>
</li>

<p>
Use OpenTelemetry Processors to pull in telemetry data and add context so you can get better insights.
</p>


<li><strong>Authentication and Security</strong>

<p>
Secure the Kubernetes API for telemetry by adding authenticating and encrypting data in transit.
</p>


<li><strong>Configure OpenTelemetry</strong>

<p>
Customize OpenTelemetry to your monitoring needs. This might mean tweaking sampling rates, defining custom metrics, and adding in extra receivers and processors.
</p></ol>
<h2><strong>So, what do we do next?</strong></h2>

<p>
Using OpenTelemetry for Kubernetes cluster monitoring has many benefits, including visibility, resource utilization, and proactive issue resolution. For more information check out the OpenTelemetry and Kubernetes documentation and try out some additional configurations and advanced components of the <a href="https://discuss.openobserve.ai/t/configuring-opentelemetry-collector-with-openobserve/2Ka7f9">OpenTelemetry Collector</a> to tune your monitoring.
</p>
<p>
By using the K8s Cluster Receiver and other OpenTelemetry components you can have full monitoring and your Kubernetes clusters will run smoothly and efficiently. The K8s Cluster Receiver is super useful for high observability, so you can see all the important metrics and events in your cluster.
</p>
<h3><strong>Further Reading and Resources</strong></h3>

<ul>

<li><a href="https://openobserve.ai/docs/ingestion/traces/opentelemetry/">OpenTelemetry Documentation</a>

<li><a href="https://openobserve.ai/blog/send-metrics-using-kube-prometheus-stack-to-openobserve">Send Kubernetes Metrics Using Prometheus to OpenObserve</a>
</li>
</ul>
<p>
Exploring these resources will deepen your understanding of Kubernetes monitoring and OpenTelemetry, enabling you to build more resilient and efficient systems.
</p>
<p>
Need to streamline your monitoring tasks? Try <a href="https://openobserve.ai/">OpenObserve</a>. OpenObserve provides comprehensive observability solutions tailored for Kubernetes environments, helping you to achieve deeper insights and maintain peak operational efficiency. Explore how OpenObserve can elevate your Kubernetes monitoring to the next level!
</p>
