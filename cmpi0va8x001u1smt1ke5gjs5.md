---
title: "Implementing Security in Knowledge Catalog - GSP1157"
seoTitle: "Implementing Security in Knowledge Catalog - GSP1157"
seoDescription: "Knowledge Catalog is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data warehouses, and data marts to power analytics at scale."
datePublished: 2026-05-23T07:23:39.307Z
cuid: cmpi0va8x001u1smt1ke5gjs5
slug: implementing-security-in-knowledge-catalog-gsp-1157
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/8353f1b6-24e1-4b13-bc58-06c468d92d56.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/1ce5815a-d70f-40b4-a3e6-d1438ff4ceba.png
tags: gsp1157, implementing-security-in-knowledge-catalog-gsp1157, implementing-security-in-knowledge-catalog

---

## **Overview**

[Knowledge Catalog](https://cloud.google.com/dataplex) is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data warehouses, and data marts to power analytics at scale.

Knowledge Catalog provides a flexible [security model](https://cloud.google.com/dataplex/docs/lake-security) that allows you to manage who can access and perform actions on Knowledge Catalog resources. Specifically, Knowledge Catalog security is implemented using different Dataplex IAM roles that allow users to administer Knowledge Catalog lakes, access data in the lake through the attached assets such as a Cloud Storage bucket or BigQuery dataset, or access metadata about the data connected to a lake.

In this lab, you learn how to implement security in Knowledge Catalog by logging in to a Google Cloud project as a Dataplex administrator, creating new Knowledge Catalog resources, and assigning and testing Dataplex IAM roles to other users. You conclude the lab by successfully uploading a new file to a Cloud Storage bucket as a user that has been granted the appropriate IAM role to modify that specific Knowledge Catalog asset.

### What you'll do

*   Create a lake, zone, and asset in Knowledge Catalog
    
*   Assign Dataplex IAM roles to other users
    
*   Test access to a Knowledge Catalog asset as different users with differing Dataplex IAM roles
    
*   Upload a new file to a Cloud Storage bucket managed as a Knowledge Catalog asset
    

## **Setup and requirements**

After you start the lab, **log in to the Google Cloud console as User 1 (**`____`**)** to begin the first task.

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
    "Username"
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    "Password"
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

1.  In the Google Cloud Console, enter **Cloud Dataplex API** in the top search bar.
    
2.  Click on the result for **Cloud Dataplex API** under Marketplace.
    
3.  Click **Enable** if it isn't already enabled.
    

## **Task 1. Create a lake, zone, and asset in Knowledge Catalog**

To apply and test user access to Knowledge Catalog resources, you first need to create some Knowledge Catalog resources.

In this task, you use the Google Cloud console to create a new Knowledge Catalog lake to store customer information, add a raw zone to the lake, and then attach a pre-created Cloud Storage bucket as a new asset in the zone.

To complete this task, **be sure you are logged in as User 1 (**`____`**)**, who is a Dataplex Administrator and can create new Knowledge Catalog resources in the project.

### Create a lake

1.  In the Google Cloud Console, in the **Navigation menu** (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ) > **View All Products**, navigate to **Analytics** > **Knowledge Catalog**.
    

If prompted `Welcome to the new Knowledge Catalog experience`, click **Close**.

2.  Under **Manage lakes**, click **Manage**.
    
3.  Click **Create lake**.
    
4.  Enter the required information to create a new lake:
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | `Customer Info Lake` |
| **ID** | Leave the default value. |
| **Region** | `____` |

Leave the other default values.

5.  Click **Create**.
    

It can take up to 3 minutes for the lake to be created.

### Add a zone to the lake

1.  On the **Manage** tab, click on the name of your lake.
    
2.  Click **Add zone**.
    
3.  Enter the required information to create a new zone:
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | `Customer Raw Zone` |
| **ID** | Leave the default value. |
| **Type** | **Raw zone** |
| **Data locations** | **Regional** |
| **Discovery settings** | Check **Enable metadata discovery** |

Leave the other default values.

4.  Click **Create**.
    

It can take up to 2 minutes for the zone to be created.

You can perform the next task once the status of the zone is **Active**.

### Attach an asset to a zone

1.  On the **Zones** tab, click on the name of your zone.
    
2.  On the **Assets** tab, click **Add assets**.
    
3.  Click **Add an asset**.
    
4.  Enter the required information to attach a new asset:
    

| **Property** | **Value** |
| --- | --- |
| **Type** | **Storage bucket** |
| **Display Name** | `Customer Online Sessions` |
| **ID** | Leave the default value. |
| **Bucket name** | `____`\-bucket |

Leave the other default values.

While the Cloud Storage bucket does not contain any files, you can attach it to the zone now, and newly added files will automatically be integrated into the zone.

5.  Click **Done**.
    
6.  Click **Continue**.
    
7.  For **Discovery settings**, select **Inherit** to inherit the Discovery settings from the zone level, and then click **Continue**.
    
8.  Click **Submit**.
    

Click *Check my progress* to verify the objective.

Create a lake, zone, and asset in Knowledge Catalog

## **Task 2. Assign Dataplex Data Reader role to another user**

Following the Google recommendation of least privilege, Knowledge Catalog allows Dataplex administrators to grant Dataplex IAM roles to users at the level of the project, lake, zone, and individual assets like a Cloud Storage bucket.

In this task, you use the Google Cloud console to assign the Dataplex Data Reader role to another user, so that they can have read access to the Cloud Storage bucket that is managed as a Knowledge Catalog resource.

To complete this task, **remain logged in as User 1 (**`____`**)**, who has the appropriate grant Dataplex IAM roles to other users.

1.  In the Google Cloud Console, in the **Navigation menu** (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ) > **View All Products**, under **Analytics**, navigate to **Knowledge Catalog** > **Secure**.
    
2.  In the **Knowledge Catalog** menu, expand the arrow next to the project ID (`____`).
    
3.  Expand the arrow next to the name of your lake.
    
4.  Expand the arrow next to the name of your zone.
    
5.  Click on the asset name (Customer Online Sessions).
    
6.  Click **Grant access**.
    
7.  For **New principals**, enter the email for User 2: `User 2 ID`
    
8.  For **Select a role**, select **Dataplex Data Reader** under **Cloud Dataplex**.
    
9.  Click **Save**.
    

To see the updated data permissions, refresh the page. It can take a few minutes for the permissions to be applied.

Click *Check my progress* to verify the objective.

Assign Dataplex Data Reader role to another user

### Log out of the project as User 1

Log out of the project as User 1. In the next task, you log in to the project as User 2.

1.  Click on the profile icon on the top right of the Google Cloud console.
    
2.  Click **Sign out**.
    

If asked to confirm, click **Leave**.

![Sign Out dialog](https://cdn.qwiklabs.com/tX2AQr6KJX8I9lhrGaZNaXJMrJGovI0%2B7Zzp%2Bf4QuXg%3D align="center")

## **Task 3. Test access to Knowledge Catalog resources as a Dataplex Data Reader**

Users who have been granted only the Dataplex Data Reader role on an asset have access to view the Knowledge Catalog asset but cannot modify it. For example, users with only the Dataplex Data Reader role on a Cloud Storage bucket cannot add new files to the bucket that is managed as a Knowledge Catalog asset.

In this task, you use the Google Cloud console to test access for User 2 to Knowledge Catalog resources by attempting to add a new file to the pre-created Cloud Storage bucket.

To complete this task, **log in to the project as User 2 (**`____`**)**.

1.  In the Google Cloud Console, in the **Navigation menu** (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ), navigate to **Cloud Storage** > **Buckets**.
    
2.  Click on the bucket that has been precreated for you: `____`\-bucket
    
3.  Click **Upload files**.
    
4.  Select any file of your choice.
    

If you need a sample file, you can download the following [test CSV file](https://storage.googleapis.com/spls/gsp1157/test.csv), and use it as the upload file.

5.  Click **Open**.
    

Notice that you receive an error, and no files are uploaded to the bucket.

User 2 is denied access to upload a new file to the Cloud Storage bucket because the user has only been granted read access to the Knowledge Catalog asset.

### Log out of the project as User 2

Log out of the project as User 2. In the next task, you log in to the project as User 1.

1.  Click on the profile icon on the top right of the Google Cloud console.
    
2.  Click **Sign out**.
    

If asked to confirm, click **Leave**.

![Sign Out dialog](https://cdn.qwiklabs.com/tX2AQr6KJX8I9lhrGaZNaXJMrJGovI0%2B7Zzp%2Bf4QuXg%3D align="center")

## **Task 4. Assign Dataplex Writer role to another user**

In this task, you use the Google Cloud console to assign the Dataplex Writer Role on the bucket to User 2, so that they can modify the bucket by adding new files.

To complete this task, **log in to the project as User 1 (**`____`**)**, who has the appropriate grant Dataplex IAM roles to other users.

1.  In the Google Cloud Console, in the **Navigation menu** (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ) > **View All Products**, under **Analytics**, navigate to **Knowledge Catalog** > **Secure**.
    
2.  In the **Knowledge Catalog** menu, expand the arrow next to the project ID (`____`).
    
3.  Expand the arrow next to the name of your lake.
    
4.  Expand the arrow next to the name of your zone.
    
5.  Click on the asset name (Customer Online Sessions).
    
6.  Click on **Edit principal** (pencil icon) next to the email for User 2: `User 2 ID`
    
7.  For **Role**, select **Dataplex Data Writer** under **Cloud Dataplex**.
    
8.  Click **Save**.
    

To see the updated data permissions, refresh the page. It can take a few minutes for the permissions to be applied.

Click *Check my progress* to verify the objective.

Assign Dataplex Data Writer role to another user

### Log out of the project as User 1

Log out of the project as User 1. In the next task, you log in to the project as User 2.

1.  Click on the profile icon on the top right of the Google Cloud console.
    
2.  Click **Sign out**.
    

If asked to confirm, click **Leave**.

![Sign Out dialog](https://cdn.qwiklabs.com/tX2AQr6KJX8I9lhrGaZNaXJMrJGovI0%2B7Zzp%2Bf4QuXg%3D align="center")

## **Task 5. Upload new file to Cloud Storage bucket as a Dataplex Data Writer**

Users who have been granted the Dataplex Data Writer role on an asset have access to modify the asset, including the ability to add new files to a Cloud Storage bucket that is managed as a Knowledge Catalog asset.

In this task, you use the Google Cloud console to test access again for User 2 to Knowledge Catalog resources by successfully adding a new file to the pre-created Cloud Storage bucket.

To complete this task, **log in to the project as User 2 (**`____`**)**.

1.  In the Google Cloud Console, in the **Navigation menu** (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ), navigate to **Cloud Storage** > **Buckets**.
    
2.  Click on the bucket that has been precreated for you: `____`\-bucket
    
3.  Click **Upload files**.
    
4.  Select any file of your choice.
    

If you need a sample file, you can download the following [test CSV file](https://storage.googleapis.com/spls/gsp1157/test.csv), and use it as the upload file.

5.  Click **Open**.
    

User 2 can successfully upload a new file to the Cloud Storage bucket as a Dataplex Data Writer.

Click *Check my progress* to verify the objective.

Upload a file to the Cloud Storage bucket as a Dataplex Data Writer

* * *

## Solution of Lab

%[https://www.youtube.com/watch?v=5Q_KMj7hl50] 

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1157/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Implementing%20Security%20in%20Dataplex/TechCode.sh
sudo chmod +x TechCode.sh 
./TechCode.sh
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/3215f418-7b20-4014-b2f9-3c3700233d41.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/044a7959-c8a6-4595-95de-5a6e36f37a98.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/4490c49c-55ce-4f37-bb0d-7a4a078896e2.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/6e3befce-2935-4ecb-bcc5-c97d1e3d8365.png align="center")

**Task 3:**

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/438f7b3a-09bc-426e-bfd6-983101b1cb44.png align="center")

**Task 4:**

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/4d5468c0-9db7-4162-af7f-4d0eb6b7e7e3.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/5f49947c-c469-4170-987c-09f347024125.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/6e3befce-2935-4ecb-bcc5-c97d1e3d8365.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/02eabbe5-a68a-41de-834d-2db67aee0b31.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/2712e71d-6245-4413-a6fc-61779d532be9.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/bcb1b862-6448-424e-8450-37efa63fe592.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/90800dd8-ecb6-4099-911a-f03e70272548.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/6ed54929-257a-42a8-89c3-087c13ca1739.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/d6e17ade-c05d-47b8-aa06-9484413a2ad7.png align="center")