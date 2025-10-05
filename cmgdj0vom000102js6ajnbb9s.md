---
title: "Develop Code with Gemini in BigQuery - GSP1258"
seoTitle: "Develop Code with Gemini in BigQuery - GSP1258"
seoDescription: "Learn to develop SQL code using Gemini in BigQuery. Generate, transform, and debug queries efficiently as a data analyst with Google Cloud"
datePublished: Sun Oct 05 2025 09:55:41 GMT+0000 (Coordinated Universal Time)
cuid: cmgdj0vom000102js6ajnbb9s
slug: develop-code-with-gemini-in-bigquery-gsp1258
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759658032071/f3e0256e-66f6-4187-b176-f706fa03b3a9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759658136067/6f6dfd28-3d8b-4b46-be88-3c776e549018.png
tags: bigquery, gemini, develop-code-with-gemini-in-bigquery-gsp1258, develop-code-with-gemini-in-bigquery, gsp1258

---

## Overview

Imagine you are a data analyst and have been with Data Beans for a few months. You have worked on a few successful projects with your teammates and have been assigned your first solo project. You are starting to create more complex queries with little help, but you have been asked to write more complex queries to retrieve deeper insights. Everyone on the team is helpful, but you need to start showing that you are more self-sufficient in your work.

You have read that BigQuery SQL code generation, explanation, and transformation may help you to write more complex queries using natural language. And, if you get stuck with writing a new query, you have also learned you could use Gemini to help review and debug your code. It could even help you with suggestions to resolve issues. Using these features will help you to be more independent in your work and, perhaps, even more efficient. However, you are not sure how to get started.

## Objectives

In this lab, you learn how to:

* Generate a SQL query using a natural language prompt.
    
* Use the code explanation feature of BigQuery.
    
* Modify SQL code with the transform feature of BigQuery.
    
* Prompt Gemini to review and debug SQL code in BigQuery.
    
* Ask Gemini for suggestions to fix a SQL code issue.
    

Finally, you will have time to reflect on what you have learned in this lab and consider how you could apply the code generation, explanation, transformation, and suggestions with your data, use cases, and workflows by answering questions in your [Lab Journal](https://storage.mtls.cloud.google.com/spls/gsp1258/gsp1258_lab_journal.pdf).

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
    student-04-f049eaa9c6f5@qwiklabs.net
    ```
    

    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    jyKXDY71XjLG
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

## Task 1. Review menu and order\_item tables

In this task, you review the menu and order\_item table schemas.

**Important:** If you don't review the schema for these tables, you will not be able to successfully complete other tasks in this lab.

### Review the menu table schema

1. In the Google Cloud console, on the **Navigation menu**, click **BigQuery**.
    
2. Click **DONE** on the Welcome dialog.
    
3. In the **Explorer** panel, expand the `qwiklabs-gcp-00-3d3ca50fc205` project. You see the `coffee_on_wheels` dataset at the bottom of the list.
    
4. Expand the **coffee\_on\_wheels** dataset. You see the `menu` table.
    
5. Click the **menu** table. You see the `menu` schema displayed.
    
6. Review the details of the schema.
    
7. Answer this question:
    
    Which fields use FLOAT as datatype?
    

### Review the order\_item table schema

1. Click the **order\_item** table. You see the `order_item` schema displayed.
    
2. Review the details of the schema.
    
3. Answer this question:
    
    Which fields use INTEGER as the data type?
    

## Task 2. Generate a SQL query using a natural language prompt

In this task, you generate a SQL query using a natural language prompt to find menu IDs and total revenue for the top three and bottom three items in the menu by total revenue.

1. Click to create a new SQL Query. A new tab is displayed in BigQuery Studio.
    
2. Click to access the SQL generation tool. You see the Generate SQL with Gemini dialog appear. You can enter a natural language prompt in this window to generate a new SQL statement.
    
3. Enter the prompt below.
    
    Show the menu IDs and total revenue from the order\_item table with the top three highest and top three lowest by total revenue.
    
4. Click **Generate**. You see Gemini create a SQL statement like the one below.
    
    ```apache
     (
         SELECT
             menu_id,
             SUM(item_total) AS total_revenue
         FROM
             `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.order_item`
         GROUP BY 1
         ORDER BY
             total_revenue DESC
         LIMIT 3
     )
     UNION ALL
     (
         SELECT
             menu_id,
             SUM(item_total) AS total_revenue
         FROM
             `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.order_item`
         GROUP BY 1
         ORDER BY
             total_revenue
         LIMIT 3
     );
    ```
    

    

**Note:** If the generated query results in the error message **Syntax error: Expected end of input but got keyword UNION at \[12:1\]**, consider adjusting the query syntax or replacing the entire query to match the example provided above.

5. Click **INSERT**. The query you generated is added to the Untitled query tab.
    

### Explain the query

1. Select the query.
    
2. Click immediately to the left of the query.
    
3. Click **Explain this query**.
    
4. You see the dialog for Gemini open to the right of BigQuery Studio.
    
5. Click **Start chatting**. You can see an explanation for the query like the one below in the chat window.
    

**Note:** If no explanation appears in the chat window, please click **Explain this query** again after selecting the entire query.

6. Review the explanation. Gemini provides a summary of the response like the following:
    
    In summary, this query helps you identify the most and least popular menu items based on their revenue, providing valuable insights for business decisions.
    
7. Click **RUN**. The result is six menu items, the top three highest-selling items and the bottom three lowest-selling items.
    

### Time to reflect

1. Considering your data and use cases for BigQuery, how would you use the code generation feature?
    
2. Also, how would you use the code explanation feature?
    

Click **Check my progress** to verify the objective.

Retrieve top three highest and lowest revenue menu IDs.

## Task 3. Transform a query

The query you created in the previous task is helpful, but it is missing some critical information. For example, you don't know the menu item name, and there are extraneous decimal places in the total\_revenue column.

To get the menu item name, you will have to join the menu and order item tables. You can also format the total\_revenue field so that only two decimal places are displayed.

In this task, you use the transform feature of Gemini to write prompts to address these gaps.

### Join the menu and order item tables to get the menu item name

1. Click the to create a new SQL query. A new tab is displayed in BigQuery Studio.
    
2. Click to access the SQL generation tool. You see the Generate SQL with Gemini dialog. You can enter a natural language prompt in this window to generate a new SQL statement.
    
3. Enter the prompt below.
    
    Join the menu table with the order item table, return the menu\_id, the item\_name, and show the top three highest items and bottom three lowest items by total\_revenue.
    
4. Click **Generate**. You see Gemini create a SQL statement like the one below.
    
    ```apache
     (
         SELECT
             t1.menu_id,
             t1.item_name,
             SUM(t2.item_total) AS total_revenue
         FROM
             `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.menu` AS t1
             INNER JOIN `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.order_item` AS t2 ON t1.menu_id = t2.menu_id
         GROUP BY 1, 2
         ORDER BY
             total_revenue DESC
         LIMIT 3
     )
     UNION ALL
     (
         SELECT
             t1.menu_id,
             t1.item_name,
             SUM(t2.item_total) AS total_revenue
         FROM
             `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.menu` AS t1
             INNER JOIN `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.order_item` AS t2 ON t1.menu_id = t2.menu_id
         GROUP BY 1, 2
         ORDER BY
             total_revenue
         LIMIT 3
     );
    ```
    

    
5. Click **INSERT**. The query you generated is added to the Untitled query tab.
    

**Note:** Since Gemini responses may vary, If you encounter a syntax error or your query doesn’t match the example, consider adjusting the query syntax or replacing the entire query to match the example provided above.

### Explain the query

1. Select the query.
    
2. Click immediately to the left of the query.
    
3. Click **Explain this query**. You see the explanation displayed in the Gemini chat window with a summary like the one below:
    
    This query provides a quick and easy way to identify the most popular and least popular items on the coffee shop's menu, which can be valuable for making decisions about inventory, pricing, and menu changes.
    
4. Review the details of the explanation.
    
5. Click **RUN**. The result is six menu items, the top three highest-selling items and the bottom three lowest-selling items. However, this time, you not only see the menu\_id and total\_revenue fields, you also see the item name field included between them.
    
6. Answer these questions:
    
    * Which item has the most revenue?
        
    * Which item has the least revenue?
        

Click **Check my progress** to verify the objective.

Join menu and order item tables to retrieve menu item names.

### Transform the query to remove extraneous decimal places

1. Select the query.
    
2. Click to access the SQL generation tool.
    
3. Click **Transform**. You see the Transform SQL with Gemini pop-up appear.
    
4. Enter the following prompt.
    
    Format the total revenue column so that there are only two decimal places. Use the ROUND function to do so.
    
5. Click **GENERATE**. You see the new query generated.
    
    **Note:** Notice how BigQuery shows the differences in the code: replaced lines are in red-background text and the new line that modifies it based upon your prompt is in green-background text.
    
6. Click **INSERT**. You see the new query in the Untitled query tab.
    
    ```apache
     (
         SELECT
             t1.menu_id,
             t1.item_name,
             ROUND(SUM(t2.item_total), 2) AS total_revenue
         FROM
             `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.menu` AS t1
             INNER JOIN `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.order_item` AS t2 ON t1.menu_id = t2.menu_id
         GROUP BY 1, 2
         ORDER BY
             total_revenue DESC
         LIMIT 3
     )
     UNION ALL
     (
         SELECT
             t1.menu_id,
             t1.item_name,
             ROUND(SUM(t2.item_total), 2) AS total_revenue
         FROM
             `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.menu` AS t1
             INNER JOIN `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.order_item` AS t2 ON t1.menu_id = t2.menu_id
         GROUP BY 1, 2
         ORDER BY
             total_revenue
         LIMIT 3
     );
    ```
    

    
7. Click **RUN**. Notice how the result is very similar. However, now the total revenue field only has two decimal places.
    

**Note:** Since Gemini responses may vary, If you encounter an error or your query doesn’t match the example, consider adjusting the query syntax or replacing the entire query to match the example provided above.

### Time to reflect

1. What is the total revenue generated by Clouds of Coffee Delight?
    
2. Considering your data and use cases for BigQuery, how would you use the code generation feature?
    

Click **Check my progress** to verify the objective.

Format the total revenue column to two decimal places.

## Task 4. Code review, debugging, and suggestions

When you use Gemini with BigQuery you also have the ability to review and debug code. When you may have an error, you can use Gemini to suggest changes to improve your code, so there aren't errors.

### Scenario

Your teammate created the following SQL code:

```apache
 SELECT
     oi.menu_id,
     m.item_name,
     SUM(oi.item_total) AS total_revenue
 FROM
     `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.order_item` AS oi
     INNER JOIN `qwiklabs-gcp-00-3d3ca50fc205.menu` AS m ON oi.menu_id = m.menu_id
 WHERE m.item_size = 'Small'
 GROUP BY 1, 2
 ORDER BY
 total_revenue DESC
 LIMIT 10;
```

Copied!

Their goal was to retrieve the top ten small-sized items by total revenue from the `coffee_on_wheels` dataset, including the `menu_id`, `item_name`, and `total_revenue` fields.

However, with this SQL code, your teammate states they get this error:

Not found: Dataset `qwiklabs-gcp-00-3d3ca50fc205`:`qwiklabs-gcp-00-3d3ca50fc205` was not found in location US

And they are unable to resolve the issue.

Your task is to use Gemini and the `coffee_on_wheels` dataset to resolve issues with this SQL code that was generated by your team member.

### Code review

1. Click the to create a new SQL query.
    
2. Enter the query below.
    
    ```apache
     SELECT
         oi.menu_id,
         m.item_name,
         SUM(oi.item_total) AS total_revenue
     FROM
         `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.order_item` AS oi
         INNER JOIN `qwiklabs-gcp-00-3d3ca50fc205.menu` AS m ON oi.menu_id = m.menu_id
     WHERE m.item_size = 'Small'
     GROUP BY 1, 2
     ORDER BY
     total_revenue DESC
     LIMIT 10;
    ```
    

    
3. Click **RUN**. You confirm the query fails to run and you get the following error:
    
    Not found: Dataset `qwiklabs-gcp-00-3d3ca50fc205`:`qwiklabs-gcp-00-3d3ca50fc205` was not found in location US
    

### Debug the code with Gemini and the error

1. Access the Gemini Chat window in BigQuery.
    
2. In the chat window, enter the following question.
    
    Why am I getting "Not found: `qwiklabs-gcp-00-3d3ca50fc205`:`qwiklabs-gcp-00-3d3ca50fc205` was not found in location US" when I run this query?
    
3. Press **&lt;SHIFT&gt;&lt;ENTER&gt;**, or **&lt;SHIFT&gt;&lt;return&gt;** on Mac, to create a new line in the chat window.
    
4. Select the query and copy it.
    
5. Paste it immediately after the question you asked.
    
6. Press **&lt;SHIFT&gt;&lt;ENTER&gt;**, or **&lt;SHIFT&gt;&lt;return&gt;** on Mac, to create a new line in the chat window.
    
7. Enter the following sentence:
    
    Please suggest new code to resolve any issues.
    
8. Click . You get a response from Gemini.
    
9. Review the suggestions in the response.
    
    Based upon these suggestions, you determine the most likely cause of the issue is the correct dataset name `coffee_on_wheels` is not specified within the INNER JOIN statement for the menu table in the query.
    
    Within the suggestions, a refined query with a potential solution similar to the one below is provided:
    
    ```apache
     SELECT
         oi.menu_id,
         m.item_name,
         SUM(oi.item_total) AS total_revenue
     FROM
         `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.order_item` AS oi
         INNER JOIN `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.menu` AS m ON oi.menu_id = m.menu_id
     WHERE m.item_size = 'Small'
     GROUP BY 1, 2
     ORDER BY
         total_revenue DESC
     LIMIT 10;
    ```
    

    
10. Copy the refined query.
    
11. Click to open a new untitled query tab.
    
12. Paste the refined query in the new untitled query tab.
    
13. Click **RUN**. The result is each of the top 10 small menu items with the item name and the total revenue.
    

This is very close to what your teammate wanted. However, there is one small missing piece to the refined query. Notice that the total\_revenue field is formatted with extraneous decimal places. You can ask gemini to correct this for you with the steps below.

### Formatting the total\_revenue field with only two decimal places

1. In the chat window, ask Gemini the following prompt.
    
    I need help refining this query.
    
2. Press **&lt;SHIFT&gt;&lt;ENTER&gt;**, or **&lt;SHIFT&gt;&lt;return&gt;** on Mac, to create a new line in the chat window.
    
3. Select the query and copy it.
    
4. Paste it immediately after this first part of the prompt.
    
5. Press **&lt;SHIFT&gt;&lt;ENTER&gt;**, or **&lt;SHIFT&gt;&lt;return&gt;** on Mac, to create a new line in the chat window.
    
6. Add the following text to the end of the prompt.
    
    Can you refactor the code so that we round to only two decimal places displayed with the total\_revenue field in the results?
    
7. Confirm the prompt now looks something like this:
    
    I need help refining this query. SELECT oi.menu\_id, m.item\_name, SUM(oi.item\_total) AS total\_revenue FROM `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.order_item` AS oi INNER JOIN `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.menu` AS m ON oi.menu\_id = m.menu\_id WHERE m.item\_size = 'Small' GROUP BY 1, 2 ORDER BY total\_revenue DESC LIMIT 10; Can you refactor the code so that we round to only two decimal places displayed with the total\_revenue field in the results?
    
8. Click . You see Gemini's response below.
    
    ```apache
     SELECT
         oi.menu_id,
         m.item_name,
         ROUND(SUM(oi.item_total), 2) AS total_revenue  -- Round to 2 decimal places
     FROM
         `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.order_item` AS oi
         INNER JOIN `qwiklabs-gcp-00-3d3ca50fc205.coffee_on_wheels.menu` AS m ON oi.menu_id = m.menu_id
     WHERE m.item_size = 'Small'
     GROUP BY 1, 2
     ORDER BY
         total_revenue DESC
     LIMIT 10;
    ```
    

    
    With an explanation like the one below:
    
    To limit the total\_revenue field to two decimal places, you can use the ROUND() function in BigQuery. ROUND(SUM(oi.item\_total), 2) : This part of the query uses the ROUND() function to round the sum of oi.item\_total to two decimal places. The 2 inside the ROUND() function specifies the number of decimal places to keep.
    
9. Copy the refactored code.
    
10. Click to open a new untitled query tab.
    
11. Paste the refactored query in the new untitled query tab.
    
12. Click **RUN**. The result is each of the top 10 small menu items with the item name and the total revenue.
    

You confirm the results are what is desired and send the query back to your teammate. They thank you for your help.

### Time to reflect

1. Answer this question: "What is the name of the item with the 5th most revenue? Also, how much revenue did it generate?
    
2. Considering your data and use cases, how would you use the code review and suggestion features to fix code you are struggling with?
    

Click **Check my progress** to verify the objective.

Fix the error and retrieve the top 10 small menu items.

---

## Solution of Lab

%[https://youtu.be/d1eZZJeOY4Y]