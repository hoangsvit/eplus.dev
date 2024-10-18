---
title: "Use Machine Learning APIs on Google Cloud: Challenge Lab - GSP329"
seoTitle: "Use Machine Learning APIs on Google Cloud: Challenge Lab - GSP329"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Sat Aug 17 2024 12:35:12 GMT+0000 (Coordinated Universal Time)
cuid: clzy4fcax001909mja2u203gj
slug: use-machine-learning-apis-on-google-cloud-challenge-lab-gsp329
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723897606221/3fb80e3e-bd77-4e72-ac85-63197295e88d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723898090584/6e209de9-28df-4c13-9626-d1e49d6262bf.png
tags: use-machine-learning-apis-on-google-cloud-challenge-lab-gsp329

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Use Machine Learning APIs on Google Cloud](https://www.cloudskillsboost.google/course_templates/630) course. Are you ready for the challenge?

### Topics tested

* Grant the service account correct privileges for BigQuery and Cloud Storage.
    
* Create and download a service account credentials file to provide Google Cloud credentials to a Python application.
    
* Modify a Python script to extract text from image files using the Google Cloud Vision API.
    
* Modify a Python script to translate text using the Google Translate API.
    
* Check which languages are in the extracted data by executing a BigQuery SQL query.
    

### Setup and requirements

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
    student-03-093931f54e01@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    mBzFGnb26v2k
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

## **Challenge scenario**

You have started a new role as a member of the Analytics team for Jooli Inc. You are expected to help with the development and assessment of data sets for your company's Machine Learning projects. Common tasks include preparing, cleaning, and analyzing diverse data sets.

You are expected to have the skills and knowledge for these tasks, so don't expect step-by-step guides to be provided.

### Your challenge

You have been asked to develop a process to analyze sets of images of signage to extract and translate any text in the images. This extracted text information will be used to help classify the images as part of a machine learning project that will use this image dataset for model training and evaluation. The images all contain text, but the text may be in any language. The images are stored in a Cloud Storage bucket that has been provided for you.

You must use a Python script to process each of the image files by sending them to the Google Vision API to identify the text in the image. The text from each image must be saved back to files on Cloud Storage, with a separate file for the text from each image. If the text locale is not `Japanese` (locale='`ja`'), you must then send the text to the Google Translate API to get the `Japanese` translation for the original text. Once all of the images have been processed, the script must upload the results to a BigQuery table.

This diagram outlines the process.

![Machine learning APIs challenge diagram](https://cdn.qwiklabs.com/kycp4xbmAC9zE7Eufr48Q31ubz7DvPFfoYCIEIMBgAs%3D align="left")

The processed text data must then be written out to a pre-existing BigQuery table called `image_text_detail` in a dataset in your project called `image_classification_dataset`.

A colleague on your team had started to work on the code to process the images based on a Python script previously used to process a set of text files using the Natural Language API. Your colleague has been moved to a separate project and you must now complete the task.

Most of the work on the script has been completed and the version you have been given will access a storage bucket, and iterate over every image file it finds. However the specific API calls that need to be made to find the text in each image and then send that text to the Translation API have not yet been implemented.

You have been given a copy of the work in progress Python script and a set of sample images in a Cloud Storage bucket that is named after your lab Project ID.

Your colleague identified the unfinished parts of the script and commented on the API calls that need to be made. There are three unfinished parts in the script that you must complete to make the correct Machine Learning API calls. All of them are preceded with a comment using the label `# TBD:`.

The final line of code uploads the result data to BigQuery. In the script, this line is disabled by a comment character. When you are satisfied that the rest of the script is working, remove the comment character to enable the final line.

Before you work on the script, you must prepare your environment by creating a service account with the correct permissions and download the credential file for that account. Once you have the service account credentials, you can modify the Python script and use it to process the image files.

To complete the challenge, the original extracted text, locale, and translated text data for all of the images must be loaded into the BigQuery table called `image_text_detail`. The code to do this is in the script but you must remove the comment characters to enable the line of code at the end of the script.

Once you have successfully processed the image files using the updated Python script and uploaded to data to BigQuery, you must confirm that image data has been successfully processed by running the following Query in BigQuery:

```apache
SELECT locale,COUNT(locale) as lcount FROM image_classification_dataset.image_text_detail GROUP BY locale ORDER BY lcount DESC
```

This query will report the number of signs of each language type it has found in the set of sample images.

## **Task 1. Configure a service account to access the Machine Learning APIs, BigQuery, and Cloud Storage**

1. Create a new service account that provides credentials for the script.
    
2. Once you have created the account, bind the `roles/bigquery.admin` and `roles/storage.objectAdmin` roles to the Service Account to provide the IAM permissions required to process files from Cloud Storage and insert the result data into a BigQuery table.
    
    Check that a service account exists that has admin permissions to access BigQuery and Cloud Storage
    
    **Check my progress**
    

## **Task 2. Create and download a credential file for your service account**

1. When you have configured the service account permissions, download the JSON format IAM credentials file for the service account.
    
2. Don't forget to configure the environment variable that supplies the name of the credential file for the Python script.
    
    Check that an IAM credential file has been created for the service account
    
    **Check my progress**
    

## **Task 3. Modify the Python script to extract text from image files**

1. Copy the file `analyze-images-v2.py` from the Cloud Storage bucket that was created for you into the Cloud Shell.
    
2. You must modify this Python script to extract text from the image files stored in your project bucket and then save the text data for each file into a text file that is written back to the same bucket. Remember, the parts of the script where you need to add in the code to access the APIs are marked with the comment `# TBD`.
    
3. After you modify the first part of the script to use the Cloud Vision API to extract text data from the image files, you should run the partially completed script to check your progress to make sure you are on the right track.
    

Confirm that the application can extract text from images

**Check my progress**

## **Task 4. Modify the Python script to translate the text using the Translation API**

* Now modify the second part of the Python script to identify any `non-Japanese` text data found by the Vision API and use the Translation API to translate the original text into `Japanese`.
    
    Confirm that the application can translate text and store the results in BigQuery
    
    **Check my progress**
    

## **Task 5. Identify the most common language used in the signs in the dataset**

1. After you update the script to successfully find and translate the text in the images, remove the comment character from the line at the end of the script that uploads the data to BigQuery.
    
2. When the data has been uploaded to BigQuery, confirm that all necessary data has been loaded into BigQuery by running a query that counts the number of times it sees each separate language.
    
    Run a BigQuery query to report how often each language has been found in the images
    
    **Check my progress**
    

## **Tips and Tricks**

* **Tip 1:** You must set an environment variable to provide the details of the credentials file that should be used by the Python script to access the Google Cloud APIs.
    
* **Tip 2:** You can find details about the Vision API Client document\_text\_detection API call in the [Python API Documentation reference page for the Vision API Client](https://googleapis.dev/python/vision/latest/index.html) and the details of the Vision API annotation response object in the [Python API Documentation reference page for the Vision API Objects](https://googleapis.dev/python/vision/latest/index.html).
    
* **Tip 3:** For details about the Translation API Client translate API call, see the [Python API Documentation for the Translation V2 API Client](https://googleapis.dev/python/translation/2.0.1/client.html#google.cloud.translate_v2.client.Client.translate).
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=Xv27oSrjGqI] 

```apache
export LANGUAGE=
export LOCAL=
export BIGQUERY_ROLE=
export CLOUD_STORAGE_ROLE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723898043771/91f73fc1-106f-4ea8-98d8-24271698b706.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Use%20Machine%20Learning%20APIs%20on%20Google%20Cloud%20Challenge%20Lab/quicklabgsp329.sh
sudo chmod +x quicklabgsp329.sh
./quicklabgsp329.sh
```

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">I got the <mark>Japanese</mark> language but it's not working. The change of language task is not working</div>
</div>