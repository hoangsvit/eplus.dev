---
title: "Deploy a Static Site Using Traefik and Cloud Run - gem-cloud-run-traefik-website"
seoTitle: "Deploy a Static Site Using Traefik and Cloud Run - gem-cloud-run-traef"
seoDescription: "Learn how to deploy a static site using Traefik and Cloud Run, including setup, containerization, and configuration"
datePublished: Sun Jul 20 2025 02:53:10 GMT+0000 (Coordinated Universal Time)
cuid: cmdb30x9o000p02le442kcb3t
slug: deploy-a-static-site-using-traefik-and-cloud-run-gem-cloud-run-traefik-website
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752979681072/b2478c4b-c984-40e1-ad05-ad567011f58a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752979923652/05fa8575-a884-4e68-ad41-115e2665db48.png
tags: traefik, deploy-a-static-site, deploy-a-static-site-using-traefik-and-cloud-run-gem-cloud-run-traefik-website, deploy-a-static-site-using-traefik-and-cloud-run, gem-cloud-run-traefik-website

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

In this lab, you'll learn how to deploy a static website using Traefik as a reverse proxy and Cloud Run for serving the content. You will containerize a simple static site, push the image to Artifact Registry, configure Traefik to route traffic, and deploy it all to Cloud Run.

## Task 1. Set Up Your Environment

Configure your Google Cloud environment for this lab.

1. Enable the necessary APIs: Cloud Run, Artifact Registry, and Cloud Build.
    

```apache
gcloud services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com
```

**Note:**  
This command enables the required Google Cloud services.

2. Set your Project ID.
    

```apache
gcloud config set project qwiklabs-gcp-04-e2c6201b1f19
```

**Note:**  
Replace PROJECT\_ID with your actual project ID.

3. Set your default run region.
    

```apache
gcloud config set run/region us-central1
```

**Note:**  
Replace REGION with your desired region (e.g., us-central1).

## Task 2. Create an Artifact Registry Repository

Create a Docker repository in Artifact Registry to store your container images.

1. Create a Docker repository named 'traefik-site'.
    

```apache
gcloud artifacts repositories create traefik-repo --repository-format=docker --location=us-central1 --description="Docker repository for static site images"
```

**Note:**  
This command creates a Docker repository in Artifact Registry.

## Task 3. Build and Push the Static Site Image

Create a simple static site, containerize it using Docker, and push the image to Artifact Registry.

1. Create a directory for your static site.
    

```apache
mkdir traefik-site && cd traefik-site && mkdir public
```

2. Create an `public/index.html` file with some simple content.
    

```apache
cat > public/index.html <<EOF
<html>
<head>
  <title>My Static Website</title>
</head>
<body>
  <p>Hello from my static website on Cloud Run!</p>
</body>
</html>
EOF
```

**Note:**  
This is the HTML content for the static site.

3. Authenticate Docker to Artifact Registry.
    

```apache
gcloud auth configure-docker us-central1-docker.pkg.dev
```

**Note:**  
This command configures Docker to use your Google Cloud credentials.

4. Create a `traefik.yml` with the following content:
    

```apache
entryPoints:
  web:
    address: ":8080"

providers:
  file:
    filename: /etc/traefik/dynamic.yml
    watch: true

log:
  level: INFO 
```

**Note:**  
This command creates the Traefik configuration file.

4. Create a `dynamic.yml` with the following content:
    

```apache
http:
  routers:
    static-files:
      rule: "PathPrefix(`/`)"
      entryPoints:
        - web
      service: static-service

  services:
    static-service:
      loadBalancer:
        servers:
          - url: "http://localhost:8000"
```

**Note:**  
This command creates the dynamic content configuration file.

## Task 4. Create the Dockerfile

Define the Docker image for Traefik and your static website.

1. Create a `Dockerfile` with the following content:
    

```apache
FROM alpine:3.20

# Install traefik and caddy
RUN apk add --no-cache traefik caddy

# Copy configs and static files
COPY traefik.yml /etc/traefik/traefik.yml
COPY dynamic.yml /etc/traefik/dynamic.yml
COPY public/ /public/

# Cloud Run uses port 8080
EXPOSE 8080

# Run static server (on 8000) and Traefik (on 8080)
ENTRYPOINT [ "caddy" ]
CMD [ "file-server", "--listen", ":8000", "--root", "/public", "&", "traefik" ]
```

**Note:**  
This Dockerfile uses the official Alpine image, sets the working directory, and copies your website and Caddyfile. Traefik will be used to handle routing and Caddy used to serve web content.

## Task 5. Build and push the Docker image

Build the Docker image and push it to Artifact Registry.

1. Build the Docker image. Replace `us-central1` and `qwiklabs-gcp-04-e2c6201b1f19` with your region and project ID.
    

```apache
docker build -t us-central1-docker.pkg.dev/qwiklabs-gcp-04-e2c6201b1f19/traefik-repo/traefik-static-site:latest .
```

**Note:**  
This command builds the Docker image and tags it with the Artifact Registry repository URL.

2. Push the Docker image to Artifact Registry.
    

```apache
docker push us-central1-docker.pkg.dev/qwiklabs-gcp-04-e2c6201b1f19/traefik-repo/traefik-static-site:latest
```

**Note:**  
This command pushes the Docker image to Artifact Registry.

## Task 6. Deploy to Cloud Run

Deploy the container image to Cloud Run.

1. Deploy the service to Cloud Run. Replace `us-central1` and `qwiklabs-gcp-04-e2c6201b1f19` with your region and project ID.
    

```apache
gcloud run deploy traefik-static-site --image us-central1-docker.pkg.dev/qwiklabs-gcp-04-e2c6201b1f19/traefik-repo/traefik-static-site:latest --platform managed --allow-unauthenticated --port 8000
```

**Note:**  
This command deploys the Docker image to Cloud Run and allows unauthenticated access.

2. When prompted, confirm the service name as `traefik-static-site` and allow unauthenticated invocations.
    

**Note:**  
This configures the service name and permissions.

3. Note the service URL provided by Cloud Run.
    

**Note:**  
This is the URL where your static website is accessible.

## Task 7. Access your website

Access the deployed website through the Cloud Run service URL.

1. Open the Cloud Run service URL in your web browser.
    

**Note:**  
Verify that your static website is displayed correctly.

---

## Solution of Lab

%[https://youtu.be/zZVHyekPoL0] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Deploy%20a%20Static%20Site%20Using%20Traefik%20and%20Cloud%20Run/techcps.sh
sudo chmod +x techcps.sh
./techcps.sh
```