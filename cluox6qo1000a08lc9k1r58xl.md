---
title: "Cloud Natural Language API: Qwik Start - GSP097"
seoTitle: "Cloud Natural Language API: Qwik Start - GSP097"
seoDescription: "Natural language is the language that humans use to communicate with each other. Natural language processing (NLP) is a field of computer science that is co"
datePublished: Sun Apr 07 2024 02:44:06 GMT+0000 (Coordinated Universal Time)
cuid: cluox6qo1000a08lc9k1r58xl
slug: cloud-natural-language-api-qwik-start-gsp097
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1712457787670/099309f0-018f-4efa-bc9d-79ed618d20c0.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755588682357/86437544-9444-40ec-be70-f68d610f4ddf.png
tags: 2025-cloud-natural-language-api-qwik-start-gsp097, gsp097, cloud-natural-language-api-qwik-start-gsp097, cloud-natural-language-api-qwik-start

---

## Overview

*Natural language* is the language that humans use to communicate with each other. Natural language processing (NLP) is a field of computer science that is concerned with the interaction between computers and human language. NLP research has the goal of enabling computers to understand and process human language in a way that is similar humans.

The Cloud Natural Language API is a cloud-based service that provides natural language processing capabilities. It can be used to analyze text, identify entities, extract information, and answer questions.

### Cloud Natural Language API features

**Entity Recognition:** Identify entities in text, such as people, places, and things.

**Sentiment Analysis:** Analyze the sentiment of text, such as whether it is positive, negative, or neutral.

**Information Extraction:** Extract information from text, such as dates, times, and price.

**Question Answering:** Answer questions about text.

**Integrated REST API:** Access via REST API. Text can be uploaded in the request or integrated with [Cloud Storage.](https://cloud.google.com/storage/)

### What you'll do

In this lab, you learn how to:

* Create an API key
    
* Use the Cloud Natural Language API to extract "entities" (e.g. people, places, and events) from a snippet of text
    

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
    student-01-23cc5e65fb0d@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    7hFTjdZQeCru
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-0e599ad94663`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-0e599ad94663
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
ACCOUNT: student-01-23cc5e65fb0d@qwiklabs.net

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
project = qwiklabs-gcp-04-0e599ad94663
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Create an API key

1. First, you will set an environment variable with your PROJECT\_ID which you will use throughout this lab:
    

```apache
export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value core/project)
```

2. Next, create a new service account to access the Natural Language API:
    

```apache
gcloud iam service-accounts create my-natlang-sa \
  --display-name "my natural language service account"
```

3. Then, create credentials to log in as your new service account. Create these credentials and save it as a JSON file "~/key.json" by using the following command:
    

```apache
gcloud iam service-accounts keys create ~/key.json \
  --iam-account my-natlang-sa@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com
```

4. Finally, set the GOOGLE\_APPLICATION\_CREDENTIALS environment variable. The environment variable should be set to the full path of the credentials JSON file you created, which you can see in the output from the previous command:
    

```apache
export GOOGLE_APPLICATION_CREDENTIALS="/home/USER/key.json"
```

Create an API Key

## Task 2. Make an entity analysis request

In order to perform next steps please connect to the instance provisioned for you via ssh. Open the navigation menu and select **Compute Engine**. You should see the following provisioned linux instance:

![VM Instances page](https://cdn.qwiklabs.com/XQiYB4E8wduqZuLRkwzV%2FZsKQZy2XdbgDe%2BdBk1Wjjs%3D align="left")

1. Click on the **SSH** button. You will be brought to an interactive shell. **Remain in this SSH session for the rest of the lab.**
    

Now you'll try out the Natural Language API's entity analysis with the following sentence:

*Michelangelo Caravaggio, Italian painter, is known for 'The Calling of Saint Matthew'*

2. Run the following `gcloud` command:
    

```apache
gcloud ml language analyze-entities --content="Michelangelo Caravaggio, Italian painter, is known for 'The Calling of Saint Matthew'." > result.json
```

Copied!

Make an Entity Analysis Request

3. Run the below command to preview the output of result.json file:
    

```apache
cat result.json
```

Copied!

You should see a response similar to the following in the result.json file:

```json
{
  "entities": [
    {
      "name": "Michelangelo Caravaggio",
      "type": "PERSON",
      "metadata": {
        "wikipedia_url": "http://en.wikipedia.org/wiki/Caravaggio",
        "mid": "/m/020bg"
      },
      "salience": 0.83047235,
      "mentions": [
        {
          "text": {
            "content": "Michelangelo Caravaggio",
            "beginOffset": 0
          },
          "type": "PROPER"
        },
        {
          "text": {
            "content": "painter",
            "beginOffset": 33
          },
          "type": "COMMON"
        }
      ]
    },
    {
      "name": "Italian",
      "type": "LOCATION",
      "metadata": {
        "mid": "/m/03rjj",
        "wikipedia_url": "http://en.wikipedia.org/wiki/Italy"
      },
      "salience": 0.13870546,
      "mentions": [
        {
          "text": {
            "content": "Italian",
            "beginOffset": 25
          },
          "type": "PROPER"
        }
      ]
    },
    {
      "name": "The Calling of Saint Matthew",
      "type": "EVENT",
      "metadata": {
        "mid": "/m/085_p7",
        "wikipedia_url": "http://en.wikipedia.org/wiki/The_Calling_of_St_Matthew_(Caravaggio)"
      },
      "salience": 0.030822212,
      "mentions": [
        {
          "text": {
            "content": "The Calling of Saint Matthew",
            "beginOffset": 69
          },
          "type": "PROPER"
        }
      ]
    }
  ],
  "language": "en"
}
```

Read through your results. For each "entity" in the response, you'll see:

* The entity `name` and `type`, a person, location, event, etc.
    
* `metadata`, an associated Wikipedia URL if there is one.
    
* `salience`, and the indices of where this entity appeared in the text. Salience is a number in the \[0,1\] range that refers to the centrality of the entity to the text as a whole.
    
* `mentions`, which is the same entity mentioned in different ways.
    

You've sent your first request to the Cloud Natural Language API.

---

Link: [https://www.cloudskillsboost.google/course\_templates/667/labs/461608](https://www.cloudskillsboost.google/course_templates/667/labs/461608)

---

## Solution of Lab

### **Activate Cloud Shell**

1. Click **Activate Cloud Shell** in the Console header.
    
2. Authorize.
    
3. (Optional) Verify your active account and project:
    
    ```apache
    gcloud auth list
    gcloud config list project
    ```
    

---

### **Task 1: Create a service account and credentials**

```apache
# Get PROJECT_ID
export GOOGLE_CLOUD_PROJECT=$(gcloud config get-value core/project)

# Create service account
gcloud iam service-accounts create my-natlang-sa \
  --display-name "my natural language service account"

# Create a key file (saved to ~/key.json)
gcloud iam service-accounts keys create "$HOME/key.json" \
  --iam-account "my-natlang-sa@${GOOGLE_CLOUD_PROJECT}.iam.gserviceaccount.com"

# Point GOOGLE_APPLICATION_CREDENTIALS to the key file
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/key.json"
```

### **Task 2: Make an Entity Analysis request**

1. In the Console, go to **Compute Engine** → **VM instances** → click **SSH** on the provided VM.
    
2. Run the request and save output to `result.json`:
    
    ```apache
    gcloud ml language analyze-entities \
      --content="Michelangelo Caravaggio, Italian painter, is known for 'The Calling of Saint Matthew'." \
      > result.json
    ```
    
3. View the result:
    
    ```apache
    cat result.json
    ```
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755588621072/5eb19ebe-d6c5-43f6-8faa-c0eb54b3dfa9.png align="center")