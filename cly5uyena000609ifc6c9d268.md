---
title: "MongoDB Indexes II"
seoTitle: "MongoDB Indexes II"
seoDescription: "In this unit, you'll dive into the inner workings of indexes and how they improve performance. Next, you'll learn about tools for evaluating the impact of y"
datePublished: Wed Jul 03 2024 13:12:50 GMT+0000 (Coordinated Universal Time)
cuid: cly5uyena000609ifc6c9d268
slug: mongodb-indexes-ii
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1720010615727/388f8c27-9ae8-4182-8e4d-65197c38a889.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1720012342594/1164a21c-1aff-4732-8c2a-9eb2b0b11506.png

---

## **Overview**

In this unit, you'll dive into the inner workings of indexes and how they improve performance. Next, you'll learn about tools for evaluating the impact of your indexes on query performance. You'll then explore some additional index types that may be useful for your application patterns. Finally, you'll learn how to monitor the performance of your indexes on MongoDB Atlas and self-managed deployments.

### Lesson 1 – How Indexes Work

1. **Which of the following statements describe a B tree? (Select all that apply.)**
    
    **<mark>A.</mark>** <mark> B trees sort the stored data in ascending sequential order from left to right</mark>
    
    **<mark>B.</mark>** <mark> Nodes in a B tree can have more than two child nodes</mark>
    
    **C.** B tree stands for Binary tree
    
    **<mark>D.</mark>** <mark> A B tree is a self-balancing tree data structure</mark>
    
2. **Which index would most effectively support the following query? (Select one.)** 
    
    `db.collection.find({ username: "j0hnny", timestamp: { $gte: ISODate("2021-05-18T00:00:00.000Z"), $lt: ISODate("2021-05-18T13:00:00.000Z") }})`
    
    **A.** `db.collection.createIndex({ username: 1, timestamp: 1 })`
    
    **B.** `db.collection.createIndex({ timestamp: 1, username: 1 })`
    
    **C.** `db.collection.createIndex({ username: 1 })`
    
    **D.** `db.collection.createIndex({ timestamp: 1 })`
    
    **<mark>A.</mark>** <mark> Option A</mark>
    
    **B.** Option B
    
    **C.** Option C
    
    **D.** Option D
    
3. **Which index would most effectively support the following query? (Select one.)**
    
    `db.collection.find({ timestamp: { $gte: ISODate("2021-05-18T00:00:00.000Z"), $lt: ISODate("2021-05-19T00:00:00.000Z") }, username: "j0hnny"}).sort({ rating: 1})`
    
    **A.** `db.collection.createIndex({ timestamp: 1, username: 1, rating: 1 })`
    
    **B.** `db.collection.createIndex({ username: 1, rating: 1, timestamp: 1 })`
    
    **C.** `db.collection.createIndex({ rating: 1, timestamp: 1, username: 1 })`
    
    **D.** `db.collection.createIndex({ rating: 1, username: 1, timestamp: 1 })`
    
    * **A.** Option A
        
    * **<mark>B.</mark>** <mark> Option B</mark>
        
    * **C.** Option C
        
    * **D.** Option D
        

### Lesson 2 – Index Usage Details via Explain

1. **From the following explain output, select the option that describes what the explain output it telling us: (Select one.)**
    
    ```javascript
    {
      explainVersion: '1',
      queryPlanner: {
        namespace: 'sample_airbnb.listingsAndReviews',
        indexFilterSet: false,
        parsedQuery: {},
        queryHash: 'DD1CE27D',
        planCacheKey: 'DD1CE27D',
        maxIndexedOrSolutionsReached: false,
        maxIndexedAndSolutionsReached: false,
        maxScansToExplodeReached: false,
        winningPlan: {
          stage: 'SORT',
          sortPattern: { host: -1 },
          memLimit: 104857600,
          type: 'simple',
          inputStage: { stage: 'COLLSCAN', direction: 'forward' }
        },
        rejectedPlans: []
      },
      executionStats: {
        executionSuccess: true,
        nReturned: 5555,
        executionTimeMillis: 256,
        totalKeysExamined: 0,
        totalDocsExamined: 5555,
        executionStages: {
          stage: 'SORT',
          nReturned: 5555,
          executionTimeMillisEstimate: 130,
          works: 11113,
          advanced: 5555,
          needTime: 5557,
          needYield: 0,
          saveState: 13,
          restoreState: 13,
          isEOF: 1,
          sortPattern: { host: -1 },
          memLimit: 104857600,
          type: 'simple',
          totalDataSizeSorted: 100493513,
          usedDisk: false,
          spills: 0,
          inputStage: {
            stage: 'COLLSCAN',
            nReturned: 5555,
            executionTimeMillisEstimate: 0,
            works: 5557,
            advanced: 5555,
            needTime: 1,
            needYield: 0,
            saveState: 13,
            restoreState: 13,
            isEOF: 1,
            direction: 'forward',
            docsExamined: 5555
          }
        }
      },
      command: {
        find: 'listingsAndReviews',
        filter: {},
        sort: { host: -1 },
        '$db': 'sample_airbnb'
      },
      serverInfo: {
        host: 'M-C02GG1X2MD6M',
        port: 27017,
        version: '6.0.6',
        gitVersion: '26b4851a412cc8b9b4a18cdb6cd0f9f642e06aa7'
      },
      serverParameters: {
        internalQueryFacetBufferSizeBytes: 104857600,
        internalQueryFacetMaxOutputDocSizeBytes: 104857600,
        internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
        internalDocumentSourceGroupMaxMemoryBytes: 104857600,
        internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
        internalQueryProhibitBlockingMergeOnMongoS: 0,
        internalQueryMaxAddToSetBytes: 104857600,
        internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600
      },
      ok: 1
    }
    ```
    
    **A.** The explain method was used in the allPlansExecution mode. An index on the host field was used.
    
    **B.** The explain method was used in the default queryPlanner mode. The winning plan was an in memory SORT stage and the query wasn’t supported by an index.
    
    **<mark>C.</mark>** <mark> The explain method was used in the executionStats mode. The query was not supported by an index. The winning plan was SORT, requiring an in memory sort to return the results in order.</mark>
    
    **D.** The explain method was used in the executionStats mode.An index on the host field supported the query.
    
2. **Which of the following fields can help us determine the effectiveness of an index? (Select all that apply.)**
    
    **A.** nReturned
    
    **B.** executionSuccess
    
    **<mark>C.</mark>** <mark> totalDocsExamined</mark>
    
    **<mark>D.</mark>** <mark> executionStages</mark>
    
    **<mark>E.</mark>** <mark> totalKeysExamined</mark>
    

### Lesson 3 – Optimized Compound Indexes

1. **The** `SORT` stage will be present in the `executionStages` object of the `explain('executionStats')` output if a blocking (in-memory) sort took place.
    
    **<mark>A.</mark>** <mark> True</mark>
    
    **B.** False
    
2. **You check the** `executionStats` **for a query using an index and see the following output:**
    
    ```javascript
    {
      executionSuccess: true,
      nReturned: 2,
      executionTimeMillis: 0,
      totalKeysExamined: 3,
      totalDocsExamined: 3,
    …
    }
    ```
    
    **Which of the following is true? (Select all that apply.)**
    
    * **<mark>A.</mark>** <mark> MongoDB had to scan an extra document</mark>
        
    * **<mark>B.</mark>** <mark> Two documents were returned</mark>
        
    * **C.** MongoDB had to scan an extra index key
        
    * **D.** This query is not using an index
        

### Lesson 4 – Wildcard Indexes

1. **Why should you use a wildcard index to support queries in a MongoDB collection instead of a regular index? (Select one.)**
    
    **A.** Wildcard indexes have a smaller storage footprint than regular indexes.
    
    **B.** Wildcard indexes make queries that use regular expressions more efficient.
    
    **<mark>C.</mark>** <mark> Wildcard indexes can support queries against any field, even if that field is unknown at the time of querying.</mark>
    
    **D.** Wildcard indexes allow for efficient querying against time-series data.
    
2. **Given the following query:**
    
    ```javascript
    db.people.find({ "metadata.likes": "golfing", "metadata.age": 30 })
    ```
    
    **Which of the following indexes would support all the fields in the query? (Select one.)**
    
    **A.** `db.people.createIndex({ name: 1 })`
    
    **B.** `db.people.createIndex({ metadata: 1})`
    
    **C.** `db.people createIndex({ metadata.likes, metadata.status })`
    
    **D.** `db.people.createIndex({ ‘metadata.$**’: 1 })`
    
    **A.** Option A
    
    **B.** Option B
    
    **C.** Option C
    
    **<mark>D.</mark>** <mark> Option D</mark>
    

### Lesson 5 – Partial Indexes

1. **When should you use a partial index? (Select one.)**
    
    **<mark>A.</mark>** <mark> To index documents that match a specified filter document.</mark>
    
    **B.** To index based on ranges of documents rather than individual documents.
    
    **C.** To support queries against time series data.
    
    **D.** To index a field that has a value of an array.
    
2. **Given the following query:**
    
    ```javascript
    db.zips.find({ state: "AZ", pop: { $gte: 20000} })
    ```
    
    **Which Partial index will support this query? (Select one.)**
    
    **A.** `db.zips.createIndex( { state: 1 }, { partialFilterExpression: { pop: { $gte: 10000 } } } );`
    
    **B.** `db.zips.createIndex( { state: 1 }, { partialFilterExpression: { pop: { $lte: 10000 } } } );`
    
    **C.** `db.zips.createIndex( { state: 1 }, { partialFilterExpression: { pop: { $gte: 25000 } } } );`
    
    **<mark>A.</mark>** <mark> Option A</mark>
    
    **B.** Option B
    
    **C.** Option C
    

### Lesson 6 – Sparse Indexes

1. **Which of the following statements about sparse indexes are true? (Select all that apply.)** 
    
    **<mark>A.</mark>** <mark> Sparse indexes only create index entries for documents that have null or non-null values for the indexed field.</mark>
    
    **B.** Sparse indexes are used to support queries against documents that meet a specified filter expression.
    
    **<mark>C.</mark>** <mark> Sparse indexes will not be chosen by the query planner if it means the query results will be incomplete.</mark>
    
    **D.** Sparse indexes only create index entries for documents that have non-null values for the indexed field.
    
2. **Given the following index:**
    
    `db.collection.createIndex({ stock: 1 }, { sparse: true })`
    
    **Which document will be indexed? (Select one.)**
    
    **A.** `{ sku: 131, product_name: "Milk", price: 3, }`
    
    **B.** `{ sku: 121, product_name: "Bread", price: 2, stock: 50 }`
    
    **A.** Option A
    
    **<mark>B.</mark>** <mark> Option B</mark>
    

### Lesson 7 – Clustered Indexes

1. **How does a clustered index in MongoDB differ from a regular index? (Select all that apply.)**
    
    **<mark>A.</mark>** <mark> Clustered indexes arrange documents in order based on their index key.</mark>
    
    **B.** Clustered indexes optimize query performance for a given field over regular indexes.
    
    **<mark>C.</mark>** <mark> Clustered indexes store the index key alongside the documents themselves.</mark>
    
    **D.** Clustered index keys eliminate the need for an additional TTL (time to live) index.
    
2. **When can we create a clustered index? (Select one.)**
    
    **<mark>A.</mark>** <mark> When creating the clustered collection</mark>
    
    **B.** Anytime
    
    **C.** When dropping the clustered collection
    
    **D.** When creating secondary indexes
    
3. **You run a query against a clustered collection, as shown below:**
    
    ```javascript
    db.weather.find({ "metadata.sensorId": 5578 })
    ```
    
    **The clustered collection has an internal clustered index and a secondary index that is eligible for the query. Which of the following two indexes will be automatically selected by the query planner to support the query? (Select one.)**
    
    ```javascript
    // internal clustered index - db.runCommand( { listCollections: 1 } )
    {
      name: 'system.buckets.weather',
      type: 'collection',
      options: {
        validator: { ... },
        clusteredIndex: true,
        timeseries: {
          timeField: 'timestamp',
          metaField: 'metadata',
          granularity: 'hours',
          bucketMaxSpanSeconds: 2592000
        }
      },
      info: { ... }
    }
    
    // secondary index - db.weather.getIndexes()
    {
      v: 2,
      key: { 'metadata.sensorId': 1 },
      name: 'metadata.sensorId_1'
    }
    ```
    
    **A.** Clustered index
    
    **<mark>B.</mark>** <mark> Secondary index</mark>
    

### Lesson 8 – Time Series Collections

1. **What is the correct definition of a time series collection? (Select one.)** 
    
    **<mark>A.</mark>** <mark> Time series collections efficiently store time series data. In time series collections, writes are organized so that data from the same source is stored alongside other data points from a similar point in time.</mark>
    
    **B.** Time series collections is a specialized collection that stores time-related data in multiple time zones for easy lookup.
    
    **C.** Time series collections are collections of documents that are grouped together into a single bucket based on the total size of the documents.
    
    **D.** Time series collections are fixed-size collections that support high-throughput operations that insert and retrieve documents based on insertion order.
    
2. **What are the advantages of providing a** `metaField` field when creating a time series collection? (Select one.)
    
    **Example:**
    
    ```javascript
    db.createCollection("stockprice", {
      timeseries: {
        timeField: "timestamp",
        metaField: "metadata",
        granularity: "seconds",
      },
    });
    ```
    
    **A.** Improves the efficiency of querying data that changes over time
    
    **B.** Allows you to visualize the data using third party tools
    
    **<mark>C.</mark>** <mark> Allows for better organization by attaching additional information directly to the data</mark>
    

### Lesson 9 – How to Monitor Indexes

1. **What will the following command return? (Select one.)**
    
    ```javascript
    db.customers.aggregate([{ $indexStats: {} }]);
    ```
    
    **A.** An array of integers, each one representing the score assigned to each index in the collection.
    
    **<mark>B.</mark>** <mark> An array of documents, each representing an index specification document.</mark>
    
    **C.** An object estimating how much has been saved by leveraging the existing indexes to support queries against the collection.
    
    **D.** Suggested actions that can be taken on current mongod instances to improve performance. Specifically, suggestions to create indexes that can support common usage patterns.
    
2. **What happens when the database profiler is enabled on a** `database`? (Select one.)
    
    **<mark>A.</mark>** <mark> Operations are captured and recorded inside the database under a capped collection named system.profile.</mark>
    
    **B.** A web server is enabled to support queries on the database.
    
    **C.** You’ll receive suggestions for actions you can take on your database to improve performance.
    
    **D.** The MongoDB instance is profiled in order to find the source of out-of-memory errors.