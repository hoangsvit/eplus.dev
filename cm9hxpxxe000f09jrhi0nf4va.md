---
title: "Build a Multi-Modal GenAI Application: Challenge Lab - bb-ide-genai-004"
seoTitle: "Build a Multi-Modal GenAI Application: Challenge Lab - bb-ide-genai-00"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Tue Apr 15 2025 03:20:13 GMT+0000 (Coordinated Universal Time)
cuid: cm9hxpxxe000f09jrhi0nf4va
slug: build-a-multi-modal-genai-application-challenge-lab-bb-ide-genai-004
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744687026234/187c4a6d-5b71-46d4-b7f9-dcff2eafa380.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1744687201484/d3b82b38-3ab4-4f55-ba12-b880c3d79b51.png
tags: build-a-multi-modal-genai-application-challenge-lab-bb-ide-genai-004, build-a-multi-modal-genai-application-challenge-lab, bb-ide-genai-004

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

**Check my progress**

**Task 2:** Develop a second Python function called `analyze_bouquet_image(image_path)`. This function will take the image path as input along with a text prompt to generate birthday wishes based on the image passed and send it to the `gemini-2.0-flash-001` model. To ensure responses can be obtained as and when they are generated, enable streaming on the prompt requests.

Click **Check my progress** to verify the objective.

Analyze the saved image by using a multimodal model

**Check my progress**

---

## Solution of Lab

%[https://youtu.be/g-PAru0n-RU] 

```apache
curl -LO raw.githubusercontent.com/ArcadeCrew/Google-Cloud-Labs/refs/heads/main/Build%20a%20Multi-Modal%20GenAI%20Application%20Challenge%20Lab/arcadecrew.sh
source arcadecrew.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1744687094137/0cc4c5cf-6bd1-43f5-8eac-917f36b5f9f0.png align="center")