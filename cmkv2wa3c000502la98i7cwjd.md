---
title: "Data Ingestion into BigQuery from Cloud Storage (Solution)"
seoTitle: "Data Ingestion into BigQuery from Cloud Storage"
seoDescription: "Learn how to create a BigQuery dataset and table, and import CSV data from Cloud Storage. Perfect for managing large datasets"
datePublished: Mon Jan 26 2026 11:22:53 GMT+0000 (Coordinated Universal Time)
cuid: cmkv2wa3c000502la98i7cwjd
slug: data-ingestion-into-bigquery-from-cloud-storage
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769424224058/868ca0ad-b80f-4a61-af00-49c11626ca2c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1769424154977/6e4f7da4-c3e5-40c0-85c0-6347c77cd649.png
tags: bigquery, cloud-storage, data-ingestion-into-bigquery-from-cloud-storage, data-ingestion-into-bigquery-from-cloud-storage-solution

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

You are managing Google BigQuery, a data warehouse service that lets you store, manage, and analyze large datasets. In this scenario, you need to create a dataset and a table within BigQuery to store employee details. The dataset will act as a container for your tables, while the table will hold the actual employee information.

* You need to complete the following tasks:
    
    * Create a big query dataset: `Dataset_name_filled_after_lab_start`
        
    * Create a table with `Table_name_filled_after_lab_start` the following schema details:
        
        | **column** | **Type** |
        | --- | --- |
        | employee\_id | INTEGER |
        | device\_id | STRING |
        | username | STRING |
        | department | STRING |
        | office | STRING |
        
    * Import the csv data in your newly created table from pre-created cloud storage bucket named as `bucket_name_filled_after_lab_start`. The precreated bucket already has `employees.csv` file.
        

Click **Check my progress** to verify the objective.

Create BigQuery Schema and upload csv data

---

## Solution of Lab

%[https://youtu.be/b_7NZpw9PVE] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1769428021862/4b49fb22-f9b8-4fbc-8469-bfbed8d1b80b.png align="center")

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/data-ingestion-into-bigquery-from-cloud-storage/lab.sh
source lab.sh
```

**Script Alternative**

```apache
bq mk work_day && bq load --source_format=CSV --skip_leading_rows=1 work_day.employee gs://qwiklabs-gcp-01-235725ab6f2a-gp06-bucket/employees.csv employee_id:INTEGER,device_id:STRING,username:STRING,department:STRING,office:STRING
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1769423927130/e79f482d-de9a-4cb7-96d4-2608a6ee17bc.png align="center")