---
title: "BigQuery: Qwik Start - Command Line - GSP071"
seoTitle: "BigQuery: Qwik Start - Command Line - GSP071"
seoDescription: "Storing and querying massive datasets can be time consuming and expensive without the right hardware and infrastructure. BigQuery is a serverless, highly sc"
datePublished: Sun May 18 2025 07:59:09 GMT+0000 (Coordinated Universal Time)
cuid: cmatd7reh000h09jsgjql6biy
slug: bigquery-qwik-start-command-line-gsp071
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747555107812/c31048e3-951b-415f-b4e2-e2abfd549ca7.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747555135964/086168b1-3b82-4f5b-9a1a-1fdb84d7e0dd.png
tags: bigquery-qwik-start-command-line-gsp071, bigquery-qwik-start, command-line-gsp071, gsp071, bigquery-qwik-start-command-line

---

## Overview

Storing and querying massive datasets can be time consuming and expensive without the right hardware and infrastructure. BigQuery is a serverless, highly scalable [cloud data warehouse](https://cloud.google.com/solutions/bigquery-data-warehouse) that solves this problem by enabling super-fast SQL queries using the processing power of Google's infrastructure. Simply move your data into BigQuery and let us handle the hard work. You can control access to both the project and your data based on your business needs, such as giving others the ability to view or query your data.

You can access BigQuery by using the [Console](https://cloud.google.com/bigquery/docs/quickstarts/quickstart-web-ui), [Web UI](https://console.cloud.google.com/bigquery?utm_source=bqui&utm_medium=link&utm_campaign=classic&project=cloud-solutions-group) or a [command-line tool](https://cloud.google.com/bigquery/docs/cli_tool) using a variety of [client libraries](https://cloud.google.com/bigquery/docs/reference/libraries) such as Java, .NET, or Python. There are also a variety of [solution providers](https://cloud.google.com/bigquery/providers) that you can use to interact with BigQuery.

This hands-on lab shows you how to use `bq`, the python-based command line tool for BigQuery, to query public tables and load sample data into BigQuery.

### What you'll do

* Query a public dataset
    
* Create a new dataset
    
* Load data into a new table
    
* Query a custom table
    

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
    student-04-b62487cbf83a@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    joJj6MdDutoJ
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

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-ed6daac966c2`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-ed6daac966c2
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-b62487cbf83a@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```plaintext
[core]
project = qwiklabs-gcp-01-ed6daac966c2
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Examine a table

BigQuery offers a number of [sample tables](https://cloud.google.com/bigquery/public-data#sample_tables) that you can run queries against. In this lab, you'll run queries against the `shakespeare` table, which contains an entry for every word in every play.

To examine the schema of the Shakespeare table in the samples dataset, run:

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

2. To see a list of all of the commands `bq` uses, run just `bq help`.
    

## Task 3. Run a query

Now you'll run a query to see how many times the substring "raisin" appears in Shakespeare's works.

1. To run a query, run the command `bq query "[SQL_STATEMENT]"`:
    

* Escape any quotation marks inside the \[SQL\_STATEMENT\] with a \\ mark, or
    
* Use a different quotation mark type than the surrounding marks ("versus").
    

2. Run the following standard SQL query in Cloud Shell to count the number of times that the substring "raisin" appears in all of Shakespeare's works:
    

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

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully run a query against a public dataset, you will see an assessment score.

Run a query (dataset: samples, table: shakespeare, substring: raisin)

**Check my progress**

If you search for a word that isn't in Shakespeare's works, no results are returned.

* Run the following search for "huzzah", returns no matches:
    

```apache
bq query --use_legacy_sql=false \
'SELECT
   word
 FROM
   `bigquery-public-data`.samples.shakespeare
 WHERE
   word = "huzzah"'
```

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully run a query against a public dataset, you will see an assessment score.

Run a query (dataset: samples, table: shakespeare, substring: huzzah)

**Check my progress**

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

Now create a dataset. A dataset name can be up to 1,024 characters long, and consist of A-Z, a-z, 0-9, and the underscore, but it cannot start with a number or underscore, or have spaces.

3. Use the `bq mk` command to create a new dataset named `babynames` in your project:
    

```apache
bq mk babynames
```

Sample output:

```apache
Dataset 'qwiklabs-gcp-ba3466847fe3cec0:babynames' successfully created.
```

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a BigQuery dataset named babynames, you will see an assessment score.

Create a new dataset (name: babynames)

**Check my progress**

* Run `bq ls` to confirm that the dataset now appears as part of your project:
    

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

1. Run this command to add the [baby names zip file](https://www.ssa.gov/OACT/babynames/names.zip) to your project, using the URL for the data file:
    

```apache
wget http://www.ssa.gov/OACT/babynames/names.zip
```

2. List the file:
    

```apache
ls
```

You can see the name of the file added to your project.

3. Now unzip the file:
    

```apache
unzip names.zip
```

4. That's a pretty big list of text files! List the files again:
    

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

5. Create your table:
    

```apache
bq load babynames.names2010 yob2010.txt name:string,gender:string,count:integer
```

Sample output:

```apache
Waiting on job_4f0c0878f6184119abfdae05f5194e65 ... (35s) Current status: DONE
```

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully loaded data into a dataset table, you will see an assessment score.

Load the data into a new table

**Check my progress**

1. Run `bq ls` and `babynames` to confirm that the table now appears in your dataset:
    

```apache
bq ls babynames
```

Output:

```apache
  tableId    Type
 ----------- -------
  names2010   TABLE
```

2. Run `bq show` and your `dataset.table` to see the schema:
    

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

**Note:** By default, when you load data, BigQuery expects UTF-8 encoded data. If you have data that is in ISO-8859-1 (or Latin-1) encoding and are having problems with your loaded data, you can tell BigQuery to treat your data as Latin-1 explicitly, using the `-E` flag. Learn more about Character Encodings from the [Introduction to loading data guide](https://cloud.google.com/bigquery/docs/loading-data).

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

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully a against a custom dataset, you will see an assessment score.

Run queries against your dataset table

**Check my progress**

## Task 6. Test your Understanding

Below are multiple choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

**You can access BigQuery using:**

* GStreamerCommand line tool
    
* GLib
    
* BigQuery REST API
    
* Web UI
    

**Which CLI tool is used to interact with BigQuery service?**

* bq
    
* gsutil
    
* compute
    
* gcloud
    

## Task 7. Clean up

1. Run the `bq rm` command to remove the `babynames` dataset with the `-r` flag to delete all tables in the dataset:
    

```apache
bq rm -r babynames
```

2. Confirm the delete command by typing `Y`.
    

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully removed babynames dataset, you will see an assessment score.

Remove the babynames dataset

**Check my progress**

---

## Solution of Lab

%[https://youtu.be/5Yhaw0ze3zc] 

```apache
curl -LO https://raw.githubusercontent.com/ArcadeCrew/Google-Cloud-Labs/refs/heads/main/BigQuery%20Qwik%20Start%20-%20Command%20Line/arcadecrew.sh
sudo chmod +x arcadecrew.sh
./arcadecrew.sh
```