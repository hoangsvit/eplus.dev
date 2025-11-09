---
title: "Manage Storage Configuration using gsutil (Solution)"
seoTitle: "Manage Storage Configuration using gsutil (Solution)"
seoDescription: "Learn to manage storage with gsutil: create a bucket, upload/sync files, set permissions, and manage storage classes in Google Cloud"
datePublished: Sun Nov 09 2025 08:22:04 GMT+0000 (Coordinated Universal Time)
cuid: cmhrg3b2k000102l43nns73gr
slug: manage-storage-configuration-using-gsutil-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762676276316/85e8d7f0-e398-482b-8c55-1523afd0719f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1762676508660/e55ac22c-b18a-4f04-8fdb-dac18c69e6c9.png
tags: manage-storage-configuration-using-gsutil-solution, manage-storage-configuration-using-gsutil

---

## Overview

In this lab, you will use `gsutil` to create a bucket and perform operations on objects. `gsutil` is a Python application that lets you access Cloud Storage from the command line. The `gsutil` tool has commands such as `mb` and `cp` to perform operations. Each command has a set of options that are used to customize settings further.

### What you'll learn to do

* Create a bucket
    
* Copy files from a local folder to a bucket
    
* Synchronize the contents of the local folder with the contents of the bucket
    
* Change access control permissions on objects
    

## Setup and requirements

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

### Get the sample code and set variables

1. In the cloud terminal session, execute the following command to download sample data for this lab from a git repository:
    

```apache
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```



2. Change to the **blogs** directory:
    

```apache
cd training-data-analyst/blogs
```



3. Set some environment variables:
    

```apache
PROJECT_ID=`gcloud config get-value project`
BUCKET=${PROJECT_ID}-bucket
```



## Task 1. Create a bucket

* Run the following command to create a bucket with multi-regional storage class:
    

```apache
gsutil mb -c multi_regional gs://${BUCKET}
```



The `gsutil mb` command is used to create a new Google Cloud Storage bucket. The `-c` flag allows you to specify the storage class for the bucket, and the `multi_regional` storage class is designed for data that needs to be available in multiple regions (ideal for high availability and low-latency access).

Click **Check my progress** to verify the objective.

Create a bucket

## Task 2. Upload objects to your bucket

* Run the following to copy the `endpointslambda` object to your bucket:
    

```apache
gsutil -m cp -r endpointslambda gs://${BUCKET}
```



The `gsutil -m cp -r` command is used to copy files or directories to a Google Cloud Storage bucket

If you have a large number of files to transfer, you might want to use the `-m` option, to perform a parallel (multi-threaded/multi-processing) copy for faster performance. The `-r` option allows gsutil to recurse through directories.

Click **Check my progress** to verify the objective.

Upload objects to your bucket

## Task 3. List objects

* To list objects in your bucket, execute the following command:
    

```apache
gsutil ls gs://${BUCKET}/*
```



This command lists all objects (files and directories) inside a specific bucket in Google Cloud Storage, including any nested objects.

## Task 4. Sync changes with bucket

1. Use the following **mv** command to rename and **rm** command to delete some files:
    

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



Click **Check my progress** to verify the objective.

Sync changes with bucket

## Task 5. Make objects public

1. To allow public access to all files under the `endpointslambda` folder in your bucket, execute the following command:
    

```apache
gsutil -m acl set -R -a public-read gs://${BUCKET}
```



The above command is used to set access control lists (ACLs) on Cloud Storage buckets or objects. This makes all the objects in a bucket publicly readable.

The `-m` flag enables parallel processing, which means multiple operations (like setting ACLs on many files) will be executed simultaneously, speeding up the process. The `-R` flag applies the ACL recursively to all objects inside the bucket. Without this, it would only apply to the bucket itself, not its contents.

2. To confirm files are viewable by the public, open the following link in a new incognito or private browser window, replacing `<your-bucket-name>` with the full name of your bucket, not the environment variable:
    

```apache
http://storage.googleapis.com/<your-bucket-name>/endpointslambda/old.txt
```



This URL uses the Cloud Storage API link to view the object without authentication. Learn more about accessing public data from the [Accessing public data documentation](https://cloud.google.com/storage/docs/access-public-data).

## Task 6. Copy with different storage class

* Next, copy a file with [Nearline storage class](https://cloud.google.com/storage/docs/storage-classes) instead of the bucket's default Multi-regional storage class:
    

```apache
gsutil cp -s nearline ghcn/ghcn_on_bq.ipynb gs://${BUCKET}
```



The `gsutil cp` command is used to copy files from one location to another, either within Cloud Storage or from a local file system to Cloud Storage and `-s` flag specifies the **storage class** for the file being uploaded.

Click **Check my progress** to verify the objective.

Copy with different storage class

## Task 7. Check storage classes

1. Run the following to check the storage classes and view other detailed information about the objects in your bucket:
    

```apache
gsutil ls -Lr gs://${BUCKET} | more
```



2. Press the `space` key to continue viewing the rest of the command's output.
    

The output shows that the **ghcn\_on\_bq.ipynb** object has `NEARLINE` storage class while the other objects have `MULTI_REGIONAL` storage class.

Output:

```apache
gs://qwiklabs-xxx-xxxxxxxxxxxxxxxx-bucket/ghcn_on_bq.ipynb:
    Creation time:          Tue, 13 Aug 2019 20:19:27 GMT
    Update time:            Tue, 13 Aug 2019 20:19:27 GMT
    Storage class:          NEARLINE
    Content-Length:         980176
    Content-Type:           application/octet-stream
...

gs://qwiklabs-xxx-xxxxxxxxxxxxxxxx-bucket/endpointslambda/:
gs://qwiklabs-xxx-xxxxxxxxxxxxxxxx-bucket/endpointslambda/README.md:
    Creation time:          Tue, 13 Aug 2019 20:03:29 GMT
    Update time:            Tue, 13 Aug 2019 20:15:43 GMT
    Storage class:          MULTI_REGIONAL
    Content-Length:         452
    Content-Type:           text/markdown
...
```

3. You can use **Ctrl + c** to return to the command line.
    

---

## Solution of Lab

### Quick

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/manage-storage-configuration-using-gsutil/lab.sh
source lab.sh
```

---

### Manual

%[https://youtu.be/-rIPFgWdV2I]