---
title: "Implementing Least Privilege IAM Policy Bindings in Cloud Run [APPRUN]"
seoTitle: "Implementing Least Privilege IAM Policy Bindings in Cloud Run [APPRUN]"
seoDescription: "The principle of least privilege states that a resource should only have access to the exact set of resources it needs in order to function. For example, if"
datePublished: Thu Aug 15 2024 07:23:36 GMT+0000 (Coordinated Universal Time)
cuid: clzuyexrm000g0al0bm45g2ml
slug: implementing-least-privilege-iam-policy-bindings-in-cloud-run-apprun
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723706267985/b6d898c5-76e3-4f89-ad80-0101eabbb007.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723706601833/94454c57-758d-412e-a934-ba016781934f.png
tags: implementing-least-privilege-iam-policy-bindings-in-cloud-run-apprun

---

## **Overview**

The principle of least privilege states that a resource should only have access to the exact set of resources it needs in order to function. For example, if a service is performing an automated database backup, the service should be restricted to read-only permissions on exactly one database. Similarly, if a service is only responsible for encrypting data, it should not have permissions for decrypting data.

In Cloud Run, if a service is deployed without specifying a service account, a default service account is used. The default service account used is the Compute Engine service account which has the broad Editor role on the project. Because of policy binding inheritance, this service account has read and write permissions on most resources in your project. While convenient, it's an inherent security risk as resources can be created, modified, or deleted with this service account.

To mitigate this risk and implement the principle of least privilege, you should create a service account that serves as the service's identity, and grant the minimum set of permissions to the account that are required for the service's functionality.

### Objectives

In this lab, you learn to:

* Configure your environment and enable the Cloud Run API.
    
* Create and deploy a public Cloud Run service.
    
* Test the service with unauthenticated requests.
    
* Create a service account with minimum permissions.
    
* Use the gcloud CLI to authenticate with the service account, and invoke a Cloud Run service.
    
* Implement least privilege by granting the minimum set of permissions required to invoke a service on Cloud Run.
    

### Prerequisites

These labs are based on intermediate knowledge of Google Cloud. While the steps required are covered in the content, it would be helpful to have familiarity with any of the following products:

* IAM
    
* Cloud Run
    

## **Setup and requirements**

#### **Before you click the Start Lab button**

**Note: Read these instructions.**

Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This Qwiklabs hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

#### **What you need**

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    
* Time to complete the lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab.

**Note:** If you are using a Pixelbook, open an Incognito window to run this lab.

#### **How to start your lab and sign in to the Console**

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is a panel populated with the temporary credentials that you must use for this lab.
    
    ![Credentials panel](https://cdn.qwiklabs.com/%2FtHp4GI5VSDyTtdqi3qDFtevuY014F88%2BFow%2FadnRgE%3D align="left")
    
2. Copy the username, and then click **Open Google Console**. The lab spins up resources, and then opens another tab that shows the **Choose an account** page.
    
    **Note:** Open the tabs in separate windows, side-by-side.
    
3. On the Choose an account page, click **Use Another Account**. The Sign in page opens.
    
    ![Choose an account dialog box with Use Another Account option highlighted ](https://cdn.qwiklabs.com/eQ6xPnPn13GjiJP3RWlHWwiMjhooHxTNvzfg1AL2WPw%3D align="left")
    
4. Paste the username that you copied from the Connection Details panel. Then copy and paste the password.
    

**Note:** You must use the credentials from the Connection Details panel. Do not use your Google Cloud Skills Boost credentials. If you have your own Google Cloud account, do not use it for this lab (avoids incurring charges).

5. Click through the subsequent pages:
    

* Accept the terms and conditions.
    
* Do not add recovery options or two-factor authentication (because this is a temporary account).
    
* Do not sign up for free trials.
    

After a few moments, the Cloud console opens in this tab.

**Note:** You can view the menu with a list of Google Cloud Products and Services by clicking the **Navigation menu** at the top-left.

![Cloud Console Menu](https://cdn.qwiklabs.com/9vT7xPlxoNP%2FPsK0J8j0ZPFB4HnnpaIJVCDByaBrSHg%3D align="left")

### Activate Google Cloud Shell

Google Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud.

Google Cloud Shell provides command-line access to your Google Cloud resources.

1. In Cloud console, on the top right toolbar, click the Open Cloud Shell button.
    
    ![Highlighted Cloud Shell icon](https://cdn.qwiklabs.com/WGBFVIap4CrFWut%2BGdNFzNxeelWYHF1IqYSMFH6Ouq4%3D align="left")
    
2. Click **Continue**.
    

It takes a few moments to provision and connect to the environment. When you are connected, you are already authenticated, and the project is set to your *PROJECT\_ID*. For example:

![Project ID highlighted in the Cloud Shell Terminal](https://cdn.qwiklabs.com/hmMK0W41Txk%2B20bQyuDP9g60vCdBajIS%2B52iI2f4bYk%3D align="left")

**gcloud** is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

* You can list the active account name with this command:
    

```bash
gcloud auth list
```

**Output:**

```bash
Credentialed accounts:
 - @.com (active)
```

**Example output:**

```bash
Credentialed accounts:
 - google1623327_student@qwiklabs.net
```

* You can list the project ID with this command:
    

```bash
gcloud config list project
```

**Output:**

```bash
[core]
project = 
```

**Example output:**

```bash
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** Full documentation of **gcloud** is available in the [gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud) .

## **Task 1. Configure the environment**

Set up environment variables in Cloud Shell to make the provisioning process more flexible.

1. Enable Cloud Run API:
    
    ```bash
     gcloud services enable run.googleapis.com
    ```
    
2. Create a LOCATION environment variable:
    
    ```bash
     LOCATION=us-west1
    ```
    
3. Set the default Cloud Run region:
    
    ```bash
    gcloud config set run/region $LOCATION
    ```
    

## **Task 2. Create and deploy a public service**

### Requirements

Quickway parking has a Cloud Run billing service that they would like to be made more secure. In this task, you:

* Deploy the *billing service* from an image.
    
* Test the service by invoking it without any authentication.
    

### Deploying with Cloud Run

The Quickway development team already has an image of the billing application available on Google Cloud.

1. Deploy the billing application image to Cloud Run:
    
    ```bash
     gcloud run deploy billing-service \
      --image gcr.io/qwiklabs-resources/gsp723-parking-service \
      --region $LOCATION \
      --allow-unauthenticated
    ```
    
2. Assign the URL of the new service to an environment variable:
    
    ```bash
     BILLING_SERVICE_URL=$(gcloud run services list \
      --format='value(URL)' \
      --filter="billing-service")
    ```
    
3. Invoke the service without any authorization:
    
    ```bash
    curl -X POST -H "Content-Type: application/json" $BILLING_SERVICE_URL -d '{"userid": "1234", "minBalance": 100}'
    ```
    
    The service does not generate any output when invoked.
    
4. In the Google Cloud console **Navigation menu** (), click **Cloud Run**.
    
5. Click the link to the *billing-service*.
    
6. To view the service logs, click **Logs**.
    
7. Add the log filter `minBalance` to view the minimum balance received in the request made to the service.
    
8. To go back to the service details page, click **&lt;- Service details**.
    
9. Select the *billing-service* by checking the box to the left of the green check mark.
    
    ![The Cloud Run page, which includes the selected billing service.](https://cdn.qwiklabs.com/E1mHmPWtdehw3G84PlNdmLh6J9A7roFm47SqdQzDN2o%3D align="left")
    
    The Security team has spotted something in the security settings. Can you see what part of the above configuration has them so concerned?
    
    Take a closer look at the authentication applied. Currently **anyone on the internet** can call the billing service. This is indicated by the *allUsers* identity that has the *Cloud Run Invoker* role.
    
    ![The Quickway Parking diagram, where the billing service is publicly accessible.](https://cdn.qwiklabs.com/CNkReuIBTgGVaKD%2BM122xGsS2YV3%2FqgqI0HIXC1D0lI%3D align="left")
    
    When the Billing service was originally deployed, it used the `--allow-unauthenticated` permission, which means that the service is publicly accessible, and can be invoked without any authentication.
    
    | **Type** | **Permission** | **Description** |
    | --- | --- | --- |
    | URL Access | `--allow-unauthenticated` | Make the service publicly accessible (Unauthenticated users can access it). |
    | Invoking Principal | allUsers | Allow the service to be invoked/triggered by anyone. |
    
    By removing the `--allow-unauthenticated` permission you can use the Cloud Run default permissions to secure the service, or you can explicitly specify the `no-allow-unauthenticated` permission.
    
    | **Type** | **Permission** | **Description** |
    | --- | --- | --- |
    | URL Access | `--no-allow-unauthenticated` | Secure the service with authentication (Only authenticated users can access it). |
    | Invoking Principal | none | Do not allow the service to be invoked/triggered by anyone. |
    
    **Note:** Remember, with Google Cloud, always try to use least privilege permissions in your solution.
    

By making these changes, the Security team will be a lot happier with the overall design.

Click **Check my progress** to verify your performed task.

Assessment Completed!

Deploy a public Cloud Run Service

**Check my progress**

*Assessment Completed!*

## **Task 3. Authenticating service requests**

The team updates the application design to show how the changes will work:

![The Quickway Parking diagram, where the billing service requires authentication.](https://cdn.qwiklabs.com/FFuMJaAdBZYxJiHlSGiyV71yhYvDOeIMtXO5DIRcNG0%3D align="left")

The main changes are:

* Remove unauthenticated public access to the *billing service*.
    
* Create a new service account with appropriate permissions to invoke the *billing service*.
    

### Update the service to require authentication

Now that you understand more about the permissions used with Cloud Run, correct the authentication permissions applied to the Billing service:

1. Delete the existing deployed service:
    
    ```apache
     gcloud run services delete billing-service
    ```
    
2. If prompted, type **Y**, and then press **Enter**.
    
3. Redeploy the *billing service* with the `--no-allow-authenticated` permission:
    
    ```bash
     gcloud run deploy billing-service \
      --image gcr.io/qwiklabs-resources/gsp723-parking-service \
      --region $LOCATION \
      --no-allow-unauthenticated
    ```
    
    Redeploying the service means it no longer allows unauthenticated access at its service URL. In addition, the access permission to invoke the service has been removed.
    
4. Wait a few seconds, and then invoke the *billing service* again as before:
    
    ```bash
     curl -X POST -H "Content-Type: application/json" $BILLING_SERVICE_URL -d '{"userid": "1234", "minBalance": 100}'
    ```
    
    As expected, the output is a permissions error since the service now requires authentication.
    

### Create a service account

To invoke the *billing service* you will need an identity or service account with appropriate permissions, and bind that identity to the service.

This can be done in the Google Cloud console, or with the gcloud command line interface. In this lab, you use the Google Cloud console to create the service account and set up the new policy binding for the *billing service*.

1. In the Google Cloud console **Navigation menu** (), select **IAM & Admin &gt; Service Accounts**.
    
2. To create a new service account that will provide authenticated access, click **Create Service Account** near the top.
    
3. Name the service account: `Billing Initiator`.
    
    ![Create service account page with the Create and Continue button highlighted.](https://cdn.qwiklabs.com/H9WyETS1ZQA9qwv%2BMta%2BVQxIGpAVtjRBUEDaQUXRr1w%3D align="left")
    
4. To create the account, click **Create and Continue**, and then advance to the **Grant Access** step.
    
5. To give the *Billing Initiator* service account permissions to invoke the *billing service*, select the **Role** drop-down, scroll the left side to `Cloud Run`, and then select the role `Cloud Run Invoker`.
    
    ![The highlighted Continue button.](https://cdn.qwiklabs.com/koQMb92sLAUXb76iEgTatqj4NpasL42wmusDbZgIHrY%3D align="left")
    
6. To complete the setup of the service account, click **Continue**, and then click **Done**.
    
    You will see the new service account at the top of the list of service accounts in the console.
    
    ![The newly created service account listed, along with its status and description.](https://cdn.qwiklabs.com/ltbePSje1utu%2BOOWiwR6qPA%2FKd0zUfp0mULpbrC9X%2Bs%3D align="left")
    

The service account **Billing Initiator** has been created with the authorization to invoke a Cloud Run service, using an IAM policy binding on your project.

Click **Check my progress** to verify your performed task.

Create a service account

**Check my progress**

## **Task 4. Invoke the service with authentication**

Now that you have a service account with the appropriate permission, you can use it to invoke your Cloud Run service.

### Authenticate with gcloud

The first step is to set the service account in gcloud so it can be used to authenticate with the service.

1. In the Cloud Shell terminal menu, open a new shell in a separate tab by clicking **Add** ().
    
    Execute the remaining commands of this task in this Cloud Shell window.
    
2. Get the service account identity email and save it in an environment variable:
    
    ```bash
     BILLING_INITIATOR_EMAIL=$(gcloud iam service-accounts list --filter="Billing Initiator" --format="value(EMAIL)"); echo $BILLING_INITIATOR_EMAIL
    ```
    
3. In this Cloud Shell terminal, assign the URL of the *billing service* to an environment variable:
    
    ```bash
     BILLING_SERVICE_URL=$(gcloud run services list \
      --format='value(URL)' \
      --filter="billing-service")
    ```
    
4. To authenticate gcloud using the service account, generate a key file:
    
    ```bash
    gcloud iam service-accounts keys create key.json --iam-account=${BILLING_INITIATOR_EMAIL}
    ```
    
5. Authorize access to Cloud Run with a service account:
    
    ```bash
    gcloud auth activate-service-account --key-file=key.json
    ```
    

### Invoke the service

1. Invoke the Cloud Run *billing service* with an identity token generated from the service account:
    
    ```bash
     curl -X POST -H "Content-Type: application/json" \
      -H "Authorization: Bearer $(gcloud auth print-identity-token)" \
      $BILLING_SERVICE_URL -d '{"userid": "1234", "minBalance": 500}'
    ```
    
2. In the Google Cloud console **Navigation menu** (), click **Cloud Run**.
    
3. Click the link to the *billing-service*.
    
4. To view the service logs, click **Logs**.
    
5. Add the log filter `minBalance` to view the updated minimum balance received in the request made to the service.
    

Click **Check my progress** to verify your performed task.

Invoke a Cloud Run service with authentication

**Check my progress**

## **Task 5. Implement least privilege**

You've used a service account with the appropriate permissions to invoke a Cloud Run service that was previously accessible by anyone. But, have you used the absolute minimum privileges needed to call this specific service?

To determine if this is true, deploy a second billing service which we will assume should be accessible only by other internal private services, such as Cloud Scheduler.

Here's a diagram of this requirement:

![Requirement diagram showing access to a second internal billing service.](https://cdn.qwiklabs.com/XjqZiYDWe1PDhnQSuHLLLQgH7DLK%2BR5ZWXX381c34Lk%3D align="left")

### Deploy a second service

1. Open a third Cloud Shell terminal window or tab.
    
2. Create a LOCATION environment variable:
    
    ```bash
     LOCATION=us-west1
    ```
    
3. To simulate a second service, deploy the billing application image to Cloud Run:
    
    ```bash
     gcloud run deploy billing-service-2 \
      --image gcr.io/qwiklabs-resources/gsp723-parking-service \
      --region $LOCATION \
      --no-allow-unauthenticated
    ```
    
4. Assign the URL of the new service to an environment variable:
    
    ```bash
     BILLING_SERVICE_2_URL=$(gcloud run services list \
      --format='value(URL)' \
      --filter="billing-service-2")
    ```
    

### Invoke the second service with the service account identity

1. In this third Cloud Shell terminal, authorize access to Cloud Run with the same service account:
    
    ```bash
    gcloud auth activate-service-account --key-file=key.json
    ```
    
2. Invoke the second Cloud Run service with an identity token generated from the service account:
    
    ```bash
     curl -X POST -H "Content-Type: application/json" \
      -H "Authorization: Bearer $(gcloud auth print-identity-token)" \
      $BILLING_SERVICE_2_URL -d '{"userid": "1234", "minBalance": 900}'
    ```
    

Why was this successful!? It's because when you created the service account, the Cloud Run Invoker permissions were granted to this account on the project. Because of inheritance, resources in the project such as the two Cloud Run services inherit those permissions, and as a result, the service account can be used to invoke the services.

### Restrict service account permissions

To fully implement least privilege, the service account should only be granted permissions on the service that it needs.

In this subtask, you remove the permission previously granted to the service account on the project, and then add the appropriate permissions required to invoke the original billing service.

1. Switch to the first Cloud Shell terminal window.
    
2. In this Cloud Shell terminal, get the service account identity email and save it in an environment variable:
    
    ```bash
     BILLING_INITIATOR_EMAIL=$(gcloud iam service-accounts list --filter="Billing Initiator" --format="value(EMAIL)"); echo $BILLING_INITIATOR_EMAIL
    ```
    
3. Remove the permission on the service account for the project:
    
    ```bash
    gcloud projects remove-iam-policy-binding $GOOGLE_CLOUD_PROJECT \
      --member=serviceAccount:${BILLING_INITIATOR_EMAIL} \
      --role=roles/run.invoker
    ```
    
4. Add the permission to the service account on the *billing service*:
    
    ```bash
    gcloud run services add-iam-policy-binding billing-service --region $LOCATION \
      --member=serviceAccount:${BILLING_INITIATOR_EMAIL} \
      --role=roles/run.invoker --platform managed
    ```
    

### Invoke the services

1. Switch back to the second Cloud Shell terminal window or tab.
    
2. Wait a few seconds, and then invoke the first Cloud Run *billing service* with an identity token generated from the service account:
    
    ```bash
     curl -X POST -H "Content-Type: application/json" \
      -H "Authorization: Bearer $(gcloud auth print-identity-token)" \
      $BILLING_SERVICE_URL -d '{"userid": "1234", "minBalance": 700}'
    ```
    

It takes a few seconds for the updated permissions to propagate, after which this invocation should be successful.

1. Switch to the third Cloud Shell terminal window.
    
2. Try to invoke the second Cloud Run service with an identity token generated from the same service account:
    
    ```bash
     curl -X POST -H "Content-Type: application/json" \
      -H "Authorization: Bearer $(gcloud auth print-identity-token)" \
      $BILLING_SERVICE_2_URL -d '{"userid": "1234", "minBalance": 500}'
    ```
    
    You should now receive a permissions error indicating that the service account has only the minimum set of permissions required to invoke the first service.
    

Click **Check my progress** to verify your performed task.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=Eyh86YFXIo0] 

```apache
export REGION=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723706320027/111dc447-c9cb-43c8-b961-eff0cef2293e.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Implementing%20Least%20Privilege%20IAM%20Policy%20Bindings%20in%20Cloud%20Run%20%5BAPPRUN%5D/shell.sh
sudo chmod +x shell.sh
./shell.sh
```