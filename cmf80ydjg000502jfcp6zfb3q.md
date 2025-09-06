---
title: "Develop your Google Cloud Network: Challenge Lab - GSP321"
seoTitle: "Develop your Google Cloud Network: Challenge Lab - GSP321"
seoDescription: "Take on GSP321 Challenge Lab to build a WordPress environment on Google Cloud, creating VPCs, Kubernetes clusters, and more"
datePublished: Sat Sep 06 2025 08:51:18 GMT+0000 (Coordinated Universal Time)
cuid: cmf80ydjg000502jfcp6zfb3q
slug: develop-your-google-cloud-network-challenge-lab-gsp321
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757145113432/dca34d64-659e-4fdc-ba5c-92ef66713b3e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757148644592/48b23812-36eb-44ab-9337-a734d411cecb.png
tags: develop-your-google-cloud-network-challenge-lab-gsp321, develop-your-google-cloud-network-challenge-lab, gsp321, google-cloud-network

---

## Introduction

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have completed the labs in the [Develop your Google Cloud Network](https://www.cloudskillsboost.google/course_templates/625) skill badge. Are you up for the challenge?

## Setup

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Challenge scenario

As a cloud engineer at Jooli Inc. and recently trained with Google Cloud and Kubernetes, you have been asked to help a new team (Griffin) set up their environment. The team has asked for your help and has done some work, but needs you to complete the work.

You are expected to have the skills and knowledge for these tasks so don’t expect step-by-step guides.

You need to complete the following tasks:

* Create a development VPC with three subnets manually
    
* Create a production VPC with three subnets manually
    
* Create a bastion that is connected to both VPCs
    
* Create a development Cloud SQL Instance and connect and prepare the WordPress environment
    
* Create a Kubernetes cluster in the development VPC for WordPress
    
* Prepare the Kubernetes cluster for the WordPress environment
    
* Create a WordPress deployment using the supplied configuration
    
* Enable monitoring of the cluster
    
* Provide access for an additional engineer
    

Some Jooli Inc. standards you should follow:

* Create all resources in the `us-central1` region and `us-central1-c` zone, unless otherwise directed.
    
* Use the project VPCs.
    
* Naming is normally *team-resource*, e.g. an instance could be named **kraken-webserver1**.
    
* Allocate cost effective resource sizes. Projects are monitored and excessive resource use will result in the containing project's termination (and possibly yours), so beware. This is the guidance the monitoring team is willing to share: unless directed, use `e2-medium`.
    

### Your challenge

You need to help the team with some of their initial work on a new project. They plan to use WordPress and need you to set up a development environment. Some of the work was already done for you, but other parts require your expert skills.

As soon as you sit down at your desk and open your new laptop you receive the following request to complete these tasks. Good luck!

#### Environment

![Google Cloud environment, Team Griffin Infrastructure diagram](https://cdn.qwiklabs.com/UE5MydlafU0QvN7zdaOLo%2BVxvETvmuPJh%2B9kZxQnOzE%3D align="left")

## Task 1. Create development VPC manually

* Create a VPC called `griffin-dev-vpc` with the following subnets only:
    
    * `griffin-dev-wp`
        
        * IP address block: `192.168.16.0/20`
            
    * `griffin-dev-mgmt`
        
        * IP address block: `192.168.32.0/20`
            

Click *Check my progress* to verify the objective.

Create development VPC manually

**Note:** If you don't get a green check mark, click on the **Score** fly-out on the top right and click **Check my progress** on the relevant step. A hint pop up opens to give you advice.

## Task 2. Create production VPC manually

* Create a VPC called `griffin-prod-vpc` with the following subnets only:
    
    * `griffin-prod-wp`
        
        * IP address block: `192.168.48.0/20`
            
    * `griffin-prod-mgmt`
        
        * IP address block: `192.168.64.0/20`
            

Click *Check my progress* to verify the objective.

Create production VPC manually

**Note:** If you don't get a green check mark, click on the **Score** fly-out on the top right and click **Check my progress** on the relevant step. A hint pop up opens to give you advice.

## Task 3. Create bastion host

* Create a bastion host with two network interfaces, one connected to `griffin-dev-mgmt` and the other connected to `griffin-prod-mgmt`. Make sure you can SSH to the host.
    

Click *Check my progress* to verify the objective.

Create bastion host

**Note:** If you don't get a green check mark, click on the **Score** fly-out on the top right and click **Check my progress** on the relevant step. A hint pop up opens to give you advice.

## Task 4. Create and configure Cloud SQL Instance

1. Create a **MySQL Cloud SQL Instance** called `griffin-dev-db` in `us-central1`.
    
2. Connect to the instance and run the following SQL commands to prepare the **WordPress** environment:
    

```apache
CREATE DATABASE wordpress;
CREATE USER "wp_user"@"%" IDENTIFIED BY "stormwind_rules";
GRANT ALL PRIVILEGES ON wordpress.* TO "wp_user"@"%";
FLUSH PRIVILEGES;
```

Copied!

These SQL statements create the worpdress database and create a user with access to the wordpress database.

You will use the username and password in task 6.

Click *Check my progress* to verify the objective.

Create and configure Cloud SQL Instance

**Note:** If you don't get a green check mark, click on the **Score** fly-out on the top right and click **Check my progress** on the relevant step. A hint pop up opens to give you advice.

## Task 5. Create Kubernetes cluster

* Create a 2 node cluster (e2-standard-4) called `griffin-dev`, in the `griffin-dev-wp` subnet, and in zone `us-central1-c`.
    

Click *Check my progress* to verify the objective.

Create Kubernetes cluster

**Note:** If you don't get a green check mark, click on the **Score** fly-out on the top right and click **Check my progress** on the relevant step. A hint pop up opens to give you advice.

## Task 6. Prepare the Kubernetes cluster

1. From Cloud Shell copy all files from `gs://spls/gsp321/wp-k8s`.
    

The **WordPress** server needs to access the MySQL database using the *username* and *password* you created in task 4.

2. You do this by setting the values as secrets. **WordPress** also needs to store its working files outside the container, so you need to create a volume.
    
3. Add the following secrets and volume to the cluster using `wp-env.yaml`.
    
4. Make sure you configure the *username* to `wp_user` and *password* to `stormwind_rules` before creating the configuration.
    

You also need to provide a key for a service account that was already set up. This service account provides access to the database for a sidecar container.

5. Use the command below to create the key, and then add the key to the Kubernetes environment:
    

```apache
gcloud iam service-accounts keys create key.json \
    --iam-account=cloud-sql-proxy@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com
kubectl create secret generic cloudsql-instance-credentials \
    --from-file key.json
```

Copied!

Click *Check my progress* to verify the objective.

Prepare the Kubernetes cluster

**Note:** If you don't get a green check mark, click on the **Score** fly-out on the top right and click **Check my progress** on the relevant step. A hint pop up opens to give you advice.

## Task 7. Create a WordPress deployment

Now that you have provisioned the MySQL database, and set up the secrets and volume, you can create the deployment using `wp-deployment.yaml`.

1. Before you create the deployment you need to edit `wp-deployment.yaml`.
    
2. Replace **YOUR\_SQL\_INSTANCE** with griffin-dev-db's **Instance connection name**.
    
3. Get the **Instance connection name** from your Cloud SQL instance.
    
4. After you create your WordPress deployment, create the service with `wp-service.yaml`.
    
5. Once the Load Balancer is created, you can visit the site and ensure you see the **WordPress** site installer.  
    At this point the dev team will take over and complete the install and you move on to the next task.
    

![WordPress site installer](https://cdn.qwiklabs.com/u9QONUelkiErVu8MR%2BeuhxVDI0QdUxWqK%2BmlEdVgpao%3D align="left")

Click *Check my progress* to verify the objective.

Create a WordPress deployment

**Note:** If you don't get a green check mark, click on the **Score** fly-out on the top right and click **Check my progress** on the relevant step. A hint pop up opens to give you advice.

## Task 8. Enable monitoring

* Create an uptime check for your WordPress development site.
    

Click *Check my progress* to verify the objective.

Enable monitoring

**Note:** If you don't get a green check mark, click on the **Score** fly-out on the top right and click **Check my progress** on the relevant step. A hint pop up opens to give you advice.

## Task 9. Provide access for an additional engineer

* You have an additional engineer starting and you want to ensure they have access to the project. Grant them the editor role to the project.
    

The second user account for the lab represents the additional engineer.

Click *Check my progress* to verify the objective.

Provide access for an additional engineer

**Note:** If you don't get a green check mark, click on the **Score** fly-out on the top right and click **Check my progress** on the relevant step. A hint pop up opens to give you advice.

---

## Solution of Lab

%[https://youtu.be/6S-cHVLmNL4] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP321/lab.sh
source lab.sh
```

---

### Manual

%[https://www.youtube.com/watch?v=xLK6HgZaROc] 

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Develop%20your%20Google%20Cloud%20Network%3A%20Challenge%20Lab/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```