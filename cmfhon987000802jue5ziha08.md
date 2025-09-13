---
title: "Getting Started with the Gemini API in Vertex AI with cURL - GSP1228"
seoTitle: "Getting Started with the Gemini API in Vertex AI with cURL - GSP1228"
seoDescription: "Learn to use the Gemini API in Vertex AI with cURL for text and multimodal generation tasks"
datePublished: Sat Sep 13 2025 03:04:25 GMT+0000 (Coordinated Universal Time)
cuid: cmfhon987000802jue5ziha08
slug: getting-started-with-the-gemini-api-in-vertex-ai-with-curl-gsp1228
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757731616981/bfd74581-2fcc-4012-95d5-caafd55368fe.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1757732645586/1fb6c382-a006-422d-b3ad-1df7343252ed.png
tags: curl, vertex-ai, gemini, gsp1228, getting-started-with-the-gemini-api-in-vertex-ai-with-curl-gsp1228, getting-started-with-the-gemini-api-in-vertex-ai-with-curl

---

## Overview

In this lab, you learn how to use the Gemini API in Vertex AI with cURL commands to interact with the Gemini 2.0 Flash (`gemini-2.0-flash`) model. You will learn how to generate text from a prompt, add model parameters, chat, and generate text from images and video.

### Gemini

[Gemini](https://deepmind.google/technologies/gemini/) is a family of powerful generative AI models developed by Google DeepMind, capable of understanding and generating various forms of content, including text, code, images, audio, and video.

#### Gemini API in Vertex AI

The Gemini API in Vertex AI provides a unified interface for interacting with Gemini models. This allows developers to easily integrate these powerful AI capabilities into their applications. For the most up-to-date details and specific features of the latest versions, please refer to the official [Gemini documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models#gemini-models).

#### Gemini Models

* [**Gemini Pro**](https://deepmind.google/technologies/gemini/pro/): Designed for complex reasoning, including:
    
    * Analyzing and summarizing large amounts of information.
        
    * Sophisticated cross-modal reasoning (across text, code, images, etc.).
        
    * Effective problem-solving with complex codebases.
        
* [**Gemini Flash**](https://deepmind.google/technologies/gemini/flash/): Optimized for speed and efficiency, offering:
    
    * Sub-second response times and high throughput.
        
    * High quality at a lower cost for a wide range of tasks.
        
    * Enhanced multimodal capabilities, including improved spatial understanding, new output modalities (text, audio, images), and native tool use (Google Search, code execution, and third-party functions).
        

### Prerequisites

Before starting this lab, you should be familiar with:

* Basic Python programming.
    
* General API concepts.
    
* Running Python code in a Jupyter notebook on [Vertex AI Workbench](https://cloud.google.com/vertex-ai/docs/workbench/introduction).
    

## Objectives

In this lab, you will learn how to perform the following tasks:

* Install the Python SDK
    
* Use the Gemini API in Vertex AI to interact with each model
    
* Use the Gemini 2.0 Flash (`gemini-2.0-flash`) model to generate text from image(s), text prompts and video
    

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
    student-02-6c988eab5f18@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    xkgOK5odAlRw
    ```
    
    Copied!
    
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

## Task 1. Open the notebook in Vertex AI Workbench

1. In the Google Cloud console, on the **Navigation menu** (), click **Vertex AI &gt; Workbench**.
    
2. Find the `vertex-ai-jupyterlab` instance and click on the **Open JupyterLab** button.
    

The JupyterLab interface for your Workbench instance opens in a new browser tab.

**Note:** If you do not see notebooks in JupyterLab, please follow these additional steps to reset the instance:

1\. Close the browser tab for JupyterLab, and return to the Workbench home page.

2\. Select the checkbox next to the instance name, and click **Reset**.

3\. After the **Open JupyterLab** button is enabled again, wait one minute, and then click **Open JupyterLab**.

## Task 2. Set up the notebook

1. Open the `intro_gemini_curl` file.
    
2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.
    
3. Run through the **Getting Started** and the **Import libraries** sections of the notebook.
    
    * For **Project ID**, use `qwiklabs-gcp-00-a7f55bf368a4`, and for **Location**, use `us-west1`.
        

**Note:** You can skip any notebook cells that are noted *Colab only*. If you experience a 429 response from any of the notebook cell executions, wait 1 minute before running the cell again to proceed.

In the following sections, you will run through the notebook cells to see how to use the Gemini API in Vertex AI with cURL commands to interact with the Gemini 2.0 Flash (`gemini-2.0-flash`) model.

## Task 3. Use the Gemini Flash Model

Gemini 2.0 Flash (`gemini-2.0-flash`) model is tailored for natural language tasks such as classification, summarization, extraction, and writing. In this task, you will learn how to use the Gemini 2.0 Flash to generate text from a prompt.

1. In this task, run through the notebook cells to see how to use the Gemini Flash model to generate text from a text prompt.
    

**Note:** Save the notebook file before clicking on the **Check my progress** button for every task.

Click **Check my progress** to verify the objective.

Generate text from the text prompt

Generate multi-turn conversations from the chat prompt

Run Function calling cell in the notebook

## Task 4. Multimodal input

The Gemini 2.0 Flash (`gemini-2.0-flash`) is a multimodal model that supports adding images and videos in text or chat prompts for a text response.

1. In this task, run through the notebook cells to see how to use the Gemini 2.0 Flash model to generate text from an image from a local file, an image from Google Cloud Storage, and a video file.
    

Click **Check my progress** to verify the objective.

Generate text from the image file

Generate text from the video file

---

## Solution of Lab

### Quick

%[https://youtu.be/WDbZVrBoAo4] 

Open: [https://console.cloud.google.com/vertex-ai/workbench](https://console.cloud.google.com/vertex-ai/workbench)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757731859176/9111b336-fc21-43e2-9d3a-d57473e755b1.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757731961973/019f9e17-9fcc-4d10-a866-86b4fbbaf168.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757732343476/342f7346-8301-4902-9e64-43ef0a80031b.png align="center")

```apache
rm intro_gemini_curl-v2.0.0.ipynb
curl -LO curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1228/intro_gemini_curl-v2.0.0.ipynb
```

**Script Alternative**

```apache
rm intro_gemini_curl-v2.0.0.ipynb
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Getting%20Started%20with%20the%20Gemini%20API%20in%20Vertex%20AI%20with%20cURL/intro_gemini_curl-v2.0.0.ipynb
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757732358955/074cc2bb-98db-48ba-8a73-73464ae8afbf.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757732367535/07b86c25-fe1b-4057-9aae-50f34f61cdab.png align="center")

press <mark>Shift+Enter</mark>

---

### Manual

%[https://youtu.be/tD8LTuSzqqs]