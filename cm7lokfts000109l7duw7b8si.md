---
title: "Retrieving Big Data Quiz - Big Data Integration and Processing"
seoTitle: "Retrieving Big Data Quiz - Big Data Integration and Processing"
seoDescription: "Retrieving Big Data Quiz - Big Data Integration and Processing"
datePublished: Wed Feb 26 2025 08:55:40 GMT+0000 (Coordinated Universal Time)
cuid: cm7lokfts000109l7duw7b8si
slug: retrieving-big-data-quiz-big-data-integration-and-processing
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740559682448/b157618e-6846-4b93-8e8c-816d5f3ad196.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1740560128306/8ba34f74-332f-410c-8efe-79f32cc745b0.png
tags: retrieving-big-data-quiz-big-data-integration-and-processing, retrieving-big-data-quiz, big-data-integration-and-processing

---

1. **What does it mean for a query language to be declarative?**
    
    * <mark>The language specifies the process of how to obtain the data.</mark>
        
    * The language specifies what data to obtain.
        
    * A language specific declaration of data types in order to define the method of data retrieval.
        
    * The language specifies both the process of how to obtain the data and specifies what data to obtain.
        
2. **Use the following table named "user\_table" to answer the next 2 problems.**
    
    <table><tbody><tr><td colspan="1" rowspan="1"><p>userId</p></td><td colspan="1" rowspan="1"><p>username</p></td><td colspan="1" rowspan="1"><p>email</p></td></tr><tr><td colspan="1" rowspan="1"><p>1</p></td><td colspan="1" rowspan="1"><p>admin</p></td><td colspan="1" rowspan="1"><p>admin@corporate.moe</p></td></tr><tr><td colspan="1" rowspan="1"><p>2</p></td><td colspan="1" rowspan="1"><p>h4xor</p></td><td colspan="1" rowspan="1"><p>1337@rawr.cte</p></td></tr></tbody></table>
    
    *How would you go about querying the entire username column (however many)?*
    
    * SELECT user\_table FROM username
        
    * SELECT username FROM userId WHERE \*
        
    * SELECT username FROM user\_table WHERE userId=1
        
    * <mark>SELECT username FROM user_table</mark>
        
3. **How would you go about querying the entire database table (please refer to question 2's table)?**
    
    * SELECT username, email FROM userId
        
    * SELECT *FROM* WHERE user\_table
        
    * <mark>SELECT * FROM user_table</mark>
        
    * SELECT user\_table FROM \*
        
4. **What is the global indexing table?**
    
    * An index table in order to keep track of data records within one machine.
        
    * <mark>An index table in order to keep track of a given data type that might exist within multiple machines.</mark>
        
    * A global table that uses a specific technique called indexing and the table uses an index as the primary key.
        
    * An index table in order to keep track of a given data type that might exist within one machine.
        
5. **What are the three computing steps of a semi-join?**
    
    * <mark>Project, Ship, Reduce</mark>
        
    * Project, Decompose, Send
        
    * Index, Join, Display
        
    * Query, Join, Display
        
    * None Applicable
        
6. **What is the purpose of a semi-join?**
    
    * Increase the speed of the join for trade-off of increased data transmission cost.
        
    * <mark>Increase the efficiency of sending data across multiple machines.</mark>
        
    * Another name for join: an operation to combine two tables by column.
        
7. **What is a subquery?**
    
    * <mark>A query statement within another query.</mark>
        
    * A short query than normal.
        
    * An alternative query that acts as a substitute for another query.
        
8. **What is a correlated subquery?**
    
    * A type of query that contains a relationship between a variable attribute x and a variable attribute y. The two variables have a dependent relationship causing a correlation.
        
    * <mark>A type of query that contains a subquery that requires information from a query one level up.</mark>
        
    * A type of query that requires two tables in order to calculate values.
        
9. **What is the purpose of GROUP BY queries?**
    
    * <mark>Enables calculations based on specific columns of the table.</mark>
        
    * Required before you can use functions like AVG, SUM, MIN, MAX, COUNT.
        
    * Enables queries within queries.
        
10. **Consider the following generic statement for questions 10-12:**
    
    `db.<collection>.find(<query filter>, <projection>).<cursor modifier>`
    
    *Which part of the statement would reflect that of the FROM statement in SQL as illustrated in the lecture?*
    
    * <mark>&lt;collection&gt;</mark>
        
    * &lt;projection&gt;
        
    * &lt;query filter&gt;
        
    * &lt;cursor modifier&gt;
        
11. **Which part of the statement would reflect that of the SELECT statement in SQL as illustrated in the lecture?**
    
    * &lt;query filter&gt;
        
    * &lt;collection&gt;
        
    * &lt;cursor modifier&gt;
        
    * <mark>&lt;projection&gt;</mark>
        
12. **Which part of the statement would reflect that of the WHERE statement in SQL as illustrated in the lecture?**
    
    * &lt;collection&gt;
        
    * &lt;projection&gt;
        
    * &lt;cursor modifier&gt;
        
    * <mark>&lt;query filter&gt;</mark>
        
13. **A sample part of the data structure is as follows:**
    
    `{ _id:1, userIndex: 10, email: “arealeamil@notreallu.asd", retainRate:2}`
    
    *What would be the most likely statement that we would need to grab email info for user indexes greater than 24?*
    
    * <mark>db.email.find({userIndex:{$gt:24}}, {email:1, _id:0})</mark>
        
    * db.userIndex.find({email:{$gt:24}}, {\_id:0})
        
    * db.userIndex.find({email:{$lte:24}}, {\_id:0})
        
    * [db.email](http://db.email).find({userIndex:{$lte:24}}, {email:1, \_id:0})
        
14. **What does it mean to have a \_id:0 within our query statement?**
    
    * <mark>Tell MongoDB not to return a document id.</mark>
        
    * Grab as many objects as possible.
        
    * Grab the first object in the results.
        
    * Does not have an effect, simple convention left for compatibility issues.
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1740559655219/c571b385-1077-4bb6-9b26-0a5eb915b9f5.png align="center")