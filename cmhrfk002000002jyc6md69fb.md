---
title: "gcloud and kubectl for Google Kubernetes Engine - GSP821"
seoTitle: "gcloud and kubectl for Google Kubernetes Engine - GSP821"
seoDescription: "Learn to deploy and manage containerized applications on Google Kubernetes Engine using gcloud and kubectl in this hands-on lab"
datePublished: Sun Nov 09 2025 08:07:03 GMT+0000 (Coordinated Universal Time)
cuid: cmhrfk002000002jyc6md69fb
slug: gcloud-and-kubectl-for-google-kubernetes-engine-gsp821
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762675589594/99c63ea5-d614-4838-ad62-cf1c59e07e1a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1762675608489/384490e8-0f5c-4899-8430-4ae1f380c359.png
tags: gcloud-and-kubectl-for-google-kubernetes-engine-gsp821, gcloud-and-kubectl-for-google-kubernetes-engine, gsp821

---

## Overview

[Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine) (GKE) provides a managed environment for deploying, managing, and scaling your containerized applications using Google infrastructure. The GKE environment consists of multiple machines (specifically [Compute Engine](https://cloud.google.com/compute) instances) grouped to form a [container cluster](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture).

In this lab, you get hands-on practice with container creation and application deployment with GKE.

### What you'll learn to do

In this lab you will learn how to:

* Deploy an application to the GKE cluster
    

#### Cluster orchestration with Google Kubernetes Engine

Google Kubernetes Engine (GKE) clusters are powered by the [Kubernetes](https://kubernetes.io/) open source cluster management system. Kubernetes provides the mechanisms through which you interact with your container cluster. You use Kubernetes commands and resources to deploy and manage your applications, perform administrative tasks, set policies, and monitor the health of your deployed workloads.

Kubernetes draws on the same design principles that run popular Google services and provides the same benefits: automatic management, monitoring and liveness probes for application containers, automatic scaling, rolling updates, and more. When you run your applications on a container cluster, you're using technology based on Google's 10+ years of experience with running production workloads in containers.

#### Kubernetes on Google Cloud

When you run a GKE cluster, you also gain the benefit of advanced cluster management features that Google Cloud provides. These include:

* [Load balancing](https://cloud.google.com/compute/docs/load-balancing-and-autoscaling) for Compute Engine instances
    
* [Node pools](https://cloud.google.com/kubernetes-engine/docs/node-pools) to designate subsets of nodes within a cluster for additional flexibility
    
* [Automatic scaling](https://cloud.google.com/kubernetes-engine/docs/cluster-autoscaler) of your cluster's node instance count
    
* [Automatic upgrades](https://cloud.google.com/kubernetes-engine/docs/node-auto-upgrade) for your cluster's node software
    
* [Node auto-repair](https://cloud.google.com/kubernetes-engine/docs/how-to/node-auto-repair) to maintain node health and availability
    
* [Logging and Monitoring](https://cloud.google.com/kubernetes-engine/docs/how-to/logging) with Cloud Monitoring for visibility into your cluster
    

Now that you have a basic understanding of Kubernetes, you will learn how to deploy a containerized application with GKE in less than 15 minutes. Follow the steps below to set up your lab environment.

## Setup and requirements

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

**Pre-configured resource:**

* You have a pre-created GKE cluster for this lab named **lab-cluster**.
    

## Task 1. Set a default compute zone

Your [compute zone](https://cloud.google.com/compute/docs/regions-zones/#available) is an approximate regional location in which your clusters and their resources live. For example, `us-central1-a` is a zone in the `us-central1` region.

In your cloud terminal, run the following commands.

1. Set the default compute region:
    
    ```apache
    gcloud config set compute/region "REGION"
    ```
    
    Copied!
    
    **Expected output**:
    
    ```apache
    Updated property [compute/region].
    ```
    
2. Set the default compute zone:
    
    ```apache
    gcloud config set compute/zone "ZONE"
    ```
    
    Copied!
    
    **Expected output**:
    
    ```apache
    Updated property [compute/zone].
    ```
    

## Task 2. Get authentication credentials for the GKE cluster

You need authentication credentials to interact with your cluster.

* Use the following `gcloud` command to retrieve the cluster credentials:
    
    ```apache
    gcloud container clusters get-credentials lab-cluster
    ```
    
    Copied!
    
    **Expected output**:
    
    ```apache
    Fetching cluster endpoint and auth data.
    kubeconfig entry generated for lab-cluster.
    ```
    
    This command is used to authenticate your `kubectl` client to a specific Google Kubernetes Engine (GKE) cluster so that you can interact with the cluster. This command fetches the cluster's credentials and updates your `kubectl` configuration with the necessary information.
    

## Task 3. Deploy an application to the GKE cluster

You can now deploy a containerized application to the cluster. For this lab, you'll deploy `hello-app` on your cluster.

GKE uses Kubernetes objects to create and manage your cluster's resources. Kubernetes provides the [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) object for deploying stateless applications like web servers. [Service](https://kubernetes.io/docs/concepts/services-networking/service/) objects define rules and load balancing for accessing your application from the internet.

1. To create a new Deployment named `hello-server` from the `hello-app` container image, run the following `kubectl create` command:
    
    ```apache
    kubectl create deployment hello-server --image=gcr.io/google-samples/hello-app:1.0
    ```
    
    Copied!
    
    **Expected output**:
    
    ```apache
    deployment.apps/hello-server created
    ```
    
    This Kubernetes command creates a deployment object that represents `hello-server`. In this case, `--image` specifies a container image to deploy. The command pulls the example image from a [Container Registry](https://cloud.google.com/container-registry/docs) bucket. `gcr.io/google-samples/hello-app:1.0` indicates the specific image version to pull. If a version is not specified, the latest version is used.
    
    Click **Check my progress** to verify the objective.
    
    Create a new Deployment: hello-server
    
2. To create a Kubernetes Service, which is a Kubernetes resource that lets you expose your application to external traffic, run the following `kubectl expose` command:
    
    ```apache
    kubectl expose deployment hello-server --type=LoadBalancer --port 8080
    ```
    
    Copied!
    
    In this command:
    
    * `--port` specifies the port that the container exposes.
        
    * `type="LoadBalancer"` creates a Compute Engine load balancer for your container.
        
    
    **Expected output**:
    
    ```apache
    service/hello-server exposed
    ```
    
3. To inspect the `hello-server` Service, run `kubectl get`:
    
    ```apache
    kubectl get service
    ```
    
    Copied!
    
    **Expected output**:
    
    ```apache
    NAME             TYPE            CLUSTER-IP      EXTERNAL-IP     PORT(S)           AGE
    hello-server     loadBalancer    10.39.244.36    35.202.234.26   8080:31991/TCP    65s
    kubernetes       ClusterIP       10.39.240.1     <none>          433/TCP           5m13s
    </none>
    ```
    
    **Note:** It might take a minute for an external IP address to be generated. Run the previous command again if the `EXTERNAL-IP` column status is **pending**.
    
4. To view the application from your web browser, open a new tab and enter the following address, replacing `[EXTERNAL IP]` with the `EXTERNAL-IP` for `hello-server`.
    
    ```apache
    http://[EXTERNAL-IP]:8080
    ```
    
    Copied!
    
    **Expected output**: The browser tab displays the message **Hello, world!** as well as the version and hostname.
    
    Click **Check my progress** to verify the objective.
    
    Create a Kubernetes Service
    

---

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP821/lab.sh
source lab.sh
```

---

### Manual

%[https://youtu.be/ADauF_R5sl0]