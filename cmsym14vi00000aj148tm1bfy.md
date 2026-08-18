---
title: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG: Challenge Lab - GSP520"
seoTitle: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG: Challenge Lab - GSP520"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-08-18T11:59:30.057Z
cuid: cmsym14vi00000aj148tm1bfy
slug: inspect-rich-documents-with-gemini-multimodality-and-multimodal-rag-challenge-lab-gsp520
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/fa28f681-83e1-4b91-99a6-c0c905ed2801.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/c297d867-b678-401b-98f3-d176faed0927.png
tags: inspect-rich-documents-with-gemini-multimodality-and-multimodal-rag-challenge-lab-gsp520, inspect-rich-documents-with-gemini-multimodality-and-multimodal-rag-challenge-lab, gsp520

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Inspect Rich Documents with Gemini Multimodality and Multimodal RAG](https://www.skills.google/course_templates/981) skill badge. Are you ready for the challenge?

### Topics tested

*   Using multimodal prompts to extract information from text and visual data, generating a video description, and retrieving extra information beyond the video by using multimodality with Gemini
    
*   Building metadata of documents containing text and images, getting all relevant text chunks, and printing citations by using Multimodal Retrieval Augmented Generation (RAG) with Gemini
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### Open the notebook in Agent Platform Workbench

1.  In the Google Cloud console, on the Navigation menu (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ), click **Agent Platform > Notebooks > Workbench**.
    
2.  Find the `generative-ai-jupyterlab` instance and click on the **Open JupyterLab** button.
    

The JupyterLab interface for your Workbench instance opens in a new browser tab.

### Set up the notebook

1.  Open the `inspect_rich_documents_w_gemini_multimodality_and_multimodal_rag.ipynb` file.
    
2.  In the **Select Kernel** dialog, choose **Python 3 (Local)** from the list of available kernels.
    
3.  Run through the **Getting Started** section of the notebook. The Project ID and Location are pre-configured for you.
    

**Note:** If you experience a 429 response from any of the notebook cell executions, wait one minute before running the cell again to proceed.

Run through the 4 cells in the **Setup and requirements** section of the notebook (before you get to Task 1).

## **Challenge scenario**

You are a Marketing Campaign Coordinator at a media company, working closely with the Marketing Manager to plan, execute, and evaluate campaigns to meet sales targets. Recently, you secured an exciting new contract with Google. As a Marketing Campaign Coordinator, you’re eager to dive into the materials that will help you familiarize yourself with the Google brand and Google brand identity as quickly as possible. Therefore, you plan to review Google’s brand guidelines, previous campaigns, product ads, customer testimonials, and financial reports by leveraging Gemini’s innovative capabilities to gain deeper insights into Google more efficiently.

In this challenge, you begin with multimodal prompts to extract information from text and visual data, generating a video description, and retrieving extra information beyond the video by using multimodality with Gemini. You also build metadata of documents containing text and images, getting all relevant text chunks, and printing citations by using Multimodal Retrieval Augmented Generation (RAG) with Gemini.

## **Task 1. Generate multimodal insights with Gemini**

In this task, you familiarize yourself with the Google brand and Google brand identity using Gemini, which is a multimodal model that supports multimodal prompts. You include text, image(s), and video in your prompt requests and get text or code responses.

To complete this task, follow the instructions in the specified sections of the notebook.

**Note:** Save the notebook script before clicking on the **Check my progress** button for every task.

1.  To study multiple images using a multimodal model, follow the instructions in the **Image understanding across multiple images** section.
    

2.  To compare images using a multimodal model, follow the instructions in the **Similarities/Differences between images** section.
    
3.  To generate a video description using a multimodal model, follow the instructions in the **Generate a video description** section.
    
    ```plaintext
    Use [https://storage.googleapis.com/spls/gsp520/google-pixel-8-pro.mp4](https://storage.googleapis.com/spls/gsp520/google-pixel-8-pro.mp4) to complete this step.
    ```
    
4.  To extract object tags throughout a video using a multimodal model, follow the instructions in the **Extract tags of objects throughout the video** section.
    
    ```plaintext
    Use [https://storage.googleapis.com/spls/gsp520/google-pixel-8-pro.mp4](https://storage.googleapis.com/spls/gsp520/google-pixel-8-pro.mp4), to complete this step.
    ```
    
5.  To further explore the video using a multimodal model, follow the instructions in the **Ask more questions about a video** section.
    
    ```plaintext
    Use [https://storage.googleapis.com/spls/gsp520/google-pixel-8-pro.mp4](https://storage.googleapis.com/spls/gsp520/google-pixel-8-pro.mp4) to complete this step.
    ```
    
6.  To get even more information from images using a multimodal model, follow the instructions in the **Retrieve extra information beyond the video** section.
    

## **Task 2. Retrieve and integrate knowledge with multimodal retrieval augmented generation (RAG)**

To complete this task, follow the instructions in the specified sections of the notebook.

Available data and helper functions to use for Task 2:

*   The [Terms of Service document](https://storage.googleapis.com/spls/gsp520/Google_Branding/Google_terms_of_service_en_us.pdf) for Google's services, defining the relationship between Google and its users. It covers what users can expect from Google, the rules for using the services, intellectual property rights related to content, and the procedures for resolving disputes or disagreements. This sample document contains only text.
    
*   A modified version of [Google-10K](https://abc.xyz/assets/investor/static/pdf/20220202_alphabet_10K.pdf) which provides a comprehensive overview of the company's financial performance, business operations, management, and risk factors. As the original document is rather large, you use a modified version with only 14 pages, split into two parts - [Part 1](https://storage.googleapis.com/github-repo/rag/intro_multimodal_rag/intro_multimodal_rag_old_version/data/google-10k-sample-part1.pdf) and [Part 2](https://storage.googleapis.com/github-repo/rag/intro_multimodal_rag/intro_multimodal_rag_old_version/data/google-10k-sample-part2.pdf) instead. Although it's truncated, this sample document still contains text along with images such as tables, charts, and graphs.
    

You also select from the following helper functions to complete tasks below. For more information on these functions, refer to [GitHub](https://raw.githubusercontent.com/GoogleCloudPlatform/generative-ai/main/gemini/use-cases/retrieval-augmented-generation/utils/intro_multimodal_rag_utils.py)):

*   For the inspect the processed text metadata function:
    
    *   text: The original text from the page. text\_embedding\_page: The
        
    *   embedding of the original text from the page. chunk\_text: The original
        
    *   text divided into smaller chunks. chunk\_number: The index of each
        
    *   text chunk. text\_embedding\_chunk: The embedding of each text chunk.
        
*   For the inspect the processed image metadata function:
    
    *   img\_desc: Gemini-generated textual description of the image.
        
    *   mm\_embedding\_from\_text\_desc\_and\_img: Combined embedding of
        
    *   image and its description, capturing both visual and textual
        
    *   information. mm\_embedding\_from\_img\_only: Image embedding
        
    *   without description, for comparison with description-based analysis.
        
    *   text\_embedding\_from\_image\_description: Separate text embedding of the generated description, enabling textual analysis and comparison.
        
*   For the import the helper functions to implement RAG function:
    
    *   get\_similar\_text\_from\_query(): Given a text query, finds text from the document which are relevant, using cosine similarity algorithm. It uses text embeddings from the metadata to compute. The results can be filtered by top score, page/chunk number, or embedding size.
        
    *   print\_text\_to\_text\_citation(): Prints the source (citation) and details of the retrieved text from the get\_similar\_text\_from\_query() function.
        
    *   get\_similar\_image\_from\_query(): Given an image path or an image, finds images from the document which are relevant. It uses image embeddings from the metadata. print\_text\_to\_image\_citation(): Prints the source (citation) and the details of retrieved images from the
        
    *   \`get\_similar\_image\_from\_query()\`\` function. get\_gemini\_response(): Interacts with a Gemini model to answer questions based on a combination of text and image inputs.
        
    *   display\_images(): Displays a series of images provided as paths or PIL Image objects.
        

1.  To import and run helper functions, follow the instructions in the **Build metadata of documents containing text and images** section.
    
2.  To work with the provided variables, follow the instructions in the **Create a user query** section.
    
3.  To retrieve relevant chunks of text based on the query, follow the instructions in the **Get all relevant text chunks** section.
    
4.  To organize the chunks of text, follow the instructions in the **Create context text**.
    
5.  To pass the context to Gemini and generate a response, follow the instructions to **Pass context to Gemini**.
    

* * *

## Solution of Lab

### Manual

%[https://www.youtube.com/watch?v=yssqCvyvPpE]