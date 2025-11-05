---
title: "Improving Network Performance I - GSP045"
seoTitle: "Improving Network Performance I - GSP045"
seoDescription: "Recreate real-world scenarios, test with open-source tools, and optimize machine size for improved network performance and system efficiency"
datePublished: Wed Nov 05 2025 07:19:13 GMT+0000 (Coordinated Universal Time)
cuid: cmhlo32r2000202jy3tb2btg2
slug: improving-network-performance-i-gsp045
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762326961082/0be7d5c6-9f25-48e1-a37d-b8eac7ded639.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1762327134063/98c895c0-6bcc-46e5-97b2-0f6d796e583e.png
tags: improving-network-performance-i-gsp045, improving-network-performance-i, gsp045

---

## Overview

In this hands-on lab you get to read through some real-world scenarios, recreate the environments, and work on improving the performance of some troubled networks.

What will be fun to try is comparing the different instances to each other, just like the trouble-shooting use case, so you can prove the results and become familiar with the steps used to improve your own systems' performance.

This lab was adapted from blog posts by Colt McAnlis: [Core Count and the Egress problem](https://medium.com/@duhroach/core-count-and-the-egress-problem-607fb6b51fa9) and [Internal IP vs External IP](https://medium.com/@duhroach/internal-ip-vs-internal-ip-performance-76f15a650356). Colt blogs about Google Cloud network performance on Medium.

## Objectives

* How to test network connectivity and performance using open source tools
    
* How to inspect network traffic using open source tools
    
* How the size of your machine can affect the performance of your network
    

### Prerequisites

* Basic knowledge of Google Cloud services (best obtained by having previously taken the labs in the [Google Cloud Essentials](https://google.qwiklabs.com/quests/23))
    
* Basic Google Cloud networking and TCP/IP knowledge (best obtained by having taken the earlier labs in the Networking in the Google Cloud Quest)
    
* Basic Unix/Linux command line knowledge
    

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
    student-00-e9f24b8ccf23@qwiklabs.net
    ```
    
    
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    n3HhO5Gihg4a
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

The goal of this lab is to show you relationships between the core size and throughput, so the lab comes with 6 instances already built in. They were created when you started the lab.

* In the Cloud Console, navigate to **Navigation menu** &gt; **Compute Engine** &gt; **VM Instances** to see your instances:
    

![The VM instances page listing six instances and their details in table format](https://cdn.qwiklabs.com/Cg9%2BzXSB14niqn3RwyXt7r%2FX0%2F73HOtUlK40HZ3cBTo%3D align="left")

**Note:** your instance region and zone may differ from the ones shown in the screenshot.

### Connection test

Run a quick connection test to make sure things are working well.

1. **SSH** into `instance-1` by clicking the SSH button next to its name in the console.
    
2. In your new shell window ping another one of your instances and run the following command, replacing `<external ip address of instance-2>` with the `instance-2` external IP address:
    

```apache
ping -c 5 <external ip address of instance-2>
```



**Example output:**

```apache
student-00-aafd1bd9c185@instance-1:~$ ping -c 5 35.194.158.169
PING 35.194.158.169 (35.194.158.169) 56(84) bytes of data.
64 bytes from 35.194.158.169: icmp_seq=1 ttl=76 time=1.89 ms
64 bytes from 35.194.158.169: icmp_seq=2 ttl=76 time=0.409 ms
64 bytes from 35.194.158.169: icmp_seq=3 ttl=76 time=0.542 ms
64 bytes from 35.194.158.169: icmp_seq=4 ttl=76 time=0.557 ms
64 bytes from 35.194.158.169: icmp_seq=5 ttl=76 time=0.559 ms
--- 35.194.158.169 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4001ms
rtt min/avg/max/mdev = 0.409/0.792/1.894/0.554 ms
```

3. Ping another. Replace `<external ip address of instance-3>` with the `instance-3` external IP address and `ping` it:
    

```apache
ping -c 5 <external ip address of instance-3>
```



**Example output:**

```apache
student-00-aafd1bd9c185@instance-1:~$ ping -c 5 35.194.187.75
PING 35.194.187.75 (35.194.187.75) 56(84) bytes of data.
64 bytes from 35.194.187.75: icmp_seq=1 ttl=64 time=1.59 ms
64 bytes from 35.194.187.75: icmp_seq=2 ttl=64 time=0.336 ms
64 bytes from 35.194.187.75: icmp_seq=3 ttl=64 time=0.338 ms
64 bytes from 35.194.187.75: icmp_seq=4 ttl=64 time=0.302 ms
64 bytes from 35.194.187.75: icmp_seq=5 ttl=64 time=0.270 ms
--- 35.194.187.75 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 3999ms
rtt min/avg/max/mdev = 0.270/0.568/1.596/0.514 ms
```

Everything looks good, continue on!

### Review firewall rules

Firewall rules were also created for this lab.

* To see what they are, navigate to **Navigation menu** &gt; **Networking** &gt; **VPC networks &gt; Firewall** and click on the `iperftesting` firewall.
    

The firewall rule **iperftesting** uses following configuration:

| **Field** | **Value** | **Comments** |
| --- | --- | --- |
| Name | iperftesting | New rule name |
| Targets | All instances in the network |  |
| Source IP ranges | 0.0.0.0/0 | We will open the firewall for any IP address from the Internet. |
| Protocols and ports | tcp:5001; udp:5001 |  |
| Direction of traffic | Ingress |  |
| Action on match | Allow |  |

Now you're ready to start using the lab.

## Use case 1: Networking and Compute Engine core count

In this first scenario you'll see how the size of the machines being used affects throughput that you can measure.

*Dobermanifesto* is a video microblogging network exclusively for pets. Animal based videos can be uploaded, worldwide, and sent anywhere to be viewed & experienced.

While transferring data to/from their Compute Engine backends, their observed bandwidth was not as high as they were hoping for:

![The line graph: Dobermanifesto same-zone throughput, measured in Gbits per second.](https://cdn.qwiklabs.com/8aVSnBBimQS947e9qgOfClCR%2FruDDyZ6vpeY%2BUM%2BfAI%3D align="left")

## Task 1. Reproducing behavior

To try and reproduce this behavior, two instances in the same zone were created, and `iperf` was run between them 100x.

![The line graph: Same zone transfer times 100, measured in Mbits per second](https://cdn.qwiklabs.com/RiYTHQDvljDkIJnLPinKjrzqaod85wTbdqXOQ14jLi0%3D align="left")

This performance is even worse! Obviously something was wrong with the test. We need more information and a deeper set of reproduction steps from the company.

Now you will set up the scenario.

### Dobermanifesto's environment

1. Return to the VM instances list in the Compute Engine console.
    
2. SSH into `instance-1` (1vCPU 3.75GB) and run this command, setting up an `iperf` "receiver":
    

```apache
iperf -s
```



3. Then SSH into `instance-2` (1vCPU 3.75GB) and generate `iperf` traffic pointing at `instance-1`:
    

```apache
iperf -c <external ip address of instance-1>
```



**Example output:**

```apache
student-00-aafd1bd9c185@instance-2:~$ iperf -c 35.225.180.44
------------------------------------------------------------
Client connecting to 35.225.180.44, TCP port 5001
TCP window size: 45.0 KByte (default)
------------------------------------------------------------
[  3] local 10.20.0.4 port 56330 connected with 35.225.180.44 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3] 0.0000-10.0010 sec  4.66 GBytes  4.00 Gbits/sec
```

4. Return to `instance-1` and enter **CTRL** + **C** to end the receiver.
    

### Test environment

1. Go back to the Compute Engine console and open another SSH window into `instance-6` (1vCPU e2-micro .6GB).
    
2. Run the following command, setting it up as a "receiver":
    

```apache
iperf -s
```



**Example output:**

```apache
student-00-aafd1bd9c185@instance-6:~$ iperf -s
------------------------------------------------------------
Server listening on TCP port 5001
TCP window size: 128 KByte (default)
------------------------------------------------------------
```

3. In the `instance-2` SSH window, test the connection to `instance-6`:
    

```apache
iperf -c <internal ip address of instance-6>
```



**Example output:**

```apache
student-00-aafd1bd9c185@instance-2:~$ iperf -c 10.40.0.7
------------------------------------------------------------
Client connecting to 10.40.0.7, TCP port 5001
TCP window size: 45.0 KByte (default)
------------------------------------------------------------
[  3] local 10.40.0.5 port 54029 connected with 10.40.0.7 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.0 sec  2.29 GBytes  1.96 Gbits/sec
```

4. Return to `instance-6` and enter **CTRL** + **C** to end the receiver.
    

What happened? Bandwidth appears to have gone up. It may have in your case as well. It may have been less.

In the next section you will see how bandwidth is constrained by total core count, and that with core counts in this small range (core count of 1), the bandwidth will never exceed 2 Gbits/sec or so. As a result, the network speed is slow and bandwidth constrained, and similar to what *Dobermanifesto* was experiencing. When you test with 4-cpu machines in a minute, the results will be greater.

### The number of cores correlates to Gb/s

Why weren't the results much different? The [documentation for Compute Engine](https://cloud.google.com/compute/docs/networks-and-firewalls#egress_throughput_caps) states:

*Outbound or egress traffic from a virtual machine is subject to maximum network egress throughput caps. These caps are dependent on the number of vCPUs that a virtual machine instance has. Each core is subject to a 2 Gbits/second (Gbps) cap for peak performance. Each additional core increases the network cap, up to a theoretical maximum of 16 Gbps for each virtual machine*

This means that the more virtual CPUs in your network, the more networking throughput you will get.

In order to figure out what this looks like in practice, different core size groups were set up in the same zone, and iperf was run between them 1000 times.

![The bar chart: RCP Throughput by instance type, times 1000, displaying the difference between average and maximum.](https://cdn.qwiklabs.com/M8BRX1KjRhymUkIecOjMyxRidcAUdVhzj9DUyKfaE1w%3D align="left")

As the core count goes up, so does the avg and max throughput. Even with this simple test, you can see that hard 16Gbps limit on the higher machines.

**Note:** If you run iperf with multiple threads (~8 or so) you can exceed 10Gbps, and get up to about 16Gbps using a e2-standard-16 or larger. We don't have that size of a machine in this lab environment, but let's do a test with multiple threads next.

There are also [higher-cost VMs in the N2, N2D, C2, or C2D series](https://cloud.google.com/compute/docs/networking/configure-vm-with-high-bandwidth-configuration) that allow you to select a high bandwidth Tier 1 config and reach 50-100 Gbps.

## Task 2. How to improve results

The network that *Dobermanifesto* has uses 1vCPU machines. Increasing the size of the core will probably help *Dobermanifesto* achieve better results. Time to test this theory.

1. SSH into `instance-3` (4vCPU 15GB memory) and run this command:
    

```apache
iperf -s
```



**Example output:**

```apache
student-00-aafd1bd9c185@instance-3:~$ iperf -s
------------------------------------------------------------
Server listening on TCP port 5001
TCP window size: 128 KByte (default)
------------------------------------------------------------
```

2. SSH into `instance-4` (4vCPU 15GB memory):
    

```apache
iperf -c <internal ip address of instance-3>
```



**Example output:**

```apache
student-00-aafd1bd9c185@instance-4:~$ iperf -c 10.40.0.2
------------------------------------------------------------
Client connecting to 10.40.0.2, TCP port 5001
TCP window size: 45.0 KByte (default)
------------------------------------------------------------
[  3] local 10.40.0.4 port 54081 connected with 10.40.0.2 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.0 sec  8.93 GBytes  7.67 Gbits/sec
```

3. Now try it again with 4 threads:
    

```apache
iperf -c <internal ip address of instance-3> -P4
```



4. And with 8 threads:
    

```apache
iperf -c <internal ip address of instance-3> -P8
```



5. Return to `instance-3` and enter **CTRL** + **C** to end the receiver.
    

In these experiments, both the server and client were 4vCPUs, and the speed was greatly increased. The transfer rate was increased by 6.64 GBytes, and the Bandwidth by 5.71 Gbits/sec. With multiple threads, the performance was able to reach the cap for that core count.

6. Continue testing with `instance-5`, which is a higher performance 4vCPU machine, instance type "highcpu-4".
    

This instance type has faster CPUs, but less memory. What differences do you see, if any? With multiple threads?

Now the *Dobermanifesto* team needs to decide what route to take. After profiling their CPU usage and taking a look at the [pricing info](https://cloud.google.com/compute/pricing), they decided to go with a e2-standard-4 machine, which gave them almost 4x the increase in average throughput, but cheaper than the e2-standard-8 machines.

One of the nice things about moving to the larger machine is that it actually runs less frequently. It turns out that their machines were spending a lot of time staying awake, just to transfer data. With the new machine size, their instances had more downtime, allowing the load balancer to reduce the total number of instances on a daily basis. So on one hand, they ended up paying for a higher-grade machine, but on the other hand, they will use less core-hours on a monthly basis.

Once your performance directly impacts the bottom line, there's a lot of nuanced tradeoffs to consider.

## Use case 2: Google Cloud networking with internal IPs

In this next example, you'll use `iperf` to test throughput speed. You'll set up one machine as the server, and then point other machines to it and compare the results.

*Gecko Protocol*, a B2B company offering a custom, light-weight networking protocol built for gaming and other real-time graphics systems, were seeing lower-than-expected throughput for their backend machines which were responsible for transferring and transcoding large video & graphics files.

Here's the results of their baseline iperf test:

```apache
------------------------------------------------------------
Client connecting to 104.155.145.79, TCP port 5001 TCP window size: 45.0 KByte (default)
------------------------------------------------------------
[ 3] local 10.128.0.3 port 53504 connected with 104.155.145.79 port 5001 [ ID] Interval Transfer Bandwidth [ 3] 0.0-10.0 sec 1.03 GBytes 884 Mbits/sec
```

When duplicating the test, the network setup was identical, but the test results were quite different:

```apache
student-00-aafd1bd9c185@instance-2:~$ iperf -c 10.128.0.2
------------------------------------------------------------
Client connecting to 10.128.0.2, TCP port 5001
TCP window size: 45.0 KByte (default)
------------------------------------------------------------
[  3] local 10.128.0.3 port 38978 connected with 10.128.0.2 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.0 sec  2.27 GBytes  1.95 Gbits/sec
```

1.95GB / sec was much higher than what *Gecko Protocol* was seeing in their graphs. So what's going on?

Now recreate this scenario.

1. In the Console, SSH into `instance-1` and set up the iperf receiver:
    

```apache
iperf -s
```



**Example output:**

```apache
student-00-aafd1bd9c185@instance-1:~$ iperf -s
------------------------------------------------------------
Server listening on TCP port 5001
TCP window size: 128 KByte (default)
------------------------------------------------------------
```

2. SSH into `instance-2` and check the connection of the external IP address:
    

```apache
iperf -c <external ip address of instance-1>
```



**Example output:**

```apache
student-00-aafd1bd9c185@instance-2:~$ iperf -c 35.201.145.135
------------------------------------------------------------
Client connecting to 35.201.145.135, TCP port 5001
TCP window size: 45.0 KByte (default)
------------------------------------------------------------
[  3] local 10.40.0.8 port 58691 connected with 35.201.145.135 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.0 sec  1.36 GBytes  1.16 Gbits/sec
```

After further discussion with *Gecko Protocol*, it was learned that they were using *external* IPs to connect their machines, and the test used *internal* IPs. When the machines are in a network, connecting them with internal IPs will result in faster throughput.

3. Now check the connection with the internal address:
    

```apache
iperf -c <internal ip address of instance-1>
```



**Example output:**

```apache
student-00-aafd1bd9c185@instance-2:~$ iperf -c 10.40.0.5
------------------------------------------------------------
Client connecting to 10.40.0.5, TCP port 5001
TCP window size: 45.0 KByte (default)
------------------------------------------------------------
[  3] local 10.40.0.8 port 42950 connected with 10.40.0.5 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.0 sec  2.26 GBytes  1.94 Gbits/sec
```

Look at the two different Transfer and Bandwidth rates. In this example, changing to the internal IP address resulted in a .9 GBytes improvement in transfer rate, and .78 Gbits/sec improvement in bandwidth. You just proved that the internal connection is faster.

Building on what you learned from solving the *Dobermanifesto* problem, can the network speed be improved even more by using a larger machine? `instance-2` is only 1vCPU. How fast will the connection be if the machine is a little larger? Or a lot larger? Continue to test using the internal IP address (but feel free to test the external one, too, if you have time).

### 4 x vCPU machine

* SSH into `instance-3` and test the connection with the internal IP address:
    

```apache
iperf -c <internal ip address of instance-1>
```



**Example output (your results may differ):**

```apache
student-00-aafd1bd9c185@instance-3:~$ iperf -c 10.40.0.5
------------------------------------------------------------
Client connecting to 10.40.0.5, TCP port 5001
TCP window size: 45.0 KByte (default)
------------------------------------------------------------
[  3] local 10.40.0.6 port 39115 connected with 10.40.0.5 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.0 sec  4.53 GBytes  3.89 Gbits/sec
```

### 4 highCPU machine

* SSH into `instance-5` and test the connection with the internal IP address:
    

```apache
iperf -c <internal ip address of instance-1>
```



**Example output:**

```apache
student-00-aafd1bd9c185@instance-5:~$ iperf -c 10.40.0.5
------------------------------------------------------------
Client connecting to 10.40.0.5, TCP port 5001
TCP window size: 45.0 KByte (default)
------------------------------------------------------------
[  3] local 10.40.0.3 port 39736 connected with 10.40.0.5 port 5001
[ ID] Interval       Transfer     Bandwidth
[  3]  0.0-10.0 sec  10.3 GBytes  8.84 Gbits/sec
```

This really improves the throughput rate.

Looks like *Gecko Protocol* will also need to think about what size core will be best. This small debugging session resulted in their video and graphics data transfer improving by ~14x. Which is immense, considering their offering is built on performance backend services for high-performance compute scenarios.

## Task 3. Testing in your own environment

This lab doesn't cover how to test your own system, but here's additional information to take back with you. For more information on testing your own network, please read [Network Throughput Testing with iPerf](https://www.linode.com/docs/networking/diagnostics/diagnosing-network-speed-with-iperf).

If you have time and want to set up a VM to test, feel free. When you create your VMs, make sure to use the 'iperftest' firewall rule & tag. Test both your internal and external IP address.

### Settings for testing your own network speed

1. In the Console, go to **Navigation menu** &gt; **Networking** &gt; **VPC networks** &gt; **Firewall**.
    
2. Click on **Create firewall rule**. Use the following configuration to create a firewall rule:
    

| **Field** | **Value** | **Comments** |
| --- | --- | --- |
| Name | iperf-testing | New rule name |
| Targets | All instances in the network |  |
| Source IP ranges | 0.0.0.0/0 | We will open the firewall for any IP address from the Internet. |
| Direction of traffic | ingress |  |
| Action on match | Allow |  |
| Protocols and ports | tcp:5001; udp:5001 |  |

3. Click **Create**.
    

Click **Check my progress** to verify the objective.

Create the firewall rule

The tendency is to get the workload as close to 100% as possible, which leaves little space for the disk to defrag, etc.

90-93% if usage is healthy, but 98% usage will see performance go down since you'll end up with lots of contention.

When you're testing, if the IO performance decays, look at throttle counters. If they're not being throttled, look at cpu usage. If it's high, there's the problem.

## Task 4. If you have more time

In the lab interface, under Student Resources on the left-hand side, you'll see links to videos related to this lab. Very worth watching!

![The Student Resources sections with links to Compute Engine and the Egress Problem, and Internal IP vs External IP Performance](https://cdn.qwiklabs.com/ljTq6fUf03g%2Bi%2FX3eHU0WU0fdsT1u4myssx0gaq9KZI%3D align="left")

---

## Solution of Lab

%[https://youtu.be/YsrhpQP4Agw]