---
title: "Configure Cloud CDN for Storage using gcloud (Solution)"
seoTitle: "Configure Cloud CDN for Storage using gcloud (Solution)"
seoDescription: "Learn to configure Cloud CDN with gcloud for improved performance of globally accessed news platform's static content"
datePublished: Sun Feb 15 2026 06:56:29 GMT+0000 (Coordinated Universal Time)
cuid: cmlne6qdw000902juekoih8bk
slug: configure-cloud-cdn-for-storage-using-gcloud-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771138769570/132a803b-c823-4467-af8e-bf67bbdb0f19.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1771138783745/53a7b4d6-aa95-41f7-9aba-8346aaee361a.png
tags: configure-cloud-cdn-for-storage-using-gcloud-solution, configure-cloud-cdn-for-storage-using-gcloud

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

You're the cloud architect for a news network, which is rapidly growing as an online news platform. The website serves a massive amount of static content (images, videos, articles) to a global audience. You've noticed that page load times are increasing, especially for users in regions far from your cloud storage bucket in the pre-selected region. Create a Cloud CDN configuration to cache the site’s static content that is hosted on the pre-created Cloud Storage bucket.

Click **Check my progress** to verify the objective.

Create a Cloud CDN configuration to cache the site’s static content.

---

## Solution of Lab

%[https://youtu.be/VPwleeJam3Y] 

```powershell
#!/bin/bash
set -euo pipefail

# ============================================================
# Cloud CDN + HTTP Load Balancer for a pre-created GCS bucket
# Then request (curl) a file via CDN/LB to complete the lab.
# ============================================================

# -----------------------------
# 1) Detect the pre-created bucket
# -----------------------------
BUCKET_NAME="$(gsutil ls -b | head -n 1 | sed 's#gs://##; s#/*$##')"
if [[ -z "${BUCKET_NAME}" ]]; then
  echo "ERROR: No Cloud Storage bucket found in this project."
  exit 1
fi
echo "Using bucket: gs://${BUCKET_NAME}"

# -----------------------------
# 2) Pick a test object from the bucket
#    (any static file is fine; the first object is enough)
# -----------------------------
OBJECT_PATH="$(gsutil ls "gs://${BUCKET_NAME}/**" 2>/dev/null | head -n 1 | sed "s#gs://${BUCKET_NAME}/##")"
if [[ -z "${OBJECT_PATH}" ]]; then
  echo "ERROR: Bucket gs://${BUCKET_NAME} has no objects to request with curl."
  exit 1
fi
echo "Test object path: ${OBJECT_PATH}"

# -----------------------------
# 3) Resource names (idempotent)
# -----------------------------
BACKEND_BUCKET="static-backend-bucket"
URL_MAP="cdn-map"
PROXY="cdn-http-proxy"
FORWARDING_RULE="cdn-http-rule"

# -----------------------------
# 4) Create Cloud CDN backend bucket
# -----------------------------
if ! gcloud compute backend-buckets describe "$BACKEND_BUCKET" >/dev/null 2>&1; then
  echo "Creating backend bucket with Cloud CDN enabled..."
  gcloud -q compute backend-buckets create "$BACKEND_BUCKET" \
    --gcs-bucket-name="$BUCKET_NAME" \
    --enable-cdn
else
  echo "Backend bucket already exists: $BACKEND_BUCKET"
fi

# -----------------------------
# 5) Create URL map
# -----------------------------
if ! gcloud compute url-maps describe "$URL_MAP" >/dev/null 2>&1; then
  echo "Creating URL map..."
  gcloud -q compute url-maps create "$URL_MAP" \
    --default-backend-bucket="$BACKEND_BUCKET"
else
  echo "URL map already exists: $URL_MAP"
fi

# -----------------------------
# 6) Create target HTTP proxy
# -----------------------------
if ! gcloud compute target-http-proxies describe "$PROXY" >/dev/null 2>&1; then
  echo "Creating target HTTP proxy..."
  gcloud -q compute target-http-proxies create "$PROXY" \
    --url-map="$URL_MAP"
else
  echo "Target HTTP proxy already exists: $PROXY"
fi

# -----------------------------
# 7) Create global forwarding rule on port 80
# -----------------------------
if ! gcloud compute forwarding-rules describe "$FORWARDING_RULE" --global >/dev/null 2>&1; then
  echo "Creating global forwarding rule..."
  gcloud -q compute forwarding-rules create "$FORWARDING_RULE" \
    --global \
    --target-http-proxy="$PROXY" \
    --ports=80
else
  echo "Forwarding rule already exists: $FORWARDING_RULE"
fi

# -----------------------------
# 8) Get LB IP and request a file via CDN using curl
# -----------------------------
IP_ADDRESS="$(gcloud compute forwarding-rules describe "$FORWARDING_RULE" --global --format="value(IPAddress)")"
if [[ -z "${IP_ADDRESS}" ]]; then
  echo "ERROR: Could not determine forwarding rule IP address."
  exit 1
fi

echo "Load Balancer IP: ${IP_ADDRESS}"
echo "Requesting file via CDN/LB with curl:"
echo "URL: http://${IP_ADDRESS}/${OBJECT_PATH}"
echo

# Use -I to fetch headers only (fast), or remove -I to download the full file.
curl -I "http://${IP_ADDRESS}/${OBJECT_PATH}"

echo
echo "DONE. Now click 'Check my progress' in the lab."
```