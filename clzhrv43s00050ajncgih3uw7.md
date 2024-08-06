---
title: "Working with JSON, Arrays, and Structs in BigQuery - GSP416"
seoTitle: "Working with JSON, Arrays, and Structs in BigQuery - GSP416"
seoDescription: "BigQuery is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infra"
datePublished: Tue Aug 06 2024 01:59:14 GMT+0000 (Coordinated Universal Time)
cuid: clzhrv43s00050ajncgih3uw7
slug: working-with-json-arrays-and-structs-in-bigquery-gsp416
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722909511755/657ac802-cdf6-4c48-af8e-64b3bafffb26.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722909536132/c6e5aff5-b017-4ef9-b61d-9496fed2f3eb.png
tags: working-with-json-arrays-and-structs-in-bigquery-gsp416, working-with-json-arrays-and-structs-in-bigquery, gsp416

---

## **Overview**

[BigQuery](https://cloud.google.com/bigquery) is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infrastructure to manage or needing a database administrator. BigQuery uses SQL and can take advantage of the pay-as-you-go model. BigQuery allows you to focus on analyzing data to find meaningful insights.

In this lab, you work in-depth with semi-structured data (ingesting JSON, Array data types) inside of BigQuery. Denormalizing your schema into a single table with nested and repeated fields can yield performance improvements, but the SQL syntax for working with array data can be tricky. You will practice loading, querying, troubleshooting, and unnesting various semi-structured datasets.

### **Task 1. Create a new dataset to store the tables**

1. In your BigQuery, click the three dots next to your Project ID and select **Create dataset**:
    

![Create dataset option highlighted](https://cdn.qwiklabs.com/awMyd4%2BGXwp9scoUf57V5uJIczBhRaMzy%2FrOi0EhtxE%3D align="left")

2. Name the new dataset `fruit_store`. Leave the other options at their default values (Data Location, Default Expiration).
    
3. Click **Create dataset**.
    

**Task 2. Practice working with arrays in SQL**

Normally in SQL you will have a single value for each row like this list of fruits below:

| **Row** | **Fruit** |
| --- | --- |
| 1 | raspberry |
| 2 | blackberry |
| 3 | strawberry |
| 4 | cherry |

What if you wanted a list of fruit items for each person at the store? It could look something like this:

| **Row** | **Fruit** | **Person** |
| --- | --- | --- |
| 1 | raspberry | sally |
| 2 | blackberry | sally |
| 3 | strawberry | sally |
| 4 | cherry | sally |
| 5 | orange | frederick |
| 6 | apple | frederick |

In traditional relational database SQL, you would look at the repetition of names and immediately think of splitting the above table into two separate tables: Fruit Items and People. That process is called [normalization](https://en.wikipedia.org/wiki/Database_normalization) (going from one table to many). This is a common approach for transactional databases like mySQL.

For data warehousing, data analysts often go the reverse direction (denormalization) and bring many separate tables into one large reporting table.

What are some potential issues if you stored all your data in one giant table? The table row size could be too large for traditional reporting databases. Any changes to a value (like customer email) could impact many other rows (like all their orders)Data at differing levels of granularity could lead to reporting issues because less granular fields would be repeated. All of the above

**Submit**

Now, you're going to learn a different approach that stores data at different levels of granularity all in one table using repeated fields:

| **Row** | **Fruit (array)** | **Person** |
| --- | --- | --- |
| 1 | raspberry | sally |
| blackberry |  |
| strawberry |  |
| cherry |  |
| 2 | orange | frederick |
| apple |  |

What looks strange about the previous table?

* It's only two rows.
    
* There are multiple field values for Fruit in a single row.
    
* The people are associated with all of the field values.
    

What the key insight? The `array` data type!

An easier way to interpret the Fruit array:

| **Row** | **Fruit (array)** | **Person** |
| --- | --- | --- |
| 1 | \[raspberry, blackberry, strawberry, cherry\] | sally |
| 2 | \[orange, apple\] | frederick |

Both of these tables are exactly the same. There are two key learnings here:

* An array is simply a list of items in brackets \[ \]
    
* BigQuery visually displays arrays as *flattened*. It simply lists the value in the array vertically (note that all of those values still belong to a single row)
    

Try it yourself.

1. Enter the following in the BigQuery Query Editor:
    

```sql
#standardSQL
SELECT ['raspberry', 'blackberry', 'strawberry', 'cherry'] AS fruit_array
```

2. Click **Run**.
    
3. Now try executing this one:
    

```sql
#standardSQL
SELECT ['raspberry', 'blackberry', 'strawberry', 'cherry', 1234567] AS fruit_array
```

You should get an error that looks like the following:

**Error:** `Array elements of types {INT64, STRING} do not have a common supertype at [3:1]`

Why did you get this error?Data in an array must only be stringsData in an array cannot exceed 4 elementsData in an array \[ \] must all be the same type

**Submit**

Arrays can only share one data type (all strings, all numbers).

4. Here's the final table to query against:
    

```sql
#standardSQL
SELECT person, fruit_array, total_cost FROM `data-to-insights.advanced.fruit_store`;
```

5. Click **Run**.
    
6. After viewing the results, click the **JSON** tab to view the nested structure of the results.
    

![results on the JSON tabbed page](https://cdn.qwiklabs.com/V0j%2FsiBB1RlvfpG6x%2Bl9P6xn5YaSKjcRwasQde5WRTs%3D align="left")

### Loading semi-structured JSON into BigQuery

What if you had a JSON file that you needed to ingest into BigQuery?

Create a new table `fruit_details` in the dataset.

1. Click on `fruit_store` dataset.
    

Now you will see the **Create Table** option.

**Note:** You may have to widen your browser window to see the Create table option.

2. Add the following details for the table:
    

* **Source**: Choose **Google Cloud Storage** in the **Create table from** dropdown.
    
* **Select file from Cloud Storage bucket**: `data-insights-course/labs/optimizing-for-performance/shopping_cart.json`
    
* **File format**: JSONL (Newline delimited JSON)
    

3. Call the new table `fruit_details`.
    
4. Check the checkbox of **Schema (Auto detect)**.
    
5. Click **Create table**.
    

In the schema, note that `fruit_array` is marked as REPEATED which means it's an array.

**Recap**

* BigQuery natively supports arrays
    
* Array values must share a data type
    
* Arrays are called REPEATED fields in BigQuery
    

Click *Check my progress* to verify the objective.

Create a new dataset and table to store our data

**Check my progress**

### **Task 3. Create your own arrays with ARRAY\_AGG()**

Don't have arrays in your tables already? You can create them!

1. **Copy and paste** the below query to explore this public dataset:
    

```sql
SELECT
  fullVisitorId,
  date,
  v2ProductName,
  pageTitle
  FROM `data-to-insights.ecommerce.all_sessions`
WHERE visitId = 1501570398
ORDER BY date
```

2. Click **Run** and view the results.
    

How many rows are returned?702100111

**Submit**

Now, use the `ARRAY_AGG()` function to aggregate our string values into an array.

3. **Copy and paste** the below query to explore this public dataset:
    

```sql
SELECT
  fullVisitorId,
  date,
  ARRAY_AGG(v2ProductName) AS products_viewed,
  ARRAY_AGG(pageTitle) AS pages_viewed
  FROM `data-to-insights.ecommerce.all_sessions`
WHERE visitId = 1501570398
GROUP BY fullVisitorId, date
ORDER BY date
```

4. Click **Run** and view the results
    

How many rows are returned?2 - one for each day63 - one for each day100 - one for each day70 - one for each day

**Submit**

5. Next, use the `ARRAY_LENGTH()` function to count the number of pages and products that were viewed:
    

```sql
SELECT
  fullVisitorId,
  date,
  ARRAY_AGG(v2ProductName) AS products_viewed,
  ARRAY_LENGTH(ARRAY_AGG(v2ProductName)) AS num_products_viewed,
  ARRAY_AGG(pageTitle) AS pages_viewed,
  ARRAY_LENGTH(ARRAY_AGG(pageTitle)) AS num_pages_viewed
  FROM `data-to-insights.ecommerce.all_sessions`
WHERE visitId = 1501570398
GROUP BY fullVisitorId, date
ORDER BY date
```

How many pages were visited by this user on 20170801?701011098

**Submit**

6. Next, deduplicate the pages and products so you can see how many unique products were viewed by adding `DISTINCT` to `ARRAY_AGG()`:
    

```sql
SELECT
  fullVisitorId,
  date,
  ARRAY_AGG(DISTINCT v2ProductName) AS products_viewed,
  ARRAY_LENGTH(ARRAY_AGG(DISTINCT v2ProductName)) AS distinct_products_viewed,
  ARRAY_AGG(DISTINCT pageTitle) AS pages_viewed,
  ARRAY_LENGTH(ARRAY_AGG(DISTINCT pageTitle)) AS distinct_pages_viewed
  FROM `data-to-insights.ecommerce.all_sessions`
WHERE visitId = 1501570398
GROUP BY fullVisitorId, date
ORDER BY date
```

How many DISTINCT pages were visited by this user on 20170801?101109708

**Submit**

Click *Check my progress* to verify the objective.

Execute the query to see how many unique products were viewed

**Check my progress**

**Recap**

You can do some pretty useful things with arrays like:

* finding the number of elements with `ARRAY_LENGTH(<array>)`
    
* deduplicating elements with `ARRAY_AGG(DISTINCT <field>)`
    
* ordering elements with `ARRAY_AGG(<field> ORDER BY <field>)`
    
* limiting `ARRAY_AGG(<field> LIMIT 5)`
    

### **Task 4. Query tables containing arrays**

The BigQuery Public Dataset for Google Analytics `bigquery-public-data.google_analytics_sample` has many more fields and rows than our course dataset `data-to-insights.ecommerce.all_sessions`. More importantly, it already stores field values like products, pages, and transactions natively as ARRAYs.

1. **Copy and paste** the below query to explore the available data and see if you can find fields with repeated values (arrays):
    

```sql
SELECT
  *
FROM `bigquery-public-data.google_analytics_sample.ga_sessions_20170801`
WHERE visitId = 1501570398
```

2. **Run** the query.
    
3. **Scroll right** in the results until you see the `hits.product.v2ProductName` field (multiple field aliases are discussed shortly).
    

You'll note a lot of seemingly 'blank' values in the results as you scroll. Why do you think that is?BigQuery is still loading the data for those fieldsThe fields that appear to be missing data are actually at a higher level of granularity than other fieldsThe dataset is missing data values for those fields

**Submit**

The amount of fields available in the Google Analytics schema can be overwhelming for analysis.

4. Try to query just the visit and page name fields like before:
    

```sql
SELECT
  visitId,
  hits.page.pageTitle
FROM `bigquery-public-data.google_analytics_sample.ga_sessions_20170801`
WHERE visitId = 1501570398
```

You will get an error: **Error:**`Cannot access field page on a value with type ARRAY<STRUCT<hitNumber INT64, time INT64, hour INT64, ...>> at [3:8]`

Before you can query REPEATED fields (arrays) normally, you must first break the arrays back into rows.

For example, the array for `hits.page.pageTitle` is stored currently as a single row like:

```abap
['homepage','product page','checkout']
```

and it needs to be:

```abap
['homepage','product page','checkout']
```

How do you do that with SQL?

**Answer:** Use the UNNEST() function on your array field:

```sql
SELECT DISTINCT
  visitId,
  h.page.pageTitle
FROM `bigquery-public-data.google_analytics_sample.ga_sessions_20170801`,
UNNEST(hits) AS h
WHERE visitId = 1501570398
LIMIT 10
```

We'll cover UNNEST() more in detail later but for now just know that:

* You need to UNNEST() arrays to bring the array elements back into rows
    
* UNNEST() always follows the table name in your FROM clause (think of it conceptually like a pre-joined table)
    

Click *Check my progress* to verify the objective.

Execute the query to use the UNNEST() on array field

**Check my progress**

### **Task 5. Introduction to STRUCTs**

You may have wondered why the field alias `hit.page.pageTitle` looks like three fields in one separated by periods. Just as ARRAY values give you the flexibility to *go deep* into the granularity of your fields, another data type allows you to *go wide* in your schema by grouping related fields together. That SQL data type is the [STRUCT](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types#struct-type) data type.

The easiest way to think about a STRUCT is to consider it conceptually like a separate table that is already pre-joined into your main table.

A STRUCT can have:

* One or many fields in it
    
* The same or different data types for each field
    
* It's own alias
    

Sounds just like a table right?

**Explore a dataset with STRUCTs**

1. To open the **bigquery-public-data** dataset, click **+ADD** and then select **Star a project by name** and enter the name `bigquery-public-data`
    
2. Click **Star**.
    

The `bigquery-public-data` project is listed in the Explorer section.

3. Open **bigquery-public-data**.
    
4. Find and open **google\_analytics\_sample** dataset.
    
5. Click the *ga\_sessions(366)*\_ table.
    
6. Start scrolling through the schema and answer the following question by using the find feature of your browser.
    

In a BigQuery schema, a STRUCT field is noted as a RECORD Type. Search for RECORD in the Google Analytics schema. How many STRUCTs are present in this dataset?151132

**Submit**

What are the names of some of the STRUCT (RECORD Type) fields?TotalsTrafficSourcetrafficSource.adwordsClickInfodeviceAll of the above

**Submit**

How can both TrafficSource and trafficSource.adwordsClickInfo both be STRUCTs?A STRUCT can have another STRUCT as one of its fields (you can nest STRUCTs)They are not STRUCTsBecause they are all ARRAYsThis is an invalid data type

**Submit**

In a BigQuery schema, an ARRAY field is noted as a REPEATED Mode. Search for REPEATED in the Google Analytics schema. How many ARRAYs are present in this dataset?151132

**Submit**

As you can imagine, there is an incredible amount of website session data stored for a modern ecommerce website.

The main advantage of having 32 STRUCTs in a single table is it allows you to run queries like this one without having to do any JOINs:

```sql
SELECT
  visitId,
  totals.*,
  device.*
FROM `bigquery-public-data.google_analytics_sample.ga_sessions_20170801`
WHERE visitId = 1501570398
LIMIT 10
```

**Note:** The `.*` syntax tells BigQuery to return all fields for that STRUCT (much like it would if `totals.*` was a separate table we joined against).

Storing your large reporting tables as STRUCTs (pre-joined "tables") and ARRAYs (deep granularity) allows you to:

* Gain significant performance advantages by avoiding 32 table JOINs
    
* Get granular data from ARRAYs when you need it but not be punished if you don't (BigQuery stores each column individually on disk)
    
* Have all the business context in one table as opposed to worrying about JOIN keys and which tables have the data you need
    

### **Task 6. Practice with STRUCTs and arrays**

The next dataset will be lap times of runners around the track. Each lap will be called a "split".

![Runners on a running track](https://cdn.qwiklabs.com/7SKxQcYHcPl4LFyErCHfGcASWgeQSpH%2FHbtJcGyfAEY%3D align="left")

1. With this query, try out the STRUCT syntax and note the different field types within the struct container:
    

```sql
#standardSQL
SELECT STRUCT("Rudisha" as name, 23.4 as split) as runner
```

| **Row** | **runner.name** | **runner.split** |
| --- | --- | --- |
| 1 | Rudisha | 23.4 |

What do you notice about the field aliases? Since there are fields nested within the struct (name and split are a subset of runner) you end up with a dot notation.

What if the runner has multiple split times for a single race (like time per lap)?

How could you have multiple split times within a single record? Hint: the splits all have the same numeric datatype.Use a SQL UNION to join the race and split detailsStore each split time in a separate STRING field with STRING\_AGG()Store each split time in a separate table called race\_splitsStore each split time as an element in an ARRAY of splits

**Submit**

With an array of course!

2. Run the below query to confirm:
    

```css
#standardSQL
SELECT STRUCT("Rudisha" as name, [23.4, 26.3, 26.4, 26.1] as splits) AS runner
```

| **Row** | **runner.name** | **runner.splits** |
| --- | --- | --- |
| 1 | Rudisha | 23.4 |
| 26.3 |
| 26.4 |
| 26.1 |

To recap:

* Structs are containers that can have multiple field names and data types nested inside.
    
* Arrays can be one of the field types inside of a Struct (as shown above with the splits field).
    

**Practice ingesting JSON data**

1. Create a new dataset titled `racing`.
    
2. Click on `racing` dataset and click Create table.
    

**Note**: You may have to widen your browser window to see the Create table option.

* **Source**: select **Google Cloud Storage** under **Create table from** dropdown.
    
* **Select file from Cloud Storage bucket**: `data-insights-course/labs/optimizing-for-performance/race_results.json`
    
* **File format**: JSONL (Newline delimited JSON)
    
* In **Schema**, click on **Edit as text** slider and add the following:
    

```json
[
    {
        "name": "race",
        "type": "STRING",
        "mode": "NULLABLE"
    },
    {
        "name": "participants",
        "type": "RECORD",
        "mode": "REPEATED",
        "fields": [
            {
                "name": "name",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "splits",
                "type": "FLOAT",
                "mode": "REPEATED"
            }
        ]
    }
]
```

3. Call the new table `race_results`.
    
4. Click **Create table**.
    
5. After the load job is successful, preview the schema for the newly created table:
    

![race_results Schema tabbed page](https://cdn.qwiklabs.com/uS4tIn1NVXc08s%2FVZXp4nll64cbAlYrnAmx6MlMyt1w%3D align="left")

Which field is the STRUCT? How do you know?

The **participants** field is the STRUCT because it is of type RECORD.

Which field is the ARRAY?

The `participants.splits` field is an array of floats inside of the parent `participants` struct. It has a REPEATED Mode which indicates an array. Values of that array are called nested values since they are multiple values inside of a single field.

Click *Check my progress* to verify the objective.

Create a dataset and a table to ingest JSON data

**Check my progress**

### Practice querying nested and repeated fields

1. Let's see all of our racers for the 800 Meter race:
    

```sql
#standardSQL
SELECT * FROM racing.race_results
```

How many rows were returned?

**Answer:** 1

![Query results on the Results tabbed page, with the highlighted row number (1).](https://cdn.qwiklabs.com/8ygOJAxnxJxkoRxOSBabLh0T7%2BIwx%2FaE%2BSK%2F46cYexg%3D align="left")

What if you wanted to list the name of each runner and the type of race?

2. Run the below schema and see what happens:
    

```sql
#standardSQL
SELECT race, participants.name FROM racing.race_results
```

**Error:** `Cannot access field name on a value with type ARRAY<STRUCT<name STRING, splits ARRAY<FLOAT64>>>> at [2:27]`

Much like forgetting to GROUP BY when you use aggregation functions, here there are two different levels of granularity. One row for the race and three rows for the participants names. So how do you change this...

| **Row** | **race** | **participants.name** |
| --- | --- | --- |
| 1 | 800M | Rudisha |
| 2 | ??? | Makhloufi |
| 3 | ??? | Murphy |

...to this:

| **Row** | **race** | **participants.name** |
| --- | --- | --- |
| 1 | 800M | Rudisha |
| 2 | 800M | Makhloufi |
| 3 | 800M | Murphy |

In traditional relational SQL, if you had a races table and a participants table what would you do to get information from both tables? You would JOIN them together. Here the participant STRUCT (which is conceptually very similar to a table) is already part of your races table but is not yet correlated correctly with your non-STRUCT field "race".

Can you think of what two word SQL command you would use to correlate the 800M race with each of the racers in the first table?

**Answer:** CROSS JOIN

Great!

3. Now try running this:
    

```sql
#standardSQL
SELECT race, participants.name
FROM racing.race_results
CROSS JOIN
participants  # this is the STRUCT (it is like a table within a table)
```

`Table name "participants" missing dataset while no default dataset is set in the request`.

Even though the participants STRUCT is like a table, it is still technically a field in the `racing.race_results` table.

4. Add the dataset name to the query:
    

```sql
#standardSQL
SELECT race, participants.name
FROM racing.race_results
CROSS JOIN
race_results.participants # full STRUCT name
```

5. And click **Run**.
    

Wow! You've successfully listed all of the racers for each race!

| **Row** | **race** | **name** |
| --- | --- | --- |
| 1 | 800M | Rudisha |
| 2 | 800M | Makhloufi |
| 3 | 800M | Murphy |
| 4 | 800M | Bosse |
| 5 | 800M | Rotich |
| 6 | 800M | Lewandowski |
| 7 | 800M | Kipketer |
| 8 | 800M | Berian |

6. You can simplify the last query by:
    

* Adding an alias for the original table
    
* Replacing the words "CROSS JOIN" with a comma (a comma implicitly cross joins)
    

This will give you the same query result:

```sql
#standardSQL
SELECT race, participants.name
FROM racing.race_results AS r, r.participants
```

If you have more than one race type (800M, 100M, 200M), wouldn't a CROSS JOIN just associate every racer name with every possible race like a cartesian product?

**Answer**: No. This is a *correlated* cross join which only unpacks the elements associated with a single row. For a greater discussion, see [working with ARRAYs and STRUCTs](https://cloud.google.com/bigquery/docs/reference/standard-sql/arrays#flattening-arrays)

Recap of STRUCTs:

* A SQL [STRUCT](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types#struct-type) is simply a container of other data fields which can be of different data types. The word struct means data structure. Recall the example from earlier: `STRUCT(``"Rudisha" as name, [23.4, 26.3, 26.4, 26.1] as splits``)`` AS runner`
    
* STRUCTs are given an alias (like runner above) and can conceptually be thought of as a table inside of your main table.
    
* STRUCTs (and ARRAYs) must be unpacked before you can operate over their elements. Wrap an UNNEST() around the name of the struct itself or the struct field that is an array in order to unpack and flatten it.
    

### **Task 7. Lab question: STRUCT()**

Answer the below questions using the `racing.race_results` table you created previously.

**Task:** Write a query to COUNT how many racers were there in total.

* To start, use the below partially written query:
    

```sql
#standardSQL
SELECT COUNT(participants.name) AS racer_count
FROM racing.race_results
```

**Note:** Remember you will need to cross join in your struct name as an additional data source after the `FROM`.

Possible solution:

```sql
#standardSQL
SELECT COUNT(p.name) AS racer_count
FROM racing.race_results AS r, UNNEST(r.participants) AS p
```

| **Row** | **racer\_count** |
| --- | --- |
| 1 | 8 |

**Answer:** There were 8 racers who ran the race.

Click *Check my progress* to verify the objective.

Execute the query to COUNT how many racers were there in total

**Check my progress**

### **Task 8. Lab question: Unpacking arrays with UNNEST( )**

Write a query that will list the total race time for racers whose names begin with R. Order the results with the fastest total time first. Use the UNNEST() operator and start with the partially written query below.

* Complete the query:
    

```sql
#standardSQL
SELECT
  p.name,
  SUM(split_times) as total_race_time
FROM racing.race_results AS r, r.participants AS p, p.splits AS split_times
WHERE
GROUP BY
ORDER BY
;
```

**Note:**

* You will need to unpack both the struct and the array within the struct as data sources after your FROM clause.
    
* Be sure to use aliases where appropriate.
    

Possible solution:

```sql
#standardSQL
SELECT
  p.name,
  SUM(split_times) as total_race_time
FROM racing.race_results AS r
, UNNEST(r.participants) AS p
, UNNEST(p.splits) AS split_times
WHERE p.name LIKE 'R%'
GROUP BY p.name
ORDER BY total_race_time ASC;
```

| **Row** | **name** | **total\_race\_time** |
| --- | --- | --- |
| 1 | Rudisha | 102.19999999999999 |
| 2 | Rotich | 103.6 |

Click *Check my progress* to verify the objective.

Execute the query that will list the total race time for racers whose names begin with R

**Check my progress**

### **Task 9. Filter within array values**

You happened to see that the fastest lap time recorded for the 800 M race was 23.2 seconds, but you did not see which runner ran that particular lap. Create a query that returns that result.

* Complete the partially written query:
    

```sql
#standardSQL
SELECT
  p.name,
  split_time
FROM racing.race_results AS r
, r.participants AS p
, p.splits AS split_time
WHERE split_time = ;
```

Possible solution:

```sql
#standardSQL
SELECT
  p.name,
  split_time
FROM racing.race_results AS r
, UNNEST(r.participants) AS p
, UNNEST(p.splits) AS split_time
WHERE split_time = 23.2;
```

| **Row** | **name** | **split\_time** |
| --- | --- | --- |
| 1 | Kipketer | 23.2 |

Click *Check my progress* to verify the objective.

---

### **Solution of Lab**

%[https://www.youtube.com/watch?v=IZUwzQo5tRI] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Working%20with%20JSON%20Arrays%20and%20Structs%20in%20BigQuery/quicklabgsp416.sh
sudo chmod +x quicklabgsp416.sh
./quicklabgsp416.sh
```