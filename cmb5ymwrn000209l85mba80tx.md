---
title: "Cloud Armor Preconfigured WAF Rules - GSP879"
seoTitle: "Cloud Armor Preconfigured WAF Rules - GSP879"
seoDescription: "Google Cloud Armor is Google's enterprise edge network security solution providing DDOS protection, WAF rule enforcement, and adaptive manageability at scal"
datePublished: Tue May 27 2025 03:32:02 GMT+0000 (Coordinated Universal Time)
cuid: cmb5ymwrn000209l85mba80tx
slug: cloud-armor-preconfigured-waf-rules-gsp879
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748316300735/1a4b397f-c983-4623-857a-89890820bbc2.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1748316704605/bcdfbe6b-840c-4ac5-8444-9239df447c69.png
tags: cloud-armor, cloud-armor-preconfigured-waf-rules-gsp879, cloud-armor-preconfigured-waf-rules, gsp879

---

## Overview

Google Cloud Armor is Google's enterprise edge network security solution providing DDOS protection, WAF rule enforcement, and adaptive manageability at scale.

Cloud Armor has extended the preconfigured WAF rule sets to mitigate against the [OWASP Top 10](https://owasp.org/www-project-top-ten/) web application security vulnerabilities. The rule sets are based on the [OWASP Modsecurity core rule set](https://github.com/coreruleset/coreruleset/) version 3.0.2 to protect against some of the most common web application security risks including local file inclusion (lfi), remote file inclusion (rfi), remote code execution (rce), and many more.

In this lab, you learn how to mitigate some of the common vulnerabilities by using Google Cloud Armor WAF rules.

### What you'll learn

In this lab, you learn how to:

* Set up an Instance Group and a Global Load Balancer to support a service
    
* Configure Cloud Armor security policies with preconfigured WAF rules to protect against lfi, rce, scanners, protocol attacks, and session fixation
    
* Validate that Cloud Armor mitigated an attack by observing logs
    

![Cloud Armor WAF rules topology](https://cdn.qwiklabs.com/o0nzl9C1wJu%2BsjiNEXZ3Knl7hCB2cDCI%2BsYq56mGIGM%3D align="left")

The [OWASP Juice Shop application](https://owasp.org/www-project-juice-shop/) is useful for security training and awareness, because it contains instances of each of the OWASP Top 10 security vulnerabilities—by design. An attacker can exploit it for testing purposes. In this lab, you use it to demonstrate some application attacks followed by protecting the application with Cloud Armor WAF rules. The application is fronted by a Google Cloud Load Balancer, onto which the Cloud Armor security policy and rules are be applied. It is served on the public internet thus reachable from almost anywhere and protected using Cloud Armor and VPC firewall rules.

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
    student-02-2b5e7fe2cb51@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    EKwgJ3p6Gx41
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-479bec09cba8`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-479bec09cba8
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
ACCOUNT: student-02-2b5e7fe2cb51@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

**Output:**

```apache
[core]
project = qwiklabs-gcp-02-479bec09cba8
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Before you begin

* In Cloud Shell, set up your project ID:
    

```apache
gcloud config list project
export PROJECT_ID=$(gcloud config get-value project)
echo $PROJECT_ID
gcloud config set project $PROJECT_ID
```

## Task 1. Create the VPC network

* In Cloud Shell, enter the following command to create a VPC network:
    

```apache
gcloud compute networks create ca-lab-vpc --subnet-mode custom
```

```apache
Created
NAME        SUBNET_MODE  BGP_ROUTING_MODE
ca-lab-vpc  CUSTOM       REGIONAL
```

### Create a subnet

* In Cloud Shell, enter the following command to create a subnet:
    

```apache
gcloud compute networks subnets create ca-lab-subnet \
        --network ca-lab-vpc --range 10.0.0.0/24 --region us-east1
```

```apache
Created
NAME           REGION       NETWORK       RANGE
ca-lab-subnet us-east1  ca-lab-vpc    10.0.0.0/24
```

### Create VPC firewall rules

After creating the VPC and subnet, set up a few firewall rules.

* The first firewall rule named `allow-js-site` allows all IPs to access the external IP of the test application's website on port `3000`.
    
* The second firewall rule named `allow-health-check` allows health-checks from source IP of the load balancers.
    

1. In Cloud Shell, enter the following command to create a firewall rule to allow all IPs to access the application:
    

```apache
gcloud compute firewall-rules create allow-js-site --allow tcp:3000 --network ca-lab-vpc
```

Output:

```apache
Creating firewall...done.
NAME           NETWORK     DIRECTION  PRIORITY  ALLOW     DENY  DISABLED
allow-js-site ca-lab-vpc INGRESS    1000      tcp:3000        False
```

2. In Cloud Shell, enter the following command to create firewall rule to allow health-checks from the Google health-check ranges:
    

```apache
gcloud compute firewall-rules create allow-health-check \
    --network=ca-lab-vpc \
    --action=allow \
    --direction=ingress \
    --source-ranges=130.211.0.0/22,35.191.0.0/16 \
    --target-tags=allow-healthcheck \
    --rules=tcp
```

Output:

```apache
Creating firewall...done.
NAME                NETWORK     DIRECTION  PRIORITY  ALLOW  DENY  DISABLED
allow-health-check  ca-lab-vpc  INGRESS    1000      tcp          False
```

Click **Check my progress** to verify the objective.

Create the VPC network

**Check my progress**

## Task 2. Set up the test application

Create the test application, in this case, the OWASP Juice Shop web server. When you create the compute instance, you use a container image to ensure the server has the appropriate services. You deploy this server in the `us-east1-c` and has a network tag that allows health checks.

### Create the OWASP Juice Shop application

* Use the open source well-known OWASP Juice Shop application to serve as the vulnerable application. You can also use this application to do OWASP security challenges through the [OWASP website](https://owasp.org/www-project-juice-shop/).
    

```apache
gcloud compute instances create-with-container owasp-juice-shop-app --container-image bkimminich/juice-shop \
     --network ca-lab-vpc \
     --subnet ca-lab-subnet \
     --private-network-ip=10.0.0.3 \
     --machine-type n1-standard-2 \
     --zone us-east1-c \
     --tags allow-healthcheck
```

Output:

```apache
NAME                  ZONE           MACHINE_TYPE   PREEMPTIBLE  
owasp-juice-shop-app  us-east1-c  n1-standard-2               

INTERNAL_IP  EXTERNAL_IP     STATUS
10.0.0.3     <public ip="">     RUNNING
</public>
```

Click **Check my progress** to verify the objective.

Set up the test application

**Check my progress**

### Set up the Cloud load balancer component: instance group

1. In Cloud Shell, enter the following command to create the unmanaged instance group:
    

```apache
gcloud compute instance-groups unmanaged create juice-shop-group \
    --zone=us-east1-c
```

Output:

```apache
NAME        LOCATION       SCOPE  NETWORK  MANAGED  INSTANCES
juice-shop-group  us-east1-c  zone                     0
```

2. Add the Juice Shop Google Compute Engine (GCE) instance to the unmanaged instance group:
    

```apache
gcloud compute instance-groups unmanaged add-instances juice-shop-group \
    --zone=us-east1-c \
    --instances=owasp-juice-shop-app
```

Output:

```apache
Updated [https://www.googleapis.com/compute/v1/projects/<project name="">/zones/us-east1-c/instanceGroups/juice-shop-group].
</project>
```

3. Set the named port to that of the Juice Shop application:
    

```apache
gcloud compute instance-groups unmanaged set-named-ports \
juice-shop-group \
   --named-ports=http:3000 \
   --zone=us-east1-c
```

Output:

```apache
Updated [https://www.googleapis.com/compute/v1/projects/<project name="">/zones/us-east1-c/instanceGroups/juice-shop-group].
</project>
```

Click **Check my progress** to verify the objective.

Set up the Cloud load balancer component- instance group

**Check my progress**

### Set up the Cloud load balancer component: health check

Now that you've created the unmanaged instance group, create a health check, backend service, URL map, target proxy, and forwarding rule.

* In Cloud Shell, enter the following command to create the health-check for the Juice Shop service port:
    

```apache
gcloud compute health-checks create tcp tcp-port-3000 \
        --port 3000
```

Output:

```apache
Created
NAME           PROTOCOL
tcp-port-3000  TCP
```

### Set up the Cloud load balancer component: backend service

1. In Cloud Shell, enter the following command to create the backend service parameters:
    

```apache
gcloud compute backend-services create juice-shop-backend \
        --protocol HTTP \
        --port-name http \
        --health-checks tcp-port-3000 \
        --enable-logging \
        --global
```

Output:

```apache
NAME                BACKENDS  PROTOCOL
juice-shop-backend            HTTP
```

2. Add the Juice Shop instance group to the backend service:
    

```apache
 gcloud compute backend-services add-backend juice-shop-backend \
        --instance-group=juice-shop-group \
        --instance-group-zone=us-east1-c \
        --global
```

Output:

```apache
Updated [https://www.googleapis.com/compute/v1/projects/cythom-host1/global/backendServices/juice-shop-backend].
```

### Set up the Cloud load balancer component: URL map

* In Cloud Shell, enter the following command to create the URL map to send incoming requests to the backend:
    

```apache
gcloud compute url-maps create juice-shop-loadbalancer \
        --default-service juice-shop-backend
```

Output:

```apache
NAME                     DEFAULT_SERVICE
juice-shop-loadbalancer  backendServices/juice-shop-backend
```

### Set up the Cloud load balancer component: target proxy

* In Cloud Shell, enter the following command to create the Target Proxy to route incoming requests the URL map:
    

```apache
gcloud compute target-http-proxies create juice-shop-proxy \
        --url-map juice-shop-loadbalancer
```

Output:

```apache
NAME              URL_MAP
juice-shop-proxy  juice-shop-loadbalancer
```

### Set up the Cloud load balancer component: forwarding rule

* In Cloud Shell, enter the following command to create the forwarding rule for the Load Balancer:
    

```apache
gcloud compute forwarding-rules create juice-shop-rule \
        --global \
        --target-http-proxy=juice-shop-proxy \
        --ports=80
```

Output:

```apache
Created [https://www.googleapis.com/compute/v1/projects/cythom-host1/global/forwardingRules/juice-shop-rule].
```

### Verify the Juice Shop service is online

1. From Cloud Shell:
    

```apache
PUBLIC_SVC_IP="$(gcloud compute forwarding-rules describe juice-shop-rule  --global --format="value(IPAddress)")"
echo $PUBLIC_SVC_IP
```

Output:

```apache
<public VIP of service>
```

Wait a few minutes before continuing on, else you may retrieve a HTTP/1.1 404 Not Found response.

2. From Cloud Shell:
    

```apache
curl -Ii http://$PUBLIC_SVC_IP
```

Output:

```apache
HTTP/1.1 200 OK
<...>
```

You can also go to the browser to view the Juice Shop!

![The Welcome to OWASP Juice Shop page](https://cdn.qwiklabs.com/xMu5EUJ8kCR2UPq%2BZ84gkf9d9p5o7wpNOY1mgjU8ijU%3D align="left")

You're now ready to explore the Juice Shop vulnerabilities and protect against them with Cloud Armor WAF rule sets.

Click **Check my progress** to verify the objective.

Set up the Cloud load balancer component- health check

**Check my progress**

## Task 3. Demonstrate known vulnerabilities

In this lab, you demonstrate the states before and after Cloud Armor WAF rules are propagated in condensed steps.

### Observe an LFI vulnerability: path traversal

Local File Inclusion is the process of observing files present on the server by exploiting lack of input validation in the request to potentially expose sensitive data. The following shows a path traversal is possible. In your browser or with curl, observe an existing path served by the application.

1. From Cloud Shell:
    

```apache
curl -Ii http://$PUBLIC_SVC_IP/ftp
```

Output:

```apache
HTTP/1.1 200 OK
<...>
```

Observe that path traversal works too.

2. From Cloud Shell:
    

```apache
curl -Ii http://$PUBLIC_SVC_IP/ftp/../
```

Output:

```apache
HTTP/1.1 200 OK
<...>
```

### Observe an RCE vulnerability

Remote Code Execution includes various UNIX and Windows command injection scenarios allowing attackers to execute OS commands usually restricted to privileged users. The following shows a simple `ls` command execution passed in.

* From Cloud Shell:
    

```apache
curl -Ii http://$PUBLIC_SVC_IP/ftp?doc=/bin/ls
```

Output:

```apache
HTTP/1.1 200 OK
<...>
```

Remove the curl flags to observe the full output.

### Observe a well-known scanner's access

Both commercial and open source scan applications for various purposes, including to find vulnerabilities. These tools use well-known User-Agent and other Headers. Observe curl works with a well-known User-Agent Header.

* In Cloud Shell:
    

```apache
curl -Ii http://$PUBLIC_SVC_IP -H "User-Agent: blackwidow"
```

Output:

```apache
HTTP/1.1 200 OK
<...>
```

### Observe a protocol attack: HTTP splitting

Some web applications use input from the user to generate the headers in the responses. If the application doesn't properly filter the input, an attacker can potentially poison the input parameter with the sequence `%0d%0a` (the CRLF sequence that is used to separate different lines).

The response could then be interpreted as two responses by anything that happens to parse it, like an intermediary proxy server, potentially serving false content in subsequent requests. Insert the sequence `%0d%0a` into the input parameter, which can lead to serving a misleading page.

* From Cloud Shell:
    

```apache
curl -Ii "http://$PUBLIC_SVC_IP/index.html?foo=advanced%0d%0aContent-Length:%200%0d%0a%0d%0aHTTP/1.1%20200%20OK%0d%0aContent-Type:%20text/html%0d%0aContent-Length:%2035%0d%0a%0d%0a<html>Sorry,%20System%20Down</html>"
```

Output:

```apache
HTTP/1.1 200 OK
<...>
```

### Observe session fixation

* In Cloud Shell:
    

```apache
curl -Ii http://$PUBLIC_SVC_IP -H session_id=X
```

Output:

```apache
HTTP/1.1 200 OK
<...>
```

## Task 4. Define Cloud Armor WAF rules

1. List the preconfigured WAF rules, using the following command in Cloud Shell:
    

```apache
gcloud compute security-policies list-preconfigured-expression-sets
```

```apache
EXPRESSION_SET
Sqli-canary
RULE_ID
    owasp-crs-v030001-id942110-sqli
    owasp-crs-v030001-id942120-sqli
<...>
```

2. Create the Cloud Armor security policy using the following command in Cloud Shell:
    

```apache
gcloud compute security-policies create block-with-modsec-crs \
    --description "Block with OWASP ModSecurity CRS"
```

3. In Cloud Shell, update the security policy default rule.
    

**Note:** The default rule priority has a numerical value of 2147483647.

```apache
gcloud compute security-policies rules update 2147483647 \
    --security-policy block-with-modsec-crs \
    --action "deny-403"
```

4. Since the default rule is configured with action deny, you must allow access from your IP. Please find your public IP (curl, ipmonkey, whatismyip, etc):
    

```apache
MY_IP=$(curl ifconfig.me)
```

5. Add the first rule to allow access from your IP (INSERT YOUR IP BELOW):
    

```apache
gcloud compute security-policies rules create 10000 \
    --security-policy block-with-modsec-crs  \
    --description "allow traffic from my IP" \
    --src-ip-ranges "$MY_IP/32" \
    --action "allow"
```

6. In Cloud Shell, update the security policy to block LFI attacks.
    

Apply the OWASP ModSecurity Core Rule Set that prevents path traversal for local file inclusions.

```apache
gcloud compute security-policies rules create 9000 \
    --security-policy block-with-modsec-crs  \
    --description "block local file inclusion" \
     --expression "evaluatePreconfiguredExpr('lfi-stable')" \
    --action deny-403
```

7. In Cloud Shell, update the security policy to block Remote Code Execution (rce).
    

Per the OWASP ModSecurity Core Rule Set, apply rules that look for rce, including command injection. Typical OS commands are detected and blocked.

```apache
gcloud compute security-policies rules create 9001 \
    --security-policy block-with-modsec-crs  \
    --description "block rce attacks" \
     --expression "evaluatePreconfiguredExpr('rce-stable')" \
    --action deny-403
```

8. Update the security policy to block security scanners.
    

Apply the OWASP ModSecurity Core Rule Set to block well-known security scanners, scripting HTTP clients, and web crawlers.

```apache
gcloud compute security-policies rules create 9002 \
    --security-policy block-with-modsec-crs  \
    --description "block scanners" \
     --expression "evaluatePreconfiguredExpr('scannerdetection-stable')" \
    --action deny-403
```

9. In Cloud Shell, update the security policy to block protocol attacks.
    

Per the OWASP ModSecurity Core Rule Set, apply rules that look for Carriage Return (CR) `%0d` and Linefeed (LF)`%0a` characters and other types of protocol attacks like HTTP Request Smuggling.

```apache
gcloud compute security-policies rules create 9003 \
    --security-policy block-with-modsec-crs  \
    --description "block protocol attacks" \
     --expression "evaluatePreconfiguredExpr('protocolattack-stable')" \
    --action deny-403
```

10. Update the security policy to block session fixation.
    

Per the OWASP ModSecurity Core Rule Set, apply the following rules using Cloud Shell:

```apache
gcloud compute security-policies rules create 9004 \
    --security-policy block-with-modsec-crs \
    --description "block session fixation attacks" \
     --expression "evaluatePreconfiguredExpr('sessionfixation-stable')" \
    --action deny-403
```

11. Attach the security policy to the backend service:
    

```apache
gcloud compute backend-services update juice-shop-backend \
    --security-policy block-with-modsec-crs \
    --global
```

Rules may take some time to propagate (but not more than 10 mins).

12. Once sufficient time has passed, test the vulnerabilities previously demonstrated to confirm Cloud Armor WAF rule enforcement in the next step.
    

Click **Check my progress** to verify the objective.

Create the Cloud Armor security policy

**Check my progress**

### Observe Cloud Armor protection with OWASP ModSecurity Core Rule Set

1. In Cloud Shell, confirm the LFI vulnerability is mitigated:
    

```apache
curl -Ii http://$PUBLIC_SVC_IP/?a=../
```

Output:

```apache
HTTP/1.1 403 Forbidden
<...>
```

2. In Cloud Shell, confirm the RCE attack is mitigated:
    

```apache
curl -Ii http://$PUBLIC_SVC_IP/ftp?doc=/bin/ls
```

Output:

```apache
HTTP/1.1 403 Forbidden
<..>
```

3. In Cloud Shell, confirm well-known scanner detection.
    

```apache
curl -Ii http://$PUBLIC_SVC_IP -H "User-Agent: blackwidow"
```

Output:

```apache
HTTP/1.1 403 Forbidden
<..>
```

4. In Cloud Shell, confirm a protocol attack is mitigated.
    

Per the OWASP ModSecurity Core Rule Set ver.3.0.2, the protocol attack is mitigated by:

```apache
curl -Ii "http://$PUBLIC_SVC_IP/index.html?foo=advanced%0d%0aContent-Length:%200%0d%0a%0d%0aHTTP/1.1%20200%20OK%0d%0aContent-Type:%20text/html%0d%0aContent-Length:%2035%0d%0a%0d%0a<html>Sorry,%20System%20Down</html>"
```

Output:

```apache
HTTP/1.1 403 Forbidden
<..>
```

5. In Cloud Shell, confirm session fixation attempts are blocked:
    

```apache
curl -Ii http://$PUBLIC_SVC_IP/?session_id=a
```

Output:

```apache
HTTP/1.1 403 Forbidden
<..>
```

## Task 5. Review Cloud Armor Security rules

Now that you've created the security policy, look at what rules have been configured.

![Rules tabbed page, which lists several rules and their descriptions](https://cdn.qwiklabs.com/%2FGny3xzxEbID4ucNuzUG2jcI%2B6DdDxw29VEXQzMryTI%3D align="left")

Rules are evaluated by priority: lower numbers are evaluated first and once triggered, processing does not continue for rules with higher priority values.

* Priority `9000` - Block LFI (local file inclusion)
    
* Priority `9001` - Block RCE (remote code execution/command injection)
    
* Priority `9002` - Block Scanners Detected
    
* Priority `9003` - Block Protocol Attacks like HTTP splitting and HTTP smuggling
    
* Priority `9004` - Block Session Fixation Attacks
    
* Priority `10000` - Allow your IP to access the Website
    
* Priority `Default` - Deny.
    

**Note:** Notice the "allow your IP" rule is configured with the highest priority number to allow access to the site, however blocks any attack.

## Task 6. Observe Cloud Armor security policy logs

From the Cloud Armor console page, view details of the security policy and click the Logs tab followed by the View policy logs link to be directed to the Cloud Logging page. It automatically filters based on the security policy of interest, for example, resource.type:(http\_load\_balancer) AND jsonPayload.enforcedSecurityPolicy.name:`block-with-modsec-crs`. Observe the 403 error response codes and expand the log details to observe the enforced security policy's name, matched field value, and further down the preconfigured expression IDs (or the signature id).

It automatically filters based on the security policy of interest, for example, resource.type:(http\_load\_balancer) AND jsonPayload.enforcedSecurityPolicy.name:(`block-with-modsec-crs`).

* Observe the 403 error response codes and expand the log details to observe the enforced security policy's name, matched field value, and further down the preconfigured expression IDs (or the signature id).
    

The following screenshots show examples of the logs for the enforced security policies configured in this lab.

**LFI log**

**RCE log**

**Scanner detection log**

**Protocol attack log**

**Session fixation log**

---

## Solution of Lab

%[https://youtu.be/PUQTsZYJXlU] 

```apache
curl -LO https://github.com/ArcadeCrew/Google-Cloud-Labs/raw/refs/heads/main/Cloud%20Armor%20Preconfigured%20WAF%20Rules/arcadecrew.sh
sudo chmod +x arcadecrew.sh
./arcadecrew.sh
```