---
title: "Analyze Data to Answer Questions - Module 4 challenge"
seoTitle: "Analyze Data to Answer Questions - Module 4 challenge"
seoDescription: "Analyze Data to Answer Questions - Module 4 challenge"
datePublished: Sat Apr 26 2025 08:20:36 GMT+0000 (Coordinated Universal Time)
cuid: cm9xyalob000008ju2a853sid
slug: analyze-data-to-answer-questions-module-4-challenge
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745655608619/50b2ccda-faf4-4632-a08e-d73c09216c8f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745655624238/bbe30a58-8108-47d8-adf6-4788d14fcd4b.png
tags: module-4-challenge, analyze-data-to-answer-questions, analyze-data-to-answer-questions-module-4-challenge

---

1. **A data analyst at an ocean conservancy manually recalculates the new column ocean\_currents. They want to identify any rows with values that do not match those in the original column, ocean\_tides. Which SQL clauses would enable them to do so? Select all that apply.**
    
    * WHERE ocean\_currents &gt;&lt; ocean\_tides
        
    * <mark>WHERE ocean_currents != ocean_tides</mark>
        
    * <mark>WHERE ocean_currents &lt;&gt; ocean_tides</mark>
        
    * WHERE ocean\_currents !! ocean\_tides
        
2. **Fill in the blank: The SQL command GROUP BY groups table rows with \_\_\_\_\_ values into summary rows.**
    
    * <mark>the same</mark>
        
    * decreasing
        
    * null
        
    * increasing
        
3. **What will this spreadsheet function return?**
    
    ```apache
    =SUMIF(K20:K70, ”>=50”, L20:L70)
    ```
    
    * <mark>The sum of all values in cells L20 to L70 that correspond to values in cells K20 to K70 that are greater than or equal to 50.</mark>
        
    * The sum of all values in cells K20 to K70 for which the value in cells L20 to L70 is greater than or equal to 50.
        
    * The count of the number of cells in the array K20:K70 that have a value greater than or equal to 50.
        
    * The sum of any values in cells K20 to K70 and cells L20 to L70 that are greater than or equal to 50.
        
4. **Which of the following statements accurately describe pivot tables? Select all that apply.**
    
    * <mark>A pivot table can be used to sort, reorganize, or group data.</mark>
        
    * The columns of a pivot table organize and display values vertically.
        
    * <mark>The rows of a pivot table organize and display values vertically.</mark>
        
    * <mark>The filters section of a pivot table is used to apply filters based on specific criteria.</mark>
        
5. **A data analyst at an engineering company calculates the number of spreadsheet rows that contain the value turbine. Which function do they use?**
    
    * <mark>=COUNTIF(C1:C100,“turbine”)</mark>
        
    * \=COUNTIF(C1:C100,turbine)
        
    * \=COUNTIF(turbine=C1:C100)
        
    * \=COUNTIF(C1:C100,“=turbine”)
        
6. **What is a primary reason data analysts use temporary tables or similar structures (like WITH clauses) when working with SQL?**
    
    * To establish universal naming conventions for tables that all database systems recognize automatically.
        
    * To permanently alter the data types of columns in the original source tables.
        
    * <mark>To store intermediate results or frequently used subsets of data, making complex queries more manageable and potentially more efficient.</mark>
        
    * To automatically ensure that the underlying source data is refreshed in real-time whenever the temporary table is queried.
        
7. **Which SQL statement will create a temporary table?**
    
    * SELECT new\_table FROM old\_table;
        
    * CREATE TABLE new\_table AS ( FROM old\_table );
        
    * <mark>WITH&nbsp;new_table&nbsp;AS&nbsp;( SELECT&nbsp;*&nbsp;FROM&nbsp;old_table&nbsp;WHERE&nbsp;z&nbsp;=&nbsp;5 );</mark>
        
    * WITH new\_table = ( SELECT \* FROM old\_table );
        
8. **Which column is set as a value in this pivot table?**
    
    <table><tbody><tr><td colspan="1" rowspan="1"><p>MAX of Time Period</p></td><td colspan="1" rowspan="1"><p>Type</p></td><td colspan="1" rowspan="1"><p></p></td></tr><tr><td colspan="1" rowspan="1"><p>Month</p></td><td colspan="1" rowspan="1"><p>East</p></td><td colspan="1" rowspan="1"><p>West</p></td></tr><tr><td colspan="1" rowspan="1"><p>Jan.</p></td><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p>25</p></td></tr><tr><td colspan="1" rowspan="1"><p>Jan.</p></td><td colspan="1" rowspan="1"><p>67</p></td><td colspan="1" rowspan="1"><p>11</p></td></tr><tr><td colspan="1" rowspan="1"><p>Feb.</p></td><td colspan="1" rowspan="1"><p>26</p></td><td colspan="1" rowspan="1"><p>45</p></td></tr><tr><td colspan="1" rowspan="1"><p>Mar.</p></td><td colspan="1" rowspan="1"><p>98</p></td><td colspan="1" rowspan="1"><p></p></td></tr></tbody></table>
    
    * <mark>Time Period</mark>
        
    * Type
        
    * MAX
        
    * Month