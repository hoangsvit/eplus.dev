---
title: "Scaling Microservices Applications: Migration to Redis Enterprise on Google Cloud - GSP1177"
seoTitle: "Scaling Microservices Applications: Migration to Redis Enterprise on G"
seoDescription: "Learn how to migrate a microservices e-Commerce app to Redis Enterprise on Google Cloud for scalability and high availability"
datePublished: Wed Sep 24 2025 04:10:22 GMT+0000 (Coordinated Universal Time)
cuid: cmfxgufpz000002l8dxdx5va9
slug: scaling-microservices-applications-migration-to-redis-enterprise-on-google-cloud-gsp1177
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758687150432/ba75f734-9c5e-4185-8907-f96f62db1edb.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1758680026892/91ba328d-d069-4e65-86fa-35d0d4b36d0f.png
tags: redis, scaling-microservices-applications-migration-to-redis-enterprise-on-google-cloud-gsp1177, scaling-microservices-applications-migration-to-redis-enterprise-on-google-cloud, gsp1177, scaling-microservices-applications, migration-to-redis-enterprise-on-google-cloud, redis-enterprise

---

## Overview

In this lab, you will deploy a fully functioning microservices e-Commerce website application on Google Cloud using Redis to run the shopping cart service. Open Source Redis is the original database to run the shopping cart service. It will migrate the shopping cart data to Redis Enterprise for scalability and high availability with minimal downtime.

![83ce16cd5186f916.png](https://cdn.qwiklabs.com/uXXRi5oJajsKKjPROYhPa4ohlNXtuUYSrDc3h1ty9o8%3D align="left")

### Objectives

In this lab, you will learn how to:

1. Use Terraform to provision the following components in this order:
    
    * VPC Network
        
    * Google Kubernetes Engine cluster
        
    * Deploy e-Commerce microservices application
        
    * Deploy Redis Enterprise Cluster and Database using Redis Enterprise Operator for Kubernetes
        
2. Migrate the shopping cart data from OSS Redis to Redis Enterprise using RIOT ( Redis Input and Output Tool)
    
3. Roll back to the OSS Redis to back the shopping cart content
    
4. Patch the "Cart" deployment to point to the Redis Enterprise Database again for production
    

## Setup and Requirements

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
    
    ```plaintext
    student-00-43a4f5bf5788@qwiklabs.net
    ```
    
    
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    c38jiLCfgjs0
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-c6b563258d13`. The output contains a line that declares the **Project\_ID** for this session:

```plaintext
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-c6b563258d13
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```plaintext
gcloud auth list
```


4. Click **Authorize**.
    

**Output:**

```plaintext
ACTIVE: *
ACCOUNT: student-00-43a4f5bf5788@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```plaintext
gcloud config list project
```


**Output:**

```plaintext
[core]
project = qwiklabs-gcp-03-c6b563258d13
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Use Terraform to provision the infrastructure components and deploy the eCommerce website application

1. In Cloud Shell, clone the following GitHub repository for the lab:
    

```plaintext
git clone https://github.com/Redislabs-Solution-Architects/gcp-microservices-demo-qwiklabs.git
pushd gcp-microservices-demo-qwiklabs
```


2. Create your own terraform.tfvars. Copy this code and run it on Cloud Shell:
    

```plaintext
cat <<EOF > terraform.tfvars
gcp_project_id = "$(gcloud config list project \
 --format='value(core.project)')"
gcp_region = "europe-west4"
EOF
```


3. Initialize Terraform:
    

```plaintext
terraform init
```


4. Deploy the stack:
    

```plaintext
terraform apply -auto-approve
```


**Note:** This process can take 5-10 minutes.

On success, you will see similar output below:

```plaintext
Apply complete! Resources: 9 added, 0 changed, 0 destroyed.

Outputs:

db_password = <sensitive>
gke_cluster_name = "gke-boutique"
db_private_endpoint = "redis-enterprise-database-headless:13188"
region = "europe-west4"
</sensitive>
```

5. Store Redis Enterprise database information in environment variables for later use:
    

```plaintext
export REDIS_DEST=`terraform output db_private_endpoint | tr -d '"'`
export REDIS_DEST_PASS=`terraform output db_password | tr -d '"'`
export REDIS_ENDPOINT="${REDIS_DEST},user=default,password=${REDIS_DEST_PASS}"
```


6. Target your environment to the GKE cluster:
    

```plaintext
gcloud container clusters get-credentials \
$(terraform output -raw gke_cluster_name) \
--region $(terraform output -raw region)
```


7. Get the External-IP from the web application (in the redis namespace)
    

```plaintext
kubectl get service frontend-external -n redis
```


8. Access the eCommerce website application by pointing your browser with the IP address from the following command as http://&lt;EXTERNAL-IP&gt;
    
9. The web application is using the inbuilt OSS Redis container as the backing store for the shopping cart by default. Make sure you add some items to your shopping cart in order to see that data migration from OSS Redis to Redis Enterprise works later in the lab.
    

Click **Check my progress** to verify the objective.

Deploy the eCommerce website application

## Task 2. Migrate the shopping cart data from OSS Redis to Redis Enterprise using RIOT, Redis Input and Output Tool

1. Set to **redis** namespace:
    

```plaintext
kubectl config set-context --current --namespace=redis
```


2. Show the current pointer for the cartservice (it'll show it pointing to OSS Redis)
    

```plaintext
kubectl get deployment cartservice -o jsonpath='{.spec.template.spec.containers[0].env}' | jq
```


3. Create a Kubernetes secret for the Redis Enterprise database connection:
    

```plaintext
kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: redis-creds
type: Opaque
stringData:
  REDIS_SOURCE: redis://redis-cart:6379
  REDIS_DEST: redis://${REDIS_DEST}
  REDIS_DEST_PASS: ${REDIS_DEST_PASS}
EOF
```


4. Run a Kubernetes job to migrate data from OSS Redis to Redis Enterprise database (should take about 15 seconds or so):
    

```plaintext
kubectl apply -f https://raw.githubusercontent.com/Redislabs-Solution-Architects/gcp-microservices-demo-qwiklabs/main/util/redis-migrator-job.yaml
```


5. Show the current pointer for the cartservice
    

```plaintext
kubectl get deployment cartservice -o jsonpath='{.spec.template.spec.containers[0].env}' | jq
```


Run a Kubernetes patch command below to update the **cartservice** deployment to point to the new Redis Enterprise database endpoint (should take about 30 seconds):

6. Apply Kubernetes patch command to the cartservice
    

```plaintext
kubectl patch deployment cartservice --patch '{"spec":{"template":{"spec":{"containers":[{"name":"server","env":[{"name":"REDIS_ADDR","value":"'$REDIS_ENDPOINT'"}]}]}}}}'
```


7. Show the new pointer for the cartservice (it'll show it pointing to OSS Redis)
    

```plaintext
kubectl get deployment cartservice -o jsonpath='{.spec.template.spec.containers[0].env}' | jq
```


8. Verify if the same items remain in the shopping cart are now backed by the Redis Enterprise database by refreshing your browser and accessing the shopping cart content again. The same items should appear in the shopping cart. Then add a few items to the shopping cart in order to verify the online boutique web application is successfully pointing to the Redis Enterprise database.
    

Click **Check my progress** to verify the objective.

Migrate the shopping cart data

## Task 3. Roll back to the OSS Redis to back the shopping cart content

1. Run the following patch command to configure the shopping cart to use OSS Redis again (Should take about 30 seconds):
    

```plaintext
kubectl patch deployment cartservice --patch '{"spec":{"template":{"spec":{"containers":[{"name":"server","env":[{"name":"REDIS_ADDR","value":"redis-cart:6379"}]}]}}}}'
```


2. Verify that the service has been pointed to the OSS Redis instance
    

```plaintext
kubectl get deployment cartservice -o jsonpath='{.spec.template.spec.containers[0].env}' | jq
```


3. Refresh your browser and access the shopping cart content. You should not see the new items which are added earlier when Redis Enterprise is backing the shopping cart content. It is because the new items added to the shopping cart backed by the Redis Enterprise database is not replicated to the Redis OSS instance.
    

Click **Check my progress** to verify the objective.

Roll back the shopping cart content

## Task 4. Patch the "Cart" deployment to point to the Redis Enterprise Database again for production

1. Run a K8s patch command to update the **cartservice** deployment to point to the Redis Enterprise Endpoint (Should take about 30 seconds):
    

```plaintext
kubectl patch deployment cartservice --patch '{"spec":{"template":{"spec":{"containers":[{"name":"server","env":[{"name":"REDIS_ADDR","value":"'$REDIS_ENDPOINT'"}]}]}}}}'
```


2. Verify that the service has been pointed to the Redis Enterprise
    

```plaintext
kubectl get deployment cartservice -o jsonpath='{.spec.template.spec.containers[0].env}' | jq
```


3. Refresh your browser and access the shopping cart content. You should see the items which are added earlier. Now that everything is working and your items are still in your cart, you can delete the OSS Redis deployment as follows:
    

```plaintext
kubectl delete deploy redis-cart
```


Hooray!!! We are now ready for the upcoming big customer sales events.

Click **Check my progress** to verify the objective.

Delete redis deployment

---

## Solution of Lab

%[https://youtu.be/hjoLkCAWqzo]

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1177/lab.sh
source lab.sh
```