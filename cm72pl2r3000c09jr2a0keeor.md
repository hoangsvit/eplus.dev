---
title: "APIs Explorer: Cloud Storage - GSP421"
seoTitle: "APIs Explorer: Cloud Storage - GSP421"
seoDescription: "The Google APIs Explorer is a tool that helps you explore various Google APIs interactively. With the APIs Explorer, you can:"
datePublished: Thu Feb 13 2025 02:16:32 GMT+0000 (Coordinated Universal Time)
cuid: cm72pl2r3000c09jr2a0keeor
slug: apis-explorer-cloud-storage-gsp421
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739412620457/48eda5b9-00b5-4a36-bc2e-3d5adcf174ae.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1739412937204/6918de34-5592-4390-a2cb-e02601185ec4.png
tags: apis-explorer-cloud-storage-gsp421, apis-explorer-cloud-storage, gsp421

---

## **Overview**

The [Google APIs Explorer](http://developers.google.com/apis-explorer/) is a tool that helps you explore various Google APIs interactively. With the APIs Explorer, you can:

* Browse quickly through available APIs and versions.
    
* See methods available for each API and what parameters they support along with inline documentation.
    
* Execute requests for any method and see responses in real-time.
    
* Make authenticated and authorized API calls.
    
* Search across all services, methods, and your recent requests to quickly find what you are looking for.
    

[Cloud Storage](https://cloud.google.com/storage/) allows world-wide storage and retrieval of any amount of data at any time. You can use Cloud Storage for a range of scenarios including serving website content, storing data for archival and disaster recovery, or distributing large data objects to users via direct download.

In this lab, you will use the APIs Explorer to make Cloud Storage API requests that create and delete Cloud Storage buckets. You will also learn how to copy and delete files in Cloud Storage.

### Objectives

In this lab, you will:

* Create Cloud Storage buckets using the APIs Explorer.
    
* Upload image files to your Cloud Storage bucket.
    
* Copy an image file and add it to a Cloud Storage bucket using the APIs Explorer.
    
* Delete image files from your Cloud Storage bucket using the APIs Explorer.
    
* Delete a Cloud Storage bucket using the APIs Explorer.
    

## **Setup and requirements**

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
    student-04-e4a582c6159f@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    2dosNDTLjuaC
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

## **Task 1. Create Cloud Storage Buckets**

1. To access the Cloud Storage APIs Explorer tool, from the **Navigation menu** select **APIs & Services** &gt; **Library**.
    
2. In the search bar, type **Cloud Storage**.
    
3. Click on the **Google Cloud Storage JSON API** from the results list.
    
4. Make sure that API is enabled, if not click **Enable**.
    
5. Open the [Buckets: insert reference](https://cloud.google.com/storage/docs/json_api/v1/buckets/insert). This will open a new tab with the APIs Explorer page loaded.
    

You will now be on the APIs Explorer page.

**Note:** In the next section you are using the `insert` method from **Cloud Storage JSON API**. You can view all API versions and its method in the [API reference](https://cloud.google.com/storage/docs/json_api/v1/).

6. Now click on the request body from the right panel under Try this API and fill in the details for your storage bucket:
    

* **project**: add your Project ID - `qwiklabs-gcp-01-8aa628374634`.
    
* **Request body**: click inside the quotes next to the **name** key-value pair and give your Cloud Storage bucket a unique name that follows the [Cloud Storage bucket naming guidelines](https://cloud.google.com/storage/docs/naming).
    

Your method should now resemble the following:

![The method displaying in the Request body section of the Request parameters dialog box](https://cdn.qwiklabs.com/HgSFSUtQvKLhRgwbzJyUj1DXfn35bM7LTpdZ%2FywXUjo%3D align="left")

**Note:** Make sure that there are no trailing spaces in the project ID field. Also, that **Google OAuth 2.0** and **API key** checkboxes are selected under **Credentials** section.

![The Google OAuth 2.0 and API key checkboxes selected in the Credentials section](https://cdn.qwiklabs.com/EFpEix1b8t2ZmZ35kihEUaA8mAoUsQT9Hh8t%2F8MCaiM%3D align="left")

**Note:** To view **Credentials FAQs**, click on the question mark icon next to **Credentials** title.

7. Click the **Execute** button.
    
8. Select the student account you started the lab with.
    
9. On the next screen, click **Allow** to give APIs Explorer access.
    

Your response should resemble the following:

```json
{
 "kind": "storage#bucket",
 "id": "qwiklabs-bucket01",
 "selfLink": "https://www.googleapis.com/storage/v1/b/qwiklabs-bucket01",
 "projectNumber": "250399850182",
 "name": "qwiklabs-bucket01",
 "timeCreated": "2019-10-18T13:59:08.300Z",
 "updated": "2019-10-18T13:59:08.300Z",
 "metageneration": "1",
 "iamConfiguration": {
  "bucketPolicyOnly": {
   "enabled": false
  },
  "uniformBucketLevelAccess": {
   "enabled": false
  }
 },
 "location": "US",
 "locationType": "multi-region",
 "storageClass": "STANDARD",
 "etag": "CAE="
}
```

Create a Cloud Storage Bucket.

Check my progress

## **Task 2. Make a second Cloud Storage bucket**

Now make another Cloud Storage bucket so you can get hands-on practice copying files between the two.

1. Still, in the `insert` method, ensure that your Project ID is still in the project field.
    
2. In the request body, for the **name** key-value pair, give your second bucket a unique name.
    
3. Make sure that there are no trailing spaces in any of the fields.
    
4. Click the **Execute** button. Your response should resemble the following:
    

```json
{
 "kind": "storage#bucket",
 "id": "qwiklabs-bucket02",
 "selfLink": "https://www.googleapis.com/storage/v1/b/qwiklabs-bucket02",
 "projectNumber": "250399850182",
 "name": "qwiklabs-bucket02",
 "timeCreated": "2019-10-18T13:59:08.300Z",
 "updated": "2019-10-18T13:59:08.300Z",
 "metageneration": "1",
 "iamConfiguration": {
  "bucketPolicyOnly": {
   "enabled": false
  },
  "uniformBucketLevelAccess": {
   "enabled": false
  }
 },
 "location": "US",
 "locationType": "multi-region",
 "storageClass": "STANDARD",
 "etag": "CAE="
}
```

You have successfully created two buckets with the `insert` method. Next you'll find them in the Cloud console.

Click *Check my progress* to verify the objective.

Make a second Cloud Storage bucket.

Check my progress

### View your Cloud Storage buckets in the Cloud console

1. Return to the Cloud console and from the **Navigation menu** go to **Cloud Storage** to ensure that your Cloud Storage buckets were created.
    
2. From the **Navigation menu** select **Cloud Storage** &gt; **Buckets**. You should see your newly created buckets added.
    

Remain in the Cloud console for the following step. Keep the APIs Explorer tab open.

## **Task 3. Upload files to your Cloud Storage bucket**

Upload some files to your Cloud Storage bucket so you can get hands-on practice with methods housed in the APIs explorer.

1. Save the following image to your computer and name it **demo-image1.png**:
    

![Dog](https://cdn.qwiklabs.com/E4%2BSx10I0HBeOFPB15BFPzf9%2F%2FOK%2Btf7S0Mbn6aQ8fw%3D align="left")

2. Now save this public domain image of [Ada Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace) to your computer and name it **demo-image2.png**:
    

![Ada Lovelace](https://cdn.qwiklabs.com/Hr8ohUSBSeAiMUJe1J998ydGcTu%2FrF4BUjZ2J%2BbiKps%3D align="left")

3. In the Cloud Storage browser select the first bucket from the list.
    
4. Click **Upload files** and select **demo-image1.png** and **demo-image2.png** from your computer.
    

Your bucket should now have both image files added to it and should resemble the following:

![demo-image1.png and demo-image2.png listed on the Objects tabbed page of qwiklabs-bucket01](https://cdn.qwiklabs.com/qQyrn5BM8biPy3EoKCZxJU8tw2thbbFkKoKb%2FI2l1To%3D align="left")

Click *Check my progress* to verify the objective.

Upload Files to Your Cloud Storage Bucket (demo-image1.png and demo-image2.png)

Check my progress

Next, you will copy one of the image files to your second Cloud Storage bucket.

## **Task 4. Copy files between Cloud Storage buckets**

1. From the left APIs & Reference section, navigate to **JSON API** &gt; **API reference** &gt; **Objects** &gt; **copy** to `copy` method or, to copy files between storage buckets using API Explorer, use the [Objects: copy reference](https://cloud.google.com/storage/docs/json_api/v1/objects/copy).
    
2. Update as follows:
    

* **sourceBucket**: type in the name of the bucket that contains the demo image files.
    
* **sourceObject**: enter in **demo-image1.png**.
    
* **destinationBucket**: enter intype the name of your second (empty) bucket.
    
* **destinationObject**: type in **demo-image1-copy.png**.
    

Your method should resemble the following:

![The Request parameters dialog displaying the bulleted information in step 2](https://cdn.qwiklabs.com/T4XJuHuw1KFSIDhEzCB4unBAb45izdwWyKAFQ0DwGSs%3D align="left")

3. Make sure that **Google OAuth 2.0** and **API key** checkboxes are selected under **Credentials** section.
    

**Note:** To view **Credentials FAQs**, click on question mark icon next to **Credentials** title.

4. Make sure that there are no trailing spaces in any of the fields.
    
5. Now scroll down and click **Execute**.
    

You should receive a similar output:

```json
{
 "kind": "storage#object",
 "id": "qwiklabs-bucket02/demo-image1-copy.png/1571408245199237",
 "selfLink": "https://www.googleapis.com/storage/v1/b/qwiklabs-bucket02/o/demo-image1-copy.png",
 "name": "demo-image1-copy.png",
 "bucket": "qwiklabs-bucket02",
 "generation": "1571408245199237",
 "metageneration": "1",
 "contentType": "image/png",
 "timeCreated": "2019-10-18T14:17:25.198Z",
 "updated": "2019-10-18T14:17:25.198Z",
 "storageClass": "STANDARD",
 "timeStorageClassUpdated": "2019-10-18T14:17:25.198Z",
 "size": "401951",
 "md5Hash": "LbpHpwhnApQKQx9IEXjTsQ==",
 "mediaLink": "https://www.googleapis.com/download/storage/v1/b/qwiklabs-bucket02/o/demo-image1-copy.png?generation=1571408245199237&alt=media",
 "owner": {
  "entity": "user-gcpstaging93416_student@qwiklabs.net"
 },
 "crc32c": "j5oPrg==",
 "etag": "CIWjgvL/peUCEAE="
}
```

You have successfully copied a file from one bucket to another using the `objects.copy` method.

Click *Check my progress* to verify the objective.

Copy files between Cloud Storage buckets (demo-image1-copy.png)

Check my progress

### View your updated bucket in the Cloud console

1. Return to the Cloud console for this step. You should have left off on your Cloud Storage bucket details page.
    
2. From the left-hand menu, click **Buckets** and select your second bucket. You should see the copy of **demo-image1.png** added.
    

## **Task 5. Delete files from a Cloud Storage bucket**

1. From the left APIs & Reference section navigate to **JSON API** &gt; **API reference** &gt; **Objects** &gt; **delete** or, to delete files from a Cloud Storage bucket using API Explorer, use the [Objects: delete reference](https://cloud.google.com/storage/docs/json_api/v1/objects/delete).
    
2. Now you'll delete an image file from a Cloud Storage bucket.
    

* **bucket**: enter in the name of your bucket that contains both demo image files.
    
* **object**: enter in **demo-image1.png**. Your method should resemble the following:
    

![The method displayed in the Request parameters dialog box](https://cdn.qwiklabs.com/9kPqMSP9xS6EyR41GQ5i9uV6JMPSeVMOXMzIzp9JKAA%3D align="left")

3. Make sure that **Google OAuth 2.0** and **API key** checkboxes are selected under **Credentials** section.
    

**Note:** To view **Credentials FAQs**, click on question mark icon next to **Credentials** title.

4. Make sure that there are no trailing spaces in any of the fields.
    
5. Now scroll down and click **Execute**.
    

You should receive a similar output as below:

![204 displayed on a green ribbon](https://cdn.qwiklabs.com/nRkqUtiQhhbyhJr7SILoziHp5HZOH39Vlr%2B8ES9Winc%3D align="left")

6. Now remove the second image from the Cloud Storage bucket. Still in the same method, for the **object** field, enter in **demo-image2.png**. Your bucket name will remain the same. Your method should resemble the following:
    

![The request parameters dialog box displaying the method](https://cdn.qwiklabs.com/o0kbacFtw85NbEJAl2nxLqWyTjXrjQu8zoKGv37YaxE%3D align="left")

7. Now scroll down and click **Execute**. You should receive a similar output:
    

![204 displayed on a green ribbon](https://cdn.qwiklabs.com/nRkqUtiQhhbyhJr7SILoziHp5HZOH39Vlr%2B8ES9Winc%3D align="left")

You have successfully deleted files from a bucket using the `objects.delete` method. You will now view your removed file in the Cloud console.

### View your updated bucket in the Cloud console

1. Return to the Cloud console for this step. You should have left off on your Cloud Storage bucket details page.
    
2. From the left-hand menu, click **Buckets** and select your first bucket. You should see that both images have been removed.
    

## **Task 6. Delete your Cloud Storage bucket**

1. From the left APIs & Reference section navigate to **JSON API** &gt; **API reference** &gt; **Buckets** &gt; **delete** to `buckets.delete` method or, to delete a Cloud Storage bucket using API Explorer, use the [Buckets: delete reference](https://cloud.google.com/storage/docs/json_api/v1/buckets/delete).
    

You will now delete your first (empty) Cloud Storage bucket.

2. For the **bucket** field, enter in the name of your first bucket. Your method should resemble the following:
    

![The Request parameters dialog box with the populated bucket field](https://cdn.qwiklabs.com/ApOaZPBzbblyXqVyyOqA%2BTJi09SKxkuyOHuQjEAfdUg%3D align="left")

3. Make sure that **Google OAuth 2.0** and **API key** checkboxes are selected under **Credentials** section.
    

**Note:** To view **Credentials FAQs**, click on question mark icon next to **Credentials** title.

4. Make sure that there are no trailing spaces in any of the fields.
    
5. Now scroll down and click **Execute**. You should receive a similar output:
    

![204 displayed on a green ribbon](https://cdn.qwiklabs.com/nRkqUtiQhhbyhJr7SILoziHp5HZOH39Vlr%2B8ES9Winc%3D align="left")

You have successfully deleted a bucket using the `buckets.delete` method.

### View your updated bucket in the Cloud console

1. Return to the Cloud console for this step. You should have left off on the Details page.
    
2. From the left-hand menu, click **Buckets**. You should see that your first bucket has been removed.
    

You have successfully completed all steps of the lab. You can end your lab here, or experiment with some new methods in the remaining time.

## **Task 7. Test your understanding**

Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

Each bucket has a default storage class, which you can specify when you create your bucket.TrueFalse

Every bucket must have a unique name across the entire Cloud Storage namespace.TrueFalse

Cloud Storage offers four storage classes:

* Nearline Storage
    
* Cross region storage
    
* Multi-Regional Storage
    
* Regional Storage
    
* Coldline StorageLocal storage
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=E2ztBJM9ycY&ab_channel=QUICKGCPLAB] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/APIs%20Explorer%20Cloud%20Storage/gsp421.sh
sudo chmod +x gsp421.sh
./gsp421.sh
```