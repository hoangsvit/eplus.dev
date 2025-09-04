---
title: "Implement Load Balancing on Compute Engine: Challenge Lab - GSP313"
seoTitle: "Implement Load Balancing on Compute Engine: Challenge Lab - GSP313"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Mon Feb 24 2025 06:10:38 GMT+0000 (Coordinated Universal Time)
cuid: cm7inshsx000309ju27u5evyd
slug: implement-load-balancing-on-compute-engine-challenge-lab-gsp313
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740377179284/ae5d683b-b6f3-4bf7-98b5-1c8d141298ab.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740377423192/d9c81472-9f4a-4c06-85a6-f4f201298611.png
tags: implement-load-balancing-on-compute-engine-challenge-lab-gsp313, implement-load-balancing-on-compute-engine-challenge-lab, gsp313

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Implement Load Balancing on Compute Engine](https://www.cloudskillsboost.google/course_templates/648) skill badge. Are you ready for the challenge?

### Topics tested

* Create an instance.
    
* Create an HTTP load balancer in front of two web servers.
    

## **Setup and requirements**

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
    student-04-646fd44c6562@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    cz1ouTIXtAQk
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

## **Challenge scenario**

You have started a new role as a Junior Cloud Engineer for Jooli, Inc. You are expected to help manage the infrastructure at Jooli. Common tasks include provisioning resources for projects.

You are expected to have the skills and knowledge for these tasks, so step-by-step guides are not provided.

Some Jooli, Inc. standards you should follow:

1. Create all resources in the default region or zone, unless otherwise directed. The default region is `us-west3`, and the default zone is `us-west3-c`.
    
2. Naming normally uses the format *team-resource*; for example, an instance could be named **nucleus-webserver1**.
    
3. Make sure to create an instance template in `global` location.
    
4. Allocate cost-effective resource sizes. Projects are monitored, and excessive resource use will result in the containing project's termination (and possibly yours), so plan carefully. This is the guidance the monitoring team is willing to share: unless directed, use **e2-micro** for small Linux VMs, and use **e2-medium** for Windows or other applications, such as Kubernetes nodes.
    

### Your challenge

As soon as you sit down at your desk and open your new laptop, you receive several requests from the Nucleus team. Read through each description, and then create the resources.

## **Task 1. Create a project jumphost instance**

You will use this instance to perform maintenance for the project.

**Requirements:**

* Name the instance `nucleus-jumphost-970`.
    
* Create the instance in the `us-west3-c` zone.
    
* Use an *e2-micro* machine type.
    
* Use the default image type (Debian Linux).
    

Click *Check my progress* to verify the objective.

Create a project jumphost instance

Check my progress

## **Task 2. Set up an HTTP load balancer**

You will serve the site via nginx web servers, but you want to ensure that the environment is fault-tolerant. Create an HTTP load balancer with a managed instance group of **2 nginx web servers**. Use the following code to configure the web servers; the team will replace this with their own configuration later.

```apache
cat << EOF > startup.sh
#! /bin/bash
apt-get update
apt-get install -y nginx
service nginx start
sed -i -- 's/nginx/Google Cloud Platform - '"\$HOSTNAME"'/' /var/www/html/index.nginx-debian.html
EOF
```

**Note:** There is a limit to the resources you are allowed to create in your project, so do not create more than 2 instances in your managed instance group. If you do, the lab might end and you might be banned.

You need to:

* Create an instance template. Don't use the default machine type. Make sure you specify **e2-medium** as the machine type and create the **Global** template.
    
* Create a managed instance group based on the template.
    
* Create a firewall rule named as `allow-tcp-rule-286` to allow traffic (80/tcp).
    
* Create a health check.
    
* Create a backend service and add your instance group as the backend to the backend service group with named port (http:80).
    
* Create a URL map, and target the HTTP proxy to route the incoming requests to the default backend service.
    
* Create a target HTTP proxy to route requests to your URL map
    
* Create a forwarding rule.
    

**Note:** You may need to wait for `5 to 7 minutes` to get the score for this task.

Click *Check my progress* to verify the objective.

Create the website behind the HTTP load balancer

---

## Solution of Lab

%[https://www.youtube.com/watch?v=jgraLGokKFo&ab_channel=Techcps] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP313/lab.sh
source lab.sh
```

**Script Alternative**


```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Implement%20Load%20Balancing%20on%20Compute%20Engine:%20Challenge%20Lab/techcps313.sh
sudo chmod +x techcps313.sh
./techcps313.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1740377363760/4a2822f6-791b-43a3-af4b-d90d49edfd9a.png align="center")