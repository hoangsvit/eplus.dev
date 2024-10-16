---
title: "Module quiz: The Building Blocks of a Program in Javascript"
seoTitle: "Module quiz: The Building Blocks of a Program in Javascript"
seoDescription: "Module quiz: The Building Blocks of a Program in Javascript"
datePublished: Wed Jul 17 2024 09:01:10 GMT+0000 (Coordinated Universal Time)
cuid: clypm4ovb001g09l6fj6xer9r
slug: module-quiz-the-building-blocks-of-a-program-in-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721205578173/c296498d-5cea-41d1-ad99-8d10b67b0c99.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721206855367/4d4f214f-7c60-484c-8c4c-a8a49be29b2e.png

---

1. **What data type is the variable x ?**
    
    ```javascript
    var x = {};
    ```
    
    * Function
        
    * Array
        
    * <mark>Object</mark>
        
2. **What will be the output of running the following code?**
    
    ```javascript
    try {
    console.log('hello)
    } catch(e) {
    console.log('caught')
    }
    ```
    
    * <mark>Uncaught SyntaxError: Invalid or unexpected token.</mark>
        
    * Caught
        
3. **What value is printed when the following code runs?**
    
    ```javascript
    var burger = ["bun", "beef", "lettuce", "tomato sauce", "onion", "bun"];
    console.log(burger[2]);
    ```
    
    * bun
        
    * beef
        
    * <mark>lettuce</mark>
        
    * tomato sauce
        
    * onion
        
4. **In the following code, how many methods does the bicycle object have?**
    
    ```javascript
    var bicycle = {
          wheels: 2,
          start: function() {
    
          },
          stop: function() {
    
          }
      };
    ```
    
    * 1
        
    * <mark>2</mark>
        
    * 3
        
5. **When the following code runs, what will print out?**
    
    ```javascript
    try {
        throw new Error();
        console.log('Hello');
      } catch(err) {
        console.log('Goodbye');
    }
    ```
    
    * Hello
        
    * <mark>Goodbye</mark>
        
6. **If you mis-type some code in your JavaScript, what kind of error will that result in?**
    
    * RangeError
        
    * <mark>SyntaxErrror</mark>
        
    * TypeError
        
7. **Will the following code execute without an error?**
    
    ```javascript
    function add(a, b) {
      console.log(a + b)
    }
    
    add(3, "4");
    ```
    
    * Yes
        
    * <mark>No</mark>
        
8. **What will be printed when the following code runs?**
    
    ```javascript
    var result;
    console.log(result);
    ```
    
    * <mark>undefined</mark>
        
    * null
        
    * 0
        
9. **What will be the output of the following code?**
    
    ```javascript
    var str = "Hello";
    str.match("jello");
    ```
    
    * <mark>null</mark>
        
    * undefined
        
    * empty string
        
10. **What will be the output of the following code?**
    
    ```javascript
    try {
      Number(5).toPrecision(300)
    } catch(e) {
      console.log("There was an error")
    }
    ```
    
    * RangeError
        
    * 5
        
    * e
        
    * <mark>"There was an error"</mark>