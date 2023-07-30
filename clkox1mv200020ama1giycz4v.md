---
title: "Schedule tasks with WorkManager"
seoTitle: "Schedule tasks with WorkManager"
seoDescription: "Schedule tasks with WorkManager"
datePublished: Sun Jul 30 2023 04:03:04 GMT+0000 (Coordinated Universal Time)
cuid: clkox1mv200020ama1giycz4v
slug: schedule-tasks-with-workmanager
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1690690578901/c3a2bb5d-0083-4e42-996b-be36f60078da.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1690689756854/03518ee8-16eb-4d78-be8b-7e2e16b167e5.png
tags: workmanager

---

1. **Which tool helps you visualize, monitor, and debug your app's workers?**  
    \[ \] Profiler  
    \[x\] Background Task Inspector  
    \[ \] LogcatDevice  
    \[ \] Manager
    
2. **Which of the following options are valid terminal work states?**
    
    *Choose as many answers as you see fit.*
    
    \[x\] CANCELLED
    
    \[ \] DELETED
    
    \[x\] FAILED
    
    \[x\] SUCCEEDED
    
3. **Which of the following options are valid types of work requests?**
    
    *Choose as many answers as you see fit.*
    
    \[x\] `OneTimeWorkRequest`  
    \[ \] `SingleWorkRequest`
    
    \[ \] `RepeatingWorkRequest`
    
    \[x\] `PeriodicWorkRequest`
    
4. **Creating and enqueueing multiple dependent tasks and the order they should run in is called linking.**  
    \[ \] True  
    \[x\] False
    
5. **Work constraints are useful in which of the following situations?**  
    \[ \] Checking that a valid form of payment is saved on the user’s device before the work runs.  
    \[ \] Checking what time it is before the work runs.  
    \[x\] Checking that the device is connected to a wifi network before downloading a large amount of app dat\[ \]  
    \[ \] Checking that the app was opened a set number of times before the work runs.
    
6. **Which of the following options is a way to pass input data to a worker?**  
    \[ \] Pass the data in as an argument when calling the `doWork()` function.  
    \[x\] Use a Data object to pass key/value pairs.  
    \[ \] Pass data as a String, but it must be less than 140 characters.  
    \[ \] Assign it to the `worker.inputData` variable.
    
7. **After work is enqueued, you can check its status by \_\_\_.**
    
    *Choose as many answers as you see fit.*
    
    \[x\] Name
    
    \[x\] Id
    
    \[x\] Tag
    
    \[ \] Work type
    
8. **The Background Task Inspector lets you stop workers during their execution.**  
    \[ \] True  
    \[x\] False
    
9. **Which worker builder is recommended to test** `CoroutineWorker`**s?**  
    \[ \] `OneTimeWorkRequestBuilder`  
    \[ \] `PeriodicWorkRequestBuilder`  
    \[ \] `TestWorkerBuilder`  
    \[x\] `TestListenableWorkerBuilder`
    
10. **When testing worker implementations, you can call workers directly with** `doWork()` **instead of enqueuing the worker.**  
    \[x\] True  
    \[ \] False
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1690690839769/dc9a1de3-dba2-4ff5-8cbb-a0c1439e6faf.png align="center")