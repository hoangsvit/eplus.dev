---
title: "SingleStore on Google Cloud - GSP1096"
seoTitle: "SingleStore on Google Cloud - GSP1096"
seoDescription: "This lab gives you hands-on experience deploying SingleStoreDB and combining it with Google Cloud's cloud native products like Pub/Sub, Dataflow and Cloud S"
datePublished: Thu Apr 24 2025 07:29:37 GMT+0000 (Coordinated Universal Time)
cuid: cm9v1lc8x000609l8hx4hfqig
slug: singlestore-on-google-cloud-gsp1096
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745479746213/3a974046-a200-4b8a-88c6-5cdeec3a502f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745479760684/cae7e23f-6ab3-4181-9781-80f165b04179.png
tags: singlestore-on-google-cloud-gsp1096, singlestore-on-google-cloud, gsp1096

---

## Overview

This lab gives you hands-on experience deploying SingleStoreDB and combining it with Google Cloud's cloud native products like Pub/Sub, Dataflow and Cloud Storage. To demonstrate these product features, work with the NYC public taxi dataset.

The flow of the lab is to first deploy the SingleStoreDB through your local browser and create the appropriate schema. Then, use Pub/Sub to push the data to Cloud Storage in real time with the help of Dataflow. The data generated and stored in object storage is consumed using SingleStoreDB's native pipeline. Once SingleStoreDB has ingested the data, you run queries and interact with SingleStore.

### What you'll learn

* How to log in and navigate the Google Cloud
    
* How to create a SingleStore DB instance/cluster
    
* How to use Cloud Shell to connect and create schema on SingleStoreDB
    
* How to create Pub/Sub topics and subscriptions, and how to pull and push data to other services
    
* How to create a Dataflow streaming job
    
* Use SingleStore native pipeline to load data from object storage
    
* How to run queries and interact with your data in SingleStore
    

**Prerequisites**

* Familiarity with Google Cloud and SingleStore is helpful but is not required.
    

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
    student-04-be435475f50c@qwiklabs.net
    ```
    
    Copied!content\_copy
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    80gD8rwMIpq3
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

## Task 1. Launch your own SingleStore Cluster

**At this point you should be logged into the Google Cloud in an Incognito window.**

1. In another tab in the Incognito window that you have open, go to the [SingleStore Portal](https://portal.singlestore.com/). You should see the below page:
    

![SingleStore sign in page](https://cdn.qwiklabs.com/DziaGp6dPiEphRKfzjSuOu7fCi8AvSs6Thi%2FIH6DVdA%3D align="left")

2. Click **Sign in with Google** and choose the Qwiklabs Username and Password from the lab.
    
3. Click **Continue** to Sign in to Single Store.
    
4. Check the checkbox for **Accept Terms of Service & Privacy Policy** and click **Continue**.
    
5. In the **Add your details** screen, select a Job Title and Country and click **Continue**.
    
6. In the **What's your data stack** screen, select one of the options or just click **Continue**.
    
7. Click **View my Deployment** to go to the SingleStore Customer Portal.
    
8. Click **Start Using SingleStore**, When you see Your free starter workspace is ready!
    

### Create the Workspace

1. On the upper left corner click **\+ Create New** and Select **Deployment**
    
2. On the Create Workspace page, configure the following settings:
    
    * Workspace Group Name: **Workshop**
        
    * Cloud Provider: **GCP**
        
    * Region: **US East 4 (N.Virginia)**, this should be the default, if not, change accordingly.
        

Your configuration should look like this:

![create workspace page](https://cdn.qwiklabs.com/0tPEQ4CkfJwj6VJmcNHya%2FqO8U8XYAkY4NOS9jxaXbs%3D align="left")

3. Click **Next**.
    
4. On the **Workspace Details** page, leave the default settings and click **Create Workspace**.
    

Wait a few minutes as your workspace spins up. It will generate a sample database for you, but we are not going to use it for this lab.

## Task 2. Connecting SingleStore and Google Cloud

1. Before connecting to the SingleStore Workspace, navigate back to the Google Cloud Console.
    
2. Open a new Cloud Shell window by clicking the icon in the top right corner of the console. If prompted click **Continue**.
    
3. In Cloud Shell, run the following commands to clone the GitHub repository to download the code for the workshop.
    

```apache
git clone https://github.com/mlochbihler/singlestore-gcp-looker-devday-01
cd singlestore-gcp-looker-devday-01/section_b
```

Copied!content\_copy

4. Go back to the SingleStore Portal. Once your workspace is initialized, click the dropdown arrow next to Connect and select **CLI Client**.
    

![click connect directly](https://cdn.qwiklabs.com/nJA5Gusr4BC7vxGE%2FkE6hVE5ycrXNg61uQejk18x1Qw%3D align="left")

5. On the **Connect to Workspace** page, first copy the password that was generated for you. There is a copy icon next to the password. It is a good idea to store this in a local file, you will need it later in this lab.
    
6. Click the **Copy** icon next to the MySQL Command. This will copy the command to your clipboard.
    

The MySQL command should resemble: `mysql -u admin -h svc-b675ae2f-b129-4baf-86ca-0a03c2c31d19-dml.gcp-virginia-1.svc.singlestore.com -P 3306 --default-auth=mysql_native_password --password`

You might see the password you just created in the mysql command above. This will only happen in the first time you open that window. After that the password will not show up anymore, that's why it is important you saved it. If for some reason you are not able to connect to the SingleStore DB, you can reset your password by going to the **Access** tab and clicking **Reset**.

7. Navigate back to the Google Cloud Console and open your Cloud Shell window.
    
8. Paste the MySQL command into the terminal.
    
9. Enter the password that you copied earlier when prompted. You're now at a mysql&gt; prompt.
    

![connected to mysql](https://cdn.qwiklabs.com/STNjIWxhnJHmuaNmwkIhgLws349TVmzkum4DilHLMVs%3D align="left")

If your deployment stops responding to the mysql commands, check the workspace state in SingleStore. It is configured to pause if left idle for over 20 minutes. If that's the case, the button will show "Resume". Click on it to resume its operations. It should take a couple of minutes to come back.

## Task 3. Creating Schema and interacting with SingleStore

In this section you will build the Table Schemas.

Use the following DDL to create a new database named `nyc_taxi`.

1. At the mysql&gt; prompt, run:
    

```apache
source create_nyctaxi_tables.ddl;
use nyc_taxi; show tables;
```

Copied!content\_copy

You should see similar results:

```apache
Database changed
+--------------------+
| Tables_in_nyc_taxi |
+--------------------+
| avgcost            |
| avgdist            |
| avgriders          |
| avgridetime        |
| avgwait_driver     |
| avgwait_passenger  |
| drivers            |
| nab_nyctaxi_scored |
| neighborhoods      |
| trips              |
| triptotals         |
| triptotalsc        |
+--------------------+
12 rows in set (0.05 sec)
```

You have created the Schema and the Database tables are listed.

2. Run the following command:
    

```apache
select * from avgcost limit 5;
```

Copied!content\_copy

The output of this query is "**Empty set" or "0"**, this is because you have only created the Schema and the Table is empty.

Pause here for a second. You've successfully created the SingleStore Database and connected to it. The Schema is set up but there is no data yet.

**If you have extra time, feel free to poke around and explore SingleStore!**

## Task 4. Check out the data in lab (Optional)

In today's lab, you use the NYC Taxi data, this data can be found in BigQuery's public datasets or on the NYC Open Data website.

This data has been put in a Cloud Storage bucket for you ahead of time, so there is no need for you to download/import this into Google Cloud. You can explore the data if you so wish.

The NYC Open Data website provides free datasets related to New York City, including taxi, education, police data and more.

In this lab, you work with the NYC Department of City Planning's [Neighborhood Tabulation Areas (NTAs)](https://data.cityofnewyork.us/City-Government/NTA-map/d3qk-pfyz) which provides information on approximate zones and neighborhoods in NYC. You use this in combination with NYC Taxi data to see where passengers were picked up and dropped off.

On the website you can visualize the data by neighborhood:

![The NTA map](https://cdn.qwiklabs.com/CAgfWupozZWx2d1lI21wUjKDIg73zZ%2FL7XHAfQzCgTA%3D align="left")

## Task 5. Setup a Cloud Storage Bucket

1. Before starting this section, open up a new Cloud Shell/ Terminal tab by clicking the **"+"** button:
    

![The highlighted Add button on the Cloud Shell ribbon.](https://cdn.qwiklabs.com/FZSkdT3pH9GPE4mN9rmwkvfvoGjwcOeqoSNYS5WRDs0%3D align="left")

In Google Cloud, the two main ways to set up resources are through the GUI and CLI. In the lab you use CLI to create the bucket and get the latest neighborhood data from NYC taxi cab website.

2. Copy the below commands to create your own bucket and import the data from a public bucket into your own bucket:
    

```apache
gcloud storage buckets create gs://$GOOGLE_CLOUD_PROJECT --location=europe-west4

gcloud storage cp -r gs://configuring-singlestore-on-gcp/drivers gs://$GOOGLE_CLOUD_PROJECT

gcloud storage cp -r gs://configuring-singlestore-on-gcp/trips gs://$GOOGLE_CLOUD_PROJECT

gcloud storage cp gs://configuring-singlestore-on-gcp/neighborhoods.csv gs://$GOOGLE_CLOUD_PROJECT
```

Copied!content\_copy

If prompted, click **Authorize**.

Notice there is already another bucket created in your project. Don't worry about this bucket, it's a staging/temp storage location for Dataflow.

3. Go to your Storage Bucket and make sure you have 2 folders and a CSV file, which should look like this:
    

![The Objects tabbed page, which includes the two folders; drivers and trips.](https://cdn.qwiklabs.com/xhfwSwgDV1syQ9B4baV%2F8AzTKPr9fxEV0CWcTT0t%2F5Y%3D align="left")

Click **Check my progress** to verify the objective.

Setup the Cloud Storage Bucket

**Check my progress**

## Task 6. Pub/Sub and Dataflow

Pub/Sub and Dataflow resources have been pre populated in your project. To check them out, use the search box on the top of your Cloud Console to find Pub/Sub and Dataflow.

1. Pub/Sub:
    

* Check that there is a Topic called "Taxi"
    
* Subscription called "Taxi-sub"
    

2. Dataflow:
    

* Check that there is a job called "GCStoPS" with status **failed**.
    

3. Click on the job and click **clone** to run this exact job. Rename it and check the job info (which you've pre populated since you cloned it) so you know what you're running. Scroll down and click **Run Job**.
    
4. Go back to **Dataflow jobs** and make sure you job has status "streaming".
    

**Note:** It can take 5-7 min for your Dataflow job to start streaming.

5. Go back to **Pub/Sub** and go to the **Taxi-sub** subscription, click **Messages** and **Pull** - messages should start rolling in. This should look like:
    

![pubsub subscription messages pulled](https://cdn.qwiklabs.com/TB5zrcn4Nv81lhOYszqB7KQc0vfWAWftfxTnwCKN8PM%3D align="left")

You've now simulated live data streaming! As an example, if you were to upload more data to GCS and Pull in Pub/Sub, Dataflow would be moving the data live.

Click **Check my progress** to verify the objective.

Clone the Dataflow Job

**Check my progress**

## Task 7. Setting up a streaming architecture on Google Cloud

A common streaming architecture on Google Cloud consists of **Pub/Sub** &gt; **Dataflow** &gt; **GCS**. Set this up now, then plug SingleStore onto GCS.

1. Navigate back to Dataflow.
    
2. Click **Create a job from template** and name it `pstogcs` (PubSub to GCS).
    
3. Select the Regional endpoint: "`europe-west4`"
    
4. Select the following Dataflow template: `Pub/Sub Subscription or Topic to Text Files on Cloud Storage`. A number of options will show up.
    
5. For Target, click BROWSE and select the bucket you created earlier called "`qwiklabs-gcp-01-133535a4a5a3`" (your unique project ID). You want the output of this job to land in the bucket you created earlier in the lab. Click **SELECT**.
    
6. Leave the output filename prefix as `output`. This is to mark the output files clearly.
    
7. Expand **Optional Source Parameters**. For Pub/Sub input subscription select the "Taxi-sub" which you just saw messages coming into. No need to include input topic.
    
8. Leave the defaults for everything else, then go to the bottom of the page and click **RUN JOB**.
    

If you get an error when running the job, check if the issues are in the Custom Pattern fields for date and time. If that's the case, delete the values on all of those fields and try again.

![The Create job from template page, which includes the aforementioned fields.](https://cdn.qwiklabs.com/27CVVr0YF3iejlIGPyoRycRQj7SUezcgR1HtsEBF3uw%3D align="left")

This Dataflow job should read the messages you saw earlier in Pub/Sub and Stream them into your Cloud Storage Bucket.

**Note:** It can take 5-7 min for your Dataflow job to start streaming.

9. Go to your **Cloud Storage Bucket**. You should see a timestamped output file in the bucket.
    
10. Click on the output file and select Download then you should see Taxi data that includes names, coordinates and times
    

![The output file, which lists the taxi data.](https://cdn.qwiklabs.com/k%2B4pg2P5IP7wVcC83TiVtqTA9l9OzILsOaFB%2Fx6HsBk%3D align="left")

Click **Check my progress** to verify the objective.

Setting up a streaming architecture on Google Cloud

**Check my progress**

### Connect Cloud Storage to SingleStore

1. You need to create a Key to connect this private Cloud Storage Bucket to SingleStore. To do this go to **Settings** (third option on the left hand side of Cloud Storage):
    
2. Click the **Interoperability** tab. At the bottom, click **Create a Key**.
    

Now you will ingest data into SingleStore with Pipelines and start a stored procedure.

3. Navigate back to the Cloud Shell tab with the SingleStore Terminal open.
    

4. To create Initial SingleStore Pipelines:
    

* From the first CloudShell tab, click **Open Editor**. If prompted click **Open in a new window**.
    
* Open the **singlestore-gcp-looker-devday-01 &gt; section b &gt; create\_nyctaxi\_pipelines.dml** file..
    

5. Make the following updates to the file:
    

* On line 4, change the bucket name to your bucket name.
    
* On line 5, add the Storage Bucket Access ID and Secret Key you just created.
    
* On line 12, change the bucket name to your bucket name.
    
* On line 13, add the Storage Bucket Access ID and Secret Key you just created.
    
* On line 22, change the bucket name to your bucket name. and `.tsv` to `.csv`.
    
* On line 23, add the Storage Bucket Access ID and Secret Key you just created.
    
* On line 26, change `/t` to `,`.
    

Your file should resemble the following:

![updated create_nyctaxi_pipelines.dml file](https://cdn.qwiklabs.com/NLTmBvMvrOZIEViXaoEeSfK8g43ep6K1dOSmhkSqdeY%3D align="left")

6. Click **Save** and go back to the Terminal.
    

7. From the Cloud Shell Terminal, connect to SingleStore using the MySQL command you used earlier. You can use the same command you used earlier to connect to SingleStore.
    
8. At the MySQL prompt, run the following command to create the pipelines:
    

```apache
source create_nyctaxi_pipelines.dml;
show pipelines;
```

Copied!content\_copy

The output should look like:

| **Pipelines\_in\_nyc\_taxi** | **State** | **Scheduled** |
| --- | --- | --- |
| neighborhoods | Stopped | False |
| drivers | Stopped | False |
| trips | Stopped | False |

## Task 8. Start Pipelines

1. Run the following commands to start the pipelines:
    

```apache
source start_nyctaxi_pipelines.dml;
show pipelines;
```

Copied!content\_copy

Output:

| **Pipelines\_in\_nyc\_taxi** | **State** | **Scheduled** |
| --- | --- | --- |
| neighborhoods | Running | False |
| drivers | Running | False |
| trips | Running | False |

2. Make sure the Pipeline status for all three is **Running**.
    

## Task 9. Run Operational Analytic Queries

1. Run the following commands to run the operational analytic queries:
    

```apache
select * from trips limit 5;
select * from drivers limit 5;
select * from neighborhoods limit 5;
```

Copied!content\_copy

![The command output](https://cdn.qwiklabs.com/sAW0nWZvs3YPQWR3SGJzZZBukfqm1df9Flwykqaa6Fg%3D align="left")

Report 1: Total number of trips for each neighborhood.

2. Then, run:
    

```apache
source total_trips.sql;
```

Copied!content\_copy

Report 2: The average amount of time between someone requesting a ride and that person being picked up.

3. Next. run:
    

```apache
source average_wait.sql;
```

Copied!content\_copy

Report 3: The average distance of a trip.

4. Run:
    

```apache
source average_distance.sql;
```

Copied!content\_copy

Report 4: The average amount of time between someone being picked up and that person being dropped off.

5. Run:
    

```apache
source average_ride_time.sql;
```

Copied!content\_copy

Report 5: The average cost of a trip.

6. Run:
    

```apache
source average_cost.sql;
```

Copied!content\_copy

Report 6: The average amount of time it takes from the time a driver accepts a ride to the time they pick up the passenger.

7. Run:
    

```apache
source average_wait2.sql;
```

Copied!content\_copy

Report 7: The average number of riders per trip.

8. Run:
    

```apache
source average_num_riders.sql;
```

---

## Solution of Lab

%[https://youtu.be/GPGMr6lFd5k] 

```apache
curl -LO raw.githubusercontent.com/ArcadeCrew/Google-Cloud-Labs/refs/heads/main/SingleStore%20on%20Google%20Cloud/arcadecrew.sh
sudo chmod +x arcadecrew.sh
./arcadecrew.sh
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745479144984/d82cb306-2e95-4b4e-bb59-24213a71e7c3.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745479153031/bb5672bb-5340-4b49-85ba-e583df8c9465.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745479262443/691de444-75db-4c83-953d-ed8770245a7f.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745479288731/64947575-c8d4-4412-8649-6ff823c2623e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745479366556/8edd078d-f4e4-4987-81cf-2a0d6788b774.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745479671638/1744559d-9714-4bc4-841a-f42b96f55c2c.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1745479690609/9faa85c3-9f65-446c-badd-31bbd06970b0.png align="center")