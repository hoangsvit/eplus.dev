---
title: "mini lab : Cloud Storage : 2 (Solution)"
seoTitle: "mini lab : Cloud Storage : 2 (Solution)"
seoDescription: "Implement a cloud storage lifecycle policy to optimize costs by aligning storage classes with file access patterns"
datePublished: Sat Oct 04 2025 05:30:38 GMT+0000 (Coordinated Universal Time)
cuid: cmgbu468z000002ld32raahg9
slug: mini-lab-cloud-storage-2-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759555695353/b1fff028-1f6a-4553-81c0-f9921d5749e1.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759555799806/6728d215-1fcd-46df-ab86-dc8cdb99a741.png
tags: cloud-storage, mini-lab-cloud-storage-2-solution, mini-lab-cloud-storage-2, mini-lab

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

You are managing a Cloud Storage bucket named `BUCKET_NAME`. This bucket serves multiple purposes within your organization and contains a mix of active project files, archived documents, and temporary logs. To optimize storage costs, you need to implement a lifecycle management policy that automatically aligns the storage classes of these files with their access patterns.

* Design a lifecycle management policy with the following objectives:
    
    * **Active Project Files**: Files within the `/projects/active/` folder modified within the **last 30 days** should reside in **Standard** storage for fast access.
        
    * **Archives**: Files within `/archive/` modified within the **last 90 days** should be moved to **Nearline** storage. **After 180 days**, they should transition to **Coldline** storage.
        
    * **Temporary Logs**: Files within `/processing/temp_logs/` should be automatically deleted **after 7 days**.
        

Click **Check my progress** to verify the objective.

Create a lifecycle management policy

---

## Solution of Lab

```bash
cat > lifecycle.json << EOF
{
    "rule": [
      {
        "action": {
          "storageClass": "NEARLINE",
          "type": "SetStorageClass"
        },
        "condition": {
          "daysSinceNoncurrentTime": 30,
          "matchesPrefix": [
            "/projects/active/"
          ]
        }
      },
      {
        "action": {
          "storageClass": "NEARLINE",
          "type": "SetStorageClass"
        },
        "condition": {
          "daysSinceNoncurrentTime": 90,
          "matchesPrefix": [
            "/archive/"
          ]
        }
      },
      {
        "action": {
          "storageClass": "COLDLINE",
          "type": "SetStorageClass"
        },
        "condition": {
          "daysSinceNoncurrentTime": 180,
          "matchesPrefix": [
            "/archive/"
          ]
        }
      },
      {
        "action": {
          "type": "Delete"
        },
        "condition": {
          "age": 7,
          "matchesPrefix": [
            "/processing/temp_logs/"
          ]
        }
      }
    ]
  }
EOF

export PROJECT_ID=$(gcloud config get-value project)

gsutil lifecycle set lifecycle.json gs://$PROJECT_ID-bucket
```