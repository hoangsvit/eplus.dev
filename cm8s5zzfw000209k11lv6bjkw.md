---
title: "Synthetic Data Generation using Gemini APIs - GSP1272"
seoTitle: "Synthetic Data Generation using Gemini APIs - GSP1272"
seoDescription: "This lab explores using the Gemini API in Vertex AI to generate synthetic data using Snowfakery. Snowfakery is a powerful framework for creating complex fak"
datePublished: Fri Mar 28 2025 02:29:58 GMT+0000 (Coordinated Universal Time)
cuid: cm8s5zzfw000209k11lv6bjkw
slug: synthetic-data-generation-using-gemini-apis-gsp1272
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743128882723/adac1f25-0e71-4195-a5a8-e1b935da4a68.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1743128973253/76071f26-54ad-4d27-ac3d-0b25ebd2039c.png
tags: synthetic-data-generation-using-gemini-apis-gsp1272, synthetic-data-generation-using-gemini-apis, gsp1272

---

## **Overview**

This lab explores using the Gemini API in Vertex AI to generate synthetic data using Snowfakery. Snowfakery is a powerful framework for creating complex fake data, and Gemini enhances this process by leveraging its natural language capabilities. You'll learn how to define data generation strategies, utilize predefined schemas, and generate different data formats (like blogs and comments) using a Wikipedia page as a seed. This approach is valuable for testing, prompt experimentation, and building few-shot examples.

### Prerequisites

Before starting this lab, you should be familiar with:

* Basic Python programming.
    
* General API concepts.
    
* Running Python code in a Jupyter notebook on [Vertex AI Workbench](https://cloud.google.com/vertex-ai/docs/workbench/introduction).
    

### **Objectives**

In this lab, you will:

* Interact with the Gemini API using the Google Gen AI SDK for Python.
    
* Utilize Snowfakery to define schemas and data generation strategies.
    
* Leverage Gemini to generate synthetic data in different formats.
    
* Explore practical applications of synthetic data generation, such as testing and prompt experimentation.
    

### **Setup and requirements**

**Before you click the Start Lab button**

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

**How to start your lab and sign in to the Google Cloud console**

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
    student-02-55254d8f1594@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    0KwOSnPlWy8y
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

## **Task 1. Open the notebook in Vertex AI Workbench**

1. In the Google Cloud console, on the **Navigation menu** (), click **Vertex AI &gt; Workbench**.
    
2. Find the `vertex-ai-jupyterlab` instance and click on the **Open JupyterLab** button.
    

The JupyterLab interface for your Workbench instance opens in a new browser tab.

## **Task 2. Set up the notebook**

1. Open the `synthetic_data_generation_using_gemini` file.
    
2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.
    
3. Run through the **Getting Started** and the **Import libraries** sections of the notebook.
    
    * For **Project ID**, use `qwiklabs-gcp-02-8a761028b5d9`, and for **Location**, use `us-east4`.
        

**Note:** You can skip any notebook cells that are noted *Colab only*. If you experience a 429 response from any of the notebook cell executions, wait 1 minute before running the cell again to proceed.

Click **Check my progress** to verify the objective.

Install packages and import libraries.

Check my progress

## **Task 3. Creating Plugins and Prompts**

In this task, you create the two custom plugins needed for this use case along with the necessary prompts. The first plugin gives you the ability to interact with Wikipedia and fetch the contents for a given page. The second plugin allows you to interact with the Gemini API.

1. Run through the **Creating Plugins and Prompts** section of the notebook.
    

Click **Check my progress** to verify the objective.

Creating Plugins and Prompts.

Check my progress

## **Task 4. Creating the Recipe**

In order to generate synthetic data, the schema of the synthetic data must be defined first. This is done by creating a `recipe` in a YAML format as demonstrated in the notebook, more details on writing recipes can be found [here](https://snowfakery.readthedocs.io/en/latest/#central-concepts). In this task, you define the schema for the synthetically generated data.

1. Run through the **Creating the Recipe** section of the notebook.
    

Click **Check my progress** to verify the objective.

Creating the Recipe.

Check my progress

## **Task 5. Generating Data**

In this task, you generate the data and view its results in the `/outputs` folder.

1. Run through the **Generating Data** section of the notebook.
    

**Note:** This step may take several minutes to complete.

Click **Check my progress** to verify the objective.

Generating Data.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=y11C0Fsuwdw]