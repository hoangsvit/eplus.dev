---
title: "Store, Process, and Manage Data on Google Cloud: Challenge Lab - ARC100"
seoTitle: "Store, Process, and Manage Data on Google Cloud: Challenge Lab - ARC10"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Mon Apr 14 2025 09:10:47 GMT+0000 (Coordinated Universal Time)
cuid: cm9gusx7v002d09kvgtio63j0
slug: store-process-and-manage-data-on-google-cloud-challenge-lab-arc100
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744620896933/8f2e7ae4-d47d-4308-a72a-c3a50856ff84.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744620979618/0bfaa8f0-a506-4ee0-8b0f-0582924e8080.png
tags: store-process-and-manage-data-on-google-cloud-challenge-lab-arc100, store-process-and-manage-data-on-google-cloud-challenge-lab, arc100

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## Setup

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Challenge scenario

You are just starting your junior cloud engineer role. So far you have been helping teams create and manage Google Cloud resources.

You are expected to have the skills and knowledge for these tasks.

### Your challenge

You are asked to help a newly formed development team with some of their initial work on a new project around storing and organizing photographs, called Memories. You have been asked to assist the Memories team with initial configuration for their application development environment; you receive the following request to complete the following tasks:

* Create a bucket for storing the photographs.
    
* Create a Pub/Sub topic that will be used by a Cloud Run function you create.
    
* Create a Cloud Run function.
    

Some standards you should follow:

* Create all resources in the `us-west1` region unless otherwise directed.
    
* Use the project VPCs.
    
* Naming is normally *team-resource*, e.g. an instance could be named **kraken-webserver1**
    
* Allocate cost effective resource sizes. Projects are monitored and excessive resource use will result in the containing project's termination (and possibly yours), so beware. This is the guidance the monitoring team is willing to share; unless directed, use **f1-micro** for small Linux VMs and **n1-standard-1** for Windows or other applications such as Kubernetes nodes.
    

Each task is described in detail below, good luck!

## Task 1. Create a bucket

Create a bucket called `memories-bucket-qwiklabs-gcp-01-2fa6388dfe64` for the storage of the photographs. Ensure the resource is created in the `us-west1` region.

Click **Check my progress** to verify the objective.

Create a bucket called `memories-bucket-qwiklabs-gcp-01-2fa6388dfe64`

**Check my progress**

## Task 2. Create a Pub/Sub topic

Create a Pub/Sub topic called `memories-topic-357` for the Cloud Run function to send messages.

Click **Check my progress** to verify the objective.

Create a Pub/Sub topic called `memories-topic-357`

**Check my progress**

## Task 3. Create the thumbnail Cloud Run function

Create a Cloud Run function `memories-thumbnail-creator` that will to create a thumbnail from an image added to the `memories-bucket-qwiklabs-gcp-01-2fa6388dfe64` bucket.

Ensure the Cloud Run function is using the **Cloud Run function** environment (which is 2nd generation). Ensure the resource is created in the `us-west1` region and `us-west1-a` zone.

1. Create a Cloud Run function (2nd generation) called `memories-thumbnail-creator` using `Node.js 22` and setting the trigger to `Cloud Storage`.
    

**Note:** The Cloud Run Function is required to execute every time an object is created in the bucket created in Task 1. During the process, Cloud Run Function may request permission to enable APIs or request permission to grant roles to service accounts. Please enable each of the required APIs and grant roles as requested.

After you grant the permissions, wait a few minutes before you click to create the function to ensure that the permissions have been updated.

**Note when using the console to create the function:** After initiating the creation of the function, wait until the green checkbox has been granted for **Creating Eventarc trigger** (top of page under **Creating service**) before updating the code in the next step. If you do not wait for the green checkbox for **Creating Eventarc trigger**, the trigger may not be successfully created and will not appear under the **Triggers** tab of the function.

2. Make sure you set the **Entry point** (Function to execute) to `memories-thumbnail-creator`.
    
3. Add the following code to the `index.js`:
    

```javascript
const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const { PubSub } = require('@google-cloud/pubsub');
const sharp = require('sharp');

functions.cloudEvent('memories-thumbnail-creator', async cloudEvent => {
  const event = cloudEvent.data;

  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Hello ${event.bucket}`);

  const fileName = event.name;
  const bucketName = event.bucket;
  const size = "64x64";
  const bucket = new Storage().bucket(bucketName);
  const topicName = "memories-topic-357";
  const pubsub = new PubSub();

  if (fileName.search("64x64_thumbnail") === -1) {
    // doesn't have a thumbnail, get the filename extension
    const filename_split = fileName.split('.');
    const filename_ext = filename_split[filename_split.length - 1].toLowerCase();
    const filename_without_ext = fileName.substring(0, fileName.length - filename_ext.length - 1); // fix sub string to remove the dot

    if (filename_ext === 'png' || filename_ext === 'jpg' || filename_ext === 'jpeg') {
      // only support png and jpg at this point
      console.log(`Processing Original: gs://${bucketName}/${fileName}`);
      const gcsObject = bucket.file(fileName);
      const newFilename = `${filename_without_ext}_64x64_thumbnail.${filename_ext}`;
      const gcsNewObject = bucket.file(newFilename);

      try {
        const [buffer] = await gcsObject.download();
        const resizedBuffer = await sharp(buffer)
          .resize(64, 64, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .toFormat(filename_ext)
          .toBuffer();

        await gcsNewObject.save(resizedBuffer, {
          metadata: {
            contentType: `image/${filename_ext}`,
          },
        });

        console.log(`Success: ${fileName} → ${newFilename}`);

        await pubsub
          .topic(topicName)
          .publishMessage({ data: Buffer.from(newFilename) });

        console.log(`Message published to ${topicName}`);
      } catch (err) {
        console.error(`Error: ${err}`);
      }
    } else {
      console.log(`gs://${bucketName}/${fileName} is not an image I can handle`);
    }
  } else {
    console.log(`gs://${bucketName}/${fileName} already has a thumbnail`);
  }
});
```

4. Add the following code to the `package.json`:
    

```json
{
 "name": "thumbnails",
 "version": "1.0.0",
 "description": "Create Thumbnail of uploaded image",
 "scripts": {
   "start": "node index.js"
 },
 "dependencies": {
   "@google-cloud/functions-framework": "^3.0.0",
   "@google-cloud/pubsub": "^2.0.0",
   "@google-cloud/storage": "^6.11.0",
   "sharp": "^0.32.1"
 },
 "devDependencies": {},
 "engines": {
   "node": ">=4.3.2"
 }
}
```

**Note:** If you get a permission denied error stating it may take a few minutes before all necessary permissions are propagated to the Service Agent, wait a few minutes and try again. Ensure you have the appropriate roles (Eventarc Service Agent, Eventarc Event Receiver, Service Account Token Creator, and Pub/Sub Publisher) assigned to the correct service accounts.

## Task 4. Test the Infrastructure

To test the function, upload a JPG or PNG image into the bucket.

1. Upload a PNG or JPG image to `memories-bucket-qwiklabs-gcp-01-2fa6388dfe64` bucket.
    

**Note:** You need to upload one JPG or PNG image into the bucket to verify the thumbnail was created (after creating the function successfully). Use any JPG or PNG image, or use this image `https://storage.googleapis.com/cloud-training/arc101/travel.jpg` by downloading the image to your machine and then uploading that file to your bucket.

2. You will see a thumbnail image appear shortly afterwards (use **REFRESH** in the bucket details).
    

After you upload the image file, you can click to check your progress below. You do not need to wait for the thumbnail image to be created.

**Note:** If the function deployed successfully and you do not see the thumbnail image in the bucket, you can check that the **Triggers** tab displays the trigger information that you previously provided for the function, which may not have saved correctly if you previously encountered errors.

If you do not see the Cloud Storage trigger in the **Triggers** tab of the function, you can recreate the trigger (see the documentation page titled [Create a trigger for services](https://cloud.google.com/run/docs/triggering/trigger-with-events#trigger-services)), and then upload a new file again to test again (refresh the page after adding a new file).

Click **Check my progress** to verify the objective.

Verify the thumbnail was successfully created by the Cloud Run function

---

## Solution of Lab

%[https://youtu.be/Fq8TYvpkJ4Q] 

```apache
curl -LO raw.githubusercontent.com/ArcadeCrew/Google-Cloud-Labs/refs/heads/main/Store%2C%20Process%2C%20and%20Manage%20Data%20on%20Google%20Cloud%20Challenge%20Lab/arcadecrew.sh
sudo chmod +x arcadecrew.sh
./arcadecrew.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744621441370/7b06dafe-d823-4d45-bd2e-5e4a493ac4e5.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744621646218/6282519b-0c43-447d-9ad7-bf88fe35d238.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744621769373/ab64175b-a21a-4527-9949-862deb26fd3d.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744621835600/b63f5b29-fd62-441e-8402-004ac6904515.png align="center")