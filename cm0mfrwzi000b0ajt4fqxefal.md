---
title: "Networking 101 - GSP016"
seoTitle: "Networking 101 - GSP016"
seoDescription: "In this hands-on lab you will learn how to perform basic networking tasks on Google Cloud (including Compute Engine instances) and how Google Cloud might di"
datePublished: Tue Sep 03 2024 12:59:22 GMT+0000 (Coordinated Universal Time)
cuid: cm0mfrwzi000b0ajt4fqxefal
slug: networking-101-gsp016
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756626661752/b82e13b8-2c4e-4a53-ade1-03b6b6c31aca.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756626709661/0f8443e9-138e-4286-952d-252db3420d3d.png
tags: networking-101, networking-101-gsp016, gsp016

---

## Overview

In this lab you will learn how to perform basic networking tasks on Google Cloud (including Compute Engine instances) and how Google Cloud might differ from an on-premises setup. You'll develop a network and 3 subnetworks, resulting in this end-state environment:

![The end-state environment consisting of three subnetworks: subnet-us-central, subnet-europe-west, and asia-test-01 ](https://cdn.qwiklabs.com/S3FEim1%2B4XAtYkIurnqHUA8DycwsLQ91egR6aRgV5ww%3D align="left")

Finally, you'll learn how to create firewall rules and use instance tags to apply the firewall rules.

### What you'll learn

* Basics concepts and constructs of Google Cloud networking
    
* How default and user-created networks are configured.
    
* How to create firewall rules, and use instance tags to apply firewall rules
    

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
    student-00-e51afb8d5ea5@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    xJNQ9KMPxg37
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-7d2e1beebb0c`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-7d2e1beebb0c
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
ACCOUNT: student-00-e51afb8d5ea5@qwiklabs.net

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
project = qwiklabs-gcp-01-7d2e1beebb0c
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Understanding Regions and Zones

Certain Compute Engine resources live in regions or zones. A region is a specific geographical location where you can run your resources. Each region has one or more zones. For example, the us-central1 region denotes a region in the Central United States that has zones `us-central1-a`, `us-central1-b`, `us-central1-c`, and `us-central1-f`.

| **Regions** | **Zones** |
| --- | --- |
| Western US | us-west1-a, us-west1-b |
| Central US | us-central1-a, us-central1-b, us-central1-d, us-central1-f |
| Eastern US | us-east1-b, us-east1-c, us-east1-d |
| Western Europe | europe-west1-b, europe-west1-c, europe-west1-d |
| Eastern Asia | asia-east1-a, asia-east1-b, asia-east1-c |

Resources that live in a zone are referred to as zonal resources. Virtual machine Instances and persistent disks live in a zone. To attach a persistent disk to a virtual machine instance, both resources must be in the same zone. Similarly, if you want to assign a static IP address to an instance, the instance must be in the same region as the static IP.

Learn more about regions and zones and see a complete list in the Compute Engine page, [Regions and zones documentation](https://cloud.google.com/compute/docs/regions-zones/)).

## Google Cloud network concepts

Google Cloud supports projects, networks, and subnetworks to provide flexible, logical isolation of unrelated resources.

In Google Cloud, networks provide data connections into and out of your cloud resources (mostly Compute Engine instances). Securing your networks is critical to securing your data and controlling access to your resources.

[***Projects***](https://cloud.google.com/docs/overview#projects) are the organizing entity for what you're building, for example the settings, permissions, and other metadata that describe your applications. Any Google Cloud resources you allocate and use must belong to a project.

Many developers map projects to teams since each project has its own access policy (IAM) and member list. Projects also collect billing and quota details reflecting resource consumption.

Resources within a single project work together, for example by communicating through an internal network, subject to the regions-and-zones rules. A project can't access another project's resources unless you configure a connection method such as Shared VPC or VPC Network Peering.

***Networks*** directly connect your resources to each other and to the outside world. Networks, using firewalls, also house the access policies for incoming and outgoing connections. Networks can be global (offering horizontal scalability across multiple Regions) or regional (offering low-latency within a single region).

A *VPC network* is a virtual network inside of Google Cloud. A VPC network is a global resource that consists of a list of regional virtual subnetworks (subnets) in data centers, all connected by a global wide area network. VPC networks are logically isolated from each other in Google Cloud.

***Subnetworks*** allow you to group related resources (Compute Engine instances) into RFC1918 private address spaces. Subnetworks can only be regional. A subnetwork can be in auto mode or custom mode.

* An auto mode network has one subnet per region, each with a predetermined IP range and gateway. These subnets are created automatically when you create the auto mode network, and each subnet has the same name as the overall network.
    
* A custom mode network has no subnets at creation. To create an instance in a custom mode network, you must first create a subnetwork in that region and specify its IP range. A custom mode network can have zero, one, or many subnets per region.
    

### Set your region and zone

Certain Compute Engine resources live in regions and zones. A region is a specific geographical location where you can run your resources. Each region has one or more zones.

<aside>Learn more about regions and zones and see a complete list in<span> </span><a href="https://cloud.google.com/compute/docs/regions-zones/" target="_blank">Regions & Zones documentation</a>.</aside>

Run the following `gcloud` commands in Cloud Shell to set the default region and zone for your lab:

```apache
gcloud config set compute/zone "us-east1-d"
export ZONE=$(gcloud config get compute/zone)

gcloud config set compute/region "us-east1"
export REGION=$(gcloud config get compute/region)
```

## Task 1. Review the default network

When a new project is created, a default network configuration provides each region with an auto subnet network. You can create up to four additional networks in a project. Additional networks can be auto subnet networks, custom subnet networks, or legacy networks.

Each instance created within a subnetwork is assigned an IPv4 address from that subnetwork range.

* Review your network. Click **Navigation menu** &gt; **VPC network**.
    

![The VPC networks page displaying a list of network including their associated information such as IP address ranges and gateways ](https://cdn.qwiklabs.com/78YPZpFLjPhsJlCfoHtK1SzH8gHTOCNAM3Bf8zcxZJg%3D align="left")

### Firewalls

For more information on how you can use firewall rules to isolate subnetworks, refer to [subnetworks](https://cloud.google.com/vpc/docs/vpc#vpc_networks_and_subnets) and [firewall rules](https://cloud.google.com/compute/docs/vpc/firewalls).

Each network has a default firewall that blocks all inbound traffic to instances. To allow traffic to come into an instance, you must create "allow" rules for the firewall. Additionally, the default firewall allows traffic from instances unless you configure it to block outbound connections using an "egress" firewall configuration. Therefore, by default you can create "allow" rules for traffic you wish to pass ingress, and "deny" rules for traffic you wish to restrict egress. You may also create a default-deny policy for egress and prohibit external connections entirely.

In general, it is recommended to configure the least permissive firewall rule that will support the kind of traffic you are trying to pass. For example, if you need to allow traffic to reach some instances, but restrict traffic from reaching others, create rules that allow traffic to the intended instances only. This more restrictive configuration is more predictable than a large firewall rule that allows traffic to all of the instances. If you want to have "deny" rules to override certain "allow" rules, you can set priority levels on each rule and the rule with the lowest numbered priority will be evaluated first. Creating large and complex sets of override rules can lead to allowing or blocking traffic that is not intended.

The default network has automatically created firewall rules, which are shown below. No manually created network of any type has automatically created firewall rules. For all networks except the default network, you must create any firewall rules you need.

The ingress firewall rules automatically created for the default network are as follows:

| `default-allow-internal` | Allows network connections of any protocol and port between instances on the network. |
| --- | --- |
| `default-allow-ssh` | Allows SSH connections from any source to any instance on the network over TCP port 22. |
| `default-allow-rdp` | Allows RDP connections from any source to any instance on the network over TCP port 3389. |
| `default-allow-icmp` | Allows ICMP traffic from any source to any instance on the network. |

* To review the default Firewall rules, in the Cloud console click **Navigation menu** &gt; **VPC network** &gt; **Firewall**.
    

![The Firewall page displaying a list of firewall rules including their respective types, targets, filters, proptocol/ports, priority, and network](https://cdn.qwiklabs.com/F3GhLGyYTLRQLedLF%2Fw2QGi3a4xXvbuKFaJDkmBZ9Os%3D align="left")

### Network route

All networks have routes created automatically to the Internet (default route) and to the IP ranges in the network. The route names are automatically generated and will look different for each project.

* To review default routes, click **Navigation menu** &gt; **VPC network** &gt; **Routes** &gt; Select **Network** and **Region** to view **Routes**.
    

![The Routes page displaying a list of routes and their respective description, destination IP range, priority level, and network](https://cdn.qwiklabs.com/tn5FCanVlH8H2Mk%2FKBeMbHwUFkl%2BLx4ub3bW%2Bdf0mls%3D align="left")

## Task 2. Creating a custom network

When manually assigning subnetwork ranges, you first create a custom network, then create the subnets you want within a region. You do not have to specify subnetworks for all regions right away, or even at all, but you cannot create instances in regions that have no subnetwork defined.

When you create a new subnetwork, its name must be unique in that project for that region, even across networks. The same name can appear twice in a project as long as each one is in a different region. Because this is a subnetwork, there is no network-level IPv4 range or gateway IP, so none will be displayed.

You can either create your custom network with the console or with Cloud Shell. You'll be shown you both, but you have to decide which method to use while taking the lab. For example, you cannot go through a section using the instructions for the console, then go through the same section using `gcloud` command line.

To create a custom network:

1. Click **Navigation menu** &gt; **VPC network**.
    
2. Click **Create VPC Network** and name it `taw-custom-network`.
    
3. On the **Custom** tab create:
    
    * Subnet name: subnet-`us-east1`
        
    * Region: `us-east1`
        
    * IP address range: `10.0.0.0/16`
        
4. Click **Done**.
    
    ![The populated Create a VPC network dialog box](https://cdn.qwiklabs.com/oW6Ltq0QD9aSnwxKmlnTqqkbJ%2B1rL6EGf33bahnSVi8%3D align="left")
    
5. Now click **Add Subnet** and add 2 more subnets in their respective regions:
    
    * subnet-`us-central1`, `us-central1`, 10.1.0.0/16
        
    * subnet-`europe-west4`, `europe-west4`, 10.2.0.0/16
        
6. Click **Create** to finish.
    

At this point, the network has routes to the Internet and to any instances that you might create. But it has no firewall rules allowing access to instances, even from other instances. To allow access, you must create [firewall rules](https://cloud.google.com/compute/docs/vpc/firewalls).

Continue to the **Adding firewall rules** section.

## Task 3. Adding firewall rules

To allow access to VM instances, you must apply firewall rules. For this lab, you will use an instance tag to apply the firewall rule to your VM instances. The firewall rule will apply to any VM using the same instance tag.

**Note:** Instance Tags are used by networks and firewalls to apply certain firewall rules to tagged VM instances. For example, if there are several instances that perform the same task, such as serving a large website, you can tag these instances with a shared word or term and then use that tag to allow HTTP access to those instances with a firewall rule.

Tags are also reflected in the metadata server, so you can use them for applications running on your instances.

* Start by opening the firewall to allow HTTP Internet requests, then you'll add more firewall rules.
    

### Add firewall rules through the Console

1. In the Cloud console, navigate to **VPC networks** and click on the **taw-custom-network**:
    

![taw-custom-networking highlighted on the VPC networks page](https://cdn.qwiklabs.com/kGIKzSZ%2FdPHDJ3wY9Am1L9O4LAujE%2B0laH3SlfxYOyI%3D align="left")

2. Click the **Firewalls** tab, then **Add Firewall rule**.
    

![The Firewall Rules tab and the Add Firewall rule button highlighted on the VPC network details page](https://cdn.qwiklabs.com/qcxhORK3TSup5MNvwtkpLcPeh1s8DMy8gIMUzUZmzoU%3D align="left")

3. Enter the following info:
    

| **Field** | **Value** | **Comments** |
| --- | --- | --- |
| Name | nw101-allow-http | New rule name |
| Targets | Specified target tags | Which instances to which the firewall rule applies. |
| Target tags | http | The tag we created |
| Source filter | IPv4 ranges | We will open the firewall for any IP address from the Internet. |
| Source IPv4 ranges | 0.0.0.0/0 | You will open the firewall for any IP address from the Internet. |
| Protocols and ports | Select **Specified protocols and ports**, then check the **tcp** box, and type *80* | Only HTTP |

Your screen will look like this:

![The populated Create a firewall rule dialog box](https://cdn.qwiklabs.com/wgjxrVqpSOarL8cGnc5RgzNMVK4uaXkJnQ89kZSg%2BmI%3D align="left")

4. Click **Create** and wait until the command succeeds. Next you'll create the additional firewall rules you'll need.
    

### Create additional firewall rules

These additional firewall rules will allow ICMP, internal communication, SSH, and RDP. You can create them using the Console.

* **ICMP**
    

| **Field** | **Value** | **Comments** |
| --- | --- | --- |
| Name | nw101-allow-icmp | New rule name |
| Targets | Specified target tags | Select from the Targets dropdown |
| Target tags | rules | tag |
| Source filter | IPv4 ranges | We will open the firewall for any IP address on this list. |
| Source IPv4 ranges | 0.0.0.0/0 | We will open the firewall for any IP address from the Internet. |
| Protocols and ports | Select **Specified protocols and ports**, **other protocols**, then type *icmp* | The protocols and ports the firewall applies to |

* **Internal Communication**
    

| **Field** | **Value** | **Comments** |
| --- | --- | --- |
| Name | nw101-allow-internal | New rule name |
| Targets | All instances in the network | Select from the Targets dropdown |
| Source filter | IPv4 ranges | The filter used to apply the rule to specific traffic sources |
| Source IPv4 ranges | 10.0.0.0/16, | We will open the firewall for any IP address from the Internet. |
| Protocols and ports | Select **Specified protocols and ports**, then **tcp** and type *0-65535*; check **udp** type *0-65535*; check **Other protocols** and type *icmp* | Allows Tcp:0-65535, udp:0-65535,icmp |

* **SSH**
    

| **Field** | **Value** | **Comments** |
| --- | --- | --- |
| Name | nw101-allow-ssh | New rule name |
| Targets | Specified target tags | ssh |
| Target tags | ssh | The instances to which you apply the firewall rule |
| Source filter | IPv4 ranges | The filter used to apply the rule to specific traffic sources |
| Source IPv4 ranges | 0.0.0.0/0 | We will open the firewall for any IP address from the Internet. |
| Protocols and ports | Select **Specified protocols and ports**, check the **tcp** box, then type *22* | Allows tcp:22 |

* **RDP**
    

| **Field** | **Value** | **Comments** |
| --- | --- | --- |
| Name | nw101-allow-rdp | New rule name |
| Targets | All instances in the network | Select from the Targets dropdown |
| Source filter | IPv4 ranges | Filter IP addresses |
| Source IPv4 ranges | 0.0.0.0/0 | We will open the firewall for any IP address from the Internet. |
| Protocols and ports | Select **Specified protocols and ports**, check the **tcp**, then type *3389* | Allows tcp:3389 |

* Use the Console to review the firewall rules in your network. It should look like this:
    

![The Firewall rules tabbed page on the VPC network details dialog](https://cdn.qwiklabs.com/h%2BgQPspU8dp%2FG1A036zWN6fmKT3IU967EYpZCywaeEU%3D align="left")

**Note:** What about those Routes I see in the Network console?

Google Cloud Networking uses Routes to direct packets between subnetworks and to the Internet. Whenever a subnetwork is created (or pre-created) in your Network, routes are automatically created in each region to allow packets to route between subnetworks. These cannot be modified.

Additional Routes can be created to send traffic to an instance, a VPN gateway, or default internet gateway. These Routes can be modified to tailor the desired network architecture. Routes and Firewalls work together to ensure your traffic gets where it needs to go.

Click **Check my progress** to verify the objective.

Create a custom network, subnetworks and firewall rules.

## End your lab

When you have completed your lab, click **End Lab**. Your account and the resources you've used are removed from the lab platform.

You will be given an opportunity to rate the lab experience. Select the applicable number of stars, type a comment, and then click **Submit**.

The number of stars indicates the following:

* 1 star = Very dissatisfied
    
* 2 stars = Dissatisfied
    
* 3 stars = Neutral
    
* 4 stars = Satisfied
    
* 5 stars = Very satisfied
    

You can close the dialog box if you don't want to provide feedback.

For feedback, suggestions, or corrections, please use the **Support** tab.

---

## Solution of Lab

%[https://youtu.be/7ND6JrHtFkQ] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP016/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756626585328/3d678c15-25af-447f-817d-a7893b9efc66.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1770784430022/e0022da9-48a7-4170-86b8-b872f4c4fa71.png align="center")

**Script Alternative**

```apache
export REGION_1=
export REGION_2=
export REGION_3=
```

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Networking%20101/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756626579246/351ccde3-2bbc-4800-924e-bc78f70bd83f.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756626585328/3d678c15-25af-447f-817d-a7893b9efc66.png align="center")