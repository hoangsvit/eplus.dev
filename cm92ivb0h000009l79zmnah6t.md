---
title: "Managing Google Classroom - GSP981"
seoTitle: "Managing Google Classroom - GSP981"
seoDescription: "Classroom is an easy-to-use and secure app that helps educators manage, measure, and enrich learning. In this lab, you, as the administrator, use the Google"
datePublished: Fri Apr 04 2025 08:27:57 GMT+0000 (Coordinated Universal Time)
cuid: cm92ivb0h000009l79zmnah6t
slug: managing-google-classroom-gsp981
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743754235188/7e34eaaa-d00a-40ab-b275-0315616fa0fe.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1743755264402/cdd0e920-ee8e-4b8f-846d-44514ae562d7.png
tags: managing-google-classroom-gsp981, managing-google-classroom, gsp981

---

## Overview

Classroom is an easy-to-use and secure app that helps educators manage, measure, and enrich learning. In this lab, you, as the administrator, use the Google Admin Console to configure basic access to get teachers and students started with Classroom.

### What you'll do

* Assign users and control access
    
* Set permissions
    
* Give users access to Classroom services such as Google Meet and Gmail
    
* Manage guardian settings
    

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
    

This lab provides a temporary Google Workspace Enterprise account. There are a number of differences between the Enterprise and Education versions of Workspace, so the options in the this Admin console may slightly differ from the Education version. For example, the Education version allows services to be restricted based on age. This feature is not available in this lab's version if the admin console. For more information, [see what's in the Google Workspace for Education editions](https://edu.google.com/intl/ALL_us/products/workspace-for-education/editions/).

## Classroom

Classroom is included in [Google Workspace for Education](https://edu.google.com/products/workspace-for-education/) and works with Google Workspace collaboration tools to jumpstart learning and empower teachers.

As an Admin, you configure and manage who and how teachers and students access Classroom. When setting up this lab, you created a Teachers OU for users who are teachers, and a Students OU for users who are students. You then added one or more users to each OU. In the next sections you'll use the Admin console to first make Classroom available to all, and then to customize access for each OU.

**Note:** Users grouped in an OU have the same configuration as the OU.

### Add Workspace users

You've opened the Admin console and verified your domain. In this section you add users to be a teacher and a student.

To add users to your Workspace for Education domain:

1. In the Google Admin console, find the **Users** card and click **Add a user**. The **Add new user** dialog opens.
    
2. Type a "Maria" for **First name** and "Kearns" for the **Last name** and leave all other fields at their default.
    
3. Click **Add New User**. The **New user added** confirmation opens and provides the username and password. Save these to use later in the lab.
    
4. Click **Add Another User** at the bottom left.
    
5. Type "Alex" for **First name** and "Miller" for the **Last name**, and the other fields at their default.
    
6. Click **Add New User.** The **New user added** confirmation opens and provides the username and password. Save these to log in as a student later in this lab.
    
7. Click **Done**. View the users you just added in the Users list. You may have to refresh the page to view the new users.
    
8. (Optional) Repeat these steps to add a couple more users to this domain.
    

## Task 1. Assign users and control access

In this lab you enable access to Classroom by organizational unit (OU) to ensure students and teachers can access the tools they need. In this section, you create an OU for the teacher and students of the History class, name the OU **History**, and then add users to the OU.

To create the History OU:

1. In the **Main menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), click **Directory** &gt; **Organizational units**. The **Organizational units** window opens and shows one organization unit: Google Workspace Labs.
    
2. Click **Create organizational unit** to create a new OU.
    
3. In the **Create organizational unit** dialog:
    

* Name the organizational unit **History**.
    
* (Optional) Enter a description.
    
* Click **Create**.
    

The new OU named History is now listed under the Google Workspace Labs unit.

Add users to the History OU:

1. In the left pane, click **Directory** &gt; **Users**.
    
2. Select **Maria Kearns**, **Alex Miller**, and any other users you just added. Do not select Workspace User.
    
3. From the top menu, click **More options** &gt; **Change organizational unit**. The **Change organizational unit** dialog opens.
    
4. Click the **History** OU and click **Continue**. The **User move confirmation** dialog opens.
    
5. Click **Change** to confirm the change.
    

Click *Check my progress* to verify the objective.

Assign users and control access

**Check my progress**

## Task 2. Verify teachers

When users sign in to Classroom for the first time, they identify as teachers or students. Once teachers sign in, they are automatically added to the Teachers group for Admin approval.

Admins must verify users who are identified as a teacher to give them educator access to Classroom so they can set up classes, create assignments and communicate with guardians.

Before you verify a teacher, you must ensure that Groups for Business is enabled for everyone.

1. In the **Main menu** , click the **Apps** icon (
    
    ![Apps icon](https://cdn.qwiklabs.com/%2FZ0Oli8WLkuilE1jv%2FUbS0EaycqycN8IPo4eTDuSb%2Fw%3D align="left")
    
    ) &gt; **Google Workspace** &gt; **Groups for Business**.
    
2. Check to be sure **Service status** is **ON for everyone**. If not, click the **Service status** card. The **Service Status** page opens.
    
3. Select **On for everyone** and click **Save**.
    

To verify a teacher:

1. Open the [Classroom Teachers group](https://classroom.google.com/teacher-group). This brings you to the **Pending members** page. There are no pending members because no teacher has yet signed into Classroom.
    
2. If there was a member pending verification, you would click **Approve applicant** or **Reject applicant**.
    

## Task 3. Set permissions

Teacher permissions allow educators to create and manage classes. Manage role permissions for your school's domain so that only verified teachers can create and manage classes in Classroom.

1. From the Admin console, click **Apps** (
    
    ![Apps icon](https://cdn.qwiklabs.com/%2FZ0Oli8WLkuilE1jv%2FUbS0EaycqycN8IPo4eTDuSb%2Fw%3D align="left")
    
    ) &gt; **Additional Google services**.
    
2. In the **Additional Google services** panel on the left, click **History** to indicate the permissions you set apply to the History OU.
    
3. In the Services list, click **Classroom**. The **Settings for Classroom** page opens.
    
4. Click the **General settings** card to expand the card.
    
5. Click in the **Teacher permissions** section. The **Teacher permissions** dialog opens.
    
6. Select **Verified teachers only**, and click **Save**.
    

Click *Check my progress* to verify the objective.

Set permissions for Teachers to create and manage classes

**Check my progress**

## Task 4. Enable Google Meet

Set up Meet to be accessible directly within Classroom to allow teachers to host secure video meetings. Teachers can customize student access from Classroom.

**Note:** The number of users supported for Video conferencing depends on the editions. Google Workspace for Education Fundamentals supports video conferencing for up to 100 users, both Teaching and Learning Upgrade and Education Plus editions support up to 250 users.

In this Section you verify that Meet is enabled and only users in this domain can join meetings or classes.

1. Click **Apps** (
    
    ![Apps icon](https://cdn.qwiklabs.com/%2FZ0Oli8WLkuilE1jv%2FUbS0EaycqycN8IPo4eTDuSb%2Fw%3D align="left")
    
    ) &gt; **Google Workplace** &gt; **Google Meet**. The **Settings for Google Meet** page opens.
    
2. Notice the **Service status** settings is **ON for everyone** by default. If not, click the **Service status** card. The **Service Status** page opens.
    
3. Select **On for everyone** and click **Save**.
    
4. Click the up-arrow (
    
    ![up arrow](https://cdn.qwiklabs.com/0TQbwPUe1rvbaNRckSYw2QSSG7%2BDUH2J8vbdHlMY%2FKE%3D align="left")
    
    ) in the top right of the card to collapse the card.
    
5. Click the **Meet safety settings** card to expand the **Meet safety settings** dialog.
    
6. Click in the **Domain** section to expand the options, and select **Only users from your organization or users dialing in using a phone**.
    
7. Click **Save**.
    

Click *Check my progress* to verify the objective.

Set up Google Meet to allow teachers to host more secure video meetings

**Check my progress**

## Task 5. Manage guardian settings

Allow guardians to track their student's progress through automated email summaries and give teachers permission to invite or remove guardians. When email summaries are enabled, guardians are linked to their student and can receive updates about student performance, new assignments, approaching deadlines, and missing work.

1. From the **Main menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ), click **Apps** (
    
    ![Apps icon](https://cdn.qwiklabs.com/%2FZ0Oli8WLkuilE1jv%2FUbS0EaycqycN8IPo4eTDuSb%2Fw%3D align="left")
    
    ) &gt; **Additional Google services**. The **Additional Google services** page opens.
    

**Note:** This lab uses Google Workspace Enterprise. In Google Workspace for Education, you find Classroom in **Apps** &gt; **Google Workspace** listed alongside all core services.

2. In the Services list, click **Classroom**. The **Settings for Classroom** page opens.
    
3. Click the **General settings** card, and then click the **Guardian access** section to expand the options.
    
4. Check **Allow parents and guardians to access Classroom information**, and then click **Save**.
    

**Note:** Guardians who sign up for email summaries can't see the Stream, Classwork, People, or Grades pages in Classroom.

Click *Check my progress* to verify the objective.

Enable guardian settings to allow guardians to track their student's progress

**Check my progress**

## Task 6. Check it out!

As an admin, you've configured access to Classroom. Use the user credential you recorded earlier in this lab to view teacher and student access.

### The student view

To see what a student would see in this configuration, sign in and explore. You'll need the usernames and passwords you saved earlier.

To sign in:

1. In the top right, click **Apps** (
    
    ![Apps icon](https://cdn.qwiklabs.com/%2FZ0Oli8WLkuilE1jv%2FUbS0EaycqycN8IPo4eTDuSb%2Fw%3D align="left")
    
    ) &gt; **Classroom**.
    
2. In the sign in dialog, click the down arrow next to the Workspace User. The **Choose an account** dialog opens.
    
3. Click **Use another account**, and then use Alex Miller's email address and password that you saved earlier in this lab.
    
4. Accept any terms and then Change your password.
    
5. Click **I'm a student**. Classroom opens.
    

Notice you accessed Classroom, but there's not a lot to do here for a student until a teacher creates a class.

### The teacher view

To see what a teacher would see with this configuration, sign in as a teacher and explore.

1. In the top right, click **Apps** (
    
    ![Apps icon](https://cdn.qwiklabs.com/%2FZ0Oli8WLkuilE1jv%2FUbS0EaycqycN8IPo4eTDuSb%2Fw%3D align="left")
    
    ) &gt; **Classroom**.
    
2. In the sign in dialog, click the down arrow next to the Workspace User. The **Choose an account** dialog opens.
    
3. Click **Use another account**, and then use Maria Kearns' email address and password that you saved earlier in this lab.
    
4. Accept any terms and then Change your password.
    
5. Click **I'm a teacher**. Classroom opens.
    

Notice the view looks a lot like the student view because you're not yet verified by the administrator.

6. As admin, go to the [Pending join requests](https://classroom.google.com/teacher-group), and click the **check** inline with Maria Kearns to verify Maria Kearns.
    
7. Refresh the Classroom that Maria Kearns signed in to. Notice as a verified teacher, you can now create a class. Take some time to explore this view.
    

## Task 7. Test your learning

**Who configures Classroom?**

* Only the admin can turn Classroom on or off for domain users, and configure by whom and how Classroom is used.
    
* The admin turns the Classroom on or off for domain users, but both the admin and teachers can further customize by whom and how Classroom is used.
    
* The admin turns the app on or off for domain users, but the admin, teachers, and students can further customize by whom and how Classroom is used.
    
* The admin turns Classroom on or off for OUs, teachers turn Classroom on or off for groups.
    

**What determines if you are a student or teacher in Classroom?**

* When you first launch Classroom, you select to join as a teacher or student.
    
* The domain that you belong to determines if you are a student or teacher.
    
* The admin assigns who is the teacher or student in Classroom.
    
* You are assigned the role of teacher when you create a class in Classroom.
    

**True or false: Guardians have the same view of a class as their student.**

* True
    
* False
    

**What is true about Google Meet (Select all that apply)**

* After the admin enables Google Meet, you have to launch Classroom to use Meet.
    
* Google Meet is integrated into Classroom.
    
* The admin configures if users of other domains can join a meeting.
    
* Once a class starts, only teachers can restrict Google Meet access.
    

---

## Solution of Lab

%[https://youtu.be/ii2JeWHywb4]