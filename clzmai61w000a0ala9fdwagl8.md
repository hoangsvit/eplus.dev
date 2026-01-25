---
title: "Pub/Sub: Qwik Start - Python - GSP094"
seoTitle: "Pub/Sub: Qwik Start - Python - GSP094"
seoDescription: "The Pub/Sub service allows applications to exchange messages reliably, quickly, and asynchronously. To accomplish this, a data producer publishes messages t"
datePublished: Fri Aug 09 2024 05:52:07 GMT+0000 (Coordinated Universal Time)
cuid: clzmai61w000a0ala9fdwagl8
slug: pub-sub-qwik-start-python-gsp094
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747464471465/10de32e8-50cd-4297-9fea-a4084038c714.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747464498760/aeb24ac9-52e1-4460-a41e-58b913558f04.png
tags: python, pubsub-qwik-start-python-gsp094, gsp094, pubsub-qwik-start-python, pubsub-qwik-start

---

## **Overview**

The Pub/Sub service allows applications to exchange messages reliably, quickly, and asynchronously. To accomplish this, a data producer publishes messages to a Cloud Pub/Sub topic. A subscriber client then creates a subscription to that topic and consumes messages from the subscription. Cloud Pub/Sub persists messages that could not be delivered reliably for up to seven days.

In this lab, you will learn how to get started publishing messages with Pub/Sub using the Python client library.

**What you'll do**

In this lab, you'll do the following:

* Learn the basics of Pub/Sub
    
* Create, delete, and list Pub/Sub topics and subscriptions
    
* Publish messages to a topic.
    
* Use a pull subscriber to output individual topic messages.
    

---

## **Task 1. Create a virtual environment**

Python virtual environments are used to isolate package installation from the system.

1. Install the `virtualenv` environment:
    

```apache
sudo apt-get install -y virtualenv
```

2. Build the virtual environment:
    

```apache
python3 -m venv venv
```

3. Activate the virtual environment.
    

```apache
source venv/bin/activate
```

## **Task 2. Install the client library**

1. Run the following to install the client library:
    

```apache
pip install --upgrade google-cloud-pubsub
```

2. Get the sample code by cloning a GitHub repository:
    

```apache
git clone https://github.com/googleapis/python-pubsub.git
```

3. Navigate to the directory:
    

```apache
cd python-pubsub/samples/snippets
```

## **Task 3. Pub/Sub - the Basics**

Pub/Sub is an asynchronous global messaging service. There are three terms in Pub/Sub that appear often: *topics*, *publishing*, and *subscribing*.

A topic is a shared string that allows applications to connect with one another through a common thread.

Publishers push (or publish) a message to a Pub/Sub topic. Subscribers will then make a *subscription* to that thread, where they will either pull messages from the topic or configure webhooks for push subscriptions. Every subscriber must acknowledge each message within a configurable window of time.

In sum, a publisher creates and sends messages to a topic and a subscriber creates a subscription to a topic to receive messages from it.

**Pub/Sub in Google CLoud**

Pub/Sub comes preinstalled in Cloud Shell, so there are no installations or configurations required to get started with this service. In this lab you use Python to create the topic, subscriber, and then view the message. You use a gcloud command to publish the message to the topic.

## **Task 4. Create a topic**

To publish data to Pub/Sub you create a topic and then configure a publisher to the topic.

1. In Cloud Shell, your Project ID should automatically be stored in the environment variable `GOOGLE_CLOUD_PROJECT`:
    

```apache
echo $GOOGLE_CLOUD_PROJECT
```

2. Ensure the output is the same as the Project ID in your CONNECTION DETAILS.
    

[`publisher.py`](http://publisher.py) is a script that demonstrates how to perform basic operations on topics with the Cloud Pub/Sub API. View the content of publisher script:

```apache
cat publisher.py
```

**Note:** Alternatively, you can use the shell editors that are installed on Cloud Shell, such as nano or vim or use the Cloud Shell code editor to view `python-pubsub/samples/snippets/`[`publisher.py`](http://publisher.py).

3. For information about the publisher script:
    

```apache
python publisher.py -h
```

*Example output:*

```apache
usage: publisher.py [-h]
                    project
                    {list,create,delete,publish,publish-with-custom-attributes,publish-with-futures,publish-with-error-handler,publish-with-batch-settings}
                    ...

This application demonstrates how to perform basic operations on topics
with the Cloud Pub/Sub API.

For more information, see the README.md under /pubsub and the documentation
at https://cloud.google.com/pubsub/docs.

positional arguments:
  project               Your Google Cloud project ID
  {list,create,delete,publish,publish-with-custom-attributes,publish-with-futures,publish-with-error-handler,publish-with-batch-settings}
    list                Lists all Pub/Sub topics in the given project.
    create              Create a new Pub/Sub topic.
    delete              Deletes an existing Pub/Sub topic.
    publish             Publishes multiple messages to a Pub/Sub topic.
    publish-with-custom-attributes
                        Publishes multiple messages with custom attributes to
                        a Pub/Sub topic.
    publish-with-futures
                        Publishes multiple messages to a Pub/Sub topic and
                        prints their message IDs.
    publish-with-error-handler
                        Publishes multiple messages to a Pub/Sub topic with an
                        error handler.
    publish-with-batch-settings
                        Publishes multiple messages to a Pub/Sub topic with
                        batch settings.

optional arguments:
  -h, --help            show this help message and exit
```

4. Run the publisher script to create Pub/Sub Topic:
    

```apache
python publisher.py $GOOGLE_CLOUD_PROJECT create MyTopic
```

*Example output:*

```apache
Topic created: name: "projects/qwiklabs-gcp-fe27729bc161fb22/topics/MyTopic"
```

**Test Completed Task**

Click **Check my progress** to verify your performed task. If you have successfully created a Cloud Pub/Sub topic, you will see an assessment score.

Create a topic.

**Check my progress**

5. This command returns a list of all Pub/Sub topics in a given project:
    

```apache
python publisher.py $GOOGLE_CLOUD_PROJECT list
```

*Example output:*

```apache
name: "projects/qwiklabs-gcp-fe27729bc161fb22/topics/MyTopic"
```

You can also view the topic you just made in the Cloud Console.

6. Navigate to **Navigation menu** &gt; **Pub/Sub** &gt; **Topics**.
    

You should see `MyTopic`.

## **Task 5. Create a subscription**

1. Create a Pub/Sub subscription for topic with [`subscriber.py`](http://subscriber.py) script:
    

```apache
python subscriber.py $GOOGLE_CLOUD_PROJECT create MyTopic MySub
```

**Test Completed Task**

Click **Check my progress** to verify your performed task. If you have successfully created a Cloud Pub/Sub subscription, you will see an assessment score.

Create a subscription.

**Check my progress**

2. This command returns a list of subscribers in given project:
    

```apache
python subscriber.py $GOOGLE_CLOUD_PROJECT list-in-project
```

You'll see only one subscription because you've made only one subscription.

*Example output:*

```apache
projects/qwiklabs-gcp-7877af129f04d8b3/subscriptions/MySub
```

3. Check out the subscription you just made in the console. In the left pane, click **Subscriptions**. You should see the subscription name and other details.
    
4. For information about the `subscriber` script:
    

```apache
python subscriber.py -h
```

*Output:*

```apache
usage: subscriber.py [-h]
                     project
                     {list_in_topic,list_in_project,create,create-push,delete,update,receive,receive-custom-attributes,receive-flow-control,receive-synchronously,listen_for_errors}
                     ...

This application demonstrates how to perform basic operations on
subscriptions with the Cloud Pub/Sub API.

For more information, see the README.md under /pubsub and the documentation
at https://cloud.google.com/pubsub/docs.

positional arguments:
  project               Your Google Cloud project ID
  {list_in_topic,list_in_project,create,create-push,delete,update,receive,receive-custom-attributes,receive-flow-control,receive-synchronously,listen_for_errors}
    list_in_topic       Lists all subscriptions for a given topic.
    list_in_project     Lists all subscriptions in the current project.
    create              Create a new pull subscription on the given topic.
    create-push         Create a new push subscription on the given topic.
    delete              Deletes an existing Pub/Sub topic.
    update              Updates an existing Pub/Sub subscription's push
                        endpoint URL. Note that certain properties of a
                        subscription, such as its topic, are not modifiable.
    receive             Receives messages from a pull subscription.
    receive-custom-attributes
                        Receives messages from a pull subscription.
    receive-flow-control
                        Receives messages from a pull subscription with flow
                        control.
    receive-synchronously
                        Pulling messages synchronously.
    listen_for_errors   Receives messages and catches errors from a pull
                        subscription.

optional arguments:
  -h, --help            show this help message and exit
```

## **Task 6. Publish messages**

Now that you've set up `MyTopic` (the topic) and a subscription to `MyTopic` (`MySub`), use `gcloud` commands to publish a message to `MyTopic`.

1. Publish the message "Hello" to `MyTopic`:
    

```apache
gcloud pubsub topics publish MyTopic --message "Hello"
```

2. Publish a few more messages to `MyTopic`—run the following commands (replacing &lt;YOUR NAME&gt; with your name and &lt;FOOD&gt; with a food you like to eat):
    

```apache
gcloud pubsub topics publish MyTopic --message "Publisher's name is <YOUR NAME>"
```

```apache
gcloud pubsub topics publish MyTopic --message "Publisher likes to eat <FOOD>"
```

```apache
gcloud pubsub topics publish MyTopic --message "Publisher thinks Pub/Sub is awesome"
```

## **Task 7. View messages**

Now that you've published messages to MyTopic, pull and view the messages using MySub.

1. Use MySub to pull the message from MyTopic:
    

```apache
python subscriber.py $GOOGLE_CLOUD_PROJECT receive MySub
```

*Example output:*

```apache
Listening for messages on projects/qwiklabs-gcp-7877af129f04d8b3/subscriptions/MySub
Received message: Message {
  data: 'Publisher thinks Pub/Sub is awesome'
  attributes: {}
}
Received message: Message {
  data: 'Hello'
  attributes: {}
}
Received message: Message {
  data: "Publisher's name is Harry"
  attributes: {}
}
Received message: Message {
  data: 'Publisher likes to eat cheese'
  attributes: {}
}
```

2. Click **Ctrl**+**c** to stop listening.
    

## **Task 8. Test your understanding**

Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

Google Cloud Pub/Sub service allows applications to exchange messages reliably, quickly, and asynchronously.

* True
    
* False
    

A \_\_\_\_\_ is a shared string that allows applications to connect with one another.

* topic
    
* message
    
* subscription
    

---

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP094/lab.sh
source lab.sh
```

---

### Manual

%[https://youtu.be/04rlCx6SlNo]