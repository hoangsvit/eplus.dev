---
title: "Knowledge Catalog: Qwik Start - Console - GSP1143"
seoTitle: "Knowledge Catalog: Qwik Start - Console - GSP1143"
seoDescription: "Knowledge Catalog is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data warehouses, and data marts to power analytics at scale. Specifically, you can use Knowledge Catalog to build a data mesh architecture, which is an organizational and technical approach that decentralizes data ownership among domain data owners."
datePublished: 2026-07-13T04:49:45.411Z
cuid: cmriqttbb00010ajf3ex34cpf
slug: knowledge-catalog-qwik-start-console-gsp1143
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1c9d17de-da01-430b-81f7-c8075d796a35.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/a9c7a8b9-1bd9-4351-8fc3-2bc79f402b5f.png
tags: gsp1143, knowledge-catalog-qwik-start-console-gsp1143, qwik-start-console-gsp1143

---

## **Overview**

[Knowledge Catalog](https://cloud.google.com/dataplex) is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data warehouses, and data marts to power analytics at scale. Specifically, you can use Knowledge Catalog to build a data mesh architecture, which is an organizational and technical approach that decentralizes data ownership among domain data owners.

Knowledge Catalog manages data in a way that doesn’t require data movement or duplication. As you add new data assets, Knowledge Catalog harvests the metadata for both structured and unstructured data, and automatically registers all metadata in a secure, unified metastore. Data and metadata can then be assessed via Google Cloud services such as BigQuery.

In this lab, you learn how to start building your own data mesh by creating and removing lakes, zones, and assets in Knowledge Catalog using the Google Cloud console.

### What you'll do

In this lab, you learn how to perform the following tasks:

*   Enable the Cloud Dataplex API.
    
*   Create a lake.
    
*   Add a zone to your lake.
    
*   Attach and detach assets.
    
*   Delete zones and lakes.
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1.  Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the right is the **Lab setup and access** panel with the following:
    
    *   The **Open Google Cloud console** button
        
    *   The temporary credentials (username and password) that you must use for this lab
        
    *   Other information, if needed, to step through this lab
        
    
    Note that the lab timer is located near the top of the page, showing the remaining time.
    
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```plaintext
    student-04-06fbd5fb1ede@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the **Lab setup and access** panel.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    G6t9Ez3GX1Ox
    ```
    
    Copied!
    
    You can also find the Password in the **Lab setup and access** panel.
    
6.  Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7.  Click through the subsequent pages:
    
    *   Accept the terms and conditions.
        
    *   Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    *   Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="center")

### Enable the Cloud Dataplex API

Dataplex Universal Catalog is now called Knowledge Catalog. The API, client library, CLI, and IAM names remain unchanged. To learn more, review the documentation page titled [Cloud Dataplex API](https://docs.cloud.google.com/dataplex/docs/reference/rest).

1.  In the Google Cloud Console, enter **Cloud Dataplex API** in the top search bar.
    
2.  Click on the result for **Cloud Dataplex API** under Marketplace.
    
3.  Click **Enable** (if it is not already enabled).
    

## **Task 1. Create a lake**

In Knowledge Catalog, a lake is the highest organizational domain that represents a specific data area or business unit. For example, you can create a lake for each department or data domain in your organization, so that you can organize and provide data for specific user groups.

In this task, you create a lake to start building a data mesh.

1.  In the Google Cloud Console, select **Navigation menu** (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ) > **View all products**. Under **Analytics**, select **Knowledge Catalog**.
    

If prompted **Welcome to the new Knowledge Catalog experience**, click **Close**.

2.  Under **Manage lakes**, click **Manage**.
    
3.  Click **+Create lake**.
    
4.  Enter the required information to create a new lake:
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | **sensors** |
| **ID** | Leave the default value. |
| **Region** | `europe-west1` |

Leave the other default values.

5.  Click **Create**.
    

It can take up to 3 minutes for the lake to be created.

Click *Check my progress* to verify the objective.

Create a data lake **sensors**

## **Task 2. Add a zone to your lake**

After you create a lake, you can add zones to the lake. Zones are subdomains within a lake that you can use to categorize data further. For example, you can categorize data by stage, usage, or restrictions.

There are two types of zones:

*   Raw zones contain data in raw formats (such as files in Cloud Storage buckets) and are not subject to strict type-checking.
    
*   Curated zones contain data that is cleaned, formatted, and ready for analytics such as BigQuery tables.
    

In this task, you create a raw zone for working with files in a Cloud Storage bucket.

1.  On the **Manage** tab, click on the name of your lake.
    
2.  Click **+Add zone**.
    
3.  Enter the required information to create a new zone:
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | `temperature raw data` |
| **ID** | Leave the default value. |
| **Type** | **Raw zone** |
| **Data locations** | **Regional** |
| **Discovery settings** | Check **Enable metadata discovery** |

Leave the other default values.

4.  Click **Create**.
    

It can take up to 2 minutes for the zone to be created.

You can perform the next task once the status of the zone is **Active**.

Click *Check my progress* to verify the objective.

Add a zone **temperature raw data** to the lake sensors

## **Task 3. Attach an asset to a zone**

Data stored in Cloud Storage buckets or BigQuery datasets can be attached as assets to zones within a Knowledge Catalog lake.

In this task, you attach a Cloud Storage bucket that you create in the Google Cloud console.

1.  On the **Zones** tab, click on the name of your zone.
    
2.  On the **Assets** tab, click **+ADD ASSET**.
    
3.  Click **+ADD AN ASSET**.
    
4.  Enter the required information to attach a new asset:
    

| **Property** | **Value** |
| --- | --- |
| **Type** | **Storage bucket** |
| **Display Name** | `measurements` |
| **ID** | Leave the default value. |

Leave the other default values.

5.  For **Bucket**, click **Browse**.
    

You can attach an existing Cloud Storage bucket or create a new one without leaving Knowledge Catalog. In the next steps, you create a new Cloud Storage bucket and attach it to the zone.

6.  Click **+Create new bucket** (
    
    ![shopping basket icon](https://cdn.qwiklabs.com/%2BR5aUyMa95rOwx4FznP1GTXkWYnhwIY6PBX%2F%2BHB%2Bq4o%3D align="center")
    
    ).
    
7.  Provide your project ID as the bucket name (`qwiklabs-gcp-04-a6e4932db7b3`), and then click **Continue**.
    
8.  For **Location type**, select **Region**, and then select `europe-west1`
    

Leave other default values.

9.  Click **Create**.
    

If prompted `Public access will be prevented`, click **Confirm**.

10.  Click **Select** to select the bucket you just created, and then click **Continue**.
     
11.  For **Discovery settings**, select **Inherit** to inherit the Discovery settings from the zone level, and then click **Continue**.
     
12.  Click **Submit**.
     

Click *Check my progress* to verify the objective.

Create a cloud storage bucket and attach an asset **measurements** to the zone **temperature raw data**

## **Task 4. Delete assets, zones, and lakes**

To delete a lake, you must first detach assets and then delete the zones.

In this task, you detach the asset from the zone, then delete the zone, and last, delete the lake.

### Detach an asset

1.  On the left menu, click the **Manage** tab, and then click the name of your lake.
    
2.  On the **Zones** tab, click on the name of your zone.
    
3.  On the **Assets** tab, enable the checkbox to the left of the asset name.
    
4.  Click **Delete assets**.
    
5.  Click **Delete** to confirm.
    

This action does not delete the underlying data in the Cloud Storage bucket. It simply removes the Cloud Storage bucket from being accessible or discoverable using the lake in Knowledge Catalog.

### Delete a zone

1.  On the left menu, click on **Manage** tab, and then click on the name of your lake.
    
2.  On the **Zones** tab, enable the checkbox to the left of the zone name.
    
3.  Click **Delete zone**.
    
4.  Click **Delete** to confirm.
    

### Delete the lake

1.  On the left menu, click on **Manage** tab, and then click on the name of your lake.
    
2.  At the top of the page, click **Delete**.
    
3.  Confirm deletion by typing **delete** into the text box.
    
4.  Click **Delete lake** to confirm.
    

Click *Check my progress* to verify the objective.

Delete lake **sensors** and nested resources

* * *

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=RnTSZ7gavHQ] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1143/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Dataplex%3A%20Qwik%20Start%20-%20Console/techcps1143.sh
sudo chmod +x techcps1143.sh
./techcps1143.sh
```

* * *

### Manual

%[https://www.youtube.com/watch?v=fO5Yz8-ZGuw]