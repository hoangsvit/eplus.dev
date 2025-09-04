---
title: "Creating and Alerting on Logs-based Metrics - GSP091"
seoTitle: "Creating and Alerting on Logs-based Metrics - GSP091"
seoDescription: "Log-based metrics are Cloud Monitoring metrics that are based on the content of log entries. These metrics can help you identify trends, extract numeric val"
datePublished: Tue Aug 06 2024 10:07:56 GMT+0000 (Coordinated Universal Time)
cuid: clzi9blq9001509lbahfoh96s
slug: creating-and-alerting-on-logs-based-metrics-gsp091
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752475284279/441457e3-bb08-4584-93a6-df925f2f0202.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752475302475/8a8db8c4-05ba-4fa5-8139-5c7aab4054eb.png
tags: creating-and-alerting-on-logs-based-metrics-gsp091, gsp091, creating-and-alerting-on-logs-based-metrics

---

## **Overview**

[Log-based metrics](https://cloud.google.com/logging/docs/logs-based-metrics) are [Cloud Monitoring](https://cloud.google.com/monitoring/docs/) metrics that are based on the content of log entries. These metrics can help you identify trends, extract numeric values out of the logs, and set up an alert when a certain log entry occurs by creating a metric for that event. You can use both system and user-defined log-based metrics in Cloud Monitoring to create charts and alerting policies.google

The log-based metrics interface is divided into two metric-type panes: System metrics and User-defined metrics.

[**System-defined log-based metrics**](https://cloud.google.com/logging/docs/logs-based-metrics#system_log-based_metrics) are provided by Cloud Logging for use by all Google Cloud projects.They calculated only from logs that have been ingested by Logging. If a log has been explicitly [excluded](https://cloud.google.com/logging/docs/routing/overview#exclusions) from ingestion, it isn't included in these metrics.

[**User-defined log-based metrics**](https://cloud.google.com/logging/docs/logs-based-metrics#user-metrics) are created by you to track things in your Google Cloud project. For example, you might create a log-based metric to count the number of log entries that match a given filter.

Creating an alert from a metric lets you create an alerting policy based on the log-based metric.

**Objectives**

In this lab you will learn how to:

* Create a log-based alert
    
* Create a system-defined log-based metric
    
* Create a user-defined log-based metric
    
* Create an alert for the user-defined log-based metric
    

### **Task 1. Log-based alert**

Log-based alerts notify you whenever a specific message appears in your logs. Try it out by setting up a log-based alert to tell you when a VM stops running.

1. From Cloud Console, in the Search bar, type in “logs explorer”, then click on the **Logs Explorer** result.
    
2. Click the **Show Query** slide bar.
    
3. Enter the following parameters to create Log Based Alert:
    

```apache
resource.type="gce_instance" protoPayload.methodName="v1.compute.instances.stop"
```

4. Click **Create alert** link.
    
5. Add the following parameters, click **Next** to move to the next parameter.
    

* **Alert name:** stopped vm
    
* **Choose logs to include in the alert:** will auto-fill with the query you entered
    
* **Set notification frequency and autoclose duration:** Time between notifications is `5 min` and Incident autoclose duration is `1 hr`. Click **Next**.
    

**Who should be notified (optional):**

* Click on the dropdown arrow next to **Notification Channels**, then click on **Manage Notification Channels**.
    
* A Notification channels page will open in the new tab.
    
* Scroll down the page and click on **ADD NEW** for **Email**.
    
* Enter your personal email in the **Email Address** field and a **Display name**.
    
* Click **Save**.
    
* When done, return to the Logs Explorer tab you were in previously.
    
* Refresh the Notification Channels, then select the channel you just created. Click **OK**.
    

6. Click **Save**.
    

Click **Check my progress** to verify the objective.

Create the Log-based alert

**Check my progress**

You will now cause your VM to stop.

7. Go to the 2nd Cloud Console tab, and navigate to **Navigation menu** &gt; **Compute Engine** &gt; **VM instances**.
    
8. Check the box next to **instance1**, then click **Stop** at the top of the page, then click **Stop** again in the pop-up window. The green check mark will turn to a gray circle when the instance has been stopped.
    
9. In the Search bar, type "monitoring", then choose the **Monitoring** option.
    
10. Click on the **Alerting** tab. You'll see that your alert has registered. Under Alert Policies click the **See all policies** link and you'll see the log-based alert you created listed.
    

### **Task 2. Log-based metric**

Using log-based metrics you can define a metric that tracks errors in the logs to proactively respond to similar problems and symptoms before they are noticed by end users.

1. At the beginning of the lab you deployed a standard GKE cluster. Run the following command to ensure that the cluster named `gmp-cluster` has been created:
    

```apache
gcloud container clusters list
```

If your cluster status says PROVISIONING, wait a moment and run the command above again. Repeat until the status is RUNNING.

2. Authenticate the cluster:
    

```apache
gcloud container clusters get-credentials gmp-cluster
```

You should see the following message:

```apache
Fetching cluster endpoint and auth data.
kubeconfig entry generated for gmp-cluster.
```

3. Create a namespace to work in:
    

```apache
kubectl create ns gmp-test
```

4. Now run the following to deploy a simple application that emits metrics at the `/metrics` endpoint:
    

```apache
kubectl -n gmp-test apply -f https://storage.googleapis.com/spls/gsp091/gmp_flask_deployment.yaml
```

```apache
kubectl -n gmp-test apply -f https://storage.googleapis.com/spls/gsp091/gmp_flask_service.yaml
```

5. Verify that the namespace is ready and emitting metrics:
    

```apache
kubectl get services -n gmp-test
```

You should see the following:

```apache
NAME    TYPE           CLUSTER-IP    EXTERNAL-IP    PORT(S)        AGE
hello   LoadBalancer   10.0.12.114   34.83.91.157   80:32058/TCP   71s
```

Click **Check my progress** to verify the objective.

Deploy the simple application that emits metrics

**Check my progress**

6. Re-run the command until you see the **External-IP** address populated.
    
7. Check that the Python Flask app is serving metrics with the following command:
    

```apache
curl $(kubectl get services -n gmp-test -o jsonpath='{.items[*].status.loadBalancer.ingress[0].ip}')/metrics
```

You should see the following:

```apache
# HELP flask_exporter_info Multiprocess metric
# TYPE flask_exporter_info gauge
flask_exporter_info{version="0.18.5"} 1.0
```

### **Task 3. Create a log-based metric**

1. Return to **Logs Explorer**.
    
2. Click **Create metric** link.
    
3. On the Create metric page, input the following:
    

* **Metric type:** leave the default setting, Counter
    
* **Log based metric name:** hello-app-error
    
* **Filter selection:** update the following into the Build filter:
    

```apache
severity=ERROR
resource.labels.container_name="hello-app"
textPayload: "ERROR: 404 Error page not found"
```

4. Click **Create metric**.
    

Click **Check my progress** to verify the objective.

Create the log-based metric

**Check my progress**

### **Task 4. Create a metrics-based alert**

1. In the left pane of **Logging** window select **Log-based Metrics**. Then in user-defined metrics click on **3 vertical dots** next to metrics and select **Create alert from metric**.
    
2. Under **Select a Metric**, the metric parameters will automatically fill in.
    

* Update the Rolling window to **2 min**.
    
* Accept the other default settings
    
* Click **Next**.
    

3. You will need to set Notifications. Feel free to re-use the channel you created earlier in the lab.
    
4. Name the alert policy `log based metric alert`.
    
5. Click **Create Policy**.
    

Click **Check my progress** to verify the objective.

Create the metrics-based alert

**Check my progress**

### **Task 5. Generate some errors**

Next you'll generate some errors to match the log-based metric you created and trigger the metric-based alert.

1. In Cloud Shell, run the following to generate some errors:
    

```apache
timeout 120 bash -c -- 'while true; do curl $(kubectl get services -n gmp-test -o jsonpath='{.items[*].status.loadBalancer.ingress[0].ip}')/error; sleep $((RANDOM % 4)) ; done'
```

2. Return to the **Logs Explorer** page, and go to the Severity section on the lower left side. Click on the **Error** severity. Now you can search for the `404 Error page not found` error. View more information by expanding one of the 404 Error messages.
    
3. Return to the **Monitoring** page, and click on **Alerting**. You will see the 2 policies you created.
    
4. Click on the **Alert policies** link, and you should see both alerts in the Incidents section. Click on an incident to see details.
    

**Note:** The log-based metric alert will eventually resolve itself. If you need more time to investigate, run the errors script again and wait for the alert to be triggered again.

Click **Check my progress** to verify the objective.

---

### Solution of Lab

### New solution

%[https://youtu.be/X4OMbwDZMQ0] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP091/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Creating%20and%20Alerting%20on%20Logs%20based%20Metrics/techcps091.sh
sudo chmod +x techcps091.sh
./techcps091.sh
```

---

### Old solution

%[https://www.youtube.com/watch?v=JOraHiLLpWQ] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736418741820/b2212c93-6fc5-4bc6-9fb4-d6834f94dd0c.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Creating%20and%20Alerting%20on%20Logs%20based%20Metrics/quicklabgsp091.sh
sudo chmod +x quicklabgsp091.sh
./quicklabgsp091.sh
```