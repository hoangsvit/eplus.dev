---
title: "Module quiz: Programming Paradigms in Javascript"
seoTitle: "Module quiz: Programming Paradigms in Javascript"
seoDescription: "Module quiz: Programming Paradigms in Javascript"
datePublished: Sat Jul 20 2024 04:52:06 GMT+0000 (Coordinated Universal Time)
cuid: clytnjy2j000b08l9c0stc449
slug: module-quiz-programming-paradigms-in-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721451089669/450af7af-31cd-4fb1-8a80-38ea1ebfa095.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721451109509/f732c1e1-aac8-45ab-8376-e45729840b50.png

---

1. **Variables declared using 'let' can be reassigned.**
    
    * <mark>true</mark>
        
    * false
        
2. **What will print out when the following code runs?**
    
    ```javascript
    function scopeTest() {
        var y = 44;
    
        console.log(x);
    }
    
    var x = 33;
    scopeTest();
    ```
    
    * null
        
    * undefined
        
    * <mark>33</mark>
        
    * 44
        
3. **What will print out when the following code runs?**
    
    ```javascript
    class Cake {
        constructor(lyr) {
            this.layers = lyr;
        }
    
        getLayers() {
            return this.layers;
        }
    }
    
    class WeddingCake extends Cake {
        constructor() {
            super(2);
        }
    
        getLayers() {
            return super.getLayers() * 5;
        }
    }
    
    var result = new WeddingCake();
    console.log(result.getLayers());
    ```
    
    * 0
        
    * 2
        
    * 5
        
    * <mark>10</mark>
        
4. **What will print out when the following code runs?**
    
    ```javascript
    class Animal {
    
    }
    
    class Dog extends Animal {
        constructor() {
            super();
            this.noise = "bark";
        }
    
        makeNoise() {
            return this.noise;
        }
    }
    
    class Wolf extends Dog {
        constructor() {
            super();
            this.noise = "growl";
        }
    }
    
    var result = new Wolf();
    console.log(result.makeNoise());
    ```
    
    * bark
        
    * <mark>growl</mark>
        
    * undefined
        
5. **Consider this code snippet: 'const \[a, b\] = \[1,2,3,4\] '. What is the value of b?**
    
    * undefined
        
    * 1
        
    * <mark>2</mark>
        
    * \[1,2,3,4\]
        
6. **What value will be printed out when the following code runs?**
    
    ```javascript
    function count(...food) {
        console.log(food.length)
    }
    
    count("Burgers", "Fries", null);
    ```
    
    * 2
        
    * <mark>3</mark>
        
    * "Burgers", "Fries", null
        
    * "Burgers", "Fries", undefined
        
7. **Which of the following are JavaScript methods for querying the Document Object Model? Select all that apply.**
    
    * <mark>getElementsByClassName</mark>
        
    * getElementsById
        
    * getElementById
        
    * getElementByClassName
        
    * queryAllSelectors
        
    * <mark>querySelector</mark>
        
8. **Which of the following methods convert a JavaScript object to and from a JSON string?**
    
    * <mark>JSON.parse</mark>
        
    * <mark>JSON.stringify</mark>
        
    * JSON.fromString
        
    * JSON.toString
        
9. **What will be the result of running this code?**
    
    ```javascript
    const letter = "a"
    letter = "b"
    ```
    
    * <mark>Uncaught TypeError: Assignment to constant variable</mark> 
        
    * b
        
    * a
        
    * Uncaught SyntaxError: Invalid or unexpected token
        
10. What is a constructor?
    
    * <mark>A function that is called to create an instance of an object.</mark>
        
    * An instance of a class.
        
    * A specific object that has been created using the class name.
        
    * An object literal