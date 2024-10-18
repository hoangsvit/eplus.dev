---
title: "Dialogflow CX: Managing Environments - GSP929"
seoTitle: "Dialogflow CX: Managing Environments - GSP929"
seoDescription: "Most businesses go through different phases of project development and production cycles. Effective maintainance of these projects require systems and proce"
datePublished: Sat Aug 10 2024 05:02:24 GMT+0000 (Coordinated Universal Time)
cuid: clzno639300040ami2vd2f9qi
slug: dialogflow-cx-managing-environments-gsp929
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723263651396/17549973-ed3a-4e34-a750-ae20fe447cd5.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723266134912/13bb8e7a-b226-46b6-9930-5cc27f5bc391.png
tags: dialogflow-cx-managing-environments-gsp929

---

## **Overview**

Most businesses go through different phases of project development and production cycles. Effective maintainance of these projects require systems and processes to manage versions and environments. Dialogflow provides tools within the UI for managing multiple versions and loading specific versions to dedicated environments, which allows usage for different purposes (and perhaps by different teams). In this lab you'll explore the management of Dialogflow versions and environments.

The following are definitions of *versions* and *environments* with respect to Dialogflow.

* **Versions**: at the end of the development cycle, it's customary to freeze your virtual agent so it can go through a QA cycle and presumably to production later. Each time you freeze your agent, you'll create a version of it, complete with version number and description.
    
* **Environments**: during the development cycle, you may have different teams needing to access different versions, and certainly for production you'll have a QA'd version that doesn't change until the next update. If your business is larger, you may even have independent divisions of the business with their own virtual agents. You can create different environments and load the version each team needs to access. Note that by default there is a working environment, `Draft`, where all changes are made to an agent using the Dialogflow user interface. To load a virtual agent you've modified in the Draft environment to another environment, you'll need to first establish a version of it.
    

Objectives

By the end of this lab, you will be able to:

* Create versions of your virtual agent.
    
* Create environments where your virtual agent will be published.
    
* Load a saved version of your virtual agent to an environment.
    
* Change which version is loaded to an environment.
    

Prerequisites

This lab uses the basic Flight Booker agent developed in [Dialogflow CX: Bot Building Basics](https://google.qwiklabs.com/catalog_lab/4008) and assumes basic knowledge of Dialogflow CX such as using the Test Simulator and how intents, flows, and pages work.

---

### **Task 1. Getting started with Dialogflow CX**

1. First, get logged in to Dialogflow CX and create a new agent.
    
2. Name your virtual agent 'Flight Booker - Env Mgt' when you get to that point in the steps.
    

Assumption: You've already logged into Google Cloud before continuing with the steps below.

1. In an new incognito window, navigate to [Dialogflow](https://dialogflow.cloud.google.com/).
    
2. Click on **Sign-in with Google**.
    
3. Select the student account that you started the lab with.
    

Next, you explicitly specify that you want to use Dialogflow CX instead of Dialogflow ES.

1. In the menu bar at the left, click on **Dialogflow CX**.
    
    A new page for Dialogflow CX opens and a blue Dialogflow icon appears. On this page, you should see a pop-up asking you to select a project.
    
2. Search the list in the pop-up for the project that matches your assigned Project ID for this lab. Click on your project ID.
    

**Note:** If you don't see your Project ID listed, look at the user on the right side to confirm that you are using Dialogflow CX as "student".

![Dialogflow CX title bar highlighting the project box and the user avatar](https://cdn.qwiklabs.com/R6vj%2B4XNhDXFFX2tKCJY%2B0C5c1LL4Lbw38BRGWzteSM%3D align="left")

You will now see a page telling you "To use Dialogflow CX with this project, enable the following APIs".

1. Click on **Enable API**.
    
    It shouldn't take more than half a minute or so for this activity to complete.
    
    If it seems this task is taking a long time, refresh the page.
    
    Once complete, you will be on the Dialogflow CX **Agents** page.
    
2. Click on **Create agent**.
    
3. If prompted with Get started with Dialogflow CX click **Build your own**.
    
4. Enter a name for the agent (e.g., "Cloudio-cx").
    
5. Set the location to `europe-west1`.
    
6. Ensure timezone and default language are set appropriately.
    
7. Click **Create**.
    
    Once the agent is created, you will see the design and configuration portion of the Dialogflow CX UI.
    
8. After creating the agent, navigate to **Agent Settings** &gt; **General** &gt; **Logging settings** and click on **Enable Cloud Logging** and **Enable conversation history** option. It will generate logs for this agent.
    
9. Click **Save**.
    

![The Agent Settings page, wherein the checked Enable stackdriver logging box is highlighted.](https://cdn.qwiklabs.com/7U3gECWjhg7rtXzYbhl7%2BNSGL1N58S%2BhhBXjj2vasLk%3D align="left")

Click **Check my progress** below to verify you're on track in this lab.

Getting started with Dialogflow CX

**Check my progress**

### **Task 2. Importing a .blob virtual agent file**

Import the virtual agent from the earlier lab, `Dialogflow CX: Bot Building Basics`, and use it to explore the environment functionality:

1. Click the following link to download the sample lab 1 virtual agent solution, [gsp929-start-agent](https://storage.googleapis.com/spls/DialogflowCX_agents/gsp929-start-agent.blob), to your local hard drive.
    
2. Select **View all agents** in the **Agent** dropdown menu at the top of the Dialogflow CX UI.
    
3. Click the context menu (three vertical dots ) to the right of your virtual agent.
    
4. Select **Restore** from the expanded menu options.
    
5. Select the **Upload** radio button.
    
6. Click on **select file**.
    
7. Navigate to and select the *gsp929-start-agent.blob* that you downloaded to your hard drive.
    
8. Click **Open**.
    
9. Click **Restore**.
    

Refer to the [Dialogflow CX 'restore' documentation](https://cloud.google.com/dialogflow/cx/docs/concept/agent#export) as needed.

Now you have a virtual agent that has everything completed from the earlier lab.

Click **Check my progress** below to verify you're on track in this lab.

Importing a .blob virtual agent file

**Check my progress**

### **Task 3. Testing in the Draft environment**

1. Click on **Test Agent** in the upper right to open the simulator pane.
    
2. Notice there is an **Environment** dropdown.
    
    By default, you should see `Draft` in this dropdown because you haven't yet created any other environment.
    
3. Notice there is a second dropdown for **Flow**.
    
    By default, you should see `Flow` in this dropdown because no other flows exist. You could select `Default Start Flow`, but it isn't necessary at this point.
    
4. In the Talk to agent box, type "i want to book a flight".
    
    The next response from the agent should be, 'What city would you like the flight to depart from?'
    
5. Notice the data at the top of the conversation that shows `Environment: Draft` and `Flow: Default Start Flow`.
    
    You may have noticed some of this while completing the earlier lab. Now you'll need to pay closer attention to what's selected in the dropdowns as you move forward through this lab.
    

Click **Check my progress** below to verify you're on track in this lab.

Testing in the Draft environment

**Check my progress**

### **Task 4. Creating environments**

1. Click on the **Manage** tab in the main menu.
    
2. Select **Environments** on the left side.
    
3. Click **\+ Create** to create a new environment.
    
4. Enter 'QA' for the Display Name.
    
5. Click **Save**.
    

**Note:** You'll see a message saying **'Start Flow' is not included in the environment.** Why do you think this is?

Up to this point, you haven't yet created a published version of the Default Start Flow, or any other flow for that matter. Notice under Version next to the Default Start Flow that the only item in the dropdown list is 'Not published'.

Dialogflow needs at least one Start Flow to be published in an environment. Once you publish a version of your agent (which includes a Start Flow), Dialogflow will no longer throw this error.

6. Click **x** to dismiss the environment creation error message.
    
7. Select **Versions** in the main menu.
    
8. Click on **Default Start Flow**.
    
9. Click **\+ Create** to create a version of the flow.
    
10. For the Display name field enter 'Flight booker main v1 chat bot' .
    
11. Enter a description in the *description* box on what's included in this version of the virtual agent. For instance, you could enter 'Version 1 includes functionality to retrieve ticketing to/from and travel dates.'
    
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

This is caused when Dialogflow is still capturing and training your versioned agent. Do you remember if the status of the version creation showed **Not ready**? Try saving again after waiting a few moments for the version creation status to change to **Ready**.

You should now see your new QA environment in the list with a *Last modified* date.

### **Task 5. Testing in your new environment**

Next, you can test out your versioned virtual agent in the environment you created.

1. Click on **Test Agent** in the upper right to open the simulator pane.
    
2. Select **QA** from the **Environment** dropdown.
    

**Note:** This step is important in order to test the specific version in a specific environment. Otherwise, you could be testing something you weren't expecting.

3. Click the "Reset" button in the **Test Agent** pane to clear the simulator from previous tests.
    
4. In the **Talk to agent** box, enter 'i want to book a flight'.
    
5. Notice the information at the top of the conversation changed slightly in that it now shows `Environment: QA`.
    
    This is one of the ways you can run test cases in different environments. However, you may be thinking, if the version loaded to QA is the same as what's in Draft, testing will produce the same results. You're right. Next you'll make a change that makes it more obvious.
    

Click **Check my progress** below to verify you're on track in this lab.

Testing in QA environment

**Check my progress**

### **Task 6. Creating an additional version**

Next you'll make a change to your virtual agent, save it as a new version, and load it to a new environment.

1. Click on the **Build** tab from the main menu.
    
2. Click on the **Ticket information** page.
    
3. Click on **Edit fulfillment** to edit the entry fulfillment information.
    
4. Add a new prompt in the **Agent says** box saying, 'I'll be happy to assist you with that.'
    
5. Click **Save**.
    
    At this point, you've saved the change to your working draft. Next you'll create a new version of the virtual agent that includes this change.
    
6. Go back to **Manage** and **Versions**.
    
7. Click on the **Default Start Flow** to begin the process of creating a new version for it.
    
8. Repeat the versioning steps above to create a new version of your Default Start Flow called 'Flight booker main v2 chat bot'.
    
9. Add a description, such as 'Version 2 adds a friendly greeting before prompting for flight details'.
    
10. Click **Save**.
    

You should now see number of versions incremented to 2 for the Default Start Flow in the **Versions** list.

### **Task 7. Creating an additional environment**

1. Repeat the steps you followed above to create a new environment called 'Dev' that uses the new version 2 of your Default Start Flow.
    
2. Select your `Flight booker main v2 chat bot` from the version dropdown.
    
3. Click **Save**.
    

**Note:** You may again get an error similar to the following, so just wait a few moments and try saving again.

`Version 'projects/qwiklabs-gcp-00-fe6cab958249/locations/europe-west1/agents/6792c492-5f79-4ccf-8f17-e757b34f38b9/flows/00000000-0000-0000-0000-000000000000/versions/2' is not ready to serve because its training is RUNNING. Wait for training to finish or fix the version if its training failed.`

Now your latest version of your flow is loaded to the Dev environment.

Next you'll go back to the simulator to test your new `Flight booker main v2 chat bot` version.

4. Open the **Test Agent** pane if not open already.
    
5. Click the "Reset" button in the **Test Agent** pane to clear the simulator from previous tests.
    
6. From the **Environment** dropdown select **Dev**.
    
7. Type 'i want to book a flight' into the **Talk to agent** box.
    
    You should get a response from the agent saying, `I'll be happy to assist you with that.`, followed by a prompt for the departure city. This indicates that it's running the v2 version of your agent.
    

Click **Check my progress** below to verify you're on track in this lab.

Testing in Dev environment

**Check my progress**

**Knowledge check (optional)**

What must you do before you can deploy a virtual agent to an existing custom environment?You must create a new custom environment and select it in the dropdown of the Test Agent.You must create a version of the virtual agent.You must remove the version of the agent already loaded.You must create another new custom environment.

**Submit**

### **Task 8. Managing different environments**

You've created two environments now and loaded a different version into each. What if you need to change the version loaded into one of those environments?

1. Click on **Environments** in the left pane as needed to get to the view of both of your environments, QA and Dev.
    
2. Click on the `QA` environment.
    
3. Select `Flight booker main v2 chat bot` from the version dropdown.
    
4. Click **Save**.
    
5. Notice the `Last modified` time for the version.
    
6. Use the test simulator to ensure the version two is loaded. (Recall that you added the friendly greeting to this one.) Don't forget to click "Reset" to begin a fresh test scenario and choose **QA** in the environment dropdown.
    
7. Go back and load `Flight booker main v1 chat bot` to the QA environment.
    
8. Retest. Was it what you expected? You should no longer see the friendly greeting prior to the prompt for departure city.
    

Discuss your working environment - What version of your agent do you suppose would be tested if you ran the test simulator using the *Draft* environment? You guessed it! The working copy that you've recently saved or uploaded. You can test the working copy of your virtual agent in Draft until you're ready to create a version of it. At that point, you could save it to another environment so that another team can begin testing that frozen version.

By selecting a specific environment, the test is running the version of your virtual agent loaded to the specified environment (which may be different from what you're currently working on in Dialogflow in Draft mode). Another benefit is you can test different versions without going through the process of retraining the model (which can take some time for larger, more complex virtual agents).

**Check your knowledge**

When you see the message, 'Start Flow' is not included in the environment, what does it mean?Its just a warning, not an error. You can ignore it.You have already loaded another version to the environment.You cannot create a new version because there are no environments where it can be deployed.You cannot create a custom environment because there are no existing versions that could be deployed to it (Dialogflow needs at least one Start Flow).

**Submit**

When you want to test the Default Start Flow for a version of your agent in a specific environment, you must do what at minimum? Choose the most accurate answer.Specify the environment and flow you mean to test.Specify the environment, flow, and intents you mean to test.Specify which environment you mean to test in.Specify which flow you mean to test.

**Submit**

Before you sign out, you can to export your virtual agent if you want. Recall that this is done through the following general steps:

1. Select `View all agents` from the **Agent** dropdown at the top.
    
2. Click on the context menu (three vertical dots) and choose **Export**.
    
3. Click on the **Download** radio button.
    
4. Click **Export**.
    

---

### Solution of Lab

%[https://www.youtube.com/watch?v=tWLu8pPF9mM] 

Download file: [gsp929-start-agent.blob](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP929/gsp929-start-agent.blob)