---
title: "Terraform Essentials: Service Account - gem-terraform-sa-create"
seoTitle: "Terraform Essentials: Service Account - gem-terraform-sa-create"
seoDescription: "Learn how to create a Google Cloud service account using Terraform, configure projects, and manage Terraform state files effectively"
datePublished: Mon Aug 25 2025 02:16:28 GMT+0000 (Coordinated Universal Time)
cuid: cmeqhkedo000002la2p2f1ix6
slug: terraform-essentials-service-account-gem-terraform-sa-create
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756088036546/81a8e6f0-4022-4dbd-a2aa-eb4ea338ed51.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756088150972/cfd98b7e-cc6b-4942-b51c-54bd66a7f331.png
tags: terraform, terraform-essentials, terraform-essentials-service-account-gem-terraform-sa-create, gem-terraform-sa-create, terraform-essentials-service-account

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

Copied!

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

Copied!

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

This lab demonstrates how to create a Google Cloud service account using HashiCorp Terraform. You will define the necessary resources in a Terraform configuration file, initialize Terraform, and then apply the configuration to create the service account. This lab assumes you have a basic understanding of Google Cloud and Terraform.

## Task 1. Configure Google Cloud Project

Before you begin, configure your Google Cloud project. This includes setting the project ID, region, and zone. Also, enable the IAM API.

1. Set your Project ID: `qwiklabs-gcp-02-2382fe5fa47a`
    
    ```apache
    gcloud config set project qwiklabs-gcp-02-2382fe5fa47a
    ```
    
    Copied!
    
    **Note:**  
    This command sets your active project.
    
2. Set your default region to `us-central1`
    
    ```apache
    gcloud config set compute/region us-central1
    ```
    
    Copied!
    
    **Note:**  
    This command sets your active compute region.
    
3. Set your default zone to `us-central1-c`
    
    ```apache
    gcloud config set compute/zone us-central1-c
    ```
    
    Copied!
    
    **Note:**  
    This command sets your active compute zone.
    
4. Enable the IAM API.
    
    ```apache
    gcloud services enable iam.googleapis.com
    ```
    
    Copied!
    
    **Note:**  
    This command enables the IAM API.
    

## Task 2. Create a Cloud Storage Bucket for Terraform State

Terraform uses a state file to track the resources it manages. For collaboration and persistence, it's best to store this state file in a remote backend like Google Cloud Storage (GCS).

1. Create a Cloud Storage bucket. Ensure the bucket name is globally unique and prefixed with your project ID: `qwiklabs-gcp-02-2382fe5fa47a`
    
    ```apache
    gcloud storage buckets create gs://qwiklabs-gcp-02-2382fe5fa47a-tf-state --project=qwiklabs-gcp-02-2382fe5fa47a --location=us-central1 --uniform-bucket-level-access
    ```
    
    Copied!
    
    **Note:**  
    This command creates a Cloud Storage bucket in the specified region to store the Terraform state file.
    
2. Enable versioning on the GCS bucket:
    
    ```apache
    gsutil versioning set on gs://qwiklabs-gcp-02-2382fe5fa47a-tf-state
    ```
    
    Copied!
    
    **Note:**  
    This enables versioning on the bucket.
    

## Task 3. Create a Terraform Configuration File

Now, define the Terraform configuration to create the resource.

1. Create a new directory for your Terraform configuration files.
    
    ```apache
    mkdir terraform-service-account && cd $_
    ```
    
    Copied!
    
    **Note:**  
    This creates a new directory and changes the current directory to it.
    
2. Create a file named `main.tf` with the following content:
    
    ```apache
    terraform {
      required_providers {
        google = {
          source  = "hashicorp/google"
          version = "~> 4.0"
        }
      }
      backend "gcs" {
        bucket = "qwiklabs-gcp-02-2382fe5fa47a-tf-state"
        prefix = "terraform/state"
      }
    }
    
    provider "google" {
      project = var.project_id
      region  = var.region 
    }
    
    resource "google_service_account" "default" {
      account_id   = "terraform-sa"
      display_name = "Terraform Service Account"
    }
    ```
    
    Copied!
    
    **Note:**  
    This configuration defines a Google Cloud service account named `terraform-sa`.
    
3. Create a `variables.tf` file.
    
    ```apache
    variable "project_id" {
      type = string
      description = "The GCP project ID"
      default = "qwiklabs-gcp-02-2382fe5fa47a"
    }
    
    variable "region" {
      type = string
      description = "The GCP region"
      default = "us-central1"
    }
    ```
    
    Copied!
    

## Task 4. Initialize and Apply Terraform Configuration

Now, initialize Terraform, apply the configuration, and verify that the service account is created.

1. Initialize Terraform.
    
    ```apache
    terraform init
    ```
    
    Copied!
    
    **Note:**  
    This command initializes Terraform in the current directory.
    
2. Apply the Terraform configuration.
    
    ```apache
    terraform apply -auto-approve
    ```
    
    Copied!
    
    **Note:**  
    This command applies the configuration and creates the resource. The `-auto-approve` flag automatically approves the changes.
    
3. Verify that the service account has been created in the Google Cloud Console or using the gcloud CLI.
    
    ```apache
    gcloud iam service-accounts list --project=qwiklabs-gcp-02-2382fe5fa47a
    ```
    
    Copied!
    
    **Note:**  
    This command lists the service accounts in your project.
    

## Task 5. Clean Up Resources

To avoid incurring unwanted charges, destroy the resources created in this lab.

1. Destroy the Terraform-managed infrastructure.
    
    ```apache
    terraform destroy -auto-approve
    ```
    
    Copied!
    
    **Note:**  
    This command destroys the resources created by Terraform. The `-auto-approve` flag automatically approves the destruction.
    

---

## Solution of Lab

%[https://youtu.be/dOk7iaPMDTw] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/gem-terraform-sa-create/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

**Script alternative**

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Terraform%20Essentials%20Service%20Account/quicklab.sh
sudo chmod +x quicklab.sh
./quicklab.sh
```