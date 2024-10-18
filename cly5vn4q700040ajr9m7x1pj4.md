---
title: "MongoDB Logging Basics"
seoTitle: "MongoDB Logging Basics"
seoDescription: "In this unit, you'll learn about logs for both self-managed and Atlas deployments, and how to interpret and use them effectively. You'll first download logs"
datePublished: Wed Jul 03 2024 13:32:03 GMT+0000 (Coordinated Universal Time)
cuid: cly5vn4q700040ajr9m7x1pj4
slug: mongodb-logging-basics
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1720013481971/0961ecc1-0259-4993-9fa2-335436fadccc.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1720013511305/8c6208a6-5d63-4f29-ad19-a1e8217d59e2.png
tags: mongodb-logging-basics

---

## **Overview**

In this unit, you'll learn about logs for both self-managed and Atlas deployments, and how to interpret and use them effectively. You'll first download logs in Atlas and locate them for self-managed deployments. Then, you'll explore some of the information that logs can provide, including authorization attempts and startup warnings. Finally, you'll learn about MongoDB's approach to log rotation and retention, and why both are important.

### Lesson 1 – MongoDB Logs in Atlas

1. **Which of the following are valid methods to download logs from M10-and-above Atlas clusters? (Select all that apply.)**
    
    **<mark>A.</mark>** <mark> Using the Atlas UI</mark>
    
    **B.** Contacting MongoDB Support
    
    **<mark>C.</mark>** <mark> Using the Atlas CLI</mark>
    
    **D.** Using a service like SCP (Secure Copy Protocol) or FTP (File Transfer Protocol)
    
2. **What is the minimum privilege you need to download logs from an Atlas cluster? (Select one.)**
    
    * **A.** Organization Read Only
        
    * **<mark>B.</mark>** <mark> Project Data Access Read Only</mark>
        
    * **C.** Project Read Only
        
    * **D.** Organization Member
        

### Lesson 2 – MongoDB Logs on Self-Managed Instances

1. **While trying to access the** `mongod.log` **file for a self-managed deployment, you realize that it’s not in its default location. Which of the following options would help you find the location of the** `mongod.log` **file? (Select all that apply.)**
    
    **A.** The path for the log file can be found by running the db.getLogPath() helper method in mongosh.
    
    **<mark>B.</mark>** <mark> The path for the log file can be found by viewing the value provided to the --logpath argument when viewing the mongod process information with a command such as “ps aux | grep mongod”.</mark>
    
    **<mark>C.</mark>** <mark> The path for the log file can be found by checking the systemLog.path value in the mongod.conf file.</mark>
    
    **D.** The path for the log file can be found by running db.adminCommand({getLog: "global"}) in mongosh.
    
2. **Which of the following users can successfully open a** `mongod.log` **file? (Select all that apply.)**
    
    **<mark>A.</mark>** <mark> A user with access to the sudo command in Linux.</mark>
    
    **<mark>B.</mark>** <mark> A user that has been added to the mongodb group.</mark>
    
    **C.** The file can be opened by any user on the system, regardless of permissions.
    

### Lesson 3 – MongoDB Log Events

1. **Given the following log message, identify the correct field name that relates to the operating system thread that prompted the log message. (Select one.)**
    
    ```json
    {
     "t": {
       "$date": "2023-05-12T21:09:58.661+00:00"
     },
     "s": "I",
     "c": "REPL",
     "id": 21358,
     "ctx": "conn54",
     "msg": "Replica set state transition",
     "attr": {
       "newState": "SECONDARY",
       "oldState": "PRIMARY"
     }
    }
    ```
    
    **A.** The "t" field
    
    **B.** The "s" field
    
    **<mark>C.</mark>** <mark> The "ctx" field</mark>
    
    **D.** The "id" field
    
2. **Which of the following fields in a MongoDB log relates to the level of debugging verbosity? (Select one.)**
    
    **A.** "msg"
    
    **<mark>B.</mark>** <mark> "s"</mark>
    
    **C.** "attr"
    
    **D.** "id"
    

### Lesson 4 – MongoDB Server Log Customizations

1. **Which of the following statements are true regarding the** `slowms` **property? (Select all that apply.)**
    
    **A.** The slowms threshold can be set only for self-managed deployments. It cannot be changed for Atlas clusters.
    
    **B.** The slowms property defines the maximum amount of time for an operation to complete before it’s considered slow.
    
    **<mark>C.</mark>** <mark> The default value for the slowms property is set to 100 milliseconds.</mark>
    
    **D.** The only way to set a custom threshold for the slowms property is by using the db.setProfilingLevel() method in mongosh.
    
2. **Which of the following options would successfully set a** `slowms` **threshold to 50 milliseconds in the MongoDB Shell? (Select one.)**
    
    **Option A.** `db.setProfilingLevel(0, { slowms: 500 })`
    
    **Option B.** `db.setProperty(0, { slowms: 500 })`
    
    **Option C.** `db.setProperty(0, { slowms: 50 })`
    
    **Option D.** `db.setProfilingLevel(0, { slowms: 50 })`
    
    **A.** Option A
    
    **B.** Option B
    
    **C.** Option C
    
    **<mark>D.</mark>** <mark> Option D</mark>
    
3. **Which of the following statements are true regarding the verbosity of the logs? (Select all that apply.)**
    
    **<mark>A.</mark>** <mark> The verbosity level refers to the amount of debugging information to include in the log file.</mark>
    
    **<mark>B.</mark>** <mark> To increase the verbosity for only one component, such as the INDEX component, edit the configuration file for a self-managed deployment.</mark>
    
    **C.** The setLogLevel() method can be used on Atlas clusters to adjust the verbosity of the logs.
    
    **D.** The verbosity level for a self-managed deployment can be adjusted by setting the verbosity property under the systemLog section of the configuration file.
    

### Lesson 5 – MongoDB Server Log Rotation and Retention

1. **What is the maximum number of days that MongoDB Atlas will retain logs for? (Select one.)**
    
    **<mark>A.</mark>** <mark> 30 days</mark>
    
    **B.** 90 days
    
    **C.** 120 days
    
    **D.** 365 days
    
2. **Which of the following are valid methods for rotating** `mongod` **log files? (Select all that apply.)**
    
    **<mark>A.</mark>** <mark> Using the db.adminCommand({ logRotate: 1 }) method in mongosh</mark>
    
    **B.** Forcefully ending the mongod process by using pkill $(pidof mongod)
    
    **C.** Running the rotate logs helper in mongosh
    
    **<mark>D.</mark>** <mark> Issuing a SIGUSR1 signal to the mongod process manually or automatically by using the Linux logrotate utility</mark>