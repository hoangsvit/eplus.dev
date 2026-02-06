---
title: "Creating Cross-region Load Balancing - GSP157"
seoTitle: "Creating Cross-region Load Balancing - GSP157"
seoDescription: "This lab demonstrates how to create an HTTP(S) load balancer that forwards traffic to instances in two different regions. In this lab you create four Comput"
datePublished: Fri Nov 08 2024 06:21:50 GMT+0000 (Coordinated Universal Time)
cuid: cm38cmwuz000c09joh3t0afi0
slug: creating-cross-region-load-balancing-gsp157
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750131044273/530d53f6-8805-4ef1-ad57-2fdbae5c9044.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1750131066007/e69f7340-c0ee-40ab-8942-4297d91e2ee3.png
tags: creating-cross-region-load-balancing-gsp157, gsp157, creating-cross-region-load-balancing

---

## **Overview**

This lab demonstrates how to create an HTTP(S) load balancer that forwards traffic to instances in two different regions. In this lab you create four Compute Engine instances, two each in two different regions. You then configure the rest of the system so that incoming connections are sent to the appropriate instance.

The resources you create connect together as shown here:

![Load Balancing architecture diagram](https://cdn.qwiklabs.com/nEqbkVgAakvbVk1oDtBXl1gkKP6ePGo27oHlYYdqwt0%3D align="left")

## **Setup**

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
    student-04-25d089167dbe@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    6aaRQoCTq0PT
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

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    at the top of the Google Cloud console.
    

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-e02e7f4f7020`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-e02e7f4f7020
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
ACCOUNT: student-04-25d089167dbe@qwiklabs.net

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
project = qwiklabs-gcp-00-e02e7f4f7020
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

These instructions assume you are using an auto mode VPC network or a legacy network. If you are using a custom mode VPC network some of the steps below, such as creating an instance, will require you to specify the subnet range.

## **Task 1. Configuring instances**

Create virtual machine instances in two different regions to receive traffic forwarded from the load balancer. Configure the machine instances for testing and give them all the same tag, which will be used by a firewall rule to allow incoming traffic.

The startup script installs Apache and creates a unique home page for each instance.

1. Create the two instances in `us-east4` region:
    

```apache
gcloud compute instances create www-1 \
    --image-family debian-11 \
    --image-project debian-cloud \
    --machine-type e2-micro \
    --zone us-east4-a \
    --tags http-tag \
    --metadata startup-script="#! /bin/bash
      apt-get update
      apt-get install apache2 -y
      service apache2 restart
      echo '<!doctype html><html><body><h1>www-1</h1></body></html>' | tee /var/www/html/index.html
"
```

```apache
gcloud compute instances create www-2 \
    --image-family debian-11 \
    --image-project debian-cloud \
    --machine-type e2-micro \
    --zone us-east4-a \
    --tags http-tag \
    --metadata startup-script="#! /bin/bash
      apt-get update
      apt-get install apache2 -y
      service apache2 restart
      echo '<!doctype html><html><body><h1>www-2</h1></body></html>' | tee /var/www/html/index.html
"
```

Click **Check my progress** to verify the objective.

Configuring instances for primary region

Check my progress

2. Create the two instances in `europe-west1` region:
    

```apache
gcloud compute instances create www-3 \
    --image-family debian-11 \
    --image-project debian-cloud \
    --machine-type e2-micro \
    --zone europe-west1-c \
    --tags http-tag \
    --metadata startup-script="#! /bin/bash
      apt-get update
      apt-get install apache2 -y
      service apache2 restart
      echo '<!doctype html><html><body><h1>www-3</h1></body></html>' | tee /var/www/html/index.html
"
```

```apache
gcloud compute instances create www-4 \
    --image-family debian-11 \
    --image-project debian-cloud \
    --machine-type e2-micro \
    --zone europe-west1-c \
    --tags http-tag \
    --metadata startup-script="#! /bin/bash
      apt-get update
      apt-get install apache2 -y
      service apache2 restart
      echo '<!doctype html><html><body><h1>www-4</h1></body></html>' | tee /var/www/html/index.html
"
```

Click **Check my progress** to verify the objective.

Configuring instances for secondary region

Check my progress

3. Create a firewall rule to allow external traffic to your virtual machine instances. This rule allows traffic from all sources, which is useful while you're setting up and testing your configuration.
    

The firewall rule uses the `http-tag` tag that you created earlier. The firewall rule allows traffic to reach instances with the tag on the designated port:

```apache
gcloud compute firewall-rules create www-firewall \
    --target-tags http-tag --allow tcp:80
```

4. Verify that instances are running. List your instances to get their IP addresses from the EXTERNAL\_IP column:
    

```apache
gcloud compute instances list
```

5. Copy each instance's `External IP` and paste it into a new browser tab to test that the instances are running and that the web servers are properly configured and able to respond with the default homepage through the open firewall port.
    

## **Task 2. Configuring services for load balancing**

Now that your instances are up and running, set up the services needed for load balancing. Create the following:

* A global static external IP address that is the external IP address your customers use to reach your load balancer.
    
* Instance groups to hold your instances.
    
* A health check, which polls your instances to see if they are healthy. The load balancer only sends traffic to healthy instances.
    

To configure these services, perform the following steps:

1. Create `IPv4` global static external IP address for your load balancer:
    

```apache
gcloud compute addresses create lb-ip-cr \
    --ip-version=IPV4 \
    --global
```

2. Create an instance group for each of your zones:
    

```apache
gcloud compute instance-groups unmanaged create us-east4-resources-w --zone us-east4-a
```

```apache
gcloud compute instance-groups unmanaged create europe-west1-resources-w --zone europe-west1-c
```

3. Add the instances you created earlier to the instance groups:
    

```apache
gcloud compute instance-groups unmanaged add-instances us-east4-resources-w \
    --instances www-1,www-2 \
    --zone us-east4-a
```

```apache
gcloud compute instance-groups unmanaged add-instances europe-west1-resources-w \
    --instances www-3,www-4 \
    --zone europe-west1-c
```

4. Create a Health Check:
    

```apache
gcloud compute health-checks create http http-basic-check
```

## **Task 3. Configuring the load balancing service**

Load balancing involves several connected services. In this section, you set up and connect these services:

* Named ports, which the load balancer uses to direct traffic to your instance groups.
    
* Backend services, which monitor the usage and health of instances. Backend services know whether the instances in the instance group can receive traffic. If they cannot and if there are underutilized instances elsewhere, the load balancer redirects traffic to those instances.
    
* A URL map, which parses the URL of the request and can forward certain requests to specific backend services based on the host and path of the request URL. In the example, since we are not using content-based forwarding, the URL map will only contain the default mapping.
    
* One or more SSL certificate resources, if you are using HTTPS, which contains SSL certificate information for the load balancer. You can use multiple SSL certificates and you must create an SSL certificate resource for each certificate.
    
* An optional SSL policy, if you are using HTTPS.
    
* A target proxy, which receives the request from the user and forwards it to the URL map. The target proxy is the service that decrypts SSL traffic using the SSL certificate resource. The target proxy can forward traffic to your instances via HTTP or HTTPS.
    
* Two global forwarding rules, one each for IPv4 and IPv6, which hold the global external IP address resources. Global forwarding rules forward the incoming request to the target proxy.
    

1. For each instance group, define an HTTP service and map a port name to the relevant port:
    

```apache
gcloud compute instance-groups unmanaged set-named-ports us-east4-resources-w \
    --named-ports http:80 \
    --zone us-east4-a
```

```apache
gcloud compute instance-groups unmanaged set-named-ports europe-west1-resources-w \
    --named-ports http:80 \
    --zone europe-west1-c
```

Click **Check my progress** to verify the objective.

Reserve IPV4 address, create instance groups and health check

Check my progress

2. Create a backend service and specify its parameters. Set the `--protocol` field to `HTTP` because we are using HTTP to go to the instances. Use the `http-basic-check` health check we created earlier as the health check:
    

```apache
gcloud compute backend-services create web-map-backend-service \
    --protocol HTTP \
    --health-checks http-basic-check \
    --global
```

3. Add your instance groups as backends to the backend services. A backend defines the capacity (max CPU utilization or max queries per second) of the instance groups it contains. In this example, set the balancing mode to be CPU utilization, the max utilization to be 80%, and the capacity scaling to be 1. Set the capacity scaling to 0 if you wish to drain a backend service:
    

```apache
gcloud compute backend-services add-backend web-map-backend-service \
    --balancing-mode UTILIZATION \
    --max-utilization 0.8 \
    --capacity-scaler 1 \
    --instance-group us-east4-resources-w \
    --instance-group-zone us-east4-a \
    --global
```

```apache
gcloud compute backend-services add-backend web-map-backend-service \
    --balancing-mode UTILIZATION \
    --max-utilization 0.8 \
    --capacity-scaler 1 \
    --instance-group europe-west1-resources-w \
    --instance-group-zone europe-west1-c \
    --global
```

Click **Check my progress** to verify the objective.

Create backend services and add instance group in it

Check my progress

4. Create a default URL map that directs all incoming requests to all your instances:
    

```apache
gcloud compute url-maps create web-map \
    --default-service web-map-backend-service
```

5. Create a target HTTP proxy to route requests to your URL map:
    

```apache
gcloud compute target-http-proxies create http-lb-proxy \
    --url-map web-map
```

6. Look up the static IP addresses you created for your load balancer. You will use them in the next step.
    

```apache
gcloud compute addresses list
```

7. Create one IPv4 global forwarding rule to route incoming requests to the proxy. Replace `[LB_IP_ADDRESS]` in the command with the static IPv4 address you created:
    

```apache
    gcloud compute forwarding-rules create http-cr-rule \
    --address [LB_IP_ADDRESS] \
    --global \
    --target-http-proxy http-lb-proxy \
    --ports 80
```

**Note:** After creating the global forwarding rule, it can take several minutes for your configuration to propagate.

Click **Check my progress** to verify the objective.

Create a URL map and target HTTP proxy to URL map

Check my progress

## **Task 4. Sending traffic to your instances**

Now that you have configured your load balancing service, you can start sending traffic to the forwarding rule and watch the traffic be dispersed to different instances.

1. Find the IP addresses of your global forwarding rules:
    

```apache
gcloud compute forwarding-rules list
```

2. In the console, search for **Load Balancing** and select the first result. On the Load balancing page you'll see a green circle with check mark on the `web-map` line.
    

![The Load balancing page dispaying the web-map line.](https://cdn.qwiklabs.com/25qY7WS9gaQW0OspdFr8vG1qEIoIVfz1aUffv2fIx84%3D align="left")

3. Click the **Load balancer** (`web-map`) for details. In the **Backend** section of the page, confirm that instances are healthy by checking the **Healthy** column. It can take a few moments for the display to indicate that the instances are healthy.
    
4. Once the display shows that the instances are healthy, click **advanced menu** to access detailed information on the load-balancer.
    
5. In the **Frontend** section, copy the IP address and paste it in browser to display the default content one of the instances in the instance group closest to you.
    

![The Load balance details page displaying the highlighted IP Port](https://cdn.qwiklabs.com/QuPRoi49rIb%2BDCXK%2BCLSin8a%2BTtU%2Ft%2F0Pq71m27QIh8%3D align="left")

The load balancer forwards your request to the closest available instance.

In this lab, you created lab instances in the `us-east4` and `europe-west1` regions, the response from instances depends on the distance you are form these regions when you perform the lab.

For example, if your current geographical location is closer to the us-central1 region, you will get a response from the us-central1 region instances.

For more details about zone and regions in Google Cloud please visit [Regions and Zones.](https://cloud.google.com/compute/docs/regions-zones/)

6. Reload the page multiple times, page content will vary as the load balancer forwards between the two instances in the instance group. For example (you may see the the instances in a different order):
    

Reload 1:

![Page displays www-1](https://cdn.qwiklabs.com/BFkK8mPEZdqMcyk%2Byz0vVbWYqoggfVrijZfNBw7t6RY%3D align="left")

Reload 2:

![Page displays www-2](https://cdn.qwiklabs.com/8p1d2Boxm4FwqOsaYnmlAmV9urS2C2Adm4j50gYQYCg%3D align="left")

Reload 3:

![Page displays www-2](https://cdn.qwiklabs.com/8p1d2Boxm4FwqOsaYnmlAmV9urS2C2Adm4j50gYQYCg%3D align="left")

Reload 4:

![Page displays www-1](https://cdn.qwiklabs.com/BFkK8mPEZdqMcyk%2Byz0vVbWYqoggfVrijZfNBw7t6RY%3D align="left")

If you used a self-signed certificate for testing, your browser will display a warning. You will have to explicitly tell your browser to accept the certificate.

**Note:** You should see responses from the region closest to you. If your response is unsuccessful initially, you **might need to wait a few minutes for the configuration to fully load and for your instances to be marked healthy before trying again**. Each reload of the page may show the other instance. To simulate a user in a different geography, try using a web proxy to make the requests.

## **Task 5. Shutting off HTTP access from everywhere but the load balancing service**

1. Once everything is working, modify your firewall rules so HTTP(S) traffic to your instances can only come from your load balancing service:
    

```apache
gcloud compute firewall-rules create allow-lb-and-healthcheck \
    --source-ranges 130.211.0.0/22,35.191.0.0/16 \
    --target-tags http-tag \
    --allow tcp:80
```

2. Remove the rule that allows HTTP(S) traffic from other sources:
    

```apache
gcloud compute firewall-rules delete www-firewall
```

Test that the load balancer can reach the instances, but that other sources can't.

3. Find the IP address of your global forwarding rule:
    

```apache
gcloud compute addresses list
```

4. Copy and paste the IP address into your browser to be sure the forwarding works.
    
5. Now find the IP address of your individual instances and note the addresses in the `EXTERNAL_IP` column:
    

```apache
gcloud compute instances list
```

6. Copy and paste an address for an instance into your browser.
    

Since you removed the firewall rule that allows HTTP(S) traffic from other sources, this will fail. Instances accept only traffic from source ranges defined in the `allow-lb-and-healthcheck` firewall rule.

## **Task 6. (Optional) Removing external IPs except for a bastion host**

HTTP load balancing makes use of the targets internal IPs, not their external IPs. Once you have load balancing working, you can increase security by removing the external IPs from your load balancing targets, then connect through an intermediary instance to perform tasks on the load balanced instances. That way, no one outside your VPC network can access them in any way, except through the load balancer.

You'll need at least one instance in your VPC network that has an external IP address, normally an instance designated for this purpose.

If you accidentally delete all external IP addresses, you can use the Cloud Console to create a new one.

### Remove the external IP address from an instance

1. Run the following command to remove the external IP address from an instance. Make a note of the name of the instance as shown in the `NAME` field:
    

```apache
gcloud compute instances list
```

2. Delete the access config for the instance. For `NAME`, put the name of the instance:
    

```apache
gcloud compute instances delete-access-config NAME
```

---

## **Solution of Lab**

### Quick

%[https://youtu.be/kckMztXYB-0] 

```apache
export ZONE_2=
```

```apache
curl -LO raw.githubusercontent.com/imharshtiwari/2-Minutes-GCP-Lab-Solutions/refs/heads/main/Creating%20Cross-region%20Load%20Balancing/gsp157.sh
sudo chmod +x gsp157.sh
./gsp157.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1731046659496/cdce1312-3da2-4b05-9bbb-e80f1fb96cec.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1731046663512/5442778d-08fc-43e2-a6b8-32443c308808.png align="center")

---

### Manual

%[https://youtu.be/3WFxIJ9Sj2w]