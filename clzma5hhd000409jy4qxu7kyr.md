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

## **Overview**

Cloud Storage allows world-wide storage and retrieval of any amount of data at any time. You can use Cloud Storage for a range of scenarios including serving website content, storing data for archival and disaster recovery, or distributing large data objects to users via direct download.

**What you'll do**

In this hands-on lab you will learn how to use the Cloud console to:

* Create a storage bucket
    
* Upload objects to the bucket
    
* Create folders and subfolders in the bucket
    
* Make objects in a storage bucket publicly accessible
    

---

### **Task 1. Create a bucket**

*Buckets* are the basic containers that hold your data in Cloud Storage.

To create a bucket:

1. In the Cloud console, go to **Navigation menu** &gt; **Cloud Storage** &gt; **Buckets**.
    
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
        
    * Choose **Region** for **Location type** and `europe-west1` for **Location**.
        
    * Choose **Standard** for **default storage class**.
        
    * Choose **Uniform** for **Access control** and **uncheck** *Enforce public access prevention on this bucket* to turn it off.
        
4. Leave the rest of the fields as their default values and click **Create**.
    

That's it — you've just created a Cloud Storage bucket!

**Note:** If you are prompted with Public access will be prevented, uncheck *Enforce public access prevention on this bucket* and click **Confirm**.

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a Cloud Storage bucket, you will see an assessment score.

Create a bucket

**Check my progress**

**Test your understanding**

Below are multiple choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your ability.

Every bucket must have a unique name across the entire Cloud Storage namespace.TrueFalse

### **Task 2. Upload an object into the bucket**

![Kitten image](https://cdn.qwiklabs.com/8tnHNHkj30vDqnzokQ%2FcKrxmOLoxgfaswd9nuZkEjd8%3D align="left")

To upload the image above into your new bucket:

1. Right-click on the image above and download it to your computer. Save the image as **kitten.png**, renaming it on download.
    
2. In the Cloud Storage browser page, click the name of the bucket that you created.
    
3. In the **Objects** tab, click **Upload files**.
    
4. In the file dialog, go to the file that you downloaded and select it.
    
5. Ensure the file is named **kitten.png**. If it is not, click the **three dot** icon for your file, select **Rename** from the dropdown, and rename the file to **kitten.png**.
    

After the upload completes, you should see the file name and information about the file, such as its size and type.

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully uploaded an object to your bucket, you will see an assessment score.

Upload an object into the bucket (kitten.png)

**Check my progress**

**Test your understanding**

Below are multiple choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your ability.

Object names must be unique only within a given bucket.

* True
    
* False
    

---

### Solution of Lab

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