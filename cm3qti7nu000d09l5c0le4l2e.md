---
title: "[SQL] 197. Rising Temperature"
seoTitle: "[SQL] 197. Rising Temperature"
seoDescription: "[SQL] 197. Rising Temperature"
datePublished: Thu Nov 21 2024 04:33:56 GMT+0000 (Coordinated Universal Time)
cuid: cm3qti7nu000d09l5c0le4l2e
slug: sql-197-rising-temperature
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732163502846/7cfc0bed-83b3-4fbb-8075-605df3d8edef.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1732163594373/2f93756e-fd9a-4183-86f4-b225a161d4e6.png
tags: 197-rising-temperature

---

Table: `Weather`

```javascript
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| recordDate    | date    |
| temperature   | int     |
+---------------+---------+
id is the column with unique values for this table.
There are no different rows with the same recordDate.
This table contains information about the temperature on a certain day.
```

Write a solution to find all dates' `id` with higher temperatures compared to its previous dates (yesterday).

Return the result table in **any order**.

The result format is in the following example.

**Example 1:**

```javascript
Input: 
Weather table:
+----+------------+-------------+
| id | recordDate | temperature |
+----+------------+-------------+
| 1  | 2015-01-01 | 10          |
| 2  | 2015-01-02 | 25          |
| 3  | 2015-01-03 | 20          |
| 4  | 2015-01-04 | 30          |
+----+------------+-------------+
Output: 
+----+
| id |
+----+
| 2  |
| 4  |
+----+
Explanation: 
In 2015-01-02, the temperature was higher than the previous day (10 -> 25).
In 2015-01-04, the temperature was higher than the previous day (20 -> 30).
```

---

To solve this problem, we need to compare the temperature of each day with the temperature of its previous day. Here's how to approach it:

### Steps:

1. **Self-Join the Table**:
    
    * Join the `Weather` table with itself (`w1` and `w2`), where the `recordDate` of `w2` is exactly one day before the `recordDate` of `w1`.
        
2. **Compare Temperatures**:
    
    * Filter for rows where the temperature on `w1.recordDate` is greater than the temperature on `w2.recordDate`.
        
3. **Select Relevant Columns**:
    
    * Retrieve the `id` of the days that meet the criteria.
        

### SQL Query:

```sql
SELECT 
    w1.id
FROM 
    Weather w1
JOIN 
    Weather w2
ON 
    DATE(w1.recordDate) = DATE(w2.recordDate) + INTERVAL 1 DAY
WHERE 
    w1.temperature > w2.temperature;
```

### Explanation:

1. **Self-Join**:
    
    * `w1` and `w2` are aliases for the `Weather` table.
        
    * The `ON` clause ensures that `w2.recordDate` is one day before `w1.recordDate`.
        
2. **Filter with** `WHERE`:
    
    * Only include rows where the temperature of `w1` is higher than the temperature of `w2`.
        
3. **Select** [`w1.id`](http://w1.id):
    
    * Retrieve the `id` of the records that satisfy the condition.
        

### Output:

For the given input example:

| id | recordDate | temperature |
| --- | --- | --- |
| 1 | 2015-01-01 | 10 |
| 2 | 2015-01-02 | 25 |
| 3 | 2015-01-03 | 20 |
| 4 | 2015-01-04 | 30 |

The result will be:

| id |
| --- |
| 2 |
| 4 |

### Key Points:

* The `+ INTERVAL 1 DAY` operation ensures the correct date comparison.
    
* This query works efficiently as there are no duplicate dates in the `Weather` table.