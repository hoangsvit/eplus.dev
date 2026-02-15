---
title: "Developer Essentials: Google Cloud Storage Static Website Hosting - gem-cloud-storage-host-static-site"
seoTitle: "Developer Essentials: Google Cloud Storage Static Website Hosting"
seoDescription: "Learn to host a static website using Google Cloud Storage with step-by-step instructions for setup, configuration, and deployment"
datePublished: Sun Feb 15 2026 08:29:02 GMT+0000 (Coordinated Universal Time)
cuid: cmlnhhqiw000302l8f9470fyw
slug: developer-essentials-google-cloud-storage-static-website-hosting-gem-cloud-storage-host-static-site-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771144084079/ad077cb8-4cce-4289-ab8b-e8d23c29168a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1771144056696/9d92e335-0e68-4e79-893e-2bd607b2a669.png
tags: developer-essentials-google-cloud-storage-static-website-hosting-gem-cloud-storage-host-static-site, gem-cloud-storage-host-static-site

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
gcloud config set project qwiklabs-gcp-02-e5754c0fd87b
```



**Note:**  
Sets the active project in the Cloud SDK.

2. Create a GCS bucket.
    

```apache
gcloud storage buckets create gs://qwiklabs-gcp-02-e5754c0fd87b-website --uniform-bucket-level-access
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
gcloud storage cp index.html gs://qwiklabs-gcp-02-e5754c0fd87b-website
```



**Note:**  
Copies the index.html file to the GCS bucket.

## Task 3. Configure Bucket for Website Hosting

Configure the GCS bucket to serve your static website.

1. Enable website configuration on the bucket.
    

```apache
gcloud storage buckets update gs://qwiklabs-gcp-02-e5754c0fd87b-website --web-main-suffix=index.html
```



**Note:**  
Sets index.html as the default index page for the bucket.

2. Make the bucket objects publicly readable.
    

```apache
gcloud storage buckets add-iam-policy-binding gs://qwiklabs-gcp-02-e5754c0fd87b-website --member=allUsers --role=roles/storage.objectViewer
```



**Note:**  
Grants public read access to objects in the bucket.

## Task 4. Access Your Website

Access your hosted static website via the GCS bucket's URL.

1. Get the public URL of your website.
    

```apache
echo "https://storage.googleapis.com/qwiklabs-gcp-02-e5754c0fd87b-website/index.html"
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
gcloud storage rm -r gs://qwiklabs-gcp-02-e5754c0fd87b-website 
```

**Note:**  
Deletes the GCS bucket.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=-NjQp5Y8J8I] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1771144004563/49c67b2e-3208-4e80-82b1-2e36ad8d92de.png align="center")