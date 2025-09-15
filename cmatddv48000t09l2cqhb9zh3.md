---
title: "Explore an Ecommerce Dataset with SQL in BigQuery - GSP407"
seoTitle: "Explore an Ecommerce Dataset with SQL in BigQuery - GSP407"
seoDescription: "BigQuery is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infra"
datePublished: Sun May 18 2025 08:03:54 GMT+0000 (Coordinated Universal Time)
cuid: cmatddv48000t09l2cqhb9zh3
slug: explore-an-ecommerce-dataset-with-sql-in-bigquery-gsp407
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747555271855/969e5105-a74d-41e0-9a5f-cbbdba7bcad2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747555420163/8a8e940c-bcf0-4d95-9dad-9d6350bfb578.png
tags: bigquery, explore-an-ecommerce-dataset-with-sql-in-bigquery-gsp407, explore-an-ecommerce-dataset-with-sql-in-bigquery, gsp407

---

## Overview

BigQuery is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infrastructure to manage or needing a database administrator. BigQuery uses SQL and can take advantage of the pay-as-you-go model. BigQuery allows you to focus on analyzing data to find meaningful insights.

We have a newly available [ecommerce dataset](https://www.en.advertisercommunity.com/t5/Articles/Introducing-the-Google-Analytics-Sample-Dataset-for-BigQuery/ba-p/1676331#) that has millions of Google Analytics records for the [Google Merchandise Store](https://shop.googlemerchandisestore.com/) loaded into a table in BigQuery. In this lab, you use a copy of that dataset. Sample scenarios are provided, from which you look at the data and ways to remove duplicate information. The lab then steps you through further analysis the data.

To follow and experiment with the BigQuery queries provided to analyze the data, see the BigQuery [Query Syntax Reference](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax).

## Objectives

In this lab, you use BigQuery to:

* Access an ecommerce dataset
    
* Look at the dataset metadata
    
* Remove duplicate entries
    
* Write and execute queries
    

## Setup and requirements

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
    student-04-cd7ced0ca503@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    VSWP1ytmcfQC
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

## Task 1. Pin the lab project in BigQuery

In this section, you add the **data-to-insights** project to your environment resources.

1. Click **Navigation menu &gt; BigQuery**.
    

The Welcome to BigQuery in the Cloud Console message box opens.

**Note:** The Welcome to BigQuery in the Cloud Console message box provides a link to the quickstart guide and UI updates.

2. Click **Done**.
    

BigQuery public datasets are not displayed by default in the BigQuery web UI. To open the public datasets project, copy "**data-to-insights**".

3. Click **\+ Add &gt; Star a project by name**, then set the name to `data-to-insights`. Click **STAR**.
    

The Explorer section now lists the data-to-insights project.

## Task 2. Explore ecommerce data and identify duplicate records

**Scenario**: Your data analyst team exported the Google Analytics logs for an ecommerce website into BigQuery and created a new table of all the raw ecommerce visitor session data.

Explore the `all_sessions_raw` table data:

1. Click the **Expand node** icon near **data-to-insights** to expand the project.
    
2. Expand **ecommerce**.
    
3. Click **all\_sessions\_raw**.
    

In the right pane, a section opens that provides 3 views of the table data:

* Schema tab: Field name, Type, Mode, and Description; the logical constraints used to organize the data
    
* Details tab: Table metadata
    
* Preview tab: Table preview
    

4. Click the **Details** tab to view the table metadata.
    

Questions:

Which UI tab will show you the data types?DetailsPreviewSchema

**Submit**

How many rows are in the dataset?Over 21 million5.63 GB9990000

**Submit**

### Identify duplicate rows

Seeing a sample amount of data may give you greater intuition for what is included in the dataset.

1. To preview sample rows from the table without using SQL, click the **preview** tab.
    
2. Scan and scroll through the rows. There is no singular field that uniquely identifies a row, so you need advanced logic to identify duplicate rows.
    
3. The query you'll use (below) uses the SQL `GROUP BY` function on every field and counts (`COUNT`) where there are rows that have the same values across every field:
    

* If every field is unique, the `COUNT` returns 1 as there are no other groupings of rows with the exact same value for all fields.
    
* If there are multiple rows with the same values for all fields, these rows are grouped together and the `COUNT` will be greater than 1.
    

The last part of the query is an aggregation filter using `HAVING` to only show the results that have a `COUNT` of duplicates greater than 1. Therefore, the number of records that have duplicates will be the same as the number of rows in the resulting table.

4. Copy and paste the following query into the query **Editor**, then **RUN** query to find which records are duplicated across all columns.
    

```apache
#standardSQL
SELECT COUNT(*) as num_duplicate_rows, * FROM
`data-to-insights.ecommerce.all_sessions_raw`
GROUP BY
fullVisitorId, channelGrouping, time, country, city, totalTransactionRevenue, transactions, timeOnSite, pageviews, sessionQualityDim, date, visitId, type, productRefundAmount, productQuantity, productPrice, productRevenue, productSKU, v2ProductName, v2ProductCategory, productVariant, currencyCode, itemQuantity, itemRevenue, transactionRevenue, transactionId, pageTitle, searchKeyword, pagePathLevel1, eCommerceAction_type, eCommerceAction_step, eCommerceAction_option
HAVING num_duplicate_rows > 1;
```

How many records have duplicates in all\_sessions\_raw?06151,015434

**Submit**

**Note:** In your own datasets, even if you have a unique key, it is still beneficial to confirm the uniqueness of the rows with COUNT, GROUP BY, and HAVING before you begin your analysis.

Click **Check my progress** to verify the objective.

Identify duplicate rows

**Check my progress**

### Analyze the new all\_sessions table

In this section, you use a deduplicated table called `all_sessions`.

**Scenario:** Your data analyst team has provided you with this query, and your schema experts have identified the key fields that must be unique for each record per your [schema](https://support.google.com/analytics/answer/3437719?hl=en).

1. Run the query to confirm that no duplicates exist, this time in the `all_sessions` table:
    

```apache
#standardSQL
# schema: https://support.google.com/analytics/answer/3437719?hl=en
SELECT
fullVisitorId, # the unique visitor ID
visitId, # a visitor can have multiple visits
date, # session date stored as string YYYYMMDD
time, # time of the individual site hit  (can be 0 to many per visitor session)
v2ProductName, # not unique since a product can have variants like Color
productSKU, # unique for each product
type, # a visitor can visit Pages and/or can trigger Events (even at the same time)
eCommerceAction_type, # maps to ‘add to cart', ‘completed checkout'
eCommerceAction_step,
eCommerceAction_option,
  transactionRevenue, # revenue of the order
  transactionId, # unique identifier for revenue bearing transaction
COUNT(*) as row_count
FROM
`data-to-insights.ecommerce.all_sessions`
GROUP BY 1,2,3 ,4, 5, 6, 7, 8, 9, 10,11,12
HAVING row_count > 1 # find duplicates
```

The query returns zero records.

**Note:** In SQL, you can GROUP BY or ORDER BY the index of the column like using `GROUP BY 1` instead of `GROUP BY fullVisitorId`.

## Task 3. Write basic SQL on ecommerce data

In this section, you query for insights on the ecommerce dataset.

### Write a query that shows total unique visitors

Your query determines the total views by counting `product_views` and the number of unique visitors by counting `fullVisitorID`.

1. Click "**+**" (Compose New Query) icon.
    
2. Write this query in the editor:
    

```apache
#standardSQL
SELECT
  COUNT(*) AS product_views,
  COUNT(DISTINCT fullVisitorId) AS unique_visitors
FROM `data-to-insights.ecommerce.all_sessions`;
```

3. To ensure that your syntax is correct, confirm that the real-time query validator shows the *Green check* icon.
    
4. Click **Run**. Read the results to view the number of unique visitors.
    

**Results**:

![A three-column table showing the number of rows, product_views, and unique_visitors.](https://cdn.qwiklabs.com/b9ovF5bGPVLOoKS%2BnA%2FrEgafl9kpnMwY6TysHCDm4S4%3D align="left")

5. Now write a query that shows total unique visitors(`fullVisitorID`) by the referring site (`channelGrouping`):
    

```apache
#standardSQL
SELECT
  COUNT(DISTINCT fullVisitorId) AS unique_visitors,
  channelGrouping
FROM `data-to-insights.ecommerce.all_sessions`
GROUP BY channelGrouping
ORDER BY channelGrouping DESC;
```

**Results**:

![A three-column table showing several rows of unique_visitors and channelGrouping.](https://cdn.qwiklabs.com/5yLYag64%2F5mEVHBVMo2dExnIBdJm6CZaX%2Bt6IpBOiZ8%3D align="left")

6. Write a query to list all the unique product names (`v2ProductName`) alphabetically:
    

```apache
#standardSQL
SELECT
  (v2ProductName) AS ProductName
FROM `data-to-insights.ecommerce.all_sessions`
GROUP BY ProductName
ORDER BY ProductName
```

**Tip**: In SQL, the ORDER BY clauses defaults to Ascending (ASC) A to Z. If you want the reverse, try ORDER BY field\_name DESC.

Which part of the previous query deduplicates the records?SELECTORDER BYSTANDARD SQLGROUP BY

**Submit**

**Results**:

![The Results tabbed page displays a table containing numerous rows of ProductName.](https://cdn.qwiklabs.com/a9r%2BBTU44UmfC%2BqIFPlvtV8txzfwjy%2Fbw%2Ft%2Bt1a9rtA%3D align="left")

This query returns a total of 633 products (rows).

How many distinct product names were returned in total?63351195010

**Submit**

7. Write a query to list the five products with the most views (`product_views`) from all visitors (including people who have viewed the same product more than once). Your query counts number of times a product (`v2ProductName`) was viewed (`product_views`), puts the list in descending order, and lists the top 5 entries:
    

**Tip**: In Google Analytics, a visitor can "view" a product during the following interaction types: 'page', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'. For our purposes, simply filter for only type = 'PAGE'.

```apache
#standardSQL
SELECT
  COUNT(*) AS product_views,
  (v2ProductName) AS ProductName
FROM `data-to-insights.ecommerce.all_sessions`
WHERE type = 'PAGE'
GROUP BY v2ProductName
ORDER BY product_views DESC
LIMIT 5;
```

**Results**:

![The Results tabbed page displays a table containing five rows of product_views and ProductName.](https://cdn.qwiklabs.com/Dp5bJkC1CaWW15SKsX%2BasfL9o%2BZdwJyqRp%2Fmmz9UZCM%3D align="left")

8. **Bonus**: Now refine the query to no longer double-count product views for visitors who have viewed a product many times. Each distinct product view should only count once per visitor:
    

```apache
WITH unique_product_views_by_person AS (
-- find each unique product viewed by each visitor
SELECT
 fullVisitorId,
 (v2ProductName) AS ProductName
FROM `data-to-insights.ecommerce.all_sessions`
WHERE type = 'PAGE'
GROUP BY fullVisitorId, v2ProductName )


-- aggregate the top viewed products and sort them
SELECT
  COUNT(*) AS unique_view_count,
  ProductName
FROM unique_product_views_by_person
GROUP BY ProductName
ORDER BY unique_view_count DESC
LIMIT 5
```

**Tip**: You can use the SQL `WITH` clause to help break apart a complex query into multiple steps. Here we first create a query that finds each unique product per visitor and counts them once. Then the second query performs the aggregation across all visitors and products.

**Results**:

![The Results tabbed page displays a table containing five rows of unique_view_count and ProductName.](https://cdn.qwiklabs.com/dCnyVqvi2oJW3NEkyn7WlMFH0ms1AqMhyqYPzScFrhI%3D align="left")

9. Next, expand your previous query to include the total number of distinct products ordered and the total number of total units ordered (`productQuantity`):
    

```apache
#standardSQL
SELECT
  COUNT(*) AS product_views,
  COUNT(productQuantity) AS orders,
  SUM(productQuantity) AS quantity_product_ordered,
  v2ProductName
FROM `data-to-insights.ecommerce.all_sessions`
WHERE type = 'PAGE'
GROUP BY v2ProductName
ORDER BY product_views DESC
LIMIT 5;
```

**Results**:

![A table containing five rows of product_views, orders, quantity_product_ordered_, and v2ProductName.](https://cdn.qwiklabs.com/W%2F67Ixjhx2pRKqCouMLAHX8SopFWTH385fyL3wnNQYQ%3D align="left")

Questions:

The product with the most views got the most orders.TrueFalse

What is the difference between orders and quantity\_product\_ordered?order is the number of orders, quantity\_product\_ordered is the number of items orderedorder is the number of orders, quantity\_product\_ordered is the number of items available to be orderedNothing, they are the same

**Submit**

10. Expand the query to include the average amount of product per order (total number of units ordered/total number of orders, or `SUM(productQuantity)`/`COUNT(productQuantity)`):
    

```apache
#standardSQL
SELECT
  COUNT(*) AS product_views,
  COUNT(productQuantity) AS orders,
  SUM(productQuantity) AS quantity_product_ordered,
  SUM(productQuantity) / COUNT(productQuantity) AS avg_per_order,
  (v2ProductName) AS ProductName
FROM `data-to-insights.ecommerce.all_sessions`
WHERE type = 'PAGE'
GROUP BY v2ProductName
ORDER BY product_views DESC
LIMIT 5;
```

**Results**

![A table containing five rows of product_views, orders, quantity_product_ordered_, avh_per_order, and v2ProductName.](https://cdn.qwiklabs.com/ejtIxUgah3U1CgfZc8wXctd6wAHJIA4N%2FkS5n9OHg9g%3D align="left")

Question:

What product has the highest avg\_per\_order?YouTube Bottle InfuserYouTube Custom DecalsGoogle Mens Short Sleeve Hero Tee Black

**Submit**

The 22 oz YouTube Bottle Infuser had the highest avg\_per\_order with 9.38 units per order.

Click **Check my progress** to verify the objective.

Write basic SQL on ecommerce data

---

## Solution of Lab

%[https://youtu.be/h87rdNKVSBY] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Explore%20an%20Ecommerce%20Dataset%20with%20SQL%20in%20BigQuery/techcps407.sh
sudo chmod +x techcps407.sh
./techcps407.sh
```