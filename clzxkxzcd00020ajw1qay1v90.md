---
title: "Optimizing Performance of LookML Queries - GSP985"
seoTitle: "Optimizing Performance of LookML Queries - GSP985"
seoDescription: "Looker is a modern data platform in Google Cloud that you can use to analyze and visualize your data interactively. You can use Looker to do in-depth data a"
datePublished: Sat Aug 17 2024 03:29:49 GMT+0000 (Coordinated Universal Time)
cuid: clzxkxzcd00020ajw1qay1v90
slug: optimizing-performance-of-lookml-queries-gsp985
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723863475669/79eb0b92-13b5-41ce-ac5c-c31a0e6ac74f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723865376400/e2193ac4-771d-461e-b740-9bc87e861fa6.png
tags: optimizing-performance-of-lookml-queries-gsp985, gsp985

---

## **Overview**

Looker is a modern data platform in Google Cloud that you can use to analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

Complex queries can be costly, and running them repeatedly strains your database, thereby reducing performance. Ideally, you want to avoid re-running massive queries if nothing has changed, and instead, append new data to existing results to reduce repetitive requests. Although there are many ways to optimize performance of LookML queries, this lab focuses on the most commonly used methods to optimize query performance in Looker: persistent derived tables, aggregate awareness, and performantly joining views.

### What you'll do

* Understand when and how to add persistence and incremental updates to derived tables.
    
* Use aggregate awareness to optimize queries on rolled up or summarized data.
    
* Create a [refinement](https://docs.looker.com/data-modeling/learning-lookml/refinements) of an existing Explore.
    
* Join views in a performant manner to optimize Explore queries.
    
* Monitor the builds of persistent derived tables in a Looker instance.
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to Looker

1. When ready, click .
    
    A new panel will appear with the temporary credentials that you must use for this lab.
    
    If you need to pay for the lab, a pop-up will open for you to select your payment method.
    
2. Note your lab credentials in the left pane. You will use them to sign in to the Looker instance for this lab.
    
    **Note:** If you use other credentials, you will get **errors or incur charges**.
    
3. Click **Open Looker**.
    
4. Enter the provided Username and Password in the Email and Password fields.
    
    **Important:** You must use the credentials from the Connection Details panel on this page. Do not use your Google Cloud Skills Boost credentials. If you have your own Looker account, do not use it for this lab.
    
5. Click **Log In**.
    
    After a successful login, you will see the Looker instance for this lab.
    

## **Key recommendations for optimizing query performance**

In this section, you learn about the commonly used methods for query performance optimization in Looker. In this lab, you get hands-on experience with the first three methods.

### Persistent derived tables (PDTs)

The first solution is persistent derived tables, or PDTs. Looker allows you to write SQL and LookML queries to your database as a temporary table. When this table is cached or persisted, it's called a PDT. This allows you to repeatedly run complex or commonly used queries and cache the results for quick access.

By saving these queries as a table, you have control over when or how they are built. Tables can rebuild every morning, once a month, or only when new data is added. Ideally, you configure your derived tables to reflect the nature of your data.

Derived tables are useful for creating new structures or aggregations that are not already available in your underlying database tables, but not all derived tables need to be persisted to be useful. Persistence is commonly applied to complex queries that are costly to run or for queries that are used frequently by a large number of users or applications.

You can also create [incremental PDTs](https://docs.looker.com/data-modeling/learning-lookml/incremental-pdts) to *append* new data without rebuilding the entire table. Applying incremental changes works well for large tables in which existing (older) data is not frequently updated because the primary update to the table is new records.

### Aggregate awareness

For very large tables in your database, Looker's aggregate awareness can create smaller aggregate tables of data grouped by various combinations of attributes. The aggregate tables act as "rollups" or summary tables that Looker can use instead of the original large table for queries whenever possible. Aggregate awareness allows Looker to find the smallest, most efficient table available in your database to run a query while still maintaining accuracy. When implemented strategically, aggregate awareness can speed up the average query by orders of magnitude. Consider a table of online orders for a busy ecommerce store, which has new rows added every few seconds.

![Aggregate awareness overview diagram](https://cdn.qwiklabs.com/tA62LRrTy05Eui46hMI34nFN6epnwiOfAmcshIRvRVw%3D align="left")

If you want to track realtime orders a higher amount of detail is required, but if you want to look at monthly trends like “Total sales per month,” looking at a monthly rollup of the data is much faster and more cost-effective. In this case, Looker creates and queries the `sales_monthly_aggregate_table`.

For a question like “What is the total value of each sale today,” you need granular, row-level order data. In this case, Looker will query the original `orders_database` table without any aggregation. If you want to look at weekly sales totals for the past three weeks, Looker creates and selects a sales daily aggregate table. This table is more granular than the monthly sales table, but is a rollup of the raw `orders_database`.

Aggregate awareness in Looker is commonly used to roll up or summarize data across multiple time periods. Additionally, aggregate tables *must be persisted* in a Looker instance in order to be leveraged for aggregate awareness.

### Join views in a performant manner

Another way to optimize performance is to join *only the views that you need* while defining a new Explore. To minimize joins, you can define multiple Explores for different purposes (for example, query data by user, query aggregate sales data). Additionally, you should use *base fields* instead of *concatenated fields* as the primary keys. When possible, use `many_to_one` joins: joining views from the most granular level to the highest level of detail ([many\_to\_one](https://docs.looker.com/reference/explore-params/relationship#many_to_one)) typically provides the best query performance in Looker.

### Include filters on Explore definitions

Including filters in Explore definitions can optimize performance by avoiding returning a large amount of data by default. There are many filter options, including filters that are visible to and modifiable by users, such as the `always_filter` and `conditionally_filter`. You can also [modify filter suggestions](https://docs.looker.com/data-modeling/learning-lookml/filter-suggestions) for fields in an Explore. For more information and practice with Explore filters, try the lab [Filtering Explores with LookML](https://www.cloudskillsboost.google/catalog_lab/3839).

### Implement caching policies

To reduce database query traffic, you should maximize caching to sync with your extract, load, and transform (ETL) policies wherever possible. By default, Looker caches queries for one hour. You can control the caching policy and sync Looker data refreshes with your ETL process by using the `persist_with` parameter to apply datagroups within Explores. This enables Looker to integrate more closely with the backend data pipeline so that cache usage can be maximized without the risk of analyzing stale data.

For example, some data tables might be updated only once per day, so refreshing the cache every hour for those tables does not add value. You use various options for customizing caching in Looker, include datagroups, or caching policies, in this lab to persist derived tables. For more information and practice with caching policies, try the lab [Caching and Datagroups with LookML](https://www.cloudskillsboost.google/catalog_lab/3840).

### Additional query optimization

Depending on your specific database dialect, you can explore additional query optimization features, such as [cluster\_keys](https://docs.looker.com/reference/view-params/cluster_keys) and [indexes](https://docs.looker.com/reference/view-params/indexes).

## **Task 1. Create an incremental persistent derived table that will auto-update without rebuilding the entire table**

As described earlier, a persistent derived table (PDT) is a derived table that is written into a scratch schema on your database and regenerated on the schedule that you specify with a persistence strategy. PDTs are helpful because, when the user requests data from the table, the table will often already exist, which reduces query time and database load.

In a standard PDT, the *entire* table is rebuilt according to a schedule set in its caching policy. In contrast, PDTs that are built *incrementally* will append fresh data to an existing table. This can greatly reduce the size of the query you are sending to the database.

In this task, you create a native derived table (NDT) to aggregate order data by time frame or state. You also enable persistence with a daily refresh and incremental updates that go back 3 days to retrieve late data.

### Use an Explore to create a native derived table

1. Click the toggle button to enter **Development mode**.
    
2. Navigate to **Explore &gt; Order Items**.
    
3. Under **Order Items &gt; Dimensions**, select the following:
    
    * **Order ID**
        
    * **Sale Price**
        
    * **Created Date** &gt; **Date**
        
    * **Created Date** &gt; **Week**
        
    * **Created Date** &gt; **Month**
        
4. Under **Users &gt; Dimensions**, select **State**.
    
5. Click **Run**.
    
6. Click **Settings** ().
    
7. Select **Get LookML**.
    
8. On the tab for **Derived Table**, copy the LookML code to a text editor.  
    You'll use this code to create a new view for the native derived table.
    

### Create a view file for a derived table

1. Open a new Looker window in a new browser tab.
    
2. On the **Develop** menu, click **qwiklabs\_ecommerce**.
    
3. Click the plus icon (**+**) next to **File Browser**, and select **Create View**.
    
4. Name the new file `incremental_pdt`, and click **Create**.
    
5. In the File Browser, click on **incremental\_pdt.view** and drag it under the **views** folder.
    
6. Replace the default LookML code in **incremental\_pdt.view** with the code that you copied previously for the native derived table.
    
7. Update line 4 with the correct view name (`incremental_pdt`).
    
8. Update the `order_id` dimension to define it as the `primary_key` for the view:
    

```apache
dimension: order_id {
    primary_key:  yes
    type: number
}
```

This is because each record represents an order with unique `order_id`.

9. Find the last dimension, and add two new measures before the final closing curly bracket (`}`) in the file:
    

```apache
measure: average_sale_price {
    type: average
    sql: ${sale_price} ;;
    value_format_name: usd_0
  }
  measure: total_revenue {
    type: sum
    sql: ${sale_price} ;;
    value_format_name: usd
  }
```

10. Click **Save Changes**. You file should resemble the following:
    

![The incremental_pdt.view file displaying lines one to 43](https://cdn.qwiklabs.com/PyK0GPTJjYne6vU2JJdtdtdO1%2FEVcmOrBE%2F28NpIXAA%3D align="left")

### Add persistence and incremental updates to a derived table

1. Open **training\_ecommerce.model**.
    
2. Find the default datagroup named `training_ecommerce_default_datagroup`, and add a new line (line 13).
    
3. Define a new datagroup to persist objects with daily refresh (max time of 24 hours):
    

```apache
datagroup: daily_datagroup {
  sql_trigger: SELECT FORMAT_TIMESTAMP('%F',
CURRENT_TIMESTAMP(), 'America/Los_Angeles') ;;
  max_cache_age: "24 hours"
}
```

The `sql_trigger` checks the current date and triggers a refresh when the date changes, and `max_cache_age` ensures that the table will rebuild after 24 hours, even if the `sql_trigger` fails to run successfully.

4. At the end of `training_ecommerce.model` (around line 67), define a new Explore that contains only the `incremental_pdt` view so that you can test it in subsequent steps:
    

```apache
explore: incremental_pdt {}
```

5. Click **Save Changes**.
    

![The open training_ecommerce.model file displaying lines one to 21](https://cdn.qwiklabs.com/oQNim6B9kE1ryuU0n2sopqYnSrsGXfwOzf6PJsnJzY8%3D align="left")

6. Open **incremental\_pdt.view**, and add persistence by including the daily datagroup in the derived table definition at line 6:
    

```apache
datagroup_trigger: daily_datagroup
```

7. Add incremental updates by including the following parameters in the derived table definition at lines 7 and 8:
    

```apache
increment_key: "created_date"
increment_offset: 3
```

8. Click **Save Changes**. Your file should resemble the following:
    

![The updated incremental_pdt.view file displaying lines one to 21](https://cdn.qwiklabs.com/bDa%2FjMLH%2Fy1zhok40GuvDEKoC6xI69JvC%2FyM8K3P2SM%3D align="left")

The persistent derived table will now be persisted and will rebuild once a day, going back 3 days to capture any orders that may have arrived late.

9. Close the browser tab for the original Explore query, but leave the tab open for the Looker IDE.
    

### Test Explore queries on a persistent incremental derived table

1. Open a new Looker window in a browser tab.
    
2. Navigate to **Explore &gt; Incremental Pdt**.
    
3. In the Data pane, open the **SQL** tab.
    
4. Under **Incremental Pdt &gt; Dimensions**, select **Created Date**.
    
5. Under **Incremental Pdt &gt; Measures**, select **Average Sale Price** and **Total Revenue**.
    

Before running the query, notice that there are *two* queries in the SQL window (which may take a few seconds to load). The first query generates the PDT named `incremental_pdt`, and the second query retrieves the results from the newly created PDT.

6. Click **Run**.
    
7. Open the **Results** tab to see the results.
    

![The results of incremental pdt](https://cdn.qwiklabs.com/Gk0HK6PFfL0d%2BvRXJEWk4nloPZ7Iy6g75hKeCVLp4DA%3D align="left")

8. Under **Incremental Pdt &gt; Dimensions**:
    
    * *Clear* **Created Date**.
        
    * Select **Created Month**.
        
9. In the Data pane, open the **SQL** tab.
    

Notice that the query will use the same PDT to retrieve the results, which makes sense because you requested a time frame that is already defined (and cached) in the PDT. However, notice that you cannot select and run a query on a different time frame that is not already included in the PDT, such as Quarter or Year.

10. Click **Run**.
    
11. Open the **Results** tab to see the results.
    

![The updated results of incremental pdt](https://cdn.qwiklabs.com/Dg2kyczkd5vVpjD6f1WJEcvHr%2FurDr90hnL6JUL8Llg%3D align="left")

### Challenge

1. Run a new query using only the **State** dimension and the **Average Sale Price** and **Total Revenue** measures. *Answer the following question.*
    

Does the query use the same PDT to retrieve the results?Yes, the query uses the same PDT because the State dimension is already defined and cached in the PDT.No, the query runs but does not use the same PDT to retrieve the results because the Total Revenue measure was not included in the PDT.No, the query runs but does not use the same PDT to retrieve the results because the State dimension was not included in the PDT.No, the query does not run, so no results are retrieved.

**Submit**

2. Close the browser tab for the **Explore** query, and return to the browser tab with the Looker IDE.
    
3. Click **Validate LookML**.  
    There should be no LookML errors.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Remain in the browser tab for the Looker IDE as you begin the next task.

Click *Check my progress* to verify the objective.

Create an incremental persistent derived table

**Check my progress**

## **Task 2. Create an incremental aggregate table to summarize order data across multiple time periods**

In Looker, you can create strategic aggregate tables that will minimize the number of queries required on the large tables in a database. Aggregate tables must be persisted to your database so that they can be accessible for aggregate awareness. Aggregate tables are therefore a type of persistent derived table (PDT).

An aggregate table is defined using the `aggregate_table` parameter under an Explore parameter in your LookML project. After you create your aggregate tables, you can run queries in the Explore to see which aggregate tables Looker uses. Looker uses [aggregate awareness logic](https://docs.looker.com/data-modeling/learning-lookml/aggregate_awareness) to find the smallest, most efficient aggregate table available in your database to run a query while still maintaining correctness.

In this task, you recreate the incremental PDT from the previous task as a new [incremental aggregate table](https://docs.looker.com/reference/view-params/increment_key#creating_an_incremental_aggregate_table). You also make the new aggregate table available to users by using a [refinement](https://docs.looker.com/data-modeling/learning-lookml/refinements) of the existing Order Items Explore.

### Create an aggregate table within a refinement of an existing Explore

1. From the Looker IDE page, open **training\_ecommerce.model**.
    
2. At the end of the file (around line 69), add the following code to create a refinement of the **order\_items** Explore:
    

```apache
explore: +order_items {
    label: "Order Items - Aggregate Sales"
}
```

This [refinement](https://docs.looker.com/data-modeling/learning-lookml/refinements) builds on the existing **order\_items** Explore defined in the model file and adds any modifications specified in the new LookML code, such as the label or the aggregate table that you will add in the next steps.

3. Expand the LookML code for the refinement to include an aggregate table that summarizes order data by time frame or state:
    

```apache
explore: +order_items {
    label: "Order Items - Aggregate Sales"
    aggregate_table: aggregate_sales {
        query: {
            dimensions: [order_items.created_date, users.state]
            measures: [order_items.average_sale_price,
order_items.total_revenue]
        }
        materialization: {
            datagroup_trigger: daily_datagroup
     	 increment_key: "created_date"
      	increment_offset: 3
        }
    }
}
```

Notice that, unlike the native derived table that you created in the previous task, the only time dimension specified in the aggregate table is `created_date`. With aggregate awareness, Looker can leverage this single table for Explore queries that request time-aggregated Average Sale Price or Total Revenue, regardless of which timeframe is requested (day, month, year).

4. Click **Save Changes**.
    

![The open training_ecommerce.model file displaying the order items explore refinement lookml code](https://cdn.qwiklabs.com/OAHTpV%2BG%2BGggnG4FSGZkBUyx%2BWc2sxBNOU9wUHMIuXw%3D align="left")

Leave this tab open for the Looker IDE.

### Test Explore queries on a persistent incremental aggregate table

1. Open a new Looker window in a browser tab.
    
2. Navigate to **Explore &gt; Order Items - Aggregate Sales**.
    
3. In the Data pane, open the **SQL** tab.
    
4. Under **Order Items &gt; Dimensions**, select **Created Date &gt; Date**.
    
5. Under **Order Items &gt; Measures**, select **Average Sale Price** and **Total Revenue**.
    

Before running the query, notice that there are two queries, similar to the SQL window in Task 1. The first query generates the PDT named `aggregate_sales`, and the second query retrieves the results from this new PDT.

6. Click **Run**.
    
7. Open the **Results** tab to see the results.
    

![The aggregate order items results](https://cdn.qwiklabs.com/HLuUKPJFXKy04wHo5%2B54kqxv1Xsj7RHZAgBqC%2B78uMY%3D align="left")

8. Under **Order Items &gt; Dimensions &gt; Created Date**:
    
    * *Clear* **Date**.
        
    * Select **Quarter**.
        
9. In the Data pane, open the **SQL** tab.
    

Notice that the query will use the same PDT (`aggregate_sales`) to retrieve the results by quarter. Looker is applying aggregate awareness to roll up Average Sale Price and Total Revenue to the requested time frames available under Created Date.

10. Click **Run**.
    
11. Open the **Results** tab to see the results.
    

![The aggregate order items results by quarter](https://cdn.qwiklabs.com/Yxv1Per2HeE47%2BBfGoJkO16Nf4k5X9zVrKOOaebMwgI%3D align="left")

### Challenge

1. Run a new query using only the **State** dimension (under Users) and the **Average Sale Price** and **Total Revenue** measures. *Answer the following question.*
    

Does the query use the same PDT to retrieve the results?No, the query runs but does not use the same PDT to retrieve the results because the Total Revenue measure was not included in the aggregate table.No, the query runs but does not use the same PDT to retrieve the results because the State dimension was not included in the aggregate table.No, the query does not run, so no results are retrieved.Yes, the query uses the same PDT because the State dimension is already defined and cached in the PDT.

**Submit**

2. Run a new query using only the **Country** dimension (under Users) and the **Average Sale Price** and **Total Revenue** measures. *Answer the following question.*
    

Does the query use the same PDT to retrieve the results?Yes, the query uses the same PDT because the Country dimension is already defined and cached in the PDT.No, the query does not run, so no results are retrieved.No, the query runs but does not use the same PDT to retrieve the results because the Country dimension was not included in the aggregate table.

**Submit**

3. Close the browser tab for the **Explore** query, and return to the browser tab with the Looker IDE.
    
4. Click **Validate LookML**. There should be no LookML errors.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Remain in the browser tab for the Looker IDE as you begin the next task.

Click *Check my progress* to verify the objective.

Create an aggregate table

**Check my progress**

## **Task 3. Join views in a performant manner to optimize Explore queries**

Efficient joins are key components of defining performant Explores in Looker. To improve efficiency of joins, be sure to join only the views that are needed to define the Explore, use base fields (instead of concatenated fields) as the primary keys for the views, and use [many\_to\_one](https://docs.looker.com/reference/explore-params/relationship#many_to_one) joins whenever possible.

As described in the [documentation](https://docs.looker.com/reference/field-params/primary_key), primary keys provide a unique identifier for records within a view and are essential for accurate aggregations and relationships in Looker. The primary key for a view is a *field containing unique values* (such as an ID column) and is identified in the view file with the parameter `primary_key: yes`.

In this section, you first identify the most appropriate column to use a primary key for a view. You then define a new Explore for the aggregate table with only the users view joined, use the from `parameter` to specify **order\_items** as the base view of the Explore, and then join the users view. Finally, you omit the extra joins that are included in the existing Order Items Explore and use the `many_to_one` join relationship to support query efficiency.

### Identify the most appropriate field to use as the primary key of a view

1. Open the **users.view** file. *Answer the following question*.
    

Which field is the primary key of the **users** view?emailidlast\_countcount

**Submit**

In users.view, the IDd column is already identified as the primary key using `primary_key: yes`. It is a base field that contains unique values (one ID for each user) and is not a concatenated field created from multiple columns. Therefore, ID is the best choice for the primary key of the users view and can support efficient joins.

2. Open the **order\_items.view** file. *Answer the following question*.
    

Which field is the primary key of the **order\_items** view?user\_idorder\_item\_idinventory\_item\_idorder\_id

**Submit**

The `order_item_id` is based on the ID column in the **order\_items** table and is identified as the primary key. However, other ID fields in this view could potentially be the unique key of the table, including `order_id`, which is based on the `order_id` column in the **order\_items** table.

In the next steps, you explore the **order\_items** table in SQL Runner to identify why `order_item_id` is the best field to use the primary\_key.

3. Open a new Looker window in a new browser tab.
    
4. Navigate to **Develop &gt; SQL Runner**.
    
5. Click **Settings** () next to Connection, and select **Search public projects**.
    

![The SQL Runner window](https://cdn.qwiklabs.com/ODFazJ9xgyFMDw4FSVLXeaj890khi7y6ppIuVFCp73E%3D align="left")

6. The box for Project will now be empty. Type `cloud-training-demos`, and press ENTER.
    
7. For Dataset, select `looker_ecomm`.  
    A list of the available tables in this BigQuery dataset is displayed.
    

A fast and easy method to [check whether a column is an appropriate primary key](https://help.looker.com/hc/en-us/articles/360002103808-Getting-Your-Primary-Key-Right-Using-SQL-Runner-and-Creating-a-Compound-Primary-Key) is to compare the *count of records* in the table to the *count of distinct values* in the column. If the two counts match, the column contains unique values and is an appropriate primary key for the table.

8. To check whether the `user_id` column would make an appropriate primary key, add the following query to the SQL Query window, and click **Run**:
    

```sql
SELECT count(*), count(distinct user_id)
FROM cloud-training-demos.looker_ecomm.order_items
```

9. Repeat the query for the `order_id`, `inventory_item_id`, and `id` columns.
    

Which columns have a count of distinct values that matches the count of the records in the **order\_items** table?order\_idinventory\_item\_ididuser\_id

**Submit**

In this case, both `id` and `inventory_item_id` matched the count of records in the table because they are different IDs for the same item within an order. Thus, either could potentially be used as the primary key.

The `id` column was chosen as the primary key for `order_items` because it is the *generated id for an item* in the **order\_items** table, but `inventory_item_id` is the *id of the same item* in the **inventory\_items** table.

10. Close the browser tab for SQL Runner, and return to the browser tab with the Looker IDE.
    

### Join the minimal amount of views to define new Explores

1. Open **training\_ecommerce.model**.
    
2. Review the existing `order_items` Explore.
    

Notice that it includes four different joins that each use the relationship type `many_to_one`. Depending on your use case, all of these joins may be needed. However, what if you only needed the user and order data rolled up by state or timeframe? If so, these extra joins would actually never be used and would slow down queries in the Explore.

In the next steps, you create a new Explore that joins only the order and user data, based on `user_id` in **order\_items** view and `id` in the **users** view.

3. At the end of the file (around line 85) add the following code to define a new Explore with `order_items` as the base view and only the users view joined:
    

```apache
explore: aggregated_orders {
  from: order_items
  label: "Aggregated Sales"
  join: users {
    type: left_outer
    sql_on: ${aggregated_orders.user_id} = ${users.id} ;;
    relationship: one_to_many
  }
  aggregate_table: aggregate_sales {
        query: {
            dimensions: [aggregated_orders.created_date,
users.state]
            measures: [aggregated_orders.average_sale_price,
aggregated_orders.total_revenue]
        }
        materialization: {
            datagroup_trigger: daily_datagroup
     	 	increment_key: "created_date"
     	 	increment_offset: 3
        }
    }
  }
```

4. Click **Save Changes**.  
    Your file should resemble the following:
    

![The training_ecoomerce.model file displaying lines of code for aggregate sales explore](https://cdn.qwiklabs.com/ZK3HpyN9Wslgev8WOZdywKc88PqeNeO37E0Q7K1E6LU%3D align="left")

The [from](https://docs.looker.com/reference/explore-params/from-for-explore) parameter is used to specify **order\_items** as the base view of the Explore, to which the users view is joined. The fields in **order\_items** view are now identified using the new Explore name as `aggregated_orders.fieldname`.

Notice also that the relationship between the **users** view and the **order\_items** view is currently identified as `one_to_many`. In the next steps, you test whether this join based on a `one_to_many` relationship is the most optimal configuration for this Explore.

### Define performant join relationships for efficient Explore queries

1. Open a new Looker window in a new browser tab.
    
2. Navigate to **Explore &gt; Aggregated Sales**.
    
3. In the Data pane, open the **SQL** tab.
    
4. Under **Aggregated Orders &gt; Dimensions**, select **Created Date &gt; Date**.
    
5. Under **Aggregated Orders &gt; Measures**, select:
    
    * **Average Sale Price**
        
    * **Total Revenue**
        

Before running the query, notice that the aggregate table is not being used due to an issue with a join fanout:

```apache
-- Did not use aggregated_orders::aggregate_sales; field aggregated_orders.average_sale_price was DISTINCT in the table due to a join fanout, but there was no fanout in the query
```

An unintended fanout can occur when the relationship between two tables is not identified correctly for a join. In this case, the base view of the Explore is **order\_items**, which can contain *many orders for one user*. However, the **users** view contains only *one record for each user*.

Therefore, this join should actually be defined as `many_to_one`, or many orders to one user, instead of one order to many users. (Learn more about the problem of fanouts in the [Looker Help Center](https://help.looker.com/hc/en-us/articles/4412117099283-The-problem-of-SQL-fanouts).)

6. Click **Run**.
    
7. Open the Results tab.  
    The results are returned, but Looker did not use the efficient aggregate table to retrieve the results.
    
8. Leave this browser tab for the Explore open, and return to the browser tab with the Looker IDE.
    
9. Update the relationship parameter to `many_to_one` (line 91) in the aggregated\_orders explore:
    

```apache
relationship: many_to_one
```

10. Click **Save Changes**.  
    Your file should resemble the following:
    

![The training_ecommerce.model file displaying lines of code for the use of many to one relationship](https://cdn.qwiklabs.com/oqmw1Zg337sB7KBgRTUp0tdd%2F0%2FUe4i7a7qd6PcN%2BZE%3D align="left")

11. Return to the browser tab for the Explore query, and refresh the page.
    
12. In the Data pane, open the **SQL** tab.
    

Similar to the SQL tab for Tasks 1 and 2, there are now two queries: the first to generate the PDT and the second to retrieve results from the PDT.

13. Open the Results tab to see the results.
    

![The aggregated sales results](https://cdn.qwiklabs.com/yf4f1Bm0S%2Fo4wkp2xi99WnrDDjaxbrWGEBDL0F%2BV2gM%3D align="left")

14. Close the browser tab for the **Explore** query, and return to the browser tab with the Looker IDE.
    
15. Click **Validate LookML**.  
    There should be no LookML errors.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Remain in the browser tab for the Looker IDE as you begin the next task.

Click *Check my progress* to verify the objective.

Join the minimal amount of views new Explores

**Check my progress**

## **Task 4. Monitor the builds of persistent derived tables in a Looker instance**

Looker provides the ability to monitor the builds of PDTs in a Looker instance via the Persistent Derived Tables page of the Admin menu. Depending on the Looker configuration, Looker users with privileges to persist tables can view this page even without access to the full Admin menu. You can check the status, build times, and caching of PDTs in both your development and production environments so that you can easily test and monitor PDTs in your Looker instance.

In this task, you monitor the PDTs created in this lab with respect to status, build time, caching, and production versus development. The incremental PDT created from NDT (Task 1) should have the longest build time, and aggregate tables (Tasks 2 and 3) should have the shortest build times. This is because they use the same table definition but are included in differently configured Explores. You also modify a PDT in development and monitor its status before and after pushing to production.

### Review the status of PDTs in production

1. Open a new Looker window in a new browser tab.
    
2. Navigate to **Admin &gt; Persistent Derived Tables**.  
    No PDTs are listed in the Development tab because all of your PDTs have been pushed to production.
    
3. Open the **Production** tab to see the PDTs you created in Tasks 1-3.
    

![The All Connection page open on the Production tabbed page, which displays PDTs in production](https://cdn.qwiklabs.com/NlrayC2jcFACcNAlQJjlZXTi%2FlT%2BHJKIL%2FTJAzuglgE%3D align="left")

The **Last Attempt Status** displays **Success** for all the PDTs, and they are all using the same persistence rule (`daily_datagroup`). For the build time under the Last Build Duration, the `incremental_pdt` probably has a slightly longer build than the two aggregate tables.

Leave this **Persistent Derived Tables** page open as you begin the next steps.

### Modify and review PDTs in development

1. Return to the browser tab with the Looker IDE.
    
2. Open **training\_ecommerce.model**.
    
3. Add a new dimension for `users.country` to the **aggregated\_orders** Explore (around line 96):
    

```apache
dimensions: [aggregated_orders.created_date, users.state, users.country]
```

4. Click **Save Changes**.
    
5. Return to the **Persistent Derived Tables** page, and refresh the page.
    

In the Production tab, **aggregated\_orders::aggregate\_sales** PDT is still listed as built, even though you modified the LookML code for the PDT in development mode.

Looker allows developers to test changes to PDTs in development mode, similar to how developers would work with other Looker objects in development mode. For example, when developers create new dimensions and measures in development mode, these new objects do not show up in production until the developer commits the changes and deploys them to production.

6. Open the **Development** tab.
    

Why does **aggregated\_orders::aggregate\_sales** display a status of Not Built under the Development tab?You have not yet run a query in the Explore that would build this revised version of the PDT.The LookML code for the PDT is incorrect and needs to be updated.The persistence rule (daily\_datagroup) has not triggered a new build.You have not yet deployed the PDT changes to production.

**Submit**

7. Leave this **Persistent Derived Tables** page open, and open a new Looker window in a new browser tab.
    
8. Navigate to **Explore &gt; Aggregate Sales**.
    
9. In the Data pane, open the **SQL** tab.
    
10. Under **Users &gt; Dimensions**, select **Country**.
    
11. Under **Aggregated Orders &gt; Measures**, select:
    
    * **Average Sale Price**
        
    * **Total Revenue**
        

There are two queries in the SQL tab: the first generates the PDT, and the second retrieves the results from the newly built PDT.

12. Click **Run**.
    
13. Open the Results tab to see the results.
    
14. Close the browser tab for the Explore query, return to the browser tab with the **Persistent Derived Tables** page, and refresh the page.
    

The Development tab now shows that **aggregated\_orders::aggregate\_sales** has been built successfully.

Why is **aggregated\_orders::aggregate\_sales** still not listed under the Production tab, even though it was built successfully?You have not yet committed the PDT changes.The persistence rule (daily\_datagroup) has not triggered a new build.You have not yet deployed the PDT changes to production.The LookML code for the PDT is incorrect and needs to be updated.

**Submit**

15. Leave the browser tab for the Persistent Derived Tables page open, and return to the browser tab with the Looker IDE.
    
16. Click **Validate LookML**.  
    There are no LookML errors.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Return to the browser tab with the Persistent Derived Tables page, and refresh the page. Now that the changes to production have been deployed, the **aggregated\_orders::aggregate\_sales PDT** is no longer listed in the Development tab and instead is listed only in the Production tab.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=WS-qAjK_keM] 

### incremental\_pdt

```apache
view: incremental_pdt {
  derived_table: {
    datagroup_trigger: daily_datagroup
    increment_key: "created_date"
    increment_offset: 3
    explore_source: order_items {
      column: order_id {}
      column: sale_price {}
      column: created_date {}
      column: created_week {}
      column: created_month {}
      column: state { field: users.state }
    }
  }
  dimension: order_id {
    description: ""
    primary_key:  yes
    type: number
  }
  dimension: sale_price {
    description: ""
    type: number
  }
  dimension: created_date {
    description: ""
    type: date
  }
  dimension: created_week {
    description: ""
    type: date_week
  }
  dimension: created_month {
    description: ""
    type: date_month
  }
  dimension: state {
    description: "subscribe to quicklab"
  }
  measure: average_sale_price {
    type: average
    sql: ${sale_price} ;;
    value_format_name: usd_0
  }
  measure: total_revenue {
    type: sum
    sql: ${sale_price} ;;
    value_format_name: usd
  }
}
```

### training\_ecommerce.model.lkml

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

datagroup: daily_datagroup {
  sql_trigger: SELECT FORMAT_TIMESTAMP('%F',
    CURRENT_TIMESTAMP(), 'America/Los_Angeles') ;;
  max_cache_age: "24 hours"
}

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
}

explore: incremental_pdt {}


explore: +order_items {
  label: "Order Items - Aggregate Sales"
  aggregate_table: aggregate_sales {
    query: {
      dimensions: [order_items.created_date, users.state]
      measures: [order_items.average_sale_price,
        order_items.total_revenue]
    }
    materialization: {
      datagroup_trigger: daily_datagroup
      increment_key: "created_date"
      increment_offset: 3
    }
  }
}

explore: aggregated_orders {
  from: order_items
  label: "Aggregated Sales"
  join: users {
    type: left_outer
    sql_on: ${aggregated_orders.user_id} = ${users.id} ;;
    relationship: many_to_one
  }
  aggregate_table: aggregate_sales {
    query: {
      dimensions: [aggregated_orders.created_date,
        users.state]
      measures: [aggregated_orders.average_sale_price,
        aggregated_orders.total_revenue]
    }
    materialization: {
      datagroup_trigger: daily_datagroup
      increment_key: "created_date"
      increment_offset: 3
    }
  }
}
```