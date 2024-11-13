---
title: "Mastering Windows IIS Logging: A Comprehensive Beginner's Guide"
seoTitle: "Mastering Windows IIS Logging: A Comprehensive Beginner's Guide"
description: Learn everything about Windows IIS logging, from setup and configuration to log collection and parsing. Enhance your understanding and improve your IIS log management with step-by-step instructions and practical examples.
img: /img/blog/Windows_IIS/1-Home.gif 
alt: Mastering Windows IIS Logging
slug: mastering-windows-iis-logging-a-comprehensive-beginners-guide

authors: 
  - Sampath
publishDate: 2024-11-13
tags:
  - windows iis
  - iis logs 
  - openobserve
  - fluent bit 
  - observability
  - log management
  - vrl
  - web server monitoring
---
### In this blog, we will cover:
1. Introduction to Windows IIS
2. Why Windows IIS Logging Matters
3. How to Set Up Windows IIS
4. Hosting Custom Sites in IIS with Custom Domain Mapping
5. Understanding IIS Log Formats
6. Collecting and Analyzing IIS Logs with OpenObserve
7. Parsing IIS Logs in OpenObserve
8. Save the function and associate it to the stream
9. OpenObserve Dashboard
10. Conclusion

### Prerequisites:
- A windows machine.
- An OpenObserve instance or cloud account ready to receive logs.

## Introduction to Windows IIS
Internet Information Services (IIS) is a powerful and flexible web server developed by Microsoft, widely used for hosting websites, applications, and services on Windows machines. With its intuitive interface and robust support for web technologies like ASP.NET and PHP, IIS is an essential tool for organizations looking to deploy web-based content efficiently.

## Why Windows IIS Logging Matters
IIS logs are essential for understanding how your web server is performing and diagnosing issues with your website or application. Logs help you monitor server health, track user activity, and troubleshoot errors efficiently.

**Key Features:**
- **Scalability and Performance:** Optimized for high-traffic websites, IIS supports seamless scaling.
- **Security:** Comes with built-in support for Windows authentication, SSL, and request filtering.
- **User-Friendly Configuration:** Offers a GUI for easy management, suitable for beginners and experts alike.
- **Troubleshooting:** Quickly identify issues affecting the server, application, or network.

**Common Use Cases:**
- **Corporate Websites:** Hosting both internal and external websites.
- **Web Applications:** Deploying APIs and web services.
- **Intranet Solutions:** Providing tools for internal company use.
- **Development Environment:** Supporting web application development and testing.

## How to Set Up Windows IIS
Let’s walk through the steps to get IIS up and running, configure logging, and set up your first website.

### 1. Enabling IIS
To start, we need to enable IIS on your Windows machine. Here's how:

Go to **Control Panel > Programs > Turn Windows features on or off**, check **Internet Information Services**, and click OK.

![windows_iis_1](/img/blog/Windows_IIS/2.jpg)
![windows_iis_2](/img/blog/Windows_IIS/3.jpg)
![windows_iis_3](/img/blog/Windows_IIS/4.jpg)
![windows_iis_4](/img/blog/Windows_IIS/5.jpg)
![windows_iis_5](/img/blog/Windows_IIS/6.jpg)

Congratulations, IIS is now enabled! Verify its installation by opening **http://localhost/** in your web browser, which should display the default IIS webpage.

![windows_iis_homepage](/img/blog/Windows_IIS/9.jpg)

## Hosting Custom Sites in IIS with Custom Domain Mapping
In this section, we'll walk you through creating and hosting a custom website in IIS, then associating it with a custom domain (e.g., **o2.com**) on your Windows machine by modifying the hosts file.

### Step 1: Create the Website Folder
First, create a folder where your website files will be stored. In this case, let's create a folder named mywebsite under the default IIS directory  **C:\inetpub\wwwroot\mywebsite** 
![windows_iis_homepage](/img/blog/Windows_IIS/10.jpg)

### Step 2: Add an HTML File to the Website Folder
Now, create an index.html file inside the mywebsite folder. Open a text editor (like Notepad, run as administrator ) and add the following simple HTML content to the file:

```
<html>
<head><title>Hello World</title></head>
<body><h1>Hello, World!</h1></body>
</html>
```
![windows_iis_notepad](/img/blog/Windows_IIS/11.jpg)
![index.html](/img/blog/Windows_IIS/12.jpg)

### Step 3: Configure the Website in IIS
- Open **IIS Manager** by searching for **"IIS"** in the Start menu.
- Right-click on Desktop under the Connections section and choose **Add Website**.
- Set the Site Name (e.g., **"o2.com"**).
- Choose the Physical Path where your website files are stored  **C:\inetpub\wwwroot\mywebsite**
- Set the **Binding: IP address: All Unassigned**, Use port 80 for HTTP or 443 for HTTPS.
- Enter the hostname **“o2.com”**

![windows_iis_13](/img/blog/Windows_IIS/13.jpg)
![windows_iis_14](/img/blog/Windows_IIS/14.jpg)
![windows_iis_15](/img/blog/Windows_IIS/15.jpg)
![windows_iis_16](/img/blog/Windows_IIS/16.jpg)
![windows_iis_17](/img/blog/Windows_IIS/17.jpg)
![windows_iis_18](/img/blog/Windows_IIS/18.jpg)
Once everything is properly configured, you should see your website details under the 'Sites' section.
![windows_iis_19](/img/blog/Windows_IIS/19.jpg)

### Step 4: Configure the Hosts File
To access the website using your custom domain (e.g., o2.com), you need to map it to your local machine by editing the hosts file.

**Open the Hosts File:**
- Navigate to **C:\Windows\System32\drivers\etc\hosts**.
- Open the file in Notepad with Administrator privileges (right-click Notepad, select Run as Administrator, and then open the file).

**Add an Entry for Your Custom Domain:**
- At the end of the file, add the following line:

```
127.0.0.1   o2.com
```
This maps the custom domain **o2.com** to your local machine (**127.0.0.1**) 

Once done **Save and Close** the file.

![windows_iis_20](/img/blog/Windows_IIS/20.jpg)
![windows_iis_21](/img/blog/Windows_IIS/21.jpg)
![windows_iis_22](/img/blog/Windows_IIS/22.jpg)

**Why Editing the Hosts File Is Necessary:**
Modifying the hosts file is useful for local development to map custom domain names to IP addresses without using public DNS. This allows you to test website behavior with a specific domain before live DNS changes, aiding in development and troubleshooting on local or internal servers.

**How to Configure DNS in Production:**
If you're using AWS, configure DNS in production with Route 53 by creating a hosted zone for your domain and managing records (e.g., A, CNAME) to route traffic to AWS resources. Update your domain registrar's name servers to Route 53's for directing traffic effectively.

### Step 5: Test the Configuration
Open a web browser and type **http://o2.com** in the address bar.
Your custom website should load, displaying the **Hello, World!** Message.
![Hello_world](/img/blog/Windows_IIS/23.jpg)


## Check Logs:
Your IIS logs will be stored at **C:\inetpub\logs\LogFiles\W3SVC2**. Open the log files in that directory to see the requests being logged as you visit the site. This is where you'll be able to analyze all incoming traffic to your site.

![iis_logs](/img/blog/Windows_IIS/24.jpg)
![iis_logs_1](/img/blog/Windows_IIS/25.jpg)
![iis_logs_2](/img/blog/Windows_IIS/26.jpg)

## Understanding IIS Log Formats
When configuring IIS, it's essential to know the available log formats and choose one that suits your needs. 

By default, IIS often uses the **W3C Extended Log Format**. Here’s a brief overview of the formats:
- **W3C Extended Log Format (Default in many cases):** Highly customizable and allows you to choose specific fields to log (e.g., timestamps, client IPs, HTTP status codes). Great for detailed and flexible logging.
- **IIS Log Format:** Captures basic request data. Simple and easy to read but less customizable.
- **NCSA Log Format:** A standardized format, compatible with many tools, logging fundamental data like client IPs and request lines. Limited in terms of fields.
- **Custom Log Format:** Fully user-defined, providing maximum flexibility for specific needs but may require custom parsing tools.

In your IIS configuration, you can review or change the log format by going to **IIS Manager > Logging**.
![iis_logs_3](/img/blog/Windows_IIS/27.jpg)
![iis_logs_4](/img/blog/Windows_IIS/28.jpg)

## Collecting and Analyzing IIS Logs with OpenObserve
OpenObserve (O2) supports a variety of methods for collecting and sending IIS logs for analysis, giving you flexibility in how you integrate with the platform. You can use the following tools to forward IIS logs to OpenObserve:
- Filebeat
- Fluent Bit
- Fluentd
- Vector
- OpenTelemetry Collector (OTEL Collector)

In this blog, we will focus on using Fluent Bit to collect and send IIS logs to OpenObserve for analysis. However, if you're interested in using the OpenTelemetry Collector, we have another blog specifically dedicated to that method. You can explore it in our blog, [Parsing Windows IIS Logs.](https://openobserve.ai/blog/parsing-windows-iis-logs/)

### 1. Install OpenObserve
In this demo, we’ll proceed with a self-hosted installation of OpenObserve on a separate server. For a detailed setup guide, you can refer to the [OpenObserve Quickstart Documentation.](https://openobserve.ai/docs/quickstart/#openobserve-cloud/)

```
curl -L https://raw.githubusercontent.com/openobserve/openobserve/main/download.sh | sh
```
Once downloaded run it using below command:
```
ZO_ROOT_USER_EMAIL="root@example.com" ZO_ROOT_USER_PASSWORD="Complexpass#123" ./openobserve
```
Now point your browser to **http://localhost:5080** and log in with the following credentials
- **user email:** root@example.com
- **Password:** Complexpass#123

![o2_login](/img/blog/Windows_IIS/o2-login.jpg)
![o2_login_page](/img/blog/Windows_IIS/o2_home.jpg)

### 2. Install Fluent Bit
To collect and forward logs from IIS, you need to install Fluent Bit on the same machine where IIS is running. You can follow the official [Fluent Bit documentation](https://docs.fluentbit.io/manual/installation/windows) for detailed installation instructions and download links for the Windows version.

As I am using Windows 10, I will choose the **Windows 10 EXE** installation package for Fluent Bit.

![iis_logs_29](/img/blog/Windows_IIS/30.jpg)
Click on the EXE file and keep clicking Next until the setup is complete.
![iis_logs_30](/img/blog/Windows_IIS/31.jpg)
Directory structure for Fluent Bit:
![iis_logs_31](/img/blog/Windows_IIS/32.jpg)

### 3. Configure Fluent Bit
The fluent-bit.conf configuration file is located under **C:\Program Files\fluent-bit\conf**, where you can edit it to configure Fluent Bit to capture Windows IIS logs and send them to OpenObserve.
```
# Fluent Bit Input Configuration
[INPUT]
    Name              tail
    Tag               iis_logs
    Path              C:\inetpub\logs\LogFiles\W3SVC2\*.log
    Read_from_Head    On
    Skip_Long_Lines   On
    Refresh_Interval  10
    Buffer_Chunk_Size 1M
    Buffer_Max_Size   5M

# Fluent Bit Output Configuration
[OUTPUT]
    Name              http
    Match             *
    URI               /api/default/default/_json
    Host              13.232.78.13
    Port              5080
    tls               Off
    Format            json
    Json_date_key     _timestamp
    Json_date_format  iso8601
    HTTP_User         root@example.com
    HTTP_Passwd       Nw8nhBMvI6S5SB1o
    compress          gzip
```
Replace **<host>,<HTTP_User/Passwd>** with your OpenObserve server’s IP.

You can find the **[OUTPUT]** configurations for Fluent Bit under the **Ingestion > Custom > Logs > FluentBit** section in OpenObserve

![fluentbit](/img/blog/Windows_IIS/33.jpg)

### 4. Run Fluent Bit
Run Fluent Bit with the following command in the command prompt to start capturing and sending IIS logs:
```
#  Change to the Fluent Bit installation directory
cd "C:\Program Files\fluent-bit\bin"

# Run Fluent Bit using the specified configuration file
fluent-bit.exe -c "C:\Program Files\fluent-bit\conf\fluent-bit.conf"
```
![fluentbit_34](/img/blog/Windows_IIS/34-cmd.jpg)
![fluentbit_35](/img/blog/Windows_IIS/35.jpg)
![fluentbit_36](/img/blog/Windows_IIS/36.jpg)

## Parsing IIS Logs in OpenObserve
To make your logs more insightful, you can use Vector Remap Language (VRL) in OpenObserve to extract meaningful data.

As shown below, the logs ingested currently lack sufficient detail and are not as insightful as needed
![o2_logs](/img/blog/Windows_IIS/37.jpg)
Now, let's parse the logs using VRL to extract more meaningful insights.
```
pattern = r'^(?P<date>\d{4}-\d{2}-\d{2}) (?P<time>\d{2}:\d{2}:\d{2}) (?P<server_ip>[^\s]+) (?P<http_method>[^\s]+) (?P<uri_stem>[^\s]+) (?P<uri_query>[^\s]+) (?P<server_port>[^\s]+) (?P<username>[^\s]+) (?P<client_ip>[^\s]+) (?P<user_agent>.*?) (?P<referer>.*?) (?P<status_code>[^\s]+) (?P<substatus>[^\s]+) (?P<win32_status>[^\s]+) (?P<time_taken>[^\s]+)$'

.log = parse_regex!(.log, pattern)
```
![o2_logs_38](/img/blog/Windows_IIS/38.jpg)
![o2_logs_39](/img/blog/Windows_IIS/39.jpg)

## Save the function and associate it to the stream
Save the VRL function and link it to the data stream to ensure that logs are parsed and structured during ingestion into OpenObserve. This step will streamline the process and improve the quality of the data as it enters the system.

Let's save the function as **“parse_IIS”** for easy identification and future use.
![o2_logs_40](/img/blog/Windows_IIS/40.jpg)
Let's create a pipeline to associate the **parse_IIS** function with the **default** stream.
![o2_logs_41](/img/blog/Windows_IIS/41.jpg)
![o2_logs_42](/img/blog/Windows_IIS/42.jpg)

To test the setup, visit **http://o2.com** multiple times to generate access logs. These logs will be transformed in real-time as they are ingested into OpenObserve.
![o2_logs_43](/img/blog/Windows_IIS/43.jpg)

Select the 5 minute time range and run a query to view the logs.
![o2_logs_44](/img/blog/Windows_IIS/44.jpg)
You’ll notice that VRL functions are now being applied in real-time to the ingested logs.
![o2_logs_45](/img/blog/Windows_IIS/45.jpg)

## OpenObserve Dashboard
OpenObserve (O2) dashboards provide a powerful and user-friendly interface for visualizing and analyzing ingested data, such as logs, metrics, and traces. These dashboards offer customizable views, enabling users to monitor system performance, detect issues, and gain valuable insights in real-time.

The image shows a dashboard visualizing log data from "windows_IIS" over the past hour. The purple bars indicate periods of active log entries, helping identify patterns or irregularities in data ingestion for effective troubleshooting and analysis.
![Dashboard](/img/blog/Windows_IIS/46.jpg)

## Conclusion
Windows IIS is a powerful and secure web server. By combining it with OpenObserve, you gain the ability to monitor and analyze server activity efficiently. With the steps above, you’ve set up IIS, enabled logging, and learned how to collect and analyze logs with Fluent Bit and OpenObserve. This setup will help you gain valuable insights into your IIS server’s performance and health.
