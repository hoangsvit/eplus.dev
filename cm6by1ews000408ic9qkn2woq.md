---
title: "Tag and Discover BigLake Data: Challenge Lab - ARC123"
seoTitle: "[2025] Tag and Discover BigLake Data: Challenge Lab - ARC123"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Sat Jan 25 2025 08:43:24 GMT+0000 (Coordinated Universal Time)
cuid: cm6by1ews000408ic9qkn2woq
slug: tag-and-discover-biglake-data-challenge-lab-arc123
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737794572392/44c5bcd3-9d38-4e98-83ce-e80b0010d1fa.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1737794590522/8e0cb6c0-51bf-4788-b0ff-5fd81a1f449a.png
tags: tag-and-discover-biglake-data-challenge-lab-arc123, tag-and-discover-biglake-data-challenge-lab, arc123

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Setup**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## **Challenge scenario**

You are just starting your junior data engineer role. So far you have been helping teams create and manage BigLake assets.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with some of their initial work on a new project. Specifically, they need to create a new BigLake table from Cloud Storage and tag data using a new tag template to label sensitive data for online shopping sessions by customers; you receive the following request to complete the following tasks:

* Create a BigQuery dataset to store the connection to your BigLake table.
    
* Create a BigLake table using a Cloud Resource connection.
    
* Create a tag template to label sensitive data and apply tags to the BigLake table.
    

Some standards you should follow:

* Ensure that any needed APIs (such as Data Catalog and BigQuery Connection API) are successfully enabled and that necessary service accounts have the appropriate permissions.
    
* Create all resources in the `us-east4` region, unless otherwise directed.
    

Each task is described in detail below, good luck!

## **Task 1. Create a BigQuery dataset**

* Create a BigQuery dataset named **ecommerce** that is multi-region in the United States.
    

Click *Check my progress* to verify the objective.

Create a BigQuery dataset

Check my progress

## **Task 2. Create a BigLake table using a Cloud Resource connection**

1. Create a Cloud Resource connection named **customer\_data\_connection** with the appropriate service account permissions to read Cloud Storage files in your project.
    
2. Within the BigQuery dataset named **ecommerce**, use the Cloud Resource connection to create a BigLake table named **customer\_online\_sessions**.
    

* When creating the table, load data from the following Cloud Storage file using schema auto-detection:
    
    * gs://`qwiklabs-gcp-02-b1e1641dfedd`\-bucket/customer-online-sessions.csv
        

Click *Check my progress* to verify the objective.

Create a BigLake table using a Cloud Resource connection

Check my progress

## **Task 3. Create a tag template and attach a tag to the BigLake table**

1. Create a public tag template named **Sensitive Data Template** with two fields:
    

* Boolean field named **Has Sensitive Data**.
    
* Enumerated field named **Sensitive Data Type** that contains three values: `Location Info`, `Contact Info`, and `None`.
    

2. Use the tag template to tag the BigLake table as containing sensitive data using both enumerated fields:
    

* **Has Sensitive Data** = `TRUE`
    
* **Sensitive Data Type** = `Location Info`
    

Click *Check my progress* to verify the objective.

Create a tag template and attach a tag to the BigLake table

---

## Solution of Lab

%[https://www.youtube.com/watch?v=_c6Zmt9pAgk&ab_channel=QUICKGCPLAB] 

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