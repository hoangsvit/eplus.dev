---
title: "Alteryx Designer Cloud: Qwik Start - GSP105"
seoTitle: "Alteryx Designer Cloud: Qwik Start - GSP105"
seoDescription: "Dataprep by Alteryx Designer Cloud (Trifacta) is an intelligent data service for visually exploring, cleaning, and preparing data for analysis. Cloud Dataprep is serverless and works at any scale. There is no infrastructure to deploy or manage. Easy data preparation with clicks and no code!"
datePublished: 2026-06-08T02:39:16.735Z
cuid: cmq4lr7cb00011spq5l5k4l63
slug: alteryx-designer-cloud-qwik-start-gsp105
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/c7f0c30d-e692-409a-aa30-e59e5e8e261c.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/9419e290-260f-47f6-a67b-47191151f3a6.png
tags: alteryx-designer-cloud-qwik-start-gsp105, alteryx-designer-cloud-qwik-start, gsp105

---

## **Overview**

[Dataprep by Alteryx Designer Cloud (Trifacta)](https://www.alteryx.com/products/designer-cloud) is an intelligent data service for visually exploring, cleaning, and preparing data for analysis. Cloud Dataprep is serverless and works at any scale. There is no infrastructure to deploy or manage. Easy data preparation with clicks and no code!

In this lab, you use Dataprep to manipulate a dataset. You import datasets, correct mismatched data, transform data, and join data. If this is new to you, you'll know what it all is by the end of this lab.

### What you'll do

In this lab, you learn how to use Dataprep to complete the following tasks:

*   Import data
    
*   Correct mismatched data
    
*   Transform data
    
*   Join data
    

## **Setup and requirements**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1.  Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the right is the **Lab setup and access** panel with the following:
    
    *   The **Open Google Cloud console** button
        
    *   The temporary credentials (username and password) that you must use for this lab
        
    *   Other information, if needed, to step through this lab
        
    
    Note that the lab timer is located near the top of the page, showing the remaining time.
    
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```plaintext
    student-04-ac22f659050b@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the **Lab setup and access** panel.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```plaintext
    RVqAhGZEZHQm
    ```
    
    Copied!
    
    You can also find the Password in the **Lab setup and access** panel.
    
6.  Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7.  Click through the subsequent pages:
    
    *   Accept the terms and conditions.
        
    *   Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    *   Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="center")

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1.  Click **Activate Cloud Shell**
    
    ![Activate Cloud Shell icon](https://cdn.qwiklabs.com/ep8HmqYGdD%2FkUncAAYpV47OYoHwC8%2Bg0WK%2F8sidHquE%3D align="center")
    
    at the top of the Google Cloud console.
    
2.  Click through the following windows:
    
    *   Continue through the Cloud Shell information window.
        
    *   Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-00-d92868c0c7a0`. The output contains a line that declares the **Project\_ID** for this session:

````plaintext
```plaintext
Your Cloud Platform project in this session is set to qwiklabs-gcp-00-d92868c0c7a0
```
````

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3.  (Optional) You can list the active account name with this command:
    
    ```plaintext
    gcloud auth list
    ```
    
4.  Click **Authorize**.
    

**Output:**

```plaintext
ACTIVE: *
ACCOUNT: student-04-ac22f659050b@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5.  (Optional) You can list the project ID with this command:
    

```plaintext
gcloud config list project
```

**Output:**

```plaintext
[core]
project = qwiklabs-gcp-00-d92868c0c7a0
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## **Task 1. Create a Cloud Storage bucket in your project**

1.  In the Cloud Console, select **Navigation menu**(
    
    ![Navigation menu icon](https://cdn.qwiklabs.com/tkgw1TDgj4Q%2BYKQUW4jUFd0O5OEKlUMBRYbhlCrF0WY%3D align="center")
    
    ) > **Cloud Storage** > **Buckets**.
    
2.  Click **Create bucket**.
    
3.  In the **Create a bucket** dialog, **Name** the bucket a unique name. Leave other settings at their default value.
    

**Note:** Learn more about naming buckets from [Bucket naming guidelines](https://cloud.google.com/storage/docs/naming-buckets).

4.  Uncheck **Enforce public access prevention on this bucket** for `Choose how to control access to objects`.
    
5.  Click **Create**.
    

You created your bucket. Remember the bucket name for later steps.

### Test completed task

Click **Check my progress** to verify your performed task. If you have successfully created a Cloud Storage bucket, you see an assessment score.

Create a Cloud Storage bucket

## **Task 2. Initialize Cloud Dataprep**

1.  Open **Cloud Shell** and run the following command:  
    `gcloud beta services identity create --service=dataprep.googleapis.com`
    
2.  You should see a message saying the service identity was created.
    
    2.  In the Cloud console, go to the **Navigation menu**, click **View All Products** and under **Analytics** select **Alteryx Designer Cloud**.
        
    3.  Check to accept the Google Dataprep Terms of Service, then click **Accept**.
        
    4.  Check to authorize sharing your account information with Trifacta, then click **Agree and Continue**.
        
    5.  Click **Allow** to allow Trifacta to access project data.
        
    6.  Click your student username to sign in to Cloud Dataprep by Trifacta. Your username is the **Username** in the left panel in your lab.
        
    7.  Click **Allow** to grant Cloud Dataprep access to your Google Cloud lab account.
        
    8.  Check to agree to Trifacta Terms of Service, and then click **Accept**.
        
    9.  Click **Continue** on the **First time setup** screen to create the default storage location.
        
    
    Alteryx Designer Cloud opens.
    
    ### Test completed task
    
    Click **Check my progress** to verify your performed task. If you have successfully initialized Cloud Dataprep with default storage location, you see an assessment score.
    

## **Task 3. Create a flow**

Cloud Dataprep uses a `flow` workspace to access and manipulate datasets.

1.  Click **Flows** icon, then the **Create** button, then select **Blank Flow** :
    

![Flows icon, Create button, Blank Flow option](https://cdn.qwiklabs.com/YG1phM5jiQwM1RCHHoMDFd1agP2BHKRlkYlebPFq0YY%3D align="center")

2.  Click on **Untitled Flow**, then name and describe the flow. Since this lab uses 2016 data from the [United States Federal Elections Commission 2016](https://www.fec.gov/data/browse-data/?tab=bulk-data), name the flow "FEC-2016", and then describe the flow as "United States Federal Elections Commission 2016".
    
3.  Click **OK**.
    

The FEC-2016 flow page opens.

## **Task 4. Import datasets**

In this section you import and add data to the FEC-2016 flow.

1.  Click **Add Datasets**, then select the **Import Datasets** link.
    
2.  In the left menu pane, select **Cloud Storage** to import datasets from Cloud Storage, then click on the pencil to edit the file path.
    

![Cloud Storage page](https://cdn.qwiklabs.com/IMICgtrsZL8%2BLTjmyg754ftt0I%2Bby0KSPPPdj21VCz8%3D align="center")

3.  Type `gs://spls/gsp105` in the **Choose a file or folder** text box, then click **Go**.
    

You may have to widen the browser window to see the **Go** and **Cancel** buttons.

4.  Click **us-fec/**.
    
5.  Click the **+** icon next to `cn-2016.txt` to create a dataset shown in the right pane. Click on the title in the dataset in the right pane and rename it "Candidate Master 2016".
    
6.  In the same way add the `itcont-2016-orig.txt` dataset, and rename it "Campaign Contributions 2016".
    
7.  Both datasets are listed in the right pane; click **Import & Add to Flow**.
    

![Two datasets listed in the right pane](https://cdn.qwiklabs.com/dQ3zTrEHhwVZnUJTvV3U%2Bazq5YT15qPiuq0lf38bRAw%3D align="center")

You see both datasets listed as a flow.

## **Task 5. Prep the candidate file**

1.  By default, the Candidate Master 2016 dataset is selected. In the right pane, click **Edit Recipe**.
    

![Candidate Master 2016 dataset page](https://cdn.qwiklabs.com/0gU%2F3uAcWjKJtaBy%2FtOmayvgBECbTPs%2FPej3wjki9xw%3D align="center")

The Candidate Master 2016 Transformer page opens in the grid view.

![Candidate Master 2016 Transformer page in grid view](https://cdn.qwiklabs.com/9r2CStT1fxAbpxqs3CH7XWPY5OjUL5%2F63C3HL21TBNo%3D align="center")

The Transformer page is where you build your transformation recipe and see the results applied to the sample. When you are satisfied with what you see, execute the job against your dataset.

2.  Each of the column heads have a Name and value that specify the data type. To see data types, click the column icon:
    

![column6](https://cdn.qwiklabs.com/np%2B84KqotZFP2Vm9pfBSUhQ2QApRI3El5anSZ%2B02Rfs%3D align="center")

3.  Notice also that when you click the name of the column, a **Details** panel opens on the right.
    
4.  Click **X** in the top right of the Details panel to close the **Details** panel.
    

In the following steps you explore data in the grid view and apply transformation steps to your recipe.

1.  Column5 provides data from 1990-2064. Widen column5 (like you would on a spreadsheet) to separate each year. Click to select the tallest bin, which represents the year 2016.
    

![column5](https://cdn.qwiklabs.com/HBgC2djaKgiuQL6XDXuhBIYIZk7ao5FbDSTac%2FmiNV8%3D align="center")

This creates a step where these values are selected.

2.  In the **Suggestions** panel on the right, in the **Keep rows** section, click **Add** to add this step to your recipe.
    

![ Suggestions panel](https://cdn.qwiklabs.com/mihe8%2BEtDMGL0ArptVxWnHrYQlJjWcte9FE3OS6E3SM%3D align="center")

The Recipe panel on the right now has the following step:

`Keep rows where (DATE(2015, 1, 1) <= column5) && (column5 < DATE(2020, 1, 1))`

3.  In Column6 (State), hover over and click on the mismatched (red) portion of the header to select the mismatched rows.
    

![column6](https://cdn.qwiklabs.com/PEMNFxPp2kI%2FjQN9eLagpFe8ldEvrnFo4f2lVSV3Zjg%3D align="center")

Scroll down to the bottom (highlighted in red) find the mismatched values and notice how most of these records have the value "P" in column7, and "US" in column6. The mismatch occurs because column6 is marked as a "State" column (indicated by the flag icon), but there are non-state (such as "US") values.

4.  To correct the mismatch, click **X** in the top of the Suggestions panel to cancel the transformation, then click on the flag icon in Column6 and change it to a "String" column.
    

![column6](https://cdn.qwiklabs.com/lZtnUvD5I6KCDVJ4Zot5dmDC1KkektpgBlQgF7OO4pc%3D align="center")

There is no longer a mismatch and the column marker is now green.

5.  Filter on just the presidential candidates, which are those records that have the value "P" in column7. In the histogram for column7, hover over the two bins to see which is "H" and which is "P". Click the "P" bin.
    

![column7](https://cdn.qwiklabs.com/CIUuZWVWsWWQD3xJhQfJhm0qSoFcBK0cYUTpAnxpTbc%3D align="center")

6.  In the right Suggestions panel, click **Add** to accept the step to the recipe.
    

![Keep rows box](https://cdn.qwiklabs.com/3rctj2B3qPP53yr4UU4raLXyed9Zk8lHPlaXNNsZmhY%3D align="center")

## **Task 6. Wrangle the Contributions file and join it to the Candidates file**

On the Join page, you can add your current dataset to another dataset or recipe based on information that is common to both datasets.

Before you join the Contributions file to the Candidates file, clean up the Contributions file.

1.  Click on **FEC-2016** (the dataset selector) at the top of the grid view page.
    

![FEC-2016 at the top of the grid view page](https://cdn.qwiklabs.com/HjbiWzAPc2RlYFro3r4llT65MBJjJkcA%2FklDCnLHn%2BU%3D align="center")

2.  Click to select the grayed out **Campaign Contributions 2016**.
    
3.  In the right pane, click **Add** > **Recipe**, then click **Edit Recipe**.
    
4.  Click the **recipe** icon at the top right of the page, then click **Add New Step**.
    

![Recipe icon and Add New Step button](https://cdn.qwiklabs.com/RSjdCHmcco6eqx2PxMao6QLRwsGdN17OuuKWuKScdJA%3D align="center")

Remove extra delimiters in the dataset.

5.  Insert the following Wrangle language command in the Search box:
    
    ```plaintext
    replacepatterns col: * with: '' on: {start}"|"{end} global: true
    ```
    

The Transformation Builder parses the Wrangle command and populates the Find and Replace transformation fields.

![Transformation Builder](https://cdn.qwiklabs.com/1BATF7Nh4eCh%2FfdTP63tsOKDXKBpYZrJcvX9xhkmD%2B4%3D align="center")

6.  Click **Add** to add the transform to the recipe.
    
7.  Add another new step to the recipe. Click **New Step**, then type "Join" in the Search box.
    

![Search transformations box](https://cdn.qwiklabs.com/R0Fk6rYEUC7dlUnXULpsr4UXwyI38nKt9koliI%2BmVeo%3D align="center")

8.  Click **Join datasets** to open the Joins page.
    
9.  Click on "Candidate Master 2016" to join with Campaign Contributions 2016, then **Accept** in the bottom right.
    

![Candidate Master 2016 row](https://cdn.qwiklabs.com/uihqUqtOIf5rTyiVKKK6ST1lALU2cg1LrT8dCZJcymA%3D align="center")

10.  On the right side, hover in the Join keys section, then click on the pencil (Edit icon).
     

![Join conditions box](https://cdn.qwiklabs.com/7unllRVBsUKS0YirGyR2dBOF5bEIcYdjLIFfMwGcAak%3D align="center")

Dataprep infers common keys. There are many common values that Dataprep suggests as Join Keys.

11.  In the Add Key panel, in the Suggested join keys section, click **column2 = column11**.
     

![Add Key panel](https://cdn.qwiklabs.com/PVJawQJsD8zidQznUENkTaUpglQkmkZUoOe8n7dDMmE%3D align="center")

12.  Click **Save and Continue**.
     

Columns 2 and 11 open for your review.

13.  Click **Next**, then check the checkbox to the left of the "Column" label to add all columns of both datasets to the joined dataset.
     

![Column label list](https://cdn.qwiklabs.com/Y0yG7pQbqD9xQ%2FaaawSVMTCspoeJ3GlWrllws8dNzZ0%3D align="center")

14.  Click **Review**, and then **Add to Recipe** to return to the grid view.
     

## **Task 7. Summary of data**

Generate a useful summary by aggregating, averaging, and counting the contributions in Column 16 and grouping the candidates by IDs, names, and party affiliation in Columns 2, 24, 8 respectively.

1.  At the top of the Recipe panel on the right, click on **New Step** and enter the following formula in the **Transformation** search box to preview the aggregated data.
    
    ```plaintext
    pivot value:sum(column16),average(column16),countif(column16 > 0) group: column2,column24,column8  
    ```
    
2.  An initial sample of the joined and aggregated data is displayed, representing a summary table of US presidential candidates and their 2016 campaign contribution metrics.
    
    ![Campaign contributions page](https://cdn.qwiklabs.com/OWm0CNOCNhmXHWB2Dn4NjcjSj2bGWwT4C0vmutA2vvc%3D align="center")
    
    2.  Click **Add** to open a summary table of major US presidential candidates and their 2016 campaign contribution metrics.
        
    
    ## **Task 8. Rename columns**
    
    You can make the data easier to interpret by renaming the columns.
    
    1.  Add each of the renaming and rounding steps individually to the recipe by clicking **New Step**, then enter:
        
    
    ```plaintext
    rename type: manual mapping: [column24,'Candidate_Name'], [column2,'Candidate_ID'],[column8,'Party_Affiliation'], [sum_column16,'Total_Contribution_Sum'], [average_column16,'Average_Contribution_Sum'], [countif,'Number_of_Contributions']
    ```
    
3.  Then click Add.
    
4.  Add in this last New Step to round the Average Contribution amount:
    
    ```plaintext
    set col: Average_Contribution_Sum value: round(Average_Contribution_Sum)
    ```
    

4.  Then click **Add**.
    

Your results look something like this:

![Results table with columns for Candidate_Id, Candidate_Name, Part_Affiliation, and Total_Contribution_Sum](https://cdn.qwiklabs.com/we%2Fh%2Fra7TdWOXWx6bmMK8sgLYS0GHTBYQ61UAHB9aqw%3D align="center")

* * *

## Solution of Lab

### Quick

%[https://www.youtube.com/watch?v=668Zp1e1KGY] 

```apache
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP658/lab.sh
source lab.sh
```

**Script Alternative**

```plaintext
curl -LO raw.githubusercontent.com/prateekrajput08/Arcade-Google-Cloud-Labs/refs/heads/main/Alteryx%20Designer%20Cloud%3A%20Qwik%20Start/TechCode.sh
sudo chmod +x TechCode.sh 
./TechCode.sh
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/0d09bcd3-4f06-448a-910d-8e46a9cbc5e0.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/044a8592-d65f-4b95-beac-3254e041aec7.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/7dd8d784-a1f7-400e-a2d6-9e582ee27c75.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/5c78090d-9725-47a9-81f7-0bdeb5872f25.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/8ec47b43-6092-49e5-8b48-07ff2c9c860d.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/e2515c8d-cf91-44af-ae34-04a0a74aca85.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/fd14caf3-c8ae-41ff-ac4b-850fadbbeb7f.png align="center")

* * *

### Manual

%[https://www.youtube.com/watch?v=Jr5liTO791M]