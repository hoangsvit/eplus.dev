---
title: "App Engine: Qwik Start - Python - GSP067"
seoTitle: "App Engine: Qwik Start - Python - GSP067"
seoDescription: "App Engine allows developers to focus on doing what they do best, writing code, and not what it runs on. Developers upload their apps to App Engine, and Goo"
datePublished: Thu Aug 08 2024 05:54:08 GMT+0000 (Coordinated Universal Time)
cuid: clzkv4x0m000f09jzewalel39
slug: app-engine-qwik-start-python-gsp067
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723095790555/60c5b7e4-d28d-4753-9c01-0938d3627d35.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723096434787/486680c0-8461-42c7-b904-3a9c874f999b.png

---

## **Overview**

[App Engine](https://cloud.google.com/appengine) allows developers to focus on doing what they do best, writing code, and not what it runs on. Developers upload their apps to App Engine, and Google Cloud takes care of the rest. The notion of servers, virtual machines, and instances have been abstracted away, with App Engine providing all the compute necessary. Developers don't have to worry about operating systems, web servers, logging, monitoring, load-balancing, system administration, or scaling, as App Engine takes care of all that. Developers only need to focus on building solutions for their organizations or their users.

The App Engine standard environment provides application-hosting services supporting the following languages: Python, Java, PHP, Go, Node.js, and Ruby). The App Engine flexible environment provides even more flexibility by supporting custom runtimes, however it is out-of-scope for this lab.

App Engine is Google Cloud's original serverless runtime, and since its original launch in 2008, has been joined by:

* [Cloud Functions](https://cloud.google.com/functions), great for situations where you don't have an entire app, have broken up a larger, monolithic app into multiple microservices, or have short event-driven tasks that execute based on user activity.
    
* [Cloud Run](http://cloud.run/), the serverless container-hosting service similar to App Engine but more accurately reflects the state of software development today.
    

In this lab, you'll learn how to deploy a basic app to App Engine, but we invite you to also explore Cloud Functions and Cloud Run. App Engine makes it easy to build and deploy an application that runs reliably even under heavy load and with large amounts of data. (Cloud Functions and Cloud Run do the same.)

App Engine apps can access numerous additional Cloud or other Google services for use in their applications:

* **NoSQL database:** [Cloud Datastore](https://cloud.google.com/datastore), [Cloud Firestore](https://cloud.google.com/firestore), [Cloud BigTable](https://cloud.google.com/bigtable)
    
* **Relational database:** [Cloud SQL](https://cloud.google.com/sql) or [Cloud AlloyDB](https://cloud.google.com/alloydb), [Cloud Spanner](https://cloud.google.com/spanner)
    
* **File/object storage:** [Cloud Storage](https://cloud.google.com/storage), [Cloud Filestore](https://cloud.google.com/filestore), [Google Drive](https://developers.google.com/drive)
    
* **Caching:** [Cloud Memorystore](https://cloud.google.com/memorystore) (Redis or `memcached`)
    
* **Task execution:** [Cloud Tasks](https://cloud.google.com/tasks), [Cloud Pub/Sub](https://cloud.google.com/pubsub), [Cloud Scheduler](https://cloud.google.com/scheduler), [Cloud Workflows](https://cloud.google.com/workflows)
    
* **User authentication:** [Cloud Identity Platform](https://cloud.google.com/identity-platform), [Firebase Auth](https://firebase.google.com/docs/auth), [Google Identity Services](https://developers.google.com/identity)
    

Applications run in a secure, sandboxed environment, allowing App Engine standard environment to distribute requests across multiple servers, and scaling servers to meet traffic demands. Your application runs within its own secure, reliable environment that is independent of the hardware, operating system, or physical location of the server.

This hands-on lab shows you how to create a small App Engine application that displays a short message.

**What you'll learn**

In this lab you'll do the following with a Python app:

* Clone/download
    
* Test
    
* Update
    
* Test
    
* Deploy
    

---

### **Task 1. Enable Google App Engine Admin API**

The App Engine Admin API enables developers to provision and manage their App Engine Applications.

1. In the left **Navigation menu**, click **APIs & Services** &gt; **Library**.
    
2. Type "App Engine Admin API" in the search box.
    
3. Click the **App Engine Admin API** card.
    
4. Click **Enable**. If there is no prompt to enable the API, then it is already enabled and no action is needed.
    

### **Task 2. Download the Hello World app**

There is a simple Hello World app for Python you can use to quickly get a feel for deploying an app to Google Cloud. Follow these steps to download Hello World to your Google Cloud instance.

1. Enter the following command to copy the Hello World sample app repository to your Google Cloud instance:
    

```apache
git clone https://github.com/GoogleCloudPlatform/python-docs-samples.git
```

2. Go to the directory that contains the sample code:
    

```apache
cd python-docs-samples/appengine/standard_python3/hello_world
```

3. Setup python environment:
    

```apache
sudo apt install python3 -y
sudo apt install python3.11-venv
python3 -m venv create myvenv
source myvenv/bin/activate
```

### **Task 3. Test the application**

Test the application using the Google Cloud development server (`dev_appserver.py`), which is included with the preinstalled App Engine SDK.

1. From within your helloworld directory where the app's [app.yaml](https://cloud.google.com/appengine/docs/standard/python/config/appref) configuration file is located, start the Google Cloud development server with the following command:
    

```apache
dev_appserver.py app.yaml
```

The development server is now running and listening for requests on port 8080.

2. View the results by clicking the **Web preview** () &gt; **Preview on port 8080**.
    
    You'll see this in a new browser window:
    
    ![Browser window with Hello World! on the page](https://cdn.qwiklabs.com/BIPZByP1eH9Q0K2oQSImfuPKKHlWj%2FbpNiSmef%2BuOaQ%3D align="left")
    

### **Task 4. Make a change**

You can leave the development server running while you develop your application. The development server watches for changes in your source files and reloads them if necessary.

Let's try it. Leave the development server running. We'll open another command line window, then edit `main.py` to change "Hello World!" to "Hello, Cruel World!".

1. Click the (**+**) next to your Cloud Shell tab to open a new command line session.
    
    ![+ button](https://cdn.qwiklabs.com/mDTDfc9iJWNUoUBakp5ocggWNwmpChiG7gDHnUCrACM%3D align="left")
    
2. Enter this command to go to the directory that contains the sample code:
    

```apache
cd python-docs-samples/appengine/standard_python3/hello_world
```

3. Enter the following to open main.py in nano to edit the content:
    

```apache
nano main.py
```

4. Change "Hello World!" to "Hello, Cruel World!".
    
5. Save the file with CTRL-S and exit with CTRL-X.
    
6. Reload the Hello World! Browser or click the **Web Preview** () &gt; **Preview on port 8080** to see the results.
    
    ![Browser window with Hello, Cruel World! on the page](https://cdn.qwiklabs.com/znqxKObHIzucdgmme4nJP485ReBUAMdG%2BOKJP9XLzes%3D align="left")
    

### **Task 5. Deploy your app**

1. To deploy your app to App Engine, run the following command from within the root directory of your application where the app.yaml file is located:
    

```apache
gcloud app deploy
```

2. Enter the number that represents your region: `us-east4`
    

3. The App Engine application will then be created.
    

Example output:

```apache
Creating App Engine application in project [qwiklabs-gcp-233dca09c0ab577b] and region [us-east4]....done.
Services to deploy:

descriptor:      [/home/gcpstaging8134_student/python-docs-samples/appengine/standard/hello_world/app.yaml]
source:          [/home/gcpstaging8134_student/python-docs-samples/appengine/standard/hello_world]
target project:  [qwiklabs-gcp-233dca09c0ab577b]
target service:  [default]
target version:  [20171117t072143]
target url:      [https://qwiklabs-gcp-233dca09c0ab577b.appspot.com]

Do you want to continue (Y/n)?
```

4. Enter **Y** when prompted to confirm the details and begin the deployment of service.
    

Example output:

```apache
Beginning deployment of service [default]...
Some files were skipped. Pass `--verbosity=info` to see which ones.
You may also view the gcloud log file, found at
[/tmp/tmp.dYC7xGu3oZ/logs/2017.11.17/07.18.27.372768.log].
╔════════════════════════════════════════════════════════════╗
╠═ Uploading 5 files to Google Cloud Storage                ═╣
╚════════════════════════════════════════════════════════════File upload done.
Updating service [default]...done.
Waiting for operation [apps/qwiklabs-gcp-233dca09c0ab577b/operations/2e88ab76-33dc-4aed-93c4-fdd944a95ccf] to complete...done.
Updating service [default]...done.
Deployed service [default] to [https://qwiklabs-gcp-233dca09c0ab577b.appspot.com]

You can stream logs from the command line by running:
  $ gcloud app logs tail -s default

To view your application in the web browser run:
  $ gcloud app browse
```

**Note:** If you receive an error as "Unable to retrieve P4SA" while deploying the app, then re-run the above command.

### **Task 6. View your application**

* To launch your browser enter the following command, then click on the link it provides:
    

```apache
gcloud app browse
```

Example output (note that your link will be different):

```apache
Did not detect your browser. Go to this link to view your app:
https://qwiklabs-gcp-233dca09c0ab577b.appspot.com
```

![Browser window with Hello, Cruel Word! on the page](https://cdn.qwiklabs.com/jcmBHIwDjWPXrIhp%2BdkpAFj91XplPzuzQFPEd0XSR4k%3D align="left")

Your application is deployed and you can read the short message in your browser.

Click **Check my progress** to verify the objective.

Deploy your app.

**Check my progress**

### **Task 7. Test your knowledge**

Test your knowledge about Google Cloud Platform by taking this quiz. (Select multiple correct answers if necessary.)

**With Google App Engine, what do developers need to focus on?**

* Virtual machines
    
* System administration
    
* Application code
    
* All of themWeb servers
    
* Operating systems
    

**What modern language runtimes are supported by App Engine?**

* Go
    
* PHP
    
* Node.js (JavaScript)
    
* Ruby
    
* Java
    
* Python
    

**What are other serverless platforms from Google Cloud that are similar to App Engine?**

* All of them
    
* Compute Engine
    
* GKE/Kubernetes Engine
    
* BigQuery
    
* Cloud Run
    
* Cloud Functions
    

---

### Solution of Lab

%[https://www.youtube.com/watch?v=xqRj36QQhOs] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723096196613/2d7577d8-b82c-4eea-b902-d4c4cfa48700.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/App%20Engine%20Qwik%20Start%20Python/quicklabgsp067.sh
sudo chmod +x quicklabgsp067.sh
./quicklabgsp067.sh
```