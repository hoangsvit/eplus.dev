---
title: "Modularizing LookML Code with Extends - GSP936"
seoTitle: "Modularizing LookML Code with Extends - GSP936"
seoDescription: "Looker is a modern data platform in Google Cloud that you can use to analyze and visualize your data interactively. LookML developers curate the data used b"
datePublished: Fri Aug 16 2024 07:27:12 GMT+0000 (Coordinated Universal Time)
cuid: clzwdzelp000309mh7ssnamet
slug: modularizing-lookml-code-with-extends-gsp936
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723793406778/ff78e309-f43b-4236-805f-6fa2751f68c9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723793413390/0a63d99f-d09d-46a4-ae93-22ca9a9ad6b9.png
tags: modularizing-lookml-code-with-extends-gsp936, gsp936

---

## **Overview**

Looker is a modern data platform in Google Cloud that you can use to analyze and visualize your data interactively. LookML developers curate the data used by business users by creating new fields, tables, views, and Explores to customize and organize data.

In this lab, you learn how to modularize LookML code by extending views and Explores.

### Prerequisites

Familiarity with LookML is necessary. It is recommend that you complete [Understanding LookML in Looker](https://www.cloudskillsboost.google/course_templates/774) before you begin this lab.

### What you'll learn

* Describe how extends allow you to modularize and easily reuse LookML code.
    
* Extend a view by integrating columns defined in another view.
    
* Extend an Explore by integrating joins defined in another Explore.
    

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
    

## **What are LookML Extends?**

Extends allow you to modularize code by creating copies of LookML objects that can then be integrated into other LookML objects and modified independently from the original LookML object. In Looker, you can extend views, Explores, and LookML-defined dashboards. By modularizing your code, extends allow you to treat pieces of code as modules or units that you can then build upon to expand your model.

### Why use extends?

![Reasons given are: writing DRY code, easier/faster to make changes, consistency, easier management of different field sets](https://cdn.qwiklabs.com/gRm1nTmraWQXJoQ4VIR%2BA3FkLjUkNZexoPTbfrMTA5o%3D align="left")

Extends help you write D.R.Y. (Don’t Repeat Yourself) code. By copying preexisting objects and sections of code, you can more easily add or modify logic. This is critical for scaling your model as your organization and use cases expand. It also maximizes consistency in your model, because you aren’t manually rewriting code all the time. And it makes it easier to manage field access for different groups of users, which is also important for scalability.

### LookML view extends

As mentioned earlier, one object you can extend is a LookML view. This is commonly done to add more fields and/or update logic to the existing fields. Another use case is to change the database table specified in the sql\_table\_name parameter.

![Flow diagrams outlining Adding fields to a view versus Changing the table of a view](https://cdn.qwiklabs.com/KylHFNnfTooEmGyHB8YXWpdGpALscYu7xsRVjaZCE5M%3D align="left")

### LookML Explore extends

Another object you can extend is Explores. You may have multiple tables that must always be joined together, especially in a more normalized database architecture. To avoid rewriting the same joins repeatedly, you can make a “base” Explore that already joins them together and then extend it to create additional Explores that need to join in more views. Or you may need the same set of joined views, but with the new Explore starting from a different base view.

![Flow diagrams outlining Adding views to an explore versus Changing the base view of an explore](https://cdn.qwiklabs.com/LfMDRKmGoZzlLxL3CyZEHvkH0BvsW67PyGvfyJWGrsM%3D align="left")

### The four steps involved in Extend execution

![Steps include copy, merge, resolve conflicts, and finish](https://cdn.qwiklabs.com/j4CsqaSjajdr7ZjQrdVsc%2FUhl9h854akbLwEsOk6DDc%3D align="left")

"Behind the scenes" with an Explore:

1. Looker makes a copy of the LookML object being extended.
    
2. The copy, or *extending object*, is merged with the new or modified definitions.
    
3. If any conflicts are detected (which happens if you modified definitions), the extending object controls.
    
4. The extending object can be used in your LookML model just like any other object.
    

**Note:** Although implementing extends is a simple process, knowing these details is useful if you encounter unexpected behavior.

## **Task 1. Extend a view to add columns from another view**

Instead of copying/pasting the same code across multiple views, you can create one centralized view that contains definitions for commonly used dimensions and measures. Then, using extends, you can integrate those dimensions and measures into multiple views. You can simply use specific parameters for extends to identify the view that you want Looker to copy from.

From a business perspective, this is very practical because you can have one centralized code base that is reused by multiple teams that can extend the core code and customize it for their own needs. The benefit of abstracting the location dimensions is that you can update them once, and the update is then propagated to any of the views that are extended from that location view.

In this task, you create a new view that contains location dimensions (e.g., city, country) that can be reused by extending other views such as the users and events views.

### Create a new view

1. Click the toggle button to enter **Development mode**.
    
2. On the **Develop** tab, select the **qwiklabs-ecommerce** LookML project.
    
3. Click (**+**) next to File Browser, and select **Create View**.
    
4. Name the view `location`, drag it under the **views** folder, and add the following code to it:
    

```apache
view: location {
  extension: required

  dimension: city {
    type: string
    sql: ${TABLE}.city ;;
  }

  dimension: state {
    type: string
    sql: ${TABLE}.state ;;
    map_layer_name: us_states
  }

  dimension: zip {
    type: zipcode
    sql: ${TABLE}.zip ;;
  }

  dimension: country {
    type: string
    map_layer_name: countries
    sql: ${TABLE}.country ;;
  }
  
  dimension: latitude {
    type: number
    sql: ${TABLE}.latitude ;;
  }
  
  dimension: longitude {
    type: number
    sql: ${TABLE}.longitude ;;
  }
}
```

Copied!content\_copy

This view file contains the definitions for dimensions that you want to reuse in other views: **city**, **country**, **latitude**, **longitude**, **state**, and **zip**.

Notice line 2 (`extension: required`), which means that this view *cannot be joined to other views*, and thus will not be visible to users. To use this view, you must integrate it into another view using the `extends` parameter, which you do in the next section.

Also notice that, unlike with other views, you do not need to include the parameter `sql_table_name` in the view definition to identify which table to use for the data. Instead, this view will use the table specified in the view that will be extended in the next section.

5. Click **Save Changes**, and then click **Validate LookML**.  
    No LookML errors were found, and your file should resemble the following:
    

![The open, updated location.view file which includes 31 lines of code](https://cdn.qwiklabs.com/19EzGebMAI1IABr15f5cRMj4oOVbwt3XNm67749jVIs%3D align="left")

### Add extends

1. Open the **users.view** file.
    
2. On a new line at the top of the file (line 1), add the following code, which indicates that the users view is being extended using the location view:
    

```apache
include: location.view
```

Copied!content\_copy

3. On line 3 above `sql_table_name`, add the following code:
    

```apache
extends: [location]
```

Copied!content\_copy

**Note:** Because the extends are added, the `sql_table_name` parameter identifies which table to use as the data source for both the existing objects in the file and the objects that are added from geography via the extend.

4. Remove the existing dimension definitions for: `city`, `country`, `latitude`, `longitude`, `state`, and `zip` (this is the existing order in the file). Instead of being explicitly defined in the **users.view** file, these dimensions are integrated via the extend from **location.view**.
    
5. Click **Save Changes**, and then click **Validate LookML**.
    
6. Open the **event.view** file.
    
7. On a new line at the top of the file (line 1), add the following code:
    

```apache
include: location.view
```

Copied!content\_copy

8. On line 3 above `sql_table_name`, add the following code:
    

```apache
extends: [location]
```

Copied!content\_copy

9. As you did with the users view, remove the existing dimension definitions for: `city`, `country`, `latitude`, `longitude`, `state`, and `zip`.
    
10. Click **Save Changes**, and then click **Validate LookML**.
    

Your file should now resemble the following:

![The open updated events.view file which includes 25 lines of code](https://cdn.qwiklabs.com/Wulzr%2BKHsWkcNdaH8RDGzpckZILim4jsmeTqlohhRHE%3D align="left")

### Test the extended view for Users and Events in the Order Items Explore

1. Navigate to the Explore page for **Order Items**.
    
2. From the **Users** view, select the **City**, **Country**, **Latitude**, **Longitude**, **State**, and **Zip** dimensions.
    
3. Click **Run**.
    

Even though you removed the definitions for these dimensions (city, country, latitude, longitude, state and zip) from the **users.view** file, you can see and use them because they were added to the **users.view** file using an extend from the **location.view** file!

![The order items explore visualization displaying the columns from the users.view and location.view files](https://cdn.qwiklabs.com/jpyIz1Q5xMRfFIXIQTukkgnE5J%2B6Ia7a2MpZx3C0Zxc%3D align="left")

4. Navigate to the **Events Explore**.
    
5. From the **Events** view, select the **City**, **Country**, **Latitude**, **Longitude**, **State**, and **Zip** dimensions.
    

![The order items explore visualization displaying the dimentions from the events.view file](https://cdn.qwiklabs.com/95EUkiPr6YKQtuWaDUqmLjb3wa0LebH1KgA%2BorE27lM%3D align="left")

Again, even though you removed the definitions for these dimensions from the **events.view** file, you can see and use them because they were added to the **events.view** file using an extend.

6. Navigate back to the **events.view** file in the Looker IDE.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click *Check my progress* to verify the objective.

Extend a view to add columns from another view

**Check my progress**

## **Task 2. Extend an Explore to add joins from another Explore**

Instead of copying/pasting the same joins across multiple Explores in a model file, you can create one base Explore that contains the most commonly used joins across your Explores. Then you can use extends to reuse that base Explore to define and customize other Explores defined in the model file.

A common business use case for this is creating one core Explore that can be used to create other Explores for specific user groups/teams within your organization.

In this section, you create one base Explore that contains joins for all views that are needed by multiple business teams, and then use extends to reuse and customize that base Explore for multiple teams.

1. Navigate to the **training\_ecommerce.model** file.
    
2. After the `order_items` Explore definition (around line 43), create a new base Explore called `base_events`, using the following code:
    

```apache
explore: base_events {
  extension: required
  join: event_session_facts {
    type: left_outer
    sql_on: ${events.session_id} = ${event_session_facts.session_id} ;;
    relationship: many_to_one
  }
  join: users {
    type: left_outer
    sql_on: ${events.user_id} = ${users.id} ;;
    relationship: many_to_one
  }
}
```

Copied!content\_copy

Notice again the line for `extension: required`, which means that this Explore is not visible to users. Your file should resemble the following:

![The open training.ecommerce.model file with the added lines of base_events explore code highlighted](https://cdn.qwiklabs.com/9U9%2Be%2FY1RLgAeByvSaYixpXxR%2BgaUtgGXtd11LaNhN8%3D align="left")

Next, you'll modify the existing definition for the **events** Explore to extend it with the views from `base_events`.

3. From the **events** Explore, remove the existing joins for `event_session_facts` and `users`.
    

These joined views are integrated from the `base_events` Explore via code added in the next step. Notice that the join definition for `event_session_funnel` remains to customize this Explore for a particular set of users. Your file should resemble the following:

![The open training.ecommerce.model file with the updated lines 43 to 56 highlighted](https://cdn.qwiklabs.com/MVgLBDCdI6dLQ%2Fqhzgc%2BWf9jHqNe4aKsy3B4%2FqMlnHA%3D align="left")

4. Under the first line of the **events** Explore definition, add the following code:
    

```apache
description: "Start here for Event analysis"
  fields: [ALL_FIELDS*]
from: events
  view_name: events
  extends: [base_events]
```

Copied!content\_copy

**Note:** The new lines provide a description for the Explore info button, identify which fields from which view file to include (all fields), and specify which Explore is being used to extend the **events** Explore.

Your final definition for the **events** Explore should resemble the following:

![The training.ecommerce.model file with the lines of events explore updated](https://cdn.qwiklabs.com/G0Qn4JIqAWyvofWRKLrzj7%2BovbYsgBTh8ARVTif1kX8%3D align="left")

**Note:** The `from` and `view_name` are both pointing to the events view, so why include both? The `from` makes sure that you are using the original view called events (not an alias name for the view and not an extended one), and the `view_name` is the view file name, which could be an alias, etc.

5. Below the modified **events** Explore definition, to add a new Explore called **conversions**, use the following code:
    

```apache
explore: conversions {
  description: "Start here for Conversion Analysis"
  fields: [ALL_FIELDS*, -order_items.total_revenue_from_completed_orders]
  from: events
  view_name: events
  extends: [base_events]
  join: order_items {
    type: left_outer
    sql_on: ${users.id} = ${order_items.user_id} ;;
    relationship: many_to_many
  }
}
```

Copied!content\_copy

Lines 2-6 here provide a description for the Explore info button, identify which fields from which view file to include (all fields except the `total_revenue_from_completed_orders` measure in the order items view), and specify which Explore is being used to extend this Explore (i.e., the same **base\_events** Explore that was used to extend the **events** Explore).

6. Click **Save Changes**, and then click **Validate LookML**.  
    No LookML errors were found, and your file should resemble the following:
    

![The training.ecommerce.model file with the lines of conversions explore code added](https://cdn.qwiklabs.com/KgiE437OUWFN4Wj8M9u8%2Fzx9yVsm%2FbmoJYI24RNv18w%3D align="left")

Now it's time to test your new Explores. Go to each Explore (**Events** and **Conversions**), and notice which views are included. Because the Explores share a core set of views but are customized with additional views, each one serves a different user audience.

7. Navigate to the **Events** Explore, which contains the views joined in the base Explore (**Events**, **Event Session Facts**, **Users**) plus the **Event Session Funnel** view.
    

![The Explore Events page listing Custom Fields, Event Session Facts, Events Session Funnel, Events and Users under the All Fields tab](https://cdn.qwiklabs.com/rQe2tmegunRGCqlT74qHTZMKvBjUi2CbIplMdaW31%2Bw%3D align="left")

8. To review the description, hold the pointer over **Information** () next to **Events**.
    
9. Navigate to the **Conversions** Explore, which contains the views joined in the base Explore (**Events**, **Event Session Facts**, **Users**) plus the **Order Items** view.
    

![The Conversations page listing Custom Fields, Event Session Facts, Events, Order Items and Users under the All Fields tab](https://cdn.qwiklabs.com/k1JuHUES9W4%2FkMljWCJW4Asvx3wPfJbCPdX6UHTzVzE%3D align="left")

10. To review the description, hold the pointer over **Information** () next to **Conversions**.
    
11. Review the measures in the **Order Items** view; `total_revenue_from_completed_orders` is not listed.
    
12. Return to the **training\_ecommerce.model** file in the Looker IDE.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click *Check my progress* to verify the objective.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=3Cc1sEEF0vY] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723792222422/479ae2be-99ef-4fad-8a07-e52cc0ff64ef.png align="center")

```bash
FILE NAME:  location
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723792256333/7170bd03-4f1a-4f01-9eec-76d6cf48d7a2.png align="center")

```apache
view: location {
  extension: required
  dimension: city {
    type: string
    sql: ${TABLE}.city ;;
  }
  dimension: state {
    type: string
    sql: ${TABLE}.state ;;
    map_layer_name: us_states
  }
  dimension: zip {
    type: zipcode
    sql: ${TABLE}.zip ;;
  }
  dimension: country {
    type: string
    map_layer_name: countries
    sql: ${TABLE}.country ;;
  }

  dimension: latitude {
    type: number
    sql: ${TABLE}.latitude ;;
  }

  dimension: longitude {
    type: number
    sql: ${TABLE}.longitude ;;
  }
}
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723792312789/07821485-552e-4616-a287-10528e0d8198.png align="center")

---

```bash
FILE NAME :  users
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723792394517/38d20f2d-0fa7-4f8d-b107-d914ba09f11f.png align="center")

```apache
include: location.view
view: users {
  extends: [location]
  sql_table_name: `cloud-training-demosoker_ecomm.users`
    ;;
  drill_fields: [id]

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
}
```

```bash
FILE NAME :   events
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723792449798/5a9c67d5-4e27-4122-bc93-22dc1752ac6f.png align="center")

```bash
include: location.view
view: events {
  extends: [location]
  sql_table_name: `cloud-training-demos.looker_ecomm.events`
    ;;
  drill_fields: [id]

  dimension: id {
    primary_key: yes
    type: number
    sql: ${TABLE}.id ;;
  }

  dimension: ad_event_id {
    type: number
    # hidden: yes
    sql: ${TABLE}.ad_event_id ;;
  }

  dimension: browser {
    type: string
    sql: ${TABLE}.browser ;;
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

  dimension: event_type {
    type: string
    sql: ${TABLE}.event_type ;;
  }

  dimension: ip_address {
    type: string
    sql: ${TABLE}.ip_address ;;
  }

  dimension: latitude {
    type: number
    sql: ${TABLE}.latitude ;;
  }

  dimension: longitude {
    type: number
    sql: ${TABLE}.longitude ;;
  }

  dimension: os {
    type: string
    sql: ${TABLE}.os ;;
  }

  dimension: referrer_code {
    type: string
    sql: ${TABLE}.referrer_code ;;
  }

  dimension: sequence_number {
    type: number
    sql: ${TABLE}.sequence_number ;;
  }

  dimension: session_id {
    type: string
    sql: ${TABLE}.session_id ;;
  }

  dimension: state {
    type: string
    sql: ${TABLE}.state ;;
  }

  dimension: traffic_source {
    type: string
    sql: ${TABLE}.traffic_source ;;
  }

  dimension: uri {
    type: string
    sql: ${TABLE}.uri ;;
  }

  dimension: user_id {
    type: number
    # hidden: yes
    sql: ${TABLE}.user_id ;;
  }

  dimension: zip {
    type: zipcode
    sql: ${TABLE}.zip ;;
  }

  measure: count {
    type: count
    drill_fields: [id, ad_events.id, users.last_name, users.id, users.first_name]
  }
}
```

---

```bash
FILE NAME :-  training_ecommerce
```

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

explore: base_events {
  extension: required
  join: event_session_facts {
    type: left_outer
    sql_on: ${events.session_id} = ${event_session_facts.session_id} ;;
    relationship: many_to_one
  }
  join: users {
    type: left_outer
    sql_on: ${events.user_id} = ${users.id} ;;
    relationship: many_to_one
  }
}

explore: events {
  description: "Start here for Event analysis"
  fields: [ALL_FIELDS*]
  from: events
  view_name: events
  extends: [base_events]
  join: event_session_funnel {
    type: left_outer
    sql_on: ${events.session_id} = ${event_session_funnel.session_id} ;;
    relationship: many_to_one
  }
}

explore: conversions {
  description: "Start here for Conversion Analysis"
  fields: [ALL_FIELDS*, -order_items.total_revenue_from_completed_orders]
  from: events
  view_name: events
  extends: [base_events]
  join: order_items {
    type: left_outer
    sql_on: ${users.id} = ${order_items.user_id} ;;
    relationship: many_to_many
  }
}
```