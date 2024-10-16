---
title: "Build Infrastructure with Terraform on Google Cloud: Challenge Lab - GSP345"
seoTitle: "Build Infrastructure with Terraform on Google Cloud: Challenge Lab - G"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Thu Aug 15 2024 09:04:40 GMT+0000 (Coordinated Universal Time)
cuid: clzv20wfn00000ajvaoq12zqj
slug: build-infrastructure-with-terraform-on-google-cloud-challenge-lab-gsp345
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723712071609/4b2360ca-9c1e-4570-9aa1-f4a706b533a8.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723712667176/342948a7-581a-4b48-8424-50c929b19098.png
tags: build-infrastructure-with-terraform-on-google-cloud-challenge-lab-gsp345, build-infrastructure-with-terraform-on-google-cloud-challenge-lab

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Build Infrastructure with Terraform on Google Cloud](https://www.cloudskillsboost.google/course_templates/636) course. Are you ready for the challenge?

### Topics tested:

* Import existing infrastructure into your Terraform configuration.
    
* Build and reference your own Terraform modules.
    
* Add a remote backend to your configuration.
    
* Use and implement a module from the Terraform Registry.
    
* Re-provision, destroy, and update infrastructure.
    
* Test connectivity between the resources you've created.
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## **Challenge scenario**

You are a cloud engineer intern for a new startup. For your first project, your new boss has tasked you with creating infrastructure in a quick and efficient manner and generating a mechanism to keep track of it for future reference and changes. You have been directed to use [Terraform](https://www.terraform.io/) to complete the project.

For this project, you will use Terraform to create, deploy, and keep track of infrastructure on the startup's preferred provider, Google Cloud. You will also need to import some mismanaged instances into your configuration and fix them.

In this lab, you will use Terraform to import and create multiple VM instances, a VPC network with two subnetworks, and a firewall rule for the VPC to allow connections between the two instances. You will also create a Cloud Storage bucket to host your remote backend.

**Note:** At the end of every section, `plan` and `apply` your changes to allow your work to be successfully verified. Since we will be updating many terraform files in this lab make sure to use the correct file path and maintain the correct indentation.

## **Task 1. Create the configuration files**

1. In Cloud Shell, create your Terraform configuration files and a directory structure that resembles the following:
    

```apache
main.tf
variables.tf
modules/
└── instances
    ├── instances.tf
    ├── outputs.tf
    └── variables.tf
└── storage
    ├── storage.tf
    ├── outputs.tf
    └── variables.tf
```

2. Fill out the `variables.tf` files in the root directory and within the modules. Add three variables to each file: `region`, `zone`, and `project_id`. For their default values, use `us-east4`, `us-east4-b`, and your Google Cloud Project ID.
    

**Note:** You should use these variables anywhere applicable in your resource configurations.

3. Add the Terraform block and the [Google Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs) to the `main.tf` file. Verify the **zone** argument is added along with the **project** and **region** arguments in the Google Provider block.
    
4. Initialize Terraform.
    

## **Task 2. Import infrastructure**

1. In the Google Cloud Console, on the **Navigation menu**, click **Compute Engine &gt; VM Instances**. Two instances named **tf-instance-1** and **tf-instance-2** have already been created for you.
    

**Note:** by clicking on one of the instances, you can find its **Instance ID**, **boot disk image**, and **machine type**. These are all necessary for writing the configurations correctly and importing them into Terraform.

2. [Import](https://www.terraform.io/docs/cli/commands/import.html#example-import-into-module) the existing instances into the **instances** module. To do this, you will need to follow these steps:
    

* First, add the module reference into the `main.tf` file then re-initialize Terraform.
    
* Next, write the [resource configurations](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_instance) in the `instances.tf` file to match the pre-existing instances.
    
    * Name your instances `tf-instance-1` and `tf-instance-2`.
        
    * For the purposes of this lab, the resource configuration should be as minimal as possible. To accomplish this, you will only need to include the following additional arguments in your configuration: `machine_type`, `boot_disk`, `network_interface`, `metadata_startup_script`, and `allow_stopping_for_update`. For the last two arguments, use the following configuration as this will ensure you won't need to recreate it:
        
    
    ```apache
    metadata_startup_script = <<-EOT
            #!/bin/bash
        EOT
    allow_stopping_for_update = true
    ```
    
* Once you have written the resource configurations within the module, use the `terraform import` command to import them into your **instances** module.
    

3. Apply your changes. Note that since you did not fill out all of the arguments in the entire configuration, the `apply` will **update the instances in-place**. This is fine for lab purposes, but in a production environment, you should make sure to fill out all of the arguments correctly before importing.
    

Click *Check my progress* to verify the objective.

Import infrastructure.

**Check my progress**

## **Task 3. Configure a remote backend**

1. Create a [Cloud Storage bucket resource](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket) inside the `storage` module. For the bucket **name**, use `tf-bucket-527375`. For the rest of the arguments, you can simply use:
    
    * `location = "US"`
        
    * `force_destroy = true`
        
    * `uniform_bucket_level_access = true`
        

**Note:** You can optionally add output values inside of the `outputs.tf` file.

2. Add the module reference to the `main.tf` file. Initialize the module and `apply` the changes to create the bucket using Terraform.
    
3. Configure this storage bucket as the [remote backend](https://www.terraform.io/docs/language/settings/backends/gcs.html) inside the `main.tf` file. Be sure to use the **prefix** `terraform/state` so it can be graded successfully.
    
4. If you've written the configuration correctly, upon `init`, Terraform will ask whether you want to copy the existing state data to the new backend. Type `yes` at the prompt.
    

Click *Check my progress* to verify the objective.

Configure a remote backend.

**Check my progress**

## **Task 4. Modify and update infrastructure**

1. Navigate to the **instances** module and modify the **tf-instance-1** resource to use an `e2-standard-2` machine type.
    
2. Modify the **tf-instance-2** resource to use an `e2-standard-2` machine type.
    
3. Add a third instance resource and name it `tf-instance-128197`. For this third resource, use an `e2-standard-2` machine type. Make sure to change the machine type to `e2-standard-2` **to all the three instances**.
    
4. Initialize Terraform and `apply` your changes.
    

**Note:** Optionally, you can add output values from these resources in the `outputs.tf` file within the module.

Click *Check my progress* to verify the objective.

Modify and update infrastructure.

**Check my progress**

## **Task 5. Destroy resources**

1. Destroy the third instance `tf-instance-128197` by removing the resource from the configuration file. After removing it, initialize terraform and `apply` the changes.
    

Click *Check my progress* to verify the objective.

Destroy resources.

**Check my progress**

## **Task 6. Use a module from the Registry**

1. In the Terraform Registry, browse to the [Network Module](https://registry.terraform.io/modules/terraform-google-modules/network/google/6.0.0).
    
2. Add this module to your `main.tf` file. Use the following configurations:
    

* Use version `6.0.0` (different versions might cause compatibility errors).
    
* Name the VPC `tf-vpc-891566`, and use a **global** routing mode.
    
* Specify **2** subnets in the `us-east4` region, and name them `subnet-01` and `subnet-02`. For the subnets arguments, you just need the **Name**, **IP**, and **Region**.
    
* Use the IP `10.10.10.0/24` for `subnet-01`, and `10.10.20.0/24` for `subnet-02`.
    
* You do **not** need any secondary ranges or routes associated with this VPC, so you can omit them from the configuration.
    

3. Once you've written the module configuration, initialize Terraform and run an `apply` to create the networks.
    
4. Next, navigate to the `instances.tf` file and update the configuration resources to connect **tf-instance-1** to `subnet-01` and **tf-instance-2** to `subnet-02`.
    

**Note:** Within the instance configuration, you will need to update the **network** argument to `tf-vpc-891566`, and then add the **subnetwork** argument with the correct subnet for each instance.

Click *Check my progress* to verify the objective.

Use a module from the Registry.

**Check my progress**

## **Task 7. Configure a firewall**

* Create a [firewall rule](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall) resource in the `main.tf` file, and name it **tf-firewall**.
    
    * This firewall rule should permit the `tf-vpc-891566` network to allow ingress connections on *all* IP ranges (`0.0.0.0/0`) on **TCP port 80**.
        
    * Make sure you add the `source_ranges` argument with the correct IP range (`0.0.0.0/0`).
        
    * Initialize Terraform and `apply` your changes.
        

**Note:** To retrieve the required `network` argument, you can inspect the state and find the **ID** or **self\_link** of the `google_compute_network` resource you created. It will be in the form `projects/PROJECT_ID/global/networks/tf-vpc-891566`.

Click *Check my progress* to verify the objective.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=2c8XHiHO6rs] 

```apache
export BUCKET_NAME=
export INSTANCE_NAME=
export VPC_NAME=
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723712546708/1fb1e2cf-a1a1-4d28-9030-18a601f947ba.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Build%20Infrastructure%20with%20Terraform%20on%20Google%20Cloud%20Challenge%20Lab/quicklab345.sh
sudo chmod +x quicklab345.sh
./quicklab345.sh
```