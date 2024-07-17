---
title: "Knowledge check: Error handling in Javascript"
seoTitle: "Knowledge check: Error handling in Javascript"
seoDescription: "Knowledge check: Error handling in Javascript"
datePublished: Wed Jul 17 2024 08:38:38 GMT+0000 (Coordinated Universal Time)
cuid: clyplbph3000009joe6f1buy9
slug: knowledge-check-error-handling-in-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721204940955/684c266b-1c55-41cd-843c-7446cb19d74e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721205492530/68f90057-48da-4edb-b986-3fa82d6a043d.png
tags: javascript

---

1. **What will be printed when the following code runs?**
    
    ```javascript
    var result = null;
    console.log(result);
    ```
    
    * undefined
        
    * <mark>null</mark>
        
    * 0
        
2. **When the following code runs, what will print out?**
    
    ```javascript
    try {
      console.log('Hello');
    } catch(err) {
      console.log('Goodbye');
    }
    ```
    
    * <mark>Hello</mark>
        
    * Goodbye
        
3. **If you pass an unsupported data type to a function, what error will be thrown?**
    
    * RangeError
        
    * SyntaxErrror
        
    * <mark>TypeError</mark>
        
4. **What will print out when the following code runs?**
    
    ```javascript
    var x;
    
    if(x === null) {
      console.log("null");
    } else if(x === undefined) {
      console.log("undefined");
    } else {
      console.log("ok");
    }
    ```
    
    * null
        
    * <mark>undefined</mark>
        
    * ok
        
5. **What will print out when the following code runs?**
    
    ```javascript
    throw new Error();
    console.log("Hello");
    ```
    
    * Hello
        
    * <mark>Nothing will print out.</mark>