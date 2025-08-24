---
title: "SAP Landing Zone: Plan and Deploy the SAP Network - GSP1068"
seoTitle: "SAP Landing Zone: Plan and Deploy the SAP Network - GSP1068"
seoDescription: "Learn to deploy SAP Landing Zones on Google Cloud with network tasks like creating VPCs, subnets, and configuring firewalls"
datePublished: Sun Aug 24 2025 09:18:34 GMT+0000 (Coordinated Universal Time)
cuid: cmeph7d9v000102l8hu6b22vm
slug: sap-landing-zone-plan-and-deploy-the-sap-network-gsp1068
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756026742177/24abb8c3-45a9-4ef6-ab47-74d8081fc90f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756027061373/a32315e2-703a-4b3a-9bcc-884a80428a6d.png
tags: sap-landing-zone-plan-and-deploy-the-sap-network-gsp1068, sap-landing-zone-plan-and-deploy-the-sap-network, gsp1068, sap-network

---

## Overview

In this lab, you will learn about the key network related activities involved in deploying the various Google Cloud services and resources required for building the majority of SAP *Landing Zones* on Google Cloud.

The tasks of this lab are based on activities required to plan & deploy a network to host a provided mock SAP estate.

**Note:** Building a SAP Landing Zone requires a number of Google Cloud resources to be deployed. It is **not** the goal of this lab to reduce the design process/effort required to define a customer specific “SAP Landing Zone” into a set of prescriptive steps which can be executed to deploy an enterprise-ready “SAP Landing Zone” in an end-to-end manner. Please refer to the “lab pre-reading” material for more information.

## Objectives

In this lab, you will learn how to:

* Create “VPC network(s)”
    
* Create VPC “subnet(s)”
    
* Create VPC network “firewall rules” to allow network wide user access
    
* Create VPC network “firewall rules” to allow inter-environment access between SAP systems (e.g.: between all Dev systems)
    
* Create VPC network “firewall rules” to allow inter-system access between components of a single SAP system (e.g.: between DB and app components of a single SAP system)
    
* Reserve static “IP address(s)”
    
* Create a “Cloud NAT service”
    

## Setup and requirements

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
    student-01-d762efc1288d@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    DePzvxLPnEXP
    ```
    
    Copied!
    
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-4dcb849bf7bc`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-4dcb849bf7bc
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

Copied!

3. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-01-d762efc1288d@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

4. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

Copied!

**Output:**

```apache
[core]
project = qwiklabs-gcp-01-4dcb849bf7bc
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Prerequisites

Although not mandatory, to maximize your learning in this lab, the following labs should be completed first:

* Cloud Foundation Toolkit (CFT) Training: Getting Started
    

## Executing activities in this lab

This lab will focus on the following “Landing Zone” topic areas:

* Google Cloud services and resources to be deployed
    

This lab will cover sample key activities which will be involved in deploying the various Google Cloud services and resources involved in building the majority of "SAP Landing Zones" on Google Cloud.

The activities in this lab will build on each other, therefore it will be required to work through the activities in the order they are stated. This is intentional as it is representative of real world scenarios in which there will be dependencies between Google Cloud resources and highlights the need to work accurately as performing corrective action could be very effort intensive.

Google Cloud supports many different options which can be used to deploy Google Cloud resources. These include but are not limited to:

* Manually via the Google Cloud Console
    
* Command line (e.g. gcloud, gsutil, etc.)
    
* API calls
    
* Various programming languages (e.g. Go, Java, Node.js, Python)
    
* Infrastructure as Code tools (e.g. Terraform)
    

Which option(s) will be adopted for a customer specific “SAP *Landing Zone*” would be defined during the design process.

In this lab it is assumed that all activities will be executed from the command line and the required command line instructions will be provided. However students may opt to use any supported option to perform the activities. Where available, links to the relevant “quickstart” online documentation will be provided which will include syntax instructions for the other options.

In this lab a sample naming convention will be provided for all resources (please reference the naming convention section and table provided in the pre-reading material for more information). The bulk of the activities will need the Google Cloud resources to be deployed in accordance with the naming convention and the configuration specifications provided as this will be representative of what would be expected in real world scenarios. Various activities in these labs will only be marked as completed if they are fully compliant to both the expected naming and the stated configuration specifications.

### Parameter value color coding key:

To help you understand what the various parameter values relate to, the following color coding of the parameter values has been adopted:

* Green = refers to the ID of the resource being created
    
* Orange = refers to free text entry, generally used for descriptions
    
* Blue = refers to the ID of a resource which has previously been created
    
* Purple = refers to a configuration parameter of the resource being created
    

## Timekeeping

This lab is time restricted to 60 min. At the end of the time the lab environment will automatically shutdown and any resources deployed will be erased. Recommensing the lab will require all tasks to be executed afresh.

In order to ensure you have sufficient time to complete all the tasks, before clicking **Start Lab** it is highly advisable that you:

* Read through all the tasks of the lab
    
* Decide which option you want to use to deploy the Google Cloud resources
    
* Prepare the deployment code and tooling to be executed
    

## Mock SAP Estate

To help the student be able to both visualize and relate the activities in this lab back to their own SAP estates, a mock SAP estate has been provided on which all activities of this lab will be based.

### SAP Estate Overview

The below table outlines the key configuration of the attributes of the SAP estate this lab will be based on. The table should be referenced in combination with the naming convention table provided in the pre-reading material.

The table outlines in yellow the components which will be deployed by the activities of this lab.

![deploy_activities.png](https://cdn.qwiklabs.com/whcV%2BiShPJXj%2Bnig0i67%2Fl9AAjp7uxiaI6GM%2B%2BQbNqo%3D align="left")

## Lab pre-read material: “SAP on Google Cloud” onboarding

For additional real world conditions information about the customer cloud “onboarding” journey of the customer, you are advised to read the [“Lab pre-read: “SAP on Cloud” onboarding”](https://www.cloudskillsboost.google/instructions/3068910/download) material.

**Note:** If you wish to obtain the “SAP landing zone” skill badge, you will be required to read and answer a series of questions related to this pre-reading material.

## Task 1. Create “VPC network(s)”

Depending on network design patterns adopted in the customer environment there may be a need to deploy one or more VPC networks with at least 1 subnet to meet the network design requirements.

### Real world considerations:

As mentioned in the pre-reading material, “network configuration” design is one of the “cloud foundations” topics.

There are many supported VPC network design patterns each with their own PROs, CONs and constraints. In real world scenarios customers should carefully evaluate their network design requirements to best address their specific needs across all current and future workloads. This activity should be performed with suitably skilled network specialists so as to ensure the appropriate network design is adopted.

Changing the network design at a later stage could be both very disruptive and labor intensive.

**Note:** It is extremely rare in real world scenarios that a VPC network design would be based on only hosting a SAP estate.

### Online Documentation:

* [Quickstart - Create a custom mode VPC network with only IPv4 subnets](https://cloud.google.com/vpc/docs/create-modify-vpc-networks#create-custom-network)
    
* [Command line - gcloud compute networks create](https://cloud.google.com/sdk/gcloud/reference/compute/networks/create)
    
* [Terraform resource to create a network (google\_compute\_network)](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_network)
    
* [Terraform view on GitHub - terraform-google-modules/terraform-google-network/examples/basic\_custom\_mode/main.tf](https://github.com/terraform-google-modules/terraform-google-network/tree/c9828d0946e7640e2bcef24a6a5b8c87d746f825/examples/basic_custom_mode)
    

### Dependencies:

In order to be able to successfully deploy the required “**VPC network(s)**” the following dependencies will need to be correctly deployed before proceeding with this activity:

* Google Cloud account setup
    
* IAM setup
    
* Resource hierarchy setup
    
* Google Cloud project to host VPC setup
    

### Naming Convention:

* ID:
    
    * Character limit: 62
        
    * Structure: &lt;01&gt;&lt;02&gt;**\-vpc--**&lt;03&gt;**\-**&lt;04&gt;
        

                             &lt;01&gt; - company id

                             &lt;02&gt; - business entity id

                             &lt;03&gt; - vpc short description

                             &lt;04&gt; - vpc count identifier

* Description:
    
    * Character limit: unlimited
        
    * Structure: “&lt;01&gt;**\-**&lt;02&gt; **VPC network =** &lt;03&gt; **-** &lt;04&gt;”
        

                             &lt;01&gt; - Company

                             &lt;02&gt; - Business entity ID

                             &lt;03&gt; - VPC description

                             &lt;04&gt; - VPC count identifier

### Resources to be created (Count = 1):

Using any supported method deploy the “**VPC Network(s)**” with the following configuration details:

#01 of 01:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xall-vpc--vpc-01** |
| VPC description | XYZ-all VPC network = Standard VPC network - 01 |
| Subnet mode | custom |
| Routing mode | global |

### Command line:

Command 01 of 01 - Create a “**VPC network**”:

```apache
gcloud compute networks create [insert ID here] \
    --description="[insert VPC description here]" \
    \
    --project=[insert your Project ID here] \
    \
    --subnet-mode=[insert subnet mode here] \
    --bgp-routing-mode=[insert routing mode here] \
    --mtu=1460
```

Copied!

(Example output)

```apache
Created [https://www.googleapis.com/compute/v1/projects/[project ID]/global/networks/[VPC network ID]].
NAME: [VPC network ID]
SUBNET_MODE: [VPC subnet mode]
BGP_ROUTING_MODE: [VPC routing mode]
IPV4_RANGE:
GATEWAY_IPV4:

Instances on this network will not be reachable until firewall rules
are created. As an example, you can allow all internal traffic between
instances as well as SSH, RDP, and ICMP by running:

$ gcloud compute firewall-rules create <firewall_name> --network xall-vpc--vpc-01 --allowtcp,udp,icmp --source-ranges <ip_range>
$ gcloud compute firewall-rules create <firewall_name> --network xall-vpc--vpc-01 --allowtcp:22,tcp:3389,icmp
</firewall_name></ip_range></firewall_name>
```

### Review and validate in the Cloud Console:

Confirm the “**VPC network(s)**” have been deployed in the Cloud Console using the following path “[Navigation menu -&gt; NETWORKING -&gt; VPC network -&gt; VPC networks](https://console.cloud.google.com/networking/networks/list?authuser=1)”.

![vpc_summary](https://cdn.qwiklabs.com/eU4eUnRcbqWWRX5nCwoxBk1ROIbZgGZak6GxCAuJz6g%3D align="left")

Click **Check my progress** to verify the objective.

Create “VPC” network(s)

## Task 2. Create VPC “subnet(s)”

As new SAP environments (e.g.: DR) or SAP operational landscapes (e.g. Project landscape) are deployed so there may be a need to add additional subnets to an existing VPC network.

### Real world considerations:

There are many factors which may influence the subnet layout within a VPC network.

Subnet creation and maintenance are typically managed by a central network administration team(s) who ensure the appropriate security and design standards are enforced. Normally the SAP team will need to liaise with network administration team(s) to define the workload specific subnet layout under real world conditions.

The subnet layout provided in this lab is based on commonly observed real world scenarios but each customer should evaluate their own environment before deploying subnets and resources to them.

**Note:** Changing the subnet layout at a later stage could be both very disruptive as well as labor intensive.

### Online Documentation:

* [Quickstart - Add an IPv4 only subnet](https://cloud.google.com/vpc/docs/create-modify-vpc-networks#add-subnets)
    
* [Command line - gcloud compute networks subnets create](https://cloud.google.com/sdk/gcloud/reference/compute/networks/subnets/create)
    
* [Terraform resource to create a network (google\_compute\_network)](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_network)
    
* [Terraform view on GitHub - terraform-google-modules/terraform-google-network/examples/simple\_project/main.tf](https://github.com/terraform-google-modules/terraform-google-network/blob/HEAD/examples/simple_project/main.tf)
    

### Dependencies:

In order to be able to successfully deploy the required VPC “**subnet(s)**” the following dependencies will need to be correctly deployed before proceeding with this activity:

* Google Cloud account setup
    
* IAM setup
    
* Resource hierarchy setup
    
* Google Cloud project to host VPC setup
    
* VPC network(s) deployed
    

### Naming Convention:

* ID:
    
    * Character limit: 62
        
    * Structure: &lt;01&gt;&lt;02&gt;**\-subnet--**&lt;03&gt;**\-**&lt;04&gt;**\-**&lt;05&gt;**\--**&lt;06&gt;**\-**&lt;07&gt;
        

                             &lt;01&gt; - company id

                             &lt;02&gt; - business entity id

                             &lt;03&gt; - workload id

                             &lt;04&gt; - operational area id

                             &lt;05&gt; - environment id

                             &lt;06&gt; - hosting region id

                             &lt;07&gt; - subnet count identifier

* Description:
    
    * Character limit: unlimited
        
    * Structure: ”&lt;01&gt;**\-**&lt;02&gt; **subnet =** &lt;03&gt;**\-**&lt;04&gt;**\-**&lt;05&gt; **-** &lt;06&gt; **-** &lt;07&gt;”
        

                             &lt;01&gt; - Company

                             &lt;02&gt; - Business entity ID

                             &lt;03&gt; - Workload ID

                             &lt;04&gt; - Operational area ID

                             &lt;05&gt; - Environment ID

                             &lt;06&gt; - Hosting region ID

                             &lt;07&gt; - subnet count identifier

### Resources to be created (Count = 1):

Using any supported method deploy the VPC “**subnets(s)**” with the following configuration details:

#01 of 01:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xgl-subnet--cerps-bau-nonprd--be1-01** |
| Description | XYZ-Global subnet = CERPS-BaU-NonProd - Belgium 1 (GCP) - 01 |
| VPC network | xall-vpc--vpc-01 |
| Region | `us-east4` |
| IP range | 10.1.1.0/24 |

### Command line:

Command 01 of 01 - Create a VPC “**subnet**”:

```apache
gcloud compute networks subnets create [insert ID here] \
    --description="[insert description here]" \
    \
    --project=[insert your Google Cloud project ID here] \
    --network=[insert VPC network here] \
    --region=[insert region here] \
    \
    --range=[insert IP range here] \
    --enable-private-ip-google-access \
    --enable-flow-logs
```

Copied!

(Example output)

```apache
Created [https://www.googleapis.com/compute/v1/projects/[project ID]/regions/[region ID]/subnetworks/[VPC subnet ID]].
NAME: [VPC subnet ID]
REGION: [region ID]
NETWORK: [VPC network ID]
RANGE: [IP range]
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
INTERNAL_IPV6_PREFIX:
EXTERNAL_IPV6_PREFIX:
```

#### Review and validate in the Cloud Console:

Confirm the VPC “**subnet(s)**” have been deployed in the Cloud Console using the following path “[Navigation menu -&gt; NETWORKING -&gt; VPC network -&gt; VPC networks](https://console.cloud.google.com/networking/networks/list?authuser=1)”.

![subnet_summary](https://cdn.qwiklabs.com/WscEhGtq8kjoZciRXeSHqQI7RsK0gCeNDRlEOUYZ3SI%3D align="left")

Click **Check my progress** to verify the objective.

Create VPC “subnet(s)”

## Task 3. Create VPC “firewall rule(s) - user access”

All SAP hosted resources required network access. VPC firewall rules are required to be defined to secure what network access is permissible. Network wide firewall rules will be required to enable various user access.

### Real world considerations:

VPC firewall rules are typically managed by a central network administration team(s) who ensure appropriate security standards are enforced. Normally the SAP team will need to liaise with network administration team(s) to define the workload specific VPC firewall rules for “user access”, “environment wide access” & “inter-system access” under real world conditions.

Google Cloud supports different options for defining VPC firewall rules each with their own PROs, CONs and constraints. Google Cloud resources support being protected by multiple VPC firewall rules defined using multiple different options.

**Note:** In this lab “firewall tags” will be used as it is often the most scalable and manageable solution to managing network access within SAP estates.

### Online Documentation:

* [Quickstart - Creating firewall rules](https://cloud.google.com/vpc/docs/using-firewalls#creating_firewall_rules)
    
* [Command line - gcloud compute firewall-rules create](https://cloud.google.com/sdk/gcloud/reference/compute/firewall-rules/create)
    
* [Terraform resource to create a firewall rule (google\_compute\_firewall)](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall)
    
* [Terraform view on GitHub - terraform-google-modules/terraform-google-network/ examples/basic\_firewall\_rule/main.tf](https://github.com/terraform-google-modules/terraform-google-network/blob/HEAD/examples/basic_firewall_rule/main.tf)
    
* [SAP Help - TCP/IP Ports of All SAP Products](https://help.sap.com/docs/Security/575a9f0e56f34c6e8138439eefc32b16/616a3c0b1cc748238de9c0341b15c63c.html?locale=en-US)
    

### Dependencies:

In order to be able to successfully deploy the required VPC “**firewall rule(s)**” the following dependencies will need to be correctly deployed before proceeding with this activity:

* Google Cloud account setup
    
* IAM setup
    
* Resource hierarchy setup
    
* Google Cloud project to host VPC setup
    
* VPC network(s) deployed
    

### Naming Convention:

* ID:
    
    * Character limit: 62
        
    * Structure: &lt;01&gt;**\--**&lt;02&gt;&lt;03&gt;**\-fw--user--**&lt;04&gt;**\--**&lt;05&gt;**\--v**&lt;06&gt;
        

                             &lt;01&gt; - vpc id

                             &lt;02&gt; - company id

                             &lt;03&gt; - business entity id

                             &lt;04&gt; - firewall action id

                             &lt;05&gt; - user access short description

                             &lt;06&gt; - firewall version no.

* Description:
    
    * Character limit: unlimited
        
    * Structure: ”&lt;01&gt; **-** &lt;02&gt;**\-**&lt;03&gt; **firewall rule = User access -** &lt;04&gt; &lt;05&gt; **- version** &lt;06&gt;”
        

                             &lt;01&gt; - VPC ID

                             &lt;02&gt; - Company

                             &lt;03&gt; - Business entity ID

                             &lt;04&gt; - Firewall ACTION

                             &lt;05&gt; - User access description

                             &lt;06&gt; - firewall version no.

### Resources to be created (Count = 4):

Using any supported method deploy the VPC “**firewall rule(s)**” with the following configuration details:

#01 of 04:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xall-vpc--vpc-01--xall-fw--user--a--linux--v01** |
| Description | xall-vpc--vpc-01 - XYZ-all firewall rule = User access - ALLOW standard linux access - version 01 |
| VPC network | xall-vpc--vpc-01 |
| Priority | 1000 |
| Direction | ingress |
| Action | allow |
| Target tags | xall-vpc--vpc-01--xall-fw--user--a--linux--v01 |
| Source filter | source-ranges |
| Source | 0.0.0.0/0 |
| Network ports | tcp:22,icmp |

#02 of 04:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xall-vpc--vpc-01--xall-fw--user--a--windows--v01** |
| Description | xall-vpc--vpc-01 - XYZ-all firewall rule = User access - ALLOW standard windows access - version 01 |
| VPC network | xall-vpc--vpc-01 |
| Priority | 1000 |
| Direction | ingress |
| Action | allow |
| Target tags | xall-vpc--vpc-01--xall-fw--user--a--windows--v01 |
| Source filter | source-ranges |
| Source | 0.0.0.0/0 |
| Network ports | tcp:3389,icmp |

#03 of 04:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xall-vpc--vpc-01--xall-fw--user--a--sapgui--v01** |
| Description | xall-vpc--vpc-01 - XYZ-all firewall rule = User access - ALLOW SAPGUI access - version 01 |
| VPC network | xall-vpc--vpc-01 |
| Priority | 1000 |
| Direction | ingress |
| Action | allow |
| Target tags | xall-vpc--vpc-01--xall-fw--user--a--sapgui--v01 |
| Source filter | source-ranges |
| Source | 0.0.0.0/0 |
| Network ports | tcp:3200-3299,tcp:3600-3699 |

#04 of 04:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xall-vpc--vpc-01--xall-fw--user--a--sap-fiori--v01** |
| Description | xall-vpc--vpc-01 - XYZ-all firewall rule = User access - ALLOW SAP Fiori access - version 01 |
| VPC network | xall-vpc--vpc-01 |
| Priority | 1000 |
| Direction | ingress |
| Action | allow |
| Target tags | xall-vpc--vpc-01--xall-fw--user--a--sap-fiori--v01 |
| Source filter | source-ranges |
| Source | 0.0.0.0/0 |
| Network ports | tcp:80,tcp:8000-8099,tcp:443,tcp:4300-44300 |

### Command line:

Command 01 of 01 - Create a VPC “**firewall rule**”:

```apache
gcloud compute firewall-rules create [insert ID here] \
    --description="[insert description here]" \
    \
    --project=[insert your Google Cloud project ID here] \
    --network=[insert VPC network here] \
    \
    --priority=[insert priority here] \
    --direction=[insert direction here] \
    --action=[insert action here] \
    --target-tags=[insert target tags here] \
    --[insert source filter here]=[insert source here] \
    --rules=[insert network ports here]
```

Copied!

(Example output)

```apache
Creating firewall...working..Created [https://www.googleapis.com/compute/v1/projects/[project ID]/global/firewalls/[firewall rule ID]].
Creating firewall...done.
NAME: [firewall rule ID]
NETWORK: [VPC network ID]
DIRECTION: [INGRESS
PRIORITY: [priority]
ALLOW: [network ports]
DENY:
DISABLED: False
```

### Review and validate in the Cloud Console:

Confirm the VPC “**firewall rule(s)**” have been deployed in the Cloud Console using the following path “[Navigation menu -&gt; NETWORKING -&gt; VPC network -&gt; Firewall](https://console.cloud.google.com/networking/firewalls/list?authuser=1)”.

![fw_user_summary](https://cdn.qwiklabs.com/MQd5lhkcK%2BV%2BqL0sZzPHF0etDPsr%2BqHZiYiz%2FcB5in8%3D align="left")

Click **Check my progress** to verify the objective.

Create VPC “firewall rule(s) - user access”

## Task 4. Create VPC “firewall rule(s) - environment access”

All SAP hosted resources required network access. VPC firewall rules are required to be defined to secure what network access is permissible. Environment wide firewall rules will be required to enable communication between SAP systems within the same environment. This access should be restricted to the standard SAP ports.

### Real world considerations:

VPC firewall rules are typically managed by a central network administration team(s) who ensure appropriate security standards are enforced. Normally the SAP team will need to liaise with network administration team(s) to define the workload specific VPC firewall rules for “user access”, “environment wide access” & “inter-system access” under real world conditions.

Google Cloud supports different options for defining VPC firewall rules each with their own PROs, CONs and constraints. Google Cloud resources support being protected by multiple VPC firewall rules defined using multiple different options.

**Note:** In this lab “firewall tags” will be used as it is often the most scalable and manageable solution to managing network access within SAP estates.

### Online Documentation:

* [Quickstart - Creating firewall rules](https://cloud.google.com/vpc/docs/using-firewalls#creating_firewall_rules)
    
* [Command line - gcloud compute firewall-rules create](https://cloud.google.com/sdk/gcloud/reference/compute/firewall-rules/create)
    
* [Terraform resource to create a firewall rule (google\_compute\_firewall)](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall)
    
* [Terraform view on GitHub - terraform-google-modules/terraform-google-network/ examples/basic\_firewall\_rule/main.tf](https://github.com/terraform-google-modules/terraform-google-network/blob/HEAD/examples/basic_firewall_rule/main.tf)
    
* [SAP Help - TCP/IP Ports of All SAP Products](https://help.sap.com/docs/Security/575a9f0e56f34c6e8138439eefc32b16/616a3c0b1cc748238de9c0341b15c63c.html?locale=en-US)
    

### Dependencies:

In order to be able to successfully deploy the required VPC “**firewall rule(s)**” the following dependencies will need to be correctly deployed before proceeding with this activity:

* Google Cloud account setup
    
* IAM setup
    
* Resource hierarchy setup
    
* Google Cloud project to host VPC setup
    
* VPC network(s) deployed
    

### Naming convention:

* ID:
    
    * Character limit: 62
        
    * Structure: &lt;01&gt;**\--**&lt;02&gt;&lt;03&gt;**\-fw--**&lt;04&gt;**\-**&lt;05&gt;**\-**&lt;06&gt;**\--**&lt;07&gt;**\-env--v**&lt;08&gt;
        

                             &lt;01&gt; - vpc id

                             &lt;02&gt; - company id

                             &lt;03&gt; - business entity id

                             &lt;04&gt; - workload id

                             &lt;05&gt; - operational area id

                             &lt;06&gt; - environment id

                             &lt;07&gt; - firewall action id

                             &lt;08&gt; - firewall version no.

* Description:
    
    * Character limit: unlimited
        
    * Structure: “&lt;01&gt; **-** &lt;02&gt;**\-**&lt;03&gt; **firewall rule =** &lt;04&gt;**\-**&lt;05&gt;**\-**&lt;06&gt; **-** &lt;07&gt; **environment wide access - version** &lt;08&gt;”
        

                             &lt;01&gt; - VPC ID

                             &lt;02&gt; - Company

                             &lt;03&gt; - Business entity ID

                             &lt;04&gt; - Workload ID

                             &lt;05&gt; - Operational area ID

                             &lt;06&gt; - Environment ID

                             &lt;07&gt; - Firewall ACTION

                             &lt;08&gt; - firewall version no.

### Resources to be created (Count = 1):

Using any supported method deploy the VPC “**firewall rule(s)**” with the following configuration details:

#01 of 01:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xall-vpc--vpc-01--xgl-fw--cerps-bau-dev--a-env--v01** |
| Description | xall-vpc--vpc-01 - XYZ-Global firewall rule = CERPS-BaU-Dev - ALLOW environment wide access - version 01 |
| VPC network | xall-vpc--vpc-01 |
| Priority | 1000 |
| Direction | ingress |
| Action | allow |
| Target tags | xall-vpc--vpc-01--xgl-fw--cerps-bau-dev--a-env--v01 |
| Source filter | source-tags |
| Source | xall-vpc--vpc-01--xgl-fw--cerps-bau-dev--a-env--v01 |
| Network ports | tcp:3200-3299,tcp:3300-3399,tcp:4800-4899,tcp:80,tcp:8000-8099,tcp:443,tcp:44300-44399,tcp:3600-3699,tcp:8100-8199,tcp:44400-44499,tcp:50000-59999,tcp:30000-39999,tcp:4300-4399,tcp:40000-49999,tcp:1128-1129,tcp:5050,tcp:8000-8499,tcp:515,icmp |

### Command line:

Command 01 of 01 - Create a VPC “**firewall rule**”:

```apache
gcloud compute firewall-rules create [insert ID here] \
    --description="[insert description here]" \
    \
    --project=[insert your Google Cloud project ID here] \
    --network=[insert VPC network here] \
    \
    --priority=[insert priority here] \
    --direction=[insert direction here] \
    --action=[insert action here] \
    --target-tags=[insert target tags here] \
    --[insert source filter here]=[insert source here] \
    --rules=[insert network ports here]
```

Copied!

(Example output)

```apache
Creating firewall...working..Created [https://www.googleapis.com/compute/v1/projects/[project ID]/global/firewalls/[firewall rule ID]].
Creating firewall...done.
NAME: [firewall rule ID]
NETWORK: [VPC network ID]
DIRECTION: [INGRESS
PRIORITY: [priority]
ALLOW: [network ports]
DENY:
DISABLED: False
```

### Review and validate in the Cloud Console:

Confirm the VPC “**firewall rule(s)**” have been deployed in the Cloud Console using the following path “[Navigation menu -&gt; NETWORKING -&gt; VPC network -&gt; Firewall](https://console.cloud.google.com/networking/firewalls/list?authuser=1)”.

![fw_env_summary](https://cdn.qwiklabs.com/BZ8aPAdOIyGao%2Beyd4VGaPXCQR57qWsjXZver2csCmk%3D align="left")

Click **Check my progress** to verify the objective.

Create VPC “firewall rule(s) - environment access”

## Task 5. Create VPC “firewall rule(s) - system access”

All SAP hosted resources required network access. VPC firewall rules are required to be defined to secure what network access is permissible. Because components of a single SAP system are commonly distributed over a number VMs, system wide firewall rules will be required to enable these components to communicate with one another. Since components of the same SAP system are so closely coupled and communicate heavily between each other it is quite common for there to be unrestricted network access between components of the same SAP system.

### Real world considerations:

VPC firewall rules are typically managed by a central network administration team(s) who ensure appropriate security standards are enforced. Normally the SAP team will need to liaise with network administration team(s) to define the workload specific VPC firewall rules for “user access”, “environment wide access” & “inter-system access” under real world conditions.

Google Cloud supports different options for defining VPC firewall rules each with their own PROs, CONs and constraints. Google Cloud resources support being protected by multiple VPC firewall rules defined using multiple different options.

**Note:** In this lab “firewall tags” will be used as it is often the most scalable and manageable solution to managing network access within SAP estates.

### Online Documentation:

* [Quickstart - Creating firewall rules](https://cloud.google.com/vpc/docs/using-firewalls#creating_firewall_rules)
    
* [Command line - gcloud compute firewall-rules create](https://cloud.google.com/sdk/gcloud/reference/compute/firewall-rules/create)
    
* [Terraform resource to create a firewall rule (google\_compute\_firewall)](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall)
    
* [Terraform view on GitHub - terraform-google-modules/terraform-google-network/ examples/basic\_firewall\_rule/main.tf](https://github.com/terraform-google-modules/terraform-google-network/blob/HEAD/examples/basic_firewall_rule/main.tf)
    
* [SAP Help - TCP/IP Ports of All SAP Products](https://help.sap.com/docs/Security/575a9f0e56f34c6e8138439eefc32b16/616a3c0b1cc748238de9c0341b15c63c.html?locale=en-US)
    

### Dependencies:

In order to be able to successfully deploy the required VPC “**firewall rule(s)**” the following dependencies will need to be correctly deployed before proceeding with this activity:

* Google Cloud account setup
    
* IAM setup
    
* Resource hierarchy setup
    
* Google Cloud project to host VPC setup
    
* VPC network(s) deployed
    

### Naming Convention:

* ID:
    
    * Character limit: 62
        
    * Structure: &lt;01&gt;**\--**&lt;02&gt;&lt;03&gt;**\-fw--**&lt;04&gt;**\-**&lt;05&gt;**\-**&lt;06&gt;**\--**&lt;07&gt;**\-**&lt;08&gt;**\--v**&lt;09&gt;
        

                             &lt;01&gt; - vpc id

                             &lt;02&gt; - company id

                             &lt;03&gt; - business entity id

                             &lt;04&gt; - workload id

                             &lt;05&gt; - operational area id

                             &lt;06&gt; - environment id

                             &lt;07&gt; - firewall action id

                             &lt;08&gt; - system id

                             &lt;09&gt; - firewall version no.

* Description:
    
    * Character limit: unlimited
        
    * Structure: “&lt;01&gt; **-** &lt;02&gt;**\-**&lt;03&gt; **firewall rule =** &lt;04&gt;**\-**&lt;05&gt;**\-**&lt;06&gt; **-** &lt;07&gt; &lt;08&gt; **(**&lt;09&gt;**) system wide access - version** &lt;10&gt;”
        

                             &lt;01&gt; - VPC ID

                             &lt;02&gt; - Company

                             &lt;03&gt; - Business entity ID

                             &lt;04&gt; - Workload ID

                             &lt;05&gt; - Operational area ID

                             &lt;06&gt; - Environment ID

                             &lt;07&gt; - Firewall ACTION

                             &lt;08&gt; - Application ID

                             &lt;09&gt; - System ID

                             &lt;10&gt; - firewall version no.

### Resources to be created (Count = 1):

Using any supported method deploy the VPC “**firewall rule(s)**” with the following configuration details:

#01 of 01:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xall-vpc--vpc-01--xgl-fw--cerps-bau-dev--a-ds4--v01** |
| Description | xall-vpc--vpc-01 - XYZ-Global firewall rule = CERPS-BaU-Dev - ALLOW SAP S4 (DS4) system wide access - version 01 |
| VPC network | xall-vpc--vpc-01 |
| Priority | 1000 |
| Direction | ingress |
| Action | allow |
| Target tags | xall-vpc--vpc-01--xgl-fw--cerps-bau-dev--a-ds4--v01 |
| Source filter | source-tags |
| Source | xall-vpc--vpc-01--xgl-fw--cerps-bau-dev--a-ds4--v01 |
| Rules | tcp,udp,icmp |

### Command line:

Command 01 of 01 - Create a VPC “**firewall rule**”:

```apache
gcloud compute firewall-rules create [insert ID here] \
    --description="[insert description here]" \
    \
    --project=[insert your Google Cloud project ID here] \
    --network=[insert VPC network here] \
    \
    --priority=[insert priority here] \
    --direction=[insert direction here] \
    --action=[insert action here] \
    --target-tags=[insert target tags here] \
    --[insert source filter here]=[insert source here] \
    --rules=[insert network ports here]
```

Copied!

(Example output)

```apache
Creating firewall...working..Created [https://www.googleapis.com/compute/v1/projects/[project ID]/global/firewalls/[firewall rule ID]].
Creating firewall...done.
NAME: [firewall rule ID]
NETWORK: [VPC network ID]
DIRECTION: [INGRESS
PRIORITY: [priority]
ALLOW: [network ports]
DENY:
DISABLED: False
```

### Review and validate in the Cloud Console:

Confirm the VPC “**firewall rule(s)**” have been deployed in the Cloud Console using the following path “[Navigation menu -&gt; NETWORKING -&gt; VPC network -&gt; Firewall](https://console.cloud.google.com/networking/firewalls/list?authuser=1)”.

![fw_sys_summary](https://cdn.qwiklabs.com/oNSDl4pVrV6C1gaVXt1hXjZSz8zf0A%2FPwtP2%2F0ia2qI%3D align="left")

Click **Check my progress** to verify the objective.

Create VPC “firewall rule(s) - system access”

## Task 6. Reserve static internal “IP address(s)”

Some SAP customers opt to use “virtual hostnames” to deploy and access SAP components to take advantage of the benefits of “SAP Adaptive Design Principles”. In order to ensure IP addresses for “virtual hostnames” are not accidentally consumed by newly created VMs, internal IP addresses to be used for the “virtual hostnames” IP addresses need to be reserved.

### Real world considerations:

Typically a central network administration team(s) will manage all network related resources within the VPC network and the SAP team will need to liaise with network administration team(s) to create these static “IP address(s)” reservations under real world conditions.

**Note:** When using “virtual hostnames” careful planning of the subnet sizes will be required to ensure there are sufficient IP addresses available to accommodate both IP addresses for the VMs as well as the “virtual hostnames”. For manageability purposes it is strongly recommended that virtual hostnames consume IP addresses from the same subnet as the VM(s) they are associated with.

### Online documentation:

* [Quickstart - Reserve a new static internal IP address](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-internal-ip-address#reservenewip)
    
* [Command line - gcloud compute addresses create](https://cloud.google.com/sdk/gcloud/reference/compute/addresses/create)
    
* [Terraform resource to create a firewall rule (google\_compute\_address)](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_address)
    
* [Terraform view on GitHub - terraform-google-modules/terraform-google-address/examples/internal\_with\_specific\_ip/main.tf](https://github.com/terraform-google-modules/terraform-google-address/blob/HEAD/examples/internal_with_specific_ip/main.tf)
    
* [SAP Note 962955 - Use of virtual or logical TCP/IP host names](https://launchpad.support.sap.com/#/notes/962955)
    

### Dependencies:

In order to be able to successfully reserve the required static “**IP address(s)**” the following dependencies will need to be correctly deployed before proceeding with this activity:

* Google Cloud account setup
    
* IAM setup
    
* Resource hierarchy setup
    
* Google Cloud project to host VPC setup
    
* VPC network(s) deployed
    
* VPC subnet(s) deployed
    

### Naming Convention:

* ID:
    
    * Character limit: 62
        
    * Structure: &lt;01&gt;&lt;02&gt;**\-ip-address--**&lt;03&gt;**\-**&lt;04&gt;**\-**&lt;05&gt;**\--&lt;06&gt;--&lt;07&gt;**
        

                             &lt;01&gt; - company id

                             &lt;02&gt; - business entity id

                             &lt;03&gt; - workload id

                             &lt;04&gt; - operational area id

                             &lt;05&gt; - environment id

                             &lt;06&gt; - system id

                             &lt;07&gt; - short virtual hostname

* Description:
    
    * Character limit: unlimited
        
    * Structure: “&lt;01&gt;**\-**&lt;02&gt; **reserved IP address =** &lt;03&gt;**\-**&lt;04&gt;**\-**&lt;05&gt; **-** &lt;06&gt; (&lt;07&gt;) **-** &lt;08&gt;”                              &lt;01&gt; - Company
        

                             &lt;02&gt; - Business entity ID

                             &lt;03&gt; - Workload ID

                             &lt;04&gt; - Operational area ID

                             &lt;05&gt; - Environment ID

                             &lt;06&gt; - Application ID

                             &lt;07&gt; - System ID

                             &lt;08&gt; - short virtual hostname

### Resources to be created (Count = 4):

Using any supported method reserve static “**IP address(s)**” with the following configuration details:

#01 of 04:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xgl-ip-address--cerps-bau-dev--dh1--d-cerpshana1** |
| Description | XYZ-Global reserved IP address = CERPS-BaU-Dev - SAP HANA 1 (DH1) - d-cerpshana1 |
| Region | `us-east4` |
| Subnet | xgl-subnet--cerps-bau-nonprd--be1-01 |
| Addresses | 10.1.1.100 |

#02 of 04:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xgl-ip-address--cerps-bau-dev--ds4--d-cerpss4db** |
| Description | XYZ-Global reserved IP address = CERPS-BaU-Dev - SAP S4 (DS4) - d-cerpss4db |
| Region | `us-east4` |
| Subnet | xgl-subnet--cerps-bau-nonprd--be1-01 |
| Addresses | 10.1.1.101 |

#03 of 04:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xgl-ip-address--cerps-bau-dev--ds4--d-cerpss4scs** |
| Description | XYZ-Global reserved IP address = CERPS-BaU-Dev - SAP S4 (DS4) - d-cerpss4scs |
| Region | `us-east4` |
| Subnet | xgl-subnet--cerps-bau-nonprd--be1-01 |
| Addresses | 10.1.1.102 |

#04 of 04:

| **Parameter** | **Value** |
| --- | --- |
| ID | **xgl-ip-address--cerps-bau-dev--ds4--d-cerpss4app1** |
| Description | XYZ-Global reserved IP address = CERPS-BaU-Dev - SAP S4 (DS4) - d-cerpss4app1 |
| Region | `us-east4` |
| Subnet | xgl-subnet--cerps-bau-nonprd--be1-01 |
| Addresses | 10.1.1.103 |

### Command line:

Command 01 of 01 - Create a static “**IP address**” reservation:

```apache
gcloud compute addresses create [insert ID here] \
    --description="[insert description here]" \
    \
    --project=[insert your Google Cloud project ID here] \
    --region=[insert region here] \
    --subnet=[insert subnet here] \
    \
    --addresses=[insert addresses here]
```

Copied!

(Example output)

```apache
Created [https://www.googleapis.com/compute/v1/projects/[project ID]/regions/europe-west1/addresses/[reserved IP ID]]
```

### Review and validate in the Cloud Console:

Confirm the reservation of static internal “**IP address(s)**” in the Cloud Console using the following path “[Navigation menu -&gt; NETWORKING -&gt; VPC network -&gt; IP addresses](https://console.cloud.google.com/networking/addresses/list?authuser=1)”.

![ip_add_summary](https://cdn.qwiklabs.com/HuTk%2B%2FDqpDKcwwYDhqn5K25W3GUPNmzK8KhiDT%2BEAMg%3D align="left")

Click **Check my progress** to verify the objective.

Reserve “static internal IP address(s)”

## Task 7. Create “Cloud NAT service(s)”

It is quite common for VMs hosting SAP components to not be assigned public IP addresses for security reasons. However these VM often still need internet access to be able to do critical activities like update OS packages. “Cloud NAT” service provides a secure manner for these SAP related VMs to access the internet.

### Real world considerations:

Typically a central network administration team(s) will manage all network related resources within the VPC network.

There are many patterns supported to providing internet access to VMs which don’t have a public IP address assigned and therefore the SAP team will need to liaise with network administration team(s) on how internet access can be granted inline with the adopted network design.

**Note:** In this lab a single “Cloud NAT Service” will be deployed however under real world conditions, to avoid latency and inter-region network costs, generally each Google Cloud region hosting VM(s) would have at least 1 “Cloud NAT Service” deployed however there may also be valid justification to have more.

### Online documentation:

* [Quickstart - Set up a simple configuration](https://cloud.google.com/nat/docs/set-up-manage-network-address-translation#set_up_a_simple_configuration)
    
* [Command line - gcloud compute routers create](https://cloud.google.com/sdk/gcloud/reference/compute/routers/create)
    
* [Terraform resource to create a router (google\_compute\_router)](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_router)
    
* [Terraform view on GitHub - terraform-google-modules/terraform-cloud-router/ examples/simple/main.tf](https://github.com/terraform-google-modules/terraform-google-cloud-router/blob/master/examples/simple/main.tf)
    
* [Command line - gcloud compute routers nats create](https://cloud.google.com/sdk/gcloud/reference/compute/routers/nats/create)
    
* [Terraform resource to create a NAT router (google\_compute\_router\_nat)](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_router_nat)
    
* [Terraform view on GitHub - terraform-google-modules/terraform-cloud-router/examples/nat/main.tf](https://github.com/terraform-google-modules/terraform-google-cloud-router/blob/HEAD/examples/nat/main.tf)
    

### Dependencies:

In order to be able to successfully deploy the required “**Cloud NAT service(s)**” the following dependencies will need to be correctly deployed before proceeding with this activity:

* Google Cloud account setup
    
* IAM setup
    
* Resource hierarchy setup
    
* Google Cloud project to host VPC setup
    
* “VPC” network(s) deployed
    
* VPC “subnets” deployed
    

### Naming Convention:

* Cloud NAT - ID:
    
    * Character limit: 62
        
    * Structure: &lt;01&gt;**\--**&lt;02&gt;&lt;03&gt;**\-nat-gw--**&lt;04&gt;**\--**&lt;05&gt;**\-**&lt;06&gt;
        

                             &lt;01&gt; - vpc id

                             &lt;02&gt; - company id

                             &lt;03&gt; - business entity id

                             &lt;04&gt; - short nat description

                             &lt;05&gt; - Hosting region ID

                             &lt;06&gt; - subnet count identifier

* Router - ID:
    
    * Character limit: 62
        
    * Structure: &lt;01&gt;**\--**&lt;02&gt;&lt;03&gt;**\-router--**&lt;04&gt;**\--**&lt;05&gt;**\-**&lt;06&gt;
        

                             &lt;01&gt; - vpc id

                             &lt;02&gt; - company id

                             &lt;03&gt; - business entity id

                             &lt;04&gt; - short router description

                             &lt;05&gt; - Hosting region ID

                             &lt;06&gt; - router count identifier

* Router - Description:
    
    * Character limit: unlimited
        
    * Structure: “&lt;01&gt; **-** &lt;02&gt;**\-**&lt;03&gt; **router =** &lt;04&gt; **-** &lt;05&gt; **-** &lt;06&gt;”
        

                             &lt;01&gt; - vpc id

                             &lt;02&gt; - Company

                             &lt;03&gt; - Business entity ID

                             &lt;04&gt; - Router description

                             &lt;05&gt; - Hosting region ID

                             &lt;07&gt; - router count identifier

### Resources to be created (Count = 2):

Using any supported method deploy the “**Cloud NAT service(s)**” with the following configuration details:

#01 of 01:

| **Parameter** | **Value** |
| --- | --- |
| Cloud NAT - ID | **xall-vpc--vpc-01--xall-nat-gw--shared-nat--de1-01** |
| Router - ID | **xall-vpc--vpc-01--xall-router--shared-nat--de1-01** |
| Router - Description | xall-vpc--vpc-01 - XYZ-Global router = Shared NAT - Germany 1 (GCP) - 01 |
| Region | `us-east4` |
| VPC network | xall-vpc--vpc-01 |

### Command line:

Command 01 of 02 - Create a “**router**”:

```apache
gcloud compute routers create [insert router ID here] \
    --description="[insert router description here]" \
    \
    --project=[insert your Google Cloud project ID here] \
    --region=[insert region here] \
    --network=[insert VPC network here]
```

Copied!

(Example output)

```apache
Creating router [[router ID]]...done.    
NAME: [router ID]
REGION: [region ID]
NETWORK: [VPC network ID]
```

Command 02 of 02 - Create a “**Cloud NAT**”:

```apache
gcloud compute routers nats create [inset nat ID here] \
    \
    --project=[insert your Google Cloud project ID here] \
    --region=[insert region here] \
    --router=[insert router ID here] \
    \
    --auto-allocate-nat-external-ips \
    --nat-all-subnet-ip-ranges \
    --enable-logging
```

Copied!

(Example output)

```apache
Creating NAT [[nat ID]] in router [[insert router ID here]]...done.
```

### Review and validate in the Cloud Console:

Confirm the “**router(s)**” have been deployed in the Cloud Console using the following path “[Navigation menu -&gt; NETWORKING -&gt; Network Connectivity -&gt; Cloud Routers](https://console.cloud.google.com/hybrid/routers/list?authuser=1)”.

![router_summary](https://cdn.qwiklabs.com/GvrHp6%2FQ%2FCNxGv3wJ6yB8PbddWdWtgz1ojJkILjAzgk%3D align="left")

Confirm the “**Cloud NAT(s)**” have been deployed in the Cloud Console using the following path “[Navigation menu -&gt; NETWORKING -&gt; Network Services -&gt; Cloud NAT](https://console.cloud.google.com/net-services/nat//list?authuser=1)”.

![nat_summary](https://cdn.qwiklabs.com/xSZ32hANHvUj5v28A4EOQeqaNWlXKvrImv0UPnaCxfc%3D align="left")

Click **Check my progress** to verify the objective.

Create “Cloud NAT service(s)”

---

## Solution of Lab

%[https://youtu.be/er9MAy2L_bo] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/SAP%20Landing%20Zone%20Plan%20and%20Deploy%20the%20SAP%20Network/quicklabgsp1068.sh
sudo chmod +x quicklabgsp1068.sh
./quicklabgsp1068.sh
```