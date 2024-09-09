---
title: "Create a Secure Data Lake on Cloud Storage: Challenge Lab - ARC119"
seoTitle: "Create a Secure Data Lake on Cloud Storage: Challenge Lab - ARC119"
seoDescription: "In this challenge lab, you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you use the skills learned from the lab i"
datePublished: Mon Sep 09 2024 08:57:32 GMT+0000 (Coordinated Universal Time)
cuid: cm0urs149001g09jvb6m9ac6a
slug: create-a-secure-data-lake-on-cloud-storage-challenge-lab-arc119
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1725871493688/2a89a068-7fc7-45ac-8054-0127dd6c33cc.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1725872240652/3fb8c17e-2d79-4151-81f9-06556fe6334a.jpeg
tags: create-a-secure-data-lake-on-cloud-storage-challenge-lab-arc119, arc119

---

## **Overview**

In this challenge lab, you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you use the skills learned from the lab in the quest to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) provides feedback on whether you have completed your tasks correctly.

When taking a challenge lab, you won't receive instruction on new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

**Note:** Once the lab environment has been fully provisioned, the tasks will become visible. The tasks that are assigned to you are independent, so you are free to perform the tasks in any order you want.

## **Challenge scenario**

You are just starting your junior data engineer role. So far you have been helping teams understand and assign required permissions to users, and create a secure data lake on Cloud Storage.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with some of their initial work on creating a secure data lake. You have been asked to create a secure data lake on Cloud Storage and Big Query Dataset you receive the following request to complete the following tasks:

For each time when you start the lab, you get different tasks and you need to perform it accordingly to learn the concept of the data lake.

* Ensure that any needed APIs (such as Dataplex API) are successfully enabled.
    
* Create all resources in the `us-east4` and `us-east4-c`, unless otherwise directed.
    

Each task is described in detail below, good luck!

## **Task 1:** Create a Cloud Storage bucket

1. Sign into the project as **User 1**
    
2. Create a regional Cloud Storage bucket using the following bucket name:<mark>[PROJECT-ID]</mark>\-bucket and replace the PROJECT\_ID in the bucket name with the project ID provided at the left side of the lab instructions.
    
3. Use the same bucket you have created in the above step to attach as an asset to the zone
    

Click **Check my progress** to verify the objective.

Verify Task

**Check my progress**

## **Task 2:** Create a lake in Dataplex and add a zone to your lake

1. Sign into the project as **User 2**
    
2. Create a lake in Dataplex using the below information:
    

| Property | Value | | --- | --- | | **Display Name** | Customer-Lake | | **ID** | Leave the default value. | | Region | Region from the Lab Details panel which is located at the left side of the lab instructions |

4. Add a zone to your lake:**Customer-Lake**. Use the information below:
    
5.   
    
    | Display Name | Value |
    | --- | --- |
    | **Display Name** | Public-Zone |
    | **ID** | Leave the default value. |
    | **Type** | Raw zone |
    | **Data locations** | Regional |
    | **Discovery settings** | Enable metadata discovery |
    
6. For the **Lables** set key\_1 as: <mark>domain_type</mark> and value\_1 as: <mark>source_data</mark>
    

Click **Check my progress** to verify the objective.

Verify Task

**Check my progress**

## **Task 3:** Environment Creation for Dataplex Lake

1. Navigate to the lake:**Customer-Lake** and create an environment for the lake
    
2. Use the below configuration for the environment creation
    
3. | Property | Value |
    | --- | --- |
    | Display Name | Dataplex-lake-env |
    | Configure Compute | Number of nodes= 3 |
    | **Enable** auto shut-down |  |
    | Software Package | Leave the default value |
    

This will create the environment which we would be using while exploring the data.

**Note:** Based on the volume of data being analyzed and the complexity of operations while analyzing the data, we can configure the environment by increasing/decreasing the number of nodes, space on disk, Auto Scaling etc.

Click **Check my progress** to verify the objective.

Verify Task

**Check my progress**

## **Task 4**

## Create a tag template

To begin tagging data, an asset must be added to the zone . A tag template is a reusable structure that can be used to swiftly create new tags. You are required to structure the tags by topic using tag templates. Therefore, in this task you must create a tag template and attach a tag template to an asset and related fields as detailed in the following table.

| Tag template name | Tag template ID | Location | Fields | Type |
| --- | --- | --- | --- | --- |
| Customer Data Tag Template | customer\_data\_tag\_template | Use the default region | Data Owner | String |
| PII Data | Enumurated**Value 1:** Yes**Value 2:** No |  |  |  |

Therefore, attach a tag to the**Storage bucket**Data Catalog entry under the `CLOUD STORAGE` source system. Use the<mark>Customer Data Tag Template</mark>template to tag this entry, and provide the values for the tag fields provided in the following table.

| Tag field | Value |
| --- | --- |
| Data Owner | Enter your name here |
| PII Data | Yes |

Search for assets using a Tag Template: **Customer Data Tag Template**

Click **Check my progress** to verify the objective.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=PbIfliCwHQw&ab_channel=Techcps] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725872009346/13a61b99-7568-40f6-a6c1-0387bc9ce914.png align="center")

---

Invalid form number. Please enter 1, 2, 3, or 4: (Let's find the Form Number: Press <mark>Ctrl + G</mark>)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725872799140/01a8f325-e68d-4b68-a1a0-b22898cf566e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725872846131/5ed51771-72eb-4a47-b9d4-07ff88d5530e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725872887174/2d5a792b-10d2-4e1c-b244-584fd67070e3.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725872927679/bd12fb46-eede-4c6a-8e1d-e08081b3c675.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725872780938/c74902f8-6e16-4a7f-af8d-29b9d7bf3fb8.png align="center")

---

🚀***Form 1***

* **Task 1. Create a Cloud Storage bucket**
    
* **Task 2. Create a lake in Dataplex and add a zone to your lake**
    
* **Task 3. Environment Creation for Dataplex Lake**
    
* **Task 4. Create a tag template**
    

---

🚀 ***Form 2***

* **Task 1. Create a lake in Dataplex and add a zone to your**
    
* **Task 2. Environment Creation for Dataplex**
    
* **Task 3. Attach an existing Cloud Storage bucket to the zone**
    
* **Task 4. Create a tag template**
    

---

🚀 ***Form 3***

* **Task 1. Create a BigQuery dataset**
    
* **Task 2. Add a zone to your lake**
    
* **Task 3. Attach an existing BigQuery Dataset to the Lake**
    
* **Task 4. Create a tag template**
    

---

🚀 ***Form 4***

* **Task 1. Create a lake in Dataplex and add a zone to your lake**
    
* **Task 2. Attach an existing Cloud Storage bucket to the zone**
    
* **Task 3. Attach an existing BigQuery Dataset to the Lake**
    
* **Task 4. Create Entities**