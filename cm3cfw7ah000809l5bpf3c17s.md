---
title: "Classify Images of Clouds in the Cloud with AutoML Images - GSP223"
seoTitle: "Classify Images of Clouds in the Cloud with AutoML Images - GSP223"
seoDescription: "AutoML helps developers with limited ML expertise train high quality image recognition models. Once you upload images to the AutoML UI, you can generate pre"
datePublished: Mon Nov 11 2024 03:04:07 GMT+0000 (Coordinated Universal Time)
cuid: cm3cfw7ah000809l5bpf3c17s
slug: classify-images-of-clouds-in-the-cloud-with-automl-images-gsp223
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745291478560/021f3d80-5326-43e1-ac75-3bf7b121b280.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745291696796/cf6f42d2-57b5-49d0-9b4d-3016e8640ce0.png
tags: classify-images-of-clouds-in-the-cloud-with-automl-images-gsp223, gsp223, classify-images-of-clouds-in-the-cloud-with-automl-images

---

## **Overview**

AutoML helps developers with limited ML expertise train high quality image recognition models. Once you upload images to the AutoML UI, you can generate predictions against a pre-trained model via an easy to use REST API. In this lab, you upload images to Cloud Storage and use them to generate predictions from a pre-trained AutoML model.

## **Objectives**

In this lab, will:

* Upload a labeled dataset to Cloud Storage and connect it to AutoML with a CSV label file.
    
* Generate predictions against a pre-trained model.
    

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
    student-01-8e9d5cd27697@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    PosA0g3U3cu8
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-473c632f3474`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-473c632f3474
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
ACCOUNT: student-01-8e9d5cd27697@qwiklabs.net

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
project = qwiklabs-gcp-01-473c632f3474
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Set up AutoML**

AutoML provides an interface for all the steps in training an image classification model and generating predictions on it. Start by enabling the Cloud AutoML API.

1. From the **Navigation menu**, select **APIs & Services** &gt; **Library**.
    
2. In the search bar type in "Cloud AutoML".
    
3. Observe the **Cloud AutoML API** is in the **Enable** state.
    
4. In a new browser, open the [AutoML UI](https://console.cloud.google.com/vertex-ai).
    

### Create storage bucket

1. Now create a storage bucket by running the following:
    

```apache
gsutil mb -p $GOOGLE_CLOUD_PROJECT \
    -c standard    \
    -l us \
    gs://$GOOGLE_CLOUD_PROJECT-vcm/
```

2. In the Google Cloud console, open the **Navigation menu** and click on **Cloud Storage** to see it.
    

Click **Check my progress** to verify the objective.

Create a Cloud Storage Bucket

Check my progress

## **Task 2. Upload training images to Cloud Storage**

In order to train a model to classify images of clouds, you need to provide labelled training data so the model can develop an understanding of the image features associated with different types of clouds. In this example your model will learn to classify three different types of clouds: cirrus, cumulus, and cumulonimbus. To use AutoML you need to put your training images in Cloud Storage.

1. Before adding the cloud images, create an environment variable with the name of your bucket.
    

Run the following command in Cloud Shell:

```apache
export BUCKET=$GOOGLE_CLOUD_PROJECT-vcm
```

The training images are publicly available in a Cloud Storage bucket.

2. Use the `gsutil` command line utility for Cloud Storage to copy the training images into your bucket:
    

```apache
gsutil -m cp -r gs://spls/gsp223/images/* gs://${BUCKET}
```

3. When the images finish copying, click the **Refresh** button at the top of the Storage browser, then click on your bucket name. You should see 3 folders of photos for each of the 3 different cloud types to be classified.
    

If you click on the individual image files in each folder you can see the photos you'll be using to train your model for each type of cloud.

## **Task 3. Create a dataset**

Now that your training data is in Cloud Storage, you need a way for AutoML to access it. You'll create a CSV file where each row contains a URL to a training image and the associated label for that image. This CSV file has been created for you; you just need to update it with your bucket name.

1. Run the following command to copy the file to your Cloud Shell instance:
    

```apache
gsutil cp gs://spls/gsp223/data.csv .
```

2. Then update the CSV with the files in your project:
    

```apache
sed -i -e "s/placeholder/${BUCKET}/g" ./data.csv
```

3. Now upload this file to your Cloud Storage bucket:
    

```apache
gsutil cp ./data.csv gs://${BUCKET}
```

4. Once that command completes, click the **Refresh** button at the top of the Storage browser. Confirm that you see the `data.csv` file in your bucket.
    
5. Open the [Vertex AI Dataset tab](https://console.cloud.google.com/vertex-ai/datasets). Your page should now resemble the following:
    

![Google Cloud Console, Datasets page](https://cdn.qwiklabs.com/1zs6Bl1xWPlxV1gt1uF%2FCJP7Ztuf1s7igih%2BXgk0z70%3D align="left")

6. At the top of the console, click **\+ Create**.
    
7. Type "clouds" for the Dataset name.
    
8. Select **Image classification (Single-label)**.
    

**Note:** In your own projects, you may want to use [multi-class classification](https://cloud.google.com/vision/automl/docs/datasets).

9. Click **Create**.
    
10. Choose **Select import files from Cloud Storage** and add the file name to the URL for the file you just uploaded - `your-bucket-name/data.csv`
    

An easy way to get this link is to go back to the Cloud Console, click on the `data.csv` file and then go to the URI field.

11. Click **Continue**.
    

It will take 2 - 5 minutes for your images to import. Once the import has completed, you'll be brought to a page with all the images in your dataset.

Click **Check my progress** to verify the objective.

Create a Dataset

Check my progress

## **Task 4. Inspect images**

After the import completes, you will be redirected to **Browse** tab to see the images you uploaded.

![Image tiles on the Images tabbed page](https://cdn.qwiklabs.com/XXKQ696iJv%2BulyXtFYH6K1P9G0PFcaiN%2BQ7wu0w3qAE%3D align="left")

Try filtering by different labels in the left menu (i.e. click cumulus) to review the training images:

**Note:** If you were building a production model, you'd want *at least* 100 images per label to ensure high accuracy. This is just a demo so only 20 images were used so the model could train quickly.

If any images are labeled incorrectly you can click on the image to switch the label:

![Image 12 of 50](https://cdn.qwiklabs.com/aY7fkDJBpEKdzDOi9ugeZajUJWJdivpgpbMSkQqOqak%3D align="left")

**Note:** If you are working with a dataset that isn't already labeled, AutoML provides an in-house [human labeling service](https://cloud.google.com/vision/automl/docs/human-labeling) .

Given that model training requires significant time, you will utilize a pre-trained model for this lab. In the following section, you will use this model to generate predictions on the images you uploaded in the previous section.

## **Task 5. Generate predictions**

There are a few ways to generate predictions. In this lab, you'll use the UI to upload images and see how your model does classifying these two images (the first is a cirrus cloud, the second is a cumulonimbus).

1. Return to the **Cloud Shell** terminal.
    
2. Download these images to your local machine.
    

```apache
gsutil cp gs://spls/gsp223/examples/* .
```

3. View the example file `CLOUD1-JSON`:
    

```apache
cat CLOUD1-JSON
```

Example Output:

```json
{
  "instances": [{
    "content": "YOUR_IMAGE_BYTES"
  }],
  "parameters": {
    "confidenceThreshold": 0.5,
    "maxPredictions": 5
  }
}
```

4. Copy the Endpoint value to an environment variable:
    

```apache
ENDPOINT=$(gcloud run services describe automl-service --platform managed --region us-central1 --format 'value(status.url)')
```

5. Enter the following command to request a prediction:
    

```apache
curl -X POST -H "Content-Type: application/json" $ENDPOINT/v1 -d "@${INPUT_DATA_FILE}" | jq
```

The above call will ask AutoML for a prediction. However there is no input data specified, so the request will fail. The 400 HTTP error code indicates the expected data is not present.

Expected Output:

```json
{
  "error": {
    "code": 400,
    "message": "Empty instances.",
    "status": "INVALID_ARGUMENT"
  }
}
```

## **Task 6. Pop Quiz**

Test your understanding of AutoML by completing the short quiz on the topics covered in this lab. Use the knowledge you have gained in the lab to generate predictions.

![cloud image 1](https://cdn.qwiklabs.com/N2psyplM3kFK9NEjjpak3CPIhh8IurY7Tn9vqzi4r8M%3D align="left")

What type of cloud is in the above image?cumulonimbuscumuluscirrus

Submit

Check if the model can predict the type of cloud in the image:

1. Set `CLOUD1-JSON` as the input file.
    

```apache
INPUT_DATA_FILE=CLOUD1-JSON
```

2. Enter the following command to request a prediction:
    

```apache
curl -X POST -H "Content-Type: application/json" $ENDPOINT/v1 -d "@${INPUT_DATA_FILE}" | jq
```

![cloud image 2](https://cdn.qwiklabs.com/GZlBRmAKGzsDoT8yNRCh6VmxflxLEQEkiKPohYwja94%3D align="left")

What type of cloud is in the above image?cirruscumuluscumulonimbus

Submit

Check if the model can predict the type of cloud in the image:

3. Set `CLOUD2-JSON` as the input file.
    

```apache
INPUT_DATA_FILE=CLOUD2-JSON
```

4. Enter the following command to request a prediction:
    

```apache
curl -X POST -H "Content-Type: application/json" $ENDPOINT/v1 -d "@${INPUT_DATA_FILE}" | jq
```

---

## Solution of Lab

%[https://youtu.be/oVRkruz0t28] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Classify%20Images%20of%20Clouds%20in%20the%20Cloud%20with%20AutoML%20Images/gsp223.sh
sudo chmod +x gsp223.sh
./gsp223.sh
```

* Type **clouds** for the Dataset name.