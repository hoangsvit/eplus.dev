---
title: "Getting Started with Neo4J Enterprise on Google Cloud - GSP1104"
seoTitle: "Getting Started with Neo4J Enterprise on Google Cloud - GSP1104"
seoDescription: "Learn to deploy Neo4J Enterprise on Google Cloud, analyze asset manager filings and explore data with Cypher in this hands-on lab"
datePublished: Sun Aug 24 2025 09:08:30 GMT+0000 (Coordinated Universal Time)
cuid: cmepgufh5000502l5f1oa4ffs
slug: getting-started-with-neo4j-enterprise-on-google-cloud-gsp1104
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756026455932/cf959ae1-f9af-4531-9c46-615515a41cfe.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756026463778/3834603d-3ae4-4661-92c8-7a7e7ca5101a.png
tags: google-cloud, getting-started-with-neo4j-enterprise-on-google-cloud-gsp1104, getting-started-with-neo4j-enterprise-on-google-cloud, gsp1104, neo4j-enterprise

---

## Overview

In this lab, you analyze the quarterly filings of asset managers with $100m+ assets under management (AUM) in a basic Enterprise version of Neo4j. These are regulatory filings made to the Securities and Exchange Commission’s (SEC) EDGAR system. You then load that data from a GCP Cloud Storage bucket into Neo4j. Thereafter, you explore the relationships of different asset managers and their holdings using the Neo4j Browser and Neo4j’s Cypher query language.

### Objectives

In this lab, you:

* Connect to Neo4j
    
* Load data from a Google Cloud Storage bucket and import it into Neo4j
    
* Explore data in Neo4j
    

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
    student-03-fcbcee29c24e@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    5gDfNSiqi2aL
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

## Task 1. Connect to Neo4j

1. In the GCP console, under Compute Engine, click on **VM instances**. You will the see Neo4j Enterprise Edition deployment.
    

**Note:** The deployment will take a 5-10 minutes to complete. **If you do not see the VM created please wait then reload the page.** You can see the deployment status from the **Deployment Manager** in the console.

![The VM instances page, which lists two instances and their specifications.](https://cdn.qwiklabs.com/Qr1UweZIztuhQ%2BgbgHjxGLkC2M13lfEb4YK4vvlr%2BaQ%3D align="left")

Neo4j is accessible at port 7474.

2. In your browser, go to **{external-IP}:7474** where **{external-IP}** is replaced with the external IP from the Neo4J VM. A new window should ask you to log in.
    

**Note:** If you are unable to connect to the application. **Please wait a few minutes for it to start, and reload the page.**

![Neo4j login dialog box, which includes fields such as Connect URL and Database](https://cdn.qwiklabs.com/qE%2FAYRoSf0GguqAVPGep7EmLBnB1BAQHRvWoxBhdecY%3D align="left")

3. Complete the following fields:
    
    * Leave Connect Url as default
        
    * Leave Database field empty
        
    * Leave Authentication type as Username/Password
        
    * Username: **neo4j**
        
    * Password: **foobar123%'**
        

![Neo4j connection page, which includes the message "You are connected as user neo4j to neo4j://34.139.168.176.7687".](https://cdn.qwiklabs.com/VD8uPyCE4SyCCbW2Gu4AwxZtNjK%2FKN1yZtHDTFV013E%3D align="left")

4. Click **Connect**.
    

## Task 2. Move data to Neo4j

In this lab, you take data from a Google Cloud Storage bucket and import it into Neo4j.

For this portion of the lab, you work with a subset of the data. The full dataset is a year of data, however, you're only playing around with a day's worth.

1. If you want to look at the data being loaded, click the following link to download it: [2022-02-17](https://storage.googleapis.com/neo4j-datasets/form13/2022-02-17.csv).
    
2. Run a Cypher statement to load the data. Cypher is Neo4j's query language. Paste the following code in the text field at the top of the Neo4j console. LOAD CSV forms part of that and allows us to easily load CSV data:
    

```apache
LOAD CSV WITH HEADERS FROM 'https://storage.googleapis.com/neo4j-datasets/form13/2022-02-17.csv' AS row
MERGE (m:Manager {filingManager:row.filingManager})
MERGE (c:Company {nameOfIssuer:row.nameOfIssuer, cusip:row.cusip})
MERGE (m)-[r1:Owns {value:toInteger(row.value), shares:toInteger(row.shares), reportCalendarOrQuarter:row.reportCalendarOrQuarter}]->(c)
```

It should resemble the following:

![The CSV load, which includes the Load CSV with headers from command, and three lines indicating a merge.](https://cdn.qwiklabs.com/60EzCpQ%2FPQEU2K8D8LyHgmSEgXBMJbJ4gXoIHO54E94%3D align="left")

3. Press the blue triangle on the right to **run** the job. This loads the nodes and relationships from the file. The number of nodes are now loaded.
    
4. Once the number of nodes are loaded, click the **database** icon in the upper left to inspect them.
    

It can take a minute to populate this menu, but once it's populated, you see the nodes, relationships and properties loaded.

![The loaded CSV displays a summary of the node, properties, and relationship data.](https://cdn.qwiklabs.com/Ptdwl6ucMlD4S3TQnSh10bG1K47v6jKzYq6CSIhPJJw%3D align="left")

Import CSV from Google Cloud Storage into Neo4j

## Task 3. Explore the data using Neo4j

There are two kinds of nodes, manager and company. Manager nodes are asset managers. Company nodes are the companies that asset managers buy shares of. Managers are related to companies by the *OWNS* relationship. Manager, company, and owns include properties you can inspect as well.

1. Click **Manager** under **Node Labels** to automatically generate a new cypher query.
    
    ![The highlighted Manager button.](https://cdn.qwiklabs.com/wCiBVOLuE%2Fb%2BgvbGSoPpzfofS2lmoC8xQHB9HTFfsf4%3D align="left")
    

A subset of the managers appears in the database. The query returns 25 of them. It's limited because returning too many nodes in this visualization mode can make it hard to navigate.

![A graph depicting the various managers](https://cdn.qwiklabs.com/f8UzI9K2dR0ZZ1%2Bb%2BZUk6gtaQG2O6ZDOSumiB4GKFIU%3D align="left")

2. Now, click on one of the **managers**, it doesn't particularly matter which one. Once you click on it, it expands showing other options. Click the **graph icon** that appears at the bottom of the circle to expand it.
    
    ![An expanded Manager plot within the graph, which now links to a company.](https://cdn.qwiklabs.com/QZsynMFUgiuX7v3Z%2BniHkJ7rptVfIXrqrJ0fnNVwffA%3D align="left")
    

When it expands, you can see which companies this manager owns shares in. In this case, DENVER WEALTH MANAGEMENT, INC. seems to only have one holding, ISHARES RUSSELL. Note that this dataset only has holdings over $10m. Smaller holdings were filtered out in pre-processing.

3. Click on the relationship, that is, the line between the nodes, to view transaction details.
    
    ![The Node properties pane, which lists info on the company.](https://cdn.qwiklabs.com/MHiLBqr9%2BgkB%2FG9CxFqmWKecsyPv1UBardbyeUoDLf0%3D align="left")
    

In this case, it appears the report is from 12-31-2021. 68,087 shares were purchased with a value of $20,807,000.

![The Relationship properties pan, which includes the highlighted value.](https://cdn.qwiklabs.com/ilEPMLu5gBQE94%2FJfkrwxf2XNXPcp1wbUw7cgvt6Ybs%3D align="left")

4. At this point, take some time to explore the graph. Click on the **Company** node label on the left to query it.
    

As you play around, you may start to notice some of the structure in the graph with recurrent connections and interesting communities of managers who have similar holdings.

![Recurrent connections within the graph](https://cdn.qwiklabs.com/fPzsTgwRu70%2F4RN8xtHCjEMGDnMRjeh53iAloMmG8NA%3D align="left")

There is an interesting issue hiding in the dataset. Because of the way it's loaded, there are a bunch of duplicate nodes.

5. Run the following query to find them:
    

```apache
MATCH (n:Company{cusip:"78462F103"}) RETURN n LIMIT 25
```

![The Node properties pane, which lists information companies](https://cdn.qwiklabs.com/ApQleg2GUflndeU9qyCYEksNDMg4WLsyWyrNqc%2BcpfU%3D align="left")

Did you notice what happened? Different asset managers call securities slightly different things. In this case, the commonly held SPY or S&P 500 ETF has a number of different names.

Issues like these led to the creation of the [CUSIP](https://www.cusip.com/). In these filings, asset managers may enter all sorts of names, but the CUSIP will be unique. In the next section, you key off the CUSIP and resolve this issue.

Now that you have some understanding of this portion of the dataset, you can delete it. Then, load the full dataset.

6. To delete all the nodes and relationships in the database, run the following command:
    

```apache
MATCH (n) DETACH DELETE n;
```

![No data displayed within Neo4j.](https://cdn.qwiklabs.com/9EyEKVYlW21G96lYkhVc0ATjkXbGKQOlNK4je4Q547g%3D align="left")

Now, all your data should be deleted. Note that the GUI is still caching some property keys.

## Task 4. A year of data

The LOAD CSV statement you used before didn't create any indices. It also loaded the nodes and relationships simultaneously. Both of those are inefficient approaches. It was not a big deal, as the single day of data was about 57kb. However, you'll now load a full year's worth of data. That's 49.5mb of data, so you have to be a bit more efficient. You can now download the [new dataset](https://storage.googleapis.com/neo4j-datasets/form13/2021.csv).

If you're curious, you can learn more about the intricacies of optimizing those loads by visiting [Importing CSV Data into Neo4j - Developer guide](https://neo4j.com/developer/guide-import-csv/#_optimizing_load_csv_for_performance) and [Importing CSV Data into Neo4j - Free Neo4j Courses](https://graphacademy.neo4j.com/courses/importing-data/).

You should also change the data model a bit, as it would improve the Graph Data Science (GDS) component of the lab where you create graph embedding. You then move some properties out of the *OWNS* relationship that was there previously, into a new node type called *Holding*.

First, create constraints, essentially a primary key, for the company and manager node types. Company keys should be CUSIPs. They are identifiers for securities designed to be unique. You can read more about them in the [CUSIP Global Services](https://www.cusip.com/) documentation. This is a much better field to use than *nameOfIssuer*, as it avoids the problem of companies (like Apple or Apple, Inc.) being referred to by slightly different names.

1. The manager is slightly more challenging. However, you can assume the filing Manager field is both unique and correct:
    

```apache
CREATE CONSTRAINT IF NOT EXISTS FOR (p:Company) REQUIRE (p.cusip) IS NODE KEY;
CREATE CONSTRAINT IF NOT EXISTS FOR (p:Manager) REQUIRE (p.filingManager) IS NODE KEY;
```

The result should resemble the following:

![Two constraints listed within the Neo4j interface.](https://cdn.qwiklabs.com/rXZYRbTAqliu1DUQabAdz3tF27HS19kHTpK9T%2FHOYMA%3D align="left")

Now, the holding is more interesting. It needs a compound key, since a holding is unique in the context of:

* Being held by a particular filingManager
    
* Being a particular cusip
    
* Being for a particular reportOrCalendarQuarter
    

2. You will need something with a compound key, such as:
    

```apache
CREATE CONSTRAINT IF NOT EXISTS FOR (p:Holding) REQUIRE (p.filingManager, p.cusip, p.reportCalendarOrQuarter) IS NODE KEY;
```

The result should resemble the following:

![One added constraint.](https://cdn.qwiklabs.com/B%2FYwYrKp1uTfEHlqAFARu4UKcSJSsGzbzQrb%2B8%2BcFP4%3D align="left")

Now that you have all the constraints, load your nodes. Thereafter, grab the relationships in a second pass. While you could do it in a single cypher statement, as you did above, it's more efficient to run them in series.

3. Now, load the companies first. You will have a lot of duplication, since the key is CUSIP and many different rows in the csv, each representing a filing, have the same CUSIP. You therefore need to enhance the LOAD CSV statement slightly to deal with those duplicates:
    

```apache
 LOAD CSV WITH HEADERS FROM 'https://storage.googleapis.com/neo4j-datasets/form13/2021.csv' AS row
    MERGE (c:Company {cusip:row.cusip})
    ON CREATE SET
        c.nameOfIssuer=row.nameOfIssuer
```

The result should resemble the following:

![Loaded csv with headers code.](https://cdn.qwiklabs.com/YcL7ufuQRxHP%2FBVlhOTpDhTeTRUBu1JwsTDp3To4GkY%3D align="left")

4. Now, load the Managers:
    

```apache
  LOAD CSV WITH HEADERS FROM 'https://storage.googleapis.com/neo4j-datasets/form13/2021.csv' AS row
    MERGE (m:Manager {filingManager:row.filingManager})
```

The result should resemble the following:

![The updated code, which includes merge commands.](https://cdn.qwiklabs.com/W3NeyuWaPdydecJeG6%2BSiVeNQnKoup6UhNDV2iD6J3c%3D align="left")

5. Now, load the holdings:
    

```apache
LOAD CSV WITH HEADERS FROM 'https://storage.googleapis.com/neo4j-datasets/form13/2021.csv' AS row
    MERGE (h:Holding {filingManager:row.filingManager, cusip:row.cusip, reportCalendarOrQuarter:row.reportCalendarOrQuarter})
    ON CREATE SET
        h.value=row.value,
        h.shares=row.shares,
        h.target=row.target,
        h.nameOfIssuer=row.nameOfIssuer
```

The result should resemble the following:

![Four filters added to the code. The code is titled On Create Set.](https://cdn.qwiklabs.com/YelJpH9v6RGm5mLE%2BDNEMUlPkA1ux0sbQuMoECeoDUM%3D align="left")

You now have all the nodes loaded. Next, tie them together with relationships. You will want two kinds of relationships:

* A manager "OWNS" holdings
    
* Holdings are "PARTOF" companies
    

6. So, put together the *OWNS* relationship first:
    

```apache
LOAD CSV WITH HEADERS FROM 'https://storage.googleapis.com/neo4j-datasets/form13/2021.csv' AS row
    MATCH (m:Manager {filingManager:row.filingManager})
    MATCH (h:Holding {filingManager:row.filingManager, cusip:row.cusip, reportCalendarOrQuarter:row.reportCalendarOrQuarter})
    MERGE (m)-[r:OWNS]->(h)
```

The result should resemble the following:

![The updated code, which includes the load own relationship data.](https://cdn.qwiklabs.com/J0JkFlLK6RJGeITeo2O63jtIsL4lR2MH3lTcC%2F4h9eo%3D align="left")

7. Now, create the *PARTOF* relationships:
    

```apache
 LOAD CSV WITH HEADERS FROM 'https://storage.googleapis.com/neo4j-datasets/form13/2021.csv' AS row
    MATCH (h:Holding {filingManager:row.filingManager, cusip:row.cusip, reportCalendarOrQuarter:row.reportCalendarOrQuarter})
    MATCH (c:Company {cusip:row.cusip})
    MERGE (h)-[r:PARTOF]->(c)
```

The result should resemble the following:

![The updated code, which include the PARTOF data.](https://cdn.qwiklabs.com/yaXW4y6uwX7lNFGpsf9024kDOsyDmT3Ui2kVsDTRyL0%3D align="left")

Create the PARTOF and OWNS relationships in neo4j

You've done it! You have loaded the data setup.

---

## Solution of Lab

%[https://youtu.be/c1t_8-EvoNE]