---
title: "Filtering and Sorting Data in Looker - GSP855"
seoTitle: "Filtering and Sorting Data in Looker - GSP855"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Tue Feb 18 2025 12:01:13 GMT+0000 (Coordinated Universal Time)
cuid: cm7afo8rk000009jvb7tt7ze9
slug: filtering-and-sorting-data-in-looker-gsp855
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739875710542/c3d42ea7-2c58-477b-b57f-dd32c9bd593d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1739880061232/df3dc9d6-bc01-42e4-906d-e3ce8c442c64.png
tags: filtering-and-sorting-data-in-looker-gsp855, filtering-and-sorting-data-in-looker, gsp855

---

## **Overview**

In this lab, you learn how to use Looker to query sorted and filtered data, create Looks, and add them to a Dashboard. For this lab, an Explore of the Federal Aviation Administration's (FAA) Airport data has been created for you. This dataset contains information on different attributes of airports such as city, date of commission, facility type, etc.

You can learn more about creating Explores from the [Exploring data in Looker documentation](https://docs.looker.com/exploring-data/exploring-data).

### What you'll learn

In this lab, you learn how to:

* Use filters to select desired data from Dimensions and Measures
    
* Create table visualizations on sorted and filtered data
    
* Save Explore queries as Looks
    
* Add Looks to a dashboard
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** If you already have a personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to Looker

1. When ready, click **Start Lab**.
    
    The Lab Details pane appears with the temporary credentials that you must use for this lab.
    
    If you need to pay for the lab, a pop-up opens for you to select your payment method.
    
    Notice your lab credentials in the Lab details pane. You use them to sign in to the Looker instance for this lab.
    
    **Note:** If you use other credentials, you will get **errors or incur charges**.
    
2. Click **Open Looker**.
    
3. Enter the provided Username and Password in the **Email** and **Password** fields.
    
    Username:
    
    ```javascript
    looker-developer@qwiklabs.net
    ```
    
    Copied!content\_copy
    
    Password:
    
    ```javascript
    YyzQk8yhmFv01Oo37BLSHrLjW4Iparf49u9KUFmqPck=
    ```
    
    Copied!content\_copy
    
    **Important:** You must use the credentials from the Lab Details pane on this page. Do not use your Google Cloud Skills Boost credentials. If you have a personal Looker account, do not use it for this lab.
    
4. Click **Log In**.
    
    After a successful login, you see the Looker instance for this lab.
    

## **Task 1. Filter on Dimensions**

In this section, you will find the number of flights that were cancelled each week in the year 2004 and display the resulting data points in a line chart.

1. In the **Looker navigation menu**, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    
3. Under **Flight Details &gt; Measures**, click **Cancelled Count**.
    
4. Under **Flights &gt; Dimensions &gt; Depart Date**, click **Week**.
    
5. Within the **Depart Date** dimension group, click on the **Filter** button next to the **Date** dimension.
    
6. In the filter window, set the **Depart Date** filter to: `is in the year 2004`.
    
7. Click **Run**.
    
8. Click the arrow next to **Visualization** to expand the window.
    

Once the Visualization window has expanded, you can hover your cursor over the icons to identify the available options.

9. Change visualization type to **Line**.
    
10. Click on the settings gear icon for **Visualization**.
    
11. Click **Edit &gt; Series**.
    
12. Under **Colors &gt; Collection**, select your choice of theme/color.
    
13. Under **Point Style**, click on **Outline**.
    
14. Navigate to the **Y** menu of the visualization setting pane, scroll down to the bottom, and click on the **Add Reference Line** button. Ensure that the type is set to “Line” and that the value is set to “Average (Mean)”.
    
15. Click on the gear icon for **Visualization** to close the settings.
    
16. Click on the settings gear icon next to **Run**, and select **Save** &gt; **As a Look**.
    
17. Title the Look **Cancelled Flight Count by Week in 2004**.
    
18. Click **Save**.
    

![Cancelled Flight Count by Week in 2004 line chart on the Visualization page](https://cdn.qwiklabs.com/QMkFTa1y9ODqyw54PTLR2kdkubJL09hVD0tEHwF72zA%3D align="left")

Click *Check my progress* to verify the objective.

Create your first Look.

Check my progress

## **Task 2. Filter on Measures**

In this section, you will create a table visualization that shows the Count of Long Flights and the Total Distance flown by Carrier, but only for Carriers with a Percentage of Long Flights &lt;= 25%.

1. In the **Looker navigation menu**, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    
3. Under **Flights &gt; Measures**, click **Count Long Flight**.
    
4. Under **Flights &gt; Measures**, click **Total Distance**.
    
5. Under **Carriers &gt; Dimensions**, click **Name**.
    
6. Under **Flights &gt; Measures**, click on the **Filter** button next to the **Percentage Long Flights** measure.
    
7. In the filter window, set the filter to: `is less than or equal to .25`.
    
8. Click **Run**.
    
9. Click the arrow next to **Visualization** to expand the window.
    

Once the Visualization window has expanded, you can hover your cursor over the icons to identify the available options.

10. Change visualization type to **Table**.
    
11. Click on the settings gear icon for **Visualization**.
    
12. Click **Edit &gt; Plot**.
    
13. Select “Gray” for the **Table Theme**.
    
14. Toggle **Show Row Numbers** *off*.
    
15. Click on the gear icon for **Visualization** to close the settings.
    
16. Click on the settings gear icon next to **Run**, and select **Save** &gt; **As a Look**.
    
17. Title the Look **Total Distance and Long Flight Count by Carrier**.
    
18. Click **Save**.
    

![Total Distance and Long Flight Count by Carrier table on the Visualization page](https://cdn.qwiklabs.com/8IoTtjiuIgGAaHQmk53H%2F3iiLheUOJHxVAM6Scgja8o%3D align="left")

Click *Check my progress* to verify the objective.

Create your second Look.

Check my progress

## **Task 3. Add Looks to a dashboard**

In this section, you will add your newly created Looks to a Dashboard and visualize them side-by-side.

1. In the **Looker navigation menu**, click **Folders**.
    
2. Select **My folder**.
    

You should see the Looks you just created.

3. Click the `Cancelled Flight Count by Week in 2004` Look.
    
4. Click on the settings gear icon next to **Run**, and select **Save** &gt; **To an existing dashboard**.
    
5. Click **New Dashboard**.
    
6. Enter a title for the new dashboard: **Flights Data**.
    
7. Click **Add Look to Dashboard**.
    

You will now repeat the same process for the second Look you created.

8. Navigate back to **Folders &gt; My folder**.
    
9. Click the `Total Distance and Long Flight Count by Carrier` Look.
    
10. Click on the settings gear icon next to **Run**, and select **Save** &gt; **To an existing dashboard**.
    
11. Select the dashboard you previously created: **Flights Data**.
    
12. Click **Add Look to Dashboard**.
    

Now that you've added both Looks to your new dashboard, you can view it.

13. Navigate back to **Folders &gt; My folder**.
    
14. Under Dashboards, select **Flights Data**.
    

Now you can play around with your interactive Looks inside of your newly created Dashboard!

Click *Check my progress* to verify the objective.

Add Looks to a Dashboard.

---

## Solution of Lab

%[https://youtu.be/b1fn0JCYVXc] 

### ✅ Task 1 – Filter on Dimensions

**Goal:** Create a Look showing the number of cancelled flights each week in 2004 as a **line chart**.

1. From the Looker navigation menu, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    
3. In the **Field Picker** (left panel):
    
    * Under **Flight Details &gt; Measures**, select ✅ **Cancelled Count**.
        
    * Under **Flights &gt; Dimensions &gt; Depart Date**, select ✅ **Week**.
        
4. Still under **Depart Date**, click the **Filter** icon next to **Date**.
    
5. In the filter options:
    
    * Set **Depart Date** to **is in the year 2004**.
        
6. Click **Run** to execute the query.
    

**📈 Visualization:**

* Expand the **Visualization** pane (arrow next to Visualization).
    
* Change visualization type to **Line**.
    
* Click the **⚙️ gear icon** → **Edit &gt; Series**:
    
    * Under **Colors &gt; Collection**, choose a color theme.
        
    * Under **Point Style**, select **Outline**.
        
* Go to the **Y** tab:
    
    * Scroll to the bottom and click **Add Reference Line**.
        
    * Set **Type:** `Line`
        
    * Set **Value:** `Average (Mean)`
        

Click the gear icon again to close the settings panel.

**💾 Save the Look:**

* Click the gear icon next to **Run** → **Save &gt; As a Look**.
    
* **Title:** `Cancelled Flight Count by Week in 2004`
    
* Click **Save**.
    

✅ **Result:** A line chart showing weekly cancelled flights in 2004 with an average reference line.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758904669450/3235811c-1481-43ec-ac3e-0a5c61b75ce1.png align="center")

---

### ✅ Task 2 – Filter on Measures

**Goal:** Create a **table** showing long flight count and total distance by carrier, filtered by percentage of long flights ≤ 25%.

1. From the navigation menu, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    
3. In the **Field Picker**:
    
    * Under **Flights &gt; Measures**, select ✅ **Count Long Flight**.
        
    * Under **Flights &gt; Measures**, select ✅ **Total Distance**.
        
    * Under **Carriers &gt; Dimensions**, select ✅ **Name**.
        
4. Under **Flights &gt; Measures**, click the **Filter** icon next to **Percentage Long Flights**.
    
5. Set the filter to: **is less than or equal to 0.25**.
    
6. Click **Run**.
    

**📊 Visualization:**

* Expand the **Visualization** pane.
    
* Change visualization type to **Table**.
    
* Click the **⚙️ gear icon** → **Edit &gt; Plot**:
    
    * **Table Theme:** `Gray`
        
    * Toggle **Show Row Numbers** → Off
        

Close the settings panel.

**💾 Save the Look:**

* Click the gear icon next to **Run** → **Save &gt; As a Look**.
    
* **Title:** `Total Distance and Long Flight Count by Carrier`
    
* Click **Save**.
    

✅ **Result:** A table showing carriers, total distance, and count of long flights where the percentage of long flights ≤ 25%.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758904976367/32643bec-bc12-4f26-aa7c-710d71d6b1f8.png align="center")

---

### ✅ Task 3 – Add Looks to a Dashboard

**Goal:** Combine the two Looks you created into a single interactive dashboard.

**📁 Add the First Look:**

1. Go to **Folders &gt; My folder**.
    
2. Click on the Look **Cancelled Flight Count by Week in 2004**.
    
3. Click the gear icon next to **Run** → **Save &gt; To an existing dashboard**.
    
4. Click **New Dashboard**.
    
5. Enter the dashboard title: `Flights Data`.
    
6. Click **Add Look to Dashboard**.
    

**📁 Add the Second Look:**

1. Go back to **Folders &gt; My folder**.
    
2. Click the Look **Total Distance and Long Flight Count by Carrier**.
    
3. Click the gear icon → **Save &gt; To an existing dashboard**.
    
4. Choose the existing dashboard: `Flights Data`.
    
5. Click **Add Look to Dashboard**.
    

**📊 View the Dashboard:**

* Navigate to **Folders &gt; My folder &gt; Dashboards**.
    
* Click **Flights Data**.
    

✅ **Result:** A dashboard containing:

* A line chart of cancelled flights per week (2004).
    
* A table of long flight counts and total distance per carrier.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758905197506/dbe05f19-0266-45b3-b983-f54e84f0a5a4.png align="center")