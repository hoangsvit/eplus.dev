---
title: "Deploy a Modern Web App connected to a Cloud Spanner Instance - GSP1051"
seoTitle: "Deploy a Modern Web App connected to a Cloud Spanner Instance - GSP105"
seoDescription: "Cloud Spanner is Google’s fully managed, horizontally scalable relational database service. Customers in financial services, gaming, retail and many other i"
datePublished: Wed May 21 2025 05:49:48 GMT+0000 (Coordinated Universal Time)
cuid: cmaxiwyvi001609l879g8gjd1
slug: deploy-a-modern-web-app-connected-to-a-cloud-spanner-instance-gsp1051
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747805868329/acf048c2-ee01-4dbf-a02b-2e45f418f862.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1747806560157/7897038e-e9b0-483d-bec8-dbee5f7aa156.png
tags: deploy-a-modern-web-app-connected-to-a-cloud-spanner-instance, gsp1051, cloud-spanner-instance

---

## Overview

Cloud Spanner is Google’s fully managed, horizontally scalable relational database service. Customers in financial services, gaming, retail and many other industries trust it to run their most demanding workloads, where consistency and availability at scale are critical.

In this lab, you build and deploy a Node.js application connected to a Cloud Spanner instance. The Node.js application is a stock price visualization tool named OmegaTrade. The OmegaTrade application stores stock prices in Cloud Spanner and renders visualizations using Google Charts.

The backend service uses the Node.js Express framework and connects to Cloud Spanner with default connection pooling, session, and timeout capabilities.

## What you'll do

* Configure the Project Environment
    
* Download and inspect the application code
    
* Deploy Backend application component
    
* Import sample stock trade data to the database
    
* Deploy Frontend application component
    
* Perform operations in the OmegaTrade Application
    

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
    student-03-71401aed0372@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    Wid5Qqyd0S9y
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-393726b91517`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-393726b91517
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
ACCOUNT: student-03-71401aed0372@qwiklabs.net

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
project = qwiklabs-gcp-02-393726b91517
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Cloud Spanner instance

In order to allow you to move more quickly through this lab the Cloud Spanner instance, database, and tables required for the OmegaTrade application were automatically created for you.

Here are some details for your reference:

| **Item** | **Name** | **Details** |
| --- | --- | --- |
| **Cloud Spanner Instance** | omegatrade-instance | This is the project-level instance |
| **Cloud Spanner Database** | omegatrade-db | This is the instance specific database |
| **Table** | Users | Contains user accounts |
| **Table** | Companies | Contains company name and stock symbol |
| **Table** | CompanyStocks | Contains stock values |
| **Table** | Simulations | Tracks the state of each simulation |

## Task 1. Enable required Google Cloud APIs

First enable the Google Cloud APIs for Cloud Spanner, Container Registry, and Cloud Run.

1. In the **Cloud Shell** enter the following commands:
    

```apache
gcloud services enable spanner.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable run.googleapis.com
```

## Task 2. Download and inspect the application code

1. Download the code repository for use in this lab. In the **Cloud Shell** enter the following:
    

```apache
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```

2. Navigate to the folder containing the application code.
    

```apache
cd training-data-analyst/courses/cloud-spanner/omegatrade/
```

3. The code is divided primarily into two parts, backend and frontend. The application architecture is depicted in the diagram below:
    

![AppArch.png](https://cdn.qwiklabs.com/jFtVYpdYi73XgMjsuJY6aZqFBDPOQE4ObAIT%2FiJK7lg%3D align="left")

4. The application relies on a deployment-specific file named **.env** to successfuly communicate with the Cloud Spanner instance. You will create this file in the next task.
    
5. With respect to the backend, some of the bindings and interactions with the Cloud Spanner tables are managed by Node.js models - three of these **company.model.js**, **simulation.model.js**, and **user.model.js** - reside in the **models** folder. Issue the following command to navigate to the models folder:
    

```apache
cd backend/app/models
```

6. Issue the following command to inspect the **company.model.js** file. This file contains database operations to interact with the **companies** table.
    

```apache
more company.model.js
```

Press the spacebar to advance through the file until its end. If you wish to close the file early, type **q** to close the **more** command.

7. Some of the frontend interactions with these models and other structures in the Node.js backend occur through Angular components located in the **components** folder. Issue the following command to navigate to the components folder:
    

```apache
cd ../../../frontend/src/app/components
```

8. For instance, the **company** component contains the base application code to manage and update company information.
    
9. Issue the following command to inspect the **manage-company.component.ts** TypeScript configuration file. This file contains methods for deleting or editing a company, among other actions.
    

```apache
more company/manage-company/manage-company.component.ts
```

Press the spacebar to advance through the file until its end. If you wish to close the file early, type **q** to close the **more** command.

## Task 3. Build and deploy the backend component

1. Navigate to the folder containing the code required to build and deploy the backend.
    

```apache
cd ../../../../backend
```

2. Create the **.env** file. As mentioned earlier, this file contains project specific infromation so that the application's backend component can communicate with the Cloud Spanner instance.
    

In the cloud shell enter the following command to invoke the **Nano** text editor and create a new **.env** file.

```apache
nano .env
```

Paste the code block listed below.

```apache
PROJECTID = qwiklabs-gcp-02-393726b91517
INSTANCE = omegatrade-instance
DATABASE = omegatrade-db
JWT_KEY = w54p3Y?4dj%8Xqa2jjVC84narhe5Pk
EXPIRE_IN = 30d
```

Press **Ctrl+X** to exit Nano, **Y** to confirm the update, and press **Enter** to save your changes.

3. Before you proceed further you must install updated components for **npm** so that the backend can be properly compiled. **npm** is a package manager for JavaScript. **npm** is the default package manager for the JavaScript runtime environment Node.js.
    

```apache
nvm install 22.6
```

```apache
npm install npm -g
npm install --loglevel=error
```

4. Next build the backend application using a reference dockerfile that exists in the repository folder.
    

```apache
docker build -t gcr.io/qwiklabs-gcp-02-393726b91517/omega-trade/backend:v1 -f dockerfile.prod .
```

**Note:** You may safely ignore any **npm notice...** messages that appear during the build process

5. Prior to pushing the new application package, run the following command to set configuration permissions in the Cloud Shell.
    

Enter '**y**' when prompted if you want to continue.

```apache
gcloud auth configure-docker
```

6. Push the newly created application package to the Container Repository for your Qwiklabs project.
    

```apache
docker push gcr.io/qwiklabs-gcp-02-393726b91517/omega-trade/backend:v1
```

7. Finally deploy the backend application using Cloud Run. Cloud Run is a serverless deployment framework which abstracts away infrastructure management and scales up or down automatically almost instantaneously depending on traffic.
    

```apache
gcloud run deploy omegatrade-backend --platform managed --region us-central1 --image gcr.io/qwiklabs-gcp-02-393726b91517/omega-trade/backend:v1 --memory 512Mi --allow-unauthenticated
```

8. Copy the URL provided at the end of the deployment. Preserve the URL in notepad, a text file, or other readily accessible location. This URL will be supplied to the frontend application to ensure the user interface can properly communicate with the Cloud Spanner database via the backend.
    

The backend Service URL will appear in the following format:

```apache
https://omegatrade-backend-zzzyyyxx1x-uw.a.run.app
```

## Task 4. Import sample stock trade data to the database

1. To import sample company and stock data, run the following command in the current (main backend) folder.
    

```apache
unset SPANNER_EMULATOR_HOST
node seed-data.js
```

2. You will receive confirmation that the tables were loaded succesfully.
    

```apache
Inserting Companies...
done
Inserting Simulations...
done
Inserting Stocks...
done
Data Loaded successfully
```

3. Click **Check my progress** to verify the objective.
    

Import sample stock trade data to the database

**Check my progress**

## Task 5. Build and deploy the frontend component

1. Navigate to the directory containing the frontend code. Specifically navigate to the environments folder to update the configuration file to point to your backend component.
    

```apache
cd ../frontend/src/environments
```

2. In the cloud shell enter the following command to invoke the **Nano** text editor and open the **environment.ts** file.
    

```apache
nano environment.ts
```

3. Carefully delete the string **http://localhost:3000** and replace it with your backend URL.
    

**Note:** Be certain to retain the **/api/v1/** portion of the URL

Press **Ctrl+X** to exit Nano, **Y** to confirm the update, and press **Enter** to save your changes.

Your updated **environment.ts** file should appear like the example below.

```apache
export const environment = {
  production: false,
  name: "dev",
  // change baseUrl according to backend URL
  baseUrl:"https://omegatrade-backend-zzzyyyxx1x-uw.a.run.app/api/v1/",
  // change clientId to actual value you have received from Oauth console
  clientId: ""
};
```

4. Navigate to the main frontend folder.
    

```apache
cd ../..
```

5. Install updated components for **npm** so that the frontend can be properly compiled.
    

```apache
npm install npm -g
npm install --loglevel=error
```

**Note:** You may safely ignore any **npm WARN config...** messages that appear during the installation process

6. Next build the frontend application using a reference dockerfile that exists in the repository folder. The frontend build may take 5 to 10 minutes to complete.
    

```apache
docker build -t gcr.io/qwiklabs-gcp-02-393726b91517/omegatrade/frontend:v1 -f dockerfile .
```

**Note:** You may safely ignore any **npm notice...** messages that appear during the build process

7. Push the newly created application package to the Container Repository for your Qwiklabs project.
    

```apache
docker push gcr.io/qwiklabs-gcp-02-393726b91517/omegatrade/frontend:v1
```

8. Finally deploy the frontend application using Cloud Run.
    

```apache
gcloud run deploy omegatrade-frontend --platform managed --region us-central1 --image gcr.io/qwiklabs-gcp-02-393726b91517/omegatrade/frontend:v1 --allow-unauthenticated
```

9. The frontend Service URL will appear in the following format. You may click the URL directly to open it or copy the URL and paste it into a new tab.
    

```apache
https://omegatrade-frontend-zzzyyyxx1x-uw.a.run.app
```

## Task 6. Perform operations in the OmegaTrade Application

1. On the application launch page click the **sign up** link.
    
2. Use the following details to create a new account for a fictitious company named **Spanner1**.
    

| **Item** | **Value** |
| --- | --- |
| **Business email** | admin@spanner1.com |
| **Full Name** | Spanner1 Admin |
| **Password** | Spanner1 |
| **Confirm your Password** | Spanner1 |

3. Your account will be created and you will be logged in.
    
4. To examine the OmegaTrade application, navigate to the **Dashboard** and choose **Foobar Inc** from the selector to see the stock performance chart for Foobar Inc. You will see a range of simulated stock prices over time for Foobar Inc.
    
5. Navigate to **Manage Company** and add **Spanner1** as a new company.
    
6. Click **Add Company** on the right side of the page. On the pop-up window, input the following values:
    

| **Item** | **Value** |
| --- | --- |
| **Company Name** | Spanner1 |
| **Short Code** | SPN |

Then click **Save**.

7. **Spanner1** is now in the list of companies.
    
8. Navigate to the **Dashboard** and select **Spanner1** if it is not already selected. You will see that no simulation exists for **Spanner1**. Click the link entitled **here** to generate a simiulation.
    
9. Under **Simulate Data**, provide the following details:
    

| **Item** | **Value** |
| --- | --- |
| **Select Company** | Spanner1 |
| **Select Interval** | 5 |
| **Number of Records** | 50 |

Then click **Simulate**.

10. Navigate to the **Dashboard** which will immediately update the chart for **Spanner1** as the simulation progresses. It will take between 3 and 6 minutes for the simulation to complete.
    
11. The OmegaTrade application also allows you to modify existing company information. On the **Manage Company** tab click the pencil icon under **Action** for **Acme Corp**.
    
12. Update the company name to **Coyote Inc**. Notice that the **Short Code** cannot be updated in the user interface. Click **Update** to close and accept the change.
    
13. The update to the company name is immediate. Navigate to the **Dashboard** and you will see that **Acme Corp** no longer appears and **Coyote Inc** has taken its place.
    
14. Occasionally data changes are required that exceed the capabilites of the application code. As an empowered user you have the ability to update data used in the OmegaTrade application by making direct changes in the Cloud Spanner database.
    
15. In the Cloud Console, click **Navigation menu () &gt; View All Products &gt; Databases &gt; Spanner**.
    
16. Accept any acknowledgement or information window that may appear.
    
17. Click on the **omegatrade-instance** name and then **omegatrade-db** under **Databases**. From the list of tables on the bottom of the page, click **companies**.
    
18. Click **Data** on the left side pane to see the table contents.
    
19. You will update the name of the **Bar Industries** entity.
    
20. Click on the **checkbox** for the **Bar Industries** row. Then click **Edit** from the choices listed above the table rows.
    
21. You are taken to the **Spanner Studio**. Click on **\+ New tab**. Enter the following query to update the value for **companyName** from **Bar Industries** to **Consolidated Enterprises Inc**.
    

```apache
UPDATE
  companies
SET
  companyName='Consolidated Enterprises Inc'
WHERE
  companyName='Bar Industries';
```

**Note:** In the Cloud Spanner query window you have the ability to change the **Short Code** value. The application code as designed does not allow this value to updated via the user interface.

22. Click **Run** to process the update.
    
23. Return to the application page, refresh your browser, and navigate to **Dashboard** tab. You will see that **Bar Industries** no longer appears and **Consolidated Enterprises Inc** has taken its place.
    

---

## Solution of Lab

### Quick

%[https://youtu.be/MyjJ6Y0Rez0] 

**Run the following Commands in CloudShell**

```apache
nvm install 22.6
```

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1051/lab.sh
sudo chmod +x lab.sh
./lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1747806692201/2d4fec2e-81a3-409a-8d88-20c7b9e3303f.png align="center")

---

### Manual

%[https://youtu.be/MyjJ6Y0Rez0]