---
title: "Awwvision: Cloud Vision API from a Kubernetes Cluster - GSP066"
seoTitle: "Awwvision: Cloud Vision API from a Kubernetes Cluster - GSP066"
seoDescription: "The Awwvision lab uses Kubernetes and Cloud Vision API to demonstrate how to use the Vision API to classify (label) images from Reddit's /r/aww subreddit an"
datePublished: Sat Aug 17 2024 12:23:08 GMT+0000 (Coordinated Universal Time)
cuid: clzy3zuev000u0amo2jxg5pxo
slug: awwvision-cloud-vision-api-from-a-kubernetes-cluster-gsp066
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723897042721/1d8c7274-be94-4fb1-ab27-6f1a19ed0265.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723897374362/85eafc01-8679-4a26-b1c4-ca9e67befd16.png
tags: awwvision-cloud-vision-api-from-a-kubernetes-cluster-gsp066, gsp066

---

## **Overview**

The Awwvision lab uses [Kubernetes](https://kubernetes.io/) and [Cloud Vision API](https://cloud.google.com/vision) to demonstrate how to use the Vision API to classify (label) images from Reddit's [/r/aww](https://reddit.com/r/aww) subreddit and display the labelled results in a web app.

Awwvision has three components:

1. A simple [Redis](http://redis.io/) instance.
    
2. A web app that displays the labels and associated images.
    
3. A worker that handles scraping Reddit for images and classifying them using the Vision API. [Cloud Pub/Sub](https://cloud.google.com/pubsub) is used to coordinate tasks between multiple worker instances.
    

## **Objectives**

In this lab, you will learn how to perform the following tasks:

* Create a Kubernetes Engine cluster
    
* Deploy the sample awwvision app that uses the Vision API
    
* Visit your new webapp and start its crawler.
    

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
    
    ```apache
    student-04-ba9df686689b@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    hjdzHFQSPCYr
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-03a0e75d7a05`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-03a0e75d7a05
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
ACCOUNT: student-04-ba9df686689b@qwiklabs.net

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
project = qwiklabs-gcp-03-03a0e75d7a05
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Create a Kubernetes Engine cluster**

In this lab you will use [gcloud](https://cloud.google.com/sdk/gcloud), Google Cloud's command-line tool, to set up a [Kubernetes Engine](https://cloud.google.com/kubernetes-engine) cluster. You can specify as many nodes as you want, but you need at least one. The cloud platform scope is used to allow access to the Pub/Sub and Vision APIs.

1. In Cloud Shell, run the following to create a cluster in the `us-east4-b` zone:
    

```apache
gcloud config set compute/zone us-east4-b
```

2. Then start up the cluster by running:
    

```apache
gcloud container clusters create awwvision \
    --num-nodes 2 \
    --scopes cloud-platform
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a Kubernetes cluster, you will see an assessment score.

Create a Kubernetes Engine cluster

**Check my progress**

3. Run the following to use the container's credentials:
    

```apache
gcloud container clusters get-credentials awwvision
```

4. Verify that everything is working using the `kubectl` command-line tool:
    

```apache
kubectl cluster-info
```

## **Task 2. Create a virtual environment**

Python virtual environments are used to isolate package installation from the system.

1. Install the `virtualenv` environment:
    

```apache
sudo apt-get install -y virtualenv
```

2. Build the virtual environment:
    

```apache
python3 -m venv venv
```

3. Activate the virtual environment.
    

```apache
source venv/bin/activate
```

## **Task 3. Get the sample**

* Add sample data to your project by running:
    

```apache
gsutil -m cp -r gs://spls/gsp066/cloud-vision .
```

## **Task 4. Deploy the sample**

1. In Cloud Shell, change to the `python/awwvision` directory in the cloned cloud-vision repo:
    

```apache
cd cloud-vision/python/awwvision
```

2. Once in the `awwvision` directory, run `make all` to build and deploy everything:
    

```apache
make all
```

As part of the process, Docker images will be built and uploaded to the [Google Container Registry](https://cloud.google.com/container-registry/docs) private container registry.

In addition, `yaml` files will be generated from templates, filled in with information specific to your project, and used to deploy the `redis`, `webapp`, and `worker` Kubernetes resources for the lab.

## **Task 5. Check the Kubernetes resources on the cluster**

After you've deployed, check that the Kubernetes resources are up and running.

1. First, list the [pods](https://kubernetes.io/docs/concepts/workloads/pods/pod) by running:
    

```apache
kubectl get pods
```

You should see something like the following, though your pod names will be different. Make sure all of your pods have a Running before executing the next command.

```apache
NAME                     READY     STATUS    RESTARTS   AGE
awwvision-webapp-vwmr1   1/1       Running   0          1m
awwvision-worker-oz6xn   1/1       Running   0          1m
awwvision-worker-qc0b0   1/1       Running   0          1m
awwvision-worker-xpe53   1/1       Running   0          1m
redis-master-rpap8       1/1       Running   0          2m
```

2. Next, list the [deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment) by running:
    

```apache
kubectl get deployments -o wide
```

You can see the number of replicas specified for each, and the images used:

```apache
NAME               READY   UP-TO-DATE   AVAILABLE   AGE       CONTAINERS         IMAGES                                 SELECTOR
awwvision-webapp   1/1     1            1           1m        awwvision-webapp   gcr.io/your-project/awwvision-webapp   app=awwvision
awwvision-worker   3/3     3            3           1m        awwvision-worker   gcr.io/your-project/awwvision-worker   app=awwvision
redis-master       1/1     1            1           1m        redis-master       redis                                  app=redis
```

3. Once deployed, get the external IP address of the webapp [service](https://kubernetes.io/docs/concepts/services-networking/service) by running:
    

```apache
kubectl get svc awwvision-webapp
```

It may take a few minutes for the assigned external IP to be listed in the output. You should see something like the following, though your IPs will be different:

```apache
NAME               TYPE          CLUSTER_IP      EXTERNAL_IP    PORT(S)         AGE
awwvision-webapp   LoadBalancer  10.163.250.49   23.236.61.91   80:31925/TCP    13m
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully deployed the sample app, you will see an assessment score.

Deploy the sample

**Check my progress**

## **Task 6. Visit your new webapp and start its crawler**

1. Copy and paste the external IP of the `awwvision-webapp` service into a new browser to open the webapp, then click **Start the Crawler** button.
    
2. Next, click **go back** and you should start to see images from the [/r/aww](https://reddit.com/r/aww) subreddit classified by the labels provided by the Vision API. You will see some of the images classified multiple times, when multiple labels are detected for them. (You can reload in a bit, in case you brought up the page before the crawler was finished).
    

Your results will look something like this:

![Awwvision web page displaying several photo tiles](https://cdn.qwiklabs.com/1jrs5Uvsah8QcDap7a8459ENEKCuEe5fb%2BOA2MLIlas%3D align="left")

## **Task 7. Test your understanding**

Below is a multiple choice question to reinforce your understanding of this lab's concepts. Answer it to the best of your abilities.

\_\_\_\_ allows developers to easily integrate vision detection features within applications, including image labeling, face and landmark detection and much more.

* Cloud Vision API
    
* Compute
    
* Cloud ML
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=U42D1Jw6jrY] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723897176211/0a90143b-0bbb-49f6-b302-6b95b2603460.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Awwvision%20Cloud%20Vision%20API%20from%20a%20Kubernetes%20Cluster/quicklabgsp066.sh
sudo chmod +x quicklabgsp066.sh
./quicklabgsp066.sh
```