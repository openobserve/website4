---
title: What is netflow and how to use it to analyze network traffic
seoTitle: What is netflow, why is it important and how to use it to analyze network traffic and do network monitoring? What is IPFIX? 
description: Netflow is a network protocol that allows you to analyze network traffic. Learn how to use it to analyze network traffic.
img: img/blog/netflow/netflow3.png
alt: OpenObserve
slug: analyzing-network-traffic-using-netflow
authors: 
  - prabhat
publishDate: 2024-01-11
tags:
  - netflow
  - network traffic
  - security

---

### Introduction

Imagine a vigilant sentry at every exit and entrance of your network, meticulously recording every data packet that passes through. NetFlow is essentially that sentry, a technology that captures metadata about network traffic flows. It logs details like source and destination addresses, packet size, and application protocols, painting a detailed picture of how traffic ebbs and flows through your network. That is netflow in a nutshell.

### History

NetFlow's story begins in the mid-90s at Cisco. Back then, network monitoring relied heavily on SNMP, a protocol that interrogated devices for one-point-in-time snapshots. But imagine trying to understand a bustling highway by taking still photographs from a helicopter - NetFlow offered a dynamic, real-time view.

It quickly revolutionized network management. NetFlow data empowered admins to:

- **Identify traffic hogs**: Pinpoint applications or devices guzzling excessive bandwidth, paving the way for optimization.
- **Troubleshoot bottlenecks**: Diagnose congestion points and optimize traffic flow, keeping your network smooth and performant.
- **Unmask security threats**: Identify suspicious traffic patterns and potential malware signatures, bolstering your network's defenses.
- **Bill with fairness**: Allocate network costs based on actual usage, leading to transparency and responsible consumption.


### Beyond Cisco's Brainchild

While Cisco initially held the reins, NetFlow's impact transcended vendor boundaries. The core concept proved so valuable that various iterations and standards emerged, like IPFIX and sFlow. Today, NetFlow has become a cornerstone of network monitoring, employed by diverse network devices and analyzed by powerful software tools.

### Getting Started

NetFlow records are traditionally exported via UDP by network devices like routers and switches. To capture these records, you need a collector. IP address and port number of netflow collector must be configured on the network device. 2055 is a common port used for netflow collection.


A sample netflow record may look like:
```json
{
  "bgp_next_hop": "",
  "bytes": 73,
  "dst_addr": "221.43.87.148",
  "dst_as": 51751,
  "dst_mac": "00:00:00:00:00:00",
  "dst_net": "221.43.87.148/30",
  "dst_port": 12977,
  "dst_vlan": 0,
  "etype": "IPv4",
  "forwarding_status": 0,
  "fragment_id": 0,
  "fragment_offset": 0,
  "icmp_code": 0,
  "icmp_type": 0,
  "in_if": 0,
  "ip_flags": 0,
  "ip_tos": 0,
  "ip_ttl": 0,
  "ipv6_flow_label": 0,
  "next_hop": "36.206.171.217",
  "next_hop_as": 0,
  "observation_domain_id": 0,
  "observation_point_id": 0,
  "out_if": 0,
  "packets": 146,
  "proto": "TCP",
  "sampler_address": "10.1.46.97",
  "sampling_rate": 0,
  "sequence_num": 10298,
  "src_addr": "71.58.124.245",
  "src_as": 40904,
  "src_mac": "00:00:00:00:00:00",
  "src_net": "71.0.0.0/9",
  "src_port": 60524,
  "src_vlan": 0,
  "tcp_flags": 0,
  "time_flow_end_ns": 1705009598286792700,
  "time_flow_start_ns": 1705009466286792700,
  "time_received_ns": 1705009779286981600,
  "type": "NETFLOW_V5",
  "vlan_id": 0
}
```

### NetFlow Versions

There are 2 major versions of netflow in use today:
- V5
- V9 (template-based architecture)

In addition to these, IPFIX is also used. IPFIX is an IETF standard based on netflow v9.


### Architecture

A typical architecture for netflow collection is shown below:




### What we will do in this article?

[goflow2](https://github.com/netsampler/goflow2), is a high-performance, open-source NetFlow/IPFIX/sFlow collector built in Go, that can be used to collect netflow records. We will use it for the purpose of collecting netflow records in this blog.

- In this article, we will use [goflow2](https://github.com/netsampler/goflow2) to collect netflow records and store them in OpenObserve. 
- We will use [nflow-generator](https://github.com/nerdalert/nflow-generator) to generate sample netflow records.
- We will deploy goflow2 and nflow-generator in a kubernetes cluster.
- We will then use [openobserve-collector](https://github.com/openobserve/openobserve-helm-chart/tree/main/charts/openobserve-collector) to collect netflow records from goflow2 and store them in OpenObserve.
- We will then use the data to analyze network traffic.


We will be running goflow2 and nflow-generator in a kubernetes cluster. If you don't have a kubernetes cluster, you can use [kind](https://kind.sigs.k8s.io/) to create a local kubernetes cluster.

nflow-generator will generate sample logs and send them to goflow2. goflow2 can then send it to either kafka, a file or to stdout. We will use stdout. oepnobserve-collector can collect logs emitted on stdout by any application and send them to OpenObserve.

You can install goflow2 and nflow-generator in your kubernetes cluster using the following commands:

```bash
kubectl apply -f https://raw.githubusercontent.com/openobserve/misc-scripts/main/netflow/goflow.yaml
```

Remeber, in real life you will be exposing goflow2 using a load balancer or ingress. For the sake of demonstration, we are using nflow-generator to send sample logs to goflow2 using the kubernetes service.

Once this is running you will be able to get logs in OpenObserve.

![netflow logs in openobserve](/img/blog/netflow/netflow1.png)

You will notice that the logs are not parsed. This is because we have not configured the parser yet. We will do that in the next step.

Create a VRL function and associate it with the default stream. The VRL function will parse the logs and extract the fields. You can use the following VRL function:

```javascript
if .k8s_namespace_name == "netflow" {
    .nf=parse_json!(.body)
    del(.body)
} 
.
```

Once the function is associated with the stream, you will see the logs parsed.

![netflow logs parsed in OpenObserve](/img/blog/netflow/netflow4.png)

Now that we have the logs parsed, we can use the data to analyze network traffic.

### Analyzing network traffic

You can build a dashboard to analyze network traffic. You can also import the prebuilt dashboards from the [dashboard repository](https://github.com/openobserve/dashboards/tree/main/Netflow).

Following are the 2 sample dashboards:

#### Top Activity

![netflow dashboard - top activity](/img/blog/netflow/netflow_top_activity.png)

#### Top Items

![netflow dashboard - top items](/img/blog/netflow/netflow_top_items.png)


