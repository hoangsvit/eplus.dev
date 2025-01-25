---
title: "Embedding Maps in Looker BI (Solution)"
seoTitle: "Embedding Maps in Looker BI (Solution)"
seoDescription: "Looker is a modern cloud-based business intelligence (BI) platform in Google Cloud that lets you analyze and visualize your data interactively. You can use "
datePublished: Sat Jan 25 2025 10:22:17 GMT+0000 (Coordinated Universal Time)
cuid: cm6c1kkoo000109l4e03tbhsn
slug: embedding-maps-in-looker-bi-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737800295348/b9c71adb-227a-437b-9db3-6d5ea85527b6.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1737800525726/ea65aa4f-f30d-4172-b08d-b82d067c1f5e.png
tags: embedding-maps-in-looker-bi-solution, embedding-maps-in-looker-bi, embedding-maps-in-looker-bi-solution-2025

---

## **Introduction**

Looker is a modern cloud-based business intelligence (BI) platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

Looker provides business teams the ability to analyze supply chains, market digitally, quantify customer value, decipher customer behavior, and evaluate distribution processes. The dashboards allow presenting data and insights using customizable charts, graphs and reports. All dashboards and queries can be drilled into, so users can discover information in multiple layers. Looks and dashboards are the two major building blocks in Looker. This document walks you through the steps involved in creating looks with the inbuilt map based visualizations and also by adding a custom map layer.

## **Objective**

The objective of this document is to describe and demonstrate how maps based visualizations can be created in Looker. This document provides a step by step detailed guide on how to add the inbuilt map based visualizations and also adding a custom map layer based on TopoJSON data in Looker.

## **Prerequisite**

For using Google Maps visualization instead of Map(Legacy) ensure that the below feature is enabled.

‘The New Explore Visualizations Labs feature, which should be enabled by default. This is under admin--&gt; general --&gt; labs --&gt; toggle button for New Explore Visualizations’

What you will do:

* Create a map based visualization using the inbuilt Looker Feature
    
* Represent metrics/attributes
    
* Create a map based visualization using a custom Map Layer
    
* Add a TopoJSON file to represent custom Map
    
* Use the custom Map Layer to represent metrics/attributes
    

## **Setup and requirements**

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Make sure you signed into Qwiklabs using an **incognito window**.
    
2. Note the lab's access time (for example, and make sure you can finish in that time block.
    

<aside><p>There is no pause feature. You can restart if needed, but you have to start at the beginning.</p><br /></aside>

3. When ready, click .
    
4. Note your lab credentials. You will use them to sign in to the Google Cloud Console.
    
5. Click **Open Google Console**.
    
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts.
    

<aside><p>If you use other credentials, you

7. Accept the terms and skip the recovery resource page.
    

<aside><p>Do not click<span> </span><strong>End Lab</strong><span> </span>unless you are finished with the lab or want to restart it. This clears your work and removes the project.</p></aside>

#### **Before you click the Start Lab button**

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long lab resources will be made available to you.

This Qwiklabs hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Looker for the duration of the lab.

#### **What you need**

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    
* Time to complete the lab.
    

1. When ready, click .
    
    A new panel will appear with the temporary credentials that you must use for this lab.
    
    If you need to pay for the lab, a pop-up will open for you to select your payment method.
    
2. Note your lab credentials. You will use them to sign in to the Looker instance for this lab.
    
    ![looker-credentials.png](https://cdn.qwiklabs.com/mWAUa1y8pj%2BZMbJct88I3epev%2Bw0MbnPfmnJecoeJV0%3D align="left")
    
    If you use other credentials, you will get **errors or incur charges**.
    
3. Click **Open Looker**.
    
4. Enter the provided Username and Password in the Email and Password fields.
    
    ![looker-login-page.png](https://cdn.qwiklabs.com/FWeKHXtSieW5PkkJzm7qx8wZUv6S4V1ITo2GpBcLCK8%3D align="left")
    
    **Important:** You must use the credentials from the Connection Details panel on this page. Do not use your Qwiklabs credentials. If you have your own Looker account, do not use it for this lab.
    
5. Click **Log In**.
    
    After a successful login, you will see the Looker instance for this lab.
    

## **Task 1 - Create Looks with Map based visualizations**

### Look #1- Choropleth Map: Plot carriers operating count by state on Maps

In this section, you will need to use the **Airports** dataset to build a visualization that answers the following question represented on a choropleth map: How many carriers operate for each state?

1. In the **Looker Navigation menu**, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    

![Img1.png](https://cdn.qwiklabs.com/asJFmsB6YXPIoFRCn2Tp%2FEl1X66kle0q9S9Tvea5iUU%3D align="left")

3. The available dimensions and measures will be listed in the data panel for Flights.
    
4. Under **Carriers** &gt; **Measures**, click **Count**.
    

![Img2.png](https://cdn.qwiklabs.com/RihZ64O0%2F1QieXg589xoXCpO4QdJGkt1SicTbveleu8%3D align="left")

5. Under **Aircraft Origin** &gt; **Dimensions**, select **State**.
    

![Img3.png](https://cdn.qwiklabs.com/gObUxGjstt2zbnr%2B4q8I3Vsntyq7u3jOvtrqaQg%2BtjA%3D align="left")

6. Click **Run**.
    
7. Click the arrow next to **Visualization** to expand the window.
    
8. Once the Visualization window has expanded, Choose the **Map** Visualization.
    

![Img4.png](https://cdn.qwiklabs.com/FJtofzfmqqolFF6KZWwUi%2FFkkj6ZReJE45qZk4xtXb8%3D align="left")

9. A map should appear with US states.
    
10. Click on edit option. Go to the **value** tab. Toggle the **reverse color scale** option.
    
11. The map visualization should appear as below.
    

![Img7.png](https://cdn.qwiklabs.com/RQQoLxMEqt47PPRnZXpE%2FdD77ml1d5Rjh20A82XQ8Oc%3D align="left")

12. Notice the tooltip by taking the cursor to a state.
    
13. Save this visualization as a dashboard. Click on **settings** icon and then click on **save as a new dashboard**.
    
14. Title the Dashboard as **Carriers count against states**.
    

![Img8.png](https://cdn.qwiklabs.com/r8yvVYk7cc5fOZ7q4sfV2sd4bqt74V3XfMjSMv66djc%3D align="left")

Click **Check my progress** to verify the objective.

Create Looks with Map based visualizations

Check my progress

### Look #2 - Map with Lines: Count of Flights connecting a state

In this section, you will need to use the Airports dataset to build a visualization that answers the following question represented on a map: How many flights originating from Atlanta, GA got delayed?

15. In the **Looker Navigation menu**, click **Explore**.
    
16. Under the **FAA**, click **Flights**.
    
17. The available dimensions and measures will be listed in the data panel for Flights.
    

![Img9.png](https://cdn.qwiklabs.com/asJFmsB6YXPIoFRCn2Tp%2FEl1X66kle0q9S9Tvea5iUU%3D align="left")

18. Click on the top left burger **Main menu**, enable **Development Mode**.
    
19. On the top bar you should see message: **You are in Development Mode**.
    

![Img10.png](https://cdn.qwiklabs.com/VprTXXvROtJQCP15t%2F5JcPkgpKUviinpfSbscKbtWbw%3D align="left")

20. Go to Bottom left of the window and click on **Go to LookML**.
    
21. It will open an another window.
    
22. Go to **File Browser &gt; qwiklabs-flights-maps.model.lkml**, and verify that **map\_location** is available under `aircraft_destination` fields
    

![Img11.png](https://cdn.qwiklabs.com/xFr%2FIcpSJpg7GzWLNmSCkx3TsVRNT9GFDSwJIAiAB0w%3D align="left")

23. Go back to **Explore** from the main burger menu from the top left.
    
24. Under **Flights &gt; Measures**, click **Count**.
    
25. Under **Aircraft Origin &gt; Dimensions**, select **Map Location**.
    
26. Under **Aircraft Destination &gt; Dimensions**, select **Map Location**.
    
27. Click **Run** and see the map in visualization then follow filter steps
    
28. Now, Add filters on the left pane.
    
    **a.** **Aircraft Origin &gt; Dimensions &gt; City** Click on the **Filter by Field**.
    
    **i.** Enter **ATLANTA** in the box, keep the condition as **is equal to**.
    
    **b.** **Flights Details &gt; Dimensions &gt; Arrival Date &gt; Year**, Click on the **Filter by Field**.
    
    **i.** Enter **2004** in the box, keep the condition as **is in the year**.
    
    **c.** **Aircraft Destination &gt; Dimensions &gt; State**, Click on the **Filter by Field**.
    
    **i.** Enter **CA, WA, CO, NV, UT, AK, HI, OR, LA, ID, WY** in the box, keep the condition as **is equal to**.
    
29. Applied filters should look like this in the Filters pane
    

![Img12.png](https://cdn.qwiklabs.com/4PMHAou70XL%2F4dduKCbQeJcq5xf5x59Zr6SPc8Nuf7Y%3D align="left")

30. Click **Run**.
    
31. Click the arrow next to **Visualization** to expand the window.
    
32. Click the **Map** option on the **visualization** pane. A map should appear with US states.
    
33. Click on the edit option. Go to the **Plot** tab. Check the connect with lines option.
    

![Img13.png](https://cdn.qwiklabs.com/YEOIloTgur4s49ihxM1FeAVGB1bC7L3Y8ocEtqK8GfM%3D align="left")

34. On the edit option, go to the **Points** tab. Select **Type** as **Icon** and **Icon** as **Airplane**.
    

![Img14.png](https://cdn.qwiklabs.com/Lg0WBx36sP0J25IF277iKp8Lr3BX6C2r0cwcF%2FyutN8%3D align="left")

35. The map visualization should appear as shown below.
    

![Img15.png](https://cdn.qwiklabs.com/WCotbA6ZM6rFg6JsfOPIWPNonFwuB1W4dxq0teUjqzc%3D align="left")

36. Notice the tooltip by taking the cursor to an icon.
    
37. Save this visualization as a dashboard. Click on **settings** icon and then click on **save as a new dashboard**.
    
38. Title the Dashboard as **Delayed flights count originating from Atlanta, GA**.
    

![Img16.png](https://cdn.qwiklabs.com/Vd9X%2FXzEswb6AFW%2BlwdqwNfnKcMAz8lhRorgnZwaefc%3D align="left")

Click **Check my progress** to verify the objective.

Map with Lines Count of Flights connecting a state

Check my progress

## **Task 2 - Create Looks with Custom Map Layer based visualizations**

In this section, you will need to use the **Aircraft** dataset to build a visualization that answers the following question represented on a **custom layer map**: Compare airport counts at West and Midwest region level.

1. In the **Looker Navigation menu**, click **Explore**.
    
2. Under the **FAA**, click **Flights**.The available dimensions and measures will be listed in the data panel for Flights.
    

![Img18.png](https://cdn.qwiklabs.com/tq1Nn31UwMJ1KoTkaVp9yZochZJNlwYHUYn5vi7fai0%3D align="left")

3. On the left pane, click on **Go to LookML** link(at the bottom).
    
4. The file browser is opened.
    
5. Check the file is seen under the maps folder.
    
6. Click on the **qwiklabs-flights-maps.model** file. You should be able to see the underlying LookML code.
    

![Img19.png](https://cdn.qwiklabs.com/rbUJNAInJI9Eh0mjS2SGhRFhYXx7in%2FKOd%2BZILx220g%3D align="left")

7. Create a map layer representing the West and Midwest regions. Add the below snippet.
    

```apache
map_layer: data_area {
  file: "maps/US_West_Midwest.topojson"
}

```

Copied!content\_copy

8. Save the changes.
    

![Img20.png](https://cdn.qwiklabs.com/Opm8svSaN%2BApSde2FuCB7X6pzGelaCMO1IiN1WXLcyk%3D align="left")

9. This adds the new map layer with name as **data\_area**.
    
10. Now, create a dimension in the view, click on **aircraft.view** and remove the region filter as shown in below image.
    

![Img244.png](https://cdn.qwiklabs.com/L2hI2iLqstL12ey2IPLSIH4%2FZRh7eLhnKlM3%2Fd2sRU4%3D align="left")

11. Now add the below code snippet in this view.
    

```apache
  dimension: region {
    type: string
    case: {
      when: {
        sql: ${state} in ('WA','OR','CA','NV','UT','WY','ID','MT','CO','AK','HI') ;;
        label: "West"
      }
      when: {
        sql: ${state} in ('AZ','NM','TX','OK') ;;
        label: "Southwest"
      }
      when: {
        sql: ${state} in ('ND','SD','MN','IA','WI','MN','OH','IN','MO','NE','KS','MI','IL') ;;
        label: "Midwest"
      }
      when: {
        sql: ${state} in ('MD','DE','NJ','CT','RI','MA','NH','PA','NY','VT','ME','DC') ;;
        label: "Northeast"
      }
      when: {
        sql: ${state} in ('AR','LA','MS','AL','GA','FL','SC','NC','VA','TN','KY','WV') ;;
        label: "Southeast"
      }
      else: "Unknown"
    }
    map_layer_name: data_area
    drill_fields: [state]
  }
```

Copied!content\_copy

12. Notice the map\_layer\_name is **data\_area**. Also, it enables you to set drill fields, region to state, city.
    

![Img21.png](https://cdn.qwiklabs.com/e7SHcAu1is%2Bb4saABNUp0c85SuxcZtX02%2B9zddu74jA%3D align="left")

13. Save the changes.
    

![Img22.png](https://cdn.qwiklabs.com/i%2FwSgpG1JWZgTQdW4C%2BB1Jy%2Fr%2F%2BEbjIAt5uaFWtDQTY%3D align="left")

14. Click **Explore**.
    
15. Under the **FAA**, click **Flights**.
    
16. On the left pane, Under **Aircraft &gt; Dimensions**, select **Region**.
    
17. Under **Aircraft &gt; Measures**, select **Count**.
    
18. Click **Run**.
    
19. Click the arrow next to Visualization to expand the window.
    
20. Once the Visualization window has expanded, Choose the **Map** Visualization.
    

![Img23.png](https://cdn.qwiklabs.com/YOAI8Jd09xUYAlmJoN7MccCG%2B1c4rVEpNNksW8IEE7o%3D align="left")

21. Click the **Map** option. A map should appear with US states showing two regions **West** and **Midwest**.
    

![Img24.png](https://cdn.qwiklabs.com/vUVNCcRAxjmUwv95262XjFUJwSwVC0Oue568mVBbMfc%3D align="left")

22. Save this visualization as a dashboard. Click on **settings** and then **save as a new dashboard**.
    

![Img8.png](https://cdn.qwiklabs.com/r8yvVYk7cc5fOZ7q4sfV2sd4bqt74V3XfMjSMv66djc%3D align="left")

23. Title the Dashboard as **Airport counts for West and Midwest regions in US**.
    

Click **Check my progress** to verify the objective.

Create Looks with Custom Map Layer based visualizations

Check my progress

24\. Dashboard shows the look with the aircraft's count in West and Midwest Regions.

25. Click on one of the regions and then click on **state** to drill down.
    

![Img25.png](https://cdn.qwiklabs.com/thtEMGKBWYMx9GbS25Jrq2ny2jiwTrxgQNHNinsAZBc%3D align="left")

26. State level aircraft count is shown.
    
27. Notice the option to download the visualization.
    

![Img26.png](https://cdn.qwiklabs.com/E%2F0K%2F4%2ByUGND5x%2BvJxTN8D0EMPYvuJdjKUayvwTvhW8%3D align="left")

28. Close the window.
    
29. Click on **table** option to switch to tabular view.
    

![Img27.png](https://cdn.qwiklabs.com/mwPWxFZamrnIsw7TtFvvNtCKGZYKxnLK4sBYdiCCLYY%3D align="left")

30. The related results are available for download.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=meOqNIMU93Y&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

### qwiklabs-flights-maps.model

```apache
connection: "bigquery_public_data_looker"
# include all views in this project
include: "*.view"
include: "/z_tests/*.lkml"

map_layer: data_area {
  file: "maps/US_West_Midwest.topojson"
}

explore: airports {
  group_label: "FAA"
}

explore: flights {
  group_label: "FAA"
  description: "Start here for information about flights!"
  join: carriers {
    type: left_outer
    sql_on: ${flights.carrier} = ${carriers.code} ;;
    relationship: many_to_one
  }

  join: aircraft {
    type: left_outer
    sql_on: ${flights.tail_num} = ${aircraft.tail_num} ;;
    relationship: many_to_one
  }

  join: aircraft_origin {
    from: airports
    type: left_outer
    sql_on: ${flights.origin} = ${aircraft_origin.code} ;;
    relationship: many_to_one
    fields: [full_name, city, state, code, map_location]
  }

  join: aircraft_destination {
    from: airports
    type: left_outer
    sql_on: ${flights.destination} = ${aircraft_destination.code} ;;
    relationship: many_to_one
    fields: [full_name, city, state, code, map_location]
  }

  join: aircraft_models {
    sql_on: ${aircraft.aircraft_model_code} = ${aircraft_models.aircraft_model_code} ;;
    relationship: many_to_one
  }
}


# Place in `qwiklabs-flights-maps` model

explore: +flights {
  
    query: quicklab_task_1{
      dimensions: [aircraft_origin.state]
      measures: [carriers.count]
    }
  }


# Place in `qwiklabs-flights-maps` model
explore: +flights {
    query: quicklab_task_2{
      dimensions: [aircraft_destination.map_location, aircraft_origin.map_location]
      measures: [count]
      filters: [
        aircraft_destination.state: "CA,WA,CO,NV,UT,AK,HI,OR,LA,ID,WY",
        aircraft_origin.city: "ATLANTA^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ",
        flights.arrival_year: "2004"
      ]
  }
}

# Place in `qwiklabs-flights-maps` model

explore: +flights {
    query: quicklab_task_3 {
      dimensions: [aircraft.region]
      measures: [aircraft.count]
    }
  }
```

### aircraft.view

```apache

view: aircraft {
  sql_table_name: `cloud-training-demos.looker_flights.aircraft` ;;

  dimension: tail_num {
    type: string
    primary_key: yes
    sql: rtrim(${TABLE}.tail_num) ;;
  }

  dimension: address1 {
    type: string
    sql: ${TABLE}.address1 ;;
  }

  dimension: address2 {
    type: string
    sql: ${TABLE}.address2 ;;
  }

  dimension_group: air_worth {
    type: time
    timeframes: [time, date, week, month, year, raw]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.air_worth_date ;;
  }

  dimension: aircraft_engine_code {
    type: string
    sql: ${TABLE}.aircraft_engine_code ;;
  }

  dimension: aircraft_engine_type_id {
    type: number
    sql: ${TABLE}.aircraft_engine_type_id ;;
  }

  dimension: aircraft_model_code {
    type: string
    sql: ${TABLE}.aircraft_model_code ;;
  }

  dimension: aircraft_serial {
    type: string
    sql: ${TABLE}.aircraft_serial ;;
  }

  dimension: aircraft_type_id {
    type: number
    sql: ${TABLE}.aircraft_type_id ;;
  }

  dimension_group: cert_issue {
    type: time
    timeframes: [time, date, week, month, year, raw]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.cert_issue_date ;;
  }

  dimension: certification {
    type: string
    sql: ${TABLE}.certification ;;
  }

  dimension: city {
    type: string
    sql: ${TABLE}.city ;;
  }

  dimension: country {
    type: string
    map_layer_name: countries
    sql: ${TABLE}.country ;;
  }

  dimension: county {
    type: string
    sql: ${TABLE}.county ;;
  }

  dimension: fract_owner {
    type: string
    sql: ${TABLE}.fract_owner ;;
  }

  # Don't use this one. It complicates the custom measure exercise.
  # Can't just hide it because hidden fields still show up as suggestions in custom fields.
  # dimension_group: last_action {
  #   hidden: yes
  #   type: time
  #   timeframes: [time, date, week, month, raw]
  #   convert_tz: no
  #   datatype: date
  #   sql: ${TABLE}.last_action_date ;;
  # }

  dimension: last_action_year {
    type: number
    sql: EXTRACT(YEAR FROM ${TABLE}.last_action_date) ;;
  }

  dimension: mode_s_code {
    type: string
    sql: ${TABLE}.mode_s_code ;;
  }

  dimension: name {
    type: string
    sql: ${TABLE}.name ;;
  }

  dimension: region {
    type: string
    case: {
      when: {
        sql: ${state} in ('WA','OR','CA','NV','UT','WY','ID','MT','CO','AK','HI') ;;
        label: "West"
      }
      when: {
        sql: ${state} in ('AZ','NM','TX','OK') ;;
        label: "Southwest"
      }
      when: {
        sql: ${state} in ('ND','SD','MN','IA','WI','MN','OH','IN','MO','NE','KS','MI','IL') ;;
        label: "Midwest"
      }
      when: {
        sql: ${state} in ('MD','DE','NJ','CT','RI','MA','NH','PA','NY','VT','ME','DC') ;;
        label: "Northeast"
      }
      when: {
        sql: ${state} in ('AR','LA','MS','AL','GA','FL','SC','NC','VA','TN','KY','WV') ;;
        label: "Southeast"
      }
      else: "Unknown"
    }
    map_layer_name: data_area
    drill_fields: [state]
  }


  dimension: registrant_type_id {
    type: number
    sql: ${TABLE}.registrant_type_id ;;
  }

  dimension: state {
    type: string
    sql: ${TABLE}.state ;;
  }

  dimension: status_code {
    type: string
    sql: ${TABLE}.status_code ;;
  }

  dimension: year_built {
    # type: date_year
    # sql: DATE(nullif(${TABLE}.year_built,0), 01, 01) ;;   # makes the SQL too clunky

    type: number
    sql: nullif(${TABLE}.year_built,0) ;;
    value_format_name: id
  }

  dimension: zip {
    type: zipcode
    sql: ${TABLE}.zip ;;
  }

  measure: count {
    type: count
    drill_fields: [name]
  }
}
```