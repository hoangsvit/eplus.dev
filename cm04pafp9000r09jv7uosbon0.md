---
title: "Analyzing Findings with Security Command Center - GSP1164"
seoTitle: "Analyzing Findings with Security Command Center - GSP1164"
seoDescription: "Security Command Center (SCC) is a security monitoring platform that helps users:

Discover security-related misconfigurations of Google Cloud resources."
datePublished: Thu Aug 22 2024 03:05:52 GMT+0000 (Coordinated Universal Time)
cuid: cm04pafp9000r09jv7uosbon0
slug: analyzing-findings-with-security-command-center-gsp1164
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752724997136/3dbb3c99-8ba0-4295-8747-02b012f75c6b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752725740878/8df4106f-a16f-4e0c-9a70-4434481abf25.png
tags: analyzing-findings-with-security-command-center-gsp1164, gsp1164, analyzing-findings-with-security-command-center

---

## Overview

[Security Command Center](https://cloud.google.com/security-command-center) (SCC) is a security monitoring platform that helps users accomplish the following:

* Discover security-related misconfigurations of Google Cloud resources.
    
* Report on active threats in Google Cloud environments.
    
* Fix vulnerabilities across Google Cloud assets.
    

In this lab, you learn about Security Command Center by exploring the service’s analyzed assets and export features.

### Objectives

In this lab, you learn how to perform the following tasks:

* Create a continuous export pipeline to Pub/Sub.
    
* Export and analyze SCC findings in a BigQuery table.
    

### Prerequisites

It is recommended that you're familiar with the following before starting this lab:

* Cloud computing concepts.
    
* Google Cloud console.
    
* The [severity classifications for findings](https://cloud.google.com/security-command-center/docs/finding-severity-classifications) (this is recommended but not required).
    
* Pub/Sub and BigQuery (recommended but not required).
    

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
    student-04-0c66ccfc4382@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    bxsiqeFNhD2b
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
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-01-f2f70ae70a7d`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-01-f2f70ae70a7d
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
ACCOUNT: student-04-0c66ccfc4382@qwiklabs.net

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
project = qwiklabs-gcp-01-f2f70ae70a7d
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Scenario

![5ce916afc496a60c.jpeg](https://cdn.qwiklabs.com/qO2i8mve9e0jOrBbEsDzPFfEkM1ea6S0a7mXdN%2FNS%2BA%3D align="left")

Cymbal Bank is an American retail bank with over 2,000 branches in all 50 states. It offers comprehensive debit and credit services that are built on top of a robust payments platform. Cymbal Bank is a digitally transforming legacy financial services institution.

Cymbal Bank was founded in 1920 under the name Troxler. Cymbal Group acquired the company in 1975 after it had been investing heavily in Cymbal Group's proprietary ATMs. As the bank grew into a national leader, they put strategic emphasis on modernizing the customer experience both in-person at their branches and digitally through an app they released in 2014. Cymbal Bank employs 42,000 people nationwide and, in 2019, reported $24 billion in revenue.

Cymbal Bank is interested in integrating a centralized security monitoring platform to help monitor threats and remediate vulnerabilities across their Google Cloud resources in their corporate banking applications. As a Cloud Security Engineer, you are tasked with learning about Security Command Center's export and analytics features so you can deliver a presentation to the CTO on the services' benefits.

## Task 1. Create a continuous export pipeline to Pub/Sub

Security Command Center can export security findings to external resources using several methods, including the following:

* Continuous exports to a BigQuery dataset.
    
* Continuous exports to Pub/Sub.
    
* One-time exports to CSV files.
    
* One-time exports to Cloud Storage buckets as JSON files.
    

In this task, you explore how to configure continuous exports of findings to Pub/Sub.

**Note:** Continuous exports of findings work only for newly created findings.

Continuous exports to Pub/Sub are typically used for forwarding findings to external security management systems such as Splunk or QRadar.

For the purposes of this lab, you export your findings to a Pub/Sub topic and then simulate an application by fetching the messages from a Pub/Sub subscription.

**Note:** You can check the documentation page to explore more about [What is Pub/Sub?](https://cloud.google.com/pubsub/docs/overview)

### Create a Pub/Sub topic and subscription

Before you can start configuring an SCC export, you first need to create a Pub/Sub topic and subscription.

1. On the Google Cloud console title bar, type `Pub/Sub` in the search field and press **Enter**. Then click on the uppermost search result, **Pub/Sub**.
    
2. Click the **Create Topic** button on the **Topics** page.
    
3. Enter in `export-findings-pubsub-topic` for the Topic ID.
    
4. Leave all other settings as their defaults and click **Create**.
    

This automatically kicks off the creation process for both a Pub/Sub topic and an associated subscription.

5. Click **Subscriptions** in the left-hand menu.
    
6. Click on **export-findings-pubsub-topic-sub**. If you don't see the subscription listed, refresh the browser page.
    

This provides you with a dashboard of statistics and metrics related to the messages published in this subscription.

### Create a continuous export of findings

1. In the Cloud console, on the **Navigation menu** (), click **Security &gt; Risk Overview** and then click **Settings** at the top of the page.
    
2. Click on the **Continuous Exports** tab.
    
3. Click the **Create Pub/Sub Export** button.
    
4. For the **Continuous export name**, enter in `export-findings-pubsub`.
    
5. For the **Continuous export description**, enter in `Continuous exports of Findings to Pub/Sub and BigQuery`.
    
6. For the **Project name**, select `qwiklabs-gcp-01-f2f70ae70a7d`, which is the project ID of the project you are working in. (*Do not* select Qwiklabs Resources).
    
7. In the **Select a Cloud Pub/Sub topic** field, select the **projects/**`qwiklabs-gcp-01-f2f70ae70a7d`/topics/export-findings-pubsub-topic.
    
8. Set the findings query to the following:
    

```apache
state="ACTIVE"
AND NOT mute="MUTED"
```

This query ensures that all new `ACTIVE` and `NOT MUTED` findings are forwarded to the newly created Pub/Sub topic.

**Note:** You might see the message that there are several findings matched. Remember that existing findings are **not** forwarded to the Pub/Sub topic.

9. Click **Save**.
    

You have now created a continuous export from Security Command Center to Pub/Sub.

### Create new findings to export to Pub/Sub

In this section, you create new findings and check how they are exported to Pub/Sub.

1. Open a new Cloud Shell session ().
    
2. Run the following command to create a new virtual machine:
    

```apache
gcloud compute instances create instance-1 --zone=us-central1-c \
--machine-type e2-micro \
--scopes=https://www.googleapis.com/auth/cloud-platform
```

3. Ensure you receive an output similar to the following.
    

**Output:**

```javascript
NAME: instance-1
ZONE: us-central-a
MACHINE_TYPE: e2-micro
PREEMPTIBLE:
INTERNAL_IP: 10.128.0.2
EXTERNAL_IP: 34.69.82.225
STATUS: RUNNING
```

**Note:** If you get an error message that says `ERROR: (gcloud.compute.instances.create) You do not currently have an active account selected`, re-run the command again.

This command creates a new VM instance with a public IP address and a default service account attached.

Performing this activity immediately generates three new vulnerability findings:

* Public IP address
    
* Default service account used
    
* Compute secure boot disabled
    

4. On the Google Cloud console title bar, type `Pub/Sub` in the search field and press **Enter**. Then click on the uppermost search result, **Pub/Sub**. Then click **Subscriptions** in the left-hand menu.
    
5. Select the **export-findings-pubsub-topic-sub** subscription.
    
6. Click the **Messages** tab.
    
7. Select the **Enable ack messages** checkbox.
    
8. Click the **Pull** button.
    

You should receive a list of messages in this subscription. These relate to the public IP address, default service account used, and compute secure boot disabled vulnerabilities.

**Note:** You can click the **Column display options** button in the Messages list to modify which message details display, such including the **body.finding.category** for more detail.

By pulling the messages from the Pub/Sub subscription, you have simulated the behavior of an application that can forward these messages to another security monitoring system such as Splunk.

Click **Check my progress** to verify the objective.

Create a continuous export pipeline to Pub/Sub

**Check my progress**

## Task 2. Export and analyze SCC findings with BigQuery

SCC findings can also be exported to a BigQuery dataset. This might be useful for building analytical dashboards that you can use to check what type of findings appear in your organization most often.

As of now, configuring continuous exports can only be set using commands (i.e. not in the console).

1. Open a Cloud Shell session (
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="left")
    
    ).
    
2. In your Cloud Shell session, run the following command to create a new BigQuery dataset:
    

```apache
PROJECT_ID=$(gcloud config get project)
bq --location=us-central1 --apilog=/dev/null mk --dataset \
$PROJECT_ID:continuous_export_dataset
```

3. You have not used an SCC command line interface in this project yet, so you need to enable the SCC service. Run the following command to enable the service in the current project:
    

```apache
gcloud services enable securitycenter.googleapis.com
```

4. Now create a new export by entering this command:
    

```apache
gcloud scc bqexports create scc-bq-cont-export --dataset=projects/qwiklabs-gcp-01-f2f70ae70a7d/datasets/continuous_export_dataset --project=qwiklabs-gcp-01-f2f70ae70a7d
```

Ensure you receive a similar output message to the following.

**Output:**

```apache
Created.
dataset: projects/qwiklabs-gcp-04-571fad72c1e8/datasets/continuous_export_dataset
mostRecentEditor: student-03-fbc57ac17933@qwiklabs.net
name: projects/102856953036/bigQueryExports/SCC-bq-cont-export
principal: service-org-616463121992@gcp-sa-scc-notification.iam.gserviceaccount.com
updateTime: '2023-05-31T15:44:22.097585Z'
```

Once new findings are exported to BigQuery, SCC creates a new table. You can now initiate new SCC findings.

5. Run the following commands to create three new service accounts without any IAM permissions and create three user-managed service account keys for them.
    

```bash
for i in {0..2}; do
gcloud iam service-accounts create sccp-test-sa-$i;
gcloud iam service-accounts keys create /tmp/sa-key-$i.json \
--iam-account=sccp-test-sa-$i@qwiklabs-gcp-01-f2f70ae70a7d.iam.gserviceaccount.com;
done
```

Once new findings are created in SCC, they are exported to BigQuery. For storing them, the export pipeline creates a new table called `findings`.

6. Run the following command to fetch information from BigQuery about newly created findings:
    

```powershell
bq query --apilog=/dev/null --use_legacy_sql=false  \
"SELECT finding_id,event_time,finding.category FROM continuous_export_dataset.findings"
```

Soon after you should receive output similar to the following.

**Output:**

```apache
+----------------------------------+---------------------+------------------------------------------+
|            finding_id            |     event_time      |                 category                 |
+----------------------------------+---------------------+------------------------------------------+
| c5235ebb04b140198874ce52080422b8 | 2024-11-27 08:08:08 | Persistence: Service Account Key Created |
| 94d933ee9803d0f1c807551fd22a0269 | 2024-11-27 08:08:04 | USER_MANAGED_SERVICE_ACCOUNT_KEY         |
+----------------------------------+---------------------+------------------------------------------+
```

**Note:** It may take **10+ minutes** for these findings to be generated. Rerun the above command if you don't receive a similar output.

Click **Check my progress** to verify the objective.

Export findings to a BigQuery dataset

**Check my progress**

### Export findings to a Cloud Storage bucket and create a BigQuery table

Security Command Center is typically enabled in pre-existing and mature Google Cloud infrastructures. As soon as the SCC is enabled, it starts scanning existing vulnerabilities and eventually might report thousands of findings on existing infrastructure.

The SCC interface might not provide the best way to sort and filter such findings, so exporting these findings to a BigQuery database is a common practice for running analytics against findings.

Direct exporting of findings to BigQuery is not supported yet. Instead, you can use a Google Cloud Storage bucket as an interim storage solution.

#### Create a Cloud Storage bucket

To export *existing* findings to a BigQuery interface, you need to export them first to a Cloud Storage bucket. In this section, you create the storage bucket.

1. In the Cloud console, on the **Navigation menu** (), click **Cloud Storage &gt; Buckets**.
    
2. Click the **Create** button.
    
3. Every bucket name in Google Cloud must be unique. Set the bucket name to **scc-export-bucket-**`qwiklabs-gcp-01-f2f70ae70a7d`.
    
4. Click **Continue**.
    
5. Set the **Location type** to **Region**.
    
6. Choose `us-central1` for the location.
    
7. Do not change any other settings. Scroll down the page and click **Create**.
    
8. Click the **Confirm** button when asked whether to "Enforce public access prevention" on this bucket.
    

#### Export existing findings as JSONL data

In this section, you export your findings for use in a BigQuery database.

1. In the Cloud console, on the **Navigation menu** (), click **Security &gt; Findings**.
    
2. Click the **Export** button.
    
3. From the dropdown list, select **Cloud Storage**.
    
4. For the project name, **Select** the Project ID as `qwiklabs-gcp-01-f2f70ae70a7d` (*do not* select Qwiklabs Resources).
    
5. Then select the Export path by clicking the **Browse** button.
    
6. Click the arrow next to the **scc-export-bucket-**`qwiklabs-gcp-01-f2f70ae70a7d` button.
    
7. Set the filename to `findings.jsonl` and click **Select**.
    
8. In the Format drop-down list, select **JSONL**.
    
9. Change the Time Range to **All time**.
    
    Do not modify the default findings query.
    
    The final "Export to" form should look similar to the following.
    

![Sample of export to configuration](https://cdn.qwiklabs.com/e1Bs3k4qI8jFPaRFOaNTcIRzNPTF3IIrLynUGWEh9hk%3D align="left")

10. Click the **Export** button.
    

#### Create a table in BigQuery

In this section, you use the exported findings data to create a table in BigQuery.

1. In the Cloud console, on the **Navigation menu** (), click **BigQuery &gt; BigQuery Studio**.
    
2. From the left-hand **Explore** menu, click on the **\+ Add data** button.
    
3. In a new **Add data** window, click on **Google Cloud Storage** as most popular data sources.
    
4. Click on **GCS: (Manual) BigLake External & External Tables** for manually create BigLake/External tables on GCS data and set the following parameters:
    

| **Setting** | **Value** |
| --- | --- |
| **Create table from** | `Google Cloud Storage` |
| **Select the file from GCS bucket** | `scc-export-bucket-qwiklabs-gcp-01-f2f70ae70a7d/findings.jsonl` |
| **File format** | `JSONL` |
| **Dataset** | `continuous_export_dataset` |
| **Table** | `old_findings` |
| **Schema** | Enable the "Edit as text" toggle |

5. Now paste in the following schema:
    

```json
[   
  {
    "mode": "NULLABLE",
    "name": "resource",
    "type": "JSON"
  },   
  {
    "mode": "NULLABLE",
    "name": "finding",
    "type": "JSON"
  }
]
```

Copied!content\_copy

6. Click the **Create table** button.
    
7. Once the new table is created, click the link in the notification that says, **Go to table**.
    
8. Click the **Preview** tab and confirm you can view your existing findings.
    

![BigQuery table values](https://cdn.qwiklabs.com/2k1HiII2HAmDhjRNaHLEFxrpUNBMLDxKbnWM%2FbyXufc%3D align="left")

Click **Check my progress** to verify the objective.

Export findings to a Cloud Storage bucket and create a BigQuery table

---

## Solution of Lab

### New Solution

%[https://youtu.be/PT5JmvRuiwU] 

```apache
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Analyze%20Findings%20with%20Security%20Command%20Center/TechCode.sh
sudo chmod +x TechCode.sh 
./TechCode.sh
```

---

### Old Solution

%[https://youtu.be/kH5T4UiRL7A] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1164/lab.sh
source lab.sh
```

**Script Alternative**

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Analyze%20Findings%20with%20Security%20Command%20Center/abhishek.sh
sudo chmod +x abhishek.sh
./abhishek.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757558678779/66d1ac9d-0618-4257-9e85-fe2f16ad608a.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757558689524/c4be0b6d-d143-4031-83f6-8130d37a5e29.png align="center")

Pubsub name

```apache
export-findings-pubsub-topic-sub
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757559778879/040e1bd4-2cb7-442b-968e-1cd9ac7761d5.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757559783487/569f56f9-03ac-44fe-b812-5d46b6e5d2bc.png align="center")

```apache
old_findings
```

**Paste this schema:**

```json
[   
  {
    "mode": "NULLABLE",
    "name": "resource",
    "type": "JSON"
  },   
  {
    "mode": "NULLABLE",
    "name": "finding",
    "type": "JSON"
  }
]
```

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>Note:</strong> It may take <strong>10+ minutes</strong> for these findings to be generated. Rerun the above command if you don't receive a similar output.</div>
</div>

```apache
bq query --apilog=/dev/null --use_legacy_sql=false \
"SELECT finding_id,event_time,finding.category FROM continuous_export_dataset.findings"
```

```apache
PROJECT_ID=$(gcloud projects list --format="value(projectId)" --limit=1)

bq load \
--source_format=NEWLINE_DELIMITED_JSON \
continuous_export_dataset.old_findings \
gs://scc-export-bucket-$PROJECT_ID/findings.jsonl \
resource:JSON,finding:JSON
```

---

### Manual

%[https://youtu.be/Jfhe9KxofRA]