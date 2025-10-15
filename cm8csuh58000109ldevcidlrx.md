---
title: "Cloud Operations for GKE - GSP497"
seoTitle: "Cloud Operations for GKE - GSP497"
seoDescription: "Kubernetes Engine Monitoring is a new Cloud Monitoring feature that more tightly integrates with GKE to better show you key stats about your cluster and the"
datePublished: Mon Mar 17 2025 08:25:14 GMT+0000 (Coordinated Universal Time)
cuid: cm8csuh58000109ldevcidlrx
slug: cloud-operations-for-gke-gsp497
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742197976299/1966a9a7-1b42-4def-959f-3b3da4f8246d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1742199875718/5f3f4f76-4c10-4fb7-9844-7b697967e1fe.png
tags: cloud-operations-for-gke-gsp497, cloud-operations-for-gke, gsp497

---

## **Overview**

[Kubernetes Engine Monitoring](https://cloud.google.com/monitoring/kubernetes-engine/) is a new Cloud Monitoring feature that more tightly integrates with GKE to better show you key stats about your cluster and the workloads and services running in it. Included in the new feature is functionality to import, as native Cloud Monitoring metrics, metrics from pods with Prometheus endpoints. This allows you to use Cloud Monitoring native alerting functionality with your Prometheus metrics without any additional workload.

In this lab you will set up Monitoring and visualizing metrics from a Kubernetes Engine cluster. It makes use of [Terraform](https://www.terraform.io/), a declarative [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_Code) tool that enables configuration files to be used to automate the deployment and evolution of infrastructure in the cloud. The logs from the Kubernetes Engine cluster will be leveraged to walk through the monitoring capabilities of Cloud Monitoring.

**Note:** The setup of the Cloud Monitoring workspace is not automated with a script because it is currently not supported through Terraform or via the gcloud command line tool.

This lab was created by GKE Helmsman engineers to help you grasp a better understanding of Cloud Monitoring with Kubernetes Engine. You can view this demo on [Github](https://github.com/GoogleCloudPlatform/gke-monitoring-tutorial). We encourage any and all to contribute to our assets!

### Architecture

This lab will create a Kubernetes Engine cluster that has a sample application deployed to it. The logging and metrics for the cluster are loaded into Cloud Logging by default. In the tutorial, a Cloud Monitoring account will be set up to view the metrics captured.

![Monitoring Architecture](https://cdn.qwiklabs.com/y%2FOAJSE7o6mRtoAL8P9TVEofM14B1%2Ftmt3T%2FQ6czPJ4%3D align="left")

## **Setup**

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
    student-04-65085531e986@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    VhtYT2eQdU5k
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-232655990666`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-232655990666
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
ACCOUNT: student-04-65085531e986@qwiklabs.net

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
project = qwiklabs-gcp-01-232655990666
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

**Troubleshooting:** In a production environment, if the install script fails with a `Permission denied` when running Terraform, it's probably because the credentials that Terraform is using do not provide the necessary permissions to create resources in the selected project. Ensure that the account listed in `gcloud config list` has the necessary permissions to create resources. If it does, regenerate the application default credentials using `gcloud auth application-default login`.

## **Task 1. Set region/zone**

### Set your region and zone

Certain Compute Engine resources live in regions and zones. A region is a specific geographical location where you can run your resources. Each region has one or more zones.

**Note**: Learn more about regions and zones and see a complete list in [Regions & Zones documentation](https://cloud.google.com/compute/docs/regions-zones/).

Run the following to set a region and zone for your lab (you can use the region/zone that's best for you):

```apache
gcloud config set compute/region us-east1
gcloud config set compute/zone us-east1-d
```

## **Task 2. Clone demo**

1. Copy the resources needed for this lab by running:
    

```apache
gsutil cp gs://spls/gsp497/gke-monitoring-tutorial.zip .
unzip gke-monitoring-tutorial.zip
```

2. Go into the directory of the demo:
    

```apache
cd gke-monitoring-tutorial
```

### Configure authentication

The Terraform configuration will execute against your Google Cloud environment and create a Kubernetes Engine cluster running a simple application. The configuration will use your personal account to build out these resources. In this lab, you use **Cloud Shell** which automatically has your project and student account configured and authenticated.

### Create a Monitoring Metrics Scope

Set up a Monitoring Metrics Scope that's tied to your Google Cloud Project. The following steps create a new account that has a free trial of Monitoring.

* In the Cloud Console, click **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; View All Products &gt; Observability &gt; **Monitoring**.
    

When the Monitoring **Overview** page opens, your metrics scope project is ready.

### Deploying the cluster

* The infrastructure and Cloud Monitoring alert policy required by this project can be deployed by executing:
    

```apache
make create
```

If you need to override any of the defaults in the Terraform variables file, simply replace the desired value(s) to the right of the equals sign(s). Be sure your replacement values are still double-quoted.

**Note:** The Terraform will perform the following tasks:

1\. Read your project & zone configuration to generate a couple of config files:

\* `./terraform/terraform.tfvars` for Terraform variables.

\* `./manifests/prometheus-service-sed.yaml` for the Prometheus policy to be created in Cloud Monitoring.

2\. Run `terraform init` to prepare Terraform to create the infrastructure

3\. Run `terraform apply` to actually create the infrastructure & Cloud Monitoring alert policy

If no errors are displayed then after a few minutes you should see an output as below.

**Example output:**

```apache
Apply complete! Resources: 5 added, 0 changed, 0 destroyed.

Outputs:

cluster_name = stackdriver-monitoring-tutorial
primary_location = us-east1-d
```

**Note:** If you get deprecation warnings related to the zone variable, please ignore it and move forward in the lab.

You can verify created Kubernetes Engine cluster in the [Cloud Console](https://console.cloud.google.com/kubernetes).

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully deployed resources using Terraform, you will see an assessment score.

Deploy the cluster and required resources using Terraform

Check my progress

### How does Terraform work?

Following the principles of [Infrastructure as Code](https://en.wikipedia.org/wiki/Infrastructure_as_Code) and [Immutable Infrastructure](https://www.oreilly.com/ideas/an-introduction-to-immutable-infrastructure), Terraform supports the writing of declarative descriptions of the desired state of infrastructure. When the descriptor is applied, Terraform uses Google Cloud APIs to provision and update resources to match. Terraform compares the desired state with the current state so incremental changes can be made without deleting everything and starting over. For instance, Terraform can build out Google Cloud projects and compute instances, etc., even set up a Kubernetes Engine cluster and deploy applications to it. When requirements change, the descriptor can be updated and Terraform will adjust the cloud infrastructure accordingly.

This demo script will start up a Kubernetes Engine cluster and deploy a simple sample application to it. By default, Kubernetes Engine clusters in Google Cloud are provisioned with a pre-configured [Fluentd](https://www.fluentd.org/)\-based collector that forwards logs to Cloud Monitoring.

### Using Kubernetes Engine Monitoring

While you're waiting for the cluster to finish creating, read through this guide on how to observe your cluster with the new Kubernetes Engine Monitoring UI, see [Observing Your Kubernetes Clusters](https://cloud.google.com/monitoring/kubernetes-engine/observing).

## **Task 3. Validation**

If no errors are displayed during deployment, after a few minutes you should see your Kubernetes Engine cluster in the Cloud Console with the sample application deployed.

1. You can click on **Kubernetes Engine** to monitor the progress.
    
2. In order to validate that resources are installed and working correctly, run:
    

```apache
make validate
```

**Example output:**

```apache
Fetching cluster endpoint and auth data.
kubeconfig entry generated for stackdriver-monitoring-tutorial.
App is deployed.
```

### Native Prometheus integration

The Terraform code included a Cloud Monitoring alerting policy that is watching a metric that was originally imported from a Prometheus endpoint.

1. Still in the Cloud Monitoring window, in the left menu, click **Alerting**. The Policies section lists all the policies, including the alerting policy called `Prometheus mem alloc`.
    
2. Clicking on the policy provides much more detail.
    

After the scripts execute it may take a few minutes for the Metrics to appear on the Overview page. Refresh your page periodically to make sure that you're seeing the latest updates.

You will eventually see an Incident when the `mem alloc above 12` policy gets violated.

3. Click on the Incident to see the details.
    

## **Task 4. Teardown**

* When you are finished, and you are ready to clean up the resources that were created, you can run the following command to remove all resources:
    

```apache
make teardown
```

This command uses the `terraform destroy` command to remove the infrastructure. Terraform tracks the resources it creates so it can tear them all backdown.

If no errors are displayed then after a few minutes you should see an output as below (do not move forward until you get the output as below).

**Example output:**

```apache
....
Destroy complete! Resources: 5 destroyed.
```

**Note:** If you get deprecation warnings related to the zone variable, please ignore it.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully removed the infrastructure using Terraform, you will see an assessment score.

Teardown (Clean-up)

---

## Solution of Lab

%[https://www.youtube.com/watch?v=Txn_9LyOb4g] 

```apache
curl -LO raw.githubusercontent.com/Techcps/GSP/master/Cloud%20Operations%20for%20GKE/techcps.sh
sudo chmod +x techcps.sh
./techcps.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1742199386757/ae11e4af-eb04-4c5c-87e7-abd48918432b.png align="center")