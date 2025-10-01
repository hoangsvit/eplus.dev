---
title: "Perform Predictive Data Analysis in BigQuery: Challenge Lab - GSP374"
seoTitle: "Perform Predictive Data Analysis in BigQuery: Challenge Lab - GSP374"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Wed Aug 21 2024 02:24:29 GMT+0000 (Coordinated Universal Time)
cuid: cm038ddhy000009jtghij1r12
slug: perform-predictive-data-analysis-in-bigquery-challenge-lab-gsp374
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759298055184/c868d288-b90b-4a56-911e-ecefc268f4fd.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1759298067443/2c32b567-2c53-49fe-ad91-f13392374c8d.png
tags: perform-predictive-data-analysis-in-bigquery-challenge-lab-gsp374, gsp374, perform-predictive-data-analysis-in-bigquery-challenge-lab

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Perform Predictive Data Analysis in BigQuery](https://www.cloudskillsboost.google/course_templates/656) skill badge. Are you ready for the challenge?

Topics tested:

* Upload files from Cloud Storage into BigQuery tables using the console
    
* Write and execute queries that join information from multiple tables
    
* Analyze soccer event data using various BigQuery features
    
* Write functions in BigQuery to help with calculations to be performed on soccer shot data
    
* Create and evaluate an expected goals model using BigQuery ML
    
* Apply an expected goals model to make a prediction from new data using BigQuery ML
    

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

1. Click the **Start Lab** button. If you need to pay for the lab, a pop-up opens for you to select your payment method. On the left is the **Lab Details** panel with the following:
    
    * The **Open Google Cloud console** button
        
    * Time remaining
        
    * The temporary credentials that you must use for this lab
        
    * Other information, if needed, to step through this lab
        
2. Click **Open Google Cloud console** (or right-click and select **Open Link in Incognito Window** if you are running the Chrome browser).
    
    The lab spins up resources, and then opens another tab that shows the **Sign in** page.
    
    ***Tip:*** Arrange the tabs in separate windows, side-by-side.
    
    **Note:** If you see the **Choose an account** dialog, click **Use Another Account**.
    
3. If necessary, copy the **Username** below and paste it into the **Sign in** dialog.
    
    ```apache
    student-02-757f969aadcd@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    c9nfoKuvG1Jm
    ```
    
    You can also find the **Password** in the **Lab Details** panel.
    
6. Click **Next**.
    
    **Important:** You must use the credentials the lab provides you. Do not use your Google Cloud account credentials.
    
    **Note:** Using your own Google Cloud account for this lab may incur extra charges.
    
7. Click through the subsequent pages:
    
    * Accept the terms and conditions.
        
    * Do not add recovery options or two-factor authentication (because this is a temporary account).
        
    * Do not sign up for free trials.
        

After a few moments, the Google Cloud console opens in this tab.

**Note:** To view a menu with a list of Google Cloud products and services, click the **Navigation menu** at the top-left.

![Navigation menu icon](https://cdn.qwiklabs.com/nUxFb6oRFr435O3t6V7WYJAjeDFcrFb16G9wHWp5BzU%3D align="left")

## **Challenge scenario**

Use BigQuery to load the data from the Cloud Storage bucket, write and execute queries in BigQuery, analyze soccer event data. Then use BigQuery ML to train an expected goals model on the soccer event data and evaluate the impressiveness of World Cup goals.

## **Task 1. Data ingestion**

1. Load the tables created with JavaScript Object Notation (JSON) and CSV data format into the dataset using the following information:
    

| **Field** | **Value** |
| --- | --- |
| Source | Cloud Storage |
| Select file from Cloud Storage bucket | spls/bq-soccer-analytics/events.json |
| File format | JSONL (Newline delimited JSON) |
| Table name | `events545` |
| Schema | Check the box marked Schema `Auto detect` |

2. Load another table of soccer data format CSV into the dataset using the following information below:
    

| **Field** | **Value** |
| --- | --- |
| Source | Cloud Storage |
| Select file from Cloud Storage bucket | spls/bq-soccer-analytics/tags2name.csv |
| File format | CSV |
| Table name | `tags3name` |
| Schema | Check the box marked `Auto detect` |

Click Check my progress to verify the objective

Check tables are created

**Check my progress**

## **Task 2. Analyze soccer data**

* Build a query that shows the success rate on penalty kicks by each player.
    

Points to consider:

* Join the `events545` table with the `players` table to get player names from their IDs
    
* Filter on penalty kicks
    
* Group by player ID and player name
    
* Player should attempt at least 5 penalty kicks
    
* Order by penalty kick success rate
    

**Note:** Tag 101 represents a goal using the `tags3name` table.

Click **Check my progress** to verify the objective:

Check penalty kick success rate

**Check my progress**

## **Task 3. Gain insight by analyzing soccer data**

* Create a new query to analyze shot distance. For shots, use (x, y) values from the `positions` field in the `events545` table.
    

Points to consider:

* Calculate shot distance using the midpoint of the goal mouth (`90`, `55`) as the ending location.
    
* Calculate pass distance by x-coordinate and y-coordinate differences, then convert to estimated meters using the average dimensions of a soccer field (`116` x `66`).
    
* Add an `isGoal` field by looking "inside" the tags field.
    
* Filter the `events545` table to shots only.
    
* Shot distance must be less than 50.
    
* The final `SELECT` statement aggregates the number of shots, the number of goals and the percentage of goals from shots by distance rounded to the nearest meter.
    

**Note:** The approximate dimensions of a soccer field are used with the x-coordinate and y-coordinate distances as inputs to the distance formula.

Click **Check my progress** to verify the objective:

Analyze shot distance

**Check my progress**

## **Task 4. Create a regression model using soccer data**

Create some user-defined functions in BigQuery that help with shot distance and angle calculations, which help to prepare the soccer event data for eventual use in an ML model.

### Calculate shot distance from (x,y) coordinates

* Define a function `soccer.GetShotDistanceToGoal545` for calculating the shot distance from (x,y) coordinates in the `soccer` dataset using the following code-blocks:
    

```sql
CREATE FUNCTION `soccer.GetShotDistanceToGoal545`(x INT64, y INT64)
RETURNS FLOAT64
AS (
 /* Translate 0-100 (x,y) coordinate-based distances to absolute positions
 using "average" field dimensions of 116x66 before combining in 2D dist calc */
 SQRT(
   POW((90 - x) * 116/100, 2) +
   POW((55 - y) * 66/100, 2)
   )
 );
```

Click **Check my progress** to verify the objective

Calculate shot distance

**Check my progress**

### Calculate shot angle from (x,y) coordinates

* Define a function `soccer.GetShotAngleToGoal545` for calculating the shot angle from (x,y) coordinates in the `soccer` dataset using the following code-blocks:
    

```sql
CREATE FUNCTION `soccer.GetShotAngleToGoal545`(x INT64, y INT64)
RETURNS FLOAT64
AS (
 SAFE.ACOS(
   /* Have to translate 0-100 (x,y) coordinates to absolute positions using
   "average" field dimensions of 116x66 before using in various distance calcs */
   SAFE_DIVIDE(
     ( /* Squared distance between shot and 1 post, in meters */
       (POW(116 - (x * 116/100), 2) + POW(33 + (7.32/2) - (y * 66/100), 2)) +
       /* Squared distance between shot and other post, in meters */
       (POW(116 - (x * 116/100), 2) + POW(33 - (7.32/2) - (y * 66/100), 2)) -
       /* Squared length of goal opening, in meters */
       POW(7.32, 2)
     ),
     (2 *
       /* Distance between shot and 1 post, in meters */
       SQRT(POW(116 - (x * 116/100), 2) + POW(33 + 7.32/2 - (y * 66/100), 2)) *
       /* Distance between shot and other post, in meters */
       SQRT(POW(116 - (x * 116/100), 2) + POW(33 - 7.32/2 - (y * 66/100), 2))
     )
    )
  /* Translate radians to degrees */
  ) * 180 / ACOS(-1)
 )
;
```

Click **Check my progress** to verify the objective

Calculate shot angle

**Check my progress**

### Create an expected goals model using BigQuery ML

1. Use BigQuery ML to create and execute a machine learning model `soccer.xg_logistic_reg_model_545` in BigQuery using standard SQL queries.
    

In this case, you build an expected goals model from the soccer **event** data to predict the likelihood of a shot going in for a goal given its type, distance, and angle.

Expected goals models are commonly used in soccer analytics to measure the quality of shots and finishing/saving ability given shot quality, and they have a variety of applications in both retrospective match analysis and making projections.

Points to consider:

* The top section will be the actual model creation code, specify the type of model and label for the outcome variable.
    
* 101 is a known Tag for 'goals' from the goals table.
    
* The `SELECT` statement aggregates **isGoal** outcome variable along with features of interest from the event data, shot distance, and angle calculated using the user-defined functions defined in the previous step.
    
* Join enables the determination of which competition each shot came from.
    
* Filter out `World Cup` matches for model fitting purposes and include both "open play" & free kick shots (including penalties).
    

Click Check my progress to verify the objective

Create BigQuery logistic regression model

**Check my progress**

2. Once the model is done training - look for a "Query complete" notification in the **Query results** section - click **Go to model** at the far right next to the message about model creation.
    

This opens up a new tab that has information about the model that was just trained.

3. Click to **EVALUATION** tab and look at the metrics, particularly **Log loss** and **ROC AUC** under **Aggregate Metrics**.
    

## **Task 5. Make predictions from new data with the BigQuery model**

Now that you've fit an expected goals model of reasonable accuracy and explainability, you can apply it to "new" data - in this case, the 2018 World Cup (which was left out of the model fitting).

The logistic regression model `soccer.xg_logistic_reg_model_545` created in the previous step is used to assess the difficulty of each shot and goal in that competition, enabling the identification of the most "impressive" goals in the tournament.

### Get probabilities for all shots in the 2018 World Cup

* Use BigQuery ML's prediction functionality with the logistic regression model fit in the previous step to look at the probability of each shot scoring in the World Cup.
    

Points to consider:

* The top section is the actual model prediction code, specifying the type of model.
    
* The `SELECT` statement aggregates **isGoal** outcome variable along with features of interest from the event data, shot distance, and angle calculated using the user-defined functions defined in the previous step.
    
* Join enables the determination of which competition each shot came from.
    
* Look only at `World Cup` matches for model predictions and include both "open play" and free kick shots (including penalties).
    

Click **Check my progress** to verify the objective

Make predictions from the model

---

## Solution of Lab

## New solution

%[https://youtu.be/gyZCr-1I0m4] 

```apache
export EVENT=
export TABLE=
export VALUE_X1=
export VALUE_Y1=
export VALUE_X2=
export VALUE_Y2=
export FUNC_1=
export FUNC_2=
export MODEL=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759297895172/ff79ef24-d05f-4610-b6ca-c4e2c0793c5b.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759297929008/25b3ae84-ff92-4a22-b75d-07dad19e2bf4.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759297938727/5131f514-8e18-4ec3-9e34-dea6d50b33f8.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1759298004928/f0d1aebc-ab9d-4666-8ba3-74d9f28774d6.png align="center")

```apache
curl -LO raw.githubusercontent.com/chayandeokar/Cloud-Skills-2025/refs/heads/master/Perform%20Predictive%20Data%20Analysis%20in%20BigQuery%20Challenge%20Lab%20/gsp374.sh
sudo chmod +x gsp374.sh
./gsp374.sh
```

Open [Big Query](https://console.cloud.google.com/bigquery)

---

## Old solution

%[https://www.youtube.com/watch?v=v8nvFo8kpuQ] 

```apache
export EVENT_NAME=
export TABLE_NAME=
export VALUE_X_1=
export VALUE_Y_1=
export VALUE_X_2=
export VALUE_Y_2=
export FUNCTION_1=
export FUNCTION_2=
export MODEL_NAME=
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724206987502/bcec5e84-5ca0-4dff-828a-65ae663ae81f.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724206998121/98d4d891-e92e-4d37-8686-c9e2a51cb9d1.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724207002013/fd71e795-7c16-4685-8253-42f691258aa0.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724651568860/6b4ce1f4-6414-4619-bec8-e5f091a78ff1.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/Predict%20Soccer%20Match%20Outcomes%20with%20BigQuery%20ML%20Challenge%20Lab/quicklabgsp374.sh
sudo chmod +x quicklabgsp374.sh
./quicklabgsp374.sh
```

### Task 4:

Open [https://console.cloud.google.com/bigquery](https://console.cloud.google.com/bigquery)

**Calculate shot distance from (x,y) coordinates**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724207296795/faa6203a-df20-47ea-8ba2-9a72d94aca0b.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724207271390/52d9ad04-28d7-40d0-8245-620b4db41042.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724207485795/905b4941-0121-42d2-8d59-c4538bf10114.png align="center")

**Calculate shot angle from (x,y) coordinates**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724207410772/4401c9c4-befa-4d5a-9ee0-95cf0a871c8a.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724207402619/6241de7d-9aaa-4aa6-936b-91d0a171c5e0.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724207457949/fbff244e-2a80-4ebb-b97f-263874048453.png align="center")