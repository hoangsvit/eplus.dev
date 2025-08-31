---
title: "Use Google Forms with Google Sheets - GSP1064"
seoTitle: "Use Google Forms with Google Sheets - GSP1064"
seoDescription: "For this lab you read through a fictitious business scenario. By completing the various lab activities, you assist the characters with their Google Sheets u"
datePublished: Sun Sep 08 2024 06:23:12 GMT+0000 (Coordinated Universal Time)
cuid: cm0t6tp26001708mkfbnn8j9k
slug: use-google-forms-with-google-sheets-gsp1064
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747207889161/f7164ea7-234d-4c13-8086-968de19105d8.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747208091298/77ab86b7-b6a8-4f0e-bf7a-a2236b1c754f.png
tags: use-google-forms-with-google-sheets-gsp1064, gsp1064

---

## **Overview**

For this lab you read through a fictitious business scenario. By completing the various lab activities, you assist the characters with their Google Sheets usage.

![on-the-rise-bakery-logo.png](https://cdn.qwiklabs.com/l5NZNX3b3wTJgHTRfHBAsa5v7yVNL7%2Bh1dKdRo678iw%3D align="left")

Thomas Omar and Seroja Malone started On the Rise Bakery as a small family business to share their love of international flavors and nostalgic baked goods. They expanded from New York City to across North America and now have bakeries around the world. As the company has grown, they have hired staff to help oversee daily operations for multiple locations.

Google Forms lets you easily create and share online forms and surveys and analyze responses in real time.

In this lab, you learn how to create, edit, and share an online survey using Google Forms. You learn how to implement validation and conditional logic in surveys. You also use Google Sheets to analyze survey responses.

### Objectives

In this lab, you learn how to perform the following tasks:

* Create a Google Form.
    
* Use branching logic and response validation in a Google Form.
    
* Analyze data in Google Sheets using functions such as OR and COUNTIF.
    

### Prerequisites

If you're new to Google Sheets, the following courses are recommended: [Google Sheets](https://www.cloudskillsboost.google/course_templates/196), [Google Sheets - Advanced Topics](https://www.cloudskillsboost.google/course_templates/293).

You might also find it helpful to complete the following lab: [Google Sheets: Getting Started](https://www.cloudskillsboost.google/focuses/5828?parent=catalog).

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

## **Task 1. Create a survey using Google Forms**

On the Rise Bakery is expanding to a new city and wants to conduct market research. Help the staff to create a survey for prospective customers to share which foods they are interested in.

### Open Google Forms

1. To open Google Drive, click [drive.google.com](https://www.drive.google.com/).
    
2. In the left panel, click **\+ New**, and then click **Google Forms &gt; Blank form**.
    
    A new web page containing a blank Google Form should open.
    
3. To name the form, in the upper-left corner, click **Untitled form**, and type **On the Rise Bakery Survey**
    
    Notice the updated file name also appears on the form.
    
4. For **Form description**, type **The purpose of this survey is to gauge the pastries and other food items of interest to our potential customers.**
    

### Create survey questions

1. Click **Untitled Question**, and then type **First Name (required)**
    
2. Change the question type from the default to **Short answer**.
    
3. To create a second question, click **Duplicate** (
    
    ![content-copy](https://cdn.qwiklabs.com/dUgZuyYJfXorYq1weqp0C1PKq8a4H6c%2BPs0McCUcfFU%3D align="left")
    
    ).
    
4. Change the text to **Last Name (required)**.
    
5. Click **Add question** (
    
    ![add-circle](https://cdn.qwiklabs.com/jXJ0LFb7eRZoFRT9ilDJHwuQ%2B0y%2BhqDvIkwX4Anmt9M%3D align="left")
    
    ), and then create three additional questions with these parameters:
    

| **Question** | **Answer Format** |
| --- | --- |
| Email Address | Short Answer |
| What are your favorite items to buy at a bakery? (Choose up to three) | Checkboxes with these five options:MuffinDonutsDonut HolesPlain BagelBagel with Egg and Cheese |
| What time do you expect a bakery to open/close? | Short answer |

### Question Types

Google Forms supports several question types. You can:

* Type an answer using short answer or paragraph text
    
* Choose a response from a list using multiple choice, checkboxes, or dropdown options
    
* Upload files
    
* Choose from a grid
    
* Select a date and time
    

To learn more, check out [Choose a question for your form](https://support.google.com/docs/answer/7322334).

Click *Check my progress* to verify the objective.

Assessment Completed!

Create a Google Form.

**Check my progress**

*Assessment Completed!*

## **Task 2. Submit survey responses**

In this task, you submit sample entries to the Google Form to analyze in a later step.

### Review sharing options

1. Click **Send**.
    
    The checkbox lets you automatically collect the email address of a respondent if they are in your same domain.
    
    For **Send via**, there are three options:
    
    * **Email (**
        
        ![mail.png](https://cdn.qwiklabs.com/OBK%2BcnuVEdt6bkmKG6Sr7l88VkY9mPAvo5phtA%2B48ek%3D align="left")
        
        **):** This option lets you specify email addresses, a subject, and message text. It also lets you include the form in the email itself, instead of sending a link to the form.
        
    * **Hyperlink (**
        
        ![hyperlink-icon.png](https://cdn.qwiklabs.com/%2BZLPO2tyn41H7cxD%2BrkGBQNNsYHdTLb%2FClVAbXzcmQo%3D align="left")
        
        **):** This option provides a link to share. You can check the **Shorten URL** box to create a shorter link and click **Copy** to add the link to your clipboard.
        
    * **HTML code (**
        
        ![code-icon.png](https://cdn.qwiklabs.com/GD9Q0kBrYxOJBpGbJ11k0na1fn6qDmAuKnyau68kuOc%3D align="left")
        
        **):** This option provides code for embedding this Google Form into a web page.
        

**Note:** You can also share a form for others to edit. See [Share your form with collaborators](https://support.google.com/docs/answer/2917111).

2. To close this window, click **Cancel**.
    

### View and answer the survey

1. To view and respond to the survey in a new tab, click **Preview** (
    
    ![eye-icon.png](https://cdn.qwiklabs.com/htD5TrttLOrKtSvNmrTJX8b1zkZCTX9%2FnmJ6pSSH%2FDg%3D align="left")
    
    ).
    
2. Provide the following information:
    

| **Question** | **Response** |
| --- | --- |
| First Name | Chigo |
| Last Name | Williams |
| Email Address | cwilliams@mail.com |
| Favorite items | Bagel with Egg and Cheese |
| Preferred bakery hours | 5am-3pm |

3. Click **Submit**.
    
4. To provide a second sample, click **Submit another response**.
    
5. Repeat steps 2 and 3 with the following information:
    

| **Question** | **Response** |
| --- | --- |
| First Name | Lauren |
| Last Name | Rodriguez |
| Email Address | laurenr1980@mailcom |
| Favorite items | Donuts, Donut Holes |
| Preferred bakery hours | 6am |

6. To provide a third sample, click **Submit another response**.
    
7. Repeat steps 2 and 3 with the following information:
    

| **Question** | **Response** |
| --- | --- |
| First Name | Josephine |
| Last Name |  |
| Email Address | josieyu@mail.com |
| Favorite items | Donuts, Donut Holes, Plain Bagel, Muffin |
| Preferred bakery hours | 6am-12pm |

Notice that you can submit the surveys despite missing required data such as last name and selecting more than the limit of three bakery items.

8. When all the survey responses have been submitted, close this tab.
    

## **Task 3. Analyze survey data in Sheets**

In this task, you explore a few Google Sheets functions. To learn more about functions, visit the [Google Workspace Learning Center](https://support.google.com/a/users/answer/46977).

### Review survey responses

1. Return to the editor view of your form. If you've exited, visit [Google Forms](https://forms.google.com/) to reopen it.
    
2. In the top pane, click **Responses**.
    
    Your form should have three responses.
    
3. Click **Summary** for an overview of the survey responses in charts and tables.
    
4. Click **Question** to display the responses grouped by question.
    
5. Click the dropdown or arrows to display the responses to each question.
    
6. Click **Individual** to display the form submission for each respondent.
    
    When toggled off, the **Accepting responses** option closes the survey and prevents any future submissions. Leave this setting toggled on.
    

**Note:** You can insert charts from Google Forms into other Google Workspace products. See [Embed linked Google Forms charts into Google Docs, Google Slides, and Google Drawings](https://workspaceupdates.googleblog.com/2022/03/embed-linked-google-forms-charts-into.html).

### View responses in Sheets

1. On the **Responses** tab, in the upper-right, click **Link to Sheets** ().
    
2. In the **Select response destination** dialog, accept the default for **Create a new spreadsheet**, and click **Create**.
    
    A new spreadsheet with the filename **On the Rise Bakery Survey (Responses)** should open.
    
3. At the bottom of the spreadsheet, click the down arrow next to the **Form Responses 1** label, and then click **Duplicate**.
    

Click *Check my progress* to verify the objective.

Create a spreadsheet with survey responses.

**Check my progress**

### **Analyze responses using OR**

Follow this procedure in the duplicate sheet of your spreadsheet.

1. In cell G1, type **Missing Full Name?**
    
2. In cell G2, type or paste **\=OR(ISBLANK(B2), ISBLANK(C2))**
    
    This formula flags any rows that are missing a first name or last name.
    
3. Click cell G2, and then point to the small blue box in the lower-right corner of the cell until your cursor appears as a cross (**+**).
    
4. Drag your mouse down to the remaining rows in the column to apply the formula to those cells.
    

### Analyze responses using COUNTIF

1. In cell H1, type **Interest in Donuts**
    
2. In cell H2, type or paste **\=COUNTIF(E2,"\*Donuts\*")**
    
    This formula counts any cells in column E that contain the word Donuts.
    
3. Click cell H2, and then apply the formula to the remaining rows in the column.
    

Click *Check my progress* to verify the objective.

Analyze responses using OR and COUNTIF.

**Check my progress**

## **Task 4. Add response validation to a Google Form**

In the earlier section, you bypassed a rule intended to require respondents to provide a first and last name. The response validation feature can help enforce the guidelines that you want respondents to adhere to.

### Require responses to questions

When a question is required, a red asterisk appears next to the question. If you try to proceed without answering a required question, you’re prompted to provide a response.

1. Return to the **On the Rise Bakery Survey** in Google Forms.
    
2. In the text of the first question, delete **(Required)**, and then click the **Required** slider () to enable it.
    
3. In the text of the second question, delete **(Required)**, and then click the **Required** slider () to enable it.
    
4. In the top pane, click **Settings**.
    
5. Underneath **Question Defaults**, click the **Make questions required by default** slider () to enable it.
    

**Note:** This setting only applies to new questions and does not change the requirement for existing questions.

### Add email validation

1. In the top pane, click **Questions**.
    
2. Select the third question to show editing options for email.
    
3. To display additional options, click more (
    
    ![more-icon.png](https://cdn.qwiklabs.com/6fCnVqpTezjP0%2FGn%2FOs9w2Qk2SZkl7Ttq%2BOylHTZJnc%3D align="left")
    
    ), and then select **Response validation**.
    
4. In the first dropdown that appears, select **Text**.
    
5. In the second dropdown, select **Email**.
    

### Select "at most" validation

1. Select the fourth question to show more editing options.
    
2. Click more (
    
    ![more-icon.png](https://cdn.qwiklabs.com/6fCnVqpTezjP0%2FGn%2FOs9w2Qk2SZkl7Ttq%2BOylHTZJnc%3D align="left")
    
    ), and then select **Response validation**.
    
3. In the first dropdown that appears, select **Select at most**, and then for **Number**, type **3**
    

Click *Check my progress* to verify the objective.

Make questions required and use response validation.

**Check my progress**

## **Task 5. Show questions based on answers**

In this task, you set up branching in the Google Forms survey so that respondents only see certain sections based on their answers.

### Use more answer types

1. In the text of the fifth question, delete **/close**, so the question now reads **What time do you expect a bakery to open?**
    
2. From the dropdown of question types, select
    
    ![time](https://cdn.qwiklabs.com/KlH1HG7pvgyNBGmRTS5bP6VtraMJfFRhi9tHzH66Ga8%3D align="left")
    
    **Time**.
    
3. Click **Add question** (
    
    ![add-circle](https://cdn.qwiklabs.com/jXJ0LFb7eRZoFRT9ilDJHwuQ%2B0y%2BhqDvIkwX4Anmt9M%3D align="left")
    
    ), and add a sixth survey question: **What time do you expect a bakery to close?**
    
4. From the dropdown of question types, select **Dropdown**, and then type the following answer choices:
    
    * **11 AM**
        
    * **12 PM**
        
    * **1 PM**
        
    * **2 PM**
        
    * **3 PM**
        

### Create a new section

1. To create a new section of the form, click **Add section** ().
    
2. Change the section title to **Afternoon Treats**
    
3. Click **Add question** (), and add a new question: **What are your favorite items to buy at a bakery in the afternoon? (Choose up to three)**
    
4. From the dropdown of question types, select **Checkboxes**, and then type the following answer choices:
    
    * **Sandwich**
        
    * **Soup**
        
    * **Salad**
        
    * **Donuts**
        
    * **Plain Bagel**
        
5. Click more (), and then select **Response validation**.
    
6. In the first dropdown that appears, select **Select at most**, and then for **Number**, type **3**
    

**Note:** Google Forms supports rich text formatting which lets you add emphasis to your survey titles and descriptions. Visit the [Google Workspace Updates blog](https://workspaceupdates.googleblog.com/2022/06/rich-text-formatting-in-forms-editor%20.html) to learn more.

### Customize follow-up questions

1. For the sixth question in Section 1 of the survey, which reads **What time do you expect a bakery to close?**, click more (), and then select **Go to section based on answer**.
    
2. From the dropdown next to **11 AM**, select **Submit form**.
    
3. To view and respond to the survey in a new tab, click **Preview** ().
    
4. Answer the survey questions with responses of your choice, and for the bakery closing time, select **11 AM**.
    
5. Click **Next**, and then click **Submit**.
    
    Notice that you are not asked the question about afternoon snacks.
    
6. Click **Submit another response**.
    
7. Answer the survey questions in Section 1 with responses of your choice, and for the bakery closing time, select **12 PM** or later.
    
8. Click **Next**, and then answer the question in Section 2.
    
9. Click **Submit**.
    

Click *Check my progress* to verify the objective.

Show questions based on answers

**Check my progress**

### (Optional) Analyze data using IF and IFS

The *IF* function evaluates a logical expression. You can use *IF* to display a particular value when the expression is TRUE and another if it's FALSE. The *IFS* function evaluates multiple logical expressions.

1. To make a copy of the spreadsheet with sample survey responses, click [On the Rise Bakery Survey (Responses)](https://docs.google.com/spreadsheets/d/11xbRoKid80h-uzaCy6nOmxex9cRCBmSudDjD6lqXB0Y/edit?usp=sharing).
    
2. At the top, click **File &gt; Make a copy**, and then click **Make a copy** to save the copy of the sheet.
    
3. In cell I1, type **Respondents with the same morning and afternoon food preferences**
    
4. In cell I2, paste or type **\=IF(E2=H2,"I enjoy the same foods.")**
    
    This formula identifies the respondents who indicated the same food choices in the morning and afternoon.
    
5. Apply this formula to the rest of the rows in column I.
    
6. In cell J1, type **Opening Times**
    
7. In cell J2, paste or type **\=IFS(F2&lt;time(6,0,0), "Very Early Morning",F2&lt;time(8,0,0), "Early Morning",F2&lt;time(10,0,0), "Mid Morning")**
    
    This formula sorts the opening times provided in the survey into three categories:
    
    * For opening times before 6 AM, the text is *Very Early Morning*.
        
    * For times between 6 AM and 8 AM, the text is *Early Morning*.
        
    * For times between 8 AM and 10 AM, the text is *Mid Morning*.
        
8. Apply this formula to the remaining rows in the column.
    

---

## Solution of Lab

### Quick

%[https://youtu.be/hOLV4EAbiu0] 

---

* **NOTE: Watch the Full Video for Full Scores on Check My Progress.**
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756622852303/8d299dfb-6782-4e8c-84a2-a5b3b744040f.png align="center")

* Change **Form Name** to `On the Rise Bakery Survey`
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756622861096/5abb6c8d-bab3-4ce1-a10c-ae3c2576c89f.png align="center")

* **<mark>Download File</mark>** from [HERE](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP1064/On-the-rise-bakery-survey-responses.xlsx)
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756622954758/3c985286-c744-4815-8145-a8bf614ecb00.png align="center")

---

### Manual

%[https://www.youtube.com/watch?v=wOgPmnzzOdU] 

* **NOTE: Watch the Full Video to get Full Scores** [**on**](https://drive.google.com/drive/folders/13x1P8_XB1pPVZzLs2jGPnjpPYWDZFw-A?usp=sharing) **Check My Progress.**
    
* Change **Form Name** to `On` [`the`](https://drive.google.com/drive/folders/13x1P8_XB1pPVZzLs2jGPnjpPYWDZFw-A?usp=sharing) `Rise Bakery Survey`
    
* Download File from [HERE](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP1064/On%20the%20Rise%20Bakery%20Survey%20\(Responses\).xlsx)
    

---

**Task 1. Create a survey using Google Forms**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725776198981/fdc84465-675e-406b-8fa3-3207f801e044.png align="center")

---

Download file: [quicklab1064.xlsx](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP1064/quicklab1064.xlsx)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725776559740/c77b91cf-0330-4e0d-93f1-86fbca9ec024.png align="center")