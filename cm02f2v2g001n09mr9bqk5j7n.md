---
title: "Exploring Cost-optimization for GKE Virtual Machines - GSP767"
seoTitle: "Exploring Cost-optimization for GKE Virtual Machines - GSP767"
seoDescription: "The underlying infrastructure of a Google Kubernetes Engine cluster is made up of nodes which are individual Compute VM instances. This lab shows how optimi"
datePublished: Tue Aug 20 2024 12:44:30 GMT+0000 (Coordinated Universal Time)
cuid: cm02f2v2g001n09mr9bqk5j7n
slug: exploring-cost-optimization-for-gke-virtual-machines-gsp767
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724157580686/03cde41a-567a-4e22-a16d-c315bb3a51c0.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724157857514/e9f53a9c-44fa-4eb2-beb5-d8deb3d5c412.png
tags: exploring-cost-optimization-for-gke-virtual-machines-gsp767

---

## **Overview**

The underlying infrastructure of a Google Kubernetes Engine cluster is made up of nodes which are individual Compute VM instances. This lab shows how optimization of your cluster's infrastructure can help save costs and lead to a more efficient architecture for your applications.

You will learn strategy to help maximize utilization (and avoid underutilization) of your valuable infrastructure resources through selecting properly shaped machine types for an example workload. In addition to the type of infrastructure you’re using, the physical geographical location of that infrastructure also impacts cost. Through this exercise, you will explore how to create a cost effective strategy for managing higher availability regional clusters.

## **Objectives**

In this lab, you will learn how to:

* Examine Resource Usage of a Deployment
    
* Scale Up a Deployment
    
* Migrate Your Workload to a Node Pool with an Optimized Machine Type
    
* Explore Location Options for your Cluster
    
* Monitor Flow Logs between Pods in Different Zones
    
* Move a Chatty Pod to Minimize Cross-Zonal Traffic Costs
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab Details** panel with the following:
    
    * The **Open Google Cloud console** button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the **Sign in** page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-04-3e5f15d38435@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    p3TEqTAYtIxp
    ```
    
    You can also find the **Password** in the **Lab Details** panel.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To view a menu with a list of Google Cloud products and services, click the **Navigation menu** at the top-left.

![Navigation menu icon](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

This lab generates a small cluster you will use. The provisioning of the cluster takes about 2-5 minutes.

If you've pressed the **Start Lab** button and see a blue `resources being provisioned` message with a loading circle, your cluster is still being created.

You can begin reading the next instructions and explanations while you wait, but any shell commands won't work until your resources are done provisioning.

## **Task 1. Understanding Node machine types**

### General overview

A machine type is a set of virtualized hardware resources available to a virtual machine (VM) instance, including the system memory size, virtual CPU (vCPU) count, and persistent disk limits. Machine types are grouped and curated by families for different workloads.

When choosing a machine type for your node pool, the general purpose machine type family typically offers the best price-performance ratio for a variety of workloads. The general purpose machine types consist of the N-series and E2-series:

![A list of machine types, including E2, N2, N2D, and N1, along with their specifications such as memory and vCPUs.](https://cdn.qwiklabs.com/IRq8XomXlGBHG0Ohat3Q5fN2FGmPoPDp2nmdBrlKQBg%3D align="left")

The differences between the machine types might help your app and they might not. In general, E2s have similar performance to N1s but are optimized for cost. Usually, utilizing the E2 machine type alone can help save on costs.

However, with a cluster, it's most important that the resources utilized are optimized based on your application’s needs. For bigger applications or deployments that need to scale heavily, it can be cheaper to stack your workloads on a few optimized machines rather than spreading them across many general purpose ones.

Understanding the details of your app is important for this decision making progress. If your app has specific requirements, you can make sure the machine type is shaped to fit the app.

In the following section, you will take a look at a demo app and migrate it to a node pool with a well-shaped machine type.

## **Task 2. Choosing the right machine type for the Hello app**

### Inspect the Hello demo cluster's requirements

On startup, your lab generated a **Hello Demo Cluster** with two E2 medium (2vCPU, 4GB memory) nodes. This cluster is deploying one replica of a simple web application called **Hello App**, a web server written in Go that responds to all requests with the message "Hello, World!".

1. Once your lab has finished provisioning, in the **Cloud Console**, click on your **Navigation Menu** and then click on **Kubernetes Engine**.
    
2. In the **Kubernetes Clusters** window, select your **hello-demo-cluster**.
    
3. In the following window, select the **Nodes** tab:
    

![The Nodes tab highlighted within the hello-demo-cluster.](https://cdn.qwiklabs.com/z6lb4OjjpGND%2BJS5XigSNEE8Wjy8yJr89BZxg%2F6BfRE%3D align="left")

You should now see a list of your cluster's nodes:

![A list of nodes, along with their specifications, such as status, CPU requests, and namespace.](https://cdn.qwiklabs.com/%2Fvyb9Fw%2BfEw2Jy6WoDLrJDV76pszuxveTTMin5bXP0w%3D align="left")

Observe how GKE has utilized the resources of your cluster. You can see how much cpu and memory is being requested by each node as well as how much your nodes could potentially allocate.

4. Click on the first node of your cluster.
    

Look at the **Pods** section. You should see your `hello-server` pod in the `default` namespace. If you don't see a `hello-server` pod, go back and select the second node of your cluster instead.

You'll notice the `hello-server` pod is requesting 400 mcpu. You should also see a handful of other `kube-system` pods running. These are loaded to help enable GKE's cluster services, like monitoring.

![Several pods listed in the Pods section along with their statuses set to Running.](https://cdn.qwiklabs.com/9ZEVrgGaoMBT7%2F2qnkC7%2FpAUaEHTRFlqjZqYz6MbaQc%3D align="left")

5. Press the **Back** button to return to the previous **Nodes** page.
    

Already, you'll notice that it takes two E2-medium nodes to run one replica of your `Hello-App` along with the essential `kube-system` services. Also, while you're using most of the cluster's cpu resources, you're only using about 1/3rd of its allocatable memory.

If the workload for this app were completely static, you could create a machine type with a custom fitted shape that has the exact amount of cpu and memory needed. By doing this, you would consequently save costs on your overall cluster infrastructure.

However, GKE clusters often run multiple workloads and those workloads will typically need to be scaled up and down.

What would happen if the Hello App were to be scaled up?

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-e1aa8cb99d2e`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-e1aa8cb99d2e
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

2. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

3. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-04-3e5f15d38435@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

4. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-00-e1aa8cb99d2e
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Scale up Hello app

1. Access your cluster's credentials:
    

```apache
gcloud container clusters get-credentials hello-demo-cluster --zone us-west1-a
```

2. Scale up your `Hello-Server`:
    

```apache
kubectl scale deployment hello-server --replicas=2
```

Click **Check my progress** to verify that you've performed the above task.

Scale Up Hello App

**Check my progress**

3. Back in the **Console**, select **Workloads** from the **Kubernetes Engine** menu on the left.
    

You might see your `hello-server` with the **Does not have minimum availability** error status.

**Note:** In your lab you might not see the error. Depending on the kubernetes version of your cluster, kube-system pods can have smaller resource requests and the cluster might be able to accommodate the new workload. If you don't see the error, do not worry. The error has no effect on the completion of this lab.

4. Click on the error message to get status details. You will see that the reason is `Insufficient cpu`.
    

This is to be expected. If you remember, the cluster barely had any more cpu resources and you requested another 400m with another replica of the `hello-server`.

5. Increase your node pool to handle your new request:
    

```apache
gcloud container clusters resize hello-demo-cluster --node-pool my-node-pool \
    --num-nodes 3 --zone us-west1-a
```

6. When asked to continue, type `y` and press `enter`.
    
7. In the **Console**, refresh the **Workloads** page until you see the status of your `hello-server` workload turn to **OK**:
    

![hello-server with "OK" status on the Workloads page](https://cdn.qwiklabs.com/yt4%2Fx2FQoIIZUdJPvFZz2zrdGTLyvMA%2BUcMaJDEwkRw%3D align="left")

### Examine your cluster

With the workload successfully scaled up, navigate back to the nodes tab of your cluster.

1. Click on **hello-demo-cluster**:
    

![hello-demo-cluser highlighted on the nodes tab](https://cdn.qwiklabs.com/qaeRvtdIXAglREmsHsetWfIiFimBOFq1FGMEE7v9Rl4%3D align="left")

2. Then, click on the **Nodes** tab.
    

The larger node pool is able to handle the heavier workload, but look at how your infrastructure's resources are being utilized.

![Several nodes listed within the larger node pool, along with information such as status and storage requests.](https://cdn.qwiklabs.com/%2Fvyb9Fw%2BfEw2Jy6WoDLrJDV76pszuxveTTMin5bXP0w%3D align="left")

Although GKE uses a cluster's resources to the best of its ability, there is room for some optimization here. You can see that one of your nodes is using most of its memory, but two of your nodes have a considerable amount of unused memory.

At this point, if you continued to scale up the app, you would start to see a similar pattern. Kubernetes would attempt to find a node for each new replica of the `hello-server` deployment, fail, and then create a new node with roughly 600m of cpu.

### A binpacking problem

A binpacking problem is one in which you must fit items of various volumes/shapes into a finite number of regularly shaped “bins” or containers. Essentially, the challenge is to fit the items into the fewest number of bins, “packing” them as efficiently as possible.

This is similar to the challenge faced when trying to optimize Kubernetes clusters for the applications they run. You have a number of applications, likely with various resource requirements (i.e. memory and cpu). You must try to fit these applications into the infrastructure resources Kubernetes manages for you (where most of your cluster’s cost likely lies) as efficiently as possible.

Your **Hello Demo Cluster** does not employ very efficient binpacking. It would be more cost-efficient to configure Kubernetes to use a machine type more fitted to this workload.

**Note:** For simplicity, this lab focuses on optimizing one application. In reality, your Kubernetes cluster will likely be running many applications with varying requirements. Kubernetes has tools to help you match your application workloads to various machines Kubernetes has access to. You can use multiple GKE Node Pools to have one Kubernetes cluster manage multiple machine types.

### Migrate to optimized node pool

* Create a new node pool with a larger machine type:
    

```apache
gcloud container node-pools create larger-pool \
  --cluster=hello-demo-cluster \
  --machine-type=e2-standard-2 \
  --num-nodes=1 \
  --zone=us-west1-a
```

Click **Check my progress** to verify that you've performed the above task.

Create node pool

**Check my progress**

Now, you can migrate pods to the new node pool by following these steps:

1. **Cordon the existing node pool**: This operation marks the nodes in the existing node pool (`node`) as unschedulable. Kubernetes stops scheduling new Pods to these nodes once you mark them as unschedulable.
    
2. **Drain the existing node pool**: This operation evicts the workloads running on the nodes of the existing node pool (`node`) gracefully.
    

* First, cordon the original node pool:
    

```apache
for node in $(kubectl get nodes -l cloud.google.com/gke-nodepool=my-node-pool -o=name); do
  kubectl cordon "$node";
done
```

* Next, drain the pool:
    

```apache
for node in $(kubectl get nodes -l cloud.google.com/gke-nodepool=my-node-pool -o=name); do
  kubectl drain --force --ignore-daemonsets --delete-local-data --grace-period=10 "$node";
done
```

At this point, you should see that your pods are running on the new, `larger-pool`, node pool:

```apache
kubectl get pods -o=wide
```

3. With the pods migrated, it's safe to delete the old node pool:
    

```apache
gcloud container node-pools delete my-node-pool --cluster hello-demo-cluster --zone us-west1-a
```

4. When asked to continue, type `y` and `enter`.
    

Deletion can take about 2 minutes. Read the next section while you wait.

### Cost analysis

You're now running the same workload which required three `e2-medium` machines on one `e2-standard-2` machine.

Take a look at the hourly cost for having an e2 standard and shared core machine types up:

`Standard:`

![Several Standard e2 machine types listed, along with their specifications, such as Virtual CPUs, memory, and price.](https://cdn.qwiklabs.com/d0i1gHkX6VCNmJ9fme8eIdke%2F5my1q9ZxEUUSdgs3jA%3D align="left")

`Shared Core:`

![Several Shared e2 machine types listed, along with their specifications, such as vCPUs, memory, and price.](https://cdn.qwiklabs.com/RyaXIEn84fq%2FORu6P43YGDz7d%2F5PZg2aR2FbKQ5IS78%3D align="left")

The cost of three `e2-medium` machines would be about `$0.1` an hour while one `e2-standard-2` is listed at about `$0.067` an hour.

Saving `$.04` an hour may seem small, but this cost can add up over the lifetime of a running application. It would be even more noticeable at a larger scale too. Because the `e2-standard-2` machine can pack your workload more efficiently and there's less unused space, the cost of scaling up would grow less quickly.

This is interesting because `E2-medium` is a shared cored machine type which is designed to be cost effective for small, non resource intensive applications. But, for the `Hello-App`'s current workload, you see that using a node pool with a larger machine type ends up being a more cost effective strategy.

In the **Cloud Console**, you should still be on the **Nodes** tab of your **hello-demo** cluster. Refresh this tab and examine the `CPU Requested` and `CPU Allocatable` fields for your `larger-pool` node.

Notice there's room for further optimization. The new node could fit another replica of your workload without needing to provision another node. Or again, you could potentially choose a custom sized machine type that fits the CPU and memory needs of the application saving even more resources.

It should be noted that these prices will vary depending on the location of your cluster. The next part of this lab will deal with selecting the best region and managing a regional cluster.

### Selecting the appropriate location for a cluster

### Regions and zones overview

Compute Engine resources, used for your cluster's nodes, are hosted in multiple locations worldwide. These locations are composed of regions and zones. A region is a specific geographical location where you can host your resources. Regions have three or more zones.

Resources that live in a zone, such as virtual machine instances or zonal persistent disks, are referred to as zonal resources. Other resources, like static external IP addresses, are regional. Regional resources can be used by any resource in that region, regardless of zone, while zonal resources can only be used by other resources in the same zone.

When choosing a region or zone, it's important to think about:

1. **Handling failures** - If your resources for your app are only distributed in one zone and that zone becomes unavailable, your app will also become unavailable. For larger scale, high demand apps it's often best practice to distribute resources across multiple zones or regions in order to handle failures.
    
2. **Decreased network latency** - To decrease network latency, you might want to choose a region or zone that is close to your point of service. For example, if you mostly have customers on the East Coast of the US, then you might want to choose a primary region and zone that is close to that area.
    

### Best practices for clusters

Costs vary between regions based on a variety of factors. For example, resources in the `us-west2` region tend to be more expensive than those in `us-central1`.

When selecting a region or zone for your cluster, examine what your app is doing. For a latency-sensitive production environment, placing your app in a region/zone with decreased network latency and increased efficiency would likely give you the best performance-to-cost ratio.

However, a non-latency-sensitive dev environment could be placed in a less expensive region to reduce costs.

**Note:** For more information on VMs and pricing per region, refer to the [VM instance pricing documentation](https://cloud.google.com/compute/vm-instance-pricing).

### Handling cluster availability

The types of available clusters in GKE include zonal (single-zone or multi-zonal) and regional. At face value, a single-zone cluster will be the least expensive option. However, for high-availability of your applications, it is best to distribute your cluster’s infrastructure resources across zones.

For many cases, prioritizing availability in your cluster through a multi-zonal or regional cluster results in the best cost-to-performance architecture.

**Note:** A multi-zonal cluster has at least one additional zone defined but only has a single replica of the control plane running in a single zone. Workloads can still run during an outage of the control plane's zone, but no configurations can be made to the cluster until the control plane is available.

A regional cluster has multiple replicas of the control plane, running in multiple zones within a given region. Nodes also run in each zone where a replica of the control plane runs. Regional clusters consume the most resources but offer the best availability.

Learn more from the article [Types of clusters](https://cloud.google.com/kubernetes-engine/docs/concepts/types-of-clusters).

## **Task 3. Managing a regional cluster**

### Setup

Managing your cluster's resources across multiple zones becomes a little more complex. If not careful, it's possible to accumulate extra costs from unnecessary inter-zonal communication between your pods.

In this section, you'll observe the network traffic of your cluster and move two chatty pods, pods which are generating a lot of traffic to one another, to be in the same zone.

1. In your **Cloud Shell** tab, create a new regional cluster (this command will take a few minutes to complete):
    

```apache
gcloud container clusters create regional-demo --region=us-west1 --num-nodes=1
```

In order to demonstrate traffic between your pods and nodes, you will create two pods on separate nodes in your regional cluster. We will use `ping` to generate traffic from one pod to the other to generate traffic which we can then monitor.

2. Run this command to create a manifest for your first pod:
    

```apache
cat << EOF > pod-1.yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-1
  labels:
    security: demo
spec:
  containers:
  - name: container-1
    image: wbitt/network-multitool
EOF
```

3. Create the first pod in Kubernetes by using this command:
    

```apache
kubectl apply -f pod-1.yaml
```

4. Next, run this command to create a manifest for your second pod:
    

```apache
cat << EOF > pod-2.yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-2
spec:
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: security
            operator: In
            values:
            - demo
        topologyKey: "kubernetes.io/hostname"
  containers:
  - name: container-2
    image: gcr.io/google-samples/node-hello:1.0
EOF
```

5. Create the second pod in Kubernetes:
    

```apache
kubectl apply -f pod-2.yaml
```

Click **Check my progress** to verify that you've performed the above task.

Check Pod Creation

**Check my progress**

The pods you created use the `node-hello` container and output a `Hello Kubernetes` message when requested.

If you look back at the `pod-2.yaml` file you created, you can see that **Pod Anti Affinity** is a defined rule. This enables you to ensure that the pod is *not* scheduled on the same node as `pod-1`. This is done by matching an expression based on `pod-1`’s `security: demo` label. **Pod Affinity** is used to ensure pods *are* scheduled on the same node, while **Pod Anti Affinity** is used to ensure pods are *not* scheduled on the same node.

**Note:** Kubernetes also has a concept of [Node Affinity](https://kubernetes.io/docs/tasks/configure-pod-container/assign-pods-nodes-using-node-affinity/), which can help you optimize which applications are run on what machine types.

In this case, **Pod Anti Affinity** is being used to help illustrate traffic between nodes, but smart use of **Pod Anti Affinity** and **Pod Affinity** can help you utilize your regional cluster's resources even better.

6. View the pods you created:
    

```apache
kubectl get pod pod-1 pod-2 --output wide
```

You will see both pods returned with a `Running` status and internal IPs.

**Sample output:**

```apache
NAME READY STATUS RESTARTS AGE IP NODE NOMINATED NODE READINESS GATES
pod-1 1/1 Running 0 4m40s 10.60.0.7 gke-regional-demo-default-pool-abb297f1-tz3b  
pod-2 1/1 Running 0 4m31s 10.60.2.3 gke-regional-demo-default-pool-28b6c708-qn7q
```

Take note of the IP address of `pod-2`. You will use it in the following command.

### Simulate traffic

1. Get a shell to your `pod-1` container:
    

```apache
kubectl exec -it pod-1 -- sh
```

2. In your shell, send a request to `pod-2` replacing **\[POD-2-IP\]** with the internal IP displayed for `pod-2`:
    

```apache
ping [POD-2-IP]
```

Take note of the average latency it takes to ping `pod-2` from `pod-1`.

### Examine flow logs

With `pod-1` pinging `pod-2`, you can enable flow logs on the subnet of the VPC the cluster was created to observe traffic.

1. In the **Cloud Console**, open the **Navigation Menu** and select **VPC Network** in the **Networking** section.
    
2. Locate the `default` subnet in the `us-west1` region and click on it.
    

![Highlighted default subnet for us-central1](https://cdn.qwiklabs.com/xlJuDNh61krC9Exp2xz8b54F89%2Fnp9lmnf4r7Mk%2FLsc%3D align="left")

3. Click **Edit** at the top of the screen.
    
4. Select **Flow Logs** to be **On**.
    
5. Then, click **Save**.
    
6. Next, click **View Flow Logs in Logs Explorer**.
    

![The View Flow Logs option highlighted within the Flow Logs menu.](https://cdn.qwiklabs.com/xFI8yhMOxwEucp1R5py3R6jDFuUkR%2FP5XmZQ9bdJfgs%3D align="left")

You'll now see a list of logs that display a large amount of information any time something was sent or received from one of your instances.

![A list of logs, along with their summary, timestamps, and severity.](https://cdn.qwiklabs.com/z8OLwoctr3IBiy7rAVwDwV6zdn6h9s5DM7VykTO7ZVw%3D align="left")

If the logs are not generated then replace `/` before vpc\_flows with `%2F` as given in the above screenshot.

This can be a little difficult to read. Next, export it to a BigQuery table so you can query the relevant information.

7. Click on **More actions** &gt; **Create Sink**.
    

![Two options in the More actions drop-down menu: Create sink, and Manage alerts.](https://cdn.qwiklabs.com/cSR9%2FGXOiDMFUvOBLXf9YlCW4r9TMdJKE%2BS%2BVi0cTu4%3D align="left")

8. Name your sink `FlowLogsSample`.
    
9. Click **Next**.
    

### Sink destination

* For your **Sink Service**, select **BigQuery Dataset**.
    
* For your **BigQuery Dataset**, select **Create new BigQuery dataset**.
    
* Name your dataset as '**us\_flow\_logs**', and click **CREATE DATASET**.
    

Everything else can be left as-is.

1. Click **Create Sink**.
    
2. Now, inspect your newly created dataset. In the **Cloud Console**, from the **Navigation Menu** in the **Analytics** section, click **BigQuery**.
    
3. Click **Done**.
    
4. Select your project name, and then select the **us\_flow\_logs** to see the newly created table. If no table is there, you may need to refresh until it has been created.
    
5. Click on the `compute_googleapis_com_vpc_flows_xxx` table under your `us_flow_logs` dataset.
    

![The Explorer pane, which includes the search box, the pinned projects, and table under the us_central_flow_logs dataset.](https://cdn.qwiklabs.com/uwtUC8ICO7mh8nZe3m%2B13Ekzf8nOyqcOVZRPp3Arf%2Bk%3D align="left")

6. Click on **Query &gt; In new tab**.
    
7. In the BigQuery Editor, paste this in between `SELECT` and `FROM`:
    

```apache
jsonPayload.src_instance.zone AS src_zone, jsonPayload.src_instance.vm_name AS src_vm, jsonPayload.dest_instance.zone AS dest_zone, jsonPayload.dest_instance.vm_name
```

8. Click **Run**.
    

![Query results displayed in the BigQuery Editor, along with the options: Save, More, and Schedule.](https://cdn.qwiklabs.com/WBKMJyRhJYzWmhU5i5ACx3mNrgwncnW4ZKEImB61UYQ%3D align="left")

You'll see the flow logs from before but filtered by `source zone`, `source vm`, `destination zone`, and `destination vm`.

Locate a few rows where there are calls being made between two different zones in your `regional-demo` cluster.

![Two rows within the regional-demo cluster: us-central1-a and us-central1-c.](https://cdn.qwiklabs.com/Zdr%2BfTaX0y6rXh4UVQ%2FTbYLAO18vQXYxArVWPWg%2FYic%3D align="left")

**Note:** Your logs will not be exactly the same numerically as the example image.

Observing the flow logs, you can see that there is frequent traffic between different zones.

Next, you will move the pods into the same zone and observe the benefits.

### Move a chatty pod to minimize cross-zonal traffic costs

1. Back in **Cloud Shell**, press **Ctrl** + **C** to cancel the `ping` command.
    
2. Type the `exit` command to exit `pod-1`'s shell:
    

```apache
exit
```

3. Run this command to edit the `pod-2` manifest:
    

```apache
sed -i 's/podAntiAffinity/podAffinity/g' pod-2.yaml
```

This changes your `Pod Anti Affinity` rule into a `Pod Affinity` rule while still using the same logic. Now `pod-2` will be scheduled on the same node as `pod-1`.

4. Delete the current running `pod-2`:
    

```apache
kubectl delete pod pod-2
```

5. With `pod-2` deleted, recreate it using the newly edited manifest:
    

```apache
kubectl create -f pod-2.yaml
```

Click **Check my progress** to verify that you've performed the above task.

Simulate Traffic

**Check my progress**

6. View the pods you created and ensure they are both `Running`:
    

```apache
kubectl get pod pod-1 pod-2 --output wide
```

From the output, you can see that `Pod-1` and `Pod-2` are now running on the same node.

Take note of the IP address of `pod-2`. You will use it in the following command.

7. Get a shell to your `pod-1` container:
    

```apache
kubectl exec -it pod-1 -- sh
```

8. In your shell, send a request to `pod-2` replacing **\[POD-2-IP\]** with the internal IP for `pod-2` from the earlier command:
    

```apache
ping [POD-2-IP]
```

You'll notice the average ping time between these pods is much faster now.

At this point, you can go back to your flow logs BigQuery dataset and check recent logs to verify there are no more undesired inter-zonal communications.

### Cost analysis

Take a look at the **VM-VM egress pricing within Google Cloud**:

![Three Google Cloud traffic types listed, along with their prices which range from $0 to $0.01 per GB.](https://cdn.qwiklabs.com/hABwqJqUGq1T%2BTHyl5VJI81p1zUaE3h64HlTGlqHowk%3D align="left")

When the pods were pinging each other from different zones, it was costing $0.01 per GB. While that may seem small, it could add up very quickly in a large scale cluster with multiple services making frequent calls between zones.

When you moved the pods into the same zone, the pinging became free of charge.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=PJNR_A3x0OM] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724157825245/90f20912-09e2-4113-862c-ba24e931264d.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Exploring%20Cost-optimization%20for%20GKE%20Virtual%20Machines/quicklabgsp767.sh
sudo chmod +x quicklabgsp767.sh
./quicklabgsp767.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724160521796/fdfc9d85-7aea-4a9d-90ce-5d970b155431.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724160533094/3a0d625e-de2b-4510-a2ad-2bd43964759c.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724160537667/761177da-60ed-4503-861d-2440821324ad.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724160543109/e4f97223-ad59-432d-8c2e-3a41fd58ebb6.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724160599815/fb008757-42b5-4593-9cfc-847e75ca4c6d.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724160561396/6531b5d3-7b0c-4cb9-98ff-0b60a7913af3.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724160580887/4998fa2b-5e55-4417-b668-654494456b0e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724160585514/afbef05c-dde0-4571-8f33-f751f7f8b324.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724160591676/1fe05db5-d97d-47e9-9086-bcb518affffc.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724160662415/29f6b9e1-7994-4f8c-87f3-53951f65facc.png align="center")