---
title: "Setting up a Private Kubernetes Cluster - GSP178"
seoTitle: "Setting up a Private Kubernetes Cluster - GSP178"
seoDescription: "In Kubernetes Engine, a private cluster is a cluster that makes your master inaccessible from the public internet. In a private cluster, nodes do not have p"
datePublished: Sun Aug 18 2024 12:02:45 GMT+0000 (Coordinated Universal Time)
cuid: clzziph9o003f09kzbu2t2lv2
slug: setting-up-a-private-kubernetes-cluster-gsp178
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747462914915/8873791c-a037-427f-a324-8c36972252ca.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747462928080/0d3b01d4-c4a3-43f4-b011-3e9949c72bbb.png
tags: setting-up-a-private-kubernetes-cluster-gsp178, gsp178, setting-up-a-private-kubernetes-cluster

---

## **Overview**

In Kubernetes Engine, a private cluster is a cluster that makes your master inaccessible from the public internet. In a private cluster, nodes do not have public IP addresses, only private addresses, so your workloads run in an isolated environment. Nodes and masters communicate with each other using VPC peering.

In the Kubernetes Engine API, address ranges are expressed as Classless Inter-Domain Routing (CIDR) blocks.

In this lab, you learn how to create a private Kubernetes cluster.

### What you'll do

* Create a Private Kubernetes Cluster.
    

### Prerequisites

* Student should already have experience creating and launching Kubernetes Clusters and be thoroughly versed in IP addressing in CIDR Range formats.
    

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
    student-04-af17446892fb@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    862LeHtJfHwF
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-1137ab5db885`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-1137ab5db885
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
ACCOUNT: student-04-af17446892fb@qwiklabs.net

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
project = qwiklabs-gcp-04-1137ab5db885
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Set the region and zone**

1. Set the project region for this lab:
    

```apache
gcloud config set compute/zone us-west1-a
```

2. Create a variable for region:
    

```apache
export REGION=us-west1
```

3. Create a variable for zone:
    

```apache
export ZONE=us-west1-a
```

Learn more from the [Regions & Zones documentation](https://cloud.google.com/compute/docs/regions-zones/regions-zones).

**Note:** When you run `gcloud` on your own machine, the config settings are persisted across sessions. But in Cloud Shell, you need to set this for every new session or reconnection.

## **Task 2. Creating a private cluster**

1. When you create a private cluster, you must specify a `/28` CIDR range for the VMs that run the Kubernetes master components and you need to enable IP aliases.
    

Next you'll create a cluster named `private-cluster`, and specify a CIDR range of `172.16.0.16/28` for the masters. When you enable IP aliases, you let Kubernetes Engine automatically create a subnetwork for you.

You'll create the private cluster by using the `--private-cluster`, `--master-ipv4-cidr`, and `--enable-ip-alias` flags.

2. Run the following to create the cluster:
    

```apache
gcloud beta container clusters create private-cluster \
    --enable-private-nodes \
    --master-ipv4-cidr 172.16.0.16/28 \
    --enable-ip-alias \
    --create-subnetwork ""
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a private cluster, you will see an assessment score.

Create a private cluster

**Check my progress**

## **Task 3. View your subnet and secondary address ranges**

1. List the subnets in the default network:
    

```apache
gcloud compute networks subnets list --network default
```

2. In the output, find the name of the subnetwork that was automatically created for your cluster. For example, `gke-private-cluster-subnet-xxxxxxxx`. Save the name of the cluster, you'll use it in the next step.
    
3. Now get information about the automatically created subnet, replacing `[SUBNET_NAME]` with your subnet by running:
    

```apache
gcloud compute networks subnets describe [SUBNET_NAME] --region=$REGION
```

The output shows you the primary address range with the name of your GKE private cluster and the secondary ranges:

```apache
...
ipCidrRange: 10.0.0.0/22
kind: compute#subnetwork
name: gke-private-cluster-subnet-163e3c97
...
privateIpGoogleAccess: true
...
secondaryIpRanges:
- ipCidrRange: 10.40.0.0/14
  rangeName: gke-private-cluster-pods-163e3c97
- ipCidrRange: 10.0.16.0/20
  rangeName: gke-private-cluster-services-163e3c97
...
```

In the output you can see that one secondary range is for **pods** and the other secondary range is for **services**.

Notice that `privateIPGoogleAccess` is set to `true`. This enables your cluster hosts, which have only private IP addresses, to communicate with Google APIs and services.

## **Task 4. Enable master authorized networks**

At this point, the only IP addresses that have access to the master are the addresses in these ranges:

* The primary range of your subnetwork. This is the range used for nodes.
    
* The secondary range of your subnetwork that is used for pods.
    

To provide additional access to the master, you must authorize selected address ranges.

### Create a VM instance

1. Create a source instance which you'll use to check the connectivity to Kubernetes clusters:
    

```apache
gcloud compute instances create source-instance --zone=$ZONE --scopes 'https://www.googleapis.com/auth/cloud-platform'
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a VM instance, you will see an assessment score.

Create a VM instance

**Check my progress**

2. Get the `<External_IP>` of the `source-instance` with:
    

```apache
gcloud compute instances describe source-instance --zone=$ZONE | grep natIP
```

**Example Output:**

```apache
natIP: 35.192.107.237
```

3. Copy the `<nat_IP>` address and save it to use in later steps.
    
4. Run the following to Authorize your external address range, replacing `[MY_EXTERNAL_RANGE]` with the CIDR range of the external addresses from the previous output (your CIDR range is `natIP/32`). With CIDR range as `natIP/32`, we are allowlisting one specific IP address:
    

```apache
gcloud container clusters update private-cluster \
    --enable-master-authorized-networks \
    --master-authorized-networks [MY_EXTERNAL_RANGE]
```

**Note:** In a production environment replace `[MY_EXTERNAL_RANGE]` with your network external address CIDR range.

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully authorized external address range, you will see an assessment score.

Authorize your external address range

**Check my progress**

Now that you have access to the master from a range of external addresses, you'll install `kubectl` so you can use it to get information about your cluster. For example, you can use `kubectl` to verify that your nodes do not have external IP addresses.

1. SSH into `source-instance` with:
    

```apache
gcloud compute ssh source-instance --zone=$ZONE
```

2. Press `Y` to continue. **Enter** through the passphrase questions.
    
3. In SSH shell install `kubectl` component of Cloud-SDK:
    

```apache
sudo apt-get install kubectl
```

4. Configure access to the Kubernetes cluster from SSH shell with:
    

```apache
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
gcloud container clusters get-credentials private-cluster --zone=$ZONE
```

**Note:** Please make sure that the assigned zone has been exported in the `ZONE` variable.

5. Verify that your cluster nodes do not have external IP addresses:
    

```apache
kubectl get nodes --output yaml | grep -A4 addresses
```

The output shows that the nodes have internal IP addresses but do not have external addresses:

```apache
...
addresses:
- address: 10.0.0.4
  type: InternalIP
- address: ""
  type: ExternalIP
...
```

6. Here is another command you can use to verify that your nodes do not have external IP addresses:
    

```apache
kubectl get nodes --output wide
```

The output shows an empty column for `EXTERNAL-IP`:

```apache
STATUS ... VERSION        EXTERNAL-IP   OS-IMAGE ...
Ready      v1.8.7-gke.1                 Container-Optimized OS from Google
Ready      v1.8.7-gke.1                 Container-Optimized OS from Google
Ready      v1.8.7-gke.1                 Container-Optimized OS from Google
```

7. Close the SSH shell by typing:
    

```apache
exit
```

## **Task 5. Clean Up**

1. Delete the Kubernetes cluster:
    

```apache
gcloud container clusters delete private-cluster --zone=$ZONE
```

2. Press `Y` to continue.
    

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully deleted the Kubernetes cluster, you will see an assessment score.

Delete the Kubernetes cluster

**Check my progress**

## **Task 6. Create a private cluster that uses a custom subnetwork**

In the previous section Kubernetes Engine automatically created a subnetwork for you. In this section, you'll create your own custom subnetwork, and then create a private cluster. Your subnetwork has a primary address range and two secondary address ranges.

1. Create a subnetwork and secondary ranges:
    

```apache
gcloud compute networks subnets create my-subnet \
    --network default \
    --range 10.0.4.0/22 \
    --enable-private-ip-google-access \
    --region=$REGION \
    --secondary-range my-svc-range=10.0.32.0/20,my-pod-range=10.4.0.0/14
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a subnetwork and secondary ranges in `us-west1` region, you will see an assessment score.

Create a subnetwork and secondary ranges in `us-west1` region

**Check my progress**

2. Create a private cluster that uses your subnetwork:
    

```apache
gcloud beta container clusters create private-cluster2 \
    --enable-private-nodes \
    --enable-ip-alias \
    --master-ipv4-cidr 172.16.0.32/28 \
    --subnetwork my-subnet \
    --services-secondary-range-name my-svc-range \
    --cluster-secondary-range-name my-pod-range \
    --zone=$ZONE
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a private cluster that uses your subnetwork, you will see an assessment score.

Create a private cluster that uses your subnetwork

**Check my progress**

3. Retrieve the external address range of the source instance:
    

```apache
gcloud compute instances describe source-instance --zone=$ZONE | grep natIP
```

**Example Output:**

```apache
natIP: 35.222.210.67
```

4. Copy the `<nat_IP>` address and save it to use in later steps.
    
5. Run the following to Authorize your external address range, replacing `[MY_EXTERNAL_RANGE]` with the CIDR range of the external addresses from the previous output (your CIDR range is `natIP/32`). With CIDR range as `natIP/32`, we are allowlisting one specific IP address:
    

```apache
gcloud container clusters update private-cluster2 \
    --enable-master-authorized-networks \
    --zone=$ZONE \
    --master-authorized-networks [MY_EXTERNAL_RANGE]
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully authorized your external address range for a private cluster in a custom subnetwork, you will see an assessment score.

Authorize your external address range for private cluster in custom subnetwork

**Check my progress**

6. SSH into `source-instance` with:
    

```apache
gcloud compute ssh source-instance --zone=$ZONE
```

7. Configure access to the Kubernetes cluster from SSH shell with:
    

```apache
gcloud container clusters get-credentials private-cluster2 --zone=$ZONE
```

**Note:** Please make sure that the assigned zone has been exported in the `ZONE` variable.

8. Verify that your cluster nodes do not have external IP addresses:
    

```apache
kubectl get nodes --output yaml | grep -A4 addresses
```

The output shows that the nodes have internal IP addresses but do not have external addresses:

```apache
...
addresses:
- address: 10.0.4.3
  type: InternalIP
...
```

At this point, the only IP addresses that have access to the master are the addresses in these ranges:

* The primary range of your subnetwork. This is the range used for nodes. In this example, the range for nodes is `10.0.4.0/22`.
    
* The secondary range of your subnetwork that is used for pods. In this example, the range for pods is `10.4.0.0/14`.
    

---

## Solution of Lab

%[https://youtu.be/UqzEviTysSw] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1753256425656/b6bf47a8-e990-45e6-8714-0c28cd487066.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1747462785455/94fea337-cc0f-4a32-a636-f375d605d80c.png align="center")

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Setting%20up%20a%20Private%20Kubernetes%20Cluster/techcps178.sh
sudo chmod +x techcps178.sh
./techcps178.sh
```