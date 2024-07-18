---
title: "Knowledge check: Introduction to Object-Oriented Programming in Javascript"
seoTitle: "Knowledge check: Introduction to Object-Oriented Programming in Javasc"
seoDescription: "Knowledge check: Introduction to Object-Oriented Programming in Javascript"
datePublished: Thu Jul 18 2024 13:36:10 GMT+0000 (Coordinated Universal Time)
cuid: clyrbe7c6001909l7ha6s8u5s
slug: knowledge-check-introduction-to-object-oriented-programming-in-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721309718338/85b3bdbd-6bb8-4adb-b30d-4e0dee725a5b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721309743518/51408e4d-cb49-4a3e-8762-b04caba41014.png
tags: javascript

---

1. **What will print out when the following code runs?**
    
    ```javascript
    class Cake {
        constructor(lyr) {
            this.layers = lyr + 1;
        }
    }
    
    var result = new Cake(1);
    console.log(result.layers);
    ```
    
    * 1
        
    * <mark>2</mark>
        
    * 3
        
    * 4
        
2. **When a class extends another class, this is called \_\_\_\_\_\_\_\_\_\_\_\_.**
    
    * <mark>Inheritance</mark>
        
    * Extension
        
3. **What will print out when the following code runs?**
    
    ```javascript
    class Animal {
        constructor(lg) {
            this.legs = lg;
        }
    }
    
    class Dog extends Animal {
        constructor() {
            super(4);
        }
    }
    
    var result = new Dog();
    console.log(result.legs);
    ```
    
    * 0
        
    * undefined
        
    * null
        
    * <mark>4</mark>
        
4. **What will print out when the following code runs?**
    
    ```javascript
    class Animal {
    
    }
    
    class Cat extends Animal {
        constructor() {
        super();
        this.noise = "meow";
        }
    }
    
    var result = new Animal();
    console.log(result.noise);
    ```
    
    * <mark>undefined</mark>
        
    * null
        
    * ""
        
    * meow
        
5. **What will print out when the following code runs?**
    
    ```javascript
    class Person {
        sayHello() {
            console.log("Hello");
        }
    }
    
    class Friend extends Person {
        sayHello() {
            console.log("Hey");
        }
    }
    
    var result = new Friend();
    result.sayHello();
    ```
    
    * Hello
        
    * <mark>Hey</mark>