---
title: "Creating a Data Warehouse Through Joins and Unions - GSP413"
seoTitle: "Creating a Data Warehouse Through Joins and Unions - GSP413"
seoDescription: "BigQuery is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infra"
datePublished: Mon Aug 19 2024 03:57:34 GMT+0000 (Coordinated Universal Time)
cuid: cm00gtdjk000009jzbtio0vgw
slug: creating-a-data-warehouse-through-joins-and-unions-gsp413
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758004884006/7c1065b1-3feb-45ff-b22d-6176aed6d3f2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1758004896979/2825d625-f689-428d-bb0d-fb72cb5bcbb6.png
tags: creating-a-data-warehouse-through-joins-and-unions-gsp413, gsp413, creating-a-data-warehouse-through-joins-and-unions

---

## **Overview**

[BigQuery](https://console.cloud.google.com/bigquery) is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infrastructure to manage or needing a database administrator. BigQuery uses SQL and can take advantage of the pay-as-you-go model. BigQuery allows you to focus on analyzing data to find meaningful insights.

The dataset you'll use is an ecommerce dataset that has millions of Google Analytics records from the [Google Merchandise Store](https://shop.googlemerchandisestore.com/). You will explore the available fields and row for insights.

This lab focuses on how to create new reporting tables using SQL JOINS and UNIONs.

**Scenario**: Your marketing team provided you and your data science team all of the product reviews for your ecommerce website. You are partnering with them to create a data warehouse in BigQuery which joins together data from three sources:

* Website ecommerce data
    
* Product inventory stock levels and lead times
    
* Product review sentiment analysis
    

### What you'll do

In this lab, you learn how to perform these tasks:

* Explore new ecommerce data on sentiment analysis.
    
* Join datasets and create new tables.
    
* Append historical data with unions and table wildcards.
    

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
    student-04-af17446892fb@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    862LeHtJfHwF
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

### Open the BigQuery console

1. In the Google Cloud Console, select **Navigation menu** &gt; **BigQuery**.
    

The **Welcome to BigQuery in the Cloud Console** message box opens. This message box provides a link to the quickstart guide and the release notes.

2. Click **Done**.
    

The BigQuery console opens.

## **Task 1. Create a new dataset to store your tables**

To get started, create a new dataset titled **ecommerce** in BigQuery to store your tables.

1. In the left pane, click on the name of your BigQuery project (`qwiklabs-gcp-xxxx`).
    
2. Click on the three dots next to your project name, then select **Create dataset**.
    

The **Create dataset** dialog opens.

3. Set the **Dataset ID** to `ecommerce`, leave all other options at their default values.
    
4. Click **Create dataset**.
    

Click **Check my progress** to verify the objective.

Create a new dataset to store the tables

**Check my progress**

## **Task 2. Explore the product sentiment dataset**

Your data science team has run all of your product reviews through the API and provided you with the average sentiment score and magnitude for each of your products.

The project with your marketing team's dataset is **data-to-insights**. BigQuery public datasets are not displayed by default in BigQuery. The queries in this lab will use the `data-to-insights` dataset even though you cannot see it.

1. First, create a copy of the table that the data science team made so you can read it:
    

```sql
create or replace TABLE ecommerce.products AS
SELECT
*
FROM
`data-to-insights.ecommerce.products`
```

**Note:** This is only for you to review, the queries in this lab will be using the `data-to-insights` project.

2. Click on the **ecommerce** dataset to display the `products` table.
    

### Examine the data using Preview and Schema tabs

1. Navigate to the **ecommerce** &gt; **products** dataset and click the **Preview** tab to see the data.
    

How many Aluminum Handy Emergency Flashlights have been ordered?6685090

**Submit**

2. Click the **Schema** tab.
    

What data type are the sentimentScore and sentimentMagnitude fields?INTERGERRECORDSTRINGFLOAT

**Submit**

### Create a query that shows the top 5 products with the most positive sentiment

1. In the **Query Editor**, write your SQL query.
    

Possible solution:

```apache
SELECT
  SKU,
  name,
  sentimentScore,
  sentimentMagnitude
FROM
  `data-to-insights.ecommerce.products`
ORDER BY
  sentimentScore DESC
LIMIT 5
```

What product has the highest sentiment?G Noise-reducing Bluetooth HeadphonesUSB wired soundbar - in store onlyG Noise-reducing Bluetooth HeadphonesStylus Pen w/ LED Light

**Submit**

2. Revise your query to show the top 5 products with the most negative sentiment and filter out NULL values.
    

Possible solution:

```sql
SELECT
  SKU,
  name,
  sentimentScore,
  sentimentMagnitude
FROM
  `data-to-insights.ecommerce.products`
WHERE sentimentScore IS NOT NULL
ORDER BY
  sentimentScore
LIMIT 5
```

What is the product with the lowest sentiment?

What is the product with the lowest sentiment?7 inch Dog FrisbeeWomens Convertible Vest-Jacket Sea Foam Green4 Womens Vintage Hero Tee PlatinumMens Vintage Henley

**Submit**

Click **Check my progress** to verify the objective.

Explore the product sentiment dataset

**Check my progress**

## **Task 3. Join datasets to find insights**

**Scenario:** It's the first of the month and your inventory team has informed you that the `orderedQuantity` field in the product inventory dataset is out of date. They need your help to query the total sales by product for 08/01/2017 and reference that against the current stock levels in inventory to see which products need to be resupplied first.

### Calculate daily sales volume by productSKU

1. Create a new table in your **ecommerce** dataset with the below requirements:
    

* Title it `sales_by_sku_20170801`
    
* Source the data from `data-to-insights.ecommerce.all_sessions_raw`
    
* Include only distinct results
    
* Return `productSKU`
    
* Return the total quantity ordered (`productQuantity`). Hint: Use a `SUM() with a IFNULL` condition
    
* Filter for only sales on `20170801`
    
* `ORDER BY` the SKUs with the most orders first
    

Possible solution:

```sql
# pull what sold on 08/01/2017
CREATE OR REPLACE TABLE ecommerce.sales_by_sku_20170801 AS
SELECT
  productSKU,
  SUM(IFNULL(productQuantity,0)) AS total_ordered
FROM
  `data-to-insights.ecommerce.all_sessions_raw`
WHERE date = '20170801'
GROUP BY productSKU
ORDER BY total_ordered DESC #462 skus sold
```

2. Click on the `sales_by_sku` table, then click the **Preview** tab.
    

How many distinct product SKUs were sold?

Answer: 462

True or false: GGOEGOAQ012899 is the top selling product SKU.TrueFalse

Next, enrich your sales data with product inventory information by joining the two datasets.

#### **Join sales data and inventory data**

1. Using a JOIN, enrich the website ecommerce data with the following fields from the product inventory dataset:
    

* `name`
    
* `stockLevel`
    
* `restockingLeadTime`
    
* `sentimentScore`
    
* `sentimentMagnitude`
    

2. Complete the partially written query:
    

```sql
# join against product inventory to get name
SELECT DISTINCT
  website.productSKU,
  website.total_ordered,
  inventory.name,
  inventory.stockLevel,
  inventory.restockingLeadTime,
  inventory.sentimentScore,
  inventory.sentimentMagnitude
FROM
  ecommerce.sales_by_sku_20170801 AS website
  LEFT JOIN `data-to-insights.ecommerce.products` AS inventory

ORDER BY total_ordered DESC
```

Possible solution:

```sql
# join against product inventory to get name
SELECT DISTINCT
  website.productSKU,
  website.total_ordered,
  inventory.name,
  inventory.stockLevel,
  inventory.restockingLeadTime,
  inventory.sentimentScore,
  inventory.sentimentMagnitude
FROM
  ecommerce.sales_by_sku_20170801 AS website
  LEFT JOIN `data-to-insights.ecommerce.products` AS inventory
  ON website.productSKU = inventory.SKU
ORDER BY total_ordered DESC
```

3. Modify the query you wrote to now include:
    

* A calculated field of (`total_ordered / stockLevel`) and alias it "`ratio`". **Hint:** Use `SAFE_DIVIDE(field1,field2)` to avoid dividing by 0 errors when the stock level is 0.
    
* Filter the results to only include products that have gone through 50% or more of their inventory already at the beginning of the month
    

Possible solution:

```sql
# calculate ratio and filter
SELECT DISTINCT
  website.productSKU,
  website.total_ordered,
  inventory.name,
  inventory.stockLevel,
  inventory.restockingLeadTime,
  inventory.sentimentScore,
  inventory.sentimentMagnitude,

  SAFE_DIVIDE(website.total_ordered, inventory.stockLevel) AS ratio
FROM
  ecommerce.sales_by_sku_20170801 AS website
  LEFT JOIN `data-to-insights.ecommerce.products` AS inventory
  ON website.productSKU = inventory.SKU

# gone through more than 50% of inventory for the month
WHERE SAFE_DIVIDE(website.total_ordered,inventory.stockLevel) >= .50

ORDER BY total_ordered DESC
```

What is the name of the top selling product and what percent of its inventory has been sold already?Youth Short Sleeve Tee Red with a restocking leadtime of 9Leather Journal-Black with 250 product orders out of 354 in stockAndroid Infant Short Sleeve Tee Pewter with 7 product orders out of 2 in stock

**Submit**

Click **Check my progress** to verify the objective.

Join datasets to find insights

**Check my progress**

## **Task 4. Append additional records**

Your international team has already made in-store sales on 08/02/2017 which you want to record in your daily sales tables.

### Create a new empty table to store sales by productSKU for 08/02/2017

1. For the schema, specify the following fields:
    

* table name is `ecommerce.sales_by_sku_20170802`
    
* `productSKU STRING`
    
* `total_ordered` as an `INT64` field
    

Possible solution:

```sql
CREATE OR REPLACE TABLE ecommerce.sales_by_sku_20170802
(
productSKU STRING,
total_ordered INT64
);
```

2. Confirm you now have two date-shared sales tables - use the dropdown menu next to the **Sales\_by\_sku** table name in the table results, or refresh your browser to see it listed in the left menu:
    

![Two sales_by_sku tables highlighted in the ecommerce dataset](https://cdn.qwiklabs.com/SZ13Hdg%2BfnONVNB0yF9N6HeNmmnI3%2Fki0e7YVlwKdbg%3D align="left")

3. Insert the sales record provided to you by your sales team:
    

```sql
INSERT INTO ecommerce.sales_by_sku_20170802
(productSKU, total_ordered)
VALUES('GGOEGHPA002910', 101)
```

4. Confirm the record appears by previewing the table - click on the table name to see the results.
    

### Append together historical data

There are multiple ways to append together data that has the same schema. Two common ways are using UNIONs and table wildcards.

* **Union** is an SQL operator that appends together rows from different result sets.
    
* **Table wildcards** enable you to query multiple tables using concise SQL statements. Wildcard tables are available only in standard SQL.
    

1. Write a UNION query that will result in all records from the below two tables:
    

* `ecommerce.sales_by_sku_20170801`
    
* `ecommerce.sales_by_sku_20170802`
    

```sql
SELECT * FROM ecommerce.sales_by_sku_20170801
UNION ALL
SELECT * FROM ecommerce.sales_by_sku_20170802
```

**Note:** The difference between a `UNION` and `UNION ALL` is that a `UNION` will not include duplicate records.

What is a pitfall of having many daily sales tables? You will have to write many `UNION` statements chained together.

A better solution is to use the table wildcard filter and `_TABLE_SUFFIX` filter.

2. Write a query that uses the (\*) table wildcard to select all records from `ecommerce.sales_by_sku_` for the year 2017.
    

Possible solution:

```sql
SELECT * FROM `ecommerce.sales_by_sku_2017*`
```

3. Modify the previous query to add a filter to limit the results to just 08/02/2017.
    

Possible solution:

```sql
SELECT * FROM `ecommerce.sales_by_sku_2017*`
WHERE _TABLE_SUFFIX = '0802'
```

**Note:** Another option to consider is to create a Partitioned Table which automatically can ingest daily sales data into the correct partition.

A UNION ALL join does not include duplicate records.TrueFalse

Click **Check my progress** to verify the objective.

Append additional records

---

## Solution of Lab

%[https://www.youtube.com/watch?v=H_09BsmZDnQ] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP413/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Creating%20a%20Data%20Warehouse%20Through%20Joins%20and%20Unions/quicklabgsp413.sh
sudo chmod +x quicklabgsp413.sh
./quicklabgsp413.sh
```