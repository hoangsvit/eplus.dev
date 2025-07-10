---
title: "Reconciling Account Data with Cloud Spanner Change Streams - GSP1097"
seoTitle: "Reconciling Account Data with Cloud Spanner Change Streams - GSP1097"
seoDescription: "Learn to set up account reconciliation using Google Cloud Spanner, change streams, and BigQuery for efficient financial data tracking"
datePublished: Thu Jul 10 2025 02:55:39 GMT+0000 (Coordinated Universal Time)
cuid: cmcwsploq001a02l56pyq9trd
slug: reconciling-account-data-with-cloud-spanner-change-streams-gsp1097
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752115856648/0f1961ad-1f74-4cbd-ba65-90ab126f31a2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752115860484/ccf75899-d785-4200-8d6b-7c2c9bf79c9b.png

---

## Overview

Account reconciliation is one of the many mandatory business processes for a plethora of businesses in numberless industry verticals. While every business has its procedures, it follows a pretty standard process of matching transactions across ledgers and bank statements to ensure financial accuracy of accounts. Reconciliation and audit tools help teams maximize their productivity and save time in what would otherwise be a very timely process of account reconciliation.

In this lab, you will create an account table in Google Cloud Spanner and set up a monitoring pipeline with Spanner's [change streams](https://cloud.google.com/spanner/docs/change-streams) feature and Google Dataflow. The changes will be reflected in BigQuery.

## What you'll learn

In this lab, you learn how to perform the following tasks:

* Create an account table in Spanner
    
* Create a change streams monitoring hook in Spanner
    
* Configure and run change streams Dataflow job
    
* Monitor the changes in BigQuery
    

## Setup and requirements

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
    student-02-5bf29296d05a@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    GKCbhaIKWjBn
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

## Task 1. Create a database accounts and insert DDL

1. From the Cloud Console Navigation menu (), click **View All Products** and under Databases click **Spanner**.
    
2. Click on the **bitfoon-dev** instance.
    
3. From the instance details page, click **Create Database**.
    
4. For the database name, enter **finance**.
    
5. For **Select database dialect** select **Google Standard SQL**..
    
6. In the **Define your schema** box, copy and paste following DDL:
    

```sql
CREATE TABLE Account (
 AccountId BYTES(16) NOT NULL,
 CreationTimestamp TIMESTAMP NOT NULL OPTIONS (allow_commit_timestamp=true),
 AccountStatus INT64 NOT NULL,
 Balance NUMERIC NOT NULL
) PRIMARY KEY (AccountId);
```

7. Click **Create**. Your database should resemble the following:
    

![finance database created](https://cdn.qwiklabs.com/nL24Y1Jp3OQQDyImp6Ah0cnc7DLHJQOlnRx9S%2F0BuiQ%3D align="left")

Great! You have created an accounts database.

Click **Check my progress** to verify the objective.

Create the database accounts and insert DDL

## Task 2. Insert arbitrary account data

1. From the **finance** database, click on **Spanner Studio** in the left menu.
    
2. Copy and paste following query into the box:
    

```sql
INSERT INTO
 Account (AccountId,
   CreationTimestamp,
   AccountStatus,
   Balance)
VALUES
 (FROM_BASE64('ACCOUNTID11123'),
   PENDING_COMMIT_TIMESTAMP(),
   1,
   22)
```

3. Click **Run**.
    

Your output should resemble:

```apache
1 row inserted
This statement inserted 1 row and did not return any rows.
```

4. **Repeat** the query step three times with different Account IDs to create multiple accounts. Use the following Account IDs:
    
    * `ACCOUNTID12345`
        
    * `ACCOUNTID24680`
        
    * `ACCOUNTID135791`
        

Great! You have inserted multiple accounts in your database.

## Task 3. Create a change stream for Balance and AccountStatus

1. From the **finance** database, click on **Change Streams** in the left menu.
    
2. Click **+CREATE CHANGE STREAM**.
    
3. Copy and paste following schema into the Editor box:
    

```sql
CREATE CHANGE STREAM AccountUpdateStream FOR Account(AccountStatus, Balance);
```

4. Click **Run**.
    
5. Navigate back to the **Change Streams** page. Verify you change stream has been created:
    

![change streams created](https://cdn.qwiklabs.com/y77%2BegalrxOADrLrY0%2BdSFYqeXmRSi15yFsJQQrWAIo%3D align="left")

The change stream is now created with a default retention period of *24h*. You can check out other options [here](https://cloud.google.com/spanner/docs/change-streams/manage#create).

Click **Check my progress** to verify the objective.

Create a change stream for Balance and AccountStatus

## Task 4. Create an reconciliation dataset in BigQuery to receive change stream data

1. On the Cloud Console Navigation menu (), click **BigQuery**.
    
2. click on the **View actions** icon () next to your Project ID and click **Create dataset**.
    
3. Name the new dataset `changestream`.
    
4. Click **Create Dataset**.
    

Great! You have successfully created an reconciliation table.

Click **Check my progress** to verify the objective.

Create an reconciliation dataset in BigQuery to receive change stream data

## Task 5. Create a Dataflow change stream pipeline

1. On the Cloud Console Navigation menu (), click **View All Products** and under **Analytics** click **Dataflow**.
    
2. Click **Create job from template**.
    
3. For **Job name** type `change-stream-pipeline`.
    
4. For **Regional Endpoint** select `us-west1`.
    
5. For **Dataflow Template** select `Cloud Spanner change streams to BigQuery`.
    

![dataflow job configuration](https://cdn.qwiklabs.com/Rzd3%2Flhdo2JBnPgY%2BZ0C4DHhZpyVTTTp66I%2BlAtXBA8%3D align="left")

6. Fill out the required parameters with the following values:
    
    * **Spanner instance ID**: `bitfoon-dev`
        
    * **Spanner database**: `finance`
        
    * **Spanner change stream**: `AccountUpdateStream`
        
    * **BigQuery dataset**: `changestream`
        
    * **Spanner metadata instance ID**: `bitfoon-dev`
        
    * **Spanner metadata database**: `finance`
        
7. Click **Run Job**.
    

### Start the Dataflow job

1. On the Cloud Console Navigation menu (), click **View All Products** and under **Databases** click **Spanner**.
    
2. Click on the **bitfoon-dev** instance.
    
3. Click on database **finance**.
    
4. Click on **Spanner Studio** in the left menu.
    
5. Run the following query to kick off the Dataflow job:
    

```sql
INSERT INTO
 Account (AccountId,
   CreationTimestamp,
   AccountStatus,
   Balance)
VALUES
 (FROM_BASE64('ACCOUNTID98765'),
   PENDING_COMMIT_TIMESTAMP(),
   1,
   22)
```

6. On the Cloud Console Navigation menu (), click **View All Products** and under **Analytics** click **Dataflow**.
    
7. Verify the Dataflow job is running.
    

![verify dataflow job is running](https://cdn.qwiklabs.com/rFouc1MLe3IsmfrBKn7nvwj%2BbvAkTM7dLmdz2M6lWb4%3D align="left")

Click **Check my progress** to verify the objective.

Create a Dataflow change stream pipeline

## Task 6. Create changes in Spanner and track them in BigQuery

1. From the Cloud Console Navigation menu (), click **View All Products** and under **Databases** click **Spanner**.
    
2. Click on the **bitfoon-dev** instance.
    
3. Click on database **finance**.
    
4. Click on **Spanner Studio** in the left menu.
    
5. Copy and paste following update query into the box:
    

```apache
UPDATE
 Account
SET
 CreationTimestamp=PENDING_COMMIT_TIMESTAMP(),
 AccountStatus=4,
 Balance=255
WHERE
 AccountId=FROM_BASE64('ACCOUNTID11123');
```

6. Click **Run**.
    
7. **Repeat** the query step three times with balance values to create multiple changes. Use the following balance values:
    
    * `300`
        
    * `500`
        
    * `600`
        
8. On the Cloud Console Navigation menu (), click **BigQuery**.
    
9. Navigate to the `changestream` dataset and select `Account_changelog` and observe the changes.
    

**Note:** it may take a few minutes for the results to populate the table.

10. Select the **Preview** tab to see the results. Your table should resemble the following:
    

![final results from reconciliation table](https://cdn.qwiklabs.com/zB9YF1vC5ojBmo5WCRvgDGLkQDNVsYiEj861i6%2BMOgo%3D align="left")

Click **Check my progress** to verify the objective.

Create changes in Spanner and track them in BigQuery

---

## Solution of Lab

%[https://youtu.be/s2Prn-73IMw] 

```apache
curl -LO https://github.com/ArcadeCrew/Google-Cloud-Labs/raw/refs/heads/main/Reconciling%20Account%20Data%20with%20Cloud%20Spanner%20Change%20Streams/arcadecrew.sh
chmod +x arcadecrew.sh
./arcadecrew.sh
```