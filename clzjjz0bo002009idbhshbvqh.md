---
title: "A Tour of Firebase - GSP1132 (Solution)"
seoTitle: "A Tour of Firebase - GSP1132"
seoDescription: "If you are new to cloud computing or looking for an overview of Google Cloud and Firebase, you are in the right place. Read on to learn about the specifics "
datePublished: Wed Aug 07 2024 07:53:51 GMT+0000 (Coordinated Universal Time)
cuid: clzjjz0bo002009idbhshbvqh
slug: a-tour-of-firebase-gsp1132-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723016519724/e0876279-f4e4-489c-b0b6-4b62dff7a96c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723017216708/9f128d8c-d546-4fc3-9fce-64692f4be9b9.png
tags: a-tour-of-firebase-gsp1132, gsp1132

---

## **Overview**

If you are new to cloud computing or looking for an overview of Google Cloud and Firebase, you are in the right place. Read on to learn about the specifics of this lab and areas that you will get hands-on practice with.

**What you'll learn**

In this lab, you will learn about the following:

* The lab platform, and how to identify key features of a lab environment
    
* How to access the Firebase Cloud console with specific credentials
    
* How to use the Firebase Cloud Navigation menu to identify types of Firebase services
    

**Prerequisites**

This is an *introductory-level* lab and the first lab you should take if you're unfamiliar with Firebase. If you are already experienced with Firebase Cloud console, consider taking one of the following labs:

* Getting Started with Firebase Web
    
* Getting started with Firebase Authentication
    
* Getting started with Cloud Firestore
    

If you decide to take one, be sure to **end this lab now**.

If you have a personal or corporate Google Cloud account or project, sign out of that account. If you stay logged in to your personal/corporate account and run the lab in the same browser, your credentials could get confused, resulting in getting logged out of the lab accidentally.

If you use ChromeOS, please run your lab using an Incognito window.

---

### **Task 1. Initialize the demo project**

The [Firebase](https://firebase.google.com/docs/build) suite of tools is linked to a Google Cloud project, so you will see a project identifier and project name in the Firebase information.

**Note:** Take the lab [A Tour of Google Cloud Hands-on Labs](https://www.cloudskillsboost.google/catalog_lab/1281) if you are not familiar with Google Cloud.

Firebase projects are accessed via the [Firebase console](https://console.firebase.google.com/). Take a moment to open the Firebase console in a new Incognito window.

**Note:** Use the provided Google Cloud Project username and password to login.

The first step to access a Firebase project is to select or create a project. Firebase provides a demo project for users to experience the environment.

**Note:** Use the demo project to explore Firebase. The demo project will require a few minutes to configure. Once available, proceed with the lab.

### **Task 2. Firebase console**

In the Firebase user interface, the project **Overview-&gt;Project**

settings menu option will display information about the project. The upper-left corner of the central pane contains a card labeled **Project info** that looks like this:

![Firebase Project Information](https://cdn.qwiklabs.com/qn0wVp8gLX5CcYe8wpve%2FhtUjE89HWdo797QHbGMP%2B0%3D align="left")

A Firebase Project has a *name*, *number*, and *ID*. These identifiers are frequently used when interacting with Google Cloud services. You are working with one project to get experience with a specific service or feature of Firebase.

From the project setting page, you will also see any apps that have been registered under the current project.

![Firebase platform selection](https://cdn.qwiklabs.com/SNcK7EJ72dL%2Fk7Q47%2FAsu26vm1DgRtBIguHBVZd28fk%3D align="left")

Firebase includes support for a number of different language runtimes including:

* iOS
    
* Android
    
* Web
    
* Unity
    
* Flutter
    

**Test your understanding**

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

An organizing entity for anything you build with FirebasePasswordFirebase projectUsernameCloud Storage bucket

**Submit**

The Firebase Blaze plan includes a Google Cloud project.TrueFalse

**Submit**

The Firebase Spark plan includes a Google Cloud project.FalseTrue

**Submit**

#### **Navigation menu and services**

![Firebase UI panel](https://cdn.qwiklabs.com/dNZQS9yNMAmXjH8vBmHgqkYlQLKdJKUv0KmGBU5cToM%3D align="left")

**Note:** The Firebase console title bar also contains the **Project Overview** icon, as well access to the Project shortcuts.

Clicking the *Navigation menu* icons provides quick access to Firebase's core services.

1. If only menu icons are visible, click the **\&gt;** icon.
    
2. Click **All products**, then scroll through the tool and service categories.
    

### **Task 3. Authentication**

[Firebase Authentication](https://firebase.google.com/docs/auth) provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.

**Test your understanding**

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

Which of the following is NOT a supported authentication provider for Firebase Authentication?FacebookTikTokEmail and passwordGoogle

**Submit**

Firebase only supports Google Cloud AuthenticationTrueFalse

**Submit**

### **Task 4. Hosting**

[Firebase Hosting](https://firebase.google.com/docs/hosting) is production-grade web content hosting for developers. With a single command, you can quickly deploy web apps and serve both static and dynamic content to a global CDN (content delivery network). You can also pair Firebase Hosting with Cloud Functions or Cloud Run to build and host microservices on Firebase.

Firebase Hosting can be used to deploy static and dynamic web content. It provides a global CDN distribution, automatic SSL certificates, and custom domain support.

**Test your understanding**

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

Which of the following is NOT a benefit of using Firebase Hosting?Global CDN distributionAutomatic SSL certificatesCustom domain supportKubernetes

**Submit**

Firebase Hosting can be used to deploy static and dynamic web content.TrueFalse

**Submit**

## **Task 5. Storage**

[Cloud Storage](https://firebase.google.com/docs/storage) for Firebase is a powerful, simple, and cost-effective object storage service built for Google scale. The Firebase SDKs for Cloud Storage add Google security to file uploads and downloads for your Firebase apps, regardless of network quality.

Firebase Storage is a scalable, durable, and highly available object storage service for storing user-generated content. It is a great way to store images, videos, audio files, and other types of files in the cloud.

**Test your understanding**

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

Which of the following is NOT a supported file type for Firebase Storage?JPEGPNGMOVGIF

**Submit**

Firebase Storage is a scalable, durable, and highly available object storage service for storing user-generated content.TrueFalse

**Submit**

### **Task 6. Cloud Firestore**

[Cloud Firestore](https://firebase.google.com/docs/firestore) is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud. Firebase Cloud Firestore is a NoSQL document database. This means your data is stored in documents organized in collections. Documents can contain a variety of data types, including strings, numbers, arrays, objects, and geopoints. Like Firebase Realtime Database, it keeps your data in sync across client apps through real time listeners and offers offline support for mobile and web so you can build responsive apps that work regardless of network latency or Internet connectivity. Cloud Firestore also offers seamless integration with other Firebase and Google Cloud products, including Cloud Functions.

Firebase Cloud Firestore provides eventual consistency by default. This means that your data may not be immediately available to all clients after it is written. However, you can use transactions to ensure your data is always consistent.

**Test your understanding**

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

Which of the following is NOT a benefit of using Firebase Cloud Firestore?Strong consistencyScalabilityDurabilityReal-time updates

**Submit**

Firebase Cloud Firestore is a NoSQL document database.TrueFalse

**Submit**

### **Task 7. Emulator Suite**

The [Emulator Suite](https://firebase.google.com/docs/emulator-suite) consists of Firebase service emulators built to accurately mimic the behavior of Firebase services. This means you can connect your app directly to these emulators to perform integration testing or QA without touching production data.

For example, you could connect your app to the Cloud Firestore emulator to safely read and write documents in testing. These writes may trigger functions in the Cloud Functions emulator. However your app will still continue to communicate with production Firebase services when emulators are not available or configured.

**Note:** Using emulator suites components is optional. When working locally this can increase developer velocity.

![Firebase Emulator suite.](https://cdn.qwiklabs.com/8gKNkwogMVPwAh4iiBIc6jg7lYtY9lPIIo%2BOvER46Ek%3D align="left")

**Test your understanding**

Answer the following multiple choice questions to reinforce your understanding of the concepts covered so far.

Which of the following is NOT a service that can be emulated with the Firebase emulator suite?Cloud StorageAuthenticationVertex AICloud Firestore

**Submit**

Firebase only supports Google Cloud AuthenticationTrueFalse

**Submit**

**End your lab**

When you have completed your lab, click **End Lab**. Your account and the resources you've used are removed from the lab platform.

You will be given an opportunity to rate the lab experience. Select the applicable number of stars, type a comment, and then click **Submit**.

The number of stars indicates the following:

* 1 star = Very dissatisfied
    
* 2 stars = Dissatisfied
    
* 3 stars = Neutral
    
* 4 stars = Satisfied
    
* 5 stars = Very satisfied
    

You can close the dialog box if you don't want to provide feedback.

For feedback, suggestions, or corrections, please use the **Support** tab.

---

### Solution of Lab

%[https://www.youtube.com/watch?v=PdTam1oTM8g&feature=youtu.be] 

Open link in incognito window [Firebase console](https://console.cloud.google.com/billing/01150A-B8F62B-47D999/reports?organizationId=433637338589)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723017067083/0faaa3b2-58e5-4d71-a6fc-028212e4f2d8.png align="center")

Recheck: [https://www.cloudskillsboost.google/games/5379](https://www.cloudskillsboost.google/games/5379)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723017111043/970dfee2-8d75-4845-bdf2-aa5d6811d226.png align="center")