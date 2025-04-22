---
title: "Cloud Spanner - Defining Schemas and Understanding Query Plans - GSP1050"
seoTitle: "Cloud Spanner - Defining Schemas and Understanding Query Plans - GSP10"
seoDescription: "Cloud Spanner is Google’s fully managed, horizontally scalable relational database service. Customers in financial services, gaming, retail and many other i"
datePublished: Tue Apr 22 2025 05:40:10 GMT+0000 (Coordinated Universal Time)
cuid: cm9s2svib001i09jze773b2uy
slug: cloud-spanner-defining-schemas-and-understanding-query-plans-gsp1050
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745300241228/e5d1e22c-fae5-4040-a174-2f68954c05ac.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745300399340/9e266a24-8a6a-4d4f-85a1-0157e4cceb59.png
tags: cloud-spanner-defining-schemas-and-understanding-query-plans-gsp1050, cloud-spanner-defining-schemas-and-understanding-query-plans, gsp1050

---

## Overview

Cloud Spanner is Google’s fully managed, horizontally scalable relational database service. Customers in financial services, gaming, retail and many other industries trust it to run their most demanding workloads, where consistency and availability at scale are critical.

In this lab, you review schema related features of Cloud Spanner and apply those to a Banking Operations database. You also review the methods and rules by which Cloud Spanner creates query plans.

### What you'll do

In this lab, you learn to modify schema related attributes of a Cloud Spanner instance.

* Load data into tables
    
* Use pre-defined Python client library code to load data
    
* Query data with client libraries
    
* Make updates to the database schema
    
* Add a Secondary Index
    
* Examine Query plans
    

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
    student-03-1f651e6d772c@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    oKQ5Q2gjyqmW
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-a89bf872cec9`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-a89bf872cec9
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
ACCOUNT: student-03-1f651e6d772c@qwiklabs.net

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
project = qwiklabs-gcp-03-a89bf872cec9
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Cloud Spanner instance

In order to allow you to move more quickly through this lab a Cloud Spanner instance, database, and tables were automatically created for you.

Here are some details for your reference:

| **Item** | **Name** | **Details** |
| --- | --- | --- |
| Cloud Spanner Instance | banking-ops-instance | This is the project-level instance |
| Cloud Spanner Database | banking-ops-db | This is the instance specific database |
| Table | Portfolio | Contains top-level bank offerings |
| Table | Category | Contains second-tier bank offering groupings |
| Table | Product | Contains specific line-item bank offerings |
| Table | Campaigns | Contains details on marketing initiatives |

## Task 1. Load data into tables

The **banking-ops-db** was created with empty tables. Follow the steps below to load data into three of the tables (**Portfolio**, **Category**, and **Product**).

1. From the Cloud Console, open the navigation menu () &gt; **View All Products**, under **Databases** click **Spanner**.
    
2. The instance name is **banking-ops-instance**, click on the name to explore the databases.
    
3. The associated database is named **banking-ops-db**. Click on the name, scroll down to **Tables**, and you will see there are four tables already in place.
    
4. On the left pane of the Console, click **Spanner Studio**. Then click the **\+ New SQL Editor Tab** button in the right frame.
    
5. This takes you to the **Query** page. Paste the insert statements below as a single block to load the **Portfolio** table. Spanner will execute each in succession. Click **Run**:
    

```apache
insert into Portfolio (PortfolioId, Name, ShortName, PortfolioInfo) values (1, "Banking", "Bnkg", "All Banking Business");
insert into Portfolio (PortfolioId, Name, ShortName, PortfolioInfo) values (2, "Asset Growth", "AsstGrwth", "All Asset Focused Products");
insert into Portfolio (PortfolioId, Name, ShortName, PortfolioInfo) values (3, "Insurance", "Ins", "All Insurance Focused Products");
```

6. The lower page of the screen shows the results of inserting the data one row at a time. A green checkmark also appears on each row of inserted data. The **Portfolio** table now has three rows.
    
7. Click **Clear** in the top portion of the page.
    
8. Paste the insert statements below as a single block to load the **Category** table. Click **Run**:
    

```apache
insert into Category (CategoryId,PortfolioId,CategoryName) values (1,1,"Cash");
insert into Category (CategoryId,PortfolioId,CategoryName) values (2,2,"Investments - Short Return");
insert into Category (CategoryId,PortfolioId,CategoryName) values (3,2,"Annuities");
insert into Category (CategoryId,PortfolioId,CategoryName) values (4,3,"Life Insurance");
```

9. The lower page of the screen shows the results of inserting the data one row at a time. A green checkmark also appears on each row of inserted data. The **Category** table now has four rows.
    
10. Click **Clear** in the top portion of the page.
    
11. Paste the insert statements below as a single block to load the **Product** table. Click **Run**:
    

```apache
insert into Product (ProductId,CategoryId,PortfolioId,ProductName,ProductAssetCode,ProductClass) values (1,1,1,"Checking Account","ChkAcct","Banking LOB");
insert into Product (ProductId,CategoryId,PortfolioId,ProductName,ProductAssetCode,ProductClass) values (2,2,2,"Mutual Fund Consumer Goods","MFundCG","Investment LOB");
insert into Product (ProductId,CategoryId,PortfolioId,ProductName,ProductAssetCode,ProductClass) values (3,3,2,"Annuity Early Retirement","AnnuFixed","Investment LOB");
insert into Product (ProductId,CategoryId,PortfolioId,ProductName,ProductAssetCode,ProductClass) values (4,4,3,"Term Life Insurance","TermLife","Insurance LOB");
insert into Product (ProductId,CategoryId,PortfolioId,ProductName,ProductAssetCode,ProductClass) values (5,1,1,"Savings Account","SavAcct","Banking LOB");
insert into Product (ProductId,CategoryId,PortfolioId,ProductName,ProductAssetCode,ProductClass) values (6,1,1,"Personal Loan","PersLn","Banking LOB");
insert into Product (ProductId,CategoryId,PortfolioId,ProductName,ProductAssetCode,ProductClass) values (7,1,1,"Auto Loan","AutLn","Banking LOB");
insert into Product (ProductId,CategoryId,PortfolioId,ProductName,ProductAssetCode,ProductClass) values (8,4,3,"Permanent Life Insurance","PermLife","Insurance LOB");
insert into Product (ProductId,CategoryId,PortfolioId,ProductName,ProductAssetCode,ProductClass) values (9,2,2,"US Savings Bonds","USSavBond","Investment LOB");
```

12. The lower page of the screen shows the results of inserting the data one row at a time. A green checkmark also appears on each row of inserted data. The **Product** table now has nine rows.
    
13. Click **Check my progress** to verify the objective.
    

Load Data into Portfolio, Category, and Product Tables

**Check my progress**

## Task 2. Use pre-built Python client library code to load data

You will be using the client libraries written in Python for the next several steps.

1. Open the **Cloud Shell** and paste the commands below to create and change into a new directory to hold the required files.
    

```apache
mkdir python-helper
cd python-helper
```

2. Next download two files. One is used to setup the environment. The other is the lab code.
    

```apache
wget https://storage.googleapis.com/cloud-training/OCBL373/requirements.txt
wget https://storage.googleapis.com/cloud-training/OCBL373/snippets.py
```

3. Create an isolated Python environment and install dependencies for the Cloud Spanner client.
    

```apache
pip install -r requirements.txt
pip install setuptools
```

4. The **snippets.py** is a consolidated file with multiple Cloud Spanner DDL, DML, and DCL functions that you are going to use as a helper during this lab. Execute **snippets.py** using the **insert\_data** argument to populate the **Campaigns** table.
    

```apache
python snippets.py banking-ops-instance --database-id  banking-ops-db insert_data
```

5. Click **Check my progress** to verify the objective.
    

Load Data into Campaigns Table

**Check my progress**

## Task 3. Query data with client libraries

The **query\_data()** function in **snippets.py** can be used to query your database. In this case you use it to confirm the data loaded into the **Campaigns** table. You will not change any code, the section is shown here for your reference.

```apache
def query_data(instance_id, database_id):
    """Queries sample data from the database using SQL."""
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    with database.snapshot() as snapshot:
        results = snapshot.execute_sql(
            "SELECT CampaignId,PortfolioId,CampaignStartDate,CampaignEndDate,CampaignName,CampaignBudget FROM Campaigns"
        )

        for row in results:
            print(u"CampaignId: {}, PortfolioId: {}, CampaignStartDate: {}, CampaignEndDate: {}, CampaignName: {}, CampaignBudget: {}".format(*row))
```

1. Execute **snippets.py** using the **query\_data** argument to query the **Campaigns** table.
    

```apache
python snippets.py banking-ops-instance --database-id  banking-ops-db query_data
```

The result should look like the following

```apache
CampaignId: 1, PortfolioId: 1, CampaignStartDate: 2022-06-07, CampaignEndDate: 2022-06-07, CampaignName: New Account Reward, CampaignBudget: 15000
CampaignId: 2, PortfolioId: 2, CampaignStartDate: 2022-06-07, CampaignEndDate: 2022-06-07, CampaignName: Intro to Investments, CampaignBudget: 5000
CampaignId: 3, PortfolioId: 2, CampaignStartDate: 2022-06-07, CampaignEndDate: 2022-06-07, CampaignName: Youth Checking Accounts, CampaignBudget: 25000
CampaignId: 4, PortfolioId: 3, CampaignStartDate: 2022-06-07, CampaignEndDate: 2022-06-07, CampaignName: Protect Your Family, CampaignBudget: 10000
```

## Task 4. Updating the database schema

As part of your DBA responsibilities you are required to add a new column called **MarketingBudget** to the **Category** table. Adding a new column to an existing table requires an update to your database schema. Cloud Spanner supports schema updates to a database while the database continues to serve traffic. Schema updates do not require taking the database offline and they do not lock entire tables or columns; you can continue reading and writing data to the database during the schema update.

### Adding a column using Python

The **update\_ddl()** method of the **Database** class is used to modify the schema.

Use the **add\_column()** function in **snippets.py** which implements that method. You will not change any code, the section is shown here for your reference.

```apache
def add_column(instance_id, database_id):
    """Adds a new column to the Albums table in the example database."""
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    operation = database.update_ddl(
        ["ALTER TABLE Category ADD COLUMN MarketingBudget INT64"]
    )

    print("Waiting for operation to complete...")
    operation.result(OPERATION_TIMEOUT_SECONDS)

    print("Added the MarketingBudget column.")
```

1. Execute **snippets.py** using the **add\_column** argument.
    

```apache
python snippets.py banking-ops-instance --database-id  banking-ops-db add_column
```

2. Click **Check my progress** to verify the objective.
    

Add column to Category table

**Check my progress**

### Other options to add a column to an existing table include the following:

#### Issuing a DDL command via the gcloud CLI.

**Note:** This option is shown as an alternate example. **Do not issue this command.**

The code sample below completes the same task you just executed via Python.

```apache
gcloud spanner databases ddl update banking-ops-db --instance=banking-ops-instance --ddl='ALTER TABLE Category ADD COLUMN MarketingBudget INT64;'
```

#### Issuing a DDL command in the Cloud Console.

**Note:** This option is shown as an alternate example. **Do not perform this action.**

1. Click the table name in the Database listing.
    
2. Click **Write DDL** in the top right corner of the page.
    
3. Paste the appropriate DDL in the **DDL Templates** box.
    
4. Click **Submit**.
    

![AddColumnUI.png](https://cdn.qwiklabs.com/Dzg51UTSEHJBD9bsoPilSbU%2BjCpauT9adVyMHxSLBP0%3D align="left")

### Write data to the new column

The following code writes data to the new column. It sets **MarketingBudget** to 100000 for the row with a **CategoryId** of 1 and a **PortfolioId** of 1 and to 500000 for the row with a **CategoryId** of 3 and a **PortfolioId** of 2. You will not change any code, the section is shown here for your reference.

```apache
def update_data(instance_id, database_id):
    """Updates sample data in the database.

    This updates the `MarketingBudget` column which must be created before
    running this sample. You can add the column by running the `add_column`
    sample or by running this DDL statement against your database

    """
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    with database.batch() as batch:
        batch.update(
            table="Category",
            columns=("CategoryId", "PortfolioId", "MarketingBudget"),
            values=[(1, 1, 100000), (3, 2, 500000)],
        )

    print("Updated data.")
```

1. Execute **snippets.py** using the **update\_data** argument.
    

```apache
python snippets.py banking-ops-instance --database-id  banking-ops-db update_data
```

2. Query the table again to see the update. Execute **snippets.py** using the **query\_data\_with\_new\_column** argument.
    

```apache
python snippets.py banking-ops-instance --database-id  banking-ops-db query_data_with_new_column
```

The result should be:

```apache
CategoryId: 1, PortfolioId: 1, MarketingBudget: 100000
CategoryId: 2, PortfolioId: 2, MarketingBudget: None
CategoryId: 3, PortfolioId: 2, MarketingBudget: 500000
CategoryId: 4, PortfolioId: 3, MarketingBudget: None
```

## Task 5. Add a Secondary Index

Suppose you wanted to fetch all rows of Categories that have CategoryNames values in a certain range. You could read all values from the **CategoryName** column using a SQL statement or a read call, and then discard the rows that don't meet the criteria, but doing this full table scan is expensive, especially for tables with a lot of rows. Instead you can speed up the retrieval of rows when searching by non-primary key columns by creating a secondary index on the table.

Adding a secondary index to an existing table requires a schema update. Like other schema updates, Cloud Spanner supports adding an index while the database continues to serve traffic. Cloud Spanner populates the index with data (also known as a "backfill") under the hood. Backfills might take several minutes to complete, but you don't have to take the database offline or avoid writing to certain tables or columns during this process.

### Add a secondary index using the Python client library

Use the **add\_index()** method to create a secondary index. You will not change any code, the section is shown here for your reference.

```apache
def add_index(instance_id, database_id):
    """Adds a simple index to the example database."""
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    operation = database.update_ddl(
        ["CREATE INDEX CategoryByCategoryName ON Category(CategoryName)"]
    )

    print("Waiting for operation to complete...")
    operation.result(OPERATION_TIMEOUT_SECONDS)

    print("Added the CategoryByCategoryName index.")
```

1. Execute **snippets.py** using the **add\_index** argument.
    

```apache
python snippets.py banking-ops-instance --database-id  banking-ops-db add_index
```

2. Click **Check my progress** to verify the objective.
    

Add secondary index to Category table

**Check my progress**

### Read using the index

To read using the index, invoke a variation of the **read()** method with an index included. You will not change any code, the section is shown here for your reference.

```apache
def read_data_with_index(instance_id, database_id):
    """Reads sample data from the database using an index.

    """
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    with database.snapshot() as snapshot:
        keyset = spanner.KeySet(all_=True)
        results = snapshot.read(
            table="Category",
            columns=("CategoryId", "CategoryName"),
            keyset=keyset,
            index="CategoryByCategoryName",
        )

        for row in results:
            print("CategoryId: {}, CategoryName: {}".format(*row))
```

1. Execute **snippets.py** using the **read\_data\_with\_index** argument.
    

```apache
python snippets.py banking-ops-instance --database-id  banking-ops-db read_data_with_index
```

The result should look like this:

```apache
CategoryId: 3, CategoryName: Annuities
CategoryId: 1, CategoryName: Cash
CategoryId: 2, CategoryName: Investments - Short Return
CategoryId: 4, CategoryName: Life Insurance
```

### Add an index with a STORING clause

You might have noticed that the read example above did not include reading the **MarketingBudget** column. This is because Cloud Spanner's read interface does not support the ability to join an index with a data table to look up values that are not stored in the index.

To bypass this restriction, create an alternate definition of the **CategoryByCategoryName** index that stores a copy of **MarketingBudget** in the index.

Use the **update\_ddl()** method of the Database class to add an index with a **STORING** clause. You will not change any code, the section is shown here for your reference.

```apache
def add_storing_index(instance_id, database_id):
    """Adds an storing index to the example database."""
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    operation = database.update_ddl(
        [
            "CREATE INDEX CategoryByCategoryName2 ON Category(CategoryName)"
            "STORING (MarketingBudget)"
        ]
    )

    print("Waiting for operation to complete...")
    operation.result(OPERATION_TIMEOUT_SECONDS)

    print("Added the CategoryByCategoryName2 index.")
```

1. Execute **snippets.py** using the **add\_storing\_index** argument.
    

```apache
python snippets.py banking-ops-instance --database-id  banking-ops-db add_storing_index
```

Now you can execute a read that fetches the **CategoryId**, **CategoryName**, and **MarketingBudget** columns while using the **CategoryByCategoryName2** index. You will not change any code, the section is shown here for your reference.

```apache
def read_data_with_storing_index(instance_id, database_id):
    """Reads sample data from the database using an index with a storing
    clause.

    """
    spanner_client = spanner.Client()
    instance = spanner_client.instance(instance_id)
    database = instance.database(database_id)

    with database.snapshot() as snapshot:
        keyset = spanner.KeySet(all_=True)
        results = snapshot.read(
            table="Category",
            columns=("CategoryId", "CategoryName", "MarketingBudget"),
            keyset=keyset,
            index="CategoryByCategoryName2",
        )

        for row in results:
            print(u"CategoryNameId: {}, CategoryName: {}, " "MarketingBudget: {}".format(*row))
```

2. Execute **snippets.py** using the **read\_data\_with\_storing\_index** argument.
    

```apache
python snippets.py banking-ops-instance --database-id  banking-ops-db read_data_with_storing_index
```

The result should be

```apache
CategoryNameId: 3, CategoryName: Annuities, MarketingBudget: 500000
CategoryNameId: 1, CategoryName: Cash, MarketingBudget: 100000
CategoryNameId: 2, CategoryName: Investments - Short Return, MarketingBudget: None
CategoryNameId: 4, CategoryName: Life Insurance, MarketingBudget: None
```

## Task 6. Examine Query plans

In this section, you will explore Cloud Spanner **Query Plans**.

1. Return to the **Cloud Console**, it should still be on the **Query** tab of **Spanner Studio**. Clear any existing query, paste, and **Run** the following query:
    

```apache
SELECT Name, ShortName, CategoryName
FROM Portfolio
INNER JOIN Category
ON Portfolio.PortfolioId = Category.PortfolioId;
```

2. The result should look like this:
    

![PlanQuery.png](https://cdn.qwiklabs.com/QosB%2FiaYpgbhNDn64OIco55bOqdU1oJ4KhWu6bXBLgw%3D align="left")

### Life of a query

A SQL query in Cloud Spanner is first compiled into an execution plan, then it is sent to an initial root server for execution. The root server is chosen so as to minimize the number of hops to reach the data being queried. The root server then:

* Initiates remote execution of subplans (if necessary)
    
* Waits for results from the remote executions
    
* Handles any remaining local execution steps such as aggregating results
    
* Returns results for the query
    

Remote servers that receive a subplan act as the "root" server for their subplan, following the same model as the top-most root server. The result is a tree of remote executions. Conceptually, query execution flows from top to bottom, and query results are returned from bottom to top. The following diagram shows this pattern:

![SPNPlan.png](https://cdn.qwiklabs.com/Igqkg2relBkipUPIeMtZxFaX%2FtsFNi9kxAG0pWfToyk%3D align="left")

### Aggregate Query

Now take look at the query plan for an aggregated query.

1. On the **Query** tab of **Spanner Studio**, clear the existing query, paste, and **Run** the following query.
    

```apache
SELECT pr.ProductId, COUNT(*) AS ProductCount
FROM Product AS pr
WHERE pr.ProductId < 100
GROUP BY pr.ProductId;
```

2. Once the query completes click on the **Explanation** tab below the query body to examine the query plan.
    

Cloud Spanner sends the execution plan to a root server that coordinates the query execution and performs the remote distribution of subplans.

This execution plan starts with a serialization which orders all values returned. Then the plan completes an initial hash aggregate operator to preliminarily calculate results. Then a distributed union is executed which distributes subplans to remote servers whose splits satisfy **ProductId &lt; 100**. The distributed union sends results to a final hash aggregate operator. The aggregate operator performs the COUNT aggregation by **ProductId** and returns results to a serialize result operator. Finally a scan is conducted to order the results to be returned.

The result should look like this:

![SPNAggPlan.png](https://cdn.qwiklabs.com/f8d2DO9yHhj0jF8yEkJRAFCIT%2Fc%2FZYL2csAwCfH0C2o%3D align="left")

**Tip:**To get more details for each step in the query plan, click on any of the operators and the right side of the screen will change accordingly.

![SPNPlanDetail.png](https://cdn.qwiklabs.com/giUUMqlkQGb94XLe8YpNI8pGYEJVDm70fy%2F4sYb4Oyg%3D align="left")

### Co-located join queries

Interleaved tables are physically stored with their rows of related tables co-located. A join between interleaved tables is known as a co-located join. Co-located joins can offer performance benefits over joins that require indexes or back joins.

1. On the **Query** tab of **Spanner Studio**, clear the existing query, paste, and **Run** the following query.
    

```apache
SELECT c.CategoryName, pr.ProductName
FROM Category AS c, Product AS pr
WHERE c.PortfolioId = pr.PortfolioId AND c.CategoryId = pr.CategoryId;
```

2. Once the query completes click on the **Explanation** tab below the query body to examine the query plan.
    

This execution plan starts with a distributed union, which distributes subplans to remote servers that have splits of the table **Category**. Because **Product** is an interleaved table of **Category**, each remote server is able to execute the entire subplan on each remote server without requiring a join to a different server.

The subplans contain a cross apply. Each cross apply performs a table scan on table **Category** to retrieve **PortfolioId**, **CategoryId**, and **CategoryName**. The cross apply then maps output from the table scan to output from an index scan on index **CategoryByCategoryName**, subject to a filter of the **PortfolioId** in the index matching the **PortfolioId** from the table scan output. Each cross apply sends its results to a serialize result operator which serializes the **CategoryName** and **ProductName** data and returns results to the local distributed unions. The distributed union aggregates results from the local distributed unions and returns them as the query result.

![SPNColocated.png](https://cdn.qwiklabs.com/QlT%2FIeqGNbUh5hTDkWbVrAcoxKb4mWuTmm1RxAtuJyo%3D align="left")

---

## Solution of Lab

%[https://youtu.be/OBMGgjSIiGo] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Cloud%20Spanner%20-%20Defining%20Schemas%20and%20Understanding%20Query%20Plans/gsp1050.sh
sudo chmod +x gsp1050.sh
./gsp1050.sh
```