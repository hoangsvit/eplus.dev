---
title: "Create VPC Peering Connection between VPCs (Solution)"
seoTitle: "Create VPC Peering Connection between VPCs (Solution)"
seoDescription: "Create VPC peering between workspace_vpc and private_vpc with step-by-step lab instructions for seamless communication"
datePublished: Sun Aug 10 2025 08:30:30 GMT+0000 (Coordinated Universal Time)
cuid: cme5fbmud000002l414qyg2dx
slug: create-vpc-peering-connection-between-vpcs-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754814570314/089fbb6d-1c3b-4b07-b4b0-6f1dd9f82141.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1754814585281/77e6670a-f234-4837-9718-af6808953437.png
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

Copied!

When asked if you want to continue, enter `Y`. When prompted for a passphrase, press **ENTER** for no passphrase, then **ENTER** again.

Click **Check my progress** to verify the objective.

Create Peering connection

---

## Solution of Lab

%[https://youtu.be/k2ztNQhQBdA] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Create%20VPC%20Peering%20Connection%20between%20VPCs/techcps.sh
sudo chmod +x techcps.sh
./techcps.sh
```