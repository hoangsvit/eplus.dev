---
title: "Configure Service Accounts and IAM Roles for Google Cloud: Challenge Lab - ARC134"
seoTitle: "Configure Service Accounts and IAM Roles for Google Cloud: Challenge Lab - ARC134"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-06-03T09:00:54.676Z
cuid: cmpxu6q6900001sjc5ns13uvy
slug: configure-service-accounts-and-iam-roles-for-google-cloud-challenge-lab-arc134
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/8db0ee1e-aa54-4227-a4d3-79fcf610e32f.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/efb4cf2f-d2cd-4864-be33-987e4104dd7e.png
tags: arc134, configure-service-accounts-and-iam-roles-for-google-cloud-challenge-lab

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

In this challenge lab, you will be taking help of **Gemini** to complete the given tasks.

Gemini for Google Cloud is an always-on AI collaborator that provides help to users of all skill levels where they need it. In this lab, you use Gemini to get information you need to create resourses in the tasks.

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## **Challenge scenario**

You are starting your career as a junior cloud architect. In this role, you have been assigned to work on a team project that requires you to use service accounts, configure IAM permission using the gcloud command line interface (CLI), add custom roles, and use the client libraries to access BigQuery from a service account.

You are expected to have the skills and knowledge to complete the tasks that follow. Also, you can take help from **Gemini** to identify CLI commands or steps to complete the tasks.

### Your challenge

For this challenge, you are asked to create a service account, assign required roles, configure IAM permissions using the gcloud CLI, create a custom role using a YAML file, and use the client libraries to access BigQuery from a service account.

You are asked to:

*   Configure a service account using the gcloud CLI.
    
*   Grant IAM permissions to a service account using the gcloud CLI.
    
*   Create a compute instance using the service account.
    
*   Create a custom role using a YAML file.
    
*   Use the client libraries to access BigQuery from a service account.
    

For this challenge lab, a virtual machine (VM) instance named `lab-vm` has been configured for you to complete tasks 2 to 6.

Create all the resources in `us-east4` region and `us-east4-a` zone.

Each task is described in detail below, good luck!

## **Task 1. Enable and Explore Gemini (optional)**

**Note:** If you want to use Gemini, follow the steps given below to enable it otherwise you can go directly to `Task 2`.

Since you are going to use Gemini, let's quickly enable and explore the Gemini.

In this task, you use the Gemini pane to enter prompts and view the responses from Gemini. Prompts are questions or statements that describe the help that you need. Prompts can include context from existing code that Google Cloud analyzes to provide more useful or complete responses. For more information on writing prompts to generate good responses, see [Write better prompts for Gemini](https://cloud.google.com/gemini/docs/discover/write-prompts)

To prompt Gemini about Google Cloud services, perform these steps:

1.  Sign in to the Google Cloud Console.
    
2.  Click on the Gemini icon (
    
    ![Gemini icon](https://cdn.qwiklabs.com/DqjDpKc%2FEnuavTU5iINQbCO07gzD34juhc7wrSFuYVo%3D align="center")
    
    ) in the top-right corner of the Google Cloud console toolbar.
    

**Note:** the Gemini for Google Cloud Console API (formerly named the Cloud AI Companion API) was enabled for your project when you started the lab.

3.  Click **Start Chatting**.
    

Enter the following prompt:

```plaintext
What is service account?
```

Copied!

```plaintext
What is the difference between predefined roles and custom roles?
```

Copied!

**Note:** Gemini doesn't use your prompts or its responses as data to train its model. For more information, see [How Gemini in Google Cloud uses your data](https://cloud.google.com/gemini/docs/discover/data-governance).

**Note:** As an early-stage technology, Gemini can generate output that seems plausible but is factually incorrect. We recommend that you validate all output from Gemini before you use it. For more information, see [Gemini in Google Cloud and responsible AI](https://cloud.google.com/gemini/docs/discover/responsible-ai).

## **Task 2. Create a service account using the gcloud CLI**

For this task, a VM named `lab-vm` has already been configured for you to use as you perform the tasks that follow. You will create a service account by taking the help of the Gemini.

1.  Authenticate in gcloud
    
2.  SSH into the `lab-vm` VM and configure the gcloud environment for a user, then switch your gcloud configuration to the default.
    
3.  Create a service account named `devops` inside the SSH.
    

**Note:** To create the following resources, you need to click on `Click here for hint!` and use the prompt in the Gemini to fetch the commands to create the resource.

## **Task 3. Grant IAM permissions to a service account using the gcloud CLI**

1.  Since you will be using the project id and the service account multiple times so it is good idea to export the project id and service account into the local variable.
    
2.  Similarly store the service account email address in a local variable called `SA`.
    
3.  To complete this task, SSH into the `lab-vm` VM, and give the service account the role of `iam.serviceAccountUser` with the permissions `compute.instanceAdmin`.
    

**Note:** To create the following resources, you need to click on `Click here for hint!` and use the prompt in the Gemini to fetch the commands to create the resource.

## **Task 4. Create a compute instance with a service account attached using gcloud**

For this task, a VM named `lab-vm` has already been configured for you. SSH into the `lab-vm` VM to start.

1.  Create a compute instance named `vm-2` with the devops service account attached that you created in Task 2.
    
2.  SSH into the `vm-2` VM instance. Try to create and list an instance from `vm-2` to verify you have the necessary permissions via the service account.
    

**Note:** To create the following resources, you need to click on `Click here for hint!` and use the prompt in the Gemini to fetch the commands to create the resource.

## **Task 5. Create a custom role using a YAML file**

1.  Create a YAML file named `role-definition.yaml` that has a custom role definition with the permissions `cloudsql.instances.connect` and `cloudsql.instances.get` using Gemini.
    
2.  Execute the gcloud command to create a role at the project level using the YAML file.
    

**Note:** To create the following resources, you need to click on `Click here for hint!` and use the prompt in the Gemini to fetch the commands to create the resource.

## **Task 6. Use the client libraries to access BigQuery from a service account**

For this task, you will query the BigQuery public datasets from an instance with the help of a service account which has the necessary roles configured. Login to the Google Cloud console using the username and password provided.

1.  Create a service account named `bigquery-qwiklab` and assign it the role of `BigQuery Data Viewer` as `BigQuery User`.
    
2.  Create a VM instance named `bigquery-instance` using a service account `bigquery-qwiklab`.
    
3.  SSH into the `bigquery-instance` and install the dependencies.
    
4.  Use the following code to create a Python file.
    
    ```plaintext
    echo " from google.auth import compute_engine from google.cloud import bigquery credentials = compute_engine.Credentials( service_account_email='YOUR_SERVICE_ACCOUNT') query = ''' SELECT name, SUM(number) as total_people FROM "bigquery-public-data.usa_names.usa_1910_2013" WHERE state = 'TX' GROUP BY name, state ORDER BY total_people DESC LIMIT 20 ''' client = bigquery.Client( project='YOUR_PROJECT_ID', credentials=credentials) print(client.query(query).to_dataframe()) " > query.py ```
    ```
    
5.  Replace the `PROJECT_ID` and `SERVICE_ACCOUNT` variables with your credentials and run the file using a Python3 command.
    
6.  Excute the python file that is created in the above step
    

**Note:** To create the following resources, you need to click on `Click here for hint!` and use the prompt in the Gemini to fetch the commands to create the resource.

* * *

## Solution of Lab

%[https://www.youtube.com/watch?v=kZbs2iZ05t0] 

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/ARC134/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Configure%20Service%20Accounts%20and%20IAM%20for%20Google%20Cloud%3A%20Challenge%20Lab/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```