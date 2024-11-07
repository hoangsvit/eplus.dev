---
title: "Dataproc: Qwik Start - Console - GSP103 (Solution 2024)"
seoTitle: "Dataproc: Qwik Start - Console - GSP103 (Solution 2024)"
seoDescription: "Dataproc is a fast, easy-to-use, fully-managed cloud service for running Apache Spark and Apache Hadoop clusters in a simpler, more cost-efficient way. Oper"
datePublished: Thu Nov 07 2024 11:21:16 GMT+0000 (Coordinated Universal Time)
cuid: cm377w4r2000e0ajqdm1t4ycw
slug: dataproc-qwik-start-console-gsp103-solution-2024
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730978357064/d79d29cd-1d41-4398-a4e2-21e4444d6990.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1730978464244/c7408752-3d16-450f-bf27-666e94e9e878.png
tags: dataproc-qwik-start-console-gsp103-solution-2024, gsp103

---

## **Overview**

Dataproc is a fast, easy-to-use, fully-managed cloud service for running [Apache Spark](http://spark.apache.org/) and [Apache Hadoop](http://hadoop.apache.org/) clusters in a simpler, more cost-efficient way. Operations that used to take hours or days take seconds or minutes instead. Create Dataproc clusters quickly and resize them at any time, so you don't have to worry about your data pipelines outgrowing your clusters.

This lab shows you how to use the Google Cloud console to create a Dataproc cluster, run a simple [Apache Spark](http://spark.apache.org/) job in the cluster, and then modify the number of workers in the cluster.

### What you'll do

In this lab, you learn how to:

* Create a Dataproc cluster in the Google Cloud console
    
* Run a simple Apache Spark job
    
* Modify the number of workers in the cluster
    

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
    student-04-89c80331a4a2@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    ZqKnP1flRrb0
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

### Confirm Cloud Dataproc API is enabled

To create a Dataproc cluster in Google Cloud, the Cloud Dataproc API must be enabled. To confirm the API is enabled:

1. Click **Navigation menu** &gt; **APIs & Services** &gt; **Library**:
    
2. Type **Cloud Dataproc** in the **Search for APIs & Services** dialog. The console will display the Cloud Dataproc API in the search results.
    
3. Click on **Cloud Dataproc API** to display the status of the API. If the API is not already enabled, click the **Enable** button.
    

Once the API is enabled, proceed with the lab instructions.

### Permission to Service Account

To assign storage permission to the service account, which is required for creating a cluster:

1. Go to **Navigation menu &gt; IAM & Admin &gt; IAM**.
    
2. Click the pencil icon on the `compute@developer.gserviceaccount.com` service account.
    
3. click on the **\+ ADD ANOTHER ROLE** button. select role **Storage Admin**
    

Once you've selected the **Storage Admin** role, click on **Save**

## **Task 1. Create a cluster**

1. In the Cloud Platform Console, select **Navigation menu** &gt; **Dataproc** &gt; **Clusters**, then click **Create cluster**.
    
2. Click **Create** for **Cluster on Compute Engine**.
    
3. Set the following fields for your cluster and accept the default values for all other fields:
    

**Note:** In the Configure nodes section ensure **both the Master node and Worker nodes** are set to the correct Machine Series and Machine Type

| **Field** | **Value** |
| --- | --- |
| Name | example-cluster |
| Region | `us-east4` |
| Zone | `us-east4-a` |
| Machine Series (Manager Node) | E2 |
| Machine Type (Manager Node) | e2-standard-2 |
| Primary disk size (Manager Nodes) | 30 GB |
| Number of Worker Nodes | 2 |
| Machine Series (Worker Nodes) | E2 |
| Machine Type (Worker Nodes) | e2-standard-2 |
| Primary disk size (Worker Nodes) | 30 GB |
| Internal IP only | Deselect "Configure all instances to have only internal IP addresses" |

**Note:** A Zone is a special multi-region namespace that is capable of deploying instances into all Google Compute zones globally. You can also specify distinct regions, such as `us-central1` or `europe-west1`, to isolate resources (including VM instances and Cloud Storage) and metadata storage locations utilized by Cloud Dataproc within the user-specified region.

4. Click **Create** to create the cluster.
    

Your new cluster will appear in the Clusters list. It may take a few minutes to create, the cluster Status shows as **Provisioning** until the cluster is ready to use, then changes to **Running**.

**Test completed task**

Click **Check my progress** to verify your performed task.

Create a Dataproc cluster

Check my progress

## **Task 2. Submit a job**

To run a sample Spark job:

1. Click **Jobs** in the left pane to switch to Dataproc's jobs view, then click **Submit job**.
    
2. Set the following fields to update Job. Accept the default values for all other fields:
    

| **Field** | **Value** |
| --- | --- |
| Region | `us-east4` |
| Cluster | example-cluster |
| Job type | Spark |
| Main class or jar | org.apache.spark.examples.SparkPi |
| Jar files | file:///usr/lib/spark/examples/jars/spark-examples.jar |
| Arguments | 1000 (This sets the number of tasks.) |

3. Click **Submit**.
    

**Note: How the job calculates Pi:** The Spark job estimates a value of Pi using the [Monte Carlo method](https://en.wikipedia.org/wiki/Monte_Carlo_method). It generates x,y points on a coordinate plane that models a circle enclosed by a unit square. The input argument (1000) determines the number of x,y pairs to generate; the more pairs generated, the greater the accuracy of the estimation. This estimation leverages Cloud Dataproc worker nodes to parallelize the computation. For more information, see [Estimating Pi using the Monte Carlo Method](https://academo.org/demos/estimating-pi-monte-carlo/) and see [JavaSparkPi.java on GitHub](https://github.com/Apache/spark/blob/master/examples/src/main/java/org/apache/spark/examples/JavaSparkPi.java).

Your job should appear in the **Jobs** list, which shows your project's jobs with its cluster, type, and current status. Job status displays as **Running**, and then **Succeeded** after it completes.

**Test completed task**

Click **Check my progress** to verify your performed task.

Submit a job

Check my progress

## **Task 3. View the job output**

To see your completed job's output:

1. Click the job ID in the **Jobs** list.
    
2. Select **LINE WRAP** to `ON` or scroll all the way to the right to see the calculated value of Pi. Your output, with **LINE WRAP** `ON`, should look something like this:
    

![Output](https://cdn.qwiklabs.com/DnVGNZW%2F3WiDYaqOqt3ET3nW%2Bp4NZbZYgvi2OL0QjXo%3D align="left")

Your job has successfully calculated a rough value for pi!

## **Task 4. Update a cluster to modify the number of workers**

To change the number of worker instances in your cluster:

1. Select **Clusters** in the left navigation pane to return to the Dataproc Clusters view.
    
2. Click **example-cluster** in the **Clusters** list. By default, the page displays an overview of your cluster's CPU usage.
    
3. Click **Configuration** to display your cluster's current settings.
    
4. Click **Edit**. The number of worker nodes is now editable.
    
5. Enter **4** in the **Worker nodes** field.
    
6. Click **Save**.
    

Your cluster is now updated. Check out the number of VM instances in the cluster.

**Test completed task**

Click **Check my progress** to verify your performed task.

Update a cluster

Check my progress

1. To rerun the job with the updated cluster, you would click **Jobs** in the left pane, then click **SUBMIT JOB**.
    
2. Set the same fields you set in the **Submit a job** section:
    

| **Field** | **Value** |
| --- | --- |
| Region | `us-east4` |
| Cluster | example-cluster |
| Job type | Spark |
| Main class or jar | org.apache.spark.examples.SparkPi |
| Jar files | file:///usr/lib/spark/examples/jars/spark-examples.jar |
| Arguments | 1000 (This sets the number of tasks.) |

3. Click **Submit**.
    

## **Task 5. Test your understanding**

Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

**Which type of Dataproc job is submitted in the lab?**

* Spark
    
* SparkSql
    
* Pig
    
* Hadoop
    
* PySpark
    

**Dataproc helps users process, transform and understand vast quantities of data.**

* True
    
* False
    

---

## **Solution of Lab**

%[https://youtu.be/GOAXZc8Ve58] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1730978425389/02c1ccbc-e6c7-4805-9bfa-be5250cafc19.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Dataproc%20Qwik%20Start%20-%20Console/gsp103.sh
sudo chmod +x gsp103.sh
./gsp103.sh
```