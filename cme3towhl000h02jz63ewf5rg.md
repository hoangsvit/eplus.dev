---
title: "Sending and Scheduling Looks in Looker -GSP1161"
seoTitle: "Sending and Scheduling Looks in Looker -GSP1161"
seoDescription: "Learn to send and schedule Looks in Looker, create visualizations, and set up regular distribution in this interactive Google Cloud lab"
datePublished: Sat Aug 09 2025 05:37:12 GMT+0000 (Coordinated Universal Time)
cuid: cme3towhl000h02jz63ewf5rg
slug: sending-and-scheduling-looks-in-looker-gsp1161
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754717189520/2f4ab39d-2e7c-4dae-b971-7d57e7a140d6.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1754717787860/e78a1628-6e8c-4343-bfc0-5e676c109da9.png
tags: looker-studio, sending-and-scheduling-looks-in-looker-gsp1161, sending-and-scheduling-looks-in-looker, gsp1161

---

## Overview

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

In this lab, you will learn the difference between sending and scheduling in Looker and how to send and schedule Looks.

### Objectives

In this lab, you will learn how to perform the following tasks:

* Create a new visualization from the Explore and save as a Look
    
* Prepare the Look for one-time distribution
    
* Schedule the Look for regular distribution
    

## Setup and requirements

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
    

## Task 1. Create a visualization on an Explore

In this task, create a new visualization from the "E-Commerce Training" Explore.

1. On the left-side navigation panel of the Looker User Interface, click **Explore**.
    
2. Under **E-Commerce Training**, click **Order Items**.
    
3. Under **Products** , click **Category**.
    
4. Under **Products**, click **Count**. Click the header of **Count** to sort it decending.
    
5. Set row limit to 10. Click **Run**.
    
6. Click the arrow next to Visualization to expand the window and review the visualization in column chart.
    

Click **Check my progress** to verify the objectives.

Assessment Completed!

Create a visualization on an Explore

*Assessment Completed!*

## Task 2. Save the visualization to a new Look

In this task, you will save the visualization from Task 1 to a new Look.

1. From the gear menu at the top-right portion of the screen, choose the **Save** &gt; **As a Look** menu option.
    
2. Title your new Look **“Count per category”**. Select **Developer Student** folder and then click **Save & View Look**.
    

Click **Check my progress** to verify the objectives.

Assessment Completed!

Save the visualization to a new Look

*Assessment Completed!*

## Task 3. Prepare the Look for one-time distribution

In this task, prepare the Look from Task 2 for one-time distribution.

1. You should still be working in the **“Count per category”** Look. If not, please browse to it.
    
2. While in this Look, from the gear menu at the top-right portion of the screen, select the **Send** menu option.
    
3. Configure your Look send using the following instructions:
    
    * Update the title to say **Count per category Look report one-time send**.
        
    * Choose ***Email*** for **Where should this data go?**.
        
    * Add [`manager@example.com`](mailto:manager@example.com) for **Who should it be emailed to?**.
        
    * Tick the **Include a custom message** checkbox and add the message `Here is the count per category data you requested.`
        
    * Select **Data Table** as the data format option.
        

At this point, you would click the **Send** button to share your Look one time, **but you will not do this here in the lab environment**.

## Task 4. Schedule the Look for regular distribution

In this task, schedule the Look from Task 2 for regular distribution.

1. Return to your **Count per category** Look if you are not there already.
    
2. From the gear menu at the top-right, select the **Schedule** menu option.
    
3. Configure your scheduled Look delivery using the following instructions:
    
    * Use the identical setup from Task 3, except change the title to **Count per category scheduled report**.
        
    * For Trigger, choose **Repeating Interval** to specify the frequency of Look sends.
        
    * In the Deliver this schedule section, choose the **Monthly** option.
        
        * Choose **At the start of every quarter** under Send.
            
        * Choose **1st of the month** at 9:00am (09:00)
            
    * To further customize how often this Look is sent, expand the **Advanced options** window, click the **and results changed since last run** checkbox to ensure this Look is only sent when changes to the Look data have occurred.
        

At this point, you would click the **Save All** button to save your new customized and delivery-scheduled Look, **but you will not do this here in the lab environment**.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=JcT4GfdCidk] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1754717717853/7fac4279-7cc5-4dc6-b1b5-a4004bdb9142.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1770447979350/cbdb8603-6516-49de-b6cf-c2f4a990c6e6.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1754717757033/79ca71a6-b339-4310-8c30-12269c2b5e7d.png align="center")