---
title: "Extract, Analyze, and Translate Text from Images with the Cloud ML APIs - GSP075"
seoTitle: "Extract, Analyze, and Translate Text from Images with the Cloud ML API"
seoDescription: "In this lab you'll explore the power of machine learning by using multiple machine learning APIs together. Start with Cloud Vision API's text detection meth"
datePublished: Tue Nov 12 2024 02:13:53 GMT+0000 (Coordinated Universal Time)
cuid: cm3dtjg7r000509lkat0n6wz5
slug: extract-analyze-and-translate-text-from-images-with-the-cloud-ml-apis-gsp075
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745302649414/545b1088-cf3a-4772-bed9-ba8a8285c05f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745302667155/c899e696-895a-4489-a15a-7cbe54604358.png
tags: extract-analyze-and-translate-text-from-images-with-the-cloud-ml-apis-gsp075, gsp075, extract-analyze-and-translate-text-from-images-with-the-cloud-ml-apis

---

## **Overview**

In this lab you'll explore the power of machine learning by using multiple machine learning APIs together. Start with Cloud Vision API's text detection method to make use of Optical Character Recognition (OCR) to extract text from images. Then, learn how to translate that text with the Translation API and analyze it with the Natural Language API.

## **Objectives**

In this lab, you will:

* Create a Vision API request and calling the API with curl
    
* Use the text detection (OCR) method of the Vision API
    
* Use the Translation API to translate text from your image
    
* Use the Natural Language API to analyze the text
    

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
    student-04-4f4758a1370b@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    HCO7x7YvioD7
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-c7427acb43d2`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-c7427acb43d2
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
ACCOUNT: student-04-4f4758a1370b@qwiklabs.net

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
project = qwiklabs-gcp-03-c7427acb43d2
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Create an API key**

Since you'll be using `curl` to send a request to the Vision API, generate an API key to pass in your request URL.

1. To create an API key, navigate to: **Navigation Menu** &gt; **APIs & services** &gt; **Credentials**.
    
2. Click **\+ Create Credentials**.
    
3. In the drop down menu, select **API key**.
    
4. Next, copy the key you just generated and click **Close**.
    
5. Now save the API key to an environment variable to avoid having to insert the value of your API key in each request.
    
6. Run the following in Cloud Shell, replacing `<your_api_key>` with the key you just copied:
    

```apache
export API_KEY=<YOUR_API_KEY>
```

Click **Check my progress** to verify your performed task.

Create an API Key

Check my progress

## **Task 2. Upload an image to a Cloud Storage bucket**

### Create a Cloud Storage bucket

There are two ways to send an image to the Vision API for image detection: by sending the API a base64 encoded image string, or passing it the URL of a file stored in Cloud Storage. For this lab you'll create a Cloud Storage bucket to store your images.

1. Navigate to the **Navigation menu** &gt; **Cloud Storage** browser in the Console, then click **Create bucket**.
    
2. Give your bucket a unique name:`qwiklabs-gcp-03-c7427acb43d2`\-bucket.
    
3. After naming your bucket, click **Choose how to control access to objects**.
    
4. Uncheck the box for **Enforce public access prevention on this bucket**.
    
5. Choose **Fine-grained** under Access Control and click **Create**.
    

### Upload an image to your bucket

1. Right click on the following image of a French sign, then click **Save image as** and save it to your computer as **sign.jpg**.
    

![Le Bien Public French sign](https://cdn.qwiklabs.com/cBoI5P4dZ6k%2FAr5Mv7eME%2F0fCb4G6nIGB0odCXzpEa4%3D align="left")

2. Navigate to the bucket you just created in the Cloud Storage browser and click **Upload &gt; Upload files**, then select **sign.jpg**.
    

Next you'll allow the file to be viewed publicly while keeping the access to the bucket private.

3. Click on the 3 dots for the image file:
    

![Objects tab with uploaded sign image file, and more options button highlighted](https://cdn.qwiklabs.com/YFK8BqfjPUAl%2FTi8G4c6dsRlDY8IKmGch%2F3yDiRMNoY%3D align="left")

4. Select **Edit access**.
    
5. Click **Add Entry** and set the following:
    

* Select **Public** for the Entity.
    
* Ensure **allUsers** is the value for the Name.
    
* Select **Reader** for the Access.
    

![Entity, Name and Access fields of newly added entry highlighted](https://cdn.qwiklabs.com/WtQ9kozdmpxItefC9LzzjAegB85xqd4GMlGpUBH%2B%2BVs%3D align="left")

6. Click **Save**.
    

You'll now see that the file has public access.

Now that you have the file in your bucket, you're ready to create a Vision API request, passing it the URL of this picture.

Click **Check my progress** to verify your performed task.

Upload image to a bucket

Check my progress

## **Task 3. Create your Cloud Vision API request**

1. In your Cloud Shell environment, create an `ocr-request.json` file, then add the code below to the file, replacing **my-bucket-name** with the name of the bucket you created. You can create the file using one of your preferred command line editors (`nano`, `vim`, `emacs`) or click the pencil icon to open the code editor in Cloud Shell:
    

![Open Editor button displaying the pencil icon](https://cdn.qwiklabs.com/Th5i4GhZ4KZmFOQ9NWdNmyDXleSWVH9rxHGBt3ECj3M%3D align="left")

2. Add the following to your `ocr-request.json` file:
    

```json
{
  "requests": [
      {
        "image": {
          "source": {
              "gcsImageUri": "gs://my-bucket-name/sign.jpg"
          }
        },
        "features": [
          {
            "type": "TEXT_DETECTION",
            "maxResults": 10
          }
        ]
      }
  ]
}
```

You're going to use the [TEXT\_DETECTION](https://cloud.google.com/vision/docs/ocr) feature of the Cloud Vision API. This will run optical character recognition (OCR) on the image to extract text.

## **Task 4. Call the text detection method**

1. In Cloud Shell, call the Cloud Vision API with `curl`:
    

```apache
curl -s -X POST -H "Content-Type: application/json" --data-binary @ocr-request.json  https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}
```

The first part of your response should look like the following:

```json
{
  "responses": [
    {
      "textAnnotations": [
        {
          "locale": "fr",
          "description": "LE BIEN PUBLIC\nles dépêches\nPour Obama,\nla moutarde\nest\nde Dijon\n",
          "boundingPoly": {
            "vertices": [
              {
                "x": 138,
                "y": 40
              },
              {
                "x": 622,
                "y": 40
              },
              {
                "x": 622,
                "y": 795
              },
              {
                "x": 138,
                "y": 795
              }
            ]
          }
        },
        {
          "description": "LE",
          "boundingPoly": {
            "vertices": [
              {
                "x": 138,
                "y": 99
              },
              {
                "x": 274,
                "y": 82
              },
              {
                "x": 283,
                "y": 157
              },
              {
                "x": 147,
                "y": 173
              }
            ]
          }
        },
        {
          "description": "BIEN",
          "boundingPoly": {
            "vertices": [
              {
                "x": 291,
                "y": 79
              },
              {
                "x": 413,
                "y": 64
              },
              {
                "x": 422,
                "y": 139
              },
              {
                "x": 300,
                "y": 154
              }
            ]
          }
            ...
      ]
}]
}
```

The OCR method is able to extract lots of text from the image.

The first piece of data you get back from `textAnnotations` is the entire block of text the API found in the image. This includes:

* the language code (in this case fr for French)
    
* a string of the text
    
* a bounding box indicating where the text was found in the image
    

Then you get an object for each word found in the text with a bounding box for that specific word.

**Note:** For images with more text, the Cloud Vision API also has a [DOCUMENT\_TEXT\_DETECTION feature](https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate#TextAnnotation). This response includes additional information and breaks text down into page, blocks, paragraphs, and words.

Unless you speak French you probably don't know what this says. The next step is translation.

2. Run the following `curl` command to save the response to an `ocr-response.json` file so it can be referenced later:
    

```apache
curl -s -X POST -H "Content-Type: application/json" --data-binary @ocr-request.json  https://vision.googleapis.com/v1/images:annotate?key=${API_KEY} -o ocr-response.json
```

## **Task 5. Send text from the image to the Translation API**

The [Translation API](https://cloud.google.com/translate/docs/reference/translate) can translate text into 100+ languages. It can also detect the language of the input text. To translate the French text into English, pass the text and the language code for the target language (en-US) to the Translation API.

1. First, create a `translation-request.json` file and add the following to it:
    

```json
{
  "q": "your_text_here",
  "target": "en"
}
```

`q` is where you'll pass the string to translate.

2. **Save** the file.
    
3. Run this Bash command in Cloud Shell to extract the image text from the previous step and copy it into a new `translation-request.json` (all in one command):
    

```apache
STR=$(jq .responses[0].textAnnotations[0].description ocr-response.json) && STR="${STR//\"}" && sed -i "s|your_text_here|$STR|g" translation-request.json
```

4. Now you're ready to call the Translation API. This command will also copy the response into a `translation-response.json` file:
    

```apache
curl -s -X POST -H "Content-Type: application/json" --data-binary @translation-request.json https://translation.googleapis.com/language/translate/v2?key=${API_KEY} -o translation-response.json
```

5. Run this command to inspect the file with the Translation API response:
    

```apache
cat translation-response.json
```

Now you can understand more of what the sign said!

```json
{
  "data": {
    "translations": [
      {
        "translatedText": "TO THE PUBLIC GOOD the dispatches For Obama, the mustard is from Dijon",
        "detectedSourceLanguage": "fr"
      }
    ]
  }
}
```

In the response:

* `translatedText` contains the resulting translation
    
* `detectedSourceLanguage` is `fr`, the ISO language code for French.
    

The Translation API supports 100+ languages, all of which are listed in the [Language support reference](https://cloud.google.com/translate/docs/languages).

In addition to translating the text from our image, you might want to do more analysis on it. That's where the Natural Language API comes in handy. Onward to the next step!

## **Task 6. Analyzing the image's text with the Natural Language API**

The Natural Language API helps you understand text by extracting entities, analyzing sentiment and syntax, and classifying text into categories. Use the `analyzeEntities` method to see what entities the Natural Language API can find in the text from your image.

1. To set up the API request, create a `nl-request.json` file with the following:
    

```json
{
  "document":{
    "type":"PLAIN_TEXT",
    "content":"your_text_here"
  },
  "encodingType":"UTF8"
}
```

In the request, you're telling the Natural Language API about the text you're sending:

* **type:** supported type values are `PLAIN_TEXT` or `HTML`.
    
* **content:** pass the text to send to the Natural Language API for analysis. The Natural Language API also supports sending files stored in Cloud Storage for text processing. To send a file from Cloud Storage, replace `content` with `gcsContentUri` and use the value of the text file's uri in Cloud Storage.
    
* **encodingType:** tells the API which type of text encoding to use when processing the text. The API will use this to calculate where specific entities appear in the text.
    

2. Run this Bash command in Cloud Shell to copy the translated text into the content block of the Natural Language API request:
    

```apache
STR=$(jq .data.translations[0].translatedText  translation-response.json) && STR="${STR//\"}" && sed -i "s|your_text_here|$STR|g" nl-request.json
```

The `nl-request.json` file now contains the translated English text from the original image. Time to analyze it!

3. Call the `analyzeEntities` endpoint of the Natural Language API with this `curl` request:
    

```apache
curl "https://language.googleapis.com/v1/documents:analyzeEntities?key=${API_KEY}" \
  -s -X POST -H "Content-Type: application/json" --data-binary @nl-request.json
```

If you scroll through the response you can see the entities the Natural Language API found:

```json
{
  "entities": [
    {
      "name": "dispatches",
      "type": "OTHER",
      "metadata": {},
      "salience": 0.3560996,
      "mentions": [
        {
          "text": {
            "content": "dispatches",
            "beginOffset": 23
          },
          "type": "COMMON"
        }
      ]
    },
    {
      "name": "mustard",
      "type": "OTHER",
      "metadata": {},
      "salience": 0.2878307,
      "mentions": [
        {
          "text": {
            "content": "mustard",
            "beginOffset": 38
          },
          "type": "COMMON"
        }
      ]
    },
    {
      "name": "Obama",
      "type": "PERSON",
      "metadata": {
        "mid": "/m/02mjmr",
        "wikipedia_url": "https://en.wikipedia.org/wiki/Barack_Obama"
      },
      "salience": 0.16260329,
      "mentions": [
        {
          "text": {
            "content": "Obama",
            "beginOffset": 31
          },
          "type": "PROPER"
        }
      ]
    },
    {
      "name": "Dijon",
      "type": "LOCATION",
      "metadata": {
        "mid": "/m/0pbhz",
        "wikipedia_url": "https://en.wikipedia.org/wiki/Dijon"
      },
      "salience": 0.08129317,
      "mentions": [
        {
          "text": {
            "content": "Dijon",
            "beginOffset": 54
          },
          "type": "PROPER"
        }
      ]
    }
  ],
  "language": "en"
}
```

For entities that have a wikipedia page, the API provides metadata including the URL of that page along with the entity's `mid`. The `mid` is an ID that maps to this entity in Google's Knowledge Graph. To get more information on it, you could call the [Knowledge Graph API](https://developers.google.com/knowledge-graph/), passing it this ID. For all entities, the Natural Language API tells us the places it appeared in the text (`mentions`), the `type` of entity, and `salience` (a \[0,1\] range indicating how important the entity is to the text as a whole). In addition to English, the Natural Language API also supports the languages listed in the [Language Support reference](https://cloud.google.com/natural-language/docs/languages).

Looking at this image it's relatively easy to pick out the important entities, but if you had a library of thousands of images this would be much more difficult. OCR, translation, and natural language processing can help to extract meaning from large datasets of images.

---

## Solution of Lab

%[https://youtu.be/kkWNyq0fr9o] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Extract%2C%20Analyze%2C%20and%20Translate%20Text%20from%20Images%20with%20the%20Cloud%20ML%20APIs/gsp075.sh
sudo chmod +x gsp075.sh
./gsp075.sh
```