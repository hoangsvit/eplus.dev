---
title: "Google Workspace Admin: Super Admin Account Recovery - GSP948"
seoTitle: "Google Workspace Admin: Super Admin Account Recovery - GSP948"
seoDescription: "Learn how to recover your Google Workspace Super Admin account, including setting recovery options and resetting passwords effectively"
datePublished: Sat Jul 19 2025 08:24:36 GMT+0000 (Coordinated Universal Time)
cuid: cmd9zfajt001s02jlf3ei2xk5
slug: google-workspace-admin-super-admin-account-recovery-gsp948
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752913235409/de2ba434-c67e-4a56-a0ec-574e642e8ed9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752913277822/188d6914-3ace-4695-aba1-f16893be870f.png
tags: google, google-account-recovery, google-workspace-admin, google-workspace-admin-super-admin-account-recovery-gsp948, google-workspace-admin-super-admin-account-recovery, gsp948

---

## Overview

A Super Admin in Google Workspace has the highest level of permissions and control over an organization's entire Google Workspace environment.

Super admins can:

* Manage all users, groups, and organizational units
    
* Control all services and settings (Gmail, Drive, Calendar, etc.)
    
* Access and manage all user data
    
* Reset passwords for any user
    
* Perform sensitive security and audit-related actions
    
* Contact Google Support directly
    

What if *you*, the super admin, forgets *your* password? How does a super admin get help?

In this lab you learn some best practices for super admin account recovery.

### Objectives

You do the following in the Google Workspace Admin Console:

* Enable super admin account recovery
    
* Add recovery options to your super admin account
    
* Reset your password using a recovery email
    

### Prerequisites

For this lab you need an email account you can access outside of this lab, like your personal email. This will be your *recovery email account* for the lab. You will send and retrieve a recovery code to verify your super admin account.

Familiarity with basic Google Workspace terminology is recommended to your learning experience.

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
    

## Task 1. View super admin recovery settings

View the recovery options available in Google Workspace and the default settings of user passwords.

1. In the Google Admin console, click the **Security** card. You may have to scroll down and click **Show more** to see the **Security** card.
    
2. Scroll down and click to expand the **Account Recovery** section. This is where you configure account recovery policies for the super admin and users.
    

By default, account recovery is **ON** for a super admin and **Off** for users.

## Task 2. Add recovery information to your administrator account

In real life, when you sign up for a Workspace account, you supply email account recovery information. This is helpful in case you lose access to your account - like forgetting your email password, or your device is lost or compromised.

Since the administrator account was created for you in the training domain, in this section you will add your email recovery information.

1. Open [your Workspace account](https://myaccount.google.com/).
    
2. Click **Security** either in the left panel or on the top depending on the browser width.
    

**Note:** The **Security** option is on either the left panel or the top menu bar, depending on the width of your browser window.

3. Scroll down to the **How you sign in to Google** section.
    
4. Click **Recovery email**.
    
5. When prompted, enter your password from the **Lab Details** panel, and then click **Next**.
    
6. Enter your email address, and then click **NEXT**.
    

At this point, Google Sends a verification code to your recovery email address.

7. Go to the recovery email account and open the message from Google that provides your verification code.
    
8. Copy the verification code into the **Verification code** field and click **Verify**.
    

Your recovery email address is verified.

9. Close the **Recovery email** browser tab.
    

Click *Check my progress* to verify the objective.

Add recovery information to your administrator account

## Task 3. Recover your administrator account

Imagine, that you have been on vacation for two weeks and have forgotten your password. How do you log in? In this next section, you sign out of your account, then go through the steps of recoving your account.

1. In your Workspace account, click the user avatar at the top right and click **Sign out** to sign out of the account.
    
2. Sign in using the **User Email** provided in the Lab Details pane, but when prompted for your password, click the **Forgot password** link.
    
3. Google emails you a verification code.
    
4. Go to your recovery email account and find the message from Google with the verification code
    
5. Enter the code in the **Account recovery** screen, then click **Next**.
    

You are now asked to reset your password.

6. Enter a new password, confirm the password, for example `luv2learn`, then click **Save password**.
    
7. Click **Continue** to return to the Admin console.
    

You have successfully recovered your super admin account.

Click *Check my progress* to verify the objective.

Recover your administrator account

---

## Solution of Lab

%[https://youtu.be/241X2fudwfQ]