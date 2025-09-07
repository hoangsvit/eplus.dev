---
title: "Build a Secure Google Cloud Network: Challenge Lab - GSP322"
seoTitle: "Build a Secure Google Cloud Network: Challenge Lab - GSP322"
seoDescription: "Set up secure firewall rules and virtual machine tags for a Google Cloud Network in this challenge lab. Maximize security for a project site"
datePublished: Sun Sep 07 2025 06:49:46 GMT+0000 (Coordinated Universal Time)
cuid: cmf9c1xlr000002kygrsx3v4q
slug: build-a-secure-google-cloud-network-challenge-lab-gsp322
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757227724479/d5275164-6e03-491d-b208-5fe7520af2be.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757227750303/74dc55b1-fd02-4bb1-82b7-16b972c5d977.png
tags: google-cloud-network, build-a-secure-google-cloud-network-challenge-lab-gsp322, build-a-secure-google-cloud-network-challenge-lab, gsp322, secure-google-cloud-network

---

## Introduction

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Build a Secure Google Cloud Network](https://www.cloudskillsboost.google/course_templates/654) skill badge. Are you ready for the challenge?

## Setup

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Challenge scenario

You are a security consultant brought in by Jeff, who owns a small local company, to help him with his very successful website (juice-shop). Jeff is new to Google Cloud and had his neighbour's son set up the initial site. The neighbour's son has since had to leave for college, but before leaving, he made sure the site was running.

Below is the current set up:

![Current Google Cloud environment](https://cdn.qwiklabs.com/qEwFTP7%2FkyF3cRwfT3FGObt7L7VLB60%2Bvp92hZVnogw%3D align="left")

## Your challenge

You need to create the appropriate security configuration for Jeff's site. Your first challenge is to set up firewall rules and virtual machine tags. You also need to ensure that SSH is only available to the bastion via IAP.

For the firewall rules, make sure that:

* The bastion host does not have a public IP address.
    
* You can only SSH to the bastion and only via IAP.
    
* You can only SSH to `juice-shop` via the bastion.
    
* Only HTTP is open to the world for `juice-shop`.
    

Tips and tricks:

* Pay close attention to the network tags and the associated VPC firewall rules.
    
* Be specific and limit the size of the VPC firewall rule source ranges.
    
* Overly permissive permissions will not be marked correct.
    

![The Google Cloud environment to configure](https://cdn.qwiklabs.com/BgxgsuLyqMkhxmO3jDlkHE7yGLIR%2B3rrUabKimlgrbo%3D align="left")

Suggested order of action.

1. Check the firewall rules. Remove the overly permissive rules.
    

Remove the overly permissive rules

2. Navigate to Compute Engine in the Cloud console and identify the bastion host. The instance should be stopped. Start the instance.
    

Start the bastion host instance

3. The bastion host is the one machine authorized to receive external SSH traffic. Create a firewall rule that allows [SSH (tcp/22) from the IAP service](https://cloud.google.com/iap/docs/using-tcp-forwarding). The firewall rule must be enabled for the bastion host instance using a network tag of `allow-ssh-iap-ingress-ql-595`.
    

Create a firewall rule that allows SSH (tcp/22) from the IAP service and add network tag on bastion

4. The `juice-shop` server serves HTTP traffic. Create a firewall rule that allows traffic on HTTP (tcp/80) to any address. The firewall rule must be enabled for the juice-shop instance using a network tag of `allow-http-ingress-ql-595`.
    

Create a firewall rule that allows traffic on HTTP (tcp/80) to any address and add network tag on juice-shop

5. You need to connect to `juice-shop` from the bastion using SSH. Create a firewall rule that allows traffic on SSH (tcp/22) from `acme-mgmt-subnet` network address. The firewall rule must be enabled for the `juice-shop` instance using a network tag of `allow-ssh-internal-ingress-ql-595`.
    

Create a firewall rule that allows traffic on SSH (tcp/22) from acme-mgmt-subnet

6. In the Compute Engine instances page, click the SSH button for the bastion host. Once connected, SSH to `juice-shop`.
    

**Hint:** If you're having difficulties with the compute ssh connection or IAP tunnel, make use of the [\--troubleshoot](https://cloud.google.com/sdk/gcloud/reference/compute/ssh) flag.

SSH to bastion host via IAP and juice-shop via bastion

---

## Solution of Lab

%[https://youtu.be/tHHreNiiAcQ] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP322/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Build%20a%20Secure%20Google%20Cloud%20Network%3A%20Challenge%20Lab/techcps322.sh
sudo chmod +x techcps322.sh
./techcps322.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757227550572/9c5432eb-754e-4223-b0cd-be9b33f86ed6.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757227555456/28312ea8-e382-4cf4-af97-eeccdb615e85.png align="center")