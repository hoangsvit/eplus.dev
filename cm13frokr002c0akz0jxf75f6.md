---
title: "Check Point: Next-Gen Data Center Security CloudGuard for Google Cloud - GSP818"
seoTitle: "Check Point: Next-Gen Data Center Security CloudGuard for Google Cloud"
seoDescription: "Organizations are starting to adopt public cloud environments as an extension of their internal Data Centers (DC) to gain operational flexibility and lower "
datePublished: Sun Sep 15 2024 10:31:16 GMT+0000 (Coordinated Universal Time)
cuid: cm13frokr002c0akz0jxf75f6
slug: check-point-next-gen-data-center-security-cloudguard-for-google-cloud-gsp818
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726395988838/e1e8b8ed-8b70-4e75-8659-ffef7cc9da8b.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726396263923/89da30cd-cd72-44c9-8784-bf78d35f8dc2.jpeg

---

## **Overview**

Organizations are starting to adopt public cloud environments as an extension of their internal Data Centers (DC) to gain operational flexibility and lower operational costs. The increasing number of applications in DC has led to a dramatic increase in network traffic between the different servers/application inside DC (east-west traffic).

However, when it comes to security, the focus has been on protecting the entrance to the DC, and the perimeter, but there are few controls to secure east-west traffic inside the data center. This represents a critical security risk where threats can traverse unimpeded once inside the data center. Furthermore, traditional security approaches to this problem are unable to keep pace with the dynamic network changes and rapid provisioning of applications in a cloud environment.

Check Point CloudGuard for Google Cloud with its advanced threat prevention capabilities will allow you to deal with that security risk and minimize it. This lab will provide you with some getting started steps required to get familiar with the Google Cloud environment & how to deploy a basic day to day scenario with CloudGuard in place. You will understand and simulate a real-life use case to grasp the ease of deploying automated advanced security protections within the Google Cloud. You will walk through a few simple exercises to illustrate the benefits of having security integrated into a virtual networking platform. These exercises are incremental; they start from basic setup and progress into more advanced scenarios.

### RDP requirements

In this lab, you will need to use RDP to log into a Windows VM. You can either use the [Chrome RDP for Google Cloud](https://chrome.google.com/webstore/detail/chrome-rdp-for-google-clo/mpbbnannobiobpnfblimoapbephgifkm) extension or [Microsoft Remote Desktop](https://www.microsoft.com/en-us/p/microsoft-remote-desktop/9wzdncrfj3ps). If you are on a Windows machine, it is highly recommended to use Microsoft Remote Desktop as it will be a much better user experience.

**Note:** If you choose to use the Chrome extension, using an Incognito or Guest window will **not** work. Please make sure you are logged in to your project with a regular Chrome window and proceed with the lab.

### What you'll learn

In this lab, you will:

* Prepare your public cloud environment for deployment
    
* Deploy a Check Point CloudGuard cluster on Google Cloud
    
* Create and configure the Cluster object on SmartConsole
    
* Create an access policy and publish/install it on the Cluster
    
* Create hosts in two different departments/locations and test the connectivity between them.
    

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
    student-04-c7937cf79f66@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    A0Bp5HOrDAiY
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-133c709af191`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-133c709af191
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
ACCOUNT: student-04-c7937cf79f66@qwiklabs.net

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
project = qwiklabs-gcp-01-133c709af191
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Set up your working environment**

### Deploy CloudGuard Network Security NGFW Threat Prevention (Optional)

1. Run the following commands in Cloud Shell to create the VPCs and firewall rules:
    

```apache
gcloud compute networks create vpc-cluster --bgp-routing-mode=regional --subnet-mode=custom
gcloud compute networks subnets create cluster --network=vpc-cluster --range=192.168.110.0/24 --region=us-east4 --enable-private-ip-google-access
gcloud compute networks create vpc-management --bgp-routing-mode=regional --subnet-mode=custom
gcloud compute networks subnets create management --network=vpc-management --range=192.168.120.0/24 --region=us-east4 --enable-private-ip-google-access
gcloud compute networks create vpc-prod --bgp-routing-mode=regional --subnet-mode=custom
gcloud compute networks subnets create prod --network=vpc-prod --range=10.0.0.0/24 --region=us-east4
gcloud compute networks create vpc-qa --bgp-routing-mode=regional --subnet-mode=custom
gcloud compute networks subnets create qa --network=vpc-qa --range=10.0.1.0/24 --region=us-east4
gcloud compute firewall-rules create ingress-qa --action allow --direction=INGRESS --source-ranges=0.0.0.0/0 --network=vpc-qa --rules all
gcloud compute firewall-rules create ingress-prod --action allow --direction=INGRESS --source-ranges=0.0.0.0/0 --network=vpc-prod --rules all
gcloud compute firewall-rules create rdp-management --action allow --direction=INGRESS --source-ranges=0.0.0.0/0 --network=vpc-management --rules tcp:3389
```

2. Go to the Google Cloud Marketplace. Search for "Check Point CloudGuard" and click on **CloudGuard Network Security NGFW Threat Prevention**. Click **Launch**.
    

![CloudGuard Network Security NGFW Threat Prevention](https://cdn.qwiklabs.com/x%2F0vc3O4CPOgBslf96T5s6QpDxOwJ7VKLUa3Wa5ElZ4%3D align="left")

**Note:** If **Launch** option is not available, click **GET STARTED** and Accept the Google Cloud Marketplace Terms of Service and click **Deploy**.

3. Use these general configuration settings:
    

|  |  |
| --- | --- |
| Deployment Name | Leave as default |
| Zone | `us-east4-c` |
| Machine type | Leave as default |

4. Under the **Networking** section, use the following configurations:
    

|  |  |
| --- | --- |
| (Under Network interfaces) Network | `vpc-management` |
| Subnetwork | `management` |
| Allow TCP traffic | Check, 0.0.0.0/0 |
| Allow Gateway network | Check, 0.0.0.0/0 |
| Allow ICMP traffic | Check, 0.0.0.0/0 |
| Allow UDP traffic | Check, 0.0.0.0/0 |
| External IP address | Static |
| Installation Type | R81.20 Gateway and Management (Standalone) |

5. Click on **More**. Enter the following settings:
    

|  |  |
| --- | --- |
| Automatically generate an administrator password | Check the box |
| Admin shell | /bin/bash |
| Public SSH key for the user | Leave blank |
| SIC key | cpgcpmig |
| Allow GUI clients | 0.0.0.0/0 |

6. Click **Deploy**.
    

**Note:** You should wait a couple minutes for the deployment to finish before you start the next one.

### Deploy CloudGuard Network Security High Availability (Optional)

1. Next, navigate to **Compute Engine &gt; Metadata** &gt; **SSH Keys**. Copy the SSH key for your lab account. You will use this in the next steps.
    
2. Go to the Google Cloud Marketplace, search for: **Check Point CloudGuard Network Security High Availability (BYOL)**. Click **Launch**.
    

![Check Point CloudGuard Network Security High Availability (BYOL)](https://cdn.qwiklabs.com/l3ujRcgLamVRUzlL00JSm5cGIkbBOnyTbNl1sIBU6tY%3D align="left")

**Note:** If **Launch** option is not available, click **GET STARTED** and Accept the Google Cloud Marketplace Terms of Service and click **Deploy**.

3. Use these general configuration settings:
    

|  |  |
| --- | --- |
| Deployment Name | Leave as default |
| High Availability Version | R81.20 Cluster |
| Zone A | `us-east4-c` |
| Zone B | Select for each cluster member a different zone, make sure the selected zones are in the same region in which you created your subnets. Here, use a different zone other than `Zone A` mentioned above from the same region. |
| Machine type | Leave as default |

4. Click **More**. Fill in the following settings:
    

|  |  |
| --- | --- |
| Disk Type | Leave as default |
| Disk size in GB | Leave as default |
| Public SSH key | Use the SSH Key as per instructions (step 1) and paste it in the field |

5. Under the **Check Point** section, fill in the following settings:
    

|  |  |
| --- | --- |
| Security Management Server address | `192.168.120.0/24` (Your management VPC IP Address) |
| SIC Key | `qwe123qwe123` |
| Automatically generate an administrator password | Check the box |
| Admin shell | /bin/bash |

6. Under the **Networking** section, use the following configurations:
    

|  |  |
| --- | --- |
| Cluster external subnet CIDR | Remove the predefined subnet |
| (Under Network interfaces) Network | `vpc-cluster` |
| Subnetwork | Leave as default (`cluster`) |

7. Under the **Firewall** section, select **Allow** and use `0.0.0.0/0` for each one of the firewall rules. (Repeat this for *each* one of the VPCs).
    

Your deployment should resemble the following:

![Deployment details](https://cdn.qwiklabs.com/3tnwfQClKenXjSSElEeYP8cXv5pSB%2FgYW3RuxspSrAY%3D align="left")

8. Remove the predefined subnet from the **Management external subnet CIDR** and choose `vpc-management` for the **Network** under *Network interfaces*.
    

Your deployment should resemble the following:

![Deployment details](https://cdn.qwiklabs.com/GmbZHERh7R%2FeNKEKkxr6Ba7xLWJo421p5eb7ylyLK4I%3D align="left")

9. Next, for the number of internal networks, change to **2**. For the 1st internal subnet CIDR, remove the **default**.Under Network interfaces for **Network**, choose `vpc-prod`. Click **More** to do the same with the 2nd internal subnet CIDR, and for **Network**, choose `vpc-qa`.
    

Your deployment should resemble the following:

![Deployment details](https://cdn.qwiklabs.com/s9M4GkfNG27cVNo7P62SvmxuV8GykBAwFVAdIeEFk4k%3D align="left")

10. Click **Deploy**.
    

## **Task 2. Configure cluster objects in SmartConsole**

### Create a Windows virtual machine

In this section, you will need to use an RDP client to log in to a Windows VM that is used to access the Check Point SmartConsole. If you want to RDP directly from the browser, you can use the [Chrome RDP for Google Cloud](https://chrome.google.com/webstore/detail/chrome-rdp-for-google-clo/mpbbnannobiobpnfblimoapbephgifkm) extension, but if you are using a Windows machine, it is highly recommended to use [Microsoft Remote Desktop](https://www.microsoft.com/en-us/p/microsoft-remote-desktop/9wzdncrfj3ps).

1. Start a Windows VM by executing the following in Cloud Shell:
    

```apache
gcloud compute instances create rdp-client --zone=us-east4-c  --machine-type=n1-standard-4 --image-project=qwiklabs-resources --image=sap-rdp-image --network=vpc-management --subnet=management --tags=rdp,http-server,https-server --boot-disk-type=pd-ssd
```

Click *Check my progress* to verify the objective.

Configure Cluster Objects in SmartConsole

**Check my progress**

2. Once it is deployed, click the arrow next to **RDP** and select `Set Windows Password`. Click **Set**.
    
3. Copy the password, and click **RDP** to connect with either the Chrome extension or Microsoft Remote Desktop.
    
4. Once you are logged in, click **Yes** in the Networks dialog box, and close the "Server Manager" application that is automatically started.
    

### Download the Gaia Console

1. Once you're connected to this Windows Instance via RDP, open Google Chrome.
    
2. When you're in Chrome, navigate to the **External IP** of the `check-point-cloudguard-payg-1-vm`. You can retrieve this on the **VM instances** page. **Note**, you must use the format `https://[EXTERNAL-IP]`, as using *http* will not work.
    

**Note:** If Chrome gives you a certification error, you can click **Advanced** &gt; **Proceed**. Alternatively, you can type "thisisunsafe" when you're on the page and it will allow you to proceed.

3. Log into the Gaia Console with the generated Admin username and Password from the first deployment. You can retrieve these by going back to the Cloud Console and navigating to **Deployment Manager** &gt; **Deployments**.
    
4. On the deployments page, click on `check-point-cloudguard-payg-1`. On the deployment details on the right hand side, copy the `Admin user` and `Admin password` credentials and use them to log in to the Gaia Console.
    
5. Once logged on, you will be presented with a Download link to the Smart Console. Click to download it, and run the installer once it finishes downloading to your Windows Machine.
    
6. Once the Smart Console is downloaded, open it and log in using the same `Admin user` and `Admin password` as before. For the Server Name, use the **External IP** of the `check-point-cloudguard-payg-1-vm` instance. (You can also find this in the deployment details.)
    

Now that you're logged into the SmartConsole, you are now ready to complete the next part of the lab.

## **Task 3. Configure Cluster objects (Optional)**

When you open SmartConsole for the first time, you can already see the Management server `check-point-cloudguard-payg-1-vm` object. To create the Cluster object, follow the next steps:

1. Click the **New** (star) icon on the top middle of SmartConsole.
    
2. Select **Cluster** and a Check Point Security Gateway Cluster creation window opens. Select **Wizard Mode**
    
3. Enter a **Cluster Name**.
    
4. Enter `192.168.110.4` as the **Cluster IPv4 address**. Leave Check Point ClusterXL and High Availability selected.
    
5. Click **Next**. On the *Cluster Member Properties* page click **Add** &gt; **New Cluster Member**.
    
6. Enter `Cluster-member1` as the first Cluster Member name, and `192.168.120.3` as the cluster member’s IPv4 address.
    
7. Enter the activation key from the Check Point CloudGuard Network Security High Availability configuration page (e.g. `qwe123qwe123`).
    
8. Click on **Initialize**, and confirm that Trust State is: **Trust Established**.
    
9. Click **Ok**, and **add** the second Cluster member (repeat steps 5-8). For the second member's name use `Cluster-member2`, and the IPv4: `192.168.120.4`. Click **Next**.
    
10. For the IPv4 Network Address `10.0.1.0/255.255.255.0`, leave the check box: **Private use of each member**. Click **Next**.
    
11. For the IPv4 Network Address `10.0.0.0/255.255.255.0`, leave the check box: **Private use of each member**. Click **Next**.
    
12. For the IPv4 Network Address `192.168.120.0/255.255.255.0`, check the **Cluster Synchronization** check box and click **Next**.
    
13. For the IPv4 Network Address `192.168.110.0/255.255.255.0`, leave the check box: **Private use of each member**. Click **Next**.
    
14. Click **Finish**, the Cluster object is created.
    
15. Click **Publish** on the top SmartConsole's taskbar.
    
16. Double click the **Cluster object** to open the Gateway Cluster properties page.
    
17. Un-check the **IPSec VPN** blade. Click the **Network management** tab on the properties window left panel.
    
18. Double click the first interface, under **Topology** click on **Modify**, and un-check the **Perform Anti-Spoofing based on interface topology** check box. Click **Ok** twice.
    
19. Repeat this step for all the interfaces.
    
20. To enable outbound traffic, click the **NAT** tab on the left, and check the **Hide internal networks behind the Gateway's external IP** checkbox.
    
21. Click **Ok** on the Cluster Gateway Properties page.
    

### Configure access control policy rule base

1. On SmartConsole, click the **SECURITY POLICIES** on the left panel.
    
2. On the **Access Control** policy, click the **Add rule above** icon on the top ruler.
    
3. Double click the **Name** field and enter name: `Prod to QA`.
    
4. In the **Source** field click the **+** icon. In the window which opens click on **New** &gt; **Network**, name it: `Prod_network`, network address: `10.0.0.0`, Net Mask: `255.255.255.0` and click **Ok**.
    
5. In the **Destination** field click the **+** icon. In the window which opens click on **New** &gt; **Network**, name it: `Qa_network`, network address: `10.0.1.0`, Net Mask: `255.255.255.0` and click **Ok**.
    
6. In the **Action** field change the action to: **Accept**.
    
7. In the **Trac** field change to: **Log**
    
8. Click the **Install Policy** on the top left, then click **Publish & Install**.
    

## **Task 4. Deploy two Linux instances**

Deploy two Linux instances, one in the `qa-vpc` and one in the `prod-vpc`.

1. Navigate back to the Cloud Console. In Cloud Shell, create the `linux-qa` VM by executing the following command:
    

```apache
gcloud compute instances create linux-qa --zone us-east4-c --image-project=debian-cloud --image-family=debian-11 --custom-cpu 1 --custom-memory 4 --network-interface subnet=qa,private-network-ip=10.0.1.4,no-address --metadata startup-script="\#! /bin/bash
useradd -m -p sa1trmaMoZ25A cp
EOF"
```

2. Create the `linux-prod` VM by executing the following command:
    

```apache
gcloud compute instances create linux-prod --zone us-east4-c --image-project=debian-cloud --image-family=debian-11 --custom-cpu 1 --custom-memory 4 --network-interface subnet=prod,private-network-ip=10.0.0.4,no-address --metadata startup-script="\#! /bin/bash
useradd -m -p sa1trmaMoZ25A cp
EOF"
```

Click *Check my progress* to verify the objective.

Deploy two Linux instances

**Check my progress**

### Test connectivity

1. Click the `linux-prod` VM, then click **Edit**.
    

![Edit button highlighted](https://cdn.qwiklabs.com/qF2Zswfnd1lFRteuUOEuOD%2FlCY2sAJB908PASlfnlwM%3D align="left")

2. **Enable** the connection to serial ports.
    

![Enable connecting to serial ports checkbox selected](https://cdn.qwiklabs.com/iE7Hk2XLxGECUEx0Qqb9lg0qplaBLhJrsV8qlaJ5P2M%3D align="left")

3. Click on the **Save** button on the bottom of the screen and click **Connect to the serial console**. Use the user: `cp` / password: `vpn123!` to login.
    
4. From the `linux-prod` VM, ping the `linux-qa` IP: `10.0.1.4`
    

```apache
ping 10.0.1.4
```

Success!

5. On the SmartConsole machine, go to **LOGS & MONITOR**, **Logs**, and find the **echo-request (ICMP)** logs.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=LaGwriJlAKs&ab_channel=QUICKGCPLAB] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726396203762/792609e1-608b-470f-882e-884d7cef9f26.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Check%20Point%20Next-Gen%20Data%20Center%20Security%20CloudGuard%20for%20Google%20Cloud/gsp818.sh
sudo chmod +x gsp818.sh
./gsp818.sh
```