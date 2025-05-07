---
title: "Publish your AppSheet App - GSP1030"
seoTitle: "Publish your AppSheet App - GSP1030"
seoDescription: "In this lab, you use AppSheet to deploy and publish your app so end users can access and use your app.

What you'll do

In this lab, you learn how to perfor"
datePublished: Fri Aug 09 2024 06:35:16 GMT+0000 (Coordinated Universal Time)
cuid: clzmc1noi000008l53a8n1w0w
slug: publish-your-appsheet-app-gsp1030
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723184663042/91bdea1a-3f55-4f62-9a51-71f1d43f74c9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723185300607/db9c2fe4-d740-4f0e-96c8-311e39c823b1.png
tags: publish-your-appsheet-app-gsp1030

---

## **Overview**

In this lab, you use AppSheet to deploy and publish your app so end users can access and use your app.

**What you'll do**

In this lab, you learn how to perform the following tasks:

* Run a deployment check on your app to check for any errors or warnings.
    
* Fix any errors and resolve any warnings that may be reported.
    
* Deploy and publish your app using instant deployment.
    
* Test the app as an app user.
    

---

### **Task 1. Create the app**

When working on your own or your company's app, you normally would incrementally build the app over a continuous project timeline.

Apps that you build are saved and accessible in the **Prototype Apps** section on the **My Apps** page until they are deployed and published.

In this task, you create the app that was built in a previous lab, using a template.

**Delete prototype app (if listed)**

In the lab environment on some occasions it's possible that the app built in a previous lab is still listed in the **Prototype Apps** section. You cannot use this app to continue working on this lab since the underlying data is not available for use by the app.

The app must first be deleted before continuing with this lab.

1. If the *Customer Contacts* app is listed, click the 3-dots menu () and select **Delete** to delete the app.
    
2. Click **Ok** to confirm the deletion.
    

**Copy the app to your AppSheet account**

1. Click the [link](https://www.appsheet.com/Template/AppDef?appName=Lab3-CustomerContacts-3856613) to copy the *Customer contacts* app to your AppSheet account.
    
2. In the left menu, click the **Copy app** icon.
    
3. On the **Copy App** form, specify the following, and leave the remaining settings as their defaults:
    
    <table><tbody><tr><td colspan="1" rowspan="1"><p><strong>Property</strong></p></td><td colspan="1" rowspan="1"><p><strong>Value</strong><br>(type or select)</p></td></tr><tr><td colspan="1" rowspan="1"><p>App name</p></td><td colspan="1" rowspan="1"><p>Customer Contacts</p></td></tr></tbody></table>
    
4. Click **Copy app**.
    

Your app is set up with the original contacts and companies data sources, and you can now continue to build out the app's functionality.

Click *Check my progress* to verify the objective.

Create the app

**Check my progress**

### **Task 2. Check your app for errors or warnings**

In this task, you check your app for any errors or warnings by running a deployment check.

**Run a deployment check**

1. To run a deployment check on your app, navigate to the **Manage &gt; Deploy** tab in the AppSheet UI.
    
2. Click **Deployment Check**.
    
    ![Deployment Check section of the AppSheet UI.](https://cdn.qwiklabs.com/Rs9WfPA1%2Bz3%2FOawRgt5hMm%2FV5vQoV8mUP4APiBjeAhU%3D align="left")
    
3. Click **Run Deployment Check**.
    
    ![Run deployment check button.](https://cdn.qwiklabs.com/5S3i%2FT3oUwNKK78IB1tgTm7ow4hlbAlrVj9twIOXBxk%3D align="left")
    
    The output of the deployment check lists any errors or warnings that you should fix, before deploying the app.
    

**Inspect the deployment check report**

* View the report to look for any errors or warnings from the deployment check. Scroll to see the full list of issues.
    
    ![Deployment check report.](https://cdn.qwiklabs.com/q6rb%2FrivESjr5p2IiFmdu5JLrap4v6HU8vnGNIKezQs%3D align="left")
    
    The report contains a few errors or warnings. You fix these issues in the next task.
    

### **Task 3. Fix any errors and warnings from the deployment check**

In this task, you review the details of each error or warning as reported in the output of the deployment check and fix them.

**Note:** Warnings do not prevent you from deploying your app, but you must fix any errors that are reported. It is a good practice to review all warnings and resolve them if possible.

**Fix the *Data structure* error**

1. Click the *Data matches expected structure* error.
    
    The section expands to provide more details on the error.
    
    ![Data structure error notification.](https://cdn.qwiklabs.com/frhC9GssrSIb3q4TDQAJa%2B1RgFUZ5Ft%2F3oZVkYFQU7c%3D align="left")
    
2. Click **More info** to view more details about this error.
    
    From the description of the error, you can see that there is a mismatch between the name of the `Company ID` column in the app definition and the name of the column `Company` in the `contacts` Google sheet.
    
3. To fix this error, navigate to the **Data** section in the AppSheet editor, and click **contacts** to open the table definition.
    
4. Edit the name of the `Company ID` column and update it to `Company`.
    
5. The `Company` column is also used in the app formula expression for the `Related contacts` reverse reference column in the `Companies` table, which must be updated.
    
    In **Data**, click **companies** to open the table definition.
    
6. Click into the **Formula** field of the `Related contacts` column definition to bring up the Expression Assistant.
    
    ![Expression Assistant shows related contacts error.](https://cdn.qwiklabs.com/3%2B9LqPSkgEVQyIFwnG5XLXDiP2PyoUl3YDppsAQCXzg%3D align="left")
    
7. Edit the **App Formula** expression to update the column name to `Company`.
    
    ![Expression updated to use company.](https://cdn.qwiklabs.com/G1E9zdd2x3x6x0Vf4IvjMDVCzgUzs9sRDG5dsWXc4cM%3D align="left")
    
8. Click **Save** in the Expression Assistant.
    
9. Click **Save** to save your app changes.
    

**Fix the *App description* warning**

It is a good practice to include a short description of your app.

1. Click the *App description* warning.
    
    The section expands to provide more details on the warning.
    
    ![App description warning.](https://cdn.qwiklabs.com/7wk2h%2FkBm2WGXf6ts5PcHJsnVOcDMo%2FCP2v2WJ6lzT8%3D align="left")
    
    Click **More info** to get more details on the issues reported that include the likely cause and resolution steps.
    
2. To fix the *App description* warning, navigate to the **Settings**, and then click on **Information** under *settings* in the **AppSheet UI**.
    
3. Click **App Properties**.
    
4. In the **App Properties** form, specify the following, and leave the remaining settings as their defaults:
    
    <table><tbody><tr><td colspan="1" rowspan="1"><p><strong>Property</strong></p></td><td colspan="1" rowspan="1"><p><strong>Value</strong><br>(type or select)</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Short Description</strong></p></td><td colspan="1" rowspan="1"><p>An app to manage all of your customers and contacts in one place.</p></td></tr><tr><td colspan="1" rowspan="1"><p><strong>Industry</strong></p></td><td colspan="1" rowspan="1"><p>Business Services</p></td></tr></tbody></table>
    
5. Click **Save** to save your changes.
    

**Fix the *Custom launch icon* warning**

Your app is already configured to use one of the logo icons provided by AppSheet. This warning is to remind you to change the logo to your own custom icon.

1. Click the *Use custom app launch icon* warning.
    
    The section expands to provide more details on the warning.
    
    Optionally, click **More info** to get more details on the issues reported that include the likely cause and resolution steps.
    
2. To provide a custom app launch icon for your app, navigate to the **Settings &gt; Theme & Brand** pane in the AppSheet UI.
    
3. For **App logo**, select **Custom** from the dropdown list.
    
4. Copy and paste the url below in the edit box to the right of the logo:
    
    ```plaintext
    https://storage.googleapis.com/cloud-training/T-APSDEV-B/app_logo.png
    ```
    
    ![Custom app logo configuration in AppSheet UI.](https://cdn.qwiklabs.com/lBTyv1H0bPxmcU1qSfPd%2BJKfUXEaJ4RGIEgvXBHXYvM%3D align="left")
    
5. Click **Save** to save your changes.
    

**Fix the *Content caching on the mobile device* warning**

This warning indicates that your app could benefit from offline device caching of images and documents.

1. Click the *Content caching on the mobile device* warning.
    
    The section expands to provide more details on the warning.
    
    Optionally, click **More info** to get more details on the issues reported that include the likely cause and resolution steps.
    
2. To enable this option, navigate to the **Settings &gt; Offline mode** pane in the AppSheet UI.
    
    In the **Offline Use** section.
    
3. Enable the **Store content for offline use** option.
    
    ![Offline content caching toggle enabled.](https://cdn.qwiklabs.com/OtuW6T6xfF7jklkN3r0q6PS62N%2BfASOMiFtSA43ao9U%3D align="left")
    
    Learn more about [offline content caching](https://support.google.com/appsheet/answer/10107724?hl=en&sjid=17474723929298268020-AP) at the AppSheet documentation site.
    
4. Click **Save** to save your changes.
    

### **Task 4. Re-run the deployment check**

Once you have fixed all errors and fixed or reviewed any warnings, you should run the deployment check again.

**Run the deployment check**

1. Navigate to the **Manage &gt; Deploy** tab in the AppSheet UI.
    
2. If the deployment check report from the previous run is open, click **Continue editing**, otherwise click on the **Deployment Check** panel to expand it.
    
3. Click **Run Deployment Check**.
    
    The output of the deployment check should contain no errors or warnings. We can now go ahead and deploy the app in the next task.
    

### **Task 5. Deploy and test the app**

In this task, you deploy the app and test it outside of the AppSheet UI directly within a browser.

**Deploy the app**

* In the **Deployment Check** panel, click **Move app to deployed state**.
    
    AppSheet now deploys your app and changes the app's state to *Deployed*.
    
    ![AppSheet UI confirms app is deployed.](https://cdn.qwiklabs.com/k1itSaYEeds%2B2hLoywbEYTQ44028XVntDYbTabQRRfo%3D align="left")
    

**Test the app**

1. In the AppSheet UI, click the **Share** icon.
    
2. In the **Share app** dialog, click **Copy sharing links**.
    
3. Copy the **Browser Link** by clicking on the copy icon.
    
4. To open the app, paste the link in a separate browser window.
    
5. Alternatively, click on the **Open in tab** icon in the upper-right corner of the AppSheet editor above the app preview.
    
6. The app should load in the new browser window.
    
    ![App loaded in browser.](https://cdn.qwiklabs.com/w7eUev9UI9I6y3JTuBz6U4JdqreNgRxPNf%2FgmbGgMyE%3D align="left")
    
7. Test out the features of the app from the desktop browser to make sure all the functionality works as expected.
    
8. From the desktop browser that is running the app, click the **ShipTo** icon to open the shipping form.
    
9. In the form specify the following, and leave the remaining settings as their defaults:
    
    <table><tbody><tr><td colspan="1" rowspan="1"><p><strong>Property</strong></p></td><td colspan="1" rowspan="1"><p><strong>Value</strong><br>(type or select)</p></td></tr><tr><td colspan="1" rowspan="1"><p>Product Name</p></td><td colspan="1" rowspan="1"><p>Test Product</p></td></tr><tr><td colspan="1" rowspan="1"><p>Quantity</p></td><td colspan="1" rowspan="1"><p>4</p></td></tr><tr><td colspan="1" rowspan="1"><p>Status</p></td><td colspan="1" rowspan="1"><p>New</p></td></tr><tr><td colspan="1" rowspan="1"><p>Company</p></td><td colspan="1" rowspan="1"><p>Any company from the list</p></td></tr></tbody></table>
    
    Verify that the app automatically displays the *Shipping Info* based on the selected *company*.
    
10. Click **Save** to submit the form and save the new shipping entry to the *shipTo* table.
    

Click *Check my progress* to verify the objective.

Deploy and test the app

**Check my progress**

### **Task 6. Share your app**

Once you have fully tested your app, you can share the app with yourself or any user so that they can download and start using the app.

**Add users**

The first step in sharing your app with users is to add them as users of your app.

1. To add a user to your app, click in the AppSheet UI.
    
2. In the **Share app** dialog, type a valid email address.
    
    **Note:** Type your own valid email address so you can run the app as a user on your device in the next task.
    
3. Optionally, you can add any additional user email addresses.
    
4. Check the **reCaptcha** box to verify that you are not a robot.
    
5. Optionally, update the invite message.
    
6. Click **Send**.
    
    **Note:** The reCaptcha verification has an expiry time, so you may have to check it again if it times out.
    

**Verify receipt of the email**

* Login to the email account you used in the previous task and verify that the email was received.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=x0iZ1hVFtTA] 

Download File: [GSP1030.xlsx](https://github.com/ePlus-DEV/storage/tree/main/labs/GSP1030)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723185410351/6b3ee508-d980-48ca-a02a-602a9da01b87.png align="center")