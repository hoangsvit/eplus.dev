---
title: "Build a BI Dashboard Using Looker Studio and BigQuery - GSP403"
seoTitle: "Build a BI Dashboard Using Looker Studio and BigQuery - GSP403"
seoDescription: "For as long as business intelligence (BI) has been around, visualization tools have played an important role in helping analysts and decision-makers quickly"
datePublished: Wed Sep 04 2024 08:25:18 GMT+0000 (Coordinated Universal Time)
cuid: cm0nlfbl3001108kz8hsner8b
slug: build-a-bi-dashboard-using-looker-studio-and-bigquery-gsp403
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745477838784/1eefc061-9caf-48b5-b0ef-dc19f4345424.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745477854936/75f8195e-7e5e-44cd-8571-599812e034e8.png
tags: build-a-bi-dashboard-using-looker-studio-and-bigquery-gsp403, gsp403, build-a-bi-dashboard-using-looker-studio-and-bigquery

---

## **Overview**

For as long as business intelligence (BI) has been around, visualization tools have played an important role in helping analysts and decision-makers quickly get insights from data. In this lab, you'll step into the shoes of a tree services manager for a large city. Your mission: build a powerful dashboard using Looker Studio and BigQuery to uncover valuable insights hidden within your large tree service usage logs. This dashboard will help you make informed, data-backed decisions to optimize your operations.

Why is this important? Visualizations turn raw data into actionable insights. With a well-designed dashboard, you'll quickly identify trends, spot potential issues, and make strategic choices that can improve efficiency and service quality. This lab assumes some familiarity with BigQuery and Looker Studio. For more information, review the background docs ([BigQuery concepts](https://cloud.google.com/bigquery/docs/concepts), [Looker Studio overview](https://cloud.google.com/looker-studio)).

## **Objectives**

In this lab, you will learn how to:

* Upload queryable data to BigQuery
    
* Create a reports dataset in BigQuery
    
* Run one-time queries in BigQuery and schedule queries
    
* Create a report in Looker Studio using BigQuery data
    

## **Setup and requirements**

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
    student-04-d21400569f5e@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    wVvtqdcW5E1z
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

## **Solution overview**

Typically, a dashboard shows an aggregated view of usage — it doesn't need details all the way to the level of an order ID, for instance. So, to reduce query costs, you'll first aggregate your needed logs into another dataset called "Reports" then create a table of aggregated data. You'll query the table from the Data Studio dashboard. This way, when your dashboard is refreshed, the reporting dataset queries process less data. Since usage logs from the past never change, you'll only refresh new usage data into the Reports dataset.

![The data flow from a dataset containing granular data to a dataset containing an aggregate table, then to the Looker Studio dashboard](https://cdn.qwiklabs.com/hG8ab1i4uHwpuK%2BlZ3zNcmU45GZfmqcgo0HIeJKB4GY%3D align="left")

## **Task 1. Upload queryable data**

In this section, you pull in some public data so you can practice running SQL commands in BigQuery.

### Open the BigQuery console

1. In the Google Cloud Console, select **Navigation menu** &gt; **BigQuery**.
    

The **Welcome to BigQuery in the Cloud Console** message box opens. This message box provides a link to the quickstart guide and the release notes.

2. Click **Done**.
    

The BigQuery console opens.

3. Click **\+ ADD** in the explorer section, then select **Public Datasets**.
    
4. Search for "trees" and press **Enter**.
    
5. Click on the **Street Trees** tile, then click **View Dataset**.
    

A new tab opens, a new project called **bigquery-public-data** is added to the Explorer panel:

![The bigquery-public-data project listed in the Explorer panel](https://cdn.qwiklabs.com/%2FDMlob8l54uSDhCG5jqFT%2B%2B%2FiiSAeqA9sIm298yFarQ%3D align="left")

**Note:** If the new project `bigquery-public-data` doesn't appear to the Explorer panel, then click on **\+ ADD** &gt; **Star a project** &gt; **Enter project name** (bigquery-public-data) and **STAR**.

## **Task 2. Create a reports dataset in BigQuery**

Next you'll create a new dataset called Reports in your project. A separate dataset has a couple of benefits: it reduces the amount of data queried by the dashboard, and it removes unnecessary access to your source datasets by users who are only interested in aggregated data.

1. Click the three dots next to your Qwiklabs project ID and select **Create dataset**.
    
2. Name your dataset **Reports**.
    

Leave the other options at their default values.

3. Click **Create dataset**.
    

Click *Check my progress* to verify the objective.

Create a reports dataset in BigQuery

**Check my progress**

## **Task 3. Query the dashboard data**

In this section, you will run a one-time query to pull the data for the last year, summarizing:

* The number of trees planted each month
    
* Which species of trees were planted
    
* Who the caretaker of the trees is
    
* Address of the planted trees
    
* Tree site information
    

1. Open the **Query editor** by clicking the **+** button on the top of the BigQuery Console.
    
2. Add the following to the Query Editor:
    

```sql
SELECT
 TIMESTAMP_TRUNC(plant_date, MONTH) as plant_month,
  COUNT(tree_id) AS total_trees,
  species,
  care_taker,
  address,
  site_info
FROM
  `bigquery-public-data.san_francisco_trees.street_trees`
WHERE
  address IS NOT NULL
  AND plant_date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 365 DAY)
  AND plant_date < TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), DAY)
GROUP BY
  plant_month,
  species,
  care_taker,
  address,
  site_info
```

2. Click the **More** button, and select **Query settings** from the dropdown menu.
    

![The More button and its expanded menu, with the Query Settings option highlighted](https://cdn.qwiklabs.com/83tQv%2FnC4B6c37BEC48KBNBoOLz8zyX%2BSntdpI0nowk%3D align="left")

* Select **Set a destination table for query results**.
    
* For Dataset name, type `Reports`. Select the **Reports** dataset you created earlier.
    
* For Table Id, type `Trees`.
    
* For **Destination table write preference**, select **Write if empty**.
    

![The Query Settings dialog box displaying the updated settings](https://cdn.qwiklabs.com/7CJPcEgB3HYoYXdsc2teCokOtCtxruQWvPGy0WNcS1I%3D align="left")

Because you specified a **Table name** and selected the **Write if empty** preference, the query creates a table if the table does not already exist.

3. Accept the other default settings and click **Save**.
    
4. Click **Run** to run the query.
    

When the query completes, you are on the **Results** tab, where you can see the data.

![The Query results table displaying six rows of data](https://cdn.qwiklabs.com/jomdXsEz5T5lSNtGJHFBENlpP8SQ7T%2B0uRsSxo1B8D4%3D align="left")

Click *Check my progress* to verify the objective.

Query to pull the data for last year

**Check my progress**

## **Task 4. Schedule a query in BigQuery**

To keep your dashboard up-to-date, you can schedule queries to run on a recurring basis. Scheduled queries must be written in [standard SQL](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax), which can include [Data Definition Language (DDL)](https://cloud.google.com/bigquery/docs/data-definition-language) and [Data Manipulation Language (DML)](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language) statements. The query string and destination table can be parameterized, allowing you to organize query results by date and time.

Now you add a query that checks each day for new data. When new trees are planted, you'll get the additional stats updated directly into the `reports.trees` table.

1. Open a new **Query Editor** tab and run the following query to pull incremental data into the `reports.trees` table on a daily basis using the scheduled query feature:
    

```sql
SELECT
 TIMESTAMP_TRUNC(plant_date, MONTH) as plant_month,
  COUNT(tree_id) AS total_trees,
  species,
  care_taker,
  address,
  site_info
FROM
  `bigquery-public-data.san_francisco_trees.street_trees`

WHERE
  address IS NOT NULL
  AND plant_date >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
  AND plant_date < TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), DAY)
GROUP BY
  plant_month,
  species,
  care_taker,
  address,
  site_info
```

2. Click on the **Schedule** button, and **New scheduled query** page opens.
    

![The Create new scheduled query option highlighted in the expanded Schedule menu](https://cdn.qwiklabs.com/DMOoCUx3IZfJdRNfN%2BBilEPOh6Dn94%2Bm2%2BQvt48jQDc%3D align="left")

3. On the new Scheduled query page, set the following:
    

* Name: **Update\_trees\_daily**
    
* Schedule options:
    
    * Repeat frequency: Click the dropdown and select **Hours**.
        
    * Repeats every: **1** hour
        

4. In the **Destination for query results** sections, check the box for **Set a destination table for query results** and specify dataset name as `Reports`.
    

* Table name: type in "Trees" and select **Append to table** for **Destination table write preference** so it doesn't overwrite existing data.
    

![The New Scheduled Query dialog box displaying the updated details](https://cdn.qwiklabs.com/tGcnEmlxQQRosOZ5ZJ%2Bfg8VszqgMq12LwPumblImJvE%3D align="left")

5. Click **Save**.
    
6. You may have a popup blocker enabled, click **Allow** and then give your lab credentials permission, then agree to replace your query.
    

**Note:** If you run this query, you won't see any new results because they haven't happened yet.

## **Task 5. Create new data sources in Looker Studio**

Now you'll build your dashboard using the tree data you've just aggregated with Looker Studio.

1. Open a new tab in your browser and go to [Looker Studio](https://datastudio.google.com/).
    
2. Click **Create** in the top left, and then click **Report**.
    
3. Enter the country and check the terms and conditions.
    
4. Click **Continue**.
    
5. Select **No** for all email offers, and then click **Continue**.
    

## **Task 6. Create a new report in Looker Studio**

1. Click on the **BigQuery**, then click **Authorize**.
    

Now you'll use the BigQuery connector to connect to the `reports.trees` table.

2. Start by selecting your **Qwiklabs project**, then the **Reports** dataset, then the **Trees** table, as shown below:
    

![The selected project, dataset, and table on the Add data to report page](https://cdn.qwiklabs.com/L0Ipjphn6GjMz9rnHuiJZACwTaeEmz75rLeClezWgHE%3D align="left")

3. Click **Add** and then click **Add to Report**.
    

Click *Check my progress* to verify the objective.

Create new data sources in Looker Studio

**Check my progress**

Now you can create charts using the data in this table.

4. Click on **Add a chart** dropdown and select the type you want. In this example, you can see the following types of charts:
    
    * Stacked column bar graph showing the number of trees planted each month and the name of the caretaker who planted them.
        
    * A scorecard showing the total number of trees added in the last year.
        
    * A pie chart showing the percent distribution of trees planted by their species.
        
    * A table chart along with a bar graph representing the number of trees planted by site.
        

![An example of the various types of charts displayed](https://cdn.qwiklabs.com/U5ji%2FmO6j8dLhHupwH%2F7IpsR8Jgu8fpO4nO9b5XTX1E%3D align="left")

You can experiment on your own creating charts and titles modeled after the example. Here are some hints:

* Titles are created using the text tool. In the example, titles were created for each chart and the dashboard itself.
    
* When a chart is selected, you can edit the colors and font sizes when you click on the **Style** tab on the right-hand side.
    
* Click on a chart to modify its size and drag it to a new location.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=OHwSNRHDnQg] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Build%20a%20BI%20Dashboard%20Using%20Looker%20Studio%20and%20BigQuery/quicklabgsp403.sh
sudo chmod +x quicklabgsp403.sh
./quicklabgsp403.sh
```

### Task 5. Create new data sources in Looker Studio

Now you'll build your dashboard using the tree data you've just aggregated with Looker Studio.

1. Open a new tab in your browser and go to [Looker Studio.](https://datastudio.google.com/)
    
2. Click **Create** in the top left, and then click **Report**.
    
3. Enter the country and check the terms and conditions.
    
4. Click **Continue**.
    
5. Select **No** for all email offers[,](https://datastudio.google.com/) and then click **Continue**.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725437685768/c994a157-f53f-4d10-bba4-32cc694ba2f0.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725437693135/082e696f-0e3a-4cf9-9d22-fb8d1a6b851c.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725437818755/0cd85290-2aa8-45b4-8779-a8b0d0975839.png align="center")

### **Task 6. Create a new report in Looker Studio**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725437685768/c994a157-f53f-4d10-bba4-32cc694ba2f0.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725437983555/76405fac-8935-4b5b-86be-1145b5b2f18a.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725438025241/8669702f-0be9-4f5a-8d51-1313a1a0d971.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725438089258/e4d2bf94-218f-41a3-91e5-3f5cb098d970.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725438145206/bd761244-699b-406a-ae57-69f67200a399.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725438176800/c6ec505e-c58a-402e-a1b8-c35931eb3626.png align="center")