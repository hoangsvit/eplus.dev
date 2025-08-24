---
title: "VPC Networking: Cloud HA-VPN - GSP619"
seoTitle: "VPC Networking: Cloud HA-VPN - GSP619"
seoDescription: "Configure Google Cloud's HA-VPN for enhanced security, high availability, and connectivity between on-premises and virtual private cloud networks"
datePublished: Sat Aug 16 2025 04:59:10 GMT+0000 (Coordinated Universal Time)
cuid: cmedsez16000502jy8sh0biv2
slug: vpc-networking-cloud-ha-vpn-gsp619
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755319579481/f17ce90a-81ea-4b7b-8db4-edacf60af59f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755320326159/7b4d4925-f4d5-40a0-913f-087941d97609.png
tags: vpc-networking-cloud-ha-vpn-gsp619, vpc-networking-cloud-ha-vpn, gsp619, vpc-networking, cloud-ha-vpn, ha-vpn

---

## Overview

HA-VPN is IPSec VPN solution to enable secure connectivity between your on-premise network to your Google Cloud Virtual Private Cloud (VPC) network through an IPSec VPN connection with 99.99% service availability at GA. HA-VPN is a regional per VPC VPN solution. HA-VPN gateways have two interfaces, each with their own public IP address. When you create a HA-VPN gateway, two public IP addresses are automatically chosen from different address pools. When HA-VPN is configured with two tunnels, Cloud VPN offers a 99.99% service availability uptime.

### What you'll learn

* How to configure high availability ha-vpn gateways
    
* How to configure dynamic routing with vpn tunnels
    
* How to configure global dynamic routing mode
    
* How to verify high availability ha-vpn gateways
    

**Note:** This is a Beta release of HA VPN. This feature is not covered by any SLA or deprecation policy and might be subject to backward-incompatible changes.

### Prerequisites

* Basic knowledge of Compute Engine.
    
* It is helpful to have completed the [Networking 101](https://google.qwiklabs.com/catalog_lab/311) and [Multiple VPC Networks](https://google.qwiklabs.com/catalog_lab/1031) labs.
    

## Setup and requirements

For this lab, you will set up two VPCs and add a cloud HA-VPN gateway in each. You will run two tunnels from each VPN gateway to demonstrate the HA-VPN gateway configuration for 99.99% SLA.

You will create a global VPC network, `vpc-demo`, with two custom subnets in `europe-west1` and `us-east4`. In this VPC, you will add a Compute Engine instance in each region. You will create a second vpc on-prem to simulate customer's on-prem data center. In this VPC, you will add a subnet in region `us-east4` and an instance running in this region. You will then add Cloud HA-VPN and a cloud router in each vpc, and run two tunnels from each cloud HA-VPN gateway.

![The Google Cloud HA-VPN architecture.](https://cdn.qwiklabs.com/vAwG1IyoKVvefoTP5eDVuMZ8s%2F2pgUsH8JNzf9LArew%3D align="left")

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
    student-01-1c69912fc9c0@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    8vgJsaUauNyM
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-bf5c6b694a1c`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-bf5c6b694a1c
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
ACCOUNT: student-01-1c69912fc9c0@qwiklabs.net

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
project = qwiklabs-gcp-00-bf5c6b694a1c
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Cloud VPC setup

* From Cloud Shell, create a vpc network called `vpc-demo`:
    

```apache
gcloud compute networks create vpc-demo --subnet-mode custom
```

**Output:**

```apache
Created [https://www.googleapis.com/compute/v1/projects/vpcuser76project/global/networks/vpc-demo].
NAME: vpc-demo
SUBNET_MODE: CUSTOM
BGP_ROUTING_MODE: REGIONAL
IPV4_RANGE:
GATEWAY_IPV4:
```

### **Create subnets**

1. Now create subnet `vpc-demo-subnet1` in `us-east4` region:
    

```apache
gcloud beta compute networks subnets create vpc-demo-subnet1 \
--network vpc-demo --range 10.1.1.0/24 --region us-east4
```

**Output:**

```apache
Created [https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/subnetworks/vpc-demo-subnet1].
NAME: vpc-demo-subnet1
REGION: us-east4
NETWORK: vpc-demo
RANGE: 10.1.1.0/24
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
INTERNAL_IPV6_PREFIX:
EXTERNAL_IPV6_PREFIX:
```

2. Create subnet `vpc-demo-subnet2` in `europe-west1` region:
    

```apache
gcloud beta compute networks subnets create vpc-demo-subnet2 \
--network vpc-demo --range 10.2.1.0/24 --region europe-west1
```

**Output:**

```apache
Created [https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/europe-west1/subnetworks/vpc-demo-subnet2].
NAME: vpc-demo-subnet2
REGION: europe-west1
NETWORK: vpc-demo
RANGE: 10.2.1.0/24
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
INTERNAL_IPV6_PREFIX:
EXTERNAL_IPV6_PREFIX:
```

### **Create firewall rules**

1. Create a firewall rule to allow all internal traffic within the network:
    

```apache
gcloud compute firewall-rules create vpc-demo-allow-internal \
  --network vpc-demo \
  --allow tcp:0-65535,udp:0-65535,icmp \
  --source-ranges 10.0.0.0/8
```

**Output:**

```apache
Creating firewall...⠧Created [https://www.googleapis.com/compute/v1/projects/binal-sandbox/global/firewalls/vpc-demo-allow-internal].
Creating firewall...done.
NAME: vpc-demo-allow-internal
NETWORK: vpc-demo
DIRECTION: INGRESS
PRIORITY: 1000
ALLOW: tcp:0-65535,udp:0-65535,icmp
DENY:
DISABLED: False
```

2. Create a firewall rule to allow ssh, icmp from anywhere:
    

```apache
gcloud compute firewall-rules create vpc-demo-allow-ssh-icmp \
    --network vpc-demo \
    --allow tcp:22,icmp
```

**Output:**

```apache
Creating firewall...⠧Created [https://www.googleapis.com/compute/v1/projects/binal-sandbox/global/firewalls/vpc-demo-allow-ssh-icmp].
Creating firewall...done.
NAME: vpc-demo-allow-ssh-icmp
NETWORK: vpc-demo
DIRECTION: INGRESS
PRIORITY: 1000
ALLOW: tcp:22,icmp
DENY:
DISABLED: False
```

### **Create vm instances in network** `vpc-demo`

1. Create a vm instance `vpc-demo-instance1` in zone `us-east4-b`:
    

```apache
gcloud compute instances create vpc-demo-instance1 --zone us-east4-b --subnet vpc-demo-subnet1 --machine-type e2-medium
```

**Output:**

```apache
Created [https://www.googleapis.com/compute/v1/projects/binal-sandbox/zones/us-east4-b/instances/vpc-demo-instance1].
NAME: vpc-demo-instance1
ZONE: us-east4-b
MACHINE_TYPE: e2-medium
PREEMPTIBLE:
INTERNAL_IP: 10.1.1.2
EXTERNAL_IP: 34.77.98.76
STATUS: RUNNING
```

2. Create a vm instance `vpc-demo-instance2` in zone `europe-west1-b`
    

```apache
gcloud compute instances create vpc-demo-instance2 --zone europe-west1-b --subnet vpc-demo-subnet2 --machine-type e2-medium
```

**Output:**

```apache
Created [https://www.googleapis.com/compute/v1/projects/binal-sandbox/zones/europe-west1-b/instances/vpc-demo-instance2].
NAME: vpc-demo-instance2
ZONE: europe-west1-b
MACHINE_TYPE: e2-medium
PREEMPTIBLE:
INTERNAL_IP: 10.2.1.2
EXTERNAL_IP: 34.171.235.114
STATUS: RUNNING
```

Click *Check my progress* to verify the objective.

Cloud VPC Setup

## Task 2. Simulate on-premises setup

Network vpc on-prem simulates on-premise environment from where customer wants to connect to Google Cloud environment.

* Create a vpc network called `on-prem`:
    

```apache
gcloud compute networks create on-prem --subnet-mode custom
```

**Output:**

```apache
Created [https://www.googleapis.com/compute/v1/projects/binal-sandbox/global/networks/on-prem].
NAME: on-prem
SUBNET_MODE: CUSTOM
BGP_ROUTING_MODE: REGIONAL
IPV4_RANGE:
GATEWAY_IPV4:
```

### **Create subnets**

* Create subnet `on-prem-subnet1`:
    

```apache
gcloud beta compute networks subnets create on-prem-subnet1 \
--network on-prem --range 192.168.1.0/24 --region us-east4
```

**Output:**

```apache
Created [https://www.googleapis.com/compute/alpha/projects/binal-sandbox/regions/us-east4/subnetworks/on-prem-subnet1].
NAME: on-prem-subnet1
REGION: us-east4
NETWORK: on-prem
RANGE: 192.168.1.0/24
STACK_TYPE: IPV4_ONLY
IPV6_ACCESS_TYPE:
INTERNAL_IPV6_PREFIX:
EXTERNAL_IPV6_PREFIX:
```

### **Create firewall rules**

1. Create a firewall rule to allow all internal traffic within the network:
    

```apache
gcloud compute firewall-rules create on-prem-allow-internal \
  --network on-prem \
  --allow tcp:0-65535,udp:0-65535,icmp \
  --source-ranges 192.168.0.0/16
```

**Output:**

```apache
Creating firewall...⠧Created [https://www.googleapis.com/compute/v1/projects/binal-sandbox/global/firewalls/on-prem-allow-internal].
Creating firewall...done.
NAME: on-prem-allow-internal
NETWORK: on-prem
DIRECTION: INGRESS
PRIORITY: 1000
ALLOW: tcp:0-65535,udp:0-65535,icmp
DENY:
DISABLED: False
```

2. Create a firewall rule to allow ssh, rdp, http, icmp to the instances:
    

```apache
gcloud compute firewall-rules create on-prem-allow-ssh-icmp \
    --network on-prem \
    --allow tcp:22,icmp
```

**Output:**

```apache
Creating firewall...⠶Created [https://www.googleapis.com/compute/v1/projects/binal-sandbox/global/firewalls/on-prem-allow-ssh-icmp].
Creating firewall...done.
NAME                    NETWORK  DIRECTION  PRIORITY  ALLOW        DENY  DISABLED
on-prem-allow-ssh-icmp  on-prem  INGRESS    1000      tcp:22,icmp        False
```

### **Create a test instance in network** `on-prem`

* Create an instance `vpc-demo-instance1` in region `us-east4`:
    

```apache
gcloud compute instances create on-prem-instance1 --zone us-east4-a --subnet on-prem-subnet1 --machine-type e2-medium
```

**Output:**

```apache
Created [https://www.googleapis.com/compute/v1/projects/binal-sandbox/zones/us-east4-a/instances/on-prem-instance1].
NAME: on-prem-instance1
ZONE: us-east4-a
MACHINE_TYPE: e2-medium
PREEMPTIBLE:
INTERNAL_IP: 192.168.1.2
EXTERNAL_IP: 34.76.57.188
STATUS: RUNNING
```

Click *Check my progress* to verify the objective.

Simulate on-premises setup

## Task 3. HA-VPN setup

Next you'll create a cloud HA-VPN gateway in each VPC network, then spin up HA-VPN tunnels on each Cloud VPN gateway.

1. Create a Cloud HA-VPN in network `vpc-demo`:
    

```apache
gcloud beta compute vpn-gateways create vpc-demo-vpn-gw1 --network vpc-demo --region us-east4
```

**Output:**

```apache
Creating VPN Gateway...done.
NAME: vpc-demo-vpn-gw1
INTERFACE0: 35.242.85.199
INTERFACE1: 35.220.126.56
INTERFACE0_IPV6:
INTERFACE1_IPV6:
NETWORK: vpc-demo
REGION: us-east4
```

2. Create a Cloud HA-VPN in network `on-prem`:
    

```apache
gcloud beta compute vpn-gateways create on-prem-vpn-gw1 --network on-prem --region us-east4
```

**Output:**

```apache
Creating VPN Gateway...done.
NAME: on-prem-vpn-gw1
INTERFACE0: 35.242.90.80
INTERFACE1: 35.220.117.13
INTERFACE0_IPV6:
INTERFACE1_IPV6:
NETWORK: on-prem
REGION: us-east4
```

#### View details of the vpn-gateways

1. View details of vpn-gateway `vpc-demo-vpn-gw1`:
    

```apache
gcloud beta compute vpn-gateways describe vpc-demo-vpn-gw1 --region us-east4
```

**Output:**

```apache
creationTimestamp: '2018-12-28T08:53:20.680-08:00'
id: '3829536917981752303'
kind: compute#vpnGateway
labelFingerprint: 42WmSpB8rSM=
name: vpc-demo-vpn-gw1
network: https://www.googleapis.com/compute/alpha/projects/binal-sandbox/global/networks/vpc-demo
region: https://www.googleapis.com/compute/alpha/projects/binal-sandbox/regions/us-east4
selfLink: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/vpnGateways/vpc-demo-vpn-gw1
vpnInterfaces:
- id: 0
  ipAddress: 35.242.116.91
- id: 1
  ipAddress: 35.220.87.201
```

2. View details of vpn-gateway `on-prem-vpn-gw1`:
    

```apache
gcloud beta compute vpn-gateways describe on-prem-vpn-gw1 --region us-east4
```

**Output:**

```apache
creationTimestamp: '2018-12-28T09:14:39.450-08:00'
id: '546345659289822992'
kind: compute#vpnGateway
labelFingerprint: 42WmSpB8rSM=
name: on-prem-vpn-gw1
network: https://www.googleapis.com/compute/beta/projects/binal-sandbox/global/networks/on-prem
region: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4
selfLink: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/vpnGateways/on-prem-vpn-gw1
vpnInterfaces:
- id: 0
  ipAddress: 35.242.125.8
- id: 1
  ipAddress: 35.220.90.112
```

### **Create cloud routers**

1. Create a cloud router in network `vpc-demo`:
    

```apache
gcloud compute routers create vpc-demo-router1 \
    --region us-east4 \
    --network vpc-demo \
    --asn 65001
```

**Output:**

```apache
Creating router [vpc-demo-router1]...done.
NAME: vpc-demo-router1
REGION: us-east4
NETWORK: vpc-demo
```

2. Create a cloud router in network `on-prem`:
    

```apache
gcloud compute routers create on-prem-router1 \
    --region us-east4 \
    --network on-prem \
    --asn 65002
```

**Output:**

```apache
Creating router [on-prem-router1]...done.
NAME: on-prem-router1
REGION: us-east4
NETWORK: on-prem
```

Click *Check my progress* to verify the objective.

Create gateway and routers

### **Create two VPN tunnels**

You are now ready to create VPN tunnels between the two gateways. For HA-VPN setup, you need to add two tunnels from each gateway to the remote setup. You will create a tunnel on interface0 and connect to interface0 on remote gateway. You will create another tunnel on interface1 and connect to interface1 on remote gateway.

When you run HA-VPN tunnels between two Google Cloud VPCs, you need to make sure that tunnel on interface0 is connected to interface0 on the remote VPN gateway. Similarly, the tunnel on interface1 must be connected to interface1 on the remote VPN gateway.

**Note:** In your own environment, if you run HA-VPN to a remote VPN gateway on-premise for a customer, you can connect in one of the following ways:

* *Two on-premise VPN gateway devices*: each of the tunnels from each interface on the Cloud VPN gateway must be connected to its own peer gateway.
    
* *A single on-premises VPN gateway device with two interfaces*: each of the tunnels from each interface on the Cloud VPN gateway must be connected to its own interface on the peer gateway.
    
* *A single on-premises VPN gateway device with a single interface*: both of the tunnels from each interface on the Cloud VPN gateway must be connected to the same interface on the peer gateway.
    

For this setup, you are simulating on-prem setup with both vpn gateways in Google Cloud. Ensure that interface0 of one gateway connects to interface0 of the other and interface1 connects to interface1 of the remote gateway.

1. Create the first VPN tunnels in network `vpc-demo`:
    

```apache
gcloud beta compute vpn-tunnels create vpc-demo-tunnel0 \
    --peer-gcp-gateway on-prem-vpn-gw1 \
    --region us-east4 \
    --ike-version 2 \
    --shared-secret [SHARED_SECRET] \
    --router vpc-demo-router1 \
    --vpn-gateway vpc-demo-vpn-gw1 \
    --interface 0
```

**Output:**

```apache
Creating VPN tunnel...done.
NAME: vpc-demo-tunnel0
REGION: us-east4
GATEWAY: vpc-demo-vpn-gw1
VPN_INTERFACE: 0
PEER_ADDRESS: 35.242.90.80
```

2. Now create the second tunnel:
    

```apache
gcloud beta compute vpn-tunnels create vpc-demo-tunnel1 \
    --peer-gcp-gateway on-prem-vpn-gw1 \
    --region us-east4 \
    --ike-version 2 \
    --shared-secret [SHARED_SECRET] \
    --router vpc-demo-router1 \
    --vpn-gateway vpc-demo-vpn-gw1 \
    --interface 1
```

**Output:**

```apache
Creating VPN tunnel...done.
NAME: vpc-demo-tunnel1
REGION: us-east4
GATEWAY: vpc-demo-vpn-gw1
VPN_INTERFACE: 1
PEER_ADDRESS: 35.220.117.13
```

#### **Create two vpn tunnels in network on-prem**

1. Create `on-prem-tunnel0` with the following command:
    

```apache
gcloud beta compute vpn-tunnels create on-prem-tunnel0 \
    --peer-gcp-gateway vpc-demo-vpn-gw1 \
    --region us-east4 \
    --ike-version 2 \
    --shared-secret [SHARED_SECRET] \
    --router on-prem-router1 \
    --vpn-gateway on-prem-vpn-gw1 \
    --interface 0
```

**Output:**

```apache
Creating VPN tunnel...done.
NAME: on-prem-tunnel0
REGION: us-east4
GATEWAY: on-prem-vpn-gw1
VPN_INTERFACE: 0
PEER_ADDRESS: 35.242.85.199
```

2. Create `on-prem-tunnel1` with the following command:
    

```apache
gcloud beta compute vpn-tunnels create on-prem-tunnel1 \
    --peer-gcp-gateway vpc-demo-vpn-gw1 \
    --region us-east4 \
    --ike-version 2 \
    --shared-secret [SHARED_SECRET] \
    --router on-prem-router1 \
    --vpn-gateway on-prem-vpn-gw1 \
    --interface 1
```

**Output:**

```apache
Creating VPN tunnel...done.
NAME             REGION       GATEWAY          VPN_INTERFACE  PEER_ADDRESS
on-prem-tunnel1  us-east4  on-prem-vpn-gw1  1              35.220.87.201
```

### Create bgp peering for each tunnel

HA-VPN requires dynamic routing to enable 99.99% availability. Next, configure bgp peering for each vpn tunnel between `vpc-demo` and vpc `on-prem`.

1. Create the router interface for `tunnel0` in network `vpc-demo`:
    

```apache
gcloud compute routers add-interface vpc-demo-router1 \
    --interface-name if-tunnel0-to-on-prem \
    --ip-address 169.254.0.1 \
    --mask-length 30 \
    --vpn-tunnel vpc-demo-tunnel0 \
    --region us-east4
```

**Output:**

```apache
Updated [https://www.googleapis.com/compute/v1/projects/binal-sandbox/regions/us-east4/routers/vpc-demo-router1].
```

2. And the bgp peer for `tunnel0` in network `vpc-demo`:
    

```apache
gcloud compute routers add-bgp-peer vpc-demo-router1 \
    --peer-name bgp-on-prem-tunnel0 \
    --interface if-tunnel0-to-on-prem \
    --peer-ip-address 169.254.0.2 \
    --peer-asn 65002 \
    --region us-east4
```

**Output:**

```apache
Creating peer [bgp-on-prem-tunnel0] in router [vpc-demo-router1]...done.
```

3. Create router interface for `tunnel1` in network `vpc-demo`:
    

```apache
gcloud compute routers add-interface vpc-demo-router1 \
    --interface-name if-tunnel1-to-on-prem \
    --ip-address 169.254.1.1 \
    --mask-length 30 \
    --vpn-tunnel vpc-demo-tunnel1 \
    --region us-east4
```

**Output:**

```apache
Updated [https://www.googleapis.com/compute/v1/projects/binal-sandbox/regions/us-east4/routers/vpc-demo-router1]
```

4. And the bgp peer for `tunnel1` in network `vpc-demo`:
    

```apache
gcloud compute routers add-bgp-peer vpc-demo-router1 \
    --peer-name bgp-on-prem-tunnel1 \
    --interface if-tunnel1-to-on-prem \
    --peer-ip-address 169.254.1.2 \
    --peer-asn 65002 \
    --region us-east4
```

**Output:**

```apache
Creating peer [bgp-on-prem-tunnel1] in router [vpc-demo-router1]...done.
```

5. Create router interface for `tunnel0` in network `on-prem`:
    

```apache
gcloud compute routers add-interface on-prem-router1 \
    --interface-name if-tunnel0-to-vpc-demo \
    --ip-address 169.254.0.2 \
    --mask-length 30 \
    --vpn-tunnel on-prem-tunnel0 \
    --region us-east4
```

**Output:**

```apache
Updated [https://www.googleapis.com/compute/v1/projects/binal-sandbox/regions/us-east4/routers/on-prem-router1].
```

6. And the bgp peer for `tunnel0` in network `on-prem`:
    

```apache
gcloud compute routers add-bgp-peer on-prem-router1 \
    --peer-name bgp-vpc-demo-tunnel0 \
    --interface if-tunnel0-to-vpc-demo \
    --peer-ip-address 169.254.0.1 \
    --peer-asn 65001 \
    --region us-east4
```

**Output:**

```apache
Creating peer [bgp-vpc-demo-tunnel0] in router [on-prem-router1]...done.
```

7. Create router interface for tunnel1 in network `on-prem`:
    

```apache
gcloud compute routers add-interface  on-prem-router1 \
    --interface-name if-tunnel1-to-vpc-demo \
    --ip-address 169.254.1.2 \
    --mask-length 30 \
    --vpn-tunnel on-prem-tunnel1 \
    --region us-east4
```

**Output:**

```apache
Updated [https://www.googleapis.com/compute/v1/projects/binal-sandbox/regions/us-east4/routers/on-prem-router1].
```

8. And the bgp peer for tunnel1 in network `on-prem`:
    

```apache
gcloud compute routers add-bgp-peer  on-prem-router1 \
    --peer-name bgp-vpc-demo-tunnel1 \
    --interface if-tunnel1-to-vpc-demo \
    --peer-ip-address 169.254.1.1 \
    --peer-asn 65001 \
    --region us-east4
```

**Output:**

```apache
Creating peer [bgp-vpc-demo-tunnel1] in router [on-prem-router1]...done.
```

Click *Check my progress* to verify the objective.

Create VPN tunnels and bgp peering for each tunnel

### **Verify router configurations**

1. View details of Cloud Router `vpc-demo-router1` to verify its settings:
    

```apache
gcloud compute routers describe vpc-demo-router1 \
    --region us-east4
```

**Output:**

```apache
bgp:
  advertiseMode: DEFAULT
  asn: 65001
bgpPeers:
- interfaceName: if-tunnel0-to-on-prem
  ipAddress: 169.254.0.1
  name: bgp-on-prem-tunnel0
  peerAsn: 65002
  peerIpAddress: 169.254.0.2
- interfaceName: if-tunnel1-to-on-prem
  ipAddress: 169.254.1.1
  name: bgp-on-prem-tunnel1
  peerAsn: 65002
  peerIpAddress: 169.254.1.2
creationTimestamp: '2018-12-30T08:50:20.699-08:00'
id: '7222418780964866467'
interfaces:
- ipRange: 169.254.0.1/30
  linkedVpnTunnel: https://www.googleapis.com/compute/v1/projects/binal-sandbox/regions/us-east4/vpnTunnels/vpc-demo-tunnel0
  name: if-tunnel0-to-on-prem
- ipRange: 169.254.1.1/30
  linkedVpnTunnel: https://www.googleapis.com/compute/v1/projects/binal-sandbox/regions/us-east4/vpnTunnels/vpc-demo-tunnel1
  name: if-tunnel1-to-on-prem
kind: compute#router
name: vpc-demo-router1
network: https://www.googleapis.com/compute/v1/projects/binal-sandbox/global/networks/vpc-demo
region: https://www.googleapis.com/compute/v1/projects/binal-sandbox/regions/us-east4
selfLink: https://www.googleapis.com/compute/v1/projects/binal-sandbox/regions/us-east4/routers/vpc-demo-router1
binalshah@cloudshell:~ (binal-sandbox)$
binalshah@cloudshell:~ (binal-sandbox)$
```

2. View details of Cloud Router `on-prem-router1` to verify its settings:
    

```apache
gcloud compute routers describe on-prem-router1 \
    --region us-east4
```

**Output:**

```apache
bgp:
  advertiseMode: DEFAULT
  asn: 65002
bgpPeers:
- interfaceName: if-tunnel0-to-vpc-demo
  ipAddress: 169.254.0.2
  name: bgp-vpc-demo-tunnel0
  peerAsn: 65001
  peerIpAddress: 169.254.0.1
- interfaceName: if-tunnel1-to-vpc-demo
  ipAddress: 169.254.1.2
  name: bgp-vpc-demo-tunnel1
  peerAsn: 65001
  peerIpAddress: 169.254.1.1
creationTimestamp: '2018-12-30T08:52:03.099-08:00'
id: '1957342003432081756'
interfaces:
- ipRange: 169.254.0.2/30
  linkedVpnTunnel: https://www.googleapis.com/compute/v1/projects/binal-sandbox/regions/us-east4/vpnTunnels/on-prem-tunnel0
  name: if-tunnel0-to-vpc-demo
- ipRange: 169.254.1.2/30
  linkedVpnTunnel: https://www.googleapis.com/compute/v1/projects/binal-sandbox/regions/us-east4/vpnTunnels/on-prem-tunnel1
  name: if-tunnel1-to-vpc-demo
kind: compute#router
name: on-prem-router1
network: https://www.googleapis.com/compute/v1/projects/xxxxxx/global/networks/on-prem
region: https://www.googleapis.com/compute/v1/projects/xxxxxx/regions/us-east4
selfLink: https://www.googleapis.com/compute/v1/projects/xxxxxx/regions/us-east4/routers/on-prem-router1
```

### **Configure Firewall rules to allow traffic from the remote VPC**

Configure firewall rules to allow traffic from the private IP ranges of peer VPN.

1. Allow traffic from network vpc `on-prem` to `vpc-demo`:
    

```apache
gcloud compute firewall-rules create vpc-demo-allow-subnets-from-on-prem \
    --network vpc-demo \
    --allow tcp,udp,icmp \
    --source-ranges 192.168.1.0/24
```

**Output:**

```apache
Creating firewall...⠧Created [https://www.googleapis.com/compute/v1/projects/binal-sandbox/global/firewalls/vpc-demo-allow-subnets-from-on-prem].
Creating firewall...done.
NAME: vpc-demo-allow-subnets-from-on-prem
NETWORK: vpc-demo
DIRECTION: INGRESS
PRIORITY: 1000
ALLOW: tcp,udp,icmp
DENY:
DISABLED: False
```

2. Allow traffic from `vpc-demo` to network vpc `on-prem`:
    

```apache
gcloud compute firewall-rules create on-prem-allow-subnets-from-vpc-demo \
    --network on-prem \
    --allow tcp,udp,icmp \
    --source-ranges 10.1.1.0/24,10.2.1.0/24
```

**Output:**

```apache
Creating firewall...⠧Created [https://www.googleapis.com/compute/v1/projects/binal-sandbox/global/firewalls/on-prem-allow-subnets-from-vpc-demo].
Creating firewall...done.
NAME: on-prem-allow-subnets-from-vpc-demo
NETWORK: on-prem
DIRECTION: INGRESS
PRIORITY: 1000
ALLOW: tcp,udp,icmp
DENY:
DISABLED: False
```

Click *Check my progress* to verify the objective.

Configure Firewall rules to allow traffic from the remote VPC

### **Verify the status of the tunnels**

1. List the VPN tunnels you just created. There should be four vpn tunnels - two tunnels for each VPN gateway:
    

```apache
gcloud beta compute vpn-tunnels list
```

**Output:**

```apache
NAME              REGION       GATEWAY           VPN_INTERFACE  PEER_ADDRESS
on-prem-tunnel0   us-east4  on-prem-vpn-gw1   0              35.242.116.91
on-prem-tunnel1   us-east4  on-prem-vpn-gw1   1              35.220.87.201
vpc-demo-tunnel0  us-east4  vpc-demo-vpn-gw1  0              35.242.125.8
vpc-demo-tunnel1  us-east4  vpc-demo-vpn-gw1  1              35.220.90.112
```

2. Now, verify that each tunnel is up. First, `vpc-demo-tunnel0`:
    

```apache
gcloud beta compute vpn-tunnels describe vpc-demo-tunnel0 \
      --region us-east4
```

The tunnel output should show detailed status as "**Tunnel is up and running.**"

**Output:**

```apache
creationTimestamp: '2018-12-30T09:11:04.188-08:00'
description: ''
detailedStatus: Tunnel is up and running.
id: '529323810542142151'
ikeVersion: 2
kind: compute#vpnTunnel
labelFingerprint: 42WmSpB8rSM=
localTrafficSelector:
- 0.0.0.0/0
name: vpc-demo-tunnel0
peerIp: 35.242.125.8
region: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4
remoteTrafficSelector:
- 0.0.0.0/0
router: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/routers/vpc-demo-router1
selfLink: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/vpnTunnels/vpc-demo-tunnel0
sharedSecret: '*************'
sharedSecretHash: AP8iF-pCX2wxYmfv8L0zqg7kJnY1
status: ESTABLISHED
vpnGateway: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/vpnGateways/vpc-demo-vpn-gw1
vpnGatewayInterface: 0
```

3. Next, `vpc-demo-tunnel`:
    

```apache
gcloud beta compute vpn-tunnels describe vpc-demo-tunnel1 \
      --region us-east4
```

**Output:**

```apache
creationTimestamp: '2018-12-30T09:15:07.289-08:00'
description: ''
detailedStatus: Tunnel is up and running.
id: '7077580659698779124'
ikeVersion: 2
kind: compute#vpnTunnel
labelFingerprint: 42WmSpB8rSM=
localTrafficSelector:
- 0.0.0.0/0
name: vpc-demo-tunnel1
peerIp: 35.220.90.112
region: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4
remoteTrafficSelector:
- 0.0.0.0/0
router: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/routers/vpc-demo-router1
selfLink: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/vpnTunnels/vpc-demo-tunnel1
sharedSecret: '*************'
sharedSecretHash: AGuL3sP7_H-TmC6C3ZSvsKC1Zau3
status: ESTABLISHED
vpnGateway: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/vpnGateways/vpc-demo-vpn-gw1
vpnGatewayInterface: 1
```

4. Next, `on-prem-tunnel0`:
    

```apache
gcloud beta compute vpn-tunnels describe on-prem-tunnel0 \
      --region us-east4
```

**Output:**

```apache
creationTimestamp: '2018-12-30T09:17:54.375-08:00'
description: ''
detailedStatus: Tunnel is up and running.
id: '1745464957413442349'
ikeVersion: 2
kind: compute#vpnTunnel
labelFingerprint: 42WmSpB8rSM=
localTrafficSelector:
- 0.0.0.0/0
name: on-prem-tunnel0
peerIp: 35.242.116.91
region: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4
remoteTrafficSelector:
- 0.0.0.0/0
router: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/routers/on-prem-router1
selfLink: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/vpnTunnels/on-prem-tunnel0
sharedSecret: '*************'
sharedSecretHash: AIPCTbaCiYFZYGqc19yhzZ0twIwv
status: ESTABLISHED
vpnGateway: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/vpnGateways/on-prem-vpn-gw1
vpnGatewayInterface: 0
```

5. Next, `on-prem-tunnel1`:
    

```apache
gcloud beta compute vpn-tunnels describe on-prem-tunnel1 \
      --region us-east4
```

**Output:**

```apache
creationTimestamp: '2018-12-30T09:19:57.363-08:00'
description: ''
detailedStatus: Tunnel is up and running.
id: '5139842297944686802'
ikeVersion: 2
kind: compute#vpnTunnel
labelFingerprint: 42WmSpB8rSM=
localTrafficSelector:
- 0.0.0.0/0
name: on-prem-tunnel1
peerIp: 35.220.87.201
region: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4
remoteTrafficSelector:
- 0.0.0.0/0
router: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/routers/on-prem-router1
selfLink: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/vpnTunnels/on-prem-tunnel1
sharedSecret: '*************'
sharedSecretHash: AFiAWUbfombkSPdbr3QCBHnhyURS
status: ESTABLISHED
vpnGateway: https://www.googleapis.com/compute/beta/projects/binal-sandbox/regions/us-east4/vpnGateways/on-prem-vpn-gw1
vpnGatewayInterface: 1
```

### **Verify private connectivity over VPN**

1. Next, ssh into the instance in network `on-prem`:
    

```apache
gcloud compute ssh on-prem-instance1 --zone us-east4-a
```

2. Type "y" to confirm you want to continue.
    
3. Press **Enter** twice to skip creating a password.
    
4. Now, from this instance in network `on-prem`, try to reach instances in network `vpc-demo`.
    
5. On the instance `on-prem-instance1`, ping 10.1.1.2:
    

```apache
ping 10.1.1.2
```

**Output:**

```apache
PING 10.1.1.2 (10.1.1.2) 56(84) bytes of data.
64 bytes from 10.1.1.2: icmp_seq=1 ttl=62 time=24.4 ms
64 bytes from 10.1.1.2: icmp_seq=2 ttl=62 time=21.3 ms
64 bytes from 10.1.1.2: icmp_seq=3 ttl=62 time=21.0 ms
64 bytes from 10.1.1.2: icmp_seq=4 ttl=62 time=21.0 ms
^C
--- 10.1.1.2 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms
rtt min/avg/max/mdev = 21.015/21.963/24.406/1.420 ms
```

6. Press **CTRL+C** to stop the command.
    

### **Global routing with VPN**

Remember, HA-VPN is a regional resource and cloud router by default only sees the routes in the region it is deployed. To reach instances in a different region than the cloud router, you need to enable global routing mode for the VPC. This allows the cloud router to see and advertise routes from other regions.

1. Open a **new Cloud Shell** tab and update the `bgp-routing mode` from `vpc-demo` to `GLOBAL`:
    

```apache
gcloud compute networks update vpc-demo --bgp-routing-mode GLOBAL
```

2. Verify the change:
    

```apache
gcloud compute networks describe vpc-demo
```

**Output:**

```apache
 autoCreateSubnetworks: false
creationTimestamp: '2018-03-12T23:02:05.097-07:00'
id: '7262190882525992882'
kind: compute#network
name: vpc-demo
routingConfig:
  routingMode: GLOBAL
selfLink: https://www.googleapis.com/compute/v1/projects/xxxxxx/global/networks/vpc-demo
subnetworks:
- https://www.googleapis.com/compute/v1/projects/xxxxxx/regions/europe-west1/subnetworks/vpc-demo-subnet2
- https://www.googleapis.com/compute/v1/projects/xxxxxx/regions/us-east4/subnetworks/vpc-demo-subnet1
x_gcloud_bgp_routing_mode: GLOBAL
x_gcloud_subnet_mode: CUSTOM
```

Click *Check my progress* to verify the objective.

Global routing with VPN

3. Now, from the instance in network `on-prem`, ping the instance `vpc-demo-instance2` in region `europe-west1`.
    

```apache
ping 10.2.1.2
```

4. Pings will be successful.
    

```apache
PING 10.2.1.2 (10.2.1.2) 56(84) bytes of data.
64 bytes from 10.2.1.2: icmp_seq=1 ttl=62 time=60.7 ms
64 bytes from 10.2.1.2: icmp_seq=2 ttl=62 time=58.3 ms
^C
--- 10.2.1.2 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1002ms
rtt min/avg/max/mdev = 58.336/59.559/60.783/1.247 ms
xxxx_student@on-prem-instance1:~$
```

5. Press **CTRL+C** to stop the command.
    

### **Verify high availability of tunnels**

1. Open a new Cloud Shell tab.
    
2. Bring `tunnel0` in network `vpc-demo` down:
    

```apache
gcloud compute vpn-tunnels delete vpc-demo-tunnel0  --region us-east4
```

3. Respond `Y` when asked to verify the deletion.
    

The respective `tunnel0` in network `on-prem` will go down.

4. Verify that the tunnel is down by running:
    

```apache
gcloud compute vpn-tunnels describe on-prem-tunnel0  --region us-east4
```

The status should show as **FIRST\_HANDSHAKE**.

```apache
creationTimestamp: '2018-12-30T09:17:54.375-08:00'
description: ''
detailedStatus: Handshake with peer broken for unknown reason. Trying again soon.
id: '1745464957413442349'
ikeVersion: 2
kind: compute#vpnTunnel
localTrafficSelector:
- 0.0.0.0/0
name: on-prem-tunnel0
peerIp: 35.242.116.91
region: https://www.googleapis.com/compute/v1/projects/xxxxxx/regions/us-east4
remoteTrafficSelector:
- 0.0.0.0/0
router: https://www.googleapis.com/compute/v1/projects/xxxxxx/regions/us-east4/routers/on-prem-router1
selfLink: https://www.googleapis.com/compute/v1/projects/xxxxxx/regions/us-east4/vpnTunnels/on-prem-tunnel0
sharedSecret: '*************'
sharedSecretHash: AIPCTbaCiYFZYGqc19yhzZ0twIwv
status: FIRST_HANDSHAKE
```

5. Go back to the first Cloud Shell tab and verify pings between the instances in network vpc-demo and network on-prem:
    

```apache
ping 10.1.1.2
```

**Output:**

```apache
PING 10.1.1.2 (10.1.1.2) 56(84) bytes of data.
64 bytes from 10.1.1.2: icmp_seq=1 ttl=62 time=26.1 ms
64 bytes from 10.1.1.2: icmp_seq=2 ttl=62 time=22.0 ms
64 bytes from 10.1.1.2: icmp_seq=3 ttl=62 time=21.9 ms
^C
--- 10.1.1.2 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 21.935/23.376/26.117/1.942 ms
```

6. Press **CTRL+C** to stop the command.
    
7. Pings are still successful as the traffic is now sent over the second tunnel.
    

You have successfully configured HA-VPN tunnels.

## Task 4. Cleanup

Because you are working in Qwiklabs, when you end the lab all your resources and your project will be cleaned up and discarded for you. You should know how to clean up resources yourself to save on cost and to be a good cloud citizen.

### **Delete VPN tunnels**

* From Cloud Shell, run the following commands to delete the remaining tunnels, confirming this action when asked:
    

```apache
gcloud compute vpn-tunnels delete on-prem-tunnel0  --region us-east4
```

```apache
gcloud compute vpn-tunnels delete vpc-demo-tunnel1  --region us-east4
```

```apache
gcloud compute vpn-tunnels delete on-prem-tunnel1  --region us-east4
```

### **Remove BGP peering**

* Run the following commands from each BGP peer to remove peering:
    

```apache
gcloud compute routers remove-bgp-peer vpc-demo-router1 --peer-name bgp-on-prem-tunnel0 --region us-east4
```

```apache
gcloud compute routers remove-bgp-peer vpc-demo-router1 --peer-name bgp-on-prem-tunnel1 --region us-east4
```

```apache
gcloud compute routers remove-bgp-peer on-prem-router1 --peer-name bgp-vpc-demo-tunnel0 --region us-east4
```

```apache
gcloud compute routers remove-bgp-peer on-prem-router1 --peer-name bgp-vpc-demo-tunnel1 --region us-east4
```

### **Delete cloud routers**

* Run each command to delete the routers, confirming this action when asked:
    

```apache
gcloud compute  routers delete on-prem-router1 --region us-east4
```

```apache
gcloud compute  routers delete vpc-demo-router1 --region us-east4
```

### **Delete VPN gateways**

* Run each command to delete the VPN gateways, confirming this action when asked:
    

```apache
gcloud beta compute vpn-gateways delete vpc-demo-vpn-gw1 --region us-east4
```

```apache
gcloud beta compute vpn-gateways delete on-prem-vpn-gw1 --region us-east4
```

### **Delete instances**

* Run the following commands to delete each instance, confirming this action when asked:
    

```apache
gcloud compute instances delete vpc-demo-instance1 --zone us-east4-b
```

```apache
gcloud compute instances delete vpc-demo-instance2 --zone europe-west1-b
```

```apache
gcloud compute instances delete on-prem-instance1 --zone us-east4-a
```

### **Delete firewall rules**

* Run the following to delete the firewall rules, confirming this action when asked:
    

```apache
gcloud beta compute firewall-rules delete vpc-demo-allow-internal
```

```apache
gcloud beta compute firewall-rules delete on-prem-allow-subnets-from-vpc-demo
```

```apache
gcloud beta compute firewall-rules delete on-prem-allow-ssh-icmp
```

```apache
gcloud beta compute firewall-rules delete on-prem-allow-internal
```

```apache
gcloud beta compute firewall-rules delete vpc-demo-allow-subnets-from-on-prem
```

```apache
gcloud beta compute firewall-rules delete vpc-demo-allow-ssh-icmp
```

### **Delete subnets**

* Run the following to delete the subnets, confirming this action when asked:
    

```apache
gcloud beta compute networks subnets delete vpc-demo-subnet1 --region us-east4
```

```apache
gcloud beta compute networks subnets delete vpc-demo-subnet2 --region europe-west1
```

```apache
gcloud beta compute networks subnets delete on-prem-subnet1 --region us-east4
```

### **Delete VPC**

* Finally, run these commands to delete the VPCs, confirming this action when asked:
    

```apache
gcloud compute networks delete vpc-demo
```

```apache
gcloud compute networks delete on-prem
```

---

## Solution of Lab

### Quick

%[https://youtu.be/LeyM0D8YB8U] 

```apache
export ZONE2=
export ZONE=
export ZONE1=
```

```apache
curl -LO raw.githubusercontent.com/gcpsolution99/GCP-solution/refs/heads/main/GSP/GSP619_abhi.sh
sudo chmod +x GSP619_abhi.sh
./GSP619_abhi.sh
```

---

### Manual

%[https://youtu.be/QX0-P393TIU] 

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">Under the Special Game Badge Module: <strong>Future Ready Skills</strong>, this lab (3rd one) is currently disabled and may soon be marked as Optional. You can complete the remaining 7 labs, and once this lab is officially marked optional, the badge will be automatically credited to your public profile.</div>
</div>