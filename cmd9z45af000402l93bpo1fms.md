---
title: "Google Workspace Admin: Getting Started - GSP035"
seoTitle: "Google Workspace Admin: Getting Started - GSP035"
seoDescription: "Learn how to manage Google Workspace Admin: add users, customize settings, and improve collaboration with this hands-on guide. Perfect for beginners!"
datePublished: Sat Jul 19 2025 08:15:56 GMT+0000 (Coordinated Universal Time)
cuid: cmd9z45af000402l93bpo1fms
slug: google-workspace-admin-getting-started-gsp035
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752912918238/5dcb5ea3-ef64-4c7f-85f0-242129fd7b0c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752912935102/b8b8eeb5-17a6-493e-9249-603b06027c94.png
tags: google-workspace-admin, google-workspace-admin-getting-started-gsp035, gsp035

---

## Overview

Google Workspace by Google Cloud is your go-to solution for productivity tools. Get more done with seamless collaboration tools, a simple management interface, and enterprise-level security and reliability. Easily add users, manage devices, and configure security and settings so your data stays safe.

Centralized administration makes set up and management fast and easy. But access to Google Workspace Administration controls is not commonly available for practice, so in this lab you are provided with an organization "Google Workspace Labs" and a temporary Google Workspace domain to work in.

In this lab, you personalize your Google Workspace Admin console to suit your needs, and then make some basic modifications to the Admin Console, and modify the company profile. Then you provision users both individually and in a batch upload using a CSV file.

### Objectives

In this lab, learn how to do the following through the Google Workspace Admin Console:

* Change your organization's name
    
* Enter the correct primary and secondary administrator emails
    
* Select a default time zone for new users
    
* Select new user feature release schedule
    
* Select communication preferences for your domain
    
* Add your company's logo
    
* Add users individually and bulk uploading with a CSV file
    
* Log in as an added user to verify the customization
    

### Prerequisites

To get the most from this lab, familiarity with basic Google Workspace terminology is recommended.

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
    

## Task 1. Configure your organization's profile

In this section, you customize the "Google Workspace Labs" organization profile page. Feel free to change the data or the name of the organization.

### Customize your profile

1. From the **Main menu** (), click **Account** &gt; **Account settings**.
    
2. Click the **Profile** card.
    
3. To update a profile field, hover over the field, click the pencil that displays on the right, and then click **Save**.
    
4. Change the organization **Name** to your organization's name. It can be a fictitious name.
    
5. The **Contact info** section is where you provide the primary and secondary email addresses of your organization's admin contacts. Leave the default emails.
    
6. In the **Support message** section, enter a message users will see if they can't sign in to their Google Workspace account. This message usually identifies who to contact or instructions if they forget their password, for example "Contact Magda Smith for any Sign In issues." Click **Save**.
    
7. Specify the **Language** users see for your Google services when they first sign into their managed Google account.
    
8. In the **Time zone** section, choose the default time zone that applies to your organization. Click **Save**.
    
9. Collapse the **Profile** card by clicking the up-arrow at the top right of the card.
    

### Customize preferences

1. Click the **Preferences** card.
    
2. In **New features**, leave **Scheduled release** selected. As an administrator, you can briefly delay when new features in Google Workspace are released to your users. You then have time to try out the features first and train users on the changes. By selecting **Scheduled release**, new feature deployment is delayed.
    

* Learn more about Schedule releases from the [Choose when users get new features page](https://support.google.com/a/answer/172177/).
    

3. In **New products** select **Turned off when released**, which means that you or another administrator must manually add new products before users can access them.
    
4. Click **Save**.
    
5. Scroll down and click on **Communication preferences**.
    
6. Select all of the options and then click **Save** to save all changes.
    
7. Collapse the **Preferences** card by clicking the up-arrow at the top right of the card.
    

### Add your organization's logo

1. Click the **Personalization** card.
    
2. Select **Custom Logo**, click **Select file to upload**, and then **Upload** to upload your organization's logo. Click **Save** to save your settings.
    

If you need a logo to upload, right-click or Ctrl-click on the logo below to save it to your desktop.

![Example of a power button logo](https://cdn.qwiklabs.com/4xmXQlVDR7ivaxOy%2BgeIuAtxl20EclhgdDS8b0hlvnI%3D align="left")

3. Collapse the **Personalization** card.
    

Click *Check my progress* to verify the objective.

Configure your organization's profile

## Task 2. Add users individually

1. From the **Main menu** (), click **Directory** &gt; **Users**.
    
2. Click **Add new user**.
    
3. Type in a **First** and **Last name**, and leave the default **Primary email**.
    
4. Click **Manage user's password, organizational unit, and profile photo**.
    
5. Scroll down to see **Automatically generate a password** enabled by default.
    
6. Click **Add New User**.
    
7. On the resulting panel, click the eye to show the password. Click **Copy password** to copy the password value.
    
8. Save the email and password for this user to test new user access at the end of this lab.
    

To send Sign-in instructions to the new user:

9. Click **Preview and Send**. The **Send sign in instructions** dialog opens.
    
10. Enter the new user's email address. Click **Send**. Clicking Email instructions or Print instructions can be used to deliver the account information to the new user — you can change the address to which this new user information is sent.
    
11. Click **Done**. You may have to refresh the browser tab to see the new user in the user list.
    

(Optional) To set other user settings, such as adding the new user to groups or suspending the user, click the user's name in the list.

Learn more about addition instruction from the [Update user profiles or photos page](https://support.google.com/a/topic/14588) for additional instructions.

## Task 3. Batch add users from a CSV spreadsheet

1. Return to the Users page.
    
2. Click **Bulk update users**.
    
3. Click **Download blank CSV template**. This provides a blank CSV file to populate with a set of multiple users. Do not close this dialog box.
    
4. Open the CSV file in a spreadsheet application like Google Sheets or Microsoft Excel.
    
5. Add two or more new users. The following information is required:
    

* First Name
    
* Last Name
    
* Email Address - for this lab you must use the same domain (@xxx.com) as the **User Email** for this lab.
    
    For example, if the **User Email** you used to start the lab is `student@goog-test.reseller.gappslabs.co.s-4aknhohx.qwiklabs-gsuite.net`, the email for one of the users on the spreadsheet will be `username@goog-test.reseller.gappslabs.co.s-4aknhohx.qwiklabs-gsuite.net`.
    
* Password - must meet [format guidelines](https://support.google.com/a/answer/40057?hl=en#columnref), the default requirement is 8 characters. For example, "12345678".
    
* Org Unit Path - for this lab use a backslash (/).
    

6. (Optional) Fill in the other columns.
    

**Note:** To add multiple phone numbers or addresses for a user, add columns to the spreadsheet. Rename the header accordingly. For example, to add a second home address, create a new column with the header Home Address 2.

7. Save the updated file as a CSV file on your computer.
    
8. Select the CSV file to upload:
    

* Click **Attach CSV file**.
    
* Select the CSV file and click **Open**.
    

9. Click **Upload** to import the user list. You can view progress by clicking the Tasks icon on the top right of the Users page. If there's an error, update the information as needed in your spreadsheet and upload the file again.
    

Learn more about errors from the [Add or update multiple users from a CSV file page](https://support.google.com/a/answer/40057?hl=en#common_errors).

10. After a moment, refresh your browser to reload the user list. The new users should appear.
    

Click *Check my progress* to verify the objective.

Batch add users from a CSV spreadsheet

## Task 4. Verify customization

### Log in to Gmail to verify customization

In this section, you open the Google Workspace application, Gmail, to verify that you can log and view the customized Workspace app as a new user.

1. Open [Gmail](http://www.gmail.com/).
    
2. In the top right, click the Account Owner icon, and click **Add another account**.
    
3. Log in using the username and password you saved earlier.
    
4. Click **Accept** to accept the Google Terms of Service and Google Privacy Policy.
    
5. You will be presented with a **Change Password** dialog.
    
6. Change the user's password. If you try to use a password that is not secure enough, you will be asked to change it. Use a password such as "Testuser1" with a capital letter and a number.
    

When your password is accepted, you are logged in and can see your custom Google Workspace app as a new user.

Click *Check my progress* to verify the objective.

Verify customization

---

## Solution of Lab

%[https://youtu.be/y6Bt3vLuBNk] 

Open: [https://admin.google.com/ac/accountsettings/profile?hl=en](https://admin.google.com/ac/accountsettings/profile?hl=en)