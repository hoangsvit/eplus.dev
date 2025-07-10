---
title: "Connect an App to a Cloud SQL for PostgreSQL Instance - GSP919"
seoTitle: "Connect an App to a Cloud SQL for PostgreSQL Instance - GSP919"
seoDescription: "Learn how to connect an app to a Cloud SQL for PostgreSQL instance using Kubernetes and Google Kubernetes Engine (GKE)"
datePublished: Thu Jul 10 2025 03:57:26 GMT+0000 (Coordinated Universal Time)
cuid: cmcwux2cn000a02jrgics38r9
slug: connect-an-app-to-a-cloud-sql-for-postgresql-instance-gsp919
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752119783078/1304f2b2-9e3d-4896-86e7-3b2256aaa75f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752119796504/f69d4d9c-aa30-407b-a1ff-149c0fbc19ff.png
tags: postgresql, cloud-sql, connect-an-app-to-a-cloud-sql-for-postgresql-instance-gsp919, gsp919, connect-an-app-to-a-cloud-sql-for-postgresql-instance

---

## Overview

Cloud SQL is a fully managed relational database service for MySQL, PostgreSQL, and Microsoft SQL Server that offers many services for common adminstrative tasks such as backups, replication, and logging. You can easily connect your applications to a Cloud SQL instance to leverage these useful services.

In this lab, you first create a Kubernetes cluster and deploy a simple application to that cluster. You then connect the application to a supplied Cloud SQL for PostgreSQL instance and confirm that it is able to write to and read from it.

### What you'll do

* Create a Kubernetes cluster and deploy a simple application to that cluster.
    
* Connect the application to the supplied Cloud SQL for PostgreSQL database instance.
    
* Confirm that the application is able to write to and read from the database.
    

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
    student-02-5550fb20f2ad@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    QzjmxWlD3I25
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-60258caeb95c`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-60258caeb95c
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
ACCOUNT: student-02-5550fb20f2ad@qwiklabs.net

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
project = qwiklabs-gcp-00-60258caeb95c
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Set your region and zone

Certain Compute Engine resources live in regions and zones. A region is a specific geographical location where you can run your resources. Each region has one or more zones.

<aside><strong>Note</strong>: Learn more about regions and zones and see a complete list in<span> </span><a href="https://cloud.google.com/compute/docs/regions-zones/" target="_blank">Regions & Zones documentation</a>.</aside>

Run the following gcloud commands in Cloud Shell to set the default region and zone for your lab:

```apache
gcloud config set compute/zone "us-central1-c"
export ZONE=$(gcloud config get compute/zone)

gcloud config set compute/region "us-central1"
export REGION=$(gcloud config get compute/region)
```

## Task 1. Initialize APIs and create a Cloud IAM service account

To complete this task you must initialize the APIs and create an IAM service account that will be used to allow your application to connect to the Cloud SQL database.

### Enable the APIs

You must enable the required APIs for this lab. You will build and push a container to the Artifact Registry in a later task, so you must enable the Artifact Registry API first.

1. In Cloud Shell, run the following command to enable the Artifact Registry API:
    

```apache
gcloud services enable artifactregistry.googleapis.com
```

### Create a Service Account for Cloud SQL

You need to configure IAM service account credentials for the application that you will deploy later. The service account must be bound to a role that allows it to create and access Cloud SQL databases.

1. In Cloud Shell, create a Service Account and bind it to the Cloud SQL admin role in the lab project:
    

```apache
export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
export CLOUDSQL_SERVICE_ACCOUNT=cloudsql-service-account

gcloud iam service-accounts create $CLOUDSQL_SERVICE_ACCOUNT --project=$PROJECT_ID

gcloud projects add-iam-policy-binding $PROJECT_ID \
--member="serviceAccount:$CLOUDSQL_SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com" \
--role="roles/cloudsql.admin" 
```

2. In Cloud Shell, create and export keys to a local file:
    

```apache
gcloud iam service-accounts keys create $CLOUDSQL_SERVICE_ACCOUNT.json \
    --iam-account=$CLOUDSQL_SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com \
    --project=$PROJECT_ID
```

The file will be saved to your home folder in Cloud Shell.

Click **Check my progress** to verify the objective.

Create an IAM service account for Cloud SQL.

## Task 2. Deploy a lightweight GKE application

In this task you will create a Kubernetes cluster and deploy a lightweight Google Kubernetes Engine (GKE) application on that cluster. You will configure the application to have access to the supplied Cloud SQL instance.

The application provided is a simple Flask-SQLAlchemy web application called gMemegen. It creates memes by supplying a set of photographs and capturing header and footer text, storing them in the database and rendering the meme to a local folder. It runs on a single pod with two containers; one for the application and one for the Cloud SQL Auth Proxy deployed in the side-car pattern.

A load balancer will marshal requests between the app and the database through the side-car. This load balancer will expose an external Ingress IP address through which you will access the app in your browser.

### Create a Kubernetes cluster

In this step, you will create a minimal Kubernetes cluster. The cluster will take a couple of minutes to be deployed.

1. In Cloud Shell, create a minimal Kubernetes cluster as follows:
    

```apache
ZONE=us-central1-c
gcloud container clusters create postgres-cluster \
--zone=$ZONE --num-nodes=2
```

### Create Kubernetes secrets for database access

In this step you will create a pair of Kubernetes secrets containing the credentials that are needed to connect to the Cloud SQL instance and database.

1. In Cloud Shell, run the following commands to create the secrets:
    

```apache
kubectl create secret generic cloudsql-instance-credentials \
--from-file=credentials.json=$CLOUDSQL_SERVICE_ACCOUNT.json
    
kubectl create secret generic cloudsql-db-credentials \
--from-literal=username=postgres \
--from-literal=password=supersecret! \
--from-literal=dbname=gmemegen_db
```

### Download and build the GKE application container

Before you can deploy the gMemegen application to your GKE cluster you need to build the container and push it to a repository.

1. In Cloud Shell, download the provided application code and change to the application directory:
    

```apache
gsutil -m cp -r gs://spls/gsp919/gmemegen .
cd gmemegen
```

2. Create environment variables for the region, Project ID and Artifact Registry repository:
    

```apache
export REGION=us-central1
export PROJECT_ID=$(gcloud config list --format 'value(core.project)')
export REPO=gmemegen
```

3. Configure Docker authentication for the Artifact Registry:
    

```apache
gcloud auth configure-docker ${REGION}-docker.pkg.dev
```

* Enter `Y` if you are asked for confirmation.
    

4. Create the Artifact Registry repository:
    

```apache
gcloud artifacts repositories create $REPO \
    --repository-format=docker --location=$REGION
```

5. Build a local Docker image:
    

```apache
docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/gmemegen/gmemegen-app:v1 .
```

For the purposes of this lab, you may ignore the warning about running 'pip' as the 'root' user, although you should note that, in general, especially when working on your local machine, it is best practice to use a virtual environment.

6. Push the image to the Artifact Registry:
    

```apache
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/gmemegen/gmemegen-app:v1
```

### Configure and deploy the GKE application

You must modify the Kubernetes deployment manifest for the gMemegen application to point at the correct container and configure the Cloud SQL Auth Proxy side-car with the connection string for the Cloud SQL PostgreSQL instance.

The instructions explain how to edit the file using the Cloud Shell Editor, but if you prefer you can use another editor, such as `vi` or `nano`, from Cloud Shell for these steps.

1. On the Cloud Shell menu bar, click **Open Editor** to open the Cloud Shell Editor.
    
2. Navigate the **Explorer** panel on the left hand side, expanding the `gmemegen` folder and then selecting `gmemegen_deployment.yaml` to edit the file.
    
3. On **line 33**, in the `image` attribute, replace `${REGION}` with `us-central1` and `${PROJECT_ID}` with `qwiklabs-gcp-00-60258caeb95c`. The line should now read:
    

```apache
image: us-central1-docker.pkg.dev/qwiklabs-gcp-00-60258caeb95c/gmemegen/gmemegen-app:v1
```

4. On **line 60**, replace `${REGION}` with `us-central1` and `${PROJECT_ID}` with `qwiklabs-gcp-00-60258caeb95c`. The line should now read:
    

```apache
-instances=qwiklabs-gcp-00-60258caeb95c:us-central1:postgres-gmemegen=tcp:5432
```

To confirm that the connection name is correct, in the Cloud Console, navigate to **Databases** &gt; **SQL**, select the `postgres-gmemegen` instance and compare with the **Connection name** in the **Overview** pane. A valid connection name is of the format `PROJECT_ID:REGION:CLOUD_SQL_INSTANCE_ID`.

5. Save your changes by selecting **File** &gt; **Save** from the Cloud Shell Editor menu.
    
6. In the Cloud console click the **Open Terminal** to re-open Cloud Shell. You may need to resize the Terminal window by dragging down the handle at the centre top of the menu bar, in order to see your Cloud Console window above.
    
7. In Cloud Shell, deploy the application by running the following command:
    

```apache
kubectl create -f gmemegen_deployment.yaml
```

8. In Cloud Shell, check that the deployment was successful by running the following command:
    

```apache
kubectl get pods
```

It may take a minute or so for the pods to start up, because they need to pull the image from the repository. Repeat the above command until you see a pod, with 2 containers, with status `Running`.

Click **Check my progress** to verify the objective.

Deploy a lightweight GKE application.

## Task 3. Connect the GKE application to an external load balancer

In this task you will create a load balancer to marshal requests between the containers in your GKE pods and access the application using its external IP address from your browser.

### Create a load balancer to make your GKE application accessible from the web

In this step you will create a Kubernetes load balancer service that will provide your application with a public IP address.

1. In Cloud Shell, run the following command to create a load balancer for the application:
    

```apache
kubectl expose deployment gmemegen \
    --type "LoadBalancer" \
    --port 80 --target-port 8080
```

### Test the application to generate some data

In this step you will access the gMemegen application from your web browser.

The application has a very simple interface. It launches to the application home page, which displays 6 candidate images for making memes. You can select an image by clicking on it.

The **Create Meme** page is displayed, where you enter two items of text, to be displayed at the top and bottom of the image. Clicking **Submit** renders the meme and displays it. The interface provides no navigation from the completed meme page. You will have to use the browser's back button to return to the home page.

There are two other pages, **Recent** and **Random**, which display a set of recently generated memes and a random meme, respectively. Generating memes and navigating the UI will generate database activity which you can view in the logs as described below.

Wait for the load balancer to expose an external IP, which you can retrieve as follows:

1. In Cloud Shell, copy the external IP address attribute of the `LoadBalancer Ingress` from the output of:
    

```apache
kubectl describe service gmemegen
```

**Output:**

```apache
Name:                     gmemegen
Namespace:                default
Labels:                   app=gmemegen
Annotations:              <none>
Selector:                 app=gmemegen
Type:                     LoadBalancer
IP Families:              <none>
IP:                       10.3.240.201
IPs:                      10.3.240.201
LoadBalancer Ingress:     34.67.122.203
Port:                     <unset>  80/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  31837/TCP
Endpoints:                10.0.0.7:8080
Session Affinity:         None
External Traffic Policy:  Cluster
Events:
  Type    Reason                Age   From                Message
  ----    ------                ----  ----                -------
  Normal  EnsuringLoadBalancer  85s   service-controller  Ensuring load balancer
  Normal  EnsuredLoadBalancer   36s   service-controller  Ensured load balancer
</unset></unset></none></none>
```

It will take a minute or so for the `LoadBalancer Ingress` attribute to be included in the output (see above), so repeat the command until it is there before performing the next step.

2. In a browser, navigate to the load balancer's Ingress IP address.
    

You can create a clickable link to the external IP address of the load balancer in Cloud Shell using the following commands:

```apache
export LOAD_BALANCER_IP=$(kubectl get svc gmemegen \
-o=jsonpath='{.status.loadBalancer.ingress[0].ip}' -n default)
echo gMemegen Load Balancer Ingress IP: http://$LOAD_BALANCER_IP
```

4. Click the link in Cloud Shell and you will see the gMemegen application running in a new tab in your browser.
    
5. Create a meme as follows:
    
    * On the **Home** page, click on one of the presented images.
        
    * Enter text in the **Top** and **Bottom** text boxes.
        
    * Click the **Submit** button.
        

Your new meme is displayed.

![Meme for GKE app connected to cloud SQL.](https://cdn.qwiklabs.com/oekx%2FE%2BF2t0sTgr2pfDNTAHa6NGx3MHINYBYlI4gq7U%3D align="left")

6. To create more memes, use the browser's back button to navigate to the home page.
    
7. To view existing memes, click **Recent** or **Random** in the application menu. (Note that **Random** opens a new browser tab)
    
8. In Cloud Shell, view the application’s activity by running the following:
    

```apache
POD_NAME=$(kubectl get pods --output=json | jq -r ".items[0].metadata.name")
kubectl logs $POD_NAME gmemegen | grep "INFO"
```

This queries the logs from the `gmemegen` container and will display the activity of the application on the pod, including the SQL statements, which are logged to stderr as they are executed.

Click **Check my progress** to verify the objective.

Connect the GKE application to an external load balancer.

## Task 4. Verify full read/write capabilities of application to database

In this task you will verify that the application is able to write to and read from the database.

### Connect to the database and query an application table

In this step you will connect to the Cloud SQL instance by running **PL/SQL** in Cloud Shell.

1. In Google Cloud Console, navigate to **Databases** &gt; **SQL** and select the `postgres-gmemegen` instance.
    
2. In the **Overview** pane , scroll down to **Connect to this instance** and click the **Open Cloud Shell** button.
    
3. Run the auto-populated command in Cloud Shell.
    
4. When prompted, enter the password: `supersecret!`
    
5. At the `postgres=>` prompt enter the following command to select the gmemegen\_db database:
    

```apache
\c gmemegen_db
```

6. When prompted, enter the password: `supersecret!`
    
7. At the `gmemegen_db=>` prompt enter:
    

```apache
select * from meme;
```

This will display a row for each meme you have generated through the gMemegen app.

Click **Check my progress** to verify the objective.

Verify full read/write capabilities of the application to its database.

---

## Solution of Lab

%[https://youtu.be/4oORk5RiZF4] 

```apache
curl -LO https://github.com/ArcadeCrew/Google-Cloud-Labs/raw/refs/heads/main/Connect%20an%20App%20to%20a%20Cloud%20SQL%20for%20PostgreSQL%20Instance/arcadecrew.sh
chmod +x arcadecrew.sh
./arcadecrew.sh
```