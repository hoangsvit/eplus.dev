---
title: "Data Publishing on BigQuery using Authorized Views for Data Sharing Partners - GSP1041"
seoTitle: "Data Publishing on BigQuery using Authorized Views for Data Sharing Pa"
seoDescription: "A common scenario is where a Google Cloud Data Sharing Partner has proprietary datasets that customers can use for their analytics use cases. Customers need"
datePublished: Sun Apr 13 2025 07:13:02 GMT+0000 (Coordinated Universal Time)
cuid: cm9fb5mvg001309jl659jekah
slug: data-publishing-on-bigquery-using-authorized-views-for-data-sharing-partners-gsp1041
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744527501032/3659b224-f082-4986-9d40-7dd6b986c18c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744528365437/9d6347ce-9af9-4c5c-ae4c-187baf9332aa.png
tags: data-publishing-on-bigquery-using-authorized-views-for-data-sharing-partners-gsp1041, data-publishing-on-bigquery-using-authorized-views-for-data-sharing-partners, gsp1041

---

## Overview

A common scenario is where a Google Cloud Data Sharing Partner has proprietary datasets that customers can use for their analytics use cases. Customers need to subscribe to this data, query it within their own platform, then augment it with their own datasets and use their visualization tools for their customer facing dashboards. This enables Data Sharing Partners to simplify and accelerate how they build and deliver value from data-driven solutions.

![overview diagram](https://cdn.qwiklabs.com/tnbbx5%2BLN0QaLS48voNqM2zmESAXbfkQKWUvQ4kk6V0%3D align="left")

Through integration with Google Cloud IAM, you can set permissions on BigQuery objects to enable access by users inside or outside of organizations. In this lab, you will learn how to use authorized views in BigQuery to share customer specific data from a Data Sharing Partner. You will be given three projects: the Data Sharing Partner project which owns the dataset, and two separate and distinct customers who will access a subset of the dataset from their respective projects. Customers will list customer information specific to their state.

## Objectives

In this lab, you will:

* Copy datasets from an Data Sharing Partner project to a customer’s BigQuery project
    
* Restrict datasets from the Data Sharing Partner project for consumption by a specific customer
    
* Coalesce the dataset provided by the Data Sharing Partner with a customer’s own dataset to enhance business intelligence
    

## Setup and Requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    * The Open Google Cloud console button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    "Username"
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    "Password"
    ```
    
    You can also find the Password in the Lab Details pane.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="left")

## Task 1. Create authorized views

In the first project, you will take on the role of a Data Sharing Partner creating and sharing a dataset using an authorized view.

### Create Authorized View A

1. From the lab pane. open the **Data Sharing Partner Project Console** and log in with the associated credentials.
    
2. From the **Navigation Menu**, go to **BigQuery** &gt; **BigQuery Studio**.
    
3. Run the following query to create an authorized view for Customer A, based on a public geographical dataset.
    

```sql
SELECT * FROM `bigquery-public-data.geo_us_boundaries.zip_codes`
WHERE state_code="TX"
LIMIT 4000
```

4. From the toolbar, click **Save** &gt; **Save View**.
    
5. Keep the project as default and for the **Dataset** select `demo_dataset`.
    
6. For **Table** type `authorized_view_a`.
    
7. Click **Save**.
    

### Create Authorized View B

1. In the query editor, remove the previous query you just ran.
    
2. Run the following query to create an authorized view for Customer B, based on a public geographical dataset.
    

```sql
SELECT * FROM `bigquery-public-data.geo_us_boundaries.zip_codes`
WHERE state_code="CA"
LIMIT 4000
```

3. From the toolbar, click **Save** &gt; **Save View as**.
    
4. Keep the project as default and for the **Dataset** select `demo_dataset`.
    
5. For **Table** type `authorized_view_b`.
    
6. Click **Save**.
    

Your authorized views should resemble the following:

![authorized views](https://cdn.qwiklabs.com/ic04vXGH24kTTVAGMCxpjmIdrqVMAoKHAr%2B8%2B083LAg%3D align="left")

Click *Check my progress* to verify the objective.

Create Authorized Views

**Check my progress**

## Task 2. Assign IAM permissions to both the views

1. From the BigQuery Explorer pane, open the **demo\_dataset** and click **\+ Sharing** &gt; **Authorize Views**.
    

![authorize views](https://cdn.qwiklabs.com/kjrsH87nmJnPznCs%2F6rluH%2BYVonULwHnNaA63WRxUx4%3D align="left")

2. Add **Authorized View A** that needs to be authorized to share: `qwiklabs-gcp-00-168f170025ef.demo_dataset.authorized_view_a`.
    
3. Click **Add Authorization**.
    
4. Add **Authorized View B** that needs to be authorized to share: `qwiklabs-gcp-00-168f170025ef.demo_dataset.authorized_view_b`.
    
5. Click **Add Authorization**. Your authorized views should resemble the following:
    

![authorized views](https://cdn.qwiklabs.com/hOK48qWlIt%2B1aIydmgeftC9f7Hpwmr9LQNby1pzc7M4%3D align="left")

6. Click **Close**.
    

Click *Check my progress* to verify the objective.

Assign IAM permissions to both the views

**Check my progress**

## Task 3. Grant permissions to the users to access the views

In this section, you will assign permissions for each customer user and their associated authorized views.

### Assign IAM permissions for Customer A

1. Under your project, inside of **demo\_dataset**, open the `authorized_view_a` view.
    
2. Click **Share**.
    
3. Click on **Add Principal** and add the *Customer A* user:
    
    * [`student-04-3452e1e79a76@qwiklabs.net`](mailto:student-04-3452e1e79a76@qwiklabs.net)
        
4. Select the **BigQuery Data Viewer** role.
    

![add bigquery data viewer principal](https://cdn.qwiklabs.com/tKPr2wADt5o6%2B79IRDAXNWF%2FCYz4wZf9OUayEakzDn0%3D align="left")

6. Click **Save**.
    

### Assign IAM permissions for Customer B

1. Under your project, inside of **demo\_dataset**, open the `authorized_view_b` view.
    
2. Click **Share**.
    
3. Click on **Add Principal** and add the *Customer B* user:
    
    * [`student-04-78661b103b1a@qwiklabs.net`](mailto:student-04-78661b103b1a@qwiklabs.net)
        
4. Select the **BigQuery Data Viewer** role.
    

![add bigquery data viewer principal](https://cdn.qwiklabs.com/Mz6%2Bf%2B9x6s4OleLd6fqVRIjPY1CRcc2LhGUy%2BHIJxk8%3D align="left")

6. Click **Save**.
    

Click *Check my progress* to verify the objective.

Grant permissions to the users to access the views

**Check my progress**

## Task 4. Verify shared authorized views in customer projects

In this section, you will verify that the authorized views were shared for each customer user correctly.

### Verify authorized view sharing for Customer A

1. Close the **Data Sharing Partner Project Console** and from the lab pane open the **Customer Project A Console**. Log in with the associated credentials.
    
2. From the **Navigation Menu**, go to **BigQuery** &gt; **BigQuery Studio**.
    
3. Run the following query, which selects all columns from the **demo\_dataset.authorized\_view\_a** view from the **Data Sharing Partner project**:
    

```sql
SELECT * FROM `qwiklabs-gcp-00-168f170025ef.demo_dataset.authorized_view_a`
```

You should now see the results populated.

4. On the query toolbar, select **Save** &gt; **Save View**.
    
5. Click in the **Dataset** field and select `customer_a_dataset`.
    
6. In the **Table** field, type `customer_a_table`.
    
7. Click **Save**. You should now be able to see the dataset and table, as well as query it.
    

Now you will join the data from *Customer A's* authorized view to the customer specific dataset to generate new insights.

8. Run the following query to find all customers in a State. Since the authorized view available to Customer A is filtered on the state of Texas, the query should return only customers in that state.
    

```sql
SELECT geos.zip_code, geos.city, cust.last_name, cust.first_name
FROM `qwiklabs-gcp-00-6aaa9bdf7dde.customer_a_dataset.customer_info` as cust
JOIN `qwiklabs-gcp-00-168f170025ef.demo_dataset.authorized_view_a` as geos
ON geos.zip_code = cust.postal_code;
```

Your results should resemble the following:

![customer a query](https://cdn.qwiklabs.com/JtF1qCl5SoUbdP%2BKvPlPOMciGn2QxTJdhPEDSLz5%2B6Y%3D align="left")

9. Run the following query to confirm only *Customer A's* specific data is visible.
    

```sql
SELECT * FROM `qwiklabs-gcp-00-168f170025ef.demo_dataset.authorized_view_b`
```

You should receive the following error:

```apache
Access Denied: Table qwiklabs-gcp-04-b39db6c444b1:demo_dataset.authorized_view_b: User does not have permission to query table qwiklabs-gcp-04-b39db6c444b1:demo_dataset.authorized_view_b.
```

### Verify authorized view sharing for Customer B

1. Close the **Customer Project A Console** and from the lab pane open the **Customer Project B Console**. Log in with the associated credentials.
    
2. From the **Navigation Menu**, go to **BigQuery** &gt; **BigQuery Studio**.
    
3. Run the following query, which selects all columns from the **demo\_dataset.authorized\_view\_b** view from the **Data Sharing Partner project**:
    

```sql
SELECT * FROM `qwiklabs-gcp-00-168f170025ef.demo_dataset.authorized_view_b`
```

You should now see the results populated.

4. On the query toolbar, select **Save** &gt; **Save View**.
    
5. Click in the **Dataset** field and select `customer_b_dataset`.
    
6. In the **Table** field, type `customer_b_table`.
    
7. Click **Save**. You should now be able to see the dataset and table, as well as query it.
    

Now you will join the data from *Customer B's* authorized view to the customer specific dataset to generate new insights.

8. Run the following query to find all customers in a State. Since the authorized view available to Customer A is filtered on the state of California, the query should return only customers in that state.
    

```sql
SELECT geos.zip_code, geos.city, cust.last_name, cust.first_name
FROM `qwiklabs-gcp-03-20ef4105cff3.customer_b_dataset.customer_info` as cust
JOIN `qwiklabs-gcp-00-168f170025ef.demo_dataset.authorized_view_b` as geos
ON geos.zip_code = cust.postal_code;
```

Your results should resemble the following:

![customer b query](https://cdn.qwiklabs.com/%2B32wUQbXxOu5NzEF21vjSZPSt8%2BhYpkONoCu8iLS5rg%3D align="left")

9. Run the following query to confirm only *Customer B's* specific data is visible.
    

```sql
SELECT * FROM `qwiklabs-gcp-00-168f170025ef.demo_dataset.authorized_view_a`
```

You should receive the following error:

```apache
Access Denied: Table qwiklabs-gcp-04-b39db6c444b1:demo_dataset.authorized_view_a: User does not have permission to query table qwiklabs-gcp-04-b39db6c444b1:demo_dataset.authorized_view_a.
```

Click *Check my progress* to verify the objective.

Verify shared authorized views in customer projects

**Check my progress**

---

## Solution of Lab

%[https://youtu.be/frfPVLKTg5c]