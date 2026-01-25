---
title: "Manage Rendering for Cloud Storage Website Hosting (Solution)"
seoTitle: "Manage Rendering for Cloud Storage Website Hosting (Solution)"
seoDescription: "Configure Cloud Storage bucket for website hosting by updating object metadata for direct browser access instead of download prompts"
datePublished: Sun Jan 25 2026 07:53:02 GMT+0000 (Coordinated Universal Time)
cuid: cmktfykbh000002lagzsc4v8j
slug: manage-rendering-for-cloud-storage-website-hosting-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769327042829/754be7b2-9db0-40a1-a011-6a84b34ce710.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1769327292657/f69127ba-62eb-49ae-bd61-a692ea9ce6f3.png
tags: manage-rendering-for-cloud-storage-website-hosting-solution, manage-rendering-for-cloud-storage-website-hosting

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

* You have an existing Cloud Storage bucket named `qwiklabs-gcp-03-45b585bc78cb-bucket` for static website hosting. It contains the necessary files:
    
    * index.html
        
    * style.css
        
    * logo.jpg
        
* Currently, the objects in the bucket are not configured for website hosting. Your task is to update the content type of the object so that instead of prompting you to download the index.html file of the website, it will get accessible in the browser.
    

Click **Check my progress** to verify the objective.

Update the object metadata for website hosting

---

## Solution of Lab

%[https://youtu.be/4B-lWNow2oA] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/manage-rendering-for-cloud-storage-website-hosting/lab.sh
source lab.sh
```

**Script Alternative**

```apache

PROJECT=$(gcloud config get-value project) && BUCKET="qwiklabs-gcp-03-479c3001b85e-bucket" && gsutil setmeta -h "Content-Type:text/html" gs://${BUCKET}/index.html && gsutil setmeta -h "Content-Type:text/css" gs://${BUCKET}/style.css && gsutil setmeta -h "Content-Type:image/jpeg" gs://${BUCKET}/logo.jpg && gsutil web set -m index.html -e 404.html gs://${BUCKET} && gsutil iam ch allUsers:objectViewer gs://${BUCKET}
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1769327137805/3245d81f-5273-496f-b798-9140a90e415e.png align="center")