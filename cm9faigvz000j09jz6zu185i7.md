---
title: "Data Publishing on BigQuery for Data Sharing Partners - GSP1032"
seoTitle: "Data Publishing on BigQuery for Data Sharing Partners - GSP1032"
seoDescription: "A common scenario is where a Google Cloud Data Sharing Partner has proprietary datasets that customers can use for their analytics use cases. Customers need"
datePublished: Sun Apr 13 2025 06:55:01 GMT+0000 (Coordinated Universal Time)
cuid: cm9faigvz000j09jz6zu185i7
slug: data-publishing-on-bigquery-for-data-sharing-partners-gsp1032
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744525918710/cf928ae9-2101-4400-9bcd-e97da83ee4a8.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744527288210/513b87d5-381e-42dc-8c46-e0b0247a1b22.png
tags: data-publishing-on-bigquery-for-data-sharing-partners-gsp1032, data-publishing-on-bigquery-for-data-sharing-partners, gsp1032

---

## Overview

A common scenario is where a Google Cloud Data Sharing Partner has proprietary datasets that customers can use for their analytics use cases. Customers need to subscribe to this data, query it within their own platform, then augment it with their own datasets and use their visualization tools for their customer facing dashboards. This enables Data Sharing Partners to simplify and accelerate how they build and deliver value from data-driven solutions.

![data sharing partner publishing diagram](https://cdn.qwiklabs.com/pzZtmz5P6p9JOuNHbQ7QX3NnCQMr5qMktGjcCvt9WlU%3D align="left")

Through integration with Google Cloud IAM, you can set permissions on BigQuery objects to enable access by users inside or outside of organizations. In this lab, you will learn how to create datasets in BigQuery to share externally. You will be given three projects: the Data Sharing Partner project and two customer projects. You will create and share the dataset inside of the Data Sharing Partner project, and then test the sharing capabilities from the other two customer projects.

## Objectives

In this lab, you will:

* Grant permissions via IAM for data access
    
* Create a new dataset within an existing project
    
* Copying an existing table to newly created dataset
    
* Grant permission to the users to access a table
    
* Authorize and grant permissions to a dataset
    
* Verify dataset sharing capabilities for customer projects
    

## Setup and Requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab Details** panel with the following:
    
    * The **Open Google Cloud console** button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the **Sign in** page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    "Username"
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    "Password"
    ```
    
    You can also find the **Password** in the **Lab Details** panel.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To view a menu with a list of Google Cloud products and services, click the **Navigation menu** at the top-left.

![Navigation menu icon](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

## Task 1. Grant permissions via IAM for data access

1. Open the **Data Sharing Partner Project Console**. Log in with the associated credentials.
    
2. From the **Navigation Menu**, go to **IAM & Admin** &gt; **IAM**.
    
3. Click **\+ GRANT ACCESS** at the top to assign a role to principals who needs to access the data.
    
4. In the New principals field, enter the customer service account IDs:
    
    * [`student-04-86937b7ab451@qwiklabs.net`](mailto:student-04-86937b7ab451@qwiklabs.net)
        
    * [`student-04-81c54f0bec5e@qwiklabs.net`](mailto:student-04-81c54f0bec5e@qwiklabs.net)
        
5. In the **Select a role** field, select the **BigQuery User** role.
    

![add bigquery user role to service account](https://cdn.qwiklabs.com/59bzokneoKGiUPDIPf%2BcBgciV1V%2Fd7Enq6tHH7un19E%3D align="left")

6. Click **Save**.
    

**Note:** You could also add the **BigQuery Job User** role so that a service account can run scheduled jobs.

Click **Check my progress** to verify the objective.

Grant permissions via IAM for data access

**Check my progress**

## Task 2. Create a new dataset within an existing project

1. From the Navigation Menu, go to **BigQuery** &gt; **BigQuery Studio**.
    
2. In the **Explorer** panel, select the project where you want to create the dataset. Expand the three dots Actions option and click **Create dataset**.
    

![create dataset](https://cdn.qwiklabs.com/ISZef%2BBWRiUcHQ961uNSCuTx4y6a%2Bxkmaig20QGqyyY%3D align="left")

3. For **Dataset ID**, enter `demo_dataset`.
    
4. For **Location type** choose **Multi-region** and select **US (multiple regions in United States)** from dropdown..
    
5. Click **Create Dataset**.
    

## Task 3. Copy an existing table to newly created dataset

For the purposes of this lab, you will use a public dataset that you will then copy into a table inside of your project.

1. Click **\+ Add**.
    

The Add window opens.

2. Click **Public Datasets** under Additional sources.
    
3. In the search bar, type `Google Trends`.
    
4. Select the **Google Trends** dataset. Make sure it is *not* the international dataset.
    
5. Click **View dataset**. The dataset information page should show up.
    

![trends dataset info](https://cdn.qwiklabs.com/vIyvutlMYH6rwRLVUgMg%2FpmSYloo5b6QjGPNQNBnlio%3D align="left")

6. Click **Copy**.
    
7. For the **Destination dataset**, click in the box and search/select `qwiklabs-gcp-00-df11db9fb998.demo_dataset`.
    
8. For **Location** select **us (multiple regions in United States)**.
    
9. Click **Copy**.
    

A popup window asking to authorize the **BigQuery Data Transfer Service** should appear. Select the student account and click **Allow**.

![enable data transfer service](https://cdn.qwiklabs.com/Oa%2B2xRRZ4UEpVAU2s9Z%2B7b7MYdHt1A3goq%2FKXMsfIRE%3D align="left")

Click **Check my progress** to verify the objective.

Create a new dataset within an existing project and Copy an existing table

**Check my progress**

## Task 4. Grant permission to the users to access the table

For the purposes of this lab, a dataset and table have been provided for you in BigQuery.

1. From the **Navigation Menu**, go to **BigQuery** &gt; **BigQuery Studio**.
    
2. Under your project, inside of **demo\_dataset**, open the **top\_terms** table.
    

![top-terms-table](https://cdn.qwiklabs.com/7tpa5lwJ%2BIT69fN22NpJV5iaeq2kC%2BDvfHO7XOpzZK0%3D align="left")

3. Click **Share**.
    
4. Click on **Add Principal** and add the two customer users:
    
    * [`student-04-86937b7ab451@qwiklabs.net`](mailto:student-04-86937b7ab451@qwiklabs.net)
        
    * [`student-04-81c54f0bec5e@qwiklabs.net`](mailto:student-04-81c54f0bec5e@qwiklabs.net)
        
5. Select the **BigQuery Data Viewer** role.
    

![add bigquery data viewer principal](https://cdn.qwiklabs.com/3svmTk9N5ldyjeQrpdmzOwyI1%2FHlf%2B%2BbwuIbhQ89OlI%3D align="left")

6. Click **Save**.
    

Click **Check my progress** to verify the objective.

Grant permission to the users to access the table

**Check my progress**

## Task 5. Authorize a dataset and grant permission to the users

1. Open the **demo\_dataset** and click **\+ Sharing** &gt; **Authorize Datasets**.
    

![authorize datasets](https://cdn.qwiklabs.com/WJH6UIwLMrfZn%2BWgl6VJUCVqt3LHDB5hcMQL3ArSdLk%3D align="left")

2. Search and select the **Dataset ID** that needs to be authorized to share: `qwiklabs-gcp-00-df11db9fb998.demo_dataset`.
    

![select dataset ID](https://cdn.qwiklabs.com/5N2Kd4MSl1LCOavXAisoeJg1DXtmDM1lY%2BCGwp6kgCY%3D align="left")

3. Click **Add Authorization**.
    
4. Click on **Sharing** &gt; **Permissions** &gt; **Add Principal** and add the two customer users:
    
    * [`student-04-86937b7ab451@qwiklabs.net`](mailto:student-04-86937b7ab451@qwiklabs.net)
        
    * [`student-04-81c54f0bec5e@qwiklabs.net`](mailto:student-04-81c54f0bec5e@qwiklabs.net)
        
5. Select the **BigQuery User** role.
    

![add principals to shared dataset](https://cdn.qwiklabs.com/m2mWCn29bHwvGo5UnI%2BJiIxHKxOliWksnB%2BNnu8kTns%3D align="left")

6. Click **Save**.
    

Great! You have successfully shared the dataset and table with the two customer users.

Click **Check my progress** to verify the objective.

Authorize a dataset and grant permission to the users

**Check my progress**

## Task 6. Verify dataset sharing for customer projects

In this section, you will verify the datasets and tables were shared for each customer user.

### Verify dataset sharing for customer 1

1. Close the **Data Sharing Partner Project Console** and open the **Customer Project 1 Console**. Log in with the associated credentials.
    
2. From the **Navigation Menu**, go to **BigQuery** &gt; **BigQuery Studio**.
    
3. Run the following query, which selects all columns from the **demo\_**[**dataset.top**](http://dataset.top)**\_terms** table from the **Data Sharing Partner project**:
    

```sql
SELECT * FROM `qwiklabs-gcp-00-df11db9fb998.demo_dataset.top_terms`
```

You should now see the results populated.

4. On the query toolbar, select **Save** &gt; **Save View**.
    
5. Click in the **Dataset** field and select **Create New Dataset**.
    
    * For the **Dataset ID**, type `customer_1_dataset`
        
    * For **Location type** choose **Multi-region** and select **US (multiple regions in United States)** from dropdown.
        
6. Click **Create Dataset**.
    
7. In the **Table** field, type `customer_1_table`.
    

![save consumer 1 view](https://cdn.qwiklabs.com/6Cfk03t64s2dRsf3UM%2BPF3BhwDheuUBNz9Q3XrFDKIA%3D align="left")

8. Click **Save**.
    
9. Refresh your window.
    
    You should now be able to see the dataset and table, as well as query it.
    

### Verify dataset sharing for customer 2

1. Close the **Customer Project 1 Console** and open the **Customer Project 2 Console**. Log in with the associated credentials.
    
2. From the **Navigation Menu**, go to **BigQuery** &gt; **BigQuery Studio**.
    
3. Run the following query, which selects all columns from the **demo\_**[**dataset.top**](http://dataset.top)**\_terms** table from the **Data Sharing Partner project**:
    

```sql
SELECT * FROM `qwiklabs-gcp-00-df11db9fb998.demo_dataset.top_terms`
```

You should now see the results populated.

4. On the query toolbar, select **Save** &gt; **Save View**.
    
5. Click in the **Dataset** field and select **Create New Dataset**.
    
    * For the **Dataset ID**, type `customer_2_dataset`
        
    * For **Location type** choose **Multi-region** and select **US (multiple regions in United States)** from dropdown.
        
6. Click **Create Dataset**.
    
7. In the **Table** field, type `customer_2_table`.
    

![save customer 1 view](https://cdn.qwiklabs.com/dJoLROfTCGrkN9LOYSv1gwSOYGmvX4M82JRhk23ujzo%3D align="left")

8. Click **Save**.
    
9. Refresh your window.
    
    You should now be able to see the dataset and table, as well as query it.
    

Click **Check my progress** to verify the objective.

Verify dataset sharing for customer projects

**Check my progress**

---

## Solution of Lab

%[https://youtu.be/gaNHnRt7xbs]