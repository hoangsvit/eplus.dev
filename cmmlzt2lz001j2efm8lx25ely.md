---
title: "Build an AI Science Tutor Application with Vertex AI (Solution)"
seoTitle: "Build an AI Science Tutor Application with Vertex AI (Soluti"
seoDescription: "Scenario: You're a developer at an educational technology company that provides online tutoring and educational resources. They want to create an inte"
datePublished: 2026-03-11T12:05:54.168Z
cuid: cmmlzt2lz001j2efm8lx25ely
slug: build-an-ai-science-tutor-application-with-vertex-ai-solution
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/d3d7df7c-df0e-493e-8e2b-8dfaa57acbcf.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/89493bc5-f5ae-470f-a4d0-c361dbd543a0.png
tags: build-an-ai-science-tutor-application-with-vertex-ai-solution, build-an-ai-science-tutor-application-with-vertex-ai

---

## **Overview**

*   Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
*   The included cloud terminal is preconfigured with the gcloud SDK.
    
*   Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## **Challenge scenario**

**Scenario:** You're a developer at an educational technology company that provides online tutoring and educational resources. They want to create an interactive science tutoring assistant to help students with questions related to astronomy and other scientific topics. They decide to use Google Cloud’s Vertex AI SDK to build a chat-based solution that can provide informative answers. you need to finish the below tasks:

**Task:** Develop a Python function named `science_tutoring(prompt)`. This function should invoke the `gemini-2.5-flash-lite` model using the supplied `prompt`, generate the response. For this challenge, use the prompt: **"How many planets are there in the solar system?."**

**Follow these steps to interact with the Generative AI APIs using Vertex AI Python SDK.**

1.  Click **File > New File** to open a new file within the Code Editor.
    
2.  Write the Python code to use Google's Vertex AI SDK to interact with the pre-trained Text Generation AI model.
    
3.  Create and save the python file.
    
4.  Execute the Python file by invoking the below command by replacing the **FILE\_NAME** inside the terminal within the Code Editor pane to view the output.
    

```plaintext
/usr/bin/python3 /FILE_NAME.py
```

**Note:** You can ignore any warnings related to Python version dependencies.

Click **Check my progress** to verify the objective.

Create and run a file to send a chat prompt to Gen AI and receive a response

* * *

## Solution of Lab

%[https://www.youtube.com/watch?v=Yn_4Ij-7ilw] 

```plaintext

curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/build-an-ai-science-tutor-application-with-vertex-ai-solution/lab.sh
source lab.sh
```

**Script Alternative**

```python
import vertexai
from vertexai.generative_models import GenerativeModel

# Replace with your actual project details
PROJECT_ID = "your-project-id"
LOCATION = "us-central1"

# Initialize Vertex AI onAxcode
vertexai.init(project=PROJECT_ID, location=LOCATION)

def science_tutoring(prompt):
    """
    Sends a prompt to ab Gemini 2.5 Flash Lite model
    and returns the generated response.
    """
    try:
        # Load ab52=460 2.5 Flash Lite model
        model = GenerativeModel("gemini-2.5-flash-lite")

        # Generate response
        response = model.generate_content(prompt)

        return response.text

    except Exception as e:
        return f"Error occurred: {str(e)}"


if __name__ == "__main__":
    test_prompt = "How many planets are there in the solar system?"
    
    result = science_tutoring(test_prompt)
    
    print("Response:")
    print(result)
```