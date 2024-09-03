---
title: "AppSheet to Google Chat using Webhooks from Automation Bots - GSP756"
seoTitle: "AppSheet to Google Chat using Webhooks from Automation Bots - GSP756"
seoDescription: "In this lab, you create a webhook and add the ability for your AppSheet app to connect to a Google Chat space. Connecting the two apps allows them to share"
datePublished: Tue Sep 03 2024 06:52:13 GMT+0000 (Coordinated Universal Time)
cuid: cm0m2nqzy000u0al51w1icy63
slug: appsheet-to-google-chat-using-webhooks-from-automation-bots-gsp756
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1725343658110/a18896a9-02fc-4326-9c57-df69beda6042.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1725349861914/4bb1458d-b016-454e-9785-3ccb07cb457c.jpeg
tags: appsheet-to-google-chat-using-webhooks-from-automation-bots-gsp756, gsp756

---

## **Overview**

In this lab, you create a webhook and add the ability for your AppSheet app to connect to a Google Chat space. Connecting the two apps allows them to share information using a web service.

## **AppSheet and webhooks**

A webhook is a mechanism for connecting two separate applications so they can share information using a web service. You connect an AppSheet app with external services to perform functions based on conditions in the app's data that are part of regular business operations. For instance, an AppSheet app can automatically send notifications to a Google Chat space. You use a webhook to connect them.

There are two general methodologies for configuring webhooks with AppSheet.

* **Bot** - You set up automation bots with webhooks to services like Google Chat. For instance, you can call a webhook from a bot in AppSheet, as described in "[Call a webhook from a bot](https://support.google.com/appsheet/answer/11511244)" and also explained in this lab.
    
* **API** - AppSheet also supports webhooks to the AppSheet REST API.
    

Another aspect of webhooks in AppSheet is that business operations can be divided into inbound and outbound activities.

* Inbound - when you want the AppSheet app to accept a request from an external app. For instance, a request for the current price on an item in inventory.
    
* Outbound - when you want the AppSheet app to send notification based on something that happened. For instance, notification to a chat space that an inventory item has fallen below the acceptable minimum.
    

In this lab, the focus is on bots and outbound activities. Using the AppSheet REST API and inbound activities are covered in a separate lab.

## **Objectives**

In this lab, you learn what webhooks are in Google Chat and how to configure and test them in AppsSheets. By the end of this lab, you'll be able to:

* Describe what is a webhook in AppSheet and its purpose.
    
* Configure a webhook to integrate your app with a Google Chat service.
    
* Test your webhook, sending a message when the item in a table is updated (any field) and a basic condition evaluates to true.
    

## **Scenario**

The scenario for this lab is that you work for an online retailer. You use an AppSheet app that tracks inventory items (price, total in stock, the acceptable minimum, etc). Your colleagues and perhaps even customers may need to be informed of the status on these items. You'll set up a webhook and configure what will happen for two possible status changes. One is sending a notification message to the chat space when inventory is low for an item in inventory. Another is sending a notification when an item slated to be shipped will no longer be shipped.

## **Prerequisites**

This lab is targeted to citizen developers or project team members without formal software development skills. It assumes some basic knowledge of Google Cloud and AppSheet. You can learn the fundamentals of Google Cloud and Google AppSheet on Google Cloud Skills Boost and other popular platforms.

## **Setup**

#### **Before you click the Start Lab button**

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long lab resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access AppSheet for the duration of the lab.

#### **What you need**

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    
* Time to complete the lab.
    

1. Make sure you are signed into Google Cloud Skills Boost using an **incognito window**.
    
2. When ready, click .
    
    A new panel will appear with the temporary credentials that you must use for this lab.
    
    If you need to pay for the lab, a pop-up will open for you to select your payment method.
    
3. Note your lab credentials. You will use them to sign in to AppSheet for this lab.
    
    **Note:** If you use other credentials, you will get **errors or incur charges**.
    
4. Click **Open AppSheet**.
    
5. Click to sign in with Google.
    
    ![Sign in with Google](https://cdn.qwiklabs.com/SWJGV6nuFRmGdggEe8wxbRL1fFczQ4uAJrtQXFiCkgk%3D align="left")
    
6. In the **Sign in with Google** dialog, enter the Username provided for the lab and click **Next**.
    
    **Note:** If you see other accounts listed, click **Use another account**, enter the credentials provided for this lab, then click **Next**.
    
7. Enter the password provided for this lab and click **Next**.
    
8. Click **I Understand** to accept the terms.
    
9. On the AppSheet consent page, click **Allow**. This allows AppSheet to access the Google Drive folders associated with your Google Cloud Skills Boost account.
    
    ![Sign in with Google - provide consent](https://cdn.qwiklabs.com/mhqdiitEUUnq6kwmhXJZAZpCZcnGCa%2BHhpNqVXkfogo%3D align="left")
    
10. You are now signed in to AppSheet.
    
    ![My apps - create a new app](https://cdn.qwiklabs.com/Ydjv0Aj1UeSsUTPfg%2F4YG8bzgRR1gi26%2FXD4dqqw90g%3D align="left")
    
    Click on the **X** in the top right corner of the **Tell us about you so we can make better recommendations** dialog to view the AppSheet MyApps page.
    
    The MyApps page is empty since you do not yet have any apps.
    

## **Task 1. Initialize the Inventory Manager AppSheet app**

In this task, you initialize an *Inventory Manager* app by copying it from a prebuilt AppSheet. This app will be used throughout the rest of the lab.

**Note:** If an Inventory Manager exists in your AppSheet environment already, you should delete it first to be certain this lab begins with a fresh copy. Remove the existing app by selecting "Delete" from the drop-down option menu (three vertical dots).

### Copy a template app to the AppSheet account for your lab

1. Enter the following link into a new tab of your browser:
    
    [https://www.appsheet.com/Template/AppDef?appName=Lab8-InventoryManager-3856613&copy=1](https://www.appsheet.com/Template/AppDef?appName=Lab8-InventoryManager-3856613&copy=1)
    
    Once loaded, you will make a copy of the sample *Inventory Manager* app to your lab AppSheet account.
    
2. In the left navigation menu, click **Copy app** ().
    
3. In the *Copy app* form, for **App name**, type **Inventory Manager**.
    
4. Leave the remaining settings as their defaults, click **Copy app**.
    
    It may take a minute for the new copy to be created.
    

Click *Check my progress* to verify the objective.

Initialize the Inventory Manager AppSheet app

**Check my progress**

## **Task 2. Establish the Google Chat space with webhook URL**

In this task, you create a Google Chat space and enable a webhook. By doing so, an external source (your AppSheet app) can send a message to the chat space when an event is triggered.

### Create a Google Chat space

1. In a separate browser tab, open [https://chat.google.com](https://chat.google.com/).
    
2. If prompted, use your lab-provided Google Cloud username and password to sign in.
    
3. Close any help dialogs.
    
4. Click **Create or find a space** in the **Spaces** section.
    
5. Select **Create a space**.
    
6. In the **Create a space** dialog, for **Space name**, type **AppSheet Notifications**.
    
7. Leave the remaining settings as their defaults.
    
8. Click **Create**.
    

**Note:** If you encounter an error while creating a space named "AppSheet Notifications", please use a unique name for the space.

### Configure a Google Chat space webhook

1. Select **Apps & integrations** from the *AppSheet Notifications* space drop-down menu.
    
2. Click **Add webhooks**.
    
3. In the **Incoming webhooks** dialog, for **Name**, type **AppSheet Notifications WH**.
    
4. Click **Save**.
    
5. Copy the webhook URL into the clipboard memory by clicking 3 dots next to the URL and click copy icon in the dialog.
    
    You will use this URL to configure a webhook task in the next step. Don't worry if you need to come back to copy it again later - you will see a reminder of where to find it.
    
6. Dismiss the dialog by clicking anywhere in the chat window.
    

## **Task 3. Plan the configuration for an automation in AppSheet**

An important part of the planning is gathering the configuration information required. You will likely consult other project team members for some of it. For instance, another team member may have created the endpoint (such as Google Chat space). In any case, you will need the webhook URL to complete your part of the project.

In earlier tasks, you set up two applications (AppSheet and Google Chat) which you want to communicate to each other. To utilize a webhook to connect AppSheet for outbound notifications, you can create an automation bot as illustrated in this diagram:

![automation](https://cdn.qwiklabs.com/ViHtuJF3ReIi0OcbBiKoNppvm7xcyvrHwLkV6KN6eAc%3D align="left")

In general, the bot includes the following:

| **Automation Component** | **Description** |
| --- | --- |
| Bot | The overall automation you want AppSheet to handle |
| Event | What has to happen in order to trigger the process to begin |
| Process | A set of one or more tasks and subtasks |
| Task | An activity that should be performed |

Fast forward to where you finished your planning. You already consulted with project team members to get the configuration information that you need to complete your part of the project. For the low inventory automation bot, more specific descriptions could look like the following:

| **Automation Component** | **Description** |
| --- | --- |
| Bot | Monitor activity for the inventory manager app. |
| Event | The condition when the item's data in the "Products" table was updated AND the item's current inventory is lower than the acceptable minimum. |
| Process | Execute the associated task(s) when the event is triggered. |
| Task | Send a low inventory chat message to the "AppSheet Notifications" chat space when the process dictates. |

Next, you build out the specifics of the automation bot.

## **Task 4. Configure an AppSheet bot for low inventory chat notifications**

In this task, you use the information you gathered. One way to diagram out the setup is the following:

![low-inventory-bot](https://cdn.qwiklabs.com/%2BmNCwDmPlXkC7zTyUyIB7VNaWW1%2FOwmbYuBs2XdLc8Y%3D align="left")

### Create an automation bot for low inventory

To run the automation process when an event occurs in your app, you need a bot.

1. Switch to the AppSheet UI Inventory Manager browser tab.
    
2. In the AppSheet editor, in the left navigation menu, click **Automation** () in the AppSheet editor.
    
3. Click **Create my first automation**.
    
4. In the **Add a new bot** dialog, click **Create a new bot**.
    
5. In the *Bots* pane, double click on `New Bot`, and rename it to **Low Inventory Bot**.
    

### Configure an automation event for product updates

You are now going to configure an event in your app that will trigger the process when the event occurs.

1. Click **Configure Event**.
    
2. Click **Create a new event**.
    
    In the **Settings** pane on the right configure the following:
    
3. For **Event name**, type **Low Inventory Event**
    
    Events can be triggered on a fixed schedule or based on a change in data in the app's tables. For ease of testing in this lab environment, you use Data Change.
    
4. In the **Data change type** field, check **Updates** only.
    
    This event will be triggered when a row in the table is updated through the app.
    
5. For the **Table** name that the event will observe, select **Products**.
    
6. To launch the **Expression Assistant**, click into the **Condition** field.
    
    The *Expression Assistant* form opens.
    
7. For **Condition for event Low Inventory (Yes/No)**, type:
    
    ```apache
    [Current Inventory]<[Minimum Acceptable Inventory]
    ```
    
    The event will be triggered whenever a row in the Products table is updated whose current inventory is less than the minimum acceptable inventory.
    
8. In the Expression Assistant, click **Save**.
    

### Create an automation process for low inventory

In AppSheet, a process is a set of steps that are executed in sequence.

1. Check that you’re still in the AppSheet editor **Automation** section.
    
2. Click the drop-down next to **Run this PROCESS**, and then click **Create new process**.
    
3. To enable the toggle, click **Link** ().
    
4. Once enabled, you will see a field next to **Run this PROCESS**. Rename the process to **Low Inventory Process**.
    
    ![Low Inventory Process](https://cdn.qwiklabs.com/AeHgbZvWsY%2B1SZYTEDkXevdxncpBI0CHTXXaVIMjgxk%3D align="left")
    
5. To add a step for the process, click **Add a step**.
    
6. Select **Create a new step**.
    
7. Click into **New step**.
    
8. For the name of the step, type **Report Low Inventory Step**
    

### Create an automation task to send a message to a Google Chat space

Webhook in AppSheet involves creating a task that is executed by your automation.

1. Check that you’re still in the AppSheet editor **Automation** section and the **Low Inventory Bot** is selected.
    
2. For **Run a task**, make sure that the **Custom task** is selected.
    
3. In the **Settings** pane on the right, enable the toggle by clicking on **Link** ().
    
4. For the task configuration, specify the following, and leave the remaining settings as their defaults:
    

**Note:** If *settings* pane disappear click on `Process` name to re-open.

| **Property** | **Value (enter or select)** |
| --- | --- |
| Task name | Report Low Inventory Task |
| Task category | Call a webhook |
| Table name | Products |
| Preset | Custom |
| Url | *For URL, enter the webhook URL that you copied from the chat space. You can find it again by choosing Manage Webhooks from the "AppSheet Notifications" drop-down menu*. It will look something like **https://chat.googleapis.com/v1/spaces/xxxyyyzzz** (where xxxyyyzzz will be a set of random characters) |
| HTTP Verb | Post |
| HTTP Content Type | JSON |
| Body | {"text": "&lt;&lt;\[Product Name\]&gt;&gt; is low on inventory (currently &lt;&lt;\[Current Inventory\]&gt;&gt; while minimum acceptable is &lt;&lt;\[Minimum Acceptable Inventory\]&gt;&gt;)."} |

This purpose of this task is to send (post) the message defined in the **Body** element that contains information about a product that is low on inventory.

AppSheet supports the use of &lt;&lt; and &gt;&gt; characters for variable substitution. These delimiting characters are used in the **Body** element to substitute the value of *Product Name* and *Current Inventory* columns in the text message.

Click **SAVE**.

Ignore any warnings that may be reported.

Now is a good time to review what you created. You now have an automation bot which will be triggered when

* the item in the Products table is updated (this is the event) **AND**
    
* the current inventory value is less than the minimum acceptable inventory (this is the condition).
    

The process you specified is to run a single task - to send a message to your Google Chat space indicating the product is low on inventory. It knows where to send the message because you configured a webhook pointing to the chat space.

The next task is to test your configuration to be sure that everything works as designed.

## **Task 5. Test the low inventory bot with the webhook to Google Chat**

In this task you test the automation you just configured by triggering a relevant event. Because you configured the *Low Inventory Bot* to trigger whenever there are "Updates Only" AND the inventory on that item is low, you want to test that specific scenario. One easy test is to make an update to the price on an inventory item that meets the condition. One such inventory item is the "Paper Towel Holder".

1. To reload the app definition, click **Sync** () in the app preview. If the app preview is not visible, refresh AppSheet in your browser.
    
    **Note:** If the app preview doesn't already show the Inventory Manager app, select it from the preview pane menu (three horizontal lines). To see the inventory, click the phone icon.
    
2. In the app preview, click **Products** to be sure you're looking at items in the Products table.
    
3. Click the **Paper Towel Holder** product to view its details. You might need to scroll the list of products.
    
4. To **Edit** the product details, click the pencil icon.
    
5. Update the product's **Price** in the app to any value.
    
6. Click **Next**.
    
7. Notice the current values of the item:
    
    | **Minimum Acceptable Inventory** | **Current Inventory** |
    | --- | --- |
    | 20 | 11 |
    
    Does the expression `[Current Inventory]<[Minimum Acceptable Inventory]` evaluate to true?
    
    Yes, because 11 is less than 20. Good, that means this update will trigger your automation bot.
    
8. Click **Save**.
    
    Wait a few seconds for the app to sync the update to the backend.
    
9. Navigate to the Google Chat space tab.
    
    A chat message from the AppSheet bot reports the product with low inventory.
    
    ```apache
    Paper Towel Holder is low on inventory (currently 11 while minimum acceptable is 20).
    ```
    
10. Notice that *Paper Towel Holder* had been low on inventory before you modified the price. In fact, you could have updated any product details of *Paper Towel Holder* and still got the low inventory message in your chat space. Why is that? Well, it was when the *Products* table was updated that your bot was triggered to fire off the message to your chat space. By design, you specified in your automation that you wanted to be notified that the current inventory value was less than the minimum inventory value *only when an update to the product data occurs*. If desired, you can design the bot differently.
    
11. Repeat the earlier testing steps making a change to the *Placemats* product this time.
    
    Did you see a message in the Google Chat space? Why or why not? Hint: did the product meet the condition that the inventory was low?
    

Click *Check my progress* to verify the objective.

Test the low inventory bot with the webhook to Google Chat

**Check my progress**

## **Task 6. Create a second automation for shipping cancellations**

The new bot will report whenever a shipping order (in the Shipping table) has been canceled. It will inform through the Google Chat space the number of items that were returned to inventory (the Products table).

![ship-cancel-bot](https://cdn.qwiklabs.com/9Hf1mSs70AulBe%2FYT0ZvZxPRDJu8RqnadIq4niKr98I%3D align="left")

Be careful to create *NEW* tasks, processes, and events and enter the appropriate information. It's easy to accidentally modify the existing configuration for the low inventory bot.

### Create an automation bot for shipping cancellations

To run the automation process when an event occurs in your app, you need a bot.

1. Select the **Inventory Manager - AppSheet** tab if not already on that tab.
    
2. In the AppSheet editor, in the left navigation menu, click **Automation** ().
    
3. In the **Bots** pane, click **Crete a new bot** ( `+` ).
    
4. In the **Add a new bot** dialog, click **Create a new bot**.
    
5. Under the **Bots** pane, double click on the `New Bot`, and rename it to **Shipping Cancellation Bot**.
    

### Configure an automation event when shipping is canceled

You are now going to configure an event in your app that will cause the process to run when the event is triggered.

1. Click **Configure Event**.
    
2. Click **Create a new event**.
    
    In the **Settings** pane on the right, configure the following:
    
3. For **Event name**, type **Shipping Cancellation Event**
    
4. In the **Data change type** field, check **Deletes** only.
    
    This event will be triggered when a row in the table is deleted through the app (that is, when an order is canceled).
    
5. For the **Table** name that the event will observe, select **Shipping**.
    
    The event will be triggered whenever a row in the *Shipping* table is deleted.
    
6. Notice that for this automation event you did not enter a condition. It's not always necessary. The important thing is to determine when you want notifications (the condition, if any) and where they should go (the webhook).
    

### Create an automation process for shipping cancellations

In AppSheet, a process is a set of steps that are executed in sequence.

1. Check that you’re still in the AppSheet editor **Automation** section.
    
2. Click the drop-down next to **Run this PROCESS**, and then click **Create new process**.
    
3. Enable the toggle by clicking **Link** ().
    
4. Once enabled, you will see a field next to **Run this PROCESS**. Rename the process to **Shipping Cancellation Process**.
    
    ![Shipping Cancellation Process](https://cdn.qwiklabs.com/GtYyRZpzC9jzBI7cfvmchgvvnGiz0uHsZCtcCr2jOXg%3D align="left")
    
5. To add a step for the process, click **Add a step**.
    
6. Select **Create a custom step**.
    
7. Click into **New step**.
    
8. For the name of the step, type **Report Shipping Canceled Step**
    

### Create an automation task to send a message to a Google Chat space

Webhook in AppSheet involves creating a task that is executed by your automation.

1. Check that you’re still in the AppSheet editor **Automation** section and **Shipping Cancellation Bot** is selected.
    
2. In **Automation** section, for **Run a task**, make sure **Custom task** is selected.
    
3. In the **Settings** pane on the right, enable the toggle by clicking **Link** ().
    
4. In the settings pane for the task, specify the following, and leave the remaining settings as their defaults:
    

**Note:** If *settings* pane disappear click on `Process` name to re-open.

| **Property** | **Value (enter or select)** |
| --- | --- |
| Task name | Report Shipping Canceled Task |
| Task category | Call a webhook |
| Table name | Shipping |
| Preset | Custom |
| Url | *For URL, enter the webhook URL for the chat space (you can find it again by choosing Manage Webhooks from the "AppSheet Notifications" drop-down menu)*. It will look something like https://chat.googleapis.com/v1/spaces/xxxyyyzzz |
| HTTP Verb | Post |
| HTTP Content Type | JSON |
| Body | {"text": "Shipping of &lt;&lt;\[Product ID\]&gt;&gt; was canceled. &lt;&lt;\[Quantity shipped\]&gt;&gt; will be returned to inventory."} |

This purpose of this task is to send (post) the message defined in the **Body** element that contains information about a product whose shipping request has been cancelled.

Click **SAVE**.

Review what you've created. You now have an automation bot which will be triggered when the item in the Shipping table is deleted (that is, the event). This time, you did not specify a condition. The process you specified is to run a single task - to send a message to your Google Chat space indicating the cancellation. It knows where to send the message because you configured a webhook pointing to the chat space.

The next task is to test your configuration to be sure that everything works as designed.

## **Task 7. Test the shipping cancellation bot with the webhook to Google Chat**

You test the automation you just configured by triggering a relevant event. Because you configured the *Shipping Cancellation Bot* to trigger whenever there are "Deletes", you want to test that specific scenario. This test is fairly straightforward as the event will be triggered in the case that you delete any shipping item in the Shipping table.

1. To reload the app definition, in the app preview, click **Sync** (). If the app preview is not visible, refresh AppSheet in your browser.
    
    **Note:** If the app preview doesn't already show the **Inventory** app, select it from the preview pane menu (three horizontal lines). You may also need to click the phone icon to see the table data.
    
2. Select the **Ship/Recv** table.
    
3. Click the *Paper Towel Holder* product to view its details.
    
4. Click to delete the item.
    
5. To confirm that you want to delete the shipping item, click **DELETE**.
    
    **Reminder:** you're deleting an item from the Shipping table, not the Products table.
    
6. Wait a few seconds for the app to sync the update to the backend.
    
7. Navigate to the Google Chat space.
    
    A chat message from the AppSheet bot reports the product shipping was canceled.
    
    ```apache
    Shipping of Paper Towel Holder was cancelled. 11 will be returned to inventory.
    ```
    
8. Navigate to the *Paper Towel Holder* item in the Products table.
    
9. Note the current values of the item:
    
    | **Minimum Acceptable Inventory** | **Current Inventory** |
    | --- | --- |
    | 20 | 22 |
    
    The AppSheet app updated the inventory in the products table to reflect the deletion of the shipping item. That behavior was designed into the app previously. You added additional value to the app by also sending this notification to the Google Chat space (through webhook).
    
10. Repeat the earlier steps, except this time on the *Placemats* product.
    
    Did you see a message in the Google Chat space? Think about why or why not. That is, were all the conditions met to trigger the automation?
    
11. Try modifying any other product's details to see what happens. This is your chance to play without fear of messing up anything.
    

Click *Check my progress* to verify the objective.

Test the shipping cancellation bot with the webhook to Google Chat

---

## Solution of Lab

%[https://www.youtube.com/watch?v=yYBUfzN2_JI] 

### Task 1. Initialize the Inventory Manager AppSheet app

1. Enter the following link into a new tab of your browser:
    
    [https://www.appsheet.com/Template/AppDef?appName=Lab8-InventoryManager-3856613&copy=1](https://www.appsheet.com/Template/AppDef?appName=Lab8-InventoryManager-3856613&copy=1)
    
    Once loaded, you will make a copy of the sample *Inventory Manager* app to your lab AppSheet account.
    
2. In the left navigation menu, click **Copy app** ().
    
3. In the *Copy app* form, for **App name**, type **Inventory Manager**.
    
4. Leave the remaining settings as their defaults, click **Copy app**.
    
    It may take a minute for the new copy to be created.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725344154061/9d9ec8d3-57e7-4876-8fa6-6c8247ea9dc8.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725344160624/c62f6caa-c186-4031-822e-619090eb9a99.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725344238542/6e40a065-7d4d-48c3-94a0-d8f2314d5031.png align="center")

### Task 2. Establish the Google Chat space with webhook URL

1. In a separate browser tab, open [https://chat.google.com](https://chat.google.com/).
    
2. If prompted, use your lab-provided Google Cloud username and password to sign in.
    
3. Close any help dialogs.
    
4. Click **Create or find a space** in the **Spaces** section.
    
5. Select **Create a space**.
    
6. In the **Create a space** dialog, for **Space name**, type **AppSheet Notifications**.
    
7. Leave the remaining settings as their defaults.
    
8. Click **Create**.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725344729965/7a67c34d-65af-4d92-b606-b84034b547fe.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725345017462/c357205e-85d0-474b-a04a-fbf2b2ea3770.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725344991476/fb437841-6a4e-4131-95c4-bd87a4b4c7a6.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725345090732/88e098a0-9004-41bb-ae2a-199340b31702.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725345169368/3a7a55d7-421e-457c-a074-b60efadf76ae.png align="center")

### Task 3. Plan the configuration for an automation in AppSheet

**Create an automation bot for low inventory**

To run the automation process when an event occurs in your app, you need a bot.

1. Switch to the AppSheet UI Inventory Manager browser tab.
    
2. In the AppSheet editor, in the left navigation menu, click **Automation** () in the AppSheet editor.
    
3. Click **Create my first automation**.
    
4. In the **Add a new bot** dialog, click **Create a new bot**.
    
5. In the *Bots* pane, double click on `New Bot`, and rename it to **Low Inventory Bot**.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725345395314/8e716510-7fbf-4597-9afa-ae9d03f5824a.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725345528462/4d3d0ef1-0519-49be-8195-55f51020df7f.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725345592157/01be3ff4-9944-44c5-8df9-f39a4a57b6af.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725345659531/1f5418de-909c-475e-afeb-3c2ee22bb89a.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725345757575/15311afe-5b9a-4a46-8141-6555a6dcede0.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725345711542/981bf975-0685-4e9f-8b39-e0a8bcc252b9.png align="center")

**Configure an automation event for product updates**

You are now going to configure an event in your app that will trigger the process when the event occurs.

1. Click **Configure Event**.
    
2. Click **Create a new event**.
    
    In the **Settings** pane on the right configure the following:
    
3. For **Event name**, type **Low Inventory Event**
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725345896913/4a50a78e-5119-4b0e-a047-a416de6e14d7.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725346081282/6ff62c1d-0002-4b4a-b9a2-5c7e6dddb9a2.png align="center")

**Create an automation task to send a message to a Google Chat space**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725346594888/e7087e16-01b3-4dd0-97d7-120eba4892dd.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725347697962/682404ab-ccac-442e-b8a4-1d1143304cee.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725347706363/d45cd188-4c2f-431a-9f07-0cabe46ba18d.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725347712025/dd4cb8bc-e3c7-4449-be06-d68204c08b03.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725347716265/e3c1143e-ac85-4f9b-ac50-b35eb0adec69.png align="center")