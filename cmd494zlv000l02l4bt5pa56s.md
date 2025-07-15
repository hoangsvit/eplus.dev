---
title: "Rent-a-VM to Process Earthquake Data - GSP008"
seoTitle: "Process Earthquake Data"
seoDescription: "Learn to set up a Google Cloud VM, ingest earthquake data, transform it, and publish results with full cloud access"
datePublished: Tue Jul 15 2025 08:09:54 GMT+0000 (Coordinated Universal Time)
cuid: cmd494zlv000l02l4bt5pa56s
slug: rent-a-vm-to-process-earthquake-data-gsp008
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752566957009/aaaf13a4-f8da-4f67-b84e-c083e0084d16.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752566975283/0e1f1ac9-9375-40e7-9776-335c134f15d6.png
tags: rent-a-vm-to-process-earthquake-data-gsp008, rent-a-vm-to-process-earthquake-data, gsp008, process-earthquake-data

---

## Overview

Using Google Cloud to set up a virtual machine to process earthquake data frees you from IT minutia to focus on your scientific goals. You can ingest and process data, then present the results in various formats. In this lab, you will ingest real-time earthquake data published by the United States Geological Survey (USGS) and create maps that look like the following:

![World map displaying earthquake indicators](https://cdn.qwiklabs.com/lc%2F6uN3hLIJyJK5rQ97KtDHLczlB2y%2FonZ%2Be05ccD6E%3D align="left")

In this lab you will spin up a virtual machine, access it remotely, and then manually create a pipeline to retrieve, process and publish the data.

### What you will learn

In this lab, you will learn how to do the following:

* Create a Compute Engine instance with specific security permissions.
    
* SSH into the instance.
    
* Install the software package Git (for source code version control).
    
* Ingest data into the Compute Engine instance.
    
* Transform data on the Compute Engine instance.
    
* Store the transformed data on Cloud Storage.
    
* Publish Cloud Storage data to the web.
    

## Setup

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
    student-03-acdd92e28021@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    zqBkwDtV3b2m
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

## Task 1. Create Compute Engine instance with the necessary API access

1. To create a Compute Engine instance, from the **Navigation menu** click on **Compute Engine** &gt; **VM instances**.
    
2. Click **Create Instance** and wait for the "Create an instance" form to load.
    
3. In the **Machine configuration**.
    
    Use default Region and Zone for creating the instance.
    
4. Click **OS and storage**.
    
    Click **Change** and select the following values:
    
    * **Operating System:** `Debian`
        
    * **Version**: `Debian GNU/Linux 11 (bullseye) x86/64`
        
    
    Click **Select**.
    
5. Click **Security**.
    
    * In the **Access scopes** section, select **Allow full access to all Cloud APIs**.
        
6. Click **Create**.
    

You'll see a green circle with a check when the instance is created.

Click **Check my progress** below to verify you're on track in this lab.

Create a Compute Engine instance with the necessary API access

## Task 2. SSH into the instance

You can remotely access your Compute Engine instance using Secure Shell (SSH):

1. Click the **SSH** button next to your newly created VM:
    

The VM instance details displays.

**Note:** Make sure your browser is not blocking pop-ups.

SSH keys are automatically transferred; no extra software is needed to ssh directly from the browser.

2. To find some information about the Compute Engine instance, type the following into the command-line:
    

```apache
cat /proc/cpuinfo
```

You should see a similar output:

```apache
processor       : 0
vendor_id       : GenuineIntel
cpu family      : 6
model           : 63
model name      : Intel(R) Xeon(R) CPU @ 2.30GHz
....
```

## Task 3. Install software

1. Still in the SSH window, enter the following commands:
    

```apache
sudo apt-get update
```

```apache
sudo apt-get -y -qq install git
```

```apache
sudo apt-get install python-mpltoolkits.basemap
```

2. Enter **Y** when asked if it's acceptable to use additional disk space.
    

```apache
sudo apt install python3-pip -y
```

```apache
pip install --upgrade basemap basemap-data basemap-data-hires pyproj
```

```apache
pip install matplotlib==3.3.4  numpy==1.23.5
```

3. Verify that git is now installed:
    

```apache
git --version
```

You should see a similar output:

```apache
git version 2.20.1
```

Click **Check my progress** below to verify you're on track in this lab.

Install software

## Task 4. Ingest USGS data

1. Still in the SSH window, enter the following command to download the code from GitHub:
    

```apache
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```

**Note:** If you get a git authorization error, it is likely that the GitHub URL has a typo in it. Please copy and paste the above code.

2. Navigate to the folder corresponding to this lab:
    

```apache
cd training-data-analyst/CPB100/lab2b
```

3. Examine the `ingest` code using `less`:
    

```apache
less ingest.sh
```

The `less` command allows you to view the file (Press the **spacebar** to scroll down; the letter **b** to back up a page; the letter **q** to quit).

4. Enter **q** to exit the editor.
    

The program `ingest.sh` downloads a dataset of earthquakes in the past 7 days from the US Geological Survey. Notice where the file is downloaded to (disk or Cloud Storage.)

5. Enter the following command to run the `ingest` code:
    

```apache
bash ingest.sh
```

Click **Check my progress** below to verify you're on track in this lab.

Ingest USGS data

## Task 5. Transform the data

You will use a Python program to transform the raw data into a map of earthquake activity:

The transformation code is explained in detail in [this notebook](https://github.com/GoogleCloudPlatform/datalab-samples/blob/master/basemap/earthquakes.ipynb).

Feel free to read the narrative to understand what the transformation code does. The notebook itself was written in Datalab, a Google Cloud product that you will use later in this set of labs.

1. Still in the Compute Engine instance, enter the following command to install the necessary Python packages on the Compute Engine instance:
    

```apache
bash install_missing.sh
```

2. Enter the following command to run the transformation code:
    

```apache
python3 transform.py
```

3. You will notice a new image file `earthquakes.png` in your current directory if you enter the following command:
    

```apache
ls -l
```

Click **Check my progress** below to verify you're on track in this lab.

Transform the data

## Task 6. Create a Cloud Storage bucket

Return to the Cloud Console for this step.

1. From the **Navigation menu** select **Cloud Storage**:
    
2. Click on **\+ Create**, then create your bucket with the following characteristics:
    

* Choose a globally unique bucket name (but not a name you'd like to use for your own projects), then click **Continue**.
    
* You can leave it as **Multi-Regional**, or improve speed and reduce costs by making it **Regional** (choose the same region as your Compute Engine instance).
    
* For `Choose how to control access to objects`, uncheck the box for **Enforce public access prevention on this bucket** and select **Fine-grained** for `Access control`.
    

3. Then, click **Create**.
    

Take note of your bucket name. You will insert its name whenever the instructions ask for `<YOUR-BUCKET>`.

## Task 7. Store data

You will now learn how to store the original and transformed data in Cloud Storage.

1. In the SSH window of the Compute Engine instance, run the following, changing `<YOUR-BUCKET>` to the bucket name you created earlier:
    

```apache
gsutil cp earthquakes.* gs://<YOUR-BUCKET>/earthquakes/
```

This command copies the files to your bucket in Cloud Storage.

2. Return to the Cloud Console and on the Storage Browser page click on the **Refresh** button near the top of the page. Now click on the bucket name then the `/earthquakes` folder.
    

You should now see the following three files in the earthquakes folder:

* earthquakes.csv
    
* earthquakes.htm
    
* earthquakes.png
    

Click **Check my progress** below to verify you're on track in this lab.

Create bucket and Store data

## Task 8. Publish Cloud Storage files to web

You will now publish the files in your bucket to the web.

1. To create a publicly accessible URL for the files, click the three dots at the end of the `earthquakes.htm` file and select **Edit access** from the dropdown menu.
    
2. In the overlay that appears, click the **\+ Add entry** button.
    
3. Add a permission for all users by entering in the following:
    

* Select **Public** for the Entity.
    
* Enter **allUsers** for the Name.
    
* Select **Reader** for the Access.
    
* Then click **Save**.
    

![Edit access page](https://cdn.qwiklabs.com/HNVCDhrj7iYd%2Fb4X3UCof0wL4EQ205FEEfXKWifsWSQ%3D align="left")

4. Repeat the above steps for `earthquakes.png`.
    
5. Click on the name of a file and notice the URL of the published Cloud Storage file and how it relates to your bucket name and content. It should resemble the following:
    

```apache
https://storage.cloud.google.com/YOUR-BUCKET-NAME/earthquakes/earthquakes.png
```

6. If you click on the `earthquakes.png` image file and then on the public URL, a new tab will be opened with the following image loaded:
    

![World map with earthquake indicators](https://cdn.qwiklabs.com/lc%2F6uN3hLIJyJK5rQ97KtDHLczlB2y%2FonZ%2Be05ccD6E%3D align="left")

7. Go ahead and close the SSH window.
    

---

## Solution of Lab

%[https://youtu.be/mxxpcPNtKYk] 

```apache
curl -LO raw.githubusercontent.com/Techcps/Google-Cloud-Skills-Boost/master/Rent%20a%20VM%20to%20Process%20Earthquake%20Data/techcps008.sh
sudo chmod +x techcps008.sh
./techcps008.sh
```

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>If it fails rerun the script and it should work.</strong></div>
</div>