---
title: "Configuring GKE-Native Monitoring and Logging (Solution)"
seoTitle: "Configuring GKE-Native Monitoring and Logging (Solution)"
seoDescription: "In this lab, you build a GKE cluster and then deploy pods for use with Kubernetes Engine Monitoring. You will create charts and a custom dashboard, work wit"
datePublished: Tue Mar 18 2025 08:12:28 GMT+0000 (Coordinated Universal Time)
cuid: cm8e7tx29001j09k1hiqjer5f
slug: configuring-gke-native-monitoring-and-logging-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742285349968/10943f0c-c90a-4584-8331-5e86d8dce68a.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1742285534887/1c9203ad-95cf-4a6a-8244-85829128eaeb.png
tags: configuring-gke-native-monitoring-and-logging-solution, configuring-gke-native-monitoring-and-logging

---

## **Overview**

In this lab, you build a GKE cluster and then deploy pods for use with Kubernetes Engine Monitoring. You will create charts and a custom dashboard, work with custom metrics, and create and respond to alerts.

**Note:** For this lab, GKE Standard Mode will be used. The lab explores System logging and monitoring and these are enabled by default in GKE Autopilot.

### Objectives

In this lab, you learn how to perform the following tasks:

* Use Kubernetes Engine Monitoring to view cluster and workload metrics
    
* Use Cloud Monitoring Alerting to receive notifications about the cluster’s health
    

## **Lab setup**

### Access Qwiklabs

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Sign in to Qwiklabs using an **incognito window**.
    
2. Note the lab's access time (for example, `1:15:00`), and make sure you can finish within that time.  
    There is no pause feature. You can restart if needed, but you have to start at the beginning.
    
3. When ready, click **Start lab**.
    
4. Note your lab credentials (**Username** and **Password**). You will use them to sign in to the Google Cloud Console.
    
5. Click **Open Google Console**.
    
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts.  
    If you use other credentials, you'll receive errors or **incur charges**.
    
7. Accept the terms and skip the recovery resource page.
    

<aside><p><strong>Note:</strong><span> </span>Do not click<span> </span><strong>End Lab</strong><span> </span>unless you have finished the lab or want to restart it. This clears your work and removes the project.</p></aside>

### Activate Google Cloud Shell

Google Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud.

Google Cloud Shell provides command-line access to your Google Cloud resources.

1. In Cloud console, on the top right toolbar, click the Open Cloud Shell button.
    
    ![Highlighted Cloud Shell icon](https://cdn.qwiklabs.com/WGBFVIap4CrFWut%2BGdNFzNxeelWYHF1IqYSMFH6Ouq4%3D align="left")
    
2. Click **Continue**.
    

It takes a few moments to provision and connect to the environment. When you are connected, you are already authenticated, and the project is set to your *PROJECT\_ID*. For example:

![Project ID highlighted in the Cloud Shell Terminal](https://cdn.qwiklabs.com/hmMK0W41Txk%2B20bQyuDP9g60vCdBajIS%2B52iI2f4bYk%3D align="left")

**gcloud** is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

* You can list the active account name with this command:
    

```apache
gcloud auth list
```

**Output:**

```apache
Credentialed accounts:
 - <myaccount>@<mydomain>.com (active)
</mydomain></myaccount>
```

**Example output:**

```apache
Credentialed accounts:
 - google1623327_student@qwiklabs.net
```

* You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = <project_id>
</project_id>
```

**Example output:**

```apache
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** Full documentation of **gcloud** is available in the [gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud) .

## **Task 1. Using Kubernetes Engine Monitoring**

Google Kubernetes Engine includes managed support for Monitoring.

In this task, you will create a new cluster with Kubernetes Engine Monitoring support and then perform typical monitoring tasks using the Kubernetes Engine monitoring and logging interface.

### Configuring a GKE cluster with Kubernetes Engine Monitoring

In this task, you will create a GKE cluster with Kubernetes Engine Monitoring enabled. Then you will deploy sample workloads to your GKE cluster for later use in this exercise.

1. In Cloud Shell, type the following command to create environment variables for the Google Cloud zone and cluster name that will be used to create the cluster for this lab:
    

```apache
export my_zone=us-east1-d
export my_cluster=standard-cluster-1
```

2. Configure tab completion for the kubectl command-line tool:
    

```apache
source <(kubectl completion bash)
```

3. Create a VPC-native Kubernetes cluster with native Kubernetes monitoring enabled:
    

```apache
gcloud container clusters create $my_cluster \
   --num-nodes 3 --enable-ip-alias --zone $my_zone  \
   --logging=SYSTEM \
   --monitoring=SYSTEM
```

**Note:** You need to wait a few minutes for the cluster deployment to complete.

4. Configure access to your cluster for kubectl:
    

```apache
gcloud container clusters get-credentials $my_cluster --zone $my_zone
```

### Use the Google Cloud Console to verify monitoring's configuration

1. In the Google Cloud Console, on the **Navigation menu** (), click **Kubernetes Engine** &gt; **Clusters**.
    
2. Click the cluster name **standard-cluster-1** to view the cluster details.
    

![Kubernetes cluster page with standard-cluster-1 displayed](https://cdn.qwiklabs.com/6n60AANi%2By9s%2Fld9u18X26v%2F7sefcBQJOfaCAqMLVkU%3D align="left")

You can scroll down the page to view more details.

Under the **Features** heading, you can see the **Logging** and **Cloud Monitoring** settings that set the logging type to **System, Workloads and System**.

![Features section displaying various settings](https://cdn.qwiklabs.com/IKgzph3UmUJIdYRNObnc287TPoXrXkp45dsrKZ94jcs%3D align="left")

### Deploy a sample workload to your GKE cluster

You will now deploy a sample workload to the default namespace of your GKE cluster. This workload consists of a deployment of three pods running a simple Hello World demo application. Later in this lab exercise, you will be able to monitor the health of this workload in Monitoring.

1. In Cloud Shell, enter the following command to clone the lab repository to the lab Cloud Shell:
    

```apache
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```

2. Create a soft link as a shortcut to the working directory:
    

```apache
ln -s ~/training-data-analyst/courses/ak8s/v1.1 ~/ak8s
```

3. Change to the directory that contains the sample files for this lab:
    

```apache
cd ~/ak8s/Monitoring/
```

4. In the Cloud Shell, execute the following command to deploy a manifest that creates a sample deployment that will provide some items for you to monitor later in this lab exercise using Monitoring:
    

```apache
kubectl create -f hello-v2.yaml
```

This deployment manifest creates three Pods running a simple Hello World demo application.

5. In the Cloud Shell, execute the following command to verify the deployment exists:
    

```apache
kubectl get deployments
```

The output of this command will show that the `hello-v2` application is running in the default namespace:

```apache
NAME       READY   UP-TO-DATE   AVAILABLE   AGE
hello-v2   3/3     3            3           6s
```

Click *Check my progress* to verify the objective.

Configuring a GKE cluster with Kubernetes Engine Monitoring and deploy a sample workload

Check my progress

### Deploy the GCP-GKE-Monitor-Test application

You will now deploy the GCP-GKE-Monitor-Test application to the default namespace of your GKE cluster. This workload has a deployment consisting of a single pod that is then exposed to the internet via a LoadBalancer service.

1. In the Cloud Shell, execute the following command to store the current Project ID in an environment variable:
    

```apache
export PROJECT_ID="$(gcloud config get-value project -q)"
```

2. In the Cloud Shell, execute the following command to change to the load application directory:
    

```apache
cd gcp-gke-monitor-test
```

3. In the Cloud Shell, execute the following command to build the Docker image for the load testing application and push the image to the Google **gcr.io** registry for your lab project:
    

```apache
gcloud builds submit --tag=gcr.io/$PROJECT_ID/gcp-gke-monitor-test .
```

Alternatively, you can also use Docker directly to build and push an image to **gcr.io**:

```apache
docker build -t gcr.io/${PROJECT_ID}/gcp-gke-monitor-test .
```

4. In the Cloud Shell, execute the following command to change back to the main working directory for the lab:
    

```apache
cd ..
```

5. In the Cloud Shell, execute the following command to replace a placeholder value in the `gcp-gke-monitor-test.yaml` file with the Docker image you just pushed to **gcr.io**:
    

```apache
sed -i "s/\[DOCKER-IMAGE\]/gcr\.io\/${PROJECT_ID}\/gcp-gke-monitor-test\:latest/" gcp-gke-monitor-test.yaml
```

**Note:** The **sed** command in UNIX stands for **stream editor** and it can perform many functions on files such as replace, insertion, or deletion. Though most common use of **sed** is for substitution.

By using **sed** you can edit files even without opening them, which is much quicker way to find and replace something in file, than first opening that file in an editor and then changing it.

6. In Cloud Shell, enter the following command to deploy the manifest you just updated to create the deployment and service you will use to test Kubernetes Engine Monitoring:
    

```apache
kubectl create -f gcp-gke-monitor-test.yaml
```

7. In the Cloud Shell, execute the following command to verify that the deployment exists:
    

```apache
kubectl get deployments
```

The output of this command will show that the `hello-v2` application is running in the default namespace:

```apache
NAME                   READY   UP-TO-DATE   AVAIL   AGE
gcp-gke-monitor-test   1/1     1            0       1s
hello-v2               3/3     3            3       38s
```

8. In the Cloud Shell, execute the following command to verify the service exists:
    

```apache
kubectl get service
```

The output of this command will show that the `gcp-gke-monitor-test-service` is running in the default namespace. You may need to run this command multiple times until this service is assigned an external IP address.

Click *Check my progress* to verify the objective.

Deploy the GCP-GKE-Monitor-Test application

Check my progress

## **Task 2. Using the GCP-GKE-Monitor-Test application**

In this task, you will use the GCP-GKE-Monitor-Test application to explore different aspects of Kubernetes Engine Monitoring. The tool is composed of four sections:

* Generate CPU Load
    
* Custom Metrics
    
* Log Test
    
* Crash the Pod
    

![GCP-GKE-Monitor-Test application](https://cdn.qwiklabs.com/CIi92W%2BChdxKLxEnWrDfdqvRK%2BcFY6qrYmzVm3skdsM%3D align="left")

In the first section, **Generate CPU Load**, you have buttons to start and stop a CPU Load Generator. The tool starts a loop of math operations which will consume an entire CPU core. To prevent losing control of the pod due to CPU saturation, the loop yields the processor periodically for 100 nanoseconds. This allows you to quickly stop the CPU Load Generator without killing the pod.

The second section, **Custom Metrics**, allows you to explore custom metric monitoring within Cloud Monitoring. When you click Start Monitoring, the tool first creates the necessary Custom Metric Descriptor, and then starts a loop which sends the custom metric values to Monitoring every 60 seconds. The custom metrics coded into this tool are designed to simulate an application that can keep track of the number of active users connected, and then report that number to an external service.

To take advantage of these custom metrics, some additional instrumentation may be required within your application's code. In this lab exercise you can simulate users connecting and disconnecting by clicking the Increase and Decrease Users buttons.

Also keep in mind that although the web tool will allow you to change the number of users in real time (just as users may connect and disconnect in real life), the Cloud Monitoring APIs only allow the tool to send its current value once per minute. This means your Cloud Monitoring charts will not reflect changes which occur between the per-minute updates.

The third section, **Log Test**, allows you to send different text strings to the container's standard output (the console), which is then periodically collected by Cloud Monitoring and stored as log messages associated with the pod and container. You can optionally enable Debug-level logging to see more entries in the logs. This will allow you to see messages in the logs when you increase the number of users in the Custom Metrics section, or when you enable or disable the CPU Load Generator. Note that these logs are sent in plain-text format to simulate legacy applications which do not support JSON formatted messages. When you view the logs in Logging you will notice that your pod's JSON-based Kubernetes event logs have much more robust filtering and querying options than what is available for the unstructured logs.

The fourth and final section, **Crash the Pod**, allows you to crash the pod with the click of a button. The tool executes a section of code with an unhandled error, which crashes the pod and triggers the deployment to restart a new pod in its place. You can use this tool to see how quickly Kubernetes Engine can recover from errors. It is also an opportunity to see the loss of session state in action because each pod maintains its own session instead of storing it in a central location. When the pod restarts, all your toggle buttons and settings return to their default values.

### Start the CPU Load Generator

You will now open a web browser, connect to the GCP-GKE-Monitor-Test tool, and start the CPU load generator.

1. In Cloud Shell, enter the following command to get the EXTERNAL-IP address of the gcp-gke-monitor-test-service:
    

```apache
kubectl get service
```

2. Open your web browser and navigate to the EXTERNAL-IP address of the service.
    
3. In the **Generate CPU Load** section, click the **Start CPU Load** button. Note that the STATUS text will change when the load generator starts running.
    

![Start CPU Load button and status highlighted in the Generate CPU Load section](https://cdn.qwiklabs.com/BywU8M3fwzu7WLomKDBxm6eNV7lx0kM4Z5UEnr%2Fgw5o%3D align="left")

### Start collecting custom metrics

You will now start a process within the GCP-GKE-Monitor-Test tool which creates a Custom Metric Descriptor within Cloud Monitoring. Later, when the tool begins sending the custom metric data, Monitoring will associate the data with this metric descriptor. Note that Monitoring can often automatically create the custom metric descriptors for you when you send the custom metric data, but creating the descriptor manually gives you more control over the text that appears in the Monitoring interface, making it easier for you to find your data in the Metric Explorer.

1. In the GCP-GKE-Monitor-Test tool, in the **Custom Metrics** section, click the **Start Monitoring** button.
    

![Start Monitoring button highlighted](https://cdn.qwiklabs.com/EEnIsm5Z67t0N92PjCNsTgX%2BiwE4phjS4Sjy%2BtTnKkY%3D align="left")

You can now click the Increase and Decrease Users buttons to change the Current User Count displayed below the STATUS text.

2. Click **Increase Users Counter** and repeat until the **Current User Count** is set to 10 users.
    

![Highlighted Increase Users Counter and Decrease Users Counter buttons. The Current User Count equals zero.](https://cdn.qwiklabs.com/74HpCYGawU%2Bh5v89rD%2FdjOca%2F3X%2FxsxJPB3BuOdSDek%3D align="left")

It may take 2-3 minutes for the first data point to appear in Monitoring. You will check this custom metric in Cloud Monitoring in a later step.

### Generate test log messages

You will now use the GCP-GKE-Monitor-Test tool to create sample text-based logs which you will later view in Cloud Monitoring.

1. In the GCP-GKE-Monitor-Test tool, in the **Log Test** section, click the **Enable Debug Logging** button to increase the number of logs the tool generates.
    

![Highlighted Enable Debug Logging button](https://cdn.qwiklabs.com/2IcYYRQntthKtAaxOdYtsovm2xCd3Dxly0hvVOb0eIs%3D align="left")

2. Click the other four log entry buttons to generate some additional sample log messages. It's important to select a variety of severity levels so that you can see how the different message types are displayed in Monitoring.
    

![General Critical Log Entry, Generate Error Log Entity, Generate Warning Log Entry, and Generate Informational Log Entry buttons highlighted](https://cdn.qwiklabs.com/ebLNgVbZXU%2BYMFWOuDDwaG9SKMFLTFlR8jBiF5kSGFs%3D align="left")

## **Task 3. Using Kubernetes Engine Monitoring**

In this task, you will use Kubernetes Engine Monitoring to view the current health of your GKE cluster and the two workloads running on it.

### Create a Monitoring workspace

You will now setup a Monitoring workspace that's tied to your Google Cloud Project. The following steps create a new account that has a free trial of Monitoring.

1. In the Cloud Console, click on **Navigation menu** &gt; **Monitoring**.
    
2. Wait for your workspace to be provisioned.
    

When the Monitoring dashboard opens, your workspace is ready.

![The Monitoring dashboard open on the Overview page](https://cdn.qwiklabs.com/58FQA3ZYeF1Uh01sWQnh5ymX4wPAAjryBAbPh92DHsY%3D align="left")

### Review the Kubernetes Engine monitoring interface

You will now open and browse the three different sections of the Kubernetes Engine Monitoring interface. The three sections are: Infrastructure, Workloads, and Services.

**Note:** The **GKE** option might not appear immediately in the Monitoring menus. It might take 5 to 10 minutes to enable the cluster for the new features. Refresh your page periodically until the option appears.

1. In the Monitoring interface, click **GKE** in the **Dashboards** section to view the new monitoring interface.
    
2. Review the monitoring interface. This is a dashboard which shows the health of your GKE clusters and their workloads. Take note of the following:
    

* A dynamic **Timeline** is displayed in the top portion of the interface. If required, expand it by clicking on the dropdown icon. You can adjust the **Time Span** from the top of the screen: 1h, 6h, 1d, 1w, 1m, 6w, or custom. This timeline will include markers that indicate the occurrence of alerts (also known as incidents).
    

![GKE Dashboard displaying the timeline and expanded Time Span dropdown menu](https://cdn.qwiklabs.com/Ky0g%2FlGdCKi1f6mLVCZVX93JaeMDDmgtiQ1CrkRrbSE%3D align="left")

* The Auto refresh button (toggle button to the left of the screen): **Click the *Auto refresh* button to allow the screen to update as new events are received**.
    
* The lower portion of this dashboard contains a multiple section views of your clusters and their workloads. The interface is divided into several sections: Clusters, Namespaces, Nodes, Workloads, Kubernetes services, Pods, and Containers.
    

#### **Examine each section in the interface:**

* The **Clusters**, **Nodes**, and **Pods** sections allow you to check the health of particular elements in the cluster. You can also use this to inspect the pods which are running on a particular node in the cluster.
    
* To see the details of your cluster, click on the cluster element.
    
* The **Workloads** section is very helpful, especially when looking for workloads which do not have services exposed.
    
* The **Kubernetes services** section organizes the services configured in your environment by cluster, then by namespace (the administrative barrier or partition within the cluster), and then shows the various services available to users within that namespace. You can see more details on each service by clicking on their name.
    
* The **Namespaces** section shows the list of namespaces within the cluster.
    

The monitoring interface can provide even more detail about the deployments and pods.

1. In the **Pods** section, click the pod beginning with **fluentbit-gke-xxxx** (If required, click on `View all`), and then click on **Metrics** tab to see more metrics.
    

Note the value of your pod's CPU request utilization. That number represents the amount of CPU resources the pod is consuming relative to what it originally requested from the cluster.

2. Click the **X** in the upper right corner of the Pod Details window.
    
3. Now, click the pod beginning with **gcp-gke-monitor-test** to view more detail about it.
    

Note that you will see slightly different information if you selected the Namespaces instead of the Pod.

4. Click on the **Metrics** tab to see more metrics such as CPU request utilization and CPU Usage Time.
    
5. In the Pod Details window, click the **Logs** tab to view the log activity for the pod.
    

This shows the log messages the pod has generated as well as a graph indicating the logging activity of the pod over time. Here you can see some of the sample logs you generated in the tool.

![Pod details page displaying numerous logs](https://cdn.qwiklabs.com/rzIfB4%2FOtIz%2BETAw9iGelvKCcHEn73VveCCGBh%2FmUKw%3D align="left")

6. Click the **X** in the upper right corner of the Pod Details window to return to the Monitoring interface.
    

### Create a custom Monitoring dashboard to monitor your pods

In Monitoring, you can create custom dashboards to display important metrics such as CPU utilization, container restarts, and more such as our custom metric for the number of connected users.

1. In the navigation bar at the left of the Monitoring page, click on **Metrics Explorer** to begin building your dashboard.
    
2. Click on **Select a metric**.
    

This will filter the list to the resource types supported by the new Kubernetes Engine Monitoring tools.

3. Select **Kubernetes Container &gt; Popular Metrics &gt; CPU request utilization**.
    
4. Click **Apply**.
    

This is the same CPU request utilization chart we saw earlier when we examined the **fluentbit-gke-xxxx** pod, but now the chart will display that metric for all the pods.

5. Now click the **Save Chart** button in the upper right corner of the screen.
    
6. Give the chart a name such as **Container CPU Request**, and then click **Dashboard**.
    

The chart name should represent only this chart. You'll be able to give the entire dashboard a name in the next step.

7. Click **New Dashboard**.
    
8. Name your dashboard **Container Dashboard**.
    
9. Click **Save Chart**.
    
10. Now you can launch your dashboard by clicking **Dashboards** in the navigation pane, and then selecting the name of your new dashboard.
    

You now have a dashboard showing a single chart with a standard Monitoring metric. Next, you will create a chart for our custom Monitoring metric and then add it to this dashboard.

11. Click **Metrics explorer**.
    
12. Click on **Select a metric**.
    
13. Select **Kubernetes Pod &gt; Custom metrics &gt; Web App - Active Users**.
    
14. Click **Apply**.
    
15. Click on **Save Chart**.
    
16. Give the new chart a name, such as **Active Users**.
    
17. Select **Container Dashboard** from the dashboards dropdown.
    
18. Click **Save Chart**.
    
19. Navigate back to your *Container* dashboard and click the **Gear** icons to display the settings menu.
    
20. Then click **Legends &gt; Table** to display the text under each chart.
    
21. Click the three vertical bars next to the word **Value** at the right of each chart.
    

This displays a popup which contains the various labels which were included in the timeSeries data sent by our application server. You can use this information to filter or even aggregate the data in the chart.

## **Task 4. Creating alerts with Kubernetes Engine Monitoring**

In this task, you will configure an alert within Kubernetes Engine Monitoring and then use the dashboard to identify and respond to the incident.

### Create an Alert Policy

You will now create an alert policy to detect high CPU utilization among the containers.

1. In the Cloud Console, from the **Navigation menu**, select **Monitoring &gt; Detect &gt;Alerting**.
    
2. Click **\+ Create Policy**.
    
3. Click on **Select a metric** dropdown.
    
4. Uncheck the **Active** option.
    
5. Type **Kubernetes Container** in filter by resource and metric name.
    
6. Click on **Kubernetes Container &gt; Container**.
    
7. Select **CPU request utilization**.
    
8. Click **Apply**.**Note:** If you cannot locate the **Kubernetes Container** resource type, you might have to refresh the page.
    
9. Set **Rolling windows** to 1 min.
    
10. Click **Next**.
    
11. Set Threshold position to **Above Threshold**.
    
12. Set **0.99** as your **Threshold value**.
    
13. Click **Next**.
    

### Configure notifications and finish the alerting policy

1. Click on dropdown arrow next to **Notification Channels**, then click on **Manage Notification Channels**, then click on **Notification channels** page will open in new tab.
    
2. Scroll down the page and click on **ADD NEW** for **Email**.
    
3. Enter your personal email in the **Email Address** field and a **Display name**.
    
4. Click **Save**.
    
5. Go back to the previous **Create alerting policy** tab.
    
6. Click on **Notification Channels** again, then click on the **Refresh icon** to get the display name you mentioned in the previous step. Click **Notification Channels** again if needed.
    
7. Now, select your **Display name** and click **OK**.
    
8. Name the alert `CPU request utilization`.
    
9. Click **Next**.
    
10. Review the alert and click **Create Policy**.
    

Click *Check my progress* to verify the objective.

Creating Alerts with Kubernetes Engine Monitoring

Check my progress

### Respond to an Incident

Now, you will return to the monitoring dashboard where an incident is being reported on one of the containers.

1. In the Monitoring page, select **Overview** &gt; **GKE**. On the Kubernetes Engine Monitoring dashboard, you should see an incident reported on the container.
    
2. In the **Containers** tab, click on the container name which shows the alert. It will take a minute or two to register the alert and you may need to refresh the page to see the alert.
    
3. Go to **Alerting** page.
    
4. Click the alert name **CPU request utilization** to view additional details.
    
5. Open the incident and click on the **Incident summary** entry.
    
6. Click on **Acknowledge Incident**. The incident status now shows Acknowledged, but that doesn't solve the problem. You need to fix the root cause of the problem; the CPU Load Generator container.
    
7. Open the web interface for the GCP-GKE-Monitor-Test tool.
    
8. In the **Generate CPU Load** section, click the **Stop CPU Load** button to resolve the issue by stopping the CPU Load Generator.
    
9. You may now close the GCP-GKE-Monitor-Test web browser window.
    

---

## Solution of Lab

%[https://youtu.be/LEpX5uQVEvI] 

```apache
export my_zone=
export my_cluster=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1742285438806/22bd9c76-f5dd-44f8-9033-2a75731f46f1.png align="center")

```apache
curl -LO raw.githubusercontent.com/gcpsolution99/GCP-solution/refs/heads/main/GSP/GKE-Native.sh
sudo chmod +x GKE-Native.sh
./GKE-Native.sh
```