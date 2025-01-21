---
title: "Prepare Data for ML APIs on Google Cloud: Challenge Lab - GSP323"
seoTitle: "Prepare Data for ML APIs on Google Cloud: Challenge Lab - GSP323"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Tue Jan 21 2025 06:27:33 GMT+0000 (Coordinated Universal Time)
cuid: cm663faw8000808l7fvxnhals
slug: prepare-data-for-ml-apis-on-google-cloud-challenge-lab-gsp323
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737439848316/024e96cb-ba4e-44d7-9553-5b3389c1a7dd.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1737440836952/58cfc8e4-b9b6-4c30-8425-b0521f4137fc.png
tags: prepare-data-for-ml-apis-on-google-cloud-challenge-lab-gsp323, prepare-data-for-ml-apis-on-google-cloud-challenge-lab, gsp323

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Prepare Data for ML APIs on Google Cloud](https://www.cloudskillsboost.google/course_templates/631) skill badge. Are you ready for the challenge?

Topics tested:

* Create a simple Dataproc job
    
* Create a simple DataFlow job
    
* Perform two Google machine learning backed API tasks
    

## **Setup**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

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
    student-01-8243e3d89a68@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    iEVRca9Vv3UT
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

### Check project permissions

Before you begin your work on Google Cloud, you need to ensure that your project has the correct permissions within Identity and Access Management (IAM).

1. In the Google Cloud console, on the **Navigation menu** , select **IAM & Admin** &gt; **IAM**.
    
2. Confirm that the default compute Service Account `{project-number}-compute@developer.gserviceaccount.com` is present and has the `editor` and `storage.admin` role assigned. The account prefix is the project number, which you can find on **Navigation menu &gt; Cloud Overview &gt; Dashboard**.
    

**Note:** If the account is not present in IAM or does not have the `storage.admin` role, follow the steps below to assign the required role.

1. In the Google Cloud console, on the **Navigation menu**, click **Cloud Overview &gt; Dashboard**.
    
2. Copy the project number (e.g. `729328892908`).
    
3. On the **Navigation menu**, select **IAM & Admin** &gt; **IAM**.
    
4. At the top of the roles table, below **View by Principals**, click **Grant Access**.
    
5. For **New principals**, type:
    

```apache
  {project-number}-compute@developer.gserviceaccount.com
```

6. Replace `{project-number}` with your project number.
    
7. For **Role**, select **Storage Admin**.
    
8. Click **Save**.
    

## **Challenge scenario**

As a junior data engineer in Jooli Inc. and recently trained with Google Cloud and a number of data services you have been asked to demonstrate your newly learned skills. The team has asked you to complete the following tasks.

You are expected to have the skills and knowledge for these tasks so don’t expect step-by-step guides.

## **Task 1. Run a simple Dataflow job**

In this task, you use the Dataflow batch template **Text Files on Cloud Storage to BigQuery** under "Process Data in Bulk (batch)" to transfer data from a Cloud Storage bucket (`gs://cloud-training/gsp323/lab.csv`). The following table has the values you need to correctly configure the Dataflow job.

You will need to make sure you have:

* Create a BigQuery dataset called `lab_565` with a table called `customers_189`.
    
* Create a Cloud Storage Bucket called `qwiklabs-gcp-02-211c063368fb-marking`.
    

| **Field** | **Value** |
| --- | --- |
| Cloud Storage input file(s) | `gs://cloud-training/gsp323/lab.csv` |
| Cloud Storage location of your BigQuery schema file | `gs://cloud-training/gsp323/lab.schema` |
| BigQuery output table | `qwiklabs-gcp-02-211c063368fb:lab_565.customers_189` |
| Temporary directory for BigQuery loading process | `gs://qwiklabs-gcp-02-211c063368fb-marking/bigquery_temp` |
| Temporary location | `gs://qwiklabs-gcp-02-211c063368fb-marking/temp` |
| Optional Parameters &gt; JavaScript UDF path in Cloud Storage | `gs://cloud-training/gsp323/lab.js` |
| Optional Parameters &gt; JavaScript UDF name | `transform` |
| Optional Parameters &gt; Machine Type | `e2-standard-2` |

Wait for the job to finish before trying to check your progress.

Click **Check my progress** to verify the objective.

Run a simple Dataflow job

Check my progress

## **Task 2. Run a simple Dataproc job**

In this task, you run an example Spark job using Dataproc.

Before you run the job, log into one of the cluster nodes and copy the /data.txt file into hdfs (use the command `hdfs dfs -cp gs://cloud-training/gsp323/data.txt /data.txt`).

Click here for hint!

Run a Dataproc job using the values below.

| **Field** | **Value** |
| --- | --- |
| Region | `us-central1` |
| Job type | `Spark` |
| Main class or jar | `org.apache.spark.examples.SparkPageRank` |
| Jar files | `file:///usr/lib/spark/examples/jars/spark-examples.jar` |
| Arguments | `/data.txt` |
| Max restarts per hour | `1` |
| Dataproc Cluster | `Compute Engine` |
| Region | `us-central1` |
| Machine Series | `E2` |
| Manager Node | Set **Machine Type** to **e2-standard-2** |
| Worker Node | Set **Machine Type** to **e2-standard-2** |
| Max Worker Nodes | `2` |
| Primary disk size | `100 GB` |
| Internal IP only | `Deselect "Configure all instances to have only internal IP addresses` |

Wait for the job to finish before trying to check your progress.

Click **Check my progress** to verify the objective.

Run a simple Dataproc job

Check my progress

## **Task 3. Use the Google Cloud Speech-to-Text API**

* Use Google Cloud Speech-to-Text API to analyze the audio file `gs://cloud-training/gsp323/task3.flac`. Once you have analyzed the file, upload the resulting file to: `gs://qwiklabs-gcp-02-211c063368fb-marking/task3-gcs-960.result`
    

**Note:** If you are facing issues in this task, you can refer to the respective lab for troubleshooting: [Google Cloud Speech-to-Text API: Qwik Start](https://www.cloudskillsboost.google/catalog_lab/743)

Click **Check my progress** to verify the objective.

Use the Google Cloud Speech-to-Text API

Check my progress

## **Task 4. Use the Cloud Natural Language API**

* Use the Cloud Natural Language API to analyze the sentence from text about Odin. The text you need to analyze is "Old Norse texts portray Odin as one-eyed and long-bearded, frequently wielding a spear named Gungnir and wearing a cloak and a broad hat." Once you have analyzed the text, upload the resulting file to: `gs://qwiklabs-gcp-02-211c063368fb-marking/task4-cnl-585.result`
    

**Note:** If you are facing issues in this task, you can refer to the respective lab for troubleshooting: [Cloud Natural Language API: Qwik Start](https://www.cloudskillsboost.google/catalog_lab/709)

Click **Check my progress** to verify the objective.

Use the Cloud Natural Language API

---

## Solution of Lab

%[https://www.youtube.com/watch?v=kK0ADQ6eEAE] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Prepare%20Data%20for%20ML%20APIs%20on%20Google%20Cloud%20Challenge%20Lab/quicklabtask1.sh
sudo chmod +x quicklabtask1.sh
./quicklabtask1.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737440130940/f002ee6f-ea8b-40ba-b86e-3222b9f4e920.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737440215627/01a028cf-2753-4215-8d49-e4e759d343df.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737440396739/f08d2768-3f41-4ec6-b23e-01594ec578db.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737440008695/ff8646ad-dca7-4786-b90d-5871ac3e160a.png align="center")

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737440418190/16cad49c-a601-4a24-aed1-5e3bb92c6c9f.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737440444815/5ff8f6f0-8f34-4366-b4e3-c7564f06afe0.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737440472218/cad81e60-9486-4a7c-9d34-365532c84490.png align="center")

---

### **Run the Below Command For Task 2**

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Prepare%20Data%20for%20ML%20APIs%20on%20Google%20Cloud%20Challenge%20Lab/quicklabtask2.sh
sudo chmod +x quicklabtask2.sh
./quicklabtask2.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737440709498/5f5dfbd2-40ae-47c2-8d64-6b8dae380688.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737440742836/e975d310-8cdc-4039-97ba-71702278e857.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737440775139/c7a9da62-d138-42a5-bef9-1a62b790ebcf.png align="center")