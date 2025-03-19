---
title: "Analyze and activate your data with Looker Enterprise (Solution)"
seoTitle: "Analyze and activate your data with Looker Enterprise (Solution)"
seoDescription: "This lab is part of a capstone project. In this lab, you will apply your knowledge of the last two stages of the data journey, analyze and activate, by buil"
datePublished: Wed Mar 19 2025 06:21:16 GMT+0000 (Coordinated Universal Time)
cuid: cm8fjar8s000s08lkg9in4gr0
slug: analyze-and-activate-your-data-with-looker-enterprise-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742363021273/793f09df-4eb0-4323-a000-dca2d81e986f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1742365257627/e1f8df93-b102-4396-8d24-f5d7e605296f.png
tags: analyze-and-activate-your-data-with-looker-enterprise-solution, analyze-and-activate-your-data-with-looker-enterprise

---

**IMPORTANT:**

* Take screenshots of your work for each task to add to your portfolio.
    
* Make sure to complete this hands-on lab on a desktop/laptop only.
    
* There are only 5 attempts permitted per lab.
    
* As a reminder – it is common to not get every question correct on your first try, and even to need to redo a task; this is part of the learning process.
    
* Once a lab is started, the timer cannot be paused. After 1 hour and 30 minutes, the lab will end and you’ll need to start again.
    
* For more information review the **Lab technical tips** reading.
    

## **Activity overview**

This lab is part of a capstone project. In this lab, you will apply your knowledge of the last two stages of the data journey, analyze and activate, by building an interactive dashboard that meets a business need using the Looker Enterprise user interface. You will be given a scenario and a set of tasks to complete. These tasks will require you to use your skills to build a dashboard with four visualizations, answer questions, and complete challenges that will test your data analysis and visualization skills.

By successfully completing this lab, you will have a user-friendly dashboard that you can add to your portfolio to showcase your skills to potential employers and gain additional experience using an enterprise-grade tool to meet challenges similar to those you encounter as a cloud data analyst.

## **Scenario**

Trevor, the head of the Treasury department at The Look Fintech, is impressed with your work so far. Your ability to collect data from different sources and process it provides them with valuable insights for their business.

Now, Trevor has another task for you: develop a dashboard to help the team make the most of their loan health data and have quick and user-friendly access to the insights they need.

Trevor has identified four key business questions that the team regularly needs answers to when discussing loan health.

These questions are:

* What is the total outstanding amount of all loans?
    
* What is the percentage of outstanding loans in each status category?
    
* What states have the highest number of outstanding loans?
    
* What customers own their homes outright and have current loans?
    

Trevor also provided important information about the key metrics needed to answer these business questions.

The **total balance of outstanding loans** is the sum of all loan balances that have not been fully repaid. Lenders track this amount to understand their overall risk and financial health. In some jurisdictions, lenders are also required to collect this information to comply with regulations.

The **loan status** is an important attribute to track. The loan status identifies if the loan payments are current, late, charged off, in default, fully paid off or in a grace period. Trevor explained that to mitigate risk, it is important to track what percentage of outstanding loans fall into each category.

The **borrower location** is also a key consideration. The Treasury department is seeking to understand how loans are distributed geographically by state. This is because high concentrations of loans in one region can increase the risk of collective defaults. An even distribution of loans across regions can help to reduce this risk by ensuring that lenders are not overly reliant on any one area for their loan repayments.

The **homeowner income index** is a way to track the financial health of the borrowers using their income and home ownership status. This can help Trevor influence other teams to tailor their financial offering to the borrowers' needs as well as help make sure that they are meeting their goals of making borrowing accessible to a wide range of people.

The dashboard you create will have four visualizations that focus on these elements and help Trevor’s team get answers to their business questions.

**First**, you’ll get started with Looker and create a dashboard. **Second**, you’ll build a visualization that shows the total amount of all outstanding loans in a guided way. **Third**, you’ll build a visualization that displays the total amount of all outstanding loans by status. **Then**, you’ll challenge yourself to build a visualization to display the top 10 states with the highest total count of outstanding loans and a table that displays customers that own their home outright and have “Current” loans. **Finally**, you’ll customize your dashboard by enabling cross-filtering and setting the refresh rate for each Look.

## **Setup**

### Before you click Start Lab

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This practical lab lets you do the activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended)
    
* Time to complete the lab---remember, once you start, you cannot pause a lab
    

### How to start your lab and sign in to Looker

1. Click the **Start Lab** button. On the left is the **Lab Details** panel with the following:
    
    * Time remaining
        
    * The **Open Looker** button
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
    
    ***Note:*** *If you need to pay for the lab, a pop-up opens for you to select your payment method.*
    
2. Click **Open Looker**.
    

*Tip:* Arrange the tabs in separate windows, side-by-side.

3. Copy the **Looker username (email)** and **password** below and paste it into the **Looker Log in** dialog.
    

Looker username (email):

```apache
 looker-developer@qwiklabs.net
```

Looker password:

```apache
 YyzQk8yhmFv01Oo37BLSHrLjW4Iparf49u9KUFmqPck=
```

You can also find the **Looker username (email)** and **password** in the **Lab Details** panel.

4. Select the **Stay logged in** checkbox, and click **Log In**.
    

After a successful login, the Looker instance for this lab will display.

## **Task 1. Get started with Looker**

In this task, you'll locate the Developer Student’s folder and create a new dashboard.

1. In the navigation panel, click the dropdown arrow next to **Folders**.
    
2. Click **My folder** to open the Developer Student’s folder. This is your personal folder where you can save and manage your dashboard.
    
3. Click **New**, and select **Dashboard** from the dropdown.
    
4. In the **Create Dashboard** dialog, for **Name** enter **Loan Insights**.
    
5. Click **Create Dashboard**. A new, empty dashboard with the name **Loan Insights** is created.
    
6. Click **Edit Dashboard** to start adding charts and visualizations to the new dashboard.
    

***Note:*** *In Looker Enterprise, tiles are used to display data in a variety of ways, such as tables, charts, and maps. To add a new visualization to the dashboard click* ***Add Tile****.*

Click **Check my progress** to verify that you have completed this task correctly.

Get started with Looker

Check my progress

## **Task 2. Build a visualization that displays the total amount of all outstanding loans**

Trevor has requested a visualization for their key team members that displays the total outstanding loan balance. An outstanding loan is any loan that has not been fully repaid. They have also requested that you make it easy for a team member to check if the total balance of outstanding loans goes above the $3,000,000,000 threshold. This is the amount the team has decided is the most that they can lend responsibly.

In this task, you’ll build a visualization that displays the total amount of all outstanding loans, and add a threshold indicator.

**First**, you’ll explore the data to determine which dimensions and or measures you’ll need to build the visualization.

1. Click **Add Tile**. The **Choose an Explore** page displays.
    
2. Click **Loan Details** to select the **Loan Details Explore**. The **Edit Tile** page displays.
    
3. In the **All Fields** tab, expand the **Loan** dropdown to explore the available Dimensions and Measures.
    

***Hint:*** *Use the Information icon to explore the data type and description of each dimension and measure.*

4. Click **Go to LookML** to review the Loan view. This will open a second window.
    
5. Click the dropdown arrow next to **Views** and click the **loan.view** file.
    

What is the relationship between the loan.view file and dimensions and measures? Select all that apply.The loan.view file is defined in LookML code which specifies the dataset to use and the dimensions and measures to include.The loan.view file defines all the dimensions and measures for an entire dataset.The loan.view file defines the dimensions and measures available for analysis in the loan view.The loan.view file only defines dimensions, not measures.

Submit

6. Return to the previous window. The **Edit Tile** page is displayed.
    

Based on your exploration, which dimensions and/or measures from the Loan view would you use to visualize total outstanding loan balance?Outstanding Loans Amount measureLoan Amount dimensionLoan Amount and Term dimensionCount measure

Submit

Which visualization type is the best choice for visualizing the total amount of outstanding loans?A tableA single value visualizationA bar chartA map

Submit

**Next**, you’ll use your observations to create the visualization.

7. In the **All Fields** tab, expand the **Loan** dropdown to select the dimensions and/or measure you chose above.
    
8. Select the **Visualization Type** icon to select the best visualization type.
    

***Hint:*** *Expand the visualization toolbar to select the Visualization Type.*

9. Click **Run** to display the visualization.
    

**Then**, review the visualization and explore the results used to create the visualization in the **Data** section.

How many rows of data have been returned?3,750,000,000121500

Submit

What is the underlying SQL query used to obtain the data used in the visualization?

| Query A | Query B |
| --- | --- |
| SELECT COALESCE(SUM(CASE WHEN ([loan.loan](http://loan.loan)\_status &lt;&gt; 'Fully Paid' OR [loan.loan](http://loan.loan)\_status IS NULL) THEN [loan.loan](http://loan.loan)\_amount ELSE NULL END), 0) AS loan\_outstanding\_loans\_amount FROM [`cloud-training-demos.fintech.loan`](http://cloud-training-demos.fintech.loan) AS loan LIMIT 500; | SELECT COUNT([loan.loan](http://loan.loan)\_amount) AS total\_outstanding\_balances FROM [`cloud-training-demos.fintech.loan`](http://cloud-training-demos.fintech.loan) AS loan LIMIT 500; |

Query A

Query B

Submit

What does this query do?Calculate the total loan amount of both repaid and unpaid loansCount the total number of loans with outstanding balancesCalculate the total balance of outstanding loansCalculate the average outstanding balance

Submit

**Finally**, add a threshold to the visualization and save the completed visualization to the dashboard.

10. In the Visualization bar, click **Edit**.
    
11. In the **Edit** dropdown menu, select the **Formatting** tab.
    
12. Slide the **Enable Conditional Formatting** toggle to enable conditional formatting.
    
13. In the **Rules** section, add a rule to change the background color to red if the value is greater than 3,000,000,000.
    
14. Click **Run**.
    
15. In the **Title** bar under **Edit Tile**, enter the following title for the visualization: **Total Amount of Outstanding Loans**.
    
16. Click **Save** to save the visualization.
    
17. The dashboard with the new tile displays. Click **Save** to change the changes made to the dashboard.
    

Click **Check my progress** to verify that you have completed this task correctly.

Build a visualization that displays the total amount of all outstanding loans

Check my progress

## **Task 3. Build a visualization that displays the percentage of outstanding loans in each status**

Trevor has also asked you to create a visualization that can help their team identify the percentage of outstanding loans in each status. This metric is important because it provides insight into the overall health of the company's loan portfolio including how many loans may be currently late, in default, or charged off.

In this task, you’ll identify the dimension and measure that you’ll use to visualize the data, select the most suitable visualization type, and then create and add the visualization to the dashboard on your own.

1. Click the **Dashboard actions** menu icon (
    
    ![More icon](https://cdn.qwiklabs.com/2ufrDePg5inKfodUoT2Kib4oE7II7emYn%2BypCC85FjQ%3D align="left")
    
    ) and select **Edit dashboard**.
    
2. Click **Add Tile**, and select **Visualization**.
    
3. Click **Loan Details** to select the **Loan Details Explore**.
    
4. In the **All Fields** tab, expand the **Loan** dropdown to explore the Dimensions and Measures.
    

You will need one dimension and one measure to build this visualization. What dimension and measures would you use to visualize the data?Count and Loan StatusLoan Amount and Outstanding Loans AmountOutstanding Loans Amount and Loan StatusLoan Amount and Loan Status

Submit

Trevor has explained it is important for their team to easily see how each loan status contributes to the total, or the part-to-whole relationship.

Which visualization type do you think is the best choice?A single value visualizationA mapA scatter plotA pie chart

Submit

### Challenge: Build a visualization and save it to a dashboard

In this challenge, you’ll build a visualization using the dimension and measure identified above and save it to the dashboard:

* The visualization should use one dimension and one measure.
    
* The visualization should be the same visualization type as identified in the multiple choice question above.
    
* The visualization should have the title: **Percentage of Outstanding Loans**.
    
* The visualization should be saved to your dashboard.
    

***Hint:*** *Feeling struck? Review the instructions for Task 2!*

Click **Check my progress** to verify that you have completed this task correctly.

Build a visualization that displays the percentage of outstanding loans in each status

Check my progress

## **Task 4. Build a visualization that displays the total count of outstanding loans for each state**

Trevor has requested a new visualization that displays the total count of outstanding loans for each state, limited to the 10 states with the highest total counts. This will help Trevor’s team quickly identify states where the team might need to focus their efforts, provide insight into the distribution of loans by geographical area, and help assess risk.

In this task, you’ll first need to identify the one dimension and one measure that you will use to visualize the data. Then, you’ll select the visualization type, create the visualization, and add it to the dashboard on your own.

What dimension and measures would you use to visualize the data?Outstanding Count and StateCount and StateLoan Amount and Outstanding Loans AmountOutstanding Loans Amount and State

Submit

### Challenge: Select dimensions and measures and choose visualization type

In this challenge, you’ll build a visualization and save it to the dashboard:

* The visualization should use one dimension and one measure.
    
* The visualization type should display comparisons between categories in a user-friendly way.
    
* The visualization should have the title: **Total Count of Outstanding Loans**.
    
* Limit the results to the 10 states with the highest total count of outstanding loans.
    
* The visualization should be saved to your dashboard.
    

Click **Check my progress** to verify that you have completed this task correctly.

Build a visualization that displays the total count of outstanding loans for each state

Check my progress

## **Task 5. Build a visualization that displays top 10 customers by highest income**

Trevor has requested a visualization that displays information about the top 10 customers with the highest individual income. This visualization should only include customers who own their own homes outright and also have current loans. In addition, for each customer, Trevor has asked that the visualization displays the customer’s ID, their annual income, the state where the loan was taken out, and the loan’s interest rate.

In this task, you’ll identify the dimensions and measures that you will use to visualize the data and select the most appropriate visualization type. Then, you’ll create the visualization and add it to the dashboard on your own.

### Challenge: Use multiple dimensions to visualize data

In this challenge, you’ll build a visualization and save it to the dashboard.

* The visualization should use four dimensions and no measures.
    
* The visualization should include dimensions from both the Loan and Customer views.
    
* The visualization should display customers that own their own homes outright and also have current loans.
    
* The visualization should only display the data for the top 10 customers with the highest individual income.
    
* The visualization type should allow the data to be easily sorted.
    
* The visualization should have the title: **Top 10 Customers by Highest Income**.
    
* The visualization should be saved to your dashboard.
    

Click here for hint!

Click **Check my progress** to verify that you have completed this task correctly.

Build a visualization that displays top 10 customers by highest income

Check my progress

## **Task 6. Add functionality to the dashboard**

In addition to the visualizations, Trevor has also requested that the team’s dashboard has certain features that will allow their team to make the most of the data. Trevor requested that their team is able to cross-filter data. Cross-filtering allows users to click on a value in a visualization and **dynamically filter** the rest of the tiles on the dashboard for that selected value. They have also requested that each visualization refreshes at a regular interval.

In this task, you need to edit the loan status dashboard to **enable cross-filtering** and add a refresh rate to each visualization.

1. Make sure all the changes you have made to the dashboard have been saved.
    
2. Navigate to the **Looker** home page.
    
3. In the navigation panel, navigate to the Developer Student’s folder.
    
4. Click on the **Loan Insight** dashboard.
    
5. Click the **Dashboard actions** menu icon () and select **Edit dashboard**.
    
6. Click the **Filters** button in the toolbar. In the Filters dropdown menu, slide the Cross-filtering toggle to enable cross-filtering.
    
7. Click **Save**.
    
8. Once enabled, click on values in the visualizations in the dashboard, and explore how the rest of the tiles are dynamically filtered.
    

### Challenge: Enable automatic refreshes to visualizations to add real-time visibility

In this challenge, you’ll apply what you learned above about adding functionality to enable automatic refreshes to each visualization on your own.

* The **Total Amount of Outstanding Loans** should refresh hourly.
    
* The **Top 10 Customers by Highest Income** and **Percentage of Outstanding Loans** should refresh daily.
    

Why would you set individual refresh rates for each visualization in a dashboard?Data that does not change frequently can be refreshed less often without compromising the visualizations’ usefulness.All of these optionsData that changes often requires more frequent updates.Refreshing data only as often as needed can minimize unnecessary data usage and optimize performance.

Submit

Click **Check my progress** to verify that you have completed this task correctly.

Add functionality to the dashboard

Check my progress

## **Task 7. Optimize dashboard**

In this task, you’ll use the skills you learned to optimize the dashboard for your users.

Here are some things that you may want to consider:

* Choose a color scheme.
    
* Arrange the visualizations to create an easy-to-use layout.
    
* Make sure all your visualizations are clearly labeled.
    
* Make the dashboard one that your users will love!
    

Before moving on, don’t forget to take a screenshot of your completed dashboard for your portfolio.

## **Task 8. Share dashboard**

In this task, you’ll practice sharing your completed dashboard.

1. Click the **Dashboard actions** menu icon (
    
    ![More icon](https://cdn.qwiklabs.com/2ufrDePg5inKfodUoT2Kib4oE7II7emYn%2BypCC85FjQ%3D align="left")
    
    ).
    
2. Click **Get Link**.
    
3. Click **Copy to Clipboard**.
    
4. Click **Done**.
    

The link you have copied can be shared with Trevor so they can view the dashboard you have created.

## **Conclusion**

As a cloud data analyst at TheLook Fintech, you’ve successfully built the dashboard Trevor and their team need to monitor the status of loans.

First, you created a visualization to display the total amount of outstanding loans.

Second, you created a visualization to display the total amount of outstanding loans by status.

Third, you created a visualization to display the top 10 states with the highest total count of outstanding loans.

Fourth, you created a visualization that displays customers who own their home outright and have “Current” loans.

Finally, you enabled cross-filtering on the loan status dashboard to make it easier for the users to interact with the data and understand how one measure relates to others and explored how to enable automatic refreshes to visualization on your own.

You are well on your way to understanding how to use Looker to build dashboards that help businesses monitor and track key performance indicators.

---

## Solution of Lab

%[https://youtu.be/Mw7IYav0iao] 

---

### Task 2 🚀

* **Visualization Type:** `Single Value`
    
* **Visualization bar, click Edit:** Formatting
    
* **Click:** Enable Conditional Formatting
    
* **Rules:** greater than `3000000000`
    
* **Style BG** `Red`
    
* **Create Dashboard:** `Loan Insights`
    
* **Title Name:** `Total Amount of Outstanding Loans`
    

---

### Task 3 🚀

* **Visualization Type:** `pie`
    
* **Title Name:** `Percentage of Outstanding Loans`
    

---

### Task 4 🚀

* **Visualization Type:** `bar`
    
* **Row Limit:** `10`
    
* **Title Name:** `Total Count of Outstanding Loans`
    

---

### Task 5 🚀

* **Visualization Type:** `table`
    
* **Row Limit:** 10.
    
* **Annual Income type:** `Descending order` ⬇️
    
* **Title Name:** `Top 10 Customers by Highest Income`
    

---

### Task 6 🚀

* **Total Amount of Outstanding Loans** `should refresh hourly`
    
* **Percentage of Outstanding Loans** `should refresh daily`
    
* **Top 10 Customers by Highest Income** `should refresh daily`
    

**Congratulations, you're all done with the lab 😄**