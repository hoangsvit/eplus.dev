---
title: "Getting Started with Cloud Data Fusion (Solution)"
seoDescription: "This lab teaches you how to create a Data Fusion instance and deploy a sample pipeline that's provided. The pipeline reads a JSON file containing NYT bestse"
datePublished: Sun Jan 19 2025 09:39:46 GMT+0000 (Coordinated Universal Time)
cuid: cm63ferxp000209jv4mc26mb0
slug: getting-started-with-cloud-data-fusion-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737279338156/5e4e19cb-5503-49f2-9929-e039087b3192.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1737279578147/d30cfdce-e45b-4303-95cb-fca7d6cb3afd.png
tags: getting-started-with-cloud-data-fusion-solution, getting-started-with-cloud-data-fusion

---

## **Overview**

This lab teaches you how to create a Data Fusion instance and deploy a sample pipeline that's provided. The pipeline reads a JSON file containing NYT bestseller data from Cloud Storage. The pipeline then runs transformations on the file to parse and clean the data. And finally loads a subset of the records into BigQuery.

### Objectives

In this lab you will learn to:

* Create a Data Fusion instance
    
* Deploy a sample pipeline that runs some transformations on a JSON file and filter out matching results into BigQuery
    

## **Setup**

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Sign in to Qwiklabs using an **incognito window**.
    
2. Note the lab's access time (for example, `1:15:00`), and make sure you can finish within that time.  
    There is no pause feature. You can restart if needed, but you have to start at the beginning.
    
3. When ready, click **Start lab**.
    
4. Note your lab credentials (**Username** and **Password**). You will use them to sign in to the Google Cloud Console.
    
5. Click **Open Google Console**.
    
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts.  
    If you use other credentials, you'll receive errors or **incur charges**.
    
7. Accept the terms and skip the recovery resource page.
    

<aside><p><strong>Note:</strong><span> </span>Do not click<span> </span><strong>End Lab</strong><span> </span>unless you have finished the lab or want to restart it. This clears your work and removes the project.</p></aside>

### Log in to Google Cloud Console

1. Using the browser tab or window you are using for this lab session, copy the **Username** from the **Connection Details** panel and click the **Open Google Console** button.
    

**Note:** If you are asked to choose an account, click **Use another account**.

2. Paste in the **Username**, and then the **Password** as prompted.
    
3. Click **Next**.
    
4. Accept the terms and conditions.
    

Since this is a temporary account, which will last only as long as this lab:

* Do not add recovery options
    
* Do not sign up for free trials
    

5. Once the console opens, view the list of services by clicking the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) at the top-left.
    

![Navigation menu](https://cdn.qwiklabs.com/RIuVVYUkGtVaWhxtIFJugxyy%2FORWQYw7OrLR0bJlReI%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that contains development tools. It offers a persistent 5-GB home directory and runs on Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources. `gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab completion.

1. Click the **Activate Cloud Shell** button () at the top right of the console.
    
2. Click **Continue**.  
    It takes a few moments to provision and connect to the environment. When you are connected, you are also authenticated, and the project is set to your *PROJECT\_ID*.
    

#### **Sample commands**

* List the active account name:
    

```apache
gcloud auth list
```

(Output)

```apache
Credentialed accounts:
 - <myaccount>@<mydomain>.com (active)
```

(Example output)

```apache
Credentialed accounts:
 - google1623327_student@qwiklabs.net
```

* List the project ID:
    

```apache
gcloud config list project
```

(Output)

```apache
[core]
project = <project_ID>
```

(Example output)

```apache
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** Full documentation of **gcloud** is available in the [gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Check project permissions

Before you begin working on Google Cloud, you must ensure that your project has the correct permissions within Identity and Access Management (IAM).

1. In the Google Cloud console, on the **Navigation menu** (), click **IAM & Admin** &gt; **IAM**.
    
2. Confirm that the default compute Service Account `{project-number}-compute@developer.gserviceaccount.com` is present and has the `editor` role assigned. The account prefix is the project number, which you can find on **Navigation menu** &gt; **Cloud overview**.
    

![Default compute service account](https://cdn.qwiklabs.com/SMuu68pzAXGA%2F%2FgiwoeYr02rez30D0rBU8FvkNAciFM%3D align="left")

If the account is not present in IAM or does not have the `editor` role, follow the steps below to assign the required role.

1. In the Google Cloud console, on the **Navigation menu**, click **Cloud overview**.
    
2. From the **Project info** card, copy the **Project number**.
    
3. On the **Navigation menu**, click **IAM & Admin** &gt; **IAM**.
    
4. At the top of the **IAM** page, click **Add**.
    
5. For **New principals**, type:
    

```apache
{project-number}-compute@developer.gserviceaccount.com
```

Replace `{project-number}` with your project number.

6. For **Select a role**, select **Basic** (or Project) &gt; **Editor**.
    
7. Click **Save**.
    

## **Task 1. Enable Cloud Data Fusion API**

1. In the Cloud console, from the **Navigation menu**, select **APIs & Services &gt; Library**.
    
2. In the search box, type **fusion** to find the **Cloud Data Fusion API** and click on the hyperlink.
    
3. Click **Enable** if necessary.
    

## **Task 2. Create a Cloud Data Fusion instance**

1. In the Cloud console, from the **Navigation menu** click **View All Products** under **Analytics** select **Data Fusion**.
    
2. Click the **Create an Instance** link at the top of the section to create a Cloud Data Fusion instance.
    
3. In the **Create Data Fusion instance** page that loads:
    

a. Enter a name for your instance (like `cdf-lab-instance`). For region select `us-central1`.

b. Under **Edition**, select **Basic**

c. Click **Grant Permission** if required.

d. Click on the dropdown icon next to **Advanced Options**, under **Logging and monitoring**, check the checkbox for **Enable Stackdriver logging service**

e. Leave all other fields as-is, then click **Create**.

Click **Check my progress** to verify the objective.

Create a cloud data fusion instance

Check my progress

**Note:** Creation of the instance takes **around 10 minutes**. While you're waiting, please watch this presentation on Cloud Data Fusion from Next '19 starting at the 15:31 time stamp. Come back and check on your instance every now and then, you can finish watching the video after the lab is completed.

**Note:** Remember, this lab has a time limit, and you will lose your work when the time runs out.

Next, you will grant permissions to the service account associated with the instance, using the following steps.

4. Click on the instance name. On the Instance details page copy the **Dataproc Service Account** to your clipboard.
    

![Service Account highlighted on the Instance details page](https://cdn.qwiklabs.com/Wk0M8pwcX4J4zddmi%2B2NGZw9N4oo8PMRdF08ODUrL4M%3D align="left")

5. In the Cloud console navigate to the **IAM & Admin &gt; IAM**.
    
6. On the IAM Permissions page, click **+Grant Access**.
    
7. In the New principals field paste the service account.
    
8. Click into the Select a role field and start typing **Cloud Data Fusion API Service Agent**, then select it.
    
9. Click **Save**.
    

Click **Check my progress** to verify the objective.

Add Cloud Data Fusion API Service Agent role to service account

Check my progress

## **Task 3. Navigate the Cloud Data Fusion UI**

When using Cloud Data Fusion, you use both the Cloud console and the separate Cloud Data Fusion UI.

* In the Cloud console, you can create and delete Cloud Data Fusion instances, and view Cloud Data Fusion instance details.
    
* In the Cloud Data Fusion web UI, you can use the various pages, such as **Pipeline Studio** or **Wrangler**, to use Cloud Data Fusion functionality.
    

To navigate the Cloud Data Fusion UI, follow these steps:

1. In the Cloud console return to **Navigation menu** &gt; **Data Fusion**.
    
2. Click the **View Instance** link next to your Data Fusion instance. Select your lab credentials to sign in, if required.
    

![Highlighted View Instance link](https://cdn.qwiklabs.com/VEcWYtUEKcc3zx9JzLcTxIp0lFLAtLyOVuzHuJuR4sg%3D align="left")

3. If prompted to take a tour of the service click on **No, Thanks**. You should now be in the Cloud Data Fusion UI.
    
4. Notice that the Cloud Data Fusion web UI comes with its own navigation panel (on the left) to navigate to the page you need.
    

## **Task 4. Deploy a sample pipeline**

Sample pipelines are available through the Cloud Data Fusion **Hub**, which allows you to share reusable Cloud Data Fusion pipelines, plugins, and solutions.

1. In the Cloud Data Fusion web UI, click **HUB** on the top right.
    

![Highlighted HUB link](https://cdn.qwiklabs.com/L%2FsbuTy4UgnAWPS%2Bo2tYtD2NdXO2bzXjIGRKLL3bswc%3D align="left")

2. In the left panel, click **Pipelines**.
    
3. Click the **Cloud Data Fusion Quickstart** pipeline, and then click **Create** on the popup that appears.
    

![Highlighted Cloud Data Fusion Quickstart tile on the Pipelines page](https://cdn.qwiklabs.com/Q7tlfo3qksHNYYDRSBcR9QtLuzxy24VdmboAKchaq4c%3D align="left")

4. In the Cloud Data Fusion Quickstart configuration panel, click **Finish**.
    
5. Click **Customize Pipeline**. A visual representation of your pipeline appears in the Pipeline Studio, which is a graphical interface for developing data integration pipelines. Available pipeline plugins are listed on the left, and your pipeline is displayed on the main canvas area. You can explore your pipeline by holding the pointer over each pipeline node and clicking the **Properties** button that appears. The Properties menu for each node allows you to view the objects and operations associated with the node.
    

**Note:** A node in a pipeline is an object that is connected in a sequence to produce a Directed Acyclic Graph. E.g. Source, Sink, Transform, Action, etc.

![Pipeline Studio displaying a visial representation of the pipeline](https://cdn.qwiklabs.com/JCNwTPwQmFi9I2kIOQ8b2QFC316qOgHBnwQA%2FpdVzNA%3D align="left")

6. In the top right menu, click **Deploy**. This submits the pipeline to Cloud Data Fusion. You will execute the pipeline in the next section.
    

![Deploy icon](https://cdn.qwiklabs.com/Z8wNi155oC79uXnMHez6ceuvxAAxjpXAeWLVi5Ep%2BmQ%3D align="left")

## **Task 5. View your pipeline**

The deployed pipeline appears in the pipeline details view, where you can do the following:

* View the pipeline's structure and configuration.
    
* Run the pipeline manually or set up a schedule or a trigger.
    
* View a summary of the pipeline's historical runs, including execution times, logs, and metrics.
    

![Pipeline details view](https://cdn.qwiklabs.com/lbMrxrLJlChNzzi%2Fcm6PgMHdEsyY1waEaf21s0vyjMo%3D align="left")

## **Task 6. Execute your pipeline**

1. In the pipeline details view, click on **Run** in the top center to execute your pipeline.
    

**Note:** When executing a pipeline, Cloud Data Fusion provisions an ephemeral Dataproc cluster, executes the pipeline on the cluster using Apache Hadoop MapReduce or Apache Spark, and then deletes the cluster. When the pipeline transitions to the Running state, you can monitor the Dataproc cluster creation and deletion. This cluster only exists for the duration of the pipeline.

2. After a few minutes, the pipeline finishes. The pipeline Status changes to **Succeeded** and the number of records processed by each node is displayed.
    

![Finished pipeline with success status and number of records processed by each node](https://cdn.qwiklabs.com/Abv7JZ3yr4xs%2B107yWFVe6VgpbH%2FnTdYRfoodq%2BW%2Bao%3D align="left")

Click **Check my progress** to verify the objective.

Deploy and execute a sample pipeline

Check my progress

## **Task 7. View the results**

The pipeline writes output into a BigQuery table. You can verify that using the following steps.

1. Click to open [this link to the BigQuery UI in Cloud console](https://console.cloud.google.com/bigquery) or right-click on the console tab and select **Duplicate**, then use the **Navigation menu** to select **BigQuery**.
    
2. In the left pane, click your `Project ID` (it will start with `qwiklabs`).
    
3. Under the **GCPQuickstart** dataset in your project, click the **top\_rated\_inexpensive** table, then run a simple query, such as:
    

```apache
SELECT * FROM `qwiklabs-gcp-02-71446059d2cd.GCPQuickStart.top_rated_inexpensive` LIMIT 10
```

![Query results](https://cdn.qwiklabs.com/zrgZx9Z29awXAJDWqflZB58jxo3Dhtsd%2B%2BmNHGj9Yec%3D align="left")

Click **Check my progress** to verify the objective.

View the result

---

## Solution of Lab

%[https://www.youtube.com/watch?v=sVRmO8cMw9k]