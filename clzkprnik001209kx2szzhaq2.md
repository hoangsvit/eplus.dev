---
title: "App Dev: Setting up a Development Environment - Python - GSP183"
seoTitle: "App Dev: Setting up a Development Environment - Python - GSP183"
seoDescription: "In this lab, you set up a Python development environment on Google Cloud, using Compute Engine to create a virtual machine (VM) and installing software libr"
datePublished: Thu Aug 08 2024 03:23:51 GMT+0000 (Coordinated Universal Time)
cuid: clzkprnik001209kx2szzhaq2
slug: app-dev-setting-up-a-development-environment-python-gsp183
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723087345630/2bfe9756-1bb7-42a1-95b2-8b48773fd5e8.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723087417140/5d259d95-041f-45c3-bda7-584f0870064a.png
tags: app-dev-setting-up-a-development-environment-python-gsp183

---

## **Overview**

Compute Engine is just one resource provided on Google Cloud.

**Objectives**

In this lab, you set up a Python development environment on Google Cloud, using Compute Engine to create a virtual machine (VM) and installing software libraries for software development.

You perform the following tasks:

* Provision a Compute Engine instance.
    
* Connect to the instance using SSH.
    
* Install a Python library on the instance.
    
* Verify the software installation.
    

**Google Cloud**

Google Cloud consists of a set of physical assets, such as computers and hard disk drives, and virtual resources, such as virtual machines (VMs), that are contained in Google's data centers around the globe. Each data center location is in a global region. Regions include Central US, Western Europe, and East Asia. Each region is a collection of zones, which are isolated from each other within the region. Each zone is identified by a name that combines a letter identifier with the name of the region. For example, zone a in the East Asia region is named asia-east1-a.

This distribution of resources provides several benefits, including redundancy in case of failure and reduced latency by locating resources closer to clients. This distribution also introduces some rules about how resources can be used together.

**Projects**

Any Google Cloud resources that you allocate and use must belong to a project. You can think of a project as the organizing entity for what you're building.

A project is made up of the settings, permissions, and other metadata that describe your applications.

Resources within a single project can work together easily, for example by communicating through an internal network, subject to the regions-and-zones rules. The resources that each project contains remain separate across project boundaries; you can only interconnect them through an external network connection.

Each Google Cloud project has a:

* Project name, which you provide.
    
* Project ID, which you can provide or Google Cloud can provide for you.
    
* Project number, which Google Cloud provides.
    

As you work with Google Cloud, you'll use these identifiers in certain command lines and API calls. The following screenshot shows a project name, its ID, and number:

The Cloud Console displays project ID and name

In this example:

* Example Project is the project name.
    
* example-id is the project ID.
    
* 123456789012 is the project number.
    

Each project ID is unique across Google Cloud. Once you have created a project, you can delete the project but its ID can never be used again.

When billing is enabled, each project is associated with one billing account. Multiple projects can have their resource usage billed to the same account.

A project serves as a namespace. This means every resource within each project must have a unique name, but you can usually reuse resource names if they are in separate projects. Some resource names must be globally unique. Refer to the documentation for the resource for details.

In this lab, you provision a Compute Engine virtual machine (VM) and install software libraries for Python software development on Google Cloud.

**Ways to interact with the services**

Google Cloud gives you three basic ways to interact with the services and resources.

* Cloud Console: a web-based, graphical user interface that you can use to manage your Google Cloud projects and resources.
    
* Command-line interface:
    
    * Cloud SDK: provides the gcloud command-line tool, which gives you access to the commands you need.
        
    * Cloud Shell: a browser-based, interactive shell environment for Google Cloud. You can access Cloud Shell from the Google Cloud console. If you prefer to work in a terminal window, the Cloud SDK provides the gcloud command-line tool, which gives you access to the commands you need. The gcloud tool can be used to manage both your development workflow and your Google Cloud resources. See the gcloud reference for the complete list of available commands.
        
* Client libraries: The Cloud SDK includes client libraries that enable you to easily create and manage resources. Google Cloud client libraries expose APIs to provide access to services and resource management functions. You also can use the Google API client libraries to access APIs for products such as Google Maps, Google Drive, and YouTube.
    

---

### **Task 1. Create a Compute Engine Virtual Machine instance**

In this section, you use the Cloud Console to provision a new Compute Engine (VM) instance.

**Create and connect to a virtual machine**

1. In the Console, click **Navigation menu** &gt; **Compute Engine** &gt; **VM Instances**.
    
    ![Expanded Navigation menu highlighting the Compute Engine submenu and VM instances option](https://cdn.qwiklabs.com/9pgZ2C%2FtJl7c8yzfBqb8CkojYpnSEIsbeLalQBsdpiU%3D align="left")
    
2. On the **VM Instances** page, click **Create Instance**.
    
3. On the **Create an instance** page, for **Name** type `dev-instance`, and select a **Region** as `europe-west4` and **Zone** as `europe-west4-c`.
    

**Note: Regions and zones**

Google Cloud offers products and services in multiple distinct geographic locations, called regions. Each region has multiple distinct zones. Each zone is isolated from other zones in terms of power and internet connectivity.

4. In the **Machine configuration** section, for **Series** select **E2**.
    
5. In the **Identity and API access** section, select **Allow full access to all Cloud APIs**.
    
6. In the **Firewall** section, enable **Allow HTTP traffic**.
    
7. Leave the remaining settings as their defaults, and click **Create**.
    

**Note:** It takes about 20 seconds for the VM to be provisioned and started.

#### **Test completed task**

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will granted with an assessment score.

Create a Compute Engine Virtual Machine Instance

**Check my progress**

8. On the **VM instances** page, in the `dev-instance` row, click **SSH**.
    

This launches a browser-hosted SSH session. If you have a popup blocker, you may need to click twice.

There's no need to configure or manage SSH keys.

**Install software on the VM instance**

1. In the SSH session, to update the Debian package list, execute the following command:
    
    ```apache
    sudo apt-get update
    ```
    
2. To install Git, execute the following command:
    
    ```apache
    sudo apt-get install git
    ```
    
    When prompted, enter `Y` to continue, accepting the use of additional disk space.
    
3. To install Python, execute the following command:
    
    ```apache
    sudo apt-get install python3-setuptools python3-dev build-essential
    ```
    
    Again, when prompted, enter `Y` to continue, accepting the use of additional disk space.
    
4. To install pip, execute the following command:
    
    ```apache
    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    ```
    
    ```apache
    sudo python3 get-pip.py --break-system-packages
    ```
    

#### **Test completed task**

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will granted with an assessment score.

Install software and configure the VM instance

**Check my progress**

### **Task 2. Configure the VM to run application software**

In this section, you verify the software installation on your VM and run some sample code.

**Verify Python installation**

1. Still in the SSH window, verify the installation by checking the Python and pip version:
    
    ```apache
    python3 --version
    ```
    
    ```apache
    pip3 --version
    ```
    
    The output provides the version of Python and pip that you installed.
    
2. Clone the class repository:
    
    ```apache
    git clone https://github.com/GoogleCloudPlatform/training-data-analyst
    ```
    
3. Change the working directory:
    
    ```apache
    cd ~/training-data-analyst/courses/developingapps/python/devenv/
    ```
    
4. Run a simple web server:
    
    ```apache
    sudo python3 server.py
    ```
    
5. Return to the Cloud Console VM instances list (**Navigation menu** &gt; **Compute Engine** &gt; **VM Instances**), and click on the **External IP address** for the `dev-instance`.
    
    ![Instances tab with External IP 35.184.33.34 highlighted](https://cdn.qwiklabs.com/xQq5EKSkXWPa2%2BxNRnBNhFxIt4kZpiBgzRjvYtV5Ap8%3D align="left")
    
    A browser opens and displays a `Hello GCP dev!` message from Python.
    

#### **Test completed task**

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will granted with an assessment score.

Run application software to get a success response

**Check my progress**

6. Return to the SSH window, and stop the application by pressing **Ctrl**+**C**.
    
7. Install the Python packages needed to enumerate Compute Engine VM instances:
    
    ```apache
    sudo pip3 install -r requirements.txt --break-system-packages
    ```
    
8. Now list your instance in Cloud Shell. Enter the following command to run a simple Python application that lists Compute Engine instances. Replace `<PROJECT_ID>` with your Project ID and `<YOUR_VM_ZONE>` is the region you specified when you created your VM. Find these values on the VM instances page of the console:
    
    ![Cloud console displaying Project ID qwiklabs-gcp-bcdd9ef8f952, and Region us-central1-a](https://cdn.qwiklabs.com/0uCjoR9hUMbrGyBpdzRPEVT8QP5gpSSpEqDKSK5MLvI%3D align="left")
    
    ```apache
    python3 list-gce-instances.py <PROJECT_ID> --zone=<YOUR_VM_ZONE>
    ```
    
    Your instance name should appear in the SSH terminal window.
    
    **Example output:**
    
    ```apache
    Instance in project qwiklabs-gcp-04-bcdd9ef8f952 and zone "europe-west4-c":
     - dev-instance
    ```
    

**Test your understanding**

Below are multiple choice-questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

pip is a package management system used to install and manage software packages written in Python.TrueFalse

Firewall rules can be shared among networks.TrueFalse

---

### Solution of Lab

%[https://www.youtube.com/watch?v=WHCHU6RQ-2w] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723087114112/127f0b7d-0e23-4b7a-a2c8-c4396486f3ba.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/App%20Dev%20Setting%20up%20a%20Development%20Environment%20Python/quicklab.sh
sudo chmod +x quicklab.sh
./quicklab.sh
```