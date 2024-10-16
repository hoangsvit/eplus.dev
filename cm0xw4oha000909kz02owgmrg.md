---
title: "Google Sheets: Getting Started - GSP469"
seoTitle: "Google Sheets: Getting Started - GSP469"
seoDescription: "Google Sheets is a cloud-based application that provides advanced, fast, online spreadsheets. Designed with collaboration and convenience in mind, you can a"
datePublished: Wed Sep 11 2024 13:22:39 GMT+0000 (Coordinated Universal Time)
cuid: cm0xw4oha000909kz02owgmrg
slug: google-sheets-getting-started-gsp469
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726060128755/46e79a56-9dc6-40ad-b7a9-0e5319456ebb.jpeg
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1726060952262/d342b7d3-57a5-46d8-8809-7cb181812ecf.jpeg

---

## **Overview**

Google Sheets is a cloud-based application that provides advanced, fast, online spreadsheets. Designed with collaboration and convenience in mind, you can analyze data with charts and filters, handle task lists, create project plans, and more with your team from any online device. All changes are saved automatically and in one place. Use Google Sheets to create, edit, and collaborate wherever you are.

### What you'll learn

In this lab, you use Sheets to do the following:

* Create, update, and customize a spreadsheet
    
* Analyze data
    
* Share a spreadsheet
    
* Access other apps from a spreadsheet
    

**Note:** To use Google Sheets on your Android mobile device, install [Google Sheets](https://play.google.com/store/apps/details?id=com.google.android.apps.docs.editors.sheets).

To use Google Sheets on your IOS mobile device, install [Google Sheets](https://itunes.apple.com/app/google-sheets/id842849113).

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

When you are ready, click **Start Lab** in the upper left panel.

### Find your lab's User Email and Password

To access the resources and console for this lab, locate the **User Email** and **Password** in the left panel. These are the credentials you use to log in to Google Drive.

If your lab requires other resource identifiers or connection-related information, these will also appear on this panel.

### Sign in to Google Sheets

1. Click **Open Google Sheets**
    

***Tip:*** Open the tabs in separate windows, side-by-side.

2. Notice the User Email field has been pre-filled. Click **Next**.
    
3. Enter the **Password** and click **Next**.
    
4. Accept all terms and conditions as prompted.
    

Google Sheets opens and you are signed in to your Student Google Account.

## **Task 1. Open a sample spreadsheet**

To open a sample spreadsheet:

1. Click [Explore this data](https://docs.google.com/spreadsheets/d/19iLO-XbrqqWRuqphkXTax0lFn71NW6crJK504JvAxoU/edit#gid=599358521) to open a sample spreadsheet.
    
2. Make a copy. Select **File &gt; Make a copy**.
    
3. Leave the **Name** and **Folder** fields at the default values and click **Make a copy**.
    

Click *Check my progress* to verify the objective.

Open and copy a sample spreadsheet

**Check my progress**

### Export data

Export the spreadsheet data to your local device to use later in this lab.

1. Select **File** &gt; **Download** &gt; **Comma-separated values (.csv)**.
    
2. Close the browser tab to close this spreadsheet.
    
3. Also close the original `Explore this data (budget request by department)` spreadsheet if it is still open.
    

Only these lab instructions and Sheets are open in the remaining browser tabs or windows.

4. Find the .csv file you downloaded to your local computer and rename it `exported-data`.
    

## **Task 2. Import a spreadsheet**

You can easily import data from other spreadsheets and convert into Sheets.

In this section you import the data file you exported earlier, `exported-data.csv` to your Drive, and then open the file with Sheets to create a new spreadsheet.

1. Open [Google Drive](https://drive.google.com/) in a new browser tab.
    
2. In the upper left corner, click **New** &gt; **File Upload**.
    
3. Choose `exported-data.csv` from your computer to add it to Drive.
    

Alternatively, you can drag the csv file from your local computer to your Drive.

4. To convert `exported-data.csv` to a Google Sheet:
    

* In Drive, right-click `exported-data.csv`.
    
* Select **Open with** and choose **Google Sheets**.
    

When you import or convert a spreadsheet, Sheets creates a copy of the original file in Sheets format. You can then edit the new file in your browser as you would with any other Sheet.

Have other types of spreadsheets? If so, try importing it to Drive and converting it to a Google Sheet.

**Note:** Supported files include .xls, .xlsx, .xlt, .ods, .csv, .tsv, .txt, and .tab.

If you upload a Microsoft® Excel® spreadsheet into Drive, you can also update them without converting to Sheets.

Click *Check my progress* to verify the objective.

Import and convert old spreadsheets to Sheets

**Check my progress**

## **Task 3. Create a spreadsheet**

In this section, you learn how to:

* Enter and edit your data
    
* Customize your spreadsheet
    
* Work with rows, columns, and cells
    
* Work with multiple sheets
    

### Create a new spreadsheet

1. Go back to the MyDrive browser tab.
    
2. Click on the Google apps icon and select **Google Sheets**.
    

![The navigation path to the highlighted Sheets tile.](https://cdn.qwiklabs.com/tIBbetIUFFXkVt7dYTTzie4uw8AWxDUNVLm1OUbZGBk%3D align="left")

3. In the **Start a new spreadsheet** section, click the plus sign to create a blank template.
    

### Enter and edit your data

1. Rename your spreadsheet: click **Untitled spreadsheet** and enter `important-data`.
    
2. Enter a header row and data: click a cell, type content, and then press **Enter** or click outside of the cell.
    

An example spreadsheet:

![An example spreadsheet which lists 22 rows of bakery items sold. Column titles include; Day, Product, Price, and # Sold.](https://cdn.qwiklabs.com/%2FD%2Bx95aKHqw22qes%2FvLfZMS01RuOWgkjEfIHh8za0Ak%3D align="left")

Notice in the example spreadsheet above, the numbers in column C have a currency format applied. To do this you would:

* Select the C column.
    
* Choose **Format** &gt; **Number** &gt; **Currency** from the menu bar.
    

3. Insert more items, click **Insert** and experiment by adding charts, images, drawings, functions, notes, and more.
    

**Note:** To see which functions are available, see the [Google spreadsheets function list.](https://support.google.com/docs/table/25273)

4. (Optional) Use the Explore feature to analyze your spreadsheet.
    

* Experiment with analysis suggestions.
    
* Can you put a pie chart in your spreadsheet?
    

### Customize your spreadsheet

Experiment with the spreadsheet you made in the last section. Select cells in your spreadsheet and then format them using the toolbar options.

### Work with rows, columns, and cells

1. **Add rows, columns, and cells** — Select a cell or block of cells. Then, on the menu bar, click **Insert** and choose where to add the row column, or cells.
    
2. **Delete or hide rows and columns** — Right-click the row number or column letter and select **Delete** or **Hide**.
    
3. **Delete a cell or a block of cells** — Select the cells you want to delete. Click **Edit** &gt; **Delete cells and shift up**, or **Edit** &gt; **Delete cells and shift left**.
    
4. **Move rows and columns** — Click the row number or column letter to select it. Then, drag it to a new location.
    
5. **Freeze header rows and columns** — Keep some data in the same place as you scroll through the rest of your spreadsheet. On the menu bar, click **View** &gt; **Freeze** and choose an option.
    

### Work with multiple sheets

**Rename a sheet:**

1. At the bottom of your spreadsheet, double-click `Sheet1`.
    
2. When you see it highlighted, rename it **Overview**.
    

**Add a sheet:**

1. At the bottom left of your spreadsheet, click **Add Sheet** (+) to add another sheet.
    
2. Name this sheet `Detail`.
    

**Copy a sheet:**

1. At the bottom of your spreadsheet, click the down arrow of `Detail`.
    
2. Select **Duplicate**.
    

**Delete a sheet:**

1. At the bottom of your spreadsheet, click the down arrow of `Copy of Detail`. Select **Delete**.
    
2. Click **OK** to confirm.
    

Click *Check my progress* to verify the objective.

Customize your spreadsheet

**Check my progress**

## **Task 4. Share and collaborate**

Share your spreadsheet with your team or people outside your company. When you collaborate, people can make changes at the same time, and you can see their changes as they happen.

In this section, you learn how to:

* Share spreadsheets
    
* Unshare spreadsheets
    
* Add comments and replies
    
* Chat with people directly
    

### Share spreadsheets

**Share a file or folder with specific people:**

You can only share files that you own or have edit access to.

1. Using the same `important-data` file, in Sheets, in the upper right, select **Share**.
    
2. Under **Share with people and groups**, enter the email address of the person or group you want to share with.
    
3. Click **Editor** (on the right) and choose the access level:
    

* **Editor**: Collaborators can add and edit content as well as add comments.
    
* **Commenter** (Select files only): Collaborators can add comments, but can't edit content.
    
* **Viewer**: People can view the file, but cannot edit or add comments.
    

4. Click **Send**.
    

Everyone you share with receives an email with a link to the file or folder.

**Note:** You may receive a message that the admin policy prohibits sharing items to a particular email address. You can ignore it as this lab is for demonstration purposes only.

5. (Optional) To add a note to the email, enter your note. To skip sending an email, uncheck the **Notify people** box.
    

**Share a link to a file or folder:**

Send other people a link to a file or folder so that anyone with the link can open it. When you share a link, your name appears as the owner.

You can only share files that you own or have edit access to.

1. In Sheets, in the upper right, select **Share**.
    
2. Click **Restricted** and select **Qwiklabs**.
    
3. Click **Viewer** (to the right of Qwiklabs) and choose the access level:
    

* Editor: Collaborators can add and edit content as well as add comments.
    
* Commenter (Select files only): Collaborators can add comments, but can't edit content.
    
* Viewer: People can view the file, but not edit or add comments.
    

4. Click **Copy link**.
    
5. Click **Done**.
    
6. You can now paste the link in an email or any place you want to share it.
    

Click *Check my progress* to verify the objective.

Share a link to a file or folder

**Check my progress**

### Unshare spreadsheets

**Stop sharing a file or folder you own:**

1. In Drive, select the shared file or folder.
    
2. Right-click on the file and select **Share**.
    
3. If you had successfully shared the file to a person in the previous step, click the access level (i.e. Editor, Viewer, Commenter) next to the person you want to stop sharing the file or folder with and click **Remove**.
    
4. Click **Save changes**.
    

**Delete a link to a file or folder you own:**

When you delete a link to a file or folder that you own, the only people who can still see it are you and anyone you share it with.

1. In Drive, right-click on a file or folder and select **Share**.
    
2. Click **Qwiklabs** and select **Restricted**.
    
3. Click **Done**.
    

### Add comments and replies

1. In an open spreadsheet, select a cell or cells you'd like to comment on.
    
2. Do one of the following:
    

* Click the comment icon
    
    ![comment icon](https://cdn.qwiklabs.com/3z2s%2FktQzPzsG2p8ItwCZ1Ll%2BAghfGUGHqr06ASyLC8%3D align="left")
    
    in the formatting bar at the top.
    
* Right click on the cell or cells and click **Comment**.
    

3. Enter your comment in the box.
    
4. (Optional) To direct your task or comment to a specific person, enter an At Sign (@) followed by their email address. You can add as many people as you want. Each person will get an email with your comment and a link to the file.
    
5. (Optional) To assign the comment to a specific person, check the **Assign to** box.
    
6. Click **Comment** or **Assign**.
    

### Chat with people directly with Google Chat (information only)

**Note:** This feature requires that you and at least one other person have this sheet open at the same time. Because the admin policy for this lab prohibits you from sharing, this feature is not available for you in this lab.

You can collaborate in real time over Google Chat, too. If more than one person has your spreadsheet open, just click **Show chat** to open a group chat.

![Show chat icon](https://cdn.qwiklabs.com/jE82FCYBx0F3kh%2BvCKIiS6wpPJPn7ntKvPvRm%2Fypn5g%3D align="left")

You can get instant feedback without ever leaving your spreadsheet.

### Present your spreadsheet directly from Google Meet (information only)

**Note:** This feature requires that you and at least one other person have this sheet open at the same time. Because the admin policy for the lab prohibits you from sharing, this feature is not available for you in this lab.

To discuss your spreadsheet with team members, open Google Meet directly from Sheets to present and discuss your data. Click **Join a call here or present this tab to a call** to start or join a meeting.

![Join a call icon](https://cdn.qwiklabs.com/bcGh%2FgDjvyv7g%2FlkpA29j5UlCBSOtVCfGeUKqZaqB84%3D align="left")

---

## Solution of Lab

%[https://www.youtube.com/watch?v=-abpaniEL4Y] 

**Download the below 2 files:**

* 🚀 **Exported Data File** [**Click here!**](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP469/exported-data.csv)
    
* 🚀 **Important Data** [**Click here!**](https://github.com/ePlus-DEV/storage/blob/main/labs/GSP469/important-data.xlsx)
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1726061051625/b9d64c37-0307-41f1-93f1-75453e217235.png align="center")