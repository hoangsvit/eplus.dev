---
title: "MongoDB Aggregation"
seoTitle: "MongoDB Aggregation"
seoDescription: "In this unit, you will learn about the aggregation pipeline, which is one of MongoDB's most powerful features. You will learn how to use the aggregation pip"
datePublished: Tue Jul 02 2024 13:00:40 GMT+0000 (Coordinated Universal Time)
cuid: cly4f2xcn000k0ali5zi85rqk
slug: mongodb-aggregation
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1719925132941/85846a27-2c8a-4a24-b22c-6f16f311ed6d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1719925220682/15919b59-b739-433c-9ae4-845f9e57d4ed.png

---

## **Overview**

In this unit, you will learn about the aggregation pipeline, which is one of MongoDB's most powerful features. You will learn how to use the aggregation pipeline to filter, sort, and organize the data in your collections.

### Lesson 01: Introduction to MongoDB Aggregation

1. **Which of the following tasks cannot be completed with an aggregation pipeline? (Select one.)**
    
    **A.** Filtering for relevant pieces of data
    
    <mark>B. Finding data from outside sources</mark>
    
    **C.** Grouping documents
    
    **D.** Calculating total values from a field across many documents
    
2. Select an answer choice and then click "See Results" to submit.
    
    **Which command performs an aggregation operation by using an aggregation pipeline? (Select one.)**
    
    **A.** group()
    
    **B.** filter()
    
    **C.** aggregation()
    
    **<mark>D.</mark>** <mark> aggregate()</mark>
    

### Lesson 02: Using `$match` and `$group` Stages in a MongoDB Aggregation Pipeline

1. **You have a collection that contains zip codes in the United States. Here’s a sample document from this collection:**
    
    ```javascript
    _id: ObjectId('5c8eccc1caa187d17ca6eea2')
    city: "EVERGREEN"
    zip: "36401"
    loc: Object
       y: 31.458009
       x: 86.925771 
    pop: 8556
    state: "AL"
    ```
    
    **What will the output of this aggregation pipeline be? (Select one.)**
    
    ```javascript
    db.zips.aggregate([
    {
       $match: { "state": "CA" }
    },
    {
       $group: { "_id": "$zip" }
    }
    ])
    ```
    
    **A.** One document for each city located in California (CA)
    
    **<mark>B.</mark>** <mark> One document for each zip code located in California (CA)</mark>
    
    **C.** The total number of documents that contain a zip code in the state of California (CA)
    
    **D.** All documents that contain a zip where the state is California (CA)
    
2. **You have a collection that contains zip codes in the United States. Here’s a sample document from this collection:**
    
    ```javascript
    _id: ObjectId('5c8eccc1caa187d17ca6eea2')
    city: "EVERGREEN"
    zip: "36401"
    loc: Object
       y: 31.458009
       x: 86.925771 
    pop: 8556
    state: "AL"
    ```
    
    **What will the output of this aggregation pipeline be? (Select one.)**
    
    ```javascript
    db.zips.aggregate([
    {
       $match: { "state": "TX" }
    },
    {
       $group: { "_id": "$city" }
    }
    ])
    ```
    
    **<mark>A.</mark>** <mark> One document for each city located in Texas (TX)</mark>
    
    **B.** One document containing all cities located in Texas (TX)
    
    **C.** One document for each state in United States except Texas (TX)
    
    **D.** All documents that contain a city where the state is Texas (TX)
    

### Lesson 03: Using `$sort` and `$limit` Stages in a MongoDB Aggregation Pipeline

1. **You have a collection that contains zip codes in the United States. Here’s a sample document from this collection:**
    
    ```javascript
    _id: ObjectId('5c8eccc1caa187d17ca6eea2')
    city: "EVERGREEN"
    zip: "36401"
    loc: Object
       y: 31.458009
       x: 86.925771 
    pop: 8556
    state: "AL"
    ```
    
    **What will the output of this aggregation pipeline be? (Select one.)**
    
    ```javascript
    db.zips.aggregate([
    {
       $group: { "_id": "$pop" }
    },
    {
       $sort: { _id: -1 }
    }
    ])
    ```
    
    **A.** One document for the population of each zip code, sorted in random order
    
    **B.** 10 documents for the population of each zip code
    
    **<mark>C.</mark>** <mark> One document for the population of each zip code, sorted in descending order</mark>
    
    **D.** One document for the population of each zip code, sorted in ascending order
    
2. **You have a collection that contains all the zip codes in the United States. Here’s a sample document from this collection:**
    
    ```javascript
    _id: ObjectId('5c8eccc1caa187d17ca6eea2')
    city: "EVERGREEN"
    zip: "36401"
    loc: Object
       y: 31.458009
       x: 86.925771 
    pop: 8556
    state: "AL"
    ```
    
    **What will the output of this aggregation pipeline be? (Select one.)**
    
    ```javascript
    db.zips.aggregate([
    {
       $group: { "_id": "$pop" }
    },
    {
       $sort: { _id: -1 }
    },
    {
       $limit: { 10 }
    }
    ])
    ```
    
    **A.** All documents, each containing the population of a zip code as the \_id, sorted by population in ascending order
    
    **B.** All documents, each containing the population of a zip code as the \_id, sorted by population in descending order
    
    **<mark>C.</mark>** <mark> 10 documents, each containing the population of a zip code as the _id, sorted by population in descending order</mark>
    
    **D.** 10 documents, each containing the population of a zip code as the \_id, sorted by population in ascending order
    

### Lesson 04: Using `$project`, `$count`, and `$set` Stages in a MongoDB Aggregation Pipeline

1. **What is the main difference between**`$set` and `$project`? (Select one.)
    
    **A.** $set changes the values of fields. $project can show and hide fields, but it can't set values of fields.
    
    **B.** $set can only create new fields, and $project can only modify existing fields.
    
    **C.** $project, $set, and $addFields are all interchangable.
    
    **<mark>D.</mark>** <mark> $set is used to create or change values of new or existing fields. $project can be used to create or change the value of fields, but it can also be used to specify which fields to show in the documents in the aggregation pipeline.</mark>
    
2. **What does the**`$count` stage return? (Select one.)
    
    **<mark>A.</mark>** <mark> A single document with one field that contains the value set to the number of documents at this stage in the aggregation pipeline.</mark>
    
    **B.** The number of groups in an aggregation pipeline.
    
    **C.** A set number of documents from the aggregation pipeline.
    
    **D.** A single document that contains the number of fields that have been modified in an aggregation pipeline.
    

### Lesson 05: Using `$out` Stage in a MongoDB Aggregation Pipeline

1. **What does the**`$out` stage do? (Select one).
    
    **A.** Removes documents from the aggregation pipeline.
    
    **B.** Returns all the documents currently in the aggregation pipeline as one large document.
    
    **<mark>C.</mark>** <mark> Creates a new collection that contains the documents in this stage of the aggregation pipeline.</mark>
    
    **D.** Removes the current user who is running the aggregation pipeline from the database.
    
2. **What happens if you set the** `$out` **stage to output to a collection that already exists? (Select one.)**
    
    * **A.** The existing collection is erased and replaced with the outputted documents.
        
    * **B.** A second collection with "\_1" appended to the name is created.
        
    * **<mark>C.</mark>** <mark> A new database with the specified name of the collection is created.</mark>
        
    * **D.** An error is returned, and the existing collection is not modified.