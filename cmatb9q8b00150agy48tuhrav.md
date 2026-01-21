---
title: "Cloud Run Functions: Qwik Start - Command Line - GSP080"
seoTitle: "Cloud Run Functions: Qwik Start - Command Line - GSP080"
seoDescription: "A Cloud Run function is a piece of code that runs in response to an event, such as an HTTP request, a message from a messaging service, or a file upload. Cl"
datePublished: Sun May 18 2025 07:04:42 GMT+0000 (Coordinated Universal Time)
cuid: cmatb9q8b00150agy48tuhrav
slug: cloud-run-functions-qwik-start-command-line-gsp080
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747551687247/6f970d71-8f87-4690-a996-6d8a031a7caa.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747551867115/5d696fb7-95e2-40d3-a969-3778756f587c.png
tags: command-line, cloud-run-functions-qwik-start-command-line-gsp080, cloud-run-functions-qwik-start, cloud-run-functions-qwik-start-command-line, gsp080, command-line-gsp080

---

## Overview

A Cloud Run function is a piece of code that runs in response to an event, such as an HTTP request, a message from a messaging service, or a file upload. Cloud events are *things* that happen in your cloud environment. These might be things like changes to data in a database, files added to a storage system, or a new virtual machine instance being created.

Since Cloud Run functions are event-driven, they only run when something happens. This makes them a good choice for tasks that need to be done quickly or that don't need to be running all the time.

For example, you can use a Cloud Run function to:

* automatically generate thumbnails for images that are uploaded to Cloud Storage.
    
* send a notification to a user's phone when a new message is received in Pub/Sub.
    
* process data from a Cloud Firestore database and generate a report.
    

You can write your code in any language that supports Node.js, and you can deploy your code to the cloud with a few clicks. Once your Cloud Run function is deployed, it will automatically start running in response to events.

This hands-on lab shows you how to create, deploy, and test a Cloud Run function using the Google Cloud console.

This hands-on lab shows you how to create, deploy, and test a Cloud Run function using the Google Cloud Shell command line.

### What you'll do

* Create a Cloud Run function
    
* Deploy and test the Cloud Run function
    
* View logs
    

## Setup

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
    student-02-b772e06621f9@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    cynFRaPZEDXY
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

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-0f048e48a5f6`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-0f048e48a5f6
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-02-b772e06621f9@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-04-0f048e48a5f6
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Create a function

First, you're going to create a simple function named `helloWorld`. This function writes a message to the Cloud Run functions logs. It is triggered by Cloud Run function events and accepts a callback function used to signal completion of the function.

For this lab the Cloud Run function event is a pub/sub topic event. A pub/sub is a messaging service where the senders of messages are decoupled from the receivers of messages. When a message is sent or posted, a subscription is required for a receiver to be alerted and receive the message. To learn more about pub/subs, in Pub/Sub Guides, see [Pub/Sub: A Google-Scale Messaging Service](https://cloud.google.com/pubsub/architecture).

To learn more about the event parameter and the callback parameter, in Cloud Run functions Documentation, see [Background Functions](https://cloud.google.com/functions/docs/writing/background).

To create a Cloud Run function:

1. In Cloud Shell, run the following command to set the default region:
    
    ```apache
    gcloud config set run/region us-central1
    ```
    
2. Create a directory for the function code:
    
    ```apache
    mkdir gcf_hello_world && cd $_
    ```
    
3. Create and open `index.js` to edit:
    
    ```apache
    nano index.js
    ```
    
4. Copy the following into the `index.js` file:
    
    ```javascript
    const functions = require('@google-cloud/functions-framework');
    
    // Register a CloudEvent callback with the Functions Framework that will
    // be executed when the Pub/Sub trigger topic receives a message.
    functions.cloudEvent('helloPubSub', cloudEvent => {
      // The Pub/Sub message is passed as the CloudEvent's data payload.
      const base64name = cloudEvent.data.message.data;
    
      const name = base64name
        ? Buffer.from(base64name, 'base64').toString()
        : 'World';
    
      console.log(`Hello, ${name}!`);
    });
    ```
    
5. Exit nano (Ctrl+x) and save (Y) the file.
    
6. Create and open `package.json` to edit:
    
7. Copy the following into the `package.json` file:
    
    ```json
    {
      "name": "gcf_hello_world",
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "dependencies": {
        "@google-cloud/functions-framework": "^3.0.0"
      }
    }
    ```
    
8. Exit nano (Ctrl+x) and save (Y) the file.
    
9. Install the package dependencies
    
    ```apache
    npm install
    ```
    
    **Expected Output:**
    
    ```apache
    added 140 packages, and audited 141 packages in 9s
    
    27 packages are looking for funding
    run `npm fund` for details
    
    found 0 vulnerabilities
    ```
    

## Task 2. Deploy your function

For this lab, you'll set the `--trigger-topic` as `cf_demo`.

**Note:**  
Cloud Run functions are event driven, meaning a trigger type must be specified. When deploying a new function, `--trigger-topic`, `--trigger-bucket`, or `--trigger-http` are common trigger events. When deploying an update to an existing function, the function keeps the existing trigger unless otherwise specified.

1. Deploy the **nodejs-pubsub-function** function to a pub/sub topic named **cf-demo**
    
    ```apache
    gcloud functions deploy nodejs-pubsub-function \
      --gen2 \
      --runtime=nodejs20 \
      --region=us-central1 \
      --source=. \
      --entry-point=helloPubSub \
      --trigger-topic cf-demo \
      --stage-bucket qwiklabs-gcp-04-0f048e48a5f6-bucket \
      --service-account cloudfunctionsa@qwiklabs-gcp-04-0f048e48a5f6.iam.gserviceaccount.com \
      --allow-unauthenticated
    ```
    
    **Note:**  
    If you get a service account **serviceAccountTokenCreator** notification select **"n"**.
    
2. Verify the status of the function:
    
    ```apache
    gcloud functions describe nodejs-pubsub-function \
      --region=us-central1
    ```
    
    An ACTIVE status indicates that the function has been deployed.
    
    **Expected Output:**
    
    ```apache
    BuildConfig:
      automaticUpdatePolicy: {}
      build: projects/630521560493/locations/us-central1/builds/7ff9d415-50d9-4557-9bcd-5afad42a6390
      dockerRegistry: ARTIFACT_REGISTRY
      dockerRepository: projects/qwiklabs-gcp-04-0f048e48a5f6/locations/us-central1/repositories/gcf-artifacts
      entryPoint: helloPubSub
    ...
    State: ACTIVE
    ...
    UpdateTime: '2024-08-05T13:51:05.317298824Z'
    Url: https://us-central1-qwiklabs-gcp-04-0f048e48a5f6.cloudfunctions.net/nodejs-pubsub-function
    ```
    

Every message published in the topic triggers function execution, the message contents are passed as input data.

### Test Completed Task

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will receive an assessment score.

Deploy the function.

**Check my progress**

## Task 3. Test the function

After you deploy the function and know that it's active, test that the function writes a message to the cloud log after detecting an event.

1. Invoke the PubSub with some data.
    
    ```apache
    gcloud pubsub topics publish cf-demo --message="Cloud Function Gen2"
    ```
    
    **Example output:**
    
    ```apache
    messageIds:
    - '11927162971409664'
    ```
    

View logs to confirm that there are log messages with that execution ID.

## Task 4. View logs

1. Check the logs to see your messages in the log history:
    
    ```apache
    gcloud functions logs read nodejs-pubsub-function \
      --region=us-central1
    ```
    
    **Note:**  
    The logs can take around 10 mins to appear. Also, the alternative way to view the logs is, go to **Logging** &gt; **Logs Explorer**.
    
    The Cloud Run function will output information similar to below:
    

Your application is deployed, tested, and you can view the logs.

## Task 5. Test your understanding

1. Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.
    
    Serverless lets you write and deploy code without the hassle of managing the underlying infrastructure.TrueFalse
    

---

## Solution of Lab

### Quick

%[https://youtu.be/j56NWOm8cmM] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Cloud%20Run%20Functions%3A%20Qwik%20Start%20-%20Command%20Line/techcps080.sh
sudo chmod +x techcps080.sh
./techcps080.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1747551743325/b826bee2-91fc-458c-befc-b14ef1f2a63f.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1747551747853/50a8eb29-af03-414c-a2e7-87133f5f480c.png align="center")

---

### Manual

%[https://www.youtube.com/watch?v=JPHJv7HQ9O8]