---
title: "Introduction to Cloud Dataproc: Hadoop and Spark on Google Cloud - GSP123"
seoTitle: "Introduction to Cloud Dataproc: Hadoop and Spark on Google Cloud - GSP"
seoDescription: "Cloud Dataproc is a managed Spark and Hadoop service that lets you take advantage of open source data tools for batch processing, querying, streaming, and m"
datePublished: Mon Feb 10 2025 02:33:50 GMT+0000 (Coordinated Universal Time)
cuid: cm6yfvrns000609js9sh98h50
slug: introduction-to-cloud-dataproc-hadoop-and-spark-on-google-cloud-gsp123
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739154256268/1fa0eb45-c570-4a07-a399-3e44cccab58a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1739154813737/93d469df-d358-4a03-a6ab-e20e2128319e.png
tags: introduction-to-cloud-dataproc-hadoop-and-spark-on-google-cloud-gsp123, introduction-to-cloud-dataproc-hadoop-and-spark-on-google-cloud, gsp123

---

## **Overview**

Cloud Dataproc is a managed Spark and Hadoop service that lets you take advantage of open source data tools for batch processing, querying, streaming, and machine learning. Cloud Dataproc automation helps you create clusters quickly, manage them easily, and save money by turning clusters off when you don't need them. With less time and money spent on administration, you can focus on your jobs and your data.

This lab is adapted from the [Create a Dataproc cluster by using the Google Cloud console guide](https://cloud.google.com/dataproc/quickstart-console).

### What you'll learn

* How to create a managed Cloud Dataproc cluster (with [Apache Spark pre-installed](https://cloud.google.com/dataproc/dataproc-versions#supported_cloud_dataproc_versions)).
    
* How to submit a Spark job
    
* How to shut down your cluster
    

## **Setup and requirements**

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
    student-01-05eda7784df4@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    210zqrNQbcwC
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

### Permission to Service Account

To assign storage permission to the service account, which is required for creating a cluster:

1. Go to **Navigation menu &gt; IAM & Admin &gt; IAM**.
    
2. Click the pencil icon on the `compute@developer.gserviceaccount.com` service account.
    
3. click on the **\+ ADD ANOTHER ROLE** button. select role **Storage Admin**
    

Once you've selected the **Storage Admin** role, click on **Save**

## **Task 1. Create a Cloud Dataproc cluster**

1. In the console, open the navigation menu (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **View All Products**. Under **Analytics** section, click on **Dataproc**.
    

![Expanded Navigation menu highlighting the Dataproc submenu and Cluster option](https://cdn.qwiklabs.com/UZqDdWl3A0KWXO2HoTlfSlQOInM4p%2BWG0cxr8QKJoDg%3D align="left")

2. To create a new cluster, click **Create cluster** and for **Cluster on Compute Engine** click **Create**.
    

![Cloud Dataproc menu with the Create Cluster button highlighted](https://cdn.qwiklabs.com/FMIrsEJrybhi2C7O7WMrNfypb5CnI%2FlTa%2F6Sa%2BKt7%2FQ%3D align="left")

3. In the **Create Dataproc cluster** dialog, click **Create** in the **Cluster on Compute engine** row.
    
4. There are many parameters you can configure when creating a new cluster. Set values for the parameters listed below, leave the default settings for the other parameters:
    

| **Parameter** | **Value** |
| --- | --- |
| Name | `qlab` |
| Region | `us-east4` |
| Zone | `us-east4-a` |
| Click Configure nodes, for Manager node - Machine type | `4 vCPUs (e2-standard-4)` |
| Worker node - Machine type | `2 vCPUs (e2-standard-2)` |
| Worker node - Primary disk size | 100 |
| Worker node - Primary disk type | Standard Persistent Disk |
| Click Customize cluster, for Internal IP only | Uncheck **Configure all instances to have only internal IP addresses** |

5. Click on **Create** to create the new cluster. You will see the Status go from Provisioning to Running and move on to the next step once your output resembles the following:
    

![Clusters page displaying the status of the lab cluster as Running](https://cdn.qwiklabs.com/me917cJZzqRqqVZiIVc6GMLlsGMFb5iLRjFQLk%2Fg1VI%3D align="left")

### Test completed task

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will be granted with an assessment score.

Create a Cloud Dataproc cluster.

Check my progress

## **Task 2. Submit a Spark job to your cluster**

1. Select **Jobs** to switch to Dataproc's jobs view:
    

![The expanded Cloud Dataproc menu with the Jobs option highlighted](https://cdn.qwiklabs.com/q6KeOW0eWRgjOgUfXaHHp42mvUFrYvGxzuboiE%2BHQE8%3D align="left")

2. Click **Submit job**:
    

![The Cloud Dataproc page with the Submit Job button highlighted](https://cdn.qwiklabs.com/ECz7OAin3t4GN8fRgtjb%2FmJRb%2F4Qa4erfaI81YX0LI4%3D align="left")

3. Set values for the parameters listed below, leave the default settings for the other parameters:
    

| **Parameter** | **Value** |
| --- | --- |
| Region | `us-east4` |
| Cluster | `qlab` |
| Job type | `Spark` |
| Main class or jar | `org.apache.spark.examples.SparkPi` |
| Jar files | `file:///usr/lib/spark/examples/jars/spark-examples.jar` |
| Arguments | `1000 (This sets the number of tasks)` |

4. Click **Submit**.
    

Your job should appear in the Jobs list, which shows all your project's jobs with their cluster, type, and current status. The new job displays as "Running"—move on once you see "Succeeded" as the Status.

### Test completed task

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will granted with an assessment score.

Submit a Spark job to your cluster.

Check my progress

5. To see your completed job's output, click the job ID in the **Jobs** list:
    

![The Jobs page displaying the status of job-11c593c3 as Succeeded](https://cdn.qwiklabs.com/r2O5jhAO3Mk1bdzEBIZheFpYk%2B5TIOIxp38JoBv2O6k%3D align="left")

6. To avoid scrolling, select **Line Wrap** to **ON**:
    

![THe Line Wrap: On option highlighted on the Job output page](https://cdn.qwiklabs.com/VqKgcu%2B5W%2BgkRlLnysByKZNlqv21u5%2F%2Bsz9nVarQCaw%3D align="left")

You should see that your job has successfully calculated a rough value for pi!

## **Task 3. Shut down your cluster**

1. You can shut down a cluster on the Clusters page:
    

![The Cloud Dataproc menu with the Clusters option highlighted](https://cdn.qwiklabs.com/ToOpXyaKd8EwWZoyEnthOgi8UjatMoi3OvpBv%2BAsf8E%3D align="left")

2. Select the checkbox next to the **qlab** cluster and click **Delete**:
    

![The Clusters page with the delete button highlighted](https://cdn.qwiklabs.com/BfjxvKugldnIPQEQ6T9Gpkn4N6jcApzmpBlXtRQGbPY%3D align="left")

3. Click **CONFIRM** to confirm deletion.
    

## **Task 4. Test your understanding**

Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

**Which type of Dataproc job is submitted in the lab?**

* PySpark
    
* SparkSql
    
* Pig
    
* HadoopSpark
    

**Dataproc helps users process, transform and understand vast quantities of data.**

* True
    
* False
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=JZ63ZHBuTms&ab_channel=Techcps] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP123/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Introduction%20to%20Cloud%20Dataproc%3A%20Hadoop%20and%20Spark%20on%20Google%20Cloud/techcps123.sh
sudo chmod +x techcps123.sh
./techcps123.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1739154621608/04464022-ceb0-46a8-8ec8-02830cb7e4a5.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1739154768696/430b3a82-f9ef-4ba4-ba26-7835e6b7f768.png align="center")