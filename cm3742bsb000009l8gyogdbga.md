---
title: "BigLake: Qwik Start - GSP1040"
seoTitle: "BigLake: Qwik Start - GSP1040"
seoDescription: "BigLake is a unified storage engine that simplifies data access for data warehouses and lakes by providing uniform fine-grained access control across multi-"
datePublished: Thu Nov 07 2024 09:34:07 GMT+0000 (Coordinated Universal Time)
cuid: cm3742bsb000009l8gyogdbga
slug: biglake-qwik-start-gsp1040
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756631737065/e6003f75-9b8d-4392-addf-84c0fc576c95.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756631751515/77d9b8ff-371b-46ba-ba00-e1d041379e01.png
tags: biglake-qwik-start-gsp1040, gsp1040, biglake

---

## **Overview**

[BigLake](https://cloud.google.com/biglake) is a unified storage engine that simplifies data access for data warehouses and lakes by providing uniform fine-grained access control across multi-cloud storage and open formats.

BigLake extends BigQuery's fine-grained row- and column-level security to tables on data resident object stores such as Amazon S3, Azure Data Lake Storage Gen2, and Google Cloud Storage. BigLake decouples access to the table from the underlying cloud storage data through access delegation. This feature helps you to securely grant row- and column-level access to users and pipelines in your organization without providing them full access to the table.

After you create a BigLake table, you can query it like other BigQuery tables. BigQuery enforces row- and column-level access controls, and every user sees only the slice of data that they are authorized to see. Governance policies are enforced on all access to the data through BigQuery APIs. For example, the [BigQuery Storage API](https://cloud.google.com/bigquery/docs/reference/storage) lets users access authorized data using open source query engines such as Apache Spark, as the following diagram shows:

![biglake overview diagram](https://cdn.qwiklabs.com/%2FQE2SCK7phKDnIV75oadCSC2snVF2rqu%2BlnLqKTyOLI%3D align="left")

## **Objectives**

In this lab, you will:

* Create and view a connection resource.
    
* Set up access to a Cloud Storage data lake.
    
* Create a BigLake table.
    
* Query a BigLake table through BigQuery.
    
* Set up access control policies.
    
* Upgrade external tables to BigLake tables.
    

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
    student-00-03039e453898@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    maCproPLsBDk
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-2375345733cc`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-2375345733cc
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

3. Click **Authorize**.
    

**Output:**

```plaintext
ACTIVE: *
ACCOUNT: student-00-03039e453898@qwiklabs.net

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
project = qwiklabs-gcp-03-2375345733cc
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Create a connection resource**

BigLake tables access Google Cloud Storage data using a [connection resource](https://cloud.google.com/bigquery/docs/working-with-connections). A connection resource can be associated with a single table or an arbitrary group of tables in the project.

1. From the Navigation Menu, go to **BigQuery** &gt; **BigQuery Studio**. Click **Done**.
    
2. To create a connection, click **+ADD**, and then click **Connections to external data sources**.
    

**Note:** If you are prompted to enable the BigQuery Connection API click **Enable API**.

3. In the Connection type list, select **Vertex AI remote models, remote functions and BigLake (Cloud Resource)**.
    

![add external data source](https://cdn.qwiklabs.com/QExInxQOAnwNtiwo907kjtsj2mY0zkkeUk7gnV3DXLY%3D align="left")

4. In the Connection ID field, enter `my-connection`.
    
5. For Location type, choose **Multi-region** and select **US (multiple regions in United States)** from dropdown.
    
6. Click **Create connection**.
    
7. To view your connection information, select the connection in the navigation menu.
    

![my connection explorer](https://cdn.qwiklabs.com/QbpRme6iDo8h2QMDX3UY6trn0fleJkDYAZF9UC8x%2F9k%3D align="left")

8. In the **Connection info** section, copy the Service Account ID. You will need this in the following section.
    

Click *Check my progress* to verify the objective.

Create the connection resource

Check my progress

## **Task 2. Set up access to a Cloud Storage data lake**

In this section, you will give the new connection resource read-only access to the Cloud Storage data lake so that BigQuery can access Cloud Storage files on behalf of users. We recommend that you grant the connection resource service account the [Storage Object Viewer](https://cloud.google.com/storage/docs/access-control/iam-roles) IAM role, which lets the service account access Cloud Storage buckets.

1. From the Navigation Menu, go to **IAM & Admin** &gt; **IAM**.
    
2. Click **+GRANT ACCESS**.
    
3. In the **New principals** field, enter the service account ID that you copied earlier.
    
4. In the **Select a role** field, select **Cloud Storage**, and then select **Storage Object Viewer**.
    

![add principals dialogue box](https://cdn.qwiklabs.com/YFOIoquboT2Pho0i2FLoFVGGQ8P0hceWe62d4TlmYqc%3D align="left")

5. Click **Save**.
    

**Note:** After you migrate users to BigLake tables, remove direct Cloud Storage permissions from existing users. Direct file access allows users to bypass governance policies (such as row- and column-level security) set on BigLake tables.

Click *Check my progress* to verify the objective.

Set up access to a Cloud Storage data lake

Check my progress

## **Task 3. Create a BigLake table**

The following example uses the CSV file format, but you can use any format supported by BigLake, as shown in [Limitations](https://www.cloudskillsboost.google/games/5630/labs/Limitations). If you're familiar with creating tables in BigQuery, then this process should be similar. The only difference is that you specify the associated cloud resource connection.

**Note:** For optimal performance, we recommend using Cloud Storage single-region or dual-region buckets and not multi-region buckets.

If no schema was provided and the service account was not granted access to the bucket in the previous step, this step will fail with an access denied message.

### Create a dataset

1. Navigate back to **BigQuery** &gt; **BigQuery Studio**.
    
2. Click the three dots next to your project name and select **Create dataset**.
    

![create dataset](https://cdn.qwiklabs.com/tluNmbVOQOGmX4Gu2JUQ1zwzZf5fDGFkhW6kFD2t59E%3D align="left")

3. For the **Dataset ID**, use `demo_dataset`.
    
4. For Location type, choose **Multi-region** and select **US (multiple regions in United States)** from dropdown.
    
5. Leave the rest of the fields as default and click **Create Dataset**.
    
    Now that you have a dataset created, you can copy an existing dataset from Cloud Storage into BigQuery.
    

### Create the table

1. Click three dots next to **demo\_dataset**, then choose **Create table**.
    

![create-table-1](https://cdn.qwiklabs.com/aEJVBsinZFV08RJIwIXF9rU0OF9p5zaM7uOQpHJGXps%3D align="left")

2. Under Source for **Create table from**, choose **Google Cloud Storage**.
    

**Note:** A Cloud Storage bucket has been created with two datasets that you will use in this lab.

3. Click **Browse** to select the dataset. Navigate to the bucket named as `qwiklabs-gcp-03-2375345733cc` and then `customer.csv` file to import it into BigQuery, and click **Select**.
    
4. Under **Destination**, verify your lab project has been selected and you're using the **demo\_dataset**.
    
5. For the table name, use `biglake_table`.
    
6. Set the table type to **External Table**.
    
7. Select the box to **Create a BigLake table using a Cloud Resource connection**.
    
    Verify that your connection ID **us.my-connection** is selected. Your configuration should resemble the following:
    

![destination table](https://cdn.qwiklabs.com/axqq1UP9Hu4%2BSa2%2FzzL7lRgwvTUidbNsOzSN0OOk2Y4%3D align="left")

8. Under **Schema**, enable **Edit as text** and copy and paste the following schema into the text box:
    

```json
[
{
    "name": "customer_id",
    "type": "INTEGER",
    "mode": "REQUIRED"
  },
  {
    "name": "first_name",
    "type": "STRING",
    "mode": "REQUIRED"
  },
  {
    "name": "last_name",
    "type": "STRING",
    "mode": "REQUIRED"
  },
  {
    "name": "company",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "address",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "city",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "state",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "country",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "postal_code",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "phone",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "fax",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "email",
    "type": "STRING",
    "mode": "REQUIRED"
  },
  {
    "name": "support_rep_id",
    "type": "INTEGER",
    "mode": "NULLABLE"
  }
]
```

**Note:** Typically data lakes **do not** have a predefined schema. For this lab's purposes, we are using one to make setting column-level policies clearer.

9. Click **Create Table**.
    

Click *Check my progress* to verify the objective.

Create the BigLake table

Check my progress

## **Task 4. Query a BigLake table through BigQuery**

Now that you've created the BigLake table, you can use any BigQuery client to submit a query.

1. From the **biglake\_table** preview toolbar, click **Query** &gt; **In new tab**.
    
2. Run the following to query the BigLake table through the BigQuery Editor:
    

```sql
SELECT * FROM `qwiklabs-gcp-03-2375345733cc.demo_dataset.biglake_table`
```

3. Click **Run**.
    
4. Verify you can see all of the columns and data in the resulting table.
    

## **Task 5. Set up access control policies**

Once a BigLake table has been created, it can be managed in a similar fashion to BigQuery tables. To create access control policies for BigLake tables, you'll first create a taxonomy of policy tags in [BigQuery](https://cloud.google.com/bigquery/docs/best-practices-policy-tags). Then, apply the policy tags to the sensitive rows or columns. In this section, you will create a column level policy. For directions on setting up row-level security, see the [row-level security guide](https://cloud.google.com/bigquery/docs/managing-row-level-security).

For these purposes, a BigQuery taxonomy named `biglake-taxonomy-yz3cg` and an associated policy tag named **biglake-policy** has been created for you.

### Add policy tags to columns

You will now use the policy tag you created to restrict access to certain columns within the BigQuery table. For this example, you will restrict access to sensitive information such as address, postal code, and phone number.

1. From the Navigation Menu, go to **BigQuery** &gt; **BigQuery Studio**.
    
2. Navigate to **demo-dataset** &gt; **biglake\_table** and click the table to open the table schema page.
    
3. Click **Edit Schema**.
    
4. Check the boxes next to the **address**, **postal\_code**, and **phone** fields.
    

![highlight schema columns](https://cdn.qwiklabs.com/fPOP9dhp51FA%2FeT89SUkWpCJve8NUv3WDVGYLxhRjrs%3D align="left")

5. Click **Add policy tag**.
    
6. Click `biglake-taxonomy-yz3cg` to expand it to select **biglake-policy**.
    

![add policy tag to columns](https://cdn.qwiklabs.com/0W9UaTrGb5IR2ayx4OaWkC2baBZC8TgQZiyxn66vNHY%3D align="left")

7. Click **Select**.
    
    Your columns should now have the policy tags attached to them.
    

![attached policy tags](https://cdn.qwiklabs.com/qwQA8ShY6kZZzTIQwdwDELFFOPLJMaX7uL9wK1bYaUc%3D align="left")

8. Click **Save**.
    
9. Verify your table schema now resembles the following.
    

![table schema updated](https://cdn.qwiklabs.com/M%2F74ylN32%2BKXziYCijm5iCbLgvg7vNC3MuQKyw9M3eA%3D align="left")

**Note:** The warning signs on the columns signal you don't have access to those particular fields based on the security policies in place.

### Verify the column level security

1. Open the query editor for the **biglake\_table**.
    
2. Run the following to query the BigLake table through the BigQuery Editor:
    

```sql
SELECT * FROM `qwiklabs-gcp-03-2375345733cc.demo_dataset.biglake_table`
```

3. Click **Run**.
    
    You should receive an error access denied error:
    

![access denied error](https://cdn.qwiklabs.com/Gz3DfzE9CFOxq7JGwVc0aIoTBwririQRvMRZCnAoRtM%3D align="left")

4. Now, run the following query, omitting the columns you don't have access to:
    

```sql
SELECT *  EXCEPT(address, phone, postal_code)
FROM `qwiklabs-gcp-03-2375345733cc.demo_dataset.biglake_table`
```

The query should run without any issues and return the columns you have access to. This example shows that column level security enforced through BigQuery can also be applied to BigLake tables.

## **Task 6. Upgrade external tables to BigLake tables**

You can upgrade existing tables to BigLake tables by associating the existing table to a cloud resource connection. For a complete list of flags and arguments, see [`bq update`](https://cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_update) and [`bq mkdef`](https://cloud.google.com/bigquery/docs/reference/bq-cli-reference#bq_mkdef).

### Create the external table

1. Click three dots next to **demo\_dataset**, then choose **Create table**.
    
2. Under Source for **Create table from**, choose **Google Cloud Storage**.
    
3. Click **Browse** to select the dataset. Navigate to the bucket named `qwiklabs-gcp-03-2375345733cc` and then `invoice.csv` file to import it into BigQuery, and click **Select**.
    
4. Under **Destination**, verify your lab project has been selected and you're using the **demo\_dataset**.
    
5. For the table name, use `external_table`.
    
6. Set the table type to **External Table**.
    

**Note:** Do not specify a Cloud Resource connection yet.

7. Under **Schema**, enable **Edit as text** and copy and paste the following schema into the text box:
    

```json
[
{
    "name": "invoice_id",
    "type": "INTEGER",
    "mode": "REQUIRED"
  },
  {
    "name": "customer_id",
    "type": "INTEGER",
    "mode": "REQUIRED"
  },
  {
    "name": "invoice_date",
    "type": "TIMESTAMP",
    "mode": "REQUIRED"
  },
  {
    "name": "billing_address",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "billing_city",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "billing_state",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "billing_country",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "billing_postal_code",
    "type": "STRING",
    "mode": "NULLABLE"
  },
  {
    "name": "total",
    "type": "NUMERIC",
    "mode": "REQUIRED"
  }
]
```

8. Click **Create Table**.
    

Click *Check my progress* to verify the objective.

Create the external table

Check my progress

### Update external table to Biglake table

1. Open a new Cloud Shell window and run the following command to generate a new [external table definition](https://cloud.google.com/bigquery/external-table-definition#table-definition) that specifies the connection to use:
    

```apache
export PROJECT_ID=$(gcloud config get-value project)
bq mkdef \
--autodetect \
--connection_id=$PROJECT_ID.US.my-connection \
--source_format=CSV \
"gs://$PROJECT_ID/invoice.csv" > /tmp/tabledef.json
```

2. Verify your table definition has been created:
    

```apache
cat /tmp/tabledef.json
```

3. Get the schema from your table:
    

```apache
bq show --schema --format=prettyjson  demo_dataset.external_table > /tmp/schema
```

4. Update the table using the new external table definition:
    

```apache
bq update --external_table_definition=/tmp/tabledef.json --schema=/tmp/schema demo_dataset.external_table
```

Click *Check my progress* to verify the objective.

Update external table to Biglake table

Check my progress

### Verify the updated table

1. From the Navigation Menu, go to **BigQuery** &gt; **BigQuery Studio**.
    
2. Navigate to **demo-dataset** &gt; and double click **external\_table**.
    
3. Open the **Details** tab.
    
4. Verify under External Data Configuration that the table is now using the proper Connection ID.
    

![external data configuration](https://cdn.qwiklabs.com/raJ%2Fv27i2AJtoUEaenmD81RshuzTZG31CC5NA77c1t8%3D align="left")

Great! You successfully upgraded the existing external table to a BigLake table by associating it to a cloud resource connection.

---

## **Solution of Lab**

%[https://youtu.be/Mysj37ucKCg] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1040/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/BigLake%3A%20Qwik%20Start/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```