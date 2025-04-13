---
title: "Migrate Existing Prometheus Monitoring Workloads to Google Cloud - GSP1025"
seoTitle: "Migrate Existing Prometheus Monitoring Workloads to Google Cloud - GSP"
seoDescription: "With self-deployed data collections, you manage your Prometheus installation as usual. The only difference from upstream Prometheus is that you run the Mana"
datePublished: Sun Apr 13 2025 08:23:10 GMT+0000 (Coordinated Universal Time)
cuid: cm9fdntp1000909jv8y1mhxmm
slug: migrate-existing-prometheus-monitoring-workloads-to-google-cloud-gsp1025
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744532427190/94886bac-1aa5-40bd-9894-d9ac4fabf1c6.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744532573071/a9d454b7-2415-403f-9c91-e5609a4bde0b.png
tags: migrate-existing-prometheus-monitoring-workloads-to-google-cloud-gsp1025, migrate-existing-prometheus-monitoring-workloads-to-google-cloud, gsp1025

---

## Overview

With self-deployed data collections, you manage your Prometheus installation as usual. The only difference from upstream Prometheus is that you run the Managed Service for Prometheus drop-in replacement binary instead of the upstream Prometheus binary.

In this lab, you will explore how to use Managed Service for Prometheus in a self-deployed data collection mode. You can also utilize managed data collection as well.

### Objectives

In this lab, you will learn how to:

1. Deploy the Managed Service for Prometheus
    
2. Create a self-managed data collection for scraping metrics
    
3. Use Grafana to query Prometheus metrics data
    

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
    student-04-41125e65cd18@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    C0XU62JDRHBM
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-66ce94ba3f58`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-66ce94ba3f58
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
ACCOUNT: student-04-41125e65cd18@qwiklabs.net

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
project = qwiklabs-gcp-00-66ce94ba3f58
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Deploy GKE cluster

1. Deploy a basic GKE cluster to setup lab:
    

```apache
gcloud container clusters create gmp-cluster --num-nodes=3 --zone=us-central1-f
```

```apache
gcloud container clusters get-credentials gmp-cluster --zone=us-central1-f
```

2.. Create namespace **gmp-test**:

```apache
kubectl create ns gmp-test
```

## Task 2. Deploy application

This example application emits Prometheus metrics on its metrics port. The application uses three replicas.

```apache
kubectl -n gmp-test apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.4.3-gke.0/examples/example-app.yaml
```

## Task 3. Deploy Prometheus

* Run the following command to ingest a metric:
    

```apache
kubectl -n gmp-test apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.4.3-gke.0/examples/prometheus.yaml
```

```apache
kubectl -n gmp-test get pod
```

If the deployment was successful then you should see a similar output to the following. Wait for the status of all pods to be Running.

```apache
NAME                            READY   STATUS    RESTARTS   AGE
prom-example-84c6f547f5-fglbr   1/1     Running   0          5m
prom-example-84c6f547f5-jnjp4   1/1     Running   0          5m
prom-example-84c6f547f5-sqdww   1/1     Running   0          5m
prometheus-test-0               2/2     Running   1          3m
```

## Task 4. Prometheus metrics

Run the following commands to verify that you can see metrics by using the Prometheus metrics API.

1. Set environment variable:
    

```apache
export PROJECT_ID=$(gcloud config get-value project)
```

2. Use the following curl command:
    

```apache
curl https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.4.3-gke.0/examples/frontend.yaml |
sed "s/\$PROJECT_ID/$PROJECT_ID/" | kubectl apply -n gmp-test -f -
```

3. Forward the port to see the Prometheus metrics UI:
    

```apache
kubectl -n gmp-test port-forward svc/frontend 9090
```

4. In cloud shell editor use the web preview icon to change the port to 9090 then view the metrics.
    

Check if Prometheus is deployed

**Check my progress**

Check if metric appears

**Check my progress**

## Task 5. Deploy Grafana

**Note:** Open a new Cloud Shell tab (+) to run the below commands.

1. Clone kube-prometheus repo:
    

```apache
git clone https://github.com/prometheus-operator/kube-prometheus.git
```

2. Change directory to the kube-prometheus:
    

```apache
cd kube-prometheus
```

3. Run the following commands to deploy an ephemeral Grafana deployment:
    

```apache
kubectl -n gmp-test apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/v0.4.3-gke.0/examples/grafana.yaml
```

4. Forward the port to see the Grafana UI:
    

```apache
kubectl -n gmp-test port-forward svc/grafana 3001:3000
```

5. In cloud shell editor use the web preview icon to change the port to 3001 then view the Grafana dashboard.
    

## Task 6. Grafana

1. Log in to Grafana using the username **admin** and password **admin**.
    
2. Click **Skip** when asked to enter new password.
    

## Task 7. Configure data source

To query Managed Service for Prometheus in Grafana by using the Prometheus UI as the authentication proxy, you must add new data source to Grafana. To add a data source for the managed service, do the following:

1. Go to your Grafana deployment, for example, by browsing to the URL `http://localhost:3000` to reach the Grafana welcome page.
    
2. Select **Configuration** from the main Grafana menu, then select **Data Sources**.
    

![Grafana welcome page displaying the selected Data Sources option in the Configuration menu](https://cdn.qwiklabs.com/9eShb7YrbDcxtS6a661dc68qDa9hADNBh5gyeAuTXhU%3D align="left")

3. Select **Add data source**, and select **Prometheus** as the time series database.
    

![The Add data source page](https://cdn.qwiklabs.com/Al3wUlLFYXQuGx8jebRI5Y%2FRwGSw1nGbRPvT%2Fd2Ei18%3D align="left")

4. In the URL field of the HTTP pane, enter the URL of the Managed Service for Prometheus frontend service. If you configured the Prometheus UI to run on port 9090, then the service URL for this field is `http://frontend.gmp-test.svc:9090`.
    
5. In the **HTTP Method** field, select **GET**.
    

![The Data Sources/Managed Service for Prometheus page](https://cdn.qwiklabs.com/S3wbbR9VUqmOg0vmGXqXhU%2BNL%2BKYiAEnPfEGSLV700k%3D align="left")

6. Click **Save & Test**, and look for the message "Data source is working".
    

![The aforementioned message displayed in the UI](https://cdn.qwiklabs.com/cEwe8WuF0%2Byp5AVkshQzXJQ%2FtZaxvXyp5Kj94M2pYHg%3D align="left")

## Task 8. Grafana chart

You can now create Grafana dashboards using the new data source. You can also redirect existing dashboards to the new data source. The following screenshot shows a Grafana chart that displays the up metric.

![Grafana chart on the New dashboard/Edit Panel page](https://cdn.qwiklabs.com/ChcVGGwY5HVIidVpa4RbLfhrYRXkgtjx8fpg89lrK5A%3D align="left")

Check if metric appears

---

## Solution of Lab

%[https://youtu.be/lrgDYslmQMA] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Migrate%20Existing%20Prometheus%20Monitoring%20Workloads%20to%20Google%20Cloud/techcps1025.sh
sudo chmod +x techcps1025.sh
./techcps1025.sh
```