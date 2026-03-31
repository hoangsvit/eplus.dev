---
title: "Modify VM Instance for Cost Optimization (Solution)"
seoTitle: "Modify VM Instance for Cost Optimization (Solution)"
seoDescription: "You work as a cloud administrator for a technology company that utilizes Google Cloud extensively for its operations. Today, you have been tasked with"
datePublished: 2026-02-24T02:27:21.133Z
cuid: cmlzzj9uz007z1qnsf6mi8rhe
slug: modify-vm-instance-for-cost-optimization-solution
cover: https://cloudmate-test.s3.us-east-1.amazonaws.com/uploads/covers/5f802df9bbabf10ec84d9fe8/00c23814-685c-4a5d-858f-dcb9e83ac46e.png
ogImage: https://cloudmate-test.s3.us-east-1.amazonaws.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/2bc19358-0bf0-40ab-80e5-4679a72de9dd.png
tags: modify-vm-instance-for-cost-optimization-solution, modify-vm-instance-for-cost-optimization

---

## **Overview**

*   Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
*   The included cloud terminal is preconfigured with the gcloud SDK.
    
*   Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## **Challenge scenario**

You work as a cloud administrator for a technology company that utilizes Google Cloud extensively for its operations. Today, you have been tasked with modifying a virtual machine (VM) instance to better align with updated resource requirements by using a specific General purpose Machine type with low cost.

*   Currently, you have an existing VM instance named `Instance_name` with high cost. Your task is to update the machine type with `e2-medium` suitable for the VM instance with low cost.
    

Click **Check my progress** to verify the objective.

Update the Machine type of the VM instance.

* * *

## Solution of Lab

%\[https://www.youtube.com/watch?v=BlPbr1A1dOw\]

We gratefully acknowledge Google's learning resources that make cloud education accessible

```plaintext
export VM_NAME="lab-vm"
export ZONE="us-east4-c"  # Replace with your actual zone

gcloud compute instances stop lab-vm --zone [YOUR_ZONE]
# Example:
# gcloud compute instances stop lab-vm --zone us-east4-c

gcloud compute instances set-machine-type $VM_NAME \
  --machine-type e2-medium \
  --zone $ZONE

gcloud compute instances start lab-vm --zone us-east4-c

```

#### **If you get an error, run**

```plaintext

gcloud auth list

export ZONE=$(gcloud compute project-info describe --format="value(commonInstanceMetadata.items[google-compute-default-zone])")

export PROJECT_ID=$(gcloud config get-value project)

gcloud config set compute/zone "$ZONE"

gcloud compute instances stop lab-vm --zone="$ZONE"

sleep 10

gcloud compute instances set-machine-type lab-vm --machine-type e2-medium --zone="$ZONE"

sleep 10

gcloud compute instances start lab-vm  --zone="$ZONE"
```

<iframe type="youtube" src="https://www.youtube.com/watch?v=BlPbr1A1dOw" data-node-type="hn-embed"></iframe>