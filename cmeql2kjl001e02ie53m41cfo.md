---
title: "Developer Essentials: Creating Secrets with Secret Manager - gem-secret-manager-create-secrets"
seoTitle: "Developer Essentials: Creating Secrets with Secret Manager - gem-secre"
seoDescription: "Learn to manage secrets securely in Google Cloud with Secret Manager. Create, store, and access secrets using Cloud Shell and gcloud commands"
datePublished: Mon Aug 25 2025 03:54:35 GMT+0000 (Coordinated Universal Time)
cuid: cmeql2kjl001e02ie53m41cfo
slug: developer-essentials-creating-secrets-with-secret-manager-gem-secret-manager-create-secrets
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756093954151/032a7630-fe7d-4070-8503-42a36c3170b7.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756094032727/55df99fd-7823-4e32-b9aa-f6c335c1ee13.png
tags: developer-essentials, developer-essentials-creating-secrets-with-secret-manager-gem-secret-manager-create-secrets, gem-secret-manager-create-secrets, developer-essentials-creating-secrets-with-secret-manager, creating-secrets-with-secret-manager

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

In this lab, you'll learn how to create and manage secrets using Google Cloud Secret Manager. You will create a secret, store a secret value, and retrieve the secret value. This lab assumes you have basic familiarity with Google Cloud and the command line.

## Task 1. Enable the Secret Manager API

Before using Secret Manager, you need to enable the API for your project.

1. Enable the Secret Manager API using the following command.
    
    ```apache
    gcloud services enable secretmanager.googleapis.com --project=qwiklabs-gcp-03-a79ee94ac3e9
    ```
    
    **Note:**  
    This command enables the Secret Manager API for your project, allowing you to create and manage secrets.
    

## Task 2. Create a Secret

Create a new secret in Secret Manager.

1. Create a secret named `my-secret`.
    
    ```apache
    gcloud secrets create my-secret --project=qwiklabs-gcp-03-a79ee94ac3e9
    ```
    
    **Note:**  
    This command creates a secret named `my-secret` in your Google Cloud project. Secrets are used to store sensitive information, such as passwords, API keys, and certificates.
    

## Task 3. Add a Secret Version

Add a version to the secret with the actual secret value.

1. Add a new version to `my-secret` with the value `super-secret-password`.
    
    ```apache
    echo -n "super-secret-password" | gcloud secrets versions add my-secret --data-file=- --project=qwiklabs-gcp-03-a79ee94ac3e9
    ```
    
    **Note:**  
    This command adds a new version to the `my-secret` secret, storing the value "super-secret-password". The `-n` flag in the `echo` command prevents adding a newline character to the secret value. The `--data-file=-` flag specifies that the data is read from standard input.
    

## Task 4. Access the Secret Value

Retrieve the secret value from Secret Manager.

1. Access the latest version of `my-secret` and print the secret value.
    
    ```apache
    echo "$(gcloud secrets versions access latest --secret=my-secret --project=qwiklabs-gcp-03-a79ee94ac3e9)"
    ```
    
    **Note:**  
    This command retrieves the secret value of the latest version of `my-secret` and prints it to the console. This allows you to verify the stored secret.
    
2. Alternatively, you can store the secret value into an environment variable.
    
    ```apache
    export MY_SECRET=$(gcloud secrets versions access latest --secret=my-secret --project=qwiklabs-gcp-03-a79ee94ac3e9)
    ```
    
    **Note:**  
    This command retrieves the secret value and stores it in an environment variable named `MY_SECRET`. This allows you to use the secret in subsequent commands or scripts without directly exposing the secret value in your code.
    
3. Access the environment variable and print the secret value.
    
    ```apache
    echo "${MY_SECRET}"
    ```
    
    **Note:**  
    This command retrieves the environment variable of `my-secret`. This allows you to verify the environment variable secret.
    

---

## Solution of Lab

%[https://youtu.be/q4zsQi58mMs] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/gem-secret-manager-create-secrets/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

**Script alternative**

```apache
curl -LO raw.githubusercontent.com/gcpsolution99/GCP-solution/refs/heads/main/GSP/Abhi_Creating_Secrets.sh
sudo chmod +x Abhi_Creating_Secrets.sh
./Abhi_Creating_Secrets.sh
```