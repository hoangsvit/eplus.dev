---
title: "Create and Add Aspects to Dataplex Assets - GSP1145"
seoTitle: "Create and Add Aspects to Dataplex Assets - GSP1145"
seoDescription: "Learn how to enable Dataplex API, create lakes and zones, design aspect types, and easily manage metadata in Dataplex Universal Catalog in this lab"
datePublished: Tue Sep 16 2025 10:27:24 GMT+0000 (Coordinated Universal Time)
cuid: cmfmesh5g000102lkdotvh36q
slug: create-and-add-aspects-to-dataplex-assets-gsp1145
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758017859142/b238db87-c582-4f08-848d-fde3db7d667b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1758018402125/5e899797-f6c0-44eb-aa3e-335956fcec9e.png
tags: dataplex, gsp1145, create-and-add-aspects-to-dataplex-assets-gsp1145, create-and-add-aspects-to-dataplex-assets

---

## Overview

[Dataplex](https://cloud.google.com/dataplex) is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data warehouses, and data marts to power analytics at scale.

Dataplex Universal Catalog is a fully managed, scalable metadata management service within Dataplex. Dataplex Universal Catalog lets you create aspect types and then add those aspects to data assets. Aspects let you capture metadata within entries. Adding aspects to an entry (or asset) helps provide meaningful context to anyone who needs to use the asset. You can use aspects to store business metadata (for example, data classification) and technical metadata (for example, schema).

Aspects allow you to add custom metadata to assets for easy identification and retrieval, such as adding an aspect to certain assets to identify that they contain protected or sensitive data. You can also create reusable aspect types to rapidly add the same aspects to different data assets.

In this lab, you learn how to use Dataplex Universal Catalog to create an aspect type, add the aspect to Dataplex assets, and then use the aspect to search for assets.

### What you'll learn

In this lab, you learn how to perform the following:

* Enable the Dataplex API.
    
* Create a lake, zone, and asset in Dataplex.
    
* Create an aspect type.
    
* Add an aspect to assets.
    
* Search for assets using aspects.
    

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
    student-01-ca687293fd1f@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    jCSS3OSr9yO5
    ```
    
    Copied!
    
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

### Enable Dataplex API

1. In the Google Cloud console title bar, type **Cloud Dataplex API** in the **Search** field and then click **Cloud Dataplex API** in the search results.
    
2. If needed, click **Enable** to enable the Cloud Dataplex API.
    

## Task 1. Create a lake, zone, and asset

In this task, you create a new Dataplex lake to store customer order information, add a curated zone to the lake, and then attach a pre-created BigQuery dataset as a new asset in the zone.

### Create a lake

1. In the Google Cloud console title bar, type **Dataplex Universal Catalog**, and then click **Dataplex Universal Catalog, type Product or Page** from the search results.
    
2. In the left pane, under **Manage lakes**, click **Manage**.
    
3. Click **Create Lake**.
    
4. Set the properties below as follows, leave the remaining properties as their default.
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | **Orders Lake** |
| **Region** | `us-central1` |

5. Scroll down and click **Create**.
    

It can take a few minutes for the lake to be created.

You can proceed to the next section once the status of the lake is **Active**.

### Add a zone to the lake

1. In the **Lakes** list, click **Orders Lake**.
    
2. Click **Add zone**.
    
3. Set the properties below as follows to create a new zone. Leave all other properties at their default values.
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | **Customer Curated Zone** |
| **Type** | **Curated zone** |
| **Data locations** | **Regional** |

4. Click **Create**.
    

It can take a few minutes for the zone to be created.

You can proceed to the next section once the status of the zone is **Active**.

### Attach an asset to a zone

1. In the **Zones** instance list, click **Customer Curated Zone**.
    
2. Click **Add assets**.
    
3. Click **Add an asset**.
    
4. Set the properties below as follows, and leave the remaining properties at the default values:
    

| **Property** | **Value** |
| --- | --- |
| **Type** | **BigQuery dataset** |
| **Display Name** | **Customer Details Dataset** |
| **Dataset** | `qwiklabs-gcp-01-91b56212aea5`.customers |

5. Click **Continue**.
    
6. For **Discovery settings**, select **Inherit** to inherit the Discovery settings from the zone level, and then click **Continue**.
    
7. Click **Submit**.
    

Create a lake, zone, and asset in Dataplex

## Task 2. Create an aspect type

An aspect type is a reusable template for aspects. Every aspect is an instance of an aspect type. To add an aspect to an asset, you first need to create one or more aspect types.

In this task, you create an aspect type to label BigQuery table columns with a protected status. With a public aspect type, users with access to the BigQuery table can see the aspects applied to the columns.

1. On the left pane, under **Manage Metadata**, click **Catalog**.
    
2. Click **Create aspect type**.
    
3. Enter the required information to define the aspect type:
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | **Protected Data Aspect** |
| **Location** | `us-central1` |

4. In the **Template** section, click **Add field** and enter the required information to add a new field to the aspect type:
    

| **Property** | **Value** |
| --- | --- |
| **Field Display Name** | **Protected Data Flag** |
| **Type** | **Enum** |

5. Select the **Is Required** checkbox.
    
6. Click **Add an enum value**.
    
7. For **Values**, enter **Yes**.
    
8. Click **Done**.
    
9. Click **Add an enum value**.
    
10. For **Values**, enter **No**.
    
11. Click **Done**.
    
12. Click **Save**.
    

**Note:** It can take a few minutes for the aspect type to be created before the progress check returns a successful message.

Create an aspect type

## Task 3. Add an aspect to assets

After you create an aspect type, you can add that aspect to any number of data assets.

In this task, you add the Protected Data aspect to columns in the BigQuery table that need a protected data status.

### Add an aspect to the entry

1. On the left menu, under **Discover**, click **Search**.
    
2. On the **Search** bar, be sure **Dataplex Universal Catalog** is selected.
    
3. For **Filters &gt; Systems**, select the **BigQuery** checkbox.
    
4. In the **Find data across your projects and organizations** field, enter **customer\_details** and then click **customer\_details** from the search results.
    

If you do not see the **customer\_details** table, make sure that the search platform is selected as **Dataplex Universal Platform** on the top right.

5. If needed, click **Enable** to enable the Google Cloud Data Catalog API.
    
6. On the **Search** bar, be sure **Dataplex Universal Catalog** is selected.
    
7. Scroll down to the **Tags & aspects** section. Next to **Optional tags & aspects**, click **Add**.
    
8. Type **protected data aspect** in the **Filter** field, and then click the **Protected Data Aspect** aspect from the results.
    
9. For **Protected Data Flag**, select **Yes**.
    
10. Click **Save**.
    

### Add an aspect to a column of the entry

1. Click the **Schema** tab.
    
2. Select the following column checkboxes:
    
    * zip
        
    * state
        
    * last\_name
        
    * country
        
    * email
        
    * latitude
        
    * first\_name
        
    * city
        
    * longitude
        
3. Click **Add tag or aspect**.
    
4. Click **Protected Data Aspect**.
    
5. For **Protected Data Flag**, select **Yes**.
    
6. Click **Save**.
    

**Note:** It can take a few minutes for the aspect type to be added to the asset before the progress check returns a successful message.

Add an aspect to assets

## Task 4. Search for assets using aspects

After you add an aspect to an asset, such as a table column, you can search for that asset using the aspect name in Dataplex Universal Catalog.

In this task, you search for the assets that have the Protected Data aspect applied.

1. On the left menu, under **Discover**, click **Search**.
    
2. On the **Search** bar, be sure **Dataplex Universal Catalog** is selected.
    
3. For **Filters** &gt; **Aspects**, select the **Protected Data Aspect** checkbox.
    
4. Click the **customer\_details** table.
    
5. Click the **Schema** tab to see the Protected Data aspects on the specified columns.
    

---

### Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1145/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/pspcps/Arcade/master/GSP1145.sh
sudo chmod +x GSP1145.sh
./GSP1145.sh
```

---

### Manual

%[https://youtu.be/M7iof7uBxSo]