---
title: "Knowledge check: Introduction to testing in Javascript"
seoTitle: "Knowledge check: Introduction to testing in Javascript"
seoDescription: "Knowledge check: Introduction to testing in Javascript"
datePublished: Sat Jul 20 2024 12:31:22 GMT+0000 (Coordinated Universal Time)
cuid: clyu3ykpg000009l0hkjj3smg
slug: knowledge-check-introduction-to-testing-in-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721478624291/ab73d9ed-4728-4f4a-bfa9-900aa36372bb.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721478662880/4519a226-1c8d-4c00-8fae-e24827d0f753.png

---

1. **What is the correct way to export the timesTwo function as a module so that Jest can use it in testing files?**
    
    * export module(timesTwo)
        
    * module(exported(timesTwo))
        
    * document.module.export = timesTwo
        
    * <mark>module.exports = timesTwo</mark>
        
2. **Testing is a way to verify the expectations you have regarding the behavior of your code.**
    
    * <mark>true</mark>
        
    * false
        
3. **Node.js can be used to build multiple types of applications. Select all that apply.**
    
    * <mark>Command line applications</mark>
        
    * Desktop applications
        
    * <mark>Web application backends</mark>
        
4. **When the following test executes, what will the test result be?**
    
    ```javascript
    function add(a, b) {
        return a + b;
    }
    
    expect(add(10, 5)).toBe(16);
    ```
    
    * Success.
        
    * <mark>Fail.</mark>
        
5. **Which of the following is the slowest and most expensive form of testing?**
    
    * Unit testing
        
    * Integration testing
        
    * <mark>End-to-end testing (e2e)</mark>
        
6. **Mocking allows you to separate the code that you are testing from its related dependencies.**
    
    * <mark>true</mark>
        
    * false