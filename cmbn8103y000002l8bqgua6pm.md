---
title: "Using Prometheus for Monitoring on Google Cloud: Qwik Start - GSP1024"
seoTitle: "Using Prometheus for Monitoring on Google Cloud: Qwik Start - GSP1024"
seoDescription: "Managed Service for Prometheus is Google Cloud's fully managed storage and query service for Prometheus metrics. This service is built on top of Monarch, th"
datePublished: Sun Jun 08 2025 05:27:01 GMT+0000 (Coordinated Universal Time)
cuid: cmbn8103y000002l8bqgua6pm
slug: using-prometheus-for-monitoring-on-google-cloud-qwik-start-gsp1024
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749360261106/883cba40-a20b-4017-b289-a3223a4b36c7.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749360409412/16c9a0d4-ff71-40e2-bb8c-c20c68487435.png
tags: using-prometheus-for-monitoring-on-google-cloud-qwik-start-gsp1024, using-prometheus-for-monitoring-on-google-cloud-qwik-start, gsp1024

---

## Overview

[Managed Service for Prometheus](https://cloud.google.com/stackdriver/docs/managed-prometheus) is Google Cloud's fully managed storage and query service for Prometheus metrics. This service is built on top of Monarch, the same globally scalable data store as Cloud Monitoring.

In this lab, you set up a Google Kubernetes Engine cluster, then deploy the Managed Service for Prometheus to ingest metrics from a simple application.

A thin fork of Prometheus replaces existing Prometheus deployments and sends data to the managed service with no user intervention. This data can then be queried using PromQL through the Prometheus Query API supported by the managed service and by using the existing Cloud Monitoring query mechanisms.

### Objectives

* Deploy the Managed Service for Prometheus to a GKE cluster.
    
* Deploy a Python application to monitor.
    
* Create a Cloud Monitoring dashboard to view metrics collected.
    

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
    student-00-e096c99e748b@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    HWHRlbQ1cEhe
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-132189b82a78`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-132189b82a78
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
ACCOUNT: student-00-e096c99e748b@qwiklabs.net

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
project = qwiklabs-gcp-02-132189b82a78
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Create a Docker repository

In this task, you create a private Docker repository within Artifact Registry and add the image to the private repository. This involves tagging the image with the repository name to specify its destination and then pushing it to Artifact Registry.

1. In Cloud Shell, run the following command to create a new Docker repository named **docker-repo**, in the location `us-central1`, and with the description "Docker repository".
    

```apache
gcloud artifacts repositories create docker-repo --repository-format=docker \
    --location=us-central1 --description="Docker repository" \
    --project=qwiklabs-gcp-02-132189b82a78
```

2. In the console title bar, type **Artifact Registry** in the **Search** field then click "Artifact Registry" from the search results.
    
3. On the **Artifact Registry** **Repositories** page, verify you can see your repository, `docker-repo`.
    
4. In Cloud Shell, load a pre-built image from a storage bucket:
    

```apache
 wget https://storage.googleapis.com/spls/gsp1024/flask_telemetry.zip
 unzip flask_telemetry.zip
 docker load -i flask_telemetry.tar
```

5. Run the following command to tag the image as `flask-telemetry:v1`:
    

```apache
docker tag gcr.io/ops-demo-330920/flask_telemetry:61a2a7aabc7077ef474eb24f4b69faeab47deed9 \
us-central1-docker.pkg.dev/qwiklabs-gcp-02-132189b82a78/docker-repo/flask-telemetry:v1
```

6. Run the following command to push the docker image to Artifact Registry:
    

```apache
docker push us-central1-docker.pkg.dev/qwiklabs-gcp-02-132189b82a78/docker-repo/flask-telemetry:v1
```

Click **Check my progress** to verify the objective.

Create a Docker repository

**Check my progress**

## Task 2. Setup a Google Kubernetes Engine cluster

In this task you deploy and authenticate a standard GKE cluster.

1. Run the following command to deploy a standard GKE cluster, which prompts you to authorize and enable the GKE API:
    

```apache
gcloud beta container clusters create gmp-cluster --num-nodes=1 --zone us-central1-c --enable-managed-prometheus
```

The cluster takes a couple minutes to create. Wait for the creation to finish then proceed to the next step.

2. Run the following command to authenticate to the cluster:
    

```apache
gcloud container clusters get-credentials gmp-cluster --zone us-central1-c
```

## Task 3. Deploy the Prometheus service

* Run the following command to create a namespace to do the work in:
    

```apache
kubectl create ns gmp-test
```

Click **Check my progress** to verify the objective.

Check if Prometheus has been deployed.

**Check my progress**

## Task 4. Deploy the application

1. Get the application which emits metrics at the `/metrics` endpoint:
    

```apache
wget https://storage.googleapis.com/spls/gsp1024/gmp_prom_setup.zip
unzip gmp_prom_setup.zip
cd gmp_prom_setup
```

2. In this step, you update `flask_deployment.yaml` to use the name of the image you pushed in previous steps:
    
    * Use nano to open `flask_deployment.yaml`:
        
    
    ```apache
    nano flask_deployment.yaml
    ```
    
    * Replace `<ARTIFACT REGISTRY IMAGE NAME>` with the following:
        
    
    ```apache
    us-central1-docker.pkg.dev/qwiklabs-gcp-02-132189b82a78/docker-repo/flask-telemetry:v1
    ```
    
    * Press CTRL+X, Y, then ENTER to save the updated file and close nano.
        
3. Deploy a simple application:
    

```apache
kubectl -n gmp-test apply -f flask_deployment.yaml
```

```apache
kubectl -n gmp-test apply -f flask_service.yaml
```

4. Verify that this simple Python Flask app is serving metrics with the following command:
    

```apache
url=$(kubectl get services -n gmp-test -o jsonpath='{.items[*].status.loadBalancer.ingress[0].ip}')
```

**Note:** The service must be fully deployed for the curl command to succeed.

```apache
curl $url/metrics
```

You should see the following output:

```apache
# HELP flask_exporter_info Multiprocess metric
# TYPE flask_exporter_info gauge
flask_exporter_info{version="0.18.5"} 1.0
```

**Note**: You may need to wait a while to see the required output. If you are not getting the expected output, re-run both the commands in this step.

5. Tell Prometheus where to begin scraping the metrics from by applying the PodMonitoring file:
    

```apache
kubectl -n gmp-test apply -f prom_deploy.yaml
```

6. Before finishing up here, generate some load on the application with a simple interaction with the app:
    

```apache
timeout 120 bash -c -- 'while true; do curl $(kubectl get services -n gmp-test -o jsonpath='{.items[*].status.loadBalancer.ingress[0].ip}'); sleep $((RANDOM % 4)) ; done'
```

This runs for 2 minutes, and when done, you can create a visualization of what this looks like!

Click **Check my progress** to verify the objective.

Check if the Flask application has been deployed.

**Check my progress**

## Task 5. Observe the app via metrics

In this last section, use `gcloud` to deploy a custom monitoring dashboard that shows the metrics from this application in a line chart.

1. In Cloud Shell, run the following script:
    

**Note:** Be sure to copy all of this code block.

```apache
gcloud monitoring dashboards create --config='''
{
  "category": "CUSTOM",
  "displayName": "Prometheus Dashboard Example",
  "mosaicLayout": {
    "columns": 12,
    "tiles": [
      {
        "height": 4,
        "widget": {
          "title": "prometheus/flask_http_request_total/counter [MEAN]",
          "xyChart": {
            "chartOptions": {
              "mode": "COLOR"
            },
            "dataSets": [
              {
                "minAlignmentPeriod": "60s",
                "plotType": "LINE",
                "targetAxis": "Y1",
                "timeSeriesQuery": {
                  "apiSource": "DEFAULT_CLOUD",
                  "timeSeriesFilter": {
                    "aggregation": {
                      "alignmentPeriod": "60s",
                      "crossSeriesReducer": "REDUCE_NONE",
                      "perSeriesAligner": "ALIGN_RATE"
                    },
                    "filter": "metric.type=\"prometheus.googleapis.com/flask_http_request_total/counter\" resource.type=\"prometheus_target\"",
                    "secondaryAggregation": {
                      "alignmentPeriod": "60s",
                      "crossSeriesReducer": "REDUCE_MEAN",
                      "groupByFields": [
                        "metric.label.\"status\""
                      ],
                      "perSeriesAligner": "ALIGN_MEAN"
                    }
                  }
                }
              }
            ],
            "thresholds": [],
            "timeshiftDuration": "0s",
            "yAxis": {
              "label": "y1Axis",
              "scale": "LINEAR"
            }
          }
        },
        "width": 6,
        "xPos": 0,
        "yPos": 0
      }
    ]
  }
}
'''
```

2. Once created, return to the console. In the title bar, type **Monitoring Dashboard** in the **Search** field, then click **Dashboards** in the search results.
    
3. Find the newly created **Prometheus Dashboard Example** in the **Dashboard** list. Click **Prometheus Dashboard** to see the **Prometheus Dashboard Example**.
    

Click **Check my progress** to verify the objective.

Check if the dashboard is created.

**Check my progress**

---

## Solution of Lab

### Quick

%[https://youtu.be/dYhjmyg36CI] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1024/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Using%20Prometheus%20for%20Monitoring%20on%20Google%20Cloud%3A%20Qwik%20Start/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```

---

### Manual

%[https://youtu.be/PtZLaWB-BAE]