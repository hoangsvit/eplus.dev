---
title: "Implement External Passthrough NLB - GSP658"
seoTitle: "Implement External Passthrough NLB - GSP658"
seoDescription: "An External passthrough Network Load Balancer is typically used when a service needs to be publicly accessible and handle high-volume, performance-sensitive non-HTTP/S traffic while needing to see the client's true IP address."
datePublished: 2026-06-05T04:23:46.019Z
cuid: cmq0f60re000e1skccuxk8p03
slug: implement-external-passthrough-nlb-gsp658
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/59d821b3-0270-4f0a-9f72-a7e81cb3f7d1.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/c6842964-2001-4835-a896-0d7d7936f8b4.png
tags: implement-external-passthrough-nlb-gsp658, implement-external-passthrough-nlb, gsp658

---

## **Overview**

An External passthrough Network Load Balancer is typically used when a service needs to be publicly accessible and handle high-volume, performance-sensitive non-HTTP/S traffic while needing to see the client's true IP address.

*   **Non-HTTP/S Protocols:** Ideal for load balancing traffic using TCP or UDP that is not HTTP/S (e.g., mail servers, gaming servers, VPN tunnels, or custom protocols).
    
*   **Source IP Preservation:** Critical when backend applications must see the original client's source IP address for logging, security, or custom logic.
    
*   **Maximum Performance:** For applications requiring the highest throughput and lowest latency because it is a passthrough (non-proxied) load balancer operating at Layer 4.
    
*   **Global Reach (TCP/UDP):** It can provide a single global IP address to distribute TCP/UDP traffic across backends in multiple regions (when configured globally), offering high availability for non-web protocols.
    

In this lab you learn how to configure an External passthrough Network Load Balancer by deploying and linking all of its essential componets and verifying public traffic distribution across the instances.

### What you'll learn

In this lab, you learn how to:

*   Deploy and configure backend VM instances using startup scripts and network tags to host a web application service.
    
*   Create a firewall rule to selectively permit external traffic to the tagged backend instances.
    
*   Configure the load balancer components, including a static external IP address, health check, backend service, and forwarding rule.
    
*   Test the load balancer to verify public traffic distribution.
    

## **Setup**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1.  Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the right is the **Lab setup and access** panel with the following:
    
    *   The **Open Google Cloud console** button
        
    *   The temporary credentials (username and password) that you must use for this lab
        
    *   Other information, if needed, to step through this lab
        
    
    Note that the lab timer is located near the top of the page, showing the remaining time.
    
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```plaintext
    student-02-9de8536ac0c5@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the **Lab setup and access** panel.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    YzmhLzoxnJBY
    ```
    
    Copied!
    
    You can also find the Password in the **Lab setup and access** panel.
    
6.  Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7.  Click through the subsequent pages:
    
    *   Accept the terms and conditions.
        
    *   Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    *   Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="center")

## **Resources built for this lab**

*   (2) Compute Engine VM instances with web server running on each.
    
*   Firewall rules configured to allow incoming HTTP traffic on port 80 to the VMs (using the `network-lb-tag` network tag)
    

Verify that the resources are ready:

1.  In the console, go to **Compute Engine**.
    
2.  Copy the External IP for one of the VMs that have been created.
    
3.  Open a new browser, paste the copied IP, and navigate to the **backend-vm-**`us-central1`. You should see "Web Server 1!"
    
4.  Repeat this step for the other instance, and navigate to "Web Server 2" and read the message.
    

## **Task 1. Create Instance Groups**

1.  In the Google Cloud Console, go to **Navigation Menu > Compute Engine > Instance groups**.
    
2.  First, click **Create Instance Group** and select `New unmanaged instance group` for the `us-central1` region.
    

| **Property** | **Value** |
| --- | --- |
| **Name** | `web-server-1` |
| **Region** | `us-central1` |
| **Zone** | Select the zone `us-central1-c` |
| **Network** | default |
| **Select VMs** | Add **backend-vm-**`us-central1` |

3.  Click **Create**.
    
4.  Repeat the process for a second instance group named `web-server-2`.
    

| **Property** | **Value** |
| --- | --- |
| **Name** | `web-server-2` |
| **Region** | `us-central1` |
| **Zone** | Select the zone `us-central1-c` |
| **Network** | default |
| **Select VMs** | Add **backend-vm1-**`us-central1` |

5.  Click **Create**.
    

Click **Check my progress** to verify the objective.

Create Instance Groups

## **Task 2. Configure the load balancing components**

This is the core task where you build the load balancer itself. A Google Cloud Load Balancer isn't a single box; it's a set of distinct resources that work together. You will now create and link them:

*   **Health Check:** This tells the load balancer how to check if a backend VM is "alive." It ensures traffic is only sent to healthy, responsive instances.
    
*   **Backend Service:** This is the "brain" of the load balancer. It logically groups your backend VMs (your two instances) and tells the load balancer which Health Check to use on them.
    
*   **Static External IP Address:** This gives your load balancer a permanent, public-facing IP address. This is the single address your users will access.
    
*   **Forwarding Rule:** This is the "frontend" that ties everything together. It connects your public static IP (the frontend) to your backend service (the backend), telling the load balancer: "When traffic hits this IP on port 80, send it to one of the healthy VMs in that backend service."
    

### Create a health check

The health check ensures the load balancer only sends traffic to healthy instances.

Navigate to Health Checks: In the Google Cloud Console, go to **Navigation Menu > Compute Engine > Health checks**.

1.  Click **Create a health check**.
    
    *   **Name**: `basic-http-check`
        
    *   **Scope**: Regional
        
    *   **Region**: `us-central1`
        
    *   **Protocol**: `TCP`
        
    *   **Port**: 80
        
2.  Leave the default settings and click **Create**.
    

### Create a backend service

The backend service manages the backends (your VM instances) and distributes traffic to them.

1.  Type **Load balancing** in the search bar on the top. Under Products & Pages, click on **Load balancing**.
    
2.  Click **Create Load Balancer**.
    
3.  On the **Network Load Balancer (TCP/UDP/SSL)**, click **Next**.
    
4.  Select **Passthrough load balancer**, click **Next**.
    
5.  Select **Public facing (external)**, then click **Next** and **Configure**.
    
6.  Set the following values:
    
    | **Property** | **Value** |
    | --- | --- |
    | Load Balancer Name | `network-lb-backend-service` |
    | Region | `us-central1` |
    | Backend type | Instance group |
    | Protocol | TCP |
    | Health Check | basic-http-check |
    
7.  In the **New backends**, select Instance group as `web-server-1`.
    
8.  Click **Done**.
    
9.  Click **Add a backend** then specify Instance group as `web-server-2`.
    
10.  Click **Done**.
     

### Configure frontend

11.  Click **Frontend configuration** then add the following:
     

| **Property** | **Value** |
| --- | --- |
| IP version | IPv4 |
| IP address | click **Create IP Address** |
| Name | network-lb-ip, click **Reserve** |
| Port | 80 |

12.  Click **Done**.
     
13.  Click **Create**.
     

Click **Check my progress** to verify the objective.

Configure the load balancer

## **Task 3. Test the load balancer**

This final step is to verify that your entire configuration works. You will send repeated test requests to the load balancer's single public IP address. The goal is to confirm that your requests are being distributed across both of your backend instances, proving that the load balancer is successfully spreading the traffic.

### Find the load balancer's IP address

1.  Go to the **Load balancing** page.
    
2.  Click on the `network-lb-backend-service` load balancer you created.
    
3.  The IP address listed in the summary is the external IP of your load balancer.
    

### Send traffic to the load balancer

1.  Run the curl command in the Cloud Shell with the load balancer's external IP address to send requests:
    

```plaintext
curl http://[LOAD_BALANCER_IP_ADDRESS]
```

Copied!

2.  You should see a response from either "Web Server 1" or "Web Server 2".
    
3.  Run the command several times. You should see responses from both servers, confirming the load balancer is distributing traffic.
    

* * *

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=BWF3MrW7JsU] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP658/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Implement%20External%20Passthrough%20NLB/TechCode.sh
sudo chmod +x TechCode.sh 
./TechCode.sh
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/8167b63d-8b62-4d4d-bc7d-d01da405c82b.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/0741498a-9b27-4e74-a596-0557e8655ba7.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/f58a9f59-c249-45ab-8b7f-b85ee6bc9dac.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/48baad9e-e5e7-4bbe-8225-5203edad9548.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/9ee4f842-5fb5-442e-9094-e5872f41e1ef.png align="center")

* * *

### Manual

%[https://www.youtube.com/watch?v=PMYDaM749wc]