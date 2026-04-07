---
title: "Enhance Application Reliability and Scalability with Internal Load Balancing - GSP216"
seoTitle: "Enhance Application Reliability and Scalability with Interna"
seoDescription: "Google Cloud's Internal Load Balancing (ILB) is a crucial service for managing and scaling your private application infrastructure. It enables you to "
datePublished: 2026-04-07T04:31:36.426Z
cuid: cmno4gue800381qqe8ccq6h5t
slug: enhance-application-reliability-and-scalability-with-internal-load-balancing-gsp216
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/d05aadbb-b0f5-4b47-9230-9b4e63960e8f.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/0cf102f0-e3ff-40bf-bf99-bc5288f377c2.png
tags: gsp216, enhance-application-reliability-and-scalability-with-internal-load-balancing-gsp216, enhance-application-reliability-and-scalability-with-internal-load-balancing

---

## **Overview**

Google Cloud's Internal Load Balancing (ILB) is a crucial service for managing and scaling your private application infrastructure. It enables you to distribute TCP/UDP-based traffic efficiently across internal virtual machine instances, ensuring your applications are highly available and performant within your private network. By providing a single, stable private IP address for your services, ILB simplifies internal application communication and enhances system resilience.

In this lab, you'll set up an internal service by creating two managed instance groups in the same region, representing a common deployment pattern for highly available applications. Then, you'll configure and thoroughly test an Internal Load Balancer, using these instance groups as its backends. This setup mimics a real-world scenario where an internal application, such as a microservice, an API endpoint, or a database, needs to be accessible to other internal services or applications without exposure to the public internet.

![Network_Diagram.png](https://cdn.qwiklabs.com/k3u04mphJhk%2F2yM84NjgPiZHrbCuzbdwAQ98vnaoHQo%3D align="center")

### Objectives

In this lab you learn how to perform the following tasks:

*   Configure essential firewall rules to allow secure HTTP traffic and health checks for internal backends.
    
*   Design and implement instance templates for consistent and scalable VM deployments.
    
*   Create and manage managed instance groups for automated scaling and self-healing of your application backends.
    
*   Set up and test an Internal Load Balancer, demonstrating its ability to distribute internal traffic effectively and ensure service availability.
    

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

1.  Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    *   The Open Google Cloud console button
        
    *   Time remaining
        
    *   The temporary credentials that you must use for this lab
        
    *   Other information, if needed, to step through this lab
        
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```plaintext
    student-00-829ebd6f58df@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    Q3TUzBFaL9x2
    ```
    
    Copied!
    
    You can also find the Password in the Lab Details pane.
    
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

## **Task 1. Configure HTTP and health check firewall rules**

Proper firewall rules are the foundation of a secure and functional internal load-balanced environment. They ensure that only authorized traffic reaches your backend services and that the Load Balancer can accurately assess the health of your instances.

Configure firewall rules to allow HTTP traffic to the backends and TCP traffic from the Google Cloud health checker.

### Explore the my-internal-app network

The network `my-internal-app` with subnet-a and subnet-b along with firewall rules for RDP, SSH, and ICMP traffic have been configured for you.

1.  In the console, navigate to **Navigation menu** > **VPC network** > **VPC networks**.
    
2.  Scroll down and notice the **my-internal-app** network with its subnets: **subnet-a** and **subnet-b**
    
    Each Google Cloud project starts with the **default** network. In addition, the **my-internal-app** network has been created for you, as part of your network diagram.
    
    You will create the managed instance groups in **subnet-a** and **subnet-b**. Both subnets are in the `europe-west3` region because an Internal Load Balancer is a regional service. The managed instance groups will be in different zones, making your service immune to zonal failures.
    

### **Create the HTTP firewall rule**

Create a firewall rule to allow HTTP traffic to the backends from the Load Balancer and the internet (to install Apache on the backends).

1.  Still in **VPC network**, in the left pane click **Firewall**.
    
2.  Notice the **app-allow-icmp** and **app-allow-ssh-rdp** firewall rules.
    
    These firewall rules have been created for you.
    
3.  Click **\+ Create Firewall Rule**.
    
4.  Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | app-allow-http |
    | Network | my-internal-app |
    | Targets | Specified target tags |
    | Target tags | lb-backend |
    | Source filter | IPv4 Ranges |
    | Source IPv4 ranges | 10.10.0.0/16 |
    | Protocols and ports | Specified protocols and ports, and then *check* tcp, *type:* 80 |
    

**Note:** Make sure to include the **/16** in the **Source IPv4 ranges** to specify all networks.

5.  Click **Create**.
    

### Create the health check firewall rules

Health checks determine which instances of a Load Balancer can receive new connections. For Internal load balancing, the health check probes to your load balanced instances come from addresses in the ranges `130.211.0.0/22` and `35.191.0.0/16`. Your firewall rules must allow these connections.

1.  Still in the **Firewall rules** page, click **\+ Create Firewall Rule**.
    
2.  Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | app-allow-health-check |
    | Network | my-internal-app |
    | Targets | Specified target tags |
    | Target tags | lb-backend |
    | Source filter | IPv4 Ranges |
    | Source IPv4 ranges | 130.211.0.0/22 and 35.191.0.0/16 |
    | Protocols and ports | Specified protocols and ports, and then *check* tcp |
    

**Note:** Make sure to enter the two **Source IPv4 ranges** one-by-one and pressing SPACE in between them.

3.  Click **Create**.
    

Click Check my progress to verify the objective.

Configure HTTP and health check firewall rules

## **Task 2. Configure instance templates and create instance groups**

Instance templates and managed instance groups are the backbone of scalable, resilient, and manageable applications. They allow you to define a standard configuration for your VMs and then automatically manage their lifecycle, ensuring consistency and enabling automated scaling and self-healing.

A managed instance group uses an instance template to create a group of identical instances. Use these to create the backends of the Internal Load Balancer.

### Configure the instance templates

An instance template is an API resource that you can use to create VM instances and managed instance groups. Instance templates define the machine type, boot disk image, subnet, labels, and other instance properties. Create an instance template for both subnets of the **my-internal-app** network.

1.  In the Console, navigate to **Navigation menu** > **Compute Engine** > **Instance templates**.
    
2.  Click **Create instance template**.
    
3.  For **Name**, type **instance-template-1**.
    
4.  For **Location**, Select **Global**.
    
5.  For **Series**, select **E2**.
    
6.  For **Machine type**, select **Shared-core** > **e2-micro**.
    
7.  Click **Advanced options**.
    
8.  Click **Networking**.
    
9.  For **Network tags**, specify **lb-backend**.
    
    **Note:** The network tag **lb-backend** ensures that the **HTTP** and **Health Check** firewall rules apply to these instances.
    
10.  For **Network interfaces**, click the dropdown icon to edit.
     
11.  Set the following values, leave all other values at their defaults:
     
     | **Property** | **Value (type value or select option as specified)** |
     | --- | --- |
     | Network | my-internal-app |
     | Subnetwork | subnet-a |
     | External IPv4 Address | None |
     
12.  Click **Done**.
     
13.  Click **Management**.
     
14.  Under **Metadata**, click **Add item** and specify the following:
     
     | **Key 1** | **Value 1** |
     | --- | --- |
     | startup-script-url | gs://spls/gsp216/[startup.sh](http://startup.sh) |
     

**Note:** The **startup-script-url** specifies a script that will be executed when instances are started. This script installs Apache and changes the welcome page to include the client IP and the name, region and zone of the VM instance. Feel free to explore [this script](https://storage.googleapis.com/spls/gsp216/startup.sh).

15.  Click **Create**.
     
16.  Wait for the instance template to be created.
     

### Configure the next instance template

Create another instance template for **subnet-b** by copying **instance-template-1**. This demonstrates how easy it is to replicate configurations across different subnets or zones for high availability and disaster recovery strategies.

1.  Still in **Instance templates**, check the box next to **instance-template-1**, then click **Copy**. Make sure to update the name as **instance-template-2**.
    
2.  Click **Advanced options**.
    
3.  Click the **Networking** tab.
    
4.  For **Network interfaces**, click the dropdown icon to edit.
    
5.  Select **subnet-b** as the **Subnetwork**.
    
6.  Click **Done** and then click **Create**.
    

### **Create the managed instance groups**

Managed instance groups (MIGs) are key to robust, self-healing, and dynamically scaling applications. They automatically replace unhealthy instances and can scale your application capacity based on demand, ensuring your services are always available and performant without constant manual intervention. This is crucial for handling variable loads and maintaining Service Level Objectives (SLOs).

Configure a managed instance group in **subnet-a** and one **subnet-b**.

**Note:** Identify one of the other zones in the same region as **subnet-a**. For example, if your zone of **subnet-a** is `us-west2-a`, you could select `us-west2-b` for **subnet-b**.

1.  Still in **Compute Engine**, in the left pane click **Instance groups**, and then click **Create Instance group**.
    
2.  Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | instance-group-1 |
    | Instance template | instance-template-1 |
    | Location | Single-zone |
    | Region | `europe-west3` |
    | Zone | `europe-west3-c` |
    | Autoscaling > Minimum number of instances | 1 |
    | Autoscaling > Maximum number of instances | 1 |
    | Autoscaling > Autoscaling signals (click the dropdown icon to edit) > Signal type | CPU utilization |
    | Target CPU utilization | 80 |
    | Initialization period | 45 |
    

**Note:Autoscaling** is a critical feature of managed instance groups that dynamically scales resources based on measured load. This capability lets your application smoothly handle variable traffic and optimizes cloud spend.

3.  Click **Create**.
    
    Repeat the same procedure for **instance-group-2** in the different zone of same region as **subnet-a**:
    
4.  Click **Create Instance group**.
    
5.  Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | instance-group-2 |
    | Instance template | instance-template-2 |
    | Location | Single-zone |
    | Region | `europe-west3` |
    | Zone | Zone (Use the different zone in same region as subnet-a) |
    | Autoscaling > Minimum number of instances | 1 |
    | Autoscaling > Maximum number of instances | 1 |
    | Autoscaling > Autoscaling signals (click the dropdown icon to edit) > Signal type | CPU utilization |
    | Target CPU utilization | 80 |
    | Initialization period | 45 |
    
6.  Click **Create**.
    

### Verify the backends

Verify that VM instances are being created in both subnets and create a utility VM to access the backends' HTTP sites directly. This step confirms individual backend functionality before introducing the load balancer, ensuring proper setup of your service tier.

1.  Still in **Compute Engine**, click **VM instances**.
    
2.  Notice two instances that start with `instance-group-1` and `instance-group-2`.
    
    These instances are in separate zones and their internal IP addresses are part of the **subnet-a** and **subnet-b** CIDR blocks.
    
3.  To create a new instance, click **Create Instance**.
    
4.  In the **Machine configuration**.
    
    Select the following values:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | utility-vm |
    | Region | `europe-west3` |
    | Zone | `europe-west3-c` |
    | Series | `E2` |
    | Machine Type | `e2-micro` (1 shared vCPU) |
    
5.  Click **Networking**.
    
    For **Network interfaces**, click **Toggle** to Edit network interface.
    
    Specify the following:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Network | my-internal-app |
    | Subnetwork | subnet-a |
    | Primary internal IPv4 address | Ephemeral (Custom) |
    | Custom ephemeral IP address | 10.10.20.50 |
    
6.  Click **Done** and then click **Create**.
    

Click Check my progress to verify the objective.

Configure instance templates and create instance groups

7.  The internal IP addresses for the backends are `10.10.20.2` and `10.10.30.2`.
    

**Note:** If these IP addresses are different, replace them in the two **curl** commands below.

8.  For **utility-vm**, click **SSH** to launch a terminal and connect.
    
9.  To verify the welcome page for `instance-group-1-xxxx`, run the following command:
    

```plaintext
curl 10.10.20.2
```

Copied!

The output should look like this:

```plaintext
<h1>Internal Load Balancing Lab</h1><h2>Client IP</h2>Your IP address : 10.10.20.50<h2>Hostname</h2>Server Hostname:
 instance-group-1-1zn8<h2>Server Location</h2>Region and Zone: us-central1-a
```

10.  To verify the welcome page for `instance-group-2-xxxx`, run the following command:
     

```plaintext
curl 10.10.30.2
```

Copied!

The output should look like this:

```plaintext
<h1>Internal Load Balancing Lab</h1><h2>Client IP</h2>Your IP address : 10.10.20.50<h2>Hostname</h2>Server Hostname:
 instance-group-2-q5wp<h2>Server Location</h2>Region and Zone: us-central1-b
```

Which of these fields identify the location of the backend?

Server Location

Client IP

Server Hostname

**Note:** The **curl** commands demonstrate that each VM instance lists the Client IP and its own name and location. This will be useful when verifying that the Internal Load Balancer sends traffic to both backends.

11.  Close the SSH terminal to **utility-vm**:
     

```plaintext
exit
```

Copied!

## **Task 3. Configure the Internal Load Balancer**

Configuring the ILB centralizes access to your backend services, provides a single point of entry for internal traffic, and ensures intelligent traffic distribution based on the health and capacity of your instances. This step is crucial for achieving the high availability and scalability benefits discussed earlier, acting as a centralized access point for your distributed service.

Configure the Internal Load Balancer to balance traffic between the two backends (**instance-group-1** and **instance-group-2**), as illustrated in this diagram:

![Network Diagram showing the Internal Load Balancer balancing traffic between the 2 backends](https://cdn.qwiklabs.com/k3u04mphJhk%2F2yM84NjgPiZHrbCuzbdwAQ98vnaoHQo%3D align="center")

### Start the configuration

1.  From the Navigation Menu, select **View All Products**. Under **Networking**, select **Network Services**.
    
2.  Select the **Load balancing** page.
    
3.  Click **Create load balancer**.
    
4.  For **Type of load balancer**, select **Network Load Balancer (TCP/UDP/SSL)**.
    
5.  For **Proxy or passthrough**, select **Passthrough load balancer**.
    
6.  For **Public facing or internal**, select **Internal**.
    
7.  Click **CONFIGURE**.
    
8.  For **Name**, type `my-ilb`.
    
9.  For **Region**, select `europe-west3`.
    
10.  For **Network**, select **my-internal-app**.
     

### Configure the regional backend service

The backend service is the intelligence behind the ILB, defining how traffic is distributed and how instance health is monitored. It's essential for ensuring traffic only flows to operational instances and preventing overload. This is also where you configure advanced features like session affinity, to keep a user's connection to the same backend or connection draining, for graceful backend updates.

The backend service monitors instance groups and prevents them from exceeding configured usage.

1.  Click on **Backend configuration**.
    
2.  Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (select option as specified)** |
    | --- | --- |
    | Instance group | instance-group-1 |
    
3.  Click **Add a backend**.
    
4.  For **Instance group**, select **instance-group-2**.
    
5.  For **Health Check**, select **Create a health check**.
    
6.  Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (select option as specified)** |
    | --- | --- |
    | Name | my-ilb-health-check |
    | Protocol | TCP |
    | Port | 80 |
    

**Note:** Health checks determine which instances can receive new connections. This HTTP health check polls instances every 5 seconds, waits up to 5 seconds for a response, and treats 2 successful or 2 failed attempts as healthy or unhealthy, respectively. This continuous monitoring is vital for quick recovery from instance failures and maintaining your Service Level Agreements (SLAs)

7.  Click **Create**.
    
8.  Verify that there is a blue check mark next to **Backend configuration** in the Cloud Console. If not, double-check that you have completed all the steps above.
    

### Configure the frontend

The frontend is the exposed interface of your ILB. By assigning a static internal IP address, you provide a consistent and predictable endpoint for other internal services to connect to, simplifying your application architecture, enabling easy service discovery within your VPC, and improving reliability.

The frontend forwards traffic to the backend.

1.  Click on **Frontend configuration**.
    
2.  Specify the following, leaving all other values with their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Subnetwork | subnet-b |
    | Internal IP | Under **IP address** select **Create IP address** |
    
3.  Specify the following, leaving all other values with their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | my-ilb-ip |
    | Static IP address | Let me choose |
    | Custom IP address | 10.10.30.5 |
    
4.  Click **Reserve**.
    
5.  In **Port number**, type `80`.
    
6.  Click **Done** .
    

### **Review and create the Internal Load Balancer**

1.  Click on **Review and finalize**.
    
2.  Review the **Backend** and **Frontend**.
    
3.  Click on **Create**. Wait for the Load Balancer to be created, before moving to the next task.
    

Click Check my progress to verify the objective.

Configure the Internal Load Balancer

## **Task 4. Test the Internal Load Balancer**

The final test validates that the ILB is correctly distributing traffic across healthy backend instances. This confirms that your internal services are now more resilient and scalable, leveraging the core benefits of the ILB, and that the private connectivity is correctly established.

Verify that the `my-ilb` IP address forwards traffic to **instance-group-1** and **instance-group-2**.

### **Access the Internal Load Balancer**

1.  In the Cloud Console, navigate to **Navigation menu** > **Compute Engine** > **VM instances**.
    
2.  For **utility-vm**, click **SSH** to launch a terminal and connect.
    
3.  To verify that the Internal Load Balancer forwards traffic, run the following command:
    

```plaintext
curl 10.10.30.5
```

Copied!

The output should look like this:

```plaintext
<h1>Internal Load Balancing Lab</h1><h2>Client IP</h2>Your IP address : 10.10.20.50<h2>Hostname</h2>Server Hostname:
 instance-group-1-1zn8<h2>Server Location</h2>Region and Zone: us-central1-a
```

**Note:** As expected, traffic is forwarded from the Internal Load Balancer (10.10.30.5) to the backend.

4.  Run the same command a couple more times.
    

In the output, you should be able to see responses from **instance-group-1** in `europe-west3-c` and **instance-group-2** in the different zone of same region. The load balancer is distributing traffic across the backend instances, proving its efficacy in ensuring high availability and distributing load.

* * *

## Solution of Lab

%[https://www.youtube.com/watch?v=CJDVlzKurBg] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP216/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Enhance%20Application%20Reliability%20and%20Scalability%20with%20Internal%20Load%20Balancing/TechCode.sh
sudo chmod +x TechCode.sh 
./TechCode.sh
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/50c04d44-1702-4ae0-a6a5-267609df700a.png align="center")