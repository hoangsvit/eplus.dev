---
title: "Connected Sheets: Qwik Start - GSP870"
seoTitle: "Connected Sheets: Qwik Start - GSP870"
seoDescription: "Connected Sheets brings you the power and scale of a BigQuery data warehouse to the familiar context of Google Sheets. With Connected Sheets, you can analyz"
datePublished: Wed Sep 11 2024 14:02:07 GMT+0000 (Coordinated Universal Time)
cuid: cm0xxjf61001i08l86fmo5m5k
slug: connected-sheets-qwik-start-gsp870
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749282947111/f1dd8290-fa0e-4099-944a-aea34150ef30.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749282965660/72b607bf-272a-4c84-9254-24309faa4f39.png
tags: connected-sheets-qwik-start-gsp870, gsp870, connected-sheets-qwik-start

---

## **Overview**

Connected Sheets brings you the power and scale of a BigQuery data warehouse to the familiar context of Google Sheets. With Connected Sheets, you can analyze billions of rows and petabytes of data in Sheets without specialized knowledge of computer languages like SQL.

This makes it easy for anyone, not just data analysts, to apply pivot tables, charts, and formulas to massive datasets and hone in on their most valuable customers or product lines; develop forecasting models, uncover trends, and perform ad hoc analysis with ease.

### What you will do

In this lab, you:

* Connect a BigQuery dataset to Google Sheets.
    
* Use Formulas to find the percentage of taxi trips that included a tip.
    
* Use Charts to inspect popularity and trends of payment types.
    
* Use Pivot tables to find out when taxi rides are the most expensive.
    
* Use Extracts to import raw data from BigQuery to Connected Sheets.
    
* Use Calculated columns to create a new column from transformations/combinations of existing columns.
    
* Use Scheduled refresh to set up automatic data refreshes for your analyses.
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## **Task 1. Open Google Sheets**

1. Click the **Start Lab** button. On the left is a panel populated with the temporary credentials that you must use for this lab.
    

![Lab Details panel](https://cdn.qwiklabs.com/6C8%2Fvu2%2BZNRyp6JUhh0kBSXH4W%2FqXv2UojjS8IfyZFk%3D align="left")

2. In a new incognito window, open the [Google Sheets home page](https://docs.google.com/spreadsheets/).
    
3. In the Google **Sign in** page, paste the username from the **Connection Details** panel, then copy and paste the password.
    

**Note:** If you see the **Choose an account** page, click **Use another account**.

**Note:** You must use the credentials from the Connection Details panel. Do not use your Qwiklabs credentials. If you have your own Google Cloud account, do not use it for this lab (avoids incurring charges).

4. Click through the subsequent pages:
    

* Accept the terms and conditions.
    
* Do not add recovery options or two-factor authentication (because this is a temporary account).
    
* Do not sign up for free trials.
    

After a few moments, you will be at the **Google Sheets** home page.

5. In your **Google Sheets** tab, click on the **Blank** button under **Start a New Spreadsheet** to create a new sheet. You will connect this sheet to a **BigQuery** dataset in the following steps.
    

![The Blank button](https://cdn.qwiklabs.com/fhaM2JCXbH8K%2B1hpCPH1Yg82bPJxCMf%2BVFv9TNDDjzw%3D align="left")

## **Task 2. Connect to a BigQuery dataset**

The data you will be analyzing will be taxi trips in Chicago. Start by connecting the public Chicago taxi dataset that's available in BigQuery to Google Sheets.

1. Select **Data** &gt; **Data Connectors** &gt; **Connect to BigQuery**.
    

![The navigation path to the Connect to BigQuery option](https://cdn.qwiklabs.com/jQtJ7CbmHuXPXofGCE3TjN8Bvn3llJxAdGIoyY%2BKGqw%3D align="left")

2. If you see a **Connect and Analyze big data in Sheets** pop-up, click **Get Connected**.
    
3. Select **YOUR PROJECT ID** &gt; **Public datasets** &gt; **chicago\_taxi\_trips**.
    
4. Select **taxi\_trips** and click **Connect**.
    

After about a minute, you should see a success message. You have just connected a BigQuery dataset to Google Sheets!

## **Task 3. Formulas**

Next you will look at how to use Formulas with Connected Sheets. First, find out how many taxi companies there are in Chicago.

1. Select **Function** &gt; **COUNTUNIQUE** and add it to a new sheet.
    

![The naviagtion path to Countunique](https://cdn.qwiklabs.com/8mD3jQOk9epjhj0hpxmnEBYmFbWonDLkX4FdUWFF0Hw%3D align="left")

2. Ensure **New Sheet** is selected and click **Create** to add it to a new sheet.
    
3. Specify the company column by changing the value of your cell at **row 1**, **column A** to this:
    

```apache
=COUNTUNIQUE(taxi_trips!company)
```

Copied!content\_copy

4. Click **Apply**.
    

Looks like there are 164 taxi companies in Chicago (your results may vary depending on the date the data is accessed).

Next, find the percentage of taxi rides in Chicago that included a tip.

5. Using the `COUNTIF` function, find the total number of trips that included a tip. Copy and paste this function into the cell at row1, column D:
    

```apache
=COUNTIF(taxi_trips!tips,">0")
```

Copied!content\_copy

6. Click **Apply**.
    
7. Now, use the `COUNTIF` function to find the total number of trips where the fare was greater than 0. Add this function into the cell at **row1**, **column E**:
    

```apache
=COUNTIF(taxi_trips!fare,">0")
```

Copied!content\_copy

8. Click **Apply**.
    

Click *Check my progress* to verify the objective.

Use Formulas in Connected sheet

**Check my progress**

9. Finally, compare the values from the previous two steps. Add this function into the cell at **row1**, **column F**:
    

```apache
=D1/E1
```

Copied!content\_copy

Turns out around 38.6% of taxi trips in Chicago included a tip (your results may vary depending on the date the data is accessed).

## **Task 4. Charts**

What forms of payments are people using for their taxi rides? How has revenue from mobile payments changed over time?

Try viewing this information with **Charts**.

1. Return to the **taxi\_trips** tab by clicking on it at the bottom of your **Google Sheets** page.
    
2. Click on the **Chart** button. Ensure **New Sheet** is selected and click **Create**.
    
3. In the Chart editor window, under Chart type, select **Pie chart**.
    
4. Various columns of the data are listed to the right. Drag **payment\_type** to the **Label** field. Then drag **fare** into the **Value** field and click **Apply**.
    
5. The value of **Cash** payments slightly edges out the value of **Credit Card** payments.
    
6. Under **Value** &gt; **Fare**, change Sum to **Count**. Click **Apply**.
    
7. Now, the **Cash** transactions significantly outnumber **Credit Card** transactions, implying that the latter has a higher average value.
    

Next, find out how mobile payments have changed over time by using a line chart.

8. Return to the **taxi\_trips** tab by selecting it at the bottom of your **Google Sheets** page.
    
9. Select the **Chart** button. Ensure **New Sheet** is selected and click **Create**.
    
10. Click on the **Chart Type** dropdown and select the first option under **Line**.
    
11. Drag **trip\_start\_timestamp** to the **X-axis** field.
    
12. Check the **Group by** option and select **Year-Month** from the dropdown list.
    
13. Drag **fare** into the **Series** field.
    
14. Click **Apply**.
    

The overall revenue peaked in 2015. But, how have mobile payments changed over time?

15. Under **Filter** click **Add &gt; payment\_type**.
    
16. Select the **Showing all items** status dropdown.
    
17. Click on the **Filter by Condition** dropdown and select **Text contains** from the list.
    
18. Input **mobile** in the **Value** field.
    
19. Click **OK**.
    
20. Click **Apply** to generate a new line chart.
    

From the chart, you should see that mobile payments have been on a general upward trend. What other observations can you make from the graph?

Click *Check my progress* to verify the objective.

Use Charts

**Check my progress**

## **Task 5. Pivot tables**

At which time of day are there the highest amount of taxi rides? In the following section, you will analyze this using pivot tables.

1. Return to the **taxi\_trips** tab by selecting it at the bottom of your **Google Sheets** page.
    
2. Click on the **Pivot table** button.
    
3. Ensure **New sheet** is selected and click **Create**.
    
4. Drag **trip\_start\_timestamp** into the **Rows** field.
    
5. Choose **Hour** for the Group By option.
    
6. Drag **fare** into the **Values** field.
    
7. Select **COUNTA** for the **Summarize by** option.
    
8. Click **Apply**.
    

You should now see a table that lists the number of rides per hour of the day (military time).

At which time of day do you see the most taxi rides?

Next, break it down by day of the week.

9. Drag **trip\_start\_timestamp** to the **Columns** field.
    
10. Select **Day of the week** under the **Group by** option.
    
11. Click **Apply**.
    
12. Select the data range B3:H26 and select **Format** &gt; **Number** &gt; **Number**.
    
13. Click on the decrease decimal place button twice to make the data easier to read.
    

Now, apply some conditional formatting.

14. Select all your data cells by clicking on the top left cell (first value for Sunday) and then shift + clicking on the bottom right cell (last value for Saturday).
    
15. With all your cells selected, click **Format** &gt; **Conditional formatting**.
    
16. Select **Color scale**.
    
17. Select the colors under **Preview** and choose **White to Green**. This will make the high values green and the low values white.
    
18. Click **Done**.
    
19. Close the **Conditional Formatting** window by clicking the **x**.
    
20. Now, observe that peak periods on weekends are in the early morning and peak periods on weekdays are around the start and end of typical office hours.
    

What about the most expensive times for taxis?

21. In the **Values** field, change the **Summarize by** option to **Average**.
    
22. Click **Apply**.
    

Turns out that Monday early morning taxi fares are the most expensive!

Feel free to explore other combinations of data using pivot table and see what other insights you can uncover!

Click *Check my progress* to verify the objective.

Use Pivot tables

**Check my progress**

## **Task 6. Using Extract**

Sometimes, you may find that you are only working with a small subset of the dataset. You may also want to take a closer look at the raw data itself. In such cases you might find it easier to import a subset of the dataset from **BigQuery** into **Connected Sheets**.

By default, **Connected Sheets** shows a preview of 500 rows of raw data in **BigQuery**. To import more data into Connected Sheets, you can use **Extract**.

For this example you will extract 25000 rows of data from the columns **trip\_start\_timestamp**, **fare**, **tips**, and **tolls**, ordered by latest trip first.

1. Return to the **taxi\_trips** tab by selecting it at the bottom of your **Google Sheets** page.
    
2. Click on the **Extract** button.
    
3. Ensure **New sheet** is selected and click **Create**.
    
4. In the **Extract editor** window, click **Edit** under the Columns section and select the columns **trip\_start\_timestamp**, **fare**, **tips**, and **tolls**. Click outside the dropdown box to continue.
    
5. Click **Add** under the **Sort** section and select **trip\_start\_timestamp**. Click on **Desc** to toggle between ascending and descending order.
    
6. Under **Row limit**, leave 25000 as it is to import 25000 rows.
    
7. Click **Apply**.
    

That's it! You have just extracted thousands of rows of raw data from BigQuery into Connected Sheets!

Click *Check my progress* to verify the objective.

Using Extract

**Check my progress**

## **Task 7. Calculated columns**

**Calculated columns** allows you to add new columns that are transformations or combinations of existing columns. You will create a **calculated column** that calculates tip percentage.

1. Return to the **taxi\_trips** tab by selecting it at the bottom of your **Google Sheets** page.
    
2. Click on the **Calculated columns** button.
    

On the right you can see the columns of your dataset and the functions available. You can also click on the question mark in the description to see examples of calculated columns.

3. Enter `tip_percentage` into the **Calculated column name** field.
    
4. Then copy and paste the following formula into the formula field:
    

```apache
=IF(fare>0,tips/fare*100,0)
```

Copied!content\_copy

5. Click **Add**.
    
6. Click **Apply**.
    

Now you can see the percentage of the fare that was tipped under the **tip\_percentage** column.

Click *Check my progress* to verify the objective.

Calculated columns

**Check my progress**

## **Task 8. Refresh all / Scheduled refresh**

By default, all the analyses that you do on Connected Sheets remain unchanged until you decide to refresh it. This means that even if the data in BigQuery changes, your charts and tables will not change unexpectedly.

Now you'll see how you can update your analyses to the latest data, or schedule regular updates.

1. To update a chart or table, select it then click the **Refresh** button.
    

You can also click the **Refresh options** button, located beside the name of your dataset, followed by **Refresh all** to update all Connected Sheets analyzes to the latest data.

3. To schedule a refresh, click on **Schedule refresh** near the bottom of the Refresh options sidebar.
    
4. Finally, choose your desired frequency and time for the automatic data refreshes.
    
5. Click **Save**.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=2vwbWf4SNRc] 

### Task 1. In a new incognito window, open the [Google Sheets home page](https://docs.google.com/spreadsheets/)

In your **Google Sheets** tab, click on the **Blank** button under **Start a New Spreadsheet** to create a new sheet. You will connect this sheet to a **BigQuery** dataset in the following steps.

### Task 2. Connect to a BigQuery dataset

1. Select **Data** &gt; **Data Connectors** &gt; **Connect to BigQuery**
    
2. Select **YOUR PROJECT ID** &gt; **Public datasets** &gt; **chicago\_taxi\_trips** &gt; **taxi\_trips** and click **Connect**
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726062593863/73b485f6-49b2-48e2-bf76-e423c85e6820.png align="center")

### Task 3. Formulas

1. Select **Function** &gt; **COUNTUNIQUE** and add it to a **new sheet**
    
2. **row 1**, **column A** to this:
    

```apache
=COUNTUNIQUE(taxi_trips!company)
```

3. Click **Apply**
    
4. **row1**, **column D**
    

```apache
=COUNTIF(taxi_trips!tips,">0")
```

4. Click **Apply**
    
5. **row1**, **column E**:
    

```apache
=COUNTIF(taxi_trips!fare,">0")
```

6. Click **Apply**
    
7. **row1**, **column F**
    

```apache
=D1/E1
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726062550399/859f0de7-191a-4f49-beef-cfa790a704b2.png align="center")

### Task 4. Charts

1. Return to the **taxi\_trips** tab Click **Chart** button. Ensure **New Sheet** &gt; **Create**
    
2. Under **Chart** type, select **Pie chart**
    
3. **Label field** &gt; **payment\_type** Then **Value field** &gt; **fare**
    
4. Under **Value** &gt; **Fare**, change **Sum** to **Count** Click **Apply**
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726062455695/0cf901db-7476-4900-90ca-22476f41d5e4.png align="center")

---

1. Return to the **taxi\_trips** tab Click **Chart** button. Ensure **New Sheet** &gt; **Create**
    
2. Click on the **Chart Type** select **Line**
    
3. **X-axis field** &gt; **trip\_start\_timestamp** then **Group** &gt; **Year-Month** and **Series field** &gt; **fare**
    
4. Under **Filter** click Add &gt; **payment\_type** and Select the **Showing all items**
    
5. Click on the **Filter by Condition** select **Text contains** from the list
    
6. In the **Value field** type **mobile** click **ok** then **Apply**
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726062498108/daa0dcad-1942-41f4-97b0-d80234578fd5.png align="center")

### Task 5. Pivot tables

1. Return to the **taxi\_trips** tab Click **Pivot table** button. Ensure **New Sheet** &gt; **Create**
    
2. In the **Rows field** &gt; **trip\_start\_timestamp** and **Hour** for the **Group By option**
    
3. **Values field** &gt; **fare** and Select **COUNTA** for the **Summarize by option**
    
4. **Columns field** &gt; **trip\_start\_timestamp** and Select **Day of the week** under the **Group by option**
    
5. Click **Apply**
    

---

1. select **Format** &gt; **Number** &gt; **Number** select all **(first value for Sunday)** to **(last value for Saturday)**
    
2. click **Format** &gt; **Conditional formatting** Select **Color scale** under **Preview** and choose **White to Green** Done
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726062907286/31806bb5-3a5e-46c9-92ce-6207c56d0499.png align="center")

### Task 6. Using Extract

1. Return to the **taxi\_trips** tab Click **Extract** button. Ensure **New Sheet** &gt; **Create**
    
2. In the **Extract editor** window, click Edit under the **Columns section** and select the **columns trip\_start\_timestamp**, **fare**, **tips**, and **tolls**
    
3. Click Add under the **Sort** &gt; select **trip\_start\_timestamp**. Click on **Desc**
    
4. Under **Row limit**, leave **25000** as it is to import **25000 rows** then Click **Apply**
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726063098482/8925731d-20e7-4da8-8a9d-7b52e7a02ff9.png align="center")

### Task 7. Calculated columns

1. Return to the **taxi\_trips** tab and Click on the **Calculated columns** button
    
2. **Calculated column name** &gt; **tip\_percentage**
    
3. Copy and paste the following formula into the formula field:
    

```apache
=IF(fare>0,tips/fare*100,0)
```

4. Click **Add** and Click **Apply**
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726063290683/628944f0-a7a9-4be0-b30a-987848aee3a4.png align="center")