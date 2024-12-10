---
title: "Get Started with Sensitive Data Protection: Challenge Lab - ARC116"
seoTitle: "Get Started with Sensitive Data Protection: Challenge Lab - ARC116"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Tue Dec 10 2024 07:02:08 GMT+0000 (Coordinated Universal Time)
cuid: cm4i45zbh000i09lde07yh51s
slug: get-started-with-sensitive-data-protection-challenge-lab-arc116
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733813131726/7d6ead67-bccf-4220-9651-9abfcc2a8d30.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1733814115569/fd678c0b-e36e-4a80-9bd7-ca3f7e6b77b1.png
tags: get-started-with-sensitive-data-protection-challenge-lab-arc116, arc116

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## **Challenge scenario**

You are working as a junior cloud engineer in your organization. You're part of a team of cloud engineers assigned to using Sensitive Data Protection API's powerful detection engine to protect and screen for personally identifiable information (PII) and other privacy-sensitive data. As part of this project, you are asked to use the Sensitive Data Protection service in Google Cloud to redact sensitive information from text, de-identify sensitive data, and create a DLP template to use for inspecting data.

You are expected to have the skills and knowledge for the tasks that follow.

### Your challenge

For this challenge, you have been tasked with redacting and de-identifying sensitive information, and creating templates to inspect structured and unstructured data.

You need to:

* Inspect strings and files to perform de-identification.
    
* Create de-identification inspection templates.
    
* Configure a job trigger to run DLP inspections.
    

Each task is described in detail below, good luck!

## **Task 1. Redact sensitive data from text content**

To complete this task, set an environmental variable for your project ID and obtain an authorization token in Cloud Shell.

1. Create a JSON file called `redact-request.json` using the code that follows and use `curl` to make a `content:deidentify` request.
    
2. Save the `curl` command output in a file called `redact-response.txt`.
    
3. Upload the output file, `redact-response.txt`, to the Cloud Storage Bucket `qwiklabs-gcp-03-ec6c4a1e193d-redact`.
    

```json
{
	"item": {
		"value": "Please update my records with the following information:\n Email address: foo@example.com,\nNational Provider Identifier: 1245319599"
	},
	"deidentifyConfig": {
		"infoTypeTransformations": {
			"transformations": [{
				"primitiveTransformation": {
					"replaceWithInfoTypeConfig": {}
				}
			}]
		}
	},
	"inspectConfig": {
		"infoTypes": [{
				"name": "EMAIL_ADDRESS"
			},
			{
				"name": "US_HEALTHCARE_NPI"
			}
		]
	}
}
```

Click *Check my progress* to verify the objective.

Redact sensitive data from text content

Check my progress

## **Task 2. Create DLP inspection templates**

For this task, you create two de-identification templates that are used to inspect structured and unstructured data, respectively.

1. Create a de-identify template for structured data with the name `structured_data_template` (in **Global (any region)**) that has two transformation rules:
    

a. First transformation rule:

| **Parameter** | **Configuration** |
| --- | --- |
| Transformation Rule fields | bank name, zip code |
| Transformation type | Primitive field transformation |
| Transformation method | Mask with character |
| Masking Character | # |
| Mask all characters | Enable mask all characters checkbox and do not ignore any characters |

b. Second transformation rule:

| **Parameter** | **Configuration** |
| --- | --- |
| Transformation Rule fields | message |
| Transformation type | Match on infoType |
| Transformation method | Replace with infoType name |

2. Create a de-identify template for unstructured data with the name `unstructured_data_template` (in **Global (any region)**), configured as:
    

| **Parameter** | **Configuration** |
| --- | --- |
| Transformation Rule | Replace |
| String value | \[redacted\] |

Click **Check my progress** to verify the objective.

Create DLP inspection templates

Check my progress

## **Task 3. Configure a job trigger to run DLP inspection**

For this task, you configure a job trigger to run the Cloud Data Loss Prevention API. A few sample files have been provided for you in the Cloud Storage Bucket named `qwiklabs-gcp-03-ec6c4a1e193d-input`.

1. Create a DLP inspection job trigger named `dlp_job` (in **Global (any region)**).
    

| **Parameter** | **Configuration** |
| --- | --- |
| Storage type | Cloud Storage |
| Location Type | Scan a bucket with optional include/exclude rules. |
| Cloud Storage Input location | `qwiklabs-gcp-03-ec6c4a1e193d-input` |
| Percentage of included objects scanned within the bucket | 100% |
| Sampling method | No sampling |
| Actions | Toggle **Make a de-identify copy**. Enter the names of the two templates that you created into the appropriate boxes |
| Cloud Storage output location | `gs://qwiklabs-gcp-03-ec6c4a1e193d-output` |
| Schedule | Create a trigger to run the job on a periodic schedule (Weekly) |

2. Run DLP inspection and explore the various folders and files in the Cloud Storage Bucket `gs://qwiklabs-gcp-03-ec6c4a1e193d-output` to verify the redacted data.
    

Click **Check my progress** to verify the objective.

Configure a job trigger to run DLP inspection

Check my progress

---

## Solution of Lab

%[https://www.youtube.com/watch?v=x74P6P5FTKs&ab_channel=Techcps] 

```apache
export BUCKET_NAME=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1733813081466/69839e31-3488-495b-a6c8-76e485a817fe.png align="center")

```apache
curl -LO raw.githubusercontent.com/Techcps/ARC/master/Protect%20Sensitive%20Data%20with%20Data%20Loss%20Prevention%3A%20Challenge%20Lab/techcps116.sh
sudo chmod +x techcps116.sh
./techcps116.sh
```