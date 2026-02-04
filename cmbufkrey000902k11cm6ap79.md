---
title: "Setting up Jenkins on Kubernetes Engine - GSP117"
seoTitle: "Setting up Jenkins on Kubernetes Engine - GSP117"
seoDescription: "In this hands-on lab, you'll learn how to set up Jenkins on Google Kubernetes Engine to help orchestrate your software delivery pipeline."
datePublished: Fri Jun 13 2025 06:32:43 GMT+0000 (Coordinated Universal Time)
cuid: cmbufkrey000902k11cm6ap79
slug: setting-up-jenkins-on-kubernetes-engine-gsp117
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749795688286/7c1665ee-8070-44e3-8e9b-0cc5a6ed8b10.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749796261708/32d5f3cc-4c00-4041-b896-cb0d9963d8e7.png
tags: setting-up-jenkins-on-kubernetes-engine-gsp117, setting-up-jenkins-on-kubernetes-engine, gsp117

---

## Overview

In this hands-on lab, you'll learn how to set up Jenkins on Google Kubernetes Engine to help orchestrate your software delivery pipeline.

### Objectives

* Creating a Kubernetes cluster with Kubernetes Engine.
    
* Creating a Jenkins deployment and services.
    
* Connecting to Jenkins.
    

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    * The Open Google Cloud console button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-04-b179b49d2382@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    rBNYlkXmqcF7
    ```
    
    You can also find the Password in the Lab Details pane.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-14003710d5e2`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-14003710d5e2
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-b179b49d2382@qwiklabs.net

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
project = qwiklabs-gcp-04-14003710d5e2
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Prepare the environment

First, you'll prepare your deployment environment and download a sample application.

1. Set the default Compute Engine zone to `us-east1-c`:
    

```apache
gcloud config set compute/zone us-east1-c
```

2. Clone the sample code:
    

```apache
git clone https://github.com/GoogleCloudPlatform/continuous-deployment-on-kubernetes.git
```

3. Navigate to the sample code directory:
    

```apache
cd continuous-deployment-on-kubernetes
```

### Creating a Kubernetes cluster

Now you'll use the Kubernetes Engine to create and manage your Kubernetes cluster.

1. Next, provision a Kubernetes cluster using Kubernetes Engine. This step can take several minutes to complete:
    

```apache
gcloud container clusters create jenkins-cd \
--num-nodes 2 \
--scopes "https://www.googleapis.com/auth/projecthosting,cloud-platform"
```

The extra scopes enable Jenkins to access Artifact Registry.

### Test completed task

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will granted with an assessment score.

Create a Kubernetes cluster (zone: `us-east1-c`)

**Check my progress**

2. Confirm that your cluster is running:
    

```apache
gcloud container clusters list
```

**Example Output:**

Look for `RUNNING` in the `STATUS` column:

```apache
NAME        LOCATION                      MASTER_VERSION  MASTER_IP      MACHINE_TYPE   NODE_VERSION  NUM_NODES  STATUS
jenkins-cd  us-east1-c  1.9.7-gke.3     35.237.126.84  e2-medium      1.9.7-gke.3   2          RUNNING
```

3. Get the credentials for your cluster. Kubernetes Engine uses these credentials to access your newly provisioned cluster.
    

```apache
gcloud container clusters get-credentials jenkins-cd
```

4. Confirm that you can connect to your cluster:
    

```apache
kubectl cluster-info
```

**Example output:** If the cluster is running, the URLs of where your Kubernetes components are accessible display:

```apache
Kubernetes master is running at https://130.211.178.38
GLBCDefaultBackend is running at https://130.211.178.38/api/v1/proxy/namespaces/kube-system/services/default-http-backend
Heapster is running at https://130.211.178.38/api/v1/proxy/namespaces/kube-system/services/heapster
KubeDNS is running at https://130.211.178.38/api/v1/proxy/namespaces/kube-system/services/kube-dns
kubernetes-dashboard is running at https://130.211.178.38/api/v1/proxy/namespaces/kube-system/services/kubernetes-dashboard
```

## Task 2. Configure Helm

In this lab, you will use Helm to install Jenkins from the Charts repository. Helm is a package manager that makes it easy to configure and deploy Kubernetes applications. Your Cloud Shell will already have a recent, stable version of Helm pre-installed.

If curious, you can run `helm version` in Cloud Shell to check which version you are using and also ensure that Helm is installed.

1. Add Helm's `jenkins` chart repository:
    

```apache
helm repo add jenkins https://charts.jenkins.io
```

2. Update the repo to ensure you get the latest list of charts:
    

```apache
helm repo update
```

## Task 3. Configure and install Jenkins

You will use a custom values file to add the Google Cloud specific plugin necessary to use service account credentials to reach Source Repository.

1. Use the Helm CLI to deploy the chart with your configuration set:
    

```apache
helm upgrade --install -f jenkins/values.yaml myjenkins jenkins/jenkins
```

### Test completed task

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will granted with an assessment score.

Configure and Install Jenkins

**Check my progress**

2. Once that command completes ensure the Jenkins pod goes to the Running state and the container is in the READY state. This may take about 2 minutes:
    

```apache
kubectl get pods
```

**Example output:**

```apache
  NAME          READY     STATUS    RESTARTS   AGE
  myjenkins-0   2/2       Running   0          1m
```

3. Run the following command to setup port forwarding to the Jenkins UI from the Cloud Shell:
    

```apache
echo http://127.0.0.1:8080
kubectl --namespace default port-forward svc/myjenkins 8080:8080 >> /dev/null &
```

4. Now, check that the Jenkins Service was created properly:
    

```apache
kubectl get svc
```

**Example output:**

```apache
  NAME               CLUSTER-IP     EXTERNAL-IP   PORT(S)     AGE
  myjenkins          10.35.249.67   <none>        8080/TCP    3h
  myjenkins-agent    10.35.248.1    <none>        50000/TCP   3h
  kubernetes         10.35.240.1    <none>        443/TCP     9h
 </none></none></none>
```

We are using the [Kubernetes Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Kubernetes+Plugin) so that our builder nodes will be automatically launched as necessary when the Jenkins master requests them. Upon completion of their work, they will automatically be turned down and their resources added back to the clusters resource pool.

Notice that this service exposes ports `8080` and `50000` for any pods that match the `selector`. This will expose the Jenkins web UI and builder/agent registration ports within the Kubernetes cluster.

Additionally, the `jenkins-ui` service is exposed using a ClusterIP so that it is not accessible from outside the cluster.

## Task 4. Connect to Jenkins

1. The Jenkins chart will automatically create an admin password for you. To retrieve it, run:
    

```apache
kubectl exec --namespace default -it svc/myjenkins -c jenkins -- /bin/cat /run/secrets/additional/chart-admin-password && echo
```

2. To get to the Jenkins user interface, click on the **Web Preview** button in cloud shell, then click **Preview on port 8080**:
    

![Expanded Web preview dropdown menu with Preview on port 8080 option highlighted](https://cdn.qwiklabs.com/VtHLqY%2FZwi28nRbu431iPiPqlEc9QoB0vmVSAfOsyEg%3D align="left")

3. You should now be able to log in with the username `admin` and your auto-generated password.
    

You may also be automatically logged in as well.

You now have Jenkins set up in your Kubernetes cluster!

## Test your understanding

Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

The additional scope enables access to Kubernetes cluster for interacting with other Google Cloud services.TrueFalse

The role-based access control (RBAC) is an approach to restricting system access to authorized users.TrueFalse

---

## Solution of Lab

%[https://youtu.be/J2zZYwEHXCA] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP117/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Setting%20up%20Jenkins%20on%20Kubernetes%20Engine/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1749796174776/e4955128-4c23-4696-9bf3-d56027b1057b.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1749796234316/01691cb4-49d9-42ea-a41c-e2b7ecba5027.png align="center")