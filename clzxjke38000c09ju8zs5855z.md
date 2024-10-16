---
title: "Caching and Datagroups with LookML - GSP893"
seoTitle: "Caching and Datagroups with LookML - GSP893"
seoDescription: "Looker is a modern data platform in Google Cloud that you can use to analyze and visualize your data interactively. You can use Looker to do in-depth data a"
datePublished: Sat Aug 17 2024 02:51:15 GMT+0000 (Coordinated Universal Time)
cuid: clzxjke38000c09ju8zs5855z
slug: caching-and-datagroups-with-lookml-gsp893
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723861658777/1df34127-6f5b-4849-b630-77eb28c77a91.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723863062482/ab657a0e-76eb-4cf4-acda-a2678854b6bb.png

---

## **Overview**

Looker is a modern data platform in Google Cloud that you can use to analyze and visualize your data interactively. You can use Looker to do in-depth data analysis, integrate insights across different data sources, build actionable data-driven workflows, and create custom data applications.

Looker is constantly generating SQL queries and sending them to the connected database. Whenever someone runs a query in Looker, the SQL results are cached and stored in an encrypted file on the Looker instance.

Caching leverages the saved results from previously executed queries so that the same query is not run on the database repeatedly. This helps reduce database load. Caching also helps optimize Looker performance. In this lab, you learn how caching works in Looker and explore how to use LookML datagroups to define caching policies.

### What you'll do

* Define caching and the different datagroup objects in LookML
    
* Apply a datagroup to an individual Explore in a LookML model
    

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
    

## **How caching works in Looker**

Looker acts like a front door attendant for a database. When a user runs a query, Looker determines whether the exact same query has been run before. If not, it allows the query to run on the database. When the results are returned, Looker caches them for future reference.

If the same query *has* been run before, Looker checks the caching policy to determine whether the results are still valid. If yes, Looker returns the cached results to the business user. This happens in less than a second.

If the same query has been run before but the results are no longer valid per the caching policy, Looker sends the query to the database. It then caches the new results for future reference.

### Datagroups

A *datagroup* is the Looker term for a named caching policy or rule. LookML developers use datagroups to manage caching on a Looker instance. Different caching policies require separate datagroup definitions. The number and types of datagroups you need to create depends on your data’s extraction, transformation, and loading (ETL) processes and business requirements.

For example, you may need to define datagroups at the model level, for individual Explores, or for persistent derived tables (PDTs), depending on how often your data is updated.

* To apply a datagroup as the default for all Explores, use the `persist_with` parameter at the model level.
    
* To apply a datagroup to a specific Explore, use the `persist_with` parameter in that Explore’s definition.
    
* To apply a datagroup to a specific set of Explores but not all Explores in a model, use the `persist_with` parameter in each Explore’s definition and specify the same datagroup name.
    

### Objects that can use datagroups

#### `persist_with`

If you apply a datagroup at the model level, Looker, by default, will apply the same caching rules to all Explores within this model.

However, you can apply a datagroup *on an individual Explore*, which overrides any setting at the model level. Because Explores are the foundation for all content, the same caching logic applies to Looks and dashboards in the Explore.

**Note:** If your database connection is configured in Looker to use dynamic usernames, you cannot use a datagroup for models that use that connection. Instead, use a `persist_for` parameter to cache Explore queries for a fixed amount of time, and use either `sql_trigger_value` or `persist_for` for persistent derived tables.

#### `datagroup_trigger`

For PDTs, you can apply a datagroup to specify how the PDT is rebuilt.

#### **Schedules**

Schedules for Looks and dashboards can also be run on datagroups. You can instruct Looker to run a Look or dashboard automatically upon expiration of a caching policy, so new data is retrieved and “pre-cached” for any business users who need it.

### Datagroup configuration

Datagroups take two parameters: `max_cache_age` and `sql_trigger`.

* `max_cache_age` specifies the number of hours to keep a cached result, such as 24 hours.
    
* `sql_trigger` is used to write a **SELECT** statement that can tell Looker whether the results have changed. The `sql_trigger` should be written to return only one value. Looker will regularly send this statement to the connected database. If the result has changed, Looker refreshes the cache.
    

Although only one parameter is required, it is best to use both to achieve the desired caching results. For example, if the `sql_trigger` check doesn't detect a change, that could mean something went wrong with the ETL process or the `sql_trigger` itself. If you include a `max_cache_age` parameter, the cache will be refreshed after a set duration regardless of the result of the `sql_trigger` check.

**Note:** Only **one** of these parameters is required, but both are recommended.

## **Task 1. Apply a datagroup to an Explore**

Define and apply datagroups to individual Explores in a LookML model. Specifically, you update caching for all views in the Order Items Explore to refresh whenever a new `order_item_id` is added, because the `order_item_id` is the primary key for order items.

### Open the model

1. Click the toggle button to enter **Development mode**.
    
2. On the **Develop** tab, select the **qwiklabs-ecommerce** LookML project.
    
3. Open the **training\_ecommerce.model** file.
    

![File Browser page displaying the training_ecommerce.model file](https://cdn.qwiklabs.com/DdrtuhgV2y7EYLKSLuyaWrP5oiTSeNrFE9fTYy%2BE3Jc%3D align="left")

Notice that this model file has a default datagroup with a `max_cache_age` of 1 hour. Whenever you create a new LookML project by having Looker generate the model from the database schema, Looker automatically creates a default datagroup with the name of the model, in this case `training_ecommerce`, followed by `_default_datagroup`.

### Delete the default datagroup and replace it

Because this default datagroup is currently defined at the *model* level, it is applied to all Explores defined in the model. You want to apply the datagroup to the Explore, so you must remove the default one and update it accordingly. To complete the definition of the new datagroup, you need to provide values for the two parameters: `sql_trigger` and `max_cache_age`.

1. Delete the default datagroup and the `persist_with` definition (Lines 8-13).
    
2. To create a new datagroup for a specific Explore such as **Order Items**, enter the following code:
    

```apache
datagroup: order_items_datagroup {}
```

3. For the `sql_trigger`, to select the maximum ID for `order_item_id`, enter the following code:
    

```apache
sql_trigger: SELECT MAX(order_item_id) from order_items ;;
```

4. Set the `max_cache_age` so that caching will continue to refresh every hour even if there is an issue with data updates. Enter the following code:
    

```apache
max_cache_age: "1 hour"
```

![The training_ecommerce.model file with updated max cache age](https://cdn.qwiklabs.com/OhQKrqkinyeRKvNijtAUdM8gofNg%2BY8FZ8s4zc8N6JI%3D align="left")

### Apply the datagroup

Note that configuring a datagroup by itself doesn’t do anything; it is a two-step process. After defining the datagroup, you need to apply the datagroup to an object by using a parameter called `persist_with`.

1. To apply the datagroup to the definition for the **Order Items** Explore, directly under the `explore: order_items` line, enter the following code:
    

```apache
persist_with: order_items_datagroup
```

![The training_ecommerce.model file with added persist_with code to order_items explore](https://cdn.qwiklabs.com/I5JxiVHPgNp664PvjXXZnD%2BwB2E4Wd%2F6KbyfLkwL0HQ%3D align="left")

2. Click **Save Changes**, and then click **Validate LookML**.
    
3. Navigate back to the `training_ecommerce.model` file.
    

### Commit changes and deploy to production

1. Click **Validate LookML** and then click **Commit Changes & Push**.
    
2. Add a commit message and click **Commit**.
    
3. Lastly, click **Deploy to Production**.
    

Great! You just defined your own caching policy (datagroup) to update every time a new order number is added and also used a max caching age parameter set to 1 hour so that caching will continue to refresh every hour, regardless of the data updates. You then applied this datagroup to the individual **Order Items** Explore instead of applying it to the entire model.

Click *Check my progress* to verify the objective.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=lFGWISl7FvY] 

**Toggle Development mode button &gt; Develop &gt; qwiklabs-ecommerce**

> Model &gt; <mark>training_ecommerce.model</mark> &gt; Replace the code

```apache
connection: "bigquery_public_data_looker"

# include all the views
include: "/views/*.view"
include: "/z_tests/*.lkml"
include: "/**/*.dashboard"

datagroup: order_items_datagroup {
  sql_trigger: SELECT MAX(order_item_id) from order_items ;;
  max_cache_age: "1 hour"
}

label: "E-Commerce Training"

explore: order_items {
  persist_with: order_items_datagroup
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