---
title: "Develop Serverless Apps with Firebase: Challenge Lab - GSP344"
seoTitle: "Develop Serverless Apps with Firebase: Challenge Lab - GSP344"
seoDescription: "In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs"
datePublished: Fri Aug 09 2024 04:48:15 GMT+0000 (Coordinated Universal Time)
cuid: clzm881fm000n09la399ofuzq
slug: develop-serverless-apps-with-firebase-challenge-lab-gsp344
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723178642270/9ad53c30-6867-4c84-8b9b-ec2037444810.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723178880389/9d63eaa6-3c78-4c70-a2fd-4deaf1ef0d68.png
tags: develop-serverless-apps-with-firebase-challenge-lab-gsp344

---

## **Overview**

In a challenge lab you’re given a scenario and a set of tasks. Instead of following step-by-step instructions, you will use the skills learned from the labs in the course to figure out how to complete the tasks on your own! An automated scoring system (shown on this page) will provide feedback on whether you have completed your tasks correctly.

When you take a challenge lab, you will not be taught new Google Cloud concepts. You are expected to extend your learned skills, like changing default values and reading and researching error messages to fix your own mistakes.

To score 100% you must successfully complete all tasks within the time period!

This lab is recommended for students who are enrolled in the [Develop Serverless Apps with Firebase](https://www.cloudskillsboost.google/course_templates/649) course. Are you ready for the challenge?

---

### **Task 1. Create a Firestore database**

In this scenario you create a Firestore Database in Google Cloud. The high level architecture diagram below summarizes the general architecture.

![Firebase Challenge Lab architecture diagram](https://cdn.qwiklabs.com/%2BXTnJ7ZdcMC3Q5yJoJo9IgA0KycWEQgAlHMnQbRIHSw%3D align="left")

Requirements:

| **Field** | **Value** |
| --- | --- |
| Cloud Firestore | Native Mode |
| Location | `us-east1` |

**Create a Firestore database**

To complete this section successfully, you are required to implement the following:

* Cloud Firestore Database
    
* Use Firestore Native Mode
    
* Add location `us-east1`
    

Click **Check my progress** to verify that you've performed the above task.

Create a Firestore Database

**Check my progress**

### **Task 2. Populate the database**

In this scenario, populate the database using test data.

A high level architecture diagram below summarizes the general architecture.

![Firebase Challenge Lab architecture](https://cdn.qwiklabs.com/PKIVCpHcC1AN002C29%2FTGB5m3BLy1nvvVzv9o%2BoJPPw%3D align="left")

**Populate the database**

Example Firestore schema:

| **Collection** | **Document** | **Field** |
| --- | --- | --- |
| data | 70234439 | \[dataset\] |

The [Netflix Shows Dataset](https://www.kaggle.com/shivamb/netflix-shows) includes the following information:

| **Field** | **Description** |
| --- | --- |
| show\_id: | Unique ID for every Movie / Tv Show |
| type: | Identifier - A Movie or TV Show |
| title: | Title of the Movie / Tv Show |
| director: | Director of the Movie |
| cast: | Actors involved in the movie / show |
| country: | Country where the movie / show was produced |
| date\_added: | Date it was added on Netflix |
| release\_year: | Actual Release year of the move / show |
| rating: | TV Rating of the movie / show |
| duration: | Total Duration - in minutes or number of seasons |

To complete this section successfully, you are required to implement the following tasks:

1. Use the sample code from `pet-theory/lab06/firebase-import-csv/solution`:
    

```apache
  npm install
```

2. To import CSV use the node `pet-theory/lab06/firebase-import-csv/solution/index.js`:
    

```apache
  node index.js netflix_titles_original.csv
```

**Note:** Verify the Firestore Database has been updated by viewing the data in the Firestore UI.

Click **Check my progress** to verify that you've performed the above task.

Populate the Firestore Database

**Check my progress**

### **Task 3. Create a REST API**

In this scenario, create an example REST API.

A high level architecture diagram below summarizes the general architecture.

![Firebase Challenge Lab architecture diagram](https://cdn.qwiklabs.com/%2FEEXmlifsMsOwCuZUq%2F7KYiuzoIjHgT8%2FqNBHG3WgFA%3D align="left")

**Cloud Run development**

| **Field** | **Value** |
| --- | --- |
| Container Registry Image | `rest-api:0.1` |
| Cloud Run Service | `netflix-dataset-service` |
| Permission | `--allow-unauthenticated` |

To complete this section successfully, you are required to implement the following tasks:

1. Access `pet-theory/lab06/firebase-rest-api/solution-01`.
    
2. Build and Deploy the code to Google Container Registry.
    
3. Deploy the image as a Cloud Run service.
    

**Note:** Deploy your service with 1 max instance to ensure you do not exceed the max limit for Cloud Run instances.

4. Go to Cloud Run and click **netflix-dataset-service** then copy the service URL:
    

* `SERVICE_URL=copy url from your netflix-dataset-service`
    
* `curl -X GET $SERVICE_URL` should respond with: {"status":"Netflix Dataset! Make a query."}
    

Click **Check my progress** to verify that you've performed the above task.

Deploy and test the REST API

**Check my progress**

### **Task 4. Firestore API access**

In this scenario, deploy an updated revision of the code to access the Firestore DB.

A high level architecture diagram below summarizes the general architecture.

![Firebase Challenge Lab architecture diagram](https://cdn.qwiklabs.com/%2FEEXmlifsMsOwCuZUq%2F7KYiuzoIjHgT8%2FqNBHG3WgFA%3D align="left")

**Deploy Cloud Run revision 0.2**

| **Field** | **Value** |
| --- | --- |
| Container Registry Image | `rest-api:0.2` |
| Cloud Run Service | `netflix-dataset-service` |
| Permission | `--allow-unauthenticated` |

To complete this section successfully, you are required to implement the following tasks:

1. Access `pet-theory/lab06/firebase-rest-api/solution-02`.
    
2. Build the updated application.
    
3. Use Cloud Build to tag and deploy image revision to Container Registry.
    
4. Deploy the new image a Cloud Run service.
    

**Note:** Deploy your service with 1 max instance to ensure you do not exceed the max limit for Cloud Run instances.

5. Go to Cloud Run and click **netflix-dataset-service** then copy the service URL:
    

* `SERVICE_URL=copy url from your netflix-dataset-service`
    
* `curl -X GET $SERVICE_URL/2019` should respond with json dataset
    

Click **Check my progress** to verify that you've performed the above task.

Deploy and test the Rest API

**Check my progress**

### **Task 5. Deploy the Staging Frontend**

In this scenario, deploy the Staging Frontend.

A high level architecture diagram below summarizes the general architecture.

![Firebase Challege Lab architecture diagram](https://cdn.qwiklabs.com/m1BZ32wAOgNFZiGu0CHGt4MxL9CGTybjTY%2BEMcQjo%2Fs%3D align="left")

**Deploy Frontend**

| **Field** | **Value** |
| --- | --- |
| REST\_API\_SERVICE | REST API SERVICE URL |
| Container Registry Image | `frontend-staging:0.1` |
| Cloud Run Service | `frontend-staging-service` |

To complete this section successfully, you are required to implement the following tasks:

1. Access `pet-theory/lab06/firebase-frontend`.
    
2. Build the frontend staging application.
    
3. Use Cloud Build to tag and deploy image revision to Container Registry.
    
4. Deploy the new image as a Cloud Run service.
    

**Note:** Deploy your service with 1 max instance to ensure you do not exceed the max limit for Cloud Run instances.

5. Frontend access to Rest API and Firestore Database.
    
6. Access the Frontend Service URL.
    

**Note:** It's using a demo dataset to provide the onscreen entries.

![Introduction to Serverless web page](https://cdn.qwiklabs.com/zcQ5HJR5GjkKpraJbjjOBFIgq1IqSEiv1GwSt1jbmGs%3D align="left")

Click **Check my progress** to verify that you've performed the above task.

Deploy the staging frontend

**Check my progress**

### **Task 6. Deploy the Production Frontend**

In this scenario, update the Staging Frontend to use the Firestore database.

A high level architecture diagram below summarizes the general architecture.

![Firebase Challege Lab architecture diagram](https://cdn.qwiklabs.com/XS0ycXUPX%2BQgKX8dSq6flsOa0MLze%2FRow%2ByVRyWhT8M%3D align="left")

**Deploy Frontend**

| **Field** | **Value** |
| --- | --- |
| REST\_API\_SERVICE | REST API SERVICE URL |
| Container Registry Image | `frontend-production:0.1` |
| Cloud Run Service | `frontend-production-service` |

To complete this section successfully, you are required to implement the following tasks:

1. Access `pet-theory/lab06/firebase-frontend/public`.
    
2. Update the frontend application i.e. `app.js` to use the REST API.
    
3. Don't forget to append the year to the SERVICE\_URL.
    
4. Use Cloud Build to tag and deploy image revision to Container Registry.
    
5. Deploy the new image a Cloud Run service.**Note:** Deploy your service with 1 max instance to ensure you do not exceed the max limit for Cloud Run instances.
    
6. Frontend access to Rest API and Firestore Database.
    

Now that the services have been deployed you will be able to see the contents of the Firestore database using the frontend service.

![Introduction to Serverless web page](https://cdn.qwiklabs.com/zPUczojGw6hedczha7JBeysK0j16o5vv8P5is%2Fjhjfc%3D align="left")

Click **Check my progress** to verify that you've performed the above task.

---

### Solution of Lab

%[https://www.youtube.com/watch?v=EXBErLC703k] 

```apache
export REGION=
export SERVICE_NAME=netflix-dataset-service
export FRONTEND_STAGING_SERVICE_NAME=frontend-staging-service
export FRONTEND_PRODUCTION_SERVICE_NAME=frontend-production-service
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723178786689/5bd032cb-d163-4a44-a704-9240250cec13.png align="center")

```apache
curl -LO raw.githubusercontent.com/quiccklabs/Labs_solutions/master/AUGUST%20Serverless%20Firebase%20Development%20Challenge%20Lab/quicklabgsp344.sh
sudo chmod +x quicklabgsp344.sh
./quicklabgsp344.sh
```