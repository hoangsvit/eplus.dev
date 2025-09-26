---
title: "Merging Results from Different Explores in Looker - GSP856"
seoTitle: "Merging Results from Different Explores in Looker - GSP856"
seoDescription: "Explores in Looker are designed by your Looker developers to combine the data from your database tables in the best way, using defined relationships between"
datePublished: Wed Apr 16 2025 03:52:38 GMT+0000 (Coordinated Universal Time)
cuid: cm9jebh3200080ajshbbsdn76
slug: merging-results-from-different-explores-in-looker-gsp856
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744775084313/834ff471-78af-4ae3-a91c-436c07eb9ec6.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744775545032/b0ca5b7a-3d60-46e6-8cfe-9ee7d60b7165.png
tags: merging-results-from-different-explores-in-looker-gsp856, merging-results-from-different-explores-in-looker, gsp856

---

## Overview

Explores in Looker are designed by your Looker developers to combine the data from your database tables in the best way, using defined relationships between data fields and tables. Because of this, it is best to use a single Explore to examine your data.

However, there may be times when your Looker developers haven’t created the relationships you need, or they faced technical limitations. In these cases, Looker lets you combine data from different Explores (even from different models or projects) to create data tables and visualizations.

Using the Merged Results feature, you can create a query from an Explore and then add queries from other Explores to display the merged results in a single table. From there, you can examine the data, pivot fields, and create visualizations.

**Note:** The Merged Results feature has a limit of 5,000 rows of data for each of the merged queries. If you include queries that return more than 5,000 rows of data, only the first 5,000 rows returned are included in the merged results.

When you merge queries, you start out by creating a single query from a single Explore, and then you combine other queries with that first query.

By default, that first query is considered the primary query. This is an important concept because when Looker matches the data to create the merged results, it matches each added query to the primary query (not to any other added query).

So, whenever you add a query, you need to include a dimension that can be matched to a dimension in the primary query.

Learn more about merged results from the [Merging results from different Explores documentation](https://docs.looker.com/exploring-data/exploring-data/merged-results#understanding_merged_results).

## Objectives

In this lab, you learn how to merge results from different explores by doing the following:

* Create a primary query and a next source query
    
* Check merge results and run a merge
    
* Edit the merged results
    
* Save your merged results to a dashboard
    

## Setup

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
    
    ```apache
    looker-developer@qwiklabs.net
    ```
    
    Password:
    
    ```apache
    YyzQk8yhmFv01Oo37BLSHrLjW4Iparf49u9KUFmqPck=
    ```
    
    **Important:** You must use the credentials from the Lab Details pane on this page. Do not use your Google Cloud Skills Boost credentials. If you have a personal Looker account, do not use it for this lab.
    
4. Click **Log In**.
    
    After a successful login, you see the Looker instance for this lab.
    

## Task 1. Create a primary query

To merge the results from multiple queries, you start with a beginning query, which is considered the *primary* query.

1. In the Looker navigation menu, click **Explore**. Under **FAA**, click **Flights**.
    
2. In the left pane, under **All Fields**, expand **Flight Details**.
    
3. Click **Carrier** and **Flight Num**.
    
    You can reorder selected fields in the right pane by dragging and dropping the field name.
    
4. Expand **Aircraft Origin** and click **City**.
    
5. Expand **Flight Details** and in **MEASURES**, click **Cancelled Count**.
    
6. Expand **Arrival Date**, hover over **Year**, and click **Filter by field**.
    
    ![Expanded Arrival Date dropdown menu with filter button highlighted on the Year option](https://cdn.qwiklabs.com/21pCgAIgrKXReFbKcshhfn40to23dC7DqCeEmp557gw%3D align="left")
    
7. In the **Filters** pane, set **Flights Details Arrival Year** to **is in the year**, and enter `2000`.
    
8. Click **Run** to see the results of the primary query.
    
    You'll see the results of flight details and total cancellations for flights in the year 2000.
    

## Task 2. Add the next source query

Once you've created your primary query, you can add another source query. Now that we have flight data, let's merge it with airport information for the flight airport of origin.

1. In the top right pane of the **Explore** for your primary query, click Settings ().
    
2. Click **Merge Results**. This will open the **Choose an Explore** window.
    
    Looker opens the Explore in the Edit Query window, where you can build the new query to be merged into your primary query.
    

**Note:** To merge queries, Looker finds dimensions in the queries whose values can be matched. Be sure that your queries contain at least one common dimension whose values can be matched exactly.

For example, if both queries have a Date dimension, but one query uses “2017-10-01” as a value and the other query uses “October 2017” as a value, Looker can’t use that dimension to merge the queries.

3. In the **Choose an Explore** window, click **Airports**.
    
4. In the **All Fields** pane, click **City** and **Average Elevation**.
    

**Note:** When creating a source query for merged results, be sure to include at least one dimension that will exactly match a dimension in the primary query.

5. Click **Run** to see the results of the source query.
    
    The results show the City and Average Elevation for airports.
    
6. Click **Save** to merge the query into your primary query.
    

## Task 3. Check the merge rules and run the merge

Looker automatically finds the best dimensions to use for matching the queries and displays these matches in the Merge Rules section. Looker shows how each query will be merged with the primary query.

Review the dimensions that Looker used to match the queries. Your Primary search on Flights should be using Aircraft Origin City to merge by the Secondary search of Airports on Airports City.

1. Change the dropdowns so that the correct dimensions are used in the merge rule.
    
    ![Merge Rules section with Aircraft Origin City selected in the Flights field and Airports City selected in the Airports field](https://cdn.qwiklabs.com/P6OtDjrZhMFHmYXMYZ3gktq%2BmkQB8OkdI5tSiFds%2BhU%3D align="left")
    
2. Click **Run** to view the results of your merged results.
    
3. Click on Airports Average Elevation to sort the values in descending order.
    
4. Expand the **Visualization** pane and click on the different chart options to explore useful visualizations for your merged results.
    

## Task 4. Edit the merged results

Once you have your merged results, you still have the flexibility to edit the merged queries and the rules used to merge the queries.

### Edit the primary source query

Let's add information about the destination airports to the source query.

1. In the **Source Queries** pane, click the gear icon next to Flights and then click **Edit**.
    
    There should be a label *Primary* next to the gear icon.
    
2. In the left pane, click **All Fields**.
    
3. Expand **Aircraft Destination** and click **City**.
    
4. Click **Run** to view the results of your modified primary query.
    
5. Click **Save** to save the primary source query.
    

## Task 5. Save your merged results to a dashboard

1. Expand the **Visualization** pane and select **Table**.
    
    ![Visualization pane displaying table](https://cdn.qwiklabs.com/E7P1Kl3HWQgL%2BAOvyuT%2B0jbO3PCLwV8zCZz8dt6X%2FAI%3D align="left")
    
2. In the top right pane of the Explore for your **Merged Results**, click the gear icon.
    
3. Click **Save to Dashboard**.
    
4. For **Title**, type `Flight Cancellations & Elevation`.
    
5. Click **New Dashboard**.
    
    ![Add to a Dashboard in this folder window with New Dashboard button highlighted](https://cdn.qwiklabs.com/Zpdt41XEdXFg3Gz1hwy1652dK0spiZs4wT2W7j%2B1LxA%3D align="left")
    
6. For the dashboard name, type `Airport Data` and click **OK**.
    
    ![Airport Data entered in the Enter the new Dashboard name field. The OK button is highlighted.](https://cdn.qwiklabs.com/yxl070%2BThwP6zwPZ%2FaKPjFvYiU5wpgeRYxZAyJhPWR8%3D align="left")
    
7. Click **Save to Dashboard**.
    
8. In the green banner in the top pane, click the link to **Airport Data** to access your new dashboard.
    
    You can also get to your new dashboard by clicking **Folders** &gt; **Shared Folders** and clicking your dashboard.
    
    ![Airport Data dashboard](https://cdn.qwiklabs.com/aVa2Tm3Z8o8yo4J7VJyf2RtDPvhcs04kIDEYYjbBVD8%3D align="left")
    
    Click **Check my progress** to verify the objective.
    
    Create Dashboard along with the Merged Results
    
    **Check my progress**
    

---

## Solution of Lab

%[https://youtu.be/ssCIDyNwcl8]