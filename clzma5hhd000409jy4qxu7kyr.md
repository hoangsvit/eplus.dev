---
title: "Cloud Storage: Qwik Start - Cloud Console - GSP073"
seoTitle: "Cloud Storage: Qwik Start - Cloud Console - GSP073"
seoDescription: "Cloud Storage allows world-wide storage and retrieval of any amount of data at any time. You can use Cloud Storage for a range of scenarios including servin"
datePublished: Fri Aug 09 2024 05:42:15 GMT+0000 (Coordinated Universal Time)
cuid: clzma5hhd000409jy4qxu7kyr
slug: cloud-storage-qwik-start-cloud-console-gsp073
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744620711031/d7f5c6b9-8cc2-4ca8-9dcb-47c6c2e7eed0.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744620718612/42399f96-1421-4211-9980-f33282318191.png
tags: cloud-storage-qwik-start-cloud-console, cloud-storage-qwik-start-cloud-console-gsp073, gsp073

---

## Overview

Cloud Storage allows world-wide storage and retrieval of any amount of data at any time. You can use Cloud Storage for a range of scenarios including serving website content, storing data for archival and disaster recovery, or distributing large data objects to users via direct download.

### What you'll do

In this hands-on lab you will learn how to use the Cloud console to:

* Create a storage bucket
    
* Upload objects to the bucket
    
* Create folders and subfolders in the bucket
    
* Make objects in a storage bucket publicly accessible
    

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
    student-00-1c8883f1e8f2@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    bqoFcX2PNMce
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

## Task 1. Create a bucket

*Buckets* are the basic containers that hold your data in Cloud Storage.

To create a bucket:

1. In the Cloud console, go to **Navigation menu ()** &gt; **Cloud Storage** &gt; **Buckets**.
    
2. Click **\+ Create**:
    

![ Cloud Console Storage Browser. Create Bucket button is highlighted.](https://cdn.qwiklabs.com/IzqJx37G8qJo1n9GkUrmq6QUeznWZKcpnFyIF1jK0%2Bc%3D align="left")

3. Enter your bucket information and click **Continue** to complete each step:
    
    * **Name your bucket:** Enter a unique name for your bucket. For this lab, you can use your **Project ID** as the bucket name because it will always be unique.
        
    
    **Bucket naming rules:**
    
    * Do not include sensitive information in the bucket name, because the bucket namespace is global and publicly visible.
        
    * Bucket names must contain only lowercase letters, numbers, dashes (-), underscores (\_), and dots (.). Names containing dots require [verification](https://cloud.google.com/storage/docs/domain-name-verification).
        
    * Bucket names must start and end with a number or letter.
        
    * Bucket names must contain 3 to 63 characters. Names containing dots can contain up to 222 characters, but each dot-separated component can be no longer than 63 characters.
        
    * Bucket names cannot be represented as an IP address in dotted-decimal notation (for example, 192.168.5.4).
        
    * Bucket names cannot begin with the "goog" prefix. Bucket names cannot contain "google" or close misspellings of "google".\*
        
    * Also, for DNS compliance and future compatibility, you should not use underscores (\_) or have a period adjacent to another period or dash. For example, ".." or "-." or ".-" are not valid in DNS names.
        
    * Choose **Region** for **Location type** and `us-west1` for **Location**.
        
    * Choose **Standard** for **default storage class**.
        
    * Choose **Uniform** for **Access control** and **uncheck** *Enforce public access prevention on this bucket* to turn it off.
        
4. Leave the rest of the fields as their default values and click **Create**.
    

That's it — you've just created a Cloud Storage bucket!

**Note:** If you are prompted with Public access will be prevented, uncheck *Enforce public access prevention on this bucket* and click **Confirm**.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a Cloud Storage bucket, you will see an assessment score.

Create a bucket

### Test your understanding

Below are multiple choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your ability.

Every bucket must have a unique name across the entire Cloud Storage namespace.TrueFalse

## Task 2. Upload an object into the bucket

![Kitten image](https://cdn.qwiklabs.com/8tnHNHkj30vDqnzokQ%2FcKrxmOLoxgfaswd9nuZkEjd8%3D align="left")

To upload the image above into your new bucket:

1. Right-click on the image above and download it to your computer. Save the image as **kitten.png**, renaming it on download.
    
2. In the Cloud Storage browser page, click the name of the bucket that you created.
    
3. In the **Objects** tab, click **Upload** &gt; **Upload files**.
    
4. In the file dialog, go to the file that you downloaded and select it.
    
5. Ensure the file is named **kitten.png**. If it is not, click the **three dot** icon for your file, select **Rename** from the dropdown, and rename the file to **kitten.png**.
    

After the upload completes, you should see the file name and information about the file, such as its size and type.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully uploaded an object to your bucket, you will see an assessment score.

Upload an object into the bucket (kitten.png)

### Test your understanding

Below are multiple choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your ability.

Object names must be unique only within a given bucket.TrueFalse

## Task 3. Share a bucket publicly

To allow public access to the bucket and create a publicly accessible URL for the image:

1. Click the **Permissions** tab above the list of files.
    
2. Ensure the view is set to **Principals**. Click **Grant Access** to view the **Add principals** pane.
    
3. In the **New principals** box, enter *allUsers*.
    
4. In the **Select a role** drop-down, select **Cloud Storage** &gt; **Storage Object Viewer**.
    
5. Click **Save**.
    
6. In the **Are you sure you want to make this resource public?** window, click **Allow public access**.
    

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully shared an object publicly from your bucket, you will see an assessment score.

Share a kitten.png object publicly

1. To verify, click the **Objects** tab to return to the list of objects. Your object's **Public access** column should read **Public to internet**.
    

**Note:** If your object does not appear to be public after following the previous steps, you may need to refresh your browser page.

2. Press the **Copy URL** button for your object and paste it into a separate tab to view your image.
    

The **Copy URL** button provides a shareable URL similar to the following:

```apache
https://storage.googleapis.com/YOUR_BUCKET_NAME/kitten.png
```

## Task 4. Create folders

1. In the **Objects** tab, click **Create folder**.
    
2. Enter **folder1** for **Name** and click **Create**.
    

You should see the folder in the bucket with an image of a folder icon to distinguish it from objects.

Create a subfolder and upload a file to it:

1. Click **folder1**.
    
2. Click **Create folder**.
    
3. Enter **folder2** for **Name** and click **Create**.
    
4. Click **folder2**.
    
5. Click **Upload** &gt; **Upload files**.
    
6. In the file dialog, navigate to the screenshot that you downloaded and select it.
    

After the upload completes, you should see the file name and information about the file, such as its size and type.

## Task 5. Delete a folder

1. Click the arrow next to **Bucket details** to return to the buckets level.
    
2. Select the bucket.
    
3. Click on the **Delete** button.
    
4. In the window that opens, type `DELETE` to confirm the deletion of the folder.
    
5. Click **Delete** to permanently delete the folder and all objects and subfolders in it.
    

---

## Solution of Lab

### New Solution

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP073/lab.sh
source lab.sh
```

---

### Old Solution

%[https://www.youtube.com/watch?v=EdARWrNyA3s] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723181870021/099173ad-5771-4670-9f28-72cf5db1ede4.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Cloud%20Storage%20Qwik%20Start%20Cloud%20Console/quicklabgsp073.sh
sudo chmod +x quicklabgsp073.sh
./quicklabgsp073.sh
```