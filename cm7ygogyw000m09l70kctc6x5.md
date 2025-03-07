---
title: "De-identify DICOM Data with the Healthcare API - GSP626"
seoTitle: "De-identify DICOM Data with the Healthcare API - GSP626"
seoDescription: "In this lab, you will discover and use the de-identification functionality of Cloud Healthcare API using Digital Imaging and Communications in Medicine (DIC"
datePublished: Fri Mar 07 2025 07:35:52 GMT+0000 (Coordinated Universal Time)
cuid: cm7ygogyw000m09l70kctc6x5
slug: de-identify-dicom-data-with-the-healthcare-api-gsp626
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741332767910/59199d98-5cef-4106-aa31-15874d26a6ac.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1741332937135/6af9501f-cc5c-4eaf-acc5-1d259305d4f1.png
tags: de-identify-dicom-data-with-the-healthcare-api-gsp626, de-identify-dicom-data-with-the-healthcare-api, gsp626

---

## **Overview**

In this lab, you will discover and use the de-identification functionality of Cloud Healthcare API using Digital Imaging and Communications in Medicine (DICOM) data model.

In this lab, you will:

* Gain a general understanding of Cloud Healthcare API and its role in managing healthcare data.
    
* Learn how to create Cloud Healthcare API datasets and stores.
    
* Import and Export DICOM data using the Cloud Healthcare API.
    

## **Setup and requirements**

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
    student-04-af3272fba91b@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    cvbXVoRppFG9
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

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-c58d2ed1509d`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-c58d2ed1509d
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-af3272fba91b@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-01-c58d2ed1509d
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Create Healthcare dataset**

In this exercise you will use the UI to create a Cloud Healthcare API dataset.

1. On the Google Cloud console title bar, type `Healthcare browser` in the Search field and press **Enter**, then click **Browser** in the search results.
    
2. On the **Product Details** page that opens, click **Enable** to enable the Cloud Healthcare API.
    
3. Once the API is enabled, in the Healthcare browser, select **Create Dataset**.
    
4. Name the dataset **dataset1** within the region `us-central1` and click **Create**.
    

![The Create dataset page displaying the populated dataset name](https://cdn.qwiklabs.com/r1S2tOupBoh9%2FITfrw0reEKmfxGsxS8CJMBpxlf%2F2NE%3D align="left")

Click *Check my progress* to verify the objective.

Create Healthcare Dataset

Check my progress

## **Task 2. Set up IAM permissions**

1. From the **Navigation menu** (), go to **IAM & Admin** &gt; **IAM**.
    
2. On the **IAM** page, select the **Include Google-provided role grants** checkbox.
    
3. Edit the permissions for your **Healthcare Service Agent** by locating the service agent under the IAM list and selecting the pencil icon. The service account will have the Domain @gcp-sa-healthcare.iam.gserviceaccount.com.
    
4. Click **Add another role** to add additional roles to the Healthcare Service Agent account.
    
5. Click inside the **Select a role** box and choose the following roles:
    

* **Cloud Storage &gt; Storage Object Admin**
    
* **Cloud Healthcare &gt; Healthcare Dataset Administrator**
    
* **Cloud Healthcare &gt; Healthcare DICOM Editor**
    

6. After all of the roles are added, click **Save** to update the policy.
    

## **Task 3. Enable data access logs on Cloud Healthcare**

1. From the IAM & Admin menu, navigate to **Audit Logs**.
    
2. Scroll or use the filter box to locate **Cloud Healthcare**, then check the box next to it to select.
    
3. If the info panel isn't already open on the right side of the interface, click the **Show Info Panel** button.
    
4. Select the **Data read** and **Data write** checkboxes, then click **Save**.
    

![The Log Type tabbed page displaying the selected Data Read and Data Write checkboxes](https://cdn.qwiklabs.com/%2BTOBXGlPC%2F9JORNl%2FNpJEa5HeZH9TJf71RsiVULlGm0%3D align="left")

Click *Check my progress* to verify the objective.

Set up IAM Permissions

Check my progress

## **Task 4. Define variables needed**

* In Cloud Shell, export the variables needed for the lab:
    

```apache
export PROJECT_ID=`gcloud config get-value project`
export REGION=us-central1
export DATASET_ID=dataset1
export DICOM_STORE_ID=dicomstore1
```

## **Task 5. Create data stores**

Data in Cloud Healthcare API datasets and stores can be accessed and managed using a REST API that identifies each store using its project, location, dataset, store type and store name. This API implements modality-specific standards for access that are consistent with industry standards for that modality. For example, the Cloud Healthcare DICOM API natively provides operations for reading DICOM studies and series that are consistent with the DICOMweb standard, and supports the DICOM DIMSE C-STORE protocol via an [open-source adapter](https://github.com/GoogleCloudPlatform/healthcare/tree/master/imaging/dicom_adapter).

1. Call the API to create a DICOM store:
    

```apache
gcloud beta healthcare dicom-stores create $DICOM_STORE_ID --dataset=$DATASET_ID --location=$REGION
```

The server returns a path to the newly created store.

Users can also use the `curl` utility to issue Cloud Healthcare API calls. `curl` is pre-installed in your Cloud Shell machine. By default, `curl` does not show HTTP status codes or session-related information; if you would like to see this information please add the `-v` option to all commands in this tutorial.

2. Try creating a secondary FHIR store by using the below command:
    

```apache
curl -X POST \
     -H "Authorization: Bearer "$(sudo gcloud auth print-access-token) \
     -H "Content-Type: application/json; charset=utf-8" \
"https://healthcare.googleapis.com/v1beta1/projects/$PROJECT_ID/locations/$REGION/datasets/$DATASET_ID/dicomStores?dicomStoreId=dicomstore2"
```

Operations that access a modality-specific store use a request path that is comprised of two pieces: a base path, and a modality-specific request path.

Administrative operations—which generally operate only on locations, datasets and stores—may only use the base path. Data modality-specific retrieval operations use both the base path (for identifying the store to be accessed) and request path (for identifying the actual data to be retrieved).

Click *Check my progress* to verify the objective.

Create data stores

Check my progress

**Note:** If this check fails, wait a minute and try again. It often takes a minute or two for the import operation to be logged.

## **Task 6. Import to DICOM datasets**

In this section you will be importing data from the NIH Chest x-ray data set to a DICOM store. For more information on the public dataset, visit the [NIH Chest X-ray dataset documentation](https://cloud.google.com/healthcare/docs/resources/nih-chest).

* Call the API to use the import functionality:
    

```apache
gcloud beta healthcare dicom-stores import gcs $DICOM_STORE_ID --dataset=$DATASET_ID --location=$REGION --gcs-uri=gs://spls/gsp626/LungCT-Diagnosis/R_004/*
```

Click *Check my progress* to verify the objective.

Import to DICOM Datasets

Check my progress

## **Task 7. Configure OHIF Viewer**

The Open Health Imaging Foundation (OHIF) Viewer is an open source, web-based, medical imaging viewer. You will use **OHIF Viewer** in this lab to view your DICOM dataset.

The following steps will walk through setting up **OHIF Viewer** to view your dataset:

1. First, select **APIs & Services** **\&gt;** **OAuth Consent Screen** from the Navigation menu to create an OAuth Consent screen.
    
2. On the **Google Auth Platform** page, select **Branding**.
    

* App name: **QL-de-identify**
    
* User support email: **YOUR STUDENT EMAIL** (this is provided by the lab)
    
* Developer contact information: **YOUR STUDENT EMAIL** (same value as *user support email*)
    

![The populated Edit app registration window](https://cdn.qwiklabs.com/C43YgjyVEL%2FD%2FIBWdEXugVkda2RY2DGlKATgKQdw8wY%3D align="left")

3. For **Audience** user type is set to **Internal** by default.
    

![The User Type section displaying the selected Intenal option and highlighted Create button](https://cdn.qwiklabs.com/LhqbK7TYR41ahGIeZ8Ciz%2FsVWqzx7VEXfFq0xGcjCa4%3D align="left")

4. Go to **Data Access** page, click on **ADD OR REMOVE SCOPES**.
    
5. Scroll to the bottom of the pop-up window to the **Manually add scopes** section..
    
6. Add the following scopes:
    

```apache
https://www.googleapis.com/auth/cloudplatformprojects.readonly
https://www.googleapis.com/auth/cloud-healthcare
```

![The Manually add scope section displaying the aforementioned scopes](https://cdn.qwiklabs.com/fHvbEmjSafVuozjTgl5RNIda1vqgojtIto5sM1bJBrg%3D align="left")

7. Click **Add to table** and then click **Update**.
    
8. Scroll to the bottom of the **Data Access** page and click **SAVE**.
    

Next, you'll need an **OAuth Client ID** to connect **OHIF Viewer** to your **Cloud Healthcare** resources.

1. Select **Credentials** from the **APIS & Services** menu.
    
2. On the **Credentials** page, click **\+ Create Credentials** &gt; **OAuth Client ID**:
    

![The expanded Create Credentials menu displaying the selected OAuth Client ID option](https://cdn.qwiklabs.com/UWJv7cUQ%2FVNbZDwZp9jKXoE%2BseqbtvQFWfZGKUx38nA%3D align="left")

3. For your **Application Type**, choose **Web application**.
    

You will need to return to your client ID and fill out the domains once your **OHIF Viewer** application has been launched.

4. So, for now, leave everything as default and click **Create**.
    

You'll now the see your **Client ID** and **Client Secret** in the next window.

5. Click **OK** to close the window.
    

Now, deploy the **OHIF Viewer** container to **Cloud Run** and connect it with your OAuth Client ID.

To simplify the setup, the **OHIF Viewer** docker image already exists in **container registry** in a project you have access to, so you can directly deploy the container to **Cloud Run**.

1. In **Cloud Shell**, deploy the **OHIF Viewer** container to **Cloud Run** with this command substituting `PASTE-CLIENT-ID-HERE` with the **Client ID** of the OAuth Client you just created:
    

```apache
gcloud run deploy ohif-viewer --image=gcr.io/qwiklabs-resources/ohif-viewer:latest --platform=managed --region=us-central1 --allow-unauthenticated --set-env-vars=CLIENT_ID=[PASTE-CLIENT-ID-HERE] --max-instances=3
```

**Note:** You can view and copy your Client ID in the **Credentials** tab:

![The copy paste icon alongside the client ID on the OAuth 2.0 Client IDs page](https://cdn.qwiklabs.com/H%2FsJmcqUT76e8c7v3L3I%2F%2BYxzi4WtiiofLYAhlTyqBg%3D align="left")

2. If asked to enable the **Cloud Run** API, enter **y** and continue.
    

Once your Cloud Run deployment completes, you will be given a **unique** service URL that looks similar to this:

```apache
Service URL: https://ohif-viewer-ratpkirjdq-uc.a.run.app
```

3. You can now return to your OAuth Client ID and update the domains with this **Service URL**.
    
4. If you're not still on the **Credentials** page, select **APIs & Services** &gt; **Credentials** from the Navigation menu in the Cloud console.
    
5. Edit your Client ID by clicking the pencil icon.
    

![The pencil icon highlighted alongside the client ID on the OAuth 2.0 Client IDs page](https://cdn.qwiklabs.com/%2BOcF5%2F1jYA9n3a%2B8zifs6oyXW3t8vx3JJxEZkiuCFxU%3D align="left")

6. Add your **unique** service URI to **Authorized Javascript Origins**.
    
7. Add your **unique** service URI + `/callback` to **Authorized Redirect URIs**.
    
8. Click **Save**.
    

## **Task 8. Using De-identification**

De-identification (redacting or transformation) of sensitive data elements is often an important step in pre-processing healthcare data so that it can be made available for analysis, machine learning models, and other use cases. Cloud Healthcare API has the capability to de-identify data stored in the service, facilitating analysis by researchers or machine learning analysis for advanced anomaly scans.

1. First, navigate to the service URL of your **ohif-viewer** Cloud Run app and sign in using your lab credentials. If you've lost track of your service URL, you can find it again with this command:
    

```apache
gcloud run services list --platform managed
```

2. Once on the **OHIF-Viewer** page, select your **Project ID** for the **Project**.
    

![The Google Cloud Healthcare API window displaying the list of Projects and their IDs](https://cdn.qwiklabs.com/RBdWNEKc7OGtnHg%2BpP0bps2Zk24ze5CE2bxMqjc79k8%3D align="left")

3. Select `us-central1` for the location.
    
4. Select **dataset1** for your dataset.
    
5. Select **dicomstore1** in the DICOM Store window.
    

You'll see one entry, **R\_004** with info for its ID number, Study Date, and Description:

6. Click on the entry to inspect it further and view the associated images.
    
7. This dataset contains pre-surgery images of a chest. You can scroll through them to view them all.
    
8. When you're done looking at it, press the **Back** button on your browser to return to the **OHIF-Viewer** main menu.
    

Next, you will de-identify this dataset.

1. Navigate back to Cloud Shell and issue the following request to de-identify the dataset:
    

```apache
curl -X POST \
    -H "Authorization: Bearer "$(gcloud auth print-access-token) \
    -H "Content-Type: application/json; charset=utf-8" \
    --data "{
      'destinationDataset': 'projects/$PROJECT_ID/locations/$REGION/datasets/de-id',
      'config': {
        'dicom': {
          'filterProfile': 'ATTRIBUTE_CONFIDENTIALITY_BASIC_PROFILE'
        },
        'image': {
          'textRedactionMode': 'REDACT_NO_TEXT'
        }
      }
    }" "https://healthcare.googleapis.com/v1beta1/projects/$PROJECT_ID/locations/$REGION/datasets/$DATASET_ID:deidentify"
```

With our small dataset, this operation will be done quickly, but on a larger dataset this operation can take a few minutes.

2. You can issue a rest request to check the status of a long running operation, replacing `<operation-ID>` with the operations ID issued in the previous output:
    

```apache
curl -X GET \
"https://healthcare.googleapis.com/v1beta1/projects/$PROJECT_ID/locations/$REGION/datasets/$DATASET_ID/operations/<operation-id>" \
-H "Authorization: Bearer "$(sudo gcloud auth print-access-token) \
-H 'Content-Type: application/json; charset=utf-8'
```

If you see `"done": true` in the output of the previous command, you can be sure that your operation is complete.

Once the operation is complete a new `de-id` dataset will appear on the Healthcare UI page in the console.

1. Confirm the identifiable information has been redacted by returning to your `OHIF-Viewer` browser tab and selecting the **Change DICOM Store** button.
    
2. In the window that pops up, select your Qwiklabs **Project ID** as the Project.
    
3. Select `us-central1` for the location.
    
4. Select **de-id** as the dataset.
    
5. Select **dicomstore1** for the DICOM Store.
    

You'll now see one entry in the DICOM Store, but the outward facing information/tags have been removed:

6. Select the entry to confirm it's the same images copied from the previous dataset but with most of its information removed.
    

Click *Check my progress* to verify the objective.

Using De-identification

Check my progress

## **Task 9. Converting DICOM Images**

From the **Navigation menu**, navigate to **Cloud Storage** &gt; **Buckets**.

1. Click **Create bucket**.
    
2. Fill out the first box with a unique name and click **Continue**.
    
3. Set the Location type to **Region** and select the region `us-central1`.
    
4. Click **Create**.
    
5. If prompted **Public access will be prevented**, click **Confirm**.
    
6. Using Cloud Shell export the variable for your newly created bucket, replacing with you bucket's name:
    

```apache
export BUCKET_ID=<name of bucket>
```

Now you can export the DICOM images into JPEG or PNG using a `gcloud` command.

7. Export the DICOM images into JPEG:
    

```apache
gcloud beta healthcare dicom-stores export gcs $DICOM_STORE_ID --dataset=$DATASET_ID --gcs-uri-prefix=gs://$BUCKET_ID/ --mime-type="image/jpeg; transfer-syntax=1.2.840.10008.1.2.4.50" --location=$REGION
```

**OR**

Export the DICOM images into PNG:

```apache
gcloud beta healthcare dicom-stores export gcs $DICOM_STORE_ID --dataset=$DATASET_ID --gcs-uri-prefix=gs://$BUCKET_ID/ --mime-type="image/png" --location=$REGION
```

8. In the Cloud console, from the **Navigation menu**, navigate to **Cloud Storage** and click on your bucket.
    
9. Select a folder, click on an image, then click on the Link URL. This will download the image.
    
10. You can check the file extension to verify your file is correct or click the image to view.
    

Click *Check my progress* to verify the objective.

Converting DICOM Images

---

## Solution of Lab

%[https://youtu.be/lIBzejSxSsM] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1741333101270/17553f63-583d-4f7e-8921-b52231af620a.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/De-identifying%20DICOM%20Data%20with%20the%20Healthcare%20API/gsp626.shsudo chmod +x gsp626.sh
./gsp626.sh
```