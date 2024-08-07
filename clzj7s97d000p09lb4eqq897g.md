---
title: "Using Custom Fields in Looker Explores - GSP983"
seoTitle: "Using Custom Fields in Looker Explores - GSP983"
seoDescription: "Looker provides the ability for non-developer users to create and utilize ad hoc fields for richer data analysis. This is done by creating custom measures, "
datePublished: Wed Aug 07 2024 02:12:40 GMT+0000 (Coordinated Universal Time)
cuid: clzj7s97d000p09lb4eqq897g
slug: using-custom-fields-in-looker-explores-gsp983
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722996602228/1ff8856f-18bd-4b5e-b764-fbe094746f8f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722996704342/a65ca858-d877-43ba-9307-1ae30fdb4aea.png
tags: using-custom-fields-in-looker-explores-gsp983, gsp983

---

## **Overview**

Looker provides the ability for non-developer users to create and utilize ad hoc fields for richer data analysis. This is done by creating custom measures, custom dimensions, table calculations and using custom groupings to narrow down data to match specific conditions.

Using ad hoc fields gives non-developers the ability to create new fields, as opposed to regular fields, which require that you have development permissions and understand LookML allowing them to have more flexibility in finding data they are looking for independently.

**Objectives**

In this lab, you will learn how to:

* Create custom measures based on an existing dimension
    
* Create custom groupings
    
* Adding filters to custom measures
    
* Use table calculations on numeric fields without writing Looker functions or operators
    

### **Task 1. Create a custom measure**

In this section, you will create a custom measure based on an existing dimension.

**Using the dimension's three-dot Options menu**

1. First, on the bottom left of the Looker User Interface, click the toggle button to enter **Development mode**.
    
2. Click the **Explore** tab and then select **E-Commerce Training** &gt; **Order Items**.
    
3. Expand the **Inventory Items** section.
    
4. Click **More** () next to the **Cost** dimension to review the custom fields you can add.
    
5. Select the **Aggregate** &gt; **Average** custom field to create a measure that calculates the average of an order item’s cost.
    

![Expanded More dropdown menu with Average option highlighted in the Aggregate submenu](https://cdn.qwiklabs.com/8JEOE1CTMSTBLL16%2BBGgQtWAt%2FRrvNjN7wzYGaUw97M%3D align="left")

The suggested functions vary based on the type of dimension you’ve chosen (such as number, text, and date). If you select **count**, a count `distinct` is executed in the generated SQL. Your new field is automatically added to the query.

6. Expand the **Custom Fields** section to see your new field.
    
7. As with other fields, you can click a custom field’s name to add or remove it from a query. You can also hover over the field to reveal more options available for that field, including clicking its *Filter by field* icon to use it as a filter in a query.
    

![Average of Cost custom field with more options displayed](https://cdn.qwiklabs.com/s3Ok1O6Dvft3tBVkL0KZw0EM%2F5IDB3bNB6K3DhMvgck%3D align="left")

### Using the Custom Fields section

If you want to define a format or a filter for your custom measure while creating it, start with the **\+ Add** button on the **Custom Fields** section.

1. Expand the Custom Fields section.
    
2. Click **\+ Add** and then select **Custom Measure**.
    

![Expanded Add dropdown menu with Custom Measure option highlighted](https://cdn.qwiklabs.com/xcy%2BT8AWDSpvIhOKTButNVN0s2A8weD9fQW9thP8Jl8%3D align="left")

3. Set the **Field to measure** to Inventory Items &gt; `Cost`.
    
4. Set the **Measure type** to `Average`.
    
5. Set the **Name** to `Average of Cost`.
    
6. On the **Field details** tab set the following:
    

* `Format`: **U.S. Dollars**
    
* `Decimals`: **2**
    

7. Click **Save**.
    

### **Task 2. Create a custom grouping**

The **Group** custom field type lets you create ad hoc custom groups for dimensions and custom dimensions without needing to use logical functions in Looker expressions or needing to develop CASE WHEN logic in sql parameters or type: case fields.

This can be helpful when you want to assign fixed labels or category names to values that match specific conditions, for example, by grouping specific states or countries into regions or order costs into categories.

1. You should now see two **Average of Cost** custom fields in the **Custom Fields** section. Select just the bottom one to add it to the query.
    
2. Expand the **Inventory Items** section and select the **Product Name** dimension to add it to the query.
    
3. Expand the **Users** section and select the *Filter by field* icon for the **Country** dimension and set the drop down to `is equal to` and the value to **USA**.
    
4. Next, click **More** () next to **State** under the **Users** section and select **Group**.
    

![Expanded More dropdown menu for State with Group option highlighted](https://cdn.qwiklabs.com/qYIFUML28%2FsAaT4rCESXzDRAD26EbuZBgUnyOZjTMTQ%3D align="left")

5. In the **Group By State** dialog, set the **Add group name** to `Pacific Northwest`.
    
6. Click the `is any value` input box and add **Oregon**, **Idaho** and **Washington** to the list independently.
    
7. Check the **Group remaining values** checkbox then click **Save**.
    

![Group By State dialog box](https://cdn.qwiklabs.com/8eG8VGUi229E5m4yAnjwjFhSJo%2F3ozBkY7k3ZcSnkhQ%3D align="left")

8. Select the newly create `State Groups` custom field to add it to the Explore and click **Run** in the top right of the page.
    

The result will be a view of the average cost of various product names grouped by `Pacific Northwest` and `Other`.

### **Task 3. Adding a filter to a custom measure**

Now that you have a view of the average cost of various product names grouped by `Pacific Northwest` and `Other`, say you wanted to only view products with an average cost greater than $200 (USD).

To enhance the current view do the following:

1. Under the **Custom Fields** section select the *Filter by field* icon for the bottom `Average of Cost` under **Measures**.
    

![Custom Fields section with Filter by field icon highlighted](https://cdn.qwiklabs.com/Vgbt1IiLqTWXVesvK7nIER2%2FHRcJCKA44zbVpDDQMH8%3D align="left")

2. Set the drop down to `is greater than` and set its value to **200**.
    
3. Re-run the query by clicking on the **Run** button in the top right of the page to view the results.
    

You will now see a filtered view with only the average of cost products greater than $200 (USD).

Click *Check my progress* to verify the objective.

Create a custom measure

**Check my progress**

### **Task 4. Using table calculations**

Say you wanted to understand the count of orders for each item in the view from the last section. To filter the view further you could add the **Order Count** and use the **Percentage of Column** quick calculation to get an idea of how popular a product is by the State Groups custom field created earlier in this lab.

1. Under **Order Items** section, click **Order Count** to add it to the view.
    
2. In the data view, click **Settings** () on the **Order Count** column.
    
3. Click **Calculations** &gt; **% of column**.
    

![Expanded settings dropdown menu with the % of column option highlighted in the Calculations submenu](https://cdn.qwiklabs.com/uXlTMiKd8xnFm7vQ1Gs9kKBRwfEe91C2GZJMGkhLUDw%3D align="left")

A new table calculation column with the percentage of Order Count should be populated into the Explore.

4. Click **Run** at the top right hand side of the page. This will re-run the previous query and the result will display the order item count and percentage of the table that each row represents in the resulting view. This will give an analyst insights into what product is popular by the State Grouping group created earlier.
    

Click *Check my progress* to verify the objective.

---

### Solution of Lab

%[https://www.youtube.com/watch?v=yitMGeEgUIs]