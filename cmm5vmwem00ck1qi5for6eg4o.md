---
title: "Build an AI-Powered Interview Question Generator using Gemini (Solution)"
seoTitle: "Build an AI-Powered Interview Question Generator using Gemin"
seoDescription: "Scenario: You're a developer at recruitment firm that specializes in tech talent acquisition. You are looking for ways to streamline the interview pre"
datePublished: 2026-02-28T05:24:48.911Z
cuid: cmm5vmwem00ck1qi5for6eg4o
slug: build-an-ai-powered-interview-question-generator-using-gemini-solution
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/b4ca9de8-5e28-4c01-b39f-d075b0838ea6.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/6ddf5578-6b64-49d9-998d-298eece5bd93.png
tags: build-an-ai-powered-interview-question-generator-using-gemini-solution, build-an-ai-powered-interview-question-generator-using-gemini

---

## **Overview**

*   Labs are timed and cannot be paused. The timer starts when you click **Start Lab**.
    
*   The included IDE is preconfigured with the gcloud SDK.
    
*   Use the terminal to execute commands and then click **Check my progress** to verify your work.
    

## **Challenge scenario**

**Scenario:** You're a developer at recruitment firm that specializes in tech talent acquisition. You are looking for ways to streamline the interview preparation process for hiring managers by generating tailored interview questions for various roles using AI. you need to finish the below task:

**Task:** Develop a Python function named `interview(prompt)`. This function should invoke the `gemini-2.5-flash-lite` model using the supplied `prompt`, generate the response. For this challenge, use the prompt: "Give me ten interview questions for the role of program manager."

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

Create and run a file to send a text prompt to Gen AI and receive a response

* * *

## Solution of Lab

<iframe type="youtube" src="https://www.youtube.com/watch?v=OwugcUJAk60" data-node-type="hn-embed"></iframe>

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/build-an-ai-powered-interview-question-generator-using-gemini-solution/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
cat <<'EOF' > lab.py

#!/usr/bin/python3
import vertexai
from vertexai.generative_models import GenerativeModel

# Prompt required by the lab
PROMPT = "Give me ten interview questions for the role of program manager."

def interview(prompt: str) -> str:
    """
    Invoke Vertex AI Gemini model (gemini-2.5-flash-lite) with the supplied prompt
    and return the generated text response.
    """
    # Auto-detect project and region from the gcloud environment (Qwiklabs usually sets these)
    project_id = None
    location = None
    try:
        import subprocess
        project_id = subprocess.check_output(
            ["gcloud", "config", "get-value", "project"],
            text=True
        ).strip()
        location = subprocess.check_output(
            ["gcloud", "config", "get-value", "ai/region"],
            text=True
        ).strip()
    except Exception:
        pass

    # Sensible defaults for most labs if ai/region isn't set
    if not project_id:
        raise RuntimeError("Could not detect GCP project. Run: gcloud config get-value project")
    if not location or location == "(unset)":
        location = "us-central1"

    vertexai.init(project=project_id, location=location)

    model = GenerativeModel("gemini-2.5-flash-lite")
    response = model.generate_content(
        prompt,
        generation_config={
            "temperature": 0.7,
            "max_output_tokens": 512,
        },
    )

    # Return the text output
    return response.text if hasattr(response, "text") else str(response)

if __name__ == "__main__":
    print(interview(PROMPT))
EOF
```

Run

```plaintext
/usr/bin/python3 lab.py
```