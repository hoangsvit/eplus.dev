---
title: "Clean Up Unused and Orphaned Persistent Disks - GSP648"
seoTitle: "Clean Up Unused and Orphaned Persistent Disks - GSP648"
seoDescription: "Use Cloud Functions and Cloud Scheduler to clean up unused persistent disks in Google Cloud, optimizing resource management and reducing costs"
datePublished: Fri Oct 24 2025 04:24:46 GMT+0000 (Coordinated Universal Time)
cuid: cmh4ckhtl000202jz93169izm
slug: clean-up-unused-and-orphaned-persistent-disks-gsp648
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761279726276/67b2bbc3-d53c-41f2-80dd-bf93548fbd91.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1761279343188/fe915866-6e7d-4264-af93-01284606f31e.png
tags: clean-up-unused-and-orphaned-persistent-disks-gsp648, clean-up-unused-and-orphaned-persistent-disks, gsp648

---

## Overview

In this lab, you will use [Cloud Functions](https://cloud.google.com/functions/) and [Cloud Scheduler](https://cloud.google.com/scheduler/) to identify and clean up wasted cloud resources. In this case, you will schedule the Cloud Function to identify and clean up unattached and orphaned persistent disks.

### What you'll do

* Create two persistent disks.
    
* Create a VM that uses one of the disks.
    
* Detach the disk from the VM.
    
* Review the Cloud Function code.
    
* Deploy the Cloud Function.
    
* Test the Cloud Function by using Cloud Scheduler jobs.
    

### Architecture

The following diagram describes the architecture used in the first section of this lab, where you schedule a Cloud Function to identify and clean up unused and orphaned persistent disks.

![Architecture diagram](https://cdn.qwiklabs.com/9ur2brAh6UenrnbIcHorFafMkoVzdr0lHILHT25%2BzjY%3D align="left")

## Setup and requirements

In this section, you configure the infrastructure and identities required to complete the lab.

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
    student-00-6df03a3ac8d4@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    CILEzndXTNCO
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-03-9c9f1bd3b103`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-03-9c9f1bd3b103
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

Copied!

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-00-6df03a3ac8d4@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

Copied!

**Output:**

```apache
[core]
project = qwiklabs-gcp-03-9c9f1bd3b103
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Enable APIs and clone repository

1. In Cloud Shell, enable the Cloud Scheduler API:
    
    ```apache
    gcloud services enable cloudscheduler.googleapis.com
    ```
    
2. Clone the repository:
    
    ```apache
    gsutil cp -r gs://spls/gsp648 . && cd gsp648
    ```
    
3. Set environment variables and make the repository folder your $WORKDIR where you run all commands related to this lab:
    
    ```apache
    export PROJECT_ID=$(gcloud config list --format 'value(core.project)' 2>/dev/null)
    WORKDIR=$(pwd)
    ```
    
4. Set the project region for this lab:
    
    ```apache
    gcloud config set compute/region us-central1
    ```
    
5. Create a variable for region:
    
    ```apache
    export REGION=us-central1
    ```
    
6. Create a variable for zone:
    
    ```apache
    export ZONE=us-central1-c
    ```
    

Learn more from the [Regions & Zones documentation](https://cloud.google.com/compute/docs/regions-zones/regions-zones).

**Note:** When you run `gcloud` on your own machine, the config settings are persisted across sessions. But in Cloud Shell, you need to set this for every new session or reconnection.

## Task 2. Create persistent disks

1. In Cloud Shell, navigate to the unattached-pd directory:
    
    ```apache
    cd $WORKDIR/unattached-pd
    ```
    
2. Export the names of the disks as variables:
    
    ```apache
    export ORPHANED_DISK=orphaned-disk
    export UNUSED_DISK=unused-disk
    ```
    
3. Create two disks:
    
    ```apache
    gcloud compute disks create $ORPHANED_DISK --project=$PROJECT_ID --type=pd-standard --size=500GB --zone=$ZONE
    
    gcloud compute disks create $UNUSED_DISK --project=$PROJECT_ID --type=pd-standard --size=500GB --zone=$ZONE
    ```
    
    This lab uses the `us-central1` region, but you can choose a different region and refer to it consistently throughout the rest of the lab.
    
4. Confirm that two disks were created:
    
    ```apache
    gcloud compute disks list
    ```
    
    Your output should look as follows:
    
    ```apache
    NAME           LOCATION       LOCATION_SCOPE  SIZE_GB  TYPE         STATUS
    orphaned-disk  us-central1-c  zone            500      pd-standard  READY
    unused-disk    us-central1-c  zone            500      pd-standard  READY
    ```
    

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a Persistent Disk, you will see an assessment score.

Create Persistent Disk

## Task 3. Create a VM and inspect the disks

1. In Cloud Shell, create an instance:
    
    ```apache
    gcloud compute instances create disk-instance \
    --zone=$ZONE \
    --machine-type=e2-medium \
    --disk=name=$ORPHANED_DISK,device-name=$ORPHANED_DISK,mode=rw,boot=no
    ```
    
2. Inspect the disk that was attached to the VM:
    
    ```apache
    gcloud compute disks describe $ORPHANED_DISK --zone=$ZONE --format=json | jq
    ```
    
    The output is similar to the following:
    
    ```apache
    {
        "creationTimestamp": "2019-06-12T12:21:25.546-07:00",
        "id": "7617542552306904666",
        "kind": "compute#disk",
        "labelFingerprint": "42WmSpB8rSM=",
        "lastAttachTimestamp": "2019-06-12T12:24:53.989-07:00",
        "name": "orphaned-disk",
        "physicalBlockSizeBytes": "4096",
        "selfLink": "https://www.googleapis.com/compute/v1/projects/automating-cost-optimization/zones/us-central1-c/disks/orphaned-disk",
        "sizeGb": "500",
        "status": "READY",
        "type": "https://www.googleapis.com/compute/v1/projects/automating-cost-optimization/zones/us-central1-c/diskTypes/pd-standard",
        "users": [
            "https://www.googleapis.com/compute/v1/projects/automating-cost-optimization/zones/us-central1-c/instances/disk-instance"
        ],
        "zone": "https://www.googleapis.com/compute/v1/projects/automating-cost-optimization/zones/us-central1-c"
    }
    ```
    
    In the preceding code sample, the following is important:
    
    * `users` identifies the VM that the disk is attached to.
        
    * `lastAttachTimestamp` identifies when the disk was last attached to a VM.
        

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a VM instance with Persistent Disk, you will see an assessment score.

Create a VM instance with Persistent Disk

1. Detach the orphaned disk from the VM:
    
    ```apache
    gcloud compute instances detach-disk disk-instance --device-name=$ORPHANED_DISK --zone=$ZONE
    ```
    
2. Inspect the orphaned disk:
    
    ```apache
    gcloud compute disks describe $ORPHANED_DISK --zone=$ZONE --format=json | jq
    ```
    
    The output is similar to the following:
    
    ```apache
    {
    "creationTimestamp": "2019-06-12T12:21:25.546-07:00",
    "id": "7617542552306904666",
    "kind": "compute#disk",
    "labelFingerprint": "42WmSpB8rSM=",
    "lastAttachTimestamp": "2019-06-12T12:24:53.989-07:00",
    "lastDetachTimestamp": "2019-06-12T12:34:56.040-07:00",
    "name": "orphaned-disk",
    "physicalBlockSizeBytes": "4096",
    "selfLink": "https://www.googleapis.com/compute/v1/projects/automating-cost-optimization/zones/us-central1-c/disks/orphaned-disk",
    "sizeGb": "500",
    "status": "READY",
    "type": "https://www.googleapis.com/compute/v1/projects/automating-cost-optimization/zones/us-central1-c/diskTypes/pd-standard",
    "zone": "https://www.googleapis.com/compute/v1/projects/automating-cost-optimization/zones/us-central1-c"
    }
    ```
    
    In the preceding code sample, the following is important:
    
    * The disk doesn’t have `users` listed, which indicates that it isn’t currently in use.
        
    * There is now a `lastDetachTimestamp` entry, indicating when the disk was last detached from a VM and therefore, when it was last in use.
        
    * The `lastAttachTimestamp` field is still present.
        

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully detached the orphaned disk from the VM, you will see an assessment score.

Detach the orphaned disk from the VM

## Task 4. Review the Cloud Function code

1. In Cloud Shell, output the section of the code that retrieves all persistent disks in the project:
    
    ```apache
    cat $WORKDIR/unattached-pd/main.py | grep "(request)" -A 12
    ```
    
    The output is as follows:
    
    ```apache
    def delete_unattached_pds(request):
    # get list of disks and iterate through it:
    disksRequest = compute.disks().aggregatedList(project=project)
    while disksRequest is not None:
        diskResponse = disksRequest.execute()
        for name, disks_scoped_list in diskResponse['items'].items():
            if disks_scoped_list.get('warning') is None:
                # got disks
                for disk in disks_scoped_list['disks']: # iterate through disks
                    diskName = disk['name']
                    diskZone = str((disk['zone'])).rsplit('/',1)[1]
                    print (diskName)
                    print (diskZone)
    ```
    
    The function uses the `aggregatedList` method to get all persistent disks in the Google Cloud project where it’s running and iterates through each of the disks.
    
2. Output the section of the code that checks the `lastAttachTimestamp` field and deletes the disk if it doesn’t exist:
    
    ```apache
    cat $WORKDIR/unattached-pd/main.py | grep "handle never" -A 11
    ```
    
    The output is as follows:
    
    ```apache
    # handle never attached disk - delete it
       # lastAttachedTimestamp is not present
       try:
       if disk["lastAttachTimestamp"] is None:
            print ("none!")
            except KeyError:
                print ("disk " + diskName + " was never attached - deleting")
                deleteRequest = compute.disks().delete(project=project,
                zone=diskZone, disk=diskName)
                deleteResponse = deleteRequest.execute()
                waitForZoneOperation(deleteResponse, project, diskZone)
                print ("disk " + diskName + " was deleted")
                continue
    ```
    
    This section deletes the disk if `lastAttachTimestamp` isn’t present—meaning this disk was never in use.
    
3. Output the section of the code that calculates the age of the disk if it’s orphaned, creates a snapshot of it, and deletes it:
    
    ```apache
    cat $WORKDIR/unattached-pd/main.py | grep "handle detached" -A 32
    ```
    
    The output is as follows:
    
    ```apache
    # handle detached disk - snapshot and delete
                    # lastAttachTimestamp is present AND users is not present
    
                    try:
                        if disk['users'] is None and disk['lastDetachTimestamp'] is not None:
                            print ("users is none")
                    except KeyError:
                        print ("disk " + diskName + " has no users and has been detached")
                        detachTimestamp = dateutil.parser.parse(disk['lastDetachTimestamp'])
                        detachedFor = pytz.utc.localize(datetime.utcnow()) - detachTimestamp
    
                        print ("disk has been detached for " + str(detachedFor))
    
                        # update this for your preferred age
                        if detachedFor.days > -1:
                            # take a snapshot
                            snapShotName = diskName + str(int(time.time()))
                            print ("taking snapshot: " + snapShotName)
                            snapshotBody = {
                                "name": snapShotName
                            }
                            snapshotRequest = compute.disks().createSnapshot(project=project,
                            zone=diskZone, disk=diskName, body=snapshotBody)
                            snapshotResponse = snapshotRequest.execute()
                            waitForZoneOperation(snapshotResponse, project, diskZone)
                            print ("snapshot completed")
    
                            # delete the disk
                            print ("deleting disk " + diskName)
                            deleteRequest = compute.disks().delete(project=project, zone=diskZone, disk=diskName)
                            deleteResponse = deleteRequest.execute()
                            waitForZoneOperation(deleteResponse, project, diskZone)
                            print ("disk " + diskName + " was deleted")
                            continue
    ```
    
    This section of code is used when the disk does have users listed and `lastDetachTimestamp` is present, which means the disk is currently not in use, but was used at some point in time. In this case, the Cloud Function creates a snapshot of the disk to retain data and then deletes the disk.
    
4. In Cloud Shell, click **Open Editor** to open the Cloud Shell Editor to edit the `main.py` file.
    

**Note:** If prompted, click **Open in New Window**.

5. Navigate to `gsp648/unattached-pd`.
    
6. Open `main.py`.
    
7. Edit line 15 of the file and replace `automating-cost-optimization` with your project id (it should look similar to):
    
    ```apache
    project = 'qwiklabs-gcp-03-9c9f1bd3b103'
    ```
    
8. Save the file by clicking **File** &gt; **Save**.
    

## Task 5. Deploy the Cloud Function

1. Disable the Cloud Functions API:
    
    ```apache
    gcloud services disable cloudfunctions.googleapis.com
    ```
    
2. Re-enable the Cloud Functions API:
    
    ```apache
    gcloud services enable cloudfunctions.googleapis.com
    ```
    
3. Add the `artifactregistry.reader` permission for your appspot service account:
    
    ```apache
    gcloud projects add-iam-policy-binding qwiklabs-gcp-03-9c9f1bd3b103 \
    --member="serviceAccount:qwiklabs-gcp-03-9c9f1bd3b103@appspot.gserviceaccount.com" \
    --role="roles/artifactregistry.reader"
    ```
    
4. In Cloud Shell, deploy the Cloud Function:
    
    ```apache
    cd ~/gsp648/unattached-pd
    gcloud functions deploy delete_unattached_pds --gen2 --trigger-http --runtime=python39 --region us-central1
    ```
    
    **Note:** Type **y** when asked: `Allow unauthenticated invocations of new function [delete_unattached_pds]? (y/N)?`
    
    **Note:** Deploying a cloud function can take 2-5 minutes, depending on region.
    
5. Capture the trigger URL of the Cloud Function as an environment variable:
    
    ```apache
    export FUNCTION_URL=$(gcloud functions describe delete_unattached_pds --format=json --region us-central1 | jq -r '.url')
    ```
    

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully deployed the Cloud Function, you will see an assessment score.

Deploy the Cloud Function

## Task 6. Schedule and test the Cloud Function

1. In Cloud Shell, create an **App Engine app** to use Cloud Scheduler:
    

```apache
gcloud app create --region=us-central
```

Copied!

2. In Cloud Shell, create a Cloud Scheduler task to run the Cloud Function at 2 AM every night:
    
    ```apache
    gcloud scheduler jobs create http unattached-pd-job \
    --schedule="* 2 * * *" \
    --uri=$FUNCTION_URL \
    --location=$REGION
    ```
    

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a Cloud Scheduler task to run the Cloud Function, you will see an assessment score.

Create a Cloud Scheduler task to run the Cloud Function

1. Test the job by manually triggering it:
    
    ```apache
    gcloud scheduler jobs run unattached-pd-job \
    --location=$REGION
    ```
    
2. Confirm that a snapshot of the orphaned disk was created:
    
    ```apache
    gcloud compute snapshots list
    ```
    
    The output is similar to the following:
    
    ```apache
    NAME                     DISK_SIZE_GB  SRC_DISK                           STATUS
    orphaned-disk1560455894  500           us-central1-c/disks/orphaned-disk  READY
    ```
    
3. Confirm that the unused disk and the orphaned disk were deleted:
    
    ```apache
    gcloud compute disks list
    ```
    
    The output is similar to the following:
    
    ```apache
    NAME                LOCATION       LOCATION_SCOPE  SIZE_GB  TYPE         STATUS
    disk-instance       us-central1-c  zone            10       pd-standard  READY
    ```
    

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully tested the job by manually triggering it, you will see an assessment score.

Test the job by manually triggering it

---

## Solution of Lab

%[https://youtu.be/Kl4cc17kYd4] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP648/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Clean%20Up%20Unused%20and%20Orphaned%20Persistent%20Disks/drabhishek.sh
sudo chmod +x drabhishek.sh
./drabhishek.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1761279837855/72df88c7-72cd-4aed-93f5-98491962b60b.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1761279871001/32b736e7-1343-429c-ab4e-eb88bdf2d099.png align="center")