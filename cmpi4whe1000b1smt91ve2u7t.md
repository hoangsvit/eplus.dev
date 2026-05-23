---
title: "Create and Add Aspects to Knowledge Catalog Assets - GSP1145"
seoTitle: "Create and Add Aspects to Knowledge Catalog Assets - GSP1145"
seoDescription: "Knowledge Catalog is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data warehouses, and data marts to power analytics at scale."
datePublished: 2026-05-23T09:16:33.681Z
cuid: cmpi4whe1000b1smt91ve2u7t
slug: create-and-add-aspects-to-knowledge-catalog-assets-gsp1145
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/4db942c4-c9c8-4ed7-a327-d9c1c401a06d.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/20b41f6e-a1c9-46e1-b7fc-64d60fabe480.png
tags: gsp1145, create-and-add-aspects-to-knowledge-catalog-assets-gsp1145, create-and-add-aspects-to-knowledge-catalog-assets

---

## **Overview**

[Knowledge Catalog](https://cloud.google.com/dataplex) is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data warehouses, and data marts to power analytics at scale.

Knowledge Catalog is a fully managed, scalable metadata management service within Knowledge Catalog. Knowledge Catalog lets you create aspect types and then add those aspects to data assets. Aspects let you capture metadata within entries. Adding aspects to an entry (or asset) helps provide meaningful context to anyone who needs to use the asset. You can use aspects to store business metadata (for example, data classification) and technical metadata (for example, schema).

Aspects allow you to add custom metadata to assets for easy identification and retrieval, such as adding an aspect to certain assets to identify that they contain protected or sensitive data. You can also create reusable aspect types to rapidly add the same aspects to different data assets.

In this lab, you learn how to use Knowledge Catalog to create an aspect type, add the aspect to Knowledge Catalog assets, and then use the aspect to search for assets.

### What you'll learn

In this lab, you learn how to perform the following:

*   Enable the Dataplex API.
    
*   Create a lake, zone, and asset in Knowledge Catalog.
    
*   Create an aspect type.
    
*   Add an aspect to assets.
    
*   Search for assets using aspects.
    

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

1.  Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    *   The Open Google Cloud console button
        
    *   Time remaining
        
    *   The temporary credentials that you must use for this lab
        
    *   Other information, if needed, to step through this lab
        
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```plaintext
    student-00-6e425b1fb024@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    5HyAXSm4ldhl
    ```
    
    Copied!
    
    You can also find the Password in the Lab Details pane.
    
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

### Enable Dataplex API

1.  In the Google Cloud console title bar, type **Cloud Dataplex API** in the **Search** field and then click **Cloud Dataplex API** in the search results.
    
2.  If needed, click **Enable** to enable the Cloud Dataplex API.
    

## **Task 1. Create a lake, zone, and asset**

In this task, you create a new Knowledge Catalog lake to store customer order information, add a curated zone to the lake, and then attach a pre-created BigQuery dataset as a new asset in the zone.

### Create a lake

1.  In the **Navigation menu** (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ) click **View all products**. Under **Analytics**, click **Knowledge Catalog**.
    
2.  In the left pane, under **Manage lakes**, click **Manage**.
    
3.  Click **Create Lake**.
    
4.  Set the properties below as follows, leave the remaining properties as their default.
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | **Orders Lake** |
| **Region** | `europe-west1` |

5.  Scroll down and click **Create**.
    

It can take a few minutes for the lake to be created.

You can proceed to the next section once the status of the lake is **Active**.

### Add a zone to the lake

1.  In the **Lakes** list, click **Orders Lake**.
    
2.  Click **Add zone**.
    
3.  Set the properties below as follows to create a new zone. Leave all other properties at their default values.
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | **Customer Curated Zone** |
| **Type** | **Curated zone** |
| **Data locations** | **Regional** |

4.  Click **Create**.
    

It can take a few minutes for the zone to be created.

You can proceed to the next section once the status of the zone is **Active**.

### Attach an asset to a zone

1.  In the **Zones** instance list, click **Customer Curated Zone**.
    
2.  Click **Add assets**.
    
3.  Click **Add an asset**.
    
4.  Set the properties below as follows, and leave the remaining properties at the default values:
    

| **Property** | **Value** |
| --- | --- |
| **Type** | **BigQuery dataset** |
| **Display Name** | **Customer Details Dataset** |
| **Dataset** | `qwiklabs-gcp-04-0ff95beba643`**.customers** |

5.  Click **Continue**.
    
6.  For **Discovery settings**, select **Inherit** to inherit the Discovery settings from the zone level, and then click **Continue**.
    
7.  Click **Submit**.
    

Create a lake, zone, and asset in Knowledge Catalog

## **Task 2. Create an aspect type**

An aspect type is a reusable template for aspects. Every aspect is an instance of an aspect type. To add an aspect to an asset, you first need to create one or more aspect types.

In this task, you create an aspect type to label BigQuery table columns with a protected status. With a public aspect type, users with access to the BigQuery table can see the aspects applied to the columns.

1.  On the left pane, under **Manage Metadata**, click **Metadata Types**.
    
2.  Select the **Aspect types** tab, then click **Create**.
    
3.  Enter the required information to define the aspect type:
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | **Protected Data Aspect** |
| **Location** | `europe-west1` |

4.  In the **Template** section, click **Add field** and enter the required information to add a new field to the aspect type:
    

| **Property** | **Value** |
| --- | --- |
| **Field Display Name** | **Protected Data Flag** |
| **Type** | **Enum** |

5.  Select the **Is Required** checkbox.
    
6.  Click **Add an enum value**.
    
7.  For **Values**, enter **Yes**.
    
8.  Click **Done**.
    
9.  Click **Add an enum value**.
    
10.  For **Values**, enter **No**.
     
11.  Click **Done**.
     
12.  Click **Save**.
     

**Note:** It can take a few minutes for the aspect type to be created before the progress check returns a successful message.

Create an aspect type

## **Task 3. Add an aspect to assets**

After you create an aspect type, you can add that aspect to any number of data assets.

In this task, you add the Protected Data aspect to columns in the BigQuery table that need a protected data status.

### Add an aspect to the entry

1.  On the left menu, under **Discover**, click **Search**.
    
2.  On the **Search** bar, for **Choose search platform**, select **Knowledge Catalog**.
    
3.  For **Filters > Systems**, select the **BigQuery** checkbox.
    
4.  In the **Search** text box, enter **customer\_details**, and then click **customer\_details** from the search results.
    

If you do not see the **customer\_details** table, make sure that the search platform is selected as **Knowledge Catalog** on the top right.

5.  Scroll down to the **Aspects** section. Next to **Optional aspects**, click **Add**.
    
6.  Type **protected data aspect** in the **Filter** field, and then click the **Protected Data Aspect** aspect from the results.
    
7.  For **Protected Data Flag**, select **Yes**.
    
8.  Click **Save**.
    

### Add an aspect to a column of the entry

1.  Click the **Schema** tab.
    
2.  Select the following column checkboxes:
    
    *   zip
        
    *   state
        
    *   last\_name
        
    *   country
        
    *   email
        
    *   latitude
        
    *   first\_name
        
    *   city
        
    *   longitude
        
3.  Click **Add aspect**.
    
4.  Click **Protected Data Aspect**.
    
5.  For **Protected Data Flag**, select **Yes**.
    
6.  Click **Save**.
    

**Note:** It can take a few minutes for the aspect type to be added to the asset before the progress check returns a successful message.

Add an aspect to assets

## **Task 4. Search for assets using aspects**

After you add an aspect to an asset, such as a table column, you can search for that asset using the aspect name in Knowledge Catalog.

In this task, you search for the assets that have the Protected Data aspect applied.

1.  On the left menu, under **Discover**, click **Search**.
    

Because you selected Knowledge Catalog in an earlier task, the search bar will use it to retrieve the results.

2.  For **Filters** > **Aspects**, select the **Protected Data Aspect** checkbox.
    
3.  Click the **customer\_details** table.
    
4.  Click the **Schema** tab to see the Protected Data aspects on the specified columns.
    

* * *

## Solution of Lab

%[https://www.youtube.com/watch?v=uf8TabFoDnY] 

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1145/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Create%20and%20Add%20Aspects%20to%20Dataplex%20Assets/TechCode.sh
sudo chmod +x TechCode.sh 
./TechCode.sh
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/3fa465ec-7356-4126-84c4-e7f527a28ab6.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/3cbcfb2d-08bb-48d6-ba18-046cef6758fa.png align="center")

[https://console.cloud.google.com/marketplace/product/google/datacatalog.googleapis.com](https://console.cloud.google.com/marketplace/product/google/datacatalog.googleapis.com)

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/613050d6-0c07-4ab9-8fe3-101e762bb05d.png align="center")

[https://console.cloud.google.com/dataplex/catalog/aspect-types](https://console.cloud.google.com/dataplex/catalog/aspect-types)

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1d9037b1-1c32-4738-9710-937eb2a0f37e.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/399bfc99-4860-49fe-8143-e8691c7d1f3e.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/5fdd83b6-712b-4227-9ecc-149105ca1923.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/ff2a2c10-9aa2-47b8-befc-6639e0a6da2c.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/31c2ec76-ecdc-45ea-b05b-27493341ba0f.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/e44c7062-5e35-4ad3-a931-ea22802a37fa.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/5c1105ff-cd3e-4353-b4fd-916f0f5d88d6.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/7bddf84b-bb95-4853-aba2-fda29157e32a.png align="center")

```plaintext
customer_details
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/5cd02217-6f07-481c-ab01-a5b69c859a00.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/2d2ec92e-f732-40f9-b5ee-551e4aa3b622.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/ce0b9009-3823-407e-94c0-79905b892b19.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/b24a2d04-215b-4c6c-9640-9cad4c001258.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/0f2cf9b7-f1eb-4b65-8cf5-aed469a931e3.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/57024907-9f5a-4bb8-98c5-9b47bc94542d.png align="center")