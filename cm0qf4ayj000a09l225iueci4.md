---
title: "Looker Functions and Operators - GSP857"
seoTitle: "Looker Functions and Operators - GSP857"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Fri Sep 06 2024 07:52:05 GMT+0000 (Coordinated Universal Time)
cuid: cm0qf4ayj000a09l225iueci4
slug: looker-functions-and-operators-gsp857
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746874598752/7b79ebe2-f63b-48ae-9b5b-cf3bcbe13ce8.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1746874589881/fde59ba4-2ac0-48bb-a74c-a6968c10ab16.png
tags: looker-functions-and-operators-gsp857, gsp857, looker-functions-and-operators

---

## **Overview**

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications. With Looker and Google Cloud, you can deliver actionable business insights at the point of decision, create new value streams, and infuse data into products and workflows to move the business forward.

In this lab, you learn how to use Looker to pivot dimensions, reorder columns, remove fields, and use table calculations. For this lab, an Explore of the Federal Aviation Administration's (FAA) Airport data has been created for you. This dataset contains information on different attributes of airports such as city, date of commission, facility type, etc.

You can learn more about creating Explores in the Looker in [Exploring data in Looker](https://docs.looker.com/exploring-data/exploring-data) documentation.

## **Objectives**

In this lab, you learn how to:

* Pivot dimensions
    
* Reorder columns and remove fields
    
* Use table calculations and functions
    

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
    

## **Task 1. Pivot dimensions**

Multiple dimensions are often easier to look at when you pivot one of the dimensions horizontally. Each value in the dimension will become a column in your Look. This makes the information easier to consume visually, and reduces the need to scroll down to find data. Looker supports up to 200 pivoted values.

In this section, you will find the number of flights scheduled to depart in each week of the year 2003. You will then pivot the **Distance Tiered** dimension and display the result as a line chart.

1. In the **Looker navigation menu**, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    
3. Under **Flights &gt; Measures**, click **Count**.
    
4. Under **Flights &gt; Dimensions &gt; Depart Date**, click **Week**.
    
5. Within the **Depart Date** dimension group, click on the **Filter** button next to the **Date** dimension.
    
6. In the filter window, set the **Depart Date** filter to: `is in the year 2003`.
    
7. Click **Run**.
    
8. Under **Flights &gt; Dimensions**, click on the **Pivot data** button for **Distance Tiered**.
    
9. Click **Run**.
    

If there is no row of data whose value would appear in a column, that is indicated with the null value symbol, a zero with a slash across. For example, the **Below Zero** column has all null values.

You can also sort pivoted dimensions by clicking the title of the dimension. To sort by multiple pivoted dimensions, hold down the Shift key and then click on the dimension titles in the order you would like them sorted. When you’re sorting a pivoted measure, any rows with values in that column are sorted first, followed by rows without data in that column (indicated by the null value symbol).

10. Click the arrow next to **Visualization** to expand the window.
    
11. Once the Visualization window has expanded, hover your cursor over the icons to identify the available options.
    
12. Change visualization type to **Line**.
    
13. Click on the settings gear icon for **Visualization**.
    
14. Click **Edit &gt; Plot**.
    
15. Select the **Legend Align** as **Left**.
    
16. Click on the gear icon for **Visualization** to close the settings.
    
17. Click on the settings gear icon next to **Run**, and select **Save** &gt; **As a Look**.
    
18. Title the Look **Flight Count by Departure Week and Distance Tier**.
    
19. Click **Save**.
    

![Flight Count by Departure Week and Distance Tier line chart](https://cdn.qwiklabs.com/RIHVD0wvxpWP5TNcuq2pTNi1Ua7MYTF35E5UKzzCoZQ%3D align="left")

Click *Check my progress* to verify the objective.

Pivot dimensions

**Check my progress**

## **Task 2. Reorder columns and remove fields**

You can reorder columns in the **Data** section by clicking on a column header and moving the column to its desired position. The Explore’s visualization will reflect the new column order after you click **Run**.

Columns are organized in the **Data** section by field type: dimensions, [dimension table calculations](https://docs.looker.com/exploring-data/using-table-calculations), measures, measure [table calculations](https://docs.looker.com/exploring-data/using-table-calculations), and [row totals](https://docs.looker.com/exploring-data/exploring-data#displaying_totals).

For the most part, columns can be reordered within each field type but cannot be moved out of their field type section. For example, dimension table calculations can be rearranged among themselves, but you cannot place a dimension table calculation in between two measures.

One exception, however, is that you can use the arrow next to the row totals checkbox on the **Data** tab to move the row total column from the far right of the data table to just after the dimension table calculations.

Columns under a pivoted dimension can be reordered, but the order of pivoted dimensions can be changed only by changing the sort order, not by manual reordering.

1. In the **Looker navigation menu**, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    
3. Under **Flights &gt; Measures**, click **Percent Cancelled**.
    
4. Under **Flights &gt; Dimensions &gt; Depart Date**, click **Month**.
    
5. Within the **Depart Date** dimension group, click on the **Filter** button next to the **Date** dimension.
    
6. In the filter window, set the **Depart Date** filter to: `is in the year 2000`.
    
7. Under **Aircraft Origin &gt; Dimensions**, click **State**.
    
8. Click **Run**.
    
9. Click the **Percent Cancelled** column header to reorder the percentage from high to low.
    
10. Hover over the **Depart Month** column, and click the gear icon that appears on the right side.
    
11. Click **Remove**.
    

**Note:** You can also remove all fields in an Explore using the keyboard shortcuts Command-K (Mac) or Ctrl+K (Windows).

12. Once the column is removed from the **Data** section, click **Run** again.
    
13. Click on the settings gear icon next to **Run**, and select **Save** &gt; **As a Look**.
    
14. Title the Look **Percent of Flights Cancelled by State in 2000**.
    
15. Click **Save**.
    

![Percent of Flights Cancelled by State in 2000 line graph](https://cdn.qwiklabs.com/Z9ncUTo6XBAjz%2BeRj7dcMRy7eoTmiQdl1nPTYsypCQo%3D align="left")

Click *Check my progress* to verify the objective.

Reorder columns and remove fields

**Check my progress**

## **Task 3. Use table calculations to calculate simple percentages**

Table calculations make it easy to create on-the-fly metrics. They are similar to formulas found in spreadsheet tools like Excel. Table calculations appear as green columns in the data table, rather than as blue columns (dimensions) or orange columns (measures).

Table calculations can perform mathematical, logical (true/false), lexical (text-based), and date-based calculations on the dimensions, measures, and other table calculations in your query. The formulas that you use to execute these calculations are called [Looker expressions](https://docs.looker.com/exploring-data/creating-looker-expressions).

### Table calculations are different from regular fields

Although table calculations are similar to dimensions and measures, there are some important differences:

* Table calculations give anyone the ability to create new fields, as opposed to regular fields, which require that you have development permissions and understand LookML.
    
* Table calculations operate on the results from your query, as opposed to regular fields, which are part of the query itself. In other words, you’ll select a set of dimensions and measures and run your report as normal, then you can base table calculations on the data in that report.
    
* **Although table calculations are easier to create than regular fields, they are not as easily controlled as regular fields**. Since they can be created by anyone within your organization, they might not be the “official” calculations. Keep this tradeoff in mind as you decide between regular fields and table calculations, since one of the key advantages of Looker is having a single source of truth!
    

### Create a map visualization

In this section, you will create a map that shows the % of Flights Cancelled by Aircraft Origin State for the year 2004.

1. In the **Looker navigation menu**, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    
3. Under **Flights Details &gt; Measures**, click **Cancelled Count**.
    
4. Under **Flights &gt; Measures**, click **Count**.
    
5. Under **Aircraft Origin &gt; Dimensions**, click **State**.
    
6. Under **Flights**, within the **Depart Date** dimension group, click on the **Filter** button next to the **Date** dimension.
    
7. In the filter window, set the **Depart Date** filter to: `is in the year 2004`.
    
8. Click **Run**.
    

### Create a table calculation

1. Next to Custom Fields, click **\+ Add**. Select **Table Calculation**.
    

In the **Table Calculations** pop-up window, you can start constructing your custom metrics. The expression you create can evaluate to a number, date, string (text), or Boolean (true/false).

2. If you already have some table calculations defined, click the **Add Table Calculation** button to create another. You are able to add as many table calculations as you need.
    

For each table calculation:

* Rename your table calculation if desired.
    
* Optionally, click **Default Formatting** to choose a predefined format or create a custom format for the results. If you create a custom format, use Excel-style formatting as described on the [Adding custom formatting to numeric fields](https://docs.looker.com/exploring-data/custom-formatting) documentation page.
    
* Start typing a [Looker expression](https://docs.looker.com/exploring-data/creating-looker-expressions) into the large text box to form your calculation. Looker expressions can be quite simple, or they can use as many fields, functions, and operators as your business logic requires. The [Creating Looker expressions](https://docs.looker.com/exploring-data/creating-looker-expressions) documentation page explains how to create Looker expressions and how the editor helps you.
    

3. When you are finished adding table calculations, click **Save**.
    

**Note:** Your table calculation fields appear next to your dimensions and measures in the table. If you want to reuse your table calculations in the future, be sure to save your Look or copy the table calculation formula into another document.

4. In the **Expression** field, add the following Table Calculation:
    

```apache
${flights.cancelled_count}/${flights.count}
```

5. Click **Default Formatting** to change the format to `Percent (0)`.
    
6. Rename the Table Calculation to "Percent Cancelled".
    
7. Click **Save**.
    
8. Hover over the **Cancelled Count** column, and click the gear icon that appears on the right side.
    
9. Click **Hide from Visualization**.
    
10. Repeat the same process to hide the **Count** column from the Visualization.
    
11. Click the arrow next to **Visualization** to expand the window.
    
12. Change visualization type to **Map**.
    
13. Click on the settings gear icon next to **Run**, and select **Save** &gt; **As a Look**.
    
14. Title the Look **Percent of Flights Cancelled by Aircraft Origin 2004**
    
15. Click **Save**.
    

![Percent of Flights Cancelled by Aircraft Origin 2004 map](https://cdn.qwiklabs.com/98HOuoprIq%2FpliNWuK0czs2FRuuKmgtaHv3w%2Fo016TQ%3D align="left")

Click *Check my progress* to verify the objective.

Use table calculations to calculate simple percentages

**Check my progress**

## **Task 4. Use table calculations to calculate percentages of a total**

In this section, you will create a Bar Chart that shows the percent of Total Distance Flown by Carrier.

1. In the **Looker navigation menu**, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    
3. Under **Flights &gt; Measures**, click **Total Distance**.
    
4. Under **Carriers &gt; Dimensions**, click **Name**.
    
5. In the **Data** bar, click on the **Totals** checkbox next to **Row Limit**.
    
6. Click **Run**.
    
7. Next to Custom Fields, click **\+ Add**. Select **Table Calculation**.
    
8. Add the following in **Expression** field:
    

```apache
${flights.total_distance}/${flights.total_distance:total}
```

9. Click **Default Formatting** to change the format to `Percent (0)`.
    
10. Click **Save**.
    
11. Hover over the **Total Distance** column, and click the gear icon that appears on the right side.
    
12. Click **Hide from Visualization**.
    
13. Click **Run**.
    
14. Click the arrow next to **Visualization** to expand the window.
    
15. Change visualization type to **Bar**.
    
16. Click on the settings gear icon next to **Run**, and select **Save** &gt; **As a Look**.
    
17. Title the Look **Percent of Total Distance Flown by Carrier**
    
18. Click **Save**.
    

![Percent of Total Distance Flown by Carrier bar chart](https://cdn.qwiklabs.com/FJLsjDeKLpIqwkGX5VfNRFhgUGUcmG3zFtsniJ2C69M%3D align="left")

Click *Check my progress* to verify the objective.

Use table calculations to calculate percentages of a total

**Check my progress**

## **Task 5. Use functions in table calculations**

[Looker expressions](https://docs.looker.com/exploring-data/creating-looker-expressions) (sometimes referred to as Lexp) are used to perform calculations for:

* [Table calculations](https://docs.looker.com/exploring-data/using-table-calculations) (which include expressions used in [data tests](https://docs.looker.com/reference/model-params/test))
    
* [Custom fields](https://docs.looker.com/exploring-data/adding-fields/custom-measure)
    
* [Custom filters](https://docs.looker.com/exploring-data/filtering-and-limiting#custom-filters)
    

A major part of these expressions is the functions and operators that you can use in them. The functions and operators can be divided into a few basic categories:

* [Mathematical](https://docs.looker.com/exploring-data/creating-looker-expressions/looker-functions-and-operators#math): Number-related functions
    
* [String](https://docs.looker.com/exploring-data/creating-looker-expressions/looker-functions-and-operators#string): Word- and letter-related functions
    
* [Dates](https://docs.looker.com/exploring-data/creating-looker-expressions/looker-functions-and-operators#date): Date- and time-related functions
    
* [Logical transformation](https://docs.looker.com/exploring-data/creating-looker-expressions/looker-functions-and-operators#logical): Includes boolean (true or false) functions and comparison operators
    
* [Positional transformation](https://docs.looker.com/exploring-data/creating-looker-expressions/looker-functions-and-operators#positional): Retrieving values from different rows or pivots
    

### Some functions are only available for table calculations

Looker expressions for [custom filters](https://docs.looker.com/exploring-data/filtering-and-limiting#custom-filters) and [custom fields](https://docs.looker.com/exploring-data/adding-fields/custom-measure) do not support Looker functions that convert datatypes, aggregate data from multiple rows, or refer to other rows or pivot columns. These functions are supported only for [table calculations](https://docs.looker.com/exploring-data/using-table-calculations) (including table calculations used in the `expression` parameter of a data test).

The [Looker functions and operators documentation](https://docs.looker.com/exploring-data/creating-looker-expressions/looker-functions-and-operators) is organized to clarify which functions and operators are available, depending on where you are using your Looker expression.

In this section, you will find the Year over Year Percent Change in Flights flown by Flight Distance Tier for all flights departing after January 1, 2000. You will display this as a table, and add conditional formatting.

1. In the **Looker navigation menu**, click **Explore**.
    
2. Under **FAA**, click **Flights**.
    
3. Under **Flights &gt; Measures**, click **Count**.
    
4. Under **Flights &gt; Dimensions**, click **Distance Tiered**.
    
5. Under **Flights**, within the **Depart Date** dimension group, click on the **Pivot data** button next to the **Year** dimension.
    
6. Click on the **Filter** button next to **Date**.
    
7. In the filter window, set the **Depart Date** filter to: `is on or after 01/01/2000`. You can leave the default `absolute`.
    
8. Click **Run**.
    
9. Next to Custom Fields, click **\+ Add**. Select **Table Calculation**.
    
10. Add the following Table Calculation, making use of the `pivot_offset` function:
    

```apache
(${flights.count}-pivot_offset(${flights.count}, -1))/pivot_offset(${flights.count}, -1)
```

11. Click **Default Formatting** to change the format to `Percent (0)`.
    
12. Click **Save**.
    
13. Hover over one of the **Count** columns, and click the gear icon that appears on the right side.
    
14. Click **Hide from Visualization**. It should hide all of the **Count** columns.
    
15. Click **Run**.
    
16. Click the arrow next to **Visualization** to expand the window.
    
17. Change visualization type to **Table**.
    
18. Click on the settings gear icon for **Visualization**.
    
19. Click **Edit &gt; Formatting**.
    
20. Toggle the **Enable Conditional Formatting** to *on*. Accept the default options and click **Add a Rule**.
    
21. Click on the gear icon for **Visualization** to close the settings.
    
22. Click on the settings gear icon next to **Run**, and select **Save** &gt; **As a Look**.
    
23. Title the Look **YoY Percent Change in Flights flown by Distance, 2000-Present**
    
24. Click **Save**.
    

![YoY Percent Change in Flights flown by Distance, 2000-Present table with conditional formatting](https://cdn.qwiklabs.com/VCf67qSG7cQIdkZ5HXR2qWFRYgneyz2x6bJqChGmKe8%3D align="left")

Click *Check my progress* to verify the objective.

---

## Solution of Lab

%[https://youtu.be/wyBVUyvXGdk] 

---

### **🎯 Task 1: Pivot dimensions**

> 👇 Copy the following code and paste it into the `faa` model in Looker.

```apache
# Place in `faa` model
explore: +flights {
  query: start_from_here{
      dimensions: [depart_week, distance_tiered]
      measures: [count]
      filters: [flights.depart_date: "2003"]
    }
  }
```

> 💡 **Important:** After pasting the code, carefully follow the subsequent steps for Task 1 to ensure correct implementation.

* **Title the Look**
    

```plaintext
Flight Count by Departure Week and Distance Tier
```

---

### **🎯 Task 2: Reorder columns and remove fields**

> 👇 Copy the following code and paste it into the `faa` model in Looker.

```apache
# Place in `faa` model
explore: +flights {
  query: start_from_here{
      dimensions: [aircraft_origin.state]
      measures: [percent_cancelled]
      filters: [flights.depart_date: "2000"]
    }
  }
```

> 💡 **Important:** After pasting the code, carefully follow the subsequent steps for Task 2 to ensure correct implementation.

* **Title the Look**
    

```plaintext
Percent of Flights Cancelled by State in 2000
```

---

### **🎯 Task 3: Use table calculations to calculate simple percentages**

> 👇 Copy the following code and paste it into the `faa` model in Looker.

```apache
# Place in `faa` model
explore: +flights {
    query: start_from_here{
      dimensions: [aircraft_origin.state]
      measures: [cancelled_count, count]
      filters: [flights.depart_date: "2004"]
    }
}
```

> 💡 **Important:** After pasting the code, carefully follow the subsequent steps for Task 3 to ensure correct implementation.

* In the **Expression field**, add the following Table Calculation:
    

```apache
${flights.cancelled_count}/${flights.count}
```

* **Title the Look**
    

```plaintext
Percent of Flights Cancelled by Aircraft Origin 2004
```

---

### **🎯 Task 4: Use table calculations to calculate percentages of a total**

> 👇 Copy the following code and paste it into the `faa` model in Looker.

```apache
# Place in `faa` model
explore: +flights {
    query: start_from_here{
      dimensions: [carriers.name]
      measures: [total_distance]
    }
}
```

> 💡 **Important:** After pasting the code, carefully follow the subsequent steps for Task 4 to ensure correct implementation.

* Add the following in **Expression field**:
    

```apache
${flights.total_distance}/${flights.total_distance:total}
```

* **Title the Look:**
    

```plaintext
Percent of Total Distance Flown by Carrier
```

---

### **🎯 Task 5: Use functions in table calculations**

> 👇 Copy the following code and paste it into the `faa` model in Looker.

```apache
# Place in `faa` model
explore: +flights {
    query:start_from_here {
      dimensions: [depart_year, distance_tiered]
      measures: [count]
      filters: [flights.depart_date: "after 2000/01/01"]
    }
}
```

> 💡 **Important:** After pasting the code, carefully follow the subsequent steps for Task 5 to ensure correct implementation.

* Add the following **Table Calculation**, making use of the `pivot_offset` function:
    

```apache
(${flights.count}-pivot_offset(${flights.count}, -1))/pivot_offset(${flights.count}, -1)
```

* Title the Look:
    

```plaintext
YoY Percent Change in Flights flown by Distance, 2000-Present
```