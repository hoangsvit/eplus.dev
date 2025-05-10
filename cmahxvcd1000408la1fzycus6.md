---
title: "Connect to Cloud SQL from an Application in Google Kubernetes Engine - GSP449"
seoTitle: "Connect to Cloud SQL from an Application in Google Kubernetes Engine -"
seoDescription: "In this lab you will learn how easy it is to connect an application in Google Kubernetes Engine (GKE) to a Cloud SQL instance using the Cloud SQL Proxy cont"
datePublished: Sat May 10 2025 08:04:08 GMT+0000 (Coordinated Universal Time)
cuid: cmahxvcd1000408la1fzycus6
slug: connect-to-cloud-sql-from-an-application-in-google-kubernetes-engine-gsp449
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746863915098/fad29654-c8c5-4b7b-a041-ce80f7b2fdfa.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1746864192381/c6a7e07b-874f-497f-801e-8232b9a049a0.png
tags: connect-to-cloud-sql-from-an-application-in-google-kubernetes-engine-gsp449, connect-to-cloud-sql-from-an-application-in-google-kubernetes-engine, gsp449

---

## Overview

In this lab you will learn how easy it is to connect an application in Google Kubernetes Engine (GKE) to a Cloud SQL instance using the Cloud SQL Proxy container as a sidecar container. You will deploy a [GKE](https://cloud.google.com/kubernetes-engine/) cluster and a [Cloud SQL](https://cloud.google.com/sql/docs/) Postgres instance and use the [Cloud SQL Proxy container](https://gcr.io/cloudsql-docker/gce-proxy:1.11) to allow communication between them.

While this lab is focused on connecting to a Cloud SQL instance with a Cloud SQL Proxy container, the concepts are the same for any Google Cloud managed service that requires API access.

This lab was created by GKE Helmsman engineers to help you gain a better understanding of Cloud SQL through a proxy container. You can view this demo on Github on the [gke-networking-demos page](https://github.com/GoogleCloudPlatform/gke-networking-demos.git). Any and all contributions to the assets is encouraged!

### What you'll learn

In this lab, you'll learn how to:

* Protect your database from unauthorized access by using an unprivileged service account on your GKE nodes.
    
* Put privileged service account credentials into a container running on GKE.
    
* Use the Cloud SQL Proxy to offload the work of connecting to your Cloud SQL instance and reduce your applications knowledge of your infrastructure.
    

### Unprivileged service accounts

All Google Kubernetes Engine nodes are assigned the default Compute Engine service account. This service account is fairly high privilege and has access to many Google Cloud services. Because of the way the Cloud SDK is setup, software that you write will use the credentials assigned to the compute engine instance on which it is running.

Since you don't want all of your containers to have the privileges that the default Compute Engine service account has, you need to make a least-privilege service account for your GKE nodes and then create more specific (but still least-privilege) service accounts for your containers.

### Privileged service accounts in containers

The only two ways to get service account credentials are through:

1. Your host instance (which you don't want)
    
2. A credentials file
    

This lab will show you how to get the credentials file into your container running on GKE so your application has the privileges it needs.

### Cloud SQL Proxy

The Cloud SQL Proxy allows you to offload the burden of creating and maintaining a connection to your Cloud SQL instance to the Cloud SQL Proxy process. Doing this allows your application to be unaware of the connection details and simplifies your secret management. The Cloud SQL Proxy comes pre-packaged by Google as a Docker container that you can run alongside your application container in the same GKE pod.

## Architecture

The application and its sidecar container are deployed in a single Kubernetes (k8s) pod running on the only node in the GKE cluster. The application communicates with the Cloud SQL instance via the Cloud SQL Proxy process listening on localhost.

The k8s manifest builds a single-replica Deployment object with two containers, pgAdmin and Cloud SQL Proxy. There are two secrets installed into the GKE cluster: the Cloud SQL instance connection information and a service account key credentials file, both used by the Cloud SQL Proxy containers Cloud SQL API calls.

The application doesn't have to know anything about how to connect to Cloud SQL, nor does it have to have any exposure to its API. The Cloud SQL Proxy process takes care of that for the application. It's important to note that the Cloud SQL Proxy container is running as a 'sidecar' container in the pod.

![Application flow in a Kubernetes cluster](https://cdn.qwiklabs.com/Pcsfx0w6Y9DT%2FwR0CDQvl93SQP%2FZoSHENOVAcGpaZS8%3D align="left")

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
    student-04-62aaa0465e59@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    dZIw9EQz1JSk
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-d6587980180c`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-d6587980180c
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
ACCOUNT: student-04-62aaa0465e59@qwiklabs.net

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
project = qwiklabs-gcp-02-d6587980180c
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Set your region and zone

Certain Compute Engine resources live in regions and zones. A region is a specific geographical location where you can run your resources. Each region has one or more zones.

**Note**: Learn more about regions and zones and see a complete list in [Regions & Zones documentation](https://cloud.google.com/compute/docs/regions-zones/).

Run the following to set a region and zone for your lab (you can use the region/zone that's best for you):

```apache
gcloud config set compute/region us-central1
gcloud config set compute/zone us-central1-c
```

### Copy the demo

1. Run the following to copy the files for this lab:
    

```apache
gsutil cp gs://spls/gsp449/gke-cloud-sql-postgres-demo.tar.gz .
tar -xzvf gke-cloud-sql-postgres-demo.tar.gz
```

2. Go into the directory for this lab:
    

```apache
cd gke-cloud-sql-postgres-demo
```

## Task 1. Deployment

Deployment is fully automated. The script you will deploy takes the following parameters, in order:

* A username for your Cloud SQL instance
    
* A username for the pgAdmin console
    
* USER\_PASSWORD - the password to login to the Postgres instance
    
* PG\_ADMIN\_CONSOLE\_PASSWORD - the password to login to the pgAdmin UI
    

1. You can create any username for the Cloud SQL instance and use any email for the pgAdmin console; the example here uses "dbadmin" and your temporary student email.
    
2. Save your student account in a variable:
    

```apache
PG_EMAIL=$(gcloud config get-value account)
```

3. Run the following to deploy the script and create the 2 usernames; you will be asked to create a password for `dbadmin` and `$PG_EMAIL` (your student@qwiklabs.net account) in the output:
    

```apache
./create.sh dbadmin $PG_EMAIL
```

The passwords will be used again later in the lab; they don't need to be difficult.

During the deployment, `create.sh` will run the following scripts:

* `enable_apis.sh` - enables the GKE API and Cloud SQL Admin API.
    
* `postgres_instance.sh` - creates the Cloud SQL instance and additional Postgres user. Note that gcloud will timeout when waiting for the creation of a Cloud SQL instance so the script manually polls for its completion instead.
    
* `service_account.sh` - creates the service account for the Cloud SQL Proxy container and creates the credentials file.
    
* `cluster.sh` - Creates the GKE cluster.
    
* `configs_and_secrets.sh` - creates the GKE secrets and configMap containing credentials and connection string for the Cloud SQL instance.
    
* `pgadmin_deployment.sh` - creates the pgAdmin4 pod.
    

**Note:** Deployment of the Cloud SQL instance can take up to 10 minutes.

If you encounter an error in the automated deployment script, ensure your region and zone variables are set and then try re-running the `create.sh`script.

Next, use load balancer to expose the pod in order to connect to the instance, then delete the services when finished to avoid unauthorized access.

4. Run the following to get the Pod ID:
    

```apache
POD_ID=$(kubectl --namespace default get pods -o name | cut -d '/' -f 2)
```

5. Expose the pod via load balancer:
    

```apache
kubectl expose pod $POD_ID --port=80 --type=LoadBalancer
```

6. Get the service IP address:
    

```apache
kubectl get svc
```

Output:

```apache
NAME                                   TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE

kubernetes                             ClusterIP      <cluster_ip> <none>        443/TCP        96m

SVC_NAME                               LoadBalancer   <cluster_ip> <svc_ip>      80:31789/TCP   45m
</svc_ip></cluster_ip></none></cluster_ip>
```

**Note:** Run the previous command again until you see an external IP address for the pgAdmin service.

7. In the Cloud console, from the **Navigation menu** &gt; **SQL**, click on the Instance ID.
    
8. In the left menu, click on **Connections** and then on **Networking**.
    
9. With the Public IP box checked, click on **Add a Network**.
    
10. Name the network, then give it public access:
    

```bash
0.0.0.0/0
```

11. Click **Done**.
    
12. Click **Save**.
    
13. Open a new tab and connect to pgAdmin in your browser the using th pgAdmin &lt;SVC\_IP&gt;:
    

```apache
http://<SVC_IP>
```

14. Sign in to the pgAdmin UI with the following:
    

* &lt;PGADMIN\_USERNAME&gt; (your temporary student@qwiklabs.net account) in the "Email Address" field
    
* &lt;PG\_ADMIN\_CONSOLE\_PASSWORD&gt; that you defined earlier
    

**Note:** If you're unsure what your full student account is, run **gcloud config get-value account** in your Cloud Shell and copy the output.

15. Return to the Cloud console, and the SQL page. Click on the **Overview** tab.
    
16. Copy the Public IP address.
    
17. In the pgAdmin console, from the left pane click **Servers**, then click **Add New Server**.
    
18. On the **General** tab, give your server a name, then click on the **Connection** tab.
    
19. Use the &lt;DATABASE\_USER\_NAME&gt;(dbadmin) and &lt;USER\_PASSWORD&gt; you created earlier to connect to 127.0.0.1:5432:
    

* **Host name:** paste the public IP address you copied
    
* **Username:** `<DATABASE_USER_NAME>`(dbadmin)
    
* **Password:** `<USER_PASSWORD>` you created
    

![Connection tab with Host name/address, Username and Password fields populated](https://cdn.qwiklabs.com/Mz6idvXrwcVkpg0LLu2RrngtUqDcxqFSqVO2Jh%2B9%2BgI%3D align="left")

20. Click **Save**.
    

**Test completed task**

Click **Check my progress** to verify your performed task. If you have successfully created required resources with the fully automated deployment, you will see an assessment score.

Create required resources with the fully automated deployment

**Check my progress**

## Task 2. Validation

Validation is fully automated. The validation script checks for the existence of the Cloud SQL instance, the GKE cluster, and the running pod. All of these resources should exist after the deployment script completes.

* In Cloud Shell, validate these three deployments by executing:
    

```apache
make validate
```

The script takes the parameters `INSTANCE_NAME`: The name of the existing Cloud SQL instance.

A successful output looks like this:

```apache
Cloud SQL instance exists
GKE cluster exists
pgAdmin4 Deployment object exists
```

## Task 3. Teardown

Teardown is fully automated. The teardown script deletes every resource created in the deployment script.

1. In order to teardown, run:
    

```apache
make teardown
```

The script takes the parameter `INSTANCE_NAME`: The name of the existing Cloud SQL instance.

`teardown.sh` runs the following scripts:

* `delete_resources.sh` - deletes everything but the Cloud SQL instance
    
* `delete_instance.sh` - deletes the Cloud SQL instance
    

## Task 4. Troubleshooting in your own environment

When creating a Cloud SQL instance you get the error:

```apache
is the subject of a conflict: The instance or operation is not
in an appropriate state to handle the request.
```

### Resolution

You cannot reuse an instance name for up to a week after you have deleted an instance. For more information, refer to [Delete instances](https://cloud.google.com/sql/docs/mysql/delete-instance).

---

## Solution of Lab

%[https://youtu.be/0E7hYP8-I_0] 

```apache
curl -LO raw.githubusercontent.com/chayandeokar/Cloud-Skills-2025/refs/heads/master/Connect%20to%20Cloud%20SQL%20from%20an%20Application%20in%20Google%20Kubernetes%20Engine/GSP449.sh
sudo chmod +x *.sh
./*.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1746864136200/a50582ae-3a2b-4943-907e-d10e4ea427a1.png align="center")

```apache
dbadmin
```