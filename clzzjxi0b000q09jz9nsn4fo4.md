---
title: "Deploy a Compute Instance with a Remote Startup Script: Challenge Lab - GSP301"
seoTitle: "Deploy a Compute Instance with a Remote Startup Script: Challenge Lab"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Sun Aug 18 2024 12:36:59 GMT+0000 (Coordinated Universal Time)
cuid: clzzjxi0b000q09jz9nsn4fo4
slug: deploy-a-compute-instance-with-a-remote-startup-script-challenge-lab-gsp301
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744947119922/7d612a41-dfab-42a1-94a9-86ffa8ca05c3.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744947144059/819e95e3-b4ba-4019-8ded-f6d2711ed6c7.png
tags: deploy-a-compute-instance-with-a-remote-startup-script-challenge-lab-gsp301, gsp301, deploy-a-compute-instance-with-a-remote-startup-script-challenge-lab

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Cloud Architecture: Design, Implement, and Manage](https://www.cloudskillsboost.google/course_templates/640) skill badge or preparing for the [Google Cloud Certified Professional Cloud Architect](https://cloud.google.com/certification/cloud-architect) certification exam. Are you up for the challenge?

## **Challenge scenario**

You have been given the responsibility of managing the configuration of your organization's Google Cloud virtual machines. You have decided to make some changes to the framework used for managing the deployment and configuration machines - you want to make it easier to modify the startup scripts used to initialize a number of the compute instances. Instead of storing startup scripts directly in the instances' metadata, you have decided to store the scripts in a Cloud Storage bucket and then configure the virtual machines to point to the relevant script file in the bucket.

A basic bash script that installs the Apache web server software called `install-web.sh` has been provided for you as a sample startup script. You can download this from the Student Resources links on the left side of the page. You can also find the startup script in a public Cloud Storage bucket at `gs://spls/gsp301/install-web.sh`.

## **Your challenge**

Configure a Linux Compute Engine instance that installs the Apache web server software using a remote startup script. In order to confirm that a compute instance Apache has successfully installed, the Compute Engine instance must be accessible via HTTP from the internet. You must create your instance in the following zone: `us-west1-a`.

**Note:** In order to ensure accurate activity tracking you should not modify or change any of the pre-created lab resources, in particular the lab-monitor Compute Engine instance.

### Task 1. Create a storage bucket

Create a storage bucket

**Check my progress**

### Task 2. Create a VM instance with a remote startup script

Create a VM instance with a remote startup script

**Check my progress**

### Task 3. Create a firewall rule to allow traffic (80/tcp)

Create a firewall rule to allow traffic (80/tcp)

**Check my progress**

### Task 4. Test that the VM is serving web content

Test that the VM is serving web content

**Check my progress**

### Tips and Tricks

* **Configure Instance Metadata.** The [Running Startup Scripts](https://cloud.google.com/compute/docs/startupscript) documentation page explains how Compute Engine instance metadata can be used to configure startup scripts.
    
* **Check if your Compute Engine instance is executing the startup script**. Use the Serial Console for the running virtual machine to look at the startup events to make sure that the startup script is being executed.
    
* **Check permissions.** Your Compute Engine instance might not have the correct permissions required to read the startup script from the storage bucket. The virtual machine needs to be given permissions that align with the storage permissions.
    
* **Check firewalls.** If the startup script has installed the software you may be unable to connect if a firewall has not been correctly configured.
    
* **Check the URL and address.** You will be unable to connect to the Apache web server if you are trying to access the Compute Engine instance using an HTTPS address rather than HTTP; or you are using the incorrect IP address. Check that your URL is `http://[EXTERNAL_IP]` rather than `https://[EXTERNAL_IP]` or `http://[INTERNAL_IP]`
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=qvZpI3hw2g8] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744947083138/f3e5e8a8-5b38-42c6-a004-891a26d81a37.png align="center")

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Deploy%20a%20Compute%20Instance%20with%20a%20Remote%20Startup%20Script%3A%20Challenge%20Lab/techcps301.sh
sudo chmod +x techcps301.sh
./techcps301.sh
```