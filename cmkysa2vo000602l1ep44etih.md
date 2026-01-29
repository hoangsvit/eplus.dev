---
title: "Multimodal Content Generation with Gemini on Vertex AI (Solution)"
seoTitle: "Multimodal Content Generation with Gemini on Vertex AI (Solution)"
seoDescription: "Generate multimodal content with images and text using Gemini on Vertex AI. Learn to integrate and automate with Python scripts"
datePublished: Thu Jan 29 2026 01:36:46 GMT+0000 (Coordinated Universal Time)
cuid: cmkysa2vo000602l1ep44etih
slug: multimodal-content-generation-with-gemini-on-vertex-ai-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769650579740/e195ec08-1b9d-4ec4-bcc5-bdafd91e2d6e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1769650584195/44b77d3f-a5fe-43fe-99fb-05bf115f9006.png
tags: vertex-ai, multimodal-content-generation-with-gemini-on-vertex-ai-solution, multimodal-content-generation-with-gemini-on-vertex-ai, multimodal-content-generation-with-gemini

---

## Overview

* Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
* The included IDE is preconfigured with the gcloud SDK.
    
* Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## Challenge scenario

**Scenario:** You are working on a project where you need to generate descriptive content based on images and text prompts. You’re utilizing Google Cloud's Vertex AI, specifically a generative model that can process multimodal inputs (i.e., a mix of text and images) to produce creative or informative outputs. Your task is to create a Python script that loads images from Cloud Storage, integrates them with text prompts, and uses a generative model to generate content based on these inputs.

**Task:** Develop a Python function named `load_image_from_url(prompt)`. This function should invoke the `gemini-2.0-flash` model using the supplied `prompt`, generate the response.

**Follow these steps to interact with the Generative AI APIs using Vertex AI Python SDK.**

1. Click **File &gt; New File** to open a new file within the Code Editor.
    
2. Write the Python code to use Google's Vertex AI SDK to interact with the pre-trained Text Generation AI model.
    
3. Create and save the python file.
    
4. Execute the Python file by invoking the below command by replacing the **FILE\_NAME** inside the terminal within the Code Editor pane to view the output.
    

```apache
/usr/bin/python3 /FILE_NAME.py
```

Click **Check my progress** to verify the objective.

Send a multimodal prompt to Gen AI and receive a response

---

## Solution of Lab

%[https://youtu.be/lGIXcw9jt9k] 

**Create a file <mark>main.py</mark>**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1769650482149/d246776d-f6e2-44cb-b0fb-f1f6005884b7.png align="center")

```python
import vertexai
from vertexai.generative_models import GenerativeModel, Part

# -----------------------------
# CONFIG
# -----------------------------
PROJECT_ID = "YOUR_PROJECT_ID"   # replace
LOCATION = "YOUR_REGION"

vertexai.init(project=PROJECT_ID, location=LOCATION)

def load_image_from_url(prompt):
    """
    Generates content using Gemini 2.0 Flash
    with image + text input
    """

    model = GenerativeModel("gemini-2.0-flash")

    image = Part.from_uri(
        uri="gs://cloud-samples-data/vision/landmark/eiffel_tower.jpg",
        mime_type="image/jpeg"
    )

    response = model.generate_content(
        [image, prompt]
    )

    return response.text


if __name__ == "__main__":
    prompt = "Describe this image in detail and explain what makes it unique."

    print("Prompt:", prompt)
    print("\nModel Response:\n")

    try:
        print(load_image_from_url(prompt))
    except Exception as e:
        print("Error:", e)
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1769650470738/7c47aeee-516e-4275-aefa-8f5144996214.png align="center")

```apache
/usr/bin/python3 /main.py
```