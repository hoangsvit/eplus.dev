---
title: "Create a Custom Network and Apply Firewall Rules - GSP159"
seoTitle: "Create a Custom Network and Apply Firewall Rules - GSP159"
seoDescription: "In this hands-on lab you'll learn how to design and implement a secure network architecture. You'll use Cloud Shell and the command line language gcloud to"
datePublished: Tue Mar 04 2025 06:03:42 GMT+0000 (Coordinated Universal Time)
cuid: cm7u32eoc000c08l71r9nhbmi
slug: create-a-custom-network-and-apply-firewall-rules-gsp159
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756627168256/18f704e1-7678-4057-a4bd-7d17bf9c6aa3.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756627181078/ef4ebe89-2c57-445d-adae-193abd71a474.png
tags: create-a-custom-network-and-apply-firewall-rules-gsp159, create-a-custom-network-and-apply-firewall-rules, gsp159

---

## **Overview**

In this hands-on lab you'll learn how to design and implement a secure network architecture. You'll use Cloud Shell and the command line language `gcloud` to create a custom network with 3 subnetworks, then apply firewall rules to control the traffic allowed to your VM instances.

### What you'll learn

In this lab you'll learn how to create:

* A custom network
    
* Three subnetworks
    
* Firewall rules that have network tags
    

## **Setup and requirements**

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
    student-04-24dcb2d2acd6@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    CrCPQN1aBixb
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-29264891f437`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-29264891f437
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
ACCOUNT: student-04-24dcb2d2acd6@qwiklabs.net

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
project = qwiklabs-gcp-04-29264891f437
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

### Set your region and zone

Run the following `gcloud` commands in Cloud Shell to set the default region and zone for your lab:

```apache
gcloud config set compute/zone "us-east4-a"
export ZONE=$(gcloud config get compute/zone)

gcloud config set compute/region "us-east4"
export REGION=$(gcloud config get compute/region)
```

## **Task 1. Create custom network with Cloud Shell**

Create a network called `taw-custom-network` and define the option to be able to add your own subnetworks to it by using the `--subnet-mode custom` flag.

* Create the custom network:
    

```apache
gcloud compute networks create taw-custom-network --subnet-mode custom
```

**Output:**

```apache
NAME                MODE    IPV4_RANGE  GATEWAY_IPV4
taw-custom-network  custom

Instances on this network will not be reachable until firewall rules
are created. As an example, you can allow all internal traffic between
instances as well as SSH, RDP, and ICMP by running:

$ gcloud compute firewall-rules create <firewall_name> --network taw-custom-network --allow tcp,udp,icmp --source-ranges <ip_range>
$ gcloud compute firewall-rules create <firewall_name> --network taw-custom-network --allow tcp:22,tcp:3389,icmp
</firewall_name></ip_range></firewall_name>
```

Now create three subnets for your new custom network. In each command you'll specify the region for the subnet and the network it belongs to.

1. Create subnet-`us-east4` with an IP prefix:
    

```apache
gcloud compute networks subnets create subnet-us-east4 \
   --network taw-custom-network \
   --region us-east4 \
   --range 10.0.0.0/16
```

**Output:**

```powershell
Created [https://www.googleapis.com/compute/v1/projects/cloud-network-module-101/regions/us-east4/subnetworks/subnet-us-east4].
NAME               REGION       NETWORK             RANGE
subnet-us-east4  us-east4 taw-custom-network  10.0.0.0/16
```

2. Create subnet-`europe-west1` with an IP prefix:
    

```apache
gcloud compute networks subnets create subnet-europe-west1 \
   --network taw-custom-network \
   --region europe-west1 \
   --range 10.1.0.0/16
```

**Output:**

```powershell
Created [https://www.googleapis.com/compute/v1/projects/cloud-network-module-101/regions/europe-west1/subnetworks/subnet-europe-west1].
NAME                REGION        NETWORK             RANGE
subnet-europe-west1  europe-west1  taw-custom-network  10.1.0.0/16
```

3. Create subnet-`europe-west4` with an IP prefix:
    

```apache
gcloud compute networks subnets create subnet-europe-west4 \
   --network taw-custom-network \
   --region europe-west4 \
   --range 10.2.0.0/16
```

**Output:**

```apache
Created [https://www.googleapis.com/compute/v1/projects/cloud-network-module-101/regions/europe-west4/subnetworks/subnet-europe-west4].
NAME                REGION        NETWORK             RANGE
subnet-europe-west1    europe-west1  taw-custom-network  10.2.0.0/16
```

4. List your networks:
    

```apache
gcloud compute networks subnets list \
   --network taw-custom-network
```

**Output:**

```apache
NAME                REGION        NETWORK             RANGE
subnet-europe-west4    europe-west4    taw-custom-network  10.1.0.0/16
subnet-europe-west1  europe-west1  taw-custom-network  10.2.0.0/16
subnet-us-east4  us-east4   taw-custom-network  10.0.0.0/16
```

Create a custom network and subnetworks

Check my progress

At this point, the network has routes to the Internet and to any instances you create. But, it has no firewall rules allowing access to instances, even from other instances.

To allow access, you must create [firewall rules](https://cloud.google.com/firewall/docs/firewall-policies-rule-details).

## **Task 2. Add firewall rules**

To allow access to virtual machine (VM) instances, you must apply firewall rules. You will use a [network tag](https://cloud.google.com/vpc/docs/add-remove-network-tags) to apply the firewall rule to your VM instances.

*Network tags* are powerful tools for managing firewall rules across groups of VM instances. Imagine you have a cluster of VMs powering a website. Instead of manually configuring firewall rules for each individual instance, you can simply apply a tag like "web-server" to all the relevant VMs. Then, create a firewall rule that allows HTTP traffic to any instance with the "web-server" tag. This approach not only simplifies firewall management but also provides flexibility, allowing you to easily update access control by modifying the tag-based rule.

**Note:** Tags are also reflected in the metadata server, so you can use them for applications running on your instances.

Start by opening the firewall to allow HTTP Internet requests, then add more firewall rules.

### Add firewall rules using Cloud Shell

Now add a firewall rule called `nw101-allow-http` for the `taw-custom-network` that will only apply to VMs in the network with the tag `http`.

* Run the following to create the firewall rule:
    

```apache
gcloud compute firewall-rules create nw101-allow-http \
--allow tcp:80 --network taw-custom-network --source-ranges 0.0.0.0/0 \
--target-tags http
```

**Output:**

![The output wherein the name is nw101-allow-http, the network is taw-custom-network, direction is ingress, priority level is 1000, and allow status is tcp:80](https://cdn.qwiklabs.com/7812KhIgI%2FM8%2BgunUMsNo2l3JAePrDiGuadsxgMTj%2FU%3D align="left")

### Create additional firewall rules

Create additional firewall rules to allow ICMP, internal communication, SSH, and RDP.

1. Create more firewall rules with the commands below.
    

* **ICMP**
    

```apache
gcloud compute firewall-rules create "nw101-allow-icmp" --allow icmp --network "taw-custom-network" --target-tags rules
```

* **Internal Communication**
    

```apache
gcloud compute firewall-rules create "nw101-allow-internal" --allow tcp:0-65535,udp:0-65535,icmp --network "taw-custom-network" --source-ranges "10.0.0.0/16","10.2.0.0/16","10.1.0.0/16"
```

* **SSH**
    

```apache
gcloud compute firewall-rules create "nw101-allow-ssh" --allow tcp:22 --network "taw-custom-network" --target-tags "ssh"
```

* **RDP**
    

```apache
gcloud compute firewall-rules create "nw101-allow-rdp" --allow tcp:3389 --network "taw-custom-network"
```

2. Use the console to review the firewall rules in your network. It should look like this:
    

![The Firewall rules tabbed page on the VPC network details dialog](https://cdn.qwiklabs.com/h%2BgQPspU8dp%2FG1A036zWN6fmKT3IU967EYpZCywaeEU%3D align="left")

**Note:** What about those Routes I see in the Network console?

Google Cloud Networking uses Routes to direct packets between subnetworks and to the Internet. Whenever a subnetwork is created (or pre-created) in your Network, routes are automatically created in each region to allow packets to route between subnetworks. These cannot be modified.

Additional Routes can be created to send traffic to an instance, a VPN gateway, or default internet gateway. These Routes can be modified to tailor the desired network architecture. Routes and Firewalls work together to ensure your traffic gets where it needs to go.

Click **Check my progress** to verify the objective.

Create firewall rules

Check my progress

When you create VMs in your network, you'll create them with the tag that corresponds to the appropriate firewall rule. The firewall rule will allow internet traffic to them, and the VMs will be able to communicate across your network.

---

## Solution of Lab

%[https://youtu.be/fF_RJj-nhoQ] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP159/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756627339167/62219021-1e79-447f-a821-4ce5cf139a22.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1741068084342/5f552469-2352-43a1-b492-458d40d9d469.png align="center")

---

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Create%20a%20Custom%20Network%20and%20Apply%20Firewall%20Rules/techcps159.sh
sudo chmod +x techcps159.sh
./techcps159.sh
```