---
title: "Configuring Network Connectivity Center as a Transit Hub - GSP911"
seoTitle: "Configuring Network Connectivity Center as a Transit Hub - GSP911"
seoDescription: "Configure Google Cloud's Network Connectivity Center as a transit hub using HA VPN for connecting non-Google networks via Google's backbone"
datePublished: Tue Aug 05 2025 14:37:19 GMT+0000 (Coordinated Universal Time)
cuid: cmdyn83wj000102kyb9uqcyk0
slug: configuring-network-connectivity-center-as-a-transit-hub-gsp911
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754404154286/89f90905-167c-43ea-9a1b-0c2e97971a47.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1754404611210/1aad7413-a683-4af6-8d8f-d9f9e656c2bc.png
tags: configuring-network-connectivity-center-as-a-transit-hub-gsp911, gsp911, configuring-network-connectivity-center-as-a-transit-hub

---

## Overview

Network Connectivity Center (NCC) enables connecting different enterprise networks together that are outside of Google Cloud by leveraging Google's network—providing enterprises instant access to planet-scale reach and high reliability. Traffic between non-Google networks is referred to as data transfer traffic, which can occur using existing standard cloud network connectivity resources such as Cloud VPN, Dedicated or Partner Interconnect.

In this lab, you will go through the process of setting up NCC as a transit hub to route traffic between two non-Google networks using Google's backbone network.

## Architecture

NCC consists of hub and spoke resources.

**Hub**

A hub is a global Google Cloud resource that supports multiple attached spokes. It provides a simple way to connect spokes together to enable data transfer across them. A hub can provide data transfer between different on-premises locations and a Virtual Private Cloud (VPC) network through its attached spokes.

**Spoke**

A spoke is a Google Cloud network resource connected to a hub. It is part of the hub, and can't be created without creating the hub first. A spoke routes traffic to remote network address blocks and enables the connection of multiple remote networks.

Spokes can be of one of the following types:

* HA VPN tunnels
    
* VLAN attachments
    
* Router appliance instances that you or select partners deploy within Google Cloud
    

The following network topology is similar to a typical customer deployment having branch offices located in two geographically separate locations. For this lab, you are simulating two VPCs *vpc-a*, and *vpc-b* in `us-east4`, and `us-west1` as the branch offices respectively.

The branch offices are connected to a VPC, *vpc-transit*, which is a central hub terminating a pair of HA VPNs. These VPNs are configured in a region closest to the branch offices. In the real world, these VPNs could be replaced using Interconnects.

You will configure the NCC hub in the *vpc-transit* network, and the two remote branch offices will be connected using the HA VPN tunnels as spokes.

![Network topology project example](https://cdn.qwiklabs.com/9k3iu618o9ppsU1nO%2FJRRX17rCFJCu%2BMp33J%2FtJ1C9o%3D align="left")

In this lab, you will achieve the following objectives:

1. Create a hub VPC called *vpc-transit*.
    
2. Create two remote branch office VPCs namely *vpc-a* and *vpc-b*.
    
3. Create HA VPN from *vpa-a* to *vpc-transit*, and *vpc-b* to *vpc-transit*.
    
4. Create a NCC hub resource and attach the HA VPNs as spokes.
    
5. Test the setup end to end deploying VMs in the remote branch office VPCs.
    

## Prerequisites

* Basic knowledge of Google VPC Networking, and Compute Engine.
    
* It is helpful to have completed the [Networking 101](https://google.qwiklabs.com/catalog_lab/311) and [VPC Networking: Cloud HA-VPN](https://www.qwiklabs.com/focuses/6270?parent=catalog) labs.
    

## Task 1. Create vpc-transit

1. In the Google Cloud console, in the top-right toolbar, click the **Activate Cloud Shell** button and run the following command to delete the **default** network.
    

![Cloud Shell icon](https://cdn.qwiklabs.com/vdY5e%2Fan9ZGXw5a%2FZMb1agpXhRGozsOadHURcR8thAQ%3D align="left")

```apache
gcloud compute networks delete default
```

2. In the Google Cloud console, from the **Navigation Menu (**
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), go to **VPC network**.
    
3. Click **CREATE VPC NETWORK**.
    
4. Enter a Name for the network: **vpc-transit**.
    
5. You do not need to create a subnet for the *vpc-transit* so click **Delete** next to New Subnet.
    
6. Choose the Dynamic routing mode for the VPC network as **Global**.
    

**Note:** Learn more about dynamic routing from the [dynamic routing mode documentation](https://cloud.google.com/vpc/docs/vpc#routing_for_hybrid_networks).

6. Click **Create**.
    

Click *Check my progress* to verify the objective.

Create vpc-transit network

## Task 2. Create remote branch office VPCs

1. In the Google Cloud console, from the **Navigation menu**, go to the **VPC network**.
    
2. Click **CREATE VPC NETWORK**.
    
3. Enter a Name for the network as **vpc-a**.
    
4. Choose **Custom** for the Subnet creation mode.
    
5. In the New subnet section, specify the following configuration parameters for a subnet:
    
    * Name for the subnet: **vpc-a-sub1-use4**.
        
    * Region: `us-east4`.
        
    * IP address range **10.20.10.0/24**. This is the primary IP range for the subnet.
        
6. Click **Done**.
    
7. Choose the Dynamic routing mode for the VPC network as **Regional**.
    
8. Click **Create**.
    
9. To add the second remote branch office VPC, click **CREATE VPC NETWORK**.
    
10. Enter a Name for the network as **vpc-b**.
    
11. Choose **Custom** for the Subnet creation mode.
    
12. In the New subnet section, specify the following configuration parameters for a subnet:
    
13. Provide a Name for the subnet as **vpc-b-sub1-usw2**.
    
14. Select Region as `us-west1`.
    
15. Enter an IP address range **10.20.20.0/24**.
    
16. Click **Done**.
    
17. Choose the Dynamic routing mode for the VPC network as **Regional**.
    
18. Click **Create**.
    

Now you should be able to view all 3 VPCs in the VPC networks console like this:

![VPC networks console displaying VPCs](https://cdn.qwiklabs.com/Pb5gdQp%2B93LD4uC3K0KTB6v1mhwNz5Rst6YH1k5UTzc%3D align="left")

Click *Check my progress* to verify the objective.

Create remote branch office VPCs namely vpc-a and vpc-b

## Task 3. Configure HA VPN between the remote branch office VPCs and the transit hub VPC

**Note:** In this lab you are simulating the remote branch offices as Google Cloud VPCs, therefore using the steps listed to [Create HA VPN between Google Cloud Networks](https://cloud.google.com/network-connectivity/docs/vpn/how-to/creating-ha-vpn2).

For any practical implementation, you may replace the steps listed below with the steps for [Creating an HA VPN gateway to a peer VPN gateway](https://cloud.google.com/network-connectivity/docs/vpn/how-to/creating-ha-vpn) if you are using HA VPNs to connect to your branch offices.

In this section you will configure an HA VPN between the remote branch office VPCs (*vpc-a* and *vpc-b*) and the transit hub VPC (*vpc-transit*). HA VPN uses BGP for dynamically exchanging routes between Google Cloud and the peer network. Before configuring the HA VPNs, you need to create Cloud Routers associated with each VPC network.

**Note:** Learn more about Cloud Routers [in the Cloud Router overview documentation](https://cloud.google.com/network-connectivity/docs/router/concepts/overview).

### **Step 1: Create cloud routers**

To create a new Cloud Router for each VPC, specify the following:

1. On the Google Cloud console title bar, type **Network Connectivity** in the Search field, then click **Network Connectivity** from the **Search results**.
    
2. Click **Pin** next to **Network Connectivity**.
    
3. Select **Cloud Router**, and click **Create router**.
    
4. Enter name as **cr-vpc-transit-use4-1**.
    
5. Select the network as **vpc-transit**.
    
6. Select the region as `us-east4`.
    
7. Enter the **Cloud Router ASN** as **65000**.
    
8. Select **Advertise all subnets visible to the Cloud Router (Default)**.
    
9. Click **Create**.
    
10. Use the steps mentioned above to create additional cloud routers using the following details:
    

| **Name** | **Network** | **Region** | **Cloud Router ASN** |
| --- | --- | --- | --- |
| *cr-vpc-transit-usw2-1* | vpc-transit | `us-west1` | 65000 |
| *cr-vpc-a-use4-1* | vpc-a | `us-east4` | 65001 |
| *cr-vpc-b-usw2-1* | vpc-b | `us-west1` | 65002 |

### **Step 2: Create HA VPN gateways**

Create an HA VPN gateway in the *vpc-transit* network for `us-east4` region, using the following steps:

1. From the **Navigation menu**, go to **Network Connectivity** and select **VPN**.
    
2. Click **Create VPN connection**.
    
3. Select **High-availability (HA) VPN**.
    
4. Click **Continue**.
    
5. Specify a VPN gateway name as **vpc-transit-gw1-use4**.
    
6. For Network, select **vpc-transit**.
    
7. Select a Region as `us-east4`.
    
8. Click **Create and continue**.
    

**Note:** Before adding VPN tunnels, you need to create additional VPN gateways.

9. From **Add VPN tunnels** page, click **Cancel**.
    
10. Select **Cloud VPN Gateways**, and click **Create VPN Gateway**.
    
11. Use the step mentioned to create the additional VPN gateways using the following details:
    

| **VPN gateway name** | **VPC Network** | **Region** |
| --- | --- | --- |
| *vpc-transit-gw1-usw2* | vpc-transit | `us-west1` |
| *vpc-a-gw1-use4* | vpc-a | `us-east4` |
| *vpc-b-gw1-usw2* | vpc-b | `us-west1` |

Click *Check my progress* to verify the objective.

Create cloud routers and HA VPN gateways

### **Step 3: Create a pair of VPN tunnels between vpc-transit to vpc-a**

#### Add VPN tunnels from vpc-transit to vpc-a

Create a pair of VPN tunnels using the following steps:

1. From the VPN page, click on **Cloud VPN Gateways** and select **vpc-transit-gw1-use4**.
    
2. Click to **Add VPN tunnel**.
    
3. For the Peer VPN Gateway, select **Google Cloud VPN Gateways**.
    
4. Select the **Project Id** associated with the lab.
    
5. Select the remote VPN gateway, **vpc-a-gw1-use4**.
    
6. For high availability, select **Create a pair of VPN tunnels**.
    
7. Select the Cloud Router **cr-vpc-transit-use4-1**.
    
8. Click on the VPN tunnel to enter the tunnel details:
    
    * The Cloud VPN and the associated peer VPN gateway interface information should be pre-populated
        
    * Name: **transit-to-vpc-a-tu1**
        
    * IKE version: IKEv2
        
    * IKE pre-shared key: **gcprocks**
        
9. Click **Done**.
    
10. Repeat steps for the second tunnel:
    
    * Name: **transit-to-vpc-a-tu2**
        
    * IKE version: IKEv2
        
    * IKE pre-shared key: **gcprocks**
        
11. Click **Done**.
    
12. Click **Create & Continue**.
    

#### Add BGP sessions for each VPN tunnel configured from vpc-transit to vpc-a

The next step is to configure BGP session for the VPN tunnel *transit-to-vpc-a-tu1*

1. Click **Configure BGP Session for transit-to-vpc-a-tu1**:
    
    * BGP session name: **transit-to-vpc-a-bgp1**
        
    * Peer ASN: **65001**
        
    * Allocate BGP IPv4 address: *Manually*
        
    * Cloud Router BGP IPv4 address: **169.254.1.1**
        
    * BGP peer IPv4 address: **169.254.1.2**
        
2. Click **Save and continue**.
    

* Repeat steps to configure BGP session for the VPN tunnel *transit-to-vpc-a-tu2*.
    

3. Click **Configure BGP Session for transit-to-vpc-a-tu2**:
    

* BGP session name: **transit-to-vpc-a-bgp2**
    
* Peer ASN: **65001**
    
* Allocate BGP IPv4 address: *Manually*
    
* Cloud Router BGP IPv4 address: **169.254.1.5**
    
* BGP peer IPv4 address: **169.254.1.6**
    

4. Click **Save and continue**.
    
5. Click on **Save BGP configuration**.
    
6. Click **OK**.
    

#### Add VPN tunnels from vpc-a to vpc-transit

Now create a pair of VPN tunnels from the *vpc-a* to *vpc-transit* to complete the bidirectional tunnel configuration using the following steps:

1. From the VPN page, select **Cloud VPN Gateways** *vpc-a-gw1-use4*:
    
2. Click to **Add VPN tunnel**.
    
3. For the Peer VPN Gateway, select **Google Cloud VPN Gateways**.
    
4. Select the **Project Id** associated with the lab.
    
5. Select the remote VPN gateway, **vpc-transit-gw1-use4**
    
6. For high availability, select **Create a pair of VPN tunnels**.
    
7. Select the Cloud Router, **cr-vpc-a-use4-1**
    
8. Click on the VPN tunnel to enter the tunnel details:
    
    * The Cloud VPN and peer VPN gateway interface information should be pre-populated.
        
    * Name: **vpc-a-to-transit-tu1**
        
    * IKE version: IKEv2
        
    * IKE pre-shared key: **gcprocks**
        
9. Click **Done**.
    
10. Repeat steps for the second tunnel:
    
    * Name: **vpc-a-to-transit-tu2**
        
    * IKE version: IKEv2
        
    * IKE pre-shared key: **gcprocks**
        
11. Click **Done**.
    
12. Click **Create & Continue**.
    

#### Add BGP sessions for each VPN tunnel configured from vpc-a to vpc-transit

The next step is to configure BGP session for the VPN tunnel: *transit-to-vpc-a-tu1*

1. Click **Configure BGP Session for vpc-a-to-transit-tu1**
    
    * BGP session name: **vpc-a-to-transit-bgp1**
        
    * Peer ASN: **65000**
        
    * Allocate BGP IPv4 address: *Manually*
        
    * Cloud Router BGP IPv4 address: **169.254.1.2**
        
    * BGP peer IPv4 address: **169.254.1.1**
        
2. Click **Save and continue**.
    

Repeat steps to configure BGP session for the VPN tunnel: *transit-to-vpc-a-tu2*

3. Click **Configure BGP Session for vpc-a-to-transit-tu2**
    
    * BGP session name: **vpc-a-to-transit-bgp2**
        
    * Peer ASN: **65000**
        
    * Allocate BGP IPv4 address: *Manually*
        
    * Cloud Router BGP IPv4 address: **169.254.1.6**
        
    * BGP peer IPv4 address: **169.254.1.5**
        
4. Click **Save and continue**.
    
5. Click on **Save BGP configuration**.
    
6. Click **OK**.
    

Once this step is complete the VPN tunnel status should reflect *Established* and BGP status should reflect *BGP established*.

### **Step 4: Create a pair of VPN tunnels between vpc-transit to vpc-b**

* Repeat steps listed above (step 3) to create the bidirectional HA VPN tunnels between the vpc-transit and vpc-b networks using the details below.
    

#### Add VPN tunnels from vpc-transit to vpc-b

| Peer VPN gateway name | *vpc-b-gw1-usw2* |
| --- | --- |
| Cloud Router | *cr-vpc-transit-usw2-1* |
| VPN tunnel one | *transit-to-vpc-b-tu1* |
| Pre-shared key | *gcprocks* |
| VPN tunnel two | *transit-to-vpc-b-tu2* |
| Pre-shared key | *gcprocks* |

#### Add BGP sessions for each VPN tunnel configured from vpc-transit to vpc-b

BGP session for tunnel *transit-to-vpc-b-tu1* :

| BGP session | *transit-to-vpc-b-bgp1* |
| --- | --- |
| Peer ASN | *65002* |
| Cloud Router BGP IPv4 address | 169.254.1.9 |
| BGP peer IPv4 address | 169.254.1.10 |

BGP session for tunnel *transit-to-vpc-b-tu2* :

| BGP session | *transit-to-vpc-b-bgp2* |
| --- | --- |
| Peer ASN | *65002* |
| Cloud Router BGP IPv4 address | 169.254.1.13 |
| BGP peer IPv4 address | 169.254.1.14 |

#### Add VPN tunnels from vpc-b to vpc-transit

| Peer VPN gateway name | *vpc-transit-gw1-usw2* |
| --- | --- |
| Cloud Router | *cr-vpc-b-usw2-1* |
| VPN tunnel one | *vpc-b-to-transit-tu1* |
| Pre-shared key | *gcprocks* |
| VPN tunnel second | *vpc-b-to-transit-tu2* |
| Pre-shared key | *gcprocks* |

#### Add BGP sessions for each VPN tunnel configured from vpc-b to vpc-transit

BGP session for tunnel *vpc-b-to-transit-tu1* :

| BGP session | *vpc-b-to-transit-bgp1* |
| --- | --- |
| Peer ASN | *65000* |
| Cloud Router BGP IPv4 address | 169.254.1.10 |
| BGP peer IPv4 address | 169.254.1.9 |

BGP session for tunnel *vpc-b-to-transit-tu2* :

| BGP session | *vpc-b-to-transit-bgp2* |
| --- | --- |
| Peer ASN | *65000* |
| Cloud Router BGP IPv4 address | 169.254.1.14 |
| BGP peer IPv4 address | 169.254.1.13 |

### **Step 5: Verify the all the VPN connections status from the VPN page**

* Scroll down the page to confirm that all connections are good.
    

![VPN page with all VPN tunnel statuses displaying Established and Bgp session statuses displaying BGP established](https://cdn.qwiklabs.com/QBF07Zii%2ByXoSqxQJHLbXtBlApXTpiIeZTYsGZVP1rU%3D align="left")

Click *Check my progress* to verify the objective.

Create a pair of VPN tunnels between vpc-transit to vpc-a and vpc-b

## Task 4. Create NCC hub resources and attach the HA VPNs as spokes

In this section you will create a VPC and create 2 subnets inside that VPC. This will all be done using gcloud CLI commands inside Google Cloud Shell.

Before you can perform any tasks for Network Connectivity Center, you must enable the Network Connectivity API.

1. From the **Navigation Menu**, search for **API & Services**.
    
2. Click on **Library**, and search for **Network Connectivity API**.
    
3. Select the **Network Connectivity API**.
    

![Network Connectivity API option highlighted in the search results](https://cdn.qwiklabs.com/hyB14LnLTAnovI6IC9wDMAoNbXT77qxEZyNIzXnww9Q%3D align="left")

4. Click **Enable**.
    
5. In this lab `gcloud` commands are used to configure the Network Connectivity Center. In order to authorize Cloud Shell to run the gcloud commands, open the Google Cloud Shell by clicking **Activate Cloud Shell**().
    
6. Run the following command to list the active account name:
    

```apache
gcloud auth list
```

7. Click **Authorize**.
    

### Step 1: Create NCC hub

* You can click on the "clipboard" icon in the upper right corner of the text box to copy the contents:
    

```apache
gcloud alpha network-connectivity hubs create transit-hub \
   --description=Transit_hub
```

### Step 2: Create the spoke for branch office 1

* You can click on the "clipboard" icon in the upper right corner of the text box to copy the contents:
    

```apache
gcloud alpha network-connectivity spokes create bo1 \
    --hub=transit-hub \
    --description=branch_office1 \
    --vpn-tunnel=transit-to-vpc-a-tu1,transit-to-vpc-a-tu2 \
    --region=us-east4
```

### Step 3: Create the spoke for branch office 2

* You can click on the "clipboard" icon in the upper right corner of the text box to copy the contents.
    

```apache
gcloud alpha network-connectivity spokes create bo2 \
    --hub=transit-hub \
    --description=branch_office2 \
    --vpn-tunnel=transit-to-vpc-b-tu1,transit-to-vpc-b-tu2 \
    --region=us-west1
```

Click *Check my progress* to verify the objective.

Create NCC hub resources and attach the HA VPNs as spokes

## Task 5. Test the setup end to end deploying VMs in the remote branch office VPCs

After configuring the hub and its spokes, you should be able to pass traffic from the virtual machine (VM) instance in *branch office1* to the VM instance in *branch office2*. To do this, create a *vpc-a-vm-1* in *vpc-a* and vpc-b-vm-1 in *vpc-b* respectively.

First, create firewall rules: *fw-a* for *vpc-a-vm-1* in *vpc-a-sub1-use4* subnet and *fw-b* for *vpc-b-vm-1* in *vpc-b-sub1-usw2* subnet respectively to allow ingress SSH and ICMP traffic.

![Network topology project screen](https://cdn.qwiklabs.com/o5dZVa%2Byv8W3ZZA%2F44UUwlMUXClCGuSQhpERepDFpGI%3D align="left")

### Step 1: Create Firewall rule for vpc-a

1. In the Cloud Platform Console, click **Navigation menu** () at the top left of the screen.
    
2. Then navigate to **VPC network** &gt; **Firewall**.
    
3. Click on **CREATE FIREWALL RULE** and specify the details as shown.
    

![Firewall Rule Creation](https://cdn.qwiklabs.com/zau55jMGfANEcN6iYWMuSz8iCdjBuUPyY4yr9dbi2wA%3D align="left")

4. Similarly, create firewall rule **fw-b** for **vpc-b**.
    

### Step 2: Create VM in vpc-a

1. In the **Cloud console**, on the **Navigation menu** (☰), click **Compute Engine** &gt; **VM Instances**, then click **Create instance**.
    

**Note:** This may take a minute to initialize for the first time.

There are many parameters you can configure when creating a new instance. Use the following for this lab:

2. In the **Machine configuration**
    
    Enter the values for the following fields:
    
    | **Field** | **Value** |
    | --- | --- |
    | **Name** | `vpc-a-vm-1` |
    | **Region** | `us-east4` |
    | **Zone** | `us-east4-c` |
    | **Series** | `E2` |
    | **Machine** | `e2-medium` |
    
3. Click **OS and storage**
    
    Click **Change** to begin configuring your boot disk and select the values for:
    
    | **Field** | **Value** |
    | --- | --- |
    | **Operating system** | `Debian` |
    | **Version** | `Debian GNU/Linux 11 (bullseye) x86/64` |
    | **Boot disk type** | `balanced persistent disk` |
    | **Size (GB)** | `10 GB` |
    
4. Click **Networking**
    
    * **Network interfaces** : click on `default` to edit.
        
        * **Network**: `vpc-a`
            
        * **Subnetwork**: `vpc-a-sub1-use4`
            
5. Once all sections are configured, scroll down and click **Create** to launch your virtual machine instance.
    

**Note:** The instance creation process is asynchronous. You can check on the status of the task using the top right-hand side **Activities** icon. Wait for it to finish - it shouldn't take more than a minute.

**Note:** If you receive an error when creating a VM, click into **Details**. Most likely you need to try again with a different zone.

Once finished, you should see the new virtual machine in the **VM Instances** page.

Similarly, create another VM in **vpc-b** using the following parameters:

6. In the **Machine configuration**
    
    Enter the values for the following fields:
    
    | **Field** | **Value** |
    | --- | --- |
    | **Name** | `vpc-b-vm-1` |
    | **Region** | `us-west1` |
    | **Zone** | `us-west1-c` |
    | **Series** | `E2` |
    | **Machine** | `e2-medium` |
    
7. Click **OS and storage**
    
    Click **Change** to begin configuring your boot disk and select the values for:
    
    | **Field** | **Value** |
    | --- | --- |
    | **Operating system** | `Debian` |
    | **Version** | `Debian GNU/Linux 11 (bullseye) x86/64` |
    | **Boot disk type** | `balanced persistent disk` |
    | **Size (GB)** | `10 GB` |
    
8. Click **Networking**
    
    * **Network interfaces** : click on `default` to edit.
        
        * **Network**: `vpc-b`
            
        * **Subnetwork**: `vpc-b-sub1-usw2`
            
9. Once all sections are configured, scroll down and click **Create** to launch your virtual machine instance.
    

Once finished, you should see the two virtual machines in the **VM Instances** page.

10. Copy the internal IP of **vpc-b-vm-1**.
    

![IP address of vpc-b-vm-1 highlighted on the VM Instances page](https://cdn.qwiklabs.com/1uljy8fJ3Z9PN3q9BV9%2F9GVKxp9YygA8rVHPQIXdQuU%3D align="left")

Click *Check my progress* to verify the objective.

Create VMs in the remote branch office VPCs

### Step 3: Run the ping command and verify connectivity to bo2 via NCC transit

To verify the end to end connectivity, run a ping test between *vpc-a-vm-1* and *vpc-b-vm-1* using the following steps:

1. SSH into **vpc-a-vm-1** by clicking on **SSH** on the right hand side of vpc-a-vm-1. This launches a SSH client directly from your browser.
    

**Note:** You can also SSH into the virtual machine. Learn more about SSH from the [Connect to an instance using ssh documentation](https://cloud.google.com/compute/docs/instances/connecting-to-instance).

![Command line terminal](https://cdn.qwiklabs.com/akxcwUSd1Af5FWejHAEaGAtsp7WZTFSKeWVZACNC0Zk%3D align="left")

2. Run a ping test from **vpc-a-vm-1** to the internal IP of **vpc-b-vm-1**.
    
3. You can click on the "clipboard" icon in the upper right corner of the text box to copy the contents.
    

```apache
ping -c 5 <INTERNAL_IP_OF_VPC-B-VM-1>
```

![Command line terminal displaying ping statistics](https://cdn.qwiklabs.com/JYccSGxzzFSU163WJCBgHq8wtgGuqfSlXSKKmGtsyaw%3D align="left")

---

## Solution of Lab

%[https://youtu.be/aUIhkVqhCmk] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Configuring%20Network%20Connectivity%20Center%20as%20a%20Transit%20Hub/techcps911.sh
sudo chmod +x techcps911.sh
./techcps911.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1754404542516/a20eaf19-2846-4989-8002-b7074ea1b45e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1754404547265/f1dffe04-e8c8-497e-a1a8-2c604aa2cbeb.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1754404553123/6556b699-3785-4eae-8531-6305d8cd845d.png align="center")