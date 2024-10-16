---
title: "Google Cloud Storage - Bucket Lock - GSP297"
seoTitle: "Google Cloud Storage - Bucket Lock - GSP297"
seoDescription: "In this lab, you learn how to use Cloud Storage Bucket Lock feature which allows you to configure a data retention policy for a Cloud Storage bucket that go"
datePublished: Fri Jul 26 2024 09:39:15 GMT+0000 (Coordinated Universal Time)
cuid: clz2igcb1001009l6anoy1epp
slug: google-cloud-storage-bucket-lock-gsp297
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721986458901/c0e9db6e-2e87-4cd8-a0be-668badc38deb.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721986703486/3172a4d6-bc41-45a1-a5a6-9aed1c5f8fb7.png

---

## **Overview**

In this lab, you learn how to use Cloud Storage Bucket Lock feature which allows you to configure a data retention policy for a Cloud Storage bucket that governs how long objects in the bucket must be retained. The feature also allows you to lock the data retention policy, permanently preventing the policy from being reduced or removed.

Combined with Cloud Storage [detailed audit logging mode](https://cloud.google.com/storage/docs/org-policy-constraints#audit-logging), which logs Cloud Storage request and response details, or [Object Lifecycle Management](https://cloud.google.com/storage/docs/lifecycle), Bucket Lock can help with [regulatory and compliance requirements](https://cloud.google.com/storage/docs/bucket-lock#compliance), such as those associated with FINRA, SEC, and CFTC. You can also use Bucket Lock to address certain health care industry retention regulations.

### What you'll learn

In this lab you will learn how to:

* Create a bucket
    
* Define an object retention policy
    
* Remove a retention policy
    

## **Task 1. Create a new bucket**

1. Define an environment variable named **Cloud Storage\_BUCKET** and use your Project ID as the bucket name. Use the following command which uses the Cloud SDK to get your Project ID:
    

```powershell
export BUCKET=$(gcloud config get-value project)
```

2. Next, make a new bucket using the following gsutil command:
    

```powershell
gsutil mb "gs://$BUCKET"
```

3. Click **Authorize**.
    

Click **Check my progress** to verify the objective.

Create a storage bucket

**Check my progress**

## **Task 2. Define a Retention Policy**

Consider a financial institution branch with a [SEC Rule 17a-4](https://en.wikipedia.org/wiki/SEC_Rule_17a-4) requirement to retain financial transaction records for 6 years (10 seconds for this lab). The Branch IT Administrator, a technical administrator responsible for day-to-day records management and retention within the branch, wants to create a Cloud Storage bucket with a 10 second Retention Policy to help with this requirement.

Look at how to set up a Retention Policy on a bucket.

1. You can define the Retention Policy using seconds, days, months, and years with the Cloud Storage gsutil tool. As an example, create a Retention Policy for 10 seconds:
    

```powershell
gsutil retention set 10s "gs://$BUCKET"
```

**Note:** You can also use `10d` for 10 days, `10m` for 10 months or `10y` for 10 years. To learn more, use the command: `gsutil help retention set`.

2. Verify the Retention Policy for a bucket:
    

```powershell
gsutil retention get "gs://$BUCKET"
```

Sample output:

```powershell
Retention Policy (UNLOCKED):
  Duration: 10 Second(s)
  Effective Time: Tue, 23 Jan 2018 01:04:05 GMT
```

The `Effective Time` defines when the policy took effect on the bucket.

3. Now that the bucket has a Retention Policy, add a transaction record object to test it:
    

```powershell
gsutil cp gs://spls/gsp297/dummy_transactions "gs://$BUCKET/"
```

4. Review the retention expiration:
    

```powershell
gsutil ls -L "gs://$BUCKET/dummy_transactions"
```

Sample output:

```powershell
gs://YOUR_BUCKET_NAME/dummy_transactions:
    Creation time:          Tue, 23 Jan 2018 00:45:21 GMT
    Update time:            Thu, 25 Jan 2018 20:14:49 GMT
    Retention Expiration:   Thu, 25 Jan 2018 20:14:59 GMT
```

When the Retention Policy expires for the given object, it can then be deleted.

To extend a Retention Policy, use the `gsutil retention set` command to update the Retention Policy.

Click **Check my progress** to verify the objective.

Set up Retention Policy

**Check my progress**

## **Task 3. Lock the Retention Policy**

While unlocked, you can remove the Retention Policy from the bucket or reduce the retention time. After you lock the Retention Policy, it cannot be removed from the bucket or the retention time reduced.

1. Lock the Retention Policy:
    

```powershell
gsutil retention lock "gs://$BUCKET/"
```

Sample output to confirm the lock:

```powershell
This will PERMANENTLY set the Retention Policy on gs://YOUR-BUCKET-NAME to:

  Retention Policy (UNLOCKED):
    Duration: 10 Second(s)
    Effective Time: Wed, 07 Feb 2018 01:37:52 GMT

This setting cannot be reverted!  Continue? [y|N]:
```

2. Enter `y` to confirm.
    

**Note:** To view the Retention Policy for a bucket recall the following command:

`gsutil retention get "gs://$Cloud Storage_BUCKET/"`

Once locked the Retention Policy can't be unlocked and can only be extended. The Effective Time is updated if the amount of time since it was set or last updated has exceeded the Retention Policy.

Click **Check my progress** to verify the objective.

Lock the Retention Policy

**Check my progress**

## **Task 4. Temporary hold**

Continuing the example above, consider the bucket already configured with a 10 second locked Retention Policy.

Financial regulators decide to perform an audit of one of the branch's customers, and require that those records are retained for the duration of the audit. Some of the Cloud Storage objects for this customer are close to their expiration date, and will soon be automatically deleted.

To handle this, when regulatory investigation begins, the Branch IT Administrator sets the temporary hold flag for each of the objects related to the audit. While that flag is set, the objects will continue to be protected from deletion, even if they are older than 10 seconds.

1. Set a temporary hold on the transactions object:
    

```powershell
gsutil retention temp set "gs://$BUCKET/dummy_transactions"
```

2. By placing a temporary hold on the object, delete operations are not possible unless the object is released from the hold. As an example, attempt to delete the object:
    

```powershell
gsutil rm "gs://$BUCKET/dummy_transactions"
```

You should see the following error message:

```powershell
AccessDeniedException: 403 Object 'YOUR-BUCKET-NAME/dummy_transactions is under active Temporary hold and cannot be deleted, overwritten or archived until hold is removed.
```

3. Once regulators conclude their audit, the Branch IT Administrator removes the temporary hold. Use the following command to release the hold:
    

```powershell
gsutil retention temp release "gs://$BUCKET/dummy_transactions"
```

Click **Check my progress** to verify the objective.

Set up Temporary Hold

**Check my progress**

4. Now you can delete the file unless the Retention Policy for the file hasn't expired. Otherwise wait a few moments and try again.
    

```powershell
gsutil rm "gs://$BUCKET/dummy_transactions"
```

## **Task 5. Event-based holds**

Continuing the example above, consider the bucket already configured with a 10 second locked Retention Policy.

In addition to retaining financial transaction records for 10 seconds, the branch also needs to retain loan records for 10 seconds starting from the date that the loan is paid off. To accomplish this, the Branch IT Administrator uploads loan records as new Cloud Storage objects with the event-based hold flag set.

Each day, as the loans are paid off, the Branch IT Administrator unsets the event-based hold flag on the corresponding Cloud Storage objects. No further action is necessary, since Cloud Storage automatically calculates a new Retention Policy expiring 10 seconds from that day.

Event-based holds allow you to delay a Retention Policy from counting down until the hold is released. Event-based holds can be managed per object and set by default in bucket properties when new objects are added to a bucket.

Look at enabling event-based holds for a loan.

1. Enable the default event-based hold for your bucket using the following command:
    

```powershell
gsutil retention event-default set "gs://$BUCKET/"
```

2. Add an example loan into the bucket using the following command:
    

```powershell
gsutil cp gs://spls/gsp297/dummy_loan "gs://$BUCKET/"
```

3. Verify that the event-based hold is enabled for your newly added loan using the following command:
    

```powershell
gsutil ls -L "gs://$BUCKET/dummy_loan"
```

You should see a similar output:

```powershell
gs://YOUR-BUCKET-NAME/dummy_loan:
    Creation time:          Fri, 26 Jan 2018 07:40:28 GMT
    Update time:            Fri, 26 Jan 2018 07:40:28 GMT
    Event-Based Hold:       Enabled
```

Notice that Retention Expiration isn't defined. The Retention Expiration time is not available until the Event-Based hold is released on the object.

4. When the loan is paid off, the Branch IT Administrator then releases the event-based hold using the following command:
    

```powershell
gsutil retention event release "gs://$BUCKET/dummy_loan"
```

You should see a similar output:

```powershell
Releasing Event-Based Hold on gs://YOUR-BUCKET-NAME/dummy_loan...
```

5. After an event-based hold is released, the bucket Retention Policy takes effect. Verify that the example loan now has a Retention Expiration field using the following command:
    

```powershell
gsutil ls -L "gs://$BUCKET/dummy_loan"
```

You should see the following:

```powershell
dummy_loan:
    Creation time:          Fri, 26 Jan 2018 08:14:16 GMT
    Update time:            Fri, 26 Jan 2018 08:14:25 GMT
    Retention Expiration:   Fri, 26 Jan 2018 08:14:45 GMT
```

**Note:** You can also set an event-based hold for a specific object by using the following command:

`gsutil retention event set "gs://bucket-name/object-name"`

Click **Check my progress** to verify the objective.

Create Event-based holds

**Check my progress**

## **Task 6. How to remove a Retention Policy**

Unfortunately, the branch shuts down its lending operations. The Branch IT Administrator still needs to maintain the existing records for their full duration, but no longer expects to produce records in the bucket. After the last loan Retention Period has expired and no longer subject to a hold, the Branch IT Administrator can then delete the empty bucket. The bucket can be deleted even though it has a locked Retention Policy because it contains no data subject to retention.

* Delete an empty bucket using the following command:
    

```powershell
gsutil rb "gs://$BUCKET/"
```

---

### Answer of Lab

%[https://www.youtube.com/watch?v=s-psIayBLg8&ab_channel=QuickLab%E2%98%81%EF%B8%8F] 

```powershell
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Google%20Cloud%20Storage%20Bucket%20Lock/quicklabgsp297.sh
sudo chmod +x quicklabgsp297.sh
./quicklabgsp297.sh
```