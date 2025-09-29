---
title: "Share Data using Google Data Cloud: Challenge Lab - GSP375"
seoTitle: "Share Data using Google Data Cloud: Challenge Lab - GSP375"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Sun Apr 13 2025 08:17:11 GMT+0000 (Coordinated Universal Time)
cuid: cm9fdg54l000b09la8cg64koo
slug: share-data-using-google-data-cloud-challenge-lab-gsp375
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744530257626/34980ecc-8975-4497-bd28-429f71c4f84b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744532215124/63d2b2b6-6e3b-441a-b29d-796e1a2ec0c6.png
tags: share-data-using-google-data-cloud-challenge-lab-gsp375, share-data-using-google-data-cloud-challenge-lab, gsp375

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Share Data Using Google Data Cloud](https://www.cloudskillsboost.google/course_templates/657) course. Are you ready for the challenge?

### Topics tested:

* Share BigQuery datasets across Google Cloud projects
    
* Enrich datasets based on a curated data
    
* Enable bi-directional data exchange
    
* Create a visualization in Looker Studio
    

### Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Challenge scenario

You are a Google Cloud Data Sharing Partner hosting an application for multiple customers, storing data, and providing analytics as a service. The application caters to a customer that depends on your data to enrich their application data. In turn, the customer then shares high-level metrics with the Data Sharing Partner to better understand the customer footprint.

In this lab, you will be required to act as both the Data Sharing Partner and the customer by enabling bi-directional data exchange in BigQuery, as well as creating a visualization in Looker Studio.

![lab architectural diagram](https://cdn.qwiklabs.com/J7qOIElm12DamovB4BG42nuSgyeRAG02XA%2FEnFKPc6o%3D align="left")

## Task 1. Create the partner authorized view

Your first task as a Data Sharing Partner is to copy a BigQuery public dataset into your project. The dataset contains details of each zip code across the US. In this section, you will need to expose the loaded dataset as an authorized view and grant access to a specific customer user.

For this task, you will need to be logged into the **Data Sharing Partner Project Console** with the associated credentials.

1. Create an authorized view named `authorized_view_sx7w` based off of the following query. Save it inside `demo_dataset`.
    

```apache
SELECT
 *
FROM
 `bigquery-public-data.geo_us_boundaries.zip_codes`;
```

Copied!content\_copy

Click Check my progress to verify the objective.

Create the partner authorized view

**Check my progress**

### Authorize the view

Next, you will need to assign IAM permissions by authorizing the view in the dataset.

1. Authorize the `authorized_view_sx7w` view you just created.
    

### Assign IAM permissions for the customer user

Next, you will need to grant the *Customer* user the **BigQuery Data Viewer** role on the authorized view you created.

1. Grant the customer user access to the `authorized_view_sx7w` view.
    
    * Their username is: `student-00-182bd4e88f65@qwiklabs.net`
        
    * Grant them the **BigQuery Data Viewer** role
        

Click Check my progress to verify the objective.

Authorize the view and Assign IAM permissions for the customer user

**Check my progress**

## Task 2. Update the customer data table

In this task, you will be acting as the customer. Your next step is to run a query to update the customer table inside of your project.

For this task, you will need to be logged into the **Customer Project Console** with the associated credentials.

1. Execute the query below to update the county value in the customer table.
    

```apache
UPDATE
 `qwiklabs-gcp-02-a698d7ab354d.customer_dataset.customer_info` cust
SET
cust.county=vw.county
FROM
`qwiklabs-gcp-03-84a0d21f7665.demo_dataset.authorized_view_sx7w` vw
WHERE
vw.zip_code=cust.postal_code;
```

Copied!content\_copy

You should see the following result:

```apache
This statement modified 14 rows in customer_info.
```

## Task 3. Create the customer authorized view

In this section, you will need to create a customer authorized view and grant access to a specific Data Sharing Partner user.

For this task, you will need to be logged into the **Customer Project Console** with the associated credentials.

1. Create an authorized view named `customer_authorized_view_u82d` based off of the following query that lists the counties and number of customers in the listed counties. Save it inside `customer_dataset`.
    

```apache
SELECT
  county,
COUNT(1) AS Count
FROM
 `qwiklabs-gcp-02-a698d7ab354d.customer_dataset.customer_info` cust
GROUP BY
 county
HAVING county is not null
```

Copied!content\_copy

Click Check my progress to verify the objective.

Create the customer authorized view

**Check my progress**

### Authorize the view

Next, you will need to assign IAM permissions by authorizing the customer view in the dataset.

1. Authorize the`customer_authorized_view_u82d` view you just created.
    

### Assign IAM permissions for the partner user

Next, you will need to grant the *Data Sharing Partner* user the **BigQuery Data Viewer** role on the customer authorized view you created.

1. Grant the Data Sharing Partner user access to the`customer_authorized_view_u82d` view.
    
    * Their username is: `student-02-007aa3bf4469@qwiklabs.net`
        
    * Grant them the **BigQuery Data Viewer** role
        

Click Check my progress to verify the objective.

Authorize the view and Assign IAM permissions for the partner user

**Check my progress**

## Task 4. Use the customer authorized view to create a visualization

Your fourth task is to consume the customer’s authorized view in the Data Sharing Partner project and create a column chart visualization that shows the distribution of the customers and counties.

For this task, you will need to be logged into the **Data Sharing Partner Project Console** with the associated credentials.

### Connect BigQuery to Looker Studio

1. Open [Google Looker Studio](https://datastudio.google.com/) and create a **Blank Report**.
    
2. Connect **BigQuery** and authorize to Looker Studio.
    
3. From **My Projects** on the left pane, navigate to the customer project and select `customer_authorized_view_u82d`. Add the table to the blank report.
    

Click Check my progress to verify the objective.

Connect BigQuery to Looker Studio

**Check my progress**

### Create a visualization in Looker Studio

1. Create a visualization with the following requirements:
    
    * Report name: `Data Sharing Partner Vizualization`
        
    * For the visualization, insert a **Column Chart**
        
    * For the Column Chart, set `county` as the **Dimension** and `Count` as the **Breakdown Dimension** and **Metric**.
        

The visualization should resemble the following:

![visualization of report](https://cdn.qwiklabs.com/o%2BDUSbgiGGVEa2nEYuN6GT6MzcJdMBQcKCiKpBrrpYw%3D align="left")

---

## Solution of Lab

%[https://youtu.be/JdnZeytIw74] 

### 🥇 Task 1: Create the Partner Authorized View

🔑 **Work in the Data Sharing Partner Project Console**

1. Open **BigQuery Console** → make sure you are in the **Data Sharing Partner project**.
    
2. Create the authorized view inside `demo_dataset`:
    

```apache
CREATE OR REPLACE VIEW `demo_dataset.authorized_view_b9g4` AS
SELECT
  *
FROM
  `bigquery-public-data.geo_us_boundaries.zip_codes`;
```

✅ **Authorize the view:**

* Go to `demo_dataset` → **SHARE DATASET** → **Authorized Views**
    
* Add the view: `demo_dataset.authorized_view_b9g4`
    

✅ **Grant IAM permissions to the customer user:**

* Go to **IAM** → **Grant Access**
    
* Add email: `student-01-a8002e448ea7@qwiklabs.net`
    
* Role: **BigQuery Data Viewer**
    

---

### 🥈 Task 2: Update the Customer Data Table

🔑 **Work in the Customer Project Console**

1. Open **BigQuery Console** → switch to the **Customer project**.
    
2. Run the following query to update the `county` field:
    

```apache
UPDATE
  `qwiklabs-gcp-04-6d5854c77740.customer_dataset.customer_info` cust
SET
  cust.county = vw.county
FROM
  `qwiklabs-gcp-01-799db57f207f.demo_dataset.authorized_view_b9g4` vw
WHERE
  vw.zip_code = cust.postal_code;
```

👉 You should see this result:  
`This statement modified 14 rows in customer_info.`

---

### 🥉 Task 3: Create the Customer Authorized View

🔑 **Still in the Customer Project Console**

1. Create the authorized view inside `customer_dataset`:
    

```apache
CREATE OR REPLACE VIEW `customer_dataset.customer_authorized_view_mz9o` AS
SELECT
  county,
  COUNT(1) AS Count
FROM
  `qwiklabs-gcp-04-6d5854c77740.customer_dataset.customer_info` cust
GROUP BY
  county
HAVING
  county IS NOT NULL;
```

✅ **Authorize the view:**

* Go to `customer_dataset` → **SHARE DATASET** → **Authorized Views**
    
* Add: `customer_dataset.customer_authorized_view_mz9o`
    

✅ **Grant IAM permissions to the partner user:**

* Go to **IAM** → **Grant Access**
    
* Add email: `student-01-52643675794b@qwiklabs.net`
    
* Role: **BigQuery Data Viewer**
    

---

### 🏆 Task 4: Create a Visualization with Looker Studio

🔑 **Switch back to the Data Sharing Partner Project**

1. Open Looker Studio → create a **Blank Report**.
    
2. Connect to **BigQuery** → go to **My Projects** → navigate to the **Customer project** → select:
    
    ```apache
    customer_dataset.customer_authorized_view_mz9o
    ```
    
3. Build the visualization:
    
    * **Report name:** `Data Sharing Partner Visualization`
        
    * Insert a **Vertical Bar Chart**
        
    * **Dimension:** `county`
        
    * **Metric:** `Count`
        

✅ The chart should display the number of customers by county.