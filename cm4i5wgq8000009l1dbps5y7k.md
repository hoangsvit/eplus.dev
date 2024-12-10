---
title: "Google Workspace for Education: Getting Started - GSP978"
seoTitle: "Google Workspace for Education: Getting Started - GSP978"
seoDescription: "Google Workspace for Education is a set of Google apps and services that are tailored for schools and homeschools that allow for collaboration, streamlined "
datePublished: Tue Dec 10 2024 07:50:43 GMT+0000 (Coordinated Universal Time)
cuid: cm4i5wgq8000009l1dbps5y7k
slug: google-workspace-for-education-getting-started-gsp978
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733815933157/0fa25f28-0ba2-4c22-9340-a011719d9569.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1733817016854/009367cc-4e69-4269-b497-c77eb513c736.png
tags: google-workspace-for-education-getting-started-gsp978, gsp978

---

## **Overview**

[Google Workspace for Education](https://edu.google.com/products/workspace-for-education/) is a set of Google apps and services that are tailored for schools and homeschools that allow for collaboration, streamlined instruction and safe online learning. Google Workspace for Education offers multiple editions to meet your organization’s needs.

In this lab, you’ll learn how to create an organizational structure, how to set up organizational units and groups, and then set up user accounts.

### What you'll do

* Create/add users and devices within the Workspace account
    
* Create organizational units (OU)
    
* Create groups
    
* Set up password recovery
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### Start your lab

When you are ready, click **Start Lab** in the upper left.

### Sign in to the Google Workspace Admin Console

To access the Google Workspace Admin Console, you must find your credentials and then sign in.

#### **Find your lab's User Email and Password**

To access the resources and console for this lab, locate the **User Email** and **Password** in the Lab Details panel. This panel is on the left or at the top, depending on the width of the browser window. Use these credentials to log in to the Google Workspace Admin Console.

If your lab requires other resource identifiers or connection-related information, they appear on this panel as well.

#### **Sign in to the Admin Console**

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
    

This lab provides a temporary Google Workspace Enterprise account. There are a number of differences between the Enterprise and Education versions of Workspace, so the options in the this Admin console may slightly differ from the Education version. For example, the Education version allows services to be restricted based on age. This feature is not available in this lab's version of the admin console. For more information explore the [Google Workspace for Education page](https://edu.google.com/intl/ALL_us/products/workspace-for-education/editions/).

## **Google Workspace for Education**

Google Workspace for Education provides a suite of cloud-based tools to K–12 and higher-education institutions and U.S. homeschools. These tools allow for productivity and collaboration specific to the education process. Although the Workspace for Education editions vary by capability, every edition includes the same apps.

![List of workspace apps displayed](https://cdn.qwiklabs.com/SEvO5wMEpFAS%2F0Yya2oeDeMYHrAzUBJiQJiylsfxctc%3D align="left")

### Service categories

Google Workspace for Education offers two categories of Google services:

* Google Workspace Core Services (like Gmail, Calendar, and Classroom) are the heart of Google's educational offering to schools. For more information review the [Services Summary page](https://www.google.com/apps/intl/en/terms/user_features.html).
    
* Additional Services (like YouTube, Maps, and Blogger) are designed for consumer users and can optionally be used with Google Workspace for Education accounts if allowed for educational purposes by a school’s domain administrator. For more information review the [Turn on or off additional Google services page](https://support.google.com/a/answer/181865) for more information.
    

**Note:** Available services depend on the edition of Google Workspace for Education. For more information review the [Google Workspace for Education page](https://edu.google.com/intl/ALL_us/products/workspace-for-education/editions/).

Google Workspace for Education administrators determine which Google services their users can access.

**Note:** Administrators are required to provide or obtain [consent](https://support.google.com/a/answer/6356509) for the use of the services by their minor users. When a school obtains appropriate consent, additional services that allow it, such as YouTube, Maps, and Blogger, can be used without age restrictions by Google Workspace for Education users.

## **Organizational structures**

An organizational unit (OU) is a grouping within a Workspace domain used to apply settings to a specific set of users or devices. An organizational structure defines how you set up OUs.

A well-designed structure is critical to effectively and flexibly manage your Google Workspace for Education account. The structure you choose depends on the size of your deployment and organizational needs. Best practices allow for structures based on roles or organization.

### Role-oriented structure

In a role-oriented structure, first-level OUs are organized by role, such as students and teachers. This structure works well if you need to define policies and settings independently of a district or school, and if simple maintenance is a priority.

![Role-oriented structure with Students, Teachers, Staff and Guest Roles as first level OU](https://cdn.qwiklabs.com/1A%2F3FTpxTTOOyPYlSqFUL0a90Ha6QjuyscxIKsmlxv0%3D align="left")

### Organization-oriented structure

Organization-oriented structure: An organization-oriented structure works well when organization and control is a priority. The first-level OUs are organized by region, district, or school, with policies and settings defined by this structure. Although you have more control, you need an administrator for each first-level OU.

![Organization oriented structure with Region/District as first level OU](https://cdn.qwiklabs.com/3OkvlHqvf9xgsoHrkqOyaZp8qoL5Fy8wpOSb4tQhi4Y%3D align="left")

## **Organizational units**

Organizational units (OUs) are created by an administrator in the Google Admin console to apply settings to a specific set of users or devices. Child OUs inherit the settings from the parent, but can be changed to fit the needs of the child OU.

**Note:** Recommendation

Create separate OUs for users and devices. That way, you can tailor settings for managed devices and managed users as needed.

**Note:** You can’t move yourself as the administrator to another OU.

## **Task 1. Create OUs**

Below the top-level unit you can add as many OUs as you want, either at the same level or in a hierarchy. When you change a setting at a higher level, settings for all child OUs that inherit that setting also change. Custom settings, however, remain unchanged.

In this section, you create a small role-oriented structure with the top-level OU, and 2 child OUs called Teachers and Students.

1. In the Google Admin **Home** page, on the left panel, click **Directory**
    
    ![directory icon](https://cdn.qwiklabs.com/qL01xZ0uK32Oaae%2FqUoI%2FXrhIKTmaEDA65n54gdTl2M%3D align="left")
    
    \&gt; **Organizational units**. The **Organizational units** window opens and shows one organization unit: the Google Workspace Labs.
    
2. Hover over the Google Workspace Labs OU, and then click the plus sign to the right to create a new OU. Alternatively, click the plus sign in the yellow circle to create a new OU.
    
3. Create the OU:
    

* Name the organizational unit *Teachers*.
    
* Enter a description.
    
* Click **Create**.
    

The new organizational unit Teachers is now listed under the Google Workspace Labs OU.

4. Repeat steps 2 and 3 to create an OU named *Students*.
    

### Now create an OU at another level: in the Teachers OU, create a History Teachers OU.

1. In the organizational unit list, hover over the Teachers OU, and then click the in-line plus sign to the right.
    

The **Create new organizational unit** dialog opens.

2. Name the OU *History* and click **Create**. The new OU, History, is under the Teachers OU.
    

Wait! The History OU should be in the Students OU! Move the History OU.

3. In the organizational unit list, hover over the History OU, and then click the arrow icon in-line to the right. The **Move organizational unit** dialog opens.
    
4. Click **Students** and then **Continue** to indicate where to move the History OU. The **Move organizational unit** confirmation dialog opens.
    
5. Click **Move** to confirm the move. The History OU is now under the Students OU.
    

Click *Check my progress* to verify the objective.

Create organizational units

Check my progress

## **Task 2. Add users**

By default, users are added to the top-level OU. All settings you apply to the top-level OU also apply to all users in that OU.

But not all users should have the same settings. Manage users by creating OUs for each set of settings (i.e. the Teachers and Student OUs you just made), customizing the inherited settings, and then give the users the appropriate settings by adding them to the appropriate OUs.

**Note:** A user or device belongs to only one OU and inherits that OU's settings.

You can manually add users individually, or batch add users from a CSV file.

### Add users individually

To add an individual user:

1. Click **Main menu**
    
    ![menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    , click **Directory** &gt; **Users**.
    
2. Click **Add new user**.
    
3. Type a **First** and **Last name**.
    
4. Leave the first name as the email prefix. Record the domain to use when you bulk upload users. The domain is similar to `goog-test.reseller.gappslabs.co.s-qhbixel2.qwiklabs-gsuite.net`.
    
5. Click **Manage user’s password, organizational unit, and profile photo** to view the additional options.
    
6. (Optional) Click Upload **Profile Photo** and choose a picture from your local computer to upload.
    
7. In the **Password** select **Automatically generate a strong password with 16 characters**.
    
8. Click **Add New User**.
    

The New user added dialog opens to confirm you added your user and provides details.

9. Click the eye after the password to show the password.
    
10. **Record the email and password**, you will test new user access later.
    

**Note:** Click **Preview and Send** to deliver the account information to the new user — you can change the address to which this new user information is sent.

11. Click **Done**.
    

Notice the new user in the user list.

12. Click on the new user to see they are in the top-level OU (Google Workspace Labs).
    

You want the new user you just added in the Teachers OU, not the top-level OU. To move the user to the Teachers OU:

13. In the users list (**Main menu** , click **Directory** &gt; **Users**), click the new user to open the user detail page.
    
14. In the right pane, click the **More options** &gt; **Change organizational unit**. The Change organizational unit dialog opens.
    
15. Click **Teachers** to indicate where to move the user, and then click **Continue**. The **User move confirmation** dialog opens.
    
16. Click **Change** to confirm the move.
    

### Batch add users from a CSV spreadsheet

In real life, you'll be adding several users at a time. The easiest way to add several users at once is to batch add users using CSV uploads.

To batch add users using a CSV upload:

1. Return to the **Users** page.
    
2. Click **Bulk update users**.
    
3. Click **Download blank CSV template**. This gives you a blank CSV file to populate with multiple users. Do not close this dialog box.
    
4. Open the CSV file in a spreadsheet application like Google Sheets or Microsoft Excel.
    
5. Add one or two new users. The following information is required:
    

| **Field** | **Value** |
| --- | --- |
| First Name | Enter the first name of the user. |
| Last Name | Enter the last name of the user. |
| Email Address | For this lab, use the user's first name as the username and your current workspace domain that you recorded when you added an individual user. An example domain is similar to `goog-test.reseller.gappslabs.co.s-qhbixel2.qwiklabs-gsuite.net`. |
| Password | Enter a password that meets format guidelines, the default requirement is 8 characters. For example, "12345678". Be sure to use the `Password [Required]` column, not the `Password Hash Function` column. |
| Org Unit Path | Enter forward slash (/) to place users in the top-level OU. Optionally put the user in an OU under the top-level OU, for example /Teachers. |

*Sample spreadsheet with required fields (click on the image to enlarge):*

![Sample of a spreadsheet with list of users and the field required for a batch add users](https://cdn.qwiklabs.com/WjIzqKE38gfsbBDU5dDb%2FajBFivH6eCzBsUdxJ3gOm8%3D align="left")

**Note:** This lab allows you to add a total of 10 users.

6. (Optional) Fill in the other columns.
    

**Note:** To add multiple phone numbers or addresses for a user, add columns to the spreadsheet. Rename the header accordingly. For example, to add a second home address, create a new column with the header Home Address 2.

7. Save the updated file as a CSV file type.
    
8. Upload the CSV file - click **Attach CSV**, navigate to the CSV file you just created, and then click **Open**. Workspace imports the CSV user list.
    
9. To view the progress, click the **Tasks** icon at the top right of the Users page. If there's an error, enter the missing information in your spreadsheet and upload the file again. For more information review the [Add or update multiple users from a CSV file](https://support.google.com/a/answer/40057) page.
    
10. After a moment, refresh your browser to reload the user list. Your new users should appear.
    

Click *Check my progress* to verify the objective.

Add users

Check my progress

## **Task 3. Password recovery**

When you add users, you also set user passwords. But users forget their passwords. For Higher Education accounts, you can set password controls so users can reset their passwords.

**Note:** Password recovery only works for Higher Education Google Workspace for Education domains. If your [school type](https://support.google.com/a/answer/7332340) is set to Primary/Secondary Education, password recovery will not work. Younger Google Workspace for Education users aren’t permitted to add a recovery phone number or email to their account, so they can't reset a forgotten password on their own.

As your organization's super administrator, you can set how users and non-super administrators recover their account if they forget their password:

* Option 1: Ask users to contact an administrator to reset their password.
    
* Option 2: Let users reset their passwords through an automated system (you need to turn on non-admin password recovery in your Admin console).
    

### Option 1: Ask users to contact an administrator

By default, a user who forgets their password must contact an administrator. When the user clicks **Forgot password?** on the **Sign-in** page they’ll see a message to contact their administrator.

Be sure you've provided and described a way for users to contact an administrator for a password reset.

### Option 2: Let users reset passwords themselves

**Note:** This feature isn’t available if your organization uses single sign-on (SSO) or Workspace Password Sync. It also doesn’t work for users under the age of 18.

You can let users who aren't super admins reset their own passwords without contacting an administrator. Users must add a recovery phone number or email address to their account where they can receive recovery instructions by voice, text message, or email. They can then reset their password by entering their Google Account address and following automated instructions.

### Turn on password recovery

By default, only super admins can reset a forgotten password using the automated system. Here's how to let users and non-super admins do this:

If users in your organization click **Forgot password?** on the sign-in page, they get instructions to recover their password.

A user must have added a recovery phone number or email address to their account to be able to reset their password. Users with 2-Step Verification can reset their password only with their recovery email address. Users who haven't added recovery information are directed to contact an administrator.

1. From the Main menu, click **Security**
    
    ![security icon](https://cdn.qwiklabs.com/iIonwE%2BnrrpfmFRPQ%2BC%2B3GdeSbj4uo49uK6cLgtW5Ac%3D align="left")
    
    \&gt; **Overview**. You may need to click **Show more** to see the **Security** option.
    
2. Click the **Account Recovery** card.
    
3. To apply the setting to everyone, leave the top OU (Google Workspace Labs) selected. Otherwise, select a child OU or a configuration group.
    
4. Click **User account recovery**.
    
5. Check **Allow users and non-super admins to recover their account**.
    
6. Click **Save**.
    
7. Tell users to set up a recovery phone number or email address where they can receive password recovery instructions.
    

### Remove recovery information

If you turn on non-admin password recovery, immediately remove a user's recovery information if:

* The user is terminated or leaves your organization. That way they can’t recover their password to access their old account.
    
* You suspect the account has been hijacked and the user’s recovery information is no longer legitimate.
    

To remove a user’s recovery information or check if it’s been hacked:

1. Sign in to the account as the user
    
2. View or remove the recovery phone number or email address.
    

Click *Check my progress* to verify the objective.

Turn on password recovery

Check my progress

## **Task 4. Check it out (optional)**

### As the admin

* Review organizational structure and then add or remove OUs. What happens to users in an OU when you delete the OU?
    

### As a user

Now you will need the usernames and passwords you saved earlier.

* Sign in as the user you previously added using the recorded email and password. Explore password options. What happens if you forget your password?
    

## **Task 5. Test your learning**

**True or False: By default, Google Workspace spins up three types of OUs when you first launch: one for admins, one for users, and one for devices.**

* True
    
* False
    

**When adding users, how are they assigned to an OU?:**

* When added, Google Workspace assigns users to a OU based on rules set by the adminWhen added, app settings assign users to one or more OUs.
    
* You assign users to an OU when you add them.
    

**When you use OUs to set policies:**

* You customize the policies the child OU inherited from the parent OU so that the child OU has the appropriate policies.
    
* All users in an OU are in the same group.
    
* All child OUs have the same policies as the parent OU.
    
* All users in a child OU has the same permissions as the parent OU.
    

Submit

---

## Solution of Lab

%[https://www.youtube.com/watch?v=QXBLuJVIdz0&ab_channel=Techcps] 

**Download file**: [<mark>techcps978.csv</mark>](https://github.com/Techcps/GSP-Short-Trick/blob/main/techcps978.csv)