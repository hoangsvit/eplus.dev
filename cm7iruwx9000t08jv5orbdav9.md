---
title: "mini lab : BigQuery : 4 (Solution)"
seoTitle: "mini lab : BigQuery : 4 (Solution)"
seoDescription: "Labs are timed and cannot be paused. The timer starts when you click Start Lab.

The included cloud terminal is preconfigured with the gcloud SDK.

Use the "
datePublished: Mon Feb 24 2025 08:04:29 GMT+0000 (Coordinated Universal Time)
cuid: cm7iruwx9000t08jv5orbdav9
slug: mini-lab-bigquery-4-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740384233748/bf93b7a5-30d7-494a-9dbe-552257982094.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740384247781/e30315ef-f2c9-4266-ace9-68aa0a89ad5f.png
tags: mini-lab-bigquery-4-solution, mini-lab-bigquery-4

---

## **Overview**

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## **Challenge scenario**

You are working in a global e-commerce platform company with a vast product catalog. The e-commerce platform stores product information, including SKU, name, orderedQuantity, stockLevel, and restockingLeadTime, in a structured database. Data is indexed periodically to ensure up-to-date information for users. Enable fast and accurate product search capabilities to enhance user experience and drive sales.

Your task is to:

* Upload the csv data in your table from pre-created cloud storage bucket named as `qwiklabs-gcp-04-5b00a52ff738-bucket`. The precreated bucket already has csv file.
    
* Create a search index on the `products_information` table for all the columns.
    
* Run a query to search across all columns of the `products_information` table for the value `22 oz Water Bottle` product and returns the rows that contain this value using `SEARCH` method.
    

Click **Check my progress** to verify the objective.

Verify that the data is fetched using the SEARCH function.

Check my progress

---

## Solution of Lab

```apache
export PROJECT_ID=$(gcloud config get-value project)
export REGION=$(gcloud compute project-info describe --format="value(commonInstanceMetadata.items[google-compute-default-region])")
```

```apache
export BUCKET_NAME=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1740384178441/76257d9d-34ee-41bb-9606-ba29fbcf32a4.png align="center")

```apache
bq load --source_format=CSV --autodetect products.products_information gs://$BUCKET_NAME/products.csv 
bq query --use_legacy_sql=false "CREATE SEARCH INDEX IF NOT EXISTS products.p_i_search_index ON products.products_information (ALL COLUMNS);"
bq query --use_legacy_sql=false "SELECT * FROM products.products_information WHERE SEARCH(STRUCT(), '22 oz Water Bottle') = TRUE;"
```