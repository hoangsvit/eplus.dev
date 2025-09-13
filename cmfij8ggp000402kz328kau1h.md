---
title: "Debug Apps on Google Kubernetes Engine - GSP736"
seoTitle: "Debug Apps on Google Kubernetes Engine - GSP736"
seoDescription: "Learn how to debug applications on Google Kubernetes Engine using Cloud Logging and Monitoring, with practical steps and best practices"
datePublished: Sat Sep 13 2025 17:20:43 GMT+0000 (Coordinated Universal Time)
cuid: cmfij8ggp000402kz328kau1h
slug: debug-apps-on-google-kubernetes-engine-gsp736
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757783975714/5f49f613-e045-4219-a904-0031f4ccc50c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757784022141/2a8fa31c-3d61-405b-a6af-d95e174420be.png
tags: kubernetes, google-kubernetes-engine, google-kubernetes, debug-apps-on-google-kubernetes-engine-gsp736, debug-apps-on-google-kubernetes-engine, gsp736

---

## Overview

Cloud Logging, and its companion tool, Cloud Monitoring, are full featured products that are both deeply integrated into Google Kubernetes Engine (GKE). This lab teaches you how Cloud Logging works with GKE clusters and applications as well as some best practices for log collection through common logging use cases.

### Objectives

In this lab, you learn how to perform the following tasks:

* Use Cloud Monitoring to detect issues.
    
* Use Cloud Logging to troubleshoot an application running on GKE.
    

### The demo application used in the lab

To use a concrete example, you will troubleshoot a sample [microservices demo](https://github.com/GoogleCloudPlatform/microservices-demo) app deployed to a GKE cluster. In this demo app, there are many microservices and dependencies among them. You will generate traffic using a loadgenerator and then use Logging, Monitoring, and GKE to notice the error (alert/metrics), identify a root cause with Logging, and then fix/confirm the issue is fixed with Logging and Monitoring.

![Cloud Logging architecture diagram](https://cdn.qwiklabs.com/eqRuoUffBEQjVHqpX4Jw9i4CaLODvnZyOVd2JIOlpoA%3D align="left")

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
    student-02-9f9b35e6d3cb@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    hpgCLRdg0rtZ
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-6cc5b1fcaf73`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-6cc5b1fcaf73
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
ACCOUNT: student-02-9f9b35e6d3cb@qwiklabs.net

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
project = qwiklabs-gcp-00-6cc5b1fcaf73
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Perform infrastructure setup

Connect to a Google Kubernetes Engine cluster and validate that it's been created correctly.

1. Use the following command to see the cluster's status:
    

```apache
gcloud container clusters list
```

The cluster status will say PROVISIONING.

2. Wait a moment and run the above command again until the status is RUNNING. This could take several minutes.
    
3. Verify that the cluster named `central` has been created.
    

You can also monitor the progress in the Cloud console by navigating to **Navigation menu** &gt; **Kubernetes Engine** &gt; **Clusters**.

4. Once your cluster has a RUNNING status, run the following command to get the cluster credentials:
    

```apache
gcloud container clusters get-credentials central --zone us-west1-a
```

**Output:**

```apache
Fetching cluster endpoint and auth data.
kubeconfig entry generated for central.
```

5. Run the following command to verify that the nodes have been created:
    

```apache
kubectl get nodes
```

Your output should resemble the following.

**Output:**

```apache
NAME                                       STATUS    ROLES     AGE       VERSION
gke-central-default-pool-5ff4130f-qz8v    Ready    <none>   24d   v1.27.2-gke.1200
gke-central-default--pool-5ff4130f-ssd2   Ready    <none>   24d   v1.27.2-gke.1200
gke-central-default--pool-5ff4130f-tz63   Ready    <none>   24d   v1.27.2-gke.1200
gke-central-default--pool-5ff4130f-zfmn   Ready    <none>   24d   v1.27.2-gke.1200
</none></none></none></none>
```

### Enable Gemini Code Assist in the Cloud Shell IDE

You can use Gemini Code Assist in an integrated development environment (IDE) such as Cloud Shell to receive guidance on code or solve problems with your code. Before you can start using Gemini Code Assist, however, you need to enable it.

1. In Cloud Shell, enable the **Gemini for Google Cloud** API with the following command:
    

```apache
gcloud services enable cloudaicompanion.googleapis.com
```

2. Click **Open Editor** on the Cloud Shell toolbar.
    

**Note:** To open the Cloud Shell Editor, click **Open Editor** on the Cloud Shell toolbar. You can switch between Cloud Shell and the code Editor by clicking **Open Editor** or **Open Terminal**, as required.

3. In the Cloud Shell Editor, navigate to **Cloud Code &gt; Help and Feedback &gt; Change Settings**.
    
4. In the **Settings**, search for **Gemini Code Assist**.
    
5. Locate and ensure that the checkbox is selected for **Geminicodeassist: Enable**, and close the **Settings**.
    
6. Click **Cloud Code - No Project** in the status bar at the bottom of the screen.
    
7. Authorize the plugin as instructed. If a project is not automatically selected, click **Select a Google Cloud Project**, and choose `qwiklabs-gcp-00-6cc5b1fcaf73`.
    
8. Verify that your Google Cloud project (`qwiklabs-gcp-00-6cc5b1fcaf73`) displays in the Cloud Code status message in the status bar.
    

## Task 2. Deploy an application

Next, deploy a microservices application called Hipster Shop to your cluster to create a workload you can monitor.

1. Run the following command to clone the repo:
    

```apache
git clone https://github.com/xiangshen-dk/microservices-demo.git
```

2. Change to the `microservices-demo` directory with the following command:
    

```apache
cd microservices-demo
```

3. In the Cloud Shell Editor's file Explorer, navigate to **microservices-demo** &gt; **release** &gt; **kubernetes-manifests.yaml**.
    

You can use the AI-powered features of Gemini Code Assist to make changes to your code directly in your code editor. In this instance, you decide to let Gemini Code Assist help explain the **kubernetes-manifests.yaml** file to support the onboarding of a new member in your team.

4. Open the `kubernetes-manifests.yaml` file. This action enables Gemini Code Assist, as indicated by the presence of the icon in the upper-right corner of the editor.
    
5. Click the **Gemini Code Assist: Smart Actions** icon and select **Explain this**.
    
6. Gemini Code Assist opens a chat pane with the prefilled prompt of `Explain this`. In the inline text box of the Code Assist chat, replace the prefilled prompt with the following, and click **Send**:
    

```apache
As a Kubernetes Architect at Cymbal AI, provide a formal and comprehensive explanation of the kubernetes-manifests.yaml file for new team member onboarding.

Your explanation should:

* Detail the key components used in the configuration file
* Describe key Services and their functions
* Describe the common configuration elements
* Describe what the configuration deploys

For the suggested improvements, don't update this file.
```

The explanation for the code in the `kubernetes-manifests.yaml` file appears in the **Gemini Code Assist** chat.

7. Run the following command to install the app using `kubectl`:
    

```apache
kubectl apply -f release/kubernetes-manifests.yaml
```

8. Run the following command to confirm everything is running correctly:
    

```apache
kubectl get pods
```

The output should look similar to the output below.

**Output:**

```apache
NAME                                     READY     STATUS      RESTARTS     AGE
adservice-55f94cfd9c-4lvml               1/1       Running     0            20m
cartservice-6f4946f9b8-6wtff             1/1       Running     2            20m
checkoutservice-5688779d8c-l6crl         1/1       Running     0            20m
currencyservice-665d6f4569-b4sbm         1/1       Running     0            20m
emailservice-684c89bcb8-h48sq            1/1       Running     0            20m
frontend-67c8475b7d-vktsn                1/1       Running     0            20m
loadgenerator-6d646566db-p422w           1/1       Running     0            20m
paymentservice-858d89d64c-hmpkg          1/1       Running     0            20m
productcatalogservice-bcd85cb5-d6xp4     1/1       Running     0            20m
recommendationservice-685d7d6cd9-pxd9g   1/1       Running     0            20m
redis-cart-9b864d47f-c9xc6               1/1       Running     0            20m
shippingservice-5948f9fb5c-vndcp         1/1       Running     0            20m
```

9. Rerun the command until all pods are reporting a **Running** status before proceeding to the next step.
    

Click **Check my progress** to verify the objective.

Deploy an application

10. Run the following command to get the **external IP** of the application. This command only returns an IP address once the service has been deployed, so you may need to repeat the command until there's an external IP address assigned:
    

```apache
export EXTERNAL_IP=$(kubectl get service frontend-external | awk 'BEGIN { cnt=0; } { cnt+=1; if (cnt > 1) print $4; }')
```

11. Finally, execute the following command to confirm that the app is up and running:
    

```apache
curl -o /dev/null -s -w "%{http_code}\n"  http://$EXTERNAL_IP
```

Your confirmation should resemble the following output.

**Output:**

```apache
200
```

After the application is deployed, you can also go to the Cloud console and view the status.

In the **Kubernetes Engine &gt; Workloads** page, you'll see that all of the pods are OK.

![The Workloads page](https://cdn.qwiklabs.com/dCTTlAg8y%2BMvkLYOfsHV79gWaP8BVe128PjUchzgUIY%3D align="left")

12. Now, select **Gateways, Services & Ingress**, and then click on the **Services** tab to verify all services are OK. Stay on this screen to set up monitoring for the application.
    

## Task 3. Open the application

* Scroll down to **frontend-external** and click the Endpoints IP of the service.
    

![The Services and Ingress page displaying the highlighted frontend-external IP address](https://cdn.qwiklabs.com/CnDr%2Fjy1XOpf%2BxtzxDsBgMhN4isBLGZYUkiIp2cbblc%3D align="left")

It should open the application to display a page like the following:

![The Online Boutique web page displaying product tiles](https://cdn.qwiklabs.com/CJlTEQEyRcWnA3UPpBrAGeg7Q2WPwF8JroWIAmnYSw4%3D align="left")

## Task 4. Create a logs-based metric

In this task, you configure Cloud Logging to create a [logs-based metric](https://cloud.google.com/logging/docs/logs-based-metrics), which is a custom metric in Cloud Monitoring made from log entries. Logs-based metrics are good for counting the number of log entries and tracking the distribution of a value in your logs.

In this case, you use the logs-based metric to count the number of errors in your frontend service. You can then use the metric in both dashboards and alerting.

1. Return to the Cloud console, and from the **Navigation menu**, open **Logging**, then click **Logs Explorer**.
    

![The Logs Explorer page](https://cdn.qwiklabs.com/pnNTGP0vqkBcVcznTiUjudjCFDIGSjseLyc%2B8kKG0o8%3D align="left")

2. Enable **Show query** and in the **Query builder** box, add the following query:
    

```apache
resource.type="k8s_container"
severity=ERROR
labels."k8s-pod/app": "recommendationservice"
```

![The Query builder page displaying the three lines in the query above](https://cdn.qwiklabs.com/W5zrpKxGUw2fJJzO1PKVxvFnhxcShsohuvdCHKBkyE4%3D align="left")

3. Click **Run Query**.
    

The query you are using lets you find all errors from the frontend pod. However, you shouldn't see any results now since there are no errors yet.

4. To create the logs-based metric, click the **Actions** dropdown, and select **Create Metric**.
    

![The Create metric button displayed on the UI](https://cdn.qwiklabs.com/oVIsq3cZftNyAAThO6y0aqKRvssE8Qml8RE9EQ2Mqf4%3D align="left")

5. Name the metric **Error\_Rate\_SLI,** and click **Create Metric** to save the log-based metric:
    

![The Create logs metric dialog displaying the populated Log metric name field](https://cdn.qwiklabs.com/pT%2FCCIZQWU28sAXyNoHhRNeeuhwN7ZZ6eMtfA8E7XLM%3D align="left")

The metric is now listed under User-defined Metrics on the Logs-based Metrics page.

Click **Check my progress** to verify the objective.

Create a logs-based metric

## Task 5. Create an alerting policy

Alerting gives timely awareness to problems in your cloud applications so you can resolve the problems quickly.

In this task, you use Cloud Monitoring to monitor your frontend service availability by creating an alerting policy based on the frontend errors logs-based metric that you created previously. When the condition of the alerting policy is met, Cloud Monitoring creates and displays an incident in the Cloud console.

1. In the **Navigation menu**, open **Monitoring,** then click **Alerting**.
    
2. After the workspace is created, click **Create Policy** at the top.
    

**Note:** If required, click **Try It!** to use the updated alert creation flow.

3. Click on the **Select a metric** dropdown. Deselect the **Active** checkbox.
    
4. In the **filter by resource and metric name** field, type **Error\_Rate**.
    
5. Click on **Kubernetes Container &gt; Logs-Based Metric**. Select **logging/user/Error\_Rate\_SLI** and click **Apply**.
    

Your screen should look like this:

![The Select a metric page](https://cdn.qwiklabs.com/Gz8WQoQoHiiLKOdQZ65Jj4h%2FNyl0Eoy8chIpJoXxou0%3D align="left")

6. Set **Rolling windows function** to `Rate`.
    
7. Click **Next**.
    
8. Set **0.5** as your **Threshold value**.
    

As expected, there are no failures, and your application is meeting its availability Service Level Objective (SLO).

9. Click **Next** again.
    
10. Disable **Use notification channel**.
    
11. Provide an alert name such as `Error Rate SLI` then click **Next**.
    
12. Review the alert and click **Create Policy**.
    

**Note:** You will not create a notification channel for this lab but you should do it for your applications running in production, which allows you to send notifications in ways such as email, mobile app, SMS, Pub/Sub, and webhooks.

Click **Check my progress** to verify the objective.

Create an alerting policy

### Trigger an application error

In this section, you use a load generator to create some traffic for your web application. Since there is a bug that has been intentionally introduced into this version of the application, a certain amount of traffic volume triggers errors. You work through the steps to identify and fix the bug.

1. From the **Navigation menu**, select **Kubernetes Engine**, then **Gateways, Services & Ingress**, and click the **Services** tab.
    
2. Find the `loadgenerator-external` service, then click on the `endpoints` link.
    

![The Services and Ingress page open on the Services tabbed page, which displays the highlighted loadgenerator-external service and endpoints link.](https://cdn.qwiklabs.com/Jc%2Fvot4z%2FZOb54nIYnjYmyppC3LLm903uTiiJfCgKME%3D align="left")

Alternatively, you can open a new browser tab or window, copy/paste the IP to the URL field, for example: [`http://\[loadgenerator-external-ip\]`](http://\[loadgenerator-external-ip\]).

You should now be on the Locust load generator page:

![The Locust load generator page](https://cdn.qwiklabs.com/KYnJGu3AM6b1gbzam%2BA2oQx4pJLFGLdhxoGVWiF1YzM%3D align="left")

Locust is an open-source load generator, which allows you to load test a web app. It can simulate a number of users simultaneously hitting your application endpoints at a certain rate.

3. Simulate **300** users hitting the app with a hatch rate of **30**. Locust adds 30 users per second until it reaches 300 users.
    
4. For the host field, you use the `frontend-external`. Copy the URL from the Gateways, Services & Ingress page; be sure to exclude the port. For example:
    

![The Start new Locust swarm page displaying the Start swarming button](https://cdn.qwiklabs.com/VfHVzfR14oTKeil2PkbOl0ozSJqcFfvJWp%2BqRSLVhhA%3D align="left")

5. Click the **Start swarming** button. You should have about 300 users to hit the predefined URLs in a few seconds.
    

![The Statistics page displaying the list of 300 users](https://cdn.qwiklabs.com/Ncjbt1KMUPopuYiMIT%2BJWqpMSY%2BNXhvhwuw2vNCKks8%3D align="left")

6. Click on the **Failures** tab to see that there are failures starting to occur. You can see there are a large number of 500-errors.
    

![The Failures tabbed page](https://cdn.qwiklabs.com/fxsEwlryECSVQKjvHeugf%2FXpxz5sy3TvMI02PEi1q4o%3D align="left")

Meanwhile, if you click any product on the home page, it's either noticeably slow or you receive errors like the following if you click on a product:

![The Online Boutique displaying the HTTP Status error: 500 internal server error.](https://cdn.qwiklabs.com/ZdTffxzZfDLeT8y7VMRpa2i5QuXq8MHir6ShIEKAWcU%3D align="left")

### Confirm the alert and application errors

1. In the console, from the **Navigation menu**, click **Monitoring**, then **Alerting**. You should see an incident soon regarding **logging/user/Error\_Rate\_SLI**. If you don't see an incident right away, wait a minute or two and refresh your page. It can take up to 5 minutes for the alert to fire.
    
2. Click the link of the incident:
    

![The Alerting page displaying the incident link in the Incidents section](https://cdn.qwiklabs.com/hkaOqEoWcdyQ2JMEK3aGGBm9BUg7hhoWGojs0m%2BLhUc%3D align="left")

It brings you to the details page.

3. In the Logs section, click **View in Logs Explorer** and select the project ID from the dropdown to view pod logs.
    

![The Incident metrics page displaying the highlighted View logs button](https://cdn.qwiklabs.com/K1%2Bi980EqiwKC8Fa4qYlYArDbR8hVPuppIpiRj5dtzU%3D align="left")

4. You can also click the **Error** label in the Logs field explorer panel to only query the errors.
    

Alternatively, you can click into the Query preview field to show the query builder, then click the **Severity** dropdown, add **Error** to the query. Click the **Add** button, then click **Run Query**. The dropdown menu allows adding multiple severity values.

The result either way is adding `severity=ERROR` to your query. Once you do that, you should have all the errors for the recommendationservice pod.

![The Logs Explorer page open on the Query builder tabbed page, displaying a list of errors in the Query results section](https://cdn.qwiklabs.com/QxSHyLaFhbUtyuH4ePMvmkbYePm93WwYCfpws1nKK3M%3D align="left")

5. View the error details by expanding an error event. For example:
    

![The expanded Connect Failed query result](https://cdn.qwiklabs.com/63L7h%2BSQpBUtwOHTcoutblm06iIzLmYqIoPpTOKVOCU%3D align="left")

6. Expand the `textPayload`.
    
7. Click the error message and select **Add field to summary line** to have the error messages appearing as a summary field:
    

![The Add field to summary line option hihglighted in the expanded error message menu](https://cdn.qwiklabs.com/lPF4%2F%2Fx3CQgcX%2F4e8kHQNkhwh0qdcKEBMgVNtpYWGn0%3D align="left")

From there, you can confirm there are indeed many errors for the `RecommendationService` service. Based on the error messages, it appears the `RecommendationService` couldn't connect to some downstream services to either get products or recommendations. However, it's still not clear what the root cause is for the errors.

If you revisit the architecture diagram, the **RecommendationService** provides a list of recommendations to the **Frontend** services. However, both the **Frontend** service and the **RecommendationService** invoke **ProductCatalogService** for a list of products.

![The architecture diagram with the highlighted ProductCatalogService and RecomendationService categories.](https://cdn.qwiklabs.com/tMNwCX5zWS3uk4DX%2FKjuwIgNv8xO36qKc3bteUCvviQ%3D align="left")

For the next step, you will look at the metrics of the main suspect, the **ProductCatalogService**, for any anomalies. Regardless, you can drill down in the logs to get some insights.

### Troubleshoot using the Kubernetes dashboard & logs

1. One of the first places that you can look at the metrics is the [Kubernetes Engine](https://console.cloud.google.com/monitoring/dashboards/resourceList/kubernetes) section of the Monitoring console (**Navigation menu** &gt; **Monitoring**&gt; **Dashboards** &gt; **GKE**).
    
2. View the **Workloads** section.
    
3. Navigate to **Kubernetes Engine** &gt; **Workloads** &gt; **productcatalogservice**. You can see the pod for the service is constantly crashing and restarting.
    

![The Active Revisions section highlighted on the Deployment details page](https://cdn.qwiklabs.com/DbPgW3yWG7Glzn20yrv9WnapPgYWATHJGY3BAG%2F9P3E%3D align="left")

Next, see if there is anything interesting in the logs.

There are 2 ways to easily get to your container logs:

4. Click on the **Logs** tab to get a quick view of the most recent logs. Next, click the external link button in the upper right corner of the logs panel to go back to the Logs Explorer.
    

![The Logs tabbed page](https://cdn.qwiklabs.com/QuZmp7BZMi0nqkkOFEiSRomB%2FsZmXlZZx9krmzy2Zzg%3D align="left")

5. In the overview page, click the **Container logs** link on the Deployment Details page.
    

![The Container logs link highlighted on the Deployment Details page](https://cdn.qwiklabs.com/hM4hJkKbJiAF58IL8XywgUXL1q4qpXYInJQtoQ4EtIw%3D align="left")

You are on the Logs Explorer page again, now with a predefined query specifically filtered for the logs from the container you were viewing in GKE.

From the Log Viewer, both the log messages and the histogram show the container is repeatedly parsing product catalogs within a short period of time. It seems very inefficient.

At the bottom of the query results, there might also be a runtime error like the following one:

```apache
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation
```

This could actually be causing the pod to crash.

To better understand the reason, search the log message in the code.

6. In Cloud Shell terminal, run the following command:
    

```apache
grep -nri 'successfully parsed product catalog json' src
```

Your output should look like the following, which has the source file name with a line number.

**Output:**

```apache
src/productcatalogservice/server.go:237:        log.Info("successfully parsed product catalog json")
```

7. To view the source file, by clicking the **Open Editor** button in the Cloud Shell menu, then **Open in New Window** (if you see the Unable to load code editor because third-party cookies are disabled error, click the eye at the top of the Chrome page).
    

![The Open Editor button highlighted in the UI](https://cdn.qwiklabs.com/FSDqao0b0m16GSMgPkmvkhS%2FNTcCfljPx5XojXOUy1c%3D align="left")

8. Click the file `microservices-demo/src/productcatalogservice/server.go`, scroll down to line 237, and you will find the **readCatalogFile** method logs this message:
    

![The message: log.Info("successfully parsed product catalog json") return nil](https://cdn.qwiklabs.com/PyVxVoCEbE%2FHZSCWsvXg2CC8SC24ZDrJjOxzC%2Fc%2B%2F4Y%3D align="left")

With a little more effort, you can see that if the boolean variable **reloadCatalog** is true, the service reloads and parses the product catalog each time it's invoked, which seems unnecessary.

If you search the **reloadCatalog** variable in the code, you can see it's controlled by the environment variable `ENABLE_RELOAD` and writes a log message for its state.

![The log message for the reloadCatalog state](https://cdn.qwiklabs.com/qy2ap9hP7UlWCISKeIZKChXQPToqad7EljCe%2Bww4I5Q%3D align="left")

9. With the `server.go` file open and Gemini Code Assist enabled in the IDE, notice the presence of the
    
    ![Gemini Code Assist: Smart Actions](https://cdn.qwiklabs.com/gOZl64uNZDcpgv888NgM95e8hoizE%2B8%2BMczF%2FmWfw3Y%3D align="left")
    
    icon in the upper-right corner of the editor.
    

In this instance, you decide to ask Gemini Code Assist for help explaining the server implementation to your new team member.

10. Click the **Gemini Code Assist: Smart Actions** icon and select **Explain this**.
    
11. Gemini Code Assist opens a chat pane with the prefilled prompt of `Explain this`. In the inline text box of the Code Assist chat, replace the prefilled prompt with the following, and click **Send**:
    

```apache
You are a Kubernetes Architect at Cymbal AI. A new team member is unfamiliar with this server implementation. Explain this server.go file in detail, breaking down its key components used in the code. 

For the suggested improvements, don't update this file.
```

The explanation for the code in the `server.go` file appears in the **Gemini Code Assist** chat.

Check the logs again by adding a message to your query and determine if there are any entries that exist.

12. Return to the tab where Logs Explorer is open and add the following line to the query:
    

```apache
jsonPayload.message:"catalog reloading"
```

So the full query in your query builder is as follows:

```apache
resource.type="k8s_container"
resource.labels.location="us-west1-a"
resource.labels.cluster_name="central"
resource.labels.namespace_name="default"
labels.k8s-pod/app="productcatalogservice"
jsonPayload.message:"catalog reloading"
```

13. Click **Run Query** again and find an "Enable catalog reloading" message in the container log. This confirms that the catalog reloading feature is enabled.
    

![The Enable catalog reloading message in the container log](https://cdn.qwiklabs.com/LBrGJqsrcmIPJoHylZOKruIcjzWWWciLwAFPZvCKyt0%3D align="left")

At this point you can be certain the frontend error is caused by the overhead to load the catalog for every request. When you increased the load, the overhead caused the service to fail and generate the error.

## Task 6. Fix the issue and verify the result

Based on the code and what you're seeing in the logs, you can try to fix the issue by disabling catalog reloading.

In this task, you remove the `ENABLE_RELOAD` environment variable for the product catalog service. Once you make the variable changes, you redeploy the application and verify that the changes have addressed the observed issue.

1. Click the **Open Terminal** button to return to the Cloud Shell terminal if it has closed.
    
2. Run the following command:
    

```apache
grep -A1 -ni ENABLE_RELOAD release/kubernetes-manifests.yaml
```

The output shows the line number of the environment variable in the manifest file.

**Output:**

```apache
373:        - name: ENABLE_RELOAD
374-          value: "1"
```

3. Delete those two lines to disable the reloading by running the following command:
    

```apache
sed -i -e '373,374d' release/kubernetes-manifests.yaml
```

4. Then run the following command to reapply the manifest file:
    

```apache
kubectl apply -f release/kubernetes-manifests.yaml
```

You should notice that only the **productcatalogservice** is configured. The other services are unchanged.

5. Return to the Deployment detail page (**Navigation menu** &gt; **Kubernetes Engine** &gt; **Workloads** &gt; **productcatalogservice**), and wait until the pod runs successfully. Wait 2-3 minutes or until you can confirm it stops crashing.
    

![The Deployment details page displaying the highlighted Active revisions section](https://cdn.qwiklabs.com/lVA7aZKviZQLRRohVWGYfoxpeHqNKWmUfCtsw7q4mRU%3D align="left")

6. If you click the **Container logs** link again, note that the repeating `successfully parsing the catalog json` messages are gone:
    

![The Query builder page](https://cdn.qwiklabs.com/7q2qoOrROw5OhuDhgQPEHGHZ%2FXeSw2E11oyAEXdUgVs%3D align="left")

7. If you go back to the webapp URL and click the products on the home page, it's also much more responsive and you shouldn't encounter any HTTP errors.
    
8. Go back to the load generator, click the **Reset Stats** button in the top right. The failure percentage is reset and you should not see it increasing anymore.
    

![The failure percentage displaying 0 percent](https://cdn.qwiklabs.com/BGsaWaM%2BnKrfmTi2SqszNDlvOrWhXjLOfXcVM0hRfBQ%3D align="left")

All these checks indicate that the issue is fixed. If you are still seeing the 500-error, wait another couple of minutes and try clicking on a product again.

---

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP736/lab.sh
source lab.sh
```

---

### Manual

%[https://youtu.be/PC64-5wuzIg]