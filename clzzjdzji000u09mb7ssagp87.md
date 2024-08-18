---
title: "Implement Cloud Security Fundamentals on Google Cloud: Challenge Lab - GSP342"
seoTitle: "Implement Cloud Security Fundamentals on Google Cloud: Challenge Lab"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Sun Aug 18 2024 12:21:49 GMT+0000 (Coordinated Universal Time)
cuid: clzzjdzji000u09mb7ssagp87
slug: implement-cloud-security-fundamentals-on-google-cloud-challenge-lab-gsp342
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723983362489/559a7405-a09b-459d-94f0-241fba2cca4b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723983692318/eefff81f-2c1c-4f97-91bf-0d37ceca9a5c.png
tags: implement-cloud-security-fundamentals-on-google-cloud-challenge-lab-gsp342, gsp342

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Implement Cloud Security Fundamentals on Google Cloud](https://www.cloudskillsboost.google/course_templates/645) skill badge. Are you ready for the challenge?

### Topics tested

* Create a custom security role.
    
* Create a service account.
    
* Bind IAM security roles to a service account.
    
* Create a private Kubernetes Engine cluster in a custom subnet.
    
* Deploy an application to a private Kubernetes Engine cluster
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## **Challenge scenario**

You have started a new role as a junior member of the security team for the Orca team in Jooli Inc. Your team is responsible for ensuring the security of the Cloud infrastructure and services that the company's applications depend on.

You are expected to have the skills and knowledge for these tasks, so don't expect step-by-step guides to be provided.

### Your challenge

You have been asked to deploy, configure, and test a new Kubernetes Engine cluster that will be used for application development and pipeline testing by the Orca development team.

As per the organization's security standards you must ensure that the new Kubernetes Engine cluster is built according to the organization's most recent security standards and thereby must comply with the following:

* The cluster must be deployed using a dedicated service account configured with the least privileges required.
    
* The cluster must be deployed as a Kubernetes Engine private cluster, with the public endpoint disabled, and the master authorized network set to include only the ip-address of the Orca group's management jumphost.
    
* The Kubernetes Engine private cluster must be deployed to the `orca-build-subnet` in the Orca Build VPC.
    

From a previous project you know that the minimum permissions required by the service account that is specified for a Kubernetes Engine cluster is covered by these three built in roles:

* `roles/monitoring.viewer`
    
* `roles/monitoring.metricWriter`
    
* `roles/logging.logWriter`
    

These roles are specified in the Google Kubernetes Engine (GKE)'s Harden your cluster's security guide in the [Use least privilege Google service accounts](https://cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster#use_least_privilege_sa) section.

You must bind the above roles to the service account used by the cluster as well as a custom role that you must create in order to provide access to any other services specified by the development team. Initially you have been told that the development team requires that the service account used by the cluster should have the permissions necessary to add and update objects in Google Cloud Storage buckets. To do this you will have to create a new custom IAM role that will provide the following permissions:

* `storage.buckets.get`
    
* `storage.objects.get`
    
* `storage.objects.list`
    
* `storage.objects.update`
    
* `storage.objects.create`
    

Once you have created the new private cluster you must test that it is correctly configured by connecting to it from the jumphost, `orca-jumphost`, in the management subnet `orca-mgmt-subnet`. As this compute instance is not in the same subnet as the private cluster you must make sure that the master authorized networks for the cluster includes the internal ip-address for the instance, and you must specify the `--internal-ip` flag when retrieving cluster credentials using the `gcloud container clusters get-credentials` command.

All new cloud objects and services that you create should include the "orca-" prefix.

Your final task is to validate that the cluster is working correctly by deploying a simple application to the cluster to test that management access to the cluster using the `kubectl` tool is working from the `orca-jumphost` compute instance.

For all tasks in this lab, use the `us-east4` region and the `us-east4-c` zone.

## **Task 1. Create a custom security role**

Your first task is to create a new custom IAM security role called `orca_storage_editor_507` that will provide the Google Cloud storage bucket and object permissions required to be able to create and update storage objects.

Check that a Custom security role has been created.

**Check my progress**

## **Task 2. Create a service account**

Your second task is to create the dedicated service account that will be used as the service account for your new private cluster. You must name this account `orca-private-cluster-675-sa`.

Check that a new service account has been created.

**Check my progress**

## **Task 3. Bind a custom security role to a service account**

You must now bind the Cloud Operations logging and monitoring roles that are required for Kubernetes Engine Cluster service accounts as well as the custom IAM role you created for storage permissions to the Service Account you created earlier.

Check that a the correct built in and custom security roles have been bound to the new service account.

**Check my progress**

## **Task 4. Create and configure a new Kubernetes Engine private cluster**

You must now use the service account you have configured when creating a new Kubernetes Engine private cluster. The new cluster configuration must include the following:

* The cluster must be called `orca-cluster-326`
    
* The cluster must be deployed to the subnet `orca-build-subnet`
    
* The cluster must be configured to use the `orca-private-cluster-675-sa` service account.
    
* The private cluster options `enable-master-authorized-networks`, `enable-ip-alias`, `enable-private-nodes`, and `enable-private-endpoint` must be enabled.
    

Once the cluster is configured you must add the internal ip-address of the `orca-jumphost` compute instance to the master authorized network list.

Confirm that a Kubernetes Engine private cluster has been deployed correctly.

**Check my progress**

## **Task 5. Deploy an application to a private Kubernetes Engine cluster**

You have a simple test application that can be deployed to any cluster to quickly test that basic container deployment functionality is working and that basic services can be created and accessed. You must configure the environment so that you can deploy this simple demo to the new cluster using the jumphost `orca-jumphost`.

**Note:** Make sure to properly install the `gke-gcloud-auth-plugin` before running any `kubectl` commands. This is detailed below in **Tip 1**.

```apache
kubectl create deployment hello-server --image=gcr.io/google-samples/hello-app:1.0
```

This deploys an application that listens on port 8080 that can be exposed using a basic load balancer service for testing.

Check that an application has been deployed to a private Kubernetes Engine cluster.

**Check my progress**

## **Tips and Tricks**

* **Tip 1**. Make sure to use the `gke-gcloud-auth-plugin`, which is needed for continued use of `kubectl`. You can install it by running the following commands. Make sure to replace your GKE cluster name and zone, as well as your Project ID.
    

```apache
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin
echo "export USE_GKE_GCLOUD_AUTH_PLUGIN=True" >> ~/.bashrc
source ~/.bashrc
gcloud container clusters get-credentials <your cluster name> --internal-ip --project=<project ID> --zone <cluster zone>
```

* **Tip 2**. When adding the internal ip-address of the `orca-jumphost` machine to the list of authorized addresses for the private Kubernetes Engine cluster you should use a `/32` netmask to ensure that only the specific compute instance is authorized.
    
* **Tip 3**. You cannot connect directly to a Kubernetes Engine private cluster from a VPC or other network outside of the VPC the private cluster has been deployed to if the `enable-private-endpoint` option has been specified. This represents the highest security option for a private cluster and you must use a jumphost, or a proxy within the same VPC as the cluster, and you must use that jumphost or proxy to connect to the internal managment ip-address for the cluster.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=0f2zHltA-LY] 

```apache
export CUSTOM_SECURIY_ROLE=
export SERVICE_ACCOUNT=
export CLUSTER_NAME=
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723983547575/36bb4035-ef2c-4c01-86f5-3c67a941f641.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Implement%20Cloud%20Security%20Fundamentals%20on%20Google%20Cloud%20Challenge%20Lab/quicklabgsp342.sh
sudo chmod +x quicklabgsp342.sh
./quicklabgsp342.sh
```