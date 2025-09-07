---
title: "Application Load Balancer with Cloud Armor - GSP215"
seoTitle: "Application Load Balancer with Cloud Armor - GSP215"
seoDescription: "Google Cloud Application Load Balancing is implemented at the edge of Google's network in Google's points of presence (POP) around the world. User traffic d"
datePublished: Tue Apr 22 2025 05:54:39 GMT+0000 (Coordinated Universal Time)
cuid: cm9s3biaw001109leaeas0hmm
slug: application-load-balancer-with-cloud-armor-gsp215
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745301249721/c9d71eee-98bc-4151-8e7a-38f3d6494e42.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745301264709/8a13c1cc-74b7-4a9e-9665-75d3cbd471fe.png
tags: application-load-balancer-with-cloud-armor-gsp215, application-load-balancer-with-cloud-armor, gsp215

---

## Overview

Google Cloud Application Load Balancing is implemented at the edge of Google's network in Google's points of presence (POP) around the world. User traffic directed to an Application Load Balancer enters the POP closest to the user and is then load balanced over Google's global network to the closest backend that has sufficient capacity available.

Cloud Armor IP allowlist/denylist enable you to restrict or allow access to your Application Load Balancer at the edge of the Google Cloud, as close as possible to the user and to malicious traffic. This prevents malicious users or traffic from consuming resources or entering your Virtual Private Cloud (VPC) networks.

In this lab, you configure an Application Load Balancer with global backends, as shown in the diagram below. Then, you stress test the Load Balancer and denylist the stress test IP with Cloud Armor.

![Network diagram that illustrates load balancing](https://cdn.qwiklabs.com/7wJtCqbfTFLwKCpOMzUSyPjVKBjUouWHbduOqMpfRiM%3D align="left")

### Objectives

In this lab, you learn how to perform the following tasks:

* Create HTTP and health check firewall rules
    
* Configure two instance templates
    
* Create two managed instance groups
    
* Configure an Application Load Balancer with IPv4 and IPv6
    
* Stress test an Application Load Balancer
    
* Denylist an IP address to restrict access to an Application Load Balancer
    

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
    student-04-e68b0c82bab2@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    ouzJD9bdTlnM
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

## Task 1. Configure HTTP and health check firewall rules

Configure firewall rules to allow HTTP traffic to the backends and TCP traffic from the Google Cloud health checker.

### Create the HTTP firewall rule

Create a firewall rule to allow HTTP traffic to the backends.

1. In the Cloud console, navigate to **Navigation menu** () &gt; **VPC network** &gt; **Firewall**.
    
2. Notice the existing **ICMP**, **internal**, **RDP**, and **SSH** firewall rules.
    
    Each Google Cloud project starts with the **default** network and these firewall rules.
    
3. Click **Create Firewall Rule**.
    
4. Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | default-allow-http |
    | Network | default |
    | Targets | Specified target tags |
    | Target tags | http-server |
    | Source filter | IPv4 Ranges |
    | Source IPv4 ranges | 0.0.0.0/0 |
    | Protocols and ports | Specified protocols and ports, and then *check* TCP, *type:* 80 |
    

Make sure to include the **/0** in the **Source IPv4 ranges** to specify all networks.

5. Click **Create**.
    

### Create the health check firewall rules

Health checks determine which instances of a load balancer can receive new connections. For Application Load Balancing, the health check probes to your load balanced instances come from addresses in the ranges `130.211.0.0/22` and `35.191.0.0/16`. Your firewall rules must allow these connections.

1. Still in the **Firewall policies** page, click **Create Firewall Rule**.
    
2. Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | default-allow-health-check |
    | Network | default |
    | Targets | Specified target tags |
    | Target tags | http-server |
    | Source filter | IPv4 Ranges |
    | Source IPv4 ranges | `130.211.0.0/22`, `35.191.0.0/16` |
    | Protocols and ports | Specified protocols and ports, and then *check* TCP |
    
    **Note:** Make sure to enter the two **Source IPv4 ranges** one-by-one and press SPACE in between them.
    
3. Click **Create**.
    

Click *Check my progress* to verify the objective.

Configure HTTP and health check firewall rules

**Check my progress**

## Task 2. Configure instance templates and create instance groups

A managed instance group uses an instance template to create a group of identical instances. Use these to create the backends of the Application Load Balancer.

### Configure the instance templates

An instance template is an API resource that you use to create VM instances and managed instance groups. Instance templates define the machine type, boot disk image, subnet, labels, and other instance properties.

Create one instance template for `us-east1` and one for `europe-west4`.

1. In the Cloud console, go to **Navigation menu** () &gt; **Compute Engine** &gt; **Instance templates**, and then click **Create instance template**.
    
2. For **Name**, type `us-east1`\-template.
    
3. For **Location**, Select **Global**.
    
4. For **Series**, select **E2**.
    
5. For **Machine Type**, select **e2-micro**.
    
6. Click **Advanced Options**.
    
7. Click **Networking**. Set the following value and leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Network tags | http-server |
    
8. Click **default** under **Network interfaces**. Set the following values and leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Network | default |
    | Subnetwork | default `us-east1` |
    
    Click **Done**.
    

The network tag **http-server** ensures that the **HTTP** and **Health Check** firewall rules apply to these instances.

9. Click the **Management** tab.
    
10. Under **Metadata**, click **\+ ADD ITEM** and specify the following:
    
    | **Key** | **Value** |
    | --- | --- |
    | startup-script-url | gs://cloud-training/gcpnet/httplb/startup.sh |
    

The `startup-script-url` specifies a script that executes when instances are started. This script installs Apache and changes the welcome page to include the client IP and the name, region, and zone of the VM instance. Feel free to explore [this script](https://storage.googleapis.com/cloud-training/gcpnet/httplb/startup.sh).

11. Click **Create**.
    
12. Wait for the instance template to be created.
    

Now create another instance template for **subnet-b** by copying `us-east1`\-template:

1. Click on `us-east1`\-template and then click on the **+CREATE SIMILAR** option from the top.
    
2. For **Name**, type `europe-west4`\-template.
    
3. Ensure **Location** is selected **Global**.
    
4. Click **Advanced Options**.
    
5. Click **Networking**.
    
6. Ensure **http-server** is added as a **network tag**.
    
7. In **Network interfaces**, for **Subnetwork**, select **default (**`europe-west4`).
    
8. Click **Done**.
    
9. Click **Create**.
    

### Create the managed instance groups

Create a managed instance group in `us-east1` and one in `europe-west4`.

1. Still in **Compute Engine**, click **Instance groups** in the left menu.
    
2. Click **Create instance group**.
    
3. Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | `us-east1`\-mig (if required, remove extra space from the name) |
    | Instance template | `us-east1`\-template |
    | Location | Multiple zones |
    | Region | `us-east1` |
    | Minimum number of instances | 1 |
    | Maximum number of instances | 2 |
    | Autoscaling signals &gt; Click dropdown &gt; Signal type | CPU utilization |
    | Target CPU utilization | 80, click **Done**. |
    | Initialization period | 45 |
    

Managed instance groups offer **autoscaling** capabilities that allow you to automatically add or remove instances from a managed instance group based on increases or decreases in load. Autoscaling helps your applications gracefully handle increases in traffic and reduces cost when the need for resources is lower. You just define the autoscaling policy and the autoscaler performs automatic scaling based on the measured load.

4. Click **Create**.
    

Now repeat the same procedure to create a second instance group for `europe-west4`\-mig in `europe-west4`:

1. Click **Create Instance group**.
    
2. Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | `europe-west4`\-mig |
    | Instance template | `europe-west4`\-template |
    | Location | Multiple zones |
    | Region | `europe-west4` |
    | Minimum number of instances | 1 |
    | Maximum number of instances | 2 |
    | Autoscaling signals &gt; Click dropdown &gt; Signal type | CPU utilization |
    | Target CPU utilization | 80, click **Done**. |
    | Initialization period | 45 |
    
3. Click **Create**.
    

Click *Check my progress* to verify the objective.

Configure instance templates and instance group

**Check my progress**

### Verify the backends

Verify that VM instances are being created in both regions and access their HTTP sites.

1. Still in **Compute Engine**, click **VM instances** in the left menu.
    
2. Notice the instances that start with `us-east1`\-mig and `europe-west4`\-mig.
    
    These instances are part of the managed instance groups.
    
3. Click on the **External IP** of an instance of `us-east1`\-mig.
    
    You should see the **Client IP** (your IP address), the **Hostname** (starts with `us-east1`\-mig) and the **Server Location** (a zone in `us-east1`).
    
4. Click on the **External IP** of an instance of `europe-west4`\-mig.
    
    You should see the **Client IP** (your IP address), the **Hostname** (starts with `europe-west4`\-mig) and the **Server Location** (a zone in `europe-west4`).
    

**Note:** The **Hostname** and **Server Location** identifies where the Application Load Balancer sends traffic.

Which of these fields identify the region of the backend?Server LocationClient IPHostname

**Submit**

## Task 3. Configure the Application Load Balancer

Configure the Application Load Balancer to balance traffic between the two backends (`us-east1`\-mig in `us-east1` and `europe-west4`\-mig in `europe-west4`), as illustrated in the network diagram:

![Network diagram that illustrates load balancing](https://cdn.qwiklabs.com/7wJtCqbfTFLwKCpOMzUSyPjVKBjUouWHbduOqMpfRiM%3D align="left")

### Start the configuration

1. In the Cloud console, click **Navigation menu** () &gt; click **VIEW ALL PRODUCTS** &gt; **Networking** &gt; **Network Services** &gt; **Load balancing**.
    
2. click **Create load balancer**.
    
3. Under **Application Load Balancer HTTP(S)**, click Next.
    
4. For **Public facing or internal**, select **Public facing (external)** and click Next.
    
5. For **Global or single region deployment**, select **Best for global workloads** and click Next.
    
6. For **Load balancer generation**, select **Global external Application Load Balancer** and click Next.
    
7. For **Create load balancer**, click **Configure**.
    
8. Set **Load Balancer Name** to `http-lb`.
    

### Configure the frontend

The host and path rules determine how your traffic will be directed. For example, you could direct video traffic to one backend and static traffic to another backend. However, you are not configuring the Host and path rules in this lab.

1. Click on **Frontend configuration**.
    
2. Specify the following, leaving all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Protocol | HTTP |
    | IP version | IPv4 |
    | IP address | Ephemeral |
    | Port | 80 |
    
3. Click **Done**.
    
4. Click **Add Frontend IP and port**.
    
5. Specify the following, leaving all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Protocol | HTTP |
    | IP version | IPv6 |
    | IP address | Auto-allocate |
    | Port | 80 |
    
6. Click **Done**.
    

Application Load Balancing supports both IPv4 and IPv6 addresses for client traffic. Client IPv6 requests are terminated at the global load balancing layer, then proxied over IPv4 to your backends.

### Configure the backend

Backend services direct incoming traffic to one or more attached backends. Each backend is composed of an instance group and additional serving capacity metadata.

1. Click on **Backend configuration**.
    
2. For **Backend services & backend buckets**, click **Create a backend service**.
    
3. Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (select option as specified)** |
    | --- | --- |
    | Name | http-backend |
    | Instance group | `us-east1`\-mig |
    | Port numbers | 80 |
    | Balancing mode | Rate |
    | Maximum RPS | 50 |
    | Capacity | 100 |
    

This configuration means that the load balancer attempts to keep each instance of `us-east1`\-mig at or below 50 requests per second (RPS).

4. Click **Done**.
    
5. Click **Add a backend**.
    
6. Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (select option as specified)** |
    | --- | --- |
    | Instance group | `europe-west4`\-mig |
    | Port numbers | 80 |
    | Balancing mode | Utilization |
    | Maximum backend utilization | 80 |
    | Capacity | 100 |
    

This configuration means that the load balancer attempts to keep each instance of `europe-west4`\-mig at or below 80% CPU utilization.

7. Click **Done**.
    
8. For **Health Check**, select **Create a health check**.
    
9. Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (select option as specified)** |
    | --- | --- |
    | Name | http-health-check |
    | Protocol | TCP |
    | Port | 80 |
    

Health checks determine which instances receive new connections. This HTTP health check polls instances every 5 seconds, waits up to 5 seconds for a response and treats 2 successful or 2 failed attempts as healthy or unhealthy, respectively.

10. Click **Save**.
    
11. Check the **Enable Logging** box.
    
12. Set the **Sample Rate** to `1`.
    
13. Click **Create** to create the backend service.
    
14. Click **Ok**.
    

### Review and create the Application Load Balancer

1. Click on **Review and finalize**.
    
2. Review the **Backend** and **Frontend** services.
    
3. Click on **Create**.
    
4. Wait for the load balancer to be created.
    
5. Click on the name of the load balancer (**http-lb**).
    
6. Note the IPv4 and IPv6 addresses of the load balancer for the next task. They will be referred to as `[LB_IP_v4]` and `[LB_IP_v6]`, respectively.
    

**Note:** The IPv6 address is the one in hexadecimal format.

Click *Check my progress* to verify the objective.

Configure the Application Load Balancer

**Check my progress**

## Task 4. Test the Application Load Balancer

Now that you created the Application Load Balancer for your backends, verify that traffic is forwarded to the backend service.

The Application Load Balancer should forward traffic to the region that is closest to you.TrueFalse

### Access the Application Load Balancer

To test IPv4 access to the Application Load Balancer, open a new tab in your browser and navigate to `http://[LB_IP_v4]`. Make sure to replace `[LB_IP_v4]` with the IPv4 address of the load balancer.

**Note:** It might take up to 5 minutes to access the Application Load Balancer. In the meantime, you might get a 404 or 502 error. Keep trying until you see the page of one of the backends.

**Note:** Depending on your proximity to `us-east1` and `europe-west4`, your traffic is either forwarded to a `us-east1`\-mig or `europe-west4`\-mig instance.

If you have a local IPv6 address, try the IPv6 address of the Application Load Balancer by navigating to `http://[LB_IP_v6]`. Make sure to replace `[LB_IP_v6]` with the IPv6 address of the load balancer.

### Stress test the Application Load Balancer

Create a new VM to simulate a load on the Application Load Balancer using `siege`. Then, determine if traffic is balanced across both backends when the load is high.

1. In the console, navigate to **Navigation menu** () &gt; **Compute Engine** &gt; **VM instances**.
    
2. Click **Create instance**.
    
3. In the **Machine configuration**:
    
    Select the following values:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | siege-vm |
    | Region | `us-central1` |
    | Zone | `us-central1-b` |
    | Series | `E2` |
    

Given that `us-central1` is closer to `us-east1` than to `europe-west4`, traffic should be forwarded only to `us-east1`\-mig (unless the load is too high).

4. Click **Create**.
    
5. Wait for the **siege-vm** instance to be created.
    
6. For **siege-vm**, click **SSH** to launch a terminal and connect.
    
7. Run the following command, to install siege:
    

```apache
sudo apt-get -y install siege
```

8. To store the IPv4 address of the Application Load Balancer in an environment variable, run the following command, replacing `[LB_IP_v4]` with the IPv4 address:
    

```apache
export LB_IP=[LB_IP_v4]
```

9. To simulate a load, run the following command:
    

```apache
siege -c 150 -t120s http://$LB_IP
```

10. In the Cloud console, click **Navigation menu** () &gt; click **VIEW ALL PRODUCTS** &gt; **Networking** &gt; **Network Services** &gt; **Load balancing**.
    
11. Click **Backends**.
    
12. Click **http-backend**.
    
13. Navigate to **http-lb**.
    
14. Click on the **Monitoring** tab.
    
15. Monitor the **Frontend Location (Total inbound traffic)** between North America and the two backends for 2 to 3 minutes.
    

At first, traffic should just be directed to `us-east1`\-mig but as the RPS increases, traffic is also directed to `europe-west4`.

This demonstrates that by default traffic is forwarded to the closest backend but if the load is very high, traffic can be distributed across the backends.

16. Return to the **SSH** terminal of **siege-vm**.
    
17. Press **CTRL+C** to stop siege if it's still running.
    

The output should look like this:

```apache
New configuration template added to /home/student-02-dd02c94b8808/.siege
Run siege -C to view the current settings in that file
{       "transactions":                        24729,
        "availability":                       100.00,
        "elapsed_time":                       119.07,
        "data_transferred":                     3.77,
        "response_time":                        0.66,
        "transaction_rate":                   207.68,
        "throughput":                           0.03,
        "concurrency":                        137.64,
        "successful_transactions":             24729,
        "failed_transactions":                     0,
        "longest_transaction":                 10.45,
        "shortest_transaction":                 0.03
}
```

## Task 5. Denylist the siege-vm

Use Cloud Armor to denylist the **siege-vm** from accessing the Application Load Balancer.

### Create the security policy

Create a Cloud Armor security policy with a denylist rule for the **siege-vm**.

1. In the console, navigate to **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **Compute Engine** &gt; **VM instances**.
    
2. Note the **External IP** of the **siege-vm**. This will be referred to as `[SIEGE_IP]`.
    

**Note:** There are ways to identify the external IP address of a client trying to access your Application Load Balancer. For example, you could examine traffic captured by [VPC Flow Logs in BigQuery](https://cloud.google.com/vpc/docs/using-flow-logs#exporting_logs_to_bigquery_name_short_pubsub_name_short_and_custom_targets) to determine a high volume of incoming requests.

3. In the Cloud console, click **Navigation menu** () &gt; click **VIEW ALL PRODUCTS** &gt; **Networking** &gt; **Network Security** &gt; **Cloud Armor policies**.
    
4. Click **Create policy**.
    
5. Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | denylist-siege |
    | Default rule action | Allow |
    
6. Click **Next step**.
    
7. Click **Add a rule**.
    
8. Set the following values, leave all other values at their defaults:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Condition &gt; Match | *Enter the SIEGE\_IP* |
    | Action | Deny |
    | Response code | 403 (Forbidden) |
    | Priority | 1000 |
    
9. Click **Save Change to Rule**.
    
10. Click **Next step**.
    
11. Click **Add Target**.
    
12. For **Type**, select **Backend service (external application load balancer)**.
    
13. For **Target**, select **http-backend** and if prompted confirm **Replace**.
    
14. Click **Create policy**.
    

**Note:** Alternatively, you could set the default rule to **Deny** and only allowlist or allow traffic from authorized users/IP addresses.

15. Wait for the policy to be created before moving to the next step.
    

Click *Check my progress* to verify the objective.

Denylist the siege-vm

**Check my progress**

### Verify the security policy

Verify that the **siege-vm** cannot access the Application Load Balancer.

1. Return to the **SSH** terminal of **siege-vm**.
    
2. To access the load balancer, run the following:
    

```apache
curl http://$LB_IP
```

The output should look like this:

```apache
<!doctype html><meta charset="utf-8"><meta name=viewport content="width=device-width, initial-scale=1"><title>403</title>403 Forbidden
```

**Note:** It might take a couple of minutes for the security policy to take effect. If you are able to access the backends, keep trying until you get the **403 Forbidden error**.

3. Open a new tab in your browser and navigate to `http://[LB_IP_v4]`. Make sure to replace `[LB_IP_v4]` with the IPv4 address of the load balancer.
    

**Note:** You can access the Application Load Balancer from your browser because of the default rule to **allow** traffic; however, you cannot access it from the **siege-vm** because of the **deny** rule that you implemented.

4. Back in the SSH terminal of siege-vm, to simulate a load, run the following command:
    

```apache
siege -c 150 -t120s http://$LB_IP
```

The command will not generate any output.

Explore the security policy logs to determine if this traffic is also blocked.

5. In the console, navigate to **Navigation menu** &gt; **Network Security** &gt; **Cloud Armor Policies**.
    
6. Click **denylist-siege**.
    
7. Click **Logs**.
    
8. Click **View policy logs**.
    
9. On the Logging page, make sure to clear all the text in the **Query preview**. Select resource to **Application Load Balancer** &gt; **http-lb-forwarding-rule** &gt; **http-lb** then click **Apply**.
    
10. Now click **Run Query**.
    
11. Expand a log entry in **Query results**.
    
12. Expand **httpRequest**.
    

The request should be from the **siege-vm** IP address. If not, expand another log entry.

13. Expand **jsonPayload**.
    
14. Expand **enforcedSecurityPolicy**.
    
15. Notice that the **configuredAction** is to `DENY` with the **name** `denylist-siege`.
    

![Query results page](https://cdn.qwiklabs.com/kf8dX3SIyN706oBbZhyrAEC%2B9goZrVR%2BzWKqn0is0OM%3D align="left")

Cloud Armor security policies create logs that can be explored to determine when traffic is denied and when it is allowed, along with the source of the traffic.

---

## Solution of Lab

%[https://youtu.be/7D0hcw2WE0U] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Application%20Load%20Balancer%20with%20Cloud%20Armor/techcps215.sh
sudo chmod +x techcps215.sh
./techcps215.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757230794460/d93d17fe-e56b-43ba-a6f8-7c442dbc1c81.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745301166547/a5ea182e-23d5-4b45-800f-fc0eece0d24b.png align="center")