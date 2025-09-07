---
title: "Securing Virtual Machines using Chrome Enterprise Premium - GSP1036"
seoTitle: "Securing Virtual Machines using Chrome Enterprise Premium - GSP1036"
seoDescription: "Secure your VMs with Chrome Enterprise Premium using IAP TCP for seamless, secure administrative access to instances without external IPs"
datePublished: Sun Sep 07 2025 07:33:08 GMT+0000 (Coordinated Universal Time)
cuid: cmf9dlpkb000d02lb4maa1s5x
slug: securing-virtual-machines-using-chrome-enterprise-premium-gsp1036
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757230357246/3f5e84aa-08ed-438c-96c0-3cab917e4de4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757230366117/40c8cb4b-f417-48ce-a111-b219e159d782.png
tags: securing-virtual-machines-using-chrome-enterprise-premium-gsp1036, securing-virtual-machines-using-chrome-enterprise-premium, gsp1036, securing-virtual-machines, chrome-enterprise-premium

---

## Overview

In this lab, you learn how to use Chrome Enterprise Premium and Identity-Aware Proxy (IAP) TCP forwarding to enable administrative access to VM instances that do not have external IP addresses or do not permit direct access over the internet.

### What you'll learn

* Enable IAP TCP forwarding in your Google Cloud project
    
* Test connectivity to your Linux and Windows instances
    
* Configure the required firewall rules for BCE
    
* Grant permissions to use IAP TCP forwarding
    
* Demonstrate tunneling using SSH and RDP connections
    

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
    student-04-6a89c14d95e7@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    BIR4Ue6wHT6x
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

You need a RDP client pre-installed so that you can connect and test Windows instances.

## Task 1. Enable IAP TCP forwarding in your Google Cloud project

1. Open the **Navigation Menu** and select **APIs and Services &gt; Library.**
    
2. Search for **IAP** and select **Cloud Identity-Aware Proxy API.**
    
3. Click **Enable.**
    

![Cloud Identity-Aware Proxy API](https://cdn.qwiklabs.com/frFS%2FFAb%2FOnrEw6JvbOul9inaWHcjGCINDlXIf23S84%3D align="left")

## Task 2. Create Linux and Windows instances

Create three instances for this lab: - Two for demonstration purposes (Linux and Windows) - One for testing connectivity (Windows)

### Linux instance

1. From the **Navigation Menu** and select **Compute Engine** &gt; **VM instances**.
    
2. Click **Create instance**.
    
3. In the **Machine configuration**:
    
    Select the following values:
    
    * Name: **linux-iap**
        
    * Zone: `us-east4-a`
        
4. Click **Networking**.
    
    For **Network interfaces**, click the **default** network dropdown to edit. Then change the External IPV4 address to **None**.
    
5. Click **Done**.
    
    ![network interface filled out](https://cdn.qwiklabs.com/EYBOeI1oHeH6by7DMvWUi4aZqNj0CNGIPJj89%2BPpRvo%3D align="left")
    
6. Then click **create**. This VM will be referred to as **linux-iap**
    

### Windows instances

1. To create the **Windows Demo VM** click **Create instance**.
    
2. In the **Machine configuration**:
    
    Select the following values:
    
    * Name: **windows-iap**
        
    * Zone: `us-east4-a`
        
3. Click **OS and Storage** section.
    
    Click **Change** to begin configuring your boot disk and select the following values:
    
    * Public Images **\&gt;** Operating system **\&gt;** Windows Server
        
    * Version **\&gt;** Windows Server 2016 Datacenter
        
    
    ![Windows Version Select](https://cdn.qwiklabs.com/zWBJlzl8Q5W%2BawOogvBjDqGR6do%2FANerOjcULzqwnKc%3D align="left")
    
    Click **Select**.
    
4. Click **Networking**.
    
    For **Network interfaces**, click the **default** network dropdown to edit. Then change the External IPV4 address to **None**. Click **Done**.
    
5. Then click **create**. This VM will be referred to as **windows-iap**
    
6. To create the **Windows Connectivity VM**, click **Create instance**.
    
7. In the **Machine configuration**:
    
    Select the following values:
    
    * Name: **windows-connectivity**
        
    * Zone: `us-east4-a`
        
8. Click **OS and Storage** section, click on **Change**
    
    For the OS, set the following on the **Custom Images** tab:
    
    * Source project for images: `Qwiklabs Resources`
        
    * Image: `iap-desktop-v001`
        
    
    Click **Select**.
    
9. Click **Security**.
    
    In the **Access scopes** section, select **Allow full access to all Cloud APIs**.
    
    **Do not** disable external IP for this instance
    
10. Then click **create**. This VM will be referred to as **windows-connectivity**
    

Check if all 3 instances have been created

## Task 3. Test connectivity to your Linux and Windows instances

1. After the instances are created, You will test access to **linux-iap** and **windows-iap** to ensure that you aren’t able to access the VMs without the external IP.
    
2. For **linux-iap** click on the SSH button to get into the machine and ensure you get a message similar to the following.
    
    ![linux connection failed](https://cdn.qwiklabs.com/BUgJZz42%2Blh5BOfztdxaIGNOxuSJzrhM5nOLdeBbhTw%3D align="left")
    

**Note:** The **SSH** button may still appear as clickable on the VM list page despite External IPv4 being set to None. You can confirm that the instance does not have an External IP by clicking the instance name, and then hovering on the SSH button on the details page, which displays a message: *This instance does not have an external IP address.*

4. For **windows-iap:** click the RDP button and ensure you get a message similar to the following:
    
    ![windows connection failed](https://cdn.qwiklabs.com/PlKmkge46380esSm%2BHO%2BkYmuukGqLzGGfnj1Y9LX78Y%3D align="left")
    

The following steps for configuring and using IAP will allow you to connect to the instances that don’t have external IPs.

## Task 4. Configure the required firewall rules for BCE

1. Open the **Navigation Menu** and select **VPC Network &gt; Firewall** and click **Create Firewall Rule**
    
2. Configure the following settings:
    

| **Field** | **Setting** |
| --- | --- |
| Name | **allow-ingress-from-iap** |
| Direction of traffic | **Ingress** |
| Target | **All instances in the network** |
| Source filter | **IPv4 Ranges** |
| Source IPv4 Ranges | **35.235.240.0/20** |
| Protocols and ports | **Select TCP and enter 22, 3389** to allow both SSH and RDP respectively |

3. Click **CREATE** to create the firewall rule.
    

Check proper firewall rules have been created.

## Task 5. Grant permissions to use IAP TCP forwarding

Use the following steps to configure the iap.tunnelResourceAccessor role by VM.

1. Open **Navigation Menu** and select **Security &gt; Identity-Aware Proxy**, switch to the **SSH and TCP Resources** tab (safely ignore the Oauth Consent screen error in the HTTPS section).
    
2. Select the **linux-iap** and **windows-iap** VM instances.
    
3. Click **Add principal**, then enter in the service account associated with your **Windows connectivity** VM. This should be of the form `595077367615`\-compute@developer.gserviceaccount.com.
    
4. Select **Cloud IAP &gt; IAP-Secured Tunnel User** for the role.
    
5. Click **SAVE**.
    
6. From the top-right of the page click the "S" icon to open your profile and copy the email of the student account.
    
7. Click **Add principal** again to add your student account.
    
8. Enter in the **student account**. You can copy this value from the lab details pane.
    
9. Select **Cloud IAP &gt; IAP-Secured Tunnel User** for the role.
    
10. Click **SAVE**.
    

The IAP-Secured Tunnel User role will grant the windows-connectivity instance to connect to resources using IAP. Adding the student account will help verify the step was done correctly.

  

![Add Principals](https://cdn.qwiklabs.com/AGyfsxvO5f%2F5dsiIKH%2F%2FT8gjoa1OiStOAiej1dwXvAM%3D align="left")

Check that IAM roles have been set for the service account.

## Task 6. Use IAP Desktop to connect to the Windows and Linux instances

It is possible to use IAP Desktop to connect to instances using a graphical user interface from an instance with Windows Desktop. You can read more about [IAP Desktop](https://github.com/GoogleCloudPlatform/iap-desktop) on the GitHub repository hosting the download for the tool.

To use IAP Desktop to connect to the instances in this lab:

1. RDP to the `windows-connectivity` instance by downloading the RDP file. Go to the **Compute Engine &gt; VM Instances** page. Select the down arrow next to the **windows-connectivity** instance on the Compute Engine landing page and download the file.
    
2. Open the RDP file to connect to the instance via Remote Desktop Protocol. You will use the credentials below to connect to the instance once prompted:
    
    * Username: student
        
    * Password: Learn123!
        
3. Once connected to the **windows-connectivity** instance, locate and open the IAP Desktop application on the desktop of the instance.
    
4. Once the application opens, click on the sign in with Google button to log in. Use the username and password provided in the lab console to authenticate with **IAP Desktop**. When you're prompted to continue, click **Continue**, and click **Allow**.
    

![oauth_permissions.png](https://cdn.qwiklabs.com/baaXjwl0b%2F1FmVU%2FnMq45yhcOs9jlpth8H1SGV%2B1wwk%3D align="left")

5. You will need to add the project to connect to Compute Engine instances within IAP Desktop after authentication. Select the lab project associated with your lab instance:
    

![add_project.png](https://cdn.qwiklabs.com/pFRf3EjFJqgsJ58BPCTRpu2Eb7yIMuQtKmRiZ6PKzIU%3D align="left")

6. Double click on the **windows-iap** instance in the IAP Desktop application to log into the instance.
    
7. You may be prompted to provide credentials for the instance the first time you try to connect to it through IAP Desktop. Select "Generate new credentials" the first time logging into the instance.
    

![credentials.png](https://cdn.qwiklabs.com/Aq6XFqrQc%2BFkFpnS%2BBKC0Hmy5se%2F6vzDHAGFJGUTyvk%3D align="left")

8. Click *OK* for **Generate logon credentials** popup.
    
9. After the credentials are created you will be taken to the desktop of the `windows-iap` instance and can see the end user experience.
    

![windows_iap.png](https://cdn.qwiklabs.com/qI5Xc6iGs85ZuoxPle32U38JN9P0%2FZB4VuBogVMjPp4%3D align="left")

## Task 7. Demonstrate tunneling using SSH and RDP connections

1. You will test connectivity to the RDP instance using an RDP client. This is because you need to connect to the instance via an IAP tunnel locally.
    
2. Go to the **Compute Engine &gt; VM Instances** page.
    
3. For the **windows-connectivity** instance click the down arrow and select **Set windows password**. Copy the password and save it.
    
4. Then click down arrow next to connect and click download the RDP file. Open the RDP file with your client and enter in your password.
    
5. Once you have connected to the **windows-connectivity** instance. Open the **Google Cloud Shell SDK**:
    
    ![Google Cloud SDK Shell desktop icon](https://cdn.qwiklabs.com/BCl691Ssf881O549%2FagVx5beKV0CF109wpHLf%2BLOISM%3D align="left")
    
6. Now from the command line enter the following command to see if you can connect to the **linux-iap instance**:
    
    ```apache
    gcloud compute ssh linux-iap
    ```
    
    Copied!
    
    Click **Y** when prompted to continue and to select the zone.
    
    Make sure that you select the right zone for the instance when prompted.
    
7. Then **Accept** the Putty security alert.
    

You should receive a message that no external IP address was found and that it will use IAP tunneling.

![Output showing external IP address not found](https://cdn.qwiklabs.com/%2BxgrSRTvVJbJdyJ3uLgKFkM6Dq81JAthRcPaJFFOH44%3D align="left")

8. Update Putty Settings to allow Tunnel connections locally. Click the top left corner of the Putty Window &gt; Change Settings.
    
    ![Putty Settings](https://cdn.qwiklabs.com/9FEo0pSWmZRPXQja7crg43TFKtPtNi0e2ALxqSZ44qQ%3D align="left")
    
9. Allow local ports to accept connections from other hosts by checking the checkbox "Local ports accept connections from other hosts".
    
    ![Tunnel Settings](https://cdn.qwiklabs.com/J65cQl1VUnCd3NkkEruYxp2zSruQ1HnNzjelNWUynU0%3D align="left")
    
10. Close the Putty session and click **Apply**. Use the following command to create an encrypted tunnel to the RDP port of the VM instance:
    
    ```apache
    gcloud compute start-iap-tunnel windows-iap 3389 --local-host-port=localhost:0  --zone=us-east4-a
    ```
    
    Copied!
    
    Once you see the message about “Listening on port \[XXX\].” Copy the tunnel port number.
    
11. Return to the Google Cloud Console and go to the **Compute Engine &gt; VM Instances** page.
    
12. Set and copy the password for the **windows-iap** instance.
    
    Return to the RDP session now.
    
13. Leave gcloud running and open the Microsoft Windows **Remote Desktop Connection** app.
    
14. Enter the tunnel endpoint where the endpoint is the tunnel port number from the earlier step like so:
    
    * localhost:endpoint
        
    
    ![6](https://cdn.qwiklabs.com/uBaBphYqfKe4ogEhCUMIfFdieiPEwtirriag3K7U%2BDU%3D align="left")
    
15. Click **Connect**.
    
    Then enter the previous credentials you copied earlier. You will be successfully RDPed into your instance now!
    
    If prompted click **Yes**.
    
    ![Windows 10 RDP instance page](https://cdn.qwiklabs.com/S%2BMwhPUkjzd1LkDzxOVJPtHbU3BcgpIyDtV2BWhDbk8%3D align="left")
    

You were able to access the instance even without an external IP address using IAP

Assessment Completed!

Confirm VM is accessible via IAP enabled SA

*Assessment Completed!*

Congratulations! You were able to successfully connect to both instances using IAP.

---

## Solution of Lab

%[https://youtu.be/7Dqa07jhPTM] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1036/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Techcps/GSP-Short-Trick/master/Securing%20Virtual%20Machines%20using%20Chrome%20Enterprise%20Premium/techcps1036.sh
sudo chmod +x techcps1036.sh
./techcps1036.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757230101237/a4afa02e-570b-468e-bd4a-62d1bc07c8b8.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757230105799/ac2993c9-f622-4f45-90d3-1574534ce7ca.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757230117477/b553ad5d-e101-4c7f-ae98-f10c0d936346.png align="center")

```apache
IAP-secured Tunnel User
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757230140864/edf7bfa3-e4c7-4396-8c77-3b4db499dfd2.png align="center")