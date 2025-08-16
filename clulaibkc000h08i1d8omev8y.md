---
title: "Filtering Explores with LookML - GSP892"
seoTitle: "Filtering Explores with LookML - GSP892"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Thu Apr 04 2024 13:45:56 GMT+0000 (Coordinated Universal Time)
cuid: clulaibkc000h08i1d8omev8y
slug: filtering-explores-with-lookml-gsp892
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755317849563/1cb7ca7d-6bd0-4ef1-9eec-ef7dddf46fa8.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755318128835/d7a070bf-3375-4a83-adb4-0d536076e235.png
tags: lookml, filtering-explores-with-lookml-gsp892, filtering-explores-with-lookml, gsp892

---

## Overview

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

Explores are data views that serve as the foundation for self-service exploration by the business users in Looker. In this lab, you learn how to take your Explores to the next level by applying filters to them.

### What you'll do

In this lab, you learn how to:

* Use the `sql_always_where` and `sql_always_having` filters
    
* Use the `always_filter`
    
* Use the `conditionally_filter`
    

## Setup and requirements

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
    

## Types of Explore filters

To filter an Explore, you need to apply a default `WHERE` or `HAVING` clause to every SQL query that gets generated in that Explore. There are three principal ways to filter an Explore:

* `sql_always_where` and `sql_always_having`, which behave similarly and have the same use case
    
* `always_filter`
    
* `conditionally_filter`
    

In the following sections, you learn about common use cases for each of these.

### The sql\_always\_where and sql\_always\_having filters

Both `sql_always_where` and `sql_always_having` allow you to add filters to an Explore that *cannot be modified*. This is useful when you have certain rows of data you always want to exclude from the Explore results.

The `sql_always_where` filter is used to add a `WHERE` clause applied to **dimensions** in a SQL query, whereas `sql_always_having` is used to add a `HAVING` clause applied to **measures** in a SQL query. In addition to queries run explicitly by business users, the restriction will apply to dashboards, scheduled Looks, and embedded information that relies on that Explore.

There will be no indication of the filter in the user interface, so business users are not informed that the data are being filtered, unless they have permission to look at the generated SQL. This is useful if you want to filter out certain values of the Explore, such as test or internal data.

### The always\_filter

The `always_filter` enables you to require users to include a certain set of filters that you define. You also define a default value for the filters. Though users may change your default value for their query, they cannot remove the filter entirely. This is helpful when you want users to always filter by specific dimensions, such as always filtering by order status or user country, so that they do not request all of the possible data at one time.

The `always_filter` has a sub-parameter to define the specific filters using the same Looker filter expressions that are used to filter dimensions and measures. The dimensions provided in the filters sub-parameter identify the dimensions that users must provide values for, such as a value for order status or user country.

The specific values provided for in the filters sub-parameter are the default values which can be changed by the business user. For example, while the default order status is “Complete”, business users can change this value t[o say orders with a different status like “R](https://docs.looker.com/reference/filter-expressions)eturned”. For additional information, review the [Looker filter expressions document](https://docs.looker.com/reference/filter-expressions).

### The conditionally\_filter

Similar to the `always_filter`, the `conditionally_filter` adds a filter to the Explore frontend that is accessible by business users. The `condit`[`ionally_filter` parameter enables y](https://docs.looker.com/reference/filter-expressions)ou to define a set of default filters that users can override *if* they apply at least one filter from a second list that you define.

Although users can indeed change the filter o[perator and values, they cannot remove the filter itself unless they put a filter on](https://docs.looker.com/reference/filter-expressions) a specific alternative [field. This is helpful when you want to limit the amount of data that an business user requests, but you also want](https://docs.looker.com/reference/filter-expressions) to gi[ve them a list of alternative dime](https://docs.looker.com/reference/filter-expressions)nsions that they can use to filter the data.

`Conditionally_filter` has a sub-parameter to define the specific filters as well as a sub-parameter to d[efine the alternative dimensions t](https://docs.looker.com/reference/filter-expressions)hat can be used to filter the data. For example, `conditionally_filter` can be used to create a filter that only returns data for the past 1 year, unless a filter is applied to a user ID or state dimension. This is typically u[sed to prevent users from accident](https://docs.looker.com/reference/filter-expressions)a[lly creating very large queries th](https://docs.looker.com/reference/filter-expressions)at may be too expensive to run on you[r database.](https://docs.looker.com/reference/filter-expressions)

## [Task 1. Add an always](https://docs.looker.com/reference/filter-expressions)\_filter

In this section, you will add an `always_filter` to the Order Items Explore to require filtering on order status and user country, which are two key dimensions in the e-com[merce dataset.](https://docs.looker.com/reference/filter-expressions)

1. [First, on the bo](https://docs.looker.com/reference/filter-expressions)ttom left of the Looker User Interface, clic[k the toggle button to enter **Devel**](https://docs.looker.com/reference/filter-expressions)**opment mode**.
    

![The Development Mode toggle switched to on.](https://cdn.qwiklabs.com/uUCbNuedSCOYQmL%2BIubjqvusmGAeS7Wjj3f6xByL174%3D align="left")

2. Next, click the **Develop** tab and then select the `qwiklabs-ecommerce` LookML project.
    
3. [Navigate to the `training_ecommerc`](https://docs.looker.com/reference/filter-expressions)`e.model` file [in the `qwiklab_ecommerce` project. Notice that the Order Items Ex](https://docs.looker.com/reference/filter-expressions)plore does not currently have any filters.
    

![The training_ecommerce model opened, displaying several rows of data.](https://cdn.qwiklabs.com/U5MHehy74kDM%2BqDbHz2SOeZ%2FS%2BOJJ2h4Pto38gbgGVo%3D align="left")

4. Under the [first line to define the **Order Ite**](https://docs.looker.com/reference/filter-expressions)**ms** Explore, add a new line and type `always_filter` fol[lowed by a colon (`:`) and curly bra](https://docs.looker.com/reference/filter-expressions)ces (`{}`):
    

```apache
always_filter: {}
```

You will add code within these curly bra[ces to define the filter.](https://docs.looker.com/reference/filter-expressions)

![The training_ecommerce.model data, with the addition of the line: 'always_filter: {}'.](https://cdn.qwiklabs.com/Q%2F01ciGVdzCBZaZ5HgSd1BAIgmkxlqGgOcUFMzCCsx8%3D align="left")

5. [Usin](https://docs.looker.com/reference/filter-expressions)g the filters sub-parameter, define the fil[ters to use **status** from the `order_items` table with a def](https://docs.looker.com/reference/filter-expressions)ault value of “Complete” and **country** from [the `users` table with a default val](https://docs.looker.com/reference/filter-expressions)ue of “U[SA” using:](https://docs.looker.com/reference/filter-expressions)
    

```apache
filters: [order_items.status: "Complete", users.country: "USA"]
```

[**Note:** Recall that whi](https://docs.looker.com/reference/filter-expressions)le the a value for the filter is required, business users will be able to provide different values for these dimensions.

![The training_ecommerce.model data, with the addition of the line: 'filters: [order_items.status:"complete", users.country: "USA"]'](https://cdn.qwiklabs.com/PB53HjZzFZylHTjFWYrL2TMRY98zM9%2BC0iUVEwTj3uo%3D align="left")

6. Click **Save Changes**.
    
7. Click the caret next to [the file title at the top of the IDE and then se](https://docs.looker.com/reference/filter-expressions)lect **Explore Order Items**.
    

![The option 'Explore Order Items' highlighted within the training_ecommerce.model file's drop-down menu.](https://cdn.qwiklabs.com/Td1Gx74N3D0CrVT9IiT2Tm743DzCH2abjNcmzaBZzDE%3D align="left")

8. Click [on the arrow next to **Filters** to expand the window and see t](https://docs.looker.com/reference/filter-expressions)he two new filters with the default values:
    

* Order Items Status with a default value of `Complete`
    
* Users Country with a default value of `USA`
    

![Two filters listed; Order Items Status is equal to Complete, and Users Country is equal to USA.](https://cdn.qwiklabs.com/jH%2BTZR%2FVfWVL7GkU2rrn8KMRzCqJdOluLV3HWwOUkRE%3D align="left")

9. [Under **Order Items &gt;** **Measures**, cli](https://docs.looker.com/reference/filter-expressions)ck **Order Count**.
    
10. Click **Run**. You should now see the number [of completed order items within the USA. Notice how you cannot delete the](https://docs.looker.com/reference/filter-expressions) filters, but you can modify them.
    

![The filter results: Order Items Order Count is equal to 151, 200.](https://cdn.qwiklabs.com/BvdCLCc4o8CuKiSQ8k7hQyUpKMKKSo116PO8B7HG4hk%3D align="left")

11. Change [the filters. For the **Status** filte](https://docs.looker.com/reference/filter-expressions)r, change it to `Pr`[`ocessing`. For the **Country** filter,](https://docs.looker.com/reference/filter-expressions) change it to the `UK`.
    

![The filter results: Order Items Order Count: 134.](https://cdn.qwiklabs.com/XFFxfYo50%2BGfWDoDj6kXx88jVprVXSvEeqiBaavcXIQ%3D align="left")

12. Click **Run**. Your order items count should be updated along with the filters!
    
13. Navigate back to the `training_ecommerce.model` file.
    

### Commit changes an[d deploy to production](https://docs.looker.com/reference/filter-expressions)

1. [Click **Va**](https://docs.looker.com/reference/filter-expressions)**lidate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

## Task 2. Add a sql\_always\_where filter

In this section, you will add a `sql_always_where` filter to the Order Items Explore to only include data from the year 2021 and later. This is helpful i[f you have a large database spanni](https://docs.looker.com/reference/filter-expressions)ng many years and only want to perform queries on the data for the current year and future years.

1. Navigate back to the `training_ecommerce.model` file in the `qwiklab_ecommerce` project.
    
2. **Remove** the filter you created in the previous section.
    
3. Under the first [line to define the **Order Items** Explore, add a new](https://docs.looker.com/reference/filter-expressions) line and type `sql_always_where` followed by a colon (`:`):
    

```apache
sql_always_where:
```

Next, you will define the filter to *only include data from the year 2021 and later* using the `created_date` table.

4. Add the following to your filter:
    

```apache
sql_always_where: ${created_date} >= '2021-01-01' ;;
```

![The filter sql_always_where: ${created_date} >= '2021-01-01' ;; within the training_ecommerce model.](https://cdn.qwiklabs.com/8XAkzswvCy8%2BcBYw4Ptw3ucSP%2FSauTd3Njm7mxpglCg%3D align="left")

5. Click **Save Changes**.
    
6. Click the caret next to the file title at the top of the IDE and then select **Explore Order** [**Items**.](https://docs.looker.com/reference/filter-expressions)
    

[**Note:** Note that you don](https://docs.looker.com/reference/filter-expressions)'t see any filters. A `sql_always_where` condition is not displayed to the user, unless they look at the underlying SQL of any queries that they create.

7. Under **Order Items &gt; Created Date**, click **Date**.
    
8. Under **Order Items &gt;** **Measures**, click **Order Count**.
    
9. Click **Run**. Notice that there are o[rder items only from the date](https://docs.looker.com/reference/filter-expressions) `2021-01-01` and later!
    

![The order items listed within two categories; the Created Date, and Order Count.](https://cdn.qwiklabs.com/WcLLME2WS7VS%2BPOGCmz%2Fwub5AD0VIOMd5knl91HM0vY%3D align="left")

10. On the **Data** bar, click the **SQL** tab. Notice there is the filter defined in the `WHERE` clause for all of the data.
    

![The SQL tab, with the WHERE filter set to '(CAST(order_items.created_at AS DATE)) >= '2021-01-01''](https://cdn.qwiklabs.com/TVnXUPexG7MmF8eigINM8i0vHKyddmLPp7ihrrAFrKs%3D align="left")

11. Navigate back to the `training_ecommerce.model` file.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit messa[ge and click **Commit**.](https://docs.looker.com/reference/filter-expressions)
    
3. [Lastly, click **Deploy to Production**.](https://docs.looker.com/reference/filter-expressions)
    

## Task 3. Add a sql\_always\_having filter

In this section, you will add a `sql_always_having` filter to the Order Items Explore to prevent users from looking at orders with more than one item. This will be used to omit any orders from the Explore that have multiple items in [them.](https://docs.looker.com/reference/filter-expressions)

1. [Navigate back to the `trai`](https://docs.looker.com/reference/filter-expressions)`ning_ecommerce.model` file in the `qwiklab_ecommerce` project.
    
2. **Remove** the filter you created in the previous section.
    
3. Under the first line to define the **Order Items** Explore, add a new line and type `sql_always_having` followed by a colon (`:`):
    

```apache
sql_always_having:
```

4. Next, you will define the filter to only [include the data with 1 order item](https://docs.looker.com/reference/filter-expressions), using the `order_item_count` measure:
    

```apache
sql_always_having: ${order_item_count} = 1 ;;
```

![The training_ecommerce model's filter: 'sql_always_having: ${order_item_count} = 1 ;;'.](https://cdn.qwiklabs.com/W3uEziymhULUbH2g3GfMntEEvr%2FeZQO1Ugw458S2RDA%3D align="left")

5. Click **Save Changes**.
    
6. Click the caret next to the file title at the top of the IDE and then select **Explore Order Items**.
    

**Note:** Again, notice that you don't see any filters. A `sql_always_having` condition condition is not displayed to the user, unless they look at the underlying SQL of any queries that they create.

7. Under **Order Items**, click [**Order ID**.](https://docs.looker.com/reference/filter-expressions)
    
8. [Under **Order Items &gt;** **Measures**, click **Average Sale Pr**](https://docs.looker.com/reference/filter-expressions)**ice** and **Order Item Count**.
    
9. Click **Run**. You should see the different orders and their respective average sale prices. As you can see, the items count is a[lways equal to 1!](https://docs.looker.com/reference/filter-expressions)
    

![The order items list, divided into three categories: Order ID, Order Item Count, and Average Sale Price.](https://cdn.qwiklabs.com/EpY3aHV82FsFQ2%2FhFR75NQYAM96mvaT6Qf%2BBxjkKG6w%3D align="left")

10. [Navigate b](https://docs.looker.com/reference/filter-expressions)ack to the `training_ecommerce.model` file.
    

### Commit changes and deploy to produ[ction](https://docs.looker.com/reference/filter-expressions)

1. [Click **Validate LookML** and](https://docs.looker.com/reference/filter-expressions) then click **Commit Changes & Push**.
    
2. Add a commit m[essage and click **Commit**.](https://docs.looker.com/reference/filter-expressions)
    
3. [Lastly](https://docs.looker.com/reference/filter-expressions), click **Deploy to Production**.
    

## Task 4. Add a conditionality\_filter

In this section, you will add a `conditionality_filter` f[ilter to the Order Items Explore t](https://docs.looker.com/reference/filter-expressions)o only return data for the past 3 years, *unless* a filter is applied to a user ID or state dimension.

1. Navigate back to the `trai`[`ning_ecommerce.model` file in the `qwiklab_ec`](https://docs.looker.com/reference/filter-expressions)`ommerce` project.
    
2. **Remove** the filte[r you created in the previous sect](https://docs.looker.com/reference/filter-expressions)ion.
    
3. Under the first line to define the **Order Items** Explore, add a new line and type `conditionally_filter` followed by a colon (`:`) and curly braces (`{}`):
    

```apache
conditionally_filter: {}
```

You will add code within these curly b[races to define the filter.](https://docs.looker.com/reference/filter-expressions)

4. [Add the `filt`](https://docs.looker.com/reference/filter-expressions)`ers` sub-parameter to define this filter.
    

Here, you want the order created date to be in the past 3 years. You [will also define the `unless` sub-parameter as an alternat](https://docs.looker.com/reference/filter-expressions)ive dimension that can be used as a filter. For this, you will use the [user ID and state dimensions:](https://docs.looker.com/reference/filter-expressions)

```apache
filters: [created_date: "3 years"]
unless: [users.id, users.state]
```

![The filters used within the training_ecommerce model: 'filters: [created_date: "3 years"]' and 'unless: [users.id, users.state]'](https://cdn.qwiklabs.com/gTNGS7dsBq4oQBtYePLYTcE%2BRBBJymK2%2BbPvhdgIvKE%3D align="left")

5. Cl[ick **Save Changes**.](https://docs.looker.com/reference/filter-expressions)
    
6. [Click the car](https://docs.looker.com/reference/filter-expressions)et next to the file t[itle at the top of the IDE and the](https://docs.looker.com/reference/filter-expressions)n select **Explo**[**re Order Items**.](https://docs.looker.com/reference/filter-expressions)
    
7. [Click on the ar](https://docs.looker.com/reference/filter-expressions)row next to **Filter**[**s** to expand the window and see the](https://docs.looker.com/reference/filter-expressions) conditional filter you created. Success!
    

![The conditional filter set to 'is in the past 3 years'.](https://cdn.qwiklabs.com/iT0z9LY%2FZwoQtNXOO35%2BBjAQhfD1p8rkHTfVsdKuGJc%3D align="left")

8. Next, under **Order Items**, click **Order ID**.
    
9. Under **Order Items &gt; Created D**[**ate**, click **Year**.](https://docs.looker.com/reference/filter-expressions)
    
10. [Under **Order It**](https://docs.looker.com/reference/filter-expressions)**ems &gt;** **Measures**, click **Average Sale Price**.
    
11. Click **Run**.
    

You can now see your creat[ed date is filtered in the past ye](https://docs.looker.com/reference/filter-expressions)ar in your Explore.

![The filter results, which list the orders created in the past year.](https://cdn.qwiklabs.com/LudgD6zgO3QaQ%2B1Bn7imsytGZ8sjIDCACxCbd9hoNA8%3D align="left")

12. You will now test the [conditionality of the filter. Und](https://docs.looker.com/reference/filter-expressions)er **Users**, hover over [**State** and click the filter button.](https://docs.looker.com/reference/filter-expressions)
    

![The filter button highlighted within the State category.](https://cdn.qwiklabs.com/nJ%2BHx2dgaMrzxQUAFcVDtXaFNuk%2FHyZVKOz82P8oSvU%3D align="left")

13. In [the filter window, set the **State**](https://docs.looker.com/reference/filter-expressions) filter to: `California`.
    
14. Cli[ck the **X** next to the other filter](https://docs.looker.com/reference/filter-expressions) to delet[e it.](https://docs.looker.com/reference/filter-expressions)
    

![The Delete button highlighted within the filter, 'Created date = is in the past 3 years'.](https://cdn.qwiklabs.com/IqlrTVt%2F2W8TKKPkppJjgdsjW%2B2v%2FOjWtY8jSJzHVRs%3D align="left")

15. [Click **Run** again.](https://docs.looker.com/reference/filter-expressions)
    

![The orders listed within three cetegories; Order ID, Created Year, and Average Sale Price.](https://cdn.qwiklabs.com/ob6u%2F43Dq0ZuXTc3Nrgdjnqs%2FTMzEw4Zit34UBlfuW8%3D align="left")

16. Last[ly, remove the **State** filter by cli](https://docs.looker.com/reference/filter-expressions)cking [the **X** next to it to delete it. Yo](https://docs.looker.com/reference/filter-expressions)u will see the **Created Date** filter automatically appears again.
    

![The Create Date filter, which is currently set to 'is in the past 3 years'.](https://cdn.qwiklabs.com/iT0z9LY%2FZwoQtNXOO35%2BBjAQhfD1p8rkHTfVsdKuGJc%3D align="left")

Great! You just explored how conditional filters work. While you can change the default value that you set, you **cannot completely remove the filter** unless you apply at least one of the [filters you specified in the `unle`](https://docs.looker.com/reference/filter-expressions)`ss` sub-parameter.

17. Navigate back to the `training_eco`[`mmerce.model` file.](https://docs.looker.com/reference/filter-expressions)
    

### [Commit chang](https://docs.looker.com/reference/filter-expressions)es and deploy to product[ion](https://docs.looker.com/reference/filter-expressions)

1. [Click **Validate LookML** and t](https://docs.looker.com/reference/filter-expressions)hen click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Producti**[**on**.](https://docs.looker.com/reference/filter-expressions)
    

[Click *Check my progress* to verify th](https://docs.looker.com/reference/filter-expressions)e objective.

Add the conditionally\_filter filter to the Order Items Explore

---

## Solution of Lab

%[https://youtu.be/QUc2aEoJjms] 

### Manual

**Task 2. Add an always\_filter**

`training_ecommerce.model`

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
  always_filter: {
    filters: [order_items.status: "Complete", users.country: "USA"]
  }
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
```

**Task 3. Add a sql\_always\_where filter**

`training_ecommerce.model`

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
  sql_always_where: ${created_date} >= '2021-01-01' ;;
  
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
```

**Task 4. Add a sql\_always\_having filter**

`training_ecommerce.model`

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
  sql_always_having: ${order_item_count} = 1 ;;
  
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
```

**Task 5. Add a conditionality\_filter**

`training_ecommerce.model`

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
  conditionally_filter: {
    filters: [created_date: "3 years"]
    unless: [users.id, users.state]
  }
  
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
```