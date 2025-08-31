---
title: "Data Catalog: Qwik Start - GSP729"
seoTitle: "Data Catalog: Qwik Start - GSP729"
seoDescription: "Data Catalog is a fully managed, scalable metadata management service within Dataplex.

It offers a simple and easy-to-use search interface for data discove"
datePublished: Mon Aug 26 2024 04:18:01 GMT+0000 (Coordinated Universal Time)
cuid: cm0ahmn3t000a0albcbw3ab0d
slug: data-catalog-qwik-start-gsp729
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750130414917/b8cedf17-d3d2-4587-ac83-eb5c1089885f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1750130470543/f85ec5cd-3e75-4b9c-8095-837fb6378439.png
tags: data-catalog-qwik-start-gsp729, gsp729, data-catalog-qwik-start

---

## **Overview**

[Data Catalog](https://cloud.google.com/data-catalog) is a fully managed, scalable metadata management service within [Dataplex](https://cloud.google.com/dataplex/docs/introduction).

It offers a simple and easy-to-use search interface for data discovery, a flexible and powerful cataloging system for capturing both technical and business metadata, and a strong security and compliance foundation with Cloud Data Loss Prevention (DLP) and Cloud Identity and Access Management (IAM) integrations.

BigQuery is an [enterprise data warehouse](https://cloud.google.com/solutions/bigquery-data-warehouse) that enables super-fast SQL queries using the processing power of Google's infrastructure.

Simply move your data into BigQuery and let us handle the hard work. You can control access to both the project and your data based on your business needs, such as giving others the ability to view or query your data.

### Using Data Catalog

There are two main ways you interact with Data Catalog:

* Searching for data assets that you have access to.
    
* Tagging assets with metadata.
    

### Data Catalog use case

Imagine you are a data engineer in your company. It is your job to ensure all datasets can be easily discovered and used by colleagues, such as data scientists or business analysts. When a new dataset comes in, you annotate it with important information—this could be whether or not it contains PII data, who owns the dataset, how many rows the dataset contains, etc.

You can annotate this information by adding *tags* to your dataset and tables. Data Catalog allows you to create tag templates to let you define what kind of attributes you want to tag. This allows you to easily access, map, and discover pertinent information from your datasets and tables.

### What you will learn

In this lab, you will learn how to:

* Enable the Data Catalog API so that you can use this service in your Google Cloud project.
    
* Create a dataset with BigQuery.
    
* Copy a public New York Taxi table to your dataset.
    
* Create a Data Catalog tag template.
    
* Tag your newly created table with the newly created tags.
    

### Prerequisites

**Note:** Before starting this lab, **log out of your personal or corporate gmail account**, or **run this lab in Incognito**.

This prevents sign-in confusion while the lab is running.

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
    student-04-7eefeb66a687@qwiklabs.net
    ```
    
    Copied!content\_copy
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    bxlEXvvvdYSp
    ```
    
    Copied!content\_copy
    
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-d66c20da3cbb`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-d66c20da3cbb
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

Copied!content\_copy

3. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-7eefeb66a687@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

4. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

Copied!content\_copy

**Output:**

```apache
[core]
project = qwiklabs-gcp-01-d66c20da3cbb
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Enable the Data Catalog API**

1. From the navigation menu, select **APIs and Services** &gt; **Library**.
    
2. In the search bar, enter in `Data Catalog` and select **Google Cloud Data Catalog API**.
    
3. Then click **Enable**.
    

If you run into the following error after trying to enable the Data Catalog API:

![Failed API Enablement error message](https://cdn.qwiklabs.com/oSC5y9rsFbDhvLnXU2zO%2Fn8NSjqlizKwbIVWivzRuik%3D align="left")

1. Click **Close**.
    
2. Refresh your browser tab.
    
3. Click **Enable** again.
    

The Data Catalog API should be successfully enabled:

![Google Cloud Data Catalog window showing the Data Catalog API overview](https://cdn.qwiklabs.com/yVEpGy6MO6IhS7%2B1PMApq5gWRE3qg8K7lgqyym9izHs%3D align="left")

### Open the BigQuery console

1. In the Google Cloud Console, select **Navigation menu** &gt; **BigQuery**.
    

The **Welcome to BigQuery in the Cloud Console** message box opens. This message box provides a link to the quickstart guide and the release notes.

2. Click **Done**.
    

The BigQuery console opens.

## **Task 2. Create a dataset**

1. In the left navigation pane of BigQuery, click on **view actions** next to your project id, then click **CREATE DATASET**.
    

![The View Actions navigation menu, wherein the option Create dataset is highlighted within the project's sub-menu.](https://cdn.qwiklabs.com/h%2FSFGiZwxeQZJFlzxwDWhaKRRF%2FsHHxJctZNL%2FMkzN4%3D align="left")

2. In the **Create Dataset** dialog:
    

* For **Dataset ID**, enter `demo_dataset`
    
* For **Data location**, select `US (multiple regions in United States)`.
    

![The Create dataset page, wherein the Project ID, Dataset ID, and Data location fields are completed.](https://cdn.qwiklabs.com/Gt%2B%2F9TWTxPysVENSPBtBzfdn%2B%2FUo3x2mQLiwkJvhF5w%3D align="left")

3. Then click **Create dataset**.
    

**Note:** You cannot add a description or a label when you create a dataset using the Cloud Console. After the dataset is created, you can add a description and label.

Click *Check my progress* to verify the objective.

Create a dataset

**Check my progress**

## **Task 3. Copy a public New York Taxi table to your dataset.**

1. From the left-hand panel, click **\+ ADD** &gt; **Public datasets**.
    
2. In the search bar, enter in **NYC TLC Trips** and click on the result that appears:
    

![The search results, wherein the NYC TLC Trips tile is highlighted alongside the 'Filter by' menu.](https://cdn.qwiklabs.com/DYybiqAWFQP%2F8arU0nQDOzmRH4CBeS%2B3Tx%2B4wc27Tw0%3D align="left")

For this lab, you will be using a table from this dataset which contains NYC yellow cab trip data from 2018.

3. Click out of the side panel to close it as soon as you're ready to continue.
    
4. Copy the `tlc_yellow_trips_2018` table by running this command in your **Cloud Shell** panel. Click **Authorize**.
    

```apache
bq cp bigquery-public-data:new_york_taxi_trips.tlc_yellow_trips_2018 $(gcloud config get project):demo_dataset.trips
```

Copied!content\_copy

The previous command used the `bq command line tool` to copy the public table into your project and organized it in the `demo_dataset` you created earlier.

5. Refresh your `BigQuery` browser page.
    
6. Confirm that the **trips** table is listed in your `demo_dataset`.
    

![The listed pinned projects, wherein the trips table is listed as a file within the demo_dataset.](https://cdn.qwiklabs.com/0vpdkDAByuWgOsKvZcjJaaRlGC%2BvFwmgXbm%2F%2BOF9IUA%3D align="left")

You will add Data Catalog tags to the table in the next section.

Click *Check my progress* to verify the objective.

Copy a public New York taxi table to your dataset

**Check my progress**

## **Task 4. Create a Data Catalog tag template**

Create a tag template from the Data Catalog UI.

1. Open the **Navigation menu** and click on **Data Catalog &gt; Tag Templates**. Then click **\+ CREATE TAG TEMPLATE**:
    

![The Data Catalog pane, wherein the tag templates option is highlighted, along with the Create template button.](https://cdn.qwiklabs.com/RVHPadp9kRinQa2CE%2FP%2FrKXGh1VeRL%2BkT00IkxkcxA0%3D align="left")

2. Fill in the template form to define a "Demo Tag Template".
    

* **Template display name:** Demo Tag Template
    
* **Template ID:** demo\_tag\_template
    
* **Location:** `europe-west1`
    

Next, create four tag attributes (also called tag "fields").

3. Click **Add a Field**.
    

Create four attributes with the values listed below. Note that the "source" attribute defines a required tag attribute. You can use lower case letters and underscores to define attribute names:

* **Field display name:** Source of data asset
    
* **Field ID:** source\_of\_data\_asset
    
* **Make this field required:** Checked
    
* **Type:** String
    

4. Click **Done**.
    
5. Now click **Add a Field** and enter in:
    

* **Field display name:** Number of rows in data asset
    
* **Field ID:** number\_of\_rows\_in\_data\_asset
    
* **Make this field required:** Not checked
    
* **Type:** Double
    

6. Click **Done**.
    
7. Then click **Add a Field** and enter in:
    

* **Field display name:** Has PII
    
* **Field ID:** has\_pii
    
* **Make this field required:** Not checked
    
* **Type:** Boolean
    

8. Click **Done**.
    
9. Then click **Add a Field** and enter in:
    

* **Field display name:** PII type
    
* **Field ID:** pii\_type
    
* **Make this field required:** Not checked
    
* **Type:** Enumerated
    

10. Add 3 values to this attribute:
    

* Email
    
* Social Security Number
    
* None
    

11. Then click **Done**.
    

The completed tag template form should list the four tag attributes:

![The completed tag template form, along with visibility options and the create and Cancel buttons.](https://cdn.qwiklabs.com/v%2BkPm3vPxDnlQQBbgV7fO82BH2JJlwP39yLg%2Feg%2BLC0%3D align="left")

12. Click **CREATE**.
    

The Data Catalog **Tag template** page displays template details and attributes:

![The completed data catalog, which lists the template details, fields, display names, and types.](https://cdn.qwiklabs.com/ZbNfBxNCgyAPR6bQYzg7HemdKD8VFmtFxxiXa%2FK1V%2Bs%3D align="left")

Click *Check my progress* to verify the objective.

Create a tag template

**Check my progress**

## **Task 5. Tag your table with the newly created tags**

1. To attach a tag to a table in your dataset, click on the Data Catalog icon in the top left corner.
    
2. In Left pane, select **Search** and type `demo_dataset` in the Search box.
    
3. Click **Search**:
    

![The Data Catalog page, with the search term 'demo_dataset' typed in the search bar.](https://cdn.qwiklabs.com/lToVrDaF5Tv3TNlH6X8X8AzWZ18nhGtLvAkdeXc68F4%3D align="left")

The demo\_dataset and the trips table that you copied into the dataset are displayed in the search results.

4. Open the **trips** table by clicking on the name:
    

![The demo_dataset listed along with its specifications and the highlighted trips table.](https://cdn.qwiklabs.com/DtaGCUM8XnE79BMc7DZIMXBL9CM7IKi1aPzr3Nu9Emc%3D align="left")

The **Entry details** page opens.

5. Click **ATTACH TAGS**.
    

![The Entry details page, wherein the Attach tags button is highlighted.](https://cdn.qwiklabs.com/vxzVzlZq3NWjuY8ys3o9%2B99IyiEi2QDll32jgCdwy3M%3D align="left")

6. From the **Attach Tags** dialog, under "Choose what to tag" select `trips` table, and click **Ok**.
    
7. select the **Demo Tag Template** for tag templates.
    
8. Next, insert or select the following values for each tag attribute:
    

* **source\_of\_data\_asset**: tlc\_yellow\_trips\_2018
    
* **pii\_type**: NONE
    

![The Attach Tags page, wherein the Source of data assets and PII type have been selected and filled within the Demo Tag Template.](https://cdn.qwiklabs.com/gbErK282NkxCfhH3AIO5JDf878vJ6LFDVufNWbTQQ7w%3D align="left")

9. Click **Save**.
    
10. Click on `Demo Tag Template` to view the tag attributes listed on the Entry details page.
    

![The Entry details page, which includes the Demo Tag Template's display name, source of data asset, and PII type.](https://cdn.qwiklabs.com/2X3nOUKYH%2Fq14Tx2xKP5A5S7bT3KBOTQmnATZCMDb0I%3D align="left")

Click *Check my progress* to verify the objective.

Attach the tag to your table

---

## Solution of Lab

%[https://youtu.be/NqzKQpTX1rg] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP729/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Data%20Catalog%20Qwik%20Start/techcps729.sh
sudo chmod +x techcps729.sh
./techcps729.sh
```