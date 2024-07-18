---
title: "Lab Instructions: Object Oriented Programming in Javascript"
seoTitle: "Lab Instructions: Object Oriented Programming in Javascript"
seoDescription: "Lab Instructions: Object Oriented Programming in Javascript"
datePublished: Thu Jul 18 2024 13:17:55 GMT+0000 (Coordinated Universal Time)
cuid: clyraqqnf000009k26yet27zl
slug: lab-instructions-object-oriented-programming-in-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721308555517/48bc5d22-ee85-4457-b978-42461dd0c80e.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721308650608/de1cc3d9-b2d3-4908-9ab2-d665e9f39f51.png
tags: javascript

---

## Lab Instructions: Object Oriented Programming

> ### **Tips: Before you Begin**
> 
> #### **To view your code and instructions side-by-side**, select the following in your VSCode toolbar:
> 
> * View -&gt; Editor Layout -&gt; Two Columns
>     
> * To view this file in Preview mode, right click on this [README.md](http://readme.md/) file and `Open Preview`
>     
> * Select your code file in the code tree, which will open it up in a new VSCode tab.
>     
> * Drag your assessment code files over to the second column.
>     
> * Great work! You can now see instructions and code at the same time.
>     
> * Questions about using VSCode? Please see our support resources here:  
>     [Visual Studio Code on Coursera](https://www.coursera.org/learn/programming-with-javascript/supplement/roMvE/visual-studio-code-on-coursera)
>     
> 
> #### **To run your JavaScript code**
> 
> * Select your JavaScript file
>     
> * Select the "Run Code" button in the upper right hand toolbar of VSCode.  
>     Ex: It looks like a triangular "Play" button.  
>     

## Task 1: Code a Person class

Code a Person class, with three parameters in the constructor: name, age, and energy.

Set the default parameters in the Person class as follows:

```plaintext
name = "Tom"

age = 20

energy = 100
```

Code two methods in the `Person` class. Name those methods `sleep()` and `doSomethingFun()`.

The `sleep()` method should take the existing energy level and increase it by 10.

The doSomethingFun() method should take the existing energy level and decrease it by 10.

## Task 2: Code a Worker class

Code a sub-class, inheriting from the `Person` class, and name it `Worker`.

The `Worker` class has two additional parameters in the constructor:

* xp (for "experience points")
    
* hourlyWage.
    

These properties are set to the following default values:

```plaintext
xp = 0

hourlyWage = 10
```

The `Worker` class has all the paramerters and methods of its super-class.

Additionally, it has the `goToWork()` method, which, whenever it's run, increases the value of the `xp` property by 10.

## Task 3: Code a intern object

Inside the intern function instantiate the `Worker` class to code a new intern object.

The intern should have the following characteristics:

```plaintext
name: Bob

age: 21

energy: 110

xp: 0

hourlyWage: 10
```

Run the `goToWork()` method on the intern object. Then `return` the intern object.

## Task 4: Code a manager object

Inside the manager function instantiate the `Worker` class to code a new `manager` object.

The manager object should have the following characteristics:

```plaintext
name: Alice

age: 30

energy: 120

xp: 100

hourlyWage: 30
```

Run the `doSomethingFun()` method on the manager object. Then `return` the manager object.

---

```javascript
// Task 1: Code a Person class
class Person{
    constructor(name="Tom", age=20, energy=100) {
        this.name = name;
        this.age = age;
        this.energy = energy;
    }
    sleep() {
        this.energy += 10;
    }
    doSomethingFun() {
        this.energy -= 10;
    }
}

// Task 2: Code a Worker class
class Worker extends Person{
    constructor(name = "Tom", age = 20, energy = 100, xp = 0, hourlyWage = 10) {
        super(name, age, energy)
        this.xp = xp;
        this.hourlyWage = hourlyWage;
    }

    doSomethingFun(){
        super.doSomethingFun;
    }

    sleep() {
        super.sleep;
    }

    goToWork() {
        this.xp += 10;
    }
}


// Task 3: Code an intern object, run methods
function intern() {
    let intern = new Worker();
    intern.name = "Bob";
    intern.age = 21
    intern.energy = 110
    intern.xp = 0
    intern.hourlyWage = 10
    intern.goToWork()
    return (intern);
}

// Task 4: Code a manager object, methods
function manager() {
    let manager = new Worker("Alice", 30, 120, 100, 30);
    manager.doSomethingFun();
    return manager;
    
}

console.log(intern())
console.log(manager())
```