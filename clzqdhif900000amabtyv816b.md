---
title: "Arcade Hero: Enter the Cloud Function Pub/Sub - ARC237"
seoTitle: "Arcade Hero: Enter the Cloud Function Pub/Sub - ARC237"
seoDescription: "In this lab you will learn the fundamentals of Cloud Functions using Google Cloud.

If you are new to Cloud Functions or looking for an overview of how to g"
datePublished: Mon Aug 12 2024 02:26:40 GMT+0000 (Coordinated Universal Time)
cuid: clzqdhif900000amabtyv816b
slug: arcade-hero-enter-the-cloud-function-pub-sub-arc237
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723430467127/a987e796-308a-4e28-a693-849128a187a1.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723430456556/ff0c0db0-08db-4427-873a-0c61032823ae.png
tags: arcade-hero-enter-the-cloud-function-pubsub-arc237

---

## **Overview**

In this lab you will learn the fundamentals of `Cloud Functions` using Google Cloud.

If you are new to `Cloud Functions` or looking for an overview of how to get started, you are in the right place. Read on to learn about the specifics of this lab and areas that you will get hands-on practice with.

In this lab learn:

* The use cases for `Cloud Functions`
    
* How to implement `Cloud Functions`
    

### Prerequisites

Over the course of this lab the following elements are required:

* `Cloud Functions`
    

## **Task 1. Access the Ticket Application**

Open the [`https://arcade-hero-n7r2kuaayq-ue.a.run.app`](https://arcade-hero-n7r2kuaayq-ue.a.run.app) to gain access to the lab chat application.

\*\*Note:\*\*The application link works in both a normal browser tab and an incognito window. An initial loading screen will appear while the lab data is being prepared.

From here you will be able to interact with the application interface during the course of this lab.

![Kanban Board](https://cdn.qwiklabs.com/uZJfMPekM2GiJE0uVm2PlkT4sz9bu2Xb6mhvt0gfYW4%3D align="left")

\*\*Note:\*\*The above image is the main kanban screen. The screen includes the available tickets reflecting different knowledge domains. The number of tickets displayed will be dependent on the level and persona selected.

The lab mimics a kanban application scenario. Select an active ticket to view the lab specific task. To complete the lab successfully ensure the ticket task is fulfilled per instructions given.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=Ca39P39jrgw] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723430162121/2b7afedd-17d2-44be-9f4c-11793ad89997.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723430164349/22e078d7-badf-405d-92fb-569cc35bed79.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Arcade%20Hero/quicklabarc237.sh
sudo chmod +x quicklabarc237.sh
./quicklabarc237.sh
```