---
title: "Get Started with Pub/Sub: Challenge Lab - ARC113"
seoTitle: "Get Started with Pub/Sub: Challenge Lab - ARC113"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Fri Jul 26 2024 13:29:31 GMT+0000 (Coordinated Universal Time)
cuid: clz2qogju000209l269lp4kt0
slug: get-started-with-pub-sub-challenge-lab-arc113
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722000521196/d4e91078-0a5b-4b4d-8970-31acff692a3f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722000547023/0204a2ae-84ba-40fb-901a-1e94b28b49bf.png

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Task 1**

**Set up Cloud Pub/Sub**

1\. Create a Cloud Pub/Sub topic '**cloud-pubsub-topic**'.

2\. Create a Cloud Pub/Sub subscription '**cloud-pubsub-subscription**' for a given topic '**cloud-pubsub-topic**'.

Click **Check my progress** to verify the objective.

Verify Task

**Check my progress**

## **Task 2**

**Create a Cloud Scheduler job**

1\. Create a Cloud Scheduler job using the following details:

| Parameter | Configuration |
| --- | --- |
| Name | cron-scheduler-job |
| Location | **Region from the Lab Details panel which is located at the left side of the lab instructions** |
| Schedule | Sends a message to your Cloud Pub/Sub topic every minute |
| Topic | **cron-job-pubsub-topic** |
| Message body | Hello World! |

<table><tbody><tr><td colspan="1" rowspan="1"><p><strong>Note: </strong>In case you're unable to view pre-created resources as per the task description,"your Google Cloud resources are still being provisioned, please refresh the page and try again in a few minutes." If you do, just wait a short time and reload your page.</p></td></tr></tbody></table>

Click **Check my progress** to verify the objective.

Verify Task

**Check my progress**

## **Task 3**

**Verify the results in Cloud Pub/Sub**

1\. For this task, you need to verify that Cloud Pub/Sub is able to pull the messages you have published via Cloud Scheduler with the following command:

```apache
gcloud pubsub subscriptions pull cron-job-pubsub-subscription --limit 5
```

<table><tbody><tr><td colspan="1" rowspan="1"><p><strong>Note: </strong>In case you're unable to view pre-created resources as per the task description,"your Google Cloud resources are still being provisioned, please refresh the page and try again in a few minutes." If you do, just wait a short time and reload your page.</p></td></tr></tbody></table>

Click **Check my progress** to verify the objective.

Verify Task

**Check my progress**

---

## Answer of Lab

%[https://www.youtube.com/watch?v=d9NLxIzdh5I&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722000280022/0e5abf11-d475-4635-8e04-5e3ef4c78552.png align="center")

```apache
export REGION=us-east1
```

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Get%20Started%20with%20PubSub%20Challenge%20Lab/quicklabarc113.sh
sudo chmod +x quicklabarc113.sh
./quicklabarc113.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722000310993/de398d82-5699-401c-8f0d-b4f88dee622f.png align="center")

## **Congratulations!**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722000451726/48f9242a-40ed-43e4-988f-96744ea9734a.png align="center")