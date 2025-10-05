---
title: "Use Data Canvas to Visualize and Design Queries - GSP1259"
seoTitle: "Use Data Canvas to Visualize and Design Queries - GSP1259"
seoDescription: "Discover how to use Data Canvas in Google Cloud BigQuery for visualizing data, creating complex queries, and collaborating effectively with your team"
datePublished: Sun Oct 05 2025 09:41:04 GMT+0000 (Coordinated Universal Time)
cuid: cmgdii2q3000a02js0gz69tvs
slug: use-data-canvas-to-visualize-and-design-queries-gsp1259
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759657231014/86c8fe66-7853-4963-bf0d-cc48c3b0b1f2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759657247394/c91fbfaa-7271-4d8f-be2e-31997514cac9.png
tags: use-data-canvas-to-visualize-and-design-queries-gsp1259, use-data-canvas-to-visualize-and-design-queries, gsp1259

---

## Overview

Imagine you are a data analyst and have been at Data Beans for a year. You have successfully completed many projects on your own and are taking on the responsibility of mentoring new data analysts because the company is growing. The team has already been using Gemini in BigQuery to generate SQL code, data insights, and table explorer. The team has found these helpful, especially with new datasets. However, the team needs a better collaboration tool for visualizing data and creating new, more complex queries that join tables.

You have heard that Data Canvas is a visual interface within Google Cloud BigQuery that simplifies data exploration and analysis. It allows users to interact with their data through point-and-click actions, eliminating the need for complex SQL queries. You can also collaborate with others by sharing canvases with others. Data Canvas appears to be a potential solution for the team's needs, and from what you have read, you want to get started using it, but unsure how to do this.

## Objectives

In this lab, you learn how to use Data Canvas to:

* Join the menu, orders, and order item tables.
    
* Calculate the total revenue for all menu items in 2024.
    
* Create a bar chart displaying the top 10 items by total revenue.
    
* Identify two menu items generating the same revenue.
    
* Collaborate with others.
    

Finally, you have time to reflect on what you have learned in this lab and consider how you could apply Data Canvas to your data, use cases, and workflows by answering questions in your [Lab Journal](https://storage.mtls.cloud.google.com/spls/gsp1259/gsp1259_lab_journal.pdf).

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    * The Open Google Cloud console button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-01-d506720aec87@qwiklabs.net
    ```
    

    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    GgTx5j96ZQQL
    ```
    

    
    You can also find the Password in the Lab Details pane.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="left")

## Task 1. Join the menu, orders, and order item tables

In this task, you use Data Canvas to find the menu, orders, and order item tables and join them, so that you create insights from them.

**Note**: Throughout the lab you might notice your generated queries differ from the code snippets provided in this lab guide. This is expected and part of the Generative AI experience. If you get the same outputs and can validate them with the provided hints, then it is working as expected.

### Find the menu, orders, and order item tables

1. In the Google Cloud console, on the **Navigation menu**, click **BigQuery**.
    
2. Click **DONE** on the Welcome dialog.
    
3. Click , to create a new data canvas for your project.
    
4. Select `us-central1` for the region.
    
5. Click **SELECT**. See the Untitled canvas tab appear. Notice how you can find a table with a natural language prompt, and access recently used tables, queries, and saved queries. You are going to use a natural language prompt to find the menu and order item tables by searching for the `coffee_on_wheels` dataset.
    
6. Enter **coffee on wheels**.
    
7. Click . The tables for the `coffee_on_wheels` dataset appear. You should see four tables: location, menu, orders, and order\_items.
    

**Note**: Click the **Submit search query** button until the number of tables displayed is as expected. If the expected tables are not displayed, open the `coffee_on_wheels` dataset from the left pane and, for `menu`, `orders`, and `order_items` tables, select **Query in &gt; Current data canvas** from the three dots. Then, click JOIN from any of the tables and select the remaining two. You can continue with the following subtask from step 3 with the **Join these data sources** prompt.

### Join the menu, orders, and order item tables

Now that you have found the tables, you can join them.

1. Select the `menu`, `orders`, and `order_item` tables. Notice the JOIN button appears.
    
2. Click **JOIN**. You see Data Canvas join the three tables visually, and a new branch node is created. However, the join isn't complete yet. Notice a query like the one below is automatically created, and you have options to run or save it:
    
    ```apache
    SELECT * FROM `qwiklabs-gcp-00-857ec74d7a38.coffee_on_wheels.menu` AS t1,
    `qwiklabs-gcp-00-857ec74d7a38.coffee_on_wheels.orders` AS t2,
    `qwiklabs-gcp-00-857ec74d7a38.coffee_on_wheels.order_item` AS t3 LIMIT 10;
    ```
    

    
    You don't use this query, as it only selects items from the tables and lists 10 of them. First, let's try a simple prompt. Enter this and then click **REFINE**:
    
    Join these data sources
    
    You should see something like this:
    
    ```apache
    -- prompts:
    -- 1. Join these data sources
    
    SELECT
      t1.*,
      t2.*,
      t3.*
    FROM
      `qwiklabs-gcp-01-6417c75eef67`.`coffee_on_wheels`.`orders` AS t1
    INNER JOIN
      `qwiklabs-gcp-01-6417c75eef67`.`coffee_on_wheels`.`order_item` AS t2
    ON
      t1.order_id = t2.order_id
    INNER JOIN
      `qwiklabs-gcp-01-6417c75eef67`.`coffee_on_wheels`.`menu` AS t3
    ON
      t2.menu_id = t3.menu_id;
    ```
    

    
    While this is a great, easy start, notice how it doesn't necessarily follow best practices in terms of clarity or '\*' usage. To improve it, use the following prompt:
    
    Join these data sources without using \* and use descriptive table aliases
    
3. Click **REFINE** once again. You'll see a new query like the one below is generated.
    
    ```apache
    # prompt: Join these data sources without using *
    
    SELECT
    menu.menu_id,
    menu.company_id,
    menu.item_name,
    menu.item_price,
    menu.item_description,
    menu.item_size,
    order_item.order_item_id,
    order_item.order_id,
    order_item.quantity,
    order_item.item_price,
    order_item.item_total,
    orders.location_id,
    orders.customer_id,
    orders.order_datetime,
    orders.order_completion_datetime
    FROM
    `qwiklabs-gcp-00-857ec74d7a38.coffee_on_wheels.menu` AS menu
    INNER JOIN
    `qwiklabs-gcp-00-857ec74d7a38.coffee_on_wheels.order_item` AS order_item
    ON
    menu.menu_id = order_item.menu_id
    INNER JOIN
    `qwiklabs-gcp-00-857ec74d7a38.coffee_on_wheels.orders` AS orders
    ON
    order_item.order_id = orders.order_id;
    ```
    

    

**Note**: Ensure you no longer see a `LIMIT` clause. If it persists, either remove the line manually or change the prompt to: 'Join these data sources without using \* while returning all rows'

1. Click **INSERT** followed by **RUN**.
    
2. Review the results and confirm the tables are joined. You see each menu item listed with key fields including item\_name, item\_price, order\_datetime, and item\_total. Use these fields within this new table to calculate total revenue for each item in 2024 in the next task.
    

Click **Check my progress** to verify the objective.

Join the menu, order, and order item tables.

## Task 2. Calculate the total revenue for all menu items in 2024

In this task, you use the joined tables to calculate the total revenue for all menu items in 2024 using a gemini prompt resulting in a SQL query.

Beneath the results of the join query, you see options to branch another node in your data canvas, including QUERY THESE RESULTS, VISUALIZE, AND JOIN.

* QUERY THESE RESULTS: can be used to create a query from the resulting joined table.
    
* VISUALIZE: can be used to create charts from the data in the joined table.
    
* JOIN: can be used to join this table with another table.
    

1. Click **QUERY THESE RESULTS**. A new node is generated in your data canvas. Notice you can enter a prompt, or you can manually write new SQL code.
    
2. Enter the following prompt.
    
    From the joined table, only consider orders from 2024. Calculate the total revenue for each menu item. In the results, display the menu\_id, the item name, the item size, and the total revenue (rounded as only two decimal places). Order results with total revenue in descending order.
    
3. Click **GENERATE**. You see a new query is generated like the one below.
    
    ```apache
    # prompt: From the joined table, only consider orders from 2024. Calculate the total revenue for each menu item. In the results, display the menu_id, the item name, the item size, and the total revenue (rounded to only two decimal places). Order results with total revenue in descending order.
    
    SELECT
    t1.menu_id,
    t1.item_name,
    t1.item_size,
    ROUND(SUM(t1.item_total), 2) AS total_revenue
    FROM
    `SQL` AS t1
    WHERE
    EXTRACT(YEAR
    FROM
       t1.order_datetime) = 2024
    GROUP BY
    1,
    2,
    3
    ORDER BY
    total_revenue DESC;
    ```
    

    
4. Click **RUN**.
    
5. Review the results. Notice that the `menu_id`, `item_name`, `item_size`, and `total_revenue` fields are included.
    

### Time to reflect

1. Which item is ranked number 2 in highest revenue? What is the item\_size reported?
    

Click **Check my progress** to verify the objective.

Calculate the total revenue for all menu items in 2024

## Task 3. Create a bar chart displaying the top 10 items by total revenue

In this task, you use the results from the total revenue calculation to create a bar chart of the top 10 items by total revenue.

### Identify the top 10 items by total revenue

1. Click **QUERY THESE RESULTS**. A new node is generated in your data canvas.
    
2. Enter the following prompt:
    
    Identify the top 10 items by total revenue and include the menu\_id, item\_nam, item\_size, and total\_revenue fields.
    
3. Click **GENERATE**. You'll see a new query is generated like the one below.
    
    ```apache
    SELECT
      t1.menu_id,
      t1.item_name,
      t1.item_size,
      t1.total_revenue
    FROM
      `SQL` AS t1
    ORDER BY
      t1.total_revenue DESC
    LIMIT 
      10;
    ```
    

    
4. Click **RUN**.
    
5. Review the results. Notice that now only the top 10 items by total revenue are shown.
    

### Create the bar chart

1. Click **VISUALIZE**.
    
2. Select **Bar** from the resulting dropdown menu. A new node is generated in your data canvas. Notice how a chart is created automatically and displays all menu items with their corresponding total revenue.
    
    This is helpful, but notice how the items aren't in order from highest to lowest total revenue. Nor are the item sizes factored into the chart. You can fix that.
    
3. Replace the existing prompt by entering the following prompt:
    
    Create a vertical bar chart displaying total revenue. Include the item name on the x-axis and the total revenue on the y-axis in the results. Start with the location with the highest revenue. Stack the results by item size.
    
4. Click **REFINE**. Notice how the top ten items are displayed now in order and item size is factored into total revenue with color-coding.
    

### View the chart summary

Now that the chart is created, you also get a summary. To view the chart summary:

1. At the bottom of the chart, click **GENERATE INSIGHTS**. A chart summary is generated like the one below:
    

* "Coffee-infused Avocado Toast" emerged as the top revenue generator, reaching $675.48.
    
* A majority of the menu items (5 out of 10) do not have size variations and fall under the "n/a" size category.
    
* Items without size options contribute significantly to the overall revenue.
    
* For items with size options ("Brewhaha Bonanza" and "Java Journey"), the "large" size demonstrates higher popularity.
    

### Time to reflect

1. Compare the bar chart to the raw data in the results for the query you generated in Task 2.
    
    Why is Brewhaha Bonanza displayed as the highest total revenue item in the chart and not Coffee-infused Avocado Toast?
    

Click **Check my progress** to verify the objective.

Create a bar chart displaying the top 10 items by total revenue

## Task 4. Identify two menu items generating the same revenue

In this task, you identify two menu items generating the same revenue from the total revenue calculation you completed in an earlier task.

1. Return to the node for the total revenue calculation we created in Task 2.
    
2. Move your cursor so that it hovers over the bottom center of the node. You see the 'Branch another node' options appear.
    
3. Click **QUERY THESE RESULTS**. A new node is generated in your data canvas.
    
4. Enter the following prompt:
    
    Find two items with the same total revenue. Within the results, display the item names, item size, and total revenue. Limit your response to only two items.
    
5. Click **GENERATE**. You see a new query like the one below is generated .
    
    ```apache
    # prompt: Find two items with the same total revenue. Within the results, display the item names, item size, and total revenue. Limit your response to only two items.
    
    SELECT
    t1.item_name,
    t1.item_size,
    t1.total_revenue
    FROM
    `SQL 1` AS t1
    WHERE
    t1.total_revenue IN(
    SELECT
       t2.total_revenue
    FROM
       `SQL 1` AS t2
    GROUP BY
       1
    HAVING
       COUNT(t2.total_revenue) > 1 )
    LIMIT
    2;
    ```
    

    
6. Click **RUN**.
    

### Time to reflect

Review the results. Notice two results are displayed, with the item names, size, and total revenue for each.

1. Which two items are displayed?
    
2. What are the item sizes?
    
3. Do the revenues match?
    
4. Considering your data and use cases, how would you use data canvas to visualize and design queries?
    

Click **Check my progress** to verify the objective.

Identify two menu items generating the same revenue.

## Task 5. Collaborate with others

In this task, you act as two different users, the owner of the data canvas and another user you want to share the data canvas with. First, you review the roles assigned to the owner and the other user within this lab environment. Then, you save and share the data canvas you just created. You also export the data canvas to a notebook. Finally, you access the data canvas as the other user.

### Roles required for using and sharing data canvases

1. Open another tab and in the Google Cloud console, on the **Navigation menu**, click **IAM & Admin**. You see the list of principals along with the assigned roles.
    
2. Find the `student-01-d506720aec87@qwiklabs.net` principal.
    
    **Note:** This is the owner principal, also this is the user you have been using up until this point in this lab.
    
    As you can see in IAM, this user has the following roles:
    
    * BigQuery Admin
        
    * Gemini for Google Cloud User
        
    * Owner
        
    * Service Usage Viewer
        
    * Viewer
        
3. Find the `student-03-35f34099e32d@qwiklabs.net` principal.
    
    **Note:** This is the other principal you use for testing the data canvas sharing feature.
    
    As you can see in IAM, this user has the following roles:
    
    * BigQuery Data Editor
        
    * BigQuery Studio User
        
    * Gemini for Google Cloud User
        
    * Code Editor
        
    * Viewer
        

See Permissions [Required Roles](https://cloud.google.com/bigquery/docs/data-canvas#required-roles) for data canvas for more information.

### Save and share a data canvas (as the owner)

1. Return to your data canvas in BigQuery.
    
2. Find the Save button at the top of the Canvas. Click the **down arrow**. You see two options, Save and Save As.
    
3. Click **Save as**. The Save dialog appears.
    
4. For the name, enter: **Two items with same total revenue**
    
5. Keep the default region, as this was assigned to you when you launched the lab.
    
6. Click **SAVE**. You notice that the data canvas is now saved and listed in the Explorer panel in the Shared data canvases section.
    

### Export a data canvas to a notebook (as the owner)

BigQuery data canvas lets you export your queries as a notebook.

1. Within the data canvas, click **Export as notebook**.
    
2. In the Save Notebook pane, enter the name for the notebook (**data\_canvas\_export**) and the region where you want to save it (`us-central1`).
    
3. Click **Save**. The notebook is created successfully.
    
4. To view the created notebook, expand the **Notebooks** section of the explorer panel.
    
5. Click on the **data\_canvas\_export** notebook.
    

**Note:** Given the current permissions for the owner and the other user, only the owner can export. In other words, you need to supply the appropriate permissions to enable the export feature.

### Access a Data Canvas (as another user)

Now you access the data canvas as another user.

1. Here, in the lab guide, right-click on **Open Google Cloud console**.
    
2. Select **Open link in incognito window**.
    
3. Use Username 2 username and password. Access the Google Cloud console the same way you did at the start of this lab.
    
4. In the Google Cloud console, on the **Navigation menu**, click **BigQuery**.
    
5. Click **DONE** on the Welcome dialog.
    
6. In the **Explorer** panel, expand the `qwiklabs-gcp-00-857ec74d7a38` project. You see the `coffee_on_wheels` dataset at the bottom of the list.
    
7. Expand **Data canvases**.
    
8. Expand **Shared data canvases**. You see the `Two items with same total revenue` data canvas listed.
    
9. Click the **Two items with same total revenue** data canvas. You see the data canvas displayed.
    

From here, the other can review the data canvas to understand the workflow you designed for this business problem. If needed, they can even modify the canvas to either troubleshoot an issue or augment it as needed, based upon the permissions they have.

### Time to reflect

1. Considering your data and use cases, how would you use data canvas to collaborate with your team?
    
2. How would you manage access to the data canvases your team creates?
    

Click **Check my progress** to verify the objective.

Export the data canvas to a notebook.

---

## Solution of Lab

%[https://youtu.be/406EANBEG5E]