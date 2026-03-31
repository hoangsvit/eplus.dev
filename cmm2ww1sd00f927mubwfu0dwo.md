---
title: "Firebase Essentials: Firestore Database Write with JavaScript - gem-firebase-firestore-write-javascript"
seoTitle: "Firebase Essentials: Firestore Database Write with JavaScrip"
seoDescription: "Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud "
datePublished: 2026-02-26T03:36:36.883Z
cuid: cmm2ww1sd00f927mubwfu0dwo
slug: firebase-essentials-firestore-database-write-with-java-script-gem-firebase-firestore-write-javascript
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/4c893e02-2169-4d51-9cb4-9b852ba45527.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/6f03f377-26d6-42af-b4f6-fb28ed8d51e9.png
tags: firestore-database, firebase-essentials-firestore-database-write-with-javascript-gem-firebase-firestore-write-javascript, firebase-essentials-firestore-database-write-with-javascript, gem-firebase-firestore-write-javascript, firebase-essentials

---

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1.  Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="center")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **PROJECT\_ID**. The output contains a line that declares the **PROJECT\_ID** for this session:

```plaintext
Your Cloud Platform project in this session is set to YOUR_PROJECT_ID
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2.  (Optional) You can list the active account name with this command:
    

```plaintext
gcloud auth list
```

Copied!

3.  Click **Authorize**.
    
4.  Your output should now look like this:
    

**Output:**

```plaintext
ACTIVE: *
ACCOUNT: student-01-xxxxxxxxxxxx@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5.  (Optional) You can list the project ID with this command:
    

```plaintext
gcloud config list project
```

Copied!

**Output:**

```plaintext
[core]
project = <project_ID>
```

**Example output:**

```plaintext
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Overview**

This lab guides you through creating a Firebase Firestore database and writing data to it using a JavaScript application. You'll learn how to initialize Firebase, structure your data, and use the Firebase CLI for authentication. This eliminates the need for a custom service account.

## **Task 1. Adding a Firebase Project to Google Cloud**

Attach a new Firebase project to your Google Cloud proiect by visting the Firebase console.

1.  Go to the Firebase Console.
    
    ```plaintext
    https://console.firebase.google.com/
    ```
    
    Copied!
    
    **Note:**  
    Navigate to the Firebase Console in your browser.
    
2.  Click **Create a Firebase Project** and follow the instructions to create a new project.
    
    **Note:**  
    On the **Create a project** page, scroll down to the bottom of the screen and click **Add Firebase to Google Cloud Project**.
    
3.  On the following screen, enter the Google Cloud project identifier shown below.
    
    ```plaintext
    qwiklabs-gcp-01-d7976e499e7a
    ```
    
    Copied!
    
    **Note:**  
    This project identifier is linked to a Google Cloud project. Accept the Firebase terms and conditions to create the Firebase project.
    
4.  Follow the remaining instructions to create a new Firebase project.
    
    **Note:**  
    Firebase includes options for billing and analytics. These options are not used in this lab, so accept the default options to complete the creation of the Firebase project.
    

## **Task 2. Set Up Your Environment**

Return to Google Cloud and use CloudShell to configure your Google Cloud project and initialize Firebase.

1.  Set your project ID.
    
    ```plaintext
    gcloud config set project qwiklabs-gcp-01-d7976e499e7a
    ```
    
    Copied!
    
    **Note:**  
    This command sets your active project.
    
2.  Set your default region.
    
    ```plaintext
    gcloud config set run/region us-east1
    ```
    
    Copied!
    
    **Note:**  
    This command sets your active region.
    
3.  Set your default zone.
    
    ```plaintext
    gcloud config set compute/zone us-east1-c
    ```
    
    Copied!
    
    **Note:**  
    This command sets your active zone.
    
4.  Enable the necessary APIs.
    
    ```plaintext
    gcloud services enable compute.googleapis.com container.googleapis.com iap.googleapis.com firebase.googleapis.com firebaseextensions.googleapis.com eventarc.googleapis.com pubsub.googleapis.com storage.googleapis.com run.googleapis.com
    ```
    
    Copied!
    
    **Note:**  
    This command enables the Google APIs required for this lab.
    
5.  Create a Firestore database in Native mode.
    
    ```plaintext
    gcloud firestore databases create --location=nam5 --database='(default)'
    ```
    
    Copied!
    
    **Note:**  
    This command provisions a Firestore database in the `nam5` (North America) multi-region. The database must exist before you can deploy or run code that interacts with it. You can choose a different region if needed.
    

## **Task 3. Configure the Firebase Environment**

Enable the Firebase environment to use for development.

1.  Install the Firebase CLI.
    
    ```plaintext
    npm install -g firebase-tools
    ```
    
    Copied!
    
    **Note:**  
    This command installs the Firebase CLI globally.
    
2.  Create a new directory for the project.
    
    ```plaintext
    mkdir firestore-app && cd firestore-app
    ```
    
    Copied!
    
    **Note:**  
    This command creates a folder for the lab content. This folder will contain the code and configurations generated during the lab.
    
3.  Log in to Firebase using the CLI:
    
    ```plaintext
    firebase login --no-localhost
    ```
    
    Copied!
    
    **Note:**  
    This command authenticates the Firebase CLI with your Google account.
    
4.  Initialize Firebase in your project directory.
    
    ```plaintext
    firebase init
    ```
    
    Copied!
    
    **Note:**  
    This command initializes a Firebase project in the current directory.  
    When prompted:
    
    *   Select Firestore and Functions.
        
    *   For Firestore, accept the default location.
        
    *   For Functions, choose JavaScript and decline ESLint.
        

## **Task 4. Write Data to Firestore**

Now, write some data to your Firestore database using JavaScript. For convienience a Firebase Cloud Function will be used to populate the Firestore database.

1.  Replace `functions/index.js` file with the following code:
    
    ```plaintext
    // functions/index.js
    const {initializeApp} = require("firebase-admin/app");
    const {getFirestore} = require("firebase-admin/firestore");
    
    // Import onRequest instead of onCall
    const {onRequest} = require("firebase-functions/v2/https");
    const {setGlobalOptions} = require("firebase-functions/v2");
    
    initializeApp();
    
    setGlobalOptions({ region: 'us-east1' });
    
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
    
    Copied!
    
    **Note:**  
    This code defines a Firebase Function that writes a message to the `messages` collection in Firestore. It uses the Firebase Admin SDK, which leverages the Firebase CLI's authentication for simplified access.
    
2.  Replace the `functions/package.json` file with the following configuration to set the correct JavaScript engine and add the required dependencies.
    
    ```plaintext
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
    
    Copied!
    
    **Note:**  
    Ensure the `engines/node` field is set to `v22`, the `firebase-admin` dependency is included, and `firebase-functions` is `v4.6.0` or later.
    
3.  Install the dependencies.
    
    ```plaintext
    cd functions && npm install
    ```
    
    Copied!
    
    **Note:**  
    This command installs all the necessary packages defined in your `package.json` file.
    
4.  Return to the Firebase application folder.
    
    ```plaintext
    cd ~/firestore-app
    ```
    
    Copied!
    
    **Note:**  
    This command returns to the parent folder, ready for deployment.
    
5.  Deploy the function to Firebase.
    
    ```plaintext
    firebase deploy --only functions
    ```
    
    Copied!
    
    **Note:**  
    This command deploys your Firebase Function to the cloud.
    
    If you see an error relating to **"There was an issue deploying your functions. Verify that your project has a Google App Engine instance setup at** [**https://console.cloud.google.com/appengine**](https://console.cloud.google.com/appengine) **and try again."** This indicates a background processes have not completed.
    
    Please wait a couple of minutes before trying the deploy command again.
    

## **Task 5. Test the Function**

Verify that your Firebase Cloud Function is writing data to Firestore correctly.

1.  List the available Firebase Cloud Functions.
    
    ```plaintext
    firebase functions:list
    ```
    
    Copied!
    
    **Note:**  
    This command lists the available Firebase Functions for the active project.
    
    EXPECTED OUTPUT
    
    ```plaintext
    ┌────────────┬─────────┬─────────┬─────────────┬────────┬──────────┐
    │ Function   │ Version │ Trigger │ Location    │ Memory │ Runtime  │
    ├────────────┼─────────┼─────────┼─────────────┼────────┼──────────┤
    │ addMessage │ v2      │ https   │ us-east1 │ 256    │ nodejs22 │
    └────────────┴─────────┴─────────┴─────────────┴────────┴──────────┘
    ```
    
2.  Get the URI for the Firebase Cloud Function.
    
    ```plaintext
    FUNCTION_URI=$(gcloud functions describe addMessage --region us-east1 --format=json | jq -r .serviceConfig.uri)
    ```
    
    Copied!
    
    **Note:**  
    This command retrieves the `addMessage` function object and extracts the URI.
    
3.  Call the Firebase Cloud Function using `curl`.
    
    ```plaintext
    MESSAGE_TEXT="Hello from the CLI!"
    curl -X POST "$FUNCTION_URI" -H "Content-Type: application/json" -d '{"text":"'"$MESSAGE_TEXT"'"}'
    ```
    
    Copied!
    
    **Note:**  
    This command invokes the `addMessage` function with the provided data. The function name is case-sensitive.
    
    ```plaintext
    {"message":"Message with ID: 9GMxSOZp0yynY0I57Dav added to Firestore."}
    ```
    
4.  Check the Firestore console to confirm the data has been written.
    
    ```plaintext
    Open the Firebase console for your project. Navigate to Firestore Database, and you should see a new document in the 'messages' collection.
    ```
    
    **Note:**  
    Verify that the data has been written to Firestore.
    

* * *

## Solution of Lab

<iframe type="youtube" src="https://www.youtube.com/watch?v=ALyK7T5Ft6M" data-node-type="hn-embed"></iframe><div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">No need to do anything, please wait about 5 minutes, and the lab will do it automatically.</div>
</div>

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/e893abe5-1ae5-4767-9525-fd1868d06796.png align="center")