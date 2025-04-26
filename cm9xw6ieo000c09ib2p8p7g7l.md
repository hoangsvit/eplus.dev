---
title: "Process Data from Dirty to Clean - Module 4 challenge"
seoTitle: "Process Data from Dirty to Clean - Module 4 challenge"
seoDescription: "Process Data from Dirty to Clean - Module 4 challenge"
datePublished: Sat Apr 26 2025 07:21:26 GMT+0000 (Coordinated Universal Time)
cuid: cm9xw6ieo000c09ib2p8p7g7l
slug: process-data-from-dirty-to-clean-module-4-challenge
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745652059693/b7c7fe48-b416-48d3-9d71-45b9aa879342.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1745652076351/329aebe9-023a-44fe-8a19-c3be85631699.png
tags: process-data-from-dirty-to-clean, process-data-from-dirty-to-clean-module-4-challenge, module-4-challenge

---

1. **Fill in the blank: A data scientist keeps code for data analysis pipelines in a \_\_\_\_\_, which enables them to track the evolution of the pipelines over time.**
    
    * changelog
        
    * dashboard
        
    * dataset
        
    * <mark>version control system</mark>
        
2. **You are a data analyst working for an e-commerce company. You have just finished cleaning data from a customer survey whose original objective was to gather feedback on specific usability issues within the mobile app checkout process. While reviewing the cleaned data and preparing for verification, you notice that a large number of respondents complain about slow website loading times on desktop computers, which was not related to the mobile app checkout.**
    
    **Based on the principles of data verification and taking the "big picture view," what is the most critical *first step* you should take in this situation?**
    
    * Remove from the dataset all survey responses that mention desktop loading times.
        
    * Immediately begin a separate analysis of the website loading time comments, as this appears to be a significant customer pain point.
        
    * Ask a teammate to double-check your cleaning process to ensure no data related to desktop loading times was accidentally duplicated or introduced.
        
    * <mark>Pause and reassess whether focusing on the desktop loading time comments aligns with the original project goal centered on the mobile app checkout usability.</mark>
        
3. **Which SQL clause will consider a condition and return a value when that condition is met?**
    
    * <mark>CASE column_name = 'condition' THEN 'value' END</mark>
        
    * WHEN column\_name = 'condition' CASE 'value' END
        
    * WHEN
        
    * CASE
        
4. **What is the process of tracking changes, additions, deletions, and errors during data cleaning?**
    
    * <mark>Documentation</mark>
        
    * Observation
        
    * Cataloging
        
    * Recording
        
5. **During verification, you notice an error in a dataset. You remember fixing a similar error when previously cleaning the data. What tool can you reference to find documentation about how to fix the error?**
    
    * Notepad
        
    * <mark>Changelog</mark>
        
    * Data table
        
    * Text editor
        
6. **A junior data analyst notices an error in a product ID number in their dataset. Using a pivot table in Google Sheets, what function will let them know how many times this error occurs within the dataset?**
    
    * CONCAT
        
    * CHECK
        
    * <mark>COUNTA</mark>
        
    * CASE
        
7. **You are a data analyst responsible for cleaning sales data entered manually by the sales team into a shared spreadsheet. Month after month, you notice and document in your cleaning report that a significant number of entries for** `Product_ID` **contain typos (e.g., transposing digits, using** `O` **instead of** `0`**, etc.). These errors require considerable time to identify and correct during the cleaning process before the data can be used for reporting.**
    
    **During the feedback phase of the data cleaning process, what would be the most effective recommendation to propose to stakeholders or the process owner?**
    
    * <mark>To implement a change in the data entry process, such as using a dropdown menu for </mark> `Product_ID` <mark> in the spreadsheet or adding a validation rule, to prevent these typos at the source.</mark>
        
    * To allocate more time for data cleaning each month specifically to handle the `Product_ID` typos.
        
    * To build an automated script that runs after data entry each month to specifically find and fix the common `Product_ID` typos before analysis begins.
        
    * To create a comprehensive guide documenting all known **Product\_ID** typos and distribute it to the sales team, asking them to be more careful.
        
8. **Fill in the blank: To update a client's last name in their spreadsheet, a data professional uses \_\_\_\_\_ to search for any instance of “Reynolds” and change it to “Mehta.”**
    
    * formatting
        
    * TRIM
        
    * <mark>find and replace</mark>
        
    * Remove duplicates