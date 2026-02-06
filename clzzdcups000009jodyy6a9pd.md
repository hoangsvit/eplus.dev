---
title: "VPC Network Peering - GSP193"
seoTitle: "VPC Network Peering - GSP193"
seoDescription: "Google Cloud Virtual Private Cloud (VPC) Network Peering allows private connectivity across two VPC networks regardless of whether or not they belong to the"
datePublished: Sun Aug 18 2024 09:32:58 GMT+0000 (Coordinated Universal Time)
cuid: clzzdcups000009jodyy6a9pd
slug: vpc-network-peering-gsp193
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748320020491/4d7bc5bf-8b29-4769-afbf-6e99c557dc40.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1748320035481/a1d8ae33-cf14-4fe6-b965-01b99512881d.png
tags: vpc-network-peering-gsp193, gsp193, vpc-network-peering

---

## **Overview**

Google Cloud Virtual Private Cloud (VPC) Network Peering allows private connectivity across two VPC networks regardless of whether or not they belong to the same project or the same organization.

VPC Network Peering allows you to build SaaS (Software-as-a-Service) ecosystems in Google Cloud, making services available privately across different VPC networks within and across organizations, allowing workloads to communicate in private space.

VPC Network Peering is useful for:

* Organizations with several network administrative domains.
    
* Organizations that want to peer with other organizations.
    

If you have multiple network administrative domains within your organization, VPC Network Peering allows you to make services available across VPC networks in private space. If you offer services to other organizations, VPC Network Peering allows you to make those services available in private space to those organizations.

The ability to offer services across organizations is useful if you want to offer services to other enterprises, and it is useful within your own enterprise if you have several distinct organization nodes due to your own structure or as a result of mergers or acquisitions.

VPC Network Peering gives you several advantages over using external IP addresses or VPNs to connect networks, including:

* **Network Latency:** Private networking offers lower latency than public IP networking.
    
* **Network Security:** Service owners do not need to have their services exposed to the public Internet and deal with its associated risks.
    
* **Network Cost:** Networks that are peered can use internal IPs to communicate and save Google Cloud egress bandwidth costs. Regular network pricing still applies to all traffic.
    

### What you'll do

* Create a custom network in two projects
    
* Set up a VPC network peering session
    

## **Setup and requirements**

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
    student-04-71ed1266810c@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    cRIyHh6PWrpc
    ```
    
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-c4bdac2692cd`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-c4bdac2692cd
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

3. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-71ed1266810c@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

4. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-03-c4bdac2692cd
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Create a custom network in both projects**

Within the same organization node, a network could be hosting services that need to be accessible from other VPC networks in the same or different projects.

Alternatively, one organization may want to access services a third-party service is offering.

Project names are unique across all of Google Cloud, so you do not need to specify the organization when setting up peering. Google Cloud knows the organization based on the project name.

In this lab, you have been provisioned 2 projects, the first project is *project-A* and second is *project-B*.

1. In each project, start a new Cloud Shell by click **+** icon.
    
2. In the Cloud Shell for *project-A*, set the project ID for the *project-A*:
    

```apache
gcloud config set project qwiklabs-gcp-03-c4bdac2692cd
```

3. In the Cloud Shell for *project-B*, set the project ID for the *project-B*:
    

```apache
gcloud config set project qwiklabs-gcp-02-6867b690a5f4
```

#### **project-A:**

1. Go back to first Cloud Shell and run the following to create a custom network:
    

```apache
gcloud compute networks create network-a --subnet-mode custom
```

2. Create a subnet within this VPC and specify a region and IP range by running:
    

```apache
gcloud compute networks subnets create network-a-subnet --network network-a \
    --range 10.0.0.0/16 --region us-east1
```

3. Create a VM instance:
    

```apache
gcloud compute instances create vm-a --zone us-east1-c --network network-a --subnet network-a-subnet --machine-type e2-small
```

4. Run the following to enable SSH and `icmp`, because you'll need a secure shell to communicate with VMs during connectivity testing:
    

```apache
gcloud compute firewall-rules create network-a-fw --network network-a --allow tcp:22,icmp
```

Next you set up Project-B in the same way.

Click *Check my progress* to verify the objective.

Create a custom network in project-A

**Check my progress**

#### **project-B:**

1. Switch to the second Cloud Shell and create a custom network:
    

```apache
gcloud compute networks create network-b --subnet-mode custom
```

2. Create a subnet within this VPC and specify a region and IP range by running:
    

```apache
gcloud compute networks subnets create network-b-subnet --network network-b \
    --range 10.8.0.0/16 --region us-east1
```

3. Create a VM instance:
    

```apache
gcloud compute instances create vm-b --zone us-east1-c --network network-b --subnet network-b-subnet --machine-type e2-small
```

4. Run the following to enable SSH and `icmp`, because you'll need a secure shell to communicate with VMs during connectivity testing:
    

```apache
gcloud compute firewall-rules create network-b-fw --network network-b --allow tcp:22,icmp
```

Click *Check my progress* to verify the objective.

Create a custom network in project-B

**Check my progress**

## **Task 2. Set up a VPC network peering session**

Consider an organization which needs VPC Network Peering to be established between network-A in project-A, and network-B in project-B. In order for VPC Network Peering to be established successfully, administrators of network-A and network-B must separately configure the peering association.

### Peer network-A with network-B:

![Peer-AB network diagram](https://cdn.qwiklabs.com/i6fwOoVXTt4J7oToas%2BFV61tUgLuDiaw5y7zGEnr6lU%3D align="left")

Select the correct project in the console before you apply the setting by clicking the down arrow next to the Project ID at the top of the screen, then select which project ID you need.

![Select project dialog box](https://cdn.qwiklabs.com/drUmdZs%2FLDlS23RnHLQq%2BeHorjM3n%2B2ulUTsus0L%2FRc%3D align="left")

**project-A**

Go to the `VPC Network Peering` in the Cloud Console by navigating to the Networking section and clicking **VPC Network** &gt; **VPC network peering** in the left menu. Once you're there:

1. Click **Create connection**.
    
2. Click **Continue**.
    
3. Type "peer-ab" as the **Name** for this side of the connection.
    
4. Under **Your VPC network**, select the network you want to peer (network-a).
    
5. Set the **Peered VPC network** radio buttons to **In another project**.
    
6. Paste in the **Project ID** of the second project.
    

```apache
qwiklabs-gcp-02-6867b690a5f4
```

7. Type in the **VPC network name** of the other network (network-b).
    
8. Click **Create**.
    

At this point, the peering state remains INACTIVE because there is no matching configuration in network-b in project-B. You should see the Status message, `Waiting for peer network to connect`.

Click *Check my progress* to verify the objective.

Peer network-a with network-b

**Check my progress**

### Peer network-b with network-a

![Peer-BA network diagram](https://cdn.qwiklabs.com/u1lfqiOZTxehsnL%2FYaYF7Xg0XA%2FFXsq8YubRiAYwx4w%3D align="left")

**Note:** Switch to the second project in the console.

**project-B**

1. Click **Create connection**.
    
2. Click **Continue**.
    
3. Type "peer-ba" as the **Name** for this side of the connection.
    
4. Under **Your VPC network**, select the network you want to peer (network-b).
    
5. Set the **Peering VPC network** radio buttons to **In another project**, unless you wish to peer within the same project.
    
6. Specify the **Project ID** of the first project.
    

```apache
qwiklabs-gcp-03-c4bdac2692cd
```

7. Specify **VPC network name** of the other network (network-a).
    
8. Click **Create**.
    

In the VPC network peering, you should now see `peer-ba` listed in the property list.

VPC Network Peering becomes ACTIVE and routes are exchanged As soon as the peering moves to an ACTIVE state, traffic flows are set up:

* Between VM instances in the peered networks: Full mesh connectivity.
    
* From VM instances in one network to Internal Load Balancing endpoints in the peered network.
    

![Active Peer-AB and Peer-BA network diagram](https://cdn.qwiklabs.com/a3mCwnSLHBiYoGJjFqeP4kgj7HgaY87W9CevTJR0eK4%3D align="left")

The routes to peered network CIDR prefixes are now visible across the VPC network peers. These routes are implicit routes generated for active peerings. They don't have corresponding route resources. The following command lists routes for all VPC networks for project-A.

```apache
gcloud compute routes list --project qwiklabs-gcp-03-c4bdac2692cd
```

**Example output:**

```apache
NAME                              NETWORK    DEST_RANGE     NEXT_HOP                  PRIORITY
default-route-2a865a00fa31d5df    network-a  0.0.0.0/0      default-internet-gateway  1000
default-route-8af4732e693eae27    network-a  10.0.0.0/16                              1000
peering-route-4732ee69e3ecab41    network-a  10.8.0.0/16    peer-ab                   1000
```

Click *Check my progress* to verify the objective.

Peer network-b with network-a

**Check my progress**

## **Task 3. Test connectivity**

In this task, you perform a connectivity test.

### project-A

1. Navigate to VM instances console by clicking **Navigation Menu** &gt; **Compute Engine** &gt; **VM instances**.
    
2. Copy the **INTERNAL\_IP** for `vm-a`.
    

### project-B

1. Click **Navigation Menu** &gt; **Compute Engine** &gt; **VM instances**.
    

**SSH** into `vm-b` instance.

2. In the SSH shell of `vm-b`, run the following command replacing `<INTERNAL_IP_OF_VM_A>` with the vm-a instance INTERNAL\_IP:
    

```apache
ping -c 5 <INTERNAL_IP_OF_VM_A>
```

**Example output:**

```apache
PING 10.8.0.2 (10.8.0.2) 56(84) bytes of data.
64 bytes from 10.8.0.2: icmp_seq=1 ttl=64 time=1.07 ms
64 bytes from 10.8.0.2: icmp_seq=2 ttl=64 time=0.364 ms
64 bytes from 10.8.0.2: icmp_seq=3 ttl=64 time=0.205 ms
64 bytes from 10.8.0.2: icmp_seq=4 ttl=64 time=0.216 ms
64 bytes from 10.8.0.2: icmp_seq=5 ttl=64 time=0.164 ms

--- 10.8.0.2 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4065ms
rtt min/avg/max/mdev = 0.164/0.404/1.072/0.340 ms
```

---

## Solution of Lab

### Solution 1:

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP193/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759568941465/51a8175b-73c9-432d-9305-34adb79f50ff.png align="center")

```apache
export ZONE_1=
export PROJECT_ID1=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759568803897/f071a711-3338-46ea-b9b4-58de0830a97f.png align="center")

```apache
export ZONE_2=
export PROJECT_ID2=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759568826072/c817ce2d-4145-4920-bf5c-50d4cec72bd1.png align="center")

---

### Solution 2:

%[https://youtu.be/PvioBkuI-oE]

```apache
export PROJECT_ID_2=
export ZONE=
export ZONE_2=
```

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP193/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/VPC%20Network%20Peering/gsp193.sh
sudo chmod +x gsp193.sh
./gsp193.sh
```