---
title: "Cloud Run Functions: 3 Ways: Challenge Lab - ARC104"
seoTitle: "Cloud Run Functions: 3 Ways: Challenge Lab - ARC104"
seoDescription: "Learn to create and deploy Cloud Run functions using Cloud Storage and HTTP triggers in this hands-on challenge lab"
datePublished: Sat Aug 30 2025 08:55:28 GMT+0000 (Coordinated Universal Time)
cuid: cmey10rw4000d02ky9ewc2grn
slug: cloud-run-functions-3-ways-challenge-lab-arc104
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756544085025/a5763c88-15bd-4351-83cc-7af47b0bde5e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756544112055/9a16cf58-f907-434e-ba94-f5bbfdf125aa.png
tags: cloud-run-functions-qwik-start, cloud-run-functions-3-ways-challenge-lab-arc104, cloud-run-functions-3-ways-challenge-lab, arc104

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## Setup

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Challenge scenario

You are just starting your junior cloud developer role. So far you have been helping teams create and manage Cloud Run functions that respond to and get triggered by specific events in their Google Cloud projects.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with some of their initial work on a new project. Specifically, they need to automate running code based on specific activities in their Google Cloud project including HTTP requests and new events in Cloud Storage; you receive the following request to complete the following tasks:

* Create a bucket to upload new project files.
    
* Create, deploy, and test a Cloud Storage function that logs new activities in the Cloud Storage bucket.
    
* Create and deploy a function that responds to HTTP requests with minimum instances to limit cold starts.
    

Some standards you should follow:

* Ensure that any needed APIs (such as Cloud Run functions) are successfully enabled.
    
* Ensure that any needed IAM permissions (such as for the Cloud Storage service account) are assigned.
    
* Create all resources in the `us-east4` region, unless otherwise directed.
    

Each task is detailed below, good luck!

## Task 1. Create a Cloud Storage bucket

* Create a Cloud Storage bucket in `us-east4` using your Project ID as the bucket name: `qwiklabs-gcp-04-a59145c06193`
    

Click *Check my progress* to verify the objective.

Create a Cloud Storage bucket `qwiklabs-gcp-04-a59145c06193`

## Task 2. Create, deploy, and test a Cloud Storage function

1. Create and deploy a Cloud Function called `cs-logger` that executes every time a new event occurs in the bucket called `qwiklabs-gcp-04-a59145c06193` you created in task 1. The function is written in **Node.js 20**.
    
2. Set the **Region** to `us-east4`, and set the **Entry point** (Function to execute) to your function name.
    
3. Deploy the function with **2** maximum instances.
    
4. Use the following code blocks for the index.js and package.json:
    

index.js (replace `eventStorage` with your function name):

```apache
const functions = require('@google-cloud/functions-framework');

functions.cloudEvent('eventStorage', (cloudevent) => {
  console.log('A new event in your Cloud Storage bucket has been logged!');
  console.log(cloudevent);
});
```

package.json:

```json
{
  "name": "nodejs-functions-gen2-codelab",
  "version": "0.0.1",
  "main": "index.js",
  "dependencies": {
    "@google-cloud/functions-framework": "^2.0.0"
  }
}
```

**Note:** If you get **permissions error**, please wait a few minutes and try the deployment again. It takes a few minutes for the APIs to be enabled.

5. Test the function by uploading any file to the bucket.
    

Click *Check my progress* to verify the objective.

Create a Cloud Storage function `cs-logger`

## Task 3. Create and deploy a HTTP function with minimum instances

1. Create and deploy a HTTP function called `http-responder` that responds to HTTP requests. The function is written in **Node.js 20**.
    
2. Set the **Region** to `us-east4`, and set the **Entry point** (Function to execute) to your function name.
    
3. Deploy the function with **1** minimum instance and **2** maximum instances.
    
4. Use the following code blocks for the index.js and package.json:
    

index.js (replace `helloWorld` with your function name):

```javascript
const functions = require('@google-cloud/functions-framework');

functions.http('helloWorld', (req, res) => {
  res.status(200).send('HTTP function (2nd gen) has been called!');
});
```

package.json:

```json
{
  "name": "nodejs-functions-gen2-codelab",
  "version": "0.0.1",
  "main": "index.js",
  "dependencies": {
    "@google-cloud/functions-framework": "^2.0.0"
  }
}
```

Click *Check my progress* to verify the objective.

Create a HTTP function `http-responder`

**Note:** If you get **permissions error**, please wait a few minutes and try the deployment again. It takes a few minutes for the APIs to be enabled.

---

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC104/lab.sh
source lab.sh
```

---

### Manual

%[https://youtu.be/SuzUtqXvI6s]