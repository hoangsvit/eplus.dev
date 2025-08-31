---
title: "Dataflow: Qwik Start - Templates - GSP192"
seoTitle: "Dataflow: Qwik Start - Templates - GSP192"
seoDescription: "In this lab, you learn how to create a streaming pipeline using one of Google's Dataflow templates. More specifically, you use the Pub/Sub to BigQuery templ"
datePublished: Thu Apr 24 2025 08:59:25 GMT+0000 (Coordinated Universal Time)
cuid: cm9v4st3u000p09jv4oou0qy5
slug: dataflow-qwik-start-templates-gsp192
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745484981616/26c62f72-a4b5-4b20-b0cc-2f901d71706b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745485150477/0eaf15be-e923-47d6-acd8-e0100da7a375.png
tags: dataflow-qwik-start-templates-gsp192, dataflow-qwik-start-templates, gsp192

---

## Overview

In this lab, you learn how to create a streaming pipeline using one of [Google's Dataflow templates](https://cloud.google.com/dataflow/docs/templates/provided-templates). More specifically, you use the Pub/Sub to BigQuery template, which reads messages written in JSON from a Pub/Sub topic and pushes them to a BigQuery table. You can find the documentation for this template in the [Get started with Google-provided templates Guide](https://cloud.google.com/dataflow/docs/templates/provided-templates#cloudpubsubtobigquery).

You are given the option to use the Cloud Shell command line or the Cloud console to create the BigQuery dataset and table. **Pick one method to use**, then continue with that method for the rest of the lab. If you want experience using both methods, run through this lab a second time.

### What you'll do

* Create a BigQuery dataset and table
    
* Create a Cloud Storage bucket
    
* Create a streaming pipeline using the Pub/Sub to BigQuery Dataflow template
    

## Setup

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
    student-04-c426f555ac76@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    QFJXoyWrH7az
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

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-6b12446d8944`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-6b12446d8944
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-c426f555ac76@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-04-6b12446d8944
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Ensure that the Dataflow API is successfully re-enabled

To ensure access to the necessary API, restart the connection to the Dataflow API.

1. In the Cloud Console, enter "Dataflow API" in the top search bar. Click on the result for **Dataflow API**.
    
2. Click **Manage**.
    
3. Click **Disable API**.
    

If asked to confirm, click **Disable**.

4. Click **Enable**.
    

When the API has been enabled again, the page will show the option to disable.

**Test completed task**

Click **Check my progress** to verify your performed task.

Disable and re-enable the Dataflow API.

**Check my progress**

## Task 2. Create a BigQuery dataset, BigQuery table, and Cloud Storage bucket using Cloud Shell

Let's first create a BigQuery dataset and table.

**Note:** This task uses the `bq` command-line tool. **Skip down** to Task 3 if you want to complete these steps using the Cloud console.

1. Run the following command to create a dataset called `taxirides`:
    

```apache
bq mk taxirides
```

Your output should look similar to:

```apache
Dataset '<myprojectid:taxirides>' successfully created
</myprojectid:taxirides>
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a BigQuery dataset, you will see an assessment score.

Create a BigQuery Dataset (name: taxirides).

**Check my progress**

Now that you have your dataset created, you'll use it in the following step to instantiate a BigQuery table.

2. Run the following command to do so:
    

```apache
bq mk \
--time_partitioning_field timestamp \
--schema ride_id:string,point_idx:integer,latitude:float,longitude:float,\
timestamp:timestamp,meter_reading:float,meter_increment:float,ride_status:string,\
passenger_count:integer -t taxirides.realtime
```

Your output should look similar to:

```apache
Table 'myprojectid:taxirides.realtime' successfully created
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a table in BigQuery dataset, you will see an assessment score.

Create a table in BigQuery Dataset.

**Check my progress**

On its face, the `bq mk` command looks a bit complicated. However, with some assistance from the [BigQuery command-line documentation](https://cloud.google.com/bigquery/docs/reference/bq-cli-reference), we can break down what's going on here. For example, the documentation tells us a little bit more about **schema**:

* Either the path to a local JSON schema file or a comma-separated list of column definitions in the form `[FIELD]`:`[DATA_TYPE]`, `[FIELD]`:`[DATA_TYPE]`.
    

In this case, we are using the latter—a comma-separated list.

### Create a Cloud Storage bucket using Cloud Shell

Now that we have our table instantiated, let's create a bucket.

Use the Project ID as the bucket name to ensure a globally unique name: `qwiklabs-gcp-04-6b12446d8944`

* Run the following commands to do so:
    

```apache
export BUCKET_NAME=qwiklabs-gcp-04-6b12446d8944
```

```apache
gsutil mb gs://$BUCKET_NAME/
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a Cloud Storage bucket, you will see an assessment score.

Create a Cloud Storage bucket.

**Check my progress**

Once you've made your bucket, scroll down to the **Run the Pipeline** section.

## Task 3. Create a BigQuery dataset, BigQuery table, and Cloud Storage bucket using the Google Cloud console

**Note:** Do not complete Task 3 if you completed Task 2, which includes the same tasks in the command line!

1. From the left-hand menu, in the Big Data section, click on **BigQuery**.
    
2. Then click **Done**.
    
3. Click on the three dots next to your project name under the **Explorer** section, then click **Create dataset**.
    
4. Input `taxirides` as your dataset ID:
    
5. Select **us (multiple regions in United States)** in Data location.
    
6. Leave all of the other default settings in place and click **CREATE DATASET**.
    

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a BigQuery dataset, you will see an assessment score.

Create a BigQuery Dataset (name: taxirides).

**Check my progress**

7. You should now see the `taxirides` dataset underneath your project ID in the left-hand console.
    
8. Click on the three dots next to `taxirides` dataset and select **Open**.
    
9. Then select **CREATE TABLE** in the right-hand side of the console.
    
10. In the **Destination** &gt; **Table Name** input, enter `realtime`.
    
11. Under Schema, toggle the **Edit as text** slider and enter the following:
    

```apache
ride_id:string,point_idx:integer,latitude:float,longitude:float,timestamp:timestamp,
meter_reading:float,meter_increment:float,ride_status:string,passenger_count:integer
```

Your console should look like the following:

![Create table page](https://cdn.qwiklabs.com/LqLoLzf7IkIzwUFthE2fZr5GHTn4W%2BlSQ6YCB58STCI%3D align="left")

12. Now, click **Create table**.
    

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a table in BigQuery dataset, you will see an assessment score.

Create a table in BigQuery Dataset.

**Check my progress**

### Create a Cloud Storage bucket using the Cloud console

1. Go back to the Cloud Console and navigate to **Cloud Storage** &gt; **Buckets** &gt; **Create bucket**.
    
2. Use the Project ID as the bucket name to ensure a globally unique name: `qwiklabs-gcp-04-6b12446d8944`
    
3. Leave all other default settings, then click **Create**.
    

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a Cloud Storage bucket, you will see an assessment score.

Create a Cloud Storage bucket.

**Check my progress**

## Task 4. Run the pipeline

Deploy the Dataflow Template:

```apache
gcloud dataflow jobs run iotflow \
    --gcs-location gs://dataflow-templates-us-east1/latest/PubSub_to_BigQuery \
    --region us-east1 \
    --worker-machine-type e2-medium \
    --staging-location gs://qwiklabs-gcp-04-6b12446d8944/temp \
    --parameters inputTopic=projects/pubsub-public-data/topics/taxirides-realtime,outputTableSpec=qwiklabs-gcp-04-6b12446d8944:taxirides.realtime
```

In the **Google Cloud Console**, on the **Navigation menu**, click **Dataflow &gt; Jobs**, and you will see your dataflow job.

Please refer the [document](https://cloud.google.com/sdk/gcloud/reference/dataflow/jobs/run) for more information.

**Note:** You may need to wait a minute for the activity tracking to complete.

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully run the Dataflow pipeline, you will see an assessment score.

Run the Pipeline.

**Check my progress**

You'll watch your resources build and become ready for use.

Now, let's go view the data written to BigQuery by clicking on **BigQuery** found in the Navigation menu.

* When the BigQuery UI opens, you'll see the **taxirides** dataset added under your project name and **realtime** table underneath that.
    

**Note:** You may have to wait a few minutes for the data to populate in the BigQuery table.

## Task 5. Submit a query

You can submit queries using standard SQL.

1. In the BigQuery **Editor**, add the following to query the data in your project:
    

```apache
SELECT * FROM `qwiklabs-gcp-04-6b12446d8944.taxirides.realtime` LIMIT 1000
```

2. Now click **RUN**.
    

If you run into any issues or errors, run the query again (the pipeline takes a minute to start up.)

3. When the query runs successfully, you'll see the output in the **Query Results** panel as shown below:
    

![Query results page](https://cdn.qwiklabs.com/JIACp2MGHfBDfVaUOojawE0nqwdx18el4zjgmqABSuc%3D align="left")

Great work! You just pulled 1000 taxi rides from a Pub/Sub topic and pushed them to a BigQuery table. As you saw firsthand, templates are a practical, easy-to-use way to run Dataflow jobs. Be sure to check out, in the Dataflow Documentation, some other Google Templates in the [Get started with Google-provided templates Guide](https://cloud.google.com/dataflow/docs/templates/provided-templates).

## Task 6. Test your understanding

Below are multiple choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

**Google Cloud Dataflow supports batch processing.**

* True
    
* False
    

**Which Dataflow Template used in the lab to run the pipeline?**

* Bulk Compress Cloud Storage Files
    
* Cloud Storage Text to BigQuery
    
* Pub/Sub to BigQuery
    

---

## Solution of Lab

%[https://youtu.be/TKEbg5MUZCU] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP192/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Dataflow%3A%20Qwik%20Start%20Templates/techcps192.sh
sudo chmod +x techcps192.sh
./techcps192.sh
```