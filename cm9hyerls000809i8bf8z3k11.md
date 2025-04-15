---
title: "Google Apps Script: Access Google Sheets, Maps & Gmail in 4 Lines of Code - GSP235"
seoTitle: "Google Apps Script: Access Google Sheets, Maps & Gmail in 4 Lines of C"
seoDescription: "In this lab, you are introduced to one of the easiest ways to write code that accesses Google developer technologies, all by leveraging one of the mainstrea"
datePublished: Tue Apr 15 2025 03:39:32 GMT+0000 (Coordinated Universal Time)
cuid: cm9hyerls000809i8bf8z3k11
slug: google-apps-script-access-google-sheets-maps-and-gmail-in-4-lines-of-code-gsp235
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744687888916/46536094-5779-4171-97a3-e819f70679bc.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744688355619/dafa37a7-a661-4024-a7e1-b302dca6c7eb.png
tags: google-apps-script-access-google-sheets-maps-and-gmail-in-4-lines-of-code-gsp235, google-apps-script-access-google-sheets-maps-and-gmail-in-4-lines-of-code, gsp235

---

## Overview

In this lab, you are introduced to one of the easiest ways to write code that accesses Google developer technologies, all by leveraging one of the mainstream web development languages, JavaScript. Using Google Apps Script, you write code to extract an address sitting in a cell in a Google Sheet, generate a Google Map based on that address, and send a link to the map to yourself or a friend using Gmail. The best part? It really takes only 4 lines of code!

### Objectives

* Learn a bit about Apps Script... enough to get you going
    
* Create a new Google Sheets spreadsheet
    
* Learn how to enter the script editor for any document
    
* Edit Apps Script code, save, and run it
    
* Use Gmail to see the fruits of your labor!
    

### Suggested experience

The following experience would enhance your learning experience:

* Basic JavaScript skills (helpful but not required)
    
* Basic spreadsheet skills
    

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### Start your lab

1. When you are ready, click **Start Lab**.
    
    The Lab Details pane appears with the temporary credentials that you must use to sign into Gmail for this lab.
    
    If you need to pay for the lab, a pop-up opens for you to select your payment method.
    
2. Click **Open Google Sheets**.
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Open the tabs in separate windows, side-by-side.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog:
    
    ```apache
    student-04-377f95f91e60@qwiklabs.net
    ```
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog:
    
    ```apache
    Xo5PY0FuLHuE
    ```
    
6. Click **Next**.
    
7. Accept all terms and conditions as prompted.
    

Google Sheets opens and you are signed in to your Student Google Account.

## What is Google Apps Script?

[Google Apps Script](http://developers.google.com/apps-script) has a development environment that may be different from what you're used to. With Apps Script, you:

* Develop in a browser-based code editor but can choose to develop locally if using [clasp](http://developers.google.com/apps-script/guides/clasp), the command-line deployment tool for Apps Script
    
* Code in a specialized version of JavaScript customized to access Workspace, and other Google or external services (URLfetch, JDBC, etc.)
    
* Safely ignore writing authorization code because Apps Script handles it for you
    
* Do not host your app—it lives and runs on Google servers in the cloud.
    

**Note:** Teaching you Apps Script is outside of the scope of this lab. There are plenty of online resources. The official documentation features an [overview with quickstarts](http://developers.google.com/apps-script/overview), [tutorials](http://developers.google.com/apps-script/articles/tutorials), as well as [videos](https://developers.google.com/apps-script/guides/videos). This lab introduces you to the Apps Script development environment so you're comfortable creating code and get you thinking about the types of applications you can build with it.

Apps Script applications come in one of two forms:

1. [Bound](http://developers.google.com/apps-script/guides/bound)—meaning it's forever, and only tied to one Google document (Doc, Sheet, Slide, Site, or Form)
    
2. [Standalone](https://developers.google.com/apps-script/guides/standalone)—an independent script not bound to Google Sheets, Docs, Slides or Forms file, or Google Sites.
    

Bound and Standalone apps can also be published to expose more broadly:

* Not published—remains private, accessible only to project owners
    
* [Published as an add-on](https://developers.google.com/apps-script/add-ons/publish)—your app can be installed from the add-on store
    
* [Published as web app](https://developers.google.com/apps-script/execution_web_apps)—your app handles HTTP requests and has web UI components
    
* [Embedded in Google Sites](https://developers.google.com/apps-script/guides/web#embedding_your_web_app_in_google_sites)—published web apps can be embedded in either the new Sites or classic Sites pages
    
* [Published as an API executable](http://developers.google.com/apps-script/guides/rest/api)—your app can be accessed through the Execution API
    
* Some valid combination of the above
    

Your first Apps Script app should be **bound** to a Google Sheet. Time to create a new spreadsheet!

## Task 1. Create a new Google Sheet and enter a street address

Enter a street address in a new Google Sheet by following these instructions:

1. To create a new sheet, open [Google Sheets](http://sheets.google.com/create).
    
2. On the blank spreadsheet, click into the first cell in the upper left-hand corner (A1). It should be in column A and row 1.
    
3. Enter an address in that cell, - pick any worldwide valid street address with a targeted location such as postal code or city and state/province, for example 76 9th Ave, New York.
    

That's all you have to do in the Sheet. Now you're ready to enter the editor and write some code!

Click **Check my progress** to verify that you've performed the above task.

Create a new Google Sheet and enter a street address

**Check my progress**

## Task 2. Open Apps Script

Apps Script provides a code editor you use to create the Sheets bound script.

* From the top menu bar, select **Extensions &gt; Apps Script**.
    

Apps Script opens. Notice the code editor window on the right:

![Apps Script project page displaying Code.gs in the code editor](https://cdn.qwiklabs.com/KI704H5x4OHwzgnBgRnFW%2FLnKuRVqrYH6N7473YKiEU%3D align="left")

A default function named `myFunction()` is automatically created for you, and in the editor. That's it... you're now ready to write your application.

## Task 3. Edit the (template) code

1. The file `Code.gs` provides "template" code and doesn't do much. Copy the code below and paste it in the editor window to replace the template code. Then update `<YOUR_EMAIL>` with lab provided user email:
    

```apache
function sendMap() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var address = sheet.getRange("A1").getValue();
    var map = Maps.newStaticMap().addMarker(address);
    GmailApp.sendEmail("<YOUR_EMAIL>", "Map", 'See below.', {attachments:[map]});
}
```

2. To restrict this app to access only the Sheet you're working with (as opposed to all of a user's Sheets), add this annotation as a file-level comment for the peace of mind of your users:
    

```javascript
/**
* @OnlyCurrentDoc
*/
```

You did it. Not counting the [optional annotation](https://developers.google.com/apps-script/guides/services/authorization#manual_authorization_scopes_for_sheets_docs_and_forms), you just created `sendMap()`, a 4 line app.

Remember to replace `<YOUR_EMAIL>` with the user email provided by this lab so you can check for email messages during this lab.

Did you notice when you replaced the code in the editor, a red circle showed up to the left of the file name?

![A red circle to the left of a file name in the UI](https://cdn.qwiklabs.com/JRgIAXcM5R%2B5FYF8ALIgbX3uC%2BSo8y9yj%2FMBttt6%2FeU%3D align="left")

That means you've edited the file which now needs to be saved. You'll see it every time you have an unsaved edit.

3. Save and name your project, call it anything you like—for example, "Hello Maps!". Save the file by clicking the **Save project** icon.
    

![The Save project icon in the code editor menu bar](https://cdn.qwiklabs.com/laFjIf0RPeeapR0R1CfN8jSRQ3Jh5J5iRWV6bBLba9Q%3D align="left")

Alternatively, you can CTRL+S (PCs, Linux) or Command+S (Mac). You must name your project before you can proceed.

## Task 4. Run the Google Sheets, Maps, and Gmail app

To run the app you created:

1. Since the function was renamed to `sendMap()`, select the function to run as **sendMap**:
    

![Code Editor menu bar displaying sendMap as the function to run](https://cdn.qwiklabs.com/bo6se5mY6PGWzEBD%2BFp4ep1oxuKC%2BJIynBCa%2BIE%2F21o%3D align="left")

2. Click **Run** in the Code Editor menu bar to run the `sendMap()` function.
    

Apps Script manages the authorization code, so you don't have to write it. App users, however, still need to grant permission to the script to access your Sheet and be able to send email through Gmail on your behalf. The first auth dialog looks like this:

![Authorization dialog](https://cdn.qwiklabs.com/uG6vXX2AOCVpzfC6z5zVDhMrRhW461E8XycmoJnuP5E%3D align="left")

3. Click **Review Permissions**.
    
4. If prompted, choose your account (your **Username** found in the **Lab Details** panel of the lab).
    

![The student account highlighted in the Choose an account from qwiklabs.net dialog](https://cdn.qwiklabs.com/jsmb9iXwHnrEKiB1%2BhpOEopqXpk%2FQ6zRYPqNS%2BXjtx8%3D align="left")

5. In the next dialog asking if your app can access your Google Account, click **Allow**.
    

After you grant permission, the script runs to completion.

6. Hover over to the left side and click on **Executions** to see `sendMap` listed. Click **View Dashboard** if prompted.
    

![Executions page listing the deployed sendMap funcion](https://cdn.qwiklabs.com/UbyP8215P4QlW8ERJTsbFmPRg5PTi%2FGSIeyBBq9CXcQ%3D align="left")

7. Click the **Open Gmail** button shown on the left side lab panel.
    
8. In the **Choose and account** dialog, enter your student username and click **Next**.
    
9. Enter the lab provided Password and click **Next**.
    
10. Click **Accept** to accept the terms.
    

You should now be in Gmail, looking at your Inbox. You should find a message with Subject "Map" and a message body that looks like this:

![Email message sent by the script, the subject is "Map" and the message body has a map.](https://cdn.qwiklabs.com/uxFur3XbqfWnVHoVqH8fTtB3wyG%2B%2F0G3APBL0DmAZRI%3D align="left")

Click **Check my progress** to verify that you've performed the above task.

Run the Google Sheets, Maps, and Gmail app

**Check my progress**

Just think about it... four lines of code that access three different Google products in a meaningful way, even though it's not a complete application by itself. Even if you're unfamiliar with JavaScript or Apps Script, the code should be readable enough to give you a rough idea how it works, and perhaps what Apps Script can accomplish for you.

## Task 5. The App - a detailed explanation

This section reviews the code in more detail.

Since this application is short, there's no overall code structure to discuss. Instead,this section reviews each line of this app, which touches three different Google products!

This is a normal JavaScript function declaration for `sendMap()`:

```apache
function sendMap() {
```

The first line of code calls the [Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet/) accessible from Apps Script via the [SpreadsheetApp object](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app). The returned sheet is assigned to a variable of the same name.

The [getActiveSheet()](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app#getActiveSheet\(\)) method does exactly what it says it does—it returns a "handle" to the current sheet that is active in the user interface (UI):

```apache
var sheet = SpreadsheetApp.getActiveSheet();
```

With the `sheet` object, reference the cell range (of a single cell) in [A1 notation](https://developers.google.com/sheets/api/guides/concepts#a1_notation) with [getRange()](https://developers.google.com/apps-script/reference/spreadsheet/sheet#getRange\(String\)). A "range" is a group of cells, including just a single one like yours... cell `A1`, the one you entered the address in.

Now fetch what's *inside* that range of cells with the [getValue()](https://developers.google.com/apps-script/reference/spreadsheet/range#getValue\(\)) call, and assigned it to the address variable upon return. Try adding more addresses and reading from different cells.

```apache
var address = sheet.getRange("A1").getValue();
```

The 3rd line connects to the Google [Maps Service](https://developers.google.com/apps-script/reference/maps/) via the [Maps object](https://developers.google.com/apps-script/reference/maps/maps). As soon as you have access to the Maps Service, request that a new static map be created via [newStaticMap()](https://developers.google.com/apps-script/reference/maps/maps#newStaticMap\(\)).

You can then put a "pin" dropped onto the address you pulled from the Sheet by using the [addMarker()](https://developers.google.com/apps-script/reference/maps/static-map#addMarker\(String\)) method:

```apache
var map = Maps.newStaticMap().addMarker(address);
```

The last line uses the [Mail Service](https://developers.google.com/apps-script/reference/mail/) (via the [GmailApp object](https://developers.google.com/apps-script/reference/gmail/gmail-app)), calling its [sendEmail()](https://developers.google.com/apps-script/reference/mail/mail-app#sendEmail\(Object\)) method, to send the email which includes both the text "See below." and the map image as an attachment:

```apache
GmailApp.sendEmail("friend@example.com", "Map", 'See below.', {attachments:[map]});}
```

---

## Solution of Lab

%[https://youtu.be/FInwHT5u3lA] 

* **1\. 🚨On the blank spreadsheet, click into the first cell in the upper left-hand corner (A1). It should be in column A and row 1**:
    

```apache
28 Snowbird Lane, Wasilla,ak, 99683  United States
```

* **2\. 🚨From the top menu bar, select Extensions &gt; Apps Script.**
    
* **3🚨The file** [`Code.gs`](http://Code.gs) provides `"template"` code and doesn't do much. Copy the code below and paste it in the editor window to replace the template code. Then update `<YOUR_EMAIL>` with lab provided user email:
    

```apache
function sendMap() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var address = sheet.getRange("A1").getValue();
    var map = Maps.newStaticMap().addMarker(address);
    GmailApp.sendEmail("<YOUR_EMAIL>", "Map", 'See below.', {attachments:[map]});
}
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744688152686/455df2a8-d661-4da6-8b28-cc70e0409fbc.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744688159534/8a8e522c-c9c9-4754-a2ab-3ffe1d9a1f9c.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744688265408/d1272571-a271-433e-a8ef-936fe7a30ce0.png align="center")