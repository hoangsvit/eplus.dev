---
title: "App Engine: Qwik Start - Go - GSP070"
seoTitle: "App Engine: Qwik Start - Go - GSP070"
seoDescription: "App Engine allows developers to focus on doing what they do best, writing code. The App Engine standard environment is based on container instances running "
datePublished: Tue Jan 14 2025 09:28:44 GMT+0000 (Coordinated Universal Time)
cuid: cm5w9tbts001p09mdev7u9hnz
slug: app-engine-qwik-start-go-gsp070
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1736846870908/af27ee98-6959-4a70-a407-2dce5062a914.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1736846904478/8de58f89-7a89-4170-97c4-dabd2c2857d4.png
tags: app-engine-qwik-start-go, gsp070, app-engine-qwik-start-go-gsp070

---

## **Overview**

[App Engine](https://cloud.google.com/appengine) allows developers to focus on doing what they do best, writing code. The App Engine standard environment is based on container instances running on Google's infrastructure. Containers are preconfigured with one of several available runtimes, and each runtime also includes libraries that support [App Engine Standard APIs](https://cloud.google.com/appengine/docs/about-the-standard-environment#index_of_features). For many applications, the standard environment runtimes and libraries might be all you need.

App Engine offers you a choice between two Go language environments. Both environments have the same code-centric developer workflow, scale quickly and efficiently to handle increasing demand, and enable you to use Google’s proven serving technology to build your web, mobile and IoT applications quickly and with minimal operational overhead. While the two environments have a lot in common, they differ in a few important ways.

The `App Engine standard environment` makes it easy to build and deploy an application that runs reliably under heavy load and with large amounts of data. Your application runs within its own secure, reliable environment that is independent of the hardware, operating system, or physical location of the server. It supports Go `1.11`.

The `App Engine flexible environment` is based on Compute Engine and automatically scales your app up and down while balancing the load.

This hands-on lab shows you how to create a small App Engine application that displays a short message.

### What you'll do

* Download an application
    
* Test the application
    
* Deploy the application
    

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
    student-04-19fda6052c42@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    7BT61J3kGLEo
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-43c59bf39682`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-43c59bf39682
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
ACCOUNT: student-04-19fda6052c42@qwiklabs.net

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
project = qwiklabs-gcp-01-43c59bf39682
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Set the region for the project

```apache
gcloud config set compute/region us-east4
```

## **Task 1. Enable Google App Engine Admin API**

The App Engine Admin API enables developers to provision and manage their App Engine Applications.

1. In the left menu, click **APIs & Services** &gt; **Library**.
    

![The navigation path to the Library option.](https://cdn.qwiklabs.com/%2B2b6gVqGkKBE1lu1siHBCJHAH5eBdYMrf8IR9xO2QAQ%3D align="left")

2. Type "App Engine Admin API" in search box.
    
3. Click **App Engine Admin API**.
    

![The highlighted Google App Engine Admin API result.](https://cdn.qwiklabs.com/yUBmasTyF8ktQOVwBiLQE5TREIax5qNYvhd4MRjtKaw%3D align="left")

4. Click **Enable**(If required).
    

![The Enable button highlighted](https://cdn.qwiklabs.com/YSP5rGpYmJ6UOF%2BBXtMAx%2FtA%2Fdmj4tC%2F%2FAIzxcmrQWg%3D align="left")

## **Task 2. Download the Hello World app**

There is a simple Hello World app for Go that you can use to quickly get a feel for deploying an app to Google Cloud. Follow these steps to download Hello World to your Google Cloud instance.

1. Open a Cloud Shell session and enter the following command to clone the Hello World sample app repository:
    

```apache
git clone https://github.com/GoogleCloudPlatform/golang-samples.git
```

2. Go to the directory that contains the sample code:
    

```apache
cd golang-samples/appengine/go11x/helloworld
```

## **Task 3. Deploy your app**

1. To deploy your app to App Engine, run the following command from within the root directory of your application where the `app.yaml` file is located:
    

```apache
sudo apt-get install google-cloud-sdk-app-engine-go
gcloud app deploy
```

2. Enter the number that represents your region: `us-east4`
    

**Sample output:**

```apache
Creating App Engine application in project [qwiklabs-gcp-58a2268dafa9e708] and region [asia-south1]....done.
Services to deploy:
descriptor:      [/home/gcpstaging8142_student/helloworld/app.yaml]
source:          [/home/gcpstaging8142_student/helloworld]
target project:  [qwiklabs-gcp-58a2268dafa9e708]
target service:  [default]
target version:  [20171117t080909]
target url:      [https://qwiklabs-gcp-58a2268dafa9e708.appspot.com]
Do you want to continue (Y/n)?
```

3. Enter **Y** to confirm the deployment of service when prompted.
    

**Sample output:**

```apache
Beginning deployment of service [default]...
Some files were skipped. Pass `--verbosity=info` to see which ones.
You may also view the gcloud log file, found at
[/tmp/tmp.4CytrNBIMQ/logs/2017.11.17/08.06.15.720314.log].
╔════════════════════════════════════════════════════════════╗
╠═ Uploading 2 files to Google Cloud Storage                ═╣
╚════════════════════════════════════════════════════════════╝
File upload done.
Updating service [default]...done.
Waiting for operation [apps/qwiklabs-gcp-58a2268dafa9e708/operations/27b6d801-9018-4a86-b8c0-6082f78fb09f] to complete...done.
Updating service [default]...done.
Deployed service [default] to [https://qwiklabs-gcp-58a2268dafa9e708.appspot.com]

You can stream logs from the command line by running:
  $ gcloud app logs tail -s default

To view your application in the web browser run:
  $ gcloud app browse
```

## **Task 4. View your application**

1. To launch your browser, enter the following command:
    

```apache
gcloud app browse
```

2. Then click on the link it provides.
    

**Sample output, note your link will be different:**

!["Hello, World!" displayed on a web page.](https://cdn.qwiklabs.com/yCyeqHJcdRoG3A09%2ByeQszb4pHDynMZeXqQ1fh3I5e4%3D align="left")

Your application is deployed and you can read the short message in your browser.

Click **Check my progress** to verify the objective.

Deploy your app.

Check my progress

## **Task 5. Test your knowledge**

Test your knowledge about Google cloud Platform by taking our quiz. (Please select multiple correct options if necessary.)

Which of the following runtimes for GO are supported in App Engine standard environment?

* Go 1.9
    
* Go 1.6
    
* Go 1.11
    
* Go 1.8
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=3cVxYis4Hj8&ab_channel=QUICKGCPLAB] 

```apache
export REGION=us-east4
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736846546069/4a12025e-c513-49a1-8c8c-aee34fbf70ba.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/App%20Engine%20Qwik%20Start%20-%20Go/gsp070.sh
sudo chmod +x gsp070.sh
./gsp070.sh
```