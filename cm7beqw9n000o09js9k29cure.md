---
title: "Creating Tile-based Dashboard Alerts in Looker - GSP1160"
seoTitle: "Creating Tile-based Dashboard Alerts in Looker - GSP1160"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Wed Feb 19 2025 04:23:03 GMT+0000 (Coordinated Universal Time)
cuid: cm7beqw9n000o09js9k29cure
slug: creating-tile-based-dashboard-alerts-in-looker-gsp1160
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747551303329/946024e6-fca3-4063-a955-911387f981ed.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747551310270/18ca226e-03d0-4bbf-a888-5233d484ac05.png
tags: creating-tile-based-dashboard-alerts-in-looker-gsp1160, creating-tile-based-dashboard-alerts-in-looker, gsp1160

---

## **Overview**

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

In this lab, you will learn how to use Looker to create alerts from a dashboard. With alerts, you can specify conditions in your data that, when met or exceeded, trigger a notification to be sent to specific recipients at a desired frequency.

### Objectives

In this lab, you will learn how to create a tile-based dashboard alert in Looker.

* Use the Explore interface to create a visualization.
    
* Save a visualization to a new dashboard.
    
* Create a tile-based dashboard alert.
    
* Modify a time-based dashboard alert.
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to Looker

1. When ready, click .
    
    A new panel will appear with the temporary credentials that you must use for this lab.
    
    If you need to pay for the lab, a pop-up will open for you to select your payment method.
    
2. Note your lab credentials in the left pane. You will use them to sign in to the Looker instance for this lab.
    
    **Note:** If you use other credentials, you will get **errors or incur charges**.
    
3. Click **Open Looker**.
    
4. Enter the provided Username and Password in the Email and Password fields.
    
    **Important:** You must use the credentials from the Connection Details panel on this page. Do not use your Google Cloud Skills Boost credentials. If you have your own Looker account, do not use it for this lab.
    
5. Click **Log In**.
    
    After a successful login, you will see the Looker instance for this lab.
    

## **Task 1. Create a visualization on an Explore**

In this task, you will create a table visualization on "E-Commerce Training" Explore.

1. On the left-side navigation panel of the Looker User Interface, click **Explore**.
    
2. Under **E-Commerce Training**, click **Events**.
    
3. Under **Users** , click **City**. Click the filter icon on **City** to filter the field to `is not null`.
    

![Filter icon](https://cdn.qwiklabs.com/Lu1v4xBX2z7w8znO7EgEVrlbCPqQ1I%2B6j5xT243AUmk%3D align="left")

4. Under **Events**, click **Count**. Click the header of **Events Count** to sort it decending.
    

![decending](https://cdn.qwiklabs.com/KexUeKGBdNYMrPfWkAeKozB4v2uoRmH%2ByKF%2B4wpPe9U%3D align="left")

5. Set row limit to 10. Click **Run**.
    
6. Click the arrow next to Visualization to expand the window and click **Table** visualization.
    

![viz1](https://cdn.qwiklabs.com/puIXAOPjGckcOv%2BIjZGsyIAlRzWvSfgcc4vokn9ESM4%3D align="left")

Click **Check my progress** to verify the objectives.

Create a visualization on an Explore

Check my progress

## **Task 2. Save the visualization to a new dashboard**

In this task, you will save the visualization from Task 1 to a new dashboard.

1. From the gear menu at the top-right portion of the screen, choose the **Save** &gt; **As a new dashboard** menu option.
    
2. Title your new Dashboard **“Events count per User City”**. Select **Developer Student** folder and then click **Save**.
    
3. Back on the Explore interface, click **View Dashboard**.
    

Click **Check my progress** to verify the objectives.

Save the visualization to a new dashboard

Check my progress

## **Task 3. Create a new tile-based dashboard alert with a monthly frequency**

In this task, you will configure a new tile-based dashboard alert that triggers monthly.

1. From the last step in Task 2, you are in the editing mode of the dashboard. Click **Cancel** at the top-right portion of the screen to exit editing mode.
    
2. Hover over the dashboard tile to reveal the bell icon
    
    ![bell](https://cdn.qwiklabs.com/N%2F2%2FrT%2BzyFfvaX2n2Mzl0n2s2nD7O4XN8Yq%2FY0pMWmQ%3D align="left")
    
    .
    
3. Click the bell icon to open the alert creation window.
    
4. At the top of the alert creation window, name the alert **“High events count alert”**.
    
5. In the **Condition** drop-down menus, set the components in sequence as
    
    * “Any Events”
        
    * “is greater than”
        
    * “1000”.
        

* This tells Looker how to check the tile data, and if any events is greater than 1000 it will trigger an alert notification.
    

6. Select **Email** from the **Where to send it** drop-down menu. You can designate the recipients of the alert email notification. Your email will be listed by default. Remove that and add [manager@example.com](mailto:manager@example.com) instead.
    
7. Under the **Frequency** drop-down menu, set the frequency to be
    
    * “Monthly”
        
    * “1st”
        
    * “05:00”
        

* This tells Looker how often to check your data for changes (and to send an alert notification if the alert conditions are met).
    

**Note:** The time clock used here employs 24 hour time, not AM/PM time notation.

8. Set your alert’s permissions by selecting the **“Public: visible to everyone in your organization”** option from the **Permissions** drop-down menu in the alert creation window.
    
9. Click the **Save Alert** button.
    

Click **Check my progress** to verify the objectives.

Create a new tile-based dashboard alert

Check my progress

## **Task 4. Modify an existing tile-based dashboard alert**

In this task, modify an existing tile-based dashboard alert.

1. Please start from your new **“High events count alert”** tile-based dashboard alert on the same dashboard in Looker.
    
2. Hover over the dashboard tile to reveal the bell icon.
    
3. Click the bell icon to see the list of alerts on the dashboard.
    

**Note:** You can choose to follow or unfollow any time-based dashboard alert to which you have access.

4. Click on the vertical three-dot menu, and then select the **Edit Alert** menu option.
    
5. Under the **Frequency** section of the alert creation window, change the frequency to be **“Minutes”**. The default setting is to check the data every 15 minutes.
    
6. Set the **Start** time to be **08:00**, and the **End time** to be **17:00**.
    

**Note:** The time clock used here employs 24 hour time, not AM/PM time notation.

**Note:** Start and End times are inclusive.

7. Click the **Save Alert** button.
    

---

## Solution of Lab

### New solution

%[https://youtu.be/vwf2d2kSDnY] 

---

### **Old solution**

%[https://www.youtube.com/watch?v=YWMktpCSCKY&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1747551290539/65854309-32f5-4210-b449-7b78a5bb0301.png align="center")