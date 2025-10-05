---
title: "mini lab : Cloud Storage : 1 (Solution)"
seoTitle: "mini lab : Cloud Storage : 1 (Solution)"
seoDescription: "Configure a Cloud Storage bucket for website hosting in this guided lab, complete with step-by-step instructions and a solution video"
datePublished: Sun Oct 05 2025 06:29:38 GMT+0000 (Coordinated Universal Time)
cuid: cmgdbnw6a000002jl93b94gy3
slug: mini-lab-cloud-storage-1-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759645455927/c12dedd0-f505-4252-a0a9-a6bdceebad44.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759645620946/fb2668e9-e762-427b-9d38-512aa244b7c3.png
tags: cloud-storage, mini-lab-cloud-storage-1-solution, mini-lab-cloud-storage-1

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

* You have an existing Cloud Storage bucket named `qwiklabs-gcp-01-3a0f3f7313e1-bucket` that contains the following files necessary for a simple static website:
    
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

%[https://youtu.be/SNA_geKcqSk] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/mini%20lab%20:%20Cloud%20Storage%20:%201/lab.sh
source lab.sh
```

**Script Alternative**

```apache
export PROJECT=$(gcloud projects list --format="value(PROJECT_ID)")

gcloud storage buckets update gs://$PROJECT-bucket --no-uniform-bucket-level-access

gcloud storage buckets update gs://$PROJECT-bucket --web-main-page-suffix=index.html --web-error-page=error.html

gcloud storage objects update gs://$PROJECT-bucket/index.html --add-acl-grant=entity=AllUsers,role=READER

gcloud storage objects update gs://$PROJECT-bucket/error.html --add-acl-grant=entity=AllUsers,role=READER
```