---
title: "Building and Debugging Cloud Functions for Node.js - GSP880"
seoTitle: "Building and Debugging Cloud Functions for Node.js - GSP880"
seoDescription: "Learn to build, test, and debug Node.js Cloud Functions locally using Visual Studio Code, then deploy them to Google Cloud Platform"
datePublished: Sat Aug 16 2025 05:39:04 GMT+0000 (Coordinated Universal Time)
cuid: cmedtu9yi000202l11rhyah6d
slug: building-and-debugging-cloud-functions-for-nodejs-gsp880
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755322669754/225132a2-5946-419b-b9dc-e3b9f53fe272.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755322723216/1dbc50da-1257-4e03-99e8-c8d3a0f69057.png
tags: nodejs, building-and-debugging-cloud-functions-for-nodejs-gsp880, building-and-debugging-cloud-functions-for-nodejs, gsp880, debugging-cloud-functions, building-and-debugging-cloud-functions

---

## Overview

[Google Cloud Functions](https://cloud.google.com/functions) is an event-driven serverless compute platform. Cloud Functions allows you to write your code without worrying about provisioning resources or scaling to handle changing requirements.

Cloud Functions written in Javascript execute in a Node.js environment on Google Cloud Platform. You can run your Cloud Function in any standard Node.js runtime to enable portability and local testing.

In this lab, you will create a Cloud Function for Node.js that reports whether a specified temperature is acceptable or too hot. You will create, test, and debug your Cloud Function using Visual Studio Code on your local machine. Lastly, you'll deploy your function to Google Cloud Platform.

### What you'll learn

* Functions Framework for Node.js.
    
* Create and test a HTTP Cloud Function locally.
    
* Debug a HTTP Function from your local machine.
    
* Deploy a HTTP Function from your local machine.
    

### **Prerequisites**

* [Cloud SDK](https://cloud.google.com/sdk/docs/quickstart)
    
* [Visual Studio Code](https://code.visualstudio.com/)
    
* Node.js 8.6.0 or higher (to install Node.js, [use nvm](https://github.com/nvm-sh/nvm#installation-and-update), to check your version, run node --version)
    
* Completion of the [My First Function: Node.js guide](https://cloud.google.com/functions/docs/first-nodejs)
    

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Visual Studio Code

The lab environment has provisioned an instance of Visual Studio Code for you. You can use this rather than installing and using a local version. This instance can be run completely in your browser, and has the required Cloud SDKs and Node packages installed.

**Copy the URL listed under** `Visual Studio IDE` from **Lab Details panel and open in a new tab or browser window.**

Within Visual Studio Code, you should check to be sure that you are logged into Google Cloud with the correct credentials.

Open up a terminal session use this command:

```apache
gcloud auth list
```

You should see an output like this:

```apache
                  Credentialed Accounts
ACTIVE  ACCOUNT
        708175952215-compute@developer.gserviceaccount.com
*       student-02-38b433f92344@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

If the account listed and selected with the asterisk is not the student account listed in your **Lab Details** panel, you will need to login to Google Cloud.

To login, type the command:

```apache
gcloud auth login
```

If prompted, Do you want to continue (Y/n)?. Enter **Y**.

You will be presented with a URL to login (it may open in your browser automatically) with Google Credentials. Be sure to use the credentials specified in the **Lab Details** panel instead of your own. This will ensure that you are not charged to run the code in this lab.

If presented with a question to enable Google Cloud SDK to access your account, click **Allow**.

![Enable access for the SDK](https://cdn.qwiklabs.com/SCRRs3N%2FD%2Fn7phBrC%2FzdifjK5BCzwDPpECfhBwx7%2F9k%3D align="left")

Finally, you will be presented with a verification code. Copy the code and enter it in the terminal where you were prompted from the login command.

![Verification code sample to be copied to terminal](https://cdn.qwiklabs.com/UaQzBMoWubNaszXP9zSS1NzFNWJDgr8LYbDEtFLs0BE%3D align="left")

You should now be logged in with the correct credentials for the lab. Verify using the **auth list** command:

```apache
gcloud auth list
```

## Task 1. Install the Functions Framework for Node.js

The [Functions Framework for Node.js](https://github.com/GoogleCloudPlatform/functions-framework-nodejs) is an open source FaaS (Function as a Service) framework for writing portable Node.js functions that is brought to you by the Google Cloud Functions team.

The Functions Framework lets you write lightweight functions that run in many different environments, including:

* Google Cloud Functions
    
* Your local development machine
    
* Cloud Run and Cloud Run on GKE
    
* Knative-based environments
    

1. Create a app folder.
    
    ```apache
    mkdir ff-app && cd $_
    ```
    
2. Create a new node.js app.
    
    ```apache
    npm init --y
    ```
    
    **Note:**  
    While accepting defaults, make sure to use `index.js` as the entry point for your app.
    
3. Now install the Functions Framework for Node.js.
    
    ```apache
    npm install @google-cloud/functions-framework
    ```
    
4. Click **Explorer** in left pane and click **Open folder**. Select the `/home/ide-dev/ff-app` path and then click **OK**. Open your `package.json` in explorer window. Verify that you see the functions framework listed as a dependency as shown in the example below. (The version shown below may vary. This is ok.)
    
    ```json
    "dependencies": {
       "@google-cloud/functions-framework": "^3.1.2"
     }
    ```
    

The Functions Framework has now been successfully installed. You are now ready to create your Cloud Function.

Click **Check my progress** to verify the objective.

Install the Functions for Node.js

## Task 2. Create and test a HTTP Cloud Function locally

**Create a local Cloud Function**

In this section, you will create and test a HTTP Function that responds to HTTP requests.

1. Create a new file called `index.js` in the same directory as your package.json file.
    
2. Add the following:
    
    ```apache
    exports.validateTemperature = async (req, res) => {
     try {
       if (req.body.temp < 100) {
         res.status(200).send("Temperature OK \n");
       } else {
         res.status(200).send("Too hot \n");
       }
     } catch (error) {
       //return an error
       console.log("got error: ", error);
       res.status(500).send(error);
     }
    };
    ```
    

You are now ready to test the function.

**Test function in Visual Studio Code**

From this point on, this lab uses the [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) within VS Code.

1. In Visual Studio Code, open a terminal window.
    
    Run the following command:
    
    ```apache
    npx @google-cloud/functions-framework --target=validateTemperature
    ```
    
    This command starts a local server that is ready to call the `validateTemperature` function when the server receives an HTTP request.
    
    You should see the following output in your terminal window:
    
    ```apache
    Serving function...
    Function: validateTemperature
    URL: http://localhost:8080/
    ```
    
2. Create a second terminal window within VS Code by clicking the `New Terminal` plus icon in the Terminal window pane. You will switch between these two terminal windows: the first for serving the function and the second for calling the function using curl.
    
    ![Open second terminal window](https://cdn.qwiklabs.com/kH%2B5ltc6sMoL3LZnpZuXyIZHdVnlmygxnBo2xzjiTdA%3D align="left")
    
    You can switch between terminal windows by using the drop down. If a terminal window is currently serving a function, the drop down list refers to it as `node`. Otherwise it is referred to `zsh` (or the shell you are using).
    
3. In the second terminal window, run the following command to send a temperature payload of 50 to the local server serving the `validateTemperature` function.
    
    ```apache
    curl -X POST http://localhost:8080 -H "Content-Type:application/json"  -d '{"temp":"50"}'
    ```
    
    You should receive the following response from the cloud function:
    
    ```apache
    Temperature OK
    ```
    
4. In the second terminal window, test the function again by sending a "too high" temperature payload as shown below:
    
    ```apache
    curl -X POST http://localhost:8080 -H "Content-Type:application/json"  -d '{"temp":"120"}'
    ```
    
    You should receive the following response from the cloud function:
    
    ```apache
    Too hot
    ```
    
5. Lastly, test the function by calling it with a missing payload.
    
    ```apache
    curl -X POST http://localhost:8080
    ```
    
    You should receive the following response from the cloud function:
    
    ```apache
    Too hot
    ```
    
    Ideally, the function should not return "too hot" if no temperature is provided. You have discovered a bug in the code.
    
6. Make sure to stop your function from running by pressing `Ctrl + C` in the first terminal window serving your function.
    

Click **Check my progress** to verify the objective.

Create a HTTP Cloud function

## Task 3. Debug a HTTP Function from your local machine

1. Now we'll start node with the inspect flag to enable debugging using the following command:
    
    ```apache
    npx --node-options=--inspect @google-cloud/functions-framework --target=validateTemperature
    ```
    
    where the `--inspect` flag tells Node.js to listen for a debugging client. For more info, please see the [Node documentation on debugging](https://nodejs.org/en/docs/guides/debugging-getting-started/).
    
2. You'll now need to attach the debugger to the running node process. Open the Command Palette in Visual Studio Code. If you're on a Mac, use `Cmd + Shift + P`. If you're on Windows, use `Ctrl + Shift + P.`
    
    Type `Debug: Attach to Node Process` in the Command Palette and pick the top item in the list.
    
    ![Attach to the debugger process](https://cdn.qwiklabs.com/DNFqweFklAMUGdhsmGnxDBc3aeYhL%2BZgSWULhP%2B%2Fy1I%3D align="left")
    
3. You will be prompted to select a process to attach to. Select the first node process (it will match the npx command you used to start the process).
    
    ![Select the node.js process used to start node](https://cdn.qwiklabs.com/wOZwKKU3pXcFcC5tMjLUm2SMDE1NQsG9JZDM58mmsQw%3D align="left")
    
    This time you should see an orange status bar in VS Code indicating that the debugger is attached.
    
4. Set a breakpoint at line 3 by clicking inside the margin to the left of the line number.
    
    ![Setting breakpoint in code](https://cdn.qwiklabs.com/muxkYq16JLae%2FixmysYJahtaU%2FLgvd%2Fraa6xph3PjuE%3D align="left")
    
    The breakpoint icon should illuminate bright red, indicating this line of code is accessible by the debugger.
    
    ![Active breakpoint example](https://cdn.qwiklabs.com/O%2B3X3wzDuVGr7nepe5og%2FLpTE0TxApo36PxZwIfRam4%3D align="left")
    
5. In the second terminal window, hit the breakpoint by running the following curl command.
    
    ```apache
    curl -X POST http://localhost:8080
    ```
    
    You will see a yellow highlight appear over line 3. This highlight indicates that this line is the current statement being evaluated by the debugger.
    
    ![Highlighted code where debugger has paused](https://cdn.qwiklabs.com/fpTBy5SJLAk%2FrLMci2YMBsrFia%2BU02DKxI9wbmKzlHA%3D align="left")
    
6. Mouse-over the temp variable to verify that its contents are `undefined`, since the request did not provide a temperature payload.
    
    ![Hover over variable for value](https://cdn.qwiklabs.com/O8M%2FbUgP6sNYBSEOqwS53Vm0gdaHTwUqmwD12%2FIblE0%3D align="left")
    
7. Click the step-over icon in status bar to execute the next statement.
    
    You will see the current statement jump to the else portion of the if statement.
    
    ![Stepping over the next statement](https://cdn.qwiklabs.com/i%2BE63sNlyfp9VNueOsSOyu84K4BK2a%2FyinqlOXRNumk%3D align="left")
    
    For this demo, you can assume that the specification requires all requests to send a temperature reading. In the unlikely event a temperature reading is not provided, the function should throw an exception.
    
8. Click the Disconnect button to disconnect the debugger.
    
    ![Disconnect button to disconnect debugger.](https://cdn.qwiklabs.com/PPN%2BvSst9BQg%2B4JQX%2FWxISiYWWQRr9MDRz6FcOzr1ZA%3D align="left")
    
9. In your first terminal window, stop serving your function from running by pressing **Ctrl + C**.
    
10. Update your function to add an if statement to throw an exception if temperature is undefined as shown below:
    
    ```apache
    exports.validateTemperature = async (req, res) => {
    
     try {
    
       // add this if statement below line #2
       if (!req.body.temp) {
         throw "Temperature is undefined \n";
       }
    
     ...
    ```
    
11. In your first terminal window, start running your cloud function again by running the following command **without the --inspect flag** to avoid attaching the debugger.
    
    ```apache
    npx @google-cloud/functions-framework --target=validateTemperature
    ```
    
12. Verify that an exception is thrown by running the following command in your second terminal window:
    
    ```apache
    curl -X POST http://localhost:8080
    ```
    
    You should see the following output returned from your request:
    
    ```apache
    Temperature is undefined
    ```
    
    In your first terminal window, you'll also see the error logged by your function.
    
    ```apache
    Serving function...
    Function: validateTemperature
    URL: http://localhost:8080/
    got error:  Temperature is undefined
    ```
    
13. You can now stop running your function by pressing **CTRL + C** in your first terminal window.
    

Click **Check my progress** to verify the objective.

Debug HTTP function

## Task 4. Deploy a HTTP Function from your local machine to Google Cloud

Now that you've created, tested, and debugged a Cloud Function on your local machine, you are ready to deploy it to Google Cloud.

1. Set the project configuration
    
    ```apache
    gcloud config set project qwiklabs-gcp-00-236844af4ebd
    ```
    
2. In any terminal window, run the following command:
    
    ```apache
    gcloud functions deploy validateTemperature \
      --trigger-http \
      --runtime nodejs20 \
      --gen2 \
      --allow-unauthenticated \
      --region us-east1 \
      --service-account developer-sa@qwiklabs-gcp-00-236844af4ebd.iam.gserviceaccount.com
    ```
    
    where the parameters are explained as follows:
    
    * `deploy validateTemperature` - the gcloud subcommand for deploying a Cloud Function with the name `validateTemperature` with an entry point named `validateTemperature`
        
    * `--trigger-http` - the triggering event type
        
    * `--gen2` - the second generation runtime for this function
        
    * `--runtime nodejs20` - the targeted runtime for this function
        
    * `--allow-unauthenticated` - allows public access to call the function
        
    * `--region` - the region where the function will be deployed
        
    
    You may be prompted to enable the Cloud Functions APIs. Type `y` to enable the APIs.
    
    ```apache
    API [cloudfunctions.googleapis.com] not enabled on project 
    [1057316433766]. Would you like to enable and retry (this will take a 
    few minutes)? (y/N)? y
    ```
    
    Once deployment is completed, you will see the following in the output:
    
    ```apache
    Deploying function (may take a while - up to 2 minutes)...done. 
    availableMemoryMb: 256
    buildId: <your-build-id>
    entryPoint: validateTemperature
    httpsTrigger:
      url: https://<your-region-and-project>.cloudfunctions.net/validateTemperature
    ...
    ```
    
3. Note the value of the **httpsTrigger**. In your terminal window, use curl to call this public endpoint, replacing `<your-region-and-project>` with the appropriate value.
    
    ```apache
    curl -X POST https://us-east1-qwiklabs-gcp-00-236844af4ebd.cloudfunctions.net/validateTemperature -H "Content-Type:application/json"  -d '{"temp":"50"}'
    ```
    
    and confirm that your cloud function has been deployed successfully by verifying the appropriate response.
    
    ```apache
    Temperature OK
    ```
    

Click **Check my progress** to verify the objective.

Deploy the HTTP function

---

## Solution of Lab

%[https://youtu.be/r1wFefY6erA] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Building%20and%20Debugging%20Cloud%20Functions%20for%20Node.js/quicklabgsp880.sh
source quicklabgsp880.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755323065787/966a9d2c-83a8-48b5-951e-8bfd4c0c59dc.png align="center")