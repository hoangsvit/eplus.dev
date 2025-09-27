---
title: "Prompt Design in Vertex AI: Challenge Lab - GSP519"
seoTitle: "Prompt Design in Vertex AI: Challenge Lab - GSP519"
seoDescription: "Explore hands-on prompt design in Vertex AI with a real-world cloud lab, enhancing generative AI skills"
datePublished: Sat Sep 27 2025 04:01:46 GMT+0000 (Coordinated Universal Time)
cuid: cmg1quxjr000702la381khjry
slug: prompt-design-in-vertex-ai-challenge-lab-gsp519
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758945664796/1f416a6c-0ec1-4efa-9257-e18cc4e94d76.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1758945685428/c5ff8589-170d-4b9a-bc49-02a4a6f622fe.png
tags: vertex-ai, prompt-design-in-vertex-ai-challenge-lab-gsp519, prompt-design-in-vertex-ai-challenge-lab, gsp519

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Prompt Design in Vertex AI](https://www.skills.google/course_templates/976) course. Are you ready for the challenge?

### Topics tested

* Craft effective prompts and use parameters to guide generative AI output in Vertex AI Studio.
    
* Apply Gemini models to create product descriptions and taglines in a real-world marketing scenario.
    
* Examine and run Python code exported from Vertex AI Studio to gain a basic understanding of generative AI implementation.
    
* Use Jupyter Notebooks to test and modify generative AI code.
    

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

You're a member of an educational content startup specializing in engaging learners with the natural world. You've formed a partnership with Cymbal Direct, an online retailer launching a new line of outdoor gear and apparel designed to encourage young people to explore and connect with nature.

Cymbal Direct wants to create a marketing campaign for its new product line that leverages the power of generative AI. Your task is to help them develop a set of tools within Google Cloud's Vertex AI platform that will streamline the generation of the following:

* **Evocative Product Descriptions**: using image analysis to inspire short, descriptive text that captures the essence of their products and the feeling of being in nature.
    
* **Catchy Taglines**: focused on highlighting product features, the target audience, and the desired emotional response.
    

## Task 1. Build a Gemini image analysis tool

In this section, you will create a template for analyzing images of Cymbal Direct products using the `Gemini 2.5 Flash` model in Vertex AI Studio. The goal is to generate descriptive text options inspired by the image, from simple details to more evocative, mood-setting phrases.

#### Tasks:

1. Create a prompt in Vertex AI Studio with the `gemini-2.5-flash` model to analyze Cymbal Direct's product image (provided in Google Cloud Storage) and generate multiple descriptive text options inspired by the image.
    

The image for this task is located at: `qwiklabs-gcp-00-425c7fdc774b-bucket/cymbal-product-image.png`.

2. Experiment with different prompts to generate the following:
    
    * Short, descriptive text inspired by the image.
        
    * Catchy phrases suitable for advertisements.
        
    * A poetic description for a nature-focused campaign.
        
3. **Evaluate and Iterate**: adjust your prompt and parameters as needed to refine the results.
    
4. Name your prompt **Cymbal Product Analysis**.
    
5. **Save Prompt**: Once you're happy with the results, click **Save**, and select the `us-central1` region.
    

**Note:** Ensure you are using the `gemini-2.5-flash` model for this task!

Build a Gemini image analysis tool.

## Task 2. Build a Gemini tagline generator

In this task, you will create a prompt for generating diverse tagline possibilities using the `Gemini 2.5 Flash` model in Vertex AI Studio. The goal is to develop a prompt that allows for customization of the tagline style, based on product attributes, target audience, and emotional resonance.

#### Tasks:

1. Create a new prompt with the `gemini-2.5-flash` model to create a customizable tagline generator for Cymbal Direct's new product line.
    
2. In the **System instructions** box, enter the following:
    

```plaintext
Cymbal Direct is partnering with an outdoor gear retailer. They're launching a new line of products designed to encourage young people to explore the outdoors. Help them create catchy taglines for this product line.
```

3. Include **2 Examples** in your prompt to guide the output style. Add this example input and output for your first example, then use this template to add another example.
    

| **Input** | **Output** |
| --- | --- |
| Write a tagline for a durable backpack designed for hikers that makes them feel prepared. Consider styles like minimalist. | Built for the Journey: Your Adventure Essentials. |

4. Design a prompt with parameters to customize taglines based on:
    
    * Product attributes (e.g., durable, lightweight)
        
    * Target audience (e.g., young adventurers, families)
        
    * Emotional resonance (e.g., empowered, connected)
        
5. Add one input and your prompt, then click the **submit button** to have Gemini generate a tagline option.
    
6. **Evaluate and Iterate**:
    
    * Experiment with different parameter combinations to see the variety of taglines produced.
        
    * Based on the results, fine-tune the wording of your prompt, add more parameter options, or adjust the style choices to achieve your desired outcome.
        
7. Name your prompt **Cymbal Tagline Generator Template**.
    
8. **Save Prompt**: Once you're happy with the results, click **Save**, and select the `us-central1` region. **Note**: if your prompt is already saved with the **Autosave** functionality, ensure the name of the prompt is correct.
    

**Note:** Ensure you are using the `gemini-2.5-flash` model for this task!

Build a Gemini tagline generator.

## Task 3. Experiment with image analysis code

In this task, you will explore the Python code for the image analysis prompt you created. You will then modify the prompt to be more specific and test the new prompt in a notebook.

1. In the Google Cloud console, on the **Navigation menu** (), click **Vertex AI &gt; Workbench**.
    
2. Find the `vertex-ai-jupyterlab` instance and click on the **Open JupyterLab** button.
    

The JupyterLab interface for your Workbench instance opens in a new browser tab.

**Note:** If you do not see notebooks in JupyterLab, please follow these additional steps to reset the instance:

1\. Close the browser tab for JupyterLab, and return to the Workbench home page.

2\. Select the checkbox next to the instance name, and click **Reset**.

3\. After the **Open JupyterLab** button is enabled again, wait one minute, and then click **Open JupyterLab**.

3. Open the notebook file named `image-analysis.ipynb`. Set the kernel to **Python 3**.
    
4. **Run all the cells** in the notebook to ensure your environment is set up correctly.
    

### Explore the image analysis code

1. From the **Vertex AI Studio** page, navigate back to the **Cymbal Product Analysis** prompt you created.
    
2. On the right side of the page, click **Code**. Use **Python** as the language.
    
3. Copy the **second code cell** into the notebook file in the specified cell.
    
4. Run the code and verify that it executes successfully and produces the expected output.
    

**Note:** After pasting the code, remember to replace the client authentication block (which uses an API key) with the version that uses your `PROJECT_ID` and `LOCATION`, as described in the markdown cell in the notebook.

### Modify the image analysis prompt

1. Within the code, there will be a line of text between triple quotes (`"""`). This is your current image analysis prompt. For example, it might be:
    

```plaintext
"""Describe this image with a focus on colors, textures, and the feeling it evokes."""
```

2. Now you will modify the prompt to be more specific. **Change the wording of the prompt in the code cell to make the output less than 10 words.**
    
3. Next, modify the prompt code to encourage the model to produce the **most** creative, unusual, and unexpected descriptions of the image it can think of.
    

**Hint:** You will need to adjust one of the parameters in the code to achieve this!

4. **Save** the changes to your code. Then, rerun the code cell in your notebook to test Gemini with the new prompt.
    
5. **Verify** that the new descriptions are shorter and more creative than the previous ones.
    

**Note:** Ensure you are **saving** your notebook file to pass the progress check!

Experiment with image analysis code.

## Task 4. Experiment with tagline generation code

In this task, you will explore the Python code for the tagline prompt you created. You will then modify the prompt to include a specific keyword and test the new prompt in a notebook.

### Explore the tagline generator code

1. Inside of your Workbench instance, open the notebook file named `tagline-generator.ipynb`. Set the kernel to **Python 3**.
    
2. From the **Vertex AI Studio** page, navigate back to the **Cymbal Tagline Generator Template** prompt you created.
    
3. On the right side of the page, click **Code**. Use **Python** as the language.
    
4. Copy the **second code cell** into the notebook file in the specified cell.
    
5. Run the code and verify that it executes successfully and produces the expected output.
    

**Note:** After pasting the code, remember to replace the client authentication block (which uses an API key) with the version that uses your `PROJECT_ID` and `LOCATION`, as described in the markdown cell in the notebook.

### Modify the tagline generation prompt

1. Within the code, there will be multiple lines of text between triple quotes (`"""`). This is your current tagline generation prompt.
    
2. Now you will modify the prompt to include a specific keyword. Modify the **last input** to **specifically request that the tagline includes the keyword** `nature`.
    
3. **Save** the changes to your code. Then, rerun the code cell in your notebook to test the language model with the new prompt.
    
4. Verify that the new tagline includes the keyword `nature`.
    

Experiment with tagline generation code.

**Note:** Wait for couple of minutes and click the check my progress button if you are not getting the score.

---

## Solution of Lab

### Quick

**Task 1 & Task 2:**

Enable Vertex AI API [Click Here](https://console.cloud.google.com/marketplace/product/google/aiplatform.googleapis.com?q=search&referrer=search&project=)

**💡 Download the 2 files below:**

* File Task 1: [Cymbal Product Analysis.json](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP519/Cymbal%20Product%20Analysis.json)
    
* File Task 2: [Cymbal Tagline Generator Template.json](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP519/Cymbal%20Tagline%20Generator%20Template.json)
    

Click this link to open Vertex AI. [Clic](https://console.cloud.google.com/marketplace/product/google/aiplatform.googleapis.com?q=search&referrer=search&project=)[k Here](https://console.cloud.google.com/vertex-ai/studio/saved-prompts?project=)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758950235277/fb6f2445-a550-44cc-a65b-3c344728c077.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758950538025/04af56ae-33fe-41c0-90c4-63b63b875480.png align="center")

Open Promt **Cymbal Product Analysis**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758955718206/155bde2a-794d-4862-93fb-ac10ebbfe2ab.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758955739513/da8a2a16-3f54-4c65-9a2e-38ff7abcceba.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758955755364/501488a4-56bf-4499-8c4e-a6338224a62d.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758955770778/c27c64d8-6f15-4f37-bf89-fd133322e0bc.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758955783169/e5dadff9-2b22-4f16-8056-db5d3604700a.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758950598002/080f1da8-62f7-4638-98fe-134fdf7c28f3.png align="center")

**Task 3 & 4:**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758946506897/f9f3a4e3-117d-4478-bf50-a9688899edc4.png align="center")

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP519/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758952116472/8123708e-f0b0-44c9-ba60-534d16b7b39c.png align="center")

Open file

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758949156966/856bb6bc-a493-4993-9867-f71743a6daa8.png align="center")

---

### Manual

%[https://youtu.be/Jaqlrv-_YFU]