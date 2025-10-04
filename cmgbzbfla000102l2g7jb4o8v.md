---
title: "App Dev: Deploying the Application into Kubernetes Engine - Python - GSP188"
seoTitle: "App Dev: Deploying the Application into Kubernetes Engine - Python - G"
seoDescription: "Deploy Python app in Kubernetes Engine using Google Cloud tools: Cloud Build and Artifact Registry for containerization and scaling"
datePublished: Sat Oct 04 2025 07:56:15 GMT+0000 (Coordinated Universal Time)
cuid: cmgbzbfla000102l2g7jb4o8v
slug: app-dev-deploying-the-application-into-kubernetes-engine-python-gsp188
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759563975928/1a45cc63-9682-4538-95d6-170ecc33a762.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759564551587/20e01b29-25d7-4e19-a9b3-7bf903709e2c.png
tags: app-dev-deploying-the-application-into-kubernetes-engine-python-gsp188, app-dev-deploying-the-application-into-kubernetes-engine-python, gsp188

---

## Overview

Google Kubernetes Engine provides a managed environment for deploying, managing, and scaling your containerized applications using Google infrastructure. The environment Kubernetes Engine provides consists of multiple machines (specifically, Compute Engine instances) grouped together to form a cluster.

Kubernetes provides the mechanisms through which you interact with your cluster. You use Kubernetes commands and resources to deploy and manage your applications, perform administration tasks and set policies, and monitor the health of your deployed workloads.

In this lab, you deploy the Quiz application into Kubernetes Engine, leveraging Google Cloud resources, including Cloud Build and Artifact Registry, and Kubernetes resources, such as Deployments, Pods, and Services.

## What you'll learn

In this lab, you learn how to perform the following tasks:

* Create Dockerfiles to package up the Quiz application frontend and backend code for deployment.
    
* Harness Cloud Build to produce Docker images.
    
* Provision a Kubernetes Engine cluster to host the Quiz application.
    
* Employ Kubernetes deployments to provision replicated Pods into Kubernetes Engine.
    
* Leverage a Kubernetes service to provision a load balancer for the quiz frontend.
    

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
    student-00-8cdc688e6fb3@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    orAmeLKoKbEA
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-5eafcb6127f6`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-5eafcb6127f6
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
ACCOUNT: student-00-8cdc688e6fb3@qwiklabs.net

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
project = qwiklabs-gcp-00-5eafcb6127f6
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Launch the Cloud Shell Editor

From Cloud Shell, click **Open Editor** to launch the code editor.

![editor.png](https://cdn.qwiklabs.com/HjkdLYkSBHswbAkz%2FYBGIBtiAPbs3ptnX5gU6LhAcQg%3D align="left")

**Note:** The code editor launches in a separate tab of your browser, along with Cloud Shell.

## Prepare the Quiz application

In this section, you access Cloud Shell, clone the git repository containing the Quiz application, configure environment variables, and run the application.

### Clone source code in Cloud Shell

1. Click **Open Terminal** and clone the repository for the lab:
    

```apache
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```

2. Create a soft link as a shortcut to the working directory:
    

```apache
ln -s ~/training-data-analyst/courses/developingapps/v1.2/python/kubernetesengine ~/kubernetesengine
```

### Configure the Quiz application

1. Change the directory that contains the sample files for this lab:
    

```apache
cd ~/kubernetesengine/start
```

2. To replace the default region with the lab-assigned region, run the following commands:
    

```apache
export APP_REGION=us-central
export REGION=us-central1
sed -i -e 's/us-central1/'"$REGION"'/g' -e 's/us-central/'"$APP_REGION"'/g' -e 's/python3/'"python3.12"'/g' prepare_environment.sh
```

3. Configure the Quiz application:
    

```apache
. prepare_environment.sh
```

This script file:

* Creates a Google App Engine application.
    
* Exports environment variables `GCLOUD_PROJECT` and `GCLOUD_BUCKET`.
    
* Updates pip then runs `pip install -r requirements.txt`.
    
* Creates entities in Google Cloud Datastore.
    
* Creates a Google Cloud Pub/Sub topic.
    
* Creates a Cloud Spanner Instance, Database, and Table.
    
* Prints out the Project ID.
    

The Quiz application is configured when you see the following message:

**Example output message**

```apache
Creating Cloud Pub/Sub topic
Created topic [projects/qwiklabs-gcp-92b7e5716e0cbf7e/topics/feedback].
Created subscription [projects/qwiklabs-gcp-92b7e5716e0cbf7e/subscriptions/worker-subscription].
Creating Cloud Spanner Instance, Database, and Table
Creating instance...done.
Creating database...done.
Project ID: qwiklabs-gcp-92b7e5716e0cbf7e
```

Click *Check my progress* to verify the objective.

Configure the Quiz application

## Review the code

In this section you examine the application files.

To view and edit files, you can use the shell editors that are installed in Cloud Shell, such as `nano` or `vim` or the Cloud Shell Editor. This lab uses the Cloud Shell Editor.

### Examine the code

* Navigate to `training-data-analyst/courses/developingapps/v1.2/python/kubernetesengine/start`.
    

The folder structure for the Quiz application reflects how it will be deployed in Kubernetes Engine.

The web application is in a folder called `frontend`.

The worker application code that subscribes to Cloud Pub/Sub and processes messages is in a folder called `backend`.

There are configuration files for Docker (a `Dockerfile` in the `frontend` and `backend` folder) and `backend-deployment` and `frontend-deployment` Kubernetes Engine `.yaml` files.

## Create and connect to a Kubernetes Engine cluster

In this section you use Google Cloud console to create and then connect to a Kubernetes Engine cluster.

### Create a Kubernetes Engine cluster

1. In the console, click **Navigation menu ()&gt; Kubernetes Engine &gt; Clusters**.
    
2. Click **Create**.
    
3. Click **Configure** under **Standard: You manage your cluster**, and then set the following fields to the provided values, leaving all others at their default value:
    

| **Property** | **Value** |
| --- | --- |
| Name | `quiz-cluster` |
| Zonal | `us-central1-c` |
| default Pool &gt; Security &gt; Access scopes | Select **Allow full access to all Cloud APIs** |

4. Click **Create**. The cluster takes a few minutes to provision.
    
    Click *Check my progress* to verify the objective.
    
    Create Kubernetes engine cluster
    

### Connect to the cluster

In this section you connect the Quiz application to the kubernetes cluster.

1. When the cluster is ready, click the **Actions** icon and select **Connect**.
    

![Kubernetes clusters list with Connect option highlighted](https://cdn.qwiklabs.com/%2BupDvS7bljEAIuAxF38B1CgJi6yOUZNjyKM3PmXUrjM%3D align="left")

2. In **Connect to the cluster**, click **Run in Cloud Shell** to populated Cloud shell with the command that resembles.
    

```apache
gcloud container clusters get-credentials quiz-cluster --zone us-central1-c --project qwiklabs-gcp-00-5eafcb6127f6
```

Press ENTER to run the command in Cloud Shell.

3. Run the following command to list the Pods in the cluster:
    

```apache
kubectl get pods
```

The response should be `No resources found in default namespace` because there are no Pods in the cluster. It confirms that you have configured security to allow the `kubectl` command-line tool to perform operations against the cluster.

## Create a Docker Repository on Artifact registry

Artifact Registry supports managing container images and language packages. Different artifact types require different specifications. For example, the requests for Maven dependencies are different from requests for Node dependencies.

To support the different API specifications, Artifact Registry needs to know what format you want the API responses to follow. To do this you will create a repository and pass in the `--repository-format` flag indicating the type of repository desired.

1. From Cloud Shell run the following command to create a repository for Docker images:
    

```apache
gcloud artifacts repositories create container-dev-repo --repository-format=docker \
  --location=us-central1 \
  --description="Docker repository for Container Dev Workshop"
```

Click **Authorize** if the Cloud Shell authorization prompt appears.

2. In the Cloud console, go to **Artifact Registry** &gt; **Repositories** and notice your newly created Docker repository named `container-dev-repo`. If you click on it you can see that it's empty at the moment.
    

Click **Check my progress** to verify the objective.

Create a Docker Repository

## Build Docker images using Cloud Build

In this section, you create a Dockerfile for the application frontend and backend, and then employ Cloud Build to build images and store them in the Artifact Registry.

### Create the Dockerfile for the frontend and backend

1. In the Cloud Shell Editor, open `frontend/Dockerfile`.
    
2. Now add a block of code that does the following:
    

* Enters the Dockerfile command to initialize the creation of a custom Docker image using Google's Python App Engine image as the starting point.
    
* Writes Dockerfile commands to activate a virtual environment.
    
* Writes the Dockerfile command to execute `pip install` as part of the build process.
    
* Writes the Dockerfile command to add the contents of the current folder to the `/app` path in the container.
    
* Completes the `Dockerfile` by entering the statement, `gunicorn ...`, that executes when the container runs. Gunicorn (Green Unicorn) is an HTTP server that supports the Python Web Server Gateway Interface (WSGI) specification.
    

Copy and paste the following to `Dockerfile`:

```apache
FROM gcr.io/google_appengine/python

RUN virtualenv -p python3.7 /env

ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH

ADD requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

ADD . /app

CMD gunicorn -b 0.0.0.0:$PORT quiz:app
```

3. Open the `backend/Dockerfile` file and copy and paste the following code:
    

```apache
FROM gcr.io/google_appengine/python

RUN virtualenv -p python3.7 /env

ENV VIRTUAL_ENV /env
ENV PATH /env/bin:$PATH

ADD requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

ADD . /app

CMD python -m quiz.console.worker
```

### Build Docker images with Cloud Build

1. In Cloud Shell, make sure you are in the `start` folder:
    

```apache
cd ~/kubernetesengine/start
```

2. Run the following command to build the frontend Docker image:
    

```apache
gcloud builds submit -t us-central1-docker.pkg.dev/qwiklabs-gcp-00-5eafcb6127f6/container-dev-repo/quiz-frontend:v1 ./frontend/
```

Here, Docker image is built and stored in the Artifact Registry. It takes a few minutes.

Ignore any incompatibility messages you see in the output messages.

3. Now run the following command to build the backend Docker image:
    

```apache
gcloud builds submit -t us-central1-docker.pkg.dev/qwiklabs-gcp-00-5eafcb6127f6/container-dev-repo/quiz-backend:v1 ./backend/
```

When the backend Docker image is ready you see these last messages:

```apache
DONE
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ID: 97a3648f-5229-49ef-9c93-a33dbdb421f3
CREATE_TIME: 2024-12-16T13:29:57+00:00
DURATION: 2M10S
SOURCE: gs://qwiklabs-gcp-03-2cae39dd1d7c_cloudbuild/source/1734355794.276254-1b5d85622afb4360910a164f9f29734d.tgz
IMAGES: us-east1-docker.pkg.dev/qwiklabs-gcp-03-2cae39dd1d7c/container-dev-repo/quiz-backend:v1
STATUS: SUCCESS
```

4. In the console, from the **Navigation menu** menu, click **Artifact Registry**, then select **container-dev-repo**. You should see two Pods: `quiz-frontend` and `quiz-backend`.
    
5. Click **quiz-frontend**.
    

**Note:** You should see the image Name and Tags (latest).

Click *Check my progress* to verify the objective.

Build Docker Images using Cloud Build

## Create a Kubernetes deployment and service resources

In this section, you modify the template `yaml` files that contain the specification for Kubernetes Deployment and Service resources, and then create the resources in the Kubernetes Engine cluster.

### Create a Kubernetes deployment file

1. In the Cloud Shell Editor, open the `frontend-deployment.yaml` file.
    

**Note:** The file skeleton has been created for you. Your job is to replace placeholders with values specific to your project.

2. Replace the placeholders in the `frontend-deployment.yaml` file using the following values:
    

| **Placeholder Name** | **Value** |
| --- | --- |
| `[GCLOUD_PROJECT]` | Project ID |
| (Display the Project ID by entering |  |
| `echo $GCLOUD_PROJECT` in **Cloud Shell**) |  |
| `[GCLOUD_BUCKET]` | Cloud Storage bucket name for the media bucket in your project |
| (Display the bucket name by entering |  |
| `echo $GCLOUD_BUCKET` in **Cloud Shell**) |  |
| `[FRONTEND_IMAGE_IDENTIFIER]` | The frontend image identified in the form `[REGION]-docker.pkg.dev/[Project_ID]/container-dev-repo/quiz-frontend:v1` |

**Note:** The quiz-frontend deployment provisions three replicas of the frontend Docker image in Kubernetes Pods, distributed across the three nodes of the Kubernetes Engine cluster.

3. Save the file.
    
4. Replace the placeholders in the `backend-deployment.yaml` file using the following values:
    

| **Placeholder Name** | **Value** |
| --- | --- |
| `[GCLOUD_PROJECT]` | Project ID |
| `[GCLOUD_BUCKET]` | Cloud Storage bucket ID for the media bucket in your project |
| `[BACKEND_IMAGE_IDENTIFIER]` | The backend image identified in the form `[REGION]-docker.pkg.dev/[Project_ID]/container-dev-repo/quiz-backend:v1` |

**Note:** The quiz-backend deployment provisions two replicas of the backend Docker image in Kubernetes Pods, distributed across two of the three nodes of the Kubernetes Engine cluster.

5. Save the file.
    
6. Review the contents of the `frontend-service.yaml` file.
    

**Note:** The service exposes the frontend deployment using a load balancer. The load balancer sends requests from clients to all three replicas of the frontend Pod.

### Execute the deployment and service files

1. In Cloud Shell, provision the quiz frontend deployment:
    

```apache
kubectl create -f ./frontend-deployment.yaml
```

2. Provision the quiz backend deployment:
    

```apache
kubectl create -f ./backend-deployment.yaml
```

3. Provision the quiz frontend service:
    

```apache
kubectl create -f ./frontend-service.yaml
```

**Note:** Each command provisions resources in the Kubernetes Engine. It takes a few minutes to complete the process.

Click *Check my progress* to verify the objective.

Create Kubernetes Deployment and service resources

## Test the Quiz application

In this section you review the deployed Pods and service and navigate to the Quiz application.

### **Review the deployed resources**

1. In the console, in the **Navigation menu**, click **Kubernetes Engine**.
    
2. Click **Workloads** in the left menu.
    

**Note:** You should see two containers: quiz-frontend and quiz-backend. You may see that the status is OK or in the process of being created.

If the status of one or both containers is **Does not have minimum availability**, refresh the window.

3. Click **quiz-frontend**. In the **Managed Pods** section, there are three quiz-frontend Pods.
    
4. In the **Exposing services** section near the bottom, find the **Endpoints** section and copy the IP address and paste it into the URL field of a new browser tab or window:
    

![app.png](https://cdn.qwiklabs.com/qJ4PdjkBGmt8fyh1eeYt1xF6yWe8W2Ca4abr9GJvCy0%3D align="left")

5. This opens the Quiz application, which means you successfully deployed the application! You can end your lab here or use the remainder of the time to build some quizzes.
    

**Note:** If you get a pop-up that **The connection to site is not secure** click **Continue to Site**.

---

## Solution of Lab

%[https://youtu.be/k-HycgqLhCY] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP188/lab.sh
source lab.sh
```

**Script Alternative**

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759564186239/107045e2-c0be-4072-946d-9f5a95a42164.png align="center")

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/App%20Dev%20Deploying%20the%20Application%20into%20Kubernetes%20Engine%20Python/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```