---
title: "Creating a Data Transformation Pipeline with Cloud Dataprep - GSP430"
seoTitle: "Creating a Data Transformation Pipeline with Cloud Dataprep - GSP430"
seoDescription: "Dataprep by Trifacta is an intelligent data service for visually exploring, cleaning, and preparing structured and unstructured data for analysis. In this l"
datePublished: Wed Aug 21 2024 03:06:03 GMT+0000 (Coordinated Universal Time)
cuid: cm039utg9000c09mhdxqd7wk8
slug: creating-a-data-transformation-pipeline-with-cloud-dataprep-gsp430
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724209246831/67888bec-5f43-4dee-b095-89e5ce7d0969.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724209550777/9a926996-d09e-4dde-b0cc-06bf0853143b.png

---

## **Overview**

[Dataprep by Trifacta](https://cloud.google.com/dataprep/) is an intelligent data service for visually exploring, cleaning, and preparing structured and unstructured data for analysis. In this lab, you explore the Dataprep user interface (UI) to build a data transformation pipeline that outputs results into BigQuery.

The dataset for this lab is an [ecommerce dataset](https://www.en.advertisercommunity.com/t5/Articles/Introducing-the-Google-Analytics-Sample-Dataset-for-BigQuery/ba-p/1676331#) that has millions of Google Analytics session records for the [Google Merchandise Store](https://shop.googlemerchandisestore.com/) loaded into BigQuery. In the lab, you explore the available fields and rows and prepare the data for analysis.

### What you'll do

In this lab, you learn how to perform these tasks:

* Connect BigQuery datasets to Dataprep
    
* Explore dataset quality with Dataprep
    
* Create a data transformation pipeline with Dataprep
    
* Run transformation jobs and send outputs to BigQuery
    

## **Setup and requirements**

**Note:** to run this lab, you will need to use Google Chrome. Other browsers are currently not supported by Dataprep.

It is recommended that you take the [Working with Cloud Dataprep on Google Cloud](https://google.qwiklabs.com/catalog_lab/365) lab before attempting this lab.

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab Details** panel with the following:
    
    * The **Open Google Cloud console** button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the **Sign in** page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-04-c53c39caeba6@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    bGDAuTj83DU3
    ```
    
    You can also find the **Password** in the **Lab Details** panel.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To view a menu with a list of Google Cloud products and services, click the **Navigation menu** at the top-left.

![Navigation menu icon](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

## **Task 1. Open Dataprep in the Google Cloud console**

1. Open **Cloud Shell** and run the following command:
    

```apache
gcloud beta services identity create --service=dataprep.googleapis.com
```

You should see a message saying the service identity was created.

2. In the Cloud console, go to the **Navigation menu**, and under **Analytics** select **Dataprep**.
    
3. To get into Dataprep, check that you agree to Google Dataprep Terms of Service, and then click **Accept**.
    
4. Click the checkbox and then click **Agree and Continue** when prompted to share account information with Alteryx.
    
5. Click **Allow** to give Alteryx access to your project.
    
6. Select your Qwiklabs credentials to sign in and click **Allow**.
    
7. Check the box and click **Accept** to agree to Alteryx Terms of Service.
    
8. If prompted to use the default location for the storage bucket, click **Continue**.
    

## **Task 2. Creating a BigQuery dataset**

Although this lab is largely focused on Cloud Dataprep, you need BigQuery as an endpoint for dataset ingestion to the pipeline and as a destination for the output when the pipeline is completed.

![Data flow pipeline](https://cdn.qwiklabs.com/O2n0exH9RUENSsK99EJIUKFgk%2BX8HlTC95mpNxwqZcM%3D align="left")

1. In the Cloud Console, select **Navigation menu** &gt; **BigQuery**.
    
2. The **Welcome to BigQuery in the Cloud Console** message box opens. This message box provides a link to the quickstart guide and lists UI updates.
    
3. Click **Done**.
    
4. In the **Explorer** pane, select your project name:
    

![Explorer pane](https://cdn.qwiklabs.com/rA3k8hwOv8d%2BtFoMB0d96eFRvUuEEhkW%2BXKTg3mC8WA%3D align="left")

5. In the left pane, under **Explorer** section, click on the **View actions** icon (
    
    ![View actions icon](https://cdn.qwiklabs.com/2ufrDePg5inKfodUoT2Kib4oE7II7emYn%2BypCC85FjQ%3D align="left")
    
    ) to the right of your project ID, then click **Create dataset**.
    

* For **Dataset ID**, type `ecommerce`.
    
* Leave the other values at their defaults.
    

6. Click **CREATE DATASET**. You will now see your dataset under your project in the left pane.
    
7. Copy and paste the following SQL query into the Query Editor:
    

```sql
#standardSQL
 CREATE OR REPLACE TABLE ecommerce.all_sessions_raw_dataprep
 OPTIONS(
   description="Raw data from analyst team to ingest into Cloud Dataprep"
 ) AS
 SELECT * FROM `data-to-insights.ecommerce.all_sessions_raw`
 WHERE date = '20170801'; # limiting to one day of data 56k rows for this lab
```

8. Click **RUN**. This query copies over a subset of the public raw ecommerce dataset (one day's worth of session data, or about 56 thousand records) into a new table named `all_sessions_raw_dataprep`, which has been added to your ecommerce dataset for you to explore and clean in Cloud Dataprep.
    
9. Confirm that the new table exists in your `ecommerce` dataset:
    

## **Task 3. Connecting BigQuery data to Cloud Dataprep**

In this task, you will connect Cloud Dataprep to your BigQuery data source. On the Cloud Dataprep page:

1. Click **Create a flow** in the right corner.
    
2. Rename the **Untitled Flow** and specify these details:
    

* For **Flow Name**, type `Ecommerce Analytics Pipeline`
    
* For **Flow Description**, type `Revenue reporting table`
    

3. Click **Ok**.
    
4. If prompted with a `What's a flow?` popup, select **Don't show me any helpers**.
    
5. Click the **Add Icon** in the Dataset box.
    

![Add icon highlighted](https://cdn.qwiklabs.com/k%2BTy2cx5xnl0DwdmQngGjEGU5ZU1mnb7vsm7PMkQJwE%3D align="left")

6. In the **Add Datasets to Flow** dialog box, select **Import Datasets**.
    
7. In the left pane, click **BigQuery**.
    
8. When your **ecommerce** dataset is loaded, click on it.
    

![ecommerce dataset highlighted](https://cdn.qwiklabs.com/A1PnS5h0nvcB11tTyzjMNvKuMXNxIUT42EIEYTJi1b0%3D align="left")

9. Click on the **Create dataset** icon (+ sign) on the left of the `all_sessions_raw_dataprep` table.
    
10. Click **Import & Add to Flow** in the bottom right corner.
    

The data source automatically updates. You are ready to go to the next task.

## **Task 4. Exploring ecommerce data fields with the UI**

In this task, you will load and explore a sample of the dataset within Cloud Dataprep.

* Click the **Recipe icon** and then select **Edit Recipe**.
    

![Recipe icon and Edit Recipe button highlighted](https://cdn.qwiklabs.com/G3PDFXsoKjxJQTIpLgT%2BLYEO742qE8OqE%2BR3q2PLPyM%3D align="left")

Cloud Dataprep loads a sample of your dataset into the Transformer view. This process might take a few seconds. You are now ready to start exploring the data!

Answer the following questions:

* How many columns are there in the dataset?
    

![Dataset](https://cdn.qwiklabs.com/7vmXj5JVvo2Mt7izyYOfhj9FbKcLRVLt3nHiLHzBGtY%3D align="left")

**Answer**: 32 columns.

* How many rows does the sample contain?
    

![Dataset](https://cdn.qwiklabs.com/6WjYgczvWvFywfhDdXtxvS4UeXIsKJqItdBWIAL0vdM%3D align="left")

**Answer**: About 12 thousand rows.

* What is the most common value in the `channelGrouping` column?
    

**Hint**: Find out by hovering your mouse cursor over the histogram under the `channelGrouping` column title.

![channelGrouping column](https://cdn.qwiklabs.com/ZqwIsyvjq2WfBNh1XlLmlht60PfwBnKK%2B8maGuBtOPI%3D align="left")

**Answer**: Referral. A [referring site](https://support.google.com/analytics/answer/1011811?hl=en) is typically any other website that has a link to your content. An example here is a different website reviewed a product on our ecommerce website and linked to it. This is considered a different acquisition channel than if the visitor came from a search engine.

**Note:** When looking for a specific column, click the **Find column** icon (

![Find column icon](https://cdn.qwiklabs.com/Ui5aE9D%2FnzHJzNjz1IX48nZPBtuIhbd8YNvv9JZ4r3M%3D align="left")

) in the top right corner, then start typing the column's name in the **Find column** textfield, then click on the column's name. This will automatically scroll the grid to bring the column on the screen.

* What are the top three countries from which sessions are originated?
    

![Country dataset](https://cdn.qwiklabs.com/AozLCVR6k2yuhGP6RBEmPJmASKtb3zSKh%2BYIzWO6t3U%3D align="left")

**Answer**: United States, India, United Kingdom

* What does the grey bar under **totalTransactionRevenue** represent?
    

![totalTransactionRevenue bar](https://cdn.qwiklabs.com/Na%2B8%2FJzA5c5J%2Bw23pE6qnA1Z5GyvMLih1MeZs8IQOXE%3D align="left")

**Answer**: Missing values for the `totalTransactionRevenue` field. This means that a lot of sessions in this sample did not generate revenue. Later, we will filter out these values so our final table only has customer transactions and associated revenue.

* What is the maximum `timeOnSite` in seconds, maximum `pageviews`, and maximum `sessionQualityDim` for the data sample? (Hint: Open the menu to the right of the `timeOnSite` column by clicking
    
    ![dropdown arrow](https://cdn.qwiklabs.com/4RIUGfHjcTkc3C8%2F8cuxxnFWjyVXCgyNf0afoBdidWM%3D align="left")
    
    the **Column Details** menu)
    

![timeOnSite and maximum pageviews datasets](https://cdn.qwiklabs.com/HX6AKSqxJL4U1oX5Xs7%2FjlBSq1YoCdtXuJv0HvLDFvc%3D align="left")

![timeOnSite Overview tabbed page](https://cdn.qwiklabs.com/Hp2p2%2FjlETLLD0Uz6Nurf8HhWCY3BhUlU4t7n357ymM%3D align="left")

To close the details window, click the **Close Column Details** (X) button in the top right corner. Then repeat the process to view details for the `pageviews` and `sessionQualityDim` columns.

![Close button](https://cdn.qwiklabs.com/pnBT9jpB%2F%2F1fF5UgnwKlR960bjuSjmPxRGU9oWTkT8o%3D align="left")

**Answers**:

* **Maximum Time On Site:** 5,561 seconds (or 92 minutes)
    
* **Maximum Pageviews:** 155 pages
    
* **Maximum Session Quality Dimension:** 97
    

**Note:** Your answers for maximums may vary slightly due to the data sample used by Cloud Dataprep.

**Note on averages**: Use extra caution when performing aggregations like averages over a column of data. We need to first ensure fields like `timeOnSite` are only counted once per session. We'll explore the uniqueness of visitor and session data in a later lab.

* Looking at the histogram for `sessionQualityDim`, are the data values evenly distributed?
    

![sessionQualityDim histogram](https://cdn.qwiklabs.com/%2BrVfeEfi6%2FzqkUWYRt7qoHSkydmPrXI1gW6s7JDePiQ%3D align="left")

**Answer**: No, they are skewed to lower values (low quality sessions), which is expected.

* What is the **date** range for the dataset? Hint: Look at **date** field
    

**Answer**: 8/1/2017 (one day of data)

* You might see a red bar under the `productSKU` column. If so, what might that mean?
    

![productSKU column](https://cdn.qwiklabs.com/eVIJPpwJeLxBZ4KPm1fEyqVhIZ4RvZ9egZiAfxG9KnM%3D align="left")

**Answer**: A red bar indicates mismatched values. While sampling data, Cloud Dataprep attempts to automatically identify the type of each column. If you do not see a red bar for the `productSKU` column, then this means that Cloud Dataprep correctly identified the type for the column (i.e. the String type). If you do see a red bar, then this means that Cloud Dataprep found enough number values in its sampling to determine (incorrectly) that the type should be Integer. Cloud Dataprep also detected some non-integer values and therefore flagged those values as mismatched. In fact, the `productSKU` is not always an integer (for example, a correct value might be "GGOEGOCD078399"). So in this case, Cloud Dataprep incorrectly identified the column type: it should be a string, not an integer. You will fix that later in this lab.

* Looking at the `v2ProductName` column, what are the most popular products?
    

![v2ProductName column](https://cdn.qwiklabs.com/8%2BjK8dAs1yOyjglL%2FSL7KKNJxUA%2BvLa6dTnEHd4Mnd8%3D align="left")

**Answer**: Nest products

* Looking at the `v2ProductCategory` column, what are some of the most popular product categories?
    

![v2ProductCategory column](https://cdn.qwiklabs.com/fC%2FFGE8m1w4h9Rlq3uke6W6M8Q6i8480z8hownoW%2BbM%3D align="left")

**Answers**:

The most popular product categories are:

* **Nest**
    
* **Bags**
    
* (**not set**) (which means that some sessions are not associated with a category)
    
* True or False? The most common `productVariant` is `COLOR`.
    

**Answer**: False. It's **(not set)** because most products do not have variants (80%+)

* What are the two values in the **type** column?
    

**Answer**: `PAGE` and `EVENT`

A user can have many different interaction types when browsing your website. Types include recording session data when viewing a PAGE or a special EVENT (like "clicking on a product") and other types. Multiple hit types can be triggered at the exact same time so you will often filter on type to avoid double counting. We'll explore this more in a later analytics lab.

* What is the maximum `productQuantity`?
    

**Answer**: 100 (your answer may vary)

`productQuantity` indicates how many units of that product were added to cart. 100 means 100 units of a single product was added.

* What is the dominant `currencyCode` for transactions?
    

**Answer**: **USD** (United States Dollar)

* Are there valid values for `itemQuantity` or `itemRevenue`?
    

**Answer**: No, they are all `NULL` (or missing) values.

**Note:** After exploration, in some datasets you may find duplicative or deprecated columns. We will be using `productQuantity` and `productRevenue` fields instead and dropping the `itemQuantity` and `itemRevenue` fields later in this lab to prevent confusion for our report users.

* What percentage of `transactionId` values are valid? What does this represent for our `ecommerce` dataset?
    

![transactionId Overview page](https://cdn.qwiklabs.com/GC2hSwg3Od5mn30oPVKO3ntObn4hz78nk5d40yvzw6E%3D align="left")

* Answer: About 4.6% of transaction IDs have a valid value, which represents the average conversion rate of the website (4.6% of visitors transact).
    
* How many `eCommerceAction_type` values are there, and what is the most common value?
    

**Hint:** Count the distinct number of histogram columns.

![eCommerceAction_type values](https://cdn.qwiklabs.com/xEi9Nhxr8C%2B%2FVpQ1UPlkEZwRE1onNpy1MzBv2dd%2BfVk%3D align="left")

**Answers**: There are seven values found in our sample. The most common value is zero `0` which indicates that the type is unknown. This makes sense as the majority of the web sessions on our website will not perform any ecommerce actions as they are just browsing.

* Using the [schema](https://support.google.com/analytics/answer/3437719?hl=en), what does `eCommerceAction_type = 6` represent?
    

**Hint:** Search for `eCommerceAction` type and read the description for the mapping

**Answer**: 6 maps to "Completed purchase". Later in this lab we will ingest this mapping as part of our data pipeline.

![commerceAction.action_type STRING](https://cdn.qwiklabs.com/mo%2BDN33yq0CAs0XYW23ziOq2ci1hF7EI3iz1WghQLuQ%3D align="left")

## **Task 5. Cleaning the data**

In this task, you will clean the data by deleting unused columns, eliminating duplicates, creating calculated fields, and filtering out unwanted rows.

### Converting the productSKU column data type

1. To ensure that the **productSKU** column type is a string data type, open the menu to the right of the **productSKU** column by clicking
    
    ![dropdown arrow](https://cdn.qwiklabs.com/4RIUGfHjcTkc3C8%2F8cuxxnFWjyVXCgyNf0afoBdidWM%3D align="left")
    
    , then click **Change type &gt; String**.
    

![productSKU > Change type > String](https://cdn.qwiklabs.com/h9XRQZfWpeWFemjzgS90OJIJyC68beZ0TXHPNun6nqM%3D align="left")

2. Verify that the first step in your data transformation pipeline was created by clicking on the **Recipe** icon:
    

![Recipe icon](https://cdn.qwiklabs.com/QqCACDwXBSL6Va99bq%2FsnytTzLgd3%2BuHbPqxbDsTr68%3D align="left")

**Note:** If you are seeing the receipe is Locked, select the receipe, click edit and uncheck the option to lock the column type.

### Deleting unused columns

As we mentioned earlier, we will be deleting the **itemQuantity** and **itemRevenue** columns as they only contain NULL values and are not useful for the purpose of this lab.

1. Open the menu for the **itemQuantity** column, and then click **Delete**.
    

![itemQuantity column with the Delete menu option highlighted](https://cdn.qwiklabs.com/D7Pv7GOsFWtLIVQK6TwOINOxqNTdx17IWNlhDO94XL0%3D align="left")

2. Repeat the process to delete the **itemRevenue** column.
    

### Deduplicating rows

Your team has informed you there may be duplicate session values included in the source dataset. Let's remove these with a new deduplicate step.

1. Click the **Filter rows** icon in the toolbar, then click **Remove duplicate rows**.
    

![Filter rows dropdown menu with the Remove duplicate option highlighted](https://cdn.qwiklabs.com/8M2UYHCAl7encUqMsXJih7FZbmK4TwaRzceV0LMVgaY%3D align="left")

2. Click **Add** in the right-hand panel.
    
3. Review the recipe that you created so far, it should resemble the following:
    

![Four-step recipe](https://cdn.qwiklabs.com/n%2FrJQzp7UnN%2B13Y1m6KaZoaWNx5q431mEfqZSV4apqs%3D align="left")

### Filtering out sessions without revenue

Your team has asked you to create a table of all user sessions that bought at least one item from the website. Filter out user sessions with NULL revenue.

1. Under the **totalTransactionRevenue** column, click the grey **Missing values** bar. All rows with a missing value for **totalTransactionRevenue** are now highlighted in red.
    
2. In the **Suggestions** panel, in **Delete rows** , click **Add**.
    

![Suggestions panel](https://cdn.qwiklabs.com/AtSqaRx%2Bungs9s7v9ZYAWfapqjbHItEto9kmzDb6oi0%3D align="left")

This step filters your dataset to only include transactions with revenue (where **totalTransactionRevenue** is not NULL).

### Filtering sessions for PAGE views

The dataset contains sessions of different types, for example **PAGE** (for page views) or **EVENT** (for triggered events like "viewed product categories" or "added to cart"). To avoid double counting session pageviews, add a filter to only include page view related hits.

1. In the histogram below the **type** column, click the bar for **PAGE**. All rows with the type **PAGE** are now highlighted in green.
    
2. In the **Suggestions** panel, in **Keep rows**, and click **Add**.
    

## **Task 6. Enriching the data**

Search your [schema documentation](https://support.google.com/analytics/answer/3437719?hl=en/) for **visitId** and read the description to determine if it is unique across all user sessions or just the user.

* `visitId`: an identifier for this session. This is part of the value usually stored as the `utmb` cookie. This is only unique to the user. For a completely unique ID, you should use a combination of fullVisitorId and visitId.
    

As we see, `visitId` is not unique across all users. We will need to create a unique identifier.

### Creating a new column for a unique session ID

As you discovered, the dataset has no single column for a unique visitor session. Create a unique ID for each session by concatenating the **fullVisitorId** and **visitId** fields.

1. Click on the **Merge columns** icon in the toolbar.
    

![Merge columns icon](https://cdn.qwiklabs.com/4p8pt0WP6h%2BMERLwCgIWDp%2B5WDIwN8XRyo45nbcw07w%3D align="left")

2. For **Columns**, select `fullVisitorId` and `visitId`.
    
3. For **Separator** type a single hyphen character: `-`.
    
4. For the **New column name**, type `unique_session_id`.
    

![Merge columns panel](https://cdn.qwiklabs.com/Xc1sUxfFNb48M%2FH1G61NgHc8kaSJidHOYyg0yv6WJeg%3D align="left")

5. Click **Add**.
    

The `unique_session_id` is now a combination of the `fullVisitorId` and `visitId`. We will explore in a later lab whether each row in this dataset is at the unique session level (one row per user session) or something even more granular.

### Creating a case statement for the ecommerce action type

As you saw earlier, values in the `eCommerceAction_type` column are integers that map to actual ecommerce actions performed in that session. For example, 3 = "Add to Cart" or 5 = "Check out". This mapping will not be immediately apparent to our end users so let's create a calculated field that brings in the value name.

1. Click on **Conditions** in the toolbar, then click **Case on single column**.
    

![Conditions dropdown menu with Case on single column option highlighted](https://cdn.qwiklabs.com/CuaxX3SVElvxsAij2wJThUdkT%2BB%2B2MemzepIijLrQzU%3D align="left")

2. For **Column to evaluate**, specify `eCommerceAction_type`.
    
3. Next to **Cases (1)**, click **Add** 8 times for a total of 9 cases.
    

![Conditions section](https://cdn.qwiklabs.com/mzgyn4an4E2T1qFfBiBxlRuf0qJpCkLRIOfBlbVpSX0%3D align="left")

4. For each **Case**, specify the following mapping values (including the single quote characters):
    

| **Comparison** | **New value** |
| --- | --- |
| `0` | `'Unknown'` |
| `1` | `'Click through of product lists'` |
| `2` | `'Product detail views'` |
| `3` | `'Add product(s) to cart'` |
| `4` | `'Remove product(s) from cart'` |
| `5` | `'Check out'` |
| `6` | `'Completed purchase'` |
| `7` | `'Refund of purchase'` |
| `8` | `'Checkout options'` |

![Condition panel with a preview of the evaluated column, eCommerceAction_type evaluated](https://cdn.qwiklabs.com/%2FqJ2lGNSkW2G7G6K%2FSUkIRqHrg28kLYruYht1%2FzvWMg%3D align="left")

5. For **New column name**, type `eCommerceAction_label`. Leave the other fields at their default values.
    
6. Click **Add**.
    

### Adjusting values in the totalTransactionRevenue column

As mentioned in the [schema](https://support.google.com/analytics/answer/3437719?hl=en), the **totalTransactionRevenue** column contains values passed to Analytics multiplied by 10^6 (e.g., 2.40 would be given as 2400000). You now divide the contents of that column by 10^6 to get the original values.

1. Open the menu to the right of the **totalTransactionRevenue** column by clicking
    
    ![dropdown arrow](https://cdn.qwiklabs.com/4RIUGfHjcTkc3C8%2F8cuxxnFWjyVXCgyNf0afoBdidWM%3D align="left")
    
    , then select **Calculate** &gt; **Custom formula**.
    

![Custom formula highlighted](https://cdn.qwiklabs.com/LAs4nQx3xR5AOiXmVbCnX1amcUbzsBn%2FiQizgdfJ%2F%2B8%3D align="left")

2. For **Formula**, type: `DIVIDE(totalTransactionRevenue,1000000)` and for **New column name**, type: `totalTransactionRevenue1`. Notice the preview for the transformation:
    

![Preview](https://cdn.qwiklabs.com/Hag1ur5bu4yXmKA7WohoWA6AWy2RuNIysL%2BsobdzDHU%3D align="left")

3. Click **Add**.
    

**Note:** You might see a red bar under the `totalTransactionRevenue1` column. Open the menu to the right of the `totalTransactionRevenue1` column by clicking

![93c14cbf1f70a561.png](https://cdn.qwiklabs.com/4RIUGfHjcTkc3C8%2F8cuxxnFWjyVXCgyNf0afoBdidWM%3D align="left")

, then click **Change type &gt; Decimal**.

4. Review the full list of steps in your recipe:
    

![Full Recipe](https://cdn.qwiklabs.com/rwbA5QmJRqmecUoGAhlAUNPBXlyJsBdSxYeqz4X7M%2F8%3D align="left")

5. You can now click **Run**.
    

## **Task 7. Running Cloud Dataprep jobs to BigQuery**

1. In the **Run Job** page, select **Dataflow + Bigquery** for your **Running Environment**.
    
2. Under **Publishing Actions**, click on **Edit** on the right of **Create-CSV**.
    
3. In the following page, select **BigQuery** from the left hand menu.
    
4. Select your **ecommerce** dataset.
    
5. Click **Create a New Table** from the panel on the right.
    
6. Name your table **revenue\_reporting**.
    
7. Select **Drop the Table every run**.
    
8. Click on **Update**.
    
9. Click **RUN**.
    

Once your Cloud Dataprep job is completed, refresh your BigQuery page and confirm that the output table **revenue\_reporting** exists.

**Note:** If your job fails, try waiting a minute, pressing the back button on your browser, and running the job again with the same settings.

Click **Check my progress** to verify the objective.

Verify if the Cloud Dataprep jobs output the data to BigQuery

---

## Solution of Lab

%[https://www.youtube.com/watch?v=hPGakjDDxwg] 

Download file: [flow\_Ecommerce\_Analytics\_Pipeline.zip](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP430/flow_Ecommerce_Analytics_Pipeline.zip)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724209522262/7ca0f9ec-0859-484c-80cd-f89c8b4bb8dc.png align="center")