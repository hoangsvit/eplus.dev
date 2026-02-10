---
title: "APIs Explorer: Compute Engine - GSP293"
seoTitle: "APIs Explorer: Compute Engine - GSP293"
seoDescription: "The APIs Explorer enables you to construct REST-based API calls against any version of any Google service. In this lab, you use API Explorer to create (inse"
datePublished: Fri Apr 18 2025 03:00:18 GMT+0000 (Coordinated Universal Time)
cuid: cm9m7bvpi000509lbhibc3t5k
slug: apis-explorer-compute-engine-gsp293
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744945179265/34830dcd-97ea-4205-9a37-cd9a59ff11e0.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744945203616/561d5f75-8c9d-439e-8f50-0faf2deb7dd7.png
tags: apis-explorer-compute-engine-gsp293, apis-explorer-compute-engine, gsp293

---

## Overview

The APIs Explorer enables you to construct REST-based API calls against any version of any Google service. In this lab, you use API Explorer to create (insert) a Compute Engine instance with the Compute Engine API and then use Cloud Monitoring to monitor CPU usage.

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
    student-04-686cd4b765a7@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    baemQG97SdAA
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

### Set the region for your project

```apache
gcloud config set compute/region us-west1
```

## Task 1. API Explorer tool

1. To access the APIs Explorer tool, from the **Navigation menu** select **APIs & Services &gt; Library**.
    
2. Type `compute` in the Search bar; all the APIs prefixed with "compute" are returned.
    
3. Click on **Compute Engine API**.
    
4. Make sure that API is enabled; if not, click **Enable**.
    
5. As the API is enabled, for reference, open [Rest API Reference](https://cloud.google.com/compute/docs/reference/rest/v1/) in a new tab. Refer to the Rest API Reference page for the Compute Engine API.
    

## Task 2. Create your request

1. Navigate to the [Method:instances.insert reference](https://cloud.google.com/compute/docs/reference/rest/v1/instances/insert) to create an instance resource.
    

Next, fill out a form to use the `compute.instances.insert` method.

2. The Request body contains the resource properties you use to create your instance:
    

**project**\= `qwiklabs-gcp-01-8830adccd587`

**zone** = `us-west1-a`

**Request body**\= Click inside the brackets to select the following properties:

* **machineType**: zones/`us-west1-a`/machineTypes/n1-standard-1
    
* **name**: `instance-1`
    
* **networkInterfaces**: leave empty `[{}]`
    
* **disks**:
    
    * **type**: `PERSISTENT`
        
    * **initializeParams** &gt; **sourceImage**: `projects/debian-cloud/global/images/family/debian-11`
        
* Set the **boot** to **true**
    

Your form should look like the following image:

![The form containing the previously indicated completed fields.](https://cdn.qwiklabs.com/YtCqscatPbvBzWai6LIqNmB%2B%2BUpn2WZk3o%2F4euwUwGg%3D align="left")

3. Make sure that the **Google OAuth 2.0** checkbox is selected in the **Credentials** section.
    

**Note:** To view **Credentials FAQs**, click on the question mark icon next to the **Credentials** title.

4. Make sure that there are no trailing spaces in any of the fields, then scroll down and click **Execute**.
    
5. Select the student account you started the lab with.
    
6. On the next screen, click **Allow** to give APIs Explorer access.
    

You can see the Request that was sent to your project as code, built from the input you provided in the form, and the Response below it.

7. In the console, click **Navigation menu &gt; Compute Engine** to view the instance you just created.
    

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a Compute Engine instance via API, you will see an assessment score.

Create a Compute Engine instance via API

**Check my progress**

## Task 3. Monitor your instance with Cloud monitoring

1. Use the [Cloud Monitoring API documentation](https://cloud.google.com/monitoring/api/ref_v3/rest/) to navigate to Cloud Monitoring API.
    
2. Navigate to the [Method: projects.timeSeries.list documentation](https://cloud.google.com/monitoring/api/ref_v3/rest/v3/projects.timeSeries/list) to list time series.
    

For this method, the `name` is specified as a string in the format `projects/Your_Project_ID`.

The monitoring `filter` specifies which time series should be returned. The `filter` must specify a single metric type, and can additionally specify a metric label and other information.

3. For this lab, specify `gce_instance` as the resource type and `cpu/usage_time` as the metric type.
    
4. Add the following string in the `filter` box:
    

```apache
resource.type="gce_instance" AND metric.type="compute.googleapis.com/instance/cpu/usage_time"
```

5. `interval.endTime` and `interval.startTime`: Calculate RFC-3339 timestamps to filter the time series returned by APIs Explorer. You can use [Unix Time Stamp - Epoch Converter](https://www.unixtimestamp.com/) to get the current time.
    
6. Copy the last RFC 3339 timestamp and add it to `interval.endTime`:
    

![The Epoch and Unix Timestamp Conversion Tools page, with the date and timestamp highlighted.](https://cdn.qwiklabs.com/9da1nK4ygtjNHAY23BvfDyj9o8Toq5eW%2BHzsN9Cu7Xk%3D align="left")

7. Subtract one hour from your timestamp time and add that value to `interval.startTime`.
    

Your form should display as follows:

![Request form that contains the resource properties to create your instance using the projects.timeSeries.list method](https://cdn.qwiklabs.com/BPp3jKqPnfW0JfPIf613eFTU0S1Q7%2Bs583ZqFblxylk%3D align="left")

8. Make sure that the **Google OAuth 2.0** and **API key** checkboxes are selected under the **Credentials** section.
    

**Note:** To view the **Credentials FAQs**, click on the question mark icon next to the **Credentials** title.

9. Make sure that there are no trailing spaces in any of the fields, then scroll down and click **Execute**.
    

![Request body for the request to use the projects.timeSeries.list method](https://cdn.qwiklabs.com/xXPJGCmLVRrIoTvY%2BwRfJhcZqwLahlgXxxAA93CdYvU%3D align="left")

## Task 4. Bonus: See your metric in Cloud Monitoring

You can do the same exercise in Cloud Monitoring if you want. Open a Cloud monitoring workspace in the Cloud Console, then use the Metrics Explorer to monitor your VMs CPU usage.

### Create a Monitoring Metrics Scope

Set up a Monitoring Metrics Scope that's tied to your Google Cloud Project. The following steps create a new account that has a free trial of Monitoring.

* In the Cloud Console, click **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; View All Products &gt; Observability &gt; **Monitoring**.
    

When the Monitoring **Overview** page opens, your metrics scope project is ready.

### Monitor CPU usage

1. In the left menu, click **Metrics Explorer**.
    
2. **Metric**: Navigate to **VM Instance &gt; Instance &gt; CPU Usage**, then click **Apply**.
    
3. **Filter**: instance\_name (select your instance.)
    

## Task 5. Delete your VM

Now use APIs Explorer to delete the instance you created.

1. Open [Rest API Reference](https://cloud.google.com/compute/docs/reference/rest/v1/). This will open a new tab with the Rest API Reference page for the Compute Engine API.
    
2. Navigate to the [Method: instances.delete documentation](https://cloud.google.com/compute/docs/reference/rest/v1/instances/delete) to delete an instance resource.
    
3. Add your `project`, `zone`, and `instance` name to the form.
    
4. Make sure that the **Google OAuth 2.0** checkbox is selected in the **Credentials** section.
    

**Note:** To view **Credentials FAQs**, click on the question mark icon next to the **Credentials** title.

5. Make sure that there are no trailing spaces in any of the fields, then scroll down and click **Execute**.
    

Your Response will indicate that the deletion process has been started.

6. Navigate to **Compute Engine** with **Navigation menu** &gt; **Compute Engine** and verify that your console resembles following:
    

![VM instance list displaying Instance-1](https://cdn.qwiklabs.com/Is2oFzoXXM28fegMbYZ%2Bd4Vu2kXAg95HSui%2FsO0TH20%3D align="left")

**Note:** If your instance deletion process has been completed then you won't be able to see an output as above. That means your instance has been removed.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully deleted your instance, you will see an assessment score.

Delete your instance

**Check my progress**

## Task 6. Test your knowledge

Test your knowledge about the Google Cloud by taking our quiz.

You can create an instance using gcloud Shell, Google cloud console and through APIs Explorer.TrueFalse

---

## Solution of Lab

%[https://youtu.be/kt1szxq7JNY] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP293/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/APIs%20Explorer%20Compute%20Engine/gsp293.sh
sudo chmod +x *.sh
./*.sh
```