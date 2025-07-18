---
title: "Google Workspace Admin: Provisioning - GSP676"
seoTitle: "Google Workspace Admin: Provisioning - GSP676"
seoDescription: "Provision groups, calendar resources, and domains in Google Workspace Admin with hands-on tasks for efficient management"
datePublished: Fri Jul 18 2025 16:12:04 GMT+0000 (Coordinated Universal Time)
cuid: cmd90om3t001h02l4czmdftby
slug: google-workspace-admin-provisioning-gsp676
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752824252612/1e95aa44-ead8-4d9e-8b2b-e147f91f5cc0.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1752827582379/93ae2054-d363-423b-9bee-6b1a53cb8ce5.png
tags: google-workspace-admin-provisioning-gsp676, google-workspace-admin-provisioning, gsp676

---

## Overview

In this lab, you use Google Workspace to provision groups and calendar resources. As a single Google Workspace account supports multiple domains, you also learn how to add (or provision) an additional domain in your organization.

### Objectives

In this lab, you do the following using the Google Workspace Admin Console:

* Create Google Groups
    
* Create a Calendar resource
    
* Add a domain to your Google Workspace organization
    

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
    

## Task 1. Google Workspace groups

With Google Workspace, your organization can use groups to easily communicate and collaborate across teams. In this section, you create two different types of Google Groups from the Admin console, one that includes everyone in your organization, and one that's restricted to invite only.

### Create an announcement group

Start by creating an announcement group which automatically includes all existing and future members of your organization.

1. From the Admin console, click the **Groups** card. You may have to click **Show more** at the bottom of the dialog to see the **Groups** card.
    
2. Click **Create Group**.
    
3. In the **Name** field, enter `Everyone`.
    
4. In the **Group email** field, enter `everyone`.
    
5. In the **Group owner** field, enter your student email address, which is the **User Email** on the page where you started the lab.
    
    **Note:** If you start to type the User Email address, the option becomes available. Type "st" and see what happens!
    
6. Click **Next**.
    
7. Choose the **Access type** of **Announcement only**. Leave all other fields at their default value and click **Next**.
    
8. Leave all fields at their default value. Click **Create group**.
    
9. Under **What you can do next**, click **Add members to Everyone**.
    
10. Click **Add members**, then click **Advanced** at the bottom of the **Add members to Everyone** dialog box.
    
11. Select the **Add all current and future users of 'your organization' to this group with All Email** setting box.
    
12. Click **Add to group**.
    

Congratulations, you have created your first Google Group. By default, only group owners and managers can post to this group but everyone in your organization can view the posts.

13. Verify that you can see **All users in the organization** in the **Member** list and that you are shown with the **Owner** role. You may have to reload the browser tab to see **All users in the organization**.
    

### Create a restricted group

You've created a group that includes everyone, but not all communication is meant for everyone. A restricted group allows you to customize membership and access to others in the group.

In this section you create a restricted group for use by your company’s executive. When you create this group, you restrict membership to invited users only and restrict who can contact the group owners.

1. Click **Main menu** () &gt; **Directory** &gt; **Groups**, and then click **Create group**.
    
2. In the **Name** field, enter `Executive`.
    
3. In the **Group email** field, enter `executive`.
    
4. In the **Group owner** field, enter your student email address and then click **Next**.
    
5. In the **Access type** &gt; **Access settings** table, deselect all entries in the **Entire Organization** column.
    
    **Note:** The group type automatically changes to ‘Custom’ group once you start to change the default access settings. Also, when you prevent anyone in your organization from contacting the group owners, external users are also prevented from doing the same.
    
6. Scroll down and change the **Who can join the group** setting to `Only invited users` and then click **Next**.
    

Leave all fields at their default value.

7. Click **Create group**.
    
8. Click **Done**.
    

### Verify groups access

In this lab you will not be able to test mail delivery to Google Groups, but take a look at the expected behavior for each of the two groups created earlier.

Imagine you have three users: Sue, John, and Marco. The table below shows the role each user has for each of the two groups.

|  | **Sue** | **John** | **Marco** |
| --- | --- | --- | --- |
| Everyone | Manager | Member | Member |
| Executive | Manager | Member | Not a Member |

Sue sends an email message to each of the two groups. As Sue is a manager of both groups, her emails are delivered successfully.

John sends an email message to each of the two groups. His message to the Everyone group is rejected because only Owners and Managers can post to this group. His message to the Executive group is delivered successfully.

Finally, Marco also sends an email message to each of the two groups. Like John, Marco’s message to the Everyone group is rejected because only Owners and Managers can post to this group. As Marco is also not a member of the Executive group, his message to this group is also rejected.

Click *Check my progress* to verify the objective.

Google Workspace groups

## Task 2. Use Workspace to share resources

You can use Google Workspace to set up Calendar so users can book shared company resources. Example resources are rooms, projectors, company cars, or bicycles.

In this section, you create a Calendar resource to represent a company resource. Users in your organization will be able to view and book the resource in Calendar.

### Create a Calendar resource

The most common example of a Calendar resource is a physical room to meet in. In this section, you create a Google Calendar resource for a meeting room in your organization. Users will see details like the building and floor where a room is located and the key features such as video conferencing equipment or whiteboards.

#### Define your building

Before adding your room as a Calendar resource, add your organization’s buildings to the Admin console. This acts as a location to which your resource will be associated.

1. Click **Main menu** () &gt; **Directory** &gt; **Buildings and resources** &gt; **Manage resources**.
    
2. In the breadcrumbs at the top, click **Resources** &gt; **Buildings**.
    

![The highlighted file path to the option Buildings.](https://cdn.qwiklabs.com/6w2T86I2E4%2BJ97E6FavhNFunotW2k9fs1mK17yZurbk%3D align="left")

3. Click **Add building**.
    
4. Complete the building information:
    

* Name
    
* (Optional) Description
    
* Floors
    
* (Optional) Address. Click the **Pencil icon** to add your organization’s address.
    

5. Click **Add building**.
    

The **Building** list opens with the building you just created listed.

**Optional:** Can you define another building?

#### Create a Calendar resource

In this section you define your resource as a Calendar resource.

1. In the breadcrumbs at the top, click **Buildings** &gt; **Resources**.
    
2. Click the plus sign in the yellow circle, **Add new resource**.
    
3. Set the required fields as follows:
    

* Category: Meeting space (room, phone booth,...)
    
* Building: Pre-filled with the building you created in the previous section, or use the drop down to select a building
    
* Floor: Pick a floor
    
* Resource name: Name the resource, for example `Interview Room`
    
* Capacity: The capacity of the room, for example `5`
    
* Optional: Feel free to add data to the optional fields
    

4. Click **Add Resource**.
    

The Resource list opens and lists your new resource.

5. Check it out: Open [Google Calendar](https://calendar.google.com/) and schedule an event.
    
6. Click **Rooms** at top right panel to see your meeting space listed.
    

**Optional:** See if you can create a bike as a Calendar resource.

**Hint:** The **Category** would be **Other resource**.

#### Create a resource feature

Next, create some features you can associate with your resources. For example, does your meeting room have a smart board? Does it have a refreshment station? Noting amenities in the room is helpful to anyone booking the room for a meeting.

In this section you create a feature. You start at the Building list. Start at the Admin console home page **Main menu** () &gt; **Home**.

1. From the Admin console Home page, click the **Buildings and resources** card. You may have to click **Show more** and then scroll down to see the card.
    
2. In the **Resource management** card, click **Open**.
    
3. Click **Manage resource features** (
    
    ![Manage resource features icon](https://cdn.qwiklabs.com/AwAXtHUd57PX2BTf4u%2Bis2YKRoIetpXVQWb1c0hC0ic%3D align="left")
    
    ) on the top right.
    
4. Click **Add Feature** and then complete the resource information:
    

* Feature name: Name the feature, for example `Refreshment Station`.
    
* Feature type: Use the dropdown to select the appropriate type, for example `Other`.
    

5. Click **Save**.
    

See the feature listed in the Resource features list.

6. Click **Close**. This returns you to the Resource list.
    

**Optional:** Can you create another resource, maybe video conferencing equipment for your meeting room, or a bike helmet for your bike?

#### Associate the resource feature to the Calendar resource

You made the feature, now associate it with the Calendar resource.

1. Click a resource in the Resource list.
    
2. Click the **Features** card.
    
3. Click **Search features** and select a feature from the dropdown and click **Save**.
    
4. In the breadcrumbs at the top, click the resource to view the resource overview. Notice the feature you added in the **Features** card.
    

**Optional:** If you created another resource in the last section, can you associate it with a Calendar resource?

#### Verify resource in Google Calendar

You created the Calendar resource, now verify the resource by booking it in Google Calendar.

1. Open [Google Calendar](https://calendar.google.com/calendar).
    
2. Create a new event. (Click the **Create** or anywhere under a day, and then **More options** at the bottom left of the dialog that opens.)
    
3. Click the **Rooms** tab. The resource or resources you created are listed under **Available rooms**.
    
4. Click to reserve the resource for your event. Hover over the resource to view more details, including any features you added.
    
    **Note:** It may take a short while for the newly created resource to be visible in Google Calendar.
    

Click *Check my progress* to verify the objective.

Use Workspace to share resources

## Task 3. Add a secondary domain or a domain alias

If you own another domain, you can add it to your Google Workspace account. For example, you might manage multiple businesses or brands, each with their own domain. Depending on your needs, you can add a domain as a domain alias or a secondary domain.

A secondary domain is a separate domain with its own set of users. A domain alias gives users in your primary domain an email address at the alias domain. Whether you add a secondary domain or a domain alias, Google requires that you verify domain ownership.

The process for adding a secondary domain and a domain alias is the same. In this section, you walk through the steps to add a secondary domain.

### Add the domain

Add a secondary domain to your Google Workspace account.

1. From the Admin console home page **Main menu** () &gt; **Home**.
    
2. On the **Domains** card, click **Manage domains**.
    
3. Click **Add a domain**.
    
4. Enter any domain name (do not use a domain name that you own), then click **Add Domain & Start Verification**.
    
    **Note:** Google now needs to verify that you own the domain. In this lab, you do not actually verify ownership of the domain. Instead you walk through the process so you understand the steps needed to add a domain to your own Google Workspace account.
    

The recommended way to verify your domain is to add a TXT record to your DNS records.

5. Click **Continue**.
    

The next page provides a unique Google site verification code and a set of instructions on how to add your verification code to your DNS records. At this stage you would copy the site verification code, sign into your domain registrar and add your new TXT record. **DO NOT do that now**. Instead, assume you have done it and continue with the lab.

6. Click **Verify my domain**.
    

Google now attempts to find the TXT record in your DNS to verify that you own the domain name you entered earlier.

7. Click the **X** in the top left corner of the page to close the verification page.
    
8. Confirm that you can see the new domain in your domain list.
    

Note how the Domain status is **Verify domain**. This is expected as Google has not been able to verify the domain.

Click *Check my progress* to verify the objective.

Add a secondary domain or a domain alias

## Task 4. Check your learning

Why would you create a Workspace group?To easily communicate and collaborate only within a team.To ensure all team members have the same access to all communication.To easily communicate and collaborate across teams.So that any team member could add external partners to the Group to ensure inclusive communication

True or False: You can create a Group for a team, and also add someone outside the team to the Group.TrueFalse

In Workspace, you can use Calendar to:Know when a resource needs maintenance.Schedule a resource and then add features to the resources.Set who can use the resource.View and schedule resources at a location.

When scheduling a resource in Calendar, how do you know what features are included?Hover over the resource to view the resource details, which includes the features.You don’t, you schedule the feature you want first, and then Calendar displays the resources that include the feature.Calendar type indicates what features are included.You don’t, when you schedule a resource, you fill out a questionnaire that determines what features are needed.

True or False: You can add only verified domains as a secondary domain or domain alias.

* True
    
* False
    

True or False: A domain alias gives users in your primary domain an email address at the alias domain.

* True
    
* False
    

---

## Solution of Lab

%[https://youtu.be/6UnaaouVEi0]