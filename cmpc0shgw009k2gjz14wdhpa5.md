---
title: "Migrating a Monolithic Website to Microservices on Google Kubernetes Engine - GSP699"
seoTitle: "Migrating a Monolithic Website to Microservices on Google Kubernetes Engine - GSP699"
seoDescription: "Why migrate from a monolithic application to a microservices architecture? Breaking down an application into microservices has the following advantages, most of these stem from the fact that microservices are loosely coupled:"
datePublished: 2026-05-19T02:34:51.638Z
cuid: cmpc0shgw009k2gjz14wdhpa5
slug: migrating-a-monolithic-website-to-microservices-on-google-kubernetes-engine-gsp699
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/fe9474a0-d532-4132-aa4b-1247dea7750a.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/321fc959-754d-416c-a544-6b2b3bc9eb49.png
tags: migrating-a-monolithic-website-to-microservices-on-google-kubernetes-engine-gsp699, migrating-a-monolithic-website-to-microservices-on-google-kubernetes-engine, gsp699

---

## **Overview**

Why migrate from a monolithic application to a microservices architecture? Breaking down an application into microservices has the following advantages, most of these stem from the fact that microservices are loosely coupled:

*   The microservices can be independently tested and deployed. The smaller the unit of deployment, the easier the deployment.
    
*   They can be implemented in different languages and frameworks. For each microservice, you're free to choose the best technology for its particular use case.
    
*   They can be managed by different teams. The boundary between microservices makes it easier to dedicate a team to one or several microservices.
    
*   By moving to microservices, you loosen the dependencies between the teams. Each team has to care only about the APIs of the microservices they are dependent on. The team doesn't need to think about how those microservices are implemented, about their release cycles, and so on.
    
*   You can more easily design for failure. By having clear boundaries between services, it's easier to determine what to do if a service is down.
    

Some of the disadvantages when compared to monoliths are:

*   Because a microservice-based app is a network of different services that often interact in ways that are not obvious, the overall complexity of the system tends to grow.
    
*   Unlike the internals of a monolith, microservices communicate over a network. In some circumstances, this can be seen as a security concern. [Istio](https://cloud.google.com/istio/) solves this problem by automatically encrypting the traffic between microservices.
    
*   It can be hard to achieve the same level of performance as with a monolithic approach because of latencies between services.
    
*   The behavior of your system isn't caused by a single service, but by many of them and by their interactions. Because of this, understanding how your system behaves in production (its observability) is harder. Istio is a solution to this problem as well.
    

In this lab you will deploy an existing monolithic application to a Google Kubernetes Engine cluster, then break it down into microservices. Kubernetes is a platform to manage, host, scale, and deploy containers. Containers are a portable way of packaging and running code. They are well suited to the microservices pattern, where each microservice can run in its own container.

### Architecture diagram of microservices

Start by breaking the monolith into three microservices, one at a time. The microservices include, Orders, Products, and Frontend. Build a Docker image for each microservice using Cloud Build, then deploy and expose the microservices on Google Kubernetes Engine (GKE) with a Kubernetes service type LoadBalancer. You will do this for each service while simultaneously refactoring them out of the monolith. During the process you will have both the monolith and the microservices running until the very end when you are able to delete the monolith.

### What you'll learn

*   How to break down a Monolith to Microservices
    
*   How to create a Google Kubernetes Engine cluster
    
*   How to create a Docker image
    
*   How to deploy Docker images to Kubernetes
    

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
    student-04-30af3c8cf1d2@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    dZpzy2YJVJdY
    ```
    
    Copied!
    
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-9811e0d76904`. The output contains a line that declares the **Project\_ID** for this session:

```plaintext
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-9811e0d76904
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3.  (Optional) You can list the active account name with this command:
    

```plaintext
gcloud auth list
```

Copied!

4.  Click **Authorize**.
    

**Output:**

```plaintext
ACTIVE: *
ACCOUNT: student-04-30af3c8cf1d2@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5.  (Optional) You can list the project ID with this command:
    

```plaintext
gcloud config list project
```

Copied!

**Output:**

```plaintext
[core]
project = qwiklabs-gcp-02-9811e0d76904
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

Set the default zone and project configuration:

```plaintext
gcloud config set compute/zone us-east4-c
```

Copied!

## **Task 1. Clone the source repository**

You will use an existing monolithic application of an imaginary ecommerce website, with a simple welcome page, a products page and an order history page. We will just need to clone the source from our git repo, so we can focus on breaking it down into microservices and deploying to Google Kubernetes Engine (GKE).

*   Run the following commands to clone the git repo to your Cloud Shell instance and change to the appropriate directory. You will also install the NodeJS dependencies so you can test your monolith before deploying:
    

```plaintext
cd ~
git clone https://github.com/googlecodelabs/monolith-to-microservices.git
cd ~/monolith-to-microservices
./setup.sh
```

Copied!

It may take a few minutes for this script to run.

## **Task 2. Create a GKE cluster**

Now that you have your working developer environment, you need a Kubernetes cluster to deploy your monolith, and eventually the microservices, to! Before you can create a cluster, make sure the proper API's are enabled.

1.  Run the following command to enable the Containers API so you can use Google Kubernetes Engine:
    

```plaintext
gcloud services enable container.googleapis.com
```

Copied!

2.  Run the command below to create a GKE cluster named **fancy-cluster** with **3** nodes:
    

```plaintext
gcloud container clusters create fancy-cluster --num-nodes 3 --machine-type=e2-standard-4
```

Copied!

**Warning:** If you get an error about region/zone not being specified, please see the environment set up section to make sure you set the default compute zone.

It may take several minutes for the cluster to be created.

3.  Once the command has completed, run the following to see the cluster's three worker VM instances:
    

```plaintext
gcloud compute instances list
```

Copied!

Output:

```plaintext
NAME                                          ZONE        MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP    STATUS
gke-fancy-cluster-default-pool-ad92506d-1ng3  us-east4-c  e2-standard-4               10.150.0.7   XX.XX.XX.XX    RUNNING
gke-fancy-cluster-default-pool-ad92506d-4fvq  us-east4-c  e2-standard-4               10.150.0.5   XX.XX.XX.XX    RUNNING
gke-fancy-cluster-default-pool-ad92506d-4zs3  us-east4-c  e2-standard-4               10.150.0.6   XX.XX.XX.XX    RUNNING
```

You can also view your Kubernetes cluster and related information in the Cloud Console. From the **Navigation menu**, scroll down to **Kubernetes Engine** and click **Clusters**.

You should see your cluster named ***fancy-cluster***.

Congratulations! You have just created your first Kubernetes cluster!

Click *Check my progress* to verify the objective.

Create a GKE Cluster

## **Task 3. Deploy the existing monolith**

Since the focus of this lab is to break down a monolith into microservices, you need to get a monolith application up and running.

*   Run the following script to deploy a monolith application to your GKE cluster:
    

```plaintext
cd ~/monolith-to-microservices
./deploy-monolith.sh
```

Copied!

### Accessing the monolith

1.  To find the external IP address for the monolith application, run the following command:
    

```plaintext
kubectl get service monolith
```

Copied!

You should see output similar to the following:

```plaintext
NAME         CLUSTER-IP      EXTERNAL-IP     PORT(S)          AGE
monolith     10.3.251.122    203.0.113.0     80:30877/TCP     3d
```

2.  If your output lists the external IP as `<pending>` give it a minute and run the command again.
    
3.  Once you've determined the external IP address for your monolith, copy the IP address. Point your browser to this URL (such as [http://203.0.113.0](http://203.0.113.0)) to check if your monolith is accessible.
    

**Note:** Remember this IP address as you will continue to use it going forward. You can always find it again via this same command.

You should see the welcome page for the monolithic website. The welcome page is a static page that will be served up by the Frontend microservice later on. You now have your monolith fully running on Kubernetes!

Click *Check my progress* to verify the objective.

Deploy Existing Monolith

## **Task 4. Migrate orders to a microservice**

Now that you have a monolith website running on GKE, start breaking each service into a microservice. Typically, a planning effort should take place to determine which services to break into smaller chunks, usually around specific parts of the application like business domain.

For this lab you will create an example and break out each service around the business domain: Orders, Products, and Frontend. The code has already been migrated for you so you can focus on building and deploying the services on Google Kubernetes Engine (GKE).

### Create Orders microservice

The first service to break out is the Orders service. Make use of the separate codebase provided and create a separate Docker container for this service.

#### **Create a Docker container with Cloud Build**

Since the codebase is already available, your first step will be to create a Docker container of your Order service using Cloud Build.

Normally this is done in a two step process that entails building a Docker container and pushing it to a registry to store the image for GKE to pull from. Cloud Build can be used to build the Docker container ***and*** put the image in the Artifact Registry with a single command!

Google Cloud Build will compress the files from the directory and move them to a Cloud Storage bucket. The build process will then take all the files from the bucket and use the Dockerfile to run the Docker build process. The `--tag` flag is specified with the host as [gcr.io](http://gcr.io) for the Docker image, the resulting Docker image will be pushed to the Artifact Registry.

1.  Run the following commands to build your Docker container and push it to the Artifact Registry:
    

```plaintext
cd ~/monolith-to-microservices/microservices/src/orders
gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/orders:1.0.0 .
```

2.  To view your build history, or watch the process in real time, in the console, search for **Cloud Build** then click on the **Cloud Build** result.
    
3.  On the **History** page you can see a list of all your builds; there should only be 1 that you just created. If you click on the build ID, you can see all the details for that build including the log output.
    
4.  From the build details page, to view the container image that was created, in the right section click the **Execution Details** tab and see Image.
    

#### **Deploy container to GKE**

Now that you have containerized the website and pushed the container to the Artifact Registry, it is time to deploy to Kubernetes!

Kubernetes represents applications as [Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod/), which are units that represent a container (or group of tightly-coupled containers). The Pod is the smallest deployable unit in Kubernetes. In this tutorial, each Pod contains only your microservices container.

To deploy and manage applications on a GKE cluster, you must communicate with the Kubernetes cluster management system. You typically do this by using the **kubectl** command-line tool from within Cloud Shell.

First, create a [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) resource. The Deployment manages multiple copies of your application, called replicas, and schedules them to run on the individual nodes in your cluster. In this case, the Deployment will be running only one pod of your application. Deployments ensure this by creating a [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/). The ReplicaSet is responsible for making sure the number of replicas specified are always running.

The `kubectl create deployment` command below causes Kubernetes to create a Deployment named **Orders** on your cluster with **1** replica.

*   Run the following command to deploy your application:
    

```plaintext
kubectl create deployment orders --image=gcr.io/${GOOGLE_CLOUD_PROJECT}/orders:1.0.0
```

Copied!

**Note:** As a best practice, using a YAML file is recommended to declare your change to the Kubernetes cluster (e.g. creating or modifying a deployment or service) and a source control system such as GitHub to store those changes. You can learn more about this from the [Kubernetes Deployments Documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).

#### **Verify the deployment**

*   To verify the Deployment was created successfully, run the following command:
    

```plaintext
kubectl get all
```

Copied!

It may take a few moments for the pod status to be Running.

Output:

```plaintext
NAME                            READY   STATUS    RESTARTS   AGE
pod/monolith-779c8d95f5-dxnzl   1/1     Running   0          15h
pod/orders-5bc6969d76-kdxkk     1/1     Running   0          21s
NAME                 TYPE           CLUSTER-IP      EXTERNAL-IP    PORT(S)        AGE
service/kubernetes   ClusterIP      10.39.240.1     <none>         443/TCP        19d
service/monolith     LoadBalancer   10.39.241.130   34.74.209.57   80:30412/TCP   15h
NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/monolith   1/1     1            1           15h
deployment.apps/orders     1/1     1            1           21s
NAME                                  DESIRED   CURRENT   READY   AGE
replicaset.apps/monolith-779c8d95f5   1         1         1       15h
replicaset.apps/orders-5bc6969d76     1         1         1       21s
</none>
```

You can see your Deployment which is current, the `replicaset` with the desired pod count of 1, and the pod which is running. Looks like everything was created successfully!

You can also view your Kubernetes deployments in the Cloud Console from the **Navigation menu**, go to **Kubernetes Engine** > **Workloads**.

#### **Expose GKE container**

You have deployed our application on GKE, but don't have a way of accessing it outside of the cluster. By default, the containers you run on GKE are not accessible from the Internet, because they do not have external IP addresses. You must explicitly expose your application to traffic from the Internet via a [Service](https://kubernetes.io/docs/concepts/services-networking/service/) resource. A Service provides networking and IP support to your application's Pods. GKE creates an external IP and a Load Balancer.

For purposes of this lab, the exposure of the service has been simplified. Typically, you would use an API gateway to secure your public endpoints.

When you deployed the Orders service, you exposed it on port 8081 internally via a Kubernetes deployment. In order to expose this service externally, you need to create a Kubernetes service of type `LoadBalancer` to route traffic from port 80 externally to internal port 8081.

*   Run the following command to expose your website to the Internet:
    

```plaintext
kubectl expose deployment orders --type=LoadBalancer --port 80 --target-port 8081
```

Copied!

#### **Accessing the service**

GKE assigns the external IP address to the Service resource, not the Deployment.

*   To find out the external IP that GKE provisioned for your application, inspect the Service with the `kubectl get service` command:
    

```plaintext
kubectl get service orders
```

Copied!

Output:

```plaintext
NAME         CLUSTER-IP      EXTERNAL-IP     PORT(S)          AGE
orders       10.3.251.122    203.0.113.0     80:30877/TCP     3s
```

Once you've determined the external IP address for your application, copy the IP address. Save it for the next step when you change your monolith to point to the new Orders service!

### Reconfigure the monolith

Since you removed the Orders service from the monolith, you will have to modify the monolith to point to the new external Orders microservice.

When breaking down a monolith, you are removing pieces of code from a single codebase to multiple microservices and deploying them separately. Since the microservices are running on a different server, you can no longer reference your service URLs as absolute paths - you need to route to the Order microservice server address. This will require some downtime to the monolith service to update the URL for each service that has been broken out. This should be accounted for when planning on moving your microservices and monolith to production during the microservices migration process.

You need to update your config file in the monolith to point to the new Orders microservices IP address.

1.  Use the `nano` editor to replace the local URL with the IP address of the Orders microservice:
    

```plaintext
cd ~/monolith-to-microservices/react-app
nano .env.monolith
```

2.  Replace the `REACT_APP_ORDERS_URL` to the new format while replacing with your Orders microservice IP address so it matches below:
    

```plaintext
REACT_APP_ORDERS_URL=http://<ORDERS_IP_ADDRESS>/api/orders
REACT_APP_PRODUCTS_URL=/service/products
```

3.  Press `CTRL+O`, press `ENTER`, then `CTRL+X` to save the file in the nano editor.
    
4.  Test the new microservice by navigating the URL you just set in the file. The webpage should return a JSON response from your Orders microservice.
    
5.  Next, rebuild the monolith frontend and repeat the build process to build the container for the monolith and redeploy to the GKE cluster:
    

```plaintext
npm run build:monolith
```

6.  Create Docker container with Cloud Build:
    

```plaintext
cd ~/monolith-to-microservices/monolith
gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:2.0.0 .
```

7.  Deploy container to GKE:
    

```plaintext
kubectl set image deployment/monolith monolith=gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:2.0.0
```

8.  Verify the application is now hitting the Orders microservice by going to the monolith application in your browser and navigating to the Orders page. All the order ID's should end in a suffix -MICROSERVICE as shown below:
    

![Orders table including columns for the order ID, date, total items, and cost. The format of the order Id is as follows: ORD-000001-MICROSERVICE ](https://cdn.qwiklabs.com/DWL9azSkCqehinTjdWrp%2BGp7flUg1IMVnlAeGV5luUA%3D align="center")

9.  Click *Check my progress* to verify the objective.
    

## **Task 5. Migrate Products to microservice**

### Create new Products microservice

Continue breaking out the services by migrating the Products service next. Follow the same process as before. Run the following commands to build a Docker container, deploy your container, and expose it via a Kubernetes service.

1.  Create Docker container with Cloud Build:
    

```plaintext
cd ~/monolith-to-microservices/microservices/src/products
gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/products:1.0.0 .
```

2.  Deploy container to GKE:
    

```plaintext
kubectl create deployment products --image=gcr.io/${GOOGLE_CLOUD_PROJECT}/products:1.0.0
```

3.  Expose the GKE container:
    

```plaintext
kubectl expose deployment products --type=LoadBalancer --port 80 --target-port 8082
```

4.  Find the public IP of the Products services the same way you did for the Orders service:
    

```plaintext
kubectl get service products
```

Output:

```plaintext
NAME         CLUSTER-IP      EXTERNAL-IP     PORT(S)          AGE
products     10.3.251.122    203.0.113.0     80:30877/TCP     3d
```

You will use the IP address in the next step when you reconfigure the monolith to point to your new Products microservice.

### Reconfigure the monolith

1.  Use the `nano` editor to replace the local URL with the IP address of the new Products microservices:
    

```plaintext
cd ~/monolith-to-microservices/react-app
nano .env.monolith
```

2.  Replace the `REACT_APP_PRODUCTS_URL` to the new format while replacing with your Product microservice IP address so it matches below:
    

```plaintext
REACT_APP_ORDERS_URL=http://<ORDERS_IP_ADDRESS>/api/orders
REACT_APP_PRODUCTS_URL=http://<PRODUCTS_IP_ADDRESS>/api/products
```

3.  Press `CTRL+O`, press `ENTER`, then `CTRL+X` to save the file.
    
4.  Test the new microservice by navigating the URL you just set in the file. The webpage should return a JSON response from the Products microservice.
    
5.  Next, rebuild the monolith frontend and repeat the build process to build the container for the monolith and redeploy to the GKE cluster. Run the following commands complete these steps:
    
6.  Rebuild monolith config files:
    

```plaintext
npm run build:monolith
```

7.  Create Docker container with Cloud Build:
    

```plaintext
cd ~/monolith-to-microservices/monolith
gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:3.0.0 .
```

8.  Deploy container to GKE:
    

```plaintext
kubectl set image deployment/monolith monolith=gcr.io/${GOOGLE_CLOUD_PROJECT}/monolith:3.0.0
```

9.  Verify your application is now hitting the new Products microservice by going to the monolith application in your browser and navigating to the Products page. All the product names should be prefixed by MS- as shown below:
    
10.  Verify your application is now hitting the new Products microservice by going to the monolith application in your browser and navigating to the Products page. All the product names should be prefixed by MS- as shown below:
     

![Image tiles with each image labelled in the following format: MS- image name - price. Example: MS-Vintage Typewriter-$67.99.](https://cdn.qwiklabs.com/qQwX8B%2F24ZwBAlloTffI%2B0vxlMhc11fJfKvPQSOSur8%3D align="center")

10.  Click *Check my progress* to verify the objective.
     

## **Task 6. Migrate Frontend to microservice**

The last step in the migration process is to move the Frontend code to a microservice and shut down the monolith! After this step is completed, you will have successfully migrated the monolith to a microservices architecture!

### Create a new frontend microservice

Follow the same procedure as the last two steps to create a new frontend microservice.

Previously when you rebuilt the monolith you updated the config to point to the monolith. Now you need to use the same config for the frontend microservice.

1.  Run the following commands to copy the microservices URL config files to the frontend microservice codebase:
    

```plaintext
cd ~/monolith-to-microservices/react-app
cp .env.monolith .env
npm run build
```

2.  Once that is completed, follow the same process as the previous steps. Run the following commands to build a Docker container, deploy your container, and expose it to via a Kubernetes service.
    
3.  Create Docker container with Google Cloud Build:
    

```plaintext
cd ~/monolith-to-microservices/microservices/src/frontend
gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT}/frontend:1.0.0 .
```

4.  Deploy container to GKE:
    

```plaintext
kubectl create deployment frontend --image=gcr.io/${GOOGLE_CLOUD_PROJECT}/frontend:1.0.0
```

5.  Expose GKE container:
    

```plaintext
kubectl expose deployment frontend --type=LoadBalancer --port 80 --target-port 8080
```

Click *Check my progress* to verify the objective.

### Delete the monolith

Now that all of the services are running as microservices, delete the monolith application! In an actual migration, this would also entail DNS changes, etc., to get the existing domain names to point to the new frontend microservices for the application.

*   Run the following commands to delete the monolith:
    

```plaintext
kubectl delete deployment monolith
kubectl delete service monolith
```

### Test your work

To verify everything is working, your old IP address from your monolith service should not work now, and your new IP address from your frontend service should host the new application.

*   To see a list of all the services and IP addresses, run the following command:
    

```plaintext
kubectl get services
```

Copied!

Your output should look similar to the following:

```plaintext
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)        AGE
frontend     LoadBalancer   10.39.246.135   35.227.21.154    80:32663/TCP   12m
kubernetes   ClusterIP      10.39.240.1     <none>           443/TCP        18d
orders       LoadBalancer   10.39.243.42    35.243.173.255   80:32714/TCP   31m
products     LoadBalancer   10.39.250.16    35.243.180.23    80:32335/TCP   21m
</none>
```

Once you've determined the external IP address for your frontend microservice, copy the IP address. Point your browser to this URL (such as [http://203.0.113.0](http://203.0.113.0)) to check if your frontend is accessible. Your website should be the same as it was before you broke down the monolith into microservices!

* * *

## Solution of Lab

%[https://www.youtube.com/watch?v=khYq2ku6FlQ] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP699/lab.sh
source lab.sh
```

**Script Alternative**

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/9a44b67d-a886-4445-b7c9-325fe822fdd7.png align="center")

```plaintext
export ZONE=
```

```plaintext
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Migrating%20a%20Monolithic%20Website%20to%20Microservices%20on%20Google%20Kubernetes%20Engine/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```