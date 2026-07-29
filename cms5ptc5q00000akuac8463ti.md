---
title: "Engineer AI Agents with Agent Development Kit (ADK): Challenge Lab - GSP540"
seoTitle: "Engineer AI Agents with Agent Development Kit (ADK): Challenge Lab - GSP540"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-07-29T06:40:05.596Z
cuid: cms5ptc5q00000akuac8463ti
slug: engineer-ai-agents-with-agent-development-kit-adk-challenge-lab-gsp540
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/472be7e4-7f0f-405a-b4f0-8398730b958d.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/79e7bf85-0b8b-4f49-b269-30ea2365afcc.png
tags: engineer-ai-agents-with-agent-development-kit-adk-challenge-lab-gsp540, engineer-ai-agents-with-agent-development-kit-adk-challenge-lab, gsp540

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who enrolled in the **Agent Development Kit (ADK)** course. Are you ready for the challenge?

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1.  Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the right is the **Lab setup and access** panel with the following:
    
    *   The **Open Google Cloud console** button
        
    *   The temporary credentials (username and password) that you must use for this lab
        
    *   Other information, if needed, to step through this lab
        
    
    Note that the lab timer is located near the top of the page, showing the remaining time.
    
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
4.  You can also find the Username in the **Lab setup and access** panel.
    
5.  Click **Next**.
    
6.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
7.  You can also find the Password in the **Lab setup and access** panel.
    
8.  Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
9.  Click through the subsequent pages:
    
    *   Accept the terms and conditions.
        
    *   Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    *   Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="center")

## **Related learning materials**

If you are looking for resources that will help you develop the skills required to complete this lab successfully, consider reviewing relevant sections from the following:

**Note:** The documentation links below may contain examples using Gemini API keys. For this lab, you must ignore those instructions and use Agent Platform as detailed in the tasks below.

| **Category** | **Resources** |
| --- | --- |
| **Online Documentation** |  |

*   [Agent Development Kit (ADK)](https://google.github.io/adk-docs/)
    
*   [Google Search Tool for ADK](https://google.github.io/adk-docs/tools/gemini-api/google-search/)
    
*   [Structuring Data with ADK](https://google.github.io/adk-docs/agents/llm-agents/#structuring-data-input_schema-output_schema-output_key)
    
*   [Sequential Agents](https://google.github.io/adk-docs/agents/workflow-agents/sequential-agents/)
    

<table style="min-width: 50px;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><td colspan="1" rowspan="1"><p><strong>Courses, Labs and Tutorials</strong></p></td><td colspan="1" rowspan="1"><p></p></td></tr></tbody></table>

*   [Understand Google Cloud Agents](https://www.skills.google/course_templates/1504)
    
*   [Build your first agent with Agent Development Kit (ADK)](https://www.skills.google/course_templates/1563)
    
*   [Build intelligent agents with the Agent Development Kit (ADK)](https://www.skills.google/course_templates/1382)
    

## **Challenge scenario**

You have just joined **Cymbal Travel**, a premier travel agency dedicated to curating the perfect vacation experiences for their customers. Cymbal Travel uses a suite of AI agents to scour the web for travel updates, validate destination data, and audit marketing brochures for accuracy.

![cymbal labs logo](https://cdn.qwiklabs.com/qOlrcccT7tpWjoRm26%2FwivZVzpaqvKP%2B0wCvnFY7Yj8%3D align="center")

Your team has built prototypes for a **"Travel Scout"** and a **"Brochure Auditor"** using Google's **Agent Development Kit (ADK)**. However, the prototypes are currently misconfigured, incomplete, or broken.

For example, the *Brochure Auditor* is supposed to be a multi-agent pipeline that both checks and fixes errors, but the previous engineer only implemented the "check" phase. The *Travel Scout* hasn't been given access to Google Search yet.

As a new Agent Engineer, your job is to repair and deploy these agents to ensure downstream systems receive consistent, accurate data.

You will be working in the `adk_project` directory, which contains:

*   `my_google_search_agent`: A "Travel Scout" meant to search for events (currently broken).
    
*   `geo_validator`: A "Destination Verifier" that returns unstructured text (needs a strict schema).
    
*   `llm_auditor`: A sophisticated multi-agent system for brochure auditing (needs configuration).
    

### Your challenge

Your tasks include the following:

*   Initialize the **Travel Scout** (`my_google_search_agent`) to use the Google Search tool.
    
*   Run the agent to find upcoming events.
    
*   Enforce strict JSON schemas in the **Destination Verifier** (`geo_validator`).
    
*   Configure the **Brochure Auditor** (`llm_auditor`) pipeline by enabling the missing **Reviser Agent**.
    

## **Task 1. Install ADK and set up your environment**

In this task, you will install the Agent Development Kit (ADK) and set up your environment.

1.  Open the Cloud Shell Terminal.
    
2.  Update your `PATH` environment variable and **install ADK** by running the following commands in the Cloud Shell Terminal.
    
    ```plaintext
    export PATH=$PATH:"/home/${USER}/.local/bin"
    python3 -m pip install google-adk
    ```
    
3.  To authenticate to Google Cloud and set up credentials for your project and user, run the following command:
    
    ```plaintext
    gcloud auth application-default login
    ```
    
4.  When prompted, type **Y**, and press **ENTER**.
    
5.  To launch the Google Cloud sign-in flow, press CONTROL (for Windows and Linux) or COMMAND (for MacOS), and click the link in the terminal.
    
6.  If prompted *Do you want Code OSS - Cloud Shell to open the external website?* click **Open**.
    
7.  Choose the student email address.
    
8.  When you're prompted to continue, click **Continue**.
    
9.  To let the Google Cloud SDK access your Google Account and agree to the terms, click **Allow**.
    
    Your verification code is displayed in the browser tab.
    
10.  Click **Copy**.
     
11.  Back in the terminal, where it says **Enter authorization code**, paste the code and press **ENTER**.
     
     You are now authenticated to Google Cloud.
     
12.  Download the source code for the lab:
     
     ```plaintext
     gcloud storage cp gs://-bucket/adk_project.zip .
     unzip adk_project.zip
     cd adk_project
     pip install -r requirements.txt
     ```
     

## **Task 2. Initialize and Configure the Travel Scout**

In this task, you will get the **Travel Scout** (`my_google_search_agent`) online. The previous engineer left the agent definition incomplete. It's supposed to use Google Search to find real-time travel info, but currently, it has no tools enabled.

1.  From the Cloud Shell Terminal, Open the editor by selecting **Open Editor**.
    
    This will open the Cloud Console Editor making it easier to navigate and edit the files.
    
2.  Select the **View** tab and choose **Toggle hidden files** to see the hidden files that will need to be edited.
    
3.  Navigate to `adk_project/my_google_search_agent`.
    
    **Important:** Do not create or use API keys for this lab. You must use Agent Platform by configuring the .env file as instructed below.
    
4.  Configure the environment (`.env`) to use **Agent Platform** with your provided Project ID and **global** location.
    
    ```plaintext
    GOOGLE_GENAI_USE_ENTERPRISE=true
    GOOGLE_CLOUD_PROJECT=
    GOOGLE_CLOUD_LOCATION=global
    MODEL=model_name
    ```
    
    **Note:** Be sure to set GOOGLE\_CLOUD\_LOCATION to global. This is pertinent to the lab working successfully.
    
5.  Modify [`agent.py`](http://agent.py) to **enable the** `google_search` **tool**. (Tip: Pass `tools=[google_search]` in the `Agent` definition).
    
6.  Navigate back to the project root and launch the **ADK Dev UI** (`adk web`).
    
    ```plaintext
    cd ~/adk_project
    adk web --allow_origins "regex:https://.*\.cloudshell\.dev"
    ```
    
7.  To open the web server select the link [**http://127.0.0.1:8000**](http://127.0.0.1:8000).
    
8.  Select **my\_google\_search\_agent** and ask: `What are some major events in Tokyo in 2025?`**Note:** You must configure the agent to interpret the search results (grounding). Ensure the agent is actually performing a search action. Once you have successfully received a response grounded in Google Search results, verify the objective. **Note:** If you receive an error, select the + New Session option in the top right corner and try again.
    
9.  Close the Web Server and return to the editor in Cloud Shell.
    
10.  Stop the web server by typing `CTRL+C` in the Cloud Shell.
     

## **Task 3. Verify the agent via the CLI**

You can effectively test any of your agents using the CLI.

1.  From the `adk_project` directory run `adk run my_google_search_agent` and ask it about the currency exchange rate for Japan.
    
2.  Close out of the CLI by typing `CTRL+C` in the Cloud Shell.
    

## **Task 4. Enforce structured standards**

The **Destination Verifier** (`geo_validator`) is currently returning free-form text. The Booking Engine team needs this agent to return a strict JSON object containing just the capital city.

1.  Navigate to `adk_project/geo_validator`.
    
    **Important:** Do not create or use API keys for this lab. You must use Agent Platform by configuring the .env file as instructed below.
    
2.  Configure the environment (`.env`) to use **Agent Platform** with your provided Project ID and **global** location.
    
    ```plaintext
    GOOGLE_GENAI_USE_ENTERPRISE=true
    GOOGLE_CLOUD_PROJECT=
    GOOGLE_CLOUD_LOCATION=global
    MODEL=model_name
    ```
    
3.  Modify [`agent.py`](http://agent.py) to:
    
    *   Define a **Pydantic model** `CountryCapital` (Tip: inherit from `BaseModel` and define a field `capital: str`).
        
    *   Enforce this schema by passing it as the `output_schema` argument in the `Agent` definition.
        
    *   **Disable transfers** by setting `disallow_transfer_to_parent=True` and `disallow_transfer_to_peers=True` in the agent definition.
        
    *   **Set Model**: Ensure you use the latest Flash model: `model_name`
        
4.  Run the agent programmatically: `python3 geo_validator/`[`agent.py`](http://agent.py)
    

The output should be a JSON object (e.g., `{"capital": "Paris"}`), not a sentence.

## **Task 5. Deploy the Brochure Auditor**

The crown jewel of Cymbal Travel is the **Brochure Auditor** (`llm_auditor`), a sequential multi-agent system designed to ensure marketing accuracy.

It is supposed to work in two stages:

*   **Critic Agent**: Fact-checks a marketing claim against the web.
    
*   **Reviser Agent**: Rewrites the claim based on the Critic's findings.
    

However, the pipeline is currently **broken**. The previous engineer commented out the `reviser_agent` code, so the pipeline stops after crticism and never fixes the text. Your job is to restore the full pipeline.

1.  Navigate to `adk_project/llm_auditor`.
    
    **Important:** Do not create or use API keys for this lab. You must use Agent Platform by configuring the .env file as instructed below.
    
2.  Configure the environment (`.env`) to use **Agent Platform** with your provided Project ID and **global** location.
    
    ```plaintext
    GOOGLE_GENAI_USE_ENTERPRISE=true
    GOOGLE_CLOUD_PROJECT=
    GOOGLE_CLOUD_LOCATION=global
    MODEL=model_name
    ```
    
3.  Modify [`agent.py`](http://agent.py) to **enable the** `reviser_agent`. The pipeline currently only has a critic; you need to uncomment the reviser import and add it to the `sub_agents` list.
    
4.  Navigate back to the project root and launch the **ADK Dev UI**.
    
    ```plaintext
    cd ~/adk_project
    adk web --allow_origins "regex:https://.*\.cloudshell\.dev"
    ```
    
5.  Select **llm\_auditor** and submit the following false claim for auditing: `Double check this: You can take a direct train from Hawaii to Japan.`
    

The system should invoke the critic to debunk the claim and the reviser to provide the correct fact.

* * *

## Solution of Lab

### Manual

%[https://www.youtube.com/watch?v=ScsDRNj3UMA]