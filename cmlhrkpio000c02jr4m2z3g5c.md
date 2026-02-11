---
title: "Analyze the Text Prompt and Use it to Build an AI Image (Solution)"
seoTitle: "Analyze the Text Prompt and Use it to Build an AI Image (Solution)"
seoDescription: "Develop AI images of sports venues using Python & Vertex AI SDK. Enhance skills in dynamic, scenario-based labs to improve task efficiency"
datePublished: Wed Feb 11 2026 08:24:39 GMT+0000 (Coordinated Universal Time)
cuid: cmlhrkpio000c02jr4m2z3g5c
slug: analyze-the-text-prompt-and-use-it-to-build-an-ai-image-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770798264396/57da5282-1047-4ebc-8cc6-e2463a266eb7.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1770798249739/6263df24-35c3-4103-842f-f580cc505bb9.png
tags: analyze-the-text-prompt-and-use-it-to-build-an-ai-image

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included IDE is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period! Are you ready for the challenge?

## Challenge scenario

**Scenario:** You're a developer at a company specializing in AI-driven sports venue design. Your clients are sports organizations and city planners who want to visualize potential new venues or renovations. Your system generates realistic images of these venues based on textual descriptions. Your main application will invoke the relevant methods based on the users' interaction and to facilitate that, you need to finish the below tasks:

**Task:** Develop a Python function named `generate_image(prompt)`. This function should invoke the `imagen-3.0-generate-002` model using the supplied `prompt`, which will uses Gemini's ability to understand the text prompt and use it to build an AI Image.

For this challenge, use the prompt: **"Create an image of a cricket ground in the heart of Los Angeles"**.

**Follow these steps to interact with the Generative AI APIs using Vertex AI Python SDK.**

1. Click **File &gt; New File** to open a new file within the Code Editor.
    
2. Write the Python code to use Google's Vertex AI SDK to interact with the pre-trained Text Generation AI model.
    
3. Create and save the python file.
    
4. Execute the Python file by invoking the below command by replacing the **FILE\_NAME** inside the terminal within the Code Editor pane to view the output.
    

```apache
/usr/bin/python3 /FILE_NAME.py
```

5. Now to view the generated image, Click **EXPLORER &gt; image.jpeg**.
    

**Note:** You can ignore any warnings related to Python version dependencies.

Click **Check my progress** to verify the objective.

Please create and run python file to generate an AI Image and if already done please wait till the logs are being created.

Send a text prompt to Gen AI and receive an image response

*Please create and run python file to generate an AI Image and if already done please wait till the logs are being created.*

---

## Solution of Lab

%[https://www.youtube.com/watch?v=20h0_LcltWs] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/analyze-the-text-prompt-and-use-it-to-build-an-ai-image-solution/lab.sh
source lab.sh
```

**Script Alternative**

```python
import vertexai
from vertexai.preview.vision_models import ImageGenerationModel

def generate_image(prompt: str):
    # Initialize Vertex AI
    vertexai.init()

    # Load Imagen 3 model
    model = ImageGenerationModel.from_pretrained(
        "imagen-3.0-generate-002"
    )

    # Generate image
    images = model.generate_images(
        prompt=prompt,
        number_of_images=1
    )

    # Save the generated image
    image = images[0]
    image.save("image.jpeg")

    print("Image generated and saved as image.jpeg")

if __name__ == "__main__":
    generate_image(
        "Create an image of a cricket ground in the heart of Los Angeles"
    )
```