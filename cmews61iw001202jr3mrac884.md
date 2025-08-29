---
title: "Build a Multi-Modal GenAI Application: Challenge Lab"
seoTitle: "Build a Multi-Modal GenAI Application: Challenge Lab"
seoDescription: "Learn to build a GenAI app with cloud tools, generating and analyzing bouquet images in this challenge lab. Apply your coding skills now!"
datePublished: Fri Aug 29 2025 11:59:51 GMT+0000 (Coordinated Universal Time)
cuid: cmews61iw001202jr3mrac884
slug: build-a-multi-modal-genai-application-challenge-lab
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756468708814/dc729852-b8e1-4b78-9ea1-a3a5cd458fda.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1756468764758/0e1e6f6f-d172-48e3-aa16-c7a3295544c9.png
tags: genai, build-a-multi-modal-genai-application-challenge-lab, genai-application

---

## Overview

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period! Are you ready for the challenge?

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included cloud terminal is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

**Scenario:** You're a developer at an AI-powered bouquet design company. Your clients can describe their dream bouquet, and your system generates realistic images for their approval. To further enhance the experience, you're integrating cutting-edge image analysis to provide descriptive summaries of the generated bouquets. Your main application will invoke the relevant methods based on the users' interaction and to facilitate that, you need to finish the below tasks:

**Task 1:** Develop a Python function named `generate_bouquet_image(prompt)`. This function should invoke the `imagen-3.0-generate-002` model using the supplied `prompt`, generate the image, and store it locally. For this challenge, use the prompt: `Create an image containing a bouquet of 2 sunflowers and 3 roses`.

Click **Check my progress** to verify the objective.

Generate an image by sending a text prompt

**Task 2:** Develop a second Python function called `analyze_bouquet_image(image_path)`. This function will take the image path as input along with a text prompt to generate birthday wishes based on the image passed and send it to the `gemini-2.0-flash-001` model. To ensure responses can be obtained as and when they are generated, enable streaming on the prompt requests.

Click **Check my progress** to verify the objective.

Analyze the saved image by using a multimodal model

---

## Solution of Lab

%[https://youtu.be/r8s0AUaOEQE] 

```apache
curl -LO https://raw.githubusercontent.com/Itsabhishek7py/GoogleCloudSkillsboost/refs/heads/main/Build%20a%20Multi-Modal%20GenAI%20Application%3A%20Challenge%20Lab/abhishek.sh
source abhishek.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1756468742185/52ffce21-2a6d-4369-84fe-65d7382bc49a.png align="center")