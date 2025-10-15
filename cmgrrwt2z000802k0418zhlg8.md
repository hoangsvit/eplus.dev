---
title: "Automating the Deployment of Networks with Terraform - GSP460"
seoTitle: "Automating the Deployment of Networks with Terraform - GSP460"
seoDescription: "Automate Google Cloud deployments with Terraform: custom networks, firewall rules, VM instances for efficient management"
datePublished: Wed Oct 15 2025 09:13:14 GMT+0000 (Coordinated Universal Time)
cuid: cmgrrwt2z000802k0418zhlg8
slug: automating-the-deployment-of-networks-with-terraform-gsp460
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1760519532948/1ae99e3e-50f7-4f88-980a-67239614dd30.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1760519548483/7caeadbf-0c30-451a-982c-d12e126c9d2e.png
tags: automating-the-deployment-of-networks-with-terraform-gsp460, automating-the-deployment-of-networks-with-terraform, gsp460

---

## Overview

In this lab, you create a Terraform configuration with a module to automate the deployment of a custom network with resources. Specifically, you deploy 3 networks with firewall rules and VM instances.

### Objectives

* Create a configuration for a custom-mode network
    
* Create a configuration for a firewall rule
    
* Create a module for VM instances
    
* Create a configuration for an auto-mode network
    
* Create and deploy a configuration
    
* Verify the deployment of a configuration
    

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    * The Open Google Cloud console button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-00-900b129a4afb@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    YEoNeVQnDGwC
    ```
    
    You can also find the Password in the Lab Details pane.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-18620985afd2`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-18620985afd2
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-00-900b129a4afb@qwiklabs.net

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
project = qwiklabs-gcp-01-18620985afd2
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Set up Terraform and Cloud Shell

Terraform enables you to safely and predictably create, change, and improve infrastructure. It is an open-source tool that codifies APIs into declarative configuration files that can be shared among team members, treated as code, edited, reviewed, and versioned.

### Initialize Terraform

Terraform uses a plugin-based architecture to support the numerous infrastructure and service providers available. Each "Provider" is its own encapsulated binary distributed separately from Terraform itself. Initialize Terraform by setting Google as the provider.

1. Create a directory for your Terraform configuration by running the following command:
    

```apache
mkdir tfnet
```

2. In Cloud Shell, click **Open Editor** to open Cloud Shell Editor. Click **Open in a new window** if required.
    
3. Expand the **tfnet** folder in the left pane of the code editor.
    
4. To create a new file in the **tfnet** folder, click **File** &gt; **New File**.
    
5. Name the new file **provider.tf**, and then open it.
    
6. Copy the code into **provider.tf**:
    
    ```apache
    provider "google" {}
    ```
    
7. Initialize Terraform by running the following commands:
    
    ```apache
    cd tfnet
    terraform init
    ```
    

The output should look like this:

```apache
* provider.google: version = "~> 3.63"
Terraform has been successfully initialized!
```

You are now ready to work with Terraform in Cloud Shell.

## Task 2. Create managementnet and its resources

Create the custom-mode network **managementnet** along with its firewall rule and VM instance (**managementnet-us-vm**).

### Configure managementnet

Create a new configuration and define **managementnet**.

1. To create a new file, click **File** &gt; **New File**.
    
2. Name the new file **managementnet.tf**, and then open it.
    
3. Copy the following base code into **managementnet.tf**:
    

```apache
# Create the managementnet network
resource [RESOURCE_TYPE] "managementnet" {
name = [RESOURCE_NAME]
#RESOURCE properties go here
}
```

This base template is a great starting point for any Google Cloud resource. The **name** field allows you to name the resource, and the **type** field allows you to specify the Google Cloud resource that you want to create. You can also define properties, but these are optional for some resources.

4. In **managementnet.tf**, replace `[RESOURCE_TYPE]` with `"google_compute_network"`.
    

**Note:** The **google\_compute\_network** resource is a VPC network. Available resources can be found on the [Google Cloud provider documentation](https://www.terraform.io/docs/providers/google/index.html). For more information on this specific resource, refer to the [Terraform documentation](https://www.terraform.io/docs/providers/google/r/compute_network.html).

5. In managementnet.tf, replace `[RESOURCE_NAME]` with `"managementnet"`.
    
6. Add the following property to **managementnet.tf**:
    

```apache
auto_create_subnetworks = "false"
```

Unlike an auto-mode network, a custom mode network does not automatically create a subnetwork in each region. Therefore, you are setting **auto\_create\_subnetworks** to `false`.

7. Verify that **managementnet.tf** looks like this:
    

```apache
 # Create managementnet network
 resource "google_compute_network" "managementnet" {
   name                    = "managementnet"
   auto_create_subnetworks = "false"
 }
```

8. To save **managementnet.tf**, click **File** &gt; **Save**.
    

### Add a subnet to managementnet

Add **managementsubnet-us** to the VPC network.

1. Add the following resource to **managementnet.tf**:
    

```apache
# Create managementsubnet-us subnetwork
resource "google_compute_subnetwork" "managementsubnet-us" {
  name          = "managementsubnet-us"
  region        = "us-east4"
  network       = google_compute_network.managementnet.self_link
  ip_cidr_range = "10.130.0.0/20"
}
```

**Note:** The **google\_compute\_subnetwork** resource is a subnet. You are specifying the name, region, VPC network and IP CIDR range for **managementsubnet-us**. For more information on this specific resource, refer to the [Terraform documentation](https://www.terraform.io/docs/providers/google/r/compute_subnetwork.html).

2. To save **managementnet.tf**, click **File** &gt; **Save**.
    

### Configure the firewall rule

Define a firewall rule to allow HTTP, SSH, RDP and ICMP traffic on managementnet.

1. Add the following base code to **managementnet.tf**:
    

```apache
# Add a firewall rule to allow HTTP, SSH, RDP and ICMP traffic on managementnet
resource [RESOURCE_TYPE] "managementnet-allow-http-ssh-rdp-icmp" {
  name = [RESOURCE_NAME]
  source_ranges = [
    "0.0.0.0/0"
  ]
#RESOURCE properties go here
}
```

2. In **managementnet.tf**, replace `[RESOURCE_TYPE]` with `"google_compute_firewall"`:
    

**Note:** The **google\_compute\_firewall** resource is a firewall rule. For more information on this specific resource, refer to the [Terraform documentation](https://www.terraform.io/docs/providers/google/r/compute_firewall.html).

3. In **managementnet.tf**, replace `[RESOURCE_NAME]` with `"managementnet-allow-http-ssh-rdp-icmp"`.
    
4. Add the following property to **managementnet.tf**:
    

```apache
network = google_compute_network.managementnet.self_link
```

**Note:** Because this firewall rule depends on its network, you are using the **google\_compute\_network.managementnet.self\_link** reference to instruct Terraform to resolve these resources in a dependent order. In this case, the network is created before the firewall rule.

5. Add the following properties to **managementnet.tf**:
    

```apache
allow {
    protocol = "tcp"
    ports    = ["22", "80", "3389"]
  }
allow {
    protocol = "icmp"
  }
```

The list of **allow** rules specify which protocols and ports are permitted.

6. Verify that your additions to **managementnet.tf** look like this:
    

```apache
# Create a firewall rule to allow HTTP, SSH, RDP and ICMP traffic on managementnet
resource "google_compute_firewall" "managementnet_allow_http_ssh_rdp_icmp" {
  name    = "managementnet-allow-http-ssh-rdp-icmp"
  source_ranges = [
    "0.0.0.0/0"
  ]
  network = google_compute_network.managementnet.self_link

  allow {
    protocol = "tcp"
    ports    = ["22", "80", "3389"]
  }

  allow {
    protocol = "icmp"
  }
}
```

7. To save **managementnet.tf**, click **File** &gt; **Save**.
    

### Configure the VM instance

Define the VM instance by creating a VM instance module. A module is a reusable configuration inside a folder. You will use this module for all VM instances of this lab.

1. To create a new folder inside **tfnet**, select the **tfnet** folder, and then click **File** &gt; **New Folder**.
    
2. Name the new folder **instance**.
    
3. To create a new file inside **instance**, select the **instance** folder, and then click **File** &gt; **New File**.
    
4. Name the new file **main.tf**, and then open it.
    

You should have the following folder structure in Cloud Shell:

![The folder structure displaying three tf files within the instance folder, which is within the tfnet folder](https://cdn.qwiklabs.com/TFj5%2FzU4WzR%2FVlqolKgzVRmkO91s5%2Fco7NEO4ydDYZQ%3D align="left")

5. Copy the following base code into **main.tf**:
    

```apache
resource [RESOURCE_TYPE] "vm_instance" {
name = [RESOURCE_NAME]
#RESOURCE properties go here
}
```

6. In **main.tf**, replace `[RESOURCE_TYPE]` with `"google_compute_instance"`.
    

**Note:** The **google\_compute\_instance** resource is a Compute Engine instance. For more information on this specific resource, refer to the [Terraform documentation](https://www.terraform.io/docs/providers/google/r/compute_instance.html).

7. In **main.tf**, replace `[RESOURCE_NAME]` with `var.instance_name`.
    

Because you will be using this module for all VM instances, you are defining the instance name as an input variable. This allows you to control the name of the variable from managementnet.tf. For more information about input variables, refer to the [Define Input Variables documentation](https://learn.hashicorp.com/terraform/getting-started/variables.html).

8. Add the following properties to **main.tf**:
    

```apache
zone         = var.instance_zone
machine_type = var.instance_type
```

These properties define the zone and machine type of the instance as input variables.

9. Add the following properties to **main.tf**:
    

```apache
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }
```

This property defines the boot disk to use the Debian 11 OS image. Because all four VM instances will use the same image, you can hard-code this property in the module.

10. Add the following properties to **main.tf**:
    

```apache
  network_interface {
    subnetwork = var.instance_subnetwork
    access_config {
      # Allocate a one-to-one NAT IP to the instance
    }
  }
```

This property defines the network interface by providing the subnetwork name as an input variable and the access configuration. Leaving the access configuration empty results in an ephemeral external IP address. For more information, see the [Terraform documentation](https://www.terraform.io/docs/providers/google/r/compute_instance.html).

11. Define the 4 input variables at the top of **main.tf** and verify that **main.tf** looks like this, including brackets `{}`:
    

```apache
variable "instance_name" {}
variable "instance_zone" {}

variable "instance_type" {
  default = "e2-standard-2"
}

variable "instance_subnetwork" {}

resource "google_compute_instance" "vm_instance" {
  name         = var.instance_name
  zone         = var.instance_zone
  machine_type = var.instance_type

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    subnetwork = var.instance_subnetwork

    access_config {
      # Allocate a one-to-one NAT IP to the instance
    }
  }
}
```

By giving **instance\_type** a default value, the variable is optional. The **instance\_name**, **instance\_zone**, and **instance\_subnetwork** are required, and you will define them in **managementnet.tf**.

12. To save **main.tf**, click **File** &gt; **Save**.
    
13. Add the following VM instance to **managementnet.tf**:
    

```apache
# Add the managementnet-us-vm instance
module "managementnet-us-vm" {
  source              = "./instance"
  instance_name       = "managementnet-us-vm"
  instance_zone       = "us-east4-c"
  instance_subnetwork = google_compute_subnetwork.managementsubnet-us.self_link
}
```

This resource is leveraging the module in the **instance** folder and provides the name, zone, and network as inputs. Because this instance depends on a VPC network, you are using the **google\_compute\_subnetwork.managementsubnet-us.self\_link** reference to instruct Terraform to resolve these resources in a dependent order. In this case, the subnet is created before the instance.

**Note:** The benefit of writing a Terraform module is that it can be reused across many configurations. Instead of writing your own module, you can also leverage existing modules from the [Terraform Module registry](https://registry.terraform.io/browse?provider=google&verified=true).

14. To save **managementnet.tf**, click **File** &gt; **Save**.
    

### Create managementnet and its resources

It's time to apply the managementnet configuration.

1. Rewrite the Terraform configurations files to a canonical format and style by running the following command:
    

```apache
terraform fmt
```

**Note:** If you get an error, revisit the previous steps to ensure that your configuration matches the lab instructions. If you cannot troubleshoot the issue of your configuration, look at these finished configurations:

* [managementnet.tf](https://storage.googleapis.com/spls/gsp460/managementnet.tf)
    
* [main.tf](https://storage.googleapis.com/spls/gsp460/main.tf)
    
* [provider.tf](https://storage.googleapis.com/spls/gsp460/provider.tf)
    

2. Initialize Terraform by running the following command:
    

```apache
terraform init
```

The output should look like this:

```apache
Initializing the backend...
...
* provider.google: version = "~> 3.63"
Terraform has been successfully initialized!
```

**Note:** If you get an error, revisit the previous steps to ensure that you have the correct folder/file structure. If you cannot troubleshoot the issue of your configuration, refer to the finished configurations linked above. When you have corrected the issue, re-run the previous command.

3. Create an execution plan by running the following command:
    

```apache
terraform plan
```

The output should look like this:

```apache
...
Plan: 4 to add, 0 to change, 0 to destroy.
...
```

Terraform determined that the following 4 resources need to be added:

| **Name** | **Description** |
| --- | --- |
| managementnet | VPC network |
| managementsubnet-us | Subnet of managementnet in `us-east4` |
| managementnet\_allow\_http\_ssh\_rdp\_icmp | Firewall rule to allow HTTP, SSH, RDP and ICMP |
| managementnet-us-vm | VM instance in `us-east4-c` |

4. Apply the desired changes by running the following command:
    

```apache
terraform apply
```

5. Confirm the planned actions by typing:
    

```apache
yes
```

The output should look like this:

```apache
...
Apply complete! Resources: 4 added, 0 changed, 0 destroyed.
```

Notice that when the VPC network is created, the firewall rule and subnet are created. After the subnet is created, the VM instance is created. That's because the firewall rule and subnet relied on the network, and the VM instance relied on the subnet through `self_link` references.

**Note:** If you get an error during the execution, revisit the previous steps to ensure that you have the correct folder/file structure. If you cannot troubleshoot the issue of your configuration, refer to the finished configurations linked above. When you have corrected the issue, re-run the previous command.

### Verify managementnet and its resources

In the Cloud Console, verify that the resources were created.

1. In the Cloud Console, select **Navigation menu** &gt; **VPC network** &gt; **VPC networks**.
    
2. View the **managementnet** VPC network with its subnetwork.
    
3. In the left pane, click **Firewall**.
    
4. View the **managementnet\_allow\_http\_ssh\_rdp\_icmp** firewall rule for the VPC network that was created.
    
5. Select **Navigation menu** &gt; **Compute Engine** &gt; **VM instances**.
    
6. Note the **managementnet-us-vm** instance.
    
7. Return to Cloud Shell.
    

Click **Check my progress** to verify the objective.

Create managementnet and its resources

## Task 3. Create privatenet and its resources

Create the custom-mode network **privatenet** along with its firewall rule and VM instance (**privatenet-us-vm**).

### Configure privatenet

Create a new configuration and define **privatenet**.

1. To create a new file in the **tfnet** folder, click **File** &gt; **New File**.
    
2. Name the new file **privatenet.tf**, and then open it.
    

You should have the following folder structure in Cloud Shell:

![The folder structure where there are four tf files in the instance folder, which is within the tfnet folder](https://cdn.qwiklabs.com/Iqn2nCK5pdbnZfIPjEe0W15v8Ue2F5tMRTGzopfDQzg%3D align="left")

3. Add the VPC network by copying the following code into **privatenet.tf**:
    

```apache
# Create privatenet network
resource "google_compute_network" "privatenet" {
  name                    = "privatenet"
  auto_create_subnetworks = false
}
```

4. Add the privatesubnet-us subnet resource to **privatenet.tf**:
    

```apache
# Create privatesubnet-us subnetwork
resource "google_compute_subnetwork" "privatesubnet-us" {
  name          = "privatesubnet-us"
  region        = "us-east4"
  network       = google_compute_network.privatenet.self_link
  ip_cidr_range = "172.16.0.0/24"
}
```

5. Add the privatesubnet-second-subnet subnet resource to **privatenet.tf**:
    

```apache
# Create privatesubnet-second-subnet subnetwork
resource "google_compute_subnetwork" "privatesubnet-second-subnet" {
  name          = "privatesubnet-second-subnet"
  region        = "us-central1"
  network       = google_compute_network.privatenet.self_link
  ip_cidr_range = "172.20.0.0/24"
}
```

6. To save **privatenet.tf**, click **File** &gt; **Save**.
    

### Configure the firewall rule

Define a firewall rule to allow HTTP, SSH, and RDP traffic on privatenet.

1. Add the firewall resource to **privatenet.tf**:
    

```apache
# Create a firewall rule to allow HTTP, SSH, RDP and ICMP traffic on privatenet
resource "google_compute_firewall" "privatenet-allow-http-ssh-rdp-icmp" {
  name    = "privatenet-allow-http-ssh-rdp-icmp"
  source_ranges = [
    "0.0.0.0/0"
  ]
  network = google_compute_network.privatenet.self_link

  allow {
    protocol = "tcp"
    ports    = ["22", "80", "3389"]
  }

  allow {
    protocol = "icmp"
  }
}
```

**Note:** Alternatively, you could create a module for the firewall rule because the only difference to the previous firewall rule is the VPC network that it applies to.

2. To save **privatenet.tf**, click **File** &gt; **Save**.
    

### Configure the VM instance

Use the instance module to configure **privatenet-us-vm**.

1. Add the VM instance resource to **privatenet.tf**:
    

```apache
# Add the privatenet-us-vm instance
module "privatenet-us-vm" {
  source              = "./instance"
  instance_name       = "privatenet-us-vm"
  instance_zone       = "us-east4-c"
  instance_subnetwork = google_compute_subnetwork.privatesubnet-us.self_link
}
```

2. To save **privatenet.tf**, click **File** &gt; **Save**.
    

### Create privatenet and its resources

It's time to apply the privatenet configuration.

1. Rewrite the Terraform configurations files to a canonical format and style by running the following command:
    

```apache
terraform fmt
```

**Note:** If you get an error, revisit the previous steps to ensure that your configuration matches the lab instructions. If you cannot troubleshoot the issue of your configuration, take a look at these finished configurations:

* [privatenet.tf](https://storage.googleapis.com/spls/gsp460/privatenet.tf)
    
* [managementnet.tf](https://storage.googleapis.com/spls/gsp460/managementnet.tf)
    
* [main.tf](https://storage.googleapis.com/spls/gsp460/main.tf)
    
* [provider.tf](https://storage.googleapis.com/spls/gsp460/provider.tf)
    

2. Initialize Terraform by running the following command:
    

```apache
terraform init
```

The output should look like this:

```apache
Initializing the backend...
...
* provider.google: version = "~> 3.63"
Terraform has been successfully initialized!
```

**Note:** If you get an error, revisit the previous steps to ensure that you have the correct folder/file structure. If you cannot troubleshoot the issue of your configuration, refer to the finished configurations linked above. When you have corrected the issue, re-run the previous command.

3. Create an execution plan by running the following command:
    

```apache
terraform plan
```

The output should look like this:

```apache
...
Plan: 5 to add, 0 to change, 0 to destroy.
...
```

Terraform determined that the following 5 resources need to be added:

| **Name** | **Description** |
| --- | --- |
| privatenet | VPC network |
| privatesubnet-us | Subnet of privatenet in `us-east4` |
| privatesubnet-second-subnet | Subnet of privatenet in `us-central1` |
| privatenet-allow-http-ssh-rdp-icmp | Firewall rule to allow HTTP, SSH, RDP and ICMP |
| privatenet-us-vm | VM instance in `us-east4-c` |

4. Apply the desired changes by running the following command:
    

```apache
terraform apply
```

5. Confirm the planned actions by typing:
    

```apache
yes
```

The output should look like this:

```apache
...
Apply complete! Resources: 5 added, 0 changed, 0 destroyed.
```

**Note:** If you get an error during the execution, revisit the previous steps to ensure that you have the correct folder/file structure. If you cannot troubleshoot the issue of your configuration, refer to the finished configurations linked above. When you have corrected the issue, re-run the previous command.

### Verify privatenet and its resources

In the Cloud Console, verify that the resources were created.

1. In the Cloud Console, select **Navigation menu** &gt; **VPC network** &gt; **VPC networks**.
    
2. View the **privatenet** VPC network with its subnetworks.
    
3. In the left pane, click **VPC network** &gt; **Firewall**.
    
4. View the **privatenet\_allow\_http\_ssh\_rdp\_icmp** firewall rule for the VPC network that was created.
    
5. Select **Navigation menu** &gt; **Compute Engine** &gt; **VM instances**.
    
6. Note the internal IP addresses for **privatenet-us-vm**.
    
7. For **managementnet-us-vm**, click **SSH** to launch a terminal and connect.
    
8. To test connectivity to **privatenet-us-vm**'s internal IP address, run the following command in the SSH terminal (replacing privatenet-us-vm's internal IP address with the value noted earlier):
    

```apache
ping -c 3 <Enter privatenet-us-vm's internal IP here>
```

**Note:** This should not work because both VM instances are on separate VPC networks!

9. Return to Cloud Shell.
    

Click **Check my progress** to verify the objective.

Create privatenet and its resources

## Task 4. Create mynetwork and its resources

Create the auto-mode network **mynetwork** along with its firewall rule and two VM instances (**mynet\_us\_vm** and **mynet\_second\_vm**).

### Configure mynetwork

Create a new configuration and define **mynetwork**.

1. To create a new file in the **tfnet** folder, click **File** &gt; **New File**.
    
2. Name the new file **mynetwork.tf**, and then open it.
    

You should have the following folder structure in Cloud Shell:

![The folder structure](https://cdn.qwiklabs.com/FW5jqqwpXDMiLy7wt9SlNmQRYA%2BNQJ98%2FbXh21U%2FfL8%3D align="left")

3. Copy the following code into **mynetwork.tf**:
    

```apache
# Create the mynetwork network
resource "google_compute_network" "mynetwork" {
name                    = "mynetwork"
#RESOURCE properties go here
}
```

4. Add the following property to **mynetwork.tf**:
    

```apache
auto_create_subnetworks = "true"
```

By definition, an auto-mode network automatically creates a subnetwork in each region. Therefore, you are setting **auto\_create\_subnetworks** to **true**.

5. Verify that **mynetwork.tf** looks like this:
    

```apache
# Create the mynetwork network
resource "google_compute_network" "mynetwork" {
  name                    = "mynetwork"
  auto_create_subnetworks = "true"
}
```

6. To save **mynetwork.tf**, click **File** &gt; **Save**.
    

### Configure the firewall rule

Define a firewall rule to allow HTTP, SSH, and RDP traffic on mynetwork.

1. Add the firewall resource to **mynetwork.tf**:
    

```apache
# Create a firewall rule to allow HTTP, SSH, RDP and ICMP traffic on mynetwork
resource "google_compute_firewall" "mynetwork-allow-http-ssh-rdp-icmp" {
  name    = "mynetwork-allow-http-ssh-rdp-icmp"
  source_ranges = [
    "0.0.0.0/0"
  ]
  network = google_compute_network.mynetwork.self_link

  allow {
    protocol = "tcp"
    ports    = ["22", "80", "3389"]
  }

  allow {
    protocol = "icmp"
  }
}
```

2. To save **mynetwork.tf**, click **File** &gt; **Save**.
    

### Configure the VM instance

Use the instance module to configure **mynetwork-us-vm** and **mynetwork-second-vm**.

1. Add the following VM instances to **mynetwork.tf**:
    

```apache
# Create the mynet-us-vm instance
module "mynet-us-vm" {
  source              = "./instance"
  instance_name       = "mynet-us-vm"
  instance_zone       = "us-east4-c"
  instance_subnetwork = google_compute_network.mynetwork.self_link
}

# Create the mynet-second-vm" instance
module "mynet-second-vm" {
  source              = "./instance"
  instance_name       = "mynet-second-vm"
  instance_zone       = "us-central1-a"
  instance_subnetwork = google_compute_network.mynetwork.self_link
}
```

2. To save **mynetwork.tf**, click **File** &gt; **Save**.
    

### Create mynetwork and its resources

It's time to apply the mynetwork configuration.

1. Rewrite the Terraform configurations files to a canonical format and style by running the following command:
    

```apache
terraform fmt
```

**Note:** If you get an error, revisit the previous steps to ensure that your configuration matches the lab instructions. If you cannot troubleshoot the issue of your configuration, take a look at these finished configurations:

* [privatenet.tf](https://storage.googleapis.com/spls/gsp460/privatenet.tf)
    
* [managementnet.tf](https://storage.googleapis.com/spls/gsp460/managementnet.tf)
    
* [mynetwork.tf](https://storage.googleapis.com/spls/gsp460/mynetwork.tf)
    
* [main.tf](https://storage.googleapis.com/spls/gsp460/main.tf)
    
* [provider.tf](https://storage.googleapis.com/spls/gsp460/provider.tf)
    

2. Initialize Terraform by running the following command:
    

```apache
terraform init
```

The output should look like this:

```apache
Initializing the backend...
...
* provider.google: version = "~> 3.63"
Terraform has been successfully initialized!
```

**Note:** If you get an error, revisit the previous steps to ensure that you have the correct folder/file structure. If you cannot troubleshoot the issue of your configuration, refer to the finished configurations linked above. When you have corrected the issue, re-run the previous command.

3. Create an execution plan by running the following command:
    

```apache
terraform plan
```

The output should look like this:

```apache
...
Plan: 4 to add, 0 to change, 0 to destroy.
...
```

Terraform determined that the following 4 resources need to be added:

| **Name** | **Description** |
| --- | --- |
| mynetwork | VPC network |
| mynetwork-allow-http-ssh-rdp-icmp | Firewall rule to allow HTTP, SSH, RDP and ICMP |
| mynet-us-vm | VM instance in `us-east4-c` |
| mynet-second-vm | VM instance in `us-central1-a` |

4. Apply the desired changes by running the following command:
    

```apache
terraform apply
```

5. Confirm the planned actions by typing:
    

```apache
yes
```

The output should look like this:

```apache
...
Apply complete! Resources: 4 added, 0 changed, 0 destroyed.
```

**Note:** If you get an error during the execution, revisit the previous steps to ensure that you have the correct folder/file structure. If you cannot troubleshoot the issue of your configuration, refer to the finished configurations linked above. When you have corrected the issue, re-run the previous command.

### Verify mynetwork and its resources

In the Cloud Console, verify that the resources were created.

1. In the Cloud Console, select **Navigation menu** &gt; **VPC network** &gt; **VPC networks**.
    
2. View the **mynetwork** VPC network with its subnetworks.
    
3. In the left pane, click **Firewall**.
    
4. View the **mynetwork-allow-http-ssh-rdp-icmp** firewall rule for the VPC network that was created.
    
5. Select **Navigation menu** &gt; **Compute Engine** &gt; **VM instances**.
    
6. View the **mynet-us-vm** and **mynet-second-vm** instances.
    
7. Note the internal IP addresses for **mynet-second-vm**.
    
8. For **mynet-us-vm**, click **SSH** to launch a terminal and connect.
    
9. To test connectivity to **mynet-second-vm**'s internal IP address, run the following command in the SSH terminal (replacing mynet-second-vm's internal IP address with the value noted earlier):
    

```apache
ping -c 3 <Enter mynet-second-vm's internal IP here>
```

**Note:** This should work because both VM instances are on the same network, and ICMP traffic is allowed!

Click **Check my progress** to verify the objective.

Create mynetwork and its resources

---

## Solution of Lab

%[https://youtu.be/Vd6U-87WKYg] 

```apache
export ZONE=
export ZONE2=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1760519503078/8a35594b-5f07-4a9d-9c67-a73a1017046a.png align="center")

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP460/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Automating%20the%20Deployment%20of%20Networks%20with%20Terraform/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```