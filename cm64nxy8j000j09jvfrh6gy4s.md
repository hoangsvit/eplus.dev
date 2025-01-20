---
title: "Creating a De-identified Copy of Data in Cloud Storage - GSP1073"
seoTitle: "Creating a De-identified Copy of Data in Cloud Storage - GSP1073"
seoDescription: "Sensitive Data Protection is a fully managed service designed to help discover, classify, and protect sensitive information. In this lab, you create and run"
datePublished: Mon Jan 20 2025 06:26:24 GMT+0000 (Coordinated Universal Time)
cuid: cm64nxy8j000j09jvfrh6gy4s
slug: creating-a-de-identified-copy-of-data-in-cloud-storage-gsp1073
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737354356410/6d2e578e-da89-4b5d-aa8d-1c182e23eeec.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1737354370832/31019451-0994-4a28-b1ba-110a94f5e5ce.png
tags: creating-a-de-identified-copy-of-data-in-cloud-storage-gsp1073, gsp1073

---

## **Overview**

[Sensitive Data Protection](https://cloud.google.com/dlp) is a fully managed service designed to help discover, classify, and protect sensitive information. In this lab, you create and run a Sensitive Data Protection job using the De-identify (DeID) Findings Action to create a redacted and de-identified copy of some data in Cloud Storage. You also learn how to create a de-identification template to define how to redact the data.

![De-identification process overview diagram showing Input and Output buckets](https://cdn.qwiklabs.com/BkSH3ritKiNeZgwBTI7a2GTaHzk%2B4WoSmh071eaGF1c%3D align="left")

As part of the setup process of this lab, an "input" Cloud Storage bucket with sample folders and files, as well as an "output" Cloud Storage bucket for the redacted data have been created for you.

## **Objectives**

In this lab, you:

* Create a Sensitive Data Protection de-identification template for structured and unstructured data
    
* Configure a Sensitive Data Protection Inspection Job Trigger with De-identify Findings Action enabled
    
* Create a Sensitive Data Protection Inspection Job
    
* View results of the inspection job and view new de-identified files in Cloud Storage
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

### How to start your lab and sign in to the Google Cloud console

1. Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    * The Open Google Cloud console button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-04-62859cff6ca7@qwiklabs.net
    ```
    
    Copied!content\_copy
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    gwnVQo94xPLt
    ```
    
    Copied!content\_copy
    
    You can also find the Password in the Lab Details pane.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="left")

## **Task 1. Create de-identify templates**

### Create a template for unstructured data

In this section, you configure and create a de-identify template for unstructured data.

1. In the Google Cloud console, in the **Navigation menu** (), click **Security &gt;** [**Data Loss Prevention**](https://console.cloud.google.com/security/dlp/).
    
2. Click the **Configuration** tab.
    
3. In the **Configuration** &gt; **Templates** section, click **Create Template**.
    

![create template](https://cdn.qwiklabs.com/JMI8jMKjp2A%2BnheT4jj3ZEQkDKyc6KNZj3thgBGfrWc%3D align="left")

4. On the **Create Template** page, define the following options:
    
    * For **Template type**, select **De-identify (remove sensitive data)**.
        
    * Fo **Data transformation type** select **InfoType**
        
    * For **Template ID**, enter `deid_unstruct1`
        
    * For **Display name,** enter `deid_unstruct1 template`
        
    * For **Description**, leave the field empty.
        
    * For **Resource location**, use the default setting **Global (any region)**.
        
5. Click **Continue**.
    
6. For the **Transformation Rule** select *Replace with infoType name*.
    
7. For **InfoTypes to transform** select *Any detected infoTypes defined in an inspection template or inspect config that are not specified in other rules*.
    

![configure deidentification](https://cdn.qwiklabs.com/P2I%2FH5Le2rmJlMl7dgrBvM4dQOULfQI3N3nEN0U49Wg%3D align="left")

8. Click **Create**.
    

Click *Check my progress* to verify the objective.

Create a Template for Unstructured Data

Check my progress

### Create a template for structured data

In this section, you configure and create a de-identify template for structured data.

1. In the Google Cloud console, navigate back to the [Data Loss Prevention](https://console.cloud.google.com/security/dlp/) page.
    
2. Click the **Configuration** tab.
    
3. In the **Configuration** &gt; **Templates** section, click **Create Template**.
    

![create template](https://cdn.qwiklabs.com/SH51h4bFgl3MVZrk1dQCVoGtfbXgDfyOfx%2FIq6HrQCA%3D align="left")

4. On the **Create Template** page, define the following options:
    
    * For **Template type**, select **De-identify (remove sensitive data)**.
        
    * Fo **Data transformation type** select **Record**
        
    * For **Template ID**, enter `deid_struct1`
        
    * For **Display name,** enter `deid_struct1 template`
        
    * For **Description**, leave the field empty.
        
    * For **Resource location**, use the default setting **Global (any region)**.
        
5. Click **Continue**.
    
6. For the **Transformation Rule** add the following field names: `ssn` `ccn` `email` `vin` `id` `agent_id` `user_id`.
    

![configure structured deidentification](https://cdn.qwiklabs.com/G8x%2FYPbLnBdTHkTpVv1d%2FK34Z0inu5UY2R46M%2BfMD%2BE%3D align="left")

7. For the **Transformation type** select *Primitive field transformation*.
    
8. For **Transformation method** select *Replace*. This replaces the contents of every cell for fields that match any in the list you provided.
    
9. Click **\+ Add Transformation Rule**.
    
10. For this new rule add the field: `message`.
    
11. For the **Transformation type** select *Match on infoType* and click **Add Transformation**.
    
12. For the **Transformation Method** select *Replace with infoType name*.
    
13. For **InfoTypes to transform** select *Any detected infoTypes defined in an inspection template or inspect config that are not specified in other rules*. This applies infoType inspection and redaction to any files with a field called `message`.
    

![configure structured deidentification final config](https://cdn.qwiklabs.com/PKJkWHa2ZzOxPkXSv6shT%2FOYlHU%2Bc9ldjAsc0WGOL%2B0%3D align="left")

13. Click **Create**.
    

Click *Check my progress* to verify the objective.

Create a template for structured data

Check my progress

## **Task 2. Create a DLP inspection job trigger**

1. In the Google Cloud console, navigate back to the [Data Loss Prevention](https://console.cloud.google.com/security/dlp/) page.
    
2. Click the **Inspection** tab.
    
3. Click **Create Job and Job Triggers**.
    
4. To configure input data, do the following:
    
    * In the **Name** section, define the following options:
        
        * For **Job ID**, enter `DeID_Storage_Demo1`.
            
        * Keep Resource location set to **Global (any region)**.
            
    * In the **Storage type** list, select **Google Cloud Storage**, and then define the following options:
        
        * For the **Location Type** select *Scan a bucket with optional include/exclude rules*.
            
        * For the URL enter: `qwiklabs-gcp-00-faa709f5e30d-input`
            
        * Set “Percentage of included objects scanned within the bucket” to **100%** and select **No Sampling**
            

**Note:** For the storage bucket URL, make sure there are no whitespaces.

![configure DLP job](https://cdn.qwiklabs.com/71eZfwOPYNZtDO2F4uHOm%2BNGMbiOSGPH6%2Fe7meqIzTg%3D align="left")

5. Leave the rest of the fields as default and click **Continue**.
    
6. Under **Configure detection**, leave all fields as default and click **Continue**.
    
7. Under **Add Actions**, toggle to enable **Make a de-identify copy**.
    
8. Enter the two templates that you created above in the respective boxes:
    
    * `projects/qwiklabs-gcp-00-faa709f5e30d/locations/global/deidentifyTemplates/deid_unstruct1`
        
    * `projects/qwiklabs-gcp-00-faa709f5e30d/locations/global/deidentifyTemplates/deid_struct1`
        

**Note:** make sure there are no spaces in the de-identification template paths.

![DLP templates](https://cdn.qwiklabs.com/s%2FORA475DX7k%2FEBVdSq0IWtm9RQexUtq6xX8%2BhkyIz8%3D align="left")

9. For the **Cloud Storage output location** specify: `gs://qwiklabs-gcp-00-faa709f5e30d-output`
    

This specifies to write the redacted output to the second bucket that was created for you.

10. Click **Continue**.
    
11. For **Schedule**, select **Create a trigger to run the job on a periodic schedule** and select **Weekly**.
    
12. Click **Continue**.
    
13. Scroll down and click **Create** &gt; **Confirm Create**.
    
14. You should now have a job under **Inspection** &gt; **Job Triggers**.
    

![job starting](https://cdn.qwiklabs.com/5aURUIzMmV2tDWaSAUJW7R4Bpt2fq8KjOAyiZIeoarQ%3D align="left")

Click *Check my progress* to verify the objective.

Create a DLP Inspection Job Trigger

Check my progress

## **Task 3. Run DLP Inspection and review results**

1. In the Google Cloud console, navigate back to the [Data Loss Prevention](https://console.cloud.google.com/security/dlp/) page.
    
2. Click the **Inspection** tab.
    
3. Under **Job Triggers** you should see the job trigger that you created.
    
4. Select this job trigger.
    
5. Click **Run Now**.
    
6. This creates and runs a new job instance.
    
7. Select the job instance from the section below **triggered jobs**.
    

**Note:** If you do not see a job, you may need to refresh the screen or wait a minute and refresh.

8. Monitor the job and wait for it to say **Done**.
    
9. Once Done, review the results on this page to see what was found in the bucket.
    

Great! You should see your findings populated and an overview of your job results at the bottom.

![DLP job complete](https://cdn.qwiklabs.com/FON9%2B5q1TbMrZ1DdtFPWIlOg2wCkR8pCF%2BqaFi0SaPI%3D align="left")

### View de-identified output

1. On the job results page, click on **Configuration**.
    
2. Scroll down to the section **Output bucket for de-identified Cloud Storage Data**.
    
3. Click on the bucket link to be taken to that Cloud Storage Bucket.
    
4. Explore the various folders and files to see what has been redacted. For example click on one of the image in the image folder should show something like:
    

![redacted image](https://cdn.qwiklabs.com/MW2f8moXXYR0KrN6m0x1cAgkHZEXk5CKDDyJTb0sKmM%3D align="left")

For further exploration, you can try the following:

* Change the settings in the de-identification templates to try out different ways to de-identify and transform data. See the [transformation reference here](https://cloud.google.com/dlp/docs/transformations-reference). You can also try turning on different tokenization or pseudonymization methods using Cloud KMS.
    
* Try editing the DLP Job Trigger and adjusting what kind of data is being inspected for and then run another job by clicking “Run Now” from the triggers page. For example, if you turn off `PERSON_NAME` detection, the names should no longer be redacted.
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=QSHX7gFDwK8&ab_channel=QUICKGCPLAB] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Creating%20a%20De-identified%20Copy%20of%20Data%20in%20Cloud%20Storage/gsp1073.sh
sudo chmod +x gsp1073.sh
./gsp1073.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737354186831/8599ccca-c547-4358-9777-6aae6025079f.png align="center")