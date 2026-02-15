---
title: "Configure Secure CORS for Cloud Storage (Solution)"
seoTitle: "Configure Secure CORS for Cloud Storage (Solution)"
seoDescription: "Learn how to securely configure CORS for Google Cloud Storage to enable cross-origin requests from specific web applications"
datePublished: Sun Feb 15 2026 06:43:01 GMT+0000 (Coordinated Universal Time)
cuid: cmlndpesn000102l107tk9upj
slug: configure-secure-cors-for-cloud-storage-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771137568478/654a3b67-ec48-4b07-9454-d547bde59ee3.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1771137743971/341674ea-6641-44fa-8d84-6b69f8539d88.png
tags: configure-secure-cors-for-cloud-storage, configure-secure-cors-for-cloud-storage-solution

---

# Configure Secure CORS for Cloud Storage

experimentLabschedule10 minutesuniversal\_currency\_altNo costshow\_chartIntroductory

infoThis lab may incorporate AI tools to support your learning.

Lab instructions and tasks

* [**Overview**](https://www.skills.google/games/7028/labs/43703#step1)
    
* [**Challenge scenario**](https://www.skills.google/games/7028/labs/43703#step2)
    
* [**Congratulations!**](https://www.skills.google/games/7028/labs/43703#step3)
    

![Google Cloud self-paced labs logo](https://cdn.qwiklabs.com/dW94pPHsWo4RxbyHDUVE7oyXDZS3QNm40RnYsQ9Mf2o%3D align="left")

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

Your company which is into scientific research utilizes a Google Cloud Storage bucket for public data dissemination. A research partner of yours needs to access this data within their web application [http://example.com](http://example.com/) but faces cross-origin access errors.

Configure secure CORS on the created bucket, specifically permitting GET requests from (http://example.com), adhering to least privilege.

Click **Check my progress** to verify the objective.

Configure secure CORS on the created bucket.

---

## Solution of Lab

%[https://youtu.be/AgbAjpY7J5o] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/configure-secure-cors-for-cloud-storage-solution/lab.sh
source lab.sh
```

**Script Alternative**

```apache
echo '[{"origin":["http://example.com"],"method":["GET"],"responseHeader":["Content-Type"],"maxAgeSeconds":3600}]' > cors.json
gcloud storage buckets update gs://$(gcloud config get-value project)-bucket --cors-file=cors.json
```