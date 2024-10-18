---
title: "Building Virtual Agent Fulfillment - GSP792"
seoTitle: "Building Virtual Agent Fulfillment - GSP792"
seoDescription: "In this lab, you will continue working on your Pigeon Travel virtual agent created in the Design Conversational Flows for your Agent and add context as well"
datePublished: Sun Aug 11 2024 03:29:04 GMT+0000 (Coordinated Universal Time)
cuid: clzp09wek000408l60jptdy45
slug: building-virtual-agent-fulfillment-gsp792
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723288991930/41be19fe-12ff-4592-957a-93bb710a1bbf.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723346929700/7dec03a2-72f0-44f5-8e48-afb1309a7eb5.png
tags: building-virtual-agent-fulfillment-gsp792

---

## **Overview**

In this lab, you will continue working on your Pigeon Travel virtual agent created in the Design Conversational Flows for your Agent and add context as well as set up fulfillment to look up and store reservations entries in Firestore.

**Note:** You will need the exported agent zip file from the Design Conversational Flows for your Agent lab to continue with this lab. Otherwise, you will have to build all the intents and entities in Design Conversational Flows for your Agent lab from scratch before proceeding with the steps in this lab.

**What you'll learn**

In this lab you will perform the following tasks:

* Create a Firestore Collection
    
* Setup fulfillment as Cloud Functions code for the agent to be able to lookup and change the name on the reservation.
    

---

## **Task 1. Enable the API**

1. In the Cloud Console go to **Navigation menu** () &gt; **APIs & Services** &gt; **Enable APIs and Services**.
    
2. Click **\+ Enable APIs and Services**.
    
3. Search for **Dialogflow**.
    
4. Click the **Dialogflow API** tile. If the API is not enabled, click **Enable**.
    
5. Search for **Cloud function**.
    
6. Click on the **Cloud function API** and if it is already Enabled, click **Manage**.
    
7. Click **Disable API**.
    
    If you are asked to confirm, click **Disable**.
    
8. Click **Enable**.
    
    When the API has been enabled again, the page will show the option to disable.
    

### Set up IAM permissions

1. From the **Navigation menu** (), go to **IAM & admin** &gt; **IAM**.
    
2. Edit the permissions for your **Google Cloud Functions Service Agent** by locating the service agent under the IAM list and selecting the pencil icon. The service account will have the Domain `@gcf-admin-robot.iam.gserviceaccount.com`.
    
3. If you are unable to see any service account click the checkbox **Include Google-provided role grants**.
    
4. Click **add another role** in the dialog and then select **Artifact Registry &gt; Artifact Registry Reader** role.
    
5. Click **Save**.
    

## **Task 2. Create your Dialogflow agent**

You'll call your agent "pigeon-travel".

1. Go to the [Dialogflow Console](https://dialogflow.cloud.google.com/).
    
2. Click **Sign in with the Google** button, and make sure to select the lab credentials you logged into this lab with. Then click **Allow**.
    
3. Uncheck the email preferences and check the **Terms of Service**. Click on **Accept**.
    
4. In the left menu, click **Create agent**.
    
5. Now add the agent information as you see in the screenshot below:
    

* **Agent Name**: `pigeon-travel`
    
* **Default Time Zone**: `America/Denver`
    
* **Google Project**: *use your lab Project ID*
    

6. Click **Create**.
    

Click **Check my progress** to verify the objective.

Assessment Completed! Dialogflow agent names: \["pigeon-travel"\]

Create the Dialogflow agent

**Check my progress**

*Assessment Completed! Dialogflow agent names: \["pigeon-travel"\]*

## **Task 3. Import your Dialogflow agent**

In the previous lab, you exported the Dialogflow agent you built. You will now import it back in and continue building it.

This will create a new virtual agent project. Now you'll want to import the work you've already done.

* If you do not have exported files to use, use this file:
    

```apache
https://storage.cloud.google.com/qwiklabs-resources-ccai-quest/pigeon-travel-gsp-792.zip
```

Copied!content\_copy

* Download the file to your local workstation.
    

1. Click on the **settings** gear icon next to your agent name.
    
2. Select the **Export and import** tab.
    

![Export and Import tabbed page](https://cdn.qwiklabs.com/PFPFOrt60dqJZDk4cGxj7lsdpPu6a1PyfQt1KAa6yJs%3D align="left")

3. Click **Import from zip**.
    
4. Click **Select file** and navigate to the zip file which contains the configuration of your virtual agent. You can alternatively drag and drop the file if you prefer.
    
5. Type in the word "IMPORT" in all caps to enable the import button and click **Import**.
    

![Upload agent page](https://cdn.qwiklabs.com/5CyX5VftEOuRQYTzMsr77KdASfuOwvsNVf%2BieRaqAnY%3D align="left")

6. Click **Done** to close out the upload window once the import is complete.
    

Your existing configuration has been imported into your new agent project.

Click **Check my progress** to verify the objective.

Assessment Completed!

Import your Dialogflow agent

**Check my progress**

*Assessment Completed!*

## **Task 4. Set up fulfillment using Cloud Functions to look up reservations in Firestore**

So far the agent does a good job communicating with a customer to get their information including a reservation number. However, the information collected is not checked or recorded anywhere to enable further possible action. In this section, you will set up fulfillment by adding Node.js code and deploy it as a Cloud Function for your agent to look up the current reservation and add the change.

### Configure Firestore

1. In the Console go to **Navigation menu** &gt; **Databases** &gt; **Firestore**.
    
2. Click **Create Database**.
    
3. For **Select your Firestore mode**, Choose **Native mode (recommended)** and click **Continue**.
    
4. For the location select **Multi-region** and then choose **nam5 (United States)** for the multi-region.
    
5. Click **Create database**. Once it completes you will have the ability to create a new collection.
    
6. Click **Start collection**.
    
7. Fill in the details to replicate the details below, then click **Save**.
    

* **Collection ID**: `reservations`
    
* **Document ID**: `100`
    
* **Field name**: `fname`
    
* **Field type**: `string`
    
* **Field value**: `Isabel`
    

8. Then click the **Add a Field (+)** button to add another:
    

* **Field name**: `lname`
    
* **Field type**: `string`
    
* **Field value**: `Costa`
    

9. Then click the **Add a Field (+)** button to add another:
    

* **Field name**: `newname`
    
* **Field type**: `string`
    
* **Field value**:
    

You have now added your first document to a Firestore collection.

**Firestore Document IDs Best Practice**

* Avoid the document IDs . and ...
    
* Avoid using / forward slashes in document IDs.
    
* Do not use monotonically increasing document IDs such as:
    
    * Customer1, Customer2, Customer3, ...
        
    * Product 1, Product 2, Product 3, ...
        
    
    Such sequential IDs can lead to hotspots that impact latency.
    

### Dialogflow Fulfillment

1. Navigate to the Diaglflow console and click on **Fulfillment** in the left menu. It may take a few minutes for the resources to be provisioned.
    
2. Next to the **Inline Editor** option, slide the slider to the right so it appears **Enabled**. This enables the Cloud Functions editor within your Dialogflow agent.
    

**Note**: If you receive an error message, try refreshing the page and then try enabling the slider again.

3. Once enabled, you will notice a default template in **index.js**.
    
4. Click on the **Deploy** button on the bottom right. This may take a few minutes.
    
5. Once deployment is successful, go into your Google Cloud console, and using the menu on the left, navigate to **Cloud Functions** to confirm if the function has been deployed.
    

Click **Check my progress** to verify the objective.

Assessment Completed!

Set up fulfillment using Cloud Function

**Check my progress**

*Assessment Completed!*

6. Back in the **Fulfillment** section of your Dialogflow console, click on the **index.js** tab.
    
7. Again notice that there is already some starter code, including functions to handle the default welcome and fallback intents. You will first add the following lines below to be able to work with Firestore.
    

Add the following code above the line that says `process.env.DEBUG = 'dialogflow:debug';`:

```apache
const admin = require('firebase-admin');
```

Copied!content\_copy

Add this code block below the line that says `process.env.DEBUG = 'dialogflow:debug';`:

```apache
admin.initializeApp();
admin.firestore().settings( { timestampsInSnapshots: true });
const db = admin.firestore();
```

Copied!content\_copy

8. Now add the following code for handling or reservations after the handler functions for Welcome and Fallback intents.
    

Add the following code block below the line that says

`exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {`:

```apache
function reservation(agent) {
	let id = agent.parameters.reservationnumber.toString();
	let collectionRef = db.collection('reservations');
	let userDoc = collectionRef.doc(id);
	return userDoc.get()
		.then(doc => {
			if (!doc.exists) {
				agent.add('I could not find your reservation.');
			} else {
				db.collection('reservations').doc(id).update({
					newname: agent.parameters.newname
				}).catch(error => {
					console.log('Transaction failure:', error);
					return Promise.reject();
				});
				agent.add('Ok. I have updated the name on the reservation.');
			}
			return Promise.resolve();
		}).catch(() => {
			agent.add('Error reading entry from the Firestore database.');
		});
}
```

Copied!content\_copy

9. Modify the `intentMap` to include an entry to handle the `name.reservation-getname` mapping to the function you just added:
    

```apache
intentMap.set('name.reservation-getname', reservation);
```

Copied!content\_copy

so that it looks something like this:

```apache
  let intentMap = new Map();
  intentMap.set('name.reservation-getname', reservation);
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  agent.handleRequest(intentMap);
```

10. In `package.json` tab make sure that `firebase-admin` is set to `"^5.13.1"`:
    

```apache
"firebase-admin": "^5.13.1"
```

Copied!content\_copy

11. Click the **Deploy** button to save and deploy the code.
    
12. Click on the **Intents** in the left menu, and go into the `name.reservation-getname` inside the `name.reservation` intent and navigate all the way down to **Fulfillment**, under click the toggle switch for **Enable the webhook call for this intent** to enable it. **Save** the intent.
    
13. Try it out in the simulator by typing out the question: **change name on booking**.
    

You will get the default response like: **Sure I can help you to change your name on the reservation. Can I have your first name?**.

14. Try by entering any username you want.
    
15. Then Try entering **100** when you get the default response asking for the reservation number.
    
16. After that enter the new name for which you want to make a reservation, for example: **Kelly**.
    
17. After the successful completion, you will receive the default response like: **Thank you dylan. I have changed the name on reservation number 100 to be kelly.**
    
18. You can confirm this further by going into the Cloud Console and using the left menu, navigate to **Firestore &gt; Data**.
    

You will see the entry for your name change. Notice a new key/value pair was added, this way you can see what the original name was plus know what the new name is.

![new key/value pair. fname: "Isabel", lname: "costa", newname name: "kelly"](https://cdn.qwiklabs.com/YtgK1BNOPxnuMyzByDfJizaUEKrlUz%2B2EIEyGGIfC0s%3D align="left")

19. Examine the logs for code errors in your Dialogflow console. On the bottom left of the **Fulfillment** section, click **View execution logs in the Google Cloud console** to view the logs.
    
20. Examine the logs to see if there are any errors. Click **Navigation menu &gt; Operations &gt; Logging**.
    
21. In the **Logs Explorer**, select **Cloud Function &gt; dialogflowFirebaseFulfillment**. You can verify all related logs here.
    

Alternatively, you can go to **Navigation menu &gt; Cloud Functions**. Click **LOGS** inside your created function to view the logs.

Click **Check my progress** to verify the objective.

Test the agent using Dialogflow simulator

**Check my progress**

## **Task 5. (Optional) Export your code**

Export your work so you can use it in the next lab. Click on the **Source** tab under Cloud Functions, scroll down, and you'll see a button to **Download zip**.

### Export your agent

Export your agent as a zip file so that you can import it later when you start the next lab. This way you can reuse the intents and entities you've configured so far.

1. Click on the **settings** gear ⚙ icon next to your agent name in the left menu.
    
2. On the settings page that opens up, go to the **Export and Import** tab.
    
3. Click on **Export as zip**. This will download your agent into a local zip file.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=VtBcIcCuarQ] 

Index.js

```javascript
// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
admin.initializeApp();
admin.firestore().settings( { timestampsInSnapshots: true });
const db = admin.firestore();
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  function reservation(agent) {
	let id = agent.parameters.reservationnumber.toString();
	let collectionRef = db.collection('reservations');
	let userDoc = collectionRef.doc(id);
	return userDoc.get()
		.then(doc => {
			if (!doc.exists) {
				agent.add('I could not find your reservation.');
			} else {
				db.collection('reservations').doc(id).update({
					newname: agent.parameters.newname
				}).catch(error => {
					console.log('Transaction failure:', error);
					return Promise.reject();
				});
				agent.add('Ok. I have updated the name on the reservation.');
			}
			return Promise.resolve();
		}).catch(() => {
			agent.add('Error reading entry from the Firestore database.');
		});
}
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('name.reservation-getname', reservation);
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
```

package.json

```json
{
  "name": "dialogflowFirebaseFulfillment",
  "description": "please like share & subscribe to quicklab",
  "version": "0.0.1",
  "private": true,
  "license": "Apache Version 2.0",
  "author": "Google Inc.",
  "engines": {
    "node": "10"
  },
  "scripts": {
    "start": "firebase serve --only functions:dialogflowFirebaseFulfillment",
    "deploy": "firebase deploy --only functions:dialogflowFirebaseFulfillment"
  },
  "dependencies": {
    "actions-on-google": "^2.2.0",
    "firebase-admin": "^5.13.1",
    "firebase-functions": "^2.0.2",
    "dialogflow": "^0.6.0",
    "dialogflow-fulfillment": "^0.5.0",
    "firebase-admin": "^5.13.1"
  }
}
```