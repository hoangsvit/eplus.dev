---
title: "Infrastructure as Code with Terraform - GSP750"
seoTitle: "Infrastructure as Code with Terraform - GSP750"
seoDescription: "Terraform is the infrastructure as code offering from HashiCorp. It is a tool for building, changing, and managing infrastructure in a safe, repeatable way."
datePublished: Tue Aug 13 2024 02:34:47 GMT+0000 (Coordinated Universal Time)
cuid: clzrt7t6y000908l9fupa0yx3
slug: infrastructure-as-code-with-terraform-gsp750
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723516100182/25a1424b-3ce7-49bd-801a-5b5bc40439fa.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723516475838/fdc45b84-3ea6-45ed-934b-d2b53108f468.png
tags: infrastructure-as-code-with-terraform-gsp750, gsp750

---

## **Overview**

Terraform is the infrastructure as code offering from HashiCorp. It is a tool for building, changing, and managing infrastructure in a safe, repeatable way. Operators and Infrastructure teams can use Terraform to manage environments with a configuration language called the HashiCorp Configuration Language (HCL) for human-readable, automated deployments.

Infrastructure as code is the process of managing infrastructure in a file or files rather than manually configuring resources in a user interface. A resource in this instance is any piece of infrastructure in a given environment, such as a virtual machine, security group, network interface, etc. At a high level, Terraform allows operators to use HCL to author files containing definitions of their desired resources on almost any provider (AWS, Google Cloud, GitHub, Docker, etc.) and automates the creation of those resources at the time of apply.

A simple workflow for deployment will follow closely to the steps below:

* **Scope** - Confirm what resources need to be created for a given project.
    
* **Author** - Create the configuration file in HCL based on the scoped parameters.
    
* **Initialize** - Run `terraform init` in the project directory with the configuration files. This will download the correct provider plug-ins for the project.
    
* **Plan & Apply** - Run `terraform plan` to verify creation process and then `terraform apply` to create real resources as well as the state file that compares future changes in your configuration files to what actually exists in your deployment environment.
    

## **Objectives**

In this lab, you will learn how to perform the following tasks:

* Build, change, and destroy infrastructure with Terraform
    
* Create Resource Dependencies with Terraform
    
* Provision infrastructure with Terraform
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab Details** panel with the following:
    
    * The **Open Google Cloud console** button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the **Sign in** page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-04-52e2cfd95869@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    0f9ZiZ2RxPnK
    ```
    
    You can also find the **Password** in the **Lab Details** panel.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To view a menu with a list of Google Cloud products and services, click the **Navigation menu** at the top-left.

![Navigation menu icon](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-fed61199e115`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-fed61199e115
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

3. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-52e2cfd95869@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

4. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-00-fed61199e115
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Build infrastructure**

Terraform comes pre-installed in Cloud Shell. With Terraform already installed, you can dive right in and create some infrastructure.

Start by creating your example configuration to a file named `main.tf`. Terraform recognizes files ending in `.tf` or `.tf.json` as configuration files and will load them when it runs.

1. Create the `main.tf` file:
    

```apache
touch main.tf
```

2. Click the **Open Editor** button on the toolbar of Cloud Shell. (You can switch between Cloud Shell and the code editor by using the **Open Editor** and **Open Terminal** icons as required, or click the **Open in new window** button to leave the Editor open in a separate tab).
    
3. In the Editor, add the following content to the `main.tf` file.
    

```apache
terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {

  project = "qwiklabs-gcp-00-fed61199e115"
  region  = "us-central1"
  zone    = "us-central1-a"
}

resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}
```

**Note:** To use this snippet with Terraform 0.12, remove the `terraform {}` block.

### Terraform block

The `terraform {}` block is required so Terraform knows which provider to download from the [Terraform Registry](https://registry.terraform.io/). In the configuration above, the `google` provider's source is defined as `hashicorp/google` which is shorthand for `registry.terraform.io/hashicorp/google`.

You can also assign a version to each provider defined in the `required_providers` block. The `version` argument is optional, but recommended. It is used to constrain the provider to a specific version or a range of versions in order to prevent downloading a new provider that may possibly contain breaking changes. If the version isn't specified, Terraform will automatically download the most recent provider during initialization.

To learn more, on the HashiCorp Terraform website, see [Provider Requirements](https://www.terraform.io/docs/configuration/provider-requirements.html).

### Providers

The `provider` block is used to configure the named provider, in this case `google`. A provider is responsible for creating and managing resources. Multiple provider blocks can exist if a Terraform configuration manages resources from different providers.

### Initialization

The first command to run for a new configuration -- or after checking out an existing configuration from version control -- is `terraform init`, which initializes various local settings and data that will be used by subsequent commands.

* Initialize your new Terraform configuration by running the `terraform init` command in the same directory as your `main.tf` file:
    

```apache
terraform init
```

### Creating resources

1. Apply you configuration now by running the command `terraform apply`:
    

```apache
terraform apply
```

The output has a `+` next to resource `"google_compute_network" "vpc_network"`, meaning that Terraform will create this resource. Beneath that, it shows the attributes that will be set. When the value displayed is `(known after apply)`, it means that the value won't be known until the resource is created.

If the plan was created successfully, Terraform will now pause and wait for approval before proceeding. If anything in the plan seems incorrect or dangerous, it is safe to abort here with no changes made to your infrastructure.

If `terraform apply` failed with an error, read the error message and fix the error that occurred.

2. The plan looks acceptable here, so type `yes` at the confirmation prompt to proceed.
    

Executing the plan will take a few minutes since Terraform waits for the network to be created successfully:

```apache
# ...
  Enter a value: yes

google_compute_network.vpc_network: Creating...
google_compute_network.vpc_network: Still creating... [10s elapsed]
google_compute_network.vpc_network: Still creating... [20s elapsed]
google_compute_network.vpc_network: Still creating... [30s elapsed]
google_compute_network.vpc_network: Still creating... [40s elapsed]
google_compute_network.vpc_network: Still creating... [50s elapsed]
google_compute_network.vpc_network: Creation complete after 58s [id=terraform-network]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

After this, Terraform is all done! You can go to the Cloud Console to see the network you have provisioned.

3. In the Console, from the **Navigation menu**, navigate to **VPC network**. You will see the `terraform-network` has been provisioned.
    

![VPC networks page](https://cdn.qwiklabs.com/ixPpe0919FV8gS8Aekxv2tD8zu7LpVC%2B4yGFQyl%2FJzQ%3D align="left")

4. In Cloud Shell run the `terraform show` command to inspect the current state:
    

```apache
terraform show
```

These values can be referenced to configure other resources or outputs, which will be covered later in this lab.

Click *Check my progress* to verify the objective.

Creating Resources in terraform

**Check my progress**

## **Task 2. Change infrastructure**

In the previous section, you created basic infrastructure with Terraform: a VPC network. In this section, you're going to modify your configuration, and see how Terraform handles change.

Infrastructure is continuously evolving, and Terraform was built to help manage and enact that change. As you change Terraform configurations, Terraform builds an execution plan that only modifies what is necessary to reach your desired state.

By using Terraform to change infrastructure, you can version control not only your configurations but also your state so you can see how the infrastructure evolves over time.

### Adding resources

You can add new resources by adding them to your Terraform configuration and running `terraform apply` to provision them.

1. In the Editor, add a compute instance resource to `main.tf`:
    

```apache
resource "google_compute_instance" "vm_instance" {
  name         = "terraform-instance"
  machine_type = "e2-micro"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {
    }
  }
}
```

This resource includes a few more arguments. The name and machine type are simple strings, but `boot_disk` and `network_interface` are more complex blocks. You can see all of the available options in the [google\_compute\_instance documentation](https://www.terraform.io/docs/providers/google/r/compute_instance).

For this example, your compute instance will use a Debian operating system, and will be connected to the VPC Network you created earlier. Notice how this configuration refers to the network's name property with `google_compute_network.vpc_network.name` -- `google_compute_network.vpc_network` is the ID, matching the values in the block that defines the network, and `name` is a property of that resource.

The presence of the `access_config` block, even without any arguments, ensures that the instance will be accessible over the internet.

2. Now run `terraform apply` to create the compute instance:
    

```apache
terraform apply
```

3. Once again, answer `yes` to the confirmation prompt.
    

This is a fairly straightforward change - you added a "google\_compute\_instance" resource named "vm\_instance" to your configuration, and Terraform created the resource in Google Cloud.

### Changing resources

In addition to creating resources, Terraform can also make changes to those resources.

1. Add a `tags` argument to your "vm\_instance" so that it looks like this:
    

```apache
resource "google_compute_instance" "vm_instance" {
  name         = "terraform-instance"
  machine_type = "e2-micro"
  tags         = ["web", "dev"]
  # ...
}
```

2. Run `terraform apply` again to update the instance:
    

```apache
terraform apply
```

3. The prefix `~` means that Terraform will update the resource in-place. You can go and apply this change now by responding `yes`, and Terraform will add the tags to your instance.
    

Click *Check my progress* to verify the objective.

Change Infrastructure

**Check my progress**

### Destructive changes

A destructive change is a change that requires the provider to replace the existing resource rather than updating it. This usually happens because the cloud provider doesn't support updating the resource in the way described by your configuration.

Changing the disk image of your instance is one example of a destructive change.

1. Edit the `boot_disk` block inside the `vm_instance` resource in your configuration file and change it to the following:
    

```apache
  boot_disk {
    initialize_params {
      image = "cos-cloud/cos-stable"
    }
  }
```

2. Now run `terraform apply` again to see how Terraform will apply this change to the existing resources:
    

```apache
terraform apply
```

The prefix `-/+` means that Terraform will destroy and recreate the resource, rather than updating it in-place. While some attributes can be updated in-place (which are shown with the `~` prefix), changing the boot disk image for an instance requires recreating it. Terraform and the Google Cloud provider handle these details for you, and the execution plan makes it clear what Terraform will do.

Additionally, the execution plan shows that the disk image change is what required your instance to be replaced. Using this information, you can adjust your changes to possibly avoid destroy/create updates if they are not acceptable in some situations.

3. Once again, Terraform prompts for approval of the execution plan before proceeding. Answer `yes` to execute the planned steps.
    

As indicated by the execution plan, Terraform first destroyed the existing instance and then created a new one in its place. You can use `terraform show` again to see the new values associated with this instance.

### Destroy infrastructure

You have now seen how to build and change infrastructure. Before moving on to creating multiple resources and showing resource dependencies, you will see how to completely destroy your Terraform-managed infrastructure.

Destroying your infrastructure is a rare event in production environments. But if you're using Terraform to spin up multiple environments such as development, testing, and staging, then destroying is often a useful action.

Resources can be destroyed using the `terraform destroy` command, which is similar to `terraform apply` but it behaves as if all of the resources have been removed from the configuration.

* Try the `terraform destroy` command. Answer `yes` to execute this plan and destroy the infrastructure:
    

```apache
terraform destroy
```

The `-` prefix indicates that the instance and the network will be destroyed. As with apply, Terraform shows its execution plan and waits for approval before making any changes.

Just like with `terraform apply`, Terraform determines the order in which things must be destroyed. Google Cloud won't allow a VPC network to be deleted if there are resources still in it, so Terraform waits until the instance is destroyed before destroying the network. When performing operations, Terraform creates a dependency graph to determine the correct order of operations. In more complicated cases with multiple resources, Terraform will perform operations in parallel when it's safe to do so.

Click *Check my progress* to verify the objective.

Destructive Changes

**Check my progress**

## **Task 3. Create resource dependencies**

In this section, you will learn more about resource dependencies and how to use resource parameters to share information about one resource with other resources.

Real-world infrastructure has a diverse set of resources and resource types. Terraform configurations can contain multiple resources, multiple resource types, and these types can even span multiple providers.

In this section, you will be shown a basic example of how to configure multiple resources and how to use resource attributes to configure other resources.

* Recreate your network and instance. After you respond to the prompt with `yes`, the resources will be created:
    

```apache
terraform apply
```

### Assigning a static IP address

1. Now add to your configuration by assigning a static IP to the VM instance in `main.tf`:
    

```apache
resource "google_compute_address" "vm_static_ip" {
  name = "terraform-static-ip"
}
```

This should look familiar from the earlier example of adding a VM instance resource, except this time you're creating a "google\_compute\_address" resource type. This resource type allocates a reserved IP address to your project.

2. Next, run `terraform plan`:
    

```apache
terraform plan
```

You can see what will be created with `terraform plan`:

```apache
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

google_compute_network.vpc_network: Refreshing state... [id=terraform-network]
google_compute_instance.vm_instance: Refreshing state... [id=terraform-instance]

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # google_compute_address.vm_static_ip will be created
  + resource "google_compute_address" "vm_static_ip" {
      + address            = (known after apply)
      + address_type       = "EXTERNAL"
      + creation_timestamp = (known after apply)
      + id                 = (known after apply)
      + name               = "terraform-static-ip"
      + network_tier       = (known after apply)
      + project            = (known after apply)
      + region             = (known after apply)
      + self_link          = (known after apply)
      + subnetwork         = (known after apply)
      + users              = (known after apply)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

Unlike `terraform apply`, the `plan` command will only show what would be changed, and never actually apply the changes directly. Notice that the only change you have made so far is to add a static IP. Next, you need to attach the IP address to your instance.

3. Update the `network_interface` configuration for your instance like so:
    

```apache
  network_interface {
    network = google_compute_network.vpc_network.self_link
    access_config {
      nat_ip = google_compute_address.vm_static_ip.address
    }
  }
```

The `access_config` block has several optional arguments, and in this case you'll set `nat_ip` to be the static IP address. When Terraform reads this configuration, it will:

* Ensure that `vm_static_ip` is created before `vm_instance`
    
* Save the properties of `vm_static_ip` in the state
    
* Set `nat_ip` to the value of the `vm_static_ip.address` property
    

4. Run terraform plan again, but this time, save the plan:
    

```apache
terraform plan -out static_ip
```

Saving the plan this way ensures that you can apply exactly the same plan in the future. If you try to apply the file created by the plan, Terraform will first check to make sure the exact same set of changes will be made before applying the plan.

In this case, you can see that Terraform will create a new `google_compute_address` and update the existing VM to use it.

5. Run `terraform apply "static_ip"` to see how Terraform plans to apply this change:
    

```apache
terraform apply "static_ip"
```

Copied!content\_copy

As shown above, Terraform created the static IP before modifying the VM instance. Due to the interpolation expression that passes the IP address to the instance's network interface configuration, Terraform is able to infer a dependency, and knows it must create the static IP before updating the instance.

Click *Check my progress* to verify the objective.

Create Resource Dependencies

**Check my progress**

### Implicit and explicit dependencies

By studying the resource attributes used in interpolation expressions, Terraform can automatically infer when one resource depends on another. In the example above, the reference to `google_compute_address.vm_static_ip.address` creates an *implicit dependency* on the `google_compute_address` named `vm_static_ip`.

Terraform uses this dependency information to determine the correct order in which to create and update different resources. In the example above, Terraform knows that the `vm_static_ip` must be created before the `vm_instance` is updated to use it.

Implicit dependencies via interpolation expressions are the primary way to inform Terraform about these relationships, and should be used whenever possible.

Sometimes there are dependencies between resources that are *not* visible to Terraform. The `depends_on` argument can be added to any resource and accepts a list of resources to create explicit dependencies for.

For example, perhaps an application you will run on your instance expects to use a specific Cloud Storage bucket, but that dependency is configured inside the application code and thus not visible to Terraform. In that case, you can use `depends_on` to explicitly declare the dependency.

1. Add a Cloud Storage bucket and an instance with an explicit dependency on the bucket by adding the following to `main.tf`:
    

```apache
# New resource for the storage bucket our application will use.
resource "google_storage_bucket" "example_bucket" {
  name     = "<UNIQUE-BUCKET-NAME>"
  location = "US"

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

# Create a new instance that uses the bucket
resource "google_compute_instance" "another_instance" {
  # Tells Terraform that this VM instance must be created only after the
  # storage bucket has been created.
  depends_on = [google_storage_bucket.example_bucket]

  name         = "terraform-instance-2"
  machine_type = "e2-micro"

  boot_disk {
    initialize_params {
      image = "cos-cloud/cos-stable"
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.self_link
    access_config {
    }
  }
}
```

**Note:** Storage buckets must be globally unique. Because of this, you will need to replace `UNIQUE-BUCKET-NAME` with a unique, valid name for a bucket. Using your name and the date is usually a good way to guess a unique bucket name.

You may wonder where in your configuration these resources should go. The order that resources are defined in a terraform configuration file has no effect on how Terraform applies your changes. Organize your configuration files in a way that makes the most sense for you and your team.

2. Now run terraform plan and terraform apply to see these changes in action:
    

```apache
terraform plan
terraform apply
```

Click *Check my progress* to verify the objective.

Create bucket dependent instance

**Check my progress**

3. Before moving on, remove these new resources from your configuration and run `terraform apply` once again to destroy them. You won't use the bucket or the second instance any further in this lab.
    

## **Task 4. Provision infrastructure**

The compute instance you launched at this point is based on the Google image given, but has no additional software installed or configuration applied.

Google Cloud allows customers to manage their own [custom operating system images](https://cloud.google.com/compute/docs/images/create-delete-deprecate-private-images). This can be a great way to ensure the instances you provision with Terraform are pre-configured based on your needs. [Packer](https://www.packer.io/) is the perfect tool for this and includes a [builder for Google Cloud](https://www.packer.io/docs/builders/googlecompute.html).

Terraform uses provisioners to upload files, run shell scripts, or install and trigger other software like configuration management tools.

### Defining a provisioner

1. To define a provisioner, modify the resource block defining the first `vm_instance` in your configuration to look like the following:
    

```apache
resource "google_compute_instance" "vm_instance" {
  name         = "terraform-instance"
  machine_type = "e2-micro"
  tags         = ["web", "dev"]

  provisioner "local-exec" {
    command = "echo ${google_compute_instance.vm_instance.name}:  ${google_compute_instance.vm_instance.network_interface[0].access_config[0].nat_ip} >> ip_address.txt"
  }

  # ...
}
```

This adds a `provisioner` block within the `resource` block. Multiple `provisioner` blocks can be added to define multiple provisioning steps. Terraform supports [many provisioners](https://www.terraform.io/docs/provisioners/index.html), but for this example you are using the `local-exec` provisioner.

The `local-exec` provisioner executes a command locally on the machine running Terraform, not the VM instance itself. You're using this provisioner versus the others so we don't have to worry about specifying any [connection info](https://www.terraform.io/docs/provisioners/connection.html) right now.

This also shows a more complex example of string interpolation than you've seen before. Each VM instance can have multiple network interfaces, so refer to the first one with `network_interface[0]`, count starting from 0, as most programming languages do. Each network interface can have multiple access\_config blocks as well, so once again you specify the first one.

2. Run `terraform apply`:
    

```apache
terraform apply
```

At this point, the output may be confusing at first.

Terraform found nothing to do - and if you check, you'll find that there's no `ip_address.txt` file on your local machine.

Terraform treats provisioners differently from other arguments. Provisioners only run when a resource is created, but adding a provisioner does not force that resource to be destroyed and recreated.

3. Use `terraform taint` to tell Terraform to recreate the instance:
    

```apache
terraform taint google_compute_instance.vm_instance
```

A tainted resource will be destroyed and recreated during the next `apply`.

4. Run `terraform apply` now:
    

```apache
terraform apply
```

5. Verify everything worked by looking at the contents of the `ip_address.txt` file.
    

It contains the IP address, just as you asked.

### Failed provisioners and tainted resources

If a resource is successfully created but fails a provisioning step, Terraform will error and mark the resource as *tainted*. A resource that is tainted still exists, but shouldn't be considered safe to use, since provisioning failed.

When you generate your next execution plan, Terraform will remove any tainted resources and create new resources, attempting to provision them again after creation.

### Destroy provisioners

Provisioners can also be defined that run only during a destroy operation. These are useful for performing system cleanup, extracting data, etc.

For many resources, using built-in cleanup mechanisms is recommended if possible (such as init scripts), but provisioners can be used if necessary.

This lab won't show any destroyed provisioner examples. If you need to use destroy provisioners, please see the [Provisioners documentation](https://www.terraform.io/docs/provisioners/).

---

## Solution of Lab

%[https://www.youtube.com/watch?v=uGnKLGmLMSw] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723516432823/f2f59d24-4d25-40d1-bf8f-7d05cf3a6cc3.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Infrastructure%20as%20Code%20with%20Terraform/quicklabgsp750.sh
sudo chmod +x quicklabgsp750.sh
./quicklabgsp750.sh
```