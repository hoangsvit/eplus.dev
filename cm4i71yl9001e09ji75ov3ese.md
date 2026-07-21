---
title: "Configure Your Workplace: Google Workspace for IT Admins: Challenge Lab - GSP377"
seoTitle: "Configure Your Workplace: Google Workspace for IT Admins: Challenge La"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: 2024-12-10T08:22:59.421Z
cuid: cm4i71yl9001e09ji75ov3ese
slug: configure-your-workplace-google-workspace-for-it-admins-challenge-lab-gsp377
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/19cde3a9-7be4-4da5-b45e-91b7896a30eb.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/02628e6c-bc9a-48b8-a227-400bf3444eaa.png
tags: configure-your-workplace-google-workspace-for-it-admins-challenge-lab-gsp377, gsp377

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students enrolled in the [Configure your Workplace: Google Workspace for IT Admins](https://www.cloudskillsboost.google/course_templates/780) skill badge. Are you ready for the challenge?

## **Setup**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### Start your lab

When you are ready, click **Start Lab** in the upper left.

### Sign in to the Google Workspace Admin Console

To access the Google Workspace Admin Console, you must find your credentials and then sign in.

#### **Find your lab's User Email and Password**

To access the resources and console for this lab, locate the **User Email** and **Password** in the Lab Details panel. This panel is on the left or at the top, depending on the width of the browser window. Use these credentials to log in to the Google Workspace Admin Console.

If your lab requires other resource identifiers or connection-related information, they appear on this panel as well.

#### **Sign in to the Admin Console**

1.  Click **Open Google Workspace Admin Console**.
    

***Tip:*** Open the tabs in separate windows, side-by-side.

**Note:** If you see the **Verify your account** dialog:

*   Click **Next**.
    
*   Click the prefilled user.
    
*   Click **Use another account**.
    

2.  On the Sign in page, log in using the **User Email** and **Password** details provided.
    
3.  When prompted, click **I understand** and **ACCEPT TERMS OF SERVICE** to accept all terms and conditions.
    

After a few seconds, the *Admin Console* opens.

4.  Right-click **VERIFY DOMAIN** in either the yellow box at the top or the red box in the *Domains* card, and select **Open link in new tab**.
    
    **Note:** To complete this step in a real-life scenario, you'd need to add an actual DNS record.
    
5.  Click the new tab, called **Domain setup**, to complete the Google Workspace domain verification steps.
    
6.  On the *Let's set up your domain* page, click **Get Started**.
    
7.  Select the **My domain uses a different host** checkbox and then click **Continue**.
    
8.  At the bottom of the *Add verification code* page, select the **Come back here and confirm once you have updated the code on your domain host** checkbox, and then click **Confirm**.
    
9.  Wait until it says **Your domain is verified!** and then close the *Domain setup* tab.
    
    **Note:** Do not click **Activate Gmail**.
    
10.  Return to the **Admin Console** tab and refresh the page.
     

## **Challenge scenario**

Your company acquired a small company that will become a new division. As part of the team tasked with configuring Workspace for this new division, you are assigned to use the Google Workspace Admin Console to configure the new operating division environment to run safely, securely, and reliably.

As a Workspace administrator you need to perform following administrative operations:

*   Update organization profile and preferences
    
*   Create a new group
    
*   Create a shared resource
    
*   Create an organizational unit (OU) structure and configure access for Google Vault
    
*   Enable super admin recovery
    

## **Task 1. Update the organization profile and preferences**

Update the organization's name to **Cymbal Finance** and then the organization preferences setting so that new products are not automatically rolled out to users when they are released.

Click *Check my progress* to verify the objective.

Update the organization profile and preferences

Check my progress

## **Task 2. Create a new group**

Create a new restricted group named **Operating Team** to be used by employees in the new division for easy group communication and collaboration. When you create this group, restrict the membership to invited users only.

Click *Check my progress* to verify the objective.

Create a new group

Check my progress

## **Task 3. Create a shared resource**

Create a Calendar resource named **Meeting Room**, which represents a physical meeting room as a shared resource that users can view and book in Calendar. The meeting room will have at least one feature of the **Other** type.

Use below details to create resources:

**For building:**

| **Parameter** | **Value** |
| --- | --- |
| Name | Head Office |
| Floors | G |

**For resource:**

| **Parameter** | **Value** |
| --- | --- |
| Category | Meeting Space |
| Building | Head Office |
| Floor | G |
| Resource name | Meeting Room |
| Capacity | 12 |

**For resource feature:**

| **Parameter** | **Value** |
| --- | --- |
| Feature name | Whiteboard |
| Feature type | Other |

Click *Check my progress* to verify the objective.

Create a shared resource

Check my progress

## **Task 4. Create an organizational unit (OU) structure and configure access for Google Vault**

To apply different administrative settings to some users, you must place them in child OUs below the top-level organization. In this task, create an OU named **Operating Unit** for the division and add at least two users to this OU with the following details:

| **First Name** | **Last Name** |
| --- | --- |
| Jamie | Jim |
| Leslie | Brick |

Then configure Google Vault so that only users in the **Operating Unit** OU can access it.

Click *Check my progress* to verify the objective.

Create an OU structure and configure access for Google Vault

Check my progress

## **Task 5. Add user account recovery information**

Add an email recovery option in [your lab account](https://myaccount.google.com/), so that if you forget your password, you can easily reset it.

Click *Check my progress* to verify the objective.

Add user account recovery information

Check my progress

* * *

## Solution of Lab

%[https://www.youtube.com/watch?v=3dkSgnCNsSA] 

%[https://www.youtube.com/watch?v=qE4v0ARydy4] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1733818945067/3fe2ff9f-75c2-4769-89aa-c79a5c4557e1.png align="center")

**Google Workspace Admin Challenge Lab — Quick Solution**

Complete only the tasks that have **Check my progress**.

> Use an Incognito window and sign in only with the temporary lab account.

**Prerequisite: Verify the Domain**

1.  Open the **Google Workspace Admin Console**.
    
2.  Sign in with the credentials provided by the lab.
    
3.  Accept the Terms of Service and click **Get set up**.
    
4.  Right-click **Verify** or **Verify domain** → **Open link in new tab**.
    
5.  Click **Get Started**.
    
6.  Select **Other verification options**.
    
7.  Select **Other** as the domain host → **Continue**.
    
8.  Select:
    
    ```text
    Come back here and confirm once you have updated the code on your domain host
    ```
    
9.  Click **Confirm**.
    
10.  Wait for **Your domain is verified!**
     
11.  Close the tab and refresh the Admin Console.
     

> Do not click **Activate Gmail**.

* * *

### Task 1: Update the Organization Profile and Preferences

**Change the organization name**

Go to: [Admin Console → Account → Account settings → Profile](https://admin.google.com/u/0/ac/accountsettings/profile)

Set:

```text
Organization name: Cymbal Finance
```

Click **Save**.

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/bd4fda09-0b6b-48c8-a3b6-3c555a0d33bb.png align="center")

**Disable automatic release of new products**

Go to: [Admin Console → Account → Account settings → Preferences](https://admin.google.com/u/0/ac/accountsettings/preferences)

Find **New products** or **New products release** and select the option that prevents new products from being automatically enabled.

Depending on the current interface, select:

```text
Manual release
```

or disable:

```text
Turn on new products automatically
```

Click **Save**.

Click **Check my progress – Update the organization profile and preferences**.

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/b5e77e80-7b7d-411a-b6b7-11477a328288.png align="center")

* * *

### **Task 2: Create the Operating Team Group**

Go to: [Admin Console → Directory → Groups → Create group](https://admin.google.com/u/0/ac/groups)

Enter:

| Field | Value |
| --- | --- |
| Group name | `Operating Team` |
| Group email | `operating-team@YOUR-LAB-DOMAIN` |
| Description | Optional |

Replace `YOUR-LAB-DOMAIN` with the domain of the lab Admin account.

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/5bfcb817-9670-439b-894c-050a12c0c53d.png align="center")

Click **Next** and configure:

```text
Access type: Restricted
Who can join the group: Invited users only
```

Complete the group creation.

> You do not need to add members unless the progress checker specifically requests them.

Click **Check my progress – Create a new group**.

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/43ff8a12-413a-4380-8189-86aa426bd840.png align="center")

* * *

### Task 3: Create the Shared Calendar Resource

Go to: Admin Console → Directory → Buildings and resources → Manage resources

**Create the building**

Open **Buildings** or **Manage buildings**, then create:

| Field | Value |
| --- | --- |
| Building name | `Head Office` |
| Floors | `G` |

Complete any other required fields with valid values, then click **Add building** or **Save**.

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/996e9d6b-0318-4a20-a008-97ad1d28497a.png align="center")

**Create the resource feature**

Open **Resource features** and create:

| Field | Value |
| --- | --- |
| Feature name | `Whiteboard` |
| Feature type | `Other` |

Click **Save**.

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/541d0df4-8642-4bb2-a429-6339b47e47ae.png align="center")

**Create the meeting room**

Return to **Resources** and select **Add resource**.

Enter:

| Field | Value |
| --- | --- |
| Category | `Meeting Space` |
| Building | `Head Office` |
| Floor | `G` |
| Resource name | `Meeting Room` |
| Capacity | `12` |
| Feature | `Whiteboard` |

Click **Add resource** or **Save**.

Click **Check my progress – Create a shared resource**.

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/1c084483-576a-497e-8794-6e8f259673dd.png align="center")

* * *

### Task 4: Create the Operating Unit OU and Configure Vault

**Create the organizational unit**

Go to: Admin Console → Directory → Organizational units

Create a child OU directly under the root organization:

```text
Operating Unit
```

### Create the two users

Go to: Admin Console → Directory → Users → Add new user

Create:

| First name | Last name | Organizational unit |
| --- | --- | --- |
| Jamie | Jim | `/Operating Unit` |
| Leslie | Brick | `/Operating Unit` |

For each user, select `Operating Unit` during creation or move the user afterward through:

```text
User → More options → Change organizational unit
```

### Optional: Bulk upload users

Download the official template from:

```text
Directory → Users → Bulk update users
```

Fill its matching columns with:

```csv
First Name [Required],Last Name [Required],Email Address [Required],Password [Required],Org Unit Path [Required],Change Password at Next Sign-In
Jamie,Jim,jamie@YOUR-LAB-DOMAIN,Lab@12345678,/Operating Unit,FALSE
Leslie,Brick,leslie@YOUR-LAB-DOMAIN,Lab@12345678,/Operating Unit,FALSE
```

Always keep all columns from the official Google template.

### Turn off Vault for the root organization

Go to:

```text
Admin Console → Apps → Google Workspace → Google Vault
```

1.  Select the root organizational unit.
    
2.  Set **Service status** to:
    
    ```text
    OFF for everyone
    ```
    
3.  Click **Save**.
    

### Turn on Vault only for Operating Unit

1.  Select **Operating Unit** from the left panel.
    
2.  Change the service status to:
    
    ```text
    ON
    ```
    
3.  Click **Override**.
    

The final configuration must be:

| Organizational unit | Google Vault |
| --- | --- |
| Root organization | OFF |
| Operating Unit | ON — overridden |

Click **Check my progress – Create an OU structure and configure access for Google Vault**.

* * *

### Task 5: Add Recovery Information

Open the lab administrator’s user profile:

```text
Admin Console → Directory → Users → Select the lab Admin account
```

Open:

```text
Security → Recovery information
```

Add a valid recovery email address and click **Save**.

If the option is not available from the Admin Console:

1.  Click the Admin account avatar.
    
2.  Select **Manage your Google Account**.
    
3.  Open **Security**.
    
4.  Find **Recovery email**.
    
5.  Add a valid email address and complete verification if requested.
    

> Do not use the same temporary lab email as its own recovery email.

Click **Check my progress – Add user account recovery information**.