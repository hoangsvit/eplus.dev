---
title: "App Engine: Qwik Start - Java - GSP068"
seoTitle: "Qwik Start - Java"
seoDescription: "Learn to create and deploy a simple Java app on Google App Engine. Focus on writing code while Google handles infrastructure"
datePublished: Sun Aug 17 2025 06:30:41 GMT+0000 (Coordinated Universal Time)
cuid: cmefb4ibi000802l24ssj81wd
slug: app-engine-qwik-start-java-gsp068
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755412122206/f74a9768-edea-4f4a-b188-63a0eecd64ec.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755412209728/a9b7bbd2-e287-4926-bd13-a060816cfef1.png
tags: app-engine-qwik-start-java-gsp068, app-engine-qwik-start, gsp068, qwik-start-java

---

## Overview

App Engine allows developers to focus on doing what they do best, writing code. The App Engine standard environment is based on container instances running on Google's infrastructure. Containers are preconfigured with one of several available runtimes (Java, Python, Go and PHP). Each runtime also includes libraries that support [App Engine Standard APIs](https://cloud.google.com/appengine/docs/about-the-standard-environment#index_of_features). For many applications, the standard environment runtimes and libraries might be all you need.

The App Engine standard environment makes it easy to build and deploy an application that runs reliably even under heavy load and with large amounts of data. It includes the following features:

* Persistent storage with queries, sorting, and transactions.
    
* Automatic scaling and load balancing.
    
* Asynchronous task queues for performing work outside the scope of a request.
    
* Scheduled tasks for triggering events at specified times or regular intervals.
    
* Integration with other [Google Cloud services and APIs](https://cloud.google.com/products/).
    

Applications run in a secure, sandboxed environment, allowing App Engine standard environment to distribute requests across multiple servers, and scaling servers to meet traffic demands. Your application runs within its own secure, reliable environment that is independent of the hardware, operating system, or physical location of the server.

This hands-on lab shows you how to create a small App Engine application that displays a short message.

## Objectives

In this lab you will learn how to:

* Download starter code from a GitHub repository.
    
* Deploy your application with Google App Engine.
    

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
    student-03-b75ba7f423e8@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    IkE34ebgiMrm
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-bb698fe71929`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-bb698fe71929
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
ACCOUNT: student-03-b75ba7f423e8@qwiklabs.net

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
project = qwiklabs-gcp-01-bb698fe71929
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Download the sample HTTP Server app

We've created a simple `HTTP Server` app written in Java so you can quickly get a feel for deploying an application on Google Cloud. Follow these steps to download the `HTTP Server` sample code.

1. Open a new Cloud Shell session by clicking the **Activate Cloud Shell** button at the top right of the Cloud Console.
    
2. In your new Cloud Shell terminal, run the following command to copy the files from Google Cloud Storage to your local directory::
    

```apache
gcloud storage cp -r gs://spls/gsp068/appengine-java21/appengine-java21/* .
```

**Output:**

```apache
Copying gs://spls/gsp068/appengine-java21/appengine-java21/helloworld/http-server/src/main/java/com/example/appengine/Main.java to file://./helloworld/http-server/src/main/java/com/example/appengine/Main.java
Copying gs://spls/gsp068/appengine-java21/appengine-java21/helloworld/pom.xml to file://./helloworld/pom.xml
Copying gs://spls/gsp068/appengine-java21/appengine-java21/helloworld/settings.gradle to file://./helloworld/settings.gradle
Copying gs://spls/gsp068/appengine-java21/appengine-java21/helloworld/src/main/java/com/example/appengine/java21/HelloAppEngine.java to file://./helloworld/src/main/java/com/example/appengine/java21/HelloAppEngine.java
Copying gs://spls/gsp068/appengine-java21/appengine-java21/helloworld/src/main/webapp/WEB-INF/appengine-web.xml to file://./helloworld/src/main/webapp/WEB-INF/appengine-web.xml
Copying gs://spls/gsp068/appengine-java21/appengine-java21/helloworld/src/main/webapp/WEB-INF/web.xml to file://./helloworld/src/main/webapp/WEB-INF/web.xml
Copying gs://spls/gsp068/appengine-java21/appengine-java21/helloworld/src/test/java/com/example/appengine/java21/HelloAppEngineTest.java to file://./helloworld/src/test/java/com/example/appengine/java21/HelloAppEngineTest.java
  Completed files 20/20 | 54.2kiB/54.2kiB                                                                                                                                         

Average throughput: 40.0kiB/s
```

2. Next, navigate to the directory that contains the sample code:
    

```apache
cd helloworld/http-server
```

Copied!

In this folder you will find the `src` directory that contains a package called `com.example.appengine`. This package contains the source code for the `HTTP Server` app.

The source code looks like this:

```java
package com.example.appengine;

import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class Main {

  public static void main(String[] args) throws IOException {
    // Create an instance of HttpServer bound to port defined by the 
    // PORT environment variable when present, otherwise on 8080.
    int port = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));
    HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

    // Set root URI path.
    server.createContext("/", (var t) -> {
      byte[] response = "Hello World!".getBytes();
      t.sendResponseHeaders(200, response.length);
      try (OutputStream os = t.getResponseBody()) {
        os.write(response);
      }
    });

    // Create a second URI path.
    server.createContext("/foo", (var t) -> {
      byte[] response = "Foo!".getBytes();
      t.sendResponseHeaders(200, response.length);
      try (OutputStream os = t.getResponseBody()) {
        os.write(response);
      }
    });

    server.start();
  }
}
```

#### How it Works

This code creates a basic web server on Google App Engine that responds to two addresses:

* `/`: (main page) Displays "Hello World!"
    
* `/foo`: (special page) Displays "Foo!"
    

1. **Imports**: Includes tools for creating the server and handling requests.
    
2. **Main Function**: Starts the app when it runs.
    
3. **Server Creation**:
    
    * Figures out which port to use (either from App Engine or default 8080).
        
    * Creates a web server that listens on that port.
        
4. **Request Handling**:
    
    * Two rules are set up:
        
        * If someone visits the main page (`/`), show "Hello World!"
            
        * If someone visits `/foo`, show "Foo!"
            
5. **Start**: The server starts running, ready to respond to web requests.
    

App Engine simplifies web app development by handling server management, scaling, and security for you. It's a great way to quickly get a simple web app up and running.

## Task 2. Deploy and view your app

In this task, you'll deploy the `HTTP Server` app to Google App Engine.

1. Now you'll create an application on an App Engine with the following command:
    

```apache
gcloud app deploy
```

2. When prompted, enter your choice of number associated with `us-west1`. Type `y` to continue.
    
3. To view your app, use command:
    

```apache
gcloud app browse
```

You should receive the following output soon after (your URL will be different):

```apache
Did not detect your browser. Go to this link to view your app:
https://qwiklabs-gcp-00-3e8fa18ec9dc.uc.r.appspot.com
```

4. Click on the link to view your deployed app in a web browser. You should see a simple web page that displays "Hello World!".
    
5. Next, append `/foo` to the URL in the address bar and press Enter. You should see a page that displays "Foo!".
    

Click **Check my progress** to verify the objective.

Deploy your app.

## Task 3. Test your knowledge

Test your knowledge about Google Cloud Platform by taking our quiz. (Please select multiple correct options if necessary.)

Which of the following are features of App Engine?Scheduled tasks for triggering events at specified timesAutomatic scaling and load balancing.All of themPersistent storage with queries, sorting, and transactions.Asynchronous task queues

---

## Solution of Lab

%[https://youtu.be/gEad-zOYI_g] 

```apache
gcloud storage cp -r gs://spls/gsp068/appengine-java21/appengine-java21/* .
cd helloworld/http-server
gcloud app deploy
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755411952111/aacf35a8-8e4c-4e49-94df-a07079c8e9e2.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755412157205/f1fea56d-3a85-4398-9a52-3740321b136c.png align="center")