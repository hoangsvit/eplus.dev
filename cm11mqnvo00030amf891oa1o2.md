---
title: "Automating Response to Phishing with Cortex XSOAR - GSP951"
seoTitle: "Automating Response to Phishing with Cortex XSOAR - GSP951"
seoDescription: "The lab uses a real spear phishing attack against a fictional bank, Galactic Ministry of Finance, by infiltrating the bank's e-mail server. After infiltrati"
datePublished: Sat Sep 14 2024 04:10:54 GMT+0000 (Coordinated Universal Time)
cuid: cm11mqnvo00030amf891oa1o2
slug: automating-response-to-phishing-with-cortex-xsoar-gsp951
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726286890370/323398e6-7934-404c-ad4f-8a5d2d29ae71.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726286942493/6fad86a0-e40d-41f1-be6d-729fd6ece68b.jpeg
tags: automating-response-to-phishing-with-cortex-xsoar-gsp951

---

## **Overview**

In this lab, use Cortex XSOAR (XSOAR) to automate incident response to phishing attacks.

The lab uses a real spear phishing attack against a fictional bank, Galactic Ministry of Finance, by infiltrating the bank's e-mail server. After infiltration, the attacker sends phishing e-mails to executives at a partnering bank, Bordeaux Bank, during peak business hours.

![tooltip](https://cdn.qwiklabs.com/3EdtQuaFAY3xEh8%2Fuz22XiHM8LTba0vYTO9AS1%2BlCMw%3D align="left")

The XSOAR instance in this lab has been pre-configured to use specific alerts, incidents, and playbooks. We recommend taking the time to review the out-of-box integrations available through the XSOAR Marketplace.

Palo Alto Networks has partnered with Google Cloud to host this lab. As part of the lab you will be given access to a Cortex XSOAR threat intel management instance.

### What you'll learn

In this lab, you will perform the following tasks:

* Investigating incidents using Cortex XSOAR.
    
* Understanding Cortex XSOAR War Rooms.
    
* Creating an incident Response Plan with Cortex XSOAR.
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab Details** panel with the following:
    
    * The **Open Google Cloud console** button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the **Sign in** page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-03-1f3bec3213f1@qwiklabs.net
    ```
    
    Copied!content\_copy
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    sNpY26dQeTNJ
    ```
    
    Copied!content\_copy
    
    You can also find the **Password** in the **Lab Details** panel.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To view a menu with a list of Google Cloud products and services, click the **Navigation menu** at the top-left.

![Navigation menu icon](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

## **Task 1. Introduction to XSOAR & Phishing**

In this task, take a moment to review the limitations of current solutions in effectively addressing phishing attacks.

1. **What is phishing?**
    
    Phishing is a type of social engineering that primarily occurs through email. Attackers create fraudulent emails that mimic legitimate communication in order to deceive recipients.
    
2. **What are some current limitations with today's systems in addressing phishing emails?**
    
    Responding to phishing emails can be a time-consuming and complex task. These tasks often require multiple tools and involve manual actions that are error prone.
    
3. **How does Cortex XSOAR address these limitations?**
    
    Cortex XSOAR effectively addresses challenges associated with phishing emails through its comprehensive automation and orchestration capabilities.  
    By combining automation, orchestration, and integrations, Cortex XSOAR significantly enhances the efficiency, accuracy, and speed of responding to phishing emails, effectively mitigating the associated challenges.
    

## **Task 2. Investigating Incidents**

In this task, learn about incidents within the Cortex XSOAR platform. An incident refers to a security event or breach that requires investigation, analysis, and remediation. When an incident occurs, XSOAR provides a centralized platform for managing and coordinating the response efforts.

### Step 1. Generate Phishing Incident

In this step, create an incident for the phishing attack. Creating incidents allows you to choose a scenario that best fits your specific use-case.

1. Access Cortex XSOAR using the URL and credentials below.
    
    | **Key** | **Value** |
    | --- | --- |
    | **Console** | `https://34.168.113.52` |
    | **Username** | `admin` |
    | **Password** | `PQpV3vhhyWvnQS1vvMGs` |
    
    It may take several minutes for the XSOAR console to become accessible.
    
2. Go to **Incidents**. Set the **Created range** to `All times`.
    
    ![tooltip](https://cdn.qwiklabs.com/OumZjI7BfWISrtcFhHL1eYQjafiGJTO%2Fm9%2BIKhmHEwo%3D align="left")
    
3. Click **New Incident** to create a new incident.
    
    ![tooltip](https://cdn.qwiklabs.com/aUrq%2FvfswLWupbJ7XJ1s1dagM06u9Xae532XIk1toQM%3D align="left")
    
    After creating an incident, the incident ID will be generated. You can view more details about incidents by selecting the incident's correlating ID number.
    
4. Set the **workshopscenario** to `Phishing Campaign` and **Type** to `Scenario`. Then, click **Create New Incident**.
    
    ![tooltip](https://cdn.qwiklabs.com/mO3CEkfwm1gpkrUp96xAeRTADdgT%2FuzempNwGvM5lXE%3D align="left")
    
    It may take several minutes for the new incident to appear. This is because XSOAR is correlating and processing the data with associated Work Plan tasks.
    
5. While waiting for the incident to generate, open any existing incident to view more information about it.
    
    ![tooltip](https://cdn.qwiklabs.com/x20VBQZuXmgJj7ITfysr%2BEPsu5M3aJUXfccrH1GlAkk%3D align="left")
    
    All of the incidents in this lab have been generated by Cortex XDR and are ingested by Cortex XSOAR.
    

### Step 2. Investigate Phishing Incident

In this step, investigate the phishing incident that was created in the previous step, including the incident's timeline, status, and associated evidence.

1. While within **Incidents**, enter the search below to filter for incidents that use the `Email Phishing` playbook.
    
    **Filter**
    
    ```apache
    playbook:"Email Phishing"
    ```
    
    Copied!content\_copy
    
    ![tooltip](https://cdn.qwiklabs.com/tEXshO0Ue%2FWHyyjmdXfItLF%2FbMpAIL2OG%2FauH3mZkoI%3D align="left")
    
2. Select the most recent incident to view more information about it.
    
    ![tooltip](https://cdn.qwiklabs.com/eJVpP%2F8TlMh9C3jmjU8MEbkeH%2FolTf1fXekVr920F60%3D align="left")
    
    Notice the **Status** of the incident is listed as `Active`. This is because the Work Plan associated with this incident type has not been completed, or is waiting for manual intervention.
    
3. Click **Case Info** tab. Take time to review the case details, timeline, notes, and evidence.
    
    ![tooltip](https://cdn.qwiklabs.com/gCJfEqNwhBkjKrn3KxH4LFlvu%2BGb0Ek%2FHEORh%2FLBccc%3D align="left")
    
    The incident information panel provides a summary of the incident with available actions that you can take.
    
4. Click the **Investigation** tab. Review the contents of the e-mail, including any associated indicators, and incident files.
    
    ![tooltip](https://cdn.qwiklabs.com/JNlfXxB09pQmWKIHDlUlnzOeUTrCzPnmxcM84ByzC5s%3D align="left")
    
    The Investigation tab displays a rasterized image of the phishing email, the email body, and information about the indicators.
    

## **Task 3. Incident War Room & Work Plan**

In this task, work within XSOAR War Rooms and Work Plans to understand and remediate phishing incidents.

### Step 1. Incident War Room

A War Room centralized workspace that facilitates collaboration, incident response, and threat intelligence among security teams. In this step, navigate to the incident's War Room to view a consolidated pane of all the events related to the phishing incident.

1. The **War Room** tab has a notification icon, indicating manual intervention is required for this particular incident. Click the **War Room** tab.
    
    ![tooltip](https://cdn.qwiklabs.com/vrbiljVKzx%2F5fr3cz0YqMqTKBYVpnzBYGgxrcOLOwtU%3D align="left")
    
    War Room provides a unified view of all ongoing security incidents, allowing teams to coordinate their efforts, track progress, and resolve incidents more efficiently.
    
2. Take time to scroll through the events associated with the incident.
    
3. At the bottom, a message states the execution of the Work Plan has been paused.
    
    ![tooltip](https://cdn.qwiklabs.com/m%2BttXGbg28kexfwaA6hrMNt5slt3vdpDwYTCbikvMrY%3D align="left")
    
    There may be several reasons for pausing tasks in a Work Plan. For example, Work Plans may be paused intentionally until clear communication has been established across SOC teams.
    
4. Click **Complete in Task pane → Open in Work Plan**.
    
    ![tooltip](https://cdn.qwiklabs.com/IP%2BQh%2B9LBd3X4Uf4KQAEqlGTPGddXg7U4sjJtY2rBF0%3D align="left")
    
    Work Plans use playbooks with predefined workflows/instructions to automate and orchestrate SOC operations and incident response.
    

### Step 2. Incident Work Plan

In this step, navigate to the incident's Work Plan to view the steps and actions taken to respond to the phishing incident. The Work Plan provides a visual representation of the steps and actions to be taken when responding to specific security incidents or events.

1. The previous step brings you to a incomplete task within the **Work Plan** tab. The tasks is requesting manual investigation into the email.
    
    ![tooltip](https://cdn.qwiklabs.com/RnM%2B7OGqMKLgkfrWz0dPJZZkCxkk7q7oUBU8lB4ZzHM%3D align="left")
    
    Work Plans outline the steps, tasks, and milestones required to successfully automate security operations and incident response. Completed tasks are marked **green** and incomplete tasks are marked **yellow**.
    
2. Since we already have investigated the email, click **Mark Completed**.
    
    ![tooltip](https://cdn.qwiklabs.com/%2FImte%2FFwnYj6ZYaMAFdmUs7U3BB1x3SQYGcgcEFMnXA%3D align="left")
    
    Within Task Details, you can add notes about the task, assign the task to other users, or set a due date for the task.
    
3. The Work Plan should progress the task, **Assign and involve appropriate personnel**. Click **Mark Completed**.
    
    ![tooltip](https://cdn.qwiklabs.com/e2DQWHJDrSbII5yDT%2Fm%2BbavGY0oI9%2FJowFXGp1jiNRA%3D align="left")
    
    This task provides the option to invite additional team members to collaborate on the incident.
    
4. The Work Plan should progress the task, **Assess severity**. Click **Mark Completed**.
    
    ![tooltip](https://cdn.qwiklabs.com/qtz10Kvf0v5AHsi9E9pS3diKTxjCCRzf%2Fk%2Fnn1bxEpU%3D align="left")
    
    This task offers the choice to assign varying severity levels based on the gathered information about the incident. This capability allows you to establish distinct steps within the Work Plan, enabling different actions to be taken depending on the assigned severity level.
    
5. The Work Plan should progress the task, **Are the hostnames in the urls being misrepresented?** Click **Mark Completed**.
    
    ![tooltip](https://cdn.qwiklabs.com/gU1JgvTbiYJAUrwISQ%2BwMh6EjDdRKtuoWPVzL1fB89Y%3D align="left")
    
    This task requires manual intervention to verify whether the URL text in the email differs from the actual hostname. This is a common tactic in phishing attacks, by tricking users into clicking the embedded URL.
    
6. The Work Plan should now be marked as completed. Feel free to explore any of the tasks in the Work Plan for additional information and insights.
    
    ![tooltip](https://cdn.qwiklabs.com/74DGtiJ6a6mGcGXrF0eZrOccQRGws3sHkml%2F5TVfq2w%3D align="left")
    

### Step 3. (Optional) Generate Report

XSOAR offers extensive reporting capabilities out of the box, including pre-built reports and dashboards, it also allows you to create custom reports to suit your specific needs. In this step, create a report about the phishing incident.

In this step, a report (PDF) will be downloaded to your local machine. If you do not want to do this, skip this step.

1. While within the Incident, go to **Case Info → Actions → Report**.
    
    ![tooltip](https://cdn.qwiklabs.com/p0PnS%2Bupdt5Yq5H564MY9E8EtaV%2BM%2B1455z54Pjkm9s%3D align="left")
    
2. Set **Select a tab to generate report from** to `Case info`. Then, click **Generate report**.
    
    ![tooltip](https://cdn.qwiklabs.com/pbw9rLWHAg2TnBRVUvgDPwqbqjcMsHjZ7YnNOmCF7j8%3D align="left")
    
    XSOAR offers a range of report types that can be generated. In addition, you have the option to directly generate reports within the Work Plan and conveniently email them to the relevant teams.
    
3. Hover over the XSOAR logo on the top left, and click on **Dashboards & Reports**. Click the **Reports** tab to download the report to your machine.
    
    ![tooltip](https://cdn.qwiklabs.com/ORbJfiVqlt%2BhdB%2BB1hxi0MeD8Gz9WTvvjmBXUzJ%2FK5E%3D align="left")
    

---

## Solution of Lab

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>You don't need to perform this lab just wait more then <mark>5 minutes</mark> to complete your lab</strong></div>
</div>

%[https://www.youtube.com/watch?v=VSThRQPfAZ8&ab_channel=Techcps]