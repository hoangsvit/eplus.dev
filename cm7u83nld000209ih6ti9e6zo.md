---
title: "Migrate MySQL Data to Cloud SQL using Database Migration Service: Challenge Lab - GSP351"
seoTitle: "Migrate MySQL Data to Cloud SQL using Database Migration Service: Chal"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: 2025-03-04T08:24:39.217Z
cuid: cm7u83nld000209ih6ti9e6zo
slug: migrate-mysql-data-to-cloud-sql-using-database-migration-service-challenge-lab-gsp351
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/f5f05c67-c260-4b79-9f00-a8e1a5a85c90.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/8e8b6873-c126-47c2-9f43-40b94cb9f723.png
tags: migrate-mysql-data-to-cloud-sql-using-database-migration-service-challenge-lab-gsp351, migrate-mysql-data-to-cloud-sql-using-database-migration-service-challenge-lab, gsp351

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students enrolled in the [Migrate MySQL Data to Cloud SQL using Database Migration Service](https://www.cloudskillsboost.google/course_templates/629) skill badge. Are you ready for the challenge?

## **Setup and requirements**

**Before you click the Start Lab button**

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

**Set your region and zone**

Certain Compute Engine resources live in regions and zones. A region is a specific geographical location where you can run your resources. Each region has one or more zones.

<aside><strong>Note</strong>: Learn more about regions and zones and see a complete list in<span> </span><a href="https://cloud.google.com/compute/docs/regions-zones/" target="_blank">Regions & Zones documentation</a>.</aside>

Run the following gcloud commands in Cloud Shell to set the default region and zone for your lab:

```apache
gcloud config set compute/zone "us-west1-a"
export ZONE=$(gcloud config get compute/zone)

gcloud config set compute/region "us-west1"
export REGION=$(gcloud config get compute/region)
```

**Challenge scenario**

Your employer has existing MySQL databases running on a Compute Engine instance. They want to migrate this database to two new Cloud SQL instances using two different migration strategies. For the initial migration you must perform a one-time migration using the external IP address of the compute instance to gain access to the source database. For the second migration you have been instructed to use VPC Peering for access to the source database to remove the dependency on the external ip-address.

Before you cut over to the newly migrated database, you must carry out a test to confirm that the migration has been successful. To perform this final test you must make some changes to the source database after the continuous migration job has been started, and then check that those changes are propagated by the Database Migration Service. Finally the destination instance (Cloud SQL for MySQL) must be promoted to a stand-alone database for reading and writing data.

**Note:** For the purposes of this lab, all of your resources should be created in the following region: `us-west1` and zone: `us-west1-a`.

## **Task 1. Configure a Database Migration Service connection profile for a stand-alone MySQL database**

*   To complete this task you must configure a connection profile for the migration of the MySQL source instance, running on a compute instance named `dev-mkt-bpb`, to Cloud SQL using a Database Migration Service one-time migration and the external IP address of the source instance.
    

The credentials for this source database are provided in the table below:

| **Property** | **Value** |
| --- | --- |
| **Username** | **admin** |
| **Password** | **changeme** |

**Note:** You should use the external IP address of the MySQL source instance to provide access to the source database for this connection profile, and the following region: `us-west1`.

Configure a Database Migration Service connection profile for a stand-alone MySQL database.

Check my progress

## **Task 2. Perform a one-time migration of a stand-alone MySQL database to Cloud SQL**

1.  You must migrate this compute instance based MySQL database to a Cloud SQL instance configured with the following properties:
    

| **Property** | **Value** |
| --- | --- |
| **Cloud SQL Destination Instance ID** | `mysql-mkt-bpb` |
| **Root password** | `supersecret!` |
| **Choose a Cloud SQL edition** | `Enterprise` |
| **Database version** | `Cloud SQL for MySQL 8` |
| **Machine Shape** | `2 vCPU,8 GB` |
| **Storage type** | `SSD` |
| **Storage capacity** | `10GB` |

2.  Once you have migrated this database to a Cloud SQL instance you can confirm that the data has populated the Cloud SQL MySQL database by connecting to the new Cloud SQL MySQL database and running the following query:
    

```sql
use customers_data;
select count(*) from customers;
```

If the data are migrated, this query should return a row count of 5030.

Perform a one-time migration of a stand-alone MySQL database to Cloud SQL.

Check my progress

## **Task 3. Create a continuous Database Migration Service migration job to migrate a stand-alone MySQL database to Cloud SQL**

1.  To complete this task you must create a continuous Database Migration Service migration job to migrate a stand-alone MySQL database to a second Cloud SQL instance using VPC peering.
    
2.  You must migrate the same stand-alone MySQL database to a second Cloud SQL instance configured with the following properties:
    

| **Property** | **Value** |
| --- | --- |
| **Cloud SQL Destination Instance ID** | `mysql-mkt-bpb-cont` |
| **Root password** | `supersecret!` |
| **Choose a Cloud SQL edition** | `Enterprise` |
| **Database version** | `Cloud SQL for MySQL 8` |
| **CPU** | `2 vCPU,8 GB` |
| **Storage type** | `SSD` |
| **Storage capacity** | `10GB` |

**Note:** To streamline the creation process, you can set the Migration job name to the same name as the Cloud SQL Destination Instance ID provided above.

Be sure to use the same source connection profile that you created in Task 1. For the continuous migration job, you must use VPC Peering to provide access to the source compute instance and its database.

3.  To complete this task you must start the continuous migration job you have created. Wait until the job is in the `Running` state before checking your progress below.
    

Migrate the stand-alone MySQL database to Cloud SQL using continuous migration.

Check my progress

## **Task 4. Test that the continuous Database Migration Service job replicates updated source data**

1.  To complete this task you must connect to the source stand-alone MySQL instance and modify the database with the following query:
    

```sql
use customers_data;
update customers set gender = 'FEMALE' where addressKey = 934;
```

2.  Allow a minute for the change to be propagated by the continuous migration job and then check the changes at the destination.
    

Check that the updated source data in the stand-alone MySQL database has been migrated to continuous replication Cloud SQL instance.

Check my progress

## **Task 5. Promote the destination Cloud SQL for MySQL database to a stand-alone database**

*   In this task you must promote the Cloud SQL for MySQL instance to a stand-alone database for reading and writing data.
    

Check that the Cloud SQL for MySQL continuous migration job has been promoted to a stand-alone database for reading and writing.

Check my progress

* * *

## Solution of Lab

### Quick

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP351/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1450db34-eece-44af-8824-e711c0cc2013.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/f6b0381b-de94-49bb-8481-47b776f39a60.png align="center")

* * *

### Old Solution

%[https://www.youtube.com/watch?v=xtK2Zot-L9A] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP351/oldcurl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP351/lab.sh
source lab.sh.sh
source old.sh
```

**Script Alternative**

```plaintext
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Migrate%20MySQL%20Data%20to%20Cloud%20SQL%20using%20Database%20Migration%20Service%3A%20Challenge%20Lab/TechCode.sh
sudo chmod +x TechCode.sh 
./TechCode.sh
```

[https://console.cloud.google.com/compute/instances](https://console.cloud.google.com/compute/instances)

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/e3470d11-6074-4891-abd6-29c100ff6a24.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/0f61a745-0ba6-4c6c-a566-ffdae0ed154f.png align="center")

**For Database Migration: Click** [**Here**](https://console.cloud.google.com/dbmigration/migrations?)

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/c7606032-d4c5-4e7e-bd47-c47bffa3e317.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/07fac084-4dd2-4a6f-b2be-65426ccd84fa.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/02f1fee0-bc61-4f27-8246-54ce7e99131f.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/b9e5f4a2-56d8-4374-94ae-d3b5d77e2782.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/a0d29234-7b42-4586-aff5-2c72bac1859e.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/f60260ec-82c1-4579-a6f2-1bbfc32ff898.png align="center")

**Task 4: Connect to the MySQL Interactive Console**

*   Run the following command in your terminal:
    

```plaintext
mysql -u admin -p
```

*   When prompted for the password, enter:
    

```plaintext
changeme
```

* * *

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/8a4d225b-f9ac-42f2-b7a0-17aa7b93e0e6.png align="center")

*   [https://console.cloud.google.com/dbmigration/migrations](https://console.cloud.google.com/dbmigration/migrations)
    

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1476fcd3-076e-480d-bb07-0fc8d95a4845.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/48f175eb-8dbe-4cd5-a502-9f2fef028efc.png align="center")

* * *

### Other Solution

**Enable the following Google APIs:**

*   [**Database Migration**](https://console.cloud.google.com/marketplace/product/google/datamigration.googleapis.com?q=search&referrer=search&project=) [**API**](https://console.cloud.google.com/marketplace/product/google/datamigration.googleapis.com?q=search&referrer=search&project=)
    
*   [**Service Network**](https://console.cloud.google.com/marketplace/product/google/datamigration.googleapis.com?q=search&referrer=search&project=)[**ing API**](https://console.cloud.google.com/marketplace/product/google/servicenetworking.googleapis.com?q=search&referrer=search&project=)
    

**Task 4: Connect to the MySQL source instance**

```apache
mysql -u admin -p
```

*   **Enter password**:
    

```apache
changeme
```

*   **Copy and paste the password; the password will not be visible to you**
    

```apache
use customers_data;
update customers set gender = 'FEMALE' where addressKey = 934;
```

* * *

### Old Solution

%[https://www.youtube.com/watch?v=mc8TMhxS9Ws&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

### **Task 1: Enable APIs**

Enable the following APIs in your Google Cloud project:

1.  **Database Migration API**
    
2.  **Service Networking API**
    

Use the Google Cloud Console or the `gcloud` command-line tool to enable these APIs.

* * *

### **Task 4.1: Connect to the MySQL Interactive Console**

To connect to the MySQL interactive console, follow these steps:

1.  Run the following command in your terminal:
    
    ```plantext
    mysql -u admin -p
    ```
    
2.  When prompted for the password, enter:
    
    ```plantext
    changeme
    ```
    

* * *

### **Task 4.2: Update Records in the Database**

Once connected to the MySQL console:

1.  Switch to the database named `customers_data`:
    
    ```sql
    use customers_data;
    ```
    
2.  Run the following SQL command to update the gender field for a specific record:
    
    ```sql
    update customers set gender = 'FEMALE' where addressKey = 934;
    ```
    

* * *

### Manual

%[https://www.youtube.com/watch?v=nfWpoPPBu24] 

%[https://www.youtube.com/watch?v=tKsYBSgewt8]