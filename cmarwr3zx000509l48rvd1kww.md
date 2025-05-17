---
title: "Deploy Your Website on Cloud Run - GSP659"
seoTitle: "Deploy Your Website on Cloud Run - GSP659"
seoDescription: "Running websites can be difficult with creating and managing VMs, clusters, pods, services, etc. This is fine for larger, multi-tiered applications, but if "
datePublished: Sat May 17 2025 07:30:32 GMT+0000 (Coordinated Universal Time)
cuid: cmarwr3zx000509l48rvd1kww
slug: deploy-your-website-on-cloud-run-gsp659
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747466858661/0d6b2c97-be5d-4689-8618-4b76a6636e23.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747467016019/bc25fb43-1ad7-480f-86d2-326347168458.png
tags: deploy-your-website-on-cloud-run-gsp659, deploy-your-website-on-cloud-run, gsp659

---

## Overview

Running websites can be difficult with creating and managing VMs, clusters, pods, services, etc. This is fine for larger, multi-tiered applications, but if you are just trying to get your website deployed and visible, it's a lot of overhead.

With [Cloud Run](https://cloud.google.com/run), Google Cloud's implementation of [Google's Knative framework](https://cloud.google.com/knative/), you can manage and deploy your website without any of the infrastructure overhead you experience with a VM or pure Kubernetes-based deployments. Not only is this a simpler approach from a management perspective, it also gives you the ability to "scale to zero" when there are no requests coming into your website.

Cloud Run brings "serverless" development to containers and can be run either on your own Google Kubernetes Engine (GKE) clusters or on a fully managed PaaS solution provided by Cloud Run. You will be running the latter scenario in this lab.

The exercises are ordered to reflect a common cloud developer experience:

1. Create a Docker container from your application
    
2. Deploy the container to Cloud Run
    
3. Modify the website
    
4. Roll out a new version with zero downtime
    

### What you'll learn

In this lab you will learn how to:

* Build a Docker image using Cloud Build and upload it to Artifact Registry
    
* Deploy Docker images to Cloud Run
    
* Manage Cloud Run deployments
    
* Set up an endpoint for an application on Cloud Run
    

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
    student-04-e8dc472b8c77@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    mlMPQRF3tYkX
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-27fe21b77900`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-27fe21b77900
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
ACCOUNT: student-04-e8dc472b8c77@qwiklabs.net

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
project = qwiklabs-gcp-04-27fe21b77900
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Clone the source repository

Since you are deploying an existing website, you just need to clone the source, so you can focus on creating Docker images and deploying to Cloud Run.

1. In Cloud Shell run the following commands to clone the git repository and change to the appropriate directory:
    

```apache
git clone https://github.com/googlecodelabs/monolith-to-microservices.git
cd ~/monolith-to-microservices
```

2. Install the NodeJS dependencies so you can test the application before deploying:
    

```apache
./setup.sh
```

This will take a few minutes to run. You will see a success message when it finishes.

3. Test your application by running the following command to start the web server:
    

```apache
cd ~/monolith-to-microservices/monolith
npm start
```

**Output:**

```apache
Monolith listening on port 8080!
```

4. Preview your application by clicking the web preview icon and selecting **Preview on port 8080**.
    

![Preview on port 8080 option selected on the expanded web preview menu](https://cdn.qwiklabs.com/tXNcKRtkk%2Bm98qN64S6STw2%2FaxbiZoZTc5rEq%2BkQZK0%3D align="left")

This should open a new window where you can see your Fancy Store web page in action.

![Fancy Store website](https://cdn.qwiklabs.com/UhhavmFScvrZyPiCdGvNQG9FUjk8EqgdMoS71xgoEUA%3D align="left")

5. Close this window after viewing the website, and stop the web server process by pressing **CTRL+C** in Cloud Shell.
    

## Task 2. Create a Docker container with Cloud Build

Now that you have the source files ready to go, it is time to Dockerize your application!

Normally you would have to take a two step approach that entails building a docker container and pushing it to a registry to store the image for GKE to pull from. Cloud Build let's you build the Docker container and put the image in Artifact Registry with a single command!

Cloud Build will compress the files from the directory and move them to a Cloud Storage bucket. The build process will then take all the files from the bucket and use the Dockerfile, which is present in the same directory, to run the Docker build process.

### Create the target Docker repository

You must create a repository before you can push any images to it. Pushing an image can't trigger creation of a repository and the Cloud Build service account does not have permissions to create repositories.

1. In the console, search for **Artifact Registry** in the search field, then click on **Artifact Registry** result.
    
2. Click **Create Repository**.
    
3. Specify `monolith-demo` as the repository name.
    
4. Choose **Docker** as the format.
    
5. Under Location Type, select Region and then choose the location `europe-west1`.
    
6. Click **Create**.
    

### Configure authentication

Before you can push or pull images, configure Docker to use the Google Cloud CLI to authenticate requests to Artifact Registry.

* To set up authentication to Docker repositories in the region `europe-west1`, run the following command in Cloud Shell:
    

```apache
gcloud auth configure-docker europe-west1-docker.pkg.dev
```

The command updates your Docker configuration. You can now connect with Artifact Registry in your Google Cloud project to push and pull images.

### Deploy the image

You will now deploy the image that was built earlier.

1. First you need to enable the Cloud Build, Artifact Registry, and Cloud Run APIs. Run the following command in Cloud Shell to enable them:
    

```apache
gcloud services enable artifactregistry.googleapis.com \
    cloudbuild.googleapis.com \
    run.googleapis.com
```

2. After the APIs are enabled, run the following command to start the build process:
    

```apache
gcloud builds submit --tag europe-west1-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/monolith-demo/monolith:1.0.0
```

**Note:** This process will take a few minutes.

3. To view your build history, or watch the process in real time, in the console, search for **Cloud Build** then click on the **Cloud Build** result.
    
4. On the **History** page you can see a list of all your builds; there should only be 1 that you just created.
    

![Build History list](https://cdn.qwiklabs.com/VAXOV%2FoYKvJCbNlDt2hjeEaGc%2FwN%2BfTSCFfAxKkqB7o%3D align="left")

* If you click on the Build ID, you can see all the details for that build including the log output.
    
* From the Build Details page you can view the container image that was created by clicking the **Execution Details** tab, then clicking on on the image link.
    

![Build details](https://cdn.qwiklabs.com/g2u%2FOTXkAASqA5lw7Bw0dZ5rsbLboC6E2Lj4fz%2B4Ja0%3D align="left")

Click *Check my progress* to verify the objective.

Create Docker Container with Google Cloud Build

**Check my progress**

## Task 3. Deploy the container to Cloud Run

Now that you have containerized your website and pushed the container to Artifact Registry, it is time to deploy to Cloud Run!

There are two approaches for deploying to Cloud Run:

* **Managed Cloud Run**: The Platform as a Service model where all container lifecycle is managed by the Cloud Run product itself. You'll be using this approach in this lab.
    
* **Cloud Run on GKE**: Cloud Run with an additional layer of control which allows you to bring your own clusters & pods from GKE. [You can read more about it here](https://cloud.google.com/run/docs/gke/setup).
    

1. Run the following command to deploy the image to Cloud Run:
    

```apache
gcloud run deploy monolith --image europe-west1-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/monolith-demo/monolith:1.0.0 --region europe-west1
```

2. When asked to allow unauthenticated invocations to `[monolith]` type **Y**.
    

Click *Check my progress* to verify the objective.

Deploy Container To Cloud Run

**Check my progress**

### Verify deployment

1. To verify the deployment was created successfully, run the following command:
    

```apache
gcloud run services list
```

**Note:** It may take a few moments for the pod status to be Running.

**Output:**

```apache
✔
SERVICE: monolith
REGION: europe-west1
URL: https://monolith-2cxtmp4m2q-uc.a.run.app
LAST DEPLOYED BY: student-02-aa7a5aed362d@qwiklabs.net
LAST DEPLOYED AT: 2022-08-19T19:16:14.351981Z
```

This output shows several things. You can see the deployment, as well as the user that deployed it (your email) and the URL you can use to access the app. Looks like everything was created successfully!

2. Click on the URL provided in the list of services. You should see the same website you previewed locally.
    

**Note:** You can also view your Cloud Run deployments via the console if you navigate to **Cloud Run** in the **Navigation menu**.

## Task 4. Create new revision with lower concurrency

In this section you will deploy your application again, but this time adjusting one of the parameters.

By default, a Cloud Run application will have a concurrency value of 80, meaning that each container instance will serve up to 80 requests at a time. This is a big departure from the Functions-as-a-Service model, where one instance handles one request at a time.

1. Run the following command to re-deploy the same container image with a concurrency value of 1 (just for testing), and see what happens:
    

```apache
gcloud run deploy monolith --image europe-west1-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/monolith-demo/monolith:1.0.0 --region europe-west1 --concurrency 1
```

2. To see the details, from the **Navigation menu**, click on **Cloud Run**, then click on the **monolith** service:
    

![The monolith service](https://cdn.qwiklabs.com/8BOinJOmuwPh0RSNjclIoEqfMsNcDCykBvI3L5gxi3M%3D align="left")

3. On the Service Details page, click on the **Revisions** tab. You should now see 2 revisions created.
    

The most recent deployment has Details on the right hand side.

![The monolith Revisions tab](https://cdn.qwiklabs.com/wAOTE9m5u8BjiEhiudW%2F5bErCIKbl7FxQIS30iTA6jA%3D align="left")

You will see that the concurrency value has been reduced to "1".

![The monolith Container tab](https://cdn.qwiklabs.com/sv3pcjOBh7346tBjvPF%2FIjtTXmrBg7ztDxg0jtOtF64%3D align="left")

Although this configuration is sufficient for testing, in most production scenarios you will have containers supporting multiple concurrent requests.

Click *Check my progress* to verify the objective.

Create new revision with lower concurrency

**Check my progress**

Next, you can restore the original concurrency without re-deploying. You could set the concurrency value back to the default of "80", or you could just set the value to "0", which will remove any concurrency restrictions and set it to the default max (which happens to be 80).

4. Run the following command to update the current revision, using a concurrency value of `80`:
    

```apache
gcloud run deploy monolith --image europe-west1-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/monolith-demo/monolith:1.0.0 --region europe-west1 --concurrency 80
```

You will notice that another revision has been created, that traffic has now been redirected, and that the concurrency is back up to 80.

**Note:** You may need to leave the **Revisions** tab and then return to it to see the most up to date information.

## Task 5. Make changes to the website

**Scenario:** Your marketing team has asked you to change the homepage for your site. They think it should be more informative of who your company is and what you actually sell.

**Task:** You will add some text to the homepage to make the marketing team happy! It looks like one of our developers already created the changes with the file name `index.js.new`. You can just copy this file to `index.js` and your changes should be reflected. Follow the instructions below to make the appropriate changes.

1. Run the following commands to copy the updated file to the correct file name:
    

```apache
cd ~/monolith-to-microservices/react-app/src/pages/Home
mv index.js.new index.js
```

2. Print its contents to verify the changes:
    

```apache
cat ~/monolith-to-microservices/react-app/src/pages/Home/index.js
```

The resulting code should look like this:

```javascript
/*
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        elevation={3}
        sx={{
          width: "800px",
          margin: "0 auto",
          padding: (theme) => theme.spacing(3, 2),
        }}
      >
        <Typography variant="h5">Fancy Fashion &amp; Style Online</Typography>
        <br />
        <Typography variant="body1">
          Tired of mainstream fashion ideas, popular trends and societal norms?
          This line of lifestyle products will help you catch up with the Fancy
          trend and express your personal style. Start shopping Fancy items now!
        </Typography>
      </Paper>
    </Box>
  );
}
```

You updated the React components, but you need to build the React app to generate the static files.

3. Run the following command to build the React app and copy it into the monolith public directory:
    

```apache
cd ~/monolith-to-microservices/react-app
npm run build:monolith
```

Now that the code is updated, rebuild the Docker container and publish it to Artifact Registry. You can use the same command as before, except this time you will update the version label.

4. Run the following command to trigger a new Cloud Build with an updated image version of 2.0.0:
    

```apache
cd ~/monolith-to-microservices/monolith
gcloud builds submit --tag europe-west1-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/monolith-demo/monolith:2.0.0
```

In the next section you will use this image to update your application with zero downtime.

Click *Check my progress* to verify the objective.

Make Changes To The Website

**Check my progress**

## Task 6. Update website with zero downtime

The changes are complete and the marketing team is happy with your updates! It is time to update the website without interruption to the users. Cloud Run treats each deployment as a new *Revision* which will first be brought online, then have traffic redirected to it.

By default the latest revision will be assigned 100% of the inbound traffic for a service. It is possible to use "Routes" to allocate different percentages of traffic to different revisions within a service. Follow the instructions below to update your website.

* Run the following command to re-deploy the service to update the image to a new version with the following command:
    

```apache
gcloud run deploy monolith --image europe-west1-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/monolith-demo/monolith:2.0.0 --region europe-west1
```

Click *Check my progress* to verify the objective.

Update website with zero downtime

**Check my progress**

### Verify deployment

1. Validate that your deployment updated by running the following command:
    

```apache
gcloud run services describe monolith --platform managed --region europe-west1
```

**Output:**

```apache
✔ Service monolith in region 
```

Here you will see that the Service is now using the latest version of your image, deployed in a new revision.

To verify the changes, navigate to the external URL of the Cloud Run service, refresh the page, and notice that the application title has been updated.

2. Run the following command to list the services and view the service Url:
    

```apache
gcloud beta run services list
```

3. Click on the URL of the service. Your web site should now be displaying the text you just added to the homepage component!
    

![The updated Fancy Store website](https://cdn.qwiklabs.com/vaYmoyYfCpvcaOReoA2JFEem2sWMWnnYjaIghzpuGkI%3D align="left")

---

## Solution of Lab

%[https://youtu.be/j_5JaW08q90] 

```apache
curl -LO https://github.com/ArcadeCrew/Google-Cloud-Labs/raw/refs/heads/main/Deploy%20Your%20Website%20on%20Cloud%20Run/arcadecrew.sh
sudo chmod +x arcadecrew.sh
./arcadecrew.sh
```