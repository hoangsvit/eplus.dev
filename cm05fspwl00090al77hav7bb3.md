---
title: "Validate Data in Google Sheets - GSP1062"
seoDescription: "For this lab you read through a fictitious business scenario. By completing the various lab activities, you assist the characters with their Google Sheets u"
datePublished: Thu Aug 22 2024 15:27:55 GMT+0000 (Coordinated Universal Time)
cuid: cm05fspwl00090al77hav7bb3
slug: validate-data-in-google-sheets-gsp1062
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724337137126/9b1c47ad-19ed-4ef6-a2a2-5c23c2810d3f.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724340463772/d6df64cd-132c-4b90-a2eb-0936c7dbcb01.jpeg

---

## **Overview**

For this lab you read through a fictitious business scenario. By completing the various lab activities, you assist the characters with their Google Sheets usage.

![on-the-rise-bakery-logo.png](https://cdn.qwiklabs.com/q2nxrc1oe4x4%2BfVg2SPckauG5eJ%2BC5jLyBOjlli9r5U%3D align="left")

Thomas Omar and Seroja Malone started On the Rise Bakery as a small family business to share their love of international flavors and nostalgic baked goods. They expanded from New York City to across North America and now have bakeries around the world. As the company has grown, they have hired staff to help oversee daily operations for multiple locations.

Google Sheets has several built-in tools that help you validate the data in your spreadsheet.

In this lab, you use a spreadsheet to format the text and numbers printed on price labels used for bakery items. You also learn to remove duplicate data and create data validation rules to help On the Rise Bakery send customer marketing emails.

### Objectives

You learn how to perform the following tasks:

* Sort and filter data.
    
* Format numbers and text.
    
* Clean data using functions.
    
* Create data validation rules.
    

### Prerequisites

If you're new to Google Sheets, the following courses are recommended: [Google Sheets](https://www.cloudskillsboost.google/course_templates/196), [Google Sheets - Advanced Topics](https://www.cloudskillsboost.google/course_templates/293).

You may also find it helpful to complete the following lab: Google Sheets: [Getting Started](https://www.cloudskillsboost.google/focuses/5828?parent=catalog).

## **Setup and requirements**

### Before you click Start Lab

Read these instructions. **Labs are timed and you cannot pause them.** The timer starts when you click **Start Lab** and shows how long Google Workspace resources are available to you.

This Google Workspace hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Workspace for the duration of the lab.

### What you need

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    
* Time. Note the time at the top of the left panel, which is an estimate of how long it should take to complete all steps. Plan your schedule so you have time to complete the lab. Once you start the lab, you will not be able to pause and return later (you begin at step 1 every time you start a lab).
    
* You do NOT need a Google Workspace account. An account is provided to you as part of this lab.
    

Open an Incognito window to run this lab.

When your lab prompts you to log into the console, **use only the student account provided to you by the lab**. This allows the activity tracking to verify that you have completed the lab activities.

### Start your lab

When you are ready, click **Start Lab** in the upper left panel.

### Find your lab's User Email and Password

To access the resources and console for this lab, locate the **User Email** and **Password** in the left panel. These are the credentials you use to log in to Google Drive.

If your lab requires other resource identifiers or connection-related information, these will also appear on this panel.

### Sign in to Google Sheets

1. Click **Open Google Sheets**
    

***Tip:*** Open the tabs in separate windows, side-by-side.

2. Notice the User Email field has been pre-filled. Click **Next**.
    
3. Enter the **Password** and click **Next**.
    
4. Accept all terms and conditions as prompted.
    

Google Sheets opens and you are signed in to your Student Google Account.

## **Task 1. Sort data**

In this task, you open a Google Sheets file and organize the data using sorting.

### Copy a spreadsheet

1. In the left panel of the lab instructions, right-click **Open Google Sheets**, and then click **Open link in incognito window** to sign into your student account.
    
2. Right-click [On The Rise Bakery Customers and Items](https://docs.google.com/spreadsheets/d/1Sj8mfklFylWM5XX_c50896UJu36gvJ6tG36Cwlg2_M8/edit?usp=sharing), and then click **Open link in incognito window** to open the spreadsheet.
    
3. Click **File** &gt; **Make a copy**.
    
4. Click **Make a copy** in the modal window to save the copy of the sheet in **My Drive**.
    

### Sort a range

When working with large datasets, it can be helpful to sort data to gain fast access to the necessary cells. Google Sheets lets users sort data in alphabetical or numerical order. You can sort an entire sheet by a column or you can sort a range of cells.

1. In the lower-left of your spreadsheet, click the sheet labeled **Items** to view the data specific to items from On the Rise Bakery.
    

![Items Sheet in](https://cdn.qwiklabs.com/GRez%2BTfJtE9pCtVMy0P7WyKWt6KCO7HIVMNQaS4beRI%3D align="left")

2. To freeze the first row, at the top, click **View &gt; Freeze &gt; 1 row**.
    
    Freezing the top row ensures that the header does not change when you sort the records.
    
3. To sort by **Number of Items** in ascending order, right-click the heading for column C, and then click **Sort sheet A to Z**.
    

**Note:** You can also sort by applying a filter to the data range and then sorting on any column. In task two, you learn more about filtering.

### Use the SORT function

The SORT function can arrange rows in a spreadsheet based on the values in one or more of its columns. When using the SORT formula, you must provide the following parameters:

* range: The data to be sorted.
    
* sort\_column: The range of the values to sort by.
    
* is\_ascending: The direction to sort the sort\_column in; TRUE sorts in ascending order, and FALSE sorts in descending order.
    

1. In the lower-left of your spreadsheet, click **Add Sheet** (+) to add another sheet.
    
2. Right-click the new sheet name, click **Rename**, and type **Items Sorted By Unit Price**
    
3. In cell A1 of the new sheet, type or paste **\=SORT(Items!A1:Items!C15, Items!B1:Items!B15, FALSE)**
    
    In this formula, the range is A1:C15 from the Items sheet and the sort column is column B, which contains the unit price of each column. The word FALSE indicates that the data should be sorted in descending order.
    

The SORT function also lets you sort data by multiple columns. To use this function, append the values for sort\_column and is\_ascending to the end of the formula for each additional column to sort by. See the [Help Center](https://support.google.com/docs/answer/3093150) for more information.

**Note:** Only use the SORT function when the sorted output will not require updates, because changing cells after the data has been sorted causes a #REF! error.

Click **Check my progress** to verify the objective.

Sort data

**Check my progress**

## **Task 2. Filter data**

The bakery is out of stock of cinnamon, so it wants to exclude cinnamon buns from the spreadsheet without deleting the affected rows. Filtering data can help with analyzing a subset of the data in your spreadsheet. In this task, you create a filter and a filter view to help On The Rise Bakery update its spreadsheet.

**Note:** Creating a *filter* changes the data shown for everyone who can view the spreadsheet. A *filter view* creates a private view in a spreadsheet that lets you filter and sort without disrupting your collaborators or changing the underlying data.

### Create a filter

1. Return to the **Items** sheet.
    
2. Select column A, and then at the top, click **Data &gt; Create a filter**.
    
3. Click the filter icon () that appears in cell A1 to display filter options.
    
4. Point to or click the following items in the menu to explore your options:
    
    * Filter by color
        
    * Filter by condition
        
    * Filter by values
        
5. To filter out cinnamon buns, under **Filter by values**, clear the checkmark next to **Cinnamon bun**, and then click **OK**.
    

Click **Check my progress** to verify the objective.

Create a filter

**Check my progress**

6. To remove the filter, at the top, click **Data &gt; Remove filter**.
    

### Create a filter view

1. Select cell A1.
    
2. At the top, click **Data &gt; + Create a filter view**.
    
3. To filter out cinnamon buns, select the filter icon in cell A1, and then follow the previous process.
    
4. To save the filter view, click **Data &gt; View options &gt; Save view &gt; Save**.
    

Be sure to select the cell(s) before creating the filter view.

Click **Check my progress** to verify the objective.

Create a filter view

**Check my progress**

5. To delete the filter view, at the top, click **Data &gt; View options &gt; Delete all views in tab**.
    

## **Task 3. Format data**

Functions in Google Sheets are used to manipulate text and perform calculations. On The Rise Bakery must create price labels for its shelves, and it uses data in a Google Sheets spreadsheet. In this task, you use functions to format data and get labels ready for printing.

### Truncate numbers

1. In cell E1, type **Truncated Unit Prices**
    
    The unit price displayed for *10 donut holes* shows five values after the decimal point, while other items only show four. You can use the truncate function to limit the decimal places shown.
    
2. In cell E2, type or paste **\=TRUNC(B2, 4)**
    
3. Click the small blue box in the lower-right corner of the cell, and then drag your cursor down to apply the formula to the remaining cells in the column.
    

### Format currency

1. To calculate the total cost of each menu item, in cell D2, type or paste **\=B2\*C2**
    
    This formula multiplies the unit price by the number of items.
    
2. To round the total cost to two decimal points, change the formula in cell D2 to **\=ROUND(B2\*C2, 2)**
    
3. Apply the formula to the remaining cells in column D.
    
4. To format numbers as currency, click the gray column label for column D to select the column, and then at the top, click **Format &gt; Number &gt; Currency**.
    
    Currency formatting options in Google Sheets can also be used to adjust the number of values shown after the decimal point and add a currency symbol. Similarly, the decrease decimal places option () in the toolbar lets you reduce the number of decimal places shown without changing the underlying data in the cell.
    

When entering the formulas in this exercise, you may have seen the option to autofill the remaining rows in the column. To learn more, see [Automatically create a series or list](https://support.google.com/docs/answer/75509).

### Format text

On the Rise Bakery must also properly capitalize product descriptions for the catering menu.

1. To insert a new column, right-click the column B label, and then click **Insert 1 column left**.
    
2. In cell B1, type **Formatted Name**
    
3. To capitalize the first letter of each word in the name of each food item, in cell B2, type or paste **\=PROPER(A2)**
    
4. Apply this function to the remaining cells in column B.
    

Click **Check my progress** to verify the objective.

Format numbers and text

**Check my progress**

## **Task 4. Validate data**

On The Rise Bakery must ensure the customer mailing list only contains valid email addresses. In this task, you create a data validation rule to verify that all entries have the proper formatting for email addresses.

### Use a function to validate data

1. On the sheet labeled **Customers**, click cell D2 and, at the top, click **Insert &gt; Function &gt; Info &gt; ISEMAIL**.
    
2. In the parentheses in the formula, type **C2**, so the formula reads **\=ISEMAIL(C2)**
    
3. Apply the formula to the remaining rows in the column.
    

### Use a rule to validate data

1. Select cells D2:D100 and, at the top, click **Data &gt; Data validation &gt; + Add rule**.
    
    This opens a sidebar with options for data validation rules. The **Cell range** field should be prepopulated with **Customers!D2:D100**.
    
2. Select **Text contains** from the dropdown next to **Criteria**.
    

**Note**: You can also use a data validation rule to check if the text in a cell is a valid email address or url.

3. Type **True** in input box and then click **Done**.
    

Your completed validation rule should look like this:

![completed-data-validation-rule](https://cdn.qwiklabs.com/BKf3T2PL6sAXM1M%2BfNLsTa0GI9MApuN%2FQTyEo24GPn8%3D align="left")

Data validation rules in Google Sheets allow you to constrain the values that can be entered into a worksheet cell. You can define one or more data validation rules for your worksheet. Typically, you define a separate data validation rule for each column in your worksheet where you need to constrain user entered values.

### Test your understanding

Which cell is flagged by the data validation rule? (Select two)D52D4D74D99D33

**Submit**

Click **Check my progress** to verify the objective.

Validate data using the function and correct rule

**Check my progress**

4. (Optional) Experiment with **ISDATE** or **ISNUMBER** using a data validation rule. Use column E for sample data, and validate the data in column F.
    

## **Task 5. Clean Data**

In this task, you help On the Rise Bakery clean data by removing duplicate rows and eliminating duplicates.

### Highlight duplicates

On The Rise Bakery also wants to know whether a single email address is associated with more than one customer.

1. At the top, click **Format &gt; Conditional formatting**. This opens a sidebar with options for conditional format rules.
    
2. For **Apply to range**, type **C1:C100**
    
3. Under **Format rules**, for **Format cells if**, select **Custom formula is**.
    
4. For **Value or formula**, type or paste **\=COUNTIF(C:C,C1)&gt;1**
    
    Cells, rows, or columns can be formatted to change text or background color if they meet certain conditions. This formula checks if an email address is found more than once within the column.
    
5. For **Fill color** (), select red.
    
6. Click **Done**.
    

### Trim whitespaces

On The Rise Bakery wants to address each of its customers by their first names in emails.

1. In cell G1, type **Personalized Greeting**
    
2. In cell G2, type or paste **\=CONCATENATE("Hello ", A2, ",")**, and then apply this formula to the remaining cells in the column.
    
    The *CONCATENATE* function lets you combine strings of text. In this case, the formula combines the word "Hello" with the customer's name and a comma. However, cell G2 appears different from the other cells in the column.
    
3. To trim whitespaces, update the formula in cell G2 to **\=CONCATENATE("Hello ", TRIM(A2),",")**
    
    The trim function removes leading, trailing, and repeated spaces in text. Using *TRIM* and *CONCATENATE* together ensures the Personalized Greeting will be properly formatted.
    

### Remove duplicates

1. Select columns C, and at the top, click **Data &gt; Data cleanup &gt; Remove duplicates**.
    
2. Click on **Expand to A:D**.
    
3. In the **Remove duplicates** dialog, select **Data has header row**, and under **Column to analyze**, select **Select all**.
    
4. Click **Remove duplicates**.
    
5. Notice the number of duplicate rows removed, and then click **OK** or **X** to close the dialog.
    

**Note**: You may have noticed some *Cleanup Suggestions* or *Column Stats* while completing this task. Check out [Use Sheets Smart Cleanup to prepare your data for analysis](https://support.google.com/docs/answer/10098582) to learn more.

Click **Check my progress** to verify the objective.

Clean Data

---

## Solution of Lab

%[https://www.youtube.com/watch?v=wxCLm9jOe-0] 

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">This laboratory may <strong>not be completed</strong> so do it by hand in the video to be graded.</div>
</div>

<mark>Download file:</mark> [Copy of On The Rise Bakery Customers and Items.xlsx](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP1062/Copy%20of%20On%20The%20Rise%20Bakery%20Customers%20and%20Items.xlsx)

The support file is the steps of **Task 1** and **Task 2** (Create a filter)

Continue to follow the instructions of the lab from the **Create a Filter View**

or Download file: [Copy of On The Rise Bakery Customers and Items (Task 2).xlsx](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP1062/Copy%20of%20On%20The%20Rise%20Bakery%20Customers%20and%20Items%20(Task%202).xlsx) (import)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724338915156/4740f919-611e-4ab8-b398-7eeec543a5f6.png align="center")

---

Manual

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724338189304/7958c0cb-fab0-40a0-bbfd-859397b458ad.png align="center")

1. Select cell A1.
    
2. At the top, click **Data &gt; + Create a filter view**.
    
3. To filter out cinnamon buns, select the filter icon in cell A1, and then follow the previous process.
    
4. To save the filter view, click **Data &gt; View options &gt; Save view &gt; Save**.
    

Be sure to select the cell(s) before creating the filter view.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724338503917/002453e4-ee60-4f7c-9d85-455d286b6570.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724338565095/75c2b2cb-6d72-408b-acb3-e6cd1ea801b9.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724338548775/87d1d358-7a9f-4e1b-8ed4-c484481c1ca3.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724338607814/4411352b-9db5-4ca6-94b5-638347f2452a.png align="center")

5. To delete the filter view, at the top, click **Data &gt; View options &gt; Delete all views in tab**.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724338662192/ea395954-ec15-437f-aee8-22cd9e4e89ed.png align="center")

---

Task 6:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724809645367/dbe40a3b-b063-4b7f-80c8-bcffad16816f.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724809649287/08e97e5c-1209-4f2f-a117-3ad54276cf77.png align="center")

Download file: [quicklab1062.xlsx](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP1062/quicklab1062.xlsx) (final lab)