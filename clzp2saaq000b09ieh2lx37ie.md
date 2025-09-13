---
title: "Deploy a Hugo Website with Cloud Build and Firebase Pipeline - GSP747"
seoTitle: "Deploy a Hugo Website with Cloud Build and Firebase Pipeline - GSP747"
seoDescription: "In this lab you will create a pipeline for deploying websites based on Hugo, a static website builder. You will store the website content in Cloud Source Re"
datePublished: Sun Aug 11 2024 04:39:21 GMT+0000 (Coordinated Universal Time)
cuid: clzp2saaq000b09ieh2lx37ie
slug: deploy-a-hugo-website-with-cloud-build-and-firebase-pipeline-gsp747
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750301173815/0343011f-f05e-452f-9223-337daf4be807.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723351143749/ea3bebb0-c27f-4e25-98fb-f37017ba5c39.png
tags: firebase, deploy-a-hugo-website-with-cloud-build-and-firebase-pipeline-gsp747, gsp747, deploy-a-hugo-website-with-cloud-build-and-firebase-pipeline, firebase-pipeline, hugo-website, deploy-a-hugo-website

---

## **Overview**

In this lab you will create a pipeline for deploying websites based on Hugo, a static website builder. You will store the website content in Cloud Source Repositories and deploy the website with Firebase, then use Cloud Build to create a pipeline to automatically deploy new content that is committed to the repository.

## **Objectives**

In this lab you will learn the following:

* An overview of static websites
    
* Setting up a website with Hugo
    
* Storing the website content in Cloud Source Repositories
    
* Deploying the website with Firebase
    
* Creating a build pipeline with Cloud Build to automate the deployment
    

### Prerequisites

The instructions provided here are sufficient to guide you through this lab. You may also find it helpful to have some hands-on experience with the services you will be using. Here are some other labs you may find helpful:

* [Cloud Source Repositories: Qwik Start](https://google.qwiklabs.com/catalog_lab/760)
    
* [Build a Serverless App with Cloud Run that Creates PDF Files](https://google.qwiklabs.com/catalog_lab/2161)
    
* [Firebase Web](https://google.qwiklabs.com/catalog_lab/363)
    

## **The benefits of static websites**

Static site builders like Hugo have become popular because of their ability to produce websites that do not require web servers. With static web platforms there are no server operating systems or software to maintain. There are, however, various operational considerations. For example, you may want to version control your postings, host your web site on a content delivery network ("CDN") and provision an SSL certificate.

You can address these needs by using a Continuous Integration / Continuous Deployment pipeline on Google Cloud. A deployment pipeline enables developers to rapidly innovate by automating the entire deployment process. In this lab, you will learn to build a pipeline that demonstrates this automation.

## **Setup and requirements**

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
    
    ```plaintext
    student-04-32c1339f8e83@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```json
    gZAUokUZyol3
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

## **Process overview**

Here's a diagram of what you are going to build:

![Cloub Build Pipeline diagram](https://cdn.qwiklabs.com/j0UawtzBJczZe32K8wKYpiVTkIQyKSFMBfyALUzMn%2BI%3D align="left")

The goal is to be able to commit code and have it trigger the pipeline which will in turn deploy the website. Your journey will be divided into two parts. First, you will build the website locally and deploy it to Firebase manually so you can gain an understanding of the entire process. Second, you will automate the process by building a pipeline with Cloud Build.

## **Task 1. Manual deployment**

First build the website manually on a Linux instance to learn the end-to-end process. You will also use the Linux instance to perform some of the one-time tasks that are needed to get Firebase up and running.

### Connect to the Linux instance

1. From the **Navigation menu** select **Compute Engine &gt; VM Instances**. You will see one instance that has been built for you.
    
2. At the end of the line you should see an External IP address and an SSH button as shown in the figure below. If these are obscured by an information panel, close that panel so you can see the entire line.
    

![External IP address and SSH button highlighted](https://cdn.qwiklabs.com/m%2BKk3gckmiT%2FsXRorACHbhxmjyMqFcSM8%2B2KmaBvPVs%3D align="left")

3. Make a note of the External IP address for later use.
    
4. Click **SSH**. A window will appear and you will see a shell prompt.
    

### Install Hugo locally

Now install Hugo locally in the Linux instance so that you can test the website locally before deploying it with Firebase. A shell script has been provided to make this easier.

1. In the Linux instance shell, examine the file **installhugo.sh**.
    

```apache
cat /tmp/installhugo.sh
```

You can also see the contents below:

**Output:**

```apache
#!/bin/bash

# Copyright 2020 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

_HUGO_VERSION=0.96.0

echo Downloading Hugo version $_HUGO_VERSION...

wget \
  --quiet \
  -O hugo.tar.gz \
  https://github.com/gohugoio/hugo/releases/download/v${_HUGO_VERSION}/hugo_extended_${_HUGO_VERSION}_Linux-64bit.tar.gz

echo Extracting Hugo files into /tmp...

mv hugo.tar.gz /tmp
tar -C /tmp -xzf /tmp/hugo.tar.gz

echo The Hugo binary is now at /tmp/hugo.
```

2. Note the use of the `wget` command to download Hugo and the `tar` command to unpack the Hugo archive. You will see similar commands later in this lab when you create the pipeline.
    
3. Enter the commands below to run the script and install Hugo:
    

```apache
cd ~
/tmp/installhugo.sh
```

You will receive a message saying that Hugo has been installed into the `/tmp` directory as shown below. You are ready to build the website infrastructure.

![Output: The HUgo Binary is now at /tmp/hugo.](https://cdn.qwiklabs.com/AFZkAdea8jsrPUyqTmyI9%2BaPiDWdxiFNrBYNdzmGHbo%3D align="left")

### Create a repository and the initial web site

Now create a Cloud Source Repository to hold the web site and then clone the repository to the Linux instance. Cloning a repository creates a mirror of it in the shell. This allows you to implement the web site while in the shell and later commit your changes to the file system. Later in this lab, you will set up a pipeline that responds to these commits to the repository.

1. Install git on the Linux VM
    

Enter the following commands in the Linux instance shell:

```apache
sudo apt-get update
sudo apt-get install git
```

If prompted, answer `Yes` to all prompts.

2. Create and clone a code repository. Enter the following commands in the Linux instance shell:
    

```apache
cd ~
gcloud source repos create my_hugo_site
gcloud source repos clone my_hugo_site
```

You will receive confirmations about the creation of the repository and the cloning of the repository as shown in the figure below. You can ignore the two warning messages about the charge for the repository and that the repository is empty.

![Warning messages in the output](https://cdn.qwiklabs.com/6Xp6TnJjneDe6pW6IjtEYYz5%2BFh8GZ%2FezG8mJC37CUw%3D align="left")

Click *Check my progress* to verify the objective.

Assessment Completed!

Source repository has been created

**Check my progress**

*Assessment Completed!*

3. Now you are ready to create the site structure. Enter the commands below in the Linux shell.
    

```apache
cd ~
/tmp/hugo new site my_hugo_site --force
```

Normally the `hugo` command creates the directory. The `--force` option will create the site in the repository directory, which already exists. This allows you to keep the Git-related information in the directory that you just cloned. You will see messages indicating that the site has been created as shown in the figure below.

![Output displays congratulatory message, prompts the user to follow a few more steps, and lists a website for further documentation and guidance](https://cdn.qwiklabs.com/44IDjiRjRFJhaNI9hpuTrTEUj40jAY4h6rpe5d9JUy8%3D align="left")

4. Now install the **Ananke** theme to provide a layout for your site. Enter the following commands in the Linux instance shell:
    

```apache
cd ~/my_hugo_site
git clone \
  https://github.com/budparr/gohugo-theme-ananke.git \
  themes/ananke
echo 'theme = "ananke"' >> config.toml
```

You will see messages indicating that the theme has been cloned, as shown below.

![Output messages indicating success](https://cdn.qwiklabs.com/iYg2p%2F0%2Bz4Vfpl2aqdojAlxQHJx1c3nVMsdHczChPVo%3D align="left")

5. Remove the git files from the themes directory:
    

```apache
sudo rm -r themes/ananke/.git
sudo rm themes/ananke/.gitignore
```

**Note:** The git files should be removed so that Cloud Source Repository will add the theme files to version control.

6. With the structure of the web site set up, you can now preview it. Enter the command below to launch the site at TCP port 8080:
    

```apache
cd ~/my_hugo_site
/tmp/hugo server -D --bind 0.0.0.0 --port 8080
```

Hugo will build the site and serve it for access on TCP port 8080 as shown in the figure below. The server will run until it is stopped by pressing CTRL+C.

![Command prompt terminal](https://cdn.qwiklabs.com/1A3uN%2BW8FrMEnQ7S%2FVX%2FZroU9czLv1Z7AV%2B%2F3HS71ME%3D align="left")

7. Open a browser tab and browse to the external IP address at port 8080. Use the following URL, replacing `[EXTERNAL IP]` with the external IP address of your instance:
    

```apache
http://[EXTERNAL IP]:8080
```

The web site should look like this.

![My New Hugo Site web page](https://cdn.qwiklabs.com/iGCS5ksMweWQdrBe9CzcnANJg42pSIiaABQsbNK%2FMW4%3D align="left")

Click *Check my progress* to verify the objective.

Please launch the site at TCP port 8080. Make sure the server is in running state.

The website is accessible on Port 8080

**Check my progress**

*Please launch the site at TCP port 8080. Make sure the server is in running state.*

8. Go back to the Linux shell and press CTRL+C to stop the Hugo server.
    

### Deploy the site to Firebase

1. Install Firebase CLI in the Linux instance shell:
    

```apache
curl -sL https://firebase.tools | bash
```

2. Now you need to initialize Firebase. Enter the command below into the shell:
    

```apache
cd ~/my_hugo_site
firebase init
```

3. Select **Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys** using the arrow keys and spacebar and press Enter. When asked for a project option, select **Use an existing project**, then use the arrow keys, spacebar, and the Enter key to select the Project ID provided on the lab instruction page. For the public directory, select the default value **public**. For configuring as a single page application, select the default value of **N**. For setting up automatic builds and deploys with GitHub, select **N**.
    

If asked to overwrite any existing files, select Y.

4. You are ready to deploy the application. Enter the commands below into the Linux instance shell to rebuild the site with Hugo and to deploy it with Firebase:
    

```apache
/tmp/hugo && firebase deploy
```

5. After the application has been deployed, you will receive a hosting URL. Click on it and you will see the same website being served from the Firebase CDN (content delivery network). If you receive a generic "welcome" message, wait a few minutes for the CDN to be initialized and refresh the browser window. Save this hosting URL for later use.
    

You have now performed the entire deployment locally. Next, automate the process from end to end using Cloud Build.

## **Task 2. Automate the deployment**

### Perform the initial commit

The goal of building the pipeline is to be able to trigger builds when changes are made to the repository. You will start by performing an initial commit to the repository so that you can validate your ability to make future changes.

1. Configure the git commands global parameters by entering the commands below into the Linux shell. Make sure to include the quotation marks:
    

```apache
git config --global user.name "hugo"
git config --global user.email "hugo@blogger.com"
```

2. Enter the commands below in the Linux shell to create a `.gitignore` file to exclude certain directories from the repository:
    

```apache
cd ~/my_hugo_site
echo "resources" >> .gitignore
```

3. Perform the initial commit to the repository by entering the commands below:
    

```apache
git add .
git commit -m "Add app to Cloud Source Repositories"
git push -u origin master
```

You have now committed (uploaded) the initial version of the website to Google Cloud.

### Configure the build

Cloud Build uses a file named [cloudbuild.yaml](https://cloud.google.com/cloud-build/docs/configuring-builds/create-basic-configuration) in the root directory of the repository to perform the build. The file is in YAML format. Spacing and indentation are important, so it has already been placed on the Linux instance for you.

1. Enter the command below in the Linux shell. Note the final period (".") at the end of the `cp` command:
    

```apache
cd ~/my_hugo_site
cp /tmp/cloudbuild.yaml .
```

2. Run the following to see what the `cloudbuild.yaml` file looks like. Some of the lines have wrapped because of their length.
    

```apache
cat cloudbuild.yaml
```

**Output:**

```apache
# Copyright 2020 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

steps:
- name: 'gcr.io/cloud-builders/wget'
  args:
  - '--quiet'
  - '-O'
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

steps:
- name: 'gcr.io/cloud-builders/wget'
  args:
  - '--quiet'
  - '-O'
  - 'firebase'
  - 'https://firebase.tools/bin/linux/latest'

- name: 'gcr.io/cloud-builders/wget'
  args:
  - '--quiet'
  - '-O'
  - 'hugo.tar.gz'
  - 'https://github.com/gohugoio/hugo/releases/download/v${_HUGO_VERSION}/hugo_extended_${_HUGO_VERSION}_Linux-64bit.tar.gz'
  waitFor: ['-']

- name: 'ubuntu:18.04'
  args:
  - 'bash'
  - '-c'
  - |
    mv hugo.tar.gz /tmp
    tar -C /tmp -xzf /tmp/hugo.tar.gz
    mv firebase /tmp
    chmod 755 /tmp/firebase
    /tmp/hugo
    /tmp/firebase deploy --project ${PROJECT_ID} --non-interactive --only hosting -m "Build ${BUILD_ID}"

substitutions:
  _HUGO_VERSION: 0.96.0
```

3. Here are some observations about the `cloudbuild.yaml` file:
    

* There are three named steps in this file each of which is performed by a container image. The first two steps use a Google-supported builder to use `wget` to download the Hugo and Firebase tools. These two steps run in parallel. Using the wget builder is faster than installing `wget` manually.
    
* The third step uses a standard Ubuntu container to install Hugo and Firebase after which the site is built and deployed. Installing Hugo and Firebase for each deployment allows you to change the version of Hugo whenever you desire while also using the latest version of Firebase.
    
* The `tar` and `wget` commands are nearly identical to those used earlier in the `installhugo.sh` script.
    
* The file also uses a custom substitution variable (\_HUGO\_VERSION) and a Google-provided substitution variable (PROJECT\_ID) to allow for this template to be used in different environments.
    
* The Hugo and Firebase binaries are created and installed in a temporary directory so that they do not inadvertently get deployed to the website itself.
    

### Create the Cloud Build trigger

Now create a trigger that will respond to commits to the master branch of the repository.

1. From the command line enter the following command:
    

```apache
gcloud alpha builds triggers import --source=/tmp/trigger.yaml
```

2. The trigger configuration contains the following details:
    

| **Field** | **Value** |
| --- | --- |
| Name | `commit-to-master-branch` |
| Description | `Push to master` |
| Event | Push to a branch |
| Repository | my\_hugo\_site |
| Branch (regex) | ^master$ (be sure Invert Regex is unchecked) |
| Build Configuration | Cloud Build configuration file (yaml or json) |
| Cloud Build Configuration file location | `/ cloudbuild.yaml` |

### The Cloud Build service account

The Cloud Build Service account needs to have permissions to use Firebase to deploy the website.

| **Cloud Build** | **Role** | **Description** |
| --- | --- | --- |
| \[PROJECT\_NUMBER@cloudbuild.gserviceaccount.com | roles/firebasehosting.admin | Full read/write access to Hosting resources |

### Test the pipeline

Now that you have created the pipeline, you can make a change to the site then commit it to see if the change propagates.

1. In the Linux shell enter the command below to move to the repository directory:
    

```apache
cd ~/my_hugo_site
```

2. Edit the file **config.toml** and change the title:
    

```plaintext
Blogging with Hugo and Cloud Build
```

3. In the Linux shell, enter the commands below to commit the changes to the repository and trigger the Cloud Build pipeline:
    

```apache
git add .
git commit -m "I updated the site title"
git push -u origin master
```

4. Check the build history to see the status of the build:
    

```apache
gcloud builds list
```

5. Check the build logs for the current build:
    

```apache
gcloud builds log $(gcloud builds list --format='value(ID)' --filter=$(git rev-parse HEAD))
```

6. Grab the URL from the build performed:
    

```apache
gcloud builds log $(gcloud builds list --format='value(ID)' --filter=$(git rev-parse HEAD)) | grep "Hosting URL"
```

7. Browse to the hosting URL to see the results. You can also go to the Firebase console and examine the project to find the domain name.
    

**Note:** It may take a few minutes for the CDN to update and display the updated site information.

**Note:** The site has an SSL certificate and is accessed using the https (Hypertext Transfer Protocol Secure) protocol.

Click *Check my progress* to verify the objective.

Please initiate the cloud build on my\_hugo\_site repository.

Cloud Build has been successfully initiated

**Check my progress**

*Please initiate the cloud build on my\_hugo\_site repository.*

---

## Solution of Lab

### New solution

%[https://youtu.be/ky90Rr4AdBA] 

**Open Link**: [https://console.cloud.google.com/compute/instances](https://console.cloud.google.com/compute/instances)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1750301599500/529dea4f-cb1a-4b22-860f-38333a05a974.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Deploy%20a%20Hugo%20Website%20with%20Cloud%20Build%20and%20Firebase%20Pipeline/task1.sh
source task1.sh
```

***Now Check the score for Task 2 & then go ahead with next Commands.***

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Deploy%20a%20Hugo%20Website%20with%20Cloud%20Build%20and%20Firebase%20Pipeline/task2.sh
source task2.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1750301647586/244bcc76-8112-4bf1-88ff-612eda154d96.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/refs/heads/master/Deploy%20a%20Hugo%20Website%20with%20Cloud%20Build%20and%20Firebase%20Pipeline/task3.sh
source task3.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1750306103608/2701b370-1527-40df-bb8b-18ee94757ae3.png align="center")

---

### Old solution

%[https://www.youtube.com/watch?v=MJ8KxPyFggQ] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723350984634/5d468510-15e1-4e65-a3e6-e57629f1e950.png align="center")

```apache
curl -LO raw.githubusercontent.com/Techcps/GSP-Short-Trick/master/Deploy%20a%20Hugo%20Website%20with%20Cloud%20Build%20and%20Firebase%20Pipeline/techcps1.sh
sudo chmod +x techcps1.sh
./techcps1.sh
```

***Now Check the score for Task 2 & then go ahead with next Commands.***

```apache
curl -LO raw.githubusercontent.com/Techcps/GSP-Short-Trick/master/Deploy%20a%20Hugo%20Website%20with%20Cloud%20Build%20and%20Firebase%20Pipeline/techcps2.sh
sudo chmod +x techcps2.sh
./techcps2.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723353580971/63b16537-f142-4665-b861-4fc1cb89160b.png align="center")

**Use Up and <mark>Down key</mark> and press <mark>Spacebar key</mark> to select the below image checkpoint option**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723353632297/48ef8813-d81c-4440-a72c-ebd8aea9e638.png align="center")

**Now select the use an existing project and press <mark>enter key</mark>**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723353587660/0e43ed47-b7bb-438d-9e43-aa3c9a255cd1.png align="center")

**Now select the currect project and press <mark>enter key</mark>**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723353597276/271108a6-caaf-4767-ae5a-2497e6820184.png align="center")

**Now press the <mark>enter key three times</mark>**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723353845475/7ca46b66-70a7-40d0-bf63-d229eac9932f.png align="center")