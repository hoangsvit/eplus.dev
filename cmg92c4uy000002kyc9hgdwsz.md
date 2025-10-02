---
title: "Secure Software Delivery: Challenge Lab - GSP521"
seoTitle: "Secure Software Delivery: Challenge Lab - GSP521"
seoDescription: "Practice secure software delivery with Google Cloud in this hands-on lab for the Secure Software Delivery course"
datePublished: Thu Oct 02 2025 06:57:28 GMT+0000 (Coordinated Universal Time)
cuid: cmg92c4uy000002kyc9hgdwsz
slug: secure-software-delivery-challenge-lab-gsp521
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759388228855/b3fdadcc-bf6e-43d0-8110-2f7e3d3902ef.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759388031861/f46d3f6b-853f-4984-b4a0-96eac9e65b3c.png
tags: secure-software-delivery-challenge-lab-gsp521, secure-software-delivery, gsp521

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Secure Software Delivery](https://www.cloudskillsboost.google/) course. Are you ready for the challenge?

## Challenge Scenario

You are a software engineer at Cymbal Bank, tasked with securely deploying a new web application to the cloud. The application handles sensitive customer data, so security is paramount. Your goal is to implement a robust, automated pipeline that builds, scans, signs, and deploys the containerized application while adhering to strict security standards. For this challenge, you will use Google Cloud services such as Artifact Registry, Binary Authorization, and Cloud Build to achieve this objective on a sample application.

### Topics tested

* **Create Artifact Registry Repositories:** Set up Artifact Registry repositories to store Docker images for scanning and production.
    
* **Push Docker Images:** Build and push Docker images to Artifact Registry via Cloud Build for vulnerability scanning.
    
* **Set up Binary Authorization:** Configure Binary Authorization with attestors and keys to enforce image signing policies.
    
* **View Vulnerability Scans:** Examine vulnerability scan results within Artifact Registry to identify and understand potential security risks.
    
* **Create a Secure CI/CD Pipeline:** Build a Cloud Build pipeline that automates image building, vulnerability scanning, and image signing.
    
* **Review and Fix:** Analyze a failed build due to critical vulnerabilities and rectify the issues in the application code.
    
* **Rebuild and Deploy:** Re-run the CI/CD pipeline with the fixed code and ensure successful deployment to Cloud Run.
    

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Task 1. Enable APIs and set up the environment

Before you can start building your secure CI/CD pipeline, you need to enable the necessary Google Cloud APIs and set up your development environment. This will ensure that you have access to all the required services and tools.

1. Enable the required APIs for this lab:
    

```apache
gcloud services enable \
  cloudkms.googleapis.com \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  container.googleapis.com \
  containerregistry.googleapis.com \
  artifactregistry.googleapis.com \
  containerscanning.googleapis.com \
  ondemandscanning.googleapis.com \
  binaryauthorization.googleapis.com
```


2. In Cloud Shell, run the following command to download the sample Python, Docker, and Cloud Build files:
    

```apache
mkdir sample-app && cd sample-app
gcloud storage cp gs://spls/gsp521/* .
```


3. Create two Artifact Registry repositories: one for scanning and one for production. Name the repositories `artifact-scanning-repo` and `artifact-prod-repo`, respectively.
    

The scanning repository will be used to store the Docker image before it is scanned for vulnerabilities, while the production repository will store the image after it has been signed and is ready for deployment.

To verify the objective, click **Check my progress**.

Enable APIs and set up Artifact Registries.

## Task 2. Create the Cloud Build pipeline

In this task, you'll lay the foundation for your CI/CD pipeline by creating a basic Cloud Build configuration to build and push your Docker image to Artifact Registry. This initial step will enable you to scan the image for vulnerabilities later in the lab.

1. Start by adding the following roles to the **Cloud Build service account**:
    
    * `roles/iam.serviceAccountUser`
        
    * `roles/ondemandscanning.admin`
        
2. In the **Cloud Shell Editor**, open the `sample-app/cloudbuild.yaml` file.
    
3. **Complete TODOs:** Fill out the image name placeholders (`<image-name>`). For this, you will need to reference the `artifact-scanning-repo` repository, and the image name should be `sample-image`. Make sure to use the region `us-central1`.
    
4. Submit the build.
    
5. Check out the image you pushed to the `artifact-scanning-repo` repository and verify you can see a number of **Critical** vulnerabilities in the scan results.
    

To verify the objective, click **Check my progress**.

Create a Cloud Build pipeline.

## Task 3. Set up Binary Authorization

To enforce strict security policies for container deployments, you'll leverage Binary Authorization. This service allows you to define who can deploy what images, and under which conditions. In this task, you'll create and configure the necessary components of Binary Authorization, including attestors, notes, and KMS keys. This will prepare you to integrate Binary Authorization into your CI/CD pipeline.

### Create an Attestor

1. In Cloud Shell, create a JSON file. This file will define an Attestor note containing the attestation hint. The attestation hint's `human_readable_name` should be set to "Container Vulnerabilities attestation authority".
    
2. Use the Container Analysis API to create a new note with the ID `vulnerability_note`. The note's details should be defined in the note file you created in the previous step. Make sure to include proper authentication and set the appropriate Content-Type header in your API request.
    
3. Use the Container Analysis API to retrieve the details of the Attestor note you just created. Make sure to include proper authentication in your API request.
    
4. Use the `gcloud` command-line tool to create a new Binary Authorization Attestor. The Attestor ID should be **vulnerability-attestor**, and it should be associated with the Attestor note you created earlier.
    
5. Use the `gcloud` command-line tool to list all existing Binary Authorization Attestors. Verify that the Attestor you just created is included in the list.
    
6. Construct an IAM policy that grants the Binary Authorization service account the `roles/containeranalysis.notes.occurrences.viewer` role on the Attestor note you created. Then, use the Container Analysis API to set this IAM policy on the note.
    

### Generate a KMS Pair

In this section, you will generate a KMS key pair to sign attestations.

1. Set up Key Management:
    
    * Create a KMS keyring named `binauthz-keys` in the `global` location to store the keys.
        
    * Within this keyring, generate a new asymmetric signing key pair. Name this key `lab-key` and make sure it's **version 1**.
        
2. Link Key to Attestor:
    
    * Use the `gcloud` command-line tool to associate the `lab-key` (**version 1**) with your Binary Authorization Attestor. Make sure to specify the `global` location and the `binauthz-keys` keyring when referencing the key.
        

### Update the Binary Authorization Policy

1. **Modify the Policy**: Adjust the Binary Authorization policy to enforce the requirement for attestations for the default rule.
    
2. **Incorporate Your Attestor**: Include the `vulnerability-attestor` you previously created as part of the policy configuration.
    

To verify the objective, click **Check my progress**.

Create an Attestor, KMS pair, and update the policy.

## Task 4. Create a Cloud Build CI/CD pipeline with vulnerability scanning

Building upon the basic pipeline from Task 2, you'll now enhance it with crucial security features. This includes vulnerability scanning to identify potential weaknesses in your container images and image signing to ensure their integrity. In this task, you will integrate vulnerability scanning and image signing into your CI/CD pipeline, making it more robust and secure.

### Add the required roles to the Cloud Build service account

1. Grant the Cloud Build service account the following IAM roles in your project:
    
    * `roles/binaryauthorization.attestorsViewer`
        
    * `roles/cloudkms.signerVerifier`
        
    * `roles/containeranalysis.notes.attacher`
        
    * `roles/iam.serviceAccountUser`
        
    * `roles/ondemandscanning.admin`
        
2. Additionally, ensure that the Compute Engine default service account also has the `cloudkms.signerVerifier` role.
    

### Install the Custom Build step

1. You'll be using a Custom Build step in Cloud Build to simplify the attestation process. Google provides this Custom Build step which contains helper functions to streamline the process. Before use, the code for the custom build step must be built into a container and pushed to Cloud Build. To do this, run the following command:
    

```apache
git clone https://github.com/GoogleCloudPlatform/cloud-builders-community.git
cd cloud-builders-community/binauthz-attestation
gcloud builds submit . --config cloudbuild.yaml
cd ../..
rm -rf cloud-builders-community
```


### Update the Cloud Build pipeline

In this section, you will complete the Cloud Build pipeline to include vulnerability scanning, severity checks, image signing, and deployment to Cloud Run. The code provided below is a partial implementation of the pipeline. You will need to fill in the missing parts to complete the pipeline.

1. **Complete TODOs:** Fill in the missing parts of the pipeline, including:
    
    * Specifying the image location in Artifact Registry for vulnerability scanning. Note that you want to scan the image in the `artifact-scanning-repo` repository.
        
    * Setting the appropriate severity level for vulnerability checks. The pipeline should fail if any `CRITICAL` vulnerabilities are found.
        
    * Configuring the image signing step with the correct attestor and KMS key information. The attestor name is `vulnerability-attestor`, and the key version is the full path to the `lab-key` version 1.
        
    * Retagging the image for production and pushing it to the production repository. You should use the `artifact-prod-repo` repository for this purpose.
        
    * Deploying the image to Cloud Run. You will use the production image from the `artifact-prod-repo` repository for this step.
        

**Note:** you have already filled out the first few TODOs in the `cloudbuild.yaml` file in the second task of this lab. Make sure to replace the rest of the placeholders with the correct values for the remaining TODOs.

#### cloudbuild.yaml

```apache
steps:

# TODO: #1. Build Step. Replace the <image-name> placeholder with the correct value.
- id: "build"
  name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', '<image-name>', '.']
  waitFor: ['-']

# TODO: #2. Push to Artifact Registry. Replace the <image-name> placeholder with the correct value.
- id: "push"
  name: 'gcr.io/cloud-builders/docker'
  args: ['push',  '<image-name>']

# TODO: #3. Run a vulnerability scan. Replace the <image-name> placeholder with the correct value.
- id: scan
  name: 'gcr.io/cloud-builders/gcloud'
  entrypoint: 'bash'
  args:
  - '-c'
  - |
    (gcloud artifacts docker images scan \
    <image-name> \
    --location us \
    --format="value(response.scan)") > /workspace/scan_id.txt

# TODO: #4. Analyze the result of the scan. IF CRITICAL vulnerabilities are found, fail the build. 
# Replace the <correct vulnerability> placeholders with the correct values. Case sensitive!
- id: severity check
  name: 'gcr.io/cloud-builders/gcloud'
  entrypoint: 'bash'
  args:
  - '-c'
  - |
      gcloud artifacts docker images list-vulnerabilities $(cat /workspace/scan_id.txt) \
      --format="value(vulnerability.effectiveSeverity)" | if grep -Fxq <correct vulnerability>; \
      then echo "Failed vulnerability check for <correct vulnerability> level" && exit 1; else echo \
      "No <correct vulnerability> vulnerability found, congrats !" && exit 0; fi

# TODO: #5. Sign the image only if the previous severity check passes. 
# Replace the placeholders with the correct values: <image-name>, <attestor-name>, and <key-version>.
# Note the <key-version> should be the **full** path to the key version.
- id: 'create-attestation'
  name: 'gcr.io/${PROJECT_ID}/binauthz-attestation:latest'
  args:
    - '--artifact-url'
    - '<image-name>'
    - '--attestor'
    - '<attestor-name>'
    - '--keyversion'
    - '<key-version>'

# TODO: #6. Re-tag the image for production and push it to the production repository using the latest tag. 
# Replace the <image-name> and <production-image-name> placeholders with the correct values.
- id: "push-to-prod"
  name: 'gcr.io/cloud-builders/docker'
  args: 
    - 'tag' 
    - '<image-name>'
    - '<production-image-name>'
- id: "push-to-prod-final"
  name: 'gcr.io/cloud-builders/docker'
  args: ['push', '<production-image-name>']

# TODO: #7. Deploy to Cloud Run. Replace the <image-name> and <your-region> placeholders with the correct values.
- id: 'deploy-to-cloud-run'
  name: 'gcr.io/cloud-builders/gcloud'
  entrypoint: 'bash'
  args:
  - '-c'
  - |
    gcloud run deploy auth-service --image=<image-name> \
    --binary-authorization=default --region=<your-region> --allow-unauthenticated

# TODO: #8. Replace <image-name> placeholder with the value from the build step.
images:
  - <image-name>
```


3. **Trigger the Build**:
    
    * Submit the Cloud Build configuration you created to initiate the build process.
        
    * Pay attention to the region you're working in when submitting the build.
        
4. **Observe the Build Failure**:
    
    * Navigate to the Cloud Build History page in the Google Cloud Console.
        
    * Look for the build you just triggered and examine its status.
        
    * Confirm that the build fails due to the presence of a `CRITICAL` severity vulnerability.
        

**Note:** your build is supposed fail due to a `CRITICAL` severity vulnerability. You will address this issue in the next task.

To verify the objective, click **Check my progress**.

Integrate vulnerability scanning into your CI/CD pipeline.

## Task 5. Fix the vulnerability and redeploy the CI/CD pipeline

In a real-world scenario, vulnerability scans often reveal issues that need to be addressed. This task simulates such a scenario, where your build fails due to a critical vulnerability. In this task, you will analyze the build failure, identify the vulnerability, and fix it by updating your application's dependencies. You will then re-trigger the Cloud Build pipeline to ensure the build completes successfully without any critical vulnerabilities.

1. **Update the Dockerfile:** Modify your Dockerfile to use the `python:3.8-alpine` base image. Update the `Flask`, `Gunicorn`, and `Werkzeug` dependencies to the following versions:
    
    * Flask: `3.0.3`
        
    * Gunicorn: `23.0.0`
        
    * Werkzeug: `3.0.4`
        
2. **Re-trigger the Build**: Submit your updated Cloud Build configuration to initiate a new build.
    
3. **Verify Build Success**: Check the Cloud Build History page to confirm that the build completes successfully without any `CRITICAL` vulnerability issues.
    
4. For testing purposes, run the following command to allow unauthenticated access to the Cloud Run service so you can validate the deployment. Replace `<your-region>` with the region where you deployed the service.
    

```apache
gcloud beta run services add-iam-policy-binding --region=<your-region> --member=allUsers --role=roles/run.invoker auth-service
```


**Note:** this command is for testing purposes only and should not be used in a production environment!

5. **Validate Deployment:** Access the Cloud Run service URL to ensure your application is deployed and functioning correctly.
    

To verify the objective, click **Check my progress**.

Fix the vulnerability and redeploy the CI/CD pipeline.

---

## Solution of Lab

https://youtu.be/Bctek9o37gk

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP521/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Secure%20Software%20Delivery%3A%20Challenge%20Lab/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```