---
title: "Migrating On-premises MySQL Using a Continuous Database Migration Service Job - GSP860"
seoTitle: "Migrating On-premises MySQL Using a Continuous Database Migration Service Job - GSP860"
seoDescription: "Database Migration Service provides options for one-time and continuous jobs to migrate data to Cloud SQL. It offers various connectivity methods, including IP allowlists, reverse SSH tunnels, VPC peering, and Private Service Connect interfaces. Learn more about connectivity options from the Configure connectivity Guide."
datePublished: 2026-09-05T07:40:01.218Z
cuid: cmto2orv400000agmaw07fmau
slug: migrating-on-premises-mysql-using-a-continuous-database-migration-service-job-gsp860
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/e84cf26f-1231-4a0b-86ef-c26f90e7374a.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/9aa22299-5d84-4177-aef2-1e4d33d7ab79.png
tags: migrating-on-premises-mysql-using-a-continuous-database-migration-service-job-gsp860, migrating-on-premises-mysql-using-a-continuous-database-migration-service-job, gsp860

---

## **Overview**

[Database Migration Service](https://cloud.google.com/database-migration/docs) provides options for one-time and continuous jobs to migrate data to Cloud SQL. It offers various connectivity methods, including IP allowlists, reverse SSH tunnels, VPC peering, and Private Service Connect interfaces. Learn more about connectivity options from the [Configure connectivity Guide](https://cloud.google.com/database-migration/docs/mysql/configure-connectivity).

In this lab, you migrate an on-premises MySQL database (running on a virtual machine) to Cloud SQL for MySQL using a continuous Database Migration Service job and VPC peering for connectivity.

After you create and run the migration job, you confirm that an initial copy of your database has been successfully migrated to your Cloud SQL for MySQL instance. You also explore how continuous migration jobs apply data updates from your source database to your Cloud SQL instance.

To conclude the migration job, you promote the Cloud SQL instance to be a standalone database for reading and writing data.

### What you'll do

In this lab, you learn how to configure a continuous Database Migration Service job to migrate databases from a MySQL instance to Cloud SQL for MySQL:

*   Create a profile for a source connection to a MySQL instance (e.g., on-premises MySQL).
    
*   Use VPC peering to configure connectivity between the source and destination database instances.
    
*   Use Database Migration Service to create, run, and verify a continuous migration job.
    
*   Promote the destination instance (Cloud SQL for MySQL) to be a standalone database to read and write data.
    

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
    student-04-88451220ccb1@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the **Lab setup and access** panel.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    SyO0v39LmJ47
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

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1.  Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="center")
    
    at the top of the Google Cloud console.
    
2.  Click through the following windows:
    
    *   Continue through the Cloud Shell information window.
        
    *   Authorize Cloud Shell to use your credentials to make Google Cloud API calls.  
        When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-3f2c3ebd9e02`. The output contains a line that declares the **Project\_ID** for this session:
        
        ```plaintext
        Your Cloud Platform project in this session is set to qwiklabs-gcp-01-3f2c3ebd9e02
        ```
        
        `gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.
        
3.  (Optional) You can list the active account name with this command:
    

```plaintext
gcloud auth list
```

Copied!

4.  Click **Authorize**.
    

**Output:**

```plaintext
ACTIVE: *
ACCOUNT: student-04-88451220ccb1@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5.  (Optional) You can list the project ID with this command:
    

```plaintext
gcloud config list project
```

Copied!

**Output:**

```plaintext
[core]
project = qwiklabs-gcp-01-3f2c3ebd9e02
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Enable the Database Migration API

1.  In the Google Cloud console title bar, type **Database Migration API** in the **Search** field. Click **Database Migration API** from the results.
    
2.  Click **Enable** to enable the API.
    

### Verify that the Service Networking API is enabled

1.  In the Google Cloud console title bar, type **Service Networking API** in the **Search** field. Click **Service Networking API** from the results.
    

This page shows either status information or gives you the option to enable the API.

2.  If necessary, click **Enable** to enable the API.
    

## **Task 1. Get the connectivity information for the MySQL source instance**

In this task, you identify the internal IP address of the source database instance that you want to migrate to Cloud SQL.

1.  In the Google Cloud console, on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ), click **Compute Engine > VM instances**.
    
2.  Locate the **dms-mysql-training-vm-v2** instance.
    
3.  Record the **Internal IP** (e.g. 10.128.0.2) to use later in this lab.
    

## **Task 2. Create and start a continuous migration job**

When you create a new migration job, you first define the source database instance using a connection profile. Then you designate a destination database instance and configure connectivity between the source and destination instances.

In this task, you use the migration job interface to create a new Cloud SQL for MySQL database instance and set it as the destination for the continuous migration job from the MySQL source instance.

### Create a new continuous migration job

1.  In the Google Cloud console title bar, type **Database Migration** in the **Search** field. Click **Database Migration** from the results.
    
2.  In the left pane, click **Migration jobs**.
    
3.  Click **Create a migration job**.
    

### Get started

1.  On the **Get Started** tab, use the following values:
    

| **Property** | **Value** |
| --- | --- |
| **Migration job name** | **vm-to-cloudsql** |
| **Migration job ID** | Keep the auto-generated value |
| **Source database engine** | **MySQL** |
| **Destination region** | `(region)` |
| **Migration job type** | **Continuous** |

Leave all other settings as default.

2.  Click **Save & continue**.
    

### Define the source instance

1.  On the **Define a source** tab, select **Create a connection profile** from the **Select source connection profile** menu.
    
2.  Enter the required information for a connection profile, and then leave the remaining settings as their defaults:
    

| **Property** | **Value** |
| --- | --- |
| **Connection profile name** | **mysql-vm** |
| **Connection profile ID** | Keep the auto-generated value |
| **Hostname or IP address** | Enter the internal IP for the MySQL source instance that you previously recorded |
| **Port** | **3306** |
| **Username** | **admin** |
| **Password** | **changeme** |
| **Region** | `(region)` |
| **Encryption type** | **None** |

3.  Click **Create**.
    

A new connection profile named **mysql-vm** appears in the Connections profile list.

4.  Click **Save & continue**.
    

Click **Check my progress** to verify the objective.

Create a connection profile for the MySQL source instance.

### Define a destination

1.  On the **Define a destination** tab, for **Type of destination instance**, select **Existing instance**.
    
2.  For **Instance ID**, select `SQL instance name`.
    
3.  Click **Select & Continue**.
    
4.  When prompted, type `SQL instance name` and click **confirm & Continue**.
    

**Note:** This step may take a few minutes. If asked to retry the request, click the Retry button to refresh the Service Networking API.

### Define connectivity method

1.  On the **Define connectivity method** tab, for **Connectivity method**, select **VPC peering**.
    
2.  For **VPC**, select **default**.
    

VPC peering is configured by Database Migration Service using the information provided for the VPC network (the default network in this example).

When you see an updated message that the destination instance was created, proceed to the next step.

3.  Click **Configure & continue**.
    

### Configure migration databases

*   On the **Configure migration databases** tab, click **Save & continue**.
    

### Test and create migration job

1.  On the **Test and create migration job** tab, review the details of the migration job.
    
2.  Click **Test Job**.
    
3.  After a successful test, click **Create & start job**.
    
4.  When prompted, click **Create & start** to confirm.
    

The **Migration job details: vm-to-cloudsql** opens.

## **Task 3. Review the status of the continuous migration job**

In this task, you view the **Migration job details: vm-to-cloudsql** page to review the migration job status.

*   If you have not started the job, the status shows as **Not started**. You can choose to start or delete the job.
    
*   After the job has started, the status shows as *Starting* and then transition to **Running** to indicate that the initial database dump is in progress.
    

When the job status changes to **Running**, proceed to the next task.

**Note:** Continuous migration jobs remain in a running status to ensure that the destination database continues to receive data updates from the source.

A completed status is achieved after the destination database is promoted to be a standalone database for reading and writing data (see task 7).

Click **Check my progress** to verify the objective.

Create, start, and review a continuous migration job.

## **Task 4. Confirm the data in Cloud SQL for MySQL**

In this task, you review the data in the **mysql-cloudsql** instance.

### Check the MySQL databases in Cloud SQL

1.  In the Google Cloud console, on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ), click **Cloud SQL**.
    
2.  Click the **mysql-cloudsql** instance (MySQL read replica).
    
3.  In the **Replica Instance** pane on the left, click **Databases**.
    

Notice that the databases called **customers\_data** and **sales\_data** have been migrated to Cloud SQL.

### Connect to the MySQL instance

1.  In the **Replica instance** pane on the left, click **Overview**.
    
2.  Scroll down and click **Open Cloud Shell**.
    

The command to connect to MySQL pre-populates in Cloud Shell:

```plaintext
gcloud sql connect mysql-cloudsql --user=root --quiet
```

Copied!

3.  Run the pre-populated command.
    

If prompted, click **Authorize** for the API.

4.  When prompted for a password, which you previously set, enter:
    

```plaintext
supersecret!
```

Copied!

You have activated the MySQL interactive console for the destination instance.

### Review the data in the Cloud SQL for MySQL instance

1.  To select the database in the MySQL interactive console, run the following command in the MySQL interactive console:
    

```plaintext
use customers_data;
```

Copied!

2.  Query the number of records in the customers table:
    

```plaintext
select count(*) from customers;
```

Copied!

There are 5,030 records in the customers table that were migrated from the MySQL source instance.

3.  Sort the records in the customers table by last name and review the first ten records:
    

```plaintext
select * from customers
order by lastName
limit 10;
```

Copied!

Note that the last name of the first record in the customers table is Accumsan.

In the next task, you add new records to the customers table in the source database instance. The continuous migration job migrates the new records from the source instance to the destination instance.

4.  Exit the MySQL interactive console:
    

```plaintext
exit
```

Copied!

Click **Check my progress** to verify the objective.

## **Task 5. Test the continuous migration of data from the source to the destination instance**

To confirm continuous data migration, data is added to the source database and checked for successful transfer to the destination database.

### Add new data to the source instance

1.  In the Google Cloud console, on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ), click **Compute Engine** > **VM instances**.
    
2.  Locate the line with the instance called **dms-mysql-training-vm-v2**.
    
3.  For **Connect**, click **SSH** to open a terminal window.
    
4.  To connect to the MySQL interactive console within the terminal window, run the following command:
    

```plaintext
mysql -u admin -p
```

Copied!

5.  When prompted for a password, enter:
    

```plaintext
changeme
```

Copied!

6.  To select the database in the MySQL interactive console, run the following command:
    

```plaintext
use customers_data;
```

Copied!

7.  Add two new data records to the customers table with the following command:
    

```plaintext
INSERT INTO customers (customerKey, addressKey, title, firstName, lastName, birthdate, gender, maritalStatus, email, creationDate)
VALUES ('9365552000000-999', '9999999', 'Ms', 'Magna', 'Ablorem', '1953-07-28 00:00:00', 'FEMALE', 'MARRIED', 'magna.lorem@gmail.com', CURRENT_TIMESTAMP),
('9965552000000-9999', '99999999', 'Mr', 'Arcu', 'Abrisus', '1959-07-28 00:00:00', 'MALE', 'MARRIED', 'arcu.risus@gmail.com', CURRENT_TIMESTAMP);
```

Copied!

8.  Query the new number of records in the customers table:
    

```plaintext
select count(*) from customers;
```

Copied!

There are now 5,032 records in the customers table in the MySQL source instance.

9.  Sort the records in the customers table by last name and review the first ten records:
    

```plaintext
select * from customers
order by lastName
limit 10;
```

Copied!

Note that the last name of the first record in the customers table has changed to Ablorem.

10.  Exit the MySQL interactive console:
     

```plaintext
exit
```

Copied!

11.  Exit the terminal session:
     

```plaintext
exit
```

Copied!

### Connect to the Cloud SQL for MySQL instance

1.  In the Google Cloud console, on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ), click **Cloud SQL**.
    
2.  Click on the instance ID called **mysql-cloudsql** (MySQL read replica).
    
3.  In the **Replica Instance** pane, click **Overview**.
    
4.  Click **Open Cloud Shell**.
    

The command to connect to MySQL pre-populates in Cloud Shell:

```plaintext
gcloud sql connect mysql-cloudsql --user=root --quiet
```

Copied!

5.  Run the pre-populated command.
    
6.  When prompted for a password, which you previously set, enter:
    

```plaintext
supersecret!
```

Copied!

You have activated the MySQL interactive console for the destination instance.

### Check that the data updates have been applied to the Cloud SQL for MySQL instance

1.  To select the database in the MySQL interactive console, run the following command:
    

```plaintext
use customers_data;
```

Copied!

2.  Query the number of records in the customers table:
    

```plaintext
select count(*) from customers;
```

Copied!

Notice that the two records added to the MySQL source instance have been migrated. There are now 5,032 records in the customers table in the Cloud SQL destination instance.

3.  Sort the records in the customers table by last name and review the first ten records:
    

```plaintext
select * from customers
order by lastName
limit 10;
```

Copied!

Note that the last name of the first record in the customers table (Ablorem) is now the same across the Cloud SQL destination instance and the MySQL source instance.

4.  Exit the MySQL interactive console:
    

```plaintext
exit
```

Copied!

Click **Check my progress** to verify the objective.

## **Task 6. Promote Cloud SQL to be a standalone instance for reading and writing data**

Promoting a Cloud SQL read replica to a standalone instance enables it to handle both read and write operations, effectively transforming it into a new primary instance.

1.  In the Google Cloud console title bar, type **Database Migration** in the **Search** field. Click **Database Migration** from the results.
    
2.  Click the migration job name **vm-to-cloudsql** to see the details page.
    
3.  Click **Promote**.
    
4.  When prompted to confirm, click **Promote**.
    

When the promotion is complete, the status of the job updates to *Completed*.

5.  In the Google Cloud console, on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ), click **Cloud SQL**.
    

Note that **mysql-cloudsql** is now a standalone instance for reading and writing data.

![The instance named mysql-cloudsql is labeled as the primary instance.](https://cdn.qwiklabs.com/m5xEMNvJXsMlFVreXv8F%2Bk72hILFVSVKL4phEmxucRs%3D align="center")

Click **Check my progress** to verify the objective.

Promote Cloud SQL for MySQL to be a standalone instance for reading and writing data.

* * *

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=ZjCk3aBlCn8] 

```plaintext
gcloud services enable datamigration.googleapis.com --quiet
gcloud services enable servicenetworking.googleapis.com --quiet
```

```plaintext
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Migrating%20On-premises%20MySQL%20Using%20a%20Continuous%20Database%20Migration%20Service%20Job/TechCode.sh
sudo chmod +x TechCode.sh 
./TechCode.sh
```