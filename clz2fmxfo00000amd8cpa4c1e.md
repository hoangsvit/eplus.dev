---
title: "Creating a Persistent Disk - GSP004"
seoTitle: "Creating a Persistent Disk - GSP004"
seoDescription: "Compute Engine lets you create and run virtual machines on Google infrastructure. You can create virtual machines running different operating systems, inclu"
datePublished: Fri Jul 26 2024 08:20:24 GMT+0000 (Coordinated Universal Time)
cuid: clz2fmxfo00000amd8cpa4c1e
slug: creating-a-persistent-disk-gsp004
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745299890017/38cf74db-ab51-4cfd-9d69-3a11eea36ae3.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1750394760112/42fb1f0c-2c20-4637-aff6-b2fe268a43a7.png
tags: creating-a-persistent-disk-gsp004, creating-a-persistent-disk, gsp004

---

## **Overview**

Compute Engine lets you create and run virtual machines on Google infrastructure. You can create virtual machines running different operating systems, including multiple flavors of Linux (Debian, Ubuntu, Suse, Red Hat, CoreOS) and Windows Server!

Compute Engine provides persistent disks for use as the primary storage for your virtual machine instances. Like physical hard drives, persistent disks exist independently of the rest of your machine – if a virtual machine instance is deleted, the attached persistent disk continues to retain its data and can be attached to another instance.

**Note:** There are 2 types of persistent disks:

* Standard persistent disk
    
* SSD Persistent disk
    

Learn more about the differences in [Storage Option](https://cloud.google.com/compute/docs/disks/#pdspecs). Each type of persistent disks will have different capacity limits. Read more in the [Persistent Disk documentation](https://cloud.google.com/compute/docs/disks/persistent-disks#pdlimits).

In this hands-on lab, you'll learn how to create a persistent disk and attach it to a virtual machine.

### What you'll learn

* Create a new VM instance and attach a persistent disk
    
* Format and mount a persistent disk
    

### Prerequisites

* Familiarity with standard Linux text editors such as `vim`, `emacs` or `nano` will be helpful
    

## **Task 1. Create a new instance**

First, create a Compute Engine virtual machine instance that has only a boot disk.

**Note:** You can learn more by creating a virtual machine instance in a different lab, or refer to the [Compute Engine documentation](https://cloud.google.com/compute/docs/).

1. In Cloud Shell command line, use the `gcloud` command to create a new virtual machine instance named `gcelab`:
    

```powershell
gcloud compute instances create gcelab --zone $ZONE --machine-type e2-standard-2
```

**Example Output:**

```powershell
Created [...].
NAME       ZONE           MACHINE_TYPE  PREEMPTIBLE INTERNAL_IP EXTERNAL_IP    STATUS
gcelab     us-west1-c e2-standard-2             10.240.X.X  X.X.X.X        RUNNING
```

The newly created virtual machine instance will have a default 10 GB persistent disk as the boot disk.

Click **Check my progress** to verify the objective.

Create a new instance in the specified zone.

## **Task 2. Create a new persistent disk**

**Note:** Because you want to attach this disk to the virtual machine instance you created in the previous step, the zone must be the same.

1. Still in the Cloud Shell command line, use the following command to create a new disk named `mydisk`:
    

```powershell
gcloud compute disks create mydisk --size=200GB \
--zone $ZONE
```

**Output:**

```powershell
NAME   ZONE          SIZE_GB TYPE        STATUS
mydisk us-west1-c 200      pd-standard READY
```

Click **Check my progress** to verify the objective.

Create a new persistent disk in the specified zone

## **Task 3. Attaching a disk**

### Attaching the persistent disk

You can attach a disk to a running virtual machine. Attach the new disk (`mydisk`) to the virtual machine instance you just created (`gcelab`).

1. Use the following command to attach the disk:
    

```powershell
gcloud compute instances attach-disk gcelab --disk mydisk --zone $ZONE
```

**Output:**

```powershell
Updated [https://www.googleapis.com/compute/v1/projects/qwiklabs-gcp-d12e3215bb368ac5/zones/us-west1-c/instances/gcelab].
```

That's it!

### Finding the persistent disk in the virtual machine

The persistent disk is now available as a block device in the virtual machine instance. Let's take a look.

1. SSH into the virtual machine:
    

```powershell
gcloud compute ssh gcelab --zone $ZONE
```

**Output:**

```powershell
WARNING: The public SSH key file for gcloud does not exist.
WARNING: The private SSH key file for gcloud does not exist.
WARNING: You do not have an SSH key for gcloud.
WARNING: SSH keygen will be executed to generate a key.
This tool needs to create the directory
[/home/gcpstaging8246_student/.ssh] before being able to generate SSH
keys.
Do you want to continue (Y/n)?  y
```

2. At the prompt, enter Y to continue.
    
3. When prompted for an RSA key pair passphrase, press ENTER for no passphrase, and then press ENTER again to confirm no passphrase.
    

**Output:**

```powershell
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/gcpstaging8246_student/.ssh/google_compute_en
gine.
Your public key has been saved in /home/gcpstaging8246_student/.ssh/google_compute_engine
.pub.
The key fingerprint is:
6c:04:bf:29:95:0d:93:bc:fe:00:2c:85:86:f8:7a:53 gcpstaging8246_student@cs-6000-devshell-v
m-dbb9559d-4412-4801-ad8c-bdaf885541a9
The key's randomart image is:
+---[RSA 2048]----+
| . . ...o.       |
|. . o .oo=       |
| . . o  =..      |
|  . E o+.o       |
| . . ..oS        |
|. o    oo        |
| . .     o       |
|          .      |
|                 |
+-----------------+
Updating project ssh metadata...\Updated [https://www.googleapis.com/compute/v1/projects/
qwiklabs-gcp-d12e3215bb368ac5].
Updating project ssh metadata...done.
Waiting for SSH key to propagate.
Warning: Permanently added 'compute.7714273689800906026' (ECDSA) to the list of known hosts.
Linux gcelab 4.9.0-4-amd64 #1 SMP Debian 4.9.51-1 (2017-09-28) x86_64
The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.
Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
```

4. Now find the disk device by listing the disk devices in `/dev/disk/by-id/.`:
    

```powershell
ls -l /dev/disk/by-id/
```

**Output:**

```powershell
lrwxrwxrwx 1 root root  9 Feb 27 02:24 google-persistent-disk-0 -> ../../sda
lrwxrwxrwx 1 root root 10 Feb 27 02:24 google-persistent-disk-0-part1 -> ../../sda1
lrwxrwxrwx 1 root root  9 Feb 27 02:25 google-persistent-disk-1 -> ../../sdb
lrwxrwxrwx 1 root root  9 Feb 27 02:24 scsi-0Google_PersistentDisk_persistent-disk-0 -> ../../sda
lrwxrwxrwx 1 root root 10 Feb 27 02:24 scsi-0Google_PersistentDisk_persistent-disk-0-part1 -> ../../sda1
lrwxrwxrwx 1 root root  9 Feb 27 02:25 scsi-0Google_PersistentDisk_persistent-disk-1 -> ../../sdb
```

You found the file, the default name is:

`scsi-0Google_PersistentDisk_persistent-disk-1.`

**Note:** If you want a different device name, when you attach the disk, you would specify the `device-name` parameter. For example, to specify a device name, when you attach the disk you would use the command:

`gcloud compute instances attach-disk gcelab --disk mydisk --device-name <YOUR_DEVICE_NAME> --zone $ZONE`

### Formatting and mounting the persistent disk

Once you find the block device, you can partition the disk, format it, and then mount it using the following Linux utilities:

* `mkfs:` creates a filesystem
    
* `mount`: attaches to a filesystem
    

1. Make a mount point:
    

```powershell
sudo mkdir /mnt/mydisk
```

2. Next, format the disk with a single `ext4` filesystem using the [mkfs](http://manpages.ubuntu.com/manpages/xenial/man8/mkfs.8.html) tool. This command deletes all data from the specified disk:
    

```powershell
sudo mkfs.ext4 -F -E lazy_itable_init=0,lazy_journal_init=0,discard /dev/disk/by-id/scsi-0Google_PersistentDisk_persistent-disk-1
```

**Last lines of the output:**

```powershell
Allocating group tables: done
Writing inode tables: done
Creating journal (262144 blocks): done
Writing superblocks and filesystem accounting information: done
```

3. Now use the [mount](http://manpages.ubuntu.com/manpages/xenial/man8/mount.8.html) tool to mount the disk to the instance with the `discard` option enabled:
    

```powershell
sudo mount -o discard,defaults /dev/disk/by-id/scsi-0Google_PersistentDisk_persistent-disk-1 /mnt/mydisk
```

That's it!

### Automatically mount the disk on restart

By default the disk will not be remounted if your virtual machine restarts. To make sure the disk is remounted on restart, you need to add an entry into `/etc/fstab`.

1. Open `/etc/fstab` in nano to edit:
    

```powershell
sudo nano /etc/fstab
```

2. Add the following below the line that starts with "UUID=...":
    

```powershell
/dev/disk/by-id/scsi-0Google_PersistentDisk_persistent-disk-1 /mnt/mydisk ext4 defaults 1 1
```

`/etc/fstab` content should look like this:

```powershell
# /etc/fstab: static file system information
UUID=12adc097-f36f-46f9-b377-b2a30cdf422f / ext4 rw,discard,errors=remount-ro,x-systemd.growfs 0 1
UUID=3A31-89F9 /boot/efi vfat defaults 0 0
/dev/disk/by-id/scsi-0Google_PersistentDisk_persistent-disk-1 /mnt/mydisk ext4 defaults 1 1
```

3. Save and exit nano by pressing CTRL+O, ENTER, CTRL+X, in that order.
    

Click **Check my progress** to verify the objective.

Attaching and Mounting the persistent disk.

## **Task 4. Test your knowledge**

Test your knowledge about Google cloud Platform by taking this quiz.

Can you prevent the destruction of an attached persistent disk when the instance is deleted?Yes, deselect the option `Delete boot disk when instance is deleted` when creating an instanceYes, use the `–keep-disks` option with the `gcloud compute instances delete` commandNo, attached persistent disks are always associated with the lifetime of the instance

**Submit**

For migrating data from a persistent disk to another region, reorder the following steps in which they should be performed:

1. Attach disk
    
2. Create disk
    
3. Create snapshot
    
4. Create instance
    
5. Unmount file system(s)
    

Choose the correct order(1, 3, 2, 4, 5)(5, 3, 2, 4, 1)(4, 1, 2, 3, 5)(2, 3, 1, 4, 5)

## **Task 5. Local SSDs**

Compute Engine can also attach local SSDs. Local SSDs are physically attached to the server hosting the virtual machine instance to which they are mounted. This tight coupling offers superior performance, with very high input/output operations per second (IOPS) and very low latency compared to persistent disks.

Local SSD performance offers:

* Less than 1 ms of latency
    
* Up to 680,000 read IOPs and 360,000 write IOPs
    

These performance gains require certain trade-offs in availability, durability, and flexibility. Because of these trade-offs, local SSD storage is not automatically replicated and all data can be lost in the event of a host error or a user configuration error that makes the disk unreachable. Users must take extra precautions to backup their data.

This lab does not cover local SSDs.

* To maximize the local SSD performance, you'll need to use a special Linux image that supports NVMe. You can learn more about local SSDs in the [Local SSD documentation](https://cloud.google.com/compute/docs/disks/local-ssd#create_a_local_ssd).
    

---

## Solution of Lab

%[https://youtu.be/HYGq8n2rL8Q] 

```apache
curl -LO raw.githubusercontent.com/ArcadeCrew/Google-Cloud-Labs/refs/heads/main/Creating%20a%20Persistent%20Disk/arcadecrew.sh
sudo chmod +x arcadecrew.sh
./arcadecrew.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1750394775370/cfa22ea3-510d-45d5-9a11-ccc03d8ae35d.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1750394783734/b181218e-4622-4ebf-b801-3e2a74414169.png align="center")