---
title: "Develop with Apps Script and AppSheet: Challenge Lab - ARC126"
seoTitle: "Develop with Apps Script and AppSheet: Challenge Lab - ARC126"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Tue Apr 15 2025 03:59:01 GMT+0000 (Coordinated Universal Time)
cuid: cm9hz3tvs001709kwfnvdhm5t
slug: develop-with-apps-script-and-appsheet-challenge-lab-arc126
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744688524835/bb3611ad-04b8-4f60-825c-2fb7eb0f521c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744689525307/67f8fa3f-1017-4da9-8626-bb594144e0a2.png
tags: develop-with-apps-script-and-appsheet-challenge-lab-arc126, develop-with-apps-script-and-appsheet-challenge-lab, arc126

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Challenge scenario

You are a junior cloud engineer tasked with helping teams create and manage Google Cloud resources. As part of your duties, you have been tasked with using AppSheet and App Scripts to create chat apps, which are web applications or services that run in Google Chat. Creating a chat app with AppSheet or App Scripts lets you interact directly with the app in Google Chat rather than opening it in a separate window.

Your first challenge is to use AppSheet to create a no-code application to report and manage automated teller machine (ATM) issues. You start by copying a simple maintenance app to use it as a template for adding functionality. You then add a chat component, so you can interact with the app directly in Google Chat.

Your second challenge is to use an App Scripts template to create a chat bot that is more customizable using event handlers.

You are expected to have the skills and knowledge to complete the tasks that follow.

### Your challenge

In this lab, you are asked to create two applications that run in Google chat:

1. No-code chat app using AppSheet
    
2. App Scripts app with event handlers
    

You need to:

* Create the apps based on templates.
    
* Customize the apps (such as adding some automation).
    
* Publish the bots.
    

## Task 1. Create and customize an AppSheet app

For this task, copy and customize an existing *ATM Maintenance* app, which technicians use to perform ATM maintenance. Be sure to deploy your app after you have customized it.

### Create the app

1. Open the [ATM Maintenance app](https://www.appsheet.com/template/AppDef?appName=ATMMaintenance-925818016) in AppSheet.
    
2. Set the following values, leaving all others at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | **App name** | ATM Maintenance Tracker |
    

### Customize the first message

* Set the following values, leaving all others at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | message text | Welcome to the ATM Maintenance Tracker app. What would you like to do today? |
    

### Create a slash command

* Set the following values, leaving all others at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | **App View** | Issues Reported By Me |
    | **Name** | /myissues |
    | **Description** | Lists tickets that include your email address |
    

**Click here for hint!**

Click *Check my progress* to verify the objective.

Create and customize an AppSheet app

**Check my progress**

## Task 2. Add an automation to an AppSheet app

For this task, create and test an automation added to the ATM Maintenance app.

1. In the **Settings** panel, provide the following information:
    

| **Event name** | **New ticket** |
| --- | --- |
| **Event type** | Adds only |
| **Table** | Tickets |

2. During the custom steps, in the **Message Text** box, type the message: *You have created a new ticket*.
    
3. At the top right of the page, click **Save** to update your app.
    
4. To test your automation, in the **First Name** box, type `Freeda` and provide information of your choosing for **ATM ID** and **Symptom**, respectively.
    

**Click here for hint!**

Click *Check my progress* to verify the objective.

Add an automation to an AppSheet app

**Check my progress**

## Task 3. Create and publish an Apps Script chat bot

1. Create a new [Apps Script Chat App](https://script.google.com/corp/home/start) project with the following details:
    

| **Property** | **Value** |
| --- | --- |
| **Project name** | Helper Bot |

2. Update the `MESSAGE` event handler to prompt logging of the event.
    
3. Use the following values to configure the Google Cloud project and update the script to use it.
    

| **Field** | **Value** |
| --- | --- |
| **App name** | Helper Bot |
| **User support email** | Select the email ID `student-04-a7859869e90a@qwiklabs.net` from the drop-down. This is also your **User Email** in the left panel of the lab instructions. |
| **Developer contact information** | `student-04-a7859869e90a@qwiklabs.net` |

4. Use the following values to publish the bot.
    

| **Field** | **Value** |
| --- | --- |
| App name | Helper Bot |
| Avatar URL | https://goo.gl/kv2ENA |
| Description | Helper chat bot |
| Functionality | Select **Receive 1:1 messages** and **Join spaces and group conversations** |
| Connection settings | Check **Apps Script project**, and then paste the Head Deployment ID for the test deployment into the Deployment ID field |
| Visibility | `student-04-a7859869e90a@qwiklabs.net` |
| App Status | LIVE – available to users |

### Test the bot

Search for **Helper Bot** in [Google Chat](https://mail.google.com/chat/u/0/#onboarding), and start a new chat.

**Click here for hint!**

Click *Check my progress* to verify the objective.

Create and publish an Apps Script chat bot

**Check my progress**

---

## Solution of Lab

%[https://youtu.be/0VQFSGyKC2U] 

### **📝 Task 1: Create and customize an AppSheet app**

1. **Log in** to [**AppSheet**](https://www.appsheet.com/Account/Login?utm_source=qwiklabs).
    
2. Access the [**ATM Maintenance App**](https://www.appsheet.com/template/AppDef?appName=ATMMaintenance-925818016) in **Incognito Mode**.
    
3. Use the left menu to select **Copy app**.
    
4. In the **Copy app** form, set the **App name** as:
    
    ```plaintext
    ATM Maintenance Tracker
    ```
    
    *Leave other settings as they are.*
    
5. Click the **Copy app** to proceed.
    

---

### **⚙️ Task 2: Add an automation to an AppSheet app**

1. Open **My Drive** from [**this link**](https://drive.google.com/drive/my-drive).
    
2. Download the required file [**here 📥**](https://github.com/ePlus-DEV/storage/blob/main/labs/ARC126/ARC126.xlsx).
    

---

### **🤖 Task 3: Creating and Publishing a Google Chat Bot with Apps Script**

1. Start a new **Apps Script Chat App** project from [**this link**](https://script.google.com/home/projects/create?template=hangoutsChat).
    
    | **Property** | **Value** |
    | --- | --- |
    | Project name | Helper Bot |
    
2. Replace the content in `Code.gs` with the following script:
    

```javascript
/**
 * Responds to a MESSAGE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onMessage(event) {
  var name = "";

  if (event.space.type == "DM") {
    name = "You";
  } else {
    name = event.user.displayName;
  }
  var message = name + " said \"" + event.message.text + "\"";

  return { "text": message };
}

/**
 * Responds to an ADDED_TO_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onAddToSpace(event) {
  var message = "";

  if (event.space.singleUserBotDm) {
    message = "Thank you for adding me to a DM, " + event.user.displayName + "!";
  } else {
    message = "Thank you for adding me to " +
        (event.space.displayName ? event.space.displayName : "this chat");
  }

  if (event.message) {
    message = message + " and you said: \"" + event.message.text + "\"";
  }
  console.log('Helper Bot added in ', event.space.name);
  return { "text": message };
}

/**
 * Responds to a REMOVED_FROM_SPACE event in Google Chat.
 *
 * @param {Object} event the event object from Google Chat
 */
function onRemoveFromSpace(event) {
  console.info("Bot removed from ",
      (event.space.name ? event.space.name : "this chat"));
}
```

---

### **🔧 Configuring OAuth Consent Screen**

1. Navigate to the **OAuth consent screen** using [**this link**](https://console.cloud.google.com/apis/credentials/consent).
    
2. Configure the settings as follows:

<table>
    <tr>
        <td>Field</td>
        <td>Value</td>
    </tr>
    <tr>
        <td>App name</td>
        <td>Helper Bot</td>
    </tr>
    <tr>
        <td>User support email</td>
        <td>*Your selected email*</td>
    </tr>
    <tr>
        <td>Developer contact</td>
        <td>*Your email address*</td>
    </tr>
</table>
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744689147140/89340208-68cf-44ae-b22b-68e92e32b900.png align="center")
    

---

### **🛠️ Setting Up Google Chat API**

1. Visit the **Google Chat API Configuration** page [**here**](https://console.cloud.google.com/apis/api/chat.googleapis.com/hangouts-chat).
    
2. Apply the following configuration:
    
    | **Field** | **Value** |
    | --- | --- |
    | App name | Helper Bot |
    | Avatar URL | [https://goo.gl/kv2ENA](https://goo.gl/kv2ENA) |
    | Description | Helper chat bot |
    | Functionality | ✅ Receive 1:1 messages and join spaces/group conversations |
    | Connection settings | ✅ Check **Apps Script project** and add **Head Deployment ID** |
    | Visibility | ✅ Specific people and groups: *Your email address* |
    | App Status | 🟢 LIVE – Available to users |
    

---

### **🧪 Testing Your Helper Bot**

You can test your newly created bot directly in Google Chat [**here**](https://mail.google.com/chat/u/0/#chat/home).