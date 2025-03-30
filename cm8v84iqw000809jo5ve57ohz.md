---
title: "mini lab : BigQuery : 5 (Solution)"
seoTitle: "mini lab : BigQuery : 5 (Solution)"
seoDescription: "Labs are timed and cannot be paused. The timer starts when you click Start Lab.

The included cloud terminal is preconfigured with the gcloud SDK."
datePublished: Sun Mar 30 2025 05:52:48 GMT+0000 (Coordinated Universal Time)
cuid: cm8v84iqw000809jo5ve57ohz
slug: mini-lab-bigquery-5-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743313888553/2c84e07a-abcf-44ba-a8f5-db3f14cfca7f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1743313953965/036a12ac-25fd-47df-9d7f-4399114a2d14.png
tags: mini-lab-bigquery-5-solution, mini-lab-bigquery-5

---

## **Overview**

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## **Challenge scenario**

You want to export the data that contains the specific information and store it in the cloud storage bucket. You have a csv file (customers.csv) locally that contains customer information. Also, a cloud storage bucket (`qwiklabs-gcp-03-5d04c7d56ebb`\-bucket), bigquery dataset `customer_details` and a table `customers` are available to you. The precreated bucket already has the `customers.csv` file.

You need to complete the following tasks:

1. Load the schema from the local CSV file `customers.csv` into the customers table.
    

Click **Check my progress** to verify the objective.

Load the schema from local 'customers.csv' file into the customers table.

Check my progress

2. Create a new table named `male_customers` from the existing customers table that contains only the rows where the gender column is "Male" as well as the customer ID.
    

Click **Check my progress** to verify the objective.

Create a 'male\_customers' table from the existing 'customers' table.

Check my progress

3. Export the newly created `male_customers` table to an existing Google Cloud Storage bucket in CSV format as `exported_male_customers.csv` file.
    

Click **Check my progress** to verify the objective.

Export the 'male\_customers' table to an existing Google Cloud Storage bucket.

---

## Solution of Lab

%[https://youtu.be/7nSSBSQled0] 

```apache
curl -LO https://raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/mini%20lab%20BigQuery%205/shell.sh
sudo chmod +x *.sh
./*.sh
```