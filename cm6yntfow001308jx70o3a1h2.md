---
title: "Provision Services with Google Cloud Marketplace - GSP003"
seoTitle: "Provision Services with Google Cloud Marketplace - GSP003"
seoDescription: "Google Cloud Marketplace provides a way to launch common software packages and stacks on Compute Engine with just a few clicks. Many common web frameworks,"
datePublished: Mon Feb 10 2025 06:15:58 GMT+0000 (Coordinated Universal Time)
cuid: cm6yntfow001308jx70o3a1h2
slug: provision-services-with-google-cloud-marketplace-gsp003
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739168127150/47ae8d8c-7e16-4048-bb44-591d1f2f951e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1739168144340/de346f66-b241-4938-b89a-d7c63f301991.png
tags: provision-services-with-google-cloud-marketplace-gsp003, provision-services-with-google-cloud-marketplace, gsp003

---

## **Overview**

Google Cloud Marketplace provides a way to launch common software packages and stacks on Compute Engine with just a few clicks. Many common web frameworks, databases, CMSs, and CRMs are supported. This is one of the fastest ways to get up and running on the Google Cloud.

In this hands-on lab you'll learn how to launch and configure a Marketplace service on the Google Cloud.

### What you'll do

* Launch a common web stack with Marketplace
    
* Verify your deployment
    

## **Setup**

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
    student-03-a6f81c4785b8@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    Mwx3aZDtFU6X
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

## **Task 1. Getting started with Marketplace**

In this section you'll learn how to create Nginx Stack on Compute Engine with Google Cloud Marketplace.

### Navigate to Marketplace

* In the Cloud Console, navigate to **Marketplace**:
    

![The Marketplace option highlighted within the Cloud Console.](https://cdn.qwiklabs.com/52oPe7lAfvwPaCBFr7ziVimWG%2FpnqPMHve3%2BofgV4SI%3D align="left")

You should see the Marketplace home page, which includes a search engine.

### Choosing Nginx

1. In the search box that says "Search Marketplace", type "Nginx".
    
2. Then click on the `Bitnami package for NGINX Open Source` tile to select the platform.
    

![The NGINX Open Source packaged by Bitnami tile, which includes a Launch button.](https://cdn.qwiklabs.com/Xy3zVJHzMVl2MFXHRsPyZEcfDCuxTV2GzpoLhmKXgko%3D align="left")

3. Now click **Get Started**.
    
4. Click the **checkbox** to accept the terms and conditions, then click on **Agree**.
    
5. Click **Deploy**
    
6. If prompted, click on **Enable** for the Compute Engine API and the Infrastructure Manager API.
    

## **Task 2. Launching the Nginx stack**

### VM Instance configuration

Once the project is created you'll be taken to the New Nginx deployment page in the Cloud Console to configure your Nginx instance.

Now do the following:

1. Choose a name for your instance (for example `nginxstack-1`).
    
2. Under **Deployment Service Account**, select **Existing Account** and choose the account Compute Engine default service account `serviceAccount:524792473003-compute@developer.gserviceaccount.com`.
    
3. Select zone as `us-central1-c`.
    

**Note:** See the [Regions and zones](https://cloud.google.com/compute/docs/zones) article for more information about regions and zones.

4. Leave as default:
    
    * **Machine type:** f1-micro (1vCPU, 614MB memory).
        
    * **Boot Disk:** 10 GB SSD.
        
    * **Allow HTTP Traffic** and **Allow HTTPS Traffic** are checked.
        
5. Click **Deploy** to launch your Nginx Stack.
    

![The new Nginx Stack, which includes information about its networking, boot disk, and firewall, along with a Deploy button.](https://cdn.qwiklabs.com/%2Fh8A7bvL%2FgtRX6mxmpj7ZacDJ4LrRaDBIc8ZejfsOEI%3D align="left")

Creating the VM instance and deploying the Nginx Stack may take a few minutes. Cloud Deployment Manager will provide progress details.

Click **Check my progress** to verify the objective.

Launch the Nginx Stack.

Check my progress

## **Task 3. Verifying the deployment**

Once your Nginx stack has been deployed you can verify that everything worked correctly. Your screen should look something like this:

![The nginxstack-1 deployment, with the 'nginxstack-1 is being deployed' message along with its overview and sub-folders.](https://cdn.qwiklabs.com/p7B2I2qHkEKO5ZzCuLQcTa3JXdCkKrpr5B4bvlwt5qc%3D align="left")

### Verifying via the web

* Click on the **Details** tab, and then click the **Site Url** at the bottom to access the deployed Nginx Stack in a new tab.
    

You should see something that looks like this:

![The Congratulations! pop-up, with the 'You are now running Bitnami Nginx 1.10.0-2 in the Cloud notification.](https://cdn.qwiklabs.com/60YVS%2FLNrNIdZ%2BcO0wwD9psuSfsM8BEwqOvbQJyaVfY%3D align="left")

### Verifying via SSH

1. In the Cloud Console, click on the **Resources** tab, and then click on the Resource name(for example `nginxstack-1-vm`) for **Compute Engine**.
    
2. Click on the **SSH** for the VM instance in the console to open an SSH prompt in a new browser window.
    
    You can use standard Unix commands like `ps` to see if Nginx is running on your instance.
    
3. Try typing the following into Cloud Shell:
    

```apache
ps aux | grep nginx
```

**Output:**

```apache
root      1571  0.0  0.3  61316  1920 ?        Ss   18:48   0:00 nginx: master process /opt/bitnami/nginx/sbin/.nginx.bin -p /opt/bitnami/nginx/
daemon    1572  0.0  0.9  98836  5680 ?        S    18:48   0:00 nginx: worker process
student+  7249  0.0  0.1  12780   932 pts/0    S+   18:54   0:00 grep nginx
```

## **Task 4. Test your knowledge**

Test your knowledge about Google Cloud Platform by taking our quiz.

Does Google Cloud Marketplace allow you to deploy a software package now, and scale that deployment later when your applications require additional capacity without updating the software that you have already deployed.

* True
    
* False
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=4slr9p3D6DA&ab_channel=QUICKGCPLAB] 

---

### Step 1: Go to `Bitnami package for NGINX Open Source` from [here](https://console.cloud.google.com/marketplace/product/bitnami-launchpad/nginxstack?)

### Step2: Run the following Commands in CloudShell

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Provision%20Services%20with%20Google%20Cloud%20Marketplace/gsp003.sh
sudo chmod +x gsp003.sh
./gsp003.sh
```