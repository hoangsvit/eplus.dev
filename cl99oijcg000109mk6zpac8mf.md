---
title: "Cloud SQL for PostgreSQL: Qwik Start - GSP152"
seoTitle: "Cloud SQL for PostgreSQL: Qwik Start - GSP152"
seoDescription: "In this lab you'll learn how to create and connect to a Google Cloud SQL PostgreSQL instance and perform basic SQL operations using the Cloud Console and th"
datePublished: Tue Aug 06 2024 17:00:00 GMT+0000 (Coordinated Universal Time)
cuid: cl99oijcg000109mk6zpac8mf
slug: cloud-sql-for-postgresql-qwik-start-gsp152
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758002061255/7add00de-ee66-485d-b649-14fddb2f818d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1758001914118/f70bdc1f-09db-4715-bb54-6a137aa6be9e.png
tags: postgresql, cloud-sql-for-postgresql-qwik-start-gsp152, gsp1262, cloud-sql-for-postgresql-qwik-start, cloud-sql-for-postgresql

---

## **Overview**

In this lab you'll learn how to create and connect to a Google Cloud SQL PostgreSQL instance and perform basic SQL operations using the Cloud Console and the psql client.

### **Task 1. Create a Cloud SQL instance**

1. Click on the menu icon in the top left of the screen to see the **Navigation menu** ().
    
2. In the left menu of the Console, click on **SQL**.
    
3. Click **Create Instance**.
    
4. Click **Choose PostgreSQL**.
    
5. Create your instance with the following settings:
    

* Enter `myinstance` for **Instance ID**.
    
* Enter a password for the postgres user. Save or remember this password, you'll need it in the next section.
    
* For **Choose a Cloud SQL edition**, select **Enterprise**.
    
* For **Region** select `europe-west1`.
    
* Leave the default values for the other fields.
    

6. Click **Create Instance**.
    

You are returned to the instances list. Your new instance is greyed out while it initializes and starts.

After a few minutes your instance is created and you can continue to the next section. If it seems to be taking a long time refresh your browser.

**Test completed task**

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will granted with an assessment score.

Create a Cloud SQL instance

**Check my progress**

### **Task 2. Test your understanding**

Below are multiple choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

What PostgreSQL Database version used in lab to create Cloud SQL instance?15.45.75.61.0

**Submit**

### **Task 3. Connect to your instance using the psql client in the Cloud Shell**

1. In the Cloud Console, click **Cloud Shell** () in the upper right corner.
    
2. Then click **Continue** if prompted.
    
3. At the Cloud Shell prompt, connect to your Cloud SQL instance by running:
    

```apache
gcloud sql connect myinstance --user=postgres
```

4. Enter your postgres password.
    

**Note:** The cursor will not move. Press **Enter** when you're done typing.

You should now see the `psql` prompt.

### **Task 4. Upload data into the postgres database**

1. Insert sample data into the postgres database:
    

```sql
CREATE TABLE guestbook (guestName VARCHAR(255), content VARCHAR(255), entryID SERIAL PRIMARY KEY);
INSERT INTO guestbook (guestName, content) values ('first guest', 'I got here!');
INSERT INTO guestbook (guestName, content) values ('second guest', 'Me too!');
```

2. Retrieve the data:
    

```sql
SELECT * FROM guestbook;
```

You should now see:

```yaml
 guestname   |   content   | entryid
--------------+-------------+---------
 first guest  | I got here! |       1
 second guest | Me too!     |       2
(2 rows)
postgres=>
```

You have created a Google Cloud SQL PostgreSQL instance and connected to it.

### **Task 5. Test your understanding**

Below are multiple choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

What is the name of default database in Postgres Cloud SQL instance?

* information\_schema
    
* guestbook
    
* performance\_schema
    
* postgres
    

---

## Solution of Lab

### New Solution

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP152/lab.sh
source lab.sh
```


### Old Solution

%[https://www.youtube.com/watch?v=MyqqjtnO5w0&feature=youtu.be] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1722995610607/8c0fd756-3d63-4eae-b6c4-12cbaa44334d.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Cloud%20SQL%20for%20PostgreSQL%20Qwik%20Start/quicklabgsp152.sh
sudo chmod +x quicklabgsp152.sh
./quicklabgsp152.sh
```