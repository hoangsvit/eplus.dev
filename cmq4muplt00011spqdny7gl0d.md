---
title: "Managed Service for Apache Spark: Qwik Start - Console - GSP103"
seoTitle: "Managed Service for Apache Spark: Qwik Start - Console - GSP103"
seoDescription: "Managed Service for Apache Spark is a fast, easy-to-use, fully-managed cloud service for running Apache Spark and Apache Hadoop clusters in a simpler, more cost-efficient way. Operations that used to take hours or days take seconds or minutes instead. Create Managed Service for Apache Spark clusters quickly and resize them at any time, so you don't have to worry about your data pipelines outgrowing your clusters."
datePublished: 2026-06-08T03:09:59.987Z
cuid: cmq4muplt00011spqdny7gl0d
slug: managed-service-for-apache-spark-qwik-start-console-gsp103
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/a105280f-8f44-47b2-846e-ba13f29d017c.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/23324f16-4292-45d0-a1d5-16e11d45b797.png
tags: gsp103, managed-service-for-apache-spark-qwik-start-console-gsp103, managed-service-for-apache-spark-qwik-start

---

## **Overview**

Managed Service for Apache Spark is a fast, easy-to-use, fully-managed cloud service for running [Apache Spark](http://spark.apache.org/) and [Apache Hadoop](http://hadoop.apache.org/) clusters in a simpler, more cost-efficient way. Operations that used to take hours or days take seconds or minutes instead. Create Managed Service for Apache Spark clusters quickly and resize them at any time, so you don't have to worry about your data pipelines outgrowing your clusters.

This lab shows you how to use the Google Cloud console to create a Managed Apache Spark cluster, run a simple [Apache Spark](http://spark.apache.org/) job in the cluster, and then modify the number of workers in the cluster.

### What you'll do

In this lab, you learn how to:

*   Create a Managed Apache Spark cluster in the Google Cloud console
    
*   Run a simple Apache Spark job
    
*   Modify the number of workers in the cluster
    

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
    
    *   The **Open Google Cloud console** button
        
    *   The temporary credentials (username and password) that you must use for this lab
        
    *   Other information, if needed, to step through this lab
        
    
    Note that the lab timer is located near the top of the page, showing the remaining time.
    
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```plaintext
    student-00-1faec3ddca2a@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the **Lab setup and access** panel.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    Bdz9StgCz7Od
    ```
    
    Copied!
    
    You can also find the Password in the **Lab setup and access** panel.
    
6.  Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7.  Click through the subsequent pages:
    
    *   Accept the terms and conditions.
        
    *   Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    *   Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="center")

### Confirm Cloud Dataproc API is enabled

To create a Managed Apache Spark cluster in Google Cloud, the Cloud Dataproc API must be enabled. To confirm the API is enabled:

1.  Click **Navigation menu** > **APIs & Services** > **Library**.
    
2.  Type **Cloud Dataproc API** in the **Search for APIs & Services** dialog. The console will display the Cloud Dataproc API in the search results.
    
3.  Click on **Cloud Dataproc API** to display the status of the API. If the API is not already enabled, click the **Enable** button.
    

Once the API is enabled, proceed with the lab instructions.

### Grant a necessary IAM role to the Compute Engine service account

1.  In the Google Cloud console, in the navigation menu (
    
    ![Navigation Menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ), select **IAM & Admin** > **IAM**.
    
2.  Click **Edit principal** (pencil icon) for the **Compute Engine default service account** (*\[project-number\]*\-[compute@developer.gserviceaccount.com](mailto:compute@developer.gserviceaccount.com)).
    
3.  Click **\+ Add another role**.
    
4.  For **Select a role**, search for **Storage Admin**, and select it from the results.
    
5.  Click **Save**.
    

## **Task 1. Create a cluster**

1.  In the Cloud Platform Console, select **Navigation menu** > **View All Products**, then under the **Analytics** section, click **Managed Apache Spark** > **Clusters**.
    
2.  Click **Create cluster**.
    
3.  Set the following fields for your cluster and accept the default values for all other fields:
    

**Note:** In the Configure nodes section ensure **both the Manager node and Worker nodes** are set to the correct Machine Series and Machine Type. If the E2 series is not displayed, verify that you have selected "Standard Persistent Disk" as the Primary Disk type option.

| **Field** | **Value** |
| --- | --- |
| Name | example-cluster |
| Region | `us-east1` |
| Zone | `us-east1-c` |
| Cluster type | Standard (1 master, N workers) |
| Expand **Advanced configurations** > **Infrastructure**, for **Manager node** > **Primary disk type** | **Standard Persistent Disk** |
| Machine Series (Manager Node) | E2 |
| Machine Type (Manager Node) | e2-standard-2 |
| Primary disk size (Manager Nodes) | 30 GB |
| Number of Worker Nodes | 2 |
| Primary disk type (Worker Node) | Standard Persistent Disk |
| Machine Series (Worker Nodes) | E2 |
| Machine Type (Worker Nodes) | e2-standard-2 |
| Primary disk size (Worker Nodes) | 30 GB |
| Expand **Other** > **Internal IP only** | Deselect **Configure all instances to have only internal IP addresses** |

**Note:** A Zone is a special multi-region namespace that is capable of deploying instances into all Google Compute zones globally. You can also specify distinct regions, such as `us-central1` or `europe-west1`, to isolate resources (including VM instances and Cloud Storage) and metadata storage locations utilized by Managed Service for Apache Spark within the user-specified region.

4.  Click **Create** to create the cluster.
    

Your new cluster will appear in the Clusters list. It may take a few minutes to create, the cluster Status shows as **Provisioning** until the cluster is ready to use, then changes to **Running**.

**Note:** You can safely ignore the warning `Sorry, the server was not able to fulfill your request` and proceed to the next task.

**Test completed task**

Click **Check my progress** to verify your performed task.

Create a cluster

## **Task 2. Submit a job**

To run a sample Spark job:

1.  Click **Jobs** in the left pane to switch to Managed Apache Spark's jobs view, then click **Submit job**.
    
2.  Set the following fields to update Job. Accept the default values for all other fields:
    

| **Field** | **Value** |
| --- | --- |
| Region | `us-east1` |
| Cluster | example-cluster |
| Job type | Spark |
| Main class or jar | org.apache.spark.examples.SparkPi |
| Jar files | file:///usr/lib/spark/examples/jars/spark-examples.jar |
| Arguments | 1000 (This sets the number of tasks.) |

3.  Click **Submit**.
    

**Note: How the job calculates Pi:** The Spark job estimates a value of Pi using the [Monte Carlo method](https://en.wikipedia.org/wiki/Monte_Carlo_method). It generates x,y points on a coordinate plane that models a circle enclosed by a unit square. The input argument (1000) determines the number of x,y pairs to generate; the more pairs generated, the greater the accuracy of the estimation. This estimation leverages Managed Apache Spark worker nodes to parallelize the computation. For more information, see [Estimating Pi using the Monte Carlo Method](https://academo.org/demos/estimating-pi-monte-carlo/) and see [JavaSparkPi.java](http://JavaSparkPi.java) [on GitHub](https://github.com/Apache/spark/blob/master/examples/src/main/java/org/apache/spark/examples/JavaSparkPi.java).

Your job should appear in the **Jobs** list, which shows your project's jobs with its cluster, type, and current status. Job status displays as **Running**, and then **Succeeded** after it completes.

**Test completed task**

Click **Check my progress** to verify your performed task.

Submit a job

## **Task 3. View the job output**

To see your completed job's output:

1.  Click the job ID in the **Jobs** list.
    
2.  Select **LINE WRAP** to `ON` or scroll all the way to the right to see the calculated value of Pi. Your output, with **LINE WRAP** `ON`, should look something like this:
    

![Output](https://cdn.qwiklabs.com/DnVGNZW%2F3WiDYaqOqt3ET3nW%2Bp4NZbZYgvi2OL0QjXo%3D align="center")

Your job has successfully calculated a rough value for pi!

## **Task 4. Update a cluster to modify the number of workers**

To change the number of worker instances in your cluster:

1.  Select **Clusters** in the left navigation pane to return to the Managed Apache Spark Clusters view.
    
2.  Click **example-cluster** in the **Clusters** list. By default, the page displays an overview of your cluster's CPU usage.
    
3.  Click **Configuration** to display your cluster's current settings.
    
4.  Click **Edit**. The number of worker nodes is now editable.
    
5.  Enter **4** in the **Worker nodes** field.
    
6.  Click **Save**.
    

Your cluster is now updated. Check out the number of VM instances in the cluster.

**Test completed task**

Click **Check my progress** to verify your performed task.

Update a cluster

1.  To rerun the job with the updated cluster, you would click **Jobs** in the left pane, then click **SUBMIT JOB**.
    
2.  Set the same fields you set in the **Submit a job** section:
    

| **Field** | **Value** |
| --- | --- |
| Region | `us-east1` |
| Cluster | example-cluster |
| Job type | Spark |
| Main class or jar | org.apache.spark.examples.SparkPi |
| Jar files | file:///usr/lib/spark/examples/jars/spark-examples.jar |
| Arguments | 1000 (This sets the number of tasks.) |

3.  Click **Submit**.
    

## **Task 5. Test your understanding**

Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

Which type of Managed Apache Spark job is submitted in the lab?

Spark

Hadoop

SparkSql

Pig

PySpark

Managed Apache Spark helps users process, transform and understand vast quantities of data.

True

False

* * *

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=cVg6p9cBCJw] 

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP103/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Managed%20Service%20for%20Apache%20Spark%3A%20Qwik%20Start%20-%20Console/TechCode.sh
sudo chmod +x TechCode.sh 
./TechCode.sh
```

If above command not works then Run Below Command

```plaintext
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Managed%20Service%20for%20Apache%20Spark%3A%20Qwik%20Start%20-%20Console/TechCode-1.sh
sudo chmod +x TechCode-1.sh 
./TechCode-1.sh
```

* * *

### Manual

%[https://www.youtube.com/watch?v=ScCIY4ydVHA]