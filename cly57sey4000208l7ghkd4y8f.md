---
title: "The MongoDB Shell"
seoTitle: "The MongoDB Shell"
seoDescription: "In this unit, you'll learn about the MongoDB Shell (mongosh), the command line interface that enables you to interact with local and remote MongoDB deployme"
datePublished: Wed Jul 03 2024 02:24:19 GMT+0000 (Coordinated Universal Time)
cuid: cly57sey4000208l7ghkd4y8f
slug: the-mongodb-shell
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1719972610300/73809e78-fd0e-4757-b301-ad606413b86c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1719973439388/9abba8e7-c599-4d9f-b20e-ad74a259b35a.png
tags: mongodb, mongosh, the-mongodb-shell, mongodb-shell

---

## **Overview**

In this unit, you'll learn about the MongoDB Shell (mongosh), the command line interface that enables you to interact with local and remote MongoDB deployments. You'll learn how to install mongosh and connect to both Atlas and self-managed deployments. Next, you'll learn how to configure and use mongosh along with its companion library (.mongoshrc.js). Finally, you'll learn some tips and tricks for working with mongosh.

### Lesson 1 – Installing and Connecting to the MongoDB Shell

1. **Which of the following commands can be used to connect to a database called** `students` on a local MongoDB instance? (Select one.)
    
    **A.** mongosh
    
    **B.** mongosh --host [localhost](http://localhost) --db students
    
    **C.** mongosh --db students
    
    **<mark>D.</mark>** <mark> mongosh students</mark>
    
2. **Which of the following are valid methods for connecting** `mongosh` to a MongoDB Atlas cluster and selecting the `sample_training` database? (Select all that apply.)
    
    **A.** mongosh "mongodb+srv://&lt;clustername&gt;.[mongodb.net/?database=sample\_training](http://mongodb.net/?database=sample_training)" –username &lt;username&gt;
    
    **<mark>B.</mark>** <mark> mongosh "mongodb+srv://&lt;username&gt;:&lt;password&gt;@&lt;clustername&gt;.</mark>[<mark>mongodb.net/sample_training</mark>](http://mongodb.net/sample_training)<mark>"</mark>
    
    **C.** mongosh "mongodb+srv://&lt;clustername&gt;.[mongodb.net/](http://mongodb.net/)" –username &lt;username&gt; --db sample\_training
    
    **<mark>D.</mark>** <mark> mongosh "mongodb+srv://&lt;clustername&gt;.</mark>[<mark>mongodb.net/sample_training</mark>](http://mongodb.net/sample_training)<mark>" --username &lt;username&gt;</mark>
    

### Lesson 2 – Configuring the MongoDB Shell

1. **What method from the** `config` **API allows you to set a configuration option in** `mongosh`**? (Select one.)**
    
    * **A.** config.get()
        
    * **<mark>B.</mark>** <mark> config.set()</mark>
        
    * **C.** config.apply()
        
    * **D.** db.config.set()
        
2. **Which of the following settings can be adjusted by editing an option in the** `mongosh.conf` **file? (Select all that apply.)**
    
    **A.** The color of the font that’s displayed in mongosh
    
    **<mark>B.</mark>** <mark> How many items per batch are displayed when using the “it” iterator</mark>
    
    **<mark>C.</mark>** <mark> The editor used by mongosh when using the edit() method</mark>
    
    **D.** Whether mongosh prompts the user for confirmation before running a deleteOne() or deleteMany() command
    

### Lesson 3 – Using the MongoDB Shell

1. **You want to use an external JavaScript file within an active** `mongosh` **session. What method should you use? (Select one.)**
    
    **<mark>A.</mark>** <mark> load()</mark>
    
    **B.** loadjs()
    
    **C.** run()
    
    **D.** You cannot use external JavaScript files within an active mongosh session.
    
2. **What method is used to change databases within a script by using the** `load()` **method in** `mongosh`**? (Select one.)**
    
    **A.** db.getDb()
    
    **B.** db.getMongo()
    
    **C.** use
    
    **<mark>D.</mark>** <mark> db.getSiblingDB()</mark>
    

### Lesson 4 – Using the MongoDB Shell Library (.mongoshrc.js)

1. **Where should the** `.mongoshrc.js` **file be located? (Select one.)**
    
    * **A.** The same directory as the mongosh executable.
        
    * **<mark>B.</mark>** <mark> The user's home directory.</mark>
        
    * **C.** The file must be loaded into the mongosh session by using the load() method.
        
2. **Which of the following methods terminate an active** `mongosh` **session? (Select one.)**
    
    * **<mark>A.</mark>** <mark> exit</mark>
        
    * **B.** db.exit()
        
    * **C.** db.quit()
        

### Lesson 5 – MongoDB Shell Tips and Tricks

1. **Which of the following examples demonstrates the correct usage of the** `EJSON.stringify()` **method in** `mongosh` **to convert an extended JSON object into a string? (Select one.)**
    
    **A.** `EJSON.stringify({ name: “Test User”, dob: new Date(“1990-01-01”)})`
    
    **B.** `EJSON.stringify(name: “Test User”, dob: new Date(“1990-01-01”)`
    
    **C.** `({name: “Test User”, dob: new Date(“1990-01-01”)}).EJSON.stringify()`
    
    **D.** `EJSON.stringify = { name: “Test User”, dob: new Date(“1990-01-01”)}`
    
    **<mark>A.</mark>** <mark> Option A</mark>
    
    **B.** Option B
    
    **C.** Option C
    
    **D.** Option D
    
2. **In** `mongosh`**, what Node.js** `fs` **module API method can be used to write the results of a query to a file? (Select one.)**
    
    * **A.** fs.write()
        
    * **<mark>B.</mark>** <mark> fs.writeFileSync()</mark>
        
    * **C.** fs.commit()
        
    * **D.** EJSON.stringify()
        
3. **You want to load a script into** `mongosh` **that requires an** `npm` **package. To do so, where should the** `npm` **package be installed? (Select all that apply.)**
    
    * **<mark>A.</mark>** <mark> An option for using an npm package in an external script is to install the package globally and then require it in the script.</mark>
        
    * **<mark>B.</mark>** <mark> The package can be installed in the node_modules directory in your current working directory. Then it can be added to a mongosh script that can be used with the load() method.</mark>
        
    * **C.** mongosh will automatically download and install the necessary dependencies when the script is run in the shell with the load() method.