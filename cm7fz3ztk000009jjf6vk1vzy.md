---
title: "Securing Container Builds - GSP1185"
seoTitle: "Securing Container Builds - GSP1185"
seoDescription: "Artifact Registry enables you to store different artifact types, create multiple repositories in a single project, and associate a specific region or multi-"
datePublished: Sat Feb 22 2025 09:04:12 GMT+0000 (Coordinated Universal Time)
cuid: cm7fz3ztk000009jjf6vk1vzy
slug: securing-container-builds-gsp1185
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740214839888/58eba210-55b7-488f-9f4d-b5a26d1e95df.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740215037660/e902d0c2-dbe7-432a-81ac-30019899d507.png
tags: securing-container-builds-gsp1185, securing-container-builds, gsp1185

---

## **Overview**

Artifact Registry enables you to store different artifact types, create multiple repositories in a single project, and associate a specific region or multi-region with each repository. There are several repository modes. Each mode serves a different purpose. The following diagram shows one of many possible ways you can use repositories in different modes together. The diagram shows a workflow across two Google Cloud projects. In a development project, developers build a Java application. In a separate runtime project, another build creates a container image with the application for deployment to Google Kubernetes Engine.

![diagram of modes](https://cdn.qwiklabs.com/cgM4EK3bqeycM6hhuEdMdhkGT6zZllk1RAYLYBKA%2FVA%3D align="left")

In this lab, you learn how to perform the following tasks.

* Use Standard Repositories for deploying your private packages
    
* Use Remote Repositories to cache maven central packages
    
* Use Virtual Repositories to combine multiple upstream repos in one config
    

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
    student-04-dd0e2d13844d@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    ARXpCsvthBDk
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-d8e549ac7aef`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-d8e549ac7aef
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
ACCOUNT: student-04-dd0e2d13844d@qwiklabs.net

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
project = qwiklabs-gcp-02-d8e549ac7aef
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Workspace Setup

1. In Cloud Shell, set your project ID and project number. Save them as `PROJECT_ID` and `PROJECT_NUMBER` variables:
    

```apache
export PROJECT_ID=$(gcloud config get-value project)
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
```

2. Enable the Artifact Registry API:
    

```apache
gcloud services enable artifactregistry.googleapis.com
```

3. Clone the repo needed for this lab, and then go to the `container-analysis` directory:
    

```apache
git clone https://github.com/GoogleCloudPlatform/java-docs-samples
cd java-docs-samples/container-registry/container-analysis
```

## **Task 1. Standard repositories**

[Standard Repositories](https://cloud.google.com/artifact-registry/docs/repositories/create-repos) provide a way to store your private packages and share them across your other applications

1. Run the following command to create a standard maven repository for Java artifacts:
    

```apache
gcloud artifacts repositories create container-dev-java-repo \
    --repository-format=maven \
    --location=us-central1 \
    --description="Java package repository for Container Dev Workshop"
```

Click **Authorize** if the Cloud Shell authorization prompt appears.

2. In the Cloud Console go to Artifact Registry &gt; Repositories and notice your newly created Maven repository named `container-dev-java-repo`. If you click on it you can see that it's empty at the moment.
    
3. Review the repo in the terminal:
    

```apache
gcloud artifacts repositories describe container-dev-java-repo \
    --location=us-central1
```

Should return a response similar to the following

```apache
Encryption: Google-managed key
Repository Size: 0.000MB
createTime: '2023-03-21T19:01:45.461589Z'
description: Java package repository for Container Dev Workshop
format: MAVEN
mavenConfig: {}
mode: STANDARD_REPOSITORY
name: projects/qwiklabs-gcp-03-4304110dc461/locations/us-central1/repositories/container-dev-java-repo
updateTime: '2023-03-21T19:01:45.461589Z'
```

Click *Check my progress* to verify the objective.

Create a standard maven repository

Check my progress

## **Task 2. Configure Maven for Artifact Registry**

1. Run the following command to print the repository configuration to add to your Java project:
    

```apache
gcloud artifacts print-settings mvn \
    --repository=container-dev-java-repo \
    --location=us-central1
```

The previous command returns xml to be added into your projects pom.xml.

* The **repositories** section specifies where Maven may download remote artifacts for use by the current project.
    
* The **distributionManagement** section specifies which remote repository the project will push to when it is deployed.
    
* The **extensions** section adds in artifactregistry-maven-wagon which enables the Authentication and transport layer needed for connecting to Artifact Registry
    
* Note: Extensions can exist in pom.xml or extensions.xml. In cases where the project depends on a parent project, those dependencies are accessed before the rest of the entries in the pom.xml are loaded. To ensure the parent has access to the extension, it can be placed in an extensions.xml file which is loaded before the pom.xml thus making it available for the parent dependencies.
    

2. Run the following command in Cloud Shell to open the Editor in the current directory:
    

```apache
cloudshell workspace .
```

3. Copy the three sections then open the `pom.xml` in Cloud Shell Editor and add the returned settings to the bottom of the file just inside the closing `project` tag.
    

Example: (your project names will be different in your URLs)

```apache
  ...

  <distributionManagement>
    <snapshotRepository>
      <id>artifact-registry</id>
      <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
    </snapshotRepository>
    <repository>
      <id>artifact-registry</id>
      <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
    </repository>
  </distributionManagement>

  <repositories>
    <repository>
      <id>artifact-registry</id>
      <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
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
        <groupId>com.google.cloud.artifactregistry</groupId>
        <artifactId>artifactregistry-maven-wagon</artifactId>
        <version>2.2.0</version>
      </extension>
    </extensions>
  </build>

</project>
```

With Artifact Registry configured in Maven, you can now use Artifact Registry to store Java jars for use by other projects in your organization.

4. Run the following command to upload your Java package to Artifact Registry:
    

```apache
mvn deploy -DskipTests
```

If you want to run this command again, make sure to increase the version in the pom.xml.

5. In the Cloud console go to **Artifact Registry &gt; Repositories**. Click into `container-dev-java-repo` and check that the `hello-world` binary artifact is there:
    

![Artifact Registry Repository Details](https://cdn.qwiklabs.com/f0eRu3N8MsjW3ACu%2FNwj2n3DFYGqvNBzdSjPi3NQZmI%3D align="left")

## **Task 3. Remote repositories**

[Remote Repositories](https://cloud.google.com/artifact-registry/docs/repositories/remote-repo) provide the ability to cache third party packages for increased reliability and security.

1. Run the following command to create a remote repository for Maven Central artifacts:
    

```apache
gcloud artifacts repositories create maven-central-cache \
    --project=$PROJECT_ID \
    --repository-format=maven \
    --location=us-central1 \
    --description="Remote repository for Maven Central caching" \
    --mode=remote-repository \
    --remote-repo-config-desc="Maven Central" \
    --remote-mvn-repo=MAVEN-CENTRAL
```

2. In the Cloud console go to **Artifact Registry &gt; Repositories**. Click into `maven-central-cache` and notice it's been created and is currently empty.
    

Click *Check my progress* to verify the objective.

Create a remote repository

Check my progress

3. Review the repo in the terminal:
    

```apache
gcloud artifacts repositories describe maven-central-cache \
    --location=us-central1
```

4. Run the following command to print the repository configuration to add to your Java project:
    

```apache
gcloud artifacts print-settings mvn \
    --repository=maven-central-cache \
    --location=us-central1
```

5. Add the repository section into your pom.xml. Be sure not to copy the outer &lt;repositories&gt; tag from the output.
    
6. Change the ID of the newly added repository to "central" to ensure each repository entry has a unique ID.
    

Example: (your project names will be different in your URLs)

```apache
  ...

  <distributionManagement>
    <snapshotRepository>
      <id>artifact-registry</id>
      <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
    </snapshotRepository>
    <repository>
      <id>artifact-registry</id>
      <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
    </repository>
  </distributionManagement>

  <repositories>
    <repository>
      <id>artifact-registry</id>
      <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
      <releases>
        <enabled>true</enabled>
      </releases>
      <snapshots>
        <enabled>true</enabled>
      </snapshots>
    </repository>

    <repository>
      <id>central</id>
      <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/maven-central-cache</url>
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
        <groupId>com.google.cloud.artifactregistry</groupId>
        <artifactId>artifactregistry-maven-wagon</artifactId>
        <version>2.2.0</version>
      </extension>
    </extensions>
  </build>

</project>
```

7. Run the following commands in your terminal to create an `extensions.xml` for your project, To use the [core extensions](https://maven.apache.org/docs/3.3.1/release-notes.html) mechanism ensuring Maven can resolve parent or plugin dependencies from Artifact Registry.
    

```apache
mkdir .mvn 
cat > .mvn/extensions.xml << EOF
<extensions xmlns="http://maven.apache.org/EXTENSIONS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/EXTENSIONS/1.0.0 http://maven.apache.org/xsd/core-extensions-1.0.0.xsd">
  <extension>
    <groupId>com.google.cloud.artifactregistry</groupId>
    <artifactId>artifactregistry-maven-wagon</artifactId>
    <version>2.2.0</version>
  </extension>
</extensions>
EOF
```

7. Run the following command to compile your application using the Remote Repository:
    

```apache
rm -rf ~/.m2/repository 
mvn compile
```

8. In the Cloud console go to **Artifact Registry &gt; Repositories**. Click into `maven-central-cache` and check that the binary artifacts cached there:
    

![Artifact Registry Repository Details](https://cdn.qwiklabs.com/T0QYXvzst75KKBFe397u5cBGP2iQOFyHwxI%2BztCnmaI%3D align="left")

## **Task 4. Virtual repositories**

[Virtual Repositories](https://cloud.google.com/artifact-registry/docs/repositories/virtual-repo) act as an interface for multiple repositories to be accessed through a single configuration. This simplifies client configuration for consumers of your artifacts and increases security by mitigating [dependency confusion attacks](https://cloud.google.com/software-supply-chain-security/docs/dependencies#public-dependencies).

1. Create a policy file
    

```powershell
cat > ./policy.json << EOF
[
  {
    "id": "private",
    "repository": "projects/${PROJECT_ID}/locations/us-central1/repositories/container-dev-java-repo",
    "priority": 100
  },
  {
    "id": "central",
    "repository": "projects/${PROJECT_ID}/locations/us-central1/repositories/maven-central-cache",
    "priority": 80
  }
]

EOF
```

2. Create the virtual repository
    

```apache
gcloud artifacts repositories create virtual-maven-repo \
    --project=${PROJECT_ID} \
    --repository-format=maven \
    --mode=virtual-repository \
    --location=us-central1 \
    --description="Virtual Maven Repo" \
    --upstream-policy-file=./policy.json
```

Click *Check my progress* to verify the objective.

Create a virtual repository

Check my progress

3. Run the following command to print the repository configuration to add to your Java project:
    

```apache
gcloud artifacts print-settings mvn \
    --repository=virtual-maven-repo \
    --location=us-central1
```

4. Replace the entire repositories section in your pom with the one virtual repositories section from the output.
    

Example: (your project names will be different in your URLs)

```apache
  ...


  <distributionManagement>
    <snapshotRepository>
      <id>artifact-registry</id>
      <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
    </snapshotRepository>
    <repository>
      <id>artifact-registry</id>
      <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/container-dev-java-repo</url>
    </repository>
  </distributionManagement>

  <repositories>
    <repository>
      <id>artifact-registry</id>
      <url>artifactregistry://us-central1-maven.pkg.dev/qwiklabs-gcp-04-3c51830ea757/virtual-maven-repo</url>
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
        <groupId>com.google.cloud.artifactregistry</groupId>
        <artifactId>artifactregistry-maven-wagon</artifactId>
        <version>2.2.0</version>
      </extension>
    </extensions>
  </build>

</project>
```

### Pull dependencies from the Virtual Repository

Since the Virtual repository is a pass through and won't store any actual packages, to clearly demonstrate the process you'll delete the maven-central-cache repo you created earlier and recreate it, to start again with an empty repository

1. Run the following commands to recreate the cache repository
    

```apache
gcloud artifacts repositories delete maven-central-cache \
    --project=$PROJECT_ID \
    --location=us-central1 \
    --quiet

gcloud artifacts repositories create maven-central-cache \
    --project=$PROJECT_ID \
    --repository-format=maven \
    --location=us-central1 \
    --description="Remote repository for Maven Central caching" \
    --mode=remote-repository \
    --remote-repo-config-desc="Maven Central" \
    --remote-mvn-repo=MAVEN-CENTRAL
```

2. You can review the empty repo in the console. **Cloud console &gt; Artifact Registry &gt; Repositories**
    
3. Now exercise the virtual repository by building your project with the following command:
    

```apache
rm -rf ~/.m2/repository 
mvn compile
```

4. Review the packages in the console. **Cloud Console &gt; Artifact Registry &gt; Repositories**. Click into `maven-central-cache` and check that the binary artifacts were configured to pull from the virtual repo but were ultimately pulled from the `maven-central-cache`.
    

![Artifact Registry repository Details](https://cdn.qwiklabs.com/T0QYXvzst75KKBFe397u5cBGP2iQOFyHwxI%2BztCnmaI%3D align="left")

---

## Solution of Lab

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1185/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Securing%20Container%20Builds/gsp1185.sh
sudo chmod +x gsp1185.sh
./gsp1185.sh
```