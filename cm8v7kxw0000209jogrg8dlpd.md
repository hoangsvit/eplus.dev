---
title: "Using gsutil to Perform Operations on Buckets and Objects - GSP130"
seoTitle: "Using gsutil to Perform Operations on Buckets and Objects - GSP130"
seoDescription: "In this lab, you will use gsutil to create a bucket and perform operations on objects. gsutil is a Python application that lets you access Cloud Storage fro"
datePublished: Sun Mar 30 2025 05:37:34 GMT+0000 (Coordinated Universal Time)
cuid: cm8v7kxw0000209jogrg8dlpd
slug: using-gsutil-to-perform-operations-on-buckets-and-objects-gsp130
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743312899580/0f9d89d6-6810-49a3-81df-074454a3c0be.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1743313041179/b06b6561-3996-4925-bf2a-958c8d25aa4e.png
tags: using-gsutil-to-perform-operations-on-buckets-and-objects-gsp130, using-gsutil-to-perform-operations-on-buckets-and-objects, gsp130

---

## **Overview**

In this lab, you will use `gsutil` to create a bucket and perform operations on objects. `gsutil` is a Python application that lets you access Cloud Storage from the command line. The `gsutil` tool has commands such as `mb` and `cp` to perform operations. Each command has a set of options that are used to customize settings further.

### **What you'll learn to do**

* Create a bucket
    
* Copy files from a local folder to a bucket
    
* Synchronize the contents of the local folder with the contents of the bucket
    
* Change access control permissions on objects
    
* Delete a bucket.
    

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
    student-04-d4602fad07eb@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    HZwBWm1KU21N
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-02-d6afee43e356`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-02-d6afee43e356
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
ACCOUNT: student-04-d4602fad07eb@qwiklabs.net

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
project = qwiklabs-gcp-02-d6afee43e356
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

6. In Cloud Shell session execute the following command to download sample data for this lab from a git repository:
    

```apache
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```

7. Change to the **blogs** directory:
    

```apache
cd training-data-analyst/blogs
```

## **Task 1. Working with buckets and objects**

* First, set some environment variables:
    

```apache
PROJECT_ID=`gcloud config get-value project`
BUCKET=${PROJECT_ID}-bucket
```

## **Task 2. Create a bucket**

* Create a bucket and multi-regional storage class:
    

```apache
gsutil mb -c multi_regional gs://${BUCKET}
```

Click **Check my progress** to verify the objective.

Create a bucket

Check my progress

## **Task 3. Upload objects to your bucket**

* Run the following to copy the `endpointslambda` object to your bucket:
    

```apache
gsutil -m cp -r endpointslambda gs://${BUCKET}
```

Click **Check my progress** to verify the objective.

Upload objects to your bucket

Check my progress

If you have a large number of files to transfer, you might want to use the `-m` option, to perform a parallel (multi-threaded/multi-processing) copy for faster performance. The `-r` option allows gsutil to recurse through directories.

## **Task 4. List objects**

* To list objects in your bucket, execute the following command:
    

```apache
gsutil ls gs://${BUCKET}/*
```

## **Task 5. Sync changes with bucket**

1. Use the following commands to rename and delete some files:
    

```apache
mv endpointslambda/Apache2_0License.txt endpointslambda/old.txt
```

```apache
rm endpointslambda/aeflex-endpoints/app.yaml
```

2. Now synchronize the local changes with the bucket:
    

```apache
gsutil -m rsync -d -r endpointslambda gs://${BUCKET}/endpointslambda
```

In this command, the `-d` option deletes files from the target if they're missing in the source (in this case, it deletes **app.yaml** from the bucket). The `-r` option runs the command recursively on directories.

3. To verify that the bucket is now in sync with your local changes, list the files in the bucket again:
    

```apache
gsutil ls gs://${BUCKET}/*
```

## **Task 6. Make objects public**

1. To allow public access to all files under the `endpointslambda` folder in your bucket, execute the following command:
    

```apache
gsutil -m acl set -R -a public-read gs://${BUCKET}
```

Click **Check my progress** to verify the objective.

Make objects public

Check my progress

2. To confirm files are viewable by the public, open the following link in a new incognito or private browser window, replacing `<your-bucket-name>` with the full name of your bucket, not the environment variable:
    

```apache
http://storage.googleapis.com/<your-bucket-name>/endpointslambda/old.txt
```

This URL uses the Cloud Storage API link to view the object without authentication. Learn more about accessing public data from the [Accessing public data documentation](https://cloud.google.com/storage/docs/access-public-data).

## **Task 7. Copy with different storage class**

* Next, copy a file with [Nearline storage class](https://cloud.google.com/storage/docs/storage-classes) instead of the bucket's default Multi-regional storage class:
    

```apache
gsutil cp -s nearline ghcn/ghcn_on_bq.ipynb gs://${BUCKET}
```

## **Task 8. Check storage classes**

1. Run the following to check the storage classes and view other detailed information about the objects in your bucket:
    

```apache
gsutil ls -Lr gs://${BUCKET} | more
```

2. Press the `space` key to continue viewing the rest of the command's output.
    

The output shows that the **ghcn\_on\_bq.ipynb** object has `NEARLINE` storage class while the other objects have `MULTI_REGIONAL` storage class.

Output:

```apache
gs://qwiklabs-gcp-90345ac124778ed8-bucket/ghcn_on_bq.ipynb:
    Creation time:          Tue, 13 Aug 2019 20:19:27 GMT
    Update time:            Tue, 13 Aug 2019 20:19:27 GMT
    Storage class:          NEARLINE
    Content-Length:         980176
    Content-Type:           application/octet-stream
...

gs://qwiklabs-gcp-90345ac124778ed8-bucket/endpointslambda/:
gs://qwiklabs-gcp-90345ac124778ed8-bucket/endpointslambda/README.md:
    Creation time:          Tue, 13 Aug 2019 20:03:29 GMT
    Update time:            Tue, 13 Aug 2019 20:15:43 GMT
    Storage class:          MULTI_REGIONAL
    Content-Length:         452
    Content-Type:           text/markdown
...
```

3. You can use Ctrl + c to return to the command line.
    

## **Task 9. Delete your bucket**

1. Before deleting a bucket, you must first delete all objects in the bucket. To delete all objects, execute the following command:
    

```apache
gsutil rm -rf gs://${BUCKET}/*
```

2. Now delete the bucket:
    

```apache
gsutil rb gs://${BUCKET}
```

Click **Check my progress** to verify the objective.

Delete the bucket

---

## Solution of Lab

%[https://youtu.be/rRPOGrrv-9w] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Using%20gsutil%20to%20Perform%20Operations%20on%20Buckets%20and%20Objects/gsp130.sh
sudo chmod +x *.sh
./*.sh
```