---
title: "Postgres, MongoDB, and Pandas - Big Data Integration and Processing"
seoTitle: "Postgres, MongoDB, and Pandas - Big Data Integration and Processing"
seoDescription: "Postgres, MongoDB, and Pandas - Big Data Integration and Processing"
datePublished: Wed Feb 26 2025 09:43:34 GMT+0000 (Coordinated Universal Time)
cuid: cm7lqa1og000809l22ibn6ags
slug: postgres-mongodb-and-pandas-big-data-integration-and-processing
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740562981151/623c7b06-968c-412d-836b-6d49c8543466.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740563004638/3d84f980-c084-456f-86ac-04c4bf6668fa.png
tags: big-data-integration-and-processing, postgres-mongodb-and-pandas-big-data-integration-and-processing, postgres-mongodb-and-pandas

---

1. **This quiz encompasses data and content from Week 1 and 2, so we recommend reviewing that material from last week for this quiz as well. What is the highest level that the team has reached in gameclicks? (Hint: use the MAX operation in postgres).**
    
    * <mark>8</mark>
        
    * 9
        
    * 6
        
    * 7
        
    * 10
        
2. **How many user id's (repeats allowed) have reached the highest level as found in the previous question? (Hint: For postgres: you may either use two queries or use a sub-query).**
    
    * 67271
        
    * 106436
        
    * 98823
        
    * <mark>51294</mark>
        
    * 122757
        
3. **How many user id’s (repeats allowed) reached the highest level in game-clicks and also clicked the highest costing price in buy-clicks? Hint: Refer to question 4 for ideas.**
    
    * 73226
        
    * 23301
        
    * 66887
        
    * <mark>32747</mark>
        
4. **What does the following line of code do in postgres?**
    
    ```sql
    SELECT count(userid) FROM (SELECT buyclicks.userId, teamLevel, price FROM buyclicks JOIN gameclicks on buyclicks.userId = gameclicks.userId) temp WHERE price=3 and teamLevel=5;
    ```
    
    * This is an invalid line of code, the subquery is not formatted properly.
        
    * <mark>Finds the total number of user ids (repeats allowed) in buy-clicks that have bought items with prices worth $3 and was in a team with level 5 at some point in time.</mark>
        
    * Counts the users who exists between both gameclicks and buyclicks files.
        
    * Displays the users who have bought items worth $3 and have had a team with level 5.
        
5. **In the MongoDB data set, what is the username of the twitter account who has a tweet\_followers\_count of exactly 8973882?**
    
    * Autocenterit
        
    * <mark>FIFAcom</mark>
        
    * SasSpear
        
    * CreateImga
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1740562952413/b483ff78-82a7-449c-865f-fd5782a6c5cd.png align="center")