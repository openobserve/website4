---
title: Google Cloud Pub/Sub Receiver
seoTitle: Google Cloud Pub/Sub Receiver
description: Learn to pull messages from a Google Cloud Pub/Sub Receiver and
  acknowledgement in our practical guide with examples.
img: /img/resources/google-cloud-pub-sub-receiver.png
alt: Google Cloud Pub/Sub Receiver
slug: Google-Cloud-PubSub-Receiver-guide
authors:
  - openobserve-team
publishDate: 2024-10-02
tags:
  - Sub Receiver
  - Google Cloud Pub
---
<p><span style="font-weight: 400;">Welcome to our guide on the Google Cloud Pub/Sub Receiver. If you're a developer or an engineering manager looking to streamline your system's communication, you're in the right place.&nbsp;</span></p>

<p><span style="font-weight: 400;">Google Cloud Pub/Sub is a powerful tool that allows you to decouple your systems, ensuring seamless and efficient message exchanges.</span></p>

<h3><span style="font-weight: 400;">What is Google Cloud Pub/Sub?</span></h3>

<p><span style="font-weight: 400;">Google Cloud Pub/Sub is a messaging service that enables you to send and receive messages between independent applications.&nbsp;</span></p>

<p><span style="font-weight: 400;">Think of it as a reliable postal service for your data, making sure that messages get from point A to point B without any hiccups. This service is crucial for building scalable, flexible systems that can handle high volumes of data with ease.</span></p>

<h3><span style="font-weight: 400;">Why Use Pub/Sub?</span></h3>

<p><span style="font-weight: 400;">Pub/Sub helps achieve this by decoupling the producer (sender) and consumer (receiver) components of your applications.&nbsp;</span></p>

<p><span style="font-weight: 400;">This means that each part of your system can work independently, leading to better performance and easier maintenance.</span></p>

<p><span style="font-weight: 400;">Our guide will walk you through everything you need to know about creating and managing Pub/Sub resources, publishing and receiving messages, and handling common issues.&nbsp;</span></p>

<p><span style="font-weight: 400;">By the end of this blog, you'll have a solid understanding of how to leverage Google Cloud Pub/Sub to optimize your system's communication.</span></p>

<p><span style="font-weight: 400;">Ready to dive in? Let's get started with an overview of how to set up and manage your Pub/Sub resources effectively.</span></p>

<h2><span style="font-weight: 400;">Creating and Managing Pub/Sub Resources</span></h2>

<p><span style="font-weight: 400;">Before you can start sending and receiving messages, you need to understand the basics: topics and subscriptions.</span></p>

<p><strong>Pub/Sub Topics</strong><span style="font-weight: 400;"> are like bulletin boards where your messages get posted. When you publish a message, it goes to a topic.&nbsp;</span></p>

<p><span style="font-weight: 400;">Think of it as a central hub where all your messages live, waiting for subscribers to pick them up. Creating a topic is straightforward and can be done using the Google Cloud Console or API.</span></p>

<h3><span style="font-weight: 400;">Creating a Pub/Sub Topic</span></h3>

<p><span style="font-weight: 400;">To create a Pub/Sub topic:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Using the Console:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Go to the Google Cloud Console.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Navigate to Pub/Sub.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Click on "Create Topic."</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Enter a name for your topic and click "Create."</span></li>

</ul>

<li style="font-weight: 400;"><strong>Using the API:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">If you prefer using code, you can create a topic with a simple API call:</span></li>

</ul>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">from</span><span style="font-weight: 400;"> google.cloud </span><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> pubsub_v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">publisher = pubsub_v1.PublisherClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">project_id = </span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">topic_id = </span><span style="font-weight: 400;">"your-topic-id"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">topic_path = publisher.topic_path(project_id, topic_id)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">topic = publisher.create_topic(request={</span><span style="font-weight: 400;">"name"</span><span style="font-weight: 400;">: topic_path})</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Topic created: </span><span style="font-weight: 400;">{topic.name}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Understanding Pub/Sub Subscriptions</span></h3>

<p><span style="font-weight: 400;">Once you have your topics set up, you'll need subscriptions to pull messages. A </span><strong>Pub/Sub Subscription</strong><span style="font-weight: 400;"> is like a subscription to a magazine. You subscribe to a topic, and you receive all the messages published to that topic.&nbsp;</span></p>

<p><span style="font-weight: 400;">This ensures that your applications get the data they need without missing anything.</span></p>

<h3><span style="font-weight: 400;">Creating a Pub/Sub Subscription</span></h3>

<p><span style="font-weight: 400;">To create a subscription:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Using the Console:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Go to the Pub/Sub section in the Google Cloud Console.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Click on your topic.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Select "Create Subscription."</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Enter a name for your subscription and configure the settings as needed.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Click "Create."</span></li>

</ul>

<li style="font-weight: 400;"><strong>Using the API:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Here&rsquo;s how you can create a subscription via API:</span></li>

</ul>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">from</span><span style="font-weight: 400;"> google.cloud </span><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> pubsub_v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber = pubsub_v1.SubscriberClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">topic_path = subscriber.topic_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-topic-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-subscription-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription = subscriber.create_subscription(</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; request={</span><span style="font-weight: 400;">"name"</span><span style="font-weight: 400;">: subscription_path, </span><span style="font-weight: 400;">"topic"</span><span style="font-weight: 400;">: topic_path}</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Subscription created: </span><span style="font-weight: 400;">{subscription.name}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">With your topics and subscriptions in place, you're all set to start publishing and receiving messages. In the next section, we&rsquo;ll dive into how to publish messages to a Pub/Sub topic effectively.</span></p>

<h2><span style="font-weight: 400;">Publishing Messages</span></h2>

<p><span style="font-weight: 400;">Now that you have your topics and subscriptions set up, it&rsquo;s time to start sending messages. Publishing messages to a Pub/Sub topic is straightforward and can be done using various methods.</span></p>

<h3><span style="font-weight: 400;">Structure of a Pub/Sub Message</span></h3>

<p><span style="font-weight: 400;">A Pub/Sub message consists of two main parts: data and attributes.&nbsp;</span></p>

<p><span style="font-weight: 400;">The data is the payload you want to send, while attributes are optional key-value pairs that can provide additional context about the message.</span></p>

<h3><span style="font-weight: 400;">Methods to Publish Messages</span></h3>

<p><span style="font-weight: 400;">You can publish messages to a Pub/Sub topic using the Google Cloud Console or the API. Here&rsquo;s how:</span></p>

<p><strong>Using the Console</strong></p>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Go to the Google Cloud Console.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Navigate to Pub/Sub and select your topic.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Click on "Publish message."</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Enter your message data and any attributes.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Click "Publish."</span></li>

</ol>

<p><strong>Using the API</strong></p>

<p><span style="font-weight: 400;">To publish messages programmatically, you can use the Pub/Sub API. Here&rsquo;s a quick example in Python:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">from</span><span style="font-weight: 400;"> google.cloud </span><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> pubsub_v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">publisher = pubsub_v1.PublisherClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">topic_path = publisher.topic_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-topic-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">data = </span><span style="font-weight: 400;">"Your message data"</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"># Data must be a bytestring</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">data = data.encode(</span><span style="font-weight: 400;">"utf-8"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">future = publisher.publish(topic_path, data, attribute_key=</span><span style="font-weight: 400;">"attribute_value"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Published message ID: </span><span style="font-weight: 400;">{future.result()}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Practical Examples and Code Snippets</span></h3>

<p><span style="font-weight: 400;">Here are a few practical examples to help you get started with publishing messages:</span></p>

<ul>

<li><strong><strong>Simple Message:</strong></strong></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">data = </span><span style="font-weight: 400;">"Hello, Pub/Sub!"</span><span style="font-weight: 400;">.encode(</span><span style="font-weight: 400;">"utf-8"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">future = publisher.publish(topic_path, data)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Published message ID: </span><span style="font-weight: 400;">{future.result()}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li><strong><strong>Message with Attributes:</strong></strong></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">data = </span><span style="font-weight: 400;">"Message with attributes"</span><span style="font-weight: 400;">.encode(</span><span style="font-weight: 400;">"utf-8"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">future = publisher.publish(topic_path, data, origin=</span><span style="font-weight: 400;">"python-sample"</span><span style="font-weight: 400;">, username=</span><span style="font-weight: 400;">"gcp_user"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Published message ID: </span><span style="font-weight: 400;">{future.result()}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li><strong><strong>Batching Messages:</strong></strong></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><strong>for</strong><strong> i </strong><strong>in</strong><strong> range(</strong><strong>10</strong><strong>):</strong><strong><br /></strong><strong>&nbsp; &nbsp; data = </strong><strong>f"Message </strong><strong>{i}</strong><strong>"</strong><strong>.encode(</strong><strong>"utf-8"</strong><strong>)</strong><strong><br /></strong><strong>&nbsp; &nbsp; future = publisher.publish(topic_path, data)</strong><strong><br /></strong><strong>&nbsp; &nbsp; print(</strong><strong>f"Published message ID: </strong><strong>{future.result()}</strong><strong>"</strong><strong>)</strong></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By following these methods, you can effectively publish messages to your Pub/Sub topics, ensuring your data is transmitted efficiently and reliably.</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore how to receive and handle messages from your Pub/Sub subscriptions.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Receiving Messages</span></h2>

<p><span style="font-weight: 400;">With your messages published, it's time to set up how you'll receive them.&nbsp;</span></p>

<p><span style="font-weight: 400;">Pub/Sub offers two delivery mechanisms: Pull and Push.&nbsp;</span></p>

<p><span style="font-weight: 400;">Understanding these methods and how to implement them is crucial for efficient message handling.</span></p>

<h3><span style="font-weight: 400;">Pull vs Push Delivery Mechanisms</span></h3>

<p><strong>Pull Delivery:</strong><span style="font-weight: 400;"> In pull delivery, your application initiates requests to the Pub/Sub service to retrieve messages. This method gives you control over when to receive messages and how many to process at a time.</span></p>

<p><strong>Push Delivery:</strong><span style="font-weight: 400;"> In push delivery, Pub/Sub automatically sends messages to a specified endpoint as they become available. This method is useful for real-time processing but requires your application to be always ready to handle incoming messages.</span></p>

<h3><span style="font-weight: 400;">Pulling Messages from a Pub/Sub Subscription</span></h3>

<p><span style="font-weight: 400;">For most applications, pulling messages is a flexible and common approach. Here&rsquo;s how you can do it:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Using the Console:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Go to the Pub/Sub section in the Google Cloud Console.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Select your subscription.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Click on "Pull."</span></li>

</ul>

<li style="font-weight: 400;"><strong>Using the API:</strong></li>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Here&rsquo;s a simple example using Python:</span></li>

</ul>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">from</span><span style="font-weight: 400;"> google.cloud </span><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> pubsub_v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber = pubsub_v1.SubscriberClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-subscription-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">callback</span><span style="font-weight: 400;">(message):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Received message: </span><span style="font-weight: 400;">{message.data}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; message.ack()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Listening for messages on </span><span style="font-weight: 400;">{subscription_path}</span><span style="font-weight: 400;">..."</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">try</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; streaming_pull_future.result()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">except</span><span style="font-weight: 400;"> KeyboardInterrupt:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; streaming_pull_future.cancel()</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Using Pub/Sub PullSensor for Message Retrieval and Acknowledgment</span></h3>

<p><span style="font-weight: 400;">The Pub/Sub PullSensor simplifies message retrieval and acknowledgment by managing these tasks for you.&nbsp;</span></p>

<p><span style="font-weight: 400;">This ensures that your application remains responsive and efficient.</span></p>

<h3><span style="font-weight: 400;">Deferrable Mode for Asynchronous Message Pulling</span></h3>

<p><span style="font-weight: 400;">Deferrable mode allows your application to handle message pulling asynchronously.&nbsp;</span></p>

<p><span style="font-weight: 400;">This mode is beneficial for applications that need to process messages without blocking other tasks.</span></p>

<h3><span style="font-weight: 400;">Practical Examples and Code Snippets for Pulling Messages</span></h3>

<p><span style="font-weight: 400;">Here are some practical examples to help you get started with pulling messages:</span></p>

<p><strong>Simple Pull Example:</strong><strong><br /></strong><span style="font-weight: 400;"><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">response = subscriber.pull(subscription_path, max_messages=</span><span style="font-weight: 400;">10</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">for</span><span style="font-weight: 400;"> msg </span><span style="font-weight: 400;">in</span><span style="font-weight: 400;"> response.received_messages:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Received message: </span><span style="font-weight: 400;">{msg.message.data}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; subscriber.acknowledge(subscription_path, \[msg.ack_id])</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Handling Multiple Messages:</strong><strong><br /><br /></strong></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">response = subscriber.pull(subscription_path, max_messages=</span><span style="font-weight: 400;">10</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">for</span><span style="font-weight: 400;"> msg </span><span style="font-weight: 400;">in</span><span style="font-weight: 400;"> response.received_messages:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Received message: </span><span style="font-weight: 400;">{msg.message.data}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; subscriber.acknowledge(subscription_path, \[msg.ack_id])</span></p>

</td>

</tr>

</tbody>

</table>

<ol>

<li style="font-weight: 400;"><strong>Asynchronous Pulling:</strong><strong><br /><br /></strong></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> asyncio</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">async</span> <span style="font-weight: 400;">def</span> <span style="font-weight: 400;">callback</span><span style="font-weight: 400;">(message):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Received message: </span><span style="font-weight: 400;">{message.data}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; message.ack()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">async</span> <span style="font-weight: 400;">def</span> <span style="font-weight: 400;">pull_messages</span><span style="font-weight: 400;">():</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">async</span> <span style="font-weight: 400;">with</span><span style="font-weight: 400;"> subscriber:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; future = subscriber.subscribe(subscription_path, callback=callback)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">await</span><span style="font-weight: 400;"> future</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">asyncio.run(pull_messages())</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By setting up efficient message retrieval, your application can handle incoming data seamlessly.&nbsp;</span></p>

<p><span style="font-weight: 400;">In the next section, we'll dive into how to handle and acknowledge these messages properly.</span></p>

<h2><span style="font-weight: 400;">Handling Pub/Sub Messages</span></h2>

<p><span style="font-weight: 400;">Once you&rsquo;ve received your messages, the next step is to handle them effectively.&nbsp;</span></p>

<p><span style="font-weight: 400;">Proper message handling ensures that your system runs smoothly and that messages are processed and acknowledged correctly.</span></p>

<h3><span style="font-weight: 400;">Acknowledging Receipt of Messages</span></h3>

<p><span style="font-weight: 400;">Acknowledging messages is crucial to prevent them from being redelivered. When you pull a message from a Pub/Sub subscription, you need to acknowledge it to inform the service that the message has been received and processed.</span></p>

<p><strong>Example in Python:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">from</span><span style="font-weight: 400;"> google.cloud </span><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> pubsub_v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">callback</span><span style="font-weight: 400;">(message):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Received message: </span><span style="font-weight: 400;">{message.data}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; message.ack()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber = pubsub_v1.SubscriberClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-subscription-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Listening for messages on </span><span style="font-weight: 400;">{subscription_path}</span><span style="font-weight: 400;">..."</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">try</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; streaming_pull_future.result()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">except</span><span style="font-weight: 400;"> KeyboardInterrupt:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; streaming_pull_future.cancel()</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">This simple callback function acknowledges each message as it is received.</span></p>

<h3><span style="font-weight: 400;">Handling Message Delivery Retries</span></h3>

<p><span style="font-weight: 400;">Sometimes, messages might not be processed correctly the first time. Pub/Sub automatically retries message delivery until it receives an acknowledgment.&nbsp;</span></p>

<p><span style="font-weight: 400;">To handle these retries effectively, ensure your application can process duplicate messages or implement idempotency.</span></p>

<p><strong>Idempotency Tip:</strong></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Ensure that processing the same message multiple times does not produce different results. Use unique message IDs to track processed messages.</span></li>

</ul>

<h3><span style="font-weight: 400;">Ensuring Message Delivery and Acting on Messages</span></h3>

<p><span style="font-weight: 400;">To ensure message delivery, it's essential to handle any errors that occur during processing. This involves logging errors and potentially implementing a retry mechanism within your application.</span></p>

<p><strong>Example:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">callback</span><span style="font-weight: 400;">(message):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">try</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;"># Process the message</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Processing message: </span><span style="font-weight: 400;">{message.data}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;"># Acknowledge the message after successful processing</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; message.ack()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">except</span><span style="font-weight: 400;"> Exception </span><span style="font-weight: 400;">as</span><span style="font-weight: 400;"> e:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Failed to process message: </span><span style="font-weight: 400;">{e}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;"># Log the error and handle the failure</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;"># Optionally, you could also requeue the message or send it to a dead-letter queue</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Practical Examples and Code Snippets</span></h3>

<p><span style="font-weight: 400;">Here are a few practical examples to illustrate proper message handling:</span></p>

<ol>

<li style="font-weight: 400;"><strong>Basic Acknowledgment:</strong><span style="font-weight: 400;"><br /><br /></span></li>

</ol>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">callback</span><span style="font-weight: 400;">(message):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Received message: </span><span style="font-weight: 400;">{message.data}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; message.ack()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber = pubsub_v1.SubscriberClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-subscription-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future.result()</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li><strong><strong>Handling Duplicate Messages:</strong><strong><br /><br /></strong></strong></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">processed_messages = set()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">callback</span><span style="font-weight: 400;">(message):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> message.message_id </span><span style="font-weight: 400;">in</span><span style="font-weight: 400;"> processed_messages:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Duplicate message detected: </span><span style="font-weight: 400;">{message.message_id}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">else</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Processing message: </span><span style="font-weight: 400;">{message.data}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; processed_messages.add(message.message_id)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; message.ack()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber = pubsub_v1.SubscriberClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-subscription-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future.result()</span></p>

</td>

</tr>

</tbody>

</table>

<ul>

<li><strong><strong>Error Handling and Retries:</strong><strong><br /><br /></strong></strong></li>

</ul>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">callback</span><span style="font-weight: 400;">(message):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">try</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Processing message: </span><span style="font-weight: 400;">{message.data}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;"># Simulate processing logic</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">if</span><span style="font-weight: 400;"> some_condition_fails:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">raise</span><span style="font-weight: 400;"> Exception(</span><span style="font-weight: 400;">"Processing failed"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; message.ack()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">except</span><span style="font-weight: 400;"> Exception </span><span style="font-weight: 400;">as</span><span style="font-weight: 400;"> e:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Error processing message: </span><span style="font-weight: 400;">{e}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;"># Log the error for further investigation</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber = pubsub_v1.SubscriberClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-subscription-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future.result()</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By following these examples and guidelines, you can ensure that your Pub/Sub messages are handled efficiently and reliably.&nbsp;</span></p>

<p><span style="font-weight: 400;">In the next section, we&rsquo;ll explore how to manage your subscriptions and topics, including creating and deleting them.</span></p>

<h2><span style="font-weight: 400;">Managing Subscriptions and Topics</span></h2>

<p><span style="font-weight: 400;">Efficiently managing your Pub/Sub subscriptions and topics is crucial for maintaining a clean and organized messaging system.&nbsp;</span></p>

<p><span style="font-weight: 400;">This section will guide you through the processes of creating, deleting, and maintaining your subscriptions and topics.</span></p>

<h3><span style="font-weight: 400;">Deleting a Pub/Sub Subscription</span></h3>

<p><span style="font-weight: 400;">Over time, you may need to delete subscriptions that are no longer in use. This helps keep your system organized and ensures that unused subscriptions don&rsquo;t consume unnecessary resources.</span></p>

<p><strong>Using the Console</strong></p>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Go to the Google Cloud Console.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Navigate to Pub/Sub.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Select the subscription you want to delete.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Click on "Delete."</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Confirm the deletion.</span></li>

</ol>

<p><strong>Using the API</strong></p>

<p><span style="font-weight: 400;">Here&rsquo;s how you can delete a subscription using the Pub/Sub API in Python:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">from</span><span style="font-weight: 400;"> google.cloud </span><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> pubsub_v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber = pubsub_v1.SubscriberClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-subscription-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber.delete_subscription(request={</span><span style="font-weight: 400;">"subscription"</span><span style="font-weight: 400;">: subscription_path})</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Subscription deleted: </span><span style="font-weight: 400;">{subscription_path}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Practical Examples and Code Snippets for Deleting Subscriptions</span></h3>

<p><strong>Deleting a Single Subscription:</strong><span style="font-weight: 400;"><br /><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">from</span><span style="font-weight: 400;"> google.cloud </span><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> pubsub_v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber = pubsub_v1.SubscriberClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-subscription-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber.delete_subscription(request={</span><span style="font-weight: 400;">"subscription"</span><span style="font-weight: 400;">: subscription_path})</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Subscription deleted: </span><span style="font-weight: 400;">{subscription_path}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Batch Deleting Subscriptions:</strong><strong><br /></strong><span style="font-weight: 400;"><br /></span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">subscription_ids = [</span><span style="font-weight: 400;">"sub-id-1"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"sub-id-2"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"sub-id-3"</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">for</span><span style="font-weight: 400;"> sub_id </span><span style="font-weight: 400;">in</span><span style="font-weight: 400;"> subscription_ids:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, sub_id)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; subscriber.delete_subscription(request={</span><span style="font-weight: 400;">"subscription"</span><span style="font-weight: 400;">: subscription_path})</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Subscription deleted: </span><span style="font-weight: 400;">{subscription_path}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Deleting a Pub/Sub Topic</span></h3>

<p><span style="font-weight: 400;">Similarly, you may need to delete topics that are no longer needed. This helps keep your system streamlined and efficient.</span></p>

<p><strong>Using the Console</strong></p>

<ol>

<li style="font-weight: 400;"><span style="font-weight: 400;">Go to the Google Cloud Console.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Navigate to Pub/Sub.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Select the topic you want to delete.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Click on "Delete."</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Confirm the deletion.</span></li>

</ol>

<p><strong>Using the API</strong></p>

<p><span style="font-weight: 400;">Here&rsquo;s how you can delete a topic using the Pub/Sub API in Python:</span></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">from</span><span style="font-weight: 400;"> google.cloud </span><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> pubsub_v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">publisher = pubsub_v1.PublisherClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">topic_path = publisher.topic_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-topic-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">publisher.delete_topic(request={</span><span style="font-weight: 400;">"topic"</span><span style="font-weight: 400;">: topic_path})</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Topic deleted: </span><span style="font-weight: 400;">{topic_path}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Practical Examples and Code Snippets for Deleting Topics</span></h3>

<p><strong>Deleting a Single Topic:</strong><span style="font-weight: 400;"><br /><br /></span></p>

<table>

<tbody>

<tr style="height: 113.969px;">

<td style="height: 113.969px;">

<p><span style="font-weight: 400;">from</span><span style="font-weight: 400;"> google.cloud </span><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> pubsub_v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">publisher = pubsub_v1.PublisherClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">topic_path = publisher.topic_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-topic-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">publisher.delete_topic(request={</span><span style="font-weight: 400;">"topic"</span><span style="font-weight: 400;">: topic_path})</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Topic deleted: </span><span style="font-weight: 400;">{topic_path}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<p><strong>Batch Deleting Topics:</strong><strong><br /><br /></strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">topic_ids = [</span><span style="font-weight: 400;">"topic-id-1"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"topic-id-2"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"topic-id-3"</span><span style="font-weight: 400;">]</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">for</span><span style="font-weight: 400;"> topic_id </span><span style="font-weight: 400;">in</span><span style="font-weight: 400;"> topic_ids:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; topic_path = publisher.topic_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, topic_id)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; publisher.delete_topic(request={</span><span style="font-weight: 400;">"topic"</span><span style="font-weight: 400;">: topic_path})</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Topic deleted: </span><span style="font-weight: 400;">{topic_path}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By following these steps and using the provided code snippets, you can effectively manage your Pub/Sub subscriptions and topics. Keeping your messaging infrastructure clean and well-maintained ensures optimal performance and resource utilization.</span></p>

<p><span style="font-weight: 400;">In the next section, we'll cover common issues and troubleshooting tips to help you manage your Pub/Sub environment more effectively.&nbsp;</span></p>

<h2><strong>Common Issues and Troubleshooting</strong></h2>

<p><span style="font-weight: 400;">Managing a Pub/Sub environment can come with its own set of challenges. This section will help you address common issues and provide troubleshooting tips to ensure your Pub/Sub system runs smoothly.</span></p>

<h3><span style="font-weight: 400;">Ensuring Message Delivery to All Instances</span></h3>

<p><span style="font-weight: 400;">One common issue is ensuring that all instances of your application receive the messages they need. This can be particularly challenging in a distributed system.</span></p>

<p><strong>Tip: Use Durable Subscribers</strong></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Durable subscribers ensure that messages are not lost if an instance goes down temporarily. This can be set up by creating subscriptions with proper acknowledgment handling.</span></li>

</ul>

<h3><span style="font-weight: 400;">Verification that All Instances Have Received Messages</span></h3>

<p><span style="font-weight: 400;">To verify that all instances have received messages, you need a reliable tracking mechanism.</span></p>

<p><strong>Tip: Implement Logging and Monitoring</strong></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Use logging to track message receipt and acknowledgment.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Implement monitoring tools like Google Cloud Monitoring to keep an eye on message flow and identify any anomalies.</span></li>

</ul>

<p><strong>Example:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">callback</span><span style="font-weight: 400;">(message):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Received message: </span><span style="font-weight: 400;">{message.data}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;"># Log the message receipt</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; log_message_receipt(message.message_id)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; message.ack()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">log_message_receipt</span><span style="font-weight: 400;">(message_id):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;"># Implement logging logic here</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">pass</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber = pubsub_v1.SubscriberClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-subscription-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future.result()</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Strategies for Handling Undelivered Messages</span></h3>

<p><span style="font-weight: 400;">Sometimes, messages might not get delivered due to various reasons, such as network issues or application downtime.</span></p>

<p><strong>Tip: Use Dead Letter Topics</strong></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Configure dead letter topics to capture undelivered messages. This allows you to review and reprocess them as needed.</span></li>

</ul>

<p><strong>Example:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">from</span><span style="font-weight: 400;"> google.cloud </span><span style="font-weight: 400;">import</span><span style="font-weight: 400;"> pubsub_v1</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber = pubsub_v1.SubscriberClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-subscription-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">dead_letter_topic_path = subscriber.topic_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-dead-letter-topic-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">dead_letter_policy = pubsub_v1.types.DeadLetterPolicy(</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; dead_letter_topic=dead_letter_topic_path,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; max_delivery_attempts=</span><span style="font-weight: 400;">5</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription = subscriber.update_subscription(</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; request={</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">"subscription"</span><span style="font-weight: 400;">: {</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">"name"</span><span style="font-weight: 400;">: subscription_path,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">"dead_letter_policy"</span><span style="font-weight: 400;">: dead_letter_policy,</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; },</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;">"update_mask"</span><span style="font-weight: 400;">: {</span><span style="font-weight: 400;">"paths"</span><span style="font-weight: 400;">: [</span><span style="font-weight: 400;">"dead_letter_policy"</span><span style="font-weight: 400;">]},</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; }</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">print(</span><span style="font-weight: 400;">f"Dead letter policy set for subscription: </span><span style="font-weight: 400;">{subscription.name}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span></p>

</td>

</tr>

</tbody>

</table>

<h3><span style="font-weight: 400;">Challenges and Solutions in Setting Up Reliable Message Receipt</span></h3>

<p><span style="font-weight: 400;">Setting up reliable message receipt can be complex, but following best practices can help mitigate common issues.</span></p>

<p><strong>Tip: Use Proper Acknowledgment and Error Handling</strong></p>

<ul>

<li style="font-weight: 400;"><span style="font-weight: 400;">Always acknowledge messages after processing to prevent re-delivery.</span></li>

<li style="font-weight: 400;"><span style="font-weight: 400;">Implement error handling to manage processing failures and retries effectively.</span></li>

</ul>

<p><strong>Example:</strong></p>

<table>

<tbody>

<tr>

<td>

<p><span style="font-weight: 400;">def</span> <span style="font-weight: 400;">callback</span><span style="font-weight: 400;">(message):</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">try</span><span style="font-weight: 400;">:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Processing message: </span><span style="font-weight: 400;">{message.data}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;"># Process the message</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; message.ack()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; </span><span style="font-weight: 400;">except</span><span style="font-weight: 400;"> Exception </span><span style="font-weight: 400;">as</span><span style="font-weight: 400;"> e:</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; print(</span><span style="font-weight: 400;">f"Error processing message: </span><span style="font-weight: 400;">{e}</span><span style="font-weight: 400;">"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">&nbsp; &nbsp; &nbsp; &nbsp; </span><span style="font-weight: 400;"># Log the error and handle the failure</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscriber = pubsub_v1.SubscriberClient()</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">subscription_path = subscriber.subscription_path(</span><span style="font-weight: 400;">"your-project-id"</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">"your-subscription-id"</span><span style="font-weight: 400;">)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">streaming_pull_future.result()</span></p>

</td>

</tr>

</tbody>

</table>

<p><span style="font-weight: 400;">By implementing these strategies and following the provided examples, you can address common issues and ensure your Pub/Sub environment remains reliable and efficient.</span></p>

<p><span style="font-weight: 400;">In the next section, we'll summarize the key functions and management tips for using Pub/Sub effectively.&nbsp;</span></p>

<h2><span style="font-weight: 400;">Conclusion</span></h2>

<p><span style="font-weight: 400;">Google Cloud Pub/Sub is a powerful tool that enables efficient, scalable messaging for your applications. By understanding and implementing best practices for creating and managing Pub/Sub resources, publishing and receiving messages, and handling common issues, you can ensure your system remains robust and responsive.</span></p>

<p><span style="font-weight: 400;">While this guide focuses on the setup and use of Pub/Sub, it's also important to have effective monitoring and visualization tools in place to ensure your messaging infrastructure runs smoothly. OpenObserve (O2) offers comprehensive observability features, including powerful dashboards and alert configurations, which can enhance your ability to maintain the health and performance of your Pub/Sub setup.</span></p>

<p><span style="font-weight: 400;">For more information and to get started with OpenObserve, visit our</span><a href="https://openobserve.ai"> <span style="font-weight: 400;">website</span></a><span style="font-weight: 400;">, check out our</span><a href="https://github.com/openobserve/openobserve"> <span style="font-weight: 400;">GitHub repository</span></a><span style="font-weight: 400;">, or</span><a href="https://cloud.openobserve.ai"> <span style="font-weight: 400;">sign up here</span></a><span style="font-weight: 400;"> to start using OpenObserve today.&nbsp;</span></p>
