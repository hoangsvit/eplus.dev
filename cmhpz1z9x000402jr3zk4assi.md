---
title: "gcloud for Network Configuration (Solution)"
seoTitle: "gcloud for Network Configuration (Solution)"
seoDescription: "Learn how to configure VPC networks and firewall rules using gcloud commands to manage traffic in Google Cloud efficiently"
datePublished: Sat Nov 08 2025 07:37:23 GMT+0000 (Coordinated Universal Time)
cuid: cmhpz1z9x000402jr3zk4assi
slug: gcloud-for-network-configuration-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762587409886/18036888-ce4a-4c5d-9945-518bd2357a8e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1762587419355/d92428e7-95b6-44f3-b120-6dae5bfad299.png
tags: gcloud-for-network-configuration, gcloud-for-network-configuration-solution

---

## Overview

A Virtual Private Cloud (VPC) network is a global resource which consists of a list of regional virtual subnetworks (subnets) in data centers, all connected by a global wide area network (WAN). VPC networks are logically isolated from each other in Google Cloud.

VPC provides networking functionality to Compute Engine virtual machine (VM) instances, Kubernetes Engine containers, and App Engine Flex. Each Google Cloud project by default has a `default` network configuration which provides each region with an auto subnet network.

In this lab you use `gcloud` to create two firewall rules, and test the networks' ability to allow traffic from the public internet.

## Setup and requirements

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

**Pre-configured resources:**

* You have pre-created custom networks **labnet** with subnetwork **labnet-sub** and **privatenet** with subnetwork **private-sub**.
    
* You have pre-created VM instances for this lab **lnet-vm** and **pnet-vm** created in the **labnet-sub** and **private-sub** subnetwork respectively.
    

## Task 1. Viewing networks

1. List the networks in your project:
    

```apache
gcloud compute networks list
```



Your output should look like this:

```apache
NAME        SUBNET_MODE  BGP_ROUTING_MODE  IPV4_RANGE  GATEWAY_IPV4
default     AUTO         REGIONAL
labnet      CUSTOM       REGIONAL
privatenet  CUSTOM       REGIONAL
```

You can see the two pre-created custom networks for this lab.

2. Use `describe` to view network details, such as its peering connections and subnets:
    

```apache
gcloud compute networks describe labnet
```



```apache
gcloud compute networks describe privatenet
```



## Task 2. List subnets

You can list all subnets in all networks in your project, or you can show only the subnets for a particular network or region.

Use the following command to list all subnets in all VPC networks in all regions:

```apache
gcloud compute networks subnets list
```



## Task 3. Describe a subnet

You can view the details of an existing subnet, such as its primary IPv4 ranges, secondary IP ranges, IPv6 ranges, and region.

1. Replace `SUBNET_NAME` with the name of the subnet of one of the two pre-created networks:
    

```apache
gcloud compute networks subnets describe SUBNET_NAME \
    --region="us-west1"
```



2. Run the code again with the other subnet name.
    

## Task 4. Creating firewall rules

Auto networks include default rules, custom networks do not include any firewall rules. Firewall rules are defined at the network level, and only apply to the network where they are created.

The name you choose for each firewall rule must be unique to the project. To allow access to VM instances, you must apply firewall rules.

* Run the following to create the `labnet-allow-internal` firewall rule:
    

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

## Task 5. Viewing firewall rules details

Now you'll inspect the firewall rules to see its name, applicable network, and components, including whether the rule is enabled or disabled.

* Replace `FIREWALL_RULE_NAME` in the following command with the name of firewall rule you created in Task 4.
    

```apache
gcloud compute firewall-rules describe [FIREWALL_RULE_NAME]
```



## Task 6. Create another firewall rule for privatenet

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

Create deny firewall rules

2. Run the following command to list all the firewall rules (sorted by VPC network). Replace `NETWORK_NAME` with the name of a pre-created custom network.
    

```apache
gcloud compute firewall-rules list --sort-by=NETWORK_NAME
```



3. Look for the custom networks you have listed to quickly find your firewall rules.
    

## Task 7. List VM instances

You have two pre-created VM instances for this lab.

* Run the following command to list all the VM instances:
    

```apache
gcloud compute instances list
```



For this command, you're using the `instance` subgroup, with it's specialized command `list`.

```apache
NAME     ZONE           MACHINE_TYPE   ...  INTERNAL_IP  EXTERNAL_IP      STATUS
lnet-vm  us-west1-b  n1-standard-1               10.0.0.2     35.202.156.230   RUNNING
pnet-vm  us-west1-b  n1-standard-1               10.1.0.2     104.154.146.108  RUNNING
```

## Task 8. Explore the connectivity

You applied firewall rules to each network - so one network allows INGRESS traffic, and the other denies INGRESS traffic.

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

%[https://youtu.be/Z72nhwkN6Z4] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/gcloud-for-network-configuration/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/gcloud%20for%20Network%20Configuration/quicklabgsp694.sh
sudo chmod +x quicklabgsp694.sh
./quicklabgsp694.sh
```