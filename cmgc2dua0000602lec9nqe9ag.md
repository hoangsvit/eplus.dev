---
title: "Video Intelligence: Qwik Start - GSP154"
seoTitle: "Video Intelligence: Qwik Start - GSP154"
seoDescription: "Learn to use the Google Cloud Video Intelligence API to make videos searchable through authorization setup and sending annotate video requests"
datePublished: Sat Oct 04 2025 09:22:06 GMT+0000 (Coordinated Universal Time)
cuid: cmgc2dua0000602lec9nqe9ag
slug: video-intelligence-qwik-start-gsp154
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759569615018/f46690fd-04b4-47f7-9894-656d8215f35a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759569705778/227a77ea-f8fc-4a5d-9873-45233686cd8a.png
tags: video-intelligence-qwik-start-gsp154, video-intelligence-qwik-start, gsp154

---

## Overview

Google Cloud Video Intelligence makes videos searchable and discoverable by extracting metadata with an easy to use REST API. You can now search every moment of every video file in your catalog. It quickly annotates videos stored in [Cloud Storage](https://cloud.google.com/storage/), and helps you identify key entities (nouns) within your video; and when they occur within the video. Separate signal from noise by retrieving relevant information within the entire video, shot-by-shot, -or per frame.

### What you'll do

In this lab, you learn how to:

* Set up authorization for a custom service account
    
* Send an annotate video request to the Video Intelligence API
    

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
    student-00-2005ed082c0e@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    4Q09bHdAFI4p
    ```
    
    Copied!
    
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-cd57742a695e`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-cd57742a695e
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

Copied!

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-00-2005ed082c0e@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

Copied!

**Output:**

```apache
[core]
project = qwiklabs-gcp-01-cd57742a695e
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Set up authorization

For this lab, you create and use a service account that is tied to your Google Cloud project for authorization.

1. In Cloud Shell, run the following command to create a new service account named `quickstart`:
    

```apache
gcloud iam service-accounts create quickstart
```

Copied!

2. Create a service account key file, replacing `<your-project-123>` with your Project ID:
    

```apache
gcloud iam service-accounts keys create key.json --iam-account quickstart@<your-project-123>.iam.gserviceaccount.com
```

Copied!

3. Now authenticate your service account, passing the location of your service account key file:
    

```apache
gcloud auth activate-service-account --key-file key.json
```

Copied!

4. Obtain an authorization token using your service account:
    

```apache
gcloud auth print-access-token
```

Copied!

The token will print in the output, and you'll be using it in a future step.

Click **Check my progress** to verify the objective.

Set up authorization

## Task 2. Make an annotate video request

**Note:** In this lab, the Cloud Video Intelligence API is already enabled for you.

1. Run this command to create a JSON request file with the following text, and save it as `request.json` :
    

```apache
cat > request.json <<EOF
{
   "inputUri":"gs://spls/gsp154/video/train.mp4",
   "features": [
       "LABEL_DETECTION"
   ]
}
EOF
```

Copied!

**Note:** To make the process simpler, a public video of a train available to your project is used as the value for your `inputUri`. If preferred or running in a personal project, any video can be used in place by uploading it to Cloud Storage and providing its Cloud Storage URI (format: `gs://bucket/object`) for the value of `inputUri`.

2. Use `curl` to make a `videos:annotate` request passing the filename of the entity request:
    

```apache
curl -s -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer '$(gcloud auth print-access-token)'' \
    'https://videointelligence.googleapis.com/v1/videos:annotate' \
    -d @request.json
```

Copied!

The Video Intelligence API creates an operation to process your request. You should now see a response that includes your operation name, which should look similar to this one:

```apache
{
  "name": "projects/474887704060/locations/asia-east1/operations/16366331060670521152"
}
```

You will use this operation name, locations and projects in the future step.

3. Use this script to request information on the operation by calling the `v1.operations` endpoint. Replace the `PROJECTS`, `LOCATIONS` and `OPERATION_NAME` with the value you just received in the previous command:
    

```apache
curl -s -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer '$(gcloud auth print-access-token)'' \
    'https://videointelligence.googleapis.com/v1/projects/PROJECTS/locations/LOCATIONS/operations/OPERATION_NAME'
```

Copied!

You'll now see information related to your operation. If the operation has completed, a `done` field is included and set to `true`:

```apache
{
  "name": "projects/425437283751/locations/asia-east1/operations/17938636079131796601",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.videointelligence.v1.Annota
tionProgressMetadata",
    "progressMetadata": [
      {
        "inputUri": "gs://spls/gsp154/video/train.mp4",
        "startTime": "2016-09-22T21:41:56.766091Z",
        "lastUpdateTime": "2016-09-22T21:42:03.889743Z"
      }
    ]
  },
  ...
}
```

4. After giving the request some time (about a minute, typically), re-run the command and the same request returns annotated results:
    

```apache
{
  "name": "projects/425437283751/locations/asia-east1/operations/17938636079131796601",
  "metadata": {
    "@type": "type.googleapis.com/google.cloud.videointelligence.v1.AnnotateVideoProgress",
    "annotationProgress": [
      {
        "inputUri": "/spls/gsp154/video/train.mp4",
        "progressPercent": 100,
        "startTime": "2017-02-17T22:39:00.333942Z",
        "updateTime": "2017-02-17T22:39:11.414399Z"
      }
    ]
  },
  "done": true,
  "response": {
    "@type": "type.googleapis.com/google.cloud.videointelligence.v1.AnnotateVideoResponse",
    "annotationResults": [
      {
        "inputUri": "/spls/gsp154/video/train.mp4",
        "segmentLabelAnnotations": [
          {
            "entity": {
              "entityId": "/m/01yrx",
              "languageCode": "en-US"
            },
            "segments": [
              {
                "segment": {
                  "startTimeOffset": "0s",
                  "endTimeOffset": "14.833664s"
                },
                "confidence": 0.98509187
              }
            ]
          },
         ...
```

You've sent your first request to Cloud Video Intelligence API.

Click **Check my progress** to verify the objective.

Make an annotate video request

---

## Solution of Lab

%[https://youtu.be/O5jFaEJVNw0] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP154/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Video%20Intelligence%20Qwik%20Start/techcps154.sh
sudo chmod +x techcps154.sh
./techcps154.sh
```