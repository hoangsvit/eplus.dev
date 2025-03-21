---
title: "Secure BigLake Data: Challenge Lab - ARC129"
seoTitle: "Secure BigLake Data: Challenge Lab - ARC129"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Fri Mar 21 2025 08:37:31 GMT+0000 (Coordinated Universal Time)
cuid: cm8ij1ohh001n09jv5cop15ju
slug: secure-biglake-data-challenge-lab-arc129
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742546158148/32d67e5f-9f45-47a5-a59a-da6de8c2c144.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1742546233812/9e89e6f0-cd9e-453c-92fb-807a2268fcb9.png
tags: secure-biglake-data-challenge-lab-arc129, secure-biglake-data-challenge-lab, arc129

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

You are asked to help a newly formed development team with some of their initial work on a new project. Specifically, they need a new BigLake table from a Cloud Storage file with the appropriate permissions to limit access to sensitive data columns; you receive the following request to complete the following tasks:

* Create a BigLake table from an existing file on Cloud Storage.
    
* Apply and verify policy tags to restrict access to columns containing sensitive data.
    
* Remove direct IAM permissions to Cloud Storage for other users (after policy tags have been applied to protect the data).
    

Some standards you should follow:

* Ensure that any needed APIs (such as Data Catalog and BigQuery Connection API) are successfully enabled and that necessary service accounts have the appropriate permissions.
    
* Create all resources in the multiple regions in United States, unless otherwise directed.
    

Each task is described in detail below, good luck!

## **Task 1. Create a BigLake table using a Cloud Resource connection**

1. Create a BigQuery dataset named **online\_shop** that is multi-region in the United States.
    
2. Create a Cloud Resource connection named **user\_data\_connection** (multi-region in the United States) and use it to create a BigLake table named **user\_online\_sessions** in the **online\_shop** dataset.
    

* Be sure to apply the appropriate service account permissions to read Cloud Storage files in your project.
    
* When creating the table, load data from the following Cloud Storage file using schema auto-detection:
    
    * gs://`qwiklabs-gcp-02-e0360202de5c`\-bucket/user-online-sessions.csv
        

Click *Check my progress* to verify the objective.

Create a BigLake table using a Cloud Resource connection

Check my progress

## **Task 2. Apply and verify policy tags on columns containing sensitive data**

1. Use the precreated taxonomy named `access_control-taxonomy-9py6b` to apply column-level policy tags on the table.
    

* Apply the policy tag named **sensitive-data-policy** to the following columns in the **user\_online\_sessions** table:
    
    * zip
        
    * latitude
        
    * ip\_address
        
    * longitude
        

2. Verify the column-level security by running a query that omits the protected columns.
    

Click *Check my progress* to verify the objective.

Apply and verify policy tags to columns containing sensitive data

Check my progress

## **Task 3. Remove IAM permissions to Cloud Storage for other users**

* Follow Google best practices after migrating data to BigLake by removing IAM permissions for user 2 ([`student-02-65b54431cc51@qwiklabs.net`](mailto:student-02-65b54431cc51@qwiklabs.net)) to Cloud Storage.
    
    * Leave the IAM role for project viewer.
        
    * Remove only the IAM role for Cloud Storage.
        

Click *Check my progress* to verify the objective.

Remove IAM permissions to Cloud Storage for other users

---

## Solution of Lab

%[https://youtu.be/cX2bsOHifis] 

```apache
 export USER_2=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1742546201290/3177808a-83a4-442f-8412-050dc283a47d.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Secure%20BigLake%20Data%20Challenge%20Lab/arc129.sh
sudo chmod +x arc129.sh
./arc129.sh
```