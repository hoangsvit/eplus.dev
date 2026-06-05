---
title: "Implement Regional Internal Proxy NLB - GSP636"
seoTitle: "Implement Regional Internal Proxy NLB - GSP636"
seoDescription: "A regional internal proxy Network Load Balancer is used when you need to load balance internal traffic (from within your VPC or connected networks) and your application requires Layer 4 proxy-based control, like TLS/SSL termination (unavailable in the Passthrough model)."
datePublished: 2026-06-05T02:34:00.938Z
cuid: cmq0b8vo800011skc95b4fbos
slug: implement-regional-internal-proxy-nlb-gsp636
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/cb5f202d-cf2a-410a-8250-f74a14e880fd.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/6b91a398-7c7c-4cf3-b9e5-d180675823a5.png
tags: implement-regional-internal-proxy-nlb-gsp636, implement-regional-internal-proxy-nlb, gsp636

---

## **Overview**

A regional internal proxy Network Load Balancer is used when you need to load balance internal traffic (from within your VPC or connected networks) and your application requires Layer 4 proxy-based control, like TLS/SSL termination (unavailable in the Passthrough model).

This load balancer is the optimal solution for managing robust, scalable internal services.

*   **Internal Access Only:** The key constraint is that the service is exposed via an internal IP address only accessible to clients inside your private network or private connections (VPN, Interconnect).
    
*   **Proxy-Based Stability:** This is a full proxy. The load balancer terminates the client connection and establishes a new one to the backend. This allows for superior session management, health monitoring, and connection draining.
    
*   **Layer 4 TLS Termination:** The proxy function allows you to implement TLS/SSL termination at the load balancer level for internal traffic, securing service-to-service communication without placing the decryption burden on the backends.
    
*   **Global Access (Optional):** While regional by default, this NLB supports global access, allowing clients in other regions of your VPC to reach the internal IP, which is a significant feature for distributed applications (out of scope for this lab).
    

In this lab you will configure a custom VPC network and a proxy-only subnet, set ingress firewall rules, and deploy a Regional Internal Proxy Network Load Balancer with specific port mapping to ensure backend health and validate internal traffic distribution using a client VM.

There is an optional task at the end of the lab to practice the skills you've learned.

### What you'll learn or Objectives

*   Configure a custom VPC network with the required `proxy-only` subnet and establish a proxy security policy with VPC ingress firewall rules.
    
*   Configure port mapping.
    
*   Deploy the Regional Internal Proxy Network Load Balancer.
    
*   Deploy and utilize an internal client VM within the same VPC network and test traffic distribution.
    

## **Setup and requirements**

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
    `student-04-5f4b6d5465b8@qwiklabs.net`
    
4.  You can also find the Username in the **Lab setup and access** panel.
    
5.  Click **Next**.
    
6.  Copy the **Password** below and paste it into the **Welcome** dialog.  
    `IBuRl9jHUyCj`
    
7.  You can also find the Password in the **Lab setup and access** panel.
    
8.  Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
9.  Click through the subsequent pages:
    
    *   Accept the terms and conditions.
        
    *   Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    *   Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="center")

## **Task 1. Configure the Network and Subnets**

In this task you are building the foundation. The internal proxy NLB model introduces a critical networking requirement: the *proxy-only subnet*. This reserved, dedicated subnet range is where Google Cloud provisions the Envoy proxies that run the load balancing service.

You must first create a custom VPC network with 2 required subnets: one for your backends (`backend-subnet`) and the essential one for the proxy control plane (`proxy-only-subnet`).

### Deployment Parameters

*   **Network:** lb-network (Custom Mode)
    
*   **Backend Subnet** `us-east1`**:** 10.1.2.0/24
    
*   **Proxy-Only Subnet** `us-east1`**:** 10.129.0.0/23
    

### Create the network and backends/test subnets

1.  In the Google Cloud console, navigate to the **VPC network** page. You can use the search bar at the top of the page, or the menu button in the top left corner.
    
2.  Click **Create VPC network**.
    
3.  For **Name**, enter `lb-network`.
    
4.  Set the **Subnet creation mode** to `Custom`.
    
5.  Under **New subnet**, specify the following properties to create the subnets.
    
6.  Create the **Backend Subnet:**
    
    | **Property** | **Value** |
    | --- | --- |
    | Name | backend-subnet |
    | Region | `us-east1` |
    | IPv4 range | 10.1.2.0/24 |
    
7.  Click **Done**.
    

### Create the Proxy-Only Subnet

This subnet is exclusively for Google-managed Envoy proxies. You cannot assign backends or forwarding rule IPs from this range.

1.  In the console, go to the **VPC networks** page and click the **lb-network** name.
    
2.  Click on the Subnets tab along the top. Click **Add subnet**.
    
    | **Property** | **Value** |
    | --- | --- |
    | Name | proxy-only-subnet |
    | Region | `us-east1` |
    | Purpose | Regional Managed Proxy |
    | IPv4 range | 10.129.0.0/23 |
    
3.  Click **Add**.
    

Click *Check my progress* to verify the objective.

Create the network and backends/test subnets

## **Task 2. Create Firewall Rules**

In this task you're defining the security matrix. Since the load balancer is a proxy, traffic to the backends comes from two specific sources: Google's Health Check IP ranges (for probes) and the IP range of the Proxy-Only Subnet (for forwarded client traffic). You must explicitly create three ingress rules to allow this traffic, otherwise the default firewall rule will block your service.

1.  In the console, navigate to **Navigation menu** > **VPC network** > **Firewall**.
    
2.  Click **Create Firewall Rule**.
    
3.  Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | fw-allow-ssh |
    | Target tags | allow-ssh |
    | Source filter | IPv4 Ranges |
    | Source IP ranges | 0.0.0.0/0 |
    | Protocols and ports | Specified protocols and ports, and then *check* tcp, *type:* 22 |
    
4.  Click **Create**.
    
5.  Create another firewall rule named `fw-allow-health-check`
    
6.  Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | fw-allow-health-check |
    | Target tags | allow-health-check |
    | Source filter | IPv4 Ranges |
    | Source IP ranges | 130.211.0.0/22, 35.191.0.0/16 |
    | Protocols and ports | Specified protocols and ports, and then *check* tcp, *type:* 80 |
    
7.  Click **Create**.
    
8.  Create another firewall rule named `fw-allow-proxy-only-subnet` and set the following values:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | fw-allow-proxy-only-subnet |
    | Target tags | allow-proxy-only-subnet |
    | Source filter | IPv4 Ranges |
    | Source IP ranges | 10.129.0.0/23 |
    | Protocols and ports | Specified protocols and ports, and then *check* tcp, *type:* 80 |
    
9.  Click **Create**.
    

Click *Check my progress* to verify the objective.

Create Firewall Rules

## **Task 3. Create backend Managed Instance Groups (MIGs)**

Your backends are hosted on two Managed Instance Groups (MIGs) across two different zones in `us-east1`. This ensures zonal redundancy and enables autoscaling (though autoscaling is off for this lab). Since this is a proxy NLB, the load balancer will connect to the backends on a named port (e.g., tcp80) which is mapped to the internal TCP port (80) where the Apache server is listening.

### Create an Instance Template

1.  In the GCP Console, on the **Navigation menu**, click **Compute Engine** > **Instance templates** page.
    
2.  Click **Create instance template**.
    
3.  For **Name**, enter `int-tcp-proxy-backend-template`.
    
4.  Click **Advanced options > Networking**.
    
    *   For **Network tags**, enter the three required tags: `allow-ssh`, `allow-health-check`, and `allow-proxy-only-subnet`.
        
    *   For **Network interfaces**, select **Network**: `lb-network` and **Subnet**: `backend-subnet` and click **Done**.
        
5.  Click **Management**. Paste the following script to install and configure Apache to listen on port 80 and report its hostname:
    

```plaintext
#! /bin/bash
apt-get update
apt-get install apache2 -y
a2ensite default-ssl
a2enmod ssl
vm_hostname="$(curl -H "Metadata-Flavor:Google" \
http://metadata.google.internal/computeMetadata/v1/instance/name)"
echo "Page served from: $vm_hostname" | \
tee /var/www/html/index.html
systemctl restart apache2
```

6.  Click **Create**.
    

### Create the MIGs

1.  Navigate to the **Instance groups** page.
    
2.  Click **Create instance group > New managed instance group (stateless)**.
    
    | **Property** | **Value** |
    | --- | --- |
    | Name | mig-a |
    | Instance template | int-tcp-proxy-backend-template |
    | Region | `us-east1` |
    | Zone | `us-east1-c` |
    | Autoscaling mode | Off: do not autoscale (Max instances: 2) |
    | Port mapping | Add port name `tcp80` mapped to port number `80` |
    
3.  Click **Create**.
    
4.  Repeat the process to create **mig-c** in a different zone from the instance group above.
    

Keep all other settings the same.

Click *Check my progress* to verify the objective.

Create backend Managed Instance Groups (MIGs)

### Verify backend service binding

*Wait 3-5 minutes* for the MIG instances to finish starting and the startup script to complete.

1.  Run the following command to check if the Apache service is listening on port 80 on one of the instances.
    
    ```plaintext
    gcloud compute instances list --filter="name ~ mig-a" --limit=1 --format='value(name)'  
    ```
    
2.  SSH to the instance and run a network status check:
    
    ```plaintext
    gcloud compute ssh $(gcloud compute instances list --filter="name ~ mig-a" --limit=1 --format='value(name)') --zone=us-east1-c --command="sudo netstat -tnlp | grep 80"  
    ```
    
3.  Expected output: The output should show a process (Apache2) listening on `0.0.0.0:80` or `:::80`. If it shows `127.0.0.1:80`, the startup script failed to bind to all interfaces, and the lab will fail later.
    

## **Task 4. Configure the Load Balancer (internal IP and proxy rules)**

Now you will define the health check, the backend service (which consumes the MIGs), and the frontend (which exposes the internal IP on the service port **110**). The port mapping (`tcp80 to 80`) ensures the NLB uses the correct port to connect to the backends, while the frontend port **(110)** is what clients use to connect to the proxy.

1.  Open Cloud Shell, then run the following `gcloud` commands to reserve a static internal IPv4 address in `us-east1` on the `backend-subnet`.  
    \`\`\`  
    gcloud compute addresses create int-tcp-ip-address  
    \--region=us-east1  
    \--subnet=backend-subnet  
    \--purpose=SHARED\_LOADBALANCER\_VIP  
    \`\`\`
    
2.  Use the following command to retrieve and record the actual IP address, which you will use as your LB\_IP\_ADDRESS:  
    \`\`\`  
    gcloud compute addresses describe int-tcp-ip-address  
    \--region=us-east1  
    \--format='value(address)'  
    \`\`\`
    
3.  he output of this command is your `LB_IP_Address`. Make a note of it, you will need it later in this lab.
    
4.  In the console, type **Load Balancing** in the search bar at the top. Under Products & Pages, click on **Load balancing**
    
5.  on the Network Services > Load balancing page, click **\+ Create load balancer**.
    
6.  Select **Network Load Balancer (TCP/UDP/SSL)** and **Next**.
    
7.  Select **Proxy load balancer** and **Next**
    
8.  Select **Internal** and **Next**
    
9.  Select **Best for regional workloads** and **Next**.
    
10.  Select **Configure**.
     
11.  Name the load balancer as `my-int-tcp-lb`, region as `us-east1` and select Network as `lb-network`
     
12.  Choose **Backend Configuration:**
     
     | **Property** | **Value** |
     | --- | --- |
     | Protocol | Select `TCP` |
     | Named Port | Enter `tcp80` |
     
13.  Under Health check, click **Create a health check**
     
     | **Property** | **Value** |
     | --- | --- |
     | Name | tcp-health-check |
     | Protocol | Select `TCP` |
     | Port | Enter `80` |
     
14.  Click **Create**.
     
15.  Set the following values for the backend:
     
     *   Instance group: From the dropdown, select the instance group `mig-a`.
         
     *   Port numbers: Enter `80`
         
16.  Click **Done**.
     
17.  Click **Add a backend**.
     
18.  Repeat the same for `mig-c` with port number `80`
     
19.  Click on **Frontend configuration** and set the following values:
     
     | **Property** | **Value** |
     | --- | --- |
     | Name | int-tcp-forwarding-rule |
     | Subnetwork | From the dropdown, select the `backend-subnet` |
     | IP address | Select the reserved internal IP address for the load balancer |
     | Port | 110 |
     | Proxy Protocol | Off |
     
20.  Click **Review and finalize** then **Create** and wait for the load balancer to be created.
     

Click *Check my progress* to verify the objective.

Configure the Load Balancer

## **Task 5. Test the load balancer**

Since this is an internal load balancer, you cannot test it from the internet. You must first provision a client VM within the VPC network. You will then use `curl` to connect from this internal client to the load balancer's internal IP on the service port **(110)** to validate traffic distribution.

### Create a Client VM

1.  In the Console, go to **Compute Engine > VM Instances**. Click the **Create Instance** button.
    
2.  Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value** |
    | --- | --- |
    | Name | client-vm |
    | Zone | `us-east1-c` |
    | Network tags | allow-ssh |
    | Network interface | Click Add a network interfaces and select Network as `lb-network` and Subnet as `backend-subnet` |
    
3.  Click **Create**.
    

### Verify backend health

Before proceeding with the curl test, *wait 5-10 minutes* for the MIGs to finish provisioning and for the health check probes to start and mark the backends as healthy. If the backends aren't ready, you may see an error like this: `curl: (56) Recv failure: Connection reset by peer error` which means that the backends are Unhealthy and the load balancer has nowhere to send the traffic.

To verify the health status, run the following in Cloud Shell:

```plaintext
gcloud compute backend-services get-health my-int-tcp-lb --region=us-east1
```

You should see an output similar to the following, showing both Instance Groups (mig-a and mig-c) are in a HEALTHY state:

```plaintext
healthStatus:
- healthState: HEALTHY
  instanceGroup: projects/YOUR_PROJECT/regions/REGION/instanceGroups/mig-a
- healthState: HEALTHY
  instanceGroup: projects/YOUR_PROJECT/regions/REGION/instanceGroups/mig-c
```

If the status is UNHEALTHY or UNKNOWN: **do not proceed**. Re-verify that the firewall rule `fw-allow-health-check` is correctly configured to allow traffic from `130.211.0.0/22`, `35.191.0.0/16 to port 80` on instances with the tag `allow-health-check`. Wait a few more minutes and re-run the `get-health` command.

### Send traffic and verify distribution

Once you've confirmed that the backends are healty, send some traffic to confirm it is getting distributed to both backends.

1.  Use SSH to connect to the client VM:
    
    ```plaintext
    gcloud compute ssh client-vm --zone=us-east1-c  
    ```
    
    When prompted, enter `Y` to confirm creating a new directory.
    
    When prompted for a passphrase, press **Enter** for no passphrase, and then again to confirm.
    
2.  Confirm that the TCP connection can be established to the frontend port (`110`):
    
    ```plaintext
    telnet <lb_ip_address> 110
    </lb_ip_address>
    ```
    
    The connection should be established immediately (Connected to <LB\_IP\_ADDRESS>). If it hangs or shows a "Connection refused" or "Connection timed out" error, check the fw-allow-proxy-only-subnet firewall rule in Task 2 to ensure the client-vm (which is in backend-subnet: 10.1.2.0/24) is allowed to talk to the LB VIP.
    
3.  Now run the curl command to send traffic to the load balancer's reserved internal IP. Replace <LB\_IP\_ADDRESS> with the IP address you noted earlier:
    
    ```plaintext
    curl <lb_ip_address>:110
    </lb_ip_address>
    ```
    
4.  You should see a response showing the hostname of one of your backend instances (mig-a-XXXX or mig-c-XXXX).
    
5.  Run the command repeatedly. You should see the hostname alternate, confirming that the regional internal proxy Network Load Balancer is successfully distributing internal client traffic across your zonal backend MIGs
    

### Optional) Task 6. Practice your skills

In this optional task, you refactor the VM deployment to use distinct instance templates. This enforces the principle of least privilege by ensuring the client VM does not have unnecessary backend-specific network tags.

#### **Create the client instance template**

1.  Create a new instance template named **int-tcp-proxy-client-template**.
    
2.  For the Network Interface, select **lb-network** and **backend-subnet**.
    
3.  For the Network Tag, add **allow-ssh** and ensure it is the only tag.
    

#### **Refactor the client VM creation**

1.  Return to the steps in Task 5.
    
2.  Delete the existing **client-vm** instance.
    
3.  Re-create the **client-vm** using the new **int-tcp-proxy-client-template**.
    

#### **Verify the backend template**

1.  Return to the steps in Task 3.
    
2.  Review the **int-tcp-proxy-backend-template**.
    
3.  Ensure it contains only the tags required for the backends: **allow-ssh**, **allow-health-check**, and **allow-proxy-only-subnet**.
    

#### **Verify functionality**

1.  Return to the steps in Task 5.
    
2.  From the new **client-vm**, re-run the `curl` test to ensure functionality is unchanged.
    

* * *

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=PMYDaM749wc] 

```plaintext
wget -O SakshamXTech.sh "https://raw.githubusercontent.com/Saksham-Dev-001/Arcade-Google-Cloud-Labs/refs/heads/main/Implement%20Regional%20Internal%20Proxy%20NLB/SakshamXTech.sh"
sed -i 's/\r$//' SakshamXTech.sh
chmod +x SakshamXTech.sh
bash SakshamXTech.sh
```

* * *

### Manual

%[https://www.youtube.com/watch?v=OwzZX0D5rT0]