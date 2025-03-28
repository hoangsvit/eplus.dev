---
title: "Analyze Customer Reviews with Gemini Using Python Notebooks - GSP1249"
seoTitle: "Analyze Customer Reviews with Gemini Using Python Notebooks - GSP1249"
seoDescription: "In this lab you learn how to extract keywords and assess customer sentiment in customer reviews using BigQuery Machine Learning with remote models (Gemini P"
datePublished: Sat Jan 25 2025 09:23:55 GMT+0000 (Coordinated Universal Time)
cuid: cm6bzhhxd001309jgal7y9ur7
slug: analyze-customer-reviews-with-gemini-using-python-notebooks-gsp1249
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737797479301/476fcb54-38ed-4bf9-9eb4-91f90e5681c0.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1737797486913/5269d8cc-b22e-40bf-9bc2-e5ab38bb6e42.png
tags: analyze-customer-reviews-with-gemini-using-python-notebooks, gsp1249

---

## **Overview**

In this lab you learn how to extract keywords and assess customer sentiment in customer reviews using BigQuery Machine Learning with remote models (Gemini Pro).

BigQuery is a fully managed, AI-ready data analytics platform that helps you maximize value from your data and is designed to be multi-engine, multi-format, and multi-cloud. One of its key features is BigQuery Machine Learning, which lets you create and run machine learning (ML) models by using [SQL queries or with Colab Enterprise notebooks](https://cloud.google.com/bigquery/docs/bqml-introduction).

[Gemini](https://deepmind.google/technologies/gemini/#introduction) is a family of generative AI models developed by Google DeepMind that is designed for multimodal use cases. The Gemini API gives you access to the [Gemini Pro, Gemini Pro Vision, and Gemini Flash models](https://cloud.google.com/bigquery/docs/generative-ai-overview#generative_ai).

At the end of this lab you will build a Python-based customer service application in a Colab Enterprise notebook within BigQuery, using the Gemini Flash model to respond to audio-based customer reviews.

## **Objectives**

In this lab, you learn how to:

* Create a Python notebook in BigQuery using Colab Enterprise.
    
* Create a Cloud Resource connection in BigQuery.
    
* Create the dataset and tables in BigQuery.
    
* Create the Gemini remote models in BigQuery.
    
* Prompt Gemini to analyze keywords and setiment (positive, or negative) for text based customer reviews.
    
* Generate a report with a count of positive, and negative reviews.
    
* Respond to customer reviews at scale.
    
* Create an application for customer service representatives to respond to audio based customer reviews.
    

## **Setup and requirements**

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
    student-03-af1241c5ce18@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    Xsp7wC3BgMHB
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

## **Task 1. Create BigQuery Python notebook and connect to runtime**

In this task you create a BigQuery Python notebook and connect the notebook to the runtime.

### Create the BigQuery Python notebook

1. In the Google Cloud console, on the **Navigation menu**, click **BigQuery**.
    
2. Click **DONE** on the Welcome pop-up.
    
3. Click **PYTHON NOTEBOOK**.
    
4. Select `us-central1` for the region.
    
5. Click **SELECT**.
    
    You will also notice that the Python notebook is added in the notebooks section of the explorer under your project.
    
6. Delete all of the cells that are in the notebook by clicking the trash icon that appears when you hover over each cell.
    

Once complete, the notebook should be blank and you are ready to move on to the next step.

### Connect to the runtime

1. Click **Connect**.
    
2. Click on the **Qwiklabs student ID**.
    
    Please wait. It may take up to 3 minutes to connect to the runtime.
    
    At some point, you will see the connection status update to Connected at the bottom of your browser window.
    

Click **Check my progress** to verify the objective.

Create BigQuery Python notebook and connect to runtime

Check my progress

## **Task 2. Create the cloud resource connection and grant IAM role**

### Create the cloud resource connection in BigQuery

In this task you create a [Cloud resource connection](https://cloud.google.com/bigquery/docs/create-cloud-resource-connection) in BigQuery, so you can work with Gemini Pro and Gemini Flash models. You will also grant the cloud resource connection's service account IAM permissions, through a role, to enable it access the Vertex AI services.

You will use the Python SDK and the Google Cloud CLI to create the resource connection. But first you need to import Python libraries and set the project\_id and region variables.

1. Create a new code cell with the code below:
    
    ```apache
    # Import Python libraries
    import vertexai
    from vertexai.generative_models import GenerativeModel, Part
    from google.cloud import bigquery
    from google.cloud import storage
    import json
    import io
    import matplotlib.pyplot as plt
    from IPython.display import HTML, display
    from IPython.display import Audio
    from pprint import pprint
    ```
    
    This code will import the Python libraries.
    
2. Run this cell. The libraries are now loaded and ready to be used.
    
3. Create a new code cell with the code below:
    
    ```apache
    # Set Python variables for project_id and region
    project_id = "qwiklabs-gcp-00-c822be412495"
    region = " us-central1"
    ```
    
    **Note:** project\_id and region are saved here as Python variables not SQL variables, therefore you can only refer to them in cells using Python code, not SQL code.
    
4. Run this cell. The variables for project\_id and region are set.
    
5. Create a new code cell with the code below:
    
    ```apache
    # Create the resource connection
    !bq mk --connection \
      --connection_type=CLOUD_RESOURCE \
      --location=US \
      gemini_conn
    ```
    
    This code will use the Google Cloud CLI command `bq mk --conection` to create the resource connection.
    
6. Run this cell. The resource connection is now created.
    
7. Click the **view actions** button next to your project id in the Explorer.
    
8. Choose **Refresh contents**.
    
9. Expand **external connections**. Notice `us.gemini_conn` is now listed as an external connection.
    
10. Click **us.gemini\_conn**.
    
11. In the Connection info pane, copy the service account ID to a text file for use in the next task.
    

### Grant Vertex AI User role to the connection's service account

1. In the console, on the **Navigation menu**, click **IAM & Admin**.
    
2. Click **Grant Access**.
    
3. In the **New principals** field, enter the service account ID that you copied earlier.
    
4. In the Select a role field, enter **Vertex AI**, and then select **Vertex AI User** role.
    
5. Click **Save**.
    
    The result is the service account now includes the Vertext AI User role.
    

Click **Check my progress** to verify the objective.

Create the cloud resource connection and grant IAM role

Check my progress

## **Task 3. Review audio files, dataset, and grant IAM role to service account**

In this task, you review the dataset and the audio files, then you grant IAM permissions to the cloud resource connection's service account.

### Review the audio files, image files, and customer reviews dataset on Cloud Storage

Before you dive into this task to grant permissions to the resource connection service account, review the dataset and the image files.

1. In the Google Cloud console, select the **Navigation menu** (), and then select **Cloud Storage**.
    
2. Click on the `qwiklabs-gcp-00-c822be412495`\-bucket bucket.
    
3. The bucket contains the gsp1249 folder, open the folder. You will see five items in it:
    
    * The `audio` folder contains all audio files you will analyze. Feel free to access the audio folder and review the audio files.
        
    * The `customer_reviews.csv` file is the dataset that contains the text based customer reviews.
        
    * The `images` folder contains an image file you will use later in this lab. Feel free to access this folder and view the image file contained within it.
        
    * `notebook.ipynb`, this is a copy of the notebook you are creating in this lab. Feel free to review it as needed.
        
    
    **Note:** You can use the Authenticated URL to download and review each item.
    

### Grant IAM Storage Object Admin role to the connection's service account

Granting IAM permissions to the resource connection's service account before you start working in BigQuery will ensure you do not encounter access denied errors when running queries.

1. Return to the root of the bucket.
    
2. Click **PERMISSIONS**.
    
3. Click **GRANT ACCESS**.
    
4. In the **New principals** field, enter the service account ID you copied earlier.
    
5. In the Select a role field, enter **Storage Object**, and then select **Storage Object Admin** role.
    
6. Click **Save**.
    
    The result is the service account now includes the Storage Object Admin role.
    

Click **Check my progress** to verify the objective.

Review images, dataset, and grant IAM role to service account

Check my progress

## **Task 4. Create the dataset, and customer reviews table in BigQuery**

In this task, you create a dataset for the project, the table for customer reviews.

### Create the dataset

For the dataset you will use the following properties:

| **Field** | **Value** |
| --- | --- |
| Dataset ID | **gemini\_demo** |
| Location type | select **Multi-region** |
| Multi-region | select **US** |

1. Return to the Python notebook in BigQuery.
    
2. Create a new code cell with the code below:
    
    ```sql
    # Create the dataset
    %%bigquery
    CREATE SCHEMA IF NOT EXISTS `qwiklabs-gcp-00-c822be412495.gemini_demo`
    OPTIONS(location="US");
    ```
    
    Notice the code starts with `%%bigquery`, this tells Python that the code immediately following this statement will be SQL code.
    
3. Run this cell.
    
    The result is the SQL code will create the `gemini_demo` dataset in your project residing in the US region listed underneath your project in the BigQuery Explorer.
    

### Create the customer reviews table with sample data

To create the customer reviews table you will use a SQL query.

1. Create a new code cell with the code below:
    
    ```sql
    # Create the customer reviews table
    %%bigquery
    LOAD DATA OVERWRITE gemini_demo.customer_reviews
    (customer_review_id INT64, customer_id INT64, location_id INT64, review_datetime DATETIME, review_text STRING, social_media_source STRING, social_media_handle STRING)
    FROM FILES (
      format = 'CSV',
      uris = ['gs://qwiklabs-gcp-00-c822be412495-bucket/gsp1249/customer_reviews.csv']);
    ```
    
2. Run this cell.
    
    The result is the `customer_reviews` table is created with sample customer review data, including the `customer_review_id`, `customer_id`, `location_id`, `review_datetime`, `review_text`, `social_media_source`, and `social_media_handle` for each review in the dataset.
    
3. In the Explorer, click on the **customer\_reviews** table and review the schema and details.
    
4. Query the table to review records by creating a new code cell with the code below.
    
    ```sql
    # Create the customer reviews table
    %%bigquery
    SELECT * FROM `gemini_demo.customer_reviews`
    ORDER BY review_datetime
    ```
    
5. Run this cell.
    
    The result is the records are displayed from the table with all columns included.
    

Click **Check my progress** to verify the objective.

Create the dataset and customer reviews table in BigQuery

Check my progress

## **Task 5. Create the Gemini Pro model in BigQuery**

Now that the tables are created, you can begin to work with them. In this task, you create the Gemini Pro model in BigQuery.

1. Return to the Python notebook.
    
2. Create a new code cell with the code below:
    
    ```sql
    # Create the customer reviews table
    %%bigquery
    CREATE OR REPLACE MODEL `gemini_demo.gemini_pro`
    REMOTE WITH CONNECTION `us.gemini_conn`
    OPTIONS (endpoint = 'gemini-pro')
    ```
    
3. Run this cell.
    
    The result is the `gemini_pro` model is created and you see it added to the `gemini_demo` dataset, in the models section.
    
4. In the Explorer, click on the **gemini\_pro** model and review the details and schema.
    

Click **Check my progress** to verify the objective.

Create the Gemini Pro model in BigQuery

Check my progress

## **Task 6. Prompt Gemini to analyze customer reviews for keywords and sentiment**

In this task, you will use Gemini Pro model to analyze each customer review for sentiment, either positive or negative.

### Analyze the customer reviews for positive and negative sentiment

1. Create a new code cell with the code below:
    
    ```sql
    # Create the sentiment analysis table
    %%bigquery
    CREATE OR REPLACE TABLE
    `gemini_demo.customer_reviews_analysis` AS (
    SELECT ml_generate_text_llm_result, social_media_source, review_text, customer_id, location_id, review_datetime
    FROM
    ML.GENERATE_TEXT(
    MODEL `gemini_demo.gemini_pro`,
    (
       SELECT social_media_source, customer_id, location_id, review_text, review_datetime, CONCAT(
          'Classify the sentiment of the following text as positive or negative.',
          review_text, "In your response don't include the sentiment explanation. Remove all extraneous information from your response, it should be a boolean response either positive or negative.") AS prompt
       FROM `gemini_demo.customer_reviews`
    ),
    STRUCT(
       0.2 AS temperature, TRUE AS flatten_json_output)));
    ```
    
2. Run this cell.
    
    This query takes customer reviews from the `customer_reviews` table, constructs the prompt, and then uses these with the `gemini_pro` model to classify the sentiment of each review. The results are then stored in a new table `customer_reviews_analysis` so that you may use it later for further analysis.
    
    Please wait. The model takes approximately 30 seconds to process the customer review records.
    
    When the model is finished, the result is the `customer_reviews_analysis` table is created.
    
3. In the Explorer, click on the **customer\_reviews\_analysis** table and review the schema and details.
    
4. Create a new code cell with the code below:
    
    ```sql
    # Pull the first 100 records from the customer_reviews_analysis table
    %%bigquery
    SELECT * FROM `gemini_demo.customer_reviews_analysis`
    ORDER BY review_datetime
    ```
    
5. Run this cell.
    
    The result is rows with the `ml_generate_text_llm_result` column (containing the sentiment analysis), the customer review text, customer id and location id.
    
    Take a look at some of the records. You may notice some of the results for positive and negative may not be formatted correctly, with extraneous characters like periods, or extra space. You can santize the records by using the view below.
    

### Create a view to sanitize the records

1. Create a new code cell with the code below:
    
    ```sql
    # Sanitize the records within a new view
    %%bigquery
    CREATE OR REPLACE VIEW gemini_demo.cleaned_data_view AS
    SELECT REPLACE(REPLACE(LOWER(ml_generate_text_llm_result), '.', ''), ' ', '') AS sentiment,
    REGEXP_REPLACE(
          REGEXP_REPLACE(
                REGEXP_REPLACE(social_media_source, r'Google(\+|\sReviews|\sLocal|\sMy\sBusiness|\sreviews|\sMaps)?', 'Google'),
                'YELP', 'Yelp'
          ),
          r'SocialMedia1?', 'Social Media'
       ) AS social_media_source,
    review_text, customer_id, location_id, review_datetime
    FROM `gemini_demo.customer_reviews_analysis`;
    ```
    
2. Run this cell.
    
    The code creates the view, `cleaned_data_view` and includes the sentiment results, the review text, the customer id and the location id. It then takes the sentiment result (positive or negative) and ensures that all letters are made lower case, and extreanous charaters like extra spaces or periods are removed. The resulting view will make it easier to do further analysis in later steps within this lab.
    
3. Create a new code cell with the code below:
    
    ```sql
    # Pull the first 100 records from the cleaned_data_view view
    %%bigquery
    SELECT * FROM `gemini_demo.cleaned_data_view`
    ORDER BY review_datetime
    ```
    
4. Run this cell.
    
    Notice that the `sentiment` column now has clean values for positive and negative reviews. You will be able to use this view in later steps to build a report.
    

### Create a report of positive and negative review counts

You can use Python and the Matplotlib library to create a bar chart report of the counts of positive and negative reviews.

1. Create new code cell to use the BigQuery client to query the cleaned\_data\_view for positive and negative reviews, and group the reviews by sentiment, storing the results in a dataframe.
    
    ```apache
    # Task 6.5 - Create the BigQuery client, and query the cleaned data view for positive and negative reviews, store the results in a dataframe and then show the first 10 records
    client = bigquery.Client()
    query = "SELECT sentiment, COUNT(*) AS count FROM `gemini_demo.cleaned_data_view` WHERE sentiment IN ('positive', 'negative') GROUP BY sentiment;"
    query_job = client.query(query)
    results = query_job.result().to_dataframe()
    results.head(10)
    ```
    
2. Run this cell.
    
    The result of running the cell is a table output with total counts of positive and negative reviews.
    
3. Create a new cell to define variables for the report.
    
    ```apache
    # Define variable for the report.
    sentiment = results["sentiment"].tolist()
    count = results["count"].tolist()
    ```
    
4. Run this cell. There is no output.
    
5. Create a new cell to build the report.
    
    ```apache
    # Task 6.7 - Build the report.
    plt.bar(sentiment, count, color='skyblue')
    plt.xlabel("Sentiment")
    plt.ylabel("Total Count")
    plt.title("Bar Chart from BigQuery Data")
    plt.show()
    ```
    
6. Run this cell.
    
    The result is a bar chart with the counts of positive and negative reviews.
    
7. Alternatively you can build a simple, color-coded report of the counts of negative and positive sentiment using the code below:
    
    ```apache
    # Create an HTML table for the counts of negative and positive sentiment and color codes the results.
    html_counts = f"""
    <table style="border-collapse:collapse;width:25%;padding:10px;">
    
    <tbody><tr style="background-color:#f2f2f2;">
    <th style="padding:10px;text-align:left;">Negative</th>
    <th style="padding:10px;text-align:left;">Positive</th>
    </tr>
    
    
    <tr style="padding:10px;">
    <td style="padding:10px;color:red;">{count[0]}</td>
    <td style="padding:10px;color:green;">{count[1]}</td>
    </tr>
    
    </tbody></table>
    """
    
    # Display the HTML tables
    display(HTML(html_counts))
    ```
    

Click **Check my progress** to verify the objective.

Prompt Gemini to analyze customer reviews for keywords and sentiment

Check my progress

## **Task 7. Respond to customer reviews**

Data beans wants to experiment with customer reviews using images and audio recordings. In this section of this notebook you will use CloudStorage, BigQuery, Gemini Flash, and Python to perform sentiment analysis on customer reviews provided to data beans as images and audio files. And from the resulting analysis you will generate customer service responses to be sent back to the customer thanking them for their review and actions the cofee house can take based upon the review.

You will do this both at scale and then later with one image and audio file, so that you may learn how to create a Proof of Concept application for customer service representatives. This enables a "human-in-the-loop" strategy for the customer feedback process, where customer service representatives can take action with both the customer and individual coffee houses.

### Processing audio files at scale with JSON responses

1. Create a new cell to conduct sentiment analysis on audio files and respond to the customer.
    
    ```apache
    # Conduct sentiment analysis on audio files and respond to the customer.
    vertexai.init(project="qwiklabs-gcp-00-c822be412495", location="us-central1")
    
    model = GenerativeModel(model_name="gemini-1.5-flash")
    
    prompt = """
    Please provide a transcript for the audio.
    Then provide a summary for the audio.
    Then identify the keywords in the transcript.
    Be concise and short.
    Do not make up any information that is not part of the audio and do not be verbose.
    Then determine the sentiment of the audio: positive, neutral or negative.
    
    Also, you are a customr service representative.
    How would you respond to this customer review?
    From the customer reviews provide actions that the location can take to improve. The response and the actions should be simple, and to the point. Do not include any extraneous characters in your response.
    Answer in JSON format with five keys: transcript, summary, keywords, sentiment, response and actions. Transcript should be a string, summary should be a sting, keywords should be a list, sentiment should be a string, customer response should be a string and actions should be string.
    """
    
    bucket_name = "qwiklabs-gcp-00-c822be412495-bucket"
    folder_name = 'gsp1249/audio'  # Include the trailing '/'
    
    def list_mp3_files(bucket_name, folder_name):
       storage_client = storage.Client()
       bucket = storage_client.bucket(bucket_name)
       print('Accessing ', bucket, ' with ', storage_client)
    
       blobs = bucket.list_blobs(prefix=folder_name)
    
       mp3_files = []
       for blob in blobs:
          if blob.name.endswith('.mp3'):
                mp3_files.append(blob.name)
       return mp3_files
    
    file_names = list_mp3_files(bucket_name, folder_name)
    if file_names:
       print("MP3 files found:")
       print(file_names)
       for file_name in file_names:
          audio_file_uri = f"gs://{bucket_name}/{file_name}"
          print('Processing file at ', audio_file_uri)
          audio_file = Part.from_uri(audio_file_uri, mime_type="audio/mpeg")
          contents = [audio_file, prompt]
          response = model.generate_content(contents)
          print(response.text)
    else:
       print("No MP3 files found in the specified folder.")
    ```
    
    A few key points about this cell:
    
    * The first line initializes Vertex AI with your project ID and region, you will need to populate these values.
        
    * The next line creates a model in BigQuery named model, based upon the Gemini Flash model.
        
    * You then define a prompt to be used by the Gemini Flash model. The prompt effectively converts the audio file to text, then analyzes the sentiment of the text, and once the analysis is complete, creates a customer response for each file.
        
    * You need to set your bucket as the bucket\_name string variable. Note: folder\_name is used as well for gsp1249/audio subfolder. Don't change this.
        
    * A function called list\_mp3\_files is created identify all mp3 files within the bucket. Then these files are processed by the Gemini Flash model within the if statement.
        
2. Run this cell.
    
    The result is all 5 of the audio files are analysed and the output of the analysis is provided as a JSON response. The JSON response could be parsed accordingly and routed to the appropriate applications to respond to the customer or the location with actions for improvement.
    

### Creating an application for customer service representatives

In this section of the lab, you will learn how to create a customer service application based upon a negative review analysis. You will:

* Use the same prompt in the previous cell to analyze a single negative review.
    
* Generate the transcript from the negative review audio file, create the JSON object from the model output with the appropriate formatting, and save specific parts of the JSON object as Python variables, so that you can use these with HTML as part of your application.
    
* Generate the HTML table, load the image the customer uploaded for the review and load the audio file in the player.
    
* Display the HTML table, with the image and the player for the audio file.
    

1. Create a new cell, and enter the following code, so that you can Generate the transcript for the negative review audio file, create the JSON object, and associated variables.
    
    ```apache
    # Generate the transcript for the negative review audio file, create the JSON object, and associated variables
    
    audio_file_uri = f"gs://{bucket_name}/{folder_name}/data-beans_review_7061.mp3"
    print(audio_file_uri)
    
    audio_file = Part.from_uri(audio_file_uri, mime_type="audio/mpeg")
    
    contents = [audio_file, prompt]
    
    response = model.generate_content(contents)
    print('Generating Transcript...')
    #print(response.text)
    
    results = response.text
    # print("your results are", results, type(results))
    print('Transcript created...')
    
    print('Transcript ready for analysis...')
    
    json_data = results.replace('```json', '')
    json_data = json_data.replace('```', '')
    jason_data = '"""' + results + '"""'
    
    # print(json_data, type(json_data))
    
    data = json.loads(json_data)
    
    # print(data)
    
    transcript = data["transcript"]
    summary = data["summary"]
    sentiment = data["sentiment"]
    keywords = data["keywords"]
    response = data["response"]
    actions = data["actions"]
    ```
    
    A few key points about this cell:
    
    * The code in the cell will select a specific audio file from Cloud Storage (data-beans\_review\_7061.mp3).
        
    * It then sends the file to prompt in the previous cell labeled Task 7.1 to be processed by the Gemini Flash model.
        
    * The model's response is extracted to JSON format.
        
    * Then the JSON data is parsed, and stores Python variables for the transcript, summary, sentiment, keywords, customer response, and actions.
        
2. Run the cell.
    
    The output is minimal, just the uri of the audio file processed and processing messages.
    
3. Create an HTML based table from the selected values and load the audio file containing the negative review into the player.
    
    ```apache
    # Create an HTML table (including the image) from the selected values.
    
    html_string = f"""
    <table style="border-collapse:collapse;width:100%;padding:10px;">
    <tbody><tr style="background-color:#f2f2f2;">
    <th style="padding:10px;width:50%;text-align:left;">customer_id: 7061 - @coffee_lover789</th>
    <th style="padding:10px;width:50%;text-align:left;">&nbsp;</th>
    </tr>
    </tbody></table>
    <table>
    
    <tbody><tr style="padding:10px;">
    <td style="padding:10px;">{transcript}</td>
    <td style="padding:10px;color:red;">{sentiment} feedback</td>
    </tr>
    <tr>
    </tr>
    <tr style="padding:10px;">
    <td style="padding:10px;">&nbsp;</td>
    <td style="padding:10px;">
    <table>
    
    <tbody><tr><td>{keywords[0]}</td></tr>
    <tr><td>{keywords[1]}</td></tr>
    <tr><td>{keywords[2]}</td></tr>
    <tr><td>{keywords[3]}</td></tr>
    
    </tbody></table>
    </td>
    </tr>
    <tr style="padding:10px;">
    <td style="padding:10px;">
    <strong>Customer summary:</strong>{summary}</td>
    </tr>
    <tr style="padding:10px;">
    <td style="padding:10px;">
    <strong>Recommended actions:</strong>{actions}</td>
    </tr>
    <tr style="padding:10px;">
    <td style="padding:10px;background-color:#EAE0CF;">
    <strong>Suggested Response:</strong>{response}</td>
    </tr>
    
    </tbody></table>
    
    """
    print('The table has been created.')
    ```
    
    A few key points about this cell:
    
    * The code in the cell will construct an HTML table string.
        
    * Then insert the values for the transcript, sentiment, keywords, image, summary, actions, and response into the table cells.
        
    * The code will also apply styling to the table elements.
        
    * When the cell is run, the output of the cell will indicate when the table has been created.
        
4. Look for the `<td style="padding:10px;">` tag with the `{summary}` output included. Add new line of code before this tag.
    
5. Paste `<td rowspan="3" style="padding: 10px;"><img src="<authenticated url here>" alt="Customer Image" style="max-width: 300px;"></td>` into this new line of code.
    
6. Find the Authenticated URL for the image\_7061.png file. Go to Cloud Storage, select the only bucket you have there, the images folder, and then click on the image.
    
7. On the resulting page, copy the Authenticated URL for the image.
    
8. Return to the Python notebook in BigQuery. Replace the `<authenticated url here>` with the actual Authenticated URL in the code you just pasted.
    
9. Run the cell.
    
    Again the output is minimal. Just some processing messages, indicating each step completes.
    
10. Create a new cell to download the audio file and load it into the player, using the code below:
    
    ```apache
    # Download the audio file from Google Cloud Storage and load into the player
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(f"{folder_name}/data-beans_review_7061.mp3")
    audio_bytes = io.BytesIO(blob.download_as_bytes())
    
    # Assuming a sample rate of 44100 Hz (common for MP3 files)
    sample_rate = 44100
    
    print('The audio file is loaded in the player.')
    ```
    
    A few key points about this cell:
    
    * The code in the cell accesses the Cloud Storage bucket and retrieves the specific audio file (data-beans\_review\_7061.mp3).
        
    * Then it downloads the file as a byte stream and determines the sample rate of the file, so that it may be played in a player directly in the notebook.
        
    * When the cell is run, the output of the cell is a message stating the audio file is loaded into the player and ready for playback.
        
11. Run the cell.
    
12. Create a new cell and enter the code below:
    
    ```apache
    # Task 7.5 - Build the mockup as output to the cell.
    print('Analysis complete. Review the results below.')
    display(HTML(html_string))
    display(Audio(audio_bytes.read(), rate=sample_rate, autoplay=True))
    ```
    
    Run the cell.
    
    This cell is where the magic happens. The display method is used to display the HTML and the Audio file loaded into the player. Review the output of the cell. It should look identical to the image below:
    
    ![Image shows the working application.](https://cdn.qwiklabs.com/SVd8nWpPkYOPaCd3ivz4UJ3SFn1mpzW184XC%2Fj1sITY%3D align="left")
    

Click **Check my progress** to verify the objective.

Respond to customer reviews

Check my progress

---

## Solution of Lab

%[https://www.youtube.com/watch?v=gjSoC-9FWMo] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Analyze%20Customer%20Reviews%20with%20Gemini%20Using%20Python%20Notebooks/gsp1249.sh
sudo chmod +x *.sh
./*.sh
```

* **Download required** [**file**](https://drive.google.com/uc?export=download&id=1QM02LFTLjKeM_Y8aMVSONDP1VJIlpl7u)