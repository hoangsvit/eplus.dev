---
title: "GKE Autopilot: Qwik Start - GSP957"
seoTitle: "GKE Autopilot: Qwik Start - GSP957"
seoDescription: "Learn to containerize and deploy applications with GKE Autopilot using Kubernetes in a hands-on lab setting. Focus on development, not infrastructure"
datePublished: Sat Jul 19 2025 04:20:00 GMT+0000 (Coordinated Universal Time)
cuid: cmd9qoqz2000d02gw93q1dniy
slug: gke-autopilot-qwik-start-gsp957
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752898753570/82070072-e824-42aa-b108-6cf79ad3daa4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752898777146/a043ee9c-bc1b-4791-9b1e-160d8d255008.png
tags: autopilot, gke-autopilot-qwik-start-gsp957, gke-autopilot-qwik-start, gsp957, gke-autopilot

---

## Overview

Google Kubernetes Engine (GKE) [Autopilot](https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview) is a new managed mode of operation in which Google creates, sizes, and automatically scales on your behalf the physical infrastructure needed to run your application workloads.

In this lab, you get hands-on practice containerizing an application and deploying it to an GKE Autopilot cluster using a Kubernetes configuration and commands.

### Simplifying GKE with Autopilot

On GKE your compute infrastructure consists of *nodes* based on individual compute instances.  
A group of nodes is called a *cluster*. Powering GKE is [Kubernetes](https://kubernetes.io/), an open source cluster orchestration platform that is heavily influenced by over fifteen years of Google's experience running production workloads in containers. Kubernetes draws on the same design principles for running popular Google services at global scale to provide:

* Automatic management
    
* Monitoring and liveness probes for application containers
    
* Automatic scaling
    
* Rolling updates
    

With GKE Autopilot, you reap the benefits of Google's ability to optimize and configure a cluster using best practices for high availability and security, monitor the health of the cluster, and recalculate the cluster capacity needed to run your workloads at any given moment.

GKE Autopilot liberates you, the developer, to focus on application development, and not operational maintenance. You're still using Kubernetes to run the mission-critical mix of stateless and stateful services your application requires.

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## Task 1. Access Cloud Code

An integrated development environment (IDE) with the [Cloud Code](https://cloud.google.com/code) extension has already been set up to easily deploy workloads to a GKE cluster. This lab is using Cloud Code to access Google Cloud products and services. You can view information about your cluster resources from the editor or via the command line.

1. Copy the `IDE` URL from the **Lab details** panel.
    
2. Paste it into a new browser window:
    
    **Note:**  
    The lab environment is uses a development environment to access services. You can control the GKE Autopilot cluster directly from this environment.
    

## Task 2. Clone repo

The first task is to clone a repo with the code to be run. Retrieve the source code under version control to begin the lab.

1. In your Cloud Code environment, select the **Source Control** button from the sidebar.
    
    ![Source Control button highlighted](https://cdn.qwiklabs.com/cDoJZPkxYLr95CiROSoMkb%2Fg0olf0t%2FnYGWQXVCusSU%3D align="left")
    
2. Click the **Clone Repository** button.
    
3. Paste the following GitHub repository into the prompted search bar:
    
    ```apache
    https://github.com/subfuzion/voting-demo.git
    ```
    
4. Click **Clone from URL** in the dropdown list under the search bar.
    
5. Click **OK** to confirm the location.
    
    **Note:**  
    If prompted with a pop up asking about trusting the folders, select `Yes I trust the Authors`.
    
6. When prompted to open the folder of the repo, click **Open**.
    
    Click *Check my progress* to verify the objective.
    
    Clone the Repository
    

## Task 3. Add your cluster to the KubeConfig

GKE Autopilot has been pre-provisioned within the lab. In this section, you will update the environment KubeConfig to point to the cluster. Once the update is complete, you can then commence the deployment of the demo application.

1. Visit the Navigation Menu and select **Terminal** &gt; **New Terminal**.
    
    ![open a new terminal](https://cdn.qwiklabs.com/GjZlnYgrMyxcf2Cu4EULCC09vTDzI3WU%2FsXK87kS5js%3D align="left")
    
    **Note:**  
    Existing versions of `kubectl` and custom Kubernetes clients contain provider-specific code to manage authentication between the client and Google Kubernetes Engine. Starting with v1.26, this code will no longer be included as part of the OSS kubectl.  
    GKE users will need to download and use a separate authentication plugin to generate GKE-specific tokens. This new binary, `gke-gcloud-auth-plugin`, uses the [Kubernetes Client-go Credential Plugin](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#client-go-credential-plugins) mechanism to extend kubectl’s authentication to support GKE.  
    For more information, you can check out the following [documentation](https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke).
    
2. Add the cluster credentials to the local kube-config
    
    ```apache
    gcloud container clusters get-credentials dev-cluster --region us-east1
    ```
    
    **Expected output:**
    
    ```apache
    Fetching cluster endpoint and auth data.
    kubeconfig entry generated for dev-cluster.
    ```
    
    Click *Check my progress* to verify the objective.
    
    Add cluster to the KubeConfig
    
    **Note:**  
    It can sometimes take a few minutes for this check to verify.
    

## Task 4. Build and deploy the app

Before you can deploy an application, you need a container for that application. In this environment, you will utilize a `skaffold` manifest which builds the `web` and `vote` containers. The lab uses `artifact registry` to host the container images and then deploys the images using Kubernetes manifests.

1. Open a terminal, if one is not available
    
2. Change to the application folder
    
    ```apache
    cd ~/voting-demo/v2
    ```
    
3. Set the region for the deployment
    
    ```apache
    gcloud config set compute/region us-east1
    ```
    
4. Use skaffold to deploy the source application
    
    ```apache
    skaffold run --default-repo=gcr.io/qwiklabs-gcp-03-c7c3a803540c/voting-app --tail
    ```
    
    **Note:**  
    The deployment will take a minute to spin up the resources.  
    A container image will be built from source and then once available it will be deployed to the GKE autopilot cluster.
    
    Click *Check my progress* to verify the objective.
    
    Deploy the App
    

## Task 5. Run the app

Now test that the application is working as specified.

1. Launch a new terminal to test the application.
    
2. Run the command below to verify the `web-external` load balancer has been created
    
    ```apache
    kubectl get svc web-external --output=json | jq -r .status.loadBalancer.ingress[0].ip
    ```
    
    **Note:**  
    It may take a moment for the load balancer to return an IP address. Please wait until an IP is returned before moving on.
    
3. Open a new tab in your browser
    
4. Enter the IP value returned as a HTTP site
    
    ```apache
    http://[web-external-ip]
    ```
    
    **Expected output:**
    
    ![Voting app displays two options: tabs or spaces](https://cdn.qwiklabs.com/yCU0JxRsknEyqbv7Cqk68dtcI4%2FeMfdRw2E%2FaWfMhC4%3D align="left")
    
    **Note:**  
    The application deployed to GKE Autopilot is now accessible on the internet.
    

## Task 6. Test the app

1. Vote for either **TABS** or **SPACES**.
    
    **Note:**  
    Press either button as many times as you like. We will test the input in the next step.
    
2. Update the voting app URL as follows:
    
    ```apache
    http://[web-external-ip]/results
    ```
    
    **Example output:**
    
    ```json
    {
      "results": {
        "a": 0,
        "b": 1
      },
      "success": true
    }
    ```
    
    Click *Check my progress* to verify the objective.
    
    Test the App
    
    Great job! You now have your voting application deployed to a cluster. GKE Autopilot has taken care of the management of the Kubernetes infrastructure.
    

## Task 7. Clean up

1. Terminate your application by pressing `CTRL-C` in the terminal running the application.
    
    **Note:**  
    The skaffold application is still active. If we re-run the skaffold application, it will use the existing resources we created earlier.  
    How do we delete the application? We need to tell skaffold that the application is no longer required.
    
2. Tell `Skaffold` to delete the resources
    
    ```apache
    skaffold delete
    ```
    
    **Expected output:**
    
    ```apache
    Cleaning up...
     - deployment.apps "database" deleted
     - service "database" deleted
     - deployment.apps "vote" deleted
     - service "vote" deleted
     - deployment.apps "web" deleted
     - service "web" deleted
     - service "web-external" deleted
    ```
    
    Click *Check my progress* to verify the objective.
    
    Delete App from cluster
    

---

## Solution of Lab

%[https://youtu.be/fMmKo5VRwpM] 

* **Paste the following GitHub repository into the prompted search bar:**
    

```apache
https://github.com/subfuzion/voting-demo.git
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1768111389489/51f40ab7-418a-4433-9ca0-b420bb2899b2.png align="center")

**🚨Copy and run the commands below in Terminal:**

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP957/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752898516944/4251c19a-792f-4ebe-9ed8-6a089c5ab01f.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752898507230/fc02bb47-8dbf-47e3-ad1c-95b9c2650e90.png align="center")

Terminate your application by pressing `CTRL-C` in the terminal running the application.

```apache
skaffold delete
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1752899316199/f0379e83-1da8-440d-9331-143e1fdb4c12.png align="center")