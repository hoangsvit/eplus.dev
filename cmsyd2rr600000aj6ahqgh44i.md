---
title: "Explore Generative AI with the Gemini API in Agent Platform: Challenge Lab - GSP515"
seoTitle: "Explore Generative AI with the Gemini API in Agent Platform: Challenge Lab - GSP515"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-08-18T07:48:49.813Z
cuid: cmsyd2rr600000aj6ahqgh44i
slug: explore-generative-ai-with-the-gemini-api-in-agent-platform-challenge-lab-gsp515
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/316760d8-b0dc-471d-9cd8-383e9a9cc795.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/d33344af-53b6-44e8-9781-a7cf7aaaaa2b.png
tags: gsp515, explore-generative-ai-with-the-gemini-api-in-agent-platform-challenge-lab-gsp515, explore-generative-ai-with-the-gemini-api-in-agent-platform-challenge-lab

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Explore Generative AI with the Gemini API in Agent Platform](https://www.skills.google/course_templates/959) course. Are you ready for the challenge?

### Topics tested

*   Generate text using Gemini
    
*   Create a function call using Gemini
    
*   Describe video contents using Gemini
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

## **Challenge Scenario**

As a developer at a pioneering startup specializing in AI-driven video content analysis, you're tasked with harnessing Gemini's cutting-edge capabilities to elevate the platform's functionality. Your mission is to implement three pivotal features using Gemini's APIs: text generation, function calls, and video content analysis.

Your long-term objective is to enhance the platform's capabilities, enabling it to automatically generate coherent and polished text, execute specific actions or commands, and describe video contents using Gemini's state-of-the-art AI capabilities. Your goal for today is to implement demos of these features using Gemini's APIs, ensuring they meet the expected standards before deploying them to production.

Your success in this challenge will not only advance the platform's functionality but also demonstrate your proficiency in leveraging Gemini's state-of-the-art AI capabilities to address real-world problems in the realm of video content analysis. Are you ready to take on the challenge?

## **Task 1. Generate text using Gemini**

In this section, you are tasked with calling the Gemini API via Cloud Shell to confirm your understanding of how to make API calls.

1.  Run the following command to set environment variables required.
    

```plaintext
PROJECT_ID=qwiklabs-gcp-04-8505d66f22a0
LOCATION=global
API_ENDPOINT=aiplatform.googleapis.com
MODEL_ID="gemini-3.5-flash"
```

Copied!

2.  Enable the APIs required to call Gemini APIs via cloud console.
    

**Hint:** You can perform this step in Cloud Console in the Agent Platform section of the UI.

3.  Call the `gemini-3.5-flash` model via `curl` in **Cloud Shell**. Use the following documentation to assist you properly write the curl command: [Send Chat Prompts to Gemini](https://cloud.google.com/vertex-ai/docs/generative-ai/multimodal/send-chat-prompts-gemini#send_chat_prompts). Ask the following question:
    

```plaintext
Why is the sky blue?
```

Copied!

Click **Check my progress** to verify the objective.

Call the Gemini model via curl in Cloud Shell.

## **Task 2. Open the notebook in Agent Platform Workbench**

1.  In the Google Cloud console, on the Navigation menu (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ), click **Agent Platform > Notebooks > Workbench**.
    
2.  Find the `generative-ai-jupyterlab` instance and click on the **Open JupyterLab** button.
    

The JupyterLab interface for your Workbench instance opens in a new browser tab.

## **Task 3. Create a function call using Gemini**

1.  Open the `gemini-explorer-challenge.ipynb` file.
    
2.  In the **Select Kernel** dialog, choose **Python 3 (Local)** from the list of available kernels.
    
3.  Run through the **Getting Started** section of the notebook. The Project ID and Location are pre-configured for you.
    

**Note:** If you experience a 429 response from any of the notebook cell executions, wait one minute before running the cell again to proceed.

4.  Complete the missing parts of each cell to progress to the next section. These will be denoted with `INSERT` and an instruction to complete.
    

**Note:** Ensure you can see the weather related data in the response that is printed.

Click **Check my progress** to verify the objective.

Create a function call with Gemini

## **Task 4. Describe video contents using Gemini**

In this section, you are tasked with completing the python code in cells of a Jupyter notebook which leverage the `gemini-3.5-flash` model to describe contents of a video.

1.  Remain in Agent Platform Workbench and proceed to the cell with the comment `# Task 4`.
    
2.  Complete the required sections of the notebook `gemini-explorer-challenge.ipynb` under Task 4.
    

Click **Check my progress** to verify the objective.

Describe Video Contents

* * *

## Solution of Lab

### Quick

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/dced776e-ad9d-4104-b0c5-ee20352aae07.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/59bbf980-ae25-4a71-a5f3-8d6a565f7f3e.png align="center")

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP515/lab.sh
source lab.sh
```

* * *

### Other Solution

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

* * *

### Manual

%[https://www.youtube.com/watch?v=c9p669U8a0w]