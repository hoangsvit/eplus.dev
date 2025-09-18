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

%[https://youtu.be/RelWwc5WAUs] 

**Create a new view named** `users_region` **and Paste the following:**

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

**Replace the follwing in** `training_ecommerce.model` **file:**

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