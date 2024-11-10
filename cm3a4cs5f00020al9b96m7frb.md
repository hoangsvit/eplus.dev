---
title: "Final graded quiz: Intro to databases"
seoTitle: "Final graded quiz: Intro to databases"
seoDescription: "The questions in this assessment relate to a sports club that needs to build a digital database to maintain data about the players joining the club."
datePublished: Sat Nov 09 2024 12:05:33 GMT+0000 (Coordinated Universal Time)
cuid: cm3a4cs5f00020al9b96m7frb
slug: final-graded-quiz-intro-to-databases
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731153906476/500b3241-cce6-4984-806a-c1f42da7ac88.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731153920609/75eab9d5-b048-47a8-82a9-4d4b3b9345c5.png
tags: final-graded-quiz-intro-to-databases

---

**This assessment consists of two parts: ode block and a quiz.**

**Part 1: Code Blocks**

To complete this part of the assessment, you can use MySQL database management system available on the Coursera platform.

**Instructions**

The questions in this assessment relate to a sports club that needs to build a digital database to maintain data about the players joining the club.

Run each complete SQL statement you write in this part to develop the database for the sports club.

**Important**

Remember to end each complete SQL statement with a semicolon.

Make sure you leave a space between the SQL terms and the operators.

Use capital letters for the SQL commands and keywords.

For example, a *correctly formatted* SQL statement must be written as follows:

* SELECT 5 + 7;
    

Here is an example of an *incorrectly formatted* SQL statement in which there is no semicolon, and no spaces are placed before or after the operator:

* SELECT 5+7
    

![Terminal page](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/yXND40NDQUazQ-NDQ2FG8Q_914610e75e9943368a8ba00d98e70ae1_C1M5L1-IMAGE01.png?expiry=1731283200000&hmac=YYW1QCcYAM2j_wYwP7JhdMbKYHUYeWRjh6yzTcZQm_s align="left")

1. **Write an SQL statement to create a database called "SportsClub".**
    
    ```sql
    CREATE DATABASE SportsClub;
    ```
    
2. **In the text field below, input the missing keyword (\_\_\_) from the following SQL statement to create a table called "Players".**
    
    ```sql
    CREATE ____ Players (playerID INT, playerName VARCHAR(50), age INT, PRIMARY KEY(playerID));
    ```
    
    Run the complete SQL statement in MySQL to create the table in the club database.
    
    ```sql
    CREATE TABLE Players (playerID INT, playerName VARCHAR(50), age INT, PRIMARY KEY(playerID));
    ```
    
3. **In the text field below, input the missing keyword (\_\_\_) from the following SQL statement to insert data into the "Players" table.**
    
    ```sql
    INSERT INTO Players (playerID, playerName, age) ____ (1, "Jack", 25);
    ```
    
    Run the complete SQL statement in MySQL to insert the record of data in the players table.
    
    ```sql
    INSERT INTO Players (playerID, playerName, age) VALUES (1, "Jack", 25);
    ```
    
4. **Insert three more records into the "Players" table that contain the following data:**
    
    * (2, "Karl", 20)
        
    * (3, "Mark", 21)
        
    * (4, "Andrew", 22)
        
    
    Once you have executed the INSERT INTO statement to enter these three records of data, run the following SQL statement:
    
    ```sql
    SELECT playerName FROM Players WHERE playerID = 2;
    ```
    
    What is the playerName that appears on the screen?
    
    ```sql
    INSERT INTO Players (playerID, playerName, age) VALUES (2, "Karl", 20);
    INSERT INTO Players (playerID, playerName, age) VALUES (3, "Mark", 21);
    INSERT INTO Players (playerID, playerName, age) VALUES (4, "Andrew", 22);
    ```
    
5. **Write a SQL statement that outputs all players names in the "Players" table. When you run the right SQL query, you should have the following output result:**
    
    ![Table of player names](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/iIMg7NzOTieDIOzczr4nog_cd84f779973a4eb4a1d68fc6f7d507e1_C1M5L1-IMAGE02.png?expiry=1731283200000&hmac=rA_UuDIo_LRB_W140L2O1GD1qd5pcOIWK9aYnVZJEa8 align="left")
    
    ```sql
    SELECT playerName FROM Players;
    ```
    
6. **The following table called "Players", contains four records of data. Write a SQL statement that updates the age of the player with ID = 3. The new age value should be '22'.**
    
    ![Table of Player ID, Player Names and age](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/Soy8Xu-bQcOMvF7vm3HDww_e0c86e055b064222a3049f418d42f1e1_C1M5L1-IMAGE03.png?expiry=1731283200000&hmac=DfjXUEJaGqa5NIYs3ioqt7NJ8qzwzPPdDnypWDZu7RM align="left")
    
    ```sql
    UPDATE Players SET age = 22 WHERE playerID = 3;
    ```
    
7. **The following table called "Players", contains four records of data. Write a SQL statement that deletes the record of the player with ID = 4.**
    
    ![Table of Player ID, Player Names and age](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/zbiSbbGDSLq4km2xgwi6pw_3e2660baf6884b99be60493db82450e1_C1M5L1-IMAGE04.png?expiry=1731283200000&hmac=qEfA6nuXHR4aX68ptQaMzaFthR2el1V-K8Knl1ctwu0 align="left")
    
    ```sql
    DELETE FROM Players WHERE playerID = 4;
    ```
    
8. **Write an SQL statement that evaluates if the PlayerID in the following "Players" table is odd or even.**
    
    **Hint:** Assume X is a number. If the remainder of X divided by 2 is 0, then X is an even number otherwise X is an odd number. Remember to use the “%” symbol to get the remainder.
    
    | **PlayerID** | **Name** |
    | --- | --- |
    | 1 | Karl |
    | 2 | Adam |
    | 3 | Anas |
    
    ```sql
    SELECT playerID,
           CASE 
               WHEN playerID % 2 = 0 THEN 'Even' 
               ELSE 'Odd' 
           END AS PlayerID_Type
    FROM Players;
    ```
    
9. Write an SQL statement that outputs all names of the players in the following "Players" table who are older than 25 years of age.
    
    | **Age** | **Name** |
    | --- | --- |
    | 38 | Karl |
    | 25 | Adam |
    | 22 | Anas |
    
    ```sql
    SELECT Name FROM Players WHERE Age > 25;
    ```
    
10. Review the following ER-Diagram. Write the missing part of the SQL statement to define a foreign key that links the course table with the department table.
    
    ![Course table linked to department table by a foreign key](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/bQADBzaDQKiAAwc2g3CoUA_36dc38637ea449afafc0d7ec466e7ce1_C1M5L1-IMAGE07.png?expiry=1731283200000&hmac=vlNay-llyyqIzSsAm3ODIBpjUjb3v0uASYCZ7RpEFdM align="left")
    
    ```sql
    CREATE TABLE Course(  courseID int NOT NULL, courseName VARCHAR(50), PRIMARY KEY (courseID),    
      ____ ____(____) ____ ____ (____) 
    );
    ```
    
    **Hint:** write only the missing part in your answer.
    
    ```sql
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
    ```
    
11. **What is a row of information about one specific staff member in a college database table referred to as?**
    
    * A key
        
    * A column
        
    * <mark>A record</mark>
        
12. **A sports club database includes a table called "Members" with two columns:**
    
    * A 'member number' column that contains the phone number of each member
        
    * And a 'full name' column that contains the full name of each member.
        
    
    **Choose the right data type for each column. Select all correct answers.**
    
    * The Player number column data type is DECIMAL.
        
    * The Full name column data type is CHAR.
        
    * <mark>The Player number column data type is INT.</mark>
        
    * <mark>The Full name column data type is VARCHAR.</mark>
        
13. **In a football club the skill level of all new players must automatically be set at the default of level 1. Which SQL syntax is used to set this default level using the DEFAULT keyword?**
    
    * <mark>level INT DEFAULT 1;</mark>
        
    * DEFAULT level INT 1;
        
14. **Database constraints are used to limit the type of data value that can be stored in a table.**
    
    * False
        
    * <mark>True</mark>
        
15. **The output result of the following SQL statement is the data of all customers from Italy.**
    
    ```sql
    SELECT * FROM customers WHERE Country = "Italy";
    ```
    
    * <mark>True</mark>
        
    * False
        
16. **The output result of the following SQL statement returns the records of all customers from India in Alphabetical order from A to Z.**
    
    ```sql
    SELECT * FROM students WHERE country = "India" ORDER BY FirstName DESC;
    ```
    
    * <mark>False</mark>
        
    * True
        
17. **What does the following SQL statement do?**
    
    ```sql
    SELECT * FROM Players ORDER BY Country, PlayerName;
    ```
    
    * It orders the result by country and ignores the staff name.
        
    * <mark>It displays the results ordered by country first, then players name.</mark>
        
18. **The following table of data conforms with the first normal form.**
    
    <table><tbody><tr><td colspan="1" rowspan="1"><p><strong>Department ID</strong></p></td><td colspan="1" rowspan="1"><p><strong>Department Name</strong></p></td><td colspan="1" rowspan="1"><p><strong>Head of department</strong></p></td><td colspan="1" rowspan="1"><p><strong>Course ID</strong></p></td><td colspan="1" rowspan="1"><p><strong>Course Name</strong></p></td></tr><tr><td colspan="1" rowspan="1"><p>D1</p></td><td colspan="1" rowspan="1"><p>Computing</p></td><td colspan="1" rowspan="1"><p>Dr Karl</p></td><td colspan="1" rowspan="1"><p>C1</p></td><td colspan="1" rowspan="1"><p>Database</p></td></tr><tr><td colspan="1" rowspan="1"><p>D1</p></td><td colspan="1" rowspan="1"><p>Computing</p></td><td colspan="1" rowspan="1"><p>Dr Karl</p></td><td colspan="1" rowspan="1"><p>C2</p></td><td colspan="1" rowspan="1"><p>Python</p></td></tr><tr><td colspan="1" rowspan="1"><p>D1</p></td><td colspan="1" rowspan="1"><p>Computing</p></td><td colspan="1" rowspan="1"><p>Dr Karl</p></td><td colspan="1" rowspan="1"><p>C3</p></td><td colspan="1" rowspan="1"><p>Web</p></td></tr><tr><td colspan="1" rowspan="1"><p>D1</p></td><td colspan="1" rowspan="1"><p>Computing</p></td><td colspan="1" rowspan="1"><p>Dr Karl</p></td><td colspan="1" rowspan="1"><p>C4</p></td><td colspan="1" rowspan="1"><p>Java</p></td></tr><tr><td colspan="1" rowspan="1"><p>D2</p></td><td colspan="1" rowspan="1"><p>Math</p></td><td colspan="1" rowspan="1"><p>Dr Mosa</p></td><td colspan="1" rowspan="1"><p>C5</p></td><td colspan="1" rowspan="1"><p>Math</p></td></tr></tbody></table>
    
    * True
        
    * <mark>False</mark>
        
19. **Which of the following represents the correct diagram that links the course table with the department table?**
    
    ![Entity relationship diagrams connected by primary and foreign keys](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/78a3dfa3-4bd8-4f27-99da-e8f93e00d4b7image1.png?expiry=1731283200000&hmac=xIe8rEkC_6LUUCFZxSz5Jvsttd1NS5We40H-WotSKyE align="left")
    
    * Diagram 1
        
    * <mark>Diagram 2</mark>
        
20. **Identify the relationship between the tables in the diagram.**
    
    ![Course and Department table with relational mark](https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/ZyjEXmb5TESoxF5m-axE4Q_00410678a91e4df38f4175346cffd3e1_graded-assessment-question-20-image.png?expiry=1731283200000&hmac=0cZ3FMhnhMrMO1oKIj5sqVzdNuomAjprOjf4dPGbTHU align="left")
    
    * One to one relationship.
        
    * <mark>Many to one relationship.</mark>
        
    * Many to many relationship.
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1731153877249/240eda72-b9f7-4e0d-a77e-c93703fea329.png align="center")