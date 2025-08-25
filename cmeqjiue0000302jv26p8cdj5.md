---
title: "Terraform Essentials: VPC and Subnet - gem-terraform-vpc-create"
seoTitle: "Terraform Essentials: VPC and Subnet - gem-terraform-vpc-create"
seoDescription: "Learn to create and manage a custom VPC network in Google Cloud with Terraform. Configure subnets and firewall rules efficiently"
datePublished: Mon Aug 25 2025 03:11:15 GMT+0000 (Coordinated Universal Time)
cuid: cmeqjiue0000302jv26p8cdj5
slug: terraform-essentials-vpc-and-subnet-gem-terraform-vpc-create
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756091403955/27a8c6b8-441a-42ce-90cd-8a980956e542.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756091437685/7633d18e-574b-484d-8862-96f34efd3c3e.png
tags: terraform, vpc, subnet, terraform-essentials, terraform-essentials-vpc-and-subnet-gem-terraform-vpc-create, gem-terraform-vpc-create, terraform-essentials-vpc-and-subnet, vpc-and-subnet

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

In this lab, you will learn how to use HashiCorp Terraform to provision a custom Virtual Private Cloud (VPC) network in Google Cloud. You will define the network, subnets, and firewall rules using Terraform configuration files, and store the Terraform state in a Google Cloud Storage bucket. This lab assumes you have basic familiarity with Google Cloud and Terraform concepts.

## Task 1. Setting Up Your Environment

Before you begin, configure your environment for Terraform and Google Cloud. This includes setting the project ID, region, and zone, as well as creating a Cloud Storage bucket to store the Terraform state.

1. Set your project ID: `qwiklabs-gcp-01-da64924e1c64`
    
    ```apache
    gcloud config set project qwiklabs-gcp-01-da64924e1c64
    ```
    
    **Note:**  
    Replace `PROJECT_ID` with your actual Google Cloud project ID.
    
2. Set your default region to: `us-west1`
    
    ```apache
    gcloud config set compute/region us-west1
    ```
    
    **Note:**  
    Replace `REGION` with your desired Google Cloud region (e.g., `us-central1`).
    
3. Set your default zone to: `us-west1-a`
    
    ```apache
    gcloud config set compute/zone us-west1-a
    ```
    
    **Note:**  
    Replace `ZONE` with your desired Google Cloud zone (e.g., `us-central1-a`).
    
4. Create a Cloud Storage bucket to store the Terraform state. The bucket name should be prefixed with your project ID: `<ql-variable>project_0.project_id</ql-variable>-terraform-state`
    
    ```apache
    gcloud storage buckets create gs://qwiklabs-gcp-01-da64924e1c64-terraform-state --project=qwiklabs-gcp-01-da64924e1c64 --location=us
    ```
    
    **Note:**  
    This command creates a Cloud Storage bucket in the `us` location. Consider using a region closer to you.
    
5. Enable the Cloud Resource Manager API.
    
    ```apache
    gcloud services enable cloudresourcemanager.googleapis.com --project=qwiklabs-gcp-01-da64924e1c64
    ```
    

## Task 2. Creating the Terraform Configuration

Now, create the Terraform configuration files to define your custom VPC network. These files will specify the network name, subnets, IP address ranges, and firewall rules.

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
        bucket = "qwiklabs-gcp-01-da64924e1c64-terraform-state"
        prefix = "terraform/state"
      }
    }
    
    provider "google" {
      project = "qwiklabs-gcp-01-da64924e1c64"
      region  = "us-west1"
    }
    
    resource "google_compute_network" "vpc_network" {
      name                    = "custom-vpc-network"
      auto_create_subnetworks = false
    }
    
    resource "google_compute_subnetwork" "subnet_us" {
      name            = "subnet-us"
      ip_cidr_range   = "10.10.1.0/24"
      region          = "us-west1"
      network         = google_compute_network.vpc_network.id
    }
    
    resource "google_compute_firewall" "allow_ssh" {
      name    = "allow-ssh"
      network = google_compute_network.vpc_network.name
      allow {
        protocol = "tcp"
        ports    = ["22"]
      }
      source_ranges = ["0.0.0.0/0"]
    }
    
    resource "google_compute_firewall" "allow_icmp" {
      name    = "allow-icmp"
      network = google_compute_network.vpc_network.name
    
      allow {
        protocol = "icmp"
      }
      source_ranges = ["0.0.0.0/0"]
    }
    ```
    
    **Note:**  
    This configuration enables firewall policies for the VPC.
    
2. Create a `variables.tf` file:
    
    ```apache
    variable "project_id" {
      type        = string
      description = "The ID of the Google Cloud project"
      default     = "qwiklabs-gcp-01-da64924e1c64"
    }
    
    variable "region" {
      type        = string
      description = "The region to deploy resources in"
      default     = "us-west1"
    }
    ```
    
    **Note:**  
    This declares variables. It is good practice.
    
3. Create an `outputs.tf` file:
    
    ```apache
    output "network_name" {
      value       = google_compute_network.vpc_network.name
      description = "The name of the VPC network"
    }
    
    output "subnet_name" {
      value       = google_compute_subnetwork.subnet_us.name
      description = "The name of the subnetwork"
    }
    ```
    
    **Note:**  
    This declares output variables. It is good practice.
    

## Task 3. Deploying the VPC Network

With the Terraform configuration files created, you can now initialize Terraform, plan the changes, and apply the configuration to provision the VPC network in your Google Cloud project.

1. Initialize Terraform:
    
    ```apache
    terraform init
    ```
    
    **Note:**  
    This command initializes Terraform and downloads the necessary provider plugins.
    
2. Plan the changes:
    
    ```apache
    terraform plan
    ```
    
    **Note:**  
    This command creates an execution plan, showing the changes that Terraform will make to your infrastructure.
    
3. Apply the configuration:
    
    ```apache
    terraform apply --auto-approve
    ```
    
    **Note:**  
    This command applies the changes defined in the Terraform configuration files to provision the VPC network.
    

## Task 4. Verifying the VPC Network

After the Terraform configuration is applied, verify that the VPC network, subnet, and firewall rules have been created correctly in your Google Cloud project.

1. Navigate to the VPC networks page in the Google Cloud Console.
    
    **Note:**  
    Go to Networking &gt; VPC networks.
    
2. Verify that the `custom-vpc-network` network exists.
    
    **Note:**  
    Check that the VPC network you defined in the terraform config is present.
    
3. Navigate to the Subnets page and verify that the `subnet-us` subnet exists.
    
    **Note:**  
    Go to Networking &gt; VPC networks &gt; Subnetworks.
    
4. Navigate to the Firewall rules page and verify that the `allow-ssh` and `allow-icmp` firewall rules exist.
    
    **Note:**  
    Go to Networking &gt; Firewall.
    

## Task 5. Cleaning Up Resources

To avoid incurring unnecessary costs, destroy the resources created in this lab when you are finished.

1. Destroy the resources:
    
    ```apache
    terraform destroy --auto-approve
    ```
    
    **Note:**  
    This command destroys all the resources managed by Terraform in your Google Cloud project.
    

---

## Solution of Lab

%[https://youtu.be/EvDgV5APtNw] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/gem-terraform-vpc-create/lab.sh
sudo chmod +x lab.sh
./lab.sh
```