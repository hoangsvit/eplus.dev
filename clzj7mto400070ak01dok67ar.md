---
title: "Cloud SQL for MySQL: Qwik Start - GSP151"
seoTitle: "Cloud SQL for MySQL: Qwik Start - GSP151"
seoDescription: "In this lab, you learn how to create and connect to a Cloud SQL for MySQL instance and perform basic SQL operations using the Cloud console and the mysql cl"
datePublished: Wed Aug 07 2024 02:08:27 GMT+0000 (Coordinated Universal Time)
cuid: clzj7mto400070ak01dok67ar
slug: cloud-sql-for-mysql-qwik-start-gsp151
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758001678478/22d9c733-31cb-491a-b3c8-658546b6ab5e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1758001703754/52524eb4-69a7-4c84-8bfe-57f7d36356cf.png
tags: cloud-sql-for-mysql-qwik-start-gsp151, gsp151, cloud-sql-for-mysql

---

## **Overview**

In this lab, you learn how to create and connect to a Cloud SQL for MySQL instance and perform basic SQL operations using the Cloud console and the `mysql` client.

### What you'll do

* Create a Cloud SQL instance
    
* Connect to the instance in Cloud Shell
    
* Create a database and upload data
    

### **Task 1. Create a Cloud SQL instance**

1. From the **Navigation menu** () click on **SQL**.
    
2. Click **Create Instance**.
    
3. Choose **MySQL** database engine.
    
4. Enter Instance ID as `myinstance`.
    
5. In the password field click on the **Generate** link and the eye icon to see the password. **Save** the password to use in the next section.
    
6. Select the database version as **MySQL 8**.
    
7. For **Choose a Cloud SQL edition**, select **Enterprise** edition.
    
8. For **Preset** choose **Development** (4 vCPU, 16 GB RAM, 100 GB Storage, Single zone).
    

**Warning:** if you choose a preset larger than Development, your project will be flagged and your lab will be terminated.

9. Set **Region** as `<REGION>`.
    
10. Set the **Multi zones (Highly available)** &gt; **Primary Zone** field as `<ZONE>`.
    
11. Click **CREATE INSTANCE**.
    

It might take a few minutes for the instance to be created. Once it is, you will see a green checkmark next to the instance name.

12. Click on the Cloud SQL instance. The **SQL Overview** page opens.
    

**Test Completed Task**

Click **Check my progress** to verify your performed task. If you have successfully created a Cloud SQL instance, you will see an assessment score.

Create a Cloud SQL instance

**Check my progress**

**Test your understanding**

Below is a true/false question to reinforce your understanding of this lab's concepts. Answer it to the best of your ability.

Instance ID is used to uniquely identify your instance within the project.TrueFalse

### **Task 2. Connect to your instance using the mysql client in Cloud Shell**

1. In the Cloud Console, click the **Cloud Shell** icon in the upper right corner.
    

2. Click **Continue**.
    
3. At the Cloud Shell prompt, connect to your Cloud SQL instance by running the following:
    

```apache
gcloud sql connect myinstance --user=root
```

Click **Authorize**.

4. Enter your root password when prompted. **Note:** The cursor will not move.
    
5. Press the **Enter** key when you're done typing.
    

You should now see the `mysql` prompt.

### **Task 3. Create a database and upload data**

1. Create a SQL database called `guestbook` on your Cloud SQL instance:
    

```sql
CREATE DATABASE guestbook;
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a custom database on the Cloud SQL instance, you will see an assessment score.

Create a database.

**Check my progress**

2. Insert the following sample data into the guestbook database:
    

```apache
USE guestbook;
CREATE TABLE entries (guestName VARCHAR(255), content VARCHAR(255),
    entryID INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(entryID));
    INSERT INTO entries (guestName, content) values ("first guest", "I got here!");
INSERT INTO entries (guestName, content) values ("second guest", "Me too!");
```

3. Now retrieve the data:
    

```sql
SELECT * FROM entries;
```

You should see:

```apache
+--------------+-------------------+---------+
| guestName    | content           | entryID |
+--------------+-------------------+---------+
| first guest  | I got here!       |       1 |
| second guest | Me too!           |       2 |
+--------------+-------------------+---------+
2 rows in set (0.00 sec)
mysql>
```

---

## Solution of Lab

### New Solution

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP151/lab.sh
source lab.sh
```

### Old Solution

%[https://www.youtube.com/watch?v=bUAZne0NeoA] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722996464559/41cbacb8-45e4-4907-9355-4a1e00381654.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Cloud%20SQL%20for%20MySQL%20Qwik%20Start/quicklabgsp151.sh
sudo chmod +x quicklabgsp151.sh
./quicklabgsp151.sh
```