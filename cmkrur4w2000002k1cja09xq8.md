---
title: "AlloyDB - Database Fundamentals - GSP1083"
seoTitle: "AlloyDB - Database Fundamentals - GSP1083"
seoDescription: "Learn how to manage Google AlloyDB instances, create tables, insert data, and use the Google Cloud CLI in this hands-on database fundamentals lab"
datePublished: Sat Jan 24 2026 05:11:38 GMT+0000 (Coordinated Universal Time)
cuid: cmkrur4w2000002k1cja09xq8
slug: alloydb-database-fundamentals-gsp1083
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769231433636/17d385d6-a1f6-4d58-9690-9a9893cab518.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1769231445144/da556f5b-09ef-4dc3-a498-18870966b017.png
tags: alloydb, database-fundamentals, alloydb-database-fundamentals-gsp1083, gsp1083

---

## Overview

AlloyDB for PostgreSQL is a fully managed PostgreSQL-compatible database service for your most demanding enterprise database workloads. AlloyDB combines the best of Google with one of the most popular open-source database engines, PostgreSQL, for superior performance, scale, and availability.

In this lab, you perform several key fundamental tasks for creating and managing AlloyDB for PostgreSQL instances and databases.

### What you'll do

In this lab, you learn how to perform the following tasks:

* Create a cluster and instance.
    
* Create tables and insert data in your database
    
* Use the Google Cloud CLI with AlloyDB.
    
* Delete an instance.
    

## Setup and requirements

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
    "Username"
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    "Password"
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `PROJECT_ID`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to "PROJECT_ID"
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
ACCOUNT: "ACCOUNT"

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
project = "PROJECT_ID"
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Create a cluster and instance

1. First create an AlloyDB cluster. On the Cloud Console Navigation menu (), click on **View all products**, scroll down to the **Databases** section and then select **AlloyDB for PostgreSQL**.
    
2. Click **Create cluster** at the top of the page.
    
3. In the **Configure your cluster** section, fill in the following fields. Please be certain to select the **Region** value listed below. Leave the others at their default value.
    

| **Item** | **Value** |
| --- | --- |
| **Cluster ID** | **lab-cluster** |
| **Password** | **Change3Me** |
| **Region** | `us-east1` |
| **Network** | **peering-network** |

4. The private services access connection option was configured for this project when you started the lab. This step is required to allow access to the AlloyDB cluster.
    
5. Under **Configure your primary instance**, set the instance ID as **lab-instance**.
    
6. Select **Multiple zones (Highly Available)** in the Zonal availability section.
    
7. Select **2 vCPU, 16 GB** as your machine type.
    
8. Scroll to the bottom of the page and click **Create Cluster**.
    

**Note:** Cluster creation will take approximately **9** to **13** minutes.

9. You're now on the **Overview** page for the new cluster you created. The bottom section contains details on your instance. Click **View connectivity configuration** under the lab-instance section. Please make note of the **Private IP** address in the instances section. Copy the **Private IP** address to a text file so that you can paste the value in a later step. Do not include the port number.
    
10. Click **Check my progress** to verify the objective.
    

Create a cluster and instance

## Task 2. Create tables and insert data in your database

1. A VM named, **alloydb-client**, containing the PostgreSQL client was provisioned for you at the start of the lab.
    
2. On the **Navigation menu** (), under **Compute Engine** click **VM instances**.
    
3. For the instance named **alloydb-client**, in the **Connect** column, click **SSH** to open a terminal window.
    
4. Set the following environment variable, replacing **ALLOYDB\_ADDRESS** with the Private IP address of the AlloyDB instance.
    

```apache
export ALLOYDB=ALLOYDB_ADDRESS
```

5. Run the following command to store the Private IP address of the AlloyDB instance on the AlloyDB client VM so that it will persist throughout the lab.
    

```apache
echo $ALLOYDB  > alloydbip.txt
```

6. Use the following command to launch the PostgreSQL (**psql**) client. You will be prompted to provide the **postgres** user's password (**Change3Me**) which you entered when you created the cluster.
    

```apache
psql -h $ALLOYDB -U postgres
```

7. You will be presented with the **psql** terminal prompt as shown below.
    

```apache
psql (14.5 (Debian 14.5-1.pgdg110+1), server 14.4)
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

postgres=>
```

8. Input and run the following SQL command to create a new table named **regions**.
    

```apache
CREATE TABLE regions (
    region_id bigint NOT NULL,
    region_name varchar(25)
) ;

ALTER TABLE regions ADD PRIMARY KEY (region_id);
```

9. Next add several rows of data to the **regions** table. Input and run the following SQL command.
    

```apache
INSERT INTO regions VALUES ( 1, 'Europe' );

INSERT INTO regions VALUES ( 2, 'Americas' );

INSERT INTO regions VALUES ( 3, 'Asia' );

INSERT INTO regions VALUES ( 4, 'Middle East and Africa' );
```

10. Run the following simple query to verify that you inserted the records.
    

```apache
SELECT region_id, region_name from regions;
```

11. Type **\\q** to exit the psql client.
    
12. Another option to create tables and/or load data is by using a SQL file (.sql). A SQL file can contain DDL, DML or any supported SQL syntax. You will download and run a file containing DDL and DML, run that file, and then verify the load.
    
13. Run the following command to download a file containing DDL and DML for three tables: **countries**, **departments**, and **jobs**.
    

```apache
gsutil cp gs://spls/gsp1083/hrm_load.sql hrm_load.sql
```

14. Reconnect to the PostgreSQL (**psql**) client. You will be prompted to provide the **postgres** user's password (**Change3Me**).
    

```apache
psql -h $ALLOYDB -U postgres
```

15. Run the following command to process the sql file.
    

```apache
\i hrm_load.sql
```

16. Run the following command to see the tables that are loaded into your database.
    

```apache
\dt
```

```apache
            List of relations
 Schema |    Name     | Type  |  Owner   
--------+-------------+-------+----------
 public | countries   | table | postgres
 public | departments | table | postgres
 public | jobs        | table | postgres
 public | regions     | table | postgres
(4 rows)
```

17. Run a spot check query to examine the data in one of the tables you just created and loaded.
    

```apache
select job_title, max_salary 
from jobs 
order by max_salary desc;
```

18. Type **\\q** to exit the psql client.
    
19. Type **exit** to close the terminal window.
    
20. Click **Check my progress** to verify the objective.
    

Create and load a table

## Task 3. Use the Google Cloud CLI with AlloyDB

The Cloud Console is very useful, but in some use cases you want to manage AlloyDB databases using other methods. Google Cloud services can also be managed through the command line tool named **gcloud**. The easiest way to use the **gcloud** CLI is via the Cloud Shell but it can also be installed on a wide variety of operating systems.

### Create a cluster and instance with CLI

1. Creating an AlloyDB cluster instance via **gcloud** is very simple. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. In the Cloud Shell, create a new AlloyDB cluster using the command below.
    

```apache
gcloud alloydb clusters create gcloud-lab-cluster \
    --password=Change3Me \
    --network=peering-network \
    --region=us-east1 \
    --project=qwiklabs-gcp-02-bedaa7b60b6f
```

3. Once the cluster is created, run the following command to create the Primary instance.
    

**Note:** The instance creation process will take 7 to 9 minutes.

```apache
gcloud alloydb instances create gcloud-lab-instance\
    --instance-type=PRIMARY \
    --cpu-count=2 \
    --region=us-east1  \
    --cluster=gcloud-lab-cluster \
    --project=qwiklabs-gcp-02-bedaa7b60b6f
```

4. After the process completes, you can run the following command to list the AlloyDB clusters instances available in your project. The earlier instance you created, **lab-cluster**, and the one you just created, **gcloud-lab-cluster**, are returned in the listing.
    

```apache
gcloud alloydb clusters list
```

5. Click **Check my progress** to verify the objective.
    

Create a cluster and instance with CLI

## Task 4. Deleting a cluster

1. A very quick way to delete a cluster is by using the CLI. Run the following command. The **force** option deletes any subordinate instances as well. Another option to delete a cluster is to use the Cloud Console.
    

**Note:** The deletion process will take 5 to 8 minutes.

```apache
gcloud alloydb clusters delete gcloud-lab-cluster \
    --force \
    --region=us-east1 \
    --project=qwiklabs-gcp-02-bedaa7b60b6f
```

2. To confirm that **gcloud-lab-cluster** was deleted run the following command:
    

If prompted `Do you want to continue (Y/n)?` press `Y` to continue.

```apache
gcloud alloydb clusters list
```

---

## Solution of Lab

%[https://youtu.be/N5zfAHPNGB4]