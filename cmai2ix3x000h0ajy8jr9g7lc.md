---
title: "Monitoring and Logging for Cloud Run Functions - GSP092"
seoTitle: "Monitoring and Logging for Cloud Run Functions - GSP092"
seoDescription: "In this lab you use Cloud Monitoring to view Cloud Run functions details in the Google Cloud console. The Cloud Run function details include execution times"
datePublished: Sat May 10 2025 10:14:26 GMT+0000 (Coordinated Universal Time)
cuid: cmai2ix3x000h0ajy8jr9g7lc
slug: monitoring-and-logging-for-cloud-run-functions-gsp092
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746872037861/aa367427-9cbf-40d6-a189-ed9b70e38bdc.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1746872053364/241683eb-18cf-4c73-a22b-c7953c2905af.png
tags: monitoring-and-logging-for-cloud-run-functions-gsp092, monitoring-and-logging-for-cloud-run-functions, gsp092

---

## Overview

In this lab you use Cloud Monitoring to view Cloud Run functions details in the Google Cloud console. The Cloud Run function details include execution times and counts, and memory usage.

## Objectives

In this lab, you learn how to perform the following tasks:

* Create a Cloud Run function.
    
* Create logs-based metric for a Cloud Run function.
    
* Use Metrics Explorer to view data for your Cloud Run function.
    
* Create charts on the Monitoring Overview window.
    

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
    student-04-de4a31bb3c44@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    lbRrxrwZuRMH
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-32908bfadb19`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-32908bfadb19
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
ACCOUNT: student-04-de4a31bb3c44@qwiklabs.net

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
project = qwiklabs-gcp-04-32908bfadb19
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Viewing Cloud Run function logs & metrics in Cloud Monitoring

Before you collect logs and alerts, you need something to monitor. In this section, you create a Hello World Cloud Run function to monitor.

1. In the Cloud console, select **Navigation menu** () &gt; **Cloud Run**, and then click **Write a Function**.
    
2. Set the following:
    
    * **Service Name:** `helloworld`
        
    * **Region:** `us-east4`
        
    * **Runtime:** Node.js 22
        
    * **Authentication:** select radio button next to **Allow unauthenticated invocations**
        
3. Expand **Container(s), Volumes, Networking, Security** and set the following:
    
    * **Execution environment:** select **second generation**.
        
    * **Revision scaling**, set the **Maximum number of instances** to **5**.
        
4. Leave the rest of the fields as default. Click **Create**.
    

**Note:** A helpful popup may appear to validate the required APIs are enabled in the project. Click the **Enable** button when requested.

5. Click **Save and Redeploy**.
    

The function automatically deploys and is listed on the Cloud Run function page. This takes a few minutes. When you see a green check mark next to the name, the Cloud Run function is complete.

**Test completed task**

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will be granted an assessment score.

Please create a cloud function with desired configurations. If already done wait till it is deployed.'

Creating a Cloud Run function

**Check my progress**

*Please create a cloud function with desired configurations. If already done wait till it is deployed.'*

6. Open a new Cloud Shell window by clicking the **Activate Cloud Shell** at the top of the Google Cloud console.
    
7. In Cloud Shell, run the following to get a tool called **vegeta** that will let you send some test traffic to your Cloud Run function:
    

```apache
curl -LO 'https://github.com/tsenart/vegeta/releases/download/v12.12.0/vegeta_12.12.0_linux_386.tar.gz'
```

8. Unpack the **vegeta** tool by running the following:
    

```apache
tar -xvzf vegeta_12.12.0_linux_386.tar.gz
```

9. On the Cloud Run page, click your function name, then click the helloworld **URL** for your function.
    

If you see `Hello World!` in the new browser tab that opens, you're up and running!

10. Set and verify the Cloud Run URL link:
    

```apache
CLOUD_RUN_URL=$(gcloud run services describe helloworld --region=us-east4 --format='value(status.url)')
echo $CLOUD_RUN_URL
```

11. Now send traffic to your Cloud Run function:
    

```apache
echo "GET $CLOUD_RUN_URL" | ./vegeta attack -duration=300s -rate=200 > results.bin
```

12. Keep this running in the background while you complete the next sections.
    

## Task 2. Create a logs-based metric

Now you'll create a Distribution type logs based metric to extract the value of latency from the log entries `httpRequest.latency` field.

1. In the console, select **Navigation menu** &gt; **View All Products** &gt; **Observability** &gt; **Logging** &gt; **Logs Explorer**. The Cloud Logging opens in the console.
    
2. To look at just the logs from your Cloud Run function, in the **All resources** dropdown, select **Cloud Run Revision** &gt; **helloWorld** then click **Apply**.
    
3. Click **Run query**.
    
4. In Actions dropdown click **Create metric**.
    
5. In the Create log-based metric form:
    

* Change the Metric Type to **Distribution**.
    
* In Log-based metric name enter **CloudRunFunctionLatency-Logs**.
    
* Enter `httpRequest.latency` for Field name.
    

The log-based metric should look like this:

![Create logs metric page](https://cdn.qwiklabs.com/GGlDNvUdxA3rEKWGfqEinsjnD7iuqFGRMrSoO2w44po%3D align="left")

6. Click **Create metric**.
    

Now you'll see your user-defined metric added to your Logs-based Metrics page.

**Test completed task**

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will be granted an assessment score.

Create logs-based metric

**Check my progress**

## Task 3. Metrics Explorer

Next, you'll use Metrics Explorer to look at the data for your Cloud Run function.

### Create a Monitoring Metrics Scope

Set up a Monitoring Metrics Scope that's tied to your Google Cloud Project. The following steps create a new account that has a free trial of Monitoring.

* In the Cloud Console, click **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; View All Products &gt; Observability &gt; **Monitoring**.
    

When the Monitoring **Overview** page opens, your metrics scope project is ready.

1. In the left menu, click **Metrics explorer**.
    
2. Click on **Select a metric** dropdown. Deselect the **Active** button.
    
3. Type `CloudRunFunctionLatency-Logs` in filter by resource or metric name and then select **Cloud Run Revision &gt; Logs-based metric &gt; Logging/user/CloudRunFunctionLatency-Logs** from the suggested metrics and click **Apply**.
    

**Note**: If Cloud Run Revision is not visible in the dropdown, uncheck `Active`. Logs-based metrics may initially show as 'Not Active' in the Metrics Explorer. This means that the metric has not yet received enough data to be considered active. It may take several minutes (or more) and sufficient traffic generation for the metric to become active.

If you encounter issues:

* Double-check that you have selected the correct resource and metric in Cloud Monitoring.
    
* Ensure that there are no filters applied in Cloud Monitoring.
    
* Verify that the time range is set correctly in Cloud Monitoring.
    
* Generate more traffic with the `vegeta` tool (increase the duration or rate).
    
* Wait for a longer period, as there may be delays in log processing.
    

4. On the top right corner change the **widget type** to **Stacked bar chart** using the dropdown menu.
    
5. Explore other graph options and try a different metric. For example, click your current **Cloud Run Revision** metric to open the dropdown, select **Cloud Run Revision &gt; Request Count**, and change the widget type to **Stacked area chart**.
    
6. Continue to explore and experiment. For example, go back to the **Cloud Run Revision** metric and change the `Aggregation` to the **95th percentile**. Select the widget type **Line chart**.
    

## Task 4. Create charts on the Monitoring Overview window

Creating charts on the Monitoring Overview window is a great way to track metrics that are important to you. In this section, you set up the same charts you created in the previous section, but now they'll be saved into the Monitoring Overview window.

1. In the left menu, click **Dashboards**.
    
2. Click **Create Custom Dashboard**.
    
3. Click on **Add widget**.
    
4. Under Visualization, select **Stacked bar**.
    
5. Under **Select a metric** dropdown select the default **Cloud Run Revision &gt; Request Count** metric to open the dropdown and change the metric. Click **Apply** on the top right.
    
6. Click **Add widget**. Under Visualization, select **Heatmap**.
    
7. Start typing `Cloud Run Revision` into the **Select a metric** dropdown, and then select **Cloud Run Revision &gt; Logs-based metric &gt; Logging/user/CloudRunFunctionLatency-Logs** from the suggested metrics and click **Apply**.
    

**Note**: If CloudRunFunctionLatency-Logs metric is not visible in the dropdown, uncheck `Active`.

8. Click **Add widget**. Under Visualization, select **Line**.
    
9. Start typing `Cloud Run Revision` into the **Select a metric** dropdown, and then select **Cloud Run Revision &gt; Request\_latency** from the suggested metrics. Set the **Aggregation** to **Mean** and click **Apply**.
    
10. Click **Add widget**. Under Visualization, select **Stacked bar**.
    
11. Start typing `Cloud Run Revision` into the **Select a metric** dropdown, and then select **Cloud Run Revision &gt; Container &gt; Container CPU Allocation** from the suggested metrics. Click **Apply**.
    

By default, the charts name themselves after the metric you're using, but you can rename them.

12. Click the Dashboard name at the top it should start with `New Dashboard -` and rename it to `Cloud Run Function Custom Dashboard`.
    

For a quick reference, to see these charts click **Dashboards** in the left panel of the Monitoring page.

## Task 5. Test your understanding

Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

List out two types of log-based metrics.Filter metricPredefined metricsUser-defined logs-based metricsSystem logs-based metrics

**Submit**

Vegeta is a versatile HTTP load testing tool built out of a need to drill HTTP services with a constant request rate.TrueFalse

Logs-based metrics are Cloud Monitoring metrics that are based on the content of log entries.TrueFalse

---

## Solution of Lab

### Quick

%[https://youtu.be/Fuhwa8tlUC8] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Monitoring%20and%20Logging%20for%20Cloud%20Run%20Functions/techcps092.sh
sudo chmod +x techcps092.sh
./techcps092.sh
```

---

### Manual

%[https://youtu.be/GuksDlyreW8]