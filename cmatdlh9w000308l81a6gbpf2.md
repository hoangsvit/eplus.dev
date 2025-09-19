---
title: "Troubleshooting Common SQL Errors with BigQuery - GSP408"
seoTitle: "Troubleshooting Common SQL Errors with BigQuery - GSP408"
seoDescription: "BigQuery is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infra"
datePublished: Sun May 18 2025 08:09:49 GMT+0000 (Coordinated Universal Time)
cuid: cmatdlh9w000308l81a6gbpf2
slug: troubleshooting-common-sql-errors-with-bigquery-gsp408
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747555608537/f43e5187-1931-4fff-9648-d2594221bb75.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747555777781/ad054285-5ce6-4ba6-8e41-096f7b4ac997.png
tags: bigquery, troubleshooting-common-sql-errors-with-bigquery-gsp408, troubleshooting-common-sql-errors-with-bigquery, gsp408

---

## Overview

BigQuery is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infrastructure to manage or needing a database administrator. BigQuery uses SQL, and you can take advantage of the pay-as-you-go model. BigQuery allows you to focus on analyzing data to find meaningful insights.

A newly available [ecommerce dataset](https://www.en.advertisercommunity.com/t5/Articles/Introducing-the-Google-Analytics-Sample-Dataset-for-BigQuery/ba-p/1676331#) that has millions of Google Analytics records for the [Google Merchandise Store](https://shop.googlemerchandisestore.com/) has been loaded into BigQuery. You have a copy of that dataset for this lab and will explore the available fields and row for insights.

This lab steps you through the logic of troubleshooting queries. It provides activities within the context of a real-world scenario. Throughout the lab, imagine you're working with a new data analyst on your team, and they've provided you with their queries below to answer some questions on your ecommerce dataset. Use the answers to fix their queries to get a meaningful result.

### What you'll learn

In this lab, you learn how to perform the following tasks:

* Pin projects to the BigQuery resource tree
    
* Use the BigQuery query editor and query validator to identify and troubleshoot SQL syntax and logic errors
    

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
    student-04-56ef43428064@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    AsnkypUJvPn3
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

## Task 1. Pin a project to the BigQuery resource tree

1. In the Google Cloud console, in the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) click **BigQuery**.
    

The Welcome to BigQuery in the Cloud Console message box opens.

**Note:** The Welcome to BigQuery in the Cloud Console message box provides a link to the quickstart guide and UI updates.

2. Click **Done**.
    
3. BigQuery public datasets are not displayed by default. To open the public datasets project, copy **data-to-insights** (to paste in a dialog in the next step).
    
4. Click **\+ Add &gt; Star a project by name** then paste the data-to-insights name.
    
5. Click **Star**.
    

The `data-to-insights` project is listed in the **Explorer** section.

### BigQuery query editor and query validator

For each activity in the following sections, this lab provides queries with common errors for you to troubleshoot. The lab directs you what to look at and suggests how to correct the syntax and return meaningful results.

To follow along with the troubleshooting and suggestions, copy and paste the query into the BigQuery query editor. If there are errors, you see a red exclamation point at the line containing the error and in the query validator (bottom corner).

![BigQuery Query editor](https://cdn.qwiklabs.com/k8WSzvBC0aCzmoXnVkoLM9oaxZHx87%2BBWrmK5AJ7jmA%3D align="left")

If you run the query with the errors, the query fails and the error is specified in the Job information.

![Query failed infobox](https://cdn.qwiklabs.com/GBZiclcngcPbDiyl8PCH5IOFF%2BnkUEH%2BGD4jtQjWtjA%3D align="left")

When the query is error free, you see a green checkmark in the query validator. When you see the green checkmark, click **Run** to run the query to view what you get for results.

![Green checkmark in the query validator](https://cdn.qwiklabs.com/J7DNcjYJxVXhNNPhTYrbho4H9ETGHsI4ZEkK2Gi3HKc%3D align="left")

**Note:** For information about syntax, see [Standard SQL Query Syntax](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax).

## Task 2. Find the total number of customers who went through checkout

Your goal in this section is to construct a query that gives you the number of unique visitors who successfully went through the checkout process for your website. The data is in the rev\_transactions table which your data analyst team has provided. They have also given you example queries to help you get started in your analysis but you're not sure they're written correctly.

**Note:** All queries need to be executed and error-free to get the full score.

### Troubleshoot queries that contain query validator, alias, and comma errors

* Look at the below query and answer the following question:
    

```apache
#standardSQL
SELECT  FROM `data-to-inghts.ecommerce.rev_transactions` LIMIT 1000
```

What's wrong with the previous query to view 1000 items?We are using legacy SQLThere is a typo in the table nameWe have not specified any columns in the SELECTThere is a typo in the dataset name

**Submit**

* What about this updated query?
    

```apache
#standardSQL
SELECT * FROM [data-to-insights:ecommerce.rev_transactions] LIMIT 1000
```

What's wrong with the new previous query to view 1000 items?There is a typo in the dataset nameWe have not specified any columns in the SELECTWe are using legacy SQLThere is a typo in the table name

**Submit**

* What about this query that uses Standard SQL?
    

```apache
#standardSQL
SELECT FROM `data-to-insights.ecommerce.rev_transactions`
```

What is wrong with the previous query?We are still using legacy SQLWe are missing an ORDER BY clauseStill no columns defined in SELECTSELECT clause is returning all columns which leads to poor performance

**Submit**

* What about now? This query has a column:
    

```apache
#standardSQL
SELECT
fullVisitorId
FROM `data-to-insights.ecommerce.rev_transactions`
```

What is wrong with the previous query?We are missing a column aliasThe page title is missing from the columns in SELECTWe are missing a LIMIT clauseWithout aggregations, limits, or sorting, this query is not insightful

**Submit**

* What about now? The following query has a page title:
    

```apache
#standardSQL
SELECT fullVisitorId hits_page_pageTitle
FROM `data-to-insights.ecommerce.rev_transactions` LIMIT 1000
```

How many columns will the previous query return?2, columns named fullVisitorId and hits\_page\_pageTitle0, the query will return an error3 columns will be returned since we are missing a comma1, a column named hits\_page\_pageTitle

**Submit**

* What about now? The missing comma has been corrected.
    

```apache
#standardSQL
SELECT
  fullVisitorId
  , hits_page_pageTitle
FROM `data-to-insights.ecommerce.rev_transactions` LIMIT 1000
```

**Answer:** This returns results, but are you sure visitors aren't counted twice? Also, returning only one row answers the question of how many unique visitors reached checkout. In the next section you find a way to aggregate your results.

### Troubleshoot queries that contain logic errors, GROUP BY statements, and wildcard filters

* Aggregate the following query to answer the question: How many unique visitors reached checkout?
    

```apache
#standardSQL
SELECT
  fullVisitorId
  , hits_page_pageTitle
FROM `data-to-insights.ecommerce.rev_transactions` LIMIT 1000
```

* What about this? An aggregation function, `COUNT()`, was added:
    

```apache
#standardSQL
SELECT
COUNT(fullVisitorId) AS visitor_count
, hits_page_pageTitle
FROM `data-to-insights.ecommerce.rev_transactions`
```

What is wrong with the previous query?It is missing a GROUP BY clauseNothing, it executes correctlyThe COUNT() function does not de-deduplicate the same fullVisitorIdA COUNT() function is used when SUM() should be used instead

**Submit**

* In this next query, `GROUP BY` and `DISTINCT` statements were added:
    

```apache
#standardSQL
SELECT
COUNT(DISTINCT fullVisitorId) AS visitor_count
, hits_page_pageTitle
FROM `data-to-insights.ecommerce.rev_transactions`
GROUP BY hits_page_pageTitle
```

**Results**

Great! The results are good, but they look strange.

* Filter to just "Checkout Confirmation" in the results:
    

```apache
#standardSQL
SELECT
COUNT(DISTINCT fullVisitorId) AS visitor_count
, hits_page_pageTitle
FROM `data-to-insights.ecommerce.rev_transactions`
WHERE hits_page_pageTitle = "Checkout Confirmation"
GROUP BY hits_page_pageTitle
```

Click **Check my progress** to verify the objective.

Find the total number of customers went through checkout

**Check my progress**

## Task 3. List the cities with the most transactions with your ecommerce site

**Note:** All queries need to be executed and error-free to get the full score.

### Troubleshoot ordering, calculated fields, and filtering after aggregating errors

1. Complete the partially written query:
    

```apache
SELECT
geoNetwork_city,
totals_transactions,
COUNT( DISTINCT fullVisitorId) AS distinct_visitors
FROM
`data-to-insights.ecommerce.rev_transactions`
GROUP BY
```

**Possible solution:**

```apache
#standardSQL
SELECT
geoNetwork_city,
SUM(totals_transactions) AS totals_transactions,
COUNT( DISTINCT fullVisitorId) AS distinct_visitors
FROM
`data-to-insights.ecommerce.rev_transactions`
GROUP BY geoNetwork_city
```

2. Update your previous query to order the top cities first.
    

Which city had the most distinct visitors? Ignore the value: 'not available in this demo dataset'San JoseMountain ViewAustinLos Angeles

**Submit**

**Possible solution:**

```apache
#standardSQL
SELECT
geoNetwork_city,
SUM(totals_transactions) AS totals_transactions,
COUNT( DISTINCT fullVisitorId) AS distinct_visitors
FROM
`data-to-insights.ecommerce.rev_transactions`
GROUP BY geoNetwork_city
ORDER BY distinct_visitors DESC
```

3. Update your query and create a new calculated field to return the average number of products per order by city.
    

**Possible solution:**

```apache
#standardSQL
SELECT
geoNetwork_city,
SUM(totals_transactions) AS total_products_ordered,
COUNT( DISTINCT fullVisitorId) AS distinct_visitors,
SUM(totals_transactions) / COUNT( DISTINCT fullVisitorId) AS avg_products_ordered
FROM
`data-to-insights.ecommerce.rev_transactions`
GROUP BY geoNetwork_city
ORDER BY avg_products_ordered DESC
```

**Results**

![Results table](https://cdn.qwiklabs.com/zP3Or2c9FCp15knqC%2FSGDnypux2I7P9s9jIwBeUa2Bg%3D align="left")

Filter your aggregated results to only return cities with more than 20 avg\_products\_ordered.

* What's wrong with the following query?
    

```apache
#standardSQL
SELECT
geoNetwork_city,
SUM(totals_transactions) AS total_products_ordered,
COUNT( DISTINCT fullVisitorId) AS distinct_visitors,
SUM(totals_transactions) / COUNT( DISTINCT fullVisitorId) AS avg_products_ordered
FROM
`data-to-insights.ecommerce.rev_transactions`
WHERE avg_products_ordered > 20
GROUP BY geoNetwork_city
ORDER BY avg_products_ordered DESC
```

What is wrong with the previous query?Nothing, it executes correctlyYou cannot filter aggregated fields in the `WHERE` clause (use `HAVING` instead)You cannot divide non-similar aggregate functionsYou cannot filter on aliased fields within the `WHERE` clause

**Submit**

**Possible solution:**

```apache
#standardSQL
SELECT
geoNetwork_city,
SUM(totals_transactions) AS total_products_ordered,
COUNT( DISTINCT fullVisitorId) AS distinct_visitors,
SUM(totals_transactions) / COUNT( DISTINCT fullVisitorId) AS avg_products_ordered
FROM
`data-to-insights.ecommerce.rev_transactions`
GROUP BY geoNetwork_city
HAVING avg_products_ordered > 20
ORDER BY avg_products_ordered DESC
```

Click **Check my progress** to verify the objective.

List the cities with the most transactions with your ecommerce site

**Check my progress**

## Task 4. Find the total number of products in each product category

**Note:** All queries need to be executed and error-free to get the full score.

### Find the top selling products by filtering with NULL values

1. What's wrong with the following query? How can you fix it?
    

```apache
#standardSQL
SELECT hits_product_v2ProductName, hits_product_v2ProductCategory
FROM `data-to-insights.ecommerce.rev_transactions`
GROUP BY 1,2
```

What is wrong with the previous query?Nothing, it executes correctlyLarge GROUP BYs really hurt performance (consider filtering first and/or using aggregation functions)No aggregate functions are usedThere is a typo in the column name

**Submit**

2. What is wrong with the following query?
    

```apache
#standardSQL
SELECT
COUNT(hits_product_v2ProductName) as number_of_products,
hits_product_v2ProductCategory
FROM `data-to-insights.ecommerce.rev_transactions`
WHERE hits_product_v2ProductName IS NOT NULL
GROUP BY hits_product_v2ProductCategory
ORDER BY number_of_products DESC
```

What is wrong with the previous query which lists products?The WHERE clause should include NULL Product NamesThe COUNT() function is not the distinct number of products in each categoryNothing, the query executes correctlyThe GROUP BY contains an incorrect column

**Submit**

3. Update the previous query to only count distinct products in each product category.
    

**Possible solution:**

```apache
#standardSQL
SELECT
COUNT(DISTINCT hits_product_v2ProductName) as number_of_products,
hits_product_v2ProductCategory
FROM `data-to-insights.ecommerce.rev_transactions`
WHERE hits_product_v2ProductName IS NOT NULL
GROUP BY hits_product_v2ProductCategory
ORDER BY number_of_products DESC
LIMIT 5
```

Which category has the most distinct number of products offered?${productitem.product.origCatName}(not set)ElectronicsOffice

**Submit**

**Note:**

* (not set) could indicate the product has no category
    
* ${productitem.product.origCatName} is front-end code to render the category which may indicate the Google Analytics tracking script is firing before the page is fully-rendered
    

Click **Check my progress** to verify the objective.

Find the total number of products in each product category

**Check my progress**

---

## Solution of Lab

%[https://youtu.be/1gF3begNpos]

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP718/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Troubleshooting%20Common%20SQL%20Errors%20with%20BigQuery/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```