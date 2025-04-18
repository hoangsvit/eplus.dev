---
title: "Monitor an Apache Web Server using Ops Agent - GSP1108"
seoTitle: "Monitor an Apache Web Server using Ops Agent - GSP1108"
seoDescription: "In this lab you use Cloud Monitoring to generate traffic and view metrics on the predefined Apache dashboard in the Google Cloud console.

The Apache Web Se"
datePublished: Fri Apr 18 2025 03:37:54 GMT+0000 (Coordinated Universal Time)
cuid: cm9m8o8kd000308l87s2oanrj
slug: monitor-an-apache-web-server-using-ops-agent-gsp1108
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744947363121/8fa3049a-ed0c-4457-af1c-b01bb04149dd.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744947460476/349c8849-b979-4bec-829d-9039eec7a6f4.png
tags: monitor-an-apache-web-server-using-ops-agent-gsp1108, monitor-an-apache-web-server-using-ops-agent, gsp1108

---

## Overview

In this lab you use Cloud Monitoring to generate traffic and view metrics on the predefined Apache dashboard in the Google Cloud console.

The Apache Web Server integration collects traffic-related metrics, such as the number of open connections or incoming requests. The integration also collects access and error logs. Access logs are parsed into a JSON payload focused on request details, and error logs are parsed for their error code and message.

## Objectives

In this lab, you learn how to perform the following tasks:

* Create a Compute Engine VM instance.
    
* Install an Apache Web Server.
    
* Install and configure the Ops Agent for the Apache Web Server.
    
* Generate traffic and view metrics on the predefined Apache dashboard.
    
* Create an alerting policy.
    

## Task 1. Create a Compute Engine VM instance

1. In the Google Cloud console, select **Navigation menu** &gt; **Compute Engine** &gt; **VM Instances**.
    
2. To create a VM instance, click **Create Instance**.
    
3. In the **Machine configuration**.
    
    Select the following values:
    
    | **Property** | **Value (type value or select option as specified)** |
    | --- | --- |
    | Name | `quickstart-vm` |
    | Zone | `us-west1-a` |
    | Series | `E2` |
    | Machine Type | `e2-small` |
    
4. Click **OS and storage**.
    
    Click **Change** to begin configuring your boot disk:
    
    * Ensure the **Boot disk** is configured for **Debian GNU/Linux 11 (bullseye)**.
        
    
    Click **Select**.
    
5. Click **Networking**.
    
    * In the **Firewall** field, select both **Allow HTTP traffic** and **Allow HTTPS traffic**.
        
6. Click **Create**. When your VM is ready, it appears in the list of instances in the Instances tab.
    

Click **Check my progress** to verify the objective.

Create a Compute Engine VM instance

**Check my progress**

## Task 2. Install an Apache Web Server

To deploy an Apache Web Server on your Compute Engine VM instance, do the following:

1. Open a terminal to your instance, by clicking the **SSH** button.
    
2. Update the package lists on your instance by running the following:
    

```apache
sudo apt-get update
```

3. Install an Apache2 HTTP Server:
    

```apache
sudo apt-get install apache2 php7.0
```

**Note:** If the previous command fails, then use `sudo apt-get install apache2 php`. If asked to continue the installation, enter `Y`.

4. Copy the address in the **External IP** column of your VM instance.
    
5. Open your browser and connect to your Apache2 HTTP server by using the URL `http://EXTERNAL_IP`, where `EXTERNAL_IP` is the external IP address of your VM.
    

![Apache2 message: It works!](https://cdn.qwiklabs.com/xIN%2FXr5xvudX1GHokiSJAQNBcMqZXZQEnFbSLVdoDbI%3D align="left")

**Note:** If you get a pop-up as **EXTERNAL\_IP doesn’t support a secure connection** click **Continue to site**

Click **Check my progress** to verify the objective.

Install an Apache Web Server

**Check my progress**

## Task 3. Install and configure the Ops Agent

The following commands create the configuration to collect and ingest telemetry for Apache Web Server and restart the [Ops Agent](https://cloud.google.com/logging/docs/agent/ops-agent) by using the terminal:

1. In the SSH window, install the Ops Agent by running the following:
    

```apache
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
```

You should notice the `google-cloud-ops-agent` installation succeeded.

2. Now create the configuration to collect and ingest logs and metrics from the Apache Web Server. Read through the comments to understand what each command does:
    

```apache
# Configures Ops Agent to collect telemetry from the app and restart Ops Agent.

set -e

# Create a back up of the existing file so existing configurations are not lost.
sudo cp /etc/google-cloud-ops-agent/config.yaml /etc/google-cloud-ops-agent/config.yaml.bak

# Configure the Ops Agent.
sudo tee /etc/google-cloud-ops-agent/config.yaml > /dev/null << EOF
metrics:
  receivers:
    apache:
      type: apache
  service:
    pipelines:
      apache:
        receivers:
          - apache
logging:
  receivers:
    apache_access:
      type: apache_access
    apache_error:
      type: apache_error
  service:
    pipelines:
      apache:
        receivers:
          - apache_access
          - apache_error
EOF

sudo service google-cloud-ops-agent restart
sleep 60
```

For more information about ingesting logs from the Apache Web Server, see [Configure the Ops Agent for Apache Web Server](https://cloud.google.com/logging/docs/agent/ops-agent/third-party/apache).

Click **Check my progress** to verify the objective.

Install the Ops Agent

**Check my progress**

## Task 4. Generate traffic and view metrics

Monitoring dashboards lets you view and analyze metrics related to your services. In this lab, you generate metrics on your Apache Web Server and view metric data on the automatically created **Apache Overview** dashboard.

* In the SSH window for your instance, run the following command to generate traffic on your Apache Web Server,:
    

```apache
timeout 120 bash -c -- 'while true; do curl localhost; sleep $((RANDOM % 4)) ; done'
```

The previous command generates traffic by making a request to the Apache Web Server every four seconds.

To view the **Apache Overview** dashboard, do the following:

1. In the console, search for **Monitoring** in the top search bar and navigate to the **Monitoring** service.
    
2. In the navigation pane, select **Dashboards**.
    
3. In **All Dashboards**, select the **Apache Overview** dashboard. The **Apache GCE Overview** dashboard opens.
    

In the dashboard, there are several charts that contain information about your Apache and Compute Engine integration:

![Apache Dashboard](https://cdn.qwiklabs.com/ixAF74OALIDRkZLYNX4YYdCW4%2BlXfTswSlx24c2Clck%3D align="left")

## Task 5. Create an alerting policy

Alerting policies instruct Cloud Monitoring to notify you when specified conditions occur.

1. To set up an email notification channel, do the following:
    
    * In Google Cloud console, select **Navigation menu** &gt; **Monitoring** select **Alerting** and then click **Edit notification channels**.
        
    * Scroll down the page and click on **Add new** for **Email**.
        
    * **Name the Email Channel**: `An email address you have access to`
        
    * Enter the **Display name**.
        
    * Click **Save**.
        

**Note:** If you enter your own email address, you might get alerts until all the resources in the project have been deleted.

To create an alerting policy that monitors a metric and sends an email notification when the traffic rate on your Apache Web Server exceeds 4 KiB/s, do the following:

2. In Google Cloud console, select **Navigation menu** &gt; **Monitoring** &gt; **Alerting** and then click **Create policy**.
    
3. Select the time series to be monitored:
    
    * Click **Select a metric** and enter **VM instance** into the filter bar.
        
    * In the **Active metric categories** list, select **Apache**.
        
    * In the **Active metrics** list, select **workload/apache.traffic**. Click **Apply**.
        

The chart for Apache traffic is shown.

4. In the **Transform data** section, select the following values and click **Next**:
    
    * **Rolling window**: `1 min`
        
    * **Rolling window function**: `rate`
        
5. In the **Configure alert trigger** section, select the following values and click **Next**:
    
    * **Alert trigger**: `Any time series violates`
        
    * **Threshold position**: `Above threshold`
        
    * **Threshold value**: `4000`
        
6. In the **Configure notifications and finalize alert** section, select the following values:
    
    * **Notification channels**: Select the `Display name` you have created earlier and click **OK**.
        
    * **Incident autoclose duration**: `30 min`
        
    * **Name the alert policy**: `Apache traffic above threshold`
        
7. Click **Create policy**. Your alerting policy is now active.
    

Click **Check my progress** to verify the objective.

Create an alerting policy

**Check my progress**

## Task 6. Test the alerting policy

To test the alerting policy you just created, do the following:

1. In console, select **Navigation menu** &gt; **Compute Engine**.
    
2. In the **Connect** column, click **SSH** to open a terminal to your VM instance.
    
3. In the terminal, enter the following command:
    

```apache
timeout 120 bash -c -- 'while true; do curl localhost; sleep $((RANDOM % 4)) ; done'
```

The previous command generates traffic in your Apache Web Server.

After the traffic rate threshold value of 4 KiB/s is exceeded in your Apache Web Server, an email notification is sent. It might take several minutes for this process to complete.

The email notification you receive looks similar to the following:

![Notification Alert](https://cdn.qwiklabs.com/Oer%2B%2BfLuduvYPWMkBMXGt7llmvitw423GrOLQlDP600%3D align="left")

---

## Solution of Lab

%[https://youtu.be/9CJtp89CqRc] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Monitor%20an%20Apache%20Web%20Server%20using%20Ops%20Agent/gsp1108.sh
sudo chmod +x gsp1108.sh
./gsp1108.sh
```