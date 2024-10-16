---
title: "Final graded quiz: Programming with JavaScript"
seoTitle: "Final graded quiz: Programming with JavaScript"
seoDescription: "Final graded quiz: Programming with JavaScript"
datePublished: Sat Jul 20 2024 13:58:37 GMT+0000 (Coordinated Universal Time)
cuid: clyu72s9c000709jmci1r8amq
slug: final-graded-quiz-programming-with-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721483885163/2ca349f3-db00-48f1-a231-c09fe4fc2a6c.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721483900664/baefd656-9991-4b56-bf2c-2ca0965a79ea.png

---

1. **What will be the output of the following JavaScript?**
    
    ```javascript
    const a = true;
    if(!a) {
        console.log("Green");
    } else {
        console.log("Blue");
    }
    ```
    
    * Green
        
    * <mark>Blue</mark>
        
    * Nothing
        
2. **What will be the output of the following JavaScript?**
    
    ```javascript
    var x = true;
    x = 23;
    console.log(x);
    ```
    
    * true
        
    * <mark>23</mark>
        
3. **What is the data type of the *x* variable in the following code?**
    
    ```javascript
    var x = 23.2;
    ```
    
    * <mark>Number</mark>
        
    * BigInt
        
    * String
        
    * Boolean
        
4. **What will the following JavaScript code output?**
    
    ```javascript
    var x = 20;
    
    if(x < 5) {
        console.log("Apple");
    } else if(x > 10 && x < 20) {
        console.log("Pear");
    } else {
        console.log("Orange");
    }
    ```
    
    * Apple
        
    * Pear
        
    * <mark>Orange</mark>
        
5. **What will the following JavaScript code output?**
    
    ```javascript
    var result = 0;
    
    var i = 0;
    var limit = 3;
    while(i < limit) {
        result += 2;
        i++;
    }
    
    console.log(result);
    ```
    
    * 0
        
    * 2
        
    * 3
        
    * <mark>6</mark>
        
6. **What will the following JavaScript code output?**
    
    ```javascript
    var result;
    console.log(result);
    result = 7;
    ```
    
    * null
        
    * <mark>undefined</mark>
        
    * 7
        
7. **What's missing from this JavaScript function declaration?**
    
    ```javascript
    function(a,b) {
        return a + b
    }
    ```
    
    * <mark>The function name.</mark>
        
    * The assignment operator.
        
    * The dot notation.
        
8. **What is the output of the code below?**
    
    ```javascript
    var cat = {}
    cat["sound"] = "meow"
    var catSound = "purr"
    console.log(cat.sound)
    ```
    
    * <mark>meow</mark>
        
    * purr
        
    * {}
        
    * catSound
        
9. **What is the output of the code below?**
    
    ```javascript
    var veggies = []
    veggies.push('parsley')
    veggies.push('carrot')
    console.log(veggies[2])
    ```
    
    * <mark>undefined</mark>
        
    * 2
        
    * 1
        
    * 3
        
10. **Which of the following HTML attributes is used to handle a click event?**
    
    * <mark>onclick</mark>
        
    * addEventListener('click')
        
    * 'click'
        
11. **How do you create a new h2 element using JavaScript?**
    
    * <mark>With document.createElement('h2')</mark>
        
    * With document.buildElement('h2')
        
    * With document.addElement('h2')
        
12. **Is the code below missing a .js after the ./addFive ?**
    
    ```javascript
    const addFive = require('./addFive')
    ```
    
    * true
        
    * <mark>false</mark>