---
title: "Getting Started with API Gateway: Challenge Lab - ARC109"
seoTitle: "Getting Started with API Gateway: Challenge Lab - ARC109"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Fri Jul 26 2024 14:41:50 GMT+0000 (Coordinated Universal Time)
cuid: clz2t9ggu000808mefi7vg340
slug: getting-started-with-api-gateway-challenge-lab-arc109
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755497648414/1e89f9eb-05de-4343-8156-bdc0bd4c6b25.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755497656675/33c258e4-9091-48f8-8498-22550df550a3.png
tags: api-gateway, getting-started-with-api-gateway-challenge-lab-arc109, arc109, getting-started-with-api-gateway-challenge-lab

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

You are just starting your junior data analyst role. So far you have been helping teams create, manage and access backend data resources.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with some of their initial work on a new project around exposing backend services as APIs. You have been asked to assist the team with their efforts using API Gateway, and you receive a request to complete the following tasks:

* Develop the backend system using a Cloud Run function.
    
* Deploy and manage an API exposing the backend service with a fully managed gateway.
    
* Subscribe to messages published on a Pub/Sub topic to react to events.
    

Each task is described below, good luck!

## Task 1. Create a Cloud Run function

**Note:** Cloud Run functions (2nd gen) depend on the Cloud Run Admin APIs. The Cloud Run Admin APIs have been enabled for you at the start of this lab. It may however take a few minutes for all of the enabled services to propagate. If you experience an issue when deploying your Cloud Run function, wait a few minutes then try again.

Create a new Cloud Run function (`2nd gen`) called `gcfunction` in the `us-central1` region using `Node.js 22` and allowing unauthenticated invocations. For now, simply have the function return "Hello World!" when invoked.

Click **Check my progress** to verify the objective.

Create a Cloud Run function.

## Task 2. Create an API Gateway

Once the Cloud Run function is deployed, configure an API Gateway to proxy requests to the backend.

Create a file named `openapispec.yaml` (using the code below), which references the Cloud Run function deployed in Task 1.

Use `openapispec.yaml` when deploying the API Gateway with the following properties:

| **Name** | **Value** |
| --- | --- |
| Display Name | gcfunction API (wherever requested) |
| API ID | gcfunction-api |
| Select a service account | Compute Engine default service account |
| Location | `us-central1` |
| Config Name | gcfunction-api |

```yaml
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
  address: https://gcfunction-968154473557.us-central1.run.app
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

**Note: It will take several minutes (~10 minutes) for the Create Gateway operation to complete.** To check the status of the creation and deployment process, you can click the Notifications icon (bell icon) in the top main navigation bar to display a status notification. Please ensure that the icon status for **Creating gateway "gcfunction API"** has a green check next to it before proceeding.

Click **Check my progress** to verify the objective.

Create an API Gateway.

## Task 3. Create a Pub/Sub Topic and Publish Messages via API Backend

The development team would like the API backend to publish messages to a new Pub/Sub topic named `demo-topic`.

Create a new Pub/Sub topic (`demo-topic`) and push messages to it in the Cloud Run function deployed earlier. Be sure to keep the option to create a default subscription enabled when creating the topic.

Use the snippet below to update the `package.json` file and `index.js` code in the Cloud Run function deployed in Task 1.

### package.json

```json
{
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0",
    "@google-cloud/pubsub": "^3.4.1"
  }
}
```

### index.js

```javascript
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

**Note:** It will take several minutes (~5 minutes) for the messages published to appear in the Messages section of the subscription after invoking the API Gateway endpoint.

Click **Check my progress** to verify the objective.

Create a Pub/Sub Topic and Publish Messages via API Backend.

---

## Solution of Lab

%[https://youtu.be/NnskLntSSfA] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Getting%20Started%20with%20API%20Gateway%20Challenge%20Lab/techcps109.sh
sudo chmod +x techcps109.sh
./techcps109.sh
```