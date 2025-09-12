---
title: "Deploy Kubernetes Applications on Google Cloud: Challenge Lab - GSP318"
seoTitle: "Deploy Kubernetes Applications on Google Cloud: Challenge Lab - GSP318"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Sun Aug 18 2024 03:42:02 GMT+0000 (Coordinated Universal Time)
cuid: clzz0tjhy00010al9acmzg5io
slug: deploy-kubernetes-applications-on-google-cloud-challenge-lab-gsp318
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757645185946/659407ab-27d4-4cd7-90d0-e4785009f940.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757645154145/0e19f1c1-9a33-485c-bd48-65576ec0ad58.png
tags: deploy-kubernetes-applications-on-google-cloud-challenge-lab-gsp318

---

## **Introduction**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Deploy Kubernetes Applications on Google Cloud](https://www.cloudskillsboost.google/course_templates/663) skill badge course. Are you ready for the challenge?

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## **Challenge scenario**

You have just completed training on containers and their creation and management and now you need to demonstrate to the Jooli Inc. development team your new skills. You have to help with some of their initial work on a new project around an application environment utilizing Kubernetes. Some of the work was already done for you, but other parts require your expert skills.

You are expected to create container images, store the images in a repository, and expose a deployment in Kubernetes. Your know that Kurt, your supervisor, will ask you to complete these tasks:

* Create a Docker image and store the Dockerfile.
    
* Test the created Docker image.
    
* Push the Docker image into the Artifact Registry.
    
* Use the image to create and expose a deployment in Kubernetes
    

### Your challenge

As soon as you sit down at your desk and open your new laptop you receive the following request to complete these tasks. Good luck!

## **Task 1. Create a Docker image and store the Dockerfile**

1. Open Cloud Shell and run the following command. This will install the marking scripts you will use to help check your progress.
    

```apache
source <(gsutil cat gs://cloud-training/gsp318/marking/setup_marking_v2.sh)
```

2. Use Cloud Shell to clone the `valkyrie-app` source code repository into the `~/marking` directory. You can use the following command:
    

```apache
gcloud source repos clone valkyrie-app
```

The app source code is in `valkyrie-app/source`.

3. Create `valkyrie-app/Dockerfile` and add the configuration below:
    

```apache
FROM golang:1.10
WORKDIR /go/src/app
COPY source .
RUN go install -v
ENTRYPOINT ["app","-single=true","-port=8080"]
```

4. Use `valkyrie-app/Dockerfile` to create a Docker image called `valkyrie-app` with the tag `v0.0.3`.
    
5. Once you have created the Docker image, and before clicking **Check my progress**, run the following command to perform the local check of your work:
    

```apache
bash ~/marking/step1_v2.sh
```

After you get a successful response from the local marking you can check your progress.

Click *Check my progress* to verify the objective.

Create a Docker image and store the Dockerfile

**Check my progress**

## **Task 2. Test the created Docker image**

1. Launch a container using the image `valkyrie-app:v0.0.3`.
    

* You need to map the host’s port 8080 to port 8080 on the container.
    
* Add `&` to the end of the command to cause the container to run in the background.
    

When your container is running you will see the page by **Web Preview**.

2. Once you have your container running, and before clicking **Check my progress**, run the following command to perform the local check of your work.
    

```apache
bash ~/marking/step2_v2.sh
```

After you get a successful response from the local marking you can check your progress.

Click *Check my progress* to verify the objective.

Test the created Docker image

**Check my progress**

## **Task 3. Push the Docker image to the Artifact Registry**

1. Create a repository named `valkyrie-docker-repo` in Artifact Registry. Use **Docker** as the format and use the `us-east1` region as the location.
    
2. Before you can push or pull images, configure Docker to use the Google Cloud CLI to authenticate requests to Artifact Registry. You will need to set up authentication to Docker repositories. You can use the following command.
    

```apache
gcloud auth configure-docker us-east1-docker.pkg.dev
```

3. [Re-tag](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling#tag) the container to be able push it to the repository. The format should resemble the following: `LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE`.
    
4. Push the Docker image to the Artifact Registry.
    

Click *Check my progress* to verify the objective.

Push the Docker image to Artifact Registry

**Check my progress**

## **Task 4. Create and expose a deployment in Kubernetes**

Kurt created the `deployment.yaml` and `service.yaml` to deploy your new container image to a Kubernetes cluster (called valkyrie-dev). The two files are in `valkyrie-app/k8s`.

1. Get the Kubernetes credentials using `us-east1-c` zone before you deploy the image onto the Kubernetes cluster.
    
2. Before you create the deployments, Make sure you check and replace some placeholder values in the `deployment.yaml` file and the format should be `LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE`.
    
3. Create the deployments from the `deployment.yaml` and `service.yaml` files.
    
4. From the Navigation Menu, select **Kubernetes Engine** &gt; **Gateways, Services & Ingress**. Click on the load balancer IP Address of the `valkyrie-dev` service to verify your services are up and running.
    

Click *Check my progress* to verify the objective.

Create and expose a deployment in Kubernetes

---

## Solution of Lab

%[https://www.youtube.com/watch?v=F4h6EmSJkFM] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP318/lab.sh
source lab.sh
```
![](<https://cdn.hashnode.com/res/hashnode/image/upload/v1723952464585/0da492af-f53d-4f2c-b9dc-ef408ac2f18f.png> align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757644915798/3adbcaaa-c29c-4187-a68d-191185ea86f3.png align="center")

**Alternative Solution**

```apache
export REPO_NAME=
export DOCKER_IMAGE=
export TAG_NAME=
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723952464585/0da492af-f53d-4f2c-b9dc-ef408ac2f18f.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Deploy%20Kubernetes%20Applications%20on%20Google%20Cloud%20Challenge%20Lab/quicklabgsp318.sh
sudo chmod +x quicklabgsp318.sh
./quicklabgsp318.sh
```