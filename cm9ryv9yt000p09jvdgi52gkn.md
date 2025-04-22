---
title: "Analyze Images with the Cloud Vision API: Challenge Lab - ARC122"
seoTitle: "Analyze Images with the Cloud Vision API: Challenge Lab - ARC122"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Tue Apr 22 2025 03:50:04 GMT+0000 (Coordinated Universal Time)
cuid: cm9ryv9yt000p09jvdgi52gkn
slug: analyze-images-with-the-cloud-vision-api-challenge-lab-arc122
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745293753964/b27dbfc4-0455-45b5-841d-1749d234aad7.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745293769507/dca955d1-5da6-4364-ba13-dce8e411eab2.png
tags: analyze-images-with-the-cloud-vision-api-challenge-lab-arc122, analyze-images-with-the-cloud-vision-api-challenge-lab, arc122

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## Setup

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## Challenge scenario

You are just starting your junior machine learning engineer role. So far you have been helping teams train models, and you're learning how to use Google Cloud Machine Learning APIs.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

Use the Vision API to detect text and global landmarks in a given image.

Some standards you should follow:

* Ensure that any needed APIs (such as Cloud Vision, Cloud Translation, and Cloud Natural Language) are successfully enabled.
    
* Create all resources in the `us-west1` region, unless otherwise directed.
    

Each task is described in detail below.

## Task 1. Verify your resources

1. Ensure that you have created an API key and saved it to the environment variable `API_KEY` to use in the scripts provided.
    
2. A bucket called `qwiklabs-gcp-02-66ed90a4a84b`\-bucket has been created for you with an image inside it to use for this lab.
    
3. Make sure the object in the bucket is publicly accessible.
    

Click *Check my progress* to verify the objective.

Create an API key

**Check my progress**

## Task 2. Create Request.json file

Create a `request.json` file. You will modify this file depending on the task required.

```json
{
  "requests": [
      {
        "image": {
          "source": {
              "gcsImageUri":
          }
        },
        "features": [
          {
            "type":
            "maxResults": 10
          }
        ]
      }
  ]
}
```

## Task 3. Update the json file

1. Update your json file:
    

* Add your bucket/img to the `gcsImageUri`
    
* Add the method to `type`. First, use the `TEXT_DETECTION` method of the Vision API.
    

**Click here for hint!**

2. Call the Vision API with `curl`, given below. You want to use the text detection and landmark detection methods, replacing YOUR\_JSON with the name of the file you created earlier:
    

```apache
curl -s -X POST -H "Content-Type: application/json" --data-binary @YOUR_JSON  https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}
```

Saves the curl response in `text-response.json` file.

```apache
curl -s -X POST -H "Content-Type: application/json" --data-binary @YOUR_JSON  https://vision.googleapis.com/v1/images:annotate?key=${API_KEY} -o text-response.json
```

### Upload output to Cloud Storage

Run the following command to upload the curl response on Cloud Storage for activity tracking validation:

```apache
gsutil cp text-response.json gs://qwiklabs-gcp-02-66ed90a4a84b-bucket
```

Click *Check my progress* to verify the objective.

Analyze the image with the Cloud Vision API

**Check my progress**

3. Now update the json file to use the `LANDMARK_DETECTION` method.
    
4. Call the Vision API with `curl` again.
    

Saves the curl response in landmark-response.json file.

```apache
curl -s -X POST -H "Content-Type: application/json" --data-binary @YOUR_JSON  https://vision.googleapis.com/v1/images:annotate?key=${API_KEY} -o landmark-response.json
```

### Upload output to Cloud Storage

Run the following command to upload the curl response on Cloud Storage for activity tracking validation:

```apache
gsutil cp landmark-response.json gs://qwiklabs-gcp-02-66ed90a4a84b-bucket
```

Click *Check my progress* to verify the objective.

Analyze the image with the Cloud Vision API

**Check my progress**

**Citation:** *Manif des Sans-Papiers* (2017, February 9) by Charles Hutchins on Wikimedia Commons, the free media repository. Retrieved from [https://commons.wikimedia.org/wiki/File:Manif\_des\_Sans-Papiers.jpg](https://commons.wikimedia.org/wiki/File:Manif_des_Sans-Papiers.jpg) This file is licensed under the [Creative Commons Attribution 2.0 Generic](https://creativecommons.org/licenses/by/2.0/deed.en) license.

---

## Solution of Lab

%[https://youtu.be/DFAprBXSma4] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Analyze%20Images%20with%20the%20Cloud%20Vision%20API%20Challenge%20Lab/arc122.sh
sudo chmod +x arc122.sh
./arc122.sh
```