---
title: "Protecting Sensitive Data in Gen AI Model Responses - GSP1283"
seoTitle: "Protecting Sensitive Data in Gen AI Model Responses - GSP1283"
seoDescription: "Sensitive Data Protection is a fully managed service designed to help you discover, classify, and protect sensitive information. Key options include Sensiti"
datePublished: Thu Mar 06 2025 08:41:42 GMT+0000 (Coordinated Universal Time)
cuid: cm7x3lac3000709jldy5je3p7
slug: protecting-sensitive-data-in-gen-ai-model-responses-gsp1283
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741249830926/48ad3033-5718-41a7-a26d-9409c1090e62.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1741250489852/8dc51570-9820-4288-b3ce-3dfa8eea1a5b.png
tags: protecting-sensitive-data-in-gen-ai-model-responses-gsp1283, protecting-sensitive-data-in-gen-ai-model-responses, gsp1283

---

## **Overview**

[Sensitive Data Protection](https://cloud.google.com/security/products/sensitive-data-protection) is a fully managed service designed to help you discover, classify, and protect sensitive information. Key options include Sensitive Data Discovery for continuously profiling your sensitive data, de-identification of sensitive data including redaction, and Cloud Data Loss Prevention (DLP) API to let you build in discovery, inspection, and de-identification into custom workloads and applications.

In addition to identifying and protecting sensitive data in data storage options such as Cloud Storage and BigQuery, you can also identify and protect sensitive data that is returned from Generative AI models. Very useful for mitigating sensitive data concerns across your whole ecosystem!

In this lab, you leverage this ability through a Jupyter notebook that employs the Cloud Data Loss Prevention (DLP) API to classify and redact sensitive data in Gemini 1.5 Pro model responses.

### What you'll learn

In this lab, you learn how to:

* Access a pre-created Jupyter notebook in a Vertex AI Workbench instance
    
* Install Python packages for Vertex AI and Cloud Data Loss Prevention (DLP) API
    
* Generate example text with sensitive data using the Gemini 1.5 Pro model
    
* Define and run Python functions to redact different types of sensitive data in Gemini 1.5 Pro model responses using the DLP API
    

### Prerequisites

While not required, it is helpful to have some previous knowledge about how Vertex AI and Cloud Data Loss Prevention (DLP (API) are commonly used within Google Cloud workflows. For an introduction to these tools before you begin this lab, you can complete the following labs:

* [Vertex AI: Qwik Start](https://www.cloudskillsboost.google/catalog_lab/3899)
    
* [Get Started with Sensitive Data Protection](https://www.cloudskillsboost.google/course_templates/750)
    

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
    student-03-a3aa5c67bde8@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    bscwZqpsENRl
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

## **Task 1. Open Jupyter Lab in Vertex AI Workbench**

1. In the Google Cloud console, on the **Navigation menu** (), click **Vertex AI &gt; Workbench**.
    
2. Find the `vertex-ai-jupyterlab` instance and click on the **Open JupyterLab** button.
    

The JupyterLab interface for your Workbench instance opens in a new browser tab.

## **Task 2. Set up the notebook**

**Note:** You can run any cell in a Python notebook by clicking **Run the selected cells** (play arrow icon) at the top of the notebook.

Review more information about using Jupyter notebooks in Vertex AI Workbench instances in the [documentation](https://cloud.google.com/vertex-ai/docs/tutorials/tabular-bq-prediction/create-notebook#install-sdks).

1. Click on the `deidentify-model-response`.ipynb file.
    
2. Run each cell in the **Getting started with this notebook** section of the notebook.
    
    Be sure to provide the Project ID and Location as follows:
    
    * For **Project ID**, type: `qwiklabs-gcp-04-84103e32ea65`
        
    * For **Location**, type: `us-central1`
        

## **Task 3. Redact specific sensitive data types in Gen AI model responses**

The sections identified in this task follow the sections outlined in the notebook. Complete the steps in the notebook as instructed below and return to this lab page to check your progress after completing each notebook section.

### Generate simple example text with personally identifiable information (full name) using Gemini 1.5 Pro model

* Run each cell in the **Generate simple example text with personally identifiable information (full name) using Gemini 1.5 Pro model** section of the notebook.
    

Click **Check my progress** to verify the objective.

Generate examples of text with personally identifiable information (PII).

Check my progress

### Define and run a Python function to deidentify Gemini 1.5 Pro model responses using built-in global infotypes

* Run each cell in the **Define and run a Python function to deidentify Gemini 1.5 Pro model responses using built-in global infotypes** section of the notebook.
    

Click **Check my progress** to verify the objective.

Define a Python function to deidentify Gemini 1.5 Pro model responses using built-in global infotypes

Check my progress

### Generate and de-identify example text with more personally identifiable information (date of birth) using Gemini 1.5 Pro model

* Run each cell in the **Generate and de-identify example text with more personally identifiable information (date of birth) using Gemini 1.5 Pro model** section of the notebook.
    

Click **Check my progress** to verify the objective.

Generate and de-identify example text with more personally identifiable information.

Check my progress

### Generate example text with credit card information using Gemini 1.5 Pro model

* Run each cell in the **Generate example text with credit card information using Gemini 1.5 Pro model** section of the notebook.
    

Click **Check my progress** to verify the objective.

Generate example text with credit card information using Gemini 1.5 Pro model.

Check my progress

### Test your skills using the built-in global infoType for credit card number

* Run each cell in the **Test your skills using the built-in global infoType for credit card number** section of the notebook.
    

Expand the hints below for some helpful steps!

**Option 1: Review the docs**

Click here for hint!

**Full solution (Expand to see the full code!)**

Click here for hint!

Click **Check my progress** to verify the objective.

Test your skills using the built-in global infoType for credit card number.

Check my progress

## **Task 4. Block results from Gen AI models based on sensitive document types**

The sections identified in this task follow the sections outlined in the notebook. Complete the steps in the notebook as instructed below and return to this lab page to check your progress after completing each notebook section.

### Revise the Python function to block Gemini 1.5 Pro model responses based on specific infotypes for documents

* Run each cell in the **Revise the Python function to block Gemini 1.5 Pro model responses based on specific infotypes for documents** section of the notebook.
    

Click **Check my progress** to verify the objective.

Revise the Python function to block Gemini 1.5 Pro model responses.

Check my progress

### Generate an example with source code using Gemini 1.5 Pro model and block results

* Run each cell in the **Generate an example with source code using Gemini 1.5 Pro model and block results** section of the notebook.
    

Click **Check my progress** to verify the objective.

Generate an example with source code using Gemini 1.5 Pro model.

Check my progress

### Test your skills using the built-in document infoType for patents

* Run each cell in the **Test your skills using the built-in document infoType for patents** section of the notebook.
    

Expand the hints below for some helpful steps!

**Option 1: Review the previous section in the notebook**

Click here for hint!

**Full solution (Expand to see the full code!)**

Click here for hint!

Click **Check my progress** to verify the objective.

Test your skills using the built-in document infoType for patents.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=ncT0Abzc3xU] 

**Download file:** [deidentify-model-response-v1.0.0.ipynb - GSP128](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP1283/deidentify-model-response-v1.0.0.ipynb)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1741250388230/1271158c-be28-4c31-8942-19aae362387b.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1741250452746/802f95e4-edb9-45cb-8625-1a9ad77a8376.png align="center")