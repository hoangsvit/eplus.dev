---
title: "Manage Cloud Storage Lifecycle Policy using gsutil (Solution)"
seoTitle: "Manage Cloud Storage Lifecycle Policy using gsutil (Solution)"
seoDescription: "Optimize cloud storage costs using gsutil by implementing a lifecycle management policy to manage active files, archives, and temporary logs"
datePublished: Sun Jan 11 2026 07:50:02 GMT+0000 (Coordinated Universal Time)
cuid: cmk9fos5d000102l11xny3fnu
slug: manage-cloud-storage-lifecycle-policy-using-gsutil-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768117430018/94362f07-1a0d-4c75-816b-e76aafb2d111.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1768117784325/8a1504be-6f8c-4383-adab-59ae7ea06435.png
tags: manage-cloud-storage-lifecycle-policy-using-gsutil-solution, manage-cloud-storage-lifecycle-policy-using-gsutil, manage-cloud-storage-lifecycle-policy

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

You are managing a Cloud Storage bucket named `qwiklabs-gcp-00-69b7a025cab7-bucket`. This bucket serves multiple purposes within your organization and contains a mix of active project files, archived documents, and temporary logs. To optimize storage costs, you need to implement a lifecycle management policy that automatically aligns the storage classes of these files with their access patterns.

* Design a lifecycle management policy with the following objectives:
    
    * **Active Project Files**: Files within the `/projects/active/` folder modified within the **last 30 days** should reside in **Standard** storage for fast access.
        
    * **Archives**: Files within `/archive/` modified within the **last 90 days** should be moved to **Nearline** storage. **After 180 days**, they should transition to **Coldline** storage.
        
    * **Temporary Logs**: Files within `/processing/temp_logs/` should be automatically deleted **after 7 days**.
        

Click **Check my progress** to verify the objective.

---

## Solution of Lab

%[https://youtu.be/h974PWkWYWA]