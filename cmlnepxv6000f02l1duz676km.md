---
title: "Configure Cloud Storage Bucket for Website Hosting using gsutil (Solution)"
seoTitle: "Configure Cloud Storage Bucket for Website Hosting using gsutil (Solut"
seoDescription: "Learn how to configure a Google Cloud Storage bucket for static website hosting using gsutil in this step-by-step guide"
datePublished: Sun Feb 15 2026 07:11:26 GMT+0000 (Coordinated Universal Time)
cuid: cmlnepxv6000f02l1duz676km
slug: configure-cloud-storage-bucket-for-website-hosting-using-gsutil-solution-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771139463333/a1a11fbf-c637-4f76-ba07-205d115b0963.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1771139473400/da56b88e-a679-408d-b4aa-0511d1d994f4.png
tags: configure-cloud-storage-bucket-for-website-hosting-using-gsutil-solution, configure-cloud-storage-bucket-for-website-hosting-using-gsutil

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

* You have an existing Cloud Storage bucket named `qwiklabs-gcp-00-8809a1bbfbd0-bucket` that contains the following files necessary for a simple static website:
    
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

%[https://www.youtube.com/watch?v=y-gYQ9Vkec0] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/configure-cloud-storage-bucket-for-website-hosting-using-gsutil-solution/lab.sh
source lab.sh
```

**Script Alternative**

```apache
export BUCKET="$(gsutil ls -b | head -n 1 | sed 's#gs://##; s#/*$##')"
gsutil web set -m index.html -e error.html gs://$BUCKET
gsutil uniformbucketlevelaccess set off gs://$BUCKET
gsutil defacl set public-read gs://$BUCKET
gsutil acl set -a public-read gs://$BUCKET/index.html
gsutil acl set -a public-read gs://$BUCKET/error.html
gsutil acl set -a public-read gs://$BUCKET/style.css
gsutil acl set -a public-read gs://$BUCKET/logo.jpg
```