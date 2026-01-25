---
title: "Reduce Costs for the Managed Service for Prometheus - GSP1027"
seoTitle: "Reduce Costs for the Managed Service for Prometheus - GSP1027"
seoDescription: "The Google Cloud Managed Service for Prometheus charges for the number of samples ingested into Cloud Monitoring and for read requests to the Monitoring API"
datePublished: Sun Feb 23 2025 08:06:36 GMT+0000 (Coordinated Universal Time)
cuid: cm7hchsb6000008jsh6oqe0p9
slug: reduce-costs-for-the-managed-service-for-prometheus-gsp1027
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740297740723/77bb07fd-6feb-4841-a253-dc45bb9501e2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740297985004/ca0e4b58-0365-4dd5-8f57-b07de1819c8b.png
tags: reduce-costs-for-the-managed-service-for-prometheus-gsp1027, reduce-costs-for-the-managed-service-for-prometheus, gsp1027

---

## **Overview**

The Google Cloud Managed Service for Prometheus charges for the number of samples ingested into Cloud Monitoring and for read requests to the Monitoring API. The number of samples ingested is the primary contributor to your cost.

In this lab, you will explore cost control mechanisms when utilizing the Managed Service for Prometheus on Google Cloud.

### Objectives

In this lab, you will learn how to:

* Deploy Google Managed Prometheus (GMP) in a Google Kubernetes Engine (GKE) cluster as well as a python application
    
* Reduce the number of time series metrics you send to the managed service by filtering the metric data generated
    
* Reduce the number of samples collected by changing the scraping interval
    

## **Setup and requirements**

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
    student-04-fd3afa752120@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    BFfVYXoaTzlx
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-a2adadf53955`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-a2adadf53955
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
ACCOUNT: student-04-fd3afa752120@qwiklabs.net

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
project = qwiklabs-gcp-02-a2adadf53955
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Deploy GKE cluster**

* Deploy a basic GKE cluster to setup lab:
    

```apache
gcloud beta container clusters create gmp-cluster --num-nodes=1 --zone us-west1-b --enable-managed-prometheus
```

```apache
gcloud container clusters get-credentials gmp-cluster --zone=us-west1-b
```

## **Task 2. Deploy managed collection**

### Configure a PodMonitoring resource

The following manifest defines a PodMonitoring resource, `prom-example`, in the `gmp-test` namespace. The resource uses a [Kubernetes label selector](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) to find all pods in the namespace that have the label `app` with the value `prom-example`. The matching pods are scraped on a port named `metrics`, every 30 seconds, on the `/metrics` HTTP path.

```apache
apiVersion: monitoring.googleapis.com/v1
kind: PodMonitoring
metadata:
  namespace: gmp-system
  name: collector
  labels:
    app.kubernetes.io/name: collector
    app.kubernetes.io/part-of: google-cloud-managed-prometheus
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: collector
  endpoints:
  - port: prom-metrics
    interval: 10s
  - port: cfg-rel-metrics
    interval: 10s
```

* To apply this resource, run the following command:
    

```apache
kubectl -n gmp-system apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/main/examples/self-pod-monitoring.yaml
```

Your managed collector is now scraping the matching pods.

### Deploy the example application

The managed service provides a manifest for an example application that emits Prometheus metrics on its metrics port. The application uses three replicas.

* To deploy the example application, run the following command:
    

```apache
kubectl -n gmp-system apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/prometheus-engine/main/examples/example-app.yaml
```

Check if prometheus has been deployed

Check my progress

## **Task 3. Cloud Monitoring**

To view your Managed Service for Prometheus data as Cloud Monitoring time series, use Metrics Explorer. To configure Metrics Explorer to display metrics, do the following:

1. From the Cloud console, go to [**Monitoring**](https://console.cloud.google.com/monitoring?_ga=2.255227912.1612871264.1645420386-1509336292.1645420386).
    
2. In the Monitoring navigation pane, click
    
    ![Metrics Explorer icon](https://cdn.qwiklabs.com/Rd3QMg5clsBgSodXWSOpGVRtOQGoEgukd4ielzJjEz0%3D align="left")
    
    **Metrics Explorer**.
    
3. Specify the data to appear on the chart. You can use the **MQL** editor to do so.
    
    * To use the MQL tab, do the following:
        
        a. Click **PromQL** from the top right and select the **MQL** radio option in a new **Query**.
        
        b. Enter the following query:
        
        ```apache
        fetch prometheus_target::prometheus.googleapis.com/up/gauge
        ```
        
        c. Click **Run Query**.
        

## **Task 4. Populate a Graph**

* Go to **Monitoring &gt; Metrics Explorer** and create another **Query**.
    
* Select the **PromQL** radio option and run the query below by clicking **Run Query** to see metrics:
    

```apache
go_memstats_heap_alloc_bytes
```

This will populate a graph similar to the image below when selected.

![promql_query](https://cdn.qwiklabs.com/5Z9cyAAUUikx6ircisphAokTZGNVB0FAcNJfLyd9H2I%3D align="left")

## **Task 5. Filter exported metrics**

If you collect a lot of data, you might want to prevent some time series from being sent to Managed Service for Prometheus to keep costs down.

To filter exported metrics, you can configure a set of [PromQL series selectors](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors) in the [OperatorConfig resource](https://github.com/GoogleCloudPlatform/prometheus-engine/blob/v0.2.3/doc/api.md#operatorconfig). A time series is exported to Managed Service for Prometheus if it satisfies at least one of the selectors.

1. Open the `OperatorConfig` resource for editing:
    

```apache
kubectl -n gmp-public edit operatorconfig config
```

2. After the apiVersion line, press "**i**" to go into insert mode. Go to the final line and press **enter** to go to a new line. Ensure there are no indents at the beginning of the line. Then paste the following:
    

```apache
collection:
  filter:
    matchOneOf:
    - '{job="prom-example"}'
    - '{__name__=~"job:.+"}'
```

The file should look like the following:

![Operator config code](https://cdn.qwiklabs.com/zNkMWtC5t6Spw72Ecih%2FAteXwse0fVqVos9pq%2F5RBKg%3D align="left")

3. To save the file and exit press "**Esc**" then type "**:wq**" then **enter**.
    

This addition causes only metrics for the "prometheus" job as well as metrics produced by recording rules that aggregate to the job level—when following naming [best practices](https://prometheus.io/docs/practices/rules/#naming-and-aggregation)—to be exported. Samples for all other time series are filtered out. By default, no selectors are specified and all time series are exported.

The `filter.matchOneOf` configuration section has the same semantics as the match\[\] parameters for Prometheus federation.

4. Create a `op-config.yaml` file:
    

```apache
vi op-config.yaml
```

5. Copy the following into the `op-config.yaml` file:
    

```apache
apiVersion: monitoring.googleapis.com/v1alpha1
collection:
  filter:
    matchOneOf:
    - '{job="prom-example"}'
    - '{__name__=~"job:.+"}'
kind: OperatorConfig
metadata:
  annotations:
    components.gke.io/layer: addon
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"monitoring.googleapis.com/v1alpha1","kind":"OperatorConfig","metadata":{"annotations":{"components.gke.io/layer":"addon"},"labels":{"addonmanager.kubernetes.io/mode":"Reconcile"},"name":"config","namespace":"gmp-public"}}
  creationTimestamp: "2022-03-14T22:34:23Z"
  generation: 1
  labels:
    addonmanager.kubernetes.io/mode: Reconcile
  name: config
  namespace: gmp-public
  resourceVersion: "2882"
  uid: 4ad23359-efeb-42bb-b689-045bd704f295
```

6. Upload the config file you created to verify:
    

```apache
export PROJECT=$(gcloud config get-value project)
```

```apache
gsutil mb -p $PROJECT gs://$PROJECT
```

```apache
gsutil cp op-config.yaml gs://$PROJECT
```

```apache
gsutil -m acl set -R -a public-read gs://$PROJECT
```

Check if metrics filter has been applied

Check my progress

## **Task 6. Run the query**

1. Click **\+ Add query** to create a new **Query** and type `up/gauge` into the **Select a metric** input filter.
    
2. Select the resulting prometheus metric and select **Apply**.
    

## **Task 7. Monitor the app**

1. Create a prom-example-config.yaml file you created to verify:
    

```apache
vi prom-example-config.yaml
```

2. Copy the following into the file:
    

```bash
apiVersion: monitoring.googleapis.com/v1alpha1
kind: PodMonitoring
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"monitoring.googleapis.com/v1alpha1","kind":"PodMonitoring","metadata":{"annotations":{},"labels":{"app.kubernetes.io/name":"prom-example"},"name":"prom-example","namespace":"gmp-test"},"spec":{"endpoints":[{"interval":"30s","port":"metrics"}],"selector":{"matchLabels":{"app":"prom-example"}}}}
  creationTimestamp: "2022-03-14T22:33:55Z"
  generation: 1
  labels:
    app.kubernetes.io/name: prom-example
  name: prom-example
  namespace: gmp-test
  resourceVersion: "2648"
  uid: c10a8507-429e-4f69-8993-0c562f9c730f
spec:
  endpoints:
  - interval: 60s
    port: metrics
  selector:
    matchLabels:
      app: prom-example
status:
  conditions:
  - lastTransitionTime: "2022-03-14T22:33:55Z"
    lastUpdateTime: "2022-03-14T22:33:55Z"
    status: "True"
    type: ConfigurationCreateSuccess
  observedGeneration: 1
```

3. Run the below commands in the cloud shell.
    

```apache
export PROJECT=$(gcloud config get-value project)
```

```apache
gsutil cp prom-example-config.yaml gs://$PROJECT
```

```apache
gsutil -m acl set -R -a public-read gs://$PROJECT
```

Check if scrape interval has been changed

---

## Solution of Lab

### **Solution 1:**

%[https://youtu.be/bm8BpN1dUSk] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Reduce%20Costs%20for%20the%20Managed%20Service%20for%20Prometheus/gsp1027.sh
sudo chmod +x gsp1027.sh
./gsp1027.sh
```

---

### Solution 2:

%[https://youtu.be/0q6wvdfXcJc] 

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Reduce%20Costs%20for%20the%20Managed%20Service%20for%20Prometheus/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```