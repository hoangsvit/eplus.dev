---
title: "Classify Text into Categories with the Natural Language API - GSP063"
seoTitle: "Classify Text into Categories with the Natural Language API - GSP063"
seoDescription: "The Cloud Natural Language API lets you extract entities from text, perform sentiment and syntactic analysis, and classify text into categories. In this lab"
datePublished: Sat Aug 17 2024 12:02:51 GMT+0000 (Coordinated Universal Time)
cuid: clzy39qy6000209l28cgk1tfu
slug: classify-text-into-categories-with-the-natural-language-api-gsp063
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723895397753/380897d2-bafa-4f79-8fb6-c58cb6e3de5f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723896158958/355b2b04-b256-456b-9b12-dbed38153b68.png
tags: classify-text-into-categories-with-the-natural-language-api-gsp063, gsp063

---

## **Overview**

The Cloud Natural Language API lets you extract entities from text, perform sentiment and syntactic analysis, and classify text into categories. In this lab, the focus is on text classification. Using a database of 700+ categories, this API feature makes it easy to classify a large dataset of text.

## **Objectives**

In this lab, you will learn how to:

* Create a Natural Language API request and calling the API with curl
    
* Use the Natural Language API's text classification feature
    
* Use text classification to understand a dataset of news articles
    

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

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab Details** panel with the following:
    
    * The **Open Google Cloud console** button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the **Sign in** page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-02-13fe120e1618@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    tbIDQfblVZQY
    ```
    
    You can also find the **Password** in the **Lab Details** panel.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To view a menu with a list of Google Cloud products and services, click the **Navigation menu** at the top-left.

![Navigation menu icon](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-d6855b30d4d3`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-d6855b30d4d3
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

3. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-02-13fe120e1618@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

4. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-01-d6855b30d4d3
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Enable the Cloud Natural Language API**

1. Expand the **Navigation menu** () at the top left of the screen.
    
2. Select **APIs & Services** &gt; **Enabled APIs and Services**.
    
3. Click **Enable APIs and Services**.
    
4. Then, search for `language` in the search box.
    
5. Click **Cloud Natural Language API**:
    

If the API is not enabled, you'll see the **Enable** button.

6. Click **Enable** to enable the Cloud Natural Language API.
    

When the API is enabled, Google Cloud displays API information as follows:

![API details, which include two buttons: 'Manage' and 'Try this API', as well as the API enabled checkmark.](https://cdn.qwiklabs.com/FQ3J%2FqnmXCNrmY7IP3SMGX9uJYi2CBHeUH%2BmSS4g5GU%3D align="left")

## **Task 2. Create an API key**

Since you're using `curl` to send a request to the Natural Language API, you need to generate an API key to pass in the request URL.

1. To create an API key, in your Console, click **Navigation menu** &gt; **APIs & Services** &gt; **Credentials**.
    
2. Then click **Create Credentials**.
    
3. In the drop down menu, select **API key**.
    
4. Next, copy the key you just generated, then click **Close**.
    

Click **Check my progress** to verify the objective.

Create an API Key

**Check my progress**

Now that you have an API key, you save it as an environment variable to avoid having to insert the value of your API key in each request.

In order to perform next steps please connect to the instance provisioned for you via ssh.

1. Open the **Navigation menu** and select **Compute Engine** &gt; **VM Instances**. You should see a provisioned `linux-instance`.
    
2. Click on the **SSH** button. You are brought to an interactive shell.
    
3. In the command line, enter in the following, replacing `<YOUR_API_KEY>` with the key you just copied:
    

```apache
export API_KEY=<YOUR_API_KEY>
```

## **Task 3. Classify a news article**

Using the Natural Language API's classifyText method, you can sort text data into categories with a single API call. This method returns a list of content categories that apply to a text document.

These categories range in specificity, from broad categories like `/Computers & Electronics` to highly specific categories such as `/Computers & Electronics/Programming/Java (Programming Language)`. A full list of 700+ possible categories can be found in the [Content Categories](https://cloud.google.com/natural-language/docs/categories) page.

You'll start by classifying a single article, and then see how you can use this method to make sense of a large news corpus.

1. To start, take this headline and description from a New York Times article in the food section:
    

*A Smoky Lobster Salad With a Tapa Twist. This spin on the Spanish pulpo a la gallega skips the octopus, but keeps the sea salt, olive oil, pimentón and boiled potatoes.*

2. Create a file named `request.json` and add the code found below. You can create the file using one of your preferred command line editors (nano, vim, emacs).
    

```json
{
  "document":{
    "type":"PLAIN_TEXT",
    "content":"A Smoky Lobster Salad With a Tapa Twist. This spin on the Spanish pulpo a la gallega skips the octopus, but keeps the sea salt, olive oil, pimentón and boiled potatoes."
  }
}
```

Create a request to classify a news article

**Check my progress**

3. Now you can send this text to the Natural Language API's `classifyText` method with the following `curl` command:
    

```apache
curl "https://language.googleapis.com/v1/documents:classifyText?key=${API_KEY}" \
  -s -X POST -H "Content-Type: application/json" --data-binary @request.json
```

Look at the response:

```apache
{ 
  categories:
  [
    {
      name: '/Food & Drink/Cooking & Recipes',
       confidence: 0.85
    },
    {
       name: '/Food & Drink/Food/Meat & Seafood',
       confidence: 0.63
     }
  ]
}
```

You created a Speech API request then called the Speech API.

4. Run the following command to save the response in a `result.json` file:
    

```apache
curl "https://language.googleapis.com/v1/documents:classifyText?key=${API_KEY}" \
  -s -X POST -H "Content-Type: application/json" --data-binary @request.json > result.json
```

Check the Entity Analysis response

**Check my progress**

The API returned 2 categories for this text:

* `/Food & Drink/Cooking & Recipes`
    
* `/Food & Drink/Food/Meat & Seafood`
    

The text doesn't explicitly mention that this is a recipe or even that it includes seafood, but the API is able to categorize it. Classifying a single article is cool, but to really see the power of this feature, classify lots of text data.

## **Task 4. Classify a large text dataset**

To see how the `classifyText` method can help you understand a dataset with lots of text, use this [public dataset](http://mlg.ucd.ie/datasets/bbc.html) of BBC news articles. The dataset consists of 2,225 articles in five topic areas (business, entertainment, politics, sports, tech) from 2004 - 2005. A subset of these articles are in a public Cloud Storage bucket. Each of the articles is in a .txt file.

To examine the data and send it to the Natural Language API, you'll write a Python script to read each text file from Cloud Storage, send it to the `classifyText` endpoint, and store the results in a BigQuery table. BigQuery is Google Cloud's big data warehouse tool - it lets you easily store and analyze large data sets.

* To see the type of text you'll be working with, run the following command to view one article (`gsutil` provides a command line interface for Cloud Storage):
    

```apache
gsutil cat gs://spls/gsp063/bbc_dataset/entertainment/001.txt
```

Next you'll create a BigQuery table for your data.

## **Task 5. Create a BigQuery table for categorized text data**

Before sending the text to the Natural Language API, you need a place to store the text and category for each article.

1. Navigate to **Navigation menu** &gt; **BigQuery** in the Console.
    
2. Click **Done**.
    
3. To create a dataset, click on the **View actions** icon next to your Project ID and select **Create dataset**:
    

![The option 'Create dataset' highlighted within the View actions menu.](https://cdn.qwiklabs.com/3vftsmv9NfSUfE7xYhnqXycOWhLD2JSSNpqLlt3mBVE%3D align="left")

4. Name the dataset `news_classification_dataset`, then click **Create dataset**.
    
5. To create a table, click on the **View actions** icon next to the `news_classification_dataset` and select **Create Table**.
    
6. Use the following settings for the new table:
    

* Create table from: **Empty table**
    
* Name your table: **article\_data**
    

7. Under Schema, click **Add Field** and add the following 3 fields:
    

| **Field Name** | **Type** | **Mode** |
| --- | --- | --- |
| `article_text` | STRING | NULLABLE |
| `category` | STRING | NULLABLE |
| `confidence` | FLOAT | NULLABLE |

![A list of fields within the Schema section of the 'Create table' page, including article-text, category, and confidence.](https://cdn.qwiklabs.com/HQzXyjN0enWHFzlZwdKHUr397LLYhxBwg%2F1cBJ4Nqlc%3D align="left")

8. Click **Create Table**.
    

The table is empty right now. In the next step you'll read the articles from Cloud Storage, send them to the Natural Language API for classification, and store the result in BigQuery.

Click **Check my progress** to verify the objective.

Create a new Dataset and table for categorized text data

**Check my progress**

## **Task 6. Classify news data and store the result in BigQuery**

In order to perform next steps please connect to the **Cloud Shell**. If prompted click **continue**.

Before writing a script to send the news data to the Natural Language API, you need to create a service account. This will be used to authenticate to the Natural Language API and BigQuery from a Python script.

1. Export your Project ID as an environment variable:
    

```apache
export PROJECT=qwiklabs-gcp-01-d6855b30d4d3
```

2. Run the following commands to create a service account:
    

```apache
gcloud iam service-accounts create my-account --display-name my-account
gcloud projects add-iam-policy-binding $PROJECT --member=serviceAccount:my-account@$PROJECT.iam.gserviceaccount.com --role=roles/bigquery.admin
gcloud projects add-iam-policy-binding $PROJECT --member=serviceAccount:my-account@$PROJECT.iam.gserviceaccount.com --role=roles/serviceusage.serviceUsageConsumer
gcloud iam service-accounts keys create key.json --iam-account=my-account@$PROJECT.iam.gserviceaccount.com
export GOOGLE_APPLICATION_CREDENTIALS=key.json
```

Now you're ready to send the text data to the Natural Language API!

3. Write a Python script using the Python module for Google Cloud.
    

You can accomplish the same thing from any language, there are many different cloud client libraries.

4. Create a file called `classify-text.py` and copy the following code into it. You can either create the file using one of your preferred command line editors (nano, vim, emacs).
    

```python
from google.cloud import storage, language, bigquery

# Set up your GCS, NL, and BigQuery clients

storage_client = storage.Client()
nl_client = language.LanguageServiceClient()
bq_client = bigquery.Client(project='qwiklabs-gcp-01-d6855b30d4d3')

dataset_ref = bq_client.dataset('news_classification_dataset')
dataset = bigquery.Dataset(dataset_ref)
table_ref = dataset.table('article_data')
table = bq_client.get_table(table_ref)

# Send article text to the NL API's classifyText method

def classify_text(article):
    response = nl_client.classify_text(
        document=language.Document(
            content=article,
            type=language.Document.Type.PLAIN_TEXT
        )
    )
    return response

rows_for_bq = []
files = storage_client.bucket('qwiklabs-test-bucket-gsp063').list_blobs()
print("Got article files from GCS, sending them to the NL API (this will take ~2 minutes)...")

# Send files to the NL API and save the result to send to BigQuery

for file in files:
    if file.name.endswith('txt'):
        article_text = file.download_as_bytes().decode('utf-8')  # Decode bytes to string
        nl_response = classify_text(article_text)
        if len(nl_response.categories) > 0:
            rows_for_bq.append((article_text, nl_response.categories[0].name, nl_response.categories[0].confidence))

print("Writing NL API article data to BigQuery...")

# Write article text + category data to BQ

if rows_for_bq:
    errors = bq_client.insert_rows(table, rows_for_bq)
    if errors:
        print("Encountered errors while writing to BigQuery:", errors)
else:
    print("No articles found in the specified bucket.")
```

Now you're ready to start classifying articles and importing them to BigQuery.

5. Run the following script:
    

```apache
python3 classify-text.py
```

The script takes about two minutes to complete, so while it's running read about what's happening.

You're using the Google Cloud [Python client](https://googlecloudplatform.github.io/google-cloud-python/) library to access Cloud Storage, the Natural Language API, and BigQuery. First, a client is created for each service, then references are created to the BigQuery table. `files` is a reference to each of the BBC dataset files in the public bucket. The files are looked at, the articles are downloaded as strings, then each one is sent to the Natural Language API in the `classify_text` function. For all articles where the Natural Language API returns a category, the article and its category data are saved to a `rows_for_bq` list. When classifying each article is done, the data is inserted into BigQuery using `insert_rows()`.

**Note:** The Natural Language API can return more than one category for a document, but for this lab you're only storing the first category returned to keep things simple.

When the script has finished running, it's time to verify that the article data was saved to BigQuery.

6. In BigQuery, navigate to the `article_data` table in the Explorer tab and click **Query &gt; In new tab** to query the table:
    

![The option 'In new tab' highlighted within the Query drop-down menu.](https://cdn.qwiklabs.com/gyVfTv0kKZm%2B9DNHJktlmeQlSBFHGGLGdtabj%2BlV344%3D align="left")

7. Edit the results in the **Unsaved query** box, adding an asterisk between SELECT and FROM:
    

```sql
SELECT * FROM `qwiklabs-gcp-01-d6855b30d4d3.news_classification_dataset.article_data`
```

8. Now click **Run**.
    

You'll see your data when the query completes.

9. Scroll to the right to see the category column.
    

The category column has the name of the first category the Natural Language API returned for the article, and *confidence* is a value between 0 and 1 indicating how confident the API is that it categorized the article correctly.

You'll learn how to perform more complex queries on the data in the next step.

## **Task 7. Analyze categorized news data in BigQuery**

First, see which categories were most common in the dataset.

1. In the BigQuery console, click **\+ SQL query**.
    
2. Enter the following query:
    

```sql
SELECT
  category,
  COUNT(*) c
FROM
  `qwiklabs-gcp-01-d6855b30d4d3.news_classification_dataset.article_data`
GROUP BY
  category
ORDER BY
  c DESC
```

3. Now click **Run**.
    

You should see something like this in the query results:

![The query results, wherein several categories are listed, including /News/Politics and /Business & Industrial.](https://cdn.qwiklabs.com/lIK8cDA58MuoOq9o4m0UAbIEy45k9RtjxU19xOt8Dis%3D align="left")

If you wanted to find the article returned for a more obscure category like `/Arts & Entertainment/Music & Audio/Classical Music`, you could write the following query:

```sql
SELECT * FROM `qwiklabs-gcp-01-d6855b30d4d3.news_classification_dataset.article_data`
WHERE category = "/Arts & Entertainment/Music & Audio/Classical Music"
```

Or, you could get only the articles where the Natural language API returned a confidence score greater than 90%:

```sql
SELECT
  article_text,
  category
FROM `qwiklabs-gcp-01-d6855b30d4d3.news_classification_dataset.article_data`
WHERE cast(confidence as float64) > 0.9
```

To perform more queries on your data, explore the [BigQuery documentation](https://cloud.google.com/bigquery/docs/reference/standard-sql/functions-and-operators). BigQuery also integrates with a number of visualization tools. To create visualizations of your categorized news data, check out the [Looker Studio](https://cloud.google.com/bigquery/docs/visualize-looker-studio) for BigQuery.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=e1GHYCdsd-Y] 

```apache
export KEY=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723895817164/7237c551-4733-46b3-b9f8-baa0129ba08a.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Classify%20Text%20into%20Categories%20with%20the%20Natural%20Language%20API/quicklabgsp063.sh
sudo chmod +x quicklabgsp063.sh
./quicklabgsp063.sh
```