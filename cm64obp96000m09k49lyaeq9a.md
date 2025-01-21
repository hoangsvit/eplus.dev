---
title: "Offloading Financial Mainframe Data into BigQuery and Elastic Search - GSP1153"
seoTitle: "Offloading Financial Mainframe Data into BigQuery and Elastic Search -"
seoDescription: "Financial institutions have vast amounts of data about their customers. However, many of them struggle to leverage data to their advantage. Data may be sitt"
datePublished: Mon Jan 20 2025 06:37:05 GMT+0000 (Coordinated Universal Time)
cuid: cm64obp96000m09k49lyaeq9a
slug: offloading-financial-mainframe-data-into-bigquery-and-elastic-search-gsp1153
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737354830708/e948952e-25e4-47be-af01-ba9123bb9d63.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1737355012157/75cc17c5-a238-4e07-a52f-d50a0abc88cf.png
tags: offloading-financial-mainframe-data-into-bigquery-and-elastic-search-gsp1153, gsp1153, offloading-financial-mainframe-data-into-bigquery-and-elastic-search

---

## **Overview**

Financial institutions have vast amounts of data about their customers. However, many of them struggle to leverage data to their advantage. Data may be sitting in silos or trapped on costly mainframes. Customers may only have access to a limited quantity of data, or service providers may need to search through multiple systems of record to handle a simple customer inquiry. This creates a hazard for providers and a headache for customers.

Elastic and Google Cloud enable institutions to manage this information. Powerful search tools allow data to be surfaced faster than ever - Whether it's card payments, ACH (Automated Clearing House), wires, bank transfers, real-time payments, or another payment method. This information can be correlated to customer profiles, cash balances, merchant info, purchase history, and other relevant information to enable the customer or business objective.

In this hands-on lab, you'll import synthetic data representing financial records offloaded from a bank's mainframe into BigQuery. You'll then explore it using SQL, then create a Dataflow job to process and ingest a subset of that data into Elastic Search. Finally, you'll create a dashboard in Elastic's Kibana tool to gain a 360 degree view of a customer's financial history.

### Objectives

* Importing mainframe data into BigQuery and exploring it using SQL
    
* Get an Elastic Trial and deploy an Elastic Cluster on Google Cloud
    
* Creating a Dataflow job from an Elastic template
    
* Running and monitoring a Dataflow job's progress
    
* Inspecting datasets in Elastic with Kibana
    
* Building a dashboard to visualize the mainframe data
    

### Prerequisites

* Familiarity with SQL, Google Cloud and Elastic Search is not required but will be helpful
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

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
    student-04-fe557b0b53fe@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    XeRIwUWVOC0u
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-7b73175a164b`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-7b73175a164b
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
ACCOUNT: student-04-fe557b0b53fe@qwiklabs.net

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
project = qwiklabs-gcp-01-7b73175a164b
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Elastic - Set up trial account**

1. Sign up for a [free trial](https://www.elastic.co/cloud/elasticsearch-service/signup?utm_source=referral&utm_medium=qwiklabs&utm_campaign=cloud-trial-subscription-pm&utm_id=701610000005lJVAAY).
    

* Click **Start free trial**.
    

![click on start free trial](https://cdn.qwiklabs.com/IeW2Zl90CIA6Qzzulrw71VTTVbQBLBY3NMEnUV2mea4%3D align="left")

2. Sign up using your personal email and a unique password. Do **NOT** click the "**sign up with Google**" button:
    

![Do not sign-up with google](https://cdn.qwiklabs.com/oWpnHe1VmNca198Osvo%2BQzCKrRRSitdAmCTo3wQXEK8%3D align="left")

**Note:** You must use your personal email, not your student account, don't attempt to sign up with google, unless you sign out of your lab account first. If you attempt to sign up with your student id, your trial will be rejected or canceled.

3. Enter some details about yourself
    

![Enter deployment details](https://cdn.qwiklabs.com/Y5X9g28ApAGSQp4mn6wDVKoQNjkek9%2FudaQC0WFgVE8%3D align="left")

![Enter deployment details](https://cdn.qwiklabs.com/xDVmGWVpGCTnqhaDFbLm7Yoft9zKeHKfCxfshgVzV5U%3D align="left")

![Enter deployment details](https://cdn.qwiklabs.com/R%2BTjNvXzgHepufph4aLRkg8QPkusxraT1m7uViA9h4g%3D align="left")

4. Select use case as Elastic Search
    

![Click create deployment](https://cdn.qwiklabs.com/fcoZLygtMQ8EkonGSZPzs9teRkKbH4e44P2KPkoUQVw%3D align="left")

![Launch Elastic Search](https://cdn.qwiklabs.com/zyLPq6OcQ0tvtrcpRrodizUEF6G1kAt5ObDqPDlefA8%3D align="left")

Note: make sure you use `us-east1` because the rest of the lab will assume you are using that region.

**Note**: The deployment can take up to 5 minutes.

5. Save your deployment credentials `Cloud ID` , you will need them later when you load data from BigQuery into Elastic.
    

![deployment credentials](https://cdn.qwiklabs.com/99pLFxLwvuJqagL073R20PnQbAU00LeNOCv3VZK0VWI%3D align="left")

6. From the bottom-right corner, click the expand arrow, select "**Stack Management**" and then click "**View All Pages.**"
    

![Stack Management](https://cdn.qwiklabs.com/rSNu7jV2xtP1s9JaeXwnZ3DQlkp0KVtvgGZ1suG0gV0%3D align="left")

7. On the right side of the page under **Stack Management**, select "**API keys**".
    
8. click on **Create API Key**
    

![Select API Keys](https://cdn.qwiklabs.com/PYij23TgpU177kdv8mRomtKSDoqGSYBSON7sxy3stkA%3D align="left")

9. Name your key "**bigquery-import**" and select "**Create API Key**" to generate a new key
    
10. Save your new API key for later when you load data from BigQuery into Elastic..
    

![save api key](https://cdn.qwiklabs.com/2L2xGqJdqyyJcMU%2BLleYH2y8Jk592Kzp%2FwuuV%2FdZ8bo%3D align="left")

## **Task 2. Create a Cloud Storage Bucket**

1. Paste the below code into the Cloud Shell to create a new bucket and copy data from an existing bucket
    

```apache
export GOOGLE_CLOUD_PROJECT=qwiklabs-gcp-01-7b73175a164b
```

```apache
gsutil mb gs://$GOOGLE_CLOUD_PROJECT

gsutil cp -r gs://spls/gsp1153/* gs://$GOOGLE_CLOUD_PROJECT
```

2. Go to **Navigation menu &gt; Cloud Storage &gt; Buckets**, click the name of the bucket that you created and confirm that data was copied over. This should look similar to the image below:
    

![See the dataset](https://cdn.qwiklabs.com/ke8PYTIHiNBZ6V9aPkSnp6%2BFzDROTfWvB07CCxR5Z2c%3D align="left")

Click **Check my progress** to verify the objectives.

Create a Cloud Storage Bucket

Check my progress

## **Task 3. Create a BigQuery dataset and import data from Cloud Storage**

1. Create a BigQuery dataset by pasting the below commands into the Cloud Shell:
    

```apache
bq --location=us mk --dataset mainframe_import
```

This command creates a BigQuery dataset in the US called "mainframe\_import". You should see a result that looks like this:

![Create a BigQuery dataset](https://cdn.qwiklabs.com/edlQlbR2O1g9dB4G9umbrYWfwWE%2FO0tibfpzvChEhxA%3D align="left")

2. Download the schemas and create two BigQuery tables in the dataset with data from Cloud Storage running the below code sequentially
    

```apache
gsutil cp gs://$GOOGLE_CLOUD_PROJECT/schema_*.json .
```

```apache
bq load --source_format=NEWLINE_DELIMITED_JSON mainframe_import.accounts gs://$GOOGLE_CLOUD_PROJECT/accounts.json schema_accounts.json
```

```apache
bq load --source_format=NEWLINE_DELIMITED_JSON mainframe_import.transactions gs://$GOOGLE_CLOUD_PROJECT/transactions.json schema_transactions.json
```

3. Navigate to BigQuery using the Search bar or Navigation Menu on the left hand side.
    
4. Click the drop down arrow under your project to view your dataset and table.
    

There should be two tables in your BigQuery dataset: ‘accounts' and ‘transactions'

table 1: Accounts

![BigQuery dataset: account](https://cdn.qwiklabs.com/rNwYRSsvIrZway0485LyBhMqEEePPkzpXmavMRvVqjs%3D align="left")

table 2: Transactions

![BigQuery dataset: transactions](https://cdn.qwiklabs.com/y5e%2F9zjRgIHblMpC06hfZ0BAgD%2FQmhJTav2xlJ6mNcU%3D align="left")

Note: this is a small data set of simulated financial data, it doesn't represent real accounts or financial transactions.

5. Go to the BigQuery UI (not the Cloud Shell) and Join the tables into a BigQuery view by running the below code.
    

```apache
CREATE VIEW `qwiklabs-gcp-01-7b73175a164b.mainframe_import.account_transactions` AS
SELECT t.*, a.* EXCEPT (id)
FROM `qwiklabs-gcp-01-7b73175a164b.mainframe_import.accounts` AS a
JOIN `qwiklabs-gcp-01-7b73175a164b.mainframe_import.transactions` AS t
ON a.id = t.account_id;
```

In the BigQuery console, you should see two tables and a view:

![BigQuery Console Table](https://cdn.qwiklabs.com/1tsE3f47pbkqPZZTLsXvx2gtEZkTS2%2BBVF7DzHAjFIw%3D align="left")

Click **Check my progress** to verify the objectives.

Create a BigQuery dataset and import data from Cloud Storage

Check my progress

## **Task 4. Explore the mainframe data in BigQuery**

1. Go to **BigQuery → mainframe\_import → transactions**
    
2. Explore the newly imported data.
    
3. If you go to "Schema" you can see the table's schema
    
4. "Details" provides metadata on the table, including creation time, data location, size (on disk) and number of rows.
    
5. "Preview" provides a snapshot of the data
    

![Transactions schema](https://cdn.qwiklabs.com/0aiqGVydr7mhzycad86faUeaCZ6sE7kSHa1rTo%2Bmbbs%3D align="left")

3. Run the below query to select the first 100 rows of data in the table
    

```apache
SELECT * FROM `mainframe_import.transactions` LIMIT 100
```

4. Explore the data more by seeing how many unique occupations are in the accounts dataset. **Copy** the code below to count the distinct number of occupations
    

```apache
SELECT DISTINCT(occupation), COUNT(occupation)
FROM `mainframe_import.accounts`
GROUP BY occupation
```

5. Explore the salary range column. Start by querying the highest salary range
    

```apache
SELECT * FROM `mainframe_import.accounts` WHERE salary_range = "110,000+" ORDER BY name
```

1. One hypothesis a Data Analyst might make is that there is a correlation between salary range and age (although other factors such as Occupation will most likely influence this).
    

* See if you can prove or disprove this. Hint: Only select the columns you need (occupation, salary\_range and age\_range)
    

Click **Check my progress** to verify the objectives.

Explore the mainframe data in BigQuery

Check my progress

## **Task 5. Create a Dataflow job reading from BQ and pushing to Elastic**

1. The Dataflow API should already be enabled, if not find it using the search bar
    
2. Paste the below code into the Cloud Shell to create a Dataflow job, making edits to the parts in `<< >>` for `CONNECTION_URL` and `API_KEY`. This job will read data from your BigQuery dataset and push it to Elastic
    

Enter these values by hand into the cloud shell (one by one):

```apache
export CONNECTION_URL=<< your cloud ID from step 1.5 >>
export API_KEY=<< your API key from step 1.9 >>
```

3. Now we will create a dataflow job to move the account transactions into Elastic Cloud. Cut and paste the following command into the cloud shell.
    

```apache
gcloud dataflow flex-template run bqtoelastic-`date +%s` --worker-machine-type=e2-standard-2 --template-file-gcs-location gs://dataflow-templates-us-east1/latest/flex/BigQuery_to_Elasticsearch --region us-east1 --num-workers 1 --parameters index=transactions,maxNumWorkers=1,query="select * from \`$GOOGLE_CLOUD_PROJECT\`.mainframe_import.account_transactions",connectionUrl=$CONNECTION_URL,apiKey=$API_KEY
```

This should generate a message similar to the one below

![Dataflow job](https://cdn.qwiklabs.com/VWIQC6xzJzgf412MwvsF9jte70x%2Bzub4dWGxIGrrwIc%3D align="left")

4. Go to **Dataflow → Jobs** to make sure you job is running
    

![Running Dataflow job](https://cdn.qwiklabs.com/%2BENDmiSgQjcmTRekOmN9pu1qIPwZSyRXjmDW3kKV7pE%3D align="left")

**Note:** If the Dataflow job fails, rerun the job.

Click **Check my progress** to verify the objectives.

Create a Dataflow job reading from BQ and pushing to Elastic

Check my progress

## **Task 6. Explore the data in Elastic**

1. Go back to the Elastic Cloud
    
2. Go to **Discover**
    

![Go to discover](https://cdn.qwiklabs.com/5BLPCTBiu6ie3zwxKe5j4uaAeLoL85Yo%2Bvlo5DIBTLs%3D align="left")

3. Click ‘**Create a data view**'
    

![Create a data view](https://cdn.qwiklabs.com/SdtMHY%2BoXzoapHVbRbqNa8QqvpHhcY2pJVH32VopuzM%3D align="left")

4. Include the Name, Index pattern and select timestamp from the Timestamp field dropdown. Then click "**Save data view to Kibana**"
    

![Save the data view](https://cdn.qwiklabs.com/i5mvnLfPh3XELKf9bnmPXPraG4HmLoTUFkUUgY9VSeQ%3D align="left")

5. To view the sample dataset, set the date range from Jan 3, 2020 to Jan 12, 2020
    

![Sample Dataset Range](https://cdn.qwiklabs.com/1WLkcBs5fL0qwk4GrmoHSAgsZR1fmSzpSCiKJS7pAhc%3D align="left")

![Sample Dataset Range](https://cdn.qwiklabs.com/8avwF9phcJXjq2lI1YhpgpDbdMyOfLV16XzY%2BN7Z9aI%3D align="left")

![Sample Dataset Range](https://cdn.qwiklabs.com/SZrKaatuTwQoZUCaej0LAUajTBXWBCx6CJZZmj%2FaxU0%3D align="left")

6. Expand one of the transactions to see the fields you have to work with
    

![Expand Transaction](https://cdn.qwiklabs.com/FW1hPgY3BWgPGnTsoZeE%2BBBIQR6tR%2BuecVgn2nAioCc%3D align="left")

![Expand Transaction](https://cdn.qwiklabs.com/LlIScvfu4HaYj0k0TDFzIZlPWmFVlVkzISzze0LuGxI%3D align="left")

## **Task 7. Create a simple dashboard**

1. Select the Analytics "**Dashboard**" from the left Menu and then select "**Create a dashboard**"
    

![Create Dashboard](https://cdn.qwiklabs.com/pO9hbs4eF6vgNzmrce9HVOGn9ESUZNXMjeA580%2FF7Yo%3D align="left")

![Create Dashboard](https://cdn.qwiklabs.com/TYQW5e71llRm6WnX%2BHXD36VEnpbmqR%2B1lQnaKKmkg2U%3D align="left")

2. Click "**Create visualization**" and then drag and drop the field "**Records**" onto the visualization canvas
    

![Create Visualization](https://cdn.qwiklabs.com/0P41PXMebMPgklS%2B544r9EtJvIIWLPFuDKmPFPVU5yE%3D align="left")

3. Click "**Save and Return**" to save the visualization and return to the dashboard. Grab the lower right corner of the visualization and resize it to look something like this
    

![Expand visualization](https://cdn.qwiklabs.com/Z17YbH4C2gWHpCMoE0O1QbkNi0h3x1Jk9ReSLXCXDYI%3D align="left")

This bar chart displays the number of transactions that occurred over the time frame. It will also make it easy for the user to zoom into a specific day or hour that they are interested in.

4. Click "**Create visualization**" to add another visualization to the dashboard, again drag and drop the field "**Records**" onto the canvas. Change the visualization type to "**Legacy Metric**". Click "**Save and return**" to save the visualization and return to the Dashboard.
    

![Create Visualization](https://cdn.qwiklabs.com/STvBbWtTtAF5UX5X2vB2MElaVQOUNPJSN60FNbkK3PE%3D align="left")

5. Resize and rearrange to visualizations to look something like this:
    

![Resize Visualization](https://cdn.qwiklabs.com/ISjLxdpeLmIMA46Ig9%2F9mXqA1fKiZBRBMtkPYSwudDw%3D align="left")

6. Click "**Create visualization**" and drag and drop the file "**absolute\_amount**" onto the canvas. Change the visualization type to "**Area**" and set the vertical Axis to "**Average**". Click "**Save and return**"
    

![Visualization type Area](https://cdn.qwiklabs.com/m5oANTEl%2BdjuEGzu7ggt3Tt9Cq70PgcMoFkg7uHUBrM%3D align="left")

![Set the vertical axis average](https://cdn.qwiklabs.com/AQ0BoP252XUqSN5LXWyUnKhzj4VxXTdVutxgMa8RlSY%3D align="left")

7. Click "**Create visualization**" and select the **Pie** visualization type then click on **paint brush**
    
    ![Paintbrush Icon](https://cdn.qwiklabs.com/%2F%2FfEOBzGo%2FbjBQ9OEVRcJq8HY5J3tlzulqVGONVxjO4%3D align="left")
    
    . symbol which will open up the **Appearance menu**. Under **Donut hole**, select **small** and Drag the field "**gender.keyword**" onto the "Slice by" field, and drag the "running\_balance.amount" field onto the metric field. Change the metric function from Median to Average. Click "**Save and return**"
    

![Donut Visualization type](https://cdn.qwiklabs.com/4Q1IOrC9bbS6CgntgjF1dEG5KygcNnEg3zEVlRQsXqk%3D align="left")

8. Resize and rearrange the visualizations to look something like this
    

![Resize Visualizations](https://cdn.qwiklabs.com/pQvWmieQaFNAaotSdk%2B%2F%2F1%2BGYZLP0IhF24KXoks2%2BGU%3D align="left")

9. Click "**Save**" and enter a title for your Dashboard, check "**Store time with dashboard**" to set the current time range whenever you load the dashboard in the future. Click "**Save**" to finish saving your dashboard.
    

![Save the dashboard](https://cdn.qwiklabs.com/Cg6hKNYp%2FfZxPSI2XclxN8PC0CARkvfu2esBDCS5Ink%3D align="left")

Congratulations, you have created your first dashboard.

See if you can create some of these visualizations from the data:

* Create three of the below visualizations in the dashboard, ‘Transaction Count’, ‘Customer Count’ and ‘Top 10 Spenders pie chart’
    

![Visualizations examples](https://cdn.qwiklabs.com/tSk5RWmwj8EnWBo%2BFMeXwlaD699mUsD5pV3SyFhcc6o%3D align="left")

---

## Solution of Lab

%[https://www.youtube.com/watch?v=CfxDobxmTYI&ab_channel=Techcps] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Offloading%20Financial%20Mainframe%20Data%20into%20BigQuery%20and%20Elastic%20Search/techcps1153.sh
sudo chmod +x techcps1153.sh
./techcps1153.sh
```