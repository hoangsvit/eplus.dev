---
title: "mini lab : BigQuery : 6 (Solution)"
seoTitle: "mini lab : BigQuery : 6 (Solution)"
seoDescription: "Labs are timed and cannot be paused. The timer starts when you click Start Lab.

The included cloud terminal is preconfigured with the gcloud SDK."
datePublished: Sun Mar 30 2025 05:46:40 GMT+0000 (Coordinated Universal Time)
cuid: cm8v7wn3w000909jpbt8rbtop
slug: mini-lab-bigquery-6-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743313550940/3b708368-63a9-4bdd-923e-64f13558a5b9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1743313577950/713cc4ca-b686-4a7c-bd25-cc0eac83563c.png
tags: mini-lab-bigquery-6-solution, mini-lab-bigquery-6

---

## **Overview**

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## **Challenge scenario**

* You're responsible for managing customer data in BigQuery. To ensure data protection and maintain historical backups, you need to automate the process of creating a copy of the customer table at regular intervals.
    
* Your objective is to construct a scheduled query on a monthly basis within Bigquery to backup data of the `Table1_name_filled_after_lab_start` table into a `Backup_table_name_filled_after_lab_start` table.
    
    * **Dataset:** `dataset_name_filled_after_lab_start`
        
    * **Table name:** `Table1_name_filled_after_lab_start`
        
    * **Backup Table name:** `Table2_name_filled_after_lab_start`
        

Click **Check my progress** to verify the objective.

Schedule query within Bigquery

---

## Solution of Lab

%[https://www.youtube.com/watch?v=3C1cwrmRSos] 

```apache
curl -LO https://raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/mini%20lab%20BigQuery%206/shell.sh
sudo chmod +x *.sh
./*.sh
```

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>It will work if u wait for <mark>2-3 mins</mark></strong></div>
</div>