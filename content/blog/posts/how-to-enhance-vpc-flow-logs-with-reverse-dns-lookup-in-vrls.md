---
title: How to Enhance AWS VPC Flow Logs with Reverse DNS Resolution Using VRL
seoTitle: How to Enhance AWS VPC Flow Logs with Reverse DNS Resolution Using VRL
description: Learn how to enhance AWS VPC Flow Logs by adding reverse DNS resolution using Vector Remap Language (VRL). This guide provides a step-by-step approach to implementing reverse DNS lookups, enriching log data with domain information for improved network visibility and security insights.
img: /img/blog/vrl-vpc-flow-enhancements/vpc-flow.gif
alt: enhance-vpc-flow-log
slug: how-to-enhance-vpc-flow-logs-with-reverse-dns-lookup-in-vrls
authors: 
  - chaitanya
publishDate: 2024-11-01
tags:
  - DNS
  - VRL
  - AWS
  - OpenObserve
  - Security
  - Logs
  - Kinesis
  - CloudWatch
  - Analytics
  - Monitoring
  - Enrichment
  - Lookup
  - Insights
  - Firehose
  - Network
  - Resolution
  - Traffic
  - Reverse
  - Example
  - Practices
---

As organizations increasingly adopt cloud environments, network visibility becomes crucial for ensuring security and operational efficiency. While AWS VPC Flow Logs provide comprehensive information about network traffic, they often lack context due to raw IP addresses. This blog post explores how to enhance these logs using reverse DNS lookup in OpenObserve, transforming raw data into actionable insights for improved security monitoring and incident response.

## Key Takeaways

* Understand the importance of reverse DNS lookup in enhancing AWS VPC Flow Logs  
* Learn how to implement reverse DNS lookup using OpenObserve and VRL  
* Discover the benefits of enriched logs for security monitoring and incident response  
* Explore best practices for efficient log enrichment and analysis

---
⚠️ Important Note: Use Reverse DNS Lookup With Caution ⚠️ 
While reverse DNS lookup can significantly enhance log data, it's crucial to implement it efficiently: Perform lookups during search, not ingestion, to avoid overloading the server Applying lookups at ingestion can add significant processing overhead Search-time enrichment ensures efficient, on-demand data enhancement without impacting system performance |
| :---- |

## Understanding Reverse DNS Lookup and Its Importance

As organizations grow and adopt cloud environments, network visibility becomes a critical part of ensuring security and operational efficiency. AWS VPC Flow Logs provide a comprehensive view of inbound and outbound traffic within your VPC, but raw logs only show IP addresses, which limits the understanding of external connections.

To make these logs more useful, especially in security contexts, reverse DNS lookup (rDNS) becomes essential. rDNS allows you to resolve IP addresses to their associated domain names, giving clearer insights into which external entities your infrastructure is communicating with.

In this blog, we will focus on:

* What reverse DNS lookup is and why it’s valuable.  
* How to use reverse DNS lookup with OpenObserve to enhance your AWS VPC Flow Logs.  
* The benefits of integrating this enrichment into your security monitoring.

## What is Reverse DNS Lookup and Why Does It Matter?

### What Is Reverse DNS Lookup?

In a typical **forward DNS lookup**, you query a domain name (e.g., google.com) to retrieve its corresponding IP address. Reverse DNS lookup works the other way around: it starts with an IP address and queries the DNS system to find out which domain, if any, is associated with that IP.

For instance, a forward DNS lookup of google.com returns the IP address 8.8.8.8. A reverse DNS lookup of 8.8.8.8 tells us that this IP is associated with dns.google.

### Why is Reverse DNS Lookup Important for Network Logs?

Network logs often show public IP addresses that don’t provide much context on their own. By performing a reverse DNS lookup, you can convert those IPs into meaningful domain names, helping you to:

* **Identify trusted sources**: Confirm traffic to trusted domains such as aws.amazon.com.  
* **Detect malicious activity**: Spot suspicious domains known for hosting phishing attacks or malware.  
* **Understand traffic patterns**: Know which services and websites your infrastructure interacts with.

### Use Case

Imagine receiving thousands of VPC Flow Logs, each showing IPs accessing your AWS infrastructure. Without domain names, manually identifying what’s safe and what’s suspicious can be daunting. With reverse DNS lookup, this task becomes easier and more automated, giving you valuable insights at a glance.

## How OpenObserve Uses Reverse DNS Lookup to Enhance Your Logs

![vpc-flow-log](/img/blog/vrl-vpc-flow-enhancements/image6.png)

OpenObserve is a powerful observability platform that can ingest and analyze logs, metrics, and traces in real-time. By using reverse DNS lookup within OpenObserve, you can transform VPC Flow Logs to add contextual data, such as domain names, to the raw IP addresses, making security monitoring more efficient and meaningful.

Here’s how reverse DNS lookup can be integrated into OpenObserve to transform your logs:

### Step 1: Ingest AWS VPC Flow Logs into OpenObserve

The first step is to configure your AWS VPC Flow Logs to be ingested by OpenObserve. This can be done using the following command. This will write the log to **flow\_log** stream:

```
curl -u test@example.com:<your_ingestion_password> -k http://localhost:5080/api/default/flow_log/_json -d '[{
  "level": "info",
  "job": "vpc-flow-log-enrichment",
  "log": {
    "account_id": "058694856476",
    "action": "ACCEPT",
    "az_id": "use2-az1",
    "bytes": 624,
    "dstaddr": "1.1.1.1",
    "dstport": 443,
    "end": 1729175792,
    "flow_direction": "ingress",
    "interface_id": "eni-08e1ae654be6eaba8",
    "log_status": "OK",
    "packets": 5,
    "pkt_dstaddr": "1.0.0.1",
    "pkt_srcaddr": "9.9.9.9",
    "region": "us-east-2",
    "srcaddr": "8.8.8.8",
    "srcport": 5353,
    "start": 1729175762,
    "subnet_id": "subnet-04312ec519e831d36",
    "tcp_flags": 19,
    "type": "IPv4",
    "version": 5,
    "vpc_id": "vpc-03e33fe1eae7002e8"
  }
}]'
```

![vpc-flow-log](/img/blog/vrl-vpc-flow-enhancements/image3.png)

### Step 2: Apply Reverse DNS Lookup to Enrich Logs

Once your logs are flowing into OpenObserve, you can use **VRL** to perform reverse DNS lookups on the IP addresses within your logs. Here’s an example of how to set this up.

Use the below VRL function:

```
if exists(.log_dstaddr) {
    # Split the IP address into octets
    .octets = split!(.log_dstaddr, ".")
    
    # Construct the reverse DNS query format
    .reverse_dns_addr = join!([.octets[3], .octets[2], .octets[1], .octets[0]], ".") + ".in-addr.arpa"

    # Perform the reverse DNS lookup
    .dns_result, err = dns_lookup(.reverse_dns_addr, "PTR")

    if err == null {
        if exists(.dns_result.answers) && is_array(.dns_result.answers) {
            .answers = .dns_result.answers

            if length!(.answers) > 0 {
                # Extract the first answer's rData
                .first_answer = get!(.answers[0], ["rData"])  # Use infallible get to access rData
                if .first_answer != null {
                    .log_dstaddr = .first_answer
                }
            }
        }
    }
}
```

This VRL script works by:

* Splitting the destination IP (log\_dstaddr) into its individual octets.  
* Constructing a reverse DNS query format by appending .in-addr.arpa.  
* Performing the reverse DNS lookup and replacing the IP address with the resolved domain name if available.

![vpc-flow-log](/img/blog/vrl-vpc-flow-enhancements/image2.png)

### Step 3: View Enriched Logs in OpenObserve

Go to the O2 dashboard and select the stream **flow\_log** \> select query on the top right to watch the logs after applying the function.

After applying the reverse DNS lookup, your VPC Flow Logs will now include domain names, providing better clarity on network interactions. Instead of seeing 1.1.1.1, you will now see one.one.one.one, making it easier to interpret the logs.

![vpc-flow-log](/img/blog/vrl-vpc-flow-enhancements/image5.png)
![vpc-flow-log](/img/blog/vrl-vpc-flow-enhancements/image4.png)

## Benefits of Using Reverse DNS Lookup in OpenObserve

By integrating reverse DNS lookup into your OpenObserve pipeline, you can gain several advantages in network monitoring and security:

### 1\. Improved Threat Detection

Without reverse DNS, identifying potential threats based on IP addresses alone can be challenging. With DNS lookup, suspicious domains like **malicious-site.com** become obvious, enabling faster detection of potential threats.

### 2\. Better Context for Incident Response

When responding to incidents, having enriched data that includes domain names helps teams investigate issues more effectively. For example, seeing traffic to **attackers-domain.com** instead of just an **IP** gives more context during an investigation.

### 3\. Enhanced Alerting

OpenObserve can be configured to trigger alerts based on certain domain names. For example, if traffic is directed toward a known malicious domain, the system can generate an immediate alert, enabling quick action.

### 4\. Streamlined Compliance Reporting

Many compliance frameworks require detailed network traffic analysis. Enriched logs with reverse DNS data provide more readable and insightful reports for compliance officers, helping to meet audit requirements more efficiently.

## Reverse DNS Lookup with OpenObserve: A True Game Changer

Integrating reverse DNS lookup with OpenObserve transforms AWS VPC Flow Logs from raw data into a powerful tool for network visibility and security. By enriching logs with domain information, organizations can detect threats faster, streamline incident response, and gain deeper insights into their network traffic. As cloud environments continue to grow in complexity, tools like OpenObserve with VRL capabilities become essential for maintaining robust security postures and operational efficiency.

Ready to enhance your AWS VPC Flow Logs with reverse DNS lookup? [Get started with OpenObserve today](https://openobserve.ai/) and take your network monitoring to the next level\!