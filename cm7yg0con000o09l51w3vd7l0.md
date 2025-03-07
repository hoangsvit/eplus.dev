---
title: "Securing Compute Engine Applications and Resources using Chrome Enterprise Premium - GSP1033"
seoTitle: "Securing Compute Engine Applications and Resources using Chrome Enterp"
seoDescription: "In this lab, you will learn how to secure Compute Engine workloads using Chrome Enterprise Premium's Identity Aware Proxy to restrict traffic based on ident"
datePublished: Fri Mar 07 2025 07:17:06 GMT+0000 (Coordinated Universal Time)
cuid: cm7yg0con000o09l51w3vd7l0
slug: securing-compute-engine-applications-and-resources-using-chrome-enterprise-premium-gsp1033
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741331656931/36cea969-1763-46fa-9365-40c17efc73f4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1741331810700/2d29389b-744f-4f91-9bfe-cde6d6390a3d.png
tags: securing-compute-engine-applications-and-resources-using-chrome-enterprise-premium-gsp1033, securing-compute-engine-applications-and-resources-using-chrome-enterprise-premium, gsp1033

---

## **Overview**

In this lab, you will learn how to secure Compute Engine workloads using Chrome Enterprise Premium's Identity Aware Proxy to restrict traffic based on identity.

The lab provisions a web based IDE that you will restrict access to via zero trust configuration.

## **What You’ll Do**

* Configure OAuth Consent.
    
* Set up OAuth access credentials.
    
* Set up IAP access for the deployed application.
    
* Restrict access to the application using Identity Aware Proxy (IAP).
    

## **Setup**

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
    student-04-3a11ddb4922a@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    G6ycIXNV4GcQ
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-609bd6dbcb9a`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-609bd6dbcb9a
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
ACCOUNT: student-04-3a11ddb4922a@qwiklabs.net

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
project = qwiklabs-gcp-01-609bd6dbcb9a
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1: Create a Compute Engine template**

1. In the Cloud Console, click **Navigation menu** () **Compute Engine** &gt; **Instance Templates**.
    
2. Click **Create an instance template**.
    
3. Use the default values except for the following:
    

**Machine configuration:**

* Series: E2
    
* Machine Type: e2-micro (2 vCPU, 1GB memory)
    

**Access scopes:**

* Set access for each API
    
* Compute Engine: Read Only
    

**Firewall:**

* Allow HTTP traffic
    
* Allow HTTPs traffic
    

4. Click **Advanced Options**.
    
5. Click **Management**.
    
6. In the **Automation &gt; Startup script** window, copy and paste the following script:
    

```apache
# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

apt-get -y update
apt-get -y install git
apt-get -y install virtualenv
git clone --depth 1 https://github.com/GoogleCloudPlatform/python-docs-samples
cd python-docs-samples/iap
virtualenv venv -p python3
source venv/bin/activate
pip install -r requirements.txt
cat example_gce_backend.py |
sed -e "s/YOUR_BACKEND_SERVICE_ID/$(gcloud compute backend-services describe my-backend-service --global--format="value(id)")/g" |
    sed -e "s/YOUR_PROJECT_ID/$(gcloud config get-value project | tr -cd "[0-9]")/g" > real_backend.py
gunicorn real_backend:app -b 0.0.0.0:80
```

7. When you're finished updating values, click **Create** to create the template.
    

## **Task 2: Create a Health Check**

1. In the Cloud Console, click **Navigation menu** () **Compute Engine** &gt; **Health Checks**.
    
2. Click the **Create Health Check** button.
    
3. On the **Create a Health Check** page, provide the following information in the form:
    

* Name: my-health-check
    
* Protocol: HTTP
    

Click **Create**.

## **Task 3: Create a Managed Instance Group**

1. Navigate to **Compute Engine** &gt; **Instance Groups**.
    
2. Click **Create instance group**.
    
3. Use the default values except for the following:
    

| **Field** | **Setting** |
| --- | --- |
| **Name** | my-managed-instance-group |
| **Instance template** | Select the instance template you created in Step 1 |
| **Location** | Multiple zones |
| **Region** | `us-east1` |
| **Number of instances** | To change the number of instances, you must first turn off autoscaling |
| **Autoscaling mode** | Off: Do not autoscale |
| **Autohealing** | Select the **Health Check** dropdown, then select the health check created in the previous section, `my-health-check` |

4. When you're finished updating values, click **Create** to create the Managed Instance Group (MIG).
    

## **Task 4: Get a domain name and certificate**

### Part 1 - Create a private key and certificate

If you already have a private key and a certificate from a certificate authority (CA), skip this section and go to [Creating an SSL certificate resource](https://cloud.google.com/load-balancing/docs/ssl-certificates/self-managed-certs#createresource). Otherwise, open **Cloud Shell** and perform the steps below.

#### **Select or create a private key**

A Google Cloud SSL certificate includes both a private key and the certificate itself, both in PEM format. Your private key must meet the following criteria:

* It must be in [PEM format](http://ospkibook.sourceforge.net/docs/OSPKI-2.4.7/OSPKI-html/sample-ca-cert.htm).
    
* It cannot be protected by a passphrase. Google Cloud stores your private key in its own encrypted format.
    
* Its encryption algorithm must be either RSA-2048 or ECDSA P-256.
    

You can create a new private key with RSA-2048 encryption in the PEM format using the following [OpenSSL](https://www.openssl.org/docs/) command.

```apache
openssl genrsa -out PRIVATE_KEY_FILE 2048
```

#### **Create a CSR**

After you have a private key, you can generate a certificate signing request (CSR) in the PEM format using [OpenSSL](https://www.openssl.org/source/). Your CSR must meet the following criteria:

* It must be in PEM format.
    
* It must have a common name (`CN`) or a subject alternative name (`SAN`) attribute. Practically speaking, your certificate should contain both `CN` and `SAN` attributes, even if it is for a single domain—modern clients, like the [current versions of macOS and iOS](https://support.apple.com/en-us/HT210176) don't rely on just the `CN` attribute.
    

1. Create an [OpenSSL configuration file](https://github.com/openssl/openssl/blob/master/apps/openssl.cnf). When you create an SSL config file, name the file **ssl\_config** and use the following configuration.
    

```apache
[req]
default_bits = 2048
req_extensions = extension_requirements
distinguished_name = dn_requirements
prompt = no

[extension_requirements]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment

[dn_requirements]
countryName = US
stateOrProvinceName = CA
localityName = Mountain View
0.organizationName = Cloud
organizationalUnitName = Example
commonName = Test
```

**HINT:** To create a file via console, type **vi FILE\_NAME** then it will open a vi editor to edit inside of it. Press **i** to change the text as you want. After that, press the **Esc** key to quit the editing mode. Press **:wq** to save and exit the vi editor.

2. Run the following OpenSSL command to create a certificate signing request (CSR) file.
    

```apache
openssl req -new -key PRIVATE_KEY_FILE \
 -out CSR_FILE \
 -config ssl_config
```

#### **Sign the CSR**

When a Certificate Authority (CA) signs your CSR, it uses its own private key to create a certificate.

**Using a publicly-trusted CA**

* If you request a publicly-trusted CA to sign your CSR, the resulting certificate is trusted by all clients that trust that public CA.
    
* To produce a signed certificate, the public CA only needs your CSR.
    

**Managing your own CA**

* If you manage your own CA, you can use it to sign your CSR. Using your CA to sign your CSR creates an internally-trusted certificate when your clients have also been configured to trust your own CA.
    

**Using a self-signed certificate**

* If you use the same private key that you used to create the CSR to sign the CSR, you create a self-signed certificate. Self-signed certificates are not trusted by any client unless the client is configured to skip certificate validation. For example, a web browser client displays a message asking you if you want to trust a self-signed certificate. You should only use self-signed certificates for testing.
    

If you manage your own CA, or if you want to create a self-signed certificate for testing, you can use the following OpenSSL command:

```apache
openssl x509 -req \
 -signkey PRIVATE_KEY_FILE \
 -in CSR_FILE \
 -out CERTIFICATE_FILE.pem \
 -extfile ssl_config \
 -extensions extension_requirements \
 -days 365
```

#### **Wildcards in common names**

Wildcards in common names Your self-managed SSL certificates can use a wildcard in the common name. For example, a certificate with the common name `*.example.com.` matches the hostnames `www.example.com` and `foo.example.com`, but not `a.b.example.com` or `example.com.` When the load balancer selects a certificate, it always prefers to match a hostname to certificates without wildcards over certificates with wildcards.

Certificates with wildcard fragments, such as `f*.example.com`, aren't supported.

### Part 2 - Create a self-managed SSL certificate resource

Before you can create a Google Cloud SSL certificate resource, you must have a private key and certificate. Refer to [Creating a private key and certificate](https://cloud.google.com/load-balancing/docs/ssl-certificates/self-managed-certs#create-key-and-cert) if you have not already created or obtained them.

To create a global SSL certificate, use the [`gcloud compute ssl-certificates create`](https://cloud.google.com/sdk/gcloud/reference/compute/ssl-certificates/create) command with the `--global` flag:

```apache
gcloud compute ssl-certificates create my-cert \
 --certificate=CERTIFICATE_FILE.pem \
 --private-key=PRIVATE_KEY_FILE \
 --global
```

## **Task 5: Create a load balancer**

1. In the Cloud Console, click **Navigation menu** () &gt; **View All Products** &gt; under Networking section click on **Network Services** then click **Create a Load Balancer**.
    
2. Select **Application Load Balancer (HTTP/HTTPS)** and **Next**.
    
3. Select **Public facing (external)** and **Next**.
    
4. Select **Best for global workloads** and **Next**.
    
5. Select **Global external Application Load Balancer** and **Next**.
    
6. Select **Configure**.
    
7. On the **Create global external Application Load Balancer** page that appears, enter name as **my-load-balancer** for your load balancer.
    
8. Click **Backend configuration**, then select **Backend services & backend buckets &gt; Create a backend service**.
    
9. On the **Create backend service** panel, in the **Name** box, enter `my-backend-service`.
    

**Caution:** You must use the exact **my-backend-service** name. If you use a different name, the startup script on your VMs won't be able to find the correct Backend Service ID to authenticate requests.

7. Under **New backend**, use the default values except for the following:
    
    * **Instance group**: my-managed-instance-group
        
    * **Port**: 80
        

**Note:** Uncheck **Enable Cloud CDN** under the **Cloud CDN** section before proceeding.

8. Under **Health check**, select **my-health-check**.
    
9. When you're finished updating values, click **Create**. The **Create global external Application Load Balancer** panel reappears.
    
10. Click **Routing rules** to load the default values. You don't need to add any rules.
    
11. Click **Frontend configuration**. Use the default values except for the following:
    
    * **Protocol**: HTTPS (includes HTTP/2 and HTTP/3)
        
    * **IP address**: click **Create IP address**
        
        * Enter a **Name** to associate with your new static IP address.
            
        * Click **Reserve** to reserve the static IP address.
            
    * **Certificate**: my-cert
        
12. When you're finished entering frontend configuration values, click **Done**. The **Create global external Application Load Balancer** panel reappears.
    
13. Under **Create global external Application Load Balancer**, click **Create**. The **Load balancing** page appears and your new load balancer will be created in the list of load balancers.
    
14. After the Cloud Console finishes creating the new load balancer, click the name of the load balancer and note the external IP address under **Details &gt; Frontend**. You will need it in the next step.
    

### Restart your VMs

To correctly authenticate requests from IAP, you must restart the VMs in your MIG by following the steps below:

1. In the Cloud Console, click **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; [Compute Engine &gt; Instance groups page](https://console.cloud.google.com/compute/instanceGroups/list?_ga=2.126467085.1617079303.1650346554-1715893018.1650346554).
    
2. Click **my-managed-instance-group**.
    
3. On the top of the instance group details that appear, click **Restart/Replace VMs**.
    
4. On the **Restart/replace VMs in my-managed-instance-group** page that appears, set the following values:
    
    * **Operation**: Restart
        
    * **Maximum unavailable instances**: 3 instances
        
    * **Minimum wait time**: 0 s
        
5. When you're finished updating values, click **Restart VMs**.
    

**Note:** VM instance may take **10-15** min to configure successfully.

## **Task 6: Set up IAP**

### Configure your firewall

Next, you'll configure your firewall to block access to the underlying VMs and only allow access through IAP:

1. In the console to to **VPC network &gt; Firewall rules**.
    
2. Select the checkbox next to `default-allow-internal`.
    
3. Click **Delete** and select delete again to confirm it.
    
4. Click **Create firewall rule** and set the following values:
    
    * **Name**: allow-iap-traffic
        
    * **Targets**: All instances in the network
        
    * **Source IPv4 ranges** (press Enter after you paste each value in the box):
        
        * 130.211.0.0/22
            
        * 35.191.0.0/16
            
    * **Protocols and ports:**
        
        * Specified protocols and ports
            
        * select tcp and enter `80, 78`
            
5. When you're finished updating values, click **Create**.
    

### Set up IAP

To set up IAP for your project, follow the steps below:

1. In the Cloud Console, click **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **View All Products** &gt; under Security section click on **Security &gt; Identity-Aware Proxy** and select the project for which you want to enable IAP.
    
2. Click **Enable API**.
    
3. If you haven't configured your project's OAuth consent screen, you'll be prompted to do so:
    

**Caution**: Don't enter any confidential information on the OAuth consent screen. Any information you save to the OAuth consent screen may be publicly visible for anyone who accesses your URL. Email and product details are displayed on the login screen and when someone tries to access a resource for which they don't have permission.

a. Go to the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent?_ga=2.103865344.1617079303.1650346554-1715893018.1650346554) and select **External** as **User Type**. Click **Create**.

b. Enter the **Application name** you want to display.

c. Under **User Support email**, select the email address you want to display as a public contact. The email address must belong to the currently logged in user account or to a Google Group of which the currently logged in user belongs.

d. Enter the same email address in the **Developer contact information**.

e. Add any optional details.

f. Click **Save and Continue** three times and select **Back to Dashboard**.

To change information on the OAuth consent screen later, such as the product name or email address, repeat the preceding steps to configure the consent screen.

4. [GO TO THE IDENTITY-AWARE PROXY PAGE](https://console.cloud.google.com/security/iap/?_ga=2.61927724.1617079303.1650346554-1715893018.1650346554) and select a project. Click **Go to Identity-Aware Proxy**.
    
5. Next to **my-backend-service**, toggle the on/off switch in the **IAP** column.
    
6. In the **Turn on IAP** window that appears, select the checkbox next to "I have read the configuration requirements and configured my Compute Engine resource according to documentation."
    
7. Click **Turn on**.
    

If you see an error, click on the Error. If you are then prompted to add a firewall rule. Edit the rule you created previously to include the port number mentioned in the error.

![IAP Error](https://cdn.qwiklabs.com/CnuKGBfAR0ciG6Y8%2FIiBtIqq4%2F9VIZULJ4OPfkugcXI%3D align="left")

Confirm OAuth Consent has been setup

Check my progress

### Add principals to the access list

Next, add principals to the IAP access list for your project.

1. In the Cloud Console, click **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **IAM & admin &gt; Identity-Aware Proxy** and select the **my-backend-service** checkbox. Click **Add Principal**.
    
2. Enter the following to grant access to yourself.
    

* **New Principals**: Enter your qwiklabs account email here
    
* **Role**: IAP-secured Web App User
    

3. Click **Save**.
    

Confirm principal to access the application by configuring IAM

Check my progress

## **Task 7: Test IAP**

* In the Cloud Console, click **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **View All Products** &gt; under Networking section click on **Network Services &gt; Load balancing** page and select **Frontends**.
    
* Select the Forwarding rule — you should see information like the following:
    

![load balancer information!](https://cdn.qwiklabs.com/7Hz8z6CJfv1kwytzSUjHjkDA6KoLNUVMN4TkhS4%2Fhkk%3D align="left")

* Run the following curl command to hit the external IP address. You may need to wait a few minutes before the expected IAP header pictured in the figure below appears as expected with the redirect location parameter.
    

```apache
curl -kvi https://Enter the ip from your load balancer here
```

You will see an IAP generated response that is `true` — this means you have successfully configured IAP for your GCE instance.

![successfully configured message!](https://cdn.qwiklabs.com/%2B8BGFlQ0poDBDVFYybNtKLNKeZ750MBulj7A62K8szE%3D align="left")

This should show the 302 redirection to accounts.google.com if you click on the `External IP address` link.

If you follow the URL, you should see a page similar to the following:

![successfully configured message!](https://cdn.qwiklabs.com/%2Fk6O4TB5nHs5ZbW15%2Bt8U2DkUQUAYmLGGMpUVekbuTw%3D align="left")

Because you used a self-signed cert, you won’t be able to access the application itself. However, this confirms that IAP is configured and is protecting traffic.

Confirm restrict access with IAP

---

## Solution of Lab

%[https://www.youtube.com/watch?v=2gu-ouGhjow] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Securing%20Compute%20Engine%20Applications%20and%20Resources%20using%20Chrome%20Enterprise%20Premium/gsp1033.sh
sudo chmod +x gsp1033.sh
./gsp1033.sh
```