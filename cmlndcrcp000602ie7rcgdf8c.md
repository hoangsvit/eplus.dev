---
title: "Secure a Public Storage Bucket - gcloud (Solution)"
seoTitle: "Secure a Public Storage Bucket - gcloud (Solution)"
seoDescription: "Secure your public storage bucket using gcloud. Follow the steps to ensure your media archive remains private"
datePublished: Sun Feb 15 2026 06:33:11 GMT+0000 (Coordinated Universal Time)
cuid: cmlndcrcp000602ie7rcgdf8c
slug: secure-a-public-storage-bucket-gcloud-solution-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771137134087/64858228-e9a4-4fae-a9ce-ccc9eb59bd2d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1771137145622/fae4134c-51d3-430c-8b96-f5b7fa23ad43.png
tags: secure-a-public-storage-bucket-gcloud-solution, secure-a-public-storage-bucket-gcloud

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

* You're a cloud architect for a media company. A critical video archive bucket named `qwiklabs-gcp-00-6372eb9e6b50`\-urgent has mistakenly been made public. Your task is to quickly secure it in the provided time frame.
    

Click **Check my progress** to verify the objective.

Please prevent the public access from your bucket folder and make it private. If already done so, please wait for a while for the changes to get propagated.

Make the media archive folder private.

*Please prevent the public access from your bucket folder and make it private. If already done so, please wait for a while for the changes to get propagated.*

---

## Solution of Lab

%[https://youtu.be/jO8dnodJ2a4] 

```apache
PROJECT_ID=$(gcloud config get-value project)
gsutil iam ch -d allUsers:objectViewer gs://$PROJECT_ID-urgent && gsutil iam get gs://$PROJECT_ID-urgent
```