---
title: "Creating Measures and Dimensions Using LookML - GSP890"
seoTitle: "Creating Measures and Dimensions Using LookML - GSP890"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Wed Apr 03 2024 16:11:11 GMT+0000 (Coordinated Universal Time)
cuid: cluk0991i000308l8beohhm9z
slug: creating-measures-and-dimensions-using-lookml-gsp890
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746940188706/08af2dee-257e-4686-933d-37a7d85e3da7.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1746940207962/bb585bfd-5907-4501-880f-f6dda31744d1.png
tags: creating-measures-and-dimensions-using-lookml-gsp890, creating-measures-and-dimensions-using-lookml, gsp890

---

## Overview

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

In Looker, dimensions are unique attributes of the data that help you to describe data. For example, the city and elevation of an airport may be different dimensions within an airport dataset. Measures are aggregations of one or more dimensions (or unique attributes of the data) such as a count or average. Measures let you calculate your Key Performance Indicators (KPIs) and help your business users analyze data using different aggregated attributes.

In this lab, you learn how to create different types of dimensions and measures in LookML as a Looker developer. You also learn how to modify models of Explores, which are data views that serve as the foundation for self-service exploration by the business users in Looker.

For this lab, a project called `qwiklabs-ecommerce` has been created for you in LookML. This project is based on a mock e-commerce dataset that will enable you to create business KPIs using dimensions and measures created using LookML. You can learn more about [LookML modeling](https://docs.looker.com/data-modeling/learning-lookml/lookml-intro) in the Looker documentation.

### What you'll do

In this lab, you learn how to:

* Modify an existing LookML project (`qwiklabs-ecommerce`) published by a Looker admin.
    
* Create different types of dimensions and measures in LookML to address your business users' questions.
    
* Test your LookML changes in development mode.
    
* Use the Explore interface to view the dimensions and measures that you have created in the modified LookML project.
    

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
    

## Task 1. Creating dimensions

In Looker, a **dimension** is a group-able field and can be used to filter query results. It can be:

* An attribute, which has a direct association to a column in an underlying table
    
* A fact or numerical value
    
* A derived value, computed based on the values of other fields in a single row
    

For example, dimensions for a *Products* view might include product name, product model, product color, product price, product created date, and product end-of-life date.

Dimensions let you create buckets of data points to analyze your KPIs using different attributes. You can create different types of dimensions like `time`, `numeric`, `yesno` and `string` to slice and dice your data.

### Create a new dimension for age group tiers

In this section, you will create a new dimension named **age\_tier** based off of the **age** dimension. This dimension will list ranges of ages. You will do this by adding a dimension that groups individual ages into the following age group tiers: `18, 25, 35, 45, 55, 65, 75, 90`.

1. First, on the bottom left of the Looker User Interface, click the toggle button to enter **Development mode**.
    

![Development mode toggle](https://cdn.qwiklabs.com/uUCbNuedSCOYQmL%2BIubjqvusmGAeS7Wjj3f6xByL174%3D align="left")

2. Click the **Develop** tab and then select the `qwiklabs-ecommerce` LookML project.
    
3. Once you are in the `qwiklabs-ecommerce` project, click the arrow next to **views** to see a list of view names.
    
4. Click `users.view`.
    
5. In `users.view`, locate the dimension for **age**. Your file should resemble the following:
    

![users-view file](https://cdn.qwiklabs.com/UzwXmFGESzA0%2BnDUQ6g6hd1h0uvAGsE5o9QYAXJB0jI%3D align="left")

Dimension fields, such as **age** correspond to your underlying database table, or computed values based on other dimensions.

The editor gives you suggestions as you type, but if you get stuck or need to see a list of different parameters and their attributes, you can always refer to the Quick Help menu on the right-hand side of the IDE.

6. On a new line under the dimension for **age**, start by defining a new dimension for **age\_tier** using the following code:
    

```apache
dimension: age_tier {

}
```

7. Next, you will add the dimension type. This dimension type is `tier`, so you'll add that here:
    

```apache
dimension: age_tier {
  type: tier
}
```

8. Next, you will add the specific tiers for the dimension. In this case, you will group the tiers first by 18 and younger, then by increments of 10 years:
    

```apache
dimension: age_tier {
  type: tier
  tiers: [18, 25, 35, 45, 55, 65, 75, 90]
}
```

9. Next, define the style parameter. This parameter is specific to the tier type dimension and changes the way tiers appear in the UI. In this case, you want the style to be `integer`:
    

```apache
dimension: age_tier {
  type: tier
  tiers: [18, 25, 35, 45, 55, 65, 75, 90]
  style: integer
}
```

10. Lastly, you'll add the SQL parameter. The SQL parameter tells Looker how to write the SQL for queries users run. For this dimension, you're telling the SQL parameter to pull from the pre-existing **age** field:
    

```apache
dimension: age_tier {
  type: tier
  tiers: [18, 25, 35, 45, 55, 65, 75, 90]
  style: integer
  sql: ${age} ;;
}
```

Your file should now resemble the following:

![users.view file with dimensions for id, age, and age_tier](https://cdn.qwiklabs.com/hZLljTrCuLbfMB%2B1UosbotfgoAoT5KegLM%2Bbk%2FJTn2U%3D align="left")

Now that you finished adding a new dimension, you can test to make sure it's working properly.

11. Click **Save Changes** and then click the **Validate LookML** button on the top right of the IDE to run a LookML code validation.
    
12. You can quickly go to the Explore by clicking the caret next to the file title at the top of the IDE and then selecting **Explore Order Items**.
    

![The users.view dropdown menu with the Explore Order Items option highlighted.](https://cdn.qwiklabs.com/JlCddwBaaI7nBI9UkQLmtB5tucKs6Rrqj1X6oYnwkyk%3D align="left")

This file menu will only show views that have an Explore defined in the LookML.

13. Next, navigate to your new dimension under **Users &gt; Dimensions &gt; Age Tier**.
    
14. Add the **Age** and the **Age Tier** dimensions and click **Run**. You can see that each age falls into the correct tier:
    

![ages populated in the Users Age and Users Age Tier columns.](https://cdn.qwiklabs.com/1vJRUkjdfZbO72l3mi4ibqqblFmtOEV32%2FtTZ6eOUFU%3D align="left")

15. Now remove the **Age** dimension and add the **Count** measure and hit **Run** again. The results are showing what you want. Looker has counted the different ages and grouped them into the appropriate tiers. Success!
    

![Various ages listed in the Users Age Tier and Users Count columns](https://cdn.qwiklabs.com/DzC1k73qopuzOPa8GBpGc4f0O%2Fm1tEJK2e4F16prgK0%3D align="left")

### Create a new dimension for email source

In this section, you will create a new dimension named **is\_email\_source** based off of the **traffic\_source** dimension. This dimension will determine whether the traffic source that brought in a given user was via email.

1. Navigate back to the `qwiklabs-ecommerce` project and open `users.view` file.
    
2. Locate the dimension for **traffic\_source**. Your file should resemble the following:
    

![users.view file displaying the traffic_source dimension](https://cdn.qwiklabs.com/3J60bCCJv4r511KCmYZnneW%2FsytHdrspW6N%2FFFyOf3c%3D align="left")

3. On a new line under the dimension for **traffic source**, start by defining a new dimension for **is\_email\_source** using the following code:
    

```apache
dimension: is_email_source {

}
```

4. Next, add the type parameter. Since this is a boolean categorization, you will use the `yesno` type:
    

```apache
dimension: is_email_source {
  type: yesno
}
```

5. Lastly, add the SQL parameter. For this dimension, you're telling the SQL parameter to pull from the pre-existing **traffic\_source** field *where the value equals "Email"*.
    
6. Be sure to use **double quotation marks** (`""`) when defining "Email" to ensure accurate syntax:
    

```apache
dimension: is_email_source {
  type: yesno
  sql: ${traffic_source} = "Email" ;;
}
```

Your file should now resemble the following:

![users.view file with the line: sql: ${traffic_source} = "Email" in the is_email_source dimension](https://cdn.qwiklabs.com/3AR8antVNLZpL7Uscz0N04c5POQzTsmpNzDU5dnLQ5c%3D align="left")

Now that you finished adding a new dimension, you can test to make sure it's working properly.

7. Click **Save Changes** and then click the **Validate LookML** button on the top right of the IDE to run a LookML code validation.
    
8. Click the caret next to the file title at the top of the IDE and then select **Explore Order Items**:
    

![Explore Order Items option highlighted in the users.view dropdown menu.](https://cdn.qwiklabs.com/JlCddwBaaI7nBI9UkQLmtB5tucKs6Rrqj1X6oYnwkyk%3D align="left")

9. Next, navigate to your new dimension under **Users &gt; Dimensions &gt; Is Email Source (Yes / No)**.
    
10. Add the **Is Email Source** dimension and the **Count** measure and click **Run**. The results are showing the amount of users that were brought in via email or not. Success!
    

![Results display in the Users is Email Source (Yes/No) column and Users Count column](https://cdn.qwiklabs.com/70HwFom9zNOUMEyIvBwDdimr9WrUlve1IAbTa88qzpA%3D align="left")

### Create a new dimension for shipping days

In this section, you will create a new dimension named **shipping days** that calculates the number of days between the order ship date and the order created date within the **order\_items** view.

1. Navigate back to the `qwiklabs-ecommerce` project and open the `order_items.view` file.
    
2. Locate the dimension group for **shipped**. Your file should resemble the following:
    

![order_items.view file](https://cdn.qwiklabs.com/ZWx6B05qE2b1k7fOJ5ul%2FLToYWkKKzVFrTvmYpKUaKM%3D align="left")

3. On a new line under the dimension group for **shipped**, define a new dimension for **shipping\_days** using the following code:
    

```apache
dimension: shipping_days {

}
```

4. Next, add the type parameter. For this dimension, you will be using the `number` type:
    

```apache
dimension: shipping_days {
  type: number
}
```

5. Lastly, add the SQL parameter. For this dimension, you're telling the SQL parameter to run a [DATE\_DIFF function](https://www.w3schools.com/sql/func_sqlserver_datediff.asp) on the **shipped\_date** and **created\_date** dimensions. `DAY` is used here as the provided interval you want to be calculating:
    

```apache
dimension: shipping_days {
  type: number
  sql: DATE_DIFF(${shipped_date}, ${created_date}, DAY);;
}
```

Your file should now resemble the following:

![order_items.view file](https://cdn.qwiklabs.com/G64b0YL46pNUEP5khVN0%2FqgVtIsLFdtEUcxQZ3Y6Cu0%3D align="left")

6. Now that you finished adding a new dimension, you can test to make sure it's working properly. Click **Save Changes** and then click the **Validate LookML** button on the top right of the IDE to run a LookML code validation.
    
7. Click the caret next to the file title at the top of the IDE and then select **Explore Order Items**.
    
8. Next, navigate to your new dimension under **Order Items &gt; Dimensions &gt; Shipping Days**.
    
9. Add the **Shipping Days** dimension and the **Order Count** measure and click **Run**. The results are showing the count of orders with their respective shipping days. Success!
    
10. Navigate back to the `order_items.view` file.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click *Check my progress* to verify the objective.

Create new dimensions

## Task 2. Creating measures

A **measure** is a field that uses a SQL aggregate function, such as `COUNT`, `SUM`, `AVG`, `MIN`, or `MAX`. Any field computed based on the values of other measure values is also a measure. Measures can be used to filter grouped values. For example, measures for a *Sales* view might include total items sold (a count), total sale price (a sum), and average sale price (an average).

The behavior and expected values for a field depend on its declared type, such as `string`, `number`, or `time`. For measures, types include aggregate functions, such as `sum` and `percent_of_previous`. For details, refer to [dimension types](https://docs.looker.com/reference/field-reference/dimension-type-reference) and [measure types](https://docs.looker.com/reference/field-reference/measure-type-reference).

### Create a measure of the distinct number of orders

Measure fields are used to aggregate values for multiple rows. In this section, you will create a new measure named **count\_distinct\_orders** that calculates the distinct number of orders within the `order_items` view.

1. Navigate back to the `qwiklabs-ecommerce` project and open `order_items.view` file.
    
2. In `order_items.view`, locate the measure for **order\_item\_count**.
    
3. On a new line under the measure for **order\_item\_count**, start by defining a new measure for **count\_distinct\_orders** using the following code:
    

```apache
measure: count_distinct_orders {

}
```

**Note:** Make sure to replace the default measure name (`order_count`) with `count_distinct_orders`.

4. Next, add the type parameter. For this measure, you will be using the `count_distinct` type. The type [count\_distinct](https://docs.looker.com/reference/field-reference/measure-type-reference#count_distinct) calculates the number of distinct values in a given field. It makes use of SQL’s `COUNT DISTINCT` function:
    

```apache
measure: count_distinct_orders {
  type: count_distinct
}
```

5. Lastly, add the SQL parameter. For this measure, you're telling the SQL parameter to pull from the pre-existing **order\_id** field:
    

```apache
measure: count_distinct_orders {
  type: count_distinct
  sql: ${order_id} ;;
}
```

Your file should now resemble the following:

![order_iems.view file](https://cdn.qwiklabs.com/yK8XNLDIPvijFHx6CInqeCabN%2FK3MuIUG450dEkaRa8%3D align="left")

Now that you finished adding a new measure, you can test to make sure it's working properly.

6. Click **Save Changes** and then click the **Validate LookML** button on the top right of the IDE to run a LookML code validation.
    
7. Click the caret next to the file title at the top of the IDE and then select **Explore Order Items**.
    
8. Under **Order Items &gt;** **Measures**, click **Count Distinct Orders**.
    
9. Click **Run** to see the values in the new measure. You can confirm that your new measure is working properly.
    

### Create a total sales measure

In this section, you will create a new measure named **total\_sales** that calculates total sales using the **sale\_price** dimension.

1. Navigate back to the `qwiklabs-ecommerce` project and open `order_items.view` file.
    
2. In `order_items.view`, locate the measure for **order\_item\_count**.
    
3. On a new line under the measure for **order\_item\_count**, start by defining a new measure for **total\_sales** using the following code:
    

```apache
measure: total_sales {

}
```

4. Add the type parameter. Here you will be using `sum`:
    

```apache
measure: total_sales {
  type: sum
}
```

5. Add the SQL parameter. For this measure, you're telling the SQL parameter to pull from the pre-existing **sale\_price** field:
    

```apache
measure: total_sales {
  type: sum
  sql: ${sale_price} ;;
}
```

6. Lastly, you will add the [value\_format\_name](https://docs.looker.com/reference/field-params/value_format_name). The `value_format_name` parameter enables you to format data values using formats built into Looker or your own custom, reusable formats. Here, since you are calculating sale price you will use US dollars (`usd_0`):
    

```apache
measure: total_sales {
  type: sum
  sql: ${sale_price} ;;
  value_format_name: usd_0
}
```

Your file should now resemble the following:

![order_items.view file](https://cdn.qwiklabs.com/l2Aq0cfvXKywTUQBMa%2B4x1LUUPh2s5NqyJx5hOsxskc%3D align="left")

Now that you finished adding a new measure, you can test to make sure it's working properly.

7. Click **Save Changes** and then click the **Validate LookML** button on the top right of the IDE to run a LookML code validation.
    
8. Click the caret next to the file title at the top of the IDE and then select **Explore Order Items**.
    
9. Under **Order Items &gt;** **Measures**, click **Total Sales**.
    
10. Click **Run** to see the values in the new measure.
    

![Results page](https://cdn.qwiklabs.com/rF22Wz8nNts90I6ZhTn1LabVkoZUpb8NdrpDAH4xrM0%3D align="left")

11. Navigate back to the `order_items.view` file.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click *Check my progress* to verify the objective.

Create the measures

## Task 3. Creating advanced measures

Advanced measures let you create additional custom metrics from dimensions that are defined externally to the current view file. You can also create special types of filtered measures by providing specific filtering conditions.

### Create a filtered measure of the total sales for only the users who came to the website via the email traffic source

In this section, you will create a new advanced measure named **total\_sales\_email\_users** that calculates total sales for *only* those users who came to the website via the email traffic source.

1. Navigate back to the `qwiklabs-ecommerce` project and open `order_items.view` file.
    
2. In `order_items.view`, locate the measure for **order\_item\_count**.
    
3. On a new line under the measure for **order\_item\_count**, start by defining a new measure for **total\_sales\_email\_users** using the following code:
    

```apache
measure: total_sales_email_users {

}
```

4. Next, add the type. For this since we are calculating total sales, we will use `sum`:
    

```apache
measure: total_sales_email_users {
  type: sum
}
```

5. Add the SQL parameter. For this measure, you're telling the SQL parameter to pull from the pre-existing **sale\_price** field:
    

```apache
measure: total_sales_email_users {
  type: sum
  sql: ${sale_price} ;;
}
```

Lastly, you will add the **filters** parameter. To apply a filter directly to a measure, instead of filtering the entire query, we can add a filters parameter to the LookML definition of a measure. This will apply the filter, in the form of a `CASE WHEN` statement, to the measure in the generated SQL, as opposed to applying a global `WHERE` clause to the entire query.

As such, instead of removing rows from a query after it is aggregated, a filtered measure will only aggregate those rows that meet the specified conditions. This approach allows us to examine subsets of a population vs. other subsets or the whole.

6. Add the following filter parameter. Here you are using the **is\_email\_source** dimension you created earlier within the `users.view` file:
    

```apache
measure: total_sales_email_users {
  type: sum
  sql: ${sale_price} ;;
  filters: [users.is_email_source: "Yes"]
}
```

**Note:** You could also reference the **traffic\_source** dimension instead, using the following code.

```apache
measure: total_sales_email_users {
  type: sum
  sql: ${sale_price} ;;
  filters: [users.traffic_source: "Email"]
}
```

Your file should now resemble the following:

![order_items.view file](https://cdn.qwiklabs.com/peUgkp5oO58ZdqDa3psxBu2ChlAkThV1%2FyiBjjes%2FUI%3D align="left")

Now that you finished adding a new measure, you can test to make sure it's working properly.

7. Click **Save Changes** and then click the **Validate LookML** button on the top right of the IDE to run a LookML code validation.
    
8. Click the caret next to the file title at the top of the IDE and then select **Explore Order Items**.
    
9. Under **Order Items &gt;** **Measures**, click **Total Sales Email Users**.
    
10. Click **Run** to see the values in the new measure.
    

![Results page](https://cdn.qwiklabs.com/b2tnbl%2Bceqco4xM%2FHIGWfItMsMw%2BlyHB33y%2FdKrEy8U%3D align="left")

### Create a measure for the percentage of sales that are attributed to users coming from the email traffic source

In this section, you will create a new advanced measure named **percentage\_sales\_email\_source** that calculates the percentage of sales that are attributed to users coming from the email traffic source.

1. Navigate back to the `qwiklabs-ecommerce` project and open `order_items.view` file.
    
2. In `order_items.view`, locate the measure for **order\_item\_count**.
    
3. On a new line under the measure for **order\_item\_count**, start by defining a new measure for **percentage\_sales\_email\_source** using the following code:
    

```apache
measure: percentage_sales_email_source {

}
```

4. Next, add the type. For this since we are calculating total sales, we will use `number`:
    

```apache
measure: percentage_sales_email_source {
  type: number
}
```

5. Next add the value\_format\_name parameter. Since you are calculating a percentage, you can use `percent_2`:
    

```apache
measure: percentage_sales_email_source {
  type: number
  value_format_name: percent_2
}
```

6. Add the SQL parameter. For this measure, you're telling the SQL parameter to pull from the pre-existing **total\_sales\_email\_users** field and dividing by the **total\_sales**:
    

**Note:** When creating percentage measures, it is often useful to make sure you are not dividing by zero in the percentage calculation. This can be done through the `NULLIF` SQL function.

```apache
measure: percentage_sales_email_source {
  type: number
  value_format_name: percent_2
  sql: 1.0*${total_sales_email_users}
  / NULLIF(${total_sales}, 0) ;;
}
```

Your file should now resemble the following:

![order_items.view file](https://cdn.qwiklabs.com/eQjcPwJDDCVZjRpC5oZuwCH0FQ7yYHgO8TwhfIPLaWA%3D align="left")

Now that you finished adding a new measure, you can test to make sure it's working properly.

7. Click **Save Changes** and then click the **Validate LookML** button on the top right of the IDE to run a LookML code validation.
    
8. Click the caret next to the file title at the top of the IDE and then select **Explore Order Items**.
    
9. Under **Order Items** &gt; **Measures**, click **Percentage Sales Email Source**.
    
10. Click **Run** to see the values in the new measure. Success!
    

![Results page](https://cdn.qwiklabs.com/%2F8VkNMQLY42%2FaQgG0EU%2FEOsOGYrtaxB%2Fmt8FONSvJKc%3D align="left")

11. Navigate back to the `order_items.view` file.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click *Check my progress* to verify the objective.

Create the advanced measures

---

%[https://www.youtube.com/watch?v=kSDIBp0vT84] 

**users.view**

```apache
view: users {
  sql_table_name: `cloud-training-demos.looker_ecomm.users`
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

  dimension: age_tier {
    type: tier
    tiers: [18, 25, 35, 45, 55, 65, 75, 90]
    style: integer
    sql: ${age} ;;
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

  dimension: is_email_source {
    type: yesno
    sql: ${traffic_source} = "Email" ;;
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

**order\_items.view**

```apache
view: order_items {
  sql_table_name: `cloud-training-demos.looker_ecomm.order_items`
    ;;
  drill_fields: [order_item_id]

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

  dimension: shipping_days {
    type: number
    sql: DATE_DIFF(${shipped_date}, ${created_date}, DAY);;
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
  
  measure: count_distinct_orders {
    type: count_distinct
    sql: ${order_id} ;;
  }

  measure: order_item_count {
    type: count
    drill_fields: [detail*]
  }
  
  measure: percentage_sales_email_source {
    type: number
    value_format_name: percent_2
    sql: 1.0*${total_sales_email_users}
      / NULLIF(${total_sales}, 0) ;;
  }
  
  measure: total_sales_email_users {
    type: sum
    sql: ${sale_price} ;;
    filters: [users.traffic_source: "Email"]
  }

  measure: total_sales {
    type: sum
    sql: ${sale_price} ;;
    value_format_name: usd_0
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