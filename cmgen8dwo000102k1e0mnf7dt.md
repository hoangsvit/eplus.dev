---
title: "Implement Multimodal Vector Search with BigQuery: Challenge Lab - GSP523"
seoTitle: "Implement Multimodal Vector Search with BigQuery: Challenge Lab - GSP5"
seoDescription: "Implement a multimodal vector search in BigQuery to tackle real-world data challenges and score 100%"
datePublished: Mon Oct 06 2025 04:41:16 GMT+0000 (Coordinated Universal Time)
cuid: cmgen8dwo000102k1e0mnf7dt
slug: implement-multimodal-vector-search-with-bigquery-challenge-lab-gsp523
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759725569402/6c7f0a08-f966-4399-b7ea-42cfc34fe515.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759725604286/08710afb-2179-4aa0-a82a-1c2a71dccdb6.png
tags: bigquery, implement-multimodal-vector-search-with-bigquery-challenge-lab-gsp523, implement-multimodal-vector-search-with-bigquery-challenge-lab, gsp523

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the skill badge course titled Implement Multimodal Vector Search with BigQuery. Are you ready for the challenge?

## Challenge Scenario

You are a data scientist at Cymbal, an online retail store. You want to build a pipeline to constantly search for similar products on the market to inform a marketing comparison study. You have a few challenges:

* How to handle **multimodal** data: The data you have collected is multimodal including text, image, and video, including some files in Cloud Storage.

* How to perform a **semantic similarity search** instead of a keyword search: You want to find similar products across multiple dimensions (e.g., image, description, and specific features), where keyword search may not be effective.

* How to use **BigQuery** to do it: Since most of your data is already in BigQuery, using the same tool could minimize the learning curve.

To address the these challenges, you decide to implement **multimodal vector search with BigQuery**.

### Topics tested

* Creating an external source connection in BigQuery and granting proper IAM permissions.

* Creating an object table to store images.

* Generating embeddings to convert images (multimodal data) to vectors.

* Running a vector search to find similar products.

### Prerequisites

To complete this lab, you should be familiar with BigQuery and Cloud Storage.

The learning path titled **Gemini in BigQuery** provides a comprehensive knowledge base for this skill badge. You are encouraged to check out these three courses and their labs to build up your knowledge to successfully complete this challenge lab:

* [Boost Productivity with Gemini in BigQuery](https://www.cloudskillsboost.google/course_templates/1169) (introductory): Learn how to use Gemini in BigQuery for code assistance, data preparation, and pipeline design.

* [Work with Gemini Models in BigQuery](https://www.cloudskillsboost.google/course_templates/1133) (intermediate): Learn how to call Gemini models in BigQuery to build a generative AI application.

* [Create Embeddings, Vector Search, and RAG with BigQuery](https://www.cloudskillsboost.google/course_templates/1210) (advanced): Learn how to prevent AI hallucinations with a RAG (retrieval augmented generation) pipeline, from creating embeddings, to running vector search, and finally generating improved answers.

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
    student-03-dfc8ac746202@qwiklabs.net
    ```

    You can also find the Username in the Lab Details pane.

4. Click **Next**.

5. Copy the **Password** below and paste it into the **Welcome** dialog.

    ```apache
    lcOPsXRVWah5
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

![Navigation menu icon and Search field](<https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D> align="left")

## Task 1. Create a source connection and grant IAM permissions

### Create an external source connection

To utilize remote generative AI models, such as multimodal embedding models, on Vertex AI within BigQuery, create a new external source connection named **vector\_conn** in the region named `europe-west4`.

This connection acts as a secure pipeline between Vertex AI and BigQuery, enabling the safe use of generative AI models.

**Expand the hint for some helpful tips!**

### Grant IAM permissions to the new service account

To access Vertex AI resources and BigQuery data, you need to grant appropriate IAM permissions to the service account for the external source connection.

Assign the following roles to the service account generated in the previous section:

* **BigQuery Data Owner**

* **Storage Object Viewer**

* **Vertex AI User**

**Expand the hint for a helpful tip!**

Click **Check my progress** to verify the objective.

Create a source connection and grant IAM permissions.

## Task 2. Create an object table

To query unstructured data like images and videos stored on Google Cloud Storage, create an object table named **gcc\_image\_object\_table** in the precreated BigQuery dataset named **gcc\_bqml\_dataset**.

This table stores metadata about the object, such as its URL and content type, but not the unstructured data itself. Because object tables can be queried like any other BigQuery table, you can use SQL (or Python) to filter and select objects based on their metadata.

Run the following SQL code in the BigQuery SQL Editor. Be sure to replace the bracketed placeholders `[]` with the correct code (such as replacing `[PROJECT_ID]` with the assigned Project ID for this lab environment).

```apache
Create or replace external table `[PROJECT_ID].[DATASET_NAME].[OBJECT_TABLE_NAME]`
with connection `[PROJECT_ID].[CONNECTION_REGION].[CONNECTION_NAME]`
options
(
object_metadata='SIMPLE',
uris=['gs://[PROJECT_ID]/*']
)
```

**Expand the hint for helpful tips!**

Click **Check my progress** to verify the objective.

Create an object table.

## Task 3. Generate embeddings

### Connect to the multimodal embeddings model

To connect to the remote multimodal embedding model, create a new model in BigQuery named **gcc\_embedding** in the precreated BigQuery dataset named **gcc\_bqml\_dataset**, and specify the endpoint (model name) as `multimodalembedding@001`.

Run the following SQL code in the BigQuery SQL Editor. Be sure to replace the bracketed placeholders `[]` with the correct code (such as replacing `[PROJECT_ID]` with the assigned Project ID for this lab environment).

```apache
Create or replace model
`[PROJECT_ID].[DATASET_NAME].[MODEL_NAME]`
remote with connection `[PROJECT_ID].[CONNECTION_REGION].[CONNECTION_NAME]`
options(
[DEFINE_ENDPOINT]
);
```

**Expand the hint for helpful tips!**

### Generate embeddings

When generating the embeddings for images, save the embeddings to a table named **gcc\_retail\_store\_embeddings** in the precreated BigQuery dataset named **gcc\_bqml\_dataset**.

1. Run the following SQL code in the BigQuery SQL Editor. Be sure to replace the bracketed placeholders `[]` with the correct code (such as replacing `[PROJECT_ID]` with the assigned Project ID for this lab environment).

```apache
Create or replace table `[PROJECT_ID].[DATASET_NAME].[EMBEDDINGS_TABLE_NAME]`
as select *, REGEXP_EXTRACT(uri, r'[^/]+$') as product_name
from [EMBEDDINGS_FUNCTION]
(
MODEL `[PROJECT_ID].[DATASET_NAME].[MODEL_NAME]`,
TABLE `[PROJECT_ID].[DATASET_NAME].[OBJECT_TABLE_NAME]`
)
```

**Expand the hint for helpful tips!**

2. \[Optional step\] To review the embedding results, update and run the following code (note that the embedding results are floating-point numbers and may not be immediately interpretable):

```apache
SELECT * FROM `[PROJECT_ID].[DATASET_NAME].[EMBEDDINGS_TABLE_NAME]`
```

Click **Check my progress** to verify the objective.

---

## Solution of Lab

%[https://youtu.be/4JHs5BlGqKs]

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP523/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Implement%20Multimodal%20Vector%20Search%20with%20BigQuery%20Challenge%20Lab/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```