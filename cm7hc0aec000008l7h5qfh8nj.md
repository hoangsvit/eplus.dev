---
title: "Deploy and query Google Agentspace (Solution)"
seoTitle: "Deploy and query Google Agentspace (Solution)"
seoDescription: "In this lab, you will deploy an Agentspace app connected to a Google Drive data store and use the AI assistant to locate information from within your organi"
datePublished: Sun Feb 23 2025 07:53:00 GMT+0000 (Coordinated Universal Time)
cuid: cm7hc0aec000008l7h5qfh8nj
slug: deploy-and-query-google-agentspace-solution
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740295876022/b9606509-b77b-444c-9246-af43a16490fa.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740297167623/4cb5e0e6-3365-4714-a61f-78c09297c2c6.png
tags: deploy-and-query-google-agentspace-solution, deploy-and-query-google-agentspace

---

## **Overview**

In this lab, you will deploy an Agentspace app connected to a Google Drive data store and use the AI assistant to locate information from within your organization.

For this lab, you’ll take on the role of a scientific conference organizer planning a conference to discuss the discovery of an exciting new exoplanet.

**Note:** To avoid confusion between your professional Google Identity and any other temporary Qwiklabs student accounts, it is strongly recommended that you utilize a new Incognito window for the Google Cloud console and Google Drive tabs you will use in this lab. To do this easily in Chrome, after starting the lab, right-click on the “Open Google Cloud console” button and select “Open link in incognito window”.

## **Objectives**

In this lab, you learn how to:

* Configure Agent Builder authentication
    
* Create a Google Drive data store
    
* Create an Agentspace app
    
* Use the AI assistant to find, summarize, and extract content from a data store
    
* Create a calendar invite with an assistant action
    

## **Setup and requirements**

#### **Before you click the Start Lab button**

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This Qwiklabs hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

#### **What you need**

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    
* Time to complete the lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab.

**Note:** If you are using a Pixelbook, open an Incognito window to run this lab.

#### **How to start your lab and sign in to the Google Cloud Console**

1\. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is a panel populated with the temporary credentials that you must use for this lab.

![Open Google Console](https://cdn.qwiklabs.com/%2FtHp4GI5VSDyTtdqi3qDFtevuY014F88%2BFow%2FadnRgE%3D align="left")

2\. Copy the username, and then click **Open Google Console**. The lab spins up resources, and then opens another tab that shows the **Sign in** page.

![Sign in](https://cdn.qwiklabs.com/VkUIAFY2xX3zoHgmWqYKccRLwFrR4BfARLd5ojmlbhs%3D align="left")

 ***Tip:*** Open the tabs in separate windows, side-by-side.

 If you see the **Choose an account** page, click **Use Another Account**.

![Choose an account](https://cdn.qwiklabs.com/eQ6xPnPn13GjiJP3RWlHWwiMjhooHxTNvzfg1AL2WPw%3D align="left")

3\. In the **Sign in** page, paste the username that you copied from the Connection Details panel. Then copy and paste the password.

***Important:*** You must use the credentials from the Connection Details panel. Do not use your Qwiklabs credentials. If you have your own Google Cloud account, do not use it for this lab (avoids incurring charges).

4\. Click through the subsequent pages:

* Accept the terms and conditions.
    
* Do not add recovery options or two-factor authentication (because this is a temporary account).
    
* Do not sign up for free trials.
    

After a few moments, the Cloud Console opens in this tab.

<aside><strong>Note:</strong><span> </span>You can view the menu with a list of Google Cloud Products and Services by clicking the<span> </span><strong>Navigation menu</strong><span> </span>at the top-left.<span> </span><img alt="Cloud Console Menu" src="https://cdn.qwiklabs.com/oh1qwpHJqNk7NlbvLzIKjm2piwL%2FZ0tmduo8Yh46RFc%3D" /></aside>

## **Task 1. Add content to Google Drive and Google Calendar**

1. Navigate to **Cloud Storage** &gt; **Buckets** and click on the existing bucket with the name:`qwiklabs-gcp-02-0cef3ec1db7e`.
    
2. Download the files listed below to your local system to use as demo data:
    
    * PlanetCon\_Persephone.docx
        
    * Persephone Analysis Report.pdf
        
3. In the Incognito window where you have logged into the Google Cloud console, create a new tab and navigate to [drive.google.com](https://drive.google.com/drive/home).
    
4. Create a new folder in your Qwiklab student account’s drive and name it `PlanetCon: Persephone`.
    
5. Upload the documents you downloaded from Cloud Storage to the folder you just created in Google Drive named **PlanetCon: Persephone**. These documents relate to the imaginary discovery of a new planet named "Persephone" and the organization of a conference planned for the scientific community to discuss it.
    
6. Open **PlanetCon\_Persephone.docx** and dismiss the pop-ups.
    
7. To see how Agentspace can handle multiple versions of a document, click **File** &gt; **Save as Google Docs**. This will create a new Google Docs-native version of the file. Select the file’s name and add `v2` to the file name, so it appears as `PlanetCon_Persephone v2`.
    
8. Find the line `Date: October 26th - 28th, 2028` and change it in this version v2 of the file to one month later: `Date: November 26th - 28th, 2028`
    
9. In the same Incognito window, create a new tab, and navigate to [calendar.google.com](https://calendar.google.com/calendar/u/0/r). Accept or dismiss any pop-ups.
    
10. Ensure you are authenticated as your Qwiklabs student account by clicking the “s” in the circle in the upper right corner and confirming it is your student-...@qwiklabs.net account.
    
    ![Student Account](https://cdn.qwiklabs.com/TikUtyCppwE1ABjC77hpfJLy9OhlRu3V%2Bnun8ZlTBiQ%3D align="left")
    
11. In the upper left, click **\+ Create** and select **Event** from the dropdown menu.
    
12. In the event-creation window that appears, name the event as `Astronomers Lunch Planning Meeting`, and set a start time of at least one hour from now.
    
    ![Event](https://cdn.qwiklabs.com/86kL4tSoyaPw5GPgTGq4uXLsm%2BlaS4UJDszF6L81KCw%3D align="left")
    
13. Select **Save**.
    
    ![Meeting](https://cdn.qwiklabs.com/sgfBHniFNYad6NRR74YjN4RHLYMJnJo94R3a2r7MI80%3D align="left")
    

Click *Check my progress* to verify the objective.

Assessment Completed!

Add the downloaded documents to your Drive and an event to your Calendar.

Check my progress

*Assessment Completed!*

## **Task 2. Configure an Agent Builder Identity Provider**

1. In the Google Cloud Console, navigate to **Agent Builder** by searching for it at the top of the console and click on the **CONTINUE AND ACTIVATE THE API**.
    
    ![Vertex AI](https://cdn.qwiklabs.com/%2FXDWSZ1jPRdua7fBTY95mC3NhSF%2BbWVEReL2EljjtPM%3D align="left")
    
2. Select **Settings** from the left-hand navigation pane.
    
3. On the row for the **global** location, click the pencil icon .
    
4. Select **Google Identity** as your identity provider.
    
    ![Identity Provider](https://cdn.qwiklabs.com/E%2BtbbCLrR5R469YR%2FjksIHTwpk5%2FAAAkI%2Fk3iHw44mM%3D align="left")
    
5. Select **SAVE**.
    

Click **Check my progress** to verify the objective.

Assessment Completed!

Configure an Agent Builder identity provider.

Check my progress

*Assessment Completed!*

## **Task 3. Create Google Drive and Google Calendar Data Stores**

1. From the Agent Builder menu, select **Data Stores** from the left-hand navigation pane.
    
2. Select **\+ CREATE DATA STORE**.
    
3. Locate the **Google Drive** card and click **SELECT**.
    
    ![Google Drive](https://cdn.qwiklabs.com/Y3RpKkkuBFizxsDXwRqdI8QETahQAhhmZLT43cr6tzQ%3D align="left")
    
4. For Choose drives you want to sync, select **All**.
    
    **Note:** While Agentspace makes it easier to find information across your data sources, it does not grant additional access. You will still only have access to the documents that have been shared with you via existing Drive permissions, and others will only have access to your documents that you have shared with them.
    
5. Click **CONTINUE**.
    
    ![Data Store](https://cdn.qwiklabs.com/xUY%2Fq24XbhbrPHaaK4CBjj18muKhk7WBtcKHcSXSe0E%3D align="left")
    
6. Keep the default region of **global**, and give the data store the name `google-drive`.
    
7. Select **CREATE**.
    
    ![Data Store Google Drive](https://cdn.qwiklabs.com/a%2BtE2T%2F8pDqG8%2BtB2mIy8vdWqVGNJn0YK6dDL%2B%2F7DTU%3D align="left")
    
8. Follow the steps in this task again, only this time create a data store for **Google Calendar**. Name it `google-calendar`.
    
    ![Google Calender](https://cdn.qwiklabs.com/1c393NdfNiNN%2FA5WqJkX4l7rUkD6BwAq2HvhE6NHtqs%3D align="left")
    
9. The two data stores should be listed in the Agent Builder &gt; Data Stores panel:
    
    ![Data Store latest](https://cdn.qwiklabs.com/e%2BhVo03AIQIS8gpzbmxQbiO8um%2ByyKPvo6nMzuaS1gs%3D align="left")
    

Click **Check my progress** to verify the objective.

Create Google Drive and Google Calendar data stores.

Check my progress

## **Task 4. Deploy an Agentspace app**

1. From the Agent Builder menu, select **Apps** from the left-hand navigation pane.
    
2. Select **\+ CREATE APP**.
    
3. Find the **Enterprise Search and assistant** card, which represents an Agentspace app, and select **CREATE**.
    
    ![Enterprise Search](https://cdn.qwiklabs.com/%2BdCf7TMZwaaUomVc36I4UiOjQ6MDuyR13w3psvrAV1Y%3D align="left")
    
4. Name your app `Scientific Conferences Agentspace`.
    
5. For a company name, use `Scientific Conferences`.
    
6. Under the “Select tier” header, select **Search + Assistant**.
    
7. Select **CONTINUE**.
    
    ![Scientific Conferences](https://cdn.qwiklabs.com/ieLdReWsqI98mMD70fQw3pKH1IYyvM%2B6xqsISzxrUCw%3D align="left")
    
8. For connected data stores, select the checkbox for the **google-drive** and **google-calendar** data stores you created earlier.
    
9. Select **CREATE**.
    
    ![Create App](https://cdn.qwiklabs.com/uqDxSk3auzJTBUXDo7MjRvPnOiPODvABvt3EQMQXyNc%3D align="left")
    

Click **Check my progress** to verify the objective.

Deploy an Agentspace app.

Check my progress

## **Task 5. Set up an OAuth Consent Screen and Create client**

In order for the AI assistant to take actions on a user’s behalf, the user must grant access to your enterprise search and assistant app. To configure the OAuth consent screen and client, follow the following steps:

1. Navigate to the **Google Auth Platform**.
    
    ![Google Auth Platform](https://cdn.qwiklabs.com/JqW0Q04Eq%2BeHSxbpeo5qeXGtBWL3da1%2F6wTjzDM8K9I%3D align="left")
    
2. Click **GET STARTED**.
    
3. For **App Name**, enter `Scientific Conferences Agentspace`.
    
4. For the **user support email**, select your Qwiklabs student account.
    
5. Select **Next**.
    
6. In the **Audience** section, select an **Internal** Audience.
    
7. Select **Next**.
    
8. In the **Contact Information** section, provide an email address, which can be your real professional email address or your Qwiklabs student account.
    
9. In the **Finish** section, agree to the terms.
    
10. Select **Create** to create your OAuth consent screen.
    
11. Your Google Auth Platform dashboard will display a banner that you haven’t created any clients yet. Select **Create OAuth Client**. If you don’t see this banner, select **Clients** on the left and then **\+ Create Client**.
    
    ![OAuth Client](https://cdn.qwiklabs.com/vo9%2FA9GRJ0kRB6e09XaerYI4P%2FRIaJD0rSyKWTAHrEQ%3D align="left")
    
12. Select an **Application type** of **Web application**.
    
13. **Name** the client `Agentspace Client`.
    
14. Under **Authorized redirect URIs**, add `https://vertexaisearch.cloud.google.com/oauth-redirect`
    
15. Click **Create**.
    
    ![Application](https://cdn.qwiklabs.com/CCiipVL%2FRwPY0teHSurDSzjI1OgTEc%2Bpilztv0awgBk%3D align="left")
    
16. When the client is created, click the **Download** button at the end of its row to display the **Client ID** and **Client Secret** values. Store these in a text document, as you will need them shortly to enable actions.
    
    ![Client Creds](https://cdn.qwiklabs.com/DYgWAKly2bJPsjWuOGMD4wqqqLfr9Z0dF3GGZ0ZxNJ0%3D align="left")
    

Click **Check my progress** to verify the objective.

Set up an OAuth Consent Screen and create a client.

Check my progress

## **Task 6. Enable a Google Calendar Action**

To configure the action, you’ll need to enable the **Google Calendar API**. To do so:

1. In the search bar at the top of the Cloud Console, search for the **Google Calendar API** and select it.
    
    ![API and Services](https://cdn.qwiklabs.com/2%2FzDmomPGSh4Pgr9dHoqFkAp0qifIBbXhKs8tAII%2BJc%3D align="left")
    
2. Click **Enable** if the API is not already enabled.
    
    ![Google Calender API](https://cdn.qwiklabs.com/QE6OLlneaeQR1hC6Yi%2FdfoAV1jQ6%2Be4JCpAdB92LCcs%3D align="left")
    
3. You can now add the action to your app. Return to the **Agent Builder** console.
    
4. Click on the name of your Agent Builder App: `Scientific Conferences Agentspace`.
    
5. Select **Actions** from the left-side navigation.
    
6. Select **ADD ACTION**.
    
7. Find the **Calendar** card and click **CONNECT**.
    
    ![Calender Card](https://cdn.qwiklabs.com/YTh2X0%2BetT9scYcrZi0GSZ2TPrnrDZH4b0xPlrXX8Rs%3D align="left")
    
8. Enter an **Action connector name** of `calendar_action`.
    
    ![Configuration](https://cdn.qwiklabs.com/lMsDvRh44uaWqE9%2FWrrq%2Fg4SXdgJgiRltH8LlA8x5w4%3D align="left")
    
9. Enter the **Client ID** and **Client Secret** of the OAuth client you created above.
    
10. Select the checkbox to enable the **Create calendar event** action to allow the assistant to create meetings based on requests in the Agentspace search bar.
    
11. Click **FINISH SETUP**.
    
    ![All Events](https://cdn.qwiklabs.com/WHOB6kNTgVbXyraO6qfTh3S9MulMk8oJG91TIs8hhrY%3D align="left")
    

Click **Check my progress** to verify the objective.

Enable a Google Calender action.

Check my progress

## **Task 7. Query your Agentspace Assistant**

1. Take a 10-minute break for the app, its data stores, and actions to finish creating.
    
2. Then, navigate to Agent Builder &gt; Apps &gt; **Scientific Conferences Agentspace**.
    
3. Select **Preview** from the left-hand navigation pane to view the experience your users will see.
    
4. Notice that under the `For you` header, the app shows **the files you added to your Drive** and the upcoming **Astronomers Lunch Planning Meeting** you created. This home page is designed to give users easy access to the content and events they will find most useful.
    
    **Note:** Please note that even if the files appear, they may require a little time to become accessible.
    
5. In the search bar, enter the following query: `what are the planetcon dates?`
    
6. You should see a result that not only provides the updated date you edited in the second version of the document (re-scheduling the conference to November), but also provides icons linking to the source documents for reference.
    
    ![Search Result 1](https://cdn.qwiklabs.com/q03uP0PpGRy1ymc6hQzK01zDSGgMdIw0OkE%2Fj54%2B1gU%3D align="left")
    
7. Enter a different prompt in the primary search bar: `what is the size of Persephone compared to Earth?`
    
8. You should see a result that extracts the information you are looking for from the **Persephone Analysis Report.pdf** document you uploaded to your drive. Remember, there is no real exoplanet Persephone, so you know the model is pulling from your uploaded data. You can further validate this by clicking the **link icon** and the card that appears below the response to be taken directly to the file that serves as the source of this information.
    
    ![Search Result 2](https://cdn.qwiklabs.com/ftK1a12%2Fl0XqSEkiJpOPTWBe7gBkNMSO0KuOi%2Bh066A%3D align="left")
    
9. When you don’t have time to review a document, you can use the Agentspace AI assistant to create a useful summary for you. In the search bar, enter the following query: `summarize the document Persephone Analysis Report`.
    
10. Review the assistant’s response.
    
    ![Assistant Response](https://cdn.qwiklabs.com/%2FTE6d9orfNCSYPa3bIy%2Fcx9iIePabTz6J6m9KxCMvlA%3D align="left")
    
11. In the search bar, enter the following: `Create a 1-hour meeting tomorrow at 10am for exoplanet-research@qwiklabs.net to review conference presentation proposals.`
    
12. The assistant will prepare a template calendar event for you to approve.
    
13. **Authorize** the application using the OAuth Consent Screen you configured using your Qwiklabs student account.
    
14. Confirm the appearance of the event on your Google Calendar tab (or navigate to [calendar.google.com](https://calendar.google.com/calendar/u/0/r) in a new tab).
    
    ![Calender Meeting](https://cdn.qwiklabs.com/Cr0fdfZRp3j4IppIIdX5L2GiitJGJV5wVAa6AJ9D09k%3D align="left")
    
    ![Send Confirmation](https://cdn.qwiklabs.com/MIWlXwOWAfjU1VN5wHVEQZPHo0wVXfmqey96cKq1rFU%3D align="left")
    

## **Task 8. Open the hosted link to your application**

1. From your Agent Builder app’s menu, select **Integration** from the left-hand navigation pane.
    
2. Under **The link to your web app**, click **OPEN** to preview the hosted application. This is the application for your organization. When configuring Agentspace in production, you could use a DNS record to configure this home page to be accessible from a subdomain of your website, like `agentspace.my-domain.com`.
    
    ![Application Page](https://cdn.qwiklabs.com/sQKPUDbP8KjrCtobbESJQ39qKX4S%2B5wWcJGVTigoQjU%3D align="left")
    
    ---
    
    ## Solution of Lab
    
3. %[https://www.youtube.com/watch?v=HlRODI3tldQ&ab_channel=QuickLab%E2%98%81%EF%B8%8F]