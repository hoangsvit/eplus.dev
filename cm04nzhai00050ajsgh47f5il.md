---
title: "Engineer Data for Predictive Modeling with BigQuery ML: Challenge Lab - GSP327"
seoTitle: "Engineer Data for Predictive Modeling with BigQuery ML: Challenge Lab "
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Thu Aug 22 2024 02:29:21 GMT+0000 (Coordinated Universal Time)
cuid: cm04nzhai00050ajsgh47f5il
slug: engineer-data-for-predictive-modeling-with-bigquery-ml-challenge-lab-gsp327
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724293523236/9d3e53b0-b1ab-4dc6-8382-4d2a529199e9.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1724293751374/72a82283-be3d-42b2-adc6-3ec7769a6fbe.png

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Engineer Data for Predictive Modeling with BigQuery ML](https://www.cloudskillsboost.google/course_templates/627) skill badge. Are you ready for the challenge?

### Setup

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## **Challenge scenario**

You have started a new role as a Data Engineer for TaxiCab Inc. You are expected to import some historical data to a working BigQuery dataset, and build a basic model that predicts fares based on information available when a new ride starts. Leadership is interested in building an app and estimating for users how much a ride will cost. The source data will be provided in your project.

You are expected to have the skills and knowledge for these tasks, so don't expect step-by-step guides to be provided.

### Your challenge

As soon as you sit down at your desk and open your new laptop you receive your first assignment: build a basic BQML fare prediction model for leadership. Perform the following tasks to import and clean the data, then build the model and perform batch predictions with new data so that leadership can review model performance and make a go/no-go decision on deploying the app functionality.

## **Task 1. Clean your training data**

You've already completed the first step, and have created a dataset `taxirides` and imported the historical data to table, `historical_taxi_rides_raw`. This is data prior for rides to 2015.

**Note:** You may need to wait 1-3 minutes for the data to be fully populated in your project.

To complete this task you will need to:

* Clean the data in `historical_taxi_rides_raw` and make a copy to `Table` in the same dataset. You can use BigQuery, Dataprep, Dataflow, etc. to create this table and clean the data. Make sure your target column is called `Fare amount`.
    

Some helpful hints:

* You can see the source dataset in the BQ UI - familiarize yourself with the source schema first.
    
* As a hint for the data available at prediction time, familiarize yourself with the table `taxirides.report_prediction_data` which shows the format data will arrive at prediction time.
    

Data cleaning tasks:

* Ensure `trip_distance` is greater than `Number`.
    
* Remove rows where `fare_amount` is very small (less than `$Value` for example).
    
* Ensure that the latitudes and longitudes are reasonable for the use case.
    
* Ensure `passenger_count` is greater than `Number`.
    
* Be sure to add `tolls_amount` and `fare_amount` to `Fare amount` as the target variable since total\_amount includes tips.
    
* Because the source dataset is large (&gt;1 Billion rows), sample the dataset to less than 1 Million rows.
    
* Only copy fields that will be used in your model (`report_prediction_data` is a good guide).
    

Click *Check my progress* to verify the objective.

Create a cleaned copy of the data in `Table`

**Check my progress**

## **Task 2. Create a BigQuery ML model**

1. Based on the data you have in `Table`, build a BigQuery ML model that predicts `Fare amount`.
    
2. Call the model `Fare`.
    

**Note:** Your model will need an RMSE of 10 or less to complete the task.

Some helpful hints:

* You can encapsulate any additional data transformations in a [TRANSFORM()](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-create#transform) clause
    
* Keep in mind, only features in the `TRANSFORM()` clause will be passed to the model. You can use a `* EXCEPT(feature_to_leave_out)` to pass some or all of the features without explicitly calling them
    
* `ST_distance()` and `ST_GeogPoint()` GIS functions in BigQuery can be used to easily calculate euclidean distance (i.e. how far pickup to dropoff did the taxi travel):
    

```apache
ST_Distance(ST_GeogPoint(pickuplon, pickuplat), ST_GeogPoint(dropofflon, dropofflat)) AS euclidean
```

Click *Check my progress* to verify the objective.

Create BigQuery ML model `Fare` with RMSE 10 or less

**Check my progress**

## **Task 3. Perform a batch prediction on new data**

Leadership is curious to see how well your model performs over new data, in this case, all of the data they've collected in 2015. This data is in `taxirides.report_prediction_data`. Only values known at prediction time are included in the table.

* Use `ML.PREDICT` and your model to predict `Fare amount` and store your results in a table called `2015_fare_amount_predictions`.
    

Click *Check my progress* to verify the objective.

Perform batch predictions and store in a new table `2015_fare_amount_predictions`

---

## Solution of Lab

%[https://www.youtube.com/watch?v=JnaPHJSh6vI] 

```apache
export TABLE_NAME=''
export FARE_AMOUNT=''
export TRIP_DISTANCE_VALUE=
export FARE_AMOUNT_VALUE=
export PASSENGER_COUNT_VALUE=
export MODEL_NAME=''
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1724293676153/7adf0c46-f91b-4c7e-b6bf-77f62918dace.png align="center")

```apache
curl -LO raw.githubusercontent.com/Techcps/GSP-Short-Trick/master/Engineer%20Data%20for%20Predictive%20Modeling%20with%20BigQuery%20ML%3A%20Challenge%20Lab/techcps327.sh
sudo chmod +x techcps327.sh
./techcps327.sh
```