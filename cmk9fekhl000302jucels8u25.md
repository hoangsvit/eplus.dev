---
title: "Configure Cloud Storage Bucket for Website Hosting using gsutil (Solution)"
seoTitle: "Configure Cloud Storage Bucket for Website Hosting using gsutil"
seoDescription: "Learn to configure a Google Cloud Storage bucket for static website hosting using gsutil commands. Make your content publicly accessible"
datePublished: Sun Jan 11 2026 07:42:06 GMT+0000 (Coordinated Universal Time)
cuid: cmk9fekhl000302jucels8u25
slug: configure-cloud-storage-bucket-for-website-hosting-using-gsutil-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768117070535/a71b6478-b17a-4f05-bcaf-58c0c430b7ee.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1768117092714/63823a8e-f95f-41a6-bcb4-4527b1df3f23.png
tags: configure-cloud-storage-bucket-for-website-hosting-using-gsutil-solution, website-hosting-using-gsutil, configure-cloud-storage-bucket-for-website-hosting-using-gsutil

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

* You have an existing Cloud Storage bucket named `qwiklabs-gcp-01-92c132ab20c5-bucket` that contains the following files necessary for a simple static website:
    
    * index.html (The main landing page)
        
    * error.html (Custom error page)
        
    * style.css
        
    * logo.jpg
        
* Currently, the bucket is not configured for website hosting. Your task is to update the configuration to make this website publicly accessible.
    
* As of now, there is no need to create a load balancer or CDN to redirect the request to the cloud storage bucket.
    

Click **Check my progress** to verify the objective.

Configure a bucket for website hosting

---

## Solution of Lab

%[https://youtu.be/ks54SJBeVqk] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/configure-cloud-storage-bucket-for-website-hosting-using-gsutil/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1768715481245/c49aadb5-6916-4a26-ae77-07fa41a522ae.png align="center")