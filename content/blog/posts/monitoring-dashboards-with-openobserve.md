---
title: Building Monitoring Dashboards with OpenObserve [Tutorial]
seoTitle: How to Build Effective Monitoring Dashboards with OpenObserve
description: Learn how to create effective monitoring dashboards with OpenObserve. This guide covers installation, sample data setup, and dashboard creation, highlighting key features like customizable panels and dynamic filtering for enhanced application performance monitoring.
img: /img/blog/dashboard/image16.png
alt: OpenObserve
slug: monitoring-dashboards-with-openobserve
authors: 
  - manas
publishDate: 2024-10-23   
tags:
  - observability
  - openobserve
  - dashboards
  - tutorial
---


## Introduction
Let's face it: building a monitoring dashboard is crucial for keeping track of your application's performance and infrastructure health to deliver a seamless user experience. But, we've all been there—staring at a sea of metrics, struggling to make sense of it all. That's where effective monitoring dashboards come in.

A well-designed dashboard can help you identify potential issues before they become major problems, optimize resource allocation, and make data-driven decisions. But, what makes a dashboard truly effective? And how do you build a monitoring dashboard that provides actionable insights?

**OpenObserve: Simplifying Monitoring**

Our open-source observability platform makes monitoring simple and intuitive, with:

* Easy setup
* Powerful dashboards
* Intuitive user interface

> Follow along with our simple guide below and check out our detailed YouTube tutorial!

<iframe width="560" height="315" src="https://www.youtube.com/embed/kjUvXQdL798?si=guA2AK3COvYJolIr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### What to Expect?

In this guide, we'll explore how to build monitoring dashboards in OpenObserve, we'll dive into the key features, best practices, and step-by-step instructions for creating customizable dashboards that meet your specific needs.

### Key Features of OpenObserve Dashboards

* **Real-time data visualizations**:  Automatically refresh your dashboards to monitor live streams with accuracy.
* **Easy Dashboard Creation**: Intuitive UI and extensive panel customization.
* **18+ Chart Types**: Visualize data with a variety of chart options, including heatmaps, tables, and time-series graphs.
* **Customizable**: Personalize dashboards with filters, variables, and templating for tailored views.
* **Alerting and Notification**: Set up custom alerts and notifications to stay informed of performance issues.
* **Scalable**: Support for large-scale deployments with high-performance rendering.

Now that you know the highlights, let's move on to creating your first dashboard in OpenObserve!

## Getting Started: Setting Up OpenObserve

### Step 1: Installing OpenObserve

To get started with OpenObserve, you have several options for installation. Below are the most common methods:

1. **Using Docker (Recommended for Quick Setup):**
   If you have Docker installed on your machine, setting up OpenObserve is straightforward. Run the following command in your terminal or command prompt:

 Docker images are available at [https://gallery.ecr.aws/zinclabs/openobserve](https://gallery.ecr.aws/zinclabs/openobserve)

   ```bash 
   docker run -v $PWD/data:/data -e ZO_DATA_DIR="/data" -p 5080:5080 \
    -e ZO_ROOT_USER_EMAIL="root@example.com" -e ZO_ROOT_USER_PASSWORD="Complexpass#123" \public.ecr.aws/zinclabs/openobserve:latest
   ```
   *Replace `root@example.com` and `Complexpass#123` with your desired credentials.*

   Once the container is up and running, navigate to http://localhost:5080 and login in your web browser to access the OpenObserve UI.

2. **Self-Hosting Locally:**
- Download the latest OpenObserve binary from the [official GitHub repository](https://github.com/openobserve/openobserve).
- Extract the zip file to a directory (e.g., C:\OpenObserve).
- Run `openobserve.exe`.

3. **Helm (for Kubernetes):**
- Run this commmand
```bash
helm repo add openobserve https://openobserve.github.io/helm-charts
helm install openobserve openobserve/openobserve
```

### Step 2: Loading Sample Data

Let's start by loading sample data into OpenObserve. This will allow you to quickly experience all the Dashboard features without needing to set up custom data sources, making it easy to dive into building and visualizing dashboards.

*Ensure you have curl installed on your system before running these commands.*

Use the following command to download real-life log data:
```bash
curl -L https://zinc-public-data.s3.us-west-2.amazonaws.com/zinc-enl/sample-k8s-logs/k8slog_json.json.zip -o k8slog_json.json.zip
```

Unzip the downloaded file:
```bash
unzip k8slog_json.json.zip
```
*Note: Replace the URL you got from OpenObserve Cloud and append it with @k8slog_json.json*

For **OpenObserve Cloud**
```bash
curl -u user@domain.com:abqlg4b673465w46hR2905 -k https://api.openobserve.ai/api/User_organization_435345/default/_json -d "@k8slog_json.json"
```
For **Self-Hosted-Installation**
```bash
curl http://localhost:5080/api/default/default/_json -i -u "root@example.com:Complexpass#123"  -d "@k8slog_json.json"
```

#### Explore Sample Data in OpenObserve


1. Access OpenObserve UI: [Cloud](http://cloud.openobserve.ai) | [Self-Hosted](http://localhost:5080)
2. Login with your credentials.
3. Visit Logs page and select **default** index.

*Tip: Use the search bar to quickly find specific log entries or patterns.*

 ![logspage](/img/blog/dashboard/image4.png)


## Building Your First Monitoring Dashboard with OpenObserve


#### **Creating a New Dashboard**


1. Navigate to the **Dashboards** section in OpenObserve's left-side menu.


2. Click **New Dashboard** and provide a name, description, and choose a folder.

*Tip: Use descriptive names for your dashboards to easily identify them later.*

- ![Folder](/img/blog/dashboard/image2.png)


3. Click **Save** to create an empty dashboard.


#### **Adding and Configuring Panels**


1. Click **Add Panel** on the empty dashboard.


2. Select the stream type to **Logs** and select a data stream.
- ![Folder](/img/blog/dashboard/image5.png)

3. Choose a field (e.g. `stream_name`, `body`). 

Panel 1:

4.  Assign fields to axes:
- X-axis: timestamp (default)
- Y-axis: body (count)

![Folder](/img/blog/dashboard/image13.png)
*Chart Type: Line Chart (for time-series data)*


5. Click **Apply** to preview and save changes.

Panel 2:

1. Add a New Panel:
  Click on *+* Add Panel and select a chart-type to visualize 
 - ![Folder](/img/blog/dashboard/image3.png)

2. Repeat the panel configuration steps as needed.

3.  Click **Apply** and preview.

* Note: OpenObserve offers 18 different chart types, each suited for a specific purpose. To create an effective dashboard, select the chart type that best fits your use case. For instance, use an Area Chart to show trends over time or a Bar Chart to compare categories.


#### **Config Panel**
For those who love customization, the **Config Panel** is your best friend! This powerful configuration tool ensures that every panel displays the data exactly how you need it.
- Adjust **legends** to enhance readability.
- Set **units** and **decimals** to control data precision.
- Configure **axis properties** to match your exact requirements.

![Config Panel Example](/img/blog/dashboard/image10.png)


#### **Auto Mode** for Panel Creation
**Auto Mode** is the easiest way to create panels. It allows you to:
- **Drag-and-Drop Fields**: Quickly add fields to your visualizations.
- **Apply Filters**: Easily filter your data using available values.
- ![auto](/img/blog/dashboard/image12.png)

Auto Mode is perfect for beginners or when you need quick insights without complex queries.

#### **Custom Query Mode**
Use **Custom Queries** for more control and flexibility. Here are some scenarios where Custom Query Mode is useful:
- ![auto](/img/blog/dashboard/image11.png)

- **Advanced Aggregations**: If you need specialized aggregations beyond basic counts or averages.
- **Complex Filters**: For advanced conditions like `AND`/`OR` combinations.
- **SQL Functions**: Use SQL functions for custom data manipulation. See the [documentation](https://openobserve.ai/docs/functions/) for a list of available functions.


#### **PromQL Queries** for Metrics
For **metrics**, OpenObserve supports **PromQL**. PromQL is a powerful tool for querying time-series data. Here are some examples:

- ![promql](/img/blog/dashboard/image17.png)
- **Instant Queries**: Get current values, e.g., `up{job="node-exporter"}`.
- **Range Queries**: Retrieve data over a specific time range, e.g., `rate(http_requests_total{job="web server"}[5m])`.
- **Aggregations and Filtering**: Perform operations like sum or filter metrics, e.g., `sum(cpu_usage{instance="example-server"})`.
- **Metric Operations**: Apply calculations, e.g., `rate(http_requests_total{job="web server"}[5m]) * 100`.

PromQL is ideal for detailed metrics analysis, giving you full control over your data.

*Tip:  **Auto Mode** works well for most use cases, while **Custom Queries** and **PromQL** provide more advanced options when needed.*

### Advanced Dashboard Features

#### **Dynamic Filtering with Variables**

When you build monitoring dashboards, dynamic filtering with variables can streamline your monitoring setup, reducing the need for multiple dashboards and improving load times.

**Practical Use Case: Multiple Kubernetes Namespaces**

When monitoring multiple Kubernetes namespaces, creating separate dashboards can be inefficient. Instead of creating a separate dashboard for each namespace, you can create a variable called **namespace**. This variable can then be used across all panels with a filter, such as `$namespace  `.

How It Works:

- Add the `namespace` variable to your panels.
- ![variable](/img/blog/dashboard/image1.png)

- Use it in your queries to filter the displayed data dynamically.
- ![query](/img/blog/dashboard/image9.png)

- With just one dashboard, you can select any Kubernetes namespace and instantly load its relevant data.
- ![namespacee](/img/blog/dashboard/image7.png)


#### **Save and Export**

 Once you've arranged all the panels to your satisfaction, click **Save Dashboard**.

**Export**: Click **Export** to save the dashboard as a **JSON file** for sharing or backup purposes.
- ![Export Dashboard](/img/blog/dashboard/image14.png)


**Share**: Copy and share the link with colleagues.

- ![Share Dashboard](/img/blog/dashboard/image8.png)


*Note: Create tabs for CPU, Memory if you want to add additional related metrics without cluttering the main view.*
- ![Share Dashboard](/img/blog/dashboard/image15.png)

### **Prebuilt Dashboards for OpenObserve**

If you're short on time, you can take advantage of prebuilt monitoring dashboards available for OpenObserve. These templates provide a quick way to build a monitoring dashboard tailored to specific needs, and you can customize them further to match your infrastructure

Follow these easy steps to import a prebuilt dashboard into OpenObserve:

1. **Download the Dashboard**:
   - Visit the [OpenObserve Dashboards Repository](https://github.com/openobserve/dashboards).
   - Download the JSON file for the dashboard that matches your needs.

2. **Import the Dashboard**:
   - In **OpenObserve**, navigate to the **Dashboards** section.
   - Click on the **Import** button.
   - Select the downloaded JSON file.
   - Click **Import** again to create a new dashboard using the prebuilt configuration.
   - - ![Import Dashboard](/img/blog/dashboard/image6.png)

> **Tip**: Prebuilt dashboards are an excellent starting point, but don't hesitate to customize them. Tailor them to match your infrastructure and monitoring needs by adding specific metrics, changing chart types, or configuring alerts.


### **Next Steps**

- Add more **filters**, and use **drill-downs** to catch issues early.

- **Add More Metrics**: Add panels for **Network Traffic**, **Disk I/O** for a complete view of your cluster.

- **Set Up Alerts**: Configure **custom alerts** for notifications via **email**, **Slack**, or other channels.

- **Join the Community**:  Connect with OpenObserve users and contribute your own dashboards to the community repository to help fellow users! 



### **Need More Help?**

- **OpenObserve Documentation**: [Official Documentation](https://github.com/openobserve/openobserve)
- **Build Dashboards in openobserve**: [Youtube Video](https://youtu.be/kjUvXQdL798?si=LFSRarlIIXfwyibJ)  


**Community Forums**:
- [OpenObserve Slack Community](https://community.openobserve.ai)
- [Github Discussions](https://github.com/openobserve/openobserve/discussions)


### **Dive Into Dashboards with OpenObserve**

Start your observability journey today with OpenObserve and transform how you monitor your systems!

- Sign up for a free trial of OpenObserve on our [website](https://openobserve.ai/).
- Want to self-host or contribute? Check out our [GitHub repository](https://github.com/openobserve) to explore self-hosting options and help grow the community.

Thank you for reading! We hope you found this guide helpful. If you have any questions, feedback, or suggestions, we’d love to hear from you.

**Happy Monitoring!** 🚀