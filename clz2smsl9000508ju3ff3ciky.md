---
title: "Cloud Functions: Qwik Start - Console - GSP081"
seoTitle: "Cloud Functions: Qwik Start - Console - GSP081"
seoDescription: "A cloud function is a piece of code that runs in response to an event, such as an HTTP request, a message from a messaging service, or a file upload. Cloud "
datePublished: Fri Jul 26 2024 14:24:12 GMT+0000 (Coordinated Universal Time)
cuid: clz2smsl9000508ju3ff3ciky
slug: cloud-functions-qwik-start-console-gsp081
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722003605792/4aaaf6b5-7caa-4f3a-bcf0-756ad07f7acb.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722003829326/7d82c9ca-f078-450a-89d8-b60299f6feb8.png
tags: cloud-functions-qwik-start-console-gsp081, gsp081

---

## **Overview**

A cloud function is a piece of code that runs in response to an event, such as an HTTP request, a message from a messaging service, or a file upload. Cloud events are *things* that happen in your cloud environment. These might be things like changes to data in a database, files added to a storage system, or a new virtual machine instance being created.

Since cloud functions are event-driven, they only run when something happens. This makes them a good choice for tasks that need to be done quickly or that don't need to be running all the time.

For example, you can use a cloud function to:

* automatically generate thumbnails for images that are uploaded to Cloud Storage.
    
* send a notification to a user's phone when a new message is received in Cloud Pub/Sub.
    
* process data from a Cloud Firestore database and generate a report.
    

You can write your code in any language that supports Node.js, and you can deploy your code to the cloud with a few clicks. Once your cloud function is deployed, it will automatically start running in response to events.

This hands-on lab shows you how to create, deploy, and test a cloud function using the Google Cloud console.

### What you'll do

* Create a cloud function
    
* Deploy and test the function
    
* View logs
    

## **Task 1. Create a function**

In this step, you're going to create a cloud function using the console.

1. In the console, click the **Navigation menu ()** &gt; **Cloud Functions**.
    
2. Click **Create function**.
    
3. In the **Create function** dialog, enter the following values:
    

| **Field** | **Value** |
| --- | --- |
| Environment | 2nd Gen |
| Function name | GCFunction |
| Region | `us-east1` |
| Trigger type | **HTTPS** |
| Authentication | Allow unauthenticated invocations |
| Memory allocated (In Runtime, Build, Connections and Security Settings) | Keep it default |
| Autoscaling | Set the **Maximum number of instance** to **5** and then click **Next** |

**Note:** A helpful popup may appear to validate the required APIs are enabled in the project. Click the **ENABLE** button when requested.

You deploy the function in the next section.

## **Task 2. Deploy the function**

1. Still in the **Create function** dialog, in Source code for **Inline editor** use the default `helloWorld` function implementation already provided for index.js.
    
2. At the bottom, click **Deploy** to deploy the function.
    
3. After you click **Deploy**, the console redirects to the **Cloud Functions Overview** page.
    

**Note:**While the function is being deployed, the icon next to it is a small spinner. When it's deployed, the spinner is a green check mark.

### Test completed task

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will be granted an assessment score.

Deploy the function.

**Check my progress**

## **Task 3. Test the function**

Test the deployed function.

1. In the **Cloud Functions Overview** page, click on **GCFunction**.
    
    ![Cloud Functions Overview page](https://cdn.qwiklabs.com/ntNLM4%2FRUocarLOxoKvDXPRSx0vIE0nD4aZOMFFzwhY%3D align="left")
    
2. On function details dashboard, to test the function click on **TESTING**.
    
    ![Cloud Functions details page](https://cdn.qwiklabs.com/h2GXcp0cfCzmfAN13imzhFPR5FuUpjXnFpxn4W%2B30tg%3D align="left")
    
3. In the Triggering event field, enter the following text between the brackets `{}` and click **Test the function**.
    
    ```apache
    "message":"Hello World!"
    ```
    
    Copied!content\_copy
    

In the **Output** field, you should see the message `Success: Hello World!`

In the **Logs** field, a status code of **200** indicates success. (It may take a minute for the logs to appear.)

![A status code of 200 displays in the Logs field](https://cdn.qwiklabs.com/3u9%2FKmmTfQoVBuLcD6ecW5n4LqGxt4g%2FMRaPZ0nJfLc%3D align="left")

## **Task 4. View logs**

View logs from the Cloud Functions Overview page.

1. Click the blue arrow to go back to the **Cloud Functions Overview** page.
    
    ![Blue arrow](https://cdn.qwiklabs.com/9H5sRV3E8z2I%2FoUmhqD3ODBGMAdnPlX2E3TUzSkOnmg%3D align="left")
    
2. Display the menu for your function, and click **View logs**.
    
    ![View logs option in the function menu](https://cdn.qwiklabs.com/r%2FoV8YPZn8fKg5t%2B6KJZWvF9uNpJoc3zFf2Khuw%2Fkhg%3D align="left")
    
    Example of the log history that displays in **Query results**:
    
    ![Log history on Query results page](https://cdn.qwiklabs.com/jybuRC0x9ToONDo2zrvJJJ7LNdoTtRmnfiIA7f2XSi4%3D align="left")
    
    Your application is deployed, tested, and you can view the logs.
    
    Test the function
    
    **Check my progress**
    

## **Task 5. Test your understanding**

Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

**Cloud Functions is a serverless execution environment for event driven services on Google Cloud.**

* True
    
* False
    

**Which type of trigger is used while creating Cloud Function in the lab?**

* Firebase
    
* Google Cloud Pub/Sub
    
* Cloud StorageHTTP
    

---

Answer of Lab

%[https://www.youtube.com/watch?v=URAbi1yqwNE&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722003641407/fc3195c6-bdb5-41df-8ac0-a8fa78419e98.png align="center")

```apache
export REGION=
```

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Cloud%20Functions%20Qwik%20Start%20%20Console/quicklabsgsp081.sh
sudo chmod +x quicklabsgsp081.sh
./quicklabsgsp081.sh
```