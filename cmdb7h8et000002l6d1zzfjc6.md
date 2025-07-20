---
title: "Create a Go Artifact Registry and Upload Code - gem-artifact-registry-go"
seoTitle: "Create a Go Artifact Registry and Upload Code - gem-artifact-registry-"
seoDescription: "Learn to create and configure a Go Artifact Registry on Google Cloud and upload Go modules seamlessly with step-by-step guidance"
datePublished: Sun Jul 20 2025 04:57:49 GMT+0000 (Coordinated Universal Time)
cuid: cmdb7h8et000002l6d1zzfjc6
slug: create-a-go-artifact-registry-and-upload-code-gem-artifact-registry-go
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752980767677/c9af9e66-66a0-43ca-baa9-89994a667c50.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752987512367/b2e5d58a-7d6b-4004-aa3b-b4e4b0c112da.png
tags: create-a-go-artifact-registry-and-upload-code-gem-artifact-registry-go, create-a-go-artifact-registry-and-upload-code, gem-artifact-registry-go

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

In this lab, you will learn how to create an Artifact Registry repository for Go packages and upload a sample Go module to it. This allows you to manage and share Go packages within your Google Cloud environment. This lab focuses on using Artifact Registry for container images.

## Task 1. Create an Artifact Registry Repository

First, you'll create a new Artifact Registry repository to store your Go packages. Choose a name and region for your repository.

1. Enable the Artifact Registry API.
    

```apache
gcloud services enable artifactregistry.googleapis.com
```

**Note:**  
This command enables the Artifact Registry API for your project.

2. Set your Project ID is: `qwiklabs-gcp-03-4ae61595ee42`
    

```apache
gcloud config set project qwiklabs-gcp-03-4ae61595ee42
```

**Note:**  
This command sets your active project identity.

3. Set your default region to `us-east1`
    

```apache
gcloud config set compute/region us-east1
```

**Note:**  
This command sets your active compute region.

4. Create a new Artifact Registry repository. Ensure you are using a supported region (`us-east1`).
    

```apache
gcloud artifacts repositories create my-go-repo \
    --repository-format=go \
    --location=us-east1 \
    --description="Go repository"
```

**Note:**  
This command creates the Artifact Registry repository.

5. Verify the repository was created successfully. Replace `my-go-repo` with your repository name.
    

```apache
gcloud artifacts repositories describe my-go-repo \
    --location=us-east1
```

**Note:**  
This command describes the Artifact Registry repository.

## Task 2. Configure Go to Use Artifact Registry

Next, you'll configure your Go environment to use the newly created Artifact Registry repository.

1. Set the `GOPRIVATE` environment variable. Replace `qwiklabs-gcp-03-4ae61595ee42` with your Google Cloud project ID.
    

```apache
go env -w GOPRIVATE=cloud.google.com/qwiklabs-gcp-03-4ae61595ee42
```

**Note:**  
This command sets the GOPRIVATE environment variable.

2. Configure `go` to authenticate with Artifact Registry. Replace `us-east1` with your repository's region and `qwiklabs-gcp-03-4ae61595ee42` with your Google Cloud project ID.
    

```apache
export GONOPROXY=github.com/GoogleCloudPlatform/artifact-registry-go-tools
GOPROXY=proxy.golang.org go run github.com/GoogleCloudPlatform/artifact-registry-go-tools/cmd/auth@latest add-locations --locations=us-east1
```

**Note:**  
This command configures go to authenticate with Artifact Registry using application default credentials.

## Task 3. Create a Sample Go Module

Now, let's create a simple Go module to upload to the Artifact Registry.

1. Create a directory for your Go module. Replace `hello` with desired directory name.
    

```apache
mkdir hello
cd hello
```

**Note:**  
This command creates the module directory and navigates into it.

2. Initialize the Go module.
    

```apache
go mod init labdemo.app/hello
```

**Note:**  
This command initializes the Go module.

3. Create a `hello.go` file with the following content:
    

```apache
package main

import "fmt"

func main() {
	fmt.Println("Hello, Go module from Artifact Registry!")
}
```

**Note:**  
This code defines a simple Go program.

4. Optional: Verify the go module builds
    

```apache
go build
```

**Note:**  
This command builds the go module.

## Task 4. Set up Version control

Add version control information to the environment.

1. Setup the user email
    

```apache
git config --global user.email student-03-5c2b4f182187@qwiklabs.net
```

2. Setup the user name
    

```apache
git config --global user.name cls 
```

3. Set the default branch naming as main
    

```apache
git config --global init.defaultBranch main 
```

4. Initialize a git repo
    

```apache
git init
```

5. Add the files to the repository
    

```apache
git add .
```

6. Add a commit message
    

```apache
git commit -m "Initial commit"
```

7. Tag the files
    

```apache
git tag v1.0.0
```

## Task 5. Upload the Go Module to Artifact Registry

Finally, you'll upload the Go module to your Artifact Registry repository.

1. Upload the module to Artifact Registry using the go upload command. Replace `us-east1` with your repository's region, `my-go-repo` with your repository name.
    

```apache
gcloud artifacts go upload \
  --repository=my-go-repo \
  --location=us-east1 \
  --module-path=labdemo.app/hello \
  --version=v1.0.0 \
  --source=.
```

**Note:**  
This command uploads the Go module to Artifact Registry.

2. Verify the module has been pushed.
    

```apache
gcloud artifacts packages list --repository=my-go-repo --location=us-east1
```

**Note:**  
This command lists Go packages in the Artifact Registry. You can verify that your package exists.

---

## Solution of Lab

%[https://youtu.be/bHweudFzO2g] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Create%20a%20Go%20Artifact%20Registry%20and%20Upload%20Code/techcps.sh
sudo chmod +x techcps.sh
./techcps.sh
```