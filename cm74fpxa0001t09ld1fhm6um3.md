---
title: "Cloud Data Loss Prevention API: Qwik Start - GSP107"
seoTitle: "Cloud Data Loss Prevention API: Qwik Start - GSP107"
seoDescription: "Now part of Sensitive Data Protection, the Cloud Data Loss Prevention (DLP) API provides programmatic access to a powerful detection engine for personally i"
datePublished: Fri Feb 14 2025 07:15:54 GMT+0000 (Coordinated Universal Time)
cuid: cm74fpxa0001t09ld1fhm6um3
slug: cloud-data-loss-prevention-api-qwik-start-gsp107
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757571039839/d443316c-48be-41ae-8421-f756a245bc59.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757571052521/2cf2a077-366d-4aee-8235-50ee982c9e17.png
tags: cloud-data-loss-prevention-api-qwik-start-gsp107, cloud-data-loss-prevention-api-qwik-start, gsp107

---

## **Overview**

Now part of [Sensitive Data Protection](https://cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview), the Cloud Data Loss Prevention (DLP) API provides programmatic access to a powerful detection engine for personally identifiable information (PII) and other privacy-sensitive data in unstructured data streams.

The DLP API provides fast, scalable classification and optional redaction for sensitive data elements like credit card numbers, names, social security numbers, passport numbers, and phone numbers. The API supports text and images – just send data to the API or specify data stored on your Cloud Storage, BigQuery, and Cloud Datastore instances.

In this lab, you set up a JSON file to analyze, send it to the DLP API, to inspect a string of data for sensitive information, then redact any sensitive information that was found.

### What you'll learn

In this lab, you use the DLP API to do the following:

* Inspect a string for sensitive information
    
* Redact sensitive data from text content
    

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
    student-01-5025bdf2a6df@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    xUOApWRG5YCQ
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-36d4057bb33c`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-36d4057bb33c
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
ACCOUNT: student-01-5025bdf2a6df@qwiklabs.net

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
project = qwiklabs-gcp-00-36d4057bb33c
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Set an environmental variable for your project ID

* In Cloud Shell, run the following command to set an environment variable for your project ID:
    

```apache
export PROJECT_ID=$DEVSHELL_PROJECT_ID
```

## **Task 1. Inspect a string for sensitive information**

This section shows you how to ask the service to scan sample text using the [projects.content.inspect](https://cloud.google.com/dlp/docs/reference/rest/v2beta2/projects.content/inspect) REST method. The JSON file you create contains an [InspectConfig](https://cloud.google.com/dlp/docs/reference/rest/v2beta2/InspectConfig) and a [ContentItem](https://cloud.google.com/dlp/docs/reference/rest/v2beta2/ContentItem) object.

1. Using your preferred editor (`nano`, `vim`, etc.) or Cloud Shell, create a JSON request file with the following text, and save it as `inspect-request.json`:
    

```json
{
  "item":{
    "value":"My phone number is (206) 555-0123."
  },
  "inspectConfig":{
    "infoTypes":[
      {
        "name":"PHONE_NUMBER"
      },
      {
        "name":"US_TOLLFREE_PHONE_NUMBER"
      }
    ],
    "minLikelihood":"POSSIBLE",
    "limits":{
      "maxFindingsPerItem":0
    },
    "includeQuote":true
  }
}
```

2. Obtain an authorization token using your account:
    

```apache
gcloud auth print-access-token
```

A huge string is returned. You need this token for the next step.

If you receive an error that no service account is being used, wait a few minutes and run the command again.

3. Use `curl` to make a `content:inspect` request, replacing `ACCESS_TOKEN` with the string that was returned in the previous step:
    

```apache
curl -s \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  https://dlp.googleapis.com/v2/projects/$PROJECT_ID/content:inspect \
  -d @inspect-request.json -o inspect-output.txt
```

**Note: Here's what's going on**

To pass a filename to `curl` you use the `-d` option (for "data") and precede the filename with an `@` sign. This file should be in the same directory in which you execute the `curl` command.

It saves the `curl` response in `inspect-output.txt` file. Check the output using below command:

```apache
cat inspect-output.txt
```

You should see a response similar to the following:

```json
{
  "result": {
    "findings": [
      {
        "quote": "(206) 555-0123",
        "infoType": {
          "name": "PHONE_NUMBER"
        },
        "likelihood": "LIKELY",
        "location": {
          "byteRange": {
            "start": "19",
            "end": "33"
          },
          "codepointRange": {
            "start": "19",
            "end": "33"
          }
        },
        "createTime": "2018-07-03T02:20:26.043Z"
      }
    ]
  }
}
```

### Upload output to Cloud Storage

Run the following command to upload the curl response on Cloud Storage for activity tracking validation:

```apache
gsutil cp inspect-output.txt gs://qwiklabs-gcp-00-36d4057bb33c-bucket
```

Inspect a string for sensitive information

Check my progress

## **Task 2. Redacting sensitive data from text content**

The DLP API can automatically redact sensitive data from text files instead of giving you a list of findings.

Try sending the API JSON file using [deidentifyConfig](https://cloud.google.com/dlp/docs/reference/rest/v2beta2/projects.deidentifyTemplates) object, so sensitive information is redacted from the output.

1. Create a new JSON file (called `new-inspect-file.json`) that includes the following:
    

```json
{
  "item": {
     "value":"My email is test@gmail.com",
   },
   "deidentifyConfig": {
     "infoTypeTransformations":{
          "transformations": [
            {
              "primitiveTransformation": {
                "replaceWithInfoTypeConfig": {}
              }
            }
          ]
        }
    },
    "inspectConfig": {
      "infoTypes": {
        "name": "EMAIL_ADDRESS"
      }
    }
}
```

2. Use `curl` to make a `content:deidentify` request (`ACCESS_TOKEN` has been replaced with a command to print the access token):
    

```apache
curl -s \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  https://dlp.googleapis.com/v2/projects/$PROJECT_ID/content:deidentify \
  -d @new-inspect-file.json -o redact-output.txt
```

It saves the `curl` response in `redact-output.txt` file. Check the output using below command:

```apache
cat redact-output.txt
```

You should see a response similar to the following:

```json
{
  "item": {
    "value": "My email is [EMAIL_ADDRESS]"
  },
  "overview": {
    "transformedBytes": "14",
    "transformationSummaries": [
      {
        "infoType": {
          "name": "EMAIL_ADDRESS"
        },
        "transformation": {
          "replaceWithInfoTypeConfig": {}
        },
        "results": [
          {
            "count": "1",
            "code": "SUCCESS"
          }
        ],
        "transformedBytes": "14"
      }
    ]
  }
}
```

You've sent your first request to the DLP API and redacted sensitive information from output!

### Upload output to Cloud Storage

Run the following command to upload the curl response on Cloud Storage for activity tracking validation:

```apache
gsutil cp redact-output.txt gs://qwiklabs-gcp-00-36d4057bb33c-bucket
```

Redacting sensitive data from text content

---

## Solution of Lab

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP107/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Data%20Loss%20Prevention%20Qwik%20Start%20-%20JSON/gsp107.sh
sudo chmod +x gsp107.sh
./gsp107.sh
```