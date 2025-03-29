---
title: "Looker Developer: Qwik Start - GSP891"
seoTitle: "Looker Developer: Qwik Start - GSP891"
seoDescription: "Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysi"
datePublished: Sat Mar 29 2025 06:32:16 GMT+0000 (Coordinated Universal Time)
cuid: cm8tu3fbk000g09jrc069g12b
slug: looker-developer-qwik-start-gsp891
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743229500162/85104def-405b-4048-ba13-af09a9d382b2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1743229923913/1efc7e31-9c51-4000-9cfd-651df8dcac97.png
tags: looker-developer-qwik-start-gsp891, looker-developer-qwik-start, looker-developer, gsp891

---

## **Overview**

Looker is a modern data platform in Google Cloud that lets you analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

### What is LookML?

LookML (Looker Modeling Language) generates abstracted SQL and provides a modeling layer between the database and user. It is Looker’s proprietary language that provides an abstraction layer for SQL databases.

Specifically, LookML is a language for describing dimensions, aggregates, calculations, and data relationships in a SQL database. Looker uses a model written in LookML to construct SQL queries against a particular database. It creates the layer between that SQL database and how the business user interacts with it.

As such, it defines many different things, like how to join tables, how to define custom tables, how to define fields from the database, and the logic for new fields. In this lab, you get hands-on experience with the fundamentals of LookML.

### What you'll do

* Create a view
    
* Join a view to an existing Explore
    

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
    

## **Overview of LookML structures**

The hierarchy of LookML is structured using the following objects:

* **Projects**, which are libraries of LookML code. Because Looker uses Git for version control, a best practice is for each project to map 1:1 with a Git repository.
    
    * A project is composed of one or more *models*.
        
* A **model** is a set of Explores by business area or need. An Explore is a set of pre-joined views for business-user analysis.
    
    * Each model contains one or more *Explores*.
        
* A **view** in LookML is a database table or a logical representation of one.
    
    * Each view includes dimensions (which are database columns or logical representations of them) and measures (which are aggregate functions on dimensions, such as a `COUNT` of customers or a `SUM` of cost).
        

![LookML hierarchy diagram](https://cdn.qwiklabs.com/fZHhYhC2L0u4EuSMXeKO9U%2B9cWZo2dlvnWNephREMEg%3D align="left")

### Projects

The highest-level LookML object is the project. A project is essentially a library of code that typically maps 1:1 to a data source or database connection. You can think of each project as an almost independent mini-instance or microcosm of Looker.

Schemas that cannot be joined together usually reside in different projects because there is no relation to be made across the two datasets. This depends on your database dialect and database user permissions.

A key concept to remember is: if it’s possible in your SQL dialect, it should be possible in Looker. If you can go to your database console and hand-write a `SELECT` statement that does a thing, you can also code LookML so that Looker does the same thing.

![LookML Projects table with a list of project names and their associated models](https://cdn.qwiklabs.com/bL9J%2B9qfTcgwgtYlcT0d14CnJ4j6oBCSXeHJFO3pSeQ%3D align="left")

You can share content from one project to another via a feature called Project Import, if necessary, and if it’s enabled for your instance, but this is an advanced approach to setting up your model architecture and not in the scope of this lab.

### Models

Models are the next level of hierarchy and contain:

* The database connection you are using, as defined in the image by *line 1*.
    
* View files that are accessible to this model, as defined by *lines 4, 5, and 6*.
    
* Definitions of Explores and their join logic.
    

![training_ecommerce.model view](https://cdn.qwiklabs.com/%2BWyk%2FdkgYX5wq6IPzMfQrtfFYYYswUlKtLBE35pRC6c%3D align="left")

Models contain data connection information and definitions of Explores. Models can be used to restrict user access to certain Explores and separate and organize Explores by business area.

### Explores

Explores are one or more views joined together, usually to target a specific business question. Explores should be organized around business themes to minimize confusion for users.

Explores are the “drivers” of analysis on the frontend. They include one or more views joined together, and each usually targets a specific business question. Think of an Explore as a predefined set of tables that would frequently be joined for business inquiries and use cases.

### Views

Views are where you define dimensions (which are the data attributes) and measures (which are aggregations of dimensions). Think of views as tables that bundle related fields. There are a few different types of views:

* **Standard views**, which abstract what’s already in the database tables.
    
* **Virtual tables**, known as *derived tables*, which are discussed later in this quest.
    

![users.view view](https://cdn.qwiklabs.com/UzwXmFGESzA0%2BnDUQ6g6hd1h0uvAGsE5o9QYAXJB0jI%3D align="left")

### Dimensions

The lowest level of a LookML object are **fields**, which can be *dimensions* or *measures*. Dimensions are created for any columns that are already in your database tables when the view files are generated from a table by Looker.

You can also create additional dimensions that would serve as logical representations of table columns. These appear in the `SELECT` and `GROUP BY` clause of a SQL statement. They are the “attributes” that describe your data.

![dimensions highlighted in the users.view view](https://cdn.qwiklabs.com/kb43Plv7tyjUWMrYdSGN2jp4Oj5hiNNkwjdngxPlIdE%3D align="left")

### Measures

Measures are aggregates that do not live explicitly in your database tables. They must be created in LookML. They aggregate dimensions into values like sums or counts.

Note that they do not appear in the `GROUP BY` statement of the SQL generated by Looker. Instead, they depend on dimensions to determine that grouping.

![measure highlighted in the users.view view](https://cdn.qwiklabs.com/hWh9EoJCIXTid3C3lKtg0K6W9mySvu4z%2FdouX9ils%2FU%3D align="left")

### LookML hierarchy recap

To recap, a project is a library of code that models a data source and should map 1:1 to a Git repository. Projects contain:

* **Model files**, which define the Explores that should be packaged together and how those Explores work.
    
* **View files**, which describe database tables or logical representations of them.
    

Dimensions and measures are defined within *view* files.

Projects can also include dashboards defined in LookML to prevent business users from editing them, maintain version control, and sync them across Looker instances if your company has more than one. LookML dashboards are not in the scope of this training.

There are other types of project files, such as documents and manifests, which are not in the scope of this lab. If you're interested, you can refer to the [Understanding other project files documentation](https://docs.looker.com/data-modeling/getting-started/other-project-files).

## **Task 1. Create a view**

In this section, you will create a new view and add some dimensions and measures to it.

1. First, on the bottom left of the Looker User Interface, click the toggle button to enter **Development mode**.
    

![Development Mode toggle](https://cdn.qwiklabs.com/uUCbNuedSCOYQmL%2BIubjqvusmGAeS7Wjj3f6xByL174%3D align="left")

2. Click the **Develop** tab and then select the `qwiklabs-ecommerce` LookML project.
    
3. To create the file at the project’s root level, click the **+** button at the top of the file browser in the Looker IDE.
    
4. Select **Create View**. Name the file `users_limited`. Click **Create**.
    
5. After you have created your new view, click the arrow next to the **views** folder to see a list of the existing views for the project.
    
6. To put your view file into the **views** folder, click and hold the `users_limited` file and drag it into the expanded folder. Your project should resemble the following:
    

![users_limited.view tabbed page open in the File Browser](https://cdn.qwiklabs.com/iUVoSzFTBI%2BUdLyl1VQeKRXzwvjjtZgubt1qbAoDnmU%3D align="left")

### Add some dimensions and measures

Now that you have created a new view file and organized it in your project file browser, you're ready to add some content to it.

1. Start by specifying the view name and the SQL table name you want to connect your view to. For this example, you will be connecting to the dataset used for the `qwiklabs_ecommerce` project. This is the same table for `users.view`. Add the following code on line 2:
    

```apache
sql_table_name: `cloud-training-demos.looker_ecomm.users` ;;
```

2. Now add a few dimensions. Here you will be adding the user `id`, `country`, `email`, `first_name`, and `last_name`:
    

```apache
dimension: id {
  primary_key: yes
  type: number
  sql: ${TABLE}.id ;;
}

dimension: country {
  type: string
  map_layer_name: countries
  sql: ${TABLE}.country ;;
}

dimension: email {
  type: string
  sql: ${TABLE}.email ;;
}

dimension: first_name {
  type: string
  sql: ${TABLE}.first_name ;;
}

dimension: last_name {
  type: string
  sql: ${TABLE}.last_name ;;
}
```

3. Next, add a measure. This will be used for counting specific dimensions:
    

```apache
measure: count {
  type: count
  drill_fields: [id, last_name, first_name]
}
```

4. Click **Save Changes**. Great! You're all done adding dimensions and measures to your new view. Your file should resemble the following:
    

![users_limited.view tabbed page open in the File Browser](https://cdn.qwiklabs.com/5D%2BGGb9jl%2FZSfo16alUe%2B2kIQIM4DXg8tmmJo2bjwyg%3D align="left")

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click **Check my progress** to verify the objective.

Create a view

Check my progress

## **Task 2. Join a view to an existing Explore**

1. In the file browser, under the **models** folder, navigate to the `training_ecommerce.model` file.
    
2. In the `explore: events` definition, add a new line after `join: users`, and paste the following:
    

```apache
join: users_limited {
  type: left_outer
  sql_on: ${events.user_id} = ${users_limited.id};;
  relationship: many_to_one
}
```

3. Click **Save Changes**. Your project file should now resemble the following:
    

![training_ecommerce.model tabbed page open in the File Browser](https://cdn.qwiklabs.com/lm2FlwCM3e%2FxEYtn2bKRDz%2FtT9sQ3vYzxmK8sa7Fiio%3D align="left")

4. Click the caret next to the file title at the top of the IDE and then select **Explore Events**.
    

![Explore Events option highlighted in the dropdown menu](https://cdn.qwiklabs.com/MXrxmLbCChTXu7MbZdWSZTcwflkyuFCpIPVrVxV%2Bogw%3D align="left")

5. Next, navigate to your new view in the Explore page by selecting **Users Limited**.
    

![Users Limited option](https://cdn.qwiklabs.com/9YZb0vDrToXmx8A1cfgYsFfB1ajpDgWsY7vRGn3d%2FoA%3D align="left")

6. Under **Users Limited**, select the **First Name** dimension and the **Count** measure.
    
7. Click **Run**. Your visualization should resemble the following:
    

![Ten rows of data in a two-column table with headings: Users limited first name and Users limited content](https://cdn.qwiklabs.com/RGUauOQF0s7dvexnQxNg0Bifsi2XwwTQ6oaiU%2FTdRfw%3D align="left")

8. Navigate back to the `training_ecommerce.model` file.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Click **Check my progress** to verify the objective.

Join view to an explore

---

## Solution of Lab

%[https://www.youtube.com/watch?v=wNgUf8-XfLM] 

### First, on the bottom left of the Looker User Interface, click the toggle button to enter Development mode.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1743229840810/ce95d953-98aa-4405-a6d3-903a7036b9d0.png align="center")

***Click the Develop tab and then select the qwiklabs-ecommerce LookML project.***

***To create the file at the project’s root level, click the + button at the top of the file browser in the Looker IDE.***

***Select Create View. Name the file*** `users_limited`. Click Create.

```apache
view: users_limited {
  sql_table_name: `cloud-training-demos.looker_ecomm.users` ;;
  dimension: id {
    primary_key: yes
    type: number
    sql: ${TABLE}.id ;;
  }

  dimension: country {
    type: string
    map_layer_name: countries
    sql: ${TABLE}.country ;;
  }

  dimension: email {
    type: string
    sql: ${TABLE}.email ;;
  }

  dimension: first_name {
    type: string
    sql: ${TABLE}.first_name ;;
  }

  dimension: last_name {
    type: string
    sql: ${TABLE}.last_name ;;
  }
  measure: count {
    type: count
    drill_fields: [id, last_name, first_name]
  }
  }
```

***In the file browser, under the models folder, navigate to the*** `training_ecommerce.model` file.

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
  join: users_limited {
    type: left_outer
    sql_on: ${events.user_id} = ${users_limited.id};;
    relationship: many_to_one
  }
}

```

### Commit Changes and Deploy to Production

1. Click **Validate LookML**.
    
2. Click **Commit Changes & Push**.
    
3. Add a commit message and click **Commit**.
    
4. Lastly, click **Deploy to Production**.