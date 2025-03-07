---
title: "Enabling Sensitive Data Protection Discovery for Cloud Storage - GSP1281"
seoTitle: "Enabling Sensitive Data Protection Discovery for Cloud Storage - GSP12"
seoDescription: "Sensitive Data Protection is a fully managed service designed to help you discover, classify, and protect sensitive information. Key options include Sensiti"
datePublished: Fri Mar 07 2025 08:51:30 GMT+0000 (Coordinated Universal Time)
cuid: cm7yjdr8v000308l53mmg6kq1
slug: enabling-sensitive-data-protection-discovery-for-cloud-storage-gsp1281
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741335388509/573bf006-51a8-4d98-893c-11b2bf24bad8.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1741337469045/aa523b72-7887-480e-9204-bbd6d5d27d93.png
tags: enabling-sensitive-data-protection-discovery-for-cloud-storage-gsp1281, enabling-sensitive-data-protection-discovery-for-cloud-storage, gsp1281

---

## **Overview**

[Sensitive Data Protection](https://cloud.google.com/security/products/sensitive-data-protection) is a fully managed service designed to help you discover, classify, and protect sensitive information. Key options include Sensitive Data Discovery for continuously profiling your sensitive data, de-identification of sensitive data including redaction, and Cloud Data Loss Prevention (DLP) API to let you build in discovery, inspection, and de-identification into custom workloads and applications.

Imagine you have raw data in Cloud Storage that contains sensitive data, and you want to identify, protect, and redact it before the files get used by end users for analysis or to train machine learning models. Sensitive Data Protection can help!

In this lab, you begin by enabling discovery for continuous monitoring of sensitive data in Cloud Storage. Based on the discovery results, you create and modify custom, reusable templates for inspection and de-identification (redaction) of Cloud Storage files. Last, you use those templates to run jobs for deeper inspection and redaction of specific sensitive data types in your Cloud Storage files.

### What you'll learn

In this lab, you learn how to:

* Enable discovery for continuous monitoring of sensitive data in Cloud Storage files
    
* Create and modify reusable templates for inspection and de-identification jobs
    
* Review and interpret discovery results
    
* Run inspection and de-identification jobs with the option enabled to write job results to BigQuery
    

## **Setup and requirements**

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
    student-00-381b96164d24@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    am9hDJzlfxGK
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

## **Task 1. Enable discovery for continuous monitoring of Cloud Storage**

The discovery service within Sensitive Data Protection empowers you to identify where sensitive and high-risk data reside across your organization. When you create a discovery scan configuration, Sensitive Data Protection scans the resources you select for review and generates [data profiles](https://cloud.google.com/sensitive-data-protection/docs/data-profiles), which are a set of insights on the [infoTypes](https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference) (types of sensitive data) identified and metadata on data risk and sensitivity level.

In this task, you create a discovery scan to automatically profile data across all Cloud Storage buckets in the project. As it can take some time for the full discovery results to be generated, you are provided with highlights and summaries of the key results in the last section of this task.

### Create and schedule a scan configuration

1. In the Google Cloud console, click on the **Navigation menu** () &gt; **Security**.
    
2. Under **Data Protection**, click **Sensitive Data Protection**.
    
3. Click the tab named **Discovery**.
    
4. Under **Cloud Storage**, click **Enable**.
    
5. For **Select a discovery type**, leave the option enabled for **Cloud Storage**, and click **Continue**.
    
6. For **Select scope**, leave the option enabled for **Scan selected project**, and click **Continue**.
    
7. For **Managed schedules**, leave the default, click **Continue**.
    
    In this lab, you are scheduling the discovery scan to run immediately after creation, but there are many options for scheduling scans to run on a periodic basis (such as daily or weekly) or after certain events (such as when an inspection template is updated.)
    
8. For **Select inspection template**, leave the option enabled for **Create a new inspection template**.
    
9. Leave all other defaults, and click **Continue**.
    
    By default, the new inspection template includes all existing infoTypes.
    
    For **Confidence threshold**, the default for **Minimum** [**likelihood**](https://cloud.google.com/sensitive-data-protection/docs/likelihood) is **Possible**, which means that you get only the findings that are evaluated as **Possible**, **Likely**, and **Very\_Likely**.
    
    In a later task, you modify this inspection template to explore other options for infoTypes and confidence threshold.
    
10. For **Add actions**, enable **Publish to Security Command Center**.
    
11. For **Add actions**, also enable **Save data profile copies to BigQuery** and provide the dataset and table (which have been pre-created in this lab) to save the results to BigQuery.
    

| **Property** | **Value** |
| --- | --- |
| **Project ID** | `qwiklabs-gcp-03-aefa7d72a62a` |
| **Dataset ID** | **cloudstorage\_discovery** |
| **Table ID** | **data\_profiles** |

12. Click **Continue**.
    
13. For **Set location to store configuration**, leave the option enabled for **us (multiple regions in United States)**, and click **Continue**.
    
14. Provide a display name for this config: **Cloud Storage Discovery**
    
15. Click **Create**, and then confirm the creation by clicking **Create configuration**.
    

Click *Check my progress* to verify the objective.

Create and schedule a scan configuration.

Check my progress

### What discovery results can tell you about your data

**Note:** After the configuration scan begins, it may be some time before full results are available.

The images below display the key results of enabling discovery for Cloud Storage in this lab environment.

For the Cloud Storage data included in this lab environment, the results have flagged the potential presence of several infoTypes including US Social Security numbers, which are highly sensitive data.

#### **Image 1. Discovery for Cloud Storage enabled in UI**

Two profiles have been identified for Cloud Storage: one with low sensitivity (empty bucket to receive output from jobs) and one with high sensitivity (bucket containing raw data).

![Discovery for Cloud Storage enabled in UI](https://cdn.qwiklabs.com/cU42XZfoYXylTX4jMMnQ3UPIAC%2Ba5%2B0wzOdVts%2B2yB0%3D align="left")

#### **Image 2. Sensitive data inventory details**

This section of the results provides the global location of the two data profiles. In this example, both are in the `us-central1` region.

![Sensitive data inventory details](https://cdn.qwiklabs.com/nJRkYDnPkmb3TjgqOmACI20eNJ6TsbiWw5By5FFTAHc%3D align="left")

#### **Image 3. Cloud Storage profiles with infoTypes**

The discovery results also provide the key infoTypes identified in Cloud Storage: US Social Security number, date of birth, email address, name, etc.

![Cloud Storage profiles with infoTypes](https://cdn.qwiklabs.com/mpG%2Fhu2U2IaS%2Fwqgn%2BXu0yOfuC2X4Ls8dwfZQsP0TAw%3D align="left")

#### **Image 4. Profiles tab of the discovery results**

The **Profiles** tab identifies the sensitivity and risk levels for each specific Cloud Storage bucket name: one with low sensitivity (empty bucket to receive output from jobs) and one with high sensitivity (bucket containing raw data including US Social Security number).

In this lab environment, be sure to select the **Location type** as **Region** &gt; `us-central1` to view the profiles.

![Discovery profiles of the two Cloud Storage buckets](https://cdn.qwiklabs.com/OY1SgqwpCbrvNPHtCm3lPnqng8JrGK1fOqPltdyQkOs%3D align="left")

## **Task 2. Create and modify reusable templates for inspecting and redacting specific infoTypes**

Now that you know US Social Security numbers have been identified in your Cloud Storage files, you can start making a plan to inspect and redact this sensitive data before the files are used to train machine learning models.

In this task, you configure two [templates](https://cloud.google.com/sensitive-data-protection/docs/concepts-templates):

1. Modify an existing inspection template to find all instances of US Social Security numbers in your Cloud Storage files.
    
2. Create a de-identify template to redact US Social Security numbers from structured data files (such as text and CSV).
    

Later in the lab, you use these templates to further inspect and redact the US Social Security numbers by running inspection and de-identify jobs.

### Modify an existing inspection template

Recall that when you enabled discovery for Cloud Storage, a new inspection template was created with several default values, including those for infoTypes and confidence threshold.

In this section, imagine that you have already reviewed the full discovery results, and now, you want to modify that inspection template to focus on US Social Security numbers.

1. Return to the [**Sensitive Data Protection**](https://console.cloud.google.com/security/sensitive-data-protection/) overview page by clicking **Navigation menu** () &gt; **Security** &gt; **Sensitive Data Protection** (under **Data Protection**).
    
2. Click the **Configuration** tab.
    
3. In the **Templates** tab, locate the line for the template generated by discovery (such as template ID 7216194786087173213).
    
    Note this template ID for use later in Task 4.
    
4. Under **Actions** for this template ID, click on the three vertical dots, and select **Edit**.
    
5. Update **Display name** to `Inspection Template for US SSN`.
    
6. Update **Description** to `This template was created as part of a Sensitive Data Protection profiler configuration and was modified for deeper inspection for US Social Security numbers.`
    
7. For **InfoTypes**, click **Manage InfoTypes**.
    
8. Enable the checkbox for **US\_SOCIAL\_SECURITY\_NUMBER**, and deselect all other options.
    
    You can easily deselect all other options by clicking on **Select all rows** (under the Filter icon), and clicking it again to deselect all values.
    
9. Click **Done** to return to the inspection template.
    
10. For **Confidence threshold ("minimum likelihood")**, select **Unlikely**.
    
    In addition to the findings that are evaluated as **Possible**, **Likely**, and **Very\_Likely**, the results will now include **Unlikely** to support further review of potential instances of US Social Security numbers.
    
11. Leave all other defaults, and click **Save**.
    
12. Click **Confirm save**.
    

### Create a de-identify template for structured data

1. Return to [**Sensitive Data Protection**](https://console.cloud.google.com/security/sensitive-data-protection/) overview page.
    
2. Click the **Configuration** tab.
    
3. In the **Templates** tab, click **Create Template**.
    
4. Provide the following values to create the de-identify template:
    

| **Property** | **Value** |
| --- | --- |
| **Template type** | **De-identify (remove sensitive data)** |
| **Data transformation type** | **Record** |
| **Template ID** | `us_ssn_deidentify` |
| **Display name** | `De-identification Template for US SSN` |
| **Location type** | **Multi\_region &gt; global (Global)** |

5. Leave all other default values, and click **Continue**.
    
6. For **Configure de-identification** &gt; **Transformation Rule**, add the following field names by typing the name and then hitting `enter` key: **ssn** and **email**
    
7. For the **Transformation type**, select **Primitive field transformation**.
    
8. For **Transformation method** &gt; **Transformation**, select **Replace**.
    
    This option replaces the contents of each instance for the fields that you provided in step 6 (ssn and email).
    
9. For **Transformation method** &gt; **Replace type**, select **String**.
    
10. For **Transformation method** &gt; **String value**, leave the default value of `[redacted]`.
    
11. Click **\+ Add Transformation Rule** to add a second rule.
    
12. For **Transformation Rule** for this second rule, add the following field name by typing the name and then hitting `enter` key: **message**
    

In this lab environment, there are CSV files in Cloud Storage that contain a column (or field) named **message**, which stores the example chat messages between customers and service agents.

13. For **Transformation type**, select **Match on infoType**, and then click **Add Transformation**.
    
14. For **Transformation Method**, select **Replace with infoType name**.
    
15. For **InfoTypes to transform**, select **Any detected infoTypes defined in an inspection template or inspect config that are not specified in other rules**.
    
    This option applies infoType inspection and redaction to any files with a field called **message** when this template is used to run a job.
    
16. Click **Create**.
    

Click *Check my progress* to verify the objective.

Modify the existing inspection template and create a de-identify template for structured data.

Check my progress

## **Task 3. Review initial discovery results**

**Note:** As mentioned previously, after the configuration scan begins, it may be some time before full results are available.

Now that some time has passed while you created the templates, some results will be available in the Looker dashboard that is generated by the discovery scan.

In this task, you review the initial discovery results that are provided in a Looker dashboard sourced from the data profile information saved to BigQuery in Task 1.

### View summary of results in Looker dashboard

1. Return to [**Sensitive Data Protection**](https://console.cloud.google.com/security/sensitive-data-protection/) overview page.
    
2. Under **Discovery** &gt; **Scan Configurations** tab, locate the row named **Cloud Storage Discovery**. Under **Looker Studio**, click **Looker** for that row.
    
3. For **Requesting Authorization**, click **Authorize**.
    
4. In the dialog window for **Choose an account from qwiklabs.net**, select `student-00-381b96164d24@qwiklabs.net`.
    
5. Review **Summary Overview**.
    
    Notice that there are data tiles summarizing key information such as data risk, data sensitivity, and asset types.
    

![Summary Overview page](https://cdn.qwiklabs.com/68UPH6j8n%2FBqmOYuhIDhYeMJu76iUR28S%2F1OzK%2B7OxU%3D align="left")

6. Click on **Advanced Exploration (Asset Details)**.
    
7. Locate the row that has infoType of `US_SOCIAL_SECURITY_NUMBER`. Under Action, click **Open** for that row.
    

![Advanced Exploration (Asset Details)](https://cdn.qwiklabs.com/7XrowdIwVmi4cQ6QcNUYEmyU920dhNL69jlRxKz%2BWog%3D align="left")

### View detailed results in Sensitive Data Protection

1. Review the opened page, which is titled **Sensitive Data Discovery: File store profile details**.
    
    Notice that there are many details provided on the resources scanned, including IAM permissions.
    
2. Expand the arrow next to **View Detailed IAM Permissions**.
    
3. Expand the arrow next to **Storage Admin**.
    

You can see that another user (`student-03-1f6a900573d8@qwiklabs.net`) is listed as a Cloud Storage Admin and therefore has full access to the data.

Remain on this page, and proceed to the next task.

![Sensitive Data Discovery: File store profile details](https://cdn.qwiklabs.com/sQ7nQj3AA30A3eqlvuVwkPKuFLIBapkX8hE86jHfcuA%3D align="left")

## **Task 4. Create and run an inspection job**

For Sensitive Data Protection, a typical workflow after a discovery scan is to run a more detailed [inspection job](https://cloud.google.com/sensitive-data-protection/docs/creating-job-triggers) for deeper investigation into specific infoTypes.

Recall that in Task 2, you created an inspection template for deeper inspection for US Social Security numbers. In this task, you use that template to create and run the inspection job.

### Create and run inspection job

1. Click **Create inspection job**.
    
2. For **Choose input data**, provide the following values:
    

| **Property** | **Value** |
| --- | --- |
| **Job ID** | `us_ssn_inspection` |
| **Location type** | **Multi\_region &gt; us (multiple regions in United States)** |
| **Storage type** | **Google Cloud Storage** |
| **Location type** | **Scan a single file or folder path** |
| **URL** | **gs://**`qwiklabs-gcp-03-aefa7d72a62a`\-input/ (Be sure to add the trailing `/` at end of URL) |
| **Scan recursively** | Enable this option (Be sure to add a trailing `/` to the URL above, so that this option can be enabled) |
| **Sampling** | Increase value to **100%** |
| **Sampling method** | **No sampling** |
| **Files** | Select **TEXT** and **CSV** (and deselect all other options), and click **OK** |

3. Click **Continue**.
    
4. For **Inspection template** &gt; **Template name**, add the path to the inspection template as provided below, replacing `TEMPLATE_ID` with the Template ID for the inspection template that you modfied in Task 2 (such as 7216194786087173213):
    
    `projects/qwiklabs-gcp-03-aefa7d72a62a/locations/global/inspectTemplates/TEMPLATE_ID`
    
    To view the template ID again, navigate to the **Configuration** tab of the [Sensitive Data Protection](https://console.cloud.google.com/security/sensitive-data-protection/) overview page.
    

**Note:** Make sure there are no spaces in the inspection template path when you add it to the **Template name**.

5. Leave all other defaults, and click **Continue**.
    
6. For **Add actions**, enable the option for **Save to BigQuery**, and enable the checkbox for **Include quote**.
    
    This option enables the job to copy both the location and contents of the potentially sensitive data to the BigQuery.
    
7. Provide the dataset and table (which have been pre-created in this lab) to save the results to BigQuery:
    

| **Property** | **Value** |
| --- | --- |
| **Project ID** | `qwiklabs-gcp-03-aefa7d72a62a` |
| **Dataset ID** | **cloudstorage\_inspection** |
| **Table ID** | **us\_ssn** |

8. For **Add actions**, also enable **Publish to Security Command Center**.
    
9. Click **Continue**.
    
10. Leave the default for **Schedule** as **None (run the one-off job immediately upon creation)** to run the job immediately, and click **Continue**.
    

Similar to discovery scans, you can schedule inspection jobs to run on a specific schedule. In this case, you run the job immediately after it is created.

11. Click **Create**, and then confirm the creation by clicking **Confirm create**.
    

Remain on this page, and wait for the job to complete.

When the job has a status of **Done**, proceed to the next section.

### View inspection job results in BigQuery

In the previous section, you selected to save the inspection results to the BigQuery table named **us\_ssn**. With one click below, you can easily be routed to BigQuery to review the results.

1. Click **View findings in BigQuery**.
    
2. In BigQuery, click **Preview** to see the contents of the table.
    
    Notice the column named **quote**, which contains a copy of the exact value that has been flagged by the inspection job for additional review. You can also scroll to the right of the table and review the column named **container name** to see the location (specifically filename) containing the quoted value.
    

Click *Check my progress* to verify the objective.

Create and run an inspection job.

Check my progress

## **Task 5. Create and run a de-identify job**

With Sensitive Data Protection, you mitigate sensitive data vulnerabilities in Cloud Storage by running a [de-identification](https://cloud.google.com/sensitive-data-protection/docs/deidentify-storage-console) job to create new copies of Cloud Storage files with the sensitive data redacted. These new copies can be shared with downstream workflows, instead of the original versions that contain the sensitive data.

In this task, you create and run a de-identification job using the de-identify template that you created in Task 2.

1. Return to [**Sensitive Data Protection**](https://console.cloud.google.com/security/sensitive-data-protection/) overview page.
    
2. Click on the **Inspection** tab, and then click **Create job and job triggers**.
    
3. For **Choose input data**, provide the following values:
    

| **Property** | **Value** |
| --- | --- |
| **Job ID** | `us_ssn_deidentify` |
| **Location type** | **Multi\_region &gt; us (multiple regions in United States)** |
| **Storage type** | **Google Cloud Storage** |
| **Location type** | **Scan a bucket with optional include/exclude rules** |
| **Bucket name** | `qwiklabs-gcp-03-aefa7d72a62a`\-input |
| **Sampling** | Increase value to **100%** |
| **Sampling method** | **No sampling** |
| **Files** | Select **TEXT** and **CSV** (and deselect all other options), and click **OK** |

**Note:** Make sure there are no spaces in the bucket name.

4. For **Exclude paths**, click **Add exclude regex**. For **Exclude paths**, type: `ignore`
    

The **Exclude paths 1** value is now:

`gs://qwiklabs-gcp-03-aefa7d72a62a-input/ignore`

This option allows you to tell the de-identify job to ignore files in that subdirectory named `ignore`.

5. Leave all other default values, and click **Continue**.
    

Note that you do not add a value for the inspection template. In an upcoming step, you define the value for the de-identify template instead.

6. For **Configure detection**, leave all default values, and click **Continue**.
    
7. For **Add actions**, scroll down the page to find and enable **Make a de-identified copy**.
    
8. For **Structured de-identification template**, enter the de-identify template that you previously created for structured files (such as CSV and text files):
    
    `projects/qwiklabs-gcp-03-aefa7d72a62a/locations/global/deidentifyTemplates/us_ssn_deidentify`
    

**Note:** Make sure there are no spaces in the de-identification template path.

9. Enable **Export transformation details to BigQuery** and provide the dataset and table (which have been pre-created in this lab) to save the results to BigQuery.
    

| **Property** | **Value** |
| --- | --- |
| **Project ID** | `qwiklabs-gcp-03-aefa7d72a62a` |
| **Dataset ID** | **cloudstorage\_transformations** |
| **Table ID** | **deidentify\_ssn\_csv** |

10. For the **Cloud Storage output location**, specify:
    

`gs://qwiklabs-gcp-03-aefa7d72a62a-output`

This value tells the job to write the redacted output to the second bucket that has been pre-created in this lab for output files.

11. For **Files**, select **TEXT** and **CSV** (and deselect all other options), and click **OK**.
    
12. Click **Continue**.
    
13. Leave the default for **Schedule** as **None** to run the job immediately, and click **Continue**.
    

Similar to inspection jobs, the options for scheduling include running the de-identify job on a periodic schedule (such as weekly).

14. Click **Create**, and then confirm the creation by clicking **Confirm create**.
    

Remain on this page, and wait for the job to complete.

When the job has a status of **Done**, leave this browser tab open, and proceed to the next section.

### View de-identified transformation details in BigQuery

In the previous section, you selected to save the de-identify details to the BigQuery table named **deidentify\_ssn\_csv**. In this section, you navigate to BigQuery to view the transformation details.

1. In the Google Cloud console, click on the **Navigation menu** () &gt; **BigQuery**.
    
2. In the **Explorer** pane, expand `qwiklabs-gcp-03-aefa7d72a62a` &gt; cloudstorage\_transformations, and click on the table named **deidentify\_ssn\_csv**.
    
3. Click **Preview** to see the results.
    
    Notice the columns named **container\_name** and **transformation.type**, which provides the details on the files that were de-identified using specific transformation rules.
    

### View de-identified output

1. Return to the inspection job results page, and click on **Configuration**.
    
2. Scroll down to **Actions** &gt; **Output bucket for de-identified Cloud Storage Data**.
    
3. Click on the bucket link (gs://`qwiklabs-gcp-03-aefa7d72a62a`\-output) to be routed to that Cloud Storage Bucket and review the de-identify files.
    

Click *Check my progress* to verify the objective.

Create and run a de-identify job.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=0K6Iz_RT670]