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
    
    <details data-node-type="hn-details-summary"><summary>answers</summary><div data-type="detailsContent">The tool that helps you visualize, monitor, and debug your app's workers is <strong>Background Task Inspector</strong>.</div></details>
    
    Profiler and Logcat are tools that help you debug your app's code, but they do not specifically help you with workers. Device Manager is a tool that helps you manage your devices, but it does not specifically help you with workers.
    
    Background Task Inspector is a tool that is specifically designed to help you with workers. It allows you to see a visual representation of your app's workers, and it provides information about the state of each worker. This information can help you to debug problems with your workers, and it can also help you to optimize the performance of your workers.
    
    Here are some of the features of Background Task Inspector:
    
    * You can see a visual representation of your app's workers.
        
    * You can see the state of each worker.
        
    * You can see the logs for each worker.
        
    * You can cancel workers.
        
    * You can reschedule workers.
        
    
    Background Task Inspector is a powerful tool that can help you to visualize, monitor, and debug your app's workers. If you are having problems with your workers, I recommend that you use Background Task Inspector to troubleshoot the issue.
    
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