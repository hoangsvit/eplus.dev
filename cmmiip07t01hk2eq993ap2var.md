---
title: "Data Ingestion into BigQuery from Cloud Storage (Solution)"
seoTitle: "Data Ingestion into BigQuery from Cloud Storage (Solution)"
seoDescription: "You are managing Google BigQuery, a data warehouse service that lets you store, manage, and analyze large datasets. In this scenario, you need to crea"
datePublished: 2026-03-09T01:43:32.444Z
cuid: cmmiip07t01hk2eq993ap2var
slug: data-ingestion-into-bigquery-from-cloud-storage-solution
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/eaed3581-da95-4da5-898c-3a583e1cb7d0.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/855353ac-3e80-4bad-ba7d-dcacce0a01c4.png
tags: data-ingestion-into-bigquery-from-cloud-storage, data-ingestion-into-bigquery-from-cloud-storage-solution

---

## **Overview**

*   Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
*   The included cloud terminal is preconfigured with the gcloud SDK.
    
*   Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## **Challenge scenario**

You are managing Google BigQuery, a data warehouse service that lets you store, manage, and analyze large datasets. In this scenario, you need to create a dataset and a table within BigQuery to store employee details. The dataset will act as a container for your tables, while the table will hold the actual employee information.

*   You need to complete the following tasks:
    
    *   Create a big query dataset: `work_day`
        
    *   Create a table with `employee` the following schema details:
        
        | **column** | **Type** |
        | --- | --- |
        | employee\_id | INTEGER |
        | device\_id | STRING |
        | username | STRING |
        | department | STRING |
        | office | STRING |
        
    *   Import the csv data in your newly created table from pre-created cloud storage bucket named as `qwiklabs-gcp-02-a85ba8626654-a1f8-bucket`. The precreated bucket already has `employees.csv` file.
        

Click **Check my progress** to verify the objective.

Create BigQuery Schema and upload csv data

* * *

## Solution of Lab

```plaintext

curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/build-an-ai-science-tutor-application-with-vertex-ai-solution/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
export BUCKET=
```

```plaintext
bq mk work_day && bq load --source_format=CSV --skip_leading_rows=1 work_day.employee gs://$BUCKET/employees.csv employee_id:INTEGER,device_id:STRING,username:STRING,department:STRING,office:STRING
```