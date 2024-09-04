---
title: "Using BigQuery and Cloud Logging to Analyze BigQuery Usage - GSP617"
seoTitle: "Using BigQuery and Cloud Logging to Analyze BigQuery Usage - GSP617"
seoDescription: "Cloud Logging serves as a central repository for logs from various Google Cloud services, including BigQuery, and is ideal for short to mid-term log storage"
datePublished: Wed Sep 04 2024 06:12:06 GMT+0000 (Coordinated Universal Time)
cuid: cm0ngo06v00180am57zev2px9
slug: using-bigquery-and-cloud-logging-to-analyze-bigquery-usage-gsp617
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1725430053747/59478ab7-5d29-4e5b-beb9-9630ce2b817a.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1725430312463/dff7c9d9-bef2-43d3-916d-0f67d31031fb.jpeg
tags: using-bigquery-and-cloud-logging-to-analyze-bigquery-usage-gsp617, gsp617

---

## **Overview**

Cloud Logging serves as a central repository for logs from various Google Cloud services, including BigQuery, and is ideal for short to mid-term log storage. Many industries require logs to be retained for extended periods. To keep logs for extended historical analysis or complex auditing, you can set up a sink to export specific logs to BigQuery.

In this lab you view the BigQuery logs inside Cloud Logging, set up a sink to export them into BigQuery, and then use SQL to analyze the logs.

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
    student-04-d21400569f5e@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    wVvtqdcW5E1z
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

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-2ed6838a3031`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-2ed6838a3031
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

3. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-d21400569f5e@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

4. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-00-2ed6838a3031
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Open BigQuery**

### Open the BigQuery console

1. In the Google Cloud Console, select **Navigation menu** &gt; **BigQuery**.
    

The **Welcome to BigQuery in the Cloud Console** message box opens. This message box provides a link to the quickstart guide and the release notes.

2. Click **Done**.
    

The BigQuery console opens.

## **Task 2. Create a dataset**

1. Under the **Explorer** section, click on the three dots next to the project that starts with `qwiklabs-gcp-`.
    
2. Click **Create dataset**.
    
3. Set *Dataset ID* to **bq\_logs**.
    
4. Click **CREATE DATASET**.
    

Click **Check my progress** to verify the objective.

Assessment Completed!

Create a Dataset

**Check my progress**

*Assessment Completed!*

## **Task 3. Run a query**

First, run a simple query which generates a log. Later you will use this log to set up the log export from to BigQuery.

1. Copy and paste the following query into the BigQuery Query editor:
    

```apache
SELECT current_date
```

Click **RUN**.

## **Task 4. Set up log export from Cloud Logging**

1. In the Cloud console, select **Navigation menu** &gt; **View All Products** &gt; **Logging** &gt; **Logs Explorer**.
    

**Note:** If prompted, Click LEAVE for Unsaved work.

2. In **All resources**, select **BigQuery**, then click **Apply**.
    
3. Now, click **Run query** button in the top right.
    

A few log entries from the query should appear.

Look for the entry that contains the word "jobcompleted".

![BigQuery logs](https://cdn.qwiklabs.com/3P1wbCo0ts2Wgs424mzRFGjOc6Pj%2BayjSrJJmaxPgEg%3D align="left")

4. Click on the arrow on the left to expand the entry.
    

![expanded log and the arrow on the left of an entry highlighted](https://cdn.qwiklabs.com/hw3rlk%2BgSsgPe0qZ0kTA6ruThK3MTjpO%2FfywVHjDTNk%3D align="left")

Then click on **Expand nested fields** button on the right hand side.

This shows the full JSON log entry. Scroll down and have a look at the different fields.

5. Scroll back up to the header of the entry, click on **Similar entries** button and choose **Show similar entries**.
    

![jobcompleted log](https://cdn.qwiklabs.com/S3vFU2pVCMQDZgLy9rhaNyXZroiH6aB6g9JebFW6iZA%3D align="left")

This sets up the search with the correct terms. You may need to toggle the **Show Query** button to see it.

![query builder](https://cdn.qwiklabs.com/GVEdGNrJmlWW8LfIgRobp%2BTQAd%2B%2FIbGvc6hVgf4cDTg%3D align="left")

### Create sink

Now that you have the logs you need, time to set up a sink.

1. Click **Create sink** from the **More actions** drop-down.
    

![Create sink option highlighted](https://cdn.qwiklabs.com/Zl8po7G%2Bs6eBrYJXtcyY7FRY7rqRuZTJrID6aTSe5aE%3D align="left")

2. Fill in the fields as follows:
    

* Sink name: **JobComplete** and click **NEXT**.
    
* Select sink service: **BigQuery dataset**
    
* Select Bigquery dataset (Destination): **bq\_logs** (The dataset you setup previously)
    
* Leave the rest of the options at the default settings.
    

3. Click **CREATE SINK**.
    

Any subsequent log entries from BigQuery are now exported to a table in the **bq\_logs** dataset.

Click **Check my progress** to verify the objective.

Assessment Completed!

Create a Sink

**Check my progress**

*Assessment Completed!*

## **Task 5. Run example queries**

To populate your new table with some logs, run some example queries.

* Navigate to **Cloud Shell**, then add each of the following BigQuery commands into Cloud Shell:
    

```apache
bq query --location=us --use_legacy_sql=false --use_cache=false \
'SELECT fullName, AVG(CL.numberOfYears) avgyears
 FROM `qwiklabs-resources.qlbqsamples.persons_living`, UNNEST(citiesLived) as CL
 GROUP BY fullname'
```

```apache
bq query --location=us --use_legacy_sql=false --use_cache=false \
'select month, avg(mean_temp) as avgtemp from `qwiklabs-resources.qlweather_geo.gsod`
 where station_number = 947680
 and year = 2010
 group by month
 order by month'
```

```apache
bq query --location=us --use_legacy_sql=false --use_cache=false \
'select CONCAT(departure_airport, "-", arrival_airport) as route, count(*) as numberflights
 from `bigquery-samples.airline_ontime_data.airline_id_codes` ac,
 `qwiklabs-resources.qlairline_ontime_data.flights` fl
 where ac.code = fl.airline_code
 and regexp_contains(ac.airline ,  r"Alaska")
 group by 1
 order by 2 desc
 LIMIT 10'
```

You should see the results of each query returned.

Click **Check my progress** to verify the objective.

Assessment Completed!

Run example queries

**Check my progress**

*Assessment Completed!*

## **Task 6. Viewing the logs in BigQuery**

1. Navigate back to BigQuery (**Navigation menu** &gt; **BigQuery**).
    
2. Expand your resource starting with the name **qwiklabs-gcp-** and expand your dataset **bq\_logs**.
    

The name may vary, but you should see a "cloudaudit\_googleapis\_com\_data\_access" table.

**Note:** You may have to re-run the example queries to get the table to show up.

3. Click on the table name, then inspect the schema of the table and notice it has a very large number of fields.
    

If you clicked **Preview** and wondered why it doesn't show the logs for the recently run queries, its because the logs are streamed into the table, which means that the new data can be queried but won't show up in Preview for a little while.

To make the table more usable, create a **VIEW**, which pulls out subset of fields and also performs some calculations to derive a metric for query time.

4. Click **Compose New Query**. In the BigQuery query EDITOR, run the following SQL after replacing with the name of your project (the Project ID can be easily copied from the **Lab Details** panel on the left side of the lab page):
    

```sql
CREATE OR REPLACE VIEW
  bq_logs.v_querylogs AS
SELECT
  resource.labels.project_id,
  protopayload_auditlog.authenticationInfo.principalEmail,
  protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobConfiguration.query.query,
  protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobConfiguration.query.statementType,
  protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobStatus.error.message,
  protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobStatistics.startTime,
  protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobStatistics.endTime,
  TIMESTAMP_DIFF(protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobStatistics.endTime,           protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobStatistics.startTime, MILLISECOND)/1000 AS run_seconds,
  protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobStatistics.totalProcessedBytes,
  protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobStatistics.totalSlotMs,
  ARRAY(SELECT as STRUCT datasetid, tableId FROM UNNEST(protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobStatistics.referencedTables)) as tables_ref,
  protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobStatistics.totalTablesProcessed,
  protopayload_auditlog.servicedata_v1_bigquery.jobCompletedEvent.job.jobStatistics.queryOutputRowCount,
  severity
FROM
  `<YOUR-PROJECT-ID>.bq_logs.cloudaudit_googleapis_com_data_access_*`
ORDER BY
  startTime
```

Click ***Check my progress*** to verify the objective.

Please run a query to create v\_querylogs view.

Viewing the logs in BigQuery

**Check my progress**

*Please run a query to create v\_querylogs view.*

5. Now query the VIEW. Compose a new query, and run the following command:
    

```sql
SELECT * FROM bq_logs.v_querylogs
```

6. Scroll through the results of the executed queries.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=GxE2DJBFtYA&t=56s] 

```apache
bq mk bq_logs
bq query --use_legacy_sql=false "SELECT current_date()"
```

Open [https://console.cloud.google.com/logs/](https://console.cloud.google.com/logs/query;cursorTimestamp=2024-09-04T06:00:16.582997Z;duration=PT1H?project=qwiklabs-gcp-00-2ed6838a3031)

```apache
resource.type="bigquery_resource"
protoPayload.methodName="jobservice.jobcompleted"
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725430232862/48ec5882-d10b-44af-a5bf-4a39644f9bde.png align="center")

Create Sink name: <mark>JobComplete</mark>

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725430243308/134c63ab-c3a5-4c73-b23b-b2c1ffe98c16.png align="center")

---

```apache
curl -LO raw.githubusercontent.com/Techcps/GSP-Short-Trick/master/Using%20BigQuery%20and%20Cloud%20Logging%20to%20Analyze%20BigQuery%20Usage/techcps.sh
sudo chmod +x techcps.sh
./techcps.sh
```