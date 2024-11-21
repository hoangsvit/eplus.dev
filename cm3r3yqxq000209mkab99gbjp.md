---
title: "[SQL] 620. Not Boring Movies"
seoTitle: "[SQL] 620. Not Boring Movies"
seoDescription: "[SQL] 620. Not Boring Movies"
datePublished: Thu Nov 21 2024 09:26:43 GMT+0000 (Coordinated Universal Time)
cuid: cm3r3yqxq000209mkab99gbjp
slug: sql-620-not-boring-movies
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732181088453/f6dd423e-a227-4e70-9c36-82ac296c45a7.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1732181190962/622fa0f1-a470-4d20-a3ec-abb328dcda98.png
tags: sql, 620-not-boring-movies

---

Table: `Cinema`

```javascript
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| id             | int      |
| movie          | varchar  |
| description    | varchar  |
| rating         | float    |
+----------------+----------+
id is the primary key (column with unique values) for this table.
Each row contains information about the name of a movie, its genre, and its rating.
rating is a 2 decimal places float in the range [0, 10]
```

Write a solution to report the movies with an odd-numbered ID and a description that is not `"boring"`.

Return the result table ordered by `rating` **in descending order**.

The result format is in the following example.

**Example 1:**

```javascript
Input: 
Cinema table:
+----+------------+-------------+--------+
| id | movie      | description | rating |
+----+------------+-------------+--------+
| 1  | War        | great 3D    | 8.9    |
| 2  | Science    | fiction     | 8.5    |
| 3  | irish      | boring      | 6.2    |
| 4  | Ice song   | Fantacy     | 8.6    |
| 5  | House card | Interesting | 9.1    |
+----+------------+-------------+--------+
Output: 
+----+------------+-------------+--------+
| id | movie      | description | rating |
+----+------------+-------------+--------+
| 5  | House card | Interesting | 9.1    |
| 1  | War        | great 3D    | 8.9    |
+----+------------+-------------+--------+
Explanation: 
We have three movies with odd-numbered IDs: 1, 3, and 5. The movie with ID = 3 is boring so we do not include it in the answer.
```

---

```sql
SELECT `id`,
       `movie`,
       `description`,
       `rating`
FROM Cinema
WHERE MOD(id, 2) <> 0
  AND description NOT LIKE '%boring%'
ORDER BY rating DESC
```