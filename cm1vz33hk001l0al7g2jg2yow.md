---
title: "Continuous Delivery with Jenkins in Kubernetes Engine - GSP051"
seoTitle: "Continuous Delivery with Jenkins in Kubernetes Engine - GSP051"
seoDescription: "In this lab, you will learn how to set up a continuous delivery pipeline with Jenkins on Kubernetes engine. Jenkins is the go-to automation server used by d"
datePublished: Sat Oct 05 2024 09:49:34 GMT+0000 (Coordinated Universal Time)
cuid: cm1vz33hk001l0al7g2jg2yow
slug: continuous-delivery-with-jenkins-in-kubernetes-engine-gsp051
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728120767409/29d57c26-c6ea-4391-bf4d-51c2257879e6.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1728121754711/a57165b3-0df7-4701-b371-ea9329b35551.png
tags: continuous-delivery-with-jenkins-in-kubernetes-engine-gsp051, gsp051

---

## **Overview**

In this lab, you will learn how to set up a continuous delivery pipeline with `Jenkins` on Kubernetes engine. Jenkins is the go-to automation server used by developers who frequently integrate their code in a shared repository. The solution you'll build in this lab will be similar to the following diagram:

![Jenkins and Kubernetes architecture](https://cdn.qwiklabs.com/1b%2B9D20QnfRjAF8c6xlXmexot7TDcOsYzsRwp%2FH4ErE%3D align="left")

In the Cloud Architecture Center, see [Jenkins on Kubernetes Engine](https://cloud.google.com/solutions/jenkins-on-container-engine) to learn more about running Jenkins on Kubernetes.

### **What you'll learn**

In this lab, you'll complete the following tasks to learn about running Jenkins on Kubernetes:

* Provision a Jenkins application into a Kubernetes Engine Cluster
    
* Set up your Jenkins application using Helm Package Manager
    
* Explore the features of a Jenkins application
    
* Create and exercise a Jenkins pipeline
    

### Prerequisites

This is an **advanced level** lab. Before taking it, you should be comfortable with at least the basics of shell programming, Kubernetes, and Jenkins. Here are some labs that can get you up to speed:

* [Introduction to Docker](https://google.qwiklabs.com/catalog_lab/944)
    
* [Hello Node Kubernetes](https://google.qwiklabs.com/catalog_lab/468)
    
* [Managing Deployments Using Kubernetes Engine](https://google.qwiklabs.com/catalog_lab/572)
    
* [Setting up Jenkins on Kubernetes Engine](https://google.qwiklabs.com/catalog_lab/1093)
    

Once you are prepared, scroll down to learn more about Kubernetes, Jenkins, and Continuous Delivery.

### What is Kubernetes Engine?

Kubernetes Engine is Google Cloud's hosted version of `Kubernetes` - a powerful cluster manager and orchestration system for containers. Kubernetes is an open source project that can run on many different environments—from laptops to high-availability multi-node clusters; from virtual machines to bare metal. As mentioned before, Kubernetes apps are built on `containers` - these are lightweight applications bundled with all the necessary dependencies and libraries to run them. This underlying structure makes Kubernetes applications highly available, secure, and quick to deploy—an ideal framework for cloud developers.

### What is Jenkins?

[Jenkins](https://jenkins.io/) is an open-source automation server that lets you flexibly orchestrate your build, test, and deployment pipelines. Jenkins allows developers to iterate quickly on projects without worrying about overhead issues that can stem from continuous delivery.

### What is Continuous Delivery / Continuous Deployment?

When you need to set up a continuous delivery (CD) pipeline, deploying Jenkins on Kubernetes Engine provides important benefits over a standard VM-based deployment.

When your build process uses containers, one virtual host can run jobs on multiple operating systems. Kubernetes Engine provides `ephemeral build executors`—these are only utilized when builds are actively running, which leaves resources for other cluster tasks such as batch processing jobs. Another benefit of ephemeral build executors is *speed*—they launch in a matter of seconds.

Kubernetes Engine also comes pre-equipped with Google's global load balancer, which you can use to automate web traffic routing to your instance(s). The load balancer handles SSL termination and utilizes a global IP address that's configured with Google's backbone network—coupled with your web front, this load balancer will always set your users on the fastest possible path to an application instance.

Now that you've learned a little bit about Kubernetes, Jenkins, and how the two interact in a CD pipeline, it's time to go build one.

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
    student-04-866525333a86@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    FUz59Cuqslmx
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
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-4b1fb8e72184`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-4b1fb8e72184
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
ACCOUNT: student-04-866525333a86@qwiklabs.net

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
project = qwiklabs-gcp-01-4b1fb8e72184
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Download the source code**

1. To get set up, open a new session in Cloud Shell and run the following command to set your zone `us-central1-c`:
    

```apache
gcloud config set compute/zone us-central1-c
```

2. Then copy the lab's sample code:
    

```apache
gsutil cp gs://spls/gsp051/continuous-deployment-on-kubernetes.zip .
```

```apache
unzip continuous-deployment-on-kubernetes.zip
```

3. Now change to the correct directory:
    

```apache
cd continuous-deployment-on-kubernetes
```

## **Task 2. Provisioning Jenkins**

### **Creating a Kubernetes cluster**

1. Now, run the following command to provision a Kubernetes cluster:
    

```apache
gcloud container clusters create jenkins-cd \
--num-nodes 2 \
--machine-type e2-standard-2 \
--scopes "https://www.googleapis.com/auth/source.read_write,cloud-platform"
```

This step can take up to several minutes to complete. The extra scopes enable Jenkins to access Cloud Source Repositories and Google Container Registry.

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a Kubernetes cluster, you'll see an assessment score.

Create a Kubernetes cluster (zone: `us-central1-c`)

**Check my progress**

2. Before continuing, confirm that your cluster is running by executing the following command:
    

```apache
gcloud container clusters list
```

3. Now, get the credentials for your cluster:
    

```apache
gcloud container clusters get-credentials jenkins-cd
```

4. Kubernetes Engine uses these credentials to access your newly provisioned cluster—confirm that you can connect to it by running the following command:
    

```apache
kubectl cluster-info
```

## **Task 3. Setup Helm**

In this lab, you will use Helm to install Jenkins from the Charts repository. Helm is a package manager that makes it easy to configure and deploy Kubernetes applications. Once you have Jenkins installed, you'll be able to set up your CI/CD pipeline.

1. Add Helm's stable chart repo:
    

```apache
helm repo add jenkins https://charts.jenkins.io
```

2. Ensure the repo is up to date:
    

```apache
helm repo update
```

## **Task 4. Configure and Install Jenkins**

When installing Jenkins, a `values` file can be used as a template to provide values that are necessary for setup.

You will use a custom `values` file to automatically configure your Kubernetes Cloud and add the following necessary plugins:

* Kubernetes:latest
    
* Workflow-multibranch:latest
    
* Git:latest
    
* Configuration-as-code:latest
    
* Google-oauth-plugin:latest
    
* Google-source-plugin:latest
    
* Google-storage-plugin:latest
    

This will allow Jenkins to connect to your cluster and your GCP project.

1. Use the Helm CLI to deploy the chart with your configuration settings:
    

```apache
helm install cd jenkins/jenkins -f jenkins/values.yaml --wait
```

This command may take a couple minutes to complete.

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully configured a Jenkins chart you will see an assessment score.

Configure and Install Jenkins

**Check my progress**

2. Once that command completes ensure the Jenkins pod goes to the `Running` state and the container is in the READY state:
    

```apache
kubectl get pods
```

**Example Output:**

```javascript
NAME                          READY     STATUS    RESTARTS   AGE
cd-jenkins-7c786475dd-vbhg4   2/2       Running   0          1m
```

3. Configure the Jenkins service account to be able to deploy to the cluster:
    

```apache
kubectl create clusterrolebinding jenkins-deploy --clusterrole=cluster-admin --serviceaccount=default:cd-jenkins
```

You should receive the following output:

```apache
clusterrolebinding.rbac.authorization.k8s.io/jenkins-deploy created
```

4. Run the following command to setup port forwarding to the Jenkins UI from the Cloud Shell:
    

```apache
export POD_NAME=$(kubectl get pods --namespace default -l "app.kubernetes.io/component=jenkins-master" -l "app.kubernetes.io/instance=cd" -o jsonpath="{.items[0].metadata.name}")
kubectl port-forward $POD_NAME 8080:8080 >> /dev/null &
```

5. Now, check that the Jenkins Service was created properly:
    

```apache
kubectl get svc
```

**Example Output:**

```javascript
NAME               CLUSTER-IP     EXTERNAL-IP   PORT(S)     AGE
cd-jenkins         10.35.249.67           8080/TCP    3h
cd-jenkins-agent   10.35.248.1            50000/TCP   3h
kubernetes         10.35.240.1            443/TCP     9h
```

You are using the [Kubernetes Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Kubernetes+Plugin) so that our builder nodes will be automatically launched as necessary when the Jenkins master requests them. Upon completion of their work, they will automatically be turned down and their resources added back to the cluster's resource pool.

Notice that this service exposes ports `8080` and `50000` for any pods that match the `selector`. This will expose the Jenkins web UI and builder/agent registration ports within the Kubernetes cluster. Additionally, the `jenkins-ui` service is exposed using a ClusterIP so that it is not accessible from outside the cluster.

## **Task 5. Connect to Jenkins**

1. The Jenkins chart will automatically create an admin password for you. To retrieve it, run:
    

```apache
printf $(kubectl get secret cd-jenkins -o jsonpath="{.data.jenkins-admin-password}" | base64 --decode);echo
```

2. To get to the Jenkins user interface, click on the **Web Preview** button in Cloud Shell, then click **Preview on port 8080**:
    

![Preview on port 8080 option](https://cdn.qwiklabs.com/uGPD3Uvpk2P7ejcWOKjIeVCCx9qYX0l6HOdd7F7cvuE%3D align="left")

3. If asked, log in with username `admin` and your auto-generated password.
    

You now have Jenkins set up in your Kubernetes cluster! Jenkins will drive your automated CI/CD pipelines in the next sections.

## **Task 6. Understanding the Application**

You'll deploy the sample application, `gceme`, in your continuous deployment pipeline. The application is written in the Go language and is located in the repo's sample-app directory. When you run the gceme binary on a Compute Engine instance, the app displays the instance's metadata in an info card.

![Backend that serviced this request page](https://cdn.qwiklabs.com/ceqFX6Vwtd12NSBtnNhrkemKfRSLHbCmFZiLn8WmC98%3D align="left")

The application mimics a microservice by supporting two operation modes.

* In **backend mode**: gceme listens on port 8080 and returns Compute Engine instance metadata in JSON format.
    
* In **frontend mode**: gceme queries the backend gceme service and renders the resulting JSON in the user interface.
    

![gceme architecture diagram](https://cdn.qwiklabs.com/P1T5JBWWprA4iLf%2FB5%2BO6as7otLE25YBde57gzZwSz4%3D align="left")

## **Task 7. Deploying the Application**

You will deploy the application into two different environments:

* **Production**: The live site that your users access.
    
* **Canary**: A smaller-capacity site that receives only a percentage of your user traffic. Use this environment to validate your software with live traffic before it's released to all of your users.
    

1. In Google Cloud Shell, navigate to the sample application directory:
    

```apache
cd sample-app
```

2. Create the Kubernetes namespace to logically isolate the deployment:
    

```apache
kubectl create ns production
```

3. Create the production and canary deployments, and the services using the `kubectl apply` commands:
    

```apache
kubectl apply -f k8s/production -n production
```

```apache
kubectl apply -f k8s/canary -n production
```

```apache
kubectl apply -f k8s/services -n production
```

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created deployments you will see an assessment score.

Create the production and canary deployments

**Check my progress**

By default, only one replica of the frontend is deployed. Use the `kubectl scale` command to ensure that there are at least 4 replicas running at all times.

4. Scale up the production environment frontends by running the following command:
    

```apache
kubectl scale deployment gceme-frontend-production -n production --replicas 4
```

5. Now confirm that you have 5 pods running for the frontend, 4 for production traffic and 1 for canary releases (changes to the canary release will only affect 1 out of 5 (20%) of users):
    

```apache
kubectl get pods -n production -l app=gceme -l role=frontend
```

6. Also confirm that you have 2 pods for the backend, 1 for production and 1 for canary:
    

```apache
kubectl get pods -n production -l app=gceme -l role=backend
```

7. Retrieve the external IP for the production services:
    

```apache
kubectl get service gceme-frontend -n production
```

**Note:** It can take several minutes before you see the load balancer external IP address.

**Example Output:**

```javascript
NAME            TYPE          CLUSTER-IP     EXTERNAL-IP     PORT(S)  AGE
gceme-frontend  LoadBalancer  10.79.241.131  104.196.110.46  80/TCP   5h
```

Paste **External IP** into a browser to see the info card displayed on a card—you should get a similar page:

![Backend that serviced this request](https://cdn.qwiklabs.com/dfXfZfxRk0UMSTZm8FyIaLFsHla7AlUmxHO70UTOFjk%3D align="left")

8. Now, store the *frontend service* load balancer IP in an environment variable for use later:
    

```apache
export FRONTEND_SERVICE_IP=$(kubectl get -o jsonpath="{.status.loadBalancer.ingress[0].ip}" --namespace=production services gceme-frontend)
```

9. Confirm that both services are working by opening the frontend external IP address in your browser.
    
10. Check the version output of the service by running the following command (it should read 1.0.0):
    

```apache
curl http://$FRONTEND_SERVICE_IP/version
```

You have successfully deployed the sample application! Next, you will set up a pipeline for deploying your changes continuously and reliably.

## **Task 8. Creating the Jenkins Pipeline**

### **Creating a repository to host the sample app source code**

1. Create a copy of the `gceme` sample app and push it to a [Cloud Source Repository](https://cloud.google.com/source-repositories/docs/):
    

```apache
gcloud source repos create default
```

You can ignore the warning, you will not be billed for this repository.

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created a source repository you will see an assessment score.

Create a repository

**Check my progress**

```apache
git init
```

2. Initialize the sample-app directory as its own Git repository:
    

```apache
git config credential.helper gcloud.sh
```

3. Run the following command:
    

```apache
git remote add origin https://source.developers.google.com/p/$DEVSHELL_PROJECT_ID/r/default
```

4. Set the username and email address for your Git commits. Replace `[EMAIL_ADDRESS]` with your Git email address and `[USERNAME]` with your Git username:
    

```apache
git config --global user.email "[EMAIL_ADDRESS]"
```

```apache
git config --global user.name "[USERNAME]"
```

5. Add, commit, and push the files:
    

```apache
git add .
```

```apache
git commit -m "Initial commit"
```

```apache
git push origin master
```

### **Adding your service account credentials**

Configure your credentials to allow Jenkins to access the code repository. Jenkins will use your cluster's service account credentials in order to download code from the Cloud Source Repositories.

1. In the Jenkins user interface, click **Manage Jenkins** in the left navigation then click **Security &gt; Credentials**.
    
2. Click **System**.
    

![Credentials page](https://cdn.qwiklabs.com/COiDlgR%2FGOPOAMdVtH70n%2FVRuxZTMdpwmOLCQXJ6m2c%3D align="left")

3. Click **Global credentials (unrestricted)**.
    
4. Click **Add Credentials** in the top right corner.
    
5. Select **Google Service Account from metadata** from the **Kind** drop-down.
    
6. Under **ID** field enter the **Project ID** and click **Create**.
    

**Note:** `Project ID` found in the `CONNECTION DETAILS` section of the lab.

The global credentials have been added.

![Global credentials (unrestricted) page](https://cdn.qwiklabs.com/iQIqhVt%2F18z7QKba6rLWlZu%2FuRuO%2FFcrqRWVdjwXvWM%3D align="left")

### **Configure Jenkins Cloud for Kubernetes**

1. In the Jenkins user interface, select **Manage Jenkins** &gt; **Nodes**.
    
2. Click **Clouds** in the left navigation pane.
    
3. Click **New cloud**.
    
4. Type any name under **Cloud name** and then select **Kubernetes** for **Type**.
    
5. **Click Create**.
    
6. In the **Jenkins URL** field, enter the following value: `http://cd-jenkins:8080`
    
7. In the **Jenkins tunnel** field, enter the following value: `cd-jenkins-agent:50000`
    
8. Click **Save**.
    

### **Creating the Jenkins job**

Navigate to your Jenkins user interface and follow these steps to configure a Pipeline job.

1. Click **Dashboard** &gt; **New Item** in the left panel.
    
2. Name the project **sample-app**, then choose the **Multibranch Pipeline** option and click **OK**.
    
3. On the next page, in the **Branch Sources** section, select **Git** from **Add Source** dropdown.
    
4. Paste the **HTTPS clone URL** of your sample-app repo in Cloud Source Repositories into the **Project Repository** field. Replace `[PROJECT_ID]` with your **Project ID**:
    

```apache
https://source.developers.google.com/p/[PROJECT_ID]/r/default
```

5. From the **Credentials** drop-down, select the name of the credentials you created when adding your service account in the previous steps.
    
6. Under **Scan Multibranch Pipeline Triggers** section, check the **Periodically if not otherwise run** box and set the **Interval** value to **1 minute**.
    
7. Your job configuration should look like this:
    

![Branch Sources section](https://cdn.qwiklabs.com/0ZJCYAksqEOzaNRG3JaMcXKBTRbgpbOZYEjElBRjhI0%3D align="left")

8. Click **Save** leaving all other options with their defaults.
    

After you complete these steps, a job named `Branch indexing` runs. This meta-job identifies the branches in your repository and ensures changes haven't occurred in existing branches. If you click sample-app in the top left, the `master` job should be seen.

**Note:** The first run of the master job might fail until you make a few code changes in the next step.

You have successfully created a Jenkins pipeline! Next, you'll create the development environment for continuous integration.

## **Task 9. Creating the development environment**

Development branches are a set of environments your developers use to test their code changes before submitting them for integration into the live site. These environments are scaled-down versions of your application, but need to be deployed using the same mechanisms as the live environment.

### Creating a development branch

To create a development environment from a feature branch, you can push the branch to the Git server and let Jenkins deploy your environment.

* Create a development branch and push it to the Git server:
    

```apache
git checkout -b new-feature
```

### Modifying the pipeline definition

The `Jenkinsfile` that defines that pipeline is written using the [Jenkins Pipeline Groovy syntax](https://jenkins.io/doc/book/pipeline/syntax/). Using a `Jenkinsfile` allows an entire build pipeline to be expressed in a single file that lives alongside your source code. Pipelines support powerful features like parallelization and require manual user approval.

In order for the pipeline to work as expected, you need to modify the `Jenkinsfile` to set your project ID.

1. Open the Jenkinsfile in your terminal editor, for example `vi`:
    

```apache
vi Jenkinsfile
```

2. Start the editor:
    

```apache
i
```

3. Add your `PROJECT_ID` to the `REPLACE_WITH_YOUR_PROJECT_ID` value. (Your `PROJECT_ID` is your Project ID found in the `CONNECTION DETAILS` section of the lab. You can also run `gcloud config get-value project` to find it.
    
4. Change the value of `CLUSTER_ZONE` to `us-central1-c`. You can get this value by running `gcloud config get compute/zone`.
    

```apache
PROJECT = "REPLACE_WITH_YOUR_PROJECT_ID"
APP_NAME = "gceme"
FE_SVC_NAME = "${APP_NAME}-frontend"
CLUSTER = "jenkins-cd"
CLUSTER_ZONE = "us-central1-c"
IMAGE_TAG = "gcr.io/${PROJECT}/${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
JENKINS_CRED = "${PROJECT}"
```

5. Save the `Jenkinsfile` file: hit **Esc** then (for `vi` users):
    

```apache
:wq
```

### Modify the site

To demonstrate changing the application, you will change the gceme cards from **blue** to **orange**.

1. Open `html.go:`
    

```apache
vi html.go
```

2. Start the editor:
    

```apache
i
```

3. Change the two instances of `<div class="card blue">` with following:
    

```xml
<div class="card orange">
```

4. Save the `html.go` file: press **Esc** then:
    

```apache
:wq
```

5. Open `main.go:`
    

```apache
vi main.go
```

6. Start the editor:
    

```apache
i
```

7. The version is defined in this line:
    

```javascript
const version string = "1.0.0"
```

Update it to the following:

```javascript
const version string = "2.0.0"
```

8. Save the main.go file one more time: **Esc** then:
    

```apache
:wq
```

## **Task 10. Kick off Deployment**

1. Commit and push your changes:
    

```apache
git add Jenkinsfile html.go main.go
```

```apache
git commit -m "Version 2.0.0"
```

```apache
git push origin new-feature
```

This will kick off a build of your development environment.

After the change is pushed to the Git repository, navigate to the Jenkins user interface where you can see that your build started for the `new-feature` branch. It can take up to a minute for the changes to be picked up.

2. After the build is running, click the down arrow next to the **build** in the left navigation and select **Console output**:
    

![Navigation pane](https://cdn.qwiklabs.com/3SL2TROBOgHPAAXRLhLCMEmyJ4h0LJGZAH2aNrLsToQ%3D align="left")

3. Track the output of the build for a few minutes and watch for the `kubectl --namespace=new-feature apply...` messages to begin. Your new-feature branch will now be deployed to your cluster.
    

**Note:** In a development scenario, you wouldn't use a public-facing load balancer. To help secure your application, you can use [kubectl proxy](https://kubernetes.io/docs/tasks/extend-kubernetes/http-proxy-access-api/). The proxy authenticates itself with the Kubernetes API and proxies requests from your local machine to the service in the cluster without exposing your service to the Internet.

If you didn't see anything in `Build Executor`, not to worry. Just go to the Jenkins homepage &gt; sample app. Verify that the `new-feature` pipeline has been created.

4. Once that's all taken care of, start the proxy in the background:
    

```apache
kubectl proxy &
```

5. If it stalls, press **Ctrl + C** to exit out. Verify that your application is accessible by sending a request to `localhost` and letting `kubectl` proxy forward it to your service:
    

```apache
curl \
http://localhost:8001/api/v1/namespaces/new-feature/services/gceme-frontend:80/proxy/version
```

You should see it respond with 2.0.0, which is the version that is now running.

If you receive a similar error:

```javascript
{
  "kind": "Status",
  "apiVersion": "v1",
  "metadata": {
  },
  "status": "Failure",
  "message": "no endpoints available for service \"gceme-frontend:80\"",
  "reason": "ServiceUnavailable",
  "code": 503
```

6. It means your frontend endpoint hasn't propagated yet—wait a little bit and try the `curl` command again. Move on when you get the following output:
    

```abap
2.0.0
```

You have set up the development environment! Next, you will build on what you learned in the previous module by deploying a canary release to test out a new feature.

## **Task 11. Deploying a canary release**

You have verified that your app is running the latest code in the development environment, so now deploy that code to the canary environment.

1. Create a canary branch and push it to the Git server:
    

```apache
git checkout -b canary
```

```apache
git push origin canary
```

2. In Jenkins, you should see the **canary** pipeline has kicked off. Once complete, you can check the service URL to ensure that some of the traffic is being served by your new version. You should see about 1 in 5 requests (in no particular order) returning version `2.0.0`.
    

```apache
export FRONTEND_SERVICE_IP=$(kubectl get -o \
jsonpath="{.status.loadBalancer.ingress[0].ip}" --namespace=production services gceme-frontend)
```

```apache
while true; do curl http://$FRONTEND_SERVICE_IP/version; sleep 1; done
```

3. If you keep seeing 1.0.0, try running the above commands again. Once you've verified that the above works, end the command with **Ctrl + C**.
    

That's it! You have deployed a canary release. Next you will deploy the new version to production.

## **Task 12. Deploying to production**

Now that our canary release was successful and we haven't heard any customer complaints, deploy to the rest of your production fleet.

1. Create a canary branch and push it to the Git server:
    

```apache
git checkout master
```

```apache
git merge canary
```

```apache
git push origin master
```

In Jenkins, you should see the master pipeline has kicked off.

2. *Once complete* (which may take a few minutes), you can check the service URL to ensure that all of the traffic is being served by your new version, 2.0.0.
    

```apache
export FRONTEND_SERVICE_IP=$(kubectl get -o \
jsonpath="{.status.loadBalancer.ingress[0].ip}" --namespace=production services gceme-frontend)
```

```apache
while true; do curl http://$FRONTEND_SERVICE_IP/version; sleep 1; done
```

3. Once again, if you see instances of `1.0.0` try running the above commands again. You can stop this command by pressing **Ctrl + C**.
    

**Example output:**

```apache
gcpstaging9854_student@qwiklabs-gcp-df93aba9e6ea114a:~/continuous-deployment-on-kubernetes/sample-app$ while true; do curl http://$FRONTEND_SERVICE_IP/version; sleep 1; done
2.0.0
2.0.0
2.0.0
2.0.0
2.0.0
2.0.0
```

You can also navigate to site on which the gceme application displays the info cards. The card color changed from blue to orange.

4. Here's the command again to get the external IP address. Paste the **External IP** into a new tab to see the info card displayed:
    

```apache
kubectl get service gceme-frontend -n production
```

**Example output:**

![Backend that serviced this request page](https://cdn.qwiklabs.com/nFJlHtZPI%2F8HvtCNSGRmCyqRkMDylftq%2F200xRXtUKc%3D align="left")

## **Task 13. Test your Understanding**

Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

**Which are the following Kubernetes namespaces used in the lab?**

* jenkins
    
* production
    
* helm
    
* kube-system
    
* default
    

**The Helm chart is a collection of files that describe a related set of Kubernetes resources.**

* True
    
* False
    

**You're done!**

Awesome job, you have successfully deployed your application to production!

---

## Solution of Lab

%[https://www.youtube.com/watch?v=Z97ASiJkgt4&ab_channel=Techcps] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1728120974306/6d84e092-f8b1-4da5-9a26-ca722d49177f.png align="center")

```apache
curl -LO raw.githubusercontent.com/Techcps/GSP-Short-Trick/master/Continuous%20Delivery%20with%20Jenkins%20in%20Kubernetes%20Engine/techcps051.sh
sudo chmod +x techcps051.sh
./techcps051.sh
```