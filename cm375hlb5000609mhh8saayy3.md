---
title: "Create a Streaming Data Lake on Cloud Storage: Challenge Lab - ARC110"
seoTitle: "Create a Streaming Data Lake on Cloud Storage: Challenge Lab - ARC110"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Thu Nov 07 2024 10:13:59 GMT+0000 (Coordinated Universal Time)
cuid: cm375hlb5000609mhh8saayy3
slug: create-a-streaming-data-lake-on-cloud-storage-challenge-lab-arc110
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730974399761/9a672bc0-8fd5-4a3e-91ef-073d5b81c3b4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1730974418678/1812202e-bbaa-4b3e-a575-8959214e6a55.png
tags: create-a-streaming-data-lake-on-cloud-storage-challenge-lab-arc110, arc110

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Setup**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## **Challenge scenario**

You are just starting your junior data engineer role. So far you have been helping teams create and manage data using Pub/Sub, Dataflow, and Cloud Storage.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with some of their initial work on a live messages streaming project. You have been asked to assist the team with a simulation of streaming live messages into Cloud Storage using Pub/Sub and Dataflow; you receive the following request to complete the following tasks:

* Use the command line to create up a Pub/Sub topic.
    
* Use the command line to create a Cloud Scheduler job to publish messages to Pub/Sub on a regular interval.
    
* Use the command line to create a Cloud Storage bucket as the output destination for a Dataflow job.
    
* Use the command line to create and run a Dataflow job to stream data from a Pub/Sub topic to a Cloud Storage bucket, then check the output files in Cloud Storage bucket.
    

Some standards you should follow:

* Ensure that any needed APIs (such as Dataflow) are successfully enabled.
    
* Create all resources in the `us-east4` region, unless otherwise directed.
    
* Complete the challenge lab in cloud shell instead of console, unless otherwise directed.
    

**Note:** Make sure to disable and enable the Dataflow API before executing the dataflow pipeline.

Each task is described in detail below, good luck!

## **Task 1. Create a Pub/Sub topic**

* Use the command line to create a Pub/Sub topic called `topic1`.
    

Click *Check my progress* to verify the objective.

Create a Pub/Sub topic

Check my progress

## **Task 2. Create a Cloud Scheduler job**

1. Use the command line to create an App Engine app for your project.
    
2. Use the command line to create a Cloud Scheduler job in this project to publish messages at one-minute intervals to the Pub/Sub topic in task 1. Message body: `Hello World!`.
    
3. Use the command line to start the scheduler job.
    

Click here for hint!

Click *Check my progress* to verify the objective.

Create a Cloud Scheduler job

Check my progress

## **Task 3. Create a Cloud Storage bucket**

* Use the command line to create a Cloud Storage bucket with the following bucket name: `qwiklabs-gcp-03-d1904edf4f56-bucket`
    

Click *Check my progress* to verify the objective.

Create a Cloud Storage bucket

Check my progress

## **Task 4. Run a Dataflow pipeline to stream data from a Pub/Sub topic to Cloud Storage**

1. Use the command line to create and run a Dataflow job to stream data from a Pub/Sub topic to a Cloud Storage bucket.
    

* Use Java or Python script as your choice. Sample code available on GitHub pages: [java-docs-samples](https://github.com/GoogleCloudPlatform/java-docs-samples/blob/HEAD/pubsub/streaming-analytics/src/main/java/com/examples/pubsub/streaming/PubSubToGcs.java), [python-docs-samples](https://github.com/GoogleCloudPlatform/python-docs-samples/blob/main/pubsub/streaming-analytics/PubSubToGCS.py).
    
* Use the Pub/Sub topic that you created in a task 1.
    
* Use the Cloud Storage bucket that you created in task 3 as the output location.
    
* Group messages based on a fixed time window of 2 minutes.
    

2. Use the command line to check which files have been written out in Cloud Storage.
    

Click *Check my progress* to verify the objective.

Run a Dataflow pipeline to stream data from a Pub/Sub topic to Cloud Storage

---

## **Solution of Lab**

%[https://youtu.be/tdMIj1aOunM] 

```apache
export TOPIC_ID=""
export MESSAGE=""
export REGION=""
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1730974338540/9099da67-ec7a-41ed-b876-8d9d8d00f612.png align="center")

```apache
curl -LO raw.githubusercontent.com/Techcps/ARC/master/Create%20a%20Streaming%20Data%20Lake%20on%20Cloud%20Storage%3A%20Challenge%20Lab/techcps110.sh
sudo chmod +x techcps110.sh
./techcps110.sh
```