---
title: "App Dev: Adding User Authentication to your Application - Python - GSP186"
seoTitle: "User Authentication in Python Apps - GSP186"
seoDescription: "Learn to add user authentication to your Python application using Google Cloud's Identity Platform in this comprehensive hands-on lab"
datePublished: Sun Aug 10 2025 06:45:12 GMT+0000 (Coordinated Universal Time)
cuid: cme5bk7hl000102jy1kmmghx9
slug: app-dev-adding-user-authentication-to-your-application-python-gsp186
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754807175672/0d86337a-4ddf-446b-8f4f-584607d1f1dc.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1754808287071/5a278e8a-5af5-4112-b4be-a28c607c0b46.png
tags: python, app-dev-adding-user-authentication-to-your-application-python-gsp186, app-dev-adding-user-authentication-to-your-application, gsp186

---

## Overview

This lab shows how to add authentication to your application using Identity Platform. This authorization identifies who you are, and determines what you can do. For more information, see [Authentication Overview](https://cloud.google.com/docs/authentication/).

Identity Platform provides a drop-in, customizable authentication service for user sign-up and sign-in. Development and admin activities are made easier with a range of app SDKs (Android, iOS, and web) as well as admin SDKs (Node.js, Java, Python, and more). For more information about Identity Platform, see [Identity Platform](https://cloud.google.com/identity-platform).

The application used in this lab is an online Quiz application. You add Identity Platform authentication, and then configure authentication to use a simple email address and password credential. Finally you ensure that users must register and log in before taking a quiz.

### What you'll learn

In this lab, you perform the following tasks:

* Add Identity Platform configuration to a client-side web application
    
* Write Python code to integrate Identity Platform Authentication into a client-side web application
    

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
    student-02-4e146ead5b85@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    6Q403J9JWorM
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-2c9f4f6acd08`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-2c9f4f6acd08
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
ACCOUNT: student-02-4e146ead5b85@qwiklabs.net

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
project = qwiklabs-gcp-02-2c9f4f6acd08
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Launch the Cloud Shell code editor

From Cloud Shell toolbar, move Cloud Shell to a new window by clicking the **Open in new window** icon , then click **Open Editor** icon to launch the code editor.

In the Cloud Shell terminal, run the following command to configure your Project ID, replacing `<YOUR-PROJECT-ID>` with your lab Project ID:

```apache
gcloud config set project <YOUR-PROJECT-ID>
```

**Authorize** Cloud Shell.

## Task 1. Prepare the case study application

In this task, you clone, configure, and run the Quiz application.

### Clone source code in Cloud Shell

1. Clone the application skeleton from a repository on GitHub.com:
    
    ```apache
    git clone https://github.com/GoogleCloudPlatform/training-data-analyst
    ```
    
2. Create a soft link as a shortcut to the working directory:
    
    ```apache
    ln -s ~/training-data-analyst/courses/developingapps/v1.3/python/firebase ~/firebase
    ```
    

### Configure and run the case study application

1. Navigate to the directory that contains the sample files for this lab:
    
    ```apache
    cd ~/firebase/start
    ```
    
    Run the following command to change the region from `us-central` to your default assigned region:
    
    ```apache
    export REGION=us-west1
    sed -i "s/us-central/$REGION/g" prepare_environment.sh
    ```
    
2. Configure the application:
    
    ```apache
    . prepare_environment.sh
    ```
    
    This script file:
    
    * Creates an App Engine application.
        
    * Creates a Cloud Storage bucket named `gs:[Project-ID]-media`.
        
    * Exports two environment variables: `GCLOUD_PROJECT` and `GCLOUD_BUCKET`.
        
    * Creates a `virtualenv` isolated Python environment for Python 3 and activates it.
        
    * Runs `> pip install -r requirements.txt`.
        
    * Creates entities in Cloud Datastore.
        
    * Prints out the Google Cloud Platform Project ID.
        

Click **Check my progress** to verify the objective.

Configure the case study application

4. Run the application:
    
    ```apache
    python run_server.py
    ```
    

### Start the case study application

* In Cloud Shell, click **Web preview**
    
    ![Web preveiw icon](https://cdn.qwiklabs.com/7b9oXblGsiFuNK7hmDZjFB%2B7Lrwdv5T64bbmo8X9FAo%3D align="left")
    
    \&gt; **Preview on port 8080** to preview the Quiz application.
    

Leave this window open because you need the Cloud Shell Web preview domain later in this lab.

## Task 2. Examine the case study application code

In this task you examine the case study application code. You can use the shell editors that are installed on Cloud Shell, such as `nano` or `vim` or the Cloud Shell code editor.

This lab uses the Cloud Shell code editor to review the Quiz application code.

### Launch the Cloud Shell code editor

* From Cloud Shell, click **Open Editor** to launch the code editor.
    

![Open Editor button](https://cdn.qwiklabs.com/hQW0U%2BIE4wNMsJilm%2FBcpXO2OJPL3%2FqtzlR43tCfBew%3D align="left")

**Note:** If necessary, click **Open in a new window**. You can switch back to the terminal with **Open Terminal**.

### **Review the client application**

1. Navigate to the `/firebase/start` folder using the file browser panel on the left side of the code editor.
    
2. Continue navigating. Open `...quiz/webapp/static/client/`. Click on the `index.html` file.
    
    This file is the single page in the AngularJS Single Page Application (SPA). It contains `<script></script>` tags for the application libraries and code, and markup where the SPA will render dynamic output.
    
3. Select the `qiq-login-template.html` file in the `...quiz/webapp/static/client/app/auth/` folder.
    
    This file contains the AngularJS template for the Login component. Notice how it contains a couple of textboxes and a button. The button has an event handler that runs code when it is clicked.
    
4. Still in this folder, select the `qiq-login.js` file.
    
    This file contains an AngularJS component. It allows the user to log in to the application or to navigate to a registration page.
    

## Task 3. Configure Identity Platform Authentication

In this task, you configure Identity Platform to sign in a user with an email and password. You then create a user which you can use to login to the Quiz Application.

### Configure Identity Platform for email and password

1. In the Google Cloud Console, on the **Navigation menu** (), click **Identity Platform**.
    
2. Click **Enable Identity Platform**.
    
    **Note:** If you see the Leave site pop-up message, click **Leave**.
    
    The Identity Platform page appears in the Cloud Console.
    
    ![The Add a Provider button.](https://cdn.qwiklabs.com/h0GI8AowPrtekC5uuuG1FDZq%2FIu6SKBusEI418vm09k%3D align="left")
    
3. Click **Add a Provider**.
    
4. In the Sign-in method window, for **Select a provider**, select **Email / Password**.
    
5. Click **Enabled**.
    
6. In the Authorized Domains pane, click **Add Domain**.
    
7. Return to the running Quiz Application and copy the domain which has the format below
    

```apache
8080-27542cac-44d0-41a9-9e96-065800c2100c.ql-us-west1-ctgq.cloudshell.dev
```

![Add authorized domain dialog box](https://cdn.qwiklabs.com/rxCFAS4xgYzfXTPhIyyvcV8W%2Bu9yTcBZYBYrFTERjW0%3D align="left")

8. Paste the domain into the **Domain** field.
    
9. Modify the pasted domain so that **only the domain name** is in the Domain field.
    
    You should remove **https://** and anything that follows the domain name, including slashes. The domain name should end with **cloudshell.dev**.
    
10. Click **Save**.
    

**Note:** If you receive an error message indicating that you should try again later, you probably submitted more than just the domain name. You should click **Cancel** in the dialog box and then click **Add Domain** to try again.

11. In the new identity provider window click **Save**.
    
    You may need to scroll down to see the Save button.
    

### Add a user

1. In the Identity Platform pane, click **Users**.
    
2. Click **Add User**.
    
3. In the Add user dialog box, specify the following:
    
    <table><tbody><tr><td colspan="1" rowspan="1"><p><strong>Email</strong></p></td><td colspan="1" rowspan="1"><p>user1@example.com</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Password</strong></p></td><td colspan="1" rowspan="1"><p>abc123!</p></td></tr></tbody></table>
    
4. Click **Add**.
    

Click **Check my progress** to verify the objective.

Configure Identity Platform Authentication

## Task 4. Integrate a client-side web application with Identity Platform

In this task you apply your Identity Platform configuration to your client-side web application.

1. In the navigation pane, click **Providers**.
    
2. Click **Application Setup Details**.
    
3. In the Configure your application dialog box, copy the Identity Platform markup.
    
    ![The highlighted Copy icon](https://cdn.qwiklabs.com/Q5qMOt30fR3ub0D65wfbWFWgg%2B%2F2G9HphG39bl9yPxA%3D align="left")
    
4. Click **Close**.
    
5. In the Cloud Shell code editor, open the `index.html` file in `...webapp/static/client/`.
    
6. Paste the configuration markup just before the other `<script></script>` tags at the bottom of the page.
    
7. Save the `index.html` file.
    

## Task 5. Run the application

In this task you verify that you can login to the Quiz Application using the credentials you created in Identity Platform in a previous step. You then register a new user in the Quiz Application and verify that these credentials are added to Identity Platform.

1. Return to the Quiz application and refresh your browser.
    
2. In the navigation bar, click **Take Test**.
    
    ![The Quite Interesting Quiz page.](https://cdn.qwiklabs.com/P%2FLNeV1BmSq%2Brev9%2FbbCqQA6YMkCgE5W5%2FQYtYhu3zY%3D align="left")
    
3. In the navigation bar, click **GCP**, **People**, or **Places**.
    
    **Note:** The quiz pages will be blank because you should not be able to take a test without being logged in.
    
4. In the navigation bar, enter the following invalid credentials:
    
    <table><tbody><tr><td colspan="1" rowspan="1"><p><strong>Email</strong></p></td><td colspan="1" rowspan="1"><p>user2@example.com</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Password</strong></p></td><td colspan="1" rowspan="1"><p>abcd1234$</p></td></tr></tbody></table>
    
5. Click **Login**.
    
    **Note:** Login will fail because the user is not registered.
    
6. Enter the following credentials that you created in a previous task:
    
    <table><tbody><tr><td colspan="1" rowspan="1"><p><strong>Email</strong></p></td><td colspan="1" rowspan="1"><p>user1@example.com</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Password</strong></p></td><td colspan="1" rowspan="1"><p>abc123!</p></td></tr></tbody></table>
    
7. Click **Login**.
    
    The user's email address should be shown in the navigation bar, and the first question will be presented.
    
    **Note:** If the login does not work, the password may not have been configured correctly. Return to the Users page in Identity Platform and delete user1@example.com, and then add user1@example.com with the correct password.
    
8. In the navigation bar, click **Logout**.
    
9. Click the **Register** link.
    
10. In the new form, enter the following credentials:
    
    <table><tbody><tr><td colspan="1" rowspan="1"><p><strong>Email</strong></p></td><td colspan="1" rowspan="1"><p>user2@example.com</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Password</strong></p></td><td colspan="1" rowspan="1"><p>abcd1234$</p></td></tr></tbody></table>
    
11. Click **Register**.
    
    A complex password is required. If you have entered an acceptable password, you should be logged in and redirected to the GCP quiz.
    
    You are able to answer questions and submit answers.
    
12. In the navigation bar, click **Logout**.
    
    **Note:** You will be logged out and redirected to the Quiz homepage.
    
13. In the Google Cloud Console, in the Identity Platform navigation pane, click **Users**.
    
    **Note:** You should see user2@example.com has been added as a user.
    

---

## Solution of Lab

%[https://youtu.be/kHb0E8MB0DI]