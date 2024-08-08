---
title: "Set Up an App Dev Environment on Google Cloud: Challenge Lab - GSP315"
seoTitle: "Set Up an App Dev Environment on Google Cloud: Challenge Lab - GSP315"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Thu Aug 08 2024 02:51:52 GMT+0000 (Coordinated Universal Time)
cuid: clzkomisd00050akx6rp1g26j
slug: set-up-an-app-dev-environment-on-google-cloud-challenge-lab-gsp315
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723084936665/00d60367-fe53-49a9-bc0b-7dc88ac24ab4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723085500309/8bca7bd9-3f56-4edf-8b31-fec861f747b8.png
tags: set-up-an-app-dev-environment-on-google-cloud-challenge-lab-gsp315, gsp315

---

## **Introduction**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Set Up an App Dev Environment on Google Cloud](https://www.cloudskillsboost.google/course_templates/637) skill badge. Are you ready for the challenge?

---

### **Task 1. Create a bucket**

You need to create a bucket called `qwiklabs-gcp-02-44c8ef7a6ef7-bucket` for the storage of the photographs. Ensure the resource is created in the `europe-west4` region and `europe-west4-b` zone.

Click *Check my progress* to verify the objective.

Create a bucket called `qwiklabs-gcp-02-44c8ef7a6ef7-bucket`

**Check my progress**

### **Task 2. Create a Pub/Sub topic**

Create a Pub/Sub topic called `topic-memories-433` for the Cloud Function to send messages.

Click *Check my progress* to verify the objective.

Create a Pub/Sub topic called `topic-memories-433`

**Check my progress**

### **Task 3. Create the thumbnail Cloud Function**

Create a Cloud Function `memories-thumbnail-creator` that will to create a thumbnail from an image added to the `qwiklabs-gcp-02-44c8ef7a6ef7-bucket` bucket. Ensure the Cloud Function is using the 2nd Generation environment. Ensure the resource is created in the `europe-west4` region and `europe-west4-b` zone.

1. Create a Cloud Function called `memories-thumbnail-creator`
    

**Note:** The Cloud Function is required to executes every time an object is created in the bucket created in Task 1. During the process Cloud Function may request permission to enable APIs. Please enable each of the required APIs as requested.

2. Make sure you set the **Entry point** (Function to execute) to `memories-thumbnail-creator` and **Trigger** to `Cloud Storage`.
    
3. Add the following code to the `index.js`:
    

```javascript
const functions = require('@google-cloud/functions-framework');
const crc32 = require("fast-crc32c");
const { Storage } = require('@google-cloud/storage');
const gcs = new Storage();
const { PubSub } = require('@google-cloud/pubsub');
const imagemagick = require("imagemagick-stream");

functions.cloudEvent('memories-thumbnail-creator', cloudEvent => {
  const event = cloudEvent.data;

  console.log(`Event: ${event}`);
  console.log(`Hello ${event.bucket}`);

  const fileName = event.name;
  const bucketName = event.bucket;
  const size = "64x64"
  const bucket = gcs.bucket(bucketName);
  const topicName = "topic-memories-433";
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

Verify the thumbnail was successfully created.

**Note:** If you get a permission denied error stating it may take a few minutes before all necessary permissions are propagated to the Service Agent, wait a few minutes and try again. Ensure you have the relevant roles (Eventarc Service Agent, Eventarc Event Receiver, Service Account Token Creator, and Pub/Sub Publisher) assigned to the correct service accounts.

Click *Check my progress* to verify the objective.

Verify the Cloud Function

**Check my progress**

### **Task 4. Test the Infrastructure**

You must upload one JPG or PNG image into the bucket

1. Upload a PNG or JPG image to `qwiklabs-gcp-02-44c8ef7a6ef7-bucket` bucket.
    

**Note:** Alternatively Download this image [`https://storage.googleapis.com/cloud-training/gsp315/map.jpg`](https://storage.googleapis.com/cloud-training/gsp315/map.jpg) to your machine. Then upload it to the bucket.

2. You will see a thumbnail image appear shortly afterwards (use **REFRESH** in the bucket details).
    

### **Task 5. Remove the previous cloud engineer**

You will see that there are two users defined in the project.

* One is your account ([`student-03-105022fae008@qwiklabs.net`](mailto:student-03-105022fae008@qwiklabs.net) with the role of Owner).
    
* The other is the previous cloud engineer ([`student-00-a654209f5cea@qwiklabs.net`](mailto:student-00-a654209f5cea@qwiklabs.net) with the role of Viewer).
    

1. Remove the previous cloud engineer’s access from the project.
    

---

### Solution of Lab

%[https://www.youtube.com/watch?v=62XOk9utmzE] 

```apache
export USERNAME2=
export ZONE=
export TOPIC_NAME=
export FUNCTION_NAME=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723085454902/2bc0a157-58b2-495a-a50b-e2e8fb9885ba.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Set%20Up%20an%20App%20Dev%20Environment%20on%20Google%20Cloud%20Challenge%20Lab/quicklabgsp315.sh
sudo chmod +x quicklabgsp315.sh
./quicklabgsp315.sh
```