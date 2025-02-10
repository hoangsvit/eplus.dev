---
title: "Translate Text with the Cloud Translation API - GSP049"
seoTitle: "Translate Text with the Cloud Translation API - GSP049"
seoDescription: "The Cloud Translation API uses Google’s neural machine translation technology to instantly translate texts into more than one hundred languages."
datePublished: Mon Feb 10 2025 06:08:22 GMT+0000 (Coordinated Universal Time)
cuid: cm6ynjno4000a08jr0ir72kwx
slug: translate-text-with-the-cloud-translation-api-gsp049
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739167467040/0cc5c7bd-bc75-4b7a-ae49-c971609946af.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1739167686629/d962cb37-31eb-4168-ba71-58ad7b5096d6.png
tags: translate-text-with-the-cloud-translation-api-gsp049, translate-text-with-the-cloud-translation-api, gsp049

---

## **Overview**

The Cloud Translation API uses Google’s neural machine translation technology to instantly translate texts into more than one hundred languages.

In this lab you use the API to translate text and detect what language the text is using.

### What you'll learn

In this lab you use the Cloud Translation API to do the following:

* Create a Cloud Translation API request and call the API with `curl`
    
* Translate text
    
* Use the Premium Edition
    
* Detecting language
    

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
    student-04-1e3d2c2daa00@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    j4KmzNmsJd3C
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-e00499626c31`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-e00499626c31
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
ACCOUNT: student-04-1e3d2c2daa00@qwiklabs.net

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
project = qwiklabs-gcp-02-e00499626c31
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Set the region for your project

Run the following command to set the region for your project:

```apache
export REGION=us-central1
gcloud config set compute/region $REGION
```

## **Task 1. Create an API key**

Since later in this lab you use `curl` to send a request to the Translation API, you need to generate an API key to pass in your request URL.

1. To create an API key, in the **Navigation menu** (), click **APIs & services &gt; Credentials**.
    
2. Click **+CREATE CREDENTIALS**.
    
3. In the drop down menu, select **API key**.
    
4. Copy the key you just generated.
    

Next, save it to an environment variable to avoid having to insert the value of your API key in each request.

5. Run the following in Cloud Shell. Be sure to replace `<your_api_key>` with the key you just copied:
    

```apache
export API_KEY= YOUR_API_KEY
```

Click **Check my progress** to verify the objective.

Create an API Key

Check my progress

## **Task 2. Translate text**

In this example you translate the string "My name is Steve" into Spanish.

* Pass the text to be translated, along with the API key environment variable, to the Translation API with the following `curl` command:
    

```apache
TEXT="My%20name%20is%20Steve"
curl "https://translation.googleapis.com/language/translate/v2?target=es&key=${API_KEY}&q=${TEXT}"
```

Your response should look like this:

```json
{
  "data": {
    "translations": [
      {
        "translatedText": "Mi nombre es Steve",
        "detectedSourceLanguage": "en"
      }
    ]
  }
}
```

In the response, you can see that the translated text and the source language that the API detected.​

**Note: Premium Mode**

The Google Cloud Translation API uses a standard edition model for most translation tasks. Google has augmented its translation service to use a more robust [Neural machine Translation System](https://research.googleblog.com/2016/09/a-neural-network-for-machine.html). To learn more about using this premium model, refer to [Cloud Translation Documentation](https://cloud.google.com/translate/docs/premium).

## **Task 3. Detect the language**

In addition to translating text, the Translation API also can detect the language of the text. In this example you detect the language of two strings.

* Pass the text to be examined, along with the API key environment variable, to the Translation API with the following curl command:
    

```apache
TEXT_ONE="Meu%20nome%20é%20Steven"
TEXT_TWO="日本のグーグルのオフィスは、東京の六本木ヒルズにあります"
curl -X POST "https://translation.googleapis.com/language/translate/v2/detect?key=${API_KEY}" -d "q=${TEXT_ONE}" -d "q=${TEXT_TWO}"
```

Your response should look like this:

```json
{
  "data": {
    "detections": [
      [
        {
          "isReliable": false,
          "language": "pt",
          "confidence": 1
        }
      ],
      [
        {
          "language": "ja",
          "isReliable": false,
          "confidence": 1
        }
      ]
    ]
  }
}
```

The languages returned by this sample are "pt" and "ja". These are the [ISO-639-1](https://en.wikipedia.org/wiki/ISO_639-1) identifiers for Portuguese and Japanese. This [list of languages supported by the Translation API](https://cloud.google.com/translate/docs/languages) lists all the possible language codes which can be returned.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=I0kHgGcwB_U&ab_channel=QUICKGCPLAB] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Translate%20Text%20with%20the%20Cloud%20Translation%20API/gsp049.sh
sudo chmod +x gsp049.sh
./gsp049.sh
```