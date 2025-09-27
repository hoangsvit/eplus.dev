---
title: "Get Started with Looker: Challenge Lab - ARC107"
seoTitle: "Get Started with Looker: Challenge Lab - ARC107"
seoDescription: "Master Looker skills with a challenge lab: complete tasks independently, using Looker Studio and Looker to analyze and visualize data"
datePublished: Thu Sep 18 2025 01:33:46 GMT+0000 (Coordinated Universal Time)
cuid: cmfoqlxjp000002l1et7f9cuy
slug: get-started-with-looker-challenge-lab-arc107
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758159097045/a5df6fa4-8f90-4a5e-930c-71bfd9549dce.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1758158263244/afb2aa05-e907-4d71-a3f4-ec193598cb29.png
tags: get-started-with-looker-challenge-lab-arc107, get-started-with-looker-challenge-lab, arc107

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## Setup

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## Challenge scenario

You are just starting your junior data analyst role. So far you have been helping teams analyze and visualize data using Looker Studio and Looker.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with some of their initial work on a new project around analyzing and visualizing online sales data. You have been asked to assist the Sales team with their analysis in both Looker Studio and Looker; you receive the following request to complete the following tasks:

* Create a report of BigQuery public data in Looker Studio.
    
* Create a new view and join it to an existing Explore in Looker.
    
* Create a new dashboard in Looker.
    

Each task is described in detail below, good luck!

## Task 1. Create a new report in Looker Studio

1. Create a new [Looker Studio](http://lookerstudio.google.com/) report named **Online Sales**, and connect to **Public datasets** &gt; `qwiklabs-gcp-03-32e4ec77b489` &gt; **thelook\_ecommerce** &gt; **orders**.
    
2. Add a time series chart using any theme and title of your choice.
    

Click *Check my progress* to verify the objective.

Create a new BigQuery data source in Looker Studio

## Task 2. Create a new view in Looker

1. Create a new view named **users\_region** with the following specifications:
    

* Use the source table named `cloud-training-demos.looker_ecomm.users`.
    
* Include the following dimensions:
    
    * **id** as a primary key using the `number` type and the following sql reference: `${TABLE}.id`
        
    * **state** using the `string` type and the following sql reference: `${TABLE}.state`
        
    * **country** using the `string` type and the following sql reference: `${TABLE}.country`
        
* Include the following measure:
    
    * **count** with **drill\_fields** that includes only the dimensions that you have included in the new view
        

2. Join the new view to the existing Events Explore.
    
3. Deploy your changes to production.
    

Click *Check my progress* to verify the objective.

Create a new view and join it to a Looker Explore

## Task 3. Create a new dashboard in Looker

1. Use your new view named **users\_region** to create a bar chart of the **top 3 event types based on the highest number of users**.
    
2. Customize your bar chart using any colors and labels of your choice.
    
3. Save your bar chart to a new dashboard named **User Events**.
    

Click *Check my progress* to verify the objective.

Create a new dashboard in Looker

---

## Solution of Lab

### Quick

%[https://youtu.be/D7PLn86zU6Y] 

**🧠 Task 1: Create a New Report in** [**Looker Studio**](http://lookerstudio.google.com/)

Create a report named **Online Sales** and visualize order data from **BigQuery**.

**Public datasets** &gt; `PROJECT-ID` &gt; **thelook\_ecommerce** &gt; **orders**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758963530296/0a2c25f3-8dbd-46b4-a0da-94d1933836da.png align="center")

```plaintext
Online Sales
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758963582723/a53e96ea-4a06-4f73-bebf-139483be954b.png align="center")

---

**✅Development Mode → qwiklabs-ecommerce**

**Create a new view named** `users_region` **and paste the following:**

```apache
view: users_region {
  sql_table_name: cloud-training-demos.looker_ecomm.users ;;
  
  dimension: id {
    type: number
    sql: ${TABLE}.id ;;
    primary_key: yes
  }
  
  dimension: state {
    type: string
    sql: ${TABLE}.state ;;
  }
  
  dimension: country {
    type: string
    sql: ${TABLE}.country ;;
  }
  
  measure: count {
    type: count
    drill_fields: [id, state, country]
  }
}
```

**Replace the following in** `training_ecommerce.model` **file:**

```apache
connection: "bigquery_public_data_looker"

# include all the views
include: "/views/*.view"
include: "/z_tests/*.lkml"
include: "/**/*.dashboard"

datagroup: training_ecommerce_default_datagroup {
  # sql_trigger: SELECT MAX(id) FROM etl_log;;
  max_cache_age: "1 hour"
}

persist_with: training_ecommerce_default_datagroup

label: "E-Commerce Training"

explore: order_items {
  join: users {
    type: left_outer
    sql_on: ${order_items.user_id} = ${users.id} ;;
    relationship: many_to_one
  }

  join: inventory_items {
    type: left_outer
    sql_on: ${order_items.inventory_item_id} = ${inventory_items.id} ;;
    relationship: many_to_one
  }

  join: products {
    type: left_outer
    sql_on: ${inventory_items.product_id} = ${products.id} ;;
    relationship: many_to_one
  }

  join: distribution_centers {
    type: left_outer
    sql_on: ${products.distribution_center_id} = ${distribution_centers.id} ;;
    relationship: many_to_one
  }
}

explore: events {
  join: event_session_facts {
    type: left_outer
    sql_on: ${events.session_id} = ${event_session_facts.session_id} ;;
    relationship: many_to_one
  }
  join: event_session_funnel {
    type: left_outer
    sql_on: ${events.session_id} = ${event_session_funnel.session_id} ;;
    relationship: many_to_one
  }
  join: users {
    type: left_outer
    sql_on: ${events.user_id} = ${users.id} ;;
    relationship: many_to_one
  }
  join: users_region {
    type: left_outer
    sql_on: ${events.user_id} = ${users_region.id};;
    relationship: many_to_one
  }
}
```

**Task 3:**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758964403931/831f6714-fd1a-419f-b2f4-fb183dcd632f.png align="center")

* Click **Save → Save as a Look**.
    
    * Name it: `Top 3 Event Types`
        
* Then click **Save to Dashboard → Create New Dashboard**.
    
    * Name the dashboard: **User Events**
        
* Click **Save**.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758964290765/989c1968-da94-40a2-ab4c-65ee04ac2e39.png align="center")

---

## Manual

**🧠 Task 1: Create a New Report in Looker Studio**

🎯 Goal

Create a report named **Online Sales** and visualize order data from BigQuery.

---

**1\. Create a new Looker Studio report**

* Go to Looker Studio.
    
* Click **“+ Blank Report”**.
    
* Name it **Online Sales**.
    

**2\. Connect to BigQuery public dataset**

* Click **“Add data” → BigQuery**.
    
* Navigate to:
    
    ```plaintext
    Public datasets > qwiklabs-gcp-01-15e3b0e540a4 > thelook_ecommerce > orders
    ```
    
* Click **Connect → Add to Report**.
    

**3\. Add a Time Series chart**

* Click **“Add a chart” → “Time series”**.
    
* Set:
    
    * **Dimension:** `created_at` (or `date`)
        
    * **Metric:** `total_amount` or `order_count`
        
* Customize the title and theme (any style you like).
    
* Click **Save**.
    

✅ **Result:** A report named **Online Sales** with a time series chart from BigQuery.

---

**🧠 Task 2: Create a New View in Looker**

🎯 Goal

Create a new view `users_region` and join it with the existing `events` Explore.

---

**1\. Create a new view file**

* In Looker **Develop** mode, go to the `views/` folder.
    
* Create a new file named: `users_region.view.lkml`.
    

📄 Paste this LookML:

```apache
view: users_region {
  sql_table_name: cloud-training-demos.looker_ecomm.users ;;

  dimension: id {
    primary_key: yes
    type: number
    sql: ${TABLE}.id ;;
  }

  dimension: state {
    type: string
    sql: ${TABLE}.state ;;
  }

  dimension: country {
    type: string
    sql: ${TABLE}.country ;;
  }

  measure: count {
    type: count
    drill_fields: [id, state, country]
  }
}
```

---

**2\. Join the view to** `events` Explore

* Open `events.explore.lkml`.
    
* Add the following join:
    

```apache
explore: events {
  join: users_region {
    type: left_outer
    sql_on: ${events.user_id} = ${users_region.id} ;;
    relationship: many_to_one
  }
}
```

---

**3\. Deploy to production**

* Click **Validate LookML** → fix any errors if shown.
    
* Click **Deploy to Production** to publish the changes.
    

✅ **Result:** New view `users_region` is created and successfully joined with `events`.

---

**🧠 Task 3: Create a New Dashboard in Looker**

🎯 Goal

Create a dashboard **User Events** with a bar chart showing the **top 3 event types** with the **highest number of users**.

---

**1\. Go to Explore**

* In Looker, click **Explore**.
    
* Select the Explore that includes the `users_region` join (usually `events`).
    

---

**2\. Build the query**

* Under **Dimensions**, select:
    
    * `events.event_type`
        
* Under **Measures**, select:
    
    * `users_region.count` (number of users per event type)
        
* **Sort**: by `users_region.count` **descending**.
    
* **Limit**: set **3 rows** (top 3 event types).
    

---

**3\. Create the visualization**

* Click the **Visualization** tab.
    
* Choose **Bar Chart**.
    
* Customize:
    
    * **Title:** “Top 3 Event Types by User Count”
        
    * **X-Axis:** Event Type
        
    * **Y-Axis:** Number of Users
        
    * Pick any color scheme.
        
    * Enable data labels.
        

---

**4\. Save to a new dashboard**

* Click **Save → Save as a Look**.
    
    * Name it: `Top 3 Event Types`
        
* Then click **Save to Dashboard → Create New Dashboard**.
    
    * Name the dashboard: **User Events**
        
* Click **Save**.
    

✅ **Result:** A new dashboard **User Events** containing a bar chart showing the top 3 event types with the highest number of users.

---

**📋 Final Verification Checklist**

| Task | What to Check | Status |
| --- | --- | --- |
| 1 | Report `Online Sales` created in Looker Studio with a time series chart | ✅ |
| 2 | View `users_region` created, joined to `events`, and deployed | ✅ |
| 3 | Dashboard `User Events` created with bar chart (Top 3 event types by users) | ✅ |