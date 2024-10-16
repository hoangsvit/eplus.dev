---
title: "Getting Started with the Vertex AI Gemini API with cURL - GSP1228"
seoTitle: "Getting Started with the Vertex AI Gemini API with cURL - GSP1228"
seoDescription: "Gemini is a family of generative AI models developed by Google DeepMind that is designed for multimodal use cases. The Gemini API gives you access to the Ge"
datePublished: Thu Aug 22 2024 09:19:33 GMT+0000 (Coordinated Universal Time)
cuid: cm052mzrv000b08l4aetc6u2m
slug: getting-started-with-the-vertex-ai-gemini-api-with-curl-gsp1228
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724317519347/5cb6e6ec-763d-4d8a-a36e-9c2721b9faed.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724318361120/71bc3d1a-ee29-4bd9-b650-b2bcf06c81df.jpeg

---

## **Overview**

[Gemini](https://deepmind.google/technologies/gemini/#introduction) is a family of generative AI models developed by Google DeepMind that is designed for multimodal use cases. The Gemini API gives you access to the Gemini Pro Vision and Gemini Pro models. In this lab, you will learn how to use the Vertex AI Gemini API with cURL commands to interact with the Gemini Pro (`gemini-pro`) model and Gemini Pro Vision (`gemini-pro-vision`) model.

### Vertex AI Gemini API

The Vertex AI Gemini API provides a unified interface for interacting with Gemini models. There are currently two models available in the Gemini API:

1. **Gemini Pro model** (`gemini-pro`): Designed to handle natural language tasks, multiturn text and code chat, and code generation.
    
2. **Gemini Pro Vision model** (`gemini-pro-vision`): Supports multimodal prompts. You can include text, images, and video in your prompt requests and get text or code responses.
    

You can interact with the Gemini API using the following methods:

* Use the [Vertex AI Studio](https://cloud.google.com/generative-ai-studio?hl=en) for quick testing and command generation
    
* Use cURL commands
    
* Use the Vertex AI SDK
    

This lab focuses on using the **cURL commands** to call the Vertex AI Gemini API.

For more information, see the [Generative AI on Vertex AI](https://cloud.google.com/vertex-ai/docs/generative-ai/learn/overview) documentation.

## **Objectives**

In this lab, you will learn how to perform the following tasks:

* Install the Python SDK.
    
* Use the Vertex AI Gemini API to interact with each model.
    
* Use the Gemini Pro (`gemini-pro`) model to generate text from text prompts.
    
* Use the Gemini Pro Vision (`gemini-pro-vision`) model to generate text from image and text prompts and video.
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab Details** panel with the following:
    
    * The **Open Google Cloud console** button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the **Sign in** page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-02-774644045eef@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    bvOaKSmuS8Nc
    ```
    
    You can also find the **Password** in the **Lab Details** panel.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To view a menu with a list of Google Cloud products and services, click the **Navigation menu** at the top-left.

![Navigation menu icon](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

## **Task 1. Open the notebook in Vertex AI Workbench**

1. In the Google Cloud Console, on the **Navigation menu**, click **Vertex AI &gt; Workbench**.
    
2. On the **User-Managed Notebooks** page, find the `generative-ai-jupyterlab` notebook and click on the **Open JupyterLab** button.
    

The JupyterLab interface opens in a new browser tab.

## **Task 2. Open the generative-ai folder**

1. Navigate to the `generative-ai` folder on the left hand side of the notebook.
    
2. Navigate to the `/gemini/getting-started` folder.
    
3. Click on the `intro_gemini_curl.ipynb` file.
    
4. Run through the **Getting Started** and **Import libraries** sections of the notebook.
    
    * For **Project ID**, use `qwiklabs-gcp-00-331c071153cb`, and for the **Location**, use `us-west1`.
        

**Note:** you can skip any notebook cells that are noted *Colab only*.

In the following sections, you will run through the notebook cells to see how to use the Vertex AI Gemini API with cURL commands to interact with the Gemini Pro (`gemini-pro`) model and Gemini Pro Vision (`gemini-pro-vision`) model.

## **Task 3. Use the Gemini Pro Model**

The Gemini Pro (`gemini-pro`) model is tailored for natural language tasks such as classification, summarization, extraction, and writing. In this task, you will learn how to use the Gemini Pro model to generate text from a text prompt.

1. In this task, run through the notebook cells to see how to use the Gemini Pro model to generate text from a text prompt.
    

Generate text from the text prompt

**Check my progress**

Generate multi-turn conversations from the chat promt

**Check my progress**

Run Function calling cell in the notebook

**Check my progress**

## **Task 4. Use the Gemini Pro Vision Model**

The Gemini Pro Vision (`gemini-pro-vision`) is a multimodal model that supports adding image and video in text or chat prompts for a text response.

**Note:** Text-only prompts are not supported by the Gemini Pro Vision model. Instead, use the Gemini Pro model for text-only prompts.

1. In this task, run through the notebook cells to see how to use the Gemini Pro Vision model to generate text from an image from a local file, an image from Google Cloud Storage, and a video file.
    

Generate text from the image file

**Check my progress**

Generate text from the video file

---

## Solution of Lab

%[https://www.youtube.com/watch?v=kZ542xgJ8nE] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724318111485/137c80f4-cd31-4ccf-ab19-9ee686ad4ace.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724318118916/b15106e8-bd1c-4777-896e-2b46a05ab371.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724318125796/40fac159-2c2e-4cdc-b437-f9306bbf4781.png align="center")