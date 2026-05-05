---
title: "Artifact Registry: Qwik Start - GSP1131"
seoTitle: "Artifact Registry: Qwik Start - GSP1131"
seoDescription: "Artifact Registry is a secure, scalable, and fully managed service for storing, managing, and securing your build artifacts and dependencies. You'll learn how to create a private Docker repository, configure authentication, and push and pull a sample Docker image. This hands-on experience will give you a foundational understanding of how to use Artifact Registry for your containerized applications."
datePublished: 2026-05-05T11:15:06.187Z
cuid: cmosj7lfq005d2flr7cf9cssp
slug: artifact-registry-qwik-start-gsp1131
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/f5b8914a-97e9-42da-a8fe-26cc3bdf2157.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/2a5e99a0-2447-41ac-a44d-d0e625cf317a.png
tags: artifact-registry-qwik-start-gsp1131, artifact-registry-qwik-start, gsp1131

---

## **Overview**

[Artifact Registry](https://cloud.google.com/artifact-registry) is a secure, scalable, and fully managed service for storing, managing, and securing your build artifacts and dependencies. You'll learn how to create a private Docker repository, configure authentication, and push and pull a sample Docker image. This hands-on experience will give you a foundational understanding of how to use Artifact Registry for your containerized applications.

## **Objectives**

In this lab, you will learn how to perform the following tasks:

*   Create a private Docker repository in Artifact Registry
    
*   Set up authentication
    
*   Push an image to the repository
    
*   Pull the image from the repository
    

### Prerequisites

Some experience with Docker is recommended for this lab. Feel free to check out the [Docker documentation](https://docs.docker.com/) for a refresher or introduction. You can also check out our [Introduction to Docker](https://www.skills.google/catalog_lab/944) lab for more hands-on practice!

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1.  Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    *   The Open Google Cloud console button
        
    *   Time remaining
        
    *   The temporary credentials that you must use for this lab
        
    *   Other information, if needed, to step through this lab
        
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```plaintext
    student-04-a0e7ea1efe09@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    wE6OzWoU7BTR
    ```
    
    You can also find the Password in the Lab Details pane.
    
6.  Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7.  Click through the subsequent pages:
    
    *   Accept the terms and conditions.
        
    *   Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    *   Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="center")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1.  Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="center")
    
    at the top of the Google Cloud console.
    
2.  Click through the following windows:
    
    *   Continue through the Cloud Shell information window.
        
    *   Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-d9fca2ccdb2e`. The output contains a line that declares the **Project\_ID** for this session:

```plaintext

Your Cloud Platform project in this session is set to qwiklabs-gcp-02-d9fca2ccdb2e
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3.  (Optional) You can list the active account name with this command:
    

```plaintext
gcloud auth list
```

4.  Click **Authorize**.
    

**Output:**

```plaintext
ACTIVE: *
ACCOUNT: student-04-a0e7ea1efe09@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5.  (Optional) You can list the project ID with this command:
    

```plaintext
gcloud config list project
```

**Output:**

```plaintext
[core]
project = qwiklabs-gcp-02-d9fca2ccdb2e
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Create a Docker repository**

In this section, you'll create a private Docker repository within Artifact Registry. This repository will serve as a central location to store and manage your Docker images. You'll use the `gcloud` command-line tool to create the repository and then verify its creation through the Google Cloud Console.

1.  Open a new Cloud Shell window by clicking the icon (
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="center")
    
    ) in the top right corner of the console.
    
2.  Run the following command to get your Project ID and save it as an environment variable:
    

```plaintext
export PROJECT_ID=$(gcloud config get-value project)
```

3.  Run the following command to create a new Docker repository named `example-docker-repo` in the location `us-west1` with the description "Docker repository".
    

```plaintext
gcloud artifacts repositories create example-docker-repo --repository-format=docker \
    --location=us-west1 --description="Docker repository" \
    --project=$PROJECT_ID
```

4.  Run the following command to verify that your repository was created.
    

```plaintext
gcloud artifacts repositories list \
    --project=$PROJECT_ID
```

5.  From the search bar at the top of the console, type **Artifact Registry** and select the first result.
    
6.  On the **Artifact Registry** product page, verify you can see your repository. It should resemble the following:
    

![Artifact Registry repository page](https://cdn.qwiklabs.com/rpJq9TjaUbAkkNkto4zIiSCzbqNr%2Fg9QdIT0R5j1W80%3D align="center")

7.  Click the **example-docker-repo** repository. You should notice there are no files inside the repository. In the next sections, you will be adding files to the repository.
    

You can also create repositories from the **Artifact Registry** product page by clicking the **Create Repository** button and following the same steps as above.

## **Task 2. Configure authentication for Artifact Registry**

To push and pull images from your newly created Docker repository, you need to configure Docker to authenticate with Artifact Registry. This involves setting up credentials that allow your Docker client to interact with the repository securely.

Before you can push or pull images, you will need to configure Docker to use the Google Cloud CLI to authenticate requests to Artifact Registry.

1.  To set up authentication to Docker repositories in the region `us-west1`, run the following command:
    

```plaintext
gcloud auth configure-docker us-west1-docker.pkg.dev
```

The command updates your Docker configuration. You can now connect with Artifact Registry in your Google Cloud project to push and pull images.

For information about other authentication methods, see [Authentication methods](https://cloud.google.com/artifact-registry/docs/docker/authentication).

## **Task 3. Obtain an image to push**

You'll need a Docker image to work with in this lab. Instead of building an image from scratch, you'll pull a pre-built sample image from a public repository. This will allow you to focus on interacting with Artifact Registry.

For this lab, you will push a sample image named `hello-app`.

1.  Run the following command to pull version 1.0 of the image.
    

```plaintext
docker pull us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
```

Image paths in Artifact Registry include multiple parts. For this sample image:

*   [`us-docker.pkg.dev`](http://us-docker.pkg.dev) is the hostname for container images stored in Artifact Registry Docker repositories, which includes the location of the repository (`us`).
    
*   `google-samples` is the project ID.
    
*   `containers` is the repository ID.
    
*   `/gke/hello-app` is the path to the image in the repository `containers`.
    

## **Task 4. Add the image to the repository**

Now you'll add the sample image to your private repository. This involves tagging the image with the repository name to specify its destination and then pushing it to Artifact Registry.

Before you push the Docker image to Artifact Registry, you must tag it with the repository name.

### Tag the image with a registry name

Tagging the image ensures it's pushed to the correct location, which for this lab is [`us-west1-docker.pkg.dev`](http://us-west1-docker.pkg.dev).

1.  Run the following command to tag the image as `sample-image:tag1`:
    

```plaintext
docker tag us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0 \
us-west1-docker.pkg.dev/$PROJECT_ID/example-docker-repo/sample-image:tag1
```

Where:

*   `us-west1` is the repository location.
    
*   [`us-west1-docker.pkg.dev`](http://us-west1-docker.pkg.dev) is the hostname for the Docker repository you created.
    
*   `$PROJECT_ID` is your Google Cloud Project ID.
    
*   `example-docker-repo` is the ID of the repository you created.
    
*   `sample-image` is the image name you want to use in the repository. The image name can be different than the local image name. For this lab you will store the image directly under the repository ID `example-docker-repo`.
    
*   `tag1` is a tag you're adding to the Docker image. If you didn't specify a tag, Docker will apply the default tag `latest`.
    

You are now ready to push the image to the repository you created.

### Push the image to Artifact Registry

After you have configured authentication and tagged the local image, you can push the image to the repository that you created.

To push the Docker image, run the following command:

```plaintext
docker push us-west1-docker.pkg.dev/$PROJECT_ID/example-docker-repo/sample-image:tag1
```

Click *Check my progress* to verify the objective.

Add the image to the repository.

## **Task 5. Pull the image from Artifact Registry**

Finally, you'll pull the image that you just pushed to your private repository. This simulates how you would access and use images stored in Artifact Registry in a real-world scenario.

1.  To pull the image from Artifact Registry onto your local machine, run the following command:
    

```plaintext
docker pull us-west1-docker.pkg.dev/$PROJECT_ID/example-docker-repo/sample-image:tag1
```

You should see output similar to the following:

```plaintext
latest: Pulling from [PROJECT-ID]/sample-image:tag1
Digest: sha256:70c42...
Status: Image is up to date for us-west1-docker.pkg.dev/$PROJECT_ID/example-docker-repo/sample-image:tag1
```

* * *

## Solution of Lab

### Quick

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1131/lab.sh
source lab.sh
```

* * *

### Manual

%[https://www.youtube.com/watch?v=Ti_CdRryARY]