---
title: "Troubleshooting and Solving Data Join Pitfalls - GSP412"
seoTitle: "Troubleshooting and Solving Data Join Pitfalls - GSP412"
seoDescription: "BigQuery is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infra"
datePublished: Tue Aug 06 2024 13:57:54 GMT+0000 (Coordinated Universal Time)
cuid: clzihjbzh000k09l6f8qg3jrh
slug: troubleshooting-and-solving-data-join-pitfalls-gsp412
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722951825582/ec3664bd-4b0e-41fd-ad34-ea9785578d2e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722952658185/b485f49c-003a-44ba-a46b-8ce462644431.png
tags: troubleshooting-and-solving-data-join-pitfalls-gsp412

---

## **Overview**

[BigQuery](https://cloud.google.com/bigquery) is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infrastructure to manage or needing a database administrator. BigQuery uses SQL and can take advantage of the pay-as-you-go model. BigQuery allows you to focus on analyzing data to find meaningful insights.

Joining data tables can provide meaningful insight into your dataset. However, when you join your data there are common pitfalls that could corrupt your results. This lab focuses on avoiding those pitfalls. Types of joins:

* *Cross join*: combines each row of the first dataset with each row of the second dataset, where every combination is represented in the output.
    
* *Inner join*: requires that key values exist in both tables for the records to appear in the results table. Records appear in the merge only if there are matches in both tables for the key values.
    
* *Left join*: Each row in the left table appears in the results, regardless of whether there are matches in the right table.
    
* *Right join*: the reverse of a left join. Each row in the right table appears in the results, regardless of whether there are matches in the left table.
    

For more information about joins, refer to the [Join Page](https://cloud.google.com/dataprep/docs/html/Join-Page_57344880).

The dataset you'll use is an [ecommerce dataset](https://www.en.advertisercommunity.com/t5/Articles/Introducing-the-Google-Analytics-Sample-Dataset-for-BigQuery/ba-p/1676331#) that has millions of Google Analytics records for the [Google Merchandise Store](https://shop.googlemerchandisestore.com/) loaded into BigQuery. You have a copy of that dataset for this lab and will explore the available fields and row for insights.

For syntax information to help you follow and update the queries, see [Standard SQL Query Syntax](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax).

**What you'll do**

In this lab, you learn how to:

* Use BigQuery to explore and troubleshoot duplicate rows in a dataset.
    
* Create joins between data tables.
    
* Choose between different join types.
    

### **Task 1. Create a new dataset to store your tables**

In your BigQuery project, create a new dataset titled `ecommerce`.

1. Click the three dots next to your Project ID and select **Create dataset**.
    

![Create dataset option highlighted](https://cdn.qwiklabs.com/E1Izps4nHGg93qwbX6%2BqQMiTUp13tvY0FIpZTm9PqSk%3D align="left")

The **Create dataset** dialog opens.

2. Set the *dataset ID* to `ecommerce`.
    
3. Leave the other options at their default values, and click **Create dataset**.
    

In the left pane, you see an `ecommerce` table listed under your project.

Click **Check my progress** to verify the objective.

Create a new dataset

**Check my progress**

### **Task 2. Pin the lab project in BigQuery**

Scenario: Your team provides you with a new dataset on the inventory stock levels for each of your products for sale on your ecommerce website. You want to become familiar with the products on the website and the fields you could use to potentially join on to other datasets.

The project with the new dataset is **data-to-insights**.

1. Click **Navigation menu**
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    \&gt; **BigQuery**.
    

The Welcome to BigQuery in the Cloud Console message box opens.

**Note:** The Welcome to BigQuery in the Cloud Console message box provides a link to the quickstart guide and UI updates.

2. Click **Done**.
    
3. BigQuery public datasets are not displayed by default. To open the public datasets project, copy **data-to-insights**.
    
4. Click **\+ Add** &gt; **Star a project by name** then paste the data-to-insights name.
    
5. Click **Star**.
    

The `data-to-insights` project is listed in the Explorer section.

### **Task 3. Examine the fields**

Next, get familiar with the products and fields on the website you can use to create queries to analyze the dataset.

1. In the left pane in the Resources section, navigate to `data-to-insights` &gt; `ecommerce` &gt; `all_sessions_raw`.
    
2. On the right, under the Query editor, click the **Schema** tab to see the Fields and information about each field.
    

### **Task 4. Identify a key field in your ecommerce dataset**

Examine the products and fields further. You want to become familiar with the products on the website and the fields you could use to potentially join on to other datasets.

**Examine the records**

In this section you find how many product names and product SKUs are on your website and whether either one of those fields is unique.

1. Find how many product names and product SKUs are on the website. **Copy and Paste** the below query in bigquery **EDITOR**:
    

```sql
#standardSQL
# how many products are on the website?
SELECT DISTINCT
productSKU,
v2ProductName
FROM `data-to-insights.ecommerce.all_sessions_raw`
```

2. Click **Run**.
    

Look at the pagination results in the console for the total number of records returned.

![Query results with pagination highlighted](https://cdn.qwiklabs.com/BxuVfqbqOwbz1BABm52tAadnDEV9nsZTv4xADegkaCc%3D align="left")

How many rows of product data are returned?1,925 products and SKUs2,273 products and SKUs2,205 products and SKUs

**Submit**

But...do the results mean that there are that many unique product SKUs? One of the first queries you will run as a data analyst is looking at the uniqueness of your data values.

3. Clear the previous query and run the below query to list the number of distinct SKUs are listed using `DISTINCT`:
    

```apache
#standardSQL
# find the count of unique SKUs
SELECT
DISTINCT
productSKU
FROM `data-to-insights.ecommerce.all_sessions_raw`
```

How many DISTINCT SKUs are returned?119 distinct SKUs1,909 distinct SKUs2,273 distinct SKUs

There are fewer DISTINCT SKUs than the SKU & Product Name query had before. Why do you think that is?The first query was excluding some Product Names.The first query showed that only one Product Name can belong to a SKU.The first query also returned Product Name. It appears multiple Product Names can have the same SKU.

#### **Examine the relationship between SKU & Name**

Now determine which products have more than one SKU and which SKUs have more than one Product Name.

1. Clear the previous query and run the below query to determine if some product names have more than one SKU. The use of the STRING\_AGG() function to aggregate all the product SKUs that are associated with one product name into comma separated values.
    

```apache
SELECT
  v2ProductName,
  COUNT(DISTINCT productSKU) AS SKU_count,
  STRING_AGG(DISTINCT productSKU LIMIT 5) AS SKU
FROM `data-to-insights.ecommerce.all_sessions_raw`
  WHERE productSKU IS NOT NULL
  GROUP BY v2ProductName
  HAVING SKU_count > 1
  ORDER BY SKU_count DESC
```

2. Click **Run**.
    

Results:

![Query results](https://cdn.qwiklabs.com/FNCBqmZ5vUziQbxcLBNZPyf8QFyAtQAod0KaM%2BwBVPw%3D align="left")

Do some product names have more than one SKU? Look at the query results to confirm No Yes

Which product has the most SKUs associated?Android Womens Short Sleeve Badge Tee Dark HeatherWaze Womens Typography Short Sleeve TeeGoogle Sunglasses

**Submit**

The [ecommerce website catalog](https://shop.googlemerchandisestore.com/clearance/clearance-accessories/) shows that each product name may have multiple options (size, color) -- which are sold as separate SKUs.

So you have seen that 1 Product can have 12 SKUs. What about 1 SKU? Should it be allowed to belong to more than 1 product?

* Clear the previous query and run the below query to find out:
    

```sql
SELECT
  productSKU,
  COUNT(DISTINCT v2ProductName) AS product_count,
  STRING_AGG(DISTINCT v2ProductName LIMIT 5) AS product_name
FROM `data-to-insights.ecommerce.all_sessions_raw`
  WHERE v2ProductName IS NOT NULL
  GROUP BY productSKU
  HAVING product_count > 1
  ORDER BY product_count DESC
```

![Query results](https://cdn.qwiklabs.com/ygNQFqb7mLl2rfSvN3O7ysFF0BV3keIMiU9DrfEhVtk%3D align="left")

**Note:** Try replacing STRING\_AGG() with ARRAY\_AGG() instead. Pretty cool, right? BigQuery natively supports nested array values. You can learn more from the [Work with arrays guide](https://cloud.google.com/bigquery/docs/arrays).

When you look at the query results, are there single SKU values with more than one product name associated? What do you notice about those product names?Yes, most of the product names are similar but not exactly the same.No, the Product SKUs match the Product Names one-for-one.

**Submit**

You will see why this many-to-many data relationship will be an issue in the next section.

Click **Check my progress** to verify the objective.

Identify a key field in your ecommerce dataset

**Check my progress**

### **Task 5. Pitfall: non-unique key**

In inventory tracking, a SKU is designed to uniquely identify one and only one product. For us, it will be the basis of your JOIN condition when you lookup information from other tables. Having a non-unique key can cause serious data issues as you will see.

1. **Write a query** to identify all the product names for the SKU `'GGOEGPJC019099'`.
    

Possible solution:

```sql
SELECT DISTINCT
  v2ProductName,
  productSKU
FROM `data-to-insights.ecommerce.all_sessions_raw`
WHERE productSKU = 'GGOEGPJC019099'
```

2. Click **Run**.
    

| **v2ProductName** | **productSKU** |
| --- | --- |
| 7&quot; Dog Frisbee | GGOEGPJC019099 |
| 7" Dog Frisbee | GGOEGPJC019099 |
| Google 7-inch Dog Flying Disc Blue | GGOEGPJC019099 |

What do you notice about the product names?They are mostly the same except for a few characters.They are exactly the same.

**Submit**

From the query results, it looks like there are three different names for the same product. In this example, there is a special character in one name and a slightly different name for another:

### Joining website data against your product inventory list

Now see the impact of joining on a dataset with multiple products for a single SKU. First explore the product inventory dataset (the `products` table) to see if this SKU is unique there.

* Clear the previous query and run the below query:
    

```sql
SELECT
  SKU,
  name,
  stockLevel
FROM `data-to-insights.ecommerce.products`
WHERE SKU = 'GGOEGPJC019099'
```

Is the SKU unique in the product inventory dataset?Yes, just one record is returned.No, there are duplicate SKUs in the inventory dataset.

**Submit**

How many dog frisbees do you have in inventory?154010,540

**Submit**

**Join pitfall: Unintentional many-to-one SKU relationship**

You now have two datasets: one for inventory stock level and the other for our website analytics. JOIN the inventory dataset against your website product names and SKUs so you can have the inventory stock level associated with each product for sale on the website.

1. Clear the previous query and run the below query:
    

```sql
SELECT DISTINCT
  website.v2ProductName,
  website.productSKU,
  inventory.stockLevel
FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
JOIN `data-to-insights.ecommerce.products` AS inventory
  ON website.productSKU = inventory.SKU
  WHERE productSKU = 'GGOEGPJC019099'
```

What happens when you join the website table and the product inventory table on SKU? Do you now have inventory stock levels for the product?Yes, there is inventory data and everything looks fine.Yes, there are inventory levels but the stockLevel is showing three times (one for each record).No, there is no inventory data, the join did not work.

**Submit**

Next, expand our previous query to simply SUM the inventory available by product.

2. Clear the previous query and run the below query:
    

```sql
WITH inventory_per_sku AS (
  SELECT DISTINCT
    website.v2ProductName,
    website.productSKU,
    inventory.stockLevel
  FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
  JOIN `data-to-insights.ecommerce.products` AS inventory
    ON website.productSKU = inventory.SKU
    WHERE productSKU = 'GGOEGPJC019099'
)

SELECT
  productSKU,
  SUM(stockLevel) AS total_inventory
FROM inventory_per_sku
GROUP BY productSKU
```

Is the dog Frisbee properly showing a stock level of 154?Yes, it is at 154No, it is now at 462 showing three times (one for each record!)

**Submit**

Oh no! It is 154 x 3 = 462 or triple counting the inventory! This is called an unintentional cross join (a topic that will be revisited later).

Click **Check my progress** to verify the objective.

Pitfall: non-unique key

**Check my progress**

### **Task 6. Join pitfall solution: use distinct SKUs before joining**

What are the options to solve your triple counting dilemma? First you need to only select distinct SKUs from the website before joining on other datasets.

You know that there can be more than one product name (like 7" Dog Frisbee) that can share a single SKU.

1. Gather all the possible names into an array:
    

```sql
SELECT
  productSKU,
  ARRAY_AGG(DISTINCT v2ProductName) AS push_all_names_into_array
FROM `data-to-insights.ecommerce.all_sessions_raw`
WHERE productSKU = 'GGOEGAAX0098'
GROUP BY productSKU
```

Now instead of having a row for every Product Name, you only have a row for each unique SKU.

2. If you wanted to deduplicate the product names, you could even LIMIT the array like so:
    

```sql
SELECT
  productSKU,
  ARRAY_AGG(DISTINCT v2ProductName LIMIT 1) AS push_all_names_into_array
FROM `data-to-insights.ecommerce.all_sessions_raw`
WHERE productSKU = 'GGOEGAAX0098'
GROUP BY productSKU
```

**Join pitfall: losing data records after a join**

Now you're ready to join against your product inventory dataset again.

1. Clear the previous query and run the below query:
    

```sql
#standardSQL
SELECT DISTINCT
website.productSKU
FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
JOIN `data-to-insights.ecommerce.products` AS inventory
ON website.productSKU = inventory.SKU
```

How many records were returned? All 1,909 distinct SKUs?No, just 1,090 recordsYes, all 1,909 records

**Submit**

It seems 819 SKUs were lost after joining the datasets Investigate by adding more specificity in your fields (one SKU column from each dataset):

2. Clear the previous query and run the below query:
    

```sql
#standardSQL
# pull ID fields from both tables
SELECT DISTINCT
website.productSKU AS website_SKU,
inventory.SKU AS inventory_SKU
FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
JOIN `data-to-insights.ecommerce.products` AS inventory
ON website.productSKU = inventory.SKU
# IDs are present in both tables, how can you dig deeper?
```

It appears the SKUs are present in both of those datasets after the join for these 1,090 records. How can you find the missing records?

#### **Join pitfall solution: selecting the correct join type and filtering for NULL**

The default JOIN type is an INNER JOIN which returns records only if there is a SKU match on both the left and the right tables that are joined.

1. **Rewrite the previous query to use a different join type** to include all records from the website table, regardless of whether there is a match on a product inventory SKU record. Join type options: INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN, CROSS JOIN.
    

Possible solution:

```sql
#standardSQL
# the secret is in the JOIN type
# pull ID fields from both tables
SELECT DISTINCT
website.productSKU AS website_SKU,
inventory.SKU AS inventory_SKU
FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
LEFT JOIN `data-to-insights.ecommerce.products` AS inventory
ON website.productSKU = inventory.SKU
```

2. Click **Run**.
    

You have successfully used a LEFT JOIN to return all of the original 1,909 website SKUs in your results.

True or False: Many inventory SKU values are NULL.TrueFalse

**Submit**

How many SKUs are missing from your product inventory set?

1. **Write a query** to filter on NULL values from the inventory table.
    

Possible solution:

```sql
#standardSQL
# find product SKUs in website table but not in product inventory table
SELECT DISTINCT
website.productSKU AS website_SKU,
inventory.SKU AS inventory_SKU
FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
LEFT JOIN `data-to-insights.ecommerce.products` AS inventory
ON website.productSKU = inventory.SKU
WHERE inventory.SKU IS NULL
```

2. Click **Run**.
    

**Question:** How many products are missing?

**Answer:** 819 products are missing (SKU IS NULL) from your product inventory dataset.

* Clear the previous query and run the below query to confirm using one of the specific SKUs from the website dataset:
    

```sql
#standardSQL
# you can even pick one and confirm
SELECT * FROM `data-to-insights.ecommerce.products`
WHERE SKU = 'GGOEGATJ060517'
# query returns zero results
```

Why might the product inventory dataset be missing SKUs?Some SKUs could be digital products that you do not store in warehouse inventoryOld products you sold in past website orders are no longer offered in current inventoryThere is legitimate missing data from inventory and should be trackedAll of the above

**Submit**

Now, what about the reverse situation? Are there any products in the product inventory dataset but missing from the website?

1. Write a query using a different join type to investigate.
    

Possible solution:

```sql
#standardSQL
# reverse the join
# find records in website but not in inventory
SELECT DISTINCT
website.productSKU AS website_SKU,
inventory.SKU AS inventory_SKU
FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
RIGHT JOIN `data-to-insights.ecommerce.products` AS inventory
ON website.productSKU = inventory.SKU
WHERE website.productSKU IS NULL
```

2. Click **Run**.
    

**Answer:** Yes. There are two product SKUs missing from the website dataset

Next, add more fields from the product inventory dataset for more details.

* Clear the previous query and run the below query:
    

```sql
#standardSQL
# what are these products?
# add more fields in the SELECT STATEMENT
SELECT DISTINCT
website.productSKU AS website_SKU,
inventory.*
FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
RIGHT JOIN `data-to-insights.ecommerce.products` AS inventory
ON website.productSKU = inventory.SKU
WHERE website.productSKU IS NULL
```

Why would the below products be missing from the ecommerce website dataset?

| **website\_SKU** | **SKU** | **name** | **orderedQuantity** | **stockLevel** | **restockingLeadTime** | **sentimentScore** | **sentimentMagnitude** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| null | GGOBJGOWUSG69402 | USB wired soundbar - in store only | 10 | 15 | 2 | 1.0 | 1.0 |
| null | GGADFBSBKS42347 | PC gaming speakers | 0 | 100 | 1 | null | null |

**Possible answers:**

* One new product (no orders, no sentimentScore) and one product that is "in store only"
    
* Another is a new product with 0 orders
    

Why would the new product not show up on your website dataset?

* The website dataset is past order transactions by customers brand new products which have never been sold won't show up in web analytics until they're viewed or purchased.
    

**Note:** You typically will not see RIGHT JOINs in production queries. You would simply just do a LEFT JOIN and switch the ordering of the tables.

What if you wanted one query that listed all products missing from either the website or inventory?

1. Write a query using a different join type.
    

Possible solution:

```sql
#standardSQL
SELECT DISTINCT
website.productSKU AS website_SKU,
inventory.SKU AS inventory_SKU
FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
FULL JOIN `data-to-insights.ecommerce.products` AS inventory
ON website.productSKU = inventory.SKU
WHERE website.productSKU IS NULL OR inventory.SKU IS NULL
```

2. Click **Run**.
    

You have your 819 + 2 = 821 product SKUs.

LEFT JOIN + RIGHT JOIN = FULL JOIN which returns all records from both tables regardless of matching join keys. You then filter out where you have mismatches on either side

**Join pitfall: unintentional cross join**

Not knowing the relationship between data table keys (1:1, 1:N, N:N) can return unexpected results and also significantly reduce query performance.

The last join type is the CROSS JOIN.

Create a new table with a site-wide discount percent that you want applied across products in the Clearance category.

1. Clear the previous query and run the below query:
    

```sql
#standardSQL
CREATE OR REPLACE TABLE ecommerce.site_wide_promotion AS
SELECT .05 AS discount;
```

In the left pane, `site_wide_promotion` is now listed in the Resource section under your project and dataset.

2. Clear the previous query and run the below query to find out how many products are in clearance:
    

```sql
SELECT DISTINCT
productSKU,
v2ProductCategory,
discount
FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
CROSS JOIN ecommerce.site_wide_promotion
WHERE v2ProductCategory LIKE '%Clearance%'
```

How many products are on clearance?0528291

**Submit**

**Note:** For a CROSS JOIN you will notice there is no join condition (e.g. ON or USING). The field is simply multiplied against the first dataset or .05 discount across all items.

See the impact of unintentionally adding more than one record in the discount table.

3. Clear the previous query and run the below query to insert two more records into the promotion table:
    

```sql
INSERT INTO ecommerce.site_wide_promotion (discount)
VALUES (.04),
       (.03);
```

Next, view the data values in the promotion table.

4. Clear the previous query and run the below query:
    

```sql
SELECT discount FROM ecommerce.site_wide_promotion
```

How many records were returned?

**Answer:** 3

What happens when you apply the discount again across all 82 clearance products?

5. Clear the previous query and run the below query:
    

```sql
SELECT DISTINCT
productSKU,
v2ProductCategory,
discount
FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
CROSS JOIN ecommerce.site_wide_promotion
WHERE v2ProductCategory LIKE '%Clearance%'
```

How many products are returned?

**Answer:** Instead of 82, you now have 246 returned which is more records than your original table started with.

Now investigate the underlying cause by examining one product SKU.

6. Clear the previous query and run the below query:
    

```sql
#standardSQL
SELECT DISTINCT
productSKU,
v2ProductCategory,
discount
FROM `data-to-insights.ecommerce.all_sessions_raw` AS website
CROSS JOIN ecommerce.site_wide_promotion
WHERE v2ProductCategory LIKE '%Clearance%'
AND productSKU = 'GGOEGOLC013299'
```

What was the impact of the CROSS JOIN?

**Answer:** Since there are 3 discount codes to cross join on, you are multiplying the original dataset by 3.

**Note:** This behavior isn't limited to cross joins, with a normal join you can unintentionally cross join when the data relationships are many-to-many this can easily result in returning millions or even billions of records unintentionally.

The solution is to know your data relationships before you join and don't assume keys are unique.

Click **Check my progress** to verify the objective.

---

### Solution of Lab

%[https://www.youtube.com/watch?v=QtvXdVnelLo] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/2024%20Troubleshooting%20and%20Solving%20Data%20Join%20Pitfalls/quicklabgsp412.sh
sudo chmod +x quicklabgsp412.sh
./quicklabgsp412.sh
```