---
title: "BigQuery Machine Learning using Soccer Data - GSP851"
seoTitle: "BigQuery Machine Learning using Soccer Data - GSP851"
seoDescription: "Write functions in BigQuery to help with calculations to be performed on soccer shot data."
datePublished: Wed Aug 21 2024 02:02:59 GMT+0000 (Coordinated Universal Time)
cuid: cm037lpyv000009kv7oll2w4t
slug: bigquery-machine-learning-using-soccer-data-gsp851
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724205582190/655496aa-af84-4ce1-b0e6-d90fff7be0c9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724205764603/6ee9825d-876d-4a80-9954-42a1d91cf26a.png
tags: bigquery-machine-learning-using-soccer-data-gsp851, gsp851

---

## **Objectives**

In this lab, you will learn how to:

* Write functions in BigQuery to help with calculations to be performed on soccer shot data.
    
* Create and evaluate "expected goals" models using BigQuery ML.
    
* Apply an expected goals model to "new" data using BigQuery ML.
    

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
    student-02-0a720fcaa908@qwiklabs.net
    ```
    
    You can also find the **Username** in the **Lab Details** panel.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    57Nq19sAatCH
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

## **Task 1. Open BigQuery**

The BigQuery console provides an interface to query tables, including [public datasets](https://cloud.google.com/bigquery/public-data) offered by BigQuery.

1. In the Cloud Console, from the **Navigation menu** select **BigQuery**.
    

The **Welcome to BigQuery in the Cloud Console** message box opens. This message box provides a link to the quickstart guide and the release notes.

2. Click **Done**.
    

The BigQuery console opens.

**Note:** The process for creating the dataset and tables is taught in the [BigQuery Soccer Data Ingestion](https://www.cloudskillsboost.google/catalog_lab/4230) lab. In this lab the focus is on learning how to query the information.

Once the tables are created the display will be similar to below:

![The Explorer  listing the pinned project, which includes the highlighted soccer dataset and its tables.](https://cdn.qwiklabs.com/ux6I76PtUtyI3sViISF80uu1Ju1MlMkXXjNBY5VCFW8%3D align="left")

In this section the BigQuery interface was used to access the console. The console provides a convenient way to add information to a dataset. BigQuery uses tables to represent data in a structured way.

In the next section learn more about creating functions in BigQuery.

## **Task 2. Calculate shot distance and shot angle**

In this section, you will create some [user-defined functions in BigQuery](https://cloud.google.com/bigquery/docs/reference/standard-sql/user-defined-functions#sql-udf-structure) that help with shot distance and angle calculations, helping to prepare the soccer event data for eventual use in an ML model.

### Calculate shot distance from (x,y) coordinates

To motivate the need for the function, start by looking at the **positions** field in the **events** table a bit more - this is a repeated field that contains 1 or more (x, y) pairs per event.

Per [Wyscout](https://www.nature.com/articles/s41597-019-0247-7#:~:text=positions%3A%20the%20origin,of%20the%20field%3B), a leading data company in the soccer industry that provided this data, these represent the origin and (if applicable) destination positions associated with the event, on a 0-100 scale representing the percentage of the field from the perspective of the attacking team. See the screenshot of the table below showing positions corresponding to a few different event types for a few example events.

![table with 6 columns: evnentName, playerid, subEventName, Id, positions.x, and positions.y](https://cdn.qwiklabs.com/D%2B0A98snNuwGPrtLpUDTl7ZYKIzx6m5jGUV%2BEcF%2BBlo%3D align="left")

The first (x, y) pair in positions for events that are shots represent the location on the field from which the shot originated.

**Note:** Calculating the distance of a shot from a given location to the goal involves using the midpoint of the goal mouth (100, 50) as the ending location, the known average dimensions of a soccer field ([105x68, per Wikipedia;](https://en.wikipedia.org/wiki/Football_pitch#/media/File:Football_pitch_metric_and_imperial.svg) there is no standard field size) and [the 2-dimensional distance formula](https://g.co/kgs/1PHzjf).

1. Copy and paste the following code into the query **Editor**:
    

```sql
CREATE FUNCTION `soccer.GetShotDistanceToGoal`(x INT64, y INT64)
RETURNS FLOAT64
AS (
 /* Translate 0-100 (x,y) coordinate-based distances to absolute positions
 using "average" field dimensions of 105x68 before combining in 2D dist calc */
 SQRT(
   POW((100 - x) * 105/100, 2) +
   POW((50 - y) * 68/100, 2)
   )
 );
```

This specifies the name of the function, the inputs and their types (2 integers), the output type (a float), and the actual logic implementing the 2-dimensional distance formula on the scaled x- and y-coordinate distances.

2. Click **Run**.
    

The **Query results** section should display a message saying This statement created a new function named: **&lt;PROJECT\_NAME&gt;.soccer.GetShotDistanceToGoal.**

Click Check my progress to verify the objective

Check the query has been run

**Check my progress**

### Calculate shot angle from (x,y) coordinates

The general process here is similar to the shot distance calculation, but applied to shot angle. In this case, the angle calculated is the one made by the location of the shot and the goal line, as shown below (image credit to [Ian Dragulet](https://towardsdatascience.com/a-guide-to-expected-goals-63925ee71064)).

![Four examples of shot angles using the location of the shot and the width of the soccer goal](https://cdn.qwiklabs.com/OTXlpdshO87DlJLb%2F5TMB5S3AGImP4Y39kf8pBMqWWM%3D align="left")

Larger angles arise from being close to the goal and in the center, so this is somewhat correlated with the distance calculation performed above. The shot angle calculations involve using [BigQuery's trigonometric functions](https://cloud.google.com/bigquery/docs/reference/standard-sql/mathematical_functions#acos) on the (x, y) data.

1. In the query **Editor**, click "**+**" (Create SQL query).
    
2. Add the following code into the query **Editor**. This creates a shot angle function like the shot distance function above with 2 integer inputs and a floating point output, but with a more detailed trigonometric calculation using the [Law of Cosines](https://g.co/kgs/fJJ2fJ) to get the angle to the goal:
    

```sql
CREATE FUNCTION `soccer.GetShotAngleToGoal`(x INT64, y INT64)
RETURNS FLOAT64
AS (
 SAFE.ACOS(
   /* Have to translate 0-100 (x,y) coordinates to absolute positions using
   "average" field dimensions of 105x68 before using in various distance calcs */
   SAFE_DIVIDE(
     ( /* Squared distance between shot and 1 post, in meters */
       (POW(105 - (x * 105/100), 2) + POW(34 + (7.32/2) - (y * 68/100), 2)) +
       /* Squared distance between shot and other post, in meters */
       (POW(105 - (x * 105/100), 2) + POW(34 - (7.32/2) - (y * 68/100), 2)) -
       /* Squared length of goal opening, in meters */
       POW(7.32, 2)
     ),
     (2 *
       /* Distance between shot and 1 post, in meters */
       SQRT(POW(105 - (x * 105/100), 2) + POW(34 + 7.32/2 - (y * 68/100), 2)) *
       /* Distance between shot and other post, in meters */
       SQRT(POW(105 - (x * 105/100), 2) + POW(34 - 7.32/2 - (y * 68/100), 2))
     )
    )
  /* Translate radians to degrees */
  ) * 180 / ACOS(-1)
 )
;
```

3. Click **Run**.
    
4. The **Query results** section should display a message saying This statement created a new function named **&lt;PROJECT\_NAME&gt;.soccer.GetShotAngleToGoal.**
    

Click Check my progress to verify the objective

Check the query has been run

**Check my progress**

In this section you used BigQuery to make functions to calculate shot distance and angle.

In the next section learn how to build a model to calculate expected goals using the distance and angle of each shot.

## **Task 3. Create expected goals models using BigQuery ML**

In this section, you will use [BigQuery ML](https://cloud.google.com/bigquery-ml/docs/introduction) to create and execute machine learning models in BigQuery using standard SQL queries. In this case, you will build [expected goals](https://en.wikipedia.org/wiki/Expected_goals) models on the soccer event data to predict the likelihood of a shot going in for a goal given its type, distance, and angle (these are known to be good predictors of the chance of a goal, as demonstrated in the [BigQuery Soccer Data Analytical Insight](https://www.cloudskillsboost.google/catalog_lab/4242) lab).

Expected goals models are commonly used in soccer analytics to measure the quality of shots and finishing/saving ability given shot quality, and they have a variety of applications in both retrospective match analysis and making projections.

### Fitting a logistic regression model for expected goals

First, you will fit a [logistic regression](https://g.co/kgs/oSw9XE) model to the data.

1. In the query **Editor**, click "**+**" (Create SQL query).
    
2. Add the following code into the query **Editor**.
    

```sql
CREATE MODEL `soccer.xg_logistic_reg_model`
OPTIONS(
 model_type = 'LOGISTIC_REG',
 input_label_cols = ['isGoal']
 ) AS

SELECT
 Events.subEventName AS shotType,

 /* 101 is known Tag for 'goals' from goals table */
 (101 IN UNNEST(Events.tags.id)) AS isGoal,

  `soccer.GetShotDistanceToGoal`(Events.positions[ORDINAL(1)].x,
   Events.positions[ORDINAL(1)].y) AS shotDistance,

 `soccer.GetShotAngleToGoal`(Events.positions[ORDINAL(1)].x,
   Events.positions[ORDINAL(1)].y) AS shotAngle

FROM
 `soccer.events` Events

LEFT JOIN
 `soccer.matches` Matches ON
   Events.matchId = Matches.wyId

LEFT JOIN
 `soccer.competitions` Competitions ON
   Matches.competitionId = Competitions.wyId

WHERE
 /* Filter out World Cup matches for model fitting purposes */
 Competitions.name != 'World Cup' AND
 /* Includes both "open play" & free kick shots (including penalties) */
 (
   eventName = 'Shot' OR
   (eventName = 'Free Kick' AND subEventName IN ('Free kick shot', 'Penalty'))
 )
;
```

The top section is the actual model generation code, specifying the type of model and label for the outcome variable. The SELECT statement creates the **isGoal** outcome variable along with features of interest from the event data, including the shot distance and angle calculated using the functions created in the previous step. The joins enable the determination of which competition each shot came from, which is employed to filter out the World Cup data from this modeling (saved for use later on after the model is fit).

3. Click **Run**.
    

The **Query results** section should display a message saying This statement will create a new model named: **&lt;PROJECT\_NAME&gt;:soccer.xg\_logistic\_reg\_model**. Depending on the type of model, this may take several hours to complete. In this case, it should only take a minute or two to finish.

4. Once the model is done training - look for a "Query complete" notification in the **Query results** section - click on **Go to model** at the far right next to the message about model creation.
    

This will open up a new tab that has information about the model that was just trained.

5. Click to the **EVALUATION** tab and take a look at some of the metrics, particularly **"Log loss"** and **"ROC AUC"** under **Aggregate Metrics**.
    

**Note:** Results may vary slightly based on the inherent randomness in the model fitting procedure.

![Evaluation tabbed page displaying data for Aggregate Metrics, Score threshold and three graphs analyzing that data](https://cdn.qwiklabs.com/5Zuc06r7cCJjRmvacF7a%2BY9peT0ig32yxIUy1%2BXZXDA%3D align="left")

Click Check my progress to verify the objective

Check the query has been run

**Check my progress**

Since the primary interest lies in the accuracy of goal probabilities from the model (not explicitly accuracy in terms of predicting 0s and 1s at a given threshold), **log loss** and **ROC AUC** are good metrics to focus on. The numbers themselves are most useful in comparing different models, which is done in a later section.

### Understanding the Logistic regression model fit

Now that you've fit the logistic regression model, you can use [BigQuery ML's weights functionality](https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-weights) to see the model coefficients for each predictor.

1. In the query **EDITOR**, click "**+**" (Create SQL query).
    
2. Copy and paste the following code into the query **EDITOR**. This is a simple call to the **ML.WEIGHTS** function to the logistic regression model that you fit in the previous step:
    

```sql
SELECT
 *
FROM
 ML.WEIGHTS(MODEL soccer.xg_logistic_reg_model)
;
```

3. Click **Run**. The results are displayed below the query window.
    

![The query results within the Results tabbed page.](https://cdn.qwiklabs.com/giGyjkhckoXZke7qofSuNW%2B69iLaHP5%2FUr%2FJCX6ULxk%3D align="left")

There are weights for each input - a single numerical weight for the continuous features, 1 value per potential category for the categorical features - that correspond to coefficients in a logistic regression model. It's sometimes dangerous to interpret logistic regression model coefficients directly because of correlation among the predictors, among other things.

At minimum, the sign of these seem reasonable based on general subject matter knowledge of soccer:

* Penalty kicks have a much higher chance of success than other shot types
    
* Shots at further distance have less chance of success
    
* Shots with greater angles to the goal have higher chance of success
    

Seeing these results can provide some confidence that the model is doing something logical.

### Create a boosted tree model for expected goals

Next, you will fit a boosted tree model to the data using BigQuery ML's implementation of [XGBoost](https://xgboost.readthedocs.io/en/latest/), and compare the results to the previously fit logistic regression model. In theory, boosted trees can be more accurate because of their ability to take into account nonlinear relationships between features and the outcome as well as interactions among features.

1. In the query **Editor**, click "**+**" (Create SQL query).
    
2. Copy and paste the following code into the query **Editor**:
    

```sql
CREATE MODEL `soccer.xg_boosted_tree_model`
OPTIONS(
 model_type = 'BOOSTED_TREE_CLASSIFIER',
 input_label_cols = ['isGoal']
 ) AS

SELECT
 Events.subEventName AS shotType,

 /* 101 is known Tag for 'goals' from goals table */
 (101 IN UNNEST(Events.tags.id)) AS isGoal,
  `soccer.GetShotDistanceToGoal`(Events.positions[ORDINAL(1)].x,
   Events.positions[ORDINAL(1)].y) AS shotDistance,

 `soccer.GetShotAngleToGoal`(Events.positions[ORDINAL(1)].x,
   Events.positions[ORDINAL(1)].y) AS shotAngle

FROM
 `soccer.events` Events

LEFT JOIN
 `soccer.matches` Matches ON
   Events.matchId = Matches.wyId

LEFT JOIN
 `soccer.competitions` Competitions ON
   Matches.competitionId = Competitions.wyId

WHERE
 /* Filter out World Cup matches for model fitting purposes */
 Competitions.name != 'World Cup' AND
 /* Includes both "open play" & free kick shots (including penalties) */
 (
   eventName = 'Shot' OR
   (eventName = 'Free Kick' AND subEventName IN ('Free kick shot', 'Penalty'))
 )
;
```

The SQL statement is identical to the one to fit the logistic regression above, except for changes in the model type to pick a boosted tree classifier and the name of the model object created.

3. Click **Run**. The **Query results** section should display a message saying This statement will create a new model named: **&lt;PROJECT\_NAME&gt;:soccer.xg\_boosted\_tree\_model**. Depending on the type of model, this may take several hours to complete. In this case, it should take several minutes to finish.
    

**Note:** Training the model can take five to ten minutes to complete.

While you wait, check out this overview of BigQuery ML.

[![BigQuery ML: Machine Learning with Standard SQL](https://cdn.qwiklabs.com/6DibNj9kuxg986zGSlMUu5zgoahOy6RMUCsB1Wafkfs%3D align="left")](https://www.youtube.com/watch?v=6Kska20zQO4)

Once the model has been trained, verify the step has been completed successfully.

4. Once the model is done training, look for a "Query complete" notification in the **Query results** section
    
5. Click on **Go to model** at the far right next to the message about model creation.
    

This will open up a new tab that has information about the model that was just trained.

6. Click to the **EVALUATION** tab and take a look at some of the metrics, particularly **"Log loss"** and **"ROC AUC"** under **Aggregate Metrics**.
    

**Note:** Results may vary slightly based on the inherent randomness in the model fitting procedure.

![Evaluation tabbed page with Log loss, ROC AUC in the Aggregate Metrics data types highlighted](https://cdn.qwiklabs.com/IXRjXlK1PxNvPVX24cBejAV5Jweh%2FZvBou9Fip5%2FBO8%3D align="left")

The log loss and ROC AUC of the boosted tree model is pretty similar to that from the logistic regression model, but slightly worse (higher log loss and lower ROC AUC).

Click Check my progress to verify the objective

Check the query has been run

**Check my progress**

In this section BigQuery was used to fit machine learning models using soccer data. An expected goals model can be created in a variety of ways.

In the next section learn how to apply an expected goals model to new data using BigQuery ML.

## **Task 4. Apply an expected goals model to new data**

Now that you've fit an expected goals model of reasonable accuracy and explainability, you can apply it to "new" data - in this case, the 2018 World Cup (which was left out of the model fitting).

The logistic regression model created in the previous step will be used to assess the difficulty of each shot and goal in that competition, enabling identification of the most "impressive" goals in the tournament.

### Get probabilities for all shots in 2018 World Cup

You can use [BigQuery ML's prediction functionality](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-predict) with the logistic regression model fit in the previous step (or even the boosted tree model, if you prefer) to look at the probability of each shot scoring or not in the World Cup.

1. In the query **Editor**, click "**+**" (Create SQL query).
    
2. Copy and paste the following code into the query **Editor**:
    

```sql
SELECT
 *

FROM
 ML.PREDICT(
   MODEL `soccer.xg_logistic_reg_model`,
   (
     SELECT
       Events.subEventName AS shotType,

       /* 101 is known Tag for 'goals' from goals table */
       (101 IN UNNEST(Events.tags.id)) AS isGoal,

       `soccer.GetShotDistanceToGoal`(Events.positions[ORDINAL(1)].x,
           Events.positions[ORDINAL(1)].y) AS shotDistance,

       `soccer.GetShotAngleToGoal`(Events.positions[ORDINAL(1)].x,
           Events.positions[ORDINAL(1)].y) AS shotAngle

     FROM
       `soccer.events` Events

     LEFT JOIN
       `soccer.matches` Matches ON
           Events.matchId = Matches.wyId

     LEFT JOIN
       `soccer.competitions` Competitions ON
           Matches.competitionId = Competitions.wyId

     WHERE
       /* Look only at World Cup matches for model predictions */
       Competitions.name = 'World Cup' AND
       /* Includes both "open play" & free kick shots (including penalties) */
       (
           eventName = 'Shot' OR
           (eventName = 'Free Kick' AND subEventName IN ('Free kick shot', 'Penalty'))
       )
   )
 )
```

This calls the **ML.PREDICT** function on the logistic regression model that was fit previously.

The SELECT statement creates the same fields on all shots from the **events** data as the ones used to fit the model, but this time it filters to only World Cup matches (instead of leaving them out) since those are the shots the model is to be applied to.

3. Click **Run**. The results are displayed below the query window.
    

![Results tabbed page displaying five lines of query results.](https://cdn.qwiklabs.com/f3M5PEQzKxaMTcI0VTZW9QkA9CB0djvHCurSAcahVQY%3D align="left")

The output shows a couple of prediction-related fields along with the original fields in that data of shot type, distance, angle, and success:

* **predicted\_isGoal**, a binary prediction of whether the shot would result in a goal or not
    
* **predicted\_isGoal\_probs**, an array of (label, prob) pairs that shows the probability of each shot being successful and not from the model
    

### Identify most unlikely goals using model probabilities

Building on the previous section that yielded probabilities for all shots in the 2018 World Cup, use BigQuery to extract the probability of each goal, then sort from lowest to highest to see the most unlikely goals scored in the World Cup based on the factors in the model.

Theoretically, this should yield a list of some of the most impressive goals in the tournament, at least based on the factors in the model (distance, angle, etc.).

1. In the query **Editor**, click "**+**" (Create SQL query).
    
2. Add the following code into the query **Editor**:
    

```apache
SELECT
 predicted_isGoal_probs[ORDINAL(1)].prob AS predictedGoalProb,
 * EXCEPT (predicted_isGoal, predicted_isGoal_probs),

FROM
 ML.PREDICT(
   MODEL `soccer.xg_logistic_reg_model`,
   (
     SELECT
       Events.playerId,
       (Players.firstName || ' ' || Players.lastName) AS playerName,

       Teams.name AS teamName,
       CAST(Matches.dateutc AS DATE) AS matchDate,
       Matches.label AS match,

     /* Convert match period and event seconds to minute of match */
       CAST((CASE
         WHEN Events.matchPeriod = '1H' THEN 0
         WHEN Events.matchPeriod = '2H' THEN 45
         WHEN Events.matchPeriod = 'E1' THEN 90
         WHEN Events.matchPeriod = 'E2' THEN 105
         ELSE 120
         END) +
         CEILING(Events.eventSec / 60) AS INT64)
         AS matchMinute,

       Events.subEventName AS shotType,

       /* 101 is known Tag for 'goals' from goals table */
       (101 IN UNNEST(Events.tags.id)) AS isGoal,

       `soccer.GetShotDistanceToGoal`(Events.positions[ORDINAL(1)].x,
           Events.positions[ORDINAL(1)].y) AS shotDistance,

       `soccer.GetShotAngleToGoal`(Events.positions[ORDINAL(1)].x,
           Events.positions[ORDINAL(1)].y) AS shotAngle

     FROM
       `soccer.events` Events

     LEFT JOIN
       `soccer.matches` Matches ON
           Events.matchId = Matches.wyId

     LEFT JOIN
       `soccer.competitions` Competitions ON
           Matches.competitionId = Competitions.wyId

     LEFT JOIN
       `soccer.players` Players ON
           Events.playerId = Players.wyId

     LEFT JOIN
       `soccer.teams` Teams ON
           Events.teamId = Teams.wyId

     WHERE
       /* Look only at World Cup matches to apply model */
       Competitions.name = 'World Cup' AND
       /* Includes both "open play" & free kick shots (but not penalties) */
       (
         eventName = 'Shot' OR
         (eventName = 'Free Kick' AND subEventName IN ('Free kick shot'))
       ) AND
       /* Filter only to goals scored */
       (101 IN UNNEST(Events.tags.id))
   )
 )

ORDER BY
  predictedgoalProb
```

This builds on the **ML.PREDICT** function call in the previous section, filtering to only shots that were goals (excluding penalties, since the goal is to get the most "impressive" goals), extracting only the probability of a goal being scored from the predictions, and ordering by that.

A few fields are added in the **SELECT** statement from the events data and the other tables that can be joined to it to get other information of interest on each goal like the player and team who scored it, match date and information, and minute into the match of the goal.

3. Click **Run**. The results are displayed below the query window.
    

Click Check my progress to verify the objective

Check the query has been run

**Check my progress**

The top few lines show the 2018 World Cup goals that the model believed had the least likely chance of going in - all with fairly long shot distances (near 30 meters) and relatively tight angles (between 10° and 15°).

For some visual validation, you can [watch the Antoine Griezmann goal](https://www.youtube.com/watch?v=VknTZkxhUFg) that earned the top spot on this list - to be fair, it's more of an unlikely goal than an impressive one based on how it was played by the goalkeeper.

For more of a "wow" goal in line with what this analysis intends to uncover, check out [this amazing shot by Korea Republic's Son Heung-min vs Mexico](https://www.youtube.com/watch?v=5qrLrfWViIQ) that came in second in the results.

In the next section test your understanding of what you have learned in this introduction to BigQuery ML.

## **Pop quiz**

Test your understanding of BigQuery by completing the short quiz on the topics covered in this lab.

**Which mathematical function is used in the shot angle calculation but not in the shot distance calculation as the calculations were implemented in BigQuery?**

* Inverse cosine
    
* Exponentiation (i.e. using powers)
    
* Square root
    

**When comparing models created on the same data by log loss and ROC AUC, which of the following is true?**

* A more accurate model will have higher log loss and lower ROC AUC.
    
* A more accurate model will have lower log loss and lower ROC AUC.
    
* A more accurate model will have lower log loss and higher ROC AUC.
    
* A more accurate model will have higher log loss and higher ROC AUC.
    

**What are the shot distance and angle for the 2018 World Cup goal with the highest probability according to the logistic regression model?**

* 30.8 m
    
* 11.2°1.25 m
    
* 147.0°3.22 m
    
* 97.4°
    

---

## Solution of Lab

%[https://www.youtube.com/watch?v=PuxTvzGQyIo]