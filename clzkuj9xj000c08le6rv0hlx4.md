---
title: "App Engine: 3 Ways: Challenge Lab - ARC112"
seoTitle: "App Engine: 3 Ways: Challenge Lab - ARC112"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Thu Aug 08 2024 05:37:19 GMT+0000 (Coordinated Universal Time)
cuid: clzkuj9xj000c08le6rv0hlx4
slug: app-engine-3-ways-challenge-lab-arc112
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723095395104/23f0c692-3dfe-415e-9424-98ccf41be325.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723095417775/95ab8fb5-1515-4c78-b983-c613e3ca1e73.png

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

%[https://www.youtube.com/watch?v=z9NN3E97Qns&t=5s] 

```apache
export REGION=
export MESSAGE=""
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723095177061/f24b4577-3abc-4478-9f0b-eef1bfca334d.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723095242878/b76c0624-0561-4e40-9543-6973b15dda24.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/App%20Engine%203%20Ways%20Challenge%20Lab/quicklabarc112.sh
sudo chmod +x quicklabarc112.sh
./quicklabarc112.sh
```