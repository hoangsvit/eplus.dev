---
title: "Discover and Protect Sensitive Data Across Your Ecosystem: Challenge Lab - GSP522"
seoTitle: "Discover and Protect Sensitive Data Across Your Ecosystem: Challenge Lab - GSP522"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-07-22T13:00:34.108Z
cuid: cmrw3bo2z000009j1e6br4wni
slug: discover-and-protect-sensitive-data-across-your-ecosystem-challenge-lab-gsp522
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/f204626c-e3e5-4a3a-b0cb-5d4168889fd3.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/ce979d90-aa90-4622-90d4-b313a1b2b602.png
tags: discover-and-protect-sensitive-data-across-your-ecosystem-challenge-lab-gsp522, discover-and-protect-sensitive-data-across-your-ecosystem-challenge-lab, gsp522

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Discover and Protect Sensitive Data Across Your Ecosystem](https://www.skills.google/course_templates/1177) course. Are you ready for the challenge?

## **Challenge Scenario**

You are a data engineer at Cymbal Cars and have been tasked with identifying and protecting sensitive data for your customers (car owners) across your organization's data ecosystem.

Your colleagues have previously completed some work to identify and redact sensitive data in your organization's Cloud Storage files and BigQuery tables (particularly US Social Security numbers) and in your organization's Gen AI model responses.

To ensure your Cloud Storage files and BigQuery assets continue to be periodically scanned and protected, you want to set up Sensitive Data Protection discovery and run jobs to identify and redact other sensitive data such as credit card numbers.

For your organization's Gen AI models, you also want to expand on your colleague's previous work to redact responses when credentials are identified in responses.

In this challenge, you use your knowledge of Sensitive Data Protection tools to implement discovery and protection for data in Cloud Storage and BigQuery and use the Python Client for Cloud Data Loss Prevention (DLP) API to identify and redact Gen AI model responses that contain credentials.

### Topics tested

*   Creating and scheduling discovery scan configurations for Cloud Storage
    
*   Creating de-identify templates and running de-identify jobs on Cloud Storage files
    
*   Creating IAM tags for sensitive data and applying them to BigQuery data to grant conditional access
    
*   Writing Python functions to redact and block Gen AI model responses containing sensitive data as identified by the Cloud Data Loss Prevention (DLP) API
    

## **Setup and requirements**

Throughout the lab, use the following details for this lab environment:

*   Log into the Google Cloud console as Username 1 ([`student-04-8a14d2e0471e@qwiklabs.net`](mailto:student-04-8a14d2e0471e@qwiklabs.net)).
    
*   For **Project ID**, use: `qwiklabs-gcp-04-fa4f5930c2ec`
    
*   For **Location**, use: `us-west4` (unless otherwise specified)
    

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## **Task 1. Enable sensitive data protection for Cloud Storage**

Your team has a Cloud Storage bucket named **gs://**`qwiklabs-gcp-04-fa4f5930c2ec`**\-car-owners** that contains files for interactions with car owners. Most of these files have already had sensitive data redacted by your colleagues but there are some new CSV files (.csv) that have been added to bucket and contain credit card numbers (for example, `sample-chat-log-data-10.csv`).

Your goals are to identify and redact credit card numbers in the new CSV files and enable daily discovery for the bucket to monitor for new instances of sensitive data moving forward.

To help you achieve these goals, complete the following subtasks.

Expand the hints below for some helpful guidance to get started!

### Create and schedule a discovery scan configuration to run daily for Cloud Storage

**Helpful hint for discovery scan!**

| **Property** | **Value** |
| --- | --- |
| **Select scope** | **Scan selected project** |
| **Managed schedules** | Edit **Default schedule** to specify **Reprofile Daily** for **On a schedule** and **When inspect template changes** |
| **Select inspection template** | **Create a new inspection template** |
| **Save data profile copies to BigQuery** | Set **Dataset ID** to **cs\_discovery** and **Table ID** to **cs\_data\_profiles** in the current project |
| **Set location to store configuration** | **Multi\_region** > **us (multiple regions in United States)** |
| **Display name for configuration** | **Cloud Storage Daily Discovery** |

### Create a de-identify template to redact credit card numbers in structured data (such as CSV files)

**Helpful hint for de-identify template!**

| **Property** | **Value** |
| --- | --- |
| **Template ID** | **us\_ccn\_deidentify** |
| **Data transformation type** | **Record** |
| **Display name** | **De-identify Credit Card Numbers** |
| **Location type** | **Multi\_region** > **global (Global)** |
| **Field for Transformation Rule** | **message** |
| **Transformation type** | **Match on infoType** |
| **Transformation Method** | **Replace with infoType name** |

### Use the de-identify template to run a de-identify job on the CSV files in the Cloud Storage bucket

Helpful hint for de-identify job!

| **Property** | **Value** |
| --- | --- |
| **Job ID** | **us\_ccn\_deidentify** |
| **Location type** | **Multi\_region** > **us (multiple regions in United States)** |
| **URL** | **gs://-car-owners/** |
| **Scan recursively** | Enable this option |
| **Sampling** | **100%** |
| **Sampling method** | **No sampling** |
| **Structured de-identification template** | Specify the path to the de-identify template you created in step 2 |
| **Export transformation details to BigQuery** | Set **Dataset ID** to **cs\_transformations** and **Table ID** to **deidentify\_ccn** in the current project |
| **Cloud Storage output location** | **gs://-car-owners-transformed** |

Click *Check my progress* to verify the objective.

## Task 2. Enable sensitive data protection for BigQuery

Data on car owners and their purchases are also stored in BigQuery for analytics, and some of the datasets contain sensitive data. You have been tasked with creating a tag in IAM for sensitive personally identifiable information (SPII) and using it to grant conditional access for certain users to access only BigQuery datasets that have a tag of no SPII.

To help you achieve this goal, complete the following subtasks.

Expand the hints below for some helpful guidance to get started!

### Create a tag in IAM for sensitive personally identifiable information (SPII)

**Helpful hint for creating the tag!**

| **Property** | **Value** |
| --- | --- |
| **Tag key** | **SPII** |
| **Tag key description** | **Flag for sensitive personally identifiable information (SPII)** |
| **Tag key value 1** | **Yes** |
| **Tag key value 1 description** | **Contains sensitive personally identifiable information (SPII)** |
| **Tag key value 2** | **No** |
| **Tag key value 2 description** | **Does not contain sensitive personally identifiable information (SPII)** |

### Grant conditional access for Username 2 to only BigQuery datasets that have a tag for no SPII

**Helpful hint for granting conditional access!**

1.  Update IAM settings for Username 2 ([`student-04-5de142a4e91a@qwiklabs.net`](mailto:student-04-5de142a4e91a@qwiklabs.net)) to add a condition (specifically access to only BigQuery datasets that have been tagged with a value of **No** for **SPII**).
    

| **Property** | **Value** |
| --- | --- |
| **IAM Roles for Username 2** | Replace **Viewer** with **Browser**, and keep **BigQuery Data Viewer** to add a condition. |
| **Condition title** | **No SPII Access Only** |
| **Condition type 1 and operator** | Select **tag** and **has value** |
| **Value path for condition type 1** | `qwiklabs-gcp-04-fa4f5930c2ec`**/SPII/No** |

2.  Tag the BigQuery dataset named **orders** with a value of **No** for **SPII**.
    

Unlike the **car\_owners** dataset, the **orders** dataset does not contain SPII, but instead contains details on orders only.

**Optional testing:** If you would like to see this conditional access in action, you can log into the project as Username 2, and go to BigQuery. Refresh the page until the dataset named **orders** is the only dataset remaining in the Explorer list because Username 2 now only has access to datasets tagged with **No** for **SPII**.

Note that it may take a few minutes for the condition to be applied.

Click *Check my progress* to verify the objective.

Enable sensitive data protection for BigQuery.

## **Task 3. Protect sensitive data in Gen AI model responses**

Your team already has a Python function that identifies and redacts or blocks sensitive data types in Gen AI model responses. You have been asked to expand the function to block Gen AI model responses that contain [US Vehicle Identification Numbers](https://cloud.google.com/sensitive-data-protection/docs/infotypes-reference#united_states), which are sensitive data consisting of a unique 17-digit code assigned to every on-road motor vehicle in North America.

To help you achieve this goal, complete the following subtasks using the notebook provided in this lab environment:

1.  Update an existing Python function to block `model_name` model responses when a US VIN has been included.
    
2.  Generate example text with the following prompt to test your updated function: `Is 4Y1SL65848Z411439 an example of a US Vehicle Identification Number (VIN)?` \* When generating the response, be sure to set the [temperature](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/adjust-parameter-values#temperature) to 0, so that the highest probability results are returned for the progress check below.
    

Be sure to use the pre-created notebook named **deidentify-model-response-challenge-lab.ipynb** in the workbench instance named **vertex-ai-jupyterlab**.

For Project ID, use: qwiklabs-gcp-04-fa4f5930c2ec For Location, use: global Note: If you do not see notebooks in JupyterLab, please follow these additional steps to reset the instance:

1.  Close the browser tab for JupyterLab, and return to the Workbench home page.
    
2.  Select the checkbox next to the instance name, and click Reset.
    
3.  After the Open JupyterLab button is enabled again, wait one minute, and then click Open JupyterLab.
    

* * *

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=Pl9VSF0EbYE] 

*   Go to **Sensitive Data Protection** from [here](https://console.cloud.google.com/security/sensitive-data-protection/create/discoveryConfiguration;source=DATA_PROFILE_COVERAGE_DASHBOARD;discoveryType=4?project=)
    

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/07afe113-0f48-4dc5-80b8-3258ac1d9937.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/67e068ca-fe0f-479d-9108-35b883d6128e.png align="center")

**Dataset ID**

**Table ID**

**Display name for configuration**

```plaintext
curl -LO raw.githubusercontent.com/imharshtiwari/2-Minutes-GCP-Lab-Solutions/refs/heads/main/Discover%20and%20Protect%20Sensitive%20Data%20Across%20Your%20Ecosystem%20Challenge%20Lab/gsp522.sh
sudo chmod +x *.sh
./*.sh
```

*   [https://console.cloud.google.com/iam-admin/iam](https://console.cloud.google.com/iam-admin/iam)
    

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/ac431b6e-f062-48a2-9d4b-1c17fadb1227.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/8173915b-f2b7-4126-b84e-582b37c6f837.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/0987160b-c5db-41b9-98fb-40bbec333bd3.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/9ea7ca33-d3d4-4570-bfbc-efb2f3f4f9e4.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/6e84d039-bb81-4e87-8aed-2654c81fbb4b.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/a6d1f4c3-edd7-484b-bce6-3f91b6147aba.png align="center")

**Condition title**

```plaintext
No SPII Access Only
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/c67db96f-9e42-48bd-867f-132db0308528.png align="center")

*   [https://console.cloud.google.com/bigquery](https://console.cloud.google.com/bigquery)
    

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1f8b26e4-9192-4de5-9776-8db9c537d00b.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/87b2a5c5-ea07-4904-aeac-53675122e819.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/51476753-896c-472f-985b-c268edc6bf67.png align="center")

**Copy this and paste it into** [**in Notebook**](https://console.cloud.google.com/agent-platform/workbench/instances)

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/b8e7157c-92b2-49b6-85b6-53cdb538b75f.png align="center")

```python
# Redefine original function to inspect and deidentify output with Sensitive Data Protection
import google.cloud.dlp  
from typing import List 

def deidentify_with_replace_infotype(
    project: str, item: str, info_types: List[str]
) -> None:
    """Uses the Data Loss Prevention API to deidentify sensitive data in a
    string by replacing it with the info type.
    """
    # Instantiate a client
    dlp = google.cloud.dlp_v2.DlpServiceClient()

    # Convert the project id into a full resource id.
    parent = f"projects/{project}"

    # Construct inspect configuration dictionary
    inspect_config = {"info_types": [{"name": info_type} for info_type in info_types]}

    # Construct deidentify configuration dictionary
    deidentify_config = {
        "info_type_transformations": {
            "transformations": [
                {"primitive_transformation": {"replace_with_info_type_config": {}}}
            ]
        }
    }

    # Call the API for deidentify
    response = dlp.deidentify_content(
        request={
            "parent": parent,
            "deidentify_config": deidentify_config,
            "inspect_config": inspect_config,
            "item": {"value": item},
        }
    )

    return_payload = response.item.value
    
    # Add conditional return to block responses containing US Vehicle Identification Numbers (VIN)
    # We add US_VEHICLE_IDENTIFICATION_NUMBER to the inspection list
    check_types = ["DOCUMENT_TYPE/R&D/SOURCE_CODE", "US_VEHICLE_IDENTIFICATION_NUMBER"]
    inspect_config_block = {"info_types": [{"name": t} for t in check_types]}

    response_inspect = dlp.inspect_content(
        request={
            "parent": parent,
            "inspect_config": inspect_config_block,
            "item": {"value": item},
        }
    )

    if response_inspect.result.findings:
        for finding in response_inspect.result.findings:
            if finding.info_type.name == "DOCUMENT_TYPE/R&D/SOURCE_CODE":
                return_payload = '[Blocked due to category: Source Code]'
            elif finding.info_type.name == "US_VEHICLE_IDENTIFICATION_NUMBER":
                return_payload = '[Blocked due to category: US VIN]'
                
    # Print results
    print(return_payload)
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/4d2ca6e6-1e52-4d4a-9304-9a6fc6d19e60.png align="center")

### Manual

%[https://www.youtube.com/watch?v=TwCRWl41z7o]