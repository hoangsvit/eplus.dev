---
title: "Pub/Sub Lite: Qwik Start - GSP832"
seoTitle: "Pub/Sub Lite: Qwik Start - GSP832"
seoDescription: "Complementing Pub/Sub, Pub/Sub Lite is a zonal service for messaging systems with predictable traffic patterns. If you publish 1 MiB-1 GiB of messages per s"
datePublished: Fri Jul 26 2024 13:13:14 GMT+0000 (Coordinated Universal Time)
cuid: clz2q3iji000e09ml2eikee81
slug: pub-sub-lite-qwik-start-gsp832
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721999212085/3e6240c1-6b42-4a81-bb83-c1e64e0f718b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721999569970/7a147b94-7090-4992-8fdb-aacf05f8de42.png

---

## **Overview**

Complementing Pub/Sub, [Pub/Sub Lite](https://cloud.google.com/pubsub/docs/choosing-pubsub-or-lite) is a zonal service for messaging systems with predictable traffic patterns. If you publish 1 MiB-1 GiB of messages per second, Pub/Sub Lite is a low cost option for high-volume event ingestion.

Publishers send messages to Lite topics and subscribers receive messages from Lite subscriptions. Lite topics and Lite subscriptions are zonal resources that must be in the same Cloud project and zone. For a list of zones that Pub/Sub Lite supports, refer to [Pub/Sub Lite locations](https://cloud.google.com/pubsub/lite/docs/locations).

In this lab you will learn how to:

* Create Lite topics and Lite subscriptions using the Cloud Console.
    
* Send and receive messages using the Pub/Sub Lite client library for Python.
    

## **Task 1. Create a Lite Topic**

To create a Lite topic with the Cloud Console, follow these steps:

1. In the Cloud Console, go to **Navigation menu** &gt; **Pub/Sub** &gt; **Lite Topics** page.
    
2. Click **Create Lite topic**.
    
3. Select **Regional Lite topic** to choose the region and then select **Zonal Lite topic** to choose the zone (this lab uses `us-west1`), then click **Continue**.
    
4. In the **Name** section, enter `my-lite-topic` as the Lite topic ID. The Lite topic name includes the Lite topic ID, the zone, and the project number.
    
5. Click **Continue**.
    
6. Make sure to uncheck **Attach to a reservation** checkbox.
    
7. Click **Create**.
    

Click *Check my progress* to verify the objective.

Create a Lite Topic

**Check my progress**

## **Task 2. Create a Lite Subscription**

To create a Lite subscription with Cloud Console, follow these steps:

1. Click on **Lite Subscriptions** in the left menu.
    
2. Click **Create Lite subscription**.
    
3. In the **Lite subscription ID** field, enter `my-lite-subscription`.
    
4. In **Select a Lite resources** select a Lite topic to receive messages, you created in the last step.
    
5. In the **Delivery requirement** section, select **Deliver messages after stored**.
    
6. Click **Create**.
    

The Lite subscription is in the same zone as the Lite topic.

Click *Check my progress* to verify the objective.

Create a Lite Subscription

**Check my progress**

## **Task 3. Send messages**

Send messages to the Lite topic using the following publisher application. Using the Cloud Shell Editor or the editor of your choice, create a file called `send_`[`messages.py`](http://messages.py) and add the following script, then:

1. **Uncomment** all steps in the TODO section.
    
2. Replace `project_number` with the project number you can see in the Lite topic and subscription name in the Console.
    
3. If you used a different `cloud_region` and `zone_id`, update with your information:
    

```python
from google.cloud.pubsublite.cloudpubsub import PublisherClient
from google.cloud.pubsublite.types import (
    CloudRegion,
    CloudZone,
    MessageMetadata,
    TopicPath,
)

# TODO(developer):
# project_number = 1122334455
# cloud_region = "us-west1"
# zone_id = "a"
# topic_id = "my-lite-topic"
# num_messages = 100

location = CloudZone(CloudRegion(cloud_region), zone_id)
topic_path = TopicPath(project_number, location, topic_id)

# PublisherClient() must be used in a `with` block or have __enter__() called before use.
with PublisherClient() as publisher_client:
    data = "Hello world!"
    api_future = publisher_client.publish(topic_path, data.encode("utf-8"))
    # result() blocks. To resolve API futures asynchronously, use add_done_callback().
    message_id = api_future.result()
    publish_metadata = MessageMetadata.decode(message_id)
    print(
        f"Published a message to partition {publish_metadata.partition.value} and offset {publish_metadata.cursor.offset}."
    )
```

The publisher sends 100 messages to a Lite topic and prints the number of messages that the Pub/Sub Lite service receives.

## **Task 4. Receive messages**

Receive messages from the Lite subscription using the following subscriber application. Using the Cloud Shell Editor or the editor of your choice, create a file called `receive_`[`messages.py`](http://messages.py) and add the following script, then

1. **Uncomment** all steps in the TODO section.
    
2. Replace `project_number` with the Project number you can see in the Lite topic and subscription name in the Console.
    
3. If you used a different `cloud_region` and `zone_id`, update with your information:
    

```python
from concurrent.futures._base import TimeoutError
from google.cloud.pubsublite.cloudpubsub import SubscriberClient
from google.cloud.pubsublite.types import (
    CloudRegion,
    CloudZone,
    FlowControlSettings,
    SubscriptionPath,
)

# TODO(developer):
# project_number = 1122334455
# cloud_region = "us-west1"
# zone_id = "a"
# subscription_id = "my-lite-subscription"
# timeout = 90

location = CloudZone(CloudRegion(cloud_region), zone_id)
subscription_path = SubscriptionPath(project_number, location, subscription_id)
# Configure when to pause the message stream for more incoming messages based on the
# maximum size or number of messages that a single-partition subscriber has received,
# whichever condition is met first.
per_partition_flow_control_settings = FlowControlSettings(
    # 1,000 outstanding messages. Must be >0.
    messages_outstanding=1000,
    # 10 MiB. Must be greater than the allowed size of the largest message (1 MiB).
    bytes_outstanding=10 * 1024 * 1024,
)

def callback(message):
    message_data = message.data.decode("utf-8")
    print(f"Received {message_data} of ordering key {message.ordering_key}.")
    message.ack()

# SubscriberClient() must be used in a `with` block or have __enter__() called before use.
with SubscriberClient() as subscriber_client:

    streaming_pull_future = subscriber_client.subscribe(
        subscription_path,
        callback=callback,
        per_partition_flow_control_settings=per_partition_flow_control_settings,
    )

    print(f"Listening for messages on {str(subscription_path)}...")

    try:
        streaming_pull_future.result(timeout=timeout)
    except TimeoutError or KeyboardInterrupt:
        streaming_pull_future.cancel()
        assert streaming_pull_future.done()
```

After the subscriber receives a message, the subscriber prints the message ID and the message data.

4. Now run both scripts:
    

```apache
python3 send_messages.py
python3 receive_messages.py
```

You will see output in Cloud Shell that looks like this:

```powershell
Received Hello world! of ordering key .
```

You will also be able to monitor activity on the Lite Topics and Lite Subscriptions pages in the Cloud Console.

## **Task 5. Clean up**

Although all resources will be destroyed when you end this lab, it's good practice to clean up resources you don't need to avoid charges.

1. In the Cloud Console, go to the **Lite Topics** page.
    
2. Click **my-lite-topic**.
    
3. On the **Lite topic details** page, click **Delete**.
    
4. In the field that appears, type delete to confirm that you want to delete the Lite topic.
    
5. Click **Delete**.
    

---

### Answer of Lab

%[https://www.youtube.com/watch?v=ILNGB4031Lw&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1721999450418/f9eb8118-cc20-4a04-a393-79e5d9b2a8de.png align="center")

```powershell
export REGION=
```

```powershell
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/PubSub%20Lite%20Qwik%20Start/quicklabgsp832.sh
sudo chmod +x quicklabgsp832.sh
./quicklabgsp832.sh
```