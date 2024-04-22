---
title: Send Kubernetes Metrics Using Prometheus to OpenObserve
seoTitle: Send Kubernetes Metrics Using Prometheus to OpenObserve
description: Send metrics using kube-prometheus-stack to OpenObserve
img: /img/blog/devops.png
alt: OpenObserve
slug: send-metrics-using-kube-prometheus-stack-to-openobserve
authors: 
  - prabhat
publishDate: 2023-08-10
tags:
  - kube-prometheus-stack
  - prometheus
  - metrics
---

# Send Kubernetes Metrics Using Prometheus to OpenObserve

If you're using Kubernetes, monitoring is an essential part of ensuring your clusters are running smoothly. A popular solution is Prometheus, which can gather metrics from your Kubernetes nodes, pods, and services. In this blog post, we'll guide you on how to send Kubernetes metrics from Prometheus to OpenObserve using the kube-prometheus-stack.

## Why Send Metrics to OpenObserve?
OpenObserve is a cloud-native observability platform that allows you to monitor and analyze metrics, traces, and logs from various sources. By integrating Prometheus with OpenObserve, you can view and alert on your Kubernetes metrics in a centralized platform.

## Setup: Sending Metrics from kube-prometheus-stack to OpenObserve

### 1. Create a Monitoring Namespace

We'll first need a dedicated namespace for our monitoring components:

```shell
kubectl create namespace monitoring
```

### 2. Secure your OpenObserve Credentials

For secure transmission, store your OpenObserve credentials in a Kubernetes secret:

```shell
# Replace xxxx with your credentials
kubectl create secret generic openobserve-secret --from-literal=username=xxxx --from-literal=password=xxxx -n monitoring
```

### 3. Adding kube-prometheus-stack Helm Repo

kube-prometheus-stack is available via the Prometheus Community Helm repository. Let's add and update the repo:

```shell
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

### 4. Get the kube-prometheus-stack Values File

This file contains configuration settings that Helm uses during installation:

```shell
wget https://raw.githubusercontent.com/prometheus-community/helm-charts/main/charts/kube-prometheus-stack/values.yaml
```

### 5. Modify the Configuration

Make the following changes in the downloaded `values.yaml` file:

- Set `agentMode` for Prometheus to `true`
  
- Disable Grafana by setting `enabled` to `false`

For sending metrics to OpenObserve, you'll need to configure the remoteWrite section:

```yaml
remoteWrite:
  - url: https://api.openobserve.ai/api/my_org/prometheus/api/v1/write
    basicAuth:
      username:
        name: openobserve-secret
        key: username
      password:
        name: openobserve-secret
        key: password
```

Replace `my_org` with your organization name in the URL.

### 6. Install kube-prometheus-stack

With the values file configured, let's install kube-prometheus-stack:

```shell
helm install kps1 prometheus-community/kube-prometheus-stack -f values.yaml -n monitoring
```

### Removing kube-prometheus-stack (if needed)

If you wish to uninstall the stack:

```shell
helm uninstall kps1 -n monitoring
```

You can find teh source code for this blog post [here](https://github.com/openobserve/kube-prometheus-stack-openobserve)

## Wrapping Up

With this setup, you can seamlessly forward metrics from your Kubernetes cluster to OpenObserve using Prometheus. This integration provides a powerful means to keep tabs on your cluster health and performance. As always, make sure to periodically check and update your setup for the latest features and security enhancements.
