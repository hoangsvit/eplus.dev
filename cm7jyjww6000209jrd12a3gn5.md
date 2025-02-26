---
title: "mini lab : BigQuery : 3 (Solution)"
seoTitle: "mini lab : BigQuery : 3 (Solution)"
seoDescription: "Labs are timed and cannot be paused. The timer starts when you click Start Lab.

The included cloud terminal is preconfigured with the gcloud SDK."
datePublished: Tue Feb 25 2025 03:59:39 GMT+0000 (Coordinated Universal Time)
cuid: cm7jyjww6000209jrd12a3gn5
slug: mini-lab-bigquery-3-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740455821367/e723a4c8-1aaa-45ab-bd5d-c6505cf94719.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740455964619/7c58f19a-336d-4f82-9259-602c14f72490.png
tags: mini-lab-bigquery-3-solution, mini-lab-bigquery-3

---

## **Overview**

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

You are a data engineer and you are managing Google BigQuery, a data warehouse service that lets you store, manage, and analyze large datasets.

In this scenario, you have a pre-created dataset Google Cloud Platform. You are also provided the two tables with detailed schema and entries.

Your goal is to execute the query to select records that have matching values in both tables by using the fields from both tables. Once you have the data, save the results in a view with the name "Product\_View".

* You need to complete the following tasks:
    
    * Check the tables schemas and data that is created inside the **Inventory** Dataset.
        
    * Run the query to fetch the **product\_name** and **price** after applying the `INNER_JOIN` on the products and category table where **category\_id** = 1.
        
* You should see a similar output:
    
    ```apache
    |__product_name__   | __price__  |
    | -------------     | -----------|
    | Fitness Tracker   |    80.0    |
    | Portable Monitor  |   200.0    |
    | Smartphone        |   800.0    |
    | Smartwatch        |   250.0    |
    | Fitness Smartwatch|   150.0    |
    | Monitor           |   300.0    |
    | Tablet            |   600.0    |
    | Laptop            |   1200.0   |
    ```
    

Click **Check my progress** to verify the objective.

Run query

Check my progress

* After executing the query, Save it as a VIEW named as: **Product\_View**.
    

Click **Check my progress** to verify the objective.

Create a view and store the query

---

## Solution of Lab

%[https://youtu.be/2XDfy0s7kzw] 

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>Error in mini lab : BigQuery : 3</strong></div>
</div>

---

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/mini%20lab%20%3A%20BigQuery%20%3A%203/lab.sh
sudo chmod +x lab.sh
./lab.sh
```