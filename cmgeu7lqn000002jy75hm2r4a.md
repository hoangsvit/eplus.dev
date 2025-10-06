---
title: "Explore Generative AI with the Gemini API in Vertex AI: Challenge Lab - GSP515"
seoTitle: "Explore Generative AI with the Gemini API in Vertex AI: Challenge Lab "
seoDescription: "Challenge your Google Cloud skills by leveraging Gemini API in Vertex AI for text generation, function calls, and video content description"
datePublished: Mon Oct 06 2025 07:56:37 GMT+0000 (Coordinated Universal Time)
cuid: cmgeu7lqn000002jy75hm2r4a
slug: explore-generative-ai-with-the-gemini-api-in-vertex-ai-challenge-lab-gsp515
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759736004319/83e68110-570a-44ad-b1f4-fa25fcf42064.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759736453673/b1eaac23-b385-4684-ad92-ccb75a5ef8fe.png
tags: explore-generative-ai-with-the-gemini-api-in-vertex-ai-challenge-lab-gsp515, explore-generative-ai-with-the-gemini-api-in-vertex-ai-challenge-lab, gsp515

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Explore Generative AI with the Gemini API in Vertex AI](https://www.cloudskillsboost.google/course_templates/959) course. Are you ready for the challenge?

### Topics tested

* Generate text using Gemini
    
* Create a function call using Gemini
    
* Describe video contents using Gemini
    

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## Challenge Scenario

As a developer at a pioneering startup specializing in AI-driven video content analysis, you're tasked with harnessing Gemini's cutting-edge capabilities to elevate the platform's functionality. Your mission is to implement three pivotal features using Gemini's APIs: text generation, function calls, and video content analysis.

Your long-term objective is to enhance the platform's capabilities, enabling it to automatically generate coherent and polished text, execute specific actions or commands, and describe video contents using Gemini's state-of-the-art AI capabilities. Your goal for today is to implement demos of these features using Gemini's APIs, ensuring they meet the expected standards before deploying them to production.

Your success in this challenge will not only advance the platform's functionality but also demonstrate your proficiency in leveraging Gemini's state-of-the-art AI capabilities to address real-world problems in the realm of video content analysis. Are you ready to take on the challenge?

## Task 1. Generate text using Gemini

In this section, you are tasked with calling the Gemini API via Cloud Shell to confirm your understanding of how to make API calls.

1. Run the following command to set environment variables required.
    

```apache
PROJECT_ID=qwiklabs-gcp-03-e2e9ae3a4776
LOCATION=us-east1
API_ENDPOINT=${LOCATION}-aiplatform.googleapis.com
MODEL_ID="gemini-2.0-flash-001"
```

2. Enable the APIs required to call Gemini APIs via cloud console.
    

**Hint:** You can perform this step in Cloud Console in the Vertex AI section of the UI.

3. Call the `gemini-2.0-flash-001` model via `curl` in **Cloud Shell**. Use the following documentation to assist you properly write the curl command: [Send Chat Prompts to Gemini](https://cloud.google.com/vertex-ai/docs/generative-ai/multimodal/send-chat-prompts-gemini#send_chat_prompts). Ask the following question:
    

```apache
Why is the sky blue?
```

Click **Check my progress** to verify the objective.

Enable the required API

## Task 2. Open the notebook in Vertex AI Workbench

1. In the Google Cloud console, on the **Navigation menu** (), click **Vertex AI &gt; Workbench**.
    
2. Find the `generative-ai-jupyterlab` instance and click on the **Open JupyterLab** button.
    

The JupyterLab interface for your Workbench instance opens in a new browser tab.

**Note:** If you do not see notebooks in JupyterLab, please follow these additional steps to reset the instance:

1\. Close the browser tab for JupyterLab, and return to the Workbench home page.

2\. Select the checkbox next to the instance name, and click **Reset**.

3\. After the **Open JupyterLab** button is enabled again, wait one minute, and then click **Open JupyterLab**.

## Task 3. Create a function call using Gemini

1. Open the `gemini-explorer-challenge` file.
    
2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.
    
3. Run through the **Getting Started** and the **Import libraries** sections of the notebook.
    
    * For **Project ID**, use `qwiklabs-gcp-03-e2e9ae3a4776`, and for **Location**, use `us-east1`.
        

**Note:** You can skip any notebook cells that are noted *Colab only*. If you experience a 429 response from any of the notebook cell executions, wait 1 minute before running the cell again to proceed.

4. Complete the missing parts of each cell to progress to the next section. These will be denoted with `INSERT` and an instruction to complete.
    

**Note:** Ensure you can see the weather related data in the response that is printed.

Click **Check my progress** to verify the objective.

Create a function call with Gemini

## Task 4. Describe video contents using Gemini

In this section, you are tasked with completing the python code in cells of a Jupyter notebook which leverage the `Gemini 2.0 Flash 001` model to describe contents of a video.

1. Remain in Vertex AI Workbench and proceed to the cell with the comment `# Task 4`.
    
2. Complete the required sections of the notebook `gemini-explorer-challenge` under Task 4.
    

Click **Check my progress** to verify the objective.

Describe Video Contents

---

## Solution of Lab

%[https://www.youtube.com/watch?v=lkni6FTAVYI] 

**Task 1**

```apache
pip3 install --upgrade --user google-cloud-aiplatform && gcloud auth list && gcloud services enable compute.googleapis.com iam.googleapis.com iamcredentials.googleapis.com monitoring.googleapis.com logging.googleapis.com notebooks.googleapis.com aiplatform.googleapis.com bigquery.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com container.googleapis.com
```

**Task 2**

```apache
rm gemini-explorer-challenge-v2.0.0.ipynb

curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP515/gemini-explorer-challenge-v2.0.0.ipynb

curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP515/techcps.ipynb
```

**Script Alternative**

```apache
rm gemini-explorer-challenge-v2.0.0.ipynb

curl -LO raw.githubusercontent.com/Techcps/GSP/master/Explore%20Generative%20AI%20with%20the%20Vertex%20AI%20Gemini%20API%20Challenge%20Lab/gemini-explorer-challenge-v2.0.0.ipynb

curl -LO raw.githubusercontent.com/Techcps/GSP/master/Explore%20Generative%20AI%20with%20the%20Vertex%20AI%20Gemini%20API%20Challenge%20Lab/techcps.ipynb
```