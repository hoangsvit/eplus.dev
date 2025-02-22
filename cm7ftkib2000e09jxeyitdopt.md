---
title: "Secure Builds with Cloud Build - GSP1184"
seoTitle: "Secure Builds with Cloud Build - GSP1184"
seoDescription: "Software vulnerabilities are weaknesses that can cause an accidental system failure or provide bad actors a means to compromise your software. Artifact Anal"
datePublished: Sat Feb 22 2025 06:29:04 GMT+0000 (Coordinated Universal Time)
cuid: cm7ftkib2000e09jxeyitdopt
slug: secure-builds-with-cloud-build-gsp1184
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740205699219/886acb99-f824-47bf-b33c-22627b40850e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740205722568/ac5f9c48-54de-453f-b2ea-cec3f8cd5e36.png
tags: secure-builds-with-cloud-build-gsp1184, secure-builds-with-cloud-build, gsp1184

---

## **Overview**

Software vulnerabilities are weaknesses that can cause an accidental system failure or provide bad actors a means to compromise your software. [Artifact Analysis](https://cloud.google.com/artifact-registry/docs/analysis) provides two kinds of OS scanning to find vulnerabilities in containers:

* The [On-Demand Scanning API](https://cloud.google.com/artifact-analysis/docs/os-scanning-on-demand) allows you to manually scan container images for OS vulnerabilities, either locally on your computer or remotely in Artifact Registry. This gives you granular control over the containers you want to scan for vulnerabilities.
    
* The [Container Scanning API](https://cloud.google.com/artifact-analysis/docs/os-overview) allows you to automate OS vulnerability detection, scanning each time you push an image to Artifact Registry. You can use On-Demand Scanning to scan images in your CI/CD pipeline before deciding whether to store them in a registry. Enabling this API also enables language package scans for Go and Java vulnerabilities.
    

In this lab you'll learn how to build and scan for vulnerabilities conainer images stored in Artifact Registry wth Cloud Build.

### What you'll learn

In this lab you'll:

* Build Images with Cloud Build
    
* Use Artifact Registry for Containers
    
* Utilize automated vulnerability scanning
    
* Configure On-Demand Scanning
    
* Add image scanning in CI/CD in Cloud Build
    

## **Setup and Requirements**

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
    student-04-6f252193a073@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    leJzDw4mLwEa
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-c874e6b587e8`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-c874e6b587e8
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
ACCOUNT: student-04-6f252193a073@qwiklabs.net

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
project = qwiklabs-gcp-03-c874e6b587e8
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Environment Setup

1. In Cloud Shell, set your project ID and the project number for your project. Save them as `PROJECT_ID` and `PROJECT_NUMBER` variables:
    

```apache
export PROJECT_ID=$(gcloud config get-value project)
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID \
    --format='value(projectNumber)')
```

2. Enable all necessary services:
    

```apache
gcloud services enable \
  cloudkms.googleapis.com \
  cloudbuild.googleapis.com \
  container.googleapis.com \
  containerregistry.googleapis.com \
  artifactregistry.googleapis.com \
  containerscanning.googleapis.com \
  ondemandscanning.googleapis.com \
  binaryauthorization.googleapis.com
```

Click **Check my progress** to verify the objective.

Enable the required APIs

Check my progress

## **Task 1. Build images with Cloud Build**

In this section you will create an automated build pipeline to build your container image, scan it, then evaluate the results. If no CRITICAL vulnerabilities are found it will push the image to the repository. If CRITICAL vulnerabilities are found the build will fail and exit.

1. Provide access for Cloud Build Service Account:
    

```apache
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
        --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
        --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
        --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
        --role="roles/ondemandscanning.admin"
```

Cloud Build will need rights to access the on-demand scanning api. Provide access with the following commands.

2. Create and change into a work directory:
    

```apache
mkdir vuln-scan && cd vuln-scan
```

3. Define a sample image:
    

Create a file called Dockerfile with the following contents:

```apache
cat > ./Dockerfile << EOF
FROM gcr.io/google-appengine/debian10@sha256:d25b680d69e8b386ab189c3ab45e219fededb9f91e1ab51f8e999f3edc40d2a1

# System
RUN apt update && apt install python3-pip -y

# App
WORKDIR /app
COPY . ./

RUN pip3 install Flask==1.1.4  
RUN pip3 install gunicorn==20.1.0  

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app

EOF
```

4. Create a file called main.py with the following contents:
    

```apache
cat > ./main.py << EOF
import os
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    name = os.environ.get("NAME", "Worlds")
    return "Hello {}!".format(name)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
EOF
```

### Create the Cloud Build pipeline

You will create a `cloudbuild.yaml` file in your directory that will be used for the automated process. For this lab the steps are limited to the container build process. In practice, however, you would include application specific instructions and tests in addition to the container steps.

1. Create the file with the following command:
    

```apache
cat > ./cloudbuild.yaml << EOF
steps:

# build
- id: "build"
  name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image', '.']
  waitFor: ['-']


EOF
```

2. Run the CI pipeline:
    

Submit the build for processing:

```apache
gcloud builds submit
```

3. Once the build process has started, in the Cloud console, open the **Cloud Build** dashboard to view the contents.
    

Click **Check my progress** to verify the objective.

Build the images with Cloud Build

Check my progress

## **Task 2. Use Artifact Registry for Containers**

### Create Artifact Registry repository

You will be using Artifact Registry to store and scan your images.

1. Create the repository with the following command:
    

```apache
gcloud artifacts repositories create artifact-scanning-repo \
  --repository-format=docker \
  --location=us-central1 \
  --description="Docker repository"
```

2. Configure docker to utilize your gcloud credentials when accessing Artifact Registry:
    

```apache
gcloud auth configure-docker us-central1-docker.pkg.dev
```

3. Modify the Cloud Build pipeline to push the resulting image to Artifact Registry:
    

```apache
cat > ./cloudbuild.yaml << EOF
steps:

# build
- id: "build"
  name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image', '.']
  waitFor: ['-']

# push to artifact registry
- id: "push"
  name: 'gcr.io/cloud-builders/docker'
  args: ['push',  'us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image']

images:
  - us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image
EOF
```

4. Run the CI pipeline:
    

```apache
gcloud builds submit
```

Click **Check my progress** to verify the objective.

Create Artifact Registry repository

Check my progress

## **Task 3. Automated vulnerability scanning**

Scanning is triggered automatically every time you push a new image to Artifact Registry. Vulnerability information is continuously updated when new vulnerabilities are discovered.

In this section you'll review the image you just built and pushed to the Artifact Registry and explore the vulnerability results.

### Review Image Details

Once the build process has completed, review the image and vulnerability results in the Artifact Registry dashboard.

1. In the Cloud console, open **Artifact Registry**.
    
2. Click on the **artifact-scanning-repo** to view the contents.
    
3. Click into the image details.
    
4. Click into the latest digest of your image.
    
5. Once the scan has finished, click on the **Vulnerabilities** tab for the image.
    

From the vulnerabilities tab you will see the results of the automatic scanning for the image you just built.

![Artifact Registry page showing the Vulnerabilities tab](https://cdn.qwiklabs.com/0Mvdish16y0xqfT%2BGI1UhiOJFdPcMoIjaCH9IrelUQQ%3D align="left")

Auto scanning is enabled by default. Explore the Artifact Registry Settings to see how you can turn off/on auto scanning.

## **Task 4. On Demand Scanning**

There are various scenarios where you may need to perform a scan before pushing the image to a repository. For example, a container developer may scan an image and fix the issues it finds before pushing code to the source control.

In the example below you will build and analyze the image locally before acting on the results.

1. Use local docker to build the image to your local cache:
    

```apache
docker build -t us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image .
```

2. Once the image has been built, request a scan of the image:
    

```apache
gcloud artifacts docker images scan \
    us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image \
    --format="value(response.scan)" > scan_id.txt
```

The results of the scan are stored in a metadata server. The job completes with a location of the results in the metadata server.

3. Review the output which was stored in the `scan_id.txt` file:
    

```apache
cat scan_id.txt
```

Notice the report location of the scan results in the metadata server.

4. To view the actual results of the scan, use the `list-vulnerabilities` command on the report location noted in the output file:
    

```apache
gcloud artifacts docker images list-vulnerabilities $(cat scan_id.txt)
```

The output contains a significant amount of data about all the vulnerabilities in the image Humans rarely use the data stored in the report directly. Typically the results are used by an automated process.

5. Use the commands below to read the report details and log if any CRITICAL vulnerabilities were found:
    

```apache
export SEVERITY=CRITICAL

gcloud artifacts docker images list-vulnerabilities $(cat scan_id.txt) --format="value(vulnerability.effectiveSeverity)" | if grep -Fxq ${SEVERITY}; then echo "Failed vulnerability check for ${SEVERITY} level"; else echo "No ${SEVERITY} Vulnerabilities found"; fi
```

The output from this command will be

```apache
Failed vulnerability check for CRITICAL level
```

Click **Check my progress** to verify the objective.

Scan the images using On Demand Scanning

Check my progress

## **Task 5. Use Artifact Scanning in CI/CD in Cloud Build**

First, you'll provide Cloud Build rights to access the on-demand scanning api.

1. Provide access with the following commands:
    

```apache
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
        --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
        --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
        --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
        --role="roles/ondemandscanning.admin"
```

2. Update the Cloud Build pipeline with the following command which creates a `cloudbuild.yaml` file that will be used for the automated process:
    

```apache
cat > ./cloudbuild.yaml << EOF
steps:

# build
- id: "build"
  name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image', '.']
  waitFor: ['-']

#Run a vulnerability scan at _SECURITY level
- id: scan
  name: 'gcr.io/cloud-builders/gcloud'
  entrypoint: 'bash'
  args:
  - '-c'
  - |
    (gcloud artifacts docker images scan \
    us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image \
    --location us \
    --format="value(response.scan)") > /workspace/scan_id.txt

#Analyze the result of the scan
- id: severity check
  name: 'gcr.io/cloud-builders/gcloud'
  entrypoint: 'bash'
  args:
  - '-c'
  - |
      gcloud artifacts docker images list-vulnerabilities \$(cat /workspace/scan_id.txt) \
      --format="value(vulnerability.effectiveSeverity)" | if grep -Fxq CRITICAL; \
      then echo "Failed vulnerability check for CRITICAL level" && exit 1; else echo "No CRITICAL vulnerability found, congrats !" && exit 0; fi

#Retag
- id: "retag"
  name: 'gcr.io/cloud-builders/docker'
  args: ['tag',  'us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image', 'us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image:good']


#pushing to artifact registry
- id: "push"
  name: 'gcr.io/cloud-builders/docker'
  args: ['push',  'us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image:good']

images:
  - us-central1-docker.pkg.dev/${PROJECT_ID}/artifact-scanning-repo/sample-image
EOF
```

For this example the steps are limited to the container build process. In practice you would include application specific instructions and tests in addition to the container steps.

3. Submit the build for processing to verify that the build breaks when a CRITICAL severity vulnerability is found.
    

```apache
gcloud builds submit
```

4. Review Build Failure in the [Cloud Build History](https://console.cloud.google.com/cloud-build/builds) page.
    

Click **Check my progress** to verify the objective.

Verify that the build breaks when a CRITICAL severity vulnerability is found

Check my progress

### Fix the Vulnerability

Update the Dockerfile to use a base image that does not contain CRITICAL vulnerabilities.

1. Overwrite the Dockerfile to use the Debian 10 image with the following command:
    

```apache
cat > ./Dockerfile << EOF
FROM python:3.8-alpine 


# App
WORKDIR /app
COPY . ./

RUN pip3 install Flask==2.1.0
RUN pip3 install gunicorn==20.1.0
RUN pip3 install Werkzeug==2.2.2

CMD exec gunicorn --bind :\$PORT --workers 1 --threads 8 main:app

EOF
```

2. Submit the build for processing to verify that the build will succeed when no CRITICAL severity vulnerabilities are found:
    

```apache
gcloud builds submit
```

3. In the Cloud console, navigate to **Cloud Build &gt; Cloud Build History** to review the build success.
    

Click **Check my progress** to verify the objective.

Fix the Vulnerability

Check my progress

### Review Scan results

Review the good image in Artifact Registry.

1. Open **Artifact Registry** in the Cloud console.
    
2. Click on the **artifact-scanning-repo** to view the contents.
    
3. Click into the image details.
    
4. Click into the latest digest of your image.
    
5. Click on the **Vulnerabilities** tab for the image.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=DNrBihMIYUo&ab_channel=QUICKGCPLAB] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Secure%20Builds%20with%20Cloud%20Build/gsp1184.sh
sudo chmod +x gsp1184.sh
./gsp1184.sh
```