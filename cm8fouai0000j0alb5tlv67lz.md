---
title: "Visualizing Billing Data with Looker Studio - GSP622"
seoTitle: "Visualizing Billing Data with Looker Studio - GSP622"
seoDescription: "Looker Studio allows you to unlock the power of your data with interactive dashboards and beautiful reports that inspire smarter business decisions."
datePublished: Wed Mar 19 2025 08:56:25 GMT+0000 (Coordinated Universal Time)
cuid: cm8fouai0000j0alb5tlv67lz
slug: visualizing-billing-data-with-looker-studio-gsp622
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742374380397/d83611ac-9710-4414-b787-bf22f57332a5.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1742374569025/e886e4fe-620c-4927-aae6-7a5ecae4a6d0.png
tags: visualizing-billing-data-with-looker-studio-gsp622, visualizing-billing-data-with-looker-studio, gsp622

---

## **Overview**

[Looker Studio](https://lookerstudio.google.com/overview) allows you to unlock the power of your data with interactive dashboards and beautiful reports that inspire smarter business decisions.

With Looker Studio, you can:

* **Connect:** Easily access a wide variety of data. With built-in and partner connectors, you can connect to virtually any type of data stream.
    
* **Visualize:** Turn your data into compelling stories of data visualization art. You can quickly build dashboards with Looker Studio's web-based reporting tools.
    
* **Share:** Share your reports and dashboards with individuals, teams, or the world. Collaborate in real time. Embed your report on any page.
    

In this lab, you create data visualizations with Looker Studio. You first explore a sample Google Cloud bill and learn how to export the billing data to [BigQuery](https://cloud.google.com/bigquery/) — Google's serverless, highly scalable enterprise data warehouse that is designed to make data analysts more productive with unmatched price-performance.

After running a few SQL queries on your billing data, you export those metrics to Looker Studio, where you explore the service's chief features and build your own billing data visualizations.

### What you'll learn

In this lab, you learn how to:

* Use the billing service in the Google Cloud console to explore projects and their consumption of cloud computing resources.
    
* Export billing data to BigQuery.
    
* Explore your billing data in BigQuery.
    
* Run SQL queries to better understand a project's consumption of Google Cloud services.
    
* Export your queried data to Looker Studio.
    
* Explore Looker Studio tools and generate visualizations with your queried data.
    

Once you're ready, scroll down and follow the steps below to get your lab environment set up.

## **Setup and requirements**

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
    student-04-8b41ddec7cf1@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    nbGeElYRQlfA
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

## **Task 1. Explore the demo projects and their associated bills**

In this task you explore your billing data and identify the dataset you want to focus on. This lab provides sample data for you to use.

1. In the Google Cloud console, in the **Navigation menu** (), click **Billing**.
    
2. In the **Billing** window, click **Manage billing accounts**.
    
3. Click **GCP Cost Management Billing Demo**.
    
    The **Billing Account Overview** window opens.
    
4. In the **Billing account** pane, click **Manage billing account**.
    
    The Google Cloud projects associated with this billing account are listed:
    
    * CTG - Storage
        
    * CTG - Dev
        
    * CTG - Prod
        
    * CTG - Sandbox
        
    
    These four Google Cloud projects illustrate a common enterprise schema, where you have different projects for development, production, storage, and sandbox testing.
    
    **Note:** The billing data that you work with in this lab is associated with these four projects. The data is in the form of a CSV (spreadsheet) file.
    
5. In the Cloud console, in the **Navigation menu** (), click **Billing &gt; Overview**.
    
    This window provides an overview of the Billing Account.
    
6. Scroll down to explore the data and charts that track your billing account.
    
7. In the Cloud console, in the **Navigation menu** (), click **Billing &gt; Reports**.
    
    This window provides a report for your billing account. Notice the cost trends per project, when prices rise and fall, and the ability to filter the report.
    

## **Task 2. Export your data to BigQuery: Information only**

In this task you use BigQuery to easily query and filter large datasets, aggregate results, and perform complex operations to optimize data analysis. BigQuery is a fully managed data warehouse that runs on Google Cloud.

**Note:** This task is for demonstration purposes only. Follow along, but do not try to replicate these steps in your lab environment (they will not work.) You can go through these steps in your own Google Cloud projects at a later time if you want to ingest your billing data in BigQuery.

The billing data you explored in the previous section was exported to BigQuery when this lab was spun up. This section describes the process for information purposes only.

1. In the Google Cloud console, in the **Navigation menu** (), click **Billing &gt; Billing export**.
    
    The **Billing export** window opens with the **BigQuery Export** tab selected by default.
    
2. Click **Edit settings** to show the export options.
    
    **Note:** This option is disabled for you because you don't have permission to configure billing export.
    
3. Click **Projects**, and then select the project that contains your billing account.
    
4. Click **Billing export dataset**, and then set the BigQuery dataset where you want to host this data.
    
5. Click **Save**.
    
    This initiates a job where your billing data is saved as a table in the selected BigQuery dataset.
    

Note that a billing export takes some time to populate (a few hours to a day).

The billing data for this lab has already been exported to a table in BigQuery. Following BigQuery's `project.dataset.table` convention, the full path to the billing data is:

```sql
ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999
```

You use this path to query project data.

## **Task 3. Explore your billing data in BigQuery**

In this task you use an SQL query in BigQuery to see what information is available. The billing data was automatically exported into BigQuery when the lab was spun up.

1. In the Cloud console, in the **Navigation menu** (), click **BigQuery**.
    
2. Under **Select a recent project**, click the tile with your **Project ID**.
    
    **Note:** Your Project ID is in the left pane in your lab instructions.
    
3. In the **Welcome** dialog, click **Done**.
    
    The BigQuery console opens. The **Explorer** pane displays your project. Your project name is your **Project ID**.
    
4. In the **Query Editor**, type the following, and then click **Run**:
    

```sql
SELECT * FROM `ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999`
```

`SELECT *` returns all column values from a specified table.

You should see the resulting table in the **Query results** section.

#### **Check my progress**

Click **Check my progress** to verify your performed task. If you have successfully run a query to get all the column values from a table, you will receive an assessment score.

Explore your billing data in BigQuery.

Check my progress

### Answer the following questions

* Inspect the table (be sure to scroll left and right) and answer the following questions so you become more familiar with this data:
    

Approximately how many rows of data are there?10010001,00000010

Submit

Under the table in **Query results**, there are 1 million plus rows of data.

An account manager wants to know the BigQuery service usage on a certain date at a certain time for the CTG - Storage project. What column would have that information?usage.amountcost\_typesku.idinvoice.month

Submit

You found the answer to this question by looking at the BigQuery table created in your first SQL query. For more complicated questions, you would run more complicated SQL queries to analyze your data and gain valuable insights.

## **Task 4. Perform SQL queries in BigQuery and build data visualizations with Looker Studio**

In this task, you ask two questions, and use BigQuery to get that information. You then use Looker Studio to build reports with data visualizations to share those insights.

In the previous task you explored a sample billing account in BigQuery that has millions of rows of information. For this information to be useful you must be able to analyze the data to obtain specific information. In BigQuery, you run SQL queries to answer questions to obtain that specific information.

**Note:** The billing data provided in this lab is dynamic, so the number of logs and rows in the table will be different. Your query and console outputs may be different from the images in the lab instructions.

### Question 1: Which service types are most and least used?

You want to find which service types are most and least used, so you must determine:

* What types of services the four projects use
    
* Which service types are most and least used
    

For the answers, you run SQL queries on the billing data hosted in BigQuery.

#### **Query to identify service types**

1. In the **Query editor**, clear the current query.
    
2. In the **Query editor**, type the following, and then click **Run**:
    

```sql
SELECT service.description FROM `ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999` GROUP BY service.description
```

This query reveals which service is associated with each log.

The `service.description` column tells you what Google Cloud service is associated with each log. The `GROUP BY` keyword aggregates result-set rows that share common criteria (in this case the service description) and returns all of the unique entries found for such criteria.

In the **Query results** section, in the **Results** tab, you see that the four projects use 15 different types of Google Cloud services.

#### **Check my progress**

Click **Check my progress** to verify your performed task. If you have successfully run a query to get service.description column values, you will receive an assessment score.

Run the query to get service.description column values.

Check my progress

#### **Query to find which service types are most and least used**

1. In the **Query editor**, clear the current query.
    
2. In the **Query editor**, type the following, and then click **Run**:
    

```sql
SELECT service.description, COUNT(*) AS num FROM `ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999` GROUP BY service.description
```

This query determines which service types are most and least used.

The `COUNT(*)`function returns the number of rows that share the same criteria (in this case the service description).

BigQuery shows your results in the **Query results** section in a table with two columns: **description** and **num**. Compare the numbers in the **num** column to determine which service type was the most and least used.

#### **Check my progress**

Click **Check my progress** to verify your performed task. If you have successfully run a query to find out which services are used the most and least, you will receive an assessment score.

Run the query to find out which services are used the most and least.

Check my progress

### Visualize in Looker Studio

1. Open [Looker Studio](https://lookerstudio.google.com/) in a new tab.
    
2. Click **Create** &gt; **Explorer**.
    
3. Select **Country** and Enter **Company** name.
    
4. Agree to the **Terms of Service**, and then click **Continue**.
    
5. In email preferences, select **Yes to all** (this is connected to your temporary student email).
    
6. Click **Continue**.
    
7. In the **Add Data** pane, click **Create New Data**.
    
8. In the **Google Connectors** window, select **BigQuery**.
    
9. Click **Authorize**.
    
10. In **Recent Projects**, select **Custom Query**.
    
11. In **Billing Project**, select your **project ID**.
    
12. In the **Customer Query** pane, type the query you used previously:
    

```sql
SELECT service.description, COUNT(*) AS num FROM `ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999` GROUP BY service.description
```

13. Click **Connect**.
    
14. Click **Apply**.
    
15. Click **Untitled Explorer**, and rename this report as **Services Breakdown**.
    
16. In the **Setup** pane, in the **Metric** section, hold the pointer over **Record Count**, and click **X** to remove that metric.
    
17. Click **Add metric**, and select **num**.
    
    You may have to scroll down to see the **num** menu option.
    
18. Click **Add a Chart**, select the **Pie chart**.
    
    ![Pie Chart](https://cdn.qwiklabs.com/lQrEIt%2FPephBuK1tiXL1KoT%2BNelG%2Fc3SKIFfUE6FPtQ%3D align="left")
    
    Looker Studio generates a pie chart on the use of services.
    
19. Click **Save**.
    

Close the Looker Studio browser tab and return to the BigQuery console browser tab. You are now ready to answer the second question.

### Question 2: Which regions are most and least used?

To find which regions are most and least used across all four projects, you must determine:

* Which regions the Google Cloud services ran in
    
* Which regions are most and least used
    

#### **Query to determine which regions the Google Cloud services ran in**

1. In the **Query editor**, clear the current query.
    
2. In the **Query editor**, type the following, and then click **Run**:
    

```sql
SELECT location.region FROM `ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999` GROUP BY location.region
```

The results are a single **region** column that lists the regions the Google Cloud service ran in. A `null` region means the region is not known.

#### **Check my progress**

Click **Check my progress** to verify your performed task. If you have successfully run a query to get the regions that the Google Cloud service ran in, you will see an assessment score.

Run the query to get the region that the Google Cloud service ran in.

Check my progress

#### **Query to determine which regions are used the most and least**

1. In the **Query editor**, clear the current query.
    
2. In the **Query editor**, type the following, and then click **Run**:
    

```sql
SELECT location.region, COUNT(*) AS num FROM `ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999` GROUP BY location.region
```

Your results are two columns, **region** and **num**. Compare the results to determine which regions are most and least used.

#### **Check my progress**

Click **Check my progress** to verify your performed task. If you have successfully run the query to find out which regions are used the most and the least by a service, you will receive an assessment score.

Run the query to find out which regions are used the most and the least by a service.

Check my progress

### Create a Looker Studio visualization for regions

1. Open [Looker Studio](https://lookerstudio.google.com/) in a new tab.
    
2. Click **Create** &gt; **Explorer**.
    
3. In the **Add Data** pane, click **Create New Data**.
    
4. In the **Google Connectors** window, select **BigQuery**.
    
5. In **Recent Projects**, select **Custom Query**.
    
6. In **Billing Project**, select your **project ID**.
    
7. Type the query you used previously:
    

```sql
SELECT location.region, COUNT(*) AS num FROM `ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999` GROUP BY location.region
```

8. Click **Connect**.
    
9. Click **Apply**.
    
10. Click **Untitled Explorer**, and rename this report to **Regions Breakdown**.
    
11. In the **Setup** pane, in the **Metric** section, hold the pointer over **Record Count**, and click **X** to remove that metric.
    
12. Click **Add metric**, and select **num**.
    
13. Click **Add a Chart**, select the **Pie chart**.
    
    Looker Studio generates a pie chart on the use of services.
    
    You have successfully created two data visualizations from your billing data queries.
    
14. Click **SAVE** in the top-right corner to save your visualization.
    
15. Click **Looker Studio**
    
16. To see the visualizations you just created, click **Regions Breakdown**.
    

---

## Solution of Lab

%[https://youtu.be/DH6nLbywpEc] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Visualizing%20Billing%20Data%20with%20Looker%20Studio/quicklabgsp622.sh
sudo chmod +x quicklabgsp622.sh
./quicklabgsp622.sh
```