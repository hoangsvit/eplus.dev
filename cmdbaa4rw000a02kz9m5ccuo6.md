---
title: "Create an NPM Artifact Registry and Upload Code - gem-artifact-registry-npm"
seoTitle: "Create an NPM Artifact Registry and Upload Code - gem-artifact-registr"
seoDescription: "Learn how to create an NPM Artifact Registry on Google Cloud and upload a Node.js package using Cloud Shell"
datePublished: Sun Jul 20 2025 06:16:17 GMT+0000 (Coordinated Universal Time)
cuid: cmdbaa4rw000a02kz9m5ccuo6
slug: create-an-npm-artifact-registry-and-upload-code-gem-artifact-registry-npm
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752991965456/1d002fc8-01c2-4656-9ae7-7d7532107c17.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752992155418/32fc8d72-1884-45bf-b551-8d99a4c61118.png
tags: npm, upload-code, create-an-npm-artifact-registry-and-upload-code-gem-artifact-registry-npm, create-an-npm-artifact-registry-and-upload-code, gem-artifact-registry-npm, create-an-npm-artifact-registry

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

In this lab, you'll learn how to create an NPM Artifact Registry in Google Cloud and upload a simple Node.js package to it. This lab assumes you have basic familiarity with Google Cloud and NPM package management. You will create an Artifact Registry repository for NPM packages, configure your local environment to authenticate with Artifact Registry, create a sample NPM package, and then publish that package to your newly created repository.

## Task 1. Create an NPM Artifact Registry Repository

First, you'll create a new Artifact Registry repository specifically for storing NPM packages.

1. Enable the Artifact Registry API. If you haven't already enabled the Artifact Registry API in your project, you can do so using the following command:
    

```apache
gcloud services enable artifactregistry.googleapis.com
```

**Note:**  
This command enables the Artifact Registry API.

2. Set your Project ID: `qwiklabs-gcp-01-a18efa59ac4d`
    

```apache
gcloud config set project qwiklabs-gcp-01-a18efa59ac4d
```

**Note:**  
This command sets your active project identity.

3. Set your default region to `us-east1`
    

```apache
gcloud config set compute/region us-east1
```

**Note:**  
This command sets your active compute region.

4. Create a new NPM repository in Artifact Registry. Replace `my-npm-repo` with your desired repository name.
    

```apache
gcloud artifacts repositories create my-npm-repo \
    --repository-format=npm \
    --location=us-east1 \
    --description="NPM repository"
```

**Note:**  
Apply my-npm-repo as a unique name for your repository.

## Task 2. Create and Publish an NPM Package

Now, you'll create a simple NPM package to publish to Artifact Registry repository.

1. Create a new directory for your package and navigate into it:
    

```apache
mkdir my-npm-package
cd my-npm-package
```

**Note:**  
Creates a directory named my-npm-package

2. Initialize a new NPM package. Ensure the package name is unique (e.g. preferably prefixed with your project ID for namespacing) and `qwiklabs-gcp-01-a18efa59ac4d`:
    

```apache
npm init --scope=@qwiklabs-gcp-01-a18efa59ac4d -y
```

**Note:**  
Initializes an npm package with a scope

3. Create a simple index.js file:
    

```apache
echo 'console.log(`Hello from my-npm-package!`);' > index.js
```

**Note:**  
Creates a basic index.js file

## Task 3. Configure NPM to Authenticate with Artifact Registry

Next, configure NPM to authenticate with your Artifact Registry repository. This allows you to publish and install packages.

1. Create Artifact settings in your .npmrc file (if it does not exist create it). Note that this step generates the `.npmrc` file.
    

```apache
gcloud artifacts print-settings npm \
    --project=qwiklabs-gcp-01-a18efa59ac4d \
    --repository=my-npm-repo \
    --location=us-east1 \
    --scope=@qwiklabs-gcp-01-a18efa59ac4d > ./.npmrc
```

**Note:**  
This command prints configuration settings for npm and adds a scope. Use this command to generate the formatting required in the `.npmrc` to avoid formatting issues.

2. Authenticate to Artifact Registry. Run the following command to authenticate:
    

```apache
gcloud auth configure-docker us-east1-npm.pkg.dev
```

**Note:**  
This command configures Docker to authenticate with Artifact Registry.

3. Update the package.json file to authenticate to Artifact Registry
    

```json
{
  "name": "@qwiklabs-gcp-00-e9159952f381/my-npm-package",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "artifactregistry-login": "npx google-artifactregistry-auth --repo-config=./.npmrc --credential-config=./.npmrc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```

**Note:**  
Add the artifactregistry-login script into the package.json

4. Refresh the authentication token by calling the artifactregisty-login
    

```apache
npm run artifactregistry-login
```

**Note:**  
The artifactregistry-login script command will use your active gcloud login to fetch a short-lived access token and insert it into your .npmrc file.

5. View the .npmrc file to view the authentication token is added
    

```apache
cat .npmrc
```

**Note:**  
A fresh authentication token has been added to the .npmrc file.

6. Publish the package to Artifact Registry. Replace `my-npm-repo` with your repository name:
    

```apache
npm publish --registry=https://us-east1-npm.pkg.dev/qwiklabs-gcp-01-a18efa59ac4d/my-npm-repo/
```

**Note:**  
The package has been published to the specified Artifact Registry repository.

## Task 4. Verify Package Upload

Confirm the package has been successfully uploaded to artifact registry

1. Navigate to Artifact Registry in the Google Cloud Console.
    

```apache
gcloud artifacts packages list --repository=my-npm-repo --location=us-east1
```

**Note:**  
This command lists NPM packages in the Artifact Registry. You can verify that your package exists.

2. Verify that your package is listed in the Artifact Registry repository.
    

```apache
PACKAGE: @qwiklabs-gcp-01-a18efa59ac4d
CREATE_TIME: 2025-06-25T04:20:04
UPDATE_TIME: 2025-06-25T04:20:04
ANNOTATIONS:
```

**Note:**  
This command lists packages in the Artifact Registry. You can verify that your package exists.

---

## Solution of Lab

%[https://youtu.be/Yhmesf3y_N4] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Create%20an%20NPM%20Artifact%20Registry%20and%20Upload%20Code/techcps.sh
sudo chmod +x techcps.sh
./techcps.sh
```