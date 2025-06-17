---
title: "Visualizing Data with Looker Studio - GSP197"
seoTitle: "Visualizing Data with Looker Studio - GSP197"
seoDescription: "Looker Studio helps you to unlock the power of your data through customized data visualizations and reports from a variety of data sources. You can share th"
datePublished: Tue Jun 17 2025 06:58:11 GMT+0000 (Coordinated Universal Time)
cuid: cmc068wft000d02jobjlebv9g
slug: visualizing-data-with-looker-studio-gsp197
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750143093422/e05d6348-16ab-4ea6-bc56-f3d2b3a77e1b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1750143460934/cc335154-3ec4-4377-8b47-6cb6a11eda01.png
tags: visualizing-data-with-looker-studio-gsp197, visualizing-data-with-looker-studio, gsp197

---

## Overview

[Looker Studio](https://cloud.google.com/looker-studio) helps you to unlock the power of your data through customized data visualizations and reports from a variety of data sources. You can share these visualizations and reports with specific stakeholders or publicly.

In this lab, you learn how to use Looker Studio to visualize data stored in BigQuery using historic information about internal flights in the United States from the [US Bureau of Transport Statistics](https://www.bts.gov/).

### What you'll do

* Create BigQuery views
    
* Create a BigQuery data source in Looker Studio
    
* Create a Looker Studio report with a date range control
    
* Create multiple charts using BigQuery views
    

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    * The Open Google Cloud console button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-02-84fd08876bdd@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    sUfiZYrrYNgU
    ```
    
    You can also find the Password in the Lab Details pane.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-19de393c79b6`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-19de393c79b6
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-02-84fd08876bdd@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-04-19de393c79b6
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Prepare your environment

This lab uses a dataset, code samples, and scripts developed for *Data Science on the Google Cloud Platform, 2nd Edition* from O'Reilly Media, Inc. and covers the data visualization tasks covered in Chapter 3, "Creating Compelling Dashboards".

### Clone the Data Science on Google Cloud repository

1. In the Cloud Shell, enter the following command to clone the repository:
    

```apache
git clone \
   https://github.com/GoogleCloudPlatform/data-science-on-gcp/
```

2. Change to the repository directory:
    

```apache
cd data-science-on-gcp/03_sqlstudio
```

### Schema exploration

This lab uses a BigQuery dataset that has been pre-loaded with two months of sample flight data for January and February 2015, which was obtained from the US Bureau of Transport Statistics. The flight data is in a table called `flights_raw` in the `dsongcp` dataset.

1. In the Cloud Console, expand the **Navigation menu** () and select **BigQuery**.
    
2. In the Explorer panel on the left, expand your project and `dsongcp` dataset, then select the `flights_raw` table.
    
3. On the right side of the window, select the Schema tab to see the schema of the `flights_raw` table.
    

For a quick look at a BigQuery table, use the Preview functionality.

**Note:** Outside of this lab environment, the Preview is free whereas doing a query, for example SELECT \* FROM … LIMIT 10, incurs a querying cost.

4. Click on the Preview tab to view the `flights_raw` table.
    

### Create BigQuery views

Create some table views to easily see flights that are delayed by 10, 15 and 20 minutes respectively. You'll use these views later in the lab.

1. In Cloud Shell, run the script `./create_views.sh`:
    

```apache
./create_views.sh
```

2. Run the following script to compute the contingency table for various thresholds:
    

```apache
./contingency.sh
```

Create BigQuery Views

**Check my progress**

## Task 2. Connect to Looker Studio to visually analyze the dataset

1. In a new browser tab, open [Looker Studio](http://lookerstudio.google.com/).
    
2. If needed, click **Use it for free**.
    
3. Click **Data sources** in the top menu.
    
4. On the top left, click **\+ Create** &gt; **Data source**.
    
5. Select a Country and provide a Company name.
    
6. Agree to the Terms of service and click **Continue**.
    
7. Select **No** for all email preferences, then click **Continue**.
    
8. In the list of Google Connectors, click the **BigQuery** tile.
    
9. Click **AUTHORIZE** to enable access from Looker Studio to your Cloud sources.
    
10. If needed, be sure your lab account is selected, click **ALLOW**.
    
11. Click to select **MY PROJECTS** &gt; `[Project-ID]` &gt; **dsongcp** &gt; **flights**.
    
12. Click the blue **CONNECT** button on the upper right of the screen.
    

Create BigQuery data source

**Check my progress**

## Task 3. Create a scatter chart using Looker Studio

1. Click **CREATE REPORT** at the top right of the page.
    
2. Click **ADD TO REPORT** to confirm that you want to add the `flights` table as a data source.
    
3. Replace **Untitled Report** in the top left with your name for this report.
    
4. Since you'll create your own charts, click to select, then delete the automatically created chart.
    
5. Click **Add a chart** &gt; **Scatter chart**, then draw a rectangle on the report canvas to hold the chart.
    

![Add a chart dropdown menu.](https://cdn.qwiklabs.com/dyQJfTSNkYUWeYFNhNK0Y0nU60BPOhuz%2BTdvB2Ch38w%3D align="left")

In the right panel, the DATA tab lists the data properties.

6. In the DATA tab, click the field for the settings below and change to the following:
    

| **Field** | **Value** |
| --- | --- |
| **Dimension** | UNIQUE CARRIER |
| **Metric X** | DEP\_DELAY |
| **Metric Y** | ARR\_DELAY |

7. Hover your mouse over the data type icon (**SUM**) of the **Metric X** property.
    

![The Metric X property](https://cdn.qwiklabs.com/BqxgcU6bYQNTzFE%2FWj6NrCJgiSTW3zmuomRtxZmCimc%3D align="left")

8. Click the pencil icon to edit the aggregation type of **Metric X**.
    

![The Metric X Edit icon](https://cdn.qwiklabs.com/ajia5wAV9kvBMS3M0yj6ArUfP7VrQnlFeebt1brjzqU%3D align="left")

9. Change the aggregation type to **Average**.
    
10. Click outside the aggregation type box to return to the property pane.
    
11. Do the same for **Metric Y** to change the aggregation type from **SUM** to **Average**.
    
12. Click the **STYLE** tab.
    
13. In the Style menu click the **Trendline** drop-down and select **Linear**.
    
14. In the ribbon above the report, click **Add a control** &gt; **Date range control**.
    

![The expanded Add a Control dropdown menu with the Date range control option highlighted](https://cdn.qwiklabs.com/DSovsIg8wvLVmIn2VvDdLXJhTmE4M1DuuiSGacINm%2FY%3D align="left")

15. Draw a rectangle the size of a label below the chart to add the Date range control.
    

Try it out!

1. Set a date range between January 1, 2015 and February 28, 2015 by either:
    

* Clicking **Auto data range** in the Date range control Properties panel on the right.
    
* Clicking the **Date range control** rectangle you added under the scatter chart.
    

2. Click the **VIEW** button on the upper right to change to the interactive report view to test this control.
    

**Note:** You see data only if the range includes dates between Jan 1st 2015 and Feb 28 2015 because the dataset is limited to those dates in this lab.

## Task 4. Adding additional chart types to your report

1. Click **Edit** on the upper right to add more chart items.
    
2. Click **Add a chart** &gt; **Pie chart**, then draw a rectangle on the report canvas to hold the pie chart.
    
3. With the pie chart selected, click **ADD A FIELD** on the bottom right of the Data tab in the right panel.
    

**Note:** If you do not see the `ADD A FIELD` option, refresh your browser tab.

4. Click **Add calculated field** to view the field property summary.
    
5. Click **ALL FIELDS** to view the field property summary.
    
6. Click the context menu icon to the right of the `ARR_DELAY` field (three dots) and select **Duplicate**.
    

![The context menu icon alongside the ARR_DELAY field](https://cdn.qwiklabs.com/RJFCHk1AnOCr8T55%2BuP2foyonQD7JSr3vQ0tzzsaVGc%3D align="left")

6. Click **\+ ADD A FIELD** on the top right of the section.
    
7. Click **Add calculated field** and name the field `is_late`.
    
8. In the **Formula** text box enter the following formula:
    

```apache
CASE WHEN ( Copy of ARR_DELAY <15) THEN "ON TIME" ELSE "LATE" END
```

The field name must register correctly. If you do not see the syntax highlighting as shown below, double check the formula or use the **Available Fields** selector on the right to select the **Copy of ARR\_DELAY** field.

![The Formula editor with Copy of ARR_DELAY highlighted](https://cdn.qwiklabs.com/aV%2F7ZOVZkfM5XIOZbOoWxKRuLk2FdtFRzv4uowicCqQ%3D align="left")

9. Click **SAVE** and then click **DONE**.
    
10. In the DATA tab in the right panel, change the **Dimension** for the Pie chart to the new **is\_late** calculated field.
    

**Note:** Your chart will likely show an error at this point. This will be fixed by the next few steps.

11. Change the **Metric** to the new **is\_late** field.
    
12. Hover over the **CTD** icon next the **is\_late** metric.
    
13. Click it and change the aggregation to **Count**.
    

The pie chart now displays the percentage of on time and late flights.

### Add a bar chart

1. Click **Add a chart** &gt; **Vertical bar chart**, and then draw a rectangle on the report canvas to hold the bar chart.
    
2. In the DATA tab, click the field for the settings below and change to the following:
    

| **Field** | **Value** |
| --- | --- |
| **Dimension** | UNIQUE CARRIER |
| **Metric 1 (Default)** | DEP\_DELAY |
| **Metric 2** (click **Add metric)** | ARR\_DELAY |
| **Sort** | UNIQUE CARRIER |
| **Sort Order** | Ascending |

3. In the **Style** tab, scroll to **Left Y-Axis** and set the **Axis Min** value to **0**.
    

## Task 5. Creating additional dashboard items for different departure delay thresholds

You've created 3 database table views. Now create charts to display the delay thresholds for these tables.

### Add an additional data source for the Delayed\_10 database table view

1. Copy the pie chart and the bar chart so that you now have two sets. The report canvas should now look similar to this:
    

![The Report canvas containing a dot chart, two pie charts, and two bar charts](https://cdn.qwiklabs.com/zUjfkWTrc6tU70tOVa93bD%2BCfGtncZgMv9IJYzQv3oI%3D align="left")

2. Select the second pie chart and click **flights** in the **Data Source** in the property list.
    
3. Click **\+ ADD DATA** at the bottom of the menu.
    
4. Click **BigQuery** in the Google Connectors section of the selection pane.
    
5. Select **MY PROJECTS** &gt; `[Project-ID]` &gt; **dsongcp**.
    
6. Click the **delayed\_10** table to select it and then click **ADD** button on the bottom right of the screen.
    

**Note:** This is technically a table view, not a table, but it is listed as a table in the interface.

7. Click **ADD TO REPORT**.
    

### Recreate the copy of the Arr\_Delay field and the is\_late calculated field

1. Click **\+ ADD A FIELD** on the bottom right of the screen. You may need to make sure you have selected the DATA property tab on the right hand side of the screen to see this.
    
2. Click **Add calculated field** to view the field property summary.
    
3. If you cannot see the full list of fields with their data type and Aggregation type displayed then click **ALL FIELDS** to go to the field property summary.
    
4. Click the context menu icon to the right of the `ARR_DELAY` field and select **Duplicate**.
    

![The Context menu icon alongside the ARR_DELAY field](https://cdn.qwiklabs.com/RJFCHk1AnOCr8T55%2BuP2foyonQD7JSr3vQ0tzzsaVGc%3D align="left")

4. Click **\+ ADD A FIELD** on the right side of the screen for the **delayed\_10** data source.
    
5. Click **Add calculated field** and name the field **is\_late**.
    
6. Enter the following formula in the **Formula** text box:
    

```apache
CASE WHEN ( Copy of ARR_DELAY <15) THEN "ON TIME" ELSE "LATE" END
```

The field name must register correctly. If you do not see the syntax highlighting as shown below then double check the formula or use the **Available Fields** selector on the right to select the **Copy of ARR\_DELAY** field.

![The Formula editor with 'Copy of ARR_DELAY' highlighted](https://cdn.qwiklabs.com/aV%2F7ZOVZkfM5XIOZbOoWxKRuLk2FdtFRzv4uowicCqQ%3D align="left")

7. Click **SAVE** and then click **DONE**.
    
8. Now change the **Data Source** for the new pie chart to `delayed_10`. It should retain the **is\_late** calculated field.
    

The second pie chart now displays the percentage of on time and late flights for the `Delayed_10` view.

![The Report canvas displaying the second pie chart updated](https://cdn.qwiklabs.com/CvCLbOsNd0OafUm%2FUz16UuPXCDSoWkWKrAWcdmHt%2FO8%3D align="left")

## Task 6. Creating the remaining dashboard views (optional)

Optionally repeat the last two sections, where you added an additional database view for the Delayed\_15 and Delayed\_20 views.

---

## Solution of Lab

%[https://youtu.be/KI00TWtaFAM]