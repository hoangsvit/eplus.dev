---
title: "Datastore: Qwik Start - GSP131"
seoTitle: "Datastore: Qwik Start - GSP131"
seoDescription: "In this lab, you learn how to store and query data in Datastore using the Google Cloud console."
datePublished: Sun Jun 08 2025 05:44:56 GMT+0000 (Coordinated Universal Time)
cuid: cmbn8o1qb000302l7dfkzbms9
slug: datastore-qwik-start-gsp131
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749361331628/9626ae84-2aeb-4084-936d-37f1614cd345.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1749361472788/85262f74-38d9-4809-a88d-19847415a8ff.png
tags: datastore, datastore-qwik-start-gsp131, datastore-qwik-start, gsp131

---

## Overview

In this lab, you learn how to store and query data in Datastore using the Google Cloud console.

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
    student-04-f2e8937ede91@qwiklabs.net
    ```
    
    You can also find the Username in the Lab Details pane.
    
4. Click **Next**.
    
5. Copy the **Password** below and paste it into the **Welcome** dialog.
    
    ```apache
    5RsfSh8EYF2R
    ```
    
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

## Task 1. Store data

1. In left menu on the Console, Navigate to Databases section, go to **Datastore** &gt; **+CREATE A FIRESTORE DATABASE**.
    
2. In the Configuration options, select **Firestore with Datastore compatibility**.
    

![The Select Datastore Mode button highlighted within the Datastore mode category on the Select a database page.](https://cdn.qwiklabs.com/pznMZxT%2FMDjFfyyYL9QfX5M4mbbYNzTiFScimlCapgU%3D align="left")

3. Now choose where you'll create your database. Use the dropdown menu to select a location:
    

![The option nam5 (United States) highlighted within the Select a location drop-down menu.](https://cdn.qwiklabs.com/YDxbO55D3FZuc1quDJzMAiDF6%2BcTek6f1bzd6uCI40A%3D align="left")

The location applies to both Cloud Datastore and App Engine for your Google Cloud project. You cannot change the location after it has been saved.

4. Click **CREATE DATABASE**.
    
5. Click **+Create Entity**.
    
6. On the **Create an entity** page, use `[default]` for **Namespace**.
    
7. Type `Task` for **Kind**.
    
8. Under **Properties** use the **Add property** button to add these properties, and click **Done** after each one:
    

| **Name** | **Type** | **Value** | **Indexed** |
| --- | --- | --- | --- |
| description | String | Learn Google Cloud Datastore | ✕ |
| created | Date and time | (today's date) | ✓ |
| done | Boolean | False | ✓ |

Your creation page should now look like this:

![The Create an entity page, with the Create button highlighted below the entity details.](https://cdn.qwiklabs.com/jGQjqaAujuPmkqXOzlwLRrOQwOro7XF393NHj%2FFAfFA%3D align="left")

9. Click **Create**. The console displays the Task entity that you just created.
    

You just stored data in Cloud Datastore!

### Test completed task

Click **Check my progress** to verify your performed task. If you have completed the task successfully you will granted with an assessment score.

Create Entity.

**Check my progress**

## Task 2. Run a query

Cloud Datastore supports querying data by kind or by Google Query Language (GQL); the instructions below walk you through the steps of doing both.

### Run kind queries

1. Click **Query by kind**.
    
2. Select `Task` as the kind.
    

The query results show the Task entity that you created.

3. Next, add a query filter to restrict the results to entities that meet specific criteria:
    

* Click **ADD TO QUERY** dropdown.
    
* In the dropdown lists, select `WHERE`, **done**, **\== (Equal to)**, **Boolean** and **false**.
    
* Click **Run**.
    
* The results show the `Task` entity that you created, since its `done` value is `false`.
    
    ![The task entity displays as false in the Query by kind tab.](https://cdn.qwiklabs.com/y1aoiPWePuwvSO5ceMNSx0ABmTeYQAwcT86OV8eCMNQ%3D align="left")
    

4. Now try a query of `WHERE`, **done**, **\== (Equal to)**, **Boolean** and **true**. The results do not include the `Task` entity that you created, because its `done` value is not `true`.
    

### Run GQL queries

1. Click the **Query by GQL** tab.
    
2. In the query box add the following:
    

```apache
SELECT * FROM Task
```

**Note:** `Task` is case sensitive.

3. Click **Run query**.
    

The query results show the Task entity that you created.

**Note:** The GQL query editor supports autocompletion for kinds. When you need to type a kind name, press Ctrl+Space to see a list of the available kinds. Up to 300 alphabetically sorted kinds can appear in the list. For better matches of kinds, type one or more characters.

4. Now add a query filter to restrict the results to entities that meet specific criteria.
    

Run this query:

```apache
SELECT * FROM Task WHERE done=false
```

**Note:** `Task` and `done` are case sensitive.

The results show the Task entity that you created, since its `done` value is `false`.

![The task entity populated in the Query by GQL tab.](https://cdn.qwiklabs.com/kmoPwJq3zvH8DuwsGzwLRFPgMbrrWZBvhG08N0G2Ufg%3D align="left")

5. Now run this query:
    

```apache
 SELECT * FROM Task WHERE done=true
```

The results do not include the `Task` entity that you created, because its `done` value is not `true`.

## Task 3. Test your understanding

Below are multiple-choice questions to reinforce your understanding of this lab's concepts. Answer them to the best of your abilities.

Google Cloud Datastore is a NoSQL document database built for automatic scaling, high performance, and ease of application development.TrueFalse

Cloud Datastore is a relational database, and it is an effective storage solution for analytic data.TrueFalse

---

## Solution of Lab

%[https://youtu.be/6R3HPpikmNk] 

```apache
curl -LO https://github.com/ArcadeCrew/Google-Cloud-Labs/raw/refs/heads/main/Datastore%20Qwik%20Start/arcadecrew.sh
sudo chmod +x arcadecrew.sh
./arcadecrew.sh
```