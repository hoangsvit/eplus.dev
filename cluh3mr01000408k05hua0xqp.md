---
title: "Multiple VPC Networks"
seoTitle: "Multiple VPC Networks"
seoDescription: "Virtual Private Cloud (VPC) networks allow you to maintain isolated environments within a larger cloud structure, giving you granular control over data prot"
datePublished: Mon Apr 01 2024 15:22:21 GMT+0000 (Coordinated Universal Time)
cuid: cluh3mr01000408k05hua0xqp
slug: multiple-vpc-networks
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1711984866185/d57d95b9-c6f5-4ff0-893c-48864e7fb532.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1711984879662/12698188-a3a4-4259-949c-6f55ed3fef1c.png
tags: virtual-private-cloud

---

## **Overview**

Virtual Private Cloud (VPC) networks allow you to maintain isolated environments within a larger cloud structure, giving you granular control over data protection, network access, and application security.

In this lab you create several VPC networks and VM instances, then test connectivity across networks. Specifically, you create two custom mode networks (**managementnet** and **privatenet**) with firewall rules and VM instances as shown in this network diagram:

%[https://www.youtube.com/watch?v=ynJqk8lSmKI&ab_channel=TechVine] 

```apache
gcloud auth list
gcloud config list project

export REG=

export ZONE=

# Extract the region from the ZONE variable (remove the last 2 characters)
export REGION=${ZONE::-2}

# Create a custom network named "managementnet"
gcloud compute networks create managementnet --subnet-mode=custom

# Create a subnet named "managementsubnet-$REGION" in the "managementnet" network in the specified region with the given IP range
gcloud compute networks subnets create managementsubnet-$REGION --network=managementnet --region=$REGION --range=10.130.0.0/20

# Create a custom network named "privatenet"
gcloud compute networks create privatenet --subnet-mode=custom

# Create a subnet named "privatesubnet-$REGION" in the "privatenet" network in the specified region with the given IP range
gcloud compute networks subnets create privatesubnet-$REGION --network=privatenet --region=$REGION --range=172.16.0.0/24

# Create another subnet named "privatesubnet-$REG" in the "privatenet" network in the specified region with a different IP range
gcloud compute networks subnets create privatesubnet-$REG --network=privatenet --region=$REGION --range=172.20.0.0/20

# Create a firewall rule allowing ICMP, SSH, and RDP traffic in the "managementnet" network
gcloud compute firewall-rules create managementnet-allow-icmp-ssh-rdp --direction=INGRESS --priority=1000 --network=managementnet --action=ALLOW --rules=icmp,tcp:22,tcp:3389 --source-ranges=0.0.0.0/0

# Create a firewall rule allowing ICMP, SSH, and RDP traffic in the "privatenet" network
gcloud compute firewall-rules create privatenet-allow-icmp-ssh-rdp --direction=INGRESS --priority=1000 --network=privatenet --action=ALLOW --rules=icmp,tcp:22,tcp:3389 --source-ranges=0.0.0.0/0

# Create an instance named "managementnet-${REGION}-vm" in the specified zone with the machine type "e2-micro" and assigned to "managementsubnet-$REGION"
gcloud compute instances create managementnet-${REGION}-vm --zone=$ZONE --machine-type=e2-micro --subnet=managementsubnet-$REGION

# Create an instance named "privatenet-${REGION}-vm" in the specified zone with the machine type "e2-micro" and assigned to "privatesubnet-$REGION"
gcloud compute instances create privatenet-${REGION}-vm --zone=$ZONE --machine-type=e2-micro --subnet=privatesubnet-$REGION

# Create an instance named "vm-appliance" in the specified zone with the machine type "e2-standard-4"
# Attach network interfaces to "privatesubnet-$REGION," "managementsubnet-$REGION," and "mynetwork"
gcloud compute instances create vm-appliance \
--zone=$ZONE \
--machine-type=e2-standard-4 \
--network-interface=network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=privatesubnet-$REGION \
--network-interface=network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=managementsubnet-$REGION \
--network-interface=network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=mynetwork
```