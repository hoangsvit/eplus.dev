---
title: "Configuring Networks via gcloud - GSP630"
seoTitle: "Configuring Networks via gcloud - GSP630"
seoDescription: "A Virtual Private Cloud (VPC) network is a global resource which consists of a list of regional virtual subnetworks (subnets) in data centers, all connected"
datePublished: Sat May 17 2025 07:16:47 GMT+0000 (Coordinated Universal Time)
cuid: cmarw9fan000c0al54x9b81d0
slug: configuring-networks-via-gcloud-gsp630
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747466087812/00cee2c9-2846-4e23-b933-c54def6f9954.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747466113871/e44ab685-b99c-4694-be57-f9f73a7b9c31.png
tags: configuring-networks-via-gcloud-gsp630, configuring-networks-via-gcloud, gsp630

---

## Overview

A Virtual Private Cloud (VPC) network is a global resource which consists of a list of regional virtual subnetworks (subnets) in data centers, all connected by a global wide area network (WAN). VPC networks are logically isolated from each other in Google Cloud.

VPC provides networking functionality to Compute Engine virtual machine (VM) instances, Kubernetes Engine containers, and App Engine Flex. Each Google Cloud project by default has a `default` network configuration which provides each region with an auto subnet network.

In this lab you use `gcloud` to create two custom VPC networks with subnets, firewall rules, and VM instances, then test the networks' ability to allow traffic from the public internet.

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
    student-04-3b4567274869@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    ZgvliTePFX5D
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-694eacaf6949`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-694eacaf6949
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
ACCOUNT: student-04-3b4567274869@qwiklabs.net

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
project = qwiklabs-gcp-04-694eacaf6949
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

Install `ping` to use later in this lab:

```apache
sudo apt install iputils-ping
```

## Task 1. Create network

You can choose to create an `auto mode` or `custom mode` VPC network. Each new network that you create must have a unique name within the same project. You can create up to four additional networks in a project.

* In Cloud Shell, use the following `gcloud` command to create a custom mode network called `labnet`:
    

```apache
gcloud compute networks create labnet --subnet-mode=custom
```

With this command you're doing the following:

* `gcloud` invokes the Cloud SDK `gcloud` command line tool
    
* `compute` is a one of the groups available in `gcloud`, part of a nested hierarchy of command groups
    
* `networks` is a subgroup of `compute` with it's own specialized commands
    
* `create` is the action to be executed on this group
    
* `labnet` is the name of the network you're creating
    
* `--subnet-mode=custom` you're passing the subnet mode flag and the type of subnet you're creating, "custom".
    

Click **Check my progress** to verify the objective.

Create a VPC with custom subnet mode

**Check my progress**

## Task 2. Create a subnetwork

When you create a subnetwork, its name must be unique in that project for that region, even across networks. The same name can appear twice in a project as long as each one is in a different region.

Each subnet must have a primary range, which must be unique within the same region in a project.

* Now create sub-network `labnet-sub`:
    

```apache
gcloud compute networks subnets create labnet-sub \
   --network labnet \
   --region "europe-west1" \
   --range 10.0.0.0/28
```

Click **Check my progress** to verify the objective.

Create custom subnet within the labnet VPC

**Check my progress**

## Task 3. Viewing networks

1. List the networks in your project:
    

```apache
gcloud compute networks list
```

Your output should look like this:

```apache
NAME: default
SUBNET_MODE: AUTO
BGP_ROUTING_MODE: REGIONAL
IPV4_RANGE:
GATEWAY_IPV4:

NAME: labnet
SUBNET_MODE: CUSTOM
BGP_ROUTING_MODE: REGIONAL
IPV4_RANGE:
GATEWAY_IPV4:
```

**Note:** Now you can see the `default` network that was created for your project.

2. Use `describe` to view network details, such as its peering connections and subnets. Replace `NETWORK_NAME` with the name of your network:
    

```apache
gcloud compute networks describe NETWORK_NAME
```

## Task 4. List subnets

You can list all subnets in all networks in your project, or you can show only the subnets for a particular network or region.

* Use this command to list all subnets in all VPC networks, in all regions:
    

```apache
gcloud compute networks subnets list
```

You'll see the subnet you created towards the bottom of the list. It's the only one in the `labnet` network.

## Task 5. Creating firewall rules

Auto networks include default rules, custom networks do not include any firewall rules. Firewall rules are defined at the network level, and only apply to the network where they are created.

The name you choose for each firewall rule must be unique to the project. To allow access to VM instances, you must apply firewall rules.

* Create the `labnet-allow-internal` firewall rule:
    

```apache
gcloud compute firewall-rules create labnet-allow-internal \
	--network=labnet \
	--action=ALLOW \
	--rules=icmp,tcp:22 \
	--source-ranges=0.0.0.0/0
```

With this command you are doing the following:

* `firewall-rules` is a subcategory of `compute`
    
* `create` is the action you are taking
    
* `labnet-allow-internal` is the name of the firewall rule
    
* `--network=labnet` puts the rule in the `labnet` network
    
* `--action=ALLOW` must be used with the `--rules` flag, and is either "ALLOW" or "DENY"
    
* `--rules=icmp,tcp:22` specifies the icmp and tcp protocols and the ports that the rule applies to
    
* `--source-ranges=0.0.0.0/0` specifies the ranges of source IP addresses in CIDR format.
    

Click **Check my progress** to verify the objective.

Add firewall rules to allow tcp:22 and ICMP

**Check my progress**

## Task 6. Viewing firewall rules details

* Inspect the firewall rules to see its name, applicable network, and components, including whether the rule is enabled or disabled:
    

```apache
gcloud compute firewall-rules describe [FIREWALL_RULE_NAME]
```

## Task 7. Create another network

Now you'll create a another network, add firewall rules to it, then add VMs to both networks to test the ability to communicate with the networks.

1. Run the following command to create the **privatenet** network:
    

```apache
gcloud compute networks create privatenet --subnet-mode=custom
```

2. Create the **private-sub** subnet:
    

```apache
gcloud compute networks subnets create private-sub \
    --network=privatenet \
    --region="europe-west1" \
    --range 10.1.0.0/28
```

### Create the firewall rules for privatenet

1. Run the following command to create the **privatenet-deny** firewall rule:
    

```apache
gcloud compute firewall-rules create privatenet-deny \
    --network=privatenet \
    --action=DENY \
    --rules=icmp,tcp:22 \
    --source-ranges=0.0.0.0/0
```

This firewall rule denies all access from the internal protocol.

The output should look like this:

```apache
Creating firewall...done.
NAME: privatenet-deny
NETWORK: privatenet
DIRECTION: INGRESS
PRIORITY: 1000
ALLOW:
DENY: icmp,tcp:22
DISABLED: False
```

Click **Check my progress** to verify the objective.

Create another VPC, subnet and required deny firewall rules

**Check my progress**

2. Run the following command to list all the firewall rules (sorted by VPC network):
    

```apache
gcloud compute firewall-rules list --sort-by=NETWORK
```

3. Look for the networks you created to quickly find your firewall rules.
    

## Task 8. Create VM instances

Create two VM instances in the subnets:

* **pnet-vm** in **private-sub**
    
* **lnet-vm** in **labnet-sub**
    

### Create the pnet-vm instance

* Run the following command to create the **pnet-vm** instance in the `private-sub` subnet:
    

```apache
gcloud compute instances create pnet-vm \
--zone="europe-west1-c" \
--machine-type=n1-standard-1 \
--subnet=private-sub
```

The output should look like this:

```apache
NAME: pnet-vm
ZONE:"europe-west1-c"
MACHINE_TYPE: n1-standard-1
PREEMPTIBLE:
INTERNAL_IP: 10.1.0.2
EXTERNAL_IP: 34.122.106.173
STATUS: RUNNING
```

### Create the lnet-vm instance

1. In the Cloud Console, on the **Navigation menu** (), click **Compute Engine** &gt; **VM instances**.
    
2. Click **Create Instance**.
    
3. In the **Machine configuration**, specify the following, and leave the remaining settings as their defaults:
    

| **Property** | **Value** |
| --- | --- |
| Name | lnet-vm |
| Region | `europe-west1` |
| Zone | `europe-west1-c` |
| Series | N1 |
| Machine type | n1-standard-1 |

4. Click **Networking**.
    
    Under **Network interfaces**, click the dropdown icon to edit.
    
    * Network: labnet
        
    * Subnet: labnet-sub
        
5. Click **Create**.
    
6. Now list all the VM instances (sorted by zone):
    

```apache
gcloud compute instances list --sort-by=ZONE
```

For this command you're using the `instance` subgroup, with it's specialized command `list`.

You should see the 2 VMs you just created:

```apache
NAME     ZONE           MACHINE_TYPE   ...  INTERNAL_IP  EXTERNAL_IP      STATUS
lnet-vm  europe-west1-c  n1-standard-1               10.0.0.2     35.202.156.230   RUNNING
pnet-vm  europe-west1-c  n1-standard-1               10.0.0.2     104.154.146.108  RUNNING
```

Click **Check my progress** to verify the objective.

Create VM instances

**Check my progress**

## Task 9. Explore the connectivity

When you created the networks, you applied firewall rules to each - so one network allows INGRESS traffic, and the other denies INGRESS traffic.

For this experiment, you should be able to communicate with the first network, but be unable to communicate with the second one.

### Ping the external IP addresses

1. Ping the external IP addresses of the VM instances to determine if you can reach the instances from the public internet.
    

```apache
ping -c 3 <Enter lnet-vm's external IP here>
```

This should work - `lnet-vm`'s network has a firewall rule that allows traffic.

2. Repeat the command, but use `pnet-vm`'s external IP address.
    

This should not work - nothing should be happening. `pnet-vm`'s network has a firewall rule that denies traffic. Use **Ctrl**+**C** to end the process.

---

## Solution of Lab

%[https://youtu.be/vlzjNYvN73Y] 

```apache
export ZONE=
```

```apache
curl -LO raw.githubusercontent.com/Cloud-Wala-Banda/Labs-Solutions/main/Configuring%20Networks%20via%20gcloud/gsp630.sh
sudo chmod +x gsp630.sh
./gsp630.sh
```