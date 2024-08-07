---
title: "Understanding and Analyzing Your Costs with Google Cloud Billing Reports - GSP614"
seoTitle: "Understanding and Analyzing Your Costs with Google Cloud Billing Repor"
seoDescription: "Google Cloud cost management tools provide greater visibility, accountability, control, and intelligence so that you can scale your business in the cloud wi"
datePublished: Wed Aug 07 2024 02:34:53 GMT+0000 (Coordinated Universal Time)
cuid: clzj8ktm2000109l59z6d3tle
slug: understanding-and-analyzing-your-costs-with-google-cloud-billing-reports-gsp614
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1722997527895/b8a5936a-ac16-4e22-a27a-78f3d5305595.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1722998070459/6980c12a-e9e5-49ea-9fe0-5df424c31554.png
tags: understanding-and-analyzing-your-costs-with-google-cloud-billing-reports-gsp614, gsp614

---

## **Overview**

Google Cloud cost management tools provide greater visibility, accountability, control, and intelligence so that you can scale your business in the cloud with confidence. Tailored to meet the needs of organizations of all sizes, these tools help reduce complexity and increase the predictability of your cloud costs.

Google Cloud Billing reports is a cost management tool that provides built-in reporting within the console. In this lab, you familiarize yourself with Billing reports and understand how to answer fundamental cost management questions, such as:

In this lab, you learn about [Google Cloud Billing Reports](https://cloud.google.com/billing/docs/reports), a cost management tool that provides built-in reporting within the Google Cloud console.

## **Objectives**

In this lab you learn how to perform the following tasks:

* Explore Cloud Billing report charts in the Google Cloud console using a sample billing account.
    
* Analyze cost trends using report filters.
    
* Explore Cloud Billing cost drivers.
    
* Review a summary of costs.
    

### **Task 1. Access the sample Cloud Billing account**

In this task you access the sample billing report that is used in this lab.

* To open the billing report for a sample billing account, right click the following link and select **Open link in incognito window**:
    
    [Sample Billing Report](https://console.cloud.google.com/billing/01150A-B8F62B-47D999/reports?organizationId=433637338589).
    
    The link opens the Google Cloud console in the Billing Reports window. In the remainder of this lab you will explore the various features of billing.
    

**Note:** To access Google Cloud Billing in your own environment, you'll need one of the Cloud Billing roles outlined at [Overview of Cloud Billing access control](https://cloud.google.com/billing/docs/how-to/billing-access).

### **Task 2. Explore Cloud Billing report charts**

In this task you explore your Cloud Billing report chart to see how much you are spending. You have a variety of options available to customize your report views, including filters and other settings. Your report view changes depending on the filter selections you choose.

1. In the Cloud console, in the **Billing** menu, click **Reports**.
    
    This Reports page includes a chart that plots usage costs for all projects linked to a billing account.
    

**Note:** Because you are viewing a working project, the charts in this lab may differ from what you see in your Billing reports. By default, the chart shows current and forecasted costs by project for the current calendar month. Each color in the chart corresponds to a different project.

* In the top left, the actual cost to date is displayed for the current month, including a comparison to the cost over the same number of days in the preceding month.
    
    ![Total Cost](https://cdn.qwiklabs.com/QUXSgRZlSEocSN84X8zYpojoG4StfrhJUfrE4J9QcKc%3D align="left")
    
* In the top right, the forecasted total cost is displayed for the current month, including a comparison to the previous month.
    

![Forecasted Cost](https://cdn.qwiklabs.com/%2BLJDtBshMx2b2%2B9XwDZSEyEBTDUbwIwltdUa1s12nkw%3D align="left")

2. To visualize your daily costs grouped by project, hold the pointer over a specific day on one of the colors in the chart to compare the cost for that project to the total cost for the day.
    

![Daily Cost](https://cdn.qwiklabs.com/zJOi%2B0xZfJU8RY1Zw5WYaSQIZuoGOmyxv25UCXGUaBM%3D align="left")

* The cost trend line (the dotted line) is visible when your selected time period includes a date in the future.
    

![Total cost commparison](https://cdn.qwiklabs.com/R0H%2Bbk3MmkiH9JMXdzV2Y5wjamgqP%2F6UuFmJgSawPhw%3D align="left")

* The cost trend line indicates how much you're forecasted to spend in that time period.
    

It also reflects both the long term trend and any consistent monthly cycles. Learn more about trends at [Viewing your forecasted costs](https://cloud.google.com/billing/docs/how-to/reports#cost-forecast).

* Below the chart is a summary of the costs by project in the selected time period.
    

![Summary of the costs](https://cdn.qwiklabs.com/3JuRoiKtFNme0E2105ZTT5jKyNGOF9f1aoe%2F5ox6XsY%3D align="left")

**Filters and grouping**

Customize your view using the drop-downs for filtering and grouping.

#### **View your charges by invoice and without taxes or adjustments**

1. Click the expand icon
    
    ![Expand icon](https://cdn.qwiklabs.com/BfAzsuxl3xDHnOtDauj3CJJFb8%2FOGlE7%2FVrip8Q3aU8%3D align="left")
    
    in the upper right.
    

**Note:** If you don't see both the report and the **Filters** panel, widen your browser window.

![Filters panel](https://cdn.qwiklabs.com/qQoxX4vNniLm1GE0%2BszsrOQTottMOmcAQ4Epp94iIIw%3D align="left")

2. In the **Time range** section, select **Invoice month** and set your **From** and **To** month range.
    
3. View the chart. Notice the **Reports** page updates to match the invoice month and tax option you selected. The table below the chart displays the cost breakdown based on your filter selections.
    

![Reports page](https://cdn.qwiklabs.com/%2Fl3n3MWQJSmu7%2BetZO1%2BeDyZi8%2BYuBxWGQtyrt3t9lE%3D align="left")

![Costs by project](https://cdn.qwiklabs.com/%2Fl3n3MWQJSmu7%2BetZO1%2BeDyZi8%2BYuBxWGQtyrt3t9lE%3D align="left")

### **Task 3. Analyze your cost trends**

In this task you analyze your cost trends. You filter the view by time range, location, and credits to see how your costs have changed.

**View your cost trend over a specified time period**

1. In the **Filters** pane, for **Time range**, select **Usage date**.
    
2. Click **Custom range**, and then select **Last 30 days**.
    
    The chart shows the last 30 days of usage. As before, the top of the graph shows your costs compared to the previous time period so you can easily compare how your costs trend over time.
    

![Last 30 days usage](https://cdn.qwiklabs.com/Z4al5uHdY%2BezzmB4A0u0zA3ziOU%2F4xwfyYsVyG9fRz8%3D align="left")

**View your cost trend by location**

1. In the **Filters** pane, expand the **Locations** section.
    
2. Under **Geography**, click **Americas**.
    
    Notice how the specific Americas regions and multi-regions are selected and that the graph changes to reflect this.
    
3. Under **Region & multi-region**, click **europe-west1**.
    
    Notice that the **europe-west1** region is added to the graph.
    
4. Clear the **Geography** and **Region & multi-region** options previously selected, and then collapse the **Locations** group.
    

**View your cost trend by credits**

You can use credits filters to change the view of your cost calculations. You can select all applicable credits (default) to be included in the cost calculations, or you can clear some or all of the credit options to exclude credits from the cost calculations.

For more information about credits, see [View and analyze your credits](https://cloud.google.com/billing/docs/how-to/reports#credits).

**Sustained use discounts**

1. Expand the **Credits** section.
    

![Credits section](https://cdn.qwiklabs.com/A8e8ToeV3qrC%2BCdkMAkQhLmkmnKFySnS4FMplFFLt9c%3D align="left")

2. Clear the **Sustained use discounts** checkbox.
    

**Note:** In this lab, **Sustained use** is the only available discount. Because of this, the **Discounts** option is automatically cleared when you clear **Sustained use discount**. The chart is more flat when the automatically applied discounts are no longer reflected.

3. Select the **Sustained use discounts** checkbox to see how the chart changes.
    
4. Collapse the **Credits** section.
    

### **Task 4. Explore your cost drivers**

In this task you explore your billing reports to visualize and investigate any unexpected changes in cost.

**Find the unexpected cost increase**

1. Click **Reports**.
    
2. In the **Filters** pane, for **Time range**, select **Invoice month**.
    
3. To discover the cause of the large increase in cost, hold the pointer over the spike in the chart to identify the project.
    
    In this case the project causing the large cost increase is CTG-Dev.
    

![CTG-Dev large costs](https://cdn.qwiklabs.com/p%2BZJX4VVA9PQT%2FHy2jnsnmqJps7FcXsEHKh%2FOGmbhJA%3D align="left")

**Note:** Because your Reports view is a working project, your chart looks different from the chart in this section and has different spikes.

4. In the **Filters** pane, for **Projects**, click **CTG-Dev**.
    
5. In **Group by**, click **Service**.
    
6. To find out which service caused the increase in cost, hold the pointer over the spike in the graph.
    
    In this case it appears that BigQuery caused the increase in cost.
    
7. In the **Filters** pane, for **Group by**, click **SKU**.
    
    In this case, the BigQuery Analysis SKU was the highest cost on this day. This SKU is charged when executing queries using BigQuery.
    

### **Task 5. Review a summary of your costs**

In this task you review a summary of your costs. Billing reports show current cost trends and forecasted costs. The cost breakdown report shows what you would have spent at the on-demand price for your Google Cloud usage, and how your final invoice amount was affected by any credits, adjustments, and taxes.

* In the Cloud console, in the **Billing**
    
    ![Billing menu icon](https://cdn.qwiklabs.com/piJIZzlVjIf1xCB2nAAcnp0K6jDnMxB1thppGPJ2Tq8%3D align="left")
    
    menu, click **Cost breakdown**.
    

The graph shows your total costs for a specific invoice month and how credits and taxes affected the final amount invoiced for that month. For example, [sustained use discounts](https://cloud.google.com/compute/docs/sustained-use-discounts) automatically apply to Compute Engine resources that run a significant portion of the billing month, helping save you money. The sample chart below shows the total cost of usage minus the credits applied for sustained use discounts.

To learn more see, [Committed use discounts and sustained use discounts](https://www.youtube.com/watch?v=5runDINev1w).

![Invoice month bar chart](https://cdn.qwiklabs.com/Nyn%2FzqcUAWqd1tngnXa0AC6j%2BFmZwUpVdGbEeIF%2Fc24%3D align="left")

---

### Solution of Lab

Open link in incognito window [Sample Billing Report](https://console.cloud.google.com/billing/01150A-B8F62B-47D999/reports?organizationId=433637338589)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722997840125/7e38ac53-fc13-4644-96d9-58ab78c8c76a.png align="center")

Recheck [https://www.cloudskillsboost.google/games/5383](https://www.cloudskillsboost.google/games/5383)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722997914423/61212262-47bd-44ca-a887-ade9752ecb72.png align="center")