---
title: "Programming Assignment: Writing a Unit Test"
seoTitle: "Programming Assignment: Writing a Unit Test"
seoDescription: "Programming Assignment: Writing a Unit Test"
datePublished: Sat Jul 20 2024 06:50:55 GMT+0000 (Coordinated Universal Time)
cuid: clytrsqsb00010ala8drecfs5
slug: programming-assignment-writing-a-unit-test
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1721458194761/1dc1aa2b-157a-4c39-8f39-3ade28c7bf87.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1721458236454/60a48c78-d4be-4521-9684-420278b6a61e.png

---

# Lab Instructions: Unit Testing

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

## Task 1: Add Jest as a devDependency

Open terminal. Make sure that it's pointing to `jest-testing` directory.  
Install the jest npm package using the npm install command and the --save-dev flag.  
Verify that the installation was completed successfully by opening the package.json file and confirming that the "devDependencies" entry lists jest similar to the following:

```json
"devDependencies": {
    "jest": "^28.0.0"
}
```

## Task 2: Update the test entry

In the package.json file, locate the "scripts" entry, and inside of it, update the test entry to `jest`.

## Task 3: Code the timesTwo function

Open the timesTwo.js file and add a function named `timesTwo`. The function should take number as input and return the value 2 multiplied by the number. Export the timesTwo function as a module.

## Task 4: Write the first test

Code a test call with the following arguments:

1. The description that reads: "returns the number times 2".
    
2. The second argument should expect the call to the timesTwo function, when passed the number 10, to be 20.
    

## Task 5: Run the first test

With the terminal pointed at the `jest-testing` directory, run the test script using npm.

---

* **timesTwo.test.js**
    
    ```javascript
    const timesTwo = require('./timesTwo');
    
    // Write the first test
    test('returns the number times 2', () => {
        expect(timesTwo(10)).toBe(20);
    });
    ```
    
* **package.json**
    
    ```json
    {
      "name": "jest-testing",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "jest"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "jest": "^28.1.3"
      }
    }
    ```
    
* **timesTwo.js**
    
    ```javascript
    // Task 1: Code the timesTwo function declaration
    function timesTwo(num){
        return num * 2;
    }
    
    // Task 2: Export the timesTwo function as a module
    module.exports = timesTwo;
    ```