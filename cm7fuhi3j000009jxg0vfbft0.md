---
title: "Deploying GKE Autopilot Clusters (Solution)"
seoTitle: "Deploying GKE Autopilot Clusters (Solution)"
seoDescription: "In this lab, you use the Google Cloud Console to build GKE Autopilot clusters and deploy a sample Pod."
datePublished: Sat Feb 22 2025 06:54:44 GMT+0000 (Coordinated Universal Time)
cuid: cm7fuhi3j000009jxg0vfbft0
slug: deploying-gke-autopilot-clusters-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740207051542/352725f0-dec4-49bf-b080-4cef13f4a9a9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740207261686/6da6471d-ecef-4d95-a4c3-908fd5d4c900.png
tags: deploying-gke-autopilot-clusters-solution, deploying-gke-autopilot-clusters

---

## **Overview**

In this lab, you use the Google Cloud Console to build GKE Autopilot clusters and deploy a sample Pod.

## **Objectives**

In this lab, you learn how to perform the following tasks:

* Use the Google Cloud Console to build and manipulate GKE Autopilot clusters
    
* Use the Google Cloud Console to deploy a Pod
    
* Use the Google Cloud Console to examine the cluster and Pods
    

## **Lab setup**

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

After you complete the initial sign-in steps, the project dashboard opens.

## **Task 1. Deploy GKE clusters**

In this task, you use the Google Cloud Console and Cloud Shell to deploy GKE clusters.

### Use the Google Cloud Console to deploy a GKE cluster

1. In the Google Cloud Console, on the **Navigation menu** (), click **Kubernetes Engine** &gt; **Clusters**.
    
2. Click **Create** to begin creating a GKE cluster.
    
3. Examine the console UI and the controls to change the cluster name, the cluster location, the Kubernetes version, the number of nodes, and the node resources such as the machine type in the default node pool.
    

Clusters can be created across a region or in a single zone. A single zone is the default. When you deploy across a region the nodes are deployed to three separate zones and the total number of nodes deployed will be three times higher.

4. Change the cluster name to **autopilot-cluster-1** and region to `us-east1`. Leave all the values at their defaults and click **Create**.
    

The cluster begins provisioning.

**Note:** You need to wait a few minutes for the cluster deployment to complete.

When provisioning is complete, the **Kubernetes Engine &gt; Clusters** page looks like this screenshot:

![Clusters page](https://cdn.qwiklabs.com/XH8GI2rG7sgMWo6fcoyrw2g87aH8tEUUm2ivmJtvudU%3D align="left")

Click *Check my progress* to verify the objective.

Assessment Completed!

Deploy GKE cluster

Check my progress

*Assessment Completed!*

5. Click the cluster name **autopilot-cluster-1** to view the cluster details.
    
6. You can scroll down the page to view more details.
    
7. Click the **Storage** tab under the cluster name (autopilot-cluster-1) at the top to view more of the cluster details.
    

## **Task 2. Deploy a sample workload**

In this task, you will use the Google Cloud console to deploy a Pod running the nginx web server as a sample workload.

1. In the Google Cloud Console, on the **Navigation menu**(), click **Kubernetes Engine** &gt; **Workloads**.
    
2. Click **Create deployment**.
    
3. For **Deployment name** enter **nginx-1**.
    
    Accept the default container image, nginx:latest, which deploys three Pods each with a single container running the latest version of nginx.
    
4. Click the **Deploy** button, leaving the **Configuration** details at the defaults.
    
5. When the deployment completes your screen will refresh to show the details of your new nginx deployment.
    

Click *Check my progress* to verify the objective.

Deploy a sample nginx workload

Check my progress

## **Task 3. View details about workloads in the Google Cloud Console**

In this task, you view details about your GKE workloads directly in the Google Cloud Console.

1. In the Google Cloud Console, on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), click **Kubernetes Engine** &gt; **Workloads**.
    
2. In the Google Cloud Console, on the **Kubernetes Engine &gt; Workloads** page, click **nginx-1**.
    

This displays the overview information for the workload, showing details like resource utilization charts, links to logs, and details of the Pods associated with this workload.

3. In the Google Cloud Console, click the **Details** tab for the **nginx-1** workload. The Details tab shows more details about the workload including the Pod specification, number and status of Pod replicas, and details about the horizontal Pod autoscaler.
    
4. Click the **Revision History** tab. This displays a list of the revisions that have been made to this workload.
    
5. Click the **Events** tab. This tab lists events associated with this workload.
    
6. Then, click the **YAML** tab. This tab provides the complete YAML file that defines these components and full configuration of this sample workload.
    
7. While you are still in the Google Cloud Console's **Details** tab for the **nginx-1** workload, click the **Overview** tab, scroll down to the **Managed Pods** section, and click the name of one of the Pods to view the details page for that Pod.
    
8. The Pod details page provides information on the Pod configuration and resource utilization and the node where the Pod is running.
    
9. In the **Pod details** page, you can click the Events and Logs tabs to view event details and links to container logs in Cloud Operations.
    
10. Click the **YAML** tab to view the detailed YAML file for the Pod configuration.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=w0NbIni0-Do&ab_channel=cloudsdevspace]