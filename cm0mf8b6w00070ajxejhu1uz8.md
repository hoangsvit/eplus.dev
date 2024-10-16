---
title: "Network Tiers - Optimizing Network Spend - GSP219"
seoTitle: "Network Tiers - Optimizing Network Spend - GSP219"
seoDescription: "In this lab, you create one VM in the Premium network service tier (default) and one VM in the Standard network service tier. Then you compare the latency a"
datePublished: Tue Sep 03 2024 12:44:07 GMT+0000 (Coordinated Universal Time)
cuid: cm0mf8b6w00070ajxejhu1uz8
slug: network-tiers-optimizing-network-spend-gsp219
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1725367164294/95b8678b-66b7-4c60-b811-b2773e06b79d.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1725367438030/e3edc3c2-f386-4850-8555-f10195f07aab.jpeg

---

## **Overview**

In this lab, you create one VM in the Premium network service tier (default) and one VM in the Standard network service tier. Then you compare the latency and network paths for each VM instance.

With Network Service Tiers, Google Cloud enables you to optimize your cloud network for performance by choosing the Premium Tier or for cost with the new Standard Tier.

### Premium Tier

Premium Tier delivers traffic over Google’s well-provisioned, low latency, highly reliable global network. This network consists of an extensive global private fiber network with over [100 points of presence (POPs)](https://peering.google.com/#/) across the globe.

![Premium Tier traffic delivery flow diagram](https://cdn.qwiklabs.com/SMHQ2NByy28yEkwaFATnQE9dXNx9JqJNj9KHHMzZ3Kc%3D align="left")

### Standard Tier

Standard Tier is a new lower-cost offering. This tier provides network quality that is comparable to other public cloud providers (but lower than Premium Tier) and regional network services such as Regional Load Balancing with one VIP per region.

![Standard Tier delivery flow diagram](https://cdn.qwiklabs.com/mPhY1SiT%2BNd9zIfwba%2FZ6%2FT8t7xrS6EACd3uL9%2FeFxE%3D align="left")

Standard tier is priced lower than Premium because your traffic between Google Cloud and your end-user (Internet) is delivered over transit (ISP) networks instead of Google’s network.

### Objectives

In this lab, you learn how to perform the following tasks:

* Create a VM using the Premium network service tier
    
* Create a VM using the Standard network service tier
    
* Explore the latency and network paths for VMs on different network service tiers
    

## **Setup**

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
    student-04-823771a69e26@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    QgaoMjYi5UGW
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

## **Task 1. Create the VM instances**

You can configure the network tier for your VM instances at the project-level or at the resource-level. In this lab, you create two VM instances and define their network service tier during the instance creation.

### Create the Premium tier VM

Create a VM instance using the Premium service tier, which is the default.

1. In the Console, navigate to **Navigation menu () &gt; Compute Engine &gt; VM instances**.
    
2. Click **Create Instance**.
    
3. Set the following property values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | vm-premium |
    | Region | `us-east1` |
    | Zone | `us-east1-c` |
    | Series | E2 |
    | Machine type | 2 vCPU (e2-medium) |
    
4. Click **Advanced options** at the bottom of the dialog.
    
5. Expand **Networking &gt; Network interfaces (default)**.
    
6. Verify that **Network Service Tier** is set to **Premium**.
    

**Note:** The **Premium** tier is currently the default at the project-level, you can change this by clicking on the **change** link. Do not change the project-level tier in this lab!

7. Click **Done**, and then click **Create**.
    

### **Create the Standard tier VM**

Create a VM instance of the same machine type and in the same zone but use the Standard service tier.

1. Click **Create Instance**.
    
2. Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | vm-standard |
    | Region | `us-east1` |
    | Zone | `us-east1-c` |
    | Series | E2 |
    | Machine type | 2 vCPU (e2-medium) |
    
3. Click **Advanced options**.
    
4. Expand **Networking &gt; Network interfaces (default)**.
    
5. Set the **Network Service Tier** to **Standard**.
    
6. Click **Done**, and then click **Create**.
    

**Note:** Both VM instances have the same machine type, zone, and VPC network. The only differences are the Network Service Tier and the instance names.

7. Wait for both instances to be created, which will be indicated by a green check mark next to each instance's name.
    
8. Note the External IP Addresses of **vm-premium** and **vm-standard**. They will be referred to as `[premium-IP]` and `[standard-IP]`, respectively.
    

Click *Check my progress* to verify the objective.

Create the VM instances

**Check my progress**

## **Task 2. Explore the latency and network paths**

Explore some of the network performance differences between the Premium and Standard tier.

### Explore the latency for both VM instance

First, explore the latency from a third party service in Europe to your VM instances in `us-east1-c`. Latency is defined as the Round Trip Time (RTT) network packets take to get from one host to the other and back. Lower latency improves user experience and also improves transfer speeds.

Which Network Service Tier should provide lower latency?Standard TierPremium Tier

**Submit**

In this lab, you use [Ping](https://ping.eu/ping) to demonstrate the latency a user in Europe might experience when accessing your server in `us-east1-c`.

1. Open a new tab and go to [Ping](https://ping.eu/ping).
    
2. Enter the `[premium-IP]` in the **IP address or host name:** field.
    
3. Type the security code and click **Go**. Then wait for the 4 consecutive pings to complete.
    

The output should look like this:

```apache
--- PING 35.202.10.213 (35.202.10.213) 56(84) bytes of data. ---
64 bytes from 35.202.10.213: icmp_seq=1 ttl=54 time=124 ms
64 bytes from 35.202.10.213: icmp_seq=2 ttl=54 time=123 ms
64 bytes from 35.202.10.213: icmp_seq=3 ttl=54 time=123 ms
64 bytes from 35.202.10.213: icmp_seq=4 ttl=54 time=123 ms

...

--- Round Trip Time (rtt) ---				
min 	123.499 ms
avg 	123.753 ms
max 	124.225 ms
```

**Note:** In the example output, the average latency of the Premium tier VM is 123.753 milliseconds.

4. Enter the `[standard-IP]` in the **IP address or host name:** field.
    
5. Type the security code and click **Go**. Then wait for the 4 consecutive pings to complete.
    

The output should look like this:

```apache
--- PING 35.206.65.89 (35.206.65.89) 56(84) bytes of data. ---
64 bytes from 35.206.65.89: icmp_seq=1 ttl=69 time=128 ms
64 bytes from 35.206.65.89: icmp_seq=2 ttl=69 time=127 ms
64 bytes from 35.206.65.89: icmp_seq=3 ttl=69 time=127 ms
64 bytes from 35.206.65.89: icmp_seq=4 ttl=69 time=127 ms

...'			
--- Round Trip Time (rtt) ---				
min 	127.746 ms
avg 	127.986 ms
max 	128.470 ms
```

In the example output, the average latency of the Standard tier VM is 127.986 milliseconds. Therefore, the Premium tier VM has a 5% lower latency than the Standard tier VM.

This is a very basic test. Passing real application traffic is always the best indicator of latency and performance. Feel free to examine this [Google Cloud blog on Network Service Tiers](https://cloudplatform.googleblog.com/2017/08/introducing-Network-Service-Tiers-your-cloud-network-your-way.html) to learn more about performance differences between network tiers.

### **Explore the networks paths for both VM instances**

Explore the network paths between a third party service in Europe and your VM instances in `us-east1-c` using traceroute. Traceroute shows all Layer 3 (routing layer) hops between hosts; therefore, it can illustrate a network path between hosts.

Which Network Service Tier should have fewer hops on the public internet?Premium TierStandard Tier

**Submit**

In this lab, you use [Traceroute](https://ping.eu/traceroute) to visualize a network path that traffic from a user in Europe might take when accessing your server in `us-east1-c`.

1. Open a new tab and go to [Traceroute](https://ping.eu/traceroute).
    
2. Enter the `[premium-IP]` in the **IP address or host name:** field.
    
3. Type the security code and click **Go**. Then wait for the 4 consecutive pings to complete.
    

The output should look like this:

```apache
traceroute to 35.202.10.213 (35.202.10.213), 30 hops max, 60 byte packets		
1	 	 	 	*	*	*
2	core21.fsn1.hetzner.com	213.239.245.237	de	0.293 ms	 	 
     core22.fsn1.hetzner.com	213.239.245.241	de	0.231 ms	 
     core21.fsn1.hetzner.com	213.239.245.237	de	0.293 ms		
3	core12.nbg1.hetzner.com	213.239.245.214	de	2.791 ms	 	 
     core11.nbg1.hetzner.com	213.239.224.9	de	2.764 ms	 
     core0.fra.hetzner.com	213.239.252.29	de	5.014 ms			
4	core4.fra.hetzner.com	213.239.245.245	de	5.489 ms	5.484 ms	 
 		us				
5	 	 	 	*	*	*			
6	 	 	 	*	*	*			
7	 	 	 	*	*	*			
8	 	 	 	*	*	*			
9	 	 	 	*	*	*
No reply for 5 hops. Assuming we reached the firewall.
```

In the example output, the traffic destined for the Premium tier VM reached Google Cloud's network after the 5th hop. The IP address on hop 4 is listed in Bavaria, Germany which is the same state as the origin server and an [Edge Point of Presence (PoPs)](https://peering.google.com/#/infrastructure). Therefore, the Premium network tier traffic entered the Google Cloud network very close to the user, as expected.

4. Enter the `[standard-IP]` in the **IP address or host name:** field.
    
5. Type the security code and click **Go**. Then wait for the 4 consecutive pings to complete.
    

The output should look like this:

```apache
traceroute to 35.206.65.89 (35.206.65.89), 30 hops max, 60 byte packets			
1	 	 	 	*	*	*			
2	core22.fsn1.hetzner.com	213.239.245.241	de	0.229 ms	 	 
     core21.fsn1.hetzner.com	213.239.245.237	de	0.229 ms	 
     core22.fsn1.hetzner.com	213.239.245.241	de	0.229 ms			
3	core12.nbg1.hetzner.com	213.239.224.13	de	2.807 ms	 	 
     core5.fra.hetzner.com	213.239.224.246	de	4.948 ms	4.956 ms			
4	ffm-b4-link.telia.net	213.248.70.2	 	5.023 ms	5.030 ms	5.032 ms			
5	hbg-b1-link.telia.net	213.248.70.0	 	14.883 ms	 	 
     ffm-bb4-link.telia.net	62.115.120.7	 	108.287 ms	 
     ffm-bb3-link.telia.net	62.115.120.1	 	119.768 ms			
6	hbg-bb4-link.telia.net	213.155.135.86	 	115.076 ms	 	 
     hbg-bb1-link.telia.net	213.155.135.82	 	115.813 ms	 
     hbg-bb4-link.telia.net	62.115.141.110	 	126.967 ms			
7	ldn-bb4-link.telia.net	62.115.122.161	 	116.926 ms	 	 
     nyk-bb3-link.telia.net	213.155.135.5	 	109.611 ms	 
     nyk-bb4-link.telia.net	80.91.251.100	 	110.269 ms			
8	hbg-bb1-link.telia.net	80.91.249.11	 	145.034 ms	 	 
     chi-b21-link.telia.net	62.115.137.59	 	110.215 ms	 
     nyk-bb4-link.telia.net	62.115.136.185	 	126.232 ms			
9	kbn-bb3-link.telia.net	213.155.130.101	 	125.870 ms	125.816 ms	 
     chi-b21-link.telia.net	62.115.137.59	 	116.943 ms			
10	google-ic-326155-chi-b21.c.telia.net	213.248.66.127	 	115.447 ms	 	 				
11	chi-b21-link.telia.net	80.91.246.162	 	125.726 ms	 	 				
12	 	 	 	*	*	*			
13	 	 	 	*	*	*			
14	 	 	 	*	*	*			
15	 	 	 	*	*	*			
16	 	 	 	*	*	*
No reply for 5 hops. Assuming we reached firewall.
```

In the example output, the traffic destined for the Standard tier VM reached Google Cloud's network after the 12th hop. The IP address on hop 11 is listed in Chicago, USA, which has an [Edge Point of Presence (PoPs)](https://peering.google.com/#/infrastructure) and is close to Iowa, USA (`us-east1`). This demonstrates that Premium network tier traffic enters the Google Cloud network much closer to the user than Standard network tier traffic.

**Note:** Traffic on the public internet can use different routes. Therefore, you might get slightly different results than the examples shown above.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=C5fHDeq23Cc] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725367391915/08060fa0-df9e-41d1-85ae-dc4f5ecc0fd5.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Network%20Tiers%20Optimizing%20Network%20Spend/quicklabgsp219.sh
sudo chmod +x quicklabgsp219.sh
./quicklabgsp219.sh
```