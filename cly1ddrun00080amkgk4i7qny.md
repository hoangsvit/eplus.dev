---
title: "MongoDB CRUD Operations in PHP"
seoTitle: "MongoDB CRUD Operations in PHP"
seoDescription: "In this unit, you'll learn how to perform CRUD operations by using PHP. First, you'll learn how BSON documents are represented in PHP. Next, you'll learn ho"
datePublished: Sun Jun 30 2024 09:49:49 GMT+0000 (Coordinated Universal Time)
cuid: cly1ddrun00080amkgk4i7qny
slug: mongodb-crud-operations-in-php
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1719740928794/e81ca711-cc12-41b0-aebe-69c44611575d.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1719740947914/1569039c-6205-4706-8913-91e37b09b06e.png
tags: mongodb, php, mongodb-crud

---

## **Overview**

In this unit, you'll learn how to perform CRUD operations by using PHP. First, you'll learn how BSON documents are represented in PHP. Next, you'll learn how to insert, query and retrieve, update, and delete documents in a PHP application. Finally, you'll learn how to create a multi-document transaction.

### LESSON 1: WORKING WITH MONGODB DOCUMENTS IN PHP

1. **What is the output of the following PHP code?**
    
    ```php
    $document = [
        '_id' => new MongoDB\BSON\ObjectId('5eb3d668b31de5d588f42974'),
        'name' => 'Leonard Cohen',
        'age' => '49',
    ];
    
    var_dump($document);
    ```
    
    **Option A:**
    
    ```php
    array(3) {
       ["_id"]=>
       object(MongoDB\BSON\ObjectId)#8 (1) {
          ["oid"]=>
          string(24) "5eb3d668b31de5d588f42974"
       }
       ["name"]=>
       string(13) "Leonard Cohen"
       ["age"]=>
       string(2) "49"
    ```
    
    **Option B:**
    
    ```powershell
    {
    "_id": { "$oid": "5eb3d668b31de5d588f42974" },
    "name": 'Leonard Cohen',
    "age": 49
    }
    ```
    
    **Option C:**
    
    ```php
    object(MongoDB\Model\BSONDocument)#19 (1) {
    ["storage":"ArrayObject":private]=>
       array(3) {
          "_id" =>
          {
             "oid" => "5eb3d668b31de5d588f42974"
          },
          "name" => "Leonard Cohen",
          "age" => 49
       }
    }
    ```
    
    **<mark>A.</mark>** <mark> Option A</mark>
    
    **B.** Option B
    
    **C.** Option C
    
2. **What is incorrect about the following piece of PHP code? (Select all that apply.)**
    
    ```powershell
    $document = [
        '_id': '5eb3d668b31de5d588f42974',
        'borough': 'Manhattan',
        'cuisine':  'Italian',
        'name': 'Mariachis Restaurant',
    ];
    ```
    
    **<mark>A.</mark>** <mark> The '_id' field is missing the MongoDB\BSON\ObjectId class wrapper.</mark>
    
    **B.** The field names should not have quotes.
    
    **C.** The 'borough', 'cuisine', and 'name' fields should have a MongoDB\\BSON\\String class wrapper around them.
    
    **<mark>D.</mark>** <mark> The syntax for the key-value pairs is incorrect. The syntax in PHP is 'field_name' =&gt; 'field_value' , not 'field_name': 'field_value'.</mark>
    

### LESSON 2: INSERTING A DOCUMENT IN PHP APPLICATIONS

1. **You want to insert a new restaurant into the**`restaurants`**collection. The new restaurant’s data is stored in an associative array, set to the variable name**`$hyderabadi_biryani`**. Which of the following expressions will insert the new document into the**`restaurants`**collection? (Select one.)**
    
    **A.**`$result = $restaurants_collection->insertOne($hyderabadi_biryani);`
    
    **B.**`$result = $restaurants_collection->insert($hyderabadi_biryani);`
    
    **C.**`$result = $restaurants_collection->insertMany($hyderabadi_biryani);`
    
    **D.**`$result = $restaurants_collection->insert.hyderabadi_biryani`
    
    **<mark>A.</mark>** <mark> Option A</mark>
    
    **B.** Option B
    
    **C.** Option C
    
    **D.** Option D
    
2. **The**`sample_restaurants` database is expanding to include restaurants in five new neighborhoods. You need to add documents for the five new neighborhoods in the `neighborhoods` collection. Documents for each new neighborhood are stored in the `$new_neighborhoods` array variable. Which expression should you use to insert these documents into the collection? (Select one.)
    
    **A.**  
    `$result = $neighborhoods_collection->insertMany([neighborhood_one,neighborhood_two, neighborhood_three, neighborhood_four, neighborhood_five]);`
    
    **B.**  
    `$result = $neighborhoods_collection.insert_many($new_neighborhoods);`
    
    **C.**  
    `$result = neighborhoods_collection->insert(new_neighborhoods);`
    
    **D.**  
    `$result = $neighborhoods_collection->insertMany($new_neighborhoods);`
    
    **A.** Option A
    
    **B.** Option B
    
    **C.** Option C
    
    **<mark>D.</mark>** <mark> Option D</mark>
    

### LESSON 3: QUERYING A MONGODB COLLECTION IN PHP APPLICATIONS

1. **You want to find the population for the 85281 zip code in Tempe, Arizona. You want the results of the specific document returned to you directly in the terminal. Which query should you use to assign the result to the**`$result`**variable, given the following? (Select one.)**
    
    ```php
    $zips_collection = $client->sample_training->zips;
    
    $tempe_zip = ["zip" => "85281"];
    ```
    
    **A.**`$result = $sample_training.zips.find({“zip”: “85281”});`
    
    **B.**`$result = $zips_collection.find($tempe_zip);`
    
    **C.**`$result = $zips_collection->findOne($tempe_zip);`
    
    **D.**`$result = $zips->find_one([“zip” => “85281”]);`
    
    **A.** Option A
    
    **B.** Option B
    
    **<mark>C.</mark>** <mark> Option C</mark>
    
    **D.** Option D
    
2. **You want to find all zip codes for the city of Tulsa, Oklahoma. Which query should you use, given the following? (Select one.)**
    
    ```php
    $zips_collection = $client->sample_training->zips;
    
    $filter = ["city" => "TULSA"];
    ```
    
    **A.**`$cursor = $zips_collection->find($filter);`
    
    **B.**`$cursor = $zips_collection->find_one($filter);`
    
    **C.**`$cursor = $zips_collection->findOne("city": "TULSA");`
    
    **D.**`$cursor = $zips_collection->findMany("city": "TULSA");`
    
    **<mark>A.</mark>** <mark> Option A</mark>
    
    **B.** Option B
    
    **C.** Option C
    
    **D.** Option D
    

### LESSON 4: UPDATING DOCUMENTS IN PHP APPLICATIONS

1. **Zvents recently hired 15 new employees, bringing the total number of employees to 70. You need to update the** `companies` **collection within the** `sample_training` **database, so that the** `number_of_employees` **field is set to 70. Which query should you use, given the following? (Select one.)**
    
    ```php
    # Get reference to 'companies' collection
    $companies_collection = $client->sample_training->companies;
    
    # Filter
    $document_to_update = ["name" => "Zvents"]
    
    # Update
    $update_employees = ["$set" => ["number_of_employees" => 70 ]]
    
    # Write an expression updates the number of employees.
    ```
    
    **A.** `$result = $db.companies->update_one({document_to_update, update_employees});`
    
    **B.** `$result = $companies_collection->updateOne({ document_to_update}, { update_employees});`
    
    **C.** `$result = $companies_collection->update( $document_to_update, $update_employees);`
    
    **D.** `$result = $companies_collection->updateOne($document_to_update, $update_employees);`
    
    **A.** Option A
    
    **B.** Option B
    
    **C.** Option C
    
    **<mark>D.</mark>** <mark> Option D</mark>
    
2. **Zvents recently hired 15 new employees, bringing the total number of employees to 70. You need to update the** `companies` **collection within the** `sample_training` **database, so that the** `number_of_employees` **field is set to 70. Which query should you use, given the following? (Select one.)**
    
    ```php
    # Get reference to 'companies' collection
    $companies_collection = $client->sample_training->companies;
    
    # Filter
    $document_to_update = ["name" => "Zvents"]
    
    # Update
    $update_employees = ["$set" => ["number_of_employees" => 70 ]]
    
    # Write an expression updates the number of employees.
    ```
    
    **A.** `$result = $db.companies->update_one({document_to_update, update_employees});`
    
    **B.** `$result = $companies_collection->updateOne({ document_to_update}, { update_employees});`
    
    **C.** `$result = $companies_collection->update( $document_to_update, $update_employees);`
    
    **D.** `$result = $companies_collection->updateOne($document_to_update, $update_employees);`
    
    **A.** Option A
    
    **<mark>B.</mark>** <mark> Option B</mark>
    
    **C.** Option C
    
    **D.** Option D
    

### LESSON 5: DELETING DOCUMENTS IN PHP APPLICATIONS

1. **Use this dataset to answer the question that follows:**
    
    ```json
     {
        "account_id": "MDB156014571",
        "account_holder": "Adelen Værnes",
        "account_type": "savings",
        "balance": 1519.62,
        "transfers_complete": [
          "TR670287839",
          "TR679752211",
          "TR854525844",
          "TR762109284"
        ]
      },
      {
        "account_id": "MDB190468049",
        "account_holder": "Louis Lewis",
        "account_type": "savings",
        "balance": 4155.67,
        "transfers_complete": [
          "TR859060098",
          "TR729044189",
          "TR126484922",
          "TR617907396",
          "TR598541455"
        ]
      },
      {
        "account_id": "MDB870205338",
        "account_holder": "Juan Perez",
        "account_type": "checking",
        "balance": 1907.8,
        "transfers_complete": [
          "TR432759196",
          "TR797654953",
          "TR391563093",
          "TR464853424",
          "TR922604241"
        ]
      },
    ```
    
    **When you run the following command, what is the result? (Select one.)**
    
    ```php
    $filter = ["account_type" => "checking"];
    $result = $accounts_collection->deleteMany($filter);
    ```
    
    **<mark>A.</mark>** <mark> Louis Lewis and Adelen Værnes are the only two documents left in the collection.</mark>
    
    **B.** Juan Perez is the only document left in the collection.
    
    **C.** No changes happen to the collection.
    
    **D.** The account\_type field is deleted from every document in the collection.
    
2. **The bank has identified a fraudulent account with the** `account_id` **of** `MDB905411541`**. Given the following PHP file, which expression should you use to remove this account? (Select one.)**
    
    ```php
    # Get a reference to the 'accounts' collection
    $accounts_collection = $client->bank->accounts;
    
    # Filter by ObjectId
    $fraud_account = ["account_id" => "MDB905411541"];
    
    # Write an expression that deletes the target account.
    ```
    
    **A.** `$result = $accounts_collection->delete($fraud_account);`
    
    **B.** `$result = $accounts_collection->hide($fraud_account);`
    
    **C.** `$result = $accounts_collection->delete($account);`
    
    **D.** `$result = $accounts_collection->deleteOne($fraud_account);`
    
    **A.** Option A
    
    **B.** Option B
    
    **C.** Option C
    
    **<mark>D.</mark>** <mark> Option D</mark>
    

### LESSON 6: CREATING MONGODB TRANSACTIONS IN PHP APPLICATIONS

1. **You have a transaction that contains operations to increase the amount in one account in the** `accounts` **collection, decrease the amount in another account in the** `accounts` **collection, and insert a document into a** `transfers` **collection to record the transfer. What will happen if the document is not successfully inserted into the** `transfers` **collection? (Select all that apply.)**
    
    **<mark>A.</mark>** <mark> The operations that did not fail will be reversed.</mark>
    
    **<mark>B.</mark>** <mark> The entire transaction will be canceled, and no operations will be committed.</mark>
    
    **C.** The entire transaction will complete, but only the operations that did not fail will be committed.
    
2. **Which function starts the transaction, runs the callback, and then commits or cancels the transaction? (Select one.)**
    
    **A.** MongoDB\\start\_session()
    
    **<mark>B.</mark>** <mark> MongoDB\with_transaction()</mark>
    
    **C.** MongoDB\\commit\_transaction()
    
    **D.** MongoDB\\transaction()