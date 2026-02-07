---
title: "Deploy VM with Multiple Network Interfaces in Google Cloud (Solution)"
seoTitle: "Deploy VM with Multiple Network Interfaces in Google Cloud (Solution)"
seoDescription: "Learn how to deploy a Google Cloud VM with multiple network interfaces for enhanced security and performance with this comprehensive guide"
datePublished: Sat Feb 07 2026 06:24:14 GMT+0000 (Coordinated Universal Time)
cuid: cmlbxifa2000a02jl6uec7ohq
slug: deploy-vm-with-multiple-network-interfaces-in-google-cloud-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770445420502/ffe863c1-dba4-42ce-baf2-0536134b6ae6.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1770445431429/d41bba86-11e7-474b-b630-74394852e4b4.png
tags: deploy-vm-with-multiple-network-interfaces-in-google-cloud-solution, deploy-vm-with-multiple-network-interfaces-in-google-cloud

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

You work for a company that is migrating its on-premises application to Google Cloud. The application consists of several components that require different network configurations for optimal performance and security. You need to deploy a VM instance with multiple network interfaces to facilitate communication across these different network segments.

You decide to create a VM instance with multiple network interfaces, each connected to a different subnet within the different VPC networks. This configuration allows the VM to communicate efficiently with various components of the application ecosystem.

You have already configured with pre-created VPC networks and their subnetworks:

* VPC network 1: `my-vpc1`
    
    * Subnetwork: `subnet-a`
        
* VPC network 2: `my-vpc2`
    
    * Subnetwork: `subnet-b`
        

Click **Check my progress** to verify the objective.

Create a VM Instance with Multiple Network Interfaces.

---

## Solution of Lab

%[https://youtu.be/fufcmjjk3Zs] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/deploy-vm-with-multiple-network-interfaces-in-google-cloud-solution/lab.sh
source lab.sh
```

**Script Alternative**

```apache
export ZONE=$(gcloud compute project-info describe --format="value(commonInstanceMetadata.items[google-compute-default-zone])")

gcloud compute instances create multi-nic-vm --zone="$ZONE" --machine-type=e2-medium --network-interface=network=my-vpc1,subnet=subnet-a --network-interface=network=my-vpc2,subnet=subnet-b
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1770445378124/b78c70cc-3edd-4b17-bd03-ee0bb531d12e.png align="center")