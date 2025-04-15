---
title: "Test Network Latency Between VMs - GSP161"
seoTitle: "Test Network Latency Between VMs - GSP161"
seoDescription: "When you have a virtual private network (VPN), your virtual machines (VMs) and subnetworks can be anywhere! Having a multi-region, multi-zone VPN provides a"
datePublished: Tue Apr 15 2025 10:05:00 GMT+0000 (Coordinated Universal Time)
cuid: cm9ic6hul001c09jvftnxfkmr
slug: test-network-latency-between-vms-gsp161
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744711275651/953c46d0-096e-47cc-b169-c9c861077273.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744711488508/cbd54a72-f076-4d5a-b10c-dbfb8beb518a.png
tags: test-network-latency-between-vms-gsp161, test-network-latency-between-vms, gsp161

---

## Overview

When you have a virtual private network (VPN), your virtual machines (VMs) and subnetworks can be anywhere! Having a multi-region, multi-zone VPN provides a highly available, scalable, and secure network solution for organizations with a global presence. For this lab, network connectivity and speed will be the main focus, to demonstrate the following:

* If one region or zone experiences an outage or disruption, traffic can be seamlessly rerouted to another available region or zone, ensuring continuous connectivity.
    
* When there are endpoints in regions close to where the user is located, the network path is shortened, which reduces latency and improves overall performance.
    
* Multi-region VPNs can intelligently route traffic based on network conditions and user location, ensuring the fastest and most efficient path.
    

In this lab you will use the `gcloud` CLI to add VMs to your existing network, and then test the connectivity and latency between the VMs.

## Prerequisites

Although not required, to understand how to create a network and apply firewall rules, take the **Create a Custom Network and Apply Firewall Rules** lab. For this lab it is presumed that you understand these concepts.

### What you'll learn

* Add VMs to an existing VPN subnet
    
* Confirm connectivity between VMs
    
* Measure latency between zones
    

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
    student-01-78a89acf0a1d@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    NZkf8Mui3NON
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-0f7d70fe3fe7`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-0f7d70fe3fe7
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
ACCOUNT: student-01-78a89acf0a1d@qwiklabs.net

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
project = qwiklabs-gcp-01-0f7d70fe3fe7
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

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

Click on **VPC networks** in the left menu to see your entire network. The `taw-custom-network` has three subnetworks with firewalls rules applied.

Review the settings that your network and subnets have.

The next steps are to create a VM in each subnet and make sure you can connect to them.

## Task 1. Connect VMs and check latency

For this task you will create a virtual machine in each zone. Each machine will use network tags that the firewall rules need to allow network traffic.

1. Run this commands to create an instance named `us-test-01` in the subnet-`us-east1` subnet:
    

```apache
gcloud compute instances create us-test-01 \
--subnet subnet-us-east1 \
--zone us-east1-d \
--machine-type e2-standard-2 \
--tags ssh,http,rules
```

Be sure to note the external IP for later use in this lab.

**Output:**

```apache
Created [https://www.googleapis.com/compute/v1/projects/cloud-network-module-101/zones/us-east1-d/instances/us-test-01].
NAME        ZONE           MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP     STATUS
us-test-01  us-east1-d  e2-standard-2              10.0.0.2     104.198.230.22  RUNNING
```

2. Now make the `us-test-02` and `us-test-03` VMs in their correlated subnets:
    

```apache
gcloud compute instances create us-test-02 \
--subnet subnet-us-central1 \
--zone us-central1-a \
--machine-type e2-standard-2 \
--tags ssh,http,rules
```

```apache
gcloud compute instances create us-test-03 \
--subnet subnet-us-east4 \
--zone us-east4-c \
--machine-type e2-standard-2 \
--tags ssh,http,rules
```

Click **Check my progress** to verify the objective.

Create three instances in specified zones for Traceroute and performance testing.

**Check my progress**

### Verify you can connect your VM

Now do a few exercises to test the connection to your VMs. Use ping to test the reachability of a host and measure the round-trip time for messages sent from the originating host to the destination computer.

1. Switch back to the Console and navigate to **Compute Engine**.
    
2. Click the **SSH** button corresponding to the `us-test-01` instance. This opens an SSH connection to the instance in a new window.
    
3. In the SSH window of `us-test-01`, type the following command to use an ICMP (Internet Control Message Protocol) echo against `us-test-02`, adding the external IP address for the VM in-line:
    

```apache
ping -c 3 <us-test-02-external-ip-address>
```

You can locate the external IP of your virtual machines in the Compute Engine browser tab under the External IP field.

**Note:**Your IP addresses will differ from the picture.

4. Run this command to use an ICMP echo against `us-test-03`, adding the external IP address for the VM in-line:
    

```apache
ping -c 3 <us-test-03-external-ip-address>
```

**Example output:**

```apache
PING 35.187.149.67 (35.187.149.67) 56(84) bytes of data.
64 bytes from 35.187.149.67: icmp_seq=1 ttl=76 time=152 ms
64 bytes from 35.187.149.67: icmp_seq=2 ttl=76 time=152 ms
64 bytes from 35.187.149.67: icmp_seq=3 ttl=76 time=152 ms
```

5. Now check that SSH also works for instances `us-test-02` and `us-test-03`. Try an ICMP echo against `us-test-01`.
    

### Use ping to measure latency

Latency refers to the time it takes for a data packet to travel from its source to its destination and back. It's typically measured in milliseconds (ms).

* Use ping to measure the latency between these regions - run the following command after opening an SSH window on the `us-test-01`:
    

```apache
ping -c 3 us-test-02.us-central1-a
```

**Command output:**

```apache
PING us-test-02.us-central1-a.c.cloud-network-module-101.internal (10.2.0.2) 56(84) bytes of data.
64 bytes from us-test-02.us-central1-a.c.cloud-network-module-101.internal (10.2.0.2): icmp_seq=1 ttl=64 time=105 ms
64 bytes from us-test-02.us-central1-a.c.cloud-network-module-101.internal (10.2.0.2): icmp_seq=2 ttl=64 time=104 ms
64 bytes from us-test-02.us-central1-a.c.cloud-network-module-101.internal (10.2.0.2): icmp_seq=3 ttl=64 time=104 ms
```

The latency you get back is the "Round Trip Time" (RTT) - the time the packet takes to get from `us-test-01` to `us-test-02`.

To test connectivity, ping uses the ICMP [Echo Request and Echo Reply Messages](http://www.tcpipguide.com/free/t_ICMPv4EchoRequestandEchoReplyMessages.htm).

**Note: Things to think about**

What is the latency you see between regions? What is special about the connection from `us-test-02` to `us-test-03`?

**Note:** Internal DNS: How is DNS provided for VM instances?

Each instance has a metadata server that also acts as a DNS resolver for that instance. DNS lookups are performed for instance names. The metadata server itself stores all DNS information for the local network and queries Google's public DNS servers for any addresses outside of the local network.

An internal fully qualified domain name (FQDN) for an instance looks like this: hostName.\[ZONE\].c.\[PROJECT\_ID\].internal .

You can always connect from one instance to another using this FQDN. If you want to connect to an instance using, for example, just `hostName`, you need information from the internal DNS resolver that is provided as part of Compute Engine.

## Task 2. Traceroute and Performance testing

Traceroute is a tool to trace the path between two hosts. A traceroute can be a helpful first step to uncovering many different types of network problems. Support or network engineers often ask for a traceroute when diagnosing network issues.

**Note: Functionality**

Traceroute shows all Layer 3 (routing layer) hops between the hosts. This is achieved by sending packets to the remote destination with increasing TTL (Time To Live) value (starting at 1). The TTL field is a field in the IP packet which gets decreased by one at every router. Once the TTL hits zero, the packet gets discarded and a "TTL exceeded" ICMP message is returned to the sender. This approach is used to avoid routing loops; packets cannot loop continuously because the TTL field will eventually decrement to 0. By default the OS sets the TTL value to a high value (64, 128, 255 or similar), so this should only ever be reached in abnormal situations.

So traceroute sends packets first with TTL value of 1, then TTL value of 2, etc., causing these packets to expire at the first/second/etc. router in the path. It then takes the source IP/host of the ICMP TTL exceeded message returned to show the name/IP of the intermediate hop. Once the TTL is high enough, the packet reaches the destination, and the destination responds.

The type of packet sent varies by implementation. Under Linux, UDP packets are sent to a high, unused port. So the final destination responds with an ICMP Port Unreachable. Windows and the mtr tool by default use ICMP echo requests (like ping), so the final destination answers with an ICMP echo reply.

Try it out by setting up a traceroute on one of your virtual machines.

1. For this step, use the `us-test-01` VM and `us-test-02` VM and SSH into both of them.
    
2. Install these performance tools in the SSH window for `us-test-01`:
    

```apache
sudo apt-get update
sudo apt-get -y install traceroute mtr tcpdump iperf whois host dnsutils siege
```

3. Now use `traceroute` with `www.icann.org` and see how it works:
    

```apache
traceroute www.icann.org
```

In your output, each line represents a hop.

* first column: shows the hop number.
    
* second column: shows the IP address (or hostname, if available) of the hop.
    
* remaining columns: show the RTT for additional packets sent to that hop.
    

3. Now try a few other destinations and also from other sources:
    
    * VMs in the same region or another region (eu1-vm, asia1-vm, w2-vm)
        
    * [www.wikipedia.org](http://www.wikipedia.org/)
        
    * [www.adcash.com](http://www.adcash.com/)
        
    * bad.horse (works best if you increase max TTL, so run `traceroute -m 255 bad.horse`)
        
    * Anything else you can think of
        
4. To stop traceroute, **Ctrl+c** in the SSH window and return to the command line.
    

**Note:** Things to think about

What do you notice with the different traceroutes?

Traceroute and Performance testing.

**Check my progress**

## Task 3. Use iperf to test performance

`iperf` measures network throughput and latency. When you use `iperf` to test the performance between two hosts, one side needs to be set up as the iperf server to accept connections.

**Note:** The following commands transfer Gigabytes of traffic between regions, which is charged at [Internet egress](https://cloud.google.com/compute/pricing#internet_egress) rates. Be mindful of this when using them. If you are not on a allowlisted project, or in the free trial, you might want to skip, or only skim, this section. (Costs should be less than $1 USD.)

1. SSH into `us-test-02` and install the performance tools:
    

```apache
sudo apt-get update

sudo apt-get -y install traceroute mtr tcpdump iperf whois host dnsutils siege
```

2. SSH into `us-test-01` and run:
    

```apache
iperf -s #run in server mode
```

3. On `us-test-02` SSH run this `iperf`:
    

```apache
iperf -c us-test-01.us-east1-d #run in client mode
```

You will see some output like this:

```apache
Client connecting to eu-vm, TCP port 5001
TCP window size: 45.0 KByte (default)
```

```apache
[  3] local 10.20.0.2 port 35923 connected with 10.30.0.2 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.0 sec   298 MBytes   249 Mbits/sec
```

4. On `us-test-01` use **Ctrl + c** to exit the server side when you're done.
    

### Between VMs within a region

Now you'll deploy another instance (`us-test-04`)in a different zone than `us-test-01`. You will see that within a region, the bandwidth is limited by the [2 Gbit/s per core](https://cloud.google.com/compute/docs/networks-and-firewalls#egress_throughput_caps) egress cap.

1. In Cloud Shell, create `us-test-04`:
    

```apache
gcloud compute instances create us-test-04 \
--subnet subnet-us-east1 \
--zone us-east1-d \
--tags ssh,http
```

2. SSH to `us-test-04` and install performance tools:
    

```apache
sudo apt-get update

sudo apt-get -y install traceroute mtr tcpdump iperf whois host dnsutils siege
```

Between regions you reach much lower limits, mostly due to limits on TCP window size and single stream performance. You can increase bandwidth between hosts by using other parameters, like UDP.

3. On `us-test-02` SSH run:
    

```apache
iperf -s -u #iperf server side
```

4. On `us-test-01` SSH run:
    

```apache
iperf -c us-test-02.us-central1-a -u -b 2G #iperf client side - send 2 Gbits/s
```

This should be able to achieve a higher speed between EU and US. Even higher speeds can be achieved by running a bunch of TCP `iperfs` in parallel. Let's test this.

5. In the SSH window for `us-test-01` run:
    

```apache
iperf -s
```

6. In the SSH window for `us-test-02` run:
    

```apache
iperf -c us-test-01.us-east1-d -P 20
```

The combined bandwidth should be really close to the maximum achievable bandwidth.

Click **Check my progress** to verify the objective.

Test the performance.

**Check my progress**

7. Test a few more combinations. If you use Linux on your laptop you can test against your laptop as well. (You can also try [iperf3](https://github.com/esnet/iperf) which is available for [many OSes](https://iperf.fr/iperf-download.php), but this is not part of the lab.)
    

As you can see, to reach the maximum bandwidth, just running a single TCP stream (for example, file copy) is not sufficient; you need to have several TCP sessions in parallel. Reasons are: TCP parameters such as Window Size; and functions such as Slow Start.

For more information on this and all other TCP/IP topics, refer to [TCP/IP Illustrated](https://www.amazon.com/TCP-Ip-Illustrated-Volume-Protocols/dp/9332535957/ref=dp_ob_title_bk).

Tools like [bbcp](https://github.com/eeertekin/bbcp) can help to copy files as fast as possible by parallelizing transfers and using configurable window size.

---

## Solution of Lab

%[https://youtu.be/Cr5MoJBQWxU] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Test%20Network%20Latency%20Between%20VMs/gsp161.sh
sudo chmod +x *.sh
./*.sh
```