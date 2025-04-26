---
title: "Process Data from Dirty to Clean - Module 3 challenge"
seoTitle: "Process Data from Dirty to Clean - Module 3 challenge"
seoDescription: "Process Data from Dirty to Clean - Module 3 challenge"
datePublished: Sat Apr 26 2025 07:09:08 GMT+0000 (Coordinated Universal Time)
cuid: cm9xvqon7002309jm7hgn9p9y
slug: process-data-from-dirty-to-clean-module-3-challenge
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745651319675/510035e8-564c-4ff3-98aa-2446faaee703.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745651339017/cab80382-b61a-4401-831e-36d48c3ac85e.png
tags: process-data-from-dirty-to-clean, process-data-from-dirty-to-clean-module-3-challenge, module-3-challenge

---

1. **A data professional analyzes medical data for a health insurance company. The dataset they are working with contains millions of rows of data. What tool would be most efficient for the analyst to use?**
    
    * <mark>SQL</mark>
        
    * CSV
        
    * Word processor
        
    * Spreadsheet
        
2. **A junior data professional notices their Boolean column is incorrectly storing True/False values as strings. What SQL function can the analyst use to convert the data type from a string to Boolean?**
    
    * LENGTH
        
    * <mark>CAST</mark>
        
    * SUBSTR
        
    * TRIM
        
3. **Fill in the blank: A data team collaborating with the HR department uses the SQL command \_\_\_\_\_ to add a row for a new employee to their organization’s database.**
    
    * DROP TABLE IF EXISTS
        
    * CREATE TABLE IF NOT EXISTS
        
    * UPDATE
        
    * <mark>INSERT INTO</mark>
        
4. **You are working with a database table that has columns about trees, such as tree\_species. Which** `SUBSTR` **function and** `AS` **command will retrieve the first 3 characters of each species name and store the result in a new column called species\_ID?**
    
    * SUBSTR(tree\_species, 3) AS species\_ID
        
    * SUBSTR AS (tree\_species 1, 3) species\_ID
        
    * <mark>SUBSTR(tree_species, 1, 3) AS species_ID</mark>
        
    * SUBSTR(tree\_species, 1, 3 AS) species\_ID
        
5. **In SQL, what function can be used to remove leading spaces from a piece of data?**
    
    * <mark>TRIM</mark>
        
    * FORMAT
        
    * SUBSTR
        
    * AVG
        
6. **While working with a database table that contains the column employee\_name, you notice that there are some duplicate entries. Which SQL clause would you use in a query to return the employee\_name data without these duplicates?**
    
    * <mark>DISTINCT employee_name</mark>
        
    * DROP employee\_name
        
    * DUPLICATE employee\_name
        
    * DELETE employee\_name
        
7. **Fill in the blank: A data analyst uses the SQL command \_\_\_\_\_ to remove unnecessary tables so they do not clutter their organization’s database.**
    
    * UPDATE
        
    * INSERT INTO
        
    * <mark>DROP TABLE IF EXISTS</mark>
        
    * CREATE TABLE IF NOT EXISTS
        
8. **You are using a database table that includes the column credit\_card\_numbers, and you want to check for any fraudulent activity. Which SQL clause will help you identify any credit card numbers that are more than 16 characters long?**
    
    * COUNT(credit\_card\_numbers) &gt; 16
        
    * <mark>LENGTH(credit_card_numbers) &gt; 16</mark>
        
    * WHERE(credit\_card\_numbers) &lt; 16
        
    * IDENTIFY(credit\_card\_numbers) &lt; 16
        
9. **In a table of customer data, you note that some customers have not placed any orders, so the order\_value column contains null values. What SQL function can you use to replace these null values with a value in a different column?**
    
    * CAST
        
    * <mark>COALESCE</mark>
        
    * TRIM
        
    * CONCAT