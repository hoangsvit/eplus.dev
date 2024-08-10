---
title: "Develop No-Code Chat Apps with AppSheet - GSP1146"
seoTitle: "Develop No-Code Chat Apps with AppSheet - GSP1146"
seoDescription: "This lab provides an introduction to creating no-code Chat apps. Chat apps are web applications or services that run in Google Chat. Creating a Chat app wit"
datePublished: Sat Aug 10 2024 10:11:10 GMT+0000 (Coordinated Universal Time)
cuid: clznz75xz000c08jv3nut1ckj
slug: develop-no-code-chat-apps-with-appsheet-gsp1146
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723283863425/7b89de2d-056c-4dec-9f08-fecffd940e96.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723284659198/83c38223-a02b-41b0-be13-49275579b8cc.png
tags: develop-no-code-chat-apps-with-appsheet-gsp1146, gsp1146

---

## **Overview**

This lab provides an introduction to creating no-code Chat apps. Chat apps are web applications or services that run in Google Chat. Creating a Chat app with AppSheet lets you interact directly with the app in Google Chat rather than opening it in a separate window.

In this lab, you use AppSheet to create a basic application to report and manage ATM issues. You start by copying a simple app that uses a spreadsheet as its data source. You then add a chat component so you can interact with the app directly in Google Chat.

### Scenario: Operations analyst at a bank

You’re an operations analyst at a bank working on a team with five ATM technicians. You are responsible for coordinating maintenance for several ATMs in the area. Historically, this process relied heavily on email and paper documents.

You have developed a no-code app using AppSheet to better manage ATM maintenance and technician dispatching. The ATM technicians often use Google Chat to communicate with each other. You would like to create a Chat component for your app, so they can easily use its core features without leaving Google Chat.

### **What you'll learn**

* Add a chat component to an existing AppSheet app
    
* Create slash commands
    
* Add automations to an app
    
* Use an app in Google Chat
    

### **Prerequisites (optional)**

It's recommended you complete the [Google AppSheet: Getting Started](https://www.cloudskillsboost.google/focuses/19039?parent=catalog) lab before this one. This can be followed up by taking the [Building No-Code Apps with AppSheet: Foundations](https://www.cloudskillsboost.google/course_templates/336) course either before or after this lab.

---

## **Task 1. Create your app**

When developing apps, it's common to incrementally add new features. In this task, you copy an existing *ATM Maintenance* app, and in the subsequent tasks you extend its functionality.

### Copy a template app to your AppSheet account

1. After you've logged into AppSheet, open the [ATM Maintenance app](https://www.appsheet.com/template/AppDef?appName=ATMMaintenance-925818016) in a new browser tab.
    
2. In the left navigation menu, click **Copy app** ().
    
3. In the **Copy app** form, for **App name**, type **ATM Maintenance Tracker**, and leave the remaining settings as their defaults.
    
4. Click **Copy app**.
    
    AppSheet creates the app and copies the spreadsheet that is used by the app to the `/appsheet/data/ATMMaintenanceTracker-nnnnnnn` folder within your My Drive folder in Google Drive.
    

Your app is set up with the original app's data source. Now you can keep building the app's functionality. You can also access the app from the **My apps** page in the AppSheet UI under **Apps**.

### Preview your app

The AppSheet editor has 3 main areas: the navigation bar, main panel, and app preview.

![copy](https://cdn.qwiklabs.com/7JAvqXvBIALd4g4ocuvr1MTYLDJIAd6f1YW%2F47TMYTI%3D align="left")

The app preview shows what the latest version of your app will look like on a phone oriented vertically.

1. In the app preview panel, scroll through the **New Ticket** form.
    
    The **New Ticket** form lets you create a new ticket that is automatically assigned to a technician according to the **Symptom** you select.
    
2. Click **Cancel** to navigate away from this view and explore the app further. Once you understand how the app functions overall, proceed to the next step.
    

### Open the Chat app builder

1. To open the Chat app builder, select **Chat apps** () in the left navigation menu.
    
2. Click **Create**.
    
3. In the **Enable** card, click **Next** to automatically configure your project.
    
    By default, Chat apps in AppSheet are created in the automatic configuration mode which provides you with a simple way to configure and publish your labs. To learn more about this one-click publishing flow, see [Configure Chat apps with AppSheet](https://support.google.com/appsheet/answer/12849362?hl=en#automatic-configuration).
    

**Note:** It may take a few minutes before the app is fully configured. Do not reload the page.

Click *Check my progress* to verify the objective.

Create the app.

**Check my progress**

## **Task 2. Customize your app**

When you add an app to a conversation or a space, the app sends an initial message. You can customize the Chat app menu, called a card, that is sent to a user when the app is installed or @mentioned. In this task, you customize the first message, add actions, and configure the Chat API in the Google Cloud console.

### Customize the first message

1. In the **Customize** card, click **First message** to expand the section.
    
    AppSheet automatically populates the message text and app views.
    
2. For message text, change the greeting to: **Welcome to the ATM Maintenance Tracker app. What do you want to do today?**
    
3. In the list of *Chat card menu*, click **My Tickets**, and then select **Issues Reported By Me** in the dropdown to change the chat card.
    
4. To remove the **Manage Techs** view, click **Delete** ().
    

**Note:** The *Unsupported app view selected* warning indicates that you cannot access that app view within Google Chat. The option will still appear in the Chat card menu, but selecting it will open the app in a new tab.

5. Click **Save** at the top of your AppSheet window.
    

### Create a slash command

1. In the **Actions** section, click **\+ New action**.
    
2. Select **Slash command: Open app view** from the list of options.
    
    Slash commands enable users to simply type "/" in the message line to reveal a list of functions offered by available bots. They make it much easier for you to discover and use the available Chat app features.
    
3. Select **Issues Reported By Me** from the **App View** dropdown.
    
4. Type **/myissues** for the **Name**.
    
5. In the **Description** field, type **Lists tickets that include your email address**.
    
6. Click **Next**.
    

Which of the following is NOT an option in the **Customize** section of the **Chat apps** editor?First messageSearchRepliesActions

**Submit**

## **Task 3. Publish your app**

In this task, you run a deployment check, resolve a warning, and publish your app.

### Perform a deployment check

1. In the **Test** card, click **Go to deployment settings** to open the **Deploy** tab in the AppSheet UI.
    
2. If the deployment check does not begin automatically, click **Run Deployment Check**.
    
    The output of the deployment check lists any errors or warnings that you should fix, before deploying the app.
    
3. Click **App description**.
    
    The section expands to provide more details on the warning.
    
4. Click **Continue editing** so you can address the **App description** warning before publishing your app.
    

### Fix the *App description* warning

1. In the left navigation menu, click **Settings** ().
    
2. In the **Information** tab, in the **App Properties** section, click the dropdown for **Function**.
    
3. Select **Maintenance** from the list of options.
    
4. Click the dropdown for **Industry** and select **Financial Services**.
    
5. Click **Save**.
    

### Deploy the app

1. In the left navigation menu, click **Manage** () to return to the **Deploy** options.
    
2. In the **Deployment Check** section, click **Run deployment check** to rerun the process.
    
    Notice the **App Description** has changed from *WARNING* to *PASSED*.
    
3. Click **Move app to deployed state**.
    

## **Task 4. Test your app**

Spaces in Google Chat are central places where people can share files, assign tasks, and stay connected. You can directly message an app or add it to spaces and conversations. In this task, you test your app in Google Chat by creating a space, adding your app to the space, and using the app.

### Add the app to a space

1. In a new incognito tab, open [Google Chat](https://chat.google.com/).
    
2. If a modal appears, click **Get Started**, and then click **X** to close the tutorial.
    
3. In the lower left pane, in Spaces, click **Create or find a space**, and then click **Create a space**.
    
4. Type a space name, and then click **Create.**
    
5. Click **View apps**, select the **ATM Maintenance Tracker** app from the list, and then click **Add**.
    

### Use the app in a space

1. To create a new ticket, click **Open in app** option next to All Tickets and then click **New Ticket**.
    
    A dialog will appear.
    
2. Enter any information that you like in the **First Name** and **Last Name** fields.
    
3. For **ATM ID**, type **ABC123**.
    
4. For **Email**, use the lab email address you used to log into AppSheet.
    
5. For the **Symptom** field, select **Card reader not working** from the dropdown.
    
6. Select the **N** (No) option for **Resolved**.
    
7. Leave the other fields as their defaults, and then click **Save**.
    
8. To view your updated ticket list, type **/myissues** in the reply area, and then click enter.
    

Click *Check my progress* to verify the objective.

Test the app.

**Check my progress**

## **Task 5. Build an automation**

Automations let you trigger events based on Chat app interactions like adding or removing a Chat app in a space. You can also send messages and app views to Chat spaces based on Chat interactions. In this task, you create an automation of your own.

### Create a custom event

1. Return to your AppSheet tab and select **Chat apps** () in the left navigation menu to open the Chat app builder.
    
    If you've exited the AppSheet tab, click [My apps](https://www.appsheet.com/home/apps), and select **ATM Maintenance Tracker** from the list.
    
2. Click the **Customize** card in the Chat app editor.
    
3. Click **\+ New action**, and then select **Build my own...**
    
    The automation page in the AppSheet editor will open in the same tab.
    
4. Click **Configure event**, and then click **Create a custom event**.
    
5. In the **Settings** panel, provide the following information:
    

| **Field** | **Value** |
| --- | --- |
| **Event name** | New ticket |
| **Data change type** | check only **Adds** |
| **Table** | Tickets |

### Create a custom step

1. In the main panel, click **\+ Add a step**, and then select **Create a custom step**.
    
2. Click **New step** to open the **Settings** for the custom step you just created.
    
3. In the **Settings** panel, click **Send a chat message**.
    
4. For **Message Content**, choose the **Select chat spaces** option.
    
5. For **Space ID(s)**, click **Add**, and then select the space you created in the previous task.
    
6. In the **Message Text** box, type the message: **You have created a new ticket**.
    
7. At the top right of the page, click **Save** to update your app.
    

### Test your automation

1. Navigate back to [Google Chat](https://chat.google.com/) and open the space in Google Chat that you created in the previous task.
    
2. Click **New Ticket** in the ATM Maintenance Tracker App.
    
3. In the **First Name** box, type **Freeda**.
    
4. Provide the information of your choosing for **ATM ID** and **Symptom**.
    
5. Click **Save**.
    
    Notice how the app sends a confirmation message.
    

Click *Check my progress* to verify the objective.

Build an automation.

**Check my progress**

### Delete your app

Now that you’ve successfully tested your app, you can delete it, marking the completion of the software development lifecycle.

1. In the left navigation menu, click **Manage** ().
    
2. Select **Collaborate & Publish** from the list of options.
    
3. Click **Delete App**.
    

---

### Solution of Lab

%[https://www.youtube.com/watch?v=bibIUK5Yfmo]