---
title: "Analytics as a Service for Data Sharing Partners - GSP1042"
seoTitle: "Analytics as a Service for Data Sharing Partners - GSP1042"
seoDescription: "A common scenario is where a Google Cloud Data Sharing Partner has proprietary datasets that customers can use for their analytics use cases. Customers need"
datePublished: 2025-04-13T07:42:24.406Z
cuid: cm9fc7edx000909kydw7w8fk7
slug: analytics-as-a-service-for-data-sharing-partners-gsp1042
cover: https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/ee55f77d-1d95-44c7-bec4-df369c28cf5f.png
ogImage: https://cdn.hashnode.com/uploads/og-images/5f802df9bbabf10ec84d9fe8/19fbe71c-181f-40b0-9761-e1073dc046fd.png
tags: analytics-as-a-service-for-data-sharing-partners-gsp1042, analytics-as-a-service-for-data-sharing-partners, gsp1042

---

## Overview

A common scenario is where a Google Cloud Data Sharing Partner has proprietary datasets that customers can use for their analytics use cases. Customers need to subscribe to this data, query it within their own platform, then augment it with their own datasets and use their visualization tools for their customer facing dashboards. This enables Data Sharing Partners to simplify and accelerate how they build and deliver value from data-driven solutions.

![overview diagram](https://cdn.qwiklabs.com/SVrpv6fmQo0YfGgwaH%2FZ%2BlpXaU6CXOXkiIj0bbcSco8%3D align="left")

Through integration with Google Cloud IAM, you can set permissions on BigQuery objects to enable access by users inside or outside of organizations. In this lab, you will learn how both Data Sharing Partners and their customers can use BigQuery data stored in a partner project in the form of customer facing dashboards for analytics as a managed service. You will be given three projects: the Data Sharing Partner project which owns the dataset and two separate and distinct customers who can access a subset of the dataset from their respective projects. Customers will list customer information specific to their geographical region.

## Objectives

In this lab, you will:

*   Copy a public dataset into a Data Sharing Partner Project.
    
*   Create distinct authorized views for each customer.
    
*   Consume the authorized views to create customer-specific dashboards.
    

## Setup and Requirements

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources are made available to you.

This hands-on lab lets you do the lab activities in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

*   Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito (recommended) or private browser window to run this lab. This prevents conflicts between your personal account and the student account, which may cause extra charges incurred to your personal account.

*   Time to complete the lab—remember, once you start, you cannot pause a lab.
    

**Note:** Use only the student account for this lab. If you use a different Google Cloud account, you may incur charges to that account.

### How to start your lab and sign in to the Google Cloud console

1.  Click the **Start Lab** button. If you need to pay for the lab, a dialog opens for you to select your payment method. On the left is the Lab Details pane with the following:
    
    *   The Open Google Cloud console button
        
    *   Time remaining
        
    *   The temporary credentials that you must use for this lab
        
    *   Other information, if needed, to step through this lab
        
2.  Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the Sign in page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3.  If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-04-7cc8e3af15b8@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4.  Click **Next**.
    
5.  Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    oun4ev8O7mFx
    ```
    
    You can also find the Password in the Lab Details pane.
    
6.  Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7.  Click through the subsequent pages:
    
    *   Accept the terms and conditions.
        
    *   Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    *   Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To access Google Cloud products and services, click the **Navigation menu** or type the service or product name in the **Search** field.

![Navigation menu icon and Search field](https://cdn.qwiklabs.com/9Fk8NYFp3quE9mF%2FilWF6%2FlXY9OUBi3UWtb2Ne4uXNU%3D align="left")

## Create authorized views

In the first project, you will take on the role of a Data Sharing Partner creating and sharing a dataset using an authorized view.

### Create Authorized View A

1.  From the lab pane. open the **Data Sharing Partner Project Console** and log in with the associated credentials.
    
2.  From the **Navigation Menu**, go to **BigQuery** > **BigQuery Studio**. If prompted click **Done**.
    
3.  Click on **\+ (Create SQL query)** where you can run your query.
    
4.  Run the following query to create an authorized view for Customer A, based on a public geographical dataset.
    

```sql
SELECT * FROM `bigquery-public-data.geo_us_boundaries.zip_codes`
WHERE state_code="TX"
LIMIT 4000
```

5.  Click **Run**.
    
6.  From the toolbar, click **Save** > **Save View**.
    
7.  Keep the project as default and for the **Dataset** select `demo_dataset`.
    
8.  For **Table** type `authorized_view_a`.
    
9.  Click **Save**.
    

### Create Authorized View B

1.  In the query editor, remove the previous query you just ran.
    
2.  Run the following query to create an authorized view for Customer B, based on a public geographical dataset.
    

```sql
SELECT * FROM `bigquery-public-data.geo_us_boundaries.zip_codes`
WHERE state_code="CA"
LIMIT 4000
```

3.  Click **Run**.
    
4.  From the toolbar, click **Save View** > **Save View as**.
    
5.  Keep the project as default and for the **Dataset** select `demo_dataset`.
    
6.  For **Table** type `authorized_view_b`.
    
7.  Click **Save**.
    

Your authorized views should resemble the following:

![authorized views](https://cdn.qwiklabs.com/53SN9FAN4FBzGrEgj5X828gGF2sNYWINlZSkkWnw8FE%3D align="left")

Click **Check my progress** to verify your performed task.

Created Authorized Views

**Check my progress**

## Assign IAM permissions to both the views

1.  From the BigQuery Explorer pane, open the **demo\_dataset** and click **\+ Sharing** > **Authorize Views**.
    

![authorize views](https://cdn.qwiklabs.com/kjrsH87nmJnPznCs%2F6rluH%2BYVonULwHnNaA63WRxUx4%3D align="left")

2.  Add **Authorized View A** that needs to be authorized to share: `qwiklabs-gcp-00-d6842afe23d9.demo_dataset.authorized_view_a`.
    
3.  Click **Add Authorization**.
    
4.  Add **Authorized View B** that needs to be authorized to share: `qwiklabs-gcp-00-d6842afe23d9.demo_dataset.authorized_view_b`.
    
5.  Click **Add Authorization**. Your authorized views should resemble the following:
    

![authorized views](https://cdn.qwiklabs.com/hOK48qWlIt%2B1aIydmgeftC9f7Hpwmr9LQNby1pzc7M4%3D align="left")

6.  Click **Close**.
    

Click **Check my progress** to verify your performed task.

Assign IAM permissions to both the views

**Check my progress**

## Grant permissions to the users to access the views

In this section, you will assign permissions for each customer user and their associated authorized views.

### Assign IAM permissions for Customer A

1.  Under your project, inside of **demo\_dataset**, open the `authorized_view_a` view.
    
2.  Click **Share**.
    
3.  Click on **Add Principal** and add the *Customer A* user:
    
    *   `student-04-7983086a5e34@qwiklabs.net`
        
4.  Select the **BigQuery Data Viewer** role.
    

![add bigquery data viewer principal](https://cdn.qwiklabs.com/tKPr2wADt5o6%2B79IRDAXNWF%2FCYz4wZf9OUayEakzDn0%3D align="left")

6.  Click **Save**.
    
7.  Click **Close**.
    

### Assign IAM permissions for Customer B

1.  Under your project, inside of **demo\_dataset**, open the `authorized_view_b` view.
    
2.  Click **Share**.
    
3.  Click on **Add Principal** and add the *Customer B* user:
    
    *   `student-04-7d758470618c@qwiklabs.net`
        
4.  Select the **BigQuery Data Viewer** role.
    

![add bigquery data viewer principal](https://cdn.qwiklabs.com/Mz6%2Bf%2B9x6s4OleLd6fqVRIjPY1CRcc2LhGUy%2BHIJxk8%3D align="left")

6.  Click **Save**.
    
7.  Click **Close**.
    

Click **Check my progress** to verify your performed task.

Grant permissions to the users to access the views

**Check my progress**

## Display insights for View A

In this section, you will verify that the authorized views were shared for each customer user correctly.

### Verify authorized view sharing for Customer A

1.  Close the **Data Sharing Partner Project Console** and from the lab pane open the **Customer Project A Console**. Log in with the associated credentials.
    
2.  From the **Navigation Menu**, go to **BigQuery** > **BigQuery Studio**. If prompted click **Done**.
    
3.  Click on **\+ (Create SQL query)** where you can run your query.
    

Now you will join the data from *Customer A's* authorized view to the customer specific dataset to generate new insights.

4.  Run the following query to find all customers in a State. Since the authorized view available to Customer A is filtered on the state of Texas, the query should return only customers in that state.
    

```sql
SELECT geos.zip_code, geos.city, cust.last_name, cust.first_name
FROM `qwiklabs-gcp-02-81e5e0b4d29f.customer_a_dataset.customer_info` as cust
JOIN `qwiklabs-gcp-00-d6842afe23d9.demo_dataset.authorized_view_a` as geos
ON geos.zip_code = cust.postal_code;
```

5.  Click **Run**.
    

Your results should resemble the following:

![customer a query](https://cdn.qwiklabs.com/JtF1qCl5SoUbdP%2BKvPlPOMciGn2QxTJdhPEDSLz5%2B6Y%3D align="left")

6.  On the query toolbar, select **Save** > **Save View**.
    
7.  Click in the **Dataset** field and select `customer_a_dataset`.
    
8.  In the **Table** field, type `customer_a_table`.
    
9.  Click **Save**. You should now be able to see the dataset and table, as well as query it.
    

### Connect BigQuery to Looker Studio

1.  Open [Looker Studio](https://lookerstudio.google.com/).
    
2.  On the **Reports** page, in the **Start with a Template** section, click the **Blank Report** template. This creates a new untitled report.
    

If prompted, complete **Account setup** settings and then click **Continue**.

3.  Click the **Blank Report** template again.
    
4.  In the **Add data to report** window, in the search box, enter `BigQuery`.
    

![add bigquery data](https://cdn.qwiklabs.com/9JbyI4SOkQTLNPPwgTeXQT7FEwy66AZlW%2FmdyfLw1sQ%3D align="left")

5.  Click the **BigQuery** Connector.
    
6.  For Authorization, click **Authorize**. This action lets Looker Studio access to your Google Cloud project.
    

In the **Request for permission dialog**, click **Allow** to give Looker Studio the ability to view data in BigQuery.

7.  Select **Recent Projects** from the left pane, select `qwiklabs-gcp-02-81e5e0b4d29f` > `customer_a_dataset` > `customer_a_table`.
    

![connect customer a table](https://cdn.qwiklabs.com/zAeicp2IxsufA3Xlx31g1oiAXNgbGUXF1kKFzR%2Bmnv8%3D align="left")

8.  Click **Add**.
    
9.  When prompted, click **Add to Report**.
    

![add data to report](https://cdn.qwiklabs.com/oSllt33NkkKwBFnOWfgp8966QxAcTO0mE1vModAsUaA%3D align="left")

### Create a visualization in Looker Studio

1.  At the top of the page, click **Untitled Report** to change the report name. Type `Customer A Visualization`.
    
2.  After the report editor loads, click **Insert** > **Pie chart**.
    
3.  On the Pie Chart **Data** tab, notice the value for Data Source (`customer_a_table`) and the default values for Dimension and Metric: `zip_code` and `Record Count`.
    
4.  Drag `city` from **Available Fields** onto the `zip_code` dimension to replace it.
    

The visualization should resemble the following:

![customer a visualization](https://cdn.qwiklabs.com/IJRGRn%2FF1P9M4Nh9k%2BIU0AoGwQkBTVVqTVToxtntMcc%3D align="left")

### Verify Analytics security

1.  From the toolbar, expand **\+ Share** > **Get report link**.
    

![get report link](https://cdn.qwiklabs.com/ldk22XXimhbedYOM92Y8ysy5AYPAYstI%2BqWI3ByHImA%3D align="left")

2.  In the pop-up dialogue, click **Copy Link** and save it somewhere. **Exit** out of the window.
    
3.  Click the student profile in the top right and click **Sign out**.
    

![sign out](https://cdn.qwiklabs.com/NfqafngTU%2B%2Fqoa86ez6k%2BrJHozkUL4FlaQwD1Xvpcjc%3D align="left")

4.  Select **Use another account**.
    

![use another account](https://cdn.qwiklabs.com/ELvlK64oufwjej2EbGXa4i83sycONBaD68hNPARSrJg%3D align="left")

5.  Log in with the **Customer B** user credentials.
    
6.  You will be taken to your **Google Account** home page.
    
7.  Open a new tab and navigate to the Looker Studio link you copied earlier.
    

![cant access report](https://cdn.qwiklabs.com/z3%2B%2Fua4Nt8pL2FVu97MF3CZ%2FEifHgVk22EfoB%2Fgse4Q%3D align="left")

Upon logging in as Customer B, you should not be able to access the Analytics Dashboard of Customer A since you are not authorized.

Click **Check my progress** to verify your performed task.

Display insights for View A

**Check my progress**

## Display insights for View B

### Verify authorized view sharing for Customer B

1.  Close the **Customer Project A Console** and from the lab pane open the **Customer Project B Console**. Log in with the associated credentials.
    
2.  From the **Navigation Menu**, go to **BigQuery** > **BigQuery Studio**. If prompted click **Done**.
    
3.  Click on **\+ (Create SQL query)** where you can run your query.
    

Now you will join the data from *Customer B's* authorized view to the customer specific dataset to generate new insights.

4.  Run the following query to find all customers in a State. Since the authorized view available to Customer A is filtered on the state of California, the query should return only customers in that state.
    

```sql
SELECT geos.zip_code, geos.city, cust.last_name, cust.first_name
FROM `qwiklabs-gcp-04-9e3a7e896dcb.customer_b_dataset.customer_info` as cust
JOIN `qwiklabs-gcp-00-d6842afe23d9.demo_dataset.authorized_view_b` as geos
ON geos.zip_code = cust.postal_code;
```

5.  Click **Run**.
    

Your results should resemble the following:

![customer b query](https://cdn.qwiklabs.com/%2B32wUQbXxOu5NzEF21vjSZPSt8%2BhYpkONoCu8iLS5rg%3D align="left")

5.  On the query toolbar, select **Save** > **Save View**.
    
6.  Click in the **Dataset** field and select `customer_b_dataset`.
    
7.  In the **Table** field, type `customer_b_table`.
    
8.  Click **Save**. You should now be able to see the dataset and table, as well as query it.
    

### Connect BigQuery to Looker Studio

1.  Open [Looker Studio](https://lookerstudio.google.com/).
    
2.  On the **Reports** page, in the **Start with a Template** section, click the **Blank Report** template. This creates a new untitled report.
    

If prompted, complete **Account setup** settings and then click **Continue**.

3.  Click the **Blank Report** template again.
    
4.  In the **Add data to report** window, in the search box, enter `BigQuery`.
    

![add bigquery data](https://cdn.qwiklabs.com/9JbyI4SOkQTLNPPwgTeXQT7FEwy66AZlW%2FmdyfLw1sQ%3D align="left")

5.  Click the **BigQuery** Connector.
    
6.  For Authorization, click **Authorize**. This action lets Google Looker Studio access to your Google Cloud project.
    

In the **Request for permission dialog**, click **Allow** to give Looker Studio the ability to view data in BigQuery.

7.  Select **Recent Projects** from the left pane, select `qwiklabs-gcp-04-9e3a7e896dcb` > `customer_b_dataset` > `customer_b_table`.
    

![connect customer b table](https://cdn.qwiklabs.com/oR2nbNMh3fXE6mZO2Kfw9yO%2FNNUvNCErbvaDx24Hwj8%3D align="left")

8.  Click **Add**.
    
9.  When prompted, click **Add to Report**.
    

![add data to report](https://cdn.qwiklabs.com/oSllt33NkkKwBFnOWfgp8966QxAcTO0mE1vModAsUaA%3D align="left")

### Create a visualization in Looker Studio

1.  At the top of the page, click **Untitled Report** to change the report name. Type `Customer B Visualization`.
    
2.  After the report editor loads, click **Insert** > **Pie chart**.
    
3.  On the Pie Chart **Data** tab, notice the value for Data Source (`customer_b_table`) and the default values for Dimension and Metric: `zip_code` and `Record Count`.
    
4.  Drag `city` from **Available Fields** onto the `zip_code` dimension to replace it.
    

The visualization should resemble the following:

![customer b visualization](https://cdn.qwiklabs.com/JZs%2Bsy%2BrFBSL4Pa2Tjq8ZYU%2FtZSX3IJ2IMeiiRZA5%2Bo%3D align="left")

### Verify Analytics security

1.  From the toolbar, expand **\+ Share** > **Get report link**.
    

![get report link](https://cdn.qwiklabs.com/ldk22XXimhbedYOM92Y8ysy5AYPAYstI%2BqWI3ByHImA%3D align="left")

2.  In the pop-up dialogue, click **Copy Link** and save it somewhere. **Exit** out of the window.
    
3.  Click the student profile in the top right and click **Sign out**.
    

![sign out](https://cdn.qwiklabs.com/NfqafngTU%2B%2Fqoa86ez6k%2BrJHozkUL4FlaQwD1Xvpcjc%3D align="left")

4.  Select **Use another account**.
    

![use another account](https://cdn.qwiklabs.com/ELvlK64oufwjej2EbGXa4i83sycONBaD68hNPARSrJg%3D align="left")

5.  Log in with the **Customer A** user credentials.
    
6.  You will be taken to your **Google Account** home page.
    
7.  Open a new tab and navigate to the Looker Studio link you copied earlier.
    

![cant access report](https://cdn.qwiklabs.com/i5DS3t%2BS6AASFG%2BISdY7HEThNuWAA2NzrP4grfewm%2F0%3D align="left")

Upon logging in as Customer A, you should not be able to access the Analytics Dashboard of Customer B since you are not authorized.

Click **Check my progress** to verify your performed task.

Display insights for View B

**Check my progress**

* * *

## Solution of Lab

### Quick

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/76563e0f-2bd5-4fc9-96ff-e811177f91cc.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/334a4c9f-533c-42af-87a9-e7c1b250ee5c.png align="center")

```plaintext
curl -LO raw.githubusercontent.com/ePlus-DEV/storage/refs/heads/main/labs/GSP1042/lab.sh
source lab.sh
```

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/38b0b4d5-939e-4fdd-b3b0-485f8490e749.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/5d069502-83b7-4e5a-a0be-fc299dd593d0.png align="center")

Login **Customer A**

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/e6274271-178e-49f1-90ad-dbc8fe4b51f9.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/c779f463-0fb6-40dd-add2-d7c6527414ad.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/fe7e8bcc-b472-4b12-a4df-f4adeb24d8f6.png align="center")

Log in as **Customer B**: perform the same steps as logging in as **Customer A**.

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/7ad71890-f1c4-413f-bacb-c4113f00e117.png align="center")

![](https://cdn.hashnode.com/uploads/covers/5f802df9bbabf10ec84d9fe8/bd2a1a46-7fbb-4de1-b087-82ef6cef9053.png align="center")

**TASK 4 - CUSTOMER A**

1.  Open: https://lookerstudio.google.com/
    
2.  Login with **Customer A**: `student-04-66c26cc29d40@qwiklabs.net`
    
3.  Create a Blank Report.
    
4.  Add BigQuery data: Project : `qwiklabs-gcp-01-d5430d195207`  
    Dataset : `customer_a_dataset`  
    Table : `customer_a_table`
    
5.  Rename report:
    
    ```plaintext
    Customer A Visualization
    ```
    
6.  Insert a Pie chart:  
    Dimension : **city**  
    Metric : **Record Count**
    
7.  Share → Get report link → Copy Link.
    
8.  Login with Customer B and open the copied link. Customer B should NOT be able to access the report.
    
9.  Click Check my progress for Task 4.
    

**TASK 5 - CUSTOMER B**

1.  Open: https://lookerstudio.google.com/
    
2.  Login with **Customer B**: `student-04-aa86aa15b6ef@qwiklabs.net`
    
3.  Create a Blank Report.
    
4.  Add BigQuery data: Project : `qwiklabs-gcp-02-599d29d14457`  
    Dataset : **customer\_b\_dataset**  
    Table : **customer\_b\_table**
    
5.  Rename report:
    
    ```plaintext
    Customer B Visualization
    ```
    
6.  Insert a Pie chart:  
    Dimension : **city**  
    Metric : **Record Count**
    
7.  Share → Get report link → Copy Link.
    
8.  Login with Customer A and open the copied link. Customer A should NOT be able to access the report.
    
9.  Click Check my progress for Task 5.
    

* * *

### Other Solution

%[https://youtu.be/m3BY-ifc_Vs] 

**Run in CloudShell**

```apache
bq mk \
--use_legacy_sql=false \
--description "DESCRIPTION" \
--view 'SELECT * FROM `bigquery-public-data.geo_us_boundaries.zip_codes`
WHERE state_code="TX"
LIMIT 4000' \
--project_id $DEVSHELL_PROJECT_ID \
demo_dataset.authorized_view_a
bq mk \
--use_legacy_sql=false \
--description "DESCRIPTION" \
--view 'SELECT * FROM `bigquery-public-data.geo_us_boundaries.zip_codes`
WHERE state_code="CA"
LIMIT 4000' \
--project_id $DEVSHELL_PROJECT_ID \
demo_dataset.authorized_view_b
echo "PROJECT ID=$DEVSHELL_PROJECT_ID"
```

**Copy the project id (From last line in terminal) and Store it**

**Bigquery > demo\_dataset**

> sharing > Authorize Views > `demo_dataset` > select a > add authorization

> Then again > `demo_dataset` > select b > add authorization > close

**authorized\_view\_a > Share**

> Add Principal > Paste username A from lab > Role `BigQuery Data Viewer` > save

**authorized\_view\_b > Share**

> Add Principal > Paste username B from lab > Role `BigQuery Data Viewer` > save

**Close the incognito window**

**Login to Project A Console**

```apache
PROJECT_ID=
```

```apache
bq mk --use_legacy_sql=false --view 'SELECT geos.zip_code, geos.city, cust.last_name, cust.first_name
FROM `'$DEVSHELL_PROJECT_ID'.customer_a_dataset.customer_info` as cust
JOIN `'$PROJECT_ID'.demo_dataset.authorized_view_a` as geos
ON geos.zip_code = cust.postal_code;' customer_a_dataset.customer_a_table
```

> Open in incognito [Looker](https://lookerstudio.google.com/) > Blank report > Country `India` > Company `cloudhustlers`

> Agree and continue > Yes to all > Continue > Bigquery > Authorize

> GCP ID > customer\_a\_dataset > customer\_a\_table > ADD > add to report

> Close the incognito window

Login to Project B Console

```apache
PROJECT_ID=
```

```apache
bq mk --use_legacy_sql=false --view 'SELECT geos.zip_code, geos.city, cust.last_name, cust.first_name
FROM `'$DEVSHELL_PROJECT_ID'.customer_b_dataset.customer_info` as cust
JOIN `'$PROJECT_ID'.demo_dataset.authorized_view_b` as geos
ON geos.zip_code = cust.postal_code;' customer_b_dataset.customer_b_table
```

> Open in incognito [Looker](https://lookerstudio.google.com/) > Blank report > Country `India` > Company `cloudhustlers`

> Agree and continue > Yes to all > Continue > Bigquery > Authorize

> GCP ID > customer\_b\_dataset > [c](https://lookerstudio.google.com/)us[to](https://lookerstudio.google.com/)mer\_b\_table > ADD > add to report

* * *

### Manual

%[https://www.youtube.com/watch?v=-06uEHtuAa0] 

* * *

### Old Solution

### **1\. ☁️ Initialize Views in Cloud Shell**

```apache
curl -LO https://raw.githubusercontent.com/ArcadeCrew/Google-Cloud-Labs/refs/heads/main/Analytics%20as%20a%20Service%20for%20Data%20Sharing%20Partners/arcadecrew.sh
sudo chmod +x arcadecrew.sh
./arcadecrew.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1746868915656/098a1ddb-f8b2-4174-8c1a-b0a8193bfc68.png align="center")

### **2\. 🔑 Store Your Main Project ID**

After running the commands above, **copy the** `PROJECT ID` displayed in the last line of your Cloud Shell output (e.g., `PROJECT ID=qwiklabs-gcp-xxxx`). You'll need this ID for subsequ[ent st](https://lookerstudio.google.com/)eps.

### **3\. 👁️ BigQuery: Authorize Views**

Follow these steps in the Google Clou[d Cons](https://lookerstudio.google.com/)ole for your Main Lab Project:

1.  Navigate to **☰ Menu > BigQuery**[.](https://lookerstudio.google.com/)
    
2.  [I](https://lookerstudio.google.com/)n the Explorer panel, find your project, then expand `demo_dataset`.
    
3.  [Cl](https://lookerstudio.google.com/)ick on **Sharing**, then se[lect **A**](https://lookerstudio.google.com/)**uthorize Views**.
    
4.  In the "Authorize views" panel:
    

*   Select `authorized_view_a` from the list.
    
*   Click **ADD AUTHORIZATION**.
    

5.  Repeat for the other view:
    

*   Select `authorized_view_b` from the list.
    
*   Click **ADD AUTHORIZATION**.
    

6.  Click **CLOSE**.
    

### **4\. 🤝 Share Authorized Views**

Now, share these views with the user accounts specified in the l[ab:](https://lookerstudio.google.com/)

#### [**F**](https://lookerstudio.google.com/)**or** `authorized_view_a`:

1.  In BigQuery, under `demo_dataset`, find `authorized_vie`[`w_a`.](https://lookerstudio.google.com/)
    
2.  Click the three dots (⋮) next to it (or select it) and choose [**SHARE**](https://lookerstudio.google.com/).
    
3.  In the "Share `authorized_view_a`" panel, click **ADD PRINCIPAL**.
    
4.  [In](https://lookerstudio.google.com/) the "New principals" field, paste **Username A** (from the lab instructions).
    
5.  Assign the Role: `BigQuery Data Viewer`.
    
6.  Click **SAVE**.
    

#### **For** `authorized_view_b`:

1.  Similarly, find `authorized_view_b` under `demo_dataset`.
    
2.  Click the three dots (⋮) next to it (or select it) and choose **SHARE**.
    
3.  Click **ADD PRINCIPAL**.
    
4.  Paste **Username B** (from the lab instructions).
    
5.  Assign the Role: `BigQuery Data Viewer`.
    
6.  Click **SAVE**.
    

### **5\. 🚪 Close Incognito Window (If Open)**

If you have any incognito windows open from previous lab activity, close them.

* * *

### **🚀 Project A: Configuration**

**1\. 💻 Access Project A**

*   Log in to the Google Cloud Console using the credentials provided for **Project A**.
    
*   Open a new **Cloud Shell** session within Project A.
    

**2\. 🛠️ Create View in Project A**

In the Project A Cloud Shell, first set an environment variable for your **Main Lab Project ID** (the one you copied in step 1.2):

```apache
curl -LO https://raw.githubusercontent.com/ArcadeCrew/Google-Cloud-Labs/refs/heads/main/Analytics%20as%20a%20Service%20for%20Data%20Sharing%20Partners/arcadecrew1.sh
sudo chmod +x arcadecrew1.sh
./arcadecrew1.sh
```

**3\. 📊 Connect Looker Studio (for Project A)**

1.  Open a **new Incognito window**.
    
2.  Navigate to [Looker Studio](https://lookerstudio.google.com/).
    
3.  Click on **Blank Report**.
    
4.  If prompted for account setup (country/company):
    

*   Country: Select **India** (or your preferred country).
    
*   Company: Enter **ArcadeCrew** (or any name).
    
*   Agree to the terms and click **Continue**. Answer any subsequent prompts (e.g., "Yes to all" for email preferences).
    

5.  In the "Add data to report" window, select the **BigQuery** connector.
    
6.  Click **AUTHORIZE** if prompted, and allow access.
    
7.  Under "Project", select **Project A's ID**.
    
8.  Under "Dataset", select `customer_a_dataset`.
    
9.  Under "Table", select `customer_a_table`.
    
10.  Click **ADD** (bottom right), then confirm by clicking **ADD TO REPORT**.
     

**4\. 🚪 Close Incognito Window**

Close the Incognito window used for Project A's Looker Studio.

* * *

### **🚀 Project B: Configuration**

**1\. 💻 Access Project B**

*   Log in to the Google Cloud Console using the credentials provided for **Project B**.
    
*   Open a new **Cloud Shell** session within Project B.
    

**2\. 🛠️ Create View in Project B**

In the Project B Cloud Shell, set the environment variable for your **Main Lab Project ID** again:

```apache
curl -LO https://raw.githubusercontent.com/ArcadeCrew/Google-Cloud-Labs/refs/heads/main/Analytics%20as%20a%20Service%20for%20Data%20Sharing%20Partners/arcadecrew2.sh
sudo chmod +x arcadecrew2.sh
./arcadecrew2.sh
```

**3\. 📊 Connect Looker Studio (for Project B)**

1.  Open a **new Incognito window**.
    
2.  Navigate to [Looker Studio](https://lookerstudio.google.com/).
    
3.  Click on **Blank Report**.
    
4.  (You might not be prompted for account setup again if you recently did it for Project A). If prompted:
    

*   Country: Select **India** (or your preferred country).
    
*   Company: Enter **ArcadeCrew** (or any name).
    
*   Agree and **Continue**.
    

5.  Select the **BigQuery** connector.
    
6.  Click **AUTHORIZE** if needed.
    
7.  Under "Project", select **Project B's ID**.
    
8.  Under "Dataset", select `customer_b_dataset`.
    
9.  Under "Table", select `customer_b_table`.
    
10.  Click **ADD**, then **ADD TO REPORT**.