---
title: "Monitor Environments with Google Cloud Managed Service for Prometheus: Challenge Lab - GSP364"
seoTitle: "Monitor Environments with Google Cloud Managed Service for Prometheus:"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Fri Mar 21 2025 09:31:20 GMT+0000 (Coordinated Universal Time)
cuid: cm8ikywng001609jvdb8eej05
slug: monitor-environments-with-google-cloud-managed-service-for-prometheus-challenge-lab-gsp364
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742549336200/e013cab3-d8a0-4afd-a179-f8b8e3b02ce6.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1742549465967/c8a42d84-1002-49a4-8c69-25889782f1a1.png
tags: monitor-environments-with-google-cloud-managed-service-for-prometheus-challenge-lab-gsp364, monitor-environments-with-google-cloud-managed-service-for-prometheus-challenge-lab, gsp364

---

## **Introduction**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students enrolled in the [Monitor Environments with Google Cloud managed Service for Prometheus](https://www.cloudskillsboost.google/course_templates/761) course. Are you ready for the challenge?

## **Lab Objectives**

In this lab, you will learn how to:

* Deploy the Managed Service for Prometheus
    
* Create a self managed data collection for scraping metrics
    
* Deploy an application to query metrics
    

## **Task 1. Deploy a GKE cluster in** `us-west1-a`

## **Task 2. Deploy a managed collection**

**Note:** You will need to utilize a flag when issuing the command to create the GKE cluster in order to enable the Managed Service for Prometheus.

**Note:** You should use the setup and operator manifest files to complete this challenge. For more information, refer to [GoogleCloudPlatform/prometheus-engine](https://github.com/GoogleCloudPlatform/prometheus-engine).

## **Task 3. Deploy an example application**

**Note:** Use the following manifest: [example-app.yaml](https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.2.3/examples/example-app.yaml)

Check if prometheus has been deployed

Check my progress

## **Task 4. Filter exported metrics**

1. Add the following to operator config to filter metrics
    

```apache
collection:
  filter:
    matchOneOf:
    - '{job="prom-example"}'
    - '{__name__=~"job:.+"}'
```

2. Create a config.yaml file
    

```apache
vi op-config.yaml
```

3. Copy the contents of operatorconfig inside the config.yaml file
    
4. Upload the config file you created to verify.
    

```apache
export PROJECT=$(gcloud config get-value project)
```

```apache
gsutil mb -p $PROJECT gs://$PROJECT
```

```apache
gsutil cp op-config.yaml gs://$PROJECT
```

```apache
gsutil -m acl set -R -a public-read gs://$PROJECT
```

Check if metrics filter has been applied

---

## Solution of Lab

%[https://youtu.be/AA0KSf71iLQ] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Monitor%20Environments%20with%20Google%20Cloud%20Managed%20Service%20for%20Prometheus%20Challenge%20Lab/gsp364.sh
sudo chmod +x gsp364.sh
./gsp364.sh
```