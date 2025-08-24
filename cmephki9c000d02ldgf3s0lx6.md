---
title: "Media CDN: Qwik Start - GSP1044"
seoTitle: "Media CDN: Qwik Start - GSP1044"
seoDescription: "Learn to set up Google Cloud Media CDN for efficient content delivery with edge cache, bucket creation, and origin configuration hands-on"
datePublished: Sun Aug 24 2025 09:28:47 GMT+0000 (Coordinated Universal Time)
cuid: cmephki9c000d02ldgf3s0lx6
slug: media-cdn-qwik-start-gsp1044
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756027293567/95ff2a66-118d-4003-9bf9-b658182c4e8b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756027698401/506239bb-79c5-4a69-8bcb-d9afffac67f8.png
tags: cdn, media-cdn-qwik-start-gsp1044, media-cdn-qwik-start, gsp1044, media-cdn

---

## Overview

Media CDN is Google Cloud's media delivery solution. [Media CDN](https://cloud.google.com/media-cdn/docs/overview) complements [Cloud CDN](https://cloud.google.com/cdn/docs/overview), which is Google Cloud's web acceleration solution. Media CDN is optimized for high-throughput egress workloads, such as streaming video and large file downloads.

An edge cache is typically server infrastructure that stores content closer to end users, located within points of presence (PoPs) or partner ISPs. Media CDN uses Google's global edge-caching infrastructure to serve your content as close to your users as possible. By using Google's infrastructure to serve content, you can reduce load on your origin infrastructure.

Media CDN lets you easily fetch content from publicly accessible HTTP endpoints. You can use Media CDN with your existing origin infrastructure, whether the content is hosted within Cloud Storage, in another cloud, or within your on-premises infrastructure.

You can control how content is cached for each URI you serve in a route. Using a route lets you optimize behavior based on the type of content, client attributes, and your freshness requirements for each route you define with Media CDN.

## Objectives

In this lab, you will:

* Set up Media CDN in front of a Cloud Storage bucket
    
* Retrieve the IP address
    
* Test caching
    

## Setup and Requirements

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
    student-00-abd43b6494c9@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    Bd8MPhemuQqI
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

## Task 1 - Enable Required Services

To configure and deploy Media CDN services, you need to enable both the Network Services API and the Certificate Manager API in your project.

1. In the Google Cloud Console, navigate to **Navigation menu** &gt; **APIs & Services** &gt; **Library**.
    
2. Search for `Network Services API`.
    
3. Click on the API and click **Enable**.
    
4. Repeat steps 1-3 to enable the `Certificate Manager API`.
    

Click **Check my progress** to verify your performed task.

Enable Required Services.

## Task 2 - Create a Bucket with public access

1. In the Google Cloud Console, navigate to **Navigation menu** &gt; **Cloud Storage** &gt; **Buckets**.
    
2. Click **Create Bucket**.
    
3. For **Name your bucket**, enter `qwiklabs-gcp-03-d835c84f3ef3`.
    
4. Leave all other fields with their default value and click **Create**.
    
5. Click **Confirm** for the `Public access will be prevented` pop-up.
    
6. After the bucket has been created, click **Permissions**.
    
7. Click **Remove Public Access Prevention** and then click **Confirm**.
    
8. Click **+Grant Access**.
    
9. In **New principals**, type `allUsers` then select the choice from the dropdown menu.
    
10. For **role**, select **Cloud Storage** &gt; **Storage Object Viewer**.
    
11. Click **Save**.
    
12. Click **Allow public access**.
    

Click **Check my progress** to verify your performed task.

Create a Bucket with public access.

## Task 3 - Create an Origin

An `EdgeCacheOrigin` represents a content location, such as a Cloud Storage bucket, a third-party storage location, or a load balancer.

In this case, you create an origin that maps to your Cloud Storage bucket named `qwiklabs-gcp-03-d835c84f3ef3`.

1. In the **Navigation menu**, **View All Products** navigate to **Network services** &gt; **Network services** &gt; **Cloud CDN**.
    
2. Click **Add Origin**.
    
3. For **Origin type**, select **Backend bucket**.
    
4. For **Define your backend bucket**, click **Browse**, click `qwiklabs-gcp-03-d835c84f3ef3` and click **Select**.
    
5. For **Origin Name**, type `cloud-storage-origin`.
    
6. Click **Next**.
    
7. For **Attach a load balancer**, select **Create new load balancer for me**.
    
8. For **Load Balancer name**, type `cloud-storage-origin-load-balancer`.
    
9. Click **Next** and click **Done**.
    

Click **Check my progress** to verify your performed task.

Create an Origin.

---

## Solution of Lab

%[https://youtu.be/B8COwxjw87k] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Media%20CDN%20Qwik%20Start/quicklabgsp1044.sh
sudo chmod +x quicklabgsp1044.sh
./quicklabgsp1044.sh
```

Open: [https://console.cloud.google.com/net-services/cdn/add](https://console.cloud.google.com/net-services/cdn/add)

1. For **Origin type**, select **Backend bucket**.
    
2. For **Define your backend bucket**, click **Browse**, click `qwiklabs-gcp-03-d835c84f3ef3` and click **Select**.
    
3. For **Origin Name**, type `cloud-storage-origin`.
    
4. Click **Next**.
    
5. For **Attach a load balancer**, select **Create new load balancer for me**.
    
6. For **Load Balancer name**, type `cloud-storage-origin-load-balancer`.
    
7. Click **Next** and click **Done**.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756027667070/a35696ec-f3ff-477d-bc57-548fcc572b79.png align="center")