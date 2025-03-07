---
title: "Automating and Customizing Reports in Looker Studio Pro (Solution)"
seoTitle: "Automating and Customizing Reports in Looker Studio Pro (Solution)"
seoDescription: "This lab is an optional item in the Looker Studio Pro Essentials course.

This lab environment is currently under development and may exhibit occasional une"
datePublished: Fri Mar 07 2025 08:12:40 GMT+0000 (Coordinated Universal Time)
cuid: cm7yhzstd000a09l82hslhihu
slug: automating-and-customizing-reports-in-looker-studio-pro-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741334703420/3d6df4f0-39e0-46ec-8983-bd3f7ebda614.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1741335142849/a13b2075-3909-4a3b-8f50-f29d0985c22a.png
tags: automating-and-customizing-reports-in-looker-studio-pro-solution, automating-and-customizing-reports-in-looker-studio-pro

---

## **Note**

This lab is an optional item in the Looker Studio Pro Essentials course.

This lab environment is currently under development and may exhibit occasional unexpected behavior. While we are actively working to improve its reliability, you may encounter instances where the product interface differs slightly from the lab instructions. Should this occur, please try the following:

* Refresh the page.
    
* Log out and log back in.
    
* Start a new lab environment.
    

A demo video is provided at the end of the lab to further familiarize you with the Looker Studio Pro features. We appreciate your understanding as we work to enhance this lab experience.

## **Overview**

[Looker Studio Pro](https://support.google.com/looker-studio/answer/13715508?hl=en) is the premium version of Looker Studio. This lab is intended for Looker Studio users to learn and practice scheduling reports with Pro subscription. Building insightful data reports in Looker Studio is not in the scope of this lab.

## **Objectives**

In this lab, you learn how to perform the following tasks:

* Purchase a Pro subscription in Looker Studio and assign a license to a user.
    
* Build a simple report and create scheduled report deliveries.
    
* Apply filters in scheduled reports.
    
* Create a personal report link.
    

## **Setup**

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Sign in to Qwiklabs using an **incognito window**.
    
2. Note the lab's access time (for example, `1:15:00`), and make sure you can finish within that time.  
    There is no pause feature. You can restart if needed, but you have to start at the beginning.
    
3. When ready, click **Start lab**.
    
4. Note your lab credentials (**Username** and **Password**). You will use them to sign in to the Google Cloud Console.
    
5. Click **Open Google Console**.
    
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts.  
    If you use other credentials, you'll receive errors or **incur charges**.
    
7. Accept the terms and skip the recovery resource page.
    

<aside><p><strong>Note:</strong><span> </span>Do not click<span> </span><strong>End Lab</strong><span> </span>unless you have finished the lab or want to restart it. This clears your work and removes the project.</p></aside>

This lab has two sets of user credentials. Use **username1** `student-04-a936e79cdc5b@qwiklabs.net` to log in first and follow lab instructions.

## **Looker Studio setup**

Once you've logged in to the Google Cloud console, open [lookerstudio.google.com](http://lookerstudio.google.com/) in a new tab. You should be automatically logged in with your lab's username, but, if not, log out and sign in with the lab credentials in username 1: `student-04-a936e79cdc5b@qwiklabs.net`.

## **Task 1. Purchase a Pro subscription**

Before you start to perform the tasks in this lab in Looker Studio Pro, you will need to purchase a Pro subscription.

1. In the top right corner, click on the gear icon besides your profile icon. On the new dialog window, select **Pro subscription** from the left side navigation.
    
    ![gear_icon](https://cdn.qwiklabs.com/UjsRKHd%2BmyyRJtw%2Ft2JjWnZohO40ml6Raxl1S1m3EAA%3D align="left")
    
2. In the **Get Looker Studio Pro** screen, enter the project\_id: `qwiklabs-gcp-04-9218e24e85fa` in **Google Cloud Project**. Wait until all the checking steps are completed with a green tick. Click **Next**.
    
3. In the **Add people and groups** , add user 2’s email address: `student-04-b42c6420db7d@qwiklabs.net` Click **Next**.
    
4. Review the overview information of your Pro subscription and click **Buy**.
    
5. Wait until the loading icon disappears and a banner pops up. Then you can close the **Get Looker Studio Pro** screen.
    
    ![congrats](https://cdn.qwiklabs.com/UV6y6%2BA40CC3J%2FAGRCBQwQdKirVOvv3KPcCz9DmMG8g%3D align="left")
    
6. If the Looker Studio instance did not automatically refresh, please refresh the webpage. You will see “Looker Studio” changes to “Looker Studio Pro” on the top of the screen.
    

Now you have purchased a Pro subscription in Looker Studio, which allows you to access Looker Studio Pro features.

Click *Check my progress* to verify the objective.

Purchase a Pro subscription

Check my progress

## **Task 2. Create a simple Looker Studio report**

In this task, you will create a dummy Looker Studio report. These steps help you refresh your Looker Studio knowledge in creating reports. You need to use this report to perform the following tasks in this lab to learn scheduling features.

### Create a simple report.

1. Click **Create** from the left side panel, and select **Report**.
    

![create_report](https://cdn.qwiklabs.com/rZU%2BOE7jI5g9J2EgJ%2BjKJsIitlB3yeEVUpo%2BcuZ%2BM4A%3D align="left")

Enter your basic info and agree on terms of service and click Continue. Select “No” to all the options and click Continue.

2. On the **Add data to report** window, select the **BigQuery** tile.
    

![adddataa](https://cdn.qwiklabs.com/v48giHxk7oEgtrJMcrZd0AkKbALYi6kWwmGMTR4QJ7w%3D align="left")

3. If prompted, click the **Authorize** button to let Looker Studio view your data in BigQuery.
    
4. From the left menu, click **Public Datasets** &gt; **Your Project ID** &gt; **san\_francisco** &gt; **bikeshare\_trips**.
    

![dataset](https://cdn.qwiklabs.com/tEAN3%2FlKcMIWVRw2f%2BKOFD4QBRDLK3p0g1x4YRbIxBc%3D align="left")

5. Click **Add** in the bottom right corner to add this data into the report.
    
6. You will then be prompted with "You are about to add a data source to this report", click **Add to report**.
    
7. Change the report name to `Test report`.
    

![renamereport](https://cdn.qwiklabs.com/%2BwVuFa8Oi7FCJZ1me33dJksmHHgmBzGpQCwbsqtqZpQ%3D align="left")

### Add a filter control on the report.

1. From the toolbar, select **Add a control**.
    

![control](https://cdn.qwiklabs.com/HOO6OEVHWVHOVP8JW6cdmLaZgPbzW4EWMGlz2MVyMxo%3D align="left")

2. Select **Drop-down list** from the list. Then click on a blank area on the report to place the filter control.
    
3. You just created a filter control named `start_station_name` in the report. Update the filter value to `San Francisco Caltrain` only.
    

Now you have successfully created a dummy Looker Studio report with a filter control on it.

Click *Check my progress* to verify the objective.

Create a simple Looker Studio report

Check my progress

## **Task 3. Create scheduled report deliveries**

In this task, you practice creating scheduled report deliveries to different channels.

1. Navigate to the `Test report` in your **Recent** folder or **Owned by me** folder. Click on the three dots next to the report to move it to Sandbox in the team workspace. Then, select **Move to** and choose `qwiklabs-gcp-04-9218e24e85fa` &gt; Sandbox. Finally, click **Next**.
    
2. Open the report, find the **Share** button in the top right corner, and click the arrow.
    
3. Select **Schedule delivery** from the dropdown list.
    

![schedule](https://cdn.qwiklabs.com/Vo%2FN7RyJHBR9VhOZsveaD%2BnkvpoSOaIq%2BrfYLdj0UKo%3D align="left")

4. On the new dialog window, configure your scheduling preferences under **Settings**.
    
    * Select **Email** in Destination. (You can also review the settings for scheduling reports to Google Chat by selecting **Google Chat**. However, this is not a requirement in the lab.)
        
    * Enter the schedule name `Schedule 1`.
        
    * Leave the rest as is, click **Save**.
        
5. On the new dialog, you can review your scheduled delivery. To create a second schedule, click **New Schedule**.
    
    * Select **Email** in Destination.
        
    * Enter the schedule name `Schedule 2`.
        
    * Set repeat frequency to **Every weekday (Monday to Friday)**.
        
    * Leave the rest as is, click **Save**.
        
6. On the new dialog, you can review the overview information on the two scheduled deliveries. Click **Send now** on `Schedule 1` to send a test email for the scheduled delivery.
    
7. On the same dialog, click on the three dots on `Schedule 2` and toggle off **Active**. Note that **Edit** and **Delete** are also on the list. Click **Done** to close the dialog window.
    

You have successfully scheduled two email report deliveries on a Looker Studio report in a team workspace. You have practiced sending out a test email and deactivating a schedule. You have also reviewed the scheduling settings for a report delivered through Google Chat.

## **Task 4. Apply filters in scheduled reports**

In this task, you practice applying filters on your scheduled deliveries.

1. Navigate to the `Test report` in the team workspace.
    
2. Open the report, find the **Share** button in the top right corner, and click on the arrow.
    
3. Select **Schedule delivery** from the dropdown list.
    
4. Click `Schedule 1` and on the new dialog window, review the details of it, click **Edit schedule**.
    
5. To the right of **Settings**, select **Filters**.
    
6. Update the filter value to also select `San Francisco Caltrain 2`, you will have two filtered values in the scheduled report. Click **Save**.
    

You have successfully added a filter on schedule 1. When Looker Studio sends out the scheduled report delivery, the new filter value will be applied.

## **Task 5. Create a personal report link**

In this task, you practice creating a personal report link and share an editable report with another user while preventing changes to your original report.

1. Navigate to the `Test report` in the team workspace.
    
2. Open the report, find the **Share** button in the top right corner, and click the arrow.
    
3. Select **Get personal report link** from the dropdown list.
    

![personallink](https://cdn.qwiklabs.com/%2FJGnc1rZBRhWlsXgb6fvF5Br%2FhEdkG0Vq%2BCDIyH0yFw%3D align="left")

4. The new dialog shows a personal report link. There are two icons besides the link, the first icon is to copy the link, and the second icon is to open the link in a new tab. Click the first icon to copy the link. (In the lab, it is recommended to paste the link in a document or textbook for later use.)
    

![twoicons](https://cdn.qwiklabs.com/MyPseUaQen%2FRQdrQ9%2FEMGKxNC6h7nYLMFfxZceNcUMg%3D align="left")

5. In the top right corner, click the profile icon and select **Add an account** from the drop down list.
    

![addaccount](https://cdn.qwiklabs.com/tKgB8ZF%2BrRrcKSMQsBbtFH9vqFK5QRF90djwCoq%2FdUY%3D align="left")

6. Use user 2’s email and password to log in Looker Studio as user2.
    
    * **Username 2:** `student-04-b42c6420db7d@qwiklabs.net`
        
    * **Password 2:** `Rfq56igLp8Xt`
        
7. Open the link that you copied in step 4 as user2. The link creates a copy of the original report. In the new report, remove the filter control.
    
8. Log back in as user 1 and review the original report. Notice that the editable report that user 2 updated did not change your original report.
    

You have successfully created a personal report link and practiced using it to collaborate with your team.

[Demo video](https://youtu.be/sMnpu_UmK5A)

---

## Solution of Lab

%[https://www.youtube.com/watch?v=TeUDre85ZjY]