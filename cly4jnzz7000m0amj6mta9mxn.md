---
title: "MongoDB Atlas Search"
seoTitle: "MongoDB Atlas Search"
seoDescription: "Atlas Search allows you to quickly and easily add a search feature to your application. Search can be tricky to tackle, especially if you have a lot of data"
datePublished: Tue Jul 02 2024 15:09:02 GMT+0000 (Coordinated Universal Time)
cuid: cly4jnzz7000m0amj6mta9mxn
slug: mongodb-atlas-search
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1719932926588/44e4d584-a66e-4530-9c66-5fe1e34adaea.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1719932893231/59b83078-b719-40cd-86d1-422293aff39e.png
tags: mongodb-atlas-search

---

## **Overview**

Atlas Search allows you to quickly and easily add a search feature to your application. Search can be tricky to tackle, especially if you have a lot of data that you need to sort and filter quickly. MongoDB Atlas has a built-in tool that allows you to add search functionality to your application, and customize the users’ results with weighted values, analyzers, and groupings. This unit will show you how to use Atlas Search to customize your searches.

### Lesson 01: Using Relevance-Based Search and Search Indexes

1. **Which type of search is depicted in the image below? (Select one.)**
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1719932116369/26306d41-a245-4fd2-8206-d2f48648e77e.png align="center")
    
    **A.** Database Search
    
    **<mark>B.</mark>** <mark> Relevance-based search in an application</mark>
    
2. **What type of index is written below? (Select one.)**
    
    ```javascript
    {
      "analyzer": "lucene.standard",
      "searchAnalyzer": "lucene.standard",
      "mappings": {
        "dynamic": true
      }
    }
    ```
    
    **<mark>A.</mark>** <mark> A search index</mark>
    
    **B.** A database index
    

### Lesson 02: Creating a Search Index with Dynamic Field Mapping

1. **When using a dynamic index, which fields does an Atlas Search query against? (Select one.)**
    
    **A.** Just the fields that the user selects.
    
    **B.** All of the fields, not including nested fields.
    
    **<mark>C.</mark>** <mark> All of the fields including nested fields.</mark>
    
2. **When would you use a dynamically mapped search index? (Select one.)**
    
    **A.** When you want to search within three specific fields.
    
    **B.** When you want to search for names.
    
    **<mark>C.</mark>** <mark> When you want to search all of the fields with equal weight.</mark>
    
    **D.** When you want to search all of the fields, but one of them should be weighted more heavily than the rest.
    

### Lesson 03: Creating a Search Index with Static Field Mapping

1. **If the search index is statically mapped and the only field mapping is for the "storeLocation" field, and you searched for one of the items sold by the office supply company, notepads, how many results will come up? (Select one.)**
    
    **A.** All of the records with "notepads" in any of the fields
    
    **B.** All of the records with "notepads" in any of the fields, but they will have very low relevance scores
    
    **<mark>C.</mark>** <mark> None</mark>
    
    **D.** 20 because of the result limit
    
2. The following code is a snippet from a search index. What type of field mapping does this search index use? (Select one.)
    
    ```javascript
    {
        "mappings": {
            "dynamic": false,
            "fields": {
                "common_name": [
                {
                    "dynamic": true,
                    "type": "document"
                },
                {
                    "type": "string"
                }
                ]
            }
        }
    }
    ```
    
    **A.** Dynamic Mapping
    
    **<mark>B.</mark>** <mark> Static Mapping</mark>
    
    **C.** Compound Operator Mapping
    

### Lesson 04: Using $search and Compound Operators

1. **What does the “filter” clause do? (Select one.)**
    
    **<mark>A.</mark>** <mark> It returns results that match the clause.</mark>
    
    **B.** It eliminates results that match the clause.
    
    **C.** It scores results that match the clause.
    
2. **Which clauses used by the compound operator contribute to the score given the results? (Select one.)** 
    
    **A.** "must", "must not", "should", and "filter"
    
    **B.** "must", "should", and "filter"
    
    **C.** "must", "must not", "should", and "should not"
    
    **<mark>D.</mark>** <mark> "must", "must not", and "should"</mark>
    

### Lesson 05: Grouping Search Results by Using Facets

1. **If you want to view the metadata (facets and their count) for Atlas Search, which aggregation stage must you use? (Select one.)**
    
    **A.** $match
    
    **<mark>B.</mark>** <mark> $searchMeta</mark>
    
    **C.** $group
    
    **D.** $search
    
2. **Which operator can you use to group Atlas search results? (Select one.)**
    
    **A.** $group
    
    **B.** filter
    
    **C.** must
    
    **<mark>D.</mark>** <mark> facet</mark>