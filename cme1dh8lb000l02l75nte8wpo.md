---
title: "A Tour of Cloud Networking - GSP1211"
seoTitle: "A Tour of Cloud Networking - GSP1211"
seoDescription: "Explore Google Cloud Networking's key features: VPCs, network services, security, observability, with hands-on exercises"
datePublished: Thu Aug 07 2025 12:27:48 GMT+0000 (Coordinated Universal Time)
cuid: cme1dh8lb000l02l75nte8wpo
slug: a-tour-of-cloud-networking-gsp1211
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754569492664/568f3c46-35b5-4db0-9a43-68b1b06dfb13.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1754569643433/7e072ccb-7a9b-42fa-bc4a-04484148bc80.png
tags: a-tour-of-cloud-networking-gsp1211, a-tour-of-cloud-networking, gsp1211

---

## Overview

Google has a planet-scale, advanced, fiber-optic software-defined network with presence in over 200 countries and territories. This network provides services such as Search, Maps, YouTube, Google Cloud and more to billions of users and customers.

There are six Google Cloud building blocks of cloud networking. By grouping the network functions into six building blocks (Network connectivity, Network security, Service Networking, Service security, Content delivery, Observability) we can conceptualize the Google Cloud networking services that help us achieve the requirements we are trying to address.

If you are new to cloud computing or looking for an overview of Google Cloud networking, you are in the right place. Read on to learn about the specifics of this lab and additional next steps to get hands-on practice.

### What you'll learn

In this lab, you will learn about the following:

* Virtual Private Cloud (VPC) network
    
* Network services
    
* Network connectivity
    
* Networking security
    
* Network Observability
    
* Network Service Tiers
    
* Cross-Cloud Network
    

## Lab fundamentals

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### Understanding Regions and Zones

Certain Compute Engine resources live in regions or zones. A region is a specific geographical location where you can run your resources. Each region has one or more zones. For example, the us-central1 region denotes a region in the Central United States that has zones `us-central1-a`, `us-central1-b`, `us-central1-c`, and `us-central1-f`.

| **Regions** | **Zones** |
| --- | --- |
| Western US | us-west1-a, us-west1-b |
| Central US | us-central1-a, us-central1-b, us-central1-d, us-central1-f |
| Eastern US | us-east1-b, us-east1-c, us-east1-d |
| Western Europe | europe-west1-b, europe-west1-c, europe-west1-d |
| Eastern Asia | asia-east1-a, asia-east1-b, asia-east1-c |

Resources that live in a zone are referred to as zonal resources. Virtual machine Instances and persistent disks live in a zone. To attach a persistent disk to a virtual machine instance, both resources must be in the same zone. Similarly, if you want to assign a static IP address to an instance, the instance must be in the same region as the static IP.

Learn more about regions and zones and see a complete list in the Compute Engine page, [Regions and zones documentation](https://cloud.google.com/compute/docs/regions-zones/)).

## Task 1. Networking Overview

Google Cloud networking is a comprehensive suite of networking services to enable businesses to build, scale, and manage secure and scalable network infrastructure in Google Cloud.

Google's global network also supports AI workloads for both managed and Do it Yourself options, with advanced capabilities such as protective reroute and specialized datacenters networking with support for Remote Direct Memory Access (RDMA). The Google Cloud network is continually evolving and the diagram below shows a visual representation of the [network scale](https://cloud.google.com/about/locations)

* ![Google Cloud Network](https://cdn.qwiklabs.com/Sn90BF%2F%2Blq918i9TEhYQMxEjVk14wktypTtmqY0hekQ%3D align="left")
    

**The network consists of:**

* [Region](https://cloud.google.com/compute/docs/regions-zones#identifying_a_region_or_zone) - Geographical location.
    
* [Zones](https://cloud.google.com/compute/docs/regions-zones#identifying_a_region_or_zone) - Interconnected deployment centers within a region. Currently a region comprises a minimum of three zones.
    
* [Point of presence](https://peering.google.com/#/infrastructure) (PoP) - Connects public internet to Google Cloud. Provides services like Cloud CDN, Media CDN, and Cloud Interconnect.
    

Google Cloud provides a wide range of products and services that address all aspects of networking, from basic connectivity to advanced traffic management and security.

**To learn more about Google's global network flexibility and scalability, take 3 minutes to view the following video.**

Over the course of this lab, you will learn what some of these products provide and how they can be integrated into your solution.

## Task 2. Understand Virtual Private Cloud (VPC)

Google Cloud's Virtual Private Cloud (VPC) is a foundational component of Google Cloud's networking infrastructure. It allows you to create a logically isolated virtual network within the Google Cloud, providing a private and secure environment for your cloud resources. You can define your own IP address space, subnetworks, and routing policies, giving you complete control over your network connectivity.

**To learn more about Virtual Private Cloud, take a minute to view the following video.**

**Key features of Google Cloud's VPC:**

* **Private IP address space**: Define your own private IP address range, ensuring no overlap with other networks.
    
* **Subnetwork**: Divide your VPC into multiple subnets to organize and segment your network resources.
    
* **Customizable routing**: Control how traffic flows within your VPC and between VPCs.
    
* **Firewall rules**: Define firewall rules to filter incoming and outgoing traffic, enhancing network security.
    

**Example use cases of Google Cloud's VPC:**

* **Hosting web applications and services**: Create a VPC to isolate your web applications from other resources and the public internet, enhancing security and performance.
    
* **Deploying microservices-based architectures**: Utilize VPCs to segment microservices and manage traffic flow between them, enabling scalability and flexibility.
    
* **Connecting on-premises networks**: Establish secure connections between your on-premises network and Google Cloud resources via Cloud VPN, or Cloud Interconnect enabling hybrid cloud deployments.
    
* **Creating a secure cloud environment for sensitive data**: Leverage VPCs to isolate and protect sensitive data from unauthorized access, ensuring data privacy and compliance.
    
* **Running AI workloads:** VPCs with [network profiles](https://cloud.google.com/vpc/docs/network-profiles) allow you to utilize RDMA over converger ethernet for [high performance GPU VMs](https://cloud.google.com/compute/docs/accelerator-optimized-machines#a4x-vms) like the A3 ultra, A4 and A4X. This RDMA profile creates an isolated VPC used specifically for GPU to GPU communication between nodes.
    

Google Cloud's VPC provides a powerful and flexible foundation for building and managing secure, scalable, and performant network infrastructure in the cloud.

### Test your understanding

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

Question 1:

Which feature of Google Cloud's VPC allows you to define your own private IP address range, ensuring no overlap with other networks?Private IP address spaceFirewall rulesSubnetworkCustomizable routing

Question 2:

Which feature of Google Cloud's VPC enables you to divide your VPC into multiple subnets to organize and segment your network resources?Private IP address spaceSubnetworkCustomizable routingFirewall rules

Question 3:

Which feature of Google Cloud's VPC provides control over how traffic flows within your VPC and between VPCs?Customizable routingSubnet hierarchyPrivate IP address spaceFirewall rules

Question 4:

Which VPC configuration allows you to use RDMA for GPU communicationHybrid VPCNetwork profilesAuto modeStandard VPC

## Task 3. Network services

Google Cloud networking offers a suite of network services that empower users to effectively control and optimize their network infrastructure. Some of these include:

* [Cloud Load Balancing](https://cloud.google.com/load-balancing?hl=en): Distribute incoming traffic across multiple instances of an application or service, ensuring high availability and scalability.
    
* [Cloud DNS](https://cloud.google.com/dns?hl=en): Translate domain names into IP addresses, enabling users to access websites and services seamlessly.
    
* [Cloud CDN](https://cloud.google.com/cdn?hl=en#section-1): Accelerate content delivery to users worldwide by caching content in edge locations close to their devices.
    
* [Cloud NAT](https://cloud.google.com/nat): Enable instances within a private network to access the internet without requiring public IP addresses, enhancing security and simplifying network management. Cloud NAT also supports [Private NAT](https://cloud.google.com/nat/docs/private-nat) capabilities.
    

These tools empower businesses to optimize network performance, improve user experience, and enhance overall network security within the Google Cloud.

### Test your understanding

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

Question 1:

Which Google Cloud network service distributes incoming traffic across multiple instances of an application or service to ensure high availability and scalability?Cloud DNSCloud NATCloud Load BalancingCloud CDN

Question 2:

Which Google Cloud network service translates domain names into IP addresses, enabling users to access websites and services seamlessly?Cloud DNSCloud NATCloud Load BalancingCloud CDN

Question 3:

Which Google Cloud network service accelerates content delivery to users worldwide by caching content in edge locations close to their devices?Cloud CDNCloud DNSCloud Load BalancingCloud NAT

## Task 4. Network connectivity

Google Cloud's network connectivity solutions enable seamless connections between on-premises networks, cloud resources, and other cloud providers. These solutions include:

* [Cloud VPN](https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview): Establish secure encrypted connections between VPCs or between external networks and VPCs, enabling hybrid cloud deployments.
    
* [Cloud Interconnect](https://cloud.google.com/network-connectivity/docs/interconnect/concepts/overview): Provide high-bandwidth, low-latency connectivity between on-premises networks and VPCs, ideal for mission-critical applications.
    
* [Cross-Cloud Interconnect](https://cloud.google.com/network-connectivity/docs/interconnect/concepts/cci-overview): Provides direct, high-bandwidth, low-latency connectivity between Google Cloud and other cloud providers.
    
* [Cloud WAN](https://services.google.com/fh/files/misc/cloud_wan_solution_overview.pdf): Provides a managed networking service that uses Google's private global backbone to build a single, unified wide area network connecting your on-premises data centers, branch offices, and cloud resources.
    
* [Network Connectivity Center](https://cloud.google.com/network-connectivity-center?hl=en): Centralized logical hub for managing and monitoring connection with support for [hybrid spokes](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/overview#hybrid_spokes) and [VPC spokes.](https://cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/overview#vpc-spokes)
    

These connectivity solutions empower businesses to extend their existing networks to the cloud, achieve high-performance data transfers, and build complex hybrid and multicloud architectures.

### Test your understanding

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

Question 1:

Which Google Cloud network connectivity solution establishes secure encrypted connections between on-premises networks and VPCs, enabling hybrid cloud deployments?Cloud InterconnectCloud RouterNone of the aboveCloud VPN

Question 2:

Which Google Cloud network connectivity solution provides high-bandwidth, low-latency connectivity between on-premises networks and VPCs, ideal for mission-critical applications?Cloud VPNNone of the aboveCloud RouterCloud Interconnect

## Task 5. Network security

Google Cloud network security solutions provide comprehensive protection against network threats and vulnerabilities. These solutions include:

* [Cloud Armor](https://cloud.google.com/security/products/armor?hl=en): Safeguard applications and websites against denial-of-service (DoS) attacks, OWASP top 10 and other malicious traffic.
    
* [Secure Web Proxy](https://cloud.google.com/secure-web-proxy/docs/overview) (SWP): Monitor and secure egress web traffic to help protect cloud workloads.
    
* [Cloud NGFW](https://cloud.google.com/security/products/firewall?hl=en&e=48754805): Define firewall rules to control incoming and outgoing traffic, preventing unauthorized access and protecting against cyberattacks. This also provides advanced capabilities such as [Intrusion Prevention System](https://cloud.google.com/firewall/docs/about-intrusion-prevention) (IPS) for the Cloud NGFW Enterprise editions.
    
* [Network Security Integration](https://cloud.google.com/network-security-integration/docs/nsi-overview): Network Security Integration service allows for the seamless integration of third-party network security appliances into your Virtual Private Cloud (VPC) network to provide enhanced visibility and protection without altering existing routing policies.
    

These security solutions empower businesses to enhance network security, protect sensitive data, and ensure compliance with industry standards.

To learn more about **Cloud NGFW**, take a few minutes to view the following video.

### Test your understanding

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

Question 1:

Which Google Cloud network security solution safeguards applications and websites against denial-of-service (DoS) attacks and other malicious traffic?None of the aboveCloud IDSCloud FirewallCloud Armor

Question 2:

Which Google Cloud network security solution continuously monitors network traffic for suspicious activity, enabling early detection of potential threats?Cloud ArmorCloud IDSNone of the aboveCloud Firewall

## Task 6. Explore network observability

Google Cloud's [Network Intelligence Center](https://cloud.google.com/network-intelligence-center?hl=en) provides a comprehensive suite of tools for monitoring, troubleshooting, and optimizing your network performance. These tools include:

* [Network Topology](https://cloud.google.com/network-intelligence-center/docs/network-topology/concepts/overview): Visualize the topology of your Virtual Private Cloud (VPC) networks and their associated metrics, enabling you to identify and resolve connectivity issues.
    
* [Connectivity Tests](https://cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/overview): Test network connectivity to and from your VPC network, ensuring that your network is functioning properly and that your resources are accessible.
    
* [Performance Dashboard](https://cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/overview): Monitor and visualize the performance of your Google Cloud network and resources.
    
* [Firewall Insights](https://cloud.google.com/network-intelligence-center/docs/firewall-insights/concepts/overview): Gain insights into firewall rules usage, identify misconfigurations, and optimize your firewall rules to improve security and performance.
    
* [Network Analyzer](https://cloud.google.com/network-intelligence-center/docs/network-analyzer/overview): Monitor network traffic and identify potential issues, such as high latency, packet loss, and routing problems.
    
* [Flow Analyzer](https://cloud.google.com/network-intelligence-center/docs/flow-analyzer/overview): Analyze your VPC Flow Logs with opinionated network traffic analysis with 5-tuple granularity (source IP, destination IP, source port, destination port, and protocol) to optimize for security, compliance, performance and cost.
    

These network intelligence tools empower businesses to proactively identify and resolve network issues, maintain network performance, and enhance overall network health.

### Test your understanding

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

Question 1:

Which Network Intelligence Center tool enables you to visualize the topology of your Virtual Private Cloud (VPC) networks and their associated metrics?Connectivity testFirewall InsightsNetwork AnalyzerNetwork Topology

Question 2:

Which Network Intelligence Center tool enables you to test network connectivity to and from your VPC network?Network TopologyNetwork AnalyzerFirewall InsightsConnectivity test

Question 3:

Which Network Intelligence Center tool enables you to analyze your VPC Flow Logs?Flow AnalyzerNetwork AnalyzerFirewall InsightsNetwork Topology

## Task 7. Network Service Tiers

Google Cloud offers two [Network Service Tiers](https://cloud.google.com/network-tiers/docs/overview), Premium Tier and Standard Tier, catering to different performance, availability, and cost requirements.

[Premium Tier](https://cloud.google.com/network-tiers#tab1):

* Global network with low latency: Leverage Google's high-performance global network for global reach and consistent performance by ensuring traffic to an internet user enters and exits Google's network as closely as possible to the user.
    
* High availability and scalability: Ensure continuous availability and seamless scaling for mission-critical applications.
    
* Ideal for production workloads and demanding applications.
    

[Standard Tier](https://cloud.google.com/network-tiers#tab2):

* Regional network with cost-effectiveness: Utilize a regional network with lower costs for less demanding workloads by routing traffic to an internet user to a peering or transit network as closely as possible to the Google Cloud region.
    
* Suitable for development, testing, and non-production environments.
    
* Choose Standard Tier for cost-sensitive scenarios.
    

### Test your understanding

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

Question 1:

Which Network Service Tier provides a global network with low latency, high availability and scalability, making it ideal for production workloads and demanding applications?Premium and Standard TiersStandard TierPremium Tier

Question 2:

Which Network Service Tier utilizes a regional network with lower costs, making it suitable for development, testing, and non-production environments?Premium TierStandard TierPremium and Standard Tiers

## Task 8. Cross-Cloud Network

Cross-Cloud Network is a global network platform that is open, secure, and optimized for applications and users across on-prem and clouds. It uses Google Cloud's planet-scale network for multicloud connectivity and to secure applications and users.

Cross-Cloud Network is a solution that breaks down barriers between Google Cloud, other cloud providers and your own data centers, giving you the ability to design applications that run anywhere. It harnesses Google Cloud's massive global network and services to deliver connectivity and security across all your environments.

Common use cases are:

* [**Building distributed applications**](https://services.google.com/fh/files/misc/cross_cloud_network_solution_overview.pdf) - Customers can easily connect services from various clouds and private data centers with advanced products such as Cross-Cloud Interconnect, Private Service Connect, and Network Connectivity Center.
    
* [**Internet facing application and content delivery**](https://services.google.com/fh/files/misc/gfe_solution_brief.pdf) - Cross-Cloud Network leverages Google Cloud's extensive Global Front End, combining Cloud Load Balancer, Cloud Armor, and Cloud CDN to ensure optimal performance, security, and user experience. Cross-Cloud Interconnect can be used to connect clouds together, and lower total cost of ownership (TCO)
    
* [**Cloud WAN**](https://services.google.com/fh/files/misc/cross_cloud_network_solution_deep_dive.pdf) - Cloud WAN is a managed solution that allows users to utilize the Google Cloud global backbone to connect their sites and services. There are several configurations that support SD-WAN appliances, security service edge (SSE), Network Connectivity Center and layer 2 connections via [Cross-Site Interconnect](https://cloud.google.com/network-connectivity/docs/interconnect/concepts/cross-site-overview).
    

---

## Solution of Lab

%[https://youtu.be/ITqrbq8LoFY] 

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">You don't need to perform this lab, just spend more then <mark>3 minutes</mark> to completed</div>
</div>