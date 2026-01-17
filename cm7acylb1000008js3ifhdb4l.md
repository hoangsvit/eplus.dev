---
title: "Explore and Create Reports with Looker Studio - GSP409"
seoTitle: "Explore and Create Reports with Looker Studio - GSP409"
seoDescription: "Looker Studio turns your data into informative dashboards and reports that are easy to read, easy to share, and fully customizable. Dashboarding allows you"
datePublished: Tue Feb 18 2025 10:45:17 GMT+0000 (Coordinated Universal Time)
cuid: cm7acylb1000008js3ifhdb4l
slug: explore-and-create-reports-with-looker-studio-gsp409
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768634180403/fd9afafc-42b7-4e7a-90f0-dd08292b73ac.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1768634188350/92b38f19-9281-4753-a29f-2d287dffe98b.png
tags: explore-and-create-reports-with-looker-studio-gsp409, explore-and-create-reports-with-looker-studio, gsp409

---

## **Overview**

[Looker Studio](https://cloud.google.com/looker-studio/) turns your data into informative dashboards and reports that are easy to read, easy to share, and fully customizable. Dashboarding allows you to tell great data stories to support better business decisions.

[BigQuery](https://console.cloud.google.com/bigquery) is Google's fully managed, NoOps, low cost analytics database. With BigQuery you can query terabytes and terabytes of data without having any infrastructure to manage or needing a database administrator. BigQuery uses SQL and can take advantage of the pay-as-you-go model. BigQuery allows you to focus on analyzing data to find meaningful insights.

The dataset used in this lab is an ecommerce dataset that has millions of Google Analytics records for the [Google Merchandise Store](https://shop.googlemerchandisestore.com/) loaded into BigQuery. You will explore the available fields and rows of the dataset for insights.

This lab focuses on how to create new reports and explore your ecommerce dataset visually for insights.

### What you'll learn

In this lab, you learn how to:

* Launch Looker Studio
    
* Create and customize a report
    
* Create an interactive filter for your report
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## **Task 1. Launch Looker Studio and create a blank report**

1. Open [Looker Studio](https://lookerstudio.google.com/) in a new browser tab or window.
    

**Note:** Make sure that you are logged in using the username and password provided in the Connection Details panel.

The Looker Studio home page opens.

2. From the homepage, click the **Blank report** template:
    
3. Click through the following prompts:
    
    * Select **Country** name and enter a **Company** name. Check the checkbox to acknowledge you have read and agree to the Looker Studio Additional Terms, then click **Continue**.
        
    * On the Sign up for emails to get the most out of Looker Studio dialog, select "No" to all options, then click **Continue**.
        
4. Click the **Blank report** template again.
    

A new, untitled report opens.

5. You'll be on the **Connect to data** tab.
    
6. In the Google Connectors section, select **BigQuery**.
    

![BigQuery in the Google Connectors section](https://cdn.qwiklabs.com/39Vbx4yeiSCwKTWnt5qA2bG99Chp%2FWErqithsKc%2FFMA%3D align="left")

7. For Authorization, click **Authorize**. This allows Looker Studio access to your Google Cloud project.
    
8. Define your project:
    
    * Click on **Shared projects** &gt; **your Project ID**, which is found in the **Lab details** panel (begins with *qwiklabs*\-).
        
    * For **Shared project name** type "data-to-insights".
        
    * For **Dataset** select **ecommerce**.
        
    * For **Table** select **sales\_report**.
        
9. Click **Add** in the bottom right corner and then click **Add to report**.
    
10. A preview of the available fields you can add to the report opens.
    
11. Under Data Field, click on **ratio**, and drag it into the Dimension section.
    
12. Click in the number icon to edit.
    

![Number icon highlighted](https://cdn.qwiklabs.com/95ULCqojcZmGWDJWeBckWp4JFiUMLfgyUDylcumc9oA%3D align="left")

13. Scroll down to the Type area, and use the dropdown menu to select **Numeric** &gt; **Percent**.
    

You should now see the ratio column added with values as a percentage.

14. Delete the table that was created for you - you will now create a report with a customized table.
    

Click **Check my progress** to verify the objective.

Launch Looker Studio and create a blank report

Check my progress

## **Task 2. Customize a report**

Now add some visuals and interactive filters for your report users.

### Add a report title and page title

1. In the top-left, click "Untitled Report" and rename it `Ecommerce Product Operations Report`.
    
2. In the reporting tools menu bar, click on the text icon (looks like a boxed in A).
    
3. Click onto a blank area in your report. In the text area, type `Product Inventory Watchlist`.
    
4. Highlight the text in the text area and in the Text Properties panel, increase the font size to 32px. You may need to adjust your text box so it fits correctly.
    

### Create a data table

1. From the menu bar, select **Insert** &gt; **Table**. Click onto the report to drop your table. Feel free to adjust the size of this table and the width of the columns.
    
2. In the new Chart panel that opens, specify the following in the **Setup** tab:
    
    * If **productSKU** is not present in the **Dimension** section, click **productSKU** from the **Data field** section and drag it to the **Add dimension** field.
        
    * In the **Metric** section, if present, remove **Record count** as a Metric by clicking **x**.
        
    * Add **stockLevel** to the Metric area.
        
    
    ![Metric section](https://cdn.qwiklabs.com/izl%2BZH3GB9MjUBBt%2BwXdUqxqhTvipixZgyLcU%2B4OyVI%3D align="left")
    
    * Drag **ratio** to add it as a new Metric
        
    * Drag **restockingLeadTime** to add it as a new Metric
        
    * In the Sort field, click on **productSKU** and choose **ratio** from the dropdown menu for the new Sort field.
        
    * Specify **Descending**.
        
3. In the Chart table, click the **Style** tab.
    
4. Under **Table header**, check **Wrap text**.
    
5. Manually adjust the widths of the table columns by hovering over the vertical border and click and dragging.
    
6. Confirm your report looks visually similar to the report below:
    

![Product Inventory Watchlist table with the following column headers: productSKU, stockLevel, ratio, and restockingLeadTime](https://cdn.qwiklabs.com/tCaE0P77TtbssYfg1FD9pY%2BmrKO5qrUKNFU3T9Flr2A%3D align="left")

### Create an interactive filter

1. Click on your **Setup** tab.
    
2. Under Data Field, click on **name**, and drag it into the Dimension section above `productSKU`.
    
3. Similarly, drag **total\_ordered** into the metric section below `restockingLeadTime`.
    
4. In the upper-right, select the **View** button to preview your report. You should be presented with the following:
    

![Product Inventory Watchlist table with the following column headers: name, productSKU, stockLevel, ratio, restockingLeadTime, and total_ordered](https://cdn.qwiklabs.com/4BSOwFoYYhCYkdCfahKVAipsSvF4TvCy86lXNTCXvAs%3D align="left")

---

## Solution of Lab

%[https://www.youtube.com/watch?v=9ypIXZRPq5E&ab_channel=QUICKGCPLAB] 

Open: [https://lookerstudio.google.com/](https://lookerstudio.google.com/)

* Click on **Shared projects** &gt; **your Project ID**, which is found in the **Lab details** panel (begins with *qwiklabs*\-).
    
* For **Shared project name** type "data-to-insights".
    
* For **Dataset** select **ecommerce**.
    
* For **Table** select **sales\_report**.
    
* Click **Add** in the bottom right corner and then click **Add to report**.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756952444196/7281502f-91fd-40ed-8eaa-76460c6aee9b.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756952454797/e0f88ef4-a159-47ab-9cd3-f1ffcff37c1d.png align="center")