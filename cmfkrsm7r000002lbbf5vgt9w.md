---
title: "Developer Essentials: Google Cloud Storage Static Website Hosting - gem-cloud-storage-host-static-site"
seoTitle: "Developer Essentials: Google Cloud Storage Static Website Hosting - ge"
seoDescription: "Learn to host static websites using Google Cloud Storage. Set up, configure, and access your site efficiently with this step-by-step guide"
datePublished: Mon Sep 15 2025 06:55:53 GMT+0000 (Coordinated Universal Time)
cuid: cmfkrsm7r000002lbbf5vgt9w
slug: developer-essentials-google-cloud-storage-static-website-hosting-gem-cloud-storage-host-static-site
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757919202691/cdd80402-a4b1-45a5-a79d-34853fb5ec7b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757919330769/a4d4bf0f-14c7-4d83-b1ef-f68152c16c79.png
tags: developer-essentials, developer-essentials-google-cloud-storage-static-website-hosting-gem-cloud-storage-host-static-site, developer-essentials-google-cloud-storage-static-website-hosting, gem-cloud-storage-host-static-site, google-cloud-storage-static-website-hosting

---

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **PROJECT\_ID**. The output contains a line that declares the **PROJECT\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to YOUR_PROJECT_ID
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```


3. Click **Authorize**.
    
4. Your output should now look like this:
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-01-xxxxxxxxxxxx@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```


**Output:**

```apache
[core]
project = <project_ID>
```

**Example output:**

```apache
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Overview

This lab guides you through hosting a static website using Google Cloud Storage (GCS). You'll create a GCS bucket, upload website files, configure the bucket for website hosting, and use Artifact Registry to manage container images. This lab assumes basic familiarity with Google Cloud and command-line operations.

## Task 1. Create a Google Cloud Storage Bucket

Create a GCS bucket to store your website's files.

1. Set your Project ID.
    

```apache
gcloud config set project qwiklabs-gcp-00-0b1af693acbb
```


**Note:**  
Sets the active project in the Cloud SDK.

2. Create a GCS bucket.
    

```apache
gcloud storage buckets create gs://qwiklabs-gcp-00-0b1af693acbb-website --uniform-bucket-level-access
```


**Note:**  
Creates a new GCS bucket with uniform bucket-level access enabled.

## Task 2. Upload Website Files

Upload your website's HTML, CSS, JavaScript, and image files to the GCS bucket.

1. Create a simple `index.html` file.
    

```apache
<html>
<head>
  <title>My Static Website</title>
</head>
<body>
  <p>Hello from Google Cloud Storage!</p>
</body>
</html>
```


**Note:**  
Creates a basic HTML file.

2. Upload the `index.html` file to your bucket.
    

```apache
gcloud storage cp index.html gs://qwiklabs-gcp-00-0b1af693acbb-website
```


**Note:**  
Copies the index.html file to the GCS bucket.

## Task 3. Configure Bucket for Website Hosting

Configure the GCS bucket to serve your static website.

1. Enable website configuration on the bucket.
    

```apache
gcloud storage buckets update gs://qwiklabs-gcp-00-0b1af693acbb-website --web-main-suffix=index.html
```


**Note:**  
Sets index.html as the default index page for the bucket.

2. Make the bucket objects publicly readable.
    

```apache
gcloud storage buckets add-iam-policy-binding gs://qwiklabs-gcp-00-0b1af693acbb-website --member=allUsers --role=roles/storage.objectViewer
```


**Note:**  
Grants public read access to objects in the bucket.

## Task 4. Access Your Website

Access your hosted static website via the GCS bucket's URL.

1. Get the public URL of your website.
    

```apache
echo "https://storage.googleapis.com/qwiklabs-gcp-00-0b1af693acbb-website/index.html"
```


**Note:**  
Prints the URL to access your website.

2. Open the URL in your browser to view your website.
    

```apache
Open the URL in your browser to view your website.
```

**Note:**  
This is not a command, just a text reminder to the user.

## Task 5. Clean Up

Clean up resources to prevent unintended charges

1. Remove the bucket.
    

```apache
gcloud storage rm -r gs://qwiklabs-gcp-00-0b1af693acbb-website 
```


**Note:**  
Deletes the GCS bucket.

---

## Solution of Lab

%[https://youtu.be/_IxxTlGICVM]