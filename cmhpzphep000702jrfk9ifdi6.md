---
title: "bq for Google BigQuery (Solution)"
seoTitle: "bq for Google BigQuery (Solution)"
seoDescription: "Learn to use the bq command-line tool for Google BigQuery to query public datasets, create tables, and manage data effectively"
datePublished: Sat Nov 08 2025 07:55:39 GMT+0000 (Coordinated Universal Time)
cuid: cmhpzphep000702jrfk9ifdi6
slug: bq-for-google-bigquery-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762587594700/4417a701-86d1-4f83-8c94-2ef70a8ba607.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1762588522159/7a2241b3-2e78-489a-a6c1-2bc9f68ee6a0.png
tags: bq-for-google-bigquery-solution, bq-for-google-bigquery

---

## Overview

Storing and querying massive datasets can be time consuming and expensive without the right hardware and infrastructure. BigQuery is a serverless, highly scalable [cloud data warehouse](https://cloud.google.com/solutions/bigquery-data-warehouse) that solves this problem by enabling super-fast SQL queries using the processing power of Google's infrastructure. Simply move your data into BigQuery and let Google Cloud handle the hard work. You can control access to both the project and your data based on your business needs, such as giving others the ability to view or query your data.

You can access BigQuery by using the [Console](https://cloud.google.com/bigquery/docs/quickstarts/quickstart-web-ui),[Web UI](https://console.cloud.google.com/bigquery?utm_source=bqui&utm_medium=link&utm_campaign=classic&project=cloud-solutions-group) or a [command-line tool](https://cloud.google.com/bigquery/docs/cli_tool) using a variety of [client libraries](https://cloud.google.com/bigquery/docs/reference/libraries) such as Java, .NET, or Python. There are also a variety of [solution providers](https://cloud.google.com/bigquery/providers) that you can use to interact with BigQuery.

### What you'll learn to do

This hands-on lab shows you how to use `bq`, the python-based command line tool for BigQuery, to query public tables and load sample data into BigQuery.

* Query a public dataset
    
* Create a new dataset
    
* Load data into a new table
    
* Query a custom table
    

## Setup and requirements

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Task 1. Examine a table

BigQuery offers a number of [sample tables](https://cloud.google.com/bigquery/public-data#sample_tables) that you can run queries against. In this lab, you'll run queries against the `shakespeare` table, which contains an entry for every word in every play.

* To examine the schema of the Shakespeare table in the samples dataset, run the following command in cloud terminal:
    

```apache
bq show bigquery-public-data:samples.shakespeare
```



In this command you're doing the following:

* `bq` to invoke the BigQuery command line tool
    
* `show` is the action
    
* Then you're listing the name of the `project:public dataset.table` in BigQuery that you want to see.
    

Output:

```apache
   Last modified                  Schema                 Total Rows   Total Bytes   Expiration   Time Partitioning   Clustered Fields   Labels
 ----------------- ------------------------------------ ------------ ------------- ------------ ------------------- ------------------ --------
  14 Mar 13:16:45   |- word: string (required)           164656       6432064
                    |- word_count: integer (required)
                    |- corpus: string (required)
                    |- corpus_date: integer (required)
```

## Task 2. Run the help command

When you include a command name with the help commands, you get information about that specific command.

1. For example, the following call to `bq help` retrieves information about the `query` command:
    

```apache
bq help query
```



2. To see a list of all of the commands `bq` uses, just `bq help`.
    

## Task 3. Run a query

Now you'll run a query to see how many times the substring **raisin** appears in Shakespeare's works.

1. To run a query, run the command `bq query "[SQL_STATEMENT]"`:
    
    * Escape any quotation marks inside the \[SQL\_STATEMENT\] with a \\ mark, or
        
    * Use a different quotation mark type than the surrounding marks ("versus").
        
2. Run the following standard SQL query in Cloud terminal to count the number of times that the substring **raisin** appears in all of Shakespeare's works:
    

```apache
bq query --use_legacy_sql=false \
'SELECT
   word,
   SUM(word_count) AS count
 FROM
   `bigquery-public-data`.samples.shakespeare
 WHERE
   word LIKE "%raisin%"
 GROUP BY
   word'
```



In this command:

* `--use_legacy_sql=false` makes standard SQL the default query syntax.
    

Output:

```apache
Waiting on job_e19 ... (0s) Current status: DONE
+---------------+-------+
|     word      | count |
+---------------+-------+
| praising      |     8 |
| Praising      |     4 |
| raising       |     5 |
| dispraising   |     2 |
| dispraisingly |     1 |
| raisins       |     1 |
```

The table demonstrates that although the actual word **raisin** doesn't appear, the letters appear in order in several of Shakespeare's works.

Click **Check my progress** to verify the objective.

Run a query (dataset: samples, table: shakespeare, substring: raisin)

If you search for a word that isn't in Shakespeare's works, no results are returned.

3. Run the following search for **huzzah**, which returns no matches:
    

```apache
bq query --use_legacy_sql=false \
'SELECT
   word
 FROM
   `bigquery-public-data`.samples.shakespeare
 WHERE
   word = "huzzah"'
```



Click **Check my progress** to verify the objective.

Run a query (dataset: samples, table: shakespeare, substring: huzzah)

## Task 4. Create a new table

Now create your own table. Every table is stored inside a dataset. A *dataset* is a group of resources, such as tables and views.

### Create a new dataset

1. Use the `bq ls` command to list any existing datasets in your project:
    

```apache
bq ls
```



You will be brought back to the command line since there aren't any datasets in your project yet.

2. Run `bq ls` and the `bigquery-public-data` Project ID to list the datasets in that specific project, followed by a colon (:):
    

```apache
bq ls bigquery-public-data:
```



Output:

```apache
           datasetId
 -----------------------------
  austin_311
  austin_bikeshare
  austin_crime
  austin_incidents
  austin_waste
  baseball
  bitcoin_blockchain
  bls
  census_bureau_construction
  census_bureau_international
  census_bureau_usa
  census_utility
  chicago_crime
  ...
```

Next, create a dataset. A dataset name can be up to 1,024 characters long, and consist of A-Z, a-z, 0-9, and the underscore, but it cannot start with a number or underscore, or have spaces.

3. Use the `bq mk` command to create a new dataset named `babynames` in your project:
    

```apache
bq mk babynames
```



Sample output:

```apache
Dataset 'qwiklabs-xxx-xx-xxxxxxxxxxxx:babynames' successfully created..
```

Click **Check my progress** to verify the objective.

Create a new dataset (name: babynames)

4. Run `bq ls` to confirm that the dataset now appears as part of your project:
    

```apache
bq ls
```



Sample output:

```apache
 datasetId
 -------------
 babynames
```

### Upload the dataset

Before you can build the table, you need to add the dataset to your project. The custom data file you'll use contains approximately 7 MB of data about popular baby names, provided by the US Social Security Administration.

5. Run this command to add the [baby names zip file](https://www.ssa.gov/OACT/babynames/names.zip) to your project, using the URL for the data file:
    

```apache
wget http://www.ssa.gov/OACT/babynames/names.zip
```



6. List the file:
    

```apache
ls
```



See the name of the file added to your project.

7. Now unzip the file:
    

```apache
unzip names.zip
```



8. That's a pretty big list of text files! List the files again:
    

```apache
ls
```



The `bq load` command creates or updates a table and loads data in a single step.

You will use the `bq load` command to load your source file into a new table called names2010 in the babynames dataset you just created. By default, this runs synchronously, and will take a few seconds to complete.

The `bq load` arguments you'll be running are:

```apache
datasetID: babynames
tableID: names2010
source: yob2010.txt
schema: name:string,gender:string,count:integer
```

9. Create your table:
    

```apache
bq load babynames.names2010 yob2010.txt name:string,gender:string,count:integer
```



Sample output:

```apache
Waiting on job_4f0c0878f6184119abfdae05f5194e65 ... (35s) Current status: DONE
```

Click **Check my progress** to verify the objective.

Load the data into a new table

10. Run `bq ls` and `babynames` to confirm that the table now appears in your dataset:
    

```apache
bq ls babynames
```



Output:

```apache
  tableId    Type
 ----------- -------
  names2010   TABLE
```

11. Run `bq show` and your `dataset.table` to see the schema:
    

```apache
bq show babynames.names2010
```



Output:

```apache
   Last modified         Schema         Total Rows   Total Bytes     Expiration      Time Partitioning   Clustered Fields   Labels
 ----------------- ------------------- ------------ ------------- ----------------- ------------------- ------------------ --------
  13 Aug 14:37:34   |- name: string     34073        654482        12 Oct 14:37:34
                    |- gender: string
                    |- count: integer
```

By default, when you load data, BigQuery expects UTF-8 encoded data. If you have data that is in ISO-8859-1 (or Latin-1) encoding and are having problems with your loaded data, you can tell BigQuery to treat your data as Latin-1 explicitly, using the **\-E** flag. Learn more about Character Encodings from the [Introduction to loading data guide](https://cloud.google.com/bigquery/docs/loading-data).

## Task 5. Run queries

Now you're ready to query the data and return some interesting results.

1. Run the following command to return the top 5 most popular girls names:
    

```apache
bq query "SELECT name,count FROM babynames.names2010 WHERE gender = 'F' ORDER BY count DESC LIMIT 5"
```



Output:

```apache
Waiting on job_58c0f5ca52764ef1902eba611b71c651 ... (0s) Current status: DONE
+----------+-------+
|   name   | count |
+----------+-------+
| Isabella | 22913 |
| Sophia   | 20643 |
| Emma     | 17345 |
| Olivia   | 17028 |
| Ava      | 15433 |
+----------+-------+
```

2. Run the following command to see the top 5 most unusual boys names:
    

```apache
bq query "SELECT name,count FROM babynames.names2010 WHERE gender = 'M' ORDER BY count ASC LIMIT 5"
```



**Note:** The minimum count is 5 because the source data omits names with fewer than 5 occurrences.

Output:

```apache
Waiting on job_556ba2e5aad340a7b2818c3e3280b7a3 ... (1s) Current status: DONE
+----------+-------+
|   name   | count |
+----------+-------+
| Aaqib    |     5 |
| Aaidan   |     5 |
| Aadhavan |     5 |
| Aarian   |     5 |
| Aamarion |     5 |
+----------+-------+
```

Click **Check my progress** to verify the objective.

Run queries against your dataset table

## Task 6. Clean up

1. Run the `bq rm` command to remove the `babynames` dataset with the `-r` flag to delete all tables in the dataset:
    

```apache
bq rm -r babynames
```



2. Confirm the delete command by typing `Y`.
    

Click **Check my progress** to verify the objective.

Remove the babynames dataset

---

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/bq-for-google-bigquery/lab.sh
source lab.sh
```

---

### Manual

%[https://youtu.be/55sag5SQxFw]