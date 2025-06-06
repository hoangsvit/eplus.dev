---
title: "APIs Explorer: App Engine - GSP422"
seoTitle: "APIs Explorer: App Engine - GSP422"
seoDescription: "App Engine lets you deploy applications on a fully managed platform. You can scale your applications seamlessly without having to worry about managing the u"
datePublished: Fri Dec 06 2024 03:12:54 GMT+0000 (Coordinated Universal Time)
cuid: cm4c67s6a000309mnefofa4h9
slug: apis-explorer-app-engine-gsp422
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733454724885/bc809692-2304-480a-ac8e-16e26a7a395d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1733454744521/c120c106-9a8d-4488-b676-d66c74f66e90.png
tags: apis-explorer-app-engine-gsp422, gsp422

---

## **Overview**

Google APIs Explorer is a tool that lets you try out various Google APIs interactively. With the APIs Explorer, you can:

* Browse quickly through available APIs and versions.
    
* See methods available for each API and what parameters they support along with inline documentation.
    
* Execute requests for any method and see responses in real-time.
    
* Make authenticated and authorized API calls.
    
* Search across all services, methods, and your recent requests to quickly find what you are looking for.
    

[App Engine](https://cloud.google.com/appengine/) lets you deploy applications on a fully managed platform. You can scale your applications seamlessly without having to worry about managing the underlying infrastructure. With zero server management and zero configuration deployments, developers can focus only on building great applications without the management overhead.

In this lab you will deploy a simple hello world application to App Engine and make updates to its configuration using the App Engine Admin API through the APIs Explorer tool.

### Objectives

In this lab, you will:

* Build an App Engine application with the APIs Explorer tool.
    
* Deploy an App Engine instance from the hello world sample code.
    
* Configure App Engine firewall rules with the APIs Explorer tool.
    
* Make changes to your code base and create a new version of your application with the APIs Explorer tool.
    

### Prerequisites

This is a **fundamental level** lab. You should be familiar with the basic functioning and architecture of APIs. Experience with Google Cloud Shell and command-line interface tools is recommended.

Familiarity with the APIs Explorer tool is also recommended. At a minimum, take the following labs before attempting this one:

* [Introduction to APIs in Google](https://google.qwiklabs.com/catalog_lab/1342)
    
* [APIs Explorer: Qwik Start](https://google.qwiklabs.com/catalog_lab/1241)
    

If you are unfamiliar with App Engine, the [App Engine: Qwik Start - Python](https://google.qwiklabs.com/catalog_lab/698) lab has valuable information that will orient you with the content of this lab. Once you're ready, scroll down and follow the steps below to set up your lab environment.

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab Details** panel with the following:
    
    * The **Open Google Cloud console** button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the **Sign in** page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-04-9c5aec95b0bf@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    ECKWOsOBIOm0
    ```
    
    You can also find the **Password** in the **Lab Details** panel.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To view a menu with a list of Google Cloud products and services, click the **Navigation menu** at the top-left.

![Navigation menu icon](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-6b12ef6737a1`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-6b12ef6737a1
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

3. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-9c5aec95b0bf@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

4. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-04-6b12ef6737a1
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Build an App Engine application with apps.create**

You will now build an App Engine application with one of the methods found in the APIs Explorer.

1. To access the App Engine APIs Explorer tool, open up the **Navigation menu ()** and select **APIs & Services** &gt; **Library**.
    
2. In the search bar, enter in **App Engine** and select the **App Engine Admin API** from the results list. Make sure that API is enabled, if not click **Enable**.
    
3. Now that you have verified the API's enablement, open the [Method: apps.create reference](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps/create). This will take you to the apps **create** method.
    
4. Under **Try this method** in the right panel, click in the **Request body** field and add:
    

* The **ID** property. Set it's value to your Project ID.
    
* The **locationId** property. Set its value to `us-central`. This required field tells Google Cloud where your App Engine resources will live.
    

5. Make sure that there are no trailing spaces in any of the fields. Also, that **Google OAuth 2.0** and **API key** checkboxes are selected under **Credentials** section.
    

![The Credentials section with both checkboxes checked.](https://cdn.qwiklabs.com/EFpEix1b8t2ZmZ35kihEUaA8mAoUsQT9Hh8t%2F8MCaiM%3D align="left")

**Note:** To view **Credentials FAQs**, click on question mark icon next to **Credentials** title.

6. Click the **EXECUTE** button.
    
7. Select the student account you started the lab with.
    
8. On the next screen, click **Allow** to give APIs Explorer access.
    

Your response should resemble the following:

```json
{
  "name": "apps/qwiklabs-gcp-da84962e277c92a7/operations/193f576c-8791-4638-920e-b1ccb6305ae1",
  "metadata": {
    "@type": "type.googleapis.com/google.appengine.v1.OperationMetadataV1",
    "method": "google.appengine.v1.Applications.CreateApplication",
    "insertTime": "2019-10-16T12:37:36.743Z",
    "user": "gcpstaging92860_student@qwiklabs.net",
    "target": "apps/qwiklabs-gcp-da84962e277c92a7"
  }
}
```

You have successfully built an App Engine application for a Google Cloud project.

## **Task 2. Get application information with apps.get**

Next you'll retrieve some information on your App Engine application to ensure that it has been properly created.

1. From the left **All APIs & Reference** section navigate to **REST API** &gt; **v1** &gt; **apps** &gt; **get**. Or you can use [this direct link](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps/get) to `apps.get` method.
    
2. For the **appsId** field, enter your `<PROJECT_ID>` found in the Connection Details section of the lab.
    
3. Make sure that **Google OAuth 2.0** and **API key** checkboxes are selected under **Credentials** section.
    

![The Credentials section](https://cdn.qwiklabs.com/EFpEix1b8t2ZmZ35kihEUaA8mAoUsQT9Hh8t%2F8MCaiM%3D align="left")

4. Click the **EXECUTE** button. You may need to select the student account and click **Allow** again.
    

Your response should resemble the following:

```json
{
  "name": "apps/qwiklabs-gcp-da84962e277c92a7",
  "id": "qwiklabs-gcp-da84962e277c92a7",
  "authDomain": "gmail.com",
  "locationId": "us-central",
  "codeBucket": "staging.qwiklabs-gcp-da84962e277c92a7.appspot.com",
  "servingStatus": "SERVING",
  "defaultHostname": "qwiklabs-gcp-da84962e277c92a7.appspot.com",
  "defaultBucket": "qwiklabs-gcp-da84962e277c92a7.appspot.com",
  "gcrDomain": "us.gcr.io",
  "featureSettings": {
    "splitHealthChecks": true,
    "useContainerOptimizedOs": true
  }
}
```

This method works as a sanity check and offers you useful information about your App Engine application, such as its default hostname, location, and serving status.

## **Task 3. Download the starter code**

Before you *deploy* an App Engine application, you will need to download some starter code so you have something to work with.

1. Return to the Cloud Console and in Cloud Shell run the following command to clone a repository that contains the codebase for a simple hello world application:
    

```apache
git clone https://github.com/GoogleCloudPlatform/python-docs-samples
```

2. Now change your current working directory:
    

```apache
cd ~/python-docs-samples/appengine/standard_python3/hello_world
```

The `hello_world` folder contains a simple Python application that uses the [Flask](http://flask.pocoo.org/) web framework. This Python app responds to a request with an HTTP header and the message "Hello World!"

## **Task 4. Deploy your App Engine application**

1. For this step, remain in your Cloud Shell session. Run the following command to set your Project ID as an environment variable, replacing `[YOUR_PROJECT_ID]` with your Project ID:
    

```apache
export PROJECT_ID=[YOUR_PROJECT_ID]
```

2. Now run the following gcloud command to deploy your hello world application:
    

```apache
gcloud app deploy app.yaml --project $PROJECT_ID
```

3. When prompted with the following, enter in **Y**:
    

```apache
Do you want to continue (Y/n)?
```

The deployment will take a couple minutes to complete. Once it has finished, you should receive a similar output:

```apache
File upload done.
Updating service [default]...done.
Setting traffic split for service [default]...done.
Deployed service [default] to [https://qwiklabs-gcp-b5d5fa242d334941.appspot.com]
```

4. **Copy** the deployed service link that resembles `https://qwiklabs-gcp-b5d5fa242d334941.appspot.com` and paste it in a new tab. This will open the hello world application. Your page should resemble the following:
    

![A web page displaying the text 'Hello World!'](https://cdn.qwiklabs.com/GxnTJGjHQvlWoJLNIWGq%2BFIpMJ5r7xK4I5QDi%2F7M6cQ%3D align="left")

Now that your application is deployed, you will make some changes to your App Engine configuration with the APIs Explorer.

**Keep the *Hello World!* page open**.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully deployed an app engine application, you will see an assessment score.

Deploy an app engine application

Check my progress

## **Task 5. Configure ingress firewall rules with apps.firewall.ingressRules**

You will now create, list, and delete firewall rules that prescribe access to your hello world application.

### Create an ingress firewall rule

1. From the APIs & Reference section navigate to **REST API** &gt; **v1** &gt; **apps.firewall.ingressRules** &gt; **create** . Or, you can use [this direct link](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.firewall.ingressRules/create) to `apps.firewall.ingressRules.create` method.
    
2. For the **appsId** field, enter your Project ID.
    
3. Now click on the **Request body** and add:
    

* The **sourceRange** property. Set it's value to `*`.
    
* The **action** property. Set its value to **DENY**.
    
* The **priority** property and set its value to **1**.
    

Your method should resemble the following:

![The method displayed in the Request body field](https://cdn.qwiklabs.com/Jl110m59AOoKI2N9B0c8LwGoqXTi2ncEksF27BXvwM0%3D align="left")

4. Verify that your fields have no trailing spaces. Also, that **Google OAuth 2.0** and **API key** checkboxes are selected under **Credentials** section.
    

![The Credentials section](https://cdn.qwiklabs.com/EFpEix1b8t2ZmZ35kihEUaA8mAoUsQT9Hh8t%2F8MCaiM%3D align="left")

5. Click the **EXECUTE** button. Your response should resemble the following:
    

```javascript
{
  "priority": 1,
  "action": "DENY",
  "sourceRange": "*"
}
```

This firewall rule rejects all requests to your hello world application.

6. To see it in action, **Refresh** your hello world page in your browser. You should now see that access is now forbidden:
    
7. Return to the APIs Explorer page for the next step.
    

### List ingress firewall rules

1. From the left **All APIs & Reference** section navigate to **REST API** &gt; **v1** &gt; **apps.firewall.ingressRules** &gt; **list** Or you can use [this direct link](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.firewall.ingressRules/list) to `apps.firewall.ingressRules.list` method.
    
2. For the **appsId** field, enter your Project ID.
    

![The highlighted project ID in the appsId text field](https://cdn.qwiklabs.com/jM2%2Bzc%2FMigYhVlQMflTRZ%2F9mXqVrdmvuJv5xVu5PbzE%3D align="left")

3. Verify that the appsId field has no trailing spaces. Also, that **Google OAuth 2.0** and **API key** checkboxes are selected under **Credentials** section.
    

![The Credentials section](https://cdn.qwiklabs.com/EFpEix1b8t2ZmZ35kihEUaA8mAoUsQT9Hh8t%2F8MCaiM%3D align="left")

4. Click the **EXECUTE** button.
    

Your response should resemble the following:

```javascript
{
  "ingressRules": [
    {
      "priority": 1,
      "action": "DENY",
      "sourceRange": "*"
    },
    {
      "priority": 2147483647,
      "action": "ALLOW",
      "sourceRange": "*",
      "description": "The default action."
    }
  ]
}
```

You now see the two firewall rules: one that allows traffic and another that denies traffic to your application. Note the *priority* values for each ingress rule — these act as firewall rule IDs as well.

### Delete an ingress firewall rule

1. From the left **All APIs & Reference** section navigate to **REST API** &gt; **v1** &gt; **apps.firewall.ingressRules** &gt; **delete** Or you can use [this direct link](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.firewall.ingressRules/delete) to `apps.firewall.ingressRules.delete` method.
    
2. For the **appsId** field, enter your Project ID. For the **ingressRulesId** field, enter **1**. Your method should resemble the following:
    

![The method displayed in the Request parameters section](https://cdn.qwiklabs.com/j%2BgpiMpy9w9o1hH6HmSlWPtfNkpMakXcmlxxCoFrU%2F0%3D align="left")

3. Verify that your fields have no trailing spaces. Also, that **Google OAuth 2.0** and **API key** checkboxes are selected under **Credentials** section.
    

![The Credentials section](https://cdn.qwiklabs.com/EFpEix1b8t2ZmZ35kihEUaA8mAoUsQT9Hh8t%2F8MCaiM%3D align="left")

4. Click the **EXECUTE** button.
    

Your response should resemble the following:

```javascript
{}
```

5. Now refresh your hello world page in your browser. You should now see that access been restored:
    

![A web page with the text 'Hello World!'](https://cdn.qwiklabs.com/GxnTJGjHQvlWoJLNIWGq%2BFIpMJ5r7xK4I5QDi%2F7M6cQ%3D align="left")

Now that you've gotten practice with ingress firewall rule configuration, take it to the next level by creating and deploying new versions of our application.

## **Task 6. Update your application files**

Now make a small change to your application's source code.

1. For this step, return to the Cloud Shell. You should still be in the `hello_world` directory. If not, run the following command:
    

```apache
cd ~/python-docs-samples/appengine/standard_python3/hello_world
```

2. Now open the `main.py` file with the `nano` text editor:
    

```apache
nano main.py
```

3. Scroll down to the hello function and edit it so it says "Goodbye world!" instead:
    

```apache
@app.route("/")
def hello():
    """Return a friendly HTTP greeting.
    Returns:
        A string with the words 'Goodbye World!'.
    """
    return "Goodbye World!"
```

4. Press **CNTRL** +**x** then **Y** &gt; **ENTER** to save your changes and exit the `nano` editor.
    

## **Task 7. Create a new version of your application with apps.services.versions.create**

You will now create a new version of your application that uses your updated "Goodbye world!" codebase.

1. In the Cloud Console, from the **Navigation menu (**
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) select **Cloud Storage** &gt; **Buckets**. You should see a list of buckets that resemble the following:
    

![The Browser page displaying a list of buckets](https://cdn.qwiklabs.com/xnwX68OhAA4l8weNUeNDpjsVPOryqowTSdaHsPhnZ0s%3D align="left")

2. **Copy** the `staging.qwiklabs-gcp-xxxx.appspot.com` bucket name and save it.
    
3. Now click on that bucket to view the files it contains.
    
4. **Copy** the name of the `application/json` file and save it.
    

![The name of the application/json file highlighted on the Objects tabbed page](https://cdn.qwiklabs.com/IGwePHi0NxUIbeisIkK4pcVfDEb2YdSokIAg0%2Febw2Y%3D align="left")

You now have the information needed to create a new version of your hello world application.

1. Return to the APIs Explorer for the next step.
    
2. From the left **All APIs & Reference** section navigate to **REST API** &gt; **v1** &gt; **apps.services.versions** &gt; **create**. Or you can use [this direct link](https://cloud.google.com/appengine/docs/admin-api/reference/rest/v1/apps.services.versions/create) to `apps.services.versions.create` method.
    
3. For the **appsId** field, enter your Project ID. For the **servicesId** field, enter **default**.
    
4. Now click in the request body and add:
    

* The **id** property. Set it's value to **v1**.
    
* The **runtime** property and set its value to **python39**.
    
* Add the **entrypoint** property—inside, then add the **shell** property and keep it's value empty.
    

Your method should now resemble the following:

![The method displayed in the Request parameters section](https://cdn.qwiklabs.com/Q%2FbGrp9sp4czXFpP2Ur2NH2bK3xGkYxWyjop5R576V8%3D align="left")

5. Now add the **deployment** property.
    

* Inside deployment, add a new property **files** and click the **add** link that comes underneath it. Give it the name **latest**.
    
* Add the **sourceUrl** property in latest and set it to the following, replacing `<YOUR_BUCKET_NAME>` with the name of the staging Cloud Storage bucket and `<YOUR_JSON_FILE_NAME>` with the name of the JSON file you copied over:
    

```apache
https://storage.googleapis.com/<YOUR_BUCKET_NAME>/<YOUR_JSON_FILE_NAME>
```

Your method should now resemble the following:

![The method displayed in the Request body text field](https://cdn.qwiklabs.com/pDuf6VWznwpNdr94tg6zB2HFEBt6nS25W2ierlwX4mA%3D align="left")

6. Make sure that **Google OAuth 2.0** and **API key** checkboxes are selected under **Credentials** section.
    

![The Credentials section](https://cdn.qwiklabs.com/EFpEix1b8t2ZmZ35kihEUaA8mAoUsQT9Hh8t%2F8MCaiM%3D align="left")

7. Once that's filled out, click the **EXECUTE** button.
    

You should receive the following output:

```json
{
  "name": "apps/qwiklabs-gcp-da84962e277c92a7/operations/7ca371a7-3bf6-4215-871e-7f9aac815714",
  "metadata": {
    "@type": "type.googleapis.com/google.appengine.v1.OperationMetadataV1",
    "method": "google.appengine.v1.Versions.CreateVersion",
    "insertTime": "2019-10-16T14:39:19.231Z",
    "user": "gcpstaging92860_student@qwiklabs.net",
    "target": "apps/qwiklabs-gcp-da84962e277c92a7/services/default/versions/v1"
  }
}
```

There were many fields to fill out, but that is where the APIs Explorer shines. Being able to visualize all the parameters and see how they relate to one another is critical in successfully calling API methods.

## **Task 8. Deploy the new version of your application**

1. Return to the Cloud Console for this step.
    
2. Open the **Navigation menu ()**, click **View all Products** and from the Serverless section, select **App Engine** &gt; **Versions**.
    

You should see that there are now two versions of your application available:

![The Versions page displaying two versions of the application](https://cdn.qwiklabs.com/eCgFnSXYG5BCKUVjf6JXpYbv3seUf2%2B6nMQ80aNKBoQ%3D align="left")

**Note:** If you don't see two versions, it's possible that your updates haven't propagated yet. Click the **Refresh** button in the top left corner until your page resembles the above screenshot.

3. Return to your Cloud Shell session. You should still be in the `hello_world` directory. If not, run the following command:
    

```apache
cd ~/python-docs-samples/appengine/standard_python3/hello_world
```

You will now deploy the new version of your application.

4. Run the following command to deploy the new version, with "Goodbye world!" as the message:
    

```apache
gcloud app deploy -v v1
```

5. When prompted with the following, enter in **Y**:
    

```apache
Do you want to continue (Y/n)?
```

The deployment will take a couple minutes to complete.

Once it has finished, you should receive a similar output:

```apache
File upload done.
Updating service [default]...done.
Setting traffic split for service [default]...done.
Deployed service [default] to [https://qwiklabs-gcp-b5d5fa242d334941.appspot.com]
```

6. Now copy the link or refresh the application page in your browser. You should see the following:
    

![A web page displaying the text 'Goodbye World!'](https://cdn.qwiklabs.com/K9jJG2TMTM2DtO3Yxl0ewKesUHYpcQw2DB464bnj6og%3D align="left")

If you return to the Cloud Console and look at **App Engine** &gt; **Versions** you will see that that `v1` is being run:

![The Service page displaying v1 with the Status set to Serving, and Traffic Allocation at 100 percent](https://cdn.qwiklabs.com/pI1yunuIOyFECoewQ6Zz4VN9qjJLA2w93GtLxCSKMao%3D align="left")

You have successfully created a new version of an application with the APIs Explorer and deployed it in Cloud Shell.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a new version of your app, you will see an assessment score.

Create and deploy a new version of your app

---

## Solution of Lab

%[https://youtu.be/xngtRB8faI8] 

```apache
curl -LO https://github.com/ArcadeCrew/Google-Cloud-Labs/raw/refs/heads/main/APIs%20Explorer%20App%20Engine/arcadecrew.sh
sudo chmod +x arcadecrew.sh
./arcadecrew.sh
```