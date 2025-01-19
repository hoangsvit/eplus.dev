---
title: "Redacting Confidential Data within your Pipelines in Cloud Data Fusion - GSP811"
seoTitle: "Redacting Confidential Data within your Pipelines in Cloud Data Fusion"
seoDescription: "In this lab, you wil learn how to use the Sensitive Data Protection plugin for Cloud Fusion to redact sensitive data.

Consider the following scenario, in w"
datePublished: Sun Jan 19 2025 09:12:15 GMT+0000 (Coordinated Universal Time)
cuid: cm63efehs000509kz1vezc0eh
slug: redacting-confidential-data-within-your-pipelines-in-cloud-data-fusion-gsp811
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737277606065/d4935035-b950-4281-84a8-53d2bbd8d6de.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1737277706452/2151f2ec-b6c6-4953-92ff-8d929d2a7105.png
tags: redacting-confidential-data-within-your-pipelines-in-cloud-data-fusion-gsp811, redacting-confidential-data-within-your-pipelines-in-cloud-data-fusion, gsp811

---

## **Overview**

In this lab, you wil learn how to use the [Sensitive Data Protection plugin](https://cloud.google.com/dlp/docs) for Cloud Fusion to redact sensitive data.

Consider the following scenario, in which some sensitive customer information needs to be redacted.

**Scenario:** Your support team documents the details of each support case they handle in a support ticket. All of the information in the support tickets is pulled into a CSV file. The support technicians are not supposed to document any customer information that's considered sensitive, but sometimes they mistakenly do so. You notice that in the CSV file some customers' phone numbers appear.

You want to go through the CSV file and hide all phone numbers. You create a Cloud Data Fusion pipeline that redacts the sensitive customer data by using the Sensitive Data Protection plugin.

You will create a pipeline that does the following:

* Redacts customer phone numbers and emails by masking them with the # character.
    
* Stores the masked sensitive data and the non-sensitive data in a Cloud Storage.
    

### Objectives

In this lab, you will learn how to do the following:

* Connect Cloud Data Fusion to a Cloud Storage source.
    
* Deploy the Sensitive Data Protection plugin.
    
* Create a custom Sensitive Data Protection template.
    
* Use the Redact transform plugin to mask sensitive customer data.
    
* Write the output data to Cloud Storage.
    

## **Setup and requirements**

For each lab, you get a new Google Cloud project and set of resources for a fixed time at no cost.

1. Sign in to Google Cloud Skills Boost using an **incognito window**.
    
2. Note the lab's access time (for example, 02:00:00), and make sure you can finish within that time.  
    There is no pause feature. You can restart if needed, but you have to start at the beginning.
    
3. When ready, click **Start lab**.
    
    **Note:** Once you click **Start lab**, it will take about **15 - 20 minutes** for the lab to provision necessary resources and create a Data Fusion instance. During that time, you can read through the steps below to get familiar with the goals of the lab.
    
    When you see lab credentials (**Username** and **Password**) in the left panel, the instance is created and you can continue logging into the console.
    
4. Note your lab credentials (**Username** and **Password**). You will use them to sign in to the Google Cloud console.
    
5. Click **Open Google console**.
    
6. Click **Use another account** and copy/paste credentials for **this** lab into the prompts.  
    If you use other credentials, you'll receive errors or **incur charges**.
    
7. Accept the terms and skip the recovery resource page.
    

**Note:** Do not click **End lab** unless you have finished the lab or want to restart it. This clears your work and removes the project.

### Log in to Google Cloud Console

1. Using the browser tab or window you are using for this lab session, copy the **Username** from the **Connection Details** panel and click the **Open Google Console** button.
    

**Note:** If you are asked to choose an account, click **Use another account**.

2. Click **Next**.
    
3. Accept the terms and conditions.
    

Since this is a temporary account, which will last only as long as this lab:

* Do not add recovery options
    
* Do not sign up for free trials
    

5. Once the console opens, view the list of services by clicking the **Navigation menu** (
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="left")
    
    ) at the top-left.
    

![Navigation menu](https://cdn.qwiklabs.com/RIuVVYUkGtVaWhxtIFJugxyy%2FORWQYw7OrLR0bJlReI%3D align="left")

### Activate Cloud Shell

Cloud Shell is a virtual machine that contains development tools. It offers a persistent 5-GB home directory and runs on Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources. `gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab completion.

1. Click the **Activate Cloud Shell** button () at the top right of the console.
    
2. Click **Continue**.  
    It takes a few moments to provision and connect to the environment. When you are connected, you are also authenticated, and the project is set to your *PROJECT\_ID*.
    

#### **Sample commands**

* List the active account name:
    

```apache
gcloud auth list
```

(Output)

```apache
Credentialed accounts:
 - <myaccount>@<mydomain>.com (active)
```

(Example output)

```apache
Credentialed accounts:
 - google1623327_student@qwiklabs.net
```

* List the project ID:
    

```apache
gcloud config list project
```

(Output)

```apache
[core]
project = <project_ID>
```

(Example output)

```apache
[core]
project = qwiklabs-gcp-44776a13dea667a6
```

**Note:** Full documentation of **gcloud** is available in the [gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

### Check project permissions

Before you begin working on Google Cloud, you must ensure that your project has the correct permissions within Identity and Access Management (IAM).

1. In the Google Cloud console, on the **Navigation menu** (), click **IAM & Admin** &gt; **IAM**.
    
2. Confirm that the default compute Service Account `{project-number}-compute@developer.gserviceaccount.com` is present and has the `editor` role assigned. The account prefix is the project number, which you can find on **Navigation menu** &gt; **Cloud overview**.
    

![Default compute service account](https://cdn.qwiklabs.com/SMuu68pzAXGA%2F%2FgiwoeYr02rez30D0rBU8FvkNAciFM%3D align="left")

If the account is not present in IAM or does not have the `editor` role, follow the steps below to assign the required role.

1. In the Google Cloud console, on the **Navigation menu**, click **Cloud overview**.
    
2. From the **Project info** card, copy the **Project number**.
    
3. On the **Navigation menu**, click **IAM & Admin** &gt; **IAM**.
    
4. At the top of the **IAM** page, click **Add**.
    
5. For **New principals**, type:
    

```apache
{project-number}-compute@developer.gserviceaccount.com
```

Replace `{project-number}` with your project number.

6. For **Select a role**, select **Basic** (or Project) &gt; **Editor**.
    
7. Click **Save**.
    

## **Task 1. Set up the Cloud Storage bucket**

You will create a Cloud Storage bucket in your project so your pipeline can store output data.

* In Cloud Shell, execute the following commands to create a new bucket:
    
    ```apache
    export BUCKET=$GOOGLE_CLOUD_PROJECT
    gcloud storage buckets create gs://$BUCKET
    ```
    
    Copied!content\_copy
    

The created bucket name has the same name as your Project ID.

Click *Check my progress* to verify the objective.

Setup Cloud Storage bucket

Check my progress

## **Task 2. Add the necessary permissions for your Cloud Data Fusion instance**

1. In the Cloud Console, from the **Navigation menu** select **Data Fusion &gt; Instances**. You should see a Cloud Data Fusion instance already set up and ready for use.
    

**Note**: Creation of the instance takes around 20 minutes. Please wait for it to be ready.

Next, you will grant permissions to the service account associated with the instance, using the following steps.

2. From the Google Cloud console, navigate to the **IAM & Admin &gt; IAM**.
    
3. Confirm that the Compute Engine Default Service Account `{project-number}-compute@developer.gserviceaccount.com` is present, copy the **Service Account** to your clipboard.
    
4. On the IAM Permissions page, click **+Grant Access**.
    
5. In the New principals field paste the service account.
    
6. Click into the **Select a role field** and start typing "**Cloud Data Fusion API Service Agent**", then select it.
    
7. Click **Save**.
    

Click *Check my progress* to verify the objective.

Add Cloud Data Fusion API Service Agent role to service account

Check my progress

### Grant service account user permission

1. In the console, on the **Navigation menu**, click **IAM & admin &gt; IAM**.
    
2. Select the **Include Google-provided role grants** checkbox.
    
3. Scroll down the list to find the Google-managed Cloud Data Fusion service account that looks like `service-{project-number}@gcp-sa-datafusion.iam.gserviceaccount.com` and then copy the service account name to your clipboard.
    

![Google-managed Cloud Data Fusion service account listing](https://cdn.qwiklabs.com/sbfMwq9Lt1qJ4ougdfYULTK9FTVipnPfjx2svYCdi7k%3D align="left")

4. Next, navigate to the **IAM & admin &gt; Service Accounts**.
    
5. Click on the default compute engine account that looks like `{project-number}-compute@developer.gserviceaccount.com`, and select the **Permissions** tab on the top navigation.
    
6. Click on the **Grant Access** button.
    
7. In the **New Principals** field, paste the service account you copied earlier.
    
8. In the **Role** dropdown menu, select **Service Account User**.
    
9. Click **Save**.
    

## **Task 3. Get Sensitive Data Protection permissions**

1. In the Cloud Console, go to **Navigation menu** &gt; **IAM**.
    
2. At the top right of the Permissions table, look for the **Include Google-provided role grants** checkbox and click it.
    

![Google-provided role grants checkbox selected](https://cdn.qwiklabs.com/Gx3X0y3W6GCbYaQKaN7fcgAFaDCBNaAuN6Z9H3b%2FDP0%3D align="left")

3. In the permissions table, in the **Principal** column, find the service account that matches the format `service-project-number@gcp-sa-datafusion.iam.gserviceaccount.com`.
    

![Service account principal filter](https://cdn.qwiklabs.com/%2Bu5N3%2FG2sQfuALYBhhLoIboX7eV%2FA%2FqUhiMS%2FbI6Rqo%3D align="left")

4. Click the **Edit** button to the right of the service account.
    
5. Click **Add Another Role**.
    
6. Click the dropdown that appears.
    
7. Use the search bar to search and then select **DLP Administrator**.
    

![Add DLP administrator role](https://cdn.qwiklabs.com/kSnhsxyb3uAQqbvC3a5XvmlcqlpgRc0bjob7SDqlKj0%3D align="left")

8. Click **Save**.
    
9. Check that **DLP Administrator** appears in the **Role** column.
    

![DLP administrator role added](https://cdn.qwiklabs.com/P7w5pORYyMfQvNJpos9QF3TNq%2F9m1COFYLbo6m3PBP4%3D align="left")

Click *Check my progress* to verify the objective.

Get Sensitive Data Protection permissions

Check my progress

## **Task 4. Navigate to the Cloud Data Fusion UI**

1. In the Console, return to **Navigation menu &gt; Data Fusion**, then click the **View Instance** link next to your Data Fusion instance. Select your lab credentials to sign in, if required. If prompted to take a tour of the service click on **No, Thanks**. You should now be in the Cloud Data Fusion UI.
    
2. In the Cloud Data Fusion UI, click the **Navigation menu** on the top left and navigate to the **Studio** page.
    

Next, you will create a pipeline.

## **Task 5. Create the pipeline**

The pipeline that you will build does the following: *Reads the input data using the Cloud Storage source plugin.* Deploys the Sensitive Data Protection plugin from the Hub and applys the Redact transform plugin. \* Writes the output data using a Cloud Storage sink plugin.

1. In the left panel of your **Studio** page, under the **Source** menu, click the **Google Cloud Storage (GCS)** plugin.
    

![GCS plugin selected in source menu](https://cdn.qwiklabs.com/30U7odUZFAH0t9BfqSo69nCL%2FiVUB%2FDXzISDPcWaPpA%3D align="left")

2. Hold the pointer over the **GCS** node that appears and click **Properties**.
    
3. Under **Reference Name**, enter a reference name.
    
4. This lab uses the input dataset *SampleRecords.csv*, provided in a publicly-available Cloud Storage bucket. Under **Path**, enter `gs://cloud-training/OCBL167/SampleRecords.csv`
    
5. Under **Format**, select **csv**.
    
6. Under **Output Schema**, under **Field name**, enter the following by clicking the **+** button for each data type. Remove all existing data types, if any.
    
    * Date
        
    * Bank
        
    * State
        
    * Zip
        
    * Notes
        
7. Make sure all data types are of type **string**. To change the type, click **Type** and select **String** from the dropdown.
    
8. Select the **checkbox** for each data type. This ensures that the pipeline doesn't fail when it encounters a null (empty) value.
    

![GCS properties configuration](https://cdn.qwiklabs.com/aEvPwCmNWZ0KPDN%2FZGBPrYepfPqYoLHkgSAP%2FLyxxCM%3D align="left")

9. Click **Validate** to ensure that there are no errors.
    
10. Click the **X** button in the upper-right corner of the dialog box.
    

## **Task 6. Redact sensitive data**

The Redact transform plugin identifies sensitive records in your input stream of data and applies transformations that you define to those records. A record of data is considered sensitive if it matches pre-defined Sensitive Data Protection filters you choose or a custom template you define.

For this lab, you want to redact customer phone numbers that some support technicians on your team accidentally took note of. They entered the sensitive information in the **Notes** section of the support tickets, which appears as the **Notes** column in the CSV file. You create a custom Sensitive Data Protection inspection template, and then provide the template ID in the properties menu of the Redact transform plugin.

## **Task 7. Deploy the Sensitive Data Protection plugin**

1. In the Cloud Data Fusion UI, click **Hub** in the upper right.
    
2. Click the **Data Loss Prevention** plugin.
    
3. Click **Deploy**.
    
4. Click **Finish**.
    
5. Click the **X** button in the upper-right corner of the **Data Loss Prevention | Deploy** dialog box.
    
6. Click the **X** button to exit the Hub.
    

## **Task 8. Create a custom template**

1. In the Cloud Console, open **Navigation Menu &gt; Security &gt; Sensitive Data Protection** .
    
2. Click on the **Configuration** tab, and then click **Create Template**.
    
3. Under **Define template**, in the **Template ID** field, enter an ID for your template. You will need the template ID later in the tutorial.
    
4. Click **Continue**.
    
5. Under **Configure detection**, click **Manage infotypes**.
    
6. In the **Built-in** tab, use the filter to search for `phone number`.
    

![Built-in phone number filter](https://cdn.qwiklabs.com/%2BkN%2F%2BEhCpiHfwZuj9U7kcM%2BTs%2B8bR9FcwtwpKozz1no%3D align="left")

7. Select **PHONE\_NUMBER**.
    
8. Click **Done**.
    
9. Click **Create**.
    

Click *Check my progress* to verify the objective.

Create a custom template

Check my progress

## **Task 9. Apply the Redact transform**

1. Back in the Cloud Data Fusion UI, on the **Studio** page, click to expand the **Transform** menu.
    
2. Click the **Google DLP Redact** transform plugin.
    

![Redact transform selection](https://cdn.qwiklabs.com/XUS4cm02T02N5J5Wyj2FqNSV8gnERknhD7WGUUji4b8%3D align="left")

3. Drag a connection arrow from the **GCS** node to the **Google DLP Redact** node.
    

![GCS node connected to Redact node](https://cdn.qwiklabs.com/J88jgsEKUr82Cn9%2FhILKNCmU9w54ofDXoq2Dq6Sp8zs%3D align="left")

4. Hold the pointer over the **Google DLP Redact** node and click **Properties**.
    

* Set **Use custom template** to **Yes**.
    
* Under **Template ID**, enter the template ID of the custom template you created.
    
* Under **Matching**, apply **Masking** on **Custom template** within **Notes**.
    

**Note:** In addition to masking, there are other Sensitive Data Protection transformations available with the Sensitive Data Protection plugin. To learn more, see the Documentation tab in the properties menu of the Redact plugin.

5. Under **Masking Character**, enter `#`.
    

![Masking properties configuration](https://cdn.qwiklabs.com/s%2B1PZm%2FWY1ZFmSc%2BWuC5xgHEFx2NGxYg2Oh6%2FnHQS9c%3D align="left")

6. Click **Validate** to ensure that there are no errors.
    
7. Click the **X** button in the upper-right corner of the dialog box.
    

## **Task 10. Store the output data**

Store the results of your pipeline in a Cloud Storage file.

1. In the Cloud Data Fusion UI, on the **Studio** page, click to expand the **Sink** menu.
    
2. Click **GCS**.
    
3. Drag a connection arrow from the **Google DLP Redact** node to the **GCS2** node.
    

![Redact node connected to GCS2](https://cdn.qwiklabs.com/59gMSJDsTXCCJKDUkpvhcLipOiqYubHDpALe0iVdPzQ%3D align="left")

4. Hold the pointer over the **GCS2** node and click **Properties**.
    

* Under **Reference Name**, enter a reference name.
    
* Under **Path**, enter the path of the Cloud Storage bucket you created at the beginning of this lab
    
* Under **Format**, select **CSV**.
    

![GCS sink properties configuration](https://cdn.qwiklabs.com/GLWHZ6gARpQrkjNw%2BHKSl2gN58HVbTVyLC63Br6va9w%3D align="left")

5. Click **Validate** to ensure that there are no errors.
    
6. Click the **X** button in the upper-right corner of the dialog box.
    

## **Task 11. Run the pipeline in preview mode**

Next, run the pipeline in preview mode before deploying it.

1. Click **Preview** and then click **Run**.
    
    ![Pipeline preview run configuration](https://cdn.qwiklabs.com/Xrjm%2FnwbRDohsWdnelz383WXbHltF6kktoBOrv74gVI%3D align="left")
    

The **Run** button displays the pipeline status, which starts with **Starting**, then turns to **Stop**, and then turns to **Run**.

2. When the preview run completes, on the **Google DLP Redact** node, click **Preview Data** to see a side-by-side comparison of the input and output data. Confirm that phone numbers have been masked with the # character.
    

![Redact properties output results](https://cdn.qwiklabs.com/UvUgnk%2BA%2FKm1rvjr7V20kxh%2FgUfn%2FFP%2BaVzmJCRqJ%2FM%3D align="left")

3\. Click the **X** button to close **Preview Data**.

**Note:** If you are not able to see the phone numbers in the **Notes** column, then hover over the entries to verify the result.

## **Task 12. Redact another data type**

While examining the preview run results, you notice that other sensitive information appears in the **Notes** column: Email addresses. Go back and edit the Sensitive Data Protection inspection template to redact email addresses as well.

1. In the Cloud Console, navigate to **Navigation Menu &gt; Security &gt; Sensitive Data Protection** .
    
2. In the **Configuration** tab, select your template.
    
3. Click **Edit**.
    
4. Click **Manage infotypes**.
    
5. In the **Built-in** tab, use the filter to search for `OR` `email address`.
    

![Built-in phone number or email filter](https://cdn.qwiklabs.com/niSXRSndY8zgErXt03VJqt6LT3DwWNDKJjuMpON0hWo%3D align="left")

6. Select all and click **Done**.
    
7. Click **Save**.
    
8. On the pop-up click **Confirm Save**.
    
9. Once again, run your pipeline in preview mode. Cloud Data Fusion will automatically use the updated Sensitive Data Protection template.
    
10. Confirm that both phone numbers and email addresses have been masked with the # character.
    

![Pipeline preview output results](https://cdn.qwiklabs.com/C8%2Fept%2FoTtc08k%2BTIydey00DsjM95fcZfJzJGp5YTts%3D align="left")

**Note:** If you are not able to see the phone numbers and email addresses in the **Notes** column, then hover over the entries to verify the result.

Click *Check my progress* to verify the objective.

Redact another data type

Check my progress

## **Task 13. Deploy and run the pipeline**

1. Make sure **Preview** mode is unchecked.
    
2. Click **Save**. Clicking **Save** prompts you to name your pipeline. Give your pipeline a name; then click **Save**.
    

![Name your pipeline text field](https://cdn.qwiklabs.com/C3%2Bgj1CYuD6Wh1k1SayfRV6cHq0xAvTlZ0kalXP1zYU%3D align="left")

3. Click **Deploy**.
    
4. When deployment completes, click **Run**. Running your pipeline can take a few minutes. While you wait, you can observe the **Status** of the pipeline transition from **Provisioning** to **Starting** to **Running** to **Succeeded**.
    

**Note:** If the pipeline fails, **Rerun** the piepline again

Click *Check my progress* to verify the objective.

Deploy and run the pipeline

Check my progress

## **Task 14. View the results**

1. In the Cloud Console, go to **Cloud Storage**.
    
2. In the **Storage browser**, navigate to the Cloud Storage bucket you specified in the sink Cloud Storage plugin properties.
    
3. In **Authenticated URL**, copy the link and paste it into a new browser tab to download the CSV file with the results. Confirm that phone numbers and email addresses have been masked with the # character.
    

![Google Cloud Storage object details configuration](https://cdn.qwiklabs.com/hljbi4MNHa8Z%2FWhApHGYowLtbvw9CzI5q0OcIqTRvKI%3D align="left")

---

## Solution of Lab

%[https://www.youtube.com/watch?v=GbrVmFi-SgI&ab_channel=QUICKGCPLAB] 

```apache
curl -LO raw.githubusercontent.com/QUICK-GCP-LAB/2-Minutes-Labs-Solutions/refs/heads/main/Redacting%20Confidential%20Data%20within%20your%20Pipelines%20in%20Cloud%20Data%20Fusion/gsp811.sh
sudo chmod +x *.sh
./*.sh
```