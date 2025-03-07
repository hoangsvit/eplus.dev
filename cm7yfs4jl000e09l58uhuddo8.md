---
title: "Secure Software Supply Chain: Using Cloud Build & Cloud Deploy to Deploy Containerized Applications - GSP1092"
seoTitle: "Secure Software Supply Chain: Using Cloud Build & Cloud Deploy to Depl"
seoDescription: "In this lab, you use Cloud Build to create a containerized "Hello, World!" application, store the container in Artifact Registry, and deploy the contianer t"
datePublished: Fri Mar 07 2025 07:10:42 GMT+0000 (Coordinated Universal Time)
cuid: cm7yfs4jl000e09l58uhuddo8
slug: secure-software-supply-chain-using-cloud-build-and-cloud-deploy-to-deploy-containerized-applications-gsp1092
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741331261892/ba417d14-b0a6-41ee-ad16-2a7d38edc231.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1741331430329/4057f48a-1bf8-431a-b87d-4abbe61b5a56.png
tags: secure-software-supply-chain-using-cloud-build-and-cloud-deploy-to-deploy-containerized-applications-gsp1092, secure-software-supply-chain-using-cloud-build-and-cloud-deploy-to-deploy-containerized-applications, gsp1092

---

## **Overview**

In this lab, you use Cloud Build to create a containerized "Hello, World!" application, store the container in Artifact Registry, and deploy the contianer to Cloud Run.

## **Objectives**

In this lab, you will learn how to:

* Build a sample application container using Cloud Build
    
* Store the application container in Artifact Registry
    
* Set up a Cloud Deploy Pipeline
    
* Deploy the sample application to Cloud Run
    

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
    student-04-7f8539196173@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    ythXfXyFPg7i
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-aee8de607991`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-aee8de607991
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
ACCOUNT: student-04-7f8539196173@qwiklabs.net

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
project = qwiklabs-gcp-03-aee8de607991
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Set Environment Variables**

1. Open the **Cloud Shell Terminal**.
    
2. Set the PROJECT environment variable:
    
    ```apache
    export PROJECT=$(gcloud config get-value project)
    ```
    

## **Enable Required Services**

1. From the **Cloud Shell Terminal** run the following to enable required services:
    

```apache
gcloud services enable run.googleapis.com
```

## **Task 1. Create Artifact Registry repository**

1. In the **Cloud Shell Terminal**, run the following command to create an Artifact Registry repository:
    
    ```apache
    gcloud artifacts repositories create helloworld-repo --location=us-central1 --repository-format=docker --project=$PROJECT
    ```
    

Click **Check my progress** to verify the objective.

Create Artifact Regsitry repository

Check my progress

## **Task 2. Write a Sample Application**

Write a sample Node.js application to build and deploy on Cloud Run.

1. In the **Cloud Shell Terminal**, Create a new directory named `helloworld` and change directory into it:
    
    ```apache
    mkdir helloworld
    cd helloworld
    ```
    
2. Open the **Cloud Shell Editor**.
    
3. Create a `package.json` file in the `helloworld` directory with the following contents:
    

```json
{
  "name": "helloworld",
  "description": "Simple hello world sample in Node",
  "version": "1.0.0",
  "private": true,
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "engines": {
    "node": ">=12.0.0"
  },
  "author": "Google LLC",
  "license": "Apache-2.0",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

4. In the same directory, create an `index.js` file with the following contents:
    

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
```

## **Task 3. Build the Sample Application**

1. Change directory into the `helloworld` folder.
    
    ```apache
    cd ~/helloworld
    ```
    
2. Submit the build to Cloud Build using the following `gcloud` command:
    
    ```apache
    gcloud builds submit --pack image=us-central1-docker.pkg.dev/$PROJECT/helloworld-repo/helloworld
    ```
    
3. In the Navigation menu (), click **Cloud Build**.
    
4. In the Navigation pane, click **History**.
    
5. In the **Region** drop-down, select **Global**.
    
6. Click the **Build ID** to view the results of the build.
    

## **Task 4. Set up Cloud Deploy resources**

### Prepare your Skaffold configuration

Google Cloud Deploy uses [Skaffold](https://cloud.google.com/deploy/docs/using-skaffold) to provide the details for what to deploy and how to deploy it properly for your separate [targets](https://cloud.google.com/deploy/docs/terminology#target).

In this quickstart, you create a `skaffold.yaml` file, which identifies the Kubernetes manifest to be used to deploy the sample app.

1. Make a new directory for your manifests, and navigate into it:
    
    ```apache
    mkdir ~/deploy-cloudrun
    cd ~/deploy-cloudrun
    ```
    
2. Create the `skaffold.yaml` file in this directory. `skaffold.yaml` tells Google Cloud Deploy which manifests to deploy for each target in the pipeline, for a given release.
    

```apache
apiVersion: skaffold/v3alpha1
kind: Config
metadata:
  name: deploy-run-quickstart
profiles:
- name: dev
  manifests:
    rawYaml:
    - run-dev.yaml
- name: prod
  manifests:
    rawYaml:
    - run-prod.yaml
deploy:
  cloudrun: {}
```

### Prepare your Cloud Run services

Here you'll create two different Cloud Run services in the same project by using manifests with Skaffold profiles.

1. Create the `run-dev.yaml` file in the `~/deploy-cloudrun/` directory. This declarative manifest represents the `dev` environment version of your Cloud Run service.
    

```apache
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: helloworld-dev
spec:
  template:
    spec:
      containers:
      - image: my-app-image
```

2. Create the `run-prod.yaml` file, in this same directory.
    

```apache
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: helloworld-prod
spec:
  template:
    spec:
      containers:
      - image: my-app-image
```

### Create your delivery pipeline and targets

1. In the directory with your recently created manifests (`~/deploy-cloudrun/`), create the `clouddeploy.yaml` file. Replace `$PROJECT_ID` with the value of your own project ID.
    

```apache
apiVersion: deploy.cloud.google.com/v1
kind: DeliveryPipeline
metadata:
 name: my-run-demo-app-1
description: main application pipeline
serialPipeline:
 stages:
 - targetId: run-dev
   profiles: [dev]
 - targetId: run-prod
   profiles: [prod]
---
  
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name: run-dev
description: Cloud Run development service
run:
 location: projects/$PROJECT_ID/locations/us-central1
---

apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name: run-prod
description: Cloud Run production service
run:
 location: projects/$PROJECT_ID/locations/us-central1
```

2. Register the delivery pipeline and targets with Google Cloud Deploy:
    

```apache
gcloud deploy apply --file clouddeploy.yaml --region=us-central1
```

**Note:** If asked to enable the Cloud Deploy API enter **y** and continue.

The output will look like this:

```apache
Waiting for the operation on resource projects/sample-project/locations/us-central1/deliveryPipelines/my-run-demo-app-1...done.
Created Cloud Deploy resource: projects/sample-project/locations/us-central1/deliveryPipelines/my-run-demo-app-1.
Waiting for the operation on resource projects/sample-project/locations/us-central1/targets/run-dev...done.
Created Cloud Deploy resource: projects/sample-project/locations/us-central1/targets/run-dev.
Waiting for the operation on resource projects/sample-project/locations/us-central1/targets/run-prod...done.
Created Cloud Deploy resource: projects/sample-project/locations/us-central1/targets/run-prod.
```

Click **Check my progress** to verify the objective.

Create the delivery pipeline and targets

Check my progress

### Create a release and deploy the container

With the configuration files prepared and the delivery pipeline and targets registered, we can now create the release resource that represents the container image to deploy. We'll use the `helloworld` container image we built earlier.

1. In the **Cloud Shell Terminal**, run the following command:
    
    ```apache
    gcloud deploy releases create run-release-001 --project=$PROJECT --region=us-central1 --delivery-pipeline=my-run-demo-app-1 --images=my-app-image="us-central1-docker.pkg.dev/$PROJECT/helloworld-repo/helloworld"
    ```
    
    The output will look like this:
    

```apache
Creating temporary tarball archive of 4 file(s) totalling 2.0 KiB before compression.
Uploading tarball of [.] to [gs://sample-project_clouddeploy_us-central1/source/1643560782.447815-aed1fdf4973b4d25b9b7d09ff9fbbaa9.tgz]
Waiting for operation [operation-1643560782826-5d6cf50a08a8d-e40f7a45-ac4aa0ae]...done.
Created Cloud Deploy release run-release-001.
Creating rollout projects/sample-project/locations/us-central1/deliveryPipelines/my-run-demo-app-1/releases/run-release-001/rollouts/run-release-001-to-run-dev-0001 in target run-dev...done.
```

Click **Check my progress** to verify the objective.

Create a release

Check my progress

### Promote the release

Now that the application is deployed in the first target, `run-dev`, promote it to the prod environment.

1. From the **Cloud Deploy** page, click the `my-run-demo-app-1` pipeline.
    

The Delivery pipeline details page shows a graphical representation of your delivery pipeline's progress. In this case, it shows that the release was deployed to the `run-dev` target.

2. On the first target in the delivery pipeline visualization, click **Promote**.
    

The Promote release dialog is shown. It shows the details of the target you're promoting to.

3. Click **Promote**.
    

The release is now queued for deployment into `run-prod`. When deployment is complete, the delivery pipeline visualization shows it as deployed.

Click **Check my progress** to verify the objective.

Promote the release

Check my progress

### Enable unauthenticated access to Cloud Run services

To view the sample application in-browser, we'll enable unauthenticated access to the Cloud Run services.

1. In the **Cloud Shell Terminal**, run the following commands and select the `us-central1` region if promoted:
    
    ```apache
    gcloud run services add-iam-policy-binding helloworld-dev \
      --member="allUsers" \
      --role="roles/run.invoker"
    gcloud run services add-iam-policy-binding helloworld-prod \
      --member="allUsers" \
      --role="roles/run.invoker"
    ```
    

### View helloworld application

1. In the **Navigation menu**, click **Cloud Run**. The list of deployed Cloud Run services appears.
    
2. Click the **helloworld-prod** service. The service details page opens.
    
3. Click the **Copy to clipboard** icon next to the **URL** field.
    
4. Paste the URL into a new browser window and hit enter. The "Hello, World!" message appears in browser.
    

## **Task 5. View Security Insights**

Security insights via Software Delivery Shield are available in the Cloud Build and Cloud Run interfaces.

### Security Insights in Cloud Build

1. In the **Navigation menu**, click **Cloud Build**.
    
2. In the **Navigation pane**, click **History**.
    
3. For **Region**, select **global (non-regional)**.
    
4. Click the 8-digit build ID of the most recent successful build to view the build details.
    
5. Click the **Build Artifacts** tab.
    
6. Click **View** under **Security Insights** for the artifact with the name **helloworld:latest**. A panel pulls out showing security insights for this artifact.
    
7. The security insights show vulnerabilities detected via the Container Scanning API, information on software dependencies, and details on the build process for that container.
    

### Security Insights in Cloud Run

1. In the **Navigation menu**, click **Cloud Run**. The list of deployed Cloud Run services appears.
    
2. Click **helloworld-prod**.
    
3. Click the **Revisions** tab.
    
4. In the right-side panel, click the **Security** tab.
    
5. Similar to Cloud Build, this panel displays information on **Vulnerabilities**, **Dependenices**, and **Build**.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=TfphwqaNcWk] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Secure%20Software%20Supply%20Chain%3A%20Using%20Cloud%20Build%20%26%20Cloud%20Deploy%20to%20Deploy%20Containerized%20Applications/techcps1092.sh
sudo chmod +x techcps1092.sh
./techcps1092.sh
```