---
title: "Terraform Essentials: Firewall Policy - gem-terraform-fw-rule-create"
seoTitle: "Terraform Essentials: Firewall Policy - gem-terraform-fw-rule-create"
seoDescription: "Learn to create a firewall rule in Google Cloud using Terraform, from configuring your project to defining, applying, and cleaning up resources"
datePublished: Mon Aug 25 2025 02:43:24 GMT+0000 (Coordinated Universal Time)
cuid: cmeqij16b000602ldfdrl0ze7
slug: terraform-essentials-firewall-policy-gem-terraform-fw-rule-create
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756089745213/b805b80f-a9c1-4e2f-ac52-856a7e9b1c0b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756089788210/bd9eca80-2e85-4309-b963-d5d083c1a513.png
tags: terraform, firewall, terraform-essentials, terraform-essentials-firewall-policy-gem-terraform-fw-rule-create, firewall-policy, gem-terraform-fw-rule-create, terraform-essentials-firewall-policy

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

This lab guides you through creating a firewall rule in Google Cloud using Terraform. You will learn how to define a firewall rule resource, configure its properties, and apply it to your Google Cloud project. This lab assumes you have a basic understanding of Google Cloud and Terraform.

## Task 1. Configure Google Cloud Project

Before you begin, configure your Google Cloud project. This includes setting the project ID, region, and zone. Also, enable the IAM API.

1. Set your Project ID: `qwiklabs-gcp-03-1a83fda8d753`
    
    ```apache
    gcloud config set project qwiklabs-gcp-03-1a83fda8d753
    ```
    
    **Note:**  
    This command sets your active project.
    
2. Set your default region to `us-central1`
    
    ```apache
    gcloud config set compute/region us-central1
    ```
    
    **Note:**  
    This command sets your active compute region.
    
3. Set your default zone to `us-central1-b`
    
    ```apache
    gcloud config set compute/zone us-central1-b
    ```
    
    **Note:**  
    This command sets your active compute zone.
    

## Task 2. Create a Cloud Storage Bucket for Terraform State

Terraform uses a state file to track the resources it manages. For collaboration and persistence, it's best to store this state file in a remote backend like Google Cloud Storage (GCS).

1. Create a Cloud Storage bucket. Ensure the bucket name is globally unique and prefixed with your project ID: `qwiklabs-gcp-03-1a83fda8d753`
    
    ```apache
    gcloud storage buckets create gs://qwiklabs-gcp-03-1a83fda8d753-tf-state --project=qwiklabs-gcp-03-1a83fda8d753 --location=us-central1 --uniform-bucket-level-access
    ```
    
    **Note:**  
    This command creates a Cloud Storage bucket in the specified region to store the Terraform state file.
    
2. Enable versioning on the GCS bucket:
    
    ```apache
    gsutil versioning set on gs://qwiklabs-gcp-03-1a83fda8d753-tf-state
    ```
    
    **Note:**  
    This enables versioning on the bucket.
    

## Task 3. Defining the Firewall Rule in Terraform

Now, you will define the firewall rule using Terraform's configuration language.

1. Create a new directory for your Terraform configuration files.
    
    ```apache
    mkdir terraform-firewall && cd $_
    ```
    
    **Note:**  
    This creates a new directory and changes the current directory to it.
    
2. Create a file named `firewall.tf` and add the following code to define a firewall rule that allows SSH traffic (port 22) to instances with the tag `ssh-allowed`.
    
    ```apache
    resource "google_compute_firewall" "allow_ssh" {
      name    = "allow-ssh-from-anywhere"
      network = "default"
      project = "qwiklabs-gcp-03-1a83fda8d753"
    
      allow {
        protocol = "tcp"
        ports    = ["22"]
      }
    
      source_ranges = ["0.0.0.0/0"]
      target_tags   = ["ssh-allowed"]
    }
    ```
    
    **Note:**  
    This configuration creates a firewall rule named `allow-ssh-from-anywhere` that allows TCP traffic on port 22 from any source IP address (0.0.0.0/0) to instances tagged with `ssh-allowed`.
    
3. Create a `variables.tf` file to define variables used in `firewall.tf` and `main.tf`.
    
    ```apache
    variable "project_id" {
      type = string
      default = "qwiklabs-gcp-03-1a83fda8d753"
    }
    
    variable "bucket_name" {
      type = string
      default = "qwiklabs-gcp-03-1a83fda8d753-tf-state"
    }
    
    variable "region" {
      type = string
      default = "us-central1"
    }
    ```
    
    **Note:**  
    This creates variables for the project ID, bucket name, and region.
    
4. Create an `outputs.tf` file to output the firewall rule name.
    
    ```apache
    output "firewall_name" {
      value = google_compute_firewall.allow_ssh.name
    }
    ```
    
    **Note:**  
    This outputs the name of the firewall rule.
    

## Task 4. Applying the Terraform Configuration

Now you will apply the Terraform configuration to create the firewall rule in your Google Cloud project.

1. Run `terraform init` to enable Terraform.
    
    ```apache
    terraform init 
    ```
    
    **Note:**  
    This command downloads the Terraform provider for the configuration files.
    
2. Run `terraform plan` to preview the changes Terraform will make.
    
    ```apache
    terraform plan
    ```
    
    **Note:**  
    This command shows the planned changes without applying them.
    
3. Run `terraform apply` to apply the configuration and create the firewall rule.
    
    ```apache
    terraform apply
    ```
    
    **Note:**  
    Type `yes` when prompted to confirm the changes.
    
4. Verify that the firewall rule has been created in the Google Cloud Console.
    
    ```apache
    Navigate to **VPC network > Firewall** in the Google Cloud Console and verify the existence of the `allow-ssh-from-anywhere` firewall rule.
    ```
    
    **Note:**  
    This is a manual verification step.
    

## Task 5. Cleaning Up Resources

To avoid incurring unnecessary costs, destroy the resources created in this lab.

1. Run `terraform destroy` to remove the firewall rule.
    
    ```apache
    terraform destroy
    ```
    
    **Note:**  
    Type `yes` when prompted to confirm the destruction.
    

---

## Solution of Lab

%[https://youtu.be/xSBKXOOjA_A] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/gem-terraform-fw-rule-create/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

**Script alternative**

```apache
curl -LO raw.githubusercontent.com/gcpsolution99/GCP-solution/refs/heads/main/GSP/Abhi_Firewall_Policy.sh
sudo chmod +x Abhi_Firewall_Policy.sh
./Abhi_Firewall_Policy.sh
```