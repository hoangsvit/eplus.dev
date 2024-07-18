---
title: "Programming Assignment: Array and object iteration in Javascript"
seoTitle: "Programming Assignment: Array and object iteration in Javascript"
seoDescription: "Programming Assignment: Array and object iteration in Javascript"
datePublished: Thu Jul 18 2024 13:57:17 GMT+0000 (Coordinated Universal Time)
cuid: clyrc5cjb00070al15g194ubb
slug: programming-assignment-array-and-object-iteration-in-javascript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721310651478/ad8711cd-4423-4118-a172-f27f7c40460b.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721311016169/9df809db-72e7-4358-9c70-d8413947ab74.png
tags: javascript

---

# Lab Instructions: Advanced JS Features

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

## Task: Iterate Over an Array

In this exercise, you'll use the for....of loop to iterate over an array and to iterate over an object's own properties.  
**Step 1.** You are given an array of dairy products:

```javascript
var dairy = ['cheese', 'sour cream', 'milk', 'yogurt', 'ice cream', 'milkshake']
```

Create a function called `logDairy`. Within it, console log each of the items in the dairy array, using the for...of loop.

After you create this function, call it as `logDairy()` to see the output on the console.

The expected output should be:

```plaintext
cheese
sour cream
milk
yogurt
ice cream
milkshake
```

**Step 2.**You are given the following starter code:

```javascript
const animal = {

canJump: true

};

const bird = Object.create(animal);

bird.canFly = true;

bird.hasFeathers = true;
```

Create a function called `birdCan`, within it, loop over the bird object's properties and console log each one, using the for...of loop. Finally call the function as `birdCan()` to see the output on the console. Remember, you need to console log both the key and the value of each of the bird object's properties.  
Expected output should be:

```plaintext
canFly: true
hasFeathers: true
```

**Step 3.**Using the same starter code as in task 2, create a function called `animalCan` and within it, loop over all the properties in both the bird object and its prototype - the animal object - using the for...in loop. Finally call the function as `animalCan()` to see the output on the console.  
Expected outout should be:

```plaintext
canFly: true
hasFeathers: true
canJump: true
```

## Final Step: Let's submit your code!

Nice work! To complete this assessment:

* Save your file through File -&gt; Save
    
* Select "Submit Assignment" in your Lab toolbar.
    

Your code will be autograded and return feedback shortly on the "Grades" tab.  
You can also see your score in your Programming Assignment "My Submission" tab.

---

```javascript
// Task 1
var dairy = ['cheese', 'sour cream', 'milk', 'yogurt', 'ice cream', 'milkshake']

function logDairy(){
    for(var item of dairy){
        console.log(item)
    }
}

// Task 2
const animal = {

    canJump: true

};

const bird = Object.create(animal);

bird.canFly = true;

bird.hasFeathers = true;

function birdCan() {
    for (var prop of Object.keys(bird)) {
        console.log(prop + ": " +  bird[prop])
    }
}

// Task 3
function animalCan() {
    for (var prop of Object.keys(bird)) {
        console.log(prop + ": " +  bird[prop])
    }
    for (var prop of Object.keys(animal)) {
        console.log(prop + ": " +  animal[prop])
    }
}

logDairy();
birdCan();
animalCan();
```