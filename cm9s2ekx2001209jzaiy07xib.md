---
title: "App Engine: Qwik Start - PHP - GSP069"
seoTitle: "App Engine: Qwik Start - PHP - GSP069"
seoDescription: "App Engine allows developers to focus on doing what they do best—write code. The App Engine standard environment is based on container instances running on"
datePublished: Tue Apr 22 2025 05:29:03 GMT+0000 (Coordinated Universal Time)
cuid: cm9s2ekx2001209jzaiy07xib
slug: app-engine-qwik-start-php-gsp069
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745299455923/8c4ad8d0-6252-460f-9fb9-38d2cfc6d164.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745299725279/33075f9a-870c-42e6-8b44-5450853fae0d.png
tags: php, app-engine-qwik-start-php-gsp069, app-engine-qwik-start-php, gsp069

---

## Overview

App Engine allows developers to focus on doing what they do best—write code. The App Engine standard environment is based on container instances running on Google's infrastructure. Containers are preconfigured with one of several available runtimes, and each runtime also includes libraries that support [App Engine Standard APIs](https://cloud.google.com/appengine/docs/about-the-standard-environment#index_of_features). For many applications, the standard environment runtimes and libraries might be all you need.

The App Engine standard environment makes it easy to build and deploy an application that runs reliably even under heavy load and with large amounts of data. It includes the following features:

* Persistent storage with queries, sorting, and transactions.
    
* Automatic scaling and load balancing.
    
* Asynchronous task queues for performing work outside the scope of a request.
    
* Scheduled tasks for triggering events at specified times or regular intervals.
    
* Integration with other [Google Cloud services and APIs](https://cloud.google.com/products/).
    

Applications run in a secure, sandboxed environment, allowing App Engine standard environment to distribute requests across multiple servers, and scaling servers to meet traffic demands. Your application runs within its own secure, reliable environment that is independent of the hardware, operating system, or physical location of the server.

This hands-on lab shows you how to create a small App Engine application that displays a short message.

### What you'll do

* Download an application
    
* Test the application
    
* Deploy the application
    

## Setup and requirements

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
    student-04-f27b113ff416@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    qsNPm6xWhm3z
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-cd9036430e06`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-cd9036430e06
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
ACCOUNT: student-04-f27b113ff416@qwiklabs.net

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
project = qwiklabs-gcp-00-cd9036430e06
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Set the region for the project

```apache
gcloud config set compute/region us-central1
```

## Task 1. Enable Google App Engine Admin API

The App Engine Admin API enables developers to provision and manage their App Engine Applications.

1. In the left menu, click **APIs & Services** &gt; **Library**.
    

![The navigation path to the Library option.](https://cdn.qwiklabs.com/HArVguiohtDtUhiPIWzqNnBfeRlqtNk7dDsZ%2F6EO13E%3D align="left")

2. Type "App Engine Admin API" in search box.
    
3. Click **App Engine Admin API**.
    

![The search result for App Engine Admin API.](https://cdn.qwiklabs.com/Z4PwF8PiQv%2BX%2FyqcbbT60QzaQzfwoKtsW3BgOBeuENs%3D align="left")

4. Click **Enable**.
    

![The Enable button highlighted in the UI.](https://cdn.qwiklabs.com/el15KNfycJRm8XLGBymxvep2QQ4okMT706X8TWMKF5k%3D align="left")

## Task 2. Download the Hello World app

A simple Hello World app for PHP has been created so you can quickly get a feel for deploying an app to Google Cloud. Follow these steps to download Hello World to your Google Cloud instance.

1. Enter the following command to clone the Hello World sample app repository to your Google Cloud instance:
    

```apache
git clone https://github.com/GoogleCloudPlatform/php-docs-samples.git
```

**Output:**

```apache
Cloning into 'php-docs-samples'...
remote: Enumerating objects: 13, done.
remote: Counting objects: 100% (13/13), done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 13607 (delta 11), reused 9 (delta 9), pack-reused 13594
Receiving objects: 100% (13607/13607), 12.22 MiB | 23.45 MiB/s, done.
Resolving deltas: 100% (8848/8848), done.
```

2. Go to the directory that contains the sample code:
    

```apache
cd php-docs-samples/appengine/standard/helloworld
```

## Task 3. Deploy your app

1. To deploy your app to App Engine, run the following command from within the root directory of your application where the `app.yaml` file is located:
    

```apache
gcloud app deploy
```

2. Enter the number that represents your region: `us-central`
    

**Output:**

```apache
Services to deploy:
descriptor:      [/home/gcpstaging8140_student/helloworld/app.yaml]
source:          [/home/gcpstaging8140_student/helloworld]
target project:  [qwiklabs-gcp-e6160e374e92ffbf]
target service:  [default]
target version:  [20171117t091157]
target url:      [https://qwiklabs-gcp-e6160e374e92ffbf.appspot.com]
Do you want to continue (Y/n)?
```

3. Enter **Y** when prompted to confirm the deployment of service.
    

**Sample output:**

```apache
Beginning deployment of service [default]...
Some files were skipped. Pass `--verbosity=info` to see which ones.
You may also view the gcloud log file, found at
[/tmp/tmp.YZRoP4bCoj/logs/2017.11.17/09.08.37.201396.log].
╔════════════════════════════════════════════════════════════╗
╠═ Uploading 5 files to Google Cloud Storage                ═╣
╚════════════════════════════════════════════════════════════════════════╝
File upload done.
Updating service [default]...done.
Updating service [default]...Waiting for operation [apps/qwiklabs-gcp-e6160e374e92ffbf/operat
ions/bf540c31-338f-4532-bcdc
-e47768040d0c] to complete...done.
Updating service [default]...done.
Deployed service [default] to [https://qwiklabs-gcp-e6160e374e92ffbf.appspot.com]
You can stream logs from the command line by running:
  $ gcloud app logs tail -s default
To view your application in the web browser run:
  $ gcloud app browse
```

## Task 4. View your application

1. To launch your browser, enter the following command:
    

```apache
gcloud app browse
```

**Sample output, your link will be different:**

```apache
Did not detect your browser. Go to this link to view your app:
https://qwiklabs-gcp-e6160e374e92ffbf.appspot.com
```

2. Click on the link to view your application.
    

![A web page displaying the text "hello world!".](https://cdn.qwiklabs.com/ZqMB5wyDt4KLHW6HcJtlsaSVFXxQL2QrTtyXsSrzgs8%3D align="left")

Your application is deployed and you can read the short message in your browser.

Click **Check my progress** to verify the objective.

Deploy your app.

**Check my progress**

## Task 5. Make a change

Now make a change to your sample app.

1. Open the `index.php` file with the nano editor:
    

```apache
nano index.php
```

2. Now change "hello world!" to "goodbye world!".
    
3. Press **CTRL** + **X** &gt; **Y** &gt; **Enter** to exit and save the file.
    
4. In Cloud Shell, run the following command to redeploy your application:
    

```apache
gcloud app deploy
```

5. Enter **Y** when prompted to confirm the deployment of service.
    

**Soon after you should receive the following output:**

```apache
To view your application in the web browser run:
  $ gcloud app browse
```

6. Refresh the browser tab with your App Engine deployment. You should see the following:
    
    ![A web page displaying the text "goodbye world!".](https://cdn.qwiklabs.com/WzF1kD58gLMHl%2Fpp0vSsbpC2Y8xL%2BbM%2B%2FrJkX108B5A%3D align="left")
    

## Task 6. Test your knowledge

Test your knowledge about Google cloud Platform by taking our quiz.

The App Engine standard environment makes it easy to build and deploy an application that runs reliably under heavy load and with large amounts of data.TrueFalse

---

## Solution of Lab

%[https://youtu.be/sxlXdG7sLy4] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP069/lab.sh
source lab.sh
```

**Script Alternative**

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745299645473/7f6af254-22cc-4135-9363-a2fc7c195f54.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/App%20Engine%20Qwik%20Start%20PHP/quicklabgsp069.sh
sudo chmod +x quicklabgsp069.sh
./quicklabgsp069.sh
```