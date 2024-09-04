---
title: "Loading Data into Cloud SQL - GSP196"
seoTitle: "Loading Data into Cloud SQL - GSP196"
seoDescription: "In this lab, you import data from CSV text files into Cloud SQL and then carry out some basic data analysis using simple queries."
datePublished: Wed Sep 04 2024 08:06:39 GMT+0000 (Coordinated Universal Time)
cuid: cm0nkrbou000008l85sxo3x7o
slug: loading-data-into-cloud-sql-gsp196
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1725436429589/436c9031-124a-4999-bb99-eca0fc415a53.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1725437175816/0c3dd039-213f-420f-ab62-585d0e1ac426.jpeg
tags: loading-data-into-cloud-sql-gsp196, gsp196

---

## **Overview**

In this lab, you import data from CSV text files into Cloud SQL and then carry out some basic data analysis using simple queries.

The dataset used in this lab comes from the [US Bureau of Transport Statistics](https://www.bts.gov/) and contains historical information about internal flights in the United States. This dataset can be used to demonstrate a wide range of data science concepts and techniques.

### Objectives

* Create Cloud SQL instance
    
* Create a Cloud SQL database
    
* Import text data into Cloud SQL
    
* Build an initial data model using queries
    

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
    student-00-91faa469d17d@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    CJ8ysJFgBV1u
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-3517c6e918a4`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-3517c6e918a4
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
ACCOUNT: student-00-91faa469d17d@qwiklabs.net

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
project = qwiklabs-gcp-00-3517c6e918a4
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Prepare your environment**

This lab uses a set of code samples and scripts developed for the *Data Science on the Google Cloud Platform, 2nd Edition* book from O'Reilly Media, Inc. It covers the configuration of Cloud SQL and importing data tasks covered in the first part of Chapter 3, "Creating Compelling Dashboards". You clone the sample repository used in Chapter 2 from Github to the Cloud Shell and carry out all of the lab tasks from there.

### Clone the Data Science on Google Cloud repository

1. In Cloud Shell enter the following commands to clone the repository:
    

```apache
git clone \
   https://github.com/GoogleCloudPlatform/data-science-on-gcp/
```

2. Change to the repository directory:
    

```apache
cd data-science-on-gcp/03_sqlstudio
```

3. Create the environment variables used later in the lab for your project ID and the storage bucket that contains your data:
    

```apache
export PROJECT_ID=$(gcloud info --format='value(config.project)')
export BUCKET=${PROJECT_ID}-ml
```

4. Enter following command to stage the file into Cloud Storage bucket:
    

```apache
gsutil cp create_table.sql \
    gs://$BUCKET/create_table.sql
```

## **Task 2. Create a Cloud SQL instance**

1. Enter the following commands to create a Cloud SQL instance:
    

```apache
gcloud sql instances create flights \
    --database-version=POSTGRES_13 --cpu=2 --memory=8GiB \
    --region=us-central1 --root-password=Passw0rd
```

This takes a few minutes to complete.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a Cloud SQL instance, you will see an assessment score.

Create a Cloud SQL instance.

**Check my progress**

2. Create an environment variable with the Cloud Shell IP address:
    

```apache
export ADDRESS=$(curl -s http://ipecho.net/plain)/32
```

3. Allowlist the Cloud Shell instance for management access to your SQL instance:
    

```apache
gcloud sql instances patch flights --authorized-networks $ADDRESS
```

4. When prompted press, Y to accept the change.
    

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully allowlisted Cloud Shell to access the SQL instance, you will see an assessment score.

Allowlist the Cloud Shell instance to access your SQL instance.

**Check my progress**

### Create database and table

To import data into a Postgres table, you first create an empty database and a table with the correct schema.

1. In the Cloud Console, on the **Navigation menu** (), click **SQL**.
    
2. To open the Overview page of an instance, click the instance name `flights`.
    
3. Select **Databases** from the SQL navigation menu on the left.
    
4. Click **Create database**.
    
5. In the New database dialog, name the database `bts`.
    
6. Click **Create**.
    
7. To open the Overview page of an instance, select **Overview** from the SQL navigation menu.
    
8. Click **IMPORT** on the top.
    
9. In the Cloud Storage file field, click **Browse**.
    
10. In the Buckets section, click the arrow opposite your bucket name.
    
11. Select the file `create_table.sql`.
    
12. Click **Select**.
    
13. In the **File format** section, select SQL.
    
14. Specify the Database `bts` in your Cloud SQL instance.
    
15. Click **Import** start the import.
    

A few seconds later, the empty table will be created.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a bts database and flights table using the create\_table.sql file, you will see an assessment score.

Create a bts database and flights table using the create\_table.sql file.

**Check my progress**

## **Task 3. Add data to a Cloud SQL instance**

You created the empty database and table, now load the CSV files into this table. Loading the January data by browsing to 201501.csv in your bucket and specifying CSV as the format, bts as the database, and flights as the table.

1. In your Cloud SQL instance page, click **IMPORT**.
    
2. In the Cloud Storage file field, click **Browse**, and then click the arrow opposite your bucket name, and then click `201501.csv`.
    
3. Click **Select**.
    
4. Select **CSV** as File format.
    
5. Select the `bts` database and type in `flights` as your table.
    
6. Click **IMPORT**.
    

## **Task 4. Interact with the database**

1. Connect to the Cloud SQL instance from Cloud Shell using:
    

```apache
gcloud sql connect flights --user=postgres
```

2. When prompted for a password enter `Passw0rd`. You may not see the letters as you type.
    
3. In the prompt that comes up, connect to the bts database:
    

```apache
\c bts;
```

4. When prompted for a password enter `Passw0rd`.
    
5. Then, run a query to obtain the 5 busiest airports:
    

```sql
SELECT "Origin", COUNT(*) AS num_flights 
FROM flights GROUP BY "Origin" 
ORDER BY num_flights DESC 
LIMIT 5;
```

While this query is performant because the dataset is relatively small (only January!), the database will slow as you add more months.

Relational databases are suited to smallish datasets on which you perform ad hoc queries that return a small a subset of the data. For larger datasets, you tune the performance of a relational database by indexing the columns of interest. Further, because relational databases typically support transactions and guarantee strong consistency, they are an excellent choice for data that will be updated often.

However, a relational database is a poor choice if:

* Your data is primarily read-only
    
* If your dataset sizes go into the terabyte range
    
* You have a need to scan the full table (such as to compute the maximum value of a column) or if your data streams in at high rates.
    

This describes the flight delay use case. For this case you would switch from a relational database to an analytics data warehouse – BigQuery. The analytics data warehouse will allow us to use SQL and is much more capable of dealing with large datasets and ad hoc queries (i.e. doesn’t need the columns to be indexed).

---

## Solution of Lab

%[https://www.youtube.com/watch?v=oHe4B6fTIq8] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725436755754/8f6451b4-2661-42d2-b63d-e699fb0e02f9.png align="center")

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/main/labs/GSP196/lab.sh
sudo chmod +x lab.sh
./lab.sh
```