---
title: "MongoDB Aggregation in PHP"
seoTitle: "MongoDB Aggregation in PHP"
seoDescription: "In this unit, you'll learn how to perform basic aggregation with PHP by using MongoDB's aggregation framework. First, you'll learn what aggregation is and e"
datePublished: Tue Jul 02 2024 14:33:23 GMT+0000 (Coordinated Universal Time)
cuid: cly4ie5jf000409l7a5vmbjt7
slug: mongodb-aggregation-in-php
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1719930722101/d5c5e869-412b-49cb-a0fc-c752c177cb89.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1719930740799/490b6bbd-804f-400c-a3b4-4fee101eed16.png
tags: mongodb, php, mongodb-aggregation-pipeline, mongodb-aggregation

---

## **Overview**

In this unit, you'll learn how to perform basic aggregation with PHP by using MongoDB's aggregation framework. First, you'll learn what aggregation is and explore the components of an aggregation pipeline. Next, you'll learn how to build a pipeline that uses the `$match` and `$group` stages. Finally, you'll explore the `$sort` and `$project` stages and build a pipeline that uses them.

### Lesson 1 – Building a MongoDB Aggregation Pipeline in PHP Applications

1. **What is the aggregation framework used for? (Select one.)**
    
    **<mark>A.</mark>** <mark> To process documents and return computed results</mark>
    
    **B.** To create database schema
    
    **C.** To create basic CRUD commands
    
    **D.** To create serverless functions
    
2. **Which component(s) of an aggregation pipeline do documents pass through for processing in sequence? (Select one.)**
    
    **<mark>A.</mark>** <mark> Aggregation stages</mark>
    
    **B.** Aggregation operators
    
    **C.** The MongoDB\\Collection::aggregate() method
    

### Lesson 2 – Using MongoDB Aggregation Stages with PHP: Match and Group

1. **Which of the following aggregation pipeline stages separates documents according to a key? (Select one.)**
    
    **A.** $match
    
    **<mark>B.</mark>** <mark> $group</mark>
    
    **C.** $project
    
    **D.** $sort
    
2. **Which of the following aggregation pipeline stages selects documents that meet the specified query condition(s) and passes the documents to the next stage? (Select one.)**
    
    **<mark>A.</mark>** <mark> $match</mark>
    
    **B.** $project
    
    **C.** $group
    
    **D.** $sort
    

### Lesson 3 – Using MongoDB Aggregation Stages with PHP: Sort and Project

1. **Which of the following aggregation stages organizes the input documents in ascending or descending order? (Select one.)**
    
    **A.** $orderBy
    
    **B.** $project
    
    **<mark>C.</mark>** <mark> $sort</mark>
    
    **D.** $group
    
2. **Which of the following aggregation stages passes the documents with the requested fields to the next stage in the pipeline? (Select one.)**
    
    **A.** $match
    
    **<mark>B.</mark>** <mark> $project</mark>
    
    **C.** $group
    
    **D.** $sort