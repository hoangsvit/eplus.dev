---
title: "Looker Data Explorer - Qwik Start - GSP718"
seoTitle: "Looker Data Explorer - Qwik Start - GSP718"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Tue Nov 12 2024 04:42:50 GMT+0000 (Coordinated Universal Time)
cuid: cm3dyuzkk000m09l9dagvahxx
slug: looker-data-explorer-qwik-start-gsp718
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731386543798/c6da5047-d116-4a1f-85b9-3f7709c1d361.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731386559433/d463b63e-3593-4394-85c0-67225acc4b17.png
tags: looker-data-explorer-qwik-start-gsp718, gsp718

---

## **Overview**

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications. With Looker and Google Cloud, you can deliver actionable business insights at the point of decision, create new value streams, and infuse data into products and workflows to move the business forward.

In this lab, you learn how to use Looker to visualize data using Explores, which are data views created by Looker developers. For this lab, an Explore of the Federal Aviation Administration's (FAA) Airport data has been created for you. This dataset contains information on different attributes of airports such as city, date of commission, facility type, etc.

Learn more about creating Explores in the [Looker documentation](https://docs.looker.com/exploring-data/exploring-data).

### What you'll learn

In this lab, you learn how to visualize data in Looker using Explores.

* Use the Explore interface to access data published by LookML developers.
    
* Work with Dimensions and Measures to query and select data.
    
* Select the appropriate visualization type to best display your data.
    
* Save an Explore query to a dashboard.
    

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
    

## **Task 1. Visualize your first Measure**

Looker Measures are an aggregation of one or more dimensions (or unique attributes of the data). Measures let you calculate your Key Performance Indicators (KPIs) and help you analyze your data using different attributes.

In the Airports Explore, you will determine the average elevation across all airport facilities and show that number as a single value visualization.

1. In the **Looker navigation menu**, click **Explore**.
    
2. Under **FAA**, click **Airports**.
    
    The available dimensions and measures will be listed in the data panel for Airports.
    
3. Under **Airports** &gt; **Measures**, click **Average elevation**.
    
4. Click **Run**.
    
5. Click the arrow next to **Visualization** to expand the window.
    
    Once the Visualization window has expanded, you can hover your cursor over the icons to identify the available options.
    
6. Click the **Single value** icon.
    
    This option creates a single value visualization that you can customize. You can also make the chart larger by collapsing the data window.
    
7. Click on the settings gear icon () for **Visualization**.
    
8. Click **Edit** &gt; **Style**.
    
9. Under **Style**, click on **Value color**, and select your choice of color.
    
10. Under **Style**, enable **Show title**, and provide a title in **Title override** box.
    
11. Click on the gear icon for **Visualization** to close the settings.
    
12. Click on the settings gear icon () next to **Run**, and select **Save &gt; To an existing dashboard**.
    
13. Enter a title for the visualization: **Average elevation**.
    
14. Click **New Dashboard**.
    
15. Enter a title for the new dashboard: **Airports/Flights**.
    
16. Click **OK**.
    
17. Click **Save to Dashboard**.
    

Click **Check my progress** to verify the objective.

Create a dashboard

Check my progress

## **Task 2. Visualize dimensions and measures**

Dimensions are unique attributes of the data that helps you describe the data. For example, in the Airports explore, the location of the airport, city, elevation levels, etc., are different dimensions. You can use both Dimensions and Measures in Looker to slice and dice your data to achieve data insights.

Next, identify the top 5 Facility Types with the highest average elevation and display the results as a bar chart. You will show the total number of airport facilities by Facility Type in the same chart.

1. On the **Looker navigation menu**, click **Explore**.
    
2. Under **FAA**, click **Airports**.
    
    The available dimensions and measures will be listed in the data panel for Airports.
    
3. Under **Airports &gt; Dimensions**, click **Facility type**.
    
4. Under **Airports &gt; Measures**, click **Average Elevation**.
    
5. Under **Airports &gt; Measures**, click **Count**.
    
6. On the **Data** tab, change **Row limit** to **5**.
    
7. Click **Run**.
    
8. Click the arrow next to **Visualization** to expand the window.
    
    Once the Visualization window has expanded, you can hover your cursor over the icons to identify the available options.
    
9. Click the **Bar** icon.
    
    This option creates a horizontal bar visualization that you can customize. You can also make the chart larger by collapsing the data window.
    
10. Click on the settings gear icon () for **Visualization**.
    
11. Click **Values**.
    
12. Under **Values**, enable **Value labels**.
    
13. Click **Y**.
    
14. Under **Y**, click on **Airports** and drag it under **Top Axes**.
    
    **Average elevation** will remain under **Bottom Axes**.
    
15. Under **Configure axes &gt; Bottom 1**, enter an Axis name: **Count**
    
16. Click on the gear icon for **Visualization** to close the settings.
    
17. Click on settings gear icon () next to **Run**, and select **Save &gt; To an existing dashboard**.
    
18. Enter a title for the visualization: **Average elevation by facility type**.
    
19. Select the dashboard you previously created: **Airports/Flights**.
    
20. Click **Save to Dashboard**.
    

Click **Check my progress** below to check your lab progress.

Visualize Dimensions and Measures

---

## Solution of Lab

%[https://www.youtube.com/watch?v=_mxceD2TSMQ&ab_channel=TechVine]