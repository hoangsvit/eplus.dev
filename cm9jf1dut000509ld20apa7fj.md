---
title: "Cloud Filestore: Qwik Start - GSP244"
seoTitle: "Cloud Filestore: Qwik Start - GSP244"
seoDescription: "Cloud Filestore is a managed file storage service for applications that require a file system interface and a shared filesystem for data. Filestore gives us"
datePublished: Wed Apr 16 2025 04:12:47 GMT+0000 (Coordinated Universal Time)
cuid: cm9jf1dut000509ld20apa7fj
slug: cloud-filestore-qwik-start-gsp244
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744776564178/de59a365-8821-4612-9835-5dfd55ec6cc2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744776755897/8ed5d77c-2888-44c9-8c3d-841523c168ed.png
tags: cloud-filestore-qwik-start-gsp244, cloud-filestore-qwik-start, gsp244

---

## Overview

Cloud Filestore is a managed file storage service for applications that require a file system interface and a shared filesystem for data. Filestore gives users a simple, native experience for standing up managed Network Attached Storage (NAS) with their Compute Engine and Google Kubernetes Engine instances. The ability to fine-tune Filestore’s performance and capacity independently leads to predictably fast performance for your file-based workloads.

### What you'll do

In this lab you'll learn how to perform basic operations in Cloud Filestore using the Google Cloud console. You will:

* Create a Cloud Filestore instance.
    
* Mount the file share from that instance on a client VM instance.
    
* Create a file on the mounted file share.
    

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
    student-04-314c2a052437@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    oWCE845oVzsG
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

## Cloud Filestore architecture

Cloud Filestore architectural choices that affect your Cloud Filestore instances:

### Permissions

A Cloud Filestore instance consists of a single NFS file share with fixed export settings and default Unix permissions.

### Networking

1. You must create a Cloud Filestore instance in the same Google Cloud project and [VPC network](https://cloud.google.com/compute/docs/vpc/) as any clients that connect to it. All [internal IP addresses](https://www.arin.net/knowledge/address_filters.html) in the selected VPC network can connect to the Cloud Filestore instance.
    
2. If you are using a VPC network other than the default network, you might need to create firewall rules to enable communication with Cloud Filestore instances.
    
3. You can't use a [legacy network](https://cloud.google.com/compute/docs/vpc/legacy) with Cloud Filestore instances.
    

### IP address range

Each Cloud Filestore instance must have an IP address range associated with it. The IP address range must be from within the internal IP address ranges (`10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`) and have a block size of 29. Examples of valid Cloud Filestore instance IP address ranges are `10.0.3.0/29` and `172.31.0.0/29`.

You can assign the IP address range if there's a specific one you want to use, otherwise Cloud Filestore picks a random range to use from within the internal IP address ranges. If the range is already in use, the service tries again until it finds one that is free. If you assign an IP address range, make sure it doesn't overlap with any existing subnets in the VPC network that the Cloud Filestore instance uses, or with the IP address ranges assigned to any other existing Cloud Filestore instances in that network.

### Cloud Filestore network peering

The first time you create a Cloud Filestore instance, Cloud Filestore also creates a [peered network](https://cloud.google.com/vpc/docs/vpc-peering) to enable network connectivity between clients in your project and the Cloud Filestore instance. The peered network has a machine-generated name similar to r-1abc2d3e-45fg-6789-hf12-3456i78j9k1-0000000a-peer, and appears in the VPC Network Peering page.

Don't delete the peered network, because this will cause you to lose connectivity with your Cloud Filestore instances. If you accidentally delete the peered network, the easiest thing to do to recreate it is to create another Cloud Filestore instance. Cloud Filestore will recognize that there is no connectivity between your project and the new instance, and will re-create the peered network. you can delete the new Cloud Filestore instance after that if you don't need it for anything else.

### Storage size units

Cloud Filestore defines 1 gigabyte (`GB`) as 1024^3 bytes, also known as a GiB. Cloud Filestore also defines 1 TB as 1024^4 bytes, also known as a TiB.

## Task 1. Create a Compute Engine instance

1. In the Cloud Console, select **Navigation menu &gt; Compute Engine &gt; VM instances**.
    
2. To create a new instance, click **Create Instance**.
    
3. In the **Machine configuration**.
    
    Select the following values:
    
  <table>

<tbody><tr>
<th>Property</th>
<th>Value (type value or select option as specified)</th>
</tr>


<tr>
<td><strong>Name</strong></td>
<td><code>nfs-client</code></td>
</tr>
<tr>
<td><strong>Region</strong></td>
<td><ql-variable key="project_0.default_region" placeholder="<REGION>"></ql-variable></td>
</tr>
<tr>
<td><strong>Zone</strong></td>
<td><ql-variable key="project_0.default_zone" placeholder="<ZONE>"></ql-variable></td>
</tr>
<tr>
<td><strong>Series</strong></td>
<td><code>E2</code></td>
</tr>
<tr>
<td><strong>Machine Type</strong></td>
<td><code>e2-medium</code></td>
</tr>

</tbody></table>
    
4. Click **OS and storage**.
    
    Click **Change** to begin configuring your boot disk and select the following values:
    
    * **Operating system**: `Debian`
        
    * **Version**: `Debian GNU/Linux 11 (bullseye)`
        
    
    Click **Select**.
    
5. Click **Networking**.
    
    * **Firewall**: `Allow HTTP traffic`
        
6. Click **Create**.
    

Click **Check my progress** to verify the objective.

Create a Compute Engine instance, allow HTTP traffic.

**Check my progress**

## Task 2. Create a Cloud Filestore instance

1. In the Cloud console, on the **Navigation menu** (), click **APIs and Services** &gt; **Library**.
    
2. Search for `Cloud Filestore API` and click **Enable** if it is not already enabled.
    
3. In the Cloud console, on the **Navigation menu** (), click **View All Products** &gt; **Storage** &gt; **Filestore**.
    

If you get an error message be sure you navigated to **Filestore** and not **Firestore**.

4. Click **+CREATE INSTANCE** at the top of the page.
    
5. Create your Cloud Filestore instance with the following information:
    

| **Configuration** | **Value** |
| --- | --- |
| Instance ID | nfs-server |
| Instance type | Basic |
| Storage type | HDD |
| Allocate capacity | 1 TB |
| Region | `us-west1` |
| Zone | `us-west1-a` |
| Network | default |
| File share name | vol1 |
| Access control | Grant access to all clients on the VPC network |

6. Click **Create**.
    

Click **Check my progress** to verify the objective.

Create a Cloud Filestore instance

**Check my progress**

This will take a couple of minutes to create.

## Task 3. Mount the Cloud Filestore file share on a Compute Engine VM

1. In the Cloud console, on the **Navigation menu** (), click **Compute Engine** &gt; **VM Instances**.
    
2. In the list of VM instances, click the **SSH** button for **nfs-client** to open a terminal window connected to that instance.
    
    If prompted, click **Authorize**.
    
3. In SSH shell install NFS by running the following commands:
    

```apache
sudo apt-get -y update &&
sudo apt-get -y install nfs-common
```

4. Make a mount directory for the Cloud Filestore file share by running the following command:
    

```apache
sudo mkdir /mnt/test
```

5. Mount the file share by running the `mount` command and specifying the Cloud Filestore instance IP address and file share name:
    

```apache
sudo mount YOUR_INSTANCE_IP:/vol1 /mnt/test
```

If the above command hangs up or returns an "access denied" error that resembles:

* `mount.nfs: access denied by server while mounting 10.0.0.2:/vol1`
    
* `mount.nfs: mount to NFS server '10.0.0.2:/vol1' failed: RPC Error: Unable to receive try running the command again.`
    

Most likely it means that your Filestore instance hasn't been created yet. Return to the Cloud Console, and from the **Navigation menu**, select **Filestore**. This will take you to the instances page. When your instance has a green check next to it you can return to your SSH session and try the `sudo mount` command again.

![The instances page displaying the nfs-server instance](https://cdn.qwiklabs.com/qgyyXbewK3hoyvukUifWiwtsnTbb3SvG6TacedYnp9w%3D align="left")

6. Make the file share accessible by changing the permissions:
    

```apache
sudo chmod go+rw /mnt/test
```

**Note:** You should set more specific permissions in a production environment. For more information, refer to [Configuring access on a file share](https://cloud.google.com/filestore/docs/access-control#fileshare-access).

## Task 4. Create a file on the file share

1. In the terminal window that is connected to the nfs-client instance, run the following to create a file named testfile:
    

```apache
echo 'This is a test' > /mnt/test/testfile
```

2. Confirm the file was created by running the following command:
    

```apache
ls /mnt/test
```

You'll see that `testfile` is in the directory.

3. You can see the content of the file by running the following command:
    

```apache
nano /mnt/test/testfile
```

You should see that the file contains the following text:

```apache
This is a test
```

---

## Solution of Lab

%[https://youtu.be/mqLTgB_BYew] 

```apache
curl -LO raw.githubusercontent.com/ArcadeCrew/Google-Cloud-Labs/refs/heads/main/Cloud%20Filestore%20Qwik%20Start/arcadecrew.sh
sudo chmod +x arcadecrew.sh
./arcadecrew.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744776671496/b1925ac8-1cb5-4f5f-8e5b-b615abcf21e7.png align="center")