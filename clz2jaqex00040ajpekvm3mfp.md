---
title: "Cloud Scheduler: Qwik Start - GSP401"
seoTitle: "Cloud Scheduler: Qwik Start - GSP401"
seoDescription: "Cloud Scheduler lets you set up scheduled units of work to be executed at defined times or regular intervals. These work units are commonly known as cron jo"
datePublished: Fri Jul 26 2024 10:02:53 GMT+0000 (Coordinated Universal Time)
cuid: clz2jaqex00040ajpekvm3mfp
slug: cloud-scheduler-qwik-start-gsp401
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744776418676/4135121e-da44-405e-8eca-122a6dd471da.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744776394872/33ce2b30-caed-48b6-b343-be8a81696f67.png
tags: cloud-scheduler-qwik-start-gsp401, gsp401, cloud-scheduler-qwik-start

---

## **Overview**

Cloud Scheduler lets you set up scheduled units of work to be executed at defined times or regular intervals. These work units are commonly known as *cron jobs*. Typical use cases might include sending out a report email on a daily basis, updating cached data every 10 minutes, or updating summary information once an hour. You can automate everything, including retries in case of failure to reduce manual intervention.

Each cron job created using Cloud Scheduler is sent to a *target*, where the work for the task is accomplished. The target must be one of the following types:

* Publicly available HTTP/S endpoints
    
* Pub/Sub topics
    
* App Engine HTTP/S applications
    

In this lab you will learn how to:

* Create a Cloud Scheduler job.
    
* Set a recurring schedule for a job.
    
* Specify a Cloud Pub/Sub topic as the job target.
    
* Run a job.
    
* Verify success.
    

## **Task 1. Enable Cloud Scheduler API**

1. Click on **APIs & services** &gt; **Library**:
    

![The highlighted navigation path to the library option](https://cdn.qwiklabs.com/%2Fm%2FgnO7%2B%2FmxupPbVbP3Wqagt%2B1plFPD66tROxyugnHg%3D align="left")

2. In the search bar, type in "scheduler", then click on the Cloud Scheduler API tile.
    
3. Click **Enable**.
    

## **Task 2. Set up Cloud Pub/Sub**

1. Create a Pub/Sub topic to use as a target for your cron job:
    

```powershell
gcloud pubsub topics create cron-topic
```

Copied!content\_copy

This command creates a topic called `cron-topic`.

2. Make a note of the name, you will use it later.
    
3. Create a Cloud Pub/Sub subscription:
    

```powershell
gcloud pubsub subscriptions create cron-sub --topic cron-topic
```

Copied!content\_copy

You need this to view the results of your job.

Click **Check my progress** to verify the objective.

Set up Cloud Pub/Sub

**Check my progress**

## **Task 3. Create a job**

1. Visit the **Cloud Scheduler** page in the console - you can use the **Navigation menu** or the search bar:
    

![The Cloud Scheduler option selected in the Integration services section of the navigation menu](https://cdn.qwiklabs.com/DTugJbmEAJsm%2BqsLUJfUuXb5MSZj3pH5cQ4qM1Uhm8Y%3D align="left")

2. Click the **Create job** button.
    
3. Give your job a name and optionally add a description.
    
4. Specify the **frequency** for your job, using the [unix-cron](http://man7.org/linux/man-pages/man5/crontab.5.html) format for "every minute":
    

```powershell
* * * * *
```

Copied!content\_copy

5. Select your Timezone. Click **Continue**.
    
6. In the **Target type** field, select **Pub/Sub** topic from the dropdown menu.
    
7. Under **Select a Cloud Pub/Sub topic** dropdown select the topic you created earlier (`cron-topic`).
    
8. Add a **Message body** string to be sent to your Cloud Pub/Sub target:
    

![The Message body field populated with the following text: hello cron!](https://cdn.qwiklabs.com/vLITlyS4A0P15avC9xy%2BILfsADs2IqbEeqxWnKzge7s%3D align="left")

9. Click **Create**.
    

You now have a job that sends a message to your Cloud Pub/Sub topic every minute. Wait a minute or 2 for the job to get succeeded.

## **Task 4. Verify the results in Cloud Pub/Sub**

1. To verify that your Cloud Pub/Sub topic is receiving messages from your job, invoke the following command:
    

```powershell
 gcloud pubsub subscriptions pull cron-sub --limit 5
```

Copied!content\_copy

2. View the results.
    

You should see output that looks similar to the following:

![Five rows of data in the output](https://cdn.qwiklabs.com/fCndvQH35j7hGyOaHUdhqZRzPxF4iAc9Dv6uD%2FFvP8A%3D align="left")

3. If you don't see 5 responses, run the command again until you do.
    

## **Task 5. Test your knowledge**

Test your knowledge about Google Cloud Platform by answering this question:

You can trigger an App Engine app, send a message via Cloud Pub/Sub, or hit an arbitrary HTTP endpoint running on Compute Engine, Google Kubernetes Engine, or on-premises with your Cloud Scheduler job.TrueFalse

---

## Answer of Lab

%[https://www.youtube.com/watch?v=amb3jDRlYZs&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

```powershell
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP401/lab.sh
sudo chmod +x lab.sh
./lab.sh
```