---
title: "Cloud Logging on Kubernetes Engine - GSP483"
seoTitle: "Cloud Logging on Kubernetes Engine - GSP483"
seoDescription: "Cloud Logging can be used aggregate logs from all Google Cloud resources, as well as any custom resources on other platforms, to allow for one centralized s"
datePublished: Fri Jun 20 2025 03:57:59 GMT+0000 (Coordinated Universal Time)
cuid: cmc4a4q2l000b02jofaj08wd7
slug: cloud-logging-on-kubernetes-engine-gsp483
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750391570767/22e84480-5c94-4a35-8f8b-b12923b9d18f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1750391867594/8c515f82-07d2-464e-af1e-4a73b622b508.png
tags: google-kubernetes-engine, cloud-logging, kubernetes-engine, cloud-logging-on-kubernetes-engine-gsp483, cloud-logging-on-kubernetes-engine, gsp483, kubernetes-engine-gsp483

---

## Overview

Cloud Logging can be used aggregate logs from all Google Cloud resources, as well as any custom resources on other platforms, to allow for one centralized store for all logs and metrics. Logs are aggregated and then viewable within the provided Cloud Logging UI. They can also be [exported to Sinks](https://cloud.google.com/logging/docs/export/configure_export_v2) to support more specialized of use cases. Currently, Cloud Logging supports exporting to the following sinks:

* Cloud Storage
    
* Pub/Sub
    
* BigQuery
    

In this lab you will deploy a sample application to Kubernetes Engine that forwards log events to [Cloud Logging](https://cloud.google.com/logging/) using [Terraform](https://www.terraform.io/), a declarative [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_Code) tool that enables configuration files to automate the deployment and evolution of infrastructure in the cloud. The configuration will also create a Cloud Storage bucket and a BigQuery dataset for exporting log data to.

This lab was created by GKE Helmsman engineers to give you a better understanding of Cloud Logging. You can view this demo by running `gsutil cp -r gs://spls/gke-binary-auth/* .` and `cd gke-binary-auth-demo` command in cloud shell. We encourage any and all to contribute to our assets!

## Architecture

The Terraform configurations are going to build a Kubernetes Engine cluster that will generate logs and metrics that can be ingested by Stackdriver. The scripts will also build out Logging Export Sinks for Cloud Storage, BigQuery, and Cloud Pub/Sub.

The diagram of how this will look along with the data flow can be seen in the following graphic:

![Cloud Logging Architecture graphic](https://cdn.qwiklabs.com/JkugHaL7PiO8BSOUTKM%2FDVDaFTRhbeJDzGxubcmbvvA%3D align="left")

## Setup

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
    student-04-11d1cb2cb15d@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    XAZOwnlVK8TL
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-76043a5cf4ad`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-76043a5cf4ad
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
ACCOUNT: student-04-11d1cb2cb15d@qwiklabs.net

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
project = qwiklabs-gcp-02-76043a5cf4ad
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Clone demo

1. In Cloud Shell top ribbon, click **Open in new window**:
    

![Cloud Shell ribbon with Open in new window icon highlighted](https://cdn.qwiklabs.com/JeGRRGsOeRxhk7cs%2BIwejetknYKqBRRVamnHQHDAgyI%3D align="left")

2. Run the following command to set your Google Cloud project ID, replacing `<YOUR_PROJECT_ID>` with your Qwiklabs Project ID:
    

```apache
gcloud config set project <YOUR_PROJECT_ID>
```

3. Now clone the resources needed for this lab:
    

```apache
git clone https://github.com/GoogleCloudPlatform/gke-logging-sinks-demo
```

4. Now change your the directory for this demo:
    

```apache
cd gke-logging-sinks-demo
```

### Set your region and zone

Certain Compute Engine resources live in regions and zones. A region is a specific geographical location where you can run your resources. Each region has one or more zones.

**Note**: Learn more about regions and zones and see a complete list in [Regions & Zones documentation](https://cloud.google.com/compute/docs/regions-zones/).

Run the following to set a region and zone for your lab (you can use the region/zone that's best for you):

```apache
gcloud config set compute/region us-west1
gcloud config set compute/zone us-west1-b
```

## Task 2. Deployment

Following the principles of [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_Code) and [Immutable Infrastructure](https://www.oreilly.com/ideas/an-introduction-to-immutable-infrastructure), Terraform supports the writing of declarative descriptions of the desired state of infrastructure. When the descriptor is applied, Terraform uses Google Cloud APIs to provision and update resources to match.

Terraform compares the desired state with the current state so incremental changes can be made without deleting everything and starting over. For instance, Terraform can build out Google Cloud projects and compute instances, etc., even set up a Kubernetes Engine cluster and deploy applications to it. When requirements change, the descriptor can be updated and Terraform will adjust the cloud infrastructure accordingly.

This lab will start up a Kubernetes Engine cluster and deploy a simple sample application to it. By default, Kubernetes Engine clusters in Google Cloud are provisioned with a pre-configured [Fluentd](https://www.fluentd.org/)\-based collector that forwards logs to Cloud Logging. Interacting with the sample app will produce logs that are visible in the Cloud Logging and other log event sinks.

### Update the provider.tf file

1. Remove the provider version for the Terraform from the `provider.tf` script file.
    
2. Click **Open Editor**, then click **Explorer &gt; Open folder**, and then click **Ok**.
    
3. From the left-hand menu, open the file `/gke-logging-sinks-demo/terraform/provider.tf`.
    
4. Set the version to **~&gt; 2.19.0**. After modification your `provider.tf` script file should look like:
    

```apache
....
provider "google" {
  project = var.project
  version = "~> 2.19.0"
}
```

5. **Save** and close the file.
    

### Deploying the cluster

There are three Terraform files provided with this lab example.

The first one, `main.tf`, is the starting point for Terraform. It describes the features that will be used, the resources that will be manipulated, and the outputs that will result.

The second file is `provider.tf`, which indicates which cloud provider and version will be the target of the Terraform commands--in this case Google Cloud.

The final file is `variables.tf`, which contains a list of variables that are used as inputs into Terraform. Any variables referenced in the `main.tf` that do not have defaults configured in `variables.tf` will result in prompts to the user at runtime.

1. You will make one small change to `main.tf`. From the left-hand menu, open the file `/gke-logging-sinks-demo/terraform/main.tf`.
    
2. Scroll down to line 110 and find the "Create the Stackdriver Export Sink for Cloud Storage GKE Notifications" section.
    
3. Change the filter's `resource.type` from **container** to **k8s\_container**.
    
4. Do the same for the bigquery-sink on line 119. Ensure that these two export sync sections look like the following before moving on:
    

![Example code snippet highlighting the k8s_container](https://cdn.qwiklabs.com/GXetpwHaqoVKpzA5bxo0wYqm7m5YK4EiRU8XjNn%2FGcQ%3D align="left")

5. **Save** and close the file.
    
6. Now run the following command to build out the executable environment using the `make` command:
    

```apache
make create
```

**Note:** If you get deprecation warnings related to the zone variable, please ignore it and move forward in the lab.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully deployed necessary infrastructure with Terraform, you will see an assessment score.

Use Terraform to set up the necessary infrastructure

**Check my progress**

## Task 3. Validation

If no errors are displayed during deployment, after a few minutes you should see your Kubernetes Engine cluster in the Cloud Console.

1. Go to **Navigation menu** &gt; **Kubernetes Engine** &gt; **Clusters** to see the cluster with the sample application deployed.
    
2. To validate that the demo deployed correctly, run:
    

```apache
make validate
```

Your output will look like this:

![Validation output screen](https://cdn.qwiklabs.com/h9NLk42%2BAdBKpk8FQJ5GyHow87SX1lCE205BosM%2FOwg%3D align="left")

Now that the application is deployed to Kubernetes Engine you can generate log data and use Cloud Logging and other tools to view it.

## Task 4. Generating logs

The sample application that Terraform deployed serves up a simple web page.

Each time you open this application in your browser the application will publish log events to Cloud Logging. When you refresh the page a few times to produce several log events.

To get the URL for the application page, perform the following steps:

1. In the Cloud console, from the **Navigation menu**, go to the Networking section and click on **Network services**.
    
2. On the default **Load balancing** page, click on the name of the TCP load balancer that was set up.
    
3. On the **Load balancer details** page the top section labeled **Frontend**.
    
4. In the Frontend, copy the `IP:Port` URL value. Open a new browser and paste the URL. The browser should return a screen that looks similar to the following:
    

![Sample application screen displaying a Hello, world! message, the version number, and host name](https://cdn.qwiklabs.com/WUUqYHH54SXGuybJEzhPZj0GOKMSokAr4aLV2dEJG%2FQ%3D align="left")

**Note:** Make sure to refresh the page few times to create several log events.

## Task 5. Logs in Cloud Logging

Cloud Logging provides a UI for viewing log events. Basic search and filtering features are provided, which can be useful when debugging system issues.

Cloud Logging is best suited to exploring more recent log events. Users requiring longer-term storage of log events should consider some of the tools you'll explore in the following sections.

To access the cloud Logging console perform the following steps:

1. In the Cloud Console, from the **Navigation menu**, in the Operations section, click on **Logging**.
    
2. On this page, for the **All resources** dropdown, select **Kubernetes Container**, and for **cluster\_name**, select **stackdriver-logging**. Click **Apply**.
    

![Log fields page with resource type, cluster name, and namespace name selected](https://cdn.qwiklabs.com/lUHPWir6VeNpQFJs0cFTXoJ3ncd0GX1ctQcOF3if8WU%3D align="left")

3. Click **Run query**.
    

![Query builder tab](https://cdn.qwiklabs.com/onQ89A%2BkpAwZZJeb87Y%2Fwj%2Bz355CKRqV0frGkQ2f%2F%2BU%3D align="left")

4. In Query results, you can expand the bulleted log items to view more details about a log entry.
    

On the Logging console, you can build queries using Query builder, or try out various features like log fields, time zone, etc.

## Task 6. Viewing log exports

The Terraform configuration built out two Log Export Sinks. To view the sinks perform the following steps:

1. You should still be on the **Logging** page.
    
2. In the left navigation menu, click **Logs router**.
    
3. You should see four Sinks in the list of log exports.
    
4. You can edit/view these sinks by clicking on the context menu (three dots) to the right of a sink and selecting the **Edit sink** option.
    
5. Additionally, you could create additional custom export sinks by clicking on the **Create Sink** option in the top of the navigation window.
    

## Task 7. Logs in Cloud Storage

Log events can be stored in [Cloud Storage](https://cloud.google.com/storage/), an object storage system suitable for archiving data.

Policies can be configured for Cloud Storage buckets that, for instance, allow aging data to expire and be deleted while more recent data can be stored with a variety of storage classes affecting price and availability.

The Terraform configuration created a Cloud Storage Bucket named stackdriver-gke-logging- to which logs will be exported for medium to long-term archival.

In this example, the Storage Class for the bucket is defined as Nearline because the logs should be infrequently accessed in a normal production environment (this will help to manage the costs of medium-term storage). In a production scenario, this bucket may also include a lifecycle policy that moves the content to Coldline storage for cheaper long-term storage of logs.

To access the logs in Cloud Storage perform the following steps:

1. In the Cloud Console from the **Navigation menu**, click **Cloud Storage &gt; Buckets**.
    
2. Find the Bucket with the name `stackdriver-gke-logging-<random-Id>`, and click on the name.
    
3. Unfortunately, it takes a while for sinks to propagate to Cloud Storage so you probably will not see any log details in your bucket.
    

If you come back to the bucket towards the end of your lab you might see folders corresponding to pods running in the cluster (e.g. autoscaler, dnsmasq, etc.).

![Bucket details window displaying a list of folders on the Objects tabbed page](https://cdn.qwiklabs.com/71DrZAaQv%2FthTpZd%2BYIZ%2B4F%2Fxzc3j6nizp%2BMHy6yASg%3D align="left")

You can click into any of the folders to browse specific log details like heapster, kubedns, sidecar, etc.

## Task 8. Logs in BigQuery

Log events can be configured to be published to [BigQuery](https://cloud.google.com/bigquery/), a data warehouse tool that supports fast, sophisticated, querying over large data sets.

The Terraform configuration will create a BigQuery [DataSet](https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets) named `gke_logs_dataset`. This dataset will be set up to include all Kubernetes Engine related logs for the last hour (by setting a Default Table Expiration for the dataset). Kubernetes Engine container logs will be pushed to the dataset.

To access the logs in BigQuery, perform the following steps:

**Note:** The BigQuery Export is not populated immediately. It may take a few moments for logs to appear.

1. From the **Navigation menu**, in the Big Data section, click on **BigQuery**, if `Welcome to BigQuery in the Cloud Console` message box opens. Click **Done**.
    
2. In the left menu, click on your project name. You should see a dataset named **gke\_logs\_dataset**. Expand this dataset to view the tables that exist.
    
    **Note:** The dataset is created immediately, but the tables are generated as logs are written and new tables are needed.
    
3. Click on one of the tables to view the table details.
    
4. Review the schema of the table to note the column names and their data types. This information can be used in the next step when you query the table to look at the data.
    

![Schema tabbed page of the stderr table in the gke_logs_dataset](https://cdn.qwiklabs.com/bE2GIjEQFcbq30ZNsTKU4V1r7V5%2FLldtySWmMvMzl04%3D align="left")

5. Click **Query** to perform a custom query against the table.
    
6. This adds a query to the Query Editor, but it has a syntax error.
    
7. Edit the query to add an asterisk (\*) after **Select** to pull in all details from the current table.
    
    **Note:** A `Select *` query is generally very expensive and not advised. For this lab the dataset is limited to only the last hour of logs, so the overall dataset is relatively small.
    
8. Click **Run** to execute the query and return some results from the table.
    

The results window should display some rows and columns. You can scroll through the various rows of data that are returned. If you want, execute some custom queries that filter for specific data based on the results that were shown in the original query.

### Test completed task

Click **Check my progress** to verify your performed task. If BigQuery sink written logs in BigQuery dataset, you will see an assessment score.

View Logs in BigQuery

**Check my progress**

## Task 9. Teardown

* Qwiklabs will take care of shutting down all the resources used for this lab, but here’s what you would need to do to clean up your own environment to save on cost and to be a good cloud citizen:
    

```apache
make teardown
```

Since Terraform tracks the resources it created, it is able to tear them all down.

## Task 10. Troubleshooting for your production environment

### The install script fails with a `Permission denied` when running Terraform.

The credentials that Terraform is using do not provide the necessary permissions to create resources in the selected projects.

1. Ensure that the account listed in `gcloud config list` has necessary permissions to create resources.
    
2. If it does, regenerate the application default credentials using `gcloud auth application-default login`.
    

### Cloud Storage Bucket not populated

Once the Terraform configuration is complete the Cloud Storage Bucket will be created, but it is not always populated immediately with log data from the Kubernetes Engine cluster.

Give the process some time because it can take up to 2 to 3 hours before the first entries start appearing. Learn more about Cloud Storage in the [View logs in sink destinations documentation](https://cloud.google.com/logging/docs/export/using_exported_logs).

### No tables created in the BigQuery dataset

Once the Terraform configuration is complete the BigQuery Dataset will be created but it will not always have tables created in it by the time you go to review the results.  
The tables are rarely populated immediately.

Give the process some time (minimum of 5 minutes) before determining that something is not working properly.

---

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=L9CBCI8vBwQ] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP483/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Cloud%20Logging%20on%20Kubernetes%20Engine/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```

---

### Manual

%[https://www.youtube.com/watch?v=jJ4PMn-05q4]