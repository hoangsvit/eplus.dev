---
title: "Create and Manage Cloud Spanner Instances: Challenge Lab - GSP381"
seoTitle: "Create and Manage Cloud Spanner Instances: Challenge Lab - GSP381"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-08-17T02:48:14.651Z
cuid: cmswmwd2400000ahrbaejacwh
slug: create-and-manage-cloud-spanner-instances-challenge-lab-gsp381
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/c8fb9624-06ed-4596-bee5-9e6bfac2bfc0.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/615aaaa6-8ced-45ae-a63c-f8ff1f059aad.png
tags: create-and-manage-cloud-spanner-instances-challenge-lab-gsp381, create-and-manage-cloud-spanner-instances-challenge-lab, gsp381

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Create and Manage Cloud Spanner Instances](https://www.skills.google/course_templates/643) skill badge. Are you ready for the challenge?

### Topics tested

*   Create a Cloud Spanner instance.
    
*   Create a Cloud Spanner database.
    
*   Create a table in your database.
    
*   Load simple datasets into tables
    
*   Load a complex dataset.
    
*   Add a new column to an existing table.
    

### Target audience

The content of this challenge lab will be most applicable to Cloud Spanner Database Administrators. This lab is designed to test the abilities of students who have completed the Create and Manage Cloud Spanner Databases course.

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1.  Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the right is the **Lab setup and access** panel with the following:  
    \- The **Open Google Cloud console** button  
    \- The temporary credentials (username and password) that you must use for this lab  
    \- Other information, if needed, to step through this lab  
    Note that the lab timer is located near the top of the page, showing the remaining time.
    
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```plaintext
    student-03-bfcda8c0185d@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the **Lab setup and access** panel.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    WAjKoi4QKduG
    ```
    
    Copied!
    
    You can also find the Password in the **Lab setup and access** panel.
    
6.  Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7.  Click through the subsequent pages:Accept the terms and conditions.
    
    *   Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    *   Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="center")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1.  Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="center")
    
    at the top of the Google Cloud console.
    
2.  Click through the following windows:  
    Continue through the Cloud Shell information window.
    
3.  Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-63d4a540afb0`. The output contains a line that declares the **Project\_ID** for this session:

```plaintext
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-63d4a540afb0
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3.  (Optional) You can list the active account name with this command:
    

```plaintext
gcloud auth list
```

4.  Click **Authorize**.
    

**Output:**

```plaintext
ACTIVE: *
ACCOUNT: student-03-bfcda8c0185d@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5.  (Optional) You can list the project ID with this command:
    

```plaintext
gcloud config list project
```

Copied!

**Output:**

```plaintext
[core]
project = qwiklabs-gcp-03-63d4a540afb0
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Challenge Scenario**

In your role as the corporate Database Administrator, you have been tasked with standing up a new Cloud Spanner database for your company's Banking Operations group. You have been provided a list specifcations for this database related to tables datasets to load.

## **Task 1. Create a Cloud Spanner instance**

1.  Your first task is to create an instance.
    
2.  You may complete this step using the Cloud Console or the gcloud CLI.
    
3.  Your instance must have following attributes:
    

| **Item** | **Value** |
| --- | --- |
| Name | **banking-ops-instance** |
| Region | `us-east1` |
| Allocate Compute Capacity | **Unit - Nodes // Quantity - 1** |

An example gcloud CLI command to create an instance is as follows:

```plaintext
gcloud spanner instances create my-sample-instance \
--config=regional-us-east1 \
--description="Sample Instance" \
--nodes=1 \
--labels=env=dev
```

**Note:** Resource labels (e.g., `--labels=env=dev`) are optional key-value pairs that help organize and filter Google Cloud resources.

4.  Click **Check my progress** to verify the objective.
    

## **ask 2. Create a Cloud Spanner database**

1.  Your next task is to create a database.
    
2.  You may complete this step using the Cloud Console or the gcloud CLI.
    
3.  Your database must have following attribute:
    

| **Item** | **Value** |
| --- | --- |
| Name | **banking-ops-db** |

An example gcloud CLI command to create a database is as follows:

```plaintext
gcloud spanner databases create my-sample-db \
--instance=my-sample-instance
```

**Tip:** For interactive SQL workflows and database testing, you can use the Spanner CLI directly from Cloud Shell:  
`gcloud spanner cli banking-ops-db --instance=banking-ops-instance`

4.  Click **Check my progress** to verify the objective.
    

Create a database

## **Task 3. Create tables in your database**

1.  Your database must have a total of four (4) tables - **Portfolio**, **Category**, **Product**, and **Customer**.
    
2.  The tables must be defined as listed below.
    

An example DDL command to create a table is as follows:

```plaintext
CREATE TABLE Sample (
  SampleId INT64 NOT NULL,
  SampleName STRING(MAX)
) PRIMARY KEY (SampleId); 
```

Table: **Portfolio**

Primary Key: **PortfolioId**

| **Column** | **Datatype** |
| --- | --- |
| PortfolioId | INT64 NOT NULL |
| Name | STRING(MAX) |
| ShortName | STRING(MAX) |
| PortfolioInfo | STRING(MAX) |

  

Table: **Category**

Primary Key: **CategoryId**

| **Column** | **Datatype** |
| --- | --- |
| CategoryId | INT64 NOT NULL |
| PortfolioId | INT64 NOT NULL |
| CategoryName | STRING(MAX) |
| PortfolioInfo | STRING(MAX) |

  

Table: **Product**

Primary Key: **ProductId**

| **Column** | **Datatype** |
| --- | --- |
| ProductId | INT64 NOT NULL |
| CategoryId | INT64 NOT NULL |
| PortfolioId | INT64 NOT NULL |
| ProductName | STRING(MAX) |
| ProductAssetCode | STRING(25) |
| ProductClass | STRING(25) |

  

Table: **Customer**

Primary Key: **CustomerId**

| **Column** | **Datatype** |
| --- | --- |
| CustomerId | STRING(36) NOT NULL |
| Name | STRING(MAX) NOT NULL |
| Location | STRING(MAX) NOT NULL |

## **Task 4. Load simple datasets into tables**

1.  Three of your tables, **Portfolio**, **Category**, and **Product**, will be loaded with simple, low-volume datasets.
    
2.  You may employ any method to load these tables.
    

**Note:** The data elements provided are ordered to match the order of the columns of the corresponding table.

An example DML command to load a single row into a table is as follows:

```plaintext
INSERT INTO
  Sample (SampleId, SampleName)
VALUES 
  (1, "Banking"); 
```

Table: **Portfolio**

```plaintext
1, "Banking", "Bnkg", "All Banking Business"
2, "Asset Growth", "AsstGrwth", "All Asset Focused Products"
3, "Insurance", "Insurance", "All Insurance Focused Products"
```

Copied!

Table: **Category**

```plaintext
1,1,"Cash"
2,2,"Investments - Short Return"
3,2,"Annuities"
4,3,"Life Insurance"
```

Copied!

Table: **Product**

```plaintext
 1,1,1,"Checking Account","ChkAcct","Banking LOB"
 2,2,2,"Mutual Fund Consumer Goods","MFundCG","Investment LOB"
 3,3,2,"Annuity Early Retirement","AnnuFixed","Investment LOB"
 4,4,3,"Term Life Insurance","TermLife","Insurance LOB"
 5,1,1,"Savings Account","SavAcct","Banking LOB"
 6,1,1,"Personal Loan","PersLn","Banking LOB"
 7,1,1,"Auto Loan","AutLn","Banking LOB"
 8,4,3,"Permanent Life Insurance","PermLife","Insurance LOB"
 9,2,2,"US Savings Bonds","USSavBond","Investment LOB"
```

Copied!

3.  Click each **Check my progress** to verify the objectives.
    

## **Task 5. Load a complex dataset**

1.  You will load the **Customer** table with a much larger set of data.
    
2.  A file named **Customer\_List\_500.csv** contains 500 rows of data and is located in the following public Cloud Storage bucket. You may reference or download it as necessary.
    

**Cloud Storage URI**

```plaintext
gs://spls/gsp381/Customer_List_500.csv 
```

HTTP URL

```plaintext
https://storage.googleapis.com/spls/gsp381/Customer_List_500.csv
```

3.  You may recall from the lab **Cloud Spanner - Loading Data and Performing Backups** that a few options exist to load larger datasets. These include using Dataflow or a client library in Batch mode. You may choose to create simple insert statements. The decision is yours but you **must** load all 500 rows.
    
4.  Utilize any method that you prefer to load the 500 row datafile. Some methods will require edits to the datafile which will require downloading it to your local machine. Please be sure to make a backup file if you choose that option.
    
5.  **Note**: If you use Dataflow, ensure that you specify the `us-east1` Regional Endpoint and reset the Dataflow API via the following gcloud command:
    

```plaintext
gcloud services disable dataflow.googleapis.com --force
gcloud services enable dataflow.googleapis.com
```

Copied!

6.  Also if you use a Dataflow template you will be required to provide a manifest file named **manifest.json**. Below is a sample **manifest.json** that you can use to guide creation of a file appropriate for loading the **Customer** table.
    

**Note:** This sample **cannot be used as is**, you must update it accordingly.

Note:

```plaintext
{
    "tables": [
        {
            "table_name": "TABLE_NAME",
            "file_patterns": [
                "gs://BUCKET/FOLDER/FILENAME.SUFFIX"
            ],
            "columns": [
                {"column_name" : "UPDATE_COLUMN1", "type_name" : "UPDATE_DATATYPE" },
                {"column_name" : "UPDATE_COLUMN2", "type_name" : "UPDATE_DATATYPE" },
                {"column_name" : "UPDATE_COLUMN3", "type_name" : "UPDATE_DATATYPE" }
            ]
        }
    ]
}
```

7.  Click **Check my progress** to verify the objective.
    

## **Task 6. Add a new column to an existing table**

1.  As part of your DBA responsibilities you are required to add a new column called **MarketingBudget** to the **Category** table.
    
2.  The column **MarketingBudget** must have a datatype of **INT64**.
    
3.  Adding a new column is accomplished by a DDL command. You may issue the DDL via a gcloud command, the Cloud Console, or client library call.
    

An example gcloud CLI command to add a column to a table is as follows:

```plaintext
gcloud spanner databases ddl update my-sample-db \
--instance=my-sample-instance \
--ddl='ALTER TABLE Sample ADD COLUMN SampleValue INT64;'
```

4.  Click **Check my progress** to verify the objective.
    

* * *

## Solution of Lab

### Quick

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP381/lab.sh
source lab.sh
```

* * *

### Other Solution

%[https://www.youtube.com/watch?v=AKNHRhSp-L4] 

```plaintext
export REGION=
```

```plaintext
curl -LO raw.githubusercontent.com/imharshtiwari/2-Minutes-GCP-Lab-Solutions/main/Create%20and%20Manage%20Cloud%20Spanner%20Instances%20Challenge%20Lab/gsp381.sh

sudo chmod +x gsp381.sh

./gsp381.sh
```

*   Go to `Dataflow Job` from [here](https://console.cloud.google.com/dataflow/jobs?)
    

* * *

### Manual

%[https://www.youtube.com/watch?v=RFC2-8eICZY]