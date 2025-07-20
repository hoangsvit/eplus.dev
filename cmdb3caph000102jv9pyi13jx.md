---
title: "Create a Container Artifact Registry and Upload Code - gem-artifact-registry-container"
seoTitle: "Create a Container Artifact Registry and Upload Code - gem-artifact-re"
seoDescription: "Learn how to create and manage an Artifact Registry on Google Cloud to store and secure your container images"
datePublished: Sun Jul 20 2025 03:02:01 GMT+0000 (Coordinated Universal Time)
cuid: cmdb3caph000102jv9pyi13jx
slug: create-a-container-artifact-registry-and-upload-code-gem-artifact-registry-container
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752980299174/b4ba14c8-118a-4d92-b3b9-fbf4799af6a3.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752980512517/b176d68a-eca8-4752-9707-22b6ed5369a3.png
tags: container, create-a-container-artifact-registry-and-upload-code-gem-artifact-registry-container, gem-artifact-registry-container, create-a-container-artifact-registry-and-upload-code, upload-code, create-a-container-artifact, create-a-container-artifact-registry

---

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **PROJECT\_ID**. The output contains a line that declares the **PROJECT\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to YOUR_PROJECT_ID
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

3. Click **Authorize**.
    
4. Your output should now look like this:
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-01-xxxxxxxxxxxx@qwiklabs.net

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
project = <project_ID>
```

**Example output:**

```apache
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Overview

In this lab, you'll learn how to create an Artifact Registry repository for storing container images and then push a sample image to it. Artifact Registry provides a central location for managing and securing your container images and other build artifacts. This lab assumes familiarity with Docker and basic Google Cloud concepts.

## Task 1. Enable the Artifact Registry API

Before you can use Artifact Registry, you need to enable the API for your project.

1. Enable the Artifact Registry API.
    

```apache
gcloud services enable artifactregistry.googleapis.com
```

**Note:**  
This command enables the Artifact Registry API for your project.

## Task 2. Create an Artifact Registry Repository

Now, create a Docker repository in Artifact Registry to store your container images. You'll need to choose a region for the repository.

1. Set your project ID: `qwiklabs-gcp-04-c172a0c371f9`
    

```apache
gcloud config set project qwiklabs-gcp-04-c172a0c371f9
```

**Note:**  
This command sets your active project identity.

2. Set your default region to `us-central1`
    

```apache
gcloud config set compute/region us-central1
```

**Note:**  
This command sets your active compute region.

3. Create a Docker repository named 'my-docker-repo' in Artifact Registry in the `us-central1`
    

```apache
gcloud artifacts repositories create my-docker-repo \
    --repository-format=docker \
    --location=us-central1 \
    --description="Docker repository"
```

**Note:**  
This command creates a Docker repository.

## Task 3. Configure Docker Authentication

To push and pull images, configure Docker to authenticate with Artifact Registry.

1. Configure Docker authentication.
    

```apache
gcloud auth configure-docker us-central1-docker.pkg.dev
```

**Note:**  
This command configures Docker to authenticate with Artifact Registry.

## Task 4. Build and Tag a Sample Docker Image

Let's build a simple Docker image and tag it for Artifact Registry. This example uses a simple nginx image.

1. Create a simple Dockerfile.
    

```apache
mkdir sample-app
cd sample-app
echo "FROM nginx:latest" > Dockerfile
```

**Note:**  
This creates a basic Dockerfile.

2. Build the Docker image. Replace `qwiklabs-gcp-04-c172a0c371f9`
    

```apache
docker build -t nginx-image .
```

**Note:**  
This command builds the Docker image.

3. Tag the Docker image for Artifact Registry. Replace `qwiklabs-gcp-04-c172a0c371f9`
    

```apache
docker tag nginx-image us-central1-docker.pkg.dev/qwiklabs-gcp-04-c172a0c371f9/my-docker-repo/nginx-image:latest
```

**Note:**  
This command tags the Docker image.

## Task 5. Push the Docker Image to Artifact Registry

Now, push the tagged image to your Artifact Registry repository.

1. Push the Docker image to Artifact Registry. Replace `qwiklabs-gcp-04-c172a0c371f9`
    

```apache
docker push us-central1-docker.pkg.dev/qwiklabs-gcp-04-c172a0c371f9/my-docker-repo/nginx-image:latest
```

**Note:**  
This command pushes the Docker image to Artifact Registry.

---

## Solution of Lab

%[https://youtu.be/ntXgeeecwvc] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Create%20a%20Container%20Artifact%20Registry%20and%20Upload%20Code/techcps.sh
sudo chmod +x techcps.sh
./techcps.sh
```