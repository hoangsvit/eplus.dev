---
title: "Firebase Essentials: Firestore Database Write with JavaScript - gem-firebase-firestore-write-javascript"
seoTitle: "Firebase Essentials: Firestore Database Write with JavaScript"
seoDescription: "Learn to write data to a Firebase Firestore database using JavaScript in Google Cloud with this comprehensive guide"
datePublished: Mon Sep 15 2025 07:08:01 GMT+0000 (Coordinated Universal Time)
cuid: cmfks87xo000a02jrag0h8kxv
slug: firebase-essentials-firestore-database-write-with-javascript-gem-firebase-firestore-write-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757919898704/b1645cc4-3aa9-41b1-b143-990d074a9e4a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757920050026/a0f83207-3c5e-44a2-bbc9-a143ccbf982b.png
tags: firestore-database, firebase-essentials-firestore-database-write-with-javascript-gem-firebase-firestore-write-javascript, firebase-essentials-firestore-database-write-with-javascript, gem-firebase-firestore-write-javascript, firebase-essentials, firestore-database-write-with-javascript

---

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **PROJECT\_ID**. The output contains a line that declares the **PROJECT\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to YOUR_PROJECT_ID
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

Copied!

3. Click **Authorize**.
    
4. Your output should now look like this:
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-01-xxxxxxxxxxxx@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

Copied!

**Output:**

```apache
[core]
project = <project_ID>
```

**Example output:**

```apache
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Overview

This lab guides you through creating a Firebase Firestore database and writing data to it using a JavaScript application. You'll learn how to initialize Firebase, structure your data, and use the Firebase CLI for authentication. This eliminates the need for a custom service account.

## Task 1. Adding a Firebase Project to Google Cloud

Attach a new Firebase project to your Google Cloud proiect by visting the Firebase console.

1. Go to the Firebase Console.
    
    ```apache
    https://console.firebase.google.com/
    ```

    
    **Note:**  
    Navigate to the Firebase Console in your browser.
    
2. Click **Create a Firebase Project** and follow the instructions to create a new project.
    
    **Note:**  
    On the **Create a project** page, scroll down to the bottom of the screen and click **Add Firebase to Google Cloud Project**.
    
3. On the following screen, enter the Google Cloud project identifier shown below.
    
    ```apache
    qwiklabs-gcp-01-b8debb80a739
    ```

    
    **Note:**  
    This project identifier is linked to a Google Cloud project. Accept the Firebase terms and conditions to create the Firebase project.
    
4. Follow the remaining instructions to create a new Firebase project.
    
    **Note:**  
    Firebase includes options for billing and analytics. These options are not used in this lab, so accept the default options to complete the creation of the Firebase project.
    

## Task 2. Set Up Your Environment

Return to Google Cloud and use CloudShell to configure your Google Cloud project and initialize Firebase.

1. Set your project ID.
    
    ```apache
    gcloud config set project qwiklabs-gcp-01-b8debb80a739
    ```

    
    **Note:**  
    This command sets your active project.
    
2. Set your default region.
    
    ```apache
    gcloud config set run/region us-central1
    ```

    
    **Note:**  
    This command sets your active region.
    
3. Set your default zone.
    
    ```apache
    gcloud config set compute/zone us-central1-a
    ```

    
    **Note:**  
    This command sets your active zone.
    
4. Enable the necessary APIs.
    
    ```apache
    gcloud services enable compute.googleapis.com container.googleapis.com iap.googleapis.com firebase.googleapis.com firebaseextensions.googleapis.com eventarc.googleapis.com pubsub.googleapis.com storage.googleapis.com run.googleapis.com
    ```

    
    **Note:**  
    This command enables the Google APIs required for this lab.
    
5. Create a Firestore database in Native mode.
    
    ```apache
    gcloud firestore databases create --location=nam5 --database='(default)'
    ```

    
    **Note:**  
    This command provisions a Firestore database in the `nam5` (North America) multi-region. The database must exist before you can deploy or run code that interacts with it. You can choose a different region if needed.
    

## Task 3. Configure the Firebase Environment

Enable the Firebase environment to use for development.

1. Install the Firebase CLI.
    
    ```apache
    npm install -g firebase-tools
    ```

    
    **Note:**  
    This command installs the Firebase CLI globally.
    
2. Create a new directory for the project.
    
    ```apache
    mkdir firestore-app && cd firestore-app
    ```

    
    **Note:**  
    This command creates a folder for the lab content. This folder will contain the code and configurations generated during the lab.
    
3. Log in to Firebase using the CLI:
    
    ```apache
    firebase login --no-localhost
    ```

    
    **Note:**  
    This command authenticates the Firebase CLI with your Google account.
    
4. Initialize Firebase in your project directory.
    
    ```apache
    firebase init
    ```

    
    **Note:**  
    This command initializes a Firebase project in the current directory.  
    When prompted:
    
    * Select Firestore and Functions.
        
    * For Firestore, accept the default location.
        
    * For Functions, choose JavaScript and decline ESLint.
        

## Task 4. Write Data to Firestore

Now, write some data to your Firestore database using JavaScript. For convienience a Firebase Cloud Function will be used to populate the Firestore database.

1. Replace `functions/index.js` file with the following code:
    
    ```apache
    // functions/index.js
    const {initializeApp} = require("firebase-admin/app");
    const {getFirestore} = require("firebase-admin/firestore");
    
    // Import onRequest instead of onCall
    const {onRequest} = require("firebase-functions/v2/https");
    const {setGlobalOptions} = require("firebase-functions/v2");
    
    initializeApp();
    
    setGlobalOptions({ region: 'us-central1' });
    
    // Use onRequest for a standard HTTP endpoint
    exports.addMessage = onRequest(async (req, res) => {
      // Check that the request method is POST
      if (req.method !== 'POST') {
        res.status(405).send({ error: 'Method Not Allowed! Please use POST.' });
        return;
      }
    
      // Get the text from the request body directly.
      // The {"data": ...} wrapper is not needed for onRequest functions.
      const text = req.body.text;
    
      // Validate the input and send back a standard HTTP error response
      if (!text || text.length > 200) {
        res.status(400).send({
          error: 'The message text is either missing or too long (max 200 characters).',
        });
        return;
      }
    
      try {
        const writeResult = await getFirestore()
          .collection('messages')
          .add({ original: text });
    
        console.log(`Message with ID: ${writeResult.id} added.`);
    
        // Send a success response
        res.status(200).send({ message: `Message with ID: ${writeResult.id} added to Firestore.` });
      } catch (error) {
        console.error("Error writing to Firestore:", error);
        res.status(500).send({ error: 'An internal error occurred.' });
      }
    });
    ```

    
    **Note:**  
    This code defines a Firebase Function that writes a message to the `messages` collection in Firestore. It uses the Firebase Admin SDK, which leverages the Firebase CLI's authentication for simplified access.
    
2. Replace the `functions/package.json` file with the following configuration to set the correct JavaScript engine and add the required dependencies.
    
    ```apache
    {
      "name": "functions",
      "scripts": {
        "lint": "eslint .",
        "serve": "firebase emulators:start --only functions",
        "shell": "firebase functions:shell",
        "start": "npm run shell",
        "deploy": "firebase deploy --only functions",
        "logs": "firebase functions:log"
      },
      "engines": {
        "node": "22"
      },
      "main": "index.js",
      "dependencies": {
        "firebase-admin": "^11.8.0",
        "firebase-functions": "^4.6.0"
      },
      "devDependencies": {
        "@firebase/rules-unit-testing": "^2.0.2",
        "eslint": "^8.15.0",
        "eslint-config-google": "^0.14.0",
        "firebase-functions-test": "^3.0.0"
      },
      "private": true
    }
    ```

    
    **Note:**  
    Ensure the `engines/node` field is set to `v22`, the `firebase-admin` dependency is included, and `firebase-functions` is `v4.6.0` or later.
    
3. Install the dependencies.
    
    ```apache
    cd functions && npm install
    ```

    
    **Note:**  
    This command installs all the necessary packages defined in your `package.json` file.
    
4. Return to the Firebase application folder.
    
    ```apache
    cd ~/firestore-app
    ```

    
    **Note:**  
    This command returns to the parent folder, ready for deployment.
    
5. Deploy the function to Firebase.
    
    ```apache
    firebase deploy --only functions
    ```

    
    **Note:**  
    This command deploys your Firebase Function to the cloud.  
    
    If you see an error relating to **"There was an issue deploying your functions. Verify that your project has a Google App Engine instance setup at https://console.cloud.google.com/appengine and try again."** This indicates a background processes have not completed.
    
    Please wait a couple of minutes before trying the deploy command again.
    

## Task 5. Test the Function

Verify that your Firebase Cloud Function is writing data to Firestore correctly.

1. List the available Firebase Cloud Functions.
    
    ```apache
    firebase functions:list
    ```

    
    **Note:**  
    This command lists the available Firebase Functions for the active project.
    
    EXPECTED OUTPUT
    
    ```apache
    ┌────────────┬─────────┬─────────┬─────────────┬────────┬──────────┐
    │ Function   │ Version │ Trigger │ Location    │ Memory │ Runtime  │
    ├────────────┼─────────┼─────────┼─────────────┼────────┼──────────┤
    │ addMessage │ v2      │ https   │ us-central1 │ 256    │ nodejs22 │
    └────────────┴─────────┴─────────┴─────────────┴────────┴──────────┘
    ```
    
2. Get the URI for the Firebase Cloud Function.
    
    ```apache
    FUNCTION_URI=$(gcloud functions describe addMessage --region us-central1 --format=json | jq -r .serviceConfig.uri)
    ```

    
    **Note:**  
    This command retrieves the `addMessage` function object and extracts the URI.
    
3. Call the Firebase Cloud Function using `curl`.
    
    ```apache
    MESSAGE_TEXT="Hello from the CLI!"
    curl -X POST "$FUNCTION_URI" -H "Content-Type: application/json" -d '{"text":"'"$MESSAGE_TEXT"'"}'
    ```

    
    **Note:**  
    This command invokes the `addMessage` function with the provided data. The function name is case-sensitive.
    
    ```apache
    {"message":"Message with ID: 9GMxSOZp0yynY0I57Dav added to Firestore."}
    ```
    
4. Check the Firestore console to confirm the data has been written.
    
    ```apache
    Open the Firebase console for your project. Navigate to Firestore Database, and you should see a new document in the 'messages' collection.
    ```
    
    **Note:**  
    Verify that the data has been written to Firestore.

---

## Solution of Lab

%[https://youtu.be/Rofk-Uhs_As]