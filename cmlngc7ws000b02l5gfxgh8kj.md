---
title: "Create VPC Peering Connection between VPCs (Solution)"
seoTitle: "Create VPC Peering Connection between VPCs (Solution)"
seoDescription: "Learn how to create a secure VPC peering connection between two VPCs for seamless communication and resource interaction in this step-by-step guide"
datePublished: Sun Feb 15 2026 07:56:45 GMT+0000 (Coordinated Universal Time)
cuid: cmlngc7ws000b02l5gfxgh8kj
slug: create-vpc-peering-connection-between-vpcs-solution-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771142199471/4b4dfe17-a149-4c99-8807-6d9eb6ff6526.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1771142187428/e0ea68e0-cd89-455a-8384-20a37062c915.png
tags: create-vpc-peering-connection-between-vpcs, create-vpc-peering-connection-between-vpcs-solution

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

As a network administrator, you have been assigned with the responsibility of connecting two Virtual Private Clouds (VPCs) workspace\_vpc and private\_vpc in your project. This peering connection will establish a direct and secure communication pathway between the resources residing in each VPC, allowing them to interact seamlessly with each other.

Your task is :

* Create Peering connection **workspace-vpc** with **private-vpc**
    
* Create Peering connection **private-vpc** with **workspace-vpc**
    

**Note:** To ssh into the vm instance, run the following command:

```apache
gcloud compute ssh INSTANCE_NAME --project=PROJECT_ID --zone=INSTANCE_ZONE
```

When asked if you want to continue, enter `Y`. When prompted for a passphrase, press **ENTER** for no passphrase, then **ENTER** again.

Click **Check my progress** to verify the objective.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=iZwRujG_g2Y] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/create-vpc-peering-connection-between-vpcs-solution/lab.sh
source lab.sh
```

**Script Alternative**

```apache

gcloud auth list

export ZONE=$(gcloud compute project-info describe --format="value(commonInstanceMetadata.items[google-compute-default-zone])")

export PROJECT_ID=$(gcloud config get-value project)

gcloud config set compute/zone "$ZONE"

gcloud compute networks create workspace-vpc --subnet-mode=custom

gcloud compute networks create private-vpc --subnet-mode=custom

gcloud compute networks peerings create workspace-to-private --network=workspace-vpc --peer-network=private-vpc --auto-create-routes

gcloud compute networks peerings create private-to-workspace --network=private-vpc --peer-network=workspace-vpc --auto-create-routes

gcloud compute ssh workspace-vm --project="$PROJECT_ID" --zone="$ZONE"
```