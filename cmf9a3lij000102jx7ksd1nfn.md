---
title: "Enhance Scalability Using Managed Instance Groups"
seoTitle: "Enhance Scalability Using Managed Instance Groups"
seoDescription: "Optimize cloud deployment with Google Cloud's managed instance groups, featuring autoscaling with set limits and CPU thresholds"
datePublished: Sun Sep 07 2025 05:55:04 GMT+0000 (Coordinated Universal Time)
cuid: cmf9a3lij000102jx7ksd1nfn
slug: enhance-scalability-using-managed-instance-groups
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757224413768/908c856c-b9f6-40ea-8728-0f50393bcf56.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757224481175/2cf05b53-8127-497c-93eb-a6da990912b1.png
tags: enhance-scalability-using-managed-instance-groups

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

As a cloud infrastructure administrator tasked with optimizing compute resource management on Google Cloud, you are required to create a managed instance group named "**dev-instance-group**" using a pre-existing instance template named "**dev-instance-template**". This initiative aims to streamline deployment, enhance scalability, and ensure to use below configurations.

* Autoscaling mode : **ON**
    
* Minimum number of instances : **1**
    
* Maximum number of instances : **3**
    
* CPU Utilization : **60%**
    

Click **Check my progress** to verify the objective.

Create a managed instance group using a pre-existing instance template

---

## Solution of Lab

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/enhance-scalability-using-managed-instance-groups/lab.sh
source lab.sh
```