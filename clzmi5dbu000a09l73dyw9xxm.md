---
title: "Google Kubernetes Engine: Qwik Start - GSP100"
seoTitle: "Google Kubernetes Engine: Qwik Start - GSP100"
seoDescription: "Google Kubernetes Engine (GKE) provides a managed environment for deploying, managing, and scaling your containerized applications using Google infrastructu"
datePublished: Fri Aug 09 2024 09:26:07 GMT+0000 (Coordinated Universal Time)
cuid: clzmi5dbu000a09l73dyw9xxm
slug: google-kubernetes-engine-qwik-start-gsp100
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723195169062/fd64d21a-a298-463f-a41f-4c7bcc5ee728.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723195556829/6f545a1c-d698-409b-8caa-fab538a50e78.png
tags: google-kubernetes-engine-qwik-start-gsp100

---

## **Overview**

[Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine) (GKE) provides a managed environment for deploying, managing, and scaling your containerized applications using Google infrastructure. The GKE environment consists of multiple machines (specifically [Compute Engine](https://cloud.google.com/compute) instances) grouped to form a [container cluster](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture).

In this lab, you get hands-on practice with container creation and application deployment with GKE.

**Objectives**

In this lab you will learn how to:

* Create a GKE cluster
    
* Deploy an application to the cluster
    
* Delete the cluster
    

**Cluster orchestration with Google Kubernetes Engine**

Google Kubernetes Engine (GKE) clusters are powered by the [Kubernetes](https://kubernetes.io/) open source cluster management system. Kubernetes provides the mechanisms through which you interact with your container cluster. You use Kubernetes commands and resources to deploy and manage your applications, perform administrative tasks, set policies, and monitor the health of your deployed workloads.

Kubernetes draws on the same design principles that run popular Google services and provides the same benefits: automatic management, monitoring and liveness probes for application containers, automatic scaling, rolling updates, and more. When you run your applications on a container cluster, you're using technology based on Google's 10+ years of experience with running production workloads in containers.

**Kubernetes on Google Cloud**

When you run a GKE cluster, you also gain the benefit of advanced cluster management features that Google Cloud provides. These include:

* [Load balancing](https://cloud.google.com/compute/docs/load-balancing-and-autoscaling) for Compute Engine instances
    
* [Node pools](https://cloud.google.com/kubernetes-engine/docs/node-pools) to designate subsets of nodes within a cluster for additional flexibility
    
* [Automatic scaling](https://cloud.google.com/kubernetes-engine/docs/cluster-autoscaler) of your cluster's node instance count
    
* [Automatic upgrades](https://cloud.google.com/kubernetes-engine/docs/node-auto-upgrade) for your cluster's node software
    
* [Node auto-repair](https://cloud.google.com/kubernetes-engine/docs/how-to/node-auto-repair) to maintain node health and availability
    
* [Logging and Monitoring](https://cloud.google.com/kubernetes-engine/docs/how-to/logging) with Cloud Monitoring for visibility into your cluster
    

Now that you have a basic understanding of Kubernetes, you will learn how to deploy a containerized application with GKE in less than 30 minutes. Follow the steps below to set up your lab environment.

---

### **Task 1. Set a default compute zone**

Your [compute zone](https://cloud.google.com/compute/docs/regions-zones/#available) is an approximate regional location in which your clusters and their resources live. For example, `us-central1-a` is a zone in the `us-central1` region.

In your Cloud Shell session, run the following commands.

1. Set the default compute region:
    
    ```apache
    gcloud config set compute/region us-east4
    ```
    
    **Expected output**:
    
    ```apache
    Updated property [compute/region].
    ```
    
2. Set the default compute zone:
    
    ```apache
    gcloud config set compute/zone us-east4-c
    ```
    
    **Expected output**:
    
    ```plaintext
    Updated property [compute/zone].
    ```
    

### **Task 2. Create a GKE cluster**

A [cluster](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture) consists of at least one **cluster master** machine and multiple worker machines called **nodes**. Nodes are [Compute Engine virtual machine (VM) instances](https://cloud.google.com/compute/docs/instances/) that run the Kubernetes processes necessary to make them part of the cluster.

**Note:** Cluster names must start with a letter and end with an alphanumeric, and cannot be longer than 40 characters.

Run the following command:

* Create a cluster:
    
    ```apache
    gcloud container clusters create --machine-type=e2-medium --zone=us-east4-c lab-cluster
    ```
    

You can ignore any warnings in the output. It might take several minutes to finish creating the cluster.

**Expected output**:

```bash
NAME: lab-cluster
LOCATION: us-east4-c
MASTER_VERSION: 1.22.8-gke.202
MASTER_IP: 34.67.240.12
MACHINE_TYPE: e2-medium
NODE_VERSION: 1.22.8-gke.202
NUM_NODES: 3
STATUS: RUNNING
```

Click **Check my progress** to verify the objective.

Create a GKE cluster

**Check my progress**

### **Task 3. Get authentication credentials for the cluster**

After creating your cluster, you need authentication credentials to interact with it.

* Authenticate with the cluster:
    
    ```apache
    gcloud container clusters get-credentials lab-cluster
    ```
    
    **Expected output**:
    
    ```plaintext
    Fetching cluster endpoint and auth data.
    kubeconfig entry generated for my-cluster.
    ```
    

### **Task 4. Deploy an application to the cluster**

You can now deploy a containerized application to the cluster. For this lab, you'll run `hello-app` in your cluster.

GKE uses Kubernetes objects to create and manage your cluster's resources. Kubernetes provides the [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) object for deploying stateless applications like web servers. [Service](https://kubernetes.io/docs/concepts/services-networking/service/) objects define rules and load balancing for accessing your application from the internet.

1. To **create a new Deployment** `hello-server` from the `hello-app` container image, run the following `kubectl create` command:
    
    ```apache
    kubectl create deployment hello-server --image=gcr.io/google-samples/hello-app:1.0
    ```
    
    **Expected output**:
    
    ```apache
    deployment.apps/hello-server created
    ```
    
    This Kubernetes command creates a deployment object that represents `hello-server`. In this case, `--image` specifies a container image to deploy. The command pulls the example image from a [Container Registry](https://cloud.google.com/container-registry/docs) bucket. `gcr.io/google-samples/hello-app:1.0` indicates the specific image version to pull. If a version is not specified, the latest version is used.
    
    Click **Check my progress** to verify the objective.
    
    Create a new Deployment: hello-server
    
    **Check my progress**
    
2. To create a Kubernetes Service, which is a Kubernetes resource that lets you expose your application to external traffic, run the following `kubectl expose` command:
    
    ```apache
    kubectl expose deployment hello-server --type=LoadBalancer --port 8080
    ```
    
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
    
    **Expected output**:
    
    ```apache
    NAME             TYPE            CLUSTER-IP      EXTERNAL-IP     PORT(S)           AGE
    hello-server     loadBalancer    10.39.244.36    35.202.234.26   8080:31991/TCP    65s
    kubernetes       ClusterIP       10.39.240.1               433/TCP           5m13s
    ```
    
    **Note:** It might take a minute for an external IP address to be generated. Run the previous command again if the `EXTERNAL-IP` column status is **pending**.
    
4. To view the application from your web browser, open a new tab and enter the following address, replacing `[EXTERNAL IP]` with the `EXTERNAL-IP` for `hello-server`.
    
    ```plaintext
    http://[EXTERNAL-IP]:8080
    ```
    
    **Expected output**: The browser tab displays the message **Hello, world!** as well as the version and hostname.
    
    Click **Check my progress** to verify the objective.
    
    Create a Kubernetes Service
    
    **Check my progress**
    

### **Task 5. Deleting the cluster**

1. To **delete** the cluster, run the following command:
    
    ```apache
    gcloud container clusters delete lab-cluster
    ```
    
2. When prompted, type **Y** to confirm.
    
    Deleting the cluster can take a few minutes. For more information on deleted GKE clusters from the Google Kubernetes Engine (GKE) article, [Deleting a cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/deleting-a-cluster).
    
    Click **Check my progress** to verify the objective.
    
    Delete the cluster
    

---

### Solution of Lab

%[https://www.youtube.com/watch?v=RjyPXpcKLrA] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723195393437/ae029705-698c-4d73-ad14-274405ba86e0.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Google%20Kubernetes%20Engine%20Qwik%20Start/quicklabgsp100.sh
sudo chmod +x quicklabgsp100.sh
./quicklabgsp100.sh
```