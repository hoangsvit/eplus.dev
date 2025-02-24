---
title: "Introduction to BigQuery SQL translation (Solution)"
seoTitle: "Introduction to BigQuery SQL translation (Solution)"
seoDescription: "This lab describes how to use the batch SQL translator in BigQuery to translate scripts written in other SQL dialects into GoogleSQL queries."
datePublished: Mon Feb 24 2025 06:32:08 GMT+0000 (Coordinated Universal Time)
cuid: cm7iok55a000809k6brwubi3d
slug: introduction-to-bigquery-sql-translation-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740378056654/18114a9a-66e5-49ae-b8ff-94418c63efca.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740378704371/927134b5-4415-4b5d-b132-5ea1286b90d1.png
tags: introduction-to-bigquery-sql-translation-solution, introduction-to-bigquery-sql-translation

---

## **Overview**

This lab describes how to use the batch SQL translator in BigQuery to translate scripts written in other SQL dialects into GoogleSQL queries.

Migrating a Data Warehouse to the cloud or from another cloud provider is a tedious task. This task requires even more effort when the different SQL dialects are used, as one has to re-implement the entire logic.

Google Cloud Platform makes it easier with SQL translator, which is part of the BigQuery Migration Service. SQL translators are available in two modes: batch and interactive, that translates scripts and queries written in other SQL dialects into GoogleSQL queries.

The SQL translator can translate the following SQL dialects into GoogleSQL: Amazon Redshift SQL Teradata SQL except for SPL

Additionally, translation of the following SQL dialects is supported in preview:

* Apache HiveQL
    
* Apache Spark SQL
    
* Azure Synapse T-SQL
    
* Basic Teradata Query (BTEQ)
    
* IBM Netezza SQL/NZPLSQL
    
* MySQL SQL
    
* Oracle SQL, PL/SQL, Exadata
    
* PostgreSQL SQL
    
* Presto SQL
    
* Snowflake SQL
    
* SQL Server T-SQL
    
* Teradata SPL
    
* Vertica SQL
    

### What you'll learn

In this lab, you will learn:

* To translate scripts using Batch SQL translator.
    
* To interactively translate queries with Interactive SQL translator.
    

## **Setup**

### Qwiklabs setup

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Make sure you signed into Qwiklabs using an **incognito window**.
    
2. Note the lab's access time (for example, and make sure you can finish in that time block.
    

<aside><p>There is no pause feature. You can restart if needed, but you have to start at the beginning.</p><br /></aside>

3. When ready, click .
    
4. Note your lab credentials. You will use them to sign in to the Google Cloud Console.
    
5. Click **Open Google Console**.
    
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts.
    

<aside><p>If you use other credentials, you

7. Accept the terms and skip the recovery resource page.
    

<aside><p>Do not click<span> </span><strong>End Lab</strong><span> </span>unless you are finished with the lab or want to restart it. This clears your work and removes the project.</p></aside>

## **Task 1. Enable the API**

In the Google Cloud Console,

1. Go to the **Navigation menu** &gt; **APIs & Services** &gt; **Library**.
    
2. Search for **BigQuery Migration API**.
    
3. Click on the BigQuery Migration API and if the API is not Enabled, click Enable.
    

## **Task 2. Translate scripts with batch SQL translator**

### Collect source files

Collect the source files containing the Teradata scripts and queries to be translated.

1. In Cloud Shell, create a file named `source_teradata.txt`.
    

```apache
nano source_teradata.txt
```

2. Add the following script to the file.
    

```apache
-- Create a new table named "Customers"
CREATE TABLE Customers (
  CustomerID INTEGER PRIMARY KEY,
  FirstName VARCHAR(255),
  LastName VARCHAR(255),
  Email VARCHAR(255)
);


-- Insert some data into the "Customers" table
INSERT INTO Customers (CustomerID, FirstName, LastName, Email)
VALUES (1, 'John', 'Doe', 'johndoe@example.com');

INSERT INTO Customers (CustomerID, FirstName, LastName, Email)
VALUES (2, 'Jane', 'Smith', 'janesmith@example.com');

INSERT INTO Customers (CustomerID, FirstName, LastName, Email)
VALUES (3, 'Bob', 'Johnson', 'bobjohnson@example.com');


-- Select all data from the "Customers" table
SELECT * FROM Customers;


-- Add a new column to the "Customers" table
ALTER TABLE Customers ADD Address VARCHAR(255);


-- Update the email address for a specific customer
UPDATE Customers SET Email = 'johndoe2@example.com' WHERE CustomerID = 1;


-- Delete a customer record from the "Customers" table
DELETE FROM Customers WHERE CustomerID = 3;


-- Select customers whose first name starts with 'J'
SELECT * FROM Customers WHERE FirstName LIKE 'J%';
```

3. Save and close the nano editor by entering **Ctrl+x** to exit, then **Y** to save the contents, and then enter to write the saved contents to the file.
    
4. Create Cloud Storage bucket and upload source files
    
5. In Cloud Shell, run the following command to create a Cloud Storage bucket.
    

```apache
gsutil mb gs://qwiklabs-gcp-00-4002e2694721
```

6. Upload the source file to the bucket.
    

```apache
gsutil cp source_teradata.txt gs://qwiklabs-gcp-00-4002e2694721/source/source_teradata.txt
```

Click *Check my progress* to verify the objective.

Collect source files

Check my progress

### Submit the translation job

1. In the Google Cloud console, go to the **BigQuery** page.
    
2. In the **Migration** section of the navigation panel, click **SQL translation**.
    
3. Click **\+ Start Translation**.
    
4. Fill in the translation configuration dialog.
    
    * For Display name, type a name for the translation job. The name can contain letters, numbers or underscores.
        
    * For Processing location, select the location as **US**. The translation job performs best when you choose the same location as your source file bucket.
        
    * For Source dialect, select **Teradata**.
        
    * For Target dialect, select **GoogleSQL**.
        
    * Click Next.
        
5. For Source location, specify the path to the Cloud Storage folder containing the files to translate. Use the Browse option to browse to the `source` path as `qwiklabs-gcp-00-4002e2694721`/source.
    
6. Click Next.
    
7. For Target location, specify the path as `qwiklabs-gcp-00-4002e2694721`/target.
    
8. Leave the optional settings to its default values, and click Create to start the translation job.
    

Once the translation job is created, you can see its status in the translation jobs list.

### Explore the translation output

After running the translation job, you can see information about the job in the Google Cloud console. You can see job results in the destination Cloud Storage bucket named `qwiklabs-gcp-00-4002e2694721`.

To see translation job details, follow these steps:

1. In the Google Cloud console, go to the BigQuery page.
    
2. In the Migration section of the navigation panel, click SQL translation.
    
3. In the list of translation jobs, locate and click the translation job name you have created.
    
4. In the Results section, you can see the overall translation success rate, the number of statements processed, and the job duration.
    
5. Select the Actions tab to see translation issues and how often they occurred. Each action listed has child rows that show the issue category, the specific issue message, and a link to the file in which the issue occurred.
    
6. Select the Translation Configuration tab to see the translation job configuration details.
    
7. In the Translation report section, click **translation\_report.csv**.
    
8. On the Object details page, click the value in the Authenticated URL row to see the file in your browser.
    
9. For each source file, a corresponding output file is generated in the Cloud Storage bucket named `qwiklabs-gcp-00-4002e2694721`, under `target` directory. The output file is named similarly to the source file and contains the translated script.
    

Click *Check my progress* to verify the objective.

Create the translation job

Check my progress

## **Task 3. Create Dataset and translate queries with the interactive SQL translator**

The BigQuery interactive SQL translator is an interactive SQL translation tool that helps speed up and simplify the migration of SQL workloads to BigQuery.

### Create a BigQuery dataset

Create a BigQuery dataset named `cymbal_warehouse`, by running the below command in the cloud shell.

```apache
bq mk -d --data_location=US cymbal_warehouse
```

### Translate queries

1. Translate a Teradata query into GoogleSQL
    
2. On the BigQuery page, in the Editor pane, click More, and then select Translation settings.
    
3. For Source dialect, select the Teradata.
    
4. For Processing location, leave the field to its default value.
    
5. Click **Save**.
    
6. In the Editor pane, click More, and then select Enable SQL translation. For any prompt regarding enabling translation mode, click **Confirm**. The Editor pane splits into two panes. In the left pane, enter the following query.
    

```apache
-- Create a new table named "Orders"
CREATE TABLE cymbal_warehouse.Orders (
 OrderID INTEGER PRIMARY KEY,
 CustomerID INTEGER,
 OrderDate DATE,
 TotalAmount NUMERIC(10,2)
);


-- Insert data into the "Orders" table
INSERT INTO cymbal_warehouse.Orders (OrderID, CustomerID, OrderDate, TotalAmount)
VALUES (1, 1, '2022-01-01', 100.00);


INSERT INTO cymbal_warehouse.Orders (OrderID, CustomerID, OrderDate, TotalAmount)
VALUES (2, 2, '2022-01-02', 200.00);


INSERT INTO cymbal_warehouse.Orders (OrderID, CustomerID, OrderDate, TotalAmount)
VALUES (3, 1, '2022-01-03', 150.00);


INSERT INTO cymbal_warehouse.Orders (OrderID, CustomerID, OrderDate, TotalAmount)
VALUES (4, 3, '2022-01-04', 75.00);
```

7. Click Translate.
    

BigQuery translates your query into GoogleSQL and displays it in the right pane.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=zHhzda1Nk9k&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Introduction%20to%20BigQuery%20SQL%20translation/quicklab.sh
sudo chmod +x quicklab.sh
./quicklab.sh
```