---
title: "Teaching with Google Classroom - GSP982"
seoTitle: "Teaching with Google Classroom - GSP982"
seoDescription: "Classroom is your all-in-one place for teaching and learning. As part of Google Workspace for Education, Classroom is intuitive, easy to use, and gets you started in minutes. This lab shows how you, as a teacher, can use Classroom to set up a class, including how to set up communication using the class page, Gmail, and Google Meet; create assignments; and use Calendar to keep the class on schedule and your students aware of deadlines."
datePublished: 2026-07-17T09:44:37.464Z
cuid: cmror4f8g00000akdbaod7sn9
slug: teaching-with-google-classroom-gsp982
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/f5125e1d-37ca-4f88-b3be-b11d3aecdffb.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/022c6773-9135-4a61-a1c7-3311f456b51f.png
tags: teaching-with-google-classroom-gsp982, teaching-with-google-classroom, gsp982

---

## **Overview**

Classroom is your all-in-one place for teaching and learning. As part of Google Workspace for Education, Classroom is intuitive, easy to use, and gets you started in minutes. This lab shows how you, as a teacher, can use Classroom to set up a class, including how to set up communication using the class page, Gmail, and Google Meet; create assignments; and use Calendar to keep the class on schedule and your students aware of deadlines.

### What you'll do

*   Create a class landing page
    
*   Add students to a class
    
*   Generate a Google Meet link
    
*   Create an assignment
    
*   View Classroom as a student
    

## **Classroom**

Classroom is a free tool within [Google Workspace for Education](https://edu.google.com/products/workspace-for-education/) and integrates Gmail, Calendar, Docs, Drive, Slides and other Google Workspace apps. With Classroom, educators can distribute and collect assignments, give personalized feedback and grades, and see students' work in one place. Schools use Classroom to make teaching more productive and meaningful by streamlining assignments, boosting collaboration, and fostering communication.

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

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
    
4.  Click **Get set up** to continue.
    

After a few seconds, the *Admin Console* opens.

5.  Right-click **Verify** in the red box at the top or right-click on **Verify domain** on the red box in the *Domains* card, and select **Open link in new tab**.
    
    **Note:** To complete this step in a real-life scenario, you'd need to add an actual DNS record.
    
6.  Click the new tab, called **Domain setup**, to complete the Google Workspace domain verification steps.
    
7.  On the *Let's set up your domain* page, click **Get Started**.
    
8.  On the *Choose how to verify your domain* page, click **Other verification options**.
    
9.  From the **Domain host** dropdown, select **Other** as a domain host and then click **Continue**.
    
10.  At the bottom of the *Add verification code* page, select the **Come back here and confirm once you have updated the code on your domain host** checkbox, and then click **Confirm**.
     
11.  Wait until it says **Your domain is verified!** and then close the *Domain setup* tab.
     
     **Note:** Do not click **Activate Gmail**.
     
12.  Return to the **Admin Console** tab and refresh the page.
     

This lab provides a temporary Google Workspace Enterprise account. There are a number of differences between the Enterprise and Education versions of Workspace, so the options in the Admin console may slightly differ from the Education version. For example, the Education version allows services to be restricted based on age. This feature is not available in this lab's version of the admin console. For more information, [see what's in the Google Workspace for Education editions](https://edu.google.com/intl/ALL_us/products/workspace-for-education/editions/).

## **Task 1. Set up the domain**

Before users can access the apps and services in this domain, the Workspace admin must add them to the domain. In this section, you as admin:

*   Create a small role-oriented structure by adding 2 child OUs called Teachers and Students to the top-level domain called Google Workspace Labs.
    
*   Add at least one user to each OU.
    

### Create Teacher and Student OUs

1.  In the Google Admin Home page, in the **Main menu**
    
    ![main menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    , click **Directory**
    
    ![Directory icon](https://cdn.qwiklabs.com/ewvOGAfWM%2FVtgd0cNLQH8%2Bf8eToQoG3O7DaXjSWE1fg%3D align="center")
    
    \> **Organizational units**. The **Organizational units** window opens and shows one organization unit: the Google Workspace Labs unit.
    
2.  Click **Create organizational unit** to create a new OU.
    
3.  In the **Create organizational unit** dialog:
    
    *   Name the organizational unit **Teachers**.
        
    *   (Optional) Enter a description.
        
    *   Click **Create**.
        

The new OU Teachers is now listed under the Google Workspace Labs unit. You may have to refresh the browser tab to see the Teachers OU.

4.  Repeat steps 2 and 3 to create another OU named **Students**.
    

You now have 2 new OUs, Teachers and Students, listed under the top-level OU, Google Workspace Labs.

### Add users

To add users to your workspace:

1.  In the **Main menu**
    
    ![main menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    , click **Directory**
    
    ![Directory icon](https://cdn.qwiklabs.com/ewvOGAfWM%2FVtgd0cNLQH8%2Bf8eToQoG3O7DaXjSWE1fg%3D align="center")
    
    \> **Users**.
    
2.  Click **Add new user** from the top menu. The **Add new user** dialog opens.
    
3.  Type **Maria** for **First name** and **Kearns** for **Last name**. Leave all other fields at their default, and click on **continue**.
    
4.  When the **Adding Users** dialog opens, record the **Username** and **Password** to log into the classroom as a teacher later in the lab.
    
5.  Click **Dismiss**.
    
6.  Select **Maria Kearns**, click on **More Options > Change Organizational unit** field, and then click **Teachers > Continue > Change**.
    
7.  Type **Alex** for **First name** and **Miller** for **Last name**, and then click Continue.
    
8.  Repeat steps 4 and 5 to copy the **Username** and **Password** to log into the classroom as a teacher later in the lab.
    
9.  Select **Alex Miller**, click on **More Options > Change Organizational unit** field, and then click **Students > Continue > Change**.
    
10.  Click **Directory**
     
     ![Directory icon](https://cdn.qwiklabs.com/ewvOGAfWM%2FVtgd0cNLQH8%2Bf8eToQoG3O7DaXjSWE1fg%3D align="center")
     
     \> **Users** to see the users you added.
     

## **Task 2. Launch Classroom**

In the last section, you used the admin role to set up the organizational structure and add users. From this section on you step through the steps as a domain user, either a teacher or student.

*   From **Google Apps**
    
    ![Google apps icon](https://cdn.qwiklabs.com/hz9CDVA62K6tnDt7%2F9Ndve0YxXlFogaeeNY57vkTkyY%3D align="center")
    
    in the upper right, click **Classroom**. Classroom opens.
    

**Note:** Be sure to click the Google Apps in the upper right, not the **Main menu**

![main menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")

, and then click **Directory**

![Directory icon](https://cdn.qwiklabs.com/ewvOGAfWM%2FVtgd0cNLQH8%2Bf8eToQoG3O7DaXjSWE1fg%3D align="center")

\> **Additional Google services**.

### Sign in as a Teacher

1.  Click **Switch Account** next to **Workspace User** to open the **Choose an account** dialog.
    
2.  Click **Use another account**. The **Sign in** page opens.
    
3.  In the **Email or phone** field, enter the username for `Maria Kearns` that you previously recorded. Click **Next**.
    
4.  Enter the password you previously recorded for Maria Kearns.
    
5.  Accept Terms as needed.
    
6.  Create a new password, maybe something like “luv2Teach”.
    
7.  Click **Continue** to confirm you’re Maria Kearns. The **Pick your role** dialog opens.
    
8.  Choose **I’m a teacher**. The Classroom page opens. If you don't see the **Create class** button, reload the browser tab.
    

**Note:** When users sign in to Classroom for the first time, they identify as teachers or students. Once teachers sign in, they are automatically added to the Classroom teachers group for Admin approval.

**Note:** For the lab, Classroom is configured to allow unverified teachers to create and manage a class. If only verified teacher had that permission, you would have to wait for the admin to verify you to continue.

Click *Check my progress* to verify the objective.

Launch classroom

## **Task 3. Create a class**

To create a class:

1.  In Classroom, click **Create class**.
    
2.  In the **Create class** dialog:
    
    *   Name your classroom "History".
        
    *   Ignore all other fields.
        
    *   Click **Create**.
        

Classroom opens the **Class** page. Notice the *Stream*, *Classwork*, *People*, and *Grades* tabs.

| **Tab** | **Description** |
| --- | --- |
| Stream | Class landing page: |

*   Provides the codes or links needed to attend class sessions
    
*   Where you post announcements
    
*   Where you manage class details
    

<table style="min-width: 50px;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><td colspan="1" rowspan="1"><p>Classwork</p></td><td colspan="1" rowspan="1"><p>Class assignments:</p></td></tr></tbody></table>

*   Where you post assignments, quizzes and questions
    
*   Where you make available class resources
    

<table style="min-width: 50px;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><td colspan="1" rowspan="1"><p>People</p></td><td colspan="1" rowspan="1"><p>Where you see everyone in the class, send emails, and invite people to join the class.</p></td></tr><tr><td colspan="1" rowspan="1"><p>Grades</p></td><td colspan="1" rowspan="1"><p>Where you view and manage grades</p></td></tr></tbody></table>

**Note:** It can sometimes take a few minutes for this check to verify.

Click *Check my progress* to verify the objective.

Create a class

### Set up your class landing page

Notice when you created the History class, the History class page opened on the *Stream* tab. The *Stream* tab is the landing page for any class you create. In this section, you generate a Meet link for class sessions, post a welcome announcement to your students, and configure what students can view .

### Generate a Meet link

To create a Meet link to use for class sessions, do the following:

1.  Still in the *Stream* tab, in the **Meet** card, click **Generate link**. The **Manage Meet link** dialog opens.
    
2.  Notice by default, the link is **visible to students**. Click **Save**.
    

Notice a **Join** button is now displayed in the **Meet** card.

Since the link is visible to students, it’s visible in the student view of the class stream.

### Stream settings

Use **Stream settings** to manage communications. In this section you configure the **Stream settings** to let students:

*   Post comments on your announcements
    
*   View grades
    

To set **Stream settings**:

1.  In **This is where you can talk to your class** card, click **Stream settings**.
    
2.  In the **General** section, set **Stream** to **Students can only comment**.
    
3.  In the **Grading** section:
    
    *   Set **Overall grade calculation** to **Total points**.
        
    *   Slide to turn on **Show overall grade to students**.
        
4.  Click **Save** in the upper right.
    

### Post an announcement

The class landing page is ready for your students. Create your first message, which will post to the students page and send an email to all students in the History class:

1.  Click **New announcement**. The card expands.
    
2.  Complete these fields:
    

| **Field** | **Set to...** |
| --- | --- |
| For |  |

*   Select **History**
    
*   Select **All Students**
    

<table style="min-width: 50px;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><td colspan="1" rowspan="1"><p>Announce something to your class</p></td><td colspan="1" rowspan="1"><p>Create a message, something like “Welcome to History!”</p></td></tr><tr><td colspan="1" rowspan="1"><p>Post</p></td><td colspan="1" rowspan="1"><p>Select <strong>Post</strong> to post the announcement to the Class page.</p></td></tr></tbody></table>

3.  View your announcement on the Class page.
    

## **Task 4. Invite students**

To invite students to enroll in your class.

1.  In your Classroom, in the *People* tab and then click **Invite students**
    
    ![Invite students icon](https://cdn.qwiklabs.com/SNsSQGM7zArBckhcab6O%2FFR3hHb60P00nI6yh3Klm6A%3D align="center")
    
    inline with Students. The **Invite students** dialog opens.
    
2.  Start typing the email of the user **Alex**, and click on the name when it appears in the search results.
    

**Note:** You can also retrieve the email by navigating to **Directory**

![Directory icon](https://cdn.qwiklabs.com/ewvOGAfWM%2FVtgd0cNLQH8%2Bf8eToQoG3O7DaXjSWE1fg%3D align="center")

**\> Users** on the Google Admin Home page.

3.  (Optional) If you previously added more users to the Student OU, repeat step 2 to invite them to History class.
    
4.  Click **Invite**.
    

In the Student list, you will see that Alex Miller, and any other users you invited, listed with “(invited)” after their name. When the student signs into Classroom, they’ll see the invitation to join the class.

## **Task 5. Email students**

You can email one or all students. In this section, you email a student for them to pick up their textbook:

1.  Refresh the *People* tab, and then select the checkbox next to the student you want to email.
    
2.  Click **Actions** > **Email Students**. Gmail opens a **New Message** window. Notice Classroom prefills the student email in the **Address** field.
    
3.  Fill in the **Subject** field, for example “Are you ready?”
    
4.  Compose your message, for example “Test next week. I'll post the time of the Extra Help session to the Class page."
    
5.  Click **Send**.
    

## **Task 6. Create an assignment**

The *Classwork* tab is where you find assignments and class resources. To create an assignment:

1.  In the *Classwork* tab, click **Create** > **Assignment**. The **Assignment** dialog opens.
    
2.  Type a title and instructions. For example, “Read Chapter 3” and “Read the Chapter 3 and be ready to discuss causation.”
    
3.  In the right pane, set the following fields and leave all others at their default value:
    

| **Field** | **Values** |
| --- | --- |
| For |  |

*   History
    
*   All students
    

<table style="min-width: 50px;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><td colspan="1" rowspan="1"><p>Due</p></td><td colspan="1" rowspan="1"><p>Pick a date</p></td></tr><tr><td colspan="1" rowspan="1"><p>Topic</p></td><td colspan="1" rowspan="1"><p>Click <strong>Create topic</strong> and then type “Reading”</p></td></tr></tbody></table>

4.  In the top right, click **Assign**.
    

Notice the assignment is now listed in the Classwork list under the Reading topic. Switch to the *Stream* tab and notice the assignment is also listed on the **Upcoming** card as an announcement.

## **Task 7. The student view**

See what the invited student sees. To sign in to the student account:

1.  In Classroom, in the upper right, click the user avatar and click **Add another account**. The **Sign in** dialog opens.
    
2.  Enter the username you previously recorded for Alex Miller and click **Next**.
    
3.  Create a new password, something like “luv2Learn”.
    
4.  Click **Continue** to confirm you’re Alex Miller. The **Pick your role** dialog opens.
    
5.  Click **I’m a student**. The Classroom home page opens and lists your classes. Notice what’s provided:
    
    *   Class name, History
        
    *   Instructor name, Maria Kearns
        
    *   The options to **Join** or **Decline** the History class.
        
6.  Click **Join**. The **History class** page opens.
    

**Note:** It can sometimes take a few minutes for this check to verify.

Click *Check my progress* to verify the objective.

Join the class

### Explore the class

1.  In the *Stream* tab, notice the **Meet** card and the **Upcoming** card.
    
2.  In the **Announcements** card, click the Reading assignment. The Reading assignment opens.
    
3.  Add a comment in **Class comments**:
    
    *   Click **Add a class comment**.
        
    *   Add a comment.
        
    *   Click **Post**
        
        ![Post icon](https://cdn.qwiklabs.com/HIj2Ncqx33YuwWnaCYyd4YEgqnPASgxbecjq0VccDPI%3D align="center")
        
        after adding the comment.
        
4.  In the *Classwork* tab, you can see the Assignment, Read Chapter 3 and the comment.
    
5.  Click **Google Calendar** at the top. Google Calendar opens in a new browser tab. Notice the assignment due date has been added to your Calendar.
    
6.  Return back to the browser tab with **History** class page.
    
7.  In the *Stream* tab, notice the change in the **Upcoming** card and the comment you added in the **class comment** section.
    

## **Task 8. Test your knowledge**

**After you create a class, invite students, and post your first announcement, the Google Workspace admin no longer can change the class configuration**

*   True
    
*   False
    

**As a teacher, you can do the following (choose all that apply):**

*   Add potential students outside your domain as Google Workspace users
    
*   Create a class
    
*   Configure what student see on their class landing page
    
*   Put assignments into student Calendars
    

**When a teacher generates a Link for Google Meet for a class, that link is also assigned to other classes being taught by the teacher.**

*   True
    
*   False
    

**If a student forgets their password, the teacher cannot reset it.**

*   True
    
*   False
    

* * *

## Solution of Lab

%[https://www.youtube.com/watch?v=cM-Asa327mM] 

**Google Classroom for Teachers — Quick Lab Solution**

This guide includes only the steps required to complete the **Check my progress** objectives.

> Use an Incognito or private browser window and sign in only with the temporary lab credentials.

**Progress Checklist**

| Objective | Required action |
| --- | --- |
| Launch Classroom | Sign in as Maria and select the teacher role |
| Create a class | Create a class named `History` |
| Join the class | Invite Alex, sign in as Alex, and join `History` |

Prerequisite 1: Verify the Workspace Domain

1.  Click **Start Lab** and open **Google Workspace Admin Console**.
    
2.  Sign in with the lab-provided **User Email** and **Password**.
    
3.  Accept the Terms of Service and click **Get set up**.
    
4.  Right-click **Verify** or **Verify domain**, then select **Open link in new tab**.
    
5.  Click **Get Started → Other verification options**.
    
6.  Select **Other** as the domain host, then click **Continue**.
    
7.  Select **Come back here and confirm once you have updated the code on your domain host**.
    
8.  Click **Confirm** and wait for **Your domain is verified!**
    
9.  Close the verification tab and refresh the Admin Console.
    

> Do not click **Activate Gmail**.

**Prerequisite 2: Create the Required OUs and Users**

**Create the Organizational Units**

Go to:

```text
Admin Console → Directory → Organizational units
```

Create these two organizational units directly under **Google Workspace Labs**:

*   `Teachers`
    
*   `Students`
    

The required structure is:

```text
Google Workspace Labs
├── Teachers
└── Students
```

**Create Maria Kearns**

Go to:

```text
Admin Console → Directory → Users → Add new user
```

Create the user:

| Field | Value |
| --- | --- |
| First name | `Maria` |
| Last name | `Kearns` |

1.  Click **Continue**.
    
2.  Save Maria's generated email address and password.
    
3.  Click **Dismiss**.
    
4.  Select **Maria Kearns**.
    
5.  Click **More options → Change organizational unit**.
    
6.  Select **Teachers**, then click **Continue → Change**.
    

**Create Alex Miller**

Create another user:

| Field | Value |
| --- | --- |
| First name | `Alex` |
| Last name | `Miller` |

1.  Click **Continue**.
    
2.  Save Alex's generated email address and password.
    
3.  Click **Dismiss**.
    
4.  Select **Alex Miller**.
    
5.  Click **More options → Change organizational unit**.
    
6.  Select **Students**, then click **Continue → Change**.
    

Verify the final assignment:

| User | Organizational unit | Classroom role |
| --- | --- | --- |
| Maria Kearns | `Teachers` | Teacher |
| Alex Miller | `Students` | Student |

### Task 1: Launch Classroom as Maria

1.  Click the **Google Apps** icon in the upper-right corner.
    
2.  Open **Classroom**.
    
3.  Click **Switch account → Use another account**.
    
4.  Sign in using Maria's saved email address and password.
    
5.  Accept the Terms of Service if prompted.
    
6.  Create a new password if required.
    
7.  Click **Continue**.
    
8.  On the role selection screen, choose:
    
    ```text
    I'm a teacher
    ```
    
9.  Refresh Classroom if the **Create class** button does not appear.
    

Click **Check my progress** for **Launch classroom**.

### Task 2: Create the History Class

While signed in as Maria:

1.  Click **Create class**.
    
2.  Enter the exact class name:
    
    ```text
    History
    ```
    
3.  Leave the other fields empty.
    
4.  Click **Create**.
    

Click **Check my progress** for **Create a class**.

> The progress checker may take a few minutes to detect the new class.

**Prerequisite 3: Invite Alex to History**

While still signed in as Maria:

1.  Open the `History` class.
    
2.  Open the **People** tab.
    
3.  Next to **Students**, click **Invite students**.
    
4.  Search for Alex using Alex's saved email address.
    
5.  Select **Alex Miller**.
    
6.  Click **Invite**.
    
7.  Confirm that Alex appears with the **Invited** status.
    

### Task 3: Join the Class as Alex

1.  Click Maria's profile avatar in the upper-right corner.
    
2.  Select **Add another account**.
    
3.  Sign in using Alex's saved email address and password.
    
4.  Accept the Terms of Service if prompted.
    
5.  Create a new password if required.
    
6.  Click **Continue**.
    
7.  On the role selection screen, choose:
    
    ```text
    I'm a student
    ```
    
8.  Find the `History` class invitation.
    
9.  Click **Join**.
    
10.  Wait for the `History` class page to open.
     

Click **Check my progress** for **Join the class**.

> The progress checker may take a few minutes to detect that Alex joined the class.