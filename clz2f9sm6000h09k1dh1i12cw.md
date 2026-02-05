---
title: "Creating a Virtual Machine - GSP001"
seoTitle: "Creating a Virtual Machine - GSP001"
seoDescription: "Compute Engine allows you to create virtual machines (VMs) that run different operating systems, including multiple flavors of Linux (Debian, Ubuntu, Suse,"
datePublished: Fri Jul 26 2024 08:10:11 GMT+0000 (Coordinated Universal Time)
cuid: clz2f9sm6000h09k1dh1i12cw
slug: creating-a-virtual-machine-gsp001
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755325660795/3ae249d5-a192-4d5c-8cb4-9d99ee3dd353.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755326711333/766ebbcd-4c41-4fd5-97bd-574e54fe26f5.png
tags: creating-a-virtual-machine-gsp001, creating-a-virtual-machine, gsp001

---

## **Overview**

Compute Engine allows you to create virtual machines (VMs) that run different operating systems, including multiple flavors of Linux (Debian, Ubuntu, Suse, Red Hat, CoreOS) and Windows Server, on Google infrastructure. You can run thousands of virtual CPUs on a system that is designed to be fast and to offer strong consistency of performance.

In this hands-on lab, you create VM instances of various machine types using the Google Cloud console and the `gcloud` command line in Cloud Shell. You also learn how to connect an NGINX web server to your VM.

Although you can easily copy and paste commands from the lab to the appropriate place, it is recommended that you type the commands yourself to reinforce your understanding of the core concepts.

### What you'll do

* Create a VM with the Cloud console.
    
* Create a VM with the `gcloud` command line.
    
* Deploy a web server and connect it to a VM.
    

### Prerequisites

* Familiarity with standard Linux text editors such as `vim`, `emacs`, or `nano`.
    

## **Task 1. Create a new instance from the Cloud console**

In this section, you create new predefined machine types with Compute Engine from the Cloud console.

1. In the Cloud console, on the **Navigation menu** (), click **Compute Engine** &gt; **VM Instances**.
    
    This may take a minute to initialize for the first time.
    
2. To create a new instance, click **CREATE INSTANCE**.
    
3. There are many parameters you can configure when creating a **new instance**. Use the following for this lab:
    

| **Field** | **Value** | **Additional Information** |
| --- | --- | --- |
| **Name** | **gcelab** | Name for the VM instance |
| **Region** | `europe-west4` | For more information about regions, see the Compute Engine guide, [Regions and Zones](https://cloud.google.com/compute/docs/zones). |
| **Zone** | `europe-west4-a` | **Note:** Remember the zone that you selected to use later. For more information about zones, see the Compute Engine guide, [Regions and Zones](https://cloud.google.com/compute/docs/zones). |
| **Series** | **E2** | Name of the series |
| **Machine Type** | **2 vCPU** | This is an (e2-medium), 2-CPU, 4GB RAM instance. Several machine types are available, ranging from micro instance types to 32-core/208GB RAM instance types. For more information, see the Compute Engine guide, [About machine families](https://cloud.google.com/compute/docs/machine-types). **Note:** A new project has a default [resource quota](https://cloud.google.com/compute/docs/resource-quotas), which may limit the number of CPU cores. You can request more when you work on projects outside this lab. |
| **Boot Disk** | **New 10 GB balanced persistent diskOS Image: Debian GNU/Linux 11 (bullseye)** | Several images are available, including Debian, Ubuntu, CoreOS, and premium images such as Red Hat Enterprise Linux and Windows Server. For more information, see Operating System documentation. |
| **Firewall** | **Allow HTTP traffic** | Select this option in order to access a web server that you install later. **Note:** This automatically creates a firewall rule to allow HTTP traffic on port 80. |

4. Click **Create**.
    
    It should take about a minute for the VM, `gcelab`, to be created. After `gcelab` is created, the **VM Instances** page lists it in the VM instances list.
    
5. To use **SSH** to connect to the VM, click **SSH** to the right of the instance name, `gcelab`.
    
    This launches an SSH client directly from your browser.
    
    **Note:** Learn more about how to use SSH to connect to an instance from the Compute Engine guide, [Connect to Linux VMs using Google tools](https://cloud.google.com/compute/docs/instances/connecting-to-instance).
    

## **Task 2. Install an NGINX web server**

Now you install an NGINX web server, one of the most popular web servers in the world, to connect your VM to something.

1. Update the OS:
    
    ```powershell
    sudo apt-get update
    ```
    
    Copied!content\_copy
    
    **Expected output:**
    
    ```bash
     Get:1 http://security.debian.org stretch/updates InRelease [94.3 kB]
     Ign http://deb.debian.org strech InRelease
     Get:2 http://deb.debian.org strech-updates InRelease [91.0 kB]
     ...
    ```
    
2. Install NGINX:
    
    ```powershell
    sudo apt-get install -y nginx
    ```
    
    Copied!content\_copy
    
    **Expected output:**
    
    ```bash
     Reading package lists... Done
     Building dependency tree
     Reading state information... Done
     The following additional packages will be installed:
     ...
    ```
    
3. Confirm that NGINX is running:
    
    ```apache
    ps auwx | grep nginx
    ```
    
    Copied!content\_copy
    
    **Expected output:**
    
    ```apache
     root      2330  0.0  0.0 159532  1628 ?        Ss   14:06   0:00 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
     www-data  2331  0.0  0.0 159864  3204 ?        S    14:06   0:00 nginx: worker process
     www-data  2332  0.0  0.0 159864  3204 ?        S    14:06   0:00 nginx: worker process
     root      2342  0.0  0.0  12780   988 pts/0    S+   14:07   0:00 grep nginx
    ```
    
4. To see the web page, return to the Cloud console and click the **External IP** link in the row for your machine, or add the **External IP** value to `http://EXTERNAL_IP/` in a new browser window or tab.
    
    This default web page should open:
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1721981297258/87c86707-1b93-4e49-9731-3cb1d26c7208.png align="center")
    
    To check your progress in this lab, click **Check my progress** below. A checkmark means you're successful.
    
    Create a Compute Engine instance and add an NGINX Server to your instance with necessary firewall rules.
    
    **Check my progress**
    

## **Task 3. Create a new instance with gcloud**

Instead of using the Cloud console to create a VM instance, use the command line tool `gcloud`, which is pre-installed in [Google Cloud Shell](https://cloud.google.com/developer-shell/#how_do_i_get_started). Cloud Shell is an interactive shell environment for Google Cloud loaded with all the development tools you need (`gcloud`, `git`, and others) and offers a persistent 5-GB home directory.

**Note:** If you want to try this on your own machine, read the [gcloud command line tool guide](https://cloud.google.com/sdk/gcloud/).

1. In the Cloud Shell, use `gcloud` to create a new VM instance from the command line:
    
    ```apache
    gcloud compute instances create gcelab2 --machine-type e2-medium --zone=$ZONE
    ```
    
    **Expected output:**
    
    ```apache
         Created [...gcelab2].
         NAME: gcelab2
         ZONE:  europe-west4-a
         MACHINE_TYPE: e2-medium
         PREEMPTIBLE:
         INTERNAL_IP: 10.128.0.3
         EXTERNAL_IP: 34.136.51.150
         STATUS: RUNNING
    ```
    
    To check your progress in this lab, click **Check my progress** below. A checkmark means you're successful.
    
    Create a new instance with gcloud.
    
    **Check my progress**
    
    The new instance has these default values:
    
    * The latest [Debian 11 (bullseye)](https://cloud.google.com/compute/docs/images#debian) image.
        
    * The `e2-medium`[machine type](https://cloud.google.com/compute/docs/machine-types).
        
    * A root persistent disk with the same name as the instance; the disk is automatically attached to the instance.
        
    
    When working in your own project, you can specify a [custom machine type](https://cloud.google.com/compute/docs/instances/creating-instance-with-custom-machine-type).
    
2. To see all the defaults, run:
    
    ```bash
    gcloud compute instances create --help
    ```
    
    **Note:** You can set the default region and zones that `gcloud` uses if you are always working within one region/zone and you don't want to append the `--zone` flag every time.
    
    To do this, run these commands:
    
    `gcloud config set compute/zone ...`
    
    `gcloud config set compute/region ...`
    
3. To exit `help`, press **CTRL + C**.
    
4. In the Cloud console, on the **Navigation menu**, click **Compute Engine &gt; VM instances**.  
    Your two new instances should be listed.
    
5. You can also use SSH to connect to your instance via `gcloud`. Make sure to add your zone, or omit the `--zone` flag if you've set the option globally:
    
    ```bash
    gcloud compute ssh gcelab2 --zone=$ZONE
    ```
    
6. Type **Y** to continue.
    
    ```bash
       Do you want to continue? (Y/n)
    ```
    
7. Press **ENTER** through the passphrase section to leave the passphrase empty.
    
    ```bash
       Generating public/private rsa key pair.
       Enter passphrase (empty for no passphrase)
    ```
    
8. After connecting, disconnect from SSH by exiting from the remote shell:
    
    ```bash
     exit
    ```
    

## Task 4. Test your knowledge

Test your knowledge about Google Cloud by taking the quiz. (Please select multiple correct options if necessary.)

Question: **Through which of the following ways can you create a VM instance in Compute Engine?**

* <mark>The gcloud command line tool</mark>
    
* <mark>The Cloud console</mark>
    

---

## Solution of Lab

### New Solution

%[https://www.youtube.com/watch?v=VVCadu58wxk] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP001/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Cloud-Wala-Banda/Labs-Solutions/refs/heads/main/Create%20a%20Virtual%20Machine/gsp001.sh
sudo chmod +x *.sh
./*.sh
```

---

### Old Solution

%[https://www.youtube.com/watch?v=wxVQJEm2MMo&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

NOTE :- Make sure to export the "REGION & ZONE" as shown in video

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755326656607/19df9b02-48a0-40d0-ab80-00fc06687c8c.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755326877842/9dc213a6-33ef-4e41-9235-7aa0f86c678b.png align="center")

**COPY ALL THE COMMAND AND PASTE**

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/d51b46a30325298b314a3c2f90624909dfcd5014/Creating%20a%20Virtual%20Machine/quicklabgsp001.sh
sudo chmod +x quicklabgsp001.sh
./quicklabgsp001.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1721981172435/e843096c-5d3e-4ded-996f-57beab7004ed.png align="center")