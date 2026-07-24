---
title: "Implement Event-Driven Messaging and Automation Workflows: Challenge Lab - ARC113"
seoTitle: "Implement Event-Driven Messaging and Automation Workflows: Challenge Lab - ARC113"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-07-24T07:44:16.405Z
cuid: cmrymwm4f00000ajfde0c1zxk
slug: implement-event-driven-messaging-and-automation-workflows-challenge-lab-arc113
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/341ddb33-7b9d-4ee8-afe0-791a11930e1c.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/68c7470c-cebd-4a24-82f4-26ef7b49d63d.png
tags: arc113, implement-event-driven-messaging-and-automation-workflows-challenge-lab-arc113, implement-event-driven-messaging-and-automation-workflows-challenge-lab

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

**Note:** Once the lab environment has been fully provisioned, the tasks will become visible. The tasks that are assigned to you are independent, so you are free to perform the tasks in any order you want.

## **Challenge scenario**

You're a junior cloud engineer who is just starting out in your career. So far you have been helping teams create and manage Google Cloud resources.

You are expected to have the skills and knowledge for the tasks that follow.

### Your challenge

Cloud Pub/Sub is a fully-managed, asynchronous messaging service that allows you to distribute messages to subscribers in real time via independent applications.

For this challenge, you may get task to use Cloud Scheduler to configure scheduled units of work, which are known as cron jobs. Once scheduled, Cloud Scheduler can then publish your messages to the relevant Cloud Pub/Sub topic for distribution to end users.

In addition to that, you may get task to create Pub/Sub Schema, Snapshot and need to setup the Pub/Sub Lite.

Each task is described in detail below, good luck!

## **Task 1**

***Dynamically selected task will show up here...***

Click **Check my progress** to verify the objective.

Verify Task

## **Task 2**

***Dynamically selected task will show up here...***

Click **Check my progress** to verify the objective.

Verify Task

## **Task 3**

***Dynamically selected task will show up here...***

Click **Check my progress** to verify the objective.

Verify Task

* * *

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=rIEQsK1cGX0] 

**Run the following in CloudShell**

```apache
export REGION=$(gcloud compute project-info describe --format="value(commonInstanceMetadata.items[google-compute-default-region])")
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755490076694/ab70f62e-b309-4c4d-8d20-f11fc24f45df.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755490116297/4f1d86e8-cddd-4352-b9e0-3bdc752b21be.png align="center")

### **Form 1:**

* * *

*   **Task 1. Set up Cloud Pub/Sub.**
    
*   **Task 2. Create a Cloud Scheduler job.**
    
*   **Task 3. Verify the results in Cloud Pub/Sub.**
    

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC113/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Get%20Started%20with%20PubSub%3A%20Challenge%20Lab/abhishek1.sh
sudo chmod +x abhishek1.sh
./abhishek1.sh
```

### **form 2:**

* * *

*   **Task 1. Create Pub/Sub schema.**
    
*   **Task 2. Create Pub/Sub topic using schema.**
    
*   **Task 3. Create a trigger cloud function with Pub/Sub topic**
    

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Get%20Started%20with%20PubSub%3A%20Challenge%20Lab/abhishek2.sh
sudo chmod +x abhishek2.sh
./abhishek2.sh
```

### **form 3:**

* * *

*   **Task 1. Publish a message to the topic.**
    
*   **Task 2. View the message.**
    
*   **Task 3. Create a Pub/Sub Snapshot for Pub/Sub topic.**
    

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Get%20Started%20with%20PubSub%3A%20Challenge%20Lab/abhishek3.sh
sudo chmod +x abhishek3.sh
./abhishek3.sh
```