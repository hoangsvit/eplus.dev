---
title: "Enhance Scalability Using Managed Instance Groups (Solution)"
seoTitle: "Enhance Scalability Using Managed Instance Groups (Solution)"
seoDescription: "Learn how to optimize compute resources with managed instance groups on Google Cloud to enhance scalability using autoscaling with instance templates"
datePublished: Sat Feb 07 2026 06:10:42 GMT+0000 (Coordinated Universal Time)
cuid: cmlbx10ur000202i38sdv2fu5
slug: enhance-scalability-using-managed-instance-groups-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770444527265/c195f485-0ea5-4ecd-a8fd-425dae131889.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1770444549446/da643258-bee8-4900-8eba-365a58d9d74b.png
tags: enhance-scalability-using-managed-instance-groups, enhance-scalability-using-managed-instance-groups-solution

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

%[https://youtu.be/zaKenPStM9I] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/enhance-scalability-using-managed-instance-groups-solution/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1770444222931/521ae964-c8ef-4d69-92f0-b6411ccb5ca8.png align="center")

```apache
export REGION=$(gcloud compute project-info describe --format="value(commonInstanceMetadata.items[google-compute-default-region])")

gcloud compute instance-groups managed create dev-instance-group --template=dev-instance-template --size=1 --region="$REGION" && gcloud compute instance-groups managed set-autoscaling dev-instance-group --region=[enter region] --min-num-replicas=1 --max-num-replicas=3 --target-cpu-utilization=0.6 --mode=on
```