---
title: "Set Up Application Load Balancers - GSP155"
seoTitle: "Set Up Application Load Balancers - GSP155"
seoDescription: "Learn to set up an L7 application load balancer on Google Cloud's Compute Engine VMs for enhanced performance"
datePublished: Sat Sep 06 2025 06:45:08 GMT+0000 (Coordinated Universal Time)
cuid: cmf7wg4n5000b02jmhu4e9cfy
slug: set-up-application-load-balancers-gsp155
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757139744746/ef0935d7-e65e-4430-a439-a3bf1c9317ff.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757141063828/47dd4c8b-0d64-48b1-948c-69baab89ab42.png
tags: load-balancers, set-up-application-load-balancers, gsp155

---

## Overview

In this hands-on lab you learn how to set up a Layer 7 (L7) application load balancer on Compute Engine virtual machines (VMs). L7 load balancers can understand HTTP(S) protocols, allowing them to make routing decisions based on parameters like URL, headers, cookies, and the content of the request. This allows for improved application performance and responsiveness.

There are several ways you can [load balance on Google Cloud](https://cloud.google.com/load-balancing/docs/load-balancing-overview#a_closer_look_at_cloud_load_balancers). This lab takes you through the setup of the following load balancers:

* [Application Load Balancer](https://cloud.google.com/compute/docs/load-balancing/http/)
    

You are encouraged to type the commands yourself, which can help you learn the core concepts. Many labs include a code block that contains the required commands. You can easily copy and paste the commands from the code block into the appropriate places during the lab.

### Objectives

In this lab, you learn how to perform the following tasks:

* Configure the default region and zone for your resources.
    
* Create an Application Load Balancer.
    
* Test the traffic to your insances.
    

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
    student-02-a9c6aa3dfe44@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    eCigaXtVlfoj
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-d400baffc0cb`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-d400baffc0cb
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
ACCOUNT: student-02-a9c6aa3dfe44@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

Copied!

**Output:**

```apache
[core]
project = qwiklabs-gcp-04-d400baffc0cb
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Set the default region and zone for all resources

1. Set the default region:
    
    ```apache
    gcloud config set compute/region us-central1
    ```
    
2. In Cloud Shell, set the default zone:
    
    ```apache
    gcloud config set compute/zone us-central1-c
    ```
    
    Learn more about choosing zones and regions in Compute Engine's [Regions and zones](https://cloud.google.com/compute/docs/zones) documentation.
    

## Task 2. Create multiple web server instances

For this load balancing scenario, you create three Compute Engine VM instances and install Apache on them, then add a firewall rule that allows HTTP traffic to reach the instances.

The code provided sets the zone to `us-central1-c`. Setting the `tags` field lets you reference these instances all at once, such as with a firewall rule. These commands also install Apache on each instance and gives each instance a unique home page.

1. Create a virtual machine, `www1`, in your default zone using the following code:
    
    ```apache
      gcloud compute instances create www1 \
        --zone=us-central1-c \
        --tags=network-lb-tag \
        --machine-type=e2-small \
        --image-family=debian-11 \
        --image-project=debian-cloud \
        --metadata=startup-script='#!/bin/bash
          apt-get update
          apt-get install apache2 -y
          service apache2 restart
          echo "
    <h3>Web Server: www1</h3>" | tee /var/www/html/index.html'
    ```
    
2. Create a virtual machine, `www2`, in your default zone using the following code:
    
    ```apache
      gcloud compute instances create www2 \
        --zone=us-central1-c \
        --tags=network-lb-tag \
        --machine-type=e2-small \
        --image-family=debian-11 \
        --image-project=debian-cloud \
        --metadata=startup-script='#!/bin/bash
          apt-get update
          apt-get install apache2 -y
          service apache2 restart
          echo "
    <h3>Web Server: www2</h3>" | tee /var/www/html/index.html'
    ```
    
3. Create a virtual machine, `www3`, in your default zone.
    
    ```apache
      gcloud compute instances create www3 \
        --zone=us-central1-c  \
        --tags=network-lb-tag \
        --machine-type=e2-small \
        --image-family=debian-11 \
        --image-project=debian-cloud \
        --metadata=startup-script='#!/bin/bash
          apt-get update
          apt-get install apache2 -y
          service apache2 restart
          echo "
    <h3>Web Server: www3</h3>" | tee /var/www/html/index.html'
    ```
    
4. Create a firewall rule to allow external traffic to the VM instances:
    
    ```apache
    gcloud compute firewall-rules create www-firewall-network-lb \
        --target-tags network-lb-tag --allow tcp:80
    ```
    

Now you need to get the external IP addresses of your instances and verify that they are running.

5. Run the following to list your instances. You'll see their IP addresses in the `EXTERNAL_IP` column:
    
    ```apache
    gcloud compute instances list
    ```
    
6. Verify that each instance is running with `curl`, replacing **\[IP\_ADDRESS\]** with the external IP address for each of your VMs:
    
    ```apache
    curl http://[IP_ADDRESS]
    ```
    
    Click **Check my progress** to verify that you've created a group of web servers.
    
    Create multiple web server instances
    

## Task 3. Create an Application Load Balancer

Application Load Balancing is implemented on Google Front End (GFE). GFEs are distributed globally and operate together using Google's global network and control plane. You can configure URL rules to route some URLs to one set of instances and route other URLs to other instances.

Requests are always routed to the instance group that is closest to the user, if that group has enough capacity and is appropriate for the request. If the closest group does not have enough capacity, the request is sent to the closest group that **does** have capacity.

To set up a load balancer with a Compute Engine backend, your VMs need to be in an instance group. The managed instance group provides VMs running the backend servers of an external application load balancer. For this lab, backends serve their own hostnames.

1. First, create the load balancer template:
    
    ```apache
    gcloud compute instance-templates create lb-backend-template \
       --region=us-central1 \
       --network=default \
       --subnet=default \
       --tags=allow-health-check \
       --machine-type=e2-medium \
       --image-family=debian-11 \
       --image-project=debian-cloud \
       --metadata=startup-script='#!/bin/bash
         apt-get update
         apt-get install apache2 -y
         a2ensite default-ssl
         a2enmod ssl
         vm_hostname="$(curl -H "Metadata-Flavor:Google" \
         http://169.254.169.254/computeMetadata/v1/instance/name)"
         echo "Page served from: $vm_hostname" | \
         tee /var/www/html/index.html
         systemctl restart apache2'
    ```
    
    [Managed instance groups](https://cloud.google.com/compute/docs/instance-groups) (MIGs) let you operate apps on multiple identical VMs. You can make your workloads scalable and highly available by taking advantage of automated MIG services, including: autoscaling, autohealing, regional (multiple zone) deployment, and automatic updating.
    
2. Create a managed instance group based on the template:
    
    ```apache
    gcloud compute instance-groups managed create lb-backend-group \
       --template=lb-backend-template --size=2 --zone=us-central1-c
    ```
    
3. Create the `fw-allow-health-check` firewall rule.
    
    ```apache
    gcloud compute firewall-rules create fw-allow-health-check \
      --network=default \
      --action=allow \
      --direction=ingress \
      --source-ranges=130.211.0.0/22,35.191.0.0/16 \
      --target-tags=allow-health-check \
      --rules=tcp:80
    ```
    
    **Note:** The ingress rule allows traffic from the Google Cloud health checking systems (`130.211.0.0/22` and `35.191.0.0/16`). This lab uses the target tag `allow-health-check` to identify the VMs
    
4. Now that the instances are up and running, set up a global static external IP address that your customers use to reach your load balancer:
    
    ```apache
    gcloud compute addresses create lb-ipv4-1 \
      --ip-version=IPV4 \
      --global
    ```
    
    Notice that the IPv4 address that was reserved:
    
    ```apache
    gcloud compute addresses describe lb-ipv4-1 \
      --format="get(address)" \
      --global
    ```
    
    **Note:** Save this IP address, as you need to refer to it later in this lab.
    
5. Create a health check for the load balancer (to ensure that only healthy backends are sent traffic):
    
    ```apache
    gcloud compute health-checks create http http-basic-check \
      --port 80
    ```
    
6. Create a backend service:
    
    ```apache
    gcloud compute backend-services create web-backend-service \
      --protocol=HTTP \
      --port-name=http \
      --health-checks=http-basic-check \
      --global
    ```
    
7. Add your instance group as the backend to the backend service:
    
    ```apache
    gcloud compute backend-services add-backend web-backend-service \
      --instance-group=lb-backend-group \
      --instance-group-zone=us-central1-c \
      --global
    ```
    
8. Create a [URL map](https://cloud.google.com/load-balancing/docs/url-map-concepts) to route the incoming requests to the default backend service:
    
    ```apache
    gcloud compute url-maps create web-map-http \
        --default-service web-backend-service
    ```
    
    **Note:** URL map is a Google Cloud configuration resource used to route requests to backend services or backend buckets. For example, with an external Application Load Balancer, you can use a single URL map to route requests to different destinations based on the rules configured in the URL map:
    
    * Requests for https://example.com/video go to one backend service.
        
    * Requests for https://example.com/audio go to a different backend service.
        
    * Requests for https://example.com/images go to a Cloud Storage backend bucket.
        
    * Requests for any other host and path combination go to a default backend service.
        
9. Create a [target HTTP proxy](https://cloud.google.com/load-balancing/docs/target-proxies) to route requests to your URL map:
    
    ```apache
    gcloud compute target-http-proxies create http-lb-proxy \
        --url-map web-map-http
    ```
    
10. Create a [global forwarding rule](https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts) to route incoming requests to the proxy:
    
    ```apache
    gcloud compute forwarding-rules create http-content-rule \
       --address=lb-ipv4-1\
       --global \
       --target-http-proxy=http-lb-proxy \
       --ports=80
    ```
    

**Note:** A [forwarding rule](https://cloud.google.com/load-balancing/docs/using-forwarding-rules) and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer. Learn more about the general understanding of forwarding rules from the [Forwarding rules overview](https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts) guide.

Click **Check my progress** to verify that you've created an L7 Application Load Balancer.

Create an Application Load Balancer

## Task 4. Test traffic sent to your instances

1. On the Google Cloud console in the **Search** field type **Load balancing**, then choose **Load balancing** from the search results.
    
2. Click on the load balancer that you just created, **web-map-http**.
    
3. In the **Backend** section, click on the name of the backend and confirm that the VMs are **Healthy**. If they are not healthy, wait a few moments and try reloading the page.
    
4. When the VMs are healthy, test the load balancer using a web browser, going to `http://IP_ADDRESS/`, replacing `IP_ADDRESS` with the load balancer's IP address that you copied previously.
    

**Note:** This may take three to five minutes. If you do not connect, wait a minute, and then reload the browser.

Your browser should render a page with content showing the name of the instance that served the page, along with its zone (for example, `Page served from: lb-backend-group-xxxx`).

Click **Check my progress** to test traffic sent to your instances.

Test the load balancer using a web browser

---

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP155/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757140977629/59cc807b-0db1-4cd8-b88e-b6e9543101dd.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757141041674/027028dc-651e-4d1e-ab50-129324f8e23f.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757141219175/b6b08b94-90fa-4739-a951-8c8c7b0875e4.png align="center")

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>Note: </strong>This may take <mark>3 - 5 minutes</mark>. If you do not connect, wait a minute, and then reload the browser.</div>
</div>

### **Manual**

%[https://youtu.be/BXspxk9X7Jc]