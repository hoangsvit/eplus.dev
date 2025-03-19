---
title: "Getting Started with Analyzing and Visualizing Data in Looker (Solution)"
seoTitle: "Getting Started with Analyzing and Visualizing Data in Looker (Solutio"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Wed Mar 19 2025 08:22:18 GMT+0000 (Coordinated Universal Time)
cuid: cm8fnmepb002p08jp2idw92q5
slug: getting-started-with-analyzing-and-visualizing-data-in-looker-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742371767448/8ae21653-6c41-4c7f-8354-c1ad1080ab71.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1742372526785/11e7b0c3-8a2d-4304-95f5-19106c714ed8.png
tags: getting-started-with-analyzing-and-visualizing-data-in-looker-solution, getting-started-with-analyzing-and-visualizing-data-in-looker

---

## **Overview**

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

In this lab, you learn how to use Looker to analyze and visualize data using Explores, which are data views created by LookML developers. For this lab, an Explore of the Federal Aviation Administration's (FAA) airports and flights data has been created for you. This dataset contains information on different attributes of airports and flights, such as city and departure date.

You can learn more from the [Exploring data in Looker documentation](https://docs.looker.com/exploring-data/exploring-data).

### Objectives

In this lab, you learn how to analyze and visualize data in Looker using Explores.

* Use the Explore interface to access data curated by LookML developers.
    
* Work with dimensions, measures, filters, and pivots to query and select data.
    
* Select the appropriate visualization type to best display your data.
    
* Save your visualizations to dashboards.
    

## **Setup**

For each lab, you get a new project and set of resources for a fixed time at no cost.

1. Make sure you signed into Qwiklabs using an **incognito window**.
    
2. Note the lab's access time (for example, **2:00:00** hrs) and make sure you can finish in that time block.
    

**Note:** There is no pause feature. You can restart the lab if needed, but you will start at the beginning of the lab.

3. When ready, click
    
    ![Start lab button](https://cdn.qwiklabs.com/%2B9%2FP0zl%2Fni9WnXWSBY1YW8A0%2BQ8W41voaSiRO%2BR4LqM%3D align="left")
    
    .
    

A new panel will appear with the temporary credentials that you must use for this lab.

If you need to pay for the lab, a pop-up will open for you to select your payment method.

4. Note your lab credentials. You will use them to sign in to the Looker instance for this lab.
    

![Lab Detail panel](https://cdn.qwiklabs.com/mWAUa1y8pj%2BZMbJct88I3epev%2Bw0MbnPfmnJecoeJV0%3D align="left")

**Note:** If you use other credentials, you will get **errors or incur charges**.

5. Click **Open Looker**.
    

***Tip:*** Open Looker in a new tab or a separate window, so you can see both the lab instructions and the Looker instance.

6. Enter the provided username and password.
    

![Looker login page](https://cdn.qwiklabs.com/FWeKHXtSieW5PkkJzm7qx8wZUv6S4V1ITo2GpBcLCK8%3D align="left")

**Note:** You must use the credentials from the Connection Details panel on this page. Do not use your Qwiklabs credentials. If you have your own Looker account, do not use it for this lab.

7. Click **Log In**.
    

After a successful login, you will see the Looker instance for this lab.

**Note:** Do not click **End Lab** unless you are finished with the lab or want to restart it. This clears your work and removes the project.

**When you start the lab, it can take a few minutes for the data to populate in the Looker instance.** When you see options (e.g. Flights) in the Explore dropdown located on the Looker navigation menu, you may proceed to the first task.

## **Task 1. Create a single value visualization of the average elevation across all airports**

In Looker, dimensions are unique attributes of the data that help you to describe data. For example, in the Airports Explore, the geographic location of the airport, city, and elevation are different dimensions.

Measures are aggregations of one or more dimensions (or unique attributes of the data) such as a count or average. Measures let you calculate your Key Performance Indicators (KPIs) and help you analyze your data using different attributes.

You can use both Dimensions and Measures in Looker to slice and dice your data to achieve data insights.

Using the Airports Explore, you first determine the average elevation across all airport facilities and then display that number as a customized single value visualization. Then, you add this visualization to a new dashboard for airport data.

### Determine the average elevation across all airports

1. On the left-side navigation panel of the Looker User Interface, click **Explore**.
    
2. Under **FAA**, click **Airports**.
    
3. Click the arrow next to **Airports**.
    

The available dimensions and measures will be listed in the data panel for Airports.

4. Under **Airports &gt; Measures**, click **Average Elevation**.
    
5. Click **Run**.
    

### Customize a single value visualization of the result

1. Click the arrow next to **Visualization** to expand the window.
    

Once the Visualization window has expanded, you can hover your cursor over the icons to identify the available options.

2. Click the **Single Value** icon.
    

This option creates a single value visualization that you can customize. You can also make the chart larger by collapsing the data window.

3. Click on **Settings** () for **Visualization**.
    
4. Under **Style**, click on **Value Color**, and select your choice of color.
    
5. Under **Style**, click **Show Title**, and provide a title in **Title Override** box.
    
6. Under **Style**, enter a **Value Format**: **0.00**.
    
7. Click on **Settings** for **Visualization** to close the settings.
    

### Save the visualization to a new dashboard

1. Click on **Settings** () next to **Run** (top right of page), and select **Save &gt; To an existing Dashboard**.
    
2. Enter a title for the visualization: **Average Elevation**.
    

**Note:** Leave the default destination as Shared. This will save the new dashboard to **Shared Folders**.

3. Click **New Dashboard**.
    
4. Enter a title for the new dashboard: **Airports**.
    
5. Click **OK**.
    
6. Click **Save to Dashboard**.
    
7. View the dashboard by clicking on the provided hyperlink titled **Airports**. When you have finished viewing, click **Cancel**.
    

Click *Check my progress* to verify the objective.

Create a single value visualization of average elevation across all airports.

Check my progress

## **Task 2. Create a bar chart of the facility types with the highest average elevations**

In this task, you identify the top 5 Facility Types with the highest average elevation and display the results as a bar chart. Then, you add this visualization to the dashboard you created in the previous task.

### Identify the top 5 Facility Types with the highest average elevation

1. On the left-side navigation panel of the Looker User Interface, click **Explore**.
    
2. Under **FAA**, click **Airports**.
    
3. Click the arrow next to **Airports**.
    

The available dimensions and measures will be listed in the data panel for Airports.

4. Under **Airports &gt; Dimensions**, click **Facility Type**.
    
5. Under **Airports &gt; Measures**, click **Average Elevation**.
    
6. Under **Airports &gt; Measures**, click **Count**.
    
7. On the **Data** tab, change **Row limit** to **5**.
    
8. Click **Run**.
    

### Customize a bar chart to display the results

1. Click the arrow next to **Visualization** to expand the window.
    

Once the Visualization window has expanded, you can hover your cursor over the icons to identify the available options.

2. Click the **Bar** icon.
    

This option creates a horizontal bar visualization that you can customize. You can also make the chart larger by collapsing the data window.

3. Click on **Settings** () for **Visualization**.
    
4. Under **Values**, click **Value Labels**.
    
5. Under **Y**, click on **Airports** and drag it under **Top Axes**.
    

**Average Elevation** will remain under **Bottom Axes**.

6. Under **Y &gt; Configure Axes &gt; Top 1**, enter an **Axis name**: **Count**:
    

![Edit pane with Count populated in the Axis Name field](https://cdn.qwiklabs.com/6TS3PQ34x6uCRh6tcOfkRoKX6L9CqvEuObg5kmoj39I%3D align="left")

7. Under **Values**, enter a **Value Format**: **0.00**.
    
8. Click on the gear icon for **Visualization** to close the settings.
    

### Save the visualization to an existing dashboard

1. Click on **Settings** () next to **Run**, and select **Save &gt; To an existing Dashboard**.
    
2. Enter a title for the visualization: **Average Elevation by Facility Type**.
    
3. Select the dashboard you previously created: **Airports**.
    
4. Click **Save to Dashboard**.
    
5. View the final dashboard by clicking on the provided hyperlink titled **Airports**.
    

The dashboard for **Airports** will contain the two visualizations that you added in the first two tasks.

**Note:** You may need to refresh your browser to see the graph.

![Dashboard displaying the average airport elevation, and average elevation by facility type chart](https://cdn.qwiklabs.com/sHdQAylAutVF2QtE%2BvRQ5sRJ%2BcT9sKCMH7o9Rh16%2B5Q%3D align="left")

The colors of your visualizations may differ from those shown in the image.

Click *Check my progress* to verify the objective.

Create a bar chart of the facility types with the highest average elevations.

Check my progress

## **Task 3. Create a line chart of the number of flights cancelled each week in a given year**

Time dimensions let you analyze data at a specific point in time. You can combine this with filters to subselect data, resulting in the ability to analyze seasonality or week over week metrics for a given year.

Using the Flights Explore, you first find the number of flights that were cancelled each week in the year 2004 and display the results as a line chart. Then, you add this visualization to a new dashboard for flight data.

### Calculate the number of flights that were cancelled each week in 2004

1. On the left-side navigation panel of the Looker User Interface, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    
3. Click the arrow next to **Flights Details**.
    

The available dimensions and measures will be listed in the data panel for Flights Details.

4. Under **Flights Details &gt; Measures**, click **Cancelled Count**.
    
5. Click the arrow next to **Flights**.
    
6. Under **Flights &gt; Dimensions &gt; Depart Date**, click **Week**.
    
7. Under **Flights &gt; Dimensions &gt; Depart Date**, click **Filters** next to **Date**.
    
8. From the **Filters** dropdown list, select **"Is in the year"** and type: **2004**.
    
9. Click **Run**.
    

### Customize a line chart to display the results

1. Click the arrow next to **Visualization** to expand the window.
    

Once the Visualization window has expanded, you can hover your cursor over the icons to identify the available options.

2. Click the **Line** icon.
    

This option creates a Line chart that you can customize. You can also make the chart larger by collapsing the data window.

3. Click on **Settings** () for **Visualization**.
    
4. Click **Series**.
    
5. Click on the point style for **Filled**.
    
6. To add a reference line, click on **Y**, and then click **Markings &gt; Add Reference Line**.
    

![Y tab displaying the completed Reference Line 1 fields in the Markings section](https://cdn.qwiklabs.com/AXCRBMiJPGlKtd078kdlBneKNITULV7QZRtlIQixoQ4%3D align="left")

7. Click on the gear icon for **Visualization** to close the settings.
    

### Save the visualization to a new dashboard

1. Click on **Settings** () next to **Run**, and select **Save &gt; To an existing Dashboard**.
    
2. Enter a title for the visualization: **Number of Flights Cancelled Each Week in 2004**.
    

Leave the default destination as Shared. This will save the new dashboard to **Shared Folders**.

3. Click **New Dashboard**.
    
4. Enter a title for the new dashboard: **Airports and Flights**.
    
5. Click **OK**.
    
6. Click **Save to Dashboard**.
    
7. View the dashboard by clicking on the provided hyperlink titled **Airports and Flights**. When you have finished viewing, click **Cancel**.
    

![Airports and Flights dashboard displaying a graph of the number of flights cancelled each week in 2004](https://cdn.qwiklabs.com/UJSAaeqXNh8aZq5r1shq67I%2BuzbahicP4oBY1Phqm8s%3D align="left")

The colors of your visualization may differ from those shown in the image.

Click *Check my progress* to verify the objective.

Create a line chart of the number of flights cancelled each week in a given year.

Check my progress

## **Task 4. Create a line chart of the number of flights scheduled to depart each week by distance tier**

Pivots allow you to create a matrix of your data, similar to a pivot table in a spreadsheet software. This allows you to leverage multi-dimensional data to answer your questions.

In this task, you first find the number of flights scheduled to depart in each week of the year 2003 by distance tier. Then, you create a line chart to display the results and add this visualization to the dashboard you created in the previous task.

### Calculate the number of flights scheduled to depart each week in 2003 by distance tier

1. On the left-side navigation panel of the Looker User Interface, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    
3. Click the arrow next to **Flights**.
    

The available dimensions and measures will be listed in the data panel for Flights.

4. Under **Flights &gt; Measures**, click **Count**.
    
5. Under **Flights &gt; Dimensions**, click **Pivot** () next to **Distance Tiered**.
    
6. Under **Flights &gt; Dimensions &gt; Depart Date**, click **Filters** () next to **Date**.
    
7. From the **Filters** dropdown list, select **"Is in the year"**, and type: **2003**.
    
8. Under **Flights &gt; Dimensions &gt; Depart Date**, click Week.
    
9. Click **Run**.
    

### Customize a line chart to display the results

1. Click the arrow next to **Visualization** to expand the window.
    

Once the Visualization window has expanded, you can hover your cursor over the icons to identify the available options.

2. Click the **Line** icon.
    

This option creates a stacked pivoted line chart that you can customize. You can also make the chart larger by collapsing the data window.

3. Click **Settings** () for **Visualization**.
    
4. Under **Plot &gt; Series Positioning**, click **Overlay**.
    

![Plot Tab with the Overlay option selected in the Series Positioning section](https://cdn.qwiklabs.com/uzaEpr1TqGwUhOUjoS6DOi2OKReCrT%2Bd75YETWmFeHc%3D align="left")

5. Click **Settings** (
    
    ![settings gear icon](https://cdn.qwiklabs.com/5l7QbWP0MNGiSAzlNwx5cgtBTOs7l%2BEp155GRJm6SZE%3D align="left")
    
    ) for **Visualization** to close the settings.
    

### Save the visualization to an existing dashboard

1. Click **Settings** () next to **Run**, and select **Save &gt; To an existing Dashboard**.
    
2. Enter a title for the visualization: **Number of Flights by Distance Tier in 2003**.
    
3. Select the dashboard you previously created: **Airports and Flights**.
    
4. Click **Save to Dashboard**.
    
5. View the final dashboard by clicking on the provided hyperlink titled **Airports and Flights**.
    

The dashboard for **Airports and Flights** will contain the two visualizations that you added in this lab.

**Note:** You may need to refresh your browser to see the graph.

![Airport and Flights Dashboard displaying graphs for the Number of flights cancelled each week in 2004, and Number of flights by distance tier in 2003](https://cdn.qwiklabs.com/cyxYwunP3U39CkBnEomC%2FtB5GPK9bfmK6nQZK0lmJUU%3D align="left")

The colors of your visualizations may differ from those shown in the image.

Click *Check my progress* to verify the objective.

Create a line chart of the number of flights scheduled to depart each week by distance tier.

---

## Solution of Lab

%[https://youtu.be/kdn_X0k72WY] 

### Task 1 🚀

* **Visualization Type**: Single Value
    
* **Visualization bar**: click Edit: `Style`
    
* **Value Color**: select your choice of color
    
* **Value Format**: `0.00`
    
* **Create Dashboard**: `Airports`
    
* **Title Name**: `Average Elevation`
    

### Task 2 🚀

* **Row limit**: 5
    
* **Visualization Type**: Bar icon
    
* **Values**: Enable `Value Labels`
    
* **Value Format**: 0.00
    
* **Under Y**: click on **Airports** and drag it under **Top Axes**
    
* **Under Y** &gt; **Configure Axes** &gt; **Top 1**, enter an **Axis name**: `Count`
    
* **Title Name**: `Average Elevation by Facility Type`
    

### Task 3 🚀

* **Visualization Type**: Line
    
* **Series**: In point style select `Filled`
    
* **Under Y**: Markings &gt; Click `Add Reference Line`
    
* **Create Dashboard**: `Airports and Flights`
    
* **Title Name**: `Number of Flights Cancelled Each Week in 2004`
    

### Task 4 🚀

* **Visualization Type**: Line
    
* **Under Flights** &gt; **Dimensions**, click **Pivot (pivot icon) next** to `Distance Tiered`
    
* **Under Plot** &gt; **Series Positioning**, click `Overlay`
    
* **Title Name**: `Number of Flights by Distance Tier in 2003`