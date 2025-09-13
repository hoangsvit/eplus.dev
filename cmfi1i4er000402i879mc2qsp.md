---
title: "Generative AI with Vertex AI: Prompt Design - GSP1151"
seoTitle: "Generative AI with Vertex AI: Prompt Design - GSP1151"
seoDescription: "Learn prompt engineering with Vertex AI and Gemini models to craft effective prompts and enhance AI response quality"
datePublished: Sat Sep 13 2025 09:04:21 GMT+0000 (Coordinated Universal Time)
cuid: cmfi1i4er000402i879mc2qsp
slug: generative-ai-with-vertex-ai-prompt-design-gsp1151
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757753675446/56ea30d0-5459-4d83-bec3-374a670d3ecf.png
tags: generative-ai, vertex-ai, generative-ai-with-vertex-ai-prompt-design-gsp1151, generative-ai-with-vertex-ai-prompt-design, gsp1151

---

## Overview

This lab explores prompt engineering and best practices for designing effective prompts to improve the quality of your LLM-generated responses. You'll learn how to craft prompts that are concise, specific, and well-defined, focusing on one task at a time. The lab also covers advanced techniques like turning generative tasks into classification tasks and using examples to enhance response quality. For further exploration, refer to the [official documentation on prompt design](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design).

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

In this lab, you will learn how to:

* Get started with prompt engineering using the Google Gen AI SDK
    
* Apply best practices for prompt design, including conciseness, specificity, and task definition
    
* Explore various text generation use cases with the Google Gen AI SDK, such as:
    
    * Ideation
        
    * Question answering
        
    * Text classification
        
    * Text extraction
        
    * Text summarization
        

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
    student-02-8f3000ee4a36@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    mvN6WYw0u4DH
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

1. Open the `intro_prompt_design` file.
    
2. In the **Select Kernel** dialog, choose **Python 3** from the list of available kernels.
    
3. Run through the **Getting Started** and the **Import libraries** sections of the notebook.
    
    * For **Project ID**, use `qwiklabs-gcp-01-c384390b2792`, and for **Location**, use `europe-west4`.
        

**Note:** You can skip any notebook cells that are noted *Colab only*. If you experience a 429 response from any of the notebook cell executions, wait 1 minute before running the cell again to proceed.

Click **Check my progress** to verify the objective.

Install packages and import libraries

## Task 3. Prompt engineering best practices

Prompt engineering is all about how to design your prompts so that the response is what you were indeed hoping to see. The idea of using "unfancy" prompts is to minimize the noise in your prompt to reduce the possibility of the LLM misinterpreting the intent of the prompt. Below are a few guidelines on how to engineer "unfancy" prompts.

In this section, you'll cover the following best practices when engineering prompts:

* Be concise
    
* Be specific, and well-defined
    
* Ask one task at a time
    
* Improve response quality by including examples
    
* Turn generative tasks to classification tasks to improve safety
    

1. Run through the **Be concise** section of the notebook.
    

Click **Check my progress** to verify the objective.

Be concise

2. Run through the **Be specific, and well-defined** section of the notebook.
    

Click **Check my progress** to verify the objective.

Be specific, and well-defined

3. Run through the **Ask one task at a time** section of the notebook.
    

Click **Check my progress** to verify the objective.

Ask one task at a time

4. Run through the **Watch out for hallucinations** section of the notebook.
    

Click **Check my progress** to verify the objective.

Watch out for hallucinations

## Task 4. Reduce Output Variability

How can you attempt to reduce the chances of irrelevant responses and hallucinations? One way is to provide the LLM with [system instructions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instruction-introduction). In this section, you will see how system instructions works and how you can use them to reduce hallucinations or irrelevant questions for a travel chatbot.

1. Run through the **Using system instructions to guardrail the model from irrelevant responses** section of the notebook.
    

Click **Check my progress** to verify the objective.

Using system instructions to guardrail the model from irrelevant responses

2. Run through the **Turn generative tasks into classification tasks to reduce output variability** section of the notebook.
    

Click **Check my progress** to verify the objective.

Generative tasks lead to higher output variability

3. Run through the **Classification tasks reduces output variability** section of the notebook.
    

Click **Check my progress** to verify the objective.

Classification tasks reduces output variability

## Task 5. Improve Response Quality by Including Examples

Another way to improve response quality is to add examples in your prompt. The LLM learns in-context from the examples on how to respond. Typically, one to five examples (shots) are enough to improve the quality of responses. Including too many examples can cause the model to over-fit the data and reduce the quality of responses.

Similar to classical model training, the quality and distribution of the examples is very important. Pick examples that are representative of the scenarios that you need the model to learn, and keep the distribution of the examples (e.g. number of examples per class in the case of classification) aligned with your actual distribution.

1. Run through the **Improve response quality by including examples** section of the notebook.
    

Click **Check my progress** to verify the objective.

Improve response quality by including examples

---

## **Solution of Lab**

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">When I open <strong>JupyterLab</strong>, I can't see any files. What is the problem? You must be on the <strong>Workbench </strong>home page, select the checkbox next to the instance name, click <strong>Reset</strong>, and then the Open <strong>JupyterLab </strong>button is enabled again.</div>
</div>

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757750538830/d6bf70bf-60cc-4249-bb77-d0ab63f586aa.png?auto=compress,format&format=webp align="left")

---

%[https://youtu.be/QnOJIQRdWzs] 

Open link: [**https://console.cloud.google.com/vertex-ai/workbench**](https://console.cloud.google.com/vertex-ai/workbench)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757754117681/75321ab4-ccb9-4e02-bfaf-4ddb8774e566.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1757754126542/782dc9a1-813d-4ed3-a280-d1b0e24a6c8b.png align="center")

press <mark>Shift+Enter</mark>