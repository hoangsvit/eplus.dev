---
title: "Conversational Agents: Managing Environments - GSP929"
seoTitle: "Conversational Agents: Managing Environments - GSP929"
seoDescription: "Most businesses go through different phases of project development and production cycles. Effective maintainance of these projects require systems and proce"
datePublished: Fri Jun 06 2025 08:12:46 GMT+0000 (Coordinated Universal Time)
cuid: cmbkj2g3k000409l8eksn95ad
slug: conversational-agents-managing-environments-gsp929
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749197531254/ff967da4-6ca7-4671-a879-101b53054bff.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749197544844/0b287ac1-52fb-47b4-b68e-7bff562dbc17.png
tags: gsp929, conversational-agents-managing-environments-gsp929, conversational-agents-managing-environments

---

## Overview

Most businesses go through different phases of project development and production cycles. Effective maintainance of these projects require systems and processes to manage versions and environments. Conversational Agents provides tools within the UI for managing multiple versions and loading specific versions to dedicated environments, which allows usage for different purposes (and perhaps by different teams). In this lab you'll explore the management of Conversational Agents versions and environments.

The following are definitions of *versions* and *environments* with respect to Conversational Agents.

* **Versions**: at the end of the development cycle, it's customary to freeze your virtual agent so it can go through a QA cycle and presumably to production later. Each time you freeze your agent, you'll create a version of it, complete with version number and description.
    
* **Environments**: during the development cycle, you may have different teams needing to access different versions, and certainly for production you'll have a QA'd version that doesn't change until the next update. If your business is larger, you may even have independent divisions of the business with their own virtual agents. You can create different environments and load the version each team needs to access. Note that by default there is a working environment, `Draft`, where all changes are made to an agent using the Conversational Agents user interface. To load a virtual agent you've modified in the Draft environment to another environment, you'll need to first establish a version of it.
    

### Objectives

By the end of this lab, you will be able to:

* Create versions of your virtual agent.
    
* Create environments where your virtual agent will be published.
    
* Load a saved version of your virtual agent to an environment.
    
* Change which version is loaded to an environment.
    

### Prerequisites

This lab uses the basic Flight Booker agent developed in [Conversational Agents: Bot Building Basics](https://google.qwiklabs.com/catalog_lab/4008) and assumes basic knowledge of Conversational Agents such as using the Test Simulator and how intents, flows, and pages work.

## Setup

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
    student-04-73664846d918@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    JwXpU2PChGrl
    ```
    
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

## Task 1. Getting started with Conversational Agents

In this task, you log in to Conversational Agents and create the new virtual agent `Flight Booker - Env Mgt`.

Assumption: You've already logged into Google Cloud before continuing with the steps below.

1. In a new incognito window, go to the [Conversational Agents](https://conversational-agents.cloud.google.com/projects) page.
    
2. In the **Select Project** dialog, click the **All** tab.
    
3. Click your Project ID, `qwiklabs-gcp-02-d972d11eff24`.
    
4. In the Google Dialogflow API dialog, — click **"Enable API"** to proceed.
    
5. In the **Agents** window, click **Create agent**.
    
6. Click **Build your own**.
    
7. In the **Create agent** dialog, set the following fields:
    
    | **Field** | **Value** |
    | --- | --- |
    | **Display name** | **Flight Booker - Env Mgt** |
    | **Location** | `europe-west1` |
    | \* **Time zone** | Select the GMT offset that applies to the selected location |
    | **Conversation Start** | Select **Flow** |
    
    To find the GMT offset:
    
    1. In the Google Cloud console title bar, click **Open or close Gemini AI chat** (
        
        ![Open or close Gemini AI chat icon](https://cdn.qwiklabs.com/VeoLOaG8soGYttgTI8OoA1FiBF39x1f%2FVs1wvPB5s%2Fg%3D align="left")
        
        ).
        
    2. In the **Required API** section, click **Enable**.
        
    3. Click **Start chatting** and enter a prompt asking for the GMT offset to the selected location.
        
8. Click **Create**.
    
    Once you create the agent, the Default start flow window opens.
    
9. After creating the agent, navigate to **Settings &gt; General &gt; Logging settings** and click **Enable Cloud Logging** and **Enable conversation history**. This generates logs for this agent.
    
10. Click **Save**.
    

Click **Check my progress** below to verify you're on track in this lab.

Getting started with Conversational Agents

**Check my progress**

## Task 2. Importing a .blob virtual agent file

Import the virtual agent from the earlier lab, `Conversational Agents: Bot Building Basics`, and use it to explore the environment functionality:

1. Click the following link to download the sample lab 1 virtual agent solution, [gsp929-start-agent](https://storage.googleapis.com/spls/DialogflowCX_agents/gsp929-start-agent.blob), to your local hard drive.
    
2. On the Agent Overview page, click the **Export/Restore** button.
    

![restore.png](https://cdn.qwiklabs.com/XkjFhJIViMVL7jagBEIz07qtk68%2BbOnc2uzBf%2F%2FVrGw%3D align="left")

3. Select **Restore Agent** from the expanded menu options.
    
4. Select the **Upload** radio button.
    
5. Click on **select file**.
    
6. Navigate to and select the *gsp929-start-agent.blob* that you downloaded to your hard drive.
    
7. Click **Open**.
    
8. Click **Restore**.
    

Refer to the [Conversational Agents 'restore' documentation](https://cloud.google.com/dialogflow/cx/docs/concept/agent#export) as needed.

Now you have a virtual agent that has everything completed from the earlier lab.

Click **Check my progress** below to verify you're on track in this lab.

Importing a .blob virtual agent file

**Check my progress**

## Task 3. Testing in the Draft environment

1. To test the agent, click on **Toggle Simulator** in the upper right to open it.
    

![simulator pane.png](https://cdn.qwiklabs.com/PD0BqtadaLgp2nTBN7MZZI0%2FnBZYyIFbiN4bgL7cfBI%3D align="left")

2. Notice there is an **Environment** dropdown.
    
    By default, you should see `Draft` in this dropdown because you haven't yet created any other environment.
    
3. Notice there is a second dropdown for **Start Resource**.
    
    By default, you should see `Flow` in this dropdown because no other flows exist. You could select `Default Start Flow`, but it isn't necessary at this point.
    
4. In the Talk to agent box, type "i want to book a flight".
    
    The next response from the agent should be, 'What city would you like the flight to depart from?'
    
5. Notice the data at the top of the conversation that shows `Flow: Default Start Flow`.
    
    You may have noticed some of this while completing the earlier lab. Now you'll need to pay closer attention to what's selected in the dropdowns as you move forward through this lab.
    

Click **Check my progress** below to verify you're on track in this lab.

Testing in the Draft environment

**Check my progress**

## Task 4. Creating environments

1. Select **Environments** on the left side.
    

![environment.png](https://cdn.qwiklabs.com/ohxEpKX6I7cW7vva0inTW5cWgcTlwOoubIACGpMFd7s%3D align="left")

2. Click **\+ Create** to create a new environment.
    
3. Enter 'QA' for the Display Name.
    
4. Click **Save**.
    

**Note:** You'll see a message saying **Version must be provided for start flow resource.** Why do you think this is?

Up to this point, you haven't yet created a published version of the Default Start Flow, or any other flow for that matter. Notice under Version next to the Default Start Flow that the only item in the dropdown list is 'Not published'.

Conversational Agents needs at least one Start Flow to be published in an environment. Once you publish a version of your agent (which includes a Start Flow), Conversational Agents will no longer throw this error.

6. Click **x** to dismiss the environment creation error message.
    
7. Select **Versions** in the main menu.
    
8. Click on **Default Start Flow**.
    
9. Click **\+ Create** to create a version of the flow.
    
10. For the Display name field enter 'Flight booker main v1 chat bot' .
    
11. Enter a description in the *description* box on what's included in this version of the virtual agent.
    
12. Click **Save**.
    

You should now see the `Default Start Flow` in the **Versions** list with the `# versions`, equal to 1.

13. Click on **Default Start Flow** under **Flow** to view additional details about the version.
    
14. Notice whether the status shows **Not ready** or **Ready**.
    
15. Select **Environments** to reattempt configuring a new environment.
    
16. Click **\+ Create**.
    
17. Enter 'QA' for the Display Name.
    
18. In the **Flow** section, choose `Flight booker main v1 chat bot` from the Version dropdown list next to the Default Start Flow. Recall that this didn't exist in the dropdown earlier.
    
19. Click **Save**.
    

**Note:** You may see a message such as:

`Version 'projects/qwiklabs-gcp-03-407df58d36b0/locations/europe-west1//agents/e2779218-b813-4844-a0ea-ec2ef504636d/flows/00000000-0000-0000-0000-000000000000/versions/1' is not ready to serve because its training is RUNNING. Wait for training to finish or fix the version if its training failed.`

This is caused when Conversational Agents is still capturing and training your versioned agent. Do you remember if the status of the version creation showed **Not ready**? Try saving again after waiting a few moments for the version creation status to change to **Ready**.

You should now see your new QA environment in the list with a *Last modified* date.

## Task 5. Testing in your new environment

Next, you can test out your versioned virtual agent in the environment you created.

1. To test the agent, click on **Toggle Simulator** in the upper-right corner to open it if it's not already open.
    
2. Click the "Reset conversation" button in the **Test Agent** pane to clear the simulator from previous tests.
    
3. Select **QA** from the **Environment** dropdown.
    

**Note:** If the QA environment is not visible, try refreshing the page.

**Note:** This step is important in order to test the specific version in a specific environment. Otherwise, you could be testing something you weren't expecting.

4. In the **Talk to agent** box, enter 'i want to book a flight'.
    
    This is one of the ways you can run test cases in different environments. However, you may be thinking, if the version loaded to QA is the same as what's in Draft, testing will produce the same results. You're right. Next you'll make a change that makes it more obvious.
    

Click **Check my progress** below to verify you're on track in this lab.

Testing in QA environment

**Check my progress**

## Task 6. Creating an additional version

Next you'll make a change to your virtual agent, save it as a new version, and load it to a new environment.

1. Click on the **Flows** tab from the main menu.
    

![flow.png](https://cdn.qwiklabs.com/Y2m3YW%2BnNr%2BlCPqODVFu0Fxv15TQ0tAns7Xg4Z9XFjU%3D align="left")

2. Click on the **Ticket information** page.
    

![ticket_information.png](https://cdn.qwiklabs.com/0GkWUcf5fM%2BCgX9Ey8kHLUktq3O66DHTKdmDJNfvJ8M%3D align="left")

3. Click on **Edit fulfillment** to edit the entry fulfillment information.
    
4. To add a response, click **+Add dialogue response**, then select **Agent dialogue** under **Agent responses**. In the Enter Agent Dialogue box, type the prompt: 'I'll be happy to assist you with that.'
    
5. Click **Add** and **Save**.
    
    At this point, you've saved the change to your working draft. Next you'll create a new version of the virtual agent that includes this change.
    
6. Go back to **Versions**.
    
7. Click on the **Default Start Flow** to begin the process of creating a new version for it.
    
8. Repeat the versioning steps above to create a new version of your Default Start Flow called 'Flight booker main v2 chat bot'.
    
9. Add a description, such as 'Version 2 adds a friendly greeting before prompting for flight details'.
    
10. Click **Save**.
    

You should now see number of versions incremented to 2 for the Default Start Flow in the **Versions** list.

## Task 7. Creating an additional environment

1. Repeat the steps you followed above to create a new environment called 'Dev' that uses the new version 2 of your Default Start Flow.
    
2. Select your `Flight booker main v2 chat bot` from the version dropdown.
    
3. Click **Save**.
    

**Note:** You may again get an error similar to the following, so just wait a few moments and try saving again.

`Version 'projects/qwiklabs-gcp-00-fe6cab958249/locations/europe-west1/agents/6792c492-5f79-4ccf-8f17-e757b34f38b9/flows/00000000-0000-0000-0000-000000000000/versions/2' is not ready to serve because its training is RUNNING. Wait for training to finish or fix the version if its training failed.`

Now your latest version of your flow is loaded to the Dev environment.

Next you'll go back to the simulator to test your new `Flight booker main v2 chat bot` version.

4. Open the **Test Agent** pane if not open already.
    
5. Click the "Reset conversation" button in the **Test Agent** pane to clear the simulator from previous tests.
    
6. From the **Environment** dropdown select **Dev**.
    

**Note:** If the Dev environment is not visible, try refreshing the page.

7. Type 'i want to book a flight' into the **Talk to agent** box.
    
    You should get a response from the agent saying, `I'll be happy to assist you with that.`, followed by a prompt for the departure city. This indicates that it's running the v2 version of your agent.
    

Click **Check my progress** below to verify you're on track in this lab.

Testing in Dev environment

**Check my progress**

### Knowledge check (optional)

What must you do before you can deploy a virtual agent to an existing custom environment?You must create another new custom environment.You must create a version of the virtual agent.You must remove the version of the agent already loaded.You must create a new custom environment and select it in the dropdown of the Test Agent.

**Submit**

## Task 8. Managing different environments

You've created two environments now and loaded a different version into each. What if you need to change the version loaded into one of those environments?

1. Click on **Environments** in the left pane as needed to get to the view of both of your environments, QA and Dev.
    
2. Click on the `QA` environment.
    
3. Select `Flight booker main v2 chat bot` from the version dropdown.
    
4. Click **Save**.
    
5. Notice the `Last modified` time for the version.
    
6. Use the test simulator to ensure the version two is loaded. (Recall that you added the friendly greeting to this one.) Don't forget to click "Reset conversation" to begin a fresh test scenario and choose **QA** in the environment dropdown.
    
7. Go back and load `Flight booker main v1 chat bot` to the QA environment.
    
8. Retest. Was it what you expected? You should no longer see the friendly greeting prior to the prompt for departure city.
    

Discuss your working environment - What version of your agent do you suppose would be tested if you ran the test simulator using the *Draft* environment? You guessed it! The working copy that you've recently saved or uploaded. You can test the working copy of your virtual agent in Draft until you're ready to create a version of it. At that point, you could save it to another environment so that another team can begin testing that frozen version.

By selecting a specific environment, the test is running the version of your virtual agent loaded to the specified environment (which may be different from what you're currently working on in Conversational Agents in Draft mode). Another benefit is you can test different versions without going through the process of retraining the model (which can take some time for larger, more complex virtual agents).

### Check your knowledge

When you see the message, 'Start Flow' is not included in the environment, what does it mean?Its just a warning, not an error. You can ignore it.You cannot create a custom environment because there are no existing versions that could be deployed to it (Dialogflow needs at least one Start Flow).You cannot create a new version because there are no environments where it can be deployed.You have already loaded another version to the environment.

**Submit**

When you want to test the Default Start Flow for a version of your agent in a specific environment, you must do what at minimum? Choose the most accurate answer.Specify the environment, flow, and intents you mean to test.Specify which environment you mean to test in.Specify the environment and flow you mean to test.Specify which flow you mean to test.

**Submit**

Before you sign out, you can to export your virtual agent if you want. Recall that this is done through the following general steps:

1. Select `View all agents` from the **Agent** dropdown at the top.
    
2. Click on the context menu (three vertical dots) and choose **Export**.
    
3. Click on the **Download** radio button.
    
4. Click **Export**.
    

---

## Solution of Lab

%[https://youtu.be/4pZZMBaSR-0] 

### **🛠️ Configuration Steps**

💡 **Pro Tip:** *Watch the full video walkthrough to get full points on all "Check My Progress" sections!*

🔗 **Download Blob File**: [Click here](https://drive.google.com/file/d/17Nbx7lQg0F-nmMvjPAnckDhaZ9AUM3KQ/view?usp=sharing)

### **Step 1: Create Versions**

1. Create Version `v1`
    
    * **Display Name:**
        
        ```apache
        Flight booker main v1 chat bot
        ```
        
2. Create Version `v2`
    
    * **Display Name:**
        
        ```apache
        Flight booker main v2 chat bot
        ```
        

### **Step 2: Create Environments**

1. Create Environment `QA`
    
    * **Name:** QA
        
    * **Version:** Flight booker main v1 chat bot
        
2. Create Environment `Dev`
    
    * **Name:** Dev
        
    * **Version:** Flight booker main v2 chat bot
        

### **Step 3: Test the Agent**

Run this test prompt:

```apache
i want to book a flight
```