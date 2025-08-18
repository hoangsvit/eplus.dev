---
title: "Pub/Sub: Qwik Start - Console - GSP096"
seoTitle: "Pub/Sub: Qwik Start - Console - GSP096"
seoDescription: "Pub/Sub is a messaging service for exchanging event data among applications and services. A producer of data publishes messages to a Pub/Sub topic. A consum"
datePublished: Fri Jul 26 2024 09:56:19 GMT+0000 (Coordinated Universal Time)
cuid: clz2j2amc000l09l755aefshv
slug: pub-sub-qwik-start-console-gsp096
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746861292676/b5d1a14b-9e69-4280-8bed-85d82e4e9ee1.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1746861316778/be0c8284-8791-43ef-929b-04c435730de6.png
tags: console, pubsub-qwik-start-console-gsp096, gsp096, pubsub-qwik-start-console

---

## **Overview**

Pub/Sub is a messaging service for exchanging event data among applications and services. A producer of data publishes messages to a Pub/Sub topic. A consumer creates a subscription to that topic. Subscribers either pull messages from a subscription or are configured as webhooks for push subscriptions. Every subscriber must acknowledge each message within a configurable window of time.

### What you'll learn

* Set up a topic to hold data.
    
* Subscribe to a topic to access the data.
    
* Publish and then consume messages with a pull subscriber.
    

## **Task 1. Setting up Pub/Sub**

To use Pub/Sub, you create a topic to hold data and a subscription to access data published to the topic.

1. From the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) go to **Pub/Sub** &gt; **Topics**.
    

![Navigation menu](https://cdn.qwiklabs.com/05QvzKmMdHjrkOQWl%2BQkVUnk6F%2BHcRyjrAEwb22cFVg%3D align="left")

2. Click **Create topic**.
    

![Create topic button](https://cdn.qwiklabs.com/%2B5DjzluijKP1xciKT%2BmsugTk9wWkuM9Tf87XVq4Cc9s%3D align="left")

3. The topic must have a unique name. For this lab, name your topic `MyTopic`. In the **Create a topic** dialog:
    

* For **Topic ID**, type `MyTopic`.
    
* Leave other fields at their default value.
    
* Click **CREATE**.
    

![Create a topic dialog box](https://cdn.qwiklabs.com/GQ4LSNE3EzT2b3PjQfbMm4THZqmN7ZUZv62d%2BeC%2Frxw%3D align="left")

You've created a topic.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a Cloud Pub/Sub topic, you will see an assessment score.

Create a Pub/Sub topic.

## **Task 2. Add a subscription**

Now you'll make a subscription to access the topic.

1. Click **Topics** in the left panel to return to the **Topics** page. For the topic you just made click the three dot icon &gt; **Create subscription**.
    

![Topics page](https://cdn.qwiklabs.com/M7kafaoF4hMtk4uftSZ9QYgMZfw0O3a5RXZyZ3s02m0%3D align="left")

2. In the **Add subscription to topic** dialog:
    

* Type a name for the subscription, such as `MySub`
    
* Set the Delivery Type to **Pull**.
    
* Leave all other options at the default values.
    

![Add subscription to topic dialog box](https://cdn.qwiklabs.com/hW3IVEU2yyh7fkvEBN3vZQbli9GE%2B9o6qwtdnV3zcSA%3D align="left")

* Click **Create**.
    

Your subscription is listed in the Subscription list.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a subscription for Cloud Pub/Sub topic, you will see an assessment score.

Add a subscription.

## **Task 3. Test your understanding**

Below are multiple choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

**A publisher application creates and sends messages to a \_\_\_\_. Subscriber applications create a \_\_\_\_ to a topic to receive messages from it.**

* subscription, subscription
    
* topic, topic
    
* topic, subscription
    
* subscription, topic
    

**Cloud Pub/Sub is an asynchronous messaging service designed to be highly reliable and scalable.**

* true
    
* false
    

## **Task 4. Publish a message to the topic**

1. Navigate back to **pub/sub** &gt; **Topics** and open **MyTopics** page.
    
2. In the Topics details page, click **Messages** tab and then click **Publish Message**.
    
3. Enter `Hello World` in the **Message** field and click **Publish**.
    

![Hello World in the Message field](https://cdn.qwiklabs.com/0%2BhHA1%2FVpDM1qNJRIDJOQYhpk9RVHs%2BG0kv4ZKTqsl4%3D align="left")

## **Task 5. View the message**

To view the message, use the subscription (`MySub`) to pull the message (`Hello World`) from the topic (`MyTopic`).

* Enter the following command in Cloud Shell:
    

```powershell
gcloud pubsub subscriptions pull --auto-ack MySub
```

Copied!content\_copy

The message appears in the DATA field of the command output.

![Command output](https://cdn.qwiklabs.com/WVjqo0kupgrSq%2BbVhfcw9deiHZyvGq3%2FFbngcnYL%2B3s%3D align="left")

You created a Pub/Sub topic, published to the topic, created a subscription, then used the subscription to pull data from the topic.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=cAoJDu1BcJA&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

```powershell
gcloud pubsub topics create myTopic
gcloud  pubsub subscriptions create --topic myTopic MySub
```