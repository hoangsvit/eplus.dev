---
title: "Finding Data in Google Sheets - GSP1063"
seoTitle: "Finding Data in Google Sheets - GSP1063"
seoDescription: "For this lab you read through a fictitious business scenario. By completing the various lab activities, you assist the characters with their Google Sheets u"
datePublished: Wed Aug 28 2024 06:18:39 GMT+0000 (Coordinated Universal Time)
cuid: cm0dgtgzd000508mchvzralsz
slug: finding-data-in-google-sheets-gsp1063
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724824082769/fcb4c2fe-f1d1-4f3b-8c6d-974e99e769a6.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724825900101/82969e5e-187d-48dc-aef3-7ea7ea1bdd36.jpeg

---

## **Overview**

For this lab you read through a fictitious business scenario. By completing the various lab activities, you assist the characters with their Google Sheets usage.

![on-the-rise-bakery-logo.png](https://cdn.qwiklabs.com/l5NZNX3b3wTJgHTRfHBAsa5v7yVNL7%2Bh1dKdRo678iw%3D align="left")

Thomas Omar and Seroja Malone started On the Rise Bakery as a small family business to share their love of international flavors and nostalgic baked goods. They expanded from New York City to across North America and now have bakeries around the world. As the company has grown, they have hired staff to help oversee daily operations for multiple locations.

In this lab, you search a Google Sheet to help On the Rise Bakery communicate changes to delivery dates to its customers.

### **Prerequisites**

If you’re new to Google Sheets, the following courses are recommended: [Google Sheets](https://www.cloudskillsboost.google/course_templates/196), [Google Sheets - Advanced Topics](https://www.cloudskillsboost.google/course_templates/293).

You may also find it helpful to complete the following lab: [Google Sheets: Getting Started](https://www.cloudskillsboost.google/focuses/5828?parent=catalog).

### **Objectives**

* Manipulate data in Google Sheets using the SPLIT and TRANSPOSE functions.
    
* Use the find and replace feature and the SUBSTITUTE function.
    
* Use VLOOKUP and modify a QUERY statement.
    
* Debug common Google Sheets function errors using IFERROR.
    

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

### Find Your Lab's User Email and Password

To access the resources and console for this lab, locate the **User Email** and **Password** in the left panel. These are the credentials you use to log in to Google Drive.

### Sign in to Google Drive

1. Click **Open Google Drive**.
    

***Tip:*** Open the tabs in separate windows, side-by-side.

2. Notice the **Email or phone** field has been pre-filled with the User Email. Click **Next**.
    
3. Enter the **Password** and click **Next**.
    
4. Accept all terms and conditions as prompted.
    

Google Drive opens and you are signed in to the Student Google Account.

## **Task 1. Manipulate data**

In this task, you use the SPLIT and TRANSPOSE functions to help On the Rise Bakery update its spreadsheet so it's easily understood.

### Use the SPLIT function

1. To use the spreadsheet for this lab, go to [Google Drive](https://drive.google.com/), and then double-click to open the **On the Rise Bakery Bulk Orders** file that has been created for you.
    
2. In cell B1 of the **Bulk Orders** sheet, paste or type **\=SPLIT(A1, ",")**
    
    The **Bulk Orders** sheet contains orders from customers as comma-separated values. Using the SPLIT function divides text around a specified character or string and puts each fragment into a separate cell in the row.
    
3. To apply formula to the rest of the column, select cell B1, and then double-click the small blue box in the lower-right corner of the cell.
    
    Alternatively, you can click the small blue box in the cell, and then drag your cursor down.
    
4. Right-click the column A label, and then click **Hide column**.
    
    You can also split clearly defined data, like text separated by commas, into several columns without using the *SPLIT* function. At the top, click **Data &gt; Split text to columns**.
    
5. To adjust the size of the column, hold your pointer over the dividing line between the column D label and column E label until a blue line appears, and then double-click.
    
    You can resize a column or row to ensure the full text is visible.
    

### Use the TRANSPOSE function

1. At the bottom of the spreadsheet, click the sheet labeled **New Order** to view the record for a single customer.
    
    Notice that the data is arranged in a column, rather than a row.
    
2. In cell A8, paste or type **\=TRANSPOSE(A1:A7)**  
    The TRANSPOSE function reorganizes data so the positions of rows and columns are swapped.
    
3. Copy cells A8:G8.
    
4. Return to the **Bulk Orders** sheet, click on cell B101, and then paste the data.
    
    After you paste the data, a clipboard () should appear.
    
5. Click the dropdown next to the clipboard, and select **Paste values only**.
    
    Paste values only pastes the data shown in the cells, not the underlying functions, or cell references.
    

Click *Check my progress* to verify the objective.

Upload a spreadsheet and manipulate data.

**Check my progress**

## **Task 2. Find and replace data**

In this task, you help the staff update its records using both the find and replace feature and the SUBSTITUTE function.

### Use the find and replace feature

On the Rise Bakery staff members are adding new muffin flavors to the menu. All existing orders are for blueberry muffins. Help the staff update the **Bulk Orders** sheet to specify the muffin flavor.

1. To open the search box, press Control+F on your keyboard (or Command+F if you're using a Mac computer).
    

**Note:** You can also use shortcuts for spreadsheets made by other companies in Google Sheets. At the top, click **Help &gt; Keyboard shortcuts &gt; Enable compatible spreadsheet shortcuts.**

2. Click **More options** (
    
    ![more-icon.png](https://cdn.qwiklabs.com/6fCnVqpTezjP0%2FGn%2FOs9w2Qk2SZkl7Ttq%2BOylHTZJnc%3D align="left")
    
    ).
    
3. For **Find**, type **Muffin**, and for **Replace with**, type **Blueberry Muffin**.
    
4. For **Search**, select **This sheet**, click **Replace all**, and then click **Done**.
    

The find and replace feature is distinct from the [FIND](https://support.google.com/docs/answer/3094126) and [SEARCH](https://support.google.com/docs/answer/3094154) functions, which provide the position at which a string is first found within text.

### Use the SUBSTITUTE function

On the Rise Bakery is closing early on the November 6th due to a bank holiday. All orders scheduled for that date must be rescheduled to the seventh.

1. In cell I1, paste or type **Adjusted Delivery Date**
    
2. In cell I2, paste or type **\=SUBSTITUTE(F2,"Nov-6","Nov-7")**
    
    The **SUBSTITUTE** function searches for the specified text, which is in cell F2. If an exact match for **Nov-6** is found, the date changes to **Nov-7**. If a match is not found, the value of the corresponding cell from column F is displayed.
    
3. Apply the formula to the remaining cells in column I.
    

Click *Check my progress* to verify the objective.

Find and replace data.

**Check my progress**

## **Task 3. Retrieve data using VLOOKUP and QUERY**

The bakery staff must search the sheet to answer customer inquiries and complete other business functions. In this task, you use the VLOOKUP and QUERY functions to retrieve data in the spreadsheet.

### VLOOKUP

A customer called On the Rise Bakery to confirm the expected delivery date. VLOOKUP can be used to search for related information in a row.

1. In cell J2, paste or type **Georgia Nkosi**
    
2. In cell K2, paste or type **\=VLOOKUP(J2, G2:I100, 3, False)**
    
    The VLOOKUP function requires three parameters: the key to search by, the range to search, and the column number of the information being searched. The fourth, and optional parameter,
    

The column number is relative to the range provided. **Adjusted Delivery Date** is designated as the third column in the formula because the range used with VLOOKUP starts at column G.

**Note:** In this task, you use VLOOKUP to retrieve data in a sheet. Google Sheets also supports functions like HLOOKUP and XLOOOKUP. To learn more, see [LOOKUP](https://support.google.com/docs/answer/3256570).

### QUERY

On the Rise Bakery wants to email a discount code for a future purchase to all customers who spent at least $500. In this task, you get a list of email addresses.

1. In the lower-left of your spreadsheet, click **Add Sheet** (+) to add another sheet.
    
2. Right-click the new sheet name, click Rename, and type **Discount**
    
3. In cell A1 of the **Discount** sheet, paste or type `=QUERY('Bulk Orders'!$B$2:$I$100, "select H where E > 500")`
    
    The QUERY function uses the Google Visualization API Query Language and requires both a range and the search criteria.
    
    When referencing data contained in a different sheet, include the name of the source sheet, followed by an exclamation mark. If a sheet name contains spaces or other non-alphanumeric symbols, include single quotes around it (as shown in the provided query statement).
    
4. (Optional) Modify the query statement to only retrieve email addresses if the customer spent more than $750.
    

Click *Check my progress* to verify the objective.

Use VLOOKUP and QUERY.

**Check my progress**

## **Task 4. Use VLOOKUP with IF and ISERROR**

You used VLOOKUP to successfully retrieve information about an order in task three. In this task, you explore what you can do when you search for data with VLOOKUP and the record is not found.

### Debug errors in Sheets

1. In cell J3 of the **Bulk Orders** sheet, type the name **Alexander Jorgenson**
    
2. In cell K3, paste or type **\=VLOOKUP(J3, B2:I100)**
    
    The text in the cell should show #N/A and a red error flag should appear in the upper-right corner of the cell.
    
3. Hold your pointer over the red error flag to see the error message.
    
    The formula in cell K3 results in an error because it uses fewer arguments, or inputs, than required.
    
4. In cell K3, paste or type **\=VLOOKUP(J3, B2:I100, 8)**
    
    This updated formula includes three arguments, the last of which is the column number of the data that must be retrieved.
    
5. Hold your pointer over the red error flag again.
    
    An updated error message should appear.
    

Which of the following is the new error message?Did not find value Alexander Jorgenson in VLOOKUP evaluation.Alexander Jorgenson not found.Wrong number of arguments to VLOOKUP. Expected between 3 and 4 arguments, but got 2 arguments.#REF!

**Submit**

When you use functions and formulas in Sheets, many errors can occur. When you encounter an error, be sure to read the full message so you can understand the problem. You can also reference the [Google Sheets function list](https://support.google.com/docs/table/25273) for function usage instructions.

### Handle errors with IFERROR

1. In cell K4, paste or type **\=ISERROR(K3)**
    
    The **ISERROR** function checks whether the provided value is an error.
    
2. In cell K3, paste or type to **\=IFERROR(VLOOKUP(J3, B3:I100, 8), "Record not found")**
    
    Notice that the red error flag does not appear in the cell. Also, observe how the values of cells K3 and K4 have changed.
    

**IFERROR** evaluates whether the first argument is an error value. If it is not an error value, it returns that argument. Otherwise, **IFERROR** returns the second argument, so the text **"Record not found"** is displayed.

Click *Check my progress* to verify the objective.

Use IFERROR and ISERROR.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=Eqj1mlLsa7c] 

---

<mark>Download file:</mark> [GSP1063xlsx](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP1063/techcpsgsp1063.xlsx)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724826338713/43f4798e-12db-442e-8720-d7a1de75aaa8.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724825626663/9c58d681-152f-4b15-8532-2cf150501f17.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724825631424/6a2ff08e-7864-4005-b56c-3cfaeb847141.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724825671360/2a5c6260-3cad-4806-8bba-c72ffa1576d8.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724825729759/de77cee0-ad33-431e-873c-6c436a979beb.png align="center")

---

### Task 1. Manipulate data

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724824324657/6ddc5b90-b5f0-45a0-834d-f9a7194d7619.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724824387591/df548718-edec-4008-b266-26c4682d4e50.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724824579358/e1aaf5c3-cdee-4969-819d-f6e69b825c9a.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724824686706/01510fd1-675f-4793-953e-d897334e4f03.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724824797302/da825c32-3984-4384-8538-e4c157504dad.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724824841634/e442e902-637b-4099-a305-fd5812474bd4.png align="center")

### Task 2: Find and replace data

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724824962222/9f063e8d-e488-4d62-b4f1-bc25a40cec85.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724825061952/d761202f-3eeb-401d-8b78-dbd3aa0f8e00.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724825096780/b75097b2-aa36-4824-9731-903a28127ccc.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724825218404/5afc522d-e517-420a-8f83-f4c9e2d35660.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724825264978/f2a5fdf9-a5d7-4347-a5c9-ace9cdbeee86.png align="center")

### **Task 3. Retrieve data using VLOOKUP and QUERY**