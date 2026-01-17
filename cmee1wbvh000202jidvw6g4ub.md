---
title: "Speech to Text Transcription with the Cloud Speech API - GSP048"
seoTitle: "Speech to Text Transcription with the Cloud Speech API - GSP048"
seoDescription: "Learn to transcribe audio using Google's Speech-to-Text API, supporting over 80 languages, with hands-on practice in this cloud lab"
datePublished: Sat Aug 16 2025 09:24:37 GMT+0000 (Coordinated Universal Time)
cuid: cmee1wbvh000202jidvw6g4ub
slug: speech-to-text-transcription-with-the-cloud-speech-api-gsp048
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755335780253/fa4f5859-634c-423c-aca8-46061c551bdb.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1755336076292/c032d5bc-a93d-4d83-975d-10aa297868a1.png
tags: speech-to-text-transcription-with-the-cloud-speech-api-gsp048, speech-to-text-transcription-with-the-cloud-speech-api, gsp048, cloud-speech-api, cloud-speech, speech-to-text-transcription

---

## Overview

The Speech-to-Text API lets you transcribe audio speech files to text files in over 80 languages.

In this lab you send an audio file to the Speech API for transcription.

#### What you'll learn

In this lab, you explore the following:

* Creating a Speech-to-Text API request and calling the API with `curl`
    
* Calling the Speech-to-Text API with audio files in a different language
    

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
    student-03-74752f2f291c@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    MGAwcAhldrNs
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

## Task 1. Create an API key

Since you use `curl` to send a request to the Speech-to-Text API, you need to generate an API key to pass in your request URL.

1. To create an API key, on the **Navigation menu** () click **APIs & services** &gt; **Credentials**.
    
2. Click **Create credentials** and select **API key**.
    
3. Copy and record the key you just generated to use later in this lab.
    
4. Click **Close**.
    

Click **Check my progress** to verify the objective.

Create an API Key

Now save your key to an environment variable to avoid having to insert the value of your API key in each request.

5. To perform the next steps, connect to the **linux-instance** provisioned for you via **SSH**:
    

On the **Navigation menu** () click **Compute Engine &gt; VM Instances**.

Notice the **linux-instance** VM in the **VM instances** list. VM details are to the right of the VM name.

6. Click **SSH** to the right of the **linux-instance** VM name.
    

An interactive shell opens. Use this to perform the next operations.

7. In the shell (SSH) run the following, replacing `<your_api_key>` with the key you just copied:
    

```apache
export API_KEY=<YOUR_API_KEY>
```

## Task 2. Create your API request

**Note:** This lab uses a pre-recorded file that's available on Cloud Storage: `gs://cloud-samples-data/speech/brooklyn_bridge.flac`. Before sending it to the Speech-to-Text API, you can [listen to this file](https://storage.cloud.google.com/cloud-samples-data/speech/brooklyn_bridge.flac).

1. Build your request to the API in a `request.json` file. Create the `request.json` file:
    

```apache
touch request.json
```

2. Open the file using your preferred command line editor (`nano`, `vim`, `emacs`) or `gcloud` and then add the following to your `request.json` file, using the `uri` value of the sample raw audio file:
    

```json
{
  "config": {
      "encoding":"FLAC",
      "languageCode": "en-US"
  },
  "audio": {
      "uri":"gs://cloud-samples-data/speech/brooklyn_bridge.flac"
  }
}
```

3. Save the file as needed.
    

The request body has a `config` and `audio` object.

In `config`, you tell the Speech-to-Text API how to process the request:

* The `encoding` parameter tells the API which type of audio encoding you're using while the file is being sent to the API. `FLAC` is the encoding type for .raw files (Learn more about encoding types from the [RecognitionConfig reference](https://cloud.google.com/speech/reference/rest/v1/RecognitionConfig)).
    
* `languageCode` defaults to English if left out of the request.
    

There are other parameters you can add to your `config` object, but `encoding` is the only required one.

In the `audio` object, you pass the API the uri of the audio file, which is stored in Cloud Storage for this lab.

Click **Check my progress** to verify the objective.

Create your Speech API request

Now you're ready to call the Speech-to-Text API!

## Task 3. Call the Speech-to-Text API

1. Pass your request body, along with the API key environment variable, to the API with the following `curl` command (all in one single command line):
    

```apache
curl -s -X POST -H "Content-Type: application/json" --data-binary @request.json \
"https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}" > result.json
```

Your response is stored in a file named as result.json.

2. To see the contents of file you can use:
    

```apache
cat result.json
```

The response returned by the `curl` command look something like this:

```json
{
  "results": [
    {
      "alternatives": [
        {
          "transcript": "how old is the Brooklyn Bridge",
          "confidence": 0.98216057
        }
      ],
      "resultEndTime": "1.770s",
      "languageCode": "en-us"
    }
  ],
  "totalBilledTime": "15s"
}
```

The `transcript` value returns the Speech API's text transcription of your audio file, and the `confidence` value indicates how sure the API is that it has accurately transcribed your audio.

Notice that you called the `syncrecognize` method in our request above. The Speech-to-Text API supports both synchronous and asynchronous speech to text transcription.

In this example a complete audio file was used, but you can also use the `syncrecognize` method to perform streaming speech to text transcription while the user is still speaking.

Click **Check my progress** to verify the objective.

Call the Speech API for English language

## Task 4. Speech-to-Text transcription in different languages

Are you multilingual? The Speech-to-Text API supports speech to text transcription in over 100 languages!

You can change the `language_code` parameter in `request.json`. You can find a list of supported languages in the [Language support guide](https://cloud.google.com/speech/docs/languages).

Try a French audio file - (for a preview, [listen here](https://storage.cloud.google.com/cloud-samples-data/speech/corbeau_renard.flac)).

1. Edit your `request.json` and change the content to the following:
    

```json
 {
  "config": {
      "encoding":"FLAC",
      "languageCode": "fr"
  },
  "audio": {
      "uri":"gs://cloud-samples-data/speech/corbeau_renard.flac"
  }
}
```

2. Call the Speech-to-Text by running the `curl` command again.
    
3. See the results:
    

```apache
cat result.json
```

You should see the following response:

```json
{
  "results": [
    {
      "alternatives": [
        {
          "transcript": "maître corbeau sur un arbre perché Tenait dans son bec un fromage maître Renard par l'odeur alléché lui tint à peu près ce langage et bonjour monsieur du corbeau",
          "confidence": 0.93855613
        }
      ],
      "resultEndTime": "12.630s",
      "languageCode": "fr-fr"
    }
  ],
  "totalBilledTime": "15s"
}
```

This is a sentence from a popular French [children’s tale](https://fr.wikipedia.org/wiki/Le_Corbeau_et_le_Renard) by Jean de la Fontaine. If you’ve got audio files in another language, you can try adding them to Cloud Storage and changing the `languageCode` parameter in your request.

**Note:** API restrictions and usage limits on Cloud Speech-to-Text are documented in the [Quotas and limits resource.](https://cloud.google.com/speech-to-text/quotas)

Call the Speech API for French language

---

## Solution of Lab

### Manual

%[https://youtu.be/eMBdbMi8cP8] 

%[https://youtu.be/FOHGHHXy56I] 

* **Create credentials:** [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials?project=qwiklabs-gcp-02-6d90480fd7a5)
    
* **Connect SSH:** [https://console.cloud.google.com/compute/instances](https://console.cloud.google.com/compute/instances)
    

### Quick

%[https://youtu.be/E62c49ZcPK0] 

```apache
curl -LO raw.githubusercontent.com/gcpsolution99/GCP-solution/refs/heads/main/GSP/GSP048_2025.sh
sudo chmod +x GSP048_2025.sh
./GSP048_2025.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755335858942/e428f016-3124-476f-ba86-1532df85599a.png align="center")

**CHECK MY PROGRESS DONE TILL TASK 3**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755336151867/3fff9ff7-e503-47d4-9d55-1dc06c22e773.png align="center")

Type in the terminal <mark>y</mark>

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1755336188708/64a6ab63-40b3-438a-a769-f30c374e0a30.png align="center")