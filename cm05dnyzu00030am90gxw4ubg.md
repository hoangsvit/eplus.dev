---
title: "Use Charts in Google Sheets - GSP1061"
seoTitle: "[2024] Use Charts in Google Sheets - GSP1061"
seoDescription: "For this lab you read through a fictitious business scenario. By completing the various lab activities, you assist the characters with their Google Sheets u"
datePublished: Thu Aug 22 2024 14:28:14 GMT+0000 (Coordinated Universal Time)
cuid: cm05dnyzu00030am90gxw4ubg
slug: use-charts-in-google-sheets-gsp1061
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747554085275/069edcf1-99a7-4799-b7b5-de462e36455c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747554105259/6c57355a-1307-44ec-b9ed-81552d0f6461.png
tags: 2024-use-charts-in-google-sheets-gsp1061, use-charts-in-google-sheets-gsp1061, gsp1061, use-charts-in-google-sheets

---

## **Overview**

For this lab you read through a fictitious business scenario. By completing the various lab activities, you assist the characters with their Google Sheets usage.

![on-the-rise-bakery-logo.png](https://cdn.qwiklabs.com/l5NZNX3b3wTJgHTRfHBAsa5v7yVNL7%2Bh1dKdRo678iw%3D align="left")

Thomas Omar and Seroja Malone started On the Rise Bakery as a small family business to share their love of international flavors and nostalgic baked goods. They expanded from New York City to across North America and now have bakeries around the world. As the company has grown, they have hired staff to help oversee daily operations for multiple locations.

Google Sheets has several built-in tools that make it easy to create and share useful charts and reports so that you can quickly visualize data (without having to leave the spreadsheet).

In this lab, you develop charts to help On the Rise Bakery visualize its location and sales data.

## **Objectives**

You learn how to perform the following tasks:

* Visualize datasets using pie charts, column charts, line charts, combo charts, and scatter charts.
    
* Customize charts using the chart editor.
    
* Create inline visualizations using sparklines and progress bars.
    
* Use charts and tables in other Google Workspace products and publish charts in Sheets.
    

### Prerequisites

If you’re new to Google Sheets, the following courses are recommended: [Google Sheets](https://www.cloudskillsboost.google/course_templates/196), [Google Sheets - Advanced Topics](https://www.cloudskillsboost.google/course_templates/293).

You might also find it helpful to complete the following lab: [Google Sheets: Getting Started](https://www.cloudskillsboost.google/focuses/5828?parent=catalog).

## **Setup and requirements**

### Before you click Start Lab

Read these instructions. **Labs are timed and you cannot pause them.** The timer starts when you click **Start Lab** and shows how long Google Workspace resources are available to you.

This Google Workspace hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Workspace for the duration of the lab.

### What you need

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    
* Time. Note the time at the top of the left panel, which is an estimate of how long it should take to complete all steps. Plan your schedule so you have time to complete the lab. Once you start the lab, you will not be able to pause and return later (you begin at step 1 every time you start a lab).
    
* You do NOT need a Google Workspace account. An account is provided to you as part of this lab.
    

Open an Incognito window to run this lab.

When your lab prompts you to log into the console, **use only the student account provided to you by the lab**. This allows the activity tracking to verify that you have completed the lab activities.

### Start your lab

When you are ready, click **Start Lab** in the upper left panel.

### Find Your Lab's User Email and Password

To access the resources and console for this lab, locate the **User Email** and **Password** in the left panel. These are the credentials you use to log in to Google Drive.

### Sign in to Google Drive

1. Click **Open Google Drive**.
    

***Tip:*** Open the tabs in separate windows, side-by-side.

2. Notice the **Email or phone** field has been pre-filled with the User Email. Click **Next**.
    
3. Enter the **Password** and click **Next**.
    
4. Accept all terms and conditions as prompted.
    

Google Drive opens and you are signed in to the Student Google Account.

## **Task 1. Create pie charts and column charts**

In this task, you create and customize a chart that displays On the Rise Bakery locations.

### Upload a spreadsheet

1. In the left panel of the lab instructions, right-click **Open Google Drive**, and then click **Open link in incognito window** to sign into your lab student account.
    
2. In the upper-right corner of Google Drive, click the Settings icon (), and then click **Settings** to open the settings page.
    
3. Check the box to **Convert uploads to Google Docs editor format**.
    
4. In the upper-left corner of the settings page, click the back arrow to return to the Google Drive homepage.
    
5. Click [On the Rise Bakery Sales and Locations](https://storage.googleapis.com/cloud-training/GoogleSheets/On%20the%20Rise%20Bakery%20Sales%20and%20Locations.xlsx) to download a spreadsheet.
    
6. In the left pane, click **New &gt; File upload**.
    
7. Select the file on your computer named **On the Rise Bakery Sales and Locations.xlsx**.
    
    When you see **Upload complete** in the lower-right, your file has uploaded successfully.
    
8. Double-click on the newly uploaded file to open it, and then exit out of the Google Drive tab.
    

### Create a pie chart

1. To select all the items in column E of the **Locations** sheet, click the gray column label.
    
2. To create a chart, at the top, click **Insert &gt; Chart**.
    
    You should see a pie chart appear on the screen.
    
3. (Optional) Click the chart and drag the blue markers to resize it.
    

You can use pie charts to compare parts of a single data series to the whole. As a best practice, pie charts should include five or fewer categories. Don't use a pie chart to represent exact values because differences in angles and areas can be difficult to understand.

### Create and customize a column chart

1. In the **Chart editor** pane, for **Chart type**, select **Column chart**.
    
    Google Sheets automatically suggests chart types based on the characteristics of the data, but you are not limited to using only the suggested options.
    
2. To change the appearance of the chart, click the **Customize** tab.
    
3. Expand the **Chart & axis titles** section, and then change the chart title to **Locations by Continent**
    
4. Expand the **Series** section, and then, next to **Format data point**, click **Add**.
    
5. In the **Select data point** dialog, for **Data point**, select **Continent: South America**, and then click **OK**.
    
6. Change the color of this data point to purple.
    
7. In the **Chart editor** pane, scroll down, and then expand the **Gridlines and ticks** section.
    
8. Select **Vertical axis** in the first dropdown, and then select the **Minor gridlines** checkbox.
    
9. Exit out of the **Chart editor**.
    

Use a column chart to show one or more categories, or groups, of data, especially if each category has subcategories.

**Note:** The available options for the **Chart editor** vary based on the type of chart that you’re editing. A pie chart, for example, has options to edit a **Pie slice**, while a column chart has **Gridlines and ticks**.

Click *Check my progress* to verify the objective.

Create a chart.

**Check my progress**

## **Task 2. Create scatter charts and combo charts**

In this task, you create a combo chart and a scatter chart for On the Rise Bakery sales data from its South American locations.

### Change a line chart to a combo chart

1. In the lower-left of your spreadsheet, click the sheet labeled **Sales - South America**.
    
2. Select cells A1:M3, and then at the top, click **Insert &gt; Chart**.
    
    A line chart should appear. Line charts are used to look at data over a time period.
    
3. In the **Chart editor** pane, for **Chart type**, select **Combo chart**.
    

![combo chart](https://cdn.qwiklabs.com/TdvOxYqzS%2FDkHf%2B1TUGbB6Aqk5dACbfGP2EsnvRMG7Q%3D align="left")

Use a combo chart when you want to represent different data series using lines and bars.

### Create a scatter chart

1. Select cells A1:M3, and then at the top, click **Insert &gt; Chart**.
    
    A second copy of the chart should appear on top of the existing chart.
    
2. Move the charts so they are both visible.
    
3. In the **Chart Editor** pane, for **Chart type**, select **Scatter chart**.
    

Scatter charts show numeric coordinates along the horizontal (X) and vertical (Y) axes. Use a scatter chart when you want to find out how much one variable is affected by another.

Click *Check my progress* to verify the objective.

Create a scatter chart and combo chart.

**Check my progress**

### Test your understanding

The charts you created in tasks one and two are just a few examples of visualizations you can create using Google Sheets. Learn more about [Charts & Graphs in Google Sheets](https://support.google.com/docs/answer/190718).

On The Rise Bakery wants to create a chart that displays January sales using data from all of its locations. The chart should help staff members to easily understand how each continent contributes to the total sales. Which of the following charts should be used?Combo chartLine chartPie chartColumn chart

**Submit**

## **Task 3. Create inline visualizations**

In this task, you create sparklines and progress bars for On the Rise Bakery to help staff quickly review data.

### Add a sparkline to a sheet

Sparklines are miniature charts contained within a single cell.

1. Right-click the gray label for column B and select **Insert 1 column left**.
    
    A new, empty column is added.
    
2. To create a sparkline, in cell B2, type or paste **\=SPARKLINE(C2:N2)**
    

The only required argument for the sparkline function is data, which can be provided as a range of cells, as shown in this exercise. You can also provide data without specifying a range by using an array. For example, **\=SPARKLINE({500,100,200,400,300})**.

Learn more about [using arrays in Google Sheets](https://support.google.com/docs/answer/6208276).

### Add a progress bar to a sheet

On the Rise Bakery wants to track progress toward the annual sales goal of $2,400,000 after the first quarter of the year (January-March). You can create a progress bar by using the sparkline function with optional settings.

1. In cell B3, type or paste **\=SPARKLINE(SUM(C3:E3)/2400000,{"charttype", "bar"; "max", 1; "min", 0; "color1", "blue"})**
    
    The first argument uses first quarter sales divided by the annual sales goal. The width of the colored bar represents how much of the annual goal has been achieved.
    
    The sparkline function has an optional parameter that lets you specify many attributes, including: chart types, minimum and maximum values, and colors using an array.
    
2. Change the formula in cell B3 to use **green** instead of **blue** for the progress bar.
    
    Each option in the array is described using comma-delimited pairs. The first word is the name of the option, for example, **"charttype"**. The second attribute is the value that option is set to, for example, **"bar"**. Different options defined in the array are delimited by semicolons.
    

Click *Check my progress* to verify the objective.

Use the SPARKLINE function.

**Check my progress**

Similar to the data argument, the options can also be specified as a range. For more information on available options, see [SPARKLINE](https://support.google.com/docs/answer/3093289).

## **Task 4. Publish a spreadsheet**

In this task, you publish a spreadsheet as a unique web page with its own URL and link a chart to Google Slides.

### Publish a spreadsheet to the web

1. At the top, click **File &gt; Share &gt; Publish to web**.
    
2. In the **Publish to the web** dialog, click the dropdown next to the **Entire document,** select a chart from the list, and then click **Publish**.
    
3. Click **OK** if the **Are you sure you want to publish this selection?** alert appears.
    
4. To view the published sheet, copy the link and paste it into your web browser.
    

The publishing option lets you to share a copy of your file as a distinct, lightweight web page. You can control whether or not your web page is automatically republished when changes are made. You can also limit access to a particular domain.

**Warning:** In this lab, your web page is restricted to the lab domain by default, so the website is only accessible for the duration of the lab using your lab student account.

### Embed a chart in a Google Slides presentation

1. Right-click [Google Slides](https://slides.google.com/), and then click **Open link in incognito window**.
    

**Note:** Please ensure you are opening Google Slides in the lab student account. To change between Google Accounts, click your profile photo or email address in the top right of the page. Select the desired account and a new tab will open for this account.

2. In the top left, under **Start a new presentation**, click **+** to open a blank presentation in a new browser tab.
    
3. Change the filename from **Untitled presentation** to **On the Rise Bakery**
    
4. At the top, for **Layout**, select **Title Only**.
    
5. In the slide, for the title, type **On the Rise Bakery**
    
6. At the top, click **Insert &gt; Chart** &gt;
    
    ![sheets-icon.png](https://cdn.qwiklabs.com/Nmk%2Fpb6PgNsrnhky3szz8RZdz7NsswSid2d2fK9hZSY%3D align="left")
    
    **From Sheets**.
    
7. In the **Insert chart** dialog, from the list of files, select **On the Rise Bakery Sales and Locations**, and then click **Insert**.
    
8. In the **Import chart** dialog, select the column chart, and then click **Import**.
    

When you insert a chart or table to Google Slides or Google Docs, you can link them to existing files.

**Note:** People with access to your presentation or document can view all linked charts and tables, even if they don't have access to the file containing the original Google Sheets file.

Click *Check my progress* to verify the objective.

Share a spreadsheet.

---

## Solution of Lab

%[https://youtu.be/ts15RxDZlAc] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724336015079/d182ec48-7216-45de-980b-e19417c3b323.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724336019072/7476fc55-33cd-4f1e-8245-1c72636ee4d8.png align="center")

---

**<mark>Download file:</mark>**

* [On the Rise Bakery Sales and Locations.xlsx](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP1061/On%20the%20Rise%20Bakery%20Sales%20and%20Locations.xlsx)
    
* [On the Rise Bakery.pptx](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP1061/On%20the%20Rise%20Bakery.pptx)
    

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724336771194/fd995d48-fff8-430a-8d69-a2c50cc57d76.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724336793617/be484aa9-a491-4c82-b8f1-eb2886dec9f5.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724336808347/fe8404fc-904d-4995-a811-b2e6ddf3cf6a.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724336817413/ebcf06a0-d3d5-4cb5-97f1-1458c47dc88d.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724336825921/c8aa60d4-596e-4b73-91af-b2887fa0a9f9.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724336832762/9dd18ba9-ecfe-4428-9f77-ed5ddc794b59.png align="center")