---
title: "Google DeepMind: Train a Small Language Model (Challenge Lab) - GSP531"
seoTitle: "Google DeepMind: Train a Small Language Model (Challenge Lab) - GSP531"
seoDescription: "Important: To earn the skill badge, you must be enrolled in the challenge lab course. Please ensure you are enrolled before you begin this lab.

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes."
datePublished: 2026-08-12T13:20:15.271Z
cuid: cmsq49vgo00000akybogg7jfe
slug: google-deepmind-train-a-small-language-model-challenge-lab-gsp531
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/2f479d1e-ee81-4968-9b11-4055d1f4fdfc.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/d4850573-f14f-41fa-a958-ed9651ca57a0.png
tags: google-deepmind-train-a-small-language-model-challenge-lab-gsp531, google-deepmind-train-a-small-language-model-challenge-lab, gsp531

---

## **Overview**

**Important:** To earn the skill badge, you must be enrolled in the [challenge lab course](https://www.skills.google/course_templates/1453). Please ensure you are enrolled before you begin this lab.

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This challenge lab is recommended for students who have completed the [Google DeepMind: 01 Build Your Own Small Language Model](https://goo.gle/build-small-LM) course. To build a stronger foundation and see how this lab fits into the broader curriculum, we encourage you to explore the [Google DeepMind AI Research Foundations](https://www.skills.google/paths/3135) learning path.

Now, it's time to apply what you've learned to a practical, real-world scenario. You will step into the role of a developer for Cymbal Chat, a startup specializing in custom AI. Your mission is to use a provided dataset of short children's stories in Arabic to build the foundational codebase they need to meet the lab's objectives. Are you ready for the challenge?

### Topics tested

*   **Tokenizer:** Build a character-level tokenizer for Arabic text.
    
*   **N-gram text generator:** Develop an n-gram based text generator as a baseline model.
    
*   **Data preparation:** Prepare a dataset of Arabic text for training a character-based transformer language model.
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

You must wait for the lab to provision before making any changes to the environment. The necessary pre-configured components will be available once the lab is ready.

## **Challenge scenario**

## **Task 1. Import the notebook, define helper functions, and load data**

For this task, you import the necessary libraries and load the Arabic stories dataset. **Do not modify** the pre-written code cells in the Jupyter Notebook that are labeled accordingly.

### Import the notebook

1.  In the Google Cloud console, navigate to **Agent Platform** > **Notebooks** > **Colab Enterprise** > **My notebooks**.
    
2.  Select the `us-east1` region.
    
3.  Click **Import**.
    
4.  On the **Import notebooks** form, select **Cloud Storage**.
    
5.  For **Notebook file path**, enter `qwiklabs-gcp-04-dab52e1c4487-bucket/gdm_challenge_lab.ipynb`.
    
6.  Click **Import**. The notebook, `gdm_challenge_lab.ipynb`, will open in a new tab upon completion.
    

### Execute the notebook in Colab

1.  **Connect to the runtime:** To execute the cells, you must first connect the notebook `gdm_challenge_lab.ipynb` to a runtime environment:
    
    *   In the notebook, click the **Additional connection options** expander arrow (top right corner).
        
    *   Select **Connect to a runtime**.
        
    *   In the **Connect to Agent Platform runtime** dialog, select **Connect to an existing runtime**.
        
    *   Select the existing runtime `colab-cpu-runtime`.
        
    *   Click **Connect**.
        
    *   If you are prompted with a dialog to authenticate, select the student username [`student-02-9079dc5062b9@qwiklabs.net`](mailto:student-02-9079dc5062b9@qwiklabs.net) as the account to authenticate with.
        
2.  Review the narrative in **Task 1. Define helper functions and load data** to understand the purpose of the code cells.
    
3.  Execute each cell in this section to define the helper functions and load the dataset.
    

**Note:** Carefully follow the instructions in the Jupyter Notebook. Complete the tasks in the **TODO** sections, and **do not modify** the code cells marked **You are not required to add or modify code**.

## **Task 2. Configure the character tokenizer**

In this task, you complete the `SimpleArabicCharacterTokenizer` class, a character-level tokenizer for Arabic text.

This class contains two methods:

*   `character_tokenize`: Converts raw Arabic text into a list of single-character tokens.
    
*   `join_text`: Joins a list of character tokens back into a single string without padding.
    

### Build the 'SimpleArabicCharacterTokenizer' class

Your code is required in the **\[TODO - Add your code here\]** sections. Carefully read the notebook instructions, and ensure you have completed the `character_tokenize` and `join_text` methods.

1.  **character\_tokenize:** This method should return a list of single-character strings in the same order as the input text.
    
2.  **join\_text:** This method should return a single string by joining the input tokens without any intervening characters.
    

**Note:** For a detailed description of this task, refer to the notebook.

3.  **Save** your notebook, and run the cell to test your completed `SimpleArabicCharacterTokenizer` class.
    

**Note:** Please allow a moment for the task to complete, indicated by a green checkmark. If the attempt fails, please retry.

Click **Check my progress** to verify the objective.

### Build the 'generate\_text\_from\_ngram\_model' function

  
Your code is required within the **\[TODO - Add your code here\]** sections. Carefully read the notebook's instructions and complete the `generate_text_from_ngram_model` function to do the following:

1.  Support either **random** or **greedy** sampling, based on the **sampling\_mode** argument.
    
2.  Return the generated tokens as a single string.
    
3.  **Save** your notebook, and run the cell to test your `n-gram` text generator.
    

**Note:** Please allow a moment for the task to complete, indicated by a green checkmark. If the attempt fails, please retry.

## **Task 4. Prepare the dataset for training**

In this task, you build the necessary tools to prepare data for a character-based language model aimed at Arabic speakers. You develop the framework for robust and efficient model training.

### Build the 'segment\_encoded\_sequence' function

1.  Your code is required in the **\[TODO - Add your code here\]** sections. Carefully read the notebook instructions to complete the `segment_encoded_sequence` function.
    
2.  This function takes an encoded sequence of token IDs and segments it into subsequences. Your implementation should ensure the following:  
    \- The final subsequence can be up to `max_length` length but can be shorter. All other subsequences must be exactly `max_length`.  
    \- The original sequence can be reconstructed by concatenating the subsequences and removing overlaps.  
    \- The function returns a list of lists, where each inner list is a subsequence.
    
3.  **Save** your notebook, and run the cell to test your completed `segment_encoded_sequence` function.
    

**Note:** Please allow a moment for the task to complete, indicated by a green checkmark. If the attempt fails, please retry.

### Build the 'create\_training\_sequences' function

1.  You'll complete the `create_training_sequences` function. This function takes a dataset, a tokenizer, and a maximum input length to create a pair of 2D padded arrays (`inputs` and `targets`) suitable for model training.
    
2.  Your code is required in the **\[TODO - Add your code here\]** sections. Carefully read the notebook instructions to complete the `create_training_sequences` function. Ensure your implementation:
    
    *   Creates an encoded sequence for all data.
        
    *   Uses `segment_encoded_sequence` to segment each encoded sequence.
        
    *   Extracts the `input` and `target` arrays from the padded arrays for model training.
        
3.  **Save** your notebook, and run the cell to test your completed `create_training_sequences` function.
    

**Note:** Please allow a moment for the task to complete, indicated by a green checkmark. If the attempt fails, please retry.

* * *

## Solution of Lab

### Quick