---
title: "Create a Maven Artifact Registry and Upload Code - gem-artifact-registry-maven"
seoTitle: "Create a Maven Artifact Registry and Upload Code - gem-artifact-regist"
seoDescription: "Learn to create a Maven Artifact Registry on Google Cloud, configure gcloud and Maven, and deploy a sample project"
datePublished: Sun Jul 20 2025 06:30:04 GMT+0000 (Coordinated Universal Time)
cuid: cmdbaruz2000902l15nchaz6q
slug: create-a-maven-artifact-registry-and-upload-code-gem-artifact-registry-maven
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752992800943/34390aa7-df6d-4aed-a322-8b9c3b7d7478.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752992969993/a03a9bbb-c6df-4f4a-a6c4-e8b018dcfb81.png
tags: maven, upload-code, create-a-maven-artifact-registry-and-upload-code-gem-artifact-registry-maven, create-a-maven-artifact-registry-and-upload-code, gem-artifact-registry-maven, create-a-maven-artifact-registry

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

In this lab, you will learn how to create a Maven Artifact Registry in Google Cloud and upload a sample Maven project to it. You'll use the gcloud CLI and Maven commands to interact with Artifact Registry, enabling you to store and manage your Java dependencies effectively. This lab assumes you have basic familiarity with Google Cloud, Maven, and command-line operations.

## Task 1. Enable Artifact Registry API and Configure gcloud

Enable the Artifact Registry API and configure the gcloud CLI to interact with your Google Cloud project.

1. Enable the Artifact Registry API:
    

```apache
gcloud services enable artifactregistry.googleapis.com
```

**Note:**  
This command enables the Artifact Registry API in your project.

2. Set your Project ID: `qwiklabs-gcp-02-cf0b9c197435`
    

```apache
gcloud config set project qwiklabs-gcp-02-cf0b9c197435
```

**Note:**  
This command sets your active project identity.

3. Set your default region to `us-central1`
    

```apache
gcloud config set compute/region us-central1
```

**Note:**  
This command sets your active compute region.

## Task 2. Create a Maven Repository in Artifact Registry

Create a new Maven repository in Artifact Registry to store your Maven artifacts.

1. Create a new Maven repository in Artifact Registry.
    

```apache
gcloud artifacts repositories create my-maven-repo \
    --repository-format=maven \
    --location=us-central1 \
    --description="Maven repository"
```

**Note:**  
Replace my-maven-repo with your desired repository name.

2. Verify the repository was created successfully by listing the available repositories.
    

```apache
gcloud artifacts repositories list --location=us-central1
```

**Note:**  
This command lists all Artifact Registry repositories in the specified region.

## Task 3. Configure Maven for Artifact Registry

Configure Maven to authenticate with Artifact Registry.

1. Configure Maven authentication using the gcloud CLI.
    

```apache
gcloud artifacts print-settings mvn --repository=my-maven-repo --project=qwiklabs-gcp-02-cf0b9c197435 --location=us-central1
```

**Note:**  
Replace my-maven-repo with your desired repository name. This command generates XML configuration for Maven.

2. The output from the previous command will be similar to below:
    

```xml
<project>
<distributionmanagement>
<snapshotrepository>
<id>artifact-registry</id>
<url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-02-cf0b9c197435/my-maven-repo</url>
</snapshotrepository>
<repository>
<id>artifact-registry</id>
<url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-02-cf0b9c197435/my-maven-repo</url>
</repository>
</distributionmanagement>
<repositories>
<repository>
<id>artifact-registry</id>
<url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-02-cf0b9c197435/my-maven-repo</url>
<releases>
<enabled>true</enabled>
</releases>
<snapshots>
<enabled>true</enabled>
</snapshots>
</repository>
</repositories>
<build>
<extensions>
<extension>
<groupid>com.google.cloud.artifactregistry</groupid>
<artifactid>artifactregistry-maven-wagon</artifactid>
<version>2.2.0</version>
</extension>
</extensions>
</build>
</project>
```

**Note:**  
The output provides a valuable template that can be used to define the settings for an example Maven configuration.

## Task 4. Create and Deploy a Sample Maven Project

Create a sample Maven project and deploy it to Artifact Registry.

1. Create a new Maven project using the `mvn archetype:generate` command. Choose a suitable archetype (e.g., `maven-archetype-quickstart`).
    

```apache
mvn archetype:generate \
    -DgroupId=com.example \
    -DartifactId=my-app \
    -Dversion=1.0-SNAPSHOT \
    -DarchetypeArtifactId=maven-archetype-quickstart \
    -DinteractiveMode=false
```

**Note:**  
This command generates a basic Maven project structure. On successful completion a file `pom.xml` will be generated in the designated folder.

2. Navigate to the project directory.
    

```apache
cd my-app
```

**Note:**  
Change directory to your new maven app

3. Output the mvn Artifact Registry settings to a file `example.xml`.
    

```apache
gcloud artifacts print-settings mvn --repository=my-maven-repo --project=qwiklabs-gcp-02-cf0b9c197435 --location=us-central1 > example.pom
```

**Note:**  
If you are unsure how to make the edits, use the `example.xml` file to validate the sample application settings.

4. Update the generated `pom.xml` file to include the Artifact Registry repository information for deployment. Add a `<distributionManagement>` section:
    

```xml
<distributionmanagement>
<repository>
<id>artifact-registry</id>
<url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-02-cf0b9c197435/my-maven-repo</url>
</repository>
<snapshotrepository>
<id>artifact-registry</id>
<url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-02-cf0b9c197435/my-maven-repo</url>
</snapshotrepository>
</distributionmanagement>
```

**Note:**  
Place the new distributionManagement xml section within the project block of the pom.xml.

4. Add a build section to provider Artifact Registry Authentication in the pom.xml
    

```xml
<build>
<extensions>
<extension>
<groupid>com.google.cloud.artifactregistry</groupid>
<artifactid>artifactregistry-maven-wagon</artifactid>
<version>2.2.0</version> </extension>
</extensions>
</build>
```

**Note:**  
Place the new build xml section within the project block of the pom.xml.

5. The updated pom.xml will look similar to below:
    

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemalocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
<modelversion>4.0.0</modelversion>
<groupid>com.example</groupid>
<artifactid>my-app</artifactid>
<packaging>jar</packaging>
<version>1.0-SNAPSHOT</version>
<name>my-app</name>
<url>http://maven.apache.org</url>
<build>
<extensions>
<extension>
<groupid>com.google.cloud.artifactregistry</groupid>
<artifactid>artifactregistry-maven-wagon</artifactid>
<version>2.2.0</version> </extension>
</extensions>
</build>
<distributionmanagement>
<snapshotrepository>
<id>artifact-registry</id>
<url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-02-cf0b9c197435/my-maven-repo</url>
</snapshotrepository>
<repository>
<id>artifact-registry</id>
<url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-02-cf0b9c197435/my-maven-repo</url>
</repository>
</distributionmanagement>
<dependencies>
<dependency>
<groupid>junit</groupid>
<artifactid>junit</artifactid>
<version>3.8.1</version>
<scope>test</scope>
</dependency>
</dependencies>
</project>
```

**Note:**  
The above changes enable the build process to interact with Artifact Registry.

6. Deploy the artifact to Artifact Registry using the `mvn deploy` command.
    

```apache
mvn deploy
```

**Note:**  
This command deploys the Maven artifact to Artifact Registry.

## Task 5. Validate Artifact Registry

1. Verify the artifact was deployed successfully by navigating to your Artifact Registry repository in the Google Cloud Console or by listing the artifacts using the gcloud CLI.
    

```apache
gcloud artifacts versions list --repository=my-maven-repo --package=com.example:my-app --location=us-central1
```

**Note:**  
This command lists package in the specified repository.

2. Verify that your package is listed in the Artifact Registry repository.
    

```apache
PACKAGE: my-package
CREATE_TIME: 2025-06-25T06:06:10
UPDATE_TIME: 2025-06-25T06:06:11
ANNOTATIONS:
```

---

## Solution of Lab

%[https://youtu.be/TYHBORCpV-8] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Create%20a%20Maven%20Artifact%20Registry%20and%20Upload%20Code/techcps.sh
sudo chmod +x techcps.sh
./techcps.sh
```