---
title: "Docker Essentials: Containers and Artifact Registry - gem-docker-basics"
seoTitle: "Docker Essentials: Containers and Artifact Registry - gem-docker-basic"
seoDescription: "Learn Docker basics by building and managing containers. Utilize Google Cloud's Artifact Registry for storing Docker images. Hands-on lab experience"
datePublished: Sun Feb 15 2026 08:58:43 GMT+0000 (Coordinated Universal Time)
cuid: cmlnijx15000d02l88zpa0fcu
slug: docker-essentials-containers-and-artifact-registry-gem-docker-basics-1
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771145695208/cd569244-09fa-42b1-b301-91ed912f15d6.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1771145849646/1e875e54-fd2c-482a-b7aa-b112301c6f52.png
tags: docker-essentials-containers-and-artifact-registry-gem-docker-basics, docker-essentials-containers-and-artifact-registry, gem-docker-basics

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

This lab provides a hands-on introduction to essential Docker operations, including building, running, managing, and publishing Docker containers. You will learn how to containerize a simple application, interact with the container, and push the resulting image to Google Artifact Registry. This lab assumes familiarity with basic Linux commands and Docker concepts.

## Task 1. Setting up your environment and Artifact Registry

In this task, you'll configure your environment, enable the necessary services, and create an Artifact Registry repository to store your Docker images.

1. Set your Project ID:
    

```apache
gcloud config set project qwiklabs-gcp-04-3dba7879dc58
```

**Note:**  
This configures the gcloud CLI to use your project.

2. Enable Artifact Registry API
    

```apache
gcloud services enable artifactregistry.googleapis.com
```

**Note:**  
This command enables the Artifact Registry API for your project, allowing you to create and manage repositories.

3. Create an Artifact Registry Repository in region: `us-central1`
    

```apache
gcloud artifacts repositories create my-docker-repo \
    --repository-format=docker \
    --location=us-central1 \
    --description="My Docker image repository"
```

**Note:**  
Creates a Docker repository in Artifact Registry named `my-docker-repo`.

4. Configure Docker to authenticate with Artifact Registry:
    

```apache
gcloud auth configure-docker us-central1-docker.pkg.dev
```

**Note:**  
Authenticates Docker with Artifact Registry for the specified region. This allows you to push and pull images.

## Task 2. Building a Docker Image

Here, you will create a simple 'Hello World' application and build a Docker image for it using a Dockerfile.

1. Create a directory for your application:
    

```apache
mkdir myapp && cd $_
```

**Note:**  
Creates a new directory named `myapp` and navigates into it.

2. Create a simple `app.py` file:
    

```apache
cat > app.py <<EOF
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, Docker!\n"

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
EOF
```

**Note:**  
Creates a simple Flask application that returns 'Hello, Docker!'. This will be our application.

3. Create a `requirements.txt` file:
    

```apache
cat > requirements.txt <<EOF
Flask
EOF
```

**Note:**  
Specifies the dependencies for your application (Flask).

4. Create a `Dockerfile`:
    

```apache
FROM python:3.9-slim-buster
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8080
CMD ["python", "app.py"]
```

**Note:**  
Defines the steps to build your Docker image. It uses a Python base image, installs dependencies, copies the application code, and specifies the command to run the application.

5. Build the Docker image. Replace `us-central1` and `qwiklabs-gcp-04-3dba7879dc58`
    

```apache
docker build -t us-central1-docker.pkg.dev/qwiklabs-gcp-04-3dba7879dc58/my-docker-repo/hello-docker:latest .
```

**Note:**  
Builds the Docker image using the `Dockerfile` in the current directory. It tags the image with the Artifact Registry repository URL.

## Task 3. Running and Testing the Docker Container

In this task, you will run the Docker image you built and test it to ensure it's working correctly.

1. Run the Docker container:
    

```apache
docker run -d -p 8080:8080 us-central1-docker.pkg.dev/qwiklabs-gcp-04-3dba7879dc58/my-docker-repo/hello-docker:latest
```

**Note:**  
Runs the Docker image in detached mode (\`-d\`) and maps port 8080 on the host to port 8080 in the container. You may need to configure firewall rules to allow external traffic on port 8080.

2. Check if the container is running:
    

```apache
docker ps
```

**Note:**  
Lists the currently running Docker containers.

3. Test the application. Replace `qwiklabs-gcp-04-3dba7879dc58`
    

```apache
curl http://localhost:8080
```

**Note:**  
Sends an HTTP request to the application running in the container. You should see 'Hello, Docker!' in the output.

4. Stop the Docker container:
    

```apache
docker stop $(docker ps -q)
```

**Note:**  
Stops all running Docker containers. `docker ps -q` returns only the container IDs.

## Task 4. Pushing the Image to Artifact Registry

Now that you have a working image, you will push it to your Artifact Registry repository.

1. Push the Docker image. Replace `us-central1` and `qwiklabs-gcp-04-3dba7879dc58`
    

```apache
docker push us-central1-docker.pkg.dev/qwiklabs-gcp-04-3dba7879dc58/my-docker-repo/hello-docker:latest
```

**Note:**  
Pushes the Docker image to the Artifact Registry repository. This makes the image available for others to use.

## Task 5. Cleaning Up

Remove local artifacts to ensure a clean environment.

1. Remove the application directory:
    

```apache
cd .. && rm -rf myapp
```

**Note:**  
Removes the `myapp` directory and all its contents.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=qy-rVvwVBR0] 

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">The lab will automatically complete in approximately <strong>5 minutes</strong>. Just sit tight and let it finish 👍</div>
</div>

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1771145913348/4191bcc6-27a0-4fb4-9904-5c4000dcd4be.png align="center")