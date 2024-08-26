---
title: "BigQuery Soccer Data Ingestion - GSP848"
seoTitle: "BigQuery Soccer Data Ingestion - GSP848"
seoDescription: "Information access uses multiple formats, and BigQuery makes working with multiple data sources simple. In this lab you will get started with sports data sc"
datePublished: Mon Aug 26 2024 03:30:23 GMT+0000 (Coordinated Universal Time)
cuid: cm0afxdpy00060alca7xa6kms
slug: bigquery-soccer-data-ingestion-gsp848-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724642764001/a1c1fcb4-4c92-4af5-9d7d-7e06486ef722.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724643009532/9fbb3b4b-956a-4d15-a797-e8572b590c21.png
tags: bigquery-soccer-data-ingestion-gsp848, gsp848

---

## **Overview**

Information access uses multiple formats, and BigQuery makes working with multiple data sources simple. In this lab you will get started with sports data science by importing external sports data sources into BigQuery tables. This will give you the basis for building more sophisticated analytics in subsequent labs.

The data used in this lab originates from the following sources:

* Pappalardo et al., (2019) **A public data set of spatio-temporal match events in soccer competitions**, Nature Scientific Data 6:236, [https://www.nature.com/articles/s41597-019-0247-7](https://www.nature.com/articles/s41597-019-0247-7)
    
* Pappalardo et al. (2019) **PlayerRank: Data-driven Performance Evaluation and Player Ranking in Soccer via a Machine Learning Approach**. ACM Transactions on Intelligent Systems and Technologies (TIST) 10, 5, Article 59 (September 2019), 27 pages. DOI: [https://doi.org/10.1145/3343172](https://doi.org/10.1145/3343172)
    

## **Objectives**

In this lab, you will learn how to:

* Upload files from Google Cloud Storage (GCS) into BigQuery tables using the Cloud Console.
    
* Use the Cloud Console to access information derived from BigQuery tables.
    
* Understand how to write queries on the uploaded tables.
    

## **Setup and requirements**

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
    "Username"
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    "Password"
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

## **Task 1. Open BigQuery**

The BigQuery console provides an interface to query tables, including [public datasets](https://cloud.google.com/bigquery/public-data) offered by BigQuery.

1. In the Cloud Console, from the **Navigation menu** select **BigQuery**:
    

![Navigation menu](https://cdn.qwiklabs.com/P5e2YEtseg2Gqwhv66%2FLvId0e2%2F16Cux4Mu8TgoNMsg%3D align="left")

2. The **Welcome to BigQuery in the Cloud Console** message box opens. This message box provides a link to the quickstart guide and the release notes.
    
3. Click **Done**.
    
4. The BigQuery console opens.
    

![BigQuery console with the Editor tab opening a blank page.](https://cdn.qwiklabs.com/N8PNVBDaQw13jjcsXXm9GNowCSA7DXmLcco%2BZex8nDU%3D align="left")

In this section the BigQuery interface was used to access the console. The console provides a convenient way to add information to a dataset. BigQuery uses tables to represent data in a structured way.

In the next section learn more about BigQuery and how to create custom tables.

## **Task 2. Create custom tables**

In this section, you will create a dataset. The dataset is used to add data to the project. Datasets utilize **tables** and **views** to help control access to data within a project.

1. In the BigQuery console, observe the **Explorer** section.
    
2. Click on the **View actions** icon next to your project ID and select **Create dataset**.
    

![Create dataset option highlighted](https://cdn.qwiklabs.com/SXQX9UvusFy1Vqy2T5Pxyu1Qo65VyPeS06j41YKS6N4%3D align="left")

**Note:** A dataset is contained within a specific project. Datasets are top-level containers that are used to organize and control access to your *tables* and *views*. A table or view must belong to a dataset, so you need to create at least one dataset before loading data into BigQuery. Reference: [BigQuery datasets introduction](https://cloud.google.com/bigquery/docs/datasets-intro).

3. On the **Create dataset** page fill in the following:
    

| **Field** | **Value** |
| --- | --- |
| Dataset ID | soccer |
| Data location | us (multiple regions in United States) |
| Default table expiration | *Default* |

4. The BigQuery **Create dataset** screen will display information similar to below:
    

![Create dataset screen with the dataset details and a highlighted Create Dataset button.](https://cdn.qwiklabs.com/hyAojpLLGjS46gtFPieDpCh04p81ZegaMv8a5nirkdE%3D align="left")

**Note:** Currently, the public datasets are stored in the US multi-region [data locations](https://cloud.google.com/bigquery/docs/dataset-locations). For simplicity, place your dataset in the same location.

5. Click **Create dataset** at the bottom of the panel.
    

Click Check my progress to verify the objective

Check a new dataset is created

**Check my progress**

In this section a new dataset was created using BigQuery. During this process, BigQuery needs to know where to store the information to be created. It also provides the option to include customer managed encryption, if required.

In the next section learn how to populate the created dataset with JavaScript Object Notation (JSON) a common data format.

## **Task 3. Load JSON Data**

Now you will load the tables created previously with soccer data into the dataset.  
[BigQuery provides support for a number of import formats](https://cloud.google.com/bigquery/docs/loading-data). In this lab use [JSON](https://www.json.org/json-en.html) with the dataset created in the previous section.

1. Create a table by clicking on the **View actions** icon next to your `soccer` dataset in the Explorer section.
    
2. Select **Create table**.
    

In the following section use the default values for all settings unless otherwise indicated. The data is stored in a public Google Cloud Storage (GCS) bucket.

3. On the **Create table** page add the following information:
    

| **Field** | **Value** |
| --- | --- |
| Create table from | Google Cloud Storage |
| Select file from GCS bucket | spls/bq-soccer-analytics/competitions.json |
| File format | JSONL (Newline delimited JSON) |
| Table name | competitions |
| Schema | Check the box marked Schema `Auto detect` |

**Note:** When using Cloud Storage buckets with BigQuery, it does not require the prefix of `gs://` to be applied.

4. The BigQuery **Create table** screen will display information similar to below:
    

![Create dataset screen with Source, Destination, and Schema sections.](https://cdn.qwiklabs.com/M5tK5HHy8Z1dCU8fBZxpFwfATxyphUClVyk3o97KaCQ%3D align="left")

5. Click **Create table**.
    
6. Wait for BigQuery to create the table and load the data.
    
7. A pop up notification message saying **"competitions" created** is displayed.
    
8. **The table** will show up after the data is loaded.
    
9. Repeat the steps above for the other JSON data to be ingested.
    

| **GCS bucket file** | **Table name** |
| --- | --- |
| spls/bq-soccer-analytics/matches.json | matches |
| spls/bq-soccer-analytics/teams.json | teams |
| spls/bq-soccer-analytics/players.json | players |
| spls/bq-soccer-analytics/events.json | events |

**Note:** Use the exact Cloud Storage bucket files and table names shown.

10. Once the tables are created the display will be similar to below:
    

![Tables listed below the soccer dataset in the Explorer menu](https://cdn.qwiklabs.com/qNRe%2Fz2TSF4pWwRW4Vy5XQgTgCbPwV7jIbcj8ISHBLk%3D align="left")

Click Check my progress to verify the objective

Check a competitions table is created

**Check my progress**

In this section new tables were created using BigQuery. During this process, BigQuery used Cloud Storage as the source for the JSON files. Cloud Storage provides a good intermediate storage option for object files.

In the next section learn how to populate the created dataset with a comma-separated values (CSV) file, that is another common data format.

## **Task 4. Load CSV data**

In this section, load another table of soccer data into the dataset. The load process will this time be sourced from a comma-separated values (CSV) file stored in Cloud Storage.

1. Create a table by clicking on the **View actions** icon next to your `soccer` dataset in the Explorer section, and select **Create table**.
    

Use the default values for all settings unless otherwise indicated.

2. On the **Create table** page add the following information:
    

| **Field** | **Value** |
| --- | --- |
| Create table from | Google Cloud Storage |
| Select file from GCS bucket | spls/bq-soccer-analytics/tags2name.csv |
| File format | CSV |
| Table name | tags2name |
| Schema | Check the box marked *Auto detect* |

3. The BigQuery **Create table** screen will display information similar to below:
    

![Create table screen with Source, Destination, and Schema sections.](https://cdn.qwiklabs.com/TIxjs6XUXu2TDdzOv%2B9FcuWnnDS%2BaI0SGTGZdDQIxNQ%3D align="left")

4. Click **Create table** (at the bottom of the window).
    
5. Wait for BigQuery to create the table and load the data.
    

A pop up message will appear saying "tags2name" created.

6. **The table** will show up after the data is loaded.
    

Click Check my progress to verify the objective

Check the tags2name table is created

**Check my progress**

In this section a new table was created using BigQuery. During this process, BigQuery used Cloud Storage as the source for the CSV file. Cloud Storage provides a good intermediate storage option for object files.

## **Task 5. Preview tables**

1. In the left pane, select **soccer** &gt; **competitions** in the navigation panel.
    
2. In the Details panel, click the **Preview** tab.
    

![Preview of competitions table](https://cdn.qwiklabs.com/f5k5loNAnnY18NuIMfagRE52O2U3wNrQLUZZijOSX%2Fw%3D align="left")

3. Click through the other uploaded tables from the navigation panel.
    
4. Check the **Schema**, **Details**, **Preview**, **Lineage**, **Data Profile** and **Data Quality** tabs to learn more about the data in each table.
    

BigQuery provides a convenient way to store data previously held in a variety of formats. To learn more about data ingestion techniques for BigQuery read [Choosing a data ingestion method](https://cloud.google.com/bigquery/docs/loading-data#choosing_a_data_ingestion_method).

In the next couple of sections learn how to query the datasets created in BigQuery.

## **Task 6. Query Player data**

Now that you've loaded data into your tables, you can run queries against it. Next, create a query that retrieves the top 10 tallest defenders (for whom height is available) in the players table.

1. In the query Editor, click "**+**" (Create SQL query) icon.
    
2. Copy and paste the following query into the query Editor:
    

```sql
SELECT
  (firstName || ' ' || lastName) AS player,
  birthArea.name AS birthArea,
  height
FROM
  `soccer.players`
WHERE
  role.name = 'Defender'
ORDER BY
  height DESC
LIMIT 5
```

**Note:** In the above query, use BigQuery to retrieve information relating to soccer players. Specifically query for a specific player role to understand the general characteristics of a defender.

3. Click **Run**. The results are displayed below the query window.
    

![Query results within the Results tabbed page.](https://cdn.qwiklabs.com/zR0pE3gsmzBeaa5NBzp123znYsOXtaL9tGrSIp5v%2BP0%3D align="left")

Click Check my progress to verify the objective

Check the query has been run

**Check my progress**

Understanding how to perform queries in BigQuery is essential. Running queries in BigQuery provides a simple interface to extract powerful data insights.

## **Task 7. Query events data**

Create a query to retrieve counts of all event types that are found in the **events** table.

1. Copy and paste the following query into the query Editor:
    

```sql
SELECT
  eventId,
  eventName,
  COUNT(id) AS numEvents
FROM
  `soccer.events`
GROUP BY
  eventId, eventName
ORDER BY
  numEvents DESC
```

2. Click **Run**. The results are displayed below the query window.
    

![Query results](https://cdn.qwiklabs.com/ilf15KgrYzQW3CiUH1%2BeXSqLUe3JUNzAt9e0zSZOjqc%3D align="left")

**Note:** In the above query, use BigQuery to retrieve information relating to events occurring within a soccer match. Specifically query for the frequency of events like passes and shots.

Click Check my progress to verify the objective

Check the query has been run

**Check my progress**

Being able to capitalize on stored data to establish trends and patterns presents an opportunity to deliver real benefit to end users. In the next section test your understanding of what you have learned in this introduction to BigQuery.

## **Task 8. Pop quiz**

Test your understanding of BigQuery by completing the short quiz on the topics covered in this lab.

**How many domestic leagues appear in the** `competitions` **table?**

* 5
    
* 7
    
* 2
    

**How many rows are in the** `events` **table?**

* 1,941
    
* 3,251,294
    

* 4,598,693
    

**Which table contains tags (numerical IDs) that can be matched to text labels and descriptions in the** `tags2name` **table?**

* events
    
* players
    
* competitions
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=d6AJl5wM2YM] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/BigQuery%20Soccer%20Data%20Ingestion/quicklabgsp848.sh
sudo chmod +x quicklabgsp848.sh
./quicklabgsp848.sh
```