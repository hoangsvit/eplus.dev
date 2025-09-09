---
title: "Introduction to Google Chat Bots with Apps Script - GSP250"
seoTitle: "Introduction to Google Chat Bots with Apps Script - GSP250"
seoDescription: "Learn to create a Google Chat bot using Google Apps Script, configure settings, and test its functionality in this hands-on tutorial"
datePublished: Tue Sep 09 2025 09:09:58 GMT+0000 (Coordinated Universal Time)
cuid: cmfcbxy5o000002l2etv432u2
slug: introduction-to-google-chat-bots-with-apps-script-gsp250
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757408921035/5920ba3f-5a54-40b8-8940-aaeec1e7563d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757408950312/18de02de-2a25-47e8-90bc-b5a6a3fd33cc.png
tags: google-apps-script, gsp250, introduction-to-google-chat-bots-with-apps-script-gsp250, introduction-to-google-chat-bots-with-apps-script, google-chat-bots

---

## Overview

Google Chat bots provide easy-to-use access points to your organization's data and services. Users can converse with bots within a chat experience. One way to create a Google Chat bot is to use [Google Apps Script](https://developers.google.com/apps-script/). This also gives you easy access to other Google services like Drive, Gmail, Calendar, Docs, Sheets, and much more.

In this lab, you use Google Apps Script to create a simple Google Chat bot as a quick introduction to Google Chat bots.

### What you'll do

In this lab, you perform the following tasks:

* Create a chat app from a template with pre-populated event handlers.
    
* Configure and publish the Google Chat bot.
    

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
    student-00-be974ef61a8b@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    rKB8pPR8P6WV
    ```
    
    Copied!
    
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

## Task 1. Create a chat app from a template

To implement your bot, create a new Google Apps Script project using the Chat app template.

**Note:** Signing into Google Cloud console sets your project and credentials. Before you click the Google Apps Script editor link in Step 1, be sure you have signed into the Google Cloud console.

1. Click this [Google Apps Script homepage](https://script.google.com/home/start) link to open the Google Apps Script online editor.
    
2. Under **Google Workspace add-on starters**, click **Chat app** (Intermediate version).
    
3. Click **Untitled project** (the current name).
    
4. In the **Edit project name** dialog, rename the project to `Friendly Bot`, and then click **Rename**.
    

### Events in Google Chat

Most Apps Script bot interactions with Google Chat are event-driven. The interaction between the user, the bot, and Google Chat typically follows a sequence.

1. A user initiates an action, like adding a bot to a room, starting a direct message (DM) with a bot, or removing the bot from a room.
    
2. The action raises an event aimed at the bot in Google Chat.
    
3. Google Chat calls the corresponding event handler defined in the bot's script.
    

Google Chat raises four events that your Apps Script bot can listen for:

* `ADDED_TO_SPACE`: This event occurs when a human user adds a bot to a room or a DM. In Apps Script, you define an `onAddedToSpace()` function to handle this event.
    
* `REMOVED_FROM_SPACE`: This event occurs when a user removes the bot from a room or DM. This event does not post a response back to Google Chat. In Apps Script, you define an `onRemovedFromSpace()` function to handle this event.
    
* `MESSAGE`: This event occurs when a user messages the bot, either directly in a DM or as an @mention in a room. In Apps Script, you define an `onMessage()` function to respond to this event.
    

### Review the code for the `MESSAGE` event handler

The Chat App template pre-populates the code file containing the event handlers.

* Click on the `Code.gs` file to review the pre-populated event handlers.
    

Notice the event handlers for the `MESSAGE`, `ADDED_TO_SPACE` and `REMOVE_FROM_SPACE` events, which execute the specific functions previously mentioned to complete various tasks such as responding to user messages in Google Chat.

Create a chat app from a template

## Task 2. Publish and test the chat bot

Before you can run and test the bot, the Google Chat API must be enabled for your Google Cloud project, and your bot must be published.

In this task, you complete the various configuration steps to be able to publish the bot including configuring the OAuth consent screen, updating the Apps Script application to reference the appropriate Google Cloud project, and updating the Google Chat API configuration to publish the bot for testing.

### Configure the OAuth consent screen

1. In the Google Cloud console, click the **Navigation menu** () in the upper left, and navigate to **APIs & Services &gt; OAuth consent screen**.
    
2. Click **Get Started**.
    
3. For Project configuration page, for **App Information** configure the following, and then click **Next**:
    

| **Field** | **Value** |
| --- | --- |
| **App name** | Friendly Bot |
| **User support email** | Select the email ID `student-00-be974ef61a8b@qwiklabs.net` from the drop-down. This is also your **User Email** in the left panel of the lab instructions. |

4. For **Audience**, select **Internal** and click **Next**.
    
5. For **Contact Information**, provide the email address `student-00-be974ef61a8b@qwiklabs.net`, and then click **Next**.
    
6. Accept the policy, and click **Continue**. Then, click **Create**.
    

Click *Check my progress* to verify the objective.

Configure the user consent screen

### Identify the Google Cloud project number and update the Apps Script application to reference it

1. From the **Navigation menu** (), click **Cloud Overview &gt; Dashboard**.
    
2. In the dashboard, locate the **Project Info** section.
    
3. Record the **Project number** to use in the next step to configure your project.
    
4. Return to the **Apps Script** editor, and navigate to the **Project Settings** for the Friendly Bot project ().
    
5. Under **Google Cloud Platform (GCP) Project**, click **Change project**.
    
6. For **GCP Project number**, enter the project number that you copied earlier. Then, click **Set project**.
    

### Configure and publish the chat bot

1. In the Apps Script editor, get the Head Deployment ID for the test deployment by clicking on **Deploy &gt; Test Deployments** (top-right of the screen), and then clicking **Copy** next to Head Deployment ID.
    
2. In the Google Cloud console, navigate to **Navigation Menu** () **\&gt; APIs & Services &gt; Library**.
    
3. In the Library, search for `Google Chat API`, and select the API from the list of results.
    

The Google Chat API should already be enabled in this project. If it is not enabled, click **Enable**.

4. Click **Manage**, and then click the **Configuration** tab for the Google Chat API.
    
5. In the **Configuration** dialog, set the fields with the following values:
    

| **Field** | **Value** |
| --- | --- |
| App name | Friendly Bot |
| Avatar URL | [https://goo.gl/kv2ENA](https://goo.gl/kv2ENA) |
| Description | Apps Script lab bot |
| Functionality | Enable **Join spaces and group conversations** |
| Connection settings | Check **Apps Script**, and then paste the Head Deployment ID that you copied in step 1 into the **Deployment ID** box. |
| Visibility | `student-00-be974ef61a8b@qwiklabs.net` |

6. Click **Save**.
    
7. After the changes are saved, scroll to the top of the **Configuration** dialog to update the **App Status** to `LIVE – available to users`.
    

You may have to refresh the page to see the **App Status** field. If the value for **App Status** is already set to `LIVE – available to users`, you can leave that value, but be sure to save the page again in the next step.

8. Click **Save** again.
    

### Test the chat bot

You have made it to final section to test your bot in Google Chat by completing the following steps!

1. Click the [Google Chat](https://chat.google.com/) link to open Google Chat.
    
2. Select **Start a chat**.
    
3. Search for `Friendly bot`.
    
4. From the results, select the **Friendly Bot** (Apps Script lab bot) that you created to start a chat.
    

When the direct message thread opens, you should see a message from the bot thanking you for adding it to a DM:

`Thank you for adding me to a direct message, student XXXXX!`

This response is initiated by the function named `onAddedToSpace`, which responds to the specific event of the bot being added to a chat space.

5. Last, enter a message for the bot, such as "Hello bot!".
    

You should see a message from the bot repeating your message, such as:

`You said "Hello bot!"`

This response is initiated by the function named `onMessage`, which responds to the specific event of users direct messaging the bot.

---

## Solution of Lab

%[https://youtu.be/cx_PQjfUmQk]

### Task 1:

Open: [https://script.google.com/home/start](https://script.google.com/home/start)

```apache
Friendly Bot
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757408730181/4cdac23f-647e-439b-8131-cdc46f0c6063.png align="center")

### Task 2:

Open: [https://console.cloud.google.com/auth/overview/create](https://console.cloud.google.com/auth/overview/create)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757408745220/b0cbef78-340b-4e87-a318-9a44db50ce38.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757408783237/ab4b955d-a8cd-4d48-b6cb-8a21a2d9a524.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757408796092/bc6be372-a4b9-43ff-8aea-940627200b0e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757408844618/9586cee0-9714-41cf-b18e-83878cb77df9.png align="center")