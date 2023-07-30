---
title: "Schedule tasks with WorkManager"
seoTitle: "Schedule tasks with WorkManager"
seoDescription: "Schedule tasks with WorkManager"
datePublished: Sun Jul 30 2023 04:03:04 GMT+0000 (Coordinated Universal Time)
cuid: clkox1mv200020ama1giycz4v
slug: schedule-tasks-with-workmanager
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1690689756854/03518ee8-16eb-4d78-be8b-7e2e16b167e5.png
tags: workmanager

---

1. **Which tool helps you visualize, monitor, and debug your app's workers?**  
    [ ] ProfilerBackground  
    [ ] Task  
    [ ] InspectorLogcatDevice  
    [ ] Manager
    
2. **Which of the following options are valid terminal work states?**
    
    *Choose as many answers as you see fit.*
    
    a. CANCELLED
    
    b. DELETED
    
    c. FAILED
    
    d. SUCCEEDED
    
3. **Which of the following options are valid types of work requests?**
    
    *Choose as many answers as you see fit.*
    
    a. `OneTimeWorkRequest`
    
    b. `SingleWorkRequest`
    
    c. `RepeatingWorkRequest`
    
    d. `PeriodicWorkRequest`
    
4. **Creating and enqueueing multiple dependent tasks and the order they should run in is called linking.**  
    True / False
    
5. **Work constraints are useful in which of the following situations?**  
    a. Checking that a valid form of payment is saved on the user’s device before the work runs.  
    b. Checking what time it is before the work runs.  
    c. Checking that the device is connected to a wifi network before downloading a large amount of app data.  
    d. Checking that the app was opened a set number of times before the work runs.
    
6. **Which of the following options is a way to pass input data to a worker?**  
    a. Pass the data in as an argument when calling the `doWork()` function.  
    b. Use a Data object to pass key/value pairs.  
    c. Pass data as a String, but it must be less than 140 characters.  
    d. Assign it to the `worker.inputData` variable.
    
7. **After work is enqueued, you can check its status by \_\_\_.**
    
    Choose as many answers as you see fit.
    
    Name
    
    Id
    
    Tag
    
    Work type
    
8. **The Background Task Inspector lets you stop workers during their execution.**TrueFalse
    
9. **Which worker builder is recommended to test** `CoroutineWorker`s?`OneTimeWorkRequestBuilderPeriodicWorkRequestBuilderTestWorkerBuilderTestListenableWorkerBuilder`
    
10. **When testing worker implementations, you can call workers directly with** `doWork()` instead of enqueuing the worker.TrueFalse