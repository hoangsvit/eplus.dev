---
title: "Deploy and Secure Serverless APIs with API Gateway: Challenge Lab - ARC109"
seoTitle: "Deploy and Secure Serverless APIs with API Gateway: Challenge Lab - ARC109"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-07-23T08:16:05.721Z
cuid: cmrx8lop6000109kld8kkgf1w
slug: deploy-and-secure-serverless-apis-with-api-gateway-challenge-lab-arc109
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/93d5baee-ce13-4371-b73b-40c1ce9eb92c.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/cbfd8337-4b79-4823-a328-e778a32ed30e.png
tags: arc109, deploy-and-secure-serverless-apis-with-api-gateway-challenge-lab-arc109, deploy-and-secure-serverless-apis-with-api-gateway-challenge-lab

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Setup**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## **Challenge scenario**

You are just starting your junior data analyst role. So far you have been helping teams create, manage and access backend data resources.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with some of their initial work on a new project around exposing backend services as APIs. You have been asked to assist the team with their efforts using API Gateway, and you receive a request to complete the following tasks:

*   Develop the backend system using a Cloud Run function.
    
*   Deploy and manage an API exposing the backend service with a fully managed gateway.
    
*   Subscribe to messages published on a Pub/Sub topic to react to events.
    

Each task is described below, good luck!

## **Task 1. Create a Cloud Run function**

**Note:** Cloud Run functions (2nd gen) depend on the Cloud Run Admin APIs. The Cloud Run Admin APIs have been enabled for you at the start of this lab. It may however take a few minutes for all of the enabled services to propagate. If you experience an issue when deploying your Cloud Run function, wait a few minutes then try again.

Create a new Cloud Run function (`2nd gen`) called `gcfunction` in the `us-east1` region using `Node.js 22` and allowing unauthenticated invocations. For now, simply have the function return "Hello World!" when invoked.

Click **Check my progress** to verify the objective.

## **Task 2. Create an API Gateway**

Once the Cloud Run function is deployed, configure an API Gateway to proxy requests to the backend.

Create a file named `openapispec.yaml` (using the code below), which references the Cloud Run function deployed in Task 1.

Use `openapispec.yaml` when deploying the API Gateway with the following properties:

| **Name** | **Value** |
| --- | --- |
| Display Name | gcfunction API (wherever requested) |
| API ID | gcfunction-api |
| Select a service account | Compute Engine default service account |
| Location | `us-east1` |
| Config Name | gcfunction-api |

```plaintext
swagger: '2.0'
info:
  title: gcfunction API
  description: Sample API on API Gateway with a Google Cloud Run functions backend
  version: 1.0.0
schemes:
- https
produces:
- application/json
x-google-backend:
  address: https://gcfunction-973935984623.us-east1.run.app
paths:
  /gcfunction:
    get:
      summary: gcfunction
      operationId: gcfunction
      responses:
       '200':
          description: A successful response
          schema:
            type: string
```

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>Note: It will take several minutes (~10 minutes) for the Create Gateway operation to complete.</strong> To check the status of the creation and deployment process, you can click the Notifications icon (bell icon) in the top main navigation bar to display a status notification. Please ensure that the icon status for <strong>Creating gateway "gcfunction API"</strong> has a green check next to it before proceeding.</div>
</div>

## **Task 3. Create a Pub/Sub Topic and Publish Messages via API Backend**

The development team would like the API backend to publish messages to a new Pub/Sub topic named `demo-topic`.

Create a new Pub/Sub topic (`demo-topic`) and push messages to it in the Cloud Run function deployed earlier. Be sure to keep the option to create a default subscription enabled when creating the topic.

Use the snippet below to update the `package.json` file and `index.js` code in the Cloud Run function deployed in Task 1.

### package.json

```plaintext
{
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0",
    "@google-cloud/pubsub": "^3.4.1"
  }
}
```

### index.js

```plaintext
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const topic = pubsub.topic('demo-topic');
const functions = require('@google-cloud/functions-framework');

exports.helloHttp = functions.http('helloHttp', (req, res) => {

  // Send a message to the topic
  topic.publishMessage({data: Buffer.from('Hello from Cloud Run functions!')});
  res.status(200).send("Message sent to Topic demo-topic!");
});
```

Redeploy the Cloud Run function once the `index.js` and `package.json` files have been updated.

Next, invoke the Cloud Run function via API Gateway. If done correctly, a message will be published to the topic `demo-topic` you've created in this task.

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>Note: </strong>It will take several minutes (~5 minutes) for the messages published to appear in the Messages section of the subscription after invoking the API Gateway endpoint.</div>
</div>

* * *

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=N2yLVNGvQNY] 

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC109/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Getting%20Started%20with%20API%20Gateway%3A%20Challenge%20Lab/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```

* * *

### Other Solution

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC109/other.sh
source other.sh
```