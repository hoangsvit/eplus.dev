---
title: "Graded Assignment: Understand by Doing: MapReduce - Big Data"
seoTitle: "Graded Assignment: Understand by Doing: MapReduce"
seoDescription: "MapReduce is the core programming model for the Hadoop Ecosystem. We’ve found it’s really helpful to walk through the steps of MapReduce for yourself in ord"
datePublished: Fri Dec 13 2024 07:29:34 GMT+0000 (Coordinated Universal Time)
cuid: cm4mfgu0v000q09mdfn01atb7
slug: graded-assignment-understand-by-doing-mapreduce-big-data
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1734074948891/6f38098a-3811-47da-981c-ffb72941f033.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1734074959726/e9153a2a-48ff-4c08-a09d-7a620600b03a.png
tags: big-data, graded-assignment-understand-by-doing-mapreduce

---

## Instructions

MapReduce is the core programming model for the Hadoop Ecosystem. We’ve found it’s really helpful to walk through the steps of MapReduce for yourself in order to internalize how it really works. In video lecture, we walked through the steps of MapReduce to count words -- our keys were words. In this exercise, we’ll have you count shapes -- the keys will be shapes.

Note: This assignment can be done in PPT and printed to PDF or on paper and submitted as a picture. Template in PPT, template in JPG.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1734074476207/8e215faf-bacf-444f-815c-4aa8bf6f51ab.jpeg align="center")

**Download:** [<mark>PeerReviewforUpload.pptx</mark>](https://github.com/ePlus-DEV/storage/blob/main/big-data/graded-assignment-understand-by-doing-map-reduce/PeerReviewforUpload.pptx)

Your job is to perform the steps of MapReduce to calculate a count of the number of squares, stars, circles, hearts and triangles in the dataset shown in the picture above. You should follow the steps of MapReduce as they were explained in [this video](https://www.coursera.org/learn/big-data-introduction/lecture/pL4NH/mapreduce-simple-programming-for-big-results).

**Step 0:** Store the dataset across 4 partitions in HDFS. **Note: we have already done one partition for you. Hint: Balance the load, but there is more than on possible “correct” partitioning.**

**Step 1:** Map the data. **Hint: Mapping involves clustering like keys together. Show this in the visual placement of keys within a partition.**

**Step 2:** Sort and Shuffle. **Note: as mentioned in lecture, you don’t have to use the same number of nodes in this step as you did before. Let’s use three instead. Hint: Balance the load.**

**Step 3:** Reduce to calculate the final counts. **Hint: Fill in the blank lines to finalize the key-value pairs**

**Modification: Simplify drawing the key-value pair**

The “Map” stage of MapReduce generates key-value pairs. For example, in the video we saw:

```apache
my, my ->  (my, 1), (my,1)
```

Showing that two instances of the word “my” would get mapped to two key-value pairs. You might have noticed that until the Reduce step, the value in all key-value pairs is 1. To make this activity less cluttered visually, we will have you leave out the “,1” part of each key-value pair, and just represent a key-value pair with the appropriate image.

---

## **Solution of course**

Download file: [<mark>Map Reduce.pdf</mark>](https://github.com/ePlus-DEV/storage/blob/main/big-data/graded-assignment-understand-by-doing-map-reduce/map%20reduce.pdf)