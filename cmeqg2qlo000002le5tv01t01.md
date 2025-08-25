---
title: "Terraform Essentials: Google Compute Engine Instance - gem-terraform-gce-create"
seoTitle: "Terraform Essentials: Google Compute Engine Instance - gem-terraform-g"
seoDescription: "Use Terraform for Google Compute Engine instances with this step-by-step guide to efficiently manage cloud resources"
datePublished: Mon Aug 25 2025 01:34:45 GMT+0000 (Coordinated Universal Time)
cuid: cmeqg2qlo000002le5tv01t01
slug: terraform-essentials-google-compute-engine-instance-gem-terraform-gce-create
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756085624331/6724f52d-e2b1-48c9-935f-480d07ad112f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756085661274/cf1bc0a8-8b44-4b79-8aa6-0686f3453813.png
tags: terraform, terraform-essentials, terraform-essentials-google-compute-engine-instance-gem-terraform-gce-create, terraform-essentials-google-compute-engine-instance, gem-terraform-gce-create, google-compute-engine-instance

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

This lab demonstrates how to use Terraform to create a Google Compute Engine (GCE) instance. You will define your infrastructure as code, allowing you to easily provision and manage your resources. This lab assumes you have basic knowledge of Google Cloud and Terraform.

## Task 1. Prerequisites

Before you begin, ensure you have the following:

1. A Google Cloud project with billing enabled. You will need the Project ID for subsequent steps. The project ID will be: `qwiklabs-gcp-03-0bdcdbb5d2fc`
    
    ```apache
    Your Project ID is: qwiklabs-gcp-03-0bdcdbb5d2fc
    ```
    
    **Note:**  
    Make note of this ID; you will need it in the next steps.
    
2. Terraform installed on your local machine or in Cloud Shell. If using Cloud Shell, Terraform is pre-installed.
    
    ```apache
    terraform version
    ```
    
    **Note:**  
    Verify Terraform is installed.
    
3. The Google Cloud SDK (gcloud) installed and configured. If using Cloud Shell, gcloud is pre-installed and authenticated.
    
    ```apache
    gcloud version
    ```
    
    **Note:**  
    Verify gcloud is installed.
    
4. Authenticate to your Google Cloud project. In Cloud Shell, this might be done automatically.
    
    ```apache
    gcloud auth login
    ```
    
    **Note:**  
    Authenticate gcloud to access your Google Cloud resources.
    
5. Set your Project ID to be: `qwiklabs-gcp-03-0bdcdbb5d2fc`
    
    ```apache
    gcloud config set project qwiklabs-gcp-03-0bdcdbb5d2fc
    ```
    
    **Note:**  
    Set the current project.
    

## Task 2. Create a Cloud Storage Bucket for Terraform State

Terraform uses a state file to track the resources it manages. For collaborative projects and increased reliability, it's best to store this state remotely in a Cloud Storage bucket.

1. Create a Cloud Storage bucket. The bucket name must be globally unique and should include your project ID as a prefix.
    
    ```apache
    gsutil mb -l us-central1 gs://qwiklabs-gcp-03-0bdcdbb5d2fc-tf-state
    ```
    
    **Note:**  
    Create the Cloud Storage bucket to store Terraform state.
    
2. Enable versioning on the bucket. This allows you to revert to previous states if necessary.
    
    ```apache
    gsutil versioning set on gs://qwiklabs-gcp-03-0bdcdbb5d2fc-tf-state
    ```
    
    **Note:**  
    Enable versioning for state file history.
    

## Task 3. Create Terraform Configuration Files

Now, you will create the Terraform configuration files that define your GCE instance.

1. Create a file named `main.tf` with the following content:
    
    ```apache
    terraform {
      required_providers {
        google = {
          source  = "hashicorp/google"
          version = "~> 4.0"
        }
      }
      backend "gcs" {
        bucket = "qwiklabs-gcp-03-0bdcdbb5d2fc-tf-state"
        prefix = "terraform/state"
      }
    }
    
    provider "google" {
      project = var.project_id
      region  = var.region
    }
    
    resource "google_compute_instance" "default" {
      name         = "terraform-instance"
      machine_type = "e2-micro"
      zone         = var.zone
    
      boot_disk {
        initialize_params {
          image = "debian-cloud/debian-12"
        }
      }
    
      network_interface {
        subnetwork = "default"
    
        access_config {
        }
      }
    }
    ```
    
    **Note:**  
    This file defines the Terraform provider, backend, and the GCE instance resource. A `variables.tf` configuration will be used to define the PROJECT\_ID and REGION.
    
2. Create a file named `variables.tf` (optional, but recommended for defining variables):
    
    ```apache
    variable "project_id" {
      type        = string
      description = "The ID of the Google Cloud project"
      default = "qwiklabs-gcp-03-0bdcdbb5d2fc"
    }
    
    variable "region" {
      type        = string
      description = "The region to deploy resources in"
      default     = "us-central1"
    }
    
    variable "zone" {
      type        = string
      description = "The zone to deploy resources in"
      default     = "us-central1-c"
    }
    ```
    
    **Note:**  
    This file defines variables for your project ID, region, and zone. Note that it contains defaults.
    

## Task 4. Initialize, Plan, and Apply Terraform

With the configuration files created, you can now initialize, plan, and apply your Terraform configuration.

1. Initialize Terraform. This downloads the necessary provider plugins.
    
    ```apache
    terraform init
    ```
    
    **Note:**  
    Initialize Terraform to download plugins.
    
2. Plan the changes. This shows you what Terraform will do before it makes any actual changes.
    
    ```apache
    terraform plan
    ```
    
    **Note:**  
    Review the planned changes.
    
3. Apply the changes. This creates the GCE instance.
    
    ```apache
    terraform apply -auto-approve
    ```
    
    **Note:**  
    Apply the Terraform configuration to create the instance. The `-auto-approve` flag automatically approves the changes. Be cautious when using this flag in production environments.
    

## Task 5. Verify the Instance

Once Terraform has finished, verify that the GCE instance has been created.

1. In the Google Cloud Console, navigate to Compute Engine &gt; VM instances. You should see an instance named 'terraform-instance'.
    
2. Alternatively, use the gcloud command to list instances.
    
    ```apache
    gcloud compute instances list
    ```
    
    **Note:**  
    Verify the instance using the gcloud CLI.
    

## Task 6. Destroy the Infrastructure

When you are finished, destroy the infrastructure to avoid incurring unnecessary costs.

1. Destroy the resources created by Terraform.
    
    ```apache
    terraform destroy -auto-approve
    ```
    
    **Note:**  
    Destroy the resources created by Terraform.
    

---

## Solution of Lab

%[https://youtu.be/AU6u01JG6OI] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/gem-terraform-gce-create/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

**Script alternative**

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Terraform%20Essentials%20Google%20Compute%20Engine%20Instance/quicklab.sh
sudo chmod +x quicklab.sh
./quicklab.sh
```