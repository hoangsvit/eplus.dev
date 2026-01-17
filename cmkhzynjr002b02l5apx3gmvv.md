---
title: "Build a Project Tracking App with AppSheet - GSP969"
seoTitle: "Build a Project Tracking App with AppSheet - GSP969"
seoDescription: "Build a Project Tracking app in AppSheet using Google Sheets, data views, and customization without coding"
datePublished: Sat Jan 17 2026 07:39:45 GMT+0000 (Coordinated Universal Time)
cuid: cmkhzynjr002b02l5apx3gmvv
slug: build-a-project-tracking-app-with-appsheet-gsp969
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768635136401/0a7e302f-318d-46b4-a59c-07e6ee217f62.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1768635569970/1bf2813e-6ef1-415c-a6dc-b178cfe2f3eb.png
tags: build-a-project-tracking-app-with-appsheet-gsp969, build-a-project-tracking-app-with-appsheet, gsp969

---

## Overview

[AppSheet](https://www.appsheet.com/) is a no-code development platform that lets anyone without coding experience build mobile and web applications. You can build AppSheet apps from data sources, such as Google Sheets, Excel, Cloud SQL, Salesforce, and other similar connectors. App user activity syncs to the connected data source(s).

### What you'll do

In this lab, you'll:

* Set up a Google Sheet as an initial data source
    
* Build and customize a simple Project Tracking app
    
* Customize the Project View
    
* Build new Views for a Map and a Chart
    

## Task 1. Set up your Google Sheet as an initial data source

For this app, you use a spreadsheet with columns for tracking Tasks and Projects.

1. Right click **Open Google Sheets** and click **Open link in incognito window**.
    
2. Sign in using the provided username and password.
    
3. In a new tab, access the [project tracking spreadsheet](https://docs.google.com/spreadsheets/d/1h8hDnu9QcFpzm7TxM3LcqAFqZQy3-MQJdiaPtZtBlP0/edit?usp=sharing).
    
4. Click **File** &gt; **Make a copy**.
    
5. Click **Make a copy** to save the copy of the sheet in **My drive**.
    

## Task 2. Generate a simple Project Tracking app

1. In the Sheets menu, click **Extensions** &gt; **AppSheet** &gt; **Create an App**. AppSheet will generate an app for the Projects in the spreadsheet.
    
2. Click your lab account to login to Appsheet with the provided credentials.
    
3. Click **Allow** to authorize AppSheet access to your lab-provided Workspace account.
    
4. Click **Got it!** and **x** to close the default dialogs.
    

## Task 3. Customize the app

1. In AppSheet, click **Data** in the left pane.
    
2. In the **Projects** table, explore the Columns and their values.
    
3. Perform the following updates for the indicated columns:
    

| **Column** | **Value** |
| --- | --- |
| Project Id | Uncheck options: Label, Show? and Search? (**Note:** You’ll have to scroll to the right to find the Search? checkbox.) |
| Link | Set **TYPE** to **Url** |
| Attachment | Set **TYPE** to **File** |
| Location | Set **TYPE** to **Address** |
| Budget | Set **TYPE** to **Number** |
| Due Date | Scroll to right and set the INITIAL VALUE to **WORKDAY(TODAY(),10)** (This will set an initial Due Date value to 10 working days into the future.) |

4. For **Status**, click the edit (pencil) icon to edit its properties in a dialog. Set the following:
    

| **Column** | **Value** |
| --- | --- |
| Type | Enum |
| Values | Add the following: Review Requested, Under Review, Need More Info, Approved |
| Input Mode | Buttons |

5. Expand the Auto Compute section below.
    
6. Set **Initial Value** to **Review Requested**.
    
7. Click **Done** to close the dialog.
    
8. Click **Save**.
    

## Task 4. Customize the Project View and build new views for a map and a chart

In this step, you’ll customize the generated Projects view and and then build 2 new View types in order to see the budget data in a chart, as well as view location data in a map.

1. To Customize the generated **Projects** view, click **Views** in the left pane.
    

2. Select **Projects** to expand it.
    
3. Set the following options:
    
    * Set **View name** to **Projects** (should be set already)
        
    * Set **View type** to **deck** (as opposed to card)
        
4. Optional: You can click on the top Projects box to close the view editor.
    
5. To build a new **Map** view, click **Views** in the left pane.
    
6. Select **\+ Add View** next to **PRIMARY NAVIGATION**. In the **Add a new view** section, click **Create a new view** and set the following:
    
    * Set **View name** to **Map**
        
    * Set **View type** to **map**
        
    * Set **Map column** to **Location**
        
7. Expand the **Display** section below.
    
8. For **Icon**, enter **map** to search for a map icon, then select any map icon from below.
    
9. Click **Save**.
    
10. To build a **Budget** view, click **Views** in the left pane.
    
11. Select **\+ Add View** next to **PRIMARY NAVIGATION**. In the **Add a new view** section, click **Create a new view** and set the following:
    

* Set **View name** to **Budget**
    
* Set **View type** to **chart**
    
* Set **Chart type** to **piechart**
    

12. For chart columns, click the **Add** button and select **Budget** from the dropdown.
    
13. Expand the **Display** section below.
    
14. For **Icon**, enter **pie** to search for pie icons, then select any pie chart icon from below.
    

**Note:** The chosen icons will appear for the Map and Budget action buttons at the bottom of the app.

15. Click **Save**.
    

## Task 5. Test the app!

Now add 2 or 3 records of test data.

1. In the **Mobile Preview**, click **+** to add new project records.
    
2. You can add any images, URLs or file uploads as desired.
    
3. For **Location**, add valid addresses. Simple city names will suffice. Ex: ‘New York’, ’London’, ‘Paris’.
    
4. For **Budget values**, enter positive values. Ex: 2000, 1500, 5000.
    
5. Click **Save**
    
6. To view the data in different views, click the **Projects** view at the bottom of the Mobile Preview to view a list of your projects.
    
7. Click the **Map** view to view the data in a Map. You should see your project locations in a Google Map.
    
8. Click the **Budget** to view the budget in a chart. You should see your budget values in a Pie Chart.
    

Click *Check my progress* to verify the objective.

Add a few records of test data

---

## Solution of Lab

%[https://youtu.be/zDftYz-CNLs] 

Make a copy App: [https://www.appsheet.com/Template/AppDef?appName=CopyofAppSheetProjectTrackingApp-GSP969-939262569#Manage.Deploy.Status](https://www.appsheet.com/Template/AppDef?appName=CopyofAppSheetProjectTrackingApp-GSP969-939262569#Manage.Deploy.Status)