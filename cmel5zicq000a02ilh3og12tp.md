---
title: "Get Started with Dataplex: Challenge Lab - ARC117"
seoTitle: "Get Started with Dataplex: Challenge Lab - ARC117"
seoDescription: "Join Dataplex Challenge Lab and test your Google Cloud skills by completing setup tasks in real cloud environments"
datePublished: Thu Aug 21 2025 08:53:27 GMT+0000 (Coordinated Universal Time)
cuid: cmel5zicq000a02ilh3og12tp
slug: get-started-with-dataplex-challenge-lab-arc117
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755766370773/b67a7142-7cd8-4d0c-aace-fe6e407278b3.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755766386177/ad6f5108-0a7f-4c74-a087-6b1f79b61abb.png
tags: dataplex, get-started-with-dataplex-challenge-lab-arc117, get-started-with-dataplex-challenge-lab, arc117

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## Setup

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## Challenge scenario

You are just starting your junior data engineer role. So far you have been helping teams create and manage Dataplex assets.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with some of their initial work on a new project. Specifically, they need to create a new Dataplex lake and organize and tag assets in the new lake; you receive the following request to complete the following tasks:

* Create a lake with a raw zone.
    
* Create and attach a Cloud Storage bucket to the zone.
    
* Create and apply a tag template to tag an entire zone as protected data.
    

Some standards you should follow:

* Ensure that any needed APIs (such as Dataplex and Data Catalog) are successfully enabled.
    
* Create all resources in the `us-east1` region, unless otherwise directed.
    

Each task is described in detail below, good luck!

## Task 1. Create a lake with a raw zone

* Create a lake named **Customer Engagements** using the `us-east1` region, with a regional raw zone named **Raw Event Data**.
    

Click *Check my progress* to verify the objective.

Create a lake with a raw zone in Dataplex

## Task 2. Create and attach a Cloud Storage bucket to the zone

* Create a Cloud Storage bucket named `qwiklabs-gcp-00-1ef47b45f59f` in the `us-east1` region, and attach it as a regional asset named **Raw Event Files** to the **Raw Event Data** zone.
    

Click *Check my progress* to verify the objective.

Create and attach a Cloud Storage bucket to the zone

## Task 3. Create and apply a tag template to a zone

1. Create a public tag template named **Protected Raw Data Template** with the location set to `us-east1`, with an enumerated field named **Protected Raw Data Flag** that contains two values: `Y` and `N`.
    
2. Use this template to tag the zone named **Raw Event Data** as protected raw data.
    

Click *Check my progress* to verify the objective.

Create and apply a tag template to a zone

---

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC117/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755766054237/55a11997-79fd-4f4e-9e66-6d1329f01635.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755766355003/658c93c9-ad4a-4a69-bf3f-fa3bd30c07a3.png align="center")

---

### Manual

%[https://www.youtube.com/watch?v=8EzsX0oUDqw]