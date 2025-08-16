---
title: "Configuring Private Google Access and Cloud NAT - GSP459"
seoTitle: "Configuring Private Google Access and Cloud NAT - GSP459"
seoDescription: "Learn to configure Private Google Access and Cloud NAT in Google Cloud for VMs without external IPs. Enhance network security and efficiency"
datePublished: Sat Aug 16 2025 05:24:18 GMT+0000 (Coordinated Universal Time)
cuid: cmedtbaa8000502ih0nh1bd84
slug: configuring-private-google-access-and-cloud-nat-gsp459
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755321459860/0ed96991-3e37-4634-bfae-6e328f145af9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755321589410/25cff509-f224-4ae8-94c2-004903b61764.png
tags: configuring-private-google-access-and-cloud-nat-gsp459, configuring-private-google-access-and-cloud-nat, gsp459, cloud-nat, configuring-private-google-access, private-google-access, private-google, google-access

---

## Overview

Google Cloud’s [Network Address Translation (NAT) service](https://cloud.google.com/nat/) enables you to provision your application instances without public IP addresses while also allowing them to access the internet for updates, patching, config management, and more in a controlled and efficient manner.

In this lab, you will configure Private Google Access and Cloud NAT for a VM instance that doesn't have an external IP address. Then, you will verify access to public IP addresses of Google APIs and services and other connections to the internet. Finally, you will use Cloud NAT logging to record connections made in your gateway.

### What you'll learn

In this lab, you will learn how to perform the following tasks:

* Configure a VM instance that doesn't have an external IP address.
    
* Create a bastion host to connect to the VM that doesn't have an external IP address.
    
* Enable Private Google Access on a subnet.
    
* Configure a Cloud NAT gateway.
    
* Verify access to public IP addresses of Google APIs and services and other connections to the internet.
    
* Log NAT connections with Cloud NAT logging.
    

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
    student-00-1d2fcb9ad714@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    XmAJKEIuSHBs
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-8a55d3aa934e`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-8a55d3aa934e
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
ACCOUNT: student-00-1d2fcb9ad714@qwiklabs.net

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
project = qwiklabs-gcp-04-8a55d3aa934e
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Create the VM instances

You will now create one VM instance that has no external IP address and another VM instance to serve as a bastion host.

### Create a VPC network and firewall rules

First, create a VPC network for the VM instances and a firewall rule to allow SSH access.

1. In the Cloud Console, on the **Navigation menu** (), click **VPC network** &gt; **VPC networks**.
    
2. Click **Create VPC Network**.
    
3. For **Name**, type **privatenet**.
    
4. For **Subnet creation mode**, click **Custom**.
    
5. Specify the following, and leave the remaining settings as their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | privatenet-us |
    | Region | `us-west1` |
    | IP address range | 10.130.0.0/20 |
    
    **Note:** Don't enable **Private Google access** yet!
    
6. Click **Done**.
    
7. Click **Create** and wait for the network to be created.
    
8. In the left pane, click **Firewall**.
    
9. Click **Create Firewall Rule**.
    
10. Specify the following, and leave the remaining settings as their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | privatenet-allow-ssh |
    | Network | privatenet |
    | Targets | All instances in the network |
    | Source filter | IPv4 ranges |
    | Source IPv4 ranges | 0.0.0.0/0 |
    | Protocols and ports | Specified protocols and ports |
    
11. For **tcp**, specify port **22**.
    
12. Click **Create**.
    

Click **Check my progress** to verify the objective.

Create a VPC network and firewall rules

### Create the VM instance with no public IP address

1. In the Cloud Console, on the **Navigation menu** (), click **Compute Engine** &gt; **VM instances**.
    
2. Click **Create Instance**.
    
3. In the **Machine configuration**.
    
    Select the following values:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | **Name** | `vm-internal` |
    | **Region** | `us-west1` |
    | **Zone** | `us-west1-a` |
    | **Series** | `E2` |
    | **Machine type** | `e2-medium(2 vCPU, 1 core, 4 GB memory)` |
    
4. Click **Networking**.
    
    For **Network interfaces**, expand the **default** specify the following:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | **Network** | `privatenet` |
    | **Subnetwork** | `privatenet-us` |
    | **External IPv4 address** | `None` |
    
    **Note:** The default setting for a VM instance is to have an ephemeral external IP address. This behavior can be changed with a policy constraint at the organization or project level. To learn more about controlling external IP address on VM instances, refer to the [Restricting external IP addresses to specific VMs](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address#disableexternalip).
    
5. Click **Done**.
    
6. Click **Create**.
    
7. On the **VM instances** page, verify that the **External IP** of **vm-internal** is **None**.
    

![VM instances page with the External IP highlighted](https://cdn.qwiklabs.com/qtF0iHgrDXGJASgqK9gDxN0tj%2B15tiUmFIcX8pfGPko%3D align="left")

Click **Check my progress** to verify the objective.

Create the VM instance with no public IP address

### Create the bastion host

Because **vm-internal** has no external IP address, it can only be reached by other instances on the network or via a managed VPN gateway. This includes SSH access to **vm-internal**, which is grayed out (unavailable) in the Cloud Console.

In order to connect via SSH to **vm-internal**, create a bastion host **vm-bastion** on the same VPC network as **vm-internal**.

1. In the Cloud Console, on the **VM instances** page, click **Create Instance**.
    
2. In the **Machine configuration**.
    
    Select the following values:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | **Name** | `vm-bastion` |
    | **Region** | `us-west1` |
    | **Zone** | `us-west1-a` |
    | **Series** | `E2` |
    | **Machine type** | `e2-micro (2vCPU)` |
    
3. Click **Networking**.
    
    For **Network interfaces**, expand **default** and specify the following:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | **Network** | `privatenet` |
    | **Subnetwork** | `privatenet-us` |
    | **External IPv4 address** | `Ephemeral` |
    
    Click **Done**.
    
4. Click **Security**.
    
    * In **Identity and API access**.
        
        * **Access scopes**: `Set access for each API`
            
        * **Compute Engine**: `Read Write`
            
5. Click **Create**.
    

**Note:** By creating **vm-bastion** in the same VPC network as **vm-internal**, you will be able to access **vm-internal** through its internal IP address or host name.

Click **Check my progress** to verify the objective.

Create the Bastion host

### SSH to vm-bastion and verify access to vm-internal

Verify that you can access **vm-internal** through **vm-bastion**.

1. For **vm-bastion**, click **SSH** to launch a terminal and connect.
    

2\. From the **vm-bastion** SSH terminal, verify external connectivity by running the following command:

```apache
ping -c 2 www.google.com
```

This should work!

3. Connect to **vm-internal** by running the following command:
    

```apache
gcloud compute ssh vm-internal --zone=us-west1-a --internal-ip
```

4. When asked if you want to continue, enter `Y`.
    
5. When prompted for a passphrase, press **ENTER** for no passphrase, then **ENTER** again.
    

Did the command prompt change to @vm-internal?TrueFalse

6. Test the external connectivity of **vm-internal** by running the following command:
    

```apache
ping -c 2 www.google.com
```

This should not work because **vm-internal** has no external IP address!

7. Wait for the `ping` command to complete.
    
8. Close the connection to **vm-internal** by running the following command:
    

```apache
exit
```

9. Close the SSH terminal of **vm-bastion** by running the following command:
    

```apache
exit
```

**Note:** When instances do not have external IP addresses, they can only be reached by other instances on the network or via a managed VPN gateway. In this case, **vm-bastion** serves as a management and maintenance interface to **vm-internal**.

## Task 2. Enable private Google access

VM instances that have no external IP addresses can use Private Google Access to reach external IP addresses of Google APIs and services. By default, Private Google Access is disabled on a VPC network.

### Create a Cloud Storage bucket

Create a Cloud Storage bucket to test access to Google APIs and services.

1. In the Cloud Console, on the **Navigation menu** (), click **Cloud Storage &gt; Buckets**.
    
2. Click **Create**.
    
3. Specify the following, and leave the remaining settings as their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | `Enter a globally unique name` |
    | Default storage class | Multi-Regional |
    
4. Click **Create**.
    
5. Note the name of your storage bucket for the next subtask. It will be referred to as `[my_bucket]`.
    

### Copy an image file into your bucket

Copy an image from a public Cloud Storage bucket to your own bucket.

1. Run the following command in Cloud Shell, replacing `[my_bucket]` with your bucket's name:
    

```apache
gsutil cp gs://cloud-training/gcpnet/private/access.png gs://[my_bucket]
```

2. In the Cloud Console, click **Refresh** to verify that the image was copied.
    

You can click on the name of the image in the Cloud Console to view an example of how Private Google Access is implemented.

### Access the image from your VM instances

1. In the Cloud Console, on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), click **Compute Engine** &gt; **VM instances**.
    

Currently, which of your VM instances can access the image from your bucket?vm-internalvm-bastion

2. For **vm-bastion**, click **SSH** to launch a terminal and connect.
    
3. Try to copy the image to **vm-bastion** by running the following command, replacing `[my_bucket]` with your bucket's name:
    

```apache
gsutil cp gs://[my_bucket]/*.png .
```

This should work because **vm-bastion** has an external IP address!

4. Connect to **vm-internal** by running the following command:
    

```apache
gcloud compute ssh vm-internal --zone=us-west1-a --internal-ip
```

5. If prompted, type **Y** to continue.
    
6. Try to copy the image to **vm-internal** by running the following command, replacing `[my_bucket]` with your bucket's name:
    

```apache
gsutil cp gs://[my_bucket]/*.png .
```

**Note:** This should not work: **vm-internal** can only send traffic within the VPC network because Private Google Access is disabled (by default).

7. To terminate the request after the first attempt, press CTRL+C.
    
8. Close the SSH terminal.
    

### Enable private Google access

Private Google access is enabled at the subnet level. When it is enabled, instances in the subnet that only have private IP addresses can send traffic to Google APIs and services through the default route (0.0.0.0/0) with a next hop to the default internet gateway.

1. In the Cloud Console, on the **Navigation menu** (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), click **VPC network &gt; VPC networks**.
    
2. Click **privatenet &gt; privatenet-us** to open the subnet.
    
3. Click **Edit**.
    
4. For **Private Google access**, select **On**.
    
5. Click **Save**.
    

**Note:** Yes, enabling Private Google Access is as simple as selecting **On** for **Private Google access** within the subnet!

6. In the Cloud Console, on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), click **Compute Engine** &gt; **VM instances**.
    
7. For **vm-bastion**, click **SSH** to launch a terminal and connect.
    
8. Connect to **vm-internal** by running the following command:
    

```apache
gcloud compute ssh vm-internal --zone=us-west1-a --internal-ip
```

9. If prompted, type **Y** to continue.
    
10. Try to copy the image to **vm-internal** by running the following command:
    

```apache
gsutil cp gs://[my_bucket]/*.png .
```

This should work as **vm-internal**'s subnet has **Private Google Access** enabled!

11. Close the SSH terminal.
    

**Note:** To view the eligible APIs and services that you can use with Private Google Access, see supported services in the [Private Google Access overview](https://cloud.google.com/vpc/docs/private-access-options#pga-supported).

Click **Check my progress** to verify the objective.

Create a Cloud Storage Bucket and Enable Private Google Access

## Task 3. Configure a Cloud NAT gateway

Although **vm-internal** can now access certain Google APIs and services without an external IP address, the instance cannot access the internet for updates and patches. You will now configure a Cloud NAT gateway, which allows **vm-internal** to reach the internet.

### Try to update the VM instances

1. For **vm-bastion**, click **SSH** to launch a terminal and connect.
    
2. Try to re-synchronize the package index of **vm-bastion** by running the following:
    

```apache
sudo apt-get update
```

The output should look like this:

```apache
...
Reading package lists... Done
```

This should work because **vm-bastion** has an external IP address!

3. Connect to **vm-internal** by running the following command:
    

```apache
gcloud compute ssh vm-internal --zone=us-west1-a --internal-ip
```

4. If prompted, type **Y** to continue.
    
5. Try to re-synchronize the package index of **vm-internal** by running the following:
    

```apache
sudo apt-get update
```

This should only work for Google Cloud packages because **vm-internal** only has access to Google APIs and services!

6. Press CTRL+C to stop the request.
    
7. Close the SSH terminal.
    

### Configure a Cloud NAT gateway

Cloud NAT is a regional resource. You can configure it to allow traffic from all ranges of all subnets in a region, from specific subnets in the region only, or from specific primary and secondary CIDR ranges only.

1. In the Cloud Console, on the **Navigation menu** (), click **Network services** &gt; **Cloud NAT**.
    
2. Click **Get started** to configure a NAT gateway.
    
3. Specify the following:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Gateway name | nat-config |
    | Network | privatenet |
    | Region | `us-west1` |
    
4. For **Cloud Router**, select **Create new router**.
    
5. For **Name**, type **nat-router**.
    
6. Click **Create**.
    

**Note:** The NAT mapping section allows you to choose the subnets to map to the NAT gateway. You can also manually assign static IP addresses that should be used when performing NAT. Do not change the NAT mapping configuration in this lab.

7. Click **Create**.
    
8. Wait for the gateway's **Status** to change to **Running**.
    

### Verify the Cloud NAT gateway

It may take up to 3 minutes for the NAT configuration to propagate to the VM, so wait at least a minute before trying to access the internet again.

1. In the Cloud Console, on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), click **Compute Engine** &gt; **VM instances**.
    
2. For **vm-bastion**, click **SSH** to launch a terminal and connect.
    
3. Connect to **vm-internal** by running the following command:
    

```apache
gcloud compute ssh vm-internal --zone=us-west1-a --internal-ip
```

4. If prompted, type **Y** to continue.
    
5. Try to re-synchronize the package index of **vm-internal** by running the following:
    

```apache
sudo apt-get update
```

The output should look like this:

```apache
...
Reading package lists... Done
```

This should work because **vm-internal** is using the NAT gateway!

6. Close the SSH terminal.
    

**Note:** The Cloud NAT gateway implements outbound NAT, but not inbound NAT. In other words, hosts outside of your VPC network can only respond to connections initiated by your instances; they cannot initiate their own, new connections to your instances via NAT.

Click **Check my progress** to verify the objective.

Configure a Cloud NAT gateway

## Task 4. Configure and view logs with Cloud NAT Logging

[Cloud NAT logging](https://cloud.google.com/nat/docs/monitoring) allows you to log NAT connections and errors. When Cloud NAT logging is enabled, one log entry can be generated for each of the following scenarios:

* When a network connection using NAT is created.
    
* When a packet is dropped because no port was available for NAT.
    

You can opt to log both kinds of events, or just one or the other. Created logs are sent to Cloud Logging.

### Enabling logging

If logging is enabled, all collected logs are sent to Stackdriver by default. You can filter these so that only certain logs are sent.

You can also specify these values when you create a NAT gateway or by editing one after it has been created. The following directions show how to enable logging for an existing NAT gateway.

1. In the Cloud Console, on the **Navigation menu** (), click **Network services** &gt; **Cloud NAT**.
    
2. Click on the `nat-config` gateway and then click **Edit**.
    
3. Click **Advanced configurations**.
    
4. Under logging, select **Translation and errors** and then click **Save**.
    

### NAT logging in Stackdriver

Now that you have set up Cloud NAT logging for the `nat-config` gateway, let's find out where we can view our logs. You should have left off on the following page with your gateway updated:

![Cloud NAT page](https://cdn.qwiklabs.com/9njTA6rzIV8y%2Fs2%2FUI7QV6ltv%2FfImP3gnLmiu2er2og%3D align="left")

1. Click on `nat-config` to expose its details. Then click **View in Logs Explorer** link.
    
2. This will open a new tab with Logs Explorer—ensure that the top of your page resembles the following:
    

![Cloud Logging page with the Project ID and the Cloud NAT Gateway highlighted](https://cdn.qwiklabs.com/vaPt0DcrfS8nSJjLeMfusBaKNo9UxqV6Mu41ZZk%2B51g%3D align="left")

You will see that there aren't any logs yet—that's because we just enabled this feature for the gateway. **Keep this tab open** and return to your other Cloud Console tab.

### Generating logs

As a reminder, Cloud NAT logs are generated for the following sequences:

* When a network connection using NAT is created.
    
* When a packet is dropped because no port was available for NAT.
    

Let's connect the bastion host to the internal VM again to see if any logs are generated.

1. In the Cloud Console, on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), click **Compute Engine** &gt; **VM instances**.
    
2. For **vm-bastion**, click **SSH** to launch a terminal and connect.
    
3. Connect to **vm-internal** by running the following command:
    

```apache
gcloud compute ssh vm-internal --zone=us-west1-a --internal-ip
```

4. If prompted, type Y to continue.
    
5. Try to re-synchronize the package index of **vm-internal** by running the following:
    

```apache
sudo apt-get update
```

The output should look like this:

```apache
...
Reading package lists... Done
```

6. Close the SSH terminal.
    

Let's see if opening up this connection revealed anything new in our logs.

### Viewing logs

1. Return to your NAT Logging tab and click the **Jump to now** button.
    
2. You should see two new logs that were generated after connecting the bastion host to the internal VM.
    

As we see, the logs give us details on the VPC network we connected to and the connection method we used. Feel free to expand different labels and details.

---

## Solution of Lab

%[https://youtu.be/xkfPGspK0XE] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Configuring%20Private%20Google%20Access%20and%20Cloud%20NAT/quicklabgsp459.sh
sudo chmod +x quicklabgsp459.sh
./quicklabgsp459.sh
```