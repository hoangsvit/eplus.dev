---
title: "Encrypt a Persistent Disk with a Customer-Supplied Key (Solution)"
seoTitle: "Encrypt a Persistent Disk with a Customer-Supplied Key (Solution)"
seoDescription: "Encrypt a persistent disk using a customer-supplied key and attach it to a VM instance for enhanced data security"
datePublished: Wed Feb 11 2026 07:38:42 GMT+0000 (Coordinated Universal Time)
cuid: cmlhpxm76000p02jocqhr3jbe
slug: encrypt-a-persistent-disk-with-a-customer-supplied-key-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770795507399/538d4aee-fb5c-40fd-9c48-5b39049f70f0.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1770795450707/0372718f-a988-4fc9-b854-10e328a85e5b.png
tags: encrypt-a-persistent-disk-with-a-customer-supplied-key, encrypt-a-persistent-disk-with-a-customer-supplied-key-solution

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

You are a system administrator at a large enterprise company. Your compliance team has informed you that you need to start encrypting data at rest with your own key (customer-supplied encryption key or CSEK). Your task is to create a persistent disk with encryption using the CSEK and attach that persistent disk to a VM instance.

Click **Check my progress** to verify the objective.

Create and attach a CSEK-encrypted persistent disk to the VM instance.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=e-CPhuZ865s] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/encrypt-a-persistent-disk-with-a-customer-supplied-key-solution/lab.sh
source lab.sh
```

**Script Alternative**

```apache
export PROJECT_ID=$(gcloud config get-value project) ZONE=$(gcloud compute instances list --limit=1 --format="value(zone)") VM_NAME=$(gcloud compute instances list --limit=1 --format="value(name)") BASE64_KEY=$(head -c 32 /dev/urandom | base64)
gcloud compute disks create csek-encrypted-disk --size=200GB --zone=$ZONE --csek-key-file=<(echo "[{\"uri\": \"https://www.googleapis.com/compute/v1/projects/$PROJECT_ID/zones/$ZONE/disks/csek-encrypted-disk\", \"key\": \"$BASE64_KEY\", \"key-type\": \"raw\"}]")
gcloud compute instances attach-disk $VM_NAME --disk=csek-encrypted-disk --zone=$ZONE --csek-key-file=<(echo "[{\"uri\": \"https://www.googleapis.com/compute/v1/projects/$PROJECT_ID/zones/$ZONE/disks/csek-encrypted-disk\", \"key\": \"$BASE64_KEY\", \"key-type\": \"raw\"}]")
```