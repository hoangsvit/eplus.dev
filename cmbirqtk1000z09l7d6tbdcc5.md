---
title: "Creating dynamic SQL derived tables with LookML and Liquid - GSP932"
seoTitle: "Creating dynamic SQL derived tables with LookML and Liquid - GSP932"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Thu Jun 05 2025 02:40:07 GMT+0000 (Coordinated Universal Time)
cuid: cmbirqtk1000z09l7d6tbdcc5
slug: creating-dynamic-sql-derived-tables-with-lookml-and-liquid-gsp932
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749090854455/66441bbb-f901-4c59-9fc2-7feefa8ff84f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749091186423/c51bfefe-03b1-4ca5-9876-9ab17e18ba74.png
tags: creating-dynamic-sql-derived-tables-with-lookml-and-liquid-gsp932, creating-dynamic-sql-derived-tables-with-lookml-and-liquid, gsp932

---

## Overview

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

In this lab, you learn how to create and update SQL derived tables to generate dynamic values and address multiple use cases.

### What you'll do

* Create SQL derived tables to address multiple use cases
    
* Update a SQL derived table to generate dynamic values using templated filters with Liquid
    
* Understand how business users leverage dynamic SQL derived tables to answer complex questions
    

### Prerequisites

Familiarity with LookML is necessary. Completing [Understanding LookML in Looker](https://www.cloudskillsboost.google/course_templates/774) is recommended before beginning this lab.

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** If you already have a personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to Looker

1. When ready, click **Start Lab**.
    
    The Lab Details pane appears with the temporary credentials that you must use for this lab.
    
    If you need to pay for the lab, a pop-up opens for you to select your payment method.
    
    Notice your lab credentials in the Lab details pane. You use them to sign in to the Looker instance for this lab.
    
    **Note:** If you use other credentials, you will get **errors or incur charges**.
    
2. Click **Open Looker**.
    
3. Enter the provided Username and Password in the **Email** and **Password** fields.
    
    Username:
    
    ```apache
    looker-developer@qwiklabs.net
    ```
    
    Password:
    
    ```apache
    YyzQk8yhmFv01Oo37BLSHrLjW4Iparf49u9KUFmqPck=
    ```
    
    **Important:** You must use the credentials from the Lab Details pane on this page. Do not use your Google Cloud Skills Boost credentials. If you have a personal Looker account, do not use it for this lab.
    
4. Click **Log In**.
    
    After a successful login, you see the Looker instance for this lab.
    

## Task 1. Create a single SQL derived table to address multiple use cases

In LookML, you can define derived tables using either SQL queries to define a SQL derived table or Explore queries to define a native derived table. Using a SQL derived table is often easier for SQL developers to understand and get started with derived tables in Looker.

In this task, you will create a SQL derived table called `user_facts` that is flexible enough to answer multiple customer behavior questions such as the following:

* What is the *Average Lifetime Revenue* and *Average Lifetime Order Count* for all customers in each US State?
    
* What is the first order date and last order date for a customer, in addition to their Total Revenue (lifetime) and Total Order Count (lifetime)?
    

### Define a new derived table using a SQL query

1. First, on the bottom left of the Looker User Interface, click the toggle button to enter **Development mode**.
    
2. Click the **Develop** tab, and then click **SQL Runner**.
    
3. In the **SQL Query** window, add the following query:
    

```apache
SELECT order_items.user_id AS user_id
    ,COUNT(distinct order_items.order_id) AS lifetime_order_count
    ,SUM(order_items.sale_price) AS lifetime_revenue
    ,MIN(order_items.created_at) AS first_order_date
    ,MAX(order_items.created_at) AS latest_order_date
FROM cloud-training-demos.looker_ecomm.order_items
GROUP BY user_id
LIMIT 10
```

In this example, the desired query selects the `user_id`, counts the lifetime order count for that user, and then sums the prices as a lifetime revenue for the user. It also determines the minimum and maximum values of the `created_at` column as the first order date and last order date, respectively.

The **GROUP BY** clause is used to group the results by `user_id`, and the **LIMIT** clause is used to limit the results, as you only need to review a subset of records to ensure that your query is working successfully.

4. Click **Run** to see the results of your query.
    

![The Results table displaying 10 rows of data](https://cdn.qwiklabs.com/6zcmk0aaGKncWSFFjFXWgm0xdZeznpY5bKFzMzWN8v0%3D align="left")

In this example, the query is indeed returning the user ID, the lifetime order count, the lifetime revenue generated from the user, and the first and last order dates.

Notice that the **LIMIT** clause is used to reduce the amount of data returned during this test; you will remove the **LIMIT** clause in an upcoming step when you create a new view file for the SQL derived table.

### Create a new view file for the SQL derived table

1. Click on **Settings** () next to **Run** (top right of page), and select **Add to Project**.
    
2. For **Project**, select **qwiklabs-ecommerce**.
    
3. For **View Name**, type: `user_facts`.
    
4. Click **Add**.
    

You are redirected to the Looker IDE to review the newly created view file for your SQL derived table. You can see that Looker auto-generates a view file for the SQL derived table based on the query you entered in the SQL Runner. The first 12 lines of the view file are shown below:

```apache
view: user_facts {
  derived_table: {
    sql: SELECT order_items.user_id AS user_id
          ,COUNT(distinct order_items.order_id) AS lifetime_order_count
          ,SUM(order_items.sale_price) AS lifetime_revenue
          ,MIN(order_items.created_at) AS first_order_date
          ,MAX(order_items.created_at) AS latest_order_date
      FROM cloud-training-demos.looker_ecomm.order_items
      GROUP BY user_id
      LIMIT 10
       ;;
  }
```

In Looker, your file should resemble the following:

![The user_facts.view displaying 10 lines of code](https://cdn.qwiklabs.com/3DDPc9N5i2i5kmRxFVA7MzqwQt5HnZlPC7AHFXGfqfY%3D align="left")

Notice that the new `user_facts` view has been created outside of the **views** folder. It is a best practice to keep the view files organized in the project.

5. Click on the arrow next to **views** to see the list of views.
    
6. Click `user_facts.view` and drag it under the **views** folder.
    
7. Click `user_facts.view` to see the view file for the SQL derived table.
    

Looker auto-generates a dimension for each column in the **SELECT** clause of the SQL query as well as a new count measure. In the next steps, you modify the view file to remove the **LIMIT** clause which is no longer desired, hide the new count measure, and add a primary key for the view.

8. Delete the code line for `LIMIT 10` from the sql parameter.
    

As highlighted previously, Looker auto-generates a count measure along with the dimensions used in the derived table. Sometimes this auto-generated count measure is not valuable, if you already have a count in another view that provides the same number.

In this example, the auto-generated count measure is counting the order IDs, and there is already a count of orders in the `order_items` view.

You can delete or hide the count measure using the `hidden: yes` parameter. Hiding the measure is a good idea if you would like to retain it for validation if this count is the same as another count.

9. In the **measure: count** definition, add a new line before `type: count`, and insert the following:
    

```apache
hidden: yes
```

A final best practice is to make sure that the new view has a primary key.

In this example, you can add the `primary_key: yes` parameter to the **user\_id** dimension, which is the central organizing ID of this view that provides details about each individual order.

10. In the **dimension: user\_id** definition, add a new line before `type: number`, and insert the following:
    

```apache
primary_key: yes
```

The new view called `user_facts` is now ready for you to create new dimensions and measures, join it to the explore in the model file, and/or finish out the Git workflow to send your changes to production. You will continue building on this in the next sections.

11. Click **Save Changes**. The updated code should resemble the following:
    

```apache
view: user_facts {
  derived_table: {
    sql: SELECT order_items.user_id AS user_id
          ,COUNT(distinct order_items.order_id) AS lifetime_order_count
          ,SUM(order_items.sale_price) AS lifetime_revenue
          ,MIN(order_items.created_at) AS first_order_date
          ,MAX(order_items.created_at) AS latest_order_date
      FROM cloud-training-demos.looker_ecomm.order_items
      GROUP BY user_id
       ;;
  }

  measure: count {
    hidden: yes
    type: count
    drill_fields: [detail*]
  }

  dimension: user_id {
    primary_key: yes
    type: number
    sql: ${TABLE}.user_id ;;
  }
```

In Looker, your file should resemble the following:

![The user_facts.view displaying 28 lines of code](https://cdn.qwiklabs.com/8l0%2B931WvEqYJiYvWGb7GEu45PlfWIf11w1EgWHCpYE%3D align="left")

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click *Check my progress* to verify the objective.

Create the view file for SQL derived table

**Check my progress**

## Task 2. Add measures to answer business questions

In this section, you will add a two measures to answer the initial customer behavior question you were interested in: *What is the Average Lifetime Revenue and Average Lifetime Order Count for all customers in each US State?*

1. In the **user\_facts.view** view, add two measures: `average_lifetime_revenue` and `average_lifetime_order_count` that calculate the average lifetime revenue and average lifetime order count:
    

```apache
measure: average_lifetime_revenue {
  type: average
  sql: ${TABLE}.lifetime_revenue ;;
}


measure: average_lifetime_order_count {
  type: average
  sql: ${TABLE}.lifetime_order_count ;;
}
```

2. Click **Save Changes**. Your view should resemble:
    

![The user_facts.view displaying lines 25 to 43 of code, mimicking the layout in the previous step](https://cdn.qwiklabs.com/ai4H6ZMcPe6UGMmAiuVTdl2Pp84rTKMmE5AX6JfAe6M%3D align="left")

### Join the new view to an Explore

In this section, you will review and test the new derived table. You will first join it to the `order_items` explore definition in the model file, and then use the **Order Items** Explore to review what business users would see if you pushed the changes to production.

1. From the same page, click on the `training_ecommerce.model` file inside of the **model** folder to modify its contents.
    
2. Locate the `explore: order_items` definition. Notice that there are several joins already defined such as the one for the **users** view.
    

![The training_ecommerce.model displaying lines 14 to 28](https://cdn.qwiklabs.com/wS0ZZWYF3PY8kedVzGCQfGVzLdoDRij9Hup1BcNhmDg%3D align="left")

3. In the `explore: order_items` definition, above the existing join for **users**, add a new join for `user_facts` by specifying:
    

```apache
join: user_facts {
    type: left_outer
    sql_on: ${order_items.user_id} = ${user_facts.user_id};;
    relationship: many_to_one
}
```

The `sql_on` parameter identifies the join field as `user_id`. The `relationship` parameter identifies that there are potentially many instances of an `user_id` in **order\_items** but only one instance of each `user_id` in **user\_facts**, which is organized as one summary row for each order.

4. Click **Save Changes**. Your explore should now include the following:
    

```apache
explore: order_items {
  
  join: user_facts {
    type: left_outer
    sql_on: ${order_items.user_id} = ${user_facts.user_id};;
    relationship: many_to_one
  }
  
  
  join: users {
    type: left_outer
    sql_on: ${order_items.user_id} = ${users.id} ;;
    relationship: many_to_one
  }
  ...
  ...
  ...
}
```

In Looker, your view should now resemble:

![The training_ecommerce.model with user_facts explore added, displaying lines 1 to 29](https://cdn.qwiklabs.com/FQZcqK1SVijKlh2CLaxN3%2BTFVajFPGe2vTn%2F%2F4VfD1s%3D align="left")

5. Now that you've joined the view to the Explore, navigate to the Explore page for **Order Items**.
    
6. Under the **User Facts** view, select the **User ID** dimension, and the **Average Lifetime Order Count** and **Average Lifetime Revenue** measures.
    
7. Set the Row Limit to **100**.
    
8. Click **Run**. The results should resemble the following:
    

![The results table displaying 10 rows of data for User ID dimension, the Average Lifetime Order Count, and Average Lifetime Revenue measures](https://cdn.qwiklabs.com/Z5AAbgBG%2B5B7aBdY0%2FvK27F9auNXiYta%2BUrkvYQvQb4%3D align="left")

9. Now, remove the **User ID** dimension and add the **State** dimension from the Users view.
    
10. Click the **Country** dimension and add a filter on it.
    
11. Select `USA`.
    

![USA filter](https://cdn.qwiklabs.com/dBVCxnWMC4vCTiQRgr84mtKxg0wZQU1HjtqlkurIUiI%3D align="left")

12. Click **Run** to run the query again.
    

You can see how the same measures can now be used to calculate one value for Average lifetime revenue and one for Average lifetime order count per user and per state!

13. Your results should resemble the following:
    

![The results table displaying 10 rows of data for Users country, Users state, Average Lifetime Order Count, and Average Lifetime Revenue measures](https://cdn.qwiklabs.com/8CSxuVC23IFwbpWRpbWplnRq2u8icY2Zq%2BhT1626B8s%3D align="left")

14. Navigate back to the **training\_ecommerce** model file.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click *Check my progress* to verify the objective.

Add measures to answer business questions

**Check my progress**

## Task 3. Update a SQL derived table to generate dynamic values using templated filters

As you saw in the previous lab, templated filters follow the same logical pattern as parameters. Again, the major difference is that templated filters allow end users to choose from a number of filter operators. For the number data type, that could be “is equal to,” “is greater than,” “is between,” and so on.

In templated filters, values are not hard-coded; they are entered by users and then passed onto the generated SQL query. However, you can display a drop-down menu of options by specifying an explore and dimension in the filter definition.

In this section, you will modify the SQL derived table definition from the first section, so that it recalculates all values based on the time frame that a user has selected.

1. Navigate back to the **user\_facts** view in the Looker IDE.
    
2. First, modify the SQL derived table definition as follows to include conditional `WHERE` clause:
    

```apache
derived_table: {
    sql: SELECT
           order_items.user_id AS user_id
          ,COUNT(distinct order_items.order_id) AS lifetime_order_count
          ,SUM(order_items.sale_price) AS lifetime_revenue
          ,MIN(order_items.created_at) AS first_order_date
          ,MAX(order_items.created_at) AS latest_order_date
          FROM cloud-training-demos.looker_ecomm.order_items
          WHERE {% condition select_date %} order_items.created_at {% endcondition %}
          GROUP BY user_id;;
  }
```

3. Next, add a new filter under the `derived_table` definition for users to select a date:
    

```apache
filter: select_date {
  type: date
  suggest_explore: order_items
  suggest_dimension: order_items.created_date
}
```

The first 18 lines of the view file should now resemble the following:

```apache
view: user_facts {
  derived_table: {
    sql: SELECT
           order_items.user_id AS user_id
          ,COUNT(distinct order_items.order_id) AS lifetime_order_count
          ,SUM(order_items.sale_price) AS lifetime_revenue
          ,MIN(order_items.created_at) AS first_order_date
          ,MAX(order_items.created_at) AS latest_order_date
          FROM cloud-training-demos.looker_ecomm.order_items
          WHERE {% condition select_date %} order_items.created_at {% endcondition %}
          GROUP BY user_id;;
  }
  
  filter: select_date {
    type: date
    suggest_explore: order_items
    suggest_dimension: order_items.created_date
  }
```

4. Click **Save Changes**. You file should now resemble the following:
    

![The user_facts.view diaplying lines 1 to 18](https://cdn.qwiklabs.com/oJ%2FNNOxBWau6u56%2BAU6Cv9i7giDTWNMkkTkrsfnwUlQ%3D align="left")

Now you will test the dynamic SQL derived table in the **Order Items** Explore by repeating the queries from the previous task to see that the values change when the filter is added.

5. Navigate back to the **Order Items** Explore.
    
6. Select the **Average Lifetime Order Count** and **Average Lifetime Revenue** measures under the User Facts view.
    
7. Select the **State** dimension under the Users view.
    
8. Click on the filter icon next to the new *Filter-Only Field* called **Select Date** under the User Facts view.
    
9. For the first filter value at the top of the UI, leave “is in the past” selected.
    
10. For the second filter value, select `complete years` and add `1` to the empty value box.
    
11. From the Users view, add a filter on Country and set it equal to `USA`.
    
12. Click **Run** to see the results.
    

You will see the Average Lifetime Order Count and Average Lifetime Revenue for each state or country for the past 1 complete year.

13. Click on the SQL tab to review the SQL.
    
14. At this point, you can play around with the filter values, and review the SQL tab to see how the templated filter changes the values accordingly.
    
15. Navigate back to the **user\_facts** view.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click *Check my progress* to verify the objective.

Update a SQL derived table to generate dynamic values using templated filters

**Check my progress**

---

## Solution of Lab

%[https://youtu.be/AbVULMuwtCo] 

### **🛠️ Looker Configuration Guide 🚀**

> 💡 **Pro Tip:** Follow along with the complete video tutorial to ensure you achieve full scores on all "Check My Progress" validation steps!

### **📊 Step 1: Create the** `user_facts` View

Create a new view called `user_facts` with the following configuration:

```apache
view: user_facts {
  derived_table: {
    sql: SELECT
           order_items.user_id AS user_id
          ,COUNT(distinct order_items.order_id) AS lifetime_order_count
          ,SUM(order_items.sale_price) AS lifetime_revenue
          ,MIN(order_items.created_at) AS first_order_date
          ,MAX(order_items.created_at) AS latest_order_date
          FROM cloud-training-demos.looker_ecomm.order_items
          WHERE {% condition select_date %} order_items.created_at {% endcondition %}
          GROUP BY user_id;;
  }
  
  filter: select_date {
    type: date
    suggest_explore: order_items
    suggest_dimension: order_items.created_date
  }

  measure: count {
    hidden: yes
    type: count
    drill_fields: [detail*]
  }

  dimension: user_id {
    primary_key: yes
    type: number
    sql: ${TABLE}.user_id ;;
  }

  dimension: lifetime_order_count {
    type: number
    sql: ${TABLE}.lifetime_order_count ;;
  }

  dimension: lifetime_revenue {
    type: number
    sql: ${TABLE}.lifetime_revenue ;;
  }

  measure: average_lifetime_revenue {
    type: average
    sql: ${TABLE}.lifetime_revenue ;;
  }


  measure: average_lifetime_order_count {
    type: average
    sql: ${TABLE}.lifetime_order_count ;;
  }

  dimension_group: first_order_date {
    type: time
    sql: ${TABLE}.first_order_date ;;
  }

  dimension_group: latest_order_date {
    type: time
    sql: ${TABLE}.latest_order_date ;;
  }

  set: detail {
    fields: [user_id, lifetime_order_count, lifetime_revenue, first_order_date_time, latest_order_date_time]
  }
}
```

### **📝 Step 2: Configure the** `training_ecommerce` Model File

Navigate to and modify the `training_ecommerce` model file with the following configuration:

```apache
connection: "bigquery_public_data_looker"

include: "/views/*.view"
include: "/z_tests/*.lkml"
include: "/**/*.dashboard"

datagroup: training_ecommerce_default_datagroup {
  max_cache_age: "1 hour"
}

persist_with: training_ecommerce_default_datagroup

label: "E-Commerce Training"

explore: order_items {

  join: user_facts {
    type: left_outer
    sql_on: ${order_items.user_id} = ${user_facts.user_id};;
    relationship: many_to_one
  }

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
}
```

> ⚡ **Note:** Save your changes after completing each step to ensure proper configuration.