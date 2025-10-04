---
title: "Building a High-throughput VPN - GSP062"
seoTitle: "Building a High-throughput VPN - GSP062"
seoDescription: "Learn to build and test a high-throughput, secure VPN on Google Cloud with hands-on instructions and best practices"
datePublished: Sat Oct 04 2025 05:51:59 GMT+0000 (Coordinated Universal Time)
cuid: cmgbuvmlc000102le5lu93j8h
slug: building-a-high-throughput-vpn-gsp062
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759556299073/8c6dc880-6859-462b-b638-147f75db176c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759557098933/baf7c60f-b9cf-4369-999a-81d58bb7f43d.png
tags: vpn, building-a-high-throughput-vpn-gsp062, building-a-high-throughput-vpn, gsp062

---

## Overview

This hands-on lab shows you how to create a secure, high-throughput VPN and test the speed.

Secure communication between Google Cloud and other clouds or on-premises systems is a common, critical need. Fortunately, Google Cloud makes it easy for you to create a secure Internet Protocol security (IPsec) virtual private networks (VPNs) to achieve this goal. If a single tunnel does not provide necessary throughput, Google Cloud can smoothly distribute traffic across multiple tunnels to provide additional bandwidth.

### Objectives

In this lab you do the following:

* Create VPN
    
    * Create a Virtual Private Cloud (VPC) named `cloud` to simulate your Google Cloud network, and a VPC named `on-prem` (on-premises) to simulate an external network.
        
    * Create VPN gateways, forwarding rules, and addresses for the `cloud` VPC.
        
    * Form a tunnel for the new VPN, and route traffic through it.
        
    * Repeat the VPN creation process for the `on-prem` VPC, creating a second VPN.
        
* Test VPNs
    
    * Create a virtual machine (VM) using [Compute Engine](https://cloud.google.com/compute/) for throughput load testing.
        
    * Test throughput speed of a single VPN using `iperf`.
        

### Prerequisites

To maximize your learning, you should:

* Review and familiarize yourself with how to [create a VPN](https://cloud.google.com/vpn/docs/how-to) using Google Cloud.
    
* Review the [VPC network overview guide](https://cloud.google.com/compute/docs/vpc).
    

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
    student-00-bdb3d15d4b6f@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    KKJAjBnnt9Op
    ```
    
    Copied!
    
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-748c9c908281`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-748c9c908281
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
ACCOUNT: student-00-bdb3d15d4b6f@qwiklabs.net

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
project = qwiklabs-gcp-03-748c9c908281
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Create the cloud VPC

In this section, you:

* Create a VPC to simulate your cloud production network.
    
* Allow common types of traffic to flow through the VPC.
    
* Create a subnet for deploying hosts.
    

1. In Cloud Shell, create a custom VPC named `cloud` associated with your Google Cloud project by running the following:
    

```apache
gcloud compute networks create cloud --subnet-mode custom
```

This VPC allows you to use non-default IP addressing, but does not include any default firewall rules.

2. Run the following to enable `SSH` and `icmp`, because you'll need a secure shell to communicate with VMs during load testing:
    

```apache
gcloud compute firewall-rules create cloud-fw --network cloud --allow tcp:22,tcp:5001,udp:5001,icmp
```

3. Create a subnet within this VPC and specify a region and IP range by running:
    

```apache
gcloud compute networks subnets create cloud-east --network cloud \
    --range 10.0.1.0/24 --region us-east1
```

In this solution, you use `10.0.1.0/24` and the `us-east1` region.

## Task 2. Create the on-prem VPC

In this section you create a simulation of your `on-prem` VPC, or any network you want to connect to `cloud`. In practice you'd already have resources here, but for the purpose of creating tunnels and validating configurations, follow these steps:

1. In Cloud Shell, create a new custom subnet VPC associated with your project named `on-prem` by running:
    

```apache
gcloud compute networks create on-prem --subnet-mode custom
```

2. Run the following to enable `SSH` and `icmp` for hosts in the `on-prem` VPC, because you need a secure shell to communicate with VMs during load testing:
    

```apache
gcloud compute firewall-rules create on-prem-fw --network on-prem --allow tcp:22,tcp:5001,udp:5001,icmp
```

3. Specify the subnet prefix for the region using the following command:
    

```apache
gcloud compute networks subnets create on-prem-central \
    --network on-prem --range 192.168.1.0/24 --region us-east4
```

**Note:** In this example, you assign `192.168.1.0/24` to the `us-east4` region.

Create two custom VPCs with subnetworks and firewall rules.

## Task 3. Create VPN gateways

Each environment requires VPN gateways for secure external communication. Follow these steps to create the initial gateways for your cloud and `on-prem` VPCs:

1. In Cloud Shell create a VPN gateway named `on-prem-gw1` in the `on-prem` VPC and `us-east4` region:
    

```apache
gcloud compute target-vpn-gateways create on-prem-gw1 --network on-prem --region us-east4
```

2. Now create a VPN gateway named `cloud-gw1` in the `cloud` VPC and `us-east1` region:
    

```apache
gcloud compute target-vpn-gateways create cloud-gw1 --network cloud --region us-east1
```

## Task 4. Create a route-based VPN tunnel between local and Google Cloud networks

The VPN gateways each need a static, external IP address so that systems outside the VPC can communicate with them. Now you create IP addresses and routes on the cloud and `on-prem` VPCs.

1. In Cloud Shell, allocate the IP for the `cloud-gw1` VPN gateway:
    

```apache
gcloud compute addresses create cloud-gw1 --region us-east1
```

2. Then allocate the IP for the `on-prem-gw1` VPN gateway:
    

```apache
gcloud compute addresses create on-prem-gw1 --region us-east4
```

3. Now store the gateway addresses so you won't have to look them up in later commands.
    

First, for the `cloud-gw1` gateway:

```apache
cloud_gw1_ip=$(gcloud compute addresses describe cloud-gw1 \
    --region us-east1 --format='value(address)')
```

Second, for the `on-prem-gw1` gateway:

```apache
on_prem_gw_ip=$(gcloud compute addresses describe on-prem-gw1 \
    --region us-east4 --format='value(address)')
```

4. Now you create forwarding rules for IPsec on the `cloud` VPC. You need to create forwarding rules in both directions.
    

Forward the Encapsulating Security Payload (ESP) protocol from `cloud-gw1`:

```apache
gcloud compute forwarding-rules create cloud-1-fr-esp --ip-protocol ESP \
    --address $cloud_gw1_ip --target-vpn-gateway cloud-gw1 --region us-east1
```

Forward `UDP:500` traffic from cloud-gw1:

```apache
gcloud compute forwarding-rules create cloud-1-fr-udp500 --ip-protocol UDP \
    --ports 500 --address $cloud_gw1_ip --target-vpn-gateway cloud-gw1 --region us-east1
```

Forward `UDP:4500` traffic from cloud-gw1:

```apache
gcloud compute forwarding-rules create cloud-fr-1-udp4500 --ip-protocol UDP \
    --ports 4500 --address $cloud_gw1_ip --target-vpn-gateway cloud-gw1 --region us-east1
```

5. Use the same method to create firewall forwarding rules for the IPsec tunnel on the `on-prem` VPC. This step allows the IPsec tunnel to exit your firewalls:
    

Forward the ESP protocol from `on-prem-gw1`:

```apache
gcloud compute forwarding-rules create on-prem-fr-esp --ip-protocol ESP \
    --address $on_prem_gw_ip --target-vpn-gateway on-prem-gw1 --region us-east4
```

Forward `UDP:500` traffic, used in establishing the IPsec tunnel from on-prem-gw1:

```apache
gcloud compute forwarding-rules create on-prem-fr-udp500 --ip-protocol UDP --ports 500 \
    --address $on_prem_gw_ip --target-vpn-gateway on-prem-gw1 --region us-east4
```

Forward `UDP:4500` traffic, which carries the encrypted traffic from `on-prem-gw1`:

```apache
gcloud compute forwarding-rules create on-prem-fr-udp4500 --ip-protocol UDP --ports 4500 \
    --address $on_prem_gw_ip --target-vpn-gateway on-prem-gw1 --region us-east4
```

Create two VPN gateways and necessary forwarding rules.

Ordinarily you would need to go generate a secret for the next step, where you create and validate the tunnels `on-prem-tunnel1` and `cloud-tunnel1`. For details about how to create and securely store secrets, view the [Secret Manager conceptual overview guide](https://cloud.google.com/kms/docs/secret-management). For now just use the string "sharedsecret".

Create a tunnel for the local network `on-prem-tunnel1`, and for the cloud-based network `cloud-tunnel1`. Each network must have a VPN gateway, and the secrets must match. In the following two commands, where you would, in a production scenario, replace `[MY_SECRET]` with the secret you generated, replace it with "sharedsecret"

6. Create the VPN tunnel from `on-prem` to `cloud`:
    

```apache
gcloud compute vpn-tunnels create on-prem-tunnel1 --peer-address $cloud_gw1_ip \
    --target-vpn-gateway on-prem-gw1 --ike-version 2 --local-traffic-selector 0.0.0.0/0 \
    --remote-traffic-selector 0.0.0.0/0 --shared-secret=[MY_SECRET] --region us-east4
```

7. Create the VPN tunnel from cloud to on-prem:
    

```apache
gcloud compute vpn-tunnels create cloud-tunnel1 --peer-address $on_prem_gw_ip \
    --target-vpn-gateway cloud-gw1 --ike-version 2 --local-traffic-selector 0.0.0.0/0 \
    --remote-traffic-selector 0.0.0.0/0 --shared-secret=[MY_SECRET] --region us-east1
```

Now that you've created the gateways and built the tunnels, you need to add routes from the subnets through the two tunnels.

8. Route traffic from the `on-prem` VPC to the `cloud 10.0.1.0/24` range into the tunnel:
    

```apache
gcloud compute routes create on-prem-route1 --destination-range 10.0.1.0/24 \
    --network on-prem --next-hop-vpn-tunnel on-prem-tunnel1 \
    --next-hop-vpn-tunnel-region us-east4
```

9. Route traffic from the `cloud` VPC to the `on-prem 192.168.1.0/24` range into the tunnel:
    

```apache
gcloud compute routes create cloud-route1 --destination-range 192.168.1.0/24 \
    --network cloud --next-hop-vpn-tunnel cloud-tunnel1 --next-hop-vpn-tunnel-region us-east1
```

Create two VPN tunnels.

## Task 5. Test throughput over VPN

At this point, you've established a secure path between the on-prem and cloud VPCs. To test throughput use [iperf](https://iperf.fr/), an open-source tool for network load testing. To test, you need a VM in each environment, one to send traffic and the other to receive it, and you'll create them next.

### Single VPN load testing

Now you create a virtual machine for the cloud VPC named is `cloud-loadtest`. This example uses a Debian Linux image for the OS.

**Note:** If you have an existing project, feel free to omit this step and use existing resources. Bandwidth for a VM is 2 Gbps \* vCPUs, so you'll want a 4 vCPU minimum.

1. Run the following:
    

```apache
gcloud compute instances create "cloud-loadtest" --zone us-east1-d \
    --machine-type "e2-standard-4" --subnet "cloud-east" \
    --image-family "debian-11" --image-project "debian-cloud" --boot-disk-size "10" \
    --boot-disk-type "pd-standard" --boot-disk-device-name "cloud-loadtest"
```

2. Create a virtual machine for the `on-prem` VPC named `on-prem-loadtest`. This example uses the same Debian image as in the cloud VPC. Omit this step if you have existing resources.
    

Run the following:

```apache
gcloud compute instances create "on-prem-loadtest" --zone us-east4-c \
    --machine-type "e2-standard-4" --subnet "on-prem-central" \
    --image-family "debian-11" --image-project "debian-cloud" --boot-disk-size "10" \
    --boot-disk-type "pd-standard" --boot-disk-device-name "on-prem-loadtest"
```

3. **SSH** into each VM, using the Console or command line, and install a copy of [iperf](https://iperf.fr/) with the following command line:
    

```apache
sudo apt-get install iperf
```

4. On the `on-prem-loadtest` VM, run this command:
    

```apache
iperf -s -i 5
```

You have created an iperf server on the VM that reports its status every 5 seconds.

5. On the `cloud-loadtest` VM, run this command:
    

```apache
iperf -c 192.168.1.2 -P 20 -x C
```

This creates an iperf client with twenty streams, which reports values after 10 seconds of testing.

Create two VMs and install iperf via ssh.

### Troubleshoot for issues you may face

**Note:** This is not part of lab instructions.

1. While creating tunnels for the local network, if you forgot to replace \[MY\_SECRET\] with "sharedsecret".
    

You can delete the created VPN tunnels by following command:

```apache
gcloud compute vpn-tunnels delete [tunnel-name] --region [region]
```

* Replace \[tunnel-name\] with name of the tunnel.
    
* Replace \[region\] with the region which you specified while creating tunnel.
    

2. If you are having trouble with the section single VPN load testing:
    

* Make sure you installed iperf on both VMs.
    
* In case of connection refused error, verify that:
    
    * Firewall rules for created networks (tcp:5001)
        
    * The server is running properly on `on-prem-loadtest`
        
    * You are trying to connect to the server via `cloud-loadtest`
        

3. If you are trying to see the forwarding rules that you created in the Console:
    

* In the **Navigation menu** go to the Networking section.
    
* Click on **Network Connectivity** &gt; **VPN**.
    
* Click on the Cloud VPN Gateway to view the Cloud VPN Gateway details page.
    

---

## Solution of Lab

%[https://youtu.be/3iRVTH8Ed5s] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759556567781/aae8f2e6-25c4-4e0a-aad0-bbc92fce14b8.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759556934450/d48e4bbf-9f17-4d91-a6e4-203a18dd6545.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759556966561/3f4d869b-ae75-4a99-b244-a49e564668cb.png align="center")

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP062/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Building%20a%20High%20throughput%20VPN/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```