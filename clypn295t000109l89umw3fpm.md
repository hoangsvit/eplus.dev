---
title: "Knowledge check: Introduction to Functional Programming in Javascript"
seoTitle: "Knowledge check: Introduction to Functional Programming in Javascript"
seoDescription: "Knowledge check: Introduction to Functional Programming in Javascript"
datePublished: Wed Jul 17 2024 09:27:16 GMT+0000 (Coordinated Universal Time)
cuid: clypn295t000109l89umw3fpm
slug: knowledge-check-introduction-to-functional-programming-in-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721208389049/3c7b0025-e75a-4b8a-be08-ca4eb42e7e9f.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721208416053/f1abd2a7-d502-4529-9231-8fb86210ace5.png
tags: javascript

---

1. **What will print out when the following code runs?**
    
    ```javascript
    var globalVar = 77;
    
    function scopeTest() {
        var localVar = 88;
    }
    
    console.log(localVar);
    ```
    
    * 77
        
    * 88
        
    * null
        
    * <mark>ReferenceError: localVar is not defined</mark>
        
2. **Variables declared using const can be reassigned.**
    
    * true
        
    * <mark>false</mark>
        
3. **When a function calls itself, this is known as \_\_\_\_\_\_\_\_\_\_\_\_\_.**
    
    * <mark>Recursion</mark>
        
    * Looping
        
    * Higher-order Function
        
4. **What will print out when the following code runs?**
    
    ```javascript
    function meal(animal) {
      animal.food = animal.food + 10;
    }
    
    var dog = {
      food: 10
    };
    meal(dog);
    meal(dog);
    
    console.log(dog.food);
    ```
    
    * 10
        
    * 20
        
    * <mark>30</mark>
        
    * 40
        
5. **What value will print out when the following code runs?**
    
    ```javascript
    function two() {
      return 2;
    }
    
    function one() {
      return 1;
    }
    
    function calculate(initialValue, incrementValue) {
      return initialValue() + incrementValue() + incrementValue();
    }
    
    console.log(calculate(two, one));
    ```
    
    * 1
        
    * 2
        
    * 3
        
    * <mark>4</mark>