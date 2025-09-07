---
title: "Create a Machine Image for Instance Replication"
seoTitle: "Create a Machine Image for Instance Replication"
seoDescription: "Create a machine image for VM instance replication on Google Cloud Platform, preserving its configuration, metadata, and disk data"
datePublished: Sun Sep 07 2025 06:14:16 GMT+0000 (Coordinated Universal Time)
cuid: cmf9asajt000402l167sz23hu
slug: create-a-machine-image-for-instance-replication
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757225604309/e03c738e-9871-43a5-a8a5-dc863a18d423.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757225614908/ef73970b-9372-42bb-be44-85a0c2a90894.png
tags: create-a-machine-image-for-instance-replication

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

* Assume you are a cloud engineer and you have a virtual machine (VM) instance in a zone on Google Cloud Platform. Your goal is to preserve the configuration, metadata, permissions, and disk data of this VM by creating a machine image. This machine image will serve as a snapshot of the current state of your VM and can be used for multiple purposes such as Single disk backup, Multiple disk backup, Differential backup and Instance cloning.
    
* So your task is to create the machine image named `vm-mc-image-218` of the Google Compute Engine (GCE) VM instance named `wordpress-server` which is located in `us-east1-d` zone.
    

Click **Check my progress** to verify the objective.

Create the machine image of GCE VM named `wordpress-server`.

---

## Solution of Lab

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/create-a-machine-image-for-instance-replication/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757225643258/0ca3223e-ceb7-4464-b658-7b487b438f69.png align="center")

**Script Alternative**

* Replace `[enter zone , [enter Machine Image Name , [enter VM Name]]` with region given
    

```apache
gcloud compute machine-images create [enter Machine Image Name] --source-instance=[enter VM Name] --source-instance-zone=[enter zone here]
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757225638307/8718e41c-3228-4db1-91fe-1dd0ec87dd44.png align="center")