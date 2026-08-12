---
title: "Privileged Access with IAM: Challenge Lab - GSP526"
seoTitle: "Privileged Access with IAM: Challenge Lab - GSP526"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly."
datePublished: 2026-08-12T12:11:04.741Z
cuid: cmsq1swwm00010ajhgg7cbpoz
slug: privileged-access-with-iam-challenge-lab-gsp526
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/05dc4c9e-9dda-40de-b38a-365490734744.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/355dcb5a-2a42-45a4-b71b-9079947b5bc4.png
tags: privileged-access-with-iam-challenge-lab-gsp526, privileged-access-with-iam-challenge-lab, gsp526

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the <> course. Are you ready for the challenge?

## **Topics tested**

This lab challenges you to demonstrate your ability to do the following:

*   Enable Privileged Access Manager (PAM) and complete the initial setup.
    
*   Create an entitlement, update its configuration, and delete it when no longer needed.
    
*   Manage grants by requesting, approving, and revoking access.
    

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

## **Challenge scenario**

Here is a company overview of Cymbal Group:

Headquartered in Minneapolis, Minnesota, Cymbal currently employs 775,000 people across the world and reported 192 billion US dollars in revenue in 2026.

Cymbal has always been strongly committed to innovation, uncovering meaningful ways to transform industries and deliver better experiences for its customers. Cymbal’s branded businesses span multiple sectors including manufacturing, financial services, media, healthcare, retail, aviation, and education.

Cymbal Group has been rapidly making the transition to a cloud-first operating model. Cymbal Bank, Superstore, and other Cymbal Group assets have all been adopting Google Cloud as part of their technology strategy.

As a cloud administrator at Cymbal Group, you are responsible for enforcing the principle of least privilege by eliminating standing high-level administrative permissions. To do this, you are setting up Privileged Access Manager (PAM) to control temporary, just-in-time privilege elevation for your operations team.

In this challenge, you will play the role of the administrator setting up the system, but you will also simulate the full request and approval workflow. You will be working with **two user personas** to test this workflow:

*   **Cymbal Systems Admin (**`primary_user`**)**: This is your primary account. You will use it to enable PAM, create the initial entitlements, and simulate an engineer requesting temporary elevation to `Compute Admin` to perform a task.
    
*   **Cymbal Security Lead (**`secondary_user`**)**: This is your team's security lead. You will sign in as this user in a separate private window to review, approve, and eventually revoke the access grant request, demonstrating dual-control compliance.
    

### Your challenge

Your challenge is to configure PAM secure access control, manage entitlements, and handle just-in-time privilege elevation. You must successfully request, approve, and revoke access grants, ensuring compliance and clean audit trails before cleaning up the environment.

## **Task 1. Enable Privileged Access Manager**

In this task, you must enable Privileged Access Manager and grant the necessary permissions to the service agent.

*   Enable the **Privileged Access Manager API** in your project.
    
*   Locate the Google-managed **Privileged Access Manager service agent** (created automatically upon activation) and grant it the `Privileged Access Manager Service Agent` role.
    

## **Task 2. Create the entitlement**

In this task, you must create a Privileged Access Manager entitlement.

*   Click **Create** to launch the wizard (the location defaults to **global** automatically in the console), and configure the parameters in the specified order:
    

| **Parameter** | **Configuration** |
| --- | --- |
| **Entitlement Name** | `pam-entitlement` |
| **Role** | `Compute Admin` |
| **Maximum duration** | `10 hours` |
| **Requester principal** | [`student-04-565a94649627@qwiklabs.net`](mailto:student-04-565a94649627@qwiklabs.net) |
| **Justification required from requesters** | **Not required** |
| **Approver principal** | [`student-02-65243a4953bf@qwiklabs.net`](mailto:student-02-65243a4953bf@qwiklabs.net) |
| **Number of approvers required** | `1` |

Click **Check my progress** to verify the objective.

## **Task 3. Update the entitlement**

In this task, you must update the configurations of the existing entitlement.

*   Select the **Entitlements for all users** tab, edit the `pam-entitlement` entitlement, and update the **Maximum duration** to `4 hours`.
    

Click **Check my progress** to verify the objective.

## **Task 4. Request temporary elevated access with Privileged Access Manager**

In this task, you must request temporary elevation as the primary user and approve the request as the secondary user.

1.  From the **My Entitlements** tab, request a grant against the `pam-entitlement` entitlement for `4 hours` as the primary user (**Cymbal Systems Admin**: [`student-04-565a94649627@qwiklabs.net`](mailto:student-04-565a94649627@qwiklabs.net)). Provide any test justification during the request.
    
2.  Open a **new private/incognito browser window**, sign in to the Google Cloud console using the secondary user (**Cymbal Security Lead**: [`student-02-65243a4953bf@qwiklabs.net`](mailto:student-02-65243a4953bf@qwiklabs.net)) credentials, and **approve** the pending grant request.
    

**Note**: It can take 1-2 minutes for the approval event logs to populate. Please wait a moment before clicking Check my progress.

Click **Check my progress** to verify the objective.

## **Task 5. Revoke a grant**

In this task, you must revoke the active grant to restore the least-privilege baseline.

*   Sign in to the console as the secondary user (**Cymbal Security Lead**: [`student-02-65243a4953bf@qwiklabs.net`](mailto:student-02-65243a4953bf@qwiklabs.net)) and **revoke** the active grant.
    

Click **Check my progress** to verify the objective.

## **Task 6. Delete an entitlement and review audit logs**

In this task, you must clean up the entitlement and verify the operations in the audit logs.

1.  Select the **Entitlements for all users** tab and delete the `pam-entitlement` entitlement.
    
2.  View the Privileged Access Manager audit logs (or Cloud activity logs) for `pam-entitlement` using the Google Cloud console to verify the entitlement lifecycle records.
    

Click **Check my progress** to verify the objective.

* * *

## Solution of Lab

### Quick

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP526/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/22736d91-1b57-4ff3-825f-5bc0dd043e0c.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/d23dca91-d2c8-47a5-a01e-fb9589119271.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/a65753eb-04f6-44c2-a716-ce125ed61fc0.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/a3749494-8a20-4e85-a6f2-42d67b9a87d0.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/d130bbfc-426e-4ee0-9ccc-75fae7ee78c9.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/4d460f88-2da0-4370-bcb4-2a290d9ba257.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/e0676c46-f03f-47a4-8e5b-71144edecdb2.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/269144c4-5c80-4794-b261-4e893c4797b2.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/f12b7f69-8704-456e-b03e-966d2dd9a587.png align="center")