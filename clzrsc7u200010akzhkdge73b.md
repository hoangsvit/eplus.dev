---
title: "Terraform Fundamentals - GSP156"
seoTitle: "Terraform Fundamentals - GSP156"
seoDescription: "Terraform enables you to safely and predictably create, change, and improve infrastructure. It is an open source tool that codifies APIs into declarative co"
datePublished: Tue Aug 13 2024 02:10:13 GMT+0000 (Coordinated Universal Time)
cuid: clzrsc7u200010akzhkdge73b
slug: terraform-fundamentals-gsp156
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750297116144/a3653cda-e00d-48d3-a05f-fe83722c36f4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1750297134822/3a252783-80ed-4403-9256-be6b406717ed.png
tags: terraform, terraform-fundamentals, terraform-fundamentals-gsp156, gsp1262

---

## **Overview**

Terraform enables you to safely and predictably create, change, and improve infrastructure. It is an open source tool that codifies APIs into declarative configuration files that can be shared among co-workers, treated as code, edited, reviewed, and versioned.

## **Objectives**

In this lab, you will learn how to perform the following tasks:

* Get started with Terraform in Google Cloud.
    
* Install Terraform from installation binaries.
    
* Create a VM instance infrastructure using Terraform.
    

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
    
    ```xml
    student-04-cffb1d80cf0f@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```xml
    SR0bolGeLCvV
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-e19aa2b3d4d2`. The output contains a line that declares the **Project\_ID** for this session:

```plaintext
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-e19aa2b3d4d2
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
ACCOUNT: student-04-cffb1d80cf0f@qwiklabs.net

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
project = qwiklabs-gcp-02-e19aa2b3d4d2
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **What is Terraform?**

Terraform is a tool for building, changing, and versioning infrastructure safely and efficiently. Terraform can manage existing, popular service providers and custom in-house solutions.

Configuration files describe to Terraform the components needed to run a single application or your entire data center. Terraform generates an execution plan describing what it will do to reach the desired state, and then executes it to build the described infrastructure. As the configuration changes, Terraform can determine what changed and create incremental execution plans that can be applied.

The infrastructure Terraform can manage includes both low-level components such as compute instances, storage, and networking, and high-level components such as DNS entries and SaaS features.

### Key features

#### **Infrastructure as code**

Infrastructure is described using a high-level configuration syntax. This allows a blueprint of your data center to be versioned and treated as you would any other code. Additionally, infrastructure can be shared and re-used.

#### **Execution plans**

Terraform has a planning step in which it generates an execution plan. The execution plan shows what Terraform will do when you execute the `apply` command. This lets you avoid any surprises when Terraform manipulates infrastructure.

#### **Resource graph**

Terraform builds a graph of all your resources and parallelizes the creation and modification of any non-dependent resources. Because of this, Terraform builds infrastructure as efficiently as possible, and operators get insight into dependencies in their infrastructure.

#### **Change automation**

Complex changesets can be applied to your infrastructure with minimal human interaction. With the previously mentioned execution plan and resource graph, you know exactly what Terraform will change and in what order, which helps you avoid many possible human errors.

## **Task 1. Verifying Terraform installation**

Terraform comes pre-installed in Cloud Shell.

* Open a new Cloud Shell tab, and verify that Terraform is available:
    

```apache
terraform
```

The resulting help output should be similar to this:

```apache
Usage: terraform [--version] [--help]  [args]

The available commands for execution are listed below. The most common, useful commands are shown first, followed by less common or more advanced commands. If you're just getting started with Terraform, stick with the common commands. For the other commands, please read the help and docs before usage.

Common commands: apply Builds or changes infrastructure console Interactive console for Terraform interpolations destroy Destroy Terraform-managed infrastructure env Workspace management fmt Rewrites config files to canonical format get Download and install modules for the configuration graph Create a visual graph of Terraform resources import Import existing infrastructure into Terraform init Initialize a Terraform working directory output Read an output from a state file plan Generate and show an execution plan providers Prints a tree of the providers used in the configuration push Upload this Terraform module to Atlas to run refresh Update local state file against real resources show Inspect Terraform state or plan taint Manually mark a resource for recreation untaint Manually unmark a resource as tainted validate Validates the Terraform files version Prints the Terraform version workspace Workspace management

All other commands: debug Debug output management (experimental) force-unlock Manually unlock the terraform state state Advanced state management
```

## **Task 2. Build infrastructure**

With Terraform installed, you can immediately start creating some infrastructure.

### Configuration

The set of files used to describe infrastructure in Terraform is simply known as a `Terraform configuration`. In this section, you will write your first configuration to launch a single VM instance. The format of the configuration files can be found in the [Terraform Language Documentation](https://www.terraform.io/docs/configuration/index.html). We recommend using JSON for creating configuration files.

1. In Cloud Shell, create an empty configuration file named `instance.tf` with the following command:
    

```apache
touch instance.tf
```

Click **Open Editor** on the Cloud Shell toolbar.  
To switch between Cloud Shell and the code editor, click **Open Editor** or **Open Terminal** as required, or click **Open in a new window** to leave the Editor open in a separate tab.

2. Click the `instance.tf` file and add the following content in it, replacing `<PROJECT_ID>` with your Google Cloud project ID:
    

```apache
resource "google_compute_instance" "terraform" {
  project      = "qwiklabs-gcp-02-e19aa2b3d4d2"
  name         = "terraform"
  machine_type = "e2-medium"
  zone         = "us-west1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
    access_config {
    }
  }
}
```

This is a complete configuration that Terraform is ready to apply. The general structure should be intuitive and straightforward.

The "resource" block in the `instance.tf` file defines a resource that exists within the infrastructure. A resource might be a physical component such as an VM instance.

The resource block has two strings before opening the block: the **resource type** and the **resource name**. For this lab, the resource type is `google_compute_instance` and the name is `terraform.` The prefix of the type maps to the provider: `google_compute_instance` automatically tells Terraform that it is managed by the `Google` provider.

Within the resource block itself is the configuration needed for the resource.

4. In Cloud Shell, verify that your new file has been added and that there are no other `*.tf` files in your directory, because Terraform loads all of them:
    

```apache
ls
```

### Initialization

The first command to run for a new configuration—or after checking out an existing configuration from version control—is `terraform init`. This will initialize various local settings and data that will be used by subsequent commands.

Terraform uses a plugin-based architecture to support the numerous infrastructure and service providers available. Each "provider" is its own encapsulated binary that is distributed separately from Terraform itself. The `terraform init` command will automatically download and install any provider binary for the providers to use within the configuration, which in this case is just the Google provider.

1. Download and install the provider binary:
    

```apache
terraform init
```

The Google provider plugin is downloaded and installed in a subdirectory of the current working directory, along with various other book keeping files. You will see an "Initializing provider plugins" message. Terraform knows that you're running from a Google project, and it is getting Google resources.

```apache
Installing hashicorp/google v4.77.0...
```

**Note:** Your version number may be higher.

The output specifies which version of the plugin is being installed and suggests that you specify this version in future configuration files to ensure that `terraform init` will install a compatible version.

2. Create an execution plan:
    

```apache
terraform plan
```

Terraform performs a refresh, unless explicitly disabled, and then determines what actions are necessary to achieve the desired state specified in the configuration files. This command is a convenient way to check whether the execution plan for a set of changes matches your expectations without making any changes to real resources or to the state. For example, you might run this command before committing a change to version control, to create confidence that it will behave as expected.

**Note:** The optional `-out` argument can be used to save the generated plan to a file for later execution with `terraform apply`.

### Apply changes

1. In the same directory as the `instance.tf` file you created, run this command:
    

```apache
terraform apply
```

This output shows the Execution Plan, which describes the actions Terraform will take in order to change real infrastructure to match the configuration. The output format is similar to the diff format generated by tools like Git.

There is a `+` next to `google_compute_instance.terraform`, which means that Terraform will create this resource. Following that are the attributes that will be set. When the value displayed is `<computed>`, it means that the value won't be known until the resource is created.

**Example output:**

```apache
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # google_compute_instance.default will be created
  + resource "google_compute_instance" "default" {
      + can_ip_forward       = false
      + cpu_platform         = (known after apply)
      + deletion_protection  = false
      + guest_accelerator    = (known after apply)
      + id                   = (known after apply)
      + instance_id          = (known after apply)
      + label_fingerprint    = (known after apply)
      + machine_type         = "e2-medium"
      + metadata_fingerprint = (known after apply)
      + name                 = "terraform"
      + project              = "qwiklabs-gcp-42390cc9da8a4c4b"
      + self_link            = (known after apply)
      + tags_fingerprint     = (known after apply)
      + zone                 = "us-west1-c"

      + boot_disk {
          + auto_delete                = true
          + device_name                = (known after apply)
          + disk_encryption_key_sha256 = (known after apply)
          + kms_key_self_link          = (known after apply)
          + source                     = (known after apply)

          + initialize_params {
              + image  = "debian-cloud/debian-11"
              + labels = (known after apply)
              + size   = (known after apply)
              + type   = (known after apply)
            }
        }

      + network_interface {
          + address            = (known after apply)
          + name               = (known after apply)
          + network            = "default"
          + network_ip         = (known after apply)
          + subnetwork         = (known after apply)
          + subnetwork_project = (known after apply)

          + access_config {
              + assigned_nat_ip = (known after apply)
              + nat_ip          = (known after apply)
              + network_tier    = (known after apply)
            }
        }

      + scheduling {
          + automatic_restart   = (known after apply)
          + on_host_maintenance = (known after apply)
          + preemptible         = (known after apply)

          + node_affinities {
              + key      = (known after apply)
              + operator = (known after apply)
              + values   = (known after apply)
            }
        }

    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions? Terraform will perform the actions described above. Only 'yes' will be accepted to approve.

Enter a value:
```

If the plan was created successfully, Terraform will now pause and wait for approval before proceeding. In a production environment, if anything in the Execution Plan seems incorrect or dangerous, it's safe to cancel here. No changes have been made to your infrastructure.

2. For this case the plan looks acceptable, so type `yes` at the confirmation prompt to proceed.  
    Executing the plan will take a few minutes because Terraform waits for the VM instance to become available.
    

After this, Terraform is all done!

**Test completed task**

Click **Check my progress** to verify your performed task. If you have completed the task successfully, you will receive an assessment score.

Create a VM instance in the `us-west1` zone with Terraform.

**Check my progress**

3. In the Google Cloud Console, on the **Navigation menu**, click **Compute Engine** &gt; **VM instances**. The **VM instances** page opens and you'll see the VM instance you just created in the **VM instances** list.
    

Terraform has written some data into the `terraform.tfstate` file. This state file is extremely important: it keeps track of the IDs of created resources so that Terraform knows what it is managing.

4. In Cloud Shell, inspect the current state:
    

```apache
terraform show
```

**Example output:**

```apache
# google_compute_instance.default:
resource "google_compute_instance" "default" {
    can_ip_forward       = false
    cpu_platform         = "Intel Haswell"
    deletion_protection  = false
    guest_accelerator    = []
    id                   = "terraform"
    instance_id          = "3408292216444307052"
    label_fingerprint    = "42WmSpB8rSM="
    machine_type         = "e2-medium"
    metadata_fingerprint = "s6I5s2tjfKw="
    name                 = "terraform"
    project              = "qwiklabs-gcp-42390cc9da8a4c4b"
    self_link            = "https://www.googleapis.com/compute/v1/projects/qwiklabs-gcp-42390cc9da8a4c4b/zones/{{{project_0.default_zone}}}/instances/terraform"
    tags_fingerprint     = "42WmSpB8rSM="
    zone                 = "{{{project_0.default_zone}}}"

    boot_disk {
        auto_delete = true
        device_name = "persistent-disk-0"
        source      = "https://www.googleapis.com/compute/v1/projects/qwiklabs-gcp-42390cc9da8a4c4b/zones/{{{project_0.default_zone}}}/disks/terraform"

....
```

You can see that by creating this resource, you've also gathered a lot of information about it. These values can be referenced to configure additional resources or outputs.

Congratulations! You've built your first infrastructure with Terraform. You've seen the configuration syntax and an example of a basic execution plan and understand the state file.

## **Task 3. Test your understanding**

The following multiple choice questions should reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

Terraform enables you to safely and predictably create, change, and improve infrastructure.

* True
    
* False
    

With Terraform, you can create your own custom provider plugins.

* True
    
* False
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=u6UU3tI6wPw] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1750297182223/905a6f39-be2d-4c4c-b70a-5ca8028710f6.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Terraform%20Fundamentals/quicklabgsp156.sh
sudo chmod +x quicklabgsp156.sh
./quicklabgsp156.sh
```