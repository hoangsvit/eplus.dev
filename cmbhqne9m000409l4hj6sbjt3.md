---
title: "Google Workspace Admin: Managing Applications - GSP417"
seoTitle: "Google Workspace Admin: Managing Applications - GSP417"
seoDescription: "Initially in your Google Admin console, all users and devices are placed in a single organizational unit (OU), called the top-level OU. All settings you mak"
datePublished: Wed Jun 04 2025 09:21:42 GMT+0000 (Coordinated Universal Time)
cuid: cmbhqne9m000409l4hj6sbjt3
slug: google-workspace-admin-managing-applications-gsp417
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749028857065/b910e8e5-2537-4d96-97d4-eb6754cc38a3.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749028883787/82daa20b-c3d9-42f2-ad9b-44000164cfe7.png
tags: google-workspace-admin-managing-applications-gsp417, google-workspace-admin-managing-applications, gsp417

---

## Overview

Initially in your Google Admin console, all users and devices are placed in a single organizational unit (OU), called the top-level OU. All settings you make in the Admin console apply to this top-level OU and, therefore, to all users and devices in your account. Any child OUs created under the top-level OU inherit those settings.

In this lab, you learn how to create an organizational unit structure and configure applications based on organizational units (OUs).

### What you'll learn

In this lab, you use Google Workspace to do:

* Create three OUs and add users to those OUs.
    
* Configure application access based on OUs.
    
* Configure application settings based on OUs.
    

### Prerequisites

* Familiarity with basic Google Workspace terminology
    

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### Start your lab

When you are ready, click **Start Lab** in the upper left.

### Sign in to the Google Workspace Admin Console

To access the Google Workspace Admin Console, you must find your credentials and then sign in.

#### Find your lab's User Email and Password

To access the resources and console for this lab, locate the **User Email** and **Password** in the Lab Details panel. This panel is on the left or at the top, depending on the width of the browser window. Use these credentials to log in to the Google Workspace Admin Console.

If your lab requires other resource identifiers or connection-related information, they appear on this panel as well.

#### Sign in to the Admin Console

1. Click **Open Google Workspace Admin Console**.
    

***Tip:*** Open the tabs in separate windows, side-by-side.

**Note:** If you see the **Verify your account** dialog:

* Click **Next**.
    
* Click the prefilled user.
    
* Click **Use another account**.
    

2. On the Sign in page, log in using the **User Email** and **Password** details provided.
    
3. When prompted, click **I understand** and **ACCEPT TERMS OF SERVICE** to accept all terms and conditions.
    

After a few seconds, the *Admin Console* opens.

4. Right-click **VERIFY DOMAIN** in either the yellow box at the top or the red box in the *Domains* card, and select **Open link in new tab**.
    
    **Note:** To complete this step in a real-life scenario, you'd need to add an actual DNS record.
    
5. Click the new tab, called **Domain setup**, to complete the Google Workspace domain verification steps.
    
6. On the *Let's set up your domain* page, click **Get Started**.
    
7. Select the **My domain uses a different host** checkbox and then click **Continue**.
    
8. At the bottom of the *Add verification code* page, select the **Come back here and confirm once you have updated the code on your domain host** checkbox, and then click **Confirm**.
    
9. Wait until it says **Your domain is verified!** and then close the *Domain setup* tab.
    
    **Note:** Do not click **Activate Gmail**.
    
10. Return to the **Admin Console** tab and refresh the page.
    

## Task 1. Create an organizational unit (OU) structure

To apply different settings to some users or devices, place them in a child OU, then customize the inherited settings of the child OU, and therefore the members of the child OU.

In this section, you create three OUs, and then apply different organizational policies to them.

### Create child OUs for Marketing, Compliance, and Contractors

Start by creating OUs.

1. Click the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **Directory** &gt; **Organization units**.
    
2. Click **Create organizational unit** to create a new OU.
    
3. For **Name of organizational unit**, enter **Marketing**
    
4. Optional: For **Description**, enter **The Marketing team**
    
5. Click **CREATE**.
    
6. Repeat steps 2-5 and create the **Compliance** and **Contractors** OUs.
    

### Create users in each of the OUs

Next, create three new users and place each of them into their own OU. Start by adding a user to the Marketing OU.

1. Click the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **Directory** &gt; **Users**.
    
2. Click **Add new user**.
    
3. For **First name**, enter **Jamie**.
    
4. For **Last name**, enter **Marketeer**.
    
5. For **Primary email address**, enter **jamie.marketeer**.
    
6. Click **Continue**, then click **Done**.
    
7. Select the checkbox next to Name **Jamie Marketeer**.
    
8. Click **More options** &gt; **Change organizational unit**. The Change organizational unit dialog opens.
    
9. Under **Google Workspace Labs**, select **Marketing**.
    
10. Click **Continue**, then click **Change**.
    
11. Click on the name **Jamie Marketeer**, then click **RESET PASSWORD**, and choose **Generate a new password**.
    

**Note:** Note the username and password. These will be used later in the lab.

12. Click **DONE**.
    
13. Repeat steps 2-12 to create two more users and assign them to an OU as described below:
    
    * User: **Leslie Compliance**, Email: **leslie.compliance**, OU: **Compliance**.
        
    * User: **Jesse Contractor**, Email: **jesse.contractor**, OU: **Contractors**.
        

Click *Check my progress* to verify the objective.

Create OU structure and new users

**Check my progress**

## Task 2. Configure application settings based on OUs

In this section, you configure access settings for Gmail and Google Vault, and Data Loss Prevention (DLP) settings for Google Drive.

### Disable Gmail for Contractors

Customize Gmail access such that users in the Contractors OU do not have access to the Gmail service.

1. Click **Main menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **Apps** &gt; **Google Workspace** &gt; **Gmail**.
    

**Note:** If a prompt to verify your domain appears, under **Services**, click the checkbox next to **Gmail** to select it. Leave this tab open for the rest of the lab.  
  
Open a new Admin console tab and repeat steps 1 and 2. The **Service Status** for all apps should now indicate ‘ON for everyone’.

2. Click the **Service status** card.
    
3. In the left panel, under **Google Workspace Labs**, click **Contractors**.
    
4. For **Service status**, select **OFF** and click **OVERRIDE** to override the inherited settings and disable Gmail for all users in the Contractors OU.
    

### Testing Gmail access configuration

Now test to make sure that the Gmail access configuration is working properly.

#### Testing Gmail access for users in the Contractors OU

1. Open [Gmail](https://mail.google.com/).
    
2. Click the Google avatar at the top right of the screen. (Notice that you are currently logged in as Workspace User.)
    
3. Click **Add another account**.
    
4. For **Email or phone**, enter the email of Jesse Contractor that you recorded in an earlier section. It should be similar to `jesse@goog-test.reseller.gappslabs.co…`.
    
5. Click **Next**.
    
6. For **Enter your password**, enter the password of Jesse Contractor that you previously noted and click **Next**.
    
7. Accept terms as prompted.
    
8. Create a secure password and click **Change password**.
    

A page opens with a message explaining that Jesse Contractor does not have access to Gmail.

#### Testing Gmail access for users in the Marketing OU

1. Switch to the Gmail browser tab which is logged in as Workspace User.
    
2. Click the Google avatar at the top right of the screen.
    
3. Click **Add another account**.
    
4. This time, log in as Jamie Marketeer with the email and password for that user that you previously recorded.
    

Gmail successfully opens for Jamie Marketeer.

#### Testing Gmail access for users in the Compliance OU

1. Switch to the Gmail tab which is logged in as Workspace User.
    
2. Click the Google avatar at the top right of the screen.
    
3. Click **Add another account**.
    
4. This time, log in as Leslie Compliance with the email and password of that user.
    

Gmail successfully opens for Leslie Compliance.

Click *Check my progress* to verify the objective.

Disable Gmail for contractors

**Check my progress**

### Restrict access to Vault

Configure access to Google Vault such that only users in the Compliance OU can access Google Vault.

1. Switch to the Admin console browser tab.
    
2. Click **Main menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **Apps** &gt; **Google Workspace** &gt; **Google Vault**.
    
3. Click the **Service status** card.
    
4. Click **OFF for everyone** to disable Google Vault for all users.
    
5. Click **SAVE**.
    
6. In the left panel, under **Google Workspace Labs**, click **Compliance**.
    
7. For **Service status**, click **ON** and then **OVERRIDE** to override the inherited settings.
    
8. Click **TURN ON** when prompted.
    

### Testing Vault access configuration

Now test to make sure that the Google Vault access configuration is working properly.

#### Testing Vault access for users in the Compliance OU

1. Switch to the Gmail tab that is logged in as `Leslie Compliance`.
    
2. Click on the **Google apps** icon.
    
3. Scroll down and click **Vault**.
    

Google Vault should load successfully for user Leslie Compliance.

**Note:** If Google Vault defaults to Google Workspace User instead of Leslie Compliance, click on **Sign in with a different account** located in the middle of the screen and sign in with Leslie Compliance.

#### Testing Vault access for users in the in the Marketing OU

1. Switch to the Gmail tab that is logged in as `Jamie Marketeer`.
    
2. Click on the **Google apps** icon.
    
3. Scroll down and click **Vault**.
    

A page opens with the message that Jamie Marketeer does not have access to Google Vault.

#### Testing Vault access for users in the Contractors OU

1. Switch to the Gmail tab that is logged in as `Jesse Contractor`.
    
2. Click on the **Google apps** icon.
    
3. Scroll down and click **Vault**.
    

A page opens with the message that Jesse Contractor does not have access to Google Vault.

Click *Check my progress* to verify the objective.

Restrict access to Vault

**Check my progress**

### Configuring Data Loss Prevention (DLP) for Google Drive

Set up a rule to prevent file sharing with an external domain in Google Drive.

1. Switch to the Admin console browser tab.
    
2. Click on the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) &gt; **Show more** &gt; **Rules**.
    
3. Click **Create rule** &gt; **Data Protection**.
    
4. For **Name**, enter "Google Drive - Prevent sharing with external domain".
    
5. Under **Scope**, click **Organizational units and/or groups**.
    
6. Click **Include organizational units**.
    
7. Select **Compliance** and **Marketing**.
    
8. Click **DONE**.
    
9. Click **CONTINUE**.
    
10. Under **Apps** &gt; **Google Drive**, select **Drive files** and click **CONTINUE**.
    
11. Click **CONTINUE**. (Because no condition has been added this rule will apply to all files in Google Drive.)
    
12. For **Actions**, select **Block external sharing**.
    
13. Click **CONTINUE**.
    
14. Review the rule details and click **CREATE**.
    

The new rule, **Google Drive - Prevent sharing with external domain**, is now listed in the **Rules** list.

### Testing Google Drive DLP configuration

Now test to make sure that the DLP configuration on Google Drive is working properly.

#### Testing Google Drive DLP access for users in the Compliance OU

1. Switch to the Gmail tab that is logged in as `Leslie Compliance`.
    
2. Click on the **Applications** icon.
    
3. Click **Docs**.
    
4. Under **Start a new document**, click **Blank**.
    
5. In the top right hand corner of the page, click **Share**.
    
6. For **Add people and groups**, enter an email address on an external domain, e.g. @gmail.com. Press the return key on the keyboard.
    
7. Click **Send**.
    

Leslie Compliance is notified that the file cannot be shared outside Google Workspace Labs.

#### Testing Google Drive DLP access for users in the Contractors OU

1. Switch to the Gmail tab that is logged in as `Jesse Contractor`.
    
2. Click on the **Applications** icon.
    
3. Click **Docs**.
    
4. Under **Start a new document**, click **Blank**.
    
5. In the top right hand corner of the page, click **Share**.
    
6. If prompted, **Name before sharing**, click **Save**.
    
7. For **Add people and groups**, enter an email address on an external domain, e.g. @gmail.com. Press the return key on the keyboard.
    
8. Click **Done**.
    
9. Click **Send**.
    

A message appears warning that you are about to share a file externally. Click Share anyway to share the file with a user on an external domain.

## Task 3. Test your knowledge

**True or False: Three types of organizational units are automatically spun up when you set up Google Workspace: one for admins, one for users, and one for devices.**

* True
    
* False
    

**To add Users to an organizational unit:**

* You put users in each organizational unit that runs an app they use.
    
* You manually or batch add users, Google Workspace assigns them to an organization unit based on rules set by the admin.
    
* You manually or batch add users and assign them to an organization unit.
    

**The following is true when you use organizational units to set policies:**

* You create a top level organizational unit, and then create child organizational units to customize the policies inherited from the top level organizational unit.
    
* You must always keep organizational units for devices separate from organizational units for users.
    
* One child organization unit may be in the hierarchy path of more than one top level organizational unit.
    
* You create an organizational unit for each department, even if each unit has the same policies.
    

---

## Solution of Lab

%[https://youtu.be/-1x2cz32y0k]

**Alternative Solution**

%[https://youtu.be/pLiv14u8ZwM]