---
title: "Google Workspace for Education: Managing Services - GSP979"
seoTitle: "Google Workspace for Education: Managing Services - GSP979"
seoDescription: "Google Workspace for Education is a set of Google apps and services that are tailored for schools and homeschools to collaborate, streamline instruction, an"
datePublished: Tue Dec 10 2024 04:45:56 GMT+0000 (Coordinated Universal Time)
cuid: cm4hzau43001709jp4wur34uh
slug: google-workspace-for-education-managing-services-gsp979
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733805893639/50c47d94-5ab4-46db-9e07-524b322d6967.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1733805911134/84d35149-46a4-4ae3-a120-4ef194316672.png
tags: google-workspace-for-education-managing-services-gsp979, gsp979

---

## **Overview**

[Google Workspace for Education](https://edu.google.com/products/workspace-for-education/) is a set of Google apps and services that are tailored for schools and homeschools to collaborate, streamline instruction, and keep learning safe.

In this lab, you will learn how to turn services on or off for users and learn a basic setup scenario that gets you started as quickly as possible.

### What you'll do

* Group users by an organizational unit (OU) and a group
    
* Turn services on or off by an OU and a group
    
* Restrict file sharing
    
* Restrict third party API access
    
* Block installation of Google Workspace Marketplace apps
    

## **Google Workspace for Education services**

Google Workspace for Education provides access to many services and applications. These include core services like Gmail and Drive, additional services like YouTube, and apps you purchase from the Google Workspace Marketplace.

### Google service categories

Google Workspace for Education offers two categories of Google services:

* Google Workspace Core Services (for example Gmail, Calendar, and Classroom) are the heart of Google's educational offering to schools. See [Services Summary](https://www.google.com/apps/intl/en/terms/user_features.html) for more information.
    
* Additional Services (for example YouTube, Maps, and Blogger) are designed for consumer users and can optionally be used with Google Workspace for Education accounts if allowed for educational purposes by a school’s domain administrator. See [Additional Google services](https://support.google.com/a/answer/181865) for more information.
    

**Note:** Available services depend on the edition of Google Workspace for Education. See [Compare Education editions](https://edu.google.com/intl/ALL_us/products/workspace-for-education/editions/) for more information.

Google Workspace for Education administrators determine which Google services their users can access.

**Note:** Administrators are required to provide or obtain [consent](https://support.google.com/a/answer/6356509) for the use of the services by their minor users. When a school obtains appropriate consent, additional services that allow it, such as YouTube, Maps, and Blogger, can be used without age restrictions by Google Workspace for Education users.

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
    

This lab provides a temporary Google Workspace Enterprise account. There are a number of differences between the Enterprise and Education versions of Workspace, so the options in the Admin console may slightly differ from the Education version. For example, an Education version allows services to be restricted based on age. This feature is not available in this lab's version of the admin console.

## **Task 1. Add Google Workspace users**

You've opened the Admin console and verified your domain. In this section you add users to your domain.

To add users to your Google Workspace for Education domain:

1. In the Google Admin console, find the **Users** card and click **Add a user**. The **Add new user** dialog opens.
    
2. Type "Alex" for **First name** and "Moore" for the **Last name**. Leave all other fields at their default values.
    
3. Click **Add New User**. The **New user added** confirmation opens and provides the username and password. Record these to log in as a teacher later in the lab.
    
4. Click **Add Another User** at the bottom left.
    
5. Type "Emma" for **First name** and "Hall" for the **Last name**. Leave all other fields at their default values.
    
6. Click **Add New User**. The **New user added** confirmation opens and provides the username and password. Save these to log in as a student later in this lab.
    
7. In the same way, add one more user, and save the username and password to log in as a student later in this lab. For practice you can add more users, no need to record the username and password for these users.
    
8. Click **Done**.
    
9. View the users you just added in the Users list. You may have to refresh the page to view the new users.
    

Add Google Workspace users

Check my progress

## **Task 2. Turn a service on or off for Google Workspace users**

As an administrator, you control who uses Google services by turning services on or off for users in the Google Admin console. When users sign in to their account, they have only the services you turned on for them. Since it would take too long to assign access by user, you instead assign access by OU or group.

### Control access to services with OUs

The easiest way to control access to services is by turning services on or off for OUs. Users within the OU inherit the OU access by default. For example, you want only teachers to use Gmail. Set this up by creating one OU for teachers and another for everyone else. Then, leave Gmail turned on for the teacher OU and turn it off for the other OU (everyone else).

In this section, you create an OU, for which you will later configure services.

To create the Teachers OU:

1. From the **Main menu**
    
    ![Main menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    , click **Directory** &gt; **Organizational units**. The **Organizational units** window opens and shows one OU: Google Workspace Labs.
    
2. Click **Create organizational unit**.
    
3. In the **Create organizational unit** dialog:
    

* Name the OU `Teachers`.
    
* (Optional) Enter a description.
    

4. Click **Create**.
    

The new OU named Teachers is now listed under the Google Workspace Labs unit.

Add users to the Teachers OU:

1. In the left pane, click **Directory** &gt; **Users**.
    
2. Select **Alex Moore**.
    
3. From the top menu, click **More options** &gt; **Change organizational unit**. The **Change organizational unit** dialog opens.
    
4. Click the Teachers OU and click **Continue**. The User move confirmation dialog opens.
    
5. Click **Change** to confirm the change.
    

You created a Teachers OU and added a member. In the same way, create another OU named `Students` and add "Emma Hall" and the remaining users. Do not add Workspace User or Alex Moore.

To view users in each new OU:

1. In the left pane, click **Directory** &gt; **Users**.
    
2. In the **All organizations** pane, select **Users from selected organizational units**.
    
3. See the OUs, Students and Teachers, under the Google Workspace Labs OU.
    
4. Click **Students** to see users in this OU in the right pane.
    
5. Click **Teachers** to see users in this OU in the right pane.
    

Control access to services with OUs

Check my progress

### Customize access to services using access groups

While OUs are the easiest way to control access, you may need to customize access for some users in one or more OUs. Access groups let you group users from different OUs and then set access to the group.

To create a group:

1. In the **Main menu** , click **Directory** &gt; **Groups**.
    
2. Click **Create group**. The **Create group** dialog opens.
    

* Name the group `Gmail`.
    
* Type `Gmail-group` for the group email.
    
* Set the Group Owner - start typing “Workspace” and click **Workspace User** the owner as it displays.
    

3. Click Next. The **Access Settings** page opens.
    
4. Set the following **Access settings**:
    

| **Access settings** | **Group owners** | **Group managers** | **Group members** | **Entire organization** | **External** |
| --- | --- | --- | --- | --- | --- |
| Contact owners | Check | Check | Check | Check | Check |
| View conversations | Check | Check | Check | \- | \- |
| Publish posts | Check | Check | Check | \- | \- |
| View members | Check | Check | Check | \- | \- |
| Join the group | Check | Check | \- | \- | \- |

5. For **Who can join the group**, select **Only invited users**.
    
6. Click **Next** at the bottom right.
    
7. Accept all default values for security settings and click **Create Group**. The Create group page opens that shows an action summary and lists what you can do next.
    
8. Click **Add members to Gmail**. The Members page opens.
    
9. In the left panel, click **Add Members**. The **Add members to Gmail** dialog opens.
    
10. Add Emma Hall and the users in the Teachers OU (Alex Moore and the other user you added).
    
11. Click **Add to group**.
    

You have created the Gmail group with members that span the Teachers and Student OUs.

To view the users in the Gmail group:

1. Navigate to **Directory** &gt; **Groups**.
    
2. Click the **Gmail** group.
    
3. Click the **Members** card on the right to see who's in the group.
    

Customize access to services using access groups

Check my progress

## **Task 3. Set up services**

In this section, set services as follows:

* Disable Gmail for students, but enable Gmail for 1 student
    
* Disable Calendar for teachers and students
    
* Ensure Classroom is enabled for teachers and students
    
* Ensure Google Meet is enabled for teachers and students
    
* Enable Drive but disable external file sharing
    

### Disable Gmail for students

1. From the **Main menu**
    
    ![Main menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    , click **Apps** &gt; **Google Workspace** &gt; **Gmail**.
    
2. Click to expand the **Service status** card.
    
3. In the Gmail panel, in the **Organizational Units** section, click **Students**.
    
4. Set the **Service status** to **OFF**.
    
5. Click **Override**. Gmail is now disabled for the users in the Students OU.
    
6. In the Gmail panel, click **Groups**.
    
7. Start typing "Gmail" in the search field and click **Gmail** when it appears.
    
8. Set the **Service status** to **ON**.
    
9. Click **Save**.
    

You have disabled Gmail for all students, except Emma (the student in the Gmail group).

### Disable Calendar

1. From the **Main menu**
    
    ![Main menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    , go to **Apps** &gt; **Google Workspace** &gt; **Calendar**.
    
2. Click to expand the **Service status** card.
    
3. Select **OFF for everyone**.
    
4. Click **Save**.
    

Calendar is now disabled for all domain users.

### Ensure Google Meet is enabled

1. From the **Main menu**
    
    ![Main menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    , go to **Apps** &gt; **Google Workspace** &gt; **Google Meet**.
    
2. Check that Service status is set to the default value, **ON for everyone**.
    
3. If needed, click to expand the **Service status** card.
    
4. Select **ON for everyone**.
    
5. Click **Save**.
    

Google Meet is now enabled for all domain users.

### Ensure Classroom is enabled

1. From the **Main menu**
    
    ![Main menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    , go to **Apps** &gt; **Additional Google services**. The **Additional services** page opens.
    

**Note:** This lab uses Google Workspace Enterprise. In Google Workspace for Education, you find Classroom in **Apps** &gt; **Google Workspace** listed alongside all core services.

2. Find **Classroom** in the Services list, the **Service Status** should be at the default value, **On for everyone**.
    
3. If needed, click the ellipse that is in-line and to the right of **Classroom**, and then click **Turn ON for everyone**.
    

Classroom is now enabled for all domain users.

### Enable Drive but disable external file sharing

1. From the **Main menu**
    
    ![Main menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    , click **Apps** &gt; **Google Workspace** &gt; **Drive and Docs**. The **Drive and Docs** page opens.
    
2. Check that **Service status** is set to the default value, **ON for everyone**.
    
3. If needed, click to expand the **Service status** card.
    
4. Select **ON for everyone**.
    
5. Click **Save**.
    

Drive is enabled for all domain users.

To disable external file sharing:

1. Still on the **Settings for Drive and Docs** page, click to expand the **Sharing settings** card.
    
2. Hover over **Sharing options** and click. The **Sharing options** dialog opens.
    
3. For **Sharing Outside of Google Workspace Labs**, select **OFF - Files owned by users or shared drives in Google Workspace Labs can't be shared outside of Google Workspace Labs.**
    
4. Uncheck **Allow users in Google Workspace Labs to receive files from users or shared drives outside of Google Workspace Labs**.
    
5. Click **Save**. You may have to scroll down to see the **Save** option.
    

External file sharing is now disabled for everyone.

**Note:** If your domain works closely with other Google Workspace domains, consider creating a domain allowlist. You can then allow sharing with those domains only. For more information, see [Allow external sharing with only trusted domains](https://support.google.com/a/answer/6160020).

Set up services

Check my progress

## **Task 4. Apps/API access control**

You’ve set up basic Google Workspace services. In this section, restrict API access to internal apps and block users from installing apps from Marketplace.

### Control third-party and apps access to Google Workspace data

1. From the **Main menu**
    
    ![Main menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    , click **Show more** &gt; **Security** &gt; **Access and data control** &gt; **API controls**. The **App access control** dialog opens.
    
2. In the **App access control** card, in **Settings**, create a message to display if a user tries to use an app that can’t access restricted Google services. Something like “Access denied”.
    
3. Check **Don't allow users to access any third-party apps**.
    
4. Click **Save**.
    

API access control

Check my progress

### Manage access to Google Workspace Marketplace

1. From the **Main menu**
    
    ![Main menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    , go to **Apps** &gt; **Google Workspace Marketplace apps** &gt; **Settings**. The **Google Workspace Marketplace Settings** dialog opens.
    
2. In the Manage access to apps card, in the **Manage Google Workspace Marketplace allowlist access** section, select **Don't allow users to install and run apps from the Marketplace.**(Your users may lose access to apps that they have previously installed).
    
3. Click **Save**.
    

## **Task 5. Check it out**

Now you will need the usernames and passwords you saved earlier.

Sign in as a teacher (a user in the Teachers OU):

1. Open a [new tab](https://www.google.com/).
    
2. Click the Workspace User Avatar in the upper right, and then click **+Add account**.
    
3. Enter the email for Alex Moore - that you saved earlier in this lab.
    
4. Enter the password for Alex Moore - that you saved earlier in this lab.
    
5. Accept all terms.
    
6. Change the password, an example password is `luv2Teach!`
    

**Look around**

1. Click the **Google apps** block in the upper right to see what apps are available. Do you see Gmail? How about Calendar?
    

You should see Gmail as the Teachers OU is enabled and all teachers are part of the Gmail group. You should not see Calendar as you turned it off for everyone.

2. From the **Google apps** block, click to open **Drive**.
    
3. Create something to share; click **\+ New** in the upper left &gt; **Google Docs** &gt; **Blank document**.
    
4. Name the file, Change **Untitled document** to **Test document** in the upper left.
    
5. Click **Share** in the upper right.
    
6. In the **Add people and groups** type an external email address, for example your personal email address, and click **Send**.
    
7. Now try to share with Emma Hall, a user you added earlier in this lab.
    

You can access Drive and Google docs, you can not share externally, but you can share with another user.

Repeat these steps to sign in and explore as the student, Emma Hall, and then as a different student.

What is the difference between Emma Hall's account and another student's account?Emma Hall can use Calendar.There is no difference.Emma Hall can use Gmail.Emma Hall can share files externally.

Submit

## **Task 6. Test your learning**

**True or false: A user may belong to only one OU.**

* True
    
* False
    

**True or false: A user may belong to only one group.**

* True
    
* False
    

**A user can access a service if they belong to which of the following?** Choose all that apply.

* An OU that is a child of an OU with disabled access, and a group with enabled access
    
* It doesn’t matter what is enabled or disabled in an OU or group, access is determined by role
    
* An OU with enabled access and a group with disabled access
    
* An OU with disabled access and a group with enabled access
    

**True or false: Service access is configured only in the Google Workspace Console.**

* True
    
* False
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=TkLAGvDmD0w&ab_channel=Techcps] 

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1733804886993/5785a437-f21d-4811-9029-9d57ba79157c.png align="center")