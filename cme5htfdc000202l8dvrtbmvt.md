---
title: "Terraform Essentials: Cloud Firestore Database - gem-terraform-firestore-create"
seoTitle: "Terraform Essentials: Cloud Firestore Database (Solution)"
seoDescription: "Learn to create a Cloud Firestore database with Terraform: setup, configuration, deployment, and cleanup in Google Cloud Platform step by step"
datePublished: Sun Aug 10 2025 09:40:20 GMT+0000 (Coordinated Universal Time)
cuid: cme5htfdc000202l8dvrtbmvt
slug: terraform-essentials-cloud-firestore-database-gem-terraform-firestore-create
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754818591316/7400a1c6-1d7a-4e2f-a001-61fbf8c62bb7.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1754818769034/d9fe0518-6eb0-4696-9c97-4253cfc4792e.png
tags: terraform, terraform-essentials-cloud-firestore-database-gem-terraform-firestore-create, terraform-essentials-cloud-firestore-database, gem-terraform-firestore-create, terraform-essentials, cloud-firestore-database

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

In this lab, you will learn how to create a Cloud Firestore database using Terraform. You will define your infrastructure as code, store the Terraform state in a Cloud Storage bucket, and deploy the Firestore database using Terraform commands. This lab assumes you have basic knowledge of Google Cloud and Terraform.

## Task 1. Set Up Google Cloud Project and Terraform

Before you begin, configure your Google Cloud project and initialize Terraform.

1. Set your Project ID: `qwiklabs-gcp-00-e2ad2ba240a9`
    
    ```apache
    gcloud config set project qwiklabs-gcp-00-e2ad2ba240a9
    ```
    
    **Note:**  
    This command sets your active project. This ensures that subsequent commands are executed within the correct project context.
    
2. Enable the Cloud Firestore API.
    
    ```apache
    gcloud services enable firestore.googleapis.com
    ```
    
    **Note:**  
    This command enables the Cloud Firestore API, allowing you to create and manage Cloud Firestore databases in your project.
    
3. Enable the Cloud Build API.
    
    ```apache
    gcloud services enable cloudbuild.googleapis.com
    ```
    
    **Note:**  
    This command enables the Cloud Build API. Cloud Build automates the deployment of your Terraform configurations.
    
4. Create a Cloud Storage bucket to store the Terraform state.
    
    ```apache
    gcloud storage buckets create gs://qwiklabs-gcp-00-e2ad2ba240a9-tf-state --location=us
    ```
    
    **Note:**  
    This command creates a Cloud Storage bucket to store your Terraform state file. Storing the state remotely allows for collaboration and versioning. The `--location=us` flag specifies the region for the bucket.
    

## Task 2. Create Terraform Configuration

Define the Cloud Firestore database resource in a Terraform configuration file.

1. Create a file named `main.tf` with the following content.
    
    ```apache
    terraform {
      required_providers {
        google = {
          source  = "hashicorp/google"
          version = "~> 4.0"
        }
      }
      backend "gcs" {
        bucket = "qwiklabs-gcp-00-e2ad2ba240a9-tf-state"
        prefix = "terraform/state"
      }
    }
    
    provider "google" {
      project = "qwiklabs-gcp-00-e2ad2ba240a9"
      region  = "us-central1"
    }
    
    resource "google_firestore_database" "default" {
      name     = "default"
      project  = "qwiklabs-gcp-00-e2ad2ba240a9"
      location_id = "nam5"
      type     = "FIRESTORE_NATIVE"
    }
    
    output "firestore_database_name" {
      value       = google_firestore_database.default.name
      description = "The name of the Cloud Firestore database."
    }
    ```
    
    **Note:**  
    This Terraform configuration file defines a Cloud Firestore database resource. The `backend "gcs"` block configures Terraform to store the state file in the Cloud Storage bucket you created earlier.
    
2. Create a `variables.tf` file with the following content:
    
    ```apache
    variable "project_id" {
      type        = string
      description = "The ID of the Google Cloud project."
      default     = "qwiklabs-gcp-00-e2ad2ba240a9"
    }
    
    variable "bucket_name" {
      type        = string
      description = "Bucket name for terraform state"
      default     = "qwiklabs-gcp-00-e2ad2ba240a9-tf-state"
    }
    ```
    
    **Note:**  
    This defines variables for the Google Cloud Project ID and the bucket name. It's a best practice to keep variables separate for better configuration management and reusability.
    
3. Create a `outputs.tf` file with the following content:
    
    ```apache
    output "project_id" {
      value       = var.project_id
      description = "The ID of the Google Cloud project."
    }
    
    output "bucket_name" {
      value       = var.bucket_name
      description = "The name of the bucket to store terraform state."
    }
    ```
    
    **Note:**  
    This defines the outputs for Terraform, allowing you to easily retrieve the values of the project ID and bucket name after the configuration is applied.
    

## Task 3. Apply the Terraform Configuration

Deploy the Cloud Firestore database using Terraform.

1. Initialize Terraform in your working directory.
    
    ```apache
    terraform init
    ```
    
    **Note:**  
    This command initializes Terraform in your current directory, downloads the necessary provider plugins, and prepares the working directory for Terraform operations.
    
2. Run `terraform plan` to review the changes.
    
    ```apache
    terraform plan
    ```
    
    **Note:**  
    This command shows the changes that Terraform will make to your infrastructure. Review the plan carefully to ensure that the changes are what you expect.
    
3. Run `terraform apply` to apply the configuration. Type `yes` when prompted to confirm.
    
    ```apache
    terraform apply
    ```
    
    **Note:**  
    This command applies the Terraform configuration and creates the Cloud Firestore database. Terraform will prompt you to confirm the changes before proceeding.
    
4. Verify that the Cloud Firestore database has been created in the Google Cloud Console.
    
    **Note:**  
    Go to the Cloud Firestore section in the Google Cloud Console to verify the database. Ensure that the database is configured as specified in your Terraform configuration.
    

## Task 4. Clean Up Resources

Destroy the resources created by Terraform.

1. Run `terraform destroy` to destroy the resources. Type `yes` when prompted to confirm.
    
    ```apache
    terraform destroy
    ```
    
    **Note:**  
    This command destroys the resources created by Terraform, including the Cloud Firestore database and any other resources created by the configuration.
    

---

## Solution of Lab

%[https://youtu.be/Ds0fkkG2hbA] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Terraform%20Essentials%20Cloud%20Firestore%20Database/quicklab.sh
sudo chmod +x quicklab.sh
./quicklab.sh
```