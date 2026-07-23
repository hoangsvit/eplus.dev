---
title: "Organize and Govern Data with Knowledge Catalog: Challenge Lab - ARC117"
seoTitle: "Organize and Govern Data with Knowledge Catalog: Challenge Lab - ARC117"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-07-23T08:29:56.091Z
cuid: cmrx93hef00000ajj3w8cc38e
slug: organize-and-govern-data-with-knowledge-catalog-challenge-lab-arc117
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/de69dd2e-871e-437a-a292-2ad87666b611.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/c6dabd1f-30b4-4644-b4e0-34a26da823ba.png
tags: arc117, organize-and-govern-data-with-knowledge-catalog-challenge-lab-arc117, organize-and-govern-data-with-knowledge-catalog-challenge-lab

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Setup**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## **Challenge scenario**

You are just starting your junior data engineer role. So far you have been helping teams create and manage Knowledge Catalog assets.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with some of their initial work on a new project. Specifically, they need to create a new Knowledge Catalog lake and organize and add aspects to assets in the new lake; you receive the following request to complete the following tasks:

*   Create a lake with a raw zone.
    
*   Create and attach a Cloud Storage bucket to the zone.
    
*   Create an aspect type named Protected Raw Data Aspect and then add the aspect to the raw zone.
    

Some standards you should follow:

*   Ensure that any needed APIs (such as Knowledge Catalog) are successfully enabled.
    
*   Create all resources in the `us-west1` region, unless otherwise directed.
    

Each task is described in detail below, good luck!

## **Task 1. Create a lake with a raw zone**

*   Create a lake named **Customer Engagements** using the `us-west1` region, with a regional raw zone named **Raw Event Data**.
    

Click **Check my progress** to verify the objective.

Create a lake with a raw zone in Knowledge Catalog

## **Task 2. Create and attach a Cloud Storage bucket to the zone**

*   Create a Cloud Storage bucket named `qwiklabs-gcp-01-1ba1bdcb99da` in the `us-west1` region, and attach it as a regional asset named **Raw Event Files** to the **Raw Event Data** zone.
    

Click **Check my progress** to verify the objective.

Create and attach a Cloud Storage bucket to the zone

## **Task 3. Create an aspect type and add the aspect to an asset**

1.  Create an aspect type named **Protected Raw Data Aspect** with the location set to `us-west1`, with an enumerated field named **Protected Raw Data Flag** that contains two values: `Y` and `N`.
    
2.  Add this aspect to the zone named **Raw Event Data**.
    

Click **Check my progress** to verify the objective.

Create and add an aspect

* * *

## Solution of Lab

### Quick

**Solution 1:**

%[https://youtu.be/1QDH0aGkL1Y] 

```apache
export LOCATION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755766054237/55a11997-79fd-4f4e-9e66-6d1329f01635.png align="center")

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC117/lab-solution-2.sh
source lab-solution-2.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC117/lab-solution-2.sh
sudo chmod +x lab-solution-2.sh
./lab-solution-2.sh
```

Task 3. Create and apply a tag template to a zone

1.  Go to Templates from [here](https://console.cloud.google.com/dataplex/templates/create)
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755830566301/b70077c6-18ae-4df9-9cfb-d3d4f0fe3979.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755830646063/2abf74f5-3175-4df6-be38-df22f949b1b6.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755830668808/53081cac-3738-48fa-871d-ce5bdc55811c.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755830680366/42eae351-508a-44fd-8221-f8737e336b8b.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755830700259/21bd1cb6-fbd5-4158-a278-4e7294b3fd9f.png align="center")

* * *

**Solution 2:**

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC117/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755766054237/55a11997-79fd-4f4e-9e66-6d1329f01635.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755766355003/658c93c9-ad4a-4a69-bf3f-fa3bd30c07a3.png align="center")

* * *

### Manual

%[https://www.youtube.com/watch?v=3OHoiOYAgIU]