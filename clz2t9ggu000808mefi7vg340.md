---
title: "Getting Started with API Gateway: Challenge Lab - ARC109"
seoTitle: "Getting Started with API Gateway: Challenge Lab - ARC109"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Fri Jul 26 2024 14:41:50 GMT+0000 (Coordinated Universal Time)
cuid: clz2t9ggu000808mefi7vg340
slug: getting-started-with-api-gateway-challenge-lab-arc109
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722004130020/ff237f86-e78c-4ad9-8b20-d27607615b60.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722004890035/1e88f22b-9114-42eb-a9cf-ebf644d1c665.png
tags: getting-started-with-api-gateway-challenge-lab-arc109

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Task 1. Create a Cloud Function**

**Note:** 2nd gen Cloud Functions depend on the Cloud Run Admin APIs. The Cloud Run Admin APIs have been enabled for you at the start of this lab. It may however take a few minutes for all of the enabled services to propogate. If you experience an issue when deploying your 2nd gen Cloud Function, wait a few minutes then try again.

Create a new `2nd gen` Cloud Function called `GCFunction` in the `us-east1` and deploy it. For now, have the function return "Hello World!" when invoked. Ensure that you allow the function to be called unauthenticated by running the following in Cloud Shell once the deployment has completed.

```apache
gcloud functions add-invoker-policy-binding GCFunction \
    --region="us-east1" \
    --member="allUsers"
```

Click **Check my progress** to verif[y](https://cloud.google.com/functions/docs/console-quickstart) the objective.

Create a Cloud Function

**Check my progress**

## **Task 2. Create an API Gateway**

Once the Cloud Function is deployed, configure an API Gateway to proxy requests to the backend.

Use the following `openapispec.yaml` file to reference the Cloud Function deployed in Task 1.

Deploy the API Gateway with the following properties:

| **Name** | **Value** |
| --- | --- |
| Display Name | GCFunction API (wherever requested) |
| API ID | gcfunction-api |
| Se[l](https://cloud.google.com/functions/docs/console-quickstart)ect a service account | Compute Engine default service account |
| Location | `us-east1` |
| Config Name | gcfunction-api |

```apache
swagger: '2.0'
info:
  title: GCFunction API
  description: Sample API on API Gateway with a Google Cloud Functions backend
  version: 1.0.0
schemes:
  - https
produces:
  - application/json
paths:
  /GCFunction:
    get:
      summary: gcfunction
      operationId: gcfunction
      x-google-backend:
        address: https://us-east1-qwiklabs-gcp-01-69ef2d92f9c9.cloudfunctions.net/GCFunction
      responses:
       '200':
          description: A successful response
          schema:
            type: string
```

Copied!content\_copy

**Note: It will take several minutes (~10 minutes) for the Create Gateway operation to complete.** To check the status of the creation and deployment process, you can click the Notification icon in the main navigation bar to display a status notification, as shown in the image below. Please ensure that the icon status has a green check next to it before proceeding.

Click **Check my progress** to verif[y](https://cloud.google.com/functions/docs/console-quickstart) the objective.

Create an API Gateway

**Check my progress**

## **Task 3. Create a Pub/Sub Topic and Publish Messages via API Backend**

The development team would like the API backend to publish messages to a new Pub/Sub topic named `demo-topic`.

Create a new Pub/Sub topic (`demo-topic`) and push messages to it in the Cloud Function deployed earlier. Be sure to keep the option to create a default subscription enabled when creating the topic.

Use the snippet below to update the `package.json` file and `index.js` code in the Cloud Function deployed in Task 1.

**package.json**

```json
{
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0",
    "@google-cloud/pubsub": "^3.4.1"
  }
}
```

**index.js**

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
  topic.publishMessage({data: Buffer.from('Hello from Cloud Functions!')});
  res.status(200).send("Message sent to Topic demo-topic!");
});
```

Redeploy the Cloud Function once the `index.js` and `package.json` files have been updated.

Next, invoke the Cloud Function via API Gateway. If done correctly, a message will be published to the topic `demo-topic` you've created in this task.

**Note:** It will take several minutes (~5 minutes) for the messages published to appear in the Messages section of the subscription after invoking the API Gateway endpoint.

Click **Check my progress** to verify the objective.

---

### Answer of Lab

%[https://www.youtube.com/watch?v=9uTkzIhKQh0&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722004798679/ad647cd3-6907-4994-ac9a-efc06005586b.png align="center")

```apache
export REGION=
```

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Getting%20Started%20with%20API%20Gateway%20Challenge%20Lab/quicklabarc109.sh
sudo chmod +x quicklabarc109.sh
./quicklabarc109.sh
```