---
title: "Connecting Cloud Networks with NCC: Challenge Lab - GSP528"
seoTitle: "Connecting Cloud Networks with NCC: Challenge Lab - GSP528"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-08-13T08:40:34.167Z
cuid: cmsr9q1re00020ag74xxzgwoh
slug: connecting-cloud-networks-with-ncc-challenge-lab-gsp528
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/40d1fa6c-1af3-4d9c-8121-5c329182734e.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/a51a0598-ce75-45c7-bf44-2a5a83447a31.png
tags: connecting-cloud-networks-with-ncc-challenge-lab-gsp528, connecting-cloud-networks-with-ncc-challenge-lab, gsp528

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Connecting Cloud Networks with NCC](https://www.skills.google/course_templates/1364) course. Are you ready for the challenge?

### Scenario

You are a lead network architect at a large, distributed enterprise, GlobalTech Inc.This multinational corporation has a significant on-premises infrastructure spanning data centers in North America (HQ - New York) and Europe (EMEA - London). GlobalTech Inc. is in the process of a major cloud transformation, migrating many applications and services to Google Cloud while maintaining a hybrid environment for critical legacy systems and data residency requirements.

The current connectivity solution involves a complex mesh of VPN tunnels and dedicated interconnects, which has become difficult to manage and scale. The company is looking to simplify their network architecture and leverage NCC for its centralized connectivity management capabilities.

In this lab you'll use the Network Connectivity Center to connect cloud and on-prem networks. For this lab you have several resources provided:

![lab resources diagram](https://cdn.qwiklabs.com/f%2FrYkUz2QOROG4tS2AolpxthW2GglI3KQRCq4QYjKIA%3D align="center")

You will use NCC to make several network connections that, in the end, will look like the diagram below:

![lab resources with task numbers diagram](https://cdn.qwiklabs.com/vQ4dtySymq6rjFR%2BINu1D69W38uFYqwLf6Hxar5awlw%3D align="center")

## **Task 1. Connect 2 On-prem VPCs with NCC**

GlobalTech has two on-premises data centers, and the connection between them needs to be simplified. Connect On-Prem Office 1 and On-Prem Office 2 using NCC, then test the connectivity.

1.  Establish a **Hub-and-Spoke** architecture where the central hub connects to two spokes, each representing a separate on-premises data center.
    
    *   Begin by creating a Network Connectivity Center hub to serve as the central point of connection.
        
    *   Each on-prem VPC connects to the routing VPC using a pair of preconfigured VPN tunnels — these will be used to define the spoke connections.
        
2.  Navigate to **Network Connectivity** page on your console and review the preconfigured VPN tunnels designed for each on-premises network.
    
3.  The spoke corresponding to On-Prem Office 1 must have **office-1** included in its name, and the spoke for On-Prem Office 2 must include **office-2** in its name.
    
4.  Once the spokes are connected to the hub through VPN tunnels, ensuring secure site-to-site communication and the setup is complete, test the connectivity by verifying network communication between VM instances deployed in each of the on-prem offices, routed through the NCC hub.
    

Click **Check my progress** to verify the objective.

Connect two On-prem VPCs with NCC.

## **Task 2. Connect VPC to VPC**

GlobalTech needs to connect 2 VPCs so both has access to a services that is running on one of the VPCs. Connect Workload VPC 1 and Workload VPC 2 using NCC, then test the connectivity.

1.  Implement a **Hub-and-Spoke** topology, where each workload VPC is attached as a spoke of type VPC network, connected to a central NCC hub.
    
2.  The spoke corresponding to Workload VPC 1 must have **workload-1** included in its name, and the spoke for Workload VPC 2 must include **workload-2** in its name.
    
3.  Upon completion, validate the setup by testing connectivity between the two VPCs by verifying network communication between VM instances deployed in each of the workload VPCs, routed through the NCC hub.
    

Click **Check my progress** to verify the objective.

## **Task 3. Connect VPC to On-prem**

GlobalTech is migrating an application to a cloud VPC, but the application will still need to securely access a legacy database in the on-prem data center. Connect the On-Prem Office 1 and Workload VPC 1 using NCC, then test the connectivity.

1.  Configure a **Hub-and-Spoke** architecture, where the spokes for both On-Prem Office 1 and Workload VPC 1 are of type VPC network—both connected to a central NCC hub.
    
2.  The spokes corresponding to both On-Prem Office 1 and Workload VPC 1 must have **hybrid** included in their names.
    
3.  Lastly, validate the setup by testing connectivity between the On-Prem Office and Workload VPC by verifying network communication between VM instances deployed in each of the networks, routed through the NCC hub.
    

Click **Check my progress** to verify the objective.

* * *

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP528/lab.sh
source lab.sh
```

### Other Alternative

%[https://www.youtube.com/watch?v=M69wXyshfLw] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP528/other.sh
source other.sh
```

**Script Alternative**

```plaintext
curl -LO https://raw.githubusercontent.com/manavyugai/Cloud-Monitoring/main/Connecting%20Cloud%20Networks%20with%20NCC%3A%20Challenge%20Lab/Prince.sh
sudo chmod +x Prince.sh
./Prince.sh
```

* * *

### Manual

%[https://www.youtube.com/watch?v=Jeman_2cLFQ] 

%[https://www.youtube.com/watch?v=w4fT1P-JvSc]