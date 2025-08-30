---
title: "Analyze Speech & Language with Google APIs: Challenge Lab - ARC114"
seoTitle: "Analyze Speech & Language with Google APIs: Challenge Lab - ARC114"
seoDescription: "Participate in a hands-on lab to analyze speech and text with Google APIs using the Cloud Natural Language and Cloud Speech APIs"
datePublished: Sat Aug 30 2025 10:29:13 GMT+0000 (Coordinated Universal Time)
cuid: cmey4dcdv000202jyhhje47rx
slug: analyze-speech-and-language-with-google-apis-challenge-lab-arc114
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756549654619/f2693fd2-8ddc-4bda-8f26-a89b0dcec7a9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756549702688/4012f014-b245-476e-90b2-9d69c5adfa4f.png
tags: google-cloud-apis, analyze-speech-and-language-with-google-apis-challenge-lab-arc114, analyze-speech-and-language-with-google-apis-challenge-lab, arc114

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## Challenge scenario

You are starting your career as a junior cloud architect. In this role, you have been assigned to work on a team project that requires you to use the Cloud Natural Language API and Cloud Speech API services in Google Cloud.

You are expected to have the skills and knowledge to complete the tasks that follow.

### Your challenge

For this challenge, you are asked to analyze some text and speech using the Cloud Natural Language API and Cloud Speech APIs, respectively. You also need to perform sentiment analysis on a text document using Python.

You need to:

* Create an API key
    
* Make an entity analysis request and call the Natural Language API
    
* Create a speech analysis request and call the Speech API
    
* Analyze sentiment with the Natural Language API
    

For this challenge lab, a virtual machine (VM) instance named `lab-vm` has been configured for you to complete the tasks.

Each task is described in detail below, good luck!

## Task 1. Create an API key

1. For this task, you need to create an API key to use in this and other tasks when sending a request to the Natural Language API.
    
2. Save the API key to use in other tasks.
    

Click **Check my progress** to verify the objective.

Create an API key

## Task 2. Make an entity analysis request and call the Natural Language API

1. For this task, connect to the instance `lab-vm` provisioned for you via **SSH**.
    
2. Next, create a JSON file named `nl_request.json` which you will pass to the Natural Language API for analysis. You can add the following code to your JSON file to analyze text about the city of Boston or, alternatively, add text of your own choosing to the **content** object to perform entity analysis on that instead.
    

```json
{
  "document":{
    "type":"PLAIN_TEXT",
    "content":"With approximately 8.2 million people residing in Boston, the capital city of Massachusetts is one of the largest in the United States."
  },
  "encodingType":"UTF8"
}
```

3. You can now pass your request body, along with the API key environment variable you saved earlier, to the Natural Language API using the `curl` command or analyze the text using `gcloud` ML commands.
    
4. Save the response in a file called `nl_response.json`.
    

Click **Check my progress** to verify the objective.

Make an entity analysis request and call the Natural Language API

## Task 3. Create a speech analysis request and call the Speech API

**Note:** For this task, you will use a pre-recorded file that's available on Cloud Storage: `gs://cloud-samples-tests/speech/brooklyn.flac`. [Listen to the audio file before sending it to the Speech API](https://storage.cloud.google.com/cloud-samples-tests/speech/brooklyn.flac).

1. Create another JSON file, named `speech_request.json` for this task, and add the content using the URI value of the sample audio file.
    

```json
{
  "config": {
      "encoding":"FLAC",
      "languageCode": "en-US"
  },
  "audio": {
      "uri":"Pass the API the uri of the audio file in Cloud Storage"
  }
}
```

2. You can now pass your request body, along with the API key environment variable that you saved earlier, to the Natural Language API using the `curl` command or analyze the speech using `gcloud` ML commands.
    
3. Save the response in a file named `speech_response.json`.
    

Click **Check my progress** to verify the objective.

Create a speech analysis request and call the Speech API

## Task 4. Analyze sentiment with the Natural Language API

For this task, you need to analyze text sentiment using the Google Cloud Natural Language API, which attempts to determine the overall attitude (positive or negative) of a content sample such as a movie review. In the `lab-vm` instance, a simple Python application code file called `sentiment_analysis.py` has already been configured and created for you. To perform your analysis, you'll test it on a set of (fictitious or fake) movie reviews for the 1982 sci-fi action film, *Blade Runner*, directed by Ridley Scott.

To use the Natural Language API to perform sentiment analysis, you need to access the service by calling the `analyze_sentiment` method of the `LanguageServiceClient` instance.

1. You need to edit the method `def analyze(movie_review_filename):` in the file `sentiment_analysis.py` and complete the method using Python code that performs the following actions:
    
    * Instantiate a `LanguageServiceClient` instance as the client.
        
    * Read the filename containing the text data into a variable.
        
    * Instantiate a `Document` object with the contents of the file.
        
    * Call the client's `analyze_sentiment` method.
        
2. Download the fictitious movie review samples from Google Cloud Storage: `gs://cloud-samples-tests/natural-language/sentiment-samples.tgz .`
    
3. Unzip the sample files and run the sentiment analysis on one of the files, `bladerunner-pos.txt`, using the relevant Python command.
    

Click **Check my progress** to verify the objective.

Analyze sentiment with the Natural Language API

---

## Solution of Lab

%[https://youtu.be/qUb4yzQIwjs] 

Open VM: [https://console.cloud.google.com/compute/instances](https://console.cloud.google.com/compute/instances)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756549555197/62349756-e60c-4b80-a0ec-0ac430c35890.png align="center")

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC114/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Analyze%20Speech%20%26%20Language%20with%20Google%20APIs%3A%20Challenge%20Lab/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```

**Create API Key:** [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756549801906/5104ea4c-40df-491b-8ff9-f55047126b3e.png align="center")