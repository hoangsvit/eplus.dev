---
title: "Create ML Models with BigQuery ML: Challenge Lab - GSP341"
seoTitle: "Create ML Models with BigQuery ML: Challenge Lab - GSP341"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Fri Aug 16 2024 06:59:17 GMT+0000 (Coordinated Universal Time)
cuid: clzwczihw00160ajn9pht4i89
slug: create-ml-models-with-bigquery-ml-challenge-lab-gsp341
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723790933613/dd73ea7e-0e33-4cf7-aaad-c234742e7033.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723791540383/1a0d523e-8065-425c-bccf-02a62cd40337.png

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who have enrolled in the [Create ML Models with BigQuery ML](https://www.cloudskillsboost.google/course_templates/626) skill badge. Are you ready for the challenge?

**Note:** Once the lab environment has been fully provisioned, the tasks will become visible. The tasks that are assigned to you are independent, so you are free to perform the tasks in any order you want.

## **Setup**

### Before you click the Start Lab button

Read these instructions. Labs are timed and you cannot pause them. The timer, which starts when you click **Start Lab**, shows how long Google Cloud resources will be made available to you.

This hands-on lab lets you do the lab activities yourself in a real cloud environment, not in a simulation or demo environment. It does so by giving you new, temporary credentials that you use to sign in and access Google Cloud for the duration of the lab.

To complete this lab, you need:

* Access to a standard internet browser (Chrome browser recommended).
    

**Note:** Use an Incognito or private browser window to run this lab. This prevents any conflicts between your personal account and the Student account, which may cause extra charges incurred to your personal account.

* Time to complete the lab---remember, once you start, you cannot pause a lab.
    

**Note:** If you already have your own personal Google Cloud account or project, do not use it for this lab to avoid extra charges to your account.

## **Challenge scenario**

You have started a new role as a junior member of the Data Science department Jooli Inc. Your team is working on multiple projects with a number of machine learning initiatives. You are expected to help with the development and assessment of data sets and machine learning models to help provide insights based on real work data sets.

You are expected to have the skills and knowledge for these tasks, so don't expect step-by-step guides to be provided.

The following tasks in this lab will check your knowledge related to BigQuery and machine learning.

## **Task 1**

### Create a new dataset

One of the projects you are working on needs to provide analysis based on real-world data. Your role in this project is to develop and evaluate machine learning models.

So, in this task, you have to create a dataset with the dataset ID **'bq\_dataset'** in which you can store your machine learning models.

Click **Check my progress** to verify the objective.

Verify Task

**Check my progress**

## **Task 2**

### Create a forecasting BigQuery machine learning model

You are working on one project that needs to provide analysis based on real world data that will help in the selection of new bicycle models for public bike share systems. You have to create one model that can predict average trip durations for bike schemes using the public data from Austin's public bike share scheme to train and evaluate your models.

You can access the public data for the Austin bike share scheme in your project by opening [this link to the Austin bike share dataset](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=austin_bikeshare&page=dataset) in the browser tab for your lab.

* So, create the machine learning model named **austin\_location\_model** in the precreated dataset **austin** to predict the trip duration for bike trips.
    

The features of this model must incorporate the starting station name, the hour the trip started, the weekday of the trip, and the address of the start station labelled as location. You must use **2019** Year data only to train this model.

<table><tbody><tr><td colspan="1" rowspan="1"><p><strong><em>Note: </em></strong><em>In case you're unable to view pre-created resources in bigquery as per the task description,"your Google Cloud resources are still being provisioned, please refresh the page and try again in a few minutes." If you do, just wait a short time and reload your page.</em></p></td></tr></tbody></table>

<table><tbody><tr><td colspan="1" rowspan="1"><p><strong><em>Tips and tricks: </em></strong><em>You will need to combine the information from both Austin bike share tables in the public dataset to create your model by means of a JOIN statement.</em></p></td></tr></tbody></table>

Click **Check my progress** to verify the objective.

Verify Task

**Check my progress**

## **Task 3**

### Evaluate the machine learning models

Two of the senior data scientists in your team have different theories on what factors are important in determining the duration of a bike share trip and you have been asked to prioritise these to start. The first data scientist maintains that the key factors are the start station, the location of the start station, the day of the week and the hour the trip started. While the second data scientist argues that this is an over complication and the key factors are simply start station, subscriber type, and the hour the trip started.

In this task one of the projects you are working on needs to provide analysis based on real world data that will help in the selection of new bicycle models for public bike share systems. Your role in this project is to evaluate machine learning models that can predict average trip durations for bike schemes using the public data from Austin's public bike share scheme to train and evaluate your models.

Evaluate each of the precreated machine learning models in the dataset **austin** against **2019** data only using separate queries.

Your queries must report both the Mean Absolute Error and the Root Mean Square Error.

<table><tbody><tr><td colspan="1" rowspan="1"><p><strong><em>Note: </em></strong><em>In case you're unable to view pre-created resources in bigquery as per the task description,"your Google Cloud resources are still being provisioned, please refresh the page and try again in a few minutes." If you do, just wait a short time and reload your page.</em></p></td></tr></tbody></table>

<table><tbody><tr><td colspan="1" rowspan="1"><p><strong><em>Tips and tricks: </em></strong><em>While evaluating the models you should use SELECT SQRT(mean_squared_error) AS rmse, mean_absolute_error FROM ML.EVALUATE(...) to return the specific model performance metrics the data scientists want to use. Also you must choose a model type that is suitable for forecasting label values.</em></p></td></tr></tbody></table>

Click **Check my progress** to verify the objective.

Verify Task

**Check my progress**

## **Task 4**

### Use the subscriber type machine learning model to predict average trip durations

In this step you must create and run a query that uses the model that includes subscriber type as a feature, to predict the average trip duration for all trips from the busiest bike sharing station in 2019 (based on the number of trips per station in 2019) where the subscriber type is 'Single Trip'.

We have models precreated and evaluated, in the dataset **austin** use the model, that uses subscriber\_type as a feature, to predict average trip length for trips from the busiest bike sharing station in **2019** where the subscriber type is Single Trip.

<table><tbody><tr><td colspan="1" rowspan="1"><p><strong><em>Note: </em></strong><em>In case you're unable to view pre-created resources in bigquery as per the task description,"your Google Cloud resources are still being provisioned, please refresh the page and try again in a few minutes." If you do, just wait a short time and reload your page.</em></p></td></tr></tbody></table>

<table><tbody><tr><td colspan="1" rowspan="1"><p><strong><em>Tips and tricks: </em></strong><em>Your prediction queries must return the average of the predicted value output by the model for the trip duration and not just the average of the actual trip duration.</em></p></td></tr></tbody></table>

Click **Check my progress** to verify the objective.

---

## Solution of Lab

%[https://www.youtube.com/watch?v=zu1a0ad6GEk] 

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/AUGUST%20Create%20ML%20Models%20with%20BigQuery%20ML%20Challenge%20Lab/newquicklabgsp341.sh
sudo chmod +x newquicklabgsp341.sh
./newquicklabgsp341.sh
```