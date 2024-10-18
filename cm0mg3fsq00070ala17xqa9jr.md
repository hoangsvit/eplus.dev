---
title: "Setting Up Cost Control with Quota - GSP651"
seoTitle: "Setting Up Cost Control with Quota - GSP651"
seoDescription: "In this lab, you explore controlling your BigQuery costs by modifying quota."
datePublished: Tue Sep 03 2024 13:08:20 GMT+0000 (Coordinated Universal Time)
cuid: cm0mg3fsq00070ala17xqa9jr
slug: setting-up-cost-control-with-quota-gsp651
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1725368470124/02e980b8-a96f-4d0c-81c4-d27725c77f2a.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1725368888701/31131d5f-3daf-45d6-a55e-6647ef34a2e0.jpeg
tags: setting-up-cost-control-with-quota-gsp651

---

## **Overview**

In this lab, you explore controlling your BigQuery costs by modifying quota.

### What you'll do

* Query a public dataset and explore associated costs.
    
* Modify quota.
    
* Try to rerun the query after quota has been modified.
    

### BigQuery pricing

BigQuery offers scalable, flexible pricing options to meet your technical needs and your budget.

With BigQuery, you can incur storage and query costs. In this lab, you explore query costs. For more information, see [BigQuery pricing](https://cloud.google.com/bigquery/pricing).

There are two pricing models for query costs in BigQuery:

* On-demand: On-demand pricing is based on the amount of data processed by each query you run. This is the most flexible option.
    
* Flat-rate: Flat-rate customers purchase dedicated resources for query processing and are not charged for individual queries. This option is predictable and is best for customers with fixed budgets.
    

## **Setup**

In this section, you access the Google Cloud and BigQuery consoles.

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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-c66e24986426`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-c66e24986426
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
project = qwiklabs-gcp-01-c66e24986426
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Open the BigQuery console

1. In the Google Cloud Console, select **Navigation menu** &gt; **BigQuery**.
    

The **Welcome to BigQuery in the Cloud Console** message box opens. This message box provides a link to the quickstart guide and the release notes.

2. Click **Done**.
    

The BigQuery console opens.

## **Task 1. Query a public dataset in BigQuery**

In this lab, you query the `bigquery-public-data:wise_all_sky_data_release` public dataset. Learn more about this dataset from the blog post [Querying the Stars with BigQuery GIS](https://cloud.google.com/blog/products/data-analytics/querying-the-stars-with-bigquery-gis).

1. In the **Query editor** paste the following query:
    
    ```sql
    SELECT
        w1mpro_ep,
        mjd,
        load_id,
        frame_id
    FROM
        `bigquery-public-data.wise_all_sky_data_release.mep_wise`
    ORDER BY
        mjd ASC
    LIMIT 500
    ```
    
2. **Do not run the query**. Instead, please answer the following question:
    

Use the query validator to determine how many bytes of data this will process when you run.1.36 GB1.36 TB1.36 MB1.36 PB

**Submit**

Processing large amounts of data without proper cost controls, even with simple queries like the above, can lead to unanticipated charges on your bill. To manage this, examine how BigQuery pricing works and how you can setup custom quotas for your teams.

3. Now **run the query** and see how quickly BigQuery processes that size of data.
    

Click **Check my progress** to verify the objective.

Query a public dataset in BigQuery

**Check my progress**

## **Task 2. Explore query cost**

The first 1 TB of query data processed per month is free.

* Learn more about cost from the [BigQuery pricing guide](https://cloud.google.com/bigquery/pricing).
    
* For more information on calculating and estimating costs in Google Cloud, use the [Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator/).
    

## **Task 3. Update BigQuery quota**

In this task, you update the BigQuery API quota to restrict the data processed in queries in your project.

1. In your **Cloud Shell**, run this command to view your current usage quotas with the **BigQuery API**:
    

```apache
gcloud alpha services quota list --service=bigquery.googleapis.com --consumer=projects/${DEVSHELL_PROJECT_ID} --filter="usage"
```

The **consumerQuotaLimits** display your current query per day limits. There is a separate quota for **usage per project** and **usage per user**.

2. Run this command in **Cloud Shell** to update your **per user** quota to **.25 TiB** per day:
    

```apache
gcloud alpha services quota update --consumer=projects/${DEVSHELL_PROJECT_ID} --service bigquery.googleapis.com --metric bigquery.googleapis.com/quota/query/usage --value 262144 --unit 1/d/{project}/{user} --force
```

3. After the quota is updated, examine your **consumerQuotaLimits** again:
    

```apache
gcloud alpha services quota list --service=bigquery.googleapis.com --consumer=projects/${DEVSHELL_PROJECT_ID} --filter="usage"
```

You should see the same limits from before but also a **consumerOverride** with the value used in the previous step:

```apache
---
consumerQuotaLimits:
- metric: bigquery.googleapis.com/quota/query/usage
  quotaBuckets:
  - defaultLimit: '9223372036854775807'
    effectiveLimit: '9223372036854775807'
  unit: 1/d/{project}
- metric: bigquery.googleapis.com/quota/query/usage
  quotaBuckets:
  - consumerOverride:
      name: projects/33699896259/services/bigquery.googleapis.com/consumerQuotaMetrics/bigquery.googleapis.com%2Fquota%2Fquery%2Fusage/limits/%2Fd%2Fproject%2Fuser/consumerOverrides/Cg1RdW90YU92ZXJyaWRl
      overrideValue: '262144'
    defaultLimit: '9223372036854775807'
    effectiveLimit: '262144'
  unit: 1/d/{project}/{user}
displayName: Query usage
metric: bigquery.googleapis.com/quota/query/usage
unit: MiBy
```

Next, you will re-run your query with the updated quota.

## **Task 4. Rerun your query**

1. In the **Cloud Console**, click **BigQuery**.
    
2. The query you previously ran should still be in the query editor, but if it isn't, paste the following query in the Query editor and click **Run**:
    
    ```sql
     SELECT
         w1mpro_ep,
         mjd,
         load_id,
         frame_id
     FROM
         `bigquery-public-data.wise_all_sky_data_release.mep_wise`
     ORDER BY
         mjd ASC
     LIMIT 500
    ```
    
    Note the validator still mentions `This query will process 1.36 TB when run`. However, the query has run successfully and hasn't processed any data. Why do you think that is?
    

**Running the same query again may not process any data because of the automatic query \_\_\_\_\_\_ feature in BigQuery.**

* Shuffling
    
* Joining
    
* Caching
    
* Uploading
    

**Submit**

**Note:** If your query is already blocked by your custom quota, don't worry. It's likely that you set the custom quota and re-run the query before the first query had time to cache the results.

Queries that use cached query results are at no additional charge and do not count against your quota. For more information on using cached query results, see [Using cached query results](https://cloud.google.com/bigquery/docs/cached-results).

In order for us to test the newly set quota, you must to disable query cache to process data using the previous query.

3. To test that the quota has changed, disable the cached query results. In the **Query results** pane, click **More** &gt; **Query settings**:
    

![Query settings option highlighted in the More dropdown mnenu](https://cdn.qwiklabs.com/QTKBlc4R8IOiGcZzheVbrpkWxfDVGgwKaNHQIAgcFUY%3D align="left")

4. Uncheck **Use cached results** and click **Save**.
    
5. Run the query again so that it counts against your daily quota.
    
6. Once the query has run successfully and processed the 1.36 TB, run the query once more.
    
    What happened? Were you able to run the query? You should have received an error like the following:
    
    `Custom quota exceeded: Your usage exceeded the custom quota for QueryUsagePerUserPerDay, which is set by your administrator. For more information, see https://cloud.google.com/bigquery/cost-controls`
    

Click **Check my progress** to verify the objective.

Rerun your Query

**Check my progress**

## **Task 5. Explore BigQuery best practices**

Quotas can be used for cost controls but it's up to your business to determine which quotas make sense for your team. This is one example of how to set quotas to protect from unexpected costs. One way to reduce the amount of data queried is to optimize your queries.

Learn more about optimizing BigQuery queries from the [Control costs in BigQuery guide](https://cloud.google.com/bigquery/docs/best-practices-costs).

---

## Solution of Lab

%[https://www.youtube.com/watch?v=-WxSLvSScRs] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Setting%20Up%20Cost%20Control%20with%20Quota/quicklabgsp651.sh
sudo chmod +x quicklabgsp651.sh
./quicklabgsp651.sh
```