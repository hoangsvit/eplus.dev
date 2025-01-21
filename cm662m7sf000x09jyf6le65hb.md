---
title: "Store, Process, and Manage Data on Google Cloud - Command Line: Challenge Lab - ARC102"
seoTitle: "Store, Process, and Manage Data on Google Cloud - Command Line: Challe"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Tue Jan 21 2025 06:04:56 GMT+0000 (Coordinated Universal Time)
cuid: cm662m7sf000x09jyf6le65hb
slug: store-process-and-manage-data-on-google-cloud-command-line-challenge-lab-arc102
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737439463950/8a942c5b-805c-493e-ab67-5d06600c8a80.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1737439480553/8f301cb4-e0b4-4a6c-b0e8-0488b75fad1b.png
tags: store-process-and-manage-data-on-google-cloud-command-line-challenge-lab-arc102, store-process-and-manage-data-on-google-cloud-command-line-challenge-lab, arc102

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Setup**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## **Challenge scenario**

You are just starting your junior cloud engineer role. So far you have been helping teams create and manage Google Cloud resources.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with some of their initial work on a new project around storing and organizing photographs for wildlife organizations, called Wild. You have been asked to assist the Wild team with initial configuration for their application development environment; you receive the following request to complete the following tasks:

* Use commands to create a bucket for storing the photographs.
    
* Use commands to create a Pub/Sub topic that will be used by a Cloud Function you create.
    
* Use commands to create a Cloud Function.
    

Some standards you should follow:

* Create all resources in the `us-east4` zone, unless otherwise directed.
    
* Use the project VPCs.
    
* Naming is normally *team-resource*, e.g. an instance could be named **kraken-webserver1**
    
* Allocate cost effective resource sizes. Projects are monitored and excessive resource use will result in the containing project's termination (and possibly yours), so beware. This is the guidance the monitoring team is willing to share; unless directed, use **e2-micro** for small Linux VMs and **e2-medium** for Windows or other applications such as Kubernetes nodes.
    

Each task is described in detail below, good luck!

## **Task 1. Create a bucket**

* Use commands (CLI/SDK) to create a bucket called `wild-bucket-qwiklabs-gcp-00-54f42b09098c` for the storage of the photographs.
    

Click *Check my progress* to verify the objective.

Create a bucket called `wild-bucket-qwiklabs-gcp-00-54f42b09098c`

Check my progress

## **Task 2. Create a Pub/Sub topic**

* Use the command line to create a Pub/Sub topic called `wild-topic-983` for the Cloud Function to send messages.
    

Click *Check my progress* to verify the objective.

Create a Pub/Sub topic called `wild-topic-983`

Check my progress

## **Task 3. Create the thumbnail Cloud Function**

1. Use the command line to create a Cloud Function called `wild-thumbnail-maker` that executes every time an object is created in the bucket `wild-bucket-qwiklabs-gcp-00-54f42b09098c` you created in task 1.
    
2. Make sure you set the **Entry point** (Function to execute) to `thumbnail` and **Trigger** to `Cloud Storage`.
    
3. In line 15 of `index.js` replace the text **REPLACE\_WITH\_YOUR\_TOPIC ID** with the `wild-topic-983` you created in task 2.
    

index.js:

```javascript
/* globals exports, require */
//jshint strict: false
//jshint esversion: 6
"use strict";
const crc32 = require("fast-crc32c");
const { Storage } = require('@google-cloud/storage');
const gcs = new Storage();
const { PubSub } = require('@google-cloud/pubsub');
const imagemagick = require("imagemagick-stream");

exports.thumbnail = (event, context) => {
  const fileName = event.name;
  const bucketName = event.bucket;
  const size = "64x64"
  const bucket = gcs.bucket(bucketName);
  const topicName = "REPLACE_WITH_YOUR_TOPIC ID";
  const pubsub = new PubSub();
  if ( fileName.search("64x64_thumbnail") == -1 ){
    // doesn't have a thumbnail, get the filename extension
    var filename_split = fileName.split('.');
    var filename_ext = filename_split[filename_split.length - 1];
    var filename_without_ext = fileName.substring(0, fileName.length - filename_ext.length );
    if (filename_ext.toLowerCase() == 'png' || filename_ext.toLowerCase() == 'jpg'){
      // only support png and jpg at this point
      console.log(`Processing Original: gs://${bucketName}/${fileName}`);
      const gcsObject = bucket.file(fileName);
      let newFilename = filename_without_ext + size + '_thumbnail.' + filename_ext;
      let gcsNewObject = bucket.file(newFilename);
      let srcStream = gcsObject.createReadStream();
      let dstStream = gcsNewObject.createWriteStream();
      let resize = imagemagick().resize(size).quality(90);
      srcStream.pipe(resize).pipe(dstStream);
      return new Promise((resolve, reject) => {
        dstStream
          .on("error", (err) => {
            console.log(`Error: ${err}`);
            reject(err);
          })
          .on("finish", () => {
            console.log(`Success: ${fileName} → ${newFilename}`);
              // set the content-type
              gcsNewObject.setMetadata(
              {
                contentType: 'image/'+ filename_ext.toLowerCase()
              }, function(err, apiResponse) {});
              pubsub
                .topic(topicName)
                .publisher()
                .publish(Buffer.from(newFilename))
                .then(messageId => {
                  console.log(`Message ${messageId} published.`);
                })
                .catch(err => {
                  console.error('ERROR:', err);
                });
          });
      });
    }
    else {
      console.log(`gs://${bucketName}/${fileName} is not an image I can handle`);
    }
  }
  else {
    console.log(`gs://${bucketName}/${fileName} already has a thumbnail`);
  }
};
```

package.json:

```json
{
  "name": "thumbnails",
  "version": "1.0.0",
  "description": "Create Thumbnail of uploaded image",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@google-cloud/pubsub": "^2.0.0",
    "@google-cloud/storage": "^5.0.0",
    "fast-crc32c": "1.0.4",
    "imagemagick-stream": "4.1.1"
  },
  "devDependencies": {},
  "engines": {
    "node": ">=4.3.2"
  }
}
```

**Note:** You must upload one JPG or PNG image into the bucket to verify the thumbnail was created (after creating the function successfully). Use this image [`https://storage.googleapis.com/cloud-training/arc102/wildlife.jpg`](https://storage.googleapis.com/cloud-training/arc102/wildlife.jpg); download the image to your machine and then upload that file to your bucket. You will see a thumbnail image appear shortly afterwards (use **REFRESH** in the bucket details).

Click *Check my progress* to verify the objective.

Verify the Cloud Function worked

---

## Solution of Lab

%[https://www.youtube.com/watch?v=4bRqwkwBHKQ] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Store%20Process%20and%20Manage%20Data%20on%20Google%20Cloud%20Command%20Line%20Challenge%20Lab/quicklabarc102.sh
sudo chmod +x quicklabarc102.sh
./quicklabarc102.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737439336844/f588de7a-d77e-4662-9e9b-385e5ab8bc23.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737439345330/f428daf2-82f3-4ab7-9acd-0ef390f4bdb3.png align="center")