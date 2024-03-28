---
title: "Dataproc: Qwik Start - Console"
seoDescription: "Dataproc is a fast, easy-to-use, fully-managed cloud service for running Apache Spark and Apache Hadoop clusters in a simpler, more cost-efficient way. Oper"
datePublished: Thu Mar 28 2024 13:08:35 GMT+0000 (Coordinated Universal Time)
cuid: club93bf1000608ldg3ef70wq
slug: dataproc-qwik-start-console
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1711631274494/522e57f1-10e4-4eae-b461-d3dde8ded100.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1711631288838/fe60dcef-037b-4df2-8b19-33d43a3394e2.png
tags: google-cloud, dataproc

---

## **Overview**

Dataproc is a fast, easy-to-use, fully-managed cloud service for running [Apache Spark and Apache Hadoop cl](http://spark.apache.org/)[usters in a simpler](http://hadoop.apache.org/), more cost-efficient way. Operations that used to take hours or days take seconds or minutes instead. Create Dataproc clusters quickly and resize them at any time, so you don't have to worry about your data pipelines outgrowing your clusters.

This lab shows you how to use the Google Cloud console to create a Dataproc cluster, run a sim[ple Apache Spark](http://spark.apache.org/) j[ob in the clu](http://hadoop.apache.org/)ster, and then modify the number of workers in the cluster.

### **Task 1. Create a cluster**

1. In the Cloud Platform Console, select **Navigation menu** &gt; **Dataproc** &gt; **Clusters**, then click **Create cluster**.
    
2. Click **Create** for **Cluster on Compute Engine**.
    
3. Set the following fields for your cluster and accept the default values for all other fields:
    

**Note:** In the Configure nodes section ensure **both the Master node and Worker nodes** are set to the correct Machine Series and Machine Type

| **Field** | **Value** |
| --- | --- |
| Name | example-cluster |
| Region | `us-east4` |
| Zone | `us-east4-a` |
| Machine Series | E2 |
| Machine Type | e2-standard-2 |
| Number of Worker Nodes | 2 |
| Primary disk size | 30 GB |
| Internal IP only | Deselect "Configure all instances to have only internal IP addresses" |

**Note:** A Zone is a special multi-region namespace that is capable of deploying instances into all Google Compute zones globally. You can also specify distinct regions, such as `us-central1` or `europe-west1`, to isolate resources (including VM instances and Cloud Storage) and metadata storage locations utilized by Cloud Dataproc within the user-specified region.

4. Click **Create** to create the cluster.
    

Your new cluster will appear in the Clusters list. It may take a few minutes to create, the cluster Status shows as **Provisioning** until the cluster is ready to use, then changes to **Running**.

<mark>Answer</mark>

```apache
export REGION=us-east4
export ZONE=us-east4-a
```

```apache
gcloud dataproc clusters create example-cluster \
--region=$REGION \
--zone=$ZONE \
--master-machine-type=e2-standard-2 \
--master-boot-disk-size=50GB \
--num-workers=2 \
--worker-machine-type=e2-standard-2 \
--worker-boot-disk-size=50GB
```

### **Task 2. Submit a job**

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

<mark>Answer</mark>

```apache
gcloud dataproc jobs submit spark \
  --region=$REGION \
  --cluster=example-cluster \
  --class=org.apache.spark.examples.SparkPi \
  --jars=file:///usr/lib/spark/examples/jars/spark-examples.jar \
  -- 1000
```

### **Task 3. View the job output**

To see your completed job's output:

1. Click the job ID in the **Jobs** list.
    
2. Select **LINE WRAP** to `ON` or scroll all the way to the right to see the calculated value of Pi. Your output, with **LINE WRAP** `ON`, should look something like this:
    

![Output](https://cdn.qwiklabs.com/DnVGNZW%2F3WiDYaqOqt3ET3nW%2Bp4NZbZYgvi2OL0QjXo%3D align="left")

Your job has successfully calculated a rough value for pi!

### **Task 4. Update a cluster to modify the number of workers**

To change the number of worker instances in your cluster:

1. Select **Clusters** in the left navigation pane to return to the Dataproc Clusters view.
    
2. Click **example-cluster** in the **Clusters** list. By default, the page displays an overview of your cluster's CPU usage.
    
3. Click **Configuration** to display your cluster's current settings.
    
4. Click **Edit**. The number of worker nodes is now editable.
    
5. Enter **4** in the **Worker nodes** field.
    
6. Click **Save**.
    

Your cluster is now updated. Check out the number of VM instances in the cluster.

<mark>Answer</mark>

```apache
gcloud dataproc clusters update example-cluster \
--num-workers=4 \
--region=$REGION
```