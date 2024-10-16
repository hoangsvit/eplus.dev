---
title: "Apply RFM method to segment customer data"
seoTitle: "The Arcade Base Camp August 2024"
seoDescription: "Data transformation techniques are used to prepare data in a way that makes it easier for users to get the answers to their business questions quickly and e"
datePublished: Thu Aug 15 2024 06:01:33 GMT+0000 (Coordinated Universal Time)
cuid: clzuvhegv000409l33l70a2ar
slug: apply-rfm-method-to-segment-customer-data
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723701476458/e524df7b-cb73-4d3c-913d-9bba2a5e78fb.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723701682603/380de087-a834-41b3-bb78-bfdc4916eaa0.png

---

## **Activity overview**

Data transformation techniques are used to prepare data in a way that makes it easier for users to get the answers to their business questions quickly and efficiently. One example of data analysis that often requires transformation is customer segmentation.

Segmentation is the process of dividing data into groups based on common characteristics. This can be done for a variety of purposes, such as understanding customer behavior, identifying trends, and targeting marketing campaigns.

The RFM method is a customer segmentation technique that stands for recency, frequency, and monetary value. Recency refers to the time since the customer's last purchase. Frequency refers to the number of purchases the customer has made. Monetary value refers to the total amount of money the customer has spent.

The RFM method is a data-driven approach to customer segmentation that can be used to identify customers who are most likely to churn, upsell, or cross-sell. It can also be used to target marketing campaigns more effectively.

In this lab, you'll use BigQuery to apply the RFM method to segment customer data to help the marketing team decide how to better target their efforts.

## **Scenario**

TheLook eCommerce has experienced rapid customer growth in recent years. But, despite this growth, customer retention and satisfaction have declined.

As a cloud data analyst for TheLook eCommerce, you’ve been asked to collaborate with Martina, the head of the marketing team, to find a way to better target marketing efforts across the customer base.

To do this, you decide to conduct an RFM analysis by identifying three behaviors for each customer: the recency of their latest purchase, the frequency of purchasing, and the total amount of money spent. The RFM method is a customer segmentation technique that will help you rank customers in four groups including **High-Value Customers**, **Loyal Customers**, **At Risk Customers**, and **Persuadable Customers**.

This RFM analysis can help the marketing team identify customer behavior and focus their marketing efforts on these behaviors to keep them [engaged.To](http://engaged.To) complete the RFM analysis, you’ll use transformation techniques to explore a dataset, aggregate data, join data, derive data, and apply a statistical method to the data.

Here’s how you'll do this task: **First**, you’ll analyze the data. **Second**, you’ll use the orders table to determine the most recent orders and how often customers place orders. **Third**, you’ll use an inner join to deduce the total amount paid by the top 10 clients in 2022. **Fourth**, you’ll create a Common Table Expression (CTE) to consolidate query results. **Finally**, you’ll apply a statistical method to RFM calculations for customer segmentation.

## **Setup**

### Before you click Start Lab

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This practical lab lets you do the activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

***Note:*** *Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.*

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

***Note:*** *If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.*

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. On the left is the **Lab Details** panel with the following:
    
    * Time remaining
        
    * The **Open Google Cloud console** button
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
    
    ***Note:*** *If you need to pay for the lab, a pop-up opens for you to select your payment method.*
    
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window**) if you are running the Chrome browser. The **Sign in** page opens in a new browser tab.
    
    ***Tip:*** You can arrange the tabs in separate, side-by-side windows to easily switch between them.
    
    ***Note:*** *If the* ***Choose an account*** *dialog displays, click* ***Use Another Account***.
    
3. If necessary, copy the **Google Cloud username** below and paste it into the **Sign in** dialog. Click **Next**.
    

```apache
 student-00-854af1027b36@qwiklabs.net
```

Copied!content\_copy

You can also find the **Google Cloud username** in the **Lab Details** panel.

4. Copy the **Google Cloud password** below and paste it into the **Welcome** dialog. Click **Next**.
    

```apache
 UOXfB3EqmaC8
```

Copied!content\_copy

You can also find the **Google Cloud password** in the **Lab Details** panel.

***Important:*** *You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.*

***Note:*** *Using your own Google Cloud account for this lab may incur extra charges.*

5. Click through the subsequent pages:
    
    * Accept the terms and conditions
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account)
        
    * Do not sign up for free trials
        

After a few moments, the Console opens in this tab.

***Note:*** *You can view the menu with a list of Google Cloud Products and Services by clicking the* ***Navigation menu*** *at the top-left.*

![Google Cloud console menu with the Navigation menu icon highlighted](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

## **Task 1. Explore the data**

In this task, you'll explore the data available in the **thelook\_ecommerce** dataset.

1. In the Cloud console, from the **Navigation menu** (
    
    ![Navigation Menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), select **BigQuery**.
    

***Note:*** *The* ***Welcome to BigQuery in the Cloud Console*** *message box may appear, providing links to the quickstart guide and the release notes for UI updates. Click* ***Done*** *to proceed.*

2. Expand the list of datasets by clicking the drop-down arrow next to the project ID.
    
3. Scroll down to the **thelook\_ecommerce** dataset. Expand the dataset and study the tables listed.
    

Notice the **orders** and **order\_items** tables once the dataset has been expanded.

4. Select the **orders** table and explore the **Schema, Details,** and **Preview** tabs.
    
5. On the **Schema** tab, notice the columns (listed under the **Field name** column) in the table. Study the columns along with their **Type** information.
    

Which of the following column names are used in the orders table? Select all that apply.customer\_nameorder\_idquantitystatus

**Submit**

6. Select the **Details** tab; study the **Table info** and **Storage info** sections.
    
7. Select the **Preview** tab; the **Preview** tab displays the first 1000 rows of a table.
    
8. On the **Explorer** pane, select the **order\_items** table and explore the **Schema, Details,** and **Preview** tabs.
    

Which of the following are benefits of using the Preview tab? Select all that apply.Identify relationships in the dataCreate a simple reportVerify data has been loaded correctlyInspect table contents without running a query

**Submit**

## **Task 2. Find the 10 most recent orders**

Recency refers to how recently a customer made a purchase. It is measured in units of time, such as days, weeks, or months. A higher recency score indicates that a customer has made a purchase more recently.

In this task, you'll calculate the recency of customer orders to determine how recently each customer placed an order. For example, if a customer last made a purchase 400 days ago, their recency score would be 400.

1. In **BigQuery Studio**, click **\+ Compose new query**. A new **Untitled** tab opens.
    

***Note:*** *Each time you run a new query in the* ***Query Editor****, you can either replace the old query by copying and pasting the new query over the previous one in the same* ***Untitled*** *tab, or you can click on the* ***Compose new query (+)*** *icon to open a new* ***Untitled*** *tab to run the query in.*

2. Copy the following query into the **Query Editor**. Take a moment to review the SQL code. Can you anticipate what the query results will look like?
    

```apache
SELECT
user_id AS customer_id,
DATE_DIFF(CURRENT_TIMESTAMP(), MAX(created_at), DAY) AS recency,
FROM `thelook_ecommerce.orders`
GROUP BY
user_id
ORDER BY recency DESC
LIMIT 10;
```

Copied!content\_copy

3. Click **Run**.
    

In the **Query results** section on the **Results** tab, a table displays the 10 customers who have placed orders the longest time ago.

Click **Check my progress** to verify that you have completed this task correctly.

Find the 10 most recent orders

**Check my progress**

## **Task 3. Determine the order frequency**

Customers who place orders more frequently are considered to be more engaged with the brand and are more likely to make repeat purchases in the future.

In this task, you'll determine the frequency of customer orders, which means for each customer, you'll count the total number of orders they placed. For instance, if a customer made 10 separate orders, the frequency for that customer would be 10.

1. Copy the following query into the **Query Editor**. Take a moment to review the SQL code. Can you anticipate what the query results will look like?
    

```apache
SELECT
 user_id AS customer_id,
 COUNT(order_id) as frequency,
FROM `thelook_ecommerce.orders`
WHERE created_at >= '2022-01-01' and created_at < '2023-01-01'
GROUP BY customer_id
ORDER BY frequency DESC
LIMIT 10;
```

Copied!content\_copy

2. Click **Run**.
    

What is the highest order frequency over the past year?64710

**Submit**

***Hint:*** *To find the highest frequency, click on the down arrow in the table and select* ***Sort Descending****.*

Click **Check my progress** to verify that you have completed this task correctly.

Determine the order frequency

**Check my progress**

## **Task 4. Determine the total amount spent**

Monetary value is the total amount of money a customer has spent with a company over a specified period of time. Identifying the customers who spend the most money can help businesses improve customer relationships and target their marketing efforts to their most profitable customers.

In this task, you'll determine the total amount of money spent in 2022 by the top 10 customers. To do this you'll use an inner join to connect the order and order\_items tables. You'll also need to use the `SUM()` method to add the sale price.

1. Copy the following query into the **Query Editor**. Copy the following query into the Query Editor. Take a moment to review the SQL code. Can you anticipate what the query results will look like?
    

```apache
SELECT
  o.user_id AS customer_id,
  SUM(oi.sale_price) as monetary
FROM `thelook_ecommerce.orders` o
INNER JOIN `thelook_ecommerce.order_items` oi
ON o.order_id = oi.order_id
WHERE o.created_at >= '2022-01-01' and o.created_at < '2023-01-01'
GROUP BY customer_id
LIMIT 10;
```

Copied!content\_copy

2. Click **Run**.
    

Click **Check my progress** to verify that you have completed this task correctly.

Determine the total amount spent

**Check my progress**

## **Task 5. Create a CTE**

A CTE or Common Table Expression is a temporary result set in a SQL query. A CTE is created using a `WITH` clause and a named `SELECT` statement. CTEs are usually referenced in other `SELECT` statements. A CTE makes it easier to write more complex queries without having to create a new table.

In this task, you’ll use a CTE to write a query that combines recency, frequency, and monetary computations you made earlier.

1. Copy the following query into the Query Editor. Take a moment to review the SQL code. Can you anticipate what the query results will look like?
    

```apache
WITH
rfm_calc AS (
SELECT
o.user_id AS customer_id,
DATE_DIFF(CURRENT_TIMESTAMP(), MAX(o.created_at), DAY) AS recency,
COUNT(o.order_id) AS frequency,
ROUND(SUM(oi.sale_price)) AS monetary
FROM
`thelook_ecommerce.orders` o
INNER JOIN
`thelook_ecommerce.order_items` oi
ON
o.order_id = oi.order_id
GROUP BY
customer_id )

-- You'll now return values from this CTE
SELECT *
FROM
Rfm_calc;
```

Copied!content\_copy

2. Click **Run**.
    

What is the highest frequency of visits for a single customer?17101312

**Submit**

Click **Check my progress** to verify that you have completed this task correctly.

Create a CTE

**Check my progress**

## **Task 6. Apply a statistical method to RFM calculations**

RFM values measure how recently a customer has made a purchase, how frequently they make purchases, and how much they spend each time they purchase something. Quantiles divide a set of data into equal parts. For example, tertiles divide a set of data into three equal parts and a quartile divides data into four equal parts.

In this task, you'll segment the customers in this example using their RFM values and quantiles. You'll use the `NTILE()` function in BigQuery to calculate the quantiles of the RFM values. This will give you a better understanding of how your customers are distributed in terms of their RFM values.

To do this, you'll create a new CTE called `rfm_quant`. This CTE will use the `NTILE()` function to calculate the quantiles of the RFM values in the rfm\_calc CTE that you created in the previous step.

Once you've created the `rfm_quant` CTE, you can use it to segment your customers.

Finally, you'll use the `CASE` statement to assign customer segmentation category names based on the quantiles you produced. A `CASE` statement is a SQL statement that allows you to evaluate multiple conditions and return a different value based on which condition is met.

1. Copy the following query into the **Query Editor**:
    

```apache
WITH
rfm_calc AS (
SELECT
o.user_id AS customer_id,
DATE_DIFF(CURRENT_TIMESTAMP(), MAX(o.created_at), DAY) AS recency,
COUNT(o.order_id) AS frequency,
ROUND(SUM(oi.sale_price)) AS monetary
FROM
`thelook_ecommerce.orders` o
INNER JOIN
`thelook_ecommerce.order_items` oi
ON
o.order_id = oi.order_id
GROUP BY
customer_id ),

-- Here you're leveraging the rfm_calc CTE and creating another CTE
rfm_quant AS (
SELECT
customer_id,
NTILE(4) OVER (ORDER BY recency) AS recency_quantile,
NTILE(4) OVER (ORDER BY frequency) AS frequency_quantile,
NTILE(4) OVER (ORDER BY monetary) AS monetary_quantile
FROM
rfm_calc )

--And then you perform a select query that assigns categories based on quantile logic and returns values
SELECT
customer_id,recency_quantile, frequency_quantile, monetary_quantile,
CASE
WHEN monetary_quantile >= 3 AND frequency_quantile >= 3 THEN "High Value Customer"
WHEN frequency_quantile >= 3 THEN "Loyal Customer"
WHEN recency_quantile <= 1 THEN "At Risk Customer"
WHEN recency_quantile >= 3 THEN "Persuadable Customer"
END
AS customer_segment
FROM
rfm_quant;
```

Copied!content\_copy

2. Click **Run**.
    

In customer relationship management (CRM), a recency\_quantile of 4 is the highest possible score for recency. What do you think is likely true about customers in this group?None of these optionsThe customer has made a purchase within the most recent 25% of all customersThe customer has made a more recent purchase than 25% of customersThe customer has made a purchase within 30 days

**Submit**

Click **Check my progress** to verify that you have completed this task correctly.

Apply a statistical method to RFM calculations

**Check my progress**

## **Conclusion**

Great work!

You successfully helped Martina better understand their customers by segmenting the data.

First, you analyzed the data.

Second, you used the orders table to determine the most recent orders and how often customers place orders.

Third, you used an inner join to deduce the total amount paid by the top 10 clients in 2022.

Fourth, you created a CTE to consolidate query results.

Finally, you applied a statistical method to RFM calculations for customer segmentation.

You now have practical experience using BigQuery to calculate how recently and how often customers have made purchases. You also learned how to calculate how much money they have spent by combining two tables. Then, you used those tables and calculations to create a new temporary table. This allowed you to use statistical methods to group customers into segments.

You’re well on your way to understanding how to utilize the RFM method on data sources in BigQuery.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=HL31uNAMoTA] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Apply%20RFM%20method%20to%20segment%20customer%20data/quicklab.sh
sudo chmod +x quicklab.sh
./quicklab.sh
```