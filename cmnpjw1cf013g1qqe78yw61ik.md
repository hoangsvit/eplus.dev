---
title: "Measuring Speech-to-Text Accuracy - GSP758"
seoTitle: "Measuring Speech-to-Text Accuracy - GSP758"
seoDescription: "Automated Speech Recognition (ASR), also known as machine transcription or Speech-to-Text, uses machine learning to turn spoken audio into text. ASR h"
datePublished: 2026-04-08T04:31:05.684Z
cuid: cmnpjw1cf013g1qqe78yw61ik
slug: measuring-speech-to-text-accuracy-gsp758
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/397dbb79-6ef4-4417-b318-12632c73d210.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/d7288aca-aa14-4e3e-b3c1-702a421072fc.png
tags: gsp758, measuring-speech-to-text-accuracy-gsp758, measuring-speech-to-text-accuracy

---

## **Overview**

Automated Speech Recognition (ASR), also known as machine transcription or Speech-to-Text, uses machine learning to turn spoken audio into text. ASR has many applications, from subtitling, to virtual assistants, to IVRs, to dictation, and more. However, machine learning systems are rarely 100% accurate and ASR is no exception. If you plan to rely on ASR for critical systems it's important to measure its accuracy or overall quality to understand how it will perform in your broader system.

In this lab, you use Speech-to-Text to transcribe an audio file and then measure the quality of the transcription.

### Objectives

In this lab, you learn the following:

*   Define what speech quality is and how to measure it.
    
*   Measure the quality of the transcription.
    

## **ASR quality concepts**

The following are some key concepts and steps involved in evaluating the quality and accuracy of Automated Speech Recognition (ASR) systems.

### Define speech accuracy

Although speech accuracy can be measured in many ways, the industry standard method is *word error rate* (WER). WER measures the percentage of incorrect transcriptions in an entire set. A lower WER indicates a more accurate system.

The *ground truth* is the 100% accurate (typically human) transcription you compare a Speech-to-Text or hypothesis transcript against to measure the accuracy.

### Word Error Rate (WER)

Word error rate is the combination of three types of transcription errors which can occur:

*   Insertion Error - Word in the hypothesis transcript that is not in the ground truth.
    
*   Substitution errors - Word in both the hypothesis and the ground truth, but not transcribed correctly.
    
*   Deletion errors - Word is missing from the hypothesis but present in the ground truth.
    

The formula below calculates WER:

*   I: Number of insertion errors
    
*   S: Number of substitution errors
    
*   D: Number of deletion errors
    
*   N: Total number of words in the ground truth transcript
    

![The formula: WER is equal to S plus D plus I, divided by N](https://cdn.qwiklabs.com/gu80tolGTws0nY%2BaNo8a1tsakiBLvnqApUR96wD6gL0%3D align="center")

You add the total number of each error (S plus I plus D), and then divide that by the total number of words (N) in the ground truth transcript to find the WER. In situations with very low accuracy, it's possible that the WER can be greater than 100%.

### Other metrics

Other metrics are useful for tracking things like readability or measuring how many of your most important terms were transcribed correctly. Examples are:

*   Jaccard Index - Measures the similarity of the hypothesis and ground truth (or a subset of the ground truth).
    
*   F1 Score - Measures precision vs recall on a dataset. This is useful when tuning speech systems towards specific terms to ensure good recall without sacrificing too much precision.
    

### How to measure speech accuracy

Now that you you're familiar with accuracy metrics, the following provides generic steps to follow when measuring accuracy on your own audio transcript.

**Note:** In this lab a sample audio files of about 10 min is provided with associated ground truth. The steps below are not necessary to complete this lab, but are necessary to measure quality on your own data.

#### **Gather test audio files**

You should gather a representative sample of the audio files for which you want to measure quality. This sample should be random and as close to the target environment as possible. For example, to transcribe conversations from a call center to aid in quality assurance, you would randomly select a few actual calls recorded on the same equipment that your production audio would come through, not recorded on your cell phone or computer microphone.

You need at least 30 min of audio to get a statistically significant accuracy metric. Using between 30 min and 3 hours of audio is recommended. This lab provides the audio.

#### **Get ground truth transcriptions**

Next you need an accurate transcription of the audio. This usually involves a single or double pass of a human transcription of the target audio. The goal is a 100% accurate transcription to measure against the automated results.

It’s important when doing this to match the transcription conventions of your target ASR system as closely as possible. For example, ensure that punctuation, numbers, and capitalization are consistent. This lab provides the ground truth.

#### **Get the machine transcription**

Send the audio to the Google Speech-to-Text API and get your hypothesis transcription. You can do this using one of Google Cloud’s many libraries or command line tools. This lab provides the code to do this.

#### **Compute the WER**

Now you would count the insertions, substitutions, deletions, and total words using the ground truth and the machine transcription.

This lab uses code, created by Google, to normalize output and calculate the WER.

![The Baseline page displaying a list of WER calculations](https://cdn.qwiklabs.com/V971MvEnRQouGXnVr1t94cwWLbBTrF46QY98o6xfE2I%3D align="center")

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

1.  Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    *   The Open Google Cloud console button
        
    *   Time remaining
        
    *   The temporary credentials that you must use for this lab
        
    *   Other information, if needed, to step through this lab
        
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```plaintext
    student-00-1ba3266850db@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    91GSHoYnBxe3
    ```
    
    Copied!
    
    You can also find the Password in the Lab Details pane.
    
6.  Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7.  Click through the subsequent pages:
    
    *   Accept the terms and conditions.
        
    *   Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    *   Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="center")

## **Task 1. Create a Vertex AI Workbench instance**

This lab has curated and created a focused dataset based on public domain books and audio from the LibriSpeech project. This lab also provides all the code you need to measure the accuracy of Cloud Speech-to-Text API’s accuracy on this dataset.

In this task, you learn how to set up and use this code.

1.  In the Google Cloud console, from the **Navigation menu** (
    
    ![Navigation menu](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ), select **Vertex AI > Dashboard**.
    
2.  Click **Enable All Recommended APIs**.
    
3.  On the left-hand side, click **Workbench**.
    
4.  At the top of the Workbench page, ensure you are in the **Instances** view.
    
5.  Click
    
    ![add box](https://cdn.qwiklabs.com/HQyUcFMAfKlIqKrZHc4akIou7AGrAWnJ1AXcmQyzoI0%3D align="center")
    
    **Create New**.
    
6.  **Configure the Instance**:
    
    *   **Name**: lab-workbench
        
    *   **Region**: Set the region to `us-east4`
        
    *   **Zone**: Set the zone to `us-east4-b`
        
    *   **Advanced Options** (Optional): If needed, click "Advanced Options" for further customization (e.g., machine type, disk size)
        

![Create a Vertex AI Workbench instance](https://cdn.qwiklabs.com/GqOFqM3buYPqGNyDO6rGozQxUTX8kZkgibuvC99mH9c%3D align="center")

7.  Click **Create**.
    

**Note:** The instance will take a few minutes to create. A green checkmark will appear next to its name when it's ready.

8.  Click **Open JupyterLab** next to the instance name to launch the JupyterLab interface. This will open a new tab in your browser.
    

![Workbench Instance Deployed](https://cdn.qwiklabs.com/Dmr9EnG36PSqWiVw6IvQRj3xqgoOLSFg18HrBLX4XjY%3D align="center")

9.  Click the **Terminal** icon to open a terminal window.
    

![Open the Jupyter Notebook](https://cdn.qwiklabs.com/0lnZVVK40HgAfEknJ539zoVlBKgqM6%2BlQD%2FsA5BM2ag%3D align="center")

Your terminal window will open in a new tab. You can now run commands in the terminal to interact with your Workbench instance.

![terminal window opened](https://cdn.qwiklabs.com/iFtEVR0l57onyYgaCH9QQdJS%2FfSxaQce0h1uPvQT5v8%3D align="center")

### Load the notebook

*   In the terminal window you just opened, run the following commands to copy files to use in this lab:
    

```plaintext
gsutil cp gs://spls/gsp758/notebook/measuring-accuracy.ipynb .
```

Copied!

```plaintext
gsutil cp gs://spls/gsp758/notebook/simple_wer_v2.py .
```

Copied!

### Perform the following tasks to play audio files in an Incognito window

1.  Within Chrome click the **3 dots** > **Settings**.
    
2.  In the **Search Settings** type **Incognito**.
    
3.  In the results, click **Third-party cookies**.
    
4.  Go to **Allowed to use third-party cookies**.
    
5.  Click **Add**.
    
6.  Copy the JUPYTERLAB domain, do not include `https`.
    

It should be something like:

```plaintext
[YOUR_NOTEBOOK_ID].notebooks.googleusercontent.com
```

Copied!

7.  Check **Current incognito session only**, and then click **add**.
    

You can now continue to the notebook.

8.  Open the `measuring-accuracy.ipynb` notebook to follow the instructions inside to compute the WER on the provided dataset.
    

Click **Check my progress** to verify the objective.

Create the Vertex AI Workbench Notebook instance

In the following sections, you run the notebook cells to measure the quality and accuracy of Automated Speech Recognition (ASR) systems.

## **Task 2. Gather audio files and the ground truth**

*   In this task, you gather audio files and ground truth. Run the *Gather Audio Files and Ground Truth* section of the notebook.
    

Click **Check my progress** to verify the objective.

Gather Audio Files and Ground Truth

## **Task 3. Get the machine transcript**

*   In this task, you import the Speech client library and call the Recognize method for each audio file. Run the *Get the Machine Transcript* section of the notebook.
    

Click **Check my progress** to verify the objective.

Get the Machine Transcript

## **Task 4. Compute the WER**

*   In this task, you add transcripts to a WER analysis object and compute the results. Run the *Compute the WER* section of the notebook.
    

Click **Check my progress** to verify the objective.

* * *

## Solution of Lab

### Quick

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP758/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/53f2a950-6513-4b5f-936d-6e758eb5e5f8.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1e29ba79-3faf-4ba6-949b-adaf53cbc447.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/dd9385bb-20a7-4f34-a395-163d1f287689.png align="center")

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP758/vetex.sh
source vetex.sh
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/a406d18e-ee4e-4ca2-ae37-3d3455c1f4dd.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/faa2a40e-b482-4653-9521-32d0647af847.png align="center")

* * *

### Manual

%[https://www.youtube.com/watch?v=ti1ucDNP0LA]