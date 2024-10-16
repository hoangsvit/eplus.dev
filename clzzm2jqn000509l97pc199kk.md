---
title: "Build and Deploy a Docker Image to a Kubernetes Cluster: Challenge Lab - GSP304"
seoTitle: "Build and Deploy a Docker Image to a Kubernetes Cluster: Challenge Lab"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Sun Aug 18 2024 13:36:54 GMT+0000 (Coordinated Universal Time)
cuid: clzzm2jqn000509l97pc199kk
slug: build-and-deploy-a-docker-image-to-a-kubernetes-cluster-challenge-lab-gsp304
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723987961970/53661cb3-f904-4b75-9bc3-b95a427dc363.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723988191653/451db203-618f-4620-a7de-d2ee38642abe.png

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students preparing for the [Google Cloud Certified Professional Cloud Architect](https://cloud.google.com/certification/cloud-architect) certification exam. Are you up for the challenge?

## **Challenge scenario**

Your development team is interested in adopting a containerized microservices approach to application architecture. You need to test a sample application they have provided for you to make sure that it can be deployed to a Google Kubernetes container. The development group provided a simple Go application called `echo-web` with a Dockerfile and the associated context that allows you to build a Docker image immediately.

### Your challenge

To test the deployment, you need to download the sample application, then build the Docker container image using a tag that allows it to be stored on the Container Registry. Once the image has been built, you'll push it out to the Container Registry before you can deploy it.

With the image prepared you can then create a Kubernetes cluster, then deploy the sample application to the cluster.

**Note:** In order to ensure accurate lab activity tracking you must use `echo-app` as the container repository image name, call your Kubernetes cluster `echo-cluster`, create the Kubernetes cluster in `us-east4-c` zone and use `echo-web` for the deployment name.

## **Task 1. Create a Kubernetes cluster**

1. Your test environment is limited in capacity, so you should limit the test Kubernetes cluster you are creating to just two `e2-standard-2` instances. You must call your cluster `echo-cluster`.
    

Click **Check my progress** to verify the objective.

Create the Kubernetes cluster

**Check my progress**

## **Task 2. Build a tagged Docker image**

The sample application, including the Dockerfile and the application context files, are contained in an archive called `echo-web.tar.gz`. The archive has been copied to a Cloud Storage bucket belonging to your lab project called `gs://[PROJECT_ID].`

* You must deploy this with a tag called `v1.`
    

## **Task 3. Push the image to the Google Container Registry**

* Your organization has decided that it will always use the `gcr.io` Container Registry hostname for all projects. The sample application is a simple web application that reports some data describing the configuration of the system where the application is running. It is configured to use TCP port 8000 by default.
    

Click **Check my progress** to verify the objective.

An application image with a v1 tag has been pushed to the gcr.io repository

**Check my progress**

## **Task 4. Deploy the application to the Kubernetes cluster**

* Even though the application is configured to respond to HTTP requests on port 8000, you must configure the service to respond to normal web requests on port 80. When configuring the cluster for your sample application, call your deployment `echo-web`.
    

Click **Check my progress** to verify the objective.

Check that an application has been deployed to the cluster

**Check my progress**

Click **Check my progress** to verify the objective.

Test that a service exists that responds to requests like Echo-app

**Check my progress**

## **Troubleshooting**

**Receiving a 504, Gateway timeout error:** This might just indicate that the application hasn't quite initialized yet, but it could also be caused by a mismatch between the default port that is set in the Dockerfile (TCP port 8000) and the choice of application port you configured when deploying the application image, or when you configured external access.

**Not receiving assessment score for the last three objectives:** This might just indicate that you have created your Kubernetes cluster in the different zone rather than `us-east4-c` zone which is expected in the lab.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=YgjX8YOO-T4] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723988151198/402bcf94-b01f-43dd-9b50-8888f931c587.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Build%20and%20Deploy%20a%20Docker%20Image%20to%20a%20Kubernetes%20Cluster/quicklabgsp304.sh
sudo chmod +x quicklabgsp304.sh
./quicklabgsp304.sh
```