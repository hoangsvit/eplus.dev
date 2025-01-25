---
title: "Pub/Sub: Qwik Start - Command Line - GSP095"
seoTitle: "Pub/Sub: Qwik Start - Command Line - GSP095"
seoDescription: "Pub/Sub is a messaging service for exchanging event data among applications and services. By decoupling senders and receivers, it allows for secure and high"
datePublished: Sat Jan 25 2025 08:34:56 GMT+0000 (Coordinated Universal Time)
cuid: cm6bxqitg000q08l2ci35bn7w
slug: pubsub-qwik-start-command-line-gsp095
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737794051683/b20c1538-86b2-4b04-8554-b5d97efd0364.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1737794084675/600ba539-0ad3-4f4a-9db2-4615b2c151f0.png
tags: pubsub-qwik-start-command-line-gsp095, pubsub-qwik-start-command-line, gsp095

---

## **Overview**

Pub/Sub is a messaging service for exchanging event data among applications and services. By decoupling senders and receivers, it allows for secure and highly available communication between independently written applications. Pub/Sub delivers low-latency/durable messaging, and is commonly used by developers in implementing asynchronous workflows, distributing event notifications, and streaming data from various processes or devices.

### What you'll learn

In this lab, you will do the following:

* Create, delete, and list Pub/Sub topics and subscriptions
    
* Publish messages to a topic
    
* How to use a pull subscriber
    

### Prerequisites

This is an **introductory** level lab. This assumes little or no prior experience with Pub/Sub, and it will teach you the basics of setting up and using this Google Cloud service.

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    * The Open Google Cloud console button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-04-2743555ca746@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    FKoGwVqv7jcx
    ```
    
    You can also find the Password in the Lab Details pane.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-d21ea0ce9297`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-d21ea0ce9297
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-2743555ca746@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-02-d21ea0ce9297
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Pub/Sub basics**

As stated earlier, Pub/Sub is an asynchronous global messaging service. There are three terms in Pub/Sub that appear often: `topics`, `publishing`, and `subscribing`.

* A `topic` is a shared string that allows applications to connect with one another through a common thread.
    
* Publishers push (or `publish`) a message to a Cloud Pub/Sub topic.
    
* Subscribers make a "`subscription`" to a topic where they will either pull messages from the subscription or configure webhooks for push subscriptions. Every subscriber must acknowledge each message within a configurable window of time.
    

To sum it up, a producer publishes messages to a topic and a consumer creates a subscription to a topic to receive messages from it.

## **Task 1. Pub/Sub topics**

Pub/Sub comes preinstalled in Cloud Shell, so there are no installations or configurations required to get started with this service.

1. Run the following command to create a topic called `myTopic`:
    

```apache
gcloud pubsub topics create myTopic
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will be granted an assessment score.

Create a Pub/Sub topic.

Check my progress

2. For good measure, create two more topics; one called `Test1` and the other called `Test2`:
    

```apache
gcloud pubsub topics create Test1
```

```apache
gcloud pubsub topics create Test2
```

3. To see the three topics you just created, run the following command:
    

```apache
gcloud pubsub topics list
```

Your output should resemble the following:

```apache
name: projects/qwiklabs-gcp-3450558d2b043890/topics/myTopic
---
name: projects/qwiklabs-gcp-3450558d2b043890/topics/Test2
---
name: projects/qwiklabs-gcp-3450558d2b043890/topics/Test1
```

4. Time to clean up. Delete `Test1` and `Test2` by running the following commands:
    

```apache
gcloud pubsub topics delete Test1
```

```apache
gcloud pubsub topics delete Test2
```

5. Run the `gcloud pubsub topics list` command one more time to verify the topics were deleted:
    

```apache
gcloud pubsub topics list
```

You should get the following output:

```apache
---
name: projects/qwiklabs-gcp-3450558d2b043890/topics/myTopic
```

## **Task 2. Pub/Sub subscriptions**

Now that you're comfortable creating, viewing, and deleting topics, time to work with subscriptions.

1. Run the following command to create a subscription called `mySubscription` to topic `myTopic`:
    

```apache
gcloud  pubsub subscriptions create --topic myTopic mySubscription
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will be granted an assessment score.

Create Pub/Sub Subscription.

Check my progress

2. Add another two subscriptions to `myTopic`. Run the following commands to make `Test1` and `Test2` subscriptions:
    

```apache
gcloud  pubsub subscriptions create --topic myTopic Test1
```

```apache
gcloud  pubsub subscriptions create --topic myTopic Test2
```

3. Run the following command to list the subscriptions to myTopic:
    

```apache
gcloud pubsub topics list-subscriptions myTopic
```

Your output should resemble the following:

```apache
---
  projects/qwiklabs-gcp-3450558d2b043890/subscriptions/Test2
---
  projects/qwiklabs-gcp-3450558d2b043890/subscriptions/Test1
---
  projects/qwiklabs-gcp-3450558d2b043890/subscriptions/mySubscription
```

**Test your understanding**

Below are multiple choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

To receive messages published to a topic, you must create a subscription to that topic.TrueFalse

4. Now delete the `Test1` and `Test2` subscriptions. Run the following commands:
    

```apache
gcloud pubsub subscriptions delete Test1
```

```apache
gcloud pubsub subscriptions delete Test2
```

5. See if the `Test1` and `Test2` subscriptions were deleted. Run the `list-subscriptions` command one more time:
    

```apache
gcloud pubsub topics list-subscriptions myTopic
```

You should get the following output:

```apache
---
  projects/qwiklabs-gcp-3450558d2b043890/subscriptions/mySubscription
```

## **Task 3. Pub/Sub publishing and pulling a single message**

Next you'll learn how to publish a message to a Pub/Sub topic.

1. Run the following command to publish the message `"hello"` to the topic you created previously (`myTopic`):
    

```apache
gcloud pubsub topics publish myTopic --message "Hello"
```

2. Publish a few more messages to `myTopic`. Run the following commands (replacing `<YOUR NAME>` with your name and `<FOOD>` with a food you like to eat):
    

```apache
gcloud pubsub topics publish myTopic --message "Publisher's name is <YOUR NAME>"
```

```apache
gcloud pubsub topics publish myTopic --message "Publisher likes to eat <FOOD>"
```

```apache
gcloud pubsub topics publish myTopic --message "Publisher thinks Pub/Sub is awesome"
```

Next, use the `pull` command to get the messages from your topic. The pull command is subscription based, meaning it should work because earlier you set up the subscription `mySubscription` to the topic `myTopic`.

3. Use the following command to pull the messages you just published from the Pub/Sub topic:
    

```apache
gcloud pubsub subscriptions pull mySubscription --auto-ack
```

Your output should resemble the following:

![Three-column table with the headings: Data, Message_ID, and Attributes.The Data column contains the following: Publisher likes to eat <FOOD>.](https://cdn.qwiklabs.com/FcMleiHQqsyGgRvCBnPr3%2Bl57MJxmGdwmssqrXx8dWQ%3D align="left")

What's going on here? You published 4 messages to your topic, but only 1 was outputted.

Now is an important time to mention a couple features of the `pull` command that often trip developers up:

* **Using the pull command without any flags will output only one message, even if you are subscribed to a topic that has more held in it.**
    
* **Once an individual message has been outputted from a particular subscription-based pull command, you cannot access that message again with the pull command.**
    

4. To see what the second bullet is talking about, run the last command three more times. You will see that it will output the other messages you published before.
    
5. Now, run the command a 4th time. You'll get the following output (since there were none left to return):
    

```apache
gcpstaging20394_student@cloudshell:~ (qwiklabs-gcp-3450558d2b043890)$ gcloud pubsub subscriptions pull mySubscription --auto-ack
Listed 0 items.
```

In the last section, you will learn how to pull multiple messages from a topic with a `flag`.

## **Task 4. Pub/Sub pulling all messages from subscriptions**

Since you pulled all of the messages from your topic in the last example, populate `myTopic` with a few more messages.

1. Run the following commands:
    

```apache
gcloud pubsub topics publish myTopic --message "Publisher is starting to get the hang of Pub/Sub"
```

```apache
gcloud pubsub topics publish myTopic --message "Publisher wonders if all messages will be pulled"
```

```apache
gcloud pubsub topics publish myTopic --message "Publisher will have to test to find out"
```

2. Add a `flag` to your command so you can output all three messages in one request.
    

You may have not noticed, but you have actually been using a flag this entire time: the `--auto-ack` part of the `pull` command is a flag that has been formatting your messages into the neat boxes that you see your pulled messages in.

`limit` is another flag that sets an upper limit on the number of messages to pull.

3. Wait a minute to let the topics get created. Run the pull command with the `limit` flag:
    

```apache
gcloud pubsub subscriptions pull mySubscription --auto-ack --limit=3
```

Your output should match the following:

![Three-column table with the headings: Data, Message_ID, and Attributes. The Data column contains three lines of data.](https://cdn.qwiklabs.com/vybBa1Zg%2Fr%2FIPWCt%2F0pksM3LYboFWmxZggrFuL7MTDg%3D align="left")

Now you know how to add flags to a Pub/Sub command to output a larger pool of messages. You are well on your way to becoming a Pub/Sub master.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=dGZv09mWsQI&ab_channel=QUICKGCPLAB] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/PubSub%20Qwik%20Start%20-%20Command%20Line/gsp095.sh
sudo chmod +x gsp095.sh
./gsp095.sh
```