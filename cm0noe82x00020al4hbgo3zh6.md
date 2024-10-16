---
title: "Creating a Looker Modeled Query and Working with Quick Start - GSP984"
seoTitle: "Creating a Looker Modeled Query and Working with Quick Start - GSP984"
seoDescription: "Looker provides the ability for LookML developers to build modeled queries that help all Looker business users quickly get started and easily explore data i"
datePublished: Wed Sep 04 2024 09:48:26 GMT+0000 (Coordinated Universal Time)
cuid: cm0noe82x00020al4hbgo3zh6
slug: creating-a-looker-modeled-query-and-working-with-quick-start-gsp984
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1725442789110/10aa88bc-c60b-40e1-b4ce-725a2608421e.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1725443285597/e11cf081-b90e-4406-ad2e-527d5a469f89.jpeg

---

## **Overview**

Looker provides the ability for LookML developers to build modeled queries that help all Looker business users quickly get started and easily explore data in the platform.

This three-task lab will provide you with practical, hands-on experience using the [query](https://docs.looker.com/reference/explore-params/query) parameter to create a modeled query for an Explore. The modeled query is listed in the Quick Start section of a blank Explore. Modeled queries are extremely helpful to Looker business users, since you can specify elements like the dimensions, measures, filters, and pivots that may be the most relevant and insightful. In this lab you will learn how to create a modeled query, which can be a helpful starting point for users who are new to Looker and learning how to query data.

### Objectives

In this lab, you learn how to perform the following tasks:

* Create a modeled query.
    
* Save the modeled query in LookML.
    
* Use the modeled query to build a Look report.
    

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
    

## **Modeled queries in Looker**

Modeled queries are created from the [query](https://docs.looker.com/reference/explore-params/query) parameter in LookML. The modeled analyses are listed in the [Quick Start](https://docs.looker.com/exploring-data/exploring-data?#quick_start) section of a blank Explore, or in the [Quick Start pop-up](https://docs.looker.com/exploring-data/exploring-data?#choosing_a_quick_start_option_once_an_explore_has_run) after an Explore has already been run. Quick Start analyses provide a helpful starting point for users to quickly explore the meaningful data and build reports.

### Common use cases

* Demonstrating the power of Explores to highlight key types of analyses that can be created from a specific Explore page.
    
* Offering a “soft-landing” for new explorers that are initially less intimidating and allow them to tweak an existing analysis vs. building one entirely from scratch.
    
* Saving time for seasoned users by modeling frequent queries and using them as Quick Starts to make your analyses faster and less repetitive, just like modeling commonly requested fields in LookML reaps benefits in terms of reusability .
    
* Providing one-click access to common filter sets by providing explorers with a preconfigured set of filters to grab and go. No need to repetitively add and configure the ones you need.
    

### How to create a query parameter

The query parameter includes a [list](https://docs.looker.com/reference/explore-params/query#defining_a_query_in_lookml) of subparameters that you can define in a LookML model. The easiest way to define a query in your model is by building the analysis in an Explore, borrowing the functionality used to generate [aggregate\_table](https://docs.looker.com/reference/explore-params/aggregate_table) LookML and then copying the aggregate table LookML to use as a starting point for your modeled analysis LookML.

This lab takes you through the process shown below.

![The process where you first order items, then click Run, and then select Get LookML](https://cdn.qwiklabs.com/5fluREoCr7PeYsmhjCo7bVHvxWAO8RkNwVemD9znYiY%3D align="left")

![The process continued where you then go to the Aggregate Table tab, and finally copy the Aggregate Table LookML code](https://cdn.qwiklabs.com/MfBXETWbwAwCioCFAynbxBk28esWxTmOJZlY7Yqeywg%3D align="left")

## **Task 1. Create a modeled query in Explore**

In this task, you will use Looker Explore to create a modeled query with dimensions, measures, and filters to provide a basic-level business insight.

1. In the Looker navigation menu, click **Explore**.
    
2. Under **E-Commerce Training**, click **Order Items**.
    
3. Select the fields below:
    
    * Under **Users** &gt; **Dimensions**, click **State**.
        
    * Under **Products** &gt; **Dimensions**, click **Department**.
        
    * Under **Users** &gt; **Measures**, click **Count**.
        
    * Under **Order Items** &gt; **Measures**, click **Order Count**.
        
4. Under **Users**\&gt;**Dimensions**, find **Country** and click the filter icon () next to it to filter on the dimension.
    
5. In the **Filter** pane, set the **Users Country** filter to `is equal to USA`.
    
6. In the **Data** pane, click on the column name **Users Count** to sort in descending order.
    
7. Click **Run** and review the results data.
    

Click *Check my progress* to verify the objective.

Create a modeled query in Explore

**Check my progress**

## **Task 2. Save the modeled query in LookML**

In this task, you will save the modeled query from Explore to LookML.

1. On the **Explore** page with modeled query, click on **Settings** () next to Run (top right of page), and select **Get LookML**.
    
2. Click the **Aggregate Table** tab and copy the LookML code.
    
3. Open a new Looker window in a new tab. On the bottom left of the Looker User Interface, click the toggle button to enter **Development mode**.
    
4. On the left side navigation menu of the Looker User Interface, click **Develop**.
    
5. Under **Projects**, click on **qwiklabs-ecommerce**.
    
6. In the **training\_ecommerce.model** file, paste the copied code after explore `order_items` but before explore `events`, around row 43.
    

![Lines 41 to 56 of the training_ecommerce.model script](https://cdn.qwiklabs.com/wR9T6ZI9LvmgnQAmENAzHUbklcACs%2FPF%2FUa%2BNILx2R0%3D align="left")

7. Remove the line for `aggregate_table` and the ending closing parenthesis. There will now only be two closing parenthesis at the end of the explore+ definition.
    
8. Then, remove the lines for the `materialization` parameter including `datagroup_trigger`.
    
9. Add a name in the **query** parameter, `start_from_here`.
    
10. Click **Save Changes**.
    

![Updated lines 43 to 51 of the training_ecommerce.model script](https://cdn.qwiklabs.com/QlQ1ydFu8nL69Ita5SCkdz07NnayVrBUpdg4HUWLe88%3D align="left")

### Send LookML changes from development branch to production

1. Click **Validate LookML**
    
2. Click **Commit Changes & Push**.
    
3. In the **Commit** window, add a message to specify the changes you made, and click **Commit**.
    
4. Click **Deploy to Production**.
    

## **Task 3. Create a Look report using the modeled query**

In this task, you will build a Look report using the modeled query.

1. Open a new Looker window in a new tab.
    
2. On the left side navigation menu of the Looker User Interface, click **Explore**\&gt; **Order Items**. Click **Start From Here** under **Quick Start**.
    

![The Start From Here action tile in the Quick Start section](https://cdn.qwiklabs.com/AScxNe0mDiNtG4NXIUS9McOCLD7%2BAozU0t94tcT2vYU%3D align="left")

3. In the **Data** pane, click on the gear icon on column name **Products Department** and select **pivot**.
    
4. In the **Data** pane, click on the gear icon on column name **Users Count** and select **Hide from Visualization**.
    
5. Expand **Visualization** pane and choose **Column** chart.
    
6. Click on the gear icon () in the **Visualization** pane. Under **Plot**, choose **Stacked** as Series Positioning.
    
7. Click on gear icon () next to Run (top right of page), and select **Save &gt; As a Look**.
    
8. Enter a title for the Look report, `Order Items Count per State`. Chose the **Shared** folder to save the report.
    
9. Click **Save**.
    
10. Open a new Looker window in a new tab. Click **Shared folders**.
    
11. Click the **Order Items Count per State** Look report and review the data and visualization.
    

![The Order Items Count per State visualization](https://cdn.qwiklabs.com/71twispDu28K2fexBXCAH6wx2KjsKaTNTcBNKHn9pxo%3D align="left")

Click *Check my progress* to verify the objective.

Create a Look report using the modeled query

---

## Solution of Lab

%[https://www.youtube.com/watch?v=JlR8vkfIuMQ] 

```apache
connection: "bigquery_public_data_looker"

# include all the views
include: "/views/*.view"
include: "/z_tests/*.lkml"
include: "/**/*.dashboard"

datagroup: training_ecommerce_default_datagroup {
  # sql_trigger: SELECT MAX(id) FROM etl_log;;
  max_cache_age: "1 hour"
}

persist_with: training_ecommerce_default_datagroup

label: "E-Commerce Training"

explore: order_items {
  join: users {
    type: left_outer
    sql_on: ${order_items.user_id} = ${users.id} ;;
    relationship: many_to_one
  }

  join: inventory_items {
    type: left_outer
    sql_on: ${order_items.inventory_item_id} = ${inventory_items.id} ;;
    relationship: many_to_one
  }

  join: products {
    type: left_outer
    sql_on: ${inventory_items.product_id} = ${products.id} ;;
    relationship: many_to_one
  }

  join: distribution_centers {
    type: left_outer
    sql_on: ${products.distribution_center_id} = ${distribution_centers.id} ;;
    relationship: many_to_one
  }
}

# Place in `training_ecommerce` model
explore: +order_items {
  query: start_from_here{
      dimensions: [products.department, users.state]
      measures: [order_count, users.count]
      filters: [users.country: "USA"]
    }
}


explore: events {
  join: event_session_facts {
    type: left_outer
    sql_on: ${events.session_id} = ${event_session_facts.session_id} ;;
    relationship: many_to_one
  }
  join: event_session_funnel {
    type: left_outer
    sql_on: ${events.session_id} = ${event_session_funnel.session_id} ;;
    relationship: many_to_one
  }
  join: users {
    type: left_outer
    sql_on: ${events.user_id} = ${users.id} ;;
    relationship: many_to_one
  }
}
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725443233915/a134ab5f-b4d4-4956-b844-2919aa324fcc.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725443238389/42844dca-2385-46b4-a9e5-e6ddd2f4448b.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725443260102/de27465b-2869-4c4e-b1fc-25ea94d6094d.png align="center")