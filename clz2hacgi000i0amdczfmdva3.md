---
title: "The Basics of Google Cloud Compute: Challenge Lab - ARC120"
seoTitle: "The Basics of Google Cloud Compute: Challenge Lab - ARC120"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Fri Jul 26 2024 09:06:36 GMT+0000 (Coordinated Universal Time)
cuid: clz2hacgi000i0amdczfmdva3
slug: the-basics-of-google-cloud-compute-challenge-lab-arc120
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721983696774/b4ab8e2b-773b-4318-92ba-5a9a802250c0.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721984357651/e6e7f6a6-ec2e-4c86-a64c-5b598f981fc6.png
tags: the-basics-of-google-cloud-compute-challenge-lab-arc120, arc120

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Task 1. Create a Cloud Storage bucket**

Your team has requested a new Cloud Storage bucket, so they can store their built code and startup scripts.

* Create a bucket named `qwiklabs-gcp-04-0a1cedbb0206`\-bucket (US multi-region).
    

Click *Check my progress* to verify the objective.

Create a Cloud Storage bucket

## **Task 2. Create and attach a persistent disk to a Compute Engine instance**

1. Create a new Compute Engine instance named **my-instance** with the following configuration:
    

| **Property** | **Value** |
| --- | --- |
| Series | E2 |
| Machine type | e2-medium |
| Boot disk type | New balanced persistent disk |
| Boot disk size | 10 GB |
| Boot disk image | Debian GNU/Linux 11 (bullseye) |
| Firewall rules | Enable **Allow HTTP traffic** |

2. Create a new persistent disk named **mydisk** with a size of 200GB.
    
3. Attach the persistent disk to the instance.
    

Click *Check my progress* to verify the objective.

Create and attach a persistent disk to an instance

**Check my progress**

## **Task 3. Install a NGINX web server**

For this task, SSH into the Compute Engine instance, and install a NGINX web server. Here's a reminder of the general steps:

1. Update the OS.
    
2. Install NGINX.
    
3. Confirm that NGINX is running.
    

Click *Check my progress* to verify the objective.

Install a NGINX web server

### Test the web application

To test the web application, return to the Cloud Console, and click the **External IP** link in the row for your machine name. Or, add the **External IP** value to [`http://EXTERNAL_IP/`](http://EXTERNAL_IP/) in a new browser window or tab.

A default web page should open with the message "Welcome to nginx!".

---

## Answers of Lab

%[https://www.youtube.com/watch?v=GPes-qyoAhk&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1721984092823/60873427-c7ec-4c19-a3b6-e7be42a59731.png align="center")

```powershell
export ZONE=
```

### Task 2:

```powershell
gcloud compute instances create my-instance --project=$DEVSHELL_PROJECT_ID --zone=$ZONE --machine-type=e2-medium --network-interface=network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=default --metadata=enable-oslogin=true --maintenance-policy=MIGRATE --provisioning-model=STANDARD --tags=http-server --create-disk=auto-delete=yes,boot=yes,device-name=my-instance,image=projects/debian-cloud/global/images/debian-11-bullseye-v20230509,mode=rw,size=10,type=projects/$DEVSHELL_PROJECT_ID/zones/$ZONE/diskTypes/pd-balanced --no-shielded-secure-boot --shielded-vtpm --shielded-integrity-monitoring --labels=goog-ec-src=vm_add-gcloud --reservation-affinity=any
gcloud compute disks create mydisk --size=200GB \
--zone=$ZONE
gcloud compute instances attach-disk my-instance --disk mydisk --zone=$ZONE
```

### Task 3:

```powershell
gcloud compute ssh my-instance --zone=$ZONE
sudo apt-get update
sudo apt-get install -y nginx
ps auwx | grep nginx
```

## Congratulations

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1721984783836/5729d41e-417b-4f7d-b7d9-bfc2b61a1abb.png align="center")