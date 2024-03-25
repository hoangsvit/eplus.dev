---
title: "Accelerating Analytical Queries using the AlloyDB Columnar Engine"
seoTitle: "Accelerating Analytical Queries using the AlloyDB Columnar Engine"
seoDescription: "AlloyDB for PostgreSQL is a fully managed PostgreSQL-compatible database service for your most demanding enterprise database workloads. AlloyDB combines the"
datePublished: Mon Mar 25 2024 15:47:03 GMT+0000 (Coordinated Universal Time)
cuid: clu74fjnk000408jwhv41brsj
slug: accelerating-analytical-queries-using-the-alloydb-columnar-engine
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1711381541177/2af0ccd9-b854-4590-8af4-c96fefac9e97.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1711381607778/3d96cb2c-99b3-4b44-9039-2b914469300d.png
tags: postgresql, alloydb, accelerating-analytical

---

## **Overview**

AlloyDB for PostgreSQL is a fully managed PostgreSQL-compatible database service for your most demanding enterprise database workloads. AlloyDB combines the best of Google with one of the most popular open-source database engines, PostgreSQL, for superior performance, scale, and availability.

The Columnar Engine can significantly accelerate the speed at which AlloyDB processes SQL scans, joins, and aggregates. The Columnar Engine provides the following features: 1) a column store that contains table data for selected columns, reorganized into a column-oriented format and 2) a columnar query planner and execution engine to support use of the column store in queries.

In this lab you will explore features of the AlloyDB Columnar Engine.

## **Task 1. Create Baseline Dataset for Testing the Columnar Engine**

1. An AlloyDB cluster and instance were provisioned when you started the lab. On the Cloud Console Navigation menu (), under **Databases** click **AlloyDB for PostgreSQL** then **Clusters** to examine the cluster's details.
    
2. The cluster is named **lab-cluster** and the instance is named **lab-instance**.
    
3. The instance takes a while to be fully created and initialized. Please wait until you see a **Status** of **Ready** to proceed.
    
4. Please make note of the **Private IP** address in the instances section. Copy the **Private IP** address to a text file so that you can paste the value in a later step.
    
5. In order to evaluate the capabilities of the Columnar Engine you need a dataset of significant size against which to measure performance. You will utilize the Postgres tool **pgbench** to generate a synthetic dataset to evaluate the Columnar Engine.
    
6. On the **Navigation menu** (), under **Compute Engine** click **VM instances**.
    
7. For the instance named **alloydb-client**, in the **Connect** column, click **SSH** to open a terminal window.
    
8. Set the following environment variable, replacing **ALLOYDB\_ADDRESS** with the Private IP address of the AlloyDB instance.
    

```plaintext
export ALLOYDB=ALLOYDB_ADDRESS
```

9. Run the following command to store the Private IP address of the AlloyDB instance on the AlloyDB client VM so that it will persist throughout the lab.
    

```plaintext
echo $ALLOYDB  > alloydbip.txt 
```

10. The first step of using **pgbench** is to create and populate the sample tables. Run the following command to create a set of four tables. You will be prompted for the **postgres** user's password which is **Change3Me**.
    

The largest table **pgbench\_accounts** will be loaded with 50 million rows. The operation will take just a few minutes.

```apache
pgbench -h $ALLOYDB -U postgres -i -s 500 -F 90 -n postgres
```

Copied!content\_copy

```apache
dropping old tables...
NOTICE:  table "pgbench_accounts" does not exist, skipping
NOTICE:  table "pgbench_branches" does not exist, skipping
NOTICE:  table "pgbench_history" does not exist, skipping
NOTICE:  table "pgbench_tellers" does not exist, skipping
creating tables...
generating data (client-side)...
50000000 of 50000000 tuples (100%) done (elapsed 91.26 s, remaining 0.00 s)
creating primary keys...
done in 167.61 s (drop tables 0.00 s, create tables 0.01 s, client-side generate 93.16 s, primary keys 74.43 s).
```

11. Connect to the **psql** client and run the following query to verify the row count in the **pgbench\_accounts** table. You will be prompted for the **postgres** user's password which is **Change3Me**.
    

```apache
psql -h $ALLOYDB -U postgres
```

Copied!content\_copy

```apache
select count (*) from pgbench_accounts;
```

Copied!content\_copy

```apache
  count   
----------
 50000000
(1 row)
```

12. Click **Check my progress** to verify the objective.
    

---

<mark>Answer</mark>

```apache
export ALLOYDB=10.16.0.2
echo $ALLOYDB  > alloydbip.txt
export PGPASSWORD='Change3Me'
pgbench -h $ALLOYDB -U postgres -i -s 500 -F 90 -n postgres
psql -h $ALLOYDB -U postgres
select count (*) from pgbench_accounts;
```

## **Task 2. Run a Baseline Test**

1. For evaluation purposes you can run a very simple query that performs seq scans and then use explain query plans for that query before and after adding the test table to the Columnar Engine.
    
2. Return to the **alloydb-client** shell. The **psql** client should still be active. If not, reconnect using the instructions in Task 1. Run the following query to turn on timings for all query operations.
    

```apache
\timing on
```

3. Next run the following query to evaluate the run time. This query performs seq scans of the entire **pgbench\_accounts** table. **Note**: This sample query has a limit of 20 returned rows because this is for demonstration purposes.
    

```apache
 SELECT aid, bid, abalance FROM pgbench_accounts WHERE bid < 189  OR  abalance > 100 LIMIT 20;
```

```apache
 aid | bid | abalance 
-----+-----+----------
   1 |   1 |        0
   2 |   1 |        0
   3 |   1 |        0
   4 |   1 |        0
   5 |   1 |        0
   6 |   1 |        0
   7 |   1 |        0
   8 |   1 |        0
   9 |   1 |        0
  10 |   1 |        0
  11 |   1 |        0
  12 |   1 |        0
  13 |   1 |        0
  14 |   1 |        0
  15 |   1 |        0
  16 |   1 |        0
  17 |   1 |        0
  18 |   1 |        0
  19 |   1 |        0
  20 |   1 |        0
(20 rows)
```

4. Run the following query to generate an explain plan for an unrestricted query. Your values should appear similar to those in the sample output but will vary because of the random nature of data generation.
    

**Note:** You may have to press the **spacebar** to advance through the query explain plan.

```apache
EXPLAIN (ANALYZE,COSTS,SETTINGS,BUFFERS,TIMING,SUMMARY,WAL,VERBOSE)
 SELECT count(*) FROM pgbench_accounts WHERE bid < 189  OR  abalance > 100;
```

```apache
QUERY PLAN                         
                                                   
---------------------------------------------------------------------------------------------------------------
---------------------------------------------------
 Finalize Aggregate  (cost=1242226.53..1242226.54 rows=1 width=8) (actual time=11010.409..11014.083 rows=1 loop
s=1)
   Output: count(*)
   Buffers: shared hit=20921 read=888170
   I/O Timings: read=19536.769
   ->  Gather  (cost=1242226.32..1242226.53 rows=2 width=8) (actual time=11010.398..11014.075 rows=3 loops=1)
         Output: (PARTIAL count(*))
         Workers Planned: 2
         Workers Launched: 2
         Buffers: shared hit=20921 read=888170
         I/O Timings: read=19536.769
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!! Section removed for pasting !!
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                     Filter: ((pgbench_accounts.bid < 189) OR (pgbench_accounts.abalance > 100))
                     Rows Removed by Filter: 10400000
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!! Section removed for pasting !!
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   Buffers: shared hit=6
 Planning Time: 0.117 ms
 Execution Time: 11014.169 ms
(38 rows)
```

5. In the results pay particular attention to the **Planning Time** and **Execution Time** values. In the sample output, the **Planning Time** is 0.117 milliseconds and the **Execution Time** is 11014.169 milliseconds or 11.014 seconds. Your values should appear similar to those in the sample output but will vary because of the random nature of data generation.
    
6. Copy the values for **Planning Time** and **Execution Time** from your run to text file so that you may compare them later with the results after the Columnar Engine is enabled. You may also copy the entire query plan results to a text file.
    
7. Press the **Q** key to close the query plan.
    

## **Task 3. Verify the Database Flag for the Columnar Engine**

1. Next you will examine the Columnar Engine database flag in your instance.
    
2. On the Cloud Console Navigation menu (), under **Databases** click **AlloyDB for PostgreSQL** then **Clusters** to examine the cluster's details.
    
3. In the **Instances in your cluster** section, select the **lab-instance**, and then click **Edit Primary**.
    
4. To add a database flag to your instance, click **Add a database flag**.
    
5. Browse the list of available flags to get a sense of the supported options. Observe the flag **google\_columnar\_engine.enabled** in the list. You **will not** add an additional flag as part of this lab.
    
6. Click **Cancel** to exit the **Edit Primary** instance screen.
    

## **Task 4. Set or Verify a Database Extension for the Columnar Engine**

1. Continuing from the previous section you will setup a database extension to fully enable the Columnar Engine feature for your AlloyDB cluster.
    
2. Unlike configuring a flag, you must connect to your instance via the **psql** client to enable a database extension.
    
3. Return to the **alloydb-client** shell. The **psql** client should still be active. If not, reconnect using the instructions in Task 1.
    
4. Ensure that you are connected to the **postgres** database by running the following query.
    

```apache
\c postgres
```

5. Run the following system query to see details on the extensions enabled in the database.
    

**Note:** Your list of extensions may vary.

```apache
\dx
```

```apache
                             List of installed extensions
          Name          | Version |   Schema   |              Description              
------------------------+---------+------------+---------------------------------------
 google_columnar_engine | 1.0     | public     | Google extension for columnar engine
 google_db_advisor      | 1.0     | public     | Google extension for Database Advisor
 hypopg                 | 1.3.2   | public     | Hypothetical indexes for PostgreSQL
 plpgsql                | 1.0     | pg_catalog | PL/pgSQL procedural language
(4 rows)
```

6. If **google\_columnar\_engine** appears in the list, skip to the next task (Task 5). If **google\_columnar\_engine** does not appear in the list run the following command.
    

```apache
CREATE EXTENSION IF NOT EXISTS google_columnar_engine;
```

7. Run the extension query again to confirm that the **google\_columnar\_engine** extension is enabled.
    

```apache
\dx
```

## **Task 5. Testing the Columnar Engine**

1. Because your main table ( **pgbench\_accounts**) is relatively small, you can add it directly to the Columnar Engine for evaluation. In a real-life deployment you would utilize the Columnar Engine's recommendation framework to automatically identify the most heavily used columns across all tables that would provide the most benefit from being managed by the engine.
    
2. Return to the **alloydb-client** shell. Run the following query to add **pgbench\_accounts** to the columnar engine. The query should take a few minutes to complete.
    

```apache
SELECT google_columnar_engine_add('pgbench_accounts');
```

3. Next run the same explain plan query you did earlier to see the affects of the Columnar Engine. Your values should appear similar to those in the sample output but will vary because of the random nature of data generation.
    

```apache
EXPLAIN (ANALYZE,COSTS,SETTINGS,BUFFERS,TIMING,SUMMARY,WAL,VERBOSE)
 SELECT count(*) FROM pgbench_accounts WHERE bid < 189  OR  abalance > 100;
```

```apache
 QUERY PLAN                                                                                       
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Finalize Aggregate  (cost=142400.72..142400.73 rows=1 width=8) (actual time=75.948..78.680 rows=1 loops=1)
   Output: count(*)
   ->  Gather  (cost=142400.51..142400.72 rows=2 width=8) (actual time=71.555..78.667 rows=3 loops=1)
         Output: (PARTIAL count(*))
         Workers Planned: 2
         Workers Launched: 2
         ->  Partial Aggregate  (cost=141400.51..141400.52 rows=1 width=8) (actual time=45.768..45.771 rows=1 loops=3)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Section removed for pasting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                           Rows Removed by Columnar Filter: 10400000
                           Rows Aggregated by Columnar Scan: 4505600
                           Columnar cache search mode: native
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Section removed for pasting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   Buffers: shared hit=22 read=3 dirtied=1
   I/O Timings: read=0.560
 Planning Time: 2.022 ms
 Execution Time: 78.804 ms
(29 rows) 
```

4. In the results pay particular attention to the **Planning Time** and **Execution Time** values. In the Post-Columnar Engine sample, the **Planning Time** is 2.022 milliseconds and the **Execution Time** is 78.804 milliseconds. Your values should appear similar to those in the sample output but will vary because of the random nature of data generation.
    
5. From the samples provided, the difference between the Execution Time Pre-Columnar Engine and Post-Columnar Engine is **10935.365 ms** or **10.9 seconds**. That is a decrease of **141 times**. In the Post-Columnar Engine sample, also note that over **4.5 million** rows were aggregated using a columnar scan rather than the core database engine.
    
6. Click **Check my progress** to verify the objective.