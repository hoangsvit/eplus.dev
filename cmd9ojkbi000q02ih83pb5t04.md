---
title: "Hello Node Kubernetes - GSP005"
seoTitle: "Hello Node Kubernetes - GSP005"
seoDescription: "Learn to deploy a Node.js app to a Kubernetes cluster with Google Cloud services, Docker containers, and Kubernetes Engine"
datePublished: Sat Jul 19 2025 03:19:59 GMT+0000 (Coordinated Universal Time)
cuid: cmd9ojkbi000q02ih83pb5t04
slug: hello-node-kubernetes-gsp005
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762589876988/1595fc0f-dd1f-446f-82e2-f0d704713efa.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1762589899489/8b439432-79f1-44da-b94a-e88cf64fd502.png
tags: nodejs, kubernetes, hello-node-kubernetes-gsp005, gsp005, node-kubernetes

---

## Overview

The goal of this hands-on lab is for you to turn code that you have developed into a replicated application running on [Kubernetes](http://kubernetes.io/), which is running on [Kubernetes Engine](https://cloud.google.com/container-engine/). For this lab the code will be a simple Hello World node.js app.

Here's a diagram of the various parts in play in this lab, to help you understand how the pieces fit together with one another. Use this as a reference as you progress through the lab; it should all make sense by the time you get to the end (but feel free to ignore this for now).

![Kubernetes component flow diagram](https://cdn.qwiklabs.com/ZB%2FLTu%2FfOBuu7svaY0%2Fier%2FSvbJdfF3Lrb%2F5woXeecI%3D align="left")

Kubernetes is an open source project (available on [kubernetes.io](http://kubernetes.io/)) which can run on many different environments, from laptops to high-availability multi-node clusters; from public clouds to on-premise deployments; from virtual machines to bare metal.

For the purpose of this lab, using a managed environment such as Kubernetes Engine (a Google-hosted version of Kubernetes running on Compute Engine) will allow you to focus more on experiencing Kubernetes rather than setting up the underlying infrastructure.

### What you'll learn

* Create a Node.js server.
    
* Create a Docker container image.
    
* Create a container cluster.
    
* Create a Kubernetes pod.
    
* Scale up your services.
    

### Prerequisites

* Familiarity with standard Linux text editors such as `vim`, `emacs`, or `nano` will be helpful.
    

Students are to type the commands themselves, to help encourage learning of the core concepts. Many labs will include a code block that contains the required commands. You can easily copy and paste the commands from the code block into the appropriate places during the lab.

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
    student-03-d9dead68b660@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    vyJpF8vxnTXf
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-70fa585adb86`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-70fa585adb86
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
ACCOUNT: student-03-d9dead68b660@qwiklabs.net

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
project = qwiklabs-gcp-04-70fa585adb86
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Create your Node.js application

1.Using Cloud Shell, write a simple Node.js server that you'll deploy to Kubernetes Engine:

```apache
vi server.js
```

2. Start the editor:
    

```apache
i
```

3. Add this content to the file:
    

```apache
var http = require('http');
var handleRequest = function(request, response) {
  response.writeHead(200);
  response.end("Hello World!");
}
var www = http.createServer(handleRequest);
www.listen(8080);
```

**Note:** `vi` is used here, but `nano` and `emacs` are also available in Cloud Shell. You can also use the Web-editor feature of CloudShell as described in the [How Cloud Shell works guide](https://cloud.google.com/shell/docs/features#web_editor).

4. Save the `server.js` file by pressing **Esc** then:
    

```apache
:wq
```

5. Since Cloud Shell has the `node` executable installed, run this command to start the node server (the command produces no output):
    

```apache
node server.js
```

6. Use the built-in [Web preview](https://cloud.google.com/cloud-shell/docs/features#web_preview) feature of Cloud Shell to open a new browser tab and proxy a request to the instance you just started on port `8080`.
    

![Preview on port 8080 highlihgted in the expanded Web preview menu](https://cdn.qwiklabs.com/YdfcYS8qr%2B%2FvINwQ2e4EocXEPG7hkJYqE%2B8vI8EWECM%3D align="left")

A new browser tab will open to display your results:

![Result page with the message: Hello World!](https://cdn.qwiklabs.com/Si2q8aZMVmxlt1eZELd271lVh9W24mbVd5YnZ8iS37g%3D align="left")

7. Before continuing, return to Cloud Shell and type CTRL+C to stop the running node server.
    

Next you will package this application in a Docker container.

## Task 2. Create a Docker container image

1. Next, create a `Dockerfile` that describes the image you want to build. Docker container images can extend from other existing images, so for this image, we'll extend from an existing Node image:
    

```apache
vi Dockerfile
```

2. Start the editor:
    

```apache
i
```

3. Add this content:
    

```apache
FROM node:6.9.2
EXPOSE 8080
COPY server.js .
CMD ["node", "server.js"]
```

This "recipe" for the Docker image will:

* Start from the `node` image found on the Docker hub.
    
* Expose port `8080`.
    
* Copy your `server.js` file to the image.
    
* Start the node server as we previously did manually.
    

4. Save this `Dockerfile` by pressing ESC, then type:
    

```apache
:wq
```

5. Build the image with the following:
    

```apache
docker build -t hello-node:v1 .
```

It'll take some time to download and extract everything, but you can see the progress bars as the image builds.

Once complete, test the image locally by running a Docker container as a daemon on port 8080 from your newly-created container image.

6. Run the Docker container with this command:
    

```apache
docker run -d -p 8080:8080 hello-node:v1
```

Your output should look something like this:

```apache
325301e6b2bffd1d0049c621866831316d653c0b25a496d04ce0ec6854cb7998
```

7. To see your results, use the web preview feature of Cloud Shell. Alternatively use `curl` from your Cloud Shell prompt:
    

```apache
curl http://localhost:8080
```

This is the output you should see:

```apache
Hello World!
```

**Note:** Full documentation for the `docker run` command can be found in the [Docker run reference](https://docs.docker.com/engine/reference/run/).

Next, stop the running container.

1. Find your Docker container ID by running:
    

```apache
docker ps
```

Your output you should look like this:

```apache
CONTAINER ID        IMAGE                              COMMAND
2c66d0efcbd4        hello-node:v1    "/bin/sh -c 'node
```

2. Stop the container by running the following, replacing the `[CONTAINER ID]` with the value provided from the previous step:
    

```apache
docker stop [CONTAINER ID]
```

Your console output should resemble the following (your container ID):

```apache
2c66d0efcbd4
```

Now that the image is working as intended, push it to the [Google Artifact Registry](https://cloud.google.com/artifact-registry/), a private repository for your Docker images, accessible from your Google Cloud projects.

1. First you need to create a repository in Artifact Registry. Let's call it `my-docker-repo`. Run the following command:
    

```apache
gcloud artifacts repositories create my-docker-repo \
    --repository-format=docker \
    --location=us-west1 \
    --project=qwiklabs-gcp-04-70fa585adb86
```

2. Now run the following command to configure docker authentication.
    

```apache
gcloud auth configure-docker
```

If Prompted, Do you want to continue (Y/n)?. Enter **Y**.

3. To tag your image with the repository name, run this command, replacing `PROJECT_ID` with your Project ID, found in the Console or the **Lab Details** section of the lab:
    

```apache
docker tag hello-node:v1 us-west1-docker.pkg.dev/qwiklabs-gcp-04-70fa585adb86/my-docker-repo/hello-node:v1
```

4. And push your container image to the repository by running the following command:
    

```apache
docker push us-west1-docker.pkg.dev/qwiklabs-gcp-04-70fa585adb86/my-docker-repo/hello-node:v1
```

The initial push may take a few minutes to complete. You'll see the progress bars as it builds.

```apache
The push refers to a repository [pkg.dev/qwiklabs-gcp-6h281a111f098/hello-node]
ba6ca48af64e: Pushed
381c97ba7dc3: Pushed
604c78617f34: Pushed
fa18e5ffd316: Pushed
0a5e2b2ddeaa: Pushed
53c779688d06: Pushed
60a0858edcd5: Pushed
b6ca02dfe5e6: Pushed
v1: digest: sha256:8a9349a355c8e06a48a1e8906652b9259bba6d594097f115060acca8e3e941a2 size: 2002
```

3. The container image will be listed in your Console. Click **Navigation menu &gt; Artifact Registry**.
    

Now you have a project-wide Docker image available which Kubernetes can access and orchestrate.

**Note:** We used the recommended way of working with Artifact Registry, which is specific about which region to use. To learn more, refer to [Pushing and pulling from Artifact Registry](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling).

## Task 3. Create your cluster

Now you're ready to create your Kubernetes Engine cluster. A cluster consists of a Kubernetes master API server hosted by Google and a set of worker nodes. The worker nodes are Compute Engine virtual machines.

1. Make sure you have set your project using `gcloud` (replace `PROJECT_ID` with your Project ID, found in the console and in the **Lab Details** section of the lab):
    

```apache
gcloud config set project PROJECT_ID
```

2. Create a cluster with two [e2-medium](https://cloud.google.com/compute/docs/machine-types) nodes (this will take a few minutes to complete):
    

```apache
gcloud container clusters create hello-world \
                --num-nodes 2 \
                --machine-type e2-medium \
                --zone "us-west1-a"
```

You can safely ignore warnings that come up when the cluster builds.

The console output should look like this:

```apache
Creating cluster hello-world...done.
Created [https://container.googleapis.com/v1/projects/PROJECT_ID/zones/"us-west1-a"/clusters/hello-world].
kubeconfig entry generated for hello-world.
NAME         ZONE           MASTER_VERSION  MASTER_IP       MACHINE_TYPE   STATUS
hello-world  "us-west1-a"  1.5.7           146.148.46.124  e2-medium  RUNNING
```

Alternatively, you can create this cluster through the Console by opening the Navigation menu and selecting **Kubernetes Engine &gt; Kubernetes clusters &gt; Create**.

**Note:** It is recommended to create the cluster in the same zone as the storage bucket used by the artifact registry (see previous step).

If you select **Navigation menu &gt; Kubernetes Engine**, you'll see that you have a fully-functioning Kubernetes cluster powered by Kubernetes Engine.

It's time to deploy your own containerized application to the Kubernetes cluster! From now on you'll use the `kubectl` command line (already set up in your Cloud Shell environment).

Click **Check my progress** below to check your lab progress.

Create your cluster.

## Task 4. Create your pod

A Kubernetes **pod** is a group of containers tied together for administration and networking purposes. It can contain single or multiple containers. Here you'll use one container built with your Node.js image stored in your private artifact registry. It will serve content on port 8080.

1. Create a pod with the `kubectl run` command (replace `PROJECT_ID` with your Project ID, found in the console and in the **Connection Details** section of the lab):
    

```apache
kubectl create deployment hello-node \
    --image=us-west1-docker.pkg.dev/PROJECT_ID/my-docker-repo/hello-node:v1
```

**Output:**

```apache
deployment.apps/hello-node created
```

As you can see, you've created a **deployment** object. Deployments are the recommended way to create and scale pods. Here, a new deployment manages a single pod replica running the `hello-node:v1` image.

2. To view the deployment, run:
    

```apache
kubectl get deployments
```

**Output:**

```apache
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hello-node   1/1     1            1           1m36s
```

3. To view the pod created by the deployment, run:
    

```apache
kubectl get pods
```

**Output:**

```apache
NAME                         READY     STATUS    RESTARTS   AGE
hello-node-714049816-ztzrb   1/1       Running   0          6m
```

Now is a good time to go through some interesting `kubectl` commands. None of these will change the state of the cluster. To view the full reference documentation, refer to [Command line tool (kubectl)](https://cloud.google.com/container-engine/docs/kubectl/):

```apache
kubectl cluster-info
```

```apache
kubectl config view
```

And for troubleshooting :

```apache
kubectl get events
```

```apache
kubectl logs <pod-name>
```

You now need to make your pod accessible to the outside world.

Click **Check my progress** below to check your lab progress.

Create your pod

## Task 5. Allow external traffic

By default, the pod is only accessible by its internal IP within the cluster. In order to make the `hello-node` container accessible from outside the Kubernetes virtual network, you have to expose the pod as a Kubernetes **service**.

1. From Cloud Shell you can expose the pod to the public internet with the `kubectl expose` command combined with the `--type="LoadBalancer"` flag. This flag is required for the creation of an externally accessible IP:
    

```apache
kubectl expose deployment hello-node --type="LoadBalancer" --port=8080
```

**Output:**

```apache
service/hello-node exposed
```

The flag used in this command specifies that it is using the load-balancer provided by the underlying infrastructure (in this case the [Compute Engine load balancer](https://cloud.google.com/compute/docs/load-balancing/)). Note that you expose the deployment, and not the pod, directly. This will cause the resulting service to load balance traffic across all pods managed by the deployment (in this case only 1 pod, but you will add more replicas later).

The Kubernetes master creates the load balancer and related Compute Engine forwarding rules, target pools, and firewall rules to make the service fully accessible from outside of Google Cloud.

2. To find the publicly-accessible IP address of the service, request `kubectl` to list all the cluster services:
    

```apache
kubectl get services
```

This is the output you should see:

```apache
NAME         CLUSTER-IP     EXTERNAL-IP      PORT(S)    AGE
hello-node   10.3.250.149   104.154.90.147   8080/TCP   1m
kubernetes   10.3.240.1     < none >   443/TCP    5m
```

There are 2 IP addresses listed for your hello-node service, both serving port 8080. The `CLUSTER-IP` is the internal IP that is only visible inside your cloud virtual network; the `EXTERNAL-IP` is the external load-balanced IP.

**Note:** The `EXTERNAL-IP` may take several minutes to become available and visible. If the `EXTERNAL-IP` is missing, wait a few minutes and run the command again.

3. You should now be able to reach the service by pointing your browser to this address: `http://<EXTERNAL_IP>:8080`
    

![Hello World! page](https://cdn.qwiklabs.com/C36gw9A9wyqza3PveBYBCsMggISATH80A18fqFBck7U%3D align="left")

At this point you've gained several features from moving to containers and Kubernetes - you do not need to specify on which host to run your workload and you also benefit from service monitoring and restart. Now see what else can be gained from your new Kubernetes infrastructure.

Click **Check my progress** below to check your lab progress.

Create a Kubernetes Service

## Task 6. Scale up your service

One of the powerful features offered by Kubernetes is how easy it is to scale your application. Suppose you suddenly need more capacity. You can tell the replication controller to manage a new number of replicas for your pod.

1. Set the number of replicas for your pod:
    

```apache
kubectl scale deployment hello-node --replicas=4
```

**Output:**

```apache
deployment.extensions/hello-node scaled
```

2. Request a description of the updated deployment:
    

```apache
kubectl get deployment
```

**Output:**

```apache
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hello-node   4/4     4            4           16m
```

Re-run the above command until you see all 4 replicas created.

3. List all the pods:
    

```apache
kubectl get pods
```

This is the output you should see:

```apache
NAME                         READY     STATUS    RESTARTS   AGE
hello-node-714049816-g4azy   1/1       Running   0          1m
hello-node-714049816-rk0u6   1/1       Running   0          1m
hello-node-714049816-sh812   1/1       Running   0          1m
hello-node-714049816-ztzrb   1/1       Running   0          16m
```

A **declarative approach** is being used here. Rather than starting or stopping new instances, you declare how many instances should be running at all times. Kubernetes reconciliation loops make sure that reality matches what you requested and takes action if needed.

Here's a diagram summarizing the state of your Kubernetes cluster:

![Kubernetes Cluster flow diagram](https://cdn.qwiklabs.com/xcK5q7mZsGBWS%2BPbytdmF0W%2BdsZxvNXdOIEPBXX13X4%3D align="left")

Click **Check my progress** below to check your lab progress.

Scale up your service

## Task 7. Roll out an upgrade to your service

At some point the application that you've deployed to production will require bug fixes or additional features. Kubernetes helps you deploy a new version to production without impacting your users.

1. First, modify the application by opening `server.js`:
    

```apache
vi server.js
```

```apache
i
```

2. Then update the response message:
    

```apache
response.end("Hello Kubernetes World!");
```

3. Save the `server.js` file by pressing **Esc** then:
    

```apache
:wq
```

Now you can build and publish a new container image to the registry with an incremented tag (`v2` in this case).

4. Run the following commands, replacing `PROJECT_ID` with your lab project ID:
    

```apache
docker build -t hello-node:v2 .
```

```apache
docker tag hello-node:v2 {{{ project_0.default_region | YOUR_REGION }}}-docker.pkg.dev/{{{ project_0.project_id | YOUR_PROJECT_ID }}}/my-docker-repo/hello-node:v2
```

```apache
docker push {{{ project_0.default_region | YOUR_REGION }}}-docker.pkg.dev/{{{ project_0.project_id | YOUR_PROJECT_ID }}}/my-docker-repo/hello-node:v2
```

**Note:** Building and pushing this updated image should be quicker since caching is being taken advantage of.

Kubernetes will smoothly update your replication controller to the new version of the application. In order to change the image label for your running container, you will edit the existing `hello-node deployment` and change the image from `pkg.dev/PROJECT_ID/hello-node:v1` to `pkg.dev/PROJECT_ID/hello-node:v2`.

1. To do this, use the `kubectl edit` command:
    

```apache
kubectl edit deployment hello-node
```

It opens a text editor displaying the full deployment yaml configuration. It isn't necessary to understand the full yaml config right now, just understand that by updating the `spec.template.spec.containers.image` field in the config you are telling the deployment to update the pods with the new image.

2. Look for `Spec` &gt; `containers` &gt; `image` and change the version number from **v1** to **v2**:
    

```apache
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  annotations:
    deployment.kubernetes.io/revision: "1"
  creationTimestamp: 2016-03-24T17:55:28Z
  generation: 3
  labels:
    run: hello-node
  name: hello-node
  namespace: default
  resourceVersion: "151017"
  selfLink: /apis/extensions/v1beta1/namespaces/default/deployments/hello-node
  uid: 981fe302-f1e9-11e5-9a78-42010af00005
spec:
  replicas: 4
  selector:
    matchLabels:
      run: hello-node
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      creationTimestamp: null
      labels:
        run: hello-node
    spec:
      containers:
      - image: pkg.dev/PROJECT_ID/hello-node:v1 ## Update this line ##
        imagePullPolicy: IfNotPresent
        name: hello-node
        ports:
        - containerPort: 8080
          protocol: TCP
        resources: {}
        terminationMessagePath: /dev/termination-log
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      securityContext: {}
      terminationGracePeriodSeconds: 30
```

3. After making the change, save and close this file: Press ESC, then:
    

```apache
:wq
```

This is the output you should see:

```apache
deployment.extensions/hello-node edited
```

4. Run the following to update the deployment with the new image:
    

```apache
kubectl get deployments
```

New pods will be created with the new image and the old pods will be deleted.

This is the output you should see (you may need to rerun the above command to see the following):

```apache
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hello-node   4/4     4            4           1h
```

While this is happening, the users of your services shouldn't see any interruption. After a little while they'll start accessing the new version of your application. You can find more details on rolling updates in the [Performing a Rolling Update documentation](https://cloud.google.com/container-engine/docs/rolling-updates).

Hopefully with these deployment, scaling, and updated features, once you've set up your Kubernetes Engine cluster, you'll agree that Kubernetes will help you focus on the application rather than the infrastructure.

## ConOverview

The goal of this hands-on lab is for you to turn code that you have developed into a replicated application running on [Kubernetes](http://kubernetes.io/), which is running on [Kubernetes Engine](https://cloud.google.com/container-engine/). For this lab the code will be a simple Hello World node.js app.

Here's a diagram of the various parts in play in this lab, to help you understand how the pieces fit together with one another. Use this as a reference as you progress through the lab; it should all make sense by the time you get to the end (but feel free to ignore this for now).

![Kubernetes component flow diagram](https://cdn.qwiklabs.com/ZB%2FLTu%2FfOBuu7svaY0%2Fier%2FSvbJdfF3Lrb%2F5woXeecI%3D align="left")

Kubernetes is an open source project (available on [kubernetes.io](http://kubernetes.io/)) which can run on many different environments, from laptops to high-availability multi-node clusters; from public clouds to on-premise deployments; from virtual machines to bare metal.

For the purpose of this lab, using a managed environment such as Kubernetes Engine (a Google-hosted version of Kubernetes running on Compute Engine) will allow you to focus more on experiencing Kubernetes rather than setting up the underlying infrastructure.

### What you'll learn

* Create a Node.js server.
    
* Create a Docker container image.
    
* Create a container cluster.
    
* Create a Kubernetes pod.
    
* Scale up your services.
    

### Prerequisites

* Familiarity with standard Linux text editors such as `vim`, `emacs`, or `nano` will be helpful.
    

Students are to type the commands themselves, to help encourage learning of the core concepts. Many labs will include a code block that contains the required commands. You can easily copy and paste the commands from the code block into the appropriate places during the lab.

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
    student-03-d9dead68b660@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    vyJpF8vxnTXf
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-70fa585adb86`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-70fa585adb86
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
ACCOUNT: student-03-d9dead68b660@qwiklabs.net

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
project = qwiklabs-gcp-04-70fa585adb86
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Create your Node.js application

1.Using Cloud Shell, write a simple Node.js server that you'll deploy to Kubernetes Engine:

```apache
vi server.js
```

2. Start the editor:
    

```apache
i
```

3. Add this content to the file:
    

```apache
var http = require('http');
var handleRequest = function(request, response) {
  response.writeHead(200);
  response.end("Hello World!");
}
var www = http.createServer(handleRequest);
www.listen(8080);
```

**Note:** `vi` is used here, but `nano` and `emacs` are also available in Cloud Shell. You can also use the Web-editor feature of CloudShell as described in the [How Cloud Shell works guide](https://cloud.google.com/shell/docs/features#web_editor).

4. Save the `server.js` file by pressing **Esc** then:
    

```apache
:wq
```

5. Since Cloud Shell has the `node` executable installed, run this command to start the node server (the command produces no output):
    

```apache
node server.js
```

6. Use the built-in [Web preview](https://cloud.google.com/cloud-shell/docs/features#web_preview) feature of Cloud Shell to open a new browser tab and proxy a request to the instance you just started on port `8080`.
    

![Preview on port 8080 highlihgted in the expanded Web preview menu](https://cdn.qwiklabs.com/YdfcYS8qr%2B%2FvINwQ2e4EocXEPG7hkJYqE%2B8vI8EWECM%3D align="left")

A new browser tab will open to display your results:

![Result page with the message: Hello World!](https://cdn.qwiklabs.com/Si2q8aZMVmxlt1eZELd271lVh9W24mbVd5YnZ8iS37g%3D align="left")

7. Before continuing, return to Cloud Shell and type CTRL+C to stop the running node server.
    

Next you will package this application in a Docker container.

## Task 2. Create a Docker container image

1. Next, create a `Dockerfile` that describes the image you want to build. Docker container images can extend from other existing images, so for this image, we'll extend from an existing Node image:
    

```apache
vi Dockerfile
```

2. Start the editor:
    

```apache
i
```

3. Add this content:
    

```apache
FROM node:6.9.2
EXPOSE 8080
COPY server.js .
CMD ["node", "server.js"]
```

This "recipe" for the Docker image will:

* Start from the `node` image found on the Docker hub.
    
* Expose port `8080`.
    
* Copy your `server.js` file to the image.
    
* Start the node server as we previously did manually.
    

4. Save this `Dockerfile` by pressing ESC, then type:
    

```apache
:wq
```

5. Build the image with the following:
    

```apache
docker build -t hello-node:v1 .
```

It'll take some time to download and extract everything, but you can see the progress bars as the image builds.

Once complete, test the image locally by running a Docker container as a daemon on port 8080 from your newly-created container image.

6. Run the Docker container with this command:
    

```apache
docker run -d -p 8080:8080 hello-node:v1
```

Your output should look something like this:

```apache
325301e6b2bffd1d0049c621866831316d653c0b25a496d04ce0ec6854cb7998
```

7. To see your results, use the web preview feature of Cloud Shell. Alternatively use `curl` from your Cloud Shell prompt:
    

```apache
curl http://localhost:8080
```

This is the output you should see:

```apache
Hello World!
```

**Note:** Full documentation for the `docker run` command can be found in the [Docker run reference](https://docs.docker.com/engine/reference/run/).

Next, stop the running container.

1. Find your Docker container ID by running:
    

```apache
docker ps
```

Your output you should look like this:

```apache
CONTAINER ID        IMAGE                              COMMAND
2c66d0efcbd4        hello-node:v1    "/bin/sh -c 'node
```

2. Stop the container by running the following, replacing the `[CONTAINER ID]` with the value provided from the previous step:
    

```apache
docker stop [CONTAINER ID]
```

Your console output should resemble the following (your container ID):

```apache
2c66d0efcbd4
```

Now that the image is working as intended, push it to the [Google Artifact Registry](https://cloud.google.com/artifact-registry/), a private repository for your Docker images, accessible from your Google Cloud projects.

1. First you need to create a repository in Artifact Registry. Let's call it `my-docker-repo`. Run the following command:
    

```apache
gcloud artifacts repositories create my-docker-repo \
    --repository-format=docker \
    --location=us-west1 \
    --project=qwiklabs-gcp-04-70fa585adb86
```

2. Now run the following command to configure docker authentication.
    

```apache
gcloud auth configure-docker
```

If Prompted, Do you want to continue (Y/n)?. Enter **Y**.

3. To tag your image with the repository name, run this command, replacing `PROJECT_ID` with your Project ID, found in the Console or the **Lab Details** section of the lab:
    

```apache
docker tag hello-node:v1 us-west1-docker.pkg.dev/qwiklabs-gcp-04-70fa585adb86/my-docker-repo/hello-node:v1
```

4. And push your container image to the repository by running the following command:
    

```apache
docker push us-west1-docker.pkg.dev/qwiklabs-gcp-04-70fa585adb86/my-docker-repo/hello-node:v1
```

The initial push may take a few minutes to complete. You'll see the progress bars as it builds.

```apache
The push refers to a repository [pkg.dev/qwiklabs-gcp-6h281a111f098/hello-node]
ba6ca48af64e: Pushed
381c97ba7dc3: Pushed
604c78617f34: Pushed
fa18e5ffd316: Pushed
0a5e2b2ddeaa: Pushed
53c779688d06: Pushed
60a0858edcd5: Pushed
b6ca02dfe5e6: Pushed
v1: digest: sha256:8a9349a355c8e06a48a1e8906652b9259bba6d594097f115060acca8e3e941a2 size: 2002
```

3. The container image will be listed in your Console. Click **Navigation menu &gt; Artifact Registry**.
    

Now you have a project-wide Docker image available which Kubernetes can access and orchestrate.

**Note:** We used the recommended way of working with Artifact Registry, which is specific about which region to use. To learn more, refer to [Pushing and pulling from Artifact Registry](https://cloud.google.com/artifact-registry/docs/docker/pushing-and-pulling).

## Task 3. Create your cluster

Now you're ready to create your Kubernetes Engine cluster. A cluster consists of a Kubernetes master API server hosted by Google and a set of worker nodes. The worker nodes are Compute Engine virtual machines.

1. Make sure you have set your project using `gcloud` (replace `PROJECT_ID` with your Project ID, found in the console and in the **Lab Details** section of the lab):
    

```apache
gcloud config set project PROJECT_ID
```

2. Create a cluster with two [e2-medium](https://cloud.google.com/compute/docs/machine-types) nodes (this will take a few minutes to complete):
    

```apache
gcloud container clusters create hello-world \
                --num-nodes 2 \
                --machine-type e2-medium \
                --zone "us-west1-a"
```

You can safely ignore warnings that come up when the cluster builds.

The console output should look like this:

```apache
Creating cluster hello-world...done.
Created [https://container.googleapis.com/v1/projects/PROJECT_ID/zones/"us-west1-a"/clusters/hello-world].
kubeconfig entry generated for hello-world.
NAME         ZONE           MASTER_VERSION  MASTER_IP       MACHINE_TYPE   STATUS
hello-world  "us-west1-a"  1.5.7           146.148.46.124  e2-medium  RUNNING
```

Alternatively, you can create this cluster through the Console by opening the Navigation menu and selecting **Kubernetes Engine &gt; Kubernetes clusters &gt; Create**.

**Note:** It is recommended to create the cluster in the same zone as the storage bucket used by the artifact registry (see previous step).

If you select **Navigation menu &gt; Kubernetes Engine**, you'll see that you have a fully-functioning Kubernetes cluster powered by Kubernetes Engine.

It's time to deploy your own containerized application to the Kubernetes cluster! From now on you'll use the `kubectl` command line (already set up in your Cloud Shell environment).

Click **Check my progress** below to check your lab progress.

Create your cluster.

## Task 4. Create your pod

A Kubernetes **pod** is a group of containers tied together for administration and networking purposes. It can contain single or multiple containers. Here you'll use one container built with your Node.js image stored in your private artifact registry. It will serve content on port 8080.

1. Create a pod with the `kubectl run` command (replace `PROJECT_ID` with your Project ID, found in the console and in the **Connection Details** section of the lab):
    

```apache
kubectl create deployment hello-node \
    --image=us-west1-docker.pkg.dev/PROJECT_ID/my-docker-repo/hello-node:v1
```

**Output:**

```apache
deployment.apps/hello-node created
```

As you can see, you've created a **deployment** object. Deployments are the recommended way to create and scale pods. Here, a new deployment manages a single pod replica running the `hello-node:v1` image.

2. To view the deployment, run:
    

```apache
kubectl get deployments
```

**Output:**

```apache
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hello-node   1/1     1            1           1m36s
```

3. To view the pod created by the deployment, run:
    

```apache
kubectl get pods
```

**Output:**

```apache
NAME                         READY     STATUS    RESTARTS   AGE
hello-node-714049816-ztzrb   1/1       Running   0          6m
```

Now is a good time to go through some interesting `kubectl` commands. None of these will change the state of the cluster. To view the full reference documentation, refer to [Command line tool (kubectl)](https://cloud.google.com/container-engine/docs/kubectl/):

```apache
kubectl cluster-info
```

```apache
kubectl config view
```

And for troubleshooting :

```apache
kubectl get events
```

```apache
kubectl logs <pod-name>
```

You now need to make your pod accessible to the outside world.

Click **Check my progress** below to check your lab progress.

Create your pod

## Task 5. Allow external traffic

By default, the pod is only accessible by its internal IP within the cluster. In order to make the `hello-node` container accessible from outside the Kubernetes virtual network, you have to expose the pod as a Kubernetes **service**.

1. From Cloud Shell you can expose the pod to the public internet with the `kubectl expose` command combined with the `--type="LoadBalancer"` flag. This flag is required for the creation of an externally accessible IP:
    

```apache
kubectl expose deployment hello-node --type="LoadBalancer" --port=8080
```

**Output:**

```apache
service/hello-node exposed
```

The flag used in this command specifies that it is using the load-balancer provided by the underlying infrastructure (in this case the [Compute Engine load balancer](https://cloud.google.com/compute/docs/load-balancing/)). Note that you expose the deployment, and not the pod, directly. This will cause the resulting service to load balance traffic across all pods managed by the deployment (in this case only 1 pod, but you will add more replicas later).

The Kubernetes master creates the load balancer and related Compute Engine forwarding rules, target pools, and firewall rules to make the service fully accessible from outside of Google Cloud.

2. To find the publicly-accessible IP address of the service, request `kubectl` to list all the cluster services:
    

```apache
kubectl get services
```

This is the output you should see:

```apache
NAME         CLUSTER-IP     EXTERNAL-IP      PORT(S)    AGE
hello-node   10.3.250.149   104.154.90.147   8080/TCP   1m
kubernetes   10.3.240.1     < none >   443/TCP    5m
```

There are 2 IP addresses listed for your hello-node service, both serving port 8080. The `CLUSTER-IP` is the internal IP that is only visible inside your cloud virtual network; the `EXTERNAL-IP` is the external load-balanced IP.

**Note:** The `EXTERNAL-IP` may take several minutes to become available and visible. If the `EXTERNAL-IP` is missing, wait a few minutes and run the command again.

3. You should now be able to reach the service by pointing your browser to this address: `http://<EXTERNAL_IP>:8080`
    

![Hello World! page](https://cdn.qwiklabs.com/C36gw9A9wyqza3PveBYBCsMggISATH80A18fqFBck7U%3D align="left")

At this point you've gained several features from moving to containers and Kubernetes - you do not need to specify on which host to run your workload and you also benefit from service monitoring and restart. Now see what else can be gained from your new Kubernetes infrastructure.

Click **Check my progress** below to check your lab progress.

Create a Kubernetes Service

## Task 6. Scale up your service

One of the powerful features offered by Kubernetes is how easy it is to scale your application. Suppose you suddenly need more capacity. You can tell the replication controller to manage a new number of replicas for your pod.

1. Set the number of replicas for your pod:
    

```apache
kubectl scale deployment hello-node --replicas=4
```

**Output:**

```apache
deployment.extensions/hello-node scaled
```

2. Request a description of the updated deployment:
    

```apache
kubectl get deployment
```

**Output:**

```apache
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hello-node   4/4     4            4           16m
```

Re-run the above command until you see all 4 replicas created.

3. List all the pods:
    

```apache
kubectl get pods
```

This is the output you should see:

```apache
NAME                         READY     STATUS    RESTARTS   AGE
hello-node-714049816-g4azy   1/1       Running   0          1m
hello-node-714049816-rk0u6   1/1       Running   0          1m
hello-node-714049816-sh812   1/1       Running   0          1m
hello-node-714049816-ztzrb   1/1       Running   0          16m
```

A **declarative approach** is being used here. Rather than starting or stopping new instances, you declare how many instances should be running at all times. Kubernetes reconciliation loops make sure that reality matches what you requested and takes action if needed.

Here's a diagram summarizing the state of your Kubernetes cluster:

![Kubernetes Cluster flow diagram](https://cdn.qwiklabs.com/xcK5q7mZsGBWS%2BPbytdmF0W%2BdsZxvNXdOIEPBXX13X4%3D align="left")

Click **Check my progress** below to check your lab progress.

Scale up your service

## Task 7. Roll out an upgrade to your service

At some point the application that you've deployed to production will require bug fixes or additional features. Kubernetes helps you deploy a new version to production without impacting your users.

1. First, modify the application by opening `server.js`:
    

```apache
vi server.js
```

```apache
i
```

2. Then update the response message:
    

```apache
response.end("Hello Kubernetes World!");
```

3. Save the `server.js` file by pressing **Esc** then:
    

```apache
:wq
```

Now you can build and publish a new container image to the registry with an incremented tag (`v2` in this case).

4. Run the following commands, replacing `PROJECT_ID` with your lab project ID:
    

```apache
docker build -t hello-node:v2 .
```

```apache
docker tag hello-node:v2 {{{ project_0.default_region | YOUR_REGION }}}-docker.pkg.dev/{{{ project_0.project_id | YOUR_PROJECT_ID }}}/my-docker-repo/hello-node:v2
```

```apache
docker push {{{ project_0.default_region | YOUR_REGION }}}-docker.pkg.dev/{{{ project_0.project_id | YOUR_PROJECT_ID }}}/my-docker-repo/hello-node:v2
```

**Note:** Building and pushing this updated image should be quicker since caching is being taken advantage of.

Kubernetes will smoothly update your replication controller to the new version of the application. In order to change the image label for your running container, you will edit the existing `hello-node deployment` and change the image from `pkg.dev/PROJECT_ID/hello-node:v1` to `pkg.dev/PROJECT_ID/hello-node:v2`.

1. To do this, use the `kubectl edit` command:
    

```apache
kubectl edit deployment hello-node
```

It opens a text editor displaying the full deployment yaml configuration. It isn't necessary to understand the full yaml config right now, just understand that by updating the `spec.template.spec.containers.image` field in the config you are telling the deployment to update the pods with the new image.

2. Look for `Spec` &gt; `containers` &gt; `image` and change the version number from **v1** to **v2**:
    

```apache
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  annotations:
    deployment.kubernetes.io/revision: "1"
  creationTimestamp: 2016-03-24T17:55:28Z
  generation: 3
  labels:
    run: hello-node
  name: hello-node
  namespace: default
  resourceVersion: "151017"
  selfLink: /apis/extensions/v1beta1/namespaces/default/deployments/hello-node
  uid: 981fe302-f1e9-11e5-9a78-42010af00005
spec:
  replicas: 4
  selector:
    matchLabels:
      run: hello-node
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
    type: RollingUpdate
  template:
    metadata:
      creationTimestamp: null
      labels:
        run: hello-node
    spec:
      containers:
      - image: pkg.dev/PROJECT_ID/hello-node:v1 ## Update this line ##
        imagePullPolicy: IfNotPresent
        name: hello-node
        ports:
        - containerPort: 8080
          protocol: TCP
        resources: {}
        terminationMessagePath: /dev/termination-log
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      securityContext: {}
      terminationGracePeriodSeconds: 30
```

3. After making the change, save and close this file: Press ESC, then:
    

```apache
:wq
```

This is the output you should see:

```apache
deployment.extensions/hello-node edited
```

4. Run the following to update the deployment with the new image:
    

```apache
kubectl get deployments
```

New pods will be created with the new image and the old pods will be deleted.

This is the output you should see (you may need to rerun the above command to see the following):

```apache
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hello-node   4/4     4            4           1h
```

While this is happening, the users of your services shouldn't see any interruption. After a little while they'll start accessing the new version of your application. You can find more details on rolling updates in the [Performing a Rolling Update documentation](https://cloud.google.com/container-engine/docs/rolling-updates).

Hopefully with these deployment, scaling, and updated features, once you've set up your Kubernetes Engine cluster, you'll agree that Kubernetes will help you focus on the application rather than the infrastructure.

---

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP005/lab.sh
source lab.sh
```

---

### Manual

***Solution 1:*

%[https://youtu.be/pAH9HY0MFS0]

***Solution 2:*

%[https://youtu.be/x13IhTrwc3o]