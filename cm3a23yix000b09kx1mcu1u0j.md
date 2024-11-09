---
title: "Module quiz: SQL operators and sorting and filtering data"
seoTitle: "Module quiz: SQL operators and sorting and filtering data"
seoDescription: "Module quiz: SQL operators and sorting and filtering data"
datePublished: Sat Nov 09 2024 11:02:42 GMT+0000 (Coordinated Universal Time)
cuid: cm3a23yix000b09kx1mcu1u0j
slug: module-quiz-sql-operators-and-sorting-and-filtering-data
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731150093903/a6488f80-9977-4cb1-93a0-c15684357e62.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1731150138182/5e466794-8f80-49ff-a240-4e1ce95a403b.png
tags: module-quiz-sql-operators-and-sorting-and-filtering-data

---

1. **Which of the following SQL statements adds a $2.00 service fee to the total price in a table called "Orders", that lists the price of orders customers placed with a store?**
    
    * SELECT total + 2 FROM the Orders TABLE;
        
    * <mark>SELECT total + 2 FROM Orders;</mark>
        
    * SELECT total + 2 FROM Orders TABLE;
        
2. **What does the following SQL statement do?**
    
    `SELECT total / 2 FROM Orders;`
    
    * It returns the value of total price column in the second row.
        
    * <mark>It returns the result of total price divided by 2 for each cell in the total price column</mark>
        
3. **The following SQL statement returns 2 percent of the total price:**
    
    `SELECT total % 2 FROM Orders;`
    
    * <mark>False</mark>
        
    * True
        
4. **Which of the following SQL statements returns 50% of the total price?** Choose all correct answers.
    
    * <mark>SELECT total * 0.5 FROM Orders;</mark>
        
    * SELECT total \* 50 FROM Orders;
        
    * <mark>SELECT total / 2 FROM Orders;</mark>
        
    * SELECT total / 50% FROM Orders;
        
5. **Select the right SQL statement to display the values of the total prices that are greater than $140.**
    
    * SELECT total FROM Orders WHERE total &lt; 140;
        
    * SELECT total FROM Orders WHERE total &gt;= 140;
        
    * <mark>SELECT total FROM Orders WHERE total &gt; 140;</mark>
        
6. **Does the following SQL statements sort the result-set of the total prices in ascending or descending order?**
    
    `SELECT * FROM Orders ORDER BY total;`
    
    * <mark>Ascending</mark>
        
    * Descending
        
7. **The following SQL statement filters data based on \_\_\_\_**
    
    `SELECT * FROM customers WHERE Country = "Germany";`
    
    * 'Germany' column with 'country' value
        
    * <mark>'Country' column with 'Germany' value</mark>
        
8. **In SQL you can sort records in descending order using the DESCENDING keyword.**
    
    * <mark>False</mark>
        
    * True
        
9. **The output of the following SQL query within the Orders table is: UK, UK, UK, France, France, Finland**
    
    `SELECT DISTINCT Country FROM Orders;`
    
    * <mark>True</mark>
        
    * False
        
10. **What does the following SQL statement do?**
    
    `SELECT * FROM Orders ORDER BY country, total;`
    
    * Orders the result by country and ignores the total price.
        
    * <mark>Orders the result by country first then total price.</mark>
        

---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1731150123726/600faef6-bd2e-4094-bd0d-b8122ed100aa.png align="center")