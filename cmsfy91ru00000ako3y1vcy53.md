---
title: "Enrich Metadata and Discovery of Lakehouse Data: Challenge Lab - ARC123"
seoTitle: "Enrich Metadata and Discovery of Lakehouse Data: Challenge Lab - ARC123"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-08-05T10:33:57.330Z
cuid: cmsfy91ru00000ako3y1vcy53
slug: enrich-metadata-and-discovery-of-lakehouse-data-challenge-lab-arc123
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/c50cd7c7-841b-4f48-8321-519d6ef18ffd.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/2a73e6ff-1d2c-4ac8-bd4a-9c6b59e6c212.png
tags: arc123, enrich-metadata-and-discovery-of-lakehouse-data-challenge-lab-arc123, enrich-metadata-and-discovery-of-lakehouse-data-challenge-lab

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Setup**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## **Challenge scenario**

Your team manages customer data gathered from online shopping sessions and stored in Cloud Storage. Some data contains sensitive information so it’s important to limit access.

### Your challenge

As a junior engineer, you’re asked to help with the project by completing the following tasks:

*   Create a BigQuery dataset to store the connection to your Lakehouse table.
    
*   Create a Lakehouse table using a Cloud Resource connection.
    
*   Create an aspect and apply to sensitive data in the Lakehouse table.
    

**Hint:**

*   Ensure that the BigQuery Connection API is enabled and that the necessary service accounts have the appropriate permissions.
    
*   Create all resources in the `<filled in at lab start>` region, unless otherwise directed.
    

Each task is described in detail below, good luck!

## **Task 1. Create a BigQuery dataset**

*   Create a BigQuery dataset named **ecommerce** that is multi-region in the United States.
    

Click **Check my progress** to verify the objective.

## **Task 2. Create a Lakehouse table using a Cloud Resource connection**

1.  Create a multi-region Cloud Resource connection in the United States, named **customer\_data\_connection** with the appropriate service account permissions to read Cloud Storage files in your project.
    
2.  Within the BigQuery dataset named **ecommerce**, use the Cloud Resource connection to create a Lakehouse table named **customer\_online\_sessions**.
    

*   When creating the table, load data from the following Cloud Storage file using schema auto-detection:
    
    *   gs://`Project ID`\-bucket/customer-online-sessions.csv
        

Click **Check my progress** to verify the objective.

## T**ask 3. Create an aspect and apply it to the Lakehouse table**

1.  Create a multi-region aspect in the United States, named **Sensitive Data Aspect** with two fields:
    

*   Boolean field named **Has Sensitive Data**.
    
*   Enumerated field named **Sensitive Data Type** that contains three values: **Location Info**, **Contact Info**, and **None**.
    

2.  Apply the aspect to the Lakehouse table as containing sensitive data using both enumerated fields:
    

*   **Has Sensitive Data** – **TRUE**
    
*   **Sensitive Data Type** – **Location Info**
    

Click **Check my progress** to verify the objective.

* * *

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=_c6Zmt9pAgk&embeds_referring_euri=https%3A%2F%2Feplus.dev%2F] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC123/lab.sh
source lab.sh
```

**Script Alternative**

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737794404714/517fb9b5-748e-425e-a085-8eca090e24fd.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Tag%20and%20Discover%20BigLake%20Data%20Challenge%20Lab/arc123.sh
sudo chmod +x arc123.sh
./arc123.sh
```

* * *

### Manual

%[https://www.youtube.com/watch?v=2leZV1RWkzU]