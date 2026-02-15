---
title: "Manage Cloud Storage Lifecycle Policy using gcloud storage (Solution)"
seoTitle: "Manage Cloud Storage Lifecycle Policy using gcloud storage (Solution)"
seoDescription: "Optimize storage costs with gcloud storage by managing Cloud Storage lifecycle policies for active files, archives, and logs"
datePublished: Sun Feb 15 2026 07:23:57 GMT+0000 (Coordinated Universal Time)
cuid: cmlnf61j6000802jmbwncarmp
slug: manage-cloud-storage-lifecycle-policy-using-gcloud-storage-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771140229381/84ce1a20-7057-479c-aaba-4abe5350af95.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1771140225608/2490cff0-6dba-4509-9667-67a51b3b1050.png
tags: manage-cloud-storage-lifecycle-policy-using-gcloud-storage-solution, manage-cloud-storage-lifecycle-policy-using-gcloud-storage

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

You are managing a Cloud Storage bucket named `qwiklabs-gcp-01-cb18e338debe-bucket`. This bucket serves multiple purposes within your organization and contains a mix of active project files, archived documents, and temporary logs. To optimize storage costs, you need to implement a lifecycle management policy that automatically aligns the storage classes of these files with their access patterns.

* Design a lifecycle management policy with the following objectives:
    
    * **Active Project Files**: Files within the `/projects/active/` folder modified within the **last 30 days** should reside in **Standard** storage for fast access.
        
    * **Archives**: Files within `/archive/` modified within the **last 90 days** should be moved to **Nearline** storage. **After 180 days**, they should transition to **Coldline** storage.
        
    * **Temporary Logs**: Files within `/processing/temp_logs/` should be automatically deleted **after 7 days**.
        

Click **Check my progress** to verify the objective.

Create a lifecycle management policy

---

## Solution of Lab

%[https://www.youtube.com/watch?v=jI00HyPDPr4] 

```powershell
# I Know you will Steal it
PROJECT_ID=$(gcloud config get-value project)

cat <<EOF > lifecycle.json
{
  "rule": [
    {
      "action": {
        "type": "SetStorageClass",
        "storageClass": "NEARLINE"
      },
      "condition": {
        "daysSinceNoncurrentTime": 30,
        "matchesPrefix": ["projects/active/"]
      }
    },
    {
      "action": {
        "type": "SetStorageClass",
        "storageClass": "NEARLINE"
      },
      "condition": {
        "daysSinceNoncurrentTime": 90,
        "matchesPrefix": ["archive/"]
      }
    },
    {
      "action": {
        "type": "SetStorageClass",
        "storageClass": "COLDLINE"
      },
      "condition": {
        "daysSinceNoncurrentTime": 180,
        "matchesPrefix": ["archive/"]
      }
    },
    {
      "action": {
        "type": "Delete"
      },
      "condition": {
        "age": 7,
        "matchesPrefix": ["processing/temp_logs/"]
      }
    }
  ]
}
EOF


gsutil lifecycle set lifecycle.json gs://$PROJECT_ID-bucket
```