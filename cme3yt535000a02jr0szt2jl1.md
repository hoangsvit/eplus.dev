---
title: "Deploying a Fault-Tolerant Microsoft Active Directory Environment - GSP118"
seoTitle: "Deploying a Fault-Tolerant Microsoft Active Directory Environment - GS"
seoDescription: "Set up a fault-tolerant Active Directory on Google Cloud with redundant Windows Domain Controllers and a custom VPC network for enhanced availability"
datePublished: Sat Aug 09 2025 08:00:27 GMT+0000 (Coordinated Universal Time)
cuid: cme3yt535000a02jr0szt2jl1
slug: deploying-a-fault-tolerant-microsoft-active-directory-environment-gsp118
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754726372408/60598dd4-2310-4211-a3b9-d0d8f510ab38.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1754726408149/d06221c7-03f9-4244-9e4f-81248b697c94.png
tags: deploying-a-fault-tolerant-microsoft-active-directory-environment-gsp118, gsp118, deploying-a-fault-tolerant-microsoft-active-directory-environment, microsoft-active-directory-environment, deploying-a-fault-tolerant

---

This lab is part of a series aimed at helping you deploy a highly available Windows architecture on Google Cloud with Microsoft Active Directory (AD), SQL Server, and Internet Information Services (IIS). In this lab you set up a redundant pair of Windows Domain Controllers (DC) with AD using a new Virtual Private Cloud (VPC) network and multiple subnets.

You can also use this lab to learn to set up an AD configuration for use in other architectures. Replicating a remote AD environment to the new Google Cloud-based AD environment will not be covered, although this is possible with Cloud VPN and additional AD configuration.

### Objectives

* Create a custom mode VPC network with two subnets spanning two zones.
    
* Create Windows Server virtual instances and enable AD Domain Services.
    
* Configure a new domain with Active Directory.
    
* Join the new Windows Server instances to the new domain.
    
* Configure firewall rules to allow traffic to the virtual machines.
    
* Test the configuration.
    

### Architecture

![Windows architecture on Google Cloud example](https://cdn.qwiklabs.com/vv%2FUW3c8IP2wOuHn1RpA4wc5PqfM6tKhDcyvQUkszm4%3D align="left")

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
    student-00-356f8acc29cd@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    t3coDZmidj6X
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

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-ae344f9248c7`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-ae344f9248c7
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
ACCOUNT: student-00-356f8acc29cd@qwiklabs.net

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
project = qwiklabs-gcp-01-ae344f9248c7
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Initializing common variables

You must define several variables that control where elements of the infrastructure are deployed.

1. Run the following script to define the environment variables for your project:
    

```apache
export region1=us-east4
export region2=us-east1
export zone_1=us-east4-a
export zone_2=us-east1-c
export vpc_name=webappnet
export project_id=$(gcloud config get-value project)
```

2. Run the following to set the region to `us-east4` :
    

```apache
gcloud config set compute/region ${region1}
```

3. Click **Authorize** when prompted.
    

## Task 2. Creating the network infrastructure

After you've defined the infrastructure variables, create the network and subnets that AD will use.

1. In Cloud Shell, run the following command to create the VPC network:
    

```apache
gcloud compute networks create ${vpc_name}  \
    --description "VPC network to deploy Active Directory" \
    --subnet-mode custom
```

2. The following warning can be ignored. You'll create firewall rules in later steps.
    

**Note:** Instances on this network will not be reachable until firewall rules are created.

3. Add two subnets to the VPC network:
    

```apache
gcloud compute networks subnets create private-ad-zone-1 \
    --network ${vpc_name} \
    --range 10.1.0.0/24 \
    --region ${region1}
```

```apache
gcloud compute networks subnets create private-ad-zone-2 \
    --network ${vpc_name} \
    --range 10.2.0.0/24 \
    --region ${region2}
```

4. Create an internal firewall rule to allow traffic between subnets:
    

```apache
gcloud compute firewall-rules create allow-internal-ports-private-ad \
    --network ${vpc_name} \
    --allow tcp:1-65535,udp:1-65535,icmp \
    --source-ranges  10.1.0.0/24,10.2.0.0/24
```

**Note:** In a production environment, it's a best practice to secure all the ports that your systems are not actively using and to secure access to your machines using a [bastion host](https://cloud.google.com/solutions/connecting-securely#bastion).

5. Create a firewall rule to allow an RDP connection on port 3389 from any location:
    

```apache
gcloud compute firewall-rules create allow-rdp \
    --network ${vpc_name} \
    --allow tcp:3389 \
    --source-ranges 0.0.0.0/0
```

Click *Check my progress* to verify the objective.

Creating the network infrastructure

## Task 3. Creating the first domain controller

Next you'll create a domain controller that has the following properties:

* Name: `ad-dc1`
    
* IP Address: `10.1.0.100`
    

1. Create a Compute Engine instance of Windows Server 2016 to use as the first domain controller:
    

```apache
gcloud compute instances create ad-dc1 --machine-type e2-standard-2 \
    --boot-disk-type pd-ssd \
    --boot-disk-size 50GB \
    --image-family windows-2016 --image-project windows-cloud \
    --network ${vpc_name} \
    --zone ${zone_1} --subnet private-ad-zone-1 \
    --private-network-ip=10.1.0.100
```

**Note:** In a production environment you can increase the boot disk size based on your expected needs.

Click *Check my progress* to verify the objective.

Creating the first domain controller

2. Wait approximately one minute, and then create a password for `ad-dc1` by running the following command. Save the ip-address, username and password returned in Cloud Shell and label it for Domain Controller 1, they will be used in later steps:
    

```apache
gcloud compute reset-windows-password ad-dc1 --zone ${zone_1} --quiet --user=admin
```

**Note:** If the instance is not ready to accept the request, you'll receive the following error message:

`ERROR: (gcloud.compute.reset-windows-password) The instance may not be ready for use. This can occur if the instance was recently created or if the instance is not running Windows. Please wait a few minutes and try again.`

If so, just retry the command.

### Copy and paste with the RDP client

Once you are securely logged into your instance, you may find yourself copying and pasting commands from the lab manual.

To paste, hold the **CTRL-V** keys (if you are a Mac user, using **CMND-V** will not work.) If you are in a Powershell window, be sure that you have clicked into the window or else the paste shortcut won't work.

If you are pasting into putty, **right click**.

## Task 4. RDP into your instance

Use RDP to connect to the domain controller instance with the credentials you created in the previous step.

1. From the **Navigation menu**, go to **Compute Engine** &gt; **VM Instances**.
    
2. Click `ad-dc1` to open the VM instance Details page for the first AD machine.
    
3. Click **RDP** to open an RDP session to this instance.
    

* Depending on the system you are using you may need to install a third party RDP client or install the Chrome RDP plug-in in order to connect.
    
* Connect using the ip-address, username and password you saved when you set the local windows user account password.
    
* If you download the RDP file to connect you will need to change the username used to make the connection to the username you saved in the previous section.
    

**On Windows systems:**

1. Download and then open the RDP file.
    
2. Click **Connect**. The connection will fail as the default username is incorrect.
    
3. Click **More Choices**.
    
4. Click **Use a different account**.
    
5. Enter the username and password you saved at the beginning of this section and then click **OK** to log in.
    

![Windows Security login screen](https://cdn.qwiklabs.com/%2FhzAl1gGbR2OVs6XJKE8cdGBDa9RfOWpOQL5z9N%2F2%2FA%3D align="left")

6. When you see a security warning dialog stating that the identity of the remote computer cannot be verified click **Yes**.
    
7. When the initial RDP connection to the Windows machine opens click **Yes** to make this machine discoverable.
    
8. Open a PowerShell terminal as Administrator. (Click in the search box on the task-bar, type "PowerShell", and then with Windows PowerShell selected, press **Shift-Ctrl-Enter**.)
    
9. When prompted to allow this application to make changes to your device click **Yes**.
    
10. Set the Windows credentials for the Administrator account:
    

```apache
net user Administrator *
```

8. You're prompted to create a password. Use a strong password, and store the password in safe location for future use. Even though this is a lab, you must follow the password creation rules.
    

The Administrator account will become a domain admin account after you've created the [AD forest](https://technet.microsoft.com/en-us/library/cc759073\(v=ws.10\).aspx) with it.

9. Enable the account:
    

```apache
net user Administrator /active:yes
```

10. Install Active Directory Domain Services, including Management Tools:
    

```apache
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
```

11. Set the following PowerShell variables:
    

```apache
$DomainName = "example-gcp.com"
$DomainMode = "7"
$ForestMode = "7"
$DatabasePath = "C:\Windows\NTDS"
$SysvolPath = "C:\Windows\SYSVOL"
$LogPath = "C:\Logs"
```

12. Install the new Active Directory forest configuration in Windows Server 2016 mode:
    

```apache
Install-ADDSForest -CreateDnsDelegation:$false `
    -DatabasePath $DatabasePath `
    -LogPath $LogPath `
    -SysvolPath $SysvolPath `
    -DomainName $DomainName `
    -DomainMode $DomainMode `
    -ForestMode $ForestMode `
    -InstallDNS:$true `
    -NoRebootOnCompletion:$true `
    -Force:$true
```

13. When you're prompted, enter a Safe Mode Administrator password. Store the password in a safe location for future use.
    
14. Dismiss the following warnings. Each warning will appear two times, once during prerequisites verification and a second time during the installation process.
    

```apache
WARNING: Windows Server 2016 domain controllers have a default for the security setting named Allow cryptography algorithms compatible with Windows NT 4.0 that prevents weaker cryptography algorithms when establishing security channel sessions.

Learn more about this setting from Knowledge Base article 942564 (http://go.microsoft.com/fwlink/?LinkId=104751).
```

```apache
WARNING: This computer has at least one physical network adapter that does not have static IP address(es) assigned to its IP Properties. If both IPv4 and IPv6 are enabled for a network adapter, both IPv4 and IPv6 static IP addresses should be assigned to both IPv4 and IPv6 Properties of the physical network adapter. Such static IP address(es) assignment should be done to all the physical network adapters for reliable Domain Name System (DNS) operation.
```

```apache
WARNING: A delegation for this DNS server cannot be created because the authoritative parent zone cannot be found or it does not run Windows DNS server. If you are integrating with an existing DNS infrastructure, you should manually create a delegation to this DNS server in the parent zone to ensure reliable name resolution from outside the domain "example-gcp.com".
Otherwise, no action is required.
```

15. Restart the virtual machine:
    

```apache
Restart-Computer
```

This will disconnect your RDP session. The machine will now take about a minute to restart.

16. Once it has restarted use RDP to connect to the domain controller `ad-dc1` with the Administrator credentials you defined during the AD forest installation.
    
    * Remember to add the domain name as a prefix, as in `EXAMPLE-GCP\Administrator`.
        
    * The initial log-in to the domain may take a few minutes as services such as group policies are initialized for the first time.
        

**Note:** If you are using the Chrome RDP client, you might receive the following warning about the certificate. Follow the instructions to connect:

`WARNING Someone could be trying to intercept your communication. To connect anyway select Chrome RDP Options, select the Certificates tab, select the :3389 certificate listing and press the Delete Certificate button.`

If you are using a built in Windows RDP client or a third party RDP client you will have to confirm that you accept the new certificate in order to connect.

17. Open a PowerShell terminal as Administrator and set the following variables:
    

```apache
$DNS1 = "10.2.0.100"
$DNS2 = "127.0.0.1"
$LocalStaticIp = "10.1.0.100"
$DefaultGateway = "10.1.0.1"
```

18. Set the IP address and default gateway:
    

```apache
netsh interface ip set address name=Ethernet static `
    $LocalStaticIp 255.255.255.0 $DefaultGateway 1
```

**Note:** RDP might lose connectivity for a few seconds or require you to reconnect.

19. Configure the primary DNS server:
    

```apache
netsh interface ip set dns Ethernet static $DNS1
```

20. DNS server ad-dc2 will be available only after the second domain controller is deployed, so you can ignore the following error message:
    

```apache
The configured DNS server is incorrect or does not exist.
```

**Note:** You'll configure the DNS servers after the AD forest installation. Installing the forest overwrites the post-installation values with the IP addresses of the domain controllers `ad-dc1` and `ad-dc2`. You'll set up the `ad-dc2` domain controller later in this lab.

21. Configure the secondary DNS server:
    

```apache
netsh interface ip add dns Ethernet $DNS2 index=2
```

22. The DNS server entry for this domain controller, `ad-dc1`, should be second in the list in order to prevent AD from frequently losing connection with the other controller. Use the second domain controller, `ad-dc2`, as the primary DNS server.
    

You'll create the `ad-dc2` domain controller in the next section. If you don't follow this pattern, the following errors appear under **Server Manager** &gt; **Active Directory Domain Services**:

```apache
The DFS Replication service failed to update configuration in Active
Directory Domain Services. The service will retry this operation
periodically.
```

You might see errors on the `ad-dc1` server before both servers are fully configured. You can ignore these errors.

## Task 5. Creating the second domain controller

Next you'll create a domain controller that has the following properties:

* Name: `ad-dc2`
    
* IP Address: `10.2.0.100`
    

1. If your Cloud Shell window has expired, open a new Cloud Shell instance and reset the variables you set earlier. To do that, edit the following script to specify the project ID and region you used earlier:
    

```apache
export region2=us-east1
export zone_2=us-east1-c
export vpc_name=webappnet
export project_id=$(gcloud config get-value project)
gcloud config set compute/region ${region2}
```

2. Copy the script into your Cloud Shell window and run it.
    
3. Use Cloud Shell to create the second domain controller instance:
    

```apache
gcloud compute instances create ad-dc2 --machine-type e2-standard-2 \
    --boot-disk-size 50GB \
    --boot-disk-type pd-ssd \
    --image-family windows-2016 --image-project windows-cloud \
    --can-ip-forward \
    --network ${vpc_name} \
    --zone ${zone_2} \
    --subnet private-ad-zone-2 \
    --private-network-ip=10.2.0.100
```

Click *Check my progress* to verify the objective.

Creating the second domain controller

4. Wait approximately one minute, and then create a password for the Windows instance `ad-dc2`:
    

```apache
gcloud compute reset-windows-password ad-dc2 --zone ${zone_2} --quiet --user=admin
```

5. You will need to use the username and password to RDP into the Windows instance you created. Save the IP address, username and password, and label them for Domain Controller 2.
    
6. On the Google Cloud console.
    
7. Open **Compute Engine** &gt; **VM Instances**.
    
8. Click **ad-dc2** to open the VM instance Details page for the second ad machine.
    
9. Click **RDP** to open an RDP session to this instance.
    

**Note:** Depending on the system you are using you may need to install a third party RDP client or install the Chrome RDP plug-in in order to connect.

If you download the RDP file to connect you will need to change the username used to make the connection to the username you saved in the previous section.

If you are using a third party RDP client connect using the ip-address, username and password you saved when you set the local windows user account password.

10. When the initial connection to the Windows machine opens, click **Yes** to make this machine discoverable.
    
11. Open a PowerShell terminal as Administrator. (Click **Start**, type **PowerShell**, and then press **Shift-Ctrl-Enter**.)
    
12. When prompted to allow this application to make changes to your device click **Yes**.
    
13. Install Active Directory Domain Services, including Management Tools:
    

```apache
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
```

14. Set the following PowerShell variables:
    

```apache
$DomainName = "example-gcp.com"
$DNS1 = "10.1.0.100"
$DNS2 = "127.0.0.1"
$LocalStaticIp = "10.2.0.100"
$DefaultGateway = "10.2.0.1"
$DatabasePath = "C:\Windows\NTDS"
$SysvolPath = "C:\Windows\SYSVOL"
$LogPath = "C:\Logs"
```

15. Configure the primary DNS server:
    

```apache
netsh interface ip set dns Ethernet static $DNS1
```

16. Configure the second server so that it acts as its own secondary DNS server:
    

```apache
netsh interface ip add dns Ethernet $DNS2 index=2
```

The `ad-dc2` DNS server will be available only after `ad-dc2` is joined to the domain as a domain controller. Because the server hasn't been joined yet, you see the following message, but you can ignore it:

```apache
The configured DNS server is incorrect or does not exist.
```

17. Set the IP address and default gateway:
    

```apache
netsh interface ip set address name=Ethernet static `
    $LocalStaticIp 255.255.255.0 $DefaultGateway 1
```

**Note:** RDP might lose connectivity for a few seconds or require you to reconnect.

18. Run the following PowerShell script, which will let you know when the first domain controller becomes operational. Wait until you see the Domain controller is reachable message.
    

```apache
$DomainIsReady=$False
For ($i=0; $i -le 30; $i++) {
    nltest /dsgetdc:example-gcp.com
    if($LASTEXITCODE -ne 0) {
        Write-Host "Domain not ready, wait 1 more minute, then retry"
        Start-Sleep -s 60
    }
    else {
        $DomainIsReady=$True
        Write-Host "Domain controller is reachable"
        break
    }
}
if($DomainIsReady -eq $False) {
    Write-Host "Domain not ready. Check if it was deployed ok"
}
```

19. Set the following PowerShell variable again:
    

```apache
$DomainName = "example-gcp.com"
```

20. Add the virtual machine to the forest as a second domain controller:
    

```apache
Install-ADDSDomainController `
    -Credential (Get-Credential "EXAMPLE-GCP\Administrator") `
    -CreateDnsDelegation:$false `
    -DatabasePath $DatabasePath `
    -DomainName $DomainName `
    -InstallDns:$true `
    -LogPath $LogPath `
    -SysvolPath $SysvolPath `
    -NoGlobalCatalog:$false `
    -SiteName 'Default-First-Site-Name' `
    -NoRebootOnCompletion:$true `
    -Force:$true
```

21. When you're prompted to provide a password for the Administrator account, use the Administrator credentials you defined during AD forest installation. Add the domain name as a prefix, as in `EXAMPLE-GCP\Administrator`.
    
22. When you're prompted to enter a Safe Mode Administrator password, use the same password you used for the first domain controller.
    
23. Ignore the following warnings. Each warning appears twice: once during prerequisites verification, and a second time during the installation process.
    

```apache
WARNING: Windows Server 2016 domain controllers have a default for the security setting named "Allow cryptography algorithms compatible with Windows NT 4.0" that prevents weaker cryptography algorithms when
establishing security channel sessions.

For more information about this setting, see Knowledge Base article 942564 (http://go.microsoft.com/fwlink/?LinkId=104751).
```

```apache
WARNING: A delegation for this DNS server cannot be created because the authoritative parent zone cannot be found or it does not run Windows DNS server. If you are integrating with an existing DNS infrastructure, you should manually create a delegation to this DNS server in the parent zone to ensure reliable name resolution from outside the domain "example-gcp.com". Otherwise, no action is required.
```

24. Restart the virtual machine:
    

```apache
Restart-Computer
```

## Task 6. Testing the installation

1. Wait 5-10 minutes to make sure that both domain controllers are operational and are replicating information.
    
2. Using RDP, re-connect to the first domain controller instance using the Administrator credentials you defined during the first domain controller installation. Add the domain name as a prefix, as in `EXAMPLE-GCP\Administrator`.
    
3. Once you are connected to the RDP session open a PowerShell console as Administrator if one is not already running.
    
4. Test that replication is working by running the following command in the PowerShell console:
    

```apache
repadmin /replsum
```

**Note:** Learn more about replication and topology management in AD from the [Replication and Metadata documentation](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/manage/powershell/advanced-active-directory-replication-and-topology-management-using-windows-powershell--level-200-#BKMK_Repl).

5. The output should resemble the following, with no errors or failures.
    

![Output confirming the start of data collection for replication summary which may take a while](https://cdn.qwiklabs.com/OxfV62ReFA2pKNw47z24M7UTqkLDv8Gq5WbvKt1B6Dw%3D align="left")

6. If the domain controller is not available, you receive a message that resembles the following:
    

```apache
Beginning data collection for replication summary, this may take awhile:

....
Source DSA          largest delta    fails/total %%   error

Destination DSA     largest delta    fails/total %%   error
```

7. If you receive this message, wait a couple of minutes and then retry the `repadmin /replsum` command.
    

---

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=6uXXQ1zzSfA] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP118/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Cloud-Wala-Banda/Labs-Solutions/main/Deploying%20a%20Fault-Tolerant%20Microsoft%20Active%20Directory%20Environment/gsp118.sh
sudo chmod +x gsp118.sh
./gsp118.sh
```

### Manual

%[https://www.youtube.com/watch?v=3LbRFgTdnZ8]