---
title: "Monitoring in Google Cloud: Challenge Lab - ARC115"
seoTitle: "Monitoring in Google Cloud: Challenge Lab - ARC115"
seoDescription: "Master Google Cloud Monitoring in this challenge lab. Install agents, set alerts, build dashboards, and create log-based metrics efficiently"
datePublished: Tue Sep 23 2025 08:57:28 GMT+0000 (Coordinated Universal Time)
cuid: cmfwbnshx000002l4cnm8c5c1
slug: monitoring-in-google-cloud-challenge-lab-arc115
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758616861709/7416dd28-334f-4b26-b9a4-c15e34466f29.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1758617658802/199d677f-5b11-462a-a1b2-41ff4faf48da.png
tags: google-cloud, monitoring-in-google-cloud-challenge-lab-arc115, monitoring-in-google-cloud-challenge-lab, arc115, monitoring-in-google-cloud

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Challenge scenario

As a junior cloud engineer, you are part of a team of people assigned to manage Google Cloud resources in your organization. One of your job requirements in this role is to use the Cloud Logging and Cloud Monitoring services to monitor Apache Web Server activities installed on a virtual machine (VM) instance.

You are expected to have the skills and knowledge for the tasks that follow.

### Your challenge

For this challenge, you have been tasked with installing the Cloud Monitoring and Cloud Logging agents on the VM via SSH, create an alert policy for Apache Web Server, set uptime checks for the VM, configure a dashboard, and add a log-based metric for the server that's installed on the VM.

You need to:

* Install the Cloud Monitoring and Cloud Logging agents.
    
* Add an uptime check and alert policy for Apache Web Server.
    
* Create a dashboard and chart for the VM and Apache Web Server each.
    
* Create a log-based metric.
    

For this challenge lab, a virtual machine (VM) instance named `apache-vm` has been configured that has Apache Web Server installed for you to complete the tasks.

You can verify the server is running by clicking on the `External IP` of the VM.

Each task is described in detail below, good luck!

## Task 1. Install the Cloud Logging and Monitoring agents

**Note:** With the Cloud Logging agent not yet installed, if you check for Apache Web Server logs in Cloud Logging, you will only see audit logs; no Apache Web Server logs (although Apache Web Server is configured on the VM instance). Similarly, if you try to check metrics for Apache Web Server in the Metric Explorer it will not show any data.

So for this task, you need to install the Cloud Logging and Cloud Monitoring agents.

1. Connect to the VM instance `apache-vm` provisioned for you via SSH and install the Cloud Logging and Cloud Monitoring agents.
    
2. Enable the Apache Web Server monitoring plugin using the following commands:
    

```plaintext
(cd /etc/stackdriver/collectd.d/ && sudo curl -O https://raw.githubusercontent.com/Stackdriver/stackdriver-agent-service-configs/master/etc/collectd.d/apache.conf)
```

Copied!

```plaintext
sudo service stackdriver-agent restart
```

Copied!

Click **Check my progress** to verify the objective.

Install the Cloud Logging and Cloud Monitoring agents

## Task 2. Add an uptime check for Apache Web Server on the VM

* For this task, you need to verify that your VM is up and running. To do this, create an uptime check with the resource type set to `instance`.
    

**Note:** The uptime check that you configure may take a while to become active. Continue with the lab, you can check the uptime results later.

Click **Check my progress** to verify the objective.

Add an uptime check for Apache Web Server on the VM

## Task 3. Add an alert policy for Apache Web Server

1. Create an alert policy for Apache Web Server traffic that notifies you on your personal email account when the traffic rate exceeds 3 KiB/s.
    
2. Connect to the instance via SSH and run the following command to generate the traffic:
    

```plaintext
timeout 120 bash -c -- 'while true; do curl localhost | grep -oP "<title>.*</title>"; sleep .1s;done '
```

Copied!

3. Monitor the alert policy that you just created once the traffic rate exceeds 3 KiB/s you should receive an alert on your email id.
    

Click **Check my progress** to verify the objective.

Add an alert policy for Apache Web Server

**Note:** If you do not receive an email immediately, try to increase the load on the VM by executing the command in step 2 again.

## Task 4. Create a dashboard and charts for Apache Web Server on the VM

For this task, you need to create a dashboard that's configured with charts.

1. Add the first line chart that has a Resource metric filter, `CPU load (1m)`, for the VM.
    
2. Add a second line chart that has a Resource metric filter, `Requests`, for Apache Web Server.
    

Click **Check my progress** to verify the objective.

Create a dashboard and charts for Apache Web Server on the VM

## Task 5. Create a log-based metric

1. Next, create a log based metric that filters for the following values:
    
    | **Filter** | **Values** |
    | --- | --- |
    | **Resource type** | VM |
    | **Logname** | apache-access |
    | **Text Payload** | textPayload:"200" |
    
2. Explore the log-based metrics by selecting the metric **VM Instance &gt; Apache &gt; Request**.
    

Click **Check my progress** to verify the objective.

Create a log-based metric

---

## Solution of Lab

%[https://youtu.be/8ohKEAgZNOg] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC115/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Monitoring%20in%20Google%20Cloud%3A%20Challenge%20Lab/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```

* Go to `Create log-based metric` from [here](https://console.cloud.google.com/logs/metrics/edit?)
    

1. For Log-based metric name: enter `drabhi`
    
2. [P](https://console.cloud.google.com/logs/metrics/edit?)aste The Following in `Build filter` & Re[plac](https://console.cloud.google.com/logs/metrics/edit?)e PROJECT\_ID
    

```plaintext
resource.type="gce_instance"
logName="projects/PROJECT_ID/logs/apache-access"
textPayload:"200"
```

3. Paste The Following in `Regular Expressio`[`n` fi](https://console.cloud.google.com/logs/metrics/edit?)eld:
    

```plaintext
execution took (\d+)
```