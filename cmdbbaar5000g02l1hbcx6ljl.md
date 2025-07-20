---
title: "Google Workspace Admin: Managing Google Meet - GSP687"
seoTitle: "Google Workspace Admin: Managing Google Meet - GSP687"
seoDescription: "Manage Google Meet via Google Workspace Admin Console: create meetings, explore features, and configure access efficiently"
datePublished: Sun Jul 20 2025 06:44:24 GMT+0000 (Coordinated Universal Time)
cuid: cmdbbaar5000g02l1hbcx6ljl
slug: google-workspace-admin-managing-google-meet-gsp687
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752993391940/7d85918f-dc1f-40bf-a83d-fafbc7bc5c4c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752993845994/770809ec-cdac-4ac7-beee-616aa52eace6.png
tags: google, google-meet, google-workspace-admin, google-workspace-admin-managing-google-meet-gsp687, google-workspace-admin-managing-google-meet, gsp687, managing-google-meet

---

## Overview

In this lab, you learn how to use Google Meet to create a meeting and live stream, how to configure different Google Meet features, as well as how to use the Google Workspace Console to configure access to Google Meet.

### Objectives

In this lab, you use Google Meet to do the following:

* Create a meeting and live stream
    
* Explore Google Meet features
    
* Configure and test Google Meet features
    
* Configure and test Google Meet access
    

### Prerequisites

Familiarity with basic Google Workspace terminology helps maximize your learning.

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

When you are ready, click **Start Lab** in the upper left.

### Sign in to the Google Workspace Admin Console

To access the Google Workspace Admin Console, you must find your credentials and then sign in.

#### Find your lab's User Email and Password

To access the resources and console for this lab, locate the **User Email** and **Password** in the Lab Details panel. This panel is on the left or at the top, depending on the width of the browser window. Use these credentials to log in to the Google Workspace Admin Console.

If your lab requires other resource identifiers or connection-related information, they appear on this panel as well.

#### Sign in to the Admin Console

1. Click **Open Google Workspace Admin Console**.
    

***Tip:*** Open the tabs in separate windows, side-by-side.

**Note:** If you see the **Verify your account** dialog:

* Click **Next**.
    
* Click the prefilled user.
    
* Click **Use another account**.
    

2. On the Sign in page, log in using the **User Email** and **Password** details provided.
    
3. When prompted, click **I understand** and **ACCEPT TERMS OF SERVICE** to accept all terms and conditions.
    

After a few seconds, the *Admin Console* opens.

4. Right-click **VERIFY DOMAIN** in either the yellow box at the top or the red box in the *Domains* card, and select **Open link in new tab**.
    
    **Note:** To complete this step in a real-life scenario, you'd need to add an actual DNS record.
    
5. Click the new tab, called **Domain setup**, to complete the Google Workspace domain verification steps.
    
6. On the *Let's set up your domain* page, click **Get Started**.
    
7. Select the **My domain uses a different host** checkbox and then click **Continue**.
    
8. At the bottom of the *Add verification code* page, select the **Come back here and confirm once you have updated the code on your domain host** checkbox, and then click **Confirm**.
    
9. Wait until it says **Your domain is verified!** and then close the *Domain setup* tab.
    
    **Note:** Do not click **Activate Gmail**.
    
10. Return to the **Admin Console** tab and refresh the page.
    

## Task 1. Creating a meeting and live stream on Google Meet

This section covers 3 methods of creating a meeting with Google Meet. In the third method you also create a live stream.

### Method 1: Via the Google Meet app

1. Click **Applications** (
    
    ![Application icon](https://cdn.qwiklabs.com/WN2DB8EBcBZTwJK02wuxjJ5M5xq0h0xPDW9ARWUMhLk%3D align="left")
    
    ) in the upper right.
    
2. Scroll down and click **Meet**.
    
3. Click **New meeting** to view meeting options.
    
4. Close the **Google Meet** tab.
    

### Method 2: Via the browser address bar

1. Open a new tab and enter `meet.new` in the address bar to open Google Meet and start a meeting.
    
2. Click **Leave call** (
    
    ![call end icon](https://cdn.qwiklabs.com/kYleuLXP%2BwGDy2BHbQ8L7G6g5Mekic9vddapVaqfZoU%3D align="left")
    
    ) on the bottom menu bar to end the meeting.
    
3. Close the **Google Meet** tab.
    

### Method 3: Via the Calendar app

1. Open [Google Calendar](https://calendar.google.com/).
    
2. Double click anywhere on the calendar to create a new event.
    
3. Click **Add title** and enter `Test Meeting 1`.
    
4. Click **Add Google Meet video conferencing**.
    
5. Click **View conference details** (down arrow across from **Join with Google Meet**).
    
6. Click **Add live stream**. If the popup window **This will reset your settings** opens, click **Add live stream** again.
    
7. Click **Save**.
    

Click *Check my progress* to verify the objective.

Create a meeting on Google Meet

## Task 2. Exploring Google Meet features

Try out various features in Google Meet. You will use the Google Workspace Admin Console to configure them later in the lab.

1. Click **Test Meeting 1** on your calendar.
    
2. Click **Join with Google Meet**.
    
3. The camera is turned on by default. Click **Join now**.
    
4. From the bottom menu bar, click **More options** (
    
    ![more options icon](https://cdn.qwiklabs.com/2ufrDePg5inKfodUoT2Kib4oE7II7emYn%2BypCC85FjQ%3D align="left")
    
    ).
    
5. Click **Backgrounds and effects**. Note that Google Meet provides a variety of backgrounds to choose from and also the option to **Add your own personal background**.
    
6. Click the **X** symbol on the top right-hand corner to close the `Backgrounds` panel.
    
7. Click **More options**
    
    ![more options icon](https://cdn.qwiklabs.com/2ufrDePg5inKfodUoT2Kib4oE7II7emYn%2BypCC85FjQ%3D align="left")
    
    again. Note that there is also an option to **Manage recording**.
    
8. Click **Manage streaming**.
    
9. Click **Stream internally**.
    
10. Click **Start streaming** in the window that opens and then click **Start**.
    
11. Click **Meeting details** (the **i** in the bottom right menu bar).
    
12. Click **Copy streaming info**.
    
13. Open a new tab, paste the stream URL in the address bar and press enter on the keyboard.
    
14. Click **Start watching** to watch the live stream.
    
15. Click **Leave call** (
    
    ![call end icon](https://cdn.qwiklabs.com/kYleuLXP%2BwGDy2BHbQ8L7G6g5Mekic9vddapVaqfZoU%3D align="left")
    
    ) on the bottom menu bar to end the meeting.
    
16. Close the **Google Meet** tab.
    

## Task 3. Managing Google Meet features

In this section, you configure the features you have just explored using the Workspace Admin Console.

1. Switch to the **Admin console** tab.
    
2. On the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) click **Apps** &gt; **Google Workspace** &gt; **Google Meet**.
    
3. Expand and click the **Meet video settings** panel (click the **down arrow**).
    

### Turn off the recording function

1. Hover over **Recording** and click the **pencil icon** to the right.
    
2. Uncheck **Let people record their meetings**.
    
3. Click **SAVE**.
    

### Turn off the live stream function

1. Hover over **Stream** and click on the **pencil icon** to the right.
    
2. Uncheck **Let people stream their meetings**.
    
3. Click **SAVE**.
    

### Change the default video quality

1. Hover over **Default video quality** and click the **pencil icon** to the right.
    
2. Select **Audio only**.
    
3. Click **SAVE**.
    

### Prevent users from replacing the background of their video feeds

1. Hover over **Visual effects** and click the **pencil icon** to the right.
    
2. Uncheck **Users can replace their background with an image** option.
    
3. Click **SAVE**.
    

### Test Google Meet feature configuration

Now test your Google Meet feature configuration.

**Note:** Changes you make in the Admin console can take some time to propagate. You may need to wait and refresh the page.

1. Switch to the **Google Calendar** tab.
    
2. Double click anywhere on the calendar to create a new event.
    
3. Click **Add title** and enter `Test Meeting 2`.
    
4. Click **Add Google Meet video conferencing**.
    
5. Click **More options** (down arrow across from **Join with Google Meet**).
    

Note that the **Add live stream** option is no longer available.

The **Add live stream** option might still be present because changes take some time to propagate. However, an error will occur when you click on the option as a live stream cannot be added to the meeting.

6. Click **Save**.
    
7. Click **Test Meeting 2** on your calendar.
    
8. Click **Join with Google Meet**.
    

Note that the camera is now turned off by default.

9. Click **Join now**.
    
10. Click **More options** (
    
    ![more settings icon](https://cdn.qwiklabs.com/2ufrDePg5inKfodUoT2Kib4oE7II7emYn%2BypCC85FjQ%3D align="left")
    
    ).
    

Note that there is no longer a **Record meeting** option.

11. Click **Backgrounds and effects**.
    

Note that you no longer have a variety of backgrounds to choose from or the option to **Use image from disk**

12. Click **Leave call** (
    
    ![call end icon](https://cdn.qwiklabs.com/kYleuLXP%2BwGDy2BHbQ8L7G6g5Mekic9vddapVaqfZoU%3D align="left")
    
    ) on the bottom menu bar to end the meeting.
    
13. Close the **Google Meet** tab.
    

Click *Check my progress* to verify the objective.

Managing Google Meet Features

## Task 4. Managing Google Meet access

Your company has acquired a small business, and you are in charge of adding the new employees to the system. Until the acquisition is finalized, the employees will not need access to Google Meet.

In this final section of the lab, you will create a new organizational unit (OU) and disable access to Google Meet for all users in the OU.

### Create a child OU for Acquisitions

1. From the Admin console, navigate to **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **Directory** &gt; **Organizational units**.
    
2. Click **Create organizational unit** to create a new OU.
    
3. For **Name of organizational unit**, enter **Acquisitions**
    
4. Optional: For **Description**, enter **New team members from acquired companies**
    
5. Click **CREATE**.
    

### Turn off Google Meet service

1. Switch to the **Admin Console** tab.
    
2. On the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **Apps** &gt; **Google Workspace** &gt; **Google Meet**.
    
3. Click the **Service status** panel.
    
4. In the left panel, under **Google Workspace Labs**, click **Acquisitions**.
    
5. Select **OFF**.
    
6. Click **OVERRIDE**.
    
7. Click **TURN OFF SERVICE**.
    

Click *Check my progress* to verify the objective.

Managing Google Meet Access

## Task 5. Test Google Meet access configuration

To test your meeting access configuration, create a new user in the Acquisitions OU, log in as that user, and try to access Google Meet.

### Create a new user

1. Click the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **Directory** &gt; **Users**.
    
2. Click **Add new user**.
    
3. For **First name**, enter **Amanda**.
    
4. For **Last name**, enter **Willis**.
    
5. Click **Manage user's password, organizational unit, and profile photo**.
    
6. For **Organizational unit**, click the pencil icon.
    
7. Under **Google Workspace Labs**, click **Acquisitions**.
    
8. Click **Done**.
    
9. Click **ADD NEW USER**.
    

**Note:** Please keep a record of the new user's username and password for future use. They will be necessary in the next step.

### Test Google Meet access for non-acquisitions users

1. Open [Google Calendar](https://calendar.google.com/).
    
2. Double click anywhere on the calendar to create a new event.
    

Note the **Add Google Meet video conferencing** option is still available.

### Log in as a user in the Acquisitions OU

1. Click the Google avatar at the top right of the screen. (Notice that you are currently logged in as Workspace User.)
    
2. Click **Add another account**.
    
3. For **Email or phone**, enter the email of Amanda Willis that you recorded in an earlier section. It should be similar to `amanda@goog-test.reseller.gappslabs.co…`.
    
4. Click **Next**.
    
5. For **Enter your password**, enter the password of Amanda Willis that you previously noted and click **Next**.
    
6. Accept terms as prompted.
    
7. Create a secure password and click **Change password**.
    

### Testing Google Meet access for users in the Acquisitions OU

1. Double click anywhere on the calendar to create a new event.
    

Note the **Add Google Meet video conferencing** option is no longer available.

The **Add Google Meet video conferencing** option might still be present because changes take some time to propagate. Refresh the page and try steps 3 and 4 again!

2. Open [Google Meet](https://meet.google.com/).
    

Note that the **New meeting** option is still available.

3. Click the Google avatar at the top right of the screen.
    

You are currently logged in as the default account, Workspace User.

4. Select **Amanda Willis** from the list of accounts.
    
    Google Meet will open in a new tab logged in as **Amanda Willis**. Note that the **New meeting** option is no longer available.
    

---

## Solution of Lab

%[https://youtu.be/zQz0tQcmSTA]