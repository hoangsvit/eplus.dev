---
title: "Export Data from BigQuery to Cloud Storage"
seoTitle: "Export Data from BigQuery to Cloud Storage"
seoDescription: "Guide to export BigQuery data to Cloud Storage via terminal commands, including CSV file management and table creation tasks"
datePublished: Thu Sep 04 2025 03:39:19 GMT+0000 (Coordinated Universal Time)
cuid: cmf4uxgio000b02ihhno30pzw
slug: export-data-from-bigquery-to-cloud-storage
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756957116157/df505817-dcce-4112-8303-759cc6ebfddc.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756957141977/6661a17d-bcba-4ebc-a42e-d46bb7cdf374.png
tags: bigquery, cloud-storage, export-data-from-bigquery-to-cloud-storage

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

You want to export the data that contains the specific information and store it in the cloud storage bucket. You have a csv file (customers.csv) locally that contains customer information. Also, a cloud storage bucket (`qwiklabs-gcp-04-58870faf67f8`\-bucket), bigquery dataset `customer_details` and a table `customers` are available to you. The precreated bucket already has the `customers.csv` file.

You need to complete the following tasks:

1. Load the schema from the local CSV file `customers.csv` into the customers table.
    

Click **Check my progress** to verify the objective.

Load the schema from local 'customers.csv' file into the customers table.

2. Create a new table named `male_customers` from the existing customers table that contains only the rows where the gender column is "Male" as well as the customer ID.
    

Click **Check my progress** to verify the objective.

Create a 'male\_customers' table from the existing 'customers' table.

3. Export the newly created `male_customers` table to an existing Google Cloud Storage bucket in CSV format as `exported_male_customers.csv` file.
    

Click **Check my progress** to verify the objective.

Export the 'male\_customers' table to an existing Google Cloud Storage bucket.

---

## Solution of Lab

%[https://youtu.be/Bb1VoSyCMYc] 

```apache
bq load --source_format=CSV --autodetect customer_details.customers customers.csv
```

```apache
bq query --use_legacy_sql=false --destination_table customer_details.male_customers 'SELECT CustomerID, Gender FROM customer_details.customers WHERE Gender="Male"'
```

---

```apache
PROJECT_ID=$(gcloud config get-value project)
bq extract customer_details.male_customers gs://${PROJECT_ID}-bucket/exported_male_customers.csv
```

```apache
bq query --use_legacy_sql=false --replace --destination_table=customer_details.male_customers 'SELECT CustomerID, Gender FROM customer_details.customers WHERE Gender = "Male"'
```