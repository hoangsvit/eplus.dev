---
title: "Working with Cloud Dataprep on Google Cloud - GSP050"
seoTitle: "Working with Cloud Dataprep on Google Cloud - GSP050"
seoDescription: "Learn to clean, enrich, and analyze datasets using Cloud Dataprep on Google Cloud through hands-on lab exercises"
datePublished: Sun Jan 11 2026 09:20:39 GMT+0000 (Coordinated Universal Time)
cuid: cmk9ixbdx000302i6e1go049a
slug: working-with-cloud-dataprep-on-google-cloud-gsp050
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768121887259/d5891a7a-50de-4f0f-b989-4c5987fe5e4e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1768121907846/3faa74ab-0836-4dad-a65b-1f33d25d9687.png
tags: working-with-cloud-dataprep-on-google-cloud-gsp050, working-with-cloud-dataprep-on-google-cloud, gsp050

---

## Overview

[Dataprep by Alteryx Designer Cloud (Trifacta)](https://www.alteryx.com/products/designer-cloud) is Google's self-service data preparation tool built in collaboration with Alteryx. In this lab, you learn how to clean and enrich multiple datasets using Cloud Dataprep. The lab exercises are based on a mock use case scenario.

### Use case scenario:

You work for a technical services company that sells three monthly subscription products:

* Silver (price: $9.99/month)
    
* Gold (price: $14.99/month)
    
* Platinum (price: $29.99/month)
    

The company occasionally offers promotional discounts, so some product prices may be slightly lower than those listed above. Your overall goal is to provide an analysis of sales activity by zip code over the course of three years.

To do this you'll need to join your customer contact datasource (where the zip code information resides) with sales data from your purchases datasource. Once you've joined the data, you'll aggregate the results.

### What you'll learn

In this lab, you will learn how to perform the following tasks:

* Cleaning and profiling data with Cloud Dataprep
    
* Combining multiple datasets using Cloud Dataprep
    
* Computing the results of formulas in Cloud Dataprep
    

## Setup and requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

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
    student-02-bb0da8994731@qwiklabs.net
    ```
    
    Copied!
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    T6gr0eQ2C68K
    ```
    
    Copied!
    
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

### Activate Cloud Shell

Cloud Shell is a virtual machine that is loaded with development tools. It offers a persistent 5GB home directory and runs on the Google Cloud. Cloud Shell provides command-line access to your Google Cloud resources.

1. Click **Activate Cloud Shell** at the top of the Google Cloud console.
    
2. Click through the following windows:
    
    * Continue through the Cloud Shell information window.
        
    * Authorize Cloud Shell to use your credentials to make Google Cloud API calls.
        

When you are connected, you are already authenticated, and the project is set to your **Project\_ID**, `qwiklabs-gcp-04-f669c382bccc`. The output contains a line that declares the **Project\_ID** for this session:

```apache
Your Cloud Platform project in this session is set to qwiklabs-gcp-04-f669c382bccc
```

`gcloud` is the command-line tool for Google Cloud. It comes pre-installed on Cloud Shell and supports tab-completion.

3. (Optional) You can list the active account name with this command:
    

```apache
gcloud auth list
```

Copied!

4. Click **Authorize**.
    

**Output:**

```apache
ACTIVE: *
ACCOUNT: student-02-bb0da8994731@qwiklabs.net

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

5. (Optional) You can list the project ID with this command:
    

```apache
gcloud config list project
```

Copied!

**Output:**

```apache
[core]
project = qwiklabs-gcp-04-f669c382bccc
```

**Note:** For full documentation of `gcloud`, in Google Cloud, refer to [the gcloud CLI overview guide](https://cloud.google.com/sdk/gcloud).

## Task 1. Open Google Cloud Dataprep

1. In Cloud Shell, run the following command:
    

```apache
gcloud beta services identity create --service=dataprep.googleapis.com
```

Copied!

You should see a message saying the service identity was created.

2. In the Cloud console, go to the **Navigation menu**, click **View All Products** and under **Analytics** select **Alteryx Designer Cloud**.
    
3. Check that you agree to Google Dataprep Terms of Service, and then click **Accept**.
    
4. Click the checkbox and then click **Agree and Continue** when prompted to share account information with Alteryx.
    
5. Click **Allow** to give Alteryx access to your project.
    
6. Select your lab credentials to sign in and click **Allow**.
    
7. Check the box and click **Accept** to agree to Alteryx Terms of Service.
    
8. If prompted to use the default location for the storage bucket, click **Continue**.
    
9. For new users, a tutorial will launch, asking you to select datasets. Quit out of this screen by clicking **Cancel** or exiting out.
    
10. Click on the Dataprep icon on the top left corner to go to the home screen.
    

## Task 2. Retrieve dataset files

In this section you will add the sales activity files to a storage bucket that Dataprep created for you.

1. Go back to the Cloud Console.
    

**Note:** If you have closed the Cloud Console you can open it by clicking the Google Cloud icon in the bottom left corner.

2. Get your bucket name. From the Navigation menu, select **Cloud Storage** &gt; **Bucket**.
    
3. Note the Dataprep bucket name to use in the next step.
    
4. In the Cloud Shell command line, execute the following command, substituting `[YOUR-BUCKET-NAME]` with the Dataprep bucket name:
    

```apache
gsutil cp -r gs://spls/gsp050 gs://[YOUR-BUCKET-NAME]
```

Copied!

You should receive a similar output:

```apache
Copying gs://spls/gsp050/lab_customers.csv [Content-Type=text/csv]...
\ [4 files][  8.5 MiB/  8.5 MiB]
Operation completed over 4 objects/8.5 MiB.
```

Click *Check my progress* to verify the objective.

Retrieve dataset files

## Task 3. Create a Flow

Go back to the Cloud Dataprep tab. To wrangle your data, you need to create a Flow. A Flow is a set of related datasets and the connections between them.

1. Click **Create Flow** in the upper right-hand corner:
    

2. Name your Flow `Qwiklab1`, leave the flow description blank, then click **Ok**.
    

At this point your Flow is created. To guide you, Dataprep creates some placeholders in the flow to help you get started. The first step is to import and add data to Dataprep and the Flow.

3. Click on the **+** under Dataset to add a new data source and click the **Import Datasets** link.
    
4. In the left navigation menu, click `Cloud Storage` &gt; `dataprep-staging-xxx...` &gt; `gsp050` to access the sample data you stored in the previous section.
    
5. Click the **+** next to each file listed. When you click on a file, it will move to the right side of the screen. Click **Import & Add to Flow** to add the datasets to your Flow:
    

Cloud Dataprep brings you back to the **Flow View** page, which now contains the datasets you added. Additional placeholders for the recipe and output are created.

![The Flow View page containing the added datasets](https://cdn.qwiklabs.com/SD7pn%2FeNWFITyNVQ9TRZzQybNOrUx%2FwRuOJEAg1QNks%3D align="left")

## Task 4. Clean customer data

Now that you have the data, the next step is to design a data preparation recipe to clean the customers dataset. From the template, there already is a recipe added using the `lab_2013_transactions.csv` data. Let’s skip this recipe for now and create our own.

1. To create a new recipe:
    

* Click the plus icon (**+**) next to the `lab_customers.csv`.
    
* Then click **Add new Recipe**.
    

![2 datasets, lab_2015_transactions.csv and lab_customers.csv, with the expanded menu displayed for lab_customers.csv](https://cdn.qwiklabs.com/4Y7Wh6jP1mjxFXjk7vidfTPrRrdR8p2BDlrZ%2BKgd6p8%3D align="left")

2. **Right-click** on this new Recipe node.
    

* From the drop-down menu, choose **Edit name and description**.
    
* Change the name to `lab_customers` and click **OK**.
    

3. A new Recipe node is created and a panel will open on the right side, displaying information about the recipe, including the data and any existing transformation steps.
    
4. Hit the blue **Edit Recipe** button. (Alternatively, you can double click the recipe node itself.)
    

Cloud Dataprep opens the "Transformer Grid". This is a worksheet-like interface where you can design the steps in your data preparation recipe. The Transformer page is where you build your transformation recipe and see the results applied to the sample. When you are satisfied with what you see, execute the job against your dataset.

Each of the columns have a Name and an icon that specify the inferred data type. Possible data types are shown when you click the icon to the left of the column name:

![The expanded menu for the column_id column, with the More types option highlighted, and the associated submenu options displayed](https://cdn.qwiklabs.com/iCeKK4gKv1Rnegk8gST%2B%2FKIKDT0821sIyj%2FQKvfsO1c%3D align="left")

When you click on a column option, a **Details** panel opens on the right.

This Details panel is dynamic and contains information about whatever you have selected, including column information or suggested transformations. Click **X** in the top right of the Details panel to close the Details panel for now.

In the following steps, you explore data in the grid view and apply transformation steps to your recipe.

When you open the Transformer Grid, Cloud Dataprep automatically profiles the contents of your dataset and generates column-level histograms and data quality indicators. This profile information can be used to guide your data preparation process.

### Apply a filter

1. Scroll all the way to the right to the **start\_date** column. Examine the horizontal bar at the top column:
    

![A tricolored horizontal bar above the start date column. Colors include blue, red, and grey.](https://cdn.qwiklabs.com/5S%2Fll5W8nd9yT%2BxMQ4lB1w4oDB1kfA0bvoT8R7%2F5B28%3D align="left")

**Note:** You can move ahead if the red bar does not appear in the `start_date` column.

This is the data quality bar. The green part represents valid values, the gray represents missing or null values. A red bar indicates data that does not match the data type. Clicking on the sections of the data quality bar will generate suggestions that contain data quality conditionals. These conditionals test whether each record is valid, empty, or invalid, depending on the section of the bar that you clicked.

Using `start_date` and `end_date` as a filter, you will add a transformation to remove contacts where the start\_date column is empty.

2. Click on the grey part of the data quality bar for the `start_date` column.
    

Cloud Dataprep generates a list of suggested transformations on the right, based on your selection. You can hover your mouse over any of the suggestion cards and Dataprep will show you a preview of how your data will look if the suggestion is applied. If you select a card, Cloud Dataprep updates the grid to show you a preview of this transformation.

3. Click **Add** on the "Delete rows with missing values in `start_date`" suggestion card on the right.
    

The rows that were highlighted in red have been removed from your dataset.

### Fill in missing values

Look at the **end\_date** column. Based on the data quality bar, there are a large number of rows with missing values. To easily work with this column, you'll insert an empty value–January 01, 2050–in those empty rows.

1. Click the gray section of the data quality bar for the `end_date` column.
    

This will generate another set of suggested transformations. There should be a suggestion to **Set missing values to NULL()**. In this case, Dataprep does not know what exact value you may want to fill with, so it creates a template for you to modify.

2. On any suggestion card, you then click **Edit**.
    

This opens the **Add Step** builder. Cloud Dataprep's suggested transformation has already been populated, but you can make adjustments to the code.

3. In the **Formula** box, replace the `NULL()` with `'2050/1/1'` (with the quotes). The full formula should look like:
    

```apache
IFMISSING($col, '2050/01/01')
```

Copied!

![The Edit with formula box displaying the full formula in the Formula text box](https://cdn.qwiklabs.com/y8MEFY7BO87Im44u6P1HlFMYyDBpqC8HL81LJCcAWEY%3D align="left")

4. Click **Add**.
    

Now the data quality problems in the `lab_customers` dataset have been addressed and the gray part of the data quality bar is gone.

## Task 5. Union multiple transactions datasets

Now switch gears and work on the transactions datasets.

* Click on the `QWIKLAB1` flow name at the top of the screen:
    

![Flow title with Qwiklab1 highlighted](https://cdn.qwiklabs.com/j43L8mGx85QtzvYJOBBAAsx8nqg5iubUc51xDAoXTH4%3D align="left")

This brings you back to the Flow view.

Create a single dataset that unions the transactions datasets from 2013, 2014, and 2015.

1. Click on the `lab_2013_transactions` dataset.
    
2. Click the plus sign **(+)**, and then click **Add new Recipe**.
    

Cloud Dataprep creates a new recipe and wrangled dataset named `Untitled recipe`.

3. **Right-click** on this new wrangled dataset. From the drop-down menu, choose **Edit name and description**.
    
4. Change the name to `Combined Transactions` and click **OK**.
    

![Flow view for 2 datasets: lab_2013_transactions.csv and lab_2014_transactions.csv, as well as the new Combined Transactions recipe](https://cdn.qwiklabs.com/iVdl%2BygsibM0jkBpNcn9DNWEp9CiPzDtwknwU8EIeiU%3D align="left")

5. Double-click **Combined Transactions** to edit the recipe. This opens the recipe in the Transformer Grid. Notice that the data in the grid is the structured data from the `lab_2013_transactions.csv`dataset.
    

### Combine multiple datasets with the same schema using a Union transform.

1. Before you make any transformations, look at the bottom left of the Transformer Grid. Here you can see the metadata display:
    

![Metadata display showing 5 columns, 26,476 rows, and 3 data types](https://cdn.qwiklabs.com/tNMpe6vJaP8PGfUv4nn5nbixLWyD7qX2J0Fly4v6zZA%3D align="left")

The metadata shows a quick summary of what data is loaded in the grid. Remember that the data loaded is a sample of the entire dataset, up to 10MB.

2. Look at the top of Transformer, near the recipe name. Here you can see the sample that is currently visible.
    

**Note:** Depending on the version, this may display differently.

![Recipe name section that shows initial data is visible](https://cdn.qwiklabs.com/UZA5u4JJI91rHVKXD5EkAUcyGMNaR%2FdzbHZj0JXqyOI%3D align="left")

OR

![Recipe name section that shows full data is visible](https://cdn.qwiklabs.com/jlXjgwaqwJRYrJMro6N%2BnsKLhj8Jie2fszKrL1JVk6I%3D align="left")

The sample shown is the initial data from the source. For small datasets (under 10MB), Dataprep loads the entire dataset into the initial data sample.

3. Click the **Recipe** icon at the top.
    

![Recipe icon](https://cdn.qwiklabs.com/5mV35nbOQWSIfZ8pqErSiUITG3niY7ux2y4mHu8w1MM%3D align="left")

4. Click **Add New Step**.
    
5. Type in "Union" in the search field then click on the result to get to the Union tool.
    

The Union Output field displays the output schema for your dataset. Each box represents a column. Cloud Dataprep bases the output schema on the schema of the dataset from which you initiated the union transform. In this case, the columns in the "Combined Transactions" dataset determine the columns that will appear in the combined output.

6. Click **Add Data**.
    
7. Check the `lab_2014_transactions`. In the drop down at the bottom left, select `Align By Name` and click **Apply**.
    
8. Click **Add to Recipe** to combine the datasets. After adding the union to your script, look at the `transaction_date` column.
    

This dataset now includes records from January 2013 through December 2014.

9. You have now unioned 2 of 3 datasets together. Check the metadata, you should also see additional rows.
    

![Metadata display showing 5 columns, 68,597 rows, and 3 data types](https://cdn.qwiklabs.com/Omt8VkZmx2C03D4RHhAE%2FV9ozAOpxTiLOgnVQ%2BQSbjo%3D align="left")

## Task 6. Modifying recipe steps

Over the course of working with data, you may often find yourself tweaking or removing certain transformations. Dataprep makes it very easy to edit your work. In this case, you have unioned 2 of the 3 datasets, but instead of adding a brand new step to union the remaining dataset, you can simply *edit* what you've already done.

1. Click the **Undo** icon to rewind the last action, in this case, the Union step.
    

Notice that your recipe is now empty. The grid and metadata are also updated to reflect the original state.

2. Click the **Redo** icon to bring back the Union step.
    
3. In the Recipe panel, **right click** the Union step and choose **Edit**.
    
4. This will open up the Union tool again. This time, click **Add data** again and check the `lab_2015_transactions`. In the drop down at the bottom left, select `Align By Name` and click **Apply**.
    
5. Examine the column-to-column mappings. Click **Add to Recipe** to combine all three datasets.
    
6. After adding the union to your script, look at the `transaction_date` column.
    

This dataset now includes records from January 2013 through December 2015. How many rows now show in the metadata?

7. Click on the `QWIKLAB1` flow name to return to the Flow View.
    

The flow visualization is updated to show how the three transactions datasets combine to form the Combined Transactions dataset:

![Flow view of the Combined Transactions recipe for the three datasets](https://cdn.qwiklabs.com/iVdl%2BygsibM0jkBpNcn9DNWEp9CiPzDtwknwU8EIeiU%3D align="left")

## Task 7. Join transactions data to customers data

Now that the datasets are combined, you will enrich the transactions data with information about where each purchase was made. To do this, join the customer data to the transactions data. When performing a join, treat the larger dataset as the master dataset, or the "left side" of the join. The smaller dataset should be the detail dataset, or the "right side" of the join. In Cloud Dataprep, the dataset from which you initiate a join automatically becomes the master dataset.

1. Double-click **Combined Transactions** to edit the recipe again.
    
2. Click on the **Join** icon in the Transformer toolbar to open the Join tool.
    

![Join icon](https://cdn.qwiklabs.com/5rX3Qhj4IJ1kvs5VbD60US%2FNt9SUr8zb01gK194FjpM%3D align="left")

**Note:** You can also activate the Join tool like you did previously, using the Recipe panel and **New Step** and searching for ‘Join’. There are many ways of creating transformations in Dataprep.

3. Click on the `lab_customers` dataset to bring in the other dataset, then click **Accept**.
    
4. On the next screen, edit the Join keys and conditions. On the left is a preview of the join key matches. On the right are options to edit the join type, join keys and the preview statistics of the join. Dataprep will try to automatically infer the correct join keys based on common values between the datasets.
    

Optionally, you can edit the join keys. Hover in the Join keys section, then click on the **pencil** (Edit icon) to modify the join key or **Add** to add additional join keys.

For these datasets, Cloud Dataprep chose an inside join on column `customer_id`. This means the output dataset will be those records that have the same customer\_id.

5. Click **Next**.
    
6. On the next screen, you can choose which columns to keep or drop after the join. In the **Output Columns** panel, put a check next to the following fields to add those columns to the Join:
    
    * `customer_id (current)`
        
    * `transaction_date`
        
    * `ticket_price`
        
    * `product`
        
    * `address_state`
        
    * `address_zip`
        
    * `region`
        
    * `start_date`
        
    * `end_date`
        

All unchecked columns will be dropped. Your results will look like this:

![The Output columns panel displaying various checked and unchecked columns titles](https://cdn.qwiklabs.com/MK4re4BcFH%2FhI0dClEf7PwdRitNOElAYNqjEXNcMU00%3D align="left")

7. Click **Review** to preview the result of your join in the Transformer Grid.
    
8. Click **Add to Recipe**.
    

## Task 8. Create new columns and rename

As a final step, you will want to do some additional cleanup of the data for your report. You will need to create some columns with the necessary values that you want to visualize by.

Let’s see another way of authoring Transformations in Dataprep - from the column menus.

1. Click the drop-down arrow next to **transaction\_date** &gt; **Extract** &gt; **Datetime** &gt; **Year (YYYY)**.
    

A new formula builder opens, pre-populated with the selected actions. A preview is also generated in the grid.

2. Click **Add**.
    

Notice that a new column is created, called `year_transaction_date`. In the previous step, you could have named the new column while editing the transformation. If you leave out the name, Dataprep will generate a new column based on the transformation step you took, or as column# if no source columns were selected.

3. You will manually rename this column. Click the drop-down arrow next to **year\_transaction\_date** &gt; **Rename**.
    
4. Enter `activity_year` in the field. Click **Add** to accept the changes.
    

Note that you can rename multiple columns with this transformation by hitting **Add** to add more mappings.

## Task 9. Publish the results to BigQuery

You just finished preparing your data and you're ready to produce a results file in Cloud Storage. Cloud Dataprep executes your data transformation recipe to produce your output file using the BigQuery engine.

1. Click **Run** in the top right of the Transformer Grid.
    
2. In the **Run Job** dialog, you can configure your job execution settings and output destination. By default, Cloud Dataprep will create a CSV file on Cloud Storage.
    
3. Hover your mouse over the existing Publishing Action and hit **Edit** on the right.
    
4. Click on the **BigQuery** tab on the left.
    
5. Select the `Dataprep` database, and click the **Create a new table** button on the right.
    
6. Enter `transactions_by_customer` as the new table name and select **Append to this table every run** as the write option.
    
7. Click **Update** on the bottom to update the output settings.
    
8. Now click **Run** to kick off your BigQuery job. This will take a few minutes. You can see the job processing on the Dataprep "Jobs" page. When it completes, you'll see a success message that resembles the following, and your data will be loaded in the new BigQuery table.
    

![The Status displaying as Completed for the Combined Transactions recipe on the Flow jobs page](https://cdn.qwiklabs.com/EUDqqmf7%2FAWL%2F2hiNJPU8Yew3ZdKUAqlcPZKf%2Fo0BNg%3D align="left")

9. Hover over the finished job and click **Profile** to see your data organized. It should resemble the following:
    

![The Profile tabbed page displaying sections for All data, and Results profile by column](https://cdn.qwiklabs.com/1MQ1urAEM%2FlJ%2FL837JCbsCFZ4byBTidgw%2B9mtARFp1U%3D align="left")

10. Your results are visible by querying BigQuery directly. From the Google Cloud Console, navigate to **ANALYTICS** &gt; **BigQuery**. Click on the `Dataprep` dataset.
    
11. Enter `select * from Dataprep.transactions_by_customer;` into the Query Editor. Click **Run** to see the data that was published.
    

Cloud Dataprep is that simple! It's easy to cleanse and enrich multiple data sources using an intuitive, visual interface.

Click *Check my progress* to verify the objective.

Publish the results to BigQuery

---

## Solution of Lab

%[https://youtu.be/UOEsBZm3GE4] 

**Download 👉**[**Here**](https://drive.google.com/uc?export=download&id=1KnhYDNrhY2LxpIlmo-u9fz8xqvkC-QzS)