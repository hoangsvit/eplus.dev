---
title: "Deploy a Static Site with Nginx on Google Cloud Run using Artifact Registry - gem-cloud-run-nginx-website"
seoTitle: "Deploy a Static Site with Nginx on Google Cloud Run using Artifact Reg"
seoDescription: "Learn how to deploy a static website using Nginx on Google Cloud Run with Artifact Registry, utilizing Docker and gcloud commands"
datePublished: Sun Jul 20 2025 02:46:44 GMT+0000 (Coordinated Universal Time)
cuid: cmdb2snfd000202joa7t9fu2t
slug: deploy-a-static-site-with-nginx-on-google-cloud-run-using-artifact-registry-gem-cloud-run-nginx-website
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752978880549/71fee543-5089-41a3-b5ae-c7377fafceb6.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752979567155/57187080-56f2-42bd-886c-aad40da208b9.png
tags: google-cloud-run, cloud-run, artifact-registry, deploy-a-static-site, deploy-a-static-site-with-nginx-on-google-cloud-run-using-artifact-registry-gem-cloud-run-nginx-website, gem-cloud-run-nginx-website, deploy-a-static-site-with-nginx-on-google-cloud-run-using-artifact-registry

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

In this lab, you will learn how to deploy a static website using Nginx on Google Cloud Run. You'll build a Docker image, store it in Artifact Registry, and then deploy it to Cloud Run, making your website accessible via a public URL.

## Task 1. Set up your Environment

Configure your Google Cloud environment by setting the project ID, region and enabling necessary services.

1. Set your Project ID is: `qwiklabs-gcp-01-ddb400ec2267`
    

```apache
gcloud config set project qwiklabs-gcp-01-ddb400ec2267
```

**Note:**  
This command sets your active project.

2. Set your default region to `us-east1`
    

```apache
gcloud config set run/region us-east1
```

**Note:**  
This command sets your default cloud run region.

3. Enable the Cloud Run and Artifact Registry APIs.
    

```apache
gcloud services enable run.googleapis.com artifactregistry.googleapis.com
```

**Note:**  
This command enables the required Google Cloud services.

## Task 2. Create a Static Website

Create a simple HTML file that will be served by Nginx.

1. Create an `index.html` file with the following content:
    

```apache
cat > index.html <<EOF
<!DOCTYPE html>
<html>
<head>
    <title>My Static Website</title>
</head>
<body>
    <div>Welcome to My Static Website!</div>
    <p>This website is served from Google Cloud Run using Nginx and Artifact Registry.</p>
</body>
</html>
EOF
```

**Note:**  
This command creates the index.html file.

## Task 3. Create an Nginx Configuration

Create an Nginx configuration file to serve the static website.

1. Create a `nginx.conf` file with the following content:
    

```apache
cat > nginx.conf <<EOF
events {}
http {
    server {
        listen 8080;
        root /usr/share/nginx/html;
        index index.html index.htm;

        location / {
            try_files \$uri \$uri/ =404;
        }
    }
}
EOF
```

**Note:**  
This command creates the nginx.conf file.

## Task 4. Create a Dockerfile

Create a Dockerfile to build an image with Nginx and your static website.

1. Create a `Dockerfile` with the following content:
    

```apache
cat > Dockerfile <<EOF
FROM nginx:latest

COPY index.html /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
EOF
```

**Note:**  
This command creates the Dockerfile.

## Task 5. Build and Push the Docker Image to Artifact Registry

Build the Docker image and push it to Artifact Registry.

1. Create an Artifact Registry repository named `nginx-static-site` in the region you configured.
    

```apache
gcloud artifacts repositories create nginx-static-site \
    --repository-format=docker \
    --location=us-east1 \
    --description="Docker repository for static website"
```

**Note:**  
This command creates the Artifact Registry repository.

2. Build the Docker image.
    

```apache
docker build -t nginx-static-site .
```

**Note:**  
This command builds the Docker image.

3. Tag the Docker image with the Artifact Registry repository URL.
    

```apache
docker tag nginx-static-site us-east1-docker.pkg.dev/qwiklabs-gcp-01-ddb400ec2267/nginx-static-site/nginx-static-site
```

**Note:**  
This command tags the Docker image.

4. Push the Docker image to Artifact Registry.
    

```apache
docker push us-east1-docker.pkg.dev/qwiklabs-gcp-01-ddb400ec2267/nginx-static-site/nginx-static-site
```

**Note:**  
Ensure Docker is authenticated with gcloud. Run `gcloud auth configure-docker` if you have issues pushing the image.

## Task 6. Deploy to Cloud Run

Deploy the Docker image from Artifact Registry to Cloud Run.

1. Deploy the image to Cloud Run, allowing unauthenticated invocations.
    

```apache
gcloud run deploy nginx-static-site \
    --image us-east1-docker.pkg.dev/qwiklabs-gcp-01-ddb400ec2267/nginx-static-site/nginx-static-site \
    --platform managed \
    --region us-east1 \
    --allow-unauthenticated
```

**Note:**  
This command deploys the image to Cloud Run and allows unauthenticated access.

2. Retrieve the Cloud Run service URL.
    

```apache
gcloud run services describe nginx-static-site --platform managed --region us-east1 --format='value(status.url)'
```

**Note:**  
This will print the public URL of your deployed static site.

## Task 7. Verify the Deployment

Access the provided URL to verify your deployment. You should see your static website.

1. Open the URL provided by the `gcloud run services describe` command in your web browser.
    

**Note:**  
You should see the 'Welcome to My Static Website!' message.

---

## Solution of Lab

%[https://youtu.be/FA9Q3EyDzwc] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Deploy%20a%20Static%20Site%20with%20Nginx%20on%20Google%20Cloud%20Run%20using%20Artifact%20Registry/techcps.sh
sudo chmod +x techcps.sh
./techcps.sh
```