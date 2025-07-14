---
title: "Answering Complex Questions Using Native Derived Tables with LookML - GSP935"
seoTitle: "Answering Complex Questions Using Native Derived Tables with LookML -"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Sat Jun 07 2025 09:03:48 GMT+0000 (Coordinated Universal Time)
cuid: cmbm0bxu3000j02l5h5ax6t7w
slug: answering-complex-questions-using-native-derived-tables-with-lookml-gsp935
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749287001190/656c4b91-9817-4bb0-8edf-76860d08af11.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749287015660/2fd5b8d1-b4cd-4fb3-94c1-3332b72608ca.png
tags: answering-complex-questions-using-native-derived-tables-with-lookml-gsp935, answering-complex-questions-using-native-derived-tables-with-lookml, gsp935

---

## Overview

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

In this lab, you will learn how to leverage native derived tables to answer complex questions, address advanced use cases, and customize them using built-in parameters.

### What you'll learn

You will learn how to:

* Create native derived tables to answer complex questions using derived columns.
    
* Update a native derived table to generate dynamic values using built-in filter parameters.
    
* Understand how business users leverage customized native derived tables to answer complex questions.
    

### Prerequisites:

To maximize your learning, familiarity with LookML is necessary and completing the [Understanding LookML in Looker](https://www.cloudskillsboost.google/course_templates/774) skill badge course is recommended before beginning this lab.

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
    

## Task 1. Customize native derived tables using derived columns

Native derived tables are derived tables that perform the same function as a written SQL query, but are expressed [natively](https://docs.looker.com/data-modeling/learning-lookml/creating-ndts) in the LookML language.

Why should you use native derived tables? Think about the **user\_facts** SQL derived table you made in the previous lab. You did a **COUNT** of order IDs as `lifetime_order_count`, and a **SUM** of sale\_price as `lifetime_revenue`. If you didn't already notice, these aggregations already exist in your model as measures! Your **order\_items** view already has an `order_count` and a `total_sales`.

Native derived tables are great because they embody the core LookML principle of *reusability*. They allow you to inherit already existing dimensions, measures and even Explores and join logic. This makes your model much more maintainable in the long run, since you’re minimizing the number of “hard-coded” database references.

In this section, you will create a native derived table named `brand_order_facts` that contains a derived column to rank brands by total revenue and that can be filtered using a dynamic date range and/or user inputs. You will also create new dimensions that label rows as being in the top 5 brands or not (i.e. lump all brands ranked 6+ as one brand name of “`6) Other`”).

### Create a native derived table that ranks the top 5 brands by total sale

1. First, on the bottom left of the Looker User Interface, click the toggle button to enter **Development mode**.
    
2. On the **Looker navigation menu**, click **Explore**.
    
3. Under **E-Commerce Training**, click **Order Items**.
    
4. Under the **Inventory Items** view, click the **Product Brand** dimension.
    
5. Under the **Order Items** view, click the **Total Revenue** measure.
    
6. Click **Run**.
    
7. Click on the settings gear icon () next to **Run** (top right of page), and select **Get LookML**.
    
8. Tab over to **Derived Table,** click on the LookML code in the box, and copy it to your clipboard.
    
9. Navigate to the Looker IDE (**Develop &gt; qwiklabs-ecommerce**), click on the plus (**+**) icon next to File Browser, and choose **Create View**.
    
10. Name the new view `brand_order_facts` and click **Create**.
    
11. Click **brand\_order\_facts.view** and drag it under the **views** folder.
    
12. **Erase all the sample auto-generated code**, and paste in the copied code from the Explore. Don’t forget to fix the auto-generated view name to `brand_order_facts`. Your view should resemble:
    

![File browser page showing brand_order_facts.view code](https://cdn.qwiklabs.com/gf65k0FzhM6r4e1U7leYRlSXA9u1Z36RfR9sKLyrKds%3D align="left")

13. Click **Save Changes**.
    

### Add a brand rank derived column

So now you have the foundation for your native derived table. The next task is to rank the brands, this can be achieved in most SQL dialects through what is called a `ROW_NUMBER()` function.

To accomplish this, you'll need to add a **derived\_column** to your native derived tables' **explore\_source**. In a native derived table, you can use `derived_column` to specify a column that *does not yet exist* in the Explore specified by the **explore\_source** parameter. For this example, you will call it `brand_rank`.

1. Under the `column: total_revenue {}` definition, start by defining the `brand_rank` derived column:
    

```apache
derived_column: brand_rank {}
```

2. Next, in the curly braces, add the following sql parameter to it:
    

```apache
derived_column: brand_rank {
    sql: row_number() over (order by total_revenue desc) ;;
}
```

Whenever you make a derived column, you also need to add a dimension for it. It is the same as when you have a column in your regular database table; the column needs to be represented in LookML as a dimension. Have you noticed the auto-generated dimensions don’t have a sql parameter? That is because, when you don’t specify the sql for a dimension, Looker assumes it should point to a column in the underlying data with exactly the same name as the dimension. That can be a useful shortcut for other areas of your project if you’d like, although generally it is a better practice to be explicit whenever possible. In this case, you should at least specify the type. If you don’t, Looker defaults to string, which you do not want here.

3. Outside of the **derived\_table** definition, just above the `product_brand` dimension, add the following code:
    

```apache
dimension: brand_rank {
    type: number
  }
```

Your new view should now resemble the following:

![File browser page showing brand_order_facts.view code](https://cdn.qwiklabs.com/9WdCJd%2B%2Bl83E8ncwsdlYo%2FmZylS7pMUkDWrNbfltxXs%3D align="left")

4. Click **Save Changes**.
    
5. Then, from the same page, click on the `training_ecommerce.model` file inside of the **model** folder to modify its contents.
    
6. Locate the `explore: order_items` definition.
    
7. In the `explore: order_items` definition, add a new join for `brand_order_facts` by specifying:
    

```apache
join: brand_order_facts {
    type: left_outer
    sql_on: ${inventory_items.product_brand} = ${brand_order_facts.product_brand} ;;
    relationship: many_to_one
  }
```

8. Click **Save Changes**.
    
9. Your model file should now resemble the following:
    

![File browser page showing training_ecommerce.model code](https://cdn.qwiklabs.com/ktV2UBVNjO28nk%2FCmJbQxWKGLKPnzIO8g%2BWATjO%2FoaM%3D align="left")

10. Now that you've joined the `brand_order_facts` view to the Explore, navigate to the Explore page for **Order Items**.
    
11. Under the **Brand Order Facts** view, select the **Brand Rank**, **Product Brand**, and **Total Revenue** dimensions.
    
12. Set the Row Limit to **10**.
    
13. Click **Run**. Your result should look like the following:
    

![Output result table displaying 10 rows of data under the column headings: Brand Order Facts Brand Rank, Brand Order Facts Product Brand, and Brand Order Facts Total Revenue](https://cdn.qwiklabs.com/W%2BUZZZSyTwqXOnGhWgT6QEKQVf3ZmcYPQTqSxqzCeAY%3D align="left")

So far so good! But what if your business users want to see the brand names displayed like "1) Example Brand", and not just "Example Brand" alone. How would this be accomplished? In this case, you could create a dimension that concatenates two other dimension values.

14. Navigate back to the **brand\_order\_facts** view.
    
15. Make another dimension called `brand_rank_concat`, which concatenates the brand rank and the product brand:
    

```apache
dimension: brand_rank_concat {
  type: string
  sql: ${brand_rank} || ') ' || ${product_brand} ;;
}
```

16. Hide `brand_rank` since business users would probably just find the rank number in our new `brand_rank_concat`, and not want to use a separate field:
    

```apache
dimension: brand_rank {
    hidden: yes
    type: number
  }
```

17. Add a label to `brand_rank_concat` so it appears more user-friendly. Use the label “Brand Name”:
    

```apache
dimension: brand_rank_concat {
  label: "Brand Name"
  type: string
  sql: ${brand_rank} || ') ' || ${product_brand} ;;
}
```

For the final step, you'll need to lump all brands at rank 6 and beyond into an “Other” classification. To do this, you will first make a “stepping-stone” dimension that evaluates whether a brand’s rank is in the top 5 or not.

18. In the same **brand\_order\_facts** view, create a new dimension named `brand_rank_top_5` with the following parameters:
    

```apache
dimension: brand_rank_top_5 {
    hidden: yes
    type: yesno
    sql: ${brand_rank} <= 5 ;;
  }
```

19. Next, create a new dimension named `brand_rank_grouped` and incorporate the `brand_rank_top_5` into it with the following code:
    

```apache
dimension: brand_rank_grouped {
  label: "Brand Name Grouped"
  type: string
  sql: case when ${brand_rank_top_5} then ${brand_rank_concat} else '6) Other' end ;;
}
```

20. Click **Save Changes**.
    

Your view should now resemble the following:

![File browser page showing brand_order_facts.view code](https://cdn.qwiklabs.com/Y7Mgp8hUKCKFAoKQcjovbvqWTE9pPYcrrYIu8MGBcqI%3D align="left")

21. Navigate back to the Explore page for **Order Items**.
    
22. Under the **Brand Order Facts** view, select the **Brand Name Grouped** dimension.
    

Under the **Order Items** view, select the **Total Revenue** measure. Set the Row Limit to 10.

23. Click **Run**.
    
24. Make sure the **Brand Name Grouped** column is ordered from first to last, then under the Visualization tab, click **Pie Chart**.
    
25. Verify your visualization resembles the following:
    

![Output result pie chart displaying Example Brand groupings](https://cdn.qwiklabs.com/nb30Bq9S6a0vtjyitaWubW8a1hcBNnvkyyieBL5IXZk%3D align="left")

26. Click on the settings gear icon () next to **Run** (top right of page), and select **Save &gt; As a Look**.
    
27. Title your Look: `Ranked Brand Revenue`.
    
28. Click **Save**.
    
29. Navigate back to the **brand\_order\_facts** view.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Great! Hopefully this helps you appreciate how useful it can be to break down a use case or desired logic into separate basic dimensions, that you can then combine or build upon to answer specific business questions. It is very common in best-practice LookML development to have lots of hidden “stepping-stone” dimensions and measures like these.

Click **Check my progress** to verify that you've performed the above task.

Customize native derived tables using derived columns

**Check my progress**

## Task 2. Customize native derived tables using filters

Now, say the business only cares about recent orders made in the past 365 days. Maybe some of these top 5 brands were very popular years ago due to different trends, but the rankings could have shifted in the past one year.

In this section, you will explore the different types of filters to use for your native derived table in LookML. **Filters** can be used to apply filters to the derived table, similar to a filtered measure. It adds a `WHERE` or `HAVING` clause.

### Add a static date filter

1. First, navigate back to the **brand\_order\_facts** view.
    
2. Under the `derived_column` definition, add a filter to restrict the native derived table to orders created in the past 365 days:
    

```apache
filters: [order_items.created_date: "365 days"]
```

3. Click **Save Changes**. Your file should now resemble the following:
    

![File browser page showing brand_order_facts.view code](https://cdn.qwiklabs.com/mHwwqhuko%2FkGEU1ePqckWLiuY0h1QhlVPk5RFEQBqoo%3D align="left")

4. Navigate back to the **Order Items** Explore.
    
5. Under the **Brand Order Facts** view, select the **Brand Name Grouped**.
    
6. Under the **Order Items** view, select the **Total Revenue** measure.
    
7. Click **Run**.
    
8. On the **Data** bar, click the **SQL** tab to see how the filter gets used in the query.
    

Since you added a filter on the Ordered Items Created Date to look at only the orders made in the past 365 days, the `WHERE` condition is only generated in what is called the *outer query*. This is the default behavior for any dimension filter; you can’t tell it to go inside the common table expression for the derived table, or make the outer WHERE “trickle down” to the inner query. This is where adding a filter to the NDT itself comes in handy.

### Add a bind filter

What if the business finds it too rigid to restrict the data to only orders from the past 365 days? Maybe sometimes users want to analyze the rankings from the past two years. With `filters: [order_items.created_date: "365 days"]`, you are hard-coding the time frame.

This is where `bind_filters` can be a more useful parameter than simply filters. You can indicate which field from the outer Explore you want to “trickle down” to the inner query of the native derived table (the `from_field`) and which native derived table field it should map to (the `to_field`). The vast majority of the time, these two should be the same.

The `bind_filters` sub-parameter of **explore\_source** passes a specific filter from the Explore query into the native derived table subquery:

* The `to_field` is the field in the native derived table to which the filter is applied. The `to_field` must be a field from the underlying **explore\_source**.
    
* The `from_field` specifies the field in the Explore from which to get the filter, if the user specifies a filter at runtime.
    

1. Navigate back to the **brand\_order\_facts view**.
    
2. To use the bind filter, start by removing the static date filter inside of the derived table definition you created in the previous section.
    
3. Next, add the following template of the `bind_filters` under the `derived_column` definition:
    

```apache
bind_filters: {
  from_field: # The field the end user interacts with via the filters area
  to_field: # The field which should be filtered inside the NDT
}
```

In this case, you will want to grab the filter `from_field: order_items.created_date` and make it influence or apply `to_field: order_items.created_date`.

4. Add the following code for the bind filter fields:
    

```apache
bind_filters: {
  from_field: order_items.created_date
  to_field: order_items.created_date
}
```

**Note**: this is equivalent to adding a templated filter to the SQL derived table. As you saw in the previous lab, a templated filter was added to a SQL derived table, so that users could choose a date and see the values get updated based on that date.

5. Click **Save Changes**. Your file should resemble the following:
    

![File browser page showing brand_order_facts.view code](https://cdn.qwiklabs.com/USfAXalwjRyggHloaMCLV6UwWn6xc26FylM9UlB4tPQ%3D align="left")

6. Navigate back to the **Order Items** Explore.
    
7. Under the **Brand Order Facts** view, select the **Brand Name Grouped**.
    
8. Under the **Order Items** view, select the **Total Revenue** measure.
    
9. Also under the **Order Items** view, **Created Date** dimension, select the **Date** field and then select the filter button next to **Date**.
    
10. In the filter definition, specify the filter to be: `is in the past 1000 days`. For demonstration purposes, you are using 1000 days to ensure that the filter is not too restrictive, and that it will capture the past 3 years.
    
11. Click **Run**.
    

![Filters(1) section](https://cdn.qwiklabs.com/fSsYhsqJSGw5DbMJuEnftVuTd458WqVTKwrJL371JKI%3D align="left")

12. On the **Data** bar, click the **SQL** tab to see how the filter gets used in the query. Notice the generated SQL now *dynamically updates* the **WHERE** condition within the common table expression for the derived table as well as the *outer* **WHERE** condition.
    

As you can see, this is a lot more flexible! If you filter by orders created in the past 3 quarters, the native derived table will calculate the rankings from the past 3 quarters accordingly. And if you filter by orders created in a particular date range, the native derived table will also use that same date range in its **WHERE** condition.

13. Now, under the **Users** field, select **Country** and **Age** and add a filter for them; set them to `Country is equal to USA` and `Age is greater than 21`.
    
14. Click **Run**.
    

![Filter(s) section](https://cdn.qwiklabs.com/uyyO07bwOg9Saact7A9XjdxsQGIKFgcER9PF74yysc0%3D align="left")

15. Finally, click the **SQL** tab.
    

Notice how the **WHERE** condition of the derived table is unaffected. What if the business users have other criteria besides Ordered Items Created Date? What if they only want to see the rankings for orders made by customers in the USA, or by male customers?

You could certainly keep adding `bind_filters`, but look how many fields you have in the Order Items Explore. It would take forever to add `bind_filters` for all of them. This is where yet another parameter can be extremely useful: `bind_all_filters`.

Click **Check my progress** to verify that you've performed the above task.

Customize native derived tables using filters

**Check my progress**

### Using bind\_all\_filters

The easiest way to pass filters from an Explore to a native derived table subquery is to specify `bind_all_filters: yes` in the native derived table’s **explore\_source** parameter. This will pass all of an Explore’s runtime filters into the native derived table subquery.

If you want to use the native derived table in a different Explore, use the `bind_filters` parameter instead, as described in the previous section.

1. Start by removing the `bind_filter` inside of the derived table definition you created in the previous section.
    
2. Add the `bind_all_filters: yes` definition under the `derived_column` definition to not only bind the `order_created_date` to itself, but every filter to itself:
    

```apache
bind_all_filters: yes
```

3. Click **Save Changes**. Your file should resemble the following:
    

![File browser page showing brand_order_facts.view code](https://cdn.qwiklabs.com/yUJO4zB5buA0hP0GCYtgSXFR0Tcya%2BzGxfv%2FlndKDts%3D align="left")

4. Navigate back to the **Order Items** Explore.
    
5. Under the **Brand Order Facts** view, select the **Brand Name Grouped**.
    
6. Under the **Order Items** view, select the **Total Revenue** measure.
    
7. Also under the **Order Items** view, find the **Created Date** dimension, and click the filter button next to **Date**.
    
8. In the filter definition, specify the filter to be: `is in the past 365 days`.
    
9. Under the **Users** view, add a filter on the **Country** and **Age**; set them to `Country is equal to USA` and `Age is greater than 21`.
    
10. Click **Run**.
    
11. Click the **SQL** tab. Notice how the **WHERE** condition of the derived table now dynamically updates!
    

Although `bind_all_filters` is great, it only works when you have joined the native derived table to its **explore\_source**. In other words, you are only able to use this here because you joined `brand_order_facts` back to the same Explore as the **explore\_source**, `order_items`.

Why? Because `bind_all_filters` means Looker needs to know how to generate a WHERE condition for any field in the whole Explore. If your native derived table is using an **explore\_source** of `order_items` but you join it to a different Explore, that other Explore could have any number of joined views and fields that don’t exist in `order_items`, and therefore wouldn’t make any sense in the world of `order_items`. Looker would not know how to filter the derived table with those other fields.

Now that you have seen the `bind_all_filters` in action, play around with a couple of different Explore filters and see how they affect the way the native derived table compiles.

12. Navigate back to the **brand\_order\_facts** view.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

---

## Solution of Lab

%[https://youtu.be/5o8cNhew2AA] 

### **🛠️ Looker Configuration Guide 🚀**

> 💡 **Pro Tip:** Follow along with the complete video tutorial to ensure you achieve full scores on all "Check My Progress" validation steps!

### **📊 Step 1: Create the** `brand_order_facts` View

Create a new view called `brand_order_facts` with the following configuration:

```apache
# If necessary, uncomment the line below to include explore_source.
# include: "training_ecommerce.model.lkml"

view: brand_order_facts {
  derived_table: {
    explore_source: order_items {
      column: product_brand { field: inventory_items.product_brand }
      column: total_revenue {}
      derived_column: brand_rank {
        sql: row_number() over (order by total_revenue desc) ;;
      }
      filters: [order_items.created_date: "365 days"]
      
      bind_filters: {
        from_field: order_items.created_date
        to_field: order_items.created_date
      }
    }
  }
  
  dimension: brand_rank {
    hidden: yes
    type: number
  }
  dimension: product_brand {
    description: ""
  }
  
  dimension: brand_rank_concat {
    label: "Brand Name"
    type: string
    sql: ${brand_rank} || ') ' || ${product_brand} ;;
  }
  
  dimension: brand_rank_top_5 {
    hidden: yes
    type: yesno
    sql: ${brand_rank} <= 5 ;;
  }
  
  dimension: brand_rank_grouped {
    label: "Brand Name Grouped"
    type: string
    sql: case when ${brand_rank_top_5} then ${brand_rank_concat} else '6) Other' end ;;
  }
  
  dimension: total_revenue {

    description: ""
    value_format: "$#,##0.00"
    type: number
  }
}
```

### **📝 Step 2: Configure the** `training_ecommerce` Model File

Navigate to and modify the `training_ecommerce` model file with the following configuration:

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

  join: brand_order_facts {
    type: left_outer
    sql_on: ${inventory_items.product_brand} = ${brand_order_facts.product_brand} ;;
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


# Place in `training_ecommerce` model
explore: +order_items {
  query: ArcadeCrew1 {
    dimensions: [brand_order_facts.brand_rank_grouped]
    measures: [total_revenue]
  }
}



# Place in `training_ecommerce` model
explore: +order_items {
    query: ArcadeCrew2 {
      dimensions: [inventory_items.product_brand]
      measures: [total_revenue]
    }
}



# Place in `training_ecommerce` model
explore: +order_items {
    query: ArcadeCrew3 {
      dimensions: [brand_order_facts.brand_rank_grouped, created_date, users.age, users.country]
      measures: [total_revenue]
      filters: [
        order_items.created_date: "365 days",
        users.age: ">21",
        users.country: "USA"
      ]
    }
}
```

> ⚡ **Note:** Save your changes after completing each step to ensure proper configuration.

* **Title your Look:** `Ranked Brand Revenue`
    

```apache
Ranked Brand Revenue
```