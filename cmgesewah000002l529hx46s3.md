---
title: "Analyze Customer Reviews with Gemini Using SQL - GSP1246"
datePublished: Mon Oct 06 2025 07:06:18 GMT+0000 (Coordinated Universal Time)
cuid: cmgesewah000002l529hx46s3
slug: analyze-customer-reviews-with-gemini-using-sql-gsp1246-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759734523972/c67483ae-0958-4ed5-9673-f0be5bf31067.png
tags: gemini, analyze-customer-reviews-with-gemini-using-sql-gsp1246, analyze-customer-reviews-with-gemini-using-sql, gsp1262, gemini-using-sql

---

## Overview

In this lab you learn how to use BigQuery Machine Learning with remote models (Gemini) in SQL to extract keywords, assess customer sentiment in customer reviews, and respond to customer reviews with zero-shot and few-shot prompts.

BigQuery is a fully managed, AI-ready data analytics platform that helps you maximize value from your data and is designed to be multi-engine, multi-format, and multi-cloud. One of its key features is BigQuery Machine Learning, which lets you create and run machine learning (ML) models by using [SQL queries or with Colab Enterprise notebooks](https://cloud.google.com/bigquery/docs/bqml-introduction).

[Gemini](https://deepmind.google/technologies/gemini/#introduction) is a family of generative AI models developed by Google DeepMind that is designed for multimodal use cases. The Gemini API gives you access to the [Gemini models](https://cloud.google.com/bigquery/docs/generative-ai-overview#generative_ai).

Additionally, you'll use the Gemini model to generate summaries and extract relevant keywords from customer review images.

## Objectives

In this lab, you learn how to:

* Create a Cloud Resource connection in BigQuery.
    
* Create the dataset, and tables in BigQuery.
    
* Create the Gemini remote models in BigQuery.
    
* Prompt Gemini to analyze keywords and sentiment (positive, or negative) for text based customer reviews.
    
* Generate a report with a count of positive, and negative reviews.
    
* Respond to customer reviews.
    
* Prompt Gemini to extract a summary and keywords for each customer review image.
    

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
    student-01-d9185005a101@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    OwGIPlS8z32w
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

## Task 1. Create the cloud resource connection and grant IAM role

### Create the cloud resource connection in BigQuery

In this task you create a Cloud resource connection in BigQuery, so you can work with Gemini and Gemini models. You will also grant the cloud resource connection's service account IAM permissions, through a role, to enable it access the Vertex AI services.

### Open the BigQuery console

1. In the Google Cloud Console, select **Navigation menu** &gt; **BigQuery**.
    

The **Welcome to BigQuery in the Cloud Console** message box opens. This message box provides a link to the quickstart guide and the release notes.

2. Click **Done**.
    

The BigQuery console opens.

3. In the **Explorer** pane and click **\+ Add data**, and in **Search for data sources** type **Vertex AI**.
    
4. Click on the **Vertex AI** result then click on **BigQuery Federation**.
    
5. In the Connection type list, select **Vertex AI remote models, remote functions and BigLake (Cloud Resource)**.
    
6. In the Connection ID field, enter **gemini\_conn** for your connection.
    
7. For **Location type** select **Multi-region** and then, from dropdown select **US** multi-region.
    
8. Use the defaults for the other settings.
    
9. Click **Create connection**.
    
10. Click **Go to connection**.
    
11. In the Connection info pane, copy the service account ID to a text file for use in the next task. You will also see that the connection is added under the External Connections section of your project in the BigQuery Explorer.
    

### Grant Vertex AI User role to the connection's service account

1. In the console, on the **Navigation menu**, click **IAM & Admin**.
    
2. Click **Grant Access**.
    
3. In the **New principals** field, enter the service account ID that you copied earlier.
    
4. In the Select a role field, enter **Vertex AI**, and then select **Vertex AI User** role.
    
5. Click **Save**.
    
    The result is the service account now includes the Vertex AI User role.
    

Click **Check my progress** to verify the objective.

Create the cloud resource connection and grant IAM role.

## Task 2. Review images, and files, and grant IAM role to service account

In this task, you review the dataset and the image files, then you grant IAM permissions to the cloud resource connection's service account.

### Review the image files and customer reviews dataset on Cloud Storage

Before you dive into this task to grant permissions to the resource connection service account, review the dataset and the image files.

1. In the console, select the **Navigation menu** (), and then select **Cloud Storage**.
    
2. Click on **Buckets** and Select the `qwiklabs-gcp-01-d46ed01cf565`\-bucket bucket.
    
3. The bucket contains the `gsp1246` folder, open the folder. You will see two items in it:
    
    * The `images` folder contains all image files you will analyze. Feel free to access the images folder and review the image files.
        
    * The `customer_reviews.csv` file is the dataset that contains the text based customer reviews.
        
    
    **Note:** You can use the Authenticated URL for each image and the customer\_reviews.csv file to download and review each item.
    

### Grant IAM Storage Object Admin role to the connection's service account

Granting IAM permissions to the resource connection's service account before you start working in BigQuery will ensure you do not encounter access denied errors when running queries.

1. Return to the root of the bucket.
    
2. Click **Permissions**.
    
3. Click **Grant access**.
    
4. In the **New principals** field, enter the service account ID you copied earlier.
    
5. In the Select a role field, enter **Storage Object**, and then select **Storage Object Admin** role.
    
6. Click **Save**.
    
    The result is the service account now includes the Storage Object Admin role.
    

Click **Check my progress** to verify the objective.

Review images, and files, and grant IAM role to service account.

## Task 3. Create the dataset, and tables in BigQuery

In this task, you create a dataset for the project, the table for customer reviews, and the image object table.

### Create the dataset

1. In the console, select the **Navigation menu** (), and then select **BigQuery**.
    
2. In the **Explorer** panel, for `qwiklabs-gcp-01-d46ed01cf565`, select **View actions** (), and then select **Create dataset**.
    
    You [create a dataset](https://cloud.google.com/bigquery/docs/datasets) to store database objects, including tables and models.
    
3. In the **Create dataset** pane, enter the following information:
    
    | **Field** | **Value** |
    | --- | --- |
    | Dataset ID | **gemini\_demo** |
    | Location type | select **Multi-region** |
    | Multi-region | select **US** |
    
    Leave the other fields at their defaults.
    
4. Click **Create dataset**.
    
    The result is the `gemini_demo` dataset is created and listed underneath your project in the BigQuery Explorer.
    

### Create the table for the customer reviews

To create the customer reviews table you will use a SQL query.

1. Click the **+** to **Create a new SQL Query**.
    
2. In the query editor, paste the query below.
    
    ```apache
    LOAD DATA OVERWRITE gemini_demo.customer_reviews
    (customer_review_id INT64, customer_id INT64, location_id INT64, review_datetime DATETIME, review_text STRING, social_media_source STRING, social_media_handle STRING)
    FROM FILES (
      format = 'CSV',
      uris = ['gs://qwiklabs-gcp-01-d46ed01cf565-bucket/gsp1246/customer_reviews.csv']);
    ```
    
    This query uses the [LOAD DATA statement](https://cloud.google.com/bigquery/docs/loading-data-cloud-storage-csv#loading_csv_data_into_a_table) to load the `customer_reviews.csv` file from Cloud Storage to a BigQuery table with the given column names and data types.
    
3. Click **Run**.
    
    The result is the query is processed and the `customer_reviews` table created with the `customer_review_id`, `customer_id`, `location_id`, `review_datetime`, `review_text`, `social_media_source`, and `social_media_handle` for each review in the dataset.
    
4. In the Explorer pane, click on the **customer\_reviews** table and review the schema and details. Feel free to query the table to review records.
    

### Create the object table for the review images

To create the object table you will use a SQL Query.

1. Click the **+** to **Create new SQL query**.
    
2. In the query editor, paste the query below.
    
    ```apache
    CREATE OR REPLACE EXTERNAL TABLE
      `gemini_demo.review_images`
    WITH CONNECTION `us.gemini_conn`
    OPTIONS (
      object_metadata = 'SIMPLE',
      uris = ['gs://qwiklabs-gcp-01-d46ed01cf565-bucket/gsp1246/images/*']
      );
    ```
    
3. Run the Query.
    
    The result is the `review_images` [object table](https://cloud.google.com/bigquery/docs/object-table-introduction) is added to the `gemini_demo` dataset and loaded with the uri (the cloud storage location) of each audio review in the sample dataset.
    
4. In the Explorer, click on the **review\_images** table and review the schema and details. Feel free to query the table to review specific records.
    

Click **Check my progress** to verify the objective.

Create the dataset, tables and slot reservation in BigQuery.

## Task 4. Create the Gemini models in BigQuery

Now that the tables are created, you can begin to work with them. In this task, you create a model for [Gemini 2.0 Flash in BigQuery](https://cloud.google.com/bigquery/docs/generative-ai-overview).

### Create the Gemini 2.0 Flash model

1. Click the **+** to **Create a new SQL Query**.
    
2. In the query editor, paste the query below and run it.
    
    ```apache
    CREATE OR REPLACE MODEL `gemini_demo.gemini_2_0_flash`
    REMOTE WITH CONNECTION `us.gemini_conn`
    OPTIONS (endpoint = 'gemini-2.0-flash')
    ```
    
    The result is the `gemini_2_0_flash` model is created and you see it added to the `gemini_demo` dataset, in the models section.
    
3. In the Explorer, click on the **gemini\_2\_0\_flash** model and review the details and schema.
    

Click **Check my progress** to verify the objective.

Create the Gemini models in BigQuery.

## Task 5. Prompt Gemini to analyze customer reviews for keywords and sentiment

In this task, you will use Gemini model to analyze each customer review for keywords and sentiment, either positive or negative.

### Analyze the customer reviews for keywords

1. Click the **+** to **Create a new SQL Query**.
    
2. In the query editor, paste the query below, and run it.
    
    ```apache
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_keywords` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_2_0_flash`,
    (
       SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
          'For each review, provide keywords from the review. Answer in JSON format with one key: keywords. Keywords should be a list.',
          review_text) AS prompt
       FROM `gemini_demo.customer_reviews`
    ),
    STRUCT(
       0.2 AS temperature, TRUE AS flatten_json_output)));
    ```
    
    This query takes customer reviews from the `customer_reviews` table, constructs prompts for the `gemini_2_0_flash` model to identify keywords within each review. The results are then stored in a new table `customer_reviews_keywords`.
    
    Please wait. The model takes approximately 30 seconds to process the customer review records.
    
    When the model is finished, the result is the `customer_reviews_keywords` table is created.
    
3. In the Explorer, click on the **customer\_reviews\_keywords** table and review the schema and details.
    
4. Click the **+** to **Create a new SQL Query**.
    
5. In the query editor, paste and run the query below.
    
    ```apache
    SELECT * FROM `gemini_demo.customer_reviews_keywords`
    ```
    
    The result is rows are displayed from the `customer_reviews_keywords` table with the `ml_generate_text_llm_result` column containing the keywords analysis, `social_media_source`, `review_text`, `customer_id`, `location_id` and `review_datetime` columns included.
    

### Analyze the customer reviews for positive and negative sentiment

1. Click the **+** to **Create a new SQL Query**.
    
2. In the query editor, paste the query below, and run it.
    
    ```apache
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_analysis` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_2_0_flash`,
    (
       SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
          'Classify the sentiment of the following text as positive or negative.',
          review_text, "In your response don't include the sentiment explanation. Remove all extraneous information from your response, it should be a boolean response either positive or negative.") AS prompt
       FROM `gemini_demo.customer_reviews`
    ),
    STRUCT(
       0.2 AS temperature, TRUE AS flatten_json_output)));
    ```
    
    This query takes customer reviews from the `customer_reviews` table, constructs prompts for the `gemini_2_0_flash` model to classify the sentiment of each review. The results are then stored in a new table `customer_reviews_analysis`, so that you may use it later for further analysis.
    
    Please wait. The model takes approximately 20 seconds to process the customer review records.
    
    When the model is finished, the result is the `customer_reviews_analysis` table is created.
    
3. In the Explorer, click on the **customer\_reviews\_analysis** table and review the schema and details.
    
4. Click the **+** to **Create a new SQL Query**.
    
5. In the query editor, paste and run the query below.
    
    ```apache
    SELECT * FROM `gemini_demo.customer_reviews_analysis`
    ORDER BY review_datetime
    ```
    
    The result is rows `customer_reviews_analysis` table with the `ml_generate_text_llm_result` column containing the sentiment analysis, with the `social_media_source`, `review_text`, `customer_id`, `location_id` and `review_datetime` columns included.
    
    Take a look at some of the records. You may notice some of the results for positive and negative may not be formatted correctly, with extraneous characters like periods, or extra space. You can sanitize the records by using the view below.
    

### Create a view to sanitize the records

1. Click the **+** to **Create a new SQL Query**.
    
2. In the query editor, paste and run the query below.
    
    ```apache
    CREATE OR REPLACE VIEW gemini_demo.cleaned_data_view AS
    SELECT
    REPLACE(REPLACE(REPLACE(LOWER(ml_generate_text_llm_result), '.', ''), ' ', ''), '\n', '') AS sentiment,
    REGEXP_REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(social_media_source, r'Google(\+|\sReviews|\sLocal|\sMy\sBusiness|\sreviews|\sMaps)?',
          'Google'), 'YELP', 'Yelp'), r'SocialMedia1?', 'Social Media') AS social_media_source,
    review_text,
    customer_id,
    location_id,
    review_datetime
    FROM
    gemini_demo.customer_reviews_analysis;
    ```
    
    The query creates the view, `cleaned_data_view` and includes the sentiment results, the review text, the customer id and the location id. It then takes the sentiment result (positive or negative) and ensures that all letters are made lower case, and extreanous characters like extra spaces or periods are removed. The resulting view will make it easier to do further analysis in later steps within this lab.
    
3. You can query the view with the query below, to see the rows created.
    
    ```apache
    SELECT * FROM `gemini_demo.cleaned_data_view`
    ORDER BY review_datetime
    ```
    
    This query is designed to fetch all data from the `cleaned_data_view` view and then arrange it in ascending order based on the date and time of the reviews.
    

### Create a report of positive and negative review counts

1. You can use BigQuery to create a bar chart report of the counts of positive and negative reviews. Start with the query below.
    
    ```apache
    SELECT sentiment, COUNT(*) AS count
    FROM `gemini_demo.cleaned_data_view`
    WHERE sentiment IN ('positive', 'negative')
    GROUP BY sentiment;
    ```
    
    The result is counts for positive and negative reviews are displayed.
    
2. To create the bar chart report of these counts, click **CHART** in the Query results section of BigQuery. BigQuery will automatically set the chart configuration, with chart type of Bar, and the sentiment column (the predicted sentitment as positive or negative) and the bar will display the count.
    

### Create a count of positive and negative reviews by social media source

1. You can use BigQuery to list the count of positive and negative reviews per social media source using the query below.
    
    ```apache
    SELECT sentiment, social_media_source, COUNT(*) AS count
    FROM `gemini_demo.cleaned_data_view`
    WHERE sentiment IN ('positive') OR sentiment IN ('negative')
    GROUP BY sentiment, social_media_source
    ORDER BY sentiment, count;
    ```
    

Click **Check my progress** to verify the objective.

Prompt Gemini to analyze customer reviews for keywords and sentiment.

## Task 6. Respond to customer reviews

You can also use Gemini to respond to customer reviews. In this task you will learn how to create a marketing response using zero-shot and a customer service response using few-shot, against specific reviews in the `customer_reviews` table.

**Note:** Refer to [zero-shot vs. few-shot prompts](https://ai.google.dev/gemini-api/docs/prompting-strategies#zero-shot-vs-few-shot-prompts) within the Google AI for Developers documentation for more information.

### Marketing response

The customer with `customer_id` 5576 responded with:

The location was clean and inviting. I also like that there is a variety of seating because sometimes I want to cuddle up with my coffee and read and other times I prefer a tall chair and table so I can work on projects.

This is clearly a positive review, how can you use Gemini 2.0 Flash to respond to this customer and incentivize them for the positive review?

1. You can use Gemini 2.0 Flash with these queries to accomplish this. In the query editor, paste the query below and run it.
    
    ```apache
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_marketing` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_2_0_flash`,
    (
       SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
          'You are a marketing representative. How could we incentivise this customer with this positive review? Provide a single response, and should be simple and concise, do not include emojis. Answer in JSON format with one key: marketing. Marketing should be a string.', review_text) AS prompt
       FROM `gemini_demo.customer_reviews`
       WHERE customer_id = 5576
    ),
    STRUCT(
       0.2 AS temperature, TRUE AS flatten_json_output)));
    ```
    
    This query is designed to analyze customer reviews from the `customer_reviews` table, specifically those from customer ID 5576. When you run the query, it uses Gemini to generate marketing suggestions based on the review text and then stores the results in a new table called `customer_reviews_marketing.` This table will contain the original review data along with the generated marketing suggestions, allowing you to easily analyze and act upon them.
    
2. You can view the details of the `customer_reviews_marketing` table by running the SQL query below.
    
    ```apache
    SELECT * FROM `gemini_demo.customer_reviews_marketing`
    ```
    
    Notice that the `ml_generate_text_llm_result` column contains the response.
    
3. You can make this easier to read, and take action on the response by using the SQL query below:
    
    ```apache
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_marketing_formatted` AS (
    SELECT
       review_text,
       JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.marketing") AS marketing,
       social_media_source, customer_id, location_id, review_datetime
    FROM
       `gemini_demo.customer_reviews_marketing` results )
    ```
    
4. You can view the details of the table by running the SQL query below.
    
    ```apache
    SELECT * FROM `gemini_demo.customer_reviews_marketing_formatted`
    ```
    
    Notice the `marketing` column. An appliction can be written to take the response in the `marketing` column and attach the 10 percent off coupon file as a notifcation for the customer's account in the data beans app or an email can be generated with these to the customer as well.
    

### Customer service response

The customer with `customer_id` 8844 responded with:

I had a very disappointing experience at this coffee truck. The service was terrible - the staff were rude and inattentive, and we had to wait a long time for our food and drinks. The food itself was mediocre at best - the coffee was weak and the pastries were stale. The shop itself was also very cramped and noisy, making it difficult to relax and enjoy our time there. To top it all off, the prices were very high, making the whole experience even worse. I would definitely not recommend this place to anyone.

This is clearly a negative review, how can you use Gemini to respond to this customer and notify the coffee shop of their experience, in an effort to take action?

1. You can use Gemini with these queries to accomplish this. In the query editor, paste the query below and run it.
    
    ```apache
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_cs_response` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_2_0_flash`,
    (
       SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
          'How would you respond to this customer review? If the customer says the coffee is weak or burnt, respond stating "thank you for the review we will provide your response to the location that you did not like the coffee and it could be improved." Or if the review states the service is bad, respond to the customer stating, "the location they visited has been notified and we are taking action to improve our service at that location." From the customer reviews provide actions that the location can take to improve. The response and the actions should be simple, and to the point. Do not include any extraneous or special characters in your response. Answer in JSON format with two keys: Response, and Actions. Response should be a string. Actions should be a string.', review_text) AS prompt
       FROM `gemini_demo.customer_reviews`
       WHERE customer_id = 8844
    ),
    STRUCT(
       0.2 AS temperature, TRUE AS flatten_json_output)));
    ```
    
    This query is designed to automate customer service responses by using Gemini to analyze customer reviews and generate appropriate responses and action plans. It's a powerful example of how Google Cloud can be used to enhance customer service and improve business operations. When the query is run, the result is the `customer_reviews_cs_response` table is created.
    
2. You can view the details of the table by running the SQL query below.
    
    ```apache
    SELECT * FROM `gemini_demo.customer_reviews_cs_response`
    ```
    
    Notice that the `ml_generate_text_llm_result` column contains the response and the actions as two keys.
    
3. You can make this easier to read, by using the SQL query below two separate the response and the actions into two columns in a new table called `customer_reviews_cs_response_formatted`:
    
    ```apache
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_cs_response_formatted` AS (
    SELECT
       review_text,
       JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.Response") AS Response,
       JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.Actions") AS Actions,
       social_media_source, customer_id, location_id, review_datetime
    FROM
       `gemini_demo.customer_reviews_cs_response` results )
    ```
    
4. You can view the details of the table by running the SQL query below.
    
    ```apache
    SELECT * FROM `gemini_demo.customer_reviews_cs_response_formatted`
    ```
    
    Notice the response and actions fields are now created. You can build separate applications to respond to the customer, and to the location so that it can take actions to improve and the customer will be notified their feedback was received.
    

Click **Check my progress** to verify the objective.

Respond to customer reviews.

## Task 7. Prompt Gemini to provide keywords and summaries for each image

In this task, you will use Gemini to analyze images generating keywords and summaries.

### Analyze the images with Gemini 2.0 Flash model

1. Click the **+** to **Create a new SQL Query**.
    
2. In the query editor, paste the query below, and run it.
    
    ```apache
    CREATE OR REPLACE TABLE
    `gemini_demo.review_images_results` AS (
    SELECT
        uri,
        ml_generate_text_llm_result
    FROM
        ML.GENERATE_TEXT( MODEL `gemini_demo.gemini_2_0_flash`,
        TABLE `gemini_demo.review_images`,
        STRUCT( 0.2 AS temperature,
            'For each image, provide a summary of what is happening in the image and keywords from the summary. Answer in JSON format with two keys: summary, keywords. Summary should be a string, keywords should be a list.' AS PROMPT,
            TRUE AS FLATTEN_JSON_OUTPUT)));
    ```
    
    Please wait. The model takes approximately 3 minutes to complete.
    
    When the model has finished processing the image, the result is the `review_images_results` table is created.
    
3. In the Explorer, click on the **review\_image\_results** table and review the schema and details.
    
4. Click the **+** to **Create a new SQL Query**.
    
5. In the query editor, paste and run the query below.
    
    ```apache
    SELECT * FROM `gemini_demo.review_images_results`
    ```
    
    The result is rows for each review image are displayed with the uri (the CloudStorage location of the review image) and a JSON result including the summary and keywords the Gemini Vision model.
    
    You can retrieve these results in a more human readable way, by using the next query.
    
6. Click the **+** to **Create a new SQL Query**.
    
7. In the query editor, paste and run the query below.
    
    ```apache
    CREATE OR REPLACE TABLE
      `gemini_demo.review_images_results_formatted` AS (
      SELECT
        uri,
        JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.summary") AS summary,
        JSON_QUERY(RTRIM(LTRIM(results.ml_generate_text_llm_result, " ```json"), "```"), "$.keywords") AS keywords
      FROM
        `gemini_demo.review_images_results` results )
    ```
    
    The result is the `review_images_results_formatted` table is created.
    
8. You can query the table with the query below, to see the rows created.
    
    ```apache
    SELECT * FROM `gemini_demo.review_images_results_formatted`
    ```
    
    Notice how the uri column results remain the same, but the JSON is now converted to the summary and keywords columns for each row.
    

Click **Check my progress** to verify the objective.

Prompt Gemini to provide customer review image summaries and keywords.

---

## Solution of Lab

%[https://youtu.be/BqBDoUiooSw] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1246/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Analyze%20Customer%20Reviews%20with%20Gemini%20Using%20SQL/techcps1246.sh
sudo chmod +x techcps1246.sh
./techcps1246.sh
```

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>If the code is not executed properly, then re run the GitHub commands</strong></div>
</div>