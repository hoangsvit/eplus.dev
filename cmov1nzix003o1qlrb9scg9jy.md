---
title: "Build a Data Mesh with Knowledge Catalog: Challenge Lab - GSP514"
seoTitle: "Build a Data Mesh with Knowledge Catalog: Challenge Lab - GSP514"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-05-07T05:27:16.380Z
cuid: cmov1nzix003o1qlrb9scg9jy
slug: build-a-data-mesh-with-knowledge-catalog-challenge-lab-gsp514
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/b5c12a30-74a3-4aa0-8f32-90a0f39e8863.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/925f08f1-9583-4202-badb-31abd83aecd3.png
tags: build-a-data-mesh-with-knowledge-catalog-challenge-lab-gsp514, build-a-data-mesh-with-knowledge-catalog-challenge-lab, gsp514

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Build a Data Mesh with Knowledge Catalog](https://www.skills.google/course_templates/681) skill badge. Are you ready for the challenge?

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## **Challenge scenario**

You are just starting your junior data engineer role. So far you have been helping teams create and manage Knowledge Catalog assets.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with building a new data mesh using Knowledge Catalog. Specifically, you need to create a Knowledge Catalog lake with multiple zones and assets. You also need to create aspects types and add aspects to assets in the new lake, and assess data quality; you receive the following request to complete the following tasks:

*   Create a Knowledge Catalog lake with two zones and two assets.
    
*   Create an aspect type for protected data and add an aspect to a zone.
    
*   Assign a Knowledge Catalog IAM role to another user.
    
*   Create and upload a data quality specification file to Cloud Storage.
    
*   Define and run a data quality job in Knowledge Catalog.
    

Some standards you should follow:

*   Ensure that any needed APIs (such as Knowledge Catalog, Data Catalog, and Managed Apache Spark) are successfully enabled.
    
*   Create all resources in the `us-central1` region, unless otherwise directed.
    

Each task is described in detail below, good luck!

## **Task 1. Create a Knowledge Catalog lake with two zones and two assets**

**Note:** For all tasks in this challenge lab, create the resources in the `us-central1` region, unless otherwise directed.

The Cloud Storage bucket and BigQuery dataset for step 2 have been pre-created in this lab.

1.  Create a Knowledge Catalog lake named **Sales Lake** with two regional zones:
    

*   Raw zone named **Raw Customer Zone**
    
*   Curated zone named **Curated Customer Zone**
    

2.  Attach one pre-created asset to each zone:
    

*   To the raw zone, attach the Cloud Storage bucket named `qwiklabs-gcp-02-af0defb4e0d1`**\-customer-online-sessions** as a new asset named **Customer Engagements**.
    
*   To the curated zone, attach the BigQuery dataset named `qwiklabs-gcp-02-af0defb4e0d1`**.customer\_orders** as a new asset named **Customer Orders**.
    

**Helpful hint for creating a Knowledge Catalog lake!**

Review the lab titled [Knowledge Catalog: Qwik Start - Console](https://www.skills.google/catalog_lab/6331).

Click **Check my progress** to verify the objective.

Create a Knowledge Catalog lake with two zones and two assets

## **Task 2. Create an aspect type and add an aspect to a zone**

1.  Create an aspect type named **Protected Customer Data Aspect** with two enumerated fields:
    

*   First field named **Raw Data Flag** with two values: **Yes** and **No**.
    
*   Second field named **Protected Contact Information Flag** with two values: **Yes** and **No**.
    

2.  Add this aspect to the **Raw Customer Zone** using a value of **Yes** for both flags.
    

**Helpful hint for creating and applying aspect types!**

Click **Check my progress** to verify the objective.

Create an aspect type and add an aspect to a zone

## **Task 3. Assign a Knowledge Catalog IAM role to another user**

*   Using the principle of least privilege, assign the appropriate Knowledge Catalog IAM role to User 2 ([`student-03-fdc6739dd39a@qwiklabs.net`](mailto:student-03-fdc6739dd39a@qwiklabs.net)) that allows them to upload new Cloud Storage files to the Knowledge Catalog asset named **Customer Engagements**.
    

**Helpful hint for assigning Knowledge Catalog IAM roles!**

Click **Check my progress** to verify the objective.

Assign a Knowledge Catalog IAM role to another user

## **Task 4. Create and upload a data quality specification file to Cloud Storage**

The Cloud Storage bucket for step 2 has been pre-created in this lab.

1.  Create a data quality specification file named **dq-customer-orders.yaml** with the following specifications:  
    \- NOT NULL rule applied (with a threshold of 100%) to the user\_id column of the customer\_orders.ordered\_items table  
    \- NOT NULL rule applied (with a threshold of 100%) to the order\_id column of the customer\_orders.ordered\_items table  
    \- BigQuery destination table for the results: qwiklabs-gcp-02-af0defb4e0d1.orders\_dq\_dataset.results
    
2.  Upload the file to the Cloud Storage bucket named `qwiklabs-gcp-02-af0defb4e0d1`**\-dq-config**.
    

**Helpful hint for creating data quality specification files!**

## **Task 5. Define and run an auto data quality job in Knowledge Catalog**

The BigQuery dataset for step 1 has been pre-created in this lab.

1.  Define a auto data quality job using the **dq-customer-orders.yaml** file with the following specifications:
    

| **Property** | **Value** |
| --- | --- |
| **Data Quality Job Name** | **customer-orders-data-quality-job** |
| **Source Data** | `qwiklabs-gcp-02-af0defb4e0d1`**.customer\_orders.ordered\_items** |
| **User service account** | **Compute Engine default service account** |

2.  Run the auto data quality job immediately.
    

It can take several minutes for the job to run. You may need to refresh the page to see that the job has run successfully.

**Helpful hint for defining and running the data quality jobs!**

* * *

## Solution of Lab