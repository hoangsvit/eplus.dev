---
title: "MongoDB Database Administrator Tools"
seoTitle: "MongoDB Database Administrator Tools"
seoDescription: "In this unit, you will install a set of command-line tools on an Ubuntu Linux container that will help you with several tasks associated with administering "
datePublished: Thu Jul 04 2024 09:29:37 GMT+0000 (Coordinated Universal Time)
cuid: cly72f7de000209lb0tywaw32
slug: mongodb-database-administrator-tools
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1720083991961/d0df0811-4270-4d1e-bc51-da30a97e8fdc.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1720085360423/66d3631c-a373-4a4b-ad4a-498a655cde3d.png

---

## **Overview**

In this unit, you will install a set of command-line tools on an Ubuntu Linux container that will help you with several tasks associated with administering and managing a MongoDB deployment. These common tasks for DBAs include:

* Backup and recovery of simple, non-sharded deployments with `mongodump` and `mongorestore`
    
* Data migration with `mongoexport` and `mongoimport`
    
* Deployment monitoring with `mongostat`, `mongotop`, and `bsondump`
    
* File storage in a MongoDB database with `mongofiles`
    

### Lesson 1 – Get Started with DBA Tools

1. **Which of the following statements are true about the MongoDB Database Tools suite? (Select all that apply.)**
    
    **A.** To gain access to the MongoDB Database Tools suite, the package must be installed separately from MongoDB Community Edition or MongoDB Enterprise Edition.
    
    **<mark>B.</mark>** <mark> MongoDB Database Tools are a suite of command-line utilities for working with MongoDB.</mark>
    
    **<mark>C.</mark>** <mark> MongoDB Database Tools allow you to import and export data, restore backups, and view diagnostics for your deployments.</mark>
    
    **<mark>D.</mark>** <mark> Version compatibility between MongoDB Database Tools and the target MongoDB server is crucial to ensure interoperability and data integrity.</mark>
    
2. **Which of the following is an example of a task that can be accomplished with the MongoDB Database Tools? (Select all that apply.)**
    
    **<mark>A.</mark>** <mark> Importing JSON files from an external source into an Atlas cluster</mark>
    
    **B.** Monitoring the status of a self-managed MongoDB deployment from the MongoDB Shell
    
    **<mark>C.</mark>** <mark> Creating a backup of a small Atlas cluster</mark>
    
    **<mark>D.</mark>** <mark> Diagnosing problems when attempting to restore data from a BSON file to a self-managed MongoDB deployment</mark>
    

### Lesson 2 – Backup Tools

1. **Which of the following best describes the MongoDB Database Tool** `mongodump`? (Select one.)
    
    **A.** mongodump is a utility that is used to back up the contents of a sharded MongoDB cluster.
    
    **B.** mongodump is a utility that is used to restore the contents of a sharded MongoDB cluster.
    
    **<mark>C.</mark>** <mark> mongodump is a utility that is used to back up the contents of a simple MongoDB cluster.</mark>
    
    **D.** mongodump is a utility that is used to restore the contents of a simple MongoDB cluster.
    
2. **Which of the following commands will back up only the** `grades` **collection from the** `sample_training` **database in a** `dump` **directory? (Select all that apply.)**
    
    **Option A.**
    
    ```apache
    mongodump --db sample_training --collection grades
    ```
    
    **Option B.**
    
    ```apache
    mongodump --collection grades "mongodb+srv://dbaTestAdmin@m0-example-cluster.iy0a1o4.mongodb.net/sample_training"
    ```
    
    **Option C.**
    
    ```apache
    mongodump -v --gzip --archive=backup.gz "mongodb+srv://dbaTestAdmin@m0-example-cluster.iy0a1o4.mongodb.net/sample_training"
    ```
    
    **Option D.**
    
    ```apache
    mongodump --db sample_training
    ```
    
    **<mark>A.</mark>** <mark> Option A</mark>
    
    **<mark>B.</mark>** <mark> Option B</mark>
    
    **C.** Option C
    
    **D.** Option D
    

### Lesson 3 – Restore Tools

1. **Which of the following best describes the MongoDB Database Tool** `mongorestore`**? (Select one.)**
    
    **A.** mongorestore is a utility that is used to back up the contents of a sharded MongoDB cluster.
    
    **B.** mongorestore is a utility that is used to restore the contents of a sharded MongoDB cluster.
    
    **C.** mongorestore is a utility that is used to back up the contents of a simple MongoDB cluster.
    
    **<mark>D.</mark>** <mark> mongorestore is a utility that is used to restore the contents of a simple MongoDB cluster.</mark>
    
2. **Which of the following commands will restore only the** `grades` collection from the `sample_training` database from a `dump` directory? (Select all that apply.)
    
    **Option A.**  
    `mongorestore --nsInclude=grades dump/`
    
    **Option B.**  
    `mongorestore --nsInclude=sample_training.grades dump/sample_training/school/grades`
    
    **Option C.**  
    `mongorestore --nsInclude=sample_training.grades dump/`
    
    **Option D.**  
    `mongorestore --db sample_training –collection grades`
    
    **A.** Option A
    
    **B.** Option B
    
    **<mark>C.</mark>** <mark> Option C</mark>
    
    **D.** Option D
    

### Lesson 4 – Data Export Tools

1. **Which of the following best describes the MongoDB Database Tool** `mongoexport`**? (Select one.)**
    
    **A.** mongoexport is a command-line tool that produces a binary dump of data stored in a MongoDB instance.
    
    **B.** mongoexport is a command-line tool that takes a JSON or CSV file and uploads it to a MongoDB instance.
    
    **C.** mongoexport is a command-line tool that produces a YAML export of data stored in a MongoDB instance.
    
    **<mark>D.</mark>** <mark> mongoexport is a command-line tool that produces a JSON or CSV export of data stored in a MongoDB instance.</mark>
    
2. **Which of the following commands will export only the** `grades` **collection from the** `sample_training` **database in a dump directory? (Select all that apply.)**
    
    **Option A.**  
    `mongoexport --collection=grades --db=sample_training --out=grades.json`
    
    **Option B.**  
    `mongoexport --ns=sample_training.grades --out=grades.json`
    
    **Option C.**  
    `mongoexport --collection=grades --db=sample_training --out=grades.yaml`
    
    **Option D.**  
    `mongoexport --db=sample_training --out=grades.json`
    
    **<mark>A.</mark>** <mark> Option A</mark>
    
    **B.** Option B
    
    **C.** Option C
    
    **D.** Option D
    

### Lesson 5 – Data Import Tools

1. **Which of the following best describes the MongoDB Database Tool** `mongoimport`**? (Select all that apply.)**
    
    **<mark>A.</mark>** <mark> mongoimport is a command-line tool that is used to create a new database with a JSON or CSV file of data from another database.</mark>
    
    **<mark>B.</mark>** <mark> mongoimport is a command-line tool that is used to restore the contents of a database with a JSON or CSV file of data from a database.</mark>
    
    **C.** mongoimport is a command-line tool that is used to directly connect two databases together and have them share data.
    
    **D.** mongoimport is a command-line tool that produces a JSON or CSV export of data that’s stored in a MongoDB instance.
    
2. **Which of the following commands will import data to a collection called** `grades` **in the** `students` **database from a file named** `grades.json`**, and replace documents in the database that match the documents in the import file? (Select one.)**
    
    **Option A.**  
    `mongoimport --collection=grades --db=students --file=grades.json`
    
    **Option B.**  
    `mongoimport --collection=grades --db=students --mode=delete --file=grades.json`
    
    **Option C.**  
    `mongoimport --collection=grades --db=students --mode=upsert --file=grades.json`
    
    **Option D.**  
    `mongoimport --collection=grades --db=students --mode=merge --file=grades.json`
    
    **A.** Option A
    
    **B.** Option B
    
    **<mark>C.</mark>** <mark> Option C</mark>
    
    **D.** Option D
    

### Lesson 6 – Diagnostic Tools: mongostat

1. **Which of the following best describes the MongoDB Database Tool** `mongostat`**? (Select one.)**
    
    **A.** mongostat is a diagnostic tool that provides a day-old view of a currently running MongoDB instance.
    
    **B.** mongostat is a diagnostic tool that provides a real-time view of a currently running MongoDB instance.
    
    **C.** mongostat is a diagnostic tool that provides a list of all MongoDB instances that are running on your local machine.
    
    **D.** mongostat is a diagnostic tool that provides a history of all actions performed in a cluster.
    
2. **Which of the following commands will show the status of the insert rate, query rate, and command rate of the MongoDB instance running at** `mongodb+srv://`[`username@businesscluster.iy0a1o4.mongodb.net`](mailto:username@businesscluster.iy0a1o4.mongodb.net) **with a polling time of 2 seconds? (Select one.)**
    
    **Option A.**
    
    ```apache
    mongostat -o='host,opcounters.insert.rate()=Insert Rate,opcounters.query.rate()=Query Rate,opcounters.command.rate()=Command Rate' "mongodb+srv://username@businesscluster.iy0a1o4.mongodb.net" 2
    ```
    
    **Option B.**
    
    ```apache
    mongostat -o='host,opcounters.insert.rate()=Insert Rate,opcounters.query.rate()=Query Rate,opcounters.command.rate()=Command Rate' "mongodb+srv://username@businesscluster.iy0a1o4.mongodb.net" 2000
    ```
    
    **Option C.**
    
    ```apache
    mongostatus -stats='host,opcounters.insert.rate()=Insert Rate,opcounters.query.rate()=Query Rate' "mongodb+srv://username@businesscluster.iy0a1o4.mongodb.net" 2
    ```
    
    **Option D.**
    
    ```apache
    mongostat -stats='host,opcounters.insert.rate()=Insert Rate,opcounters.query.rate()=Query Rate,opcounters.command.rate()=Command Rate' "mongodb+srv://username@businesscluster.iy0a1o4.mongodb.net" 2
    ```
    
    **<mark>A.</mark>** <mark> Option A</mark>
    
    **B.** Option B
    
    **C.** Option C
    
    **D.** Option D
    

### Lesson 7 – Diagnostic Tools: mongotop

1. **Which of the following best describes the MongoDB Database Tool** `mongotop`**? (Select one.)**
    
    **A.** mongotop provides a method to track the amount of time a MongoDB instance spends writing data, but it does not provide information about time spent reading data.
    
    **B.** mongotop is a utility that tracks the database users who spend the most time modifying the data.
    
    **<mark>C.</mark>** <mark> mongotop provides a method to track the amount of time a MongoDB instance spends reading and writing data.</mark>
    
    **D.** mongotop is a utility to track the amount of space left in a MongoDB instance running on Atlas.
    
2. **Which of the following commands will show the read and write activity of ar MongoDB instance at** `mongodb+srv://`[`username@businesscluster.iy0a1o4.mongodb.net`](mailto:username@businesscluster.iy0a1o4.mongodb.net) **every 30 seconds? (Select one.)**
    
    **Option A.**
    
    ```apache
    mongotop 30000 --uri='mongodb+srv://username@businesscluster.iy0a1o4.mongodb.net'
    ```
    
    **Option B.**
    
    ```apache
    mongotop 30 --uri='mongodb+srv://username@businesscluster.iy0a1o4.mongodb.net'
    ```
    
    **Option C.**
    
    ```apache
    mongotop -–int=30
    ```
    
    **Option D.**
    
    ```apache
    mongotop 30 --database='mongodb+srv://username@businesscluster.iy0a1o4.mongodb.net'
    ```
    
    **A.** Option A
    
    **<mark>B.</mark>** <mark> Option B</mark>
    
    **C.** Option C
    
    **D.** Option D
    

### Lesson 8 – Diagnostic Tools: bsondump

1. **Which of the following best describes the MongoDB Database Tool** `bsondump`**? (Select one.)**
    
    **A.** bsondump converts the JSON from the mongodump command into a binary format for storage efficiency.
    
    **B.** bsondump outputs the entire database in binary format in the MongoDB Shell.
    
    **C.** bsondump encrypts BSON files for storage on less secure servers.
    
    **<mark>D.</mark>** <mark> bsondump converts BSON files into human-readable formats, including JSON.</mark>
    
2. **Which of the following commands will output a prettified JSON file from the** `grades.bson` **file? (Select one.)**
    
    **Option A.** `bsondump --outFile=grades.json -–pretty grades.bson`
    
    **Option B.** `bsondump grades.bson->grades.json -–pretty`
    
    **Option C.** `bsondump --inputFile=grades.bson --outputFile=grades.json -–pretty`
    
    **Option D.** `bsondump --outFile=grades.json grades.bson`
    
    **<mark>A.</mark>** <mark> Option A</mark>
    
    **B.** Option B
    
    **C.** Option C
    
    **D.** Option D
    

### Lesson 9 – MongoDB as a Filesystem

1. **Which of the following best describes the MongoDB Database Tool** `mongofiles`**? (Select one.)**
    
    **A.** mongofiles enables you to store BSON documents in a human-readable format instead of binary.
    
    **<mark>B.</mark>** <mark> mongofiles enables you to manipulate files stored in your MongoDB instance in GridFS objects from the command line.</mark>
    
    **C.** mongofiles enables you to manipulate files stored in your MongoDB instance in the Atlas UI.
    
    **D.** mongofiles enables you to run diagnostics on files stored in your MongoDB instance to find any documents that do not match the schema.
    
2. **Which of the following commands will list all of the files in the GridFS collection in the** `grades` **database that start with the word "final"? (Select one.)**
    
    **Option A.** `mongofiles -d=grades list final`
    
    **Option B.** `mongofiles -d=grades list --files="final"`
    
    **Option C.** `mongofiles -d=grades search final`
    
    **Option D.** `mongofiles -d=grades put final`
    
    **<mark>A.</mark>** <mark> Option A</mark>
    
    **B.** Option B
    
    **C.** Option C
    
    **D.** Option D