---
title: "Terraform Essentials: Google Cloud Storage Bucket - gem-terraform-gcs-create"
seoTitle: "Terraform Essentials: Google Cloud Storage Bucket - gem-terraform-gcs-"
seoDescription: "Learn to create a Google Cloud Storage bucket using Terraform with this step-by-step guide on configuration, initialization, and verification"
datePublished: Mon Aug 25 2025 01:51:34 GMT+0000 (Coordinated Universal Time)
cuid: cmeqgodfs000002jodruu3j7h
slug: terraform-essentials-google-cloud-storage-bucket-gem-terraform-gcs-create
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756086635837/d218c525-5137-4a5e-9f06-6c49cd424e04.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756086675085/678dd09e-2724-4328-aa95-30cd50123458.png
tags: terraform, terraform-essentials, terraform-essentials-google-cloud-storage-bucket-gem-terraform-gcs-create, terraform-essentials-google-cloud-storage-bucket, gem-terraform-gcs-create, google-cloud-storage-bucket

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

This lab demonstrates how to create a Google Cloud Storage bucket using Terraform. You will define the bucket resource in a Terraform configuration file, initialize Terraform, and apply the configuration to create the bucket in your Google Cloud project. This lab assumes you have a basic familiarity with Google Cloud and Terraform concepts.

## Task 1. Configure Google Cloud SDK

Before you begin, configure the Google Cloud SDK to interact with your Google Cloud project.

1. Set your Project ID: `qwiklabs-gcp-03-313e686c7794`
    
    ```apache
    gcloud config set project qwiklabs-gcp-03-313e686c7794
    ```
    
    **Note:**  
    This command sets your active project.
    
2. Set your default region: `us-east1`
    
    ```apache
    gcloud config set compute/region us-east1
    ```
    
    **Note:**  
    This command sets your active compute region.
    
3. Set your default zone: `us-east1-b`
    
    ```apache
    gcloud config set compute/zone us-east1-b
    ```
    
    **Note:**  
    This command sets your active compute zone.
    

## Task 2. Create Cloud Storage Bucket for Terraform State

Terraform uses a state file to track the resources it manages. For collaboration and persistence, it's best to store this state file in a remote backend like Google Cloud Storage.

1. Create the Cloud Storage bucket:
    
    ```apache
    gcloud storage buckets create gs://qwiklabs-gcp-03-313e686c7794-tf-state --project=qwiklabs-gcp-03-313e686c7794 --location=us-east1 --uniform-bucket-level-access
    ```
    
    **Note:**  
    This command creates a Cloud Storage bucket in the specified region to store the Terraform state file.
    
2. Enable versioning on the GCS bucket:
    
    ```apache
    gsutil versioning set on gs://qwiklabs-gcp-03-313e686c7794-tf-state
    ```
    
    **Note:**  
    This command enables object versioning on the state bucket.
    

## Task 3. Create a Terraform Configuration File

Now, define the Terraform configuration to create the resource.

1. Create a new directory for your Terraform configuration files.
    
    ```apache
    mkdir terraform-gcs && cd $_
    ```
    
    **Note:**  
    This creates a new directory and changes the current directory to it.
    
2. Create `main.tf` with the following content:
    
    ```apache
    terraform {
      required_providers {
        google = {
          source  = "hashicorp/google"
          version = "~> 4.0"
        }
      }
    
      backend "gcs" {
        bucket = "qwiklabs-gcp-03-313e686c7794-tf-state"
        prefix = "terraform/state"
      }
    }
    
    provider "google" {
      project = "qwiklabs-gcp-03-313e686c7794"
      region  = "us-east1"
    }
    
    resource "google_storage_bucket" "default" {
      name          = "qwiklabs-gcp-03-313e686c7794-my-terraform-bucket"
      location      = "us-east1"
      force_destroy = true
    
      storage_class = "STANDARD"
      versioning {
        enabled = true
      }
    }
    ```
    
    **Note:**  
    This configuration defines a Google Cloud Storage bucket in the specified region. This configuration also defines a backend for storing Terraform state in Cloud Storage.
    

## Task 4. Initialize Terraform

Initialize Terraform in the directory containing your `main.tf` file.

1. Run the `terraform init` command:
    
    ```apache
    terraform init
    ```
    
    **Note:**  
    This command initializes Terraform and downloads the necessary provider plugins.
    
2. Plan the changes. This shows you what Terraform will do before it makes any actual changes.
    
    ```apache
    terraform plan
    ```
    
    **Note:**  
    Review the planned changes.
    
3. Run the `terraform apply` command:
    
    ```apache
    terraform apply -auto-approve
    ```
    
    **Note:**  
    This command applies the configuration and creates the resource. The `-auto-approve` flag automatically approves the changes.
    

## Task 5. Verify Bucket Creation

Verify that the bucket was created successfully in your Google Cloud project.

1. Enter the following command to validate the bucket has been created:
    
    ```apache
    gsutil ls gs://qwiklabs-gcp-03-313e686c7794-my-terraform-bucket
    ```
    
    **Note:**  
    Alternatively, you can use the Google Cloud Console, navigate to **Storage &gt; Buckets** and verify the cloud storage bucket is present.
    

## Task 6. Clean Up (Optional)

To avoid incurring unnecessary charges, you can destroy the resources created by Terraform.

1. Run the `terraform destroy` command:
    
    ```apache
    terraform destroy
    ```
    
    **Note:**  
    This command destroys the resources defined in your Terraform configuration. You will be prompted to confirm the action by typing `yes`.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=akC-lkZo2iw] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/gem-terraform-gcs-create/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

**Script alternative**

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Terraform%20Essentials%20Google%20Cloud%20Storage%20Bucket/quicklab.sh
sudo chmod +x quicklab.sh
./quicklab.sh
```