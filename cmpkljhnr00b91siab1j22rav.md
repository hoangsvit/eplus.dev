---
title: "Deploy and Manage Applications on Google App Engine: Challenge Lab - ARC112"
seoTitle: "Deploy and Manage Applications on Google App Engine: Challenge Lab - ARC112"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-05-25T02:37:53.322Z
cuid: cmpkljhnr00b91siab1j22rav
slug: deploy-and-manage-applications-on-google-app-engine-challenge-lab-arc112
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/9ae1836c-bf2b-4d43-b7be-efcca73d5f0a.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/252c514c-42c2-496a-86f4-cd6e38da78ea.png
tags: arc112, deploy-and-manage-applications-on-google-app-engine-challenge-lab

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## **Challenge scenario**

You're a junior cloud engineer who is just starting out in your career. So far you have been helping teams create and manage Google Cloud resources.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

For this challenge, you are asked to use Google App Engine to deploy a basic web application in your choice of language (either Python, PHP, or Golang/Go).

You need to:

*   Download an application
    
*   Deploy the application
    
*   Update the code and redeploy the application
    

Each task is described in detail below, good luck!

## **Task 1. Enable the Google App Engine Admin API**

*   Enable the Google App Engine Admin API for the project to provision and manage the App Engine application.
    

Click **Check my progress** to verify the objective.

Enable Google App Engine Admin API

## **Task 2. Download the Hello World app**

1.  Download a simple Hello World app from the relevant repository according to your choice of language for deploying the web application on the VM instance **lab-setup** at the `$HOME` directory (~/).
    
    | **Language** | **Repository** |
    | --- | --- |
    | Python | [https://github.com/GoogleCloudPlatform/python-docs-samples.git](https://github.com/GoogleCloudPlatform/python-docs-samples.git) |
    | PHP | [https://github.com/GoogleCloudPlatform/php-docs-samples.git](https://github.com/GoogleCloudPlatform/php-docs-samples.git) |
    | Golang/Go | [https://github.com/GoogleCloudPlatform/golang-samples.git](https://github.com/GoogleCloudPlatform/golang-samples.git) |
    
2.  Go to the directory that contains the `helloworld` sample code.
    

Click **Check my progress** to verify the objective.

Download the Hello World app

## **Task 3. Deploy your application**

For this task, you need to deploy the `helloworld` app to the Google App Engine in the `us-central` region.

*   Navigate from the root directory to where your application's `app.yaml` file is located.
    

**Note:** Deploy the application to the App Engine standard environment.

### View your application

1.  To launch and view the application in your browser, enter the following command:
    

```plaintext
gcloud app browse
```

Copied!

2.  Click on the link that is provided. Your application is deployed and you can read the default message in your browser.
    

Click **Check my progress** to verify the objective.

Deploy the application

## **Task 4. Deploy updates to your application**

*   Update your application code to change the default message of `Hello, World!` to `Welcome to this world!` and redeploy your application.
    

Click **Check my progress** to verify the objective.

Deploy updates to your application

* * *

## Solution of Lab

%[https://www.youtube.com/watch?v=F5RQOwdWL5s] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC112/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/App%20Engine%203%20Ways%20Challenge%20Lab/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/d275ade1-f9b2-48d8-8484-849c0b03e5b4.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/fb9e4a56-8973-461d-a896-70c5cf7c61ee.png align="center")