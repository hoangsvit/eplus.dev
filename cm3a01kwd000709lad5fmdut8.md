---
title: "Enhancing User Interactivity in Looker with Liquid - GSP934"
seoTitle: "Enhancing User Interactivity in Looker with Liquid - GSP934"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Sat Nov 09 2024 10:04:52 GMT+0000 (Coordinated Universal Time)
cuid: cm3a01kwd000709lad5fmdut8
slug: enhancing-user-interactivity-in-looker-with-liquid-gsp934
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749092207336/644b89ad-f39a-4090-af2d-727793a770a2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749092234382/ac36a538-1f76-4a4e-b9d2-cb87e3658ee7.png
tags: enhancing-user-interactivity-in-looker-with-liquid-gsp934, gsp934

---

## **Overview**

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

In this lab, you will explain how Liquid parameters and templated filters can be used to enhance interactivity by users in Looker and use Liquid parameters and templated filters to create dynamic dimensions and measures.

### Objectives

In this lab, you will learn how to:

* Create a dynamic dimension using a Liquid parameter
    
* Create a dynamic dimension using templated filters
    
* Create a dynamic measure using templated filters
    

### Prerequisites:

Familiarity with LookML and [Liquid](https://shopify.github.io/liquid/) are necessary. Completing the [Understanding LookML in Looker](https://www.qwiklabs.com/quests/170) skill badge quest, as well as the [Getting Started with Liquid to Customize the Looker User Experience](https://www.cloudskillsboost.google/focuses/21217?parent=catalog) lab is recommended lab before beginning this lab.

## **Setup**

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
    

## **Task 1. Using Liquid to enhance interactivity**

In LookML, we call lots of things parameters, like a dimension or measure type, `sql`, and `drill_fields`. There is also an object itself called a **parameter**, which we can call a **Liquid parameter** for clarity.

Parameters and templated filters use [Liquid](https://shopify.github.io/liquid/) to increase interactivity in Explores, Looks, and dashboards. The use case for this is: sometimes you want more flexibility in influencing the generated SQL. When you use a dimension filter, it only ever updates the `WHERE` clause of the outer query. When you use a measure filter, it updates the `HAVING` clause of the outer query. Either option might be filtering your results set “too much.”

### Parameters & templated filters

“Parameters and templated filters” is often said together in one phrase because they basically achieve the same purpose when using Liquid. The main difference is that a parameter only allows one specific, *fixed value*, whereas a templated filter leverages the *full range of filter operators* for a given data type. For a string, that would be “is equal to,” “is not equal to,” “contains,” “starts with,” etc. The differences are outlined as follows:

* **Parameters**: *Specific, fixed values* that can be entered by users and then passed directly into a SQL query using Liquid
    
* **Templated Filters**: user-entered values that are passed into SQL queries using *intelligently written conditional logic*
    

Using parameters and templated filters provides **greater flexibility** in how user inputs can influence the SQL queries written. You can use parameters and templated filters to create:

* Dynamic dimensions and measures, which not only consolidate code but can also provide a smoother user experience
    
* Dynamic derived tables, in terms of data granularity and filtering
    
* Conditionally displayed values in the results set and labels
    

So this all sounds great, but what does this cycle of behavior look like in Looker?

![Steps one to four of the behavior cycle](https://cdn.qwiklabs.com/AoeJtmjTFe0ATKTpZ%2FkatPx%2Ffds5n6LfemSrwHTcVm4%3D align="left")

* **Step 1:** It starts with the developer setting up the back end logic, which has two parts:
    
    * A parameter or templated filter, which appears in the UI for the user to interact with
        
    * A place in the sql parameter that summons the parameter or filter value and does something with it
        
* **Step 2:** The end user then inputs a value into the parameter or templated filter, which resembles a “normal” dimension or measure filter in an Explore, Look, or dashboard.
    
* **Step 3:** That value is then inserted into the SQL, and a query is formed with the changed SQL.
    
* **Step 4:** That query runs and returns an Explore that reflects the value the user put in. This cycle applies to both templated filters and parameters
    

Parameters are little easier to understand conceptually, so that’s where we’ll start.

## **Task 2. Create a dynamic dimension using a Liquid parameter**

Liquid parameters are defined to receive specific, hard-coded values selected by users, then these values are then passed onto the generated SQL query.

In this section, you will create a parameter and dynamic dimension within the **order\_items** view that together enable users to choose between different order creation date fields in the **Order Items** Explore. Users should be able to choose between `Date`, `Week`, and `Month` and see that the query results change depending on which is selected.

1. First, on the bottom left of the Looker User Interface, click the toggle button to enter **Development mode**.
    

![Development mode toggle](https://cdn.qwiklabs.com/uUCbNuedSCOYQmL%2BIubjqvusmGAeS7Wjj3f6xByL174%3D align="left")

2. Click the **Develop** tab and then select the **qwiklabs-ecommerce** LookML project. Navigate to the `order_items` view file.
    

To start, you need to give the user something to interact with in the UI. This would be the `parameter` object. Give it a name as you would a dimension or measure: `select_timeframe`. The type should be **unquoted**, because you don’t want Looker to generate single quotes around the value for us.

Next, hard-code one or more **allowed\_values**. The `value` sub-parameter is what actually gets plugged into the SQL query, and the `label` sub-parameter determines how the value is displayed in the UI. You can also choose to set one of these `allowed_value` values as the `default_value`. For this, you can select the month.

You will now create the Liquid parameter that can receive the user input; only three values are hard-coded and thus available for the user to select: `created_date`, `created_week`, and `created_month`.

3. In the **order\_items** view file, above all dimensions, add the following syntax for the new parameter (~line 6 under `drill_fields`):
    

```apache
parameter: select_timeframe {
    type: unquoted
    default_value: "created_month"
    allowed_value: {
      value: "created_date"
      label: "Date"
    }
    allowed_value: {
      value: "created_week"
      label: "Week"
    }
    allowed_value: {
      value: "created_month"
      label: "Month"
    }
  }
```

To recap, the sub-parameters are defined as follows:

* **label**: what the user will see in the filter options
    
* **value**: the value that will be inserted into the SQL query
    
* **default\_value**: the value that will be inserted automatically if a user has not yet made a selection
    

Your file should now resemble the following:

![order_items.view page](https://cdn.qwiklabs.com/H0l4ibFvYs1p61N1e659g71FDB%2F%2F%2B02YKjrYGxA5G90%3D align="left")

Next, you may want the fields displayed in a dashboard or Look to be dynamic, based on a user's selection of the metrics or data granularity they wish to see. Now you can use the LookML parameter you just created to apply this parameter to a dimension that ties the parameter's filter values to your different timeframe fields.

4. Next, you will define the dynamic dimension in the same view file. In the **order\_items** view file, after the parameter definition, add the following syntax for the new dynamic dimension (~line 23):
    

```apache
dimension: dynamic_timeframe {
    label_from_parameter: select_timeframe
    type: string
    sql:
    {% if select_timeframe._parameter_value == 'created_date' %}
    ${created_date}
    {% elsif select_timeframe._parameter_value == 'created_week' %}
    ${created_week}
    {% else %}
    ${created_month}
    {% endif %} ;;
  }
```

The specified timeframe field will now be returned based on whichever parameter value the user selects on the dashboard. Note that you are using [label\_from\_parameter](https://docs.looker.com/reference/field-params/label_from_parameter) to pass the selected value label to your tile.

Because the `${created_week}` and `${created_month}` timeframes—and possibly `${created_date}`, depending on your database dialect—are cast by Looker to strings, the overall **dynamic\_timeframe** dimension needs to be a string to accommodate.

This means, when business users are using this dimension in an Explore, they’ll need to remember to double-check the sort order. Looker’s default sort behavior is: check if there is a date or time dimension; if there isn’t, then sort by the first measure. So since this is technically a string type, Looker will sort by the measure first, which will likely mess up the chronological order.

You might wonder, well, what is the point then? Isn’t this introducing unnecessary complexity? Two things to keep in mind: Most business users of Looker are viewers, not explorers. That means they are looking at prepared dashboards and Looks, and they aren’t able to pick and choose different fields such as Created Date vs. Created Week in an Explore. Filters are the only way they can change what they’re seeing.

Since viewer users would be looking at content created by someone else, the fact that `dynamic_timeframe` is technically a string and needs to be manually sorted has zero impact on them.

Your file should now resemble the following:

![order_items.view file page](https://cdn.qwiklabs.com/%2Bdp9VB4UiBgcYg3BgAqQWVJmUViVxcjLv6h%2F7UjS9QE%3D align="left")

**Note:** Notice that the parameter created in the previous step is referenced as the `label_from_parameter` and in the sql parameter. In the visualization tab, the timeframe option will show up as Month, Week, Date, rather than the name of the dimension (Dynamic Timeframe).

Now you can test the dynamic dimension in the Order Items Explore.

5. Click **Save Changes**. Next, navigate to the **Order Items** Explore.
    
6. Under the **Order Items** view, select the new **Dynamic Timeframe** dimension and the **Order Count** measure.
    
7. Click on the filter icon next to the new *Filter-Only Field* called **Select Timeframe**
    
    **Note:** This is the Liquid parameter and is listed under the Order Items view above the Dimensions list.
    
8. For the filter option at the top of the UI, leave “is” selected. Select `Month` from the drop-down menu.
    

![Filters(1) dialog box with order items select timeframe set to is month](https://cdn.qwiklabs.com/CP1yn7qlBFSlNMKOk2rJia3tbZEVukpJW9oodvNPfzc%3D align="left")

9. Click **Run** to see the results. You can also now click on the SQL tab to review the SQL.
    

![Results page displaying ten rows of information under the Oder items: Dynamic timeframe and Oder items: Order count columns](https://cdn.qwiklabs.com/DBvPzLpp0Njzy3gbdWkXjYEjJyfz9q5aApAkF%2FXDuiA%3D align="left")

10. Next, select the **Week** and **Date** filters. Click **Run** to see the updated results for each of them.
    
11. For each run, click the SQL tab to review how the parameter is changing and is inserted into the SQL query.
    
12. Navigate back to the **Order Items** view.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click **Check my progress** to verify that you've performed the above task.

Create a dynamic dimension using a Liquid parameter

Check my progress

## **Task 3. Create a dynamic dimension using templated filters**

Templated filters follow the same logical pattern as parameters. Again, the major difference is that templated filters allow end users to choose from a number of filter operators. For the number data type, that could be “is equal to,” “is greater than,” “is between,” and so on.

In filters, values are not hard-coded; they are entered by users and then passed onto the generated SQL query. However, you can display a drop-down menu of options by specifying an explore and dimension in the filter definition.

In this section, you will create a dynamic dimension that takes an input value for product category and creates two groups in the results: the original category selected and all other categories.

1. Back in the Looker IDE, navigate to the **products** view file.
    

Same as with Liquid parameters, first you need to create something in the UI for the end user to interact with. For a templated filter, you need a **filter** object.

**Note:** For optimal performance, you can create a small hidden Explore (such as `explore: products {}` ) that only queries the base view required for the suggested values.

2. You will now create the filter object that can receive the user input. In the **products** view file, above all dimensions, add the following syntax for the new filter (~line 6 under drill\_fields).
    

As you can see, you cannot hard-code `allowed_values` for templated filters as you can for parameters.

3. The recommended approach is to use `suggest_explore` and `suggest_dimension` to provide a drop-down menu of filter suggestions to the end users:
    

```apache
filter: select_category {
    type: string
    suggest_explore: order_items
    suggest_dimension: products.category
  }
```

To recap, the sub-parameters are defined as follows:

* **suggest\_explore**: the Explore that will be queried in order to pull a list of suggested filter values
    
* **suggest\_dimension**: the dimension that should be used within the suggest Explore for providing a list of suggested filter value
    

Your file should now resemble the following:

![products.view file page](https://cdn.qwiklabs.com/A09OP7GeoBJq1MgtreUsWz7PSefxwM2%2Fz2ISunAmI3c%3D align="left")

Next, implement the user’s filter input somewhere. You will now define the dynamic dimension in the same view file.

Templated filters are referenced inside of a Liquid block using the syntax `{% condition filter_name %}`. This prepares the Liquid to apply a templated filter. Then give it the name of the field you want to apply that filter to, and finish the Liquid block with an `{% endcondition %}` tag. Notice how this is a little different from how you referenced a parameter; here you need to designate a field to apply the templated filter to, and an endconditon.

4. In the **products** view file, after the filter definition, add the following syntax for the new dynamic dimension (~line 12). Notice that the filter created in the previous step is referenced in the `sql` parameter:
    

```apache
dimension: category_comparison {
    type: string
    sql:
      CASE
      WHEN {% condition select_category %}
        ${category}
        {% endcondition %}
      THEN ${category}
      ELSE 'All Other Categories'
      END
      ;;
}
```

Here you are taking the user's filter criteria from `select_category`, and are applying it to the `${category}` dimension. If a category value does indeed meet the criteria, it should be displayed in the `category_comparison` dimension. If a category value does not meet the criteria, it should be lumped in with all the others that don’t match as ‘All Other Categories’.

Your file should now resemble the following:

![products.view file page](https://cdn.qwiklabs.com/GxZSNWx3aidWuTyktKNgyshuklSH9RRqKYrHNw9kIL0%3D align="left")

Now you can test the dynamic dimension in the Order Items Explore.

5. Click **Save Changes**. Next, navigate to the **Order Items** Explore.
    
6. Under the **Products** view, select the dimension called **Category Comparison**.
    
7. Click on the filter icon next to the new *Filter-Only Field* called **Select Category** (note: this is the templated filter and is listed under the Products view above the Dimensions list.)
    
8. Under the **Order Items** view, select the **Order Count** measure.
    
9. For the filter option at the top of the UI, leave “is equal to” selected.
    
10. Click in the empty text box to see the drop-down menu, or type `Jeans` (you will also see other possible values in a drop-down menu).
    

![Filters(1) dialog box with Products select category set to is equal to Jeans](https://cdn.qwiklabs.com/HJXFeM89rkbeOPPFPmGSIicRGSZwzw%2BJealZ0ER1%2FRQ%3D align="left")

11. Click **Run** to see the results. You should see 19,243 counts for Jeans and 145,402 counts for All Other Categories.
    

![Results page](https://cdn.qwiklabs.com/f1WYctFYTFB%2FdjGkchP7oVEG5Hnj3%2Binb1Uun2jCynA%3D align="left")

12. Templated filter logic adapts automatically as the user updates the filter. See this for yourself:
    
    * Try adding multiple values into the filter
        
    * Try changing the filter from “is equal to” to “contains” or “starts with”. What does that look like?
        
13. Click on the SQL tab to review the SQL after each run.
    

**Note:** While looking at the SQL tab is useful for inspecting how the query is formatted from LookML, the process of analyzing the SQL **promotes the appropriate process for troubleshooting any errors you may have.**

14. Navigate back to the **Products** view.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click **Check my progress** to verify that you've performed the above task.

Create a dynamic dimension using templated filters

Check my progress

## **Task 4. Create a dynamic measure using templated filters**

You can combine templated filters with a *hidden* dimension to adjust the filter criteria of a filtered measure, resulting in dynamic measure values.

For example, a common use case for a marketing team is the need to analyze the share of users coming from each traffic source. In this section, you will be able to address this use case by creating a measure that allows a user to choose any available Traffic Source and see a dynamic count of users (by dimension, such as country) for the selected traffic source.

1. Back in the Looker IDE, navigate to the **users** view file.
    

Again, you first need to create something in the UI for the end user to interact with. For a templated filter, you need the **filter** object.

2. In the **users** view file, above all dimensions, add the following syntax for the new filter (~line 6 under `drill_fields`):
    

```apache
filter: select_traffic_source {
  type: string
  suggest_explore: order_items
  suggest_dimension: users.traffic_source
 }
```

No values are hard-coded, but there are suggested values for an explore and dimension, which will be used to populate a drop-down menu available to users. Users can still input other values.

**Note:** This is very similar to the filter you made in the previous section. However, here you are setting the Explore to `order_items` and the dimension to `users.traffic_source`.

Your file should now resemble the following:

![users.view page](https://cdn.qwiklabs.com/E1FUVg0qv1EJGAfe3uyzsEbuXm1wgg1uAvBzKGp0gFk%3D align="left")

3. Next, you will define the hidden dimension in the same view file. In the **users** view file, after the filter definition, add the following syntax for the new hidden dimension (~line 12). Notice that the filter created in the previous step is referenced in the `sql` parameter:
    

```apache
dimension: hidden_traffic_source_filter {
    hidden: yes
    type: yesno
    sql: {% condition select_traffic_source %} ${traffic_source} {% endcondition %} ;;
}
```

Your file should now resemble the following:

![users.view page](https://cdn.qwiklabs.com/LjGoHUECdtIWIofBkvpT%2F1QKmOXLyAcy%2BlijS71%2Fqxc%3D align="left")

4. Lastly, you will define the dynamic measure in the same view file. In the **users** view file, after all the dimension definitions, add the following syntax for the new dynamic measure (~line 105):
    

**Note:** Notice that the hidden dimension created in the previous step is referenced in the filter parameter.

```abap
measure: dynamic_count {
  type: count_distinct
  sql: ${id} ;;
  filters: [ hidden_traffic_source_filter: "Yes" ]
}
```

Your file should now resemble the following:

![users.file page](https://cdn.qwiklabs.com/swdIUsb9oQIQ1b18R78aCSQg%2BhSw46TJBFzwgLGEi4E%3D align="left")

Now you can test the dynamic measure in the Order Items Explore.

5. Click **Save Changes**. Next, navigate to the **Order Items** Explore.
    
6. Under the **Users** view, select the **Country** dimension (or some other dimension to get a count by attribute).
    
7. Select the new **Dynamic Count** measure under the Users view.
    
8. Click on the filter icon next to the new *Filter-Only Field* called **Select Traffic Source** (note: this is the templated filter and is listed in the left menu of the Explore above the Dimension.
    
9. For the filter value at the top of the UI, leave “is equal to” selected.
    
10. Click in the empty text box to see the drop-down menu, or type `Email` (you will also see other possible values in a drop-down menu).
    

![Filters(1) dialog box with Users select traffic source set to is equal to email](https://cdn.qwiklabs.com/lTkmarCsC0cbI8CKNdY%2BlPBa0ZvJLVGAtNoxqpsMALA%3D align="left")

11. Click **Run** to see the results. You will see the count for each country for all users with the traffic source equal to Email.
    

![Results page](https://cdn.qwiklabs.com/ypbrL%2F%2BWEMP%2By2rEng%2BBqMMcJjkS%2FnJ6WU2uDQZKHV4%3D align="left")

Click **Check my progress** to verify that you've performed the above task.

Create a dynamic measure using templated filters

Check my progress

12. Try playing around with some other filter values, and click the SQL tab to review how the parameter is changing and is inserted into the SQL query for each run.
    
13. Navigate back to the **Users** view.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

---

## **Solution of Lab**

%[https://www.youtube.com/watch?v=TcxuLF_5r3c] 

**Step - 1: Turn on Development mode**

**Step - 2: Replace below code in** `users.view` **file**

```apache
view: users {
  sql_table_name: `cloud-training-demos.looker_ecomm.users`
    ;;
  drill_fields: [id]

  filter: select_traffic_source {
    type: string
    suggest_explore: order_items
    suggest_dimension: users.traffic_source
  }

  dimension: hidden_traffic_source_filter {
    hidden: yes
    type: yesno
    sql: {% condition select_traffic_source %} ${traffic_source} {% endcondition %} ;;
  }

  dimension: id {
    primary_key: yes
    type: number
    sql: ${TABLE}.id ;;
  }

  dimension: age {
    type: number
    sql: ${TABLE}.age ;;
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

  dimension_group: created {
    type: time
    timeframes: [
      raw,
      time,
      date,
      week,
      month,
      quarter,
      year
    ]
    sql: ${TABLE}.created_at ;;
  }

  dimension: email {
    type: string
    sql: ${TABLE}.email ;;
  }

  dimension: first_name {
    type: string
    sql: ${TABLE}.first_name ;;
  }

  dimension: gender {
    type: string
    sql: ${TABLE}.gender ;;
  }

  dimension: last_name {
    type: string
    sql: ${TABLE}.last_name ;;
  }

  dimension: latitude {
    type: number
    sql: ${TABLE}.latitude ;;
  }

  dimension: longitude {
    type: number
    sql: ${TABLE}.longitude ;;
  }

  dimension: state {
    type: string
    sql: ${TABLE}.state ;;
    map_layer_name: us_states
  }

  dimension: traffic_source {
    type: string
    sql: ${TABLE}.traffic_source ;;
  }

  dimension: zip {
    type: zipcode
    sql: ${TABLE}.zip ;;
  }

  measure: count {
    type: count
    drill_fields: [id, last_name, first_name, events.count, order_items.count]
  }

  measure: dynamic_count {
    type: count_distinct
    sql: ${id} ;;
    filters: [ hidden_traffic_source_filter: "Yes" ]
  }
}
```

**Step - 3: Replace below code in** `training_ecommerce.model` **file**

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

explore: +order_items {
  query: Task1 {
    dimensions: [dynamic_timeframe]
    measures: [order_count]
    filters: [order_items.select_timeframe: "created^_month"]
  }
}

explore: +order_items {
  query: Task2 {
    dimensions: [products.category_comparison]
    measures: [order_count]
    filters: [products.select_category: "Jeans"]
  }
}

explore: +order_items {
  query: Task3 {
    dimensions: [users.country]
    measures: [users.dynamic_count]
    filters: [users.select_traffic_source: "Email"]
  }
}
```

**Step - 4: Replace below code in** `products.view` **file**

```apache
view: products {
  sql_table_name: `cloud-training-demos.looker_ecomm.products`
    ;;
  drill_fields: [id]

  filter: select_category {
    type: string
    suggest_explore: order_items
    suggest_dimension: products.category
  }

  dimension: category_comparison {
    type: string
    sql:
      CASE
      WHEN {% condition select_category %}
        ${category}
        {% endcondition %}
      THEN ${category}
      ELSE 'All Other Categories'
      END
      ;;
  }

  dimension: id {
    primary_key: yes
    type: number
    sql: ${TABLE}.id ;;
  }

  dimension: brand {
    type: string
    sql: ${TABLE}.brand ;;
  }

  dimension: category {
    type: string
    sql: ${TABLE}.category ;;
  }

  dimension: cost {
    type: number
    sql: ${TABLE}.cost ;;
  }

  dimension: department {
    type: string
    sql: ${TABLE}.department ;;
  }

  dimension: distribution_center_id {
    type: string
    # hidden: yes
    sql: ${TABLE}.distribution_center_id ;;
  }

  dimension: name {
    type: string
    sql: ${TABLE}.name ;;
  }

  dimension: retail_price {
    type: number
    sql: ${TABLE}.retail_price ;;
  }

  dimension: sku {
    type: string
    sql: ${TABLE}.sku ;;
  }

  measure: count {
    type: count
    drill_fields: [id, name, distribution_centers.name, distribution_centers.id, inventory_items.count]
  }
}
```

**Step - 5: Replace below code in** `order_items.view` **file**

```apache
view: order_items {
  sql_table_name: `cloud-training-demos.looker_ecomm.order_items`
    ;;
  drill_fields: [order_item_id]

  parameter: select_timeframe {
    type: unquoted
    default_value: "created_month"
    allowed_value: {
      value: "created_date"
      label: "Date"
    }
    allowed_value: {
      value: "created_week"
      label: "Week"
    }
    allowed_value: {
      value: "created_month"
      label: "Month"
    }
  }

  dimension: dynamic_timeframe {
    label_from_parameter: select_timeframe
    type: string
    sql:
    {% if select_timeframe._parameter_value == 'created_date' %}
    ${created_date}
    {% elsif select_timeframe._parameter_value == 'created_week' %}
    ${created_week}
    {% else %}
    ${created_month}
    {% endif %} ;;
  }

  dimension: order_item_id {
    primary_key: yes
    type: number
    sql: ${TABLE}.id ;;
  }

  dimension_group: created {
    type: time
    timeframes: [
      raw,
      time,
      date,
      week,
      month,
      quarter,
      year
    ]
    sql: ${TABLE}.created_at ;;
  }

  dimension_group: delivered {
    type: time
    timeframes: [
      raw,
      date,
      week,
      month,
      quarter,
      year
    ]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.delivered_at ;;
  }

  dimension: inventory_item_id {
    type: number
    # hidden: yes
    sql: ${TABLE}.inventory_item_id ;;
  }

  dimension: order_id {
    type: number
    sql: ${TABLE}.order_id ;;
  }

  dimension_group: returned {
    type: time
    timeframes: [
      raw,
      time,
      date,
      week,
      month,
      quarter,
      year
    ]
    sql: ${TABLE}.returned_at ;;
  }

  dimension: sale_price {
    type: number
    sql: ${TABLE}.sale_price ;;
  }

  dimension_group: shipped {
    type: time
    timeframes: [
      raw,
      date,
      week,
      month,
      quarter,
      year
    ]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.shipped_at ;;
  }

  dimension: status {
    type: string
    sql: ${TABLE}.status ;;
  }

  dimension: user_id {
    type: number
    # hidden: yes
    sql: ${TABLE}.user_id ;;
  }


  measure: average_sale_price {
    type: average
    sql: ${sale_price} ;;
    drill_fields: [detail*]
    value_format_name: usd_0
  }

  measure: order_item_count {
    type: count
    drill_fields: [detail*]
  }

  measure: order_count {
    type: count_distinct
    sql: ${order_id} ;;
  }

  measure: total_revenue {
    type: sum
    sql: ${sale_price} ;;
    value_format_name: usd
  }

  measure: total_revenue_from_completed_orders {
    type: sum
    sql: ${sale_price} ;;
    filters: [status: "Complete"]
    value_format_name: usd
  }


  # ----- Sets of fields for drilling ------
  set: detail {
    fields: [
      order_item_id,
      users.last_name,
      users.id,
      users.first_name,
      inventory_items.id,
      inventory_items.product_name
    ]
  }
}
```

**Step - 6: Open each task and run from looker**