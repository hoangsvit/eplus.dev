---
title: "Reinforcement Learning: Qwik Start - GSP691"
seoTitle: "Reinforcement Learning: Qwik Start - GSP691"
seoDescription: "Like many other areas of machine learning research, reinforcement learning (RL) is evolving at breakneck speed. Just as they have done in other research are"
datePublished: Sun Feb 23 2025 09:41:38 GMT+0000 (Coordinated Universal Time)
cuid: cm7hfw07x000007joc9jhe8ob
slug: reinforcement-learning-qwik-start-gsp691
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740303589372/0ac0931d-68d5-4d68-9502-02bbc9b07f01.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740303675227/d5d87a00-5733-4761-bd0d-52ddc5bd8bbf.png
tags: reinforcement-learning-qwik-start-gsp691, reinforcement-learning-qwik-start, gsp691

---

## **Overview**

Like many other areas of machine learning research, [reinforcement learning (RL)](https://en.wikipedia.org/wiki/Reinforcement_learning) is evolving at breakneck speed. Just as they have done in other research areas, researchers are leveraging deep learning to achieve state-of-the-art results.

In this lab, you will learn the basics of reinforcement learning by building a simple game.

### What you'll learn

In this lab, you will:

* Understand the fundamental concepts of reinforcement learning
    
* Create a Vertex AI Workbench instance
    
* Clone the lab notebook into the Vertex AI Workbench instance
    
* Read, understand, and run the steps found in the notebook
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    * The Open Google Cloud console button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-01-bb1695a6f125@qwiklabs.net
    ```
    
    Copied!content\_copy
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    MzH1qwZqbnaC
    ```
    
    Copied!content\_copy
    
    You can also find the Password in the Lab Details pane.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="left")

## **Task 1. Reinforcement learning 101**

Reinforcement learning (RL) is a form of machine learning whereby an agent takes actions in an environment to maximize a given objective (a reward) over this sequence of steps. Unlike more traditional supervised learning techniques, every data point is not labelled and the agent only has access to "sparse" rewards.

While the [history of RL](http://www.incompleteideas.net/book/ebook/node12.html) can be dated back to the 1950s and there are a lot of RL algorithms out there, 2 easy to implement yet powerful deep RL algorithms have a lot of attractions recently: deep Q-network (DQN) and deep deterministic policy gradient (DDPG). We briefly introduce the algorithms and variants based on them in this section.

![Conceptual process diagram](https://cdn.qwiklabs.com/cDBDy0wLYFlwkAnG0PrdbCg7UAEngRYH%2BORdWseL14A%3D align="left")

*A conceptual process diagram of the Reinforcement Learning problem*

The Deep Q-network (DQN) was introduced by Google DeepMind's group in [this Nature paper](https://storage.googleapis.com/deepmind-media/dqn/DQNNaturePaper.pdf) in 2015. Encouraged by the success of deep learning in the field of image recognition, the authors incorporated deep neural networks into Q-Learning and tested their algorithm in the [Atari Game Engine Simulator](https://gym.openai.com/envs/#atari), in which the dimension of the observation space is very large.

The deep neural network acts as a function approximator that predicts the output Q-values, or the desirability of taking an action, given a certain input state. Accordingly, DQN is a value-based method: in the training algorithm DQN updates Q-values according to Bellman's equation, and to avoid the difficulty of fitting a moving target, it employs a second deep neural network that serves as an estimation of target values.

On a more practical level, the following model highlights the source files, the shell command, and the endpoint to get an RL job running on Google Cloud:

![Model diagram](https://cdn.qwiklabs.com/FQvwxiTxO%2FJ5baJVEDsj0tKHG1hvn27YHmaa0FHFbS4%3D align="left")

## **Task 2. Create a Vertex AI Workbench instance**

1. In the Google Cloud console, from the **Navigation menu** (), select **Vertex AI**.
    
2. Click **Enable All Recommended APIs**.
    
3. On the left-hand side, click **Workbench**.
    
4. At the top of the Workbench page, ensure you are in the **Instances** view.
    
5. Click **Create New**.
    
6. **Configure the Instance**:
    
    * **Name**: lab-workbench
        
    * **Region**: Set the region to `us-east1`
        
    * **Zone**: Set the zone to `us-east1-c`
        
    * **Advanced Options** (Optional): If needed, click "Advanced Options" for further customization (e.g., machine type, disk size)
        

![Create a Vertex AI Workbench instance](https://cdn.qwiklabs.com/GqOFqM3buYPqGNyDO6rGozQxUTX8kZkgibuvC99mH9c%3D align="left")

7. Click **Create**.
    

**Note:** The instance will take a few minutes to create. A green checkmark will appear next to its name when it's ready.

8. Click **Open JupyterLab** next to the instance name to launch the JupyterLab interface. This will open a new tab in your browser.
    

![Workbench Instance Deployed](https://cdn.qwiklabs.com/Dmr9EnG36PSqWiVw6IvQRj3xqgoOLSFg18HrBLX4XjY%3D align="left")

9. Click the **Terminal** icon to open a terminal window.
    

![Open the Jupyter Notebook](https://cdn.qwiklabs.com/0lnZVVK40HgAfEknJ539zoVlBKgqM6%2BlQD%2FsA5BM2ag%3D align="left")

Your terminal window will open in a new tab. You can now run commands in the terminal to interact with your Workbench instance.

![terminal window opened](https://cdn.qwiklabs.com/iFtEVR0l57onyYgaCH9QQdJS%2FfSxaQce0h1uPvQT5v8%3D align="left")

Click *Check my progress* to verify the objective.

Create a Vertex AI Workbench instance

Check my progress

## **Task 3. Copy the sample code**

1. Copy and run the following code in the terminal to copy the notebook file `early_rl-v1.0.0.ipynb`.
    

```apache
gcloud storage cp -r gs://qwiklabs-gcp-01-dc8042b04c89-labconfig-bucket/* .
```

Copied!content\_copy

2. From the left-hand menu, select **early\_rl** &gt; `early_rl-v1.0.0.ipynb`. This will open a new tab.
    

![List early_rl folder](https://cdn.qwiklabs.com/p523VDA50rwGZm9VsVq91Lg29%2FexMFYWV5B%2FVHb18ZE%3D align="left")

Click *Check my progress* to verify the objective.

Copy the sample code

Check my progress

## **Task 4. Run through the notebook**

**Note:** Make sure to select the **Python 3** kernel in the notebook.

Your new tab should look similar to the following:

![Early Reinforcement Learning webpage](https://cdn.qwiklabs.com/eIiugfg275%2BwduGfjCmVnCwb%2B6FnsIZDN4I16yT0wCY%3D align="left")

1. Read through the following notebook and run all code blocks with **Shift + Enter**.
    
2. Return here after you have completed the instructions in the notebook.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=SvCEF-vamWU&ab_channel=QUICKGCPLAB] 

```apache
export ZONE=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1740303645065/83c53da8-ec13-49ec-89b7-bd507b31621e.png align="center")

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/main/Reinforcement%20Learning%20Qwik%20Start/gsp691.sh
sudo chmod +x gsp691.sh
./gsp691.sh
```