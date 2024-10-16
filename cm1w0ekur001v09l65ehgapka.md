---
title: "Assessing Data Quality with Dataplex - GSP1158"
seoTitle: "Assessing Data Quality with Dataplex - GSP1158"
seoDescription: "Dataplex is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data ware"
datePublished: Sat Oct 05 2024 10:26:30 GMT+0000 (Coordinated Universal Time)
cuid: cm1w0ekur001v09l65ehgapka
slug: assessing-data-quality-with-dataplex-gsp1158
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728122821293/58ce8b1e-08d3-4328-abc8-0172511c683d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1728123967474/739f0d23-245a-4fc6-8fae-7d657c5ca73b.png

---

## **Overview**

[Dataplex](https://cloud.google.com/dataplex) is an intelligent data fabric that enables organizations to centrally discover, manage, monitor, and govern their data across data lakes, data warehouses, and data marts to power analytics at scale.

A valuable feature of Dataplex is the ability to define and run data quality checks on Dataplex assets such as BigQuery tables and Cloud Storage files. Using [Dataplex data quality tasks](https://cloud.google.com/dataplex/docs/data-quality-tasks-overview), you can integrate data quality checks into everyday workflows by validating data that is part of a data production pipline, regularly monitoring the quality of your data against a set of criteria, and building data quality reports for regulatory requirements.

In this lab, you learn how to assess data quality using Dataplex by creating a custom data quality specification file and using it to define and run a data quality job on BigQuery data.

### What you'll do

* Create a Dataplex lake, zone, and asset
    
* Query a BigQuery table to review data quality
    
* Create and upload a data quality specification file
    
* Define and run a data quality job
    
* Review the results of a data quality job
    

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
    student-00-d1c47a962f7f@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    8MYTQsc2Hygb
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-17660231cd30`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-17660231cd30
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
ACCOUNT: student-00-d1c47a962f7f@qwiklabs.net

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
project = qwiklabs-gcp-02-17660231cd30
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Enable Dataproc API

1. In the Google Cloud Console, enter **Cloud Dataproc API** in the top search bar.
    
2. Click on the result for **Cloud Dataproc API** under Marketplace.
    
3. Click **Enable**.
    

## **Task 1. Create a lake, zone, and asset in Dataplex**

To define and run data quality tasks, you first need to create some Dataplex resources.

In this task, you create a new Dataplex lake to store ecommerce customer information, add a raw zone to the lake, and then attach a pre-created BigQuery dataset as a new asset in the zone.

### Create a lake

1. In the Google Cloud Console, in the **Navigation menu** (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), navigate to **Analytics** &gt; **Dataplex**.
    

If prompted `Welcome to the new Dataplex experience`, click **Close**.

2. Under **Manage lakes**, click **Manage**.
    
3. Click **Create lake**.
    
4. Enter the required information to create a new lake:
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | `Ecommerce Lake` |
| **ID** | Leave the default value. |
| **Region** | `us-central1` |

Leave the other default values.

5. Click **Create**.
    

It can take up to 3 minutes for the lake to be created.

### Add a zone to the lake

1. On the **Manage** tab, click on the name of your lake.
    
2. Click **Add zone**.
    
3. Enter the required information to create a new zone:
    

| **Property** | **Value** |
| --- | --- |
| **Display Name** | `Customer Contact Raw Zone` |
| **ID** | Leave the default value. |
| **Type** | **Raw zone** |
| **Data locations** | **Regional** |

Leave the other default values.

For example, the option for **Enable metadata discovery** under **Discovery settings** is enabled by default and allows authorized users to discover the data in the zone.

4. Click **Create**.
    

It can take up to 2 minutes for the zone to be created.

**Note:** You can perform the next task once the status of the zone is **Active**.

### Attach an asset to a zone

1. On the **Zones** tab, click on the name of your zone.
    
2. On the **Assets** tab, click **Add assets**.
    
3. Click **Add an asset**.
    
4. Enter the required information to attach a new asset:
    

| **Property** | **Value** |
| --- | --- |
| **Type** | **BigQuery dataset** |
| **Display Name** | `Contact Info` |
| **ID** | Leave the default value. |
| **Dataset** | `qwiklabs-gcp-02-17660231cd30`.customers |

Leave the other default values.

5. Click **Done**.
    
6. Click **Continue**.
    
7. For **Discovery settings**, select **Inherit** to inherit the Discovery settings from the zone level, and then click **Continue**.
    
8. Click **Submit**.
    

Click *Check my progress* to verify the objective.

Create a lake, zone, and asset in Dataplex

**Check my progress**

## **Task 2. Query a BigQuery table to review data quality**

In the previous task, you created a new Dataplex asset from a BigQuery dataset named **customers** that has been pre-created for this lab. This dataset contains a table named **contact\_info** which contains raw contact information for customers of a fictional ecommerce company.

In this task, you query this table to start identifying some potential data quality issues that you can include as checks in a data quality job. You also identify another precreated dataset that you can use to store data quality job results in a later task.

1. In the Google Cloud Console, in the **Navigation menu** (), navigate to **BigQuery** &gt; **SQL Workspace**.
    
2. In the Explorer pane, expand the arrow next to your project ID to list the contents: `qwiklabs-gcp-02-17660231cd30`
    

In addition to the **customer\_contact\_raw\_zone** dataset created by Dataplex to manage that zone, there are two BigQuery datasets that were precreated for this lab:

* customers
    
* customers\_dq\_dataset
    

The dataset named **customers** contains one table named **contact\_info**, which contains contact information for customers such as a customer ID, name, email, and more. This is the table that you explore and check for data quality issues throughout this lab.

The dataset named **customers\_dq\_dataset** does not contain any tables. When you define a data quality job in a later task, you use this dataset as the destination for a new table containing the data quality job results.

![List of BigQuery Datasets](https://cdn.qwiklabs.com/qYZVPC%2BVbWIApqXuQxxDQ7GAL1aN0a8DLqgmKYv%2BoCw%3D align="left")

3. In the SQL Editor, click on **\+ SQL query**. Paste the following query, and then click **Run**:
    

```apache
  SELECT * FROM `qwiklabs-gcp-02-17660231cd30.customers.contact_info`
  ORDER BY id
  LIMIT 50
```

This query selects 50 records from the original table and orders the records by the customer id in the results.

4. Scroll through the results in the **Results** pane.
    

Notice that some records are missing customer IDs or have incorrect emails, which can make it difficult to manage customer orders.

![Incomplete data in contact-info table](https://cdn.qwiklabs.com/xcQjsWnqjRhIqSUsl%2BgwdeCW3ZE832Csx7CbkUw3mn8%3D align="left")

Click *Check my progress* to verify the objective.

Query BigQuery table to review data quality

**Check my progress**

## **Task 3. Create and upload a data quality specification file**

Dataplex data quality check requirements are defined using [CloudDQ](https://github.com/GoogleCloudPlatform/cloud-data-quality) YAML specification files. Once created, the YAML specification file is uploaded to a Cloud Storage bucket that is made accessible to the data quality job.

The [YAML file](https://github.com/GoogleCloudPlatform/cloud-data-quality/blob/main/REFERENCE.md) has four keys sections:

* a list of rules to run (either pre-defined or customized rules)
    
* row filters to select a subset of data for validation
    
* rule bindings to apply the defined rules to the table(s)
    
* optional rule dimensions to specify the types of the rules that the YAML file can contain
    

In this task, you define a new YAML specification file for data quality checks that identify null customer IDs and emails in the specified BigQuery table. After you define the file, you upload it to a pre-created Cloud Storage bucket for use in a later task to run the data quality job.

### Create the data quality specification file

1. In Cloud Shell, run the following command to create a new empty file for the data quality specification:
    

```apache
nano dq-customer-raw-data.yaml
```

2. Paste the following code:
    

```apache
metadata_registry_defaults:
  dataplex:
    projects: qwiklabs-gcp-02-17660231cd30
    locations: us-central1
    lakes: ecommerce-lake
    zones: customer-contact-raw-zone
row_filters:
  NONE:
    filter_sql_expr: |-
      True
  INTERNATIONAL_ITEMS:
    filter_sql_expr: |-
      REGEXP_CONTAINS(item_id, 'INTNL')
rule_dimensions:
  - consistency
  - correctness
  - duplication
  - completeness
  - conformance
  - integrity
  - timeliness
  - accuracy
rules:
  NOT_NULL:
    rule_type: NOT_NULL
    dimension: completeness
  VALID_EMAIL:
    rule_type: REGEX
    dimension: conformance
    params:
      pattern: |-
        ^[^@]+[@]{1}[^@]+$
rule_bindings:
  VALID_CUSTOMER:
    entity_uri: bigquery://projects/qwiklabs-gcp-02-17660231cd30/datasets/customers/tables/contact_info
    column_id: id
    row_filter_id: NONE
    rule_ids:
      - NOT_NULL
  VALID_EMAIL_ID:
    entity_uri: bigquery://projects/qwiklabs-gcp-02-17660231cd30/datasets/customers/tables/contact_info
    column_id: email
    row_filter_id: NONE
    rule_ids:
      - VALID_EMAIL
```

3. Review the code to identify the two primary data quality rules that are defined in this file.
    

The `dq-customer-raw-data.yaml` file begins with key parameters to identify the Dataplex resources including the project ID, region, and names of the Dataplex lake and zone.

Next, it specifies the allowed rule dimensions and two primary rules:

* The rule for **NOT\_NULL** values refers to the completeness dimension such as null values.
    
* The rule for **VALID\_EMAIL** values refers to the conformance dimension such as invalid values.
    

Last, the rules are bound to entities (tables) and columns using rule bindings for data quality validation:

* The first rule binding named **VALID\_CUSTOMER** binds the **NOT\_NULL** rule to the **id** column of the **contact\_info** table, which will validate if the ID column has any NULL values.
    
* The second rule binding named **VALID\_EMAIL\_ID** binds the **VALID\_EMAIL** rule to the **email** column of the **contact\_info** table, which will check for valid emails.
    

4. Enter `Ctrl+X`, then `Y`, to save and close the file.
    

### Upload the file to Cloud Storage

* In Cloud Shell, run the following command to upload the file to a Cloud Storage bucket that has been created for this lab:
    

```apache
gsutil cp dq-customer-raw-data.yaml gs://qwiklabs-gcp-02-17660231cd30-bucket
```

Click *Check my progress* to verify the objective.

Create and upload a data quality specification file

**Check my progress**

## **Task 4. Define and run a data quality job in Dataplex**

The data quality process uses a data quality specification YAML file to run a data quality job and generates data quality metrics that are written to a BigQuery dataset.

In this task, you define and run a data quality job using the data quality specification YAML file uploaded to Cloud Storage in the previous task. When you define the job, you also specify a pre-created BigQuery dataset named **customer\_dq\_dataset** to store the data quality results.

1. In the Google Cloud Console, in the **Navigation menu** (), navigate to **Analytics** &gt; **Dataplex**.
    
2. Under **Manage lakes**, click **Process**.
    
3. Click **Create task**.
    
4. Under Check Data Quality, click **Create task**.
    
5. Enter the required information to create a new data quality job:
    

| **Property** | **Value** |
| --- | --- |
| **Dataplex lake** | **ecommerce-lake** |
| **Display name** | `Customer Data Quality Job` |
| **ID** | Leave the default value. |
| **Select GCS file** | `qwiklabs-gcp-02-17660231cd30`\-bucket/dq-customer-raw-data.yaml |
| **Select BigQuery dataset** | `qwiklabs-gcp-02-17660231cd30`.customers\_dq\_dataset |
| **BigQuery table** | `dq_results` |
| **User service account** | **Compute Engine default service account** |

Leave the other default values.

Note that the Compute Engine default service account has been preconfigured for this lab to have the appropriate IAM roles and permissions. For more information, review the Dataplex documentation titled [Create a service account](https://cloud.google.com/dataplex/docs/check-data-quality#create-a-service-account).

6. Click **Continue**.
    
7. For **Start**, select **Immediately**.
    
8. Click **Create**.
    

**Note:** It can take several minutes for the job to run. You may need to refresh the page to see that the job has run successfully.

![Succeeded Job Status](https://cdn.qwiklabs.com/GaawbCp13cHvEbJVV7eEC5SvlYTWS5lwmlPwi%2FcIVdY%3D align="left")

Click *Check my progress* to verify the objective.

Define and run a data quality job in Dataplex

**Check my progress**

## **Task 5. Review data quality results in BigQuery**

In this task, you review the tables in the **customers\_dq\_dataset** to identify records that are missing customer ID values or have an invalid values for emails.

1. In the Google Cloud Console, in the **Navigation menu** (), navigate to **BigQuery** &gt; **SQL Workspace**.
    
2. In the Explorer pane, expand the arrow next to your project ID to list the contents: `qwiklabs-gcp-02-17660231cd30`
    
3. Expand the arrow next to the **customer\_dq\_dataset** dataset.
    
4. Click on the **dq\_summary** table.
    
5. Click on the **Preview** tab to see the results.
    

The **dq summary** table provides useful information about the overall data quality including the number of records that were identified to not adhere to the two rules in the data quality specification file.

6. Scroll to the last column named **failed\_records\_query**.
    
7. Click on the down arrow in the first row to expand the text and view the entire query for the **VALID\_EMAIL** rule results.
    

Note that the query is quite long and ends with `ORDER BY _dq_validation_rule_id`.

8. Click on **\+ SQL query**. Copy and paste the query into SQL Editor, and click **Run**.
    

The results of the query provide the email values in the **contact\_info** table that are not valid.

![Data quality results for VALID_EMAIL](https://cdn.qwiklabs.com/xgLT4BIv4WoVJzylk8zxJJhjOtdR6%2BUdMybpAQ8hSW8%3D align="left")

9. Repeat steps 7-8 for the second cell that contains the query for the **VALID\_CUSTOMER** rule results.
    

The results of the query identify that there are 10 records in the **contact\_info** table that are missing ID values.

![Data quality results for VALID_CUSTOMER](https://cdn.qwiklabs.com/1dPUlSoUyb8e40sCH%2BNpHiB0iPVbuitMUfyIAYFxYMA%3D align="left")

Click *Check my progress* to verify the objective.

Review data quality results in BigQuery table

---

## Solution of Lab

%[https://www.youtube.com/watch?v=vi2m0GWpZa0&ab_channel=QUICKGCPLAB] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1728123034168/efc8d584-580b-4a76-a3c7-32ea44a3153d.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Assessing%20Data%20Quality%20with%20Dataplex/gsp1158.sh
sudo chmod +x gsp1158.sh
./gsp1158.sh
```

* Go to `BigQuery` from [here](https://console.cloud.google.com/bigquery?)
    
* [I](https://console.cloud.google.com/dataplex/process/create-task/data-quality?)n the SQL Editor, click on `Compose a new query`. Paste the following query, and then click `Run`: ( REPLACE <mark>PROJECT_ID</mark> WITH YOUR PROJECT )
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1728123610607/c3cedff9-b4dd-417d-bb94-e93133d05138.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1728123705196/a2b5302c-e2bc-4da5-b3ea-3dcad162536c.png align="center")

```sql
SELECT * FROM `PROJECT_ID.customers.contact_info`
ORDER BY id
LIMIT 50
```

* Go to `Create task` from [he](https://console.cloud.google.com/dataplex/process/create-task/data-quality?)[re](https://console.cloud.google.com/dataplex/process/create-task/data-quality?)
    

**Congratulations 🎉 for Completing the Lab!**