---
title: How to capture AWS VPC Flow Logs and analyze them
seoTitle: Comprehensive Guide to capturing and analyzing AWS VPC Flow Logs
description: "Amazon Web Services (AWS) provides a wealth of data about the traffic that flows through your Virtual Private Cloud (VPC). By capturing this data, you can gain insights into network patterns, detect anomalies, and improve the security and efficiency of your cloud environment. AWS VPC Flow Logs are a feature that allows you to capture information about the IP traffic going to and from network interfaces in your VPC. In this blog, we will discuss how to capture all fields of AWS VPC Flow Logs, send them to Kinesis Firehose, and then analyze them using OpenObserve's Logs UI and Dashboards.."
img: img/blog/vpc_flow_log/overall.webp
alt: OpenObserve
slug: how-to-capture-aws-vpc-flow-logs-and-analyze-them
authors: 
  - prabhat
publishDate: 2024-03-18
tags:
  - networking
  - security
  - vpc
  - aws
---

Amazon Web Services (AWS) provides a wealth of data about the traffic that flows through your Virtual Private Cloud (VPC). By capturing this data, you can gain insights into network patterns, detect anomalies, and improve the security and efficiency of your cloud environment. AWS VPC Flow Logs are a feature that allows you to capture information about the IP traffic going to and from network interfaces in your VPC. In this blog, we will discuss how to capture all fields of AWS VPC Flow Logs, send them to Kinesis Firehose, and then analyze them using OpenObserve's Logs UI and Dashboards.

Architecture of the solution would look like

![Architecture](/img/blog/vpc_flow_log/architecture.webp)

## Step 1: Get the ingestion URL and creedentials for OpenObserve

1. Go to the OpenObserve **Ingestion > Custom > Logs > Kinesis Firehose** menu
2. Copy the URL
3. It will look like this: `http://localhost:5080/aws/default/default/_kinesis_firehose`. Change `localhost` to your OpenObserve server's IP address or domain name. an stream name to `vpcflowlog` . Keep this name of the stream. It will allow you to use the existing dashboard from the OpenObserve dashboard repository.
4. URL should look like this: `https://openobserve.example.com/aws/default/vpcflowlog/_kinesis_firehose`
5. Also copy the `Access Key` from the same page. You will need to use it in Amazon Data Firehose Delivery Stream.

![OpenObserve Ingestion URL](/img/blog/vpc_flow_log/ingestion_page.webp)

## Step 2: Create a Amazon Data Firehose Delivery Stream

1. Go to the Amazon Data Firehose console.
2. Click on "Create Delivery Stream".
3. Name your stream and select "Direct PUT or other sources" as the source.
4. In the destination settings, select "HTTP Endpoint".
5. Give the stream a name `flowlog_openobserve`
6. Provide HTTP Endpoint URL and Access Key copied from OpenObserve.
7. Select an s3 backup bucket for `Failed data only`.

<img src="/img/blog/vpc_flow_log/firehose_settings.webp" alt="Amazon Data Firehose Delivery Stream" style="width: 60%;"/>

## Step 3: Enable VPC Flow Logs

It's time to enable VPC Flow Logs. You can do this for your VPC page in the AWS Management Console:

1. Go to the VPC page in the AWS Management Console.
2. Select the VPC you want to enable flow logs for.
3. Click on the "Flow Logs" tab.
4. Press "Create Flow Log".
5. In the creation dialogue, ensure you select the "All" filter so that you capture all traffic.
6. Choose "All" fields to include in the flow logs. AWS allows you to select standard fields or choose custom fields.

<img src="/img/blog/vpc_flow_log/aws_flow_log_page.webp" alt="VPC Flow Logs" style="width: 60%;"/>

Once this is done VPC flow logs will start to be published to the Amazon Data Firehose which will then start sending the logs to OpenObserve.

In less than 10 minutes you should start seeing the logs in OpenObserve. Logs will have the below format. This format of logs is not very useful for analysis. We will need to parse and enrich the logs to make them useful that we will do in next steps.


```json
{
   "_timestamp":1710730130307197,
   "message":"068194857476 ACCEPT use2-az1 384 10.1.84.181 58398 1710730062 ingress i-034d383d7984e0e7b eni-0265f0f4e6a412339 OK 4 - 10.1.73.251 - 10.1.6.88 6 us-east-2 10.1.6.88 2380 1710730004 - - subnet-04312ec519e831d36 19 - IPv4 5 vpc-03e33fe1eae7002e8"
}
```

Below is how it will look in th UI

![OpenObserve Logs](/img/blog/vpc_flow_log/unparsed_log.webp)

## Step 4: Upload protocols enrichment table to OpenObserve

VPC flow logs data contains protocol number using which the data was transferred. OpenObserve can use a protocol enrichment table to convert protocol numbers to protocol names. You can download the protocol enrichment table from [here](https://zinc-public-data.s3.us-west-2.amazonaws.com/enrichment_tables/protocols.csv) using the command below:

```bash
wget https://zinc-public-data.s3.us-west-2.amazonaws.com/enrichment_tables/protocols.csv
```

This file contains the table at https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml which contains the IANA protocol number of the traffic.

Give the enrichment table name `protocol` and upload the csv file to OpenObserve using the UI.

![OpenObserve Enrichment Table](/img/blog/vpc_flow_log/protocol_enrichment_table.webp)

Once this is done you will be able to use this enrichment table in the next step to convert the protocol numbers to protocol names.

## Step 5: Parse and enrich the logs

We will do the following processing on the logs:

1. Parse the logs to extract the fields
2. Use source and destination IP addresses to get geolocation details using the Maxmind GeoIP database and enrich the logs with the location information.
3. Enrich the logs with the protocol names using the protocol enrichment table


We will use the VRL functions in OpenObserve to do this. Below is the VRL function that you can use to parse and enrich the logs.

```ruby
. |= parse_aws_vpc_flow_log!(.message,"account_id action az_id bytes dstaddr dstport end flow_direction instance_id interface_id log_status packets pkt_dst_aws_service pkt_dstaddr pkt_src_aws_service pkt_srcaddr protocol region srcaddr srcport start sublocation_id sublocation_type subnet_id tcp_flags traffic_path type version vpc_id")
del(.message)
.dst_city, err = get_enrichment_table_record("maxmind_city", {"ip": .pkt_dstaddr })
.dst_asn, err = get_enrichment_table_record("maxmind_asn", {"ip": .pkt_dstaddr })
.src_city, err = get_enrichment_table_record("maxmind_city", {"ip": .pkt_srcaddr })
.src_asn, err = get_enrichment_table_record("maxmind_asn", {"ip": .pkt_srcaddr }) 
.protocol=get_enrichment_table_record!("protocol", {"number": to_string(.protocol)}).keyword
 .

```

This is how parsed log record will look like after you parse the log using the above VRL function:

<img src="/img/blog/vpc_flow_log/parsed_logrecord.webp" alt="Parsed Log" style="width: 60%;"/>

Make sure that you associate the the above VRL function with the stream `vpcflowlog` that you created in the first step. Associating the function with the stream will allow the function to be applied to the log records at the time of ingestion.

## Step 5: Set Up AWS VPC Flow log dashboards

Now that the parsed data is available in OpenObserve you can create any number of dashboards to visualize the data. 

The fastest way though is to use the existing dashboards from the OpenObserve dashboard repository. You can import the dashboards from the [OpenObserve dashboard repository](https://github.com/openobserve/dashboards/tree/main/AWS%20VPC%20Flow%20log). 

Here is how your dashboard might look like:

### Top 20

![Top 20](/img/blog/vpc_flow_log/ss_top20.webp)

### AWS networking

![AWS networking](/img/blog/vpc_flow_log/ss_aws_networking.webp)

### ASN details

![ASN details](/img/blog/vpc_flow_log/ss_asn.webp)

### Geo details

![Geo details](/img/blog/vpc_flow_log/ss_geo.webp)

### Protocol details

![Protocol details](/img/blog/vpc_flow_log/ss_protocols.webp)

### AWS Services

![AWS Services](/img/blog/vpc_flow_log/ss_aws_services.webp)

### Rejected traffic

![Rejected traffic](/img/blog/vpc_flow_log/ss_rejected_traffic.webp)



## Step 6: Analyze Your Logs

Now that everything is set up, you can analyze your logs:

1. Use the Logs UI to perform real-time analysis of your network traffic.
2. Create various visualizations such as pie charts, line graphs, and maps to represent different aspects of your VPC traffic.
3. Build dashboards that give you an overview of the metrics you're most interested in, such as rejected traffic, the most communicated with IP addresses, or traffic volume over time.

## Step 7: Set Up Alerts

Finally, you can set up alerts within OpenObserve to notify you of certain patterns or thresholds:

1. Use the "Alerts" feature in OpenObserve to create alerts and send notifications.
2. Define conditions based on the VPC Flow Log data that, when met, will send an alerts

## Conclusion

By following these steps, you can effectively capture all fields of AWS VPC Flow Logs and send them to OpenObserve for analysis. This setup will allow you to monitor your AWS environment closely, detect potential security threats, and optimize your network's performance. OpenObserve's Logs UI and Dashboards provide a powerful way to visualize and monitor your VPC traffic, turning raw data into actionable insights.

