---
title: "Configure Secure RDP using a Windows Bastion Host: Challenge Lab - GSP303"
seoTitle: "Configure Secure RDP using a Windows Bastion Host: Challenge Lab - GSP"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Sun Aug 18 2024 13:29:50 GMT+0000 (Coordinated Universal Time)
cuid: clzzltgfw00010amg9o02d95b
slug: configure-secure-rdp-using-a-windows-bastion-host-challenge-lab-gsp303
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723984743027/1069af7c-71f0-4b98-9410-d94f8d1c9c5a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723987776505/7863a6fa-aac1-4472-9eb2-b25e516da660.png

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students preparing for the [Google Cloud Certified Professional Cloud Architect](https://cloud.google.com/certification/cloud-architect) certification exam. Are you up for the challenge?

## **Challenge scenario**

Your company has decided to deploy new application services in the cloud and your assignment is developing a secure framework for managing the Windows services that will be deployed. You will need to create a new VPC network environment for the secure production Windows servers.

Production servers must initially be completely isolated from external networks and cannot be directly accessed from, or be able to connect directly to, the internet. In order to configure and manage your first server in this environment, you will also need to deploy a bastion host, or jump box, that can be accessed from the internet using the Microsoft Remote Desktop Protocol (RDP). The bastion host should only be accessible via RDP from the internet, and should only be able to communicate with the other compute instances inside the VPC network using RDP.

Your company also has a monitoring system running from the default VPC network, so all compute instances must have a second network interface with an internal only connection to the default VPC network.

## **Your challenge**

Deploy the secure Windows machine that is not configured for external communication inside a new VPC subnet, then deploy the Microsoft Internet Information Server on that secure machine. For the purposes of this lab, all resources should be provisioned in the following region and zone:

* **Region**: `us-east4`
    
* **Zone**: `us-east4-c`
    

### Tasks

The key tasks are listed below. Good luck!

* Create a new VPC network with a single subnet.
    
* Create a firewall rule that allows external RDP traffic to the bastion host system.
    
* Deploy two Windows servers that are connected to both the VPC network and the default network.
    
* Create a virtual machine that points to the startup script.
    
* Configure a firewall rule to allow HTTP access to the virtual machine.
    

## **Task 1. Create the VPC network**

1. Create a new VPC network called `securenetwork`.
    

Click **Check my progress** to verify the objective.

Create the VPC network.

**Check my progress**

2. Create a new VPC subnet inside `securenetwork` in the `us-east4` region.
    

Click **Check my progress** to verify the objective.

Create the VPC subnet.

**Check my progress**

3. Once the network and subnet have been configured, configure a firewall rule that allows inbound RDP traffic (TCP port 3389) from the internet to the bastion host. This rule should be applied to the appropriate host using network tags.
    

Click **Check my progress** to verify the objective.

Create the firewall rule.

**Check my progress**

## **Task 2. Deploy your Windows instances and configure user passwords**

1. Deploy a Windows 2016 server (Server with Desktop Experience) instance called `vm-securehost` with two network interfaces in the `us-east4-c` zone.
    
    * Configure the first network interface with an internal only connection to the newly created VPC subnet.
        
    * The second network interface with an internal only connection to the default VPC network. This is the secure server.
        

Click **Check my progress** to verify the objective.

Create the `vm-securehost` instance.

**Check my progress**

2. Deploy a second Windows 2016 server (Server with Desktop Experience) instance called `vm-bastionhost` with two network interfaces in the `us-east4-c` zone.
    
    * Configure the first network interface to connect to the newly created VPC subnet with an ephemeral public (external NAT) address.
        
    * The second network interface with an internal only connection to the default VPC network. This is the jump box or bastion host.
        

Click **Check my progress** to verify the objective.

Create the `vm-bastionhost` instance.

**Check my progress**

### Configure user passwords

1. After your Windows instances have been created, create a user account and reset the Windows passwords in order to connect to each instance.
    

**NOTE:** Copy the User name and Password of both instances for later use.

2. The following `gcloud` command creates a new user called `app-admin` and resets the password for a host called `vm-bastionhost` located in the `us-east4-c` zone:
    

```apache
gcloud compute reset-windows-password vm-bastionhost --user app_admin --zone us-east4-c
```

Copied!content\_copy

3. The following `gcloud` command creates a new user called `app-admin` and resets the password for a host called `vm-securehost` located in the `us-east4-c` zone:
    

```apache
gcloud compute reset-windows-password vm-securehost --user app_admin --zone us-east4-c
```

Copied!content\_copy

* Alternatively, you can force a password reset from the Compute Engine console. You will have to repeat this for the second host as the login credentials for that instance will be different.
    

## **Task 3. Connect to the secure host and configure Internet Information Server**

1. To connect to the secure host, you have to RDP into the `bastion host` first. A Windows Compute Instance with an external address can be connected to via RDP using the RDP button that appears next to Windows Compute instances in the Compute Instance summary page.
    
2. Once you are connected to the bastion host using RDP session then open a new RDP session inside the `bastion host` to connect to the internal private network address of the `secure host`.
    
3. When connected to a Windows server, you can launch the Microsoft RDP client using the command `mstsc.exe`, or you can search for `Remote Desktop Manager` from the Start menu. This will allow you to connect from the bastion host to other compute instances on the same VPC even if those instances do not have a direct internet connection themselves.
    

Once you connect to the `vm-securehost` machine through RDP then configure Internet Information Server.

4. Once you log in to the vm-securehost machine, Open the Server Management window. And `Configure the local server` to Add **roles and features**.
    
5. Use the `Role-based or feature-based installation` to add the `Web Server (IIS)` role.
    

Click **Check my progress** to verify the objective.

Configure the IIS web server software.

**Check my progress**

## **Troubleshooting**

* **Unable to connect to the Bastion host:** Make sure you are attempting to connect to the external address of the bastion host. If the address is correct you may not be able to connect to the bastion host if the firewall rule is not correctly configured to allow TCP port 3389 (RDP) traffic from the internet, or your own system's public IP-address, to the network interface on the bastion host that has an external address. Finally, you might have issues connecting via RDP if your own network does not allow access to internet addresses via RDP. If everything else is definitely OK, you will need to talk to the owner of the network you are connected to the internet with to open up port 3389 or connect using a different network.
    
* **Unable to connect to the Secure Host from the Bastion host:** If you can successfully connect to the bastion host but are unable to make the internal RDP connection using Microsoft Remote Desktop Connection application, check that both instances are connected to the same VPC network.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=r-AAmfh-eVw] 

Click Activate Cloud **Shell Activate Cloud Shell** icon at the top of the Google Cloud console.

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723984920517/ef4b6ff6-fd63-4448-9db4-4df5ad66e2f9.png align="center")

```apache
REGION="${ZONE%-*}"
gcloud compute networks create securenetwork --project=$DEVSHELL_PROJECT_ID --subnet-mode=custom --mtu=1460 --bgp-routing-mode=regional && gcloud compute networks subnets create securenetwork-subnet --project=$DEVSHELL_PROJECT_ID --range=10.0.0.0/24 --stack-type=IPV4_ONLY --network=securenetwork --region=$REGION
gcloud compute --project=$DEVSHELL_PROJECT_ID firewall-rules create secuer-firewall --direction=INGRESS --priority=1000 --network=securenetwork --action=ALLOW --rules=tcp:3389 --source-ranges=0.0.0.0/0 --target-tags=allow-rdp-traffic
gcloud compute instances create vm-securehost --project=$DEVSHELL_PROJECT_ID --zone=$ZONE --machine-type=e2-small --network-interface=stack-type=IPV4_ONLY,subnet=securenetwork-subnet,no-address --network-interface=stack-type=IPV4_ONLY,subnet=default,no-address --metadata=enable-oslogin=true --maintenance-policy=MIGRATE --provisioning-model=STANDARD --tags=allow-rdp-traffic --create-disk=auto-delete=yes,boot=yes,device-name=vm-securehost,image=projects/windows-cloud/global/images/windows-server-2016-dc-v20230510,mode=rw,size=150,type=projects/$DEVSHELL_PROJECT_ID/zones/$ZONE/diskTypes/pd-standard --no-shielded-secure-boot --shielded-vtpm --shielded-integrity-monitoring --labels=goog-ec-src=vm_add-gcloud --reservation-affinity=any
gcloud compute instances create vm-bastionhost --project=$DEVSHELL_PROJECT_ID --zone=$ZONE --machine-type=e2-standard-2 --network-interface=subnet=securenetwork-subnet --network-interface=subnet=default,no-address --tags=allow-rdp-traffic --image=projects/windows-cloud/global/images/windows-server-2016-dc-v20220513
```

### Reset the password of vm-bastionhost

```apache
gcloud compute reset-windows-password vm-securehost --user app_admin --zone $ZONE --quiet
```