---
title: "App Engine: 3 Ways: Challenge Lab - ARC112"
seoTitle: "App Engine: 3 Ways: Challenge Lab - ARC112"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Thu Aug 08 2024 05:37:19 GMT+0000 (Coordinated Universal Time)
cuid: clzkuj9xj000c08le6rv0hlx4
slug: app-engine-3-ways-challenge-lab-arc112
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755847053625/5d64ac78-5e21-424a-a42a-f63745be1f5a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755847041284/07f582b6-07ed-4d9c-bcd5-026cb560a1b3.png
tags: app-engine-3-ways-challenge-lab-arc112, arc112, app-engine-3-ways-challenge-lab

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

---

### **Task 1. Enable the Google App Engine Admin API**

* Enable the Google App Engine Admin API for the project to provision and manage the App Engine application.
    

Click **Check my progress** to verify the objective.

Enable Google App Engine Admin API

**Check my progress**

### **Task 2. Download the Hello World app**

1. Download a simple Hello World app from the relevant repository according to your choice of language for deploying the web application on the VM instance **lab-setup** at the `$HOME` directory (~/).
    
    | **Language** | **Repository** |
    | --- | --- |
    | Python | [https://github.com/GoogleCloudPlatform/python-docs-samples.git](https://github.com/GoogleCloudPlatform/python-docs-samples.git) |
    | PHP | [https://github.com/GoogleCloudPlatform/php-docs-samples.git](https://github.com/GoogleCloudPlatform/php-docs-samples.git) |
    | Golang/Go | [https://github.com/GoogleCloudPlatform/golang-samples.git](https://github.com/GoogleCloudPlatform/golang-samples.git) |
    
2. Go to the directory that contains the `helloworld` sample code.
    

Click **Check my progress** to verify the objective.

Download the Hello World app

**Check my progress**

### **Task 3. Deploy your application**

For this task, you need to deploy the `helloworld` app to the Google App Engine in the `us-east4` region.

* Navigate from the root directory to where your application's `app.yaml` file is located.
    

**Note:** Deploy the application to the App Engine standard environment.

**View your application**

1. To launch and view the application in your browser, enter the following command:
    

```apache
gcloud app browse
```

2. Click on the link that is provided. Your application is deployed and you can read the default message in your browser.
    

Click **Check my progress** to verify the objective.

Deploy the application

**Check my progress**

### **Task 4. Deploy updates to your application**

* Update your application code to change the default message of `Hello, World!` to `Goodbye world!` and redeploy your application.
    

Click **Check my progress** to verify the objective.

Deploy updates to your application

**Check my progress**

---

### Solution of Lab

%[https://youtu.be/CmVhpNYquiU] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC112/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755846991837/4b3e79d6-ae9a-42f2-8879-997fe1da21e0.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755847889619/9df347c5-6359-471b-bb53-f0f264a7ef39.png align="center")

---

### Manual

Run the below commands in *SSH on the VM Instance* `lab-setup`.

**Task 1 - Enable the Google App Engine Admin API**

```apache
gcloud services enable appengine.googleapis.com
```

**Task 2 - Download the Hello World app**

*Make sure to download the web application on the VM instance "lab-setup"*

```apache
git clone https://github.com/GoogleCloudPlatform/php-docs-samples.git
cd php-docs-samples/appengine/standard/helloworld
```

* After cloning the above command in the `SSH of VM-Instance`, come back to your `cloud console` and open the `Cloud Shell Terminal`.
    
* And again, `recloning the sample file` using the *above commands*.
    

**Task 3 - Deploy your application**

```apache
gcloud app deploy
gcloud app browse
```

* Choose *Region* in the list which you have given in your lab. --&gt; (This is the most important thing in this step.)
    
* If asking "Enter your choice (Y/n)" then --&gt; press y
    

**Task 4 - Deploy updates to your application**

* Here, in the `index.php`, change the code to *Hello, World!* to `Whatever the message is in the Task 4`.
    
* Now, after editing the code, save and exit from the editor by pressing the `Ctrl+X, Y`, and then hit `Enter`.
    

```apache
nano index.php
gcloud app deploy
```