---
title: "Cost Optimization and Data Tiering with BigLake and Cloud Storage - GSP267"
seoTitle: "Cost Optimization and Data Tiering with BigLake and Cloud Storage - GS"
seoDescription: "BigQuery is Google's fully managed, NoOps, low cost analytics database. BigQuery uses SQL and can take advantage of the pay-as-you-go model. BigLake is a st"
datePublished: Sat Jan 25 2025 08:02:14 GMT+0000 (Coordinated Universal Time)
cuid: cm6bwkgp5001c09jy5sx27pzv
slug: cost-optimization-and-data-tiering-with-biglake-and-cloud-storage-gsp267
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737791048233/bd5c4b73-585c-4dcd-bc96-d4aaed69cc23.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1737792120223/190047f3-76d5-472f-9723-614a8356a991.png
tags: cost-optimization-and-data-tiering-with-biglake-and-cloud-storage-gsp267, cost-optimization-and-data-tiering-with-biglake-and-cloud-storage, gsp267

---

## **Overview**

BigQuery is Google's fully managed, NoOps, low cost analytics database. BigQuery uses SQL and can take advantage of the pay-as-you-go model. BigLake is a storage engine that provides a unified interface for analytics engines to query multiformat, multicloud, and multimodal data in a secure and governed manner.

In this lab, you will use a real world scenario to learn to how to potentially reduce your costs by archiving data, unused tables, and partitions from BigQuery into Google Cloud Storage.

## **Objectives**

* Export data from BigQuery into Cloud Storage
    
* Create a BigLake table which reads from the data on Cloud Storage
    
* Delete the original table on BigQuery
    

## **Prerequisites**

Completing [Performance and Cost Optimization with BigQuery](https://www.cloudskillsboost.google/catalog_lab/30937) is suggested, but not required.

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

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab details** pane, which is populated with the temporary credentials that are needed for this lab.
    
    ![Lab details pane](https://cdn.qwiklabs.com/X9VIhq30lLh0ABWYXdr4mpMXlHe7E9tI0VX5FmbBw%2Fo%3D align="left")
    
2. Copy the **Password** and then click **Open Google Cloud console**. The lab spins up resources, then opens another tab that shows the **Sign in** page.
    
    **Tip:** Open the tabs in separate windows, side by side.
    
    **Note:** If you see the Choose an account page, click **Use another account.**
    
3. On the **Sign in** page, verify that the username from the **Lab details** pane is auto-filled. Click **Next**.
    
4. Paste the password in the **Enter your password field**. Click **Next**.
    
    **Important:** Use the credentials from the **Lab details** pane. Using your personal Google Cloud account may incur charges to your account.
    
5. Click through the subsequent pages:
    
    * Understand your account management.
        
    * Accept the terms and conditions.
        

After a few moments, the console opens.

**Note:** You can view the menu with a list of Google Cloud products and services by clicking the **Navigation menu** in the top left.

![Google Cloud console menu with the Navigation menu icon highlighted](https://cdn.qwiklabs.com/kE97FtpO7sdrgsE85dTUvzeTyUA3B%2B%2B4lEMji21lHEk%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine (VM) that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. In the Cloud Console, in the top-right toolbar, click the **Activate Cloud Shell** button.
    

![Cloud Shell icon](https://cdn.qwiklabs.com/vdY5e%2Fan9ZGXw5a%2FZMb1agpXhRGozsOadHURcR8thAQ%3D align="left")

2. Click **Continue**.
    

![cloudshell_continue.png](https://cdn.qwiklabs.com/lr3PBRjWIrJ%2BMQnE8kCkOnRQQVgJnWSg4UWk16f0s%2FA%3D align="left")

It takes a few moments to provision and connect to the environment. When you are connected, you are already authenticated, and the project is set to your *PROJECT\_ID*. For example:

![Cloud Shell Terminal](https://cdn.qwiklabs.com/hmMK0W41Txk%2B20bQyuDP9g60vCdBajIS%2B52iI2f4bYk%3D align="left")

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. You can list the active account name with this command:
    

```apache
gcloud auth list
```

**Output:**

```apache
Credentialed accounts:
 - <myaccount>@<mydomain>.com (active)
```

**Example output:**

```apache
Credentialed accounts:
 - google1623327_student@qwiklabs.net
```

4. You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = <project_ID>
```

**Example output:**

```apache
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** For full documentation of `gcloud` see the [gcloud command-line tool overview](https://cloud.google.com/sdk/gcloud).

### Scenario

Cymbal Direct Management has recently noticed a sharp rise in the operating expenses of the company. Upon investigation, it has been inferred that the cost increase was from the Data Analytics Team. The management has instructed the Data Analytics Team to create a cost control plan to monitor spending and ensure that cost reduction measures are implemented effectively by the team.

## **Task 1. Archiving BigQuery table to BigLake**

In this task you will archive a full table to BigLake in a way that is transparent to users.

Your task is to:

* Create a view in BigQuery.
    
* Export data from BigQuery into Cloud Storage.
    
* Build a BigLake connection to Cloud Storage
    
* Create a BigLake table which reads from the data on Cloud Storage.
    
* Update the view to point to the BigLake table and delete the original table on BigQuery storage.
    

The `cymbal_bq_opt_3.top_products_20220801_bigquerystorage` table resides on BigQuery storage.

The table is not used and should be archived. Because of this, to potentially reduce costs you decide to implement *data tiering* which is a technique of moving archive data, called cold data, out of BigQuery storage and onto Cloud Storage.

Before deciding on archiving to Cloud Storage, consider BigQuery long-term storage pricing. If you have a table that is not edited for 90 consecutive days, the price of storage for that table automatically drops by 50 percent. If you have a partitioned table, each partition is considered separately for eligibility for long-term pricing subject to the same rules as non-partitioned tables.

### Create a Google Cloud Storage bucket to host data

Following [this guide](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-gcloud) we can create a Google Cloud Storage bucket.

We chose between [coldline & archive storage](https://cloud.google.com/storage/pricing) as it's cheaper than [bigquery storage](https://cloud.google.com/bigquery/pricing#storage).

One approach is to use the command line, via cloud shell in the Cloud console.

1. Click **Activate Cloud Shell** at the top of the Cloud console.
    
    ![activate_cloud_shell.png](https://cdn.qwiklabs.com/kLWdHG51ST7vtlx15bXw8eGMReyxRRYU4XgH%2FuFoh68%3D align="left")
    

A Cloud Shell session opens inside a new frame at the bottom of the Cloud console and displays a command-line prompt. It can take a few seconds for the session to be initialized.

2. Execute the following snippet to create an environment variable for your Project ID:
    

```apache
export GCP_PROJECT_ID=$(gcloud config list core/project --format="value(core.project)")
```

3. Execute the following command to create a new bucket - notice storage class - to benefit from cost optimization it should be coldline or archive depending on access patterns:
    

```apache
gcloud storage buckets create gs://${GCP_PROJECT_ID}-cymbal-bq-opt-big-lake --project=${GCP_PROJECT_ID} --default-storage-class=COLDLINE --location=us-east4 --uniform-bucket-level-access
```

Navigate to the BigQuery page in the Cloud console to continue the lab.

### Export data to bucket

This can be done in SQL using the `EXPORT DATA`\` command documented in [this guide](https://cloud.google.com/bigquery/docs/exporting-data#exporting_table_data).

1. In the BigQuery, add the following query and click **Run** to export data to a bucket:
    

```sql
EXPORT DATA
 OPTIONS (
   uri = 'gs://qwiklabs-gcp-01-e833081fddb3-cymbal-bq-opt-big-lake/top_products_20220801*',
   format = 'CSV',
   overwrite = true,
   header = true,
   field_delimiter = ';')
AS (
SELECT
  product_name,
  volume_of_product_purchased
FROM
  `cymbal_bq_opt_3.top_products_20220801_bigquerystorage`
);
```

Click **Check my progress** to verify the objective.

Create a Google Cloud Storage bucket to host data

Check my progress

### Create the BigLake table

1. In Cloud Shell, execute the following snippet to create an environment variable for your Project ID:
    

```apache
export GCP_PROJECT_ID=$(gcloud config list core/project --format="value(core.project)")
```

2. Execute the following snippet to create an environment variable for your Project Number:
    

```apache
export GCP_PROJECT_NUM=$(gcloud projects describe $GCP_PROJECT_ID --format="value(projectNumber)")
```

3. Execute the following command to enable the BigQuery Connection API:
    

```apache
gcloud services enable bigqueryconnection.googleapis.com
```

4. Execute the following command to create a connection:
    

```apache
bq mk \
  --connection \
  --location=us-east4 \
  --project_id=${GCP_PROJECT_ID} \
  --connection_type=CLOUD_RESOURCE \
  mybiglakegcsconnector
```

You should see a success message like `Connection [...].mybiglakegcsconnector successfully created` `mybiglakegcsconnector` will be prefixed with actual Project number and the location you specified!

5. Run the following command to view the service account of the connection:
    

```apache
bq show --connection ${GCP_PROJECT_NUM}.us-east4.mybiglakegcsconnector
```

6. Execute the following command to grab and store the service account of this connection from the output:
    

```apache
bq show --connection ${GCP_PROJECT_NUM}.us-east4.mybiglakegcsconnector
export CONNECTION_SA=$(bq show --format=json --connection ${GCP_PROJECT_NUM}.us-east4.mybiglakegcsconnector  | jq ".cloudResource" | jq ".serviceAccountId" |tr -d '"')
```

7. Execute the following command to grant the service account objectViewer role to the Cloud Storage bucket containing the CSV:
    

```apache
gsutil iam ch serviceAccount:${CONNECTION_SA}:objectViewer gs://${GCP_PROJECT_ID}-cymbal-bq-opt-big-lake
```

Click **Check my progress** to verify the objective.

Create a BigQuery Connection

Check my progress

Navigate to the BigQuery page in the Cloud console to continue the lab.

### Create a BigLake table

1. In the BigQuery Editor, paste the following query to create an external table:
    

```sql
CREATE EXTERNAL TABLE
`cymbal_bq_opt_3.top_products_20220801_biglake`
WITH CONNECTION `qwiklabs-gcp-01-e833081fddb3.us-east4.mybiglakegcsconnector`
OPTIONS (
format ="CSV",
field_delimiter = ";",
uris = ['gs://qwiklabs-gcp-01-e833081fddb3-cymbal-bq-opt-big-lake/top_products_20220801*']
);
```

Click **Check my progress** to verify the objective.

Create a BigLake table

Check my progress

2. Execute the following query to test that the view contains all the necessary data:
    

```sql
SELECT
   COUNT(*)
 FROM
   `cymbal_bq_opt_3.top_products_20220801_biglake`;
```

| **Table location** | **number of records** |
| --- | --- |
| BigQuery storage table | 35,681 |
| BigLake table | 35,681 |

This chart shows that all 35,681 rows of the table on BigQuery storage made it to our Google Cloud Storage-based BigLake table.

3. As the table is migrated, you can execute the following command to delete the original table (that uses BigQuery storage):
    

```apache
DROP TABLE `cymbal_bq_opt_3.top_products_20220801_bigquerystorage`;
```

## **Task 2. Move data from BigQuery storage to Google Cloud Storage**

In this task you will offload part of the table to BigLake in a way that is transparent to users.

Your task is to:

* Create original table and create a view on top of it.
    
* Export and delete data from BigQuery into Cloud Storage.
    
* Create a BigLake table which reads from the data on Cloud Storage.
    
* Update the view to point to the BigLake table and BigQuery table.
    

### Create the BigQuery table with a view on top of it

1. In the BigQuery Editor, paste the following query and click **Run** to create a table:
    

```sql
CREATE TABLE
 cymbal_bq_opt_3.orders_with_timestamps_bigquerystorage
PARTITION BY
 orderdate
OPTIONS ( require_partition_filter = TRUE) AS
SELECT
 DATE(order_ts) AS orderdate,
 *
FROM
 `cymbal_bq_opt_1.orders_with_timestamps`;
```

Through analysis, oldest two partitions are marked to be archived. To potentially reduce costs you decide to implement data tiering which is a technique of moving archive data, called cold data, out of BigQuery storage and onto Cloud Storage.

Before deciding on archiving to Google Cloud Storage consider BigQuery long-term storage pricing. If you have a table that is not edited for 90 consecutive days, the price of storage for that table automatically drops by 50 percent. If you have a partitioned table, each partition is considered separately for eligibility for long-term pricing subject to the same rules as non-partitioned tables.

1. Execute the following query to check the record count per day before starting the migration:
    

```sql
SELECT
orderdate,
COUNT(*) as record_count
FROM
`cymbal_bq_opt_3.orders_with_timestamps_bigquerystorage`
WHERE
orderdate IN ("2022-08-01","2022-08-02", "2022-08-03", "2022-08-04")
GROUP BY
orderdate;
```

The result set is shown below. This will be revisited at the end of this migration to check your work.

| **orderdate** | **record\_count** |
| --- | --- |
| 2022-08-01 | 114,036 |
| 2022-08-02 | 114,036 |
| 2022-08-03 | 114,036 |
| 2022-08-04 | 114,036 |

Your tasks are to:

1. Identify the oldest 2 partitions by following [this guide](https://cloud.google.com/bigquery/docs/managing-partitioned-tables#get_partition_metadata).
    
2. Export the specified partitions from BigQuery storage onto GCS following [this guide](https://cloud.google.com/bigquery/docs/managing-partitioned-table-data#export_table_data).
    
3. Create a BigLake table using data on GCS as per this [guide1](https://cloud.google.com/bigquery/docs/query-cloud-storage-using-biglake#create-table-storage) , [guide2](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_external_table_statement) and [guide3](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#external_table_option_list).
    
4. Update the view to combine the two tables so downstream readers have all partitions.
    
5. Test that the view contains all original data so downstream consumers are not affected.
    

### Identify the oldest partitions

1. Execute the following query to identify the oldest two partitions:
    

```sql
SELECT
 table_name,
 partition_id,
 total_rows
FROM
 `cymbal_bq_opt_3.INFORMATION_SCHEMA.PARTITIONS`
WHERE
 partition_id IS NOT NULL
 AND table_name = "orders_with_timestamps_bigquerystorage"
ORDER BY
 partition_id ASC;
```

Partition names take the form of YYYYMMDD.

The two oldest partitions are "20220801" and "20220802"

Each partition has 114,036 rows.

### Export data

When exporting the data from BigQuery to Cloud Storage, a`Hive partition layout` is required. The delineator `order_date`is used as the key per partition.

1. Export the data of the order whose `orderdate` is `"2022-08-01"` by executing the following query.
    

```sql
EXPORT DATA
OPTIONS ( uri = 'gs://qwiklabs-gcp-01-e833081fddb3-cymbal-bq-opt-big-lake/orders/orderdate=2022-08-01/*',
 format = 'CSV',
 overwrite = TRUE,
 header = TRUE,
 field_delimiter = ';') AS (
SELECT
 * EXCEPT (orderdate)
FROM
 `cymbal_bq_opt_3.orders_with_timestamps_bigquerystorage`
WHERE
 orderdate = "2022-08-01" );
```

2. Execute the following query to export the data of the order whose `orderdate` is `"2022-08-01"`.
    

```sql
EXPORT DATA
OPTIONS ( uri = 'gs://qwiklabs-gcp-01-e833081fddb3-cymbal-bq-opt-big-lake/orders/orderdate=2022-08-02/*',
 format = 'CSV',
 overwrite = TRUE,
 header = TRUE,
 field_delimiter = ';') AS (
SELECT
 * EXCEPT (orderdate)
FROM
 `cymbal_bq_opt_3.orders_with_timestamps_bigquerystorage`
WHERE
 orderdate = "2022-08-02" );
```

### Delete exported partition

To delete the exported partition, it is required to use the command line.

1. In Cloud Shell, execute the following commands to delete the exported partition:
    

```apache
bq rm --table ${GCP_PROJECT_ID}:cymbal_bq_opt_3.orders_with_timestamps_bigquerystorage\$20220801

bq rm --table ${GCP_PROJECT_ID}:cymbal_bq_opt_3.orders_with_timestamps_bigquerystorage\$20220802
```

Make sure to enter **"y"** to confirm partition deletion.

Click **Check my progress** to verify the objective.

Export data

Check my progress

Navigate to the BigQuery page in the Cloud console to continue the lab.

### Create the BigLake table and update the view

1. In the BigQuery editor, create a BigLake table by executing the following query:
    

```sql
CREATE EXTERNAL TABLE
 `cymbal_bq_opt_3.orders_with_timestamps_biglake`
WITH PARTITION COLUMNS (orderdate DATE)
WITH CONNECTION `qwiklabs-gcp-01-e833081fddb3.us-east4.mybiglakegcsconnector` OPTIONS (
   format ="CSV",
   field_delimiter = ";",
   uris = ['gs://qwiklabs-gcp-01-e833081fddb3-cymbal-bq-opt-big-lake/orders*'],
   hive_partition_uri_prefix = "gs://qwiklabs-gcp-01-e833081fddb3-cymbal-bq-opt-big-lake/orders",
   require_hive_partition_filter = TRUE );
```

2. Execute the following query to create the view that combines two tables so downstream readers still have access to all partitions if there is need to unarchive data.
    

```sql
CREATE OR REPLACE VIEW
 `cymbal_bq_opt_3.orders_by_day` AS (
 SELECT
   orderdate,
   order_ts,
   days_since_prior_order,
   order_dow,
   order_hour_of_day,
   order_id,
   order_number,
   user_id
 FROM (
   SELECT
     orderdate,
     order_ts,
     days_since_prior_order,
     order_dow,
     order_hour_of_day,
     order_id,
     order_number,
     user_id
   FROM
     `cymbal_bq_opt_3.orders_with_timestamps_bigquerystorage` )
 UNION ALL (
   SELECT
     orderdate,
     order_ts,
     days_since_prior_order,
     order_dow,
     order_hour_of_day,
     order_id,
     order_number,
     user_id
   FROM
     `cymbal_bq_opt_3.orders_with_timestamps_biglake` ) );
```

3. Execute the following query to test that the view has access to all partitions across storage types.
    

```sql
SELECT
orderdate,
COUNT(*) as record_count
FROM
`cymbal_bq_opt_3.orders_by_day`
WHERE
orderdate IN ("2022-08-01","2022-08-02", "2022-08-03", "2022-08-04")
GROUP BY
orderdate;
```

| **orderdate** | **record\_count original view using only BigQuery storage** | **record\_count new view using BigQuery storage & BigLake** |
| --- | --- | --- |
| 2022-08-01 | 114,036 | 114,036 |
| 2022-08-02 | 114,036 | 114,036 |
| 2022-08-03 | 114,036 | 114,036 |
| 2022-08-04 | 114,036 | 114,036 |

This chart shows that you have retained all rows in the original dataset while migrating the underlying storage.

Click **Check my progress** to verify the objective.

Create the BigLake table and update the view

---

## Solution of Lab

%[https://www.youtube.com/watch?v=ceZSOR3-kXc&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Cost%20Optimization%20and%20Data%20Tiering%20with%20BigLake%20and%20Cloud%20Storage/quicklabgsp267.sh
sudo chmod +x quicklabgsp267.sh
./quicklabgsp267.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737791039367/33e9114b-c018-4972-a1a4-a3c1fe73698f.png align="center")