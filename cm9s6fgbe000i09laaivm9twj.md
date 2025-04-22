---
title: "Google Cloud SDK: Qwik Start - Redhat/Centos - GSP122"
seoTitle: "Google Cloud SDK: Qwik Start - Redhat/Centos - GSP122"
seoDescription: "In this lab you will learn how to install Cloud SDK to a virtual machine, initialize it and run core gcloud commands from the command-line. The Cloud SDK RP"
datePublished: Tue Apr 22 2025 07:21:42 GMT+0000 (Coordinated Universal Time)
cuid: cm9s6fgbe000i09laaivm9twj
slug: google-cloud-sdk-qwik-start-redhatcentos-gsp122
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745306313346/36978a31-b8a8-436e-aa10-d89ceb989ae4.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745306489138/af35b7fb-78ef-484e-8f39-72950324a196.png
tags: google-cloud-sdk-qwik-start-redhatcentos-gsp122, google-cloud-sdk-qwik-start, redhatcentos, gsp122, google-cloud-sdk-qwik-start-redhatcentos

---

In this lab you will learn how to install Cloud SDK to a virtual machine, initialize it and run core `gcloud` commands from the command-line. The Cloud SDK RPM packages are supported for Red Hat Enterprise Level 9 and CentOS 9.

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
    student-04-11a6a619d731@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    EXO4cgTp6Hyc
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-008b18599613`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-008b18599613
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
ACCOUNT: student-04-11a6a619d731@qwiklabs.net

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
project = qwiklabs-gcp-00-008b18599613
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Set the region

Set the project region for this lab:

```apache
gcloud config set compute/region us-east1
```

## Task 1. Set up a VM to use

Create a VM with either Centos or Redhat. You can choose which one to use, the steps will be the same.

1. In the Cloud Console, go to **Compute Engine** &gt; **VM instances**, then click **Create instance**.
    

![The VM instances page displaying the Create Instance button](https://cdn.qwiklabs.com/DyNdsB1D5gRfaeWg5ZCnfiFPxAzlOYrIPOZLMnsHIzY%3D align="left")

2. In the **Machine configuration**.
    
    Select the following values:
    
    * **Region**: `us-east1`
        
    * **Zone**: `us-east1-d`
        
3. Click **OS and storage**.
    
    Click **Change** to begin configuring your boot disk and select the following values:
    
    * **Operating system**: `CentOS`
        
    * **Version**: `CentOS Stream 9`
        
    
    Click **Select**.
    
4. Click **Networking**.
    
    * **Firewall**: Allow HTTP traffic
        
5. Click **Create**.
    

Click *Check my progress* to verify the objective.

Create a Compute Engine instance, allow HTTP traffic.

**Check my progress**

6. Then click on the **SSH** button for your instance.
    

Now you're ready to set this instance up with Cloud SDK.

## Task 2. Update the Cloud SDK RPM packages

The Cloud SDK RPM packages are supported for Red Hat Enterprise Level 9 and CentOS Stream 9. They may also work on Fedora systems using yum or dnf, but this has not been tested.

1. Run the following in the **SSH** window to set up Cloud SDK:
    

```apache
# Update YUM with Cloud SDK repo information:
sudo tee -a /etc/yum.repos.d/google-cloud-sdk.repo << EOM
[google-cloud-sdk]
name=Google Cloud SDK
baseurl=https://packages.cloud.google.com/yum/repos/cloud-sdk-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg
       https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOM

# The indentation for the 2nd line of gpgkey is important.

# Install the Cloud SDK
sudo yum install google-cloud-sdk
```

2. Respond **Y** when prompted to confirm the total download size.
    

## Task 3. Initialize the SDK in your instance

Use the `gcloud init` command to perform several common SDK setup tasks. These include authorizing the SDK tools to access Google Cloud using your user account credentials and setting up the default SDK configuration.

1. To initialize the SDK, run the following:
    

```apache
gcloud init --console-only
```

This prevents the `gcloud init` command from launching a web browser. Choose option 2, to Sign in with a new account.

2. Type the number for adding a new account.
    

```apache
Pick cloud project to use:
 [1] XXXXXxXXX-compute@developer.gserviceaccount.com
 [2] Sign in with a new Google Account
 ...
 Please enter your numeric choice or text value:
```

You will get confirmation that you're running on a virtual machine.

3. Type **Y** to allow the credentials you logged into the lab with (this is your personal account for this lab) to be used to authenticate your account.
    

```apache
You are running on a Google Compute Engine virtual machine. It is recommended that you use service accounts for authentication. You can run:
$ gcloud config set account ‘ACCOUNT'
To switch accounts as necessary.

Y to authenticate with your personal acct
Do you want to continue (Y/n)?
```

You'll be given a long URL click on it or paste it into a new browser.

4. You may be asked to select your lab credentials again, and **Allow** access to your account.
    

This URL will give you your authentication code.

5. Copy the code and paste it into the SSH window at the command prompt, then press **Enter**.
    
6. Now type the number corresponding to your Project ID.
    

You will see a confirmation that you have completed the setup steps successfully that will look like this:

```apache
Your current project has been set to [qwiklabs-gcp-fe1e6438a8b814c2].
...

This gcloud configuration is called [default]
```

Click *Check my progress* to verify the objective.

Initialize the SDK in your instance

**Check my progress**

## Task 4. Run core gcloud commands

Run these `gcloud` commands to view information about your SDK installation.

1. List accounts whose credentials are stored on this VM:
    

```apache
gcloud auth list
```

A list of credentialed accounts displays:

```apache
      Credentialed Accounts
ACTIVE             ACCOUNT
*                  xxxxxxxx-compute@developer.gserviceaccount.com
                   gcpxxxxxxxxxx_student@qwiklabs.net
```

2. This command will list the properties in your active SDK configuration:
    

```apache
gcloud config list
```

The list of properties will display:

```apache
[compute]
Region = us-east1
Zone = us-east1-d
[core]
Account = gcpstaging10738_student@qwiklabs.net
Disable_usage_reporting = True
Project = qwiklabs-gcp-fe1e6438a8b814c2
```

3. Run the following to view information on your Cloud SDK installation and the active SDK configuration:
    

```apache
gcloud info
```

The summary includes information about:

* Your system
    
* The installed SDK components
    
* The active user account and current project
    
* The properties in the active SDK configuration
    

4. You can see information about `gcloud` commands and other topics from the command line by running the following:
    

```apache
gcloud help
```

5. Press **Enter** or the spacebar to scroll down the Help content.
    
6. Press **q** to exit Help.
    

In Help you can specify a command. For example, the help for `gcloud compute instances create` would be this:

```apache
gcloud help compute instances create
```

You'll see a help topic that contains a description of the command, a list of command flags and arguments, and examples of how to use it.

---

## Solution of Lab

%[https://youtu.be/wOXulz6LXco] 

```apache
curl -LO raw.githubusercontent.com/ArcadeCrew/Google-Cloud-Labs/refs/heads/main/Google%20Cloud%20SDK%20Qwik%20Start%20-%20RedhatCentos/arcadecrew.sh
sudo chmod +x arcadecrew.sh
./arcadecrew.sh
```