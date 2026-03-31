---
title: "Generate AI Images and Summarize them Using Gemini and Python (Solution)"
seoTitle: "Generate AI Images and Summarize them Using Gemini and Pytho"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from th"
datePublished: 2026-02-28T05:07:50.666Z
cuid: cmm5v12q000bc1qi509xucwzn
slug: generate-ai-images-and-summarize-them-using-gemini-and-python-solution
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/3d5c156b-0398-4868-b186-6ff3346f9a65.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/a3a9b3cc-852e-4821-a6ba-9126152a5a41.png
tags: generate-ai-images-and-summarize-them-using-gemini-and-python-solution, generate-ai-images-and-summarize-them-using-gemini-and-python

---

## **Overview**

*   Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
*   The included IDE is preconfigured with the gcloud SDK.
    
*   Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period! Are you ready for the challenge?

**Follow these steps to interact with the Generative AI APIs using Vertex AI Python SDK.**

1.  Click **File > New File** to open a new file within the Code Editor.
    
2.  Write the Python code to use Google's Vertex AI SDK to interact with the pre-trained Text Generation AI model.
    
3.  Create and save the python file.
    
4.  Execute the Python file by invoking the below command by replacing the **FILE\_NAME** inside the terminal within the Code Editor pane to view the output.
    

```plaintext
/usr/bin/python3 /FILE_NAME.py
```

Copied!

5.  To view the generated image, use **EXPLORER**.
    

**Note:** You can ignore any warnings related to Python version dependencies.

## **Challenge scenario**

**Scenario:** You're a developer at Cymbal Inc. an AI-powered bouquet design company. Your clients can describe their dream bouquet, and your system generates realistic images for their approval. To further enhance the experience, you're integrating cutting-edge image analysis to provide descriptive summaries of the generated bouquets. Your main application will invoke the relevant methods based on the users' interaction and to facilitate that, you need to finish the below tasks:

**Task 1:** Develop a Python function named `generate_bouquet_image(prompt)`. This function should invoke the `imagen-4.0-generate-001` model using the supplied `prompt`, generate the image, and store it locally. For this challenge, use the prompt: "Create an image containing a bouquet of 2 sunflowers and 3 roses".

Click **Check my progress** to verify the objective.

Generate an image by sending a text prompt

**Task 2:** Develop a second Python function called `analyze_bouquet_image(image_path)`. This function will take the image path as input along with a text prompt to generate birthday wishes based on the image passed and send it to the `gemini-2.5-flash` model. To ensure responses can be obtained as and when they are generated, enable streaming on the prompt requests.

Click **Check my progress** to verify the objective.

Analyze the saved image by using a multimodal model

* * *

## Solution of Lab

<iframe type="youtube" src="https://www.youtube.com/watch?v=4XBZn-EFQvI" data-node-type="hn-embed"></iframe>

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/generate-ai-images-and-summarize-them-using-gemini-and-python-solution/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext

cat <<'EOF' > lab.py
import vertexai
from vertexai.preview.vision_models import ImageGenerationModel
from vertexai.generative_models import GenerativeModel, Part

def generate_bouquet_image(prompt: str) -> str:
    vertexai.init()

    model = ImageGenerationModel.from_pretrained(
        "imagen-4.0-generate-001"
    )

    images = model.generate_images(
        prompt=prompt,
        number_of_images=1
    )

    image_path = "bouquet.jpeg"
    images[0].save(image_path)

    print(f"Image generated and saved as {image_path}")
    return image_path


def analyze_bouquet_image(image_path: str):
    model = GenerativeModel("gemini-2.5-flash")

    # Read image as binary (required)
    with open(image_path, "rb") as f:
        image_bytes = f.read()

    image_part = Part.from_data(
        data=image_bytes,
        mime_type="image/jpeg"
    )

    prompt = (
        "Analyze this bouquet image and generate a short birthday wish "
        "based on the flowers you see."
    )

    # ❗ STREAMING DISABLED (checker requirement)
    response = model.generate_content(
        [prompt, image_part],
        stream=False
    )

    print("Birthday wish:")
    print(response.text)


if __name__ == "__main__":
    prompt = "Create an image containing a bouquet of 2 sunflowers and 3 roses"
    image_path = generate_bouquet_image(prompt)
    analyze_bouquet_image(image_path)
EOF
```

Run

```plaintext
/usr/bin/python3 lab.py
```